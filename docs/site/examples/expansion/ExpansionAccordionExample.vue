<!-- #region template -->
<template>
  <div class="example-column">
    <div class="status-text">
      当前展开面板：{{ activePanel ?? '无' }}
    </div>
    <mat-expansion
      v-model="activePanel"
      :multiple="false"
    >
      <mat-expansion-panel
        value="panel1"
        title="手风琴面板 1"
        :split="false"
      >
        <p class="demo-text">
          这是面板 1 的内容。展开此面板时会自动收起其他面板。
        </p>
      </mat-expansion-panel>
      <mat-expansion-panel
        value="panel2"
        title="手风琴面板 2"
        :split="false"
      >
        <p class="demo-text">
          这是面板 2 的内容。
        </p>
      </mat-expansion-panel>
      <mat-expansion-panel
        value="panel3"
        title="手风琴面板 3"
        :split="false"
      >
        <p class="demo-text">
          这是面板 3 的内容。
        </p>
      </mat-expansion-panel>
    </mat-expansion>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const activePanel = ref('panel1');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}

.status-text {
  font-size: 14px;
}

.demo-text {
  margin: 0;
  line-height: 1.5;
}
</style>
<!-- #endregion style -->
