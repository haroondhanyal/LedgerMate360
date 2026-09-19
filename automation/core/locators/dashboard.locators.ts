import type {Page} from "@playwright/test";
export const dashboardLocators=(page:Page)=>({heroCards:page.locator(".hero-grid"),summary:page.locator(".stats-grid"),cashFlow:page.locator(".cashflow"),recent:page.locator(".recent")});
