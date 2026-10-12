const FALLBACK_COLUMN_COUNT = 1;

let scopeSequence = 0;

/**
 * 创建当前实例唯一的规则作用域值。
 *
 * 必须真正处于模块作用域计数；放在 `<script setup>` 内会随每个实例重置。
 *
 * @returns {string}
 */
export function createGridListScopeId() {
  scopeSequence += 1;

  return `mat-grid-list-${scopeSequence}`;
}

/**
 * 归一化列数；非法值回退到单列，保证任何输入都产生合法的网格几何。
 *
 * @param {unknown} cols
 * @returns {number}
 */
function normalizeColumnCount(cols) {
  if (Number.isInteger(cols) && cols >= 1) {
    return cols;
  }

  return FALLBACK_COLUMN_COUNT;
}

/**
 * 计算网格中每个项目四角是否没有任何相邻项目。
 *
 * 判定只看真实相邻关系：某个角只有在其两个朝向上都不存在相邻项目时
 * 才使用大圆角；只要有任意相邻项目就使用小圆角。因此缺行末行中
 * 右侧、下方露出空白的项目同样适用大圆角。
 *
 * @param {number} count 项目总数。
 * @param {number} cols 列数。
 * @returns {Array<{ startStart: boolean, startEnd: boolean, endStart: boolean, endEnd: boolean }>}
 *   按项目顺序给出四角是否应使用大圆角。
 */
export function getGridListCornerShapes(count, cols) {
  const columnCount = normalizeColumnCount(cols);
  const shapes = [];

  for (let index = 0; index < count; index += 1) {
    const column = index % columnCount;
    const hasAbove = index - columnCount >= 0;
    const hasBelow = index + columnCount < count;
    const hasBefore = column > 0;
    const hasAfter = column < columnCount - 1 && index + 1 < count;

    shapes.push({
      startStart: !hasAbove && !hasBefore,
      startEnd: !hasAbove && !hasAfter,
      endStart: !hasBelow && !hasBefore,
      endEnd: !hasBelow && !hasAfter,
    });
  }

  return shapes;
}

/**
 * 生成网格列表容器的角落圆角 CSS 规则文本。
 *
 * 规则通过 `nth-child` 公式直接表达角落邻接关系（首行、末行、首列、
 * 末列的组合），并把 MatListItem 消费的四个角落形状变量设置为普通
 * List 相同的令牌：外角使用 `--mat-list-container-shape`，相邻角使用
 * `--mat-list-item-container-shape`。声明带 `!important`：MatList 容器
 * 的 scoped 首尾子项规则编译后特异性更高，必须跨组件覆盖才能保持
 * 网格邻接圆角。
 *
 * @param {string} scopeSelector 容器唯一作用域选择器。
 * @param {number} cols 列数。
 * @returns {string} 可写入 style 元素的 CSS 文本。
 */
export function createGridListCornerCss(scopeSelector, cols) {
  const columnCount = normalizeColumnCount(cols);
  const smallShape = 'var(--mat-list-item-container-shape)';
  const largeShape = 'var(--mat-list-container-shape)';
  const allCorners = [
    'start-start',
    'start-end',
    'end-start',
    'end-end',
  ];

  /**
   * @param {string} shape
   * @returns {string}
   */
  function declarations(shape) {
    return allCorners
      .map((corner) => `--mat-list-item-${corner}-shape: ${shape} !important`)
      .join('; ');
  }

  const firstRow = `:nth-child(-n+${columnCount})`;
  const lastRow = `:nth-last-child(-n+${columnCount})`;
  const firstColumn = `:nth-child(${columnCount}n+1)`;
  const lastColumn = `:is(:nth-child(${columnCount}n), :nth-last-child(1))`;

  return [
    `${scopeSelector} > *:nth-child(n) { ${declarations(smallShape)}; }`,
    `${scopeSelector} > *${firstRow}${firstColumn} { --mat-list-item-start-start-shape: ${largeShape} !important; }`,
    `${scopeSelector} > *${firstRow}${lastColumn} { --mat-list-item-start-end-shape: ${largeShape} !important; }`,
    `${scopeSelector} > *${lastRow}${firstColumn} { --mat-list-item-end-start-shape: ${largeShape} !important; }`,
    `${scopeSelector} > *${lastRow}${lastColumn} { --mat-list-item-end-end-shape: ${largeShape} !important; }`,
  ].join('\n');
}
