import {test,expect} from "../../../core/fixtures/test";
const cases=[
 ["Workspace Admin","Workspace Admin"],["Transactions","All transactions"],["Accounts","Your accounts"],["Salary","Salary management"],["Khata","Khata / Udhaar"],["Loans","Loan management"],["Budget","Budget controller"],["Savings","Savings goals"],["Shared Expenses","Shared Expenses"],["Reports","Financial Reports"],["Import / Export","Import / Export"],["Recurring","Recurring"],["Evidence","Evidence"],["AI Assistant","LedgerMate AI Assistant"]
] as const;
test.describe("UI | Regression | Component content matrix",()=>{cases.forEach(([module,content],index)=>test(`UI-${String(84+index).padStart(3,"0")} ${module} renders detailed component content`,async({authPage,dashboardPage,page})=>{await authPage.login();await dashboardPage.openModule(module);await expect(page.locator("body")).toContainText(content,{ignoreCase:true})}))});
test.describe("UI | Regression | Report filters",()=>{
 [["this_month","This month"],["last_month","Last month"],["year","This year"]].forEach(([value,label],index)=>test(`UI-${String(98+index).padStart(3,"0")} report period ${label}`,async({authPage,dashboardPage,page})=>{await authPage.login();await dashboardPage.openModule("Reports");await page.locator("select.report-period").selectOption(value);await expect(page.locator("select.report-period")).toHaveValue(value)}));
});
