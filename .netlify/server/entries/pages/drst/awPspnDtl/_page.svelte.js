import { c as create_ssr_component } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="content" id="pspn_box"><div class="bg"><div class="box_1"><div class="form_table"><button type="button" class="modal_close" onclick="closeAlert('pspn_box')"><i class="xi-close-min"></i></button>
          <table><tr><td colspan="3" class="txt_c"><h3>처 방 전</h3></td></tr>
            <tr><td width="45%" class="noTd">요양기관번호 <span class="noStxt">000000002</span></td></tr>
            <tr><td><input type="checkbox"> 건강보험 <input type="checkbox"> 의료급여 <input type="checkbox"> 산재보험 <input type="checkbox"> 자동차보험 <input type="checkbox"> 기타 </td></tr></table></div>
        <div class="form_table"><table class="tbl_left has_line"><colgroup><col width="15%">
              <col width="15%">
              <col width="20%">
              <col width="15%">
              <col width="15%">
              <col width="20%"></colgroup>
            <tr><th colspan="2">교부 연월 및 번호</th>
              <td>20230302</td>
              <th rowspan="3">의료기관</th>
              <th>명칭</th>
              <td>모커리한방병원</td></tr>
            <tr><th rowspan="2">환자</th>
              <th>성명</th>
              <td>박형용</td>
              <th>전화번호</th>
              <td>025555999</td></tr>
            <tr><th>주민등록번호</th>
              <td>200111-4******</td>
              <th>팩스번호</th>
              <td>025555999</td></tr>
            <tr><th rowspan="2">질병 분류 기호</th>
              <td>R51</td>
              <th rowspan="2">처방의료인의 서명</th>
              <td rowspan="2">우희정     <span class="in">(인)</span></td>
              <th>면허증명</th>
              <td>한의사</td></tr>
            <tr><td></td>
              <th>면허번호</th>
              <td>21588</td></tr>
            <tr><td colspan="6" style="text-align: center">환자의 요구가 있을 때에는 질병분류 기호를 기재하지 아니합니다.</td></tr></table></div>
        <div class="form_table"><table class="tbl_left"><tr><th colspan="2">처방의약품의 명칭</th>
                <th>1회 투약량</th>
                <th>1회 투여일 수</th>
                <th>총 투여일 수</th>    
                <th>용법</th></tr>
              <tr><td>어린이용타이레놀정 80mg(아세트아미노펜)</td>
                <td></td>
                <td>1</td>
                <td>1</td>
                <td>3</td>
                <td></td></tr>
              <tr><th colspan="6" style="text-align: center">주사제 처방내역 <input type="checkbox"> 원내조제 <input type="checkbox"> 원외 처방</th></tr></table></div>

        <div class="form_table"><table><th>사용기간</th>
              <td>교부일로부터 (7)일간, 약국제출용은 사용기간내에 약국에 제출하여야 합니다.</td></table></div></div></div></div>`;
});
export {
  Page as default
};
