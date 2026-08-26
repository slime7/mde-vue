<!-- #region script -->
<script setup>
import { ref } from 'vue';

const items = ref(
  Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    title: `列表项 ${index + 1}`,
    description: `这是用于演示虚拟滚动的第 ${index + 1} 个项目数据`,
  })),
);

const selected = ref(null);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="list-virtual-example-container">
    <mat-scroll-area class="list-virtual-example-scroll">
      <mat-list
        virtual
        :items="items"
        :item-height="64"
        interaction="single-select"
        :selected="selected"
        @select="selected = $event.nextSelected"
      >
        <template #default="{ item }">
          <mat-list-item :value="item.id">
            {{ item.title }}
            <template #supporting>
              {{ item.description }}
            </template>
          </mat-list-item>
        </template>
      </mat-list>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.list-virtual-example-container {
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 400px;
}

.list-virtual-example-scroll {
  block-size: 320px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}
</style>
<!-- #endregion style -->

