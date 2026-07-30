<!-- #region script -->
<script setup>
import { ref } from 'vue';

const description = ref('第一行\n第二行\n第三行\n第四行\n第五行\n第六行');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-textarea">
    <mat-textarea
      v-model="description"
      auto-grow
      label="最多四行"
      :max-rows="4"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-textarea {
  inline-size: min(100%, 360px);
}
</style>
<!-- #endregion style -->
