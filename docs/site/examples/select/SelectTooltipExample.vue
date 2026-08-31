<!-- #region script -->
<script setup>
import { ref } from 'vue';

const model = ref('deepseek-v3');
const items = [
  {
    title: 'DeepSeek-V3',
    value: 'deepseek-v3',
    subtitle: '通用大语言模型',
    tooltip: 'deepseek-ai/DeepSeek-V3 (671B MoE)',
  },
  {
    title: 'Claude 3.5 Sonnet',
    value: 'claude-sonnet',
    subtitle: 'Anthropic 前沿模型',
    tooltip: 'claude-3-5-sonnet-20241022',
  },
  {
    title: 'GPT-4o',
    value: 'gpt-4o',
    subtitle: 'OpenAI 多模态旗舰模型',
    tooltip: 'gpt-4o-2024-11-20',
  },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="select-tooltip-demo">
    <mat-select
      v-model="model"
      label="模型选择"
      :items="items"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.select-tooltip-demo {
  max-inline-size: 320px;
}
</style>
<!-- #endregion style -->
