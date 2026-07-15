<template>
  <div class="split-button-default-example">
    <mat-split-btn>
      <template #leading>
        <mat-btn>新建</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="更多新建方式" />
      </template>
    </mat-split-btn>

    <mat-split-btn block>
      <template #leading>
        <mat-btn>导出</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="更多导出方式" />
      </template>
    </mat-split-btn>
  </div>
</template>

<style scoped>
.split-button-default-example {
  inline-size: min(100%, 360px);
}

.split-button-default-example > :last-child {
  margin-block-start: 12px;
}
</style>
