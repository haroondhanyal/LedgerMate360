# Deployment

Local infrastructure runs PostgreSQL on port 5433 and Redis on 6379. `docker compose up -d` starts data services. `docker compose --profile full up --build` builds the API, web and worker services as well.

Deploy migrations before API rollout. Run the worker on a separate process. Configure `DATABASE_URL`, `JWT_SECRET`, `WEB_URL`, `NEXT_PUBLIC_API_URL` and provider credentials in the deployment secret manager. Monitor `/api/health`, structured worker output, error rates, latency and database capacity.
