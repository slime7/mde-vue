<script setup>
import { ref } from 'vue';

const sizes = ref({ left: 1, right: 1 });

function onSizes(payload) {
  sizes.value = payload;
  window.pushEvent('sizes', payload);
}

function onWidths(payload) {
  window.pushEvent('widths', payload);
}
</script>

<template>
  <section data-scene="panes" class="panes-scene">
    <h1>分栏场景</h1>

    <mat-panes
      class="panes-stage"
      :sizes="sizes"
      @update:sizes="onSizes"
      @update:widths="onWidths"
    >
      <mat-pane
        id="left"
        class="pane"
        data-testid="pane-left"
      >
        左侧
      </mat-pane>
      <mat-pane
        id="right"
        class="pane"
        data-testid="pane-right"
      >
        右侧
      </mat-pane>
    </mat-panes>
  </section>
</template>

<style scoped>
.panes-scene {
  min-block-size: 100vh;
}

.panes-stage {
  inline-size: 800px;
  max-inline-size: 100%;
  block-size: 400px;
}

.pane {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
