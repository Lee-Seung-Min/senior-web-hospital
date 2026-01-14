<script>
  import {DateInput} from 'date-picker-svelte'
  import {onMount} from "svelte";
  import {getAPI} from "$lib/js/getAPI";
  import {makeStr} from "$lib/js/makeStr";
  import {postAPI} from "$lib/js/postAPI";
  import {adminUrlAddr, urlAddr} from "$lib/js/urlAddr";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import Grid from "gridjs-svelte";
  import "gridjs/dist/theme/mermaid.css";
  import Footer from "$lib/sub/Footer.svelte";
  import {URL} from '$lib/URL';
  import {susrId, susrLoginId, susrName, susrShpId, susrShpName} from "$lib/store/loginStore";
  import {getUserId} from "$lib/js/getUserId";
  import {isLogin} from "$lib/store/loginStore";
  import {updateRefresh} from "$lib/js/updateRefresh";
  import Exceljs from "exceljs";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";
  import {goto} from "$app/navigation";

  let isLoading = true;
  let activeTab = 0;

  const pagination = {
    enabled: true,
    limit: 5, // 한 페이지에 5개의 행을 표시
    // 서버 사이드 페이징을 사용하는 경우 추가 옵션을 설정할 수 있음
  };
  const style = {
    table: {
      border: '3px solid #ccc',
      'white-space': 'nowrap',
    },
    th: {
      'background-color': 'rgba(0, 0, 0, 0.1)',
      color: '#000',
      'border-bottom': '3px solid #ccc',
      'text-align': 'center',
    },
    td: {
      'text-align': 'center',
    }
  }
  const columns = [
    '번호',
    {
      name: '가맹점정산번호',
      hidden: true
    },
    '정산일',
    '매장명',
    '결제모듈',
    '정산상태',
    {
      name: '결제기간',
      hidden: true
    },
    '거래일(승인-취소)',
    '거래건수 합계',
    '거래금액 합계',
    '정산금액 합계',
    '일반수수료 합계',
    '일반부가세 합계',
    '무이자수수료 합계',
    '무이자부가세 합계',
    '포인트수수료 합계',
    '포인트부가세 합계',
    '에스크로수수료 합계',
    '에스크로부가세 합계',
    '인증수수료 합계',
    '인증부가세 합계',
    '쿠폰수수료 합계',
    '쿠폰부가세 합계',
    '복합결제수수료 합계',
    '복합결제부가세 합계',
  ]

  let data = [];
  let factyp = "";
  let sadjAdjId;

  let dateFrom = dateCalc(new Date, 0, 0, -7);
  let dateTo = new Date();
  let dateFormat = "yy-MM-dd";

  let padjMdlType = '결제모듈';
  let padjAdjDate = '정산일';
  let padjFrom = '거래일';
  let padjData = [];
  const padjColumns = [
    '번호',
    {
      name: '정산ID',
      hidden: true
    },
    {
      name: '결제ID',
      hidden: true
    },
    '환자명',
    '결제자명', '거래ID', '결제상태코드', '승인일자', '승인시간',
    '취소일자', '취소시간', '정산일자', '상품명', '금액',
    '과세', '비과세', '할인금액', '주 결제금액', '쿠폰금액',
    '복합결제금액', '복합결제금액(고객실차감)', '환경부담금', '할부개월', '일반수수료',
    '일반부가세', '무이자수수료', '무이자부가세', '포인트수수료', '포인트부가세',
    '에스크로수수료', '에스크로부가세', '인증수수료', '인증부가세', '쿠폰수수료',
    '쿠폰부가세', '복합결제수수료', '복합결제부가세', '입금금액'
  ]


  onMount(async () => {
    loginValidation();

    factyp = "H"
    adjmtGridSet().then(() => {
      isLoading = false;
    })
  });

  // Login validation
  async function loginValidation() {
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
  }
  // Fail login
  function handleTokenIssue(error) {
    console.error("Token issue:", error.message);
    if (error.message === "22005") {
      alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
      goto("/");
    }
    clearLocalStorageTokens();
  }
  // Fail login after token clear
  function clearLocalStorageTokens() {
    localStorage.setItem("bizportal-refresh-token", "");
    localStorage.setItem("bizportal-access-token", "");
  }

  function search() {
    adjmtGridSet()
  }

  // 날짜 계산
  function dateCalc(date, year, month, days) {
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + month);
    date.setFullYear(date.getFullYear() + year);
    return new Date(date);
  }

  // 검색 기간 설정
  function setSearchPeriod(tab) {
    activeTab = tab;
    if (tab == 1) {
      dateFrom = dateCalc(new Date, 0, -1, 0);
      dateTo = new Date();
    } else if (tab == 2) {
      dateFrom = dateCalc(new Date, 0, -3, 0);
      dateTo = new Date();
    } else if (tab == 3) {
      dateFrom = dateCalc(new Date, 0, -6, 0);
      dateTo = new Date();
    } else if (tab == 4) {
      dateFrom = dateCalc(new Date, -1, 0, 0);
      dateTo = new Date();
    }
  }


  // 기간내 정산리스트
  async function adjmtGridSet() {
    const url = adminUrlAddr + "/v1/adjminfo/getShopAdjmList?dateFrom=" +
      changeDate(dateFrom, '-') +
      "&dateTo=" +
      changeDate(dateTo, '-') +
      // "&sadjShpType=" +
      // sadjShpType +
      "&sadjShpId=" +
      $susrShpId;
    let resData = await getAPI(url);
    data = resData.resultVO.map(
      ({
         rowNum, sadjId, sadjAdjDate, sadjShpName, sadjMdlTypeDesc, sadjAdjStatDesc,
         sadjAdjFromTo, sadjAdjFrom, count, totalAmt, totalDepositAmt, totalGeneralFee,
         totalGeneralVat, totalNoIntFee, totalNoIntVat, totalPntFee, totalPntVat,
         totalEcFee, totalEcVat, totalAuthFee, totalAuthVat, totalCouponFee,
         totalCouponVat, totalCpxFee, totalCpxVat
       }) => [
        rowNum, sadjId, sadjAdjDate, sadjShpName, sadjMdlTypeDesc, sadjAdjStatDesc,
        sadjAdjFromTo, sadjAdjFrom, count, totalAmt, totalDepositAmt, totalGeneralFee,
        totalGeneralVat, totalNoIntFee, totalNoIntVat, totalPntFee, totalPntVat,
        totalEcFee, totalEcVat, totalAuthFee, totalAuthVat, totalCouponFee,
        totalCouponVat, totalCpxFee, totalCpxVat
      ]);
  }

  // 정산 상세데이터
  async function padjGridSet(args) {
    let sadjId = args.detail[1]._cells[1].data;
    padjAdjDate = args.detail[1]._cells[2].data;
    padjMdlType = args.detail[1]._cells[4].data;
    padjFrom = args.detail[1]._cells[7].data;
    let jsonStr = sadjId;
    const url = adminUrlAddr + "/v1/adjminfo/getPadjList";
    await postAPI(url, jsonStr).then((res) => {
      padjData = res.resultVO.map(
        ({
           rowNum, padjId, padjMpayId, mpayMbrName
           , mpayPatName, tid, stateCd, appDt, appTm
           , ccDt, ccTm, settlmntDt, goodsNm, amt
           , taxAmt, taxFreeAmt, discountAmt, payAmt, couponAmt
           , cpxAmt, fnCpxAmt, greenDeposit, instmntMon, generalFee
           , generalVat, noIntFee, noIntVat, pntFee, pntVat
           , ecFee, ecVat, authFee, authVat, couponFee
           , couponVat, cpxFee, cpxVat, depositAmt
         }) => [
          rowNum, padjId, padjMpayId, mpayMbrName
          , mpayPatName, tid, stateCd, appDt, appTm
          , ccDt, ccTm, settlmntDt, goodsNm, amt
          , taxAmt, taxFreeAmt, discountAmt, payAmt, couponAmt
          , cpxAmt, fnCpxAmt, greenDeposit, instmntMon, generalFee
          , generalVat, noIntFee, noIntVat, pntFee, pntVat
          , ecFee, ecVat, authFee, authVat, couponFee
          , couponVat, cpxFee, cpxVat, depositAmt
        ]
      )
    });
  }

  // 기간내 정산데이터 가져오기 for Excel
  async function getAdjmDetailDataForExcel() {
    isLoading = true;
    let jsonStr = makeStr({dateFrom: changeDate(dateFrom, '-'), dateTo: changeDate(dateTo, '-'), shpId: $susrShpId});
    const url = adminUrlAddr + "/v1/adjminfo/selectAdjmDataExcel";
    await postAPI(url, jsonStr)
      .then((res) => {
        let excelData = res.resultVO;
        createWorksheetForExcel(excelData);
      })
      .then(() => {
        isLoading = false;
      });
  }


  // 정산데이터 to 엑셀파일 변환
  function createWorksheetForExcel(excelData) {
    const workbook = new Exceljs.Workbook();  // excel 생성 객체
    const worksheet = workbook.addWorksheet('정산데이터');

    // 엑셀 컬럼 설정
    worksheet.columns = [
      {header: '순번', key: 'rowNum', style: {numFmt: '0', alignment: {horizontal: 'center'}}},
      // {header: '진료번호', key: 'dgnsId', style: {numFmt: '0'}},
      {header: '진료명', key: 'goodsNm', width: 15, style: {alignment: {horizontal: 'center'}}},
      {header: '환자명', key: 'mpayPatName', style: {alignment: {horizontal: 'center'}}},
      {header: '결제자명', key: 'mpayMbrName', style: {alignment: {horizontal: 'center'}}},
      {header: '결제상태', key: 'padjStatDesc', style: {alignment: {horizontal: 'center'}}},
      {header: '승인일자', key: 'appDtDesc', width: 15, style: {alignment: {horizontal: 'center'}}},
      {header: '승인시간', key: 'appTmDesc', width: 15, style: {alignment: {horizontal: 'center'}}},
      {header: '취소일자', key: 'ccDtDesc', width: 15, style: {alignment: {horizontal: 'center'}}},
      {header: '취소시간', key: 'ccTmDesc', width: 15, style: {alignment: {horizontal: 'center'}}},
      {header: '금액', key: 'amt', style: {numFmt: '#,##0', alignment: {horizontal: 'center'}}},
      {header: '과세', key: 'taxAmt', style: {numFmt: '#,##0', alignment: {horizontal: 'center'}}},
      {header: '비과세', key: 'taxFreeAmt', style: {numFmt: '#,##0', alignment: {horizontal: 'center'}}},
      {header: '일반수수료', key: 'generalFee', width: 10, style: {numFmt: '#,##0', alignment: {horizontal: 'center'}}},
      {header: '일반부가세', key: 'generalVat', width: 10, style: {numFmt: '#,##0', alignment: {horizontal: 'center'}}},
      {header: '입금금액', key: 'depositAmt', style: {numFmt: '#,##0', alignment: {horizontal: 'center'}}},
      {header: '정산일자', key: 'settlmntDtDesc', width: 15, style: {alignment: {horizontal: 'center'}}}
    ];

    // 엑셀 데이터 설정
    const data = excelData.map(item => {
      return {
        ...item,
        appDtDesc: changeDateForExcel(item.appDt),
        appTmDesc: changeTimeForExcel(item.appTm),
        ccDtDesc: changeDateForExcel(item.ccDt),
        ccTmDesc: changeTimeForExcel(item.ccTm),
        settlmntDtDesc: changeDateForExcel(item.settlmntDt)
      };
    });

    worksheet.insertRows(2, data);

    /* 컬럼 꾸미기 */
    const headerFill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: '6666ff'},
    }
    const headerFont = {bold: true, color: {argb: 'ffffff'}}

    for (let i = 1; i <= worksheet.columnCount; i++) {
      const headerEachCell = worksheet.getCell(`${String.fromCharCode(i + 64)}1`);
      headerEachCell.fill = headerFill;
      headerEachCell.font = headerFont;
      headerEachCell.alignment = { horizontal: 'center' };
    }

    const fileName = '바로닥터_정산현황_' + changeDate(new Date(), '') + '.xlsx';

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.URL.revokeObjectURL(url);
    })
      .catch((error) => {
        console.error('Error creating Excel file:', error);
      });
  }

  // 20240821 -> 2024년08월21일
  function changeDateForExcel(strDate) {
    if (strDate.length == 8) {
      const date = strDate;
      const year = date.slice(0, 4);
      const month = date.slice(4, 6);
      const day = date.slice(6, 8);
      const dateString = year + '년' + month + '월' + day + '일';
      return dateString;
    } else {
      return strDate;
    }
  }

  // 131511 -> 오후 1시 15분
  function changeTimeForExcel(strTime) {
    if (strTime.length == 6) {
      const tempTime = strTime;
      const hour = (tempTime.slice(0, 2) == 12) ? '12' : ("0" + tempTime.slice(0, 2) % 12).slice(-2);
      const minute = tempTime.slice(2, 4);
      const ampm = tempTime.slice(0, 2) >= 12 ? '오후' : '오전';
      const timeString = ampm + ' ' + hour + '시 ' + minute + '분';
      return timeString;
    } else {
      return strTime;
    }
  }

  // 날짜 포맷
  function changeDate(date, dateFormat) {
    const tempDate = date;
    const year = tempDate.getFullYear();
    const month = ('0' + (tempDate.getMonth() + 1)).slice(-2);
    const day = ('0' + tempDate.getDate()).slice(-2);
    const dateString = [year, month, day].join(dateFormat);
    return dateString;
  }
