<script setup>
import { ref } from 'vue';

const standardOpen = ref(false);
const vibrantOpen = ref(false);
const result = ref('尚未选择操作');
</script>

<template>
  <div class="menu-example">
    <mat-btn
      id="standard-menu-trigger"
      variant="outlined"
      aria-haspopup="menu"
      :aria-expanded="standardOpen"
      aria-controls="standard-menu"
      @click="standardOpen = !standardOpen"
    >
      文件操作
    </mat-btn>

    <mat-menu
      id="standard-menu"
      v-model:open="standardOpen"
      anchor="standard-menu-trigger"
      color="secondary"
    >
      <mat-menu-item @click="result = '已新建文件'">
        <template #leading>
          note_add
        </template>
        新建文件
        <template #supporting>
          创建空白文档
        </template>
        <template #trailing>
          Ctrl+N
        </template>
      </mat-menu-item>
      <mat-menu-item disabled>
        保存
      </mat-menu-item>
      <mat-divider />
      <mat-menu-item @click="result = '已关闭文件'">
        关闭
      </mat-menu-item>
    </mat-menu>

    <mat-btn
      id="vibrant-menu-trigger"
      aria-haspopup="menu"
      :aria-expanded="vibrantOpen"
      aria-controls="vibrant-menu"
      @click="vibrantOpen = !vibrantOpen"
    >
      导出
    </mat-btn>

    <mat-menu
      id="vibrant-menu"
      v-model:open="vibrantOpen"
      anchor="vibrant-menu-trigger"
      variant="vibrant"
      color="#6750a4"
    >
      <mat-menu-item>
        图片
        <template #supporting>
          选择图片格式
        </template>
        <template #submenu>
          <mat-menu>
            <mat-menu-item @click="result = '已选择 PNG'">
              PNG
            </mat-menu-item>
            <mat-menu-item @click="result = '已选择 SVG'">
              SVG
            </mat-menu-item>
            <mat-menu-item>
              更多格式
              <template #submenu>
                <mat-menu>
                  <mat-menu-item @click="result = '已选择 WebP'">
                    WebP
                  </mat-menu-item>
                  <mat-menu-item @click="result = '已选择 AVIF'">
                    AVIF
                  </mat-menu-item>
                </mat-menu>
              </template>
            </mat-menu-item>
          </mat-menu>
        </template>
      </mat-menu-item>
      <mat-menu-item @click="result = '已选择 PDF'">
        PDF
      </mat-menu-item>
    </mat-menu>

    <p class="menu-example__result" aria-live="polite">
      {{ result }}
    </p>
  </div>
</template>

<style scoped>
.menu-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  inline-size: 100%;
}

.menu-example__result {
  flex-basis: 100%;
  margin: 4px 0 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
