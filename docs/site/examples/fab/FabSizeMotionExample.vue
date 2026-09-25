<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-btn-group
      selection="single"
      :selected="size"
      @select="size = $event.nextSelected"
    >
      <mat-btn
        v-for="option in sizes"
        :key="option"
        :value="option"
      >
        {{ option }}
      </mat-btn>
    </mat-btn-group>

    <div class="example-row">
      <mat-fab
        :size="size"
        icon="add"
        label="新建"
      />
      <mat-fab
        :size="size"
        icon="edit"
        label="编辑"
      >
        编辑
      </mat-fab>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const sizes = ['small', 'medium', 'large'];
const size = ref('medium');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}
</style>
<!-- #endregion style -->
