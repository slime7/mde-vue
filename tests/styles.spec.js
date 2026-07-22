import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { MAT_COLOR_ROLES } from '../src/material-color';

const styles = readFileSync(resolve('src/styles/index.css'), 'utf8');
const tailwindStyles = readFileSync(resolve('src/styles/tailwind.css'), 'utf8');
const listComponent = readFileSync(resolve('src/components/mat-list/MatList.vue'), 'utf8');
const listGroupComponent = readFileSync(
  resolve('src/components/mat-list-group/MatListGroup.vue'),
  'utf8',
);
const listItemComponent = readFileSync(resolve('src/components/mat-list/MatListItem.vue'), 'utf8');
const tooltipComponent = readFileSync(
  resolve('src/components/mat-tooltip/MatTooltip.vue'),
  'utf8',
);
const toolbarComponent = readFileSync(
  resolve('src/components/mat-toolbar/MatToolbar.vue'),
  'utf8',
);
const typeStyles = [
  'display-large', 'display-medium', 'display-small',
  'headline-large', 'headline-medium', 'headline-small',
  'title-large', 'title-medium', 'title-small',
  'body-large', 'body-medium', 'body-small',
  'label-large', 'label-medium', 'label-small',
];
const typeAxes = ['font', 'weight', 'size', 'line-height', 'tracking'];
const shapeValues = {
  none: '0',
  'extra-small': '4px',
  small: '8px',
  medium: '12px',
  large: '16px',
  'large-increased': '20px',
  'extra-large': '28px',
  'extra-large-increased': '32px',
  'extra-extra-large': '48px',
  full: '9999px',
};
const elevationValues = [
  'none',
  '0 1px 2px rgb(0 0 0 / 30%), 0 1px 3px 1px rgb(0 0 0 / 15%)',
  '0 1px 2px rgb(0 0 0 / 30%), 0 2px 6px 2px rgb(0 0 0 / 15%)',
  '0 4px 8px 3px rgb(0 0 0 / 15%), 0 1px 3px rgb(0 0 0 / 30%)',
  '0 6px 10px 4px rgb(0 0 0 / 15%), 0 2px 3px rgb(0 0 0 / 30%)',
  '0 8px 12px 6px rgb(0 0 0 / 15%), 0 4px 4px rgb(0 0 0 / 30%)',
];
const durationGroups = {
  short: [50, 100, 150, 200],
  medium: [250, 300, 350, 400],
  long: [450, 500, 550, 600],
  'extra-long': [700, 800, 900, 1000],
};
const easingNames = [
  'emphasized',
  'emphasized-decelerate',
  'emphasized-accelerate',
  'standard',
  'standard-decelerate',
  'standard-accelerate',
];

describe('公共样式令牌', () => {
  it('声明并映射全部 53 个动态颜色角色', () => {
    const roles = Object.values(MAT_COLOR_ROLES);

    expect(roles).toHaveLength(53);
    roles.forEach((role) => {
      expect(styles).toContain(`--mat-sys-color-${role}:`);
      expect(tailwindStyles).toContain(`--color-mat-${role}: var(--mat-sys-color-${role});`);
    });
  });

  it('声明 reference 字体和 15 套基线、强调字体样式', () => {
    expect(styles).toContain('--mat-ref-typeface-brand: system-ui, sans-serif;');
    expect(styles).toContain("--mat-ref-typeface-icon: 'Material Symbols Outlined';");
    expect(styles).toContain('--mat-ref-typeface-plain: system-ui, sans-serif;');
    expect(tailwindStyles).toContain('--font-mat-icon: var(--mat-ref-typeface-icon);');

    typeStyles.forEach((style) => {
      typeAxes.forEach((axis) => {
        expect(styles).toContain(`--mat-sys-typescale-${style}-${axis}:`);
        expect(styles).toContain(`--mat-sys-typescale-emphasized-${style}-${axis}:`);
      });

      expect(tailwindStyles).toContain(`--text-mat-${style}:`);
      expect(tailwindStyles).toContain(`--text-mat-emphasized-${style}:`);
    });

    expect(styles).toContain('--mat-sys-typescale-display-large-size: 3.5625rem;');
    expect(styles).toContain('--mat-sys-typescale-emphasized-title-medium-weight: var(--mat-ref-typeface-weight-bold);');
  });

  it('声明完整形状、海拔、动效和状态值', () => {
    Object.entries(shapeValues).forEach(([name, value]) => {
      expect(styles).toContain(`--mat-sys-shape-corner-${name}: ${value};`);
      expect(tailwindStyles).toContain(`--radius-mat-${name}: var(--mat-sys-shape-corner-${name});`);
    });

    elevationValues.forEach((value, level) => {
      expect(styles).toContain(`--mat-sys-elevation-level${level}: ${value};`);
      expect(tailwindStyles).toContain(`--shadow-mat-level${level}: var(--mat-sys-elevation-level${level});`);
    });

    Object.entries(durationGroups).forEach(([group, values]) => {
      values.forEach((value, index) => {
        expect(styles).toContain(`--mat-sys-motion-duration-${group}${index + 1}: ${value}ms;`);
      });
    });

    easingNames.forEach((name) => {
      expect(styles).toContain(`--mat-sys-motion-easing-${name}:`);
      expect(tailwindStyles).toContain(`--ease-mat-${name}: var(--mat-sys-motion-easing-${name});`);
    });

    expect(styles).toContain('--mat-sys-state-hover-state-layer-opacity: .08;');
    expect(styles).toContain('--mat-sys-state-focus-state-layer-opacity: .12;');
    expect(styles).toContain('--mat-sys-state-pressed-state-layer-opacity: .12;');
    expect(styles).toContain('--mat-sys-state-dragged-state-layer-opacity: .16;');
    expect(styles).toContain('--mat-sys-interaction-target-min-size: 48px;');
    expect(styles).toContain('--mat-sys-z-index-toolbar: 100;');
    expect(styles).toContain('--mat-sys-z-index-snackbar: 200;');
    expect(styles).toContain('--mat-sys-z-index-tooltip: 300;');
  });
});

