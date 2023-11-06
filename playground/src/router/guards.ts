import type { Router } from 'vue-router'

export function setupGuards(router: Router) {
  // 设置标题
  router.afterEach((to) => {
    const { title } = to.meta
    window.document.title = `${title ? `${title} - ` : ''}Playground`
  })
}
