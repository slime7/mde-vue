<template>
  <mat-list aria-label="supporting Slot" class="example-list">
    <mat-list-item>
      收件箱
      <template #supporting>
        12 封未读邮件
      </template>
    </mat-list-item>
  </mat-list>
</template>

<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
