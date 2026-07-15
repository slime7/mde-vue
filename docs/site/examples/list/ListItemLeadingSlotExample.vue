<template>
  <mat-list aria-label="leading Slot" class="example-list">
    <mat-list-item>
      <template #leading>
        <mat-icon icon="person" aria-hidden="true" />
      </template>
      账户资料
    </mat-list-item>
  </mat-list>
</template>

<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
