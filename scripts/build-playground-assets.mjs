import {
  copyFile,
  mkdir,
  writeFile,
} from 'node:fs/promises';
import process from 'node:process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const projectRoot = resolve(fileURLToPath(import.meta.url), '../..');
const playgroundDir = resolve(projectRoot, 'docs/site/public/playground');
const assetsDir = resolve(playgroundDir, 'assets');

export async function buildPlaygroundAssets() {
  await mkdir(assetsDir, { recursive: true });

  const vueSrc = resolve(projectRoot, 'node_modules/vue/dist/vue.esm-browser.js');
  const vueDest = resolve(assetsDir, 'vue.esm-browser.js');
  await copyFile(vueSrc, vueDest);

  await build({
    configFile: false,
    logLevel: 'warn',
    build: {
      outDir: assetsDir,
      emptyOutDir: false,
      lib: {
        entry: resolve(projectRoot, 'node_modules/@material/material-color-utilities/index.js'),
        formats: ['es'],
        fileName: () => 'material-color-utilities.js',
      },
      rollupOptions: {
        output: {
          exports: 'named',
        },
      },
    },
  });

  const mdeSrc = resolve(projectRoot, 'dist/mde-vue.js');
  const mdeDest = resolve(assetsDir, 'mde-vue.js');
  await copyFile(mdeSrc, mdeDest);

  const stylesSrc = resolve(projectRoot, 'dist/styles.css');
  const stylesDest = resolve(assetsDir, 'styles.css');
  await copyFile(stylesSrc, stylesDest);

  const sandboxHtmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mde-vue playground sandbox</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block">
  <link rel="stylesheet" href="./assets/styles.css">
  <style>
    @layer tailwind-theme, tailwind-reset, docs-base, mde, tailwind-utilities, mde-final;

    html, body {
      margin: 0;
      padding: 0;
      min-block-size: 100%;
      background: var(--mat-sys-color-surface, #fef7ff);
      color: var(--mat-sys-color-on-surface, #1d1b20);
      font-family: var(--mat-ref-typeface-plain, "Noto Sans SC", sans-serif);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      box-sizing: border-box;
      padding: 24px;
    }

    #app {
      min-block-size: 100%;
    }

    .playground-preview-wrapper {
      min-block-size: 100%;
    }
  </style>
  <style id="playground-dynamic-style"></style>
  <script type="importmap">
  {
    "imports": {
      "vue": "./assets/vue.esm-browser.js",
      "@material/material-color-utilities": "./assets/material-color-utilities.js",
      "mde-vue": "./assets/mde-vue.js"
    }
  }
  </script>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    import { createApp, h } from 'vue';
    import { createMatUi } from 'mde-vue';

    let currentApp = null;
    let currentStyleTag = document.getElementById('playground-dynamic-style');
    let currentThemeOptions = {};

    function applyThemeToDocument(options) {
      if (options && options.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    window.addEventListener('message', async (event) => {
      const data = event.data;
      if (!data || typeof data !== 'object') {
        return;
      }

      if (data.type === 'UPDATE_THEME') {
        currentThemeOptions = data.theme || {};
        applyThemeToDocument(currentThemeOptions);
        return;
      }

      if (data.type === 'UPDATE_CODE') {
        const { code, css, matUiCode, theme } = data;
        if (theme) {
          currentThemeOptions = theme;
          applyThemeToDocument(currentThemeOptions);
        }

        try {
          if (currentApp) {
            currentApp.unmount();
            currentApp = null;
            document.getElementById('app').innerHTML = '';
          }

          if (currentStyleTag) {
            currentStyleTag.textContent = css || '';
          }

          const blob = new Blob([code], { type: 'application/javascript' });
          const blobUrl = URL.createObjectURL(blob);
          let userModule;
          try {
            userModule = await import(blobUrl);
          } finally {
            URL.revokeObjectURL(blobUrl);
          }

          const Comp = userModule.default || {};
          if (userModule.__scopeId) {
            Comp.__scopeId = userModule.__scopeId;
          }

          let matUiInstance;
          if (matUiCode && matUiCode.trim()) {
            const matUiBlob = new Blob([matUiCode], { type: 'application/javascript' });
            const matUiBlobUrl = URL.createObjectURL(matUiBlob);
            try {
              const matUiModule = await import(matUiBlobUrl);
              matUiInstance = matUiModule.matUi || matUiModule.default;
            } finally {
              URL.revokeObjectURL(matUiBlobUrl);
            }
          }

          if (!matUiInstance || typeof matUiInstance.install !== 'function') {
            matUiInstance = createMatUi({
              iconClass: 'material-symbols-outlined',
              theme: currentThemeOptions,
            });
          }

          currentApp = createApp({
            render() {
              return h('div', { class: 'playground-preview-wrapper' }, [
                h(Comp),
              ]);
            },
          });

          currentApp.use(matUiInstance);

          currentApp.config.errorHandler = (err) => {
            window.parent.postMessage({
              type: 'SANDBOX_RUNTIME_ERROR',
              message: err?.message || String(err),
            }, '*');
          };

          currentApp.mount('#app');
          window.parent.postMessage({ type: 'SANDBOX_RENDER_SUCCESS' }, '*');
        } catch (err) {
          window.parent.postMessage({
            type: 'SANDBOX_RUNTIME_ERROR',
            message: err?.message || String(err),
          }, '*');
        }
      }
    });

    window.addEventListener('error', (event) => {
      window.parent.postMessage({
        type: 'SANDBOX_RUNTIME_ERROR',
        message: event?.message || '运行时脚本错误',
      }, '*');
    });

    window.parent.postMessage({ type: 'SANDBOX_READY' }, '*');
  </script>
</body>
</html>
`;

  await writeFile(resolve(playgroundDir, 'sandbox.html'), sandboxHtmlContent, 'utf8');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await buildPlaygroundAssets();
}

export default buildPlaygroundAssets;
