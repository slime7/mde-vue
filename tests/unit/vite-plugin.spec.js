import {
  describe, expect, it,
} from 'vitest';
import { compileScript, parse } from 'vue/compiler-sfc';
import { mdeVue } from '../../src/vite';

function transform(code, id = '/src/App.vue', options = undefined) {
  return mdeVue(options).transform(code, id);
}

function expectValidSfc(code) {
  const { descriptor, errors } = parse(code, { filename: 'App.vue' });

  expect(errors).toHaveLength(0);

  return descriptor;
}

describe('mdeVue Vite 插件', () => {
  it('为仅有模板的 SFC 注入组件导入和 script setup', () => {
    const result = transform('<template><mat-btn>保存</mat-btn></template>');
    const descriptor = expectValidSfc(result.code);

    expect(result.code).toContain("import { MatBtn } from 'mde-vue';");
    expect(descriptor.scriptSetup).not.toBeNull();
    expect(() => compileScript(descriptor, { id: 'test' })).not.toThrow();
  });

  it('把导入插入现有 script setup', () => {
    const result = transform([
      '<script setup>',
      "const label = '保存';",
      '</script>',
      '<template><mat-btn>{{ label }}</mat-btn></template>',
    ].join('\n'));
    const descriptor = expectValidSfc(result.code);

    expect(descriptor.scriptSetup.content.trimStart().startsWith("import { MatBtn } from 'mde-vue';")).toBe(true);
    expect(() => compileScript(descriptor, { id: 'test' })).not.toThrow();
  });

  it('已手动导入的组件不会重复注入', () => {
    const code = [
      '<script setup>',
      "import { MatBtn } from 'mde-vue';",
      '</script>',
      '<template><mat-btn /></template>',
    ].join('\n');

    expect(transform(code)).toBeNull();
  });

  it('为 mde 别名标签导入对应的本地名称', () => {
    const result = transform('<template><mde-dynamic-text text="内容" /></template>');

    expect(result.code).toContain('MatDynamicText as MdeDynamicText');
  });

  it('多个组件合并为一条导入语句并按本地名称排序', () => {
    const result = transform([
      '<template>',
      '  <mat-btn />',
      '  <mat-icon>save</mat-icon>',
      '  <MatCard />',
      '</template>',
    ].join('\n'));

    expect(result.code).toContain("import { MatBtn, MatCard, MatIcon } from 'mde-vue';");
  });

  it('收集 v-if、v-else 和 v-for 分支中的组件', () => {
    const result = transform([
      '<template>',
      '  <div v-if="ok"><mat-btn /></div>',
      '  <div v-else><mat-icon>save</mat-icon></div>',
      '  <div v-for="item in items" :key="item"><mat-card /></div>',
      '</template>',
    ].join('\n'));

    expect(result.code).toContain("import { MatBtn, MatCard, MatIcon } from 'mde-vue';");
  });

  it('没有 script setup 时沿用普通 script 的 lang', () => {
    const result = transform([
      '<script lang="ts">',
      "export default { name: 'App' };",
      '</script>',
      '<template><mat-btn /></template>',
    ].join('\n'));
    const descriptor = expectValidSfc(result.code);

    expect(result.code).toContain('<script setup lang="ts">');
    expect(() => compileScript(descriptor, { id: 'test' })).not.toThrow();
  });

  it('解析 TypeScript script setup 中的现有绑定', () => {
    const result = transform([
      '<script setup lang="ts">',
      'const label: string = "保存";',
      '</script>',
      '<template><mat-btn>{{ label }}</mat-btn></template>',
    ].join('\n'));
    const descriptor = expectValidSfc(result.code);

    expect(result.code).toContain("import { MatBtn } from 'mde-vue';");
    expect(() => compileScript(descriptor, { id: 'test' })).not.toThrow();
  });

  it('未匹配组件、动态组件和非 .vue 请求保持原样', () => {
    expect(transform('<template><my-widget /></template>')).toBeNull();
    expect(transform('<template><component :is="tag" /></template>')).toBeNull();
    expect(transform('<template><mat-btn /></template>', '/src/App.vue?vue&type=template')).toBeNull();
  });

  it('默认跳过 node_modules，并支持 include', () => {
    expect(transform('<template><mat-btn /></template>', '/project/node_modules/pkg/App.vue')).toBeNull();
    expect(transform(
      '<template><mat-btn /></template>',
      '/project/src/App.vue',
      { include: /src\// },
    ).code).toContain("import { MatBtn } from 'mde-vue';");
    expect(transform(
      '<template><mat-btn /></template>',
      '/project/other/App.vue',
      { include: /src\// },
    )).toBeNull();
  });

  it('拒绝非对象选项', () => {
    expect(() => mdeVue(null)).toThrow(TypeError);
    expect(() => mdeVue([])).toThrow(TypeError);
  });
});
