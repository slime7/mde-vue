import {
  babelParse,
  compileTemplate,
  MagicString,
  parse,
} from 'vue/compiler-sfc';
import COMPONENT_MANIFEST from './component-manifest';

const TAG_MAP = new Map();

/**
 * @param {string} value
 * @returns {string}
 */
function toPascalCase(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

COMPONENT_MANIFEST.forEach((entry) => {
  const standard = { exportName: entry.name, localName: entry.name };

  TAG_MAP.set(entry.name, standard);
  TAG_MAP.set(entry.tag, standard);

  entry.aliases.forEach((alias) => {
    TAG_MAP.set(alias, {
      exportName: entry.name,
      localName: toPascalCase(alias),
    });
  });
});

/**
 * @param {import('@vue/compiler-core').TemplateChildNode | undefined} node
 * @param {Set<string>} tags
 */
function collectTags(node, tags) {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (node.type === 1 && typeof node.tag === 'string') {
    tags.add(node.tag);
  }

  node.children?.forEach((child) => collectTags(child, tags));
  node.branches?.forEach((branch) => collectTags(branch, tags));
}

/**
 * @param {import('@babel/types').LVal | import('@babel/types').PatternLike | null} pattern
 * @param {Set<string>} names
 */
function collectPatternNames(pattern, names) {
  if (!pattern) {
    return;
  }

  if (pattern.type === 'Identifier') {
    names.add(pattern.name);
  } else if (pattern.type === 'ObjectPattern') {
    pattern.properties.forEach((property) => {
      collectPatternNames(
        property.type === 'RestElement' ? property.argument : property.value,
        names,
      );
    });
  } else if (pattern.type === 'ArrayPattern') {
    pattern.elements.forEach((element) => collectPatternNames(element, names));
  } else if (pattern.type === 'RestElement') {
    collectPatternNames(pattern.argument, names);
  } else if (pattern.type === 'AssignmentPattern') {
    collectPatternNames(pattern.left, names);
  }
}

/**
 * @param {string | undefined} source
 * @param {string | undefined} lang
 * @returns {Set<string>}
 */
function collectBindings(source, lang) {
  if (!source) {
    return new Set();
  }

  const plugins = [];

  if (lang === 'ts' || lang === 'tsx') {
    plugins.push('typescript');
  }

  if (lang === 'jsx' || lang === 'tsx') {
    plugins.push('jsx');
  }

  try {
    const { program } = babelParse(source, { sourceType: 'module', plugins });
    const names = new Set();

    program.body.forEach((node) => {
      if (node.type === 'ImportDeclaration') {
        node.specifiers.forEach((specifier) => names.add(specifier.local.name));
      } else if (node.type === 'VariableDeclaration') {
        node.declarations.forEach((declaration) => collectPatternNames(declaration.id, names));
      } else if (
        (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration')
        && node.id
      ) {
        names.add(node.id.name);
      }
    });

    return names;
  } catch {
    return new Set();
  }
}

/**
 * @param {Array<{ exportName: string, localName: string }>} matches
 * @param {Set<string>} bindings
 * @returns {string | null}
 */
function createImportStatement(matches, bindings) {
  const specifiers = new Map();

  matches.forEach(({ exportName, localName }) => {
    if (bindings.has(localName) || specifiers.has(localName)) {
      return;
    }

    specifiers.set(
      localName,
      exportName === localName ? exportName : `${exportName} as ${localName}`,
    );
  });

  if (specifiers.size === 0) {
    return null;
  }

  const names = [...specifiers.keys()].sort();
  const list = names.map((name) => specifiers.get(name)).join(', ');

  return `import { ${list} } from 'mde-vue';`;
}

/**
 * @param {RegExp | string | Array<RegExp | string> | undefined} value
 * @returns {Array<RegExp | string> | null}
 */
function normalizePatterns(value) {
  if (!value) {
    return null;
  }

  return Array.isArray(value) ? value : [value];
}

/**
 * @param {Array<RegExp | string> | null} patterns
 * @param {string} id
 * @returns {boolean}
 */
function matchesPatterns(patterns, id) {
  if (!patterns) {
    return false;
  }

  const normalizedId = id.replaceAll('\\', '/');

  return patterns.some((pattern) => {
    if (typeof pattern === 'string') {
      return normalizedId.includes(pattern);
    }

    if (pattern.global) {
      return new RegExp(pattern.source, pattern.flags).test(id);
    }

    return pattern.test(id);
  });
}

/**
 * @typedef {object} MdeVuePluginOptions
 * @property {RegExp | string | Array<RegExp | string>} [include] 仅处理匹配的 `.vue` 文件；字符串按路径包含匹配。
 * @property {RegExp | string | Array<RegExp | string>} [exclude] 跳过匹配的 `.vue` 文件；默认跳过 `node_modules`。
 */

/**
 * 自动导入 Vue 模板中使用的 mde-vue 组件。
 *
 * 只处理普通的 HTML 模板和静态组件标签；动态组件、渲染函数和
 * `<script setup src>` 仍需使用方手动导入。
 *
 * @param {MdeVuePluginOptions} [options]
 * @returns {import('vite').Plugin}
 * @throws {TypeError} 选项不是对象时抛出。
 */
export function mdeVue(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('mdeVue 选项必须是对象');
  }

  const include = normalizePatterns(options.include);
  const exclude = normalizePatterns(options.exclude) ?? [/node_modules/];

  return {
    name: 'mde-vue-auto-import',
    enforce: 'pre',
    transform(code, id) {
      if (
        !id.endsWith('.vue')
        || matchesPatterns(exclude, id)
        || (include && !matchesPatterns(include, id))
      ) {
        return null;
      }

      const { descriptor, errors } = parse(code, { filename: id });

      if (errors.length || !descriptor.template) {
        return null;
      }

      if (descriptor.template.src || descriptor.template.lang) {
        return null;
      }

      if (descriptor.scriptSetup?.src || (!descriptor.scriptSetup && descriptor.script?.src)) {
        return null;
      }

      const compiled = compileTemplate({
        source: descriptor.template.content,
        filename: id,
        id,
      });

      if (compiled.errors.length) {
        return null;
      }

      const tags = new Set();

      collectTags(compiled.ast, tags);

      const matches = [...tags]
        .map((tag) => TAG_MAP.get(tag))
        .filter(Boolean);

      if (matches.length === 0) {
        return null;
      }

      const bindings = new Set([
        ...collectBindings(descriptor.script?.content, descriptor.script?.lang),
        ...collectBindings(descriptor.scriptSetup?.content, descriptor.scriptSetup?.lang),
      ]);
      const importStatement = createImportStatement(matches, bindings);

      if (!importStatement) {
        return null;
      }

      const source = new MagicString(code);

      if (descriptor.scriptSetup) {
        source.appendLeft(
          descriptor.scriptSetup.loc.start.offset,
          `${importStatement}\n`,
        );
      } else {
        const langAttribute = descriptor.script?.lang
          ? ` lang="${descriptor.script.lang}"`
          : '';

        source.prepend(`<script setup${langAttribute}>\n${importStatement}\n</script>\n\n`);
      }

      return {
        code: source.toString(),
        map: source.generateMap({ hires: true }),
      };
    },
  };
}

export default mdeVue;
