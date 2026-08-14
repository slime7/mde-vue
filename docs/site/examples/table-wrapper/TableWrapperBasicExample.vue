<!-- #region template -->
<template>
  <mat-table-wrapper class="table-wrapper-example">
    <table>
      <thead>
        <tr>
          <th>组件</th>
          <th>变体</th>
          <th>状态</th>
          <th>容器颜色</th>
          <th>内容颜色</th>
          <th>形状</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Button</td>
          <td>filled</td>
          <td>enabled</td>
          <td>primary</td>
          <td>on-primary</td>
          <td>full</td>
          <td><p>主操作按钮，使用频率最高。</p></td>
        </tr>
        <tr>
          <td>Button</td>
          <td>outlined</td>
          <td>disabled</td>
          <td>transparent</td>
          <td>on-surface-variant</td>
          <td>full</td>
          <td><p>次要操作，用于弱化对比。</p></td>
        </tr>
        <tr>
          <td>Checkbox</td>
          <td>checked</td>
          <td>indeterminate</td>
          <td>primary</td>
          <td>on-primary</td>
          <td>2px</td>
          <td><p>多选场景的状态组合。</p></td>
        </tr>
        <tr>
          <td>Text field</td>
          <td>filled</td>
          <td>error</td>
          <td>surface-container-highest</td>
          <td>error</td>
          <td>small</td>
          <td><p>输入校验失败的反馈样式。</p></td>
        </tr>
      </tbody>
    </table>
  </mat-table-wrapper>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.table-wrapper-example {
  max-inline-size: 100%;
}

.table-wrapper-example th,
.table-wrapper-example td {
  white-space: nowrap;
}
</style>
<!-- #endregion style -->
