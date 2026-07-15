<template>
  <form class="example-row" @submit.prevent>
    <mat-list interaction="single-action" aria-label="按钮类型列表" class="example-list">
      <mat-list-item type="submit">
        提交
      </mat-list-item>
      <mat-list-item type="reset">
        重置
      </mat-list-item>
    </mat-list>
  </form>
</template>

<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
