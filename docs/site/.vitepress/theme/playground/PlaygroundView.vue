<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useMatTheme } from 'mde-vue';
import { withBase } from 'vitepress';
import MonacoEditor from './MonacoEditor.vue';
import { compileSfc } from './compileSfc.js';
import {
  componentList,
  DEFAULT_EXAMPLE_KEY,
  loadExampleSource,
} from './examples.js';

const matTheme = useMatTheme();
const isDark = computed(() => matTheme.resolvedMode.value === 'dark');

const selectedComponentKey = ref('button');
const selectedExampleKey = ref(DEFAULT_EXAMPLE_KEY);
const currentCode = ref('');
const originalCode = ref('');
const DEFAULT_MAT_UI_CODE = `import { createMatUi } from 'mde-vue';

export const matUi = createMatUi({
  iconClass: 'material-symbols-outlined',
  useCursor: false,
  defaults: {},
});

export default matUi;
`;
const currentMatUiCode = ref(DEFAULT_MAT_UI_CODE);
const compileErrors = ref([]);
const runtimeError = ref('');
const isSandboxReady = ref(false);
const iframeRef = ref(null);
const isCopied = ref(false);
const activeTab = ref('App.vue');

const splitPercent = ref(50);
const isDragging = ref(false);
const containerRef = ref(null);

const sandboxSrc = computed(() => withBase('/playground/sandbox.html'));

const currentComponentExamples = computed(() => {
  const found = componentList.find((c) => c.key === selectedComponentKey.value);
  return found ? found.examples : [];
});

const componentOptions = computed(() => componentList.map((c) => ({
  title: c.label,
  value: c.key,
})));

const exampleOptions = computed(() => currentComponentExamples.value.map((e) => ({
  title: e.name,
  value: e.key,
})));

/**
 * 编译当前代码并向 iframe 发送更新消息
 */
let compileTimer = null;
function triggerCompile() {
  if (compileTimer) {
    clearTimeout(compileTimer);
  }
  compileTimer = setTimeout(() => {
    const result = compileSfc(currentCode.value);
    compileErrors.value = result.errors || [];

    if (result.errors.length === 0 && iframeRef.value && isSandboxReady.value) {
      runtimeError.value = '';
      const themePayload = {
        mode: matTheme.resolvedMode.value,
        seedColor: matTheme.seedColor.value,
        schemeVariant: matTheme.schemeVariant.value,
        contrastLevel: matTheme.contrastLevel.value,
      };
      iframeRef.value.contentWindow?.postMessage({
        type: 'UPDATE_CODE',
        code: result.code,
        css: result.css,
        matUiCode: currentMatUiCode.value,
        theme: themePayload,
      }, '*');
    }
  }, 250);
}

/**
 * 载入指定示例代码
 *
 * @param {string} key
 */
async function loadExample(key) {
  const code = await loadExampleSource(key);
  currentCode.value = code;
  originalCode.value = code;
  runtimeError.value = '';
  compileErrors.value = [];
  triggerCompile();

  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    url.searchParams.set('example', key);
    window.history.replaceState(null, '', `${url.pathname}${url.search}`);
  }
}

function handleComponentChange(newCompKey) {
  if (!newCompKey || newCompKey === selectedComponentKey.value) {
    return;
  }
  selectedComponentKey.value = newCompKey;
  const examples = currentComponentExamples.value;
  if (examples.length > 0) {
    selectedExampleKey.value = examples[0].key;
    loadExample(examples[0].key);
  }
}

function handleExampleChange(newExKey) {
  if (!newExKey || newExKey === selectedExampleKey.value) {
    return;
  }
  selectedExampleKey.value = newExKey;
  loadExample(newExKey);
}

function resetCode() {
  if (activeTab.value === 'mat-ui.js') {
    currentMatUiCode.value = DEFAULT_MAT_UI_CODE;
  } else {
    currentCode.value = originalCode.value;
  }
  triggerCompile();
}

