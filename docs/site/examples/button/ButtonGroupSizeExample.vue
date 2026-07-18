<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-btn-group size="extra-small">
      <mat-btn
        variant="standard"
        shape="round"
        color="secondary"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        variant="standard"
        shape="round"
        color="secondary"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        variant="standard"
        shape="round"
        color="secondary"
        icon="link"
        label="链接"
      />
      <mat-btn
        variant="standard"
        shape="round"
        color="secondary"
        icon="wifi"
        label="无线网络"
      />
    </mat-btn-group>

    <mat-btn-group size="small">
      <mat-btn
        variant="outlined"
        shape="square"
        color="secondary"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        variant="outlined"
        shape="square"
        color="secondary"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        variant="outlined"
        shape="square"
        color="secondary"
        icon="link"
        label="链接"
      />
      <mat-btn
        variant="outlined"
        shape="square"
        color="secondary"
        icon="wifi"
        label="无线网络"
      />
    </mat-btn-group>

    <mat-btn-group size="medium">
      <mat-btn
        variant="filled"
        shape="square"
        color="tertiary"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        variant="filled"
        shape="square"
        color="tertiary"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        variant="filled"
        shape="square"
        color="tertiary"
        icon="link"
        label="链接"
      />
      <mat-btn
        variant="filled"
        shape="square"
        color="tertiary"
        icon="wifi"
        label="无线网络"
      />
    </mat-btn-group>

    <mat-btn-group size="large">
      <mat-btn
        variant="filled-tonal"
        shape="round"
        color="tertiary"
        width="narrow"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        variant="filled-tonal"
        shape="round"
        color="tertiary"
        width="uniform"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        variant="filled-tonal"
        shape="round"
        color="tertiary"
        width="narrow"
        icon="link"
        label="链接"
      />
    </mat-btn-group>

    <mat-btn-group size="extra-large">
      <mat-btn
        variant="filled"
        shape="square"
        color="primary"
        width="narrow"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        variant="filled"
        shape="square"
        color="primary"
        width="uniform"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        variant="filled"
        shape="square"
        color="primary"
        width="narrow"
        icon="link"
        label="链接"
      />
    </mat-btn-group>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
