<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('home');
const expanded = ref(true);
const alignment = ref('center');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-bar-example-shell">
    <div class="navigation-bar-example-controls">
      <mat-switch v-model="expanded">
        {{ expanded ? '图标在左' : '图标在上' }}
      </mat-switch>

      <mat-radio-group
        v-model="alignment"
        class="navigation-bar-example-alignment"
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
    </div>

    <mat-navigation-rail
      v-model="selected"
      :expanded="expanded"
      :alignment="alignment"
      orientation="horizontal"
      aria-label="底部导航"
    >
      <mat-navigation-rail-item value="home" icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="search" icon="search">
        搜索
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="profile" icon="person">
        我的
      </mat-navigation-rail-item>

      <mat-btn>横向模式不会显示</mat-btn>
    </mat-navigation-rail>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-bar-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 112px;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  overflow: hidden;
}

.navigation-bar-example-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.navigation-bar-example-alignment {
  flex-flow: row wrap;
  align-items: center;
}
</style>
<!-- #endregion style -->
