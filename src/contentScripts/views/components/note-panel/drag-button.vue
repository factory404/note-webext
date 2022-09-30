<template>
    <div class="nse-drag-button" @mousedown="onMousedown" @mousemove="onMousemove">
        <div class="nse-drag-button-box">
            <PauseOutlined/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from 'vue';
import { PauseOutlined} from '@ant-design/icons-vue';

const emit = defineEmits(['dragLeft', 'dragRight', 'btnclick'])

const isDrag = ref(false)

const isMove = ref(false)

let pageX = 0

const onMousedown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    isDrag.value = true
    pageX = event.pageX

}
const onMousemove = (event: any) => {
    event.preventDefault();
    event.stopPropagation();    
    if (!isDrag.value) {
        return
    }
    isMove.value = true
    if (event.pageX < pageX) {
        emit('dragLeft', pageX-event.pageX)
        
    }
    if (event.pageX > pageX) {
        emit('dragRight', event.pageX - pageX)
    }
    pageX = event.pageX
}

const changeDragFlag = () => {
    if (isDrag.value && !isMove.value) {
        emit('btnclick')
    }
    isDrag.value = false
    isMove.value = false
}

onMounted(() => {
    document.addEventListener('mouseup', changeDragFlag, true)
})
onUnmounted(() => {
    document.removeEventListener('mouseup', changeDragFlag, true)
})
</script>

<style lang="less">
.nse-drag-button{
    height: 40px;
    padding: 0 20px;
    font-size: 12px;
    cursor: pointer;

    &-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        background: rgb(227, 227, 227);
    }
}
</style>