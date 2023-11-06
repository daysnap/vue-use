import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { isUndefined, isBoolean } from '@daysnap/utils'

interface UseKeepAliveState {
  name: string
  position: number
  mode: 'auto' | 'custom'
}

type UseKeepAliveByPositionOptions = Partial<Omit<UseKeepAliveState, 'position'>> | boolean

const keepAliveList = ref<UseKeepAliveState[]>()

const setState = (state: UseKeepAliveState[], ms = 0) => {
  // fix 解决 vite 热更新触发多次更新
  if (JSON.stringify(state) !== JSON.stringify(keepAliveList.value)) {
    // fix 解决 transform keep-alive bug 问题

    setTimeout(() => (keepAliveList.value = state), ms)
  }
}

const keep = (data: UseKeepAliveState) => {
  const { name } = data

  const list = [...(keepAliveList.value ?? []).filter((item) => item.name !== name), data]

  setState(list)
}

const includes = computed(() => keepAliveList.value!.map((item) => item.name))

const getState = () => history.state ?? {}

export function useKeepAliveByPosition(options?: UseKeepAliveByPositionOptions) {
  if (isUndefined(keepAliveList.value)) {
    keepAliveList.value = []

    const route = useRoute()
    watch(
      () => ({ ...route }),
      (_, from) => {
        const { position, replaced } = getState()
        const list = (keepAliveList.value ?? []).filter((item) => {
          const { mode, name } = item
          if (mode === 'custom') {
            return true
          }
          if (replaced && from.name === name) {
            return false
          }
          return position >= item.position
        })

        setState(list, 300)
      },
    )
  }

  if (!isBoolean(options)) {
    const { meta, ...rest } = useRoute()
    const { name, mode } = Object.assign({ mode: 'auto' } as const, rest, meta, options)
    const { position = 0 } = getState()
    if (name) {
      keep({ position, name: name as any, mode })
    }
  }

  return {
    keepAliveList,
    includes,
    keep,
  }
}
