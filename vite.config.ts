/// <reference types="vitest" />

import { dirname, relative, resolve } from 'path';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
import windiConfig from './windi.config';
import { isDev, port, r } from './scripts/utils';
import { MV3Hmr } from './vite-mv3-hmr';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export const sharedConfig: UserConfig = {
    root: r('src'),
    resolve: {
        alias: {
            '~/': `${r('src')}/`,
        },
    },
    define: {
        __DEV__: isDev,
    },
    css: {
        preprocessorOptions: {
            modifyVars: {
                'root-entry-name': 'default',
                'ant-prefix': 'note-sync-antdv',
                hack: `true; @import "${resolve('./src/styles/overwrite.lessxxx')}";`,
            },
            less: {
                modifyVars: {
                    'root-entry-name': 'default',
                },
                javascriptEnabled: true,
            },
        },
    },
    plugins: [
        Vue(),

        AutoImport({
            imports: [
                'vue',
                {
                    'webextension-polyfill': [['*', 'browser']],
                },
            ],
            dts: r('src/auto-imports.d.ts'),
        }),

        // https://github.com/antfu/unplugin-vue-components
        Components({
            dirs: [r('src/components')],
            // generate `components.d.ts` for ts support with Volar
            dts: r('src/components.d.ts'),
            resolvers: [
                // auto import icons
                IconsResolver({
                    componentPrefix: '',
                }),
            ],
        }),

        createStyleImportPlugin({
            libs: [
                // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
                {
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `ant-design-vue/es/${name}/style/index`;
                    },
                },
            ],
        }),

        // https://github.com/antfu/unplugin-icons
        Icons(),

        // rewrite assets to use relative path
        {
            name: 'assets-rewrite',
            enforce: 'post',
            apply: 'build',
            transformIndexHtml(html, { path }) {
                return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`);
            },
        },
    ],
    optimizeDeps: {
        include: ['vue', '@vueuse/core', 'webextension-polyfill'],
        exclude: ['vue-demi'],
    },
};

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
      },
    },
  },
  plugins: [
    ...sharedConfig.plugins!,

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      config: windiConfig,
    }),

    MV3Hmr(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
}))
