<template>
    <div class="nse-drawer">
        <span class="nse-drawer-icon"><slot name="icon"></slot></span>
        <div class="nse-drawer-content">
            <div>
                <MenuFoldOutlined/>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined } from '@ant-design/icons-vue';


</script>

<style lang="less">
.nse-drawer{
    position: relative;
    top: 0;
    left: 0;
    &-content {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
        width: 300px;
        height: 100vh;
        border: 1px solid red;
    }
}
</style>