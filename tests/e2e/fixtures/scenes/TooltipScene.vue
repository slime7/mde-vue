<script setup>
import { ref } from 'vue';

const controlled = ref(false);
</script>

<template>
  <section data-scene="tooltip" class="tooltip-scene">
    <h1>工具提示场景</h1>

    <mat-tooltip
      content="自动提示内容"
      :open-delay="100"
      :close-delay="100"
    >
      <template #activator>
        <mat-btn data-testid="hover-target">
          悬停目标
        </mat-btn>
      </template>
    </mat-tooltip>

    <mat-tooltip :model-value="controlled">
      <template #activator>
        <mat-btn
          data-testid="controlled-target"
          @click="controlled = !controlled"
        >
          受控目标
        </mat-btn>
      </template>
      受控提示内容
    </mat-tooltip>

    <div class="top-corner">
      <mat-tooltip content="边缘提示内容">
        <template #activator>
          <mat-btn data-testid="edge-target">
            边缘目标
          </mat-btn>
        </template>
      </mat-tooltip>
    </div>
  </section>
</template>

<style scoped>
.tooltip-scene {
  min-block-size: 100vh;
}

.top-corner {
  position: fixed;
  inset-block-start: 4px;
  inset-inline-start: 40px;
}
</style>
