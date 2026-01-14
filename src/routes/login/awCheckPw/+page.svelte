<script>
  import { goto } from "$app/navigation";
  import { URL } from "$lib/URL";
  import { page } from "$app/stores";
  import { getAPI } from "$lib/js/getAPI";
  import { postFetch } from "$lib/js/postFetch";
  import { authUrlAddr } from "$lib/js/urlAddr";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";
  import { onMount } from "svelte";
  import {base} from '$app/paths';
  
  const logoSrc = `${base}/assets/img/sendFindPasswordMail.png`;
  let email = $page.url.searchParams.get("email");
  let key = $page.url.searchParams.get("key");
  let id = "";

  let visiable = false;
  let eqVisiable = false;

  let isLoading = false;

  let password = "";
  let checkPw = "";

  onMount(async () => {
    if (email && key) {
      const result = await getAPI(
        authUrlAddr + "/v1/auth/ext/checkUUID?email=" + email + "&uuid=" + key
      );
      if (result != "" && result > 0) {
        visiable = true;
        id = result;
      } else {
        alert("만료된 링크이거나 잘못된 접근입니다. 다시 인증해주세요.");
        goto(URL.awLogin);
      }
    } else {
      alert("잘못된 접근입니다. 다시 인증해주세요.");
      goto(URL.awLogin);
    }
  });

  async function changePw() {
    isLoading = true;

    if (password == "") {
      alert("비밀번호를 입력해주세요.");
      isLoading = false;
      return;
    }
    if (password != checkPw) {
      alert("비밀번호와 비밀번호 획인이 일치하지 않습니다.");
      isLoading = false;
      return;
    }

    const url = authUrlAddr + "/v1/auth/ext/changePw";
    let data = { password, email, id };

    try {
      await postFetch(url, JSON.stringify(data))
        .then((res) => res.json())
        .then((data) => {
          if (data > 0) {
            alert("비밀번호 수정이 완료되었습니다. 홈 화면으로 이동합니다.");
            isLoading = false;
            goto(URL.awLogin);
          } else {
            alert("비밀번호 변경에 실패했습니다. 계속 해당 오류가 발생한다면 문의 부탁드립니다.");
            isLoading = false;
          }
        });
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다. 계속 해당 오류가 발생한다면 문의 부탁드립니다.");
      isLoading = false;
    }
  }

  function isEqualPw() {
    if (checkPw != "" && password != checkPw) eqVisiable = true;
    else eqVisiable = false;
  }

  function enterkeypress(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      changePw();
    }
  }
</script>

{#if visiable}
  <section class="reset-page">
    <div class="reset-card" aria-busy={isLoading}>
      <header class="brand">
        <img class="brand-logo" src={logoSrc} alt="피어나다 로고" />
        <h1 class="title">비밀번호 재설정</h1>
        <p class="subtitle">변경하실 비밀번호를 입력해주세요.</p>
      </header>

      <div class="form">
        <div class="field">
          <label class="label" for="pw">새 비밀번호</label>
          <input
            id="pw"
            class="input"
            type="password"
            maxlength="20"
            bind:value={password}
            required
            autocomplete="new-password"
            placeholder="새 비밀번호를 입력하세요"
          />
        </div>

        <div class="field">
          <label class="label" for="pw2">새 비밀번호 확인</label>
          <input
            id="pw2"
            class="input"
            type="password"
            maxlength="20"
            bind:value={checkPw}
            on:input={() => isEqualPw()}
            on:keydown={enterkeypress}
            required
            autocomplete="new-password"
            placeholder="한 번 더 입력하세요"
          />
          <div class="message-slot">
            {#if eqVisiable}
              <p class="error">새 비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
            {/if}
          </div>
        </div>

        <ul class="help">
          <li>* 영문, 숫자, 특수문자를 함께 사용하면 보다 안전합니다.</li>
          <li>* 확인을 누르면 로그인 페이지로 이동합니다.</li>
        </ul>

        <button
          type="button"
          class="btnPrimary"
          on:click={() => changePw()}
          disabled={isLoading}
        >
          확인
        </button>
      </div>
    </div>

    {#if isLoading}
      <div class="loader-layer" aria-hidden="true">
        <PageLoader />
      </div>
    {/if}
  </section>
{/if}

<style>
  /* ====== Reset Password Page (awLogin 톤) ====== */
  .reset-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px 16px;
  }

  .reset-card {
    width: 100%;
    max-width: 460px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
    padding: 40px 36px;
    position: relative;
    overflow: hidden;
    animation: slideUp 0.55s ease-out;
  }

  .reset-card::before {
    content: "";
    position: absolute;
    left: -40px;
    top: -40px;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, rgba(220, 53, 69, 0.18), transparent 70%);
    filter: blur(2px);
  }

  .brand {
    text-align: center;
    margin-bottom: 22px;
  }

  .brand-logo {
    display: block;
    margin: 0 auto 14px;
    width: min(260px, 82%);
    height: auto;
    object-fit: contain;
  }

  .title {
    margin-top: 60px;
    font-size: 26px;
    font-weight: 800;
    color: #2c3e50;
    letter-spacing: -0.4px;
  }

  .subtitle {
    margin: 16px 0 0;
    font-size: 14px;
    color: #7f8c8d;
  }

  .form {
    margin-top: 18px;
  }

  .field + .field {
    margin-top: 14px;
  }

  .label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 8px;
  }

  .input {
    width: 100%;
    height: 48px;
    padding: 0 14px;
    border: 2px solid #ecf0f1;
    border-radius: 10px;
    font-size: 15px;
    color: #2c3e50;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
    background: #fff;
  }

  .input::placeholder {
    color: #bdc3c7;
  }

  .input:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.12);
  }

  .message-slot {
    min-height: 20px;
    margin-top: 8px;
  }

  .error {
    margin: 0;
    font-size: 13px;
    color: #dc3545;
    font-weight: 700;
  }

  .help {
    margin: 14px 0 18px;
    padding: 0;
    list-style: none;
    color: #7f8c8d;
    font-size: 13px;
    line-height: 1.5;
  }

  .help li + li {
    margin-top: 4px;
  }

  .btnPrimary {
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.25);
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
  }

  .btnPrimary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(220, 53, 69, 0.30);
    filter: brightness(0.98);
  }

  .btnPrimary:active {
    transform: translateY(0px);
  }

  .btnPrimary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* 로더가 뜰 때 카드 위로 살짝 어둡게 */
  .loader-layer {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.18);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  @media (max-width: 480px) {
    .reset-card {
      padding: 30px 22px;
    }
    .title {
      font-size: 22px;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
