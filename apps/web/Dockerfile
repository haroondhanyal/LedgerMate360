FROM node:24-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build -w @ledgermate/web
EXPOSE 3000
CMD ["npm","run","start","-w","@ledgermate/web"]
