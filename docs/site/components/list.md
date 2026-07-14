---
title: List 列表
description: mat-list 与 mat-list-item 的 Material 3 Expressive 外观、内容结构、操作和受控选择。
llms: true
order: 100
---

# List 列表

## 组件简介

`<mat-list>` 的组件导出名是 `MatList`，子组件 `<mat-list-item>` 的导出名是 `MatListItem`。List 纵向组织相关内容，提供 `standard` 与 `segmented` 两种 Material 3 Expressive 外观，默认使用 `segmented`，并支持非交互、单操作、多操作、单选和多选五种互斥的交互模式。

## 示例

### 外观变体

`standard` 让项目连续排列，`segmented` 在项目之间保留 2px 间隔。下面使用受控单选模式：将指针移到项目上可观察 hover 状态，点击项目可观察选中底色与圆角变化。

```vue
<script setup>
import { ref } from 'vue';

const standardSelected = ref(null);
const segmentedSelected = ref(null);
</script>

<mat-list
  variant="standard"
  interaction="single-select"
  :selected="standardSelected"
  aria-label="standard 列表"
  @select="standardSelected = $event.nextSelected"
>
  <mat-list-item value="recent">
    最近更新
    <template #trailing>
      <mat-radio
        :model-value="standardSelected"
        value="recent"
        inert
        aria-hidden="true"
        class="list-selection-indicator"
      />
    </template>
  </mat-list-item>
  <mat-list-item value="name">
    名称
    <template #trailing>
      <mat-radio
        :model-value="standardSelected"
        value="name"
        inert
        aria-hidden="true"
        class="list-selection-indicator"
      />
    </template>
  </mat-list-item>
</mat-list>

<mat-list
  variant="segmented"
  interaction="single-select"
  :selected="segmentedSelected"
  aria-label="segmented 列表"
  @select="segmentedSelected = $event.nextSelected"
>
  <mat-list-item value="offline">
    可离线使用
    <template #trailing>
      <mat-radio
        :model-value="segmentedSelected"
        value="offline"
        inert
        aria-hidden="true"
        class="list-selection-indicator"
      />
    </template>
  </mat-list-item>
  <mat-list-item value="shared">
    与我共享
    <template #trailing>
      <mat-radio
        :model-value="segmentedSelected"
        value="shared"
        inert
        aria-hidden="true"
        class="list-selection-indicator"
      />
    </template>
  </mat-list-item>
</mat-list>
```

<ClientOnly>
  <DocsPreview label="List standard 与 segmented 外观对比预览">
    <div class="list-variant-grid">
      <section class="list-variant-example">
        <strong>standard</strong>
        <mat-list
          variant="standard"
          interaction="single-select"
          :selected="listStandardVariantSelected"
          aria-label="standard 列表"
          @select="listStandardVariantSelected = $event.nextSelected"
        >
          <mat-list-item value="recent">
            最近更新
            <template #trailing>
              <mat-radio
                :model-value="listStandardVariantSelected"
                value="recent"
                inert
                aria-hidden="true"
                class="list-selection-indicator"
              />
            </template>
          </mat-list-item>
          <mat-list-item value="name">
            名称
            <template #trailing>
              <mat-radio
                :model-value="listStandardVariantSelected"
                value="name"
                inert
                aria-hidden="true"
                class="list-selection-indicator"
              />
            </template>
          </mat-list-item>
        </mat-list>
      </section>
      <section class="list-variant-example">
        <strong>segmented</strong>
        <mat-list
          variant="segmented"
          interaction="single-select"
          :selected="listSegmentedVariantSelected"
          aria-label="segmented 列表"
          @select="listSegmentedVariantSelected = $event.nextSelected"
        >
          <mat-list-item value="offline">
            可离线使用
            <template #trailing>
              <mat-radio
                :model-value="listSegmentedVariantSelected"
                value="offline"
                inert
                aria-hidden="true"
                class="list-selection-indicator"
              />
            </template>
          </mat-list-item>
          <mat-list-item value="shared">
            与我共享
            <template #trailing>
              <mat-radio
                :model-value="listSegmentedVariantSelected"
                value="shared"
                inert
                aria-hidden="true"
                class="list-selection-indicator"
              />
            </template>
          </mat-list-item>
        </mat-list>
      </section>
    </div>
  </DocsPreview>
