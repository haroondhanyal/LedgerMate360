import {test,expect} from "../../../core/fixtures/test";
import {loadJson} from "../../../core/config/test-data";
import {shellLocators} from "../../../core/locators/shell.locators";
const {searchable}=loadJson<{searchable:string[]}>("test-data/navigation.json");
test.describe("UI | Navigation | Command search",()=>{searchable.forEach((module,index)=>test(`UI-${String(index+16).padStart(3,"0")} command search finds ${module}`,async({authPage,dashboardPage,page})=>{await authPage.login();await dashboardPage.search(module);await expect(shellLocators(page).searchResults.getByText(module,{exact:true}).first()).toBeVisible()}))});
