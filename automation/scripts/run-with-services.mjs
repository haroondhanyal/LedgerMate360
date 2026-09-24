import {spawn} from "node:child_process";

const args=process.argv.slice(2),separator=args.indexOf("--"),apiOnly=args.includes("--api-only");
if(separator<0||separator===args.length-1)throw new Error("Usage: run-with-services.mjs [--api-only] -- <command> [args]");
const command=args[separator+1],commandArgs=args.slice(separator+2),children=[];
const apiUrl=process.env.API_URL??"http://127.0.0.1:4001/api",webUrl=process.env.WEB_URL??"http://127.0.0.1:3001";
async function ready(url){try{return (await fetch(url)).status<500}catch{return false}}
async function waitFor(url,label){const deadline=Date.now()+120_000;while(Date.now()<deadline){if(await ready(url))return;await new Promise(resolve=>setTimeout(resolve,500))}throw new Error(`${label} did not become ready at ${url}`)}
function start(workspace){const api=workspace==="@ledgermate/api",port=api?"4001":"3001",child=spawn("npm",["run","dev","-w",workspace],{stdio:"inherit",env:{...process.env,PORT:port,...(api?{WEB_URL:"http://localhost:3001"}:{NEXT_PUBLIC_API_URL:"http://localhost:4001/api"})}});children.push(child);return child}
function stop(){for(const child of children)if(!child.killed)child.kill("SIGTERM")}
process.once("SIGINT",()=>{stop();process.exit(130)});process.once("SIGTERM",()=>{stop();process.exit(143)});
let exitCode=1;
try{
 if(!await ready(`${apiUrl}/health`))start("@ledgermate/api");
 if(!apiOnly&&!await ready(webUrl))start("@ledgermate/web");
 await waitFor(`${apiUrl}/health`,"LedgerMate API");
 if(!apiOnly)await waitFor(webUrl,"LedgerMate Web");
 exitCode=await new Promise((resolve,reject)=>{const child=spawn(command,commandArgs,{stdio:"inherit",env:process.env});child.once("error",reject);child.once("exit",code=>resolve(code??1))});
}finally{stop()}
process.exit(exitCode);
