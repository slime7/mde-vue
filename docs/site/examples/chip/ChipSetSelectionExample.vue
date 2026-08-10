<!-- #region template -->
<template>
  <div class="selection-examples">
    <section>
      <span>单选：{{ single ?? '未选择' }}</span>
      <mat-chip-set v-model="single" selection="single" aria-label="排序方式">
        <mat-chip variant="filter" value="recent">
          最近
        </mat-chip>
        <mat-chip variant="filter" value="popular">
          热门
        </mat-chip>
      </mat-chip-set>
    </section>

    <section>
      <span>多选：{{ multiple.join('、') || '未选择' }}</span>
      <mat-chip-set v-model="multiple" selection="multiple" aria-label="内容类型">
        <mat-chip variant="filter" value="文档">
          文档
        </mat-chip>
        <mat-chip variant="filter" value="图片">
          图片
        </mat-chip>
        <mat-chip variant="input" value="联系人">
          联系人
        </mat-chip>
      </mat-chip-set>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const single = ref('recent');
const multiple = ref(['文档']);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.selection-examples,
.selection-examples section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.selection-examples { gap: 20px; }
</style>
<!-- #endregion style -->
