import {test,expect} from "@playwright/test";
import {AuthPage} from "../../core/pages/auth.page";

const modules=["Dashboard","Workspace Admin","Transactions","Accounts","Salary","Khata","Loans","Budget","Savings","Shared Expenses","Reports","Import / Export","Recurring","Evidence","AI Assistant"];
modules.forEach((module,index)=>test(`UI-${String(index+1).padStart(3,"0")} opens ${module}`,async({page})=>{await new AuthPage(page).login();await page.getByRole("button",{name:module,exact:true}).click();if(module==="Dashboard")await expect(page.locator("header h1")).toContainText("Good afternoon");else await expect(page.locator("header h1")).toHaveText(module)}));

const searchModules=["Dashboard","Transactions","Accounts","Salary","Khata","Loans","Budget","Savings","Reports","AI Assistant"];
searchModules.forEach((module,index)=>test(`UI-${String(index+16).padStart(3,"0")} command search finds ${module}`,async({page})=>{await new AuthPage(page).login();await page.getByTitle(/Search/).click();await page.getByPlaceholder(/Search modules/).fill(module);await expect(page.locator(".command-results").getByText(module,{exact:true}).first()).toBeVisible()}));

const authCases=[
 ["register heading","Create your account"],["brand name","LedgerMate"],["tagline","Your money, khata, loans and savings"],["profile upload","Profile picture"],["country selector","Country"],["role selector","Workspace role"],["email field","Email address"],["password field","Password"],["confirm field","Confirm password"],["login switch","Back to sign in"]
];
authCases.forEach(([name,text],index)=>test(`UI-${String(index+26).padStart(3,"0")} auth ${name}`,async({page})=>{await page.goto("/");await expect(page.getByText(text,{exact:false}).first()).toBeVisible()}));

const authenticatedChecks=[
 ["sidebar profile",".sidebar-user"],["LedgerMate logo",".brand"],["navigation",".sidebar-nav"],["search button","button[title*='Search']"],["notification button","button[title='Notifications']"],["new record","header .add"],["dashboard cards",".hero-grid"],["summary stats",".stats-grid"],["cash flow",".cashflow"],["recent activity",".recent"],["workspace role",".sidebar-user small"],["profile arrow",".sidebar-user svg"],["theme root","html[data-theme]"],["application shell",".app-shell"],["content header",".content header"]
];
authenticatedChecks.forEach(([name,selector],index)=>test(`UI-${String(index+36).padStart(3,"0")} displays ${name}`,async({page})=>{await new AuthPage(page).login();await expect(page.locator(selector).first()).toBeVisible()}));
