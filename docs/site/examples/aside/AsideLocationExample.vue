<!-- #region template -->
<template>
  <mat-layout class="aside-location-example">
    <mat-aside
      location="top"
      :block-size="44"
      as="header"
      bordered
      class="aside-location-example__top"
    >
      <div class="aside-location-example__bar">
        <span>主顶栏 (top 1)</span>
      </div>
    </mat-aside>

    <mat-aside
      location="start"
      :block-size="120"
      as="nav"
      bordered
      class="aside-location-example__start"
    >
      <div class="aside-location-example__nav">
        <span>起始侧 (start)</span>
      </div>
    </mat-aside>

    <mat-aside
      location="end"
      :block-size="120"
      bordered
      class="aside-location-example__end"
    >
      <div class="aside-location-example__nav">
        <span>结束侧 (end)</span>
      </div>
    </mat-aside>

    <mat-aside
      location="top"
      :block-size="36"
      bordered
      class="aside-location-example__sub-top"
    >
      <div class="aside-location-example__bar">
        <span>次顶栏 (top 2，堆叠且避让两侧)</span>
      </div>
    </mat-aside>

    <mat-aside
      location="bottom"
      :block-size="40"
      as="footer"
      bordered
      class="aside-location-example__bottom"
    >
      <div class="aside-location-example__bar">
        <span>底栏 (bottom)</span>
      </div>
    </mat-aside>

    <div class="aside-location-example__content">
      <h4>多边缘协同与同向堆叠</h4>
      <p>第二个顶栏位于 bottom 上方（两侧栏之后），在纵向自动堆叠于主顶栏下方，在横向自动避让两侧边栏。</p>
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.aside-location-example {
  min-block-size: 260px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.aside-location-example__top {
  background: var(--mat-sys-color-primary-container);
  color: var(--mat-sys-color-on-primary-container);
}

.aside-location-example__start {
  background: var(--mat-sys-color-secondary-container);
  color: var(--mat-sys-color-on-secondary-container);
}

.aside-location-example__end {
  background: var(--mat-sys-color-tertiary-container);
  color: var(--mat-sys-color-on-tertiary-container);
}

.aside-location-example__sub-top {
  background: var(--mat-sys-color-surface-container-highest);
  color: var(--mat-sys-color-on-surface);
}

.aside-location-example__bottom {
  background: var(--mat-sys-color-surface-container-high);
  color: var(--mat-sys-color-on-surface);
}

.aside-location-example__bar {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 100%;
  font-size: 13px;
  font-weight: 600;
}

.aside-location-example__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 100%;
  padding: 12px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.aside-location-example__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  text-align: center;
  color: var(--mat-sys-color-on-surface);
}

.aside-location-example__content h4,
.aside-location-example__content p {
  margin: 0;
}

.aside-location-example__content p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 13px;
}
</style>
<!-- #endregion style -->
