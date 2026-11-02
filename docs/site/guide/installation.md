---
title: 安装
description: 从 GitHub 仓库固定提交或标签安装 mde-vue，并通过 Vite 自动导入或手动具名导入组件。
llms: true
order: 20
---

# 安装

`mde-vue` 目前通过 GitHub 仓库分发已构建的运行时 ESM、Vite 自动导入插件和样式产物。使用方需要 Vue 3 以及支持 ESM 的构建环境；自动导入插件用于 Vite 项目。

## 从 GitHub 仓库安装

建议使用固定 Git 提交 SHA 或发布 Tag 锁定版本：

```bash
# HTTPS 安装（推荐）
pnpm add "mde-vue@git+https://github.com/slime7/mde-vue.git#<commit-or-tag>"

# SSH 安装
pnpm add "mde-vue@git+ssh://git@github.com/slime7/mde-vue.git#<commit-or-tag>"
```

不要使用会随时间移动的分支名代替提交 SHA 或 Tag，否则不同时间安装可能得到不同产物。仓库的 `package.json` 只导出已提交的 `dist`，其中包含运行时 `mde-vue.js`、Vite 自动导入插件 `vite.js`、基础样式 `styles.css`、Tailwind 映射 `tailwind.css` 以及类型声明 `index.d.ts` 与 `vite.d.ts`。安装时不运行 `prepare`，使用方也不需要编译组件库的 Vue SFC。

## 推荐用法：运行时插件 + Vite 自动导入

`createMatUi()` 不再全局注册组件。它只创建主题控制器、提供组件设置和主题上下文，并注册 `v-intersection`、`v-state-layer` 与 `v-ripple` 指令。组件由 `mde-vue/vite` 按模板中实际使用的标签自动导入，只有被使用的组件进入产物。

### 配置 Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { mdeVue } from 'mde-vue/vite';

export default defineConfig({
  plugins: [vue(), mdeVue()],
});
```

`mdeVue()` 只处理 `.vue` 文件中的普通 HTML 模板，支持 `mat-*`、`Mat*` 和 `mde-*` 别名标签。动态组件、渲染函数、`<script setup src>` 以及 pug 等非 HTML 模板不会被自动导入，需要手动导入组件。可以传入 `include` / `exclude` 限定处理范围，默认跳过 `node_modules`。

### 应用入口

应用入口安装运行时插件并导入基础样式：

```js
// src/main.js
import { createApp } from 'vue';
import { createMatUi } from 'mde-vue';
import App from './App.vue';
import 'mde-vue/styles.css';

createApp(App)
  .use(createMatUi({
    theme: {
      mode: 'system',
      seedColor: '#20a6fc',
    },
  }))
  .mount('#app');
```

### 组件模板

`App.vue` 中的组件标签不需要手动导入：

```vue
<template>
  <mat-app-root>
    <main>
      <mat-btn @click="save">保存</mat-btn>
      <MatBtn variant="outlined" @click="save">另存</MatBtn>
      <mat-fab app icon="add" label="创建" />
      <mat-hover v-slot="{ isHovering, props }">
        <button v-bind="props" type="button">
          {{ isHovering ? '悬停中' : '悬停查看' }}
        </button>
      </mat-hover>
      <div v-intersection="handleIntersection">观察目标</div>
      <button v-state-layer type="button">自定义状态层</button>
      <button v-ripple type="button">涟漪按钮</button>
    </main>
  </mat-app-root>
</template>

<script setup>
function save() {
  // 执行应用的保存操作。
}

function handleIntersection(isIntersecting) {
  console.log(isIntersecting);
}
</script>
```

`v-intersection`、`v-state-layer` 与 `v-ripple` 指令由 `createMatUi()` 全局安装，不需要额外导入。`mat-*`、`Mat*` 与 `mde-*` 组件由 `mdeVue()` 自动导入；同一个组件使用多种标签写法时只注入一次导入。

Vite 开发态仍可能预构建整个运行时文件，生产构建才会按实际使用的组件摇树。

## 手动导入组件

不使用 `mde-vue/vite` 时，从唯一的 `mde-vue` 根入口具名导入实际使用的组件和指令。基础样式仍然必须导入；它包含默认主题、全部组件样式和公共排版工具类。Tailwind CSS v4 语义映射由独立的 `mde-vue/tailwind.css` 提供，不包含组件样式。支持 tree shaking 的构建工具可以移除未使用的具名导出。

```vue
<script setup>
import {
  Intersection as vIntersection,
  MatAppBar,
  MatAppRoot,
  MatBtn,
  MatFab,
  MatHover,
  MatSearch,
  Ripple as vRipple,
  StateLayer as vStateLayer,
} from 'mde-vue';
import 'mde-vue/styles.css';

function handleIntersection(isIntersecting) {
  console.log(isIntersecting);
}
</script>

