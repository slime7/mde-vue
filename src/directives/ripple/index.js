import { addAnchorName, removeAnchorName } from '../../anchor-names';
import {
  canContainLayer, createDevWarn, isDisabled, readColorOption, readObjectOptions,
} from '../common';

/**
 * @typedef {object} RippleOptions
 * @property {string} [color='currentcolor'] 涟漪颜色。
 * @property {'circle' | 'dots' | 'glow' | 'rings' | 'burst'} [variant='circle'] 波纹形状；
 *   glow 为按压点扩展至整个容器表面的羽化光斑，dots、rings 与 burst 为向外扩散覆盖容器的瞬时动态波纹。
 * @property {HTMLElement} [target] 涟漪覆盖的目标元素，默认为宿主本身。
 * @property {boolean} [disabled=false] 跳过涟漪；动态切换为 false 时按需挂载。
 */

// 时长与缓动参考 AndroidX Compose material-ripple 的 RippleAnimation：
// 透明度淡入 75ms（线性）、半径与中心 225ms、释放后淡出 150ms（线性）。
const FADE_IN_DURATION = 75;
const RADIUS_DURATION = 225;
const FADE_OUT_DURATION = 150;
const RADIUS_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
// 有界涟漪的结束半径在覆盖宿主对角线之外再加 10px，起始半径为最大边长的 30%。
const BOUNDED_EXTRA_RADIUS = 10;
const START_RADIUS_RATIO = 0.3;
const ALPHA_PROPERTY = '--mat-sys-state-pressed-state-layer-opacity';
const DEFAULT_PRESSED_ALPHA = 0.12;
const VARIANT_CIRCLE = 'circle';
const VARIANT_DOTS = 'dots';
const VARIANT_GLOW = 'glow';
const VARIANT_RINGS = 'rings';
const VARIANT_BURST = 'burst';
const RIPPLE_VARIANTS = new Set([VARIANT_CIRCLE, VARIANT_DOTS, VARIANT_GLOW, VARIANT_RINGS, VARIANT_BURST]);
// 波点变体在铺满宿主的固定层上平铺 8px 网格、直径 3px 的圆点，网格锚定按压点，以按压点为中心呈环形波形向外扩展消散。
const DOTS_GRID_SIZE = 8;
const DOTS_BACKGROUND_IMAGE = 'radial-gradient(circle, currentcolor 1.5px, transparent 1.5px)';
const DOTS_BACKGROUND_SIZE = `${DOTS_GRID_SIZE}px ${DOTS_GRID_SIZE}px`;
const DOTS_RING_WIDTH = 28;
const DOTS_DURATION = 500;
// 柔光的羽化光斑从按压点扩散至覆盖整个宿主表面，向边缘渐隐至 100%。
const GLOW_BACKGROUND_IMAGE = 'radial-gradient(circle, currentcolor 0%, currentcolor 30%, transparent 100%)';
// 柔光、波点、圆环与星芒的可见结构是羽化面、离散点阵或细线条，需要比实心圆更高的不透明度才能获得相近的感知强度。
const SOFT_VARIANT_OPACITY_SCALE = 4;
// 扩散圆环：两圈 2px 细环，间隔 160ms 先后在约 520ms 内从按压点扩散出宿主并消散。
const RING_COUNT = 2;
const RING_BORDER_WIDTH = 2;
const RING_START_SCALE = '0.06';
const RING_PEAK_OFFSET = 0.15;
const RING_DURATION = 520;
const RING_DELAY = 160;
// 星芒爆发：八道光线从按压点放射，逐道延迟 20ms 拉长并在约 460ms 内消散。
const BURST_RAY_COUNT = 8;
const BURST_RAY_WIDTH = 2;
const BURST_RAY_START_SCALE = 0.12;
const BURST_RAY_PEAK_SCALE = 0.55;
const BURST_RAY_ANGLE_OFFSET = 22.5;
const BURST_RAY_STAGGER = 20;
const BURST_PEAK_OFFSET = 0.25;
const BURST_DURATION = 460;
// 瞬时变体的扩散与消散比实心圆更轻盈，使用更快的缓出曲线。
const TRANSIENT_EASING = 'cubic-bezier(0.2, 0, 0, 1)';
const OPTION_KEYS = new Set(['color', 'variant', 'target', 'disabled']);
const warn = createDevWarn('v-ripple');

