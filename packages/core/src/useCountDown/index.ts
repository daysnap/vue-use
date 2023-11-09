import { ref } from 'vue'

export function useCountDown(start: number = 60) {
  const countRef = ref(0)
  let timer: any

  const trigger = (st: number = start) => {
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
    })(st)
  }

  return [countRef, trigger] as const
}
