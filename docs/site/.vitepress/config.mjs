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
  appearance: false,
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
      { text: '主题设置', link: '/guide/theme' },
      { text: 'AI', link: '/ai/llms' },
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
              { text: 'Button group 按钮组', link: '/components/button-group' },
              { text: 'Split button 拆分按钮', link: '/components/split-button' },
              { text: 'FAB 浮动操作按钮', link: '/components/fab' },
            ],
          },
          { text: 'Icon 图标', link: '/components/icon' },
          {
            text: '表单选择',
            collapsed: false,
            items: [
              { text: 'Checkbox 复选框', link: '/components/checkbox' },
              { text: 'Radio 单选按钮与单选组', link: '/components/radio' },
              { text: 'Switch 开关', link: '/components/switch' },
              { text: 'Slider 滑块', link: '/components/slider' },
              { text: 'Range slider 范围滑块', link: '/components/range-slider' },
            ],
          },
          { text: 'Text field 文本输入', link: '/components/text-field' },
          { text: 'Loader 加载器', link: '/components/loader' },
          { text: 'Menu 菜单', link: '/components/menu' },
          { text: 'Dialog 对话框', link: '/components/dialog' },
          { text: 'Toolbar 工具栏', link: '/components/toolbar' },
          { text: 'Navigation 导航', link: '/components/navigation-rail' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          { text: 'Snackbar 消息提示', link: '/components/snackbar' },
          { text: 'Card 卡片', link: '/components/card' },
          { text: 'List 列表', link: '/components/list' },
          { text: 'Divider 分隔线', link: '/components/divider' },
          { text: 'Panes 布局面板', link: '/components/panes' },
          { text: 'Spacer 弹性占位', link: '/components/spacer' },
        ],
      },
      {
        text: 'AI',
        items: [
          { text: 'LLMs.txt 使用说明', link: '/ai/llms' },
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
    darkModeSwitchLabel: '主题设置',
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
