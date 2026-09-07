<!-- #region script -->
<script setup>
import { ref } from 'vue';

const alignment = ref('start');
const selected = ref('explore');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-bar-align-shell">
    <mat-radio-group
      v-model="alignment"
      class="navigation-bar-align-controls"
      label="内容对齐"
    >
      <mat-radio value="start">
        起始
      </mat-radio>
      <mat-radio value="center">
        居中
      </mat-radio>
      <mat-radio value="end">
        末尾
      </mat-radio>
    </mat-radio-group>

    <mat-layout class="navigation-bar-align-layout">
      <div class="navigation-bar-align-content">
        子项在横向主轴按 {{ alignment }} 对齐
      </div>

      <mat-navigation-bar
        v-model="selected"
        :alignment="alignment"
        aria-label="对齐示例导航"
      >
        <mat-navigation-bar-item value="explore" icon="explore">
          探索
        </mat-navigation-bar-item>
        <mat-navigation-bar-item value="favorites" icon="favorite">
          收藏
        </mat-navigation-bar-item>
      </mat-navigation-bar>
    </mat-layout>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-bar-align-shell {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  gap: 12px;
}

.navigation-bar-align-controls {
  flex-flow: row wrap;
  align-items: center;
}

.navigation-bar-align-layout {
  inline-size: 100%;
  min-block-size: 180px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.navigation-bar-align-content {
  display: grid;
  min-inline-size: 0;
  min-block-size: 180px;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
