import { writable } from "svelte/store";
import { browser } from "$app/environment";

const persist_storage = (key, initValue) => {
  if (browser) {
    const storedValueStr = sessionStorage.getItem(key);
    //const store = writable(storedValueStr != null ? JSON.parse(storedValueStr) : initValue); //원래 이거임
    const store = writable(storedValueStr != null ? initValue : initValue);
    store.subscribe((val) => {
      sessionStorage.setItem(key, JSON.stringify(val));
    });
    return store;
  }
};

export const writableData = writable(0);
export const treat_target = persist_storage("treat_target", "");
export const treat_hspt = persist_storage("treat_hspt", "");
export const treat_dept = persist_storage("treat_dept", "");
export const treat_item = persist_storage("treat_item", "");
export const treat_dtr = persist_storage("treat_dtr", "");
export const dgnsShpId = persist_storage("dgnsShpId", "");
export const dgnsDtrId = persist_storage("dgnsDtrId", "");
export const dgnsMemo = persist_storage("dgnsMemo", "");
export const dgnsRsvDttm = persist_storage("dgnsRsvDttm", "");
export const dgnsDeptId = persist_storage("dgnsDeptId", "");
export const dgnsItemId = persist_storage("dgnsItemId", "");
export const dgnsPatId = persist_storage("dgnsPatId", "");
export const dgnsType = persist_storage("dgnsType", "");
export const treat_deptNo = persist_storage("treat_deptNo", "");
export const treat_itemNo = persist_storage("treat_itemNo", "");
export const treat_dtrNo = persist_storage("treat_dtrNo", "");

export const rowNum = persist_storage("rowNum", "");
export const shpId = persist_storage("shpId", "");
export const shpType = persist_storage("shpType", "");
export const shpName = persist_storage("shpName", "");
export const shpSido = persist_storage("shpSido", "");
export const shpStat = persist_storage("shpStat", "0");
export const shp_stat = persist_storage("shp_stat", "0");
export const shpStatSesc = persist_storage("shpStatSesc", "정상");
export const shpEntDate = persist_storage("shpEntDate", "");
export const shpVstYon = persist_storage("shpVstYon", "");
export const shpVstDesc = persist_storage("shpVstDesc", "");
export const shpCtlsYon = persist_storage("shpCtlsYon", "");
export const shpCtlsDesc = persist_storage("shpCtlsDesc", "");
export const shpWlkYon = persist_storage("shpWlkYon", "");
export const shpRsvYon = persist_storage("shpRsvYon", "");
export const shpPhrsName = persist_storage("shpPhrsName", "");
export const shpRegNo = persist_storage("shpRegNo", "");
export const phrsName = persist_storage("phrsName", "");
export const shpZip = persist_storage("shpZip", "");
export const shpAddr = persist_storage("shpAddr", "");
export const shpAddrDtl = persist_storage("shpAddrDtl", "");
export const shpTel = persist_storage("shpTel", "");
export const shpFax = persist_storage("shpFax", "");
export const shpLati = persist_storage("shpLati", "");
export const shpLongi = persist_storage("shpLongi", "");
export const shpPath = persist_storage("shpPath", "");
export const shpIntrTitl = persist_storage("shpIntrTitl", "");
export const shpIntrCnts = persist_storage("shpIntrCnts", "");
export const shpIp = persist_storage("shpIp", "");
export const shpContName = persist_storage("shpContName", "");
export const shpContTel = persist_storage("shpContTel", "");
export const shpTimeIntv = persist_storage("shpTimeIntv", "");
export const shpFee = persist_storage("shpFee", "");
export const shpFeeRate = persist_storage("shpFeeRate", "");
export const shpFeeType = persist_storage("shpFeeType", "");
export const shpRegUsr = persist_storage("shpRegUsr", "");
export const shpStopFrom = persist_storage("shpStopFrom", "9999-12-31");
export const shpStopTo = persist_storage("shpStopTo", "9999-12-31");
export const shpRegDttm = persist_storage("shpRegDttm", "");
export const dateFormatEnt = persist_storage("dateFormatEnt", "yyyy-mm-dd");
export const sdtlBank = persist_storage("sdtlBank", "");
export const sdtlBankNum = persist_storage("sdtlBankNum", "");
export const shpNiNo = persist_storage("shpNiNo", "");

export const htmeDay = persist_storage("htmeDay", "");
export const htmeHsptId = persist_storage("htmeHsptId", "");
export const htmeFrom = persist_storage("htmeFrom", "");
export const htmeTo = persist_storage("htmeTo", "");

export const dtrVstYonDesc = persist_storage("dtrVstYonDesc", "");
export const dtrName = persist_storage("dtrName", "");
export const dtrLicNo = persist_storage("dtrLicNo", "");
export const dtrVstYon = persist_storage("dtrVstYon", "");

//export const shdyId = persist_storage("shdyId","");
export const shdyFrom_add = persist_storage("shdyFrom_add", "");
export const shdyTo_add = persist_storage("shdyTo_add", "");
//export const dateFormatEnt = persist_storage("dateFormatEnt","");
export const shdyTitl_add = persist_storage("shdyTitl_add", "");
export const shdyDesc_add = persist_storage("shdyDesc_add", "");
//export const shdyRegUsr = persist_storage("shdyRegUsr","");
//export const shdyRegUsrType = persist_storage("shdyRegUsrType","");

