import {execFileSync} from "node:child_process";
const playwright=execFileSync("npx",["playwright","test","--list"],{encoding:"utf8",env:{...process.env,NO_COLOR:"1"}});
const cucumber=execFileSync("npx",["cucumber-js","--dry-run","--format","summary"],{encoding:"utf8",env:{...process.env,NO_COLOR:"1"}});
const pw=Number(playwright.match(/Total:\s+(\d+) tests?/)?.[1]??0);
const bdd=Number(cucumber.match(/(\d+) scenarios?/)?.[1]??0);
const api=(playwright.match(/API-\d{3}/g)??[]).length,ui=(playwright.match(/UI-\d{3}/g)??[]).length,total=pw+bdd;
if(api!==100||ui!==83||bdd!==40||total!==223)throw new Error(`Automation inventory mismatch: API=${api}, UI=${ui}, Cucumber=${bdd}, total=${total}`);
console.log(`LedgerMate automation inventory verified: API=${api}, UI=${ui}, Cucumber=${bdd}, total=${total}`);
