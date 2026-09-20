import {test,expect} from "../../../core/fixtures/api-test";
import {authenticatedSession} from "../../support/session";
import {env} from "../../../core/config/env";
import {faker} from "@faker-js/faker";

type Flow={name:string;path:string;create:(i:number)=>Record<string,unknown>;update:(i:number)=>Record<string,unknown>;supportsUpdate?:boolean;supportsDelete?:boolean};
const now=()=>new Date().toISOString();
const flows:Flow[]=[
  {name:"account",path:"accounts",create:i=>({name:`E2E Cash ${i} ${faker.string.alphanumeric(6)}`,type:"CASH",openingBalance:1000+i,currency:"PKR",color:"#14b88a",institution:"LedgerMate Test Bank",notes:"Automated positive flow"}),update:i=>({notes:`Updated API dataset ${i}`,institution:"Updated Test Bank"})},
  {name:"party",path:"parties",create:i=>({name:`E2E Party ${i} ${faker.string.alphanumeric(6)}`,type:["PERSON","FAMILY","FRIEND","SUPPLIER","OTHER"][i%5],phone:`+92300123${String(i).padStart(4,"0")}`,email:`party-${Date.now()}-${i}@example.com`,notes:"Automation party"}),update:i=>({notes:`Updated party dataset ${i}`})},
  {name:"loan",path:"loans",create:i=>({name:`E2E Loan ${i} ${faker.string.alphanumeric(6)}`,direction:i%2?"GIVEN":"TAKEN",principal:5000+i*100,interestRate:i,installment:500,frequency:"MONTHLY",startDate:now(),notes:"Automation loan"}),update:i=>({notes:`Updated loan dataset ${i}`,interestRate:i+1})},
  {name:"budget",path:"budgets",create:i=>({name:`E2E Budget ${i} ${faker.string.alphanumeric(6)}`,category:`Category ${i}`,amount:10000+i*100,period:"MONTHLY",threshold:70+i,startsAt:now()}),update:i=>({threshold:75+i})},
  {name:"savings",path:"savings",create:i=>({name:`E2E Goal ${i} ${faker.string.alphanumeric(6)}`,targetAmount:20000+i*100,savedAmount:1000,monthlyContribution:500,targetDate:new Date(Date.now()+86400000*90).toISOString(),priority:i%2?"HIGH":"MEDIUM"}),update:i=>({monthlyContribution:700+i})},
  {name:"salary",path:"salary",create:i=>({employer:`E2E Employer ${i} ${faker.string.alphanumeric(5)}`,grossSalary:100000+i*1000,netSalary:85000+i*1000,tax:10000,allowances:5000,deductions:10000,salaryDay:i+1}),update:i=>({allowances:7000+i})},
  {name:"recurring",path:"recurring",create:i=>({name:`E2E Recurring ${i} ${faker.string.alphanumeric(5)}`,type:"EXPENSE",amount:1500+i,frequency:"MONTHLY",nextRunAt:new Date(Date.now()+86400000*30).toISOString(),category:"Utilities"}),update:i=>({name:`unsupported-${i}`}),supportsUpdate:false,supportsDelete:false},
  {name:"evidence",path:"evidence",create:i=>({fileName:`receipt-${i}.png`,mimeType:"image/png",fileSize:68,relatedType:"Automation",relatedId:`dataset-${Date.now()}-${i}`,description:"PNG evidence asset",dataUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="}),update:i=>({description:`Evidence ${i}`}),supportsUpdate:false}
];

test.describe("API | End to end CRUD | Multiple datasets",()=>{
  flows.forEach((flow,flowIndex)=>Array.from({length:5},(_,dataset)=>test(`API-${String(61+flowIndex*5+dataset).padStart(3,"0")} ${flow.name} create read update delete dataset ${dataset+1}`,async({request},testInfo)=>{
    const {headers,workspace}=await authenticatedSession(request),base=`${env.apiUrl}/workspaces/${workspace.id}/${flow.path}`;
    const createdResponse=await request.post(base,{headers,data:flow.create(dataset+1)});expect(createdResponse.ok()).toBeTruthy();const created=await createdResponse.json();
    await testInfo.attach("create-response",{body:Buffer.from(JSON.stringify(created,null,2)),contentType:"application/json"});
    const list=await request.get(base,{headers});expect(list.ok()).toBeTruthy();expect(JSON.stringify(await list.json())).toContain(created.id);
    if(flow.supportsUpdate!==false){const updated=await request.patch(`${base}/${created.id}`,{headers,data:flow.update(dataset+1)});expect(updated.ok()).toBeTruthy()}
    if(flow.supportsDelete!==false){const removed=await request.delete(`${base}/${created.id}`,{headers});expect(removed.ok()).toBeTruthy()}
  })));
});
