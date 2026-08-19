<!-- #region template -->
<template>
  <div class="docked-size-examples">
    <mat-docked-container v-model="openSmall" size="small" headline="Small (280px)">
      <template #activator>
        <mat-btn variant="outlined" @click="openSmall = !openSmall">
          Small (280px)
        </mat-btn>
      </template>
      <p>紧凑型尺寸，适合简要操作或单项输入。</p>
    </mat-docked-container>

    <mat-docked-container v-model="openMedium" size="medium" headline="Medium (328px)">
      <template #activator>
        <mat-btn variant="outlined" @click="openMedium = !openMedium">
          Medium (328px)
        </mat-btn>
      </template>
      <p>标准选择器尺寸，符合 MD3 时间/日期选择规范。</p>
    </mat-docked-container>

    <mat-docked-container v-model="openLarge" size="large" headline="Large (560px)">
      <template #activator>
        <mat-btn variant="outlined" @click="openLarge = !openLarge">
          Large (560px)
        </mat-btn>
      </template>
      <p>宽幅尺寸，适合复杂表单或横向排版。</p>
    </mat-docked-container>

    <mat-docked-container v-model="openCustom" width="400px" headline="自定义 400px">
      <template #activator>
        <mat-btn variant="outlined" @click="openCustom = !openCustom">
          自定义 400px
        </mat-btn>
      </template>
      <p>显式传入 width 可以精确指定宽度。</p>
    </mat-docked-container>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const openSmall = ref(false);
const openMedium = ref(false);
const openLarge = ref(false);
const openCustom = ref(false);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.docked-size-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  min-block-size: 140px;
}
</style>
<!-- #endregion style -->
