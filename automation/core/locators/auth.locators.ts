import type {Page} from "@playwright/test";
export const authLocators=(page:Page)=>({
  backToSignIn:page.getByRole("button",{name:"Back to sign in"}),
  forgotPassword:page.getByRole("button",{name:"Forgot password?"}),
  email:page.getByLabel("Email address"),
  password:page.getByLabel("Password",{exact:true}),
  sendReset:page.getByRole("button",{name:"Send reset instructions"}),
  createAccountHeading:page.getByRole("heading",{name:"Create your account"})
});
