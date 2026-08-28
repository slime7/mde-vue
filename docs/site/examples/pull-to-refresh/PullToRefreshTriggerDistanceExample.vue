<!-- #region script -->
<script setup>
import { ref } from 'vue';

const shortRefreshing = ref(false);
const longRefreshing = ref(false);
let shortCount = 0;
let longCount = 0;

const shortItems = ref(['短距离 甲', '短距离 乙', '短距离 丙']);
const longItems = ref(['长距离 甲', '长距离 乙', '长距离 丙']);

async function refreshShort() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  shortCount += 1;
  shortItems.value.unshift(`短距离 新增 ${shortCount}`);
  shortRefreshing.value = false;
}

async function refreshLong() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  longCount += 1;
  longItems.value.unshift(`长距离 新增 ${longCount}`);
  longRefreshing.value = false;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="pull-to-refresh-trigger-example">
    <section>
      <h4>triggerDistance 80（默认数字）</h4>
      <mat-scroll-area class="area">
        <mat-pull-to-refresh v-model="shortRefreshing" placeholder @refresh="refreshShort" />
        <ul>
          <li v-for="item in shortItems" :key="item">
            {{ item }}
          </li>
        </ul>
      </mat-scroll-area>
    </section>
    <section>
      <h4>triggerDistance "160"（数字字符串）</h4>
      <mat-scroll-area class="area">
        <mat-pull-to-refresh
          v-model="longRefreshing"
          placeholder
          trigger-distance="160"
          @refresh="refreshLong"
        />
        <ul>
          <li v-for="item in longItems" :key="item">
            {{ item }}
          </li>
        </ul>
      </mat-scroll-area>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.pull-to-refresh-trigger-example {
  user-select: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  inline-size: 100%;
}

section {
  display: grid;
  gap: 8px;
}

h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.area {
  block-size: 200px;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul li {
  padding: 10px 16px;
  border-bottom: 1px solid var(--mat-sys-outline-variant);
}
</style>
<!-- #endregion style -->
