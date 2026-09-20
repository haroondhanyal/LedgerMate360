import {rmSync} from "node:fs";
const suite=process.argv[2];
if(!["api","ui","bdd"].includes(suite))throw new Error("Expected suite: api, ui or bdd");
rmSync(`automation/reports/allure-results/${suite}`,{recursive:true,force:true});
rmSync(`automation/reports/allure-${suite}-results`,{recursive:true,force:true});
