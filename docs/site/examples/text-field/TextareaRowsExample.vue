<template>
  <div class="example-stack">
    <mat-textarea label="两行" :rows="2" />
    <mat-textarea label="四行" :rows="4" />
    <mat-textarea label="六行" :rows="6" />
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
