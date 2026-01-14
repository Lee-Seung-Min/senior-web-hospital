import { onMount,onDestroy, beforeUpdate, afterUpdate } from "svelte";
import { writable } from "svelte/store";

export function lifecycle(){
    onMount(()=>{
        console.log("Mounted?");
    })
    onDestroy(()=>{
        console.log("Before destroy?");
    })
    beforeUpdate(()=>{
        console.log('Before update!');
    })
    afterUpdate(()=>{
        console.log("After Update!");
    })
}

export function delayRender(delay = 3000){
    let render = writable(false);
    onMount(()=>{
        setTimeout(()=>{
            //$render = true 
            console.log(render) // set, update, subcribe
            render.set(true);
        }, delay)
    })

    return render;
}