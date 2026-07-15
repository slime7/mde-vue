<script setup>
import { ref } from 'vue';

const value = ref('可编辑内容');
</script>

<template>
  <mat-text-field v-model="value" label="名称" />
</template>
