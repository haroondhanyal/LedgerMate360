import {test,expect} from "../../../core/fixtures/test";import {userData} from "../../../core/utils/data-factory";import {shellLocators} from "../../../core/locators/shell.locators";
test.describe("UI | Authentication | Complete account lifecycle",()=>{
 Array.from({length:3},(_,dataset)=>test(`UI-${String(81+dataset).padStart(3,"0")} register setup sign out and sign in dataset ${dataset+1}`,async({authPage,dashboardPage,page})=>{
   const user=userData(),data={...user,role:["MEMBER","FINANCE_MANAGER","ADMIN"][dataset],workspace:`Automation Workspace ${dataset+1}`,account:`Opening Account ${dataset+1}`};
   await authPage.registerAndSetup(data);await expect(shellLocators(page).profile).toContainText(user.name);await dashboardPage.signOut();await expect(page.getByRole("heading",{name:"Create your account"})).toBeVisible();await authPage.signIn(user.email,user.password);await expect(shellLocators(page).profile).toContainText(user.name);
 }));
});
