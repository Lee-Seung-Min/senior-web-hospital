import { c as create_ssr_component } from "./index3.js";
/* empty css                                          */const css = {
  code: '@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");section.svelte-jhjzkl.svelte-jhjzkl{line-height:1.5em;margin:0;font-weight:300;display:flex;justify-content:center;align-items:center;height:100vh}.loading.svelte-jhjzkl span.svelte-jhjzkl{display:inline-block;width:15px;height:15px;background-color:grey;border-radius:50%;animation:svelte-jhjzkl-loading 1s linear infinite}.loading.svelte-jhjzkl span.svelte-jhjzkl:nth-child(1){animation-delay:0s;background-color:#dc3545}.loading.svelte-jhjzkl span.svelte-jhjzkl:nth-child(2){animation-delay:0.2s;background-color:#c82333}.loading.svelte-jhjzkl span.svelte-jhjzkl:nth-child(3){animation-delay:0.4s;background-color:#bd2130}@keyframes svelte-jhjzkl-loading{0%,100%{opacity:0;transform:scale(0.5)}50%{opacity:1;transform:scale(1.2)}}.logo-image.svelte-jhjzkl.svelte-jhjzkl{height:80px;margin-bottom:20px;animation:svelte-jhjzkl-fadeIn 0.8s ease-in}@keyframes svelte-jhjzkl-fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.tex.svelte-jhjzkl.svelte-jhjzkl{text-align:center;margin-bottom:20px;display:flex;flex-direction:column;align-items:center;justify-content:center}',
  map: null
};
const PageLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sectionClass = "location" } = $$props;
  if ($$props.sectionClass === void 0 && $$bindings.sectionClass && sectionClass !== void 0)
    $$bindings.sectionClass(sectionClass);
  $$result.css.add(css);
  return `


<section class="z_alert svelte-jhjzkl" style="z-index: 0;"><div class="z_box_1"><div class="tex svelte-jhjzkl"><img src="/assets/img/namwonLogo.png" alt="남원 E-케어" class="logo-image svelte-jhjzkl"></div>
    <div class="btn_wrap"><div class="loading svelte-jhjzkl" style="text-align: center;"><span class="svelte-jhjzkl"></span>
        <span class="svelte-jhjzkl"></span>
        <span class="svelte-jhjzkl"></span></div></div></div></section>`;
});
export {
  PageLoader as P
};
