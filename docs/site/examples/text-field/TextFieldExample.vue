<script setup>
import { ref } from 'vue';

const email = ref('reader');
const note = ref('请在工作日联系。');
const touched = ref(false);
const verificationCode = ref('');
const verificationTouched = ref(false);
</script>

<template>
  <div class="text-input-example">
    <mat-text-field
      v-model="email"
      label="邮箱"
      variant="outlined"
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
      v-model="verificationCode"
      label="验证码"
      variant="outlined"
      supporting-text="聚焦后不输入内容并离开，可观察标签复位"
      :error="verificationTouched && verificationCode.length !== 6"
      error-text="请输入六位验证码"
      :max-length="6"
      inputmode="numeric"
      @blur="verificationTouched = true"
      @focus="verificationTouched = false"
    />

    <mat-textarea
      v-model="note"
      label="备注"
      variant="filled"
      supporting-text="可以纵向调整输入区域"
      :rows="4"
      :max-length="120"
      color="tertiary"
    />

    <mat-text-field
      model-value="INV-2026-0715"
      label="只读编号"
      supporting-text="内容可选择，但不能编辑"
      readonly
    />

    <mat-text-field
      model-value="由管理员分配"
      label="组织"
      supporting-text="当前不可修改"
      disabled
    />

    <p class="example-status" aria-live="polite">
      {{ touched ? '邮箱输入框已失去焦点' : '尚未离开邮箱输入框' }}；
      验证码当前为 {{ verificationCode.length }} 位。
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