if (typeof CSS !== 'undefined' && typeof CSS.registerProperty === 'function') {
  try {
    CSS.registerProperty({
      name: '--mat-ripple-dots-radius',
      syntax: '<length>',
      inherits: false,
      initialValue: '0px',
    });
  } catch {
    // 忽略重复注册异常。
  }
}

/** @type {WeakMap<HTMLElement, RippleRecord>} */
const records = new WeakMap();
let nextAnchorId = 0;

/**
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * @param {Animation[]} animations
 * @returns {void}
 */
function cancelAnimations(animations) {
  animations.forEach((animation) => {
    try {
      animation.cancel();
    } catch {
      // 已结束的动画无需取消。
    }
  });
}

/**
 * @param {Record<string, unknown>} options
 * @returns {boolean}
 */
function readDisabledOption(options) {
  const value = options.disabled;

  if (value === undefined) {
    return false;
  }

  if (typeof value !== 'boolean') {
    warn('disabled 必须是 boolean；已忽略。');
    return false;
  }

  return value;
}

/**
 * @param {unknown} target 选项中的覆盖目标。
 * @returns {HTMLElement | undefined}
 */
function readTargetOption(target) {
  if (target === undefined) {
    return undefined;
  }

  if (typeof HTMLElement !== 'undefined' && target instanceof HTMLElement) {
    return target;
  }

  warn('target 必须是 HTMLElement；已回退为宿主元素。');
  return undefined;
}

/**
 * @param {unknown} variant 选项中的波纹形状。
 * @returns {string}
 */
function readVariantOption(variant) {
  if (variant === undefined) {
    return VARIANT_CIRCLE;
  }

  if (!RIPPLE_VARIANTS.has(variant)) {
    warn(`variant 必须是 '${VARIANT_CIRCLE}'、'${VARIANT_DOTS}'、'${VARIANT_GLOW}'、'${VARIANT_RINGS}' 或 '${VARIANT_BURST}'；已回退为 '${VARIANT_CIRCLE}'。`);
    return VARIANT_CIRCLE;
  }

  return variant;
}

/**
 * @returns {RippleRecord}
 */
function createSkippedRecord() {
  return {
    activePointers: null,
    anchorElement: null,
    anchorName: undefined,
    container: null,
    observer: null,
    removeEventListeners: () => {},
    target: null,
    variant: VARIANT_CIRCLE,
    waves: null,
  };
}

/**
 * @typedef {object} RippleRecord
 * @property {HTMLElement | null} container 为 null 表示因 disabled 选项跳过。
 * @property {HTMLElement | null} anchorElement 承载锚点名称的元素；target 缺省时为宿主。
 * @property {HTMLElement | null} target 自定义覆盖目标；为 null 时使用宿主。
 * @property {string | undefined} anchorName
 * @property {Set<RippleWave> | null} waves
 * @property {Map<number, RippleWave> | null} activePointers
 * @property {MutationObserver | null} observer
 * @property {string} variant 后续按压使用的波纹形状；进行中的波纹保持创建时的形状。
 * @property {() => void} removeEventListeners
 */

/**
 * 计算从按压点到达宿主矩形最远边角所需的半径，保证波纹效果覆盖整个容器表面。
 *
 * @param {DOMRect} rect 宿主矩形。
 * @param {number} originX 相对宿主的横向按压坐标。
 * @param {number} originY 相对宿主的纵向按压坐标。
 * @returns {number}
 */
function computeSurfaceRadius(rect, originX, originY) {
  const maxDx = Math.max(originX, rect.width - originX);
  const maxDy = Math.max(originY, rect.height - originY);

  return Math.hypot(maxDx, maxDy) + BOUNDED_EXTRA_RADIUS;
}

