<template>
  <div class="example-stack">
    <mat-list interaction="single-action" aria-label="单操作列表" class="example-list">
      <mat-list-item>打开项目</mat-list-item>
      <mat-list-item>查看归档</mat-list-item>
    </mat-list>
    <mat-list interaction="multi-action" aria-label="多操作列表" class="example-list">
      <mat-list-item>
        项目说明.pdf
        <template #trailing>
          <mat-btn icon="download" label="下载" />
        </template>
      </mat-list-item>
    </mat-list>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}

.example-list {
  inline-size: min(100%, 420px);
}
</style>
