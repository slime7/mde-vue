<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
const position = ref('center');

function show(nextPosition) {
  position.value = nextPosition;
  open.value = true;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="snackbar-position-example">
    <mat-btn variant="outlined" @click="show('left')">
      左侧
    </mat-btn>

    <mat-btn variant="outlined" @click="show('center')">
      居中
    </mat-btn>

    <mat-btn variant="outlined" @click="show('right')">
      右侧
    </mat-btn>
  </div>

  <mat-snackbar
    v-model="open"
    closable
    :duration="0"
    :position="position"
    :text="`当前在底部${position === 'center' ? '居中' : position === 'left' ? '左侧' : '右侧'}显示。`"
  />
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.snackbar-position-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
<!-- #endregion style -->
