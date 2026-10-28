<script setup>
import { ref } from 'vue';

const open = ref(false);

function record(name) {
  window.pushEvent(name);
}
</script>

<template>
  <section data-scene="side-sheet" class="side-sheet-scene">
    <div class="fixed-actions">
      <mat-btn
        data-testid="open-side-sheet"
        @click="open = true"
      >
        打开侧边面板
      </mat-btn>
    </div>

    <div
      data-testid="host-scroller"
      class="host-scroller"
    >
      <div
        id="side-sheet-host"
        class="sheet-host"
      />
      <div class="host-filler">
        <p>宿主滚动占位</p>
      </div>
    </div>

    <mat-side-sheet
      v-model="open"
      attach="#side-sheet-host"
      variant="modal"
      title="属性面板"
      :closable="false"
      @opened="record('side-sheet-opened')"
      @closed="record('side-sheet-closed')"
    >
      <button
        data-testid="side-sheet-primary"
        type="button"
      >
        应用
      </button>
    </mat-side-sheet>
  </section>
</template>

<style scoped>
.side-sheet-scene {
  min-block-size: 300vh;
}

.fixed-actions {
  position: fixed;
  inset-block-start: 12px;
  inset-inline-start: 12px;
  z-index: 1;
}

.host-scroller {
  block-size: 320px;
  inline-size: min(480px, 100%);
  margin-block-start: 72px;
  overflow: auto;
}

.sheet-host {
  block-size: 1px;
}

.host-filler {
  block-size: 160vh;
}
</style>
