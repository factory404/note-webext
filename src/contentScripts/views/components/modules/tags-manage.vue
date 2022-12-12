<template>
    <div class="nse-tags-manage" ref="refTagsManage">
        <Popover :getPopupContainer="() => props.parentRef" placement="bottomRight" trigger="click">
            <template #title>
                <span>标签管理</span>
            </template>
            <template #content>
                <Spin :spinning="loading">
                    <InputGroup>
                        <Input size="small" style="width: 160px;height:24px;font-size: 16px;" v-model:value="valueTag"></Input>
                        <Button type="primary" size='small' @click="addTagClick">添加</Button>
                    </InputGroup>
                    <div class="nse-tags-manage-content">
                        <div class="nse-tags-manage-content-item" v-for="(item) in tagList.data" :key="item.objectId">
                            <span>{{item.value}}</span>
                            <CloseOutlined class="nse-tags-manage-content-close-icon" @click="itemDelClick(item)"/>
                        </div>
                    </div>
                </Spin>
            </template>
            <TagOutlined />
        </Popover>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { sendMessage } from 'webext-bridge';
import { Popover, Input, Button, Spin } from 'ant-design-vue'
import { TagOutlined, CloseOutlined} from '@ant-design/icons-vue';
import { DEL_TAG, SET_TAG, LIST_TAGS_DATA } from '~/constant';

const InputGroup = Input.Group

const props = defineProps<{
    parentRef: any
}>()

const valueTag = ref('')
const loading = ref(false)

const tagList = ref<ITagList>({
    total: 0,
    page: 1,
    size: 100,
    data: []
}) 

const getTagList = () => {
    return sendMessage(LIST_TAGS_DATA, {page: 1, size: 100}).then((data:any) => {
        if (data) {
            tagList.value = (data as ITagList)
        }
    })
}

// 初始化
getTagList()

const addTagClick = () => {
    const value = valueTag.value
    if (!value) {
        return
    }
    loading.value = true
    sendMessage(SET_TAG, {value}).then((data:any) => {
        if (data) {
            valueTag.value = ''
            return getTagList()
        }
    }).finally(() => {
        loading.value = false
    })
}


const itemDelClick = (item: ITag) => {
    loading.value = true
    sendMessage(DEL_TAG, {objectId: item.objectId}).then((data:any) => {
        if (data) {
           return getTagList()
        }
    }).finally(() => {
        loading.value = false
    })
}

</script>

<style lang="less">
.nse-tags-manage {
    &-content {
        height: 200px;
        overflow: hidden;
        margin-top: 10px;
        overflow: auto;
    }
    &-content-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2px;
        padding: 2px;
        font-size: 14px;
        border: 1px solid rgb(236, 236, 236);
    }
    &-close-icon{
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>