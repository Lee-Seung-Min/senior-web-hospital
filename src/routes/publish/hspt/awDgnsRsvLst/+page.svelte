<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { getUserId } from "$lib/js/getUserId";
  import { isLogin } from "$lib/store/loginStore";
  import { getAPI } from "$lib/js/getAPI";
  import { updateRefresh } from "$lib/js/updateRefresh";
  import { DateInput } from "date-picker-svelte";
  import { onDestroy, onMount } from "svelte";
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
  import { h } from "@fullcalendar/core/preact";
  import { URL as LibURL } from "$lib/URL";
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);

  const pagination = {
    enabled: true,
    limit: 5, // 한 페이지에 5개의 행을 표시
    // 서버 사이드 페이징을 사용하는 경우 추가 옵션을 설정할 수 있음
  };
  const style = {
    table: {
      width: "100%",
      // border: "3px solid #ccc",
    },
    th: {
      "background-color": "rgb(255, 255, 255)",
      color: "#000",
      // "border-bottom": "2px solid #ccc",
      "text-align": "center",
    },
    td: {
      "text-align": "center",
    },
  };
  const language = {
    pagination: {
      previous: "<",
      next: ">",
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
    {
      name: "진료상태",
      formatter: (value) => {
        switch (value.replaceAll(" ", "")) {
          case "예약확정":
            return h("span", { class: "status-confirmed" }, "예약 확정");
          case "진료완료":
            return h("span", { class: "status-completed" }, "진료 완료");
          case "접수전":
            return h("span", { class: "status-ready" }, "접수 전");
          case "예약취소":
            return h("span", { class: "status-cancel" }, "예약 취소");
          case "취소":
            return h("span", { class: "status-cancel" }, "취소");
          case "진료중":
            return h("span", { class: "status-run" }, "진료 중");
        }
      },
    },
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
  //진료 완료 팝업
  let dgnsCompletePopup = false;
  //결제 금액 입력
  let dgnsCompleteAmt = "";

  $: {
    if (date1 && date2) {
      const start = new Date(date1);
      const end = new Date(date2);

      if (start > end) {
        alert('종시작일은 종료일보다 늦을 수 없습니다. 종료일이 자동으로 수정되었습니다.');
        date2 = date1;
      }
    }
  }

  let dgnsSearchType = "dgnsPatName";
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
  let rcptSuccessMessage = "";

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
      const mod = await import("chart.js/auto");
      ChartCtor = mod.default;

      applyPreset("3m"); // 기본 최근 3개월
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
      goto(LibURL.awLogin);
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
        ],
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
    dgnsStat = "";
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
    dgnsStat = "";
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
      (doctor) => doctor.dtrName === selectedDtrName,
    );

    if (selectedDoctor) {
      // 의사 정보 설정

      dgnsDtrName = selectedDoctor.dtrName;
      selectedDeptName = selectedDoctor.dtrDepts;

      // 진료구분 초기화 (새로운 의사 선택 시)
      selectedDgnsType = "";
      // 선택된 의사일 때만 조회
      getSelectedDtrItem(selectedDoctor.dtrId);
      getSelectedDtrDept(selectedDoctor.dtrId);
    } else {
      // 의사 선택 해제 시 초기화
      dgnsDtrName = "";
      selectedDeptName = "";
      selectedDoctor = null;
      selectedDgnsType = "";
      selectedDtrItemList = [];
      selectedDtrDeptList = [];
    }
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
    const pad = (n) => String(n).padStart(2, "0");
    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
      ` ${pad(date.getHours())}:${pad(date.getMinutes())}:00`
    );
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
      alert("의료진을 선택해주세요.");
      return;
    }
    if (!receptionDate || !selectedHour) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }
    if (!selectedDeptId || !selectedItemId) {
      alert("진료과와 진료항목을 모두 입력해주세요.");
      return;
    }

    const [startTime] = selectedHour.split("~").map((s) => s.trim());
    const [hh, mm] = startTime.split(":").map(Number);

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
      dgnsWlkYon: "Y",
    });

    const jwt = localStorage.getItem("bizportal-access-token");
    try {
      const res = await postAPI(
        `${mobileUrlAddr}/v1/dgns/uaDgnsRgst`,
        requestBody,
        jwt,
      );
      if (res.status === 1) {
        rcptSuccessPopup = true;
        rcptSuccessMessage =
          "진료 예약 완료 입니다. 새로고침하여 확인해주세요.";
      } else {
        rcptSuccessPopup = true;
        rcptSuccessMessage = `진료 예약 실패\n실패 사유 : ${res.message}`;
      }
    } catch (err) {
      console.error(err);
      alert("서버 통신 중 오류가 발생했습니다.");
    } finally {
      isRcptPopupOpen = false;
    }
  }

  async function settingFamList(mbrId) {
    try {
      const familyUrl =
        /*urlAddr + "8083*/ authUrlAddr + "/v1/member/uaDgnsRgstW/" + mbrId;
      const resData = await getAPI(familyUrl);
      famList = Array.isArray(resData?.resultVO) ? resData.resultVO : [];
      console.log("famList", famList);
    } catch (e) {
      console.error("Error fetching family list:", e);
      famList = [];
    }
  }

  function setPatIdByName() {
    // famList 또는 이름이 없을 때 안전 처리
    if (!dgnsPatName || !Array.isArray(famList) || famList.length === 0) {
      dgnsPatId = 0;
      return;
    }
    const found = famList.find((fam) => fam?.fmlyName === dgnsPatName);
    dgnsPatId = found?.fmlyId ?? 0; // 이름이 일치하는 가족이 없으면 0으로 설정
  }

  let fileInput;

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
      reader.onerror = (error) => reject(error);
    });
  }

  async function changeFileSelect(e) {
    const file = e.target.files[0];
    console.log(file);

    if (dgnsId == 0 || dgnsId == "") {
      return;
    }

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image',file)
    formData.append('dgnsId',dgnsId)

    console.log(dgnsId)

    try {
      const response = await fetch(mobileUrlAddr + '/v1/pspn/uploadPspn',{
        method:'POST',
        body: formData,
        headers: {
          "bizportal-access-token": localStorage.getItem("bizportal-access-token")
        }
      })


      const data = await response.json();
      alert('업로드 되었습니다.')


    } catch(error) {
      alert('업로드 중 오류가 발생했습니다.');
      console.error('Fetch error:', error);
    }

  }

  let imageUrl = ""
  let isImage = false

  function closeImage() {
    isImage = false
  }

  async function getImage() {
    if(dgnsId == 0 || dgnsId == "") {
      return;
    }

    try {
      const response = await fetch(mobileUrlAddr + '/v1/pspn/getPspnImg?id='+dgnsId + '&isDgnsId=true',{
        headers: {
          "bizportal-access-token": localStorage.getItem("bizportal-access-token")
        }
      })

      if(!response.ok) {
        throw new Error(`이미지를 불러오는 데 실패했습니다: ${response.statusText}`)
      }

      const imageBlob = await response.blob()

      imageUrl = URL.createObjectURL(imageBlob)

      isImage = true
      console.log(imageUrl)

    } catch(error) {
      console.error(error)
    }
  }

   async function confirmDgnsComplete() {
    if (!dgnsCompleteAmt || isNaN(dgnsCompleteAmt) || Number(dgnsCompleteAmt) < 0) {
      alert("유효한 결제 금액을 입력해주세요.");
      return;
    }
    
    // 결제 금액 업데이트
    const requestBody = makeStr({ 
      dgnsId,
      dgnsStat: "7",
      dgnsPay: Number(dgnsCompleteAmt),
      dgnsFee: "1000",
      dgnsVat: "2"
    });
    const url = `${mobileUrlAddr}/v1/dgns/updateDgnsInfo`;
    
    try {
      await postAPI(url, requestBody);
    } catch (error) {
      console.error("Error updating payment amount:", error);
    }
    dgnsCompletePopup = false;
    dgnsCompleteAmt = "";
    window.location.reload();
  }


  onDestroy(() => {
    if(imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }
  })

  // ===== 건강지표 차트 영역 =====

  let vitalType = "BP";           // 현재 선택 탭
  let vitalPreset = "3m";         // 최근 3개월
  let vitalStart = new Date();    // 시작일
  let vitalEnd = new Date();      // 종료일
  let vitalCanvas;                // canvas ref
  let vitalChart;                 // Chart.js instance
  let ChartCtor;                  // Chart constructor (SSR 안전용)
  let vitalLoading = false;
  let vitalError = "";
  let vitalData = [];             // [{ date:'YYYY-MM-DD', value: 123 }]
  let bpMeta = []; // [{ stat, dttm, sbp, dbp, puls }...]


  const vitalConfig = {
     BP: {
      label: "혈압",
      yTitle: "혈압 (mmHg)",

      // fetch가 반환하는 형태를 renderVitalChart가 그대로 사용
      fetch: async ({ mbrId, dateFrom, dateTo }) => {
        const res = await fetchBP(mbrId, dateFrom, dateTo);
        console.log("vitalConfig's bpList : ", res.bpList);
        const list = Array.isArray(res?.bpList) ? res.bpList : [];

        //날짜 오름차순 정렬
        const sorted = [...list].sort((a, b) =>
          String(a.mbpChkDttm).localeCompare(String(b.mbpChkDttm))
        );

        // 같은 시각 데이터 중복 제거(같은 mbpChkDttm이 2개 이상이면 마지막 값만 유지)
        const uniqMap = new Map();
        for (const r of sorted) uniqMap.set(r.mbpChkDttm, r);
        const uniq = Array.from(uniqMap.values()).sort((a, b) =>
          String(a.mbpChkDttm).localeCompare(String(b.mbpChkDttm))
        );

        // 라벨/데이터 만들기
        const labels = uniq.map(r => toYYMMDDFromDttm(r.mbpChkDttm));
        const sbp = uniq.map(r => Number(r.mbpSbp));
        const dbp = uniq.map(r => Number(r.mbpDbp));

        // 4) 툴팁용 메타 저장 (인덱스로 접근)
        bpMeta = uniq.map(r => ({
          dttm: r.mbpChkDttm,
          stat: r.mbpStat,
          sbp: Number(r.mbpSbp),
          dbp: Number(r.mbpDbp),
        }));

        return {
          labels,
          datasets: [
            { label: "수축기", data: sbp, yAxisID: "y" },
            { label: "이완기", data: dbp, yAxisID: "y" }
          ],
          useSecondAxis: false
        };
      }
    },

    BS: {
      label: "혈당",
      yTitle: "혈당 (mg/dL)",
      fetch: async ({ mbrId, dateFrom, dateTo }) => {
        const res = await fetchBS(mbrId, dateFrom, dateTo);
        const list = Array.isArray(res?.slvlList) ? res.slvlList : [];

        // 1) 시간 오름차순 정렬 (마지막 값 로직을 위해)
        const sorted = [...list].sort((a, b) =>
          String(a.slvlChkDttm).localeCompare(String(b.slvlChkDttm))
        );

        // 2) 날짜별로 그룹핑: date -> { A?: number, B?: number }
        //    같은 날짜에 여러 건이 있으면 "정렬된 순서에서 마지막 값"이 남도록 덮어쓰기
        const dayMap = new Map(); // "YYYY-MM-DD" -> { A?: number, B?: number }
        for (const r of sorted) {
          const day = String(r.slvlChkDttm).slice(0, 10); // "YYYY-MM-DD"
          const boa = r.slvlMealBoa; // A(식후), B(식전)
          const val = Number(r.slvlData);

          const obj = dayMap.get(day) ?? {};
          obj[boa] = val;  // 같은 날짜/boa면 마지막 값으로 덮어씀
          dayMap.set(day, obj);
        }

        // 3) 날짜 합집합 labels
        const days = Array.from(dayMap.keys()).sort((a, b) => String(a).localeCompare(String(b)));

        // labels는 BP처럼 MM/DD로(원하면 YYYY-MM-DD로 바꿔도 됨)
        const labels = days.map(d => {
          // d = "YYYY-MM-DD"
          const m = d.slice(5, 7);
          const dd = d.slice(8, 10);
          return `${m}/${dd}`;
        });

        // 4) 식전/식후 데이터(없는 날은 null)
        const preMeal  = days.map(d => dayMap.get(d)?.B ?? null); // 식전(B)
        const postMeal = days.map(d => dayMap.get(d)?.A ?? null); // 식후(A)

        // 5) 한쪽만 있는 경우도 있으니 "있는 라인만" 그리기
        const datasets = [];
        if (preMeal.some(v => v !== null)) {
          datasets.push({ label: "식전 혈당", data: preMeal, yAxisID: "y" });
        }
        if (postMeal.some(v => v !== null)) {
          datasets.push({ label: "식후 혈당", data: postMeal, yAxisID: "y" });
        }

        return {
          labels,
          datasets,
          useSecondAxis: false
        };
      }
    },


    BMI: {
      label: "BMI / 체중",
      yTitle: "BMI (kg/㎡)",
      fetch: async ({ mbrId, dateFrom, dateTo }) => {
        const res = await fetchWGT(mbrId, dateFrom, dateTo);
        const list = Array.isArray(res?.wgtList) ? res.wgtList : [];

        // 1) 시간 오름차순 정렬
        const sorted = [...list].sort((a, b) =>
          String(a.wgtChkDttm).localeCompare(String(b.wgtChkDttm))
        );

        // 2) 날짜별로 마지막 값만 남기기: "YYYY-MM-DD" -> record
        const dayMap = new Map(); // day -> { wgtData, wgtBmi, ... }
        for (const r of sorted) {
          const day = String(r.wgtChkDttm).slice(0, 10); // "YYYY-MM-DD"
          dayMap.set(day, r); // 같은 날짜면 마지막 값으로 덮어씀
        }

        // 3) 날짜 라벨(합집합)
        const days = Array.from(dayMap.keys()).sort((a, b) => String(a).localeCompare(String(b)));

        const labels = days.map(d => `${d.slice(5, 7)}/${d.slice(8, 10)}`); // MM/DD

        // 4) 데이터 만들기 (없는 경우 대비해서 null)
        const bmiData = days.map(d => {
          const r = dayMap.get(d);
          const v = r?.wgtBmi;
          return v === undefined || v === null || v === "" ? null : Number(v);
        });

        const weightData = days.map(d => {
          const r = dayMap.get(d);
          const v = r?.wgtData;
          return v === undefined || v === null || v === "" ? null : Number(v);
        });

        // 5) 한쪽만 있는 경우도 있으니 있는 것만 그리기
        const datasets = [];
        if (bmiData.some(v => v !== null)) {
          datasets.push({ label: "BMI", data: bmiData, yAxisID: "y" });
        }
        if (weightData.some(v => v !== null)) {
          datasets.push({ label: "체중", data: weightData, yAxisID: "y2" });
        }

        return {
          labels,
          datasets,
          useSecondAxis: true
        };
      }
    },

    OXYGEN: {
      label: "산소포화도",
      yTitle: "산소포화도 (%)",
      fetch: async ({ mbrId, dateFrom, dateTo }) => {
        const res = await fetchOXYGEN(mbrId, dateFrom, dateTo);
        const list = Array.isArray(res?.oxygenList) ? res.oxygenList : [];

        // 1) 시간 오름차순 정렬 (마지막 값 로직을 위해)
        const sorted = [...list].sort((a, b) =>
          String(a.oxyChkDttm).localeCompare(String(b.oxyChkDttm))
        );

        // 2) 날짜별로 마지막 값만 남기기 (같은 날짜에 여러건이면 마지막 측정값)
        const dayMap = new Map(); // "YYYY-MM-DD" -> record
        for (const r of sorted) {
          const day = String(r.oxyChkDttm).slice(0, 10);
          dayMap.set(day, r);
        }

        // 3) 날짜 합집합 labels
        const days = Array.from(dayMap.keys()).sort((a, b) =>
          String(a).localeCompare(String(b))
        );

        const labels = days.map((d) => `${d.slice(5, 7)}/${d.slice(8, 10)}`);

        // 4) 값 (없는 날은 null)
        const oxyData = days.map((d) => {
          const r = dayMap.get(d);
          const v = r?.oxyData;
          return v === undefined || v === null || v === "" ? null : Number(v);
        });

        return {
          labels,
          datasets: [{ label: "산소포화도", data: oxyData, yAxisID: "y" }],
          useSecondAxis: false
        };
      }
    },

    TEMP: {
      label: "체온",
      yTitle: "체온 (°C)",
      fetch: async ({ mbrId, dateFrom, dateTo }) => {
        const res = await fetchTMPR(mbrId, dateFrom, dateTo);
        const list = Array.isArray(res?.tmprList) ? res.tmprList : [];

        // 1) 시간 오름차순 정렬 (마지막 값 로직을 위해)
        const sorted = [...list].sort((a, b) =>
          String(a.tmprChkDttm).localeCompare(String(b.tmprChkDttm))
        );

        // 2) 날짜별 마지막 값만 남기기
        const dayMap = new Map(); // "YYYY-MM-DD" -> record
        for (const r of sorted) {
          const day = String(r.tmprChkDttm).slice(0, 10);
          dayMap.set(day, r);
        }

        // 3) 날짜 라벨 (MM/DD)
        const days = Array.from(dayMap.keys()).sort((a, b) =>
          String(a).localeCompare(String(b))
        );
        const labels = days.map((d) => `${d.slice(5, 7)}/${d.slice(8, 10)}`);

        // 4) 값 배열 (없는 날은 null)
        const tempData = days.map((d) => {
          const r = dayMap.get(d);
          const v = r?.tmprData;
          return v === undefined || v === null || v === "" ? null : Number(v);
        });

        return {
          labels,
          datasets: [{ label: "체온", data: tempData, yAxisID: "y" }],
          useSecondAxis: false
        };
      }
    },
  };


  function toYmd(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function applyPreset(preset) {
    vitalPreset = preset;
    const end = new Date();
    const start = new Date(end);

    if (preset === "1w") start.setDate(end.getDate() - 7);
    if (preset === "1m") start.setMonth(end.getMonth() - 1);
    if (preset === "3m") start.setMonth(end.getMonth() - 3);
    if (preset === "6m") start.setMonth(end.getMonth() - 6);

    vitalStart = start;
    vitalEnd = end;
  }

  async function loadVitalData() {
    if (!dgnsMbrId) return;

    const cfg = vitalConfig[vitalType];
    if (!cfg) return;

    vitalLoading = true;
    vitalError = "";

    try {
      const dateFrom = toYmd(vitalStart);
      const dateTo = toYmd(vitalEnd);

      const chartPayload = await cfg.fetch({
        mbrId: dgnsMbrId,
        dateFrom,
        dateTo
      });

      // 데이터가 비어있으면 이전 그래프 제거
      if (!chartPayload?.labels?.length) {
        clearVitalChart();
        vitalError = "표시할 데이터가 없습니다.";
        return;
      }

      renderVitalChart(cfg, chartPayload);
    } catch (e) {
      console.error(e);

      // 에러면 이전 그래프 제거
      clearVitalChart();
      vitalError = "차트 데이터를 불러오지 못했습니다.";
    } finally {
      vitalLoading = false;
    }
  }



 function renderVitalChart(cfg, payload) {
    if (!ChartCtor || !vitalCanvas) return;

    const { labels, datasets, useSecondAxis } = payload;

    const chartData = {
      labels,
      datasets: datasets.map(ds => ({
        ...ds,
        spanGaps: ds.spanGaps ?? true, // 데이터값이 null인경우이거나 값이 없는 경우 자연스럽게 이어붙이기
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 3,
        fill: false
      }))
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } }, // 혈압은 2줄이라 legend 켜는게 좋아요
      scales: {
        x: { grid: { display: false } },
        y: {
          title: { display: true, text: cfg.yTitle },
          grid: { borderDash: [4, 4] }
        }
      }
    };

    // BMI처럼 몸무게를 두번째 축(y2)로 쓰는 경우
    if (useSecondAxis) {
      options.scales.y2 = {
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "몸무게 (kg)" }
      };
    }

    if (vitalChart) {
      vitalChart.data = chartData;
      vitalChart.options = options;
      vitalChart.update();
      return;
    }

    const ctx = vitalCanvas.getContext("2d");
    vitalChart = new ChartCtor(ctx, {
      type: "line",
      data: chartData,
      options
    });
  }


  // 선택 환자(dgnsPatId)가 바뀌면 자동 조회 (예약 row 클릭할 때마다 갱신)
  let _lastMbrId = "";
  $: if (ChartCtor && dgnsMbrId && dgnsMbrId !== _lastMbrId) {
    _lastMbrId = dgnsMbrId;
    loadVitalData();
  }

  // 날짜 유효성(시작 > 종료 방지)
  $: {
    if (vitalStart && vitalEnd) {
      const s = new Date(vitalStart);
      const e = new Date(vitalEnd);
      if (s > e) vitalEnd = vitalStart;
    }
  }
  
  //혈압 조회
  async function fetchBP(mbrId, dateFrom, dateTo) {
    const url = `${mobileUrlAddr}/v1/Shop/member/health/bp?mbrId=${mbrId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return await getAPI(url);
  }

  //혈당 조회
  async function fetchBS(mbrId, dateFrom, dateTo) {
    const url = `${mobileUrlAddr}/v1/Shop/member/health/slvl?mbrId=${mbrId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return await getAPI(url);
  }

  //BMI&체중 조회
  async function fetchWGT(mbrId, dateFrom, dateTo) {
    const url = `${mobileUrlAddr}/v1/Shop/member/health/wgt?mbrId=${mbrId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return await getAPI(url);
  }

  //체온 조회
  async function fetchTMPR(mbrId, dateFrom, dateTo) {
    const url = `${mobileUrlAddr}/v1/Shop/member/health/tmpr?mbrId=${mbrId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return await getAPI(url);
  }

  //산소포화도
  async function fetchOXYGEN(mbrId, dateFrom, dateTo) {
    const url = `${mobileUrlAddr}/v1/Shop/member/health/oxygen?mbrId=${mbrId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return await getAPI(url);
  }

  function toYYMMDDFromDttm(dttm) {
    // dttm: "YYYY-MM-DD HH:mm" -> "MM/DD"
    const m = dttm.slice(5, 7);
    const d = dttm.slice(8, 10);
    return `${m}/${d}`;
  }

  function clearVitalChart() {
    if (vitalChart) {
      vitalChart.destroy();
      vitalChart = null;
    }

    // destroy 후에도 픽셀이 남는 경우 대비(안전)
    if (vitalCanvas) {
      const ctx = vitalCanvas.getContext("2d");
      ctx.clearRect(0, 0, vitalCanvas.width, vitalCanvas.height);
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
    <div class="list-set form_table">
      <span>진료 예약 목록</span>
      <div
        class="box_search"
        style="display: flex; align-items: center; gap: 10px;"
      >
        <span>기간</span>

        <DateInput bind:value={date1} format={dateFormat} /> <span>~</span>
        <DateInput bind:value={date2} format={dateFormat} max={maxDate}/>
     
        &nbsp;
        <select bind:value={dgnsSearchType}>
          <option value="dgnsPatName">환자명</option>
          <option value="dgnsMbrName">회원명</option>
          <option value="dgnsDtrName">의료진</option>
        </select>
        <label><input type="text" bind:value={searchText} /></label>
        상태
        <select bind:value={dgnsStat}>
          <option value="">정상</option>
          <option value="9">취소</option>
        </select>
        <button
          type="button"
          class="mbtn_n_5 ibtn-search btn-lg"
          on:click={search}>검색</button
        >
      </div>

      <!-- 목록 S -->
      <div class="form_table list">
        <Grid
          {data}
          {columns}
          {style}
          {pagination}
          {language}
          on:rowClick={setDgnsInfo}
        />
      </div>
      {#if dgnsStatName != ""}
      <div class="rsv-actions">
        <button type="button" class="mbtn_n btn-lg" on:click={openRcptPopup}>
          현장접수/예약
        </button>

        <button
          type="button"
          class="mbtn_n_9 btn-lg ibtn-cancel"
          on:click={() => dgnsCancelPopup()}
        >
          예약취소
        </button>

        {#if dgnsStatName == "접수전"}
          <button
            type="button"
            class="mbtn_n_B btn-lg ibtn-remote"
            on:click={makeConf}
          >
            본인 확인
          </button>

          <button
            type="button"
            class="mbtn_n_4 btn-lg ibtn-check"
            on:click={() => changeDgnsStat(dgnsId, 3)}
          >
            예약확정
          </button>
        {/if}

        {#if dgnsStatName == "예약확정"}
          <button
            type="button"
            class="mbtn_n_A btn-lg ibtn-start"
            on:click={() => changeDgnsStat(dgnsId, 5)}
          >
            진료시작
          </button>
        {/if}

        {#if dgnsStatName == "진료중"}
          <button
            type="button"
            class="mbtn_n_C btn-lg ibtn-enter"
            on:click={() => changeDgnsStat(dgnsId, 10)}
          >
            입장요청
          </button>

          <button
            type="button"
            class="mbtn_n_B btn-lg ibtn-remote"
            on:click={makeConf}
          >
            비대면 진료
          </button>

          <button
            type="button"
            class="mbtn_n_4 btn-lg ibtn-complete"
            on:click={() => (dgnsCompletePopup = true)}
          >
            진료완료
          </button>
        {/if}
      </div>
      {/if}
      
    </div>

    <div class="form_table">
      <span>결제정보</span>
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
      <p class="ess_info">
        <!-- <button type="button" class="mbtn_b dgns" data-url="/drst/awPspnDtl">처방전</button> -->
        <!-- onclick="onPspn()">처방전</button> -->
        <!--        <button type="button" class="mbtn_b" data-url="JavaScript:onNotify()">알림</button>-->
        
        <button type="button" class="mbtn_b btn-lg" on:click={getImage}>처방전 보기</button>

        <input type="file" bind:this={fileInput} accept="image/*" style="width: 0; height: 0; position: absolute; overflow: hidden; opacity: 0;" on:change={changeFileSelect} />
        <button type="button" class="mbtn_b btn-lg" on:click={recipeUpdate}>처방전 업로드</button>

        {#if dgnsPayStat != 5 && dgnsStat == 7}
          <button type="button" class="mbtn_b btn-lg" on:click={requestPay}
            >결제요청</button
          >
        {/if}
        <button
          type="button"
          class="mbtn_b btn-lg"
          on:click={() => (payCompletePopup = true)}>결제완료</button
        >
        <button
          type="button"
          class="mbtn_b btn-lg"
          on:click={() => (payCancelPopup = true)}>결제취소</button
        >
      </p>
    </div>
    
    <!-- 건강지표 차트 -->
    <div class="vital-card">
      <div class="vital-top">
        <div class="vital-tabs">
          {#each Object.keys(vitalConfig) as key}
            <button
              type="button"
              class="vital-tab"
              class:active={vitalType === key}
              on:click={() => {
                vitalType = key;
                loadVitalData();
              }}
            >
              {vitalConfig[key].label}
            </button>
          {/each}
        </div>
        

        <div class="vital-controls">
          <select
            class="vital-select"
            bind:value={vitalPreset}
            on:change={(e) => {
              applyPreset(e.currentTarget.value);
              loadVitalData();
            }}
          >
            <option value="1w">최근 1주일</option>
            <option value="1m">최근 1개월</option>
            <option value="3m">최근 3개월</option>
            <option value="6m">최근 6개월</option>
          </select>

          <div class="vital-dates">
            <DateInput bind:value={vitalStart} format="yy-MM-dd" />
            <span class="vital-dash">~</span>
            <DateInput bind:value={vitalEnd} format="yy-MM-dd" />
          </div>

          <button type="button" class="vital-btn" on:click={loadVitalData}>조회</button>
        </div>
      </div>
      <div class="vital-chart-wrap">
        <div class="vital-chart">
          <canvas bind:this={vitalCanvas}></canvas>
        </div>

        {#if vitalLoading}
          <div class="vital-overlay">불러오는 중...</div>
        {/if}

        {#if vitalError}
          <div class="vital-overlay error">{vitalError}</div>
        {/if}
      </div>
    </div>
  </div>  
  <Footer />
</section>

{#if isImage}
  <section class="z_alert">
    <div class="z_box_1">
      <img style="max-width: 100%; max-height: 85vh; object-fit: contain; display: block;" src={imageUrl} alt="처방전 이미지">
      <div class="btn_wrap">
        <button class="btn-lg" on:click={closeImage}>닫기</button>
      </div>
    </div>
  </section>
{/if}

{#if zalert}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">상태가 변경되었습니다</div>
      <div class="btn_wrap">
        <button class="btn-lg" style="background-color: rgb(231, 55, 54); color:azure;" on:click={xButton}>목록으로 돌아가기</button>
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
        <button class="btn-lg" on:click={() => dgnsCancel()}>입력완료</button>
        <button class="btn-lg" on:click={() => (dgnsCnclRsnPopup = false)}
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
            <button class="btn-lg" style="background-color: rgb(231, 55, 54); color:azure;" on:click={() => goDgnsPayComplete()}
              >예</button
            >
            <button class="btn-lg" on:click={() => (payCompletePopup = false)}
              >아니오</button
            >
          {:else}
            <button class="btn-lg" on:click={() => (payCompletePopup = false)}
              >확인</button
            >
          {/if}
        {:else}
          <button class="btn-lg" on:click={() => (payCompletePopup = false)}
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
          <button class="btn-lg" on:click={() => goDgnsPayCancel()}>예</button>
          <button class="btn-lg" on:click={() => (payCancelPopup = false)}
            >아니오</button
          >
        {:else}
          <button class="btn-lg" on:click={() => (payCancelPopup = false)}
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
        <button class="btn-lg" on:click={() => (payCancelAlert = false)}
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
          class="btn-lg"
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
                disabled={hour === "vacation" ||
                  !rghour.length ||
                  !selectedDoctor}
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
                <textarea
                  placeholder="진료 사유 작성"
                  bind:value={comment}
                  style="height:100%"
                />
              </div>
            </td>
          </tr>
          <tr> </tr>
        </table>
      </div>
      <div class="btn_wrap" style="margin-top: 20px;">
        <button class="btn-lg" on:click={doReg}>예약하기</button>
        <button class="btn-lg gray" on:click={() => (isRcptPopupOpen = false)}
          >취소</button
        >
      </div>
    </div>
  </section>
{/if}

<!-- 진료 완료 팝업 -->
{#if dgnsCompletePopup}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        <div>진료 완료 처리하시겠습니까?</div>
        <div style="margin-top: 20px; margin-bottom: 40px">
          <label>
            결제 금액: 
            <input 
              type="number" 
              bind:value={dgnsCompleteAmt} 
              placeholder="결제 금액 입력"
              style="width: 200px; padding: 5px; margin-left: 10px;"
              min="0"
            />
          </label>
        </div>
      </div>
      <div class="btn_wrap">
        <button class="btn_06" on:click={confirmDgnsComplete}>확인</button>
        <button class="btn_03" on:click={() => {
          dgnsCompletePopup = false;
          dgnsCompleteAmt = "";
        }}>취소</button>
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
        <button class="btn-lg" on:click={() => (rcptSuccessPopup = false)}
          >확인</button
        >
      </div>
    </div>
  </section>
{/if}

<!-- PageLoader -->
{#if isLoading}
  <PageLoader />
{/if}

<style>
  /* ===== 건강지표 차트 UI ===== */
  .vital-card {
    background: #fff;
    border: 1px solid #e7e7e7;
    border-radius: 12px;
    padding: 16px 18px;
  }

  .vital-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    width: 100%;
  }

  .vital-tabs {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .vital-tab {
    border: 1px solid #e0e0e0;
    background: #fff;
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 700;
    cursor: pointer;
    line-height: 1;
    transition: 0.15s;
    color: #666;
  }

  .vital-tab.active {
    background: #e53935; /* 이미지처럼 빨간 활성 */
    border-color: #e53935;
    color: #fff;
  }

  .vital-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .vital-select {
    height: 36px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 10px;
    background: #fff;
  }

  .vital-dates {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vital-dash {
    color: #999;
  }

  .vital-btn {
    height: 36px;
    padding: 0 14px;
    border: 1px solid #e0e0e0;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    color: #666;
  }

  .vital-body {
    margin-top: 14px;
  }

  .vital-chart {
    height: 100%;          /* 이미지처럼 넓게 */
    width: 100%;
  }

  .vital-chart canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .vital-state {
    padding: 24px 0;
    text-align: center;
    color: #666;
  }

  .vital-state.error {
    color: #d32f2f;
  }
  .vital-chart-wrap {
    position: relative;
    height: 380px;
    width: 100%;
  }

  .vital-chart {
    height: 100%;
    width: 100%;
  }


  .vital-body { position: relative; }

  .vital-overlay{
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.75);
    font-weight: 700;
    color: #666;
  }

  .vital-overlay.error{
    color: #d32f2f;
  }

  /* hover(선택 전) */
  .gridjs-tbody tr:hover td {
    background: #f5f9ff;
  }

  /* 선택된 행 */
  .gridjs-tbody tr.highlighted td {
    background: #eaf4ff;          /* 선택 배경 */
    font-weight: 700;             /* 텍스트 강조 */
  }

  /* 선택된 행의 좌측 포인트 바(첫번째 셀 기준) */
  .gridjs-tbody tr.highlighted td:first-child {
    position: relative;
  }
  .gridjs-tbody tr.highlighted td:first-child::before {
    content: "";
    position: absolute;
    left: 0;
    top: -1px;
    bottom: -1px;
    width: 4px;
    background: #0099ff;
    border-radius: 2px;
  }

  /* 선택된 행에 살짝 떠보이는 느낌(선택사항) */
  .gridjs-tbody tr.highlighted {
    box-shadow: 0 0 0 1px rgba(0,153,255,0.25) inset;
  }

  /* 예약목록 하단 버튼을 오른쪽으로 정렬 */
  .rsv-actions{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap; /* 화면 좁으면 줄바꿈 */
  }


</style>
