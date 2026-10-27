<!-- #region script -->
<script setup>
const variants = [
  {
    color: 'primary',
    text: '主色用于常规状态通知。',
    title: '主要通知',
  },
  {
    color: 'tertiary',
    text: '第三色用于需要额外区分的事件。',
    title: '特殊通知',
  },
  {
    color: 'error',
    text: '错误色用于需要立即处理的失败结果。',
    title: '操作失败',
  },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-color-example">
    <mat-notification
      v-for="item in variants"
      :key="item.color"
      :closable="false"
      :color="item.color"
      :model-value="true"
      :text="item.text"
      :title="item.title"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-color-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
<!-- #endregion style -->
