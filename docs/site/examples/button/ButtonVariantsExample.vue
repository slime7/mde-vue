<template>
  <div class="example-row">
    <mat-btn variant="elevated" size="extra-small">
      Elevated
    </mat-btn>
    <mat-btn variant="filled" size="small">
      Filled
    </mat-btn>
    <mat-btn variant="filled-tonal" size="medium">
      Tonal
    </mat-btn>
    <mat-btn variant="outlined" size="large" shape="square">
      Outlined
    </mat-btn>
    <mat-btn variant="text" size="extra-large">
      Text
    </mat-btn>
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
