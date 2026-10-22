<script setup>
const items = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  tooltip: {
    subhead: `消息 ${index + 1}`,
    content: `第 ${index + 1} 条消息的富文本摘要。`,
  },
}));
const rightItems = items.slice(0, 7);
const sizedItems = items.slice(0, 6);
</script>

<template>
  <section data-scene="chat-minimap" class="chat-minimap-scene">
    <h1>聊天缩略图场景</h1>

    <div class="samples">
      <div class="sample sample--left">
        <span class="sample__label">direction="left"</span>
        <mat-chat-minimap
          data-testid="left-minimap"
          direction="left"
          :items="items"
        />
      </div>

      <div class="sample sample--right">
        <span class="sample__label">direction="right"</span>
        <mat-chat-minimap
          data-testid="right-minimap"
          direction="right"
          :items="rightItems"
        />
      </div>

      <div class="sample">
        <span class="sample__label">自定义尺寸</span>
        <mat-chat-minimap
          data-testid="sized-minimap"
          :items="sizedItems"
          :item-width="24"
          :item-height="4"
          :item-gap="12"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.chat-minimap-scene {
  padding: 48px;
}

.samples {
  display: flex;
  gap: 120px;
  margin-block-start: 40px;
}

.sample {
  display: flex;
  flex-direction: column;
  inline-size: 180px;
  gap: 16px;
}

.sample--left {
  align-items: flex-start;
}

.sample--right {
  align-items: flex-end;
}

.sample__label {
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  line-height: var(--mat-sys-typescale-label-large-line-height);
}
</style>
