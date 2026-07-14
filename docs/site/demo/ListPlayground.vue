<script setup>
import { ref } from 'vue';

const selected = ref(['documents']);
</script>

<template>
  <div class="list-playground">
    <section>
      <h2>受控 segmented 多选</h2>
      <mat-list
        variant="segmented"
        interaction="multi-select"
        :selected="selected"
        aria-label="同步范围"
        @select="selected = $event.nextSelected"
      >
        <mat-list-item value="documents">
          文档
          <template #supporting>
            同步 PDF 与文字文件
          </template>
          <template #trailing>
            <span class="material-symbols-outlined" aria-hidden="true">
              {{ selected.includes('documents') ? 'check_box' : 'check_box_outline_blank' }}
            </span>
          </template>
        </mat-list-item>
        <mat-list-item value="images">
          图片
          <template #supporting>
            同步相册中的图片
          </template>
          <template #trailing>
            <span class="material-symbols-outlined" aria-hidden="true">
              {{ selected.includes('images') ? 'check_box' : 'check_box_outline_blank' }}
            </span>
          </template>
        </mat-list-item>
      </mat-list>
    </section>

    <section>
      <h2>standard 多操作项目</h2>
      <mat-list variant="standard" interaction="multi-action" aria-label="最近文件">
        <mat-list-item>
          设计说明.pdf
          <template #supporting>
            今天 10:30 · 2.4 MB
          </template>
          <template #trailing>
            <mat-icon-btn label="下载">
              download
            </mat-icon-btn>
            <mat-icon-btn label="更多操作">
              more_vert
            </mat-icon-btn>
          </template>
        </mat-list-item>
        <mat-divider inset="middle" />
        <mat-list-item disabled>
          已归档记录
          <template #supporting>
            此项目暂不可操作
          </template>
          <template #trailing>
            <mat-icon-btn label="更多操作">
              more_vert
            </mat-icon-btn>
          </template>
        </mat-list-item>
      </mat-list>
    </section>
  </div>
</template>

<style scoped>
.list-playground {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 24px;
  margin-block: 24px;
}

.list-playground section {
  min-inline-size: 0;
  padding: 20px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.list-playground h2 {
  margin-block: 0 16px;
  font-family: var(--mat-sys-typescale-title-medium-font);
  font-size: var(--mat-sys-typescale-title-medium-size);
  font-weight: var(--mat-sys-typescale-title-medium-weight);
  letter-spacing: var(--mat-sys-typescale-title-medium-tracking);
  line-height: var(--mat-sys-typescale-title-medium-line-height);
}
</style>
