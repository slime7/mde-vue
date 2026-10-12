import { describe, expect, it } from 'vitest';
import { getGridListCornerShapes } from '../../src/components/mat-grid-list/grid-list-corners';

describe('getGridListCornerShapes', () => {
  it('空网格没有任何项目圆角', () => {
    expect(getGridListCornerShapes(0, 2)).toEqual([]);
  });

  it('单独一项时四角全部使用大圆角', () => {
    expect(getGridListCornerShapes(1, 3)).toEqual([
      {
        startStart: true, startEnd: true, endStart: true, endEnd: true,
      },
    ]);
  });

  it('完整网格只有四个外角使用大圆角', () => {
    expect(getGridListCornerShapes(6, 3)).toEqual([
      {
        startStart: true, startEnd: false, endStart: false, endEnd: false,
      },
      {
        startStart: false, startEnd: false, endStart: false, endEnd: false,
      },
      {
        startStart: false, startEnd: true, endStart: false, endEnd: false,
      },
      {
        startStart: false, startEnd: false, endStart: true, endEnd: false,
      },
      {
        startStart: false, startEnd: false, endStart: false, endEnd: false,
      },
      {
        startStart: false, startEnd: false, endStart: false, endEnd: true,
      },
    ]);
  });

  it('缺行末行的大圆角跟随真实相邻关系而不是行完整性', () => {
    /* 5 个项目、3 列：第 3 项的下、右方向都没有相邻项目，
       它和末项的外露角都要使用大圆角。 */
    const shapes = getGridListCornerShapes(5, 3);

    expect(shapes[0]).toEqual({
      startStart: true, startEnd: false, endStart: false, endEnd: false,
    });
    expect(shapes[1]).toEqual({
      startStart: false, startEnd: false, endStart: false, endEnd: false,
    });
    expect(shapes[2]).toEqual({
      startStart: false, startEnd: true, endStart: false, endEnd: true,
    });
    expect(shapes[3]).toEqual({
      startStart: false, startEnd: false, endStart: true, endEnd: false,
    });
    expect(shapes[4]).toEqual({
      startStart: false, startEnd: false, endStart: false, endEnd: true,
    });
  });

  it('中段行末列项目在下、右方向都没有相邻项目时使用大圆角', () => {
    const shapes = getGridListCornerShapes(7, 3);

    expect(shapes[3]).toEqual({
      startStart: false, startEnd: false, endStart: false, endEnd: false,
    });
    expect(shapes[4]).toEqual({
      startStart: false, startEnd: false, endStart: false, endEnd: false,
    });
    expect(shapes[5]).toEqual({
      startStart: false, startEnd: false, endStart: false, endEnd: true,
    });
    expect(shapes[6]).toEqual({
      startStart: false, startEnd: false, endStart: true, endEnd: true,
    });
  });

  it('单行网格首尾项目的左右外角都是大圆角', () => {
    const shapes = getGridListCornerShapes(4, 4);

    expect(shapes[0]).toEqual({
      startStart: true, startEnd: false, endStart: true, endEnd: false,
    });
    expect(shapes[1]).toEqual({
      startStart: false, startEnd: false, endStart: false, endEnd: false,
    });
    expect(shapes[2]).toEqual({
      startStart: false, startEnd: false, endStart: false, endEnd: false,
    });
    expect(shapes[3]).toEqual({
      startStart: false, startEnd: true, endStart: false, endEnd: true,
    });
  });

  it('单列网格的圆角与纵向分段列表一致', () => {
    const shapes = getGridListCornerShapes(2, 1);

    expect(shapes[0]).toEqual({
      startStart: true, startEnd: true, endStart: false, endEnd: false,
    });
    expect(shapes[1]).toEqual({
      startStart: false, startEnd: false, endStart: true, endEnd: true,
    });
  });

  it('非法列数时按单列回退，不抛出错误', () => {
    expect(getGridListCornerShapes(2, 0)).toEqual([
      {
        startStart: true, startEnd: true, endStart: false, endEnd: false,
      },
      {
        startStart: false, startEnd: false, endStart: true, endEnd: true,
      },
    ]);
    expect(getGridListCornerShapes(1, Number.NaN)).toEqual([
      {
        startStart: true, startEnd: true, endStart: true, endEnd: true,
      },
    ]);
  });
});
