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
    
        <!-- 비번 변경박스 -->
        <section class="login_box">
            <div>
                <form action="">
                    <p class="logo"></p>
                    <h3>비밀번호 변경</h3>

                    <div class="box_type1">
                        <label><input type="text" required="Required"><span>아이디</span></label>
                        <label><input type="text" required="Required"><span>바꿀 비밀번호</span></label>
                        <p align="left" style="color:red; font-size:9px;">* 영어 대소문자, 숫자, 특수문자만 사용 가능</p>
                        <label><input type="text" required="Required"><span>바꿀 비밀번호 확인</span></label>
                    </div>
                    <div class="btn_wrap btn_flex_wrap">
                        <button type="button" on:click={onPwChg} class="btn_02">변경</button>
                        <button type="button" class="btn_04" on:click={() => goto(URL.awLogin)}>취소</button>
                    </div>
                </form>
                <footer>
                    <p>Copyright BIT Doctor.<br class="mo"> All Rights Reserved.</p>
                </footer>
            </div>
        </section>
