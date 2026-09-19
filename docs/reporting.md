# Reporting

Reports are derived from tenant scoped transactions, accounts, loans, Khata entries and savings goals. `GET /api/workspaces/:id/reports/summary` returns income, expense, cash flow, assets, liabilities, outstanding loans, receivables and savings. CSV export uses the same authorized workspace boundary.
