<!-- #region script -->
<script setup>
import { ref } from 'vue';

const singleValue = ref('nut-free');
const multiValue = ref(['nut-free', 'vegan']);
const items = [
  { title: 'Gluten-free', value: 'gluten-free' },
  { title: 'Kosher', value: 'kosher' },
  { title: 'Nut-free', value: 'nut-free' },
  { title: 'Vegan', value: 'vegan' },
  { title: 'Vegetarian', value: 'vegetarian' },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="select-indicator-demo">
    <mat-select
      v-model="singleValue"
      label="Diet（单选 check）"
      :items="items"
    />

    <mat-select
      v-model="multiValue"
      label="Diet（多选 check）"
      :items="items"
      multiple
    />

    <mat-select
      v-model="multiValue"
      label="Diet（多选 checkbox）"
      :items="items"
      multiple
      selection-indicator="checkbox"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.select-indicator-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-inline-size: 320px;
}
</style>
<!-- #endregion style -->