</ClientOnly>

### 内容结构与 Divider

```vue
<mat-list variant="standard" aria-label="账户信息">
  <mat-list-item>
    <template #leading><span aria-hidden="true">person</span></template>
    当前账户
  </mat-list-item>

  <mat-divider inset="start" />

  <mat-list-item>
    <template #leading><span aria-hidden="true">mail</span></template>
    收件箱
    <template #supporting>12 封未读邮件</template>
    <template #trailing>12</template>
  </mat-list-item>

  <mat-list-item :lines="3">
    <template #overline>今天</template>
    设计评审
    <template #supporting>请在会议前查看最新的组件交互说明。</template>
    <template #trailing>10:30</template>
  </mat-list-item>
</mat-list>
```

<ClientOnly>
  <DocsPreview label="List 内容结构与 Divider 预览" stacked>
    <mat-list variant="standard" aria-label="账户信息" style="inline-size: min(100%, 420px)">
      <mat-list-item>
        <template #leading><span class="material-symbols-outlined" aria-hidden="true">person</span></template>
        当前账户
      </mat-list-item>
      <mat-divider inset="start" />
      <mat-list-item>
        <template #leading><span class="material-symbols-outlined" aria-hidden="true">mail</span></template>
        收件箱
        <template #supporting>12 封未读邮件</template>
        <template #trailing>12</template>
      </mat-list-item>
      <mat-list-item :lines="3">
        <template #overline>今天</template>
        设计评审
        <template #supporting>请在会议前查看最新的组件交互说明。</template>
        <template #trailing>10:30</template>
      </mat-list-item>
    </mat-list>
  </DocsPreview>
</ClientOnly>

省略 `lines` 时，组件按 overline、默认标签和 supporting Slot 的数量推断一至三行。辅助文字自行换成更多行时，应显式设置 `:lines="3"`，使 leading 和 trailing 内容改为顶部对齐。头像推荐使用 40×40px，普通图片使用 56×56px；媒体尺寸由 Slot 内容设置。

### 单操作与多操作

```vue
<mat-list variant="segmented" interaction="single-action" aria-label="设置">
  <mat-list-item @click="openProfile">
    <template #leading><span aria-hidden="true">person</span></template>
    个人资料
    <template #trailing><span aria-hidden="true">chevron_right</span></template>
  </mat-list-item>
  <mat-list-item href="/security">安全设置</mat-list-item>
  <mat-list-item disabled>不可用项目</mat-list-item>
</mat-list>

<mat-list interaction="multi-action" aria-label="文件">
  <mat-list-item @click="openFile">
    项目说明.pdf
    <template #supporting>2.4 MB</template>
    <template #trailing>
      <mat-icon-btn label="下载">download</mat-icon-btn>
      <mat-icon-btn label="更多操作">more_vert</mat-icon-btn>
    </template>
  </mat-list-item>
</mat-list>
```

<ClientOnly>
  <DocsPreview label="List 单操作与多操作预览" stacked>
    <mat-list variant="segmented" interaction="single-action" aria-label="设置" style="inline-size: min(100%, 420px)">
      <mat-list-item>
        <template #leading><span class="material-symbols-outlined" aria-hidden="true">person</span></template>
        个人资料
        <template #trailing><span class="material-symbols-outlined" aria-hidden="true">chevron_right</span></template>
      </mat-list-item>
      <mat-list-item href="#list-api">安全设置</mat-list-item>
      <mat-list-item disabled>不可用项目</mat-list-item>
    </mat-list>
    <mat-list interaction="multi-action" aria-label="文件" style="inline-size: min(100%, 420px)">
      <mat-list-item>
        项目说明.pdf
        <template #supporting>2.4 MB</template>
        <template #trailing>
          <mat-icon-btn label="下载">download</mat-icon-btn>
          <mat-icon-btn label="更多操作">more_vert</mat-icon-btn>
        </template>
      </mat-list-item>
    </mat-list>
  </DocsPreview>
</ClientOnly>

单操作模式的 leading、文字和 trailing 共同构成一个主操作。多操作模式把 trailing 放在主操作之外，其中的按钮和链接保留独立事件；点击 trailing 操作不会触发 `MatListItem` 的 `click`。

