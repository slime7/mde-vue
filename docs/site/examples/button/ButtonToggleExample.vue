<script setup>
import { ref } from 'vue';

const selected = ref(false);
</script>

<template>
  <mat-btn
    toggle
    :selected="selected"
    @click="selected = !selected"
  >
    <template #icon>
      favorite
    </template>
    <template #default>
      收藏
    </template>
    <template #selected>
      已收藏
    </template>
  </mat-btn>
</template>
