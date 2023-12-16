## useCountDown

> useCountdown(start?: number)

```ts
function useCountdown(start?: number): [Ref<number>, (start?: number) => void]
```

### 功能描述

倒计时，一般用于发送验证码60s倒计时。

### 示例代码

<demo></demo>

<script lang="ts" setup>
  import Demo from './demo.vue'
</script>

```js
<template>
  <van-button
    type="primary"
    style="width: 160px; margin: 0 auto"
    block
    :disabled="!!count"
    @click="handleCountDown()"
  >
    {{ count ? `${count} s` : '获取验证码' }}
  </van-button>
</template>

<script lang="ts" setup>
  import { Button as VanButton } from 'vant'
  import { useCountDown } from './index'

  const [count, handleCountDown] = useCountDown(10)
</script>
```
