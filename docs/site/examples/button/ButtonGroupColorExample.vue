<template>
  <div class="example-row">
    <mat-btn-group color="primary">
      <mat-btn>primary</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group color="secondary">
      <mat-btn>secondary</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group color="#6750a4">
      <mat-btn>局部色</mat-btn><mat-btn>组</mat-btn>
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
