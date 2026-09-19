import {Page} from "@playwright/test";
import {loansLocators} from "../locators/loans.locators";
export class LoansPage{
  constructor(private page:Page){}
  card(name:string){return loansLocators(this.page).cards.filter({hasText:name})}
  async openPayment(name:string){await this.card(name).getByRole("button",{name:"Payment"}).click();return loansLocators(this.page).paymentDialog}
}
