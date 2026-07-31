import e from "../../_virtual/_plugin-vue_export-helper.js";
import t, { DEFAULT_MAT_UI_OPTIONS as n } from "../../mat-ui-context.js";
import { isComponentColor as r } from "../button-props.js";
import i from "../use-component-color.js";
import a from "../mat-icon/MatIcon.js";
import o from "../mat-tooltip/MatTooltip.js";
import { getSliderPercentage as s, getSliderStopValues as c, getSliderValueFromKeyboard as ee, getSliderValueFromPointer as te, getSliderVisualPosition as l, isFiniteNumber as u, isPositiveNumber as d, isSliderOrientation as f, isSliderSize as p, isSliderVariant as m, normalizeSliderValue as h, resolveSliderBounds as g, resolveSliderCenter as _, resolveSliderStep as v } from "../slider-utils.js";
/* empty css                                                          */
import { Fragment as y, computed as b, createCommentVNode as ne, createElementBlock as x, createElementVNode as S, createVNode as C, inject as re, mergeProps as w, normalizeClass as T, normalizeStyle as ie, openBlock as E, ref as D, renderList as O, unref as k, useAttrs as A } from "vue";
//#region src/components/mat-slider/MatSlider.vue
var ae = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, oe = { class: "mat-slider__inset-icon-layer" }, se = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, ce = [
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
], j = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: u
		},
		min: {
			type: Number,
			default: 0,
			validator: u
		},
		max: {
			type: Number,
			default: 100,
			validator: u
		},
		step: {
			type: Number,
			default: 1,
			validator: d
		},
		variant: {
			type: String,
			default: "standard",
			validator: m
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || u(e);
			}
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
			validator: f
		},
		size: {
			type: String,
			default: "extra-small",
			validator: p
		},
		insetIcon: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || e.length > 0;
			}
		},
		showStopIndicator: {
			type: Boolean,
			default: !1
		},
		showValueIndicator: {
			type: Boolean,
			default: !1
		}
	},
	emits: {
		"update:modelValue"(e) {
			return u(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: r }) {
		let u = e, d = r, f = A(), p = D(null), m = D(null), j = D(null), M = D(!1), N = D(void 0), P = D(void 0), F = D(!1), I = D(!1), L = re(t, n), { colorStyle: R } = i(b(() => u.color)), z = b(() => g(u.min, u.max)), B = b(() => v(u.step)), V = b(() => h(u.modelValue, z.value, B.value)), H = b(() => M.value ? P.value : V.value), U = b(() => _(u.center, z.value, B.value)), W = b(() => u.variant === "centered" ? U.value : z.value.min), G = b(() => s(H.value, z.value)), K = b(() => s(W.value, z.value)), q = b(() => l(G.value)), J = b(() => u.variant === "standard" ? "0%" : l(K.value)), Y = b(() => Math.sign(G.value - K.value)), le = b(() => Y.value >= 0 ? J.value : `calc(${q.value} + var(--mat-slider-handle-track-gap))`), ue = b(() => Y.value > 0 ? `max(0px, calc(${q.value} - ${J.value} - var(--mat-slider-handle-track-gap)))` : Y.value < 0 ? `max(0px, calc(${J.value} - ${q.value} - var(--mat-slider-handle-track-gap)))` : "0px"), de = b(() => Y.value > 0 ? J.value : `max(0px, calc(${q.value} - var(--mat-slider-handle-track-gap)))`), fe = b(() => Y.value < 0 ? J.value : `calc(${q.value} + var(--mat-slider-handle-track-gap))`), pe = b(() => Y.value < 0 ? `calc(100% - ${J.value})` : `max(0px, calc(100% - ${q.value} - var(--mat-slider-handle-track-gap)))`), me = b(() => u.showStopIndicator ? c(z.value, B.value) : u.variant === "centered" ? [z.value.min, z.value.max] : [z.value.max]), he = b(() => u.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(u.size)), X = b(() => u.size === "extra-large" ? 32 : 24), ge = b(() => u.showValueIndicator && (M.value || I.value)), _e = b(() => ({
			...R.value,
			"--mat-slider-active-visible-size": ue.value,
			"--mat-slider-active-visible-start": le.value,
			"--mat-slider-center-position": J.value,
			"--mat-slider-inactive-after-size": pe.value,
			"--mat-slider-inactive-after-start": fe.value,
			"--mat-slider-inactive-before-size": de.value,
			"--mat-slider-position": q.value
		}));
		function Z(e, t) {
			let n = M.value ? P.value : V.value;
			return e === void 0 || e === n ? !1 : (M.value && (P.value = e), d("update:modelValue", e), d("input", t), !0);
		}
		function Q(e) {
			return m.value ? Z(te(e, m.value, z.value, B.value, u.orientation), e) : !1;
		}
		function ve(e) {
			u.disabled || (N.value = e.pointerId, P.value = V.value, F.value = !1, M.value = !0, j.value?.focus(), m.value?.setPointerCapture?.(e.pointerId), F.value = Q(e));
		}
		function ye(e) {
			!M.value || e.pointerId !== N.value || (F.value = Q(e) || F.value);
		}
		function $(e, t) {
			!M.value || e.pointerId !== N.value || (t && (F.value = Q(e) || F.value), t && F.value && d("change", e), M.value = !1, F.value = !1, N.value = void 0, P.value = void 0);
		}
		function be(e) {
			if (u.disabled) return;
			let t = ee(V.value, e.key, z.value, B.value);
			t !== void 0 && (e.preventDefault(), Z(t, e) && d("change", e));
		}
		return (t, n) => (E(), x("div", w(k(f), {
			class: ["mat-slider", [
				`mat-slider--${e.orientation}`,
				`mat-slider--size-${e.size}`,
				`mat-slider--${e.variant}`,
				{
					"mat-slider--disabled": e.disabled,
					"mat-slider--dragging": M.value,
					"mat-slider--use-cursor": k(L).useCursor
				}
			]],
			style: _e.value
		}), [
			S("span", ae, [
				n[6] ||= S("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				S("span", { class: T(["mat-slider__active-track", { "mat-slider__active-track--from-start": e.variant === "standard" }]) }, null, 2),
				n[7] ||= S("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(E(!0), x(y, null, O(me.value, (e) => (E(), x("span", {
					key: e,
					class: T(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(W.value, H.value) && e <= Math.max(W.value, H.value) }]),
					style: ie({ "--mat-slider-stop-position": k(l)(k(s)(e, z.value)) })
				}, null, 6))), 128)),
				he.value ? (E(), x(y, { key: 0 }, [S("span", oe, [C(a, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: e.insetIcon,
					"optical-size": X.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), S("span", se, [C(a, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: e.insetIcon,
					"optical-size": X.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])])], 64)) : ne("", !0),
				S("span", {
					ref_key: "handle",
					ref: p,
					class: "mat-slider__handle"
				}, [...n[5] ||= [S("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
			]),
			C(o, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(H.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": ge.value,
				target: p.value
			}, null, 8, [
				"content",
				"location",
				"model-value",
				"target"
			]),
			S("span", {
				ref_key: "interaction",
				ref: m,
				class: "mat-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: n[0] ||= (e) => $(e, !1),
				onPointercancel: n[1] ||= (e) => $(e, !1),
				onPointerdown: ve,
				onPointermove: ye,
				onPointerup: n[2] ||= (e) => $(e, !0)
			}, null, 544),
			S("input", {
				ref_key: "nativeInput",
				ref: j,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": k(f)["aria-label"],
				"aria-orientation": e.orientation,
				"aria-valuemax": z.value.max,
				"aria-valuemin": z.value.min,
				"aria-valuenow": H.value,
				disabled: e.disabled,
				max: z.value.max,
				min: z.value.min,
				step: B.value,
				value: H.value,
				onBlur: n[3] ||= (e) => I.value = !1,
				onFocus: n[4] ||= (e) => I.value = !0,
				onKeydown: be
			}, null, 40, ce)
		], 16));
	}
}), [["__scopeId", "data-v-a8683686"]]);
//#endregion
export { j as default };
