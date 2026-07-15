<template>
  <div class="example-stack">
    <mat-checkbox model-value>
      启用
    </mat-checkbox>
    <mat-checkbox model-value disabled>
      禁用
    </mat-checkbox>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
</style>
