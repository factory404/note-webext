<template>
    <div class="nse-note-panel" :style="{width: panelWidth + 'px'}">
        <DragButton class="nse-note-panel-drag-button" :panelWidth="panelWidth" @onDrag="onDrag" @btnclick="onBtnclick"></DragButton>
        <div ref="refNotePanel">
            <div class="nse-note-panel-header">
                <div>
                    <MenuUnfoldOutlined @click="() => isNoteListVisible = true"/>
                </div>
                <div class="nse-note-panel-header-right">
                    <TagsManage :parentRef="refNotePanel"></TagsManage>
                    <IconCloud :uploadDate="uploadDate"/>
                    <Tooltip>
                        <template #title>
                            新建笔记
                        </template>
                        <PlusOutlined @click="createNewNoteClick"/>
                    </Tooltip>
                </div>
            </div>
            <div class="nse-note-panel-content">
                <div class="nse-note-panel-content-title">
                    <Input v-model:value="noteData.title"></Input>
                    <ASelect v-model:value="noteData.tag" class="nse-note-panel-content-tag-select" placeholder="添加标签" :options="tagsOptions" :getPopupContainer="()=> refNotePanel" @dropdownVisibleChange="tagsDropdownVisibleChange">
                    </ASelect>
                </div>
                <div class="nse-note-panel-content-tools-nav">
                    <Tabs class="nse-note-panel-content-tabs" size="small" v-model:activeKey="activeTab">
                        <TabPane :key=TAB_KEY_PREVIEW tab="预览"/>
                        <TabPane :key=TAB_KEY_EDITOR tab="编辑"/>
                    </Tabs>
                    <div class="nse-note-panel-content-tools">
                        <PictureOutlined />
                    </div>
                </div>
                <div class="nse-note-panel-content-editor">
                    <Markdown v-show="activeTab===TAB_KEY_PREVIEW" class="markdown-body" langPrefix="xxxk" :source="noteData.markdown"></Markdown>
                    <TextArea v-show="activeTab===TAB_KEY_EDITOR" class="nse-note-panel-content-editor-input" :autoSize="{ minRows: 34, maxRows: 34 }" type="textarea" v-model:value="noteData.markdown"></TextArea>
                </div>
            </div>
            <NoteList :currentNoteData="noteData" v-model:isNoteListVisible="isNoteListVisible" @item-click="onNoteItemClick"></NoteList>
        </div>
    </div>
</template>

<script setup lang="ts">
import {watch} from 'vue'
import { sendMessage } from 'webext-bridge';
import {Tabs, Input, Select as ASelect} from 'ant-design-vue'
import { MenuUnfoldOutlined, PictureOutlined, PlusOutlined} from '@ant-design/icons-vue';
import Markdown from 'vue3-markdown-it';
import Tooltip from '~/components/Tooltip.vue'
import {GET_PANEL_WIDTH, SET_PANEL_WIDTH, SYNC_NOTE_DATA, CREATE_NEW_NOTE, LATELY_NOTE_DATA, GET_ITEM_NOTE_DATA, LIST_TAGS_DATA } from '~/constant'
import useStopDomEvent from '~/hook/useStopDomEvent';
import DragButton from '../modules/drag-button.vue'
import IconCloud from '../modules/icon-cloud.vue'
import NoteList from './note-list.vue'
import TagsManage from '../modules/tags-manage.vue'

const TabPane = Tabs.TabPane
const TextArea = Input.TextArea

const refNotePanel = ref(undefined);
const panelWidth = ref(0);
// const panelWidth = ref(400);
const isNoteListVisible = ref<boolean>(false)

const MAX_PANEL_WIDTH = 500;
const MIN_PANEL_WIDTH = 300;

const TAB_KEY_PREVIEW = '1'
const TAB_KEY_EDITOR = '2'

const activeTab = ref('1')

const uploadDate = ref('')

const noteData = ref<INotePanelData>({
    objectId: '',
    title: "",
    tag: "",
    markdown: '',
    createdAt: '',
    updatedAt: '',
})

