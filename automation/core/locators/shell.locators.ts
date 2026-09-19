import type {Page} from "@playwright/test";
export const shellLocators=(page:Page)=>({
  profile:page.locator(".sidebar-user"),brand:page.locator(".brand"),navigation:page.locator(".sidebar-nav"),
  pageTitle:page.locator("header h1"),newRecord:page.locator("header .add"),search:page.getByTitle(/Search/),
  searchInput:page.getByPlaceholder(/Search modules/),searchResults:page.locator(".command-results"),
  notifications:page.getByTitle("Notifications"),appShell:page.locator(".app-shell")
});
