import {cpSync,existsSync,rmSync} from "node:fs";
const suite=process.argv[2];if(!suite)throw new Error("Suite name is required");
const source=`automation/reports/allure-results/${suite}`,target=`automation/reports/allure-${suite}-results`;
if(!existsSync(source))throw new Error(`Missing Allure suite results: ${source}`);
rmSync(target,{recursive:true,force:true});cpSync(source,target,{recursive:true});
console.log(`Preserved ${suite} Allure results.`);
