<!-- #region script -->
<script setup>
import { ref } from 'vue';

const shadow = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="bottom-sheet-shadow-example">
    <mat-btn variant="outlined" @click="shadow = !shadow">
      {{ shadow ? '关闭阴影' : '开启阴影' }}
    </mat-btn>

    <mat-bottom-sheet
      model-value
      variant="standard"
      :shadow="shadow"
    >
      <h2>阴影状态</h2>
      <p>当前 shadow：{{ shadow }}。切换时使用快速效果过渡。</p>
    </mat-bottom-sheet>
  </div>
</template>
<!-- #endregion template -->
