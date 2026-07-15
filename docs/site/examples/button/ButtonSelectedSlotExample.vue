<template>
  <mat-btn toggle :selected="true">
    默认标签
    <template #selected>
      选中 Slot 标签
    </template>
  </mat-btn>
</template>
