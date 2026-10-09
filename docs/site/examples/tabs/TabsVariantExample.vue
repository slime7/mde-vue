<!-- #region script -->
<script setup>
import { ref } from 'vue';

const primaryActive = ref('chat');
const secondaryActive = ref('all');
const secondaryWithIconActive = ref('overview');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="tabs-variant-example">
    <p class="tabs-variant-label">
      primary（64px 堆叠图文）
    </p>
    <mat-tabs
      v-model="primaryActive"
      variant="primary"
    >
      <mat-tab-item
        value="chat"
        label="聊天"
        icon="chat"
      />
      <mat-tab-item
        value="calls"
        label="通话"
        icon="call"
      />
      <mat-tab-item
        value="contacts"
        label="联系人"
        icon="group"
      />

      <mat-tab-content value="chat">
        <p class="tabs-variant-page">
          聊天列表
        </p>
      </mat-tab-content>
      <mat-tab-content value="calls">
        <p class="tabs-variant-page">
          通话记录
        </p>
      </mat-tab-content>
      <mat-tab-content value="contacts">
        <p class="tabs-variant-page">
          联系人
        </p>
      </mat-tab-content>
    </mat-tabs>

    <p class="tabs-variant-label">
      secondary（48px 纯标签）
    </p>
    <mat-tabs
      v-model="secondaryActive"
      variant="secondary"
    >
      <mat-tab-item
        value="all"
        label="全部"
      />
      <mat-tab-item
        value="unread"
        label="未读"
      />
      <mat-tab-item
        value="archived"
        label="已归档"
      />

      <mat-tab-content value="all">
        <p class="tabs-variant-page">
          全部邮件
        </p>
      </mat-tab-content>
      <mat-tab-content value="unread">
        <p class="tabs-variant-page">
          未读邮件
        </p>
      </mat-tab-content>
      <mat-tab-content value="archived">
        <p class="tabs-variant-page">
          已归档邮件
        </p>
      </mat-tab-content>
    </mat-tabs>

    <p class="tabs-variant-label">
      secondary（48px 水平图文与徽标）
    </p>
    <mat-tabs
      v-model="secondaryWithIconActive"
      variant="secondary"
    >
      <mat-tab-item
        value="overview"
        label="概述"
        icon="article"
        :badge="{ content: 3 }"
      />
      <mat-tab-item
        value="specs"
        label="规格"
      />

      <mat-tab-content value="overview">
        <p class="tabs-variant-page">
          概述与更新动态
        </p>
      </mat-tab-content>
      <mat-tab-content value="specs">
        <p class="tabs-variant-page">
          技术规格与参数
        </p>
      </mat-tab-content>
    </mat-tabs>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.tabs-variant-example {
  inline-size: 100%;
}

.tabs-variant-label {
  margin-block: 12px 4px;
  color: var(--mat-sys-color-on-surface-variant);
}

.tabs-variant-page {
  padding: 16px;
}
</style>
<!-- #endregion style -->
