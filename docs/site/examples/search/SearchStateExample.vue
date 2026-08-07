<!-- #region template -->
<template>
  <div class="search-state-example">
    <mat-search model-value="不可用" disabled label="禁用搜索" />

    <mat-search model-value="只读内容" readonly label="只读搜索" />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.search-state-example {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.search-state-example > * {
  inline-size: 100%;
  max-inline-size: 45rem;
}
</style>
<!-- #endregion style -->
