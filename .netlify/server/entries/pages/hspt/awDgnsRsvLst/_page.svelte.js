import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
import { s as susrShpId } from "../../../../chunks/loginStore.js";
/* empty css                                                          */import { D as DateInput } from "../../../../chunks/DateInput.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
import { F as Footer } from "../../../../chunks/Footer.js";
/* empty css                          */import { P as PageLoader } from "../../../../chunks/PageLoader.js";
let dateFormat = "yy-MM-dd";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_susrShpId;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => value);
  const pagination = {
    enabled: true,
    limit: 5
    // 한 페이지에 5개의 행을 표시
  };
  const style = {
    table: { width: "100%", border: "3px solid #ccc" },
    th: {
      "background-color": "rgba(0, 0, 0, 0.1)",
      color: "#000",
      "border-bottom": "2px solid #ccc",
      "text-align": "center"
    },
    td: { "text-align": "center" }
  };
  const columns = [
    "번호",
    "예약일",
    "환자명",
    "관계",
    "회원명",
    "진료과목",
    "진료항목",
    "의료진",
    "진료구분",
    "진료상태",
    "접수사유",
    { name: "진료예약번호", hidden: true }
  ];
  let data = [];
  let dgnsDtrName = "";
  let dgnsDttm = "";
  let dgnsTypeDesc = "";
  let dgnsPatName = "";
  let dgnsMbrName = "";
  let dgnsDeptName = "";
  let dgnsItemName = "";
  let dgnsPay = "";
  let dgnsPayType = "";
  let dgnsPayDttm = "";
  let dgnsPayStatDesc = "";
  let dgnsMemo = "";
  let date1 = /* @__PURE__ */ new Date();
  let date2 = /* @__PURE__ */ new Date();
  let searchText = "";
  let dgnsStatName = "";
  let selectedDoctor = null;
  let receptionDate = /* @__PURE__ */ new Date();
  async function findDtrTime() {
    return;
  }
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (receptionDate && selectedDoctor) {
        findDtrTime();
      }
    }
    $$rendered = `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>

<section id="con">
  <div id="content"><h2 class="page_title">진료 예약 목록</h2>
    <div class="box_search" style="display: flex; align-items: center; gap: 10px;"><span>기간</span>

      ${validate_component(DateInput, "DateInput").$$render(
      $$result,
      { format: dateFormat, value: date1 },
      {
        value: ($$value) => {
          date1 = $$value;
          $$settled = false;
        }
      },
      {}
    )} <span>~</span>
      ${validate_component(DateInput, "DateInput").$$render(
      $$result,
      { format: dateFormat, value: date2 },
      {
        value: ($$value) => {
          date2 = $$value;
          $$settled = false;
        }
      },
      {}
    )}

       
      <select><option value="">전체</option><option value="dgnsPatName">환자명</option><option value="dgnsMbrName">회원명</option><option value="dgnsDtrName">의료진</option></select>
      <label><input type="text"${add_attribute("value", searchText, 0)}></label>
      상태
      <select><option value="">정상</option><option value="9">취소</option></select>
      <button type="button" class="mbtn_n_5">검색</button></div>

    
    <div class="form_table list">${validate_component(Gridjs, "Grid").$$render($$result, { data, columns, style, pagination }, {}, {})}</div>
    

    <div class="form_table"><h3>진료정보</h3>
      ${``}

      <table><colgroup><col style="width:12% ;">
          <col style="width:38% ;">
          <col style="width:12% ;"></colgroup>
        <tr><th>의 료 진</th>
          <td>${escape(dgnsDtrName)}<button type="button" class="mbtn_n">변경</button></td>
          <th>예약상태</th>
          <td>${escape(dgnsStatName)}</td></tr>
        <tr><th>진료일시</th>
          <td>${escape(dgnsDttm)}</td>
          <th>진료구분</th>
          <td>${escape(dgnsTypeDesc)}</td></tr>
        <tr><th>환 자 명</th>
          <td>${escape(dgnsPatName)}</td>
          <th>회 원 명</th>
          <td>${escape(dgnsMbrName)}</td></tr>
        <tr><th>진료과</th>
          <td>${escape(dgnsDeptName)}</td>
          <th>진료항목</th>
          <td>${escape(dgnsItemName)}</td></tr>
        <tr><th>메모</th>
          <td colspan="3">${escape(dgnsMemo)}</td></tr></table></div>

    <div class="form_table"><h3>결제정보</h3>
      <p class="ess_info">
        
        

        <input type="file" accept="image/*" style="width: 0; height: 0; position: absolute; overflow: hidden; opacity: 0;">
        <button type="button" class="mbtn_b">처방전 업로드</button>

        ${``}
        <button type="button" class="mbtn_b">결제완료</button>
        <button type="button" class="mbtn_b">결제취소</button></p>
      <table><colgroup><col style="width:12% ;">
          <col style="width:38% ;">
          <col style="width:12% ;">
          <col style="width:38% ;"></colgroup>
        <tr><th>결제금액</th>
          <td>${escape(dgnsPay)}</td>
          <th>결제구분</th>
          <td>${escape(dgnsPayType)}</td></tr>
        <tr><th>결제일시</th>
          <td>${escape(dgnsPayDttm)}</td>
          <th>결제상태</th>
          <td>${escape(dgnsPayStatDesc)}</td></tr></table></div>
    
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></section>

${``}

${``}


${``}


${``}


${``}


${``}


${``}


${``}


${`${validate_component(PageLoader, "PageLoader").$$render($$result, {}, {}, {})}`}`;
  } while (!$$settled);
  $$unsubscribe_susrShpId();
  return $$rendered;
});
export {
  Page as default
};
