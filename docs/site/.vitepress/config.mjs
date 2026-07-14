import { defineConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';
/* eslint-disable import-x/extensions */
import {
  copyLlmsArtifacts,
  createLlmsArtifactsPlugin,
} from '../../../scripts/build-llms.mjs';
/* eslint-enable import-x/extensions */

const googleFontsApiUrl = 'https://fonts.googleapis.com/css2';
const notoSansScUrl = [
  googleFontsApiUrl,
  '?family=Noto+Sans+SC:wght@100..900',
  '&display=swap',
].join('');
const materialSymbolsUrl = [
  googleFontsApiUrl,
  '?family=Material+Symbols+Outlined:',
  'opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  '&display=block',
].join('');

export default defineConfig({
  title: 'mdu-ui',
  description: '面向现代浏览器的私有 Vue 3 组件库',
  lang: 'zh-CN',
  cleanUrls: true,
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
    ],
    ['link', { rel: 'stylesheet', href: notoSansScUrl }],
    ['link', { rel: 'stylesheet', href: materialSymbolsUrl }],
  ],
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/overview' },
      { text: '组件', link: '/components/button' },
      { text: 'AI', link: '/ai/llms' },
      { text: 'Demo', link: '/demo/' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '概述', link: '/guide/overview' },
          { text: '安装', link: '/guide/installation' },
          { text: 'createMatUi', link: '/guide/create-mat-ui' },
          { text: '主题', link: '/guide/theme' },
          { text: '组件配色', link: '/guide/component-color' },
          { text: 'Tailwind CSS', link: '/guide/tailwind' },
          { text: '限制', link: '/guide/limitations' },
        ],
      },
      {
        text: '组件',
        items: [
          {
            text: 'Button 系列',
            collapsed: true,
            items: [
              { text: 'Button 按钮', link: '/components/button' },
              { text: 'Icon button 图标按钮', link: '/components/icon-button' },
              { text: 'Button group 按钮组', link: '/components/button-group' },
              { text: 'Split button 拆分按钮', link: '/components/split-button' },
            ],
          },
          { text: 'Card 卡片', link: '/components/card' },
        ],
      },
      {
        text: 'AI',
        items: [
          { text: 'LLMs.txt 使用说明', link: '/ai/llms' },
        ],
      },
      {
        text: '示例',
        items: [
          { text: '交互 demo', link: '/demo/' },
        ],
      },
    ],
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
  },
  vite: {
    plugins: [tailwindcss(), createLlmsArtifactsPlugin()],
    ssr: {
      noExternal: ['@material/material-color-utilities'],
    },
  },
  async buildEnd(siteConfig) {
    await copyLlmsArtifacts(siteConfig.outDir);
  },
});
