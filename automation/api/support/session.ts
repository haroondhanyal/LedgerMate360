import type {APIRequestContext} from "@playwright/test";
import {expect} from "@playwright/test";
import {env} from "../../core/config/env";
export async function authenticatedSession(request:APIRequestContext){const login=await request.post(`${env.apiUrl}/auth/login`,{data:{email:env.email,password:env.password}});expect(login.ok()).toBeTruthy();const session=await login.json();const headers={authorization:`Bearer ${session.accessToken}`};const response=await request.get(`${env.apiUrl}/workspaces`,{headers});return {session,headers,workspace:(await response.json())[0]}}
