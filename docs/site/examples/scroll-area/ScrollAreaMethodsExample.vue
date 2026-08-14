<!-- #region template -->
<template>
  <div class="scroll-area-methods-example">
    <div class="scroll-area-methods-example__actions">
      <mat-btn variant="outlined" @click="scrollToStart">
        回到开头
      </mat-btn>
      <mat-btn @click="scrollToEnd">
        前往末尾
      </mat-btn>
    </div>

    <mat-scroll-area
      ref="area"
      class="scroll-area-methods-example__area"
      color="surface-container-low"
      rounded
      aria-label="可命令滚动的列表"
      tabindex="0"
    >
      <p v-for="index in 20" :key="index">
        项目 {{ index }}
      </p>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const area = ref(null);

function scrollToStart() {
  area.value?.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToEnd() {
  const scroller = area.value?.getScroller();

  if (scroller) {
    area.value.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
  }
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.scroll-area-methods-example {
  inline-size: 100%;
}

.scroll-area-methods-example__actions {
  display: flex;
  gap: 8px;
  margin-block-end: 16px;
}

.scroll-area-methods-example__area {
  block-size: 200px;
  padding-inline: 16px;
}
</style>
<!-- #endregion style -->
