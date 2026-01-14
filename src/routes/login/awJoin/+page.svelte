<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { URL } from "$lib/URL";
  import { postAPI } from "$lib/js/postAPI";
  import { postFetch } from "$lib/js/postFetch";
  import { authUrlAddr } from "$lib/js/urlAddr";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";
  import Daum from "svelte-daum-postcode";

  let isLoading = false; //로딩창 OnOff 변수

  let dtlAddressFocus; //상세주소 input DOM

  let hospitalName = "";
  let hospitalNum = "";
  let businessNum = "";
  let password = "";
  let representative = "";
  let manager = "";
  let managerPhone = "";
  let phone = "";
  let email = "";
  let selected_domain = "naver.com"; // 기본 도메인 설정
  let custom_domain = ""; // 직접 입력할 도메인
  let addZip = "";
  let address = "";
  let dtlAddress = "";
  let agreementChecked = false; // 약관 동의 여부

  let addToggle = false; //다음 주소 창 등장유무
  let sdtlLati = ""; //위도
  let sdtlLongi = ""; //경도

  function addComplete({ detail: { data } }) {
    addZip = data.zonecode;
    address = data.roadAddress;
    getAddr(address);
    addToggle = false;
    dtlAddressFocus.focus();
  }

  async function getAddr(addr) {
    try {
      const url = "https://dapi.kakao.com/v2/local/search/address.json?query=" + addr;

      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: "KakaoAK b87e5db988c66a858cfc810a5269b706" },
      });
      let resData = await res.json();
      sdtlLati = resData.documents[0].road_address.y;
      sdtlLongi = resData.documents[0].road_address.x;
    } catch (err) {
      console.error(err);
      alert("주소를 가져오는 도중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  // 회원가입 버튼을 누르면 정보를 보낸다.
  async function handleSubmit() {
    isLoading = true;
    if (!agreementChecked) {
      alert("약관에 동의해주세요.");
      isLoading = false;
      return;
    }

    const url = authUrlAddr + "/v1/auth/ext/joinShop";
    let data = {
      shpName: hospitalName,
      susrLoginid: hospitalNum,
      sdtlRegNo: businessNum,
      susrName: representative,
      sdtlContName: manager,
      sdtlContTel: managerPhone,
      susrEmail: email,
      susrPwd: password,
      susrTel: phone,
      sdtlZip: addZip,
      sdtlAddr: address,
      sdtlAddrDtl: dtlAddress,
      sdtlLati: sdtlLati,
      sdtlLongi: sdtlLongi,
    };
    await postFetch(url, JSON.stringify(data))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data == 1) {
          isLoading = false;
          alert(
            "회원가입이 완료되었습니다. 입력한 이메일로 보낸 메일의 링크를 눌러서 인증해주세요. ID는 " +
              hospitalNum +
              "!A입니다."
          );
          goto(URL.awLogin);
        } else if (data.status == 21001) {
          isLoading = false;
          alert("이미 회원가입되어있는 요양기관번호입니다.");
          goto(URL.awJoin);
        } else {
          isLoading = false;
          alert("오류가 발생했습니다. 다시 시도 후에도 오류가 발생하면 문의 부탁드립니다.");
          goto(URL.awJoin);
        }
      });
  }

  function validateHosNum() {
    hospitalNum = hospitalNum.replace(/[^0-9]/g, "");
  }

  function validateBusNum() {
    businessNum = businessNum.replace(/[^0-9]/g, "");
  }

  function validatePassword() {
    password = password.replace(/\s/g, "");
  }
  function validatePhone() {
    phone = phone.replace(/[^0-9]/g, "");
  }
  function validatemanagerPhone() {
    managerPhone = managerPhone.replace(/[^0-9]/g, "");
  }
  function validateZip() {
    addZip = addZip.replace(/[^0-9]/g, "");
  }
</script>

