import {test,expect} from "../../../core/fixtures/test";
const checks=[["cash flow",".cashflow"],["recent activity",".recent"],["workspace role",".sidebar-user small"],["profile arrow",".sidebar-user svg"],["theme root","html[data-theme]"],["application shell",".app-shell"],["content header",".content header"]];
test.describe("UI | Shell | Profile and appearance",()=>{checks.forEach(([name,selector],index)=>test(`UI-${String(index+44).padStart(3,"0")} displays ${name}`,async({authPage,page})=>{await authPage.login();await expect(page.locator(selector).first()).toBeVisible()}))});
