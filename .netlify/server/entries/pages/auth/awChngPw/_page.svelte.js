import { c as create_ssr_component } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
import "gridjs";
import "../../../../chunks/plugins.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
        <a href="#content">본문바로가기</a></div>
    
        
        <section class="login_box"><div><form action=""><p class="logo"></p>
                    <h3>비밀번호 변경</h3>

                    <div class="box_type1"><label><input type="text" required="Required"><span>아이디</span></label>
                        <label><input type="text" required="Required"><span>바꿀 비밀번호</span></label>
                        <p align="left" style="color:red; font-size:9px;">* 영어 대소문자, 숫자, 특수문자만 사용 가능</p>
                        <label><input type="text" required="Required"><span>바꿀 비밀번호 확인</span></label></div>
                    <div class="btn_wrap btn_flex_wrap"><button type="button" class="btn_02">변경</button>
                        <button type="button" class="btn_04">취소</button></div></form>
                <footer><p>Copyright BIT Doctor.<br class="mo"> All Rights Reserved.</p></footer></div></section>`;
});
export {
  Page as default
};
