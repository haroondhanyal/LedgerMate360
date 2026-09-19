import {test,expect} from "@playwright/test";
import {env} from "../../core/config/env";


let shared:any,sharedWorkspace:any,sharedHeaders:Record<string,string>;
test.beforeAll(async({request})=>{const login=await request.post(`${env.apiUrl}/auth/login`,{data:{email:env.email,password:env.password}});expect(login.ok()).toBeTruthy();shared=await login.json();sharedHeaders={authorization:`Bearer ${shared.accessToken}`};const workspaces=await request.get(`${env.apiUrl}/workspaces`,{headers:sharedHeaders});sharedWorkspace=(await workspaces.json())[0]});

const publicCases=[
 ["API-001","health returns 200","health",200],["API-002","health status is ok","health-body",200],["API-003","health database connected","health-db",200],
 ["API-004","valid login","login",201],["API-005","invalid password rejected","bad-login",401],["API-006","unknown email rejected","unknown-login",401],
 ["API-007","forgot known email accepted","forgot-known",201],["API-008","forgot unknown email remains private","forgot-unknown",201],["API-009","invalid reset token rejected","reset-invalid",400],
 ["API-010","short reset password rejected","reset-short",400],
] as const;
for(const [id,name,kind,status] of publicCases)test(`${id} ${name}`,async({request})=>{let r;if(kind.startsWith("health"))r=await request.get(`${env.apiUrl}/health`);else if(kind==="login")r=await request.post(`${env.apiUrl}/auth/login`,{data:{email:env.email,password:env.password}});else if(kind==="bad-login")r=await request.post(`${env.apiUrl}/auth/login`,{data:{email:env.email,password:"wrong-password"}});else if(kind==="unknown-login")r=await request.post(`${env.apiUrl}/auth/login`,{data:{email:"missing@example.com",password:"wrong-password"}});else if(kind.startsWith("forgot"))r=await request.post(`${env.apiUrl}/auth/forgot-password`,{data:{email:kind==="forgot-known"?env.email:"missing@example.com"}});else r=await request.post(`${env.apiUrl}/auth/reset-password`,{data:{token:"invalid",password:kind==="reset-short"?"short":"ValidPass123"}});expect(r.status()).toBe(status);if(kind==="health-body")expect((await r.json()).status).toBe("ok");if(kind==="health-db")expect((await r.json()).database).toBe("connected")});

const protectedPaths=["/workspaces","/auth/profile","/notifications","/admin/summary","/workspaces/no-id/accounts","/workspaces/no-id/categories","/workspaces/no-id/transactions","/workspaces/no-id/dashboard","/workspaces/no-id/parties","/workspaces/no-id/khata","/workspaces/no-id/loans","/workspaces/no-id/budgets","/workspaces/no-id/savings","/workspaces/no-id/salary","/workspaces/no-id/members","/workspaces/no-id/shared-expenses","/workspaces/no-id/reports/summary","/workspaces/no-id/evidence","/workspaces/no-id/recurring","/workspaces/no-id/preferences"];
protectedPaths.forEach((path,index)=>test(`API-${String(index+11).padStart(3,"0")} unauthorized access is blocked for ${path}`,async({request})=>expect((await request.get(`${env.apiUrl}${path}`)).status()).toBe(401)));

const workspaceContracts=[
 ["workspaces","array"],["accounts","array"],["categories","array"],["transactions","array"],["dashboard","object"],["parties","array"],["khata","array"],["loans","array"],["budgets","array"],["savings","array"],["salary","array"],["members","array"],["shared-expenses","array"],["reports/summary","object"],["evidence","array"],["recurring","array"],["preferences","object"]
] as const;
workspaceContracts.forEach(([path,type],index)=>test(`API-${String(index+31).padStart(3,"0")} authenticated ${path} contract`,async({request})=>{const route=path==="workspaces"?"/workspaces":`/workspaces/${sharedWorkspace.id}/${path}`;const r=await request.get(`${env.apiUrl}${route}`,{headers:sharedHeaders});expect(r.ok()).toBeTruthy();const body=await r.json();expect(Array.isArray(body)).toBe(type==="array")}));

const fieldContracts=["user.id","user.name","user.email","accessToken","workspace.id","workspace.name","workspace.currency","workspace.timezone","workspace.members","profile.id","profile.name","profile.email","profile.phone"];
fieldContracts.forEach((field,index)=>test(`API-${String(index+48).padStart(3,"0")} response includes ${field}`,async({request})=>{let value:any;if(field.startsWith("user."))value=shared.user[field.split(".")[1]];else if(field==="accessToken")value=shared.accessToken;else if(field.startsWith("workspace."))value=sharedWorkspace[field.split(".")[1]];else{const profile=await (await request.get(`${env.apiUrl}/auth/profile`,{headers:sharedHeaders})).json();value=profile[field.split(".")[1]]}expect(value===null||value!==undefined).toBeTruthy()}));
