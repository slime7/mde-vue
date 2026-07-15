<template>
  <div class="example-stack">
    <mat-btn>普通宽度</mat-btn>
    <mat-btn block>
      块级宽度
    </mat-btn>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  inline-size: min(100%, 360px);
}
</style>
