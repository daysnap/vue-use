import { defineRoutes } from '@/router/defineRoutes'

export default defineRoutes([
  {
    path: '/demo/hooks',
    name: 'HooksView',
    component: () => import('@/views/demo/hooks/HooksView.vue'),
    meta: { title: 'Hooks', requiresAuth: 0 },
  },
  {
    path: '/demo/hooks/use-trigger',
    name: 'UseTriggerView',
    component: () => import('@/views/demo/hooks/UseTriggerView.vue'),
    meta: { title: 'UseTrigger', requiresAuth: 0 },
  },
  {
    path: '/demo/hooks/use-keep-alive',
    name: 'UseKeepAliveView',
    component: () => import('@/views/demo/hooks/use-keep-alive/UseKeepAliveView.vue'),
    meta: { title: 'Hooks', requiresAuth: 0 },
    children: [
      {
        path: 'one',
        name: 'UseKeepAliveOneView',
        component: () => import('@/views/demo/hooks/use-keep-alive/UseKeepAliveOneView.vue'),
        meta: { title: '第一个页面', requiresAuth: 0 },
      },
      {
        path: 'two',
        name: 'UseKeepAliveTwoView',
        component: () => import('@/views/demo/hooks/use-keep-alive/UseKeepAliveTwoView.vue'),
        meta: { title: '第二个页面', requiresAuth: 0 },
      },
      {
        path: 'three',
        name: 'UseKeepAliveThreeView',
        component: () => import('@/views/demo/hooks/use-keep-alive/UseKeepAliveThreeView.vue'),
        meta: { title: '第三个页面', requiresAuth: 0 },
      },
    ],
  },
])
