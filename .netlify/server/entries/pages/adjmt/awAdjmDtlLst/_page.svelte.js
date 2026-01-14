import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
/* empty css                                                          */import "../../../../chunks/index.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
let sadjSvcDTTM = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
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
    "결제액",
    "수수료",
    "서비스료",
    "정산액",
    "결제일",
    "회원명",
    "환자명",
    "결제구분",
    "결제상태",
    { name: "정산번호", hidden: true }
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
      "23-02-28 ~ 23-03-07"
    ],
    [
      "2",
      "23-01-05",
      "450,000",
      "10,000",
      "25,000",
      "415,000",
      "정산전",
      "23-02-20 ~ 23-02-27"
    ]
  ];
  let sadjAdjDate = "";
  let sadjAdjFromTo = "";
  let sadjAdjRegUsr = "";
  let sadjAdjStat = "";
  let sadjPay = "";
  let sadjShpName = "";
  let sadjShpTel = "";
  let sadjVat = "";
  let sadjMbrName = "";
  let sadjPatName = "";
  let sadjPayAmt = "";
  let sadjPayDttm = "";
  let sadjPayMthd = "";
  let sadjdtlfee = "";
  let sadjShpPay = "";
  let sadjShpVat = "";
  $$unsubscribe_page();
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>
<section id="head"><button type="button" onclick="onMenuSlide()"><i class="icon-arrow icon-chevron-left"></i>
    <i class="icon-menu"></i></button>
  <h1>바로닥터 가맹점</h1>
  <div class="admin"><i class="icon-account_circle"></i>
    <span><b>관리자</b>님</span>
    <button type="button" class="btn_03 btn_xs" onclick="">Logout</button></div></section>

<section id="con"><div id="menu"><h1></h1>
    <div class="lnb"></div>
    <div class="copyright">BIT Doctor.</div></div>

  <div id="content">
    <h2 class="page_title">정산 상세 목록</h2>

    <div class="form_table"><table><tr><th>가맹점명</th>
          <td>${escape(sadjShpName)}</td>
          <th>연락처</th>
          <td>${escape(sadjShpTel)}</td>
          <th>메모</th>
          <td colspan="2"></td></tr>
        <tr><th>정산일</th>
          <td>${escape(sadjAdjDate)}</td>
          <th>결제기간</th>
          <td>${escape(sadjAdjFromTo)}</td>
          <th>정산처리자</th>
          <td>${escape(sadjAdjRegUsr)}</td>
          <th>정산상태</th>
          <td>${escape(sadjAdjStat)}</td></tr>
        <tr><th>정산건수</th>
          <td>150</td>
          <th>결제액</th>
          <td>${escape(sadjPay)}</td>
          <th>수수료</th>
          <td>${escape(sadjVat)}</td>
          <th>정산액</th>
          <td>${escape(sadjVat)}</td></tr>
        <p class="ess_info mt10"><button class="mbtn_b4">정산완료</button><button class="mbtn_b_9">정산취소</button></p></table></div>

    
    <div class="form_table list">${validate_component(Gridjs, "Grid").$$render($$result, { data, columns, style }, {}, {})}
      </div>

    

    <div class="form_table"><h3>정산 상세 내역</h3>
      <p class="ess_info"><button class="mbtn_b4">저장</button><button class="mbtn_b_9">취소</button></p>
      <table><colgroup><col style="width:12% ;">
          <col style="width:38% ;">
          <col style="width:12% ;"></colgroup>
        <tr><th>회원명</th>
          <td>${escape(sadjMbrName)}</td>
          <th>환자명</th>
          <td>${escape(sadjPatName)}</td></tr>
        <tr><th>구분</th>
          <td>${escape(sadjdtlfee)}</td>
          <th>진료 및 처방일자</th>
          <td>${escape(sadjSvcDTTM)}</td></tr>
        <tr><th>결제방식</th>
          <td>${escape(sadjPayMthd)}</td>
          <th>결제일자</th>
          <td>${escape(sadjPayDttm)}</td></tr>
        <tr><th>결제금액</th>
          <td>${escape(sadjPayAmt)}</td>
          <th>수수료</th>
          <td>${escape(sadjShpVat)}</td></tr>
        <tr><th>정산금액</th>
          <td>${escape(sadjShpPay)}</td>
          <th>서비스료</th>
          <td></td></tr></table></div>

    
    <footer><p>Copyright Baro Doctor. All Rights Reserved.</p></footer></div></section>


<section class="full_layer" id="changePw"><div class="bg"></div>
  <div class="box_1"><p class="text_tit">비밀번호 변경</p>
    <label><input type="text" name="" id=""><span class="txt_red">사용불가</span>
      <p class="text_info">* 영어대소문자, 숫자, 특수문자만 사용 가능</p></label>
    <label><input type="text" name="" id=""><span class="txt_blue">일치</span></label>
    <p class="btn_wrap inline"><button type="button" class="btn_02 small close_btn">변경</button>
      <button type="button" class="btn_03 small close_btn">취소</button></p>
    <p></p></div></section>
`;
});
export {
  Page as default
};
