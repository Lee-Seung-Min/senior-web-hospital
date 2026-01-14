<script>
  // @ts-nocheck
  import { onMount, onDestroy } from "svelte";
  import { getAPI } from "$lib/js/getAPI";
  import { goto } from "$app/navigation";
  import { mobileUrlAddr, shopUrlAddr } from "$lib/js/urlAddr";
  import { authUrlAddr } from "$lib/js/urlAddr";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import Grid from "gridjs-svelte";
  import Daum from "svelte-daum-postcode";
  import { getUserId } from "$lib/js/getUserId";
  import { updateRefresh } from "$lib/js/updateRefresh";
  import { isLogin, susrId, susrLoginId, susrName, susrShpId, susrShpName } from "$lib/store/loginStore";
  import {
    rowNum,
    dgnsDtrId,
    shpType,
    shpName,
    shpSido,
    shpStatSesc,
    shpEntDate,
    shpStat,
    shpVstYon,
    shpVstDesc,
    shpCtlsYon,
    shpCtlsDesc,
    shpPhrsName,
    shpRegNo,
    phrsName,
    shpTel,
    shpFax,
    shpPath,
    shpZip,
    shpAddr,
    shpAddrDtl,
    shpLati,
    shpLongi,
    shpIntrTitl,
    shpIntrCnts,
    shpIp,
    shpContName,
    shpContTel,
    shpTimeIntv,
    shpFee,
    shpFeeRate,
    shpFeeType,
    shpStopFrom,
    shpStopTo,
    shpRegDttm,
    htmeDay,
    htmeHsptId,
    htmeFrom,
    htmeTo,
    htmeTimeSet,
    dtrName,
    dtrLicNo,
    dtrVstYonDesc,
    dateFormatEnt,
    dateFormat, //dtrVstYon,
    htmeType,
    htmeVstYon,
    htmeCtlsYon,
    htmeRegUsr,
    htmeRegUsrTyp,
    name,
    shdyFrom,
    shdyTo,
    shdyTitl,
    shdyDesc,
    shpSubject,
    shpDept,
    dtrHsptDept,
    dtrCtlsYon2,
    dtrVstYon2,
    dtrItems2,
    dtrLicNo2,
    dtrName2,
    holTitlget,
    shpId,
    shpWlkYon,
    shpRsvYon,
    sdtlBank,
    sdtlBankNum,
    shpNiNo,
  } from "$lib/store/rgstStore.js";
  import { mulitiPostAPI } from "$lib/js/multiPostAPI";
  import { decrypt, encrypt, getEncryptItems } from "../../../assets/js/aes256";

  //휴일관리 그리드 시작
  const style = {
    table: {
      width: "100%",
      border: "3px solid #ccc",
    },
    th: {
      "background-color": "rgba(0, 0, 0, 0.1)",
      color: "#000",
      "border-bottom": "3px solid #ccc",
      "text-align": "center",
    },
    td: {
      "text-align": "center",
    },
  };

  let dtrColumns = ["번호", "의사명", "진료과", "진료분야", "면허번호", "비대면진료"];

  let docData = [["", "", "", "", "", ""]];

  //selectShopHolidayList
  //휴일관리 그리드 끝

  let hsptGenList = [];
  let hsptTimeList = [];
  let originHsptTimeList = [];
  let originStartTime = "0";
  let originEndTime = "0";
  let originChangeTime = "0";
  let dtrTimeList = [];
  let originDtrTimeList = [];
  let docInfoList = [];
  let docInfo = {};
  let holInfoList = [""];
  let addToggle = false;
  let fax = "";
  let tel = "";
  let insertDeptCheck = false;
  let insertDtrDeptCheck = false;
  let insertDtrItemCheck = false;
  let whatForm = "basic";
  let dtrType = "dtrLoad";
  let shdyId = "";
  let blank = false;
  let hlTitl = "";
  let selectedFile = "";
  let imgSource = "";
  let hsptDeptLst = [];
  let dtrDeptLst = [];
  let dtrItemLst = [];

  let result2 = "";
  let deptIdList = [];
  let dtrDeptIdList = [];
  let dtrItemIdList = [];
  let hsptDeptDropBox = false;
  let dtrDeptDropBox = false;
  let dtrItemDropBox = false;
  //let dtrHsptDept="";

  let activeTab = 1; // Initialize with the first tab value

  let startTime = "";
  let endTime = "";
  let changeTime = "";

  let hsptSave = true;
  let oneClick = true;

  let encryptItems = [];
  //팝업시작

  let popUpWhat = "";
  let text = "";
  let noTime = false;
  let selectedRowId = null;
  let saveDay = new Array(7).fill(false);
  let selectedYear = new Date().getFullYear();
  let selectedMonth = new Date().getMonth() + 1;
  let hdayList = [];

  onMount(async () => {
    const jwt = localStorage.getItem("bizportal-access-token");
    const refresh = localStorage.getItem("bizportal-refresh-token");
    try {
      //사용자 id를 가져온다.
      await getUserId(jwt).then((result) => {
        //id를 가져온 후의 로직을 작성.
        if (result != "" && result != undefined && result != "") {
          isLogin.update((isLogin) => (isLogin = true));
        }
      });
    } catch (err) {
      //에러가 토큰기간만료 코드라면 다시 재발급을 진행
      try {
        if (err.message == "21009") {
          try {
            await updateRefresh(refresh);
            goto("/");
            // location.reload();
          } catch (err) {
            if (err.message == "22005") {
              alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
              goto("/");
            }
          }
        } else {
          //아니라면 그냥 에러 출력.
          console.error(err);
        }
      } catch (err) {
        //토큰 재발급 과정에서 에러 발생 시, 다시 로그인하도록 로그인 화면으로 보낸다.
        console.error(err);
        localStorage.setItem("bizportal-refresh-token", "");
        localStorage.setItem("bizportal-access-token", "");
        alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
        goto("/");
      }
    }

    await getHsptInfo();
  });

  function todayValue2() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    return dateString;
  }

  function outsideClick(node, callback) {
    function handleClick(event) {
      if (!node.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }

  //병원의사 진료항목 등록
  /**
   * 팩스 형식을 맞춰주는 함수 02-555-5999
   */
  function faxBlur() {
    fax = fax.replace(/\D/g, "");

    if (fax.length == 9) {
      fax = fax.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    }
  }

  /**
   * 휴대번호 형식으로 자동 변환해주는 함수
   */
  function telBlur() {
    tel = tel.replace(/\D/g, "");
    if (tel.length == 11) {
      tel = tel.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
  }

  function contBlur() {
    tel = tel.replace(/\D/g, "");
    if (tel.length == 11) {
      tel = tel.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
  }

  function handlePhoneInput(event) {
    $shpContTel = formatPhoneNumber(event.target.value);
  }
  function formatPhoneNumber(phoneNumber) {
    // 숫자만 추출
    var digits = phoneNumber.replace(/\D/g, "");

    // 숫자가 11자리가 아니면 원래 번호를 반환
    if (digits.length !== 11) {
      return phoneNumber;
    }

    // '010-0000-0000' 형식으로 변환
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  /**
   * 주소검색 창에서 주소를 선택 한 후에 선택한 데이터를 input에 추가하는 함수
   * @param detail 선택한 주소의 자세한 정보가 들어가 있는 json
   */
  function addComplete({ detail: { data } }) {
    console.log("addComplete 함수 : " + JSON.stringify(data));
    $shpZip = data.zonecode;
    $shpAddr = data.roadAddress;
    getAddr($shpAddr);
    addToggle = false;
  }
  async function getAddr(addr) {
    const url =
      "https://dapi.kakao.com/v2/local/search/address.json?query=" + addr;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: "KakaoAK b87e5db988c66a858cfc810a5269b706" },
    });
    let resData = await res.json();
    console.log(resData);
    $shpLati = resData.documents[0].road_address.y;
    $shpLongi = resData.documents[0].road_address.x;
  }

  function holAddButton() {
    popUpWhat = "registerHoliday";
  }

  //닫기 버튼
  function xButton() {
    popUpWhat = "";
  }

  // Initialize a variable to store the file input element
  let fileInput;

  //병원 일반탭 인포
  async function getHsptInfo() {
    //병원일반탭
    //const hsptGen = urlAddr + "8083/v1/auth/getShopList?shpId=3";
    const hsptGen = authUrlAddr + "/v1/auth/getShopList?shpId=" + $susrShpId;
    let resData_hsptGeneral = await getAPI(hsptGen);
    console.log(resData_hsptGeneral);
    hsptGenList = resData_hsptGeneral[0];

    for (let j = 0; j < resData_hsptGeneral.length; j++) {
      for (let i = 0; i < hsptGenList.length; i++) {
        if (true) {
          //$name in hsptGenList[i]){
          deptList.join($name + "");
        }
      }
    }

    $rowNum = hsptGenList["rowNum"];
    $shpId = hsptGenList["shpId"];
    $shpType = hsptGenList["shpType"];
    $shpName = hsptGenList["shpName"];
    $shpSido = hsptGenList["shpSido"];
    // $shp_stat = hsptGenList["shp_stat"];
    $shpStat = hsptGenList["shpStat"];
    $shpStatSesc = hsptGenList["shpStatSesc"];
    $shpEntDate = hsptGenList["shpEntDate"];
    $shpVstYon = hsptGenList["shpVstYon"];
    $shpVstDesc = hsptGenList["shpVstDesc"];
    $shpCtlsYon = hsptGenList["shpCtlsYon"];
    $shpCtlsDesc = hsptGenList["shpCtlsDesc"];
    $shpWlkYon = hsptGenList["shpWlkYon"];
    $shpRsvYon = hsptGenList["shpRsvYon"];
    $shpPhrsName = hsptGenList["shpPhrsName"];
    $shpRegNo = hsptGenList["shpRegNo"];
    $phrsName = hsptGenList["phrsName"];
    $shpZip = hsptGenList["shpZip"];
    $shpAddr = hsptGenList["shpAddr"];
    $shpAddrDtl = hsptGenList["shpAddrDtl"];
    $shpTel = hsptGenList["shpTel"];
    $shpFax = hsptGenList["shpFax"];
    $shpLati = hsptGenList["shpLati"];
    $shpLongi = hsptGenList["shpLongi"];
    $shpPath = hsptGenList["shpPath"];
    $shpIntrTitl = hsptGenList["shpIntrTitl"];
    $shpIntrCnts = hsptGenList["shpIntrCnts"];
    $shpIp = hsptGenList["shpIp"];
    $shpContName = hsptGenList["shpContName"];
    $shpContTel = hsptGenList["shpContTel"];
    $shpTimeIntv = hsptGenList["shpTimeIntv"];
    $shpFee = hsptGenList["shpFee"];
    $shpFeeRate = hsptGenList["shpFeeRate"];
    $shpFeeType = hsptGenList["shpFeeType"];
    $shpStopFrom = hsptGenList["shpStopFrom"];
    $shpRegDttm = hsptGenList["shpRegDttm"];
    $shpStopTo = hsptGenList["shpStopTo"];
    $dateFormatEnt = hsptGenList["dateFormatEnt"];
    $dateFormat = "yyyy-mm-dd";
    $htmeType = hsptGenList["htmeType"];
    $htmeVstYon = hsptGenList["htmeVstYon"];
    $htmeCtlsYon = hsptGenList["htmeCtlsYon"];
    $htmeRegUsr = hsptGenList["htmeRegUsr"];
    $htmeRegUsrTyp = hsptGenList["htmeRegUsrTyp"];
    $name = hsptGenList["name"];
    $shpSubject = hsptGenList["shpSubject"];
    $shpDept = hsptGenList["shpDept"];
    $sdtlBank = hsptGenList["sdtlBank"];
    if (hsptGenList["sdtlBankNum"] != null) {
      $sdtlBankNum = decrypt(hsptGenList["sdtlBankNum"]);
    }
    $shpNiNo = hsptGenList["shpNiNo"];
  }

  //진료과목 구하기
  async function getDeptList() {
    if (!hsptDeptDropBox) {
      const deptUrl =
        shopUrlAddr + "/v1/Shop/selectHospitalDeptList?shpId=" + $susrShpId;
      let resData = await getAPI(deptUrl);
      hsptDeptLst = resData.resultVO;
      // 문자열 'true'/'false'를 Boolean 값으로 변환하는 함수
      const toBoolean = (str) => str === "true";

      // items 배열을 변환하여 isChecked가 Boolean 타입인 새 배열 생성
      hsptDeptLst = hsptDeptLst.map((dept) => ({
        ...dept,
        hdptSelYon: toBoolean(dept.hdptSelYon),
      }));
    }

    hsptDeptDropBox = !hsptDeptDropBox;
  }

  //진료과목 체크 여부
  function getHsptDeptChecked(deptIndex) {
    // 체크된 항목만 필터링
    hsptDeptLst[deptIndex].hdptSelYon = !hsptDeptLst[deptIndex].hdptSelYon;
    const selectedDepts = hsptDeptLst.filter((dept) => dept.hdptSelYon);
    console.log(selectedDepts);
    // hdptSelYon이 true인 항목들만을 대상으로 result2와 deptIdList 업데이트
    result2 = selectedDepts.map((dept) => dept.deptName).join("·");
    deptIdList = selectedDepts.map((dept) => dept.deptId);
    insertDeptCheck = true;
    $shpDept = result2;
  }

  //병원일반 등록
  async function hsptGenSave() {
    if (hsptInfoValidate()) {
      hsptSave = false;
      oneClick = false;
      await insertHsptInfo();

      if (hsptSave) {
        popUpWhat = "insertSuccess";
      } else {
        popUpWhat = "insertFail";
      }
      oneClick = true;
    }
  }

  //병원정보 입력 검사
  function hsptInfoValidate() {
    let isValid = true;
    if (!$shpName) {
      text = "병원명을 입력해주세요.";
      isValid = false;
      blank = true;
    } else if (!$shpNiNo) {
      text = "요양기관번호를 입력해주세요.";
      isValid = false;
      blank = true;
    } else if (!$shpDept) {
      text = "진료과목을 선택해주세요";
      isValid = false;
      blank = true;
    } else if (!$shpSubject) {
      text = "진료항목을 입력해주세요.";
      isValid = false;
      blank = true;
    } else if (!$shpAddr) {
      text = "주소를 입력해주세요.";
      isValid = false;
      blank = true;
    } else if (!$shpTel) {
      text = "전화번호를 입력해주세요.";
      isValid = false;
      blank = true;
    } else if (!$shpContName) {
      text = "담당자명을 입력해주세요.";
      isValid = false;
      blank = true;
    } else if (!$shpContTel) {
      text = "연락처를 입력해주세요.";
      isValid = false;
      blank = true;
    }
    return isValid;
  }

  //병원 일반정보 삽입
  async function insertHsptInfo() {
    encryptItems = getEncryptItems();
    let jsonStr = makeStr({
      shpType: "H",
      shpName: $shpName,
      shpStat: $shpStat,
      shpVstYon: $shpVstYon,
      shpCtlsYon: $shpCtlsYon,
      shpWlkYon: $shpWlkYon,
      shpRsvYon: $shpRsvYon,
      shpRegUsr: "1",
      shpStopFrom: $shpStopFrom,
      shpStopTo: $shpStopTo,
      dateFormatEnt: "yyyy-mm-dd",
      shpRegNo: $shpRegNo,
      shpPhrsName: $shpPhrsName,
      dateFormat: "yyyy-mm-dd",
      shpSido: $shpSido,
      shpZip: $shpZip,
      shpAddr: $shpAddr,
      shpAddrDtl: $shpAddrDtl,
      shpLati: $shpLati,
      shpLongi: $shpLongi,
      shpTel: $shpTel,
      shpFax: $shpFax,
      shpPath: $shpPath,
      shpIntrTitl: $shpIntrTitl,
      shpIntrCnts: $shpIntrCnts,
      shpEntDate: $shpEntDate,
      shpContName: $shpContName,
      shpContTel: $shpContTel,
      shpFeeType: $shpFeeType,
      shpFee: $shpFee,
      shpFeeRate: $shpFeeRate,
      shpUpdtUsrType: "1",
      name: $name,
      shpId: $susrShpId,
      shpSubject: $shpSubject,
      shpDept: $shpDept,
      sdtlBank: $sdtlBank,
      sdtlBankNum: encrypt($sdtlBankNum, encryptItems),
      shpNiNo: $shpNiNo,
    });
    console.log("병원일반등록 : " + jsonStr);

    let url = "";
    if (susrShpId == -1) {
      url = shopUrlAddr + "/v1/Shop/insertShopInfo";
      console.log("인서트문");
    } else {
      url = shopUrlAddr + "/v1/Shop/updateShopInfo";
      console.log("업데이트문" + url);
      console.log("업데이트문" + jsonStr);
    }

    let res = await postAPI(url, jsonStr);
    if (res.code == "0") {
      await insertDept();
      hsptSave = true;
    } else {
      hsptSave = false;
    }
  }

  //진료과목 삽입
  async function insertDept() {
    if (insertDeptCheck) {
      hsptSave = false;
      let insertDeptJson = makeStr({
        deptIdList,
        hdptShpId: $susrShpId,
        deptRegUsr: 1,
        deptRegUsrType: 1,
      });
      const insertDeptUrl = shopUrlAddr + "/v1/Shop/insertHospitalDept";
      let resData = await postAPI(insertDeptUrl, insertDeptJson);
      console.log(resData);
      insertDeptCheck = false;
      deptIdList = [];
      if (resData.code != "0") {
        hsptSave = false;
      } else {
        hsptSave = true;
      }
    }
  }

  //병원 진료시간
  async function getHsptTimeLst(tab) {
    activeTab = tab;
    const hsptTime =
      shopUrlAddr +
      "/v1/Shop/selectHospitalTime?htmeDay=" +
      activeTab +
      "&htmeHsptId=" +
      $susrShpId;
    let resData_hsptTime = await getAPI(hsptTime);
    hsptTimeList = resData_hsptTime.resultVO;
    originHsptTimeList = hsptTimeList;
    if (hsptTimeList.length == 0) {
      startTime = "";
      endTime = "";
      changeTime = "";
      noTime = true;
    } else {
      noTime = false;
      startTime = hsptTimeList[0].htmeFrom;
      endTime = hsptTimeList[hsptTimeList.length - 1].htmeTo;
      changeTime = hsptTimeList[0].htmeTimeSet;
      originStartTime = startTime;
      originEndTime = endTime;
      originChangeTime = changeTime;
      hsptTimeList = hsptTimeList.map((item) => ({
        ...item,
        isCtlsChecked: item.htmeCtlsYon === "Y",
        isVstChecked: item.htmeVstYon === "Y",
      }));
    }
  }

  //시간 폼 초기화
  function resetForm() {
    startTime = "";
    endTime = "";
    changeTime = "";
    hsptTimeList = [];
  }
  //시간 폼 설정
  async function makeSchedule() {
    oneClick = false;
    if (changeTime == "" || changeTime == null) {
      popUpWhat = "makeSchedule";
      text = "진료기준 설정해주세요";
      return 0;
    } else if (startTime == "" || startTime == null) {
      popUpWhat = "makeSchedule";
      text = "진료시작 시간 확인해주세요";
      return 0;
    } else if (endTime == "" || endTime == null) {
      popUpWhat = "makeSchedule";
      text = "진료종료 시간 확인해주세요";
      return 0;
    }
    console.log("11111");
    if (
      startTime == originStartTime &&
      endTime == originEndTime &&
      changeTime == originChangeTime &&
      !noTime
    ) {
      console.log("SAME!!!!");
      hsptTimeList = originHsptTimeList;
      hsptTimeList = hsptTimeList.map((item) => ({
        ...item,
        isCtlsChecked: $shpCtlsYon == "N" ? false : true,
        isVstChecked: $shpVstYon == "N" ? false : true,
        htmeCtlsYon: $shpCtlsYon == "N" ? "N" : "Y",
        htmeVstYon: $shpVstYon == "N" ? "N" : "Y",
        htmeType: "0",
      }));
    } else {
      let fromH = "";
      let fromM = "";

      //시간차 구하기

      fromH = startTime.slice(0, 2);
      fromM = startTime.slice(3, 5);

      //let fromS = $htmeFrom.slice(6,8);
      //let fromTotalSeconds = fromH * 3600 + fromM * 60 + fromS;
      let fromTotal = fromH * 60 + fromM * 1;
      console.log("fromTotal : " + fromTotal);

      let toH = "";
      let toM = "";
      toH = endTime.slice(0, 2);
      toM = endTime.slice(3, 5);

      let toTotal = toH * 60 + toM * 1;

      let timeCount = (toTotal - fromTotal) / changeTime;
      let fromInput = "";
      let toInput = "";
      hsptTimeList = [];
      for (let i = 0; i < timeCount; i++) {
        //htmeFrom 업뎃 돌아가는거 먼저 고치기. htmeFrom 값 매번 바뀌도록

        let hsptTime = {
          htmeCtlsYon: "Y",
          htmeVstYon: "Y",
          htmeDay: activeTab,
          htmeFrom: "",
          htmeTo: "",
          htmeType: "0",
          htmeHsptId: $susrShpId,
          htmeType: "0",
          htmeRegUsr: "1",
          htmeRegUsrType: "S",
          htmeTimeSet: changeTime,
          isCtlsChecked: true,
          isVstChecked: true,
        };
        if ($shpCtlsYon == "N") {
          hsptTime.isCtlsChecked = false;
          hsptTime.htmeCtlsYon = "N";
        }
        if ($shpVstYon == "N") {
          hsptTime.isVstChecked = false;
          hsptTime.htmeVstYon = "N";
        }
        let fromSigan = fromTotal + changeTime * i;
        let fromHour = Math.floor(fromSigan / 60);
        let fromMin = String(fromSigan % 60).padStart(2, "0");
        fromInput = String(fromHour) + ":" + String(fromMin);

        let toSigan = fromTotal + changeTime * (i + 1);
        let toHour = Math.floor(toSigan / 60);
        let toMin = String(toSigan % 60).padStart(2, "0");

        toInput = String(toHour) + ":" + String(toMin);
        hsptTime.htmeFrom = fromInput;
        hsptTime.htmeTo = toInput;
        console.log("toInput : " + toInput);
        hsptTimeList.push(hsptTime);
      }
      if (hsptTimeList.length != 0) {
        hsptTimeList.at(hsptTimeList.lastIndexOf()).htmeTo = endTime;
      } else {
        popUpWhat = "makeSchedule";
        text = "진료시간을 확인해주세요";
        return 0;
      }
    }
    oneClick = true;
    console.log(hsptTimeList);
  }

  //병원 스케줄 저장
  async function saveSchedule() {
    oneClick = false;
    hsptSave = false;
    if (
      startTime == originStartTime &&
      endTime == originEndTime &&
      changeTime == originChangeTime &&
      !noTime
    ) {
      console.log("SAME!!!!");
      let url = shopUrlAddr + "/v1/Shop/updateHospitalTime";
      let res = await postAPI(url, JSON.stringify(hsptTimeList));
      if (res.code == "0") {
        hsptSave = true;
      } else {
        hsptSave = false;
      }
    } else {
      let jsonStr = makeStr({ htmeHsptId: $susrShpId, htmeDay: activeTab });
      let url2 = shopUrlAddr + "/v1/Shop/deleteHospitalTime";
      let res = await postAPI(url2, jsonStr);
      if (res.code == "0") {
        let url = shopUrlAddr + "/v1/Shop/insertHospitalTime";
        res = await postAPI(url, JSON.stringify(hsptTimeList));
        if (res.code == "0") {
          hsptSave = true;
        } else {
          hsptSave = false;
        }
      } else {
        hsptSave = false;
      }
    }
    if (hsptSave) {
      popUpWhat = "insertSuccess";
    } else {
      popUpWhat = "insertFail";
    }
    getHsptTimeLst(activeTab);
    oneClick = true;
  }

  //병원 스케줄 여러개 요일 초기화
  function resetDayFalse() {
    saveDay.fill(false);
  }
  //병원 스케줄 여러개 저장
  async function saveManySchedule() {
    // oneClick = false;
    // hsptSave = false;
    let copyHsptTimeList = hsptTimeList.map((item) => ({ ...item }));
    // true인 경우에만 함수 실행
    saveDay.forEach(async (value, index) => {
      if (value === true && index + 1 != activeTab) {
        console.log(index);
        let jsonStr = makeStr({ htmeHsptId: $susrShpId, htmeDay: index + 1 });
        let url2 = shopUrlAddr + "/v1/Shop/deleteHospitalTime";
        let res = await postAPI(url2, jsonStr);
        if (res.code == "0") {
          copyHsptTimeList.forEach((item) => {
            item.htmeDay = index + 1;
          });

          let url = shopUrlAddr + "/v1/Shop/insertHospitalTime";
          res = await postAPI(url, JSON.stringify(copyHsptTimeList));
          if (res.code == "0") {
            hsptSave = true;
          } else {
            hsptSave = false;
          }
        } else {
          hsptSave = false;
        }
      }
    });

    resetDayFalse();
    saveSchedule();
    console.log(activeTab);
  }

  //의사리스트 불러오기
  async function getDoctorListInfo() {
    dtrType = "dtrLoad";
    //의사정보탭
    const docInfoUrl =
      shopUrlAddr + "/v1/Shop/selectHospitalDoctorList?shpId=" + $susrShpId;

    let resData_docInfo = await getAPI(docInfoUrl);
    docInfoList = resData_docInfo.resultVO;
    console.log(docInfoList);
    docData = docInfoList.map((item) => [
      item.rowNum,
      item.dtrName,
      item.dtrDepts,
      item.dtrItems,
      item.dtrLicNo,
      item.dtrCtlsYon === "Y" ? "가능" : "불가",
    ]);
    docInfo = {
      dtrCtlsYon: "",
      dtrDepts: "",
      dtrId: "",
      dtrItems: "",
      dtrLicNo: "",
      dtrName: "",
      dtrVstYon: "",
      dtrRoom: "",
      dtrShpTimeEqual: "",
      rowNum: "",
      dtrGender: "",
    };
  }

  //의사정보 불러오기
  async function getDoctorInfo(e) {
    console.log(e);
    let rowNumIndex = e.detail[1]._cells[0].data;
    selectedRowId = rowNumIndex;
    docInfo = docInfoList.find((doc) => doc.rowNum === rowNumIndex);
    console.log(docInfo);
    docInfo.isCtlsChecked = docInfo.dtrCtlsYon === "Y";
    docInfo.isVstChecked = docInfo.dtrVstYon === "Y";
    if ($shpCtlsYon == "N") {
      docInfo.isCtlsChecked = false;
      docInfo.dtrCtlsYon = "N";
    }
    if ($shpVstYon == "N") {
      docInfo.isVstChecked = false;
      docInfo.dtrVstYon = "N";
    }
    if (
      docInfo.dtrGender == null ||
      docInfo.dtrGender == "" ||
      docInfo.dtrGender == undefined
    ) {
      docInfo.dtrGender = "M";
    }
    insertDtrDeptCheck = false;
    insertDtrItemCheck = false;
    dtrType = "exist";

    fileInput.value = "";
    imgSource = getImg(docInfo.dtrImg);
    getDtrTimeLst();
    updateGridStyle();
  }

  function updateGridStyle() {
    document.querySelectorAll(".gridjs-tbody tr").forEach((row, index) => {
      const cells = row.querySelectorAll("td"); // 모든 td 요소를 가져옴
      const rowId = cells[0].innerText; // rowId가 있는 td의 인덱스를 참조 (첫 번째 열)
      console.log(rowId);
      if (parseInt(rowId) == selectedRowId) {
        row.classList.add("highlighted");
      } else {
        row.classList.remove("highlighted");
      }
    });
  }

  function getImg(imgUrl) {
    if (imgUrl != null) {
      console.log("imgY");
      return "data:image/jpeg;base64," + imgUrl;
    } else {
      console.log("imgN");
      return nonImg();
    }
  }

  function nonImg() {
    if (docInfo.dtrGender == "M") {
      imgSource = new URL("$lib/img/barodoctor/doctor_0.png", import.meta.url)
        .href;
      selectedFile = "";
      return imgSource;
    } else if (docInfo.dtrGender == "F") {
      imgSource = new URL("$lib/img/barodoctor/doctor_6.png", import.meta.url)
        .href;
      selectedFile = "";
      return imgSource;
    }
  }

  function changeImg() {
    if (docInfo.dtrImg == null || docInfo.dtrImg == "") {
      nonImg();
    }
  }

  //의사정보 추가
  async function insertDoc() {
    docInfo = {
      dtrCtlsYon: "",
      dtrDepts: "",
      dtrId: "0",
      dtrItems: "",
      dtrLicNo: "",
      dtrName: "",
      dtrVstYon: "",
      rowNum: "",
      dtrImg: null,
      dtrGender: "M",
    };
    docInfo.rowNum = docInfoList.length + 1;
    insertDtrDeptCheck = false;
    insertDtrItemCheck = false;
    fileInput.value = "";
    dtrType = "new";
    nonImg();
    getDtrTimeLst();
  }

  //의사 진료과목
  async function getDtrDeptList() {
    if (!dtrDeptDropBox) {
      const deptUrl =
        shopUrlAddr +
        "/v1/Shop/selectHsptDoctorDeptList?dtrId=" +
        docInfo.dtrId +
        "&shpId=" +
        $susrShpId;
      let resData = await getAPI(deptUrl);
      dtrDeptLst = resData.resultVO;
      // 문자열 'true'/'false'를 Boolean 값으로 변환하는 함수
      const toBoolean = (str) => str === "true";

      // items 배열을 변환하여 isChecked가 Boolean 타입인 새 배열 생성
      dtrDeptLst = dtrDeptLst.map((dept) => ({
        ...dept,
        ddptSelYon: toBoolean(dept.ddptSelYon),
      }));
    }

    dtrDeptDropBox = !dtrDeptDropBox;
  }

  //의사 진료과목 체크
  async function getDtrDeptChecked(deptIndex) {
    dtrDeptLst[deptIndex].ddptSelYon = !dtrDeptLst[deptIndex].ddptSelYon;
    const selectedDepts = dtrDeptLst.filter((dept) => dept.ddptSelYon);
    docInfo.dtrDepts = selectedDepts.map((dept) => dept.deptName).join("·");
    dtrDeptIdList = selectedDepts.map((dept) => dept.deptId);
    insertDtrDeptCheck = true;
    $dtrHsptDept = docInfo.dtrDepts;
  }

  //의사 진료항목
  async function getDtrItemList() {
    if (!dtrItemDropBox) {
      const deptUrl =
        shopUrlAddr +
        "/v1/Shop/selectHsptDoctorItemList?dtrId=" +
        docInfo.dtrId +
        "&shpId=" +
        $susrShpId;
      let resData = await getAPI(deptUrl);
      dtrItemLst = resData.resultVO;
      console.log(dtrItemLst);
      // 문자열 'true'/'false'를 Boolean 값으로 변환하는 함수
      const toBoolean = (str) => str === "true";

      // items 배열을 변환하여 isChecked가 Boolean 타입인 새 배열 생성
      dtrItemLst = dtrItemLst.map((dept) => ({
        ...dept,
        ditmSelYon: toBoolean(dept.ditmSelYon),
      }));
    }

    dtrItemDropBox = !dtrItemDropBox;
  }

  //의사 진료항목 체크
  async function getDtrItemChecked(deptIndex) {
    dtrItemLst[deptIndex].ditmSelYon = !dtrItemLst[deptIndex].ditmSelYon;
    const selectedDepts = dtrItemLst.filter((item) => item.ditmSelYon);
    docInfo.dtrItems = selectedDepts.map((item) => item.itemName).join(", ");
    dtrItemIdList = selectedDepts.map((item) => item.itemId);
    insertDtrItemCheck = true;
  }

  //의사 정보 저장
  async function saveHsptDtrInfo() {
    oneClick = false;
    hsptSave = false;
    if (docInfo.dtrName == null || docInfo.dtrName == "") {
      text = "의사명을 입력해주세요";
      blank = true;
    } else if (docInfo.dtrLicNo == null || docInfo.dtrLicNo == "") {
      text = "면허번호를 입력해주세요";
      blank = true;
    } else if (docInfo.dtrDepts == null || docInfo.dtrDepts == "") {
      text = "진료과를 입력해주세요";
      blank = true;
    } else {
      if (dtrType == "exist") {
        await updateHsptDtrInfo();
      } else if (dtrType == "new") {
        await insertHsptDtrInfo();
      }

      if (hsptSave) {
        popUpWhat = "insertSuccess";
      } else {
        popUpWhat = "insertFail";
      }
    }
    oneClick = true;
  }

  //의사 정보 업데이트
  async function updateHsptDtrInfo() {
    console.log(docInfo);
    const formData = new FormData();
    console.log(selectedFile);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    let jsonStr = makeStr({
      dtrName: docInfo.dtrName,
      dtrLicNo: docInfo.dtrLicNo,
      dtrVstYon: docInfo.dtrVstYon,
      dtrCtlsYon: docInfo.dtrCtlsYon,
      dtrRoom: docInfo.dtrRoom,
      dtrUpdtUsr: "1",
      dtrUpdtUsrType: "S",
      dtrId: docInfo.dtrId,
      dtrHsptDept: docInfo.dtrDepts,
      dtrItems2: docInfo.dtrItems,
      dtrShpTimeEqual: docInfo.dtrShpTimeEqual,
      dtrGender: docInfo.dtrGender,
    });
    // JSON 데이터를 Blob으로 변환하여 추가
    const jsonBlob = new Blob([jsonStr], { type: "application/json" });

    formData.append("json", jsonBlob);
    const url = shopUrlAddr + "/v1/Shop/updateHospitalDoctorInfo";
    let res = await mulitiPostAPI(url, formData);
    console.log(res);
    if (res.code == "0") {
      hsptSave = true;
      await insertDtrDept();
    } else {
      hsptSave = false;
    }
  }

  //의사 정보 추가
  async function insertHsptDtrInfo() {
    console.log(docInfo);

    const formData = new FormData();
    console.log(selectedFile);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    let jsonStr = makeStr({
      dtrName: docInfo.dtrName,
      dtrLicNo: docInfo.dtrLicNo,
      dtrVstYon: docInfo.dtrVstYon,
      dtrCtlsYon: docInfo.dtrCtlsYon,
      dtrUpdtUsr: "1",
      dtrUpdtUsrType: "S",
      dtrHsptDept: docInfo.dtrDepts,
      dtrRoom: docInfo.dtrRoom,
      dtrItems2: docInfo.dtrItems,
      dtrShpId: $susrShpId,
      dtrStat: "0",
      dtrShpTimeEqual: docInfo.dtrShpTimeEqual,
      dtrGender: docInfo.dtrGender,
    });
    // JSON 데이터를 Blob으로 변환하여 추가
    const jsonBlob = new Blob([jsonStr], { type: "application/json" });
    formData.append("json", jsonBlob);
    const url = shopUrlAddr + "/v1/Shop/insertHospitalDoctorInfo";
    let res = await mulitiPostAPI(url, formData);
    console.log(res);

    docInfo.dtrId = res.resultVO;
    if (res.code == "0") {
      hsptSave = true;
      await insertDtrDept();
    } else {
      hsptSave = false;
    }
  }

  //의사 진료 과목 저장
  async function insertDtrDept() {
    if (insertDtrDeptCheck) {
      let jsonStr = makeStr({
        deptIdList: dtrDeptIdList,
        ddptDtrId: docInfo.dtrId,
        deptRegUsr: 1,
        deptRegUsrType: "S",
      });
      const url = shopUrlAddr + "/v1/Shop/insertDoctorDept";
      console.log(jsonStr);
      let res = await postAPI(url, jsonStr);
      if (res.code == "0") {
        hsptSave = true;
        await insertDtrItem();
      } else {
        hsptSave = false;
      }

      dtrDeptIdList = [];
    } else {
      hsptSave = true;
      await saveDtrSchedule();
    }
  }

  //의사 진료 항목 저장
  async function insertDtrItem() {
    console.log(docInfo);
    console.log(dtrItemIdList);
    if (insertDtrItemCheck) {
      let jsonStr = makeStr({
        itemIdList: dtrItemIdList,
        ditmDtrId: docInfo.dtrId,
        itemRegUsr: 1,
        itemRegUsrType: "S",
      });
      const url = shopUrlAddr + "/v1/Shop/insertDoctorItem";
      console.log(jsonStr);
      let res = await postAPI(url, jsonStr);
      if (res.code == "0") {
        hsptSave = true;
        await saveDtrSchedule();
      } else {
        hsptSave = false;
      }

      dtrItemIdList = [];
    } else {
      hsptSave = true;
      await saveDtrSchedule();
    }
  }

  //의사 진료시간 구하기
  async function getDtrTimeLst() {
    activeTab = 1;
    const dtrTimeUrl =
      shopUrlAddr +
      "/v1/Shop/selectDoctorTimeList?dtmeDtrId=" +
      docInfo.dtrId +
      "&htmeHsptId=" +
      $susrShpId;
    let resData = await getAPI(dtrTimeUrl);
    dtrTimeList = resData.resultVO;
    dtrTimeList = dtrTimeList.map((innerArray) => {
      return innerArray.map((item) => ({
        ...item,
        isCtlsChecked: item.dtmeCtlsYon === "Y",
        isVstChecked: item.dtmeVstYon === "Y",
      }));
    });
    originDtrTimeList = dtrTimeList;
    whatForm = "doctorTimeInfo";
    console.log(dtrTimeList[0]);
  }

  function chngDtrTimeTab(tab) {
    whatForm = "doctorTimeInfo";
    activeTab = tab;
  }

  //의사 진료시간 저장
  async function saveDtrSchedule() {
    const saveUrl = shopUrlAddr + "/v1/Shop/insertDoctorTime";
    dtrTimeList = dtrTimeList.map((innerArray) => {
      return innerArray.map((item) => ({
        ...item,
        dtmeDtrId: docInfo.dtrId,
        dtmeRegUsr: 1,
        dtmeRegUsrType: "S",
      }));
    });
    let resData = await postAPI(saveUrl, JSON.stringify(dtrTimeList));
    if (resData.code == "0") {
      hsptSave = true;
    } else {
      hsptSave = false;
    }
    await getDoctorListInfo();
  }

  //의사 삭제
  async function delDtrInfo() {
    const delInfoUrl = shopUrlAddr + "/v1/Shop/deleteDoctorInfo";
    let jsonStr = makeStr({ dtrId: docInfo.dtrId });
    let resData = await postAPI(delInfoUrl, jsonStr);
    popUpWhat = "";
    await getDoctorListInfo();
  }

  //휴일시간 불러오기
  async function getHldayList() {
    const holInfoUrl =
      shopUrlAddr +
      "/v1/Shop/selectShopHolidayList?shpId=" +
      $susrShpId +
      "&shdyTitl=" +
      hlTitl;
    let resData = await getAPI(holInfoUrl);
    holInfoList = resData.resultVO;
  }

  //휴일 등록
  async function addHoliday() {
    if ($shdyFrom == null || $shdyFrom == "") {
      text = "시작일을 입력해주세요";
      blank = true;
    } else if ($shdyTo == null || $shdyTo == "") {
      text = "종료일을 입력해주세요";
      blank = true;
    } else if ($shdyTitl == null || $shdyTitl == "") {
      text = "휴일명을 입력해주세요";
      blank = true;
    } else {
      let jsonStr = makeStr({
        shdyShpId: $susrShpId,
        shdyFrom: $shdyFrom,
        dateFormatEnt: "yyyy-mm-dd",
        shdyTo: $shdyTo,
        shdyTitl: $shdyTitl,
        shdyDesc: $shdyDesc,
        shdyRegUsr: $susrShpId,
        shdyRegUsrType: "1",
      });
      const url = shopUrlAddr + "/v1/Shop/insertShopHoliday";
      let res = await postAPI(url, jsonStr);
      popUpWhat = "";
      $shdyFrom = "";
      $shdyTo = "";
      $shdyTitl = "";
      $shdyDesc = "";
      hlTitl = "";

      console.log("addHoliday's res : ",res);

      if (res.resultVO) {
        popUpWhat = "insertHoliday";
      } else {
        popUpWhat = "insertFail";
      }
      await getHldayList();
    }
  }

  //휴일 삭제
  async function delHoliday() {
    let jsonStr = makeStr({ shdyId });

    const url = shopUrlAddr + "/v1/Shop/deleteShopHoliday";
    let res = await postAPI(url, jsonStr);
    shdyId = "";
    popUpWhat = "";
    hlTitl = "";
    console.log(res);
    if (res.code == "0") {
      popUpWhat = "deleteHoliday";
    } else {
      popUpWhat = "insertFail";
    }
    await getHldayList();
  }

  //사진 업로드
  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = async () => {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("올바른 이미지 파일(jpg, jpeg, png)을 선택해 주세요.");
        return;
      }
      if (img.width > 400 || img.height > 600) {
        alert(
          "이미지 크기가 너무 큽니다. 최대 400x600 픽셀로 해주시길 바랍니다.",
        );
        fileInput.value = "";
        return;
      } else {
        // 파일 저장
        selectedFile = file;
        imgSource = img.src;
      }
    };
    img.onerror = () => {
      alert("유효한 이미지를 불러올 수 없습니다. 다른 파일을 시도해주세요.");
      fileInput.value = "";
    };
    img.src = URL.createObjectURL(file);
  }

  function vaildateBankNum() {
    $sdtlBankNum = $sdtlBankNum.replace(/[^0-9]/g, "");
  }

  function checkDtrShpTimeEqual() {
    dtrTimeList = originDtrTimeList;
    if (docInfo.dtrShpTimeEqual) {
      dtrTimeList = dtrTimeList.map((innerArray) => {
        return innerArray.map((item) => ({
          ...item,
          dtmeCtlsYon: item.htmeCtlsYon,
          dtmeVstYon: item.htmeVstYon,
          dtmeType: item.htmeType,
          isCtlsChecked: item.htmeCtlsYon === "Y",
          isVstChecked: item.htmeVstYon === "Y",
        }));
      });
    } else {
      dtrTimeList = dtrTimeList.map((innerArray) => {
        return innerArray.map((item) => ({
          ...item,
          isCtlsChecked: item.dtmeCtlsYon === "Y",
          isVstChecked: item.dtmeVstYon === "Y",
        }));
      });
    }
  }

  //공공데이터 공휴일 불러오기
  async function getHolidayList(year, month) {
    const url =
      shopUrlAddr + "/v1/Shop/getHolidayList?year=" + year + "&month=" + month;
    let resData = await getAPI(url);

    if (resData.resultVO) {
      hdayList = resData.resultVO.map((hday) => ({
        dateName: hday.dateName,
        locdate: formatDate(hday.locdate),
        selected: false, // 선택처리를 위한
      }));
    }
  }

  // 선택된 공휴일 적용
  async function applySelectedHolidays() {
    const selectedhday = hdayList
      .filter((hday) => hday.selected);
    const url = shopUrlAddr + "/v1/Shop/insertShopHoliday";
    for(const selected of selectedhday){

      const jsonStr = makeStr({
        shdyShpId: $susrShpId,
        shdyFrom: selected.locdate,
        dateFormatEnt: "yyyy-mm-dd",
        shdyTo: selected.locdate,
        shdyTitl: selected.dateName,
        shdyDesc: selected.dateName + "(으)로 인한 휴무입니다.",
        shdyRegUsr: $susrShpId,
        shdyRegUsrType: "1",
      });
      const res = await postAPI(url, jsonStr);
      if (!res.resultVO) {
        popUpWhat = "insertFailHoliday";
      } 
    }
      await getHldayList();
    }

  

  function formatDate(yyyymmdd) {
    if (!yyyymmdd) return "";
    const str = String(yyyymmdd);
    return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
  }
