---
title: 安装
description: 从 GitHub 私有仓库固定提交安装 mde-vue，并选择全局注册或按需导入组件与指令。
llms: true
order: 20
---

# 安装

`mde-vue` 不发布到 npm registry，而是从私有 GitHub 仓库安装已提交的单一核心 ESM 分发产物。使用方需要 Vue 3、支持 ESM 的构建环境，以及访问仓库的 SSH 凭据。

## 从私有 Git 仓库安装

把 `<commit>` 替换为需要固定的完整 Git 提交 SHA：

```bash
pnpm add "mde-vue@git+ssh://git@github.com/slime7/mde-vue.git#<commit>"
```

不要使用会随时间移动的分支名代替提交 SHA，否则不同时间安装可能得到不同产物。仓库的 `package.json` 只导出已提交的 `dist`，其中只有一个 JavaScript 文件、一个样式文件和一个类型声明文件。安装时不运行 `prepare`，使用方也不需要编译组件库的 Vue SFC。

## 全局注册：推荐用法

大多数应用应安装 `createMatUi()` 插件。它会初始化动态主题、提供 `useMatTheme()`，以 kebab-case `mat-*` 和 PascalCase `Mat*` 两种名称全局注册所有组件，并注册 `v-intersection` 指令。基础样式必须显式导入。页面级应用建议用 `<mat-app-root>` 包住应用正文和设置 `app` 的布局组件。

应用入口 `src/main.js`：

```js
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

组件 `src/App.vue`：

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

全局注册后的模板标签可使用 kebab-case 或 PascalCase，例如 `<mat-btn>` 与 `<MatBtn>`、`<mat-fab>` 与 `<MatFab>`。安装包提供 Vue 全局组件声明；启用 Vue Language Features 的编辑器可为两种名称提供相同的组件提示。

## 局部注册

只需要少量组件时，也从唯一的 `mde-vue` 根入口具名导入。基础样式仍然必须导入；它同时包含默认主题、全部组件样式和 Tailwind CSS v4 语义映射。支持 tree shaking 的构建工具可以移除未使用的具名导出。

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
  MatCheckbox,
  MatChip,
  MatChipSet,
  MatContainer,
  MatDialog,
  MatDivider,
  MatFab,
  MatHover,
  MatIcon,
  MatInputBase,
  MatList,
  MatListItem,
  MatLoader,
  MatMenu,
  MatMenuItem,
  MatPane,
  MatPanes,
  MatRadio,
  MatRadioGroup,
  MatScrollArea,
  MatShape,
  MatSideSheet,
  MatSnackbar,
  MatSpacer,
  MatSwitch,
  MatText,
  MatTextarea,
  MatTextField,
  MatToolbar,
  MatTooltip,
  prompt,
  snackbar,
  toast,
  useMatApp,
} from 'mde-vue';
```

局部导入的 Vue 组件在模板中使用 PascalCase，例如 `<MatAppRoot>`、`<MatAvatar>`、`<MatAppBar>`、`<MatSearch>`、`<MatBadge>`、`<MatBtn>`、`<MatFab>`、`<MatIcon>`、`<MatShape>`、`<MatText>`、`<MatCard>`、`<MatChip>`、`<MatChipSet>`、`<MatTextField>`、`<MatInputBase>`、`<MatMenu>`、`<MatBottomSheet>`、`<MatSideSheet>`、`<MatContainer>`、`<MatScrollArea>`、`<MatSpacer>`、`<MatLoader>`、`<MatTooltip>`、`<MatHover>`、`<MatSnackbar>` 或 `<MatToolbar>`。也可以写成 kebab-case，但 PascalCase 能更明确地表示它来自当前文件的导入。`Intersection` 指令在 `<script setup>` 中建议别名为 `vIntersection`，模板中使用 `v-intersection`；`useMatApp()` 只能在 `<MatAppRoot>` 的后代组件中调用。

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
| 使用动态主题、`useMatTheme()` 或 `v-intersection` | 安装 `createMatUi()`，使用全局 `mat-*` 或 `Mat*` 标签和 `v-intersection` |
| 应用会使用多个 mde-vue 组件 | 安装 `createMatUi()`，统一全局注册 |
| 只使用少量组件，并接受基础样式的默认主题 | 从 `mde-vue` 根入口具名导入并局部注册 |

`createMatUi()` 同时负责主题初始化、组件设置、`mat-*` 与 `Mat*` 组件和 `v-intersection` 指令的全局注册。已经安装插件时，不需要再局部导入同一个组件或指令。交互指针、图标 class 与主题入口见 [`createMatUi` 配置](/guide/create-mat-ui)。