/**
 * 计算 round 重复在给定长度上取整后的网格间距，与浏览器 background-repeat: round 一致。
 *
 * @param {number} length 宿主单边长度。
 * @returns {number}
 */
function dotsTileSize(length) {
  if (length <= 0) {
    return DOTS_GRID_SIZE;
  }

  return length / Math.max(1, Math.round(length / DOTS_GRID_SIZE));
}

/**
 * 单个波纹的生命周期：保持型变体（实心圆、柔光）进入动画后保持可见，
 * 结束请求后等到进入时长结束再淡出并移除；瞬时变体（波点、圆环、星芒）播放至结束自行移除，释放不打断。
 */
class RippleWave {
  /**
   * @param {RippleRecord} record
   * @param {number} alpha 按压状态层透明度，作为保持型变体的完整不透明度。
   */
  constructor(record, alpha) {
    this.record = record;
    this.startedAt = Date.now();
    this.alpha = alpha;
    this.variant = record.variant;
    this.dots = this.variant === VARIANT_DOTS;
    this.glow = this.variant === VARIANT_GLOW;
    this.transient = this.dots || this.variant === VARIANT_RINGS || this.variant === VARIANT_BURST;
    this.animated = false;
    this.opacity = this.glow || this.transient
      ? Math.min(1, alpha * SOFT_VARIANT_OPACITY_SCALE)
      : alpha;
    /** @type {Animation[]} */
    this.enterAnimations = [];
    /** @type {HTMLElement[]} */
    this.children = [];
    this.exitTimer = undefined;
    this.exiting = false;
    this.removed = false;
    /** @type {HTMLElement} */
    this.element = document.createElement('span');
    this.element.className = 'mat-ripple-wave';

    if (this.dots) {
      this.element.style.backgroundColor = 'transparent';
      this.element.style.backgroundImage = DOTS_BACKGROUND_IMAGE;
      this.element.style.backgroundSize = DOTS_BACKGROUND_SIZE;
      // round 重复把平铺数取整，右缘与下缘的圆点始终保持完整。
      this.element.style.backgroundRepeat = 'round';
      // 波点层铺满宿主，环形遮罩由 mask-image 揭示；基类的 50% 圆形裁剪必须关闭。
      this.element.style.borderRadius = '0';
    }

    if (this.glow) {
      this.element.style.backgroundColor = 'transparent';
      this.element.style.backgroundImage = GLOW_BACKGROUND_IMAGE;
    }

    if (this.variant === VARIANT_RINGS) {
      // 波纹元素退化为铺满宿主的透明容器，两圈细环作为子节点从按压点依次扩散。
      this.element.style.backgroundColor = 'transparent';
      for (let index = 0; index < RING_COUNT; index += 1) {
        const ring = document.createElement('span');

        ring.style.position = 'absolute';
        ring.style.border = `${RING_BORDER_WIDTH}px solid currentcolor`;
        ring.style.borderRadius = '50%';
        ring.style.opacity = '0';
        this.children.push(ring);
        this.element.append(ring);
      }
    }

    if (this.variant === VARIANT_BURST) {
      // 光线以按压点为原点放射，长度、位置与角度在 place 时按宿主尺寸与按压点确定。
      this.element.style.backgroundColor = 'transparent';
      for (let index = 0; index < BURST_RAY_COUNT; index += 1) {
        const ray = document.createElement('span');

        ray.style.position = 'absolute';
        ray.style.width = `${BURST_RAY_WIDTH}px`;
        ray.style.borderRadius = `${BURST_RAY_WIDTH}px`;
        ray.style.background = 'currentcolor';
        ray.style.transformOrigin = '50% 100%';
        ray.style.opacity = '0';
        this.children.push(ray);
        this.element.append(ray);
      }
    }

    if (this.transient) {
      // 基类样式默认以 opacity: 0 隐藏波纹；瞬时变体的容器不参与全局淡入，
      // 可见性由关键帧或子节点动画表达，必须显式保持容器基准可见。
      this.element.style.opacity = '1';
    }
  }

