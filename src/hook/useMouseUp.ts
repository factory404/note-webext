import { ref, watch, onMounted, onUnmounted } from 'vue';
import { calcPosition } from '~/utils';
import { htmlToMarkdown, getSelectionHtml } from '~/utils/html-to-markdown';

const textContextSection = (text: string, section: string) => {
    const s = section.split('.').find((s) => s.includes(text)) || '';
    return s.substring(0, 200); // 限定200个字符
};

export default function useMouseUp() {
    const isMouseUp = ref(false);
    const selectText = ref('');
    const selectMarkDown = ref('');
    const selectTextContext = ref('');
    const selectPosition = ref({
        buttonX: '',
        buttonY: '',
        isTop: false,
        maxHeight: '',
        panelX: '',
        panelY: '',
    });

    const onMouseUp: any = (event: MouseEvent) => {
        const text = (window as any).getSelection().toString().trim();
        const textContext = textContextSection(text, (event as any).toElement.innerText);
        const textHtml = getSelectionHtml();
        selectText.value = text;
        if (!selectTextContext.value.includes(text)) {
            selectTextContext.value = textContext;
        }
        selectPosition.value = calcPosition(event);
        selectMarkDown.value = htmlToMarkdown(textHtml);
    };

    watch(selectText, () => {
        if (selectText.value) {
            isMouseUp.value = true;
        } else {
            isMouseUp.value = false;
        }
    });

    onMounted(() => {
        document.addEventListener('mouseup', onMouseUp, false);
    });

    onUnmounted(() => {
        document.removeEventListener('mouseup', onMouseUp, false);
    });

    const cancleSelect = () => {
        isMouseUp.value = false;
    };

    return {
        isMouseUp,
        selectText,
        selectTextContext,
        selectPosition,
        cancleSelect,
        selectMarkDown,
    };
}