const tagsOptions = ref([
    {
        value: '常用',
    },
])

// 获取最新一条数据
sendMessage(LATELY_NOTE_DATA, {}).then((data:any) => {
    if (data) {
        noteData.value = (data as INotePanelData)
        uploadDate.value = (data as INotePanelData).updatedAt
    }
})

watch(noteData, (val) => {
    // 更新数据
    sendMessage(SYNC_NOTE_DATA, val).then((res: any) => {
        uploadDate.value = res.updatedAt
    })
}, {deep: true})

useStopDomEvent(refNotePanel, 'mouseup');

const changeBodyWidth = (width: number) => {
    if (width > MAX_PANEL_WIDTH) {
        width = MAX_PANEL_WIDTH
    }
    document.body.setAttribute('style', `width: calc(100% - ${width}px);`);
    panelWidth.value = width
    sendMessage(SET_PANEL_WIDTH, {panelWidth: width})
}

const onDrag = (width: number) => {
    changeBodyWidth(width)
}

const onBtnclick = (flage: string) => {
    if (flage === 'open') {
        sendMessage(GET_PANEL_WIDTH, {}).then((width:any) => {
            if (width > 50) {
                changeBodyWidth(width)
            } else {
                changeBodyWidth(MIN_PANEL_WIDTH)
            }
        })
    }
    if (flage === 'close') {
        changeBodyWidth(0)
    }
}

const onNoteItemClick = (item: INotePanelData) => {
    sendMessage(GET_ITEM_NOTE_DATA, {objectId: item.objectId}).then((data:any) => {
    if (data) {
        noteData.value = (data as INotePanelData)
        isNoteListVisible.value = false
    }
})
}

// 空行误删
const updateNote = (data: {markdown: string}) => {
    noteData.value.markdown = `${noteData.value.markdown}

${data.markdown}`
}

const createNewNoteClick = () => {
    sendMessage(CREATE_NEW_NOTE, {}).then((res: any) => {
        if (res.objectId) {
            noteData.value = res;
        }
    })
}

const tagsDropdownVisibleChange = (visible: boolean) => {
    if (!visible) {
        return
    }
    sendMessage(LIST_TAGS_DATA, {page: 1, size: 100}).then((data:any) => {
        if (data) {
            tagsOptions.value = [{value: '常用'}, ...(data as ITagList).data]
        }
    })
}

defineExpose({
    updateNote
})

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

    .note-sync-antdv-input {
        height: 100%;
        padding: 0;
        font-size: 16px;
        border-color: transparent;
        resize: none;
        -webkit-box-shadow: 0 0 0 0 transparent;
        box-shadow: 0 0 0 2 transparent;
        background: #f3f3f3;
    }

    &-drag-button{
        position: absolute;
        top: 0;
        left: -8px;
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

        .anticon {
            margin-left: 10px;
            font-size: 18px;
        }
    }
    &-header-right {
        display: flex;
        justify-items: center;
        justify-content: flex-end;
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
        &-tag-select{
            width: 140px;
            margin-right: -10px;
            color: #1890ff;
            border: none;
            box-shadow: rgb(154 154 154) -10px 0px 10px -10px;

            .note-sync-antdv-select-selector {
                background: none !important;
                border: none !important;
            }
        }
        &-tools-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            background: #ffffff;
            border-bottom: 1px solid rgb(236, 236, 236);
        }
        &-tabs {
            .note-sync-antdv-tabs-nav{
                margin: 0;
            }
        }
        &-tools{
            font-size: 16px;
        }
        &-editor {
            height: calc(100vh - @header-height*2 - 45px);
            overflow: auto;
            background: #ffffff;
            .markdown-body {
                padding: 10px;
            }
            &-input {
                height: calc(100vh - 100px);
                width: 100%;
                padding: 10px 0 10px 10px !important;
                resize: none;
                border-color: transparent;
                outline: 0;
                -webkit-box-shadow: 0 0 0 0 transparent;
                box-shadow: 0 0 0 2 transparent;
                background: #f3f3f3;
            }
        }
    }
}
</style>