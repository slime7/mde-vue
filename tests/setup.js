import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.replaceChildren();
  document.documentElement.removeAttribute('data-mat-theme');
  document.documentElement.removeAttribute('style');
});
