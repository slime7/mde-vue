<template>
  <div class="example-stack">
    <mat-text-field label="有标签的输入框" />
    <mat-text-field label="带占位提示" placeholder="请输入内容" />
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: min(100%, 360px);
}
</style>
