import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatImage } from '../src';

const SRC = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="9"/%3E';

describe('MatImage', () => {
  it('渲染根容器与内部 img，并把 src 和原生图片属性透传到 img', () => {
    const wrapper = mount(MatImage, {
      props: { src: SRC },
      attrs: {
        alt: '示例图片',
        loading: 'lazy',
        decoding: 'async',
        width: '640',
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    const img = wrapper.get('img');

    expect(img.attributes('src')).toBe(SRC);
    expect(img.attributes('alt')).toBe('示例图片');
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('decoding')).toBe('async');
    expect(img.attributes('width')).toBe('640');
  });

  it('class 与 style 落在根元素，其余原生属性和监听器落在 img', async () => {
    const onLoad = vi.fn();
    const wrapper = mount(MatImage, {
      props: { src: SRC },
      attrs: {
        class: 'consumer-root',
        style: 'inline-size: 240px',
        'data-test': 'image',
        onLoad,
      },
    });

    expect(wrapper.classes()).toContain('consumer-root');
    expect(wrapper.attributes('style')).toContain('inline-size: 240px');
    expect(wrapper.get('img').attributes('data-test')).toBe('image');
    expect(wrapper.get('img').classes()).not.toContain('consumer-root');

    await wrapper.get('img').trigger('load');
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('img-class 与 img-style 合并到 img', () => {
    const wrapper = mount(MatImage, {
      props: {
        src: SRC,
        imgClass: 'img-extra',
        imgStyle: { border: '1px solid red' },
      },
    });
    const img = wrapper.get('img');

    expect(img.classes()).toContain('img-extra');
    expect(img.attributes('style')).toContain('border: 1px solid red');
  });

  it('默认使用形状令牌圆角，radius 支持数字与 CSS 长度字符串', () => {
    const defaultWrapper = mount(MatImage, {
      props: { src: SRC },
    });

    expect(defaultWrapper.attributes('style'))
      .toContain('border-radius: var(--mat-sys-shape-corner-extra-large)');

    const numberWrapper = mount(MatImage, {
      props: { src: SRC, radius: 12 },
    });

    expect(numberWrapper.attributes('style')).toContain('border-radius: 12px');

    const stringWrapper = mount(MatImage, {
      props: { src: SRC, radius: '2rem' },
    });

    expect(stringWrapper.attributes('style')).toContain('border-radius: 2rem');
  });

  it('fit 默认 cover，并可切换 contain', () => {
    const coverWrapper = mount(MatImage, {
      props: { src: SRC },
    });

    expect(coverWrapper.get('img').attributes('style')).toContain('object-fit: cover');

    const containWrapper = mount(MatImage, {
      props: { src: SRC, fit: 'contain' },
    });

    expect(containWrapper.get('img').attributes('style')).toContain('object-fit: contain');
  });

  it('默认显示 outline 描边，outline=false 时关闭', () => {
    const outlinedWrapper = mount(MatImage, {
      props: { src: SRC },
    });

    expect(outlinedWrapper.attributes('style'))
      .toContain('outline: 1px solid var(--mat-sys-color-outline)');

    const plainWrapper = mount(MatImage, {
      props: { src: SRC, outline: false },
    });

    expect(plainWrapper.attributes('style')).not.toContain('outline');
  });

  it('aspect-ratio 支持数字与 CSS 字符串，未设置时保持自然比例', async () => {
    const naturalWrapper = mount(MatImage, {
      props: { src: SRC },
    });

    expect(naturalWrapper.attributes('style')).not.toContain('aspect-ratio');

    const ratioWrapper = mount(MatImage, {
      props: { src: SRC, aspectRatio: '16 / 9' },
    });

    expect(ratioWrapper.attributes('style')).toContain('aspect-ratio: 16 / 9');

    await ratioWrapper.setProps({ aspectRatio: 1.5 });
    expect(ratioWrapper.attributes('style')).toContain('aspect-ratio: 1.5');
  });

  it('校验公开属性的取值', () => {
    expect(MatImage.props.src.validator(undefined)).toBe(true);
    expect(MatImage.props.src.validator('a.png')).toBe(true);
    expect(MatImage.props.src.validator('')).toBe(false);

    expect(MatImage.props.radius.validator(undefined)).toBe(true);
    expect(MatImage.props.radius.validator(0)).toBe(true);
    expect(MatImage.props.radius.validator(12)).toBe(true);
    expect(MatImage.props.radius.validator('2rem')).toBe(true);
    expect(MatImage.props.radius.validator(-1)).toBe(false);
    expect(MatImage.props.radius.validator('')).toBe(false);

    expect(MatImage.props.aspectRatio.validator(undefined)).toBe(true);
    expect(MatImage.props.aspectRatio.validator('16 / 9')).toBe(true);
    expect(MatImage.props.aspectRatio.validator('auto')).toBe(true);
    expect(MatImage.props.aspectRatio.validator(1.5)).toBe(true);
    expect(MatImage.props.aspectRatio.validator(0)).toBe(false);
    expect(MatImage.props.aspectRatio.validator('')).toBe(false);

    expect(MatImage.props.fit.validator('cover')).toBe(true);
    expect(MatImage.props.fit.validator('contain')).toBe(true);
    expect(MatImage.props.fit.validator('fill')).toBe(false);
  });
});
