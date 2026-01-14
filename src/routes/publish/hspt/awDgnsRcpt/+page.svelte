<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import PageLoader from "$lib/sub/pay/PageLoader.svelte";
  import Footer from "$lib/sub/Footer.svelte";
  import { getUserId } from "$lib/js/getUserId";
  import { updateRefresh } from "$lib/js/updateRefresh";
  import { isLogin, susrShpId } from "$lib/store/loginStore";
  import { getAPI } from "$lib/js/getAPI";
  import Grid from "gridjs-svelte";
  import "gridjs/dist/theme/mermaid.css";
  import { mobileUrlAddr, authUrlAddr, shopUrlAddr } from "$lib/js/urlAddr";
  import Calendar from "$lib/sub/Calendar.svelte";
  import DateInput from "date-picker-svelte/DateInput.svelte";
  import { makeStr } from "$lib/js/makeStr";
  import { postAPI } from "$lib/js/postAPI";
  import { URL } from "$lib/URL";

  // 로딩 상태
  let isLoading = true;

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
    { name: "환자ID", hidden: true },
  ];
  const pagination = { enabled: true, limit: 5 };
  const style = {
    table: {
      width: "100%",
    },
    th: {
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
  let searchText = "";
  let birthDate = null;
  let selectedMbrData = {};
  let data = []; // Grid data
  let doctorList = [];
  let receptionDate = new Date();
  let selectedHour = "";
  let hour = "";
  let rghour = [];
  let selectedDoctor = "";
  let selectedDgnsType = "";
  let selectedDeptId = "";
  let selectedItemId = "";
  let comment = "";
  let selectedDtrItemList = [];
  let selectedDtrDeptList = [];
  let rcptSuccessPopup = false;
  let rcptSuccessMessage = "";

  onMount(async () => {
    const jwt = localStorage.getItem("bizportal-access-token");
    const refresh = localStorage.getItem("bizportal-refresh-token");
    try {
      const result = await getUserId(jwt);

      if (result) {
        isLogin.set(true);
        await Promise.all([fetchData(), getDoctorListInfo()]);
      }

    } catch (err) {
      console.error(err);
      if (err.message === "21009") {
        // 토큰 만료
        try {
          await updateRefresh(localStorage.getItem("bizportal-refresh-token"));
          goto("/main/main");
        } catch (e) {
          alert("다시 로그인해주세요");
          handleTokenIssue(e);
        }
      } else {
        handleTokenIssue(err);
      }
    } finally {
      isLoading = false;
    }
  });

  function handleTokenIssue(error) {
    console.error("Token issue:", error.message);
    if (error.message === "22005") {
      alert("토큰 재발급 오류 발생. 다시 로그인해주세요");
      loginResetStore();
      goto(URL.awLogin);
    }
    clearLocalStorageTokens();
  }

  function clearLocalStorageTokens() {
    localStorage.setItem("bizportal-refresh-token", "");
    localStorage.setItem("bizportal-access-token", "");
  }

  function onRowClick(evt) {
    const columnKeys = [
      "rowNum",
      "patName",
      "birthDate",
      "gender",
      "mbrName",
      "type",
      "tel",
      "dgnsRsvDttm",
      "dgnsId",
      "mbrId",
      "dgnsPatId",
    ];
    const rowArr = evt.detail[1].cells.map((cell) => cell.data);
    selectedMbrData = rowArr.reduce((acc, cur, idx) => {
      acc[columnKeys[idx]] = cur;
      return acc;
    }, {});
    console.log("Selected Member Data:", selectedMbrData);
    updateGridStyle(selectedMbrData.rowNum);
  }

  async function fetchData(searchText = "", birthDate = null) {
    isLoading = true;
    try {
      const qs = new URLSearchParams();

      qs.set("dgnsShpId", String($susrShpId));

      if (searchText?.trim()) qs.set("dgnsPatName", searchText.trim());
      if (birthDate) qs.set("birthDate", formatDateOnly(birthDate)); // 아래 함수 참고

      const url = `${authUrlAddr}/v1/member/selectMbrList?${qs.toString()}`;
      const res = await getAPI(url);

      if (res && res.resultVO) {
        data = res.resultVO.map(
          ({
            rowNum, patName, birthDate, gender, mbrName, type, tel, dgnsRsvDttm, dgnsId, mbrId, dgnsPatId,
          }) => [
            rowNum,
            patName,
            birthDate,
            gender,
            mbrName,
            type,
            tel,
            dgnsRsvDttm || "최근 진료 없음",
            dgnsId,
            mbrId,
            dgnsPatId,
          ]
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading = false;
    }
  }

  // Date -> "YYYY-MM-DD"
  function formatDateOnly(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }


  async function getDoctorListInfo() {
    try {
      const docInfoUrl =
        shopUrlAddr + "/v1/Shop/selectHospitalDoctorList?shpId=" + $susrShpId;
      const resData_docInfo = await getAPI(docInfoUrl);
      doctorList = resData_docInfo.resultVO;
    } catch (error) {
      console.error(error);
    }
  }

  async function findDtrTime() {
    if (!selectedDoctor) return;

    const day = new Date(receptionDate);
    const dow = day.getDay();
    const formattedDay = changeDate(receptionDate); // yy-MM-dd

    const timeUrl =
      `${shopUrlAddr}/v1/Shop/uaDgnsDtrTm` +
      `?dtmeDtrId=${selectedDoctor.dtrId}` +
      `&htmeHsptId=${$susrShpId}` +
      `&htmeDay=${dow}` +
      `&dtmeDay=${formattedDay}`;

    const res = await getAPI(timeUrl);
    if (res.resultVO.length && res.resultVO[0].htmeType !== "vacation") {
      rghour = res.resultVO;
      console.log("rghour", rghour);
      hour = rghour[0].htmeFrom;
    } else if (res.resultVO[0]?.htmeType === "vacation") {
      hour = "vacation";
      rghour = [];
    } else {
      hour = "";
      rghour = [];
    }
  }

  function changeDate(date) {
    const year = date.getFullYear().toString().substring(2, 4);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  function handleDgnsTypeChange(event) {
    const newValue = event.target.value;

    if (newValue === "U" && selectedDoctor?.dtrCtlsYon !== "Y") {
      alert("선택하신 의사는 비대면 진료가 불가능합니다.");
      selectedDgnsType = "";
      return;
    }

    if (newValue === "V" && selectedDoctor?.dtrVstYon !== "Y") {
      alert("선택하신 의사는 대면 진료가 불가능합니다.");
      selectedDgnsType = "";
      return;
    }

    selectedDgnsType = newValue;
  }

  async function getDoctorItemAndDept(doctorId) {}

  async function getSelectedDtrItem(dtrId) {
    const itemurl =
      shopUrlAddr +
      "/v1/Shop/selectHsptDoctorItemList?dtrId=" +
      dtrId +
      "&shpId=" +
      $susrShpId;
    let resDtrItem = await getAPI(itemurl);
    selectedDtrItemList = resDtrItem.resultVO;
  }

  // 선택의사 진료과목 조회
  async function getSelectedDtrDept(dtrId) {
    const deptUrl =
      shopUrlAddr +
      "/v1/Shop/selectHsptDoctorDeptList?dtrId=" +
      dtrId +
      "&shpId=" +
      $susrShpId;
    let resDtrDept = await getAPI(deptUrl);
    selectedDtrDeptList = resDtrDept.resultVO;
  }

  $: if (receptionDate && selectedDoctor) {
    findDtrTime();
    getSelectedDtrDept(selectedDoctor.dtrId);
    getSelectedDtrItem(selectedDoctor.dtrId);
  }

  async function doReg() {
    // 유효성 검사
    if (!selectedDoctor) {
      alert("의료진을 선택해주세요.");
      return;
    }
    if (!receptionDate || !selectedHour) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    const [startTime] = selectedHour.split("~").map((s) => s.trim());
    const [hh, mm] = startTime.split(":").map(Number);

    const dt = new Date(receptionDate);
    dt.setHours(hh, mm, 0, 0);
    const dateString = formatDateTime(dt);

    const requestBody = makeStr({
      dgnsShpId: $susrShpId,
      dgnsDtrId: selectedDoctor.dtrId,
      dgnsMemo: comment,
      dgnsRsvDttm: dateString,
      dgnsDeptId: selectedDeptId,
      dgnsItemId: selectedItemId,
      dgnsPatId: selectedMbrData.dgnsPatId,
      dgnsType: selectedDgnsType,
      dgnsMbrId: selectedMbrData.mbrId,
      dgnsWlkYon: "Y",
    });

    const jwt = localStorage.getItem("bizportal-access-token");
    try {
      const res = await postAPI(
        `${mobileUrlAddr}/v1/dgns/uaDgnsRgst`,
        requestBody,
        jwt
      );
      if (res.status === 1) {
        rcptSuccessPopup = true;
        rcptSuccessMessage = "예약 완료 되었습니다."
      } else {
        rcptSuccessPopup = true;
        rcptSuccessMessage = `예약 실패: ${res.message}`;
      }
    } catch (err) {
      console.error(err);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  }

  // yyyy-MM-dd HH:mm:ss 포맷팅 헬퍼
  function formatDateTime(date) {
    if (!date) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
      ` ${pad(date.getHours())}:${pad(date.getMinutes())}:00`
    );
  }

  function updateGridStyle() {
    document.querySelectorAll(".gridjs-tbody tr").forEach((row, index) => {
      const cells = row.querySelectorAll("td"); // 모든 td 요소를 가져옴
      const rowId = cells[0].innerText; // rowId가 있는 td의 인덱스를 참조 (첫 번째 열)
      if (parseInt(rowId) == selectedMbrData.rowNum) {
        row.classList.add("highlighted");
      } else {
        row.classList.remove("highlighted");
      }
    });
  }
</script>

<section id="con">
  <div id="content">
    <div class="list-set form_table">
      <span>진료 접수/예약</span>
      <div
        class="box_search"
        style="display: flex; align-items: center; gap: 10px;"
      >
        <span>환자명</span>
          <label
            ><input
              type="text"
              name=""
              id=""
              bind:value={searchText}
              placeholder="검색어를 입력하세요"
            /></label
          >
        <span>생년월일</span>
        <DateInput
          bind:value={birthDate}
          format="yyyy-MM-dd"
          placeholder="생년월일 선택"
          min={new Date(1920, 0, 1)}
          max={new Date()}
        />
        <button
          type="button"
          class="mbtn_n_5 ibtn-search btn-lg"
          on:click={() => fetchData(searchText, birthDate)}
          >검색</button
        >
      </div>
      <div class="form_table">
        <Grid
          class="gridjs"
          {columns}
          {data}
          {pagination}
          {style}
          {language}
          fixedHeader={true}
          on:rowClick={onRowClick}
        />
      </div>
    </div>

    <div class="form_table">
      <h3 style="margin-bottom: 10px;">회원 정보 접수/예약</h3>
      <table>
        <colgroup>
          <col style="width:10%;" />
          <col style="width:20%;" />
          <col style="width:10%;" />
          <col style="width:20%;" />
        </colgroup>
        <tr>
          <th>의료진</th>
          <td>
            <select
              bind:value={selectedDoctor}
              disabled={selectedMbrData.length === 0}
            >
              <option value="">의료진 선택</option>
              {#each doctorList as doctor}
                <option value={doctor}>
                  {doctor.dtrName}
                </option>
              {/each}
            </select>
          </td>
          <th>접수일시</th>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <DateInput
                bind:value={receptionDate}
                format="yy-MM-dd"
                on:input={findDtrTime}
                min={new Date()}
                style="min-height: 300px;"
              />
              <select
                bind:value={selectedHour}
                disabled={hour === "vacation" ||
                  !rghour.length ||
                  !selectedDoctor}
              >
                <option value="">시간 선택</option>
                {#each rghour as time}
                  <option value={time.htmeFrom}
                    >{time.htmeFrom} ~ {time.htmeTo}</option
                  >
                {/each}
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <th>진료구분</th>
          <td>
            <select
              bind:value={selectedDgnsType}
              on:change={handleDgnsTypeChange}
              disabled={!selectedDoctor}
            >
              <option value="">선택하세요</option>
              {#if selectedDoctor}
                {#if selectedDoctor.dtrVstYon === "Y"}
                  <option value="V">대면</option>
                {/if}
                {#if selectedDoctor.dtrCtlsYon === "Y"}
                  <option value="U">비대면</option>
                {/if}
                {#if selectedDoctor.dtrVstYon !== "Y" && selectedDoctor.dtrCtlsYon !== "Y"}
                  <option value="" disabled>진료 불가능한 의사입니다</option>
                {/if}
              {/if}
            </select>
          </td>
          <th>진료과</th>
          <td>
            <select disabled={!selectedDoctor} bind:value={selectedDeptId}>
              <option value="">진료과 선택</option>
              {#each selectedDtrDeptList as deptList}
                <option value={deptList.deptId}>{deptList.deptName}</option>
              {/each}
            </select>
          </td>
        </tr>
        <tr>
          <th>회원명</th>
          <td>{selectedMbrData.mbrName || ""} </td>
          <th>진료항목</th>
          <td>
            <select disabled={!selectedDoctor} bind:value={selectedItemId}>
              <option value="">진료항목선택</option>
              {#each selectedDtrItemList as itemList}
                <option value={itemList.itemId}>{itemList.itemName}</option>
              {/each}
            </select>
          </td>
        </tr>
        <tr>
          <th>환자명</th>
          <td>{selectedMbrData.patName || ""}</td>
          <th>관계</th>
          <td>{selectedMbrData.type || ""}</td>
        </tr>
        <tr>
          <th colspan="4">진료 사유</th>
        </tr>
        <tr>
          <td colspan="4">
            <div class="input_box_no" style="height:120px;">
              <textarea placeholder="진료 사유 작성" bind:value={comment} />
            </div>
          </td>
        </tr>
        <tr> </tr>
      </table>
      <div class="ess_info">
        <button
          type="button"
          class="mbtn_b btn-lg"
          on:click={doReg}
          style="margin-top:10px; align-items: center !important;"
          disabled={!selectedMbrData.patName ||
            !selectedDgnsType ||
            !selectedHour ||
            !selectedDoctor ||
            !selectedItemId ||
            !selectedDeptId}
        >
          접수/예약
        </button>
      </div>
    </div>
    <Footer />

    {#if rcptSuccessPopup}
      <section class="z_alert">
        <div class="z_box_1">
          <div class="tex">
            {rcptSuccessMessage}
          </div>
          <div class="btn_wrap">
            <button class="btn-lg" on:click={() => (rcptSuccessPopup = false)}
              >확인</button
            >
          </div>
        </div>
      </section>
    {/if}

    {#if isLoading}
      <PageLoader />
    {/if}
  </div>
</section>

