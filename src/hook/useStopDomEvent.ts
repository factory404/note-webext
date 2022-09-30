import { onMounted, onUnmounted } from 'vue';

export default function useStopDomEvent(ref: any, event: string) {
    const stopEvent = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    onMounted(() => {
        ref.value.addEventListener(event, stopEvent, false);
    });

    onUnmounted(() => {
        ref.value.removeEventListener(event, stopEvent, false);
    });
}
