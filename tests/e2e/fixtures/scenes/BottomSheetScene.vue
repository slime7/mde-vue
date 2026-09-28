<script setup>
import { ref } from 'vue';

const open = ref(false);
const expanded = ref('normal');

function record(name, payload = null) {
  window.pushEvent(name, payload);
}

function onExpanded(value) {
  expanded.value = value;
  record('expanded', value);
}
</script>

<template>
  <section data-scene="bottom-sheet" class="sheet-scene">
    <h1>底部面板场景</h1>

    <mat-btn
      data-testid="open-sheet"
      @click="open = true"
    >
      打开底部面板
    </mat-btn>
    <p>
      当前档位：<span data-testid="expanded-tier">{{ expanded }}</span>
    </p>

    <mat-bottom-sheet
      v-model="open"
      :expanded="expanded"
      variant="modal"
      drag-handle
      drag-handle-label="调整面板高度"
      collapse-drag-handle-label="调整面板高度"
      expanded-drag-handle-label="调整面板高度"
      @update:expanded="onExpanded"
      @opened="record('opened')"
      @closed="record('closed')"
    >
      <div
        class="sheet-content"
        data-testid="sheet-content"
      >
        <p>面板内容</p>
      </div>
      <template #footer>
        <p>底部信息</p>
      </template>
    </mat-bottom-sheet>
  </section>
</template>

<style scoped>
.sheet-scene {
  min-block-size: 100vh;
}

.sheet-content {
  block-size: 480px;
  overflow: hidden auto;
}
</style>
