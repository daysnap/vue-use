import { useRoute } from 'vue-router'

export function useQuery<T extends Record<string, string>>() {
  const { query } = useRoute()
  return query as T
}
