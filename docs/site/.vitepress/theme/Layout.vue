<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts';
import { useRouter } from 'vitepress';
import { provide } from 'vue';

const { Layout: DefaultLayout } = DefaultTheme;
const router = useRouter();

provide('toggle-appearance', () => {
  router.go('/guide/theme');
});
</script>

<template>
  <DefaultLayout />
</template>
