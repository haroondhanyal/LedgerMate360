export type LedgerSide = "DEBIT" | "CREDIT";
export interface Posting { accountId: string; side: LedgerSide; amount: number; memo: string; }
export interface TransactionInput { type: string; amount: number; accountId: string; destinationAccountId?: string; categoryAccountId?: string; }
const assetIncrease = (accountId:string, amount:number, memo:string):Posting => ({accountId,side:"DEBIT",amount,memo});
const assetDecrease = (accountId:string, amount:number, memo:string):Posting => ({accountId,side:"CREDIT",amount,memo});
export function createPostings(tx: TransactionInput): Posting[] {
  if (!Number.isFinite(tx.amount) || tx.amount <= 0) throw new Error("Amount must be positive");
  const offset = tx.categoryAccountId ?? `SYSTEM:${tx.type}`;
  switch (tx.type) {
    case "INCOME": case "LOAN_TAKEN": case "LOAN_RECOVERY": return [assetIncrease(tx.accountId,tx.amount,tx.type), {accountId:offset,side:"CREDIT",amount:tx.amount,memo:tx.type}];
    case "EXPENSE": case "LOAN_GIVEN": case "LOAN_REPAYMENT": case "FEE": case "INTEREST": return [{accountId:offset,side:"DEBIT",amount:tx.amount,memo:tx.type}, assetDecrease(tx.accountId,tx.amount,tx.type)];
    case "TRANSFER": case "SAVINGS_TRANSFER": if(!tx.destinationAccountId) throw new Error("Destination account is required"); return [assetIncrease(tx.destinationAccountId,tx.amount,tx.type), assetDecrease(tx.accountId,tx.amount,tx.type)];
    case "ADJUSTMENT": return [assetIncrease(tx.accountId,tx.amount,tx.type), {accountId:offset,side:"CREDIT",amount:tx.amount,memo:tx.type}];
    default: throw new Error(`Unsupported transaction type: ${tx.type}`);
  }
}
export function assertBalanced(entries: Posting[]) { const debit=entries.filter(e=>e.side==="DEBIT").reduce((s,e)=>s+e.amount,0); const credit=entries.filter(e=>e.side==="CREDIT").reduce((s,e)=>s+e.amount,0); if(Math.abs(debit-credit)>0.0001) throw new Error("Unbalanced ledger entries"); return true; }
export function calculateBalance(opening:number, entries:Posting[], accountId:string){ return entries.filter(e=>e.accountId===accountId).reduce((b,e)=>b+(e.side==="DEBIT"?e.amount:-e.amount),opening); }
