<!-- #region script -->
<script setup>
import { ref } from 'vue';

const standardSelected = ref(null);
const segmentedSelected = ref(null);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-grid">
    <section class="example-stack">
      <strong>standard</strong>
      <mat-list
        variant="standard"
        interaction="single-select"
        :selected="standardSelected"
        aria-label="standard 列表"
        @select="standardSelected = $event.nextSelected"
      >
        <mat-list-item value="recent">
          最近更新
          <template #trailing>
            <mat-radio
              :model-value="standardSelected"
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
              :model-value="standardSelected"
              value="name"
              inert
              aria-hidden="true"
              class="selection-indicator"
            />
          </template>
        </mat-list-item>
      </mat-list>
    </section>

    <section class="example-stack">
      <strong>segmented</strong>
      <mat-list
        variant="segmented"
        interaction="single-select"
        :selected="segmentedSelected"
        aria-label="segmented 列表"
        @select="segmentedSelected = $event.nextSelected"
      >
        <mat-list-item value="offline">
          可离线使用
          <template #trailing>
            <mat-radio
              :model-value="segmentedSelected"
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
            <mat-radio
              :model-value="segmentedSelected"
              value="shared"
              inert
              aria-hidden="true"
              class="selection-indicator"
            />
          </template>
        </mat-list-item>
      </mat-list>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 24px;
  inline-size: 100%;
}

.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-inline-size: 0;
}

.selection-indicator {
  pointer-events: none;
}
</style>
<!-- #endregion style -->
