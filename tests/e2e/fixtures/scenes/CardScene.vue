<template>
  <section
    data-scene="card"
    class="card-scene"
  >
    <h1>Card 场景</h1>

    <h2>圆角</h2>
    <mat-card
      data-testid="card-medium"
      class="card-stage"
    >
      <mat-card-content>默认 medium 圆角</mat-card-content>
    </mat-card>
    <mat-card
      data-testid="card-large"
      class="card-stage"
      rounded="large"
    >
      <mat-card-content>large 圆角</mat-card-content>
    </mat-card>

    <h2>悬停阴影</h2>
    <mat-card
      data-testid="card-plain"
      class="card-stage"
    >
      <mat-card-action-area data-testid="plain-action">
        <mat-card-content>悬停提升阴影</mat-card-content>
      </mat-card-action-area>
    </mat-card>
    <mat-card
      data-testid="card-flat"
      class="card-stage"
      flat
    >
      <mat-card-action-area data-testid="flat-action">
        <mat-card-content>flat 悬停不提升阴影</mat-card-content>
      </mat-card-action-area>
    </mat-card>
    <mat-card
      data-testid="card-flat-elevated"
      class="card-stage"
      variant="elevated"
      flat
    >
      <mat-card-action-area data-testid="flat-elevated-action">
        <mat-card-content>flat 保留静止阴影</mat-card-content>
      </mat-card-action-area>
    </mat-card>
  </section>
</template>

<style scoped>
.card-scene {
  padding: 24px;
}

.card-stage {
  inline-size: 360px;
  margin-block-end: 16px;
}
</style>
