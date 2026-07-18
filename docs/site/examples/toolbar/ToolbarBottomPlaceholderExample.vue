<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(false);
const bottomPlaceholder = ref(0);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-bottom-placeholder-example">
    <mat-btn variant="outlined" @click="active = !active">
      {{ active ? '隐藏 Toolbar' : '展示 Toolbar' }}
    </mat-btn>
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
    <p>bottomPlaceholder 只增加底部手势条或安全区空间，不会开启自然布局占位。</p>

    <mat-toolbar
      v-model="active"
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
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.toolbar-bottom-placeholder-example {
  min-block-size: 180px;
}

.toolbar-bottom-placeholder-example__slider {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
  inline-size: min(100%, 480px);
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
