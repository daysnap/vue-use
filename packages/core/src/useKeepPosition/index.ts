import { pick } from '@daysnap/utils'
import { onActivated, nextTick, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

interface UseKeepPositionOptions {
  getTarget?: () => HTMLElement
}

interface UseKeepPositionState {
  scrollLeft: number
  scrollTop: number
}

export function useKeepPosition(options?: UseKeepPositionOptions) {
  const { getTarget = () => document.documentElement } = options ?? {}
  const state = ref<UseKeepPositionState>()
  // 保存位置
  const keep = () => {
    const target = getTarget()
    if (target) {
      state.value = pick(target, ['scrollTop', 'scrollLeft'])
    }
  }

  // 恢复
  const restore = () => {
    nextTick(() => {
      const target = getTarget()
      if (target) {
        const { scrollLeft = 0, scrollTop = 0 } = state.value ?? {}
        state.value = undefined
        const setScroll = () => {
          target.scrollLeft = scrollLeft
          target.scrollTop = scrollTop
          console.log(target.scrollTop)
        }
        setScroll()
      }
    })
  }

  // 保存位置
  onBeforeRouteLeave(() => keep())

  // 恢复位置
  onActivated(() => restore())

  return { keep, restore }
}
