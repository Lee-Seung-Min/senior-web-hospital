<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { getUserId } from "$lib/js/getUserId";
  import { isLogin } from "$lib/store/loginStore";
  import { getAPI } from "$lib/js/getAPI";
  import { updateRefresh } from "$lib/js/updateRefresh";
  import { DateInput } from "date-picker-svelte";
  import { onMount } from "svelte";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import {
    adminUrlAddr,
    authUrlAddr,
    mobileUrlAddr,
    urlAddr,
    shopUrlAddr,
  } from "$lib/js/urlAddr";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import Grid from "gridjs-svelte";
  import Footer from "$lib/sub/Footer.svelte";
  import {
    susrId,
    susrLoginId,
    susrName,
    susrShpId,
    susrShpName,
  } from "$lib/store/loginStore";
  import "gridjs/dist/theme/mermaid.css";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 10);

  const pagination = {
    enabled: true,
    limit: 5, // 한 페이지에 5개의 행을 표시
    // 서버 사이드 페이징을 사용하는 경우 추가 옵션을 설정할 수 있음
  };
  const style = {
    table: {
      width: "100%",
      border: "3px solid #ccc",
    },
    th: {
      "background-color": "rgba(0, 0, 0, 0.1)",
      color: "#000",
      "border-bottom": "2px solid #ccc",
      "text-align": "center",
    },
    td: {
      "text-align": "center",
    },
  };
  const columns = [
    "번호",
    "예약일",
    "환자명",
    "관계",
    "회원명",
    "진료과목",
    "진료항목",
    "의료진",
    "진료구분",
    "진료상태",
    "접수사유",
    {
      name: "진료예약번호",
      hidden: true,
    },
  ];
  function switchLoading() {
    isLoading = !isLoading;
  }
  let isLoading = true;

  let data = [];

  let payCancelAlert = false;
  let payCancelPopup = false;
  let payCompletePopup = false;
  let zalert = false;
  let dgnsStatAlert = false;
  let dgnsCnclRsnPopup = false;
  let payErrMsg = "";
  let dgnsStat;
  let dgnsChangStat;
  let dgnsId = "";
  let dgnsDtrName = "";
  let dgnsDttm = "";
  let dgnsTypeDesc = "";
  let dgnsPatName = "";
  let dgnsMbrName = "";
  let dgnsDeptName = "";
  let dgnsItemName = "";
  let dgnsPayId = "";
  let dgnsPay = "";
  let dgnsPayType = "";
  let dgnsPayDttm = "";
  let dgnsPayStat = "";
  let dgnsPayStatDesc = "";
  let dgnsMemo = "";
  let dgnsPatType = "";
  let dgnsPatId = "";
  let dgnsMbrId = "";
  let date1 = new Date();
  let date2 = new Date();
  let dateFormat = "yy-MM-dd";
  let dgnsSearchType = "";
  let searchText = "";
  let dgnsStatName = "";
  let dgnsCnclRsn = "";
  let selectedRowId = null;
  let isRcptPopupOpen = false;
  let selectedDtrItemList = [];
  let selectedDtrDeptList = [];
  let selectedDoctor = null;
  let selectedDgnsType = ""; 
  let selectedDeptName = ""; 
  let receptionDate = new Date(); 
  let selectedHour = ""; 
  let hour = ""; 
  let rghour = []; 
  let comment = "";
  let selectedDeptId = "";
  let selectedItemId = "";
  let famList = [];
  let rcptSuccessPopup = false;
  let rcptSuccessMessage ="";

  function todayValue() {
    const today = new Date();
    const year = today.getFullYear().toString().substring(2, 4);
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onMount(async () => {
    const jwt = localStorage.getItem("bizportal-access-token");
    const refresh = localStorage.getItem("bizportal-refresh-token");

    try {
      const result = await getUserId(jwt);
      if (result) {
        isLogin.update((n) => true);
      } else {
        throw new Error("Invalid user ID");
      }
    } catch (error) {
      console.error("Error:", error.message);

      if (error.message === "21009") {
        try {
          await updateRefresh(refresh);
          goto("/main/main");
        } catch (innerError) {
          handleTokenIssue(innerError);
        }
      } else {
        handleTokenIssue(error);
      }
    }
    await rsvGridSet();
    switchLoading();
  });

  function handleTokenIssue(error) {
    console.error("Token issue:", error.message);
    if (error.message === "22005") {
      alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
      loginResetStore();
      goto("/");
    }
    clearLocalStorageTokens();
  }

  function clearLocalStorageTokens() {
    localStorage.setItem("bizportal-refresh-token", "");
    localStorage.setItem("bizportal-access-token", "");
  }

  //닫기 버튼
  function xButton() {
    zalert = false;
  }

  function search() {
    rsvGridSet();
  }

  function setDgnsInfo(args) {
    selectedRowId = args.detail[1]?._cells[0].data;
    let getData = args;
    dgnsId = getData.detail[1]._cells[11].data;
    getDgnsInfo(dgnsId);
    updateGridStyle(dgnsMbrId);
  }

  function updateGridStyle() {
    document.querySelectorAll(".gridjs-tbody tr").forEach((row, index) => {
      const cells = row.querySelectorAll("td"); // 모든 td 요소를 가져옴
      const rowId = cells[0].innerText; // rowId가 있는 td의 인덱스를 참조 (첫 번째 열)
      if (parseInt(rowId) == selectedRowId) {
        row.classList.add("highlighted");
      } else {
        row.classList.remove("highlighted");
      }
    });
  }

  async function getDgnsInfo(dgnsId) {
    switchLoading();
    const url = `${mobileUrlAddr}/v1/dgns/selectdgnsinfo?dgnsId=${dgnsId}`;
    try {
      const resData = await getAPI(url);
      const dgnsInfo = resData.resultVO;
      await settingFamList(dgnsInfo.dgnsMbrId);
      settingDgnsInfo(dgnsInfo);
    } catch (error) {
      console.error("Error fetching diagnosis information:", error);
    }
    switchLoading();
  }

  function settingDgnsInfo(dgnsInfo) {
    dgnsDtrName = dgnsInfo.dgnsDtrName;
    dgnsStat = dgnsInfo.dgnsStat;
    dgnsStatName = dgnsInfo.dgnsStatName;
    dgnsDttm = dgnsInfo.dgnsDttm;
    dgnsTypeDesc = dgnsInfo.dgnsTypeDesc;
    dgnsPatName = dgnsInfo.dgnsPatName;
    dgnsMbrName = dgnsInfo.dgnsMbrName;
    dgnsDeptName = dgnsInfo.dgnsDeptName;
    dgnsItemName = dgnsInfo.dgnsItemName;
    dgnsPayId = dgnsInfo.dgnsPayId;
    dgnsPay = dgnsInfo.dgnsPayAmt;
    dgnsPayType = dgnsInfo.dgnsPayType;
    dgnsPayDttm = dgnsInfo.dgnsPayDttm;
    dgnsPayStat = dgnsInfo.dgnsPayStat;
    dgnsPayStatDesc = dgnsInfo.dgnsPayStatDesc;
    dgnsMemo = dgnsInfo.dgnsMemo;
    dgnsPatType = dgnsInfo.dgnsPatType;
    dgnsPatId = dgnsInfo.dgnsPatId;
    dgnsMbrId = dgnsInfo.dgnsMbrId;
    setPatIdByName();
  }

  function changeDate(date) {
    const year = date.getFullYear().toString().substring(2, 4);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  async function rsvGridSet() {
    const formattedDateFrom = changeDate(date1);
    const formattedDateTo = changeDate(date2);
    const queryParams = new URLSearchParams({
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
      [dgnsSearchType]: searchText,
      dgnsShpId: $susrShpId,
    });
    if (dgnsStat != "") {
      queryParams.append("dgnsStat", dgnsStat);
    }
    let url = mobileUrlAddr + "/v1/dgns/selectdgnslist?" + queryParams;
    try {
      let resData = await getAPI(url);
      data = resData.resultVO.map(
        ({
          rowNum,
          dgnsRsvDttm,
          dgnsPatName,
          dgnsPatType,
          dgnsMbrName,
          dgnsDeptName,
          dgnsItemName,
          dgnsDtrName,
          dgnsTypeDesc,
          dgnsStatName,
          dgnsMemo,
          dgnsId,
        }) => [
          rowNum,
          dgnsRsvDttm,
          dgnsPatName,
          dgnsPatType,
          dgnsMbrName,
          dgnsDeptName,
          dgnsItemName,
          dgnsDtrName,
          dgnsTypeDesc,
          dgnsStatName,
          dgnsMemo,
          dgnsId,
        ]
      );
    } catch (error) {
      console.error("Error fetching grid data:", error);
    }
  }

  async function changeDgnsStat(dgnsId, dgnsChangStat) {
    const requestBody = makeStr({ dgnsId, dgnsStat: dgnsChangStat });
    const url = `${mobileUrlAddr}/v1/dgns/updateDgnsInfo`;

    try {
      const response = await postAPI(url, requestBody);
      if (response.resultVO === true) {
        updateUI(dgnsId);
        zalert = true;
      }
    } catch (error) {
      console.error("Error updating diagnosis status:", error);
    }
    dgnsStat = 0;
    await rsvGridSet();
  }
  function updateUI(dgnsId) {
    getDgnsInfo(dgnsId);
  }

  async function makeConf() {
    const jwt = localStorage.getItem("bizportal-access-token");
    const confUrl = `${authUrlAddr}/v1/chat/makeConf`;
    const jsonStr = (dgnsId = dgnsId); // RequestBody로 전송할 데이터
    try {
      const resData = await postAPI(confUrl, jsonStr, jwt);
      const joinUrl = resData.resultVO;
      if (resData.code == 26005) {
        dgnsStatAlert = true;
      } else if (joinUrl.creatorJoinUrl) {
        window.open(joinUrl.creatorJoinUrl, "_blank");
      } else if (joinUrl.response) {
        window.open(joinUrl.response, "_blank");
      } else {
        // 적절한 오류 처리
        console.error("No URL available to join the conference");
      }
    } catch (error) {
      console.error("Error creating conference:", error);
    }
  }

  async function goDgnsPayCancel() {
    switchLoading();
    payCancelPopup = false;
    const jwt = localStorage.getItem("bizportal-access-token");
    const url = adminUrlAddr + "/v1/mpay/refund";
    let jsonStr = makeStr({ mpayId: dgnsPayId });
    const res = await postAPI(url, jsonStr, jwt);
    try {
      if (res.code !== 0) {
        payErrMsg = res.message;
        payCancelAlert = true;
      }
    } catch (error) {
      throw error;
    }
    await getDgnsInfo(dgnsId);
    switchLoading();
  }

  async function goDgnsPayComplete() {
    switchLoading();
    payCompletePopup = false;
    const jwt = localStorage.getItem("bizportal-access-token");
    const url = adminUrlAddr + "/v1/mpay/setPayComplete";
    let jsonStr = makeStr({ mpayId: dgnsPayId });
    await postAPI(url, jsonStr, jwt).then((res) => {
      if (res.code != 0) {
        console.log(res.resultVO.ErrorMsg);
        payErrMsg = res.resultVO.ErrorMsg;
        payCancelAlert = true;
      }
    });
    await getDgnsInfo(dgnsId);
    switchLoading();
  }

  function dgnsCancelPopup() {
    dgnsCnclRsnPopup = true;
  }
  async function dgnsCancel() {
    const requestBody = makeStr({ dgnsId, dgnsStat: "9", dgnsCnclRsn });
    const url = `${mobileUrlAddr}/v1/dgns/updateDgnsInfo`;

    try {
      const response = await postAPI(url, requestBody);
      if (response.resultVO === true) {
        updateUI(dgnsId);
        zalert = true;
      }
    } catch (error) {
      console.error("Error updating diagnosis status:", error);
    }
    dgnsCnclRsnPopup = false;
    dgnsStat = 0;
    await rsvGridSet();
  }
  async function requestPay() {
    const url = adminUrlAddr + "/v1/payinfo/requestPayAlarm";
    let jsonStr = makeStr({ mpayDgnsId: dgnsId, mpayPayAmt: dgnsPay });
    await postAPI(url, jsonStr).then((res) => {
      console.log(res);
    });
  }

  // 의사 목록 저장을 위한 변수들 추가
  let doctorList = [];

  // 의사 선택 시 처리하는 함수
  function handleDoctorSelect(event) {
    const selectedDtrName = event.target.value;
    selectedDoctor = doctorList.find(
      (doctor) => doctor.dtrName === selectedDtrName
    );

    if (selectedDoctor) {
      // 의사 정보 설정
      
      dgnsDtrName = selectedDoctor.dtrName;
      selectedDeptName = selectedDoctor.dtrDepts;

      // 진료구분 초기화 (새로운 의사 선택 시)
      selectedDgnsType = "";
    } else {
      // 의사 선택 해제 시 초기화
      selectedDoctor = null;
      selectedDgnsType = "";
    }
    getSelectedDtrItem(selectedDoctor.dtrId);
    getSelectedDtrDept(selectedDoctor.dtrId);
  }

  // 진료구분 변경 시 유효성 검사
  function handleDgnsTypeChange(event) {
    const newValue = event.target.value;

    if (newValue === "U" && selectedDoctor?.dtrCtlsYon !== "Y") {
      alert("선택하신 의사는 비대면 진료가 불가능합니다.");
      selectedDgnsType = "";
      return;
    }

    if (newValue === "V" && selectedDoctor?.dtrVstYon !== "Y") {
      alert("선택하신 의사는 대면 진료가 불가능합니다.");
      selectedDgnsType = "";
      return;
    }

    selectedDgnsType = newValue;
  }

  async function getDoctorListInfo() {
    try {
      const docInfoUrl =
        shopUrlAddr + "/v1/Shop/selectHospitalDoctorList?shpId=" + $susrShpId;
      const resData_docInfo = await getAPI(docInfoUrl);
      doctorList = resData_docInfo.resultVO;
    } catch (error) {
      console.error(error);
    }
  }

  async function openRcptPopup() {
    await getDoctorListInfo();
    isRcptPopupOpen = true;
  }
  
  $: if (receptionDate && selectedDoctor) {
    findDtrTime();
  }

  async function findDtrTime() {
    if (!selectedDoctor) return;

    const day = new Date(receptionDate);
    const dow = day.getDay();
    const formattedDay = changeDate(receptionDate); // yy-MM-dd

    const timeUrl =
      `${shopUrlAddr}/v1/Shop/uaDgnsDtrTm` +
      `?dtmeDtrId=${selectedDoctor.dtrId}` +
      `&htmeHsptId=${$susrShpId}` +
      `&htmeDay=${dow}` +
      `&dtmeDay=${formattedDay}`;

    const res = await getAPI(timeUrl);
    if (res.resultVO.length && res.resultVO[0].htmeType !== "vacation") {
      rghour = res.resultVO;
      hour = rghour[0].htmeFrom;
    } else if (res.resultVO[0]?.htmeType === "vacation") {
      hour = "vacation";
      rghour = [];
    } else {
      hour = "";
      rghour = [];
    }
  }

  // 선택의사 진료항목 조회
  async function getSelectedDtrItem(dtrId) {
    const itemurl =
      shopUrlAddr +
      "/v1/Shop/selectHsptDoctorItemList?dtrId=" +
      dtrId +
      "&shpId=" +
      $susrShpId;
    let resDtrItem = await getAPI(itemurl);
    selectedDtrItemList = resDtrItem.resultVO;
  }

  // 선택의사 진료과목 조회
  async function getSelectedDtrDept(dtrId) {
    const deptUrl =
      shopUrlAddr +
      "/v1/Shop/selectHsptDoctorDeptList?dtrId=" +
      dtrId +
      "&shpId=" +
      $susrShpId;
    let resDtrDept = await getAPI(deptUrl);
    selectedDtrDeptList = resDtrDept.resultVO;
  }

   // yyyy-MM-dd HH:mm:ss 포맷팅 헬퍼
  function formatDateTime(date) {
    const pad = n => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`
         + ` ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }

  //일치하는 가족 id 찾기
  function findWho(e) {
    if (e.fmlyId == who) {
      return true;
    }
  }

  async function doReg() {
    // 유효성 검사
    if (!selectedDoctor) {
      alert('의료진을 선택해주세요.');
      return;
    }
    if (!receptionDate || !selectedHour) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }
    if (!selectedDeptId || !selectedItemId) {
      alert('진료과와 진료항목을 모두 입력해주세요.');
      return;
    }


    const [startTime] = selectedHour.split('~').map(s => s.trim());
    const [hh, mm] = startTime.split(':').map(Number);

    const dt = new Date(receptionDate);
    dt.setHours(hh, mm, 0, 0);  
    const dateString = formatDateTime(dt);

    const requestBody = makeStr({
      dgnsShpId: $susrShpId,
      dgnsDtrId: selectedDoctor.dtrId,
      dgnsMemo: comment,
      dgnsRsvDttm: dateString,
      dgnsDeptId: selectedDeptId,
      dgnsItemId: selectedItemId,
      dgnsPatId: dgnsPatId,
      dgnsType: selectedDgnsType,
      dgnsMbrId: dgnsMbrId,
      dgnsWlkYon: "Y"
    });

    const jwt = localStorage.getItem('bizportal-access-token');
    try {
      
      const res = await postAPI(
        `${mobileUrlAddr}/v1/dgns/uaDgnsRgst`,
        requestBody,
        jwt
      );
      if (res.status === 1) {
        rcptSuccessPopup = true;
        rcptSuccessMessage = "진료 예약 완료 입니다. 새로고침하여 확인해주세요.";
      } else {
        rcptSuccessPopup = true;
        rcptSuccessMessage = `진료 예약 실패\n실패 사유 : ${res.message}`;
      }
    } catch (err) {
      console.error(err);
      alert('서버 통신 중 오류가 발생했습니다.');
    } finally {
      isRcptPopupOpen = false;
    }
  }

  async function settingFamList(mbrId){
    const familyUrl = /*urlAddr + "8083*/ authUrlAddr + "/v1/member/uaDgnsRgstW/"+mbrId;
    let resData = await getAPI(familyUrl);
    famList = resData.resultVO;
  }

  function setPatIdByName() {
    const found = famList.find(fam => fam.fmlyName == dgnsPatName);
    if (found) {
      dgnsPatId = found.fmlyId;
    } else {
      dgnsPatId = 0; // 이름이 일치하는 가족이 없으면 0으로 설정
    }
  }

  let fileInput

  function recipeUpdate() {
    if (dgnsId == 0 || dgnsId == "") {
      alert("선택된 진료가 없습니다.");
      return;
    }
    fileInput.click();
  }

/**
  * 파일을 Base64 데이터 URI 문자열로 변환하는 함수
  * @param {File} file 변환할 파일 객체
  * @returns {Promise<string>} Base64 인코딩된 문자열
  */
  function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

  async function changeFileSelect(e) {
    const file=e.target.files[0];
    console.log(file)

    if(dgnsId == 0 || dgnsId == "") {
      return;
    }

    if(!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image',file)
    formData.append('dgnsId',dgnsId)

    try {
      const result = await postAPI(mobileUrlAddr + '/v1/pspn/uploadPspn', jsonData)

      console.log(result)

    } catch(error) {
      alert('업로드 중 오류가 발생했습니다.');
      console.error('Fetch error:', error);
    }

  }

</script>

<div id="skipNavi">
  <a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a>
</div>

<section id="con">
  <!-- content S -->
  <div id="content">
    <h2 class="page_title">진료 예약 목록</h2>
    <div class="box_search" style="display: flex; align-items: center; gap: 10px;">
      <span>기간</span>

      <DateInput bind:value={date1} format={dateFormat} /> <span>~</span>
      <DateInput bind:value={date2} format={dateFormat} max={maxDate}/>

      &nbsp;
      <select bind:value={dgnsSearchType}>
        <option value="">전체</option>
        <option value="dgnsPatName">환자명</option>
        <option value="dgnsMbrName">회원명</option>
        <option value="dgnsDtrName">의료진</option>
      </select>
      <label><input type="text" bind:value={searchText}/></label>
      상태
      <select bind:value={dgnsStat}>
        <option value="">정상</option>
        <option value="9">취소</option>
      </select>
      <button type="button" class="mbtn_n_5" on:click={search}>검색</button>
    </div>

    <!-- 목록 S -->
    <div class="form_table list">
      <Grid {data} {columns} {style} {pagination} on:rowClick={setDgnsInfo} />
    </div>
    <!-- 목록 E -->

    <div class="form_table">
      <h3>진료정보</h3>
      {#if dgnsStatName != ""}
        <p class="ess_info">
          <button type="button" class="mbtn_n" on:click={openRcptPopup}
            >현장접수/예약</button
          >
          <button
            type="button"
            class="mbtn_n_9"
            on:click={() => dgnsCancelPopup()}>예약취소</button
          >
          {#if dgnsStatName == "접수전"}
            <button
              type="button"
              class="mbtn_n_4"
              on:click={() => changeDgnsStat(dgnsId, 3)}>예약확정</button
            >
          {/if}
          {#if dgnsStatName == "예약확정"}
            <button
              type="button"
              class="mbtn_n_A"
              on:click={() => changeDgnsStat(dgnsId, 5)}>진료시작</button
            >
          {/if}
          {#if dgnsStatName == "진료중"}
            <button
              type="button"
              class="mbtn_n_C"
              on:click={() => changeDgnsStat(dgnsId, 10)}>입장요청</button
            >
            <button type="button" class="mbtn_n_B" on:click={makeConf}
              >비대면 진료</button
            >
            <button
              type="button"
              class="mbtn_n_4"
              on:click={() => changeDgnsStat(dgnsId, 7)}>진료완료</button
            >
          {/if}
        </p>
      {/if}

      <table>
        <colgroup>
          <col style="width:12% ;" />
          <col style="width:38% ;" />
          <col style="width:12% ;" />
        </colgroup>
        <tr>
          <th>의 료 진</th>
          <td
            >{dgnsDtrName}<button type="button" class="mbtn_n">변경</button></td
          >
          <th>예약상태</th>
          <td>{dgnsStatName}</td>
        </tr>
        <tr>
          <th>진료일시</th>
          <td>{dgnsDttm}</td>
          <th>진료구분</th>
          <td>{dgnsTypeDesc}</td>
        </tr>
        <tr>
          <th>환 자 명</th>
          <td>{dgnsPatName}</td>
          <th>회 원 명</th>
          <td>{dgnsMbrName}</td>
        </tr>
        <tr>
          <th>진료과</th>
          <td>{dgnsDeptName}</td>
          <th>진료항목</th>
          <td>{dgnsItemName}</td>
        </tr>
        <tr>
          <th>메모</th>
          <td colspan="3"> {dgnsMemo} </td>
        </tr>
      </table>
    </div>

    <div class="form_table">
      <h3>결제정보</h3>
      <p class="ess_info">
        <!-- <button type="button" class="mbtn_b dgns" data-url="/drst/awPspnDtl">처방전</button> -->
        <!-- onclick="onPspn()">처방전</button> -->
        <!--        <button type="button" class="mbtn_b" data-url="JavaScript:onNotify()">알림</button>-->

        <input type="file" bind:this={fileInput} accept="image/*" style="width: 0; height: 0; position: absolute; overflow: hidden; opacity: 0;" on:change={changeFileSelect} />
        <button type="button" class="mbtn_b" on:click={recipeUpdate}>처방전 업로드</button>

        {#if dgnsPayStat != 5 && dgnsStat == 7}
          <button type="button" class="mbtn_b" on:click={requestPay}
            >결제요청</button
          >
        {/if}
        <button
          type="button"
          class="mbtn_b"
          on:click={() => (payCompletePopup = true)}>결제완료</button
        >
        <button
          type="button"
          class="mbtn_b"
          on:click={() => (payCancelPopup = true)}>결제취소</button
        >
      </p>
      <table>
        <colgroup>
          <col style="width:12% ;" />
          <col style="width:38% ;" />
          <col style="width:12% ;" />
          <col style="width:38% ;" />
        </colgroup>
        <tr>
          <th>결제금액</th>
          <td>{dgnsPay}</td>
          <th>결제구분</th>
          <td>{dgnsPayType}</td>
        </tr>
        <tr>
          <th>결제일시</th>
          <td>{dgnsPayDttm}</td>
          <th>결제상태</th>
          <td>{dgnsPayStatDesc}</td>
        </tr>
      </table>
    </div>
    <!-- content E -->
    <Footer />
  </div>
</section>

{#if zalert}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">상태가 변경되었습니다</div>
      <div class="btn_wrap">
        <button class="btn_02" on:click={xButton}>목록으로 돌아가기</button>
      </div>
    </div>
  </section>
{/if}

{#if dgnsCnclRsnPopup}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">예약취소 사유를 입력해주세요</div>
      <label
        ><input
          type="text"
          name=""
          id=""
          style="width: 1000px;"
          bind:value={dgnsCnclRsn}
        /></label
      >
      <div class="btn_wrap">
        <button class="btn_02" on:click={() => dgnsCancel()}>입력완료</button>
        <button class="btn_03" on:click={() => (dgnsCnclRsnPopup = false)}
          >취소</button
        >
      </div>
    </div>
  </section>
{/if}

<!-- 결제완료 팝업 -->
{#if payCompletePopup}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        {#if dgnsStat == ""}
          <div>진료를 선택해주세요.</div>
        {:else if dgnsStat == 9}
          <div>취소된 진료입니다.</div>
        {:else if dgnsStat == 7}
          {#if dgnsPayStat == ""}
            <div>진료를 선택해주세요.</div>
          {:else if dgnsPayStat == 5}
            <div>이미 결제 완료 된 진료입니다.</div>
          {:else}
            <div>결제완료 처리하시겠습니까?</div>
          {/if}
        {:else}
          <div>진료완료 상태가 아닙니다.</div>
        {/if}
      </div>
      <div class="btn_wrap">
        {#if dgnsStat == 7}
          {#if dgnsPayStat != 5}
            <button class="btn_02" on:click={() => goDgnsPayComplete()}
              >예</button
            >
            <button class="btn_03" on:click={() => (payCompletePopup = false)}
              >아니오</button
            >
          {:else}
            <button class="btn_02" on:click={() => (payCompletePopup = false)}
              >확인</button
            >
          {/if}
        {:else}
          <button class="btn_02" on:click={() => (payCompletePopup = false)}
            >확인</button
          >
        {/if}
      </div>
    </div>
  </section>
{/if}

<!-- 결제취소 팝업 -->
{#if payCancelPopup}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        {#if dgnsPayStat == ""}
          <div>진료를 선택해주세요.</div>
        {:else if dgnsPayStat == 5}
          <div>결제취소 하시겠습니까?</div>
        {:else}
          <div>결제완료 상태가 아닙니다.</div>
        {/if}
      </div>
      <div class="btn_wrap">
        {#if dgnsPayStat == 5}
          <button class="btn_02" on:click={() => goDgnsPayCancel()}>예</button>
          <button class="btn_03" on:click={() => (payCancelPopup = false)}
            >아니오</button
          >
        {:else}
          <button class="btn_02" on:click={() => (payCancelPopup = false)}
            >확인</button
          >
        {/if}
      </div>
    </div>
  </section>
{/if}

<!-- 결제취소 실패 팝업 -->
{#if payCancelAlert}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        <span>거래취소 실패하였습니다.</span>
        <div>Message: {payErrMsg}</div>
      </div>
      <div class="btn_wrap">
        <button class="btn_02" on:click={() => (payCancelAlert = false)}
          >확인</button
        >
      </div>
    </div>
  </section>
{/if}

<!-- 원격 진료 위해 진료 상태 변경 알람 -->
{#if dgnsStatAlert}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        원격 진료를 시작하기 위해 <br /> 진료시작으로 변경해주세요
      </div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            dgnsStatAlert = false;
          }}>목록으로 돌아가기</button
        >
      </div>
    </div>
  </section>
{/if}

<!-- 현장 접수/예약 팝업 -->
{#if isRcptPopupOpen}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="form_table">
        <table>
          <colgroup>
            <col style="width:10%;" />
            <col style="width:20%;" />
            <col style="width:10%;" />
            <col style="width:20%;" />
          </colgroup>
          <tr>
            <th>의료진</th>
            <td>
              <select on:change={handleDoctorSelect}>
                <option value="">의료진 선택</option>
                {#each doctorList as doctor}
                  <option value={doctor.dtrName}>
                    {doctor.dtrName}
                  </option>
                {/each}
              </select>
            </td>
            <th>접수일시</th>
            <td style="display: flex; align-items: center;">
              <DateInput
                bind:value={receptionDate}
                format="yy-MM-dd"
                on:input={() => findDtrTime()}
                min={new Date()}
              />
              <select
                bind:value={selectedHour}
                disabled={hour === "vacation" || !rghour.length || !selectedDoctor}
              >
                <option value="">시간 선택</option>
                {#each rghour as time}
                  <option value={time.htmeFrom}
                    >{time.htmeFrom} ~ {time.htmeTo}</option
                  >
                {/each}
              </select>
            </td>
          </tr>
          <tr>
            <th>진료구분</th>
            <td>
              <select
                bind:value={selectedDgnsType}
                on:change={handleDgnsTypeChange}
                disabled={!selectedDoctor}
              >
                <option value="">선택하세요</option>
                {#if selectedDoctor}
                  {#if selectedDoctor.dtrVstYon === "Y"}
                    <option value="V">대면</option>
                  {/if}
                  {#if selectedDoctor.dtrCtlsYon === "Y"}
                    <option value="U">비대면</option>
                  {/if}
                  {#if selectedDoctor.dtrVstYon !== "Y" && selectedDoctor.dtrCtlsYon !== "Y"}
                    <option value="" disabled>진료 불가능한 의사입니다</option>
                  {/if}
                {/if}
              </select>
            </td>
            <th>진료과</th>
            <td>
              <select disabled={!selectedDoctor} bind:value={selectedDeptId}>
                <option value="">진료과 선택</option>
                {#each selectedDtrDeptList as deptList}
                  <option value={deptList.deptId}>{deptList.deptName}</option>
                {/each}
              </select>
            </td>
          </tr>
          <tr>
            <th>회원명</th>
            <td>{dgnsMbrName}</td>
            <th>진료항목</th>
            <td>
              <select disabled={!selectedDoctor} bind:value={selectedItemId}>
                <option value="">진료항목선택</option>
                {#each selectedDtrItemList as itemList}
                  <option value={itemList.itemId}>{itemList.itemName}</option>
                {/each}
              </select>
            </td>
          </tr>
          <tr>
            <th>환자명</th>
            <td>{dgnsPatName}</td>
            <th>관계</th>
            <td>{dgnsPatType}</td>
          </tr>
          <tr>
            <th>진료 사유</th>
            <td colspan="3">
              <div class="input_box_no" style="height:120px;">
                <textarea placeholder="진료 사유 작성" bind:value={comment} style="height:100%"/>
              </div>
            </td>
          </tr>
          <tr> </tr>
        </table>
      </div>
      <div class="btn_wrap" style="margin-top: 20px;">
        <button class="btn_02" on:click={doReg}
          >예약하기</button
        >
        <button class="btn_03" on:click={() => (isRcptPopupOpen = false)}
          >취소</button
        >
      </div>
    </div>
  </section>
{/if}

<!-- 진료예약 완료 여부 확인 팝업 -->
{#if rcptSuccessPopup}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
          {rcptSuccessMessage}
      </div>
      <div class="btn_wrap">
          <button class="btn_02" on:click={() => (rcptSuccessPopup = false)}>확인</button>
      </div>
    </div>
  </section>
{/if}

<!-- PageLoader -->
{#if isLoading}
  <PageLoader />
{/if}
