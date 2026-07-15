<template>
  <div class="icon-button-default-example">
    <mat-icon-btn label="更多操作">
      more_vert
    </mat-icon-btn>

    <mat-icon-btn label="铺满父元素" block>
      fit_screen
    </mat-icon-btn>
  </div>
</template>

<style scoped>
.icon-button-default-example {
  inline-size: min(100%, 360px);
}

.icon-button-default-example > :last-child {
  margin-block-start: 12px;
}
</style>
