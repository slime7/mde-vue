import type { Plugin } from 'vite';

export interface MdeVuePluginOptions {
  /**
   * 仅处理匹配的 `.vue` 文件；字符串按路径包含匹配，正则按 `test` 匹配。
   */
  include?: RegExp | string | Array<RegExp | string>;
  /**
   * 跳过匹配的 `.vue` 文件；默认跳过 `node_modules`。
   */
  exclude?: RegExp | string | Array<RegExp | string>;
}

/**
 * 自动导入 Vue 模板中使用的 mde-vue 组件。
 */
export declare function mdeVue(options?: MdeVuePluginOptions): Plugin;

export default mdeVue;
