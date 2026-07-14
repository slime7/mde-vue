import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { MAT_COLOR_ROLES } from '../src/material-color';

const styles = readFileSync(resolve('src/styles/index.css'), 'utf8');
const tailwindStyles = readFileSync(resolve('src/styles/tailwind.css'), 'utf8');
const listComponent = readFileSync(resolve('src/components/mat-list/MatList.vue'), 'utf8');
const listItemComponent = readFileSync(resolve('src/components/mat-list/MatListItem.vue'), 'utf8');
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
    expect(styles).toContain('.mat-icon--material-symbols {');
    expect(styles).toContain('font-feature-settings: \'liga\';');
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
  });
});

describe('List 形状', () => {
  it('列表边界使用容器圆角，相邻项目保持项目圆角', () => {
    expect(listComponent).toContain('.mat-list :deep(.mat-list-item:first-child)');
    expect(listComponent).toContain('.mat-list :deep(.mat-list-item:last-child)');
    expect(listComponent).toContain('--mat-list-item-start-start-shape: var(--mat-list-container-shape);');
    expect(listComponent).toContain('--mat-list-item-end-end-shape: var(--mat-list-container-shape);');
    expect(listItemComponent).toContain('border-start-start-radius: var(--mat-list-item-start-start-shape);');
    expect(listItemComponent).toContain('border-end-end-radius: var(--mat-list-item-end-end-shape);');
  });

  it('焦点项目高于相邻项目且多操作主操作不被外层裁剪', () => {
    expect(listItemComponent).toContain('.mat-list-item:focus-visible,');
    expect(listItemComponent).toContain('.mat-list-item:has(:focus-visible)');
    expect(listItemComponent).toContain('z-index: 2;');
    expect(listItemComponent).toContain('.mat-list-item--multi-action {\n  overflow: visible;');
  });
});
