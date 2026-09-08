import {
  compileScript,
  compileStyle,
  compileTemplate,
  parse,
} from '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'; // eslint-disable-line import-x/extensions

let compileIndex = 0;

/**
 * 编译 Vue SFC 代码字符串为浏览器端可直接执行的 ESM 模块与 CSS
 *
 * @param {string} rawCode
 * @param {string} [baseId]
 * @returns {{ code: string, css: string, errors: string[] }}
 */
export function compileSfc(rawCode, baseId = 'mde-playground') {
  let source = (rawCode || '').trim();
  if (!source) {
    return {
      code: 'export default {};',
      css: '',
      errors: [],
    };
  }

  if (!/<template[\s>]/i.test(source) && !/<script[\s>]/i.test(source)) {
    source = `<template>\n${source}\n</template>`;
  }

  compileIndex += 1;
  const scopeId = `data-v-${baseId}-${compileIndex}`;

  const { descriptor, errors: parseErrors } = parse(source, {
    filename: 'PlaygroundApp.vue',
  });

  if (parseErrors && parseErrors.length > 0) {
    return {
      code: '',
      css: '',
      errors: parseErrors.map((e) => e.message || String(e)),
    };
  }

  const hasScoped = descriptor.styles.some((s) => s.scoped);
  let scriptCode = '';

  if (descriptor.scriptSetup) {
    try {
      const compiledScript = compileScript(descriptor, {
        id: scopeId,
        inlineTemplate: true,
      });
      scriptCode = compiledScript.content;
      if (hasScoped) {
        scriptCode += `\nexport const __scopeId = ${JSON.stringify(scopeId)};`;
      }
    } catch (err) {
      return {
        code: '',
        css: '',
        errors: [err.message || String(err)],
      };
    }
  } else if (descriptor.script && descriptor.template) {
    try {
      const compiledTemplate = compileTemplate({
        id: scopeId,
        source: descriptor.template.content,
        filename: 'PlaygroundApp.vue',
        scoped: hasScoped,
      });

      if (compiledTemplate.errors && compiledTemplate.errors.length > 0) {
        return {
          code: '',
          css: '',
          errors: compiledTemplate.errors.map((e) => (typeof e === 'string' ? e : e.message)),
        };
      }

      const rawScript = descriptor.script.content.trim();
      const transformedScript = rawScript.replace(/export\s+default/, 'const _sfc_main =');
      const scopeCode = hasScoped ? `\n_sfc_main.__scopeId = ${JSON.stringify(scopeId)};` : '';
      scriptCode = `${compiledTemplate.code}\n${transformedScript}\n_sfc_main.render = render;${scopeCode}\nexport default _sfc_main;`;
    } catch (err) {
      return {
        code: '',
        css: '',
        errors: [err.message || String(err)],
      };
    }
  } else if (descriptor.template) {
    try {
      const compiledTemplate = compileTemplate({
        id: scopeId,
        source: descriptor.template.content,
        filename: 'PlaygroundApp.vue',
        scoped: hasScoped,
      });

      if (compiledTemplate.errors && compiledTemplate.errors.length > 0) {
        return {
          code: '',
          css: '',
          errors: compiledTemplate.errors.map((e) => (typeof e === 'string' ? e : e.message)),
        };
      }

      const scopeCode = hasScoped ? `\n_sfc_main.__scopeId = ${JSON.stringify(scopeId)};` : '';
      scriptCode = `${compiledTemplate.code}\nconst _sfc_main = { render };${scopeCode}\nexport default _sfc_main;`;
    } catch (err) {
      return {
        code: '',
        css: '',
        errors: [err.message || String(err)],
      };
    }
  } else {
    scriptCode = 'export default {};';
  }

  let css = '';
  let styleError = null;
  if (descriptor.styles && descriptor.styles.length > 0) {
    descriptor.styles.forEach((style) => {
      if (styleError) {
        return;
      }
      const compiledStyle = compileStyle({
        id: scopeId,
        source: style.content,
        scoped: Boolean(style.scoped),
        filename: 'PlaygroundApp.vue',
      });
      if (compiledStyle.errors && compiledStyle.errors.length > 0) {
        styleError = compiledStyle.errors.map((e) => (typeof e === 'string' ? e : e.message));
        return;
      }
      css += `${compiledStyle.code}\n`;
    });
  }
  if (styleError) {
    return {
      code: '',
      css: '',
      errors: styleError,
    };
  }

  return {
    code: scriptCode,
    css,
    errors: [],
  };
}

export default compileSfc;
