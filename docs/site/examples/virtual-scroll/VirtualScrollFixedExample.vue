<!-- #region template -->
<template>
  <div class="virtual-scroll-fixed-example">
    <div class="virtual-scroll-fixed-example__container">
      <mat-virtual-scroll
        :items="items"
        item-height="48"
        as="ul"
        class="virtual-scroll-fixed-example__list"
      >
        <template #default="{ item }">
          <li class="virtual-scroll-fixed-example__item">
            <span class="virtual-scroll-fixed-example__badge">{{ item.id }}</span>
            <span>{{ item.title }}</span>
          </li>
        </template>
      </mat-virtual-scroll>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const items = ref(
  Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    title: `固定高度条目 #${index + 1}`,
  })),
);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.virtual-scroll-fixed-example {
  inline-size: 100%;
}

.virtual-scroll-fixed-example__container {
  block-size: 240px;
  overflow-y: auto;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  background: var(--mat-sys-color-surface-container-low);
}

.virtual-scroll-fixed-example__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.virtual-scroll-fixed-example__item {
  display: flex;
  align-items: center;
  gap: 12px;
  block-size: 48px;
  box-sizing: border-box;
  padding-inline: 16px;
  border-bottom: 1px solid var(--mat-sys-color-outline-variant);
}

.virtual-scroll-fixed-example__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 24px;
  block-size: 24px;
  padding-inline: 6px;
  border-radius: var(--mat-sys-shape-corner-full);
  background: var(--mat-sys-color-primary-container);
  color: var(--mat-sys-color-on-primary-container);
  font-size: 12px;
}
</style>
<!-- #endregion style -->
