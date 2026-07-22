<script setup>
import { provide } from 'vue';
import { MAT_LIST_GROUP_ACTIVATOR_KEY } from '../list-context';

defineOptions({ name: 'MatListGroupActivatorProvider' });

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
});

provide(MAT_LIST_GROUP_ACTIVATOR_KEY, props.context);
</script>

<template>
  <slot />
</template>
