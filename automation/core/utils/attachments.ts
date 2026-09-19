import {test} from "@playwright/test";
export async function attachJson(name:string,value:unknown){await test.info().attach(name,{body:Buffer.from(JSON.stringify(value,null,2)),contentType:"application/json"})}
