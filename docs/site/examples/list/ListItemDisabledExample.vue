<template>
  <mat-list interaction="single-action" aria-label="禁用项目" class="example-list">
    <mat-list-item>可用项目</mat-list-item>
    <mat-list-item disabled>
      禁用项目
    </mat-list-item>
  </mat-list>
</template>

<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
