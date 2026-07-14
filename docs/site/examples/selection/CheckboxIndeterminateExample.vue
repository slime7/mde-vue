<script setup>
import { computed, ref } from 'vue';

const permissions = ref(['read']);
const allChecked = computed(() => permissions.value.length === 2);
const partiallyChecked = computed(() => (
  permissions.value.length > 0 && !allChecked.value
));

function toggleAll(checked) {
  permissions.value = checked ? ['read', 'write'] : [];
}
</script>

<template>
  <div class="example-stack">
    <mat-checkbox
      :model-value="allChecked"
      :indeterminate="partiallyChecked"
      color="#6750a4"
      @update:model-value="toggleAll"
    >
      全部权限
    </mat-checkbox>
    <div class="example-children">
      <mat-checkbox v-model="permissions" value="read">
        读取
      </mat-checkbox>
      <mat-checkbox v-model="permissions" value="write">
        写入
      </mat-checkbox>
    </div>
  </div>
</template>

<style scoped>
.example-stack,
.example-children {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.example-stack {
  gap: 8px;
}

.example-children {
  gap: 0;
  padding-inline-start: 24px;
}
</style>
