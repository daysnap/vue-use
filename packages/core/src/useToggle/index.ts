import { ref } from 'vue'

export function useToggle(initialValue = false) {
  const visible = ref(initialValue)

  const toggle = (value = !visible.value) => {
    visible.value = value
  }

  return [visible, toggle] as const
}
