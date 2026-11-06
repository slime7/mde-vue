import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

test.use({ reducedMotion: 'no-preference' });

async function sampleClose(page, {
  asideId,
  closeId,
  contentId,
  layoutId,
  secondaryId,
}) {
  return page.evaluate(async ({
    asideId: currentAsideId,
    closeId: currentCloseId,
    contentId: currentContentId,
    layoutId: currentLayoutId,
    secondaryId: currentSecondaryId,
  }) => {
    const aside = document.querySelector(`[data-testid="${currentAsideId}"]`);
    const content = document.querySelector(`[data-testid="${currentContentId}"]`);
    const layout = document.querySelector(`[data-testid="${currentLayoutId}"]`);
    const secondary = currentSecondaryId
      ? document.querySelector(`[data-testid="${currentSecondaryId}"]`)
      : null;
    const samples = [];
    const startedAt = performance.now();

    document.querySelector(`[data-testid="${currentCloseId}"]`).click();

    await new Promise((resolve) => {
      const frame = () => {
        const asideRect = aside.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const layoutRect = layout.getBoundingClientRect();
        const secondaryRect = secondary?.getBoundingClientRect();

        samples.push({
          t: performance.now() - startedAt,
          asideHidden: aside.hidden,
          aside: {
            bottom: asideRect.bottom,
            right: asideRect.right,
            top: asideRect.top,
          },
          content: {
            left: contentRect.left,
            top: contentRect.top,
          },
          layout: {
            left: layoutRect.left,
            top: layoutRect.top,
          },
          secondary: secondaryRect
            ? { bottom: secondaryRect.bottom, top: secondaryRect.top }
            : null,
        });

        if (performance.now() - startedAt < 320) {
          requestAnimationFrame(frame);
          return;
        }

        resolve();
      };

      requestAnimationFrame(frame);
    });

    return samples;
  }, {
    asideId,
    closeId,
    contentId,
    layoutId,
    secondaryId,
  });
}

async function waitForEdgeAlignment(page, {
  firstId,
  firstEdge,
  secondId,
  secondEdge,
}) {
  await expect.poll(async () => page.evaluate(({
    firstId: currentFirstId,
    firstEdge: currentFirstEdge,
    secondId: currentSecondId,
    secondEdge: currentSecondEdge,
  }) => {
    const first = document.querySelector(`[data-testid="${currentFirstId}"]`)
      .getBoundingClientRect();
    const second = document.querySelector(`[data-testid="${currentSecondId}"]`)
      .getBoundingClientRect();
    return Math.abs(first[currentFirstEdge] - second[currentSecondEdge]);
  }, {
    firstId,
    firstEdge,
    secondId,
    secondEdge,
  })).toBeLessThan(1.5);
}

function visibleSamples(samples) {
  return samples.filter((sample) => !sample.asideHidden && sample.t < 180);
}

function maxGap(samples, readFirst, readSecond) {
  return Math.max(...samples.map((sample) => (
    Math.abs(readFirst(sample) - readSecond(sample))
  )));
}

