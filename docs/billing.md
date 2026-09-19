# Billing

Billing uses the `BillingProvider` interface. Local development provides `LocalBillingProvider`; Stripe or Paddle implementations can be added without changing subscription domain records. Plans, features and limits are database configured. Subscription cancellation must update status and preserve finance records.
