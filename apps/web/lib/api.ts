const API_URL=process.env.NEXT_PUBLIC_API_URL??"http://localhost:4000/api";
export class ApiError extends Error{constructor(message:string,public status:number){super(message)}}
export async function api<T>(path:string,options:RequestInit={},token?:string):Promise<T>{const response=await fetch(`${API_URL}${path}`,{...options,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{}) ,...options.headers}});const isJson=response.headers.get("content-type")?.includes("json"),data:any=isJson?await response.json().catch(()=>null):await response.text();if(!response.ok){const message=Array.isArray(data?.message)?data.message.join(", "):data?.message??"Something went wrong";throw new ApiError(message,response.status)}return data as T}
export type Session={accessToken:string;user:{id:string;name:string;email:string;phone?:string|null;country?:string|null;avatarUrl?:string|null}};
export type Workspace={id:string;name:string;currency:string;timezone:string;members?:{role:string}[];_count?:{accounts:number;transactions:number}};
export type Account={id:string;name:string;type:string;openingBalance:string;currentBalance:string;currency:string;color?:string};
export type Category={id:string;name:string;kind:string;color?:string};
export type Transaction={id:string;type:string;amount:string;date:string;description:string;status:string;account:Account;destinationAccount?:Account|null;evidence?:{id:string;fileName:string;mimeType:string;dataUrl?:string|null}[]};
export type Summary={availableBalance:number;totalAssets:number;totalLiabilities:number;netWorth:number;monthlyIncome:number;monthlyExpense:number;monthlySavings:number;savingsRate:number;cashflowTrend?:{label:string;income:number;expense:number}[]};
