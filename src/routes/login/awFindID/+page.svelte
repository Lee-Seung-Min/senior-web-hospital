<script>
  import { goto } from "$app/navigation";
  import { getAPI } from "$lib/js/getAPI";
  import { getFetch } from "$lib/js/getFetch";
  import { authUrlAddr } from "$lib/js/urlAddr";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";
  import { URL } from "$lib/URL";

  let num = "";

  let isLoading = false;

  async function findID() {
    try {
      let result = await getAPI(authUrlAddr + "/v1/auth/ext/findID?num=" + num);
      let resultId = result.resultVO;
      if (resultId == "" || resultId == null) {
        isLoading = false;
        alert("일치하는 요양기관번호가 없습니다.");
      } else {
        isLoading = false;
        alert("해당 요양기관 번호와 일치하는 ID는 " + resultId + "입니다.");
        goto(URL.awLogin);
      }
    } catch (err) {
      isLoading = false;
      console.error(err);
      alert("오류가 발생했습니다. 계속 해당 오류가 발생시 문의 바랍니다.");
    }
  }

  function validateNum() {
    num = num.replace(/[^0-9]/g, "");
  }

  /**
   * 요양기관 번호 input에서 엔터키를 눌렀을 때를 캐치해서 아이디 찾기를 진행
   * @param {{ key: string; preventDefault: () => void; }} e 키 누르는 이벤트
   */
  function enterkeypress(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      findID();
    }
  }
</script>

<div class="find-id-container">
  <div class="find-id-wrapper">
    <div class="find-id-box">
      <div class="find-id-header">
        <div class="back-button" on:click={() => goto(URL.awLogin)}>
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div class="logo-icon">
          <i class="fa-solid fa-id-card"></i>
        </div>
        <h1 class="find-id-title">아이디 찾기</h1>
        <p class="find-id-subtitle">요양기관 번호로 아이디를 찾을 수 있습니다</p>
      </div>

      <form on:submit|preventDefault={findID} class="find-id-form">
        <div class="form-group">
          <label for="num" class="form-label">요양기관번호</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-building input-icon"></i>
            <input
              type="text"
              id="num"
              placeholder="요양기관번호를 입력하세요"
              maxlength="20"
              required
              bind:value={num}
              on:input={validateNum}
              on:keydown={enterkeypress}
              class="form-input"
            />
          </div>
          <p class="input-help">숫자만 입력 가능합니다</p>
        </div>

        <div class="button-group">
          <button type="submit" class="submit-button">
            <i class="fa-solid fa-search"></i>
            아이디 찾기
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
  .find-id-container {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  .find-id-wrapper {
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 1;
  }

  .find-id-box {
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

  .find-id-header {
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

  .find-id-title {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
  }

  .find-id-subtitle {
    font-size: 14px;
    color: #7f8c8d;
    margin: 0;
  }

  .find-id-form {
    margin-bottom: 0;
  }

  .form-group {
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
    .find-id-box {
      padding: 32px 24px;
    }

    .find-id-title {
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
