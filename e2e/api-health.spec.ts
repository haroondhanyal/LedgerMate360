import {test,expect} from "@playwright/test";
import {apiUrl,demo} from "./helpers";

test("API health, authentication and workspace access",async({request})=>{
  const health=await request.get(`${apiUrl}/health`);
  expect(health.ok()).toBeTruthy();
  await expect(health.json()).resolves.toMatchObject({status:"ok",database:"connected"});
  const login=await request.post(`${apiUrl}/auth/login`,{data:demo});
  expect(login.ok()).toBeTruthy();
  const session=await login.json();
  const workspaces=await request.get(`${apiUrl}/workspaces`,{headers:{authorization:`Bearer ${session.accessToken}`}});
  expect(workspaces.ok()).toBeTruthy();
  expect((await workspaces.json()).length).toBeGreaterThan(0);
});