### 受控单选与多选

```vue
<script setup>
import { ref } from 'vue';

const singleSelected = ref('recent');
const multipleSelected = ref(['offline']);
</script>

<template>
  <mat-list
    variant="standard"
    interaction="single-select"
    :selected="singleSelected"
    aria-label="排序方式"
    @select="singleSelected = $event.nextSelected"
  >
    <mat-list-item value="recent">
      最近更新
      <template #trailing>
        <mat-radio
          :model-value="singleSelected"
          value="recent"
          inert
          aria-hidden="true"
          class="list-selection-indicator"
        />
      </template>
    </mat-list-item>
    <mat-list-item value="name">
      名称
      <template #trailing>
        <mat-radio
          :model-value="singleSelected"
          value="name"
          inert
          aria-hidden="true"
          class="list-selection-indicator"
        />
      </template>
    </mat-list-item>
  </mat-list>

  <mat-list
    variant="standard"
    interaction="multi-select"
    :selected="multipleSelected"
    aria-label="筛选条件"
    @select="multipleSelected = $event.nextSelected"
  >
    <mat-list-item value="offline">
      可离线使用
      <template #trailing>
        <mat-checkbox
          :model-value="multipleSelected"
          value="offline"
          inert
          aria-hidden="true"
          class="list-selection-indicator"
        />
      </template>
    </mat-list-item>
    <mat-list-item value="shared">
      与我共享
      <template #trailing>
        <mat-checkbox
          :model-value="multipleSelected"
          value="shared"
          inert
          aria-hidden="true"
          class="list-selection-indicator"
        />
      </template>
    </mat-list-item>
  </mat-list>
</template>
```

<ClientOnly>
  <DocsPreview label="List 受控单选与多选预览" stacked>
    <mat-list
      variant="standard"
      interaction="single-select"
      :selected="listSingleSelected"
      aria-label="排序方式"
      style="inline-size: min(100%, 420px)"
      @select="listSingleSelected = $event.nextSelected"
    >
      <mat-list-item value="recent">
        最近更新
        <template #trailing>
          <mat-radio
            :model-value="listSingleSelected"
            value="recent"
            inert
            aria-hidden="true"
            class="list-selection-indicator"
          />
        </template>
      </mat-list-item>
      <mat-list-item value="name">
        名称
        <template #trailing>
          <mat-radio
            :model-value="listSingleSelected"
            value="name"
            inert
            aria-hidden="true"
            class="list-selection-indicator"
          />
        </template>
      </mat-list-item>
    </mat-list>
    <mat-list
      variant="standard"
      interaction="multi-select"
      :selected="listMultipleSelected"
      aria-label="筛选条件"
      style="inline-size: min(100%, 420px)"
      @select="listMultipleSelected = $event.nextSelected"
    >
      <mat-list-item value="offline">
        可离线使用
        <template #trailing>
          <mat-checkbox
            :model-value="listMultipleSelected"
            value="offline"
            inert
            aria-hidden="true"
            class="list-selection-indicator"
          />
        </template>
      </mat-list-item>
      <mat-list-item value="shared">
        与我共享
        <template #trailing>
          <mat-checkbox
            :model-value="listMultipleSelected"
            value="shared"
            inert
            aria-hidden="true"
            class="list-selection-indicator"
          />
        </template>
      </mat-list-item>
    </mat-list>
  </DocsPreview>
</ClientOnly>

选择模式由 `MatList` 统一管理候选值。组件不会修改 `selected`，调用方应在 `select` 事件中回写 `nextSelected`。示例中的 `MatRadio` 和 `MatCheckbox` 只展示当前状态，因此同时设置 `inert`、`aria-hidden="true"` 和 `pointer-events: none`，不会进入焦点顺序、无障碍树或接管点击。正常业务中不能在 `role="option"` 内放置可交互的 Checkbox、Radio、Switch、按钮或链接。

## API {#list-api}

