<template>
    <div class="nse-drag-button" ref="refDragbtn">
        <div class="nse-drag-button-box" :class="props.panelWidth === 0 ? 'nse-drag-button-box-close': ''" @click="onOpenClick">
            <PauseOutlined/>
        </div>
        <div v-if="props.panelWidth > 0" :class="props.panelWidth > 0 ? 'nse-drag-button-box-active': ''" @click="onCloseClick">
            <DoubleRightOutlined />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PauseOutlined, DoubleRightOutlined} from '@ant-design/icons-vue';
import { useDraggable } from '@vueuse/core'

const props = defineProps({
    panelWidth: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['onDrag', 'btnclick'])

const refDragbtn = ref<HTMLElement | null>(null)

const {x} = useDraggable(refDragbtn, {initialValue: {x:0, y: 0}})

const clientWidth = (document.querySelector('html') as any).clientWidth || 0

watch(x, () => {
    let width =  clientWidth - x.value;
    emit('onDrag', width)
    
})

const onOpenClick = () => {
    emit('btnclick', 'open')       
}

const onCloseClick = () => {
    emit('btnclick', 'close')
}

</script>

<style lang="less">
.nse-drag-button{
    height: 40px;
    font-size: 12px;
    cursor: pointer;

    &-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        background: rgb(227, 227, 227);
    }

    &-box-close {
        position: relative;
        left: -15px;
        width: 20px;
        color: #fff;
        background: #1890ff;
        box-shadow: -2px 0px 9px rgb(0 0 0 / 20%);
    }

    &-box-active {
        background: rgb(227, 227, 227);
        &:hover {
            color: #fff;
            background: #1890ff;
        }
    }
}
</style>