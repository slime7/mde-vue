import { describe, expect, it } from 'vitest';
import { getTooltipPosition } from '../src/components/tooltip-position';

const targetRect = {
  bottom: 120,
  height: 20,
  left: 100,
  right: 140,
  top: 100,
  width: 40,
};
const tooltipRect = {
  height: 10,
  width: 20,
};

describe('Tooltip 定位', () => {
  it.each([
    ['top', 110, 86],
    ['top-start', 100, 86],
    ['top-end', 120, 86],
    ['right', 144, 105],
    ['right-start', 144, 100],
    ['right-end', 144, 110],
    ['bottom', 110, 124],
    ['bottom-start', 100, 124],
    ['bottom-end', 120, 124],
    ['left', 76, 105],
    ['left-start', 76, 100],
    ['left-end', 76, 110],
  ])('%s 按目标边界和对齐方式计算坐标', (location, left, top) => {
    expect(getTooltipPosition({
      location,
      targetRect,
      tooltipRect,
      viewport: { height: 600, width: 800 },
    })).toMatchObject({
      left,
      location,
      top,
    });
  });

  it('主轴空间不足时翻转到对侧，并将坐标限制在视口安全边距内', () => {
    const position = getTooltipPosition({
      location: 'top-start',
      targetRect: {
        bottom: 25,
        height: 20,
        left: -40,
        right: 0,
        top: 5,
        width: 40,
      },
      tooltipRect: {
        height: 30,
        width: 100,
      },
      viewport: { height: 200, width: 200 },
    });

    expect(position).toMatchObject({
      left: 8,
      location: 'bottom-start',
      top: 29,
    });
  });

  it('首选位置被 Toolbar 占用时换到不重叠的方向', () => {
    const position = getTooltipPosition({
      avoidRects: [{
        bottom: 600,
        height: 110,
        left: 0,
        right: 800,
        top: 490,
        width: 800,
      }],
      location: 'bottom',
      targetRect: {
        bottom: 480,
        height: 20,
        left: 380,
        right: 420,
        top: 460,
        width: 40,
      },
      tooltipRect,
      viewport: { height: 600, width: 800 },
    });

    expect(position).toMatchObject({
      location: 'top',
      top: 446,
    });
  });

  it('可以避让垂直 Toolbar', () => {
    const position = getTooltipPosition({
      avoidRects: [{
        bottom: 600,
        height: 600,
        left: 0,
        right: 80,
        top: 0,
        width: 80,
      }],
      location: 'left',
      targetRect: {
        bottom: 320,
        height: 20,
        left: 84,
        right: 124,
        top: 300,
        width: 40,
      },
      tooltipRect,
      viewport: { height: 600, width: 800 },
    });

    expect(position.location).not.toBe('left');
    expect(position.left).toBeGreaterThanOrEqual(8);
  });
});
