<script setup>
import { computed, provide, ref, useSlots } from 'vue';
import { withBase } from 'vitepress';
import { MAT_APP_ROOT_KEY } from '../../../../src/components/mat-app-root/mat-app-root-context.js';
import { MAT_SCROLL_AREA_KEY } from '../../../../src/components/scroll-area-context.js';

provide(MAT_APP_ROOT_KEY, null);
provide(MAT_SCROLL_AREA_KEY, null);

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    default: '',
  },
  stacked: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const isCodeOpen = ref(false);

const playgroundUrl = computed(() => (
  props.example ? withBase(`/playground?example=${encodeURIComponent(props.example)}`) : ''
));

const hasCode = computed(() => Boolean(slots.code));

function toggleCode() {
  isCodeOpen.value = !isCodeOpen.value;
}
</script>

<template>
  <div
    class="docs-preview"
    :class="{ 'docs-preview--open': isCodeOpen }"
    role="group"
    :aria-label="label"
  >
    <div class="docs-preview__header">
      <div class="docs-preview__header-left" />
      <div class="docs-preview__header-actions">
        <a
          v-if="playgroundUrl"
          :href="playgroundUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="docs-preview__action-btn"
          title="在演练场中打开"
          aria-label="在演练场中打开"
        >
          <mat-icon icon="terminal" aria-hidden="true" />
        </a>
        <button
          v-if="hasCode"
          type="button"
          class="docs-preview__action-btn"
          :class="{ 'is-active': isCodeOpen }"
          title="查看代码"
          aria-label="查看代码"
          @click="toggleCode"
        >
          <mat-icon icon="code" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div
      v-show="isCodeOpen"
      class="docs-preview__code"
    >
      <slot name="code" />
    </div>

    <div
      class="docs-preview__body"
      :class="{ 'docs-preview__body--stacked': stacked }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.docs-preview {
  margin-block: 16px 24px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-background);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
  overflow: hidden;
}

.docs-preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-block-size: 38px;
  padding: 4px 8px;
  border-block-end: 1px solid var(--mat-sys-color-outline-variant);
  background: var(--mat-sys-color-surface-container-low);
}

.docs-preview__header-left {
  display: flex;
  align-items: center;
}

.docs-preview__header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-inline-start: auto;
}

.docs-preview__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 30px;
  block-size: 30px;
  padding: 0;
  color: var(--mat-sys-color-on-surface-variant);
  background: transparent;
  border: none;
  border-radius: var(--mat-sys-shape-corner-full);
  cursor: pointer;
  text-decoration: none;
  transition: background-color .2s, color .2s;
}

.docs-preview__action-btn:hover {
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-high);
}

.docs-preview__action-btn:active,
.docs-preview__action-btn.is-active {
  color: var(--mat-sys-color-primary);
  background: var(--mat-sys-color-surface-container-highest);
}

.docs-preview__action-btn :deep(.mat-icon) {
  font-size: 20px;
  inline-size: 20px;
  block-size: 20px;
}

.docs-preview__code {
  border-block-end: 1px solid var(--mat-sys-color-outline-variant);
  background: var(--mat-sys-color-surface-container-lowest);
}

.docs-preview__code :deep(.vp-code-group),
.docs-preview__code :deep(.vp-code-group .tabs),
.docs-preview__code :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}

.docs-preview__body {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  min-block-size: 80px;
  padding: 16px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-background);
}

.docs-preview__body--stacked {
  flex-direction: column;
  align-items: stretch;
}

.docs-preview__body > :deep(*) {
  flex-shrink: 1;
  min-inline-size: 0;
}

.docs-preview__body :deep(.docs-preview-menu) {
  min-inline-size: 180px;
  padding: 12px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
  box-shadow: var(--mat-sys-elevation-level2);
}
</style>