  /**
   * @param {HTMLElement} surface 涟漪容器元素，决定波纹的覆盖范围。
   * @param {number} originX 相对容器的横向坐标。
   * @param {number} originY 相对容器的纵向坐标。
   * @returns {void}
   */
  place(surface, originX, originY) {
    const rect = surface.getBoundingClientRect();
    const startRadius = Math.max(rect.width, rect.height) * START_RADIUS_RATIO;
    const endRadius = Math.hypot(rect.width, rect.height) / 2 + BOUNDED_EXTRA_RADIUS;
    const maxRadius = computeSurfaceRadius(rect, originX, originY);

    this.animated = !prefersReducedMotion() && typeof this.element.animate === 'function';

    if (this.dots) {
      // 波点固定不动，以按压点为圆心的环形遮罩向外扩展揭示波纹边缘。
      this.element.style.width = '100%';
      this.element.style.height = '100%';
      this.element.style.left = '0px';
      this.element.style.top = '0px';
      this.element.style.backgroundPosition = `${Math.round(originX - dotsTileSize(rect.width) / 2)}px ${Math.round(originY - dotsTileSize(rect.height) / 2)}px`;
      this.element.style.setProperty('--mat-ripple-dots-radius', '0px');
      this.element.style.maskImage = `radial-gradient(circle at ${originX}px ${originY}px, transparent 0, transparent calc(var(--mat-ripple-dots-radius) - ${DOTS_RING_WIDTH}px), black var(--mat-ripple-dots-radius), transparent calc(var(--mat-ripple-dots-radius) + ${DOTS_RING_WIDTH}px))`;
      this.element.style.webkitMaskImage = this.element.style.maskImage;
    } else if (this.glow) {
      // 光斑停留在按压点放大并覆盖整个容器表面，圆心不向宿主中心迁移。
      this.element.style.width = `${maxRadius * 2}px`;
      this.element.style.height = `${maxRadius * 2}px`;
      this.element.style.left = `${originX - maxRadius}px`;
      this.element.style.top = `${originY - maxRadius}px`;
    } else if (this.transient) {
      this.element.style.width = '100%';
      this.element.style.height = '100%';
      this.element.style.left = '0px';
      this.element.style.top = '0px';
      this.placeTransient(originX, originY, rect, maxRadius);
    } else {
      this.element.style.width = `${endRadius * 2}px`;
      this.element.style.height = `${endRadius * 2}px`;
      this.element.style.left = `${originX - endRadius}px`;
      this.element.style.top = `${originY - endRadius}px`;
    }

    if (!this.animated) {
      // 减少动态效果或缺少 Web Animations 的环境直接呈现静止的按压反馈。
      if (this.transient) {
        if (this.dots) {
          this.element.style.maskImage = '';
          this.element.style.webkitMaskImage = '';
          this.element.style.opacity = String(this.opacity);
        } else {
          for (let index = 0; index < this.children.length; index += 1) {
            this.children[index].style.opacity = String(this.opacity);
          }
        }
      } else {
        this.element.style.opacity = String(this.opacity);
      }
      return;
    }

    if (this.transient) {
      this.playTransient(maxRadius);
      return;
    }

    this.enterAnimations.push(
      this.element.animate(
        [{ opacity: '0' }, { opacity: String(this.opacity) }],
        { duration: FADE_IN_DURATION, easing: 'linear', fill: 'forwards' },
      ),
    );

    const targetRadius = this.glow ? maxRadius : endRadius;

    this.enterAnimations.push(
      this.element.animate(
        [{ scale: `${startRadius / targetRadius}` }, { scale: '1' }],
        { duration: RADIUS_DURATION, easing: RADIUS_EASING, fill: 'forwards' },
      ),
    );

    if (!this.glow) {
      this.enterAnimations.push(
        this.element.animate(
          [{ translate: '0px 0px' }, { translate: `${rect.width / 2 - originX}px ${rect.height / 2 - originY}px` }],
          { duration: RADIUS_DURATION, easing: 'linear', fill: 'forwards' },
        ),
      );
    }
  }

  /**
   * 定位瞬时变体的子节点：圆环以按压点为圆心，光线以按压点为原点放射。
   *
   * @param {number} originX 相对宿主的横向坐标。
   * @param {number} originY 相对宿主的纵向坐标。
   * @param {DOMRect} rect 宿主尺寸。
   * @param {number} maxRadius 覆盖宿主表面所需的最大半径。
   * @returns {void}
   */
  placeTransient(originX, originY, rect, maxRadius) {
    if (this.variant === VARIANT_RINGS) {
      for (let index = 0; index < this.children.length; index += 1) {
        const ring = this.children[index];

        ring.style.width = `${maxRadius * 2}px`;
        ring.style.height = `${maxRadius * 2}px`;
        ring.style.left = `${originX - maxRadius}px`;
        ring.style.top = `${originY - maxRadius}px`;
      }
      return;
    }

    if (this.variant === VARIANT_BURST) {
      const rayLength = maxRadius;

      for (let index = 0; index < this.children.length; index += 1) {
        const ray = this.children[index];

        ray.style.height = `${rayLength}px`;
        ray.style.left = `${originX - BURST_RAY_WIDTH / 2}px`;
        ray.style.top = `${originY - rayLength}px`;
        ray.style.rotate = `${(360 / BURST_RAY_COUNT) * index + BURST_RAY_ANGLE_OFFSET}deg`;
      }
    }
  }

  /**
   * 播放瞬时变体的自完成动画；动画结束后自行移除，播放进度由计时器兜底。
   *
   * @param {number} maxRadius 覆盖宿主表面所需的最大半径。
   * @returns {void}
   */
  playTransient(maxRadius) {
    if (this.variant === VARIANT_DOTS) {
      const targetRadius = maxRadius + DOTS_RING_WIDTH;

      this.enterAnimations.push(
        this.element.animate(
          [
            { '--mat-ripple-dots-radius': '0px', opacity: '0' },
            { opacity: String(this.opacity), offset: 0.15 },
            { '--mat-ripple-dots-radius': `${targetRadius}px`, opacity: '0' },
          ],
          {
            duration: DOTS_DURATION,
            easing: TRANSIENT_EASING,
            fill: 'both',
          },
        ),
      );
    } else if (this.variant === VARIANT_RINGS) {
      this.children.forEach((ring, index) => {
        this.enterAnimations.push(
          ring.animate(
            [
              { opacity: '0', scale: RING_START_SCALE },
              { opacity: String(this.opacity), offset: RING_PEAK_OFFSET },
              { opacity: '0', scale: '1' },
            ],
            {
              duration: RING_DURATION, delay: index * RING_DELAY, easing: TRANSIENT_EASING, fill: 'both',
            },
          ),
        );
      });
    } else {
      this.children.forEach((ray, index) => {
        this.enterAnimations.push(
          ray.animate(
            [
              { opacity: '0', scale: `1 ${BURST_RAY_START_SCALE}` },
              { opacity: String(this.opacity), offset: BURST_PEAK_OFFSET, scale: `1 ${BURST_RAY_PEAK_SCALE}` },
              { opacity: '0', scale: '1 1' },
            ],
            {
              duration: BURST_DURATION, delay: index * BURST_RAY_STAGGER, easing: TRANSIENT_EASING, fill: 'both',
            },
          ),
        );
      });
    }

    this.exitTimer = globalThis.setTimeout(() => {
      this.exitTimer = undefined;
      this.remove();
    }, this.transientDuration());
    this.enterAnimations[this.enterAnimations.length - 1].finished.then(
      () => this.remove(),
      () => this.remove(),
    );
  }

  /**
   * 计算瞬时变体从按压到最后一个动画结束的总时长。
   *
   * @returns {number}
   */
  transientDuration() {
    if (this.variant === VARIANT_DOTS) {
      return DOTS_DURATION;
    }

    if (this.variant === VARIANT_RINGS) {
      return RING_DELAY * (RING_COUNT - 1) + RING_DURATION;
    }

    return BURST_RAY_STAGGER * (BURST_RAY_COUNT - 1) + BURST_DURATION;
  }

  /**
   * 结束波纹：参照 AndroidX 实现，提前释放时立即呈现完整不透明度，
   * 并等到进入动画时长结束后才开始淡出。瞬时变体已自行消散，释放不打断播放。
   *
   * @returns {void}
   */
  finish() {
    if (this.exiting) {
      return;
    }

    if (this.transient && this.animated) {
      return;
    }

    this.exiting = true;

    const [opacityAnimation] = this.enterAnimations;

    if (opacityAnimation && opacityAnimation.playState !== 'finished') {
      try {
        opacityAnimation.finish();
      } catch {
        // 已取消的动画无法完成。
      }
    }

    const remaining = Math.max(0, RADIUS_DURATION - (Date.now() - this.startedAt));

    this.exitTimer = globalThis.setTimeout(() => {
      this.exitTimer = undefined;
      this.startExit();
    }, remaining);
  }

  /**
   * 新按压、失焦或禁用时立即结束波纹；瞬时变体直接移除，不等播放结束。
   *
   * @returns {void}
   */
  abort() {
    if (this.transient) {
      this.remove();
      return;
    }

    this.finish();
  }

  /** @returns {void} */
  startExit() {
    if (typeof this.element.animate === 'function') {
      const fadeOut = this.element.animate(
        [{ opacity: String(this.transient ? 1 : this.opacity) }, { opacity: '0' }],
        { duration: FADE_OUT_DURATION, easing: 'linear', fill: 'forwards' },
      );

      fadeOut.finished.then(
        () => this.remove(),
        () => this.remove(),
      );
    }

    this.exitTimer = globalThis.setTimeout(() => this.remove(), FADE_OUT_DURATION);
  }

  /** @returns {void} */
  remove() {
    if (this.removed) {
      return;
    }

    this.removed = true;

    if (this.exitTimer !== undefined) {
      globalThis.clearTimeout(this.exitTimer);
      this.exitTimer = undefined;
    }

    cancelAnimations(this.enterAnimations);
    this.element.remove();
    this.record.waves.delete(this);
  }
}

/**
 * 读取宿主解析后的按压状态层透明度，非法值回退默认值。
 *
 * @param {HTMLElement} element
 * @returns {number}
 */
function readPressedAlpha(element) {
  const value = Number.parseFloat(
    getComputedStyle(element).getPropertyValue(ALPHA_PROPERTY),
  );

  if (!Number.isFinite(value) || value < 0 || value > 1) {
    return DEFAULT_PRESSED_ALPHA;
  }

  return value;
}

/**
 * @param {HTMLElement} element
 * @param {PointerEvent} event
 * @returns {void}
 */
function handlePointerDown(element, event) {
  const record = records.get(element);

  if (!record || event.button !== 0 || isDisabled(element)) {
    return;
  }

  // 参照 AndroidX 实现：新按压会结束仍在展示中的旧涟漪；瞬时涟漪直接移除。
  record.waves.forEach((wave) => wave.abort());

  if (record.target) {
    // 目标元素可能随组件状态改变形状，每次按压前同步其圆角。
    record.container.style.borderRadius = getComputedStyle(record.target).borderRadius;
  }

  const rect = record.container.getBoundingClientRect();
  const originX = Number.isFinite(event.clientX) ? event.clientX - rect.left : rect.width / 2;
  const originY = Number.isFinite(event.clientY) ? event.clientY - rect.top : rect.height / 2;
  const wave = new RippleWave(record, readPressedAlpha(element));

  wave.place(record.container, originX, originY);
  record.container.append(wave.element);
  record.waves.add(wave);
  record.activePointers.set(event.pointerId, wave);
}

