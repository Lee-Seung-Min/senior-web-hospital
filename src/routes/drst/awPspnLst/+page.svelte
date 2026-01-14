<script>
  // @ts-nocheck
  import { DateInput } from 'date-picker-svelte'
  import { onMount } from "svelte";
  import { getAPI } from "$lib/js/getAPI";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import { mobileUrlAddr, urlAddr } from "$lib/js/urlAddr";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import Grid from "gridjs-svelte";
  import Footer from "$lib/sub/Footer.svelte";
  import {susrId, susrLoginId, susrName, susrShpId, susrShpName} from "$lib/store/loginStore";
  import { getUserId } from "$lib/js/getUserId";
  import { isLogin } from "$lib/store/loginStore";
  import { updateRefresh } from "$lib/js/updateRefresh";
  
  function onMenuSlide(){}
  function onPspn(){}
  const style = {
    table: {
      border: '3px solid #ccc'
    },
    th: {
      'background-color': 'rgba(0, 0, 0, 0.1)',
      color: '#000',
      'border-bottom': '3px solid #ccc',
      'text-align': 'center'
    },
    td: {
      'text-align': 'center'
    }
  }
  const columns = [
		'번호',
    '진료예약일',
    '환자명',
    '회원명',
    '접수일',
    '배달방법',
    '병원',
    '의사명',
    '배송일',
    {
      name: '접수번호',
      hidden: true
    },
    {
      name: '병원처방접수번호',
      hidden: true
    }
    
	]

	let data = [
    [
      "1",
      "2023-01-05T09:01:00",
      "홍길동",
      "본인",
      "홍길동",
      "2023-01-05T09:01:00",
      "택배",
      "연세티스치과의원",
      "이만기",
      "2023-01-05T09:01:00"
    ],
    [
      "2",
      "2023-04-05T09:01:00",
      "홍길동",
      "본인",
      "홍길동",
      "2023-01-05T09:01:00",
      "택배",
      "연세티스치과의원",
      "이만기",
      "2023-01-05T09:01:00"
    ],
	];
  
  let drcpChangStat

  let drcpId="";
  let pspnId="";
  let drcpStatDesc = "";
  let drcpReqDttm = ""; 
  let drcpPatName = "";
  let drcpMbrName = "";
  let drcpShpName = "";
  let drcpPspnIssueNo = ""; 
  let drcpDlvFee = "";
  let drcpDlvNo = ""; 
  let drcpDlvDttm = "";
  let pdrgName = "";
  let pdrgOneTime = "";
  let pdrgOneday = "";
  let pdrgTotDay = "";
  let pdrgDesc = "";

  let date1 = new Date();
  let date2 = new Date();
  let dateFormat = "yy-MM-dd"
  
  async function changeDrcpStat(drcpId) {
    let drcpStat = drcpChangStat
    let jsonStr = makeStr({ drcpId, drcpStat});
    const url = urlAddr+"/shop/v1/dgns/updateDrcpInfo";
    let res = await postAPI(url, jsonStr);
    console.log(res.resultVO)
  }

  function todayValue(){
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month  + '-' + day;
    return dateString
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
                if(err.message == "22005"){ 
                alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
                goto("/");
                }
            }
            }else {
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

    // dateFrom = todayValue()
    // dateTo = todayValue()
    pspnGridSet()
  });
  
  function search(){
    pspnGridSet(); 
  }

  function changeDate(date){
    console.log("Function : changeDate");
    console.log(data);
    let year = date.getFullYear();
    year = String(year);
    console.log(year);
    let yy = year.substring(2,4);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let dateString = yy + '-' + month  + '-' + day;
    return dateString
  }

  async function pspnGridSet(){
    const url = mobileUrlAddr+"/v1/dgns/selectdrcplist?dateFrom="+
    // dateFrom +
    changeDate(date1) +
    "&dateTo=" + 
    changeDate(date2)+
    "&dgnsShpId="+
    $susrShpId;
    // dateTo;
    
    let resData = await getAPI(url);
    console.log(resData);
    data = resData.resultVO.map(({ rowNum, drcpReqtDttm, drcpMbrName, drcpPatName, drcpStatDesc, drcpRcptDttm, drcpHsptNamese, drcpDtrName, drcpDlvDttm, drcpId, pspnId }) => [ rowNum, drcpReqtDttm, drcpMbrName, drcpPatName, drcpStatDesc, drcpRcptDttm, drcpHsptNamese, drcpDtrName, drcpDlvDttm, drcpId, pspnId ]);
  }

  function setDrcpInfo(args){
    let getData= args
    drcpId = getData.detail[1]._cells[9].data
    pspnId = getData.detail[1]._cells[10].data
    console.log(pspnId)
    console.log(drcpId)
    getDrcpInfo(drcpId);
    getDrugList(pspnId);
  }

  async function getDrcpInfo(drcpId){
    const url = mobileUrlAddr+"/v1/dgns/selectdrcpinfo?drcpId="+
    drcpId;
    let resData = await getAPI(url);
    let drcpInfo = resData.resultVO
    console.log(drcpInfo)
    settingDrcpInfo(drcpInfo)
  }

  async function getDrugList(pspnId){
    const url = mobileUrlAddr+"/v1/dgns/selectpspndruglist?pspnId="+
    pspnId;
    let resData = await getAPI(url);
    let pspnInfo = resData.resultVO
    console.log(pspnInfo)
  }
  

  function settingDrcpInfo(drcpInfo){
    drcpStatDesc = drcpInfo.drcpStatDesc;
    drcpReqDttm = drcpInfo.drcpReqDttm;
    drcpPatName = drcpInfo.drcpPatName;
    drcpMbrName = drcpInfo.drcpMbrName;
    drcpShpName = drcpInfo.drcpShpName;
    drcpPspnIssueNo = drcpInfo.drcpPspnIssueNo;
    drcpDlvFee = drcpInfo.drcpDlvFee;
    drcpDlvNo = drcpInfo.drcpDlvNo;
    drcpDlvDttm = drcpInfo.drcpDlvDttm;
  }

