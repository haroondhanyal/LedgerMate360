import type {Page} from "@playwright/test";
export const authLocators=(page:Page)=>({
  backToSignIn:page.getByRole("button",{name:"Back to sign in"}),
  forgotPassword:page.getByRole("button",{name:"Forgot password?"}),
  email:page.getByLabel("Email address"),
  password:page.getByLabel("Password",{exact:true}),
  sendReset:page.getByRole("button",{name:"Send reset instructions"}),
  createAccountHeading:page.getByRole("heading",{name:"Create your account"})
  ,fullName:page.getByLabel("Full name"),phone:page.getByLabel("Contact number"),country:page.getByLabel("Country"),role:page.getByLabel("Workspace role"),confirmPassword:page.getByLabel("Confirm password"),profileImage:page.locator(".photo-upload input[type=file]").first(),createSecureAccount:page.getByRole("button",{name:"Create secure account"}),signIn:page.getByRole("button",{name:"Sign in",exact:true})
});
