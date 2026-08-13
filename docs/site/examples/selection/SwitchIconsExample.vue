<!-- #region script -->
<script setup>
import { ref } from 'vue';

const noneEnabled = ref(true);
const selectedEnabled = ref(true);
const bothEnabled = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-row">
    <mat-switch v-model="noneEnabled" icons="none">
      none
    </mat-switch>
    <mat-switch v-model="selectedEnabled" icons="selected">
      selected
    </mat-switch>
    <mat-switch v-model="bothEnabled" icons="both">
      both
    </mat-switch>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
<!-- #endregion style -->
