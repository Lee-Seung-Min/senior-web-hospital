<script>
  import {onMount} from "svelte";
  import {getAPI} from "$lib/js/getAPI";
  import Nav from "$lib/sub/nav/Nav.svelte";
  import {goto} from "$app/navigation";
  import {URL} from "$lib/URL";
  import {footCheck} from "$lib/store/navStore.js";
  import {shopUrlAddr} from "$lib/js/urlAddr";
  import {authUrlAddr} from "$lib/js/urlAddr";
  import {mobileUrlAddr} from "$lib/js/urlAddr";
  import {adminUrlAddr} from "$lib/js/urlAddr";
  import {makeStr} from "$lib/js/makeStr";
  import {postAPI} from "$lib/js/postAPI";
  import Grid from "gridjs-svelte";
  import Footer from "$lib/sub/Footer.svelte";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import {deleteAPI} from "$lib/js/deleteAPI";
  import Daum from "svelte-daum-postcode";
  import {susrId, susrLoginId, susrName, susrShpId, susrShpName} from "$lib/store/loginStore";
  import PopUp_hm from "$lib/sub/nav/PopUp_hm.svelte";
  import PopUp_hm2 from "$lib/sub/nav/PopUp_hm2.svelte";
  import {getUserId} from "$lib/js/getUserId";
  import {updateRefresh} from "$lib/js/updateRefresh";
  import {loginResetStore} from "$lib/store/loginStore";

  import {
    rowNum,
    shpId,
    shpType,
    shpName,
    shpSido,
    shpStat,
    shpStatSesc,
    shpEntDate,
    shpVstYon,
    shpVstDesc,
    shpCtlsYon,
    shpCtlsDesc,
    shpPhrsName,
    shpRegNo,
    phrsName,
    shpZip,
    shpAddr,
    shpAddrDtl,
    shpLati,
    shpLongi,
    shpTel,
    shpFax,
    shpPath,
    shpIntrTitl,
    shpIntrCnts,
    shpIp,
    shpContName,
    shpContTel,
    shpTimeIntv,
    shpFee,
    shpFeeRate,
    shpFeeType,
    shpRegUsr,
    dateFormatEnt,
    shpStopFrom,
    shpStopTo,
    htmeDay,
    htmeHsptId,
    htmeFrom,
    htmeTo,
    dtrName,
    dtrLicNo,
    dtrVstYonDesc,
    dtrVstYon,
    dtmID,
    dtmShpId,
    dtmMonType,
    dtmMonFrom,
    dtmMonTo,
    dtmTueType,
    dtmTueFrom,
    dtmTueTo,
    dtmWedType,
    dtmWedFrom,
    dtmWedTo,
    dtmThuType,
    dtmThuFrom,
    dtmThuTo,
    dtmFriType,
    dtmFriFrom,
    dtmFriTo,
    dtmSatType,
    dtmSatFrom,
    dtmSatTo,
    dtmSunType,
    dtmSunFrom,
    dtmSunTo,
    dtmRegDttm,
    dtmRegUsr,
    dtmRegUsrName,
    dtmRegUsrType,
    dateFormat,
    shdyFrom,
    shdyTo,
    shdyTitl,
    shdyDesc,
  } from "$lib/store/rgstStore.js";

  function logout() {
    localStorage.setItem("userId", "");
    goto(URL.awLogin);
  }

  function todayValue2() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    return dateString;
  }

  let dateFrom3 = todayValue2();
  let dateTo3 = todayValue2();
  let dateReg3 = todayValue2();

  let dateReg = "";
  let dateFrom = "";
  let dateTo = "";
  let dateFrom2 = "";
  let dateTo2 = "";
  let addToggle = false;
  let addNum = "";
  let add = "";
  let shp_stat = "0";

  let docInfoList = [];
  let drstGenList = [];
  let drstTimeList = [];

  onMount(async () => {
    const jwt = localStorage.getItem("bizportal-access-token");
    const refresh = localStorage.getItem("bizportal-refresh-token");
    try {
      //사용자 id를 가져온다.
      await getUserId(jwt).then((result) => {
        //id를 가져온 후의 로직을 작성.
        if (result != "" && result != undefined && result != "") {
          isLogin.update((isLogin) => (isLogin = true));
          goto("/main/main");
        }
      });
    } catch (err) {
      //에러가 토큰기간만료 코드라면 다시 재발급을 진행
      try {
        if (err.message == "21009") {
          try {
            await updateRefresh(refresh);
            goto("/main/main");
            // location.reload();
          } catch (err) {
            if (err.message == "22005") {
              alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
              loginResetStore();
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
        loginResetStore();
        goto("/");
      }
    }

    holidayGridSet();
    rsvGridSet();

    //약국일반탭
    const drstGen = authUrlAddr + "/v1/auth/getShopList?shpId=" + $susrShpId;
    console.log("약국잼 : " + drstGen);
    let resData_drstGeneral = await getAPI(drstGen);
    drstGenList = resData_drstGeneral[0];

    console.log("aslkfjasldf;alsd : " + JSON.stringify(resData_drstGeneral));

    $rowNum = drstGenList["rowNum"];
    $shpId = drstGenList["shpId"];
    $shpType = drstGenList["shpType"];
    $shpName = drstGenList["shpName"];
    $shpSido = drstGenList["shpSido"];
    $shpStat = drstGenList["shpStat"];
    $shpStatSesc = drstGenList["shpStatSesc"];
    $shpEntDate = drstGenList["shpEntDate"];
    $shpVstYon = drstGenList["shpVstYon"];
    $shpVstDesc = drstGenList["shpVstDesc"];
    $shpCtlsYon = drstGenList["shpCtlsYon"];
    $shpCtlsDesc = drstGenList["shpCtlsDesc"];
    $shpPhrsName = drstGenList["shpPhrsName"];
    $shpRegNo = drstGenList["shpRegNo"];
    $phrsName = drstGenList["phrsName"];
    $shpZip = drstGenList["shpZip"];
    $shpAddr = drstGenList["shpAddr"];
    $shpAddrDtl = drstGenList["shpAddrDtl"];
    $shpTel = drstGenList["shpTel"];
    $shpFax = drstGenList["shpFax"];
    $shpLati = drstGenList["shpLati"];
    $shpLongi = drstGenList["shpLongi"];
    $shpPath = drstGenList["shpPath"];
    $shpIntrTitl = drstGenList["shpIntrTitl"];
    $shpIntrCnts = drstGenList["shpIntrCnts"];
    $shpIp = drstGenList["shpIp"];
    $shpContName = drstGenList["shpContName"];
    $shpContTel = drstGenList["shpContTel"];
    $shpTimeIntv = drstGenList["shpTimeIntv"];
    $shpFee = drstGenList["shpFee"];
    $shpFeeRate = drstGenList["shpFeeRate"];
    $shpFeeType = drstGenList["shpFeeType"];
    $shpRegUsr = drstGenList["shpRegUsr"];
    $shpStopFrom = drstGenList["shpStopFrom"];
    $shpStopTo = drstGenList["shpStopTo"];
    $dateFormatEnt = drstGenList["dateFormatEnt"];

    //근무시간탭
    const drstTime =
            shopUrlAddr +
            "/v1/Shop/selectDrugStoreTime?htmeHsptId=" +
            $susrShpId +
            "&dateFormat=yyyy-mm-dd&dateFormatTime=HH24:MI:SS";
    console.log("이거슨 근무시간탭 : " + drstTime);
    let resData_drstTime = await getAPI(drstTime);
    drstTimeList = resData_drstTime[0];
    console.log("근무시간탭 배열[0] : " + JSON.stringify(drstTimeList));

    $htmeDay = drstTimeList["htmeDay"];
    $htmeHsptId = drstTimeList["htmeHsptId"];
    $htmeFrom = drstTimeList["htmeFrom"];
    $htmeTo = drstTimeList["htmeTo"];

    $dtmID = drstTimeList["dtmID"];
    $dtmShpId = drstTimeList["dtmShpId"];
    $dtmMonType = drstTimeList["dtmMonType"];
    $dtmMonFrom = drstTimeList["dtmMonFrom"];
    $dtmMonTo = drstTimeList["dtmMonTo"];
    $dtmTueType = drstTimeList["dtmTueType"];
    $dtmTueFrom = drstTimeList["dtmTueFrom"];
    $dtmTueTo = drstTimeList["dtmTueTo"];
    $dtmWedType = drstTimeList["dtmWedType"];
    $dtmWedFrom = drstTimeList["dtmWedFrom"];
    $dtmWedTo = drstTimeList["dtmWedTo"];
    $dtmThuType = drstTimeList["dtmThuType"];
    $dtmThuFrom = drstTimeList["dtmThuFrom"];
    $dtmThuTo = drstTimeList["dtmThuTo"];
    $dtmFriType = drstTimeList["dtmFriType"];
    $dtmFriFrom = drstTimeList["dtmFriFrom"];
    $dtmFriTo = drstTimeList["dtmFriTo"];
    $dtmSatType = drstTimeList["dtmSatType"];
    $dtmSatFrom = drstTimeList["dtmSatFrom"];
    $dtmSatTo = drstTimeList["dtmSatTo"];
    $dtmSunType = drstTimeList["dtmSunType"];
    $dtmSunFrom = drstTimeList["dtmSunFrom"];
    $dtmSunTo = drstTimeList["dtmSunTo"];
    $dtmRegDttm = drstTimeList["dtmRegDttm"];
    $dtmRegUsr = drstTimeList["dtmRegUsr"];
    $dtmRegUsrName = drstTimeList["dtmRegUsrName"];
    $dtmRegUsrType = drstTimeList["dtmRegUsrType"];
    $dateFormat = drstTimeList["dateFormat"];

    //의사정보탭
    // (test: htmeHsptId(1) & htmeDay(1) 그외 자율테스트 )
    const docInfo = shopUrlAddr + "/v1/Shop/selectHospitalDoctorInfo?dtrId=" + $susrId;
    console.log(docInfo);
    let resData_docInfo = await getAPI(docInfo);
    docInfoList = resData_docInfo;
    //console.log("의사정보탭 배열 : " + JSON.stringify(docInfoList));

    $dtrName = docInfoList["dtrName"];
    $dtrVstYonDesc = docInfoList["dtrVstYonDesc"];
    $dtrLicNo = docInfoList["dtrLicNo"];
    $dtrVstYon = docInfoList["dtrVstYon"];

    dateFrom3 = todayValue2();
    dateTo3 = todayValue2();
    dateReg3 = todayValue2();
  });

  function todayValue() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    return dateString;
  }

  /**
   * 주소검색 창을 여닫는 함수
   */
  function toggleButton() {
    addToggle = !addToggle;
  }

  /**
   * 주소검색 창에서 주소를 선택 한 후에 선택한 데이터를 input에 추가하는 함수
   * @param detail 선택한 주소의 자세한 정보가 들어가 있는 json
   */
  function addComplete({detail: {data}}) {
    console.log("addComplete 함수 : " + JSON.stringify(data));
    $shpZip = data.zonecode;
    $shpAddr = data.roadAddress;
    addToggle = false;
  }

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
  let tel = "";
  const selectedOption = "1";

  function telBlur() {
    tel = tel.replace(/\D/g, "");
    if (tel.length == 11) {
      tel = tel.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
  }

  //근무시간탭 요일 근무체크
  function dtmMonTypeFunc(event) {
    let dtmMonType = event.target.value;
  }

  function dtmTueTypeFunc(event) {
    let dtmTueType = event.target.value;
  }

  function dtmWedTypeFunc(event) {
    let dtmWedType = event.target.value;
  }

  function dtmThuTypeFunc(event) {
    let dtmThuType = event.target.value;
  }

  function dtmFriTypeFunc(event) {
    let dtmFriType = event.target.value;
  }

  function dtmSatTypeFunc(event) {
    let dtmSatType = event.target.value;
  }

  function dtmSunTypeFunc(event) {
    let dtmSunType = event.target.value;
  }

  async function drstGenSave() {
    let jsonStr = makeStr({
      shpId: $susrShpId,
      shp_stat: shp_stat,
      shpType: "D",
      shpName: $shpName,
      shpStat: "0",
      shpVstYon: $shpVstYon,
      shpCtlsYon: $shpCtlsYon,
      shpRegUsr: "1",
      shpStopFrom: $shpStopFrom,
      shpStopTo: $shpStopTo,
      dateFormatEnt: "yyyy-mm-dd",
      shpRegNo: $shpRegNo,
      shpPhrsName: $shpPhrsName,
      dateFormat: "yyyy-mm-dd",
      shpZip: $shpZip,
      shpAddr: $shpAddr,
      shpAddrDtl: $shpAddrDtl,
      shpSido: $shpSido,
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
      shpId: $susrShpId,
    });
    console.log("약국일반 등록 : " + jsonStr);

    let url = "";
    if (susrShpId == -1) {
      url = shopUrlAddr + "/v1/Shop/insertShopInfo";
      console.log("인서트문");
    } else {
      url = shopUrlAddr + "/v1/Shop/updateShopInfo";
      console.log("업데이트문");
    }

    let res = await postAPI(url, jsonStr);
    console.log("denGenSave : " + JSON.stringify(res.resultVO));
  }

  async function workHourSave2() {
    let jsonStr = makeStr({
      dtmID: String($susrShpId),
      dtmShpId: String($susrShpId),
      dtmMonType: $dtmMonType,
      dtmMonFrom: $dtmMonFrom,
      dtmMonTo: $dtmMonTo,
      dtmTueType: $dtmTueType,
      dtmTueFrom: $dtmTueFrom,
      dtmTueTo: $dtmTueTo,
      dtmWedType: $dtmWedType,
      dtmWedFrom: $dtmWedFrom,
      dtmWedTo: $dtmWedTo,
      dtmThuType: $dtmThuType,
      dtmThuFrom: $dtmThuFrom,
      dtmThuTo: $dtmThuTo,
      dtmFriType: $dtmFriType,
      dtmFriFrom: $dtmFriFrom,
      dtmFriTo: $dtmFriTo,
      dtmSatType: $dtmSatType,
      dtmSatFrom: $dtmSatFrom,
      dtmSatTo: $dtmSatTo,
      dtmSunType: $dtmSunType,
      dtmSunFrom: $dtmSunFrom,
      dtmSunTo: $dtmSunTo,
      dtmRegDttm: $dtmRegDttm,
      dtmRegUsr: "1",
      dtmRegUsrName: $dtmRegUsrName,
      dtmRegUsrType: "S",
      dateFormat: "yyyy-mm-dd",
    });
    console.log("afsdfasdfasdf" + jsonStr);

    let url = "";
    if (susrShpId == -1) {
      url = shopUrlAddr + "/v1/Shop/insertDrugStoreTime";
      console.log("인서트문");
    } else {
      url = shopUrlAddr + "/v1/Shop/updateDrugStoreTime";
      console.log("업데이트문" + url);
      console.log("업데이트문" + jsonStr);
    }
    let res = await postAPI(url, jsonStr);
    console.log("dtmMonType dtmMonType dtmMonType : " + res.resultVO);
  }

  //휴일관리 그리드 시작
  let rNum = "";

  async function holidayGridSet() {
    const holInfoUrl = shopUrlAddr + "/v1/Shop/selectShopHolidayList?shpId=" + $susrShpId;
    let resData_holInfo = await getAPI(holInfoUrl);
    let holInfoList = resData_holInfo;
    console.log("홀인포리스트 : " + JSON.stringify(holInfoList[0]));

    rNum = holInfoList.rNum;
    $shdyFrom = holInfoList.shdyFrom;
    $shdyTo = holInfoList.shdyTo;
    $shdyTitl = holInfoList.shdyTitl;
    $shdyDesc = holInfoList.shdyDesc;

    console.log("호호홀리데이 호호홀리데이 : ");
    data = holInfoList.map(({rNum, shdyFrom, shdyTo, shdyTitl, shdyDesc}) => [
      rNum,
      shdyFrom,
      shdyTo,
      shdyTitl,
      shdyDesc,
    ]);
  }

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
  const columns = ["번호", "시작일", "종료일", "휴일명", "안내문구"];

  let data = [["1", "2023.02.11", "2023.02.11", "생일연차", "축하합니다"]];
  let checkedThis = true;

  let ntcList = [];
  let rowNumHol = "";
  let holInfoList = [""];

  async function rsvGridSet() {
    const holInfoUrl = shopUrlAddr + "/v1/Shop/selectShopHolidayList?shpId=" + $susrShpId;
    let resData_holInfo = await getAPI(holInfoUrl);
    holInfoList = resData_holInfo;
    console.log("holInfoList : " + JSON.stringify(holInfoList[0]));
    console.log("holInfoList.length : " + holInfoList.length);

    for (let i = 0; i < holInfoList.length; i++) {
      ntcList = JSON.stringify(holInfoList[i]);
      console.log("ntcList : " + ntcList);
    }
  }

  async function gridSet() {
    const holInfoUrl = shopUrlAddr + "/v1/Shop/selectShopHolidayList?shpId=" + $susrShpId; //+ "&shdyTitl="+$holTitlget;
    let resData_holInfo = await getAPI(holInfoUrl);
    holInfoList = resData_holInfo;
    console.log("조건맞게 휴일 찾기 : " + JSON.stringify(holInfoList[0]));
    for (let i = 0; i < holInfoList.length; i++) {
      ntcList = JSON.stringify(holInfoList[i]);
      console.log("ntcList : " + ntcList);
    }
  }

  let isActive = false;
  let titlSave = "";

  async function getRowTitl(event) {
    const targetRow = event.target.closest("tr");
    const cellIndex = Array.from(targetRow.children).indexOf(event.target.parentNode);

    // Check if there is a fourth <td> in the row
    if (cellIndex >= 3) {
      const fourthCellContent = targetRow.children[3].textContent;
      console.log("Fourth <td> content:", fourthCellContent);
      titlSave = fourthCellContent;
    } else {
      console.warn("The row does not have a fourth <td> element.");
    }
  }

  async function delHolidayYesLogic() {
    isActive = !isActive;
    console.log("delHolidayYesLogic 함수 안 titlSave : " + titlSave);
    //아래 titlSave 제대로 받아오는지 점검하고 해당 쿼리쪾에서 titlSave랑 일치할시 삭제하도록 변경
    if (isActive == true) {
      const url = shopUrlAddr + "/v1/Shop/deleteShopHoliday";
      const jsonStr = makeStr({shdyId: String($susrShpId), shdyTitl: titlSave});
      let res = await postAPI(url, jsonStr);
      console.log("삭제완료 " + res);
    }
  }

  //휴일관리 그리드 끝

  //휴일 등록 팝업(페이지)으로 이동
  function holAddPage() {
    console.log("휴일 등록 팝업 띄움. 여긴 awDrstDtl 페이지!");
    onHoliday("holiday_add");
  }

  //휴일 삭제 팝업 띄우기
  function holDelPage() {
    //
  }

  //휴일등록팝업시작
  let popUp = false;
  let popup_hm = false;

  function holAddButton() {
    console.log("holAddButton 버튼 누름 :");
    popup_hm = true;
    console.log(popup_hm);
  }

  let shdyFromDrugHol = "";
  let shdyToDrugHol = "";
  let shdyTitlDrugHol = "";

  //휴일삭제팝업
  let popup_hm2 = false;

  function holDelButton() {
    getRowTitl(event);
    console.log("holDelButton 버튼 누름 :");
    popup_hm2 = true;
    console.log(popup_hm2);
  }

  //닫기 버튼
  function xButton() {
    console.log("xbutton");
    popup_hm = false;
  }

  function xButton2() {
    console.log("xbutton2");
    popup_hm2 = false;
  }

  function contBlur() {
    tel = tel.replace(/\D/g, "");
    if (tel.length == 11) {
      tel = tel.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
  }

  async function addHoliday() {
    let jsonStr = makeStr({
      shdyId: $susrShpId,
      shdyFrom: $shdyFrom,
      dateFormatEnt: "yyyy-mm-dd",
      shdyTo: $shdyTo,
      shdyTitl: $shdyTitl,
      shdyDesc: $shdyDesc,
      shdyRegUsr: $susrShpId,
      shdyRegUsrType: "1",
    });
    console.log("인서트 홀리데이 제이쓴 스트링 : " + jsonStr);
    const url = shopUrlAddr + "/v1/Shop/insertShopHoliday";
    let res = await postAPI(url, jsonStr, localStorage.getItem("bizportal-access-token"));
    console.log("호올리데이 리절트 브이오 " + res);
  }
</script>

<!--    <section id="head">-->
<!--        <button type="button" data-url="Javascript:onMenuSlide()">-->
<!--            <i class="icon-arrow icon-chevron-left"></i>-->
<!--            <i class="icon-menu"></i>-->
<!--        </button>-->
<!--        <h1>{$susrShpName}</h1>-->
<!--        <div class="admin">-->
<!--            <i class="icon-account_circle" on:click={()=>goto(URL.awChngPw)}></i>-->
<!--            <span><b>{$susrName}</b>님</span>-->
<!--            <button type="button" class="btn_03 btn_xs"  on:click={logout}>Logout</button>-->
<!--        </div>-->
<!--    </section>-->

<section id="con">
  <!--        <div id="menu">-->
  <!--            <h1></h1>-->
  <!--            <div class="lnb">-->
  <!--    -->
  <!--            </div>-->
  <!--            <div class="copyright">-->
  <!--                BIT Computer.-->
  <!--            </div>-->
  <!--        </div>-->

  <div id="content">
    <!-- content S -->
    <h2>약국 정보</h2>
    <div class="tab_container">
      <p class="required_box"><span class="required">*</span> 는 필수입력 정보입니다.</p>
      <div class="tabs">
        <ul>
          <li class="first"><a href="#" rel="tab1">약국일반</a></li>
          <li><a href="#" rel="tab2">근무시간</a></li>
          <li><a href="#" rel="tab3">휴일관리</a></li>
        </ul>
      </div>
      <div id="tab1" class="tab_content active">
        <form action="/shop/awDrstDtl" method="PUT">
          <div class="form_table">
            <table>
              <colgroup>
                <col style="width:12%;"/>
                <col style="width:38%;"/>
                <col style="width:12%;"/>
                <col style="width:38%;"/>
              </colgroup>
              <tr>
                <th class="ess3">약국명</th>
                <td colspan="3">
                  <input type="text" bind:value={$shpName}/>
                  <span>(사업자등록증 : 제출완료)</span>
                  <button type="button" class="mbtn_b" name="" id="">등록/변경</button>
                </td>
              </tr>
              <tr>
                <th class="ess3">주소</th>
                <td colspan="3">
                  <div class="address_box_1">
                    <input type="text" class="w90" bind:value={$shpZip}/>
                    <input type="text" bind:value={$shpAddr}/>
                    <button type="button" class="mbtn_n_5" on:click={() => (addToggle = !addToggle)}>주소검색</button>

                    {#if addToggle}
                      <div>
                        <Daum height="500px" autoClose="true" on:complete={addComplete}/>
                      </div>
                    {/if}
                  </div>
                  <div class="address_box_2">
                    <input type="text" bind:value={$shpAddrDtl}/>
                    <div class="mappin">
                      (위도 : <input type="text" value={$shpLongi}/>
                      경도 : <input type="text" value={$shpLati}/>)
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <th class="ess3">상태</th>
                <td colspan="3">
                  <label
                  ><input type="radio" name="radio2" id="" bind:group={shp_stat} value="0"/><span>정상</span></label
                  >
                  <label
                  ><input type="radio" name="radio2" id="" bind:group={shp_stat} value="8"/><span>중지</span></label
                  >
                  <span>(중지기간 : </span>
                  <label class="select_data"
                  ><input
                          type="text"
                          id="dateFrom"
                          on:input={(e) => {
                        dateFrom = e.target.value;
                      }}
                          bind:value={dateFrom}
                  /></label
                  >
                  <span> ~ </span>
                  <label class="select_data"
                  ><input
                          type="text"
                          id="dateTo"
                          on:input={(e) => {
                        dateTo = e.target.value;
                      }}
                          bind:value={dateTo}
                  /></label
                  >

                  )
                  <label
                  ><input type="radio" name="radio2" id="" bind:group={shp_stat} value="9"/><span>해지</span></label
                  >
                </td>
              </tr>
              <tr>
                <th class="ess3">접수여부</th>
                <td colspan="3">
                  <label
                  ><input type="radio" name="radio3" id="" bind:group={$shpCtlsYon} value="Y"/><span>접수</span
                  ></label
                  >
                  <label
                  ><input type="radio" name="radio3" id="" bind:group={$shpCtlsYon} value="N"/><span>중지</span
                  ></label
                  >
                  <span>(중지기간 : </span>
                  <label class="select_data"
                  ><input
                          type="text"
                          id="dateFrom2"
                          on:input={(e) => {
                        dateFrom2 = e.target.value;
                      }}
                          bind:value={dateFrom2}
                  /></label
                  >
                  <span> ~ </span>
                  <label class="select_data"
                  ><input
                          type="text"
                          id="dateTo2"
                          on:input={(e) => {
                        dateTo2 = e.target.value;
                      }}
                          bind:value={dateTo2}
                  /></label
                  >

                  )
                </td>
              </tr>
              <tr>
                <th class="ess3">대표약사</th>
                <td><input type="text" class="w100p" name="" id="" bind:value={$shpPhrsName}/></td>
                <th class="ess3">전화번호</th>
                <td>
                  <input type="text" required id="" name="" bind:value={$shpTel} on:blur={telBlur}/>
                </td>
              </tr>
              <tr>
                <th class="ess3">담당자명</th>
                <td><input type="text" class="w100p" name="" id="" bind:value={$shpPhrsName}/></td>
                <th class="ess3">연락처</th>
                <td>
                  <input type="text" required id="" name="" bind:value={$shpContTel} on:blur={contBlur}/>
                </td>
              </tr>
              <tr>
                <th class="ess3">약국설명</th>
                <td colspan="3">
                  <div class="input_box_no">
                    <input class="w100p" type="text" name="" bind:value={$shpIntrTitl}/>
                    <div class="no">(10/30 자)</div>
                  </div>
                  <div class="input_box_no">
                    <textarea class="w100p" name="" bind:value={$shpIntrCnts}></textarea>

                    <div class="no">(10/150 자)</div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="ess3">약국로고</th>
                <td>
                  <input
                          type="file"
                          class="w150p"
                          action="이 데이터들을 받을 파일"
                          method="post"
                          enctype="multipart/form-data"
                  />
                  <span>(크기 600x400)</span>
                </td>
                <th class="ess3">가입일</th>
                <td>
                  <label class="select_data"
                  ><input
                          type="text"
                          id="dateReg"
                          on:input={(e) => {
                        dateReg = e.target.value;
                      }}
                          bind:value={dateReg}
                  /></label
                  >
                </td>
              </tr>
            </table>
          </div>

          <div class="btn_wrap">
            <button type="button" class="btn_02" on:click={() => drstGenSave()}>저장</button>
          </div>
        </form>
      </div>

      <div id="tab2" class="tab_content">
        <form action="/shop/awDrstDtl" method="PUT">
          <div class="form_table">
            <table class="drst_schedule">
              <colgroup>
                <col style="width:100px ;"/>
              </colgroup>
              <tr>
                <th class="ess">월</th>
                <td>
                  <select bind:value={$dtmMonType} on:change={dtmMonTypeFunc}>
                    <option value="0">근무</option>
                    <option value="1">휴무</option>
                  </select>
                  <span></span>
                  <label
                  ><span>근무시작 :</span><input type="text" bind:value={$dtmMonFrom}/>
                    <label><span>근무종료 :</span><input type="text" bind:value={$dtmMonTo}/> </label></label
                  ></td
                >
              </tr>
              <tr>
                <th class="ess">화</th>
                <td>
                  <select bind:value={$dtmTueType} on:change={dtmTueTypeFunc}>
                    <option value="0">근무</option>
                    <option value="1">휴무</option>
                  </select>
                  <span></span>
                  <label
                  ><span>근무시작 :</span><input type="text" bind:value={$dtmTueFrom}/>
                    <label><span>근무종료 :</span><input type="text" bind:value={$dtmTueTo}/> </label></label
                  ></td
                >
              </tr>
              <tr>
                <th class="ess">수</th>
                <td>
                  <select bind:value={$dtmWedType} on:change={dtmWedTypeFunc}>
                    <option value="0">근무</option>
                    <option value="1">휴무</option>
                  </select>
                  <span></span>
                  <label
                  ><span>근무시작 :</span><input type="text" bind:value={$dtmWedFrom}/>
                    <label><span>근무종료 :</span><input type="text" bind:value={$dtmWedTo}/> </label></label
                  ></td
                >
              </tr>
              <tr>
                <th class="ess">목</th>
                <td>
                  <select bind:value={$dtmThuType} on:change={dtmThuTypeFunc}>
                    <option value="0">근무</option>
                    <option value="1">휴무</option>
                  </select>
                  <span></span>
                  <label
                  ><span>근무시작 :</span><input type="text" bind:value={$dtmThuFrom}/>
                    <label><span>근무종료 :</span><input type="text" bind:value={$dtmThuTo}/> </label></label
                  ></td
                >
              </tr>
              <tr>
                <th class="ess">금</th>
                <td>
                  <select bind:value={$dtmFriType} on:change={dtmFriTypeFunc}>
                    <option value="0">근무</option>
                    <option value="1">휴무</option>
                  </select>
                  <span></span>
                  <label
                  ><span>근무시작 :</span><input type="text" bind:value={$dtmFriFrom}/>
                    <label><span>근무종료 :</span><input type="text" bind:value={$dtmFriTo}/> </label></label
                  ></td
                >
              </tr>
              <tr>
                <th class="ess">토</th>
                <td>
                  <select bind:value={$dtmSatType} on:change={dtmSatTypeFunc}>
                    <option value="0">근무</option>
                    <option value="1">휴무</option>
                  </select>
                  <span></span>
                  <label
                  ><span>근무시작 :</span><input type="text" bind:value={$dtmSatFrom}/>
                    <label><span>근무종료 :</span><input type="text" bind:value={$dtmSatTo}/> </label></label
                  ></td
                >
              </tr>
              <tr>
                <th class="ess">일</th>
                <td>
                  <select bind:value={$dtmSunType} on:change={dtmSunTypeFunc}>
                    <option value="0">근무</option>
                    <option value="1">휴무</option>
                  </select>
                  <span></span>
                  <label
                  ><span>근무시작 :</span><input type="text" bind:value={$dtmSunFrom}/>
                    <label><span>근무종료 :</span><input type="text" bind:value={$dtmSunTo}/> </label></label
                  ></td
                >
              </tr>
            </table>
          </div>

          <div class="btn_wrap">
            <button type="button" class="btn_02" on:click={() => workHourSave2()}>저장</button>
          </div>
        </form>
      </div>

      <div id="tab3" class="tab_content">
        <div class="form_table list">
          <div class="ar pb10 txt_r">
            <button type="button" class="mbtn_b_3" on:click={holAddButton}>등록</button>
            <!--<button type="button" class="mbtn_o_6" value="삭제" on:click={holDelButton} >삭제</button> -->
          </div>
          <!--휴일관리 그리드 시작-->
          <table>
            <colgroup>
              <col span="1" style="width: 10%"/>
              <col span="1" style="width: 20%"/>
              <col span="1" style="width: 20%"/>
              <col span="1" style="width: 20%"/>
              <col span="1" style="width: 20%"/>
              <col span="1" style="width: 10%"/>
            </colgroup>
            <thead>
            <tr>
              <th>번호</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>휴일명</th>
              <th>안내문구</th>
              <th></th>
            </tr>
            </thead>
            <tbody class="list">
            {#each holInfoList as arr}
              <tr>
                <td>{arr.rnum}</td>
                <td>{arr.shdyFrom}</td>
                <td>{arr.shdyTo}</td>
                <td>{arr.shdyTitl}</td>
                <td>{arr.shdyDesc}</td>
                <td>
                  <button type="button" class="mbtn_o_6" value="삭제" on:click={holDelButton}>삭제</button>
                </td>
              </tr>
            {/each}
            </tbody>
          </table>
          <!--휴일관리 그리드 끝-->
        </div>
        <!-- 페이징 S -->
      </div>
    </div>

    <!-- content E -->
    <footer></footer>
  </div>
</section>

<PopUp_hm {popup_hm}>
  <section class="full_layer_hm" id="holiday_add">
    <!--<form action="../shp/awHsptDtl" method="PUT">-->
    <!--<div class="bg"></div>-->
    <div class="box_1 holiday">
      <p class="text_tit">휴일등록</p>
      <!--<button type="button" class="modal_close" on:click={xButton}><i class="xi-close-min"></i></button>-->

      <hr/>
      <div class="form_table">
        <!--<form action="/shop/awHoliday" method="PUT">-->
        <table class="holiday_tbl">
          <tr>
            <th>기간</th>
            <td>
              <div class="form_inline">
                <input type="date" bind:value={$shdyFrom}/>
                <span> ~ </span>
                <input type="date" bind:value={$shdyTo}/><!---->
                <!--<button type="button" class="mbtn_b" on:click={() => { /* Add duplication check logic here */ }}>중복확인</button>-->
              </div>
            </td>
          </tr>
          <tr>
            <th>휴일명</th>
            <td>
              <input type="text" bind:value={$shdyTitl}/><!---->
            </td>
          </tr>
          <tr>
            <th>안내문구 :</th>
            <td>
              <textarea class="desc" bind:value={$shdyDesc}></textarea><!---->
            </td>
          </tr>
        </table>
        <!--</form>-->
      </div>
      <div class="btn_wrap">
        <button type="submit" class="btn_02" on:click={() => addHoliday()}>저장</button>
        <button class="btn_02" on:click={() => xButton()}>취소</button>
      </div>
    </div>
    <!--</form>-->
  </section>
</PopUp_hm>

<!-- 휴일관리 - 삭제팝업 -->
<PopUp_hm2 {popup_hm2}>
  <section class="full_layer_hm" id="holiday_del">
    <div class="box_1 holiday">
      <p class="text_tit">휴일을 삭제하시겠습니까?</p>
      <hr/>

      <div class="btn_wrap">
        <!--<button type="submit" class="btn_02" on:click={()=>delHoliday()}>예</button>-->
        <button type="submit" class="btn_02" on:click={() => delHolidayYesLogic()}>예</button>
        <button class="btn_02" on:click={() => xButton2()}>아니오</button>
      </div>
    </div>
  </section>
</PopUp_hm2>
<!--shp/awHoliday 가져온거 끝 -->
