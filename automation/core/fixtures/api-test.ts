import {test as base,expect} from "@playwright/test";

export const test=base.extend<{apiEvidence:void}>({
  apiEvidence:[async({page},use,testInfo)=>{
    await page.setContent(`<style>body{margin:0;background:linear-gradient(135deg,#071b2c,#0b826e);color:white;font-family:Arial;min-height:100vh;display:grid;place-items:center}.card{width:760px;padding:55px;border:2px solid #53e1bb;border-radius:30px;background:#0b2034dd;box-shadow:0 25px 80px #0008}.logo{font-size:76px;font-weight:900;color:#55e1ba}.suite{color:#9bded0;text-transform:uppercase;letter-spacing:2px}.title{font-size:30px;line-height:1.3}.status{display:inline-block;padding:10px 18px;border-radius:50px;background:#126c59}</style><main class="card"><div class="logo">L.</div><p class="suite">LedgerMate 360 API Automation</p><h1 class="title">${testInfo.title.replaceAll("<","&lt;")}</h1><p class="status">Request execution in progress</p></main>`);
    await use();
    await page.locator(".status").textContent().catch(()=>null);
    await page.evaluate(status=>{const node=document.querySelector(".status");if(node){node.textContent=status;node.setAttribute("style",`background:${status.includes("passed")?"#126c59":"#9b2c3c"}`)}},`Execution ${testInfo.status}`);
    await testInfo.attach("API execution screenshot",{body:await page.screenshot({fullPage:true}),contentType:"image/png"});
  },{auto:true}]
});
export {expect};
