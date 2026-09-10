/**
 * 按需装配 playground 使用的 Monaco Editor。
 *
 * App.vue 使用 HTML 语言服务处理标签、属性和嵌入式 JavaScript/CSS，mat-ui.js 使用
 * JavaScript 语言服务处理补全、诊断和悬停信息。各语言服务都必须通过自己的 worker
 * 运行，普通编辑器 worker 则负责编辑器核心能力。
 */
import * as monaco from 'monaco-editor/esm/vs/editor/edcore.main';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import 'monaco-editor/esm/vs/language/css/monaco.contribution';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import 'monaco-editor/esm/vs/language/html/monaco.contribution';
import TypeScriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';

const languageWorkerConstructors = {
  css: CssWorker,
  html: HtmlWorker,
  javascript: TypeScriptWorker,
  typescript: TypeScriptWorker,
};

function getWorker(_workerId, label) {
  const WorkerConstructor = languageWorkerConstructors[label] || EditorWorker;
  return new WorkerConstructor();
}

globalThis.MonacoEnvironment = {
  ...(globalThis.MonacoEnvironment || {}),
  getWorker,
};

export default monaco;
