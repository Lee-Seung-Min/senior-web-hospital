import { c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component, d as each, e as escape } from "../../../../../chunks/index3.js";
import { P as PageLoader } from "../../../../../chunks/PageLoader.js";
import { F as Footer } from "../../../../../chunks/Footer.js";
import "../../../../../chunks/index.js";
import { g as getAPI, s as shopUrlAddr } from "../../../../../chunks/getAPI.js";
import { s as susrShpId } from "../../../../../chunks/loginStore.js";
import { G as Gridjs } from "../../../../../chunks/gridjs.js";
/* empty css                             */import { D as DateInput } from "../../../../../chunks/DateInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $susrShpId, $$unsubscribe_susrShpId;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => $susrShpId = value);
  const columns = [
    "번호",
    "환자명",
    "생년월일",
    "성별",
    "회원명",
    "관계",
    "전화번호",
    "최근진료일",
    { name: "진단ID", hidden: true },
    { name: "회원ID", hidden: true },
    { name: "환자ID", hidden: true }
  ];
  const pagination = { enabled: true, limit: 5 };
  const style = {
    table: { width: "100%" },
    // border: "3px solid #ccc",
    th: {
      // "background-color": "rgba(0, 0, 0, 0.1)",
      // color: "#000",
      // "border-bottom": "2px solid #ccc",
      "text-align": "center"
    },
    td: { "text-align": "center" }
  };
  const language = { pagination: { previous: "<", next: ">" } };
  let searchText = "";
  let birthDate = null;
  let selectedMbrData = {};
  let data = [];
  let doctorList = [];
  let receptionDate = /* @__PURE__ */ new Date();
  let selectedHour = "";
  let rghour = [];
  let selectedDoctor = "";
  let selectedDgnsType = "";
  let selectedDeptId = "";
  let selectedItemId = "";
  let selectedDtrItemList = [];
  let selectedDtrDeptList = [];
  async function findDtrTime() {
    return;
  }
  async function getSelectedDtrItem(dtrId) {
    const itemurl = shopUrlAddr + "/v1/Shop/selectHsptDoctorItemList?dtrId=" + dtrId + "&shpId=" + $susrShpId;
    let resDtrItem = await getAPI(itemurl);
    selectedDtrItemList = resDtrItem.resultVO;
  }
  async function getSelectedDtrDept(dtrId) {
    const deptUrl = shopUrlAddr + "/v1/Shop/selectHsptDoctorDeptList?dtrId=" + dtrId + "&shpId=" + $susrShpId;
    let resDtrDept = await getAPI(deptUrl);
    selectedDtrDeptList = resDtrDept.resultVO;
  }
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (receptionDate && selectedDoctor) {
        findDtrTime();
        getSelectedDtrDept(selectedDoctor.dtrId);
        getSelectedDtrItem(selectedDoctor.dtrId);
      }
    }
    $$rendered = `<section id="con"><div id="content"><div class="list-set form_table"><span>진료 접수/예약</span>
      <div class="box_search" style="display: flex; align-items: center; gap: 10px;"><span>환자명</span>
          <label><input type="text" name="" id="" placeholder="검색어를 입력하세요"${add_attribute("value", searchText, 0)}></label>
        <span>생년월일</span>
        ${validate_component(DateInput, "DateInput").$$render(
      $$result,
      {
        format: "yyyy-MM-dd",
        placeholder: "생년월일 선택",
        min: new Date(1900, 0, 1),
        max: /* @__PURE__ */ new Date(),
        value: birthDate
      },
      {
        value: ($$value) => {
          birthDate = $$value;
          $$settled = false;
        }
      },
      {}
    )}
        <button type="button" class="mbtn_n_5 ibtn-search btn-lg">검색</button></div>
      <div class="form_table">${validate_component(Gridjs, "Grid").$$render(
      $$result,
      {
        class: "gridjs",
        columns,
        data,
        pagination,
        style,
        language,
        fixedHeader: true
      },
      {},
      {}
    )}</div></div>

    <div class="form_table"><h3 style="margin-bottom: 10px;">회원 정보 접수/예약</h3>
      <table><colgroup><col style="width:10%;">
          <col style="width:20%;">
          <col style="width:10%;">
          <col style="width:20%;"></colgroup>
        <tr><th>의료진</th>
          <td><select ${selectedMbrData.length === 0 ? "disabled" : ""}><option value="">의료진 선택</option>${each(doctorList, (doctor) => {
      return `<option${add_attribute("value", doctor, 0)}>${escape(doctor.dtrName)}
                </option>`;
    })}</select></td>
          <th>접수일시</th>
          <td><div style="display: flex; align-items: center; gap: 10px;">${validate_component(DateInput, "DateInput").$$render(
      $$result,
      {
        format: "yy-MM-dd",
        min: /* @__PURE__ */ new Date(),
        style: "min-height: 300px;",
        value: receptionDate
      },
      {
        value: ($$value) => {
          receptionDate = $$value;
          $$settled = false;
        }
      },
      {}
    )}
              <select ${!rghour.length || !selectedDoctor ? "disabled" : ""}><option value="">시간 선택</option>${each(rghour, (time) => {
      return `<option${add_attribute("value", time.htmeFrom, 0)}>${escape(time.htmeFrom)} ~ ${escape(time.htmeTo)}</option>`;
    })}</select></div></td></tr>
        <tr><th>진료구분</th>
          <td><select ${"disabled"}><option value="">선택하세요</option>${``}</select></td>
          <th>진료과</th>
          <td><select ${"disabled"}><option value="">진료과 선택</option>${each(selectedDtrDeptList, (deptList) => {
      return `<option${add_attribute("value", deptList.deptId, 0)}>${escape(deptList.deptName)}</option>`;
    })}</select></td></tr>
        <tr><th>회원명</th>
          <td>${escape(selectedMbrData.mbrName || "")}</td>
          <th>진료항목</th>
          <td><select ${"disabled"}><option value="">진료항목선택</option>${each(selectedDtrItemList, (itemList) => {
      return `<option${add_attribute("value", itemList.itemId, 0)}>${escape(itemList.itemName)}</option>`;
    })}</select></td></tr>
        <tr><th>환자명</th>
          <td>${escape(selectedMbrData.patName || "")}</td>
          <th>관계</th>
          <td>${escape(selectedMbrData.type || "")}</td></tr>
        <tr><th colspan="4">진료 사유</th></tr>
        <tr><td colspan="4"><div class="input_box_no" style="height:120px;"><textarea placeholder="진료 사유 작성">${escape("")}</textarea></div></td></tr>
        <tr></tr></table>
      <div class="ess_info"><button type="button" class="mbtn_b btn-lg" style="margin-top:10px; align-items: center !important;" ${!selectedMbrData.patName || !selectedDgnsType || !selectedHour || !selectedDoctor || !selectedItemId || !selectedDeptId ? "disabled" : ""}>접수/예약
        </button></div></div>
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}

    ${``}

    ${`${validate_component(PageLoader, "PageLoader").$$render($$result, {}, {}, {})}`}</div></section>`;
  } while (!$$settled);
  $$unsubscribe_susrShpId();
  return $$rendered;
});
export {
  Page as default
};
