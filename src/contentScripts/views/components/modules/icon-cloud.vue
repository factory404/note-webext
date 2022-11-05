<template>
    <Tooltip class="nse-icon-cloud" :class="isAction ? 'nse-icon-cloud-active' : ''">
        <template #title>
            {{props.uploadDate}}
        </template>
        <CloudUploadOutlined class=""/>
    </Tooltip>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Tooltip from '~/components/Tooltip.vue'
import { CloudUploadOutlined} from '@ant-design/icons-vue';

const props = defineProps({
    uploadDate: {
        type: String
    }
})

const isAction = ref(false)

watch(() => props.uploadDate, (val) => {
    console.log('111111');
    
    isAction.value = true
    setTimeout(() => {
        isAction.value = false
    }, 2400)

})
 
</script>

<style lang="less">
.nse-icon-cloud {
    &-active {
        color:  #000;
        animation: iconcloudupload 0.8s infinite;
        -webkit-animation: iconcloudupload 0.8s infinite; /*Safari and Chrome*/
    }
}

@keyframes iconcloudupload {
  50%  {color: #1890ff;}
  100% {color: #000;}
}

</style>