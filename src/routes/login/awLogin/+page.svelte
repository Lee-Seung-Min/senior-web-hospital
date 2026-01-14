<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import Nav from "$lib/sub/nav/Nav.svelte";
  import { goto } from "$app/navigation";
  import { URL } from "$lib/URL";
  import { isLogin } from "$lib/store/loginStore";
  import { getAPI } from "$lib/js/getAPI";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import { loginPostAPI } from "$lib/js/loginPostAPI";
  import { footCheck } from "$lib/store/navStore.js"; //밑에 메뉴바 변경 가능하도록
  import { authUrlAddr, urlAddr } from "$lib/js/urlAddr";

  import Grid from "gridjs-svelte";
  import { SvelteWrapper } from "gridjs-svelte/plugins";
  import Footer from "$lib/sub/Footer.svelte";
  import { susrId, susrLoginId, susrName, susrShpId, susrShpName, susrShpType } from "$lib/store/loginStore";

  let id = "";
  let password = "";
  let dateFormat = "yy-mm-dd";

  onMount(async () => {});

  async function login() {
    let data = {
      dateFormat: dateFormat,
      susrLoginId: id,
      susrPwd: password,
    };
    const url = authUrlAddr + "/v1/auth/ext/singinShop";
    let res = await loginPostAPI(url, JSON.stringify(data));

    if (res.code == 21002) {
      alert("아이디 또는 비밀번호를 다시 확인해주세요.");
    } else if (res.code == 21010) {
      alert("이메일 인증을 진행하고 로그인을 진행해주세요.");
      goto(URL.awCheckJoin);
    } else if (res.code != 0) {
      alert("로그인에 실패했습니다. 해당 오류가 지속적으로 발생하면 문의 바랍니다.");
    } else {
      $susrId = res.resultVO.susrId;
      $susrName = res.resultVO.susrName;
      $susrLoginId = res.resultVO.susrLoginId;
      $susrShpName = res.resultVO.susrShpName;
      $susrShpType = res.resultVO.susrShpType;
      $susrShpId = res.resultVO.susrShpId;
      // isLogin.update((isLogin) => (isLogin = true));
      goto(URL.main);
    }
  }

  let popup = false;
  function onPwChg() {
    popup = true;
  }

  function enterkeypress(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      login();
    }
  }

  function pageChange(url) {
    goto(url);
  }
</script>

<div id="skipNavi" class="sr-only">
  <a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a>
</div>

<!-- content S -->
<div class="login-container">
  <div class="login-wrapper">
    <div class="login-box">
      <div class="login-header">
        <div class="logo-icon">
          <i class="fa-solid fa-hospital"></i>
        </div>
        <h1 class="login-title">남원 e케어</h1>
        <p class="login-subtitle">병원 관리 시스템</p>
      </div>

      <form on:submit|preventDefault={login} class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">아이디</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-user input-icon"></i>
            <input
              type="text"
              id="username"
              placeholder="아이디를 입력하세요"
              required
              bind:value={id}
              class="form-input"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">비밀번호</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-lock input-icon"></i>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              required
              bind:value={password}
              on:keypress={enterkeypress}
              class="form-input"
            />
          </div>
        </div>

        <div class="login-links">
          <button
            type="button"
            on:click={() => pageChange(URL.awFindID)}
            class="link-button"
          >
            아이디 찾기
          </button>
          <span class="divider">|</span>
          <button
            type="button"
            on:click={() => pageChange(URL.awChngPw)}
            class="link-button"
          >
            비밀번호 찾기
          </button>
        </div>

        <button type="submit" class="login-button">
          <i class="fa-solid fa-sign-in-alt"></i>
          로그인
        </button>
      </form>

      <div class="login-footer">
        <p class="help-text">
          문제가 있으신가요?
          <span class="contact-link">관리자에게 문의</span>
        </p>
      </div>
    </div>

    <div class="copyright">
      <p>© 2025 남원 E-케어 병원 관리 시스템. All rights reserved.</p>
    </div>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.3;
    }
  }

  .login-wrapper {
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 1;
  }

  .login-box {
    background: white;
    border-radius: 16px;
    padding: 48px 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.6s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #dc3545, #c82333);
    border-radius: 50%;
    margin-bottom: 20px;
    box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
  }

  .logo-icon i {
    font-size: 36px;
    color: white;
  }

  .login-title {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
  }

  .login-subtitle {
    font-size: 14px;
    color: #7f8c8d;
    margin: 0;
  }

  .login-form {
    margin-bottom: 24px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
  }

  .input-wrapper {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
    font-size: 16px;
  }

  .form-input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    border: 2px solid #ecf0f1;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .form-input:focus {
    outline: none;
    border-color: #dc3545;
    box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
  }

  .form-input::placeholder {
    color: #bdc3c7;
  }

  .login-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .link-button {
    background: transparent;
    border: none;
    color: #7f8c8d;
    cursor: pointer;
    padding: 4px 8px;
    transition: color 0.2s ease;
    font-size: 14px;
  }

  .link-button:hover {
    color: #dc3545;
  }

  .divider {
    color: #dfe6e9;
  }

  .login-button {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #dc3545, #c82333);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  }

  .login-button:hover {
    background: linear-gradient(135deg, #c82333, #bd2130);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
    transform: translateY(-2px);
  }

  .login-button:active {
    transform: translateY(0);
  }

  .login-button i {
    margin-right: 8px;
  }

  .login-footer {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #ecf0f1;
  }

  .help-text {
    font-size: 13px;
    color: #7f8c8d;
    margin: 0;
  }

  .contact-link {
    color: #dc3545;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .contact-link:hover {
    color: #c82333;
    text-decoration: underline;
  }

  .copyright {
    text-align: center;
    margin-top: 24px;
  }

  .copyright p {
    font-size: 13px;
    color: #7f8c8d;
    margin: 0;
  }

  @media (max-width: 480px) {
    .login-box {
      padding: 32px 24px;
    }

    .login-title {
      font-size: 24px;
    }

    .logo-icon {
      width: 64px;
      height: 64px;
    }

    .logo-icon i {
      font-size: 28px;
    }
  }
</style>
