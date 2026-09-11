<!-- #region script -->
<script setup>
import { ref } from 'vue';

const queue = [
  { artist: '林间录音室', title: '清晨的第一段钢琴' },
  { artist: '北岸乐团', title: '海面下的回声' },
  { artist: '单人计划', title: '午夜公路' },
  { artist: '纸飞机乐团', title: '把风留在夏天' },
  { artist: '远山合唱团', title: '归途' },
  { artist: '雨声采样', title: '窗边的三小时' },
];
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
      <p>当前高度：{{ expanded }}。点击按钮或拖动顶部把手，可以在 min、normal、max、full 和自定义高度之间切换。</p>
      <div class="bottom-sheet-expanded-example__actions">
        <mat-btn variant="outlined" @click="expanded = 'min'">
          min
        </mat-btn>
        <mat-btn variant="outlined" @click="expanded = 'normal'">
          normal
        </mat-btn>
        <mat-btn variant="outlined" @click="expanded = 'max'">
          max
        </mat-btn>
        <mat-btn variant="outlined" @click="expanded = 'full'">
          full
        </mat-btn>
        <mat-btn variant="outlined" @click="expanded = '320px'">
          320px
        </mat-btn>
      </div>
      <ol class="bottom-sheet-expanded-example__queue">
        <li v-for="item in queue" :key="item.title">
          <span class="bottom-sheet-expanded-example__title">{{ item.title }}</span>
          <span class="bottom-sheet-expanded-example__artist">{{ item.artist }}</span>
        </li>
      </ol>
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

.bottom-sheet-expanded-example__queue {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.bottom-sheet-expanded-example__queue li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-block: 8px;
  border-block-end: 1px solid var(--mat-sys-color-outline-variant);
}

.bottom-sheet-expanded-example__title {
  color: var(--mat-sys-color-on-surface);
}

.bottom-sheet-expanded-example__artist {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
