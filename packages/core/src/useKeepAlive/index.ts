import { isNumber, isUndefined } from '@daysnap/utils'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export interface UseKeepAliveState {
  /**
   * Route name 和 Component name 要保证一致，不然缓存会失败
   */
  name: string

  /**
   * vue-router history.state.position
   * https://router.vuejs.org/zh/api/interfaces/RouterHistory.html#Properties-state
   */
  position: number

  /**
   * 模式，如果是 auto 则自动会管理，如果设置的是 custom 则需要手动管理
   */
  mode: 'auto' | 'custom'

  /**
   * 关联的路由 如果是一个路由有子路由 则需要关联下子路由name
   */
  relations?: string[]
}
export type UseKeepAliveOptions = Partial<Omit<UseKeepAliveState, 'position'>> | number

const keepAliveList = ref<UseKeepAliveState[]>()
// fix 解决 transform keep-alive bug 问题
// 二级keepalive 动画会有问题，这个延时需要根据动画时间来
const includes = ref<string[]>([])
const getHistoryState = () => history.state ?? {}

/**
 * 结合 KeepAlive 组件，维护其 includes
 */
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
    watch(
      () => keepAliveList.value,
      (nv, ov) => {
        if (JSON.stringify(nv) !== JSON.stringify(ov)) {
          setTimeout(() => {
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