</script>
<div id="skipNavi">
  <a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a>
</div>
<!--<section id="head">-->
<!--  <button type="button" onClick="onMenuSlide()">-->
<!--    <i class="icon-arrow icon-chevron-left"></i>-->
<!--    <i class="icon-menu"></i>-->
<!--  </button>-->
<!--  <h1>{$susrShpName}</h1>-->
<!--  <div class="admin">-->
<!--    <i class="icon-account_circle"></i>-->
<!--    <span><b>{$susrName}</b>님</span>-->
<!--    <button type="button" class="btn_03 btn_xs" onclick="">Logout</button>-->
<!--  </div>-->
<!--</section>-->

<section id="con">
<!--  <div id="menu">-->
<!--    <h1></h1>-->
<!--    <div class="lnb"></div>-->
<!--    <div class="copyright">-->
<!--      BIT Doctor.-->
<!--    </div>-->
<!--  </div>-->

  <div id="content">
    <!-- content S -->
    <h2>처방전 접수현황</h2>

    <div class="box_search">
      <span>기간</span>
      <DateInput bind:value={date1} format="{dateFormat}" /> <span>~</span> <DateInput bind:value={date2} format="{dateFormat}"/> 
      <!-- <label class="select_data"><input type="text" class="datepicker" id="searchFrom" bind:value={dateFrom}/></label>
      ~
      <label class="select_data"><input type="text" class="datepicker" id="searchTo"bind:value={dateTo}/></label> -->

      <select>
        <option value="">전체</option>
        <option value="">환자명</option>
        <option value="">진료과목</option>
        <option value="">상태</option>
      </select>
      <label><input type="text" name="" id="" /></label>
      <button type="button" class="mbtn_n_5" on:click={search}>검색</button>
      <button type="button" class="mbtn_n_9">초기화</button>
    </div>

    <!-- 목록 S -->
    <div class="form_table list">
      <Grid {data} {columns} {style} on:rowClick={setDrcpInfo}/>
      <!-- <div id="realgrid" class="realgrid"></div> -->
      <!-- <script>
        // JavaScript

        var gridView;
        var dataProvider;
        RealGridJS.setRootContext("np/src/assets/realgrid/");
        dataProvider = new RealGridJS.LocalDataProvider();
        gridView = new RealGridJS.GridView("realgrid");
        gridView.setDataSource(dataProvider);
        gridView.setDisplayOptions({
          fitStyle: "even"
        });
        var jsonData = [
          {
            "NO": "1",
            "RSRVT_DATE": "2023-01-05T09:01:00",
            "PTNT_NAME": "홍길동",
            "RELATIONSHIP": "본인",
            "MEMEBER_NAME": "홍길동",
            "RECEPTION_DATE":"2023-01-05T09:01:00",
            "HOW_DELIVER": "택배",
            "HOSPITAL": "연세티스치과의원",
            "DOCTOR": "이만기",
            "DELIVERY_DATE":"2023-01-05T09:01:00"
          },
          {
            "NO": "2",
            "RSRVT_DATE": "2023-04-05T09:01:00",
            "PTNT_NAME": "홍길동",
            "RELATIONSHIP": "본인",
            "MEMEBER_NAME": "홍길동",
            "RECEPTION_DATE":"2023-01-05T09:01:00",
            "HOW_DELIVER": "택배",
            "HOSPITAL": "연세티스치과의원",
            "DOCTOR": "이만기",
            "DELIVERY_DATE":"2023-01-05T09:01:00"
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
            "name": "RSRVT_DATE",
            "fieldName": "RSRVT_DATE",
            "width": 120,
            "dataType": "datetime",
            "datetimeFormat": "platform",
            "header": {
              "text": "접수신청일시"
            },
            "styles": {
              "textAlignment": "center",
              "datetimeFormat": "yy.MM.dd HH:mm"
            }
          },
          {
            "name": "PTNT_NAME",
            "fieldName": "PTNT_NAME",
            "width": 100,
            "header": {
              "text": "환자명"
            },
            "styles": {
              "textAlignment": "center",
              
            }
          },
          {
            "name": "RELATIONSHIP",
            "fieldName": "RELATIONSHIP",
            "width": 80,
            "header": {
              "text": "관계"
            },
            "styles": {
              "textAlignment": "center"
            }
          },
          {
            "name": "MEMEBER_NAME",
            "fieldName": "MEMEBER_NAME",
            "width": 100,
            "header": {
              "text": "회원명"
            },
            "styles": {
              "textAlignment": "center"
            }
          },
          {
            "name": "RECEPTION_DATE",
            "fieldName": "RECEPTION_DATE",
            "width": 120,
            "dataType": "datetime",
            "datetimeFormat": "platform",

            "header": {
              "text": "접수일시"
            },
            "styles": {
              "textAlignment": "center",
              "datetimeFormat": "yy.MM.dd HH:mm"
            }
          },
          {
            "name": "HOW_DELIVER",
            "fieldName": "HOW_DELIVER",
            "width": 100,
            "header": {
              "text": "배송방법"
            },
            "styles": {
              "textAlignment": "center"
            }
          },
          {
            "name": "HOSPITAL",
            "fieldName": "HOSPITAL",
            "width": 140,
            "header": {
              "text": "병원"
            },
            "styles": {
              "textAlignment": "center"
            }
          },
          {
            "name": "DOCTOR",
            "fieldName": "DOCTOR",
            "width": 80,
            "header": {
              "text": "처방의"
            },
            "styles": {
              "textAlignment": "center"
            }
          },
          {
            "name": "DELIVERY_DATE",
            "fieldName": "DELIVERY_DATE",
            "width": 120,
            "dataType": "datetime",
            "datetimeFormat": "platform",

            "header": {
              "text": "배송일"
            },
            "styles": {
              "textAlignment": "center",
              "datetimeFormat": "yy.MM.dd HH:mm"
            }
          }

        ];

        gridView.setColumns(columns);
        dataProvider.setFields(columns);
        dataProvider.setRows(jsonData);

        gridView.setStateBar({
          visible: false
        });


      </script>
    -->
    </div>
    <!-- 목록 E -->

    <!-- 페이징 S 
