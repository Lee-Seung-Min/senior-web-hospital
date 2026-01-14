<script>
  import { onMount } from "svelte";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import Nav from "$lib/sub/nav/Nav.svelte";
  import { goto } from "$app/navigation";
  import { URL } from "$lib/URL";
  import { getAPI } from "$lib/js/getAPI";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import { authUrlAddr, urlAddr } from "$lib/js/urlAddr";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";

  let id = "";
  let email = "";
  let isLoading = false; //로딩화면 OnOff

  async function checkIDEmail() {
    try {
      isLoading = true;
      const result = await getAPI(
        authUrlAddr + "/v1/auth/ext/checkIDEmail?id=" + id + "&email=" + email + "&type=awCheckPw"
      );
      if (result.resultVO > 0) {
        alert("본인확인을 위한 이메일이 발송되었습니다. 입력하신 이메일의 메일함을 확인해주세요.");
        goto(URL.awLogin);
      } else {
        alert("이메일 또는 아이디가 잘못 입력되었습니다. 다시 시도해주세요.");
        console.log(result);
        isLoading = false;
      }
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다. 계속 해당 오류가 발생하면 문의 바랍니다.");
      isLoading = false;
    }
  }

  /**
   * 마지막 input에서 엔터키를 눌렀을 때를 캐치해서 아이디 찾기를 진행
   * @param {{ key: string; preventDefault: () => void; }} e 키 누르는 이벤트
   */
  function enterkeypress(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      checkIDEmail();
    }
  }
</script>

<div class="change-pw-container">
  <div class="change-pw-wrapper">
    <div class="change-pw-box">
      <div class="change-pw-header">
        <div class="back-button" on:click={() => goto(URL.awLogin)}>
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div class="logo-icon">
          <i class="fa-solid fa-key"></i>
        </div>
        <h1 class="change-pw-title">비밀번호 찾기</h1>
        <p class="change-pw-subtitle">본인확인을 위해 아이디와 이메일을 입력해주세요</p>
      </div>

      <form on:submit|preventDefault={checkIDEmail} class="change-pw-form">
        <div class="form-group">
          <label for="id" class="form-label">아이디</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-user input-icon"></i>
            <input
              type="text"
              id="id"
              placeholder="아이디를 입력하세요"
              required
              bind:value={id}
              class="form-input"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">이메일</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-envelope input-icon"></i>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              required
              bind:value={email}
              on:keydown={enterkeypress}
              class="form-input"
            />
          </div>
          <p class="input-help">인증 메일이 발송됩니다</p>
        </div>

        <div class="button-group">
          <button type="submit" class="submit-button">
            <i class="fa-solid fa-paper-plane"></i>
            인증 메일 전송
          </button>
          <button type="button" class="cancel-button" on:click={() => goto(URL.awLogin)}>
            <i class="fa-solid fa-times"></i>
            취소
          </button>
        </div>
      </form>
    </div>

    <div class="copyright">
      <p>© 2025 남원 E-케어 병원 관리 시스템. All rights reserved.</p>
    </div>
  </div>
</div>

<!-- PageLoader -->
{#if isLoading}
  <PageLoader />
{/if}

<style>
  .change-pw-container {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  .change-pw-wrapper {
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 1;
  }

  .change-pw-box {
    background: white;
    border-radius: 16px;
    padding: 48px 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
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

  .change-pw-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
  }

  .back-button {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: #f8f9fa;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .back-button:hover {
    background: #dc3545;
    color: white;
  }

  .back-button i {
    font-size: 16px;
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

  .change-pw-title {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
  }

  .change-pw-subtitle {
    font-size: 14px;
    color: #7f8c8d;
    margin: 0;
  }

  .change-pw-form {
    margin-bottom: 0;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group:last-of-type {
    margin-bottom: 32px;
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

  .input-help {
    font-size: 12px;
    color: #95a5a6;
    margin: 8px 0 0 0;
  }

  .button-group {
    display: flex;
    gap: 12px;
  }

  .submit-button {
    flex: 1;
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

  .submit-button:hover {
    background: linear-gradient(135deg, #c82333, #bd2130);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
    transform: translateY(-2px);
  }

  .submit-button:active {
    transform: translateY(0);
  }

  .submit-button i {
    margin-right: 8px;
  }

  .cancel-button {
    flex: 1;
    padding: 16px;
    background: white;
    color: #7f8c8d;
    border: 2px solid #ecf0f1;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cancel-button:hover {
    background: #f8f9fa;
    border-color: #dfe6e9;
    color: #2c3e50;
  }

  .cancel-button i {
    margin-right: 8px;
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
    .change-pw-box {
      padding: 32px 24px;
    }

    .change-pw-title {
      font-size: 24px;
    }

    .logo-icon {
      width: 64px;
      height: 64px;
    }

    .logo-icon i {
      font-size: 28px;
    }

    .button-group {
      flex-direction: column;
    }
  }
</style>
