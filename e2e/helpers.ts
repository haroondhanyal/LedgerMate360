import {APIRequestContext,Page,expect} from "@playwright/test";

export const apiUrl=process.env.PLAYWRIGHT_API_URL??"http://127.0.0.1:4000/api";
export const demo={email:"demo@ledgermate.local",password:"LedgerMate@360"};

export async function login(page:Page){
  await page.goto("/");
  if(await page.getByRole("button",{name:"Back to sign in"}).isVisible())await page.getByRole("button",{name:"Back to sign in"}).click();
  await page.getByLabel("Email address").fill(demo.email);
  await page.getByLabel("Password",{exact:true}).fill(demo.password);
  await page.getByRole("button",{name:"Sign in",exact:true}).click();
  await expect(page.getByRole("heading",{name:/Good afternoon/i})).toBeVisible();
  return page.evaluate(()=>JSON.parse(localStorage.getItem("lm_session")??"null"));
}

export async function workspace(request:APIRequestContext,token:string){
  const response=await request.get(`${apiUrl}/workspaces`,{headers:{authorization:`Bearer ${token}`}});
  expect(response.ok()).toBeTruthy();
  return (await response.json())[0];
}

export function auth(token:string){return {authorization:`Bearer ${token}`,"content-type":"application/json"}}
