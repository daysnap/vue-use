<template>
  <HorView>
    <br />
    <dl>
      <dt>设置</dt>
      <dd><br /></dd>
      <dd>
        <span>执行报错：</span>
        <br />
        <VanSwitch v-model="isError" />
      </dd>
      <dd>
        <span>是否继续抛出Error：</span>
        <br />
        <VanSwitch v-model="throwError" />
      </dd>
      <dd><br /></dd>
      <dt>请求结果:</dt>
      <dd><br /></dd>
      <dd v-if="loading">请求中...</dd>
      <dd v-else-if="error" style="color: rgb(200, 0, 0)">错误 => {{ error }}</dd>
      <dd v-else style="color: rgb(0, 200, 0)">成功 => {{ data }}</dd>
    </dl>
    <br />
    <VanButton @click="trigger()" :loading="loading">执行</VanButton>
  </HorView>
</template>

<script setup lang="ts">
  import { sleep } from '@daysnap/utils'
  import { useAsyncTask } from '@daysnap/vue-use'

  const throwError = ref(false)
  const isError = ref(false)
  const { data, error, loading, trigger } = useAsyncTask(
    async () => {
      await sleep(1000)
      if (isError.value) {
        throw new Error('请求报错')
      }
      return Date.now()
    },
    {
      initialValue: 1,
      immediate: true,
      throwError: () => throwError.value,
    },
  )
</script>
