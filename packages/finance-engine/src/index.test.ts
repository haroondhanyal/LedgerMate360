import {describe,expect,it} from "vitest"; import {assertBalanced,calculateBalance,createPostings} from "./index";
describe("ledger",()=>{
 it("posts income as balanced entries",()=>{const p=createPostings({type:"INCOME",amount:5000,accountId:"cash"});expect(assertBalanced(p)).toBe(true);expect(calculateBalance(0,p,"cash")).toBe(5000)});
 it("does not treat transfers as income or expense",()=>{const p=createPostings({type:"TRANSFER",amount:2000,accountId:"bank",destinationAccountId:"savings"});expect(calculateBalance(5000,p,"bank")).toBe(3000);expect(calculateBalance(0,p,"savings")).toBe(2000);expect(p.every(x=>!x.accountId.startsWith("SYSTEM"))).toBe(true)});
 it("rejects invalid amounts",()=>expect(()=>createPostings({type:"EXPENSE",amount:-1,accountId:"cash"})).toThrow());
});
