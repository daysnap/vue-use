import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { kebabCase } from '@daysnap/utils'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    vue(),
    vueJsx(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'typings/auto-imports.d.ts',
      resolvers: [VantResolver()],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: 'typings/components.d.ts',
      extensions: ['ts', 'jsx', 'tsx', 'js', 'vue'],
      resolvers: [
        // VantResolver(),
        (name) => {
          // 处理 @daysnap/horn-ui
          if (name.startsWith('Hor')) {
            return {
              name,
              from: '@daysnap/horn-ui',
              sideEffects: `@daysnap/horn-ui/src/${kebabCase(name)}/style/index`,
            }
          }

          // 因为 vite dev 下会重复引入 样式，所以 dev 环境下，vant 样式全局导入
          // https://vant-ui.github.io/vant/#/zh-CN/quickstart
          // 所以这里就不直接使用 VantResolver 了
          // https://github.com/vitejs/vite/issues/4448
          if (name.startsWith('Van')) {
            const partialName = name.slice(3)
            return {
              name: partialName,
              from: `vant/es`,
            }
          }
        },
      ],
      exclude: [],
    }),
  ],
})
