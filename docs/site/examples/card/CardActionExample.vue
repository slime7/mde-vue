<template>
  <div class="example-stack">
    <mat-card as="article">
      <mat-card-action-area type="button">
        <mat-card-content>
          <strong>Card 组件</strong>
          <p>点击内容区查看详情，或使用下方的独立操作。</p>
        </mat-card-content>
      </mat-card-action-area>
      <mat-card-actions>
        <mat-btn variant="text">
          收藏
        </mat-btn>
      </mat-card-actions>
    </mat-card>

    <mat-card as="section" variant="outlined">
      <mat-card-action-area href="/detail" disabled>
        <mat-card-content>暂不可用的详情链接</mat-card-content>
      </mat-card-action-area>
    </mat-card>
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

.example-stack > * {
  inline-size: min(100%, 360px);
}
</style>
