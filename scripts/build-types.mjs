/* eslint-disable no-continue, no-console, no-restricted-syntax */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const ENTRY = path.join(ROOT, 'src/index.js');
const OUTPUT = path.join(ROOT, 'src/index.d.ts');

function extractCall(source, marker) {
  const markerIndex = source.indexOf(marker);

  if (markerIndex < 0) {
    return '';
  }

  const openIndex = source.indexOf('(', markerIndex);
  let depth = 0;
  let quote = '';
  let blockComment = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (blockComment) {
      if (character === '*' && nextCharacter === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (!quote && character === '/' && nextCharacter === '*') {
      blockComment = true;
      index += 1;
      continue;
    }

    if (quote) {
      if (character === '\\') {
        index += 1;
      } else if (character === quote) {
        quote = '';
      }
      continue;
    }

    if (character === "'" || character === '"' || character === '`') {
      quote = character;
      continue;
    }

    if ('([{'.includes(character)) {
      depth += 1;
    }

    if (')]}'.includes(character)) {
      depth -= 1;
    }

    if (depth === 0) {
      return source.slice(openIndex + 1, index);
    }
  }

  throw new Error(`无法解析 ${marker} 的结束位置`);
}

function extractObject(source, marker) {
  const markerIndex = source.indexOf(marker);

  if (markerIndex < 0) {
    return '';
  }

  const openIndex = source.indexOf('{', markerIndex);
  let depth = 0;
  let quote = '';
  let blockComment = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (blockComment) {
      if (character === '*' && nextCharacter === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (!quote && character === '/' && nextCharacter === '*') {
      blockComment = true;
      index += 1;
      continue;
    }

    if (quote) {
      if (character === '\\') {
        index += 1;
      } else if (character === quote) {
        quote = '';
      }
      continue;
    }

    if (character === "'" || character === '"' || character === '`') {
      quote = character;
      continue;
    }

    if (character === '{') {
      depth += 1;
    }

    if (character === '}') {
      depth -= 1;
    }

    if (depth === 0) {
      return source.slice(openIndex, index + 1);
    }
  }

  throw new Error(`无法解析 ${marker} 的结束位置`);
}

function readObjectProperties(objectBody) {
  const lines = objectBody.split(/\r?\n/);
  const properties = [];
  let depth = 0;
  let blockComment = false;
  let pendingComment = [];
  let currentProperty;

  const finishProperty = (endLine) => {
    if (!currentProperty) {
      return;
    }

    currentProperty.source = lines.slice(currentProperty.startLine, endLine).join('\n');
    properties.push(currentProperty);
    currentProperty = undefined;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (blockComment) {
      pendingComment.push(line);
      if (trimmed.endsWith('*/')) {
        blockComment = false;
      }
      continue;
    }

    if (trimmed.startsWith('/**')) {
      pendingComment = [line];
      blockComment = !trimmed.endsWith('*/');
      continue;
    }

    if (depth === 1) {
      const propertyMatch = line.match(/^\s{2}([A-Za-z_$][\w$]*):/);

      if (propertyMatch) {
        finishProperty(index);
        currentProperty = {
          name: propertyMatch[1],
          comment: pendingComment,
          startLine: index,
        };
        pendingComment = [];
      }

      const spreadMatch = line.match(/^\s{2}\.\.\.([A-Za-z_$][\w$]*)/);

      if (spreadMatch) {
        finishProperty(index);
        properties.push({
          name: spreadMatch[1],
          spread: true,
          comment: pendingComment,
        });
        pendingComment = [];
      }
    }

    let quote = '';
    for (let characterIndex = 0; characterIndex < line.length; characterIndex += 1) {
      const character = line[characterIndex];

      if (quote) {
        if (character === '\\') {
          characterIndex += 1;
        } else if (character === quote) {
          quote = '';
        }
        continue;
      }

      if (character === "'" || character === '"' || character === '`') {
        quote = character;
        continue;
      }

      if ('([{'.includes(character)) {
        depth += 1;
      }

      if (')]}'.includes(character)) {
        depth -= 1;
      }
    }
  }

  finishProperty(lines.length);
  return properties;
}

function readProps(source) {
  const propsBody = extractCall(source, 'defineProps');

  if (!propsBody.trim().startsWith('{')) {
    return [];
  }

  return readObjectProperties(propsBody);
}

function readPropsObject(source) {
  const objectBody = source.trim();

  if (!objectBody.startsWith('{') || !objectBody.endsWith('}')) {
    return [];
  }

  return readObjectProperties(objectBody);
}

function readEvents(source) {
  const emitsBody = extractCall(source, 'defineEmits');

  if (!emitsBody.trim().startsWith('{')) {
    return [];
  }

  const lines = emitsBody.split(/\r?\n/);
  const events = [];
  let depth = 0;
  let blockComment = false;
  let pendingComment = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (blockComment) {
      pendingComment.push(line);
      if (trimmed.endsWith('*/')) {
        blockComment = false;
      }
      continue;
    }

    if (trimmed.startsWith('/**')) {
      pendingComment = [line];
      blockComment = !trimmed.endsWith('*/');
      continue;
    }

    if (depth === 1) {
      const eventMatch = line.match(/^\s{2}(?:['"]([^'"]+)['"]|([A-Za-z_$][\w$-]*))(?:\s*:\s*|\s*\()/);

      if (eventMatch) {
        events.push({
          name: eventMatch[1] ?? eventMatch[2],
          comment: pendingComment,
        });
        pendingComment = [];
      }
    }

    let quote = '';
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];

      if (quote) {
        if (character === '\\') {
          index += 1;
        } else if (character === quote) {
          quote = '';
        }
        continue;
      }

      if (character === "'" || character === '"' || character === '`') {
        quote = character;
        continue;
      }

      if ('([{'.includes(character)) {
        depth += 1;
      }

      if (')]}'.includes(character)) {
        depth -= 1;
      }
    }
  }

  return events;
}

