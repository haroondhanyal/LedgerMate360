export const unique=(prefix:string)=>`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
export const loanData=()=>({name:unique("Automation Loan"),direction:"TAKEN",principal:1000,interestRate:0,startDate:new Date().toISOString()});
export const salaryData=()=>({employer:unique("Automation Salary"),grossSalary:100000,netSalary:90000,tax:10000,allowances:0,deductions:0,salaryDay:1});
export const accountData=()=>({name:unique("Automation Cash"),type:"CASH",currency:"PKR",openingBalance:0});
