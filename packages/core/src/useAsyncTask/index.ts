import { isFunction } from '@daysnap/utils'
import type { AnyPromiseFn } from '@daysnap/types'
import { onActivated, onBeforeMount, ref, type Ref } from 'vue'

export interface UseAsyncTaskOptions<T extends AnyPromiseFn> {
  /**
   * 是否立即执行 onBeforeMount 执行，默认 false
   */
  immediate?: boolean

  /**
   * 是否在 onActivated 执行，默认 false
   */
  activated?: boolean

  /**
   * 立即执行的时候 第一次需要传递的参数
   */
  immediateParams?: Parameters<T> | (() => Parameters<T>)

  /**
   * 初始数据
   */
  initialValue?: Awaited<ReturnType<T>>

  /**
   * 捕获了异常，是否继续抛出，默认 false
   */
  throwError?: boolean | (() => boolean)

  /**
   * 错误回调，返回 false 或者 undefined 的时候，阻断默认错误 error 逻辑
   */
  onError?: (err: unknown) => boolean | undefined | Promise<boolean | undefined>
}

/**
 * 异步任务执行
 */
export function useAsyncTask<T extends AnyPromiseFn>(task: T, options?: UseAsyncTaskOptions<T>) {
  const { initialValue, immediate, activated, throwError, onError, immediateParams } = options ?? {}

  const data = ref(initialValue) as Ref<Awaited<ReturnType<T>>>
  const error = ref<unknown>()
  const loading = ref(false)

  const trigger = (async (...args: unknown[]) => {
    try {
      error.value = undefined
      loading.value = true
      data.value = await task(...args)
      return data.value
    } catch (err) {
      if ((await onError?.(err)) ?? true) {
        error.value = err
        const isThrow = isFunction(throwError) ? throwError() : throwError
        if (isThrow) {
          throw err
        }
      }
    } finally {
      loading.value = false
    }
  }) as T

  onBeforeMount(async () => {
    if (immediate) {
      const args = isFunction(immediateParams) ? immediateParams() : immediateParams ?? []
      await trigger(...(args as any))
    }
  })

  onActivated(async () => {
    if (activated) {
      const args = isFunction(immediateParams) ? immediateParams() : immediateParams ?? []
      await trigger(...(args as any))
    }
  })

  return {
    data,
    error,
    loading,
    trigger,
  }
}
