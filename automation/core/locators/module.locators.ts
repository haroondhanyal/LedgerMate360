import type {Page} from "@playwright/test";
export const moduleLocators=(page:Page)=>({cards:page.locator(".module-cards article"),dialog:page.getByRole("dialog"),edit:page.getByRole("button",{name:/edit/i}),remove:page.getByRole("button",{name:/delete|remove/i}),evidence:page.getByRole("button",{name:/evidence|files|attachments/i})});
