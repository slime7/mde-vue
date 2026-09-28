<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { scenes } from './scenes/index.js';

const route = ref(window.location.hash);
const onHashChange = () => {
  route.value = window.location.hash;
};
window.addEventListener('hashchange', onHashChange);
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', onHashChange);
});

const sceneName = computed(() => route.value.replace(/^#\/?/, '').split('?')[0]);
const scene = computed(() => scenes[sceneName.value] ?? null);
</script>

<template>
  <component :is="scene" v-if="scene" />
  <main v-else data-scene="home">
    <h1>mde-vue E2E 场景</h1>
    <ul>
      <li v-for="(component, name) in scenes" :key="name">
        <a :href="`#/${name}`">{{ name }}</a>
      </li>
    </ul>
  </main>
</template>
