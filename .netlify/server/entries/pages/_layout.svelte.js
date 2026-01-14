import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../chunks/index3.js";
import { s as susrShpId, a as susrName } from "../../chunks/loginStore.js";
const Head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $susrShpId, $$unsubscribe_susrShpId;
  let $susrName, $$unsubscribe_susrName;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => $susrShpId = value);
  $$unsubscribe_susrName = subscribe(susrName, (value) => $susrName = value);
  $$unsubscribe_susrShpId();
  $$unsubscribe_susrName();
  return `${$$result.head += `<!-- HEAD_svelte-poxz2z_START --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><meta name="format-detection" content="telephone=no"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><script src="/assets/js/jquery-3.3.1.min.js"><\/script><script src="/assets/js/html5shiv.min.js"><\/script><script src="/assets/js/placeholders.min.js"><\/script><script src="/assets/js/common.js"><\/script><script>window.FontAwesomeConfig = { autoReplaceSvg: "nest" };
        <\/script><link rel="stylesheet" type="text/css" href="/src/assets/css/font-awesome-all.min.css">${$$result.title = `<title>남원 E-케어</title>`, ""}<!-- HEAD_svelte-poxz2z_END -->`, ""}

${$susrShpId ? `<div id="nav"><section id="head"><div class="logo"><img src="/assets/img/namwon.png" alt="남원 E-케어 로고">
        <span class="text-xl">남원 e케어</span>
        <span class="text-base">선생님</span></div>
      <div class="admin"><i class="icon-account_circle"></i>
        <span><b>${escape($susrName)}</b>님</span>
        <button type="button" class="btn_03 btn_xs">Logout</button></div></section>

    <section id="con"><div id="menu"><div class="lnb"><nav><ul class="menu"><li class="menu_item"><span class="text-xs">홈</span>
                <ul><li class="text-base home"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"></path></svg>
                  Home</li></ul></li>
              <li class="menu_item"><span class="text-xs">진료</span>
                <ul><li class="text-base reservation"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM160 160L160 224L224 224L224 160L160 160zM480 160L288 160L288 224L480 224L480 160zM160 288L160 352L224 352L224 288L160 288zM480 288L288 288L288 352L480 352L480 288zM160 416L160 480L224 480L224 416L160 416zM480 416L288 416L288 480L480 480L480 416z"></path></svg>
                  진료 예약 목록</li></ul>
                <ul><li class="text-base receipt"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M584 352C597.3 352 608 362.7 608 376L608 480C608 515.3 579.3 544 544 544L96 544C60.7 544 32 515.3 32 480L32 376C32 362.7 42.7 352 56 352C69.3 352 80 362.7 80 376L80 480C80 488.8 87.2 496 96 496L544 496C552.8 496 560 488.8 560 480L560 376C560 362.7 570.7 352 584 352zM448 96C483.3 96 512 124.7 512 160L512 384C512 419.3 483.3 448 448 448L192 448C156.7 448 128 419.3 128 384L128 160C128 124.7 156.7 96 192 96L448 96zM410.9 180.6C400.2 172.8 385.2 175.2 377.4 185.9L291.8 303.6L265.3 276.2C256.1 266.7 240.9 266.4 231.4 275.6C221.9 284.8 221.6 300 230.8 309.5L277.2 357.5C282.1 362.6 289 365.3 296.1 364.8C303.2 364.3 309.7 360.7 313.9 355L416.2 214.1C424 203.4 421.6 188.4 410.9 180.6z"></path></svg>
                  진료 접수 / 예약</li></ul></li>
              <li class="menu_item"><span class="text-xs">관리</span>
                <ul><li class="text-base"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"></path></svg>
                  정보 관리</li></ul>
                <ul><li class="text-base awpaylst"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M64 192L64 224L576 224L576 192C576 156.7 547.3 128 512 128L128 128C92.7 128 64 156.7 64 192zM64 272L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 272L64 272zM128 424C128 410.7 138.7 400 152 400L200 400C213.3 400 224 410.7 224 424C224 437.3 213.3 448 200 448L152 448C138.7 448 128 437.3 128 424zM272 424C272 410.7 282.7 400 296 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L296 448C282.7 448 272 437.3 272 424z"></path></svg>
                  정산 관리</li></ul>
                <ul><li class="text-base notice"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M544 160C544 124.7 515.3 96 480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160zM352 216C352 229.3 341.3 240 328 240L216 240C202.7 240 192 229.3 192 216C192 202.7 202.7 192 216 192L328 192C341.3 192 352 202.7 352 216zM424 296C437.3 296 448 306.7 448 320C448 333.3 437.3 344 424 344L216 344C202.7 344 192 333.3 192 320C192 306.7 202.7 296 216 296L424 296zM288 424C288 437.3 277.3 448 264 448L216 448C202.7 448 192 437.3 192 424C192 410.7 202.7 400 216 400L264 400C277.3 400 288 410.7 288 424z"></path></svg>
                  공지사항</li></ul></li>
</ul>

            </nav>
          \`
        </div></div></section></div>` : ``}`;
});
const common = "";
const reset = "";
const jqueryUi = "";
const xeicon_min = "";
const style = "";
const pretendard = "";
const publish = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const mainlayout = false;
  if ($$props.mainlayout === void 0 && $$bindings.mainlayout && mainlayout !== void 0)
    $$bindings.mainlayout(mainlayout);
  return `${validate_component(Head, "Head").$$render($$result, {}, {}, {})}
<div class="app"><main><div id="content">${slots.default ? slots.default({}) : ``}</div></main></div>`;
});
export {
  Layout as default
};
