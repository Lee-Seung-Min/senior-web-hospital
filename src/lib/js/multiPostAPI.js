import { updateRefresh } from "$lib/js/updateRefresh.js";

/**
 * @param {RequestInfo | URL} url
 * @param {any} formData
 */
async function mulitiPostAPI(url, formData, header = "") {
  return await multiPostFetch(
    url,
    formData,
    !localStorage.getItem("bizportal-access-token") ? "" : localStorage.getItem("bizportal-access-token")
  )
    .then(async (res) => {
      // 인증에러
      if (res.status == 401) {
        // 토큰 재발급
        await updateRefresh();
        // getApi() 재요청
        res = await multiPostFetch(
          url,
          formData,
          !localStorage.getItem("bizportal-access-token") ? "" : localStorage.getItem("bizportal-access-token")
        );
      }
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      err.json().then((data) => {
        throw data;
      });
    });
}
async function multiPostFetch(url, formData, header = "") {
  return await fetch(url, {
    method: "POST",
    headers: {
      "bizportal-access-token": header,
    },
    body: formData,
  });
}
export { mulitiPostAPI };
