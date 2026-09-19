import {faker} from "@faker-js/faker";
faker.seed(Number(process.env.FAKER_SEED??360));
export const unique=(prefix:string)=>`${prefix}-${Date.now()}-${faker.string.alphanumeric(5)}`;
export const userData=()=>({name:faker.person.fullName(),email:faker.internet.email().toLowerCase(),phone:faker.phone.number(),password:`Lm!${faker.string.alphanumeric(12)}`});
export const loanData=()=>({name:unique("Automation Loan"),direction:"TAKEN",principal:1000,interestRate:0,startDate:new Date().toISOString()});
export const salaryData=()=>({employer:unique("Automation Salary"),grossSalary:100000,netSalary:90000,tax:10000,allowances:0,deductions:0,salaryDay:1});
export const accountData=()=>({name:unique("Automation Cash"),type:"CASH",currency:"PKR",openingBalance:0});
