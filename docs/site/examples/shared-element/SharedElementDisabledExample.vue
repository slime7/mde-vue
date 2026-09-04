<!-- #region template -->
<template>
  <div class="shared-element-disabled-example" :aria-busy="transitioning">
    <mat-switch v-model="disabled" :disabled="transitioning">
      禁用共享元素动画
    </mat-switch>

    <mat-card
      v-if="!detailVisible"
      class="shared-element-disabled-example__surface"
      variant="elevated"
    >
      <mat-card-action-area :disabled="transitioning" @click="toggleDetail">
        <mat-shared-element
          name="disabled-photo-preview"
          class="shared-element-disabled-example__media shared-element-disabled-example__media--preview"
          :disabled="disabled"
        >
          <mat-image
            :src="imageSource"
            alt="紫色山峰抽象风景"
            class="shared-element-disabled-example__image"
            radius="12"
            :outline="false"
          />
        </mat-shared-element>

        <mat-card-content>
          <mat-text type="title" size="medium">
            打开详情
          </mat-text>
        </mat-card-content>
      </mat-card-action-area>
    </mat-card>

    <mat-card
      v-else
      as="section"
      class="shared-element-disabled-example__surface"
      variant="elevated"
      aria-label="图片详情"
    >
      <mat-shared-element
        name="disabled-photo-preview"
        class="shared-element-disabled-example__media shared-element-disabled-example__media--detail"
        :disabled="disabled"
      >
        <mat-image
          :src="imageSource"
          alt="紫色山峰抽象风景"
          class="shared-element-disabled-example__image"
          radius="16"
          :outline="false"
        />
      </mat-shared-element>

      <mat-card-content>
        <mat-text type="title" size="medium">
          图片详情
        </mat-text>
      </mat-card-content>

      <mat-card-actions>
        <mat-btn
          variant="filled-tonal"
          :disabled="transitioning"
          @click="toggleDetail"
        >
          返回
        </mat-btn>
      </mat-card-actions>
    </mat-card>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';
import { useMatViewTransition } from 'mde-vue';

const imageSource = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">'
  + '<rect width="640" height="360" fill="#6750a4"/>'
  + '<circle cx="500" cy="92" r="46" fill="#eaddff"/>'
  + '<path d="M0 315 190 125 320 270 430 165 640 330V360H0Z" fill="#d0bcff"/>'
  + '</svg>',
);
const detailVisible = ref(false);
const disabled = ref(false);
const transitioning = ref(false);
const transition = useMatViewTransition();

async function toggleDetail() {
  if (transitioning.value) {
    return;
  }

  transitioning.value = true;

  try {
    await transition.start(() => {
      detailVisible.value = !detailVisible.value;
    }, { names: 'disabled-photo-preview' });
  } finally {
    transitioning.value = false;
  }
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.shared-element-disabled-example__surface {
  inline-size: min(100%, 280px);
}

.shared-element-disabled-example__media {
  display: block;
  overflow: hidden;
}

.shared-element-disabled-example__media--preview {
  inline-size: 120px;
  block-size: 80px;
  margin-block-start: 16px;
  margin-inline: 16px;
  border-radius: var(--mat-sys-shape-corner-medium);
}

.shared-element-disabled-example__media--detail {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--mat-sys-shape-corner-large);
}

.shared-element-disabled-example__image {
  inline-size: 100%;
  block-size: 100%;
}
</style>
<!-- #endregion style -->
