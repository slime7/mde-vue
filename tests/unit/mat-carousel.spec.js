import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { MatCarousel, MatCarouselItem } from '../../src';

const CAROUSEL_VARIANTS = [
  'multi-browse',
  'uncontained',
  'uncontained-multi-aspect',
  'hero',
  'hero-center-aligned',
  'full-screen',
];

const SCROLLER_RECT = {
  left: 0,
  right: 800,
  top: 0,
  bottom: 300,
  width: 800,
  height: 300,
};

function stubRequestAnimationFrame() {
  vi.stubGlobal('requestAnimationFrame', (callback) => {
    callback(Date.now());
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', () => {});
}

function stubScrollerRect(width = 800) {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mock() {
    if (this.classList?.contains('mat-carousel__scroller')) {
      return {
        ...SCROLLER_RECT,
        width,
        right: width,
      };
    }

    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    };
  });
}

/**
 * 吸附过渡动画改由脚本逐帧驱动，同步执行的 rAF 桩会让动画在同帧内
 * 死循环；改为可手动推进的帧队列，配合可控时钟逐帧校验滚动位置。
 *
 * @returns {{frames: Function[], clock: {now: number}}}
 */
function stubSettleFrames() {
  const frames = [];
  const clock = { now: 0 };

  vi.stubGlobal('requestAnimationFrame', (callback) => {
    frames.push(callback);
    return frames.length;
  });
  vi.stubGlobal('cancelAnimationFrame', () => {});
  vi.stubGlobal('performance', { now: () => clock.now });

  return { frames, clock };
}

let mountedWrappers = [];

