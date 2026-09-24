import {After,Before,Given,Then,When,setDefaultTimeout,setWorldConstructor,World} from "@cucumber/cucumber";
import {Browser,BrowserContext,Page,chromium,expect} from "@playwright/test";
import {readFileSync} from "node:fs";
import {env} from "../../core/config/env";
class LedgerWorld extends World{browser!:Browser;context!:BrowserContext;page!:Page}
setWorldConstructor(LedgerWorld);setDefaultTimeout(30_000);
Before(async function(this:LedgerWorld){this.browser=await chromium.launch({headless:process.env.HEADED!=="true"});this.context=await this.browser.newContext({recordVideo:{dir:"automation/reports/videos"}});this.page=await this.context.newPage()});
After(async function(this:LedgerWorld){
  const video=this.page?.video();
  if(this.page&&!this.page.isClosed())this.attach(await this.page.screenshot({fullPage:true}),"image/png");
  await this.context?.close();
  if(video){const videoPath=await video.path();this.attach(Buffer.from(readFileSync(videoPath) as Buffer),"video/webm")}
  await this.browser?.close();
});
async function authMode(page:Page,mode:string){if(mode==="register")return;const back=page.getByRole("button",{name:"Back to sign in"});await back.waitFor({state:"visible"});await back.click();if(mode==="forgot")await page.getByRole("button",{name:"Forgot password?"}).click()}
async function signIn(page:Page){await page.goto(env.webUrl);await page.getByRole("button",{name:"Back to sign in"}).click();await page.getByLabel("Email address").fill(env.email);await page.getByLabel("Password",{exact:true}).fill(env.password);await page.getByRole("button",{name:"Sign in",exact:true}).click();await expect(page.locator(".sidebar-user")).toBeVisible({timeout:20_000})}
Given("I open LedgerMate authentication",async function(this:LedgerWorld){await this.page.goto(env.webUrl);await this.page.evaluate(()=>localStorage.clear());await this.page.reload()});
Given("I am signed in to LedgerMate",async function(this:LedgerWorld){await signIn(this.page)});
When("I choose authentication mode {string}",async function(this:LedgerWorld,mode:string){await authMode(this.page,mode)});
When("I open the {string} module",async function(this:LedgerWorld,module:string){if(["Settings","Profile"].includes(module)){await this.page.locator(".sidebar-user").click();await this.page.getByRole("button",{name:module==="Profile"?"Profile settings":"Appearance",exact:true}).click()}else await this.page.getByRole("button",{name:module,exact:true}).click()});
Then("I should see authentication heading {string}",async function(this:LedgerWorld,heading:string){await expect(this.page.getByRole("heading",{name:heading})).toBeVisible()});
Then("the page title should be {string}",async function(this:LedgerWorld,title:string){await expect(this.page.locator("header h1")).toContainText(title)});
Then("I should see the action {string}",async function(this:LedgerWorld,action:string){await expect(this.page.getByRole("button",{name:action,exact:true}).first()).toBeVisible()});
Then("I should see content containing {string}",async function(this:LedgerWorld,content:string){await expect(this.page.locator("body")).toContainText(content,{ignoreCase:true})});
