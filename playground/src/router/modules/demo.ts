import { defineRoutes } from '@/router/defineRoutes'

export default defineRoutes([
  {
    path: '/demo/use-keep-alive',
    name: 'UseKeepAliveView',
    component: () => import('@/views/demo/UseKeepAliveView.vue'),
    meta: { title: 'UseKeepAlive' },
  },
  {
    path: '/demo/use-keep-alive/:method',
    name: 'UseKeepAliveInfoView',
    component: () => import('@/views/demo/UseKeepAliveInfoView.vue'),
    meta: { title: 'UseKeepAliveInfo' },
  },
])
