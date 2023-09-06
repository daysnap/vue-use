import { isFunction } from '@daysnap/utils'
import { ref, type Ref } from 'vue'

export type UseSetStateAction<S> = S | ((prevState: S) => S)

export type UseSetState<T> = (initialState: T) => void

export function useState<S = undefined>(): [
  Ref<S | undefined>,
  UseSetState<UseSetStateAction<S | undefined>>,
]
export function useState<S>(initialState: S): [Ref<S>, UseSetState<UseSetStateAction<S>>]
export function useState<S>(
  initialState?: S,
): [Ref<S | undefined>, UseSetState<UseSetStateAction<S | undefined>>] {
  // https://github.com/vuejs/core/issues/2136
  const state = ref(initialState) as Ref<S | undefined>

  const setState: UseSetState<UseSetStateAction<S | undefined>> = (value) => {
    state.value = isFunction(value) ? value(state.value) : value
  }

  return [state, setState]
}
