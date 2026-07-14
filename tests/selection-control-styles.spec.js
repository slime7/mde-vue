import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(resolve('src/styles/index.css'), 'utf8');
const checkbox = readFileSync(resolve('src/components/mat-checkbox/MatCheckbox.vue'), 'utf8');
const radio = readFileSync(resolve('src/components/mat-radio/MatRadio.vue'), 'utf8');
const selectionBase = readFileSync(resolve('src/components/MatSelectionControlBase.vue'), 'utf8');
const matSwitch = readFileSync(resolve('src/components/mat-switch/MatSwitch.vue'), 'utf8');

describe('选择控件样式规格', () => {
  it('公开样式包含 Material 规格尺寸令牌', () => {
    expect(styles).toContain('--mat-checkbox-container-size: 18px');
    expect(styles).toContain('--mat-radio-icon-size: 20px');
    expect(styles).toContain('--mat-switch-track-width: 52px');
    expect(styles).toContain('--mat-switch-track-height: 32px');
    expect(styles).toContain('--mat-switch-pressed-handle-size: 28px');
    expect(styles).toContain('--mat-sys-interaction-target-min-size: 48px');
  });

  it('使用 clip-path 动效和 border-shape 渐进增强', () => {
    expect(checkbox).toContain('clip-path: polygon');
    expect(checkbox).toContain('@supports (border-shape: inset(0 round 2px))');
    expect(radio).toContain('clip-path: circle');
    expect(radio).toContain('@supports (border-shape: circle(50%))');
    expect(matSwitch).toContain('@supports (border-shape: inset(0 round 50%))');
  });

  it('保留状态层、可见焦点和 reduced-motion', () => {
    expect(selectionBase).toContain('var(--mat-selection-control-state-layer-size)');
    expect(selectionBase).toContain(':focus-visible');
    expect(selectionBase).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
