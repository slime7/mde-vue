<template>
  <div class="example-stack">
    <mat-text-field label="邮箱" type="email" />
    <mat-text-field label="密码" type="password" />
    <mat-text-field label="搜索" type="search" />
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
