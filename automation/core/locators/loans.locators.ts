import type {Page} from "@playwright/test";
export const loansLocators=(page:Page)=>({cards:page.locator(".module-cards article"),paymentDialog:page.getByRole("dialog",{name:"Record loan payment"})});
