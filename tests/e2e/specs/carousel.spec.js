import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

/* 布局插值在滚动帧内一次递推完成，用例并行竞争帧预算会拖慢收敛，改为串行执行。 */
test.describe.configure({ mode: 'serial' });

const TARGET_WIDTH = (800 - 32) / 2;

test.describe('MatCarousel 滚动几何', () => {
  test('初始布局首个项目展开为目标宽度，其余为预览与中等填充', async ({ page }) => {
    await openScene(page, 'carousel');

    const metrics = await page.getByTestId('carousel').evaluate((carousel) => {
      const scroller = carousel.querySelector('.mat-carousel__scroller');
      const items = [...scroller.querySelectorAll(':scope > .mat-carousel__canvas > .mat-carousel-item')];

      return {
        widths: items.map((item) => Math.round(item.getBoundingClientRect().width)),
        scrollWidth: scroller.scrollWidth,
        clientWidth: scroller.clientWidth,
      };
    });

    expect(metrics.widths[0]).toBe(Math.round(TARGET_WIDTH));
    /* 主项 trailing 侧为中等宽度填充（medium 目标宽随大项缩放、数量按
       剩余空间自适应），放不下的项目零宽隐藏，末端保留一个贴右缘的
       最小预览位。800 容器下 384 主项 + 一个 312 中项 + 末端预览。 */
    expect(metrics.widths[1]).toBe(312);
    expect(metrics.widths[2]).toBe(56);
    expect(metrics.widths.slice(3).every((width) => width < 1)).toBe(true);
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
  });

  test('滚动到停靠位置后对应项目展开且内容总宽不变', async ({ page }) => {
    await openScene(page, 'carousel');

    const carousel = page.getByTestId('carousel');
    const before = await carousel.evaluate((element) => (
      element.querySelector('.mat-carousel__scroller').scrollWidth
    ));

    await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');

      scroller.scrollLeft = 392;
      scroller.dispatchEvent(new Event('scroll'));
    });

    const after = {};
    await expect.poll(async () => {
      Object.assign(after, await carousel.evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const items = [...scroller.querySelectorAll(':scope > .mat-carousel__canvas > .mat-carousel-item')];

        return {
          scrollWidth: scroller.scrollWidth,
          widths: items.map((item) => Math.round(item.getBoundingClientRect().width)),
        };
      }));

      return after.widths[1];
    }, { timeout: 10000 }).toBe(Math.round(TARGET_WIDTH));

    expect(after.widths[0]).toBe(56);
    expect(after.scrollWidth).toBe(before);
  });

  test('鼠标拖拽驱动横向滚动', async ({ page }) => {
    await openScene(page, 'carousel');

    const stage = page.getByTestId('carousel-stage');
    const box = await stage.boundingBox();
    const startY = box.y + box.height / 2;

    await page.mouse.move(box.x + 600, startY);
    await page.mouse.down();
    await page.mouse.move(box.x + 300, startY, { steps: 8 });
    await page.mouse.up();

    const after = {};
    /* 等待释放后的吸附动画停靠到标记位，再校验布局。 */
    await expect.poll(async () => {
      Object.assign(after, await page.getByTestId('carousel').evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const items = [...scroller.querySelectorAll(':scope > .mat-carousel__canvas > .mat-carousel-item')];

        return {
          scrollLeft: Math.round(scroller.scrollLeft),
          widths: items.map((item) => Math.round(item.getBoundingClientRect().width)),
        };
      }));

      return after.scrollLeft;
    }, { timeout: 5000 }).toBe(392);

    expect(after.widths[1]).toBe(Math.round(TARGET_WIDTH));
  });

  test('点击未展开的项目展开并停靠到它', async ({ page }) => {
    await openScene(page, 'carousel');

    const carousel = page.getByTestId('carousel');

    /* 起始停靠位上 trailing 侧可见的下一项是中等宽度填充，点击它
       前进一个停靠位。 */
    await carousel.locator(':scope > .mat-carousel__scroller > .mat-carousel__canvas > .mat-carousel-item').nth(1).click();

    const after = {};
    await expect.poll(async () => {
      Object.assign(after, await carousel.evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const items = [...scroller.querySelectorAll(':scope > .mat-carousel__canvas > .mat-carousel-item')];

        return {
          scrollLeft: Math.round(scroller.scrollLeft),
          widths: items.map((item) => Math.round(item.getBoundingClientRect().width)),
        };
      }));

      return after.scrollLeft;
    }, { timeout: 10000 }).toBe(392);

    /* 历史项目收缩为最小预览，点击项展开，trailing 侧为中等填充加
       末端最小预览位，放不下的项目零宽隐藏。 */
    expect(after.widths[0]).toBe(56);
    expect(after.widths[1]).toBe(Math.round(TARGET_WIDTH));
    expect(after.widths[2]).toBe(248);
    expect(after.widths[3]).toBe(56);
    expect(after.widths.slice(4).every((width) => width < 1)).toBe(true);
  });

  test('键盘方向键按停靠位滚动', async ({ page }) => {
    await openScene(page, 'carousel');

    const carousel = page.getByTestId('carousel');

    await carousel.locator('.mat-carousel__scroller').focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(600);

    const after = await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      const items = [...scroller.querySelectorAll(':scope > .mat-carousel__canvas > .mat-carousel-item')];

      return {
        scrollLeft: Math.round(scroller.scrollLeft),
        widths: items.map((item) => Math.round(item.getBoundingClientRect().width)),
      };
    });

    expect(after.scrollLeft).toBe(392);
    expect(after.widths[1]).toBe(Math.round(TARGET_WIDTH));
  });

  test('拖动中间态大项随滚动 1:1 移动且项目链无重叠', async ({ page }) => {
    await openScene(page, 'carousel');

    const carousel = page.getByTestId('carousel');

    const readItems = () => carousel.evaluate((element) => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const scrollerRect = scroller.getBoundingClientRect();
        const items = [...scroller.querySelectorAll('.mat-carousel-item')];

        resolve({
          scrollLeft: Math.round(scroller.scrollLeft),
          items: items.map((item) => {
            const rect = item.getBoundingClientRect();

            return {
              width: Math.round(rect.width),
              left: Math.round(rect.left - scrollerRect.left),
              right: Math.round(rect.right - scrollerRect.left),
            };
          }),
        });
      }));
    }));

    /* 关闭吸附模拟拖拽进行中，把滚动停在两个停靠位之间的两个采样点
       （第二格内：主项锚点已进入常规相位）。 */
    await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');

      scroller.classList.add('mat-carousel__scroller--dragging');
      scroller.scrollLeft = 492;
      scroller.dispatchEvent(new Event('scroll'));
    });

    const first = await readItems();

    await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');

      scroller.scrollLeft = 592;
      scroller.dispatchEvent(new Event('scroll'));
    });

    const second = await readItems();

    expect(first.scrollLeft).toBe(492);
    expect(second.scrollLeft).toBe(592);

    /* 大项（正在展开的项目）随滚动 1:1 移动：滚动前进 100px，
       它的左缘同样左移 100px，与容器宽度无关。 */
    expect(first.items[2].left - second.items[2].left).toBe(100);

    /* 两个采样点内所有项目按序排列，相邻项目间距不小于一个项目间距
       减去取整误差，全程无重叠。 */
    [first.items, second.items].forEach((group, groupIndex) => {
      group.forEach((item, index) => {
        if (index === 0) {
          return;
        }

        const previous = group[index - 1];
        const spacing = item.left - (previous.left + previous.width);

        expect(spacing, `采样 ${groupIndex} 项目 ${index} 间距`).toBeGreaterThanOrEqual(-1);
      });
    });

    await carousel.evaluate((element) => {
      element.querySelector('.mat-carousel__scroller').classList.remove('mat-carousel__scroller--dragging');
    });
  });

  test('拖动超过翻页阈值翻页，小幅拖动回弹', async ({ page }) => {
    await openScene(page, 'carousel');

    const stage = page.getByTestId('carousel-stage');
    const box = await stage.boundingBox();
    const centerY = box.y + box.height / 2;

    /* 向左拖 200px 越过半程阈值（392px 槽距的一半），翻到第二个停靠位。 */
    await page.mouse.move(box.x + 600, centerY);
    await page.mouse.down();
    await page.mouse.move(box.x + 400, centerY, { steps: 6 });
    await page.mouse.up();

    const paged = {};
    await expect.poll(async () => {
      Object.assign(paged, await page.getByTestId('carousel').evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const items = [...scroller.querySelectorAll('.mat-carousel-item')];

        return {
          scrollLeft: Math.round(scroller.scrollLeft),
          widths: items.map((item) => Math.round(item.getBoundingClientRect().width)),
        };
      }));

      /* 布局随滚动事件在下一帧收敛，轮询需同时确认位置与布局停靠。 */
      return paged.scrollLeft === 392 && paged.widths[1] === Math.round(TARGET_WIDTH)
        ? paged.scrollLeft
        : -1;
    }, { timeout: 5000 }).toBe(392);

    expect(paged.widths[1]).toBe(Math.round(TARGET_WIDTH));

    /* 回到停靠位后向右小幅拖动（低于半程阈值），回弹到原停靠位。 */
    await page.mouse.move(box.x + 400, centerY);
    await page.mouse.down();
    await page.mouse.move(box.x + 425, centerY, { steps: 4 });
    await page.mouse.up();

    const bounced = {};
    await expect.poll(async () => {
      Object.assign(bounced, await page.getByTestId('carousel').evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const items = [...scroller.querySelectorAll('.mat-carousel-item')];

        return {
          scrollLeft: Math.round(scroller.scrollLeft),
          widths: items.map((item) => Math.round(item.getBoundingClientRect().width)),
        };
      }));

      return bounced.scrollLeft === 392 && bounced.widths[0] === 56
        ? bounced.scrollLeft
        : -1;
    }, { timeout: 5000 }).toBe(392);

    expect(bounced.widths[0]).toBe(56);
    expect(bounced.widths[1]).toBe(Math.round(TARGET_WIDTH));
  });

  test('uncontained 释放后从松手位置逐帧吸附，位置不瞬跳', async ({ page }) => {
    await openScene(page, 'carousel');

    const stage = page.getByTestId('uncontained-stage');
    const box = await stage.boundingBox();
    const centerY = box.y + box.height / 2;

    /* 慢速向左拖 140px（低于半程），释放后回弹到最近的停靠位 0；
       慢速松手让吸附时长走到上限，为瞬跳检查留出稳定的采样窗口。 */
    await page.mouse.move(box.x + 600, centerY);
    await page.mouse.down();
    await page.mouse.move(box.x + 530, centerY, { steps: 5 });
    await page.waitForTimeout(60);
    await page.mouse.move(box.x + 460, centerY, { steps: 5 });
    await page.mouse.up();

    /* 释放瞬间位置必须仍停留在松手位置附近、由逐帧动画接管吸附；
       若吸附期间原生 mandatory 恢复，浏览器会把位置瞬时拉回上一次
       的停靠目标，整个过渡被吞掉。 */
    const initial = await page.getByTestId('carousel-uncontained').evaluate((element) => (
      element.querySelector('.mat-carousel__scroller').scrollLeft
    ));

    expect(initial).toBeGreaterThan(30);

    const settled = {};
    await expect.poll(async () => {
      settled.scrollLeft = await page.getByTestId('carousel-uncontained').evaluate((element) => (
        Math.round(element.querySelector('.mat-carousel__scroller').scrollLeft)
      ));

      return settled.scrollLeft;
    }, { timeout: 5000 }).toBe(0);

    /* 位置停靠后吸附停用状态应已交还原生吸附。 */
    const afterSettle = await page.getByTestId('carousel-uncontained').evaluate((element) => (
      element.querySelector('.mat-carousel__scroller').classList.contains('mat-carousel__scroller--settling')
    ));

    expect(afterSettle).toBe(false);
  });

  test('轮播关闭文本选择', async ({ page }) => {
    await openScene(page, 'carousel');

    const userSelect = await page.getByTestId('carousel').evaluate((element) => (
      getComputedStyle(element).userSelect
    ));

    expect(userSelect).toBe('none');
  });

  test('每个停靠位恰好一项展开，最小尺寸项目最多首尾各一个', async ({ page }) => {
    await openScene(page, 'carousel');

    const carousel = page.getByTestId('carousel');

    /* 依次停靠每个停靠位：当前项展开为目标宽，最小尺寸（56px）项目
       最多首尾各一个，其余可见项目为中等宽度填充。 */
    for (let mark = 0; mark <= 1176; mark += 392) {
      await carousel.evaluate((element, position) => {
        const scroller = element.querySelector('.mat-carousel__scroller');

        scroller.scrollLeft = position;
        scroller.dispatchEvent(new Event('scroll'));
      }, mark);

      const state = {};
      await expect.poll(async () => {
        Object.assign(state, await carousel.evaluate((element) => {
          const scroller = element.querySelector('.mat-carousel__scroller');
          const scrollerRect = scroller.getBoundingClientRect();
          const items = [...scroller.querySelectorAll('.mat-carousel-item')]
            .map((item, index) => {
              const rect = item.getBoundingClientRect();

              return {
                index,
                width: Math.round(rect.width),
                left: Math.round(rect.left - scrollerRect.left),
                right: Math.round(rect.right - scrollerRect.left),
              };
            });

          return { position: Math.round(scroller.scrollLeft), items };
        }), { timeout: 10000 });

        /* 位置与布局同时收敛（当前项到达目标宽度）才算停靠完成。 */
        const cell = state.position / 392;
        const layoutSettled = state.items[cell]
          && state.items[cell].width === Math.round(TARGET_WIDTH);

        return layoutSettled ? state.position : -1;
      }, { timeout: 10000 }).toBe(mark);

      const visible = state.items.filter((item) => item.width > 0);
      const smallItems = visible.filter((item) => item.width <= 56);

      expect(visible.length, `停靠位 ${mark} 可见项目数`).toBeGreaterThanOrEqual(2);
      /* 官方规定：最小尺寸项目最多首尾各一个，且只出现在两端预览位。 */
      expect(smallItems.length, `停靠位 ${mark} 最小项数量`).toBeLessThanOrEqual(2);
      smallItems.forEach((item) => {
        expect([16, 784 - 56], `停靠位 ${mark} 最小项 ${item.index} 位置`).toContain(item.left);
      });
      /* 其余可见项目为中等宽度：明显大于最小尺寸且小于目标宽度。 */
      visible.forEach((item) => {
        if (item.width > 56 && item.index !== mark / 392) {
          expect(item.width, `停靠位 ${mark} 中等项目 ${item.index}`).toBeGreaterThan(64);
          expect(item.width, `停靠位 ${mark} 中等项目 ${item.index}`).toBeLessThan(Math.round(TARGET_WIDTH));
        }
      });
      expect(visible.some((item) => item.width === Math.round(TARGET_WIDTH)), `停靠位 ${mark} 主项展开`).toBe(true);
    }
  });

  test('滑动中间态最小尺寸不穿越中部，项目不越出容器', async ({ page }) => {
    await openScene(page, 'carousel');

    /* [测试 id, 半程采样滚动位置]：三变体各停在相邻两个停靠位的中间。 */
    const cases = [
      ['carousel', [196, 588]],
      ['carousel-hero', [324, 972]],
      ['carousel-hero-centered', [324, 972]],
    ];

    for (let caseIndex = 0; caseIndex < cases.length; caseIndex += 1) {
      const [testId, samples] = cases[caseIndex];
      const carousel = page.getByTestId(testId);

      for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex += 1) {
        const position = samples[sampleIndex];
        const visibleItems = await carousel.evaluate((element, scrollPosition) => new Promise((resolve) => {
          const scroller = element.querySelector('.mat-carousel__scroller');

          scroller.classList.add('mat-carousel__scroller--dragging');
          scroller.scrollLeft = scrollPosition;
          scroller.dispatchEvent(new Event('scroll'));

          requestAnimationFrame(() => requestAnimationFrame(() => {
            const scrollerRect = scroller.getBoundingClientRect();
            const sampled = [...scroller.querySelectorAll('.mat-carousel-item')]
              .map((item) => {
                const rect = item.getBoundingClientRect();

                return {
                  width: rect.width,
                  left: rect.left - scrollerRect.left,
                  right: rect.right - scrollerRect.left,
                };
              })
              .filter((item) => item.width > 0.5);

            resolve(sampled);
            scroller.classList.remove('mat-carousel__scroller--dragging');
          }));
        }), position);

        visibleItems.forEach((item, index) => {
          /* 所有可见项目都贴合在容器内，不越出左右边缘。 */
          expect(item.left, `${testId} 采样 ${position} 项目 ${index} 左缘`).toBeGreaterThanOrEqual(-1);
          expect(item.right, `${testId} 采样 ${position} 项目 ${index} 右缘`).toBeLessThanOrEqual(785);

          /* 停留在最小尺寸附近的项目必须贴在前缘或末端预览位，
             不得穿越画面中部。 */
          if (item.width <= 56) {
            const hugsEdge = item.left <= 17 || item.left >= 727;

            expect(hugsEdge, `${testId} 采样 ${position} 最小项 ${index} 位置`).toBe(true);
          }

          if (index === 0) {
            return;
          }

          const previous = visibleItems[index - 1];
          const spacing = item.left - (previous.left + previous.width);

          /* 两套停靠关键线各自有序无重叠，凸组合保证中间帧相邻项目
             间隙恒非负：全程无重叠、无凭空长出。 */
          expect(spacing, `${testId} 采样 ${position} 项目 ${index} 间距`).toBeGreaterThanOrEqual(-0.5);
        });
      }
    }
  });

  test('内容足够时滚动止于最后一个停靠位，末端与起始位镜像', async ({ page }) => {
    await openScene(page, 'carousel');

    /* [测试 id, 末项目标宽度, 末位停靠标记]：multi-browse 384/1960，hero 640/3240。 */
    const cases = [['carousel', 384, 1960], ['carousel-hero', 640, 3240]];

    for (let index = 0; index < cases.length; index += 1) {
      const [testId, targetWidth, lastMark] = cases[index];
      const carousel = page.getByTestId(testId);

      await carousel.evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');

        scroller.scrollLeft = 100000;
        scroller.dispatchEvent(new Event('scroll'));
      });

      const state = {};
      await expect.poll(async () => {
        Object.assign(state, await carousel.evaluate((element) => {
          const scroller = element.querySelector('.mat-carousel__scroller');
          const scrollerRect = scroller.getBoundingClientRect();
          const items = [...scroller.querySelectorAll('.mat-carousel-item')]
            .map((item) => {
              const rect = item.getBoundingClientRect();

              return {
                width: Math.round(rect.width),
                right: Math.round(rect.right - scrollerRect.left),
              };
            })
            .filter((item) => item.width > 0);

          return {
            position: Math.round(scroller.scrollLeft),
            maxScroll: scroller.scrollWidth - scroller.clientWidth,
            items,
          };
        }));

        /* 末端布局未生效（末项未回到目标宽度）时继续等待布局帧。 */
        const settledLayout = state.items.length > 0
          && state.items[state.items.length - 1].width === targetWidth;

        return settledLayout ? state.position - state.maxScroll : -1;
      }, { timeout: 10000 }).toBe(0);

      /* 滚动范围恰好止于最后一个停靠标记，无法再向末端滚出空白。 */
      expect(state.maxScroll, `${testId} 最大滚动位置`).toBe(lastMark);

      /* 末端与起始位镜像：主项保持目标宽度贴右缘并保留 16px 边距，
         最小尺寸项目最多一个（前导预览），其余可见项目为中等填充。 */
      expect(state.items[state.items.length - 1].width, `${testId} 主项保持目标宽`).toBe(targetWidth);
      expect(state.items[state.items.length - 1].right, `${testId} 末端内边距`).toBeGreaterThanOrEqual(780);
      expect(state.items[state.items.length - 1].right, `${testId} 末端不裁剪`).toBeLessThanOrEqual(788);

      const leading = state.items.slice(0, -1);
      const smallCount = leading.filter((item) => item.width <= 56).length;

      expect(smallCount, `${testId} 最小项数量`).toBeLessThanOrEqual(1);
      leading.forEach((item, itemIndex) => {
        expect(item.width, `${testId} 填充位 ${itemIndex}`).toBeLessThan(targetWidth);
      });
    }
  });

  test('鼠标拖拽滚动位移与指针位移一致', async ({ page }) => {
    await openScene(page, 'carousel');

    const stage = page.getByTestId('carousel-stage');
    const box = await stage.boundingBox();
    const y = box.y + box.height / 2;
    const readScroll = () => page.getByTestId('carousel').evaluate((element) => (
      element.querySelector('.mat-carousel__scroller').scrollLeft
    ));

    await page.mouse.move(box.x + 600, y);
    await page.mouse.down();
    await page.mouse.move(box.x + 520, y, { steps: 5 });

    /* 拖拽进行中滚动逐像素跟手，不被吸附或惯性带偏。 */
    expect(Math.round(await readScroll())).toBe(80);

    await page.mouse.move(box.x + 450, y, { steps: 5 });

    expect(Math.round(await readScroll())).toBe(150);

    await page.mouse.up();

    const settled = {};
    await expect.poll(async () => {
      Object.assign(settled, await page.getByTestId('carousel').evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');

        return {
          position: Math.round(scroller.scrollLeft),
          dragging: scroller.classList.contains('mat-carousel__scroller--dragging'),
        };
      }));

      return settled.position;
    }, { timeout: 5000 }).toBe(0);

    expect(settled.dragging).toBe(false);
  });

  test('横向滚轮逐像素跟手并在停止后吸附停靠', async ({ page }) => {
    await openScene(page, 'carousel');

    const carousel = page.getByTestId('carousel');

    const afterWheel = await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');

      scroller.dispatchEvent(new WheelEvent('wheel', {
        deltaX: 100,
        deltaY: 0,
        cancelable: true,
        bubbles: true,
      }));

      return {
        position: scroller.scrollLeft,
        dragging: scroller.classList.contains('mat-carousel__scroller--dragging'),
      };
    });

    /* 滚轮位移 1:1 映射到滚动，不产生惯性翻页。 */
    expect(afterWheel.position).toBe(100);
    expect(afterWheel.dragging).toBe(true);

    const vertical = await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');

      scroller.dispatchEvent(new WheelEvent('wheel', {
        deltaX: 0,
        deltaY: 120,
        cancelable: true,
        bubbles: true,
      }));

      return scroller.scrollLeft;
    });

    /* 纵向滚轮不拦截，滚动位置保持不变。 */
    expect(vertical).toBe(100);

    const settled = {};
    await expect.poll(async () => {
      Object.assign(settled, await carousel.evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');

        return {
          position: Math.round(scroller.scrollLeft),
          dragging: scroller.classList.contains('mat-carousel__scroller--dragging'),
        };
      }));

      return settled.position;
    }, { timeout: 5000 }).toBe(0);

    expect(settled.dragging).toBe(false);
  });

  test('uncontained 滚动到末尾时最后一个项目完整可见', async ({ page }) => {
    await openScene(page, 'carousel');

    const stage = page.getByTestId('uncontained-stage');
    const box = await stage.boundingBox();

    await page.getByTestId('carousel-uncontained').evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');

      scroller.scrollLeft = scroller.scrollWidth;
      scroller.dispatchEvent(new Event('scroll'));
    });

    /* 等待滚动钳制到最大滚动位置后，校验末项完整可见。 */
    await expect.poll(async () => page.getByTestId('carousel-uncontained').evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');

      return Math.round(scroller.scrollLeft) - (scroller.scrollWidth - scroller.clientWidth);
    }), { timeout: 10000 }).toBe(0);

    const lastItem = await page.getByTestId('carousel-uncontained').evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      const items = [...scroller.querySelectorAll('.mat-carousel-item')];
      const rect = items[items.length - 1].getBoundingClientRect();

      return {
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      };
    });

    /* 末项完整落在容器可视区域内，没有被画布裁掉。 */
    expect(lastItem.width).toBeGreaterThan(500);
    expect(lastItem.left).toBeGreaterThanOrEqual(Math.round(box.x));
    expect(lastItem.right).toBeLessThanOrEqual(Math.round(box.x + box.width));
  });

  test('uncontained 首尾停靠保留边距，中间状态项目铺满边缘', async ({ page }) => {
    await openScene(page, 'carousel');

    const testIds = ['carousel-uncontained', 'carousel-uncontained-multi-aspect'];

    for (let index = 0; index < testIds.length; index += 1) {
      const carousel = page.getByTestId(testIds[index]);

      const readState = () => carousel.evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const scrollerRect = scroller.getBoundingClientRect();
        const items = [...scroller.querySelectorAll('.mat-carousel-item')].map((item) => {
          const rect = item.getBoundingClientRect();

          return {
            left: Math.round(rect.left - scrollerRect.left),
            right: Math.round(rect.right - scrollerRect.left),
          };
        });

        return {
          position: Math.round(scroller.scrollLeft),
          maxScroll: scroller.scrollWidth - scroller.clientWidth,
          items,
        };
      });

      /* 初始停靠：首个项目距容器左缘保留一个边距。 */
      const initial = await readState();

      expect(initial.position).toBe(0);
      expect(initial.items[0].left).toBeGreaterThanOrEqual(15);
      expect(initial.items[0].left).toBeLessThanOrEqual(17);

      /* 末端停靠：最后一个项目距容器右缘保留一个边距，而不是贴死右缘。 */
      await carousel.evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');

        scroller.scrollLeft = 100000;
        scroller.dispatchEvent(new Event('scroll'));
      });

      const end = {};
      await expect.poll(async () => {
        Object.assign(end, await readState());

        return end.position - end.maxScroll;
      }, { timeout: 10000 }).toBe(0);

      const endLast = end.items[end.items.length - 1];

      expect(endLast.right, `${testIds[index]} 末端边距`).toBeGreaterThanOrEqual(782);
      expect(endLast.right, `${testIds[index]} 末端不贴死`).toBeLessThanOrEqual(786);

      /* 中间状态：项目铺满左右边缘，边距被项目占据。 */
      const mid = await carousel.evaluate((element) => new Promise((resolve) => {
        const scroller = element.querySelector('.mat-carousel__scroller');

        scroller.classList.add('mat-carousel__scroller--dragging');
        scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth - 100;
        scroller.dispatchEvent(new Event('scroll'));

        requestAnimationFrame(() => requestAnimationFrame(() => {
          const scrollerRect = scroller.getBoundingClientRect();
          const items = [...scroller.querySelectorAll('.mat-carousel-item')].map((item) => {
            const rect = item.getBoundingClientRect();

            return {
              left: Math.round(rect.left - scrollerRect.left),
              right: Math.round(rect.right - scrollerRect.left),
            };
          });

          resolve(items);
          scroller.classList.remove('mat-carousel__scroller--dragging');
        }));
      }));

      expect(mid[0].left, `${testIds[index]} 中间状态左缘铺满`).toBeLessThanOrEqual(0);
      expect(mid[mid.length - 1].right, `${testIds[index]} 中间状态右缘铺满`).toBeGreaterThanOrEqual(792);
    }
  });

  test('宽容器下停靠画面为大、中、小三档，预览位贴合两端', async ({ page }) => {
    await openScene(page, 'carousel');

    /* [测试 id, 可见项目的 [左缘, 宽度] 序列]。宽容器（1184）下
       multi-browse 为 560 主项 + 两个 256 中项 + 末端 56 预览，medium
       目标宽随大项缩放（约为大项与最小项的平均值）而不是按项目数
       等分退化为多个最小项；hero 主项展开为内容宽减两侧预览位。 */
    const cases = [
      ['carousel-wide', [[16, 560], [584, 256], [848, 256], [1112, 56]]],
      ['carousel-hero-wide', [[16, 540], [564, 540], [1112, 56]]],
      ['carousel-hero-centered-wide', [[80, 508], [596, 508], [1112, 56]]],
    ];

    for (let index = 0; index < cases.length; index += 1) {
      const [testId, expected] = cases[index];
      const visibleItems = await page.getByTestId(testId).evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const scrollerRect = scroller.getBoundingClientRect();

        return [...scroller.querySelectorAll('.mat-carousel-item')]
          .map((item) => {
            const rect = item.getBoundingClientRect();

            return {
              left: Math.round(rect.left - scrollerRect.left),
              width: Math.round(rect.width),
            };
          })
          .filter((item) => item.width > 0);
      });

      expect(
        visibleItems,
        `${testId} 停靠画面组成`,
      ).toEqual(expected.map(([left, width]) => ({ left, width })));
    }
  });

  test('宽容器下滑动中间态无重叠且项目不越出容器', async ({ page }) => {
    await openScene(page, 'carousel');

    /* [测试 id, 半程采样滚动位置]：宽容器各变体停在相邻两个停靠位的
       中间。宽屏下展开中的主项扫过末端预览位区域，零宽预览必须贴着
       容器边缘出现、消失，不得从主项表面长出或与其层叠。 */
    const cases = [
      ['carousel-wide', [284, 852]],
      ['carousel-hero-wide', [516, 1548]],
      ['carousel-hero-centered-wide', [516, 1548]],
    ];

    for (let caseIndex = 0; caseIndex < cases.length; caseIndex += 1) {
      const [testId, samples] = cases[caseIndex];
      const carousel = page.getByTestId(testId);

      for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex += 1) {
        const position = samples[sampleIndex];
        const visibleItems = await carousel.evaluate((element, scrollPosition) => new Promise((resolve) => {
          const scroller = element.querySelector('.mat-carousel__scroller');

          scroller.classList.add('mat-carousel__scroller--dragging');
          scroller.scrollLeft = scrollPosition;
          scroller.dispatchEvent(new Event('scroll'));

          requestAnimationFrame(() => requestAnimationFrame(() => {
            const scrollerRect = scroller.getBoundingClientRect();
            const sampled = [...scroller.querySelectorAll('.mat-carousel-item')]
              .map((item) => {
                const rect = item.getBoundingClientRect();

                return {
                  width: rect.width,
                  left: rect.left - scrollerRect.left,
                  right: rect.right - scrollerRect.left,
                };
              })
              .filter((item) => item.width > 0.5);

            resolve(sampled);
            scroller.classList.remove('mat-carousel__scroller--dragging');
          }));
        }), position);

        visibleItems.forEach((item, index) => {
          /* 所有可见项目都贴合在容器内，不越出左右边缘。 */
          expect(item.left, `${testId} 采样 ${position} 项目 ${index} 左缘`).toBeGreaterThanOrEqual(-1);
          expect(item.right, `${testId} 采样 ${position} 项目 ${index} 右缘`).toBeLessThanOrEqual(1169);

          /* 最小尺寸项目贴在前缘或末端预览位，不穿越画面中部。 */
          if (item.width <= 56) {
            const hugsEdge = item.left <= 17 || item.left >= 1111;

            expect(hugsEdge, `${testId} 采样 ${position} 最小项 ${index} 位置`).toBe(true);
          }

          if (index === 0) {
            return;
          }

          const previous = visibleItems[index - 1];
          const spacing = item.left - (previous.left + previous.width);

          /* 两套停靠关键线各自有序无重叠，凸组合保证中间帧相邻项目
             间隙恒非负。 */
          expect(spacing, `${testId} 采样 ${position} 项目 ${index} 间距`).toBeGreaterThanOrEqual(-0.5);
        });
      }
    }
  });

  test('uncontained-multi-aspect 自由双向滚动，向右滚动后可顺畅向左划回起点', async ({ page }) => {
    await openScene(page, 'carousel');
    const carousel = page.getByTestId('carousel-uncontained-multi-aspect');

    /* 先向右滚动一段距离 */
    await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      scroller.scrollLeft = 400;
      scroller.dispatchEvent(new Event('scroll'));
    });

    const initialScrollWidth = await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      return scroller.scrollWidth;
    });

    await carousel.scrollIntoViewIfNeeded();
    /* 向左回划（模拟拖拽向右移动使 scrollLeft 减小） */
    const box = await carousel.boundingBox();
    const midY = box.y + box.height / 2;
    await page.mouse.move(box.x + 200, midY);
    await page.mouse.down();
    await page.mouse.move(box.x + 500, midY, { steps: 10 });
    await page.mouse.up();

    await expect.poll(async () => carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      return scroller.scrollLeft;
    }), { timeout: 5000 }).toBeLessThan(300);

    const scrollWidthAfter = await carousel.evaluate((element) => element.querySelector('.mat-carousel__scroller').scrollWidth);
    expect(scrollWidthAfter).toBe(initialScrollWidth);

    /* 等待释放后的吸附动画完成 */
    await expect.poll(async () => carousel.evaluate((element) => element.querySelector('.mat-carousel__scroller').classList.contains('mat-carousel__scroller--settling')), { timeout: 5000 }).toBe(false);

    /* 并且可以平滑回滚到 0 */
    await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      scroller.scrollLeft = 0;
      scroller.dispatchEvent(new Event('scroll'));
    });

    const atZero = await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      const items = [...scroller.querySelectorAll('.mat-carousel-item')].map((item) => {
        const rect = item.getBoundingClientRect();
        return rect.width;
      });
      return {
        scrollLeft: scroller.scrollLeft,
        widths: items,
      };
    });

    expect(atZero.scrollLeft).toBe(0);
    /* 没有任何项目被压缩为小胶囊（多宽高比项目固有宽度通常大于 80px） */
    expect(atZero.widths.every((w) => w > 80)).toBe(true);
  });

  test('multi-browse 滚动到末端时镜像对称排布，中间无夹心小胶囊', async ({ page }) => {
    await openScene(page, 'carousel');
    const carousel = page.getByTestId('carousel');

    await carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      scroller.scrollLeft = 100000;
      scroller.dispatchEvent(new Event('scroll'));
    });

    await expect.poll(async () => carousel.evaluate((element) => {
      const scroller = element.querySelector('.mat-carousel__scroller');
      const items = [...scroller.querySelectorAll('.mat-carousel-item')]
        .map((item) => Math.round(item.getBoundingClientRect().width))
        .filter((w) => w > 0.5);

      if (items.length < 2) return true;
      /* 检查非首位项是否存在 width <= 56 的夹心小胶囊 */
      return items.slice(1).some((w) => w <= 56);
    }), { timeout: 5000 }).toBe(false);
  });

  test('hero 在宽容器下末端排布完整，展示多个大项且无空洞断层', async ({ page }) => {
    await openScene(page, 'carousel');
    const cases = ['carousel-hero-wide'];

    for (let i = 0; i < cases.length; i += 1) {
      const testId = cases[i];
      const carousel = page.getByTestId(testId);

      await carousel.evaluate((element) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        scroller.scrollLeft = 100000;
        scroller.dispatchEvent(new Event('scroll'));
      });

      await expect.poll(async () => carousel.evaluate((element, currentTestId) => {
        const scroller = element.querySelector('.mat-carousel__scroller');
        const scrollerRect = scroller.getBoundingClientRect();
        const items = [...scroller.querySelectorAll('.mat-carousel-item')]
          .map((item) => {
            const rect = item.getBoundingClientRect();
            return {
              left: Math.round(rect.left - scrollerRect.left),
              right: Math.round(rect.right - scrollerRect.left),
              width: Math.round(rect.width),
            };
          })
          .filter((item) => item.width > 0.5);

        if (items.length < 2) return false;
        const lastItem = items[items.length - 1];
        if (lastItem.right < scrollerRect.width - 20) return false;

        /* 宽容器下必须有多个大项连续展示 */
        if (currentTestId === 'carousel-hero-wide') {
          const largeItems = items.filter((it) => it.width >= 400);
          if (largeItems.length < 2) return false;
        }

        /* 相邻可见卡片间距不得大于 12px，避免数十或数百像素的空洞断层 */
        return items.slice(1).every((item, idx) => {
          const gap = item.left - items[idx].right;
          return gap <= 12 && gap >= -1;
        });
      }, testId), { timeout: 5000 }).toBe(true);
    }
  });
});
