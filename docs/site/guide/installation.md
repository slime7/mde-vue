---
title: 安装
description: 从 GitHub 私有仓库固定提交安装 mdu-ui，并选择全局注册或按需导入组件。
llms: true
order: 20
---

# 安装

`mdu-ui` 不发布到 npm registry，而是直接从私有 GitHub 仓库安装源码。使用方需要 Vue 3、能够编译 Vue SFC 的 Vite 项目，以及访问仓库的 SSH 凭据。

## 从私有 Git 仓库安装

把 `<commit>` 替换为需要固定的完整 Git 提交 SHA：

```bash
pnpm add "mdu-ui@git+ssh://git@github.com/slime7/mdu-ui.git#<commit>"
```

不要使用会随时间移动的分支名代替提交 SHA，否则不同时间安装可能得到不同源码。仓库的 `package.json` 直接导出 JavaScript、Vue SFC 和 CSS，不需要也不提供预编译 `dist`。

## 全局注册：推荐用法

大多数应用应安装 `createMatUi()` 插件。它会初始化动态主题、提供 `useMatTheme()`，并全局注册所有 `mat-*` 组件。基础样式必须显式导入。

应用入口 `src/main.js`：

```js
import { createApp } from 'vue';
import { createMatUi } from 'mdu-ui';
import App from './App.vue';
import 'mdu-ui/styles.css';

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
  <main>
    <mat-btn @click="save">保存</mat-btn>
  </main>
</template>

<script setup>
function save() {
  // 执行应用的保存操作。
}
</script>
```

全局注册后的模板标签统一使用 kebab-case：`<mat-btn>`、`<mat-icon-btn>`、`<mat-btn-group>` 和 `<mat-split-btn>`。

## 按需导入

只需要少量组件、且不需要运行时更换种子色或配色变体时，可以从单组件入口局部导入。基础样式仍然必须导入；它提供默认主题并通过系统偏好切换亮暗模式。

```vue
<script setup>
import { MatBtn } from 'mdu-ui/components/mat-btn';
import 'mdu-ui/styles.css';
</script>

<template>
  <MatBtn>保存</MatBtn>
</template>
```

其他按需入口遵循相同规则：

```js
import { MatIconBtn } from 'mdu-ui/components/mat-icon-btn';
import { MatBtnGroup } from 'mdu-ui/components/mat-btn-group';
import { MatSplitBtn } from 'mdu-ui/components/mat-split-btn';
```

局部导入的 Vue 组件在模板中使用 PascalCase，例如 `<MatBtn>` 或 `<MatIconBtn>`。也可以写成 kebab-case，但 PascalCase 能更明确地表示它来自当前文件的导入。

## 如何选择

| 需求 | 推荐方式 |
| --- | --- |
| 使用动态主题或 `useMatTheme()` | 安装 `createMatUi()`，使用全局 `mat-*` 标签 |
| 应用会使用多个 mdu-ui 组件 | 安装 `createMatUi()`，统一全局注册 |
| 只使用少量组件，并接受基础样式的默认主题 | 从 `mdu-ui/components/<组件目录>` 按需导入 |

`createMatUi()` 当前同时负责主题初始化和全局注册。已经安装插件时，不需要再局部导入同一个组件。
