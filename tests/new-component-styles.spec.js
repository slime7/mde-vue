import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('新增组件现代 CSS', () => {
  it('在基础样式中集中声明组件设计值', () => {
    const source = readFileSync('src/styles/index.css', 'utf8');

    expect(source).toContain('--mat-text-input-container-height: 56px');
    expect(source).toContain('--mat-menu-container-min-width: 112px');
    expect(source).toContain('--mat-menu-container-max-width: 280px');
    expect(source).toContain('--mat-menu-item-visual-height: 44px');
    expect(source).toContain('--mat-menu-item-target-height: 48px');
  });

  it('文本输入使用 clip-path 和 border-shape 渐进增强', () => {
    const source = readFileSync('src/components/MatTextInputBase.vue', 'utf8');

    expect(source).toContain('clip-path: inset(');
    expect(source).toContain('.mat-text-input--outlined.mat-text-input--floating');
    expect(source).toContain('transform: translateY(calc(-100% - 8px))');
    expect(source).toContain('background: var(--mat-sys-color-surface)');
    expect(source).toContain('padding-inline: 4px');
    expect(source).not.toContain('block-size: 40px');
    expect(source).toContain('border: 1px solid var(--mat-text-input-outline-color)');
    expect(source).toContain('border: 2px solid var(--mat-text-input-accent-color)');
    expect(source).toContain('.mat-text-input--filled:has(.mat-text-input__label)');
    expect(source).toContain('padding-block: 24px 8px');
    expect(source).toContain('inline-size: 52px');
    expect(source).toContain('padding-inline: 12px 16px');
    expect(source).toContain('padding-inline: 16px 12px');
    expect(source).toContain('box-shadow: inset 0 -1px 0 var(--mat-text-input-outline-color)');
    expect(source).not.toContain('border-block-end: 1px solid');
    expect(source).toContain('@supports (border-shape:');
    expect(source).toContain('prefers-reduced-motion: reduce');
  });

  it('菜单使用 Popover、CSS Anchor Positioning、换边和形状动效', () => {
    const source = readFileSync('src/components/mat-menu/MatMenu.vue', 'utf8');

    expect(source).toContain('position-area:');
    expect(source).toContain('position-try-fallbacks:');
    expect(source).toContain('translate: var(--mat-menu-viewport-shift-x');
    expect(source).toContain('<div class="mat-menu__surface">');
    const rootStyles = source.match(/\.mat-menu \{(?<body>[\s\S]*?)\n\}/)?.groups?.body;
    const surfaceStyles = source.match(/\.mat-menu__surface \{(?<body>[\s\S]*?)\n\}/)?.groups?.body;

    expect(rootStyles).toContain('box-shadow: var(--mat-sys-elevation-level2)');
    expect(rootStyles).not.toContain('clip-path:');
    expect(surfaceStyles).toContain('clip-path: inset(');
    expect(source).toContain('@starting-style');
    expect(source).toContain('clip-path: inset(');
    expect(source).toContain('@supports (border-shape:');
    expect(source).toContain('prefers-reduced-motion: reduce');
  });
});
