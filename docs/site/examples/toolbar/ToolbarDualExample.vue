<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(false);
const activeTool = ref('pen');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-dual-example">
    <div class="toolbar-dual-example__canvas">
      <div class="toolbar-dual-example__content">
        <mat-switch v-model="active">
          {{ active ? '隐藏 Toolbar' : '展示 Toolbar' }}
        </mat-switch>
        <p class="toolbar-dual-example__hint">
          白板与绘图工作区：同一容器内容纳两个流式 Toolbar，分别定位在起始端与结束端。
        </p>
      </div>

      <div class="toolbar-dual-example__dock">
        <mat-toolbar
          v-model="active"
          :attach="false"
          variant="floating"
          position="start"
        >
          <mat-btn
            variant="standard"
            icon="undo"
            label="撤销"
          />
          <mat-btn
            variant="standard"
            icon="redo"
            label="重做"
          />
        </mat-toolbar>

        <mat-toolbar
          v-model="active"
          :attach="false"
          variant="floating"
          position="end"
          vibrant
        >
          <mat-btn
            :variant="activeTool === 'pen' ? 'filled' : 'standard'"
            icon="edit"
            label="画笔"
            @click="activeTool = 'pen'"
          />
          <mat-btn
            :variant="activeTool === 'highlighter' ? 'filled' : 'standard'"
            icon="ink_highlighter"
            label="荧光笔"
            @click="activeTool = 'highlighter'"
          />
          <mat-btn
            :variant="activeTool === 'eraser' ? 'filled' : 'standard'"
            icon="ink_eraser"
            label="橡皮擦"
            @click="activeTool = 'eraser'"
          />
          <mat-btn
            :variant="activeTool === 'pointer' ? 'filled' : 'standard'"
            icon="near_me"
            label="选择"
            @click="activeTool = 'pointer'"
          />
          <mat-btn
            variant="standard"
            icon="add"
            label="添加"
          />
          <mat-btn
            variant="standard"
            icon="more_vert"
            label="更多操作"
          />
        </mat-toolbar>
      </div>

      <div
        class="toolbar-dual-example__home-indicator"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.toolbar-dual-example {
  display: flex;
  flex-direction: column;
  block-size: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: var(--mat-sys-color-surface-container-low);
  border-radius: 16px;
}

.toolbar-dual-example__canvas {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-block-size: 260px;
  overflow: hidden;
  background-color: var(--mat-sys-color-surface);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: 24px;
}

.toolbar-dual-example__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  user-select: none;
}

.toolbar-dual-example__hint {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 14px;
  text-align: center;
}

.toolbar-dual-example__dock {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
  min-block-size: 56px;
  padding-inline: 16px;
  padding-block-end: 8px;
  box-sizing: border-box;
}

.toolbar-dual-example__home-indicator {
  inline-size: 134px;
  block-size: 4px;
  margin: 8px auto 10px;
  background-color: var(--mat-sys-color-on-surface);
  border-radius: 2px;
  opacity: .8;
}
</style>
<!-- #endregion style -->
