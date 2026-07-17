<!-- #region script -->
<script setup>
import { ref } from 'vue';

const duration = ref(1500);
const open = ref(false);

function show(nextDuration) {
  duration.value = nextDuration;
  open.value = true;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="snackbar-duration-example">
    <mat-btn variant="outlined" @click="show(1500)">
      1.5 秒
    </mat-btn>

    <mat-btn variant="outlined" @click="show(0)">
      常驻
    </mat-btn>
  </div>

  <mat-snackbar
    v-model="open"
    closable
    :duration="duration"
    :text="duration === 0 ? '常驻通知，需要手动关闭。' : '这条通知将在 1.5 秒后关闭。'"
  />
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.snackbar-duration-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
<!-- #endregion style -->
