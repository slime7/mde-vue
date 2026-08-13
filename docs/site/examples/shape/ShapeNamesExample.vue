<!-- #region template -->
<template>
  <div class="shape-grid">
    <figure
      v-for="shape in shapes"
      :key="shape.name"
      class="shape-item"
    >
      <mat-shape
        :name="shape.name"
        size="72"
        color="primary-container"
        aria-hidden="true"
      />
      <figcaption>{{ shape.label }}</figcaption>
    </figure>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const shapes = [
  { name: 'circle', label: 'Circle' },
  { name: 'square', label: 'Square' },
  { name: 'slanted', label: 'Slanted' },
  { name: 'arch', label: 'Arch' },
  { name: 'semicircle', label: 'Semicircle' },
  { name: 'oval', label: 'Oval' },
  { name: 'pill', label: 'Pill' },
  { name: 'triangle', label: 'Triangle' },
  { name: 'arrow', label: 'Arrow' },
  { name: 'fan', label: 'Fan' },
  { name: 'diamond', label: 'Diamond' },
  { name: 'clamshell', label: 'Clamshell' },
  { name: 'pentagon', label: 'Pentagon' },
  { name: 'gem', label: 'Gem' },
  { name: 'very-sunny', label: 'Very sunny' },
  { name: 'sunny', label: 'Sunny' },
  { name: '4-sided-cookie', label: '4-sided cookie' },
  { name: '6-sided-cookie', label: '6-sided cookie' },
  { name: '7-sided-cookie', label: '7-sided cookie' },
  { name: '9-sided-cookie', label: '9-sided cookie' },
  { name: '12-sided-cookie', label: '12-sided cookie' },
  { name: '4-leaf-clover', label: '4-leaf clover' },
  { name: '8-leaf-clover', label: '8-leaf clover' },
  { name: 'burst', label: 'Burst' },
  { name: 'soft-burst', label: 'Soft burst' },
  { name: 'boom', label: 'Boom' },
  { name: 'soft-boom', label: 'Soft boom' },
  { name: 'flower', label: 'Flower' },
  { name: 'puffy', label: 'Puffy' },
  { name: 'puffy-diamond', label: 'Puffy diamond' },
  { name: 'ghost-ish', label: 'Ghost-ish' },
  { name: 'pixel-circle', label: 'Pixel circle' },
  { name: 'pixel-triangle', label: 'Pixel triangle' },
  { name: 'bun', label: 'Bun' },
  { name: 'heart', label: 'Heart' },
];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.shape-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  inline-size: 100%;
  gap: 20px 12px;
}

.shape-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  gap: 8px;
  text-align: center;
}

.shape-item figcaption {
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-label-medium-size);
}
</style>
<!-- #endregion style -->
