import http from "k6/http";
import {check,group} from "k6";
import exec from "k6/execution";

export const options={vus:Number(__ENV.K6_VUS||5),iterations:Number(__ENV.K6_ITERATIONS||20),thresholds:{http_req_failed:["rate<0.01"],http_req_duration:["p(95)<1500"]}};
const api=__ENV.API_URL||"http://127.0.0.1:4000/api";
const definitions=[
 ["01 Health baseline","/health",false],["02 Dashboard baseline","/dashboard",true],["03 Accounts baseline","/accounts",true],["04 Transactions baseline","/transactions",true],["05 Reports baseline","/reports/summary",true],
 ["06 Accounts load","/accounts",true],["07 Transactions load","/transactions",true],["08 Parties load","/parties",true],["09 Khata load","/khata",true],["10 Loans load","/loans",true],
 ["11 Budgets load","/budgets",true],["12 Savings load","/savings",true],["13 Salary load","/salary",true],["14 Members load","/members",true],["15 Evidence load","/evidence",true],
 ["16 Accounts resilience","/accounts",true],["17 Transactions resilience","/transactions",true],["18 Unknown route resilience","/unknown-performance-route",true],["19 Dashboard spike","/dashboard",true],["20 Mixed finance spike","/loans",true]
];

export function setup(){const login=http.post(`${api}/auth/login`,JSON.stringify({email:__ENV.TEST_EMAIL||"demo@ledgermate.local",password:__ENV.TEST_PASSWORD||"LedgerMate@360"}),{headers:{"content-type":"application/json"}});check(login,{"performance login succeeds":r=>r.status===200});const session=login.json(),workspaces=http.get(`${api}/workspaces`,{headers:{authorization:`Bearer ${session.accessToken}`}}).json();return {token:session.accessToken,workspaceId:workspaces[0].id}}

export default function(data){const [name,path,workspaceScoped]=definitions[exec.scenario.iterationInTest%definitions.length];group(name,()=>{const target=workspaceScoped?`/workspaces/${data.workspaceId}${path}`:path,response=http.get(`${api}${target}`,{headers:{authorization:`Bearer ${data.token}`}});check(response,{[`${name} status accepted`]:r=>r.status>=200&&r.status<500})})}
