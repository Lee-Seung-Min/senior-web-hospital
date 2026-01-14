import { c as create_ssr_component, b as add_attribute } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
/* empty css                                                           */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".change-pw-container.svelte-fk267p.svelte-fk267p{min-height:100vh;background:#f5f5f5;display:flex;align-items:center;justify-content:center;padding:20px;position:relative}.change-pw-wrapper.svelte-fk267p.svelte-fk267p{width:100%;max-width:440px;position:relative;z-index:1}.change-pw-box.svelte-fk267p.svelte-fk267p{background:white;border-radius:16px;padding:48px 40px;box-shadow:0 20px 60px rgba(0, 0, 0, 0.1);animation:svelte-fk267p-slideUp 0.6s ease-out}@keyframes svelte-fk267p-slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.change-pw-header.svelte-fk267p.svelte-fk267p{text-align:center;margin-bottom:40px;position:relative}.back-button.svelte-fk267p.svelte-fk267p{position:absolute;left:0;top:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8f9fa;cursor:pointer;transition:all 0.2s ease}.back-button.svelte-fk267p.svelte-fk267p:hover{background:#dc3545;color:white}.back-button.svelte-fk267p i.svelte-fk267p{font-size:16px}.logo-icon.svelte-fk267p.svelte-fk267p{display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;background:linear-gradient(135deg, #dc3545, #c82333);border-radius:50%;margin-bottom:20px;box-shadow:0 8px 20px rgba(220, 53, 69, 0.3)}.logo-icon.svelte-fk267p i.svelte-fk267p{font-size:36px;color:white}.change-pw-title.svelte-fk267p.svelte-fk267p{font-size:28px;font-weight:700;color:#2c3e50;margin:0 0 8px 0}.change-pw-subtitle.svelte-fk267p.svelte-fk267p{font-size:14px;color:#7f8c8d;margin:0}.change-pw-form.svelte-fk267p.svelte-fk267p{margin-bottom:0}.form-group.svelte-fk267p.svelte-fk267p{margin-bottom:24px}.form-group.svelte-fk267p.svelte-fk267p:last-of-type{margin-bottom:32px}.form-label.svelte-fk267p.svelte-fk267p{display:block;font-size:14px;font-weight:600;color:#2c3e50;margin-bottom:8px}.input-wrapper.svelte-fk267p.svelte-fk267p{position:relative}.input-icon.svelte-fk267p.svelte-fk267p{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#95a5a6;font-size:16px}.form-input.svelte-fk267p.svelte-fk267p{width:100%;padding:14px 16px 14px 48px;border:2px solid #ecf0f1;border-radius:8px;font-size:15px;transition:all 0.3s ease;box-sizing:border-box}.form-input.svelte-fk267p.svelte-fk267p:focus{outline:none;border-color:#dc3545;box-shadow:0 0 0 4px rgba(220, 53, 69, 0.1)}.form-input.svelte-fk267p.svelte-fk267p::placeholder{color:#bdc3c7}.input-help.svelte-fk267p.svelte-fk267p{font-size:12px;color:#95a5a6;margin:8px 0 0 0}.button-group.svelte-fk267p.svelte-fk267p{display:flex;gap:12px}.submit-button.svelte-fk267p.svelte-fk267p{flex:1;padding:16px;background:linear-gradient(135deg, #dc3545, #c82333);color:white;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(220, 53, 69, 0.3)}.submit-button.svelte-fk267p.svelte-fk267p:hover{background:linear-gradient(135deg, #c82333, #bd2130);box-shadow:0 6px 16px rgba(220, 53, 69, 0.4);transform:translateY(-2px)}.submit-button.svelte-fk267p.svelte-fk267p:active{transform:translateY(0)}.submit-button.svelte-fk267p i.svelte-fk267p{margin-right:8px}.cancel-button.svelte-fk267p.svelte-fk267p{flex:1;padding:16px;background:white;color:#7f8c8d;border:2px solid #ecf0f1;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease}.cancel-button.svelte-fk267p.svelte-fk267p:hover{background:#f8f9fa;border-color:#dfe6e9;color:#2c3e50}.cancel-button.svelte-fk267p i.svelte-fk267p{margin-right:8px}.copyright.svelte-fk267p.svelte-fk267p{text-align:center;margin-top:24px}.copyright.svelte-fk267p p.svelte-fk267p{font-size:13px;color:#7f8c8d;margin:0}@media(max-width: 480px){.change-pw-box.svelte-fk267p.svelte-fk267p{padding:32px 24px}.change-pw-title.svelte-fk267p.svelte-fk267p{font-size:24px}.logo-icon.svelte-fk267p.svelte-fk267p{width:64px;height:64px}.logo-icon.svelte-fk267p i.svelte-fk267p{font-size:28px}.button-group.svelte-fk267p.svelte-fk267p{flex-direction:column}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let id = "";
  let email = "";
  $$result.css.add(css);
  return `<div class="change-pw-container svelte-fk267p"><div class="change-pw-wrapper svelte-fk267p"><div class="change-pw-box svelte-fk267p"><div class="change-pw-header svelte-fk267p"><div class="back-button svelte-fk267p"><i class="fa-solid fa-arrow-left svelte-fk267p"></i></div>
        <div class="logo-icon svelte-fk267p"><i class="fa-solid fa-key svelte-fk267p"></i></div>
        <h1 class="change-pw-title svelte-fk267p">비밀번호 찾기</h1>
        <p class="change-pw-subtitle svelte-fk267p">본인확인을 위해 아이디와 이메일을 입력해주세요</p></div>

      <form class="change-pw-form svelte-fk267p"><div class="form-group svelte-fk267p"><label for="id" class="form-label svelte-fk267p">아이디</label>
          <div class="input-wrapper svelte-fk267p"><i class="fa-solid fa-user input-icon svelte-fk267p"></i>
            <input type="text" id="id" placeholder="아이디를 입력하세요" required class="form-input svelte-fk267p"${add_attribute("value", id, 0)}></div></div>

        <div class="form-group svelte-fk267p"><label for="email" class="form-label svelte-fk267p">이메일</label>
          <div class="input-wrapper svelte-fk267p"><i class="fa-solid fa-envelope input-icon svelte-fk267p"></i>
            <input type="email" id="email" placeholder="이메일을 입력하세요" required class="form-input svelte-fk267p"${add_attribute("value", email, 0)}></div>
          <p class="input-help svelte-fk267p">인증 메일이 발송됩니다</p></div>

        <div class="button-group svelte-fk267p"><button type="submit" class="submit-button svelte-fk267p"><i class="fa-solid fa-paper-plane svelte-fk267p"></i>
            인증 메일 전송
          </button>
          <button type="button" class="cancel-button svelte-fk267p"><i class="fa-solid fa-times svelte-fk267p"></i>
            취소
          </button></div></form></div>

    <div class="copyright svelte-fk267p"><p class="svelte-fk267p">© 2025 남원 E-케어 병원 관리 시스템. All rights reserved.</p></div></div></div>


${``}`;
});
export {
  Page as default
};
