import {request} from "@playwright/test";
import {apiUrl,demo} from "./helpers";

export default async function globalSetup(){
  const api=await request.newContext();
  let response=await api.post(`${apiUrl}/auth/login`,{data:demo});
  if(!response.ok())response=await api.post(`${apiUrl}/auth/register`,{data:{name:"LedgerMate Demo",...demo,country:"Pakistan",preferredRole:"MEMBER"}});
  if(!response.ok())throw new Error(`Unable to prepare E2E user: ${response.status()} ${await response.text()}`);
  const session=await response.json(),headers={authorization:`Bearer ${session.accessToken}`};
  const workspaceResponse=await api.get(`${apiUrl}/workspaces`,{headers});
  if(!workspaceResponse.ok())throw new Error(`Unable to load E2E workspaces: ${await workspaceResponse.text()}`);
  if(!(await workspaceResponse.json()).length){
    const created=await api.post(`${apiUrl}/workspaces`,{headers,data:{name:"LedgerMate E2E",currency:"PKR",timezone:"Asia/Karachi"}});
    if(!created.ok())throw new Error(`Unable to create E2E workspace: ${await created.text()}`);
    const workspace=await created.json();
    const account=await api.post(`${apiUrl}/workspaces/${workspace.id}/accounts`,{headers,data:{name:"E2E Cash",type:"CASH",currency:"PKR",openingBalance:0}});
    if(!account.ok())throw new Error(`Unable to create E2E account: ${await account.text()}`);
  }
  await api.dispose();
}
