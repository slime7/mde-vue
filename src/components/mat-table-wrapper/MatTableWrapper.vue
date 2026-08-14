<script setup>
defineOptions({
  name: 'MatTableWrapper',
  inheritAttrs: false,
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="table-wrapper"
  >
    <slot />
  </div>
</template>

<style>
@layer mde.components {
  .table-wrapper {
    overflow-x: auto;
    border: 1px solid var(--mat-sys-color-surface-variant);
    border-radius: var(--mat-table-wrapper-container-shape);
  }

  .table-wrapper table {
    inline-size: 100%;
  }

  .table-wrapper table p {
    margin-block: 0;
  }

  .table-wrapper th,
  .table-wrapper td {
    padding: 16px 24px;
    border: 0;
    border-block-start: 1px solid var(--mat-sys-color-surface-variant);
    border-inline-end: 1px solid var(--mat-sys-color-surface-variant);
    vertical-align: middle;
  }

  .table-wrapper tr :last-child {
    border-inline-end: 0;
  }

  .table-wrapper thead th {
    background: var(--mat-sys-color-surface-container-low);
    color: var(--mat-sys-color-on-surface-variant);
    font-weight: 500;
  }

  .table-wrapper thead:first-child tr:first-child th,
  .table-wrapper tbody:first-child tr:first-child td {
    border-block-start: 0;
  }
}
</style>
