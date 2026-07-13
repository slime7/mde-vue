<script setup>
import {
  Fragment, inject, isVNode, provide, useSlots,
} from 'vue';
import { MAT_SPLIT_BTN_KEY } from '../button-context';

defineOptions({
  name: 'MatSplitSegment',
});

const props = defineProps({
  role: {
    type: String,
    required: true,
    validator(value) {
      return ['leading', 'trailing'].includes(value);
    },
  },
});

const context = inject(MAT_SPLIT_BTN_KEY);
const slots = useSlots();

provide(MAT_SPLIT_BTN_KEY, {
  ...context,
  role: props.role,
});

/**
 * @param {import('vue').VNode[]} nodes
 * @returns {import('vue').VNode[]}
 */
function flattenNodes(nodes) {
  return nodes.flatMap((node) => {
    if (isVNode(node) && node.type === Fragment && Array.isArray(node.children)) {
      return flattenNodes(node.children);
    }

    return [node];
  });
}

function FirstValidButton() {
  const allowedNames = props.role === 'trailing'
    ? ['MatIconBtn']
    : ['MatBtn', 'MatIconBtn'];

  return flattenNodes(slots.default?.() ?? []).find((node) => (
    isVNode(node) && allowedNames.includes(node.type?.name ?? node.type?.__name)
  )) ?? null;
}
</script>

<template>
  <FirstValidButton />
</template>
