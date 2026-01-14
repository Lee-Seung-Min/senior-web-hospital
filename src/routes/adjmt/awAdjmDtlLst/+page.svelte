<script>
  import { URL } from "$lib/URL";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { DateInput } from "date-picker-svelte";
  import { onMount } from "svelte";
  import { getAPI } from "$lib/js/getAPI";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import { adminUrlAddr, urlAddr } from "$lib/js/urlAddr";
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
  import { getUserId } from "$lib/js/getUserId";
  import { isLogin } from "$lib/store/loginStore";
  import { updateRefresh } from "$lib/js/updateRefresh";

  const style = {
    table: {
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
  const columns = [
    "번호",
    "결제액",
    "수수료",
    "서비스료",
    "정산액",
    "결제일",
    "회원명",
    "환자명",
    "결제구분",
    "결제상태",
    {
      name: "정산번호",
      hidden: true,
    },
  ];

  let data = [
    [
      "1",
      "23-03-14",
      "174,000",
      "4,000",
      "10,000",
      "160,000",
      "정산전",
      "23-02-28 ~ 23-03-07",
    ],
    [
      "2",
      "23-01-05",
      "450,000",
      "10,000",
      "25,000",
      "415,000",
      "정산전",
      "23-02-20 ~ 23-02-27",
    ],
  ];
  let dateFrom = "";
  let dateTo = "";
  let factyp = "";
  let sadjAdjId;

  let sadjAdjDate = "";
  let sadjAdjFromTo = "";
  let sadjAdjRegUsr = "";
  let sadjAdjStat = "";
  let sadjAdjm = "";
  let sadjFee = "";
  let sadjPay = "";
  let sadjShpName = "";
  let sadjShpTel = "";
  let sadjSvc = "";
  let sadjVat = "";

  let sadjDlvFee = "";
  let sadjMbrName = "";
  let sadjPatName = "";
  let sadjPayAmt = "";
  let sadjPayDttm = "";
  let sadjPayMthd = "";
  let sadjdtlfee = "";
  let sadjPayNo = "";
  let sadjPayStatDesc = "";
  let sadjPayType = "";
  let sadjShpPay = "";
  let sadjShpVat = "";
  let sadjSvcDTTM = "";

  function todayValue() {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    return dateString;
  }

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

    sadjAdjId = $page.url.searchParams.get("sadjAdjId");
    console.log(sadjAdjId);
    factyp = "H";
    dateFrom = todayValue();
    dateTo = todayValue();
    // adjmtDtlGridSet()
    sadjmtInfo(sadjAdjId);
    adjmDtlGridSet(sadjAdjId);
  });

  function detailAdj(args) {
    let getData = args;
    console.log(getData);
    sadjPayAmt = getData.detail[1]._cells[1].data;
    sadjShpVat = getData.detail[1]._cells[2].data;
    sadjShpPay = getData.detail[1]._cells[3].data;
    sadjdtlfee = getData.detail[1]._cells[4].data;
    sadjPayDttm = getData.detail[1]._cells[5].data;
    sadjMbrName = getData.detail[1]._cells[6].data;
    sadjPatName = getData.detail[1]._cells[7].data;
    sadjPayMthd = getData.detail[1]._cells[8].data;
    sadjPayType = getData.detail[1]._cells[9].data;
    console.log(sadjPayType);
  }

  async function sadjmtDtlGridSet(sadjAdjId) {
    const url = adminUrlAddr + "/v1/adjminfo/getSadjinfo?sadjId=" + sadjAdjId;
  }

  async function sadjmtInfo(sadjAdjId) {
    const url = adminUrlAddr + "/v1/adjminfo/getSadjinfo?sadjId=" + sadjAdjId;
    let resData = await getAPI(url);
    console.log(resData);
    let sadjAdjInfo = resData.resultVO;
    setSadjmtInfo(sadjAdjInfo);
  }

  function setSadjmtInfo(sadjAdjInfo) {
    sadjAdjDate = sadjAdjInfo.sadjAdjDate;
    sadjAdjFromTo = sadjAdjInfo.sadjAdjFromTo;
    sadjAdjRegUsr = sadjAdjInfo.sadjAdjRegUsr;
    sadjAdjStat = sadjAdjInfo.sadjAdjStat;
    sadjAdjm = sadjAdjInfo.sadjAdjm;
    sadjFee = sadjAdjInfo.sadjFee;
    sadjPay = sadjAdjInfo.sadjPay;
    sadjShpName = sadjAdjInfo.sadjShpName;
    sadjShpTel = sadjAdjInfo.sadjShpTel;
    sadjSvc = sadjAdjInfo.sadjSvc;
    sadjVat = sadjAdjInfo.sadjVat;
  }

  async function adjmDtlGridSet(sadjAdjId) {
    if (factyp == "H") {
      console.log("adjmtGridSet");
      console.log("hospital");
      //프록시 적용 후
      const url =
        adminUrlAddr + "/v1/adjminfo/getShopAdjmDtlList?sadjmId=" + sadjAdjId;
      let resData = await getAPI(url);
      console.log(resData);
      data = resData.resultVO.map(
        ({
          rowNum,
          sadjPayAmt,
          sadjShpVat,
          sadjShpPay,
          sadjFee,
          sadjPayDttm,
          sadjMbrName,
          sadjPatName,
          sadjPayMthd,
          sadjPayStatDesc,
        }) => [
          rowNum,
          sadjPayAmt,
          sadjShpVat,
          sadjShpPay,
          sadjFee,
          sadjPayDttm,
          sadjMbrName,
          sadjPatName,
          sadjPayMthd,
          sadjPayStatDesc,
        ]
      );
    } else if (factyp == "D") {
      console.log("drugstore");
      //기존
      const url =
        adminUrlAddr +
        "/v1/adjminfo/getShopAdjmList?dateFrom=" +
        dateFrom +
        "&dateTo=" +
        dateTo +
        "&sadjShpType=" +
        factyp;
      let resData = await getAPI(url);
      console.log(resData);
      data = resData.resultVO.map(
        ({
          rowNum,
          sadjPayAmt,
          sadjShpVat,
          sadjShpPay,
          sadjFee,
          sadjPayDttm,
          sadjMbrName,
          sadjPatName,
          sadjPayMthd,
          sadjPayStatDesc,
        }) => [
          rowNum,
          sadjPayAmt,
          sadjShpVat,
          sadjShpPay,
          sadjFee,
          sadjPayDttm,
          sadjMbrName,
          sadjPatName,
          sadjPayMthd,
          sadjPayStatDesc,
        ]
      );
    }
  }
