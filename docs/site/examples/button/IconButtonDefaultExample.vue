<template>
  <div class="icon-button-default-example">
    <mat-btn icon="more_vert" label="更多操作" />

    <mat-btn icon="fit_screen" label="铺满父元素" block />
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
