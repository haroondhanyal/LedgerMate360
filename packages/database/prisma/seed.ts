import {PrismaClient} from "@prisma/client";
const db=new PrismaClient();
const plans=[{code:"FREE",name:"Free",priceMonthly:0},{code:"PERSONAL_PRO",name:"Personal Pro",priceMonthly:999},{code:"FAMILY",name:"Family",priceMonthly:1499},{code:"PREMIUM",name:"Premium",priceMonthly:2499}];
for(const plan of plans)await db.subscriptionPlan.upsert({where:{code:plan.code},create:plan,update:{name:plan.name,priceMonthly:plan.priceMonthly}});
await db.$disconnect();
console.log("LedgerMate plans seeded");
