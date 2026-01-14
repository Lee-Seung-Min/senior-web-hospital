 <!-- HolidayManagement.svelte -->
 <script>
  import { onMount } from "svelte";
  import { getAPI } from "$lib/js/getAPI";
  import Nav from "$lib/sub/nav/Nav.svelte";
  import { goto } from "$app/navigation";
  import { URL } from "$lib/URL";
  import { footCheck } from "$lib/store/navStore.js";
  import { shopUrlAddr } from "$lib/js/urlAddr";
  import { authUrlAddr } from "$lib/js/urlAddr";
  import { mobileUrlAddr } from "$lib/js/urlAddr";
  import { adminUrlAddr } from "$lib/js/urlAddr";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import Grid from "gridjs-svelte";
  import Footer from "$lib/sub/Footer.svelte";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import { deleteAPI } from "$lib/js/deleteAPI";
  import Daum from "svelte-daum-postcode";
  import { getUserId } from "$lib/js/getUserId";

  // Define any reactive variables if needed
  let startDate;
  let endDate;
  let holidayName = "";
  let description = "";

  // Function to handle saving the holiday details
  function saveHoliday() {
    // Perform the saving logic here
    // You can use the variables like startDate, endDate, holidayName, description to get user inputs
  }

  // Function to handle closing the pop-up
  function closePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = "none";
  }

  // Function to handle confirming deletion
  function confirmDeletion() {
    // Perform deletion logic here
  }

  // onMount(async () => {})

  import {
    shdyId, shdyFrom_drugHol, dateFormatEnt_drugHol, shdyTo_drugHol, shdyTitl_drugHol, 
    shdyDesc_drugHol, shdyRegUsr, shdyRegUsrType
  } from "$lib/store/rgstStore.js";

  async function addHoliday(){
    console.log("afasdf");
      let jsonStr = makeStr({shdyId:'1', shdyFrom_drugHol:$shdyFrom_drugHol, dateFormatEnt_drugHol:$dateFormatEnt_drugHol, 
    shdyTo_drugHol:$shdyTo_drugHol, shdyTitl_drugHol:$shdyTitl_drugHol, shdyDesc_drugHol:$shdyDesc_drugHol,
    shdyRegUsr:$shdyRegUsr, shdyRegUsrType:$shdyRegUsrType});
      console.log("인서트 홀리데이 제이쓴 스트링 : " +jsonStr);
      const url = shopUrlAddr + "/v1/Shop/insertShopHoliday";
      let res = await postAPI(url, jsonStr);
      console.log("호올리데이 리절트 브이오 " + res.resultVO)
  }
  
</script>


<section class="full_layer" id="holiday_add">
  <form action="/shop/awDrstDtl" method="PUT">
  <!--<div class="bg"></div>-->
  <div class="box_1 holiday">
    <p class="text_tit">휴일등록</p>
    <button type="button" class="modal_close" on:click={() => closePopup("holiday_add")}><i class="xi-close-min"></i></button>

    <hr>
    <div class="form_table">
      <!--<form action="/shop/awHoliday" method="PUT">-->
      <table class="holiday_tbl">
        <tr>
          <th>기간</th>
          <td>
            <div class="form_inline">
              <input type="date" bind:value={$shdyFrom_drugHol} />
              <span> ~ </span>
              <input type="date" bind:value={$shdyTo_drugHol} />
              <button type="button" class="mbtn_b" on:click={() => { /* Add duplication check logic here */ }}>중복확인</button>
            </div>
          </td>
        </tr>
        <tr>
          <th>휴일명</th>
          <td>
            <input type="text" bind:value={$shdyTitl_drugHol} />
          </td>
        </tr>
        <tr>
          <th>안내문구 :</th>
          <td>
            <textarea class="desc" bind:value={$shdyTitl_drugHol}></textarea>
          </td>
        </tr>
      </table>
    <!--</form>-->
    </div>
    <div class="btn_wrap">
      <button type="submit" class="btn_02" on:click={()=>addHoliday()}>저장</button>
    </div>
  </div>
</form>
</section>

<!-- 휴일관리 - 삭제팝업 -->
<section class="full_layer" id="holiday_del">
  <div class="bg"></div>
  <div class="box_1">
    <p class="txt_c">선택하신 항목을 삭제하시겠습니까?</p>
    <button type="button" class="modal_close" on:click={() => closePopup("holiday_del")}><i class="xi-close-min"></i></button>
    <hr>
    <p class="btn_wrap inline">
      <button type="button" class="btn_02 small close_btn" on:click={confirmDeletion}>예</button>
      <button type="button" class="btn_03 small close_btn" on:click={() => closePopup("holiday_del")}>아니오</button>
    </p>
  </div>
</section>