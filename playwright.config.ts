import {defineConfig,devices} from "@playwright/test";

const webUrl=process.env.PLAYWRIGHT_WEB_URL??"http://localhost:3000";
const apiUrl=process.env.PLAYWRIGHT_API_URL??"http://127.0.0.1:4000/api";

export default defineConfig({
  testDir:"./e2e",
  globalSetup:"./e2e/global-setup.ts",
  fullyParallel:false,
  forbidOnly:Boolean(process.env.CI),
  retries:process.env.CI?2:0,
  workers:process.env.CI?1:undefined,
  reporter:process.env.CI?[["html",{open:"never"}],["github"]]:[["list"],["html",{open:"never"}]],
  timeout:30_000,
  expect:{timeout:8_000},
  use:{baseURL:webUrl,trace:"on-first-retry",screenshot:"only-on-failure",video:"retain-on-failure"},
  projects:[{name:"chromium",use:{...devices["Desktop Chrome"]}}],
  webServer:[
    {command:"npm run dev -w @ledgermate/api",url:`${apiUrl}/health`,reuseExistingServer:!process.env.CI,timeout:120_000},
    {command:"npm run dev -w @ledgermate/web",url:webUrl,reuseExistingServer:!process.env.CI,timeout:120_000},
  ],
});
