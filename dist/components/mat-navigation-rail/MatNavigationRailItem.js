import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatActionBase.js";
import n, { DEFAULT_MAT_UI_OPTIONS as r } from "../../mat-ui-context.js";
import i from "../mat-icon/MatIcon.js";
import { MAT_NAVIGATION_RAIL_KEY as a } from "./mat-navigation-context.js";
/* empty css                                                                      */
import { computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, inject as d, mergeProps as f, openBlock as p, renderSlot as m, unref as h, useSlots as g, withCtx as _ } from "vue";
//#region src/components/mat-navigation-rail/MatNavigationRailItem.vue
var v = { class: "mat-navigation-rail-item__indicator" }, y = { class: "mat-navigation-rail-item__icon-wrap" }, b = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, x = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, S = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatNavigationRailItem",
	inheritAttrs: !1
}, {
	__name: "MatNavigationRailItem",
	props: {
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		icon: {
			type: String,
			default: void 0
		},
		href: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: { click: (e) => e instanceof MouseEvent },
	setup(e, { emit: S }) {
		let C = e, w = S, T = g(), E = d(n, r), D = d(a, null), O = o(() => D?.expanded.value ?? !1), k = o(() => D?.orientation.value === "horizontal"), A = o(() => D?.position.value ?? "start"), j = o(() => O.value), M = o(() => D?.isSelected(C.value) ?? !1), N = o(() => !!(C.icon || T.icon)), P = o(() => ({
			"mat-navigation-rail-item--selected": M.value,
			"mat-navigation-rail-item--disabled": C.disabled,
			"mat-navigation-rail-item--expanded": O.value,
			"mat-navigation-rail-item--collapsed": !O.value,
			"mat-navigation-rail-item--horizontal": k.value,
			[`mat-navigation-rail-item--${A.value}`]: !0
		}));
		function F(e) {
			C.disabled || D?.requestSelection(C.value), w("click", e);
		}
		return (n, r) => (p(), s(t, f(n.$attrs, {
			class: ["mat-navigation-rail-item", P.value],
			"aria-current": M.value ? "page" : void 0,
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			"use-cursor": h(E).useCursor,
			onClick: F
		}), {
			default: _(() => [u("span", v, [u("span", y, [h(T).icon ? m(n.$slots, "icon", {
				key: 0,
				selected: M.value
			}, void 0, !0) : N.value ? (p(), s(i, {
				key: 1,
				fill: +!!M.value,
				icon: e.icon,
				class: "mat-navigation-rail-item__icon",
				"aria-hidden": "true"
			}, null, 8, ["fill", "icon"])) : c("", !0)]), j.value ? (p(), l("span", b, [m(n.$slots, "default", {}, void 0, !0)])) : c("", !0)]), j.value ? c("", !0) : (p(), l("span", x, [m(n.$slots, "default", {}, void 0, !0)]))]),
			_: 3
		}, 16, [
			"class",
			"aria-current",
			"disabled",
			"href",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-44822127"]]);
//#endregion
export { S as default };
