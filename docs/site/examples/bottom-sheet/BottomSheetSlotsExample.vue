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

  <mat-bottom-sheet v-model="open" variant="modal" closable>
    <template #title>
      接下来播放
    </template>

    <template #actions>
      <mat-btn icon="shuffle" label="随机播放" size="small" variant="standard" />
    </template>

    <ol class="bottom-sheet-slots-example__list">
      <li>日落大道</li>
      <li>静谧森林</li>
      <li>夜间列车</li>
    </ol>

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
.bottom-sheet-slots-example__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-inline-start: 24px;
  margin: 0;
}
</style>
<!-- #endregion style -->
