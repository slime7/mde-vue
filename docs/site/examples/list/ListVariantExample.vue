<template>
  <div class="example-grid">
    <section>
      <strong>standard</strong>
      <mat-list variant="standard" aria-label="standard 列表">
        <mat-list-item>第一项</mat-list-item>
        <mat-list-item>第二项</mat-list-item>
      </mat-list>
    </section>
    <section>
      <strong>segmented</strong>
      <mat-list variant="segmented" aria-label="segmented 列表">
        <mat-list-item>第一项</mat-list-item>
        <mat-list-item>第二项</mat-list-item>
      </mat-list>
    </section>
  </div>
</template>

<style scoped>
.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 24px;
  inline-size: 100%;
}

section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-inline-size: 0;
}
</style>
