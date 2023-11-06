import type { RouteRecordRaw } from 'vue-router'

export const routes = ((s) =>
  Object.values(s).reduce<RouteRecordRaw[]>(
    (res, item: any) =>
      [...res, ...(item.default || [])].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)),
    [],
  ))(import.meta.glob('./modules/**/*.ts', { eager: true }))
