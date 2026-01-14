import { base } from '$app/paths';
export const URL = {
  //메인
  main: `${base}/publish/main/main`,
  //정산 상세 리스트
  awAdjmDtlLst: "/adjmt/awAdjmDtlLst",

  //정산 리스트
  awAdjmLst: "/adjmt/awAdjmtLst",

  //결제 리스트
  awPayLst: `${base}/publish/adjmt/awPayLst`,

  //로그인
  awLogin: `${base}/login/awLogin/`,

  //게시판 공지 상세
  awShpNtcDtl: "/board/awShpNtcDtl",

  //게시판 공지 리스트
  awShpNtcLst: "/board/awShpNtcLst",

  //게시판 공지 등록
  awShpNtcRgst: "/board/awShpNtcRgst",

  //처방 상새내역
  awPspnDtl: "/drst/awPspnDtl",

  //처방 리스트
  awPspnLst: "/drst/awPspnLst",

  //진료 예약 리스트
  awDgnsRsvLst: `${base}/publish/hspt/awDgnsRsvLst`,

  awDgnsRcpt: `${base}/publish/hspt/awDgnsRcpt`,
  //진료 예약
  awDgnsEnt: "/hspt/awDgnsEnt",

  //약국 상세 정보
  awDrstDtl: "/shp/awDrstDtl",

  //가맹점 휴일 관리
  awHoliday: "/shp/awHoliday",

  //병원 상세 정보
  awHsptDtl: `${base}/publish/shp/awHsptDtl`,
  //공지사항
  awNtcLst: `${base}/publish/cmm/awNtcLst`,

  //회원가입
  awJoin: "/login/awJoin",

  //아이디 찾기
  awFindID: `${base}/login/awFindID`,

  //비밀번호 변경
  awChngPw: `${base}/login/awChngPw`,

  awCheckJoin: "/login/awCheckJoin",
};
