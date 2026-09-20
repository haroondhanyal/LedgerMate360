import {mkdirSync,writeFileSync,rmSync,existsSync,cpSync} from "node:fs";
import {execFileSync} from "node:child_process";
import os from "node:os";
const results="automation/reports/allure-results";
const history="automation/reports/allure-report/history";
const savedHistory="automation/reports/.allure-history";
if(existsSync(history)){rmSync(savedHistory,{recursive:true,force:true});cpSync(history,savedHistory,{recursive:true})}
rmSync(results,{recursive:true,force:true});mkdirSync(results,{recursive:true});
for(const suite of ["api","ui","bdd"])rmSync(`automation/reports/allure-${suite}-results`,{recursive:true,force:true});
if(existsSync(savedHistory))cpSync(savedHistory,`${results}/history`,{recursive:true});
const git=(...args)=>{try{return execFileSync("git",args,{encoding:"utf8"}).trim()}catch{return "local"}};
writeFileSync(`${results}/environment.properties`,[
  "Product=LedgerMate 360","Project=Product Automation","Environment="+(process.env.TEST_ENV??"local"),
  "Report.Owner=Raja Haroon Jamal","Designation=Sr QA Automation",
  "Web.URL="+(process.env.WEB_URL??"http://localhost:3000"),"API.URL="+(process.env.API_URL??"http://localhost:4000/api"),
  "Browser=Chromium","Node="+process.version,"OS="+`${os.platform()} ${os.release()}`,"Functional.Coverage=140 API + 100 UI + 60 BDD = 300","Performance.Coverage=20 scenarios"
].join("\n"));
writeFileSync(`${results}/executor.json`,JSON.stringify({name:"Raja Haroon Jamal • Sr QA Automation",type:"local",buildName:`LedgerMate 360 • ${git("rev-parse","--short","HEAD")}`,buildOrder:Date.now(),reportName:"300 Functional + 20 Performance",url:"https://github.com/haroondhanyal/LedgerMate360"},null,2));
writeFileSync(`${results}/categories.json`,JSON.stringify([
  {name:"Product defects",matchedStatuses:["failed"],messageRegex:".*(Expected|expect).*"},
  {name:"Authentication and security",matchedStatuses:["failed"],traceRegex:".*(auth|login|password|role).*"},
  {name:"API contract defects",matchedStatuses:["broken","failed"],traceRegex:".*API-.*"},
  {name:"Automation defects",matchedStatuses:["broken"],messageRegex:".*(Timeout|locator|browser).*"}
],null,2));
console.log("Prepared branded Allure metadata with retained trend history.");
