<!-- #region template -->
<template>
  <mat-card
    variant="filled"
    class="input-base-example-card"
  >
    <div class="input-base-example-field">
      <mat-input-base
        v-model="value"
        control="textarea"
        :rows="4"
        aria-label="说明"
      />
    </div>

    <mat-card-actions>
      <mat-btn variant="standard">
        上传
      </mat-btn>

      <mat-spacer />

      <mat-btn
        id="input-base-textarea-menu-trigger"
        variant="standard"
        aria-haspopup="menu"
        :aria-expanded="open"
        aria-controls="input-base-textarea-menu"
        @click="open = !open"
      >
        {{ model }} {{ reasoning }}
        <template #suffix>
          <mat-icon
            icon="expand_more"
            aria-hidden="true"
          />
        </template>
      </mat-btn>
      <mat-menu
        id="input-base-textarea-menu"
        v-model="open"
        anchor="input-base-textarea-menu-trigger"
      >
        <mat-menu-item>
          模型
          <template #submenu>
            <mat-menu>
              <mat-menu-item @click="model = 'deepseek-flash'">
                deepseek-flash
                <template
                  v-if="model === 'deepseek-flash'"
                  #trailing
                >
                  <mat-icon
                    icon="check"
                    aria-hidden="true"
                  />
                </template>
              </mat-menu-item>
              <mat-menu-item @click="model = 'deepseek-pro'">
                deepseek-pro
                <template
                  v-if="model === 'deepseek-pro'"
                  #trailing
                >
                  <mat-icon
                    icon="check"
                    aria-hidden="true"
                  />
                </template>
              </mat-menu-item>
            </mat-menu>
          </template>
        </mat-menu-item>

        <mat-menu-item>
          推理强度
          <template #submenu>
            <mat-menu>
              <mat-menu-item @click="reasoning = '中'">
                中
                <template
                  v-if="reasoning === '中'"
                  #trailing
                >
                  <mat-icon
                    icon="check"
                    aria-hidden="true"
                  />
                </template>
              </mat-menu-item>
              <mat-menu-item @click="reasoning = '高'">
                高
                <template
                  v-if="reasoning === '高'"
                  #trailing
                >
                  <mat-icon
                    icon="check"
                    aria-hidden="true"
                  />
                </template>
              </mat-menu-item>
              <mat-menu-item @click="reasoning = '最高'">
                最高
                <template
                  v-if="reasoning === '最高'"
                  #trailing
                >
                  <mat-icon
                    icon="check"
                    aria-hidden="true"
                  />
                </template>
              </mat-menu-item>
            </mat-menu>
          </template>
        </mat-menu-item>
      </mat-menu>

      <mat-btn variant="elevated">
        发送
      </mat-btn>
    </mat-card-actions>
  </mat-card>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref('使用方可以完全自定义输入容器、标签和校验提示。');
const open = ref(false);
const model = ref('deepseek-flash');
const reasoning = ref('最高');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.input-base-example-card {
  inline-size: 100%;
}

.input-base-example-field {
  padding: 16px 16px 8px;
}

.input-base-example-field :deep(.mat-input-base) {
  resize: none;
}
</style>
<!-- #endregion style -->
