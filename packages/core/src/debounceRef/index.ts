import { customRef } from 'vue'

export function debounceRef<T = any>(value: T, ms = 0) {
  let timer: number
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(val) {
        window.clearTimeout(timer)
        timer = window.setTimeout(() => {
          trigger()
          value = val
        }, ms)
      },
    }
  })
}
