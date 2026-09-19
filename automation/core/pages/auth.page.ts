import {Page,expect} from "@playwright/test";
import {env} from "../config/env";
export class AuthPage{
  constructor(private page:Page){}
  async open(){await this.page.goto("/")}
  async switchToLogin(){const back=this.page.getByRole("button",{name:"Back to sign in"});if(await back.isVisible())await back.click()}
  async login(email=env.email,password=env.password){const response=await this.page.request.post(`${env.apiUrl}/auth/login`,{data:{email,password}});expect(response.ok()).toBeTruthy();const session=await response.json();await this.open();await this.page.evaluate(value=>localStorage.setItem("lm_session",JSON.stringify(value)),session);await this.page.reload();await expect(this.page.locator(".sidebar-user")).toBeVisible()}
  async forgot(email:string){await this.switchToLogin();await this.page.getByRole("button",{name:"Forgot password?"}).click();await this.page.getByLabel("Email address").fill(email);await this.page.getByRole("button",{name:"Send reset instructions"}).click()}
}
