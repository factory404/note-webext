<template>
    <div class="nse-note-list" :class="props.isNoteListVisible ? 'nse-note-list-active' : ''" @click="onClose">
        <div class="nse-note-list-content" :class="props.isNoteListVisible ? 'nse-note-list-content-active' : ''" @click.stop="() => {}">
            <div class="nse-note-list-content-title">
                <MenuFoldOutlined @click="onClose"></MenuFoldOutlined>
            </div>
            <Tabs class="nse-note-list-tabs" size="small" v-model:activeKey="activeTab">
                <TabPane :key=TAB_KEY_NOTE_TYPE.LATELY tab="最近"/>
                <TabPane :key=TAB_KEY_NOTE_TYPE.OFTEN tab="常用"/>
                <TabPane :key=TAB_KEY_NOTE_TYPE.ALL tab="全部"/>
            </Tabs>
            <div class="nse-note-list-content-list-item">
                <div v-for="(item, index) in noteList.data" :key="index" 
                class="nse-note-list-content-item" 
                :class="item.objectId === (props.currentNoteData && props.currentNoteData.objectId) ? 'nse-note-list-content-item-current' : ''"
                @click="itemClick(item)">
                    <div class="nse-note-list-content-item-wrap">
                        <div class="nse-note-list-content-item-title">{{item.title}}</div>
                        <div class="nse-note-list-content-item-tag" v-show="item.tag">{{item.tag}}</div>
                    </div>
                    <div class="nse-note-list-content-item-wrap">
                        <div class="nse-note-list-content-item-create-at">{{item.createdAt}}</div>
                        <DeleteOutlined class="nse-note-list-content-item-del-icon" @click.stop="itemDelClick(item)"/>
                    </div>
                </div>
            </div>
            <Pagination class="nse-note-list-content-list-item-pagination" v-model:current="noteList.page" :total="noteList.total" @change="onPaginationChange"></Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import {watch} from 'vue'
import { sendMessage } from 'webext-bridge';
import { MenuFoldOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { Tabs, Pagination } from 'ant-design-vue'
import { LIST_NOTE_DATA, DEL_ITEM_NOTE_DATA } from '~/constant';

const TabPane = Tabs.TabPane

const props = defineProps<{
    currentNoteData: INotePanelData
    isNoteListVisible?: boolean
}>()

const emit = defineEmits(['update:isNoteListVisible', 'itemClick'])

watch(() => props.isNoteListVisible, (visible) => {
    if (visible) {
        getNoteList({page: 1, size: 10})
    }
})

const noteList = ref<INoteList>({
    total: 0,
    page: 1,
    size: 0,
    data: []
}) 

const TAB_KEY_NOTE_TYPE = {
    LATELY: 'LATELY',
    OFTEN: 'OFTEN',
    ALL: 'ALL'
}

const activeTab = ref(TAB_KEY_NOTE_TYPE.LATELY)

const getNoteList = (data: {page: number, size: number}) => {
    sendMessage(LIST_NOTE_DATA, data).then((data:any) => {
        if (data) {
            noteList.value = (data as INoteList)
        }
    })
}

getNoteList({page: 1, size: 10})

const onPaginationChange = (page: number) => {
    getNoteList({page, size: 10})
}

const onClose = () => {
    console.log('1111111');
    
    emit('update:isNoteListVisible', false)
}

const itemClick = (item: INotePanelData) => {
    emit('itemClick', item)
}

const itemDelClick = (item: INotePanelData) => {
    sendMessage(DEL_ITEM_NOTE_DATA, {objectId: item.objectId}).then((data:any) => {
        if (data) {
            getNoteList({page: 1, size: 10})
        }
    })
}

</script>

<style lang="less">
.nse-note-list{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    overflow: hidden;
    background: rgba(0,0,0,0.4);
    &-active {
        width: 100%;
    }

    &-tabs {
        padding: 10px 20px;
    }

    &-content {
        position: relative;
        top: 0;
        left: -80%;
        height: 100%;
        width: 80%;
        background: #ffff;
        transition: left 0.4s ease-in-out;

        &-active {
            left: 0;
            transition: left 0.4s ease-in-out;
        }
    }
    &-content-title {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 16px;
        padding: 8px;
    }
    &-content-list-item {
        position: relative;
        top: 0;
        left: 0;
        height: calc(100vh - 100px);
        padding: 10px 20px;
        overflow: auto;
        border-bottom: 1px solid #efefef;
        &-pagination{
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 20px;
            text-align: right;
        }
    }
    &-content-item{
        padding: 10px;
        border-bottom: 1px solid #efefef;
        cursor: pointer;
        &:hover {
            background: rgb(242, 242, 242);
        }
        &:last-child{
            border-bottom: 1px solid transparent;
        }
        &-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &-title {
            font-size: 16px;
            font-weight: 500;
        }
        &-tag {
            font-size: 12px;
            padding: 2px 4px;
            border-radius: 2px 4px;
            background: #e9e9e9;
        }
        &-create-at {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;
        }
        &-del-icon{
            margin-top: 5px;
            font-weight: 400;
            color: #9a9a9a;

            :hover {
                color: #1890ff;
            }
        }
    }
    &-content-item-current {
        background: rgb(242, 242, 242);
    }
}
</style>