import {test,expect} from '../../../core/fixtures/api-test';
import {env} from '../../../core/config/env';
const resources=['accounts','transactions','parties','khata','loans','budgets','savings','salary','evidence','recurring'];
for(const [index,resource] of resources.entries())for(const [variant,token] of [undefined,'invalid-ledgermate-token'].entries())test(`API-${141+index*2+variant} ${resource} creation rejects ${token?'invalid':'missing'} authentication`,async({request},testInfo)=>{
 const response=await request.post(`${env.apiUrl}/workspaces/00000000-0000-4000-8000-000000000001/${resource}`,{headers:token?{authorization:`Bearer ${token}`}:{},data:{name:'Unauthorized mutation',amount:10}});
 await testInfo.attach('LedgerMate mutation rejection',{body:JSON.stringify({resource,authentication:token?'invalid':'missing',status:response.status(),response:await response.json()},null,2),contentType:'application/json'});
 expect(response.status()).toBe(401);
});
