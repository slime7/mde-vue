<!-- #region template -->
<template>
  <mat-layout class="aside-fixed-example">
    <mat-aside
      mode="fixed"
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

    <main class="aside-fixed-example__content">
      <article class="aside-fixed-example__article">
        <h4>fixed 多边缘协同与正文滚动</h4>
        <p>边缘栏保留在 mat-layout 的声明位置，仍按声明顺序完成避让、同向堆叠和层级叠加。</p>
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
        >
          {{ paragraph }}
        </p>
      </article>
    </main>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const paragraphs = [
  'fixed 模式适合由应用框架独占整个窗口的场景，正文可以继续使用 document/body 作为滚动容器。',
  '主顶栏先登记 top 边缘，第二条顶栏会在它的下方继续堆叠，而不会覆盖主顶栏的内容。',
  '起始侧和结束侧会读取顶栏、底栏当前占用的正交边缘，在视口上下边界之间自动避让。',
  '当正文向下滚动时，固定边缘栏仍停留在视口边缘，正文内容从它们后方连续经过。',
  '布局上下文负责收集每个边缘栏的尺寸和顺序，因此新增同类栏时仍能复用相同的协调规则。',
  '这个示例没有指定 attach，组件会保留在当前 mat-layout 的声明位置；需要跨出当前树时再显式指定目标。',
  '边缘栏的背景色直接由示例中的主题语义色设置，便于观察不同栏位的范围和相互避让关系。',
  '顶部栏和底部栏使用横向的全宽区域，左右两侧使用纵向区域，四个方向的内容不会改变正文的滚动宽度。',
  '滚动到页面中部后，可以继续观察顶部两层的固定位置，以及左右栏在视口高度方向上的完整避让。',
  '固定定位只改变元素的视口定位方式，布局登记仍然可以让正文获得正确的边缘内边距。',
  '在真实应用中，mat-layout 可以作为窗口级页面根节点，也可以由 mat-app-root 统一承载应用级边缘组件。',
  '如果业务需要把边缘栏挂到特定宿主节点，可以给 Aside 传入 attach；此时才会把组件移动到指定目标。',
  '页面保留足够长的正文，是为了让 fixed 的视口固定效果与普通文档滚动之间的关系清晰可见。',
  '继续向下滚动时，正文段落会正常延伸，固定边缘栏不会随文档流离开视口。',
  '回到页面顶部后，主顶栏和次顶栏仍保持原来的顺序，侧栏也继续从顶部栏下方开始占位。',
  '通过同时观察四个方向，可以验证避让、顺序和同向叠加在 fixed 模式下仍由同一个布局上下文协调。',
];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
:global(.playground-preview-wrapper) {
  padding: 0;
}

.aside-fixed-example {
  inline-size: 100%;
  min-block-size: 100dvb;
  background: var(--mat-sys-color-background);
  color: var(--mat-sys-color-on-background);
}

:global(.aside-fixed-example__top) {
  background-color: var(--mat-sys-color-primary-container);
  color: var(--mat-sys-color-on-primary-container);
}

:global(.aside-fixed-example__start) {
  background-color: var(--mat-sys-color-secondary-container);
  color: var(--mat-sys-color-on-secondary-container);
}

:global(.aside-fixed-example__end) {
  background-color: var(--mat-sys-color-tertiary-container);
  color: var(--mat-sys-color-on-tertiary-container);
}

:global(.aside-fixed-example__sub-top) {
  background-color: var(--mat-sys-color-surface-container-highest);
  color: var(--mat-sys-color-on-surface);
}

:global(.aside-fixed-example__bottom) {
  background-color: var(--mat-sys-color-surface-container-high);
  color: var(--mat-sys-color-on-surface);
}

.aside-fixed-example__bar,
.aside-fixed-example__nav {
  display: flex;
  align-items: center;
  block-size: 100%;
  font-size: 13px;
  font-weight: 600;
}

.aside-fixed-example__bar {
  justify-content: center;
}

.aside-fixed-example__nav {
  justify-content: center;
  padding: 12px;
  text-align: center;
}

.aside-fixed-example__content {
  min-block-size: 1200px;
  padding: 48px 32px 120px;
  color: var(--mat-sys-color-on-background);
}

.aside-fixed-example__article {
  max-inline-size: 760px;
  margin-inline: auto;
}

.aside-fixed-example__article h4,
.aside-fixed-example__article p {
  margin: 0;
}

.aside-fixed-example__article h4 {
  font-size: 24px;
  line-height: 1.3;
}

.aside-fixed-example__article p {
  margin-block-start: 20px;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 15px;
  line-height: 1.8;
}
</style>
<!-- #endregion style -->
