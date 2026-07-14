import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('新增组件现代 CSS', () => {
  it('文本输入使用 clip-path 和 border-shape 渐进增强', () => {
    const source = readFileSync('src/components/MatTextInputBase.vue', 'utf8');

    expect(source).toContain('clip-path: inset(');
    expect(source).toContain('@supports (border-shape:');
    expect(source).toContain('prefers-reduced-motion: reduce');
  });

  it('菜单使用 Popover、CSS Anchor Positioning、换边和形状动效', () => {
    const source = readFileSync('src/components/mat-menu/MatMenu.vue', 'utf8');

    expect(source).toContain('position-area:');
    expect(source).toContain('position-try-fallbacks:');
    expect(source).toContain('@starting-style');
    expect(source).toContain('clip-path: inset(');
    expect(source).toContain('@supports (border-shape:');
    expect(source).toContain('prefers-reduced-motion: reduce');
  });
});
