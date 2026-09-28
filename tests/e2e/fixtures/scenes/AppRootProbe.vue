<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useMatApp } from 'mde-vue';

const { layout, registerEdge } = useMatApp();
const firstTop = ref(null);
const secondTop = ref(null);
const side = ref(null);
let firstTopEdge = null;
let secondTopEdge = null;
let sideEdge = null;

const paddingText = computed(() => JSON.stringify(layout.padding));

onMounted(() => {
  firstTopEdge = registerEdge({ edge: 'top', element: firstTop.value });
  sideEdge = registerEdge({ edge: 'end', element: side.value });
});

onBeforeUnmount(() => {
  firstTopEdge?.unregister();
  secondTopEdge?.unregister();
  sideEdge?.unregister();
});

function addSecondTop() {
  secondTopEdge = registerEdge({ edge: 'top', element: secondTop.value });
}

function removeFirstTop() {
  firstTopEdge?.unregister();
  firstTopEdge = null;
}
</script>

<template>
  <div>
    <div
      ref="firstTop"
      class="bar bar-top"
      data-testid="edge-first-top"
    >
      顶部边缘一
    </div>
    <div
      ref="secondTop"
      class="bar bar-second"
    >
      顶部边缘二
    </div>
    <div
      ref="side"
      class="bar bar-side"
      data-testid="edge-side"
    >
      侧缘
    </div>

    <p>
      padding：
      <span data-testid="padding">{{ paddingText }}</span>
    </p>
    <p>
      断点：<span data-testid="breakpoint">{{ layout.breakpoint }}</span>
    </p>
    <mat-btn
      data-testid="add-top-edge"
      @click="addSecondTop"
    >
      叠加顶部边缘
    </mat-btn>
    <mat-btn
      data-testid="remove-top-edge"
      @click="removeFirstTop"
    >
      移除首个顶部边缘
    </mat-btn>
  </div>
</template>

<style scoped>
.bar-top {
  block-size: 48px;
}

.bar-second {
  block-size: 36px;
}

.bar-side {
  inline-size: 120px;
  block-size: 32px;
}
</style>
