import { setToastDefaultOptions } from 'vant'

// 因为 vite dev 下会重复引入 样式，所以 dev 环境下，vant 样式全局导入
import 'vant/lib/index.css'

// 全局设置禁止背景点击
setToastDefaultOptions('loading', { forbidClick: true })
