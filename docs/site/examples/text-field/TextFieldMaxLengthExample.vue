<script setup>
import { ref } from 'vue';

const value = ref('输入内容');
</script>

<template>
  <mat-text-field
    v-model="value"
    label="标题"
    :max-length="12"
  />
</template>
