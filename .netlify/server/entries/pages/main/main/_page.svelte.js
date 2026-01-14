import { c as create_ssr_component, a as subscribe, d as each, v as validate_component, e as escape, b as add_attribute } from "../../../../chunks/index3.js";
import { g as getAPI, m as mobileUrlAddr } from "../../../../chunks/getAPI.js";
import "../../../../chunks/index.js";
import { s as susrShpId } from "../../../../chunks/loginStore.js";
import { F as FullCalendar } from "../../../../chunks/FullCalendar.js";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { F as Footer } from "../../../../chunks/Footer.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
function toISODttm(time) {
  const [date, timePart] = time.split(" ");
  return "20" + date + "T" + timePart + ":00";
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredData;
  let options;
  let $susrShpId, $$unsubscribe_susrShpId;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => $susrShpId = value);
  let data = [];
  let shopNtcList = [];
  let uPspn = [];
  let vPspn = [];
  let doctorList = [];
  let dgnsInfo = [];
  let dgnsInfoPopup = false;
  let muCancelled = 0;
  let muCompleted = 0;
  let mcConfirmed = 0;
  let mcCompleted = 0;
  let mcPay = 0;
  let muPay = 0;
  let muPspn = 0;
  let mcPspn = 0;
  const ntcGridStyle = {
    table: { width: "100%", border: "3px solid #ccc" },
    th: {
      "background-color": "rgba(0, 0, 0, 0.1)",
      color: "#000",
      "border-bottom": "2px solid #ccc",
      "text-align": "center"
    },
    td: { "text-align": "center" }
  };
  async function getDgnsList(formattedDateFrom, formattedDateTo) {
    const queryParams = new URLSearchParams({
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
      dgnsShpId: $susrShpId
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
    let url = mobileUrlAddr + "/v1/pspn/selectPspnList?shpId=" + $susrShpId + "&dateFrom=" + formattedStart + "&dateTo=" + formattedEnd + "&dgnsType=" + dgnsType;
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
    const start = arg.start;
    const end = new Date(arg.end.getTime() - 1);
    const formattedStart = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-01`;
    const formattedEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`;
    await getDgnsList(formattedStart, formattedEnd);
    await selectPspnList(formattedStart, formattedEnd, "U");
    await selectPspnList(formattedStart, formattedEnd, "V");
  }
  async function getDgnsInfo(dgnsId) {
    const url = `${mobileUrlAddr}/v1/dgns/selectdgnsinfo?dgnsId=${dgnsId}`;
    try {
      const resData = await getAPI(url);
      dgnsInfo = resData.resultVO;
      console.log("dgnsInfo : ", dgnsInfo);
    } catch (error) {
      console.error("Error fetching diagnosis information:", error);
    }
  }
  {
    if (data) {
      muCancelled = data.filter((item) => item.dgnsType === "U" && item.dgnsStat === "9").length;
      muCompleted = data.filter((item) => item.dgnsType === "U" && item.dgnsStat === "7").length;
      mcConfirmed = data.filter((item) => item.dgnsType === "V" && item.dgnsStat === "3").length;
      mcCompleted = data.filter((item) => item.dgnsType === "V" && item.dgnsStat === "7").length;
      mcPay = data.filter((item) => item.dgnsType === "U" && item.dgnsPayStat === "5").length;
      muPay = data.filter((item) => item.dgnsType === "V" && item.dgnsPayStat === "5").length;
      muPspn = uPspn.length;
      mcPspn = vPspn.length;
    }
  }
  filteredData = data;
  options = {
    plugins: [dayGridPlugin, timegridPlugin, interactionPlugin],
    // 플러그인 설정
    initialView: "dayGridMonth",
    // 초기 뷰 설정
    initialDate: /* @__PURE__ */ new Date(),
    locale: "ko",
    // 언어 설정
    height: "100%",
    width: "100%",
    // 헤더 툴바 설정
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek"
    },
    slotEventOverlap: false,
    eventOverlap: false,
    dayMaxEvents: 4,
    // 하루에 표시할 최대 이벤트 수
    datesSet: (dateinfo) => handleDatesSet(dateinfo),
    // 날짜 범위 변경 시 동작
    // 이벤트 데이터 설정
    events: filteredData.map((item) => {
      let color;
      switch (item.dgnsStat) {
        case "0":
          color = "#0fa5d4";
          break;
        case "3":
          color = "#adff2f";
          break;
        case "5":
          color = "#f39c12";
          break;
        case "7":
          color = "#808080";
          break;
        default:
          color = "#f39c12";
          break;
      }
      if (item.dgnsStat === "9") {
        return null;
      }
      return {
        start: toISODttm(item.dgnsRsvDttm),
        end: new Date(toISODttm(item.dgnsRsvDttm)).getTime() + 30 * 60 * 1e3,
        extendedProps: {
          dgnsId: item.dgnsId,
          dgnsPatName: item.dgnsPatName,
          dgnsRsvDttm: item.dgnsRsvDttm,
          dgnsType: item.dgnsType,
          dgnsPatBrth: item.dgnsPatBrth,
          dgnsStat: item.dgnsStat,
          dgnsDtrId: item.dgnsDtrId
        },
        color
      };
    }).filter(Boolean),
    // 상태가 9인 경우 이벤트를 표시제외
    allDaySlot: false,
    // 종일 슬롯 비활성화
    slotMinTime: "09:00:00",
    // 슬롯 최소 시간
    slotMaxTime: "22:00:00",
    // 슬롯 최대 시간
    showNonCurrentDates: false,
    // 현재 달이 아닌 날짜 표시 비활성화
    eventContent: (arg) => {
      const color = arg.event.backgroundColor || arg.event.color || "#3788d8";
      const dot = `<span class="fc-event-dot" style="background:${color}; width:10px; height:10px; display:inline-block; border-radius:50%; margin-right:4px; vertical-align:middle;"></span>`;
      const rsvtime = arg.event._def.extendedProps.dgnsRsvDttm.split(" ")[1];
      const dgnsPatBrth = arg.event._def.extendedProps.dgnsPatBrth.split(" ")[0].replace(/-/g, "");
      const dgnsPatName = arg.event._def.extendedProps.dgnsPatName;
      if (arg.view.type === "dayGridMonth") {
        return {
          html: `<div>
            ${dot}
        <span class="fc-event-dot"></span>
        <span>${rsvtime}</span>
        <span><strong>${dgnsPatName}(${dgnsPatBrth})</strong></span>
      </div>`
        };
      } else if (arg.view.type === "timeGridWeek") {
        return {
          html: `
        <div class="calendar-event-week">
          ${dot}
          <span>${rsvtime}</span>
          <span>${dgnsPatName}(${dgnsPatBrth})</span>
        </div>
      `
        };
      }
    },
    eventClick: (info) => {
      const dgnsId = info.event.extendedProps.dgnsId;
      getDgnsInfo(dgnsId);
      dgnsInfoPopup = true;
    }
  };
  $$unsubscribe_susrShpId();
  return `<section id="con" style="padding-left : 100px;"><div id="content">
    <div style="display: flex; gap: 20px; align-items: flex-start;">
      <div style="flex: 2; min-width: 0;"><h2 class="page_title">진료 스케쥴</h2>
        <div class="box_1"><div><select style="margin-right:10px;"><option value="">전체</option>${each(doctorList, (doctor) => {
    return `<option${add_attribute("value", doctor.dtrId, 0)}>${escape(doctor.dtrName)}</option>`;
  })}</select></div>
          <div style="margin-top: -10px; text-align:right;"><span style="margin-right: 10px;"><span class="fc-event-dot" style="background:#0fa5d4; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              접수전
            </span>
            <span style="margin-right: 10px;"><span class="fc-event-dot" style="background:#adff2f; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              예약 확정
            </span>
            <span style="margin-right: 10px;"><span class="fc-event-dot" style="background:#f39c12; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              진료 중
            </span>
            <span><span class="fc-event-dot" style="background:#808080; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              진료 완료
            </span></div>
          <div style="height: 75vh;">${validate_component(FullCalendar, "FullCalendar").$$render($$result, { options }, {}, {})}</div></div></div>

      
      <div style="flex: 1; min-width: 0;"><div class="right-panel"><div><h2 class="page_title">가맹점 공지사항</h2>
            ${shopNtcList.length >= 5 ? `<p style="margin-top: -30px; text-align: right"><button>+ 더 보기</button></p>` : ``}
            <div class="form_table list">${validate_component(Gridjs, "Grid").$$render(
    $$result,
    {
      columns: ["번호", "제목", "공지상태", "등록일", { name: "가맹점공지사항ID", hidden: true }],
      data: shopNtcList.slice(0, 5).map((item) => [item.rowNum, item.ntcTitl, item.ntcUseYon, item.ntcRegDttm, item.ntcId]),
      style: ntcGridStyle
    },
    {},
    {}
  )}</div></div>

          <div class="form_table center"><h2 class="page_title">월간 비대면 현황</h2>
            <table><thead><tr><th>예약취소</th>
                  <th>진료완료</th>
                  <th>결제완료</th>
                  <th>처방완료</th></tr></thead>
              <tbody><tr><td>${escape(muCancelled)}건</td>
                  <td>${escape(muCompleted)}건</td>
                  <td>${escape(muPay)}건</td>
                  <td>${escape(muPspn)}건</td></tr></tbody></table></div>

          <div class="form_table center" style="margin-top:0px !important;"><h2 class="page_title">월간 대면 현황</h2>
            <table><thead><tr><th>예약확정</th>
                  <th>진료완료</th>
                  <th>결제완료</th>
                  <th>처방완료</th></tr></thead>
              <tbody><tr><td>${escape(mcConfirmed)}건</td>
                  <td>${escape(mcCompleted)}건</td>
                  <td>${escape(mcPay)}건</td>
                  <td>${escape(mcPspn)}건</td></tr></tbody></table></div>
          <div style="margin-top:60px; text-align:right; width:100%; height:100%; "><button class="banner-list" style="width:50%;"><img src="/assets/img/nav/bitcampus_banner2.png" style="width: 100%" onclick="window.open('https://bitcampus.com/')"></button></div></div></div></div>

    <footer>${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</footer></div></section>

${dgnsInfoPopup ? `<section class="z_alert"><div class="z_box_1"><h2 class="page_title">예약 정보</h2>
      <div class="form_table"><table><colgroup><col style="width:10%;">
            <col style="width:20%;">
            <col style="width:10%;">
            <col style="width:20%;"></colgroup>
          <tr><th>의료진</th>
            <td>${escape(dgnsInfo.dgnsDtrName)}</td>
            <th>진료일시</th>
            <td>${dgnsInfo.dgnsRsvDttm ? `${escape(dgnsInfo.dgnsRsvDttm.slice(0, 16))}` : ``}</td></tr>
          <tr><th>진료구분</th>
            <td>${escape(dgnsInfo.dgnsTypeDesc)}</td>
            <th>진료과 ( 진료 항목 )</th>
            <td>${escape(dgnsInfo.dgnsDeptName)} ( ${escape(dgnsInfo.dgnsItemName)} )</td></tr>
          <tr><th>회원명</th>
            <td>${escape(dgnsInfo.dgnsMbrName)}</td>
            <th>환자명(관계)</th>
            <td>${escape(dgnsInfo.dgnsPatName)}(${escape(dgnsInfo.dgnsPatType)})</td></tr>
          <tr><th>진료상태</th>
            <td>${escape(dgnsInfo.dgnsStatName)}</td>
            <th>진료메모</th>
            <td>${escape(dgnsInfo.dgnsMemo)}</td></tr></table></div>
      <div class="btn_wrap"><button class="btn_04">닫기</button></div></div></section>` : ``}


<section class="full_layer" id="changePw"><div class="bg"></div>
  <div class="box_1"><p class="text_tit">비밀번호 변경</p>
    <label><input type="text" name="" id=""><span class="txt_red">사용불가</span>
      <p class="text_info">* 영어대소문자, 숫자, 특수문자만 사용 가능</p></label>
    <label><input type="text" name="" id=""><span class="txt_blue">일치</span></label>
    <p class="btn_wrap inline"><button type="button" class="btn_02 small close_btn">변경</button>
      <button type="button" class="btn_03 small close_btn">취소</button></p></div></section>
`;
});
export {
  Page as default
};
