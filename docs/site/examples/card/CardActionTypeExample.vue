<template>
  <form class="example-row" @submit.prevent>
    <mat-card class="example-card">
      <mat-card-action-area type="submit">
        <mat-card-content>提交表单</mat-card-content>
      </mat-card-action-area>
    </mat-card>
    <mat-card class="example-card">
      <mat-card-action-area type="reset">
        <mat-card-content>重置表单</mat-card-content>
      </mat-card-action-area>
    </mat-card>
  </form>
</template>

<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-card {
  inline-size: min(100%, 220px);
}
</style>
