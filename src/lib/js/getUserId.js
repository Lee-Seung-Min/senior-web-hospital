import { json } from "@sveltejs/kit";
import { authUrlAddr, urlAddr } from "$lib/js/urlAddr";
import { getAPI } from "./getAPI";

/**
 * @param jwt 사용자 정보를 가져오기 위한 jwt
 */
async function getUserId(jwt) {
  let id = "";
  await getAPI(authUrlAddr + "/v1/auth/selectSuserInfo", jwt).then((result) => {
    if (result.message) {
      throw new Error(result.code);
    }

    id = result.susrId;
  });
  return id;
}
export { getUserId };

