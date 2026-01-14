<script>
  // @ts-nocheck

  import {
    shopUrlAddr,
    authUrlAddr,
    mobileUrlAddr,
    adminUrlAddr,
  } from "$lib/js/urlAddr";
  import { onMount } from "svelte";
  import { goto, invalidateAll } from "$app/navigation";
  import { getUserId } from "$lib/js/getUserId";
  import { getAPI } from "$lib/js/getAPI";
  import { updateRefresh } from "$lib/js/updateRefresh";
  import {
    isLogin,
    loginResetStore,
    susrId,
    susrLoginId,
    susrName,
    susrShpId,
    susrShpName,
  } from "$lib/store/loginStore";

  import FullCalendar from "svelte-fullcalendar";
  import timegridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import { construct_svelte_component } from "svelte/internal";
  import Footer from "$lib/sub/Footer.svelte";
  import Grid from "gridjs-svelte";
  import { dgnsRsvDttm } from "$lib/store/rgstStore";

  let mem = [];
  let popUp = false;

  let dgnsList = [];
  let data = [];
  let shopNtcList = [];
  let uPspn = [];
  let vPspn = [];
  let doctorList = [];
  let selectedDoctor = "";
  let dgnsInfo = [];
  let dgnsInfoPopup = false;

  //mc : monthlyContact(월간 대면), mu:monthlyUntact(월간 비대면)
  let muCancelled = 0;
  let muCompleted = 0;
  let mcConfirmed = 0;
  let mcCompleted = 0;
  let mcPay = 0;
  let muPay = 0;
  let muPspn = 0;
  let mcPspn = 0;

  $: if (data) {
    muCancelled = data.filter(
      (item) => item.dgnsType === "U" && item.dgnsStat === "9"
    ).length;
    muCompleted = data.filter(
      (item) => item.dgnsType === "U" && item.dgnsStat === "7"
    ).length;
    mcConfirmed = data.filter(
      (item) => item.dgnsType === "V" && item.dgnsStat === "3"
    ).length;
    mcCompleted = data.filter(
      (item) => item.dgnsType === "V" && item.dgnsStat === "7"
    ).length;
    mcPay = data.filter(
      (item) => item.dgnsType === "U" && item.dgnsPayStat === "5"
    ).length;
    muPay = data.filter(
      (item) => item.dgnsType === "V" && item.dgnsPayStat === "5"
    ).length;
    muPspn = uPspn.length;
    mcPspn = vPspn.length;
  }

  const ntcGridStyle = {
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
      selectShopNoticeList();
      getDoctorListInfo();
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
          loginResetStore();
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
  });
  function xButton() {
    popUp = false;
  }
  function doReg(e) {
    popUp = true;
  }
  function logout() {
    localStorage.setItem("bizportal-access-token", "");
    localStorage.setItem("bizportal-refresh-token", "");
    goto("/");
  }

  async function getDgnsList(formattedDateFrom, formattedDateTo) {
    const queryParams = new URLSearchParams({
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
      dgnsShpId: $susrShpId,
    });
    let url = mobileUrlAddr + "/v1/dgns/selectdgnslist?" + queryParams;
    try {
      let resData = await getAPI(url);
      data = resData.resultVO;
    } catch (error) {
      console.error("Error fetching grid data:", error);
    }
  }

  async function selectPspnList(formattedStart, formattedEnd, dgnsType) {
    let url =
      mobileUrlAddr +
      "/v1/pspn/selectPspnList?shpId=" +
      $susrShpId +
      "&dateFrom=" +
      formattedStart +
      "&dateTo=" +
      formattedEnd +
      "&dgnsType=" +
      dgnsType;

    try {
      let resData = await getAPI(url);
      if (dgnsType === "U") {
        uPspn = resData.resultVO;
      } else if (dgnsType === "V") {
        vPspn = resData.resultVO;
      }
    } catch (error) {
      console.error("Error fetching selectPspnList",error);
    }
  }

  async function handleDatesSet(arg) {
    const start = arg.start;
    const end = new Date(arg.end.getTime() - 1);
    const formattedStart = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-01`;
    const formattedEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`;
    await getDgnsList(formattedStart, formattedEnd);
    await selectPspnList(formattedStart, formattedEnd, "U");
    await selectPspnList(formattedStart, formattedEnd, "V");
  }

  function toISODttm(time) {
    const [date, timePart] = time.split(" ");
    return "20" + date + "T" + timePart + ":00";
  }

  $: filteredData = selectedDoctor
    ? data.filter((item) => item.dgnsDtrId == selectedDoctor)
    : data;

  $: options = {
    plugins: [dayGridPlugin, timegridPlugin, interactionPlugin], // 플러그인 설정
    initialView: "dayGridMonth", // 초기 뷰 설정
    initialDate: new Date(),
    locale: "ko", // 언어 설정
    height: "100%",
    width: "100%",
    // 헤더 툴바 설정
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek",
    },

    slotEventOverlap: false,
    eventOverlap: false,
    dayMaxEvents: 4, // 하루에 표시할 최대 이벤트 수

    datesSet: (dateinfo) => handleDatesSet(dateinfo), // 날짜 범위 변경 시 동작

    // 이벤트 데이터 설정
    events: filteredData
      .map((item) => {
        let color;
        switch (item.dgnsStat) {
          case "0":
            color = "#0fa5d4"; // 접수전
            break;
          case "3":
            color = "#adff2f"; // 예약 확정
            break;
          case "5":
            color = "#f39c12"; // 진료 중
            break;
          case "7":
            color = "#808080"; // 진료 완료
            break;
          default:
            color = "#f39c12"; // 기본 색상
            break;
        }

        if (item.dgnsStat === "9") {
          return null; // 상태가 9인 경우 이벤트를 표시하지 않음
        }

        return {
          start: toISODttm(item.dgnsRsvDttm),
          end: new Date(toISODttm(item.dgnsRsvDttm)).getTime() + 30 * 60 * 1000,
          extendedProps: {
            dgnsId: item.dgnsId,
            dgnsPatName: item.dgnsPatName,
            dgnsRsvDttm: item.dgnsRsvDttm,
            dgnsType: item.dgnsType,
            dgnsPatBrth: item.dgnsPatBrth,
            dgnsStat: item.dgnsStat,
            dgnsDtrId: item.dgnsDtrId,
          },
          color,
        };
      })
      .filter(Boolean), // 상태가 9인 경우 이벤트를 표시제외
    allDaySlot: false, // 종일 슬롯 비활성화
    slotMinTime: "09:00:00", // 슬롯 최소 시간
    slotMaxTime: "22:00:00", // 슬롯 최대 시간
    showNonCurrentDates: false, // 현재 달이 아닌 날짜 표시 비활성화

    eventContent: (arg) => {
      const color = arg.event.backgroundColor || arg.event.color || "#3788d8";
      const dot = `<span class="fc-event-dot" style="background:${color}; width:10px; height:10px; display:inline-block; border-radius:50%; margin-right:4px; vertical-align:middle;"></span>`;

      const rsvtime = arg.event._def.extendedProps.dgnsRsvDttm.split(" ")[1];
      const dgnsPatBrth = arg.event._def.extendedProps.dgnsPatBrth
        .split(" ")[0]
        .replace(/-/g, "");
      const dgnsPatName = arg.event._def.extendedProps.dgnsPatName;

      if (arg.view.type === "dayGridMonth") {
        return {
          html: `<div>
            ${dot}
        <span class="fc-event-dot"></span>
        <span>${rsvtime}</span>
        <span><strong>${dgnsPatName}(${dgnsPatBrth})</strong></span>
      </div>`,
        };
      } else if (arg.view.type === "timeGridWeek") {
        return {
          html: `
        <div class="calendar-event-week">
          ${dot}
          <span>${rsvtime}</span>
          <span>${dgnsPatName}(${dgnsPatBrth})</span>
        </div>
      `,
        };
      }
    },

    eventClick: (info) => {
      const dgnsId = info.event.extendedProps.dgnsId;
      getDgnsInfo(dgnsId);
      dgnsInfoPopup = true;
    },
  };

  async function selectShopNoticeList() {
    let currentPage = 0;
    let ntcUseYon = "Y"; // 공지사항 사용 여부
    let ntcSearchType = "all"; // 공지사항 검색 타입
    let ntcSearchKey = "";
    let url =
      adminUrlAddr +
      "/v1/basicinfo/selectShopNoticeList?ntcShopId=" +
      $susrShpId +
      "&page=" +
      currentPage +
      "&ntcUseYon=" +
      ntcUseYon +
      "&ntcSearchType=" +
      ntcSearchType +
      "&ntcSearchKey=" +
      ntcSearchKey;
    try {
      let resData = await getAPI(url);
      shopNtcList = resData.resultVO;
    } catch (error) {
      console.error("Error fetching shop notice list:", error);
    }
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

  async function getDgnsInfo(dgnsId) {
    const url = `${mobileUrlAddr}/v1/dgns/selectdgnsinfo?dgnsId=${dgnsId}`;
    try {
      const resData = await getAPI(url);
      dgnsInfo = resData.resultVO;
    } catch (error) {
      console.error("Error fetching diagnosis information:", error);
    }
  }
</script>

<section id="con" style="padding-left : 100px;">
  <div id="content">
    <!-- content S -->
    <div style="display: flex; gap: 20px; align-items: flex-start;">
      <!-- 왼쪽: FullCalendar -->
      <div style="flex: 2; min-width: 0;">
        <h2 class="page_title">진료 스케쥴</h2>
        <div class="box_1">
          <div>
            <select bind:value={selectedDoctor} style="margin-right:10px;">
              <option value="">전체</option>
              {#each doctorList as doctor}
                <option value={doctor.dtrId}>{doctor.dtrName}</option>
              {/each}
            </select>
          </div>
          <div style="margin-top: -10px; text-align:right;">
            <span style="margin-right: 10px;">
              <span
                class="fc-event-dot"
                style="background:#0fa5d4; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              접수전
            </span>
            <span style="margin-right: 10px;">
              <span
                class="fc-event-dot"
                style="background:#adff2f; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              예약 확정
            </span>
            <span style="margin-right: 10px;">
              <span
                class="fc-event-dot"
                style="background:#f39c12; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              진료 중
            </span>
            <span>
              <span
                class="fc-event-dot"
                style="background:#808080; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              진료 완료
            </span>
          </div>
          <div style="height: 75vh;">
            <FullCalendar {options} />
          </div>
        </div>
      </div>

      <!-- 오른쪽: 나머지 내용 -->
      <div style="flex: 1; min-width: 0;">
        <div class="right-panel">
          <div>
            <h2 class="page_title">가맹점 공지사항</h2>
            {#if shopNtcList.length >= 5}
              <p style="margin-top: -30px; text-align: right">
                <button on:click={() => goto("/board/awShpNtcLst")}
                  >+ 더 보기</button
                >
              </p>
            {/if}
            <div class="form_table list">
              <Grid
                columns={[
                  "번호",
                  "제목",
                  "공지상태",
                  "등록일",
                  { name: "가맹점공지사항ID", hidden: true },
                ]}
                data={shopNtcList
                  .slice(0, 5)
                  .map((item) => [
                    item.rowNum,
                    item.ntcTitl,
                    item.ntcUseYon,
                    item.ntcRegDttm,
                    item.ntcId,
                  ])}
                style={ntcGridStyle}
                on:rowClick={({ detail }) => {
                  goto(`/board/awShpNtcLst?rowNum=${detail[1]._cells[0].data}`);
                }}
              />
            </div>
          </div>

          <div class="form_table center">
            <h2 class="page_title">월간 비대면 현황</h2>
            <table>
              <thead>
                <tr>
                  <th>예약취소</th>
                  <th>진료완료</th>
                  <th>결제완료</th>
                  <th>처방완료</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{muCancelled}건</td>
                  <td>{muCompleted}건</td>
                  <td>{muPay}건</td>
                  <td>{muPspn}건</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="form_table center" style="margin-top:0px !important;">
            <h2 class="page_title">월간 대면 현황</h2>
            <table>
              <thead>
                <tr>
                  <th>예약확정</th>
                  <th>진료완료</th>
                  <th>결제완료</th>
                  <th>처방완료</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mcConfirmed}건</td>
                  <td>{mcCompleted}건</td>
                  <td>{mcPay}건</td>
                  <td>{mcPspn}건</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="margin-top:60px; text-align:right; width:100%; height:100%; ">
              <button
                class="banner-list"
                style="width:50%;"
              >
                <img
                  src="/assets/img/nav/bitcampus_banner2.png"
                  style="width: 100%"
                  onclick="window.open('https://bitcampus.com/')"
                />
              </button>
            </div>
        </div>
      </div>
    </div>

    <footer><Footer /></footer>
  </div>
</section>

{#if dgnsInfoPopup}
  <section class="z_alert">
    <div class="z_box_1">
      <h2 class="page_title">예약 정보</h2>
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
            <td>{dgnsInfo.dgnsDtrName}</td>
            <th>진료일시</th>
            <td>
              {#if dgnsInfo.dgnsRsvDttm}
                {dgnsInfo.dgnsRsvDttm.slice(0, 16)}
              {/if}
            </td>
          </tr>
          <tr>
            <th>진료구분</th>
            <td>{dgnsInfo.dgnsTypeDesc}</td>
            <th>진료과 ( 진료 항목 )</th>
            <td>{dgnsInfo.dgnsDeptName} ( {dgnsInfo.dgnsItemName} )</td>
          </tr>
          <tr>
            <th>회원명</th>
            <td>{dgnsInfo.dgnsMbrName}</td>
            <th>환자명(관계)</th>
            <td>{dgnsInfo.dgnsPatName}({dgnsInfo.dgnsPatType})</td>
          </tr>
          <tr>
            <th>진료상태</th>
            <td>{dgnsInfo.dgnsStatName}</td>
            <th>진료메모</th>
            <td>{dgnsInfo.dgnsMemo}</td>
          </tr>
        </table>
      </div>
      <div class="btn_wrap">
        <button
          class="btn_04"
          on:click={() => {
            dgnsInfoPopup = false;
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}

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
  </div>
</section>
<!-- 즐겨찾기 E -->
