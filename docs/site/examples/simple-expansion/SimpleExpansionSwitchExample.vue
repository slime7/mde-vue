<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-switch v-model="open">
      显示详情
    </mat-switch>
    <mat-simple-expansion v-model="open">
      <p class="panel">
        折叠内容由外部开关通过 <code>v-model</code> 驱动，组件自身不渲染触发器；内容保持挂载，折叠时以高度与透明度弹簧过渡收起。
      </p>
    </mat-simple-expansion>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: flex;
  flex-direction: column;
  gap: 12px;
  inline-size: 100%;
}

.panel {
  margin: 0;
  padding: 16px;
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-medium);
  color: var(--mat-sys-color-on-surface);
}
</style>
<!-- #endregion style -->
