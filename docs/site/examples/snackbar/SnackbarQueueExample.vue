<script setup>
import { ref } from 'vue';

const first = ref(false);
const second = ref(false);
const third = ref(false);

function showAll() {
  first.value = true;
  second.value = true;
  third.value = true;
}
</script>

<template>
  <mat-btn @click="showAll">
    连续显示三条通知
  </mat-btn>

  <mat-snackbar
    v-model="first"
    :duration="1600"
    text="第一条通知"
  />

  <mat-snackbar
    v-model="second"
    :duration="1600"
    text="第二条通知"
  />

  <mat-snackbar
    v-model="third"
    :duration="1600"
    text="第三条通知"
  />
</template>
