<!-- #region script -->
<script setup>
import {
  defineComponent, h, onBeforeUnmount, onMounted, ref,
} from 'vue';
import { useMatApp } from 'mde-vue';

const RegisteredHeader = defineComponent({
  name: 'RegisteredHeader',
  setup() {
    const element = ref(null);
    const { registerEdge } = useMatApp();
    let registration;

    onMounted(() => {
      registration = registerEdge({ edge: 'top', element: element.value });
    });
    onBeforeUnmount(() => {
      registration?.unregister();
    });

    return () => h('header', {
      ref: element,
      class: 'app-root-register-edge-example__header',
    }, '自定义固定页眉');
  },
});
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="app-root-register-edge-example">
    <RegisteredHeader />
    <section class="app-root-register-edge-example__content">
      <h3>正文自动避让</h3>
      <p>页眉尺寸变化后可调用 registration.update() 请求重新测量。</p>
    </section>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-root-register-edge-example {
  min-block-size: 280px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.app-root-register-edge-example :deep(.app-root-register-edge-example__header) {
  position: absolute;
  z-index: var(--mat-sys-z-index-toolbar);
  inset-block-start: 0;
  inset-inline: 0;
  box-sizing: border-box;
  min-block-size: 64px;
  padding: 20px 24px;
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
}

.app-root-register-edge-example__content {
  padding: 24px;
}

.app-root-register-edge-example__content h3,
.app-root-register-edge-example__content p {
  margin-block: 0 12px;
}
</style>
<!-- #endregion style -->
