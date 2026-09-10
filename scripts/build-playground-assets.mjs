import {
  copyFile,
  mkdir,
  readdir,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import process from 'node:process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { componentTitles } from '../docs/site/.vitepress/theme/playground/componentTitles.js';

const projectRoot = resolve(fileURLToPath(import.meta.url), '../..');
const playgroundDir = resolve(projectRoot, 'docs/site/public/playground');
const assetsDir = resolve(playgroundDir, 'assets');
const examplesSrcDir = resolve(projectRoot, 'docs/site/examples');
const examplesDir = resolve(playgroundDir, 'examples');
const examplesIndexPath = resolve(playgroundDir, 'examples.json');

/**
 * 判断目标文件是否已经与源文件一致。
 *
 * `copyFile` 在 Windows 上会保留源文件时间戳，在其它平台使用复制时刻，
 * 因此比较「源文件不晚于目标文件」即可同时覆盖两种行为。
 *
 * @param {string} srcPath 源文件路径。
 * @param {string} destPath 目标文件路径。
 * @returns {Promise<boolean>} 目标文件存在且大小与修改时间均未落后时为 true。
 */
async function isUpToDate(srcPath, destPath) {
  try {
    const [srcStat, destStat] = await Promise.all([stat(srcPath), stat(destPath)]);
    return srcStat.size === destStat.size && srcStat.mtimeMs <= destStat.mtimeMs;
  } catch {
    return false;
  }
}

/**
 * 把目录树同步到目标位置，跳过未变化的文件并清理源目录中已删除的条目。
 *
 * @param {string} srcDir 源目录。
 * @param {string} destDir 目标目录。
 * @returns {Promise<void>}
 */
async function syncDirectory(srcDir, destDir) {
  await mkdir(destDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });
  const expectedNames = new Set(entries.map((entry) => entry.name));

  await Promise.all(entries.map(async (entry) => {
    const srcPath = resolve(srcDir, entry.name);
    const destPath = resolve(destDir, entry.name);

    if (entry.isDirectory()) {
      await syncDirectory(srcPath, destPath);
      return;
    }

    if (await isUpToDate(srcPath, destPath)) {
      return;
    }

    await copyFile(srcPath, destPath);
  }));

  const existingEntries = await readdir(destDir, { withFileTypes: true });
  await Promise.all(existingEntries
    .filter((entry) => !expectedNames.has(entry.name))
    .map((entry) => rm(resolve(destDir, entry.name), { recursive: true, force: true })));
}

/**
 * 生成示例索引，供 playground 在运行时填充组件与示例下拉框。
 *
 * @returns {Promise<void>}
 */
async function writeExamplesIndex() {
  const componentEntries = await readdir(examplesSrcDir, { withFileTypes: true });

  const components = (await Promise.all(componentEntries
    .filter((entry) => entry.isDirectory())
    .map(async (entry) => {
      const files = (await readdir(resolve(examplesSrcDir, entry.name)))
        .filter((file) => file.endsWith('.vue'))
        .sort();

      if (files.length === 0) {
        return null;
      }

      return {
        key: entry.name,
        label: componentTitles[entry.name] || entry.name,
        examples: files.map((file) => {
          const name = file.slice(0, -'.vue'.length);
          return { key: `${entry.name}/${name}`, name };
        }),
      };
    })))
    .filter(Boolean);

  components.sort((a, b) => a.label.localeCompare(b.label, 'zh-CN'));

  await writeFile(examplesIndexPath, `${JSON.stringify(components, null, 2)}\n`, 'utf8');
}

export async function buildPlaygroundAssets() {
  await mkdir(assetsDir, { recursive: true });
  await syncDirectory(examplesSrcDir, examplesDir);
  await writeExamplesIndex();

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
    }

    #app {
      min-block-size: 100%;
    }

    .playground-preview-wrapper {
      min-block-size: 100%;
      box-sizing: border-box;
      padding: 24px;
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
    let currentMatUiInstance = null;
    let currentStyleTag = document.getElementById('playground-dynamic-style');
    let currentThemeOptions = {};
    let isUserThemeCustomized = false;

    function applyThemeToSandbox(options) {
      if (!options || typeof options !== 'object') {
        return;
      }

      if (options.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      if (currentMatUiInstance && currentMatUiInstance.theme && !isUserThemeCustomized) {
        const themeController = currentMatUiInstance.theme;
        if (options.mode && themeController.mode?.value !== options.mode) {
          themeController.setMode(options.mode);
        }
        if (options.seedColor && themeController.seedColor?.value !== options.seedColor) {
          themeController.setSeedColor(options.seedColor);
        }
        if (options.schemeVariant && themeController.schemeVariant?.value !== options.schemeVariant) {
          themeController.setSchemeVariant(options.schemeVariant);
        }
        if (typeof options.contrastLevel === 'number' && themeController.contrastLevel?.value !== options.contrastLevel) {
          themeController.setContrastLevel(options.contrastLevel);
        }
      }
    }

    window.addEventListener('message', async (event) => {
      const data = event.data;
      if (!data || typeof data !== 'object') {
        return;
      }

      if (data.type === 'UPDATE_THEME') {
        currentThemeOptions = data.theme || {};
        applyThemeToSandbox(currentThemeOptions);
        return;
      }

      if (data.type === 'UPDATE_CODE') {
        const { code, css, matUiCode, theme } = data;
        if (theme) {
          currentThemeOptions = theme;
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
          isUserThemeCustomized = false;
          if (matUiCode && matUiCode.trim()) {
            isUserThemeCustomized = /\\btheme\\s*:/.test(matUiCode);
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

          currentMatUiInstance = matUiInstance;
          applyThemeToSandbox(currentThemeOptions);

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
