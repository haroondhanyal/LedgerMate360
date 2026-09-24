import {defineConfig,devices} from "@playwright/test";
import {env} from "./automation/core/config/env";

export default defineConfig({
  testDir:"./automation",
  testMatch:["api/tests/**/*.spec.ts","ui/tests/**/*.spec.ts"],
  globalSetup:"./automation/global-setup.ts",
  fullyParallel:false,
  forbidOnly:Boolean(process.env.CI),
  retries:process.env.CI?2:1,
  workers:1,
  reporter:process.env.CI?[["github"],["allure-playwright",{resultsDir:process.env.ALLURE_RESULTS_DIR??"automation/reports/allure-results/playwright"}],["html",{outputFolder:"automation/reports/playwright-html",open:"never"}]]:[["list"],["allure-playwright",{resultsDir:process.env.ALLURE_RESULTS_DIR??"automation/reports/allure-results/playwright"}],["html",{outputFolder:"automation/reports/playwright-html",open:"never"}]],
  timeout:60_000,
  expect:{timeout:8_000},
  outputDir:"automation/reports/test-results",
  use:{baseURL:env.webUrl,trace:"on",screenshot:"on",video:"on"},
  projects:[{name:"chromium",use:{...devices["Desktop Chrome"]}}],
  webServer:[
    {command:"PORT=4001 WEB_URL=http://localhost:3001 npm run dev -w @ledgermate/api",url:`${env.apiUrl}/health`,reuseExistingServer:!process.env.CI,timeout:120_000},
    {command:"PORT=3001 NEXT_PUBLIC_API_URL=http://localhost:4001/api npm run dev -w @ledgermate/web",url:env.webUrl,reuseExistingServer:!process.env.CI,timeout:120_000},
  ],
});
