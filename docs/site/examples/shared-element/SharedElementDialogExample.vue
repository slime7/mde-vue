<!-- #region template -->
<template>
  <div class="shared-element-example" :aria-busy="transitioning">
    <ul class="shared-element-example__list" aria-label="旅行相册">
      <mat-card
        v-for="item in items"
        :key="item.id"
        as="li"
        class="shared-element-example__card"
        variant="elevated"
      >
        <mat-card-action-area
          :id="getActivatorId(item.id)"
          :disabled="transitioning"
          @click="openDialog(item)"
        >
          <div class="shared-element-example__row">
            <mat-shared-element
              :name="getSharedName(item.id)"
              class="shared-element-example__media shared-element-example__media--thumbnail"
              :disabled="dialogMounted && selectedItem?.id === item.id"
            >
              <mat-image
                :src="item.source"
                :alt="`${item.title}抽象风景`"
                class="shared-element-example__image"
                radius="12"
                :outline="false"
              />
            </mat-shared-element>

            <mat-card-content class="shared-element-example__summary">
              <mat-text
                type="label"
                size="medium"
                class="shared-element-example__eyebrow"
              >
                {{ item.eyebrow }}
              </mat-text>
              <mat-text type="title" size="medium" emphasized>
                {{ item.title }}
              </mat-text>
            </mat-card-content>
          </div>
        </mat-card-action-area>
      </mat-card>
    </ul>

    <mat-dialog
      v-if="dialogMounted && selectedItem"
      :model-value="dialogOpen"
      class="shared-element-example__dialog"
      width="560"
      :title="selectedItem.title"
      @update:model-value="handleDialogModelValue"
    >
      <div class="shared-element-example__dialog-content">
        <mat-shared-element
          :name="getSharedName(selectedItem.id)"
          class="shared-element-example__media shared-element-example__media--dialog"
        >
          <mat-image
            :src="selectedItem.source"
            :alt="`${selectedItem.title}抽象风景`"
            class="shared-element-example__image"
            radius="16"
            :outline="false"
          />
        </mat-shared-element>

        <mat-text as="p" type="body" size="medium">
          {{ selectedItem.description }}
        </mat-text>
      </div>

      <template #actions>
        <mat-spacer />
        <mat-btn
          variant="filled-tonal"
          :disabled="transitioning"
          @click="closeDialog"
        >
          关闭
        </mat-btn>
      </template>
    </mat-dialog>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import {
  nextTick, ref, useId,
} from 'vue';
import { useMatViewTransition } from 'mde-vue';

function createImageSource(startColor, endColor, mountainColor, foregroundColor) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">'
    + '<defs><linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">'
    + `<stop offset="0" stop-color="${startColor}"/><stop offset="1" stop-color="${endColor}"/>`
    + '</linearGradient></defs>'
    + '<rect width="960" height="540" fill="url(#sky)"/>'
    + '<circle cx="720" cy="150" r="72" fill="#fff" fill-opacity=".62"/>'
    + `<path d="M0 430 250 190 430 360 590 210 960 470V540H0Z" fill="${mountainColor}" fill-opacity=".78"/>`
    + `<path d="M0 475 280 310 470 430 700 290 960 455V540H0Z" fill="${foregroundColor}" fill-opacity=".9"/>`
    + '</svg>',
  );
}

const items = [
  {
    id: 'blue-valley',
    eyebrow: '旅行相册',
    title: '蓝色山谷',
    description: '页面卡片中的缩略图移动到 Dialog，并同步改变位置、尺寸和圆角。',
    source: createImageSource('#0061a4', '#6750a4', '#d0e4ff', '#7fcfff'),
  },
  {
    id: 'green-lake',
    eyebrow: '周末记录',
    title: '绿色湖岸',
    description: '只有当前选中的湖岸图片参与过渡，列表中的其他共享元素保持原位。',
    source: createImageSource('#386a20', '#006c4c', '#c4eed0', '#82d5a7'),
  },
  {
    id: 'warm-dunes',
    eyebrow: '光影收藏',
    title: '暖色沙丘',
    description: '关闭 Dialog 时，同一图片从宽幅媒体缩回对应的列表卡片。',
    source: createImageSource('#984719', '#7d5260', '#ffdbca', '#ffb68d'),
  },
];
const exampleId = useId();
const dialogMounted = ref(false);
const dialogOpen = ref(false);
const selectedItem = ref(null);
const transitioning = ref(false);
const transition = useMatViewTransition();

function getSharedName(itemId) {
  return `shared-photo-${itemId}`;
}

function getActivatorId(itemId) {
  return `${exampleId}-${itemId}`;
}

async function openDialog(item) {
  if (transitioning.value) {
    return;
  }

  transitioning.value = true;

  try {
    await transition.start(async () => {
      selectedItem.value = item;
      dialogMounted.value = true;
      dialogOpen.value = true;
      await nextTick();
      await nextTick();
    }, { names: getSharedName(item.id) });
  } finally {
    transitioning.value = false;
  }
}

async function closeDialog() {
  if (transitioning.value || !dialogOpen.value) {
    return;
  }

  transitioning.value = true;
  const item = selectedItem.value;

  try {
    await transition.start(async () => {
      dialogOpen.value = false;
      dialogMounted.value = false;
      await nextTick();
    }, { names: getSharedName(item.id) });
  } finally {
    transitioning.value = false;
  }

  await nextTick();
  document.getElementById(getActivatorId(item.id))?.focus({ preventScroll: true });
  selectedItem.value = null;
}

function handleDialogModelValue(value) {
  if (!value) {
    closeDialog();
  }
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.shared-element-example__list {
  display: grid;
  inline-size: min(100%, 720px);
  margin: 0;
  padding: 0;
  gap: 12px;
  list-style: none;
}

.shared-element-example__row {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px;
}

.shared-element-example__card {
  min-inline-size: 0;
}

.shared-element-example__media {
  display: block;
  flex-shrink: 0;
  overflow: hidden;
}

.shared-element-example__media--thumbnail {
  inline-size: 104px;
  block-size: 104px;
  border-radius: var(--mat-sys-shape-corner-medium);
}

.shared-element-example__media--dialog {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--mat-sys-shape-corner-large);
}

.shared-element-example__image {
  inline-size: 100%;
  block-size: 100%;
}

.shared-element-example__summary,
.shared-element-example__dialog-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.shared-element-example__summary {
  gap: 4px;
  min-inline-size: 0;
  padding: 0;
}

.shared-element-example__summary > :last-child {
  color: var(--mat-sys-color-on-surface-variant);
  text-wrap: pretty;
}

.shared-element-example__eyebrow {
  color: var(--mat-sys-color-primary);
  font: var(--mat-sys-typescale-label-medium);
}

.shared-element-example__dialog-content {
  gap: 16px;
}

.shared-element-example__dialog-content > p {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  text-wrap: pretty;
}
</style>
<!-- #endregion style -->
