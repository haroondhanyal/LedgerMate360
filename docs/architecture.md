# Architecture

The browser talks to a NestJS REST API. The API authenticates the caller, resolves workspace membership, and sends commands through the finance service. Prisma writes the transaction, ledger entries, account balances, and audit event in one PostgreSQL transaction.

Every tenant record contains `workspaceId`. Services verify membership before queries and include the workspace in each filter. Account IDs supplied by clients are also checked against the selected workspace.

## Financial truth

`Transaction` records capture user intent. `LedgerEntry` records capture balanced debits and credits. Transfers credit the source asset and debit the destination asset, so they never appear as income or expense. Income, expenses, fees and loan movements post against hidden system accounts. Reports should read from this ledger instead of maintaining separate balances in each product module.

## Authorization

JWT authentication identifies the user. Workspace membership provides tenant access and a role. Phase 1 blocks writes for Viewer and Auditor. Phase 2 will move permission checks to configurable `Role`, `Permission`, and `RolePermission` records.

## Safety properties

- Tenant filters are enforced in the service, not inferred from the client.
- Money writes and audit events share one database transaction.
- Financial records are designed for archive and reversal flows.
- Passwords are hashed with bcrypt cost 12.
- Helmet, explicit CORS and DTO validation protect the HTTP boundary.
