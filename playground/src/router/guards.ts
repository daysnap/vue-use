import { useUserinfoStore } from '@/stores'
import type { Router } from 'vue-router'
import { isLoadAsyncRoutesFlag, loadAsyncRoutes } from './asyncRoutes'

export function setupGuards(router: Router) {
  // 鉴定权限
  router.beforeEach(async (to) => {
    const { userinfo } = useUserinfoStore()
    const isLogin = !!userinfo?.token

    // 是否需要授权，1 需要授权、-1 不需要登录、0 登录、不登录都可以
    const requiresAuth = to.meta.requiresAuth ?? 0
    // 已登录进入到不需要登录的页面，直接跳转回首页
    if (isLogin && requiresAuth === -1) {
      return { path: '/', replace: true }
    }
    // 未登录进入到需要登录的页面，直接跳转取登录
    if (!isLogin && requiresAuth === 1) {
      return { path: '/signin' }
    }

    // 已登录 加载动态路由
    if (isLogin && !isLoadAsyncRoutesFlag) {
      await loadAsyncRoutes()
      return { ...to, replace: true }
    }
  })

  // 设置标题
  router.afterEach((to) => {
    const { title } = to.meta
    window.document.title = `${title ? `${title} - ` : ''}DaySnap`
  })
}
