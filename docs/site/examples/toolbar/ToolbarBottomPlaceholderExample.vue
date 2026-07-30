<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(false);
const floatingActive = ref(false);
const bottomPlaceholder = ref(0);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-bottom-placeholder-example">
    <div class="toolbar-bottom-placeholder-example__actions">
      <mat-btn variant="outlined" @click="active = !active">
        {{ active ? '隐藏 Toolbar' : '展示 Toolbar' }}
      </mat-btn>
      <mat-btn variant="outlined" @click="floatingActive = !floatingActive">
        {{ floatingActive ? '隐藏 floating Toolbar' : '展示 floating Toolbar' }}
      </mat-btn>
    </div>
    <div class="toolbar-bottom-placeholder-example__slider">
      <mat-slider
        v-model="bottomPlaceholder"
        aria-label="底部额外占位"
        :max="40"
        :min="0"
        :step="1"
      />
      <output>底部额外占位：{{ bottomPlaceholder }}px</output>
    </div>
    <p>bottomPlaceholder 只增加底部手势条或安全区空间：docked 留在 Toolbar 内，floating 留在悬浮条下方；两者都不会开启自然布局占位。</p>

    <mat-toolbar
      v-model="active"
      app
      :bottom-placeholder="bottomPlaceholder"
    >
      <mat-btn variant="standard">
        取消
      </mat-btn>
      <mat-spacer />
      <mat-btn variant="standard">
        保存
      </mat-btn>
    </mat-toolbar>

    <mat-toolbar
      v-model="floatingActive"
      app
      variant="floating-bottom"
      position="end"
      :bottom-placeholder="bottomPlaceholder"
    >
      <mat-btn variant="standard">
        取消
      </mat-btn>
      <mat-spacer />
      <mat-btn variant="standard">
        应用
      </mat-btn>
    </mat-toolbar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.toolbar-bottom-placeholder-example {
  min-block-size: 220px;
}

.toolbar-bottom-placeholder-example__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar-bottom-placeholder-example__slider {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
  inline-size: 100%;
}

.toolbar-bottom-placeholder-example__slider .mat-slider {
  flex: 1 1 280px;
  min-inline-size: 220px;
}

.toolbar-bottom-placeholder-example__slider output {
  flex: 0 0 auto;
  font-variant-numeric: tabular-nums;
}
</style>
<!-- #endregion style -->