afterEach(() => {
  mountedWrappers.forEach((wrapper) => wrapper.unmount());
  mountedWrappers = [];
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

/**
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 * @returns {{ scroller: import('@vue/test-utils').DOMWrapper<Element>, items: import('@vue/test-utils').DOMWrapper<Element>[], canvas: import('@vue/test-utils').DOMWrapper<Element>, marks: import('@vue/test-utils').DOMWrapper<Element>[] }}
 */
function queryParts(wrapper) {
  return {
    scroller: wrapper.find('.mat-carousel__scroller'),
    items: wrapper.findAll('.mat-carousel-item'),
    canvas: wrapper.find('.mat-carousel__canvas'),
    marks: wrapper.findAll('.mat-carousel__snap-mark'),
  };
}

describe('MatCarousel', () => {
  it('variant 默认 multi-browse 且只接受官方六种布局', () => {
    expect(MatCarousel.props.variant.default).toBe('multi-browse');

    CAROUSEL_VARIANTS.forEach((variant) => {
      expect(MatCarousel.props.variant.validator(variant)).toBe(true);
    });
    expect(MatCarousel.props.variant.validator('grid')).toBe(false);
  });

  it('挂载后无需滚动事件即完成初始布局', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { items, scroller } = queryParts(wrapper);
    const targetWidth = (800 - 32) / 2;

    /* 稳态：停靠项在前缘展开为目标宽，trailing 侧为一个中等宽度填充
       （medium 目标宽随大项缩放、数量按剩余空间自适应），末项以最小
       预览收尾（画布坐标含滚动容器的前导 16px 内边距换算）。 */
    expect(items[0].element.style.inlineSize).toBe(`${targetWidth}px`);
    expect(items[1].element.style.inlineSize).toBe('312px');
    expect(items[2].element.style.inlineSize).toBe('56px');
    expect(items[0].element.style.insetInlineStart).toBe('0px');
    expect(items[1].element.style.insetInlineStart).toBe('392px');
    expect(items[2].element.style.insetInlineStart).toBe('712px');
    /* 画布宽度止于最后一个停靠标记：两格大项槽距加一屏内宽。 */
    expect(scroller.element.style.getPropertyValue('--mat-carousel-canvas-size')).toBe('1568px');
    await nextTick();
    const marks = wrapper.findAll('.mat-carousel__snap-mark');
    expect(marks).toHaveLength(3);
    expect(marks.map((mark) => mark.element.style.insetInlineStart)).toEqual(['0px', '392px', '784px']);
  });

  it('停靠位置是滚动位置的纯函数，每个停靠位恰好展开一项', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);
    const targetWidth = (800 - 32) / 2;

    scroller.element.scrollLeft = 392;
    await scroller.trigger('scroll');
    await nextTick();

    /* 稳态布局：历史项收缩为最小预览贴前缘，停靠项随后展开，
       下一项以贴右缘的最小预览收尾。 */
    expect(items[0].element.style.inlineSize).toBe('56px');
    expect(items[1].element.style.inlineSize).toBe(`${targetWidth}px`);
    expect(items[2].element.style.inlineSize).toBe('56px');
    expect(items[0].element.style.insetInlineStart).toBe('392px');
    expect(items[1].element.style.insetInlineStart).toBe('456px');
    expect(items[2].element.style.insetInlineStart).toBe('1104px');
  });

  it('多项目轮播始终按顺序展示相邻项，末端项目不在前列停靠位提前出现', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: '0.svg', alt: '第0项' }),
          h(MatCarouselItem, { src: '1.svg', alt: '第1项' }),
          h(MatCarouselItem, { src: '2.svg', alt: '第2项' }),
          h(MatCarouselItem, { src: '3.svg', alt: '第3项' }),
          h(MatCarouselItem, { src: '4.svg', alt: '第4项' }),
          h(MatCarouselItem, { src: '5.svg', alt: '第5项' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);
    const targetWidth = (800 - 32) / 2;

    // 初始位置（cell 0）：可见项应严格为 0、1、2，末端项目 3、4、5 宽度为 0
    expect(items[0].element.style.inlineSize).toBe(`${targetWidth}px`);
    expect(items[1].element.style.inlineSize).toBe('312px');
    expect(items[2].element.style.inlineSize).toBe('56px');
    expect(items[3].element.style.inlineSize).toBe('0px');
    expect(items[4].element.style.inlineSize).toBe('0px');
    expect(items[5].element.style.inlineSize).toBe('0px');

    // 滚动到第 1 槽位（cell 1）：可见项严格为 0（前导预览）、1（大项）、2（中项）、3（末端预览）
    scroller.element.scrollLeft = 392;
    await scroller.trigger('scroll');
    await nextTick();

    expect(items[0].element.style.inlineSize).toBe('56px');
    expect(items[1].element.style.inlineSize).toBe(`${targetWidth}px`);
    expect(items[2].element.style.inlineSize).toBe('248px');
    expect(items[3].element.style.inlineSize).toBe('56px');
    expect(items[4].element.style.inlineSize).toBe('0px');
    expect(items[5].element.style.inlineSize).toBe('0px');
  });

  it('最后一个停靠位与起始位镜像，主项贴右缘并保留边距', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);

    /* 第三个项目的停靠位是大项槽距的第二格。 */
    scroller.element.scrollLeft = 784;
    await scroller.trigger('scroll');
    await nextTick();

    /* 末端停靠位镜像起始位：主项保持目标宽度贴右缘并保留 16px 边距，
       前导侧最外缘为 56px 最小预览，中间由中等宽度项目向右填满。 */
    expect(items[0].element.style.inlineSize).toBe('56px');
    expect(items[0].element.style.insetInlineStart).toBe('784px');
    expect(items[1].element.style.inlineSize).toBe('312px');
    expect(items[1].element.style.insetInlineStart).toBe('848px');
    expect(items[2].element.style.inlineSize).toBe(`${(800 - 32) / 2}px`);
    expect(items[2].element.style.insetInlineStart).toBe('1168px');
  });

  it('hero-center-aligned 每个停靠位只有头尾过渡位，停靠项居中', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      props: { variant: 'hero-center-aligned' },
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);

    await scroller.trigger('scroll');
    await nextTick();

    /* 首个停靠位：项目居中（中心对齐视口中心 400px），右侧按小项视距排开。 */
    expect(items[0].element.style.inlineSize).toBe('640px');
    expect(items[0].element.style.insetInlineStart).toBe('64px');
    expect(items[1].element.style.inlineSize).toBe('56px');
    expect(items[1].element.style.insetInlineStart).toBe('712px');
    /* 预览位之外的项目零宽隐藏：官方居中布局只保留两侧各一个预览。 */
    expect(items[2].element.style.inlineSize).toBe('0px');

    scroller.element.scrollLeft = 648;
    await scroller.trigger('scroll');
    await nextTick();

    /* 第二个停靠位：停靠项保持居中，前一项在左缘露出小项预览。 */
    expect(items[0].element.style.inlineSize).toBe('56px');
    expect(items[0].element.style.insetInlineStart).toBe('648px');
    expect(items[1].element.style.inlineSize).toBe('640px');
    expect(items[1].element.style.insetInlineStart).toBe('712px');
    expect(items[2].element.style.inlineSize).toBe('56px');
    expect(items[2].element.style.insetInlineStart).toBe('1360px');
    /* 停靠项中心位于视口中心：712 + 16 - 648 + 320。 */
    expect(Number.parseFloat(items[1].element.style.insetInlineStart) - 632 + 320).toBe(400);
    /* 画布宽度止于最后一个居中停靠标记：两格大项槽距加一屏内宽。 */
    expect(scroller.element.style.getPropertyValue('--mat-carousel-canvas-size')).toBe('2080px');
  });

  it('目标宽度超过容器内宽时滚动范围仍止于最后停靠位', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张', width: 1200 }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张', width: 1200 }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张', width: 1200 }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);

    /* 画布随超大目标宽度按槽距扩张：最后一个停靠标记 + 一屏内宽。 */
    expect(scroller.element.style.getPropertyValue('--mat-carousel-canvas-size')).toBe('3200px');

    scroller.element.scrollLeft = 2416;
    await scroller.trigger('scroll');
    await nextTick();

    /* 末端镜像停靠：主项超出视口宽度的部分向左延伸，右缘恰好贴合
       视口末端并保留 16px 边距，不裁剪；空间不足以容纳中等填充时
       其余项目零宽隐藏。 */
    expect(items[1].element.style.inlineSize).toBe('56px');
    expect(items[1].element.style.insetInlineStart).toBe('1920px');
    expect(items[2].element.style.inlineSize).toBe('1200px');
    expect(items[2].element.style.insetInlineStart).toBe('1984px');
  });

  it('hero-center-aligned 过渡帧可见项目保持连续排布，不出现游离项目', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      props: { variant: 'hero-center-aligned' },
      slots: {
        default: [
          'a', 'b', 'c', 'd', 'e', 'f',
        ].map((name) => h(MatCarouselItem, { src: `${name}.svg`, alt: name })),
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);

    /* 覆盖每个相邻停靠位之间的中间帧：可见项目必须连成一条间距
       恰为项目间距的链，插值是两套无重叠排布的凸组合，不允许重叠
       或断链。 */
    const framesToCheck = [162, 486, 810, 1134];

    /* 逐帧串行驱动滚动，收集每个中间帧的可见项目排布。 */
    const framesPlaced = await framesToCheck.reduce(async (chain, position) => {
      const collected = await chain;

      scroller.element.scrollLeft = position;
      await scroller.trigger('scroll');
      await nextTick();

      collected[position] = items
        .map((item) => ({
          start: Number.parseFloat(item.element.style.insetInlineStart),
          width: Number.parseFloat(item.element.style.inlineSize),
        }))
        .filter((item) => Number.isFinite(item.start) && item.width > 0);

      return collected;
    }, Promise.resolve({}));

    framesToCheck.forEach((position) => {
      const placed = framesPlaced[position];

      expect(placed.length, `滚动 ${position} 可见项目数`).toBeGreaterThanOrEqual(3);

      for (let index = 1; index < placed.length; index += 1) {
        const previous = placed[index - 1];
        const current = placed[index];
        const spacing = current.start - (previous.start + previous.width);

        /* 常规项目保持一个项目间距；两套关键线各自有序无重叠，凸组合
           保证中间帧间隙全程非负，不允许重叠或断链。 */
        expect(spacing, `滚动 ${position} 项目 ${index} 间距`).toBeGreaterThanOrEqual(-0.5);
        expect(spacing, `滚动 ${position} 项目 ${index} 间距`).toBeLessThanOrEqual(8.5);
      }
    });
  });

  it('项目全部展开仍填不满容器时整体全展开', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);
    const targetWidth = (800 - 32) / 2;

    /* 两个项目按目标宽加间距共 776px，小于容器内宽 784px，整体全展开。 */
    scroller.element.scrollLeft = 64;
    await scroller.trigger('scroll');
    await nextTick();

    expect(items[0].element.style.inlineSize).toBe(`${targetWidth}px`);
    expect(items[1].element.style.inlineSize).toBe(`${targetWidth}px`);
    expect(items[0].element.style.insetInlineStart).toBe('0px');
    expect(items[1].element.style.insetInlineStart).toBe('392px');
  });

  it('项目按停靠距离插值取景窗口，铺满项目框', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);

    await scroller.trigger('scroll');
    await nextTick();

    expect(items[0].element.style.getPropertyValue('--mat-carousel-object-position')).toBe('50% 50%');
    expect(items[1].element.style.getPropertyValue('--mat-carousel-object-position')).toBe('100% 50%');
  });

  it('宽屏下默认目标宽度封顶以容纳更多项目', () => {
    stubRequestAnimationFrame();
    stubScrollerRect(1600);
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { items } = queryParts(wrapper);

    expect(items[0].element.style.inlineSize).toBe('560px');
  });

  it('full-screen 不写项目内联宽度，由容器铺满', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      props: { variant: 'full-screen' },
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);
    vi.spyOn(items[0].element, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      height: 300,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
    });
    vi.spyOn(items[1].element, 'getBoundingClientRect').mockReturnValue({
      top: 300,
      height: 300,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
    });

    await scroller.trigger('scroll');
    await nextTick();

    items.forEach((item) => {
      expect(item.element.style.inlineSize).toBe('');
      expect(item.element.style.getPropertyValue('--mat-carousel-object-position')).toMatch(/^50% \d+(\.\d+)?%$/);
    });
  });

  it('uncontained 布局项目为等宽且不随距离变形', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      props: { variant: 'uncontained' },
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);
    const itemWidth = 720;

    scroller.element.scrollLeft = 1464;
    await scroller.trigger('scroll');
    await nextTick();

    expect(items[0].element.style.inlineSize).toBe(`${itemWidth}px`);
    expect(items[1].element.style.inlineSize).toBe(`${itemWidth}px`);
  });

  it('uncontained 画布在内容末尾延伸边距宽度', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      props: { variant: 'uncontained' },
      slots: {
        default: [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller } = queryParts(wrapper);

    /* 两个 560px 项目加间距共 1128px，画布再延伸 16px：滚动到末端时
       最后一个项目距容器右缘保留一个边距，而不是贴死右缘。 */
    expect(scroller.element.style.getPropertyValue('--mat-carousel-canvas-size')).toBe('1464px');
  });

  it('item 的 aspectRatio 写入根元素供 multi-aspect 使用', () => {
    const wrapper = mount(MatCarousel, {
      props: { variant: 'uncontained-multi-aspect' },
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '横图', aspectRatio: '16/9' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const item = wrapper.findComponent(MatCarouselItem);
    expect(item.attributes('style')).toContain('aspect-ratio');
  });

  it('src 与 alt 转发给内部图片，未消费属性落到项目根元素', () => {
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '风景图', 'data-index': '0' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const item = wrapper.findComponent(MatCarouselItem);
    const img = item.find('img');

    expect(img.attributes('src')).toBe('a.svg');
    expect(img.attributes('alt')).toBe('风景图');
    expect(item.attributes('data-index')).toBe('0');
  });

  it('item 默认插槽渲染为图片上方的内容层', () => {
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '风景图' }, { default: () => '西湖落日' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const item = wrapper.findComponent(MatCarouselItem);

    expect(item.find('.mat-carousel-item__content').text()).toBe('西湖落日');
  });

  it('item 未提供默认插槽时不渲染内容层', () => {
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '风景图' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    expect(wrapper.find('.mat-carousel-item__content').exists()).toBe(false);
  });
});

