<script setup>
import { ref } from 'vue';

const favorite = ref(false);
</script>

<template>
  <div class="example-row">
    <mat-icon-btn label="Filled" variant="filled" width="narrow">
      star
    </mat-icon-btn>
    <mat-icon-btn label="Tonal" variant="filled-tonal">
      star
    </mat-icon-btn>
    <mat-icon-btn label="Outlined" variant="outlined" width="wide">
      star
    </mat-icon-btn>
    <mat-icon-btn label="Standard" variant="standard">
      star
    </mat-icon-btn>
    <mat-icon-btn
      label="收藏"
      toggle
      :selected="favorite"
      color="#6750a4"
      @click="favorite = !favorite"
    >
      <template #default>
        favorite_border
      </template>
      <template #selected>
        favorite
      </template>
    </mat-icon-btn>
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