<template>
  <MatAppRoot>
    <MatBtn>保存</MatBtn>
    <MatFab app icon="add" label="创建" />
    <MatHover v-slot="{ isHovering, props }">
      <button v-bind="props" type="button">
        {{ isHovering ? '悬停中' : '悬停查看' }}
      </button>
    </MatHover>
    <div v-intersection="handleIntersection">观察目标</div>
    <button v-state-layer="{ color: 'var(--mat-sys-color-primary)' }" type="button">
      自定义状态层
    </button>
    <button v-ripple="{ color: 'var(--mat-sys-color-primary)' }" type="button">
      自定义涟漪
    </button>
  </MatAppRoot>
</template>

```

其他组件和命令式函数也从同一入口导入，例如：

```js
import {
  alert,
  confirm,
  dialog,
  Intersection as vIntersection,
  MatAppRoot,
  MatAvatar,
  MatBadge,
  MatBottomSheet,
  MatCard,
  MatCardHeadline,
  MatCardMedia,
  MatCardSubhead,
  MatChatMinimap,
  MatCheckbox,
  MatChip,
  MatChipSet,
  MatContainer,
  MatDockedContainer,
  MatDialog,
  MatDivider,
  MatFab,
  MatHover,
  MatIcon,
  MatInputBase,
  MatList,
  MatListItem,
  MatLoading,
  MatProgress,
  MatMenu,
  MatMenuItem,
  MatNotification,
  MatPane,
  MatPanes,
  MatRadio,
  MatRadioGroup,
  MatScrollArea,
  MatShape,
  MatSideSheet,
  MatSnackbar,
  MatSpacer,
  MatTableWrapper,
  MatSwitch,
  MatText,
  MatTextarea,
  MatTextField,
  MatToolbar,
  MatTooltip,
  prompt,
  Ripple as vRipple,
  snackbar,
  StateLayer as vStateLayer,
  toast,
  useMatApp,
  useMatUi,
} from 'mde-vue';
```

手动导入的 Vue 组件在模板中使用 PascalCase，例如 `<MatAppRoot>`、`<MatAvatar>`、`<MatAppBar>`、`<MatSearch>`、`<MatBadge>`、`<MatBtn>`、`<MatFab>`、`<MatIcon>`、`<MatShape>`、`<MatText>`、`<MatCard>`、`<MatChatMinimap>`、`<MatChip>`、`<MatChipSet>`、`<MatTextField>`、`<MatInputBase>`、`<MatMenu>`、`<MatBottomSheet>`、`<MatSideSheet>`、`<MatContainer>`、`<MatScrollArea>`、`<MatSpacer>`、`<MatTableWrapper>`、`<MatLoading>`、`<MatProgress>`、`<MatTooltip>`、`<MatHover>`、`<MatSnackbar>`、`<MatNotification>` 或 `<MatToolbar>`。也可以写成 kebab-case，但 PascalCase 能更明确地表示它来自当前文件的导入。`Intersection`、`StateLayer` 与 `Ripple` 指令在 `<script setup>` 中建议分别别名为 `vIntersection`、`vStateLayer` 与 `vRipple`，模板中使用 `v-intersection`、`v-state-layer` 与 `v-ripple`；`useMatApp()` 只能在 `<MatAppRoot>` 的后代组件中调用。

如果同时安装 `createMatUi()`，三个公共指令已经全局注册，可以省略对应的指令导入；组件仍需要手动导入或由 `mdeVue()` 自动导入。

## 页面基础尺寸

`MatAppRoot` 不修改 `html`、`body` 或 Vue 挂载节点。使用默认文档滚动模式时，应用应自行清除浏览器默认 `body` 外边距，并保证页面根节点具有可用高度：

```css
html,
body,
#app {
  min-block-size: 100%;
}

body {
  margin: 0;
}
```

如果启用 `scrollable`，AppRoot 会把正文滚动限制在自身内部；`fill-viewport="false"` 时还必须为 AppRoot 或父级提供确定高度。完整布局规则见 [App root 应用布局根](/components/app-root)。

## 如何选择

| 需求 | 推荐方式 |
| --- | --- |
| Vite 项目，希望模板自动导入并保留按需体积 | 安装 `createMatUi()`，并在 Vite 配置中加入 `mdeVue()` |
| 需要动态主题、`useMatTheme()`、defaults 或公共指令 | 安装 `createMatUi()`；组件由 `mdeVue()` 自动导入或手动导入 |
| 不使用 Vite 自动导入，只使用少量组件 | 从 `mde-vue` 根入口具名导入组件和指令 |
| 只使用组件，不需要主题或指令 | 手动导入组件并导入 `mde-vue/styles.css`，可以不安装 `createMatUi()` |

`createMatUi()` 负责主题初始化、组件设置和 `v-intersection`、`v-state-layer`、`v-ripple` 指令的全局安装，不注册组件。`mdeVue()` 只负责自动导入模板中的组件；两者可以独立使用。交互指针、图标 class 与主题入口见 [`createMatUi` 配置](/guide/create-mat-ui)。
