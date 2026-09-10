<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn @click="open = true">
    编辑播放队列
  </mat-btn>

  <mat-bottom-sheet
    v-model="open"
    variant="modal"
    aria-label="接下来播放"
  >
    <template #drag-handle>
      <span class="bottom-sheet-slots-example__handle" aria-hidden="true" />
    </template>

    <div class="bottom-sheet-slots-example__body">
      <div class="bottom-sheet-slots-example__heading">
        <h2>接下来播放</h2>
        <mat-btn icon="shuffle" label="随机播放" size="small" variant="standard" />
      </div>
      <ol class="bottom-sheet-slots-example__list">
        <li>日落大道</li>
        <li>静谧森林</li>
        <li>夜间列车</li>
      </ol>
    </div>

    <template #footer>
      <mat-spacer />
      <mat-btn variant="filled-tonal" @click="open = false">
        完成
      </mat-btn>
    </template>
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-slots-example__handle {
  display: block;
  inline-size: 40px;
  block-size: 4px;
  background: currentcolor;
  border-radius: 999px;
  opacity: .4;
}

.bottom-sheet-slots-example__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

.bottom-sheet-slots-example__heading {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.bottom-sheet-slots-example__heading h2 {
  margin: 0;
}

.bottom-sheet-slots-example__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-inline-start: 24px;
  margin: 0;
}
</style>
<!-- #endregion style -->
