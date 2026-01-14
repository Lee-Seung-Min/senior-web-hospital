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
  import { URL } from "$lib/URL";
  import FullCalendar from "svelte-fullcalendar";
  import timegridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import { construct_svelte_component } from "svelte/internal";
  import Footer from "$lib/sub/Footer.svelte";
  import Grid from "gridjs-svelte";
  import { dgnsRsvDttm } from "$lib/store/rgstStore";
  import { tick, onDestroy } from "svelte";

  let calendarRef;
  let calendarApi;
  let refetchTimer;

  let lastRangeKey = "";
  let reqSeq = 0;

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
  let selectedEventInfo = null;

  async function openDgnsPopup(dgnsId) {
    if (!dgnsId) return;
    await getDgnsInfo(dgnsId);  // 기존 API로 상세 조회
    dgnsInfoPopup = true;       // 기존 팝업 열기
  }

  function eventStartToDateKey(startStr) {
    if (!startStr) return "";
    let d = startStr.split("T")[0]; // "20251222" or "2025-12-22"

    // YYYYMMDD → YYYY-MM-DD 변환
    if (/^\d{8}$/.test(d)) {
      return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
    }
    // 이미 YYYY-MM-DD면 그대로
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;

    return "";
  }

  let selectedDateKey = "";  
  let selectedDateLabel = "";

  // dgnsRsvDttm의 날짜를 YYYY-MM-DD로 통일
  function normalizeDateKey(dgnsRsvDttm) {
    if (!dgnsRsvDttm) return "";
    const datePart = dgnsRsvDttm.split(" ")[0];

    // "251222" (YYMMDD) 형태
    if (/^\d{6}$/.test(datePart)) {
      const y = "20" + datePart.slice(0, 2);
      const m = datePart.slice(2, 4);
      const d = datePart.slice(4, 6);
      return `${y}-${m}-${d}`;
    }

    // "20251222" (YYYYMMDD) 형태
    if (/^\d{8}$/.test(datePart)) {
      const y = datePart.slice(0, 4);
      const m = datePart.slice(4, 6);
      const d = datePart.slice(6, 8);
      return `${y}-${m}-${d}`;
    }

    // "2025-12-22" (YYYY-MM-DD) 형태
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return datePart;

    // 4) "YY-MM-DD" 또는 "YY-M-D"
    let m2 = datePart.match(/^(\d{2})-(\d{1,2})-(\d{1,2})$/);
    if (m2) {
      const [, yy, mo, da] = m2;
      return `20${yy}-${mo.padStart(2, "0")}-${da.padStart(2, "0")}`;
    }

  return "";

    return "";
  }

  function setSelectedDateByKey(dateKey) {
    selectedDateKey = dateKey || "";
    if (!selectedDateKey) {
      selectedDateLabel = "";
      return;
    }
    const [y, m, d] = selectedDateKey.split("-");
    selectedDateLabel = `${y}년 ${m}월 ${d}일`;
  }

  function getTimePart(dgnsRsvDttm) {
    if (!dgnsRsvDttm) return "";
    return (dgnsRsvDttm.split(" ")[1] || "");
  }

  function statText(stat) {
    return (
      stat === "0" ? "접수전" :
      stat === "3" ? "예약 확정" :
      stat === "5" ? "진료 중" :
      stat === "7" ? "진료 완료" :
      "알 수 없음"
    );
  }

  function typeText(type) {
    return type === "U" ? "비대면" : "대면";
  }

  // ✅ 추가: 선택한 날짜의 일정 리스트(의사필터 반영된 filteredData 기준)
  $: selectedDateList = selectedDateKey
    ? filteredData
        .filter((item) => normalizeDateKey(item.dgnsRsvDttm) === selectedDateKey)
        .filter((item) => item.dgnsStat !== "9") // 기존 로직처럼 취소(9) 제외
        .sort((a, b) => getTimePart(a.dgnsRsvDttm).localeCompare(getTimePart(b.dgnsRsvDttm)))
    : [];

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
          goto(URL.main);
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
            goto(URL.main);
            // location.reload();
          } catch (err) {
            if (err.message == "22005") {
              alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
              loginResetStore();
              goto(URL.awLogin);
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
        goto(URL.awLogin);
      }
      await tick();
      calendarApi =
        calendarRef?.getApi?.() ||
        calendarRef?.getAPI?.() ||
        calendarRef;

      calendarApi?.refetchEvents?.();
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
    goto(URL.awLogin);
  }

  async function getDgnsList(formattedDateFrom, formattedDateTo) {
    const queryParams = new URLSearchParams({
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
      dgnsShpId: $susrShpId,
    });
    console.log("queryParams : ", queryParams);
    let url = mobileUrlAddr + "/v1/dgns/selectdgnslist?" + queryParams;
    try {
      let resData = await getAPI(url);
      data = resData.resultVO;
      console.log("getDgnsList : ", data);
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
      console.log("Error fetching selectPspnList");
    }
  }

  async function handleDatesSet(arg) {
    if (!$susrShpId) return;

    const startKey = arg.start?.toISOString()?.slice(0, 10) || "";
    const endKey = arg.end?.toISOString()?.slice(0, 10) || "";
    const rangeKey = `${arg.view?.type}:${startKey}:${endKey}:${$susrShpId}`;

    // 같은range면 재호출 방지
    if (rangeKey === lastRangeKey) return;
    lastRangeKey = rangeKey;

    const mySeq = ++reqSeq;

    const start = arg.start;
    const end = new Date(arg.end.getTime() - 1);
    const formattedStart = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-01`;
    const formattedEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`;

    try {
      await getDgnsList(formattedStart, formattedEnd);
      await selectPspnList(formattedStart, formattedEnd, "U");
      await selectPspnList(formattedStart, formattedEnd, "V");
      if (mySeq !== reqSeq) return;
    } catch (e) {
      console.error("handleDatesSet error:", e);
    }
  }


  function toISO(dgnsRsvDttm) {
    if (!dgnsRsvDttm) return null;
    const [datePart, timePart] = dgnsRsvDttm.split(" ");
    if (!timePart) return null;

    //YYMMDD
    if (/^\d{6}$/.test(datePart)) {
      const y = "20" + datePart.slice(0, 2);
      const m = datePart.slice(2, 4);
      const d = datePart.slice(4, 6);
      return `${y}-${m}-${d}T${timePart}:00`;
    }

    //YYYYMMDD
    if (/^\d{8}$/.test(datePart)) {
      const y = datePart.slice(0, 4);
      const m = datePart.slice(4, 6);
      const d = datePart.slice(6, 8);
      return `${y}-${m}-${d}T${timePart}:00`;
    }

    //YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
      return `${datePart}T${timePart}:00`;
    }

    // YY-M-D / YY-MM-DD
    const m2 = datePart.match(/^(\d{2})-(\d{1,2})-(\d{1,2})$/);
    if (m2) {
      const [, yy, mo, da] = m2;
      return `20${yy}-${mo.padStart(2, "0")}-${da.padStart(2, "0")}T${timePart}:00`;
    }

    return null;
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
    events: (fetchInfo, successCallback, failureCallback) => {
      try {
        successCallback(buildEvents(filteredData));
      } catch (e) {
        failureCallback?.(e);
      }
    },
    allDaySlot: false, // 종일 슬롯 비활성화
    slotMinTime: "08:00:00", // 슬롯 최소 시간
    slotMaxTime: "20:30:00", // 슬롯 최대 시간
    slotDuration: "00:10:00",      // 10분 단위 그리드
    slotLabelInterval: "01:00:00", // 시간 라벨은 1시간마다
    showNonCurrentDates: false, // 현재 달이 아닌 날짜 표시 비활성화
    


    eventContent: (arg) => {
      const color = arg.event.backgroundColor || arg.event.color || "#3788d8";
      const dot = `<span class="fc-event-dot" style="background:${color}; width:10px; height:10px; display:inline-block; border-radius:50%; margin-right:4px; vertical-align:middle;"></span>`;
      
      // null 체크 추가
      const dgnsRsvDttm = arg.event._def.extendedProps.dgnsRsvDttm;
      if (!dgnsRsvDttm) {
        return { html: `<div>${dot}<span>시간 정보 없음</span></div>` };
      }
      const rsvtime = dgnsRsvDttm.split(" ")[1];
      const dgnsPatBrth = arg.event._def.extendedProps.dgnsPatBrth
        ?.split(" ")[0]
        ?.replace(/-/g, "") || "";
      const dgnsPatName = arg.event._def.extendedProps.dgnsPatName || "";

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
          <span class="evt-time">${rsvtime}</span>
          <span class="evt-title">${dgnsPatName}(${dgnsPatBrth||"-"})</span>
        </div>
      `,
        };
      }
    },

    dateClick: (info) => {
      setSelectedDateByKey(info.dateStr);
      selectedEventInfo = null; // 선택 상세 초기화(원하면)
      console.log("dateClick dateStr =", info.dateStr, "selectedDateKey =", selectedDateKey);
    },


   eventClick: (info) => {
      console.log("eventClick startStr =", info.event.startStr);
      const dateKey = eventStartToDateKey(info.event.startStr);
      console.log("eventClick dateKey =", dateKey);
      setSelectedDateByKey(dateKey);

      const date = new Date(toISO(info.event.extendedProps.dgnsRsvDttm));
      selectedEventInfo = {
        ...info.event.extendedProps,
        dateStr: `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, "0")}월 ${date
          .getDate()
          .toString()
          .padStart(2, "0")}일`,
      };
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
      console.log("doctorList : ", doctorList);
    } catch (error) {
      console.error(error);
    }
  }

  async function getDgnsInfo(dgnsId) {
    const url = `${mobileUrlAddr}/v1/dgns/selectdgnsinfo?dgnsId=${dgnsId}`;
    try {
      const resData = await getAPI(url);
      dgnsInfo = resData.resultVO;
      console.log("dgnsInfo : ",dgnsInfo);
    } catch (error) {
      console.error("Error fetching diagnosis information:", error);
    }
  }

  function buildEvents(list) {
    return (list || [])
      .filter((item) => item.dgnsStat !== "9")
      .map((item) => {
        let color;
        switch (item.dgnsStat) {
          case "0": color = "#A16207"; break;
          case "3": color = "#4338CA"; break;
          case "5": color = "#1D4ED8"; break;
          case "7": color = "#0F766E"; break;
          default:  color = "#f39c12";
        }

        const iso = toISO(item.dgnsRsvDttm);
        if (!iso) return null;

        const startDate = new Date(iso);

        return {
          start: startDate,
          // ✅ 30분 이벤트(원하는 시간으로 조절 가능)
          end: new Date(startDate.getTime() + 30 * 60 * 1000),
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
      .filter(Boolean);
  }

</script>

<section id="con">
  <h2 class="page_title">진료 스케쥴</h2>
  <div id="content">
    <!-- content S -->
    <div>
      <!-- 왼쪽: FullCalendar -->
      <div class="main-set">
        <div class="box_1">
          <div>
            <select bind:value={selectedDoctor}>
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
                style="background:#A16207; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              접수전
            </span>
            <span style="margin-right: 10px;">
              <span
                class="fc-event-dot"
                style="background:#4338CA; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              예약 확정
            </span>
            <span style="margin-right: 10px;">
              <span
                class="fc-event-dot"
                style="background:#1D4ED8; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              진료 중
            </span>
            <span>
              <span
                class="fc-event-dot"
                style="background:#0F766E; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"
              ></span>
              진료 완료
            </span>
          </div>
          <div>
            <FullCalendar bind:this={calendarRef} {options} />
          </div>
        </div>
      </div>

      <!-- 오른쪽: 결제 상세-->
      <div class="info-set">
        <div class="info-head">
          <span class="info-date">
            {selectedDateKey ? selectedDateLabel : "날짜를 선택하세요"}
          </span>

          <span class="info-count">{selectedDateList.length}</span>
        </div>

        <div class="info-body">
          {#if !selectedDateKey}
            <div class="info-empty">
              날짜를 선택해주세요.
            </div>

          {:else if selectedDateList.length === 0}
            <div class="info-empty">
              예약된 일정이 없습니다.<br />
              다른 일자를 선택하거나 필터를 확인해주세요.
            </div>

          {:else}
            <div class="info-list">
              {#each selectedDateList as item (item.dgnsId)}
                <button
                  type="button"
                  class="info-card"
                  on:click={() => {
                    selectedEventInfo = {
                      ...item,
                      dateStr: selectedDateLabel
                    };
                  }}
                >
                  <div class="info-card-top">
                    <strong class="info-name">{item.dgnsPatName}</strong>
                    <span class="info-time">{getTimePart(item.dgnsRsvDttm)}</span>
                  </div>

                  <div class="info-card-mid">
                    <div class="info-row">
                      <span class="label">생년월일</span>
                      <span class="value">
                        {(item.dgnsPatBrth || "-").split(" ")[0]}
                      </span>
                    </div>

                    <div class="info-row">
                      <span class="label">진료 구분</span>
                      <span class="value">{typeText(item.dgnsType)}</span>
                    </div>

                    <div class="info-row">
                      <span class="label">진료 상태</span>
                      <span class="value">
                        <span class="status-badge stat-{item.dgnsStat}">
                          {statText(item.dgnsStat)}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div class="info-card-bottom">
                    <button
                      type="button"
                      class="detail-link"
                      on:click|stopPropagation={() => openDgnsPopup(item.dgnsId)}
                    >
                      진료 정보
                    </button>
                  </div>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>



      <!-- 오른쪽: 나머지 내용 -->
      <!-- <div>
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
      </div> -->
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
<style>
  .info-set{
    width: 320px;            /* 우측 패널 폭(원하는 값으로) */
    border-left: 1px solid #eee;
    padding-left: 16px;
  }

  .info-head{
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin: 8px 0 12px;
  }

  .info-date{
    font-weight: 700;
    font-size: 16px;
  }

  .info-count{
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 999px;
    background: #ef4444; /* 빨간 뱃지 */
    color: #fff;
  }

  .info-body{
    min-height: 520px;
  }

  .info-empty{
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    color: #666;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }

  .info-list{
    display:flex;
    flex-direction:column;
    gap: 12px;
  }

  /* ✅ 기존 .info-box 영향 안 받게 새 카드 클래스 */
  .info-card{
    width: 100%;
    text-align: left;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 14px 14px 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    cursor: pointer;

    /* button 기본 스타일 제거 */
    outline: none;
    appearance: none;
  }

  .info-card:hover{
    border-color: #ddd;
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  }

  .info-card-top{
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    margin-bottom: 10px;
  }

  .info-name{
    font-size: 15px;
    font-weight: 800;
    color: #111;
  }

  .info-time{
    font-size: 16px;
    color: #666;
    font-weight: 600;
  }

  .info-card-mid .info-row{
    display:flex;
    justify-content:space-between;
    padding: 6px 0;
    border-top: 1px dashed #eee;
  }
  .info-card-mid .info-row:first-child{
    border-top: 0;
    padding-top: 0;
  }

  .label{
    font-size: 12px;
    color: #777;
  }
  .value{
    font-size: 12px;
    color: #111;
    font-weight: 700;
  }

  .status-badge{
    display:inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    color: #fff;
  }

  .status-badge.stat-0{ background:#A16207; } /* 접수전 */
  .status-badge.stat-3{ background:#4338CA; } /* 예약 확정 */
  .status-badge.stat-5{ background:#1D4ED8; } /* 진료 중 */
  .status-badge.stat-7{ background:#0F766E; } /* 진료 완료 */

  .info-card-bottom{
    margin-top: 10px;
    display:flex;
    justify-content:flex-end;
  }

  .detail-link{
    font-size: 11px;
    font-weight: 800;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    color: #4f46e5; /* 보라 계열 */
    background: #fafafa;
  }

  /* ✅ timeGridWeek 이벤트는 '박스'처럼 보이게 강제 (텍스트 떠다님 방지) */
:global(.fc .fc-timegrid-event),
:global(.fc .fc-timegrid-event .fc-event-main) {
  background: #fff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 6px !important;
}

/* timeGrid 이벤트 영역: 텍스트가 한 줄로 들어가게 */
:global(.fc .fc-timegrid-event .fc-event-main){
  overflow: hidden !important;
  padding: 1px 3px !important; /* 글자에 맞춰 최소 패딩 */
}

/* 글자 크기 + line-height로 높이 맞추기 */
:global(.fc .fc-timegrid-event .calendar-event-week){
  display:flex;
  align-items:center;
  gap:4px;
  min-width:0;
  font-size:10px;      /* 글자 줄이기 */
  line-height:12px;    /* 글자 높이 고정 */
  white-space:nowrap;
  overflow:hidden;
}

:global(.fc .fc-timegrid-event .calendar-event-week .evt-title){
  overflow:hidden;
  text-overflow:ellipsis;
}

:global(.fc .fc-timegrid-event .fc-event-main-frame){
  min-height: 0 !important;
}
</style>
