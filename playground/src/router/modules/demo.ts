import { defineRoutes } from '@/router/defineRoutes'

export default defineRoutes([
  {
    path: '/demo/use-keep-alive',
    name: 'UseKeepAliveView',
    component: () => import('@/views/demo/UseKeepAliveVue.vue'),
    meta: { title: 'UseKeepAlive' },
  },
])
