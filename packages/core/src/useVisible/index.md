# useVisible

### 功能描述

> useVisible(options: UseVisibleOptions = {})

基于 `promise` 是否展示显示区域，保证逻辑流程不被事件中断，多配合弹窗使用。

### 示例代码

<demo></demo>

<script lang="ts" setup>
  import Demo from './demo.vue'
</script>

```ts
<template>
  <div style="margin: 32px">
    <van-button block type="primary" @click="handleOpen">打开密码箱</van-button>
  </div>
  <template v-if="visible">
    <van-cell-group>
      <van-cell>
        <van-field v-model="password" placeholder="请输入密码"></van-field>
      </van-cell>
    </van-cell-group>
    <div style="margin: 32px">
      <van-button block type="primary" @click="confirm(password)">确认密码</van-button>
      <br />
      <van-button block @click="hide()">取消</van-button>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { showToast } from 'vant'
  import { useVisible } from '.'

  const password = ref()
  const { visible, show, confirm, hide } = useVisible({
    confirmCallback: (password) => password,
  })

  const handleOpen = async () => {
    const password = await show({
      beforeClose: (type, res) => {
        if (type === 'confirm') {
          if (res !== '123') {
            showToast('密码输入不正确')
            return false
          }
        }
        return true
      },
    })
    showToast(`密码输入成功${password}`)
  }
</script>
```
