 <!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>비트닥터</title>
   <link rel="stylesheet" href="/src/assets/css/reset.css">
   <link rel="stylesheet" href="/src/assets/css/common.css">
   <style>
     body{padding: 50px; display: block;}
           h1 {text-align: center;margin:15px 0 30px; color: #000;  }
           table {width: 100%;border-collapse: collapse; background: #fff; max-width: 1000px; margin: 0 auto;}
           a{color: #000 !important;}
           a.on{color: #000 !important;}
           table td {border: 1px solid #ddd;padding: 5px 10px; font-size: 14px;vertical-align: middle; }  
           table th {background: #666; color: #fff;  font-weight: bold;border-top:0; border: 1px solid #999; padding: 5px;}  
           .box {border:1px solid #ddd;padding: 20px; line-height: 1.4; background: #fff; max-width: 1000px; margin: 0 auto 30px;width: 100%;}
           .box  span{text-align: right; display: block; margin-top: 10px;}
           @media (max-width: 600px) {
             body{padding: 0; display: block;}
             table{display: block; width: 100%;}
             table tr{display: block; padding-left: 20px; width: 100%;position: relative;  border-bottom: 1px solid #ccc;}
             table thead{display: none;}
             table tbody{display: block; width: 100%;}
             table td{border: 0;display: inline-block; padding: 5px 0;}
             table td + td::before{content: " - ";display: inline-block; margin: 0 5px;}
             table td a{ position: absolute; right: 20px; top: 5px;}
           }
   </style>
 </head>
 
 <body>
   <h1>비대면 하이브리드 솔루션 가맹점 웹 퍼블리싱</h1>
   <div class="box">
     <ul>
       <li>완료된 페이지의 마크업이 수정될 경우 비고란에 작성하겠습니다.</li>
     </ul>
     <span>퍼블 최종 업데이트 : 2023-03-16</span>
   </div>
   <div class='container'>
    
     <table cellspacing="0" cellpadding="0">
       <thead>
       <tr>
         <th colspan="6" width="879">메뉴구성</th>
       </tr>
       <tr>
         <th>구분</th>
         <th>1 Depth</th>
         <th>2 Depth</th>
         <th>상세화면</th>
         <th>화면ID</th>
         <th>비고</th>
       </tr>
     </thead>
       <tr>
         <td>가맹점웹</td>
         <td>로그인</td>
         <td>사용자인증</td>
         <td>로그인/로그아웃</td>
         <td><a href="./login/awLogin" target="_blank">awLogin</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>사용자암호변경</td>
         <td><a href="./login/awChngPw" target="_blank">awChngPw</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td>진료</td>
         <td>진료예약관리</td>
         <td>진료예약목록</td>
         <td><a href="./hspt/awDgnsRsvLst" target="_blank">awDgnsRsvLst</a></td>
         <td></td>
       </tr>
       <!--
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>진료예약상세</td>
         <td><a href="./view/hspt/awDgnsRsvDtl.html" target="_blank">awDgnsRsvDtl</a></td>
         <td></td>
       </tr>
       -->
       <tr>
         <td></td>
         <td></td>
         <td>진료</td>
         <td>진료실입장</td>
         <td><a href="./hspt/awDgnsEnt" target="_blank">awDgnsEnt</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td>조제</td>
         <td>처방전</td>
         <td>처방전접수현황</td>
         <td><a href="./drst/awPspnLst" target="_blank">awPspnLst</a></td>
         <td></td>
       </tr>
         <!--
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>처방전접수상세</td>
         <td><a href="./view/drst/awPspnDtl.html" target="_blank">awPspnDtlhtml</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>배송결과등록</td>
         <td><a href="./view/drst/awDlvRgst.html" target="_blank">awDlvRgst</a></td>
         <td></td>
       </tr>
         -->
       <tr>
         <td>인덱스</td>
         <td></td>
         <td></td>
         <td></td>
         <td><a href="./sub/index" target="_blank">index</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td>정보관리</td>
         <td>병원정보</td>
         <td>병원등록정보</td>
         <td><a href="./shp/awHsptDtl" target="_blank">awHsptDtl</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td>약국정보</td>
         <td>약국등록정보</td>
         <td><a href="./shp/awDrstDtl" target="_blank">awDrstDtl</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td>가맹점 공지사항</td>
         <td>공지사항 목록</td>
         <td><a href="./cmm/awNtcLst" target="_blank">awNtcLst</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td>정산관리</td>
         <td>결제</td>
         <td>결제 목록</td>
         <td><a href="./adjmt/awPayLst" target="_blank">awPayLst</td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>결제 상세 정보</td>
         <td><a href="./adjmt/awPayDtl" target="_blank">awPayDtl</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td>정산</td>
         <td>정산목록</td>
         <td><a href="./view/adjmt/awAdjmtLst.html" target="_blank">awAdjmtLst</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>정산 상세 정보</td>
         <td><a href="./view/adjmt/awAdjmDtlLst.html" target="_blank">awAdjmDtlLst</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td>공지사항</td>
         <td>공지사항</td>
         <td>공지사항 목록</td>
         <td><a href="./board/awShpNtcLst" target="_blank">awShpNtcLst</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>공지사항 등록</td>
         <td><a href="./board/awShpNtcRgst" target="_blank">awShpNtcRgst</a></td>
         <td></td>
       </tr>
       <tr>
         <td></td>
         <td></td>
         <td></td>
         <td>공지사항 상세</td>
         <td><a href="./board/awShpNtcDtl" target="_blank">awShpNtcDtl</a></td>
         <td></td>
       </tr>
     </table>
   </div>
 </body>
 </html>
 