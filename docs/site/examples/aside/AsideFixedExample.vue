<!-- #region template -->
<template>
  <mat-layout class="aside-fixed-example">
    <mat-aside
      mode="fixed"
      attach="body"
      location="top"
      :block-size="44"
      as="header"
      bordered
      class="aside-fixed-example__top"
    >
      <div class="aside-fixed-example__bar">
        <span>主顶栏 (fixed top 1)</span>
      </div>
    </mat-aside>

    <mat-aside
      mode="fixed"
      attach="body"
      location="start"
      :block-size="120"
      as="nav"
      bordered
      class="aside-fixed-example__start"
    >
      <div class="aside-fixed-example__nav">
        <span>起始侧 (fixed start)</span>
      </div>
    </mat-aside>

    <mat-aside
      mode="fixed"
      attach="body"
      location="end"
      :block-size="120"
      bordered
      class="aside-fixed-example__end"
    >
      <div class="aside-fixed-example__nav">
        <span>结束侧 (fixed end)</span>
      </div>
    </mat-aside>

    <mat-aside
      mode="fixed"
      attach="body"
      location="top"
      :block-size="36"
      bordered
      class="aside-fixed-example__sub-top"
    >
      <div class="aside-fixed-example__bar">
        <span>次顶栏 (fixed top 2，堆叠且避让两侧)</span>
      </div>
    </mat-aside>

    <mat-aside
      mode="fixed"
      attach="body"
      location="bottom"
      :block-size="40"
      as="footer"
      bordered
      class="aside-fixed-example__bottom"
    >
      <div class="aside-fixed-example__bar">
        <span>底栏 (fixed bottom)</span>
      </div>
    </mat-aside>

    <div class="aside-fixed-example__content">
      <h4>fixed 多边缘协同与同向堆叠</h4>
      <p>固定到 body 的边缘栏仍按声明顺序累加，并在正交方向互相避让。</p>
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.aside-fixed-example {
  min-block-size: 360px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.aside-fixed-example__top {
  background: var(--mat-sys-color-primary-container);
  color: var(--mat-sys-color-on-primary-container);
}

.aside-fixed-example__start {
  background: var(--mat-sys-color-secondary-container);
  color: var(--mat-sys-color-on-secondary-container);
}

.aside-fixed-example__end {
  background: var(--mat-sys-color-tertiary-container);
  color: var(--mat-sys-color-on-tertiary-container);
}

.aside-fixed-example__sub-top {
  background: var(--mat-sys-color-surface-container-highest);
  color: var(--mat-sys-color-on-surface);
}

.aside-fixed-example__bottom {
  background: var(--mat-sys-color-surface-container-high);
  color: var(--mat-sys-color-on-surface);
}

.aside-fixed-example__bar {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 100%;
  font-size: 13px;
  font-weight: 600;
}

.aside-fixed-example__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 100%;
  padding: 12px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.aside-fixed-example__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  text-align: center;
  color: var(--mat-sys-color-on-surface);
}

.aside-fixed-example__content h4,
.aside-fixed-example__content p {
  margin: 0;
}

.aside-fixed-example__content p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 13px;
}
</style>
<!-- #endregion style -->
