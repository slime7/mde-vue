<script setup>
import { ref } from 'vue';

const expanded = ref(false);
const railExpanded = ref(false);
</script>

<template>
  <section
    data-scene="navigation-group"
    class="navigation-group-scene"
  >
    <h1>Navigation group 场景</h1>

    <div class="stage">
      <mat-navigation-group
        v-model:expanded="expanded"
        data-testid="group"
        title="分组"
      >
        <template #activator="{ toggle }">
          <button
            type="button"
            data-testid="toggle-group"
            @click="toggle"
          >
            {{ expanded ? '收起' : '展开' }}
          </button>
        </template>

        <mat-navigation-rail-item
          v-for="i in 3"
          :key="i"
          :value="`item-${i}`"
        >
          子项 {{ i }}
        </mat-navigation-rail-item>
      </mat-navigation-group>
    </div>

    <div class="stage">
      <button
        type="button"
        data-testid="toggle-rail-expanded"
        @click="railExpanded = !railExpanded"
      >
        切换 rail 展开
      </button>

      <mat-navigation-rail
        class="rail"
        collapsible
        :expanded="railExpanded"
        aria-label="导航栏"
      >
        <mat-navigation-rail-item
          value="home"
          data-testid="rail-item"
        >
          首页标签
        </mat-navigation-rail-item>
      </mat-navigation-rail>
    </div>
  </section>
</template>

<style scoped>
.navigation-group-scene {
  padding: 24px;
}

.stage {
  inline-size: 360px;
  margin-block-end: 24px;
}

.rail {
  block-size: 320px;
}
</style>
