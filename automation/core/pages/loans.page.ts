import {Page} from "@playwright/test";
export class LoansPage{
  constructor(private page:Page){}
  card(name:string){return this.page.locator(".module-cards article").filter({hasText:name})}
  async openPayment(name:string){await this.card(name).getByRole("button",{name:"Payment"}).click();return this.page.getByRole("dialog",{name:"Record loan payment"})}
}
