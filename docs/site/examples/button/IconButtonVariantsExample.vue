<script setup>
import { ref } from 'vue';

const favorite = ref(false);
</script>

<template>
  <div class="example-row">
    <mat-btn icon="star" label="Filled" variant="filled" width="narrow" />
    <mat-btn icon="star" label="Tonal" variant="filled-tonal" />
    <mat-btn icon="star" label="Outlined" variant="outlined" width="wide" />
    <mat-btn icon="star" label="Standard" variant="standard" />
    <mat-btn
      icon="favorite"
      label="收藏"
      toggle
      :selected="favorite"
      color="#6750a4"
      @click="favorite = !favorite"
    />
  </div>
</template>

<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
</style>
