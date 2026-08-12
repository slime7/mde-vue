import { fileURLToPath, URL } from 'node:url';
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
  title: 'mde-vue',
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
            text: '操作与反馈',
            collapsed: true,
            items: [
              { text: 'Badge 徽标', link: '/components/badge' },
              { text: 'Button 按钮', link: '/components/button' },
              { text: 'Button group 按钮组', link: '/components/button-group' },
              { text: 'Dialog 对话框', link: '/components/dialog' },
              { text: 'FAB 浮动操作按钮', link: '/components/fab' },
              { text: 'Hover 悬停状态', link: '/components/hover' },
              { text: 'Loader 加载器', link: '/components/loader' },
              { text: 'Snackbar 消息提示', link: '/components/snackbar' },
              { text: 'Split button 拆分按钮', link: '/components/split-button' },
              { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            ],
          },
          {
            text: '输入',
            collapsed: true,
            items: [
              { text: 'Checkbox 复选框', link: '/components/checkbox' },
              { text: 'Chips 标签', link: '/components/chip' },
              { text: 'Input base 输入基础层', link: '/components/input-base' },
              { text: 'Radio 单选按钮与单选组', link: '/components/radio' },
              { text: 'Range slider 范围滑块', link: '/components/range-slider' },
              { text: 'Search 搜索', link: '/components/search' },
              { text: 'Select 选择器', link: '/components/select' },
              { text: 'Slider 滑块', link: '/components/slider' },
              { text: 'Switch 开关', link: '/components/switch' },
              { text: 'Text field 文本输入', link: '/components/text-field' },
            ],
          },
          {
            text: '导航与布局',
            collapsed: true,
            items: [
              { text: 'App root 应用布局根', link: '/components/app-root' },
              { text: 'App bar 应用栏', link: '/components/app-bar' },
              { text: 'Bottom sheet 底部面板', link: '/components/bottom-sheet' },
              { text: 'Container 响应式容器', link: '/components/container' },
              { text: 'Menu 菜单', link: '/components/menu' },
              { text: 'Navigation 导航', link: '/components/navigation-rail' },
              { text: 'Panes 布局面板', link: '/components/panes' },
              { text: 'Scroll area 滚动区域', link: '/components/scroll-area' },
              { text: 'Side sheet 侧边面板', link: '/components/side-sheet' },
              { text: 'Spacer 弹性占位', link: '/components/spacer' },
              { text: 'Toolbar 工具栏', link: '/components/toolbar' },
            ],
          },
          {
            text: '内容与展示',
            collapsed: true,
            items: [
              { text: 'Card 卡片', link: '/components/card' },
              { text: 'Divider 分隔线', link: '/components/divider' },
              { text: 'Icon 图标', link: '/components/icon' },
              { text: 'Image 图片', link: '/components/image' },
              { text: 'Text 文字', link: '/components/text' },
              { text: 'List 列表', link: '/components/list' },
            ],
          },
        ],
      },
      {
        text: '指令',
        items: [
          { text: 'Intersection 相交观察', link: '/directives/intersection' },
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
    resolve: {
      alias: [
        {
          find: /^mde-vue$/,
          replacement: fileURLToPath(new URL('../../../src/index.js', import.meta.url)),
        },
        {
          find: /^mde-vue\/styles\.css$/,
          replacement: fileURLToPath(new URL('../../../src/styles/index.css', import.meta.url)),
        },
        {
          find: /^mde-vue\/tailwind\.css$/,
          replacement: fileURLToPath(new URL('../../../src/styles/tailwind.css', import.meta.url)),
        },
      ],
    },
    ssr: {
      noExternal: ['@material/material-color-utilities'],
    },
  },
  async buildEnd(siteConfig) {
    await copyLlmsArtifacts(siteConfig.outDir);
  },
});
