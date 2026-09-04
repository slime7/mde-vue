<script setup>
import {
  ref, watch,
} from 'vue';
import { useMatTheme } from 'mde-vue';

defineProps({
  /**
   * 是否展示恢复默认主题按钮。
   *
   * @type {boolean}
   * @default true
   */
  showReset: {
    type: Boolean,
    default: true,
  },
});

const theme = useMatTheme();
const seedColorInput = ref(theme.seedColor.value);
const seedColorError = ref('');
const colorPicker = ref(null);

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

function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');
  return '#' + hex;
}

function applyRandomSeedColor() {
  const randomColor = getRandomHexColor();
  seedColorInput.value = randomColor;
  seedColorError.value = '';
  theme.setSeedColor(randomColor);
}

function resetTheme() {
  theme.setMode('system');
  theme.setSeedColor('#20a6fc');
  theme.setSchemeVariant('tonal-spot');
  theme.setContrastLevel(0);
}
</script>

<template>
  <div class="theme-form">
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

    <div class="theme-form__seed-row">
      <mat-text-field
        v-model="seedColorInput"
        class="theme-form__seed-field"
        label="种子色"
        hint="支持 #RGB 或 #RRGGBB"
        :error="Boolean(seedColorError)"
        :error-text="seedColorError"
        @blur="applySeedColor"
        @change="applySeedColor"
      >
        <template #trailing>
          <mat-btn
            class="theme-form__color-button"
            variant="text"
            type="button"
            aria-label="打开种子色选择器"
            title="选择种子色"
            @click="openColorPicker"
          >
            <span
              class="theme-form__color-swatch"
              :style="{ backgroundColor: theme.seedColor.value }"
              aria-hidden="true"
            />
          </mat-btn>
          <input
            ref="colorPicker"
            class="theme-form__color-input"
            type="color"
            :value="theme.seedColor.value"
            aria-label="选择种子色"
            @input="handleColorPickerInput"
          >
        </template>
      </mat-text-field>

      <mat-btn
        class="theme-form__random-button"
        variant="standard"
        icon="casino"
        label="随机种子色"
        title="随机种子色"
        @click="applyRandomSeedColor"
      />
    </div>

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

    <div class="theme-form__slider">
      <div class="theme-form__slider-label">
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

    <div v-if="showReset" class="theme-form__actions">
      <mat-btn variant="outlined" @click="resetTheme">
        恢复默认主题
      </mat-btn>
    </div>
  </div>
</template>

<style scoped>
.theme-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  inline-size: 100%;
}

.theme-form__seed-row {
  display: flex;
  align-items: center;
  gap: 8px;
  inline-size: 100%;
}

.theme-form__seed-field {
  flex: 1 1 auto;
  min-inline-size: 0;
}

.theme-form__random-button {
  flex-shrink: 0;
}

.theme-form__slider {
  display: grid;
  gap: 8px;
}

.theme-form__slider-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--mat-sys-color-on-surface);
}

.theme-form__slider output {
  color: var(--mat-sys-color-primary);
  font-variant-numeric: tabular-nums;
}

.theme-form__color-button {
  min-inline-size: 40px;
  padding-inline: 8px;
}

.theme-form__color-swatch {
  display: block;
  inline-size: 24px;
  block-size: 24px;
  border: 2px solid var(--mat-sys-color-on-surface);
  border-radius: var(--mat-sys-shape-corner-full);
  box-shadow: 0 0 0 1px var(--mat-sys-color-outline-variant);
}

.theme-form__color-input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  opacity: 0;
  pointer-events: none;
}

.theme-form__actions {
  display: flex;
  justify-content: flex-start;
}
</style>
