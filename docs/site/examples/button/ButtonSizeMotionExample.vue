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
      <mat-btn
        :size="size"
        variant="filled"
        prefix="bluetooth"
      >
        蓝牙
      </mat-btn>
      <mat-btn
        :size="size"
        variant="outlined"
        prefix="link"
      >
        链接
      </mat-btn>
      <mat-btn
        :size="size"
        variant="standard"
        icon="favorite"
        label="收藏"
      />
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large'];
const size = ref('small');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
