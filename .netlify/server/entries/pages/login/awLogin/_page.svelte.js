import { c as create_ssr_component, a as subscribe, b as add_attribute } from "../../../../chunks/index3.js";
import { s as susrShpId, c as susrShpType, d as susrShpName, e as susrLoginId, a as susrName, b as susrId } from "../../../../chunks/loginStore.js";
import "../../../../chunks/index.js";
import "gridjs";
import "../../../../chunks/plugins.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".login-container.svelte-dvt81c.svelte-dvt81c{min-height:100vh;background:#f5f5f5;display:flex;align-items:center;justify-content:center;padding:20px;position:relative}@keyframes svelte-dvt81c-pulse{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.1);opacity:0.3}}.login-wrapper.svelte-dvt81c.svelte-dvt81c{width:100%;max-width:440px;position:relative;z-index:1}.login-box.svelte-dvt81c.svelte-dvt81c{background:white;border-radius:16px;padding:48px 40px;box-shadow:0 20px 60px rgba(0, 0, 0, 0.3);animation:svelte-dvt81c-slideUp 0.6s ease-out}@keyframes svelte-dvt81c-slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.login-header.svelte-dvt81c.svelte-dvt81c{text-align:center;margin-bottom:40px}.logo-icon.svelte-dvt81c.svelte-dvt81c{display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;background:linear-gradient(135deg, #dc3545, #c82333);border-radius:50%;margin-bottom:20px;box-shadow:0 8px 20px rgba(220, 53, 69, 0.3)}.logo-icon.svelte-dvt81c i.svelte-dvt81c{font-size:36px;color:white}.login-title.svelte-dvt81c.svelte-dvt81c{font-size:28px;font-weight:700;color:#2c3e50;margin:0 0 8px 0}.login-subtitle.svelte-dvt81c.svelte-dvt81c{font-size:14px;color:#7f8c8d;margin:0}.login-form.svelte-dvt81c.svelte-dvt81c{margin-bottom:24px}.form-group.svelte-dvt81c.svelte-dvt81c{margin-bottom:24px}.form-label.svelte-dvt81c.svelte-dvt81c{display:block;font-size:14px;font-weight:600;color:#2c3e50;margin-bottom:8px}.input-wrapper.svelte-dvt81c.svelte-dvt81c{position:relative}.input-icon.svelte-dvt81c.svelte-dvt81c{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#95a5a6;font-size:16px}.form-input.svelte-dvt81c.svelte-dvt81c{width:100%;padding:14px 16px 14px 48px;border:2px solid #ecf0f1;border-radius:8px;font-size:15px;transition:all 0.3s ease;box-sizing:border-box}.form-input.svelte-dvt81c.svelte-dvt81c:focus{outline:none;border-color:#dc3545;box-shadow:0 0 0 4px rgba(220, 53, 69, 0.1)}.form-input.svelte-dvt81c.svelte-dvt81c::placeholder{color:#bdc3c7}.login-links.svelte-dvt81c.svelte-dvt81c{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:24px;font-size:14px}.link-button.svelte-dvt81c.svelte-dvt81c{background:transparent;border:none;color:#7f8c8d;cursor:pointer;padding:4px 8px;transition:color 0.2s ease;font-size:14px}.link-button.svelte-dvt81c.svelte-dvt81c:hover{color:#dc3545}.divider.svelte-dvt81c.svelte-dvt81c{color:#dfe6e9}.login-button.svelte-dvt81c.svelte-dvt81c{width:100%;padding:16px;background:linear-gradient(135deg, #dc3545, #c82333);color:white;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(220, 53, 69, 0.3)}.login-button.svelte-dvt81c.svelte-dvt81c:hover{background:linear-gradient(135deg, #c82333, #bd2130);box-shadow:0 6px 16px rgba(220, 53, 69, 0.4);transform:translateY(-2px)}.login-button.svelte-dvt81c.svelte-dvt81c:active{transform:translateY(0)}.login-button.svelte-dvt81c i.svelte-dvt81c{margin-right:8px}.login-footer.svelte-dvt81c.svelte-dvt81c{text-align:center;padding-top:20px;border-top:1px solid #ecf0f1}.help-text.svelte-dvt81c.svelte-dvt81c{font-size:13px;color:#7f8c8d;margin:0}.contact-link.svelte-dvt81c.svelte-dvt81c{color:#dc3545;cursor:pointer;font-weight:600;transition:color 0.2s ease}.contact-link.svelte-dvt81c.svelte-dvt81c:hover{color:#c82333;text-decoration:underline}.copyright.svelte-dvt81c.svelte-dvt81c{text-align:center;margin-top:24px}.copyright.svelte-dvt81c p.svelte-dvt81c{font-size:13px;color:#7f8c8d;margin:0}@media(max-width: 480px){.login-box.svelte-dvt81c.svelte-dvt81c{padding:32px 24px}.login-title.svelte-dvt81c.svelte-dvt81c{font-size:24px}.logo-icon.svelte-dvt81c.svelte-dvt81c{width:64px;height:64px}.logo-icon.svelte-dvt81c i.svelte-dvt81c{font-size:28px}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_susrShpId;
  let $$unsubscribe_susrShpType;
  let $$unsubscribe_susrShpName;
  let $$unsubscribe_susrLoginId;
  let $$unsubscribe_susrName;
  let $$unsubscribe_susrId;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => value);
  $$unsubscribe_susrShpType = subscribe(susrShpType, (value) => value);
  $$unsubscribe_susrShpName = subscribe(susrShpName, (value) => value);
  $$unsubscribe_susrLoginId = subscribe(susrLoginId, (value) => value);
  $$unsubscribe_susrName = subscribe(susrName, (value) => value);
  $$unsubscribe_susrId = subscribe(susrId, (value) => value);
  let id = "";
  let password = "";
  $$result.css.add(css);
  $$unsubscribe_susrShpId();
  $$unsubscribe_susrShpType();
  $$unsubscribe_susrShpName();
  $$unsubscribe_susrLoginId();
  $$unsubscribe_susrName();
  $$unsubscribe_susrId();
  return `<div id="skipNavi" class="sr-only"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>


<div class="login-container svelte-dvt81c"><div class="login-wrapper svelte-dvt81c"><div class="login-box svelte-dvt81c"><div class="login-header svelte-dvt81c"><div class="logo-icon svelte-dvt81c"><i class="fa-solid fa-hospital svelte-dvt81c"></i></div>
        <h1 class="login-title svelte-dvt81c">남원 E-케어</h1>
        <p class="login-subtitle svelte-dvt81c">병원 관리 시스템</p></div>

      <form class="login-form svelte-dvt81c"><div class="form-group svelte-dvt81c"><label for="username" class="form-label svelte-dvt81c">아이디</label>
          <div class="input-wrapper svelte-dvt81c"><i class="fa-solid fa-user input-icon svelte-dvt81c"></i>
            <input type="text" id="username" placeholder="아이디를 입력하세요" required class="form-input svelte-dvt81c"${add_attribute("value", id, 0)}></div></div>

        <div class="form-group svelte-dvt81c"><label for="password" class="form-label svelte-dvt81c">비밀번호</label>
          <div class="input-wrapper svelte-dvt81c"><i class="fa-solid fa-lock input-icon svelte-dvt81c"></i>
            <input type="password" id="password" placeholder="비밀번호를 입력하세요" required class="form-input svelte-dvt81c"${add_attribute("value", password, 0)}></div></div>

        <div class="login-links svelte-dvt81c"><button type="button" class="link-button svelte-dvt81c">아이디 찾기
          </button>
          <span class="divider svelte-dvt81c">|</span>
          <button type="button" class="link-button svelte-dvt81c">비밀번호 찾기
          </button></div>

        <button type="submit" class="login-button svelte-dvt81c"><i class="fa-solid fa-sign-in-alt svelte-dvt81c"></i>
          로그인
        </button></form>

      <div class="login-footer svelte-dvt81c"><p class="help-text svelte-dvt81c">문제가 있으신가요?
          <span class="contact-link svelte-dvt81c">관리자에게 문의</span></p></div></div>

    <div class="copyright svelte-dvt81c"><p class="svelte-dvt81c">© 2025 남원 E-케어 병원 관리 시스템. All rights reserved.</p></div></div>
</div>`;
});
export {
  Page as default
};
