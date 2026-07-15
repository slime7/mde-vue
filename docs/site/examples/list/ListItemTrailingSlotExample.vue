<template>
  <mat-list aria-label="trailing Slot" class="example-list">
    <mat-list-item>
      下载文件
      <template #trailing>
        <mat-icon icon="download" aria-hidden="true" />
      </template>
    </mat-list-item>
  </mat-list>
</template>

<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
