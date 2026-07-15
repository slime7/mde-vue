<template>
  <div class="example-row">
    <mat-btn-group>
      <mat-btn>可用</mat-btn>
      <mat-btn>按钮</mat-btn>
    </mat-btn-group>
    <mat-btn-group disabled>
      <mat-btn>禁用</mat-btn>
      <mat-btn>组</mat-btn>
    </mat-btn-group>
  </div>
</template>

<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
