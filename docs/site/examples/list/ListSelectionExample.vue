<!-- #region script -->
<script setup>
import { ref } from 'vue';

const singleSelected = ref('recent');
const multipleSelected = ref(['offline']);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-list
      variant="standard"
      interaction="single-select"
      :selected="singleSelected"
      aria-label="排序方式"
      class="example-list"
      @select="singleSelected = $event.nextSelected"
    >
      <mat-list-item value="recent">
        最近更新
        <template #trailing>
          <mat-radio
            :model-value="singleSelected"
            value="recent"
            inert
            aria-hidden="true"
            class="selection-indicator"
          />
        </template>
      </mat-list-item>
      <mat-list-item value="name">
        名称
        <template #trailing>
          <mat-radio
            :model-value="singleSelected"
            value="name"
            inert
            aria-hidden="true"
            class="selection-indicator"
          />
        </template>
      </mat-list-item>
    </mat-list>

    <mat-list
      variant="standard"
      interaction="multi-select"
      :selected="multipleSelected"
      aria-label="筛选条件"
      class="example-list"
      @select="multipleSelected = $event.nextSelected"
    >
      <mat-list-item value="offline">
        可离线使用
        <template #trailing>
          <mat-checkbox
            :model-value="multipleSelected"
            value="offline"
            inert
            aria-hidden="true"
            class="selection-indicator"
          />
        </template>
      </mat-list-item>
      <mat-list-item value="shared">
        与我共享
        <template #trailing>
          <mat-checkbox
            :model-value="multipleSelected"
            value="shared"
            inert
            aria-hidden="true"
            class="selection-indicator"
          />
        </template>
      </mat-list-item>
    </mat-list>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  inline-size: 100%;
}

.example-list {
  inline-size: 100%;
}

.selection-indicator {
  pointer-events: none;
}
</style>
<!-- #endregion style -->
