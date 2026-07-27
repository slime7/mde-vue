import { builtinModules } from 'node:module';
import babelParser from '@babel/eslint-parser';
import * as airbnbExtended from 'eslint-config-airbnb-extended';
import importX from 'eslint-plugin-import-x';
import vue from 'eslint-plugin-vue';
import vueAccessibility from 'eslint-plugin-vuejs-accessibility';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

const nodeBuiltins = builtinModules.flatMap((name) => [name, `node:${name}`]);
const babelOptions = {
  babelrc: false,
  configFile: false,
  plugins: ['@babel/plugin-syntax-import-attributes'],
};

export default [
  {
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      'coverage/**/*',
      'docs/site/.vitepress/cache/**/*',
      'docs/site/.vitepress/dist/**/*',
      '**/*.d.ts',
      'llms.txt',
      'llms-full.txt',
    ],
  },
  ...vue.configs['flat/strongly-recommended'],
  airbnbExtended.plugins.stylistic,
  ...airbnbExtended.configs.base.recommended,
  {
    files: ['**/*.{js,mjs,vue}'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: false,
        babelOptions,
      },
    },
    settings: {
      'import-x/resolver-next': null,
      'import-x/core-modules': nodeBuiltins,
    },
    plugins: {
      ...airbnbExtended.plugins.stylistic.plugins,
      ...airbnbExtended.plugins.importX.plugins,
      import: importX,
      vue,
      'vuejs-accessibility': vueAccessibility,
    },
    rules: {
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2, { SwitchCase: 0 }],
      '@stylistic/indent': ['error', 2, { SwitchCase: 0 }],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      }],
      'object-curly-spacing': ['error', 'always'],
      'quote-props': ['error', 'as-needed', {
        keywords: false,
        unnecessary: true,
        numbers: false,
      }],
      'keyword-spacing': ['error', {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      }],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'space-in-parens': ['error', 'never'],
      'no-multi-spaces': ['error', { ignoreEOLComments: false }],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-param-reassign': ['error', { props: true }],
      'import-x/no-commonjs': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-cycle': 'warn',
      'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
      'vue/multi-word-component-names': 'off',
      'vue/html-button-has-type': 'off',
      'vue/max-len': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 5 },
        multiline: { max: 1 },
      }],
      'vuejs-accessibility/form-control-has-label': 'off',
      'vuejs-accessibility/label-has-for': 'off',
      '@stylistic/max-len': 'off',
      'max-len': 'off',
      'no-unsafe-optional-chaining': 'off',
    },
  },
  {
    files: ['src/**/*.{js,vue}', 'docs/**/*.{js,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}', 'tests/**/*.js', '*.{js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'import-x/extensions': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        requireConfigFile: false,
        babelOptions,
      },
    },
  },
];
