<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('recent');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-list
    interaction="single-select"
    :selected="selected"
    aria-label="排序方式"
    class="example-list"
    @select="selected = $event.nextSelected"
  >
    <mat-list-item value="recent">
      最近更新
      <template #trailing>
        <mat-radio :model-value="selected" value="recent" inert aria-hidden="true" />
      </template>
    </mat-list-item>
    <mat-list-item value="name">
      名称
      <template #trailing>
        <mat-radio :model-value="selected" value="name" inert aria-hidden="true" />
      </template>
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
<!-- #endregion style -->
