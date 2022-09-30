<template>
    <div
        ref="refSelectPanel"
        class="nse-select-panel"
        :style="{ left: selectPosition.panelX, top: selectPosition.panelY }"
    >
        <div class="nse-select-panel-title flex-jsb-ac">
            <div class="flex-js-ac">
                <div class="nse-select-panel-sltext">{{ selectText }}</div>
                <div class="pl-10">xxx</div>
            </div>
            <div>tools</div>
        </div>
        <div class="nse-select-panel-transale">
            {{ tslResult?.trans_result[0].dst }}
            <!-- <div>
                {{ selectTextContext }}
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { watch, defineComponent, ref } from 'vue';
import message from '~/utils/message';
import useStopDomEvent from '~/hook/useStopDomEvent';
import { CONTENT_SCRIPTS } from '~/constant';
import type { ITslResponse } from '~/api';

export default defineComponent({
    props: {
        isSelect: { type: Boolean },
        selectText: { type: String },
        selectTextContext: { type: String },
        selectPosition: {
            type: Object,
            default: () => {
                return {
                    buttonX: '',
                    buttonY: '',
                    maxHeight: '',
                    panelX: '',
                    panelY: '',
                    isTop: false,
                };
            },
        },
    },
    setup(props) {
        const refSelectPanel = ref(null);
        const tslResult = ref<ITslResponse>();

        useStopDomEvent(refSelectPanel, 'mouseup');

        watch(
            () => props.selectText,
            (val, oldval) => {
                tslResult.value = {
                    from: '',
                    to: '',
                    trans_result: [{ src: '', dst: '' }],
                    error_code: 0,
                    src_tts: '',
                    dst_tts: '',
                    dict: '',
                };
                if (!val) {
                    return;
                }
                if (!props.selectText) {
                    return;
                }
                message
                    .send(CONTENT_SCRIPTS.TRANSLATE, {
                        query: props.selectText,
                        from: 'en',
                        to: 'zh',
                    })
                    .then((res: any) => {
                        tslResult.value = res;
                    });
            }
        );

        return {
            refSelectPanel,
            tslResult,
        };
    },
});
</script>

<style lang="less">
.nse-select-panel {
    position: absolute;
    z-index: 999999;
    width: 600px;
    padding: 12px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 12px 45px 0px;
    border-radius: 6px;
    &-sltext {
        max-width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 600;
    }
    &-transale {
        margin-top: 10px;
    }
    &-transale {
        min-height: 30px;
        padding: 10px;
        border-radius: 4px;
        background: rgb(244, 244, 244);
    }
}
</style>