<template>
  <div class="example-stack">
    <mat-switch model-value>
      启用状态
    </mat-switch>
    <mat-switch model-value disabled>
      禁用状态
    </mat-switch>
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
