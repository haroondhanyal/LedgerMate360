import {Page,expect} from "@playwright/test";
import {shellLocators} from "../locators/shell.locators";
export class DashboardPage{
  constructor(private page:Page){}
  async openModule(name:string){await this.page.getByRole("button",{name,exact:true}).click()}
  async expectModule(name:string){await expect(shellLocators(this.page).pageTitle).toHaveText(name)}
  async search(term:string){const shell=shellLocators(this.page);await shell.search.click();await shell.searchInput.fill(term)}
  async signOut(){await shellLocators(this.page).profile.click();await this.page.getByRole("button",{name:"Sign out"}).click()}
}
