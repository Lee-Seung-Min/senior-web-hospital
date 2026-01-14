<script>
    import { onMount } from "svelte";
    import PopUp from "$lib/sub/nav/PopUp.svelte";
    import Nav from "$lib/sub/nav/Nav.svelte";
    import { goto } from "$app/navigation";
    import { URL } from "$lib/URL";
    import { getAPI } from "$lib/js/getAPI";
    import { makeStr } from "$lib/js/makeStr";
    import { postAPI } from "$lib/js/postAPI";
    import { footCheck } from "$lib/store/navStore.js"; //밑에 메뉴바 변경 가능하도록
    import { shopUrlAddr } from "$lib/js/urlAddr";
    import { authUrlAddr } from "$lib/js/urlAddr";
    import { mobileUrlAddr } from "$lib/js/urlAddr";
    import { adminUrlAddr } from "$lib/js/urlAddr";

    import Grid from "gridjs-svelte";
    import {SvelteWrapper} from "gridjs-svelte/plugins";
    import Footer from "$lib/sub/Footer.svelte";

    let popup = false;
    function onPwChg(){
        popup=true;
    }

  </script>


  <div id="skipNavi">
    <a href="#left_wrap">전체메뉴 바로가기</a>
    <a href="#content">본문바로가기</a>
  </div>
  <!-- content S -->
  <section class="login_box">
    <div class="login_in">
      <form action="">
        <p class="logo"></p>
        <h3>로그인</h3>
        <div class="box_type1">
          <label><input type="text" required="required" /><span>아이디</span></label>
          <label><input type="password" required="required" /><span>비밀번호</span></label>
        </div>
        <div class="btn_wrap ">
          <button type="button" class="btn_02" on:click={() => goto(URL.main)} >로그인</button>
        </div>
        <div>
          <button type="button" data-url="JavaScript:onAlert()">회원가입</button> |
          <button type="button" data-url="JavaScript:onAlert()">아이디 찾기</button> |
          <button type="button" on:click={() => goto(URL.awChngPw)} >비밀번호 찾기</button>
        </div>
      </form>

</div>
</section>
