import { goto } from "$app/navigation";
import { getAPI } from "./getAPI";
import { authUrlAddr, urlAddr } from "./urlAddr";
import {getFetch} from "$lib/js/getFetch.js";

/**
 * 리프레시 토큰으로 엑시스 토큰을 재발급하기 위한 함수
 * @param refresh
 */
async function updateRefresh(refresh = "") {
  const url = authUrlAddr+"/v1/auth/updateSusrRefreshToken";
  await getFetch(url, !localStorage.getItem("bizportal-refresh-token") ? "" : localStorage.getItem("bizportal-refresh-token"))
      .then((res) => {
        if (res.ok == false) return goto('/');
        return res.json();
      })
      .then((data) => {
          if (data.status === 22005) return goto('/');
          localStorage.setItem("bizportal-access-token", data.accessToken);
      })
}


// async function updateRefresh(refresh) {
//   try {
//     const url = authUrlAddr + "/v1/auth/updateSusrRefreshToken";
//     await getAPI(url, refresh).then((result) => {
//       if (result.message) {
//         throw new Error(result.code + " : " + result.message);
//       }
//       localStorage.setItem("bizportal-refresh-token", result.refreshToken);
//       localStorage.setItem("bizportal-access-token", result.accessToken);
//       // console.log(localStorage.getItem("bizportal-refresh-token"));
//       // console.log(localStorage.getItem("bizportal-access-token"));
//     });
//   } catch (err) {
//     console.log(err);
//     console.error(err);
//   }
// }
export { updateRefresh };
