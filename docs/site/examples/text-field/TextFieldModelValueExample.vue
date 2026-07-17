<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref('可编辑内容');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-text-field v-model="value" label="名称" />
</template>
<!-- #endregion template -->
