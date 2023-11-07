import { isBoolean, isUndefined } from '@daysnap/utils'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export interface UseKeepAliveState {
  name: string
  position: number
  mode: 'auto' | 'custom'
}
export type UseKeepAliveOptions = Partial<Omit<UseKeepAliveState, 'position'>> | boolean

const keepAliveList = ref<UseKeepAliveState[]>()
// fix 解决 transform keep-alive bug 问题
// 二级keepalive 动画会有问题，这个延时需要根据动画时间来
const includes = ref<string[]>([])
const getHistoryState = () => history.state ?? {}

export function useKeepAlive(options?: UseKeepAliveOptions) {
  if (isUndefined(keepAliveList.value)) {
    keepAliveList.value = []

    const route = useRoute()
    watch(
      () => ({ ...route }),
      (_, from) => {
        const { position, replaced, scroll } = getHistoryState()

        keepAliveList.value = (keepAliveList.value ?? []).filter((item) => {
          const { mode, name } = item
          if (mode === 'custom') {
            return true
          }
          if (replaced && scroll === false) {
            return position > item.position
          }
          return position >= item.position
        })
      },
    )

    watch(
      () => keepAliveList.value,
      (nv, ov) => {
        if (JSON.stringify(nv) !== JSON.stringify(ov)) {
          includes.value = keepAliveList.value?.map((item) => item.name) ?? []
          console.log('监听 => ', includes.value.join(' '))
        }
      },
      {
        immediate: true,
      },
    )
  }

  if (!isBoolean(options)) {
    const { meta, ...rest } = useRoute()
    const { name, mode } = Object.assign({ mode: 'auto' } as const, rest, meta, options)
    const { position = 0 } = getHistoryState()
    if (name) {
      keepAliveList.value = [
        ...(keepAliveList.value ?? []).filter((item) => item.name !== name),
        { position, name, mode },
      ]
    }
  }

  return {
    keepAliveList,
    includes,
  }
}

export const useKeepAliveByPosition = useKeepAlive
