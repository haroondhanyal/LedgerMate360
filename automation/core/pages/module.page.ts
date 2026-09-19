import type {Page} from "@playwright/test";
import {moduleLocators} from "../locators/module.locators";
export class ModulePage{
  constructor(private page:Page,readonly name:string){}
  card(text:string){return moduleLocators(this.page).cards.filter({hasText:text})}
  async openEdit(text:string){await this.card(text).getByRole("button",{name:/edit/i}).click();return moduleLocators(this.page).dialog}
  async openEvidence(text:string){await this.card(text).getByRole("button",{name:/evidence|files|attachments/i}).click();return moduleLocators(this.page).dialog}
}
