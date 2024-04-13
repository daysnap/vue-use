import { ref } from 'vue'

export interface UseVisibleOptions<T extends Record<string, any>, P = any> {
  showCallback?: (options?: T) => void | Promise<void>
  hideCallback?: (reason: any) => void | Promise<void>
  confirmCallback?: (...args: any[]) => P | Promise<P>
}

export interface UseVisibleShowOptions {
  beforeClose?: (action: 'cancel' | 'confirm', ...args: any[]) => boolean | Promise<boolean>
}

export function useVisible<T extends Record<string, any>, R = any>(
  options: UseVisibleOptions<T, R> = {},
) {
  const { showCallback, hideCallback, confirmCallback } = options

  const visible = ref(false)
  let resolve: ((value?: any) => void) | null
  let reject: ((reason?: any) => void) | null
  let beforeClose: UseVisibleShowOptions['beforeClose']

  // 显示
  const show = async <P = R>(options?: UseVisibleShowOptions & T) => {
    beforeClose = options?.beforeClose
    await showCallback?.(options)
    return new Promise<P>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
      visible.value = true
    })
  }

  // 隐藏
  const hide = async (reason?: any) => {
    const result = (await beforeClose?.('cancel', reason)) ?? true
    if (!result) {
      return
    }
    await hideCallback?.(reason)
    reject?.(reason || 'cancel')
    visible.value = false
  }

  // 确认
  const confirm = async (...args: any[]) => {
    const result = (await beforeClose?.('confirm', ...args)) ?? true
    if (!result) {
      return
    }
    const value = confirmCallback ? await confirmCallback(...args) : args[0]
    reject = null
    resolve?.(value)
    visible.value = false
  }

  return {
    visible,
    show,
    confirm,
    hide,
  }
}
