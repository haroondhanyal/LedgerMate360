export type TestEnvironment="local"|"qa"|"staging";
const profiles={
  local:{webUrl:"http://localhost:3000",apiUrl:"http://127.0.0.1:4000/api"},
  qa:{webUrl:process.env.QA_WEB_URL??"http://localhost:3000",apiUrl:process.env.QA_API_URL??"http://127.0.0.1:4000/api"},
  staging:{webUrl:process.env.STAGING_WEB_URL??"http://localhost:3000",apiUrl:process.env.STAGING_API_URL??"http://127.0.0.1:4000/api"},
};
const name=(process.env.TEST_ENV??"local") as TestEnvironment;
export const env={name,...profiles[name],email:process.env.TEST_EMAIL??"demo@ledgermate.local",password:process.env.TEST_PASSWORD??"LedgerMate@360"};
