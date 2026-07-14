<script setup>
import { ref } from 'vue';

const withoutIcon = ref(true);
const selectedIcon = ref(true);
const bothIcons = ref(true);
</script>

<template>
  <div class="example-stack">
    <mat-switch v-model="withoutIcon">
      无图标
    </mat-switch>
    <mat-switch v-model="selectedIcon" icons="selected" color="secondary">
      仅显示开启图标
    </mat-switch>
    <mat-switch v-model="bothIcons" icons="both" color="#6750a4">
      显示开启与关闭图标
    </mat-switch>
    <mat-switch disabled>
      禁用设置
    </mat-switch>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
</style>
