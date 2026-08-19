<!-- #region template -->
<template>
  <div class="docked-time-picker-example">
    <mat-docked-container
      v-model="open"
      size="medium"
      headline="Select time"
    >
      <template #activator>
        <mat-btn
          variant="filled-tonal"
          icon="schedule"
          @click="open = !open"
        >
          {{ hour }}:{{ minute }} {{ period }}
        </mat-btn>
      </template>

      <div class="time-picker-body">
        <div class="time-inputs-row">
          <div class="time-input-box active">
            {{ hour }}
          </div>
          <span class="time-separator">:</span>
          <div class="time-input-box">
            {{ minute }}
          </div>
          <div class="time-period-toggle">
            <button
              type="button"
              :class="{ selected: period === 'AM' }"
              @click="period = 'AM'"
            >
              AM
            </button>
            <button
              type="button"
              :class="{ selected: period === 'PM' }"
              @click="period = 'PM'"
            >
              PM
            </button>
          </div>
        </div>

        <div class="time-dial-placeholder">
          <div class="time-dial-circle">
            <span class="dial-num num-12">12</span>
            <span class="dial-num num-3">3</span>
            <span class="dial-num num-6">6</span>
            <span class="dial-num num-9">9</span>
            <div class="dial-hand" />
          </div>
        </div>
      </div>

      <template #actions>
        <mat-btn
          variant="standard"
          icon="keyboard"
          aria-label="切换到输入模式"
        />
        <mat-spacer />
        <mat-btn variant="text" @click="open = false">
          Cancel
        </mat-btn>
        <mat-btn variant="text" @click="open = false">
          OK
        </mat-btn>
      </template>
    </mat-docked-container>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
const hour = ref('07');
const minute = ref('00');
const period = ref('AM');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.docked-time-picker-example {
  min-block-size: 200px;
}

.time-picker-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.time-inputs-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.time-input-box {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 80px;
  block-size: 64px;
  font-size: 2rem;
  background: var(--mat-sys-color-surface-container-highest);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.time-input-box.active {
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
}

.time-separator {
  font-size: 2rem;
}

.time-period-toggle {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-small);
}

.time-period-toggle button {
  padding: 6px 12px;
  font-size: var(--mat-sys-typescale-label-medium-size);
  background: transparent;
  border: 0;
  cursor: pointer;
}

.time-period-toggle button.selected {
  background: var(--mat-sys-color-tertiary-container);
}

.time-dial-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 200px;
  block-size: 200px;
  background: var(--mat-sys-color-surface-container-highest);
  border-radius: var(--mat-sys-shape-corner-full);
}

.time-dial-circle {
  position: relative;
  inline-size: 100%;
  block-size: 100%;
}

.dial-num {
  position: absolute;
  font-size: var(--mat-sys-typescale-body-small-size);
}

.num-12 {
  top: 8px;
  left: 50%;
  translate: -50% 0;
}

.num-3 {
  top: 50%;
  right: 8px;
  translate: 0 -50%;
}

.num-6 {
  bottom: 8px;
  left: 50%;
  translate: -50% 0;
}

.num-9 {
  top: 50%;
  left: 8px;
  translate: 0 -50%;
}

.dial-hand {
  position: absolute;
  top: 50%;
  left: 50%;
  inline-size: 2px;
  block-size: 60px;
  background: var(--mat-sys-color-primary);
  transform-origin: top center;
  rotate: 210deg;
}
</style>
<!-- #endregion style -->
