import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import n from "../use-component-color.js";
import { isSelectionValue as r } from "../selection-control.js";
import i from "../radio-context.js";
/* empty css                                                              */
import { computed as a, createElementBlock as o, createElementVNode as s, mergeProps as c, openBlock as l, provide as u, renderSlot as d, shallowRef as f, toDisplayString as p, useAttrs as m } from "vue";
//#region src/components/mat-radio-group/MatRadioGroup.vue
var h = ["aria-disabled"], g = { class: "mat-radio-group__label" }, _ = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatRadioGroup",
	inheritAttrs: !1
}, {
	__name: "MatRadioGroup",
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: null,
			validator(e) {
				return e === null || r(e);
			}
		},
		label: {
			type: String,
			required: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: t
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || r(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let r = e, _ = t, v = m(), y = f([]), { colorStyle: b } = n(a(() => r.color)), x = a(() => Object.fromEntries(Object.entries(v).filter(([e]) => e !== "style"))), S = a(() => [b.value, v.style]);
		function C(e) {
			return Object.is(r.modelValue, e);
		}
		function w() {
			return [...y.value].sort((e, t) => {
				let n = e.getInput(), r = t.getInput();
				if (!n || !r) return 0;
				let i = n.compareDocumentPosition(r);
				return i & 4 ? -1 : i & 2 ? 1 : 0;
			});
		}
		function T(e) {
			y.value.includes(e) || (y.value = [...y.value, e]);
		}
		function E(e) {
			y.value = y.value.filter((t) => t !== e);
		}
		function D(e) {
			if (e.disabled.value) return -1;
			let t = w().filter((e) => !e.disabled.value), n = t.find((e) => C(e.value.value));
			return n ? n === e ? 0 : -1 : t[0] === e ? 0 : -1;
		}
		function O(e, t) {
			r.disabled || Object.is(r.modelValue, e) || (_("update:modelValue", e), _("change", t));
		}
		function k(e, t, n) {
			let r = w().filter((e) => !e.disabled.value), i = r.indexOf(e);
			if (i === -1 || r.length === 0) return;
			n.preventDefault();
			let a = r[(i + t + r.length) % r.length];
			a.focus(), a.activate(n);
		}
		return u(i, {
			color: a(() => r.color),
			disabled: a(() => r.disabled),
			getTabIndex: D,
			isSelected: C,
			move: k,
			register: T,
			requestSelection: O,
			unregister: E
		}), (t, n) => (l(), o("fieldset", c(x.value, {
			class: "mat-radio-group",
			"aria-disabled": e.disabled || void 0,
			style: S.value,
			role: "radiogroup"
		}), [s("legend", g, p(e.label), 1), d(t.$slots, "default", {}, void 0, !0)], 16, h));
	}
}), [["__scopeId", "data-v-3a1b7322"]]);
//#endregion
export { _ as default };
