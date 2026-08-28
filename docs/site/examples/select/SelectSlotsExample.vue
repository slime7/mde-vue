<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref('personal');
const items = [
  { title: '个人', value: 'personal' },
  { title: '团队', value: 'team' },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-select v-model="value" label="空间" :items="items">
    <template #leading>
      <mat-icon icon="folder" aria-hidden="true" />
    </template>
    <template #trailing>
      <mat-icon icon="info" aria-hidden="true" />
    </template>
  </mat-select>
</template>
<!-- #endregion template -->
