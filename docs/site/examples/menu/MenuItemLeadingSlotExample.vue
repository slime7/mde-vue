<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>

<template>
  <div class="example-menu">
    <mat-btn id="leading-slot-menu-trigger" @click="open = !open">
      leading
    </mat-btn>
    <mat-menu
      id="leading-slot-menu"
      v-model="open"
      anchor="leading-slot-menu-trigger"
    >
      <mat-menu-item>
        <template #leading>
          <mat-icon icon="note_add" aria-hidden="true" />
        </template>
        新建文件
      </mat-menu-item>
    </mat-menu>
  </div>
</template>

<style scoped>
.example-menu {
  min-block-size: 160px;
}
</style>
