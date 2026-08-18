<script setup>
import { ref, watch } from 'vue';
import { useMatTheme } from 'mde-vue';

const COLOR_TOKEN_PREFIX = '--mat-sys-color-';
const theme = useMatTheme();
const colorTokens = ref([]);

function updateColorTokens() {
  const tokens = [];

  for (let index = 0; index < theme.target.style.length; index += 1) {
    const propertyName = theme.target.style.item(index);

    if (!propertyName.startsWith(COLOR_TOKEN_PREFIX)) {
      continue;
    }

    tokens.push({
      name: propertyName.slice(COLOR_TOKEN_PREFIX.length),
      value: theme.target.style.getPropertyValue(propertyName).trim().toLowerCase(),
    });
  }

  colorTokens.value = tokens;
}

watch(() => [
  theme.resolvedMode.value,
  theme.seedColor.value,
  theme.schemeVariant.value,
  theme.contrastLevel.value,
], updateColorTokens, { immediate: true });
</script>

<template>
  <div class="table-wrapper theme-color-tokens">
    <table
      class="theme-color-tokens__table"
      aria-label="当前配色令牌"
    >
      <thead>
        <tr>
          <th scope="col">
            令牌
          </th>
          <th scope="col">
            RGB 值
          </th>
          <th scope="col">
            预览
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="token in colorTokens" :key="token.name">
          <td>
            {{ token.name }}
          </td>
          <td>
            <code>{{ token.value }}</code>
          </td>
          <td>
            <span
              class="theme-color-tokens__swatch"
              :style="{ backgroundColor: token.value, borderColor: token.value }"
              aria-hidden="true"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.theme-color-tokens__table {
  inline-size: 100%;
  min-inline-size: 320px;
}

.theme-color-tokens__table code {
  color: inherit;
  font: var(--mat-sys-typescale-body-medium-weight) var(--mat-sys-typescale-body-medium-size) / var(--mat-sys-typescale-body-medium-line-height) var(--mat-sys-typescale-body-medium-font);
}

.theme-color-tokens__swatch {
  display: block;
  inline-size: 32px;
  block-size: 32px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: var(--mat-sys-shape-corner-small);
}
</style>
