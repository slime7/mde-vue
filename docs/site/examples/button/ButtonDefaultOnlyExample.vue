<!-- #region template -->
<template>
  <div class="flex grow">
    <div class="flex-1 flex flex-col gap-y-2">
      <div class="text-center">
        <mat-btn prefix="edit">
          label
        </mat-btn>
      </div>
      <div class="text-center">
        default button
      </div>
    </div>

    <div class="flex-1 flex flex-col gap-y-2">
      <div class="flex gap-x-4 justify-center">
        <mat-btn toggle prefix="edit">
          unselected
        </mat-btn>
        <mat-btn toggle selected prefix="edit">
          selected
        </mat-btn>
      </div>
      <div class="text-center">
        toggle button
      </div>
    </div>
  </div>
</template>
<!-- #endregion template -->
