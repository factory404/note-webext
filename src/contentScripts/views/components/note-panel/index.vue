<template>
    <div class="nse-note-panel" ref="refNotePanel">
        <div class="nse-note-panel-header">
            <MenuFoldOutlined />
        </div>
        <div class="nse-note-panel-content">
            <div class="nse-note-panel-content-title">2022-09-14</div>
            <div class="nse-note-panel-content-list">
                <Record></Record>
                <Record></Record>
                <Record></Record>
                <Record></Record>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { MenuFoldOutlined } from '@ant-design/icons-vue';
import Record from './record.vue';
import useStopDomEvent from '~/hook/useStopDomEvent';

const refNotePanel = ref(null);

useStopDomEvent(refNotePanel, 'mouseup');

onMounted(() => {
    document.body.setAttribute('style', 'margin-right:360px');
});
</script>

<style lang="less">

@header-height : 40px;

.nse-note-panel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99999;
    width: 360px;
    height: 100%;
    background: #f3f3f3;
    border-left: 1px solid #e7e7e7;
    box-shadow: -5px 0px 100px 1px #e7e7e7;

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: @header-height;
        padding: 0 20px;
        border-bottom: 1px solid #e2e2e2;
        background: #ededed;
    }
    &-content {
        &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: @header-height;
            padding: 0 20px;
            font-size: 16px;
            font-weight: 600;
            border-bottom: 1px solid #e2e2e2;
        }
        &-list {
            height: calc(100vh - @header-height*2 - 10px);
            padding: 10px;
            overflow: auto;
        }
    }
}
</style>