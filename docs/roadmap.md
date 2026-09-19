# Delivery roadmap

## Phase 1 — core platform

Monorepo, auth, tenant workspaces, onboarding, accounts, transactions, double entry ledger, audit log and live dashboard are implemented. The initial PostgreSQL migration is committed and the complete registration-to-ledger flow has passed a database smoke test.

## Phase 2 — personal finance modules

Implemented: parties and Khata balances, money given/received entries, loan principal and interest tracking, repayment progress, salary profiles, budget thresholds, savings goals and contributions. All records are tenant scoped and protected by workspace roles. Repayment schedules and module-to-ledger automation remain part of the next accounting expansion.

## Phase 3 — collaboration and data

Add shared expense splitting and settlement, private/shared family visibility, signed evidence uploads, financial reports, confirmed column mapping, duplicate detection and Excel import/export.

## Phase 4 — recurring experience

Add theme tokens, typography preferences, notification channels, recurring rules, upcoming calendar and subscription tracking.

## Phase 5 — assisted finance

Add provider based AI, receipt OCR, proposed Excel mappings, anomaly detection and natural language queries. Mutations always require a user confirmation.

## Phase 6 — SaaS operations

Add configurable plans and features, usage metering, billing providers and a separate platform admin permission boundary.

## Phase 7 — production readiness

Add integration and browser tests, rate limits, secure uploads, backups, retention jobs, Docker images, CI, deployment, metrics, tracing and alerts.
