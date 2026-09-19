import {test,expect} from "../../../core/fixtures/test";
import {loadJson} from "../../../core/config/test-data";
const {modules}=loadJson<{modules:string[]}>("test-data/navigation.json");
test.describe("UI | Navigation | Product modules",()=>{modules.forEach((module,index)=>test(`UI-${String(index+1).padStart(3,"0")} opens ${module}`,async({authPage,dashboardPage,page})=>{await authPage.login();await dashboardPage.openModule(module);if(module==="Dashboard")await expect(page.locator("header h1")).toContainText("Good afternoon");else await dashboardPage.expectModule(module)}))});
