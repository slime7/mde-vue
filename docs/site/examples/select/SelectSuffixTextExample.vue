<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref(30);
const items = [
  { title: '15', value: 15 },
  { title: '30', value: 30 },
  { title: '60', value: 60 },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-select
    v-model="value"
    label="时长"
    suffix-text="分钟"
    :items="items"
  />
</template>
<!-- #endregion template -->
