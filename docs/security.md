# Security

- JWT authentication and bcrypt password hashes
- Workspace membership checks on every tenant route
- Role checks before financial writes
- Account and related entity ownership validation
- Helmet headers, explicit CORS and per IP rate limiting
- Zod boundary validation with safe 400 responses
- Atomic ledger and audit writes
- Platform admin boundary separate from workspace roles
- Environment based secrets and database credentials

Production deployment should replace local JWT storage with rotating secure cookies, use a managed secrets store, signed object storage URLs, encrypted backups and an external rate limit store.
