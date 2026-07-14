<template>
  <div class="example-row">
    <mat-card variant="elevated">
      <mat-card-content>Elevated</mat-card-content>
    </mat-card>
    <mat-card variant="filled" color="secondary">
      <mat-card-content>Secondary</mat-card-content>
    </mat-card>
    <mat-card variant="outlined" color="#6750a4">
      <mat-card-content>局部种子色</mat-card-content>
    </mat-card>
  </div>
</template>

<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

.example-row > * {
  flex-shrink: 0;
  inline-size: min(100%, 200px);
}
</style>
