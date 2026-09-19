export type RoleName = "OWNER" | "ADMIN" | "FINANCE_MANAGER" | "MEMBER" | "VIEWER" | "AUDITOR";
export type AccountType = "CASH" | "BANK" | "SAVINGS" | "MOBILE_WALLET" | "CREDIT_CARD" | "INVESTMENT" | "LOAN" | "CUSTOM";
export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER" | "SAVINGS_TRANSFER" | "LOAN_TAKEN" | "LOAN_GIVEN" | "LOAN_REPAYMENT" | "LOAN_RECOVERY" | "RECEIVABLE" | "PAYABLE" | "ADJUSTMENT" | "INTEREST" | "FEE";
export type TransactionStatus = "PENDING" | "CLEARED" | "OVERDUE" | "CANCELLED";
export interface DashboardSummary { availableBalance: number; totalAssets: number; totalLiabilities: number; netWorth: number; monthlyIncome: number; monthlyExpense: number; monthlySavings: number; savingsRate: number; }
