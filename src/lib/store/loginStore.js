import {writable} from "svelte/store";
import {browser} from "$app/environment";
import {sineOut} from "svelte/easing";

const persist_storage = (key, initValue) => {
    if (browser) {
        const storedValueStr = sessionStorage.getItem(key);
        const store = writable(storedValueStr != null ? JSON.parse(storedValueStr) : initValue);
        store.subscribe((val) => {
            sessionStorage.setItem(key, JSON.stringify(val));
        });
        return store;
    }
};

export function loginResetStore() {
    isLogin.set(false);
    susrId.set('');
    susrName.set('');
    susrLoginId.set('');
    susrShpName.set('');
    susrShpId.set('');
    susrShpType.set('');
}

export const isLogin = writable(false);
export const susrId = persist_storage("susrId", "");
export const susrName = persist_storage("susrName", "");
export const susrLoginId = persist_storage("susrLoginId", "");
export const susrShpName = persist_storage("susrShpName", "");
export const susrShpId = persist_storage("susrShpId", "");
export const susrShpType = persist_storage("susrShpType", "");
