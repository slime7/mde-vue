<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const variant = ref('docked');
const position = ref('center');
const vibrant = ref(false);
const active = ref(false);
const variantOptions = [
  { label: 'docked', value: 'docked' },
  { label: 'floating-bottom', value: 'floating-bottom' },
  { label: 'floating-left', value: 'floating-left' },
  { label: 'floating-right', value: 'floating-right' },
];
const positionOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
];
const isFloating = computed(() => variant.value.startsWith('floating'));
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-variant-example">
    <div class="toolbar-variant-example__controls">
      <div class="toolbar-variant-example__control-group">
        <span class="toolbar-variant-example__control-label">variant</span>
        <mat-btn-group
          aria-label="Toolbar variant"
          variant="connected"
          selection="single"
          required
          :selected="variant"
          @select="variant = $event.nextSelected"
        >
          <mat-btn
            v-for="item in variantOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </mat-btn>
        </mat-btn-group>
      </div>

      <div class="toolbar-variant-example__control-group">
        <span class="toolbar-variant-example__control-label">position</span>
        <mat-btn-group
          aria-label="Toolbar position"
          variant="connected"
          selection="single"
          required
          :selected="position"
          @select="position = $event.nextSelected"
        >
          <mat-btn
            v-for="item in positionOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </mat-btn>
        </mat-btn-group>
      </div>

      <div
        class="toolbar-variant-example__control-group toolbar-variant-example__control-group--switches"
        role="group"
        aria-label="Toolbar 状态"
      >
        <mat-switch v-model="vibrant">
          vibrant
        </mat-switch>
        <mat-switch v-model="active">
          {{ active ? '隐藏 Toolbar' : '展示 Toolbar' }}
        </mat-switch>
      </div>
    </div>

    <mat-toolbar
      v-model="active"
      :variant="variant"
      :position="position"
      :vibrant="vibrant"
    >
      <mat-btn variant="standard">
        编辑
      </mat-btn>
      <mat-btn variant="standard">
        分享
      </mat-btn>

      <template v-if="isFloating" #fab>
        <mat-fab
          icon="add"
          label="新建"
        />
      </template>
    </mat-toolbar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.toolbar-variant-example {
  min-block-size: 240px;
}

.toolbar-variant-example__controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.toolbar-variant-example__control-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
  max-inline-size: 100%;
}

.toolbar-variant-example__control-label {
  flex: 0 0 72px;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 14px;
  font-weight: 600;
}

.toolbar-variant-example__control-group--switches {
  gap: 16px;
}
</style>
<!-- #endregion style -->
