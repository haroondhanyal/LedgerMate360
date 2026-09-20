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
  async registerAndSetup(data:{name:string;email:string;password:string;phone:string;role:string;workspace:string;account:string}){const l=authLocators(this.page);await this.open();await l.fullName.fill(data.name);await l.phone.fill(data.phone);await l.role.selectOption(data.role);await l.email.fill(data.email);await l.password.fill(data.password);await l.confirmPassword.fill(data.password);await l.profileImage.setInputFiles("automation/assets/ledger-receipt.png");await l.createSecureAccount.click();await this.page.getByLabel("Workspace name").fill(data.workspace);await this.page.getByRole("button",{name:"Continue"}).click();await this.page.getByLabel("Account name").fill(data.account);await this.page.getByLabel("Opening balance").fill("25000");await this.page.getByRole("button",{name:"Finish setup"}).click();await expect(shellLocators(this.page).profile).toBeVisible()}
  async signIn(email:string,password:string){const l=authLocators(this.page);await this.open();await l.backToSignIn.click();await l.email.fill(email);await l.password.fill(password);await l.signIn.click();await expect(shellLocators(this.page).profile).toBeVisible()}
}
