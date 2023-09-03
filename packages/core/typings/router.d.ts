import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    enterClass?: string
    leaveClass?: string
  }
}
