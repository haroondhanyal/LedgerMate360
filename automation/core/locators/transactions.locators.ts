import type {Page} from "@playwright/test";
export const transactionLocators=(page:Page)=>({
  add:page.getByRole("button",{name:"Add transaction",exact:true}).first(),dialog:page.getByRole("dialog",{name:"New record"}),
  rows:page.locator(".transaction-table .table-row:not(.table-head)"),
  evidenceInput:page.getByLabel(/Evidence \/ receipts/),
  save:page.getByRole("button",{name:"Save record"}),archive:page.getByRole("button",{name:"Archive transaction"})
});
