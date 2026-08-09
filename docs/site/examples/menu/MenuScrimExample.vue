<!-- #region script -->
<script setup>
import { ref } from 'vue';

const scrimOpen = ref(false);
const noScrimOpen = ref(false);
const backgroundCount = ref(0);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn
      id="scrim-menu-trigger"
      variant="outlined"
      aria-haspopup="menu"
      :aria-expanded="scrimOpen"
      aria-controls="scrim-menu"
      @click="scrimOpen = !scrimOpen"
    >
      默认透明 scrim
    </mat-btn>
    <mat-menu
      id="scrim-menu"
      v-model="scrimOpen"
      anchor="scrim-menu-trigger"
    >
      <mat-menu-item>点击菜单外只关闭菜单</mat-menu-item>
    </mat-menu>

    <mat-btn
      id="no-scrim-menu-trigger"
      variant="outlined"
      aria-haspopup="menu"
      :aria-expanded="noScrimOpen"
      aria-controls="no-scrim-menu"
      @click="noScrimOpen = !noScrimOpen"
    >
      scrim=false
    </mat-btn>
    <mat-menu
      id="no-scrim-menu"
      v-model="noScrimOpen"
      anchor="no-scrim-menu-trigger"
      :scrim="false"
    >
      <mat-menu-item>外部点击可以继续操作</mat-menu-item>
    </mat-menu>

    <mat-btn variant="filled-tonal" @click="backgroundCount += 1">
      背景操作 {{ backgroundCount }}
    </mat-btn>

    <p class="example-menu__hint">
      分别打开两个菜单，再点击“背景操作”比较结果。
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  min-block-size: 180px;
}

.example-menu__hint {
  flex-basis: 100%;
  margin: 0;
}
</style>
<!-- #endregion style -->
