<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref('normal');
const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn @click="open = true">
    打开 Bottom sheet
  </mat-btn>

  <mat-bottom-sheet
    v-model="open"
    v-model:expanded="expanded"
    variant="modal"
    aria-label="播放队列"
  >
    <div class="bottom-sheet-expanded-example__body">
      <h2>播放队列</h2>
      <p>当前高度：{{ expanded }}。点击按钮或拖动顶部把手，可以在 normal、full 和自定义高度之间切换。</p>
      <div class="bottom-sheet-expanded-example__actions">
        <mat-btn variant="outlined" @click="expanded = 'normal'">
          normal
        </mat-btn>
        <mat-btn variant="outlined" @click="expanded = 'full'">
          full
        </mat-btn>
        <mat-btn variant="outlined" @click="expanded = '320px'">
          320px
        </mat-btn>
      </div>
    </div>
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-expanded-example__body {
  padding: 24px;
}

.bottom-sheet-expanded-example__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
<!-- #endregion style -->
