## useEventListener

> useEventListener(Object object)

```ts
type Options = {
  target?: EventTarget | Ref<EventTarget>
  capture?: boolean
  passive?: boolean
}

function useEventListener(type: string, listener: EventListener, options?: Options): void
```

### 功能描述

方便地进行事件绑定，在组件 mounted 和 activated 时绑定事件，unmounted 和 deactivated 时解绑事件。

### 示例代码

<demo></demo>

<script lang="ts" setup>
  import Demo from './demo.vue'
</script>

```js
// ...
```
