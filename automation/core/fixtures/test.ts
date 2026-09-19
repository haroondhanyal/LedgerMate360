import {test as base,expect} from "@playwright/test";
import {AuthPage} from "../pages/auth.page";import {DashboardPage} from "../pages/dashboard.page";import {ApiClient} from "../clients/api-client";
type Fixtures={authPage:AuthPage;dashboard:DashboardPage;api:ApiClient};
export const test=base.extend<Fixtures>({authPage:async({page},use)=>use(new AuthPage(page)),dashboard:async({page},use)=>use(new DashboardPage(page)),api:async({request},use)=>use(new ApiClient(request))});
export {expect};
