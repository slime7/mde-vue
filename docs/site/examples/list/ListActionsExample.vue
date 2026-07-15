<template>
  <div class="example-stack">
    <mat-list
      variant="segmented"
      interaction="single-action"
      aria-label="设置"
      class="example-list"
    >
      <mat-list-item>
        <template #leading>
          person
        </template>
        个人资料
        <template #trailing>
          <mat-icon icon="chevron_right" size="small" aria-hidden="true" />
        </template>
      </mat-list-item>
      <mat-list-item href="#list-api">
        安全设置
      </mat-list-item>
      <mat-list-item disabled>
        不可用项目
      </mat-list-item>
    </mat-list>

    <mat-list
      interaction="multi-action"
      aria-label="文件"
      class="example-list"
    >
      <mat-list-item>
        项目说明.pdf
        <template #supporting>
          2.4 MB
        </template>
        <template #trailing>
          <mat-icon-btn label="下载">
            download
          </mat-icon-btn>
          <mat-icon-btn label="更多操作">
            more_vert
          </mat-icon-btn>
        </template>
      </mat-list-item>
    </mat-list>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  inline-size: 100%;
}

.example-list {
  inline-size: min(100%, 420px);
}
</style>
