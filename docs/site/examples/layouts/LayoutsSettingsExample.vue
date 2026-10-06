<!-- #region script -->
<script setup>
import { ref } from 'vue';

const defaults = {
  penName: '山鹿',
  language: '简体中文',
  newBookNotice: true,
  goalNotice: false,
  volume: 40,
};

const penName = ref(defaults.penName);
const language = ref(defaults.language);
const newBookNotice = ref(defaults.newBookNotice);
const goalNotice = ref(defaults.goalNotice);
const volume = ref(defaults.volume);

const snackOpen = ref(false);
const snackText = ref('');

const languageItems = ['简体中文', '繁體中文', 'English'];

function restoreDefaults() {
  penName.value = defaults.penName;
  language.value = defaults.language;
  newBookNotice.value = defaults.newBookNotice;
  goalNotice.value = defaults.goalNotice;
  volume.value = defaults.volume;
}

function save() {
  snackText.value = '偏好设置已保存';
  snackOpen.value = true;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    scrollable
    class="layouts-settings-example"
  >
    <mat-app-bar app>
      偏好设置
    </mat-app-bar>

    <mat-scroll-area>
      <mat-container>
        <section class="layouts-settings-example__group">
          <h3>阅读偏好</h3>
          <mat-text-field
            v-model="penName"
            label="笔名"
            supporting-text="展示在书评与笔记的署名"
            class="layouts-settings-example__field"
          />
          <mat-select
            v-model="language"
            label="阅读语言"
            :items="languageItems"
            class="layouts-settings-example__field"
          />
        </section>

        <section class="layouts-settings-example__group">
          <h3>通知与提醒</h3>
          <mat-switch v-model="newBookNotice">
            新书上架提醒
          </mat-switch>
          <mat-switch v-model="goalNotice">
            阅读目标提醒
          </mat-switch>
          <div class="layouts-settings-example__slider">
            <span>提示音量</span>
            <mat-slider
              v-model="volume"
              aria-label="提示音量"
              :max="100"
              :min="0"
              :step="10"
              class="layouts-settings-example__volume"
            />
            <output>{{ volume }}</output>
          </div>
        </section>
      </mat-container>
    </mat-scroll-area>

    <mat-toolbar
      app
      variant="docked"
    >
      <mat-btn
        variant="text"
        @click="restoreDefaults"
      >
        恢复默认
      </mat-btn>
      <mat-spacer />
      <mat-btn @click="save">
        保存更改
      </mat-btn>
    </mat-toolbar>

    <mat-snackbar
      v-model="snackOpen"
      :text="snackText"
    />
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.layouts-settings-example {
  position: relative;
  block-size: 100%;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.layouts-settings-example__group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-block-end: 24px;
}

.layouts-settings-example__group h3 {
  margin: 0;
}

.layouts-settings-example__field {
  inline-size: 100%;
}

.layouts-settings-example__slider {
  display: flex;
  gap: 12px;
  align-items: center;
}

.layouts-settings-example__slider span {
  flex: 0 0 auto;
  color: var(--mat-sys-color-on-surface-variant);
}

.layouts-settings-example__volume {
  flex: 1 1 auto;
  min-inline-size: 0;
}
</style>
<!-- #endregion style -->
