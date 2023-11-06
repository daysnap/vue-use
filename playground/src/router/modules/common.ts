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

  {
    path: '/signin',
    name: 'SigninView',
    component: () => import('@/views/auth/SigninView.vue'),
    meta: {
      title: '登录',
      requiresAuth: -1,
      enterClass: 'popup-up',
      leaveClass: 'popup-down',
    },
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: () => import('@/views/auth/SignupView.vue'),
    meta: { title: '注册', requiresAuth: -1 },
  },

  {
    path: '/mine/setting',
    name: 'SettingView',
    component: () => import('@/views/mine/SettingView.vue'),
    meta: { title: '设置', requiresAuth: 1 },
  },

  // 404
  // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
] as RouteRecordRaw[]
