<script setup>
</script>

<template>
  <section data-scene="ripple" class="ripple-scene">
    <h1>涟漪场景</h1>

    <button
      v-ripple
      v-state-layer
      data-testid="ripple-host"
      type="button"
    >
      涟漪目标
    </button>

    <button
      v-ripple="{ variant: 'dots' }"
      v-state-layer
      data-testid="ripple-dots-host"
      type="button"
    >
      波点涟漪
    </button>

    <button
      v-ripple="{ variant: 'glow' }"
      v-state-layer
      data-testid="ripple-glow-host"
      type="button"
    >
      柔光涟漪
    </button>

    <button
      v-ripple="{ variant: 'rings' }"
      v-state-layer
      data-testid="ripple-rings-host"
      type="button"
    >
      圆环涟漪
    </button>

    <button
      v-ripple="{ variant: 'burst' }"
      v-state-layer
      data-testid="ripple-burst-host"
      type="button"
    >
      星芒涟漪
    </button>
  </section>
</template>

<style scoped>
.ripple-scene {
  min-block-size: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
}

.ripple-scene button {
  position: relative;
  padding: 12px 24px;
  color: var(--mat-sys-color-on-primary-container);
  font: inherit;
  background: var(--mat-sys-color-primary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
  cursor: pointer;
}
</style>
