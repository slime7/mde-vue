<script setup>
import { ref } from 'vue';

const basicOpen = ref(false);
const submenuOpen = ref(false);
const clampOpen = ref(false);

function record(name) {
  window.pushEvent('menu-item', name);
}
</script>

<template>
  <section data-scene="menu" class="menu-scene">
    <h1>菜单场景</h1>

    <mat-menu
      id="scene-basic-menu"
      v-model="basicOpen"
    >
      <template #activator>
        <mat-btn
          data-testid="open-basic"
          aria-controls="scene-basic-menu"
          aria-haspopup="menu"
          :aria-expanded="basicOpen"
          @click="basicOpen = !basicOpen"
        >
          基础菜单
        </mat-btn>
      </template>
      <mat-menu-item
        data-testid="item-cut"
        @click="record('cut')"
      >
        剪切
      </mat-menu-item>
      <mat-menu-item
        data-testid="item-disabled"
        disabled
      >
        禁用项目
      </mat-menu-item>
      <mat-menu-item
        data-testid="item-copy"
        @click="record('copy')"
      >
        复制
      </mat-menu-item>
    </mat-menu>

    <mat-menu
      id="scene-submenu-menu"
      v-model="submenuOpen"
      anchor="scene-submenu-trigger"
    >
      <mat-menu-item data-testid="submenu-parent">
        导出
        <template #submenu>
          <mat-menu>
            <mat-menu-item
              data-testid="submenu-pdf"
              @click="record('pdf')"
            >
              PDF
            </mat-menu-item>
            <mat-menu-item
              data-testid="submenu-svg"
              @click="record('svg')"
            >
              SVG
            </mat-menu-item>
          </mat-menu>
        </template>
      </mat-menu-item>
      <mat-menu-item
        data-testid="item-share"
        @click="record('share')"
      >
        分享
      </mat-menu-item>
    </mat-menu>

    <mat-menu
      id="scene-clamp-menu"
      v-model="clampOpen"
      anchor="scene-clamp-trigger"
    >
      <mat-menu-item>靠近边缘的项目甲</mat-menu-item>
      <mat-menu-item>靠近边缘的项目乙</mat-menu-item>
      <mat-menu-item>靠近边缘的项目丙</mat-menu-item>
    </mat-menu>

    <div class="corner">
      <mat-btn
        id="scene-clamp-trigger"
        data-testid="open-clamp"
        @click="clampOpen = !clampOpen"
      >
        边缘菜单
      </mat-btn>
      <mat-btn
        id="scene-submenu-trigger"
        data-testid="open-submenu"
        aria-controls="scene-submenu-menu"
        aria-haspopup="menu"
        :aria-expanded="submenuOpen"
        @click="submenuOpen = !submenuOpen"
      >
        子菜单
      </mat-btn>
    </div>
  </section>
</template>

<style scoped>
.menu-scene {
  min-block-size: 200vh;
}

.corner {
  position: fixed;
  inset-block-end: 8px;
  inset-inline-end: 8px;
  display: flex;
  gap: 8px;
}
</style>
