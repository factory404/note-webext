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
          <NotePanel ref="refNotePanel"></NotePanel>
      </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import NotePanel from './components/note-panel/index.vue';
import SelectButton from './components/select-button.vue';
import useMouseUp from '~/hook/useMouseUp';

const refNotePanel = ref()
const isSelect = ref(false);
const { cancleSelect, isMouseUp, selectPosition, selectText, selectTextContext, selectMarkDown } = useMouseUp();
console.log(selectTextContext);
console.log('==refNotePanel==',refNotePanel);


watch(selectText, (val, oldVal) => {
  console.log('===selectMarkDown=====');
  console.log(selectMarkDown.value);

  if (!val) {
      isSelect.value = false;
  }
});

const onSelect = () => {
  isSelect.value = true;
  refNotePanel.value.updateNote({markdown: selectMarkDown.value})

};
</script>

<style lang="less">
.nse-box-content {

}
</style>
>