import {test,expect} from "../../../core/fixtures/api-test";import {env} from "../../../core/config/env";import {authenticatedSession} from "../../support/session";
const publicCases=Array.from({length:10},(_,i)=>({id:101+i,name:`malformed login dataset ${i+1}`,path:"/auth/login",data:i%2?{email:`invalid-${i}`,password:"short"}:{email:"",password:""},statuses:[400,401]}));
const protectedCases=["accounts","transactions","parties","khata","loans","budgets","savings","salary","members","evidence"];
test.describe("API | Negative | Validation matrix",()=>{
 publicCases.forEach(c=>test(`API-${c.id} ${c.name}`,async({request})=>expect(c.statuses).toContain((await request.post(`${env.apiUrl}${c.path}`,{data:c.data})).status())));
 protectedCases.forEach((path,index)=>Array.from({length:3},(_,dataset)=>test(`API-${String(111+index*3+dataset).padStart(3,"0")} ${path} rejects invalid resource dataset ${dataset+1}`,async({request})=>{const {headers,workspace}=await authenticatedSession(request);const response=await request.post(`${env.apiUrl}/workspaces/${workspace.id}/${path}`,{headers,data:{name:"",amount:dataset?0:-1}});expect(response.status()).toBeGreaterThanOrEqual(400)})));
});
