import { createRouter, createWebHashHistory, type RouterOptions } from 'vue-router'
import { setupGuards } from './guards'
import { routes } from './routes'

const createRouterOptions = (): RouterOptions => ({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...routes],
})

export const router = createRouter(createRouterOptions())

// 重置路由
export const resetRouter = () => {
  const newRouter = createRouter(createRouterOptions())
  router.resolve = newRouter.resolve // reset router
}

// 设置路由守卫
setupGuards(router)