<div style="display:table; margin:0 auto;">
  <h1 style="display:flex;padding-bottom:20px;justify-content: center; color:black;">바로닥터 서비스 가입 신청서</h1>
  <h4 style="border-bottom: solid 1px gray">
    모든 입력항목은 <span style="color: red; padding-left:3px;"> 필수</span>입니다.
  </h4>
  <form on:submit|preventDefault={handleSubmit}>
    <div></div>
    <div>
      <label for="hospitalName">병원명</label>
      <input type="text" id="hospitalName" maxlength="60" bind:value={hospitalName} required />
    </div>

    <div>
      <label for="hospitalNum">요양기관번호(ID)</label>
      <input type="text" id="hospitalNum" maxlength="8" on:input={validateHosNum} bind:value={hospitalNum} required />
    </div>

    <div>
      <label for="businessNum">사업자 등록번호</label>
      <input type="text" id="businessNum" maxlength="10" on:input={validateBusNum} bind:value={businessNum} required />
    </div>

    <div>
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        maxlength="20"
        style="margin-right: 10px;"
        on:input={validatePassword}
        bind:value={password}
        required
      />
      <span style="color: red; font-weight: bold;">※ 추후 연동에 필요하니 꼭 기억해 주시길 바랍니다.</span>
    </div>

    <div>
      <label for="representative">대표자</label>
      <input type="text" id="representative" maxlength="15" bind:value={representative} required />
    </div>

    <div>
      <label for="phone">대표 전화번호</label>
      <input type="text" id="phone" maxlength="15" on:input={validatePhone} bind:value={phone} required />
    </div>

    <div>
      <label for="manager">담당자</label>
      <input type="text" id="manager" maxlength="15" bind:value={manager} required />
    </div>

    <div>
      <label for="managerPhone">담당자 전화번호</label>
      <input
        type="text"
        id="managerPhone"
        maxlength="15"
        on:input={validatemanagerPhone}
        bind:value={managerPhone}
        required
      />
    </div>

    <div>
      <label for="email">이메일</label>
      <input type="email" id="email" bind:value={email} style="margin-right: 10px;" required />
    </div>

    <div>
      <label for="addZip">우편번호</label>
      <input
        type="text"
        id="addZip"
        maxlength="5"
        bind:value={addZip}
        on:click={() => (addToggle = true)}
        on:focus={() => (addToggle = true)}
        required
        readonly
      />
    </div>

    <div>
      <label for="address">병원 기본 주소</label>
      <input
        type="text"
        id="address"
        maxlength="280"
        bind:value={address}
        on:click={() => (addToggle = true)}
        on:focus={() => (addToggle = true)}
        required
        readonly
      />
    </div>

    <div>
      <label for="dtlAddress">병원 상세 주소</label>
      <input type="text" id="dtlAddress" maxlength="280" bind:value={dtlAddress} bind:this={dtlAddressFocus} required />
    </div>

    {#if addToggle}
      <div>
        <Daum height="500px" autoClose="true" on:complete={addComplete} />
      </div>
    {/if}

    <div>
      <span style="border: solid 1px; padding: 10px; line-height: 20px;">
        본인은 (주)비트컴퓨터의 비대면 진료 플랫폼 바로닥터 서비스 이용을 위한 목적으로 서비스 이용을 신청합니다.<br />
        * 결제수수료는 1건 당 브이피 주식회사(이하 스마트로)에게 2.43% 공제됩니다. (VAT 별도)<br />
        * 개인정보는 회원관련 이외에 다른 용도로 활용하지 않을 것을 보장합니다.
        <br />병원의 처리업무위탁을 진료 및 처리를 위해 바로닥터에서 주민번호 수집 및 제공을 목적으로 개인정보를
        처리합니다.
      </span>
    </div>
    <div>
      <input type="checkbox" id="agreement" bind:checked={agreementChecked} required />
      <label for="agreement" style="text-align: left;">위 약관에 동의합니다.</label>
    </div>
    <div>바로닥터 회원가입 문의 : 02-3487-8585</div>
    <div style="display: flex; justify-content: center;">
      <button type="submit" style="font-weight: bold;">가입하기</button>
    </div>
  </form>
</div>

<!-- PageLoader -->
{#if isLoading}
  <PageLoader />
{/if}

<style>
  h4 {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
  }

  form div {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  label {
    width: 150px; /* 레이블의 너비 설정 */
    text-align: right;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  select {
    margin-left: 10px; /* 입력 필드와 레이블 사이 간격 설정 */
  }

  input:focus,
  select:focus {
    outline: 1px solid #00ace5;
  }

  button {
    background-color: skyblue;
    border-radius: 5px;
    width: 100px;
    height: 30px;
  }
</style>
