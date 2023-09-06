import {
  type Ref,
  watch,
  isRef,
  unref,
  onUnmounted,
  onDeactivated,
  onMounted,
  onActivated,
} from 'vue'
type Loose<T> = T & { [key: string]: any }

type TargetRef =
  | HTMLElement
  | EventTarget
  | Loose<{ $el: HTMLElement }>
  | Ref<EventTarget | Loose<{ $el: HTMLElement }> | undefined>

export type UseEventListenerOptions = {
  target?: TargetRef
  capture?: boolean
  passive?: boolean
}

export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions,
): void
export function useEventListener(
  type: string,
  listener: EventListener,
  options?: UseEventListenerOptions,
): void
export function useEventListener(
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions = {},
) {
  const { target = window, passive = false, capture = false } = options

  let attached: boolean

  const add = (target?: TargetRef) => {
    let element = unref(target)

    if ((element as any)?.$el) {
      element = (element as any).$el
    }

    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive,
      })
      attached = true
    }
  }

  const remove = (target?: TargetRef) => {
    let element = unref(target)

    if ((element as any)?.$el) {
      element = (element as any).$el
    }

    if (element && attached) {
      element.removeEventListener(type, listener, capture)
      attached = false
    }
  }

  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target))
  onActivated(() => add(target))
  onMounted(() => add(target))

  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      remove(oldVal)
      add(val)
    })
  }
}
