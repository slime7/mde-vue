import e from "../_virtual/_plugin-vue_export-helper.js";
import t from "./use-component-color.js";
import n from "./mat-icon/MatIcon.js";
import r from "./MatInputBase.js";
/* empty css                                                                 */
import { computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, mergeProps as d, nextTick as f, normalizeClass as p, normalizeStyle as m, onBeforeUnmount as h, onMounted as g, openBlock as _, ref as v, renderSlot as y, toDisplayString as b, useAttrs as x, useId as S, watch as C, withCtx as w } from "vue";
//#region src/components/MatTextInputBase.vue
var T = ["inert", "aria-hidden"], E = { class: "mat-text-input__container" }, D = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, ee = {
	key: 0,
	class: "mat-text-input__outline-label"
}, te = { key: 0 }, ne = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, re = ["for"], ie = {
	key: 0,
	class: "mat-text-input__label"
}, ae = {
	key: 0,
	"aria-hidden": "true"
}, O = { class: "mat-text-input__control-row" }, k = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, A = {
	key: 1,
	class: "mat-text-input__affix mat-text-input__suffix"
}, j = { class: "mat-text-input__supporting-text" }, M = {
	key: 0,
	class: "mat-text-input__counter"
}, N = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatTextInputBase",
	inheritAttrs: !1
}, {
	__name: "MatTextInputBase",
	props: {
		control: {
			type: String,
			required: !0,
			validator(e) {
				return ["input", "textarea"].includes(e);
			}
		},
		modelValue: {
			type: String,
			required: !0
		},
		label: {
			type: String,
			default: void 0
		},
		variant: {
			type: String,
			required: !0
		},
		color: {
			type: String,
			default: void 0
		},
		supportingText: {
			type: String,
			default: void 0
		},
		errorText: {
			type: String,
			default: void 0
		},
		prefixText: {
			type: String,
			default: void 0
		},
		suffixText: {
			type: String,
			default: void 0
		},
		maxLength: {
			type: Number,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !0
		},
		readonly: {
			type: Boolean,
			required: !0
		},
		required: {
			type: Boolean,
			required: !0
		},
		error: {
			type: Boolean,
			required: !0
		},
		type: {
			type: String,
			default: void 0
		},
		rows: {
			type: Number,
			default: void 0
		},
		resizeMinRows: {
			type: Number,
			default: 1
		},
		autoGrow: {
			type: Boolean,
			default: !1
		},
		maxRows: {
			type: Number,
			default: void 0
		},
		noResize: {
			type: Boolean,
			default: !1
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: N }) {
		let P = e, F = N, I = x(), L = v(!1), R = v(P.modelValue), z = v(), B = S(), V = `${B}-supporting`, H = i(() => I.id || B), { colorStyle: U } = t(i(() => P.color)), W = i(() => !!I.placeholder), G = i(() => L.value || R.value.length > 0 || W.value), K = i(() => P.error ? P.errorText : P.supportingText), q = i(() => !!K.value || P.maxLength !== void 0), oe = i(() => {
			let e = [I["aria-describedby"]];
			return q.value && e.push(V), e.filter(Boolean).join(" ") || void 0;
		}), se = i(() => [U.value, I.style]), ce = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), le = i(() => Object.fromEntries(Object.entries(I).filter(([e]) => !ce.has(e)))), J, Y;
		function X(e) {
			return Number.parseFloat(e) || 0;
		}
		function Z() {
			let e = z.value?.getInput();
			if (!(e instanceof HTMLTextAreaElement)) return;
			e.style.resize = P.noResize ? "none" : "";
			let t = getComputedStyle(e), n = X(t.lineHeight) || 24, r = X(t.paddingBlockStart || t.paddingTop) + X(t.paddingBlockEnd || t.paddingBottom);
			if (e.style.minBlockSize = `${P.resizeMinRows * n + r}px`, !P.autoGrow) {
				e.style.blockSize = "", e.style.height = "", e.style.overflowY = "";
				return;
			}
			let i = P.rows ?? 1, a = P.maxRows === void 0 ? Infinity : Math.max(i, P.maxRows), o = i * n + r, s = a * n + r;
			e.style.blockSize = "auto", e.style.height = "";
			let c = e.scrollHeight, l = Math.max(o, Math.min(c, s));
			e.style.blockSize = `${l}px`, e.style.overflowY = "auto";
		}
		function Q() {
			f(Z);
		}
		function $(e) {
			let t = e[0]?.contentRect.width;
			t !== Y && (Y = t, Q());
		}
		C(() => P.modelValue, (e) => {
			R.value = e, Q();
		}), C(() => [
			P.autoGrow,
			P.label,
			P.maxRows,
			P.noResize,
			P.resizeMinRows,
			P.rows
		], Q), g(() => {
			Z(), typeof globalThis.ResizeObserver == "function" && (J = new globalThis.ResizeObserver($), J.observe(z.value.getInput()));
		}), h(() => {
			J?.disconnect();
		});
		function ue() {
			z.value?.focusInput();
		}
		function de(e) {
			R.value = e, F("update:modelValue", e), Q();
		}
		return (t, i) => (_(), s("div", {
			class: p(["mat-text-input", [
				t.$attrs.class,
				`mat-text-input--${e.variant}`,
				`mat-text-input--${e.control}`,
				{
					"mat-text-input--floating": G.value,
					"mat-text-input--focused": L.value,
					"mat-text-input--error": e.error,
					"mat-text-input--disabled": e.disabled
				}
			]]),
			style: m(se.value),
			inert: t.$attrs.inert,
			"aria-hidden": t.$attrs["aria-hidden"]
		}, [c("div", E, [
			e.variant === "outlined" ? (_(), s("fieldset", D, [G.value && e.label ? (_(), s("legend", ee, [l(b(e.label), 1), e.required ? (_(), s("span", te, " *")) : o("", !0)])) : o("", !0)])) : o("", !0),
			e.variant === "filled" ? (_(), s("span", ne)) : o("", !0),
			t.$slots.leading ? (_(), a(n, {
				key: 2,
				as: "span",
				class: "mat-text-input__icon mat-text-input__leading",
				"optical-size": 24,
				size: "24px"
			}, {
				default: w(() => [y(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : o("", !0),
			c("label", {
				class: "mat-text-input__main",
				for: H.value,
				onClick: ue
			}, [e.label ? (_(), s("span", ie, [l(b(e.label), 1), e.required ? (_(), s("span", ae, " *")) : o("", !0)])) : o("", !0), c("span", O, [
				e.prefixText ? (_(), s("span", k, b(e.prefixText), 1)) : o("", !0),
				u(r, d({
					ref_key: "controlElement",
					ref: z
				}, le.value, {
					class: "mat-text-input__control",
					"aria-describedby": oe.value,
					"aria-invalid": e.error ? "true" : void 0,
					disabled: e.disabled,
					id: H.value,
					"max-length": e.maxLength,
					readonly: e.readonly,
					required: e.required,
					rows: e.control === "textarea" ? e.rows : void 0,
					type: e.control === "input" ? e.type : void 0,
					control: e.control,
					"model-value": e.modelValue,
					onBlur: i[0] ||= (e) => L.value = !1,
					onFocus: i[1] ||= (e) => L.value = !0,
					"onUpdate:modelValue": de
				}), null, 16, [
					"aria-describedby",
					"aria-invalid",
					"disabled",
					"id",
					"max-length",
					"readonly",
					"required",
					"rows",
					"type",
					"control",
					"model-value"
				]),
				e.suffixText ? (_(), s("span", A, b(e.suffixText), 1)) : o("", !0)
			])], 8, re),
			t.$slots.trailing ? (_(), a(n, {
				key: 3,
				as: "span",
				class: "mat-text-input__icon mat-text-input__trailing",
				"optical-size": 24,
				size: "24px"
			}, {
				default: w(() => [y(t.$slots, "trailing", {}, void 0, !0)]),
				_: 3
			})) : o("", !0)
		]), q.value ? (_(), s("span", {
			key: 0,
			id: V,
			class: "mat-text-input__supporting"
		}, [c("span", j, b(K.value), 1), e.maxLength === void 0 ? o("", !0) : (_(), s("span", M, b(e.modelValue.length) + " / " + b(e.maxLength), 1))])) : o("", !0)], 14, T));
	}
}), [["__scopeId", "data-v-533afe06"]]);
//#endregion
export { N as default };
