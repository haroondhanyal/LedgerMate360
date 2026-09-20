import {test} from "../../../core/fixtures/test";
import {FinanceFormPage} from "../../../core/pages/finance-form.page";
import {faker} from "@faker-js/faker";
import {TransactionsPage} from "../../../core/pages/transactions.page";

const modules=["Khata","Loans","Budget","Savings","Salary"];
test.describe("UI | End to end | Finance create and delete",()=>{
  modules.forEach((module,moduleIndex)=>Array.from({length:5},(_,dataset)=>test(`UI-${String(51+moduleIndex*5+dataset).padStart(3,"0")} ${module} positive create and delete dataset ${dataset+1}`,async({authPage,dashboardPage,page})=>{
    await authPage.login();await dashboardPage.openModule(module);const form=new FinanceFormPage(page),name=`UI ${module} ${dataset+1} ${Date.now()} ${faker.string.alphanumeric(6)}`;await form.create(module,name,dataset+1);await form.remove(module,name);
  })));
});

test.describe("UI | End to end | Account create and archive",()=>{
  Array.from({length:3},(_,dataset)=>test(`UI-${String(76+dataset).padStart(3,"0")} Accounts positive create and archive dataset ${dataset+1}`,async({authPage,dashboardPage,page})=>{
    await authPage.login();await dashboardPage.openModule("Accounts");const form=new FinanceFormPage(page),name=`UI Account ${dataset+1} ${Date.now()} ${faker.string.alphanumeric(6)}`;await form.createAccount(name,dataset+1);await form.remove("Accounts",name);
  }));
});

test.describe("UI | End to end | Transaction PNG and PDF evidence",()=>{
  Array.from({length:2},(_,dataset)=>test(`UI-${String(79+dataset).padStart(3,"0")} Transaction create with PNG and PDF evidence dataset ${dataset+1}`,async({authPage,dashboardPage,page})=>{
    await authPage.login();await dashboardPage.openModule("Transactions");const transactions=new TransactionsPage(page),description=`Evidence transaction ${dataset+1} ${faker.string.alphanumeric(6)}`;await transactions.createWithEvidence(description,1250+dataset);await transactions.archive(description);
  }));
});
