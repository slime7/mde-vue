<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref(['design', 'code']);
const items = [
  { title: '设计', value: 'design', subtitle: '界面与交互' },
  { title: '开发', value: 'code', subtitle: '客户端实现' },
  { title: '测试', value: 'test', subtitle: '质量验证' },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-select v-model="value" label="职责" :items="items" multiple />
</template>
<!-- #endregion template -->
