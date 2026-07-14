<script setup>
import { ref } from 'vue';

const email = ref('reader');
const note = ref('请在工作日联系。');
const touched = ref(false);
</script>

<template>
  <div class="text-input-example">
    <mat-text-field
      v-model="email"
      label="邮箱"
      supporting-text="用于接收通知"
      prefix-text="mailto:"
      suffix-text="@example.com"
      :max-length="24"
      color="#6750a4"
      autocomplete="email"
      required
      @blur="touched = true"
    >
      <template #leading>
        mail
      </template>
      <template #trailing>
        alternate_email
      </template>
    </mat-text-field>

    <mat-text-field
      model-value="123"
      label="验证码"
      variant="filled"
      error
      error-text="请输入六位验证码"
      :max-length="6"
    />

    <mat-textarea
      v-model="note"
      label="备注"
      supporting-text="可以纵向调整输入区域"
      :rows="4"
      :max-length="120"
      color="tertiary"
    />

    <p class="example-status" aria-live="polite">
      {{ touched ? '邮箱输入框已失去焦点' : '尚未离开邮箱输入框' }}
    </p>
  </div>
</template>

<style scoped>
.text-input-example {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 24px;
  inline-size: 100%;
}

.example-status {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-family: var(--mat-sys-typescale-body-small-font);
  font-size: var(--mat-sys-typescale-body-small-size);
  line-height: var(--mat-sys-typescale-body-small-line-height);
}
</style>
