export interface BillingCheckout{provider:string;externalId:string;status:"TRIAL"|"ACTIVE";currentPeriodEnd:Date}
export interface BillingProvider{createCheckout(workspaceId:string,planCode:string):Promise<BillingCheckout>;cancel(externalId:string):Promise<void>}
export class LocalBillingProvider implements BillingProvider{async createCheckout(workspaceId:string,planCode:string){return {provider:"LOCAL",externalId:`local_${workspaceId}_${planCode}`,status:"TRIAL" as const,currentPeriodEnd:new Date(Date.now()+30*86400000)}}async cancel(){return}}
