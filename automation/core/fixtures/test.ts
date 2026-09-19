import {test as base,expect} from "@playwright/test";
import {AuthPage} from "../pages/auth.page";import {DashboardPage} from "../pages/dashboard.page";import {ApiClient} from "../clients/api-client";
type Fixtures={authPage:AuthPage;dashboardPage:DashboardPage;api:ApiClient;captureEvidence:void};
export const test=base.extend<Fixtures>({
  authPage:async({page},use)=>use(new AuthPage(page)),
  dashboardPage:async({page},use)=>use(new DashboardPage(page)),
  api:async({request},use)=>use(new ApiClient(request)),
  captureEvidence:[async({page},use,testInfo)=>{await use();if(!page.isClosed()){const body=await page.screenshot({fullPage:true});await testInfo.attach("LedgerMate final state",{body,contentType:"image/png"})}},{auto:true}]
});
export {expect};
