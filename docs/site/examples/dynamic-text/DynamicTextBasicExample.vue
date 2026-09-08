<!-- #region script -->
<script setup>
import { ref } from 'vue';

const count = ref(0);

function increase() {
  count.value += 1;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-dynamic-text :text="`共 ${count} 条新消息`" />
    <mat-btn @click="increase">
      增加消息
    </mat-btn>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
</style>
<!-- #endregion style -->
