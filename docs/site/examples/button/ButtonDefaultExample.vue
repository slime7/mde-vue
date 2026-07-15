<template>
  <div class="button-default-example">
    <mat-btn>确认</mat-btn>

    <mat-btn block>
      铺满父元素
    </mat-btn>
  </div>
</template>

<style scoped>
.button-default-example {
  inline-size: min(100%, 360px);
}

.button-default-example > :last-child {
  margin-block-start: 12px;
}
</style>
