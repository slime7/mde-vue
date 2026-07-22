<script setup>
import {
  computed, ref, watch,
} from 'vue';
import { useMatTheme } from 'mdu-ui';

const theme = useMatTheme();
const seedColorInput = ref(theme.seedColor.value);
const seedColorError = ref('');
const colorPicker = ref(null);

const resolvedModeLabel = computed(() => (
  theme.resolvedMode.value === 'dark' ? '暗色' : '亮色'
));

watch(() => theme.seedColor.value, (value) => {
  seedColorInput.value = value;
});

function applySeedColor() {
  try {
    theme.setSeedColor(seedColorInput.value);
    seedColorError.value = '';
  } catch (error) {
    seedColorError.value = error instanceof Error ? error.message : '请输入合法的十六进制颜色';
  }
}

function openColorPicker() {
  colorPicker.value?.click();
}

/**
 * @param {Event} event
 */
function handleColorPickerInput(event) {
  const input = /** @type {HTMLInputElement} */ (event.target);
  seedColorInput.value = input.value;
  applySeedColor();
}

function resetTheme() {
  theme.setMode('system');
  theme.setSeedColor('#20a6fc');
  theme.setSchemeVariant('tonal-spot');
  theme.setContrastLevel(0);
}
</script>

<template>
  <section class="theme-settings" aria-label="mdu-ui 主题设置">
    <mat-card variant="elevated">
      <mat-card-content>
        <div class="theme-settings__heading">
          <div>
            <p class="theme-settings__eyebrow">
              mdu-ui Theme
            </p>
            <h2>
              主题设置
            </h2>
          </div>
          <mat-icon icon="palette" aria-hidden="true" />
        </div>

        <p class="theme-settings__status">
          当前生效模式：{{ resolvedModeLabel }} · 所有文档组件会同步更新
        </p>

        <mat-radio-group
          :model-value="theme.mode.value"
          label="颜色模式"
          @update:model-value="theme.setMode"
        >
          <mat-radio value="system">
            跟随系统
          </mat-radio>
          <mat-radio value="light">
            亮色
          </mat-radio>
          <mat-radio value="dark">
            暗色
          </mat-radio>
        </mat-radio-group>

        <mat-text-field
          v-model="seedColorInput"
          label="种子色"
          hint="支持 #RGB 或 #RRGGBB"
          :error="Boolean(seedColorError)"
          :error-text="seedColorError"
          @blur="applySeedColor"
          @change="applySeedColor"
        >
          <template #trailing>
            <mat-btn
              class="theme-settings__color-button"
              variant="text"
              type="button"
              aria-label="打开种子色选择器"
              title="选择种子色"
              @click="openColorPicker"
            >
              <span
                class="theme-settings__color-swatch"
                :style="{ backgroundColor: theme.seedColor.value }"
                aria-hidden="true"
              />
            </mat-btn>
            <input
              ref="colorPicker"
              class="theme-settings__color-input"
              type="color"
              :value="theme.seedColor.value"
              aria-label="选择种子色"
              @input="handleColorPickerInput"
            >
          </template>
        </mat-text-field>

        <mat-radio-group
          :model-value="theme.schemeVariant.value"
          label="配色变体"
          @update:model-value="theme.setSchemeVariant"
        >
          <mat-radio value="tonal-spot">
            Tonal spot
          </mat-radio>
          <mat-radio value="neutral">
            Neutral
          </mat-radio>
          <mat-radio value="vibrant">
            Vibrant
          </mat-radio>
          <mat-radio value="expressive">
            Expressive
          </mat-radio>
        </mat-radio-group>

        <div class="theme-settings__slider">
          <div class="theme-settings__slider-label">
            <span>对比度</span>
            <output>{{ theme.contrastLevel.value.toFixed(2) }}</output>
          </div>
          <mat-slider
            :model-value="theme.contrastLevel.value"
            :min="-1"
            :max="1"
            :step="0.05"
            aria-label="对比度"
            @update:model-value="theme.setContrastLevel"
          />
        </div>

        <mat-btn variant="outlined" @click="resetTheme">
          恢复默认主题
        </mat-btn>
      </mat-card-content>
    </mat-card>
  </section>
</template>

<style scoped>
.theme-settings {
  margin-block: 24px;
}

.theme-settings :deep(.mat-card-content) {
  display: grid;
  gap: 24px;
}

.theme-settings__heading,
.theme-settings__slider-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.theme-settings__heading h2 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-headline-small-weight) var(--mat-sys-typescale-headline-small-size) / var(--mat-sys-typescale-headline-small-line-height) var(--mat-sys-typescale-headline-small-font);
}

.theme-settings__eyebrow,
.theme-settings__status {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
}

.theme-settings__eyebrow {
  font: var(--mat-sys-typescale-label-medium-weight) var(--mat-sys-typescale-label-medium-size) / var(--mat-sys-typescale-label-medium-line-height) var(--mat-sys-typescale-label-medium-font);
  letter-spacing: var(--mat-sys-typescale-label-medium-tracking);
  text-transform: uppercase;
}

.theme-settings__slider {
  display: grid;
  gap: 8px;
}

.theme-settings__slider output {
  color: var(--mat-sys-color-primary);
  font-variant-numeric: tabular-nums;
}

.theme-settings__color-button {
  min-inline-size: 40px;
  padding-inline: 8px;
}

.theme-settings__color-swatch {
  display: block;
  inline-size: 24px;
  block-size: 24px;
  border: 2px solid var(--mat-sys-color-on-surface);
  border-radius: var(--mat-sys-shape-corner-full);
  box-shadow: 0 0 0 1px var(--mat-sys-color-outline-variant);
}

.theme-settings__color-input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
