<!-- #region template -->
<template>
  <div class="example-column">
    <section>
      <div class="section-title">
        分立列表项模式 (split=true)
      </div>
      <mat-expansion>
        <mat-expansion-panel
          title="首项面板 (顶部 16px 外角，展开为列表项)"
          :split="true"
        >
          <mat-list-item>子项 1-1</mat-list-item>
          <mat-list-item>子项 1-2</mat-list-item>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="中间面板 (4px 内角)"
          :split="true"
        >
          <mat-list-item>子项 2-1</mat-list-item>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="末项面板 (底部 16px 外角)"
          :split="true"
        >
          <mat-list-item>子项 3-1</mat-list-item>
          <mat-list-item>子项 3-2</mat-list-item>
        </mat-expansion-panel>
      </mat-expansion>
    </section>

    <section>
      <div class="section-title">
        一体化连续容器模式 (split=false)
      </div>
      <mat-expansion>
        <mat-expansion-panel
          title="首项一体化面板 (顶部 16px 外角)"
          :split="false"
        >
          <p class="demo-text">
            在同一块连续卡片表面内展开，展开时激活器底边角变为直角，与正文连通。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="中间一体化面板 (4px 内角)"
          :split="false"
        >
          <p class="demo-text">
            中间面板保持 4px 内角节奏。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="末项一体化面板 (底部 16px 外角)"
          :split="false"
        >
          <p class="demo-text">
            末项在折叠与展开时均保持底部 16px 外角。
          </p>
        </mat-expansion-panel>
      </mat-expansion>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  inline-size: 100%;
}

section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-weight: 500;
  font-size: 14px;
}

.demo-text {
  margin: 0;
  line-height: 1.5;
}
</style>
<!-- #endregion style -->
