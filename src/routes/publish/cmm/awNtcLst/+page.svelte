<script>
  // @ts-nocheck
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
  import { isLogin, susrId, susrLoginId, susrName, susrShpId, susrShpName } from "$lib/store/loginStore";
  import PopUp_hm2 from "$lib/sub/nav/PopUp_hm2.svelte";
  import { ntcRegUsr, ntcTitlget } from "$lib/store/rgstStore";
  import { updateRefresh } from "$lib/js/updateRefresh";

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

  const pagination = {
    enabled: true,
    limit: 5, // 한 페이지에 5개의 행을 표시
    // 서버 사이드 페이징을 사용하는 경우 추가 옵션을 설정할 수 있음
  };
  const style = {
    table: {
      // border: "3px solid #ccc",
    },
    th: {
      // "background-color": "rgba(0, 0, 0, 0.1)",
      // color: "#000",
      // "border-bottom": "3px solid #ccc",
      "text-align": "center",
    },
    td: {
      "text-align": "center",
    },
  };
  const language = {
    pagination: {
      previous:'<', 
      next:'>'
    }
  }
  const columns = ["번호", "제목", "게시일"];

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
            goto(URL.awLogin);
            // location.reload();
          } catch (err) {
            if (err.message == "22005") {
              alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
              goto(URL.awLogin);
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
        goto(URL.awLogin);
      }
    }
    await firstLoad();
  });

  async function firstLoad() {
    await getTotalPage();
    await search();
  }
  async function setNtcInfo(e) {
    let rowNumIndex = e.detail[1]._cells[0].data;
    ntcDtl = ntcList.find((ntc) => ntc.rowNum === rowNumIndex);
    ntcFormType = "view";
  }
  async function search() {
    ntcFormType = "";
    //공지사항 조회
    const ntcUrl =
            adminUrlAddr +
            "/v1/basicinfo/selectNoticeList?ntcUseYon=Y&ntcShpYon=Y&page=" +
            currentPage +
            "&ntcSearchType=" +
            ntcSearchType +
            "&ntcSearchKey=" +
            ntcSearchKey;
    let resData = await getAPI(ntcUrl);
    console.log(resData);
    ntcList = resData.resultVO;
    data = ntcList.map((item) => [item.rowNum, item.ntcTitl, item.ntcFrom]);
  }

  async function getTotalPage() {
    const url =
            adminUrlAddr +
            "/v1/basicinfo/selectNoticeTotalPage?ntcUseYon=Y&ntcShpYon=Y" +
            "&ntcSearchType=" +
            ntcSearchType +
            "&ntcSearchKey=" +
            ntcSearchKey;
    let resData = await getAPI(url);
    totalPage = resData.resultVO;
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
</script>

<div id="skipNavi">
  <a href="#left_wrap">전체메뉴 바로가기</a>
  <a href="#content">본문바로가기</a>
</div>

<section id="con">
  <div id="content">
    <div class="list-set form_table">
      <span>공지사항</span>

      <div class="box_search" style="display: flex; align-items: center; gap: 10px;">
        <select bind:value={ntcSearchType}>
          <option value="A">전체</option>
          <option value="T">제목</option>
          <option value="C">내용</option>
        </select>
        <label><input type="text" name="" id="" bind:value={ntcSearchKey} /></label>
        <button type="button" class="mbtn_n_5 btn-lg ibtn-search" on:click={firstLoad}>검색</button>
      </div>
      <div class="form_table list">
        <Grid {data} {columns} {pagination} {style} {language} on:rowClick={setNtcInfo} />
      </div>
    </div>

    <div class={ntcFormType === "view" ? "notice_detail.view" : "notice_detail"}>
      <div class="box_1">
        <div class="form_table">
          <h3>
            공지내용 <span class="view_type"></span>
            <div class="ar">
              <button
                      class="mbtn_n_4 btn-lg ibtn-cancel"
                      type="button"
                      on:click={() => {
                  ntcFormType = "";
                }}>취소</button
              >
            </div>
          </h3>
          <br />
          <!--table start-->
          <table>
            <colgroup>
              <col style="width:12% ;" />
              <col style="width:38% ;" />
              <col style="width:12% ;" />
              <col style="width:38% ;" />
            </colgroup>
            <tr>
              <th>제목</th>
              <td colspan="3">{ntcDtl.ntcTitl}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>바로닥터</td>
              <th>게시일</th>
              <td>{ntcDtl.ntcFrom}</td>
            </tr>

            <tr class="bbs_content">
              <th>내용</th>
              <td colspan="3" style="white-space: pre-wrap">{ntcDtl.ntcCnts}</td>
            </tr>
          </table>
          <!--table end-->
        </div>
      </div>
    </div>

    <!-- content E -->

    <!-- content E -->
    <Footer />
  </div>
</section>
