import { c as create_ssr_component, b as add_attribute, v as validate_component, d as each, e as escape } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
import { F as Footer } from "../../../../chunks/Footer.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ntcDtl = [];
  let currentPage = 0;
  let pages = [];
  let ntcSearchKey = "";
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
  const columns = ["번호", "제목", "게시일"];
  let data = [];
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>

<section id="con"><div id="content">
    <h2 class="page_title">공지사항</h2>

    <div class="box_search"><select><option value="A">전체</option><option value="T">제목</option><option value="C">내용</option></select>
      <label><input type="text" name="" id=""${add_attribute("value", ntcSearchKey, 0)}></label>
      <button type="button" class="mbtn_n_5">검색</button></div>
    
    <div class="form_table list">${validate_component(Gridjs, "Grid").$$render($$result, { data, columns, style }, {}, {})}</div>
    

    
    <div class="page"><button type="button" class="fist"></button>
      ${each(pages, (page) => {
    return `<button type="button"${add_attribute("class", page == currentPage + 1 ? "on" : "", 0)}>${escape(page)}</button>`;
  })}
      <button type="button" class="last"></button></div>
    

    
    

    <div${add_attribute(
    "class",
    "notice_detail",
    0
  )}><div class="box_1"><div class="form_table"><h3>공지내용 <span class="view_type"></span>
            <div class="ar"><button class="mbtn_n_4" type="button">취소</button></div></h3>
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
