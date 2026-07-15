<template>
  <div class="example-stack">
    <mat-text-field label="outlined" variant="outlined" />
    <mat-text-field label="filled" variant="filled" />
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: min(100%, 360px);
}
</style>
