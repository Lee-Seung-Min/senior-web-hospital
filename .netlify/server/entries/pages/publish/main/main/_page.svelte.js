import { c as create_ssr_component, a as subscribe, d as each, v as validate_component, e as escape, b as add_attribute } from "../../../../../chunks/index3.js";
import { g as getAPI, m as mobileUrlAddr } from "../../../../../chunks/getAPI.js";
import "../../../../../chunks/index.js";
import { s as susrShpId } from "../../../../../chunks/loginStore.js";
import { F as FullCalendar } from "../../../../../chunks/FullCalendar.js";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { F as Footer } from "../../../../../chunks/Footer.js";
import "gridjs";
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
  let uPspn = [];
  let vPspn = [];
  let doctorList = [];
  let selectedEventInfo = null;
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
  {
    if (data) {
      data.filter((item) => item.dgnsType === "U" && item.dgnsStat === "9").length;
      data.filter((item) => item.dgnsType === "U" && item.dgnsStat === "7").length;
      data.filter((item) => item.dgnsType === "V" && item.dgnsStat === "3").length;
      data.filter((item) => item.dgnsType === "V" && item.dgnsStat === "7").length;
      data.filter((item) => item.dgnsType === "U" && item.dgnsPayStat === "5").length;
      data.filter((item) => item.dgnsType === "V" && item.dgnsPayStat === "5").length;
      uPspn.length;
      vPspn.length;
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
          color = "#A16207";
          break;
        case "3":
          color = "#4338CA";
          break;
        case "5":
          color = "#1D4ED8";
          break;
        case "7":
          color = "#0F766E";
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
      info.event.extendedProps.dgnsId;
      const date = new Date(toISODttm(info.event.extendedProps.dgnsRsvDttm));
      selectedEventInfo = {
        ...info.event.extendedProps,
        dateStr: `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, "0")}월 ${date.getDate().toString().padStart(2, "0")}일`
      };
    }
  };
  $$unsubscribe_susrShpId();
  return `<section id="con"><h2 class="page_title">진료 스케쥴</h2>
  <div id="content">
    <div>
      <div class="main-set"><div class="box_1"><div><select><option value="">전체</option>${each(doctorList, (doctor) => {
    return `<option${add_attribute("value", doctor.dtrId, 0)}>${escape(doctor.dtrName)}</option>`;
  })}</select></div>
          <div style="margin-top: -10px; text-align:right;"><span style="margin-right: 10px;"><span class="fc-event-dot" style="background:#A16207; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              접수전
            </span>
            <span style="margin-right: 10px;"><span class="fc-event-dot" style="background:#4338CA; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              예약 확정
            </span>
            <span style="margin-right: 10px;"><span class="fc-event-dot" style="background:#1D4ED8; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              진료 중
            </span>
            <span><span class="fc-event-dot" style="background:#0F766E; width:10px; height:10px; display:inline-block; border-radius:50%; vertical-align:middle;"></span>
              진료 완료
            </span></div>
          <div>${validate_component(FullCalendar, "FullCalendar").$$render($$result, { options }, {}, {})}</div></div></div>

      
      <div class="info-set"><div class="info-head"><span>${escape(selectedEventInfo ? selectedEventInfo.dateStr : "날짜를 선택하세요")}</span>
          <span>${escape(selectedEventInfo ? "1" : "0")}</span></div>
        <div class="info-body">${selectedEventInfo ? `<div class="info-box shadow-md"><div class="box-head"><span class="text-lg">${escape(selectedEventInfo.dgnsPatName)}</span></div>
            <div class="box-body"><span>예약시간: ${escape(selectedEventInfo.dgnsRsvDttm.split(" ")[1])}</span>
              <span>생년월일: ${escape(selectedEventInfo.dgnsPatBrth.split(" ")[0].replace(/-/g, ""))}</span>
              <span>진료 구분: ${escape(selectedEventInfo.dgnsType === "U" ? "비대면" : "대면")}</span>
              <span>진료 상태: ${escape(selectedEventInfo.dgnsStat === "0" ? "접수전" : selectedEventInfo.dgnsStat === "3" ? "예약 확정" : selectedEventInfo.dgnsStat === "5" ? "진료 중" : selectedEventInfo.dgnsStat === "7" ? "진료 완료" : "알 수 없음")}</span></div>
            <div class="box-bottom text-xs"><span${add_attribute(
    "class",
    selectedEventInfo.dgnsStat === "5" ? "run" : selectedEventInfo.dgnsStat === "0" ? "wait" : "complete",
    0
  )}>${escape(selectedEventInfo.dgnsStat === "0" ? "접수전" : selectedEventInfo.dgnsStat === "3" ? "예약 확정" : selectedEventInfo.dgnsStat === "5" ? "진료 중" : selectedEventInfo.dgnsStat === "7" ? "진료 완료" : "알 수 없음")}</span></div></div>` : `<div class="info-box no-data"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"></path></svg>
      <span>예약된 일정이 없습니다.<br>다른 일자를 선택하거나 필터를 확인해주세요.</span></div>`}</div></div>

      
      </div>

    <footer>${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</footer></div></section>



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
