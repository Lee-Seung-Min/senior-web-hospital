import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../../chunks/index3.js";
import "../../../../chunks/index.js";
import { G as Gridjs } from "../../../../chunks/gridjs.js";
import { s as susrShpId } from "../../../../chunks/loginStore.js";
import { s as sdtlBankNum, a as shdyDesc, b as shdyTitl, c as shdyTo, d as shdyFrom, e as dtrHsptDept, f as shpVstYon, g as shpCtlsYon, h as shpNiNo, i as sdtlBank, j as shpDept, k as shpSubject, n as name, l as shpFeeRate, m as shpFee, o as shpFeeType, p as shpContTel, q as shpContName, r as shpEntDate, t as shpIntrCnts, u as shpIntrTitl, v as shpPath, w as shpFax, x as shpTel, y as shpLongi, z as shpLati, A as shpAddrDtl, B as shpAddr, C as shpZip, D as shpSido, E as shpPhrsName, F as shpRegNo, G as shpStopTo, H as shpStopFrom, I as shpRsvYon, J as shpWlkYon, K as shpStat, L as shpName, M as htmeRegUsrTyp, N as htmeRegUsr, O as htmeCtlsYon, P as htmeVstYon, Q as htmeType, R as dateFormat, S as dateFormatEnt, T as shpRegDttm, U as shpTimeIntv, V as shpIp, W as phrsName, X as shpCtlsDesc, Y as shpVstDesc, Z as shpStatSesc, _ as shpType, $ as shpId, a0 as rowNum } from "../../../../chunks/rgstStore.js";
import "crypto-js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_susrShpId;
  let $sdtlBankNum, $$unsubscribe_sdtlBankNum;
  let $$unsubscribe_shdyDesc;
  let $$unsubscribe_shdyTitl;
  let $$unsubscribe_shdyTo;
  let $$unsubscribe_shdyFrom;
  let $$unsubscribe_dtrHsptDept;
  let $shpVstYon, $$unsubscribe_shpVstYon;
  let $shpCtlsYon, $$unsubscribe_shpCtlsYon;
  let $shpNiNo, $$unsubscribe_shpNiNo;
  let $$unsubscribe_sdtlBank;
  let $shpDept, $$unsubscribe_shpDept;
  let $shpSubject, $$unsubscribe_shpSubject;
  let $$unsubscribe_name;
  let $$unsubscribe_shpFeeRate;
  let $$unsubscribe_shpFee;
  let $$unsubscribe_shpFeeType;
  let $shpContTel, $$unsubscribe_shpContTel;
  let $shpContName, $$unsubscribe_shpContName;
  let $shpEntDate, $$unsubscribe_shpEntDate;
  let $shpIntrCnts, $$unsubscribe_shpIntrCnts;
  let $shpIntrTitl, $$unsubscribe_shpIntrTitl;
  let $$unsubscribe_shpPath;
  let $shpFax, $$unsubscribe_shpFax;
  let $shpTel, $$unsubscribe_shpTel;
  let $$unsubscribe_shpLongi;
  let $$unsubscribe_shpLati;
  let $shpAddrDtl, $$unsubscribe_shpAddrDtl;
  let $shpAddr, $$unsubscribe_shpAddr;
  let $shpZip, $$unsubscribe_shpZip;
  let $$unsubscribe_shpSido;
  let $$unsubscribe_shpPhrsName;
  let $$unsubscribe_shpRegNo;
  let $shpStopTo, $$unsubscribe_shpStopTo;
  let $shpStopFrom, $$unsubscribe_shpStopFrom;
  let $$unsubscribe_shpRsvYon;
  let $$unsubscribe_shpWlkYon;
  let $shpStat, $$unsubscribe_shpStat;
  let $shpName, $$unsubscribe_shpName;
  let $$unsubscribe_htmeRegUsrTyp;
  let $$unsubscribe_htmeRegUsr;
  let $$unsubscribe_htmeCtlsYon;
  let $$unsubscribe_htmeVstYon;
  let $$unsubscribe_htmeType;
  let $$unsubscribe_dateFormat;
  let $$unsubscribe_dateFormatEnt;
  let $$unsubscribe_shpRegDttm;
  let $$unsubscribe_shpTimeIntv;
  let $$unsubscribe_shpIp;
  let $$unsubscribe_phrsName;
  let $$unsubscribe_shpCtlsDesc;
  let $$unsubscribe_shpVstDesc;
  let $$unsubscribe_shpStatSesc;
  let $$unsubscribe_shpType;
  let $$unsubscribe_shpId;
  let $$unsubscribe_rowNum;
  $$unsubscribe_susrShpId = subscribe(susrShpId, (value) => value);
  $$unsubscribe_sdtlBankNum = subscribe(sdtlBankNum, (value) => $sdtlBankNum = value);
  $$unsubscribe_shdyDesc = subscribe(shdyDesc, (value) => value);
  $$unsubscribe_shdyTitl = subscribe(shdyTitl, (value) => value);
  $$unsubscribe_shdyTo = subscribe(shdyTo, (value) => value);
  $$unsubscribe_shdyFrom = subscribe(shdyFrom, (value) => value);
  $$unsubscribe_dtrHsptDept = subscribe(dtrHsptDept, (value) => value);
  $$unsubscribe_shpVstYon = subscribe(shpVstYon, (value) => $shpVstYon = value);
  $$unsubscribe_shpCtlsYon = subscribe(shpCtlsYon, (value) => $shpCtlsYon = value);
  $$unsubscribe_shpNiNo = subscribe(shpNiNo, (value) => $shpNiNo = value);
  $$unsubscribe_sdtlBank = subscribe(sdtlBank, (value) => value);
  $$unsubscribe_shpDept = subscribe(shpDept, (value) => $shpDept = value);
  $$unsubscribe_shpSubject = subscribe(shpSubject, (value) => $shpSubject = value);
  $$unsubscribe_name = subscribe(name, (value) => value);
  $$unsubscribe_shpFeeRate = subscribe(shpFeeRate, (value) => value);
  $$unsubscribe_shpFee = subscribe(shpFee, (value) => value);
  $$unsubscribe_shpFeeType = subscribe(shpFeeType, (value) => value);
  $$unsubscribe_shpContTel = subscribe(shpContTel, (value) => $shpContTel = value);
  $$unsubscribe_shpContName = subscribe(shpContName, (value) => $shpContName = value);
  $$unsubscribe_shpEntDate = subscribe(shpEntDate, (value) => $shpEntDate = value);
  $$unsubscribe_shpIntrCnts = subscribe(shpIntrCnts, (value) => $shpIntrCnts = value);
  $$unsubscribe_shpIntrTitl = subscribe(shpIntrTitl, (value) => $shpIntrTitl = value);
  $$unsubscribe_shpPath = subscribe(shpPath, (value) => value);
  $$unsubscribe_shpFax = subscribe(shpFax, (value) => $shpFax = value);
  $$unsubscribe_shpTel = subscribe(shpTel, (value) => $shpTel = value);
  $$unsubscribe_shpLongi = subscribe(shpLongi, (value) => value);
  $$unsubscribe_shpLati = subscribe(shpLati, (value) => value);
  $$unsubscribe_shpAddrDtl = subscribe(shpAddrDtl, (value) => $shpAddrDtl = value);
  $$unsubscribe_shpAddr = subscribe(shpAddr, (value) => $shpAddr = value);
  $$unsubscribe_shpZip = subscribe(shpZip, (value) => $shpZip = value);
  $$unsubscribe_shpSido = subscribe(shpSido, (value) => value);
  $$unsubscribe_shpPhrsName = subscribe(shpPhrsName, (value) => value);
  $$unsubscribe_shpRegNo = subscribe(shpRegNo, (value) => value);
  $$unsubscribe_shpStopTo = subscribe(shpStopTo, (value) => $shpStopTo = value);
  $$unsubscribe_shpStopFrom = subscribe(shpStopFrom, (value) => $shpStopFrom = value);
  $$unsubscribe_shpRsvYon = subscribe(shpRsvYon, (value) => value);
  $$unsubscribe_shpWlkYon = subscribe(shpWlkYon, (value) => value);
  $$unsubscribe_shpStat = subscribe(shpStat, (value) => $shpStat = value);
  $$unsubscribe_shpName = subscribe(shpName, (value) => $shpName = value);
  $$unsubscribe_htmeRegUsrTyp = subscribe(htmeRegUsrTyp, (value) => value);
  $$unsubscribe_htmeRegUsr = subscribe(htmeRegUsr, (value) => value);
  $$unsubscribe_htmeCtlsYon = subscribe(htmeCtlsYon, (value) => value);
  $$unsubscribe_htmeVstYon = subscribe(htmeVstYon, (value) => value);
  $$unsubscribe_htmeType = subscribe(htmeType, (value) => value);
  $$unsubscribe_dateFormat = subscribe(dateFormat, (value) => value);
  $$unsubscribe_dateFormatEnt = subscribe(dateFormatEnt, (value) => value);
  $$unsubscribe_shpRegDttm = subscribe(shpRegDttm, (value) => value);
  $$unsubscribe_shpTimeIntv = subscribe(shpTimeIntv, (value) => value);
  $$unsubscribe_shpIp = subscribe(shpIp, (value) => value);
  $$unsubscribe_phrsName = subscribe(phrsName, (value) => value);
  $$unsubscribe_shpCtlsDesc = subscribe(shpCtlsDesc, (value) => value);
  $$unsubscribe_shpVstDesc = subscribe(shpVstDesc, (value) => value);
  $$unsubscribe_shpStatSesc = subscribe(shpStatSesc, (value) => value);
  $$unsubscribe_shpType = subscribe(shpType, (value) => value);
  $$unsubscribe_shpId = subscribe(shpId, (value) => value);
  $$unsubscribe_rowNum = subscribe(rowNum, (value) => value);
  const style = {
    table: { width: "100%", border: "3px solid #ccc" },
    th: {
      "background-color": "rgba(0, 0, 0, 0.1)",
      color: "#000",
      "border-bottom": "3px solid #ccc",
      "text-align": "center"
    },
    td: { "text-align": "center" }
  };
  let dtrColumns = ["번호", "의사명", "진료과", "진료분야", "면허번호", "비대면진료"];
  let docData = [["", "", "", "", "", ""]];
  let docInfo = {};
  let holInfoList = [""];
  let hlTitl = "";
  let imgSource = "";
  let hsptDeptLst = [];
  let dtrDeptLst = [];
  let dtrItemLst = [];
  let startTime = "";
  let endTime = "";
  new Array(7).fill(false);
  (/* @__PURE__ */ new Date()).getFullYear();
  (/* @__PURE__ */ new Date()).getMonth() + 1;
  $$unsubscribe_susrShpId();
  $$unsubscribe_sdtlBankNum();
  $$unsubscribe_shdyDesc();
  $$unsubscribe_shdyTitl();
  $$unsubscribe_shdyTo();
  $$unsubscribe_shdyFrom();
  $$unsubscribe_dtrHsptDept();
  $$unsubscribe_shpVstYon();
  $$unsubscribe_shpCtlsYon();
  $$unsubscribe_shpNiNo();
  $$unsubscribe_sdtlBank();
  $$unsubscribe_shpDept();
  $$unsubscribe_shpSubject();
  $$unsubscribe_name();
  $$unsubscribe_shpFeeRate();
  $$unsubscribe_shpFee();
  $$unsubscribe_shpFeeType();
  $$unsubscribe_shpContTel();
  $$unsubscribe_shpContName();
  $$unsubscribe_shpEntDate();
  $$unsubscribe_shpIntrCnts();
  $$unsubscribe_shpIntrTitl();
  $$unsubscribe_shpPath();
  $$unsubscribe_shpFax();
  $$unsubscribe_shpTel();
  $$unsubscribe_shpLongi();
  $$unsubscribe_shpLati();
  $$unsubscribe_shpAddrDtl();
  $$unsubscribe_shpAddr();
  $$unsubscribe_shpZip();
  $$unsubscribe_shpSido();
  $$unsubscribe_shpPhrsName();
  $$unsubscribe_shpRegNo();
  $$unsubscribe_shpStopTo();
  $$unsubscribe_shpStopFrom();
  $$unsubscribe_shpRsvYon();
  $$unsubscribe_shpWlkYon();
  $$unsubscribe_shpStat();
  $$unsubscribe_shpName();
  $$unsubscribe_htmeRegUsrTyp();
  $$unsubscribe_htmeRegUsr();
  $$unsubscribe_htmeCtlsYon();
  $$unsubscribe_htmeVstYon();
  $$unsubscribe_htmeType();
  $$unsubscribe_dateFormat();
  $$unsubscribe_dateFormatEnt();
  $$unsubscribe_shpRegDttm();
  $$unsubscribe_shpTimeIntv();
  $$unsubscribe_shpIp();
  $$unsubscribe_phrsName();
  $$unsubscribe_shpCtlsDesc();
  $$unsubscribe_shpVstDesc();
  $$unsubscribe_shpStatSesc();
  $$unsubscribe_shpType();
  $$unsubscribe_shpId();
  $$unsubscribe_rowNum();
  return `<div id="skipNavi"><a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a></div>













<section id="con">
  
  

  
  
  

  <div id="content">
    <h2 class="page_title">병원 정보</h2>

    <div class="tab_container"><p class="required_box"><span class="required">*</span> 는 필수입력 정보입니다.</p>
      <div class="tabs"><ul><li${add_attribute("class", "active", 0)}><a rel="tab1">병원일반
            </a></li>
          <li${add_attribute("class", "", 0)}>
            
            <a rel="tab2">진료시간
            </a></li>
          <li${add_attribute(
    "class",
    "",
    0
  )}><a rel="tab3">의사정보
            </a></li>
          <li${add_attribute("class", "", 0)}><a rel="tab4">휴일관리
            </a></li></ul></div>
      <div id="tab1"${add_attribute(
    "class",
    "tab_content active",
    0
  )}><form action="/shop/awHsptDtl" method="PUT"><div class="form_table"><table><colgroup><col style="width:12%;">
                <col style="width:38%;">
                <col style="width:12%;">
                <col style="width:38%;"></colgroup>
              <tr><th class="ess3">병원명</th>
                <td><input type="text" class="w100p"${add_attribute("value", $shpName, 0)}></td>
                <th class="ess3">요양기관번호</th>
                <td><input type="text" class="w100p"${add_attribute("value", $shpNiNo, 0)}></td></tr>
              <tr><th class="ess3">진료과목</th>
                <td colspan="3">
                  <div class="dropDown"><div style="width: 100%;">${$shpDept != null ? `${escape($shpDept)}` : ``}</div>
                    
                    <div><button type="button" class="mbtn_b btn_drop">진료과목 선택 <i class="xi-angle-down"></i></button>
                      <div${add_attribute("class", "dropBox", 0)} id="dropBox"><ul>${each(hsptDeptLst, (dept, index) => {
    return `<li><label${add_attribute("for", dept.deptName, 0)}><input type="checkbox"${add_attribute("id", dept.deptId, 0)} name="subject"${add_attribute("value", dept.deptName, 0)}${add_attribute("checked", dept.hdptSelYon, 1)}>
                                ${escape(dept.deptName)}</label>
                            </li>`;
  })}</ul></div></div></div>
                  </td></tr>
              <tr><th>계좌이체번호</th>
                <td colspan="3"><div class="dropDown"><select style="margin: 0 10px 0 0;"><option value="">은행선택</option><option value="우리">우리</option><option value="농협">농협</option><option value="국민">국민</option><option value="신한">신한</option><option value="기업">기업</option><option value="하나">하나</option><option value="우체국">우체국</option><option value="새마을금고">새마을금고</option><option value="대구">대구</option><option value="경남">경남</option><option value="광주">광주</option><option value="부산">부산</option><option value="전북">전북</option><option value="제주">제주</option><option value="카카오뱅크">카카오뱅크</option><option value="토스뱅크">토스뱅크</option></select>
                    <div class="dropDown"><input type="text" class="droptext" id="nameInput"${add_attribute("value", $sdtlBankNum, 0)}></div></div></td></tr>
              <tr><th class="ess3">진료항목</th>
                <td colspan="3">
                  <div class="dropDown"><input type="text" class="droptext" id="nameInput" placeholder="쉼표로 구분하여 입력해주세요 (예시: 감기, 고열)"${add_attribute("value", $shpSubject, 0)}></div>
                  </td></tr>
              <tr><th class="ess3">주소</th>
                <td colspan="3"><div class="address_box_1"><input type="text" required class="w90"${add_attribute("value", $shpZip, 0)}>
                    <input type="text" required${add_attribute("value", $shpAddr, 0)}>
                    <button type="button" class="mbtn_n_5">주소검색</button>

                    ${``}</div>
                  <div class="address_box_2"><input type="text" required${add_attribute("value", $shpAddrDtl, 0)}>
                    </div></td></tr>
              <tr><th class="ess3">전화번호</th>
                <td><input type="text" required id="" name=""${add_attribute("value", $shpTel, 0)}></td>
                <th>FAX</th>

                <td><input type="text" required id="" name=""${add_attribute("value", $shpFax, 0)}></td></tr>
              <tr><th class="ess3">상태</th>
                <td colspan="1"><select><option value="0">정상</option><option value="8">중지</option><option value="9">해지</option></select>
                  ${$shpStat == 8 ? `<span>(중지기간 : </span>
                    <label class="select_data"><input type="text" class="datepicker" id="dateFrom3"${add_attribute("value", $shpStopFrom, 0)}></label>
                    <span>~ </span>
                    <label class="select_data"><input type="text" class="datepicker" id="dateTo3"${add_attribute("value", $shpStopTo, 0)}></label>)` : ``}</td>

                <th>가입일</th>
                <td><label class="select_data"><input type="text" class="datepicker" id="dateReg3" readonly${add_attribute("value", $shpEntDate, 0)}></label></td></tr>
              <tr><th class="ess3">대면진료</th>
                <td><select><option value="Y">가능</option><option value="N">불가능</option></select></td>
                
                <th class="ess3">비대면진료</th>
                <td><select><option value="Y">가능</option><option value="N">불가능</option></select></td>
                </tr>
              <tr><th class="ess3">접수</th>
                <td><select><option value="Y">가능</option><option value="N">불가능</option></select></td>

                <th class="ess3">예약</th>
                <td><select><option value="Y">가능</option><option value="N">불가능</option></select></td></tr>
              <tr><th class="ess3">담당자명</th>
                <td><input type="text" class="wide" name="" id="" style="width:270px"${add_attribute("value", $shpContName, 0)}></td>
                <th class="ess3">연락처</th>
                <td><input type="text" required id="" name=""${add_attribute("value", $shpContTel, 0)}></td></tr>
              <tr><th>병원설명</th>
                <td colspan="3"><div class="input_box_no"><input class="w100p" type="text" name="" maxlength="30"${add_attribute("value", $shpIntrTitl, 0)}>
                    <div class="no">${$shpIntrTitl == null ? `(0/30 자)` : `(${escape($shpIntrTitl.length)}/30 자)`}</div></div>
                  <div class="input_box_no"><textarea class="w100p" name="" required maxlength="150">${escape($shpIntrCnts || "")}</textarea>

                    <div class="no">${$shpIntrCnts == null ? `(0/150 자)` : `(${escape($shpIntrCnts.length)}/150 자)`}</div></div></td></tr>
              <tr></tr></table></div>

          <div class="btn_wrap"><button type="button" class="btn_02">저장</button></div></form></div>

      <div id="tab2"${add_attribute(
    "class",
    "tab_content",
    0
  )}><div class="box_search"><div class="tabs tabs_pill"><ul><li${add_attribute("class", "active", 0)}><a rel="tab5">월</a></li>
              <li${add_attribute("class", "", 0)}><a rel="tab6">화</a></li>
              <li${add_attribute("class", "", 0)}><a rel="tab7">수</a></li>
              <li${add_attribute("class", "", 0)}><a rel="tab8">목</a></li>
              <li${add_attribute("class", "", 0)}><a rel="tab9">금</a></li>
              <li${add_attribute("class", "", 0)}><a rel="tab10">토</a></li>
              <li${add_attribute("class", "", 0)}><a rel="tab11">일</a></li></ul></div>
          <div class="form_search"><form><label class="label_title">기본설정</label>

              <label>진료시작 : </label><input type="time"${add_attribute("value", startTime, 0)}>

              <label>진료종료 : </label><input type="time"${add_attribute("value", endTime, 0)}>

              <label>진료기준</label>
              
              
              <select><option value="">선택</option><option value="10">10분</option><option value="30">30분</option><option value="60">1시간</option></select>

              <button style="float: right; margin-left:2px; margin-right:2px;" type="button" class="mbtn_g_3">만들기</button>
              <button style="float: right; margin-left:2px; margin-right:2px;" type="button" class="mbtn_g_3">초기화</button></form></div>
          
          ${``}
          </div>
        <div class="btn_wrap"><button type="button" class="btn_05">저장</button>
          <button type="button" class="btn_02">일괄 저장</button>
          </div></div>

      <div id="tab3"${add_attribute(
    "class",
    "tab_content",
    0
  )}><div class="form_table list">

          <div><div class="box_1"><div class="form_table">${validate_component(Gridjs, "Grid").$$render(
    $$result,
    {
      data: docData,
      columns: dtrColumns,
      style
    },
    {},
    {}
  )}</div></div></div>

          <div class="btn_wrap min txt_r"><button type="button" class="mbtn_b changePw" value="의사추가"><i class="xi-plus"></i>
              의사추가
            </button></div>

          <table${add_attribute("class", "doctorSelect", 0)}><colgroup><col style="width:12%;">
              <col style="width:38%;">
              <col style="width:12%;">
              <col style="width:38%;"></colgroup>
            <tr><th class="ess">번호</th>
              <td colspan="2">${docInfo.rowNum != void 0 ? `${escape(docInfo.rowNum)}` : ``}</td>
              <td style="text-align: right;">${docInfo.dtrId != 0 ? `<button type="button" class="mbtn_o_6" value="삭제">삭제</button>` : ``}</td></tr>
            <tr><th class="ess">의사명</th>
              <td><input type="text" class="w100p"${add_attribute("value", docInfo.dtrName, 0)}></td>
              <th class="ess">면허번호</th>
              <td><input type="text" class="w100p"${add_attribute("value", docInfo.dtrLicNo, 0)}></td></tr>
            <tr><th class="ess3">진료과</th>
              <td>
                <div class="dropDown"><div style="width: 100%;">${docInfo.dtrDepts != null ? `${escape(docInfo.dtrDepts)}` : ``}</div>
                  <button type="button" class="mbtn_b btn_drop">진료과목 선택 <i class="xi-angle-down"></i></button>
                  <div${add_attribute("class", "dropBox", 0)} id="dropBox3"><ul>${each(dtrDeptLst, (dept, index) => {
    return `<li><label${add_attribute("for", dept.deptName, 0)}><input type="checkbox"${add_attribute("id", dept.deptId, 0)} name="subject3"${add_attribute("value", dept.deptName, 0)}${add_attribute("checked", dept.ddptSelYon, 1)}>
                            ${escape(dept.deptName)}</label>
                        </li>`;
  })}</ul></div></div>
                </td>
              <th>진료실</th>
              <td><input type="text" class="w100p"${add_attribute("value", docInfo.dtrRoom, 0)}></td></tr>
            <tr><th>진료분야</th>
              <td colspan="3">
                <div class="dropDown"><div style="width: 100%;">${docInfo.dtrItems != null ? `${escape(docInfo.dtrItems)}` : ``}</div>
                  <button type="button" class="mbtn_b btn_drop">진료항목 선택 <i class="xi-angle-down"></i></button>
                  <div${add_attribute("class", "dropBox", 0)} id="dropBox4"><ul>${each(dtrItemLst, (item, index) => {
    return `<li><label${add_attribute("for", item.itemName, 0)}><input type="checkbox"${add_attribute("id", item.itemId, 0)} name="subject3"${add_attribute("value", item.itemName, 0)}${add_attribute("checked", item.ditmSelYon, 1)}>
                            ${escape(item.itemName)}</label>
                        </li>`;
  })}</ul></div></div>
                </td></tr>
            <tr><th>진료 방식</th>
              <td>${$shpVstYon == "Y" ? `<label><input type="checkbox" name="checkbox"${add_attribute("checked", docInfo.isVstChecked, 1)}>
                    대면
                  </label>` : ``}
                ${$shpCtlsYon == "Y" ? `<label><input type="checkbox" name="checkbox"${add_attribute("checked", docInfo.isCtlsChecked, 1)}>
                    비대면
                  </label>` : ``}

                
                </td>
              <th>성별</th>
              <td><label><input type="radio" value="M"${"M" === docInfo.dtrGender ? add_attribute("checked", true, 1) : ""}>
                  남성
                </label>
                <label><input type="radio" value="F"${"F" === docInfo.dtrGender ? add_attribute("checked", true, 1) : ""}>
                  여성
                </label></td></tr>
            <tr><th>사진</th>
              <td colspan="3"><img${add_attribute("src", imgSource, 0)} class="doctorImg" alt=".">
                <div class="flex_warp"><input type="file" class="w100p" accept=".jpg, .jpeg, .png"></div></td></tr>

            <tr><th style="vertical-align:top;" class="ess2">진료시간</th>

              <td colspan="3"><div class="tab_container3">
                  <div class="tabs tabs_pill mt20"></div>

                  

                  <div class="box_search"><div class="tabs tabs_pill"><ul><li${add_attribute("class", "active", 0)}><a rel="tab5">월</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab6">화</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab7">수</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab8">목</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab9">금</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab10">토</a></li>
                        <li${add_attribute("class", "", 0)}><a rel="tab11">일</a></li>
                        <label><input type="checkbox" name="checkbox"${add_attribute("checked", docInfo.dtrShpTimeEqual, 1)}>
                          체크 시,
                          <label style="color: red;">병원운영시간</label>
                          과 동일하게 적용됩니다.
                        </label></ul></div>
                    
                    ${``}</div></div></td></tr></table></div>
        ${``}</div>

      <div id="tab4"${add_attribute(
    "class",
    "tab_content",
    0
  )}>
        <div class="form_table list"><div class="box_search"><select><option value="">전체</option><option value="">제목</option></select>
            <label><input type="text" name="" id=""${add_attribute("value", hlTitl, 0)}></label>
            <button type="button" class="mbtn_n_5">검색</button>
            <div class="ar">
              <button type="button" id="callSectionButton holiday_add" class="mbtn_b_3" value="등록">등록</button>
              <button type="button" id="callSectionButton holiday_add" class="mbtn_b_0">공휴일 추가</button></div></div>
          
          <table><colgroup><col span="1" style="width: 10%">
              <col span="1" style="width: 20%">
              <col span="1" style="width: 20%">
              <col span="1" style="width: 20%">
              <col span="1" style="width: 20%">
              <col span="1" style="width: 10%"></colgroup>
            <thead><tr><th>번호</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>휴일명</th>
                <th>안내문구</th>
                <th></th></tr></thead>
            <tbody class="list">${each(holInfoList, (arr, index) => {
    return `<tr><td>${escape(index + 1)}</td>
                  <td>${escape(arr.shdyFrom)}</td>
                  <td>${escape(arr.shdyTo)}</td>
                  <td>${escape(arr.shdyTitl)}</td>
                  <td>${escape(arr.shdyDesc)}</td>
                  <td><button type="button" class="mbtn_o_6" value="삭제">삭제</button></td>
                </tr>`;
  })}</tbody></table>
          </div>
        </div></div>
    
    <footer></footer></div></section>

${``}


${``}

${``}
${``}
${``}

${``}

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
