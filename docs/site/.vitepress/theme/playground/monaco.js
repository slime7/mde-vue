/**
 * 按需装配 playground 使用的 Monaco Editor。
 *
 * App.vue 以 HTML 模式高亮，内嵌的 `<script>` / `<style>` 由 monarch 分词器的
 * `nextEmbedded: "text/javascript"` / `"text/css"` 处理，只要求对应语言的 mimetype 已注册；
 * mat-ui.js 以 JavaScript 模式高亮。因此注册 HTML、CSS、JavaScript 三种基础语言即可。
 * 引入完整 `monaco-editor` 会连带打包全部基础语言与 JSON/CSS/HTML/TypeScript 语言服务，
 * 而语言服务依赖 playground 尚未配置的 Web Worker。
 */
import * as monaco from 'monaco-editor/esm/vs/editor/edcore.main';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

export default monaco;
