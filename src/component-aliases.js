/**
 * 非标准组件的额外全局注册名称。
 *
 * 键为组件导出名，值为额外注册的模板标签名（PascalCase 或 kebab-case）。
 * 只用于不直接对应 Material 官方 API 的自定义组件；标准 `mat-*` 组件保持两种注册名称。
 */
const COMPONENT_ALIASES = Object.freeze({
  MatDynamicText: Object.freeze(['MdeDynamicText', 'mde-dynamic-text']),
});

export default COMPONENT_ALIASES;
