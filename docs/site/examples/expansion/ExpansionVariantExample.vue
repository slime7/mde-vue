<!-- #region template -->
<template>
  <div class="example-column">
    <section>
      <div class="section-title">
        Segmented 分段形态 (2px 间隔，首尾圆角)
      </div>
      <mat-expansion variant="segmented">
        <mat-expansion-panel
          title="分段面板 1"
          :split="false"
        >
          <p class="demo-text">
            分段形态下相邻面板之间保持 2px 间隙。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="分段面板 2"
          :split="false"
        >
          <p class="demo-text">
            中间面板使用 4px 内角。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="分段面板 3"
          :split="false"
        >
          <p class="demo-text">
            末项面板底部使用 16px 外角。
          </p>
        </mat-expansion-panel>
      </mat-expansion>
    </section>

    <section>
      <div class="section-title">
        Standard 连续形态 (0px 紧凑无间隙)
      </div>
      <mat-expansion variant="standard">
        <mat-expansion-panel
          title="连续面板 1"
          :split="false"
        >
          <p class="demo-text">
            连续形态下相邻面板之间无间隙紧贴排列。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="连续面板 2"
          :split="false"
        >
          <p class="demo-text">
            适合紧凑型列表布局。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="连续面板 3"
          :split="false"
        >
          <p class="demo-text">
            末项面板底部保持圆角平滑闭合。
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
