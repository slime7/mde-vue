import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import n from "../MatSelectionControlBase.js";
/* empty css                                                          */
import { createBlock as r, createElementVNode as i, mergeProps as a, openBlock as o, renderSlot as s, withCtx as c } from "vue";
var l = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatSwitch",
	inheritAttrs: !1
}, {
	__name: "MatSwitch",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		icons: {
			type: String,
			default: "none",
			validator(e) {
				return [
					"none",
					"selected",
					"both"
				].includes(e);
			}
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
			return typeof e == "boolean";
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let l = t;
		function u(e) {
			l("update:modelValue", e.target.checked), l("change", e);
		}
		return (t, l) => (o(), r(n, a(t.$attrs, {
			class: ["mat-switch", [`mat-switch--icons-${e.icons}`, { "mat-switch--checked": e.modelValue }]],
			checked: e.modelValue,
			color: e.color,
			disabled: e.disabled,
			"input-role": "switch",
			"input-type": "checkbox",
			"label-name": "MatSwitch",
			onChange: u
		}), {
			indicator: c(() => [...l[0] ||= [i("span", { class: "mat-switch__track" }, [i("span", { class: "mat-switch__handle-positioner" }, [i("span", { class: "mat-switch__handle" }, [i("span", { class: "mat-switch__icon mat-switch__icon--selected" }), i("span", { class: "mat-switch__icon mat-switch__icon--unselected" })])])], -1)]]),
			default: c(() => [s(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-71a3dff9"]]);
//#endregion
export { l as default };
