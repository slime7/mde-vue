<script setup>
import { computed } from 'vue';
import { useMatTheme } from 'mdu-ui';

const theme = useMatTheme();

const mode = computed({
  get: () => theme.mode.value,
  set: (value) => theme.setMode(value),
});

const seedColor = computed({
  get: () => theme.seedColor.value,
  set: (value) => theme.setSeedColor(value),
});

const schemeVariant = computed({
  get: () => theme.schemeVariant.value,
  set: (value) => theme.setSchemeVariant(value),
});

const contrastLevel = computed({
  get: () => theme.contrastLevel.value,
  set: (value) => theme.setContrastLevel(Number(value)),
});
const schemeVariants = [
  ['tonal-spot', 'Tonal spot'],
  ['neutral', 'Neutral'],
  ['vibrant', 'Vibrant'],
  ['expressive', 'Expressive'],
];
</script>

<template>
  <div class="theme-playground">
    <section class="control-panel" aria-label="主题设置">
      <label class="control-field">
        <span>模式</span>
        <select v-model="mode">
          <option value="system">跟随系统</option>
          <option value="light">亮色</option>
          <option value="dark">暗色</option>
        </select>
      </label>

      <label class="control-field">
        <span>种子色</span>
        <input v-model="seedColor" type="color">
      </label>

      <label class="control-field">
        <span>配色变体</span>
        <select v-model="schemeVariant">
          <option
            v-for="([value, label]) in schemeVariants"
            :key="value"
            :value="value"
          >
            {{ label }}
          </option>
        </select>
      </label>

      <label class="control-field contrast-field">
        <span>对比度 {{ contrastLevel.toFixed(1) }}</span>
        <input
          v-model="contrastLevel"
          max="1"
          min="-1"
          step="0.1"
          type="range"
        >
      </label>
    </section>

    <p class="resolved-mode">
      当前实际模式：<strong>{{ theme.resolvedMode.value }}</strong>
    </p>

    <section class="tailwind-demo bg-mat-primary text-mat-on-primary rounded-mat-large shadow-mat-level2">
      这个区域使用 Tailwind 的 <code>bg-mat-primary</code>、
      <code>text-mat-on-primary</code>、<code>rounded-mat-large</code> 和
      <code>shadow-mat-level2</code> 语义类。
    </section>
  </div>
</template>

<style scoped>
.theme-playground {
  display: grid;
  gap: 24px;
  margin-block: 24px;
  padding: 24px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.control-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
  background: var(--mat-sys-color-surface-container);
}

.control-field {
  display: grid;
  gap: 8px;
  color: var(--mat-sys-color-on-surface);
  font-family: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  line-height: var(--mat-sys-typescale-label-large-line-height);
}

.control-field select,
.control-field input:not([type='color']) {
  inline-size: 100%;
}

.control-field select {
  min-block-size: 40px;
  padding-inline: 12px;
  border: 1px solid var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-small);
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface);
}

.control-field input[type='color'] {
  inline-size: 100%;
  min-block-size: 40px;
  padding: 3px;
  border: 1px solid var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-small);
  background: var(--mat-sys-color-surface);
}

.contrast-field {
  align-content: start;
}

.resolved-mode {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
}

.tailwind-demo {
  padding: 20px;
}

.tailwind-demo code {
  color: inherit;
  background: color-mix(in srgb, currentcolor 14%, transparent);
}
</style>
