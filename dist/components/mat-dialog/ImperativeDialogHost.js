import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../../mat-ui-context.js";
import n from "../../theme-context.js";
import r from "../mat-btn/MatBtn.js";
import i from "../mat-text-field/MatTextField.js";
import a from "./MatDialog.js";
import o from "../mat-spacer/MatSpacer.js";
import { getImperativeComponentOptions as s, getImperativeTheme as c } from "../../imperative-context.js";
/* empty css                                                                     */
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createTextVNode as m, createVNode as h, mergeProps as g, openBlock as _, provide as v, ref as y, renderList as b, shallowRef as x, toDisplayString as S, withCtx as C } from "vue";
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var w = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, T = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
	__name: "ImperativeDialogHost",
	props: {
		options: {
			type: Object,
			required: !0
		},
		cancelValue: {
			type: [
				String,
				Number,
				Boolean,
				Object,
				Array,
				Function,
				Symbol
			],
			default: void 0
		},
		onClosed: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		let T = e;
		v(t, s());
		let E = c();
		E && v(n, E);
		let D = y(!0), O = x(T.cancelValue), k = y(T.options.promptConfig?.defaultValue ?? ""), A = u(() => !!T.options.promptConfig), j = u(() => T.options.promptConfig?.required ?? !1), M = u(() => j.value && k.value.trim().length === 0), N = u(() => {
			let e = { ...T.options };
			return delete e.actions, delete e.ariaLabel, delete e.promptConfig, T.options.promptConfig && delete e.content, e;
		});
		function P(e, t) {
			e.disabled || A.value && t === T.options.actions.length - 1 && M.value || (O.value = A.value && t === T.options.actions.length - 1 ? k.value : e.value, D.value = !1);
		}
		function F() {
			T.onClosed(O.value);
		}
		return (t, n) => (_(), d(a, g({
			modelValue: D.value,
			"onUpdate:modelValue": n[1] ||= (e) => D.value = e
		}, N.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: F
		}), {
			actions: C(() => [h(o), (_(!0), p(l, null, b(e.options.actions, (t, n) => (_(), d(r, {
				key: n,
				color: t.color,
				disabled: t.disabled || A.value && n === e.options.actions.length - 1 && M.value,
				variant: t.variant,
				onClick: (e) => P(t, n)
			}, {
				default: C(() => [m(S(t.text), 1)]),
				_: 2
			}, 1032, [
				"color",
				"disabled",
				"variant",
				"onClick"
			]))), 128))]),
			default: C(() => [A.value ? (_(), p(l, { key: 0 }, [e.options.content ? (_(), p("p", w, S(e.options.content), 1)) : f("", !0), h(i, {
				modelValue: k.value,
				"onUpdate:modelValue": n[0] ||= (e) => k.value = e,
				autofocus: "",
				label: e.options.promptConfig.label,
				placeholder: e.options.promptConfig.placeholder,
				required: e.options.promptConfig.required
			}, null, 8, [
				"modelValue",
				"label",
				"placeholder",
				"required"
			])], 64)) : f("", !0)]),
			_: 1
		}, 16, ["modelValue", "aria-label"]));
	}
}), [["__scopeId", "data-v-217b4d5a"]]);
//#endregion
export { T as default };
