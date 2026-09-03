<!-- #region script -->
<script setup>
import { ref } from 'vue';

const icon = ref(false);
const labelText = ref('Button');
const variant = ref('filled');
const width = ref('uniform');

const variantOptions = ['elevated', 'filled', 'filled-tonal', 'outlined', 'text', 'standard'];
const widthOptions = ['narrow', 'uniform', 'wide'];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <DocsPlayground>
    <template #preview>
      <mat-btn
        :icon="icon"
        :variant="variant"
        :width="width"
        :label="labelText"
      >
        {{ icon ? 'favorite' : labelText }}
      </mat-btn>
    </template>
    <template #controls>
      <mat-checkbox v-model="icon">
        icon
      </mat-checkbox>
      <mat-text-field
        v-model="labelText"
        label="labelText"
      />
      <mat-select
        v-model="variant"
        label="variant"
        :items="variantOptions"
      />
      <mat-select
        v-model="width"
        label="width"
        :items="widthOptions"
      />
    </template>
  </DocsPlayground>
</template>
<!-- #endregion template -->
