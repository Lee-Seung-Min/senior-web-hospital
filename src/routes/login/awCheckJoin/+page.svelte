<script>
  //회원가입 후 인증완료 페이지.
  import { page } from "$app/stores";
  import { getAPI } from "$lib/js/getAPI";
  import { authUrlAddr } from "$lib/js/urlAddr";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";
  import { URL } from "$lib/URL";
  let email = $page.url.searchParams.get("email");
  let key = $page.url.searchParams.get("key");

  let id = "";
  let inputEmail = "";
  let visiable = false;
  let isLoading = false; //로딩화면 OnOff

  onMount(async () => {
    //링크 클릭으로 들어온 파라미터를 체크해서 인증이 됐는지 확인
    if (email && key) {
      const result = await getAPI(authUrlAddr + "/v1/auth/ext/checkUUID?email=" + email + "&uuid=" + key);
      if (result != "" && result > 0) {
        alert("인증이 완료되었습니다. 로그인을 진행해주세요.");
        goto(URL.awLogin);
      } else {
        alert("만료된 링크이거나 잘못된 접근입니다. 다시 인증해주세요.");
        visiable = true;
      }
    } else {
      alert("재인증 페이지로 넘어갑니다.");
      visiable = true;
    }
  });

  async function joinMail() {
    try {
      isLoading = true;
      const result = await getAPI(
        authUrlAddr + "/v1/auth/ext/checkIDEmail?id=" + id + "&email=" + inputEmail + "&type=awCheckJoin"
      );
      if (result || result > 0) {
        alert("인증메일을 보냈습니다. 메일을 확인해주세요.");
        goto(URL.awLogin);
      } else {
        alert("이메일 또는 아이디가 잘못 입력되었습니다. 해당 오류가 지속적으로 발생하면 문의 바랍니다.");
        isLoading = false;
      }
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다. 해당 오류가 지속적으로 발생하면 문의 바랍니다.");
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
      joinMail();
    }
  }
</script>

{#if visiable}
  <section class="login_box">
    <div>
      <p class="logo" />
      <h3 style="padding-bottom: 5px;">이메일 재전송</h3>
      <div class="box_type1">
        가입 인증 이메일 재전송을 위해 가입할때 사용하신 아이디와 이메일을 입력해주세요.
        <label>
          <input type="text" bind:value={id} required />
          <span>아이디</span>
        </label>
        <label>
          <input type="text" bind:value={inputEmail} on:keydown={enterkeypress} required />
          <span>이메일</span>
        </label>
      </div>
      <div class="btn_wrap btn_flex_wrap">
        <button type="button" class="btn_02" on:click={() => joinMail()}>전송</button>
      </div>
    </div>
  </section>

  <!-- PageLoader -->
  {#if isLoading}
    <PageLoader />
  {/if}
{/if}
