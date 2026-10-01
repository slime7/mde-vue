<script setup>
defineOptions({
  name: 'MatExpandTransition',
  inheritAttrs: false,
});
</script>

<template>
  <Transition name="mat-expand-transition">
    <slot />
  </Transition>
</template>

<style>
@layer mde.components {
  .mat-expand-transition-enter-active,
  .mat-expand-transition-leave-active {
    interpolate-size: allow-keywords;
    overflow: hidden;
    transition: height var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-expand-transition-enter-from,
  .mat-expand-transition-leave-to {
    height: 0;
  }

  .mat-expand-transition-enter-to,
  .mat-expand-transition-leave-from {
    height: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-expand-transition-enter-active,
    .mat-expand-transition-leave-active {
      transition: none;
    }
  }
}
</style>
