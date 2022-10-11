<template>
    <div class="nse-note-list" :class="props.isNoteListVisible ? 'nse-note-list-active' : ''">
        <div class="nse-note-list-content" :class="props.isNoteListVisible ? 'nse-note-list-content-active' : ''">
            <div class="nse-note-list-content-title">
                <MenuFoldOutlined @click="onClose"></MenuFoldOutlined>
            </div>
            <div class="nse-note-list-content-item">
                33333333
                {{props.isNoteListVisible}}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined } from '@ant-design/icons-vue';

const props = defineProps({
    isNoteListVisible: {
        type: Boolean
    }
})
const emit = defineEmits(['update:isNoteListVisible'])

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
}
</style>