<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref(null);
const items = [
  '未分类',
  {
    group: '常用城市',
    items: [
      { name: '上海', code: 'sh', detail: '中国大陆' },
      { name: '东京', code: 'tyo', detail: '日本' },
      { name: '伦敦', code: 'lon', detail: '英国', disabled: true },
    ],
  },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-select
    v-model="value"
    label="城市"
    placeholder="请选择城市"
    supporting-text="禁用项不能选择"
    :items="items"
    item-title="name"
    item-value="code"
    item-subtitle="detail"
  />
</template>
<!-- #endregion template -->
