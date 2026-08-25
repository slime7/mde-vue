<!-- #region template -->
<template>
  <div class="example-column">
    <section>
      <div class="section-title">
        Primary 容器语义色
      </div>
      <mat-expansion color="primary">
        <mat-expansion-panel
          title="Primary 面板 1"
          :split="false"
        >
          <p class="demo-text">
            使用 primary-container 容器色与 on-primary-container 文本色。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="Primary 面板 2"
          :split="false"
        >
          <p class="demo-text">
            子面板统一继承容器配色。
          </p>
        </mat-expansion-panel>
      </mat-expansion>
    </section>

    <section>
      <div class="section-title">
        Tertiary 与面板局部覆盖色
      </div>
      <mat-expansion color="tertiary">
        <mat-expansion-panel
          title="Tertiary 继承面板"
          :split="false"
        >
          <p class="demo-text">
            继承容器的 tertiary 配色。
          </p>
        </mat-expansion-panel>
        <mat-expansion-panel
          title="Secondary 局部覆盖面板"
          color="secondary"
          :split="false"
        >
          <p class="demo-text">
            面板自身设置 color="secondary" 覆盖容器色。
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