### MatList 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'standard' \| 'segmented'` | `'segmented'` | 项目连续排列或以 2px 间隔分段 |
| `interaction` | `'none' \| 'single-action' \| 'multi-action' \| 'single-select' \| 'multi-select'` | `'none'` | 整个 List 唯一的交互模式 |
| `selected` | 基础值、基础值数组或 `null` | `null` | 受控选择值；single-select 使用单值，multi-select 使用数组 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 选择项的局部 container/on-container 色对；省略时使用 secondary 色族 |

选择模式的根元素使用 `role="listbox"`，应通过 `aria-label` 或 `aria-labelledby` 提供可访问名称。其他未消费的原生属性传递给根 `ul` 或 listbox `div`。

### MatListItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | 未设置 | 选择模式中的项目值；选择模式下必须设置 |
| `href` | `string` | 未设置 | 单操作或多操作模式下把主操作渲染为链接 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 主操作为 button 时的原生类型 |
| `disabled` | `boolean` | `false` | 禁用主操作、选择和多操作 trailing 区域 |
| `lines` | `1 \| 2 \| 3` | 按 Slots 推断 | 控制 56、72、88px 最小高度以及三行内容的顶部对齐 |

操作模式中未消费的原生属性传给主按钮或链接，可设置 `target`、`rel` 等链接属性；非交互和选择模式中传给项目根元素。`href` 在非交互或选择模式中会被忽略并发出开发警告。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatList` | `select` | `{ value, selected, nextSelected, originalEvent }` | 启用的选择项通过指针、Space 或 Enter 请求改变选择 |
| `MatListItem` | `click` | 原生 `MouseEvent` | 单操作或多操作模式中的启用主操作被激活 |

single-select 再次激活当前项不会取消选择，也不会发出 `select`。multi-select 每次激活都返回不修改原数组的新数组。`originalEvent` 是实际的 `MouseEvent` 或 `KeyboardEvent`。非交互模式没有自定义事件，trailing 中的独立控件使用自己的事件。

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatList` | 默认 | 直接放置 `MatListItem` 和 `MatDivider` |
| `MatListItem` | 默认 | 必需的主要标签文字 |
| `MatListItem` | `leading` | 图标、40px 头像、56px 图片、媒体或非交互选择标记 |
| `MatListItem` | `overline` | 标签上方的短文本 |
| `MatListItem` | `supporting` | 一至三行辅助文字 |
| `MatListItem` | `trailing` | 尾部短文本、图标；仅 multi-action 可放置可聚焦操作 |

single-action 的所有 Slots 都位于同一个按钮或链接中，不能嵌套其他交互元素。选择模式中的 leading 和 trailing 作为展示内容处理，选择状态由 `aria-selected` 表达。

## 状态与键盘

- 静止时首项顶部和末项底部使用 16px 外角，相邻项目之间保持 4px 内角；仅有一项时四角均为 16px。
- List 使用 roving tabindex，Tab 进入当前停靠项，再次 Tab 离开 List。
- `ArrowDown`、`ArrowRight` 移至下一项，`ArrowUp`、`ArrowLeft` 移至上一项；到边界后循环并跳过禁用项。
- 选择模式优先以第一个选中项作为初始停靠点；方向键只移动焦点，不自动改变选择。
- 选择模式使用 Space 或 Enter 请求选择。多操作模式把主操作与 trailing 内的启用控件纳入同一方向键顺序。
- 键盘焦点环完整包围当前项目或独立操作，不会被相邻项目或多操作 trailing 区域遮挡。
- selected 同时改变容器配色和形状。disabled 内容降低强调，不响应指针或键盘；减少动态效果偏好下关闭形状和状态层过渡。

组件没有公开方法。

## 参考来源

外观、内容结构和交互依据 Material 3 [List overview](https://m3.material.io/components/lists/overview)、[List specs](https://m3.material.io/components/lists/specs) 与 [List guidelines](https://m3.material.io/components/lists/guidelines)。选择模式的语义限制参考 [WAI-ARIA Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)。

<script setup>
import { ref } from 'vue';

const listSingleSelected = ref('recent');
const listMultipleSelected = ref(['offline']);
const listStandardVariantSelected = ref(null);
const listSegmentedVariantSelected = ref(null);
</script>

<style scoped>
.list-variant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 24px;
  inline-size: 100%;
}

.list-variant-example {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-inline-size: 0;
}

.list-selection-indicator {
  pointer-events: none;
}
</style>
