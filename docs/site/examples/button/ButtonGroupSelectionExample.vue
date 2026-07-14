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
    <mat-icon-btn label="粗体" value="bold">
      format_bold
    </mat-icon-btn>
    <mat-icon-btn label="斜体" value="italic">
      format_italic
    </mat-icon-btn>
  </mat-btn-group>
</template>
