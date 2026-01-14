import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape } from "../../../../chunks/index3.js";
/* empty css                                                          */import { D as DateInput } from "../../../../chunks/DateInput.js";
import "../../../../chunks/index.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
/* empty css                          */import { s as susrShpId } from "../../../../chunks/loginStore.js";
import "exceljs";
import { P as PageLoader } from "../../../../chunks/PageLoader.js";
let dateFormat = "yy-MM-dd";
function dateCalc(date, year, month, days) {
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + month);
  date.setFullYear(date.getFullYear() + year);
  return new Date(date);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_susrShpId;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => value);
  const pagination = {
    enabled: true,
    limit: 5
    // 한 페이지에 5개의 행을 표시
  };
  const style = {
    table: {
      border: "3px solid #ccc",
      "white-space": "nowrap"
    },
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
    { name: "가맹점정산번호", hidden: true },
    "정산일",
    "매장명",
    "결제모듈",
    "정산상태",
    { name: "결제기간", hidden: true },
    "거래일(승인-취소)",
    "거래건수 합계",
    "거래금액 합계",
    "정산금액 합계",
    "일반수수료 합계",
    "일반부가세 합계",
    "무이자수수료 합계",
    "무이자부가세 합계",
    "포인트수수료 합계",
    "포인트부가세 합계",
    "에스크로수수료 합계",
    "에스크로부가세 합계",
    "인증수수료 합계",
    "인증부가세 합계",
    "쿠폰수수료 합계",
    "쿠폰부가세 합계",
    "복합결제수수료 합계",
    "복합결제부가세 합계"
  ];
  let data = [];
  let dateFrom = dateCalc(/* @__PURE__ */ new Date(), 0, 0, -7);
  let dateTo = /* @__PURE__ */ new Date();
  let padjMdlType = "결제모듈";
  let padjAdjDate = "정산일";
  let padjData = [];
  const padjColumns = [
    "번호",
    { name: "정산ID", hidden: true },
    { name: "결제ID", hidden: true },
    "환자명",
    "결제자명",
    "거래ID",
    "결제상태코드",
    "승인일자",
    "승인시간",
    "취소일자",
    "취소시간",
    "정산일자",
    "상품명",
    "금액",
    "과세",
    "비과세",
    "할인금액",
    "주 결제금액",
    "쿠폰금액",
    "복합결제금액",
    "복합결제금액(고객실차감)",
    "환경부담금",
    "할부개월",
    "일반수수료",
    "일반부가세",
    "무이자수수료",
    "무이자부가세",
    "포인트수수료",
    "포인트부가세",
    "에스크로수수료",
    "에스크로부가세",
    "인증수수료",
    "인증부가세",
    "쿠폰수수료",
    "쿠폰부가세",
    "복합결제수수료",
    "복합결제부가세",
    "입금금액"
  ];
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<section id="con"><div id="content"><div>
            <h2 class="page_title">정산 현황</h2>

            <div class="box_search period"><span>기간</span>
                ${validate_component(DateInput, "DateInput").$$render(
      $$result,
      {
        class: "select_data",
        format: dateFormat,
        value: dateFrom
      },
      {
        value: ($$value) => {
          dateFrom = $$value;
          $$settled = false;
        }
      },
      {}
    )}
                <span>~</span>
                ${validate_component(DateInput, "DateInput").$$render(
      $$result,
      {
        class: "select_data",
        format: dateFormat,
        value: dateTo
      },
      {
        value: ($$value) => {
          dateTo = $$value;
          $$settled = false;
        }
      },
      {}
    )}
                
                
                

                
                
                
                <div class="tabs tabs_pill period"><ul><li${add_attribute("class", "", 0)}><a rel="tab5">1개월</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab6">3개월</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab7">6개월</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab8">1년</a></li></ul></div>
                <div class="btn_box">
                    <button type="button" class="mbtn_n_5">검색</button>
                    <button type="button" class="mbtn_n_5">자료받기</button></div></div>

            
            <div class="form_table list">${validate_component(Gridjs, "Grid").$$render($$result, { data, columns, style, pagination }, {}, {})}</div></div>
        
        <div><h2 class="page_title">정산 상세정보 / ${escape(padjMdlType)} / ${escape(padjAdjDate)}</h2>
            <div class="form_table list">${validate_component(Gridjs, "Grid").$$render(
      $$result,
      {
        data: padjData,
        columns: padjColumns,
        style
      },
      {},
      {}
    )}</div></div>


        
        <footer><p>Copyright Baro Doctor. All Rights Reserved.</p></footer></div></section>


<section class="full_layer" id="changePw"><div class="bg"></div>
    <div class="box_1"><p class="text_tit">비밀번호 변경</p>
        <label><input type="text" name="" id=""><span class="txt_red">사용불가</span>
            <p class="text_info">* 영어대소문자, 숫자, 특수문자만 사용 가능</p></label>
        <label><input type="text" name="" id=""><span class="txt_blue">일치</span></label>
        <p class="btn_wrap inline"><button type="button" class="btn_02 small close_btn">변경</button>
            <button type="button" class="btn_03 small close_btn">취소</button>
        </p><p></p></div></section>



${`${validate_component(PageLoader, "PageLoader").$$render($$result, {}, {}, {})}`}`;
  } while (!$$settled);
  $$unsubscribe_susrShpId();
  return $$rendered;
});
export {
  Page as default
};
