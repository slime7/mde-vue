import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const TYPES = ['display', 'headline', 'title', 'body', 'label'];
const SIZES = ['large', 'medium', 'small'];
const AXES = ['font', 'weight', 'size', 'line-height', 'tracking'];

describe('排版公共契约', () => {
  const styles = readFileSync('src/styles/index.css', 'utf8');
  const tailwind = readFileSync('src/styles/tailwind.css', 'utf8');

  it.each([false, true])('完整提供 emphasized=%s 的令牌和公共 class', (emphasized) => {
    TYPES.forEach((type) => {
      SIZES.forEach((size) => {
        const style = `${emphasized ? 'emphasized-' : ''}${type}-${size}`;

        AXES.forEach((axis) => {
          expect(styles).toContain(`--mat-sys-typescale-${style}-${axis}:`);
        });
        expect(styles).toContain(`.mat-sys-typescale-${style} {`);
      });
    });
  });

  it.each([false, true])('完整映射 emphasized=%s 的 Tailwind 名称', (emphasized) => {
    TYPES.forEach((type) => {
      SIZES.forEach((size) => {
        const style = `${emphasized ? 'emphasized-' : ''}${type}-${size}`;
        const token = `--mat-sys-typescale-${style}`;
        const utility = `--text-mat-${style}`;

        expect(tailwind).toContain(`${utility}: var(${token}-size);`);
        expect(tailwind).toContain(`${utility}--line-height: var(${token}-line-height);`);
        expect(tailwind).toContain(`${utility}--letter-spacing: var(${token}-tracking);`);
        expect(tailwind).toContain(`${utility}--font-weight: var(${token}-weight);`);
      });
    });
  });
});
