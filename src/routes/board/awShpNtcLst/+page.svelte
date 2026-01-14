<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { getAPI } from "$lib/js/getAPI";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import { shopUrlAddr } from "$lib/js/urlAddr";
  import { authUrlAddr } from "$lib/js/urlAddr";
  import { mobileUrlAddr } from "$lib/js/urlAddr";
  import { adminUrlAddr } from "$lib/js/urlAddr";
  import Footer from "$lib/sub/Footer.svelte";
  import { goto } from "$app/navigation";
  import { URL } from "$lib//URL";
  import Grid from "gridjs-svelte";
  import { h } from "gridjs";
  import PopUp from "$lib/sub/nav/PopUp.svelte";
  import {
    isLogin,
    susrId,
    susrLoginId,
    susrName,
    susrShpId,
    susrShpName,
  } from "$lib/store/loginStore";
  import { getUserId } from "$lib/js/getUserId";
  import { updateRefresh } from "$lib/js/updateRefresh";
  import { page } from "$app/stores";
  import { get } from "svelte/store";

  let ntcList = [];
  let rowNum = "";
  let ntcDtl = [];
  let currentPage = 0;
  let totalPage;
  let startPage;
  let endPage;
  let pages = [];
  let ntcFormType;
  let popUpWhat;
  let ntcUseYon = "";
  let ntcSearchType = "A";
  let ntcSearchKey = "";
  let text;
  let blank;
  const style = {
    table: {
      border: "3px solid #ccc",
    },
    th: {
      "background-color": "rgba(0, 0, 0, 0.1)",
      color: "#000",
      "border-bottom": "3px solid #ccc",
      "text-align": "center",
    },
    td: {
      "text-align": "center",
    },
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
    "최종수정일",
  ];

  let data = [];

  onMount(async () => {
    const jwt = localStorage.getItem("bizportal-access-token");
    const refresh = localStorage.getItem("bizportal-refresh-token");
    try {
      //사용자 id를 가져온다.
      await getUserId(jwt).then((result) => {
        //id를 가져온 후의 로직을 작성.
        if (result != "" && result != undefined && result != "") {
          isLogin.update((isLogin) => (isLogin = true));
        }
      });
    } catch (err) {
      //에러가 토큰기간만료 코드라면 다시 재발급을 진행
      try {
        if (err.message == "21009") {
          try {
            await updateRefresh(refresh);
            goto("/");
            // location.reload();
          } catch (err) {
            if (err.message == "22005") {
              alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
              goto("/");
            }
          }
        } else {
          //아니라면 그냥 에러 출력.
          console.error(err);
        }
      } catch (err) {
        //토큰 재발급 과정에서 에러 발생 시, 다시 로그인하도록 로그인 화면으로 보낸다.
        console.error(err);
        localStorage.setItem("bizportal-refresh-token", "");
        localStorage.setItem("bizportal-access-token", "");
        alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
        goto("/");
      }
    }
    await firstLoad();
  });

  async function setNtcInfo(e) {
    let rowNumIndex = e.detail[1]._cells[0].data;
    ntcDtl = ntcList.find((ntc) => ntc.rowNum === Number(rowNumIndex));
    ntcFormType = "view";
  }

  //닫기 버튼
  function xButton() {
    popUpWhat = "";
  }

  async function firstLoad() {
    await getTotalPage();
    await search();

    // main/main 에서 넘어오는 rowNum - 데이터 로딩 완료 후 처리
    const rowNum = get(page).url.searchParams.get("rowNum");
    if (rowNum && ntcList.length > 0) {
      const idx = ntcList.findIndex((item) => item.rowNum == Number(rowNum));
      if (idx !== -1) {
        setNtcInfo({
          detail: [null, { _cells: [{ data: ntcList[idx].rowNum }] }],
        });
      }
    }
  }

  async function search() {
    ntcFormType = "";
    //공지사항 조회
    const ntcUrl =
      adminUrlAddr +
      "/v1/basicinfo/selectShopNoticeList?ntcShopId=" +
      $susrShpId +
      "&page=" +
      currentPage +
      "&ntcUseYon=" +
      ntcUseYon +
      "&ntcSearchType=" +
      ntcSearchType +
      "&ntcSearchKey=" +
      ntcSearchKey;
    let resData = await getAPI(ntcUrl);
    console.log("resData : ", resData);
    ntcList = resData.resultVO;
    data = ntcList.map((item) => [
      item.rowNum,
      item.ntcTitl,
      item.ntcUseYon,
      item.ntcRegDttm,
      item.ntcUpdtDttm,
    ]);
  }

  // 체크박스 변경 핸들러
  //   const handleCheckboxChange = (index) => {
  //     console.log(index);
  //     console.log(`Row ${index + 1} checkbox is ${data[index][0] ? "checked" : "unchecked"}`);
  //   };

  async function getTotalPage() {
    const url =
      adminUrlAddr +
      "/v1/basicinfo/selectShopNoticeTotalPage?ntcShopId=" +
      $susrShpId +
      "&ntcUseYon=" +
      ntcUseYon +
      "&ntcSearchType=" +
      ntcSearchType +
      "&ntcSearchKey=" +
      ntcSearchKey;
    let resData = await getAPI(url);
    totalPage = resData.resultVO;
    console.log("totalPage : ", totalPage);
    currentPage = 0;
    updatePage();
  }

  function updatePage() {
    pages = [];
    startPage = Math.floor(currentPage / 10) * 10 + 1;
    endPage = Math.min(startPage + 9, totalPage);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  function gotoNextPage() {
    if (currentPage + 1 != totalPage) {
      currentPage += 1;
      if (currentPage % 10 == 0) {
        updatePage();
      }
      search();
    }
  }

  function gotoPreviousPage() {
    if (currentPage != 0) {
      currentPage -= 1;
      if (currentPage % 10 == 9) {
        updatePage();
      }
      search();
    }
  }

  function getRegForm() {
    ntcDtl = {
      ntcUseYon: "Y",
      ntcTitl: "",
      ntcCnts: "",
      ntcShopId: $susrShpId,
      ntcRegUsr: $susrId,
    };
    ntcFormType = "new";
  }

  async function regNotice() {
    if (ntcDtl.ntcTitl == null || ntcDtl.ntcTitl == "") {
      text = "제목을 입력해주세요";
      blank = true;
    } else if (ntcDtl.ntcCnts == null || ntcDtl.ntcCnts == "") {
      text = "내용을 입력해주세요";
      blank = true;
    } else {
      const url = adminUrlAddr + "/v1/basicinfo/saveShopNoticeInfo";
      ntcDtl.ntcShopId = $susrShpId;
      ntcDtl.ntcUpdtUsr = $susrId;
      ntcDtl.ntcRegUsr = $susrId;
      let jsonStr = makeStr(ntcDtl);
      let res = await postAPI(url, jsonStr);
      console.log(res);
      if (res.code == "0") {
        popUpWhat = "regNotice";
      } else {
        popUpWhat = "failRegNotice";
      }
    }
  }

  async function delNotice() {
    popUpWhat = "";
    ntcFormType = "";
    const url = adminUrlAddr + "/v1/basicinfo/deleteShopNoticeInfo";
    let jsonStr = makeStr(ntcDtl);
    let res = await postAPI(url, jsonStr);
    console.log(res);
    if (res.code == "0") {
      popUpWhat = "delNotice";
    } else {
      popUpWhat = "failDelNotice";
    }
  }

  function delNoticeOpt() {
    ntcFormType = "";
    ntcSearchKey = "";
    ntcSearchType = "A";
    ntcUseYon = "";
  }
</script>

<div id="skipNavi">
  <a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a>
</div>

<section id="con">
  <div id="content">
    <!-- content S -->
    <h2 class="page_title">가맹점 공지사항</h2>

    <div class="box_search pr200">
      <select bind:value={ntcSearchType}>
        <option value="A">전체</option>
        <option value="T">제목</option>
        <option value="C">내용</option>
      </select>
      <label
        ><input
          type="text"
          class="w200"
          name=""
          id=""
          bind:value={ntcSearchKey}
        /></label
      >
      <select bind:value={ntcUseYon}>
        <option value="">전체</option>
        <option value="Y">노출</option>
        <option value="N">비노출</option>
      </select>

      <button type="button" class="mbtn_n_5" on:click={firstLoad}>검색</button>
      <div class="ar">
        <!-- <button
          type="button"
          class="mbtn_n_6"
          onClick="onConfirm('공지사항 삭제','해당 공지사항을 삭제하시겠습니까?','notice_del','')">선택삭제</button
        > -->
        <button type="button" class="mbtn_n_3" on:click={getRegForm}
          >등록</button
        >
      </div>
    </div>
    <!-- 목록 S -->
    <div class="form_table list">
      <Grid {data} {columns} {style} on:rowClick={setNtcInfo} />
    </div>

    <!-- 페이징 S -->
    <div class="page">
      <button type="button" class="fist" on:click={gotoPreviousPage}></button>
      {#each pages as page}
        <button
          type="button"
          class={page == currentPage + 1 ? "on" : ""}
          on:click={async () => {
            currentPage = page - 1;
            await search();
          }}>{page}</button
        >
      {/each}
      <button type="button" class="last" on:click={gotoNextPage}></button>
    </div>
    <!--페이징 E-->

    <!-- content S -->

    <div
      class={ntcFormType === "new"
        ? "notice_detail.new"
        : ntcFormType === "view"
          ? "notice_detail.view"
          : "notice_detail"}
    >
      <div class="box_1">
        <div class="form_table">
          <h3>
            공지사항
            <span class="view_type">
              {#if ntcFormType == "new"}
                등록
              {:else}
                수정
              {/if}
            </span>
            <div class="ar">
              <button type="button" class="mbtn_n_3" on:click={regNotice}>
                <span class="view_type">
                  {#if ntcFormType == "new"}
                    등록
                  {:else}
                    수정
                  {/if}
                </span>
              </button>
              {#if ntcFormType == "view"}
                <button
                  type="button"
                  class="mbtn_n_6"
                  on:click={() => {
                    popUpWhat = "deleteNtc";
                  }}>삭제</button
                >
              {/if}
              <button
                class="mbtn_n_4"
                type="button"
                on:click={() => {
                  ntcFormType = "";
                }}>취소</button
              >
            </div>
          </h3>
          <br />
          <table class="tbl_bbs">
            <colgroup>
              <col width="100px" />
              <col width="*" />
            </colgroup>
            <tr>
              <th>제목</th>
              <td>
                <div class="input_box_no">
                  <input
                    class="w100p"
                    type="text"
                    name=""
                    bind:value={ntcDtl.ntcTitl}
                  />
                  <div class="no">
                    {#if ntcDtl.ntcTitl == null}
                      (0/50 자)
                    {:else}
                      ({ntcDtl.ntcTitl.length}/50 자)
                    {/if}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>상태</th>
              <td>
                <input
                  type="radio"
                  name="radio"
                  id=""
                  bind:group={ntcDtl.ntcUseYon}
                  value="Y"
                  checked
                /><span> 노출 </span>
                <input
                  type="radio"
                  name="radio"
                  id=""
                  bind:group={ntcDtl.ntcUseYon}
                  value="N"
                /><span>비노출</span>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <div class="input_box_no">
                  <textarea class="w100p" name="" bind:value={ntcDtl.ntcCnts}
                  ></textarea>

                  <div class="no">
                    {#if ntcDtl.ntcCnts == null}
                      (0/500 자)
                    {:else}
                      ({ntcDtl.ntcCnts.length}/500 자)
                    {/if}
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- content E -->
    <Footer />
  </div>
</section>
{#if popUpWhat == "regNotice"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        공지사항
        {#if ntcFormType == "new"}
          등록
        {:else}
          수정
        {/if}
        하였습니다.
      </div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={async () => {
            xButton();
            delNoticeOpt();
            await firstLoad();
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "failRegNotice"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">
        공지사항
        {#if ntcFormType == "new"}
          등록
        {:else}
          수정
        {/if}
        실패 하였습니다.
      </div>
      <div class="btn_wrap">
        <button class="btn_01" on:click={xButton}>닫기</button>
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "delNotice"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">공지사항을 삭제 하였습니다.</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={async () => {
            xButton();
            delNoticeOpt();
            await firstLoad();
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "failDelNotice"}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">공지사항 삭제 실패 하였습니다.</div>
      <div class="btn_wrap">
        <button class="btn_01" on:click={xButton}>닫기</button>
      </div>
    </div>
  </section>
{/if}
{#if popUpWhat == "deleteNtc"}
  <section class="z_alert">
    <div class="bg"></div>
    <div class="z_box_1">
      <p class="text_tit">공지사항 삭제</p>
      <hr />
      <p class="txt_c" style="font-size:16px">
        해당 공지사항을 삭제하시겠습니까?
      </p>
      <br />
      <p class="btn_wrap inline">
        <button
          type="button"
          class="btn_02 small close_btn"
          on:click={delNotice}>예</button
        >
        <button type="button" class="btn_03 small close_btn" on:click={xButton}
          >아니오</button
        >
      </p>
      <p></p>
    </div>
  </section>
{/if}
{#if blank}
  <section class="z_alert">
    <div class="z_box_1">
      <div class="tex">{text}</div>
      <div class="btn_wrap">
        <button
          class="btn_01"
          on:click={() => {
            blank = false;
          }}>닫기</button
        >
      </div>
    </div>
  </section>
{/if}
