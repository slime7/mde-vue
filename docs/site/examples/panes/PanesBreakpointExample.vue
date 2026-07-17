<script setup>
import { ref } from 'vue';

const sizes = ref({ primary: 2, supporting: 1 });
const breakpoint = ref('等待测量');
const showSupporting = ref(true);

function updateBreakpoint(nextBreakpoint) {
  breakpoint.value = nextBreakpoint;

  if (nextBreakpoint === 'compact') {
    showSupporting.value = false;
  } else {
    showSupporting.value = true;
  }
}
</script>

<template>
  <div class="panes-breakpoint-example">
    <output>当前断点：{{ breakpoint }}</output>

    <div class="panes-breakpoint-example__layout">
      <mat-panes
        :sizes="sizes"
        @update:breakpoint="updateBreakpoint"
        @update:sizes="sizes = $event"
      >
        <mat-pane
          id="primary"
          resize-label="主要内容"
        >
          <div class="panes-breakpoint-example__panel">
            主要内容
          </div>
        </mat-pane>

        <mat-pane
          v-if="showSupporting"
          id="supporting"
          resize-label="辅助内容"
        >
          <div class="panes-breakpoint-example__panel">
            辅助内容
          </div>
        </mat-pane>
      </mat-panes>
    </div>
  </div>
</template>

<style scoped>
.panes-breakpoint-example {
  display: grid;
  gap: 12px;
}

.panes-breakpoint-example__layout {
  block-size: 140px;
  border: 1px solid var(--mat-sys-color-outline-variant);
}

.panes-breakpoint-example__panel {
  display: grid;
  block-size: 100%;
  place-items: center;
  background: var(--mat-sys-color-surface-container-low);
}
</style>