function readExposedMethods(source) {
  const exposedBody = extractCall(source, 'defineExpose');

  if (!exposedBody.trim().startsWith('{')) {
    return [];
  }

  return [...exposedBody.matchAll(/^\s*([A-Za-z_$][\w$]*)\s*,?\s*$/gm)]
    .map((match) => match[1])
    .map((name) => {
      const declaration = new RegExp(
        `/\\*\\*((?:(?!\\*/)[\\s\\S])*)\\*/\\s*function\\s+${name}\\s*\\(([^)]*)\\)`,
      ).exec(source);

      if (!declaration) {
        return undefined;
      }

      const comment = [`/**${declaration[1]}*/`];
      const parameters = [...declaration[1].matchAll(
        /@param\s+\{([^}]+)\}\s+([A-Za-z_$][\w$]*)/g,
      )].map((parameter) => `${parameter[2]}: ${parameter[1]}`);
      const returnType = declaration[1].match(/@returns?\s+\{([^}]+)\}/)?.[1] ?? 'void';

      return {
        name,
        comment,
        parameters,
        returnType,
      };
    })
    .filter(Boolean);
}

function parseComment(lines) {
  const text = lines
    .map((line) => line.replace(/^\s*\/\*\*?/, '').replace(/\*\/$/, '').replace(/^\s*\* ?/, '').trim())
    .filter(Boolean)
    .join(' ');
  const typeMatch = text.match(/@type\s+\{(.+)\}/);
  const defaultMatch = text.match(/@default\s+(.+?)(?:\s+@\w+|$)/);

  return {
    text: text
      .replace(/@type\s+\{.+\}/, '')
      .replace(/@default\s+.+?(?=\s+@\w+|$)/, '')
      .replace(/@required/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
    type: typeMatch?.[1] ?? 'unknown',
    defaultValue: defaultMatch?.[1] ?? undefined,
    required: text.includes('@required'),
  };
}

function resolveProps(componentPath, source) {
  const props = readProps(source);
  const resolved = [];

  for (const prop of props) {
    if (prop.spread && prop.name === 'TEXT_INPUT_PROPS') {
      const sharedPath = path.join(path.dirname(componentPath), '..', 'text-input-props.js');
      const sharedSource = fs.readFileSync(sharedPath, 'utf8');
      resolved.push(...readPropsObject(extractObject(sharedSource, 'TEXT_INPUT_PROPS =')));
      continue;
    }

    if (!prop.spread) {
      resolved.push(prop);
    }
  }

  return resolved;
}

function isRequired(prop) {
  return prop.comment.some((line) => line.includes('@required'))
    || /required:\s*true/.test(prop.source);
}

function propType(prop) {
  const comment = parseComment(prop.comment);
  return {
    ...comment,
    optional: !isRequired(prop),
  };
}

function eventType(event) {
  const parsed = parseComment(event.comment);
  const description = parsed.text;

  if (parsed.type !== 'unknown') {
    return parsed.type;
  }

  if (/MouseEvent/.test(description)) {
    return 'MouseEvent';
  }

  if (/(?:原生 )?Event/.test(description)) {
    return 'Event';
  }

  if (/boolean/.test(description)) {
    return 'boolean';
  }

  if (/string/.test(description)) {
    return 'string';
  }

  return 'unknown';
}

function formatComment(comment, indent = '  ') {
  if (!comment.length) {
    return [];
  }

  return comment.map((line) => `${indent}${line.trim()}`);
}

function componentTag(name) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function generate() {
  const entrySource = fs.readFileSync(ENTRY, 'utf8');
  const components = [...entrySource.matchAll(/export \{ default as (\w+) \} from '([^']+\.vue)'/g)]
    .map((match) => ({ name: match[1], path: `src/${match[2].slice(2)}` }));
  const output = [
    '/* eslint-disable */',
    '// 此文件由 scripts/build-types.mjs 生成，禁止直接编辑。',
    "import type { DefineComponent } from 'vue';",
    '',
  ];

  for (const component of components) {
    const absolutePath = path.join(ROOT, component.path);
    const source = fs.readFileSync(absolutePath, 'utf8');
    const props = resolveProps(absolutePath, source).map((prop) => ({
      ...prop,
      ...propType(prop),
    }));
    const events = readEvents(source);
    const exposedMethods = readExposedMethods(source);
    const propsName = `${component.name}Props`;
    const emitsName = `${component.name}Emits`;
    const exposedName = `${component.name}Exposed`;

    output.push(`export interface ${propsName} {`);
    for (const prop of props) {
      output.push(...formatComment(prop.comment));
      output.push(`  ${prop.name}${prop.optional ? '?' : ''}: ${prop.type};`);
    }
    output.push('}', '');

    if (events.length) {
      output.push(`export interface ${emitsName} {`);
      for (const event of events) {
        output.push(...formatComment(event.comment));
        output.push(`  ${JSON.stringify(event.name)}: (payload: ${eventType(event)}) => unknown;`);
      }
      output.push('}', '');
    }

    if (exposedMethods.length) {
      output.push(`export interface ${exposedName} {`);
      for (const method of exposedMethods) {
        output.push(...formatComment(method.comment));
        output.push(`  ${method.name}(${method.parameters.join(', ')}): ${method.returnType};`);
      }
      output.push('}', '');
    }

    const emitsType = events.length ? emitsName : '{}';
    const exposedType = exposedMethods.length ? exposedName : '{}';
    output.push(`export type ${component.name}Component = DefineComponent<${propsName}, ${exposedType}, {}, {}, {}, {}, {}, ${emitsType}>;`);
    output.push(`export declare const ${component.name}: ${component.name}Component;`, '');
  }

  output.push(
    "export type MatThemeMode = 'light' | 'dark' | 'system';",
    "export type MatResolvedThemeMode = 'light' | 'dark';",
    "export type MatSchemeVariant = 'tonal-spot' | 'neutral' | 'vibrant' | 'expressive';",
    'export interface MatThemeOptions {',
    '  mode?: MatThemeMode;',
    '  seedColor?: string;',
    '  schemeVariant?: MatSchemeVariant;',
    '  contrastLevel?: number;',
    '  target?: HTMLElement;',
    '}',
    'export interface MatThemeController {',
    "  mode: Readonly<import('vue').Ref<MatThemeMode>>;",
    "  resolvedMode: Readonly<import('vue').Ref<MatResolvedThemeMode>>;",
    "  seedColor: Readonly<import('vue').Ref<string>>;",
    "  schemeVariant: Readonly<import('vue').Ref<MatSchemeVariant>>;",
    "  contrastLevel: Readonly<import('vue').Ref<number>>;",
    '  target: HTMLElement;',
    '  setMode(value: MatThemeMode): void;',
    '  setSeedColor(value: string): void;',
    '  setSchemeVariant(value: MatSchemeVariant): void;',
    '  setContrastLevel(value: number): void;',
    '  dispose(): void;',
    '}',
    'export interface MatUiOptions {',
    '  theme?: MatThemeOptions;',
    '  iconClass?: string;',
    '  defaults?: MatComponentDefaults;',
    '  useCursor?: boolean;',
    '}',
    'export type MatComponentDefaults = {',
    '  tooltip?: { openDelay?: number; skipDelayDuration?: number };',
    '} & Record<string, Record<string, unknown>>;',
    "export declare function createMatUi(options?: MatUiOptions): import('vue').Plugin & { theme: MatThemeController };",
    'export declare function useMatProps<T extends Record<string, unknown>>(componentName: string, props: T): T & Record<string, unknown>;',
    'export declare function useMatTheme(): MatThemeController;',
    "export type MatAppEdge = 'top' | 'bottom' | 'start' | 'end';",
    "export type MatAppBreakpoint = 'compact' | 'medium' | 'expanded' | 'large' | 'extra-large';",
    'export interface MatAppEdgeInsets {',
    '  readonly start: number;',
    '  readonly end: number;',
    '}',
    'export interface MatAppEdgeInfo {',
    '  readonly size: number;',
    '  readonly startInset: number;',
    '  readonly endInset: number;',
    '}',
    'export interface MatAppLayout {',
    '  readonly size: Readonly<{ width: number; height: number }>;',
    '  readonly padding: Readonly<{ top: number; bottom: number; start: number; end: number }>;',
    '  readonly content: Readonly<{ width: number; height: number }>;',
    '  readonly breakpoint: MatAppBreakpoint;',
    '  readonly breakpointRange: Readonly<{ min: number; max: number }>;',
    '  readonly edges: Readonly<Record<MatAppEdge, MatAppEdgeInfo>>;',
    '}',
    'export interface MatAppEdgeRegistration {',
    '  readonly insets: Readonly<MatAppEdgeInsets>;',
    '  update(): void;',
    '  unregister(): void;',
    '}',
    'export interface MatAppContext {',
    '  readonly layout: Readonly<MatAppLayout>;',
    '  registerEdge(options: { edge: MatAppEdge; element: HTMLElement }): MatAppEdgeRegistration;',
    '}',
    'export declare function useMatApp(): MatAppContext;',
    "export declare const Intersection: import('vue').ObjectDirective<HTMLElement>;",
    '',
    "export type DialogActionVariant = 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'standard' | 'text';",
    'export interface DialogAction<T = unknown> {',
    '  text: string;',
    '  value?: T;',
    '  variant?: DialogActionVariant;',
    '  color?: string;',
    '  disabled?: boolean;',
    '}',
    'export interface DialogOptions<T = unknown> {',
    '  attach?: string | HTMLElement;',
    '  fullScreen?: boolean;',
    '  width?: number | string;',
    '  scrim?: boolean;',
    '  closeOnBack?: boolean;',
    '  title?: string;',
    '  content?: string;',
    '  icon?: string;',
    '  closeLabel?: string;',
    '  color?: string;',
    '  ariaLabel?: string;',
    '  actions?: DialogAction<T>[];',
    '}',
    'export declare function dialog<T = unknown>(options?: DialogOptions<T>): Promise<T | undefined>;',
    "export declare function alert(options?: Omit<DialogOptions<void>, 'actions'> & { confirmText?: string }): Promise<void>;",
    "export declare function confirm(options?: Omit<DialogOptions<boolean>, 'actions'> & { confirmText?: string; cancelText?: string }): Promise<boolean>;",
    "export declare function prompt(options?: Omit<DialogOptions<string | null>, 'actions'> & { confirmText?: string; cancelText?: string; defaultValue?: string; label?: string; placeholder?: string; required?: boolean }): Promise<string | null>;",
    'export interface SnackbarOptions {',
    '  text: string;',
    '  actionText?: string;',
    '  onAction?: () => void;',
    '  closable?: boolean;',
    '  closeLabel?: string;',
    "  position?: 'left' | 'center' | 'right';",
    '  duration?: number;',
    '}',
    'export declare function snackbar(options: SnackbarOptions): Promise<void>;',
    'export declare const toast: typeof snackbar;',
    '',
  );
  output.push("declare module 'vue' {");
  output.push('  export interface GlobalComponents {');
  for (const component of components) {
    output.push(`    ${component.name}: typeof ${component.name};`);
    output.push(`    '${componentTag(component.name)}': typeof ${component.name};`);
  }
  output.push('  }', '}', '');

  return output.join('\n');
}

const generated = generate();
const checkOnly = process.argv.includes('--check');

if (checkOnly) {
  const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : '';

  if (current !== generated) {
    console.error('类型声明文件已过期，请运行 pnpm types:build。');
    process.exitCode = 1;
  }
} else {
  fs.writeFileSync(OUTPUT, generated, 'utf8');
}