<div class="page">
<button type="button" class="fist"></button>
<button type="button" class="on">1</button>
<button type="button">2</button>
<button type="button">3</button>
<button type="button">4</button>
<button type="button">5</button>
<button type="button">6</button>
<button type="button">7</button>
<button type="button">8</button>
<button type="button">9</button>
<button type="button">10</button>
<button type="button" class="last"></button>
</div>
페이징 E -->

    <div class="form_table">
      <h3>접수상세</h3>
      <p class="ess_info">
        <select bind:value={drcpChangStat}>
          <option value="4">접수</option>
          <option value="5">조제중</option>
          <option value="6">조제완료</option>
          <option value="9">취소</option>
        </select>
        <button type="button" class="mbtn_n_4" on:click={()=>changeDrcpStat(drcpId)}>저장</button>
      </p>
      <table>
        <tr>
          <th>접수상태</th>
          <td>{drcpStatDesc}</td>
          <th>접수신청</th>
          <td>{drcpReqDttm}</td>
        </tr>
        <tr>
          <th>환 자 명</th>
          <td>{drcpPatName}</td>
          <th>회 원 명</th>
          <td>{drcpMbrName}</td>
        </tr>
        <tr>
          <th>발급병원</th>
          <td>{drcpShpName}</td>
          <th>발행번호</th>
          <td>{drcpPspnIssueNo}</td>
        </tr>
        <tr>
          <th>조제비</th>
          <td><input type="text"></td>
          <th>배송비</th>
          <td>{drcpDlvFee}</td>
        </tr>
        <tr>
          <th>배송번호</th>
          <td>{drcpDlvNo}</td>
          <th>배송일</th>
          <td>{drcpDlvDttm}<button type="button" class="mbtn_b changePw" style="float:right">등록</button></td>
        </tr>
      </table>
    </div>
    <div class="form_table">
      <h3>처방상세</h3>
      <p class="ess_info">
        <button type="button" class="mbtn_b dgns" on:click={()=>onPspn()}>처방전</button>
        <button type="button" class="mbtn_b" data-url="JavaScript:onNotify()">알림</button>
      </p>
      <table class="tbl_center">
        <tr>
          <th>처방 의약품의 명칭</th>
          <th>1회 투약량</th>
          <th>1일 투여횟수</th>
          <th>총 투약일수</th>
          <th>용법</th>
          <th>대체조제</th>
        </tr>
        <tr>
          <td>{pdrgName}</td>
          <td>{pdrgOneTime}</td>
          <td>{pdrgOneday}</td>
          <td>{pdrgTotDay}</td>
          <td>{pdrgDesc}</td>
          <td><button type="button" class="mbtn_b">선택</button>
          </td>
        </tr>
      </table>
      <Footer />
    </div>
    <!-- content E -->
  </div>
