import { customRef } from 'vue'

export function debounceRef<T = any>(value: T, ms = 0) {
  let timer: any
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(val) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          trigger()
          value = val
        }, ms)
      },
    }
  })
}