describe('MatCarousel 交互', () => {
  /**
   * VTU 的 trigger 无法覆盖 clientX 等只读事件属性，改用原生事件对象派发。
   *
   * @param {Element} element
   * @param {string} type
   * @param {Record<string, unknown>} properties
   */
  function firePointer(element, type, properties) {
    const event = new MouseEvent(type, { bubbles: true, cancelable: true });

    Object.entries(properties).forEach(([name, value]) => {
      Object.defineProperty(event, name, { value });
    });
    element.dispatchEvent(event);
  }

  it('点击未展开的项目逐帧滚动到它的停靠位', async () => {
    const { frames, clock } = stubSettleFrames();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      props: { switchOnClick: true },
      slots: {
        default: [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const scroller = wrapper.find('.mat-carousel__scroller');
    let scrollPosition = 0;
    Object.defineProperty(scroller.element, 'scrollLeft', {
      get() {
        return scrollPosition;
      },
      set(value) {
        scrollPosition = value;
      },
      configurable: true,
    });

    /* 先排空挂载期间排队的布局帧，动画首帧才能在时钟起点附近执行。 */
    while (frames.length > 0) {
      frames.shift()(clock.now);
    }

    await wrapper.findAll('.mat-carousel-item')[2].trigger('click');

    /* 过渡从当前位置出发逐帧推进到停靠位，而不是一帧跳变。 */
    const seen = [];

    while (frames.length > 0) {
      clock.now += 64;
      frames.shift()(clock.now);
      seen.push(Math.round(scrollPosition));
    }

    expect(seen[seen.length - 1]).toBe(784);
    expect(seen.some((value) => value > 0 && value < 784)).toBe(true);
    expect(scroller.classes()).not.toContain('mat-carousel__scroller--dragging');
  });

  it('switch-on-click 默认为 false，点击项目不触发滚动切换', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const scroller = wrapper.find('.mat-carousel__scroller');
    let scrollPosition = 0;
    Object.defineProperty(scroller.element, 'scrollLeft', {
      get() {
        return scrollPosition;
      },
      set(value) {
        scrollPosition = value;
      },
      configurable: true,
    });

    await wrapper.findAll('.mat-carousel-item')[2].trigger('click');
    expect(scrollPosition).toBe(0);
  });

  it('方向键按一个停靠位滚动', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const scrollBySpy = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollBy', {
      value: scrollBySpy,
      configurable: true,
    });
    const wrapper = mount(MatCarousel, {
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    try {
      const scroller = wrapper.find('.mat-carousel__scroller');

      await scroller.trigger('keydown', { key: 'ArrowRight' });

      expect(scrollBySpy).toHaveBeenCalledWith({ left: 392, behavior: 'smooth' });

      await scroller.trigger('keydown', { key: 'ArrowLeft' });

      expect(scrollBySpy).toHaveBeenLastCalledWith({ left: -392, behavior: 'smooth' });
    } finally {
      delete Element.prototype.scrollBy;
    }
  });

  it('鼠标拖拽驱动横向滚动并在释放后逐帧吸附停靠位', async () => {
    const { frames, clock } = stubSettleFrames();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const scroller = wrapper.find('.mat-carousel__scroller');
    let draggedScroll = 0;
    Object.defineProperty(scroller.element, 'scrollLeft', {
      get() {
        return draggedScroll;
      },
      set(value) {
        draggedScroll = value;
      },
      configurable: true,
    });

    /* 先排空挂载期间排队的布局帧，动画首帧才能在时钟起点附近执行。 */
    while (frames.length > 0) {
      frames.shift()(clock.now);
    }

    firePointer(scroller.element, 'pointerdown', {
      pointerId: 1,
      pointerType: 'mouse',
      button: 0,
      clientX: 400,
    });
    firePointer(scroller.element, 'pointermove', {
      pointerId: 1,
      pointerType: 'mouse',
      clientX: 100,
    });

    expect(scroller.element.scrollLeft).toBe(300);
    expect(scroller.classes()).toContain('mat-carousel__scroller--dragging');

    firePointer(scroller.element, 'pointerup', {
      pointerId: 1,
      pointerType: 'mouse',
    });

    expect(scroller.classes()).not.toContain('mat-carousel__scroller--dragging');

    /* 释放后从松手位置逐帧吸附到最近的停靠位 392，中间帧不跳变。 */
    const seen = [];

    while (frames.length > 0) {
      clock.now += 64;
      frames.shift()(clock.now);
      seen.push(Math.round(draggedScroll));
    }

    expect(seen[seen.length - 1]).toBe(392);
    expect(seen.some((value) => value > 300 && value < 392)).toBe(true);
  });

  it('释放吸附的时长随松手速度衔接，慢速松手起步更温和', async () => {
    const { frames, clock } = stubSettleFrames();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const scroller = wrapper.find('.mat-carousel__scroller');
    let draggedScroll = 0;
    Object.defineProperty(scroller.element, 'scrollLeft', {
      get() {
        return draggedScroll;
      },
      set(value) {
        draggedScroll = value;
      },
      configurable: true,
    });

    /* 先排空挂载期间排队的布局帧。 */
    while (frames.length > 0) {
      frames.shift()(clock.now);
    }

    /**
     * 按给定采样间隔拖到给定位置并松手，逐帧记录吸附过程。
     *
     * @param {number} stepMs 相邻采样点的毫秒间隔
     * @param {number[]} positions 各采样点的 clientX
     * @returns {number[]}
     */
    const dragAndRelease = (stepMs, positions) => {
      firePointer(scroller.element, 'pointerdown', {
        pointerId: 1,
        pointerType: 'mouse',
        button: 0,
        clientX: 400,
      });
      positions.forEach((clientX) => {
        clock.now += stepMs;
        firePointer(scroller.element, 'pointermove', {
          pointerId: 1,
          pointerType: 'mouse',
          clientX,
        });
      });
      firePointer(scroller.element, 'pointerup', {
        pointerId: 1,
        pointerType: 'mouse',
      });

      const seen = [];

      while (frames.length > 0) {
        clock.now += 64;
        frames.shift()(clock.now);
        seen.push(Math.round(draggedScroll));
      }

      return seen;
    };

    /* 约 1100px/s 慢速拖过半程松手：起步速度贴合松手速度，过渡更长更温和。 */
    const slowRelease = dragAndRelease(200, [390, 380, 160]);
    /* 约 5000px/s 快速轻扫松手：快速翻页，过渡短。 */
    const fastRelease = dragAndRelease(16, [390, 300, 160]);

    expect(slowRelease[slowRelease.length - 1]).toBe(392);
    expect(fastRelease[fastRelease.length - 1]).toBe(784);
    expect(slowRelease.length).toBeGreaterThan(fastRelease.length);
    expect(slowRelease[0] - 240).toBeLessThan(fastRelease[0] - 632);
  });

  it('触摸拖拽同样逐像素跟手滚动', async () => {
    const { frames, clock } = stubSettleFrames();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const scroller = wrapper.find('.mat-carousel__scroller');
    let draggedScroll = 0;
    Object.defineProperty(scroller.element, 'scrollLeft', {
      get() {
        return draggedScroll;
      },
      set(value) {
        draggedScroll = value;
      },
      configurable: true,
    });

    /* 先排空挂载期间排队的布局帧，动画首帧才能在时钟起点附近执行。 */
    while (frames.length > 0) {
      frames.shift()(clock.now);
    }

    firePointer(scroller.element, 'pointerdown', {
      pointerId: 2,
      pointerType: 'touch',
      button: 0,
      clientX: 400,
    });
    firePointer(scroller.element, 'pointermove', {
      pointerId: 2,
      pointerType: 'touch',
      clientX: 100,
    });

    expect(scroller.element.scrollLeft).toBe(300);
    expect(scroller.classes()).toContain('mat-carousel__scroller--dragging');

    firePointer(scroller.element, 'pointerup', {
      pointerId: 2,
      pointerType: 'touch',
    });

    expect(scroller.classes()).not.toContain('mat-carousel__scroller--dragging');

    /* 释放后吸附到最近的停靠位 392。 */
    while (frames.length > 0) {
      clock.now += 64;
      frames.shift()(clock.now);
    }

    expect(scroller.element.scrollLeft).toBe(392);
  });

  it('横向滚轮逐像素跟手，停止后吸附最近停靠位', async () => {
    vi.useFakeTimers();
    const { frames, clock } = stubSettleFrames();
    stubScrollerRect();
    const wrapper = mount(MatCarousel, {
      slots: {
        default: [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
          h(MatCarouselItem, { src: 'c.svg', alt: '第三张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    const scroller = wrapper.find('.mat-carousel__scroller');
    /* 可滚动前提：滚轮只在内容超出视口时接管。 */
    Object.defineProperty(scroller.element, 'scrollWidth', {
      value: 1568,
      configurable: true,
    });
    Object.defineProperty(scroller.element, 'clientWidth', {
      value: 800,
      configurable: true,
    });
    let scrollPosition = 0;
    Object.defineProperty(scroller.element, 'scrollLeft', {
      get() {
        return scrollPosition;
      },
      set(value) {
        scrollPosition = value;
      },
      configurable: true,
    });

    /**
     * @param {number} deltaX
     * @param {number} deltaY
     */
    function fireWheel(deltaX, deltaY = 0) {
      const event = new Event('wheel', { bubbles: true, cancelable: true });

      Object.defineProperty(event, 'deltaX', { value: deltaX });
      Object.defineProperty(event, 'deltaY', { value: deltaY });
      scroller.element.dispatchEvent(event);
    }

    fireWheel(100);

    expect(scrollPosition).toBe(100);
    expect(scroller.classes()).toContain('mat-carousel__scroller--dragging');

    fireWheel(200);

    expect(scrollPosition).toBe(300);

    /* 以纵向分量为主的滚轮不拦截，滚动位置保持不变。 */
    fireWheel(0, 120);

    expect(scrollPosition).toBe(300);

    /* 停止滚轮输入后吸附到最近的停靠标记 392。 */
    vi.advanceTimersByTime(200);

    expect(scroller.classes()).not.toContain('mat-carousel__scroller--dragging');

    /* 吸附动画逐帧驱动：清空队列后停在标记上。 */
    while (frames.length > 0) {
      clock.now += 64;
      frames.shift()(clock.now);
    }

    expect(scrollPosition).toBe(392);
    vi.useRealTimers();
  });

  it('full-screen 布局不响应鼠标拖拽与横向键盘滚动', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect();
    const scrollBySpy = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollBy', {
      value: scrollBySpy,
      configurable: true,
    });
    const wrapper = mount(MatCarousel, {
      props: { variant: 'full-screen' },
      slots: {
        default: () => [
          h(MatCarouselItem, { src: 'a.svg', alt: '第一张' }),
          h(MatCarouselItem, { src: 'b.svg', alt: '第二张' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);

    try {
      const scroller = wrapper.find('.mat-carousel__scroller');

      firePointer(scroller.element, 'pointerdown', {
        pointerId: 1,
        pointerType: 'mouse',
        button: 0,
        clientX: 400,
      });
      firePointer(scroller.element, 'pointermove', {
        pointerId: 1,
        pointerType: 'mouse',
        clientX: 300,
      });
      await scroller.trigger('keydown', { key: 'ArrowRight' });

      expect(scrollBySpy).not.toHaveBeenCalled();
      expect(scroller.classes()).not.toContain('mat-carousel__scroller--dragging');
    } finally {
      delete Element.prototype.scrollBy;
    }
  });

  it('multi-browse 在容器宽度 680 下末端停靠项目连续且无断层间隙', async () => {
    stubRequestAnimationFrame();
    stubScrollerRect(680);
    const wrapper = mount(MatCarousel, {
      props: { variant: 'multi-browse' },
      slots: {
        default: () => Array.from({ length: 10 }, (_, index) => (
          h(MatCarouselItem, { src: `${index}.svg`, alt: `图 ${index + 1}` })
        )),
      },
    });
    mountedWrappers.push(wrapper);

    const { scroller, items } = queryParts(wrapper);
    await nextTick();

    /* 滚动到倒数第二个大项展开位（对应 cell = 8）。 */
    const marks = wrapper.findAll('.mat-carousel__snap-mark');
    const penultimateOffset = parseFloat(marks[8].element.style.insetInlineStart);
    scroller.element.scrollLeft = penultimateOffset;
    await scroller.trigger('scroll');
    await nextTick();

    /* 提取所有可见项目（宽度大于 0），按从左到右排序并验证相邻间隙均为 8px。 */
    const visible = items
      .map((item) => ({
        left: parseFloat(item.element.style.insetInlineStart),
        width: parseFloat(item.element.style.inlineSize),
      }))
      .filter((item) => item.width > 0)
      .sort((a, b) => a.left - b.left);

    expect(visible.length).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < visible.length - 1; i += 1) {
      const gap = visible[i + 1].left - (visible[i].left + visible[i].width);
      expect(Math.abs(gap - 8)).toBeLessThanOrEqual(1);
    }
  });
});
