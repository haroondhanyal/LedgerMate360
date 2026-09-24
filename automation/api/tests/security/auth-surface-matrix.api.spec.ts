import {expect,test} from "../../../core/fixtures/api-test";
import {env} from "../../../core/config/env";

const workspace="00000000-0000-4000-8000-000000000001";
const record="00000000-0000-4000-8000-000000000002";
const missing={name:"missing token",headers:{}};
const invalid={name:"invalid token",headers:{authorization:"Bearer invalid-ledgermate-token"}};
const malformed={name:"malformed token",headers:{authorization:"Bearer"}};
let id=161;

function blocked(method:string,path:string,mode:{name:string;headers:Record<string,string>}){
  const caseId=`API-${String(id++).padStart(3,"0")}`;
  test(`${caseId} ${method} ${path} rejects ${mode.name}`,async({request})=>{
    const response=await request.fetch(`${env.apiUrl}${path}`,{
      method,
      headers:mode.headers,
      data:["GET","DELETE"].includes(method)?undefined:{name:"Unauthorized request",amount:10,role:"VIEWER"}
    });
    expect(response.status()).toBe(401);
  });
}

const reads=[
  "/workspaces","/auth/profile","/notifications","/admin/summary",
  `/workspaces/${workspace}/accounts`,`/workspaces/${workspace}/categories`,
  `/workspaces/${workspace}/transactions`,`/workspaces/${workspace}/dashboard`,
  `/workspaces/${workspace}/parties`,`/workspaces/${workspace}/khata`,
  `/workspaces/${workspace}/loans`,`/workspaces/${workspace}/budgets`,
  `/workspaces/${workspace}/savings`,`/workspaces/${workspace}/salary`,
  `/workspaces/${workspace}/members`,`/workspaces/${workspace}/shared-expenses`,
  `/workspaces/${workspace}/reports/summary`,`/workspaces/${workspace}/evidence`,
  `/workspaces/${workspace}/recurring`,`/workspaces/${workspace}/preferences`
];
for(const path of reads)blocked("GET",path,invalid);

const resources=["accounts","transactions","parties","khata","loans","budgets","savings","salary"];
for(const resource of resources)for(const method of ["PATCH","DELETE"]){
  const path=`/workspaces/${workspace}/${resource}/${record}`;
  for(const mode of [missing,invalid])blocked(method,path,mode);
}
for(const [method,path] of [
  ["DELETE",`/workspaces/${workspace}/evidence/${record}`],
  ["PATCH",`/workspaces/${workspace}/members/${record}`],
  ["DELETE",`/workspaces/${workspace}/members/${record}`],
  ["PATCH",`/workspaces/${workspace}/loans/${record}/payment`],
  ["PATCH",`/workspaces/${workspace}/savings/${record}/contribution`]
])for(const mode of [missing,invalid])blocked(method,path,mode);

const protectedOperations:[string,string][]=[
  ["POST","/workspaces"],
  ["PATCH","/auth/profile"],
  ["PATCH","/auth/password"],
  ["GET","/auth/password-reset-requests"],
  ["PATCH",`/auth/password-reset-requests/${record}/approve`],
  ["POST",`/workspaces/${workspace}/members`],
  ["POST",`/workspaces/${workspace}/shared-expenses`],
  ["PATCH",`/workspaces/${workspace}/shared-expenses/splits/${record}/settle`],
  ["POST",`/workspaces/${workspace}/import/preview`],
  ["PATCH",`/notifications/${record}/read`],
  ["PATCH",`/workspaces/${workspace}/preferences`],
  ["POST",`/workspaces/${workspace}/ai/ask`],
  ["POST",`/workspaces/${workspace}/subscription`],
  ["POST","/admin/plans/seed"],
  ["GET",`/workspaces/${workspace}/export/csv`]
];
for(const [method,path] of protectedOperations)for(const mode of [missing,invalid])blocked(method,path,mode);

for(const period of ["day","month"])for(const mode of [missing,invalid])blocked("GET",`/workspaces/${workspace}/dashboard?period=${period}`,mode);

const malformedPaths=[
  "/workspaces","/auth/profile","/notifications","/admin/summary",
  `/workspaces/${workspace}/accounts`,`/workspaces/${workspace}/transactions`,
  `/workspaces/${workspace}/dashboard`,`/workspaces/${workspace}/parties`,
  `/workspaces/${workspace}/loans`,`/workspaces/${workspace}/budgets`,
  `/workspaces/${workspace}/savings`,`/workspaces/${workspace}/reports/summary`,
  `/workspaces/${workspace}/members`,`/workspaces/${workspace}/evidence`
];
for(const path of malformedPaths)blocked("GET",path,malformed);

if(id!==271)throw new Error(`Expected 110 additional API cases; generated ${id-161}`);
