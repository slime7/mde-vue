/* empty css                                                              */
import e from "../_virtual/_plugin-vue_export-helper.js";
import { computed as t, createBlock as n, mergeProps as r, onBeforeUnmount as i, openBlock as a, ref as o, renderSlot as s, resolveDynamicComponent as c, watch as l, withCtx as u } from "vue";
var d = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatActionBase",
	inheritAttrs: !1
}, {
	__name: "MatActionBase",
	props: {
		as: {
			type: String,
			default: "button"
		},
		href: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button"
		},
		useCursor: {
			type: Boolean,
			default: !1
		},
		focusRing: {
			type: Boolean,
			default: !0
		},
		pressedClass: {
			type: String,
			default: void 0
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { expose: d, emit: f }) {
		let p = e, m = f, h = t(() => p.href !== void 0), g = t(() => h.value ? "a" : p.as), _ = t(() => g.value === "button"), v = o(!1), y = o(null), b = 0, x;
		function S() {
			x !== void 0 && (globalThis.clearTimeout(x), x = void 0);
		}
		function C() {
			v.value && (S(), x = globalThis.setTimeout(() => {
				v.value = !1, x = void 0;
			}, Math.max(0, 150 - (Date.now() - b))));
		}
		function w() {
			p.disabled || (S(), b = Date.now(), v.value = !0);
		}
		function T(e) {
			e.button === 0 && (w(), e.currentTarget.setPointerCapture?.(e.pointerId));
		}
		function E(e) {
			let t = h.value ? ["Enter"] : [" ", "Enter"];
			!e.repeat && t.includes(e.key) && w();
		}
		function D(e) {
			(h.value ? ["Enter"] : [" ", "Enter"]).includes(e.key) && C();
		}
		function O(e) {
			if (p.disabled) {
				e.preventDefault(), e.stopImmediatePropagation();
				return;
			}
			m("click", e);
		}
		return l(() => p.disabled, (e) => {
			e && (S(), v.value = !1);
		}), i(S), d({ root: y }), (t, i) => (a(), n(c(g.value), r({
			ref_key: "root",
			ref: y
		}, t.$attrs, {
			class: ["mat-action-base", {
				"mat-action-base--disabled": e.disabled,
				"mat-action-base--pressed": v.value,
				[e.pressedClass]: v.value && e.pressedClass,
				"mat-action-base--use-cursor": e.useCursor,
				"mat-action-base--focus-ring": e.focusRing
			}],
			"aria-disabled": !_.value && e.disabled ? "true" : t.$attrs["aria-disabled"],
			disabled: _.value ? e.disabled : void 0,
			href: h.value && !e.disabled ? e.href : void 0,
			role: h.value && e.disabled ? "link" : t.$attrs.role,
			tabindex: !_.value && e.disabled ? -1 : t.$attrs.tabindex,
			type: _.value ? e.type : void 0,
			onBlur: C,
			onClick: O,
			onKeydown: E,
			onKeyup: D,
			onLostpointercapture: C,
			onPointercancel: C,
			onPointerdown: T,
			onPointerup: C
		}), {
			default: u(() => [s(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-disabled",
			"disabled",
			"href",
			"role",
			"tabindex",
			"type"
		]));
	}
}), [["__scopeId", "data-v-04ce13e2"]]);
//#endregion
export { d as default };
