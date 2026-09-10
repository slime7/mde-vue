import { withBase } from 'vitepress';

/** playground 默认打开的示例，与 `?example=` 查询参数使用同一套标识 */
export const DEFAULT_EXAMPLE_KEY = 'button/ButtonVariantExample';

const EXAMPLE_KEY_PATTERN = /^[\w.-]+\/[\w.-]+$/;

/** @type {Promise<Array<{ key: string, label: string, examples: Array<{ key: string, name: string }> }>> | null} */
let indexPromise = null;

/**
 * 过滤掉示例代码中的 VitePress 区域标记注释
 *
 * @param {string} rawCode
 * @returns {string}
 */
export function cleanExampleCode(rawCode) {
  if (!rawCode) {
    return '';
  }
  return rawCode
    .replace(/<!--\s*#region[^\n]*-->\r?\n?/g, '')
    .replace(/<!--\s*#endregion[^\n]*-->\r?\n?/g, '')
    .trim();
}

/**
 * @returns {Promise<Array<{ key: string, label: string, examples: Array<{ key: string, name: string }> }>>}
 */
async function requestExampleIndex() {
  const response = await fetch(withBase('/playground/examples.json'));

  if (!response.ok) {
    throw new Error(`示例索引加载失败：HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * 拉取示例索引（组件分类与各组件下的示例清单）。
 *
 * 索引由 `scripts/build-playground-assets.mjs` 生成到 public 目录，只在首次调用时请求一次；
 * 请求失败后不缓存结果，下一次调用会重新尝试。
 *
 * @returns {Promise<Array<{ key: string, label: string, examples: Array<{ key: string, name: string }> }>>}
 * @throws {Error} 索引请求失败或响应不是有效 JSON 时抛出。
 */
export async function loadExampleIndex() {
  if (!indexPromise) {
    indexPromise = requestExampleIndex().catch((error) => {
      indexPromise = null;
      throw error;
    });
  }

  return indexPromise;
}

/**
 * 按需拉取指定示例的源码，只在用户选中示例时发起请求。
 *
 * @param {string} key 形如 `button/ButtonVariantExample` 的示例标识。
 * @returns {Promise<string>} 去掉 VitePress 区域标记后的示例源码。
 * @throws {Error} 示例标识不合法或源码请求失败时抛出。
 */
export async function loadExampleSource(key) {
  if (!EXAMPLE_KEY_PATTERN.test(key)) {
    throw new Error(`示例标识不合法：${key}`);
  }

  const response = await fetch(withBase(`/playground/examples/${key}.vue`));

  if (!response.ok) {
    throw new Error(`示例源码加载失败：HTTP ${response.status}`);
  }

  return cleanExampleCode(await response.text());
}
