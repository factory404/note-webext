<template>
  <main class="note-sync-popup">
    <h1 class="note-sync-popup-title">简易笔记登录</h1>
    <div class="note-sync-popup-form">
      <div class="note-sync-popup-form-item">
        <input placeholder="请输入手机号" :maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')" v-model="formData.phone"/>
        <div class="note-sync-popup-form-item-validate-msg">{{validateMsg.phone}}</div>
      </div>
      <div class="note-sync-popup-form-item">
        <div class="note-sync-popup-form-item-code">
          <input placeholder="请输入验证码" :maxlength="6" oninput = "value=value.replace(/[^\d]/g,'')" v-model="formData.smsCode"/>
          <button :disabled="countDownNum !== 60" class="note-sync-popup-form-item-code-num" @click="onCodeClick">{{countDownNum !== 60 ? countDownNum +'秒后获取' : '获取验证码'}}</button>
        </div>
        <div class="note-sync-popup-form-item-validate-msg">{{validateMsg.smsCode}}</div>
      </div>
    </div>
    <div class="note-sync-popup-login" :disabled="isLoginLoading"  @click="onLogin">
      <LoadingOutlined v-if="isLoginLoading" class="note-sync-popup-login-loading"/>
      登录</div>
  </main>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'

const formData = ref({
  phone: '15888444934',
  smsCode: ''
})
const validateMsg = ref({
  phone: '',
  smsCode: ''
})
const countDownNum = ref(60)
const isLoginLoading = ref(false)

let countDownNumInterval: any = null

watch(() => formData.value.phone, () => {
  validateMsg.value.phone = ''
})

watch(() => formData.value.smsCode, () => {
  validateMsg.value.smsCode = ''
})

const validate = (key?: string) => {
  if (!formData.value.phone) {
    validateMsg.value.phone = '请填写手机号'
    return 
  }
  const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!phoneReg.test(formData.value.phone)) {
    validateMsg.value.phone = '请填写正确的手机号'
    return 
  }
  if (key === 'CODE') {
    return true
  }
  if (!formData.value.smsCode) {
    validateMsg.value.smsCode = '请填写验证码'
    return 
  }
  const codeReg = /^\d{6}$/
  if (!codeReg.test(formData.value.smsCode)) {
    validateMsg.value.smsCode = '请填写正确的验证码'
    return 
  }
  return true
}

const countDown = () => {
  countDownNum.value = 59
  countDownNumInterval = setInterval(() => {
    countDownNum.value = countDownNum.value - 1
    if (countDownNum.value <= 0) {
      clearInterval(countDownNumInterval)
      countDownNum.value = 60
    }
  }, 1000)
}

const onCodeClick = () => {
  if (countDownNum.value !== 60) {
    return
  }
  if (!validate('CODE')) {
    return
  }
  // ....
  countDown()
}

const onLogin = () => {
  if (!validate()) {
    return
  }
  isLoginLoading.value = true
}
</script>

<style lang="less">
.note-sync-popup {
  width: 300px;
  padding: 0 40px 40px;
  font-size: 14px;
  &-title {
    padding: 20px 0;
    font-size: 20px;
    text-align: center;
  }
  &-form {
    input {
      width: 100%;
      outline-style: none;
      border: 1px solid #ccc; 
      border-radius: 3px;
      padding: 4px;
      outline-style: none;
    }
    &-item-validate-msg {
      height: 25px;
      padding: 0 4px;
      color: red;
    }
    &-item-code {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-item-code-num{
      flex-shrink: 0;
      width: 80px;
      margin-left: 2px;
      padding: 6px;
      font-size: 12px;
      text-align: center;
      color:  #fff;
      background: #1890ff;
      cursor: pointer;

      &[disabled]{
        background: #9acefe;
        cursor: not-allowed;
      }
    }
  }

  &-login {
    width: 100%;
    margin-top: 20px;
    padding: 4px;
    text-align: center;
    color: #fff;
    background: #1890ff;
    cursor: pointer;

    &[disabled=true]{
        background: #9acefe;
        cursor: not-allowed;
    }

    &-loading {
      margin-right: 5px;
    }
  }
}
</style>