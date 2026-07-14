<script setup>
import { computed, ref } from 'vue';

const selectedFiles = ref(['documents']);
const sortOrder = ref('recent');
const syncEnabled = ref(true);
const availableFiles = ['documents', 'pictures'];
const allFilesSelected = computed(() => (
  selectedFiles.value.length === availableFiles.length
));
const someFilesSelected = computed(() => (
  selectedFiles.value.length > 0 && !allFilesSelected.value
));

function toggleAllFiles(checked) {
  selectedFiles.value = checked ? [...availableFiles] : [];
}
</script>

<template>
  <section class="selection-playground" aria-labelledby="selection-playground-title">
    <h2 id="selection-playground-title">
      表单选择控件
    </h2>
    <div class="selection-playground__grid">
      <div class="selection-playground__panel">
        <strong>Checkbox</strong>
        <mat-checkbox
          :model-value="allFilesSelected"
          :indeterminate="someFilesSelected"
          @update:model-value="toggleAllFiles"
        >
          全部文件类型
        </mat-checkbox>
        <div class="selection-playground__nested">
          <mat-checkbox v-model="selectedFiles" value="documents">
            文档
          </mat-checkbox>
          <mat-checkbox v-model="selectedFiles" value="pictures">
            图片
          </mat-checkbox>
        </div>
      </div>

      <div class="selection-playground__panel">
        <mat-radio-group v-model="sortOrder" label="排序方式" color="secondary">
          <mat-radio value="recent">
            最近更新
          </mat-radio>
          <mat-radio value="name">
            名称
          </mat-radio>
          <mat-radio value="size">
            大小
          </mat-radio>
        </mat-radio-group>
      </div>

      <div class="selection-playground__panel">
        <strong>Switch</strong>
        <mat-switch v-model="syncEnabled" icons="both" color="#6750a4">
          自动同步
        </mat-switch>
        <span>当前状态：{{ syncEnabled ? '开启' : '关闭' }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.selection-playground {
  margin-block: 32px;
}

.selection-playground__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}

.selection-playground__panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  min-inline-size: 0;
  padding: 20px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.selection-playground__nested {
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
  padding-inline-start: 24px;
}
</style>
