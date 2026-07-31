import e from "../MatTextInputBase.js";
import { TEXT_INPUT_PROPS as t } from "../text-input-props.js";
import { createBlock as n, createSlots as r, mergeProps as i, openBlock as a, renderSlot as o, withCtx as s } from "vue";
//#region src/components/mat-text-field/MatTextField.vue
var c = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...t,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(t, { emit: c }) {
		let l = t, u = c;
		return (t, c) => (a(), n(e, i({
			...t.$attrs,
			...l
		}, {
			control: "input",
			"onUpdate:modelValue": c[0] ||= (e) => u("update:modelValue", e)
		}), r({ _: 2 }, [t.$slots.leading ? {
			name: "leading",
			fn: s(() => [o(t.$slots, "leading")]),
			key: "0"
		} : void 0, t.$slots.trailing ? {
			name: "trailing",
			fn: s(() => [o(t.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040));
	}
});
//#endregion
export { c as default };
