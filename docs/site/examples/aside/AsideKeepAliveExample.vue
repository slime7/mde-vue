<!-- #region template -->
<template>
  <div class="aside-keep-alive-wrapper">
    <div class="aside-keep-alive-toolbar">
      <mat-btn size="small" variant="filled" @click="open = !open">
        {{ open ? "收起面板" : "展开面板" }}
      </mat-btn>
      <span class="aside-keep-alive-tip">
        默认保活（unmountOnClose: false），收起后输入内容不丢失
      </span>
    </div>

    <mat-layout class="aside-keep-alive-layout">
      <mat-aside
        :open="open"
        location="start"
        :block-size="200"
        bordered
        class="aside-keep-alive-panel"
      >
        <div class="aside-keep-alive-form">
          <strong>保活面板</strong>
          <input
            v-model="draftText"
            class="aside-keep-alive-input"
            placeholder="输入草稿文字..."
          >
          <small>当前草稿：{{ draftText || "（暂无）" }}</small>
        </div>
      </mat-aside>

      <div class="aside-keep-alive-content">
        <h4>DOM 保活与状态保留</h4>
        <p>Aside 默认采用保活隐藏策略，收起后 DOM 节点保留并注销边缘占用，重新打开时表单与滚动状态完好无损。</p>
      </div>
    </mat-layout>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
const draftText = ref('保留的表单内容');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.aside-keep-alive-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aside-keep-alive-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.aside-keep-alive-tip {
  font-size: 13px;
  color: var(--mat-sys-color-on-surface-variant);
}

.aside-keep-alive-layout {
  min-block-size: 180px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.aside-keep-alive-panel {
  background: var(--mat-sys-color-surface-container);
  color: var(--mat-sys-color-on-surface);
}

.aside-keep-alive-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.aside-keep-alive-input {
  padding: 8px 12px;
  border: 1px solid var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-small);
  background: var(--mat-sys-color-surface);
  color: var(--mat-sys-color-on-surface);
  font-size: 13px;
  outline: none;
}

.aside-keep-alive-input:focus {
  border-color: var(--mat-sys-color-primary);
}

.aside-keep-alive-form small {
  font-size: 12px;
  color: var(--mat-sys-color-on-surface-variant);
}

.aside-keep-alive-content {
  padding: 24px;
  color: var(--mat-sys-color-on-surface);
}

.aside-keep-alive-content h4,
.aside-keep-alive-content p {
  margin: 0;
}

.aside-keep-alive-content p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 13px;
}
</style>
<!-- #endregion style -->
