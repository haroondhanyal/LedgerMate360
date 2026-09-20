import {existsSync,copyFileSync,readFileSync,writeFileSync,readdirSync,statSync} from "node:fs";import {basename,join} from "node:path";import {execFileSync,spawnSync} from "node:child_process";import os from "node:os";
let javaHome=process.env.JAVA_HOME;if(!javaHome||!existsSync(javaHome)){try{javaHome=execFileSync("/usr/libexec/java_home",{encoding:"utf8"}).trim()}catch{javaHome=undefined}}
const results="automation/reports/allure-results";
for(const suite of ["api","ui","bdd"]){const saved=`automation/reports/allure-${suite}-results`,nested=join(results,suite),dir=existsSync(saved)?saved:nested;if(!existsSync(dir))continue;for(const file of readdirSync(dir)){const source=join(dir,file);if(statSync(source).isFile())copyFileSync(source,join(results,`${suite}-${basename(file)}`))}}
writeFileSync(`${results}/environment.properties`,[`Product=LedgerMate 360`,`Project=Complete Product Automation`,`Environment=${process.env.TEST_ENV??"local"}`,`Web.URL=${process.env.WEB_URL??"http://localhost:3000"}`,`API.URL=${process.env.API_URL??"http://localhost:4000/api"}`,`Browser=Chromium`,`Node=${process.version}`,`OS=${os.platform()} ${os.release()}`,`Coverage=100 API + 83 UI + 40 BDD = 223`].join("\n"));
writeFileSync(`${results}/executor.json`,JSON.stringify({name:"LedgerMate 360 Automation",type:"github",buildName:"Complete E2E Product Flow",buildOrder:Date.now(),reportName:"LedgerMate 360 • 223 Case Regression",url:"https://github.com/haroondhanyal/LedgerMate360"},null,2));
writeFileSync(`${results}/categories.json`,JSON.stringify([
 {name:"Authentication and access defects",matchedStatuses:["failed","broken"],messageRegex:".*(login|password|auth|unauthori|forbidden).*"},
 {name:"Finance calculation defects",matchedStatuses:["failed"],messageRegex:".*(amount|balance|budget|loan|saving|salary).*"},
 {name:"API contract defects",matchedStatuses:["failed","broken"],traceRegex:".*API-.*"},
 {name:"UI locator or rendering defects",matchedStatuses:["broken"],messageRegex:".*(locator|visible|element|strict mode).*"},
 {name:"Timeout and environment defects",matchedStatuses:["broken","failed"],messageRegex:".*(Timeout|ECONNREFUSED|browser|socket).*"},
 {name:"Product assertion defects",matchedStatuses:["failed"],messageRegex:".*expect.*"}
],null,2));
const result=spawnSync("npx",["allure","generate",results,"--clean","-o","automation/reports/allure-report"],{stdio:"inherit",env:{...process.env,...(javaHome?{JAVA_HOME:javaHome}:{})}});
if(result.status===0){
  const report="automation/reports/allure-report";copyFileSync("apps/web/public/ledger-logo.svg",`${report}/ledger-logo.svg`);
  const file=`${report}/index.html`;let html=readFileSync(file,"utf8").replace(/<title>.*?<\/title>/,"<title>LedgerMate 360 • Automation Report</title>");
  html=html.replace("</body>",`<style>#lm-brand{position:fixed;right:24px;top:8px;z-index:9999;display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,#071b2c,#0b806e);padding:10px 22px 10px 12px;border:2px solid #58dfbc;border-radius:18px;box-shadow:0 8px 30px #0005;font:700 18px Arial;color:#fff}#lm-brand img{width:68px;height:68px;object-fit:contain;background:#fff;border-radius:14px;padding:5px}#lm-brand small{font-size:12px;color:#b8f5e5;letter-spacing:1.5px}</style><div id="lm-brand"><img src="ledger-logo.svg" alt="LedgerMate 360 logo"><span>LedgerMate 360<br><small>COMPLETE PRODUCT AUTOMATION</small></span></div></body>`);writeFileSync(file,html);
}
process.exit(result.status??1);
