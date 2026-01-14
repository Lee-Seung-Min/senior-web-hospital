$(function () {

  $(document).ready(function () {

      // 첫번째 탭콘텐츠 보이기
        $(".tab_container").each(function () {
            $(this).children(".tabs li:first").addClass ("active"); //Activate first tab
            $(this).children(".tab_content").first().addClass("active");
        });
      
      //탭메뉴 클릭 이벤트
      $(".tabs li a").click(function () {

          $(this).parent().siblings("li").removeClass("active");
          $(this).parent().addClass("active"); $(this).parent().parent().parent().parent().find(".tab_content").hide();
          var activeTab = $(this).attr("rel");
          $("#" + activeTab).fadeIn();
      });	
      // 드롭다운 
      $(".btn_drop").click(function () {
        $(this).next().toggleClass("on");
        if($(this).next().hasClass("on")){
            $(this).find("i").addClass("xi-angle-up")
            $(this).find("i").removeClass("xi-angle-down")
        } else {
            $(this).find("i").addClass("xi-angle-down")
            $(this).find("i").removeClass("xi-angle-up")
        }
      });
      

  });	
  //link
  $("body").on("click", "button, td", function () {
    var url = $(this).attr('data-url');
    if ((url !== "") & url !== undefined) {
      if (url.match("http")) {
        window.open(url, '_blank');
        event.preventDefault();
      } else {
        location.href = url;
        event.preventDefault();
      };
    }
  });

  $("label").on("click", "#inst_hos, #inst_drug", function () {
   if($('#inst_hos').is(':checked')){
    $("#info_hos").show();
    $("#info_drug").hide();
   }else{
    $("#info_hos").hide();
    $("#info_drug").show();
   }
  });

  $("label").on("click", ".pop_ad, .pop_hos", function () {
    if($('.pop_ad').is(':checked')){
     $("#pop_ad").show();
     $("#pop_hos").hide();
    }else{
     $("#pop_ad").hide();
     $("#pop_hos").show();
    }
   });
  
 

  //로고 클릭시 메인으로 
  $("body").on("click", "h1", function () {
    location.href = '/main/main';
  });

  //팝업창 닫기
  $("body").on("click", ".changePw", function () {
    $("#changePw").addClass("on");
    event.preventDefault();
  });


  //팝업창 닫기
  $(".full_layer").on("click", "#close, .close_btn, .bg", function () {
    $(".full_layer").removeClass("on");
  });

 
  //의사추가 추가
  $(".form_table").on("click", "#add_doctor", function () {
    var dochtml =  $(".docInfo").clone();
    $(".doc_wrap").append(dochtml);
  });
 
  //시간등록 추가
  $(".form_table").on("click", ".add_time", function () {
    var timehtml =  $(this).next(".time").clone();
    $(this).parent(".doc_time").append(timehtml);
  });

  //선택진료과 추가
  $(".dept_sel").change(function(){ 
    var text = $(".dept_sel option:selected").text();
    var btn = "<button type='button' class='mbtn_n this_del'>"+ text +"</button>"
    var pass = 1; 

    $(".dept_sel + .mbtnBox button").each(function(e,i){  
      if(text == $(this).text()){
        alert("이미 추가 되어 있습니다.");
        pass = 0;
        return;
      }
    });
    if(pass == 1){
      $(this).next(".mbtnBox").append(btn);   
    }
  });

  //선택진료과 삭제
  $(".form_table").on("click", ".this_del", function () {      
    $(this).remove();
  });

  //시간등록 삭제
  $(".form_table").on("click", ".time_del", function () {   
    if($(this).parents(".doc_time").find(".time").length == 1){   
      alert("더이상 삭제할 수 없습니다.");
    }else{
      $(this).parent(".time").remove();
    }
  });

  
  

  $.datepicker.regional['ko'] = {
    dateFormat: 'yy-mm-dd' //달력 날짜 형태
    , showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
    , showMonthAfterYear: true // 월- 년 순서가아닌 년도 - 월 순서
    , changeYear: true //option값 년 선택 가능
    , changeMonth: true //option값  월 선택 가능               
    , buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
    , buttonText: "선택" //버튼 호버 텍스트              
    , yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
    , monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 텍스트
    , monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip
    , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 텍스트
    , dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 Tooltip
    , minDate: "0" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
    , maxDate: "+10y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
};
$.datepicker.setDefaults($.datepicker.regional['ko']);

$('.datepicker').datepicker();
//$('.datepicker.type2').datepicker("option", "minDate", "-10y");

});

function closeAlert(id){
  $("#"+id).remove();
}
function onAlert(title,content,id){
  
  if (title){
    var title = title;
  } else {
    var title = "Confirm";
  }

  if (content){
    var content = content;
  } else {
    var content = "고객센터에 문의바랍니다.";
  }

  var alertHtml = '';
  alertHtml += '<section class="full_layer" id="'+id+'">';
  alertHtml += '<div class="bg"></div>';
  alertHtml += '<div class="box_1">';
  alertHtml += '  <p class="text_tit">'+title+'</p>';
  alertHtml += '<button type="button" class="modal_close" on:click="closeAlert(\''+id+'\')"><i class="xi-close-min"></i></button>';
	alertHtml += '<hr>';
  alertHtml += '  <p class="txt_c">'+content+'</p>';
  alertHtml += '<div class="btn_wrap mb0">';
  alertHtml += '<button type="button" on:click="closeAlert(\''+id+'\')" class="btn_03 small close_btn">확인</button>';
  alertHtml += '</div>';

  alertHtml += '</div>';
  alertHtml += '</section>';
  $("body").append(alertHtml);
  $("body #"+id).addClass("on");

}


