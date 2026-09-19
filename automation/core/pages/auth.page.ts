import {Page,expect} from "@playwright/test";
import {env} from "../config/env";
import {authLocators} from "../locators/auth.locators";
import {shellLocators} from "../locators/shell.locators";
export class AuthPage{
  constructor(private page:Page){}
  async open(){await this.page.goto("/")}
  async switchToLogin(){const {backToSignIn}=authLocators(this.page);if(await backToSignIn.isVisible())await backToSignIn.click()}
  async login(email=env.email,password=env.password){const response=await this.page.request.post(`${env.apiUrl}/auth/login`,{data:{email,password}});expect(response.ok()).toBeTruthy();const session=await response.json();await this.open();await this.page.evaluate(value=>localStorage.setItem("lm_session",JSON.stringify(value)),session);await this.page.reload();await expect(shellLocators(this.page).profile).toBeVisible()}
  async forgot(email:string){const locators=authLocators(this.page);await this.switchToLogin();await locators.forgotPassword.click();await locators.email.fill(email);await locators.sendReset.click()}
}
