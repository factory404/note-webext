<template>
    <div class="nse-note-panel-record" :class="isEditor ? 'nse-note-panel-record-editor' : ''">
        <div class="nse-note-panel-record-tools">
            <FormOutlined v-if="!isEditor" @click="editorClick"/>
            <FileDoneOutlined v-if="isEditor" @click="editorClick"/>
        </div>
        <div v-if="isEditor">
            <TextArea class="nse-note-panel-record-input" :autosize="{ minRows: 12, maxRows: 12 }" type="textarea" v-model:value="source"></TextArea>
        </div>
        <Markdown v-if="!isEditor" class="markdown-body" langPrefix="ddddkk" :source="source"></Markdown>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {FormOutlined, FileDoneOutlined} from '@ant-design/icons-vue'
import {Input} from 'ant-design-vue'
import Markdown from 'vue3-markdown-it';

const TextArea = Input.TextArea

const isEditor = ref(false)

const source = ref(`## Lists
Sometimes you want bullet points:

* Start a line with a star
* Profit!

## Tables
First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
`);

const editorClick = () => {
    console.log('===isEditor===', isEditor.value);
    isEditor.value = !isEditor.value
}
</script>

<style lang="less">
.nse-note-panel-record {
    position: relative;
    top: 0;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    background: #ffffff;
    border: 1px solid #ffffff;
    &-editor {
        // background: #f3f3f3;
    }
    &:hover {
        border: 1px solid rgb(91, 194, 170);
        cursor: pointer;
        .nse-note-panel-record-tools{
            display: block;
        }
    }
    &-tools {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
    }
    &-input {
        width: 100%;
        padding: 4px;
        resize: none;
        border-color: transparent;
        outline: 0;
        -webkit-box-shadow: 0 0 0 0 transparent;
        box-shadow: 0 0 0 2 transparent;
        background: #f3f3f3;
    }
}
</style>