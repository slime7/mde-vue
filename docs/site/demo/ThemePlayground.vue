<script setup>
import { computed, ref } from 'vue';
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
const toggleSelected = ref(false);
const connectedSelected = ref(['bold']);
const splitExpanded = ref(false);

const variants = [
  ['elevated', 'Elevated'],
  ['filled', 'Filled'],
  ['tonal', 'Tonal'],
  ['outlined', 'Outlined'],
  ['text', 'Text'],
];

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

    <section class="demo-section" aria-labelledby="button-demo-title">
      <h2 id="button-demo-title">
        Button
      </h2>

      <div class="button-demo">
        <mat-btn
          v-for="([value, label]) in variants"
          :key="value"
          :variant="value"
        >
          {{ label }}
        </mat-btn>

        <mat-btn
          toggle
          :selected="toggleSelected"
          @click="toggleSelected = !toggleSelected"
        >
          <template #icon>
            ☆
          </template>
          <template #selected-icon>
            ★
          </template>
          收藏
        </mat-btn>

        <mat-btn color="secondary">
          Secondary
        </mat-btn>
        <mat-btn color="#b3261e">
          Custom seed
        </mat-btn>
        <mat-btn disabled>
          Disabled
        </mat-btn>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="icon-button-demo-title">
      <h2 id="icon-button-demo-title">
        Icon button
      </h2>

      <div class="button-demo">
        <mat-icon-btn label="Filled">
          ★
        </mat-icon-btn>
        <mat-icon-btn label="Tonal" variant="tonal">
          ★
        </mat-icon-btn>
        <mat-icon-btn label="Outlined" variant="outlined">
          ★
        </mat-icon-btn>
        <mat-icon-btn label="Standard" variant="standard">
          ★
        </mat-icon-btn>
        <mat-icon-btn label="Wide custom" color="#6750a4" width="wide">
          ★
        </mat-icon-btn>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="button-group-demo-title">
      <h2 id="button-group-demo-title">
        Button group
      </h2>

      <div class="group-demo">
        <mat-btn-group>
          <mat-btn variant="outlined">
            取消
          </mat-btn>
          <mat-btn>保存</mat-btn>
        </mat-btn-group>

        <mat-btn-group
          variant="connected"
          selection="multiple"
          :selected="connectedSelected"
          required
          @select="connectedSelected = $event.nextSelected"
        >
          <mat-icon-btn label="粗体" value="bold">
            B
          </mat-icon-btn>
          <mat-icon-btn label="斜体" value="italic">
            I
          </mat-icon-btn>
          <mat-icon-btn label="下划线" value="underline">
            U
          </mat-icon-btn>
        </mat-btn-group>
      </div>
    </section>

    <section class="demo-section" aria-labelledby="split-button-demo-title">
      <h2 id="split-button-demo-title">
        Split button
      </h2>

      <div class="split-demo">
        <mat-split-btn
          color="#6750a4"
          :expanded="splitExpanded"
          controls="demo-create-menu"
          @update:expanded="splitExpanded = $event"
        >
          <template #leading>
            <mat-btn>新建</mat-btn>
          </template>
          <template #trailing>
            <mat-icon-btn label="更多新建方式">
              ⌄
            </mat-icon-btn>
          </template>
        </mat-split-btn>

        <div v-if="splitExpanded" id="demo-create-menu" class="menu-demo" role="menu">
          新建文档<br>
          新建文件夹
        </div>
      </div>
    </section>

    <section class="tailwind-demo bg-mat-primary text-mat-on-primary rounded-mat-lg shadow-mat-2">
      这个区域使用 Tailwind 的 <code>bg-mat-primary</code>、
      <code>text-mat-on-primary</code>、<code>rounded-mat-lg</code> 和
      <code>shadow-mat-2</code> 语义类。
    </section>
  </div>
</template>

<style scoped>
.theme-playground {
  display: grid;
  gap: 24px;
  margin-block: 24px;
  padding: 24px;
  color: var(--mat-color-on-surface);
  background: var(--mat-color-surface);
  border: 1px solid var(--mat-color-outline-variant);
  border-radius: var(--mat-shape-corner-large);
}

.control-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--mat-color-outline-variant);
  border-radius: var(--mat-shape-corner-large);
  background: var(--mat-color-surface-container);
}

.control-field {
  display: grid;
  gap: 8px;
  color: var(--mat-color-on-surface);
  font-family: var(--mat-type-label-large-font);
  font-size: var(--mat-type-label-large-size);
  font-weight: var(--mat-type-label-large-weight);
  line-height: var(--mat-type-label-large-line-height);
}

.control-field select,
.control-field input:not([type='color']) {
  inline-size: 100%;
}

.control-field select {
  min-block-size: 40px;
  padding-inline: 12px;
  border: 1px solid var(--mat-color-outline);
  border-radius: var(--mat-shape-corner-small);
  color: var(--mat-color-on-surface);
  background: var(--mat-color-surface);
}

.control-field input[type='color'] {
  inline-size: 100%;
  min-block-size: 40px;
  padding: 3px;
  border: 1px solid var(--mat-color-outline);
  border-radius: var(--mat-shape-corner-small);
  background: var(--mat-color-surface);
}

.contrast-field {
  align-content: start;
}

.resolved-mode {
  margin: 0;
  color: var(--mat-color-on-surface-variant);
}

.button-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-section {
  display: grid;
  gap: 12px;
}

.demo-section h2 {
  margin: 0;
  color: var(--mat-color-on-surface);
  font: var(--mat-type-title-medium-weight) var(--mat-type-title-medium-size) / var(--mat-type-title-medium-line-height) var(--mat-type-title-medium-font);
}

.group-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.split-demo {
  display: grid;
  gap: var(--mat-split-btn-menu-gap);
  justify-items: start;
}

.menu-demo {
  min-inline-size: 180px;
  padding: 12px;
  color: var(--mat-color-on-surface);
  background: var(--mat-color-surface-container);
  border-radius: var(--mat-shape-corner-medium);
  box-shadow: var(--mat-shadow-level-2);
}

.tailwind-demo {
  padding: 20px;
}

.tailwind-demo code {
  color: inherit;
  background: color-mix(in srgb, currentcolor 14%, transparent);
}
</style>
