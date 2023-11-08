import { defineRoutes } from '@/router/defineRoutes'

export default defineRoutes([
  {
    path: '/demo/use-keep-alive',
    name: 'UseKeepAliveView',
    component: () => import('@/views/demo/use-keep-alive/UseKeepAliveView.vue'),
    meta: { title: 'UseKeepAlive' },
  },
  {
    path: '/demo/use-keep-alive/:method',
    name: 'UseKeepAliveInfoView',
    component: () => import('@/views/demo/use-keep-alive/UseKeepAliveInfoView.vue'),
    meta: { title: 'UseKeepAliveInfo' },
  },

  {
    path: '/demo/use-async-task',
    name: 'UseAsyncTaskView',
    component: () => import(`@/views/demo/use-async-task/UseAsyncTaskView.vue`),
    meta: { title: 'UseAsyncTask' },
  },
])
