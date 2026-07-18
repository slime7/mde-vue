<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const variant = ref('docked');
const position = ref('center');
const vibrant = ref(false);
const active = ref(false);
const isFloating = computed(() => variant.value.startsWith('floating'));
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-variant-example">
    <div class="toolbar-variant-example__controls">
      <mat-btn
        v-for="item in ['docked', 'floating-bottom', 'floating-left', 'floating-right']"
        :key="item"
        variant="outlined"
        :selected="variant === item"
        @click="variant = item"
      >
        {{ item }}
      </mat-btn>
      <mat-btn
        variant="text"
        :selected="vibrant"
        @click="vibrant = !vibrant"
      >
        {{ vibrant ? 'standard' : 'vibrant' }}
      </mat-btn>
      <mat-btn
        v-for="item in ['start', 'center', 'end']"
        :key="`position-${item}`"
        variant="text"
        :selected="position === item"
        @click="position = item"
      >
        position: {{ item }}
      </mat-btn>
      <mat-btn
        variant="outlined"
        @click="active = !active"
      >
        {{ active ? '隐藏 Toolbar' : '展示 Toolbar' }}
      </mat-btn>
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
        <mat-btn
          icon="add"
          label="新建"
          width="wide"
          variant="filled"
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
  flex-wrap: wrap;
  gap: 8px;
}

</style>
<!-- #endregion style -->
