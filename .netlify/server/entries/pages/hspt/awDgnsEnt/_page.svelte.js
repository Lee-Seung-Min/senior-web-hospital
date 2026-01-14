import { c as create_ssr_component } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>
<section id="head"><button type="button" onclick="onMenuSlide()"><i class="icon-arrow icon-chevron-left"></i>
    <i class="icon-menu"></i></button>
  <h1>닥터비트 가맹점 Admin </h1>
  <div class="admin"><i class="icon-account_circle"></i>
    <span><b>관리자</b>님</span>
    <button type="button" class="btn_03 btn_xs" onclick="">Logout</button></div></section>

<section id="con"><div id="menu"><h1></h1>
    <div class="lnb"></div>
    <div class="copyright">BIT Doctor.
    </div></div>


  <div id="content">
<h2 class="page_title">진료실</h2>

<section id="tel_wrap"><div id="tel"><div class="top"><h3>닥터비트의원</h3>
    <p>우희정 환자</p></div>
  <div class="Screen"><div><div class="big"></div>
      <div class="samll"></div></div></div></div>
<div id="tel_control"><p class="time">01 : 12</p>
  <div class="function"><button type="button" class="hicon_video"></button>
    <button type="button" class="hicon_mic"></button>
    <button type="button" class="hicon_arrow"></button></div>
  <button type="button" class="mbtn_r_1">비대면 진료 종료</button></div></section>


<footer><p>Copyright BIT Doctor. All Rights Reserved.</p></footer></div></section>


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
  Page as default
};
