---
title: 安装
description: 从 GitHub 私有仓库固定提交安装 mdu-ui，并选择全局注册或按需导入组件与指令。
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

大多数应用应安装 `createMatUi()` 插件。它会初始化动态主题、提供 `useMatTheme()`，以 kebab-case `mat-*` 和 PascalCase `Mat*` 两种名称全局注册所有组件，并注册 `v-intersection` 指令。基础样式必须显式导入。

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
    <MatBtn variant="outlined" @click="save">另存</MatBtn>
    <mat-fab icon="add" label="创建" />
    <mat-hover v-slot="{ isHovering, props }">
      <button v-bind="props" type="button">
        {{ isHovering ? '悬停中' : '悬停查看' }}
      </button>
    </mat-hover>
    <div v-intersection="handleIntersection">观察目标</div>
  </main>
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

## 按需导入

只需要少量组件、且不需要运行时更换种子色或配色变体时，可以从单组件入口局部导入。基础样式仍然必须导入；它提供默认主题并通过系统偏好切换亮暗模式。

```vue
<script setup>
import { MatBtn } from 'mdu-ui/components/mat-btn';
import { MatFab } from 'mdu-ui/components/mat-fab';
import { MatHover } from 'mdu-ui/components/mat-hover';
import { Intersection as vIntersection } from 'mdu-ui/directives/intersection';
import 'mdu-ui/styles.css';

function handleIntersection(isIntersecting) {
  console.log(isIntersecting);
}
</script>

<template>
  <MatBtn>保存</MatBtn>
  <MatFab icon="add" label="创建" />
  <MatHover v-slot="{ isHovering, props }">
    <button v-bind="props" type="button">
      {{ isHovering ? '悬停中' : '悬停查看' }}
    </button>
  </MatHover>
  <div v-intersection="handleIntersection">观察目标</div>
</template>

```

其他组件的按需入口遵循相同规则，例如：

```js
import { MatCard } from 'mdu-ui/components/mat-card';
import { MatCardHeadline } from 'mdu-ui/components/mat-card-headline';
import { MatCardSubhead } from 'mdu-ui/components/mat-card-subhead';
import { MatCardMedia } from 'mdu-ui/components/mat-card-media';
import { MatFab } from 'mdu-ui/components/mat-fab';
import { MatIcon } from 'mdu-ui/components/mat-icon';
import { MatList } from 'mdu-ui/components/mat-list';
import { MatListItem } from 'mdu-ui/components/mat-list-item';
import { MatDivider } from 'mdu-ui/components/mat-divider';
import { MatCheckbox } from 'mdu-ui/components/mat-checkbox';
import { MatRadio } from 'mdu-ui/components/mat-radio';
import { MatRadioGroup } from 'mdu-ui/components/mat-radio-group';
import { MatSwitch } from 'mdu-ui/components/mat-switch';
import { MatTextField } from 'mdu-ui/components/mat-text-field';
import { MatTextarea } from 'mdu-ui/components/mat-textarea';
import { MatInputBase } from 'mdu-ui/components/mat-input-base';
import { MatMenu } from 'mdu-ui/components/mat-menu';
import { MatMenuItem } from 'mdu-ui/components/mat-menu-item';
import { MatDialog } from 'mdu-ui/components/mat-dialog';
import { MatBottomSheet } from 'mdu-ui/components/mat-bottom-sheet';
import { MatSideSheet } from 'mdu-ui/components/mat-side-sheet';
import { MatHover } from 'mdu-ui/components/mat-hover';
import { MatToolbar } from 'mdu-ui/components/mat-toolbar';
import { MatSpacer } from 'mdu-ui/components/mat-spacer';
import { MatLoader } from 'mdu-ui/components/mat-loader';
import { MatTooltip } from 'mdu-ui/components/mat-tooltip';
import { Intersection as vIntersection } from 'mdu-ui/directives/intersection';
import { MatSnackbar } from 'mdu-ui/components/mat-snackbar';
import { MatPanes } from 'mdu-ui/components/mat-panes';
import { MatPane } from 'mdu-ui/components/mat-pane';
import {
  alert,
  confirm,
  dialog,
  prompt,
  snackbar,
  toast,
} from 'mdu-ui/functions';
```

复合组件的父子入口相互独立；按需使用 Card 子组件时，应导入实际使用的 `MatCardHeadline`、`MatCardSubhead`、`MatCardMedia` 等入口；按需使用 List 时，应同时导入实际使用的 `MatListItem` 和 `MatDivider`，按需使用单选组时应导入 `MatRadioGroup` 和 `MatRadio`，按需使用 Menu 时应导入 `MatMenu` 和 `MatMenuItem`。局部导入的 Vue 组件在模板中使用 PascalCase，例如 `<MatBtn>`、`<MatFab>`、`<MatIcon>`、`<MatCard>`、`<MatTextField>`、`<MatInputBase>`、`<MatMenu>`、`<MatBottomSheet>`、`<MatSideSheet>`、`<MatSpacer>`、`<MatLoader>`、`<MatTooltip>`、`<MatHover>`、`<MatSnackbar>` 或 `<MatToolbar>`。也可以写成 kebab-case，但 PascalCase 能更明确地表示它来自当前文件的导入。`Intersection` 指令在 `<script setup>` 中建议别名为 `vIntersection`，模板中使用 `v-intersection`。命令式 Snackbar 使用 `snackbar()` 或同一函数引用的 `toast()`，只从 `mdu-ui/functions` 导入。

## 如何选择

| 需求 | 推荐方式 |
| --- | --- |
| 使用动态主题、`useMatTheme()` 或 `v-intersection` | 安装 `createMatUi()`，使用全局 `mat-*` 或 `Mat*` 标签和 `v-intersection` |
| 应用会使用多个 mdu-ui 组件 | 安装 `createMatUi()`，统一全局注册 |
| 只使用少量组件，并接受基础样式的默认主题 | 从 `mdu-ui/components/<组件目录>` 按需导入 |

`createMatUi()` 同时负责主题初始化、组件设置、`mat-*` 与 `Mat*` 组件和 `v-intersection` 指令的全局注册。已经安装插件时，不需要再局部导入同一个组件或指令。交互指针、图标 class 与主题入口见 [`createMatUi` 配置](/guide/create-mat-ui)。
