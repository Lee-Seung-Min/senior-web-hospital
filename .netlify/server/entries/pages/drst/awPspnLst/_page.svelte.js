import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../../chunks/index3.js";
/* empty css                                                          */import { D as DateInput } from "../../../../chunks/DateInput.js";
import "../../../../chunks/index.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
import { F as Footer } from "../../../../chunks/Footer.js";
import { s as susrShpId } from "../../../../chunks/loginStore.js";
let pdrgName = "";
let pdrgOneTime = "";
let pdrgOneday = "";
let pdrgTotDay = "";
let pdrgDesc = "";
let dateFormat = "yy-MM-dd";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_susrShpId;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => value);
  const style = {
    table: { border: "3px solid #ccc" },
    th: {
      "background-color": "rgba(0, 0, 0, 0.1)",
      color: "#000",
      "border-bottom": "3px solid #ccc",
      "text-align": "center"
    },
    td: { "text-align": "center" }
  };
  const columns = [
    "번호",
    "진료예약일",
    "환자명",
    "회원명",
    "접수일",
    "배달방법",
    "병원",
    "의사명",
    "배송일",
    { name: "접수번호", hidden: true },
    { name: "병원처방접수번호", hidden: true }
  ];
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
    ]
  ];
  let drcpStatDesc = "";
  let drcpReqDttm = "";
  let drcpPatName = "";
  let drcpMbrName = "";
  let drcpShpName = "";
  let drcpPspnIssueNo = "";
  let drcpDlvFee = "";
  let drcpDlvNo = "";
  let drcpDlvDttm = "";
  let date1 = /* @__PURE__ */ new Date();
  let date2 = /* @__PURE__ */ new Date();
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>













<section id="con">







  <div id="content">
    <h2>처방전 접수현황</h2>

    <div class="box_search"><span>기간</span>
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
    )} <span>~</span> ${validate_component(DateInput, "DateInput").$$render(
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
      

      <select><option value="">전체</option><option value="">환자명</option><option value="">진료과목</option><option value="">상태</option></select>
      <label><input type="text" name="" id=""></label>
      <button type="button" class="mbtn_n_5">검색</button>
      <button type="button" class="mbtn_n_9">초기화</button></div>

    
    <div class="form_table list">${validate_component(Gridjs, "Grid").$$render($$result, { data, columns, style }, {}, {})}
      
      </div>
    

    

    <div class="form_table"><h3>접수상세</h3>
      <p class="ess_info"><select><option value="4">접수</option><option value="5">조제중</option><option value="6">조제완료</option><option value="9">취소</option></select>
        <button type="button" class="mbtn_n_4">저장</button></p>
      <table><tr><th>접수상태</th>
          <td>${escape(drcpStatDesc)}</td>
          <th>접수신청</th>
          <td>${escape(drcpReqDttm)}</td></tr>
        <tr><th>환 자 명</th>
          <td>${escape(drcpPatName)}</td>
          <th>회 원 명</th>
          <td>${escape(drcpMbrName)}</td></tr>
        <tr><th>발급병원</th>
          <td>${escape(drcpShpName)}</td>
          <th>발행번호</th>
          <td>${escape(drcpPspnIssueNo)}</td></tr>
        <tr><th>조제비</th>
          <td><input type="text"></td>
          <th>배송비</th>
          <td>${escape(drcpDlvFee)}</td></tr>
        <tr><th>배송번호</th>
          <td>${escape(drcpDlvNo)}</td>
          <th>배송일</th>
          <td>${escape(drcpDlvDttm)}<button type="button" class="mbtn_b changePw" style="float:right">등록</button></td></tr></table></div>
    <div class="form_table"><h3>처방상세</h3>
      <p class="ess_info"><button type="button" class="mbtn_b dgns">처방전</button>
        <button type="button" class="mbtn_b" data-url="JavaScript:onNotify()">알림</button></p>
      <table class="tbl_center"><tr><th>처방 의약품의 명칭</th>
          <th>1회 투약량</th>
          <th>1일 투여횟수</th>
          <th>총 투약일수</th>
          <th>용법</th>
          <th>대체조제</th></tr>
        <tr><td>${escape(pdrgName)}</td>
          <td>${escape(pdrgOneTime)}</td>
          <td>${escape(pdrgOneday)}</td>
          <td>${escape(pdrgTotDay)}</td>
          <td>${escape(pdrgDesc)}</td>
          <td><button type="button" class="mbtn_b">선택</button></td></tr></table>
      ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>
    </div></section>


<section class="full_layer" id="changePw"><div class="bg"></div>
  <div class="box_1 notify"><p class="text_tit">배송결과 등록</p>
    <button type="button" class="modal_close close_btn"><i class="xi-close-min"></i></button>
    <hr>
    <div class="form_table"><table><tr><th>환자명</th>
          <td>우희정</td>
          <th>접수일시</th>
          <td>2023-03-02 14:00</td></tr>
        <tr><th>배송구분</th>
          <td>택배</td>
          <th>배송사</th>
          <td>원격</td></tr>
        <tr><th>배송일</th>
          <td><label class="select_data"><input type="text" class="datepicker"></label></td>
          <th>배송번호</th>
          <td><input type="text"></td></tr></table></div>
    <p class="btn_wrap inline"><button type="button" class="btn_02 small close_btn">저장</button>
      <button type="button" class="btn_03 small close_btn">취소</button>
    </p><p></p></div></section>
<section class="full_layer" id="alertWin"><div class="bg"></div>
  <div class="box_1"><p class="text_tit">알림</p>
    <div class="form_table"><table><tr><th>환자명</th>
          <td>우희정</td>
          <th>접수일시</th>
          <td>2023-03-02 14:00</td></tr>
        <tr><th>병원명</th>
          <td>비트의원</td>
          <th>진료항목</th>
          <td>감기</td></tr>
        <tr><th>배송구분</th>
          <td>방문수령</td>
          <th>재진/신규</th>
          <td>재진</td></tr></table></div>
    <p class="btn_wrap inline"><button type="button" class="btn_04 small close_btn">상세보기</button>
    </p><p></p></div></section>
`;
  } while (!$$settled);
  $$unsubscribe_susrShpId();
  return $$rendered;
});
export {
  Page as default
};
