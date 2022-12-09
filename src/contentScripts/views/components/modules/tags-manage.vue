<template>
    <div class="nse-tags-manage" ref="refTagsManage">
        <Popover :getPopupContainer="() => props.parentRef" placement="bottomRight" trigger="click">
            <template #title>
                <span>标签管理</span>
            </template>
            <template #content>
                <InputGroup>
                    <Input size="small" style="width: 160px;height:24px;font-size: 16px;"></Input>
                    <Button type="primary" size='small'>添加</Button>
                </InputGroup>
                <div :style="styles.content">
                    <div :style="styles.contentItem">
                        <span>xxxxxx</span>
                        <CloseOutlined style="cursor: pointer;"/>
                    </div>
                    <div :style="styles.contentItem">
                        <span>xxxxxxd</span>
                        <CloseOutlined />
                    </div>
                </div>
            </template>
            <TagOutlined />
        </Popover>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Popover, Input, Button } from 'ant-design-vue'
import { TagOutlined, CloseOutlined} from '@ant-design/icons-vue';

const InputGroup = Input.Group

const props = defineProps<{
    parentRef: any
}>()


const styles = {
    content: `
    height: 200px;
    overflow: hidden;
    margin-top: 10px;
    `,
    contentItem: `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    padding: 4px;
    font-size: 16px;
    border: 1px solid rgb(236, 236, 236);
    `
}
</script>

<style>
.nse-tags-manage {
   border: 1px solid red;
   height: 300px;
   overflow: hidden;
}
 
.nse-tags-manage-content {
    margin-top: 10px;
    border: 1px solid rgb(236, 236, 236);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    cursor: pointer;
}
</style>