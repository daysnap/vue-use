import { useRoute } from 'vue-router'

export function useParams<T extends Record<string, string>>() {
  const { params } = useRoute()
  return params as T
}
