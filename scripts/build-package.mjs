import {
  copyFile, readFile, rm, writeFile,
} from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';

const projectRoot = resolve(import.meta.dirname, '..');
const distRoot = resolve(projectRoot, 'dist');

await build({
  configFile: resolve(projectRoot, 'vite.lib.config.js'),
});

const [baseStyles, componentStyles] = await Promise.all([
  readFile(resolve(projectRoot, 'src/styles/index.css'), 'utf8'),
  readFile(resolve(distRoot, 'components.css'), 'utf8'),
]);

await Promise.all([
  writeFile(resolve(distRoot, 'styles.css'), `${baseStyles.trimEnd()}\n\n${componentStyles}`),
  copyFile(resolve(projectRoot, 'src/styles/tailwind.css'), resolve(distRoot, 'tailwind.css')),
  copyFile(resolve(projectRoot, 'src/index.d.ts'), resolve(distRoot, 'index.d.ts')),
  rm(resolve(distRoot, 'components.css')),
]);
