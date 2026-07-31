import {
  copyFile, mkdir, readdir, readFile, rm, writeFile,
} from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';

const projectRoot = resolve(import.meta.dirname, '..');
const distRoot = resolve(projectRoot, 'dist');
const sourceRoot = resolve(projectRoot, 'src');

/**
 * @param {string} source
 * @returns {string[]}
 */
function readRootExportNames(source) {
  return [...source.matchAll(/export\s*\{([\s\S]*?)\}\s*from/g)]
    .flatMap(([, exports]) => exports.split(','))
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.match(/\bas\s+(\w+)$/)?.[1] ?? item);
}

/**
 * @param {string} source
 * @returns {{ defaultExport: string, namedExports: string[] }}
 */
function readComponentExports(source) {
  const namedExports = [...source.matchAll(/^import\s+(\w+)\s+from/gm)]
    .map(([, name]) => name);
  const defaultExport = source.match(/export default (\w+);/)?.[1];

  if (!defaultExport || namedExports.length === 0) {
    throw new Error('公共组件入口必须提供具名导出和默认导出');
  }

  return { defaultExport, namedExports };
}

await build({
  configFile: resolve(projectRoot, 'vite.lib.config.js'),
});

const [baseStyles, componentStyles] = await Promise.all([
  readFile(resolve(projectRoot, 'src/styles/index.css'), 'utf8'),
  readFile(resolve(distRoot, 'components.css'), 'utf8'),
]);

const rootExportNames = readRootExportNames(
  await readFile(resolve(sourceRoot, 'index.js'), 'utf8'),
);
const componentDirectories = (await readdir(resolve(sourceRoot, 'components'), {
  withFileTypes: true,
}))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

await writeFile(
  resolve(distRoot, 'index.js'),
  `export {\n  ${rootExportNames.join(',\n  ')},\n} from './mdu-ui.js';\n`,
);

await Promise.all(componentDirectories.map(async (directory) => {
  const sourcePath = resolve(sourceRoot, 'components', directory, 'index.js');
  let source;

  try {
    source = await readFile(sourcePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  const { defaultExport, namedExports } = readComponentExports(source);
  const outputDirectory = resolve(distRoot, 'components', directory);

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(
    resolve(outputDirectory, 'index.js'),
    `export { ${namedExports.join(', ')} } from '../../mdu-ui.js';\nexport { ${defaultExport} as default } from '../../mdu-ui.js';\n`,
  );
}));

await Promise.all([
  mkdir(resolve(distRoot, 'directives/intersection'), { recursive: true }),
  mkdir(resolve(distRoot, 'functions'), { recursive: true }),
]);

await Promise.all([
  writeFile(
    resolve(distRoot, 'directives/intersection/index.js'),
    "export { Intersection } from '../../mdu-ui.js';\nexport { Intersection as default } from '../../mdu-ui.js';\n",
  ),
  writeFile(
    resolve(distRoot, 'functions/index.js'),
    [
      'export {',
      '  __alert as alert,',
      '  __confirm as confirm,',
      '  __dialog as dialog,',
      '  __prompt as prompt,',
      '  __snackbar as snackbar,',
      '  __toast as toast,',
      "} from '../mdu-ui.js';",
      '',
    ].join('\n'),
  ),
]);

await Promise.all([
  writeFile(resolve(distRoot, 'styles.css'), `${baseStyles.trimEnd()}\n\n${componentStyles}`),
  copyFile(resolve(projectRoot, 'src/styles/tailwind.css'), resolve(distRoot, 'tailwind.css')),
  copyFile(resolve(projectRoot, 'src/index.d.ts'), resolve(distRoot, 'index.d.ts')),
  rm(resolve(distRoot, 'components.css')),
]);
