import e from "../../_virtual/_plugin-vue_export-helper.js";
import { BUTTON_SIZES as t, isComponentColor as n } from "../button-props.js";
import r from "../use-component-color.js";
import { MAT_SPLIT_BTN_KEY as i } from "../button-context.js";
import a from "./MatSplitSegment.js";
/* empty css                                                            */
import { computed as o, createElementBlock as s, createElementVNode as c, createVNode as l, mergeProps as u, nextTick as d, onMounted as f, openBlock as p, provide as m, ref as h, renderSlot as g, unref as _, useSlots as v, watch as y, withCtx as b } from "vue";
var x = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatSplitBtn",
	inheritAttrs: !1
}, {
	__name: "MatSplitBtn",
	props: {
		block: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "filled",
			validator(e) {
				return [
					"elevated",
					"filled",
					"filled-tonal",
					"outlined"
				].includes(e);
			}
		},
		size: {
			type: String,
			default: "small",
			validator(e) {
				return t.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: n
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		expanded: {
			type: Boolean,
			default: !1
		},
		controls: {
			type: String,
			default: void 0
		}
	},
	emits: {
		"leading-click": (e) => e instanceof MouseEvent,
		"trailing-click": (e) => e instanceof MouseEvent,
		"update:expanded": (e) => typeof e == "boolean"
	},
	setup(e, { emit: t }) {
		let n = e, x = t, S = h(null), C = v(), { colorStyle: w, hasExplicitColor: T } = r(o(() => n.color));
		m(i, {
			color: o(() => n.color),
			controls: o(() => n.controls),
			disabled: o(() => n.disabled),
			expanded: o(() => n.expanded),
			size: o(() => n.size),
			variant: o(() => n.variant)
		});
		function E(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || x("leading-click", e);
		}
		function D(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || (x("trailing-click", e), x("update:expanded", !n.expanded));
		}
		function O() {
			if (!S.value) return;
			(!C.leading || S.value.querySelectorAll(".mat-split-btn__leading .mat-button-base").length !== 1) && console.warn("MatSplitBtn: leading slot 必须提供一个 MatBtn");
			let e = S.value.querySelectorAll(".mat-split-btn__trailing .mat-btn--icon");
			(!C.trailing || e.length !== 1) && console.warn("MatSplitBtn: trailing slot 必须提供一个图标模式 MatBtn");
		}
		return f(O), y(() => [n.size, n.variant], async () => {
			await d(), O();
		}), (t, n) => (p(), s("div", u({
			ref_key: "root",
			ref: S
		}, t.$attrs, {
			class: ["mat-split-btn", [
				`mat-split-btn--${e.variant}`,
				`mat-split-btn--size-${e.size}`,
				{
					"mat-split-btn--block": e.block,
					"mat-split-btn--expanded": e.expanded,
					"mat-split-btn--explicit-color": _(T)
				}
			]],
			style: _(w),
			role: "group"
		}), [c("span", {
			class: "mat-split-btn__segment mat-split-btn__leading",
			onClick: E
		}, [l(a, { role: "leading" }, {
			default: b(() => [g(t.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), c("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: D
		}, [l(a, { role: "trailing" }, {
			default: b(() => [g(t.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-647c3562"]]);
//#endregion
export { x as default };
