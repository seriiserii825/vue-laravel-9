import {onMounted, onUnmounted} from "vue";

export function useLifecycleLogger(payload: any) {
    onMounted(() => {
        //eslint-disable-next-line no-console
        console.log(payload, "mounted");
    });

    onUnmounted(() => {
        //eslint-disable-next-line no-console
        console.log(payload, "unmounted");
    });
}
