import { ref } from 'vue'

export function useCountDown(start?: number) {
  const countRef = ref(0)
  let timer: any = null

  const trigger = (st?: number) => {
    clearTimeout(timer)

    let loop: any
    ;(loop = (count: number) => {
      countRef.value = count
      if (count <= 0) {
        countRef.value = 0
        return
      }
      count--
      timer = setTimeout(loop, 1000, count)
    })(st ?? start ?? 60)
  }

  return [countRef, trigger] as const
}
