<script setup>
const sourceIcon = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#6750a4" d="M12 2 2 7v10l10 5 10-5V7Zm0 2.2L19.6 8 12 11.8 4.4 8ZM4 9.6l7 3.5v6.4l-7-3.5Zm9 9.9v-6.4l7-3.5V16Z"/>
  </svg>
`)}`;
</script>

<template>
  <div class="example-row">
    <mat-icon icon="home" aria-hidden="true" />

    <mat-icon
      :src="sourceIcon"
      role="img"
      aria-label="立方体"
    />

    <mat-icon font-color="rebeccapurple" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 15.1 8.3 22 9.3 17 14.2 18.2 21 12 17.8 5.8 21 7 14.2 2 9.3 8.9 8.3Z" />
      </svg>
    </mat-icon>
  </div>
</template>

<style scoped>
.example-row {
  display: flex;
  gap: 24px;
  align-items: center;
}
</style>
