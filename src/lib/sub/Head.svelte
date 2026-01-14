<script>
  import {
    loginResetStore,
    susrId,
    susrLoginId,
    susrName,
    susrShpId,
    susrShpName,
    susrShpType,
  } from "$lib/store/loginStore";
  import { goto } from "$app/navigation";
  import { URL } from "$lib/URL";
  import { onMount } from "svelte";
  import { base } from '$app/paths';


  onMount(() => {
    let _pathName = window.location.pathname.split("/");
    console.log(_pathName);
    _pathName = _pathName[_pathName.length - 1];
    urlSearch(_pathName);
    // let urlList = URL;
    // let button11 = document.querySelector(".information");
    // let button12 = document.querySelector(".hospital");
    // button11.click();
    // button12.click();

    // console.log(button12)
  });

  function urlSearch(_pathName) {
    switch (_pathName) {
      case "main":
        document.querySelector(".home").click();
        break;
      case "awDgnsRsvLst":
        document.querySelector(".reservation").click();
        break;
      case "awDgnsEnt":
        document.querySelector(".information").click();
        break;
      case "awPspnLst":
        document.querySelector(".prescription").click();
        break;
      case "awHsptDtl":
        document.querySelector(".information").click();
        document.querySelector(".hospital").click();
        break;
      case "awDrstDtl":
        document.querySelector(".information").click();
        document.querySelector(".drugstore").click();
        break;
      case "awNtcLst":
        document.querySelector(".notice").click();
        break;
      case "awPayLst":
        document.querySelector(".awpaylst").click();
        break;
      case "awAdjmtLst":
        document.querySelector(".payment").click();
        document.querySelector(".support_list").click();
        break;
      case "awAdjmDtlLst":
        document.querySelector(".support_list").click();
        break;
      case "awShpNtcLst":
        document.querySelector(".information").click();
        document.querySelector(".shop_notice").click();
        break;
      case "awShpNtcDtl":
        document.querySelector(".information").click();
        document.querySelector(".shop_notice").click();

        break;
      case "awShpNtcRgst":
        document.querySelector(".information").click();
        document.querySelector(".shop_notice").click();
        break;
      case "awFindID":
        document.querySelector(".logo").click();
        break;
      case "awCheckJoin":
        document.querySelector(".logo").click();
        break;
      case "awCheckPw":
        document.querySelector(".logo").click();
        break;
      case "awChngPw":
        document.querySelector(".logo").click();
        break;
      case "awFindID":
        document.querySelector(".logo").click();
        break;
      case "awCheckJoin":
        document.querySelector(".logo").click();
        break;
      case "awCheckPw":
        document.querySelector(".logo").click();
        break;
      case "awChngPw":
        document.querySelector(".logo").click();
        break;

      default:
        document.querySelector(".home").click();
        break;
    }
  }

  function logout() {
    localStorage.setItem("bizportal-access-token", "");
    localStorage.setItem("bizportal-refresh-token", "");
    //alert("logout");
    loginResetStore();
    goto(URL.awLogin);
  }

  function showNavAction(e) {
    document.querySelectorAll('#menu li.active').forEach((menuElement) => {
      menuElement.classList.remove('active');
    })

    if (e) {
      e.target.classList.add('active');
    } else {
      document.querySelector('#menu li ul li:first-of-type')?.classList.add('active');
    }
    // var _pathName = window.location.pathname.split("/");
    // const items = document.querySelectorAll(".menu_item");
    // //배열로 저장되기 때문에 forEach로 하나씩 이벤트를 등록해준다.
    // items.forEach((item) => {
    //   item.addEventListener("click", () => {
    //     items.forEach((e) => {
    //       //하나만 선택되도록 기존의 효과를 지워준다.
    //       e.children[0].classList.remove("active");
    //       // 클릭된 버튼에 sub클래스가 없다면 각 sub 버튼의 .active 제거
    //       if (!item.querySelector(".sub") && e.querySelector(".sub")) {
    //         e.querySelectorAll(".sub").forEach((e2) => {
    //           e2.querySelector("button").classList.remove("active");
    //         });
    //       }
    //     });
    //     // 선택한 그 아이만 효과를 추가해준다.
    //     item.children[0].classList.add("active");
    //     // item.querySelector(".submenu").querySelector('button').classList.add('active');
    //     // 선택을 하면 다음으로 넘어갈 수 있는 버튼이 활성화 되도록 한다.
    //     // document.getElementById('next').style.display = 'block';
    //   });
    // });
  }

  function showSubMenu() {
    const items = document.querySelectorAll(".sub");
    //배열로 저장되기 때문에 forEach로 하나씩 이벤트를 등록해준다.
    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((e) => {
          //하나만 선택되도록 기존의 효과를 지워준다.
          e.children[0].classList.remove("active");
        });
        // 선택한 그 아이만 효과를 추가해준다.
        item.children[0].classList.add("active");
        // 선택을 하면 다음으로 넘어갈 수 있는 버튼이 활성화 되도록 한다.
        // document.getElementById('next').style.display = 'block';
      });
    });
  }
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <!-- <link rel="stylesheet" href="src/assets/css/reset.css"> -->
  <!-- <link rel="stylesheet" href="/src/assets/css/reset.css"> -->
  <!-- <link rel="stylesheet" href="/src/assets/css/common.css"> -->
  <!-- 아이콘 폰트 -->
  <!-- <link rel="stylesheet" href="/src/assets/font/XEIcon/xeicon.min.css" /> -->
  <!-- <link rel="stylesheet" href="/src/assets/font/icomoon/style.css" /> -->
  <!-- 폰트 -->
  <!-- <link rel="stylesheet" href="/src/assets/font/pretendard.css" /> -->
  <script src="{base}/assets/js/jquery-3.3.1.min.js"></script>
  <script src="{base}/assets/js/html5shiv.min.js"></script>
  <script src="{base}/assets/js/placeholders.min.js"></script>
  <!-- <script src="/src/assets/js/prefixfree.min.js"></script> -->
  <!-- 달력 소스 S -->
  <!-- <script src="/src/assets/js/jquery-ui.js"></script>
    <link rel="stylesheet" href="/src/assets/css/jquery-ui.css"> -->
  <!-- 달력 소스 E -->
  <script src="{base}/assets/js/common.js"></script>
  <script>
            window.FontAwesomeConfig = { autoReplaceSvg: "nest" };
  </script>
  <!-- 메뉴 추가 S-->
  <!-- <script src="/assets/js/menu.js"></script> -->
  <!-- 메뉴 추가 E-->
  <!-- 리얼 그리드 S -->
  <!-- <script src="/src/assets/realgrid/realgridjs-lic.js"></script>
    <script src="/src/assets/realgrid/realgridjs_eval.1.1.43.min.js"></script>
    <script src="/src/assets/realgrid/realgridjs-api.1.1.43.js"></script>
    <script src="/src/assets/realgrid/jszip.min.js"></script> -->
  <!-- 리얼 그리드 E-->
  <!-- <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js"></script> -->

  <!-- <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"></script> -->
  <!-- Font Awesome -->