test.describe('MatAside 与 MatLayout 动效同步', () => {
  test('起始侧栏收起时其右边缘与正文左边缘保持贴合', async ({ page }) => {
    await openScene(page, 'aside');
    await waitForEdgeAlignment(page, {
      firstId: 'start-aside',
      firstEdge: 'right',
      secondId: 'start-content',
      secondEdge: 'left',
    });

    const samples = await sampleClose(page, {
      asideId: 'start-aside',
      closeId: 'close-start',
      contentId: 'start-content',
      layoutId: 'start-layout',
    });
    const moving = visibleSamples(samples);

    expect(moving.length).toBeGreaterThan(3);
    expect(maxGap(
      moving,
      (sample) => sample.aside.right,
      (sample) => sample.content.left,
    )).toBeLessThan(2);

    const last = samples.at(-1);
    expect(last.asideHidden).toBe(true);
    expect(Math.abs(last.content.left - last.layout.left)).toBeLessThan(2);
  });

  test('Rail 在 Layout 内展开时栏宽与正文留白同步', async ({ page }) => {
    await openScene(page, 'aside');
    await waitForEdgeAlignment(page, {
      firstId: 'rail-aside',
      firstEdge: 'right',
      secondId: 'rail-content',
      secondEdge: 'left',
    });

    const samples = await page.evaluate(async () => {
      const rail = document.querySelector('[data-testid="rail-aside"]');
      const content = document.querySelector('[data-testid="rail-content"]');
      const frames = [];
      const startedAt = performance.now();

      document.querySelector('[data-testid="toggle-rail"]').click();

      await new Promise((resolve) => {
        const frame = () => {
          const railRect = rail.getBoundingClientRect();
          const contentRect = content.getBoundingClientRect();
          frames.push({
            t: performance.now() - startedAt,
            contentLeft: contentRect.left,
            railRight: railRect.right,
            railWidth: railRect.width,
          });

          if (performance.now() - startedAt < 560) {
            requestAnimationFrame(frame);
            return;
          }

          resolve();
        };

        requestAnimationFrame(frame);
      });

      return frames;
    });
    const moving = samples.filter((sample) => sample.t > 20 && sample.t < 450);

    expect(moving.length).toBeGreaterThan(5);
    expect(maxGap(
      moving,
      (sample) => sample.railRight,
      (sample) => sample.contentLeft,
    )).toBeLessThan(2);
    expect(moving.some((sample) => sample.railWidth > 90 && sample.railWidth < 230))
      .toBe(true);

    const last = samples.at(-1);
    expect(last.railWidth).toBeGreaterThan(230);
    expect(Math.abs(last.railRight - last.contentLeft)).toBeLessThan(2);
  });

  test('同向堆叠收起外侧时后续顶栏跟随离场顶栏移动', async ({ page }) => {
    await openScene(page, 'aside');
    await waitForEdgeAlignment(page, {
      firstId: 'top-b',
      firstEdge: 'bottom',
      secondId: 'stack-content',
      secondEdge: 'top',
    });

    const samples = await sampleClose(page, {
      asideId: 'top-a',
      closeId: 'close-top-a',
      contentId: 'stack-content',
      layoutId: 'stack-layout',
      secondaryId: 'top-b',
    });
    const moving = visibleSamples(samples);

    expect(moving.length).toBeGreaterThan(3);
    expect(maxGap(
      moving,
      (sample) => sample.aside.bottom,
      (sample) => sample.secondary.top,
    )).toBeLessThan(2);
    expect(maxGap(
      moving,
      (sample) => sample.secondary.bottom,
      (sample) => sample.content.top,
    )).toBeLessThan(2);

    const last = samples.at(-1);
    expect(last.asideHidden).toBe(true);
    expect(Math.abs(last.secondary.top - last.layout.top)).toBeLessThan(2);
  });

  test('同向堆叠收起内侧时外侧顶栏不动且正文只减少内侧厚度', async ({ page }) => {
    await openScene(page, 'aside');
    await waitForEdgeAlignment(page, {
      firstId: 'top-b',
      firstEdge: 'bottom',
      secondId: 'stack-content',
      secondEdge: 'top',
    });

    const samples = await sampleClose(page, {
      asideId: 'top-b',
      closeId: 'close-top-b',
      contentId: 'stack-content',
      layoutId: 'stack-layout',
      secondaryId: 'top-a',
    });
    const moving = visibleSamples(samples);

    expect(moving.length).toBeGreaterThan(3);
    expect(maxGap(
      moving,
      (sample) => sample.aside.bottom,
      (sample) => sample.content.top,
    )).toBeLessThan(2);

    const outerTops = moving.map((sample) => sample.secondary.top);
    expect(Math.max(...outerTops) - Math.min(...outerTops)).toBeLessThan(1);

    const last = samples.at(-1);
    expect(last.asideHidden).toBe(true);
    expect(Math.abs(last.secondary.top - last.layout.top)).toBeLessThan(2);
    expect(Math.abs(last.content.top - last.layout.top - 44)).toBeLessThan(2);
  });
});