</section>

<!-- 즐겨찾기 S -->
<section class="full_layer" id="changePw">
  <div class="bg"></div>
  <div class="box_1 notify">
    <p class="text_tit">배송결과 등록</p>
    <button type="button" class="modal_close close_btn"><i class="xi-close-min"></i></button>
    <hr>
    <div class="form_table">
      <table>
        <tr>
          <th>환자명</th>
          <td>우희정</td>
          <th>접수일시</th>
          <td>2023-03-02 14:00</td>
        </tr>
        <tr>
          <th>배송구분</th>
          <td>택배</td>
          <th>배송사</th>
          <td>원격</td>
        </tr>
        <tr>
          <th>배송일</th>
          <td><label class="select_data"><input type="text" class="datepicker" /></label></td>
          <th>배송번호</th>
          <td><input type="text"></td>
        </tr>
      </table>
    </div>
    <p class="btn_wrap inline">
      <button type="button" class="btn_02 small close_btn">저장</button>
      <button type="button" class="btn_03 small close_btn">취소</button>
    <p>
  </div>
</section>
<section class="full_layer" id="alertWin">
  <div class="bg"></div>
  <div class="box_1">
    <p class="text_tit">알림</p>
    <div class="form_table">
      <table>
        <tr>
          <th>환자명</th>
          <td>우희정</td>
          <th>접수일시</th>
          <td>2023-03-02 14:00</td>
        </tr>
        <tr>
          <th>병원명</th>
          <td>비트의원</td>
          <th>진료항목</th>
          <td>감기</td>
        </tr>
        <tr>
          <th>배송구분</th>
          <td>방문수령</td>
          <th>재진/신규</th>
          <td>재진</td>
        </tr>
      </table>
    </div>
    <p class="btn_wrap inline">
      <button type="button" class="btn_04 small close_btn">상세보기</button>
    <p>
  </div>
</section>
<!-- 즐겨찾기 E -->
