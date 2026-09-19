import {APIRequestContext,expect} from "@playwright/test";
import {env} from "../config/env";
export class ApiClient{
  constructor(private request:APIRequestContext,private token=""){}
  headers(){return this.token?{authorization:`Bearer ${this.token}`}:undefined}
  async login(email=env.email,password=env.password){const r=await this.request.post(`${env.apiUrl}/auth/login`,{data:{email,password}});expect(r.ok()).toBeTruthy();const body=await r.json();this.token=body.accessToken;return body}
  get(path:string){return this.request.get(`${env.apiUrl}${path}`,{headers:this.headers()})}
  post(path:string,data?:unknown){return this.request.post(`${env.apiUrl}${path}`,{headers:this.headers(),data})}
  patch(path:string,data?:unknown){return this.request.patch(`${env.apiUrl}${path}`,{headers:this.headers(),data})}
  delete(path:string){return this.request.delete(`${env.apiUrl}${path}`,{headers:this.headers()})}
}
