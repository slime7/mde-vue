<script setup>
import { ref } from 'vue';
import { snackbar } from 'mde-vue';

const firstOpen = ref(false);
const secondOpen = ref(false);
const actionOpen = ref(false);

function record(name) {
  window.pushEvent(name);
}

function openImperative() {
  snackbar({ text: '命令式通知', duration: 600 }).then(() => record('imperative-settled'));
}
</script>

<template>
  <section data-scene="snackbar" class="snackbar-scene">
    <h1>通知场景</h1>

    <mat-btn
      data-testid="open-first"
      @click="firstOpen = true"
    >
      通知甲
    </mat-btn>
    <mat-btn
      data-testid="open-second"
      @click="secondOpen = true"
    >
      通知乙
    </mat-btn>
    <mat-btn
      data-testid="open-action"
      @click="actionOpen = true"
    >
      带操作
    </mat-btn>
    <mat-btn
      data-testid="open-imperative"
      @click="openImperative"
    >
      命令式
    </mat-btn>

    <mat-snackbar
      v-model="firstOpen"
      text="通知甲内容"
      :duration="400"
      @closed="record('first-closed')"
    />
    <mat-snackbar
      v-model="secondOpen"
      text="通知乙内容"
      :duration="400"
    />
    <mat-snackbar
      v-model="actionOpen"
      text="可撤销操作"
      action-text="撤销"
      :duration="0"
      @action="record('action-clicked')"
    />
  </section>
</template>

<style scoped>
.snackbar-scene {
  min-block-size: 100vh;
}
</style>
