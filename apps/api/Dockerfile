FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/finance-engine/package.json packages/finance-engine/package.json
COPY packages/validation/package.json packages/validation/package.json
RUN npm ci
COPY . .
RUN npm run db:generate && npm run build -w @ledgermate/api
EXPOSE 4000
CMD ["npm","run","start","-w","@ledgermate/api"]
