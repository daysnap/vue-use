import { useRouter } from 'vue-router'

interface TransferOptions {
  disabled?: boolean
  replace?: boolean
  query?: Record<string, any>
  params?: Record<string, any>
  path?: string
  fn?(options: TransferOptions, ...args: any[]): void
  [prop: string]: any
}

export function useTransfer() {
  const router = useRouter()
  return async (options: TransferOptions = {}, ...args: any[]) => {
    const { disabled, path, replace = false, fn, query, ...rest } = options

    if (disabled) {
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
