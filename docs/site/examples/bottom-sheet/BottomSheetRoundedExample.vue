<!-- #region script -->
<script setup>
import { ref } from 'vue';

const rounded = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="bottom-sheet-rounded-example">
    <mat-btn variant="outlined" @click="rounded = !rounded">
      {{ rounded ? '关闭顶部圆角' : '开启顶部圆角' }}
    </mat-btn>

    <mat-bottom-sheet
      model-value
      variant="standard"
      :rounded="rounded"
    >
      <div class="bottom-sheet-rounded-example__sheet-body">
        <h2>圆角状态</h2>
        <p>当前 rounded：{{ rounded }}。切换时使用快速效果过渡。</p>
      </div>
    </mat-bottom-sheet>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-rounded-example__sheet-body {
  padding: 24px;
}
</style>
<!-- #endregion style -->
