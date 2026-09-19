import {test,expect} from "@playwright/test";
import {apiUrl,auth,login,workspace} from "./helpers";

test("loan payment uses validated LedgerMate dialog",async({page,request})=>{
  const session=await login(page),ws=await workspace(request,session.accessToken),headers=auth(session.accessToken);
  const created=await request.post(`${apiUrl}/workspaces/${ws.id}/loans`,{headers,data:{name:`E2E Loan ${Date.now()}`,direction:"TAKEN",principal:1000,interestRate:0,startDate:new Date().toISOString()}});
  expect(created.ok()).toBeTruthy(); const loan=await created.json();
  try{
    await page.getByRole("button",{name:"Loans"}).click();
    const card=page.locator(".module-cards article").filter({hasText:loan.name});
    await expect(card).toBeVisible();
    await card.getByRole("button",{name:"Payment"}).click();
    const dialog=page.getByRole("dialog",{name:"Record loan payment"});
    await expect(dialog).toContainText("Outstanding");
    await dialog.getByLabel("Payment amount").fill("250");
    await dialog.getByRole("button",{name:"Save payment"}).click();
    await expect(card).toContainText(/250.*paid/i);
    await expect(card).toContainText(/750.*outstanding/i);
  }finally{await request.delete(`${apiUrl}/workspaces/${ws.id}/loans/${loan.id}`,{headers});}
});

test("salary card manages evidence files",async({page,request})=>{
  const session=await login(page),ws=await workspace(request,session.accessToken),headers=auth(session.accessToken);
  const created=await request.post(`${apiUrl}/workspaces/${ws.id}/salary`,{headers,data:{employer:`E2E Salary ${Date.now()}`,grossSalary:100000,netSalary:90000,tax:10000,allowances:0,deductions:0,salaryDay:1}});
  expect(created.ok()).toBeTruthy(); const salary=await created.json();
  try{
    await page.getByRole("button",{name:"Salary"}).click();
    const card=page.locator(".module-cards article").filter({hasText:salary.employer});
    await expect(card).toBeVisible();
    await card.getByTitle("View and manage files").click();
    const dialog=page.getByRole("dialog",{name:`Files for ${salary.employer}`});
    await expect(dialog.getByText("No files attached")).toBeVisible();
    await dialog.locator('input[type="file"]').setInputFiles({name:"salary-slip.png",mimeType:"image/png",buffer:Buffer.from("89504e470d0a1a0a","hex")});
    await expect(dialog.getByText("salary-slip.png")).toBeVisible();
    await dialog.getByTitle("Delete file").click();
    await dialog.locator(".file-delete-confirm").getByRole("button",{name:"Delete file"}).click();
    await expect(dialog.getByText("No files attached")).toBeVisible();
  }finally{await request.delete(`${apiUrl}/workspaces/${ws.id}/salary/${salary.id}`,{headers});}
});