</script>

<div id="skipNavi">
  <a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a>
</div>
<section id="head">
  <button type="button" onClick="onMenuSlide()">
    <i class="icon-arrow icon-chevron-left"></i>
    <i class="icon-menu"></i>
  </button>
  <h1>바로닥터 가맹점</h1>
  <div class="admin">
    <i class="icon-account_circle"></i>
    <span><b>관리자</b>님</span>
    <button type="button" class="btn_03 btn_xs" onclick="">Logout</button>
  </div>
</section>

<section id="con">
  <div id="menu">
    <h1></h1>
    <div class="lnb"></div>
    <div class="copyright">BIT Doctor.</div>
  </div>

  <div id="content">
    <!-- content S -->
    <h2 class="page_title">정산 상세 목록</h2>

    <div class="form_table">
      <table>
        <tr>
          <th>가맹점명</th>
          <td>{sadjShpName}</td>
          <th>연락처</th>
          <td>{sadjShpTel}</td>
          <th>메모</th>
          <td colspan="2"></td>
        </tr>
        <tr>
          <th>정산일</th>
          <td>{sadjAdjDate}</td>
          <th>결제기간</th>
          <td>{sadjAdjFromTo}</td>
          <th>정산처리자</th>
          <td>{sadjAdjRegUsr}</td>
          <th>정산상태</th>
          <td>{sadjAdjStat}</td>
        </tr>
        <tr>
          <th>정산건수</th>
          <td>150</td>
          <th>결제액</th>
          <td>{sadjPay}</td>
          <th>수수료</th>
          <td>{sadjVat}</td>
          <th>정산액</th>
          <td>{sadjVat}</td>
        </tr>
        <p class="ess_info mt10">
          <button class="mbtn_b4">정산완료</button><button class="mbtn_b_9"
            >정산취소</button
          >
        </p>
      </table>
    </div>

    <!-- 목록 S -->
    <div class="form_table list">
      <Grid {data} {columns} {style} on:rowClick={detailAdj} />
      <!-- <div id="realgrid" class="realgrid h200"></div>
  <script>
  

    var gridView;
    var dataProvider;
    RealGridJS.setRootContext("/assets/realgrid");
    dataProvider = new RealGridJS.LocalDataProvider();
    gridView = new RealGridJS.GridView("realgrid");
    gridView.setDataSource(dataProvider);
    gridView.setDisplayOptions({
      fitStyle: "even"
    });
    var jsonData = [
      {
        "NO": "1",
        "SETTLEMENT_DATE": "2023-01-05",
        "PAYMENT": "88989",
        "FEE": "88989",
        "SERVICE_CHARGE": "88989",
        "SETTLEMENT": "88989",
        "PAYMENT_PERIOD": "23.01.05 ~ 23.02.05"
      },
      {
        "NO": "1",
        "SETTLEMENT_DATE": "2023-01-05",
        "PAYMENT": "88989",
        "FEE": "88989",
        "SERVICE_CHARGE": "88989",
        "SETTLEMENT": "88989",
        "PAYMENT_PERIOD": "23.01.05 ~ 23.02.05"
      }
    ];

    var columns = [

      {
        "name": "NO",
        "fieldName": "NO",
        "width": 60,
        "header": {
          "text": "번호"
        },
        "styles": {
          "textAlignment": "center",
        }
      },
      {
        "name": "SETTLEMENT_DATE",
        "fieldName": "SETTLEMENT_DATE",
        "width": 120,
        "dataType": "datetime",
        "datetimeFormat": "platform",
        "header": {
          "text": "정산일"
        },
        "styles": {
          "textAlignment": "center",
          "datetimeFormat": "yy.MM.dd"
        }
      },
      {
        "name": "PAYMENT",
        "fieldName": "PAYMENT",
        "dataType": "number",
        "width": 100,
        "header": {
          "text": "총결제액"
        },
        "styles": {
          "textAlignment": "far",
          "numberFormat": "#,##0"
        }
      },
      {
        "name": "FEE",
        "fieldName": "FEE",
        "dataType": "number",
        "width": 80,
        "header": {
          "text": "총수수료"
        },
        "styles": {
          "textAlignment": "far",
          "numberFormat": "#,##0"
        }
      },
      {
        "name": "SERVICE_CHARGE",
        "fieldName": "SERVICE_CHARGE",
        "dataType": "number",
        "width": 100,
        "header": {
          "text": "서비스료"
        },
        "styles": {
          "textAlignment": "far",
          "numberFormat": "#,##0"
        }
      },
      {
        "name": "SETTLEMENT",
        "fieldName": "SETTLEMENT",
        "dataType": "number",
        "width": 120,
        "header": {
          "text": "총정산대상"
        },
        "styles": {
          "textAlignment": "far",
          "numberFormat": "#,##0"
        }
      },
      {
        "name": "PAYMENT_PERIOD",
        "fieldName": "PAYMENT_PERIOD",
        "width": 200,

        "header": {
          "text": "결제기간"
        },
        "styles": {
          "textAlignment": "center",

        }
      }

    ];

    gridView.setColumns(columns);
    dataProvider.setFields(columns);
    dataProvider.setRows(jsonData);

    gridView.setStateBar({
      visible: false
    });



  </script> -->
    </div>

    <!-- 목록 E -->

    <div class="form_table">
      <h3>정산 상세 내역</h3>
      <p class="ess_info">
        <button class="mbtn_b4">저장</button><button class="mbtn_b_9"
          >취소</button
        >
      </p>
      <table>
        <colgroup>
          <col style="width:12% ;" />
          <col style="width:38% ;" />
          <col style="width:12% ;" />
        </colgroup>
        <tr>
          <th>회원명</th>
          <td>{sadjMbrName}</td>
          <th>환자명</th>
          <td>{sadjPatName}</td>
        </tr>
        <tr>
          <th>구분</th>
          <td>{sadjdtlfee}</td>
          <th>진료 및 처방일자</th>
          <td>{sadjSvcDTTM}</td>
        </tr>
        <tr>
          <th>결제방식</th>
          <td>{sadjPayMthd}</td>
          <th>결제일자</th>
          <td>{sadjPayDttm}</td>
        </tr>
        <tr>
          <th>결제금액</th>
          <td>{sadjPayAmt}</td>
          <th>수수료</th>
          <td>{sadjShpVat}</td>
        </tr>
        <tr>
          <th>정산금액</th>
          <td>{sadjShpPay}</td>
          <th>서비스료</th>
          <td></td>
        </tr>
      </table>
    </div>

    <!-- content E -->
    <footer>
      <p>Copyright Baro Doctor. All Rights Reserved.</p>
    </footer>
  </div>
</section>

<!-- 즐겨찾기 S -->
<section class="full_layer" id="changePw">
  <div class="bg"></div>
  <div class="box_1">
    <p class="text_tit">비밀번호 변경</p>
    <label>
      <input type="text" name="" id="" /><span class="txt_red">사용불가</span>
      <p class="text_info">* 영어대소문자, 숫자, 특수문자만 사용 가능</p>
    </label>
    <label>
      <input type="text" name="" id="" /><span class="txt_blue">일치</span>
    </label>
    <p class="btn_wrap inline">
      <button type="button" class="btn_02 small close_btn">변경</button>
      <button type="button" class="btn_03 small close_btn">취소</button>
    </p>
    <p></p>
  </div>
</section>
<!-- 즐겨찾기 E -->