describe('List 形状', () => {
  it('列表边界使用容器圆角，相邻项目保持项目圆角', () => {
    expect(listComponent).toContain('.mat-list > :deep(.mat-list-item:first-child)');
    expect(listComponent).toContain('.mat-list > :deep(.mat-list-group:first-child)');
    expect(listComponent).toContain('.mat-list > :deep(.mat-list-item:last-child)');
    expect(listComponent).toContain('.mat-list > :deep(.mat-list-group:last-child)');
    expect(listComponent).toContain('--mat-list-item-start-start-shape: var(--mat-list-container-shape);');
    expect(listComponent).toContain('--mat-list-item-end-end-shape: var(--mat-list-container-shape);');
    expect(listGroupComponent).toContain('--mat-list-item-start-start-shape: var(--mat-list-group-start-start-shape);');
    expect(listGroupComponent).toContain('--mat-list-item-end-end-shape: var(--mat-list-group-end-end-shape);');
    expect(listItemComponent).toContain('border-start-start-radius: var(--mat-list-item-start-start-shape);');
    expect(listItemComponent).toContain('border-end-end-radius: var(--mat-list-item-end-end-shape);');
  });

  it('焦点项目高于相邻项目且多操作主操作不被外层裁剪', () => {
    expect(listItemComponent).toContain('.mat-list-item:focus-visible,');
    expect(listItemComponent).toContain('.mat-list-item:has(:focus-visible)');
    expect(listItemComponent).toContain('z-index: 2;');
    expect(listItemComponent).toContain('.mat-list-item--multi-action {\n  overflow: visible;');
  });

  it('单操作和 Group Activator 保留容器背景，仅多操作内层主操作透明', () => {
    const primaryRule = listItemComponent.match(/\.mat-list-item__primary \{(?<rule>[^}]+)\}/u);
    const multiActionPrimaryRule = listItemComponent.match(
      /\.mat-list-item--multi-action \.mat-list-item__primary \{(?<rule>[^}]+)\}/u,
    );

    expect(primaryRule?.groups?.rule).not.toContain('background: transparent;');
    expect(multiActionPrimaryRule?.groups?.rule).toContain('background: transparent;');
  });
});

describe('Tooltip 样式', () => {
  it('使用 Material 3 Plain tooltip 的内部尺寸和系统令牌', () => {
    expect(styles).toContain('--mat-tooltip-container-height: 24px;');
    expect(styles).toContain('--mat-tooltip-container-padding-inline: 8px;');
    expect(styles).toContain('--mat-tooltip-container-shape: var(--mat-sys-shape-corner-extra-small);');
    expect(styles).toContain('--mat-tooltip-container-elevation: var(--mat-sys-elevation-level0);');
    expect(styles).toContain('--mat-tooltip-viewport-margin: 8px;');
    expect(tooltipComponent).toContain('min-block-size: var(--mat-tooltip-container-height);');
    expect(tooltipComponent).toContain('padding-inline: var(--mat-tooltip-container-padding-inline);');
    expect(tooltipComponent).toContain('border-radius: var(--mat-tooltip-container-shape);');
    expect(tooltipComponent).toContain('box-shadow: var(--mat-tooltip-container-elevation);');
    expect(tooltipComponent).toContain('pointer-events: none;');
    expect(tooltipComponent).toContain('@media (prefers-reduced-motion: reduce)');
  });
});

describe('Toolbar 样式', () => {
  it('使用 64px 容器、浮动边距和覆盖层令牌', () => {
    expect(styles).toContain('--mat-toolbar-container-height: 64px;');
    expect(styles).toContain('--mat-toolbar-container-padding: 16px;');
    expect(styles).toContain('--mat-toolbar-content-gap: 8px;');
    expect(styles).toContain('--mat-toolbar-floating-edge-space: 16px;');
    expect(styles).toContain('--mat-toolbar-vertical-edge-space: 24px;');
    expect(toolbarComponent).toContain('z-index: var(--mat-sys-z-index-toolbar);');
    expect(toolbarComponent).toContain('border-radius: var(--mat-toolbar-container-shape);');
    expect(toolbarComponent).toContain('padding-block-end: var(--mat-toolbar-bottom-placeholder);');
  });
});
