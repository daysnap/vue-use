import { __DEV__ } from '@/utils'
import { insertScript } from '@daysnap/utils'

// 用于移动端 debug
// app 且 开发环境下 默认载入 debug 工具
// docs see https://eruda.liriliri.io/
if (__DEV__) {
  insertScript('//cdn.bootcss.com/eruda/1.5.2/eruda.min.js').then(() => {
    eruda.init()
  })
}
