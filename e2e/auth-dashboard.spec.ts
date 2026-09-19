import {test,expect} from "@playwright/test";
import {login} from "./helpers";

test("demo user can sign in, search and sign out",async({page})=>{
  await login(page);
  await page.getByTitle(/Search/).click();
  await expect(page.getByPlaceholder(/Search modules/)).toBeVisible();
  await page.getByPlaceholder(/Search modules/).fill("Loans");
  await page.getByRole("button",{name:/Loans Open/}).click();
  await expect(page.getByRole("heading",{name:"Loan management"})).toBeVisible();
  await page.locator(".sidebar-user").click();
  await page.getByRole("button",{name:"Sign out"}).click();
  await expect(page.getByRole("heading",{name:"Create your account"})).toBeVisible();
});
