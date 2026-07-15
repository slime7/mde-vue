<template>
  <div class="example-stack">
    <mat-split-btn variant="elevated">
      <template #leading>
        <mat-btn>elevated</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn variant="filled">
      <template #leading>
        <mat-btn>filled</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn variant="filled-tonal">
      <template #leading>
        <mat-btn>tonal</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn variant="outlined">
      <template #leading>
        <mat-btn>outlined</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
