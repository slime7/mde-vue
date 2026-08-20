<!-- #region script -->
<script setup>
import { ref } from 'vue';

const items = ref([
  { value: 'inbox', label: '收件箱', icon: 'inbox' },
  { value: 'starred', label: '已加星标', icon: 'star' },
  { value: 'archive', label: '归档', icon: 'archive' },
]);

function handleReorder({ fromIndex, toIndex }) {
  const nextItems = [...items.value];
  const [movedItem] = nextItems.splice(fromIndex, 1);

  nextItems.splice(toIndex, 0, movedItem);
  items.value = nextItems;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-list
    draggable
    aria-label="可拖动排序列表"
    class="example-list"
    @reorder="handleReorder"
  >
    <mat-list-item
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <template #leading>
        <mat-icon
          :icon="item.icon"
          aria-hidden="true"
        />
      </template>

      {{ item.label }}

      <template #trailing>
        <mat-icon
          icon="drag_indicator"
          aria-hidden="true"
        />
      </template>
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
