<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref('messages');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="tabs-badge-example">
    <mat-tabs v-model="active">
      <mat-tab-item
        value="messages"
        label="消息"
        icon="chat"
        :badge="{ content: 5 }"
      />
      <mat-tab-item
        value="moments"
        label="动态"
        icon="forum"
        :badge="{ dot: true }"
      />
      <mat-tab-item
        value="profile"
        label="我的"
        icon="person"
      />

      <mat-tab-content value="messages">
        <p class="tabs-badge-page">
          badge 属性接收与导航子项相同的配置对象：content 显示数字，dot 显示圆点。
        </p>
      </mat-tab-content>
      <mat-tab-content value="moments">
        <p class="tabs-badge-page">
          动态内容
        </p>
      </mat-tab-content>
      <mat-tab-content value="profile">
        <p class="tabs-badge-page">
          个人资料
        </p>
      </mat-tab-content>
    </mat-tabs>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.tabs-badge-example {
  inline-size: 100%;
}

.tabs-badge-page {
  padding: 20px 16px;
}
</style>
<!-- #endregion style -->
