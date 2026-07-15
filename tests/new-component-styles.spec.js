import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('新增组件现代 CSS', () => {
  it('block Button 使用块级 flex 并铺满父元素', () => {
    const source = readFileSync('src/components/MatButtonBase.vue', 'utf8');
    const blockStyles = source.match(
      /\.mat-button-base--block \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;

    expect(blockStyles).toContain('display: flex');
    expect(blockStyles).toContain('inline-size: 100%');
  });

  it('在基础样式中集中声明组件设计值', () => {
    const source = readFileSync('src/styles/index.css', 'utf8');

    expect(source).toContain('--mat-text-input-container-height: 56px');
    expect(source).toContain('--mat-menu-container-min-width: 112px');
    expect(source).toContain('--mat-menu-container-max-width: 280px');
    expect(source).toContain('--mat-menu-item-visual-height: 44px');
    expect(source).toContain('--mat-menu-item-target-height: 48px');
  });

  it('文本输入使用透明 outline 缺口、单层聚焦描边和原生 textarea 行高', () => {
    const source = readFileSync('src/components/MatTextInputBase.vue', 'utf8');

    expect(source).toContain('<fieldset');
    expect(source).toContain('class="mat-text-input__outline"');
    expect(source).toContain('<legend');
    expect(source).toContain(
      '.mat-text-input__outline:has(.mat-text-input__outline-label) {\n  inset-block-start: -8px;\n}',
    );
    expect(source).toContain('.mat-text-input--outlined.mat-text-input--floating');
    expect(source).toContain('transform: translateY(calc(-100% - 8px))');
    expect(source).not.toContain('background: var(--mat-sys-color-surface)');
    expect(source).toContain(
      '.mat-text-input--outlined:has(.mat-text-input__label) {\n  padding-block-start: 8px;\n}',
    );
    expect(source).not.toContain('block-size: 40px');
    expect(source).toContain('border: 1px solid var(--mat-text-input-outline-color)');
    expect(source).toContain('border-width: 2px');
    expect(source).not.toContain('.mat-text-input__container::after');
    expect(source).toContain('.mat-text-input--filled:has(.mat-text-input__label)');
    expect(source).toContain('padding-block: 24px 8px');
    expect(source).not.toContain(
      '.mat-text-input:has(.mat-text-input__label) .mat-text-input__control-row',
    );
    expect(source).toContain('inline-size: 52px');
    expect(source).toContain('padding-inline: 12px 16px');
    expect(source).toContain('padding-inline: 16px 12px');
    expect(source).toContain(
      '.mat-text-input__container:not(:has(.mat-text-input__leading)) .mat-text-input__main',
    );
    expect(source).toContain(
      '.mat-text-input__container:not(:has(.mat-text-input__trailing)) .mat-text-input__main',
    );
    expect(source).not.toContain('.mat-text-input__main:first-child');
    expect(source).not.toContain('.mat-text-input__main:last-child');
    expect(source).toContain('box-shadow: inset 0 -1px 0 var(--mat-text-input-outline-color)');
    expect(source).not.toContain('border-block-end: 1px solid');
    expect(source).toContain('.mat-text-input__affix {\n  visibility: hidden;');
    expect(source).toContain('.mat-text-input--floating .mat-text-input__affix');
    expect(source).toContain('.mat-text-input--textarea .mat-text-input__control {\n  min-block-size: 0;');
    expect(source).not.toContain('min-block-size: 96px');
    expect(source).toContain('@supports (border-shape:');
    expect(source).toContain('prefers-reduced-motion: reduce');
  });

  it('Dialog 仅让 content 滚动且不强制 actions 末端对齐', () => {
    const source = readFileSync('src/components/mat-dialog/MatDialog.vue', 'utf8');
    const contentStyles = source.match(
      /\n\.mat-dialog__content \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;
    const actionStyles = source.match(
      /\n\.mat-dialog__actions \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;

    expect(contentStyles).toContain('overflow: auto');
    expect(contentStyles).toContain('scrollbar-gutter: stable');
    expect(actionStyles).toContain('display: flex');
    expect(actionStyles).not.toContain('justify-content: flex-end');
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
