<script setup>
import { ref } from 'vue';

const selected = ref(['bold']);
</script>

<template>
  <mat-btn-group
    selection="multiple"
    :selected="selected"
    required
    @select="selected = $event.nextSelected"
  >
    <mat-btn value="bold">
      粗体
    </mat-btn>
    <mat-btn value="italic">
      斜体
    </mat-btn>
  </mat-btn-group>
</template>
