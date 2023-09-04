import { isFunction } from '@daysnap/utils'
import { ref, type Ref } from 'vue'

export type UseSetStateAction<S> = S | ((prevState?: S) => S)

export type UseSetState<T> = (value?: UseSetStateAction<T>) => void

export function useState<T>(initState?: T) {
  // https://github.com/vuejs/core/issues/2136
  const state = ref(initState) as Ref<T | undefined>

  const setState: UseSetState<T> = (value) => {
    state.value = isFunction(value) ? value(state.value) : value
  }

  return [state, setState] as const
}
