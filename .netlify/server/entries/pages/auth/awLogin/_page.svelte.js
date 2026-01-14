import { c as create_ssr_component } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
import "gridjs";
import "../../../../chunks/plugins.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
    <a href="#content">본문바로가기</a></div>
  
  <section class="login_box"><div class="login_in"><form action=""><p class="logo"></p>
        <h3>로그인</h3>
        <div class="box_type1"><label><input type="text" required="required"><span>아이디</span></label>
          <label><input type="password" required="required"><span>비밀번호</span></label></div>
        <div class="btn_wrap "><button type="button" class="btn_02">로그인</button></div>
        <div><button type="button" data-url="JavaScript:onAlert()">회원가입</button> |
          <button type="button" data-url="JavaScript:onAlert()">아이디 찾기</button> |
          <button type="button">비밀번호 찾기</button></div></form></div></section>`;
});
export {
  Page as default
};
