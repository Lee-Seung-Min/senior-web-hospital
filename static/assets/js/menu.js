var site_menu = new Array();
site_menu = [
  ["메인", "home", "../main/main", ""],
  ["진료예약", "reservation", "../hspt/awDgnsRsvLst", ""],
  ["처방접수", "prescription", "../drst/awPspnLst", ""],
  ["정보관리", "information", "../shp/awHspDtl", "",
  [
    ["병원정보", "hospital", "../shp/awHsptDtl", ""],
    ["약국정보", "drugstore", "../shp/awDrstDtl", ""],
    ["가맹점 공지사항", "shop_notice", "../cmm/awNtcLst", ""]
  ]
  ],
  ["정산관리", "payment", "../adjmt/awPayLst", "",
    [
      ["결제현황", "payment_list", "../adjmt/awPayLst", ""],
      ["정산현황", "support_list", "../adjmt/awAdjmtLst", ""]
    ]
  ],
  ["공지사항", "notice", "../board/awShpNtcLst", ""]
];

 var _pathName = (window.location.pathname).split('/')
 _pathName = _pathName[_pathName.length-1]


$(document).ready(function () {
  siteMap(".lnb");

  $(".menu_item .main_menu[data-url='#none']").on("click", function () {
    if($(this).hasClass("active")){
      $(this).removeClass("active");
    } else {
      $(".menu_item .main_menu[data-url='#none']").removeClass("active")
      $(this).addClass("active")
    }
  });

});

function siteMap(selector) {
  var main_navi = 0;
  var sub_navi;
  var navi = '<div class="page_navi"><ul><li><i class="xi-home"></i></li>';
  
  switch(_pathName){
    case 'main':  main_navi = 0;   break;
    case 'awDgnsRsvLst':  main_navi = 1; navi+='<li><b>진료예약</b></li>'; break;
    case 'awDgnsEnt':  main_navi = 1; navi+='<li>진료예약<li><b>진료실</b></li>'; break;
    case 'awPspnLst':  main_navi = 2 ; navi+='<li><b>처방접수</b></li>'; break;
    case 'awHsptDtl':  main_navi = 3 ; sub_navi = 0; navi+='<li>정보관리</li><li><b>병원정보</b></li>';  break;
    case 'awDrstDtl':  main_navi = 3 ; sub_navi = 1; navi+='<li>정보관리</li><li><b>약국정보</b></li>';  break;
    case 'awNtcLst':  main_navi = 3 ; sub_navi = 2; navi+='<li>정보관리</li><li><b>가맹점 공지사항</b></li>';  break;
    case 'awPayLst':  main_navi = 4 ; sub_navi = 0; navi+='<li>정산관리</li><li><b>결제현황</b></li>';  break;
    case 'awAdjmtLst':  main_navi = 4 ; sub_navi = 1; navi+='<li>정산관리</li><li><b>정산현황</b></li>';  break;
    case 'awAdjmDtlLst':  main_navi = 4 ; sub_navi = 1; navi+='<li>정산관리</li><li>정산현황</li><li><b>정산 상세 목록</b></li>';  break;
    case 'awShpNtcLst':  main_navi = 5; navi+='<li><b>공지사항</b></li>'; break;
    case 'awShpNtcDtl':  main_navi = 5; navi+='<li>공지사항</li><li><b>공지내용</b></li>'; break;
    case 'awShpNtcRgst':  main_navi = 5; navi+='<li>공지사항</li><li><b>공지쓰기</b></li>'; break;

    default: main_navi = 0; navi=''; break;    

  }
  navi += '</ul></div>'
       
  if ($('h2').hasClass('page_title')) {
    $('h2.page_title').append(navi)
  }
  var dataurl ;
  var content = '<nav>';
  content += ' <ul class="manu">';

  for (var i = 0; i < site_menu.length; i++) { //배열 출력
    if (site_menu[i][4] == undefined) {
      dataurl = site_menu[i][2];
    } else {
      dataurl =  "#none";
    }
    
    content += '<li class="menu_item">';
    content += '<button type="button" class="main_menu '
    
    if(main_navi == i){
      content += 'active'; 
    } else {
      content += '';
    }
    
    content += ' ' +site_menu[i][1] + '"  Data-url="'+dataurl+'">' + site_menu[i][0] + '</button>';
    if (site_menu[i][4] != undefined) {
      content += '<ul class="submenu">';
      for (var j = 0; j < site_menu[i][4].length; j++) { //배열 출력
          content += '<li class="sub">';
          content += '<button type="button" class="' + site_menu[i][4][j][1];
          if((main_navi == i)&&(sub_navi == j)){
            content += ' active';
          } else {
            content += '';
          }
          content += ' " Data-url="' + site_menu[i][4][j][2] + '">' + site_menu[i][4][j][0] + '</button>';
        content += '</li>';
      }
      content += '</ul>';
    }
    content += '</li>';
  }
  content += '</ul>';
  content += '</nav>';
  //  alert(content)
  $(selector).html(content)
  //});
}

function onMenuSlide(){
  var menuLeft = $("#menu").css("left")

  if(menuLeft=="0px"){
    // 메뉴 닫기

    $("#menu").animate( {
      left:"-200px"
    }, 300,"swing", function() {
      
    });
    
    $("#con, #head").animate( {
      paddingLeft:"0px"
    }, 300,"swing", function() {
        $("#head i.icon-arrow").removeClass("icon-chevron-left")
        $("#head i.icon-arrow").addClass("icon-chevron-right")
    });

  } else {
    $("#menu").animate( {
      left:"0px"
    }, 300,"swing", function() {
      
    });
    
    $("#con, #head").animate( {
      paddingLeft:"200px"
    }, 300,"swing", function() {
        $("#head i.icon-arrow").removeClass("icon-chevron-right")
        $("#head i.icon-arrow").addClass("icon-chevron-left")
    });
  }
}