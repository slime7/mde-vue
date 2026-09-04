<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
const alignment = ref('start');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-alignment-example-shell">
    <div class="navigation-rail-alignment-example-controls">
      <mat-switch v-model="expanded">
        {{ expanded ? '已展开' : '已收回' }}
      </mat-switch>

      <mat-radio-group
        v-model="alignment"
        class="navigation-rail-alignment-example-options"
        label="默认内容对齐"
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
    </div>

    <div class="navigation-rail-alignment-example-layout">
      <mat-navigation-rail
        v-model:expanded="expanded"
        :alignment="alignment"
        aria-label="内容对齐导航"
      >
        <mat-navigation-rail-item icon="home">
          首页
        </mat-navigation-rail-item>
        <mat-navigation-rail-item icon="folder">
          项目
        </mat-navigation-rail-item>
      </mat-navigation-rail>

      <div class="navigation-rail-alignment-example-content">
        默认 Slot 位于剩余空间的 {{ alignment }} 位置。
      </div>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-alignment-example-shell {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  gap: 12px;
}

.navigation-rail-alignment-example-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.navigation-rail-alignment-example-options {
  flex-flow: row wrap;
  align-items: center;
}

.navigation-rail-alignment-example-layout {
  display: flex;
  inline-size: 100%;
  min-block-size: 240px;
  overflow: hidden;
}

.navigation-rail-alignment-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
