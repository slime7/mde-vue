<!-- #region template -->
<template>
  <p class="message">
    未读消息
    <mat-badge location="inline" :content="8" />
  </p>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.message {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
}
</style>
<!-- #endregion style -->
