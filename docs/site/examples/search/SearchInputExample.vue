<!-- #region script -->
<script setup>
import { ref } from 'vue';

const query = ref('');
const submittedQuery = ref('');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="search-input-example">
    <mat-search
      v-model="query"
      autocomplete="off"
      label="搜索组件"
      :max-length="48"
      placeholder="输入组件名称"
      @search="submittedQuery = $event"
    >
      <template #trailing>
        <mat-btn icon="close" label="清空" size="small" variant="standard" @click="query = ''" />
      </template>
    </mat-search>

    <span aria-live="polite">
      当前输入：{{ query || '无' }}；最近提交：{{ submittedQuery || '无' }}
    </span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.search-input-example {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.search-input-example > :first-child {
  inline-size: 100%;
  max-inline-size: 48rem;
}

.search-input-example > span {
  color: var(--mat-sys-color-on-surface-variant);
  font: var(--mat-sys-typescale-body-medium-weight)
    var(--mat-sys-typescale-body-medium-size) /
    var(--mat-sys-typescale-body-medium-line-height)
    var(--mat-sys-typescale-body-medium-font);
}
</style>
<!-- #endregion style -->
