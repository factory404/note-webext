<template>
  <ConfigProvider prefixCls="note-sync-antdv">
      <div class="nse-box-content">
          <SelectButton
              v-show="isMouseUp && !isSelect"
              :isMouseUp="isMouseUp"
              :selectPosition="selectPosition"
              :cancleSelect="cancleSelect"
              @select="onSelect"
          ></SelectButton>
          <NotePanel></NotePanel>
      </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import NotePanel from './components/note-panel/index.vue';
import SelectButton from './components/select-button.vue';
import useMouseUp from '~/hook/useMouseUp';

const isSelect = ref(false);
const { cancleSelect, isMouseUp, selectPosition, selectText, selectTextContext, selectMarkDown } = useMouseUp();
console.log(selectTextContext);

watch(selectText, (val, oldVal) => {
  console.log('===selectMarkDown=====');
  console.log(selectMarkDown.value);

  if (!val) {
      isSelect.value = false;
  }
});

const onSelect = () => {
  isSelect.value = true;
};
</script>

<style lang="less">
.nse-box-content {

}
</style>
>