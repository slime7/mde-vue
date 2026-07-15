<script setup>
import { ref } from 'vue';

const selected = ref(['bold']);

function applySelection({ nextSelected }) {
  selected.value = nextSelected;
}
</script>

<template>
  <mat-btn-group
    variant="connected"
    selection="multiple"
    :selected="selected"
    required
    full-width
    @select="applySelection"
  >
    <mat-btn icon="format_bold" label="粗体" value="bold" />
    <mat-btn icon="format_italic" label="斜体" value="italic" />
  </mat-btn-group>
</template>