<link rel="stylesheet" type="text/css" href="{base}/assets/css/font-awesome-all.min.css"/>
  <title>남원 e케어</title>
</svelte:head>

{#if $susrShpId}
  <div id="nav">
    <section id="head">
      <div class="logo">
        <img src="{base}/assets/img/namwon.png" alt="남원 E-케어 로고">
        <span class="text-xl">남원 e케어</span>
        <span class="text-base">{$susrShpName}</span>
      </div>
      <div class="admin">
        <i class="icon-account_circle" on:click={() => goto(URL.awChngPw)}></i>
        <span><b>{$susrName}</b>님</span>
        <button type="button" class="btn_03 btn_xs" on:click={logout}>Logout</button>
      </div>
    </section>

    <section id="con">
      <div id="menu">
        <div class="lnb">
          <nav>
            <ul class="menu">
              <li class="menu_item">
                <span class="text-xs">홈</span>
                <ul>
                  <li 
                  class="text-base home"
                  on:click={(e) => {
                    showNavAction(e);
                    goto(URL.main);
                  }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/></svg>
                  Home</li>
                </ul>
              </li>
              <li class="menu_item">
                <span class="text-xs">진료</span>
                <ul>
                  <li 
                  class="text-base reservation"
                  on:click={(e) => {
                    showNavAction(e);
                    goto(URL.awDgnsRsvLst);
                  }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM160 160L160 224L224 224L224 160L160 160zM480 160L288 160L288 224L480 224L480 160zM160 288L160 352L224 352L224 288L160 288zM480 288L288 288L288 352L480 352L480 288zM160 416L160 480L224 480L224 416L160 416zM480 416L288 416L288 480L480 480L480 416z"/></svg>
                  진료 예약 목록</li>
                </ul>
                <ul>
                  <li 
                  class="text-base receipt"
                    on:click={(e) => {
                      showNavAction(e);
                      goto(URL.awDgnsRcpt);
                    }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M584 352C597.3 352 608 362.7 608 376L608 480C608 515.3 579.3 544 544 544L96 544C60.7 544 32 515.3 32 480L32 376C32 362.7 42.7 352 56 352C69.3 352 80 362.7 80 376L80 480C80 488.8 87.2 496 96 496L544 496C552.8 496 560 488.8 560 480L560 376C560 362.7 570.7 352 584 352zM448 96C483.3 96 512 124.7 512 160L512 384C512 419.3 483.3 448 448 448L192 448C156.7 448 128 419.3 128 384L128 160C128 124.7 156.7 96 192 96L448 96zM410.9 180.6C400.2 172.8 385.2 175.2 377.4 185.9L291.8 303.6L265.3 276.2C256.1 266.7 240.9 266.4 231.4 275.6C221.9 284.8 221.6 300 230.8 309.5L277.2 357.5C282.1 362.6 289 365.3 296.1 364.8C303.2 364.3 309.7 360.7 313.9 355L416.2 214.1C424 203.4 421.6 188.4 410.9 180.6z"/></svg>
                  신규 예약</li>
                </ul>
              </li>
              <li class="menu_item">
                <span class="text-xs">관리</span>
                <ul>
                  <li 
                  class="text-base"
                  on:click={(e) => {
                    showNavAction(e);
                    goto(URL.awHsptDtl);
                  }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"/></svg>
                  정보 관리</li>
                </ul>
                <ul>
                  <li 
                  class="text-base awpaylst"
                  on:click={(e) => {
                    showNavAction(e);
                        goto(URL.awPayLst);
                  }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 192L64 224L576 224L576 192C576 156.7 547.3 128 512 128L128 128C92.7 128 64 156.7 64 192zM64 272L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 272L64 272zM128 424C128 410.7 138.7 400 152 400L200 400C213.3 400 224 410.7 224 424C224 437.3 213.3 448 200 448L152 448C138.7 448 128 437.3 128 424zM272 424C272 410.7 282.7 400 296 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L296 448C282.7 448 272 437.3 272 424z"/></svg>
                  정산 관리</li>
                </ul>
                <ul>
                  <li 
                  class="text-base notice"
                  on:click={(e) => {
                    showNavAction(e);
                    goto(URL.awNtcLst);
                  }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M544 160C544 124.7 515.3 96 480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160zM352 216C352 229.3 341.3 240 328 240L216 240C202.7 240 192 229.3 192 216C192 202.7 202.7 192 216 192L328 192C341.3 192 352 202.7 352 216zM424 296C437.3 296 448 306.7 448 320C448 333.3 437.3 344 424 344L216 344C202.7 344 192 333.3 192 320C192 306.7 202.7 296 216 296L424 296zM288 424C288 437.3 277.3 448 264 448L216 448C202.7 448 192 437.3 192 424C192 410.7 202.7 400 216 400L264 400C277.3 400 288 410.7 288 424z"/></svg>
                  공지사항</li>
                </ul>
              </li>
<!-- 
              <li class="menu_item">
                <button
                  type="button"
                  class="main_menu home"
                  on:click={() => {
                    showNavAction();
                    goto(URL.main);
                  }}
                  >메인
                </button>
              </li>
              {#if $susrShpType == "H"}
                <li class="menu_item">
                  <button
                    type="button"
                    class="main_menu reservation"
                    on:click={() => {
                      showNavAction();
                    }}
                  >
                    진료
                  </button>
                  <ul class="submenu">
                  <li class="sub">
                    <button
                      type="button"
                      class="payment_list"
                      on:click={() => {
                        showSubMenu();
                        goto(URL.awDgnsRsvLst);
                      }}
                      >진료 예약 목록
                    </button>
                  </li>
                  <li class="sub">
                    <button
                      type="button"
                      class="receipt"
                      on:click={() => {
                        showSubMenu();
                        goto('/hspt/awDgnsRcpt');
                      }}
                      >진료 접수 / 예약
                    </button>
                  </li>
                </ul>


                </li>
              {:else if $susrShpType == "D"}
                <li class="menu_item">
                  <button
                    type="button"
                    class="main_menu prescription"
                    on:click={() => {
                      showNavAction();
                      goto(URL.awPspnLst);
                    }}
                    >처방접수
                  </button>
                </li>
              {/if}
              <li class="menu_item">
                <button
                  type="button"
                  class="main_menu information"
                  on:click={() => {
                    showNavAction();
                  }}
                  >정보관리
                </button>
                <ul class="submenu">
                  {#if $susrShpType == "H"}
                    <li class="sub">
                      <button
                        type="button"
                        class="hospital"
                        on:click={(e) => {
                          showSubMenu();
                          goto(URL.awHsptDtl);
                        }}
                      >
                        병원정보
                      </button>
                    </li>
                  {:else if $susrShpType == "D"}
                    <li class="sub">
                      <button
                        type="button"
                        class="drugstore"
                        on:click={(e) => {
                          showSubMenu();
                          goto(URL.awDrstDtl);
                        }}
                        >약국정보
                      </button>
                    </li>
                  {/if}
                  <li class="sub">
                    <button
                      type="button"
                      class="shop_notice"
                      on:click={() => {
                        showSubMenu();
                        goto(URL.awShpNtcLst);
                      }}
                      >가맹점 공지사항
                    </button>
                  </li>
                </ul>
              </li>
              <li class="menu_item">
                <button
                  type="button"
                  class="main_menu payment"
                  on:click={() => {
                    showNavAction();
                  }}
                  >정산관리
                </button>
                <ul class="submenu">
                  <li class="sub">
                    <button
                      type="button"
                      class="payment_list"
                      on:click={() => {
                        showSubMenu();
                        goto(URL.awPayLst);
                      }}
                      >결제현황
                    </button>
                  </li>
                  <li class="sub">
                    <button
                      type="button"
                      class="support_list"
                      on:click={() => {
                        showSubMenu();
                        goto(URL.awAdjmLst);
                      }}
                      >정산현황
                    </button>
                  </li>
                </ul>
              </li>
              <li class="menu_item">
                <button
                  type="button"
                  class="main_menu notice"
                  on:click={() => {
                    showNavAction();
                    goto(URL.awNtcLst);
                  }}
                  >공지사항
                </button>
              </li> -->

            </ul>

            <!-- <div>
              <button
                class="banner-list"
                
              >
                <img
                  src="/assets/img/nav/bitcampus_banner2.png"
                  style="width: 100%"
                  onclick="window.open('https://bitcampus.com/')"
                />
              </button>
            </div> -->
          </nav>
          `
        </div>
      </div>
    </section>
  </div>
{/if}
