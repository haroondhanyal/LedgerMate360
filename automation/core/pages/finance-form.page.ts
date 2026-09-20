import type {Page} from "@playwright/test";
import {expect} from "@playwright/test";
import {financeFormLocators} from "../locators/finance-form.locators";
export class FinanceFormPage{
  constructor(private page:Page){}
  async create(module:string,name:string,index:number){
    const l=financeFormLocators(this.page),actions:Record<string,string>={Loans:"Add loan",Budget:"Add budget",Savings:"Add goal",Salary:"Add salary profile",Khata:"Add entry"};
    await l.add(actions[module]).click();
    const response=this.page.waitForResponse(r=>r.request().method()==="POST"&&r.url().includes("/workspaces/"));
    if(module==="Khata"){await this.page.getByRole("button",{name:"New person"}).click();await l.field("Name").fill(name);await l.form.getByRole("button",{name:"Save",exact:true}).click()}
    if(module==="Loans"){await l.field("Loan name").fill(name);await l.field("Principal").fill(String(5000+index));await l.form.getByRole("button",{name:"Create loan"}).click()}
    if(module==="Budget"){await l.field("Budget name").fill(name);await l.field("Category").fill(`Automation ${index}`);await l.field("Limit").fill(String(10000+index));await l.form.getByRole("button",{name:"Create budget"}).click()}
    if(module==="Savings"){await l.field("Goal name").fill(name);await l.field("Target amount").fill(String(20000+index));await l.form.getByRole("button",{name:"Create goal"}).click()}
    if(module==="Salary"){await l.field("Employer").fill(name);await l.field("Gross salary").fill(String(100000+index));await l.field("Net salary").fill(String(85000+index));await l.form.getByRole("button",{name:"Save salary profile"}).click()}
    expect((await response).ok()).toBeTruthy();await this.reopen(module);
    await expect(this.card(module,name)).toBeVisible();
  }
  card(module:string,name:string){const l=financeFormLocators(this.page);return (module==="Accounts"?l.accounts:l.cards).filter({hasText:name})}
  async reopen(module:string){await this.page.reload();await this.page.locator(".sidebar-user").waitFor();await this.page.getByRole("button",{name:module,exact:true}).click()}
  async remove(module:string,name:string){const card=this.card(module,name).last();await card.waitFor({state:"attached"});await card.getByRole("button",{name:/delete/i}).evaluate((el:HTMLElement)=>el.click());const response=this.page.waitForResponse(r=>r.request().method()==="DELETE"&&r.url().includes("/workspaces/"));await financeFormLocators(this.page).confirmDelete.evaluate((el:HTMLElement)=>el.click());expect((await response).ok()).toBeTruthy();await this.reopen(module);await expect(this.card(module,name)).toHaveCount(0)}
  async createAccount(name:string,index:number){const l=financeFormLocators(this.page);await l.add("Add account").click();const dialog=this.page.getByRole("dialog",{name:"Add account"});await dialog.getByLabel("Account name").fill(name);await dialog.getByLabel("Opening balance").fill(String(1000+index));const response=this.page.waitForResponse(r=>r.request().method()==="POST"&&r.url().includes("/accounts"));await dialog.getByRole("button",{name:"Create account"}).click();expect((await response).ok()).toBeTruthy();await this.reopen("Accounts");await expect(this.card("Accounts",name)).toBeVisible()}
}
