<template>
  <div class="button-group-default-example">
    <mat-btn-group>
      <mat-btn variant="outlined">
        取消
      </mat-btn>
      <mat-btn>保存</mat-btn>
    </mat-btn-group>

    <mat-btn-group block>
      <mat-btn variant="outlined">
        上一步
      </mat-btn>
      <mat-btn>下一步</mat-btn>
    </mat-btn-group>
  </div>
</template>

<style scoped>
.button-group-default-example {
  inline-size: min(100%, 360px);
}

.button-group-default-example > :last-child {
  margin-block-start: 12px;
}
</style>