function onNotify(){

  var title = "알림";
  var id = "notify";
  var alertHtml = '';

  alertHtml += '<section class="full_layer" id="'+id+'">';
  alertHtml += '<div class="bg"></div>';
  alertHtml += '<div class="box_1 notify">';
  alertHtml += '  <p class="text_tit">'+title+'</p>';
  alertHtml += '<button type="button" class="modal_close" on:click="closeAlert(\''+id+'\')"><i class="xi-close-min"></i></button>';
	alertHtml += '<hr>';
  alertHtml += '<div class="form_table" >';
  alertHtml += '<table>';
  alertHtml += '<colgroup>';
  alertHtml += '<col style="width:15% ;" />';
  alertHtml += '<col style="width:35% ;" />';
  alertHtml += '<col style="width:15% ;" />';
  alertHtml += '<col style="width:35% ;" />';
  alertHtml += '</colgroup>';
  alertHtml += '   <tr>';
  alertHtml += '    <th>의료진</th>';
  alertHtml += '    <td>우희정</td>';
  alertHtml += '    <th>진료일시</th>';
  alertHtml += '    <td>2023-03-02 14:00</td>';
  alertHtml += '   </tr>';
  alertHtml += '   <tr>';
  alertHtml += '    <th>환자명</th>';
  alertHtml += '    <td>박형용(본인)</td>';
  alertHtml += '    <th>진료구분</th>';
  alertHtml += '    <td>원격</td>';
  alertHtml += '  </tr>';
  alertHtml += '   <tr>';
  alertHtml += '    <th>진료항목</th>';
  alertHtml += '    <td>감기</td>';
  alertHtml += '    <th>재진/신규</th>';
  alertHtml += '    <td>신규</td>';
  alertHtml += '  </tr>';
  alertHtml += '</table>';
  alertHtml += '</div>';
  alertHtml += '<div class="btn_wrap mb0">';
  alertHtml += '<button type="button" class="btn_02 small">예약접수</button>';
  alertHtml += '<button type="button" class="btn_03 small">진료거절</button>';
  alertHtml += '<button type="button" class="btn_02 small">상세보기</button>'; 
  alertHtml += '</div>';

  alertHtml += '</div>';
  alertHtml += '</section>';
  $("body").append(alertHtml);
  $("body #"+id).addClass("on");

}

function onConfirm(title,content,id,url){
  if (title){
    var title = title;
  } else {
    var title = "Confirm";
  }

  var alertHtml = '';

  alertHtml += '<section class="full_layer" id="'+id+'">';
  alertHtml += '<div class="bg"></div>';
  alertHtml += '<div class="box_1">';
  alertHtml += '  <p class="text_tit">'+title+'</p>';
  alertHtml += ' <button type="button" class="modal_close" on:click="closeAlert(\''+id+'\')"><i class="xi-close-min"></i></button>';
  alertHtml += '<hr>';
  alertHtml += '  <p class="txt_c">'+content+'</p>';
  alertHtml += '      <p class="btn_wrap inline">';
  alertHtml += '       <button type="button" class="btn_02 small close_btn" on:click="'+url+';closeAlert(\''+id+'\')">예</button>';
  alertHtml += '        <button type="button" class="btn_03 small close_btn" on:click="closeAlert(\''+id+'\')">아니오</button>';
  alertHtml += '    <p>';
  alertHtml += '</div>';
  alertHtml += '</section>';
  $("body").append(alertHtml);
  $("body #"+id).addClass("on");

}

function onPspn(){
  if($("body div").hasClass("pspn_box")){
    $("body div.pspn_box").remove()
  } 
  $("body").append('<div class="pspn_box"></div>')
  $("body .pspn_box").load("../../drst/awPspnDtl");
}

function onHoliday(id){
  if($("body div").hasClass("holiday_box")){
    $("body div.holiday_box").remove()
  } 
  $("body").append('<div class="holiday_box"></div>')
  $("body .holiday_box").load("../../shp/awHoliday",function(){
    $("body .holiday_box #"+id).addClass("on")
  });
}

function noticeView(type,bbsid){
  switch (type) {
    case 'new':
        $(".view_type").html("등록")
        $(".notice_detail").addClass("new")
        $(".notice_detail").removeClass("view")
      break;
    case 'view':
        $(".view_type").html("수정")
        $(".notice_detail").removeClass("new")
        $(".notice_detail").addClass("view")
      break;
    case 'cancel':
        $(".notice_detail").removeClass("new")
        $(".notice_detail").removeClass("view")
      break;

    default:

  }
}