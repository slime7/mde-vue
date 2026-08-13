<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-btn prefix="send">
      发送
    </mat-btn>

    <mat-btn prefix="send" block>
      发送
    </mat-btn>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
