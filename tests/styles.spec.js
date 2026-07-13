import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(resolve('src/styles/index.css'), 'utf8');
const tailwindStyles = readFileSync(resolve('src/styles/tailwind.css'), 'utf8');

const easingTokens = [
  '--mat-motion-easing-standard: cubic-bezier(.2, 0, 0, 1);',
  '--mat-motion-easing-decelerate: cubic-bezier(0, 0, 0, 1);',
  '--mat-motion-easing-accelerate: cubic-bezier(.3, 0, 1, 1);',
];
const shadowTokens = [
  '--mat-shadow-level-1: rgb(0 0 0 / 20%) 0 2px 1px -1px, rgb(0 0 0 / 14%) 0 1px 1px 0, rgb(0 0 0 / 12%) 0 1px 3px 0;',
  '--mat-shadow-level-2: rgb(0 0 0 / 20%) 0 3px 3px -2px, rgb(0 0 0 / 14%) 0 3px 4px 0, rgb(0 0 0 / 12%) 0 1px 8px 0;',
  '--mat-shadow-level-3: rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0, rgb(0 0 0 / 12%) 0 1px 18px 0;',
  '--mat-shadow-level-4: rgb(0 0 0 / 20%) 0 5px 5px -3px, rgb(0 0 0 / 14%) 0 8px 10px 1px, rgb(0 0 0 / 12%) 0 3px 14px 2px;',
  '--mat-shadow-level-5: rgb(0 0 0 / 20%) 0 7px 8px -4px, rgb(0 0 0 / 14%) 0 12px 17px 2px, rgb(0 0 0 / 12%) 0 5px 22px 4px;',
];
const tailwindMappings = [
  '--shadow-mat-1: var(--mat-shadow-level-1);',
  '--shadow-mat-2: var(--mat-shadow-level-2);',
  '--shadow-mat-3: var(--mat-shadow-level-3);',
  '--shadow-mat-4: var(--mat-shadow-level-4);',
  '--shadow-mat-5: var(--mat-shadow-level-5);',
  '--ease-mat-standard: var(--mat-motion-easing-standard);',
  '--ease-mat-decelerate: var(--mat-motion-easing-decelerate);',
  '--ease-mat-accelerate: var(--mat-motion-easing-accelerate);',
];

describe('公共样式令牌', () => {
  it.each([...easingTokens, ...shadowTokens])('声明精确值：%s', (token) => {
    expect(styles).toContain(token);
  });

  it.each(tailwindMappings)('映射 Tailwind 令牌：%s', (mapping) => {
    expect(tailwindStyles).toContain(mapping);
  });
});