export const dtmID = persist_storage("dtmID", "");
export const dtmShpId = persist_storage("dtmShpId", "");
export const dtmMonType = persist_storage("dtmMonType", "");
export const dtmMonFrom = persist_storage("dtmMonFrom", "");
export const dtmMonTo = persist_storage("dtmMonTo", "");
export const dtmTueType = persist_storage("dtmTueType", "");
export const dtmTueFrom = persist_storage("dtmTueFrom", "");
export const dtmTueTo = persist_storage("dtmTueTo", "");
export const dtmWedType = persist_storage("dtmWedType", "");
export const dtmWedFrom = persist_storage("dtmWedFrom", "");
export const dtmWedTo = persist_storage("dtmWedTo", "");
export const dtmThuType = persist_storage("dtmThuType", "");
export const dtmThuFrom = persist_storage("dtmThuFrom", "");
export const dtmThuTo = persist_storage("dtmThuTo", "");
export const dtmFriType = persist_storage("dtmFriType", "");
export const dtmFriFrom = persist_storage("dtmFriFrom", "");
export const dtmFriTo = persist_storage("dtmFriTo", "");
export const dtmSatType = persist_storage("dtmSatType", "");
export const dtmSatFrom = persist_storage("dtmSatFrom", "");
export const dtmSatTo = persist_storage("dtmSatTo", "");
export const dtmSunType = persist_storage("dtmSunType", "");
export const dtmSunFrom = persist_storage("dtmSunFrom", "");

export const dtmSunTo = persist_storage("dtmSunTo", "");
export const dtmRegDttm = persist_storage("dtmRegDttm", "");
export const dtmRegUsr = persist_storage("dtmRegUsr", "");
export const dtmRegUsrName = persist_storage("dtmRegUsrName", "");
export const dtmRegUsrType = persist_storage("dtmRegUsrType", "");
export const dateFormat = persist_storage("dateFormat", "yyyy-mm-dd");
export const htmeType = persist_storage("htmeType", "");
export const htmeVstYon = persist_storage("htmeVstYon", "");
export const htmeCtlsYon = persist_storage("htmeCtlsYon", "");
export const htmeRegUsr = persist_storage("htmeRegUsr", "");
export const htmeRegUsrTyp = persist_storage("htmeRegUsrTyp", "");
export const htmeTimeSet = persist_storage("htmeTimeSet", "");
export const deptId = persist_storage("deptId", "");
export const name = persist_storage("name", "");
export const shpDept = persist_storage("shpDept", "");
export const shpSubject = persist_storage("shpSubject", "");
export const dtrHsptDept = persist_storage("dtrHsptDept", "");
export const dtrCtlsYon2 = persist_storage("dtrCtlsYon2", "");
export const dtrVstYon2 = persist_storage("dtrVstYon2", "");
export const dtrItems2 = persist_storage("dtrItems2", "");
export const dtrLicNo2 = persist_storage("dtrLicNo2", "");
export const dtrName2 = persist_storage("dtrName2", "");

export const shdyId = persist_storage("shdyId", "");
export const shdyFrom_drugHol = persist_storage("shdyFrom", "");
export const dateFormatEnt_drugHol = persist_storage("dateFormatEnt", "");
export const shdyTo_drugHol = persist_storage("shdyTo", "");
export const shdyTitl_drugHol = persist_storage("shdyTitl", "");
export const shdyDesc_drugHol = persist_storage("shdyDesc", "");
export const shdyRegUsr = persist_storage("shdyRegUsr", "");
export const shdyRegUsrType = persist_storage("shdyRegUsrType", "");

export const sntc_titl = persist_storage("sntc_titl", "");
export const sntc_cnts = persist_storage("sntc_cnts", "");

export const ntcRegUsr = persist_storage("ntcRegUsr", "");
export const ntcTitl = persist_storage("ntcTitl", "");
export const ntcRegUsrName = persist_storage("ntcRegUsrName", "");
export const ntcFrom = persist_storage("ntcFrom", "");
export const ntcRegDttm = persist_storage("ntcRegDttm", "");
export const ntcCnts = persist_storage("ntcCnts", "");
export const ntcUseYon = persist_storage("ntcUseYon", "");
export const ntcId = persist_storage("ntcId", "");
export const ntcShpYon = persist_storage("ntcShpYon", "");
export const ntcMbrYon = persist_storage("ntcMbrYon", "");

export const usrLoginId = persist_storage("usrLoginId", "");
export const usrPwd = persist_storage("usrPwd", "");

export const usrPwdConf = persist_storage("usrPwdConf", "");

export const shdyFrom = persist_storage("shdyFrom", "");
export const shdyTo = persist_storage("shdyTo", "");
export const shdyDesc = persist_storage("shdyDesc", "");
export const shdyTitl = persist_storage("shdyTitl", "");
export const ntcTitlget = persist_storage("ntcTitlget", "");
export const holTitlget = persist_storage("holTitlget", "");
