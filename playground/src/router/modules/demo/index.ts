import { defineRoutes } from '@/router/defineRoutes'

export default defineRoutes([
  {
    path: '/demo',
    name: 'DemoView',
    component: () => import('@/views/demo/DemoView.vue'),
    meta: { title: 'Demo', requiresAuth: 0 },
  },
])
