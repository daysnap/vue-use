import { __DEV__ } from '@/utils'
import type { Plugin, AppConfig } from 'vue'

// global error handler
const errorHandler: AppConfig['errorHandler'] = (err) => {
  // development env 需要抛出异常 方便查看问题
  if (__DEV__) {
    console.error(err)
  }
}

export default {
  install(app) {
    app.config.errorHandler = errorHandler
  },
} as Plugin