</script>

<div id="skipNavi">
  <a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a>
</div>
<!--<section id="head">-->
<!--  <button type="button" data-url="Javascript:onMenuSlide()">-->
<!--    <i class="icon-arrow icon-chevron-left"></i>-->
<!--    <i class="icon-menu"></i>-->
<!--  </button>-->
<!--  <h1>{$susrShpName}</h1>-->
<!--  <div class="admin">-->
<!--    <i class="icon-account_circle" on:click={() => goto(URL.awChngPw)}></i>-->
<!--    <span><b>{$susrName}</b>님</span>-->
<!--    <button type="button" class="btn_03 btn_xs" on:click={logout}>Logout</button>-->
<!--  </div>-->
<!--</section>-->

<section id="con">
  <!--  <div id="menu">-->
  <!--    <h1></h1>-->
  <!--    <div class="lnb">-->

  <!--    </div>-->
  <!--    <div class="copyright">BIT Computer.</div>-->
  <!--  </div>-->

  <div id="content">
    <!-- content S -->
    <h2 class="page_title">병원 정보</h2>

    <div class="tab_container">
      <p class="required_box"><span class="required">*</span> 는 필수입력 정보입니다.</p>
      <div class="tabs">
        <ul>
          <li class={whatForm == "basic" ? "active" : ""}>
            <a
              rel="tab1"
              on:click={() => {
                whatForm = "basic";
              }}
              >병원일반
            </a>
          </li>
          <li class={whatForm == "hsptTime" ? "active" : ""}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a
              rel="tab2"
              on:click={async () => {
                await getHsptTimeLst(1);
                whatForm = "hsptTime";
              }}
              >진료시간
            </a>
          </li>
          <li
            class={whatForm == "doctorInfo" || whatForm == "doctorTimeInfo"
              ? "active"
              : ""}
          >
            <a
              rel="tab3"
              on:click={async () => {
                await getDoctorListInfo();
                whatForm = "doctorInfo";
                activeTab = 1;
              }}
              >의사정보
            </a>
          </li>
          <li class={whatForm == "holiday" ? "active" : ""}>
            <a
              rel="tab4"
              on:click={async () => {
                whatForm = "holiday";
                hlTitl = "";
                await getHldayList();
              }}
            >
              휴일관리
            </a>
          </li>
        </ul>
      </div>
      <div id="tab1" class={whatForm == "basic" ? "tab_content active" : "tab_content"}>
        <form action="/shop/awHsptDtl" method="PUT">
          <div class="form_table">
            <table>
              <colgroup>
                <col style="width:12%;" />
                <col style="width:38%;" />
                <col style="width:12%;" />
                <col style="width:38%;" />
              </colgroup>
              <tr>
                <th class="ess3">병원명</th>
                <td>
                  <input type="text" class="w100p" bind:value={$shpName} />
                </td>
                <th class="ess3">요양기관번호</th>
                <td>
                  <input type="text" class="w100p" bind:value={$shpNiNo} />
                </td>
              </tr>
              <tr>
                <th class="ess3">진료과목</th>
                <td colspan="3">
                  <!-- Checkbox Drop Down -->
                  <div class="dropDown">
                    <div style="width: 100%;">
                      {#if $shpDept != null}
                        {$shpDept}
                      {/if}
                    </div>
                    <!-- <input type="text" class="droptext" value={$shpDept} id="nameInput" /> -->
                    <div
                      use:outsideClick={() => {
                        hsptDeptDropBox = false;
                      }}
                    >
                      <button
                        type="button"
                        class="mbtn_b btn_drop"
                        on:click={async (event) => {
                          event.stopPropagation();
                          await getDeptList();
                        }}
                        >진료과목 선택 <i class="xi-angle-down"></i>
                      </button>
                      <div
                        class={hsptDeptDropBox == true
                          ? "dropBox on"
                          : "dropBox"}
                        id="dropBox"
                      >
                        <ul>
                          {#each hsptDeptLst as dept, index}
                            <li>
                              <label for={dept.deptName}>
                                <input
                                  type="checkbox"
                                  id={dept.deptId}
                                  name="subject"
                                  value={dept.deptName}
                                  bind:checked={dept.hdptSelYon}
                                  on:click={(event) => {
                                    event.stopPropagation();
                                    getHsptDeptChecked(index);
                                  }}
                                />
                                {dept.deptName}
                              </label>
                            </li>
                          {/each}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- //Checkbox Drop Down -->
                </td>
              </tr>
              <tr>
                <th>계좌이체번호</th>
                <td colspan="3">
                  <div class="dropDown">
                    <select style="margin: 0 10px 0 0;" bind:value={$sdtlBank}>
                      <option value="">은행선택</option>
                      <option value="우리">우리</option>
                      <option value="농협">농협</option>
                      <option value="국민">국민</option>
                      <option value="신한">신한</option>
                      <option value="기업">기업</option>
                      <option value="하나">하나</option>
                      <option value="우체국">우체국</option>
                      <option value="새마을금고">새마을금고</option>
                      <option value="대구">대구</option>
                      <option value="경남">경남</option>
                      <option value="광주">광주</option>
                      <option value="부산">부산</option>
                      <option value="전북">전북</option>
                      <option value="제주">제주</option>
                      <option value="카카오뱅크">카카오뱅크</option>
                      <option value="토스뱅크">토스뱅크</option>
                    </select>
                    <div class="dropDown">
                      <input
                        type="text"
                        class="droptext"
                        id="nameInput"
                        on:input={vaildateBankNum}
                        on:blur={vaildateBankNum}
                        bind:value={$sdtlBankNum}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="ess3">진료항목</th>
                <td colspan="3">
                  <!-- Checkbox Drop Down -->
                  <div class="dropDown">
                    <input
                      type="text"
                      class="droptext"
                      bind:value={$shpSubject}
                      id="nameInput"
                      placeholder="쉼표로 구분하여 입력해주세요 (예시: 감기, 고열)"
                    />
                  </div>
                  <!-- //Checkbox Drop Down -->
                </td>
              </tr>
              <tr>
                <th class="ess3">주소</th>
                <td colspan="3">
                  <div class="address_box_1">
                    <input
                      type="text"
                      required
                      class="w90"
                      bind:value={$shpZip}
                    />
                    <input type="text" required bind:value={$shpAddr} />
                    <button
                      type="button"
                      class="mbtn_n_5"
                      on:click={() => (addToggle = !addToggle)}>주소검색</button
                    >

                    {#if addToggle}
                      <div>
                        <Daum
                          height="500px"
                          autoClose="true"
                          on:complete={addComplete}
                        />
                      </div>
                    {/if}
                  </div>
                  <div class="address_box_2">
                    <input type="text" required bind:value={$shpAddrDtl} />
                    <!-- <div class="mappin">
                      (위도 : <input type="text" required bind:value={$shpLongi} />
                      경도 : <input type="text" required bind:value={$shpLati} />)
                    </div> -->
                  </div>
                </td>
              </tr>
              <tr>
                <th class="ess3">전화번호</th>
                <td>
                  <input
                    type="text"
                    required
                    id=""
                    name=""
                    bind:value={$shpTel}
                    on:blur={telBlur}
                  />
                </td>
                <th>FAX</th>

                <td>
                  <input
                    type="text"
                    required
                    id=""
                    name=""
                    bind:value={$shpFax}
                    on:blur={faxBlur}
                  />
                </td>
              </tr>
              <tr>
                <th class="ess3">상태</th>
                <td colspan="1">
                  <select bind:value={$shpStat}>
                    <!-- on:change={shpStatChange}> -->
                    <option value="0">정상</option>
                    <option value="8">중지</option>
                    <option value="9">해지</option>
                  </select>
                  {#if $shpStat == 8}
                    <span>(중지기간 : </span>
                    <label class="select_data"
                      ><input
                        type="text"
                        class="datepicker"
                        id="dateFrom3"
                        bind:value={$shpStopFrom}
                      /></label
                    >
                    <span> ~ </span>
                    <label class="select_data"
                      ><input
                        type="text"
                        class="datepicker"
                        id="dateTo3"
                        bind:value={$shpStopTo}
                      /></label
                    >)
                  {/if}
                </td>

                <th>가입일</th>
                <td>
                  <label class="select_data"
                    ><input
                      type="text"
                      class="datepicker"
                      id="dateReg3"
                      readonly
                      bind:value={$shpEntDate}
                    /></label
                  >
                </td>
              </tr>
              <tr>
                <th class="ess3">대면진료</th>
                <td>
                  <select bind:value={$shpVstYon}>
                    <option value="Y">가능</option>
                    <option value="N">불가능</option>
                  </select>
                </td>
                <!--<th class="ess3">수수료기준</th>
                            <td>
                                <select bind:value={$shpFeeType} on:change={shpFeeStandard}>
                                    <option  value="F">정액</option>
                                    <option  value="R">비율</option>
                                </select>
                            </td>
                        </tr>
                        <tr>-->
                <th class="ess3">비대면진료</th>
                <td>
                  <select bind:value={$shpCtlsYon}>
                    <option value="Y">가능</option>
                    <option value="N">불가능</option>
                  </select>
                </td>
                <!--<th class="ess3">수수료(율)</th>
                            <td>
                                <input type="text" class="w100p" bind:value={$shpFeeRate}>
                            </td>-->
              </tr>
              <tr>
                <th class="ess3">접수</th>
                <td>
                  <select bind:value={$shpWlkYon}>
                    <option value="Y">가능</option>
                    <option value="N">불가능</option>
                  </select>
                </td>

                <th class="ess3">예약</th>
                <td>
                  <select bind:value={$shpRsvYon}>
                    <option value="Y">가능</option>
                    <option value="N">불가능</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th class="ess3">담당자명</th>
                <td
                  ><input
                    type="text"
                    class="wide"
                    name=""
                    id=""
                    bind:value={$shpContName}
                    style="width:270px"
                  />
                </td>
                <th class="ess3">연락처</th>
                <td>
                  <input
                    type="text"
                    required
                    id=""
                    name=""
                    bind:value={$shpContTel}
                    on:input={handlePhoneInput}
                  />
                </td>
              </tr>
              <tr>
                <th>병원설명</th>
                <td colspan="3">
                  <div class="input_box_no">
                    <input
                      class="w100p"
                      type="text"
                      name=""
                      bind:value={$shpIntrTitl}
                      maxlength="30"
                    />
                    <div class="no">
                      {#if $shpIntrTitl == null}
                        (0/30 자)
                      {:else}
                        ({$shpIntrTitl.length}/30 자)
                      {/if}
                    </div>
                  </div>
                  <div class="input_box_no">
                    <textarea
                      class="w100p"
                      name=""
                      required
                      bind:value={$shpIntrCnts}
                      maxlength="150"
                    ></textarea>

                    <div class="no">
                      {#if $shpIntrCnts == null}
                        (0/150 자)
                      {:else}
                        ({$shpIntrCnts.length}/150 자)
                      {/if}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <!--<th class="ess3">병원로고</th>
                            <td>

                                <form name="form" on:submit={handleSubmit} method="post" action="http://localhost:3030/hsptimage" enctype="multipart/form-data">
                                    <input type="file" name="files" multiple="multiple" bind:this={fileInput} />
                                    <input type="submit" id="submit" value="전송" />
                                  </form>

                            </td>-->
              </tr>
            </table>
          </div>

          <div class="btn_wrap">
            <button
              type="button"
              class="btn_02"
              on:click={async () => {
                if (oneClick) {
                  await hsptGenSave();
                }
              }}>저장</button
            >
          </div>
        </form>
      </div>

      <div
        id="tab2"
        class={whatForm == "hsptTime" ? "tab_content active" : "tab_content"}
      >
        <div class="box_search">
          <div class="tabs tabs_pill">
            <ul>
              <li class={activeTab === 1 ? "active" : ""}>
                <a rel="tab5" on:click={() => getHsptTimeLst(1)}>월</a>
              </li>
              <li class={activeTab === 2 ? "active" : ""}>
                <a rel="tab6" on:click={() => getHsptTimeLst(2)}>화</a>
              </li>
              <li class={activeTab === 3 ? "active" : ""}>
                <a rel="tab7" on:click={() => getHsptTimeLst(3)}>수</a>
              </li>
              <li class={activeTab === 4 ? "active" : ""}>
                <a rel="tab8" on:click={() => getHsptTimeLst(4)}>목</a>
              </li>
              <li class={activeTab === 5 ? "active" : ""}>
                <a rel="tab9" on:click={() => getHsptTimeLst(5)}>금</a>
              </li>
              <li class={activeTab === 6 ? "active" : ""}>
                <a rel="tab10" on:click={() => getHsptTimeLst(6)}>토</a>
              </li>
              <li class={activeTab === 7 ? "active" : ""}>
                <a rel="tab11" on:click={() => getHsptTimeLst(7)}>일</a>
              </li>
            </ul>
          </div>
          <div class="form_search">
            <form>
              <label class="label_title">기본설정</label>

              <label>진료시작 : </label><input
                type="time"
                bind:value={startTime}
              />

              <label>진료종료 : </label><input
                type="time"
                bind:value={endTime}
              />

              <label>진료기준</label>
              <!--<select bind:value={$htmeTimeSet} on:change={shpFeeStandard}>-->
              <!--이사님 쿼리 수정주시면 value값 change 함수 바꾸기-->
              <select bind:value={changeTime}>
                <option value="">선택</option>
                <option value="10">10분</option>
                <option value="30">30분</option>
                <option value="60">1시간</option>
              </select>

              <button
                style="float: right; margin-left:2px; margin-right:2px;"
                type="button"
                on:click={async () => {
                  if (oneClick) {
                    await makeSchedule();
                  }
                }}
                class="mbtn_g_3">만들기</button
              >
              <button
                style="float: right; margin-left:2px; margin-right:2px;"
                type="button"
                on:click={resetForm}
                class="mbtn_g_3">초기화</button
              >
            </form>
          </div>
          <!--시작-->
          {#if whatForm == "hsptTime"}
            <div class="form_table" id="tab5">
              <table id="tab5">
                <colgroup>
                  <col style="width:20% ;" />
                  <col style="width:80% ;" />
                </colgroup>
                {#each hsptTimeList as hsptTime}
                  <tr>
                    <th>{hsptTime.htmeFrom} ~ {hsptTime.htmeTo}</th>
                    <td>
                      <div class="radio_box">
                        <select
                          bind:value={hsptTime.htmeType}
                          on:change={() => {
                            if (
                              hsptTime.htmeType == "8" ||
                              hsptTime.htmeType == "9"
                            ) {
                              hsptTime.isVstChecked = false;
                              hsptTime.isCtlsChecked = false;
                              hsptTime.htmeVstYon = "N";
                              hsptTime.htmeCtlsYon = "N";
                            }
                          }}
                        >
                          <option value="0">진료</option>
                          <option value="8">점심</option>
                          <option value="9">비진료</option>
                        </select>
                      </div>
                      <div class="checkbox_box">
                        {#if $shpVstYon == "Y"}
                          <label
                            ><input
                              type="checkbox"
                              name="checkbox"
                              bind:checked={hsptTime.isVstChecked}
                              on:change={(event) => {
                                if (
                                  hsptTime.htmeType == "8" ||
                                  hsptTime.htmeType == "9"
                                ) {
                                  hsptTime.isVstChecked = false;
                                  hsptTime.htmeVstYon = "N";
                                } else {
                                  hsptTime.htmeVstYon = event.target.checked
                                    ? "Y"
                                    : "N";
                                }
                              }}
                            />대면</label
                          >
                        {/if}
                        {#if $shpCtlsYon == "Y"}
                          <label
                            ><input
                              type="checkbox"
                              name="checkbox"
                              bind:checked={hsptTime.isCtlsChecked}
                              on:change={(event) => {
                                if (
                                  hsptTime.htmeType == "8" ||
                                  hsptTime.htmeType == "9"
                                ) {
                                  hsptTime.isCtlsChecked = false;
                                  hsptTime.htmeCtlsYon = "N";
                                } else {
                                  hsptTime.htmeCtlsYon = event.target.checked
                                    ? "Y"
                                    : "N";
                                }
                              }}
                            />비대면</label
                          >
                        {/if}
                      </div>
                    </td>
                  </tr>
                {/each}
              </table>
            </div>
          {/if}
          <!--끝-->
        </div>
        <div class="btn_wrap">
          <button
            type="button"
            class="btn_05"
            on:click={async () => {
              if (oneClick) {
                await saveSchedule();
              }
            }}>저장</button
          >
          <button
            type="button"
            class="btn_02"
            on:click={async () => {
              if (oneClick) {
                saveDay[activeTab - 1] = true;
                popUpWhat = "saveMany";
              }
            }}>일괄 저장</button
          >
          <!--노임령-->
        </div>
      </div>

      <div
        id="tab3"
        class={whatForm == "doctorInfo" || whatForm == "doctorTimeInfo"
          ? "tab_content active"
          : "tab_content"}
      >
        <div class="form_table list">
          <!--의사정보 상단표 시작-->

          <div>
            <div class="box_1">
              <div class="form_table">
                <Grid
                  data={docData}
                  columns={dtrColumns}
                  {style}
                  on:rowClick={getDoctorInfo}
                />
              </div>
            </div>
          </div>

          <div class="btn_wrap min txt_r">
            <button
              type="button"
              class="mbtn_b changePw"
              value="의사추가"
              on:click={insertDoc}
            >
              <i class="xi-plus"> </i>
              의사추가
            </button>
          </div>

          <table class={dtrType === "dtrLoad" ? "doctorSelect" : ""}>
            <colgroup>
              <col style="width:12%;" />
              <col style="width:38%;" />
              <col style="width:12%;" />
              <col style="width:38%;" />
            </colgroup>
            <tr>
              <th class="ess">번호</th>
              <td colspan="2">
                {#if docInfo.rowNum != undefined}{docInfo.rowNum}{/if}
              </td>
              <td style="text-align: right;">
                {#if docInfo.dtrId != 0}
                  <button
                    type="button"
                    class="mbtn_o_6"
                    value="삭제"
                    on:click={() => {
                      popUpWhat = "deleteDtrInfo";
                    }}>삭제</button
                  >
                {/if}
              </td>
            </tr>
            <tr>
              <th class="ess">의사명</th>
              <td
                ><input
                  type="text"
                  bind:value={docInfo.dtrName}
                  class="w100p"
                /></td
              >
              <th class="ess">면허번호</th>
              <td>
                <input
                  type="text"
                  bind:value={docInfo.dtrLicNo}
                  class="w100p"
                />
              </td>
            </tr>
            <tr>
              <th class="ess3">진료과</th>
              <td>
                <!-- Checkbox Drop Down -->
                <div
                  class="dropDown"
                  use:outsideClick={() => (dtrDeptDropBox = false)}
                >
                  <div style="width: 100%;">
                    {#if docInfo.dtrDepts != null}{docInfo.dtrDepts}{/if}
                  </div>
                  <button
                    type="button"
                    class="mbtn_b btn_drop"
                    on:click={async (event) => {
                      event.stopPropagation();
                      await getDtrDeptList();
                    }}
                    >진료과목 선택 <i class="xi-angle-down"></i>
                  </button>
                  <div
                    class={dtrDeptDropBox == true ? "dropBox on" : "dropBox"}
                    id="dropBox3"
                  >
                    <ul>
                      {#each dtrDeptLst as dept, index}
                        <li>
                          <label for={dept.deptName}>
                            <input
                              type="checkbox"
                              id={dept.deptId}
                              name="subject3"
                              value={dept.deptName}
                              bind:checked={dept.ddptSelYon}
                              on:click={(event) => {
                                event.stopPropagation();
                                getDtrDeptChecked(index);
                              }}
                            />
                            {dept.deptName}
                          </label>
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
                <!-- //Checkbox Drop Down -->
              </td>
              <th>진료실</th>
              <td>
                <input type="text" bind:value={docInfo.dtrRoom} class="w100p" />
              </td>
            </tr>
            <tr>
              <th>진료분야</th>
              <td colspan="3">
                <!-- Checkbox Drop Down -->
                <div
                  class="dropDown"
                  use:outsideClick={() => (dtrItemDropBox = false)}
                >
                  <div style="width: 100%;">
                    {#if docInfo.dtrItems != null}{docInfo.dtrItems}{/if}
                  </div>
                  <button
                    type="button"
                    class="mbtn_b btn_drop"
                    on:click={async (event) => {
                      event.stopPropagation();
                      await getDtrItemList();
                    }}
                    >진료항목 선택 <i class="xi-angle-down"></i>
                  </button>
                  <div
                    class={dtrItemDropBox == true ? "dropBox on" : "dropBox"}
                    id="dropBox4"
                  >
                    <ul>
                      {#each dtrItemLst as item, index}
                        <li>
                          <label for={item.itemName}>
                            <input
                              type="checkbox"
                              id={item.itemId}
                              name="subject3"
                              value={item.itemName}
                              bind:checked={item.ditmSelYon}
                              on:click={(event) => {
                                event.stopPropagation();
                                getDtrItemChecked(index);
                              }}
                            />
                            {item.itemName}
                          </label>
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
                <!-- //Checkbox Drop Down -->
              </td>
            </tr>
            <tr>
              <th>진료 방식</th>
              <td>
                {#if $shpVstYon == "Y"}
                  <label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      bind:checked={docInfo.isVstChecked}
                      on:change={(event) => {
                        docInfo.dtrVstYon = event.target.checked ? "Y" : "N";
                      }}
                    />
                    대면
                  </label>
                {/if}
                {#if $shpCtlsYon == "Y"}
                  <label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      bind:checked={docInfo.isCtlsChecked}
                      on:change={(event) => {
                        docInfo.dtrCtlsYon = event.target.checked ? "Y" : "N";
                      }}
                    />
                    비대면
                  </label>
                {/if}

                <!--bind:checked={$dtrCtlsYon2}-->
                <!--bind:checked={$dtrVstYon2}-->
              </td>
              <th>성별</th>
              <td>
                <label>
                  <input
                    type="radio"
                    bind:group={docInfo.dtrGender}
                    on:change={changeImg}
                    value="M"
                  />
                  남성
                </label>
                <label>
                  <input
                    type="radio"
                    bind:group={docInfo.dtrGender}
                    on:change={changeImg}
                    value="F"
                  />
                  여성
                </label>
              </td>
            </tr>
            <tr>
              <th>사진</th>
              <td colspan="3">
                <img src={imgSource} class="doctorImg" alt="." />
                <div class="flex_warp">
                  <input
                    type="file"
                    class="w100p"
                    accept=".jpg, .jpeg, .png"
                    bind:this={fileInput}
                    on:change={handleUpload}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <th style="vertical-align:top;" class="ess2">진료시간</th>

              <td colspan="3">
                <div class="tab_container3">
                  <!--탭 메뉴 영역 -->
                  <div class="tabs tabs_pill mt20"></div>

                  <!---->

                  <div class="box_search">
                    <div class="tabs tabs_pill">
                      <ul>
                        <li class={activeTab === 1 ? "active" : ""}>
                          <a rel="tab5" on:click={() => chngDtrTimeTab(1)}>월</a
                          >
                        </li>
                        <li class={activeTab === 2 ? "active" : ""}>
                          <a rel="tab6" on:click={() => chngDtrTimeTab(2)}>화</a
                          >
                        </li>
                        <li class={activeTab === 3 ? "active" : ""}>
                          <a rel="tab7" on:click={() => chngDtrTimeTab(3)}>수</a
                          >
                        </li>
                        <li class={activeTab === 4 ? "active" : ""}>
                          <a rel="tab8" on:click={() => chngDtrTimeTab(4)}>목</a
                          >
                        </li>
                        <li class={activeTab === 5 ? "active" : ""}>
                          <a rel="tab9" on:click={() => chngDtrTimeTab(5)}>금</a
                          >
                        </li>
                        <li class={activeTab === 6 ? "active" : ""}>
                          <a rel="tab10" on:click={() => chngDtrTimeTab(6)}
                            >토</a
                          >
                        </li>
                        <li class={activeTab === 7 ? "active" : ""}>
                          <a rel="tab11" on:click={() => chngDtrTimeTab(7)}
                            >일</a
                          >
                        </li>
                        <label>
                          <input
                            type="checkbox"
                            name="checkbox"
                            bind:checked={docInfo.dtrShpTimeEqual}
                            on:change={(event) => {
                              // docInfo.dtrVstYon = event.target.checked ? "Y" : "N";
                              checkDtrShpTimeEqual();
                            }}
                          />
                          체크 시,
                          <label style="color: red;">병원운영시간</label>
                          과 동일하게 적용됩니다.
                        </label>
                      </ul>
                    </div>
                    <!--시작-->
                    {#if whatForm == "doctorTimeInfo"}
                      <div class="form_table" id="tab5">
                        <table>
                          <colgroup>
                            <col style="width:20% ;" />
                            <col style="width:80% ;" />
                          </colgroup>

                          {#each dtrTimeList[activeTab - 1] as dtrTime}
                            <tr>
                              <th>{dtrTime.htmeFrom} ~ {dtrTime.htmeTo}</th>
                              <td>
                                <div class="radio_box">
                                  <select
                                    bind:value={dtrTime.dtmeType}
                                    disabled={dtrTime.htmeType == 8 ||
                                      dtrTime.htmeType == 9 ||
                                      docInfo.dtrShpTimeEqual}
                                    on:change={() => {
                                      if (
                                        dtrTime.dtmeType == "8" ||
                                        dtrTime.dtmeType == "9"
                                      ) {
                                        dtrTime.isVstChecked = false;
                                        dtrTime.isCtlsChecked = false;
                                        dtrTime.dtmeVstYon = "N";
                                        dtrTime.dtmeCtlsYon = "N";
                                      }
                                    }}
                                  >
                                    <option value="0">진료</option>
                                    <option value="8">점심</option>
                                    <option value="9">비진료</option>
                                  </select>
                                </div>
                                <div class="checkbox_box">
                                  {#if dtrTime.htmeVstYon == "Y" && docInfo.dtrVstYon == "Y"}
                                    <label
                                      ><input
                                        type="checkbox"
                                        name="checkbox"
                                        bind:checked={dtrTime.isVstChecked}
                                        on:change={(event) => {
                                          if (
                                            dtrTime.dtmeType == "8" ||
                                            dtrTime.dtmeType == "9" ||
                                            docInfo.dtrVstYon != "Y"
                                          ) {
                                            dtrTime.isVstChecked = false;
                                            dtrTime.dtmeVstYon = "N";
                                          } else {
                                            dtrTime.dtmeVstYon = event.target
                                              .checked
                                              ? "Y"
                                              : "N";
                                          }
                                        }}
                                        disabled={docInfo.dtrShpTimeEqual}
                                      />대면</label
                                    >
                                  {/if}
                                  {#if dtrTime.htmeCtlsYon == "Y" && docInfo.dtrCtlsYon == "Y"}
                                    <label
                                      ><input
                                        type="checkbox"
                                        name="checkbox"
                                        bind:checked={dtrTime.isCtlsChecked}
                                        on:change={(event) => {
                                          if (
                                            dtrTime.dtmeType == "8" ||
                                            dtrTime.dtmeType == "9" ||
                                            docInfo.dtrCtlsYon != "Y"
                                          ) {
                                            dtrTime.isCtlsChecked = false;
                                            dtrTime.dtmeCtlsYon = "N";
                                          } else {
                                            dtrTime.dtmeCtlsYon = event.target
                                              .checked
                                              ? "Y"
                                              : "N";
                                          }
                                        }}
                                        disabled={docInfo.dtrShpTimeEqual}
                                      />비대면</label
                                    >
                                  {/if}
                                </div>
                              </td>
                            </tr> 
                          {/each}
                        </table>
                      </div>
                      <!--끝-->
                    {/if}
                  </div>
                </div>
              </td></tr
            >
          </table>
        </div>
        {#if dtrType != "dtrLoad"}
          <div class="btn_wrap">
            <button
              type="button"
              class="btn_02"
              on:click={async () => {
                if (oneClick) {
                  saveHsptDtrInfo();
                }
              }}>저장</button
            >
          </div>
        {/if}
      </div>

      <div
        id="tab4"
        class={whatForm == "holiday" ? "tab_content active" : "tab_content"}
      >
        <!-- 목록 S -->
        <div class="form_table list">
          <div class="box_search">
            <select>
              <option value="">전체</option>
              <option value="">제목</option>
            </select>
            <label
              ><input type="text" name="" id="" bind:value={hlTitl} /></label
            >
            <button type="button" class="mbtn_n_5" on:click={getHldayList}
              >검색</button
            >
            <div class="ar">
              <!--<button type="button" class="mbtn_n_6" data-url="Javascript:onConfirm('공지사항 삭제','해당 공지사항을 삭제하시겠습니까?','notice_del','')">선택삭제</button>-->
              <button
                type="button"
                id="callSectionButton holiday_add"
                class="mbtn_b_3"
                value="등록"
                on:click={holAddButton}>등록</button
              >
              <button
                type="button"
                id="callSectionButton holiday_add"
                class="mbtn_b_0"
                on:click={() => {
                  popUpWhat = "getHolidayList";
                }}>공휴일 추가</button
              >
            </div>
          </div>
          <!--<div class="ar pb10 txt_r">
                    <button type="button" id="callSectionButton holiday_add" class="mbtn_b_3" value="등록" on:click={holAddButton}>등록</button>
                    <button type="button" class="mbtn_o_6" value="삭제" on:click={holDelButton}>삭제</button>
                </div>-->
          <table>
            <colgroup>
              <col span="1" style="width: 10%" />
              <col span="1" style="width: 20%" />
              <col span="1" style="width: 20%" />
              <col span="1" style="width: 20%" />
              <col span="1" style="width: 20%" />
              <col span="1" style="width: 10%" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>휴일명</th>
                <th>안내문구</th>
                <th> </th>
              </tr>
            </thead>
            <tbody class="list">
              {#each holInfoList as arr, index}
                <tr>
                  <td>{index + 1}</td>
                  <td>{arr.shdyFrom}</td>
                  <td>{arr.shdyTo}</td>
                  <td>{arr.shdyTitl}</td>
                  <td>{arr.shdyDesc}</td>
                  <td
                    ><button
                      type="button"
                      class="mbtn_o_6"
                      value="삭제"
                      on:click={() => {
                        popUpWhat = "delHoliday";
                        shdyId = arr.shdyId;
                      }}>삭제</button
                    ></td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
          <!--table end-->
        </div>
        <!-- 페이징 S -->
      </div>
    </div>
    <!-- content E -->
    <footer></footer>
  </div>
</section>

{#if popUpWhat == "registerHoliday"}
  <section class="z_alert">
    <div class="bg"></div>
    <div class="z_box_1">
      <p class="text_tit">휴일등록</p>
      <hr />
      <div class="form_table">
        <table class="holiday_tbl">
          <tr>
            <th>기간</th>
            <td>
              <div class="form_inline">
                <input type="date" bind:value={$shdyFrom} />
                <span> ~ </span>
                <input type="date" bind:value={$shdyTo} /><!---->
              </div>
            </td>
          </tr>
          <tr>
            <th>휴일명</th>
            <td>
              <input type="text" bind:value={$shdyTitl} /><!---->
            </td>
          </tr>
          <tr>
            <th>안내문구 :</th>
            <td>
              <textarea class="desc" bind:value={$shdyDesc}></textarea><!---->
            </td>
          </tr>
        </table>
      </div>
      <div class="btn_wrap">
        <button type="submit" class="btn_02" on:click={() => addHoliday()}>저장</button>
        <button class="btn_02" on:click={() => xButton()}>취소</button>
      </div>
    </div>
  </section>
{/if}

<!-- 휴일관리 - 삭제팝업 -->
{#if popUpWhat == "delHoliday"}
  <section class="z_alert">
    <div class="z_box_1">
      <p class="text_tit">휴일을 삭제하시겠습니까?</p>
      <hr />

      <div class="btn_wrap">
        <!--<button type="submit" class="btn_02" on:click={()=>delHoliday()}>예</button>-->
        <button type="submit" class="btn_02" on:click={delHoliday}>예</button>
        <button class="btn_02" on:click={() => xButton()}>아니오</button>
      </div>
    </div>
  </section>
{/if}
<!--shp/awHoliday 가져온거 끝 -->
{#if popUpWhat == "makeSchedule"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">{text}</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            popUpWhat = "";
            oneClick = true;
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
{#if blank}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">{text}</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            blank = false;
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "deleteDtrInfo"}
  <section class="z_alert">
    <div class="z_box_1">
      <p class="text_tit">의사를 삭제하시겠습니까?</p>
      <hr />

      <div class="btn_wrap">
        <button type="submit" class="btn_02" on:click={delDtrInfo}>예</button>
        <button class="btn_02" on:click={() => xButton()}>아니오</button>
      </div>
    </div>
  </section>
{/if}

{#if popUpWhat == "insertFail"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">저장에 실패하였습니다.</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            popUpWhat = "";
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}

{#if popUpWhat == "insertSuccess"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">정보를 변경하였습니다.</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            popUpWhat = "";
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "insertHoliday"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">휴일을 등록하였습니다.</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            popUpWhat = "";
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "deleteHoliday"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">휴일을 삭제하였습니다.</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            popUpWhat = "";
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "saveMany"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        <div>
          <label
            ><input
              type="checkbox"
              name="checkbox"
              bind:checked={saveDay[0]}
              disabled={activeTab == 1}
            />월요일</label
          >
          <label
            ><input
              type="checkbox"
              name="checkbox"
              bind:checked={saveDay[1]}
              disabled={activeTab == 2}
            />화요일</label
          >
          <label
            ><input
              type="checkbox"
              name="checkbox"
              bind:checked={saveDay[2]}
              disabled={activeTab == 3}
            />수요일</label
          >
          <label
            ><input
              type="checkbox"
              name="checkbox"
              bind:checked={saveDay[3]}
              disabled={activeTab == 4}
            />목요일</label
          >
          <label
            ><input
              type="checkbox"
              name="checkbox"
              bind:checked={saveDay[4]}
              disabled={activeTab == 5}
            />금요일</label
          >
          <label
            ><input
              type="checkbox"
              name="checkbox"
              bind:checked={saveDay[5]}
              disabled={activeTab == 6}
            />토요일</label
          >
          <label
            ><input
              type="checkbox"
              name="checkbox"
              bind:checked={saveDay[6]}
              disabled={activeTab == 7}
            />일요일</label
          >
        </div>
        <div style="font-size: small;">
          원하는 요일에 동일한 진료시간을 추가하시고 싶으시다면 체크박스를
          선택하세요.
        </div>
      </div>

      <div class="btn_wrap">
        <button type="submit" class="btn_02" on:click={() => saveManySchedule()}
          >저장</button
        >
        <button
          class="btn_06"
          on:click={() => {
            xButton();
            resetDayFalse();
          }}>취소</button
        >
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "getHolidayList"}
  <section class="z_alert">
    <div class="bg"></div>
    <div class="z_box_1">
      <p class="text_tit">공휴일 휴일 추가</p>
      <hr />

      <!-- 검색 영역 -->
      <div class="box_search">
        <div class="form_search">
          <form>
            <label>연도 : </label>
            <select bind:value={selectedYear}>
              {#each Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i) as year}
                <option value={year}>{year}년</option>
              {/each}
            </select>

            <label>월 : </label>
            <select bind:value={selectedMonth}>
              {#each Array.from({ length: 12 }, (_, i) => i + 1) as month}
                <option value={month}>{month}월</option>
              {/each}
            </select>

            <button
              type="button"
              class="mbtn_n_5"
              on:click={() => getHolidayList(selectedYear, selectedMonth)}
            >
              검색
            </button>
          </form>
        </div>
      </div>

      <!-- 결과 영역 -->
      {#if hdayList && hdayList.length > 0}
        <div class="form_table list">
          <table>
            <colgroup>
              <col span="1" style="width: 10%" />
              <col span="1" style="width: 35%" />
              <col span="1" style="width: 55%" />
            </colgroup>
            <thead >
              <tr>
                <th style="text-align:center !important;">선택</th>
                <th style="text-align:center !important;">날짜</th>
                <th style="text-align:center !important;">공휴일명</th>
              </tr>
            </thead>
            <tbody class="list">
              {#each hdayList as hday}
                <tr>
                  <td style="text-align:center !important;">
                    <input
                      type="checkbox"
                      bind:checked={hday.selected}
                      value={hday.date}
                    />
                  </td>
                  <td style="text-align:center !important;">{hday.locdate}</td>
                  <td style="text-align:center !important;">{hday.dateName}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
      <!-- 결과 영역 -->
      {#if hdayList.length === 0}
        <div class="form_table list">
          <div class="tex"> 검색 결과가 없습니다. </div>
        </div>
      {/if}

      <div class="btn_wrap">
        <button
          type="button"
          class="btn_02"
          on:click={() => {
            applySelectedHolidays();
            popUpWhat = "";
          }}>적용</button
        >
        <button class="btn_02" on:click={() => xButton()}>취소</button>
      </div>
    </div>
  </section>
{/if}

{#if popUpWhat == "insertFailHoliday"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">저장에 실패하였습니다.(날짜 중복여부를 확인해주세요)</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            popUpWhat = "";
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
