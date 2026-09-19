import {Page,expect} from "@playwright/test";
export class DashboardPage{
  constructor(private page:Page){}
  async openModule(name:string){await this.page.getByRole("button",{name,exact:true}).click()}
  async expectModule(name:string){await expect(this.page.locator("header h1")).toHaveText(name)}
  async search(term:string){await this.page.getByTitle(/Search/).click();await this.page.getByPlaceholder(/Search modules/).fill(term)}
  async signOut(){await this.page.locator(".sidebar-user").click();await this.page.getByRole("button",{name:"Sign out"}).click()}
}
