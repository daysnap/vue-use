## useTransfer

> useTransfer()

```ts
interface TransferOptions {
  disabled?: boolean
  replace?: boolean
  query?: Record<string, any>
  params?: Record<string, any>
  path?: string
  fn?(options: TransferOptions, ...args: any[]): void
  [prop: string]: any
}
useTransfer(): () => (options: useTransfer) => Promise<void>
```

### 功能描述

点击事件处理中心，用于分发事件点击。

### 示例代码

<demo></demo>

<script lang="ts" setup>
  import Demo from './demo.vue'
</script>
