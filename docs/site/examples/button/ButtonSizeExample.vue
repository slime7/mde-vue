<!-- #region template -->
<template>
  <div class="example-stack">
    <div class="example-row">
      <mat-btn
        size="extra-small"
        variant="standard"
        shape="round"
        color="secondary"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        size="extra-small"
        variant="standard"
        shape="round"
        color="secondary"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        size="extra-small"
        variant="standard"
        shape="round"
        color="secondary"
        icon="link"
        label="链接"
      />
      <mat-btn
        size="extra-small"
        variant="standard"
        shape="round"
        color="secondary"
        icon="wifi"
        label="无线网络"
      />
    </div>

    <div class="example-row">
      <mat-btn
        size="small"
        variant="outlined"
        shape="square"
        color="secondary"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        size="small"
        variant="outlined"
        shape="square"
        color="secondary"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        size="small"
        variant="outlined"
        shape="square"
        color="secondary"
        icon="link"
        label="链接"
      />
      <mat-btn
        size="small"
        variant="outlined"
        shape="square"
        color="secondary"
        icon="wifi"
        label="无线网络"
      />
    </div>

    <div class="example-row">
      <mat-btn
        size="medium"
        variant="filled"
        shape="square"
        color="tertiary"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        size="medium"
        variant="filled"
        shape="square"
        color="tertiary"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        size="medium"
        variant="filled"
        shape="square"
        color="tertiary"
        icon="link"
        label="链接"
      />
      <mat-btn
        size="medium"
        variant="filled"
        shape="square"
        color="tertiary"
        icon="wifi"
        label="无线网络"
      />
    </div>

    <div class="example-row">
      <mat-btn
        size="large"
        variant="filled-tonal"
        shape="round"
        color="tertiary"
        width="narrow"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        size="large"
        variant="filled-tonal"
        shape="round"
        color="tertiary"
        width="uniform"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        size="large"
        variant="filled-tonal"
        shape="round"
        color="tertiary"
        width="narrow"
        icon="link"
        label="链接"
      />
    </div>

    <div class="example-row">
      <mat-btn
        size="extra-large"
        variant="filled"
        shape="square"
        color="primary"
        width="narrow"
        icon="bluetooth"
        label="蓝牙"
      />
      <mat-btn
        size="extra-large"
        variant="filled"
        shape="square"
        color="primary"
        width="uniform"
        icon="alarm"
        label="闹钟"
      />
      <mat-btn
        size="extra-large"
        variant="filled"
        shape="square"
        color="primary"
        width="narrow"
        icon="link"
        label="链接"
      />
    </div>
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

.example-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: center;
}
</style>
<!-- #endregion style -->
