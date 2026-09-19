import {test,expect} from "../../../core/fixtures/test";
import {dashboardLocators} from "../../../core/locators/dashboard.locators";
import {shellLocators} from "../../../core/locators/shell.locators";
const checks:[string,(page:any)=>any][]=[
  ["sidebar profile",p=>shellLocators(p).profile],["LedgerMate logo",p=>shellLocators(p).brand],["navigation",p=>shellLocators(p).navigation],["search button",p=>shellLocators(p).search],
  ["notification button",p=>shellLocators(p).notifications],["new record",p=>shellLocators(p).newRecord],["dashboard cards",p=>dashboardLocators(p).heroCards],["summary stats",p=>dashboardLocators(p).summary]
];
test.describe("UI | Dashboard | Main experience",()=>{checks.forEach(([name,get],index)=>test(`UI-${String(index+36).padStart(3,"0")} displays ${name}`,async({authPage,page})=>{await authPage.login();await expect(get(page).first()).toBeVisible()}))});
