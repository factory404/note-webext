<template>
    <div class="nse-note-panel" :style="{width: panelWidth + 'px'}">
        <DragButton class="nse-note-panel-drag-button" @dragLeft="onDragLeft" @dragRight="onDragRight" @btnclick="onBtnclick"></DragButton>
        <div ref="refNotePanel">
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
    </div>
</template>

<script setup lang="ts">
import { sendMessage } from 'webext-bridge';
import { MenuFoldOutlined } from '@ant-design/icons-vue';
import {GET_PANEL_WIDTH, SET_PANEL_WIDTH} from '~/constant'
import Record from './record.vue';
import useStopDomEvent from '~/hook/useStopDomEvent';
import DragButton from './drag-button.vue'

const refNotePanel = ref(null);
const panelWidth = ref(360);

const MAX_PANEL_WIDTH = 500;
const MIN_PANEL_WIDTH = 300;

useStopDomEvent(refNotePanel, 'mouseup');

sendMessage(GET_PANEL_WIDTH, {}).then((width:any) => {
    if (width || width === 0) {
        changeBodyWidth(width)
    } else {
        changeBodyWidth(panelWidth.value)
    }
})

const changeBodyWidth = (width: number) => {
    document.body.setAttribute('style', `width: calc(100% - ${width}px);`);
    panelWidth.value = width
    sendMessage(SET_PANEL_WIDTH, {panelWidth: width})
}

const onDragLeft = (pixel: number) => {
    if (panelWidth.value > MAX_PANEL_WIDTH) {
        return
    }
    changeBodyWidth(panelWidth.value + pixel)
}
const onDragRight = (pixel: number) => {
    if (panelWidth.value < MIN_PANEL_WIDTH) {
        return
    }
    changeBodyWidth(panelWidth.value - pixel)
}
const onBtnclick = () => {
    changeBodyWidth(0)
}
</script>

<style lang="less">

@header-height : 40px;

.nse-note-panel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99999;
    height: 100%;
    background: #f3f3f3;
    border-left: 1px solid #e7e7e7;
    box-shadow: -3px 0px 10px 1px #f2f2f2;

    &-drag-button{
        position: absolute;
        top: 0;
        left: -26px;
        bottom: 0;
        margin: auto 0;
        z-index: 999999;
    }
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