</script>

<section id="con">
    <div id="content">
        <div>
            <!-- content S -->
            <h2 class="page_title">정산 현황</h2>

            <div class="box_search period">
                <span>기간</span>
                <DateInput class="select_data" bind:value={dateFrom} format="{dateFormat}"/>
                <span>~</span>
                <DateInput class="select_data" bind:value={dateTo} format="{dateFormat}"/>
                <!--                <label class="select_data"><input type="text" class="datepicker" id="searchFrom" bind:value={dateFrom}/></label>-->
                <!--                ~-->
                <!--                <label class="select_data"><input type="text" class="datepicker" id="searchTo"bind:value={dateTo}/></label>-->

                <!--                <select>-->
                <!--                    <option value="">정산상태</option>-->
                <!--                </select>-->
                <div class="tabs tabs_pill period">
                    <ul>
                        <li class={activeTab === 1 ? "active" : ""}>
                            <a rel="tab5" on:click={() => setSearchPeriod(1)}>1개월</a>
                        </li>
                        <li class={activeTab === 2 ? "active" : ""}>
                            <a rel="tab6" on:click={() => setSearchPeriod(2)}>3개월</a>
                        </li>
                        <li class={activeTab === 3 ? "active" : ""}>
                            <a rel="tab7" on:click={() => setSearchPeriod(3)}>6개월</a>
                        </li>
                        <li class={activeTab === 4 ? "active" : ""}>
                            <a rel="tab8" on:click={() => setSearchPeriod(4)}>1년</a>
                        </li>
                    </ul>
                </div>
                <div class="btn_box">
                    <!-- <label><input type="text" name="" id=""/></label> -->
                    <button type="button" class="mbtn_n_5" on:click={search}>검색</button>
                    <button type="button" class="mbtn_n_5" on:click={getAdjmDetailDataForExcel}>자료받기</button>
                </div>
            </div>

            <!-- 목록 S -->
            <div class="form_table list">
                <Grid {data} {columns} {style} {pagination} on:rowClick={padjGridSet}/>
            </div>
        </div>
        <!-- 목록 E -->
        <div>
            <h2 class="page_title">정산 상세정보 / {padjMdlType} / {padjAdjDate}</h2>
            <div class="form_table list">
                <Grid data={padjData} columns={padjColumns} {style}/>
            </div>
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
            <input type="text" name="" id=""/><span class="txt_red">사용불가</span>
            <p class="text_info">* 영어대소문자, 숫자, 특수문자만 사용 가능</p>
        </label>
        <label>
            <input type="text" name="" id=""/><span class="txt_blue">일치</span>
        </label>
        <p class="btn_wrap inline">
            <button type="button" class="btn_02 small close_btn">변경</button>
            <button type="button" class="btn_03 small close_btn">취소</button>
        <p>
    </div>
</section>
<!-- 즐겨찾기 E -->

<!-- PageLoader -->
{#if isLoading}
    <PageLoader/>
{/if}