import e from "../_virtual/_plugin-vue_export-helper.js";
import t, { DEFAULT_MAT_UI_OPTIONS as n } from "../mat-ui-context.js";
import { isComponentColor as r } from "./button-props.js";
import i from "./use-component-color.js";
/* empty css                                                                        */
import { computed as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, inject as l, mergeProps as u, onMounted as d, openBlock as f, ref as p, renderSlot as m, unref as h, useAttrs as g, useSlots as _ } from "vue";
//#region src/components/MatSelectionControlBase.vue
var v = { class: "mat-selection-control__target" }, y = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], b = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, x = {
	key: 0,
	class: "mat-selection-control__label"
}, S = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatSelectionControlBase",
	inheritAttrs: !1
}, {
	__name: "MatSelectionControlBase",
	props: {
		checked: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: r
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		indeterminate: {
			type: Boolean,
			default: !1
		},
		inputRole: {
			type: String,
			default: void 0
		},
		inputType: {
			type: String,
			required: !0,
			validator(e) {
				return ["checkbox", "radio"].includes(e);
			}
		},
		inputValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		labelName: {
			type: String,
			required: !0
		},
		tabindex: {
			type: [String, Number],
			default: void 0
		}
	},
	emits: {
		change(e) {
			return e instanceof Event;
		},
		keydown(e) {
			return e instanceof KeyboardEvent;
		}
	},
	setup(e, { expose: r, emit: S }) {
		let C = e, w = S, T = g(), E = _(), D = p(null), O = l(t, n), { colorStyle: k } = i(a(() => C.color)), A = a(() => {
			let e = {};
			return [
				"class",
				"inert",
				"aria-hidden"
			].forEach((t) => {
				T[t] !== void 0 && (e[t] = T[t]);
			}), e;
		}), j = a(() => Object.fromEntries(Object.entries(T).filter(([e]) => ![
			"class",
			"style",
			"inert",
			"aria-hidden"
		].includes(e)))), M = a(() => [k.value, T.style]), N = a(() => T.inert !== void 0 || T["aria-hidden"] === !0 || T["aria-hidden"] === "true");
		d(() => {
			!E.default && !j.value["aria-label"] && !N.value && console.warn(`${C.labelName}: 缺少默认标签内容时必须提供 aria-label`);
		});
		function P() {
			D.value?.focus();
		}
		function F() {
			return D.value;
		}
		return r({
			focusInput: P,
			getInput: F
		}), (t, n) => (f(), s("label", u(A.value, {
			class: ["mat-selection-control", {
				"mat-selection-control--checked": e.checked,
				"mat-selection-control--disabled": e.disabled,
				"mat-selection-control--use-cursor": h(O).useCursor
			}],
			style: M.value
		}), [c("span", v, [
			c("input", u({
				ref_key: "input",
				ref: D
			}, j.value, {
				class: "mat-selection-control__input",
				"aria-checked": e.indeterminate ? "mixed" : e.checked,
				checked: e.checked,
				disabled: e.disabled,
				indeterminate: e.indeterminate,
				role: e.inputRole,
				tabindex: e.tabindex,
				type: e.inputType,
				value: e.inputValue,
				onChange: n[0] ||= (e) => w("change", e),
				onKeydown: n[1] ||= (e) => w("keydown", e)
			}), null, 16, y),
			n[2] ||= c("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			c("span", b, [m(t.$slots, "indicator", {}, void 0, !0)])
		]), h(E).default ? (f(), s("span", x, [m(t.$slots, "default", {}, void 0, !0)])) : o("", !0)], 16));
	}
}), [["__scopeId", "data-v-9c26a9da"]]);
//#endregion
export { S as default };
