<template>
  <div class="example-stack">
    <mat-split-btn color="primary">
      <template #leading>
        <mat-btn>primary</mat-btn>
      </template><template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn color="secondary">
      <template #leading>
        <mat-btn>secondary</mat-btn>
      </template><template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn color="#6750a4">
      <template #leading>
        <mat-btn>局部色</mat-btn>
      </template><template #trailing>
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
