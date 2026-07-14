<template>
  <mat-list variant="standard" aria-label="账户信息" class="example-list">
    <mat-list-item>
      <template #leading>
        <span class="material-symbols-outlined" aria-hidden="true">person</span>
      </template>
      当前账户
    </mat-list-item>

    <mat-divider inset="start" />

    <mat-list-item>
      <template #leading>
        <span class="material-symbols-outlined" aria-hidden="true">mail</span>
      </template>
      收件箱
      <template #supporting>
        12 封未读邮件
      </template>
      <template #trailing>
        12
      </template>
    </mat-list-item>

    <mat-list-item :lines="3">
      <template #overline>
        今天
      </template>
      设计评审
      <template #supporting>
        请在会议前查看最新的组件交互说明。
      </template>
      <template #trailing>
        10:30
      </template>
    </mat-list-item>
  </mat-list>
</template>

<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
