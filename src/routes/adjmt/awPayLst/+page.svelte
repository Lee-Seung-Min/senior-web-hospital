<script>
    import {DateInput} from 'date-picker-svelte'
    import {onMount} from "svelte";
    import {getAPI} from "$lib/js/getAPI";
    import {makeStr} from "$lib/js/makeStr";
    import {postAPI} from "$lib/js/postAPI";
    import {adminUrlAddr, urlAddr} from "$lib/js/urlAddr";
    import PopUp from "$lib/sub/nav/PopUp.svelte";
    import Grid from "gridjs-svelte";
    import Footer from "$lib/sub/Footer.svelte";
    import {susrId, susrLoginId, susrName, susrShpId, susrShpName} from "$lib/store/loginStore";
    import {getUserId} from "$lib/js/getUserId";
    import {isLogin} from "$lib/store/loginStore";
    import {updateRefresh} from "$lib/js/updateRefresh";
    import PageLoader from "$lib/sub/pay/PageLoader.svelte";
    import {goto} from "$app/navigation";
    import { URL } from "$lib/URL";

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
        '결제일',
        '결제금액',
        '회원명',
        '환자명',
        '결제구분',
        '상태',
        '취소일',
        {
            name: '결제멤버번호',
            hidden: true
        },
        {
            name: '결제번호',
            hidden: true
        },
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

    let isLoading = true;
    let payCancelAlert = false;
    let payCancelPopup = false;
    let searchType;
    let payErrMsg = "";
    let dateFrom = "";
    let dateTo = "";
    let factyp = "";
    let mpayMbrId;
    let mpayId;
    let mpayNum = "";
    let payInfo = {mpayMbrId:"", mpayId:"", mpayMbrName:"", mpayPatName:"", mpayPayAmt:"", mpayPayDttm:null, mpayCnclDttm:null, mpayPayMthd:"", mpayPayNo:"", mpayStat:""};
    let mpayMbrName = "";
    let mpayPatName = "";
    let mpayPayAmt = "";
    let mpayPayDttm = "";
    let mpayPayMthd = "";
    let mpayPayNo = "";
    let mpayPayStat ="";

    let date1 = new Date();
    let date2 = new Date();
    let dateFormat = "yy-MM-dd"

    function todayValue() {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let dateString = year + '-' + month + '-' + day;
        return dateString
    }

    onMount(async () => {
        isLoading = false;

        loginValidation().then(() => {
          payGridSet();
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
        goto(URL.awLogin);
      }
      clearLocalStorageTokens();
    }
    // Fail login after token clear
    function clearLocalStorageTokens() {
      localStorage.setItem("bizportal-refresh-token", "");
      localStorage.setItem("bizportal-access-token", "");
    }

    function search() {
        payGridSet();
    }

    function setPayInfo(args) {
        let getData = args
        console.log("Data!!!!!!");
        console.log(data);
        console.log("getData!!!!!!");
        console.log(getData);
        mpayNum = getData.detail[1]._cells[0].data
        mpayMbrId = getData.detail[1]._cells[8].data
        mpayId = getData.detail[1]._cells[9].data
        console.log("mpayId: ", mpayId)
        getPayInfo(mpayId);

    }

    async function changePayStat(mpayId) {
        let mpayStat = 9
        let jsonStr = makeStr({mpayId, mpayStat});
        const url = adminUrlAddr + "/v1/payinfo/updateMbrPayInfo";
        let res = await postAPI(url, jsonStr);
        console.log(res.resultVO)
    }

    function changeDate(date) {
        console.log("Function : changeDate");
        console.log(data);
        let year = date.getFullYear();
        year = String(year);
        console.log(year);
        let yy = year.substring(2, 4);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        let dateString = yy + '-' + month + '-' + day;
        return dateString
    }

    async function getPayInfo(mpayId) {
        isLoading = true;
        const url = adminUrlAddr + "/v1/payinfo/getMemberPayDetailInfo?mpayId=" + mpayId;
        let resData = await getAPI(url);
        payInfo = resData.resultVO
        console.log("!!!!!!!!!!!")
        console.log(payInfo)
        // settingPayInfo(payInfo);
        isLoading = false;
    }

    function settingPayInfo(payInfo) {
        mpayMbrName = payInfo.mpayMbrName
        mpayPatName = payInfo.mpayPatName
        mpayPayAmt = payInfo.mpayPayAmt
        mpayPayDttm = payInfo.mpayPayDttm
        mpayPayMthd = payInfo.mpayPayMthd
        mpayPayNo = payInfo.mpayPayNo
        mpayId = payInfo.mpayId
        mpayPayStat = payInfo.mpayStat
    }

    async function payGridSet() {
        const url = adminUrlAddr + "/v1/payinfo/hsptPayPatientList?dateFrom=" +
            // dateFrom +
            changeDate(date1) +
            "&dateTo=" +
            // dateTo +
            changeDate(date2) +
            "&mpayShpId=" +
            $susrShpId
        let resData = await getAPI(url);
        console.log(resData);
        resData.resultVO.forEach((resItem) => {
            console.log(resItem.mpayPayDttm)
            // resItem.mpayPayDttm = (resItem.mpayPayDttm != null)? new Date(resItem.mpayPayDttm):''
            console.log(resItem.mpayCnclDttm)
            // resItem.mpayCnclDttm = (resItem.mpayCnclDttm != null)? new Date(resItem.mpayCnclDttm):''

        })
        data = resData.resultVO.map(({rowNum, mpayPayDttm, mpayPayAmt, mpayMbrName, mpayPatName, mpayPayMthd, mpayStatDesc, mpayCnclDttm, mpayMbrId, mpayId}) =>
            [rowNum, (mpayPayDttm != null) ? changeDate(new Date(mpayPayDttm)) : '', mpayPayAmt, mpayMbrName, mpayPatName, mpayPayMthd, mpayStatDesc, (mpayCnclDttm != null) ? changeDate(new Date(mpayCnclDttm)) : '', mpayMbrId, mpayId]);
        console.log(data);
    }
    async function goDgnsPayCancel() {
        isLoading = true;
        payCancelPopup = false;
        const jwt = localStorage.getItem("bizportal-access-token");
        const url = adminUrlAddr + "/v1/mpay/refund";
        let jsonStr = makeStr({ mpayId:payInfo.mpayId });
        await postAPI(url, jsonStr).then((res)=>{
            console.log("goDgnsPayCancel");
            console.log(res);
            if(res.code != 0) {
                console.log(res.resultVO.ErrorMsg);
                payErrMsg = res.resultVO.ErrorMsg;
                payCancelAlert = true;
            }
        });
        search();
        getPayInfo(payInfo.mpayId);
        isLoading = false;
    }
</script>

<div id="skipNavi">
    <a href="#left_wrap">전체메뉴 바로가기</a>
    <a href="#content">본문바로가기</a>
</div>

<section id="con">
    <div id="content">
        <!-- content S -->
        <h2 class="page_title">결제 현황</h2>

        <div class="box_search">
            <span>기간</span>
            <DateInput bind:value={date1} format="{dateFormat}"/>
            <span>~</span>
            <DateInput bind:value={date2} format="{dateFormat}"/>
            <!-- <label class="select_data"><input type="text" class="datepicker" id="searchFrom" bind:value={dateFrom}/></label>
            ~
            <label class="select_data"><input type="text" class="datepicker" id="searchTo"bind:value={dateTo}/></label> -->
            <select bind:value={searchType}>
                <option value="">전체</option>
                <option value="">회원명</option>
                <option value="">환자명</option>
            </select>
            <label><input type="text" name="" id=""/></label>
            <button type="button" class="mbtn_n_5" on:click={search}>검색</button>
        </div>

        <!-- 목록 S -->
        <div class="form_table list">
            <Grid {data} {columns} {style} on:rowClick={setPayInfo}/>
            <!-- <div id="realgrid" class="realgrid"></div>
            <script>
            // JavaScript

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
                "PAYMENT_DATE": "2023-01-05",
                "PAYMENT": "88989",
                "PTNT_NAME": "홍길동",
                "RELATIONSHIP": "본인",
                "MEMEBER_NAME": "홍길동",
                "PAYMENT_TYPE":"모바일",
                "PAYMENT_STATE": "완료",
                "CANCEL_DATE": "",
            },
            {
                "NO": "2",
                "PAYMENT_DATE": "2023-01-05",
                "PAYMENT": "88989",
                "PTNT_NAME": "홍길동",
                "RELATIONSHIP": "본인",
                "MEMEBER_NAME": "홍길동",
                "PAYMENT_TYPE":"신용카드",
                "PAYMENT_STATE": "취소",
                "CANCEL_DATE": "2023-01-05",
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
                "name": "PAYMENT_DATE",
                "fieldName": "PAYMENT_DATE",
                "width": 100,
                "dataType": "datetime",
                "datetimeFormat": "platform",
                "header": {
                "text": "결제일"
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
                    "text": "결제액"
                },
                "styles": {
                    "textAlignment": "far",
                    "numberFormat": "#,##0"
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
                "name": "PAYMENT_TYPE",
                "fieldName": "PAYMENT_TYPE",
                "width": 100,
                "header": {
                "text": " 결제구분"
                },
                "styles": {
                "textAlignment": "center"
                }
            },
            {
                "name": "PAYMENT_STATE",
                "fieldName": "PAYMENT_STATE",
                "width": 100,
                "header": {
                "text": "상태"
                },
                "styles": {
                "textAlignment": "center"
                }
            },
            {
                "name": "CANCEL_DATE",
                "fieldName": "CANCEL_DATE",
                "width": 100,
                "dataType": "datetime",
                "datetimeFormat": "platform",

                "header": {
                "text": "취소일"
                },
                "styles": {
                "textAlignment": "center",
                "datetimeFormat": "yy.MM.dd"
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

        <div class="form_table">
            <h3>결제내역</h3>
            <p class="ess_info">
<!--                <button class="mbtn_p_9" on:click={()=>changePayStat(mpayId)}>결제취소</button>-->
                <button class="mbtn_p_9" on:click={()=>payCancelPopup=true}>결제취소</button>
            </p>
            <table>
                <colgroup>
                    <col style="width:12% ;"/>
                    <col style="width:38% ;"/>
                    <col style="width:12% ;"/>
                </colgroup>
                <tr>
                    <th>번호</th>
                    <td>{mpayNum}</td>
                    <th>결제방식</th>
                    <td>{payInfo.mpayPayMthd}({payInfo.mpayPayNo})</td>
                </tr>
                <tr>
                    <th>환자명</th>
                    <td>{payInfo.mpayPatName}</td>
                    <th>회원명</th>
                    <td>{payInfo.mpayMbrName}</td>
                </tr>
                <tr>
                    <th>결제액</th>
                    <td>{payInfo.mpayPayAmt}</td>
                    <th>결제완료금액</th>
                    <td>{payInfo.mpayPayAmt}</td>
                </tr>
                <tr>
                    <th>결제일자</th>
                    <td>{(payInfo.mpayPayDttm != null) ? changeDate(new Date(payInfo.mpayPayDttm)) : ''}</td>
                    <th>취소일자</th>
                    <td>{(payInfo.mpayCnclDttm != null) ? changeDate(new Date(payInfo.mpayCnclDttm)) : ''}</td>
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


<!-- 결제취소 팝업 -->
{#if payCancelPopup}
    <section class="z_alert">
        <div class="z_box_1">
            <div class="tex">
                {#if payInfo.mpayStat == ""}
                    <div>진료를 선택해주세요.</div>
                {:else if payInfo.mpayStat == "5"}
                    <div>결제취소 하시겠습니까?</div>
                {:else}
                    <div>결제완료 상태가 아닙니다.</div>
                {/if}
            </div>
            <div class="btn_wrap">
                {#if payInfo.mpayStat == "5"}
                    <button class="btn_02" on:click={() => goDgnsPayCancel()}>예</button>
                    <button class="btn_03" on:click={() => payCancelPopup=false}>아니오</button>
                {:else}
                    <button class="btn_02" on:click={() => payCancelPopup=false}>확인</button>
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
                <button class="btn_02" on:click={() => payCancelAlert=false}>확인</button>
            </div>
        </div>
    </section>
{/if}

<!-- PageLoader -->
{#if isLoading}
    <PageLoader/>
{/if}