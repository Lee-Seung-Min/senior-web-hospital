<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { dgnsShpId, dgnsDtrId, dgnsRsvDttm, dgnsType } from "$lib/store/rgstStore.js";
  import { getAPI } from "$lib/js/getAPI";
  import { page } from "$app/stores";
  import { shopUrlAddr, urlAddr } from "$lib/js/urlAddr";
  let setMonth;
  let today;
  let firstDate;
  let lastDate;
  let calYear;
  let calMonth;
  let getDay;
  let lastDay;
  let checkDay;
  let week;
  let checkClass;
  let nowMonth;
  let nowYear;
  let nowDay;
  let rgDay;
  let rgYear;
  let rgMonth;
  let fhour;
  export let rghour = [{ htmeFrom: "", htmeTo: "" }];
  export let hour;
  export let day;
  export let dtrNo;
  onMount(async () => {
    setMonth = new Date();
    today = setMonth.getDate();
    nowDay = new Date(setMonth.getFullYear(), setMonth.getMonth(), today);
    nowYear = setMonth.getFullYear();
    nowMonth = setMonth.getMonth() + 1;
    buildCalendar();
    if ($dgnsRsvDttm != null && $dgnsRsvDttm != "") {
      let date = new Date($dgnsRsvDttm);
      const timeUrl =
        shopUrlAddr +
        "/v1/Shop/uaDgnsDtrTm?dtmeDtrId=" +
        $dgnsDtrId +
        "&htmeHsptId=" +
        $dgnsShpId +
        "&htmeDay=" +
        date.getDay() +
        "&dtmeType=" +
        $dgnsType;
      let resData = await getAPI(timeUrl); //의사&날짜 별 예약 가능 시간 찾기
      console.log(resData);
      if (resData.resultVO.length != 0) {
        rghour = resData.resultVO;
        setMonth = new Date(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes());
        fhour = setMonth.getHours() + ":" + setMonth.getMinutes();
        if (setMonth.getMinutes() == 0) {
          fhour += "0";
        }
        hour = rghour.find(findTime).htmeFrom;
        console.log(hour);
        rgDay = date.getDate();
        rgYear = date.getFullYear();
        rgMonth = date.getMonth() + 1;
        checkClass = rgDay;
        day = rgYear + "." + rgMonth + "." + rgDay;
      } else {
        hour = "";
        rghour = [{ htmeFrom: "", htmeTo: "" }];
      }
    } else {
      hour = "";
      rghour = [{ htmeFrom: "", htmeTo: "" }];
    }
  });
  //캘린더 만들기
  function buildCalendar() {
    firstDate = new Date(setMonth.getFullYear(), setMonth.getMonth(), 1);
    lastDate = new Date(setMonth.getFullYear(), setMonth.getMonth() + 1, 0);
    calYear = setMonth.getFullYear();
    calMonth = setMonth.getMonth() + 1;
    getDay = firstDate.getDay();
    lastDay = lastDate.getDate();
    let getWeek = lastDay + getDay + 1;
    if (getWeek % 7 == 0) {
      week = Math.floor(getWeek / 7);
    } else {
      week = Math.floor(getWeek / 7) + 1;
    }
    checkDay = 7 - getDay;
  }

  // 이전달 버튼 클릭
  function prevCalendar() {
    setMonth = new Date(setMonth.getFullYear(), setMonth.getMonth() - 1, 1); // 현재 달을 1 감소
    buildCalendar(); // 달력 다시 생성
    checkClass = 0;
  }
  // 다음달 버튼 클릭
  function nextCalendar() {
    setMonth = new Date(setMonth.getFullYear(), setMonth.getMonth() + 1, 1); // 현재 달을 1 증가
    buildCalendar(); // 달력 다시 생성
    checkClass = 0;
  }
  //캘린더 날짜 선택
  async function selectDay(sday) {
    checkClass = sday;
    day = calYear + "-" + calMonth + "-" + sday;
    let dow = new Date(day);
    const timeUrl =
      shopUrlAddr +
      "/v1/Shop/uaDgnsDtrTm?dtmeDtrId=" +
      dtrNo +
      "&htmeHsptId=" +
      $dgnsShpId +
      "&htmeDay=" +
      dow.getDay() +
      "&dtmeType=" +
      $page.url.searchParams.get("dgnsType");
    let resData = await getAPI(timeUrl); //의사&날짜 별 예약 가능 시간 찾기
    if (resData.resultVO.length != 0) {
      console.log(resData);
      rghour = resData.resultVO;
      hour = rghour[0].htmeFrom;
    } else {
      hour = "";
      rghour = [{ htmeFrom: "", htmeTo: "" }];
    }
  }
  //수정 or 변경시 기존에 저장한 시간 찾기
  function findTime(e) {
    if (e.htmeFrom == fhour) {
      return true;
    }
  }
</script>

<div class="box_1">
  <div class="calendar">
    <div class="bg_gray">
      <button type="button" title="이전달" class="prev" on:click={prevCalendar} />
      <span>{calYear + "년 " + calMonth + "월"}</span>
      <button type="button" title="다음달" class="next" on:click={nextCalendar} />
    </div>
    <div class="cal">
      <table>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          {#each Array(week) as w, i}
            <tr>
              {#if i == 0}
                {#each Array(getDay) as j}
                  <td />
                {/each}
                {#each Array(checkDay) as d, j}
                  {#if lastDate < nowDay}
                    <td>{j + 1}</td>
                  {:else if nowYear == calYear && nowMonth == calMonth && j < today}
                    <td>{j + 1}</td>
                  {:else if nowYear == calYear && nowMonth == calMonth && j == today}
                    <td class="today"
                      ><button
                        type="button"
                        class={checkClass == j + 1 ? "today on" : "today"}
                        on:click={selectDay(getDay - getDay + j + 1)}>오늘</button
                      ></td
                    >
                  {:else if nowYear == rgYear && nowMonth == rgMonth && j == rgDay}
                    <td
                      ><button
                        type="button"
                        class={checkClass == j + 1 ? "on" : ""}
                        on:click={selectDay(getDay - getDay + j + 1)}>{j + 1}</button
                      ></td
                    >
                  {:else}
                    <td
                      ><button
                        type="button"
                        class={checkClass == j + 1 ? "on" : ""}
                        on:click={selectDay(getDay - getDay + j + 1)}>{j + 1}</button
                      ></td
                    >
                  {/if}
                {/each}
              {:else}
                {#each Array(7) as d, j}
                  {#if i * 7 - getDay + j + 1 <= lastDay}
                    {#if lastDate < nowDay}
                      <td><span>{i * 7 - getDay + j + 1}</span></td>
                    {:else if nowYear == calYear && nowMonth == calMonth && i * 7 - getDay + j + 1 < today}
                      <td><span>{i * 7 - getDay + j + 1}</span></td>
                    {:else if nowYear == calYear && nowMonth == calMonth && i * 7 - getDay + j + 1 == today}
                      <td class="today"
                        ><button
                          type="button"
                          class={checkClass == i * 7 - getDay + j + 1 ? "on" : ""}
                          on:click={selectDay(i * 7 - getDay + j + 1)}>오늘</button
                        ></td
                      >
                    {:else if nowYear == rgYear && nowMonth == rgMonth && i * 7 - getDay + j + 1 == rgDay}
                      <td
                        ><button
                          type="button"
                          class={checkClass == i * 7 - getDay + j + 1 ? "on" : ""}
                          on:click={selectDay(i * 7 - getDay + j + 1)}>{i * 7 - getDay + j + 1}</button
                        ></td
                      >
                    {:else}
                      <td
                        ><button
                          type="button"
                          class={checkClass == i * 7 - getDay + j + 1 ? "on" : ""}
                          on:click={selectDay(i * 7 - getDay + j + 1)}>{i * 7 - getDay + j + 1}</button
                        ></td
                      >
                    {/if}
                  {/if}
                {/each}
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <select class="time" bind:value={hour}>
      {#if hour == ""}
        <option value={hour}>예약불가</option>
      {:else}
        {#each rghour as h}
          <option value={h.htmeFrom}>{h.htmeFrom}~{h.htmeTo}</option>
        {/each}
      {/if}
      <!-- 진료시간 표출 -->
    </select>
  </div>
</div>
