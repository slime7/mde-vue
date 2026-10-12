<!-- #region template -->
<template>
  <div class="example-grid">
    <section>
      <strong>cols=2（5 项，末行缺列）</strong>
      <mat-grid-list
        :cols="2"
        aria-label="两列网格列表"
        class="example-stage"
      >
        <mat-list-item
          v-for="i in 5"
          :key="i"
        >
          项目 {{ i }}
        </mat-list-item>
      </mat-grid-list>
    </section>
    <section>
      <strong>cols=3</strong>
      <mat-grid-list
        :cols="3"
        aria-label="三列网格列表"
        class="example-stage"
      >
        <mat-list-item
          v-for="i in 6"
          :key="i"
        >
          项目 {{ i }}
        </mat-list-item>
      </mat-grid-list>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 24px;
  inline-size: 100%;
}

section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-inline-size: 0;
}

.example-stage {
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
