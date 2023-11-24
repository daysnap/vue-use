import { useRouter, type RouteLocationRaw } from 'vue-router'

export interface TransferOptions {
  /**
   * 是否中转
   */
  disabled?: boolean

  /**
   * 路由配置 推荐使用 [to]
   */
  replace?: boolean
  query?: Record<string, any>
  params?: Record<string, any>
  path?: string

  /**
   * 路由配置
   */
  to?: RouteLocationRaw

  /**
   * 函数执行
   */
  fn?(options: TransferOptions, ...args: any[]): void | Promise<void>
  [prop: string]: any
}

export function useTransfer() {
  const router = useRouter()
  return async (options: TransferOptions = {}, ...args: any[]) => {
    const { disabled, path, replace = false, fn, query, to, ...rest } = options

    if (disabled) {
      return
    }

    if (to) {
      router.push(to)
      return
    }

    if (path) {
      if (!query) {
        rest.query = { ...options }
      }
      router.push({ path, replace, ...rest })
      return
    }

    if (fn) {
      await fn(options, ...args)
      return
    }
  }
}
