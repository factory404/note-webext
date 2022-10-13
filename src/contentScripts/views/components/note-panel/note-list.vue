<template>
    <div class="nse-note-list" :class="props.isNoteListVisible ? 'nse-note-list-active' : ''">
        <div class="nse-note-list-content" :class="props.isNoteListVisible ? 'nse-note-list-content-active' : ''">
            <div class="nse-note-list-content-title">
                <MenuFoldOutlined @click="onClose"></MenuFoldOutlined>
            </div>
            <div class="nse-note-list-content-list-item">
                <div v-for="(item, index) in noteList.data" :key="index" class="nse-note-list-content-item">
                    <div class="nse-note-list-content-item-title">{{item.title}}</div>
                    <div class="nse-note-list-content-item-create-at">{{item.createdAt}}</div>
                </div>
            </div>
            <Pagination class="nse-note-list-content-list-item-pagination" v-model:current="noteList.page" :total="noteList.total" @change="onPaginationChange"></Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sendMessage } from 'webext-bridge';
import { MenuFoldOutlined } from '@ant-design/icons-vue';
import { Pagination } from 'ant-design-vue'
import { LIST_NOTE_DATA } from '~/constant';

const props = defineProps({
    isNoteListVisible: {
        type: Boolean
    }
})
const emit = defineEmits(['update:isNoteListVisible'])

const noteList = ref<INoteList>({
    total: 0,
    page: 1,
    size: 0,
    data: []
}) 

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
    emit('update:isNoteListVisible', false)
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
        padding: 10px;
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
            background: rgb(249, 249, 249);
        }
        &:last-child{
            border-bottom: 1px solid transparent;
        }
        &-title {
            font-size: 16px;
            font-weight: 500;
        }
        &-create-at {
            font-size: 14px;
            text-align: right;
        }
    }
}
</style>