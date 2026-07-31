import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import { isCheckboxModelValue as n, isSelectionValue as r } from "../selection-control.js";
import i from "../MatSelectionControlBase.js";
/* empty css                                                            */
import { computed as a, createBlock as o, createElementVNode as s, mergeProps as c, openBlock as l, renderSlot as u, withCtx as d } from "vue";
var f = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: n
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: r
		},
		indeterminate: {
			type: Boolean,
			default: !1
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
		"update:modelValue": n,
		"update:indeterminate"(e) {
			return typeof e == "boolean";
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, r = t, f = a(() => Array.isArray(n.modelValue) ? n.modelValue.some((e) => Object.is(e, n.value)) : n.modelValue);
		function p(e) {
			let t = e.target.checked;
			if (Array.isArray(n.modelValue)) {
				let e = t ? [...n.modelValue, n.value] : n.modelValue.filter((e) => !Object.is(e, n.value));
				r("update:modelValue", e);
			} else r("update:modelValue", t);
			r("update:indeterminate", !1), r("change", e);
		}
		return (t, n) => (l(), o(i, c(t.$attrs, {
			class: ["mat-checkbox", {
				"mat-checkbox--checked": f.value,
				"mat-checkbox--indeterminate": e.indeterminate
			}],
			checked: f.value,
			color: e.color,
			disabled: e.disabled,
			indeterminate: e.indeterminate,
			"input-type": "checkbox",
			"input-value": e.value,
			"label-name": "MatCheckbox",
			onChange: p
		}), {
			indicator: d(() => [...n[0] ||= [s("span", { class: "mat-checkbox__box" }, [s("span", { class: "mat-checkbox__check" }), s("span", { class: "mat-checkbox__mixed" })], -1)]]),
			default: d(() => [u(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled",
			"indeterminate",
			"input-value"
		]));
	}
}), [["__scopeId", "data-v-3d8ac819"]]);
//#endregion
export { f as default };
