<!-- #region script -->
<script setup>
import { ref } from 'vue';

const enabled = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-switch v-model="enabled">
    {{ enabled ? '已开启' : '已关闭' }}
  </mat-switch>
</template>
<!-- #endregion template -->
