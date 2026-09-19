import {existsSync} from "node:fs";import {execFileSync,spawnSync} from "node:child_process";
let javaHome=process.env.JAVA_HOME;if(!javaHome||!existsSync(javaHome)){try{javaHome=execFileSync("/usr/libexec/java_home",{encoding:"utf8"}).trim()}catch{javaHome=undefined}}
const result=spawnSync("npx",["allure","generate","automation/reports/allure-results","--clean","-o","automation/reports/allure-report"],{stdio:"inherit",env:{...process.env,...(javaHome?{JAVA_HOME:javaHome}:{})}});process.exit(result.status??1);
