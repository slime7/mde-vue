import e from "../../_virtual/_plugin-vue_export-helper.js";
import { MAT_LIST_KEY as t } from "../list-context.js";
import { MAT_MENU_KEY as n } from "../menu-context.js";
/* empty css                                                           */
import { computed as r, createBlock as i, inject as a, mergeProps as o, openBlock as s, resolveDynamicComponent as c } from "vue";
var l = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatDivider",
	inheritAttrs: !1
}, {
	__name: "MatDivider",
	props: { inset: {
		type: [Boolean, String],
		default: !1,
		validator(e) {
			return typeof e == "boolean" || [
				"none",
				"start",
				"middle"
			].includes(e);
		}
	} },
	setup(e) {
		let l = e, u = a(t, null), d = a(n, null), f = r(() => !!u), p = r(() => !!d), m = r(() => u?.isSelectable.value ?? !1), h = r(() => l.inset === !0 ? "middle" : l.inset === !1 ? "none" : l.inset), g = r(() => f.value ? m.value ? "div" : "li" : p.value ? "div" : "hr");
		return (e, t) => (s(), i(c(g.value), o(e.$attrs, {
			class: ["mat-divider", [`mat-divider--${h.value}`, { "mat-divider--menu": p.value }]],
			"aria-hidden": m.value ? "true" : e.$attrs["aria-hidden"],
			role: m.value ? "presentation" : f.value || p.value ? "separator" : e.$attrs.role
		}), null, 16, [
			"class",
			"aria-hidden",
			"role"
		]));
	}
}), [["__scopeId", "data-v-2eb6ec37"]]);
//#endregion
export { l as default };
