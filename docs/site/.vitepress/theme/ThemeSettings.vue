<script setup>
import { computed } from 'vue';
import { useMatTheme } from 'mde-vue';
import ThemeForm from './ThemeForm.vue';

const theme = useMatTheme();

const resolvedModeLabel = computed(() => (
  theme.resolvedMode.value === 'dark' ? '暗色' : '亮色'
));
</script>

<template>
  <section class="theme-settings" aria-label="mde-vue 主题设置">
    <mat-card variant="elevated">
      <mat-card-content>
        <div class="theme-settings__heading">
          <div>
            <p class="theme-settings__eyebrow">
              mde-vue Theme
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

        <ThemeForm />
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

.theme-settings__heading {
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
</style>
