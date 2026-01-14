import { c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component, d as each, e as escape } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
import { F as Footer } from "../../../../chunks/Footer.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
import "gridjs";
import { b as susrId, s as susrShpId } from "../../../../chunks/loginStore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_susrId;
  let $$unsubscribe_susrShpId;
  $$unsubscribe_susrId = subscribe(susrId, (value) => value);
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => value);
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
  const columns = [
    // {
    //   name: "",
    //   formatter: (_, row) => {
    //     return h("input", {
    //       type: "checkbox",
    //       checked: row.cells[0].data,
    //       onclick: (e) => {
    //         e.stopPropagation();
    //         handleCheckboxChange(row);
    //       },
    //     });
    //   },
    // },
    // ,
    "번호",
    "제목",
    "상태",
    "등록일",
    "최종수정일"
  ];
  let data = [];
  $$unsubscribe_susrId();
  $$unsubscribe_susrShpId();
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>

<section id="con"><div id="content">
    <h2 class="page_title">가맹점 공지사항</h2>

    <div class="box_search pr200"><select><option value="A">전체</option><option value="T">제목</option><option value="C">내용</option></select>
      <label><input type="text" class="w200" name="" id=""${add_attribute("value", ntcSearchKey, 0)}></label>
      <select><option value="">전체</option><option value="Y">노출</option><option value="N">비노출</option></select>

      <button type="button" class="mbtn_n_5">검색</button>
      <div class="ar">
        <button type="button" class="mbtn_n_3">등록</button></div></div>
    
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
  )}><div class="box_1"><div class="form_table"><h3>공지사항
            <span class="view_type">${`수정`}</span>
            <div class="ar"><button type="button" class="mbtn_n_3"><span class="view_type">${`수정`}</span></button>
              ${``}
              <button class="mbtn_n_4" type="button">취소</button></div></h3>
          <br>
          <table class="tbl_bbs"><colgroup><col width="100px">
              <col width="*"></colgroup>
            <tr><th>제목</th>
              <td><div class="input_box_no"><input class="w100p" type="text" name=""${add_attribute("value", ntcDtl.ntcTitl, 0)}>
                  <div class="no">${ntcDtl.ntcTitl == null ? `(0/50 자)` : `(${escape(ntcDtl.ntcTitl.length)}/50 자)`}</div></div></td></tr>
            <tr><th>상태</th>
              <td><input type="radio" name="radio" id="" value="Y" checked${"Y" === ntcDtl.ntcUseYon ? add_attribute("checked", true, 1) : ""}><span>노출 </span>
                <input type="radio" name="radio" id="" value="N"${"N" === ntcDtl.ntcUseYon ? add_attribute("checked", true, 1) : ""}><span>비노출</span></td></tr>
            <tr><th>내용</th>
              <td><div class="input_box_no"><textarea class="w100p" name="">${escape(ntcDtl.ntcCnts || "")}</textarea>

                  <div class="no">${ntcDtl.ntcCnts == null ? `(0/500 자)` : `(${escape(ntcDtl.ntcCnts.length)}/500 자)`}</div></div></td></tr></table></div></div></div>

    
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></section>
${``}
${``}
${``}
${``}
${``}
${``}`;
});
export {
  Page as default
};
