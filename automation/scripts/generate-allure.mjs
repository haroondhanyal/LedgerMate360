import {existsSync,copyFileSync,readFileSync,writeFileSync,readdirSync,statSync} from "node:fs";import {basename,join} from "node:path";import {execFileSync,spawnSync} from "node:child_process";
let javaHome=process.env.JAVA_HOME;if(!javaHome||!existsSync(javaHome)){try{javaHome=execFileSync("/usr/libexec/java_home",{encoding:"utf8"}).trim()}catch{javaHome=undefined}}
const results="automation/reports/allure-results";
for(const suite of ["api","ui","bdd"]){const saved=`automation/reports/allure-${suite}-results`,nested=join(results,suite),dir=existsSync(saved)?saved:nested;if(!existsSync(dir))continue;for(const file of readdirSync(dir)){const source=join(dir,file);if(statSync(source).isFile())copyFileSync(source,join(results,`${suite}-${basename(file)}`))}}
const result=spawnSync("npx",["allure","generate",results,"--clean","-o","automation/reports/allure-report"],{stdio:"inherit",env:{...process.env,...(javaHome?{JAVA_HOME:javaHome}:{})}});
if(result.status===0){
  const report="automation/reports/allure-report";copyFileSync("apps/web/public/ledger-logo.svg",`${report}/ledger-logo.svg`);
  const file=`${report}/index.html`;let html=readFileSync(file,"utf8").replace(/<title>.*?<\/title>/,"<title>LedgerMate 360 • Automation Report</title>");
  html=html.replace("</body>",`<style>#lm-brand{position:fixed;right:24px;top:10px;z-index:9999;display:flex;align-items:center;gap:10px;background:#fff;padding:6px 13px;border-radius:12px;box-shadow:0 4px 18px #0002;font:600 14px Arial;color:#19324d}#lm-brand img{width:36px;height:36px}</style><div id="lm-brand"><img src="ledger-logo.svg"><span>LedgerMate 360<br><small>API • UI • BDD</small></span></div></body>`);writeFileSync(file,html);
}
process.exit(result.status??1);
