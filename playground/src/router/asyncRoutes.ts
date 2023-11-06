export let isLoadAsyncRoutesFlag = false

export const resetLoadAsyncFlag = () => (isLoadAsyncRoutesFlag = false)

export const loadAsyncRoutes = async () => {
  isLoadAsyncRoutesFlag = true
  // todo 加载路由
}
