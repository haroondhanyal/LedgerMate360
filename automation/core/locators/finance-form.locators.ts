import type {Page} from "@playwright/test";
export const financeFormLocators=(page:Page)=>({
  add:(label:string)=>page.getByRole("button",{name:label,exact:true}),
  form:page.locator("form.inline-form"),
  field:(label:string)=>page.getByLabel(label,{exact:true}),
  cards:page.locator(".module-cards article"),accounts:page.locator(".account-grid article"),
  confirmDelete:page.getByRole("button",{name:/delete|archive/i}).last()
});