async function copyCode() {
  try {
    const textToCopy = activeTab.value === 'mat-ui.js'
      ? currentMatUiCode.value
      : currentCode.value;
    await navigator.clipboard.writeText(textToCopy);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch {}
}

function startDrag(event) {
  isDragging.value = true;
  event.preventDefault();
}

function onMouseMove(event) {
  if (!isDragging.value || !containerRef.value) {
    return;
  }
  const rect = containerRef.value.getBoundingClientRect();
  if (rect.width <= 0) {
    return;
  }
  const offsetX = event.clientX - rect.left;
  const percent = Math.min(Math.max((offsetX / rect.width) * 100, 20), 80);
  splitPercent.value = percent;
}

function onMouseUp() {
  isDragging.value = false;
}

function handleIframeMessage(event) {
  const data = event.data;
  if (!data || typeof data !== 'object') {
    return;
  }

  if (data.type === 'SANDBOX_READY') {
    isSandboxReady.value = true;
    iframeRef.value?.contentWindow?.postMessage({
      type: 'UPDATE_THEME',
      theme: {
        mode: matTheme.resolvedMode.value,
        seedColor: matTheme.seedColor.value,
        schemeVariant: matTheme.schemeVariant.value,
        contrastLevel: matTheme.contrastLevel.value,
      },
    }, '*');
    triggerCompile();
  } else if (data.type === 'SANDBOX_RENDER_SUCCESS') {
    runtimeError.value = '';
  } else if (data.type === 'SANDBOX_RUNTIME_ERROR') {
    runtimeError.value = data.message || '组件运行时异常';
  }
}

watch([
  () => matTheme.resolvedMode.value,
  () => matTheme.seedColor.value,
  () => matTheme.schemeVariant.value,
  () => matTheme.contrastLevel.value,
], ([mode, seedColor, schemeVariant, contrastLevel]) => {
  if (iframeRef.value && isSandboxReady.value) {
    iframeRef.value.contentWindow?.postMessage({
      type: 'UPDATE_THEME',
      theme: { mode, seedColor, schemeVariant, contrastLevel },
    }, '*');
  }
});

onMounted(() => {
  window.addEventListener('message', handleIframeMessage);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  const searchParams = new URLSearchParams(window.location.search);
  const paramKey = searchParams.get('example');
  if (paramKey && paramKey.includes('/')) {
    const [compKey] = paramKey.split('/');
    selectedComponentKey.value = compKey;
    selectedExampleKey.value = paramKey;
    loadExample(paramKey);
  } else {
    loadExample(DEFAULT_EXAMPLE_KEY);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleIframeMessage);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  if (compileTimer) {
    clearTimeout(compileTimer);
  }
});
</script>

<template>
  <div class="mde-playground-root">
    <header class="mde-playground-header">
      <div class="mde-playground-header__start">
        <mat-select
          :model-value="selectedComponentKey"
          label="组件"
          variant="outlined"
          :items="componentOptions"
          class="mde-playground-select mde-playground-select--component"
          @update:model-value="handleComponentChange"
        />

        <mat-select
          :model-value="selectedExampleKey"
          label="示例"
          variant="outlined"
          :items="exampleOptions"
          class="mde-playground-select mde-playground-select--example"
          @update:model-value="handleExampleChange"
        />
      </div>

      <div class="mde-playground-header__end">
        <mat-btn
          variant="standard"
          icon="restart_alt"
          label="重置代码"
          @click="resetCode"
        >
          重置
        </mat-btn>

        <mat-btn
          variant="standard"
          :icon="isCopied ? 'check' : 'content_copy'"
          label="复制代码"
          @click="copyCode"
        >
          {{ isCopied ? '已复制' : '复制' }}
        </mat-btn>
      </div>
    </header>

    <div
      ref="containerRef"
      class="mde-playground-workspace"
      :class="{ 'is-dragging': isDragging }"
    >
      <div
        class="mde-playground-pane mde-playground-pane--editor"
        :style="{ inlineSize: `${splitPercent}%` }"
      >
        <div class="mde-playground-tabs" role="tablist" aria-label="文件标签页">
          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'App.vue'"
            class="mde-playground-tab"
            :class="{ 'is-active': activeTab === 'App.vue' }"
            @click="activeTab = 'App.vue'"
          >
            <mat-icon icon="code" class="mde-playground-tab__icon" aria-hidden="true" />
            <span class="mde-playground-tab__name">App.vue</span>
          </button>

          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'mat-ui.js'"
            class="mde-playground-tab"
            :class="{ 'is-active': activeTab === 'mat-ui.js' }"
            @click="activeTab = 'mat-ui.js'"
          >
            <mat-icon icon="tune" class="mde-playground-tab__icon mde-playground-tab__icon--config" aria-hidden="true" />
            <span class="mde-playground-tab__name">mat-ui.js</span>
          </button>
        </div>

        <div class="mde-playground-editor-host">
          <ClientOnly>
            <MonacoEditor
              v-model:app-code="currentCode"
              v-model:mat-ui-code="currentMatUiCode"
              :active-file="activeTab"
              :is-dark="isDark"
              @change="triggerCompile"
            />
          </ClientOnly>
        </div>

        <div v-if="compileErrors.length > 0" class="mde-playground-error-banner">
          <mat-icon icon="error" class="mde-playground-error-icon" aria-hidden="true" />
          <div class="mde-playground-error-text">
            <div v-for="(err, i) in compileErrors" :key="i">
              {{ err }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="mde-playground-resizer"
        role="separator"
        aria-orientation="vertical"
        tabindex="0"
        @mousedown="startDrag"
      >
        <div class="mde-playground-resizer-line" />
      </div>

      <div
        class="mde-playground-pane mde-playground-pane--preview"
        :style="{ inlineSize: `calc(100% - ${splitPercent}% - 8px)` }"
      >
        <div class="mde-playground-preview-host">
          <div v-if="runtimeError" class="mde-playground-error-banner mde-playground-error-banner--runtime">
            <mat-icon icon="warning" class="mde-playground-error-icon" aria-hidden="true" />
            <div class="mde-playground-error-text">
              {{ runtimeError }}
            </div>
          </div>

          <iframe
            ref="iframeRef"
            :src="sandboxSrc"
            class="mde-playground-iframe"
            sandbox="allow-scripts allow-same-origin allow-modals"
            title="组件实时预览沙箱"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mde-playground-root {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    inline-size: 100%;
    block-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
    overflow: hidden;
    background: var(--mat-sys-color-surface);
    color: var(--mat-sys-color-on-surface);
  }

  .mde-playground-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    padding: 8px 20px;
    background: var(--mat-sys-color-surface-container-low);
    border-block-end: 1px solid var(--mat-sys-color-outline-variant);
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .mde-playground-header__start {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .mde-playground-select--component {
    inline-size: 210px;
  }

  .mde-playground-select--example {
    inline-size: 280px;
  }

  .mde-playground-header__end {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .mde-playground-workspace {
    display: flex;
    flex: 1 1 0%;
    inline-size: 100%;
    block-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
    overflow: hidden;
    position: relative;
  }

  .mde-playground-workspace.is-dragging {
    user-select: none;
    cursor: col-resize;
  }

  .mde-playground-workspace.is-dragging iframe {
    pointer-events: none;
  }

  .mde-playground-pane {
    display: flex;
    flex-direction: column;
    block-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
    overflow: hidden;
    position: relative;
  }

  .mde-playground-pane--editor {
    background: var(--mat-sys-color-surface);
  }

  .mde-playground-pane--preview {
    background: var(--mat-sys-color-surface-container-lowest);
  }

  .mde-playground-tabs {
    display: flex;
    align-items: stretch;
    min-block-size: 36px;
    background: var(--mat-sys-color-surface-container);
    border-block-end: 1px solid var(--mat-sys-color-outline-variant);
    overflow-x: auto;
    flex-shrink: 0;
  }

  .mde-playground-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding-inline: 14px;
    padding-block: 6px;
    font-size: .8125rem;
    font-family: var(--mat-ref-typeface-plain, sans-serif);
    color: var(--mat-sys-color-on-surface-variant);
    background: transparent;
    border: none;
    border-block-start: 2px solid transparent;
    border-inline-end: 1px solid var(--mat-sys-color-outline-variant);
    cursor: default;
    outline: none;
    white-space: nowrap;
    transition: background .15s, color .15s, border-color .15s;
  }

  .mde-playground-tab:hover {
    background: var(--mat-sys-color-surface-container-high);
    color: var(--mat-sys-color-on-surface);
  }

  .mde-playground-tab.is-active {
    background: var(--mat-sys-color-surface);
    color: var(--mat-sys-color-primary);
    border-block-start-color: var(--mat-sys-color-primary);
    font-weight: 500;
  }

  .mde-playground-tab__icon {
    font-size: 16px;
  }

  .mde-playground-tab__icon--config {
    color: var(--mat-sys-color-primary);
  }

  .mde-playground-tab__name {
    line-height: 1;
  }

  .mde-playground-editor-host {
    flex: 1 1 auto;
    inline-size: 100%;
    block-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
    position: relative;
  }

  .mde-playground-resizer {
    inline-size: 8px;
    block-size: 100%;
    flex-shrink: 0;
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--mat-sys-color-surface-container);
    border-inline: 1px solid var(--mat-sys-color-outline-variant);
    transition: background .2s;
  }

  .mde-playground-resizer:hover,
  .mde-playground-workspace.is-dragging .mde-playground-resizer {
    background: var(--mat-sys-color-secondary-container);
  }

  .mde-playground-resizer-line {
    inline-size: 2px;
    block-size: 24px;
    border-radius: 1px;
    background: var(--mat-sys-color-outline);
  }

  .mde-playground-preview-host {
    flex: 1 1 auto;
    inline-size: 100%;
    block-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
    position: relative;
  }

  .mde-playground-iframe {
    inline-size: 100%;
    block-size: 100%;
    border: none;
    background: transparent;
  }

  .mde-playground-error-banner {
    position: absolute;
    inset-inline: 12px;
    inset-block-end: 12px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 14px;
    background: var(--mat-sys-color-error-container);
    color: var(--mat-sys-color-on-error-container);
    border-radius: var(--mat-sys-shape-corner-medium, 8px);
    font-size: .8125rem;
    line-height: 1.4;
    box-shadow: var(--mat-sys-elevation-level2);
    z-index: 10;
  }

  .mde-playground-error-icon {
    font-size: 18px;
    flex-shrink: 0;
    margin-block-start: 1px;
  }

  .mde-playground-error-text {
    flex: 1 1 auto;
    word-break: break-all;
    white-space: pre-wrap;
  }

  @media (width <= 768px) {
    .mde-playground-workspace {
      flex-direction: column;
    }

    .mde-playground-pane--editor,
    .mde-playground-pane--preview {
      inline-size: 100% !important;
      block-size: 50% !important;
    }

    .mde-playground-resizer {
      inline-size: 100%;
      block-size: 8px;
      cursor: row-resize;
    }

    .mde-playground-resizer-line {
      inline-size: 24px;
      block-size: 2px;
    }
  }
}
</style>
