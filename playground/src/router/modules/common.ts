import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'MainView',
    component: () => import('@/views/main/MainView.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'HomeView',
        component: () => import('@/views/home/HomeView.vue'),
        meta: { title: '首页', requiresAuth: 0, icon: 'wap-home-o', iconSelected: 'wap-home' },
      },
      {
        path: '/mine',
        name: 'MineView',
        component: () => import('@/views/mine/MineView.vue'),
        meta: { title: '我的', requiresAuth: 0, icon: 'manager-o', iconSelected: 'manager' },
      },
    ],
  },

  // 404
  // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
] as RouteRecordRaw[]
