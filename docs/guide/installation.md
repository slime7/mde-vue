---
title: 安装
description: 从 GitHub 私有仓库固定提交安装 mdu-ui，并在 Vue 应用中注册插件或单个组件。
llms: true
order: 20
---

# 安装

`mdu-ui` 是私有 GitHub 仓库，不会发布到 npm。建议固定到明确的 Git 提交，确保安装结果可复现。

```bash
pnpm add "git+ssh://git@github.com/slime7/mdu-ui.git#<commit>"
```

使用项目需要 Vue 3。基础样式必须显式导入：

```js
import { createApp } from 'vue';
import { createMatUi } from 'mdu-ui';
import App from './App.vue';
import 'mdu-ui/styles.css';

const app = createApp(App);

app.use(createMatUi());
app.mount('#app');
```

插件会全局注册 `<mat-btn>`，并使后代组件能够调用 `useMatTheme()`。如果只使用单个组件，可以改为局部注册：

```vue
<script setup>
import { MatBtn } from 'mdu-ui/components/mat-btn';
import 'mdu-ui/styles.css';
</script>

<template>
  <MatBtn>保存</MatBtn>
</template>
```

使用 Git 依赖时，消费项目必须能够访问私有仓库，并配置相应的 SSH 凭据。
