import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape } from "../../../../../chunks/index3.js";
import "../../../../../chunks/index.js";
import { G as Gridjs } from "../../../../../chunks/gridjs.js";
import { F as Footer } from "../../../../../chunks/Footer.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ntcDtl = [];
  let ntcSearchKey = "";
  const pagination = {
    enabled: true,
    limit: 5
    // 한 페이지에 5개의 행을 표시
  };
  const style = {
    table: {},
    // border: "3px solid #ccc",
    th: {
      // "background-color": "rgba(0, 0, 0, 0.1)",
      // color: "#000",
      // "border-bottom": "3px solid #ccc",
      "text-align": "center"
    },
    td: { "text-align": "center" }
  };
  const language = { pagination: { previous: "<", next: ">" } };
  const columns = ["번호", "제목", "게시일"];
  let data = [];
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>

<section id="con"><div id="content"><div class="list-set form_table"><span>공지사항</span>

      <div class="box_search" style="display: flex; align-items: center; gap: 10px;"><select><option value="A">전체</option><option value="T">제목</option><option value="C">내용</option></select>
        <label><input type="text" name="" id=""${add_attribute("value", ntcSearchKey, 0)}></label>
        <button type="button" class="mbtn_n_5 btn-lg ibtn-search">검색</button></div>
      <div class="form_table list">${validate_component(Gridjs, "Grid").$$render(
    $$result,
    {
      data,
      columns,
      pagination,
      style,
      language
    },
    {},
    {}
  )}</div></div>

    <div${add_attribute(
    "class",
    "notice_detail",
    0
  )}><div class="box_1"><div class="form_table"><h3>공지내용 <span class="view_type"></span>
            <div class="ar"><button class="mbtn_n_4 btn-lg ibtn-cancel" type="button">취소</button></div></h3>
          <br>
          
          <table><colgroup><col style="width:12% ;">
              <col style="width:38% ;">
              <col style="width:12% ;">
              <col style="width:38% ;"></colgroup>
            <tr><th>제목</th>
              <td colspan="3">${escape(ntcDtl.ntcTitl)}</td></tr>
            <tr><th>작성자</th>
              <td>바로닥터</td>
              <th>게시일</th>
              <td>${escape(ntcDtl.ntcFrom)}</td></tr>

            <tr class="bbs_content"><th>내용</th>
              <td colspan="3" style="white-space: pre-wrap">${escape(ntcDtl.ntcCnts)}</td></tr></table>
          </div></div></div>

    

    
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></section>`;
});
export {
  Page as default
};
