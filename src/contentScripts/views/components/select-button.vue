<template>
    <div class="nse-select-button" :style="{left: selectPosition.buttonX, top: selectPosition.buttonY}" @click.stop="onSelect">
        <img class="nse-select-button-img" src="https://img2.baidu.com/it/u=228183758,2291369226&fm=253&fmt=auto&app=138&f=PNG?w=50&h=50" alt="">
    </div>
</template>

<script setup lang="ts">

defineProps({
  selectPosition: {type: Object, default: () => {
      return {
            buttonX: '',
            buttonY: '',
            maxHeight: '',
            panelX: '',
            panelY: '',
            isTop: false,
      }
  }}
})

const emit = defineEmits(['select'])


const onSelect = () => {
    emit('select')
}

</script>

<style lang="less">
.nse-select-button{
    position: absolute;
    z-index: 999999;
    &-img{
        width: 40px;
        height: 40px;
    }
}
</style>
