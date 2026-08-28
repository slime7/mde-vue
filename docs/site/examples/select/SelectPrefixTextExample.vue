<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref(99);
const items = [
  { title: '99', value: 99 },
  { title: '199', value: 199 },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-select
    v-model="value"
    label="单价"
    prefix-text="¥"
    :items="items"
  />
</template>
<!-- #endregion template -->
