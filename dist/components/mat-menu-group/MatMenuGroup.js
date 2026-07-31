import e from "../../_virtual/_plugin-vue_export-helper.js";
import { MAT_MENU_GROUP_KEY as t, MAT_MENU_KEY as n, updateMenuItemPositions as r } from "../menu-context.js";
/* empty css                                                             */
import { computed as i, createCommentVNode as a, createElementBlock as o, inject as s, mergeProps as c, onBeforeUnmount as l, onMounted as u, openBlock as d, provide as f, renderSlot as p, toDisplayString as m, useAttrs as h, useId as g } from "vue";
//#region src/components/mat-menu-group/MatMenuGroup.vue
var _ = ["aria-labelledby"], v = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let v = e, y = h(), b = s(n, null), x = `${g().replace(/[^\w-]/g, "-")}-label`, S = i(() => v.label ? x : y["aria-labelledby"]), C = /* @__PURE__ */ new Set();
		function w(e) {
			C.add(e), r(Array.from(C));
		}
		function T(e) {
			C.delete(e), r(Array.from(C));
		}
		return f(t, {
			registerItem: w,
			unregisterItem: T
		}), u(() => b?.registerGroup()), l(() => b?.unregisterGroup()), (t, n) => (d(), o("div", c(t.$attrs, {
			class: "mat-menu-group",
			"aria-labelledby": S.value,
			role: "group"
		}), [e.label ? (d(), o("div", {
			key: 0,
			id: x,
			class: "mat-menu-group__label"
		}, m(e.label), 1)) : a("", !0), p(t.$slots, "default", {}, void 0, !0)], 16, _));
	}
}), [["__scopeId", "data-v-db085990"]]);
//#endregion
export { v as default };
