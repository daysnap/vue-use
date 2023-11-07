import { isNumber, isUndefined } from '@daysnap/utils'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export interface UseKeepAliveState {
  name: string
  position: number
  mode: 'auto' | 'custom'
  relations?: string[] // 关联的路由 如果是一个路由有子路由 则需要关联下子路由name
}
export type UseKeepAliveOptions = Partial<Omit<UseKeepAliveState, 'position'>> | number

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
      (to, from) => {
        const { position, replaced, scroll } = getHistoryState()

        keepAliveList.value = (keepAliveList.value ?? []).filter((item) => {
          const { mode, relations } = item
          // 自定义
          if (mode === 'custom') {
            return true
          }

          // replace
          if (replaced && scroll === false) {
            // 有关联的 route
            if (relations?.length) {
              const formName = from.name as string
              if (relations.includes(formName)) {
                const toName = to.name as string
                return relations.includes(toName)
              }
            }
            return position > item.position
          }
          return position >= item.position
        })
      },
    )

    const ms = isNumber(options) ? options : 0
    console.log('ms111 => ', ms, options, isNumber(options))

    watch(
      () => keepAliveList.value,
      (nv, ov) => {
        if (JSON.stringify(nv) !== JSON.stringify(ov)) {
          console.log('11 => ', ms, options)
          setTimeout(() => {
            console.log('22 => ', ms, options)
            includes.value = keepAliveList.value?.map((item) => item.name) ?? []
          }, ms)
        }
      },
      {
        immediate: true,
      },
    )
  }

  if (!isNumber(options)) {
    const { meta, ...rest } = useRoute()
    const { name, mode, relations } = Object.assign({ mode: 'auto' } as const, rest, meta, options)
    const { position = 0 } = getHistoryState()
    if (name) {
      keepAliveList.value = [
        ...(keepAliveList.value ?? []).filter((item) => item.name !== name),
        { position, name, mode, relations },
      ]
    }
  }

  return {
    keepAliveList,
    includes,
  }
}

export const useKeepAliveByPosition = useKeepAlive
