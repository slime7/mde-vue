<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('starred');
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

function handleSelect({ nextSelected }) {
  selected.value = nextSelected;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-lists">
    <section class="example-group">
      <p class="mat-sys-typescale-title-small">
        Segmented
      </p>

      <mat-list
        draggable
        aria-label="可拖动排序分段列表"
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
    </section>

    <section class="example-group">
      <p class="mat-sys-typescale-title-small">
        Standard + selected
      </p>

      <mat-list
        draggable
        aria-label="带选中项的可拖动排序标准列表"
        color="tertiary"
        interaction="single-select"
        :selected="selected"
        variant="standard"
        @reorder="handleReorder"
        @select="handleSelect"
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
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-lists,
.example-group {
  display: flex;
  flex-direction: column;
}

.example-lists {
  gap: 24px;
  inline-size: 100%;
}

.example-group {
  gap: 8px;
}

.example-group > p {
  margin: 0;
}
</style>
<!-- #endregion style -->
