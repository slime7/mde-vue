<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-text-field
    v-model="value"
    label="验证码"
    :error="value.length !== 6"
    error-text="请输入六位验证码"
  />
</template>
<!-- #endregion template -->
