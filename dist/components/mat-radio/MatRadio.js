import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import { isSelectionValue as n } from "../selection-control.js";
import r from "../MatSelectionControlBase.js";
import i from "../radio-context.js";
/* empty css                                                         */
import { computed as a, createBlock as o, createElementVNode as s, getCurrentInstance as c, inject as l, mergeProps as u, onBeforeUnmount as d, onMounted as f, openBlock as p, ref as m, renderSlot as h, withCtx as g } from "vue";
var _ = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatRadio",
	inheritAttrs: !1
}, {
	__name: "MatRadio",
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0,
			validator(e) {
				return e == null || n(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: n
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
			return e === null || n(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, _ = t, v = c(), y = l(i, null), b = m(null), x = a(() => n.value), S = a(() => n.disabled || !!y?.disabled.value), C = a(() => n.color ?? y?.color.value), w = a(() => y ? y.isSelected(n.value) : Object.is(n.modelValue, n.value));
		function T(e) {
			S.value || w.value || (y ? y.requestSelection(n.value, e) : _("update:modelValue", n.value), _("change", e));
		}
		let E = {
			activate: T,
			disabled: S,
			focus() {
				b.value?.focusInput();
			},
			getInput() {
				return b.value?.getInput() ?? null;
			},
			value: x
		}, D = a(() => y ? y.getTabIndex(E) : void 0);
		f(() => {
			if (!y) return;
			let e = v?.vnode.props ?? {};
			(n.modelValue !== void 0 || Object.hasOwn(e, "onUpdate:modelValue")) && console.warn("MatRadio: 位于 MatRadioGroup 中时，子级 modelValue 和 v-model 会被忽略"), y.register(E);
		}), d(() => {
			y?.unregister(E);
		});
		function O(e) {
			!y || e.repeat || (["ArrowRight", "ArrowDown"].includes(e.key) ? y.move(E, 1, e) : ["ArrowLeft", "ArrowUp"].includes(e.key) && y.move(E, -1, e));
		}
		return (e, t) => (p(), o(r, u({
			ref_key: "base",
			ref: b
		}, e.$attrs, {
			class: ["mat-radio", { "mat-radio--checked": w.value }],
			checked: w.value,
			color: C.value,
			disabled: S.value,
			"input-type": "radio",
			"input-value": x.value,
			"label-name": "MatRadio",
			tabindex: D.value,
			onChange: T,
			onKeydown: O
		}), {
			indicator: g(() => [...t[0] ||= [s("span", { class: "mat-radio__ring" }, [s("span", { class: "mat-radio__dot" })], -1)]]),
			default: g(() => [h(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled",
			"input-value",
			"tabindex"
		]));
	}
}), [["__scopeId", "data-v-0d040228"]]);
//#endregion
export { _ as default };
