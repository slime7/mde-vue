<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const variant = ref('docked');
const vibrant = ref(false);
const isFloating = computed(() => variant.value.startsWith('floating'));
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-variant-example">
    <div class="toolbar-variant-example__controls">
      <mat-btn
        v-for="item in ['docked', 'floating-bottom', 'floating-left', 'floating-right']"
        :key="item"
        variant="outlined"
        :selected="variant === item"
        @click="variant = item"
      >
        {{ item }}
      </mat-btn>
      <mat-btn
        variant="text"
        :selected="vibrant"
        @click="vibrant = !vibrant"
      >
        {{ vibrant ? 'standard' : 'vibrant' }}
      </mat-btn>
    </div>

    <mat-toolbar
      :variant="variant"
      :vibrant="vibrant"
    >
      <mat-btn variant="standard">
        编辑
      </mat-btn>
      <mat-btn variant="standard">
        分享
      </mat-btn>

      <template v-if="isFloating" #fab>
        <button class="toolbar-variant-example__fab" type="button">
          +
        </button>
      </template>
    </mat-toolbar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.toolbar-variant-example {
  min-block-size: 240px;
}

.toolbar-variant-example__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar-variant-example__fab {
  inline-size: 56px;
  block-size: 56px;
  color: var(--mat-sys-color-on-primary);
  background: var(--mat-sys-color-primary);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
  box-shadow: var(--mat-sys-elevation-level3);
  font-size: 24px;
  cursor: pointer;
}
</style>
<!-- #endregion style -->
