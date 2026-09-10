<script setup>
import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';

const props = defineProps({
  appCode: {
    type: String,
    default: '',
  },
  matUiCode: {
    type: String,
    default: '',
  },
  activeFile: {
    type: String,
    default: 'App.vue',
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:appCode', 'update:matUiCode', 'change']);

const containerRef = ref(null);
let monaco = null;
let editor = null;
let isInternalChange = false;
const models = new Map();

onMounted(async () => {
  if (!containerRef.value || typeof window === 'undefined') {
    return;
  }

  try {
    const monacoModule = await import('./monaco.js');
    monaco = monacoModule.default;

    if (!window.MonacoEnvironment) {
      window.MonacoEnvironment = {
        getWorker() {
          return null;
        },
      };
    }

    editor = monaco.editor.create(containerRef.value, {
      theme: props.isDark ? 'vs-dark' : 'vs',
      automaticLayout: true,
      readOnly: false,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13.5,
      lineHeight: 20,
      fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
      tabSize: 2,
      wordWrap: 'on',
      padding: { top: 12, bottom: 12 },
      renderLineHighlight: 'all',
    });

    const appModel = monaco.editor.createModel(props.appCode, 'html');
    const matUiModel = monaco.editor.createModel(props.matUiCode, 'javascript');

    models.set('App.vue', appModel);
    models.set('mat-ui.js', matUiModel);

    editor.setModel(models.get(props.activeFile) || appModel);

    appModel.onDidChangeContent(() => {
      const val = appModel.getValue();
      if (val !== props.appCode) {
        isInternalChange = true;
        emit('update:appCode', val);
        emit('change');
        isInternalChange = false;
      }
    });

    matUiModel.onDidChangeContent(() => {
      const val = matUiModel.getValue();
      if (val !== props.matUiCode) {
        isInternalChange = true;
        emit('update:matUiCode', val);
        emit('change');
        isInternalChange = false;
      }
    });
  } catch (err) {
    console.error('Monaco Editor 加载失败:', err);
  }
});

watch(() => props.appCode, (newVal) => {
  if (!editor || isInternalChange) {
    return;
  }
  const appModel = models.get('App.vue');
  if (appModel && appModel.getValue() !== newVal) {
    appModel.setValue(newVal || '');
  }
});

watch(() => props.matUiCode, (newVal) => {
  if (!editor || isInternalChange) {
    return;
  }
  const matUiModel = models.get('mat-ui.js');
  if (matUiModel && matUiModel.getValue() !== newVal) {
    matUiModel.setValue(newVal || '');
  }
});

watch(() => props.activeFile, (file) => {
  if (!editor || !models.has(file)) {
    return;
  }
  editor.setModel(models.get(file));
});

watch(() => props.isDark, (dark) => {
  if (!monaco) {
    return;
  }
  monaco.editor.setTheme(dark ? 'vs-dark' : 'vs');
});

onBeforeUnmount(() => {
  if (editor) {
    models.forEach((m) => m.dispose());
    models.clear();
    editor.dispose();
    editor = null;
  }
});
</script>

<template>
  <div ref="containerRef" class="playground-monaco-container" />
</template>

<style scoped>
.playground-monaco-container {
  inline-size: 100%;
  block-size: 100%;
  min-inline-size: 0;
  min-block-size: 0;
  overflow: hidden;
}
</style>
