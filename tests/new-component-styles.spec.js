import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function getComponentSources(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return getComponentSources(path);
    }

    return entry.name.endsWith('.vue') ? [path] : [];
  });
}

describe('新增组件现代 CSS', () => {
  it('MatInputBase 使用透明背景和无边框原生控件基础样式', () => {
    const source = readFileSync('src/components/MatInputBase.vue', 'utf8');

    expect(source).toContain('class="mat-input-base"');
    expect(source).toContain('background: transparent');
    expect(source).toContain('border: 0');
    expect(source).toContain('outline: 0');
    expect(source).toContain('appearance: none');
  });

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
    expect(source).toContain('--mat-menu-container-padding: 4px');
    expect(source).toContain('--mat-menu-item-height: 48px');
    expect(source).toContain('--mat-menu-group-space: 2px');
    expect(source).toContain('--mat-menu-group-label-height: 32px');
  });

  it('FAB 使用推荐的三种尺寸、间距和共享海拔令牌', () => {
    const source = readFileSync('src/styles/index.css', 'utf8');
    const componentSource = readFileSync('src/components/mat-fab/MatFab.vue', 'utf8');

    expect(source).toContain('--mat-fab-small-container-height: 56px');
    expect(source).toContain('--mat-fab-medium-container-height: 80px');
    expect(source).toContain('--mat-fab-large-container-height: 96px');
    expect(source).toContain('--mat-fab-small-icon-size: 24px');
    expect(source).toContain('--mat-fab-medium-icon-size: 28px');
    expect(source).toContain('--mat-fab-large-icon-size: 36px');
    expect(source).toContain('--mat-fab-small-leading-space: 16px');
    expect(source).toContain('--mat-fab-medium-leading-space: 26px');
    expect(source).toContain('--mat-fab-large-leading-space: 28px');
    expect(source).toContain('--mat-fab-small-icon-label-space: 8px');
    expect(source).toContain('--mat-fab-medium-icon-label-space: 12px');
    expect(source).toContain('--mat-fab-large-icon-label-space: 16px');
    expect(source).not.toContain('--mat-fab-small-container-height: 40px');
    expect(componentSource).toContain('<MatButtonBase');
    expect(componentSource).toContain('var(--mat-fab-rest-container-elevation)');
    expect(componentSource).toContain('var(--mat-fab-hover-container-elevation)');
  });

  it('文本输入使用透明 outline 缺口、单层聚焦描边和原生 textarea 行高', () => {
    const source = readFileSync('src/components/MatTextInputBase.vue', 'utf8');

    expect(source).toContain('display: flex;');
    expect(source).not.toContain('mat-text-input--block');
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

  it('Dialog 由各内容区域提供间距且仅让 content 纵向滚动', () => {
    const source = readFileSync('src/components/mat-dialog/MatDialog.vue', 'utf8');
    const rootStyles = source.match(
      /\n\.mat-dialog \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;
    const iconStyles = source.match(
      /\n\.mat-dialog__icon \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;
    const titleStyles = source.match(
      /\n\.mat-dialog__title \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;
    const contentStyles = source.match(
      /\n\.mat-dialog__content \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;
    const actionStyles = source.match(
      /\n\.mat-dialog__actions \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;

    expect(rootStyles).toContain('padding: 0');
    expect(rootStyles).toContain('overflow: visible');
    expect(rootStyles).not.toContain('padding: 24px');
    expect(rootStyles).not.toContain('overflow: hidden');
    expect(iconStyles).toContain('padding-block-start: 24px');
    expect(iconStyles).toContain('padding-inline: 24px');
    expect(titleStyles).toContain('padding-inline: 24px');
    expect(contentStyles).toContain('padding-inline: 24px');
    expect(contentStyles).toContain('overflow-y: auto');
    expect(contentStyles).not.toContain('overflow: auto');
    expect(contentStyles).toContain('scrollbar-gutter: stable');
    expect(actionStyles).toContain('display: flex');
    expect(actionStyles).toContain('padding: 24px');
    expect(actionStyles).not.toContain('margin-block-start');
    expect(actionStyles).not.toContain('justify-content: flex-end');
  });

  it('菜单使用 Popover、CSS Anchor Positioning、换边和形状动效', () => {
    const source = readFileSync('src/components/mat-menu/MatMenu.vue', 'utf8');

    expect(source).toContain('position-area:');
    expect(source).toContain('position-try-fallbacks:');
    expect(source).toContain('var(--mat-menu-offset-x, 0px)');
    expect(source).toContain('var(--mat-menu-viewport-shift-x, 0px)');
    expect(source).toContain('<div class="mat-menu__surface">');
    const rootStyles = source.match(/\.mat-menu \{(?<body>[\s\S]*?)\n\}/)?.groups?.body;
    const surfaceStyles = source.match(/\.mat-menu__surface \{(?<body>[\s\S]*?)\n\}/)?.groups?.body;

    expect(rootStyles).toContain('box-shadow: var(--mat-sys-elevation-level2)');
    expect(rootStyles).not.toContain('clip-path:');
    expect(rootStyles).toContain('transition-property: opacity, transform, display, overlay');
    expect(rootStyles).toContain('transition-behavior: allow-discrete');
    expect(surfaceStyles).toContain('clip-path: inset(');
    expect(surfaceStyles).toContain('overflow-y: auto');
    expect(surfaceStyles).not.toContain('overflow: hidden auto');
    expect(surfaceStyles).not.toContain('overflow: auto');
    expect(source).toContain('@starting-style');
    expect(source).toContain('.mat-menu:not(:popover-open)');
    expect(source).toContain('clip-path: inset(');
    expect(source).toContain('@supports (border-shape:');
    expect(source).toContain('prefers-reduced-motion: reduce');
  });

  it('组件 scoped 样式不使用 :global 跨越组件边界', () => {
    const usages = getComponentSources('src/components').filter((file) => (
      readFileSync(file, 'utf8').includes(':global(')
    ));

    expect(usages).toEqual([]);
  });

  it('菜单项目和分组使用 expressive 测量值', () => {
    const itemSource = readFileSync('src/components/mat-menu/MatMenuItem.vue', 'utf8');
    const groupSource = readFileSync('src/components/mat-menu-group/MatMenuGroup.vue', 'utf8');

    expect(itemSource).toContain('--mat-item-content-gap: 8px');
    expect(itemSource).toContain('--mat-item-leading-space: 8px');
    expect(itemSource).toContain('--mat-item-trailing-space: 8px');
    expect(itemSource).toContain('--mat-item-icon-size: 20px');
    expect(itemSource).toContain('min-block-size: var(--mat-menu-item-height)');
    expect(itemSource).not.toContain('.mat-menu-item::after');
    expect(itemSource).toContain('.mat-menu-item--first:not(.mat-menu-item--submenu-open)');
    expect(itemSource).toContain('.mat-menu-item--only:not(.mat-menu-item--submenu-open)');
    expect(itemSource).toContain(
      'var(--mat-sys-shape-corner-medium) var(--mat-sys-shape-corner-medium)\n    var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)',
    );
    expect(itemSource).toContain(
      'var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)\n    var(--mat-sys-shape-corner-medium) var(--mat-sys-shape-corner-medium)',
    );
    expect(itemSource).toContain('border-radius: var(--mat-sys-shape-corner-medium)');
    expect(groupSource).toContain('padding: var(--mat-menu-container-padding)');
    expect(groupSource).toContain('min-block-size: var(--mat-menu-group-label-height)');
    expect(groupSource).toContain(
      'border-radius: var(--mat-sys-shape-corner-small)',
    );
    expect(groupSource).toContain(
      'var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)\n    var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small)',
    );
    expect(groupSource).toContain(
      'var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small)\n    var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)',
    );
    expect(groupSource).not.toContain('box-shadow:');
    const menuSource = readFileSync('src/components/mat-menu/MatMenu.vue', 'utf8');

    expect(menuSource).toContain(
      'drop-shadow(0 1px 2px rgb(from var(--mat-sys-color-shadow) r g b / 30%))',
    );
    expect(menuSource).toContain(
      'drop-shadow(0 2px 6px rgb(from var(--mat-sys-color-shadow) r g b / 15%))',
    );
    expect(menuSource).not.toContain('overflow: visible;\n  background: transparent;');
  });

  it('滚动组件只声明实际需要的方向，普通容器不声明默认 visible', () => {
    const textInputSource = readFileSync('src/components/MatTextInputBase.vue', 'utf8');
    const navigationSource = readFileSync(
      'src/components/mat-navigation-rail/MatNavigationRail.vue',
      'utf8',
    );
    const toolbarSource = readFileSync('src/components/mat-toolbar/MatToolbar.vue', 'utf8');
    const toolbarStyles = toolbarSource.match(
      /\n\.mat-toolbar--vertical \.mat-toolbar__surface \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;

    expect(textInputSource).not.toContain('overflow: visible;');
    expect(navigationSource).not.toContain('overflow: visible;');
    expect(toolbarStyles).toContain('overflow-y: auto');
    expect(toolbarStyles).not.toContain('overflow: auto');
  });

  it('原生与模拟禁用操作都显示禁用指针', () => {
    const actionSource = readFileSync('src/components/MatActionBase.vue', 'utf8');

    expect(actionSource).toContain(
      '.mat-action-base:disabled,\n.mat-action-base--disabled { cursor: not-allowed; }',
    );
  });

  it('Panes 使用 Material 3 拖拽控件的间距、状态尺寸和焦点形状', () => {
    const source = readFileSync('src/components/mat-panes/MatPane.vue', 'utf8');
    const tokens = readFileSync('src/styles/index.css', 'utf8');

    expect(tokens).toContain('--mat-panes-divider-space: 24px');
    expect(tokens).toContain('--mat-panes-handle-indicator-width: 4px');
    expect(tokens).toContain('--mat-panes-handle-indicator-height: 48px');
    expect(tokens).toContain('--mat-panes-handle-pressed-width: 12px');
    expect(tokens).toContain('--mat-panes-handle-pressed-height: 52px');
    expect(tokens).toContain('--mat-panes-handle-dragged-width: 12px');
    expect(tokens).toContain('--mat-panes-handle-dragged-height: 52px');
    expect(source).toContain('cursor: default');
    expect(source).toContain('.mat-pane__handle:active');
    expect(source).toContain('var(--mat-panes-handle-pressed-width)');
    expect(source).toContain('var(--mat-panes-handle-pressed-height)');
    expect(source).toContain('.mat-pane__handle--active');
    expect(source).toContain('var(--mat-panes-handle-dragged-width)');
    expect(source).toContain('var(--mat-panes-handle-dragged-height)');
    expect(source).toContain('.mat-pane__handle:focus-visible::before');
    expect(source).not.toContain('.mat-pane__handle::after');
    expect(source).not.toContain('scrollbar-gutter: stable');
  });
});
