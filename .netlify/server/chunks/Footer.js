import { c as create_ssr_component } from "./index3.js";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer style="width: 400px;">Copyright 2023. BITCOMPUTER. All rights reserved.<br>
  콜센터 : 02-3487-8585 (운영시간: 08:30 ~ 18:00)

</footer>  

  
  <section class="full_layer" id="changePw"><div class="bg"></div>
    <div class="box_1"><p class="text_tit">비밀번호 변경</p>
      <label><input type="text" name="" id=""><span class="txt_red">사용불가</span>
        <p class="text_info">* 영어대소문자, 숫자, 특수문자만 사용 가능</p></label>
      <label><input type="text" name="" id=""><span class="txt_blue">일치</span></label>
      <p class="btn_wrap inline"><button type="button" class="btn_02 small close_btn">변경</button>
        <button type="button" class="btn_03 small close_btn">취소</button>
      </p><p></p></div></section>
  `;
});
export {
  Footer as F
};
