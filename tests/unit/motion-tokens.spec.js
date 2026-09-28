import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Material 3 Expressive 动效令牌', () => {
  it('公开 Web 平台的三档 spatial 与 effects 复合值', () => {
    const styles = readFileSync('src/styles/index.css', 'utf8');

    expect(styles).toContain('--mat-sys-motion-spring-fast-spatial: 350ms cubic-bezier(.42, 1.67, .21, .9);');
    expect(styles).toContain('--mat-sys-motion-spring-default-spatial: 500ms cubic-bezier(.38, 1.21, .22, 1);');
    expect(styles).toContain('--mat-sys-motion-spring-slow-spatial: 650ms cubic-bezier(.39, 1.29, .35, .98);');
    expect(styles).toContain('--mat-sys-motion-spring-fast-effects: 150ms cubic-bezier(.31, .94, .34, 1);');
    expect(styles).toContain('--mat-sys-motion-spring-default-effects: 200ms cubic-bezier(.34, .8, .34, 1);');
    expect(styles).toContain('--mat-sys-motion-spring-slow-effects: 300ms cubic-bezier(.34, .88, .34, 1);');
  });
});
