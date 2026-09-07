<!-- #region template -->
<template>
  <div class="aside-order-stack">
    <mat-layout class="aside-order-item">
      <mat-aside
        location="top"
        :block-size="56"
        as="header"
        bordered
        class="aside-order-item__top"
      >
        <div class="aside-order-item__header-content">
          <strong>顶部栏</strong>
        </div>
      </mat-aside>

      <mat-aside
        location="left"
        :block-size="160"
        as="nav"
        bordered
        class="aside-order-item__left"
      >
        <div class="aside-order-item__nav-content">
          <strong>侧边栏</strong>
        </div>
      </mat-aside>

      <main class="aside-order-item__main">
        <h4>头部栏在前</h4>
        <p>顶部栏先声明并占满整宽，侧边栏高度从顶部栏下方开始延伸。</p>
      </main>
    </mat-layout>

    <mat-layout class="aside-order-item">
      <mat-aside
        location="left"
        :block-size="160"
        as="nav"
        bordered
        class="aside-order-item__left"
      >
        <div class="aside-order-item__nav-content">
          <strong>侧边栏</strong>
        </div>
      </mat-aside>

      <mat-aside
        location="top"
        :block-size="56"
        as="header"
        bordered
        class="aside-order-item__top"
      >
        <div class="aside-order-item__header-content">
          <strong>顶部栏</strong>
        </div>
      </mat-aside>

      <main class="aside-order-item__main">
        <h4>侧边栏在前</h4>
        <p>侧边栏先声明并占满整高，顶部栏横向起点避让侧边栏宽度。</p>
      </main>
    </mat-layout>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.aside-order-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aside-order-item {
  min-block-size: 180px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.aside-order-item__top {
  background: var(--mat-sys-color-primary-container);
  color: var(--mat-sys-color-on-primary-container);
}

.aside-order-item__left {
  background: var(--mat-sys-color-secondary-container);
  color: var(--mat-sys-color-on-secondary-container);
}

.aside-order-item__header-content {
  display: flex;
  align-items: center;
  padding-inline: 16px;
  block-size: 100%;
}

.aside-order-item__nav-content {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.aside-order-item__main {
  padding: 20px;
  color: var(--mat-sys-color-on-surface);
}

.aside-order-item__main h4,
.aside-order-item__main p {
  margin: 0;
}

.aside-order-item__main p {
  margin-block-start: 6px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->


