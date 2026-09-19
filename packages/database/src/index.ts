import { PrismaClient } from "@prisma/client";
const globalDb=globalThis as unknown as {prisma?:PrismaClient};
export const prisma=globalDb.prisma ?? new PrismaClient();
if(process.env.NODE_ENV!=="production") globalDb.prisma=prisma;
export { PrismaClient } from "@prisma/client";
