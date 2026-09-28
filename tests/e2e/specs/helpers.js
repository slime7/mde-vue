import { expect } from '@playwright/test';

/**
 * 打开对应场景并等待其根元素可见。
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} name
 */
export async function openScene(page, name) {
  await page.goto(`/#/${name}`);
  await expect(page.locator(`[data-scene="${name}"]`)).toBeVisible();
}

/**
 * 读取场景通过 pushEvent 记录的事件序列。
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<Array<{ name: string, payload: * }>>}
 */
export function readEvents(page) {
  return page.evaluate(() => window.__events.map(({ name, payload }) => ({ name, payload })));
}

/**
 * 清空已记录的事件。
 *
 * @param {import('@playwright/test').Page} page
 */
export async function clearEvents(page) {
  await page.evaluate(() => {
    window.__events.length = 0;
  });
}

/**
 * 等待包含指定名称的事件出现，返回该事件（多个时返回最后一个）。
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} name
 * @param {number} [timeout]
 */
export async function waitForEvent(page, name, timeout = 5000) {
  let event = null;
  await expect.poll(async () => {
    const found = (await readEvents(page)).filter((item) => item.name === name);
    event = found.at(-1) ?? null;
    return found.length;
  }, { timeout }).toBeGreaterThanOrEqual(1);
  return event;
}
