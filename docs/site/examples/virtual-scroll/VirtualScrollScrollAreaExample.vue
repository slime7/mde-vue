<!-- #region template -->
<template>
  <div class="virtual-scroll-scroll-area-example">
    <mat-scroll-area
      color="surface-container"
      rounded
      class="virtual-scroll-scroll-area-example__area"
    >
      <mat-virtual-scroll
        :items="items"
        item-height="44"
      >
        <template #default="{ item }">
          <div class="virtual-scroll-scroll-area-example__item">
            <mat-icon icon="folder" />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </mat-virtual-scroll>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const items = ref(
  Array.from({ length: 800 }, (_, index) => ({
    id: index + 1,
    label: `目录文件项 ${index + 1}`,
  })),
);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.virtual-scroll-scroll-area-example {
  inline-size: 100%;
}

.virtual-scroll-scroll-area-example__area {
  block-size: 240px;
}

.virtual-scroll-scroll-area-example__item {
  display: flex;
  align-items: center;
  gap: 12px;
  block-size: 44px;
  padding-inline: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--mat-sys-color-outline-variant);
}
</style>
<!-- #endregion style -->
