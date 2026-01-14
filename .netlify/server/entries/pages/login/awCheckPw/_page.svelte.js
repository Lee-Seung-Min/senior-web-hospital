import { c as create_ssr_component, a as subscribe } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/index.js";
/* empty css                                                           */const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.url.searchParams.get("email");
  $page.url.searchParams.get("key");
  $$unsubscribe_page();
  return `${``}`;
});
export {
  Page as default
};
