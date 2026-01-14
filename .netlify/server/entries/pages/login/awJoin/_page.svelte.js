import { c as create_ssr_component, b as add_attribute } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
/* empty css                                                           */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: 'h4.svelte-1qdkjf7.svelte-1qdkjf7{display:flex;justify-content:center;padding-bottom:20px}form.svelte-1qdkjf7.svelte-1qdkjf7{display:flex;flex-direction:column}form.svelte-1qdkjf7 div.svelte-1qdkjf7{margin-bottom:10px;display:flex;align-items:center}label.svelte-1qdkjf7.svelte-1qdkjf7{width:150px;text-align:right}input[type="text"].svelte-1qdkjf7.svelte-1qdkjf7,input[type="password"].svelte-1qdkjf7.svelte-1qdkjf7,input[type="email"].svelte-1qdkjf7.svelte-1qdkjf7{margin-left:10px}input.svelte-1qdkjf7.svelte-1qdkjf7:focus{outline:1px solid #00ace5}button.svelte-1qdkjf7.svelte-1qdkjf7{background-color:skyblue;border-radius:5px;width:100px;height:30px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dtlAddressFocus;
  let hospitalName = "";
  let hospitalNum = "";
  let businessNum = "";
  let password = "";
  let representative = "";
  let manager = "";
  let managerPhone = "";
  let phone = "";
  let email = "";
  let addZip = "";
  let address = "";
  let dtlAddress = "";
  let agreementChecked = false;
  $$result.css.add(css);
  return `<div style="display:table; margin:0 auto;"><h1 style="display:flex;padding-bottom:20px;justify-content: center; color:black;">바로닥터 서비스 가입 신청서</h1>
  <h4 style="border-bottom: solid 1px gray" class="svelte-1qdkjf7">모든 입력항목은 <span style="color: red; padding-left:3px;">필수</span>입니다.
  </h4>
  <form class="svelte-1qdkjf7"><div class="svelte-1qdkjf7"></div>
    <div class="svelte-1qdkjf7"><label for="hospitalName" class="svelte-1qdkjf7">병원명</label>
      <input type="text" id="hospitalName" maxlength="60" required class="svelte-1qdkjf7"${add_attribute("value", hospitalName, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="hospitalNum" class="svelte-1qdkjf7">요양기관번호(ID)</label>
      <input type="text" id="hospitalNum" maxlength="8" required class="svelte-1qdkjf7"${add_attribute("value", hospitalNum, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="businessNum" class="svelte-1qdkjf7">사업자 등록번호</label>
      <input type="text" id="businessNum" maxlength="10" required class="svelte-1qdkjf7"${add_attribute("value", businessNum, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="password" class="svelte-1qdkjf7">비밀번호</label>
      <input type="password" id="password" maxlength="20" style="margin-right: 10px;" required class="svelte-1qdkjf7"${add_attribute("value", password, 0)}>
      <span style="color: red; font-weight: bold;">※ 추후 연동에 필요하니 꼭 기억해 주시길 바랍니다.</span></div>

    <div class="svelte-1qdkjf7"><label for="representative" class="svelte-1qdkjf7">대표자</label>
      <input type="text" id="representative" maxlength="15" required class="svelte-1qdkjf7"${add_attribute("value", representative, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="phone" class="svelte-1qdkjf7">대표 전화번호</label>
      <input type="text" id="phone" maxlength="15" required class="svelte-1qdkjf7"${add_attribute("value", phone, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="manager" class="svelte-1qdkjf7">담당자</label>
      <input type="text" id="manager" maxlength="15" required class="svelte-1qdkjf7"${add_attribute("value", manager, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="managerPhone" class="svelte-1qdkjf7">담당자 전화번호</label>
      <input type="text" id="managerPhone" maxlength="15" required class="svelte-1qdkjf7"${add_attribute("value", managerPhone, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="email" class="svelte-1qdkjf7">이메일</label>
      <input type="email" id="email" style="margin-right: 10px;" required class="svelte-1qdkjf7"${add_attribute("value", email, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="addZip" class="svelte-1qdkjf7">우편번호</label>
      <input type="text" id="addZip" maxlength="5" required readonly class="svelte-1qdkjf7"${add_attribute("value", addZip, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="address" class="svelte-1qdkjf7">병원 기본 주소</label>
      <input type="text" id="address" maxlength="280" required readonly class="svelte-1qdkjf7"${add_attribute("value", address, 0)}></div>

    <div class="svelte-1qdkjf7"><label for="dtlAddress" class="svelte-1qdkjf7">병원 상세 주소</label>
      <input type="text" id="dtlAddress" maxlength="280" required class="svelte-1qdkjf7"${add_attribute("value", dtlAddress, 0)}${add_attribute("this", dtlAddressFocus, 0)}></div>

    ${``}

    <div class="svelte-1qdkjf7"><span style="border: solid 1px; padding: 10px; line-height: 20px;">본인은 (주)비트컴퓨터의 비대면 진료 플랫폼 바로닥터 서비스 이용을 위한 목적으로 서비스 이용을 신청합니다.<br>
        * 결제수수료는 1건 당 브이피 주식회사(이하 스마트로)에게 2.43% 공제됩니다. (VAT 별도)<br>
        * 개인정보는 회원관련 이외에 다른 용도로 활용하지 않을 것을 보장합니다.
        <br>병원의 처리업무위탁을 진료 및 처리를 위해 바로닥터에서 주민번호 수집 및 제공을 목적으로 개인정보를
        처리합니다.
      </span></div>
    <div class="svelte-1qdkjf7"><input type="checkbox" id="agreement" required class="svelte-1qdkjf7"${add_attribute("checked", agreementChecked, 1)}>
      <label for="agreement" style="text-align: left;" class="svelte-1qdkjf7">위 약관에 동의합니다.</label></div>
    <div class="svelte-1qdkjf7">바로닥터 회원가입 문의 : 02-3487-8585</div>
    <div style="display: flex; justify-content: center;" class="svelte-1qdkjf7"><button type="submit" style="font-weight: bold;" class="svelte-1qdkjf7">가입하기</button></div></form></div>


${``}`;
});
export {
  Page as default
};
