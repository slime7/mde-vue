<!-- #region script -->
<script setup>
import { ref } from 'vue';

const query = ref('Material');
const submittedQuery = ref('');

function submitSearch() {
  submittedQuery.value = query.value;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="search-slots-example">
    <mat-search v-model="query" label="搜索内容" @search="submittedQuery = $event">
      <template #leading>
        <mat-btn
          icon="search"
          label="提交搜索"
          size="small"
          type="button"
          variant="standard"
          @click="submitSearch"
        />
      </template>

      <template #trailing>
        <mat-btn icon="close" label="清空" size="small" variant="standard" @click="query = ''" />
      </template>
    </mat-search>

    <span aria-live="polite">最近提交：{{ submittedQuery || '无' }}</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.search-slots-example {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.search-slots-example > :first-child {
  inline-size: 100%;
  max-inline-size: 45rem;
}

.search-slots-example > span {
  color: var(--mat-sys-color-on-surface-variant);
  font: var(--mat-sys-typescale-body-medium-weight)
    var(--mat-sys-typescale-body-medium-size) /
    var(--mat-sys-typescale-body-medium-line-height)
    var(--mat-sys-typescale-body-medium-font);
}
</style>
<!-- #endregion style -->
