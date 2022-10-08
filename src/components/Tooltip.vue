<template>
    <div class="nse-tooltip">
        <span class="nse-tooltip-title"><slot name="title"></slot></span>
        <div class="nse-tooltip-slot"><slot></slot></div>
    </div>
</template>

<style lang="less">
.nse-tooltip{
    position: relative;
    top: 0;
    left: 0;
    font-size: 12px;
    &:hover {
        .nse-tooltip-title {
            display: block;
        }
    }
    &-title {
        display: none;
        position: absolute;
        top: -2px;
        left: -75px;
        padding: 2px 6px;
        border-radius: 3px;
        background: #fff;
        box-shadow: 0px 3px 6px 1px #f2f2f2;
        &::after {
            position: absolute;
            top: 0;
            right: -3px;
            bottom: 0;
            margin: auto;
            display: block;
            content: ' ';
            width: 8px;
            height: 8px;
            background: #fff;
            transform: rotate(45deg);
        }
    }
    &-slot {
        cursor: pointer;
    }
}
</style>