import { c as create_ssr_component, b as add_attribute } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
/* empty css                                                           */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".find-id-container.svelte-xxguyk.svelte-xxguyk{min-height:100vh;background:#f5f5f5;display:flex;align-items:center;justify-content:center;padding:20px;position:relative}.find-id-wrapper.svelte-xxguyk.svelte-xxguyk{width:100%;max-width:440px;position:relative;z-index:1}.find-id-box.svelte-xxguyk.svelte-xxguyk{background:white;border-radius:16px;padding:48px 40px;box-shadow:0 20px 60px rgba(0, 0, 0, 0.1);animation:svelte-xxguyk-slideUp 0.6s ease-out}@keyframes svelte-xxguyk-slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.find-id-header.svelte-xxguyk.svelte-xxguyk{text-align:center;margin-bottom:40px;position:relative}.back-button.svelte-xxguyk.svelte-xxguyk{position:absolute;left:0;top:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8f9fa;cursor:pointer;transition:all 0.2s ease}.back-button.svelte-xxguyk.svelte-xxguyk:hover{background:#dc3545;color:white}.back-button.svelte-xxguyk i.svelte-xxguyk{font-size:16px}.logo-icon.svelte-xxguyk.svelte-xxguyk{display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;background:linear-gradient(135deg, #dc3545, #c82333);border-radius:50%;margin-bottom:20px;box-shadow:0 8px 20px rgba(220, 53, 69, 0.3)}.logo-icon.svelte-xxguyk i.svelte-xxguyk{font-size:36px;color:white}.find-id-title.svelte-xxguyk.svelte-xxguyk{font-size:28px;font-weight:700;color:#2c3e50;margin:0 0 8px 0}.find-id-subtitle.svelte-xxguyk.svelte-xxguyk{font-size:14px;color:#7f8c8d;margin:0}.find-id-form.svelte-xxguyk.svelte-xxguyk{margin-bottom:0}.form-group.svelte-xxguyk.svelte-xxguyk{margin-bottom:32px}.form-label.svelte-xxguyk.svelte-xxguyk{display:block;font-size:14px;font-weight:600;color:#2c3e50;margin-bottom:8px}.input-wrapper.svelte-xxguyk.svelte-xxguyk{position:relative}.input-icon.svelte-xxguyk.svelte-xxguyk{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#95a5a6;font-size:16px}.form-input.svelte-xxguyk.svelte-xxguyk{width:100%;padding:14px 16px 14px 48px;border:2px solid #ecf0f1;border-radius:8px;font-size:15px;transition:all 0.3s ease;box-sizing:border-box}.form-input.svelte-xxguyk.svelte-xxguyk:focus{outline:none;border-color:#dc3545;box-shadow:0 0 0 4px rgba(220, 53, 69, 0.1)}.form-input.svelte-xxguyk.svelte-xxguyk::placeholder{color:#bdc3c7}.input-help.svelte-xxguyk.svelte-xxguyk{font-size:12px;color:#95a5a6;margin:8px 0 0 0}.button-group.svelte-xxguyk.svelte-xxguyk{display:flex;gap:12px}.submit-button.svelte-xxguyk.svelte-xxguyk{flex:1;padding:16px;background:linear-gradient(135deg, #dc3545, #c82333);color:white;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(220, 53, 69, 0.3)}.submit-button.svelte-xxguyk.svelte-xxguyk:hover{background:linear-gradient(135deg, #c82333, #bd2130);box-shadow:0 6px 16px rgba(220, 53, 69, 0.4);transform:translateY(-2px)}.submit-button.svelte-xxguyk.svelte-xxguyk:active{transform:translateY(0)}.submit-button.svelte-xxguyk i.svelte-xxguyk{margin-right:8px}.cancel-button.svelte-xxguyk.svelte-xxguyk{flex:1;padding:16px;background:white;color:#7f8c8d;border:2px solid #ecf0f1;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease}.cancel-button.svelte-xxguyk.svelte-xxguyk:hover{background:#f8f9fa;border-color:#dfe6e9;color:#2c3e50}.cancel-button.svelte-xxguyk i.svelte-xxguyk{margin-right:8px}.copyright.svelte-xxguyk.svelte-xxguyk{text-align:center;margin-top:24px}.copyright.svelte-xxguyk p.svelte-xxguyk{font-size:13px;color:#7f8c8d;margin:0}@media(max-width: 480px){.find-id-box.svelte-xxguyk.svelte-xxguyk{padding:32px 24px}.find-id-title.svelte-xxguyk.svelte-xxguyk{font-size:24px}.logo-icon.svelte-xxguyk.svelte-xxguyk{width:64px;height:64px}.logo-icon.svelte-xxguyk i.svelte-xxguyk{font-size:28px}.button-group.svelte-xxguyk.svelte-xxguyk{flex-direction:column}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let num = "";
  $$result.css.add(css);
  return `<div class="find-id-container svelte-xxguyk"><div class="find-id-wrapper svelte-xxguyk"><div class="find-id-box svelte-xxguyk"><div class="find-id-header svelte-xxguyk"><div class="back-button svelte-xxguyk"><i class="fa-solid fa-arrow-left svelte-xxguyk"></i></div>
        <div class="logo-icon svelte-xxguyk"><i class="fa-solid fa-id-card svelte-xxguyk"></i></div>
        <h1 class="find-id-title svelte-xxguyk">아이디 찾기</h1>
        <p class="find-id-subtitle svelte-xxguyk">요양기관 번호로 아이디를 찾을 수 있습니다</p></div>

      <form class="find-id-form svelte-xxguyk"><div class="form-group svelte-xxguyk"><label for="num" class="form-label svelte-xxguyk">요양기관번호</label>
          <div class="input-wrapper svelte-xxguyk"><i class="fa-solid fa-building input-icon svelte-xxguyk"></i>
            <input type="text" id="num" placeholder="요양기관번호를 입력하세요" maxlength="20" required class="form-input svelte-xxguyk"${add_attribute("value", num, 0)}></div>
          <p class="input-help svelte-xxguyk">숫자만 입력 가능합니다</p></div>

        <div class="button-group svelte-xxguyk"><button type="submit" class="submit-button svelte-xxguyk"><i class="fa-solid fa-search svelte-xxguyk"></i>
            아이디 찾기
          </button>
          <button type="button" class="cancel-button svelte-xxguyk"><i class="fa-solid fa-times svelte-xxguyk"></i>
            취소
          </button></div></form></div>

    <div class="copyright svelte-xxguyk"><p class="svelte-xxguyk">© 2025 남원 E-케어 병원 관리 시스템. All rights reserved.</p></div></div></div>


${``}`;
});
export {
  Page as default
};
