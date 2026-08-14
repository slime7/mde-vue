import { readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { describe, expect, it } from 'vitest';

const mdeLayerOrder = '@layer mde.tokens, mde.components, mde.utilities;';
const finalLayer = '@layer mde-final;';

function listVueFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return listVueFiles(path);
    }

    return extname(entry.name) === '.vue' ? [path] : [];
  });
}

describe('CSS Layer 公共契约', () => {
  it('基础样式声明稳定层序并分别归入令牌层和工具层', () => {
    const styles = readFileSync('src/styles/index.css', 'utf8');

    expect(styles.trimStart().startsWith(`${mdeLayerOrder}\n${finalLayer}`)).toBe(true);
    expect(styles).toContain('@layer mde.tokens {');
    expect(styles).toContain('@layer mde.components {');
    expect(styles).toContain('@layer mde.utilities {');
    expect(styles).toContain('@layer mde-final {');
  });

  it('所有 Vue SFC 样式显式归入组件层', () => {
    const styleBlocks = listVueFiles('src')
      .flatMap((file) => [...readFileSync(file, 'utf8').matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gu)]
        .map((match) => ({ file, styles: match[1].trim() })));

    expect(styleBlocks.length).toBeGreaterThan(0);
    styleBlocks.forEach(({ file, styles }) => {
      expect(styles, file).toMatch(/^@layer mde\.components\s*\{/u);
      expect(styles, file).toMatch(/\}\s*$/u);
    });
  });

  it('分发样式保留层序且 Tailwind 映射保持独立', () => {
    const styles = readFileSync('dist/styles.css', 'utf8');
    const tailwind = readFileSync('src/styles/tailwind.css', 'utf8');

    expect(styles.trimStart().startsWith(`${mdeLayerOrder}\n${finalLayer}`)).toBe(true);
    expect(styles).toMatch(/@layer mde\.tokens\s*\{/u);
    expect(styles).toMatch(/@layer mde\.components\s*\{/u);
    expect(styles).toMatch(/@layer mde\.utilities\s*\{/u);
    expect(styles).toMatch(/@layer mde-final\s*\{/u);
    expect(tailwind).not.toContain('@layer mde');
  });

  it('最终层只保护不会阻断 Vue 运行时控制的安全不变量', () => {
    const styles = readFileSync('src/styles/index.css', 'utf8');
    const finalStyles = styles.slice(styles.indexOf('@layer mde-final {'));
    const runtimeProperties = [
      'display',
      'visibility',
      'opacity',
      'position',
      'inline-size',
      'block-size',
      'width',
      'height',
      'inset',
      'transform',
    ];

    runtimeProperties.forEach((property) => {
      expect(finalStyles, property).not.toMatch(new RegExp(`(^|\\n)\\s*${property}\\s*:`, 'u'));
    });
  });
});
