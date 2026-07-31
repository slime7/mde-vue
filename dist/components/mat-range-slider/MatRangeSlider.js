import e from "../../_virtual/_plugin-vue_export-helper.js";
import t, { DEFAULT_MAT_UI_OPTIONS as n } from "../../mat-ui-context.js";
import { isComponentColor as r } from "../button-props.js";
import i from "../use-component-color.js";
import a from "../mat-tooltip/MatTooltip.js";
import { getSliderPercentage as o, getSliderStopValues as s, getSliderValueFromKeyboard as c, getSliderValueFromPointer as l, getSliderVisualPosition as u, isFiniteNumber as d, isPositiveNumber as f, isRangeSliderModelValue as p, isSliderOrientation as m, isSliderSize as h, normalizeRangeSliderValue as ee, resolveSliderBounds as te, resolveSliderStep as ne } from "../slider-utils.js";
/* empty css                                                               */
import { Fragment as g, computed as _, createElementBlock as v, createElementVNode as y, createVNode as b, inject as x, mergeProps as S, normalizeClass as C, normalizeStyle as w, openBlock as T, ref as E, renderList as D, unref as O, useAttrs as k } from "vue";
//#region src/components/mat-range-slider/MatRangeSlider.vue
var re = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, ie = [
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow",
	"disabled",
	"max",
	"min",
	"step",
	"value"
], ae = [
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow",
	"disabled",
	"max",
	"min",
	"step",
	"value"
], A = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatRangeSlider",
	inheritAttrs: !1
}, {
	__name: "MatRangeSlider",
	props: {
		modelValue: {
			type: Array,
			default() {
				return [0, 100];
			},
			validator: p
		},
		min: {
			type: Number,
			default: 0,
			validator: d
		},
		max: {
			type: Number,
			default: 100,
			validator: d
		},
		step: {
			type: Number,
			default: 1,
			validator: f
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: r
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: m
		},
		size: {
			type: String,
			default: "extra-small",
			validator: h
		},
		showStopIndicator: {
			type: Boolean,
			default: !1
		},
		showValueIndicator: {
			type: Boolean,
			default: !1
		},
		ariaLabelStart: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || typeof e == "string";
			}
		},
		ariaLabelEnd: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || typeof e == "string";
			}
		}
	},
	emits: {
		"update:modelValue"(e) {
			return p(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: r }) {
		let d = e, f = r, p = k(), m = E([]), h = E(null), A = E(null), j = E(null), M = E(0), N = E(void 0), P = E(!1), F = E(void 0), I = E(void 0), L = E(!1), R = x(t, n), { colorStyle: z } = i(_(() => d.color)), B = _(() => te(d.min, d.max)), V = _(() => ne(d.step)), H = _(() => ee(d.modelValue?.[0], d.modelValue?.[1], B.value, V.value)), U = _(() => P.value ? I.value : H.value), W = _(() => o(U.value[0], B.value)), G = _(() => o(U.value[1], B.value)), K = _(() => u(W.value)), q = _(() => u(G.value)), oe = _(() => d.showStopIndicator ? s(B.value, V.value) : [B.value.min, B.value.max]), se = _(() => m.value[M.value] ?? null), ce = _(() => U.value[M.value]), le = _(() => d.showValueIndicator && (P.value || N.value === M.value)), ue = _(() => ({
			...z.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${q.value} - ${K.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${K.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": q.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${q.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${q.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${K.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": K.value
		}));
		function de(e) {
			return e === 0 ? A.value : j.value;
		}
		function fe(e) {
			let [t, n] = U.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function J(e, t, n) {
			if (t === void 0) return !1;
			let [r, i] = P.value ? I.value : H.value, a = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return a[0] === r && a[1] === i ? !1 : (P.value && (I.value = a), f("update:modelValue", a), f("input", n), !0);
		}
		function Y(e) {
			if (!h.value) return !1;
			let t = l(e, h.value, B.value, V.value, d.orientation);
			return J(M.value, t, e);
		}
		function pe(e) {
			if (d.disabled || !h.value) return;
			let t = l(e, h.value, B.value, V.value, d.orientation);
			t !== void 0 && (M.value = fe(t), F.value = e.pointerId, I.value = [...H.value], L.value = !1, P.value = !0, de(M.value)?.focus(), h.value.setPointerCapture?.(e.pointerId), L.value = J(M.value, t, e));
		}
		function me(e) {
			!P.value || e.pointerId !== F.value || (L.value = Y(e) || L.value);
		}
		function X(e, t) {
			!P.value || e.pointerId !== F.value || (t && (L.value = Y(e) || L.value), t && L.value && f("change", e), P.value = !1, L.value = !1, F.value = void 0, I.value = void 0);
		}
		function Z(e, t) {
			if (d.disabled) return;
			let n = c(H.value[e], t.key, B.value, V.value);
			n !== void 0 && (t.preventDefault(), M.value = e, J(e, n, t) && f("change", t));
		}
		function Q(e) {
			M.value = e, N.value = e;
		}
		function $(e) {
			N.value === e && (N.value = void 0);
		}
		function he(e, t) {
			m.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (t, n) => (T(), v("div", S(O(p), {
			class: ["mat-range-slider", [
				`mat-range-slider--${e.orientation}`,
				`mat-range-slider--size-${e.size}`,
				{
					"mat-range-slider--disabled": e.disabled,
					"mat-range-slider--dragging": P.value,
					"mat-range-slider--use-cursor": O(R).useCursor
				}
			]],
			style: ue.value
		}), [
			y("span", re, [
				n[10] ||= y("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				n[11] ||= y("span", { class: "mat-range-slider__active-track" }, null, -1),
				n[12] ||= y("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(T(!0), v(g, null, D(oe.value, (e) => (T(), v("span", {
					key: e,
					class: C(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= U.value[0] && e <= U.value[1] }]),
					style: w({ "--mat-range-slider-stop-position": O(u)(O(o)(e, B.value)) })
				}, null, 6))), 128)),
				(T(!0), v(g, null, D(U.value, (e, t) => (T(), v("span", {
					key: t,
					ref_for: !0,
					ref: (e) => he(t, e),
					class: C(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": M.value === t }]])
				}, [...n[9] ||= [y("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			b(a, {
				class: "mat-range-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(ce.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": le.value,
				target: se.value
			}, null, 8, [
				"content",
				"location",
				"model-value",
				"target"
			]),
			y("span", {
				ref_key: "interaction",
				ref: h,
				class: "mat-range-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: n[0] ||= (e) => X(e, !1),
				onPointercancel: n[1] ||= (e) => X(e, !1),
				onPointerdown: pe,
				onPointermove: me,
				onPointerup: n[2] ||= (e) => X(e, !0)
			}, null, 544),
			y("input", {
				ref_key: "startInput",
				ref: A,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": e.ariaLabelStart,
				"aria-orientation": e.orientation,
				"aria-valuemax": U.value[1],
				"aria-valuemin": B.value.min,
				"aria-valuenow": U.value[0],
				disabled: e.disabled,
				max: U.value[1],
				min: B.value.min,
				step: V.value,
				value: U.value[0],
				onBlur: n[3] ||= (e) => $(0),
				onFocus: n[4] ||= (e) => Q(0),
				onKeydown: n[5] ||= (e) => Z(0, e)
			}, null, 40, ie),
			y("input", {
				ref_key: "endInput",
				ref: j,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": e.ariaLabelEnd,
				"aria-orientation": e.orientation,
				"aria-valuemax": B.value.max,
				"aria-valuemin": U.value[0],
				"aria-valuenow": U.value[1],
				disabled: e.disabled,
				max: B.value.max,
				min: U.value[0],
				step: V.value,
				value: U.value[1],
				onBlur: n[6] ||= (e) => $(1),
				onFocus: n[7] ||= (e) => Q(1),
				onKeydown: n[8] ||= (e) => Z(1, e)
			}, null, 40, ae)
		], 16));
	}
}), [["__scopeId", "data-v-d7070366"]]);
//#endregion
export { A as default };
