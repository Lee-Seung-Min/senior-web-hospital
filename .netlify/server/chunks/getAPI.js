import "./index.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
async function getFetch(url, header = "") {
  return await fetch(url, {
    method: "GET",
    headers: {
      "bizportal-access-token": header
    }
  });
}
let shopUrlAddr = "http://localhost:8000";
let authUrlAddr = "http://localhost:8000";
let mobileUrlAddr = "http://localhost:8000";
async function updateRefresh(refresh = "") {
  const url = authUrlAddr + "/v1/auth/updateSusrRefreshToken";
  await getFetch(url, !localStorage.getItem("bizportal-refresh-token") ? "" : localStorage.getItem("bizportal-refresh-token")).then((res) => {
    if (res.ok == false)
      return goto("/");
    return res.json();
  }).then((data) => {
    if (data.status === 22005)
      return goto("/");
    localStorage.setItem("bizportal-access-token", data.accessToken);
  });
}
async function getAPI(url, header = "") {
  return await getFetch(url, !localStorage.getItem("bizportal-access-token") ? "" : localStorage.getItem("bizportal-access-token")).then(async (res) => {
    if (res.status == 401) {
      await updateRefresh();
      res = await getFetch(url, !localStorage.getItem("bizportal-access-token") ? "" : localStorage.getItem("bizportal-access-token"));
    }
    if (!res.ok) {
      throw res;
    }
    return res.json();
  }).then((data) => {
    return data;
  }).catch((err) => {
    err.json().then((data) => {
      throw data;
    });
  });
}
export {
  getAPI as g,
  mobileUrlAddr as m,
  shopUrlAddr as s
};