/**
 * @param {HTMLElement} element
 * @param {Record<string, unknown>} options 已读取的指令选项。
 * @returns {void}
 */
function mountRipple(element, options) {
  if (readDisabledOption(options)) {
    // 记录跳过状态，绑定更新取消 disabled 时按需挂载。
    records.set(element, createSkippedRecord());
    return;
  }

  if (!canContainLayer(element)) {
    warn(`<${element.tagName.toLowerCase()}> 无法容纳涟漪；指令已跳过。`);
    return;
  }

  nextAnchorId += 1;
  const anchorName = `--mat-ripple-${nextAnchorId}`;
  const target = readTargetOption(options.target) ?? null;
  const anchorElement = target ?? element;
  const container = document.createElement('span');
  container.className = 'mat-ripple';
  container.setAttribute('aria-hidden', 'true');
  container.style.setProperty('position-anchor', anchorName);
  container.style.color = readColorOption(options.color, warn);
  addAnchorName(anchorElement, anchorName);
  element.append(container);

  const record = {
    activePointers: new Map(),
    anchorElement,
    anchorName,
    container,
    observer: undefined,
    removeEventListeners: () => {},
    target,
    variant: readVariantOption(options.variant),
    waves: new Set(),
  };
  const pointerDown = (event) => handlePointerDown(element, event);
  const finishPointer = (event) => {
    const wave = record.activePointers.get(event.pointerId);

    if (wave) {
      record.activePointers.delete(event.pointerId);
      wave.finish();
    }
  };
  const finishAllPointers = () => {
    record.activePointers.forEach((wave) => wave.abort());
    record.activePointers.clear();
  };
  const observer = new MutationObserver(() => {
    if (isDisabled(element)) {
      finishAllPointers();
    }
  });
  record.observer = observer;
  records.set(element, record);
  element.addEventListener('pointerdown', pointerDown);
  window.addEventListener('pointerup', finishPointer);
  window.addEventListener('pointercancel', finishPointer);
  element.addEventListener('blur', finishAllPointers);
  element.addEventListener('lostpointercapture', finishAllPointers);
  observer.observe(element, {
    attributeFilter: ['aria-disabled', 'disabled'],
    attributes: true,
  });

  record.removeEventListeners = () => {
    element.removeEventListener('pointerdown', pointerDown);
    window.removeEventListener('pointerup', finishPointer);
    window.removeEventListener('pointercancel', finishPointer);
    element.removeEventListener('blur', finishAllPointers);
    element.removeEventListener('lostpointercapture', finishAllPointers);
  };
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function unmountRipple(element) {
  const record = records.get(element);

  if (!record) {
    return;
  }

  if (record.container) {
    record.activePointers.clear();
    record.waves.forEach((wave) => wave.remove());
    record.removeEventListeners();
    record.observer.disconnect();
    record.container.remove();
    removeAnchorName(record.anchorElement, record.anchorName);
  }

  records.delete(element);
}

/** @type {import('vue').ObjectDirective<HTMLElement, RippleOptions | undefined>} */
const Ripple = {
  mounted(element, binding) {
    mountRipple(element, readObjectOptions(binding.value, OPTION_KEYS, warn));
  },
  updated(element, binding) {
    const record = records.get(element);

    if (!record) {
      return;
    }

    const options = readObjectOptions(binding.value, OPTION_KEYS, warn);

    if (record.container) {
      if (readDisabledOption(options)) {
        unmountRipple(element);
        records.set(element, createSkippedRecord());
        return;
      }

      if (record.target !== (readTargetOption(options.target) ?? null)) {
        unmountRipple(element);
        mountRipple(element, options);
        return;
      }

      record.container.style.color = readColorOption(options.color, warn);
      record.variant = readVariantOption(options.variant);

      return;
    }

    if (!readDisabledOption(options)) {
      mountRipple(element, options);
    }
  },
  unmounted: unmountRipple,
};

export { Ripple, RIPPLE_VARIANTS };
export default Ripple;
