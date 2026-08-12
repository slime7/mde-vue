<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref(['vue', 'css']);
const items = [
  { title: 'Vue', value: 'vue' },
  { title: 'JavaScript', value: 'js' },
  { title: 'CSS', value: 'css' },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-select v-model="value" label="技术" :items="items" multiple chips />
</template>
<!-- #endregion template -->
