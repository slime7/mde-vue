import e from "../MatTextInputBase.js";
import { TEXT_INPUT_PROPS as t } from "../text-input-props.js";
import { createBlock as n, createSlots as r, getCurrentInstance as i, mergeProps as a, openBlock as o, renderSlot as s, withCtx as c } from "vue";
//#region src/components/mat-textarea/MatTextarea.vue
var l = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...t,
		autoGrow: {
			type: Boolean,
			default: !1
		},
		maxRows: {
			type: Number,
			default: void 0,
			validator(e) {
				return Number.isInteger(e) && e > 0;
			}
		},
		noResize: {
			type: Boolean,
			default: !1
		},
		rows: {
			type: Number,
			default: 4,
			validator(e) {
				return Number.isInteger(e) && e > 0;
			}
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(t, { emit: l }) {
		let u = t, d = i();
		function f() {
			return Object.hasOwn(d.vnode.props ?? {}, "rows") ? u.rows : 1;
		}
		let p = l;
		return (t, i) => (o(), n(e, a({
			...t.$attrs,
			...u
		}, {
			control: "textarea",
			"resize-min-rows": f(),
			"onUpdate:modelValue": i[0] ||= (e) => p("update:modelValue", e)
		}), r({ _: 2 }, [t.$slots.leading ? {
			name: "leading",
			fn: c(() => [s(t.$slots, "leading")]),
			key: "0"
		} : void 0, t.$slots.trailing ? {
			name: "trailing",
			fn: c(() => [s(t.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040, ["resize-min-rows"]));
	}
});
//#endregion
export { l as default };
