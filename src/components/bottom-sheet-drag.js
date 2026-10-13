/**
 * Bottom sheet 档位、拖动几何与嵌套滚动手势计算。
 *
 * 内部模块，不加入公共入口。把手拖动与内容区手势共用同一套档位与吸附几何：
 * 把 min、normal、max 三档高度换算成跟手尺寸与偏移，按松手时的可见高度解析
 * 落点；关闭分区高度为 0，低于它与 min 的中点即关闭。内容区手势在移动超过
 * 意图阈值后按方向与滚动位置决定拦截方式，参考 AndroidX 嵌套滚动行为。
 */

/** min 档固定高度，单位为 CSS px，与 --mat-sheet-min-block-size 保持一致。 */
export const MIN_BLOCK_SIZE = 64;

/** 判定甩动所需的最小位移，单位为 CSS px。 */
export const FLICK_DISTANCE = 48;

/** 判定甩动所需的最小速度，单位为 px/ms。 */
export const FLICK_VELOCITY = 0.5;

/** 向上拖动超过可用高度后的阻尼系数，越小越沉。 */
export const OVERSHOOT_DAMPING = 0.25;

/** 内容区手势的方向意图阈值，单位为 CSS px。 */
export const GESTURE_SLOP = 8;

/** 具名档位，其余取值按自定义高度处理。 */
const NAMED_EXTENTS = ['min', 'normal', 'max'];

/** 键盘步进的档位阶梯；full 与自定义高度视作 max 之上的档位。 */
const KEYBOARD_TIERS = ['min', 'normal', 'max'];

/**
 * 计算 min、normal、max 三档高度。
 *
 * normal 取内容完整高度与可用高度一半的较小值，max 取内容完整高度并以可用
 * 高度封顶；两者都不低于 min，保证档位随高度递增。
 *
 * @param {{ availableExtent: number, contentExtent: number }} geometry
 * @returns {{ max: number, min: number, normal: number }}
 */
export function resolveBottomSheetTiers({ availableExtent, contentExtent }) {
  const available = Math.max(0, availableExtent);
  const content = Math.max(0, contentExtent);
  const min = MIN_BLOCK_SIZE;
  const normal = Math.max(min, Math.min(content, available / 2));

  return {
    max: Math.max(normal, Math.min(content, available)),
    min,
    normal,
  };
}

/**
 * 解析拖动结束后吸附到的档位。
 *
 * 候选档位按高度升序排列，相邻档位以中点为分界。当前值不是 min、normal、
 * max 时额外加入当前可见高度，避免从 full 或自定义高度小幅拖动就跳档。
 *
 * @param {{ availableExtent: number, contentExtent: number, currentExtent: number, currentValue: unknown }} geometry
 * @param {number} extent 松手时的可见高度
 * @returns {{ close: boolean, size: number, value: unknown }}
 */
export function resolveBottomSheetDragTarget(geometry, extent) {
  const tiers = resolveBottomSheetTiers(geometry);
  const zones = [
    { size: 0, value: null },
    { size: tiers.min, value: 'min' },
    { size: tiers.normal, value: 'normal' },
    { size: tiers.max, value: 'max' },
  ];

  if (!NAMED_EXTENTS.includes(geometry.currentValue)) {
    zones.push({
      size: Math.max(0, geometry.currentExtent),
      value: geometry.currentValue,
    });
  }

  zones.sort((left, right) => left.size - right.size);

  const boundary = zones.findIndex((zone, index) => (
    index > 0 && extent < (zones[index - 1].size + zone.size) / 2
  ));
  const selected = boundary === -1 ? zones.at(-1) : zones[boundary - 1];

  return {
    close: selected.value === null,
    size: selected.size,
    value: selected.value,
  };
}

/**
 * 计算折叠档跟手拖动时的面板尺寸与整体偏移。
 *
 * 向下拖动先把面板缩到 min，越过后固定 min 高度、改用偏移继续下滑；向上
 * 拖动先放大到可用高度，超过部分按阻尼系数继续放大并受 overshootLimit 封顶，
 * 让档位无法提升时仍有跟手反馈。内容区手势传入 0 上限，超出部分改为滚动内容。
 *
 * @param {{ availableExtent: number, extent: number, overshootLimit?: number }} geometry
 * @returns {{ offset: number, size: number }}
 */
export function resolveBottomSheetDragGeometry({
  availableExtent,
  extent,
  overshootLimit = 0,
}) {
  const available = Math.max(0, availableExtent);
  const requested = Math.max(0, extent);

  if (requested > available) {
    const overshoot = Math.min(
      (requested - available) * OVERSHOOT_DAMPING,
      Math.max(0, overshootLimit),
    );

    return { offset: 0, size: available + overshoot };
  }

  return {
    offset: Math.max(0, MIN_BLOCK_SIZE - requested),
    size: Math.min(available, Math.max(MIN_BLOCK_SIZE, requested)),
  };
}

/**
 * 决定内容区手势的拦截方式。
 *
 * deltaY 为按下位置到当前指针位置的纵向位移，向下为正。折叠档向上拖动拦截
 * 为展开面板；内容滚动在顶部时向下拖动拦截为收缩面板；其余情况交还原生滚动。
 * 位移未超过意图阈值时返回 null 继续等待。
 *
 * @param {{ deltaY: number, isCollapsed: boolean, scrollTop: number }} gesture
 * @returns {'collapse'|'expand'|'scroll'|null}
 */
export function resolveBottomSheetGestureAction({ deltaY, isCollapsed, scrollTop }) {
  if (deltaY < -GESTURE_SLOP) {
    return isCollapsed ? 'expand' : 'scroll';
  }

  if (deltaY > GESTURE_SLOP) {
    return scrollTop <= 0 ? 'collapse' : 'scroll';
  }

  return null;
}

/**
 * 判断松手动作是否为触控甩动，并解析甩动方向的目标。
 *
 * 向下甩动解析为 close，向上甩动解析为 expand；expand 目标是否被接受
 * （仅折叠档接受）由调用方判断。鼠标拖动不参与甩动判定：鼠标位移小、速度
 * 快，轻微拖动就会误判，因此鼠标只能通过把落点拖进对应分区来改变档位或关闭。
 *
 * @param {{ delta: number, distance: number, pointerType?: string, velocity: number }} input
 * @returns {'close'|'expand'|null}
 */
export function resolveBottomSheetFlick({
  delta,
  distance,
  pointerType,
  velocity,
}) {
  if (pointerType === 'mouse') {
    return null;
  }

  if (distance < FLICK_DISTANCE || velocity < FLICK_VELOCITY) {
    return null;
  }

  if (delta > 0) {
    return 'close';
  }

  if (delta < 0) {
    return 'expand';
  }

  return null;
}

/**
 * 解析把手方向键请求的档位。
 *
 * 档位阶梯为 min、normal、max，step 为 1 时向展开方向步进、-1 时向折叠方向
 * 步进；full 与自定义高度视作 max 之上的档位，向折叠方向先回到 max。越界时
 * 返回 null 表示不改变档位。
 *
 * @param {unknown} value 当前展开值
 * @param {number} step 方向步长，1 或 -1
 * @returns {'max'|'min'|'normal'|null}
 */
export function resolveBottomSheetKeyboardTarget(value, step) {
  const index = KEYBOARD_TIERS.indexOf(value);

  if (index === -1) {
    return step < 0 ? 'max' : null;
  }

  const next = KEYBOARD_TIERS[index + step];

  return next ?? null;
}
