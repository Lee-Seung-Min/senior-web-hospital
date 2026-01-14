import {json} from "@sveltejs/kit";
import {postAPI} from "./postAPI";

/**
 * @param {RequestInfo | URL} url
 * @param {any} jsonStr
 */
async function loginPostAPI(url, jsonStr) {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: jsonStr,
    });
    let resData = res.json();
    if (res.ok) {
        localStorage.setItem('bizportal-access-token', res.headers.get('bizportal-access-token'));
        localStorage.setItem('bizportal-refresh-token', res.headers.get('bizportal-refresh-token'));
        return resData;
    } else {
        throw new Error("error");
    }
}

export {loginPostAPI};





