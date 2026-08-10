import { Comment as e, Fragment as t, Teleport as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, getCurrentInstance as d, h as f, inject as p, isVNode as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onActivated as y, onBeforeUnmount as b, onDeactivated as x, onMounted as S, onUpdated as C, openBlock as w, provide as T, reactive as E, readonly as D, ref as O, render as k, renderList as A, renderSlot as j, resolveDynamicComponent as M, shallowReactive as N, shallowRef as P, toDisplayString as F, unref as I, useAttrs as L, useId as R, useSlots as z, watch as B, watchEffect as V, withCtx as H, withKeys as U, withModifiers as W } from "vue";
import { Hct as G, SchemeExpressive as K, SchemeNeutral as q, SchemeTonalSpot as ee, SchemeVibrant as J, argbFromHex as Y, hexFromArgb as X } from "@material/material-color-utilities";
//#region \0plugin-vue:export-helper
var Z = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, te = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatActionBase",
	inheritAttrs: !1
}, {
	__name: "MatActionBase",
	props: {
		as: {
			type: String,
			default: "button"
		},
		href: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button"
		},
		useCursor: {
			type: Boolean,
			default: !1
		},
		focusRing: {
			type: Boolean,
			default: !0
		},
		pressedClass: {
			type: String,
			default: void 0
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { expose: t, emit: n }) {
		let a = e, o = n, s = r(() => a.href !== void 0), c = r(() => s.value ? "a" : a.as), l = r(() => c.value === "button"), u = O(!1), d = O(null), f = 0, p;
		function m() {
			p !== void 0 && (globalThis.clearTimeout(p), p = void 0);
		}
		function g() {
			u.value && (m(), p = globalThis.setTimeout(() => {
				u.value = !1, p = void 0;
			}, Math.max(0, 150 - (Date.now() - f))));
		}
		function _() {
			a.disabled || (m(), f = Date.now(), u.value = !0);
		}
		function v(e) {
			e.button === 0 && (_(), e.currentTarget.setPointerCapture?.(e.pointerId));
		}
		function y(e) {
			let t = s.value ? ["Enter"] : [" ", "Enter"];
			!e.repeat && t.includes(e.key) && _();
		}
		function x(e) {
			(s.value ? ["Enter"] : [" ", "Enter"]).includes(e.key) && g();
		}
		function S(e) {
			if (a.disabled) {
				e.preventDefault(), e.stopImmediatePropagation();
				return;
			}
			o("click", e);
		}
		return B(() => a.disabled, (e) => {
			e && (m(), u.value = !1);
		}), b(m), t({ root: d }), (t, n) => (w(), i(M(c.value), h({
			ref_key: "root",
			ref: d
		}, t.$attrs, {
			class: ["mat-action-base", {
				"mat-action-base--disabled": e.disabled,
				"mat-action-base--pressed": u.value,
				[e.pressedClass]: u.value && e.pressedClass,
				"mat-action-base--use-cursor": e.useCursor,
				"mat-action-base--focus-ring": e.focusRing
			}],
			"aria-disabled": !l.value && e.disabled ? "true" : t.$attrs["aria-disabled"],
			disabled: l.value ? e.disabled : void 0,
			href: s.value && !e.disabled ? e.href : void 0,
			role: s.value && e.disabled ? "link" : t.$attrs.role,
			tabindex: !l.value && e.disabled ? -1 : t.$attrs.tabindex,
			type: l.value ? e.type : void 0,
			onBlur: g,
			onClick: S,
			onKeydown: y,
			onKeyup: x,
			onLostpointercapture: g,
			onPointercancel: g,
			onPointerdown: v,
			onPointerup: g
		}), {
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-disabled",
			"disabled",
			"href",
			"role",
			"tabindex",
			"type"
		]));
	}
}), [["__scopeId", "data-v-04ce13e2"]]), Q = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatButtonBase",
	inheritAttrs: !1
}, {
	__name: "MatButtonBase",
	props: {
		block: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button"
		},
		ariaPressed: {
			type: Boolean,
			default: void 0
		},
		useCursor: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (w(), i(te, h(t.$attrs, {
			class: ["mat-button-base", {
				"mat-button-base--block": e.block,
				"mat-button-base--use-cursor": e.useCursor
			}],
			"aria-pressed": e.ariaPressed,
			disabled: e.disabled,
			type: e.type,
			"pressed-class": "mat-button-base--pressed",
			onClick: r[0] ||= (e) => n("click", e)
		}), {
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-pressed",
			"disabled",
			"type"
		]));
	}
}), [["__scopeId", "data-v-04ffd7cb"]]), ne = Object.freeze({
	openDelay: 0,
	skipDelayDuration: 0
}), re = Object.freeze({
	iconClass: "material-symbols-outlined",
	tooltip: ne,
	useCursor: !1
}), ie = Symbol("mde-vue-options"), ae = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], oe = ["round", "square"], se = [
	"button",
	"submit",
	"reset"
], ce = [
	"primary",
	"secondary",
	"tertiary",
	"error"
];
function $(e) {
	return e === void 0 || ce.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var le = Object.freeze({
	small: {
		fontSize: "20px",
		opticalSize: 20
	},
	medium: {
		fontSize: "24px",
		opticalSize: 24
	},
	large: {
		fontSize: "40px",
		opticalSize: 40
	},
	"extra-large": {
		fontSize: "48px",
		opticalSize: 48
	}
}), ue = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function de(e) {
	return typeof e == "string" && (Object.hasOwn(le, e) || ue.test(e));
}
function fe(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function pe(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function me(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function he(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function ge(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var _e = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], ve = {
	primary: "primary",
	primaryDim: "primary-dim",
	onPrimary: "on-primary",
	primaryContainer: "primary-container",
	onPrimaryContainer: "on-primary-container",
	primaryFixed: "primary-fixed",
	primaryFixedDim: "primary-fixed-dim",
	onPrimaryFixed: "on-primary-fixed",
	onPrimaryFixedVariant: "on-primary-fixed-variant",
	secondary: "secondary",
	secondaryDim: "secondary-dim",
	onSecondary: "on-secondary",
	secondaryContainer: "secondary-container",
	onSecondaryContainer: "on-secondary-container",
	secondaryFixed: "secondary-fixed",
	secondaryFixedDim: "secondary-fixed-dim",
	onSecondaryFixed: "on-secondary-fixed",
	onSecondaryFixedVariant: "on-secondary-fixed-variant",
	tertiary: "tertiary",
	tertiaryDim: "tertiary-dim",
	onTertiary: "on-tertiary",
	tertiaryContainer: "tertiary-container",
	onTertiaryContainer: "on-tertiary-container",
	tertiaryFixed: "tertiary-fixed",
	tertiaryFixedDim: "tertiary-fixed-dim",
	onTertiaryFixed: "on-tertiary-fixed",
	onTertiaryFixedVariant: "on-tertiary-fixed-variant",
	error: "error",
	errorDim: "error-dim",
	onError: "on-error",
	errorContainer: "error-container",
	onErrorContainer: "on-error-container",
	background: "background",
	onBackground: "on-background",
	surface: "surface",
	surfaceDim: "surface-dim",
	surfaceBright: "surface-bright",
	surfaceContainerLowest: "surface-container-lowest",
	surfaceContainerLow: "surface-container-low",
	surfaceContainer: "surface-container",
	surfaceContainerHigh: "surface-container-high",
	surfaceContainerHighest: "surface-container-highest",
	onSurface: "on-surface",
	surfaceVariant: "surface-variant",
	onSurfaceVariant: "on-surface-variant",
	outline: "outline",
	outlineVariant: "outline-variant",
	inverseSurface: "inverse-surface",
	inverseOnSurface: "inverse-on-surface",
	inversePrimary: "inverse-primary",
	shadow: "shadow",
	scrim: "scrim",
	surfaceTint: "surface-tint"
}, ye = {
	"tonal-spot": ee,
	neutral: q,
	vibrant: J,
	expressive: K
}, be = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], xe = 64, Se = /* @__PURE__ */ new Map();
function Ce(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function we({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = ye[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(G.fromInt(Y(Ce(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function Te(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, X(e[t])])));
}
function Ee(e, t = "tonal-spot", n = 0) {
	let r = Ce(e), i = `${r}|${t}|${n}|2025|phone`, a = Se.get(i);
	if (a) return Se.delete(i), Se.set(i, a), a;
	let o = Object.freeze({
		light: Te(we({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), be),
		dark: Te(we({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), be)
	});
	if (Se.set(i, o), Se.size > xe) {
		let e = Se.keys().next().value;
		Se.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var De = Symbol("mde-vue-theme"), Oe = "tonal-spot", ke = 0;
function Ae(e) {
	let t = p(De, null), n = r(() => I(e) !== void 0);
	return {
		colorStyle: r(() => {
			let n = I(e);
			if (!n || !$(n)) return {};
			if (ce.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			let r = Ee(n, t?.schemeVariant.value ?? Oe, t?.contrastLevel.value ?? ke);
			return {
				"--mat-accent-color": `light-dark(${r.light.primary}, ${r.dark.primary})`,
				"--mat-on-accent-color": `light-dark(${r.light.onPrimary}, ${r.dark.onPrimary})`,
				"--mat-accent-container-color": `light-dark(${r.light.primaryContainer}, ${r.dark.primaryContainer})`,
				"--mat-on-accent-container-color": `light-dark(${r.light.onPrimaryContainer}, ${r.dark.onPrimaryContainer})`
			};
		}),
		hasExplicitColor: n
	};
}
//#endregion
//#region src/components/mat-icon/MatIcon.vue
var je = ["src"], Me = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatIcon",
	inheritAttrs: !1
}, {
	__name: "MatIcon",
	props: {
		icon: {
			type: String,
			default: void 0
		},
		src: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || e.length > 0;
			}
		},
		size: {
			type: String,
			default: "medium",
			validator: de
		},
		fill: {
			type: Number,
			default: 0,
			validator: pe
		},
		weight: {
			type: Number,
			default: 400,
			validator: me
		},
		grade: {
			type: Number,
			default: 0,
			validator: he
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: ge
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		fontColor: {
			type: String,
			default: void 0
		},
		as: {
			type: String,
			default: "i",
			validator: fe
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = e, a = p(ie, re), { colorStyle: s, hasExplicitColor: c } = Ae(r(() => n.color)), u = r(() => n.iconClass ?? a.iconClass), d = r(() => n.icon !== void 0), f = r(() => le[n.size]?.fontSize ?? n.size), m = r(() => n.opticalSize ?? le[n.size]?.opticalSize ?? 24), g = r(() => ({
			...s.value,
			"--mat-icon-size": f.value,
			color: n.fontColor ?? (c.value ? "var(--mat-accent-color)" : "currentColor"),
			fontVariationSettings: `'FILL' ${n.fill}, 'wght' ${n.weight}, 'GRAD' ${n.grade}, 'opsz' ${m.value}`
		}));
		return (n, r) => (w(), i(M(e.as), h(n.$attrs, {
			class: ["mat-icon", u.value],
			style: g.value
		}), {
			default: H(() => [e.src === void 0 ? d.value ? (w(), o(t, { key: 1 }, [l(F(e.icon), 1)], 64)) : j(n.$slots, "default", { key: 2 }, void 0, !0) : (w(), o("img", {
				key: 0,
				class: "mat-icon__image",
				src: e.src,
				alt: ""
			}, null, 8, je))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-a72d28ee"]]), Ne = /^-?\d+(\.\d+)?$/;
function Pe(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : NaN;
	if (typeof e == "string") {
		let t = e.trim();
		return t && Ne.test(t) ? Number(t) : NaN;
	}
	return NaN;
}
function Fe(e, { positive: t = !1, max: n } = {}) {
	let r = Pe(e);
	return !Number.isFinite(r) || (t ? r <= 0 : r < 0) ? !1 : n === void 0 || r <= n;
}
function Ie(e, t) {
	if (typeof e != "string") return !1;
	let n = e.trim();
	return !n || /[;{}]/.test(n) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports(t, n);
}
function Le(e, { property: t, positive: n = !1, max: r, allowUndefined: i = !0 } = {}) {
	return e === void 0 ? i : typeof e == "number" || typeof e == "string" && Ne.test(e.trim()) ? Fe(e, {
		positive: n,
		max: r
	}) : typeof e != "string" || !t ? !1 : Ie(e, t);
}
function Re(e, { property: t, positive: n = !1, max: r, fallback: i } = {}) {
	if (Le(e, {
		property: t,
		positive: n,
		max: r,
		allowUndefined: !1
	})) {
		let t = Pe(e);
		return Number.isFinite(t) ? t === 0 ? "0" : `${t}px` : e.trim();
	}
	return i;
}
function ze(e, { property: t, positive: n = !1, fallback: r } = {}) {
	if (Le(e, {
		property: t,
		positive: n,
		allowUndefined: !1
	})) {
		let t = Pe(e);
		return Number.isFinite(t) ? String(t) : e.trim();
	}
	return r;
}
function Be(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : typeof e == "number" || typeof e == "string" && Ne.test(e.trim()) ? Fe(e) : !e || Array.isArray(e) ? !1 : ["start", "end"].every((t) => e[t] === void 0 || Fe(e[t]));
}
function Ve(e, t) {
	let n = Pe(e);
	if (Number.isFinite(n)) return {
		start: n,
		end: n
	};
	function r(e) {
		let n = Pe(e);
		return Number.isFinite(n) ? n : t;
	}
	return {
		start: r(e?.start ?? t),
		end: r(e?.end ?? t)
	};
}
function He(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : Fe(e);
}
function Ue(e, t = 0) {
	return Fe(e) ? Pe(e) : t;
}
function We(e, { positive: t = !1, fallback: n } = {}) {
	return Fe(e, { positive: t }) ? Pe(e) : n;
}
//#endregion
//#region src/components/mat-hover/MatHover.vue
var Ge = /*@__PURE__*/ Object.assign({
	name: "MatHover",
	inheritAttrs: !1
}, {
	__name: "MatHover",
	props: {
		disabled: {
			type: Boolean,
			default: !1
		},
		modelValue: {
			type: Boolean,
			default: null
		},
		closeDelay: {
			type: [Number, String],
			default: 0,
			validator: (e) => He(e, { allowUndefined: !1 })
		},
		openDelay: {
			type: [Number, String],
			default: 0,
			validator: (e) => He(e, { allowUndefined: !1 })
		},
		target: {
			type: [String, Object],
			default: void 0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: t }) {
		let n = e, i = t, o = z(), s = d()?.vnode.props ?? {}, c = Object.prototype.hasOwnProperty.call(s, "modelValue") || Object.prototype.hasOwnProperty.call(s, "model-value"), l = O(!1), u = O(null), f = P(null), p = r(() => c ? n.modelValue : u.value), m, h = null;
		function g() {
			m !== void 0 && (window.clearTimeout(m), m = void 0);
		}
		function _(e) {
			l.value = e, !n.disabled && (i("update:modelValue", e), !c && (u.value = e));
		}
		function v(e, t) {
			g();
			let n = Ue(t, 0);
			if (n === 0) {
				_(e);
				return;
			}
			m = window.setTimeout(() => {
				m = void 0, _(e);
			}, n);
		}
		function y() {
			v(!0, n.openDelay);
		}
		function x() {
			v(!1, n.closeDelay);
		}
		function w(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? w(e.value) : "$el" in e ? w(e.$el) : null : null;
		}
		function T() {
			if (typeof n.target != "string") return w(n.target);
			try {
				return w(document.querySelector(n.target));
			} catch {
				return null;
			}
		}
		function E() {
			h &&= (h(), null);
		}
		function D() {
			let e = T();
			e !== f.value && (E(), f.value = e, e && (e.addEventListener("mouseenter", y), e.addEventListener("mouseleave", x), h = () => {
				e.removeEventListener("mouseenter", y), e.removeEventListener("mouseleave", x);
			}));
		}
		let k = {
			onMouseenter: y,
			onMouseleave: x
		};
		return B(() => n.disabled, (e, t) => {
			if (t && !e) {
				if (c) {
					i("update:modelValue", l.value);
					return;
				}
				u.value = l.value, i("update:modelValue", l.value);
			}
		}), B(T, D, { flush: "sync" }), S(D), C(D), b(() => {
			g(), E();
		}), (e, t) => I(o).default ? j(e.$slots, "default", {
			key: 0,
			isHovering: p.value,
			props: k
		}) : a("", !0);
	}
}), Ke = Symbol("mat-app-root");
function qe() {
	let e = p(Ke, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var Je = [
	"top",
	"top-start",
	"top-end",
	"right",
	"right-start",
	"right-end",
	"bottom",
	"bottom-start",
	"bottom-end",
	"left",
	"left-start",
	"left-end"
], Ye = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function Xe(e) {
	let t = Number(e.left) || 0, n = Number(e.top) || 0, r = Number.isFinite(Number(e.width)) ? Number(e.width) : Math.max(0, (Number(e.right) || t) - t), i = Number.isFinite(Number(e.height)) ? Number(e.height) : Math.max(0, (Number(e.bottom) || n) - n);
	return {
		bottom: Number.isFinite(Number(e.bottom)) ? Number(e.bottom) : n + i,
		height: i,
		left: t,
		right: Number.isFinite(Number(e.right)) ? Number(e.right) : t + r,
		top: n,
		width: r
	};
}
function Ze(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function Qe(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function $e(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function et(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function tt(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: Ze(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: Qe(t, n, r)
	};
}
function nt(e) {
	return [
		e,
		Ye[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== Ye[e])
	];
}
function rt(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function it(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function at(e, t, n, r, i, a, o, s) {
	let c = tt(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: $e(c.left, a, l),
		top: $e(c.top, a, u)
	}, f = rt(d, r);
	return it(f, n) || s.some((e) => it(f, Xe(e))) ? null : d;
}
function ot({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = Xe(i), c = Xe(a), [l, u = "center"] = (Je.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = et(l, s, o, r, t), m = Ye[l], h = et(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = nt(g), b = e.map((e) => Xe(e)), x = y.find((e) => et(e, s, o, r, t) >= f && at(e, d, s, c, o, r, t, b)) ?? y.find((e) => at(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = tt(x, d, s, c, t);
	return {
		left: Math.round($e(C.left, r, _)),
		location: S,
		top: Math.round($e(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var st = null, ct = /* @__PURE__ */ new WeakMap();
function lt(e) {
	st && st !== e && st.close(), st = e;
}
function ut(e) {
	st === e && (st = null);
}
function dt(e, t) {
	e && ct.set(e, {
		owner: t,
		expiresAt: Infinity
	});
}
function ft(e, t, n) {
	if (!e) return;
	let r = ct.get(e);
	if (!(!r || r.owner !== t)) {
		if (n <= 0) {
			ct.delete(e);
			return;
		}
		r.expiresAt = Date.now() + n;
	}
}
function pt(e, t) {
	if (!e) return !1;
	let n = ct.get(e);
	return !n || n.owner === t ? !1 : n.expiresAt < Date.now() ? (ct.delete(e), !1) : !0;
}
//#endregion
//#region src/components/toolbar-overlay.js
var mt = /* @__PURE__ */ new Map(), ht = /* @__PURE__ */ new Set(), gt = 0;
function _t(e) {
	let t = Number(e?.left) || 0, n = Number(e?.top) || 0, r = Number.isFinite(Number(e?.width)) ? Number(e.width) : Math.max(0, (Number(e?.right) || t) - t), i = Number.isFinite(Number(e?.height)) ? Number(e.height) : Math.max(0, (Number(e?.bottom) || n) - n);
	return {
		bottom: Number.isFinite(Number(e?.bottom)) ? Number(e.bottom) : n + i,
		height: i,
		left: t,
		right: Number.isFinite(Number(e?.right)) ? Number(e.right) : t + r,
		top: n,
		width: r
	};
}
function vt() {
	ht.forEach((e) => e());
}
function yt() {
	mt.forEach((e, t) => {
		e.element.isConnected || mt.delete(t);
	});
}
function bt(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = gt;
	gt += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return mt.set(n, r), vt(), {
		unregister() {
			i && (i = !1, mt.delete(n), vt());
		},
		update() {
			i && vt();
		}
	};
}
function xt() {
	return yt(), [...mt.values()].flatMap((e) => {
		try {
			return [_t(e.getRect())];
		} catch {
			return [];
		}
	});
}
function St(e = window.innerHeight) {
	yt();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...mt.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - _t(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function Ct(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return ht.add(e), e(), () => {
		ht.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var wt = ["id", "data-location"], Tt = 1500, Et = 150, Dt = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatTooltip",
	inheritAttrs: !1
}, {
	__name: "MatTooltip",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		content: {
			type: String,
			default: void 0
		},
		target: {
			type: [String, Object],
			default: void 0
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		location: {
			type: String,
			default: "top",
			validator(e) {
				return Je.includes(e);
			}
		},
		openDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => He(e)
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: c }) {
		let u = e, f = c, m = L(), _ = z(), v = d(), T = p(ie, re), E = p(Ke, null), D = O(null), k = P(null), A = { value: k }, M = P(null), N = O(!1), V = O(null), H = O(!1), U = O(!1), W = O(!1), G = O("closed"), K = O("top"), q = O({}), ee = O(!1), J = `${R().replace(/[^\w-]/g, "-")}-tooltip`, Y = r(() => typeof m.id == "string" ? m.id : J), X = r(() => u.content === void 0 ? !!_.default : u.content.length > 0), Z = r(() => !!_.activator), te = v?.vnode.props ?? {}, Q = Object.prototype.hasOwnProperty.call(te, "modelValue") || Object.prototype.hasOwnProperty.call(te, "model-value"), ne, ae, oe, se, ce = !1, $, le, ue = null, de = null, fe = null, pe = null, me = null, he = !1, ge = !0, _e = !1, ve = !1, ye = !1, be = null, xe = { close: et }, Se = Symbol("mat-tooltip-delay-group-owner");
		function Ce(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? Ce(e.value) : "$el" in e ? Ce(e.$el) : null : null;
		}
		function we(e) {
			try {
				return Ce(document.querySelector(e));
			} catch {
				return null;
			}
		}
		function Te() {
			return typeof u.target == "string" ? we(u.target) : Ce(u.target);
		}
		function Ee() {
			let e = D.value ? [...D.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function De() {
			return Z.value ? Ee() : Te();
		}
		function Oe() {
			return ke() ? typeof u.attach == "string" ? we(u.attach) : Ce(u.attach) : Me() || (E?.rootElement.value?.contains(k.value) && E.freeLayer.value ? E.freeLayer.value : document.body);
		}
		function ke() {
			let e = v?.vnode.props ?? {};
			return Object.prototype.hasOwnProperty.call(e, "attach");
		}
		function Ae(e) {
			if (!e.hasAttribute("popover")) return !1;
			try {
				return e.matches(":popover-open") || e.hasAttribute("data-popover-open");
			} catch {
				return e.hasAttribute("data-popover-open");
			}
		}
		function je(e) {
			return e.localName === "dialog" && e.hasAttribute("open") || Ae(e);
		}
		function Me() {
			let e = k.value;
			for (; e;) {
				if (je(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function Ne() {
			return Ue(u.openDelay ?? T.tooltip.openDelay, 0);
		}
		function Pe() {
			return k.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function Fe() {
			ae !== void 0 && (window.clearTimeout(ae), ae = void 0);
		}
		function Ie() {
			ne !== void 0 && (window.clearTimeout(ne), ne = void 0);
		}
		function Le() {
			oe !== void 0 && (window.clearTimeout(oe), oe = void 0);
		}
		function Re() {
			$ !== void 0 && (window.cancelAnimationFrame($), $ = void 0);
		}
		function ze() {
			Re(), U.value && ($ = window.requestAnimationFrame(() => {
				if ($ = void 0, U.value) {
					if (k.value && !k.value.isConnected) {
						$e({ immediate: !0 });
						return;
					}
					ze();
				}
			}));
		}
		function Be() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Ve(e, t) {
			if (Le(), Be()) {
				t();
				return;
			}
			oe = window.setTimeout(() => {
				oe = void 0, t();
			}, e);
		}
		function He() {
			se !== void 0 && (ce ? window.cancelAnimationFrame(se) : window.clearTimeout(se), se = void 0, ce = !1);
		}
		function We() {
			pe && (me === null ? pe.removeAttribute("aria-describedby") : pe.setAttribute("aria-describedby", me), pe = null, me = null);
		}
		function qe() {
			let e = k.value;
			if (!U.value || !e || pe === e) return;
			We(), pe = e, me = e.getAttribute("aria-describedby");
			let t = (me ?? "").split(/\s+/).filter(Boolean);
			t.includes(Y.value) || t.push(Y.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function Je() {
			He(), le?.disconnect(), le = void 0, de &&= (de(), null), fe &&= (fe(), null);
		}
		function Ye() {
			if (!U.value || !k.value || !V.value) return;
			let e = N.value ? E.getLayoutRect() : null, t = k.value.getBoundingClientRect(), n = e ? {
				bottom: t.bottom - e.top,
				height: t.height,
				left: t.left - e.left,
				right: t.right - e.left,
				top: t.top - e.top,
				width: t.width
			} : t, r = E?.publicContext.layout, i = e ? [
				{
					top: 0,
					bottom: r.padding.top,
					left: 0,
					right: r.size.width
				},
				{
					top: r.size.height - r.padding.bottom,
					bottom: r.size.height,
					left: 0,
					right: r.size.width
				},
				{
					top: 0,
					bottom: r.size.height,
					left: 0,
					right: r.padding.start
				},
				{
					top: 0,
					bottom: r.size.height,
					left: r.size.width - r.padding.end,
					right: r.size.width
				}
			] : xt(), a = ot({
				location: u.location,
				targetRect: n,
				tooltipRect: V.value.getBoundingClientRect(),
				avoidRects: i,
				viewport: e ? {
					height: r.size.height,
					width: r.size.width
				} : {
					height: window.innerHeight,
					width: window.innerWidth
				}
			});
			K.value = a.location, q.value = {
				left: `${a.left}px`,
				top: `${a.top}px`
			}, W.value = !0;
		}
		function Xe() {
			if (!U.value || se !== void 0) return;
			let e = () => {
				se = void 0, ce = !1, Ye();
			};
			if (typeof window.requestAnimationFrame == "function") {
				ce = !0, se = window.requestAnimationFrame(e);
				return;
			}
			se = window.setTimeout(e, 0);
		}
		function Ze() {
			de || (window.addEventListener("resize", Xe), document.addEventListener("scroll", Xe, !0), de = () => {
				window.removeEventListener("resize", Xe), document.removeEventListener("scroll", Xe, !0);
			}, fe = Ct(Xe), typeof ResizeObserver < "u" && (le = new ResizeObserver(Xe), le.observe(k.value), le.observe(V.value)));
		}
		function Qe() {
			H.value = !1, G.value = "closed", U.value = !1, W.value = !1, M.value = null, N.value = !1;
		}
		function $e({ immediate: e = !1 } = {}) {
			if (Fe(), Ie(), Re(), Je(), We(), ut(xe), !H.value) {
				Qe();
				return;
			}
			if (!(!e && G.value === "closing")) {
				if (e) {
					Le(), Qe();
					return;
				}
				U.value = !1, G.value = "closing", Ve(Et, Qe);
			}
		}
		function et() {
			Q && (ee.value = !0, f("update:modelValue", !1)), $e();
		}
		function tt() {
			ye || (ye = !0, console.warn(Z.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function nt({ warn: e = !0 } = {}) {
			let t = De();
			if (!t && U.value && $e({ immediate: !0 }), t === k.value) {
				!t && X.value && e && tt();
				return;
			}
			let n = k.value !== null;
			We(), gt(), k.value = t, ye = !1, !t && X.value && e && tt(), _t(), n && U.value && et();
		}
		function rt() {
			if (Ie(), Q || U.value || ee.value || !X.value) return;
			let e = pt(Pe(), Se) ? 0 : Ne();
			if (e === 0) {
				vt();
				return;
			}
			ae === void 0 && (ae = window.setTimeout(() => {
				ae = void 0, vt();
			}, e));
		}
		function it() {
			Fe(), !(Q || !U.value || _e || ve) && ne === void 0 && (ne = window.setTimeout(() => {
				ne = void 0, et();
			}, Tt));
		}
		function at() {
			if (_e || ve) {
				rt();
				return;
			}
			ft(be, Se, T.tooltip.skipDelayDuration), it();
		}
		function st(e) {
			_e = e, at();
		}
		function ct() {
			ve = !0, at();
		}
		function mt(e) {
			k.value?.contains(e.relatedTarget) || (ve = !1, at());
		}
		function ht(e) {
			e.key === "Escape" && (e.preventDefault(), et());
		}
		function gt() {
			ue && (ue(), ue = null, _e = !1, ve = !1);
		}
		function _t() {
			let e = k.value;
			e && (e.addEventListener("keydown", ht), !Q && X.value && (e.addEventListener("focusin", ct), e.addEventListener("focusout", mt)), ue = () => {
				e.removeEventListener("keydown", ht), e.removeEventListener("focusin", ct), e.removeEventListener("focusout", mt);
			});
		}
		async function vt() {
			if (!he || !ge || ee.value || !X.value) return;
			if (nt({ warn: !0 }), !k.value) {
				et();
				return;
			}
			let e = Oe();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), et();
				return;
			}
			Fe(), Ie(), Le(), lt(xe), be = Pe(), dt(be, Se), M.value = e, N.value = e === E?.freeLayer.value, K.value = u.location, q.value = {
				left: "0px",
				top: "0px"
			}, W.value = !1, G.value = "opening", H.value = !0, U.value = !0, await g(), !(!he || !ge || !U.value) && (qe(), Ye(), Ze(), ze());
		}
		return S(async () => {
			he = !0, nt({ warn: !1 }), await g(), he && (nt({ warn: !1 }), Q && u.modelValue && vt());
		}), C(() => {
			nt({ warn: !1 }), U.value && Xe();
		}), y(() => {
			ge || (ge = !0, nt({ warn: !1 }), Q && u.modelValue && vt());
		}), x(() => {
			ge = !1, Le(), Re(), gt(), $e({ immediate: !0 });
		}), b(() => {
			he = !1, Le(), Re(), gt(), U.value && $e({ immediate: !0 });
		}), B(() => u.modelValue, (e) => {
			if (!(!he || !ge || !Q)) {
				if (e) {
					ee.value = !1, vt();
					return;
				}
				ee.value = !1, $e();
			}
		}), B([() => u.content, () => u.target], async () => {
			await g();
			let e = k.value;
			nt({ warn: !1 }), k.value === e && (gt(), _t()), X.value || et();
		}), B(() => u.attach, async () => {
			if (!U.value) return;
			let e = Oe();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), et();
				return;
			}
			M.value = e, N.value = e === E?.freeLayer.value, await g(), Xe();
		}), B(() => u.location, () => {
			U.value && Xe();
		}), B(Y, () => {
			!U.value || !pe || (We(), qe());
		}), E && B(E.publicContext.layout, Xe), (r, c) => (w(), o(t, null, [
			!I(Q) && X.value ? (w(), i(Ge, {
				key: 0,
				target: A,
				"onUpdate:modelValue": st
			})) : a("", !0),
			Z.value || !e.target ? (w(), o("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: D,
				class: "mat-tooltip__activator"
			}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			H.value && M.value ? (w(), i(n, {
				key: 2,
				to: M.value
			}, [s("span", h(r.$attrs, {
				id: Y.value,
				ref_key: "tooltipElement",
				ref: V,
				class: ["mat-tooltip", [`mat-tooltip--${G.value}`, {
					"mat-tooltip--app-root": N.value,
					"mat-tooltip--positioned": W.value
				}]],
				"data-location": K.value,
				style: [q.value, r.$attrs.style],
				role: "tooltip"
			}), [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))], 16, wt)], 8, ["to"])) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-50eac0c4"]]), Ot = Symbol("mde-vue-button-group"), kt = Symbol("mde-vue-split-button");
//#endregion
//#region src/components/use-button.js
function At(e, t) {
	let n = p(ie, re), i = p(Ot, null), a = p(kt, null), o = r(() => a?.size.value ?? e.size ?? i?.size.value ?? "small"), s = r(() => a ? "round" : e.shape ?? i?.shape.value ?? "round"), c = r(() => a?.variant.value ?? e.variant), l = r(() => a?.color.value ?? e.color ?? i?.color.value), u = r(() => e.disabled || !!a?.disabled.value || !!i?.disabled.value), d = r(() => !!(i && i.selection.value !== "none")), f = r(() => a?.role === "trailing" ? a.expanded.value : d.value ? i.isSelected(e.value) : e.selected), m = r(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = Ae(l);
	function _(n) {
		d.value && i.requestSelection(e.value, n), t("click", n);
	}
	return {
		colorStyle: h,
		effectiveColor: l,
		effectiveDisabled: u,
		effectiveSelected: f,
		effectiveShape: s,
		effectiveSize: o,
		effectiveToggle: m,
		effectiveVariant: c,
		group: i,
		handleClick: _,
		hasExplicitColor: g,
		split: a,
		useCursor: n.useCursor
	};
}
//#endregion
//#region src/components/mat-btn/MatBtn.vue
var jt = {
	key: 2,
	class: "mat-btn__label"
}, Mt = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatBtn",
	inheritAttrs: !1
}, {
	__name: "MatBtn",
	props: {
		block: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "filled",
			validator(e) {
				return [
					"elevated",
					"filled",
					"filled-tonal",
					"outlined",
					"text",
					"standard"
				].includes(e);
			}
		},
		size: {
			type: String,
			default: void 0,
			validator(e) {
				return ae.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return oe.includes(e);
			}
		},
		width: {
			type: String,
			default: "uniform",
			validator(e) {
				return [
					"narrow",
					"uniform",
					"wide"
				].includes(e);
			}
		},
		icon: {
			type: [Boolean, String],
			default: void 0,
			validator(e) {
				return e === void 0 || typeof e == "boolean" || e.trim().length > 0;
			}
		},
		fill: {
			type: Number,
			default: void 0
		},
		prefix: {
			type: String,
			default: void 0
		},
		suffix: {
			type: String,
			default: void 0
		},
		label: {
			type: String,
			default: void 0
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		toggle: {
			type: Boolean,
			default: !1
		},
		selected: {
			type: Boolean,
			default: !1
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return se.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let s = e, c = n, u = L(), d = z(), f = O(null), p = R(), { colorStyle: g, effectiveDisabled: _, effectiveSelected: v, effectiveShape: y, effectiveSize: b, effectiveToggle: x, effectiveVariant: C, handleClick: T, hasExplicitColor: E, split: D, useCursor: k } = At(s, c), A = r(() => x.value && C.value !== "text"), M = r(() => A.value && v.value), N = r(() => s.icon === !0 || typeof s.icon == "string" && s.icon.trim().length > 0), P = r(() => s.fill === void 0 ? +!!M.value : s.fill);
		function B(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : m(e) ? e.type === t && Array.isArray(e.children) ? B(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? B(e.children) : [] : []).join("").trim();
		}
		let U = r(() => s.icon === !0 ? B(d.default?.() ?? []) : ""), W = r(() => typeof s.icon == "string" ? s.icon.trim() : U.value), G = r(() => u["aria-label"] ?? s.label), K = r(() => N.value ? u.title ?? s.label : void 0), q = r(() => !N.value && (s.prefix !== void 0 || !!d.prefix)), ee = r(() => !N.value && (s.suffix !== void 0 || !!d.suffix)), J = r(() => M.value && !!d.selected), Y = r(() => ({
			"extra-small": 20,
			small: N.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[b.value]);
		return S(() => {
			s.icon === !0 && !U.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), V(() => {
			s.toggle && s.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), N.value && (!G.value || G.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (n, r) => (w(), i(Q, h({
			ref_key: "buttonElement",
			ref: f
		}, I(u), {
			class: ["mat-btn", [
				`mat-btn--${I(C)}`,
				`mat-btn--size-${I(b)}`,
				`mat-btn--shape-${I(y)}`,
				{
					"mat-button--explicit-color": I(E),
					"mat-btn--icon": N.value,
					[`mat-btn--width-${e.width}`]: N.value,
					"mat-btn--toggle": A.value,
					"mat-btn--selected": M.value,
					"mat-btn--split-leading": I(D)?.role === "leading"
				}
			]],
			style: I(g),
			"aria-label": N.value ? G.value : I(u)["aria-label"],
			"aria-controls": I(D)?.role === "trailing" ? I(D).controls.value : void 0,
			"aria-expanded": I(D)?.role === "trailing" ? I(D).expanded.value : void 0,
			"aria-haspopup": I(D)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": A.value ? M.value : void 0,
			block: e.block,
			disabled: I(_),
			title: N.value ? void 0 : I(u).title,
			type: e.type,
			"use-cursor": I(k),
			onClick: I(T)
		}), {
			default: H(() => [
				N.value ? (w(), i(Me, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: P.value,
					"optical-size": Y.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [l(F(W.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : a("", !0),
				q.value ? (w(), i(Me, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: P.value,
					"optical-size": Y.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [e.prefix === void 0 ? j(n.$slots, "prefix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				N.value ? a("", !0) : (w(), o("span", jt, [J.value ? j(n.$slots, "selected", { key: 0 }, void 0, !0) : j(n.$slots, "default", { key: 1 }, void 0, !0)])),
				ee.value ? (w(), i(Me, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: P.value,
					"optical-size": Y.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [e.suffix === void 0 ? j(n.$slots, "suffix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				N.value && K.value ? (w(), i(Dt, {
					key: 4,
					content: K.value,
					id: `${I(p)}-tooltip`,
					target: f.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : a("", !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-label",
			"aria-controls",
			"aria-expanded",
			"aria-haspopup",
			"aria-pressed",
			"block",
			"disabled",
			"title",
			"type",
			"use-cursor",
			"onClick"
		]));
	}
}), [["__scopeId", "data-v-ef9b33c9"]]), Nt = ["data-scrollable"], Pt = { class: "mat-app-root__overlay" }, Ft = { class: "mat-app-root__bottom-stack" }, It = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatAppRoot",
	inheritAttrs: !1
}, {
	__name: "MatAppRoot",
	props: {
		fillViewport: {
			type: Boolean,
			default: !0
		},
		scrollable: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = [
			"top",
			"bottom",
			"start",
			"end"
		], n = [
			{
				max: 599,
				min: 0,
				name: "compact"
			},
			{
				max: 839,
				min: 600,
				name: "medium"
			},
			{
				max: 1199,
				min: 840,
				name: "expanded"
			},
			{
				max: 1599,
				min: 1200,
				name: "large"
			},
			{
				max: Infinity,
				min: 1600,
				name: "extra-large"
			}
		], i = e;
		if (p(Ke, null)) throw Error("MatAppRoot 不允许嵌套");
		let a = L(), c = O(null), l = O(null), u = O(null), d = O(null), f = O(null), m = O(null), _ = O(null), v = E({
			size: {
				width: 0,
				height: 0
			},
			padding: {
				top: 0,
				bottom: 0,
				start: 0,
				end: 0
			},
			content: {
				width: 0,
				height: 0
			},
			breakpoint: "compact",
			breakpointRange: {
				min: 0,
				max: 599
			},
			edges: {
				top: {
					size: 0,
					startInset: 0,
					endInset: 0
				},
				bottom: {
					size: 0,
					startInset: 0,
					endInset: 0
				},
				start: {
					size: 0,
					startInset: 0,
					endInset: 0
				},
				end: {
					size: 0,
					startInset: 0,
					endInset: 0
				}
			}
		}), y = D(v), x = E({
			top: 0,
			bottom: 0,
			start: 0,
			end: 0
		}), C = r(() => ({
			"mat-app-root--document": i.fillViewport && !i.scrollable,
			"mat-app-root--fill-viewport": i.fillViewport,
			"mat-app-root--scrollable": i.scrollable
		})), k = r(() => [a.style, {
			"--mat-app-root-padding-top": `${v.padding.top}px`,
			"--mat-app-root-padding-bottom": `${v.padding.bottom}px`,
			"--mat-app-root-padding-start": `${v.padding.start}px`,
			"--mat-app-root-padding-end": `${v.padding.end}px`,
			"--mat-app-root-safe-area-top": `${x.top}px`,
			"--mat-app-root-safe-area-bottom": `${x.bottom}px`,
			"--mat-app-root-safe-area-start": `${x.start}px`,
			"--mat-app-root-safe-area-end": `${x.end}px`
		}]), A = [], M = !1, N, P, F = !1;
		function I(e) {
			let t = Number.parseFloat(e);
			return Number.isFinite(t) ? Math.max(0, t) : 0;
		}
		function R() {
			if (!_.value) return {
				top: 0,
				bottom: 0,
				start: 0,
				end: 0
			};
			let e = window.getComputedStyle(_.value), t = window.getComputedStyle(c.value).direction, n = I(e.paddingLeft), r = I(e.paddingRight);
			return {
				top: I(e.paddingTop),
				bottom: I(e.paddingBottom),
				start: t === "rtl" ? r : n,
				end: t === "rtl" ? n : r
			};
		}
		function z(e, t, n) {
			return i.fillViewport && !i.scrollable ? {
				top: 0,
				bottom: n,
				left: e.left,
				right: e.left + t
			} : {
				top: e.top,
				bottom: e.bottom,
				left: e.left,
				right: e.right
			};
		}
		function V(e, t, n, r) {
			return e === "top" ? Math.max(0, t.bottom - n.top) : e === "bottom" ? Math.max(0, n.bottom - t.top) : e === "start" ? r === "rtl" ? Math.max(0, n.right - t.left) : Math.max(0, t.right - n.left) : r === "rtl" ? Math.max(0, t.right - n.left) : Math.max(0, n.right - t.left);
		}
		function H(e, t) {
			return e === "top" || e === "bottom" ? {
				start: t.start,
				end: t.end
			} : {
				start: t.top,
				end: t.bottom
			};
		}
		function U() {
			if (!M || !c.value) return;
			let e = c.value.getBoundingClientRect(), r = Math.max(0, Number(e.width) || 0), a = Math.max(0, Number(e.height) || 0), o = i.fillViewport && !i.scrollable ? Math.max(0, Number(window.innerHeight) || a) : a, s = n.find((e) => r <= e.max) ?? n.at(-1), l = R(), u = { ...l }, d = {
				top: {
					startInset: 0,
					endInset: 0
				},
				bottom: {
					startInset: 0,
					endInset: 0
				},
				start: {
					startInset: 0,
					endInset: 0
				},
				end: {
					startInset: 0,
					endInset: 0
				}
			}, f = z(e, r, o), p = window.getComputedStyle(c.value).direction;
			Object.assign(x, l), A.forEach((e) => {
				if (!e.active) return;
				let t = H(e.edge, u), n = e.insets;
				n.start = t.start, n.end = t.end, d[e.edge].startInset = Math.max(d[e.edge].startInset, t.start), d[e.edge].endInset = Math.max(d[e.edge].endInset, t.end);
				let r = e.element.getBoundingClientRect(), i = V(e.edge, r, f, p);
				u[e.edge] = Math.max(u[e.edge], i);
			}), Object.assign(v.size, {
				width: r,
				height: o
			}), Object.assign(v.padding, u), Object.assign(v.content, {
				width: Math.max(0, r - u.start - u.end),
				height: Math.max(0, o - u.top - u.bottom)
			}), v.breakpoint = s.name, Object.assign(v.breakpointRange, {
				min: s.min,
				max: s.max
			}), t.forEach((e) => {
				Object.assign(v.edges[e], {
					size: u[e],
					...d[e]
				});
			});
		}
		function W() {
			if (!M || F) return;
			F = !0;
			let e = () => {
				F = !1, P = void 0, U();
			};
			if (typeof window.requestAnimationFrame == "function") {
				P = window.requestAnimationFrame(e);
				return;
			}
			P = window.setTimeout(e, 0);
		}
		function G({ edge: e, element: n } = {}) {
			if (!t.includes(e)) throw TypeError("registerEdge() 的 edge 必须是 top、bottom、start 或 end");
			if (!(n instanceof HTMLElement) || n.ownerDocument !== document) throw TypeError("registerEdge() 的 element 必须是当前 document 中的 HTMLElement");
			let r = E({
				start: 0,
				end: 0
			}), i = {
				active: !0,
				edge: e,
				element: n,
				insets: r
			};
			return A.push(i), N?.observe(n), W(), Object.freeze({
				insets: D(r),
				unregister: () => {
					i.active && (i.active = !1, N?.unobserve?.(n), W());
				},
				update: () => {
					i.active && W();
				}
			});
		}
		let K = Object.freeze({
			layout: y,
			registerEdge: G
		});
		function q() {
			let e = c.value?.getBoundingClientRect() ?? {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			};
			return i.fillViewport && !i.scrollable ? {
				top: 0,
				bottom: v.size.height,
				left: e.left,
				right: e.left + v.size.width,
				width: v.size.width,
				height: v.size.height
			} : {
				top: e.top,
				bottom: e.bottom,
				left: e.left,
				right: e.right,
				width: v.size.width,
				height: v.size.height
			};
		}
		T(Ke, {
			publicContext: K,
			rootElement: D(c),
			contentElement: D(l),
			edgeLayer: D(u),
			freeLayer: D(d),
			snackbarLayer: D(f),
			floatingLayer: D(m),
			getLayoutRect: q
		});
		function ee() {
			window.addEventListener("resize", W), document.addEventListener("scroll", W, !0), window.visualViewport?.addEventListener("resize", W), window.visualViewport?.addEventListener("scroll", W);
		}
		function J() {
			window.removeEventListener("resize", W), document.removeEventListener("scroll", W, !0), window.visualViewport?.removeEventListener("resize", W), window.visualViewport?.removeEventListener("scroll", W);
		}
		return S(async () => {
			M = !0, N = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(W), N?.observe(c.value), A.forEach((e) => {
				e.active && N?.observe(e.element);
			}), ee(), await g(), W();
		}), b(() => {
			M = !1, N?.disconnect(), N = void 0, J(), P !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(P) : window.clearTimeout(P));
		}), B([() => i.fillViewport, () => i.scrollable], W), (t, n) => (w(), o("div", h({
			ref_key: "rootElement",
			ref: c
		}, t.$attrs, {
			class: ["mat-app-root", C.value],
			"data-scrollable": String(e.scrollable),
			style: k.value
		}), [
			s("div", {
				ref_key: "contentElement",
				ref: l,
				class: "mat-app-root__content"
			}, [j(t.$slots, "default", {}, void 0, !0)], 512),
			s("div", Pt, [
				s("div", {
					ref_key: "edgeLayer",
					ref: u,
					class: "mat-app-root__edge-layer"
				}, null, 512),
				s("div", {
					ref_key: "freeLayer",
					ref: d,
					class: "mat-app-root__free-layer"
				}, null, 512),
				s("div", Ft, [
					n[0] ||= s("span", {
						class: "mat-app-root__stack-spacer",
						"aria-hidden": "true"
					}, null, -1),
					s("div", {
						ref_key: "snackbarLayer",
						ref: f,
						class: "mat-app-root__snackbar-layer"
					}, null, 512),
					s("div", {
						ref_key: "floatingLayer",
						ref: m,
						class: "mat-app-root__floating-layer"
					}, null, 512)
				])
			]),
			s("span", {
				ref_key: "safeAreaProbe",
				ref: _,
				class: "mat-app-root__safe-area-probe",
				"aria-hidden": "true"
			}, null, 512)
		], 16, Nt));
	}
}), [["__scopeId", "data-v-c979cdea"]]), Lt = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap();
function zt(e, t, n) {
	let r = [n.initialValue, ...n.names].filter((e) => e && e !== "none"), i = e.style;
	i[t] = r.join(", ");
}
function Bt(e, t, n, r) {
	let i = e.get(t);
	return i || (i = {
		initialValue: t.style[n],
		names: /* @__PURE__ */ new Set()
	}, e.set(t, i)), i.names.add(r), zt(t, n, i), () => {
		if (i.names.delete(r), i.names.size > 0) {
			zt(t, n, i);
			return;
		}
		let a = t.style;
		a[n] = i.initialValue, e.delete(t);
	};
}
function Vt({ name: e, scope: t, source: n }) {
	let r = Lt.get(n)?.initialAxis ?? n.style.scrollTimelineAxis, i = Bt(Lt, n, "scrollTimelineName", e), a = Lt.get(n);
	a.initialAxis = r;
	let o = n.style;
	o.scrollTimelineAxis = "block";
	let s = Bt(Rt, t, "timelineScope", e);
	return () => {
		s(), i(), Lt.has(n) || (o.scrollTimelineAxis = r);
	};
}
function Ht(e) {
	let t = e.parentElement;
	for (; t;) {
		let e = window.getComputedStyle(t).overflowY;
		if (/(auto|scroll|overlay)/.test(e)) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function Ut(e, t) {
	let n = /* @__PURE__ */ new Set(), r = e;
	for (; r;) n.add(r), r = r.parentElement;
	for (r = t; r;) {
		if (n.has(r)) return r;
		r = r.parentElement;
	}
	return document.documentElement;
}
//#endregion
//#region src/components/mat-app-bar/MatAppBar.vue
var Wt = {
	key: 0,
	class: "mat-app-bar__leading"
}, Gt = { class: "mat-app-bar__main" }, Kt = { class: "mat-app-bar__primary" }, qt = {
	key: 0,
	class: "mat-app-bar__subtitle"
}, Jt = {
	key: 1,
	class: "mat-app-bar__trailing"
}, Yt = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatAppBar",
	inheritAttrs: !1
}, {
	__name: "MatAppBar",
	props: {
		variant: {
			type: String,
			default: "small",
			validator(e) {
				return [
					"search",
					"small",
					"medium-flexible",
					"large-flexible"
				].includes(e);
			}
		},
		content: {
			type: String,
			default: "headline",
			validator(e) {
				return [
					"headline",
					"image",
					"search"
				].includes(e);
			}
		},
		align: {
			type: String,
			default: "start",
			validator(e) {
				return ["start", "center"].includes(e);
			}
		},
		app: {
			type: Boolean,
			default: !1
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		scrollTarget: {
			type: [String, Object],
			default: void 0
		}
	},
	setup(e) {
		let c = [
			"search",
			"small",
			"medium-flexible",
			"large-flexible"
		], l = [
			"headline",
			"image",
			"search"
		], u = ["start", "center"], f = e, m = L(), y = d(), x = p(Ke, null), C = y?.vnode.props ?? {}, T = Object.prototype.hasOwnProperty.call(C, "attach"), E = O(null), D = O(null), k = P(null), A = `--mat-app-bar-${y?.uid ?? Math.random().toString(36).slice(2)}`, M = r(() => c.includes(f.variant) ? f.variant : "small"), N = r(() => M.value === "search" ? "search" : l.includes(f.content) ? f.content : "headline"), F = r(() => u.includes(f.align) ? f.align : "start"), R = r(() => M.value === "medium-flexible" ? 112 : M.value === "large-flexible" ? 120 : 64), z = r(() => f.app && !!x && !T), V = r(() => {
			if (!f.app) return document.body;
			if (z.value) return x.edgeLayer.value;
			if (f.attach instanceof HTMLElement && f.attach.ownerDocument === document) return f.attach;
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return null;
		}), H = r(() => {
			let e = R.value - 64;
			return !f.app || z.value ? e : R.value;
		}), U = r(() => [
			`mat-app-bar--${M.value}`,
			`mat-app-bar--content-${N.value}`,
			`mat-app-bar--align-${F.value}`
		]), W = r(() => [m.style, { "--mat-app-bar-timeline": A }]), G = r(() => ({
			"mat-app-bar__host--app": f.app,
			"mat-app-bar__host--app-root": z.value
		})), K = !1, q;
		function ee() {
			return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "scroll()");
		}
		function J(e) {
			if (e instanceof HTMLElement && e.ownerDocument === document) return e;
			if (typeof e == "string") try {
				return document.querySelector(e);
			} catch {
				return null;
			}
			return null;
		}
		function Y() {
			q?.(), q = void 0, D.value?.removeAttribute("data-timeline-active"), k.value?.unregister(), k.value = null;
		}
		async function X() {
			if (await g(), !K || !E.value || !D.value || (Y(), z.value && (k.value = x.publicContext.registerEdge({
				edge: "top",
				element: E.value
			})), !ee())) return;
			let e = J(f.scrollTarget), t = z.value && x.rootElement.value?.dataset.scrollable === "true" ? x.contentElement.value : null, n = e ?? t ?? Ht(E.value);
			if (!n) return;
			let r = z.value ? x.rootElement.value : Ut(n, D.value);
			r && (q = Vt({
				name: A,
				scope: r,
				source: n
			}), D.value.dataset.timelineActive = "");
		}
		return S(() => {
			K = !0, X();
		}), b(() => {
			K = !1, Y();
		}), B([
			() => f.app,
			() => f.attach,
			() => f.scrollTarget,
			M
		], X), (e, r) => (w(), o(t, null, [!f.app || V.value ? (w(), i(n, {
			key: 0,
			disabled: !f.app,
			to: V.value
		}, [s("div", {
			ref_key: "hostElement",
			ref: E,
			class: _(["mat-app-bar__host", G.value])
		}, [s("header", h({
			ref_key: "headerElement",
			ref: D
		}, I(m), {
			class: ["mat-app-bar", U.value],
			style: W.value
		}), [
			e.$slots.leading ? (w(), o("div", Wt, [j(e.$slots, "leading", {}, void 0, !0)])) : a("", !0),
			s("div", Gt, [s("div", Kt, [j(e.$slots, "default", {}, void 0, !0)]), e.$slots.subtitle ? (w(), o("div", qt, [j(e.$slots, "subtitle", {}, void 0, !0)])) : a("", !0)]),
			r[0] ||= s("span", {
				class: "mat-app-bar__spacer",
				"aria-hidden": "true"
			}, null, -1),
			e.$slots.trailing ? (w(), o("div", Jt, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16)], 2)], 8, ["disabled", "to"])) : a("", !0), H.value > 0 ? (w(), o("span", {
			key: 1,
			"aria-hidden": "true",
			class: "mat-app-bar__placeholder",
			style: v({ blockSize: `${H.value}px` })
		}, null, 4)) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-d4fd92ce"]]), Xt = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatInputBase",
	inheritAttrs: !1
}, {
	__name: "MatInputBase",
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
		disabled: {
			type: Boolean,
			default: !1
		},
		maxLength: {
			type: Number,
			default: void 0
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		required: {
			type: Boolean,
			default: !1
		},
		rows: {
			type: Number,
			default: void 0
		},
		type: {
			type: String,
			default: void 0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { expose: t, emit: n }) {
		let r = e, a = n, o = O(null);
		function s(e) {
			a("update:modelValue", e.target.value);
		}
		function c() {
			o.value?.focus();
		}
		function l() {
			return o.value;
		}
		return t({
			focusInput: c,
			getInput: l
		}), (e, t) => (w(), i(M(r.control), h({
			ref_key: "input",
			ref: o
		}, e.$attrs, {
			class: "mat-input-base",
			disabled: r.disabled,
			maxlength: r.maxLength,
			readonly: r.readonly,
			required: r.required,
			rows: r.control === "textarea" ? r.rows : void 0,
			type: r.control === "input" ? r.type : void 0,
			value: r.modelValue,
			onInput: s
		}), null, 16, [
			"disabled",
			"maxlength",
			"readonly",
			"required",
			"rows",
			"type",
			"value"
		]));
	}
}), [["__scopeId", "data-v-4243a17b"]]), Zt = { class: "mat-search__leading" }, Qt = {
	key: 0,
	class: "mat-search__trailing"
}, $t = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatSearch",
	inheritAttrs: !1
}, {
	__name: "MatSearch",
	props: {
		modelValue: {
			type: String,
			default: ""
		},
		label: {
			type: String,
			default: "Search"
		},
		placeholder: {
			type: String,
			default: "Search"
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		maxLength: {
			type: Number,
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "string",
		search: (e) => typeof e == "string"
	},
	setup(e, { expose: t, emit: n }) {
		let i = e, c = n, l = L(), d = O(null), f = r(() => ({
			class: l.class,
			style: l.style
		})), p = r(() => {
			let e = { ...l };
			return delete e.class, delete e.style, e;
		});
		function m() {
			i.disabled || c("search", i.modelValue);
		}
		function g() {
			d.value?.focusInput();
		}
		function _() {
			return d.value?.getInput() ?? null;
		}
		return t({
			focusInput: g,
			getInput: _
		}), (e, t) => (w(), o("form", h(f.value, {
			class: "mat-search",
			role: "search",
			onSubmit: W(m, ["prevent"])
		}), [
			s("span", Zt, [j(e.$slots, "leading", {}, () => [u(Mt, {
				disabled: i.disabled,
				icon: "search",
				label: i.label,
				size: "small",
				type: "button",
				variant: "standard",
				onClick: m
			}, null, 8, ["disabled", "label"])], !0)]),
			u(Xt, h({
				ref_key: "inputBase",
				ref: d
			}, p.value, {
				"aria-label": i.label,
				control: "input",
				disabled: i.disabled,
				"max-length": i.maxLength,
				"model-value": i.modelValue,
				placeholder: i.placeholder,
				readonly: i.readonly,
				type: "search",
				onKeydown: U(W(m, ["prevent"]), ["enter"]),
				"onUpdate:modelValue": t[0] ||= (e) => c("update:modelValue", e)
			}), null, 16, [
				"aria-label",
				"disabled",
				"max-length",
				"model-value",
				"placeholder",
				"readonly",
				"onKeydown"
			]),
			e.$slots.trailing ? (w(), o("span", Qt, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-b49800ec"]]), en = 150, tn = .75, nn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatBtnGroup",
	inheritAttrs: !1
}, {
	__name: "MatBtnGroup",
	props: {
		block: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "standard",
			validator(e) {
				return ["standard", "connected"].includes(e);
			}
		},
		size: {
			type: String,
			default: "small",
			validator(e) {
				return ae.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return oe.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		selection: {
			type: String,
			default: "none",
			validator(e) {
				return [
					"none",
					"single",
					"multiple"
				].includes(e);
			}
		},
		selected: {
			type: [
				String,
				Number,
				Boolean,
				Array
			],
			default: null
		},
		required: {
			type: Boolean,
			default: !1
		},
		fullWidth: {
			type: Boolean,
			default: !1
		}
	},
	emits: { select(e) {
		return e && Object.hasOwn(e, "value") && Object.hasOwn(e, "nextSelected") && e.originalEvent instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = e, i = t, a = O(null), s = O(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set(), d, f, p = en, m = !0, _ = !1, { colorStyle: v } = Ae(r(() => n.color));
		function y(e) {
			return n.selection === "multiple" ? Array.isArray(n.selected) && n.selected.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.selected, e);
		}
		function x(e, t) {
			if (e === void 0) {
				console.warn("MatBtnGroup: selection 不为 none 时，子按钮必须提供 value");
				return;
			}
			let r = y(e);
			if (n.selection === "single") {
				if (r && n.required) return;
				i("select", {
					value: e,
					selected: !r,
					nextSelected: r ? null : e,
					originalEvent: t
				});
				return;
			}
			if (n.selection === "multiple") {
				let a = Array.isArray(n.selected) ? n.selected : [];
				if (r && n.required && a.length === 1) return;
				i("select", {
					value: e,
					selected: !r,
					nextSelected: r ? a.filter((t) => !Object.is(t, e)) : [...a, e],
					originalEvent: t
				});
			}
		}
		T(Ot, {
			color: r(() => n.color),
			disabled: r(() => n.disabled),
			isSelected: y,
			requestSelection: x,
			selection: r(() => n.selection),
			shape: r(() => n.shape),
			size: r(() => n.size),
			variant: r(() => n.variant)
		});
		function C(e) {
			return e instanceof Element ? e.closest(".mat-button-base") : null;
		}
		function E(e) {
			let t = e.trim().match(/^(\d*\.?\d+)(ms|s)$/);
			if (!t) return null;
			let n = Number.parseFloat(t[1]);
			return t[2] === "s" ? n * 1e3 : n;
		}
		function D(e) {
			let [t] = getComputedStyle(e).transitionDuration.split(",");
			return E(t ?? "") ?? en;
		}
		function k() {
			return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function A() {
			d !== void 0 && (globalThis.clearTimeout(d), d = void 0);
		}
		function M() {
			f !== void 0 && (globalThis.clearTimeout(f), f = void 0);
		}
		function N() {
			A(), M(), u.forEach((e) => {
				let t = e;
				t.style.inlineSize = c.get(t) ?? "", c.delete(t), l.delete(t);
			}), u.clear(), s.value && delete s.value.dataset.matGroupPressed, s.value = null, p = en, m = !0, _ = !1;
		}
		function P() {
			if (A(), s.value) {
				if (k() || p === 0) {
					N();
					return;
				}
				u.forEach((e) => {
					let t = e;
					t.style.inlineSize = `${l.get(t)}px`;
				}), delete s.value.dataset.matGroupPressed, s.value = null, m = !0, _ = !1, f = globalThis.setTimeout(() => {
					f = void 0, N();
				}, p);
			}
		}
		function F() {
			if (s.value) {
				if (m) {
					P();
					return;
				}
				_ = !0;
			}
		}
		function L(e) {
			m = !1, _ = !1;
			let t = D(e);
			if (p = t, k() || t === 0) {
				m = !0;
				return;
			}
			d = globalThis.setTimeout(() => {
				d = void 0, s.value === e && (m = !0, _ && P());
			}, t * tn);
		}
		function R(e) {
			if (n.variant !== "standard" || e.disabled || s.value === e) return;
			let t = e;
			N();
			let r = [...a.value.querySelectorAll(".mat-button-base")], i = r.indexOf(t);
			if (r.length < 2 || i === -1) return;
			let o = Number.parseFloat(getComputedStyle(a.value).getPropertyValue("--mat-btn-group-standard-pressed-width-factor")) || 1.15, d = new Map(r.map((e) => [e, e.getBoundingClientRect().width])), f = d.get(t) * (o - 1), p = /* @__PURE__ */ new Map([[t, d.get(t) + f]]);
			if (i === 0) {
				let e = r[1];
				p.set(e, d.get(e) - f);
			} else if (i === r.length - 1) {
				let e = r[i - 1];
				p.set(e, d.get(e) - f);
			} else {
				let e = r[i - 1], t = r[i + 1], n = f / 2;
				p.set(e, d.get(e) - n), p.set(t, d.get(t) - n);
			}
			p.forEach((e, t) => {
				let n = t;
				c.set(n, n.style.inlineSize), l.set(n, d.get(n)), n.style.inlineSize = `${d.get(n)}px`, u.add(n);
			}), u.forEach((e) => {
				e.getBoundingClientRect();
			}), p.forEach((e, t) => {
				let n = t;
				n.style.inlineSize = `${e}px`;
			}), t.dataset.matGroupPressed = "", s.value = t, L(t);
		}
		async function z(e) {
			let t = C(e.target);
			t && (await g(), R(t));
		}
		function V(e) {
			e.relatedTarget instanceof Node && a.value?.contains(e.relatedTarget) || F();
		}
		async function H(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = C(e.target);
			t && (await g(), R(t));
		}
		function U() {
			if (n.variant !== "connected" || !a.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...a.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return S(U), b(N), B(() => [n.variant, n.selection], async () => {
			N(), await g(), U();
		}), (t, n) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, t.$attrs, {
			class: ["mat-btn-group", [
				`mat-btn-group--${e.variant}`,
				`mat-btn-group--size-${e.size}`,
				`mat-btn-group--shape-${e.shape}`,
				{
					"mat-btn-group--block": e.block,
					"mat-btn-group--full-width": e.variant === "connected" && e.fullWidth
				}
			]],
			style: I(v),
			role: "group",
			onFocusout: V,
			onKeydown: H,
			onKeyupCapture: F,
			onLostpointercaptureCapture: F,
			onPointercancelCapture: F,
			onPointerdown: z,
			onPointerupCapture: F
		}), [j(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-15b9823a"]]), rn = [
	"small",
	"medium",
	"large"
], an = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], on = [
	"button",
	"submit",
	"reset"
];
function sn(e) {
	return typeof e == "string" && an.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var cn = {
	key: 1,
	class: "mat-fab__label"
}, ln = {
	key: 1,
	class: "mat-fab__label"
}, un = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return rn.includes(e);
			}
		},
		icon: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || e.trim().length > 0;
			}
		},
		label: {
			type: String,
			default: void 0
		},
		color: {
			type: String,
			default: "primary-container",
			validator: sn
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return on.includes(e);
			}
		},
		app: {
			type: Boolean,
			default: !1
		},
		position: {
			type: String,
			default: "end",
			validator(e) {
				return [
					"start",
					"center",
					"end"
				].includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(t, { emit: s }) {
		let c = t, d = s, f = L(), m = z(), g = p(ie, re), _ = p(Ke, null), v = O(null), y = R(), b = r(() => (m.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = r(() => typeof c.icon == "string" && c.icon.trim().length > 0), S = r(() => !b.value), C = r(() => S.value ? f.title ?? c.label : void 0), T = r(() => S.value ? c.label : f["aria-label"]), E = r(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[c.size]), D = r(() => ({
			"--mat-fab-container-color": `var(--mat-sys-color-${c.color})`,
			"--mat-fab-content-color": `var(--mat-sys-color-on-${c.color})`,
			"--mat-fab-state-color": `var(--mat-sys-color-on-${c.color})`
		})), k = r(() => c.app && !!_), A = r(() => k.value ? _.floatingLayer.value : null);
		return V(() => {
			S.value && (!x.value || !c.label || c.label.trim().length === 0) && console.warn("MatFab: 图标模式必须提供非空 label");
		}), (e, r) => k.value ? A.value ? (w(), i(n, {
			key: 1,
			to: A.value
		}, [u(Q, h({
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${t.size}`,
				`mat-fab--position-${t.position}`,
				{
					"mat-fab--app-root": !0,
					"mat-fab--extended": b.value,
					"mat-fab--icon-only": S.value
				}
			]],
			style: D.value,
			"aria-label": T.value,
			disabled: t.disabled,
			title: S.value ? void 0 : I(f).title,
			type: t.type,
			"use-cursor": I(g).useCursor,
			onClick: r[1] ||= (e) => d("click", e)
		}), {
			default: H(() => [
				x.value ? (w(), i(Me, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": E.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [l(F(t.icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : a("", !0),
				b.value ? (w(), o("span", ln, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(Dt, {
					key: 2,
					content: C.value,
					id: `${I(y)}-tooltip`,
					target: v.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : a("", !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-label",
			"disabled",
			"title",
			"type",
			"use-cursor"
		])], 8, ["to"])) : a("", !0) : (w(), i(Q, h({
			key: 0,
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [`mat-fab--size-${t.size}`, {
				"mat-fab--extended": b.value,
				"mat-fab--icon-only": S.value
			}]],
			style: D.value,
			"aria-label": T.value,
			disabled: t.disabled,
			title: S.value ? void 0 : I(f).title,
			type: t.type,
			"use-cursor": I(g).useCursor,
			onClick: r[0] ||= (e) => d("click", e)
		}), {
			default: H(() => [
				x.value ? (w(), i(Me, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": E.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [l(F(t.icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : a("", !0),
				b.value ? (w(), o("span", cn, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(Dt, {
					key: 2,
					content: C.value,
					id: `${I(y)}-tooltip`,
					target: v.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : a("", !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-label",
			"disabled",
			"title",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-2fe45c13"]]), dn = ["src"], fn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatImage",
	inheritAttrs: !1
}, {
	__name: "MatImage",
	props: {
		src: {
			type: String,
			required: !0,
			validator(e) {
				return e === void 0 || e.length > 0;
			}
		},
		radius: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Le(e, { property: "border-radius" })
		},
		fit: {
			type: String,
			default: "cover",
			validator(e) {
				return ["cover", "contain"].includes(e);
			}
		},
		outline: {
			type: Boolean,
			default: !0
		},
		aspectRatio: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Le(e, {
				property: "aspect-ratio",
				positive: !0
			})
		},
		imgClass: {
			type: [
				String,
				Array,
				Object
			],
			default: void 0
		},
		imgStyle: {
			type: [
				String,
				Array,
				Object
			],
			default: void 0
		}
	},
	setup(e) {
		let t = e, n = L(), i = r(() => ({
			class: n.class,
			style: n.style
		})), a = r(() => Object.fromEntries(Object.entries(n).filter(([e]) => !["class", "style"].includes(e)))), c = r(() => ({
			aspectRatio: ze(t.aspectRatio, {
				property: "aspect-ratio",
				positive: !0
			}),
			borderRadius: t.radius === void 0 ? "var(--mat-sys-shape-corner-extra-large)" : Re(t.radius, {
				property: "border-radius",
				fallback: "var(--mat-sys-shape-corner-extra-large)"
			}),
			outline: t.outline ? "1px solid var(--mat-sys-color-outline)" : void 0
		})), l = r(() => {
			let e = { objectFit: t.fit };
			return typeof t.imgStyle == "string" ? [e, t.imgStyle] : Array.isArray(t.imgStyle) ? [e, ...t.imgStyle] : {
				...e,
				...t.imgStyle
			};
		});
		return (e, n) => (w(), o("div", h(i.value, {
			class: "mat-image",
			style: c.value
		}), [s("img", h(a.value, {
			class: ["mat-image__img", t.imgClass],
			style: l.value,
			src: t.src
		}), null, 16, dn)], 16));
	}
}), [["__scopeId", "data-v-715a8cba"]]), pn = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = p(kt), a = z();
		T(kt, {
			...r,
			role: n.role
		});
		function o(e) {
			return e.flatMap((e) => m(e) && e.type === t && Array.isArray(e.children) ? o(e.children) : [e]);
		}
		function s() {
			return o(a.default?.() ?? []).find((e) => m(e) && (e.type?.name ?? e.type?.__name) === "MatBtn") ?? null;
		}
		return (e, t) => (w(), i(s));
	}
}), mn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatSplitBtn",
	inheritAttrs: !1
}, {
	__name: "MatSplitBtn",
	props: {
		block: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "filled",
			validator(e) {
				return [
					"elevated",
					"filled",
					"filled-tonal",
					"outlined"
				].includes(e);
			}
		},
		size: {
			type: String,
			default: "small",
			validator(e) {
				return ae.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		expanded: {
			type: Boolean,
			default: !1
		},
		controls: {
			type: String,
			default: void 0
		}
	},
	emits: {
		"leading-click": (e) => e instanceof MouseEvent,
		"trailing-click": (e) => e instanceof MouseEvent,
		"update:expanded": (e) => typeof e == "boolean"
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = O(null), c = z(), { colorStyle: l, hasExplicitColor: d } = Ae(r(() => n.color));
		T(kt, {
			color: r(() => n.color),
			controls: r(() => n.controls),
			disabled: r(() => n.disabled),
			expanded: r(() => n.expanded),
			size: r(() => n.size),
			variant: r(() => n.variant)
		});
		function f(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || i("leading-click", e);
		}
		function p(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || (i("trailing-click", e), i("update:expanded", !n.expanded));
		}
		function m() {
			if (!a.value) return;
			(!c.leading || a.value.querySelectorAll(".mat-split-btn__leading .mat-button-base").length !== 1) && console.warn("MatSplitBtn: leading slot 必须提供一个 MatBtn");
			let e = a.value.querySelectorAll(".mat-split-btn__trailing .mat-btn--icon");
			(!c.trailing || e.length !== 1) && console.warn("MatSplitBtn: trailing slot 必须提供一个图标模式 MatBtn");
		}
		return S(m), B(() => [n.size, n.variant], async () => {
			await g(), m();
		}), (t, n) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, t.$attrs, {
			class: ["mat-split-btn", [
				`mat-split-btn--${e.variant}`,
				`mat-split-btn--size-${e.size}`,
				{
					"mat-split-btn--block": e.block,
					"mat-split-btn--expanded": e.expanded,
					"mat-split-btn--explicit-color": I(d)
				}
			]],
			style: I(l),
			role: "group"
		}), [s("span", {
			class: "mat-split-btn__segment mat-split-btn__leading",
			onClick: f
		}, [u(pn, { role: "leading" }, {
			default: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), s("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [u(pn, { role: "trailing" }, {
			default: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-647c3562"]]), hn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatSurfaceBase",
	inheritAttrs: !1
}, {
	__name: "MatSurfaceBase",
	props: { as: {
		type: String,
		default: "div"
	} },
	setup(e, { expose: t }) {
		let n = O(null);
		return t({ root: n }), (t, r) => (w(), i(M(e.as), h({
			ref_key: "root",
			ref: n
		}, t.$attrs, { class: "mat-surface-base" }), {
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-76b082b5"]]), gn = { class: "mat-card-headline" }, _n = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (w(), o("div", gn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-acf29196"]]), vn = { class: "mat-card-media" }, yn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (w(), o("div", vn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-7208424e"]]), bn = { class: "mat-card-subhead" }, xn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (w(), o("div", bn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-2c6ca74d"]]), Sn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatCard",
	inheritAttrs: !1
}, {
	__name: "MatCard",
	props: {
		variant: {
			type: String,
			default: "filled",
			validator: (e) => [
				"elevated",
				"filled",
				"outlined"
			].includes(e)
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		as: {
			type: String,
			default: "div",
			validator: (e) => [
				"div",
				"article",
				"section",
				"li"
			].includes(e)
		}
	},
	setup(e) {
		let t = e, { colorStyle: n, hasExplicitColor: o } = Ae(r(() => t.color));
		return (t, r) => (w(), i(hn, h(t.$attrs, {
			class: ["mat-card", [`mat-card--${e.variant}`, { "mat-card--explicit-color": I(o) }]],
			style: I(n),
			as: e.as
		}), {
			default: H(() => [
				t.$slots.media ? (w(), i(yn, { key: 0 }, {
					default: H(() => [j(t.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.headline ? (w(), i(_n, { key: 1 }, {
					default: H(() => [j(t.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.subhead ? (w(), i(xn, { key: 2 }, {
					default: H(() => [j(t.$slots, "subhead", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				j(t.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"as"
		]));
	}
}), [["__scopeId", "data-v-c8df8af3"]]), Cn = { class: "mat-card-action-area__content" }, wn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatCardActionArea",
	inheritAttrs: !1
}, {
	__name: "MatCardActionArea",
	props: {
		href: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator: (e) => se.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = t, r = p(ie, re);
		return (t, a) => (w(), i(te, h(t.$attrs, {
			class: "mat-card-action-area",
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			type: e.type,
			"use-cursor": I(r).useCursor,
			onClick: a[0] ||= (e) => n("click", e)
		}), {
			default: H(() => [s("span", Cn, [j(t.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-7e019121"]]), Tn = { class: "mat-card-content" }, En = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (w(), o("div", Tn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-8a32cf5d"]]), Dn = { class: "mat-card-actions" }, On = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (w(), o("div", Dn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-f3e5f8e6"]]), kn = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], An = Symbol("mat-list"), jn = Symbol("mat-list-group-activator");
function Mn(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function Nn(e) {
	let t = /* @__PURE__ */ new Map(), n = null, r, i = !1;
	function a() {
		return e.root.value ? [...e.root.value.querySelectorAll(e.selector)].filter((e) => e instanceof HTMLElement).filter((n) => {
			let r = t.has(n) ? t.get(n) : n.getAttribute("tabindex");
			return r !== null && Number(r) < 0 ? !1 : e.isAvailable?.(n) ?? !0;
		}) : [];
	}
	function o(e) {
		t.has(e) || t.set(e, e.getAttribute("tabindex"));
	}
	function s(e) {
		let n = t.get(e);
		n === null ? e.removeAttribute("tabindex") : n !== void 0 && e.setAttribute("tabindex", n), t.delete(e);
	}
	function c() {
		[...t.keys()].forEach(s), n = null, r?.disconnect(), r = void 0;
	}
	function l() {
		i = !1;
		let r = a(), c = new Set(r);
		[...t.keys()].forEach((e) => {
			c.has(e) || s(e);
		}), (!n || !c.has(n)) && (n = e.findInitial?.(r) ?? r[0] ?? null), r.forEach((e) => {
			o(e), e.setAttribute("tabindex", e === n ? "0" : "-1");
		});
	}
	function u() {
		i || (i = !0, queueMicrotask(l));
	}
	function d(e) {
		e && (n = e, l(), e.focus());
	}
	function f() {
		d(a()[0] ?? null);
	}
	function p() {
		d(a().at(-1) ?? null);
	}
	function m(e, t) {
		let n = a(), r = n.indexOf(e);
		r === -1 || n.length === 0 || d(n[(r + t + n.length) % n.length]);
	}
	function h(e) {
		let t = a();
		e.target instanceof HTMLElement && t.includes(e.target) && (n = e.target, l());
	}
	function g() {
		r?.disconnect(), r = void 0, e.root.value && (r = new MutationObserver(u), r.observe(e.root.value, {
			attributes: !0,
			attributeFilter: e.observedAttributes ?? ["aria-disabled", "disabled"],
			childList: !0,
			subtree: !0
		}), u());
	}
	function _() {
		n = null;
	}
	return b(c), {
		collect: a,
		focusFirst: f,
		focusLast: p,
		handleFocusIn: h,
		move: m,
		observe: g,
		queueRefresh: u,
		refresh: l,
		resetActive: _,
		restore: c
	};
}
//#endregion
//#region src/components/selection-control.js
function Pn(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function Fn(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(Pn);
}
var In = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatList",
	inheritAttrs: !1
}, {
	__name: "MatList",
	props: {
		variant: {
			type: String,
			default: "segmented",
			validator(e) {
				return ["standard", "segmented"].includes(e);
			}
		},
		interaction: {
			type: String,
			default: "none",
			validator(e) {
				return kn.includes(e);
			}
		},
		selected: {
			type: [
				String,
				Number,
				Boolean,
				Array
			],
			default: null
		},
		expanded: {
			type: Array,
			default: () => [],
			validator(e) {
				return e.every(Pn);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		}
	},
	emits: {
		select(e) {
			return e && Object.hasOwn(e, "value") && Object.hasOwn(e, "nextSelected") && e.originalEvent instanceof Event;
		},
		"update:expanded"(e) {
			return Array.isArray(e) && e.every(Pn);
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = O(null), s = r(() => Mn(n.interaction)), c = r(() => s.value ? "div" : "ul"), { colorStyle: l } = Ae(r(() => n.color)), u = [], d = [
			"[data-mat-list-primary]",
			"[data-mat-list-trailing] a[href]",
			"[data-mat-list-trailing] button",
			"[data-mat-list-trailing] input",
			"[data-mat-list-trailing] select",
			"[data-mat-list-trailing] textarea",
			"[data-mat-list-trailing] [contenteditable]:not([contenteditable=\"false\"])",
			"[data-mat-list-trailing] [tabindex]"
		].join(",");
		function f(e) {
			return n.interaction === "multi-select" ? Array.isArray(n.selected) && n.selected.some((t) => Object.is(t, e)) : n.interaction === "single-select" && Object.is(n.selected, e);
		}
		function p(e, t) {
			if (e === void 0) {
				console.warn("MatList: 选择模式下的 MatListItem 必须提供 value");
				return;
			}
			let r = f(e);
			if (n.interaction === "single-select") {
				if (r) return;
				a("select", {
					value: e,
					selected: !0,
					nextSelected: e,
					originalEvent: t
				});
				return;
			}
			if (n.interaction === "multi-select") {
				let i = Array.isArray(n.selected) ? n.selected : [];
				a("select", {
					value: e,
					selected: !r,
					nextSelected: r ? i.filter((t) => !Object.is(t, e)) : [...i, e],
					originalEvent: t
				});
			}
		}
		function m(e) {
			return n.expanded.some((t) => Object.is(t, e));
		}
		function _(e, t) {
			m(e) !== t && a("update:expanded", t ? [...n.expanded, e] : n.expanded.filter((t) => !Object.is(t, e)));
		}
		function v(e, t) {
			u.some((n) => n.token !== e && Object.is(n.value, t)) && console.warn(`MatListGroup: 同一 MatList 中的 value 必须唯一，重复值为 ${String(t)}`), u.push({
				token: e,
				value: t
			});
		}
		function y(e) {
			let t = u.findIndex((t) => t.token === e);
			t !== -1 && u.splice(t, 1);
		}
		function b(e) {
			return !(e instanceof HTMLElement) || e.closest("[data-mat-list-disabled=\"true\"]") || e.closest("[data-mat-list-group-content][inert]") || e.matches(":disabled") || e.getAttribute("aria-disabled") === "true" ? !1 : e.hasAttribute("data-mat-list-group-activator") ? !0 : !e.hasAttribute("data-mat-list-primary") && n.interaction !== "multi-action" ? !1 : n.interaction !== "none";
		}
		function x(e) {
			if (s.value) {
				let t = e.find((e) => e.getAttribute("aria-selected") === "true");
				if (t) return t;
			}
			return e[0] ?? null;
		}
		let C = Nn({
			root: o,
			selector: d,
			isAvailable: b,
			findInitial: x,
			observedAttributes: [
				"aria-disabled",
				"aria-hidden",
				"disabled",
				"href",
				"inert"
			]
		});
		function E(e) {
			let t = {
				ArrowDown: 1,
				ArrowRight: 1,
				ArrowUp: -1,
				ArrowLeft: -1
			}[e.key];
			t === void 0 || !(e.target instanceof HTMLElement) || (e.preventDefault(), C.move(e.target, t));
		}
		return T(An, {
			interaction: r(() => n.interaction),
			isSelectable: s,
			variant: r(() => n.variant),
			isGroupExpanded: m,
			isSelected: f,
			registerGroupValue: v,
			requestFocusRefresh: C.queueRefresh,
			requestGroupExpanded: _,
			requestSelection: p,
			unregisterGroupValue: y
		}), S(C.observe), B(o, async () => {
			C.restore(), await g(), C.observe();
		}), B(() => n.interaction, async () => {
			C.restore(), await g(), C.observe();
		}), B(() => n.selected, async () => {
			o.value?.contains(document.activeElement) || C.resetActive(), await g(), C.queueRefresh();
		}, { deep: !0 }), (t, n) => (w(), i(M(c.value), h({
			ref_key: "root",
			ref: o
		}, t.$attrs, {
			class: ["mat-list", `mat-list--${e.variant}`],
			style: I(l),
			"aria-multiselectable": e.interaction === "multi-select" ? "true" : t.$attrs["aria-multiselectable"],
			"aria-orientation": s.value ? "vertical" : t.$attrs["aria-orientation"],
			role: s.value ? "listbox" : t.$attrs.role,
			onFocusin: I(C).handleFocusIn,
			onKeydown: E
		}), {
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-multiselectable",
			"aria-orientation",
			"role",
			"onFocusin"
		]));
	}
}), [["__scopeId", "data-v-8ff1fa12"]]), Ln = ["data-line-count"], Rn = ["inert"], zn = ["inert"], Bn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
	__name: "MatItemContentBase",
	props: {
		namespace: {
			type: String,
			required: !0
		},
		lineCount: {
			type: Number,
			required: !0,
			validator(e) {
				return [
					1,
					2,
					3
				].includes(e);
			}
		},
		separateTrailing: {
			type: Boolean,
			default: !1
		},
		presentationSlots: {
			type: Boolean,
			default: !1
		},
		leadingIcon: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (t, n) => (w(), o("span", {
			"data-mat-item-content": "",
			"data-line-count": e.lineCount,
			class: _([
				e.namespace,
				`${e.namespace}--lines-${e.lineCount}`,
				{ [`${e.namespace}--separate-trailing`]: e.separateTrailing }
			])
		}, [
			t.$slots.leading ? (w(), o("span", {
				key: 0,
				"data-mat-item-content-leading": "",
				class: _(`${e.namespace}__leading`),
				inert: e.presentationSlots ? "" : void 0
			}, [e.leadingIcon ? (w(), i(Me, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : j(t.$slots, "leading", { key: 1 }, void 0, !0)], 10, Rn)) : a("", !0),
			s("span", {
				"data-mat-item-content-text": "",
				class: _(`${e.namespace}__text`)
			}, [
				t.$slots.overline ? (w(), o("span", {
					key: 0,
					"data-mat-item-content-overline": "",
					class: _(`${e.namespace}__overline`)
				}, [j(t.$slots, "overline", {}, void 0, !0)], 2)) : a("", !0),
				s("span", {
					"data-mat-item-content-label": "",
					class: _(`${e.namespace}__label`)
				}, [j(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.supporting ? (w(), o("span", {
					key: 1,
					"data-mat-item-content-supporting": "",
					class: _(`${e.namespace}__supporting`)
				}, [j(t.$slots, "supporting", {}, void 0, !0)], 2)) : a("", !0)
			], 2),
			t.$slots.trailing && !e.separateTrailing ? (w(), o("span", {
				key: 1,
				"data-mat-item-content-trailing": "",
				class: _(`${e.namespace}__trailing`),
				inert: e.presentationSlots ? "" : void 0
			}, [j(t.$slots, "trailing", {}, void 0, !0)], 10, zn)) : a("", !0)
		], 10, Ln));
	}
}), [["__scopeId", "data-v-7cb38b5a"]]), Vn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
	__name: "MatListItemContent",
	props: {
		lineCount: {
			type: Number,
			required: !0
		},
		separateTrailing: {
			type: Boolean,
			default: !1
		},
		presentationSlots: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (t, n) => (w(), i(Bn, {
			namespace: "mat-list-item-content",
			"line-count": e.lineCount,
			"presentation-slots": e.presentationSlots,
			"separate-trailing": e.separateTrailing
		}, c({
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: H(() => [j(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: H(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, [
			"line-count",
			"presentation-slots",
			"separate-trailing"
		]));
	}
}), [["__scopeId", "data-v-2d1ef745"]]), Hn = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], Un = ["aria-disabled", "data-mat-list-disabled"], Wn = ["aria-disabled", "data-mat-list-disabled"], Gn = ["inert"], Kn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatListItem",
	inheritAttrs: !1
}, {
	__name: "MatListItem",
	props: {
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		href: {
			type: String,
			default: void 0
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return se.includes(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		lines: {
			type: Number,
			default: void 0,
			validator(e) {
				return [
					1,
					2,
					3
				].includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = e, s = t, l = z(), d = p(An, null), f = p(jn, null), m = p(ie, re), v = r(() => d?.interaction.value ?? "none"), y = r(() => v.value === "single-action" || v.value === "multi-action"), b = r(() => v.value === "multi-action"), x = r(() => d?.isSelectable.value ?? !1), C = r(() => d?.isSelected(n.value) ?? !1), T = r(() => !!l.trailing), E = r(() => {
			if (n.lines !== void 0) return n.lines;
			let e = Number(!!l.overline) + Number(!!l.supporting);
			return Math.min(3, 1 + e);
		}), D = r(() => ({
			"mat-list-item--disabled": n.disabled,
			"mat-list-item--selected": C.value,
			[`mat-list-item--lines-${E.value}`]: !0
		}));
		function O(e) {
			if (x.value) {
				d?.requestSelection(n.value, e);
				return;
			}
			y.value && s("click", e);
		}
		function k() {
			n.disabled || f?.toggle();
		}
		function A(e) {
			n.disabled || e.repeat || ![" ", "Enter"].includes(e.key) || (e.preventDefault(), d?.requestSelection(n.value, e));
		}
		function M() {
			n.href !== void 0 && !f && !y.value && console.warn("MatListItem: href 仅在 single-action 或 multi-action 模式下生效");
		}
		return S(async () => {
			M(), await g(), d?.requestFocusRefresh();
		}), B(() => [
			n.disabled,
			n.href,
			v.value
		], async () => {
			M(), await g(), d?.requestFocusRefresh();
		}), (t, n) => I(f)?.static.value ? (w(), o("div", h({ key: 0 }, t.$attrs, {
			id: I(f).labelId,
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", D.value],
			"data-mat-list-group-label": "",
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}), [u(Vn, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: H(() => [j(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: H(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, Hn)) : I(f) ? (w(), i(te, h({ key: 1 }, t.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-group-activator": "",
			"aria-controls": I(f).contentId,
			"aria-expanded": I(f).expanded.value ? "true" : "false",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			disabled: e.disabled,
			"focus-ring": !0,
			type: "button",
			"use-cursor": I(m).useCursor,
			onClick: k
		}), {
			default: H(() => [u(Vn, {
				"line-count": E.value,
				"presentation-slots": !1
			}, c({
				default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: H(() => [j(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: H(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
					key: "3"
				} : void 0
			]), 1032, ["line-count"])]),
			_: 3
		}, 16, [
			"class",
			"aria-controls",
			"aria-expanded",
			"data-mat-list-disabled",
			"disabled",
			"use-cursor"
		])) : v.value === "none" ? (w(), o("li", h({ key: 2 }, t.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", D.value],
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}), [u(Vn, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: H(() => [j(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: H(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, Un)) : y.value ? (w(), o("li", {
			key: 3,
			class: _(["mat-list-item", [D.value, {
				"mat-list-item__surface": b.value,
				"mat-list-item--multi-action": b.value
			}]]),
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}, [u(te, h(t.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !b.value }],
			"data-mat-list-primary": "",
			disabled: e.disabled,
			"focus-ring": !0,
			href: e.href,
			type: e.type,
			"use-cursor": I(m).useCursor,
			onClick: O
		}), {
			default: H(() => [u(Vn, {
				"line-count": E.value,
				"presentation-slots": !1,
				"separate-trailing": b.value && T.value
			}, c({
				default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: H(() => [j(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: H(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
					key: "3"
				} : void 0
			]), 1032, ["line-count", "separate-trailing"])]),
			_: 3
		}, 16, [
			"class",
			"disabled",
			"href",
			"type",
			"use-cursor"
		]), b.value && T.value ? (w(), o("span", {
			key: 0,
			class: "mat-list-item__separate-trailing",
			"data-mat-list-trailing": "",
			inert: e.disabled ? "" : void 0
		}, [j(t.$slots, "trailing", {}, void 0, !0)], 8, Gn)) : a("", !0)], 10, Wn)) : (w(), i(te, h({ key: 4 }, t.$attrs, {
			as: "div",
			class: ["mat-list-item mat-list-item__surface mat-list-item--selectable", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			"aria-selected": C.value ? "true" : "false",
			disabled: e.disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": I(m).useCursor,
			onClick: O,
			onKeydown: A
		}), {
			default: H(() => [u(Vn, {
				"line-count": E.value,
				"presentation-slots": ""
			}, c({
				default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: H(() => [j(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: H(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
					key: "3"
				} : void 0
			]), 1032, ["line-count"])]),
			_: 3
		}, 16, [
			"class",
			"data-mat-list-disabled",
			"aria-selected",
			"disabled",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-a787e932"]]), qn = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return T(jn, e.context), (e, t) => j(e.$slots, "default");
	}
}), Jn = [
	"role",
	"aria-hidden",
	"inert"
], Yn = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatListGroup",
	inheritAttrs: !1
}, {
	__name: "MatListGroup",
	props: { value: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	} },
	setup(n) {
		let a = n, o = p(An, null), c = z(), l = O(null), d = O(!1), f = O(null), _ = Symbol("mat-list-group"), v = R().replace(/[^\w-]/g, "-"), y = `mat-list-group-${v}-content`, x = `mat-list-group-${v}-label`, T = !1, E, D = r(() => a.value !== void 0), k = r(() => o?.isSelectable.value ?? !1), A = r(() => D.value ? o?.isGroupExpanded(a.value) ?? !1 : d.value);
		function N(n) {
			return n.flatMap((n) => m(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? N(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = r(() => {
			let e = N(c.activator?.({ expanded: A.value }) ?? []);
			if (e.length !== 1 || !m(e[0])) return !1;
			let t = e[0].type;
			return t === Kn || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), F = r(() => f.value ?? P.value), I = r(() => k.value || !F.value || A.value), L = r(() => o?.variant.value ?? "segmented");
		function V() {
			(l.value?.querySelector(":scope > [data-mat-list-group-content]"))?.contains(document.activeElement) && l.value?.querySelector(":scope > [data-mat-list-group-activator]")?.focus();
		}
		function U() {
			if (!(k.value || !F.value)) {
				if (A.value && V(), D.value) {
					o?.requestGroupExpanded(a.value, !A.value);
					return;
				}
				d.value = !d.value;
			}
		}
		let W = {
			contentId: y,
			expanded: I,
			labelId: x,
			static: k,
			toggle: U
		};
		function G() {
			!F.value && !T ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), T = !0) : F.value && (T = !1);
		}
		function K() {
			if (!l.value) return;
			let e = k.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(l.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			f.value !== t && (f.value = t);
		}
		function q() {
			K(), G();
		}
		function ee(e) {
			e !== void 0 && (o?.registerGroupValue(_, e), E = e);
		}
		function J() {
			E !== void 0 && (o?.unregisterGroupValue(_), E = void 0);
		}
		return S(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), k.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), ee(a.value), q(), o?.requestFocusRefresh();
		}), C(q), b(() => {
			J(), o?.requestFocusRefresh();
		}), B(() => a.value, (e, t) => {
			Object.is(e, t) || (J(), ee(e));
		}), B(A, async (e, t) => {
			t && !e && V(), await g(), o?.requestFocusRefresh();
		}), B(k, async (e, t) => {
			e && !t && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), await g(), o?.requestFocusRefresh();
		}), (e, t) => (w(), i(M(k.value ? "div" : "li"), h({
			ref_key: "root",
			ref: l
		}, e.$attrs, {
			class: ["mat-list-group", [`mat-list-group--${L.value}`, {
				"mat-list-group--expanded": I.value,
				"mat-list-group--selectable-fallback": k.value
			}]],
			role: k.value ? "group" : void 0,
			"aria-labelledby": k.value ? x : void 0
		}), {
			default: H(() => [u(qn, { context: W }, {
				default: H(() => [j(e.$slots, "activator", { expanded: I.value }, void 0, !0)]),
				_: 3
			}), s("div", {
				id: y,
				class: "mat-list-group__content",
				"data-mat-list-group-content": "",
				role: k.value ? "presentation" : void 0,
				"aria-hidden": I.value ? void 0 : "true",
				inert: I.value ? void 0 : ""
			}, [(w(), i(M(k.value ? "div" : "ul"), {
				class: "mat-list-group__items",
				role: k.value ? "presentation" : void 0
			}, {
				default: H(() => [j(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, ["role"]))], 8, Jn)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-4fe2a3e4"]]), Xn = Symbol("mat-menu"), Zn = Symbol("mat-menu-item"), Qn = Symbol("mat-menu-group");
function $n(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function er(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = $n(t, a, o), c = $n(e, a, o), l = $n(t, e, o), u = $n(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function tr(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var nr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatDivider",
	inheritAttrs: !1
}, {
	__name: "MatDivider",
	props: { inset: {
		type: [Boolean, String],
		default: !1,
		validator(e) {
			return typeof e == "boolean" || [
				"none",
				"start",
				"middle"
			].includes(e);
		}
	} },
	setup(e) {
		let t = e, n = p(An, null), a = p(Xn, null), o = r(() => !!n), s = r(() => !!a), c = r(() => n?.isSelectable.value ?? !1), l = r(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = r(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
		return (e, t) => (w(), i(M(u.value), h(e.$attrs, {
			class: ["mat-divider", [`mat-divider--${l.value}`, { "mat-divider--menu": s.value }]],
			"aria-hidden": c.value ? "true" : e.$attrs["aria-hidden"],
			role: c.value ? "presentation" : o.value || s.value ? "separator" : e.$attrs.role
		}), null, 16, [
			"class",
			"aria-hidden",
			"role"
		]));
	}
}), [["__scopeId", "data-v-2eb6ec37"]]), rr = { class: "mat-selection-control__target" }, ir = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], ar = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, or = {
	key: 0,
	class: "mat-selection-control__label"
}, sr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
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
			validator: $
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
	setup(e, { expose: t, emit: n }) {
		let i = e, c = n, l = L(), u = z(), d = O(null), f = p(ie, re), { colorStyle: m } = Ae(r(() => i.color)), g = r(() => {
			let e = {};
			return [
				"class",
				"inert",
				"aria-hidden"
			].forEach((t) => {
				l[t] !== void 0 && (e[t] = l[t]);
			}), e;
		}), _ = r(() => Object.fromEntries(Object.entries(l).filter(([e]) => ![
			"class",
			"style",
			"inert",
			"aria-hidden"
		].includes(e)))), v = r(() => [m.value, l.style]), y = r(() => l.inert !== void 0 || l["aria-hidden"] === !0 || l["aria-hidden"] === "true");
		S(() => {
			!u.default && !_.value["aria-label"] && !y.value && console.warn(`${i.labelName}: 缺少默认标签内容时必须提供 aria-label`);
		});
		function b() {
			d.value?.focus();
		}
		function x() {
			return d.value;
		}
		return t({
			focusInput: b,
			getInput: x
		}), (t, n) => (w(), o("label", h(g.value, {
			class: ["mat-selection-control", {
				"mat-selection-control--checked": e.checked,
				"mat-selection-control--disabled": e.disabled,
				"mat-selection-control--use-cursor": I(f).useCursor
			}],
			style: v.value
		}), [s("span", rr, [
			s("input", h({
				ref_key: "input",
				ref: d
			}, _.value, {
				class: "mat-selection-control__input",
				"aria-checked": e.indeterminate ? "mixed" : e.checked,
				checked: e.checked,
				disabled: e.disabled,
				indeterminate: e.indeterminate,
				role: e.inputRole,
				tabindex: e.tabindex,
				type: e.inputType,
				value: e.inputValue,
				onChange: n[0] ||= (e) => c("change", e),
				onKeydown: n[1] ||= (e) => c("keydown", e)
			}), null, 16, ir),
			n[2] ||= s("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			s("span", ar, [j(t.$slots, "indicator", {}, void 0, !0)])
		]), I(u).default ? (w(), o("span", or, [j(t.$slots, "default", {}, void 0, !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-4dcfac60"]]), cr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: Fn
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: Pn
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
			validator: $
		}
	},
	emits: {
		"update:modelValue": Fn,
		"update:indeterminate"(e) {
			return typeof e == "boolean";
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = r(() => Array.isArray(n.modelValue) ? n.modelValue.some((e) => Object.is(e, n.value)) : n.modelValue);
		function c(e) {
			let t = e.target.checked;
			if (Array.isArray(n.modelValue)) {
				let e = t ? [...n.modelValue, n.value] : n.modelValue.filter((e) => !Object.is(e, n.value));
				a("update:modelValue", e);
			} else a("update:modelValue", t);
			a("update:indeterminate", !1), a("change", e);
		}
		return (t, n) => (w(), i(sr, h(t.$attrs, {
			class: ["mat-checkbox", {
				"mat-checkbox--checked": o.value,
				"mat-checkbox--indeterminate": e.indeterminate
			}],
			checked: o.value,
			color: e.color,
			disabled: e.disabled,
			indeterminate: e.indeterminate,
			"input-type": "checkbox",
			"input-value": e.value,
			"label-name": "MatCheckbox",
			onChange: c
		}), {
			indicator: H(() => [...n[0] ||= [s("span", { class: "mat-checkbox__box" }, [s("span", { class: "mat-checkbox__check" }), s("span", { class: "mat-checkbox__mixed" })], -1)]]),
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-3d8ac819"]]), lr = Symbol("mat-chip-set"), ur = {
	key: 0,
	class: "mat-chip__avatar",
	"aria-hidden": "true",
	inert: ""
}, dr = {
	key: 1,
	class: "mat-chip__icon mat-chip__icon--leading",
	"aria-hidden": "true",
	inert: ""
}, fr = { class: "mat-chip__label" }, pr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatChip",
	inheritAttrs: !1
}, {
	__name: "MatChip",
	props: {
		variant: {
			type: String,
			default: "assist",
			validator(e) {
				return [
					"assist",
					"filter",
					"input",
					"suggestion"
				].includes(e);
			}
		},
		elevated: {
			type: Boolean,
			default: !1
		},
		selected: {
			type: Boolean,
			default: !1
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0,
			validator(e) {
				return e === void 0 || Pn(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return se.includes(e);
			}
		}
	},
	emits: {
		click(e) {
			return e instanceof MouseEvent;
		},
		remove(e) {
			return e instanceof MouseEvent;
		}
	},
	setup(e, { emit: t }) {
		let n = e, c = t, l = z(), u = p(ie, re), d = p(lr, null), f = r(() => ["filter", "input"].includes(n.variant)), m = r(() => !!d && f.value && n.value !== void 0 && d.selection.value !== "none"), g = r(() => m.value ? d.isSelected(n.value) : f.value && n.selected), _ = r(() => !!l.avatar), v = r(() => !_.value && !!l.leading), y = r(() => n.variant === "filter" && g.value && !_.value && !v.value), b = r(() => _.value || v.value || y.value), x = r(() => !!l.trailing || n.variant === "input"), { colorStyle: S, hasExplicitColor: C } = Ae(r(() => n.color));
		function T(e) {
			c("click", e), m.value && d.requestSelection(n.value, e);
		}
		function E(e) {
			n.variant !== "input" || l.trailing || (e.stopPropagation(), n.disabled || c("remove", e));
		}
		return (t, n) => (w(), i(te, h(t.$attrs, {
			class: ["mat-chip", [`mat-chip--${e.variant}`, {
				"mat-chip--elevated": e.elevated,
				"mat-chip--selected": g.value,
				"mat-chip--explicit-color": I(C),
				"mat-chip--has-leading": b.value,
				"mat-chip--has-avatar": _.value,
				"mat-chip--has-trailing": x.value
			}]],
			style: I(S),
			"aria-pressed": f.value ? String(g.value) : void 0,
			disabled: e.disabled,
			type: e.type,
			"use-cursor": I(u).useCursor,
			onClick: T
		}), {
			default: H(() => [
				_.value ? (w(), o("span", ur, [j(t.$slots, "avatar", {}, void 0, !0)])) : v.value || y.value ? (w(), o("span", dr, [v.value ? j(t.$slots, "leading", { key: 0 }, void 0, !0) : (w(), i(Me, {
					key: 1,
					as: "span",
					icon: "check",
					"optical-size": 20,
					size: "18px"
				}))])) : a("", !0),
				s("span", fr, [j(t.$slots, "default", {}, void 0, !0)]),
				x.value ? (w(), o("span", {
					key: 2,
					class: "mat-chip__icon mat-chip__icon--trailing",
					"aria-hidden": "true",
					onClick: E
				}, [t.$slots.trailing ? j(t.$slots, "trailing", { key: 0 }, void 0, !0) : (w(), i(Me, {
					key: 1,
					as: "span",
					icon: "close",
					"optical-size": 20,
					size: "18px"
				}))])) : a("", !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-pressed",
			"disabled",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-13204782"]]), mr = {
	key: 0,
	class: "mat-scroll-area__fixed"
}, hr = {
	key: 1,
	class: "mat-scroll-area__fixed"
}, gr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatScrollArea",
	inheritAttrs: !1
}, {
	__name: "MatScrollArea",
	props: {
		orientation: {
			type: String,
			default: "vertical",
			validator(e) {
				return [
					"vertical",
					"y",
					"v",
					"horizontal",
					"x",
					"h"
				].includes(e);
			}
		},
		snap: {
			type: String,
			default: "none",
			validator(e) {
				return [
					"none",
					"proximity",
					"mandatory"
				].includes(e);
			}
		},
		snapPadding: {
			type: Number,
			default: 0,
			validator: (e) => Le(e, { allowUndefined: !1 })
		},
		shadowLength: {
			type: [Number, Object],
			default: void 0,
			validator: (e) => Be(e)
		},
		barWidth: {
			type: String,
			default: "thin",
			validator(e) {
				return [
					"default",
					"thin",
					"hidden"
				].includes(e);
			}
		},
		dragScroll: {
			type: Boolean,
			default: !1
		},
		reachThreshold: {
			type: [Number, Object],
			default: 0,
			validator: (e) => Be(e, { allowUndefined: !1 })
		},
		shadowOffset: {
			type: [Number, Object],
			default: 0,
			validator: (e) => Be(e, { allowUndefined: !1 })
		}
	},
	emits: {
		"reach-start": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement,
		"reach-end": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement
	},
	setup(e, { expose: t, emit: n }) {
		let i = e, c = n, l = L(), u = O(null), d = O(!1), f = O(!1), p = O(!1), m = O(!1), y = O(!1), x, T, E, D = 0, k = 0, A = !1, M, N = r(() => [
			"horizontal",
			"x",
			"h"
		].includes(i.orientation) ? "horizontal" : "vertical"), P = r(() => i.dragScroll && N.value === "horizontal"), F = r(() => Ve(i.reachThreshold, 0)), I = r(() => Ve(i.shadowOffset, 0)), R = r(() => Ve(i.shadowLength, 16)), z = r(() => i.barWidth === "hidden" ? 0 : i.barWidth === "thin" ? 10 : 16), V = r(() => ({
			"--mat-scroll-area-shadow-length-start": `${R.value.start}px`,
			"--mat-scroll-area-shadow-length-end": `${R.value.end}px`,
			"--mat-scroll-area-shadow-offset-start": `${I.value.start}px`,
			"--mat-scroll-area-shadow-offset-end": `${I.value.end}px`,
			"--mat-scroll-area-scrollbar-space": `${z.value}px`
		})), H = r(() => ({
			class: l.class,
			style: l.style
		})), U = r(() => {
			let e = N.value === "horizontal", t = Re(i.snapPadding, { fallback: "0" });
			return {
				scrollPaddingBottom: e ? void 0 : t,
				scrollPaddingLeft: e ? t : void 0,
				scrollPaddingRight: e ? t : void 0,
				scrollPaddingTop: e ? void 0 : t,
				scrollSnapType: i.snap === "none" ? "none" : `${e ? "x" : "y"} ${i.snap}`
			};
		}), W = r(() => Object.fromEntries(Object.entries(l).filter(([e]) => !["class", "style"].includes(e))));
		function G() {
			let e = u.value;
			if (!e) return {
				start: 0,
				end: 0
			};
			if (N.value === "horizontal") {
				let t = Math.abs(e.scrollLeft);
				return {
					start: t,
					end: Math.max(0, e.scrollWidth - e.clientWidth - t)
				};
			}
			return {
				start: Math.max(0, e.scrollTop),
				end: Math.max(0, e.scrollHeight - e.clientHeight - e.scrollTop)
			};
		}
		function K(e) {
			let t = u.value;
			if (!t) return;
			let n = G(), r = n.start <= F.value.start + 1, i = n.end <= F.value.end + 1;
			d.value = n.start > 1, f.value = n.end > 1, e && r && !m.value && c("reach-start", {
				distance: n.start,
				target: t
			}), e && i && !y.value && c("reach-end", {
				distance: n.end,
				target: t
			}), m.value = r, y.value = i;
		}
		function q(e) {
			x !== void 0 && cancelAnimationFrame(x), x = requestAnimationFrame(() => {
				x = void 0, K(e);
			});
		}
		function ee() {
			q(!0);
		}
		function J() {
			M !== void 0 && (globalThis.clearTimeout(M), M = void 0), A = !1;
		}
		function Y() {
			J(), A = !0, M = globalThis.setTimeout(() => {
				A = !1, M = void 0;
			}, 0);
		}
		function X(e = !1) {
			let t = u.value, n = E;
			e && n !== void 0 && t?.hasPointerCapture?.(n) && t.releasePointerCapture(n), E = void 0, p.value = !1;
		}
		function Z(e) {
			!P.value || E !== void 0 || e.button !== 0 || !["mouse", "pen"].includes(e.pointerType) || (E = e.pointerId, D = e.clientX, k = u.value?.scrollLeft ?? 0);
		}
		function te(e) {
			if (e.pointerId !== E || !u.value) return;
			let t = e.clientX - D;
			!p.value && Math.abs(t) <= 4 || (p.value || (p.value = !0, u.value.setPointerCapture?.(e.pointerId)), e.preventDefault(), u.value.scrollLeft = k - t);
		}
		function Q(e) {
			e.pointerId === E && (p.value && Y(), X(!0));
		}
		function ne(e) {
			e.pointerId === E && X(!0);
		}
		function re(e) {
			e.target !== u.value || e.pointerId !== E || (p.value && Y(), X());
		}
		function ie(e) {
			A && (J(), e.preventDefault(), e.stopImmediatePropagation());
		}
		function ae() {
			!T || !u.value || (T.disconnect(), T.observe(u.value), Array.from(u.value.children).forEach((e) => {
				T.observe(e);
			}), q(!1));
		}
		function oe() {
			return u.value;
		}
		function se(e) {
			u.value?.scrollTo(e);
		}
		return B([N, F], async () => {
			await g(), q(!1);
		}, { deep: !0 }), B(P, (e) => {
			e || (X(!0), J());
		}), S(() => {
			typeof ResizeObserver == "function" && (T = new ResizeObserver(() => q(!1))), ae();
		}), C(ae), b(() => {
			x !== void 0 && cancelAnimationFrame(x), T?.disconnect(), X(!0), J();
		}), t({
			getScroller: oe,
			scrollTo: se
		}), (e, t) => (w(), o("div", h(H.value, { class: ["mat-scroll-area", `mat-scroll-area--${N.value}`] }), [
			e.$slots["fixed-start"] ? (w(), o("div", mr, [j(e.$slots, "fixed-start", {}, void 0, !0)])) : a("", !0),
			s("div", {
				class: _(["mat-scroll-area__viewport", {
					"mat-scroll-area__viewport--start-overflow": d.value,
					"mat-scroll-area__viewport--end-overflow": f.value
				}]),
				style: v(V.value)
			}, [s("div", h({
				ref_key: "scroller",
				ref: u
			}, W.value, {
				class: ["mat-scroll-area__scroller", [`mat-scroll-area__scroller--bar-${i.barWidth}`, {
					"mat-scroll-area__scroller--dragging": p.value,
					"mat-scroll-area__scroller--start-overflow": d.value,
					"mat-scroll-area__scroller--end-overflow": f.value
				}]],
				style: U.value,
				onClickCapture: ie,
				onLostpointercapture: re,
				onPointercancel: ne,
				onPointerdown: Z,
				onPointermove: te,
				onPointerup: Q,
				onScroll: ee
			}), [j(e.$slots, "default", {}, void 0, !0)], 16)], 6),
			e.$slots["fixed-end"] ? (w(), o("div", hr, [j(e.$slots, "fixed-end", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-cfa7449d"]]), _r = { class: "mat-chip-set__scroll-content" }, vr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatChipSet" }, {
	__name: "MatChipSet",
	props: {
		layout: {
			type: String,
			default: "wrap",
			validator(e) {
				return ["wrap", "scroll"].includes(e);
			}
		},
		selection: {
			type: String,
			default: "none",
			validator(e) {
				return [
					"none",
					"single",
					"multiple"
				].includes(e);
			}
		},
		modelValue: {
			type: [
				String,
				Number,
				Boolean,
				Array
			],
			default: null,
			validator(e) {
				return e === null || Pn(e) || Array.isArray(e) && e.every(Pn);
			}
		}
	},
	emits: { "update:modelValue"(e) {
		return e === null || Pn(e) || Array.isArray(e) && e.every(Pn);
	} },
	setup(e, { emit: t }) {
		let n = e, a = t, c = r(() => n.selection);
		function l(e) {
			return n.selection === "multiple" ? Array.isArray(n.modelValue) && n.modelValue.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.modelValue, e);
		}
		function u(e) {
			let t = l(e);
			if (n.selection === "single") {
				a("update:modelValue", t ? null : e);
				return;
			}
			if (n.selection === "multiple") {
				let r = Array.isArray(n.modelValue) ? n.modelValue : [];
				a("update:modelValue", t ? r.filter((t) => !Object.is(t, e)) : [...r, e]);
			}
		}
		return T(lr, {
			isSelected: l,
			requestSelection: u,
			selection: c
		}), (t, n) => (w(), o("div", {
			class: _(["mat-chip-set", `mat-chip-set--${e.layout}`]),
			role: "group"
		}, [e.layout === "scroll" ? (w(), i(gr, {
			key: 0,
			class: "mat-chip-set__scroll-area",
			orientation: "horizontal",
			"bar-width": "hidden",
			"drag-scroll": "",
			"shadow-length": 48
		}, {
			default: H(() => [s("div", _r, [j(t.$slots, "default", {}, void 0, !0)])]),
			_: 3
		})) : j(t.$slots, "default", { key: 1 }, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-67ef15a0"]]), yr = Symbol("mde-vue-radio-group"), br = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
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
				return e == null || Pn(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: Pn
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Pn(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = d(), c = p(yr, null), l = O(null), u = r(() => n.value), f = r(() => n.disabled || !!c?.disabled.value), m = r(() => n.color ?? c?.color.value), g = r(() => c ? c.isSelected(n.value) : Object.is(n.modelValue, n.value));
		function _(e) {
			f.value || g.value || (c ? c.requestSelection(n.value, e) : a("update:modelValue", n.value), a("change", e));
		}
		let v = {
			activate: _,
			disabled: f,
			focus() {
				l.value?.focusInput();
			},
			getInput() {
				return l.value?.getInput() ?? null;
			},
			value: u
		}, y = r(() => c ? c.getTabIndex(v) : void 0);
		S(() => {
			if (!c) return;
			let e = o?.vnode.props ?? {};
			(n.modelValue !== void 0 || Object.hasOwn(e, "onUpdate:modelValue")) && console.warn("MatRadio: 位于 MatRadioGroup 中时，子级 modelValue 和 v-model 会被忽略"), c.register(v);
		}), b(() => {
			c?.unregister(v);
		});
		function x(e) {
			!c || e.repeat || (["ArrowRight", "ArrowDown"].includes(e.key) ? c.move(v, 1, e) : ["ArrowLeft", "ArrowUp"].includes(e.key) && c.move(v, -1, e));
		}
		return (e, t) => (w(), i(sr, h({
			ref_key: "base",
			ref: l
		}, e.$attrs, {
			class: ["mat-radio", { "mat-radio--checked": g.value }],
			checked: g.value,
			color: m.value,
			disabled: f.value,
			"input-type": "radio",
			"input-value": u.value,
			"label-name": "MatRadio",
			tabindex: y.value,
			onChange: _,
			onKeydown: x
		}), {
			indicator: H(() => [...t[0] ||= [s("span", { class: "mat-radio__ring" }, [s("span", { class: "mat-radio__dot" })], -1)]]),
			default: H(() => [j(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-0d040228"]]), xr = ["aria-disabled"], Sr = { class: "mat-radio-group__label" }, Cr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatRadioGroup",
	inheritAttrs: !1
}, {
	__name: "MatRadioGroup",
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: null,
			validator(e) {
				return e === null || Pn(e);
			}
		},
		label: {
			type: String,
			required: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Pn(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = L(), c = P([]), { colorStyle: l } = Ae(r(() => n.color)), u = r(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = r(() => [l.value, a.style]);
		function f(e) {
			return Object.is(n.modelValue, e);
		}
		function p() {
			return [...c.value].sort((e, t) => {
				let n = e.getInput(), r = t.getInput();
				if (!n || !r) return 0;
				let i = n.compareDocumentPosition(r);
				return i & 4 ? -1 : i & 2 ? 1 : 0;
			});
		}
		function m(e) {
			c.value.includes(e) || (c.value = [...c.value, e]);
		}
		function g(e) {
			c.value = c.value.filter((t) => t !== e);
		}
		function _(e) {
			if (e.disabled.value) return -1;
			let t = p().filter((e) => !e.disabled.value), n = t.find((e) => f(e.value.value));
			return n ? n === e ? 0 : -1 : t[0] === e ? 0 : -1;
		}
		function v(e, t) {
			n.disabled || Object.is(n.modelValue, e) || (i("update:modelValue", e), i("change", t));
		}
		function y(e, t, n) {
			let r = p().filter((e) => !e.disabled.value), i = r.indexOf(e);
			if (i === -1 || r.length === 0) return;
			n.preventDefault();
			let a = r[(i + t + r.length) % r.length];
			a.focus(), a.activate(n);
		}
		return T(yr, {
			color: r(() => n.color),
			disabled: r(() => n.disabled),
			getTabIndex: _,
			isSelected: f,
			move: y,
			register: m,
			requestSelection: v,
			unregister: g
		}), (t, n) => (w(), o("fieldset", h(u.value, {
			class: "mat-radio-group",
			"aria-disabled": e.disabled || void 0,
			style: d.value,
			role: "radiogroup"
		}), [s("legend", Sr, F(e.label), 1), j(t.$slots, "default", {}, void 0, !0)], 16, xr));
	}
}), [["__scopeId", "data-v-b2f7e821"]]), wr = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
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
			validator: $
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
		let n = t;
		function r(e) {
			n("update:modelValue", e.target.checked), n("change", e);
		}
		return (t, n) => (w(), i(sr, h(t.$attrs, {
			class: ["mat-switch", [`mat-switch--icons-${e.icons}`, { "mat-switch--checked": e.modelValue }]],
			checked: e.modelValue,
			color: e.color,
			disabled: e.disabled,
			"input-role": "switch",
			"input-type": "checkbox",
			"label-name": "MatSwitch",
			onChange: r
		}), {
			indicator: H(() => [...n[0] ||= [s("span", { class: "mat-switch__track" }, [s("span", { class: "mat-switch__handle-positioner" }, [s("span", { class: "mat-switch__handle" }, [s("span", { class: "mat-switch__icon mat-switch__icon--selected" }), s("span", { class: "mat-switch__icon mat-switch__icon--unselected" })])])], -1)]]),
			default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-71a3dff9"]]), Tr = Object.freeze(["horizontal", "vertical"]), Er = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), Dr = Object.freeze(["standard", "centered"]), Or = 12;
function kr(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Ar(e) {
	return kr(e) && e > 0;
}
function jr(e) {
	return Tr.includes(e);
}
function Mr(e) {
	return Er.includes(e);
}
function Nr(e) {
	return Dr.includes(e);
}
function Pr(e) {
	return Array.isArray(e) && e.length === 2 && e.every(kr);
}
function Fr(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function Ir(e, t) {
	return Number(e.toFixed(Math.min(Or, t)));
}
function Lr(e, t) {
	let n = kr(e) ? e : 0, r = kr(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function Rr(e) {
	return Ar(e) ? e : 1;
}
function zr(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function Br(e, t, n) {
	let r = zr(kr(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(Fr(t.min), Fr(t.max), Fr(n));
	return Ir(zr(t.min + i * n, t), a);
}
function Vr(e, t, n) {
	return Br(kr(e) ? e : (t.min + t.max) / 2, t, n);
}
function Hr(e, t) {
	return Ir((zr(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function Ur(e) {
	return Number(e.toFixed(3)).toString();
}
function Wr(e) {
	let t = Math.min(Math.max(e, 0), 100), n = Ur(t), r = Ir(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${Ur(Math.abs(r))}px)`;
}
function Gr(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(Fr(e.min), Fr(e.max), Fr(t)), i = Array.from({ length: n + 1 }, (n, i) => Ir(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function Kr(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return Br(n.min + (n.max - n.min) * u, n, r);
}
function qr(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return Br(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return Br(e + i * r, n, r);
}
function Jr(e, t, n, r) {
	let i = Br(e, n, r), a = Br(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var Yr = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, Xr = { class: "mat-slider__inset-icon-layer" }, Zr = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, Qr = [
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
], $r = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: kr
		},
		min: {
			type: Number,
			default: 0,
			validator: kr
		},
		max: {
			type: Number,
			default: 100,
			validator: kr
		},
		step: {
			type: Number,
			default: 1,
			validator: Ar
		},
		variant: {
			type: String,
			default: "standard",
			validator: Nr
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || kr(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: jr
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Mr
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
			return kr(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, c = n, l = L(), d = O(null), f = O(null), m = O(null), g = O(!1), y = O(void 0), b = O(void 0), x = O(!1), S = O(!1), C = p(ie, re), { colorStyle: T } = Ae(r(() => i.color)), E = r(() => Lr(i.min, i.max)), D = r(() => Rr(i.step)), k = r(() => Br(i.modelValue, E.value, D.value)), j = r(() => g.value ? b.value : k.value), M = r(() => Vr(i.center, E.value, D.value)), N = r(() => i.variant === "centered" ? M.value : E.value.min), P = r(() => Hr(j.value, E.value)), F = r(() => Hr(N.value, E.value)), R = r(() => Wr(P.value)), z = r(() => i.variant === "standard" ? "0%" : Wr(F.value)), B = r(() => Math.sign(P.value - F.value)), V = r(() => B.value >= 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), H = r(() => B.value > 0 ? `max(0px, calc(${R.value} - ${z.value} - var(--mat-slider-handle-track-gap)))` : B.value < 0 ? `max(0px, calc(${z.value} - ${R.value} - var(--mat-slider-handle-track-gap)))` : "0px"), U = r(() => B.value > 0 ? z.value : `max(0px, calc(${R.value} - var(--mat-slider-handle-track-gap)))`), W = r(() => B.value < 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), G = r(() => B.value < 0 ? `calc(100% - ${z.value})` : `max(0px, calc(100% - ${R.value} - var(--mat-slider-handle-track-gap)))`), K = r(() => i.showStopIndicator ? Gr(E.value, D.value) : i.variant === "centered" ? [E.value.min, E.value.max] : [E.value.max]), q = r(() => i.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(i.size)), ee = r(() => i.size === "extra-large" ? 32 : 24), J = r(() => i.showValueIndicator && (g.value || S.value)), Y = r(() => ({
			...T.value,
			"--mat-slider-active-visible-size": H.value,
			"--mat-slider-active-visible-start": V.value,
			"--mat-slider-center-position": z.value,
			"--mat-slider-inactive-after-size": G.value,
			"--mat-slider-inactive-after-start": W.value,
			"--mat-slider-inactive-before-size": U.value,
			"--mat-slider-position": R.value
		}));
		function X(e, t) {
			let n = g.value ? b.value : k.value;
			return e === void 0 || e === n ? !1 : (g.value && (b.value = e), c("update:modelValue", e), c("input", t), !0);
		}
		function Z(e) {
			return f.value ? X(Kr(e, f.value, E.value, D.value, i.orientation), e) : !1;
		}
		function te(e) {
			i.disabled || (y.value = e.pointerId, b.value = k.value, x.value = !1, g.value = !0, m.value?.focus(), f.value?.setPointerCapture?.(e.pointerId), x.value = Z(e));
		}
		function Q(e) {
			!g.value || e.pointerId !== y.value || (x.value = Z(e) || x.value);
		}
		function ne(e, t) {
			!g.value || e.pointerId !== y.value || (t && (x.value = Z(e) || x.value), t && x.value && c("change", e), g.value = !1, x.value = !1, y.value = void 0, b.value = void 0);
		}
		function ae(e) {
			if (i.disabled) return;
			let t = qr(k.value, e.key, E.value, D.value);
			t !== void 0 && (e.preventDefault(), X(t, e) && c("change", e));
		}
		return (n, r) => (w(), o("div", h(I(l), {
			class: ["mat-slider", [
				`mat-slider--${e.orientation}`,
				`mat-slider--size-${e.size}`,
				`mat-slider--${e.variant}`,
				{
					"mat-slider--disabled": e.disabled,
					"mat-slider--dragging": g.value,
					"mat-slider--use-cursor": I(C).useCursor
				}
			]],
			style: Y.value
		}), [
			s("span", Yr, [
				r[6] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				s("span", { class: _(["mat-slider__active-track", { "mat-slider__active-track--from-start": e.variant === "standard" }]) }, null, 2),
				r[7] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(K.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(N.value, j.value) && e <= Math.max(N.value, j.value) }]),
					style: v({ "--mat-slider-stop-position": I(Wr)(I(Hr)(e, E.value)) })
				}, null, 6))), 128)),
				q.value ? (w(), o(t, { key: 0 }, [s("span", Xr, [u(Me, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: e.insetIcon,
					"optical-size": ee.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), s("span", Zr, [u(Me, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: e.insetIcon,
					"optical-size": ee.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])])], 64)) : a("", !0),
				s("span", {
					ref_key: "handle",
					ref: d,
					class: "mat-slider__handle"
				}, [...r[5] ||= [s("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
			]),
			u(Dt, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(j.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": J.value,
				target: d.value
			}, null, 8, [
				"content",
				"location",
				"model-value",
				"target"
			]),
			s("span", {
				ref_key: "interaction",
				ref: f,
				class: "mat-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: r[0] ||= (e) => ne(e, !1),
				onPointercancel: r[1] ||= (e) => ne(e, !1),
				onPointerdown: te,
				onPointermove: Q,
				onPointerup: r[2] ||= (e) => ne(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "nativeInput",
				ref: m,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": I(l)["aria-label"],
				"aria-orientation": e.orientation,
				"aria-valuemax": E.value.max,
				"aria-valuemin": E.value.min,
				"aria-valuenow": j.value,
				disabled: e.disabled,
				max: E.value.max,
				min: E.value.min,
				step: D.value,
				value: j.value,
				onBlur: r[3] ||= (e) => S.value = !1,
				onFocus: r[4] ||= (e) => S.value = !0,
				onKeydown: ae
			}, null, 40, Qr)
		], 16));
	}
}), [["__scopeId", "data-v-a8683686"]]), ei = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, ti = [
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
], ni = [
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
], ri = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
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
			validator: Pr
		},
		min: {
			type: Number,
			default: 0,
			validator: kr
		},
		max: {
			type: Number,
			default: 100,
			validator: kr
		},
		step: {
			type: Number,
			default: 1,
			validator: Ar
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: jr
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Mr
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
			return Pr(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, a = n, c = L(), l = O([]), d = O(null), f = O(null), m = O(null), g = O(0), y = O(void 0), b = O(!1), x = O(void 0), S = O(void 0), C = O(!1), T = p(ie, re), { colorStyle: E } = Ae(r(() => i.color)), D = r(() => Lr(i.min, i.max)), k = r(() => Rr(i.step)), j = r(() => Jr(i.modelValue?.[0], i.modelValue?.[1], D.value, k.value)), M = r(() => b.value ? S.value : j.value), N = r(() => Hr(M.value[0], D.value)), P = r(() => Hr(M.value[1], D.value)), F = r(() => Wr(N.value)), R = r(() => Wr(P.value)), z = r(() => i.showStopIndicator ? Gr(D.value, k.value) : [D.value.min, D.value.max]), B = r(() => l.value[g.value] ?? null), V = r(() => M.value[g.value]), H = r(() => i.showValueIndicator && (b.value || y.value === g.value)), U = r(() => ({
			...E.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${R.value} - ${F.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${F.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": R.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${R.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${R.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${F.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": F.value
		}));
		function W(e) {
			return e === 0 ? f.value : m.value;
		}
		function G(e) {
			let [t, n] = M.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function K(e, t, n) {
			if (t === void 0) return !1;
			let [r, i] = b.value ? S.value : j.value, o = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === i ? !1 : (b.value && (S.value = o), a("update:modelValue", o), a("input", n), !0);
		}
		function q(e) {
			if (!d.value) return !1;
			let t = Kr(e, d.value, D.value, k.value, i.orientation);
			return K(g.value, t, e);
		}
		function ee(e) {
			if (i.disabled || !d.value) return;
			let t = Kr(e, d.value, D.value, k.value, i.orientation);
			t !== void 0 && (g.value = G(t), x.value = e.pointerId, S.value = [...j.value], C.value = !1, b.value = !0, W(g.value)?.focus(), d.value.setPointerCapture?.(e.pointerId), C.value = K(g.value, t, e));
		}
		function J(e) {
			!b.value || e.pointerId !== x.value || (C.value = q(e) || C.value);
		}
		function Y(e, t) {
			!b.value || e.pointerId !== x.value || (t && (C.value = q(e) || C.value), t && C.value && a("change", e), b.value = !1, C.value = !1, x.value = void 0, S.value = void 0);
		}
		function X(e, t) {
			if (i.disabled) return;
			let n = qr(j.value[e], t.key, D.value, k.value);
			n !== void 0 && (t.preventDefault(), g.value = e, K(e, n, t) && a("change", t));
		}
		function Z(e) {
			g.value = e, y.value = e;
		}
		function te(e) {
			y.value === e && (y.value = void 0);
		}
		function Q(e, t) {
			l.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (n, r) => (w(), o("div", h(I(c), {
			class: ["mat-range-slider", [
				`mat-range-slider--${e.orientation}`,
				`mat-range-slider--size-${e.size}`,
				{
					"mat-range-slider--disabled": e.disabled,
					"mat-range-slider--dragging": b.value,
					"mat-range-slider--use-cursor": I(T).useCursor
				}
			]],
			style: U.value
		}), [
			s("span", ei, [
				r[10] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				r[11] ||= s("span", { class: "mat-range-slider__active-track" }, null, -1),
				r[12] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(z.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= M.value[0] && e <= M.value[1] }]),
					style: v({ "--mat-range-slider-stop-position": I(Wr)(I(Hr)(e, D.value)) })
				}, null, 6))), 128)),
				(w(!0), o(t, null, A(M.value, (e, t) => (w(), o("span", {
					key: t,
					ref_for: !0,
					ref: (e) => Q(t, e),
					class: _(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": g.value === t }]])
				}, [...r[9] ||= [s("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			u(Dt, {
				class: "mat-range-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(V.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": H.value,
				target: B.value
			}, null, 8, [
				"content",
				"location",
				"model-value",
				"target"
			]),
			s("span", {
				ref_key: "interaction",
				ref: d,
				class: "mat-range-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: r[0] ||= (e) => Y(e, !1),
				onPointercancel: r[1] ||= (e) => Y(e, !1),
				onPointerdown: ee,
				onPointermove: J,
				onPointerup: r[2] ||= (e) => Y(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "startInput",
				ref: f,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": e.ariaLabelStart,
				"aria-orientation": e.orientation,
				"aria-valuemax": M.value[1],
				"aria-valuemin": D.value.min,
				"aria-valuenow": M.value[0],
				disabled: e.disabled,
				max: M.value[1],
				min: D.value.min,
				step: k.value,
				value: M.value[0],
				onBlur: r[3] ||= (e) => te(0),
				onFocus: r[4] ||= (e) => Z(0),
				onKeydown: r[5] ||= (e) => X(0, e)
			}, null, 40, ti),
			s("input", {
				ref_key: "endInput",
				ref: m,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": e.ariaLabelEnd,
				"aria-orientation": e.orientation,
				"aria-valuemax": D.value.max,
				"aria-valuemin": M.value[0],
				"aria-valuenow": M.value[1],
				disabled: e.disabled,
				max: D.value.max,
				min: M.value[0],
				step: k.value,
				value: M.value[1],
				onBlur: r[6] ||= (e) => te(1),
				onFocus: r[7] ||= (e) => Z(1),
				onKeydown: r[8] ||= (e) => X(1, e)
			}, null, 40, ni)
		], 16));
	}
}), [["__scopeId", "data-v-d7070366"]]), ii = ["inert", "aria-hidden"], ai = { class: "mat-text-input__container" }, oi = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, si = {
	key: 0,
	class: "mat-text-input__outline-label"
}, ci = { key: 0 }, li = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, ui = ["for"], di = {
	key: 0,
	class: "mat-text-input__label"
}, fi = {
	key: 0,
	"aria-hidden": "true"
}, pi = { class: "mat-text-input__control-row" }, mi = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, hi = {
	key: 1,
	class: "mat-text-input__affix mat-text-input__suffix"
}, gi = { class: "mat-text-input__supporting-text" }, _i = {
	key: 0,
	class: "mat-text-input__counter"
}, vi = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
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
	setup(e, { emit: t }) {
		let n = e, c = t, d = L(), f = O(!1), p = O(n.modelValue), m = O(), y = R(), x = `${y}-supporting`, C = r(() => d.id || y), { colorStyle: T } = Ae(r(() => n.color)), E = r(() => !!d.placeholder), D = r(() => f.value || p.value.length > 0 || E.value), k = r(() => n.error ? n.errorText : n.supportingText), A = r(() => !!k.value || n.maxLength !== void 0), M = r(() => {
			let e = [d["aria-describedby"]];
			return A.value && e.push(x), e.filter(Boolean).join(" ") || void 0;
		}), N = r(() => [T.value, d.style]), P = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), I = r(() => Object.fromEntries(Object.entries(d).filter(([e]) => !P.has(e)))), z, V;
		function U(e) {
			return Number.parseFloat(e) || 0;
		}
		function W() {
			let e = m.value?.getInput();
			if (!(e instanceof HTMLTextAreaElement)) return;
			e.style.resize = n.noResize ? "none" : "";
			let t = getComputedStyle(e), r = U(t.lineHeight) || 24, i = U(t.paddingBlockStart || t.paddingTop) + U(t.paddingBlockEnd || t.paddingBottom);
			if (e.style.minBlockSize = `${n.resizeMinRows * r + i}px`, !n.autoGrow) {
				e.style.blockSize = "", e.style.height = "", e.style.overflowY = "";
				return;
			}
			let a = n.rows ?? 1, o = n.maxRows === void 0 ? Infinity : Math.max(a, n.maxRows), s = a * r + i, c = o * r + i;
			e.style.blockSize = "auto", e.style.height = "";
			let l = e.scrollHeight, u = Math.max(s, Math.min(l, c));
			e.style.blockSize = `${u}px`, e.style.overflowY = "auto";
		}
		function G() {
			g(W);
		}
		function K(e) {
			let t = e[0]?.contentRect.width;
			t !== V && (V = t, G());
		}
		B(() => n.modelValue, (e) => {
			p.value = e, G();
		}), B(() => [
			n.autoGrow,
			n.label,
			n.maxRows,
			n.noResize,
			n.resizeMinRows,
			n.rows
		], G), S(() => {
			W(), typeof globalThis.ResizeObserver == "function" && (z = new globalThis.ResizeObserver(K), z.observe(m.value.getInput()));
		}), b(() => {
			z?.disconnect();
		});
		function q() {
			m.value?.focusInput();
		}
		function ee(e) {
			p.value = e, c("update:modelValue", e), G();
		}
		return (t, n) => (w(), o("div", {
			class: _(["mat-text-input", [
				t.$attrs.class,
				`mat-text-input--${e.variant}`,
				`mat-text-input--${e.control}`,
				{
					"mat-text-input--floating": D.value,
					"mat-text-input--focused": f.value,
					"mat-text-input--error": e.error,
					"mat-text-input--disabled": e.disabled
				}
			]]),
			style: v(N.value),
			inert: t.$attrs.inert,
			"aria-hidden": t.$attrs["aria-hidden"]
		}, [s("div", ai, [
			e.variant === "outlined" ? (w(), o("fieldset", oi, [D.value && e.label ? (w(), o("legend", si, [l(F(e.label), 1), e.required ? (w(), o("span", ci, " *")) : a("", !0)])) : a("", !0)])) : a("", !0),
			e.variant === "filled" ? (w(), o("span", li)) : a("", !0),
			t.$slots.leading ? (w(), i(Me, {
				key: 2,
				as: "span",
				class: "mat-text-input__icon mat-text-input__leading",
				"optical-size": 24,
				size: "24px"
			}, {
				default: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : a("", !0),
			s("label", {
				class: "mat-text-input__main",
				for: C.value,
				onClick: q
			}, [e.label ? (w(), o("span", di, [l(F(e.label), 1), e.required ? (w(), o("span", fi, " *")) : a("", !0)])) : a("", !0), s("span", pi, [
				e.prefixText ? (w(), o("span", mi, F(e.prefixText), 1)) : a("", !0),
				u(Xt, h({
					ref_key: "controlElement",
					ref: m
				}, I.value, {
					class: "mat-text-input__control",
					"aria-describedby": M.value,
					"aria-invalid": e.error ? "true" : void 0,
					disabled: e.disabled,
					id: C.value,
					"max-length": e.maxLength,
					readonly: e.readonly,
					required: e.required,
					rows: e.control === "textarea" ? e.rows : void 0,
					type: e.control === "input" ? e.type : void 0,
					control: e.control,
					"model-value": e.modelValue,
					onBlur: n[0] ||= (e) => f.value = !1,
					onFocus: n[1] ||= (e) => f.value = !0,
					"onUpdate:modelValue": ee
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
				e.suffixText ? (w(), o("span", hi, F(e.suffixText), 1)) : a("", !0)
			])], 8, ui),
			t.$slots.trailing ? (w(), i(Me, {
				key: 3,
				as: "span",
				class: "mat-text-input__icon mat-text-input__trailing",
				"optical-size": 24,
				size: "24px"
			}, {
				default: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
				_: 3
			})) : a("", !0)
		]), A.value ? (w(), o("span", {
			key: 0,
			id: x,
			class: "mat-text-input__supporting"
		}, [s("span", gi, F(k.value), 1), e.maxLength === void 0 ? a("", !0) : (w(), o("span", _i, F(e.modelValue.length) + " / " + F(e.maxLength), 1))])) : a("", !0)], 14, ii));
	}
}), [["__scopeId", "data-v-fa6aba2e"]]), yi = ["filled", "outlined"], bi = {
	modelValue: {
		type: String,
		default: ""
	},
	label: {
		type: String,
		default: void 0
	},
	variant: {
		type: String,
		default: "outlined",
		validator(e) {
			return yi.includes(e);
		}
	},
	color: {
		type: String,
		default: void 0,
		validator: $
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
		default: void 0,
		validator(e) {
			return Number.isInteger(e) && e >= 0;
		}
	},
	disabled: {
		type: Boolean,
		default: !1
	},
	readonly: {
		type: Boolean,
		default: !1
	},
	required: {
		type: Boolean,
		default: !1
	},
	error: {
		type: Boolean,
		default: !1
	}
}, xi = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...bi,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = e, r = t;
		return (e, t) => (w(), i(vi, h({
			...e.$attrs,
			...n
		}, {
			control: "input",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: H(() => [j(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: H(() => [j(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040));
	}
}), Si = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...bi,
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
	setup(e, { emit: t }) {
		let n = e, r = d();
		function a() {
			return Object.hasOwn(r.vnode.props ?? {}, "rows") ? n.rows : 1;
		}
		let o = t;
		return (e, t) => (w(), i(vi, h({
			...e.$attrs,
			...n
		}, {
			control: "textarea",
			"resize-min-rows": a(),
			"onUpdate:modelValue": t[0] ||= (e) => o("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: H(() => [j(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: H(() => [j(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040, ["resize-min-rows"]));
	}
}), Ci = 200, wi = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatMenu",
	inheritAttrs: !1
}, {
	__name: "MatMenu",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		anchor: {
			type: [String, Array],
			default: void 0,
			validator(e) {
				return e === void 0 || typeof e == "string" || Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
			}
		},
		offset: {
			type: Array,
			default: () => [0, 0],
			validator(e) {
				return e.length === 2 && e.every((e) => Number.isFinite(e));
			}
		},
		variant: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || ["standard", "vibrant"].includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Le(e, {
				property: "max-block-size",
				positive: !0
			})
		},
		scrim: {
			type: Boolean,
			default: !0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: n }) {
		let i = e, s = n, c = L(), l = z(), d = p(Zn, null), f = p(Xn, null), m = O(null), _ = O(null), v = O(null), y = r(() => v.value?.root ?? v.value?.$el ?? null), x = R().replace(/[^\w-]/g, "-"), E = r(() => c.id ?? `${x}-menu`), D = `--mat-menu-anchor-${x}`, k = O(!1), A = O("closed"), M = f?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, N = O(0), P = /* @__PURE__ */ new Map(), F = null, V = "", U = !1, W = !1, G = !1, K, q, ee, J = null, Y = !1, X = !1, Z = r(() => !!d), te = r(() => !!l.activator), Q = r(() => !Z.value && !te.value && pe(i.anchor)), ne = r(() => N.value > 0), re = r(() => !Z.value && i.scrim), ie = r(() => re.value ? "manual" : "auto"), ae = r(() => Z.value ? k.value : i.modelValue), oe = r(() => i.variant ?? f?.variant.value ?? "standard"), se = r(() => i.color ?? f?.color.value), ce = r(() => i.closeOnClick), { colorStyle: $ } = Ae(se), le = r(() => {
			if (i.maxLength === void 0) return;
			let e = Re(i.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(100dvb - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))`;
			return {
				"--mat-menu-resolved-max-length": t,
				maxBlockSize: t
			};
		}), ue = r(() => {
			let [e, t] = pe(i.offset) ? i.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: Q.value ? "auto" : D
			};
			return Q.value && pe(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), de = r(() => [
			$.value,
			ue.value,
			c.style,
			le.value
		]), fe = Nn({
			root: y,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === y.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function pe(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function me() {
			if (Z.value) return d.element.value;
			if (te.value) {
				let e = m.value ? [...m.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function he() {
			F && (V ? F.style.setProperty("anchor-name", V) : F.style.removeProperty("anchor-name"), F = null, V = "");
		}
		function ge() {
			let e = me();
			return e ? F === e ? e : (he(), F = e, V = e.style.getPropertyValue("anchor-name"), e.style.setProperty("anchor-name", D), e) : null;
		}
		function _e() {
			K !== void 0 && (window.clearTimeout(K), K = void 0);
		}
		function ve() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function ye() {
			!re.value || !_.value || W || (W = !0, _.value.showPopover?.());
		}
		function be() {
			W && (W = !1, _.value?.hidePopover?.());
		}
		function xe() {
			y.value && U && (U = !1, G = !0, y.value.hidePopover?.()), be(), A.value = "closed";
		}
		function Se() {
			K = void 0, be(), A.value = "closed";
		}
		function Ce() {
			if (_e(), ve()) {
				A.value = "closed";
				return;
			}
			A.value = "closing", K = window.setTimeout(Se, Ci);
		}
		function we({ immediate: e = !1 } = {}) {
			if (!(!y.value || !U)) {
				if (G = !0, ke({ immediate: !0 }), e || ve()) {
					_e(), xe();
					return;
				}
				A.value !== "closing" && (A.value = "closing", _e(), K = window.setTimeout(() => {
					K = void 0, xe();
				}, Ci));
			}
		}
		function Te() {
			if (q = void 0, !y.value || !U) return;
			let e = y.value.style, t = y.value.getBoundingClientRect(), n = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, r = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, i = Number.parseFloat(getComputedStyle(y.value).getPropertyValue("--mat-menu-viewport-space")), a = Number.isFinite(i) ? i : 8, o = {
				bottom: t.bottom - r,
				left: t.left - n,
				right: t.right - n,
				top: t.top - r
			}, s = 0, c = 0;
			o.left < a ? s = a - o.left : o.right > window.innerWidth - a && (s = window.innerWidth - a - o.right), o.top < a ? c = a - o.top : o.bottom > window.innerHeight - a && (c = window.innerHeight - a - o.bottom), e.setProperty("--mat-menu-viewport-shift-x", `${s}px`), e.setProperty("--mat-menu-viewport-shift-y", `${c}px`);
		}
		function Ee() {
			q !== void 0 && cancelAnimationFrame(q), q = requestAnimationFrame(Te);
		}
		async function De() {
			_e(), G = !1, await g();
			let e = Q.value ? null : ge(), t = Q.value || !!e;
			if (!y.value || !t) {
				Z.value || (console.warn(te.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), s("update:modelValue", !1));
				return;
			}
			U || (Q.value && document.activeElement instanceof HTMLElement && (J = document.activeElement), ye(), U = !0, y.value.showPopover?.()), A.value = "open", Z.value && (d.submenuOpen.value = !0), fe.refresh(), fe.focusFirst(), Ee();
		}
		function Oe() {
			let e = me() ?? J;
			J = null, g(() => e?.focus());
		}
		function ke({ immediate: e = !1 } = {}) {
			P.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function je({ focus: e = !0, immediate: t = !1 } = {}) {
			ke({ immediate: t }), Z.value ? (k.value = !1, d.submenuOpen.value = !1) : s("update:modelValue", !1), we({ immediate: t }), e && Oe();
		}
		function Me() {
			if (f) {
				f.closeTree();
				return;
			}
			je();
		}
		function Ne(e) {
			e.preventDefault(), je();
		}
		function Pe(e) {
			let t = e.target;
			!(t instanceof Node) || y.value?.contains(t) || F?.contains(t) || je();
		}
		function Fe(e) {
			P.set(e.element, e), tr(Array.from(P.values()).filter((e) => !e.grouped)), fe.queueRefresh();
		}
		function Ie(e) {
			P.delete(e.element), tr(Array.from(P.values()).filter((e) => !e.grouped)), fe.queueRefresh();
		}
		function Le() {
			N.value += 1, fe.queueRefresh();
		}
		function ze() {
			N.value = Math.max(0, N.value - 1), fe.queueRefresh();
		}
		function Be(e, { pointer: t = !1 } = {}) {
			P.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function Ve(e) {
			let t = getComputedStyle(y.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), fe.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), fe.focusFirst()) : e.key === "End" ? (e.preventDefault(), fe.focusLast()) : e.key === "Escape" || Z.value && e.key === t ? (e.preventDefault(), je()) : e.key === "Tab" && Me();
		}
		function He(e) {
			if (U = e.newState === "open", U) {
				Ee();
				return;
			}
			let t = G;
			G = !1, ke(), Z.value && (k.value = !1, d.submenuOpen.value = !1), !(!ae.value || t) && (Ce(), Z.value || s("update:modelValue", !1), Oe());
		}
		T(Xn, {
			closeOtherSubmenus: Be,
			closeTree: Me,
			closeOnClick: ce,
			color: se,
			registerItem: Fe,
			registerGroup: Le,
			unregisterItem: Ie,
			unregisterGroup: ze,
			pointerHistory: M,
			variant: oe
		}), d && d.registerSubmenu({
			close: je,
			element: y,
			id: E,
			open: De
		}), S(() => {
			fe.observe(), window.addEventListener("resize", Ee), window.addEventListener("scroll", Ee, {
				capture: !0,
				passive: !0
			}), ae.value && (We(), Ke()), typeof ResizeObserver < "u" && (ee = new ResizeObserver(Ee), ee.observe(y.value)), ae.value && De();
		}), C(() => {
			Z.value || !ae.value || Q.value || me() !== F && (he(), De());
		}), b(() => {
			_e(), q !== void 0 && cancelAnimationFrame(q), ee?.disconnect(), window.removeEventListener("resize", Ee), window.removeEventListener("scroll", Ee, { capture: !0 }), Ge(), qe(), we({ immediate: !0 }), be(), he(), d?.unregisterSubmenu();
		});
		function Ue(e) {
			M.previous = M.current, M.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function We() {
			f || Y || (document.addEventListener("pointermove", Ue, !0), Y = !0);
		}
		function Ge() {
			Y &&= (document.removeEventListener("pointermove", Ue, !0), !1);
		}
		function Ke() {
			f || re.value || X || (document.addEventListener("pointerdown", Pe, !0), X = !0);
		}
		function qe() {
			X &&= (document.removeEventListener("pointerdown", Pe, !0), !1);
		}
		return B(ae, (e) => {
			e ? (We(), Ke(), De()) : (Ge(), qe(), we());
		}), B(() => i.anchor, async () => {
			he(), ae.value && await De();
		}, { deep: !0 }), B(() => i.offset, async () => {
			ae.value && (await g(), Ee());
		}, { deep: !0 }), B(() => i.maxLength, async () => {
			ae.value && (await g(), Ee());
		}), B(() => i.scrim, async () => {
			Z.value || (y.value && U && (U = !1, G = !0, y.value.hidePopover?.()), be(), qe(), await g(), ae.value && (Ke(), await De()));
		}), (n, r) => (w(), o(t, null, [
			!Z.value && te.value ? (w(), o("span", {
				key: 0,
				ref_key: "activatorHost",
				ref: m,
				class: "mat-menu__activator"
			}, [j(n.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			!Z.value && e.scrim ? (w(), o("div", {
				key: 1,
				ref_key: "scrimElement",
				ref: _,
				"aria-hidden": "true",
				class: "mat-menu__scrim",
				popover: "manual",
				onPointerdown: Ne
			}, null, 544)) : a("", !0),
			u(hn, h({
				id: E.value,
				ref_key: "surface",
				ref: v
			}, n.$attrs, {
				class: ["mat-menu", [`mat-menu--${oe.value}`, {
					"mat-menu--coordinate": Q.value,
					"mat-menu--grouped": ne.value,
					"mat-menu--nested": Z.value,
					"mat-menu--closing": A.value === "closing"
				}]],
				style: de.value,
				popover: ie.value,
				role: "menu",
				onPointerenter: r[0] ||= (e) => I(d)?.cancelSubmenuClose(),
				onFocusin: I(fe).handleFocusIn,
				onKeydown: Ve,
				onToggle: He
			}), {
				default: H(() => [u(gr, {
					class: "mat-menu__surface",
					"bar-width": "hidden"
				}, {
					default: H(() => [j(n.$slots, "default", {}, void 0, !0)]),
					_: 3
				})]),
				_: 3
			}, 16, [
				"id",
				"class",
				"style",
				"popover",
				"onFocusin"
			])
		], 64));
	}
}), [["__scopeId", "data-v-b166e053"]]), Ti = ["aria-labelledby"], Ei = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = e, n = L(), i = p(Xn, null), s = `${R().replace(/[^\w-]/g, "-")}-label`, c = r(() => t.label ? s : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), tr(Array.from(l));
		}
		function d(e) {
			l.delete(e), tr(Array.from(l));
		}
		return T(Qn, {
			registerItem: u,
			unregisterItem: d
		}), S(() => i?.registerGroup()), b(() => i?.unregisterGroup()), (t, n) => (w(), o("div", h(t.$attrs, {
			class: "mat-menu-group",
			"aria-labelledby": c.value,
			role: "group"
		}), [e.label ? (w(), o("div", {
			key: 0,
			id: s,
			class: "mat-menu-group__label"
		}, F(e.label), 1)) : a("", !0), j(t.$slots, "default", {}, void 0, !0)], 16, Ti));
	}
}), [["__scopeId", "data-v-8632d18c"]]), Di = { class: "mat-menu-item-host" }, Oi = 300, ki = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatMenuItem",
	inheritAttrs: !1
}, {
	__name: "MatMenuItem",
	props: { disabled: {
		type: Boolean,
		default: !1
	} },
	emits: { click: (e) => e instanceof MouseEvent },
	setup(e, { emit: t }) {
		let n = e, s = t, l = z(), d = p(Xn, null), f = p(Qn, null), m = p(ie, re), g = O(null), _ = r(() => g.value?.root ?? g.value?.$el ?? null), v = O(!1), y = O(void 0), x = O("only"), C, E, D = r(() => !!l.submenu);
		function k({ delay: e = 0, focus: t = !1, immediate: n = !1 } = {}) {
			if (A(), e > 0) {
				E = setTimeout(() => {
					v.value = !1, C?.close({
						focus: t,
						immediate: n
					});
				}, e);
				return;
			}
			v.value = !1, C?.close({
				focus: t,
				immediate: n
			});
		}
		function A() {
			clearTimeout(E), E = void 0;
		}
		async function M({ pointer: e = !1 } = {}) {
			!D.value || n.disabled || (d?.closeOtherSubmenus(F, { pointer: e }), v.value = !0, await C?.open());
		}
		function N(e) {
			C = e, y.value = e.id.value;
		}
		function P() {
			C = void 0, y.value = void 0, v.value = !1;
		}
		let F = {
			closeSubmenu: k,
			element: _,
			grouped: !!f,
			setPosition(e) {
				x.value = e;
			},
			getSubmenuCloseDelay() {
				if (!C?.element?.value || !d?.pointerHistory || !_.value) return 0;
				let e = _.value.getBoundingClientRect(), t = C.element.value.getBoundingClientRect(), n = t.left < e.left ? "left" : "right";
				return er(d.pointerHistory.current, d.pointerHistory.previous, t, n) ? Oi : 0;
			}
		};
		function L(e) {
			if (D.value) {
				M();
				return;
			}
			s("click", e), d?.closeOnClick.value && d.closeTree();
		}
		function R(e) {
			if (!D.value) return;
			let t = getComputedStyle(_.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), M());
		}
		return T(Zn, {
			cancelSubmenuClose: A,
			element: _,
			registerSubmenu: N,
			submenuOpen: v,
			unregisterSubmenu: P
		}), S(() => {
			f?.registerItem(F), d?.registerItem(F);
		}), b(() => {
			clearTimeout(E), f?.unregisterItem(F), d?.unregisterItem(F);
		}), (t, n) => (w(), o("span", Di, [u(te, h({
			ref_key: "action",
			ref: g
		}, t.$attrs, {
			class: ["mat-menu-item", [`mat-menu-item--${x.value}`, { "mat-menu-item--submenu-open": v.value }]],
			"data-mat-menu-item": "",
			"aria-controls": D.value ? y.value : void 0,
			"aria-expanded": D.value ? String(v.value) : void 0,
			"aria-haspopup": D.value ? "menu" : void 0,
			disabled: e.disabled,
			role: "menuitem",
			"use-cursor": I(m).useCursor,
			onClick: L,
			onKeydown: R,
			onPointerenter: n[0] ||= (e) => M({ pointer: !0 })
		}), {
			default: H(() => [u(Bn, {
				namespace: "mat-menu-item-content",
				"line-count": t.$slots.supporting ? 2 : 1,
				"leading-icon": ""
			}, c({
				trailing: H(() => [t.$slots.trailing ? j(t.$slots, "trailing", { key: 0 }, void 0, !0) : D.value ? (w(), i(Me, {
					key: 1,
					as: "span",
					class: "mat-menu-item__submenu-icon",
					icon: "chevron_right",
					"optical-size": 20,
					size: "small",
					"aria-hidden": "true"
				})) : a("", !0)]),
				default: H(() => [j(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [t.$slots.leading ? {
				name: "leading",
				fn: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, t.$slots.supporting ? {
				name: "supporting",
				fn: H(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
				key: "1"
			} : void 0]), 1032, ["line-count"])]),
			_: 3
		}, 16, [
			"class",
			"aria-controls",
			"aria-expanded",
			"aria-haspopup",
			"disabled",
			"use-cursor"
		]), t.$slots.submenu ? j(t.$slots, "submenu", { key: 0 }, void 0, !0) : a("", !0)]));
	}
}), [["__scopeId", "data-v-b44804e6"]]), Ai = P([]), ji = P(0), Mi = null;
function Ni() {
	if (!Mi) return;
	let { lockedScrollbarGutter: e, overflow: t, root: n, scrollbarGutter: r } = Mi;
	n.style.overflow === "hidden" && (n.style.overflow = t), e !== null && n.style.scrollbarGutter === e && (n.style.scrollbarGutter = r), ji.value = 0, Mi = null;
}
function Pi() {
	if (Mi) return;
	let e = document.documentElement, t = e.clientWidth > 0 ? Math.max(0, window.innerWidth - e.clientWidth) : 0, n = getComputedStyle(e).scrollbarGutter, r = t > 0 && !n.includes("stable");
	ji.value = t, Mi = {
		lockedScrollbarGutter: r ? "stable" : null,
		overflow: e.style.overflow,
		root: e,
		scrollbarGutter: e.style.scrollbarGutter
	}, r && (e.style.scrollbarGutter = Mi.lockedScrollbarGutter), e.style.overflow = "hidden";
}
function Fi(e) {
	let t = Ai.value.filter((e) => e.isConnected);
	if (t.length === 0 && Ni(), t.includes(e)) {
		Ai.value = t;
		return;
	}
	Ai.value = [...t, e], Pi();
}
function Ii(e) {
	Ai.value = Ai.value.filter((t) => t !== e && t.isConnected), Ai.value.length === 0 && Ni();
}
//#endregion
//#region src/components/mat-dialog/MatDialog.vue
var Li = { class: "mat-dialog__header" }, Ri = {
	key: 1,
	class: "mat-dialog__actions"
}, zi = {
	key: 0,
	class: "mat-dialog__content"
}, Bi = {
	key: 2,
	class: "mat-dialog__content"
}, Vi = {
	key: 3,
	class: "mat-dialog__actions"
}, Hi = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatDialog",
	inheritAttrs: !1
}, {
	__name: "MatDialog",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		fullScreen: {
			type: Boolean,
			default: !1
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Le(e, {
				property: "inline-size",
				positive: !0
			})
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		scrim: {
			type: Boolean,
			default: !0
		},
		closeOnBack: {
			type: Boolean,
			default: !1
		},
		title: {
			type: String,
			default: void 0
		},
		content: {
			type: String,
			default: void 0
		},
		icon: {
			type: String,
			default: void 0
		},
		closeLabel: {
			type: String,
			default: "关闭"
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: c }) {
		let d = e, f = c, p = L(), m = z(), _ = O(null), v = O(null), y = O(!1), x = O("closed"), C = O(null), T = `${R().replace(/[^\w-]/g, "-")}-title`, E = r(() => v.value?.root ?? v.value?.$el ?? null), D = r(() => d.title !== void 0 || !!m.title), k = r(() => d.content !== void 0 || !!m.default), A = r(() => !d.fullScreen && (d.icon !== void 0 || !!m.icon)), M = r(() => !!m.activator), N = r(() => Ai.value.at(-1) === E.value), { colorStyle: P } = Ae(r(() => d.color)), I = r(() => {
			if (d.fullScreen || d.width === void 0) return;
			let e = Re(d.width, {
				property: "inline-size",
				positive: !0
			});
			if (e !== void 0) return {
				inlineSize: `min(${e}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), U = r(() => [
			P.value,
			p.style,
			I.value
		]), W = !1, G, K = null;
		function q() {
			let e = _.value ? [..._.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function ee() {
			G !== void 0 && (window.clearTimeout(G), G = void 0);
		}
		function J() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Y(e, t) {
			if (ee(), J()) {
				t();
				return;
			}
			G = window.setTimeout(() => {
				G = void 0, t();
			}, e);
		}
		function X() {
			if (typeof d.attach == "string") try {
				return document.querySelector(d.attach);
			} catch {
				return null;
			}
			return d.attach instanceof HTMLElement && d.attach.ownerDocument === document ? d.attach : null;
		}
		function Z() {
			f("update:modelValue", !1);
		}
		function te() {
			D.value || p["aria-label"] || p["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function Q() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function ne() {
			let e = E.value;
			e && (e.querySelector([
				"[autofocus]",
				"button:not([disabled])",
				"input:not([disabled])",
				"textarea:not([disabled])",
				"select:not([disabled])",
				"a[href]",
				"[tabindex]:not([tabindex=\"-1\"])"
			].join(",")) ?? e).focus({ preventScroll: !0 });
		}
		async function re() {
			if (ee(), y.value && E.value?.open) {
				x.value = "opening", Y(400, () => {
					x.value = "open", f("opened");
				});
				return;
			}
			let e = M.value ? q() : null;
			if (M.value && !e) {
				Q(), Z();
				return;
			}
			let t = X();
			if (!t) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), Z();
				return;
			}
			K = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), C.value = t, y.value = !0, x.value = "opening", te(), await g(), !(!d.modelValue || !E.value) && (E.value.open || E.value.showModal(), Fi(E.value), ne(), Y(400, () => {
				x.value = "open", f("opened");
			}));
		}
		function ie() {
			let e = E.value;
			e?.open && e.close(), e && Ii(e), y.value = !1, x.value = "closed", g(() => {
				K?.isConnected && K.focus({ preventScroll: !0 }), K = null, f("closed");
			});
		}
		function ae() {
			y.value && (x.value = "closing", Y(200, ie));
		}
		function oe(e) {
			e.preventDefault(), Z();
		}
		function se(e) {
			e.key === "Escape" && (e.preventDefault(), Z());
		}
		function ce(e) {
			if (!d.closeOnBack || e.target !== E.value) return;
			let t = E.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && Z();
		}
		return S(() => {
			W = !0, d.modelValue && re();
		}), b(() => {
			W = !1, ee(), E.value && (Ii(E.value), E.value.open && E.value.close());
		}), B(() => d.modelValue, (e) => {
			W && (e ? re() : ae());
		}), B(() => d.attach, () => {
			d.modelValue && y.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), V(() => {
			d.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (r, c) => (w(), o(t, null, [M.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-dialog__activator"
		}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), y.value ? (w(), i(n, {
			key: 1,
			to: C.value
		}, [u(hn, h({
			ref_key: "surface",
			ref: v
		}, r.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${x.value}`, {
				"mat-dialog--full-screen": e.fullScreen,
				"mat-dialog--with-icon": A.value,
				"mat-dialog--top": N.value,
				"mat-dialog--transparent-scrim": !e.scrim
			}]],
			style: U.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (D.value ? T : void 0),
			tabindex: "-1",
			onCancel: oe,
			onClick: ce,
			onKeydown: se
		}), {
			default: H(() => [e.fullScreen ? (w(), o(t, { key: 0 }, [s("header", Li, [
				u(Mt, {
					class: "mat-dialog__close",
					icon: "close",
					label: e.closeLabel,
					size: "small",
					variant: "standard",
					onClick: Z
				}, null, 8, ["label"]),
				D.value ? (w(), o("h2", {
					key: 0,
					id: T,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (w(), o("div", Ri, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			]), k.value ? (w(), o("div", zi, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0)], 64)) : (w(), o(t, { key: 1 }, [
				A.value ? (w(), i(Me, {
					key: 0,
					as: "div",
					class: "mat-dialog__icon",
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: H(() => [e.icon === void 0 ? j(r.$slots, "icon", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.icon), 1)], 64))]),
					_: 3
				})) : a("", !0),
				D.value ? (w(), o("h2", {
					key: 1,
					id: T,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
				k.value ? (w(), o("div", Bi, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (w(), o("div", Vi, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			], 64))]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-3a161c9c"]]), Ui = ["aria-label"], Wi = {
	key: 1,
	class: "mat-sheet__header"
}, Gi = {
	key: 1,
	class: "mat-sheet__header-actions"
}, Ki = {
	key: 2,
	class: "mat-sheet__content"
}, qi = {
	key: 3,
	class: "mat-sheet__footer"
}, Ji = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatSheetBase",
	inheritAttrs: !1
}, {
	__name: "MatSheetBase",
	props: {
		attach: {
			type: [String, Object],
			default: "body"
		},
		breakpoint: {
			type: Number,
			default: 840
		},
		closeLabel: {
			type: String,
			default: "关闭"
		},
		closeOnBack: {
			type: Boolean,
			default: !0
		},
		collapseDragHandleLabel: {
			type: String,
			default: "折叠底部面板"
		},
		closable: {
			type: Boolean,
			default: !1
		},
		componentName: {
			type: String,
			required: !0
		},
		content: {
			type: String,
			default: void 0
		},
		direction: {
			type: String,
			required: !0
		},
		dragHandle: {
			type: Boolean,
			default: !1
		},
		dragHandleLabel: {
			type: String,
			default: "展开底部面板"
		},
		draggable: {
			type: Boolean,
			default: !0
		},
		expanded: {
			type: Boolean,
			default: !1
		},
		expandedDragHandleLabel: {
			type: String,
			default: "关闭底部面板"
		},
		modelValue: {
			type: Boolean,
			default: !1
		},
		position: {
			type: String,
			default: "end"
		},
		scrim: {
			type: Boolean,
			default: !0
		},
		title: {
			type: String,
			default: void 0
		},
		variant: {
			type: String,
			default: "auto"
		},
		width: {
			type: [Number, String],
			default: void 0
		}
	},
	emits: {
		closed: () => !0,
		opened: () => !0,
		"update:expanded": (e) => typeof e == "boolean",
		"update:modelValue": (e) => typeof e == "boolean"
	},
	setup(e, { emit: c }) {
		let d = e, f = c, p = L(), m = z(), _ = O(null), v = O(null), y = O(!1), x = O("closed"), C = O(null), T = O(typeof window > "u" ? 0 : window.innerWidth), E = O(0), D = O(null), k = O(!1), A = `${R().replace(/[^\w-]/g, "-")}-title`, M = r(() => v.value?.root ?? v.value?.$el ?? null), N = r(() => d.variant === "auto" ? T.value < We(d.breakpoint, {
			positive: !0,
			fallback: 840
		}) ? "modal" : "standard" : d.variant), P = r(() => N.value === "modal"), I = r(() => P.value && Ai.value.at(-1) === M.value), V = r(() => !!m.activator), U = r(() => d.title !== void 0 || !!m.title), G = r(() => d.content !== void 0 || !!m.default), K = r(() => d.closable), q = r(() => d.expanded ? P.value ? d.expandedDragHandleLabel : d.collapseDragHandleLabel : d.dragHandleLabel), ee = r(() => U.value || K.value || !!m.header || !!m.actions), J = r(() => P.value ? "dialog" : "aside"), Y = r(() => {
			if (d.width !== void 0) return Re(d.width, {
				property: "inline-size",
				positive: !0
			});
		}), X = r(() => {
			if (Y.value) return { "--mat-sheet-preferred-width": Y.value };
		}), Z = r(() => ({
			"--mat-sheet-drag-offset": `${E.value}px`,
			...D.value === null ? {} : { "--mat-sheet-drag-size": `${D.value}px` }
		})), te = r(() => d.direction === "side" && P.value && d.position === "end" ? { "--mat-sheet-modal-end-offset": `${-ji.value}px` } : {}), Q = r(() => [
			p.style,
			X.value,
			Z.value,
			te.value
		]), ne = !1, re, ie = null, ae = !1, oe = null, se = 0, ce = 0, $ = 0, le = 0, ue = !1;
		function de() {
			re !== void 0 && (window.clearTimeout(re), re = void 0);
		}
		function fe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function pe(e, t) {
			if (de(), fe()) {
				t();
				return;
			}
			re = window.setTimeout(() => {
				re = void 0, t();
			}, e);
		}
		function me() {
			let e = _.value ? [..._.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function he() {
			if (typeof d.attach == "string") try {
				return document.querySelector(d.attach);
			} catch {
				return null;
			}
			return d.attach instanceof HTMLElement && d.attach.ownerDocument === document ? d.attach : null;
		}
		function ge() {
			f("update:modelValue", !1);
		}
		function _e() {
			if (ue) {
				ue = !1;
				return;
			}
			if (d.expanded) {
				if (P.value) {
					ge();
					return;
				}
				f("update:expanded", !1);
				return;
			}
			f("update:expanded", !0);
		}
		function ve(e) {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), _e());
		}
		function ye() {
			console.warn(`${d.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`);
		}
		function be() {
			!P.value || U.value || p["aria-label"] || p["aria-labelledby"] || console.warn(`${d.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
		}
		function xe() {
			console.warn(`${d.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function Se() {
			let e = M.value;
			e && (e.querySelector([
				"[autofocus]",
				"button:not([disabled]):not([data-sheet-drag-handle])",
				"input:not([disabled])",
				"textarea:not([disabled])",
				"select:not([disabled])",
				"a[href]",
				"[tabindex]:not([tabindex=\"-1\"])"
			].join(",")) ?? e).focus({ preventScroll: !0 });
		}
		function Ce() {
			let e = M.value;
			e instanceof HTMLDialogElement && (e.open || e.showModal(), Fi(e), Se());
		}
		async function we() {
			if (de(), y.value) {
				x.value = "opening", pe(400, () => {
					x.value = "open", f("opened");
				});
				return;
			}
			let e = V.value ? me() : null;
			if (V.value && !e) {
				ye(), ge();
				return;
			}
			if (P.value) {
				let t = he();
				if (!t) {
					xe(), ge();
					return;
				}
				C.value = t, ie = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			}
			ae = P.value, y.value = !0, x.value = "opening", be(), await g(), !(!d.modelValue || !M.value) && (P.value && Ce(), pe(400, () => {
				x.value = "open", f("opened");
			}));
		}
		function Te() {
			ae && ie?.isConnected && ie.focus({ preventScroll: !0 }), ie = null, ae = !1;
		}
		function Ee() {
			let e = M.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), Ii(e)), y.value = !1, x.value = "closed", E.value = 0, D.value = null, g(() => {
				Te(), f("closed");
			});
		}
		function De() {
			y.value && (x.value = "closing", pe(200, Ee));
		}
		function Oe(e) {
			e.preventDefault(), ge();
		}
		function ke(e) {
			e.key === "Escape" && (e.preventDefault(), ge());
		}
		function Ae(e) {
			if (!P.value || !d.closeOnBack || e.target !== M.value) return;
			let t = M.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && ge();
		}
		function je(e) {
			if (e.pointerId === oe) {
				if (d.direction === "bottom") {
					if (le = e.clientY - se, !d.expanded && le < 0 || d.expanded && le > 0) {
						E.value = 0, D.value = Math.max(0, ce - le);
						return;
					}
					E.value = Math.max(0, le), D.value = ce;
					return;
				}
				E.value = d.position === "start" ? Math.max(0, se - e.clientX) : Math.max(0, e.clientX - se);
			}
		}
		function Me() {
			oe = null, k.value = !1, window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Ne), window.removeEventListener("pointercancel", Pe);
		}
		function Ne(e) {
			if (e.pointerId !== oe) return;
			let t = M.value, n = d.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - $), i = d.direction === "bottom" ? Math.abs(le) : E.value, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (ue = i >= 4, Me(), d.direction === "bottom" && o) {
				if (!d.expanded && le < 0) {
					E.value = 0, D.value = null, f("update:expanded", !0);
					return;
				}
				if (d.expanded && le > 0) {
					E.value = 0, D.value = null, f("update:expanded", !1);
					return;
				}
				if (!d.expanded && le > 0) {
					D.value = null, ge();
					return;
				}
			}
			if (d.direction === "side" && o) {
				ge();
				return;
			}
			E.value = 0, D.value = null;
		}
		function Pe() {
			Me(), E.value = 0, D.value = null;
		}
		function Fe(e) {
			!d.draggable || e.button !== 0 || oe !== null || (oe = e.pointerId, se = d.direction === "bottom" ? e.clientY : e.clientX, ce = d.direction === "bottom" ? M.value?.getBoundingClientRect().height ?? 0 : M.value?.getBoundingClientRect().width ?? 0, $ = performance.now(), le = 0, D.value = d.direction === "bottom" ? ce : null, k.value = !0, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Ne), window.addEventListener("pointercancel", Pe));
		}
		function Ie(e) {
			d.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Fe(e);
		}
		function Le() {
			T.value = window.innerWidth;
		}
		async function ze(e, t) {
			if (!y.value || !d.modelValue || e === t) return;
			de();
			let n = M.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), Ii(n), Te()), e === "modal") {
				let e = he();
				if (!e) {
					xe(), ge();
					return;
				}
				C.value = e, ie = document.activeElement instanceof HTMLElement ? document.activeElement : null, ae = !0, be();
			}
			x.value = "open", await g(), e === "modal" && d.modelValue && Ce();
		}
		return S(() => {
			ne = !0, Le(), window.addEventListener("resize", Le), d.modelValue && we();
		}), b(() => {
			ne = !1, de(), Me(), window.removeEventListener("resize", Le);
			let e = M.value;
			e instanceof HTMLDialogElement && (Ii(e), e.open && e.close());
		}), B(() => d.modelValue, (e) => {
			ne && (e ? we() : De());
		}), B(N, ze), B(() => d.attach, () => {
			d.modelValue && y.value && P.value && console.warn(`${d.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), B(() => d.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${d.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, c) => (w(), o(t, null, [V.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-sheet__activator"
		}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), y.value ? (w(), i(n, {
			key: 1,
			to: C.value ?? "body",
			disabled: !P.value
		}, [u(hn, h({
			ref_key: "surface",
			ref: v
		}, r.$attrs, {
			as: J.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${N.value}`,
				`mat-sheet--${x.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--dragging": k.value,
					"mat-sheet--expanded": e.direction === "bottom" && e.expanded,
					"mat-sheet--top": I.value,
					"mat-sheet--transparent-scrim": !e.scrim
				}
			]],
			style: Q.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (U.value ? A : void 0),
			tabindex: P.value ? -1 : void 0,
			onCancel: Oe,
			onClick: Ae,
			onKeydown: ke,
			onPointerdown: Ie
		}), {
			default: H(() => [
				e.direction === "bottom" && e.dragHandle ? (w(), o("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": q.value,
					onClick: _e,
					onKeydown: ve,
					onPointerdown: W(Fe, ["stop"])
				}, [j(r.$slots, "drag-handle", {}, () => [c[0] ||= s("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, Ui)) : a("", !0),
				ee.value ? (w(), o("header", Wi, [j(r.$slots, "header", {}, () => [
					U.value ? (w(), o("h2", {
						key: 0,
						id: A,
						class: "mat-sheet__title"
					}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
					r.$slots.actions ? (w(), o("div", Gi, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0),
					K.value ? (w(), i(Mt, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: ge
					}, null, 8, ["label"])) : a("", !0)
				], !0)])) : a("", !0),
				G.value ? (w(), o("div", Ki, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0),
				r.$slots.footer ? (w(), o("div", qi, [j(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			]),
			_: 3
		}, 16, [
			"as",
			"class",
			"style",
			"aria-labelledby",
			"tabindex"
		])], 8, ["to", "disabled"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-4b105ff4"]]), Yi = /*@__PURE__*/ Object.assign({
	name: "MatBottomSheet",
	inheritAttrs: !1
}, {
	__name: "MatBottomSheet",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "auto",
			validator: (e) => [
				"auto",
				"standard",
				"modal"
			].includes(e)
		},
		breakpoint: {
			type: Number,
			default: 840,
			validator: (e) => Le(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Le(e, {
				property: "inline-size",
				positive: !0
			})
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		scrim: {
			type: Boolean,
			default: !0
		},
		closeOnBack: {
			type: Boolean,
			default: !0
		},
		dragHandle: {
			type: Boolean,
			default: !0
		},
		collapseDragHandleLabel: {
			type: String,
			default: "折叠底部面板"
		},
		expanded: {
			type: Boolean,
			default: !1
		},
		dragHandleLabel: {
			type: String,
			default: "展开底部面板"
		},
		expandedDragHandleLabel: {
			type: String,
			default: "关闭底部面板"
		},
		draggable: {
			type: Boolean,
			default: !0
		},
		closable: {
			type: Boolean,
			default: !1
		},
		closeLabel: {
			type: String,
			default: "关闭"
		},
		title: {
			type: String,
			default: void 0
		},
		content: {
			type: String,
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		"update:expanded": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: t }) {
		let n = e, r = t;
		return (e, t) => (w(), i(Ji, h({
			...n,
			...e.$attrs
		}, {
			"component-name": "MatBottomSheet",
			direction: "bottom",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e),
			"onUpdate:expanded": t[1] ||= (e) => r("update:expanded", e),
			onOpened: t[2] ||= (e) => r("opened"),
			onClosed: t[3] ||= (e) => r("closed")
		}), c({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: H(() => [j(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots["drag-handle"] ? {
				name: "drag-handle",
				fn: H(() => [j(e.$slots, "drag-handle")]),
				key: "1"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: H(() => [j(e.$slots, "header")]),
				key: "2"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: H(() => [j(e.$slots, "title")]),
				key: "3"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: H(() => [j(e.$slots, "default")]),
				key: "4"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: H(() => [j(e.$slots, "actions")]),
				key: "5"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: H(() => [j(e.$slots, "footer")]),
				key: "6"
			} : void 0
		]), 1040));
	}
}), Xi = /*@__PURE__*/ Object.assign({
	name: "MatSideSheet",
	inheritAttrs: !1
}, {
	__name: "MatSideSheet",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "auto",
			validator: (e) => [
				"auto",
				"standard",
				"modal"
			].includes(e)
		},
		breakpoint: {
			type: Number,
			default: 840,
			validator: (e) => Le(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		position: {
			type: String,
			default: "end",
			validator: (e) => ["start", "end"].includes(e)
		},
		width: {
			type: [Number, String],
			default: 400,
			validator: (e) => Le(e, {
				property: "inline-size",
				positive: !0,
				max: 400
			})
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		scrim: {
			type: Boolean,
			default: !0
		},
		closeOnBack: {
			type: Boolean,
			default: !0
		},
		draggable: {
			type: Boolean,
			default: !0
		},
		closable: {
			type: Boolean,
			default: !0
		},
		closeLabel: {
			type: String,
			default: "关闭"
		},
		title: {
			type: String,
			default: void 0
		},
		content: {
			type: String,
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: t }) {
		let n = e, r = t;
		return (e, t) => (w(), i(Ji, h({
			...n,
			...e.$attrs
		}, {
			"component-name": "MatSideSheet",
			direction: "side",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e),
			onOpened: t[1] ||= (e) => r("opened"),
			onClosed: t[2] ||= (e) => r("closed")
		}), c({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: H(() => [j(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: H(() => [j(e.$slots, "header")]),
				key: "1"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: H(() => [j(e.$slots, "title")]),
				key: "2"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: H(() => [j(e.$slots, "default")]),
				key: "3"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: H(() => [j(e.$slots, "actions")]),
				key: "4"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: H(() => [j(e.$slots, "footer")]),
				key: "5"
			} : void 0
		]), 1040));
	}
}), Zi = { class: "mat-container__content" }, Qi = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatContainer",
	inheritAttrs: !1
}, {
	__name: "MatContainer",
	props: { fluid: {
		type: Boolean,
		default: !1
	} },
	setup(e) {
		let t = e;
		return (e, n) => (w(), o("div", h(e.$attrs, { class: ["mat-container", { "mat-container--fluid": t.fluid }] }), [s("div", Zi, [j(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-f98574ca"]]), $i = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatSpacer",
	inheritAttrs: !1
}, {
	__name: "MatSpacer",
	setup(e) {
		return (e, t) => (w(), o("span", h(e.$attrs, {
			class: "mat-spacer",
			"aria-hidden": "true"
		}), null, 16));
	}
}), [["__scopeId", "data-v-61d08a89"]]), ea = ["aria-valuemax", "aria-valuenow"], ta = ["width", "height"], na = { key: 0 }, ra = ["width", "height"], ia = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, aa = ["d"], oa = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, sa = ["d"], ca = ["d", "mask"], la = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, ua = ["d"], da = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, fa = ["d"], pa = ["d"], ma = {
	key: 1,
	class: "mat-loader__linear-stop"
}, ha = ["viewBox"], ga = { class: "mat-loader__circular-linear-rotate" }, _a = { class: "mat-loader__circular-rotate-arc" }, va = [
	"cx",
	"cy",
	"r"
], ya = ["d"], ba = 4, xa = 3, Sa = 40, Ca = 1.6, wa = 15, Ta = 4, Ea = .001, Da = 100, Oa = 300, ka = 900, Aa = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatLoader",
	inheritAttrs: !1
}, {
	__name: "MatLoader",
	props: {
		variant: {
			type: String,
			default: "linear",
			validator(e) {
				return ["linear", "circular"].includes(e);
			}
		},
		value: {
			type: Number,
			default: 0,
			validator(e) {
				return typeof e == "number" && Number.isFinite(e);
			}
		},
		max: {
			type: Number,
			default: 1,
			validator(e) {
				return typeof e == "number" && Number.isFinite(e) && e > 0;
			}
		},
		indeterminate: {
			type: Boolean,
			default: !1
		},
		thickness: {
			type: Number,
			default: 4,
			validator: (e) => Le(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		shape: {
			type: String,
			default: "flat",
			validator(e) {
				return ["flat", "wavy"].includes(e);
			}
		},
		waveMotion: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: $
		}
	},
	setup(e) {
		function n(e) {
			return typeof e == "number" && Number.isFinite(e);
		}
		function i(e) {
			return n(e) && e > 0;
		}
		function c(e) {
			return Number(e.toFixed(3)).toString();
		}
		function l() {
			return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function u(e, t, n, r, i) {
			let a = t / 2, o = Math.min(e / 2, n / 2), s = Math.max(o, e - n / 2), l = [`M ${c(o)} ${c(a)}`];
			for (let e = o + 2; e < s; e += 2) {
				let t = (e - o) / Sa * Math.PI * 2, n = a - Math.sin(t - i) * r;
				l.push(`L ${c(e)} ${c(n)}`);
			}
			let u = (s - o) / Sa * Math.PI * 2, d = a - Math.sin(u - i) * r;
			return l.push(`L ${c(s)} ${c(d)}`), l.join(" ");
		}
		function d(e, t, n, r) {
			let i = Math.max(1, Math.round(Math.PI * 2 * t / wa)), a = i * 12, o = [];
			for (let s = 0; s <= a; s += 1) {
				let l = s / a, u = l * Math.PI * 2, d = l * Math.PI * 2 * i, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = s === 0 ? "M" : "L";
				o.push(`${h} ${c(p)} ${c(m)}`);
			}
			return o.push("Z"), o.join(" ");
		}
		let f = e, { colorStyle: p } = Ae(r(() => f.color)), m = O(null), g = O(Da), _ = O(+(f.shape === "wavy")), y = O(0), x = `mat-loader-linear-mask-${R()}`, C, T, E, D = r(() => i(f.max) ? f.max : 1), k = r(() => We(f.thickness, {
			positive: !0,
			fallback: 4
		})), A = r(() => f.variant === "circular"), j = r(() => f.shape === "wavy"), M = r(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), D.value);
		}), N = r(() => Number((M.value / D.value * 100).toFixed(3))), P = r(() => k.value + xa * 2 * _.value), F = r(() => Math.min(100, k.value / g.value * 100)), I = r(() => {
			let e = g.value - k.value;
			return e <= 0 ? 1 : g.value / e;
		}), L = r(() => N.value === 100 ? 100 : Math.min(100, Math.max(N.value, F.value + Ea))), z = r(() => u(g.value, P.value, k.value, 0, 0)), V = r(() => u(g.value, P.value, k.value, xa * _.value, y.value)), H = r(() => k.value + 36 + 8 * _.value), U = r(() => H.value / 2), W = r(() => U.value - k.value / 2 - Ca * _.value), G = r(() => `0 0 ${H.value} ${H.value}`), K = r(() => d(U.value, W.value, Ca * _.value, y.value)), q = r(() => {
			let e = Math.PI * 2 * W.value;
			return (ba + k.value) / e * 100;
		}), ee = r(() => Math.min(12, q.value)), J = r(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - N.value - q.value * 2).toFixed(3)), t = Number(Math.min(100, N.value + q.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${c(e)} ${c(100 - e)}`,
				strokeDashoffset: `-${c(t)}`
			};
		}), Y = r(() => f.indeterminate ? {} : { strokeDasharray: `${c(N.value === 0 ? Ea : N.value)} 200` }), X = r(() => ({
			...p.value,
			"--mat-loader-circular-gap-progress": c(ee.value),
			"--mat-loader-circular-radius": `${W.value}px`,
			"--mat-loader-circular-size": `${H.value}px`,
			"--mat-loader-indicator-gap-size": `${ba}px`,
			"--mat-loader-linear-cap-progress": c(F.value),
			"--mat-loader-linear-path-scale": c(I.value),
			"--mat-loader-linear-segment-end": c(L.value),
			"--mat-loader-linear-segment-end-position": `${c(L.value)}%`,
			"--mat-loader-linear-size": `${P.value}px`,
			"--mat-loader-progress": `${N.value}`,
			"--mat-loader-stop-indicator-size": `${Ta}px`,
			"--mat-loader-thickness": `${k.value}px`
		}));
		function Z(e) {
			T = void 0;
			let t = E === void 0 ? 0 : Math.min(64, e - E), n = +!!j.value, r = n - _.value;
			if (E = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / Oa);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (y.value += t / ka * Math.PI * 2, y.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? T = globalThis.requestAnimationFrame(Z) : E = void 0;
		}
		function te() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!j.value;
				return;
			}
			T === void 0 && (E = void 0, T = globalThis.requestAnimationFrame(Z));
		}
		return B(j, te), B(() => f.waveMotion, te), S(() => {
			te(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (C = new globalThis.ResizeObserver(([e]) => {
				let t = e.contentRect.width;
				t > 0 && (g.value = t);
			}), C.observe(m.value));
		}), b(() => {
			C?.disconnect(), T !== void 0 && globalThis.cancelAnimationFrame?.(T);
		}), (n, r) => (w(), o("div", h(n.$attrs, {
			class: ["mat-loader", [
				`mat-loader--${e.variant}`,
				`mat-loader--${e.shape}`,
				{
					"mat-loader--indeterminate": e.indeterminate,
					"mat-loader--wave-motion": e.waveMotion
				}
			]],
			style: X.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": D.value,
			"aria-valuenow": e.indeterminate ? void 0 : M.value
		}), [A.value ? (w(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: G.value,
			"aria-hidden": "true"
		}, [s("g", ga, [s("g", _a, [s("circle", {
			class: "mat-loader__circular-track",
			cx: U.value,
			cy: U.value,
			r: W.value,
			pathLength: "100",
			style: v(J.value)
		}, null, 12, va), s("path", {
			class: "mat-loader__circular-active",
			d: K.value,
			pathLength: "100",
			style: v(Y.value)
		}, null, 12, ya)])])], 8, ha)) : (w(), o("span", {
			key: 0,
			ref_key: "linearElement",
			ref: m,
			class: "mat-loader__linear",
			"aria-hidden": "true"
		}, [
			e.indeterminate ? a("", !0) : (w(), o(t, { key: 0 }, [r[0] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--before" }, null, -1), r[1] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--after" }, null, -1)], 64)),
			(w(), o("svg", {
				class: "mat-loader__linear-indicator",
				width: g.value,
				height: P.value
			}, [
				e.indeterminate ? (w(), o("defs", na, [s("mask", {
					id: x,
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: g.value,
					height: P.value
				}, [
					r[2] ||= s("rect", {
						width: "100%",
						height: "100%",
						fill: "white"
					}, null, -1),
					s("g", ia, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: V.value,
						pathLength: "100"
					}, null, 8, aa)]),
					s("g", oa, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: V.value,
						pathLength: "100"
					}, null, 8, sa)])
				], 8, ra)])) : a("", !0),
				e.indeterminate ? (w(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: z.value,
					pathLength: "100",
					mask: `url(#${x})`
				}, null, 8, ca)) : a("", !0),
				e.indeterminate ? (w(), o(t, { key: 2 }, [s("g", la, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: V.value,
					pathLength: "100"
				}, null, 8, ua)]), s("g", da, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: V.value,
					pathLength: "100"
				}, null, 8, fa)])], 64)) : (w(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: V.value,
					pathLength: "100"
				}, null, 8, pa))
			], 8, ta)),
			e.indeterminate ? a("", !0) : (w(), o("span", ma))
		], 512))], 16, ea));
	}
}), [["__scopeId", "data-v-81aed0bc"]]), ja = Symbol("mat-snackbar-externally-managed"), Ma = [], Na = null;
function Pa() {
	Na || Ma.length === 0 || (Na = Ma.shift(), Na.activate());
}
function Fa(e) {
	e === Na || Ma.includes(e) || (Ma.push(e), Pa());
}
function Ia(e) {
	let t = Ma.indexOf(e);
	t !== -1 && Ma.splice(t, 1);
}
function La(e) {
	Na === e && (Na = null, Pa());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var Ra = { class: "mat-snackbar__text" }, za = {
	key: 0,
	class: "mat-snackbar__controls"
}, Ba = {
	key: 0,
	class: "mat-snackbar__action"
}, Va = {
	key: 1,
	class: "mat-snackbar__close"
}, Ha = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatSnackbar",
	inheritAttrs: !1
}, {
	__name: "MatSnackbar",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		text: {
			type: String,
			default: void 0
		},
		actionText: {
			type: String,
			default: void 0,
			validator(e) {
				return typeof e == "string" && e.trim().length > 0;
			}
		},
		closable: {
			type: Boolean,
			default: !1
		},
		closeLabel: {
			type: String,
			default: "关闭",
			validator(e) {
				return typeof e == "string" && e.trim().length > 0;
			}
		},
		position: {
			type: String,
			default: "center",
			validator(e) {
				return [
					"left",
					"center",
					"right"
				].includes(e);
			}
		},
		duration: {
			type: Number,
			default: 4e3,
			validator(e) {
				return Number.isFinite(e) && e >= 0;
			}
		}
	},
	emits: {
		action: () => !0,
		"update:modelValue": (e) => typeof e == "boolean",
		closed: () => !0
	},
	setup(e, { emit: c }) {
		let d = e, f = c, m = z(), _ = p(ie, re), v = p(Ke, null), y = p(ja, !1), x = O(!1), C = O("closed"), T = O(!1), E = r(() => !!m.default || typeof d.text == "string" && d.text.trim().length > 0), D = r(() => !!m.action || typeof d.actionText == "string" && d.actionText.trim().length > 0), k = r(() => !!m.close || d.closable), A = r(() => D.value || k.value), M = O(0), N = r(() => v ? v.snackbarLayer.value : document.body), P = r(() => typeof d.closeLabel == "string" && d.closeLabel.trim().length > 0 ? d.closeLabel : "关闭"), L = !1, R, V, U = !1, W = null, G = r(() => ({ "--mat-snackbar-toolbar-clearance": `${M.value}px` }));
		function K() {
			M.value = St();
		}
		let q = { activate: le };
		function ee() {
			R !== void 0 && (window.clearTimeout(R), R = void 0);
		}
		function J() {
			V !== void 0 && (window.clearTimeout(V), V = void 0);
		}
		function Y() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function X(e, t) {
			if (J(), Y()) {
				t();
				return;
			}
			V = window.setTimeout(() => {
				V = void 0, t();
			}, e);
		}
		function Z() {
			return Number.isFinite(d.duration) && d.duration >= 0 ? d.duration : 4e3;
		}
		function Q() {
			ee();
			let e = Z();
			e !== 0 && (R = window.setTimeout(() => {
				R = void 0, ce();
			}, e));
		}
		function ne() {
			U || (U = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function ae() {
			x.value && (x.value = !1, C.value = "closed", f("closed"), y || La(q));
		}
		function oe() {
			if (ee(), !x.value) {
				y || Ia(q);
				return;
			}
			C.value !== "closing" && (C.value = "closing", X(200, ae));
		}
		function se() {
			T.value || (T.value = !0, f("update:modelValue", !1));
		}
		function ce() {
			se(), oe();
		}
		function $() {
			!x.value || C.value === "closing" || (ce(), f("action"));
		}
		async function le() {
			if (!L || !d.modelValue || T.value || !E.value) {
				E.value || (ne(), se()), y || La(q);
				return;
			}
			ee(), J(), x.value = !0, C.value = "opening", await g(), !(!L || !x.value || C.value === "closing") && X(400, () => {
				!x.value || C.value === "closing" || (C.value = "open", Q());
			});
		}
		function ue() {
			if (T.value || !E.value) {
				E.value || (ne(), ce());
				return;
			}
			if (y) {
				le();
				return;
			}
			if (x.value && C.value === "closing") {
				le();
				return;
			}
			Fa(q);
		}
		return S(() => {
			L = !0, v || (W = Ct(K), K()), d.modelValue && ue();
		}), b(() => {
			L = !1, W?.(), W = null, ee(), J(), y || (x.value ? La(q) : Ia(q));
		}), B(() => d.modelValue, (e) => {
			if (L) {
				if (e) {
					T.value = !1, ue();
					return;
				}
				T.value = !1, oe();
			}
		}), B(E, (e) => {
			if (L) {
				if (!e) {
					ce();
					return;
				}
				U = !1, d.modelValue && !x.value && !T.value && ue();
			}
		}), B(() => d.duration, () => {
			C.value === "open" && Q();
		}), (r, c) => N.value ? (w(), i(n, {
			key: 0,
			to: N.value
		}, [x.value ? (w(), o("section", h({ key: 0 }, r.$attrs, {
			class: ["mat-snackbar", [
				`mat-snackbar--${C.value}`,
				`mat-snackbar--${e.position}`,
				{
					"mat-snackbar--app-root": I(v),
					"mat-snackbar--with-trailing": A.value
				}
			]],
			style: G.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [s("div", Ra, [r.$slots.default ? j(r.$slots, "default", { key: 0 }, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(e.text), 1)], 64))]), A.value ? (w(), o("div", za, [D.value ? (w(), o("div", Ba, [r.$slots.action ? j(r.$slots, "action", {
			key: 0,
			action: $
		}, void 0, !0) : (w(), i(te, {
			key: 1,
			class: "mat-snackbar__default-action",
			"use-cursor": I(_).useCursor,
			onClick: $
		}, {
			default: H(() => [l(F(e.actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : a("", !0), k.value ? (w(), o("div", Va, [r.$slots.close ? j(r.$slots, "close", {
			key: 0,
			close: ce
		}, void 0, !0) : (w(), i(te, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": P.value,
			"use-cursor": I(_).useCursor,
			onClick: ce
		}, {
			default: H(() => [u(Me, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : a("", !0)])) : a("", !0)], 16)) : a("", !0)], 8, ["to"])) : a("", !0);
	}
}), [["__scopeId", "data-v-b1b76d2a"]]), Ua = ["aria-orientation"], Wa = { class: "mat-toolbar__surface" }, Ga = { class: "mat-toolbar__content" }, Ka = 200, qa = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatToolbar",
	inheritAttrs: !1
}, {
	__name: "MatToolbar",
	props: {
		modelValue: {
			type: Boolean,
			default: !0
		},
		variant: {
			type: String,
			default: "docked",
			validator(e) {
				return [
					"docked",
					"floating",
					"floating-top",
					"floating-bottom",
					"floating-left",
					"floating-right"
				].includes(e);
			}
		},
		position: {
			type: String,
			default: "center",
			validator(e) {
				return [
					"start",
					"center",
					"end"
				].includes(e);
			}
		},
		vibrant: {
			type: Boolean,
			default: !1
		},
		app: {
			type: Boolean,
			default: !1
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		placeholder: {
			type: Boolean,
			default: !1
		},
		bottomPlaceholder: {
			type: [Number, String],
			default: 0,
			validator: (e) => Le(e, {
				property: "block-size",
				allowUndefined: !1
			})
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e) {
		let c = [
			"docked",
			"floating",
			"floating-top",
			"floating-bottom",
			"floating-left",
			"floating-right"
		];
		function l(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let u = e, f = L(), m = z(), _ = d(), y = p(Ke, null), x = _?.vnode.props ?? {}, C = Object.prototype.hasOwnProperty.call(x, "attach"), T = O(u.modelValue), E = O(u.modelValue ? "open" : "closed"), D = O(null), k = O(null), A = O({
			blockSize: 0,
			inlineSize: 0
		}), M = r(() => c.includes(u.variant) ? u.variant === "floating" ? "floating-bottom" : u.variant : "docked"), N = r(() => [
			"start",
			"center",
			"end"
		].includes(u.position) ? u.position : "center"), F = r(() => M.value.startsWith("floating")), R = r(() => M.value === "floating-left" || M.value === "floating-right"), V = r(() => M.value === "docked" || M.value === "floating-bottom"), H = r(() => u.app && !!y && !C), U = r(() => {
			if (!u.app) return null;
			if (H.value) return F.value ? y.freeLayer.value : y.edgeLayer.value;
			if (typeof u.attach == "string") try {
				return document.querySelector(u.attach);
			} catch {
				return null;
			}
			return l(u.attach);
		}), W = r(() => {
			let e = Re(u.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), G = r(() => V.value ? W.value : "0px"), K = r(() => [f.style, {
			"--mat-toolbar-app-end-inset": `${J.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${J.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": G.value
		}]), q = r(() => ({
			blockSize: `${A.value.blockSize}px`,
			inlineSize: `${A.value.inlineSize}px`
		})), ee = r(() => [
			`mat-toolbar--${M.value}`,
			`mat-toolbar--position-${N.value}`,
			{
				"mat-toolbar--app": u.app,
				"mat-toolbar--app-root": H.value,
				"mat-toolbar--vertical": R.value,
				"mat-toolbar--vibrant": u.vibrant
			}
		]), J = P(null), Y, X, Z = !1, te = !1, Q, ne = !1;
		function re() {
			Q !== void 0 && (window.clearTimeout(Q), Q = void 0);
		}
		function ie() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function ae(e) {
			if (re(), ie()) {
				e();
				return;
			}
			Q = window.setTimeout(() => {
				Q = void 0, e();
			}, Ka);
		}
		function oe() {
			re(), T.value = !0, E.value = "opening", ae(() => {
				T.value && u.modelValue && (E.value = "open");
			});
		}
		function se() {
			if (re(), !T.value) {
				E.value = "closed";
				return;
			}
			E.value = "closing", ae(() => {
				u.modelValue || (T.value = !1, E.value = "closed");
			});
		}
		function ce() {
			ne || !m.fab || F.value || (ne = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function $() {
			let e = D.value?.getBoundingClientRect();
			e && (A.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, Y?.update(), J.value?.update());
		}
		function le() {
			if (!D.value) return null;
			let e = D.value.getBoundingClientRect(), t = k.value?.getBoundingClientRect();
			if (!t || t.width === 0 && t.height === 0) return e;
			let n = Math.min(e.left, t.left), r = Math.max(e.right, t.right), i = Math.min(e.top, t.top), a = Math.max(e.bottom, t.bottom);
			return {
				bottom: a,
				height: a - i,
				left: n,
				right: r,
				top: i,
				width: r - n
			};
		}
		async function ue() {
			te && (await g(), $());
		}
		function de() {
			X?.disconnect(), X = void 0, Z = !1, window.removeEventListener("resize", $), Y?.unregister(), Y = void 0, J.value?.unregister(), J.value = null;
		}
		async function fe() {
			if (await g(), te) {
				if (!T.value || !D.value) {
					de();
					return;
				}
				Z || (Z = !0, X = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver($), X?.observe(D.value), window.addEventListener("resize", $)), H.value ? (Y?.unregister(), Y = void 0, !F.value && !J.value && (J.value = y.publicContext.registerEdge({
					edge: "bottom",
					element: D.value
				})), F.value && J.value && (J.value.unregister(), J.value = null)) : (J.value?.unregister(), J.value = null, Y ||= bt(D.value, {
					getRect: le,
					isBottom: () => V.value
				})), k.value && X?.observe(k.value), $(), ce();
			}
		}
		S(() => {
			te = !0, pe(), ce(), fe();
		}), b(() => {
			te = !1, re(), de();
		}), B(() => u.modelValue, (e) => {
			if (te) {
				if (e) {
					oe();
					return;
				}
				se();
			}
		}), B(T, fe), B([
			M,
			N,
			W,
			() => u.app,
			() => u.attach,
			H
		], () => {
			pe(), ue(), fe();
		});
		function pe() {
			u.app && !H.value && !U.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, c) => (w(), o(t, null, [e.placeholder && T.value && (!e.app || U.value) ? (w(), o("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: v(q.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: U.value ?? "body",
			disabled: !e.app
		}, [T.value && (!e.app || U.value) ? (w(), o("div", h({
			key: 0,
			ref_key: "toolbarElement",
			ref: D
		}, r.$attrs, {
			class: ["mat-toolbar", [ee.value, `mat-toolbar--${E.value}`]],
			style: K.value,
			role: "toolbar",
			"aria-orientation": R.value ? "vertical" : void 0
		}), [s("div", Wa, [s("div", Ga, [j(r.$slots, "default", {}, void 0, !0)])]), F.value && I(m).fab ? (w(), o("div", {
			key: 0,
			ref_key: "fabElement",
			ref: k,
			class: "mat-toolbar__fab"
		}, [j(r.$slots, "fab", {}, void 0, !0)], 512)) : a("", !0)], 16, Ua)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-6a9cbad2"]]), Ja = Symbol("mat-panes"), Ya = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], Xa = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatPanes",
	inheritAttrs: !1
}, {
	__name: "MatPanes",
	props: {
		sizes: {
			type: Object,
			required: !0,
			validator(e) {
				return e !== null && !Array.isArray(e) && Object.values(e).every((e) => typeof e == "number" && Number.isFinite(e) && e >= 0);
			}
		},
		resizable: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"update:sizes": (e) => e !== null && !Array.isArray(e) && Object.values(e).every((e) => typeof e == "number" && Number.isFinite(e) && e >= 0),
		"update:widths": (e) => e !== null && !Array.isArray(e) && Object.values(e).every((e) => typeof e == "number" && Number.isInteger(e) && e >= 0),
		"update:breakpoint": (e) => Ya.includes(e)
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = O(null), s = N([]), c = O(null), l = O(null), u = O(null), d = /* @__PURE__ */ new Map(), f, p, m, _, v, y = r(() => c.value ?? x.value), x = r(() => {
			let e = {};
			return s.forEach((t) => {
				let r = n.sizes?.[t.id];
				e[t.id] = typeof r == "number" && Number.isFinite(r) && r >= 0 ? r : 1;
			}), Object.values(e).reduce((e, t) => e + t, 0) === 0 && s.length > 0 && s.forEach((t) => {
				e[t.id] = 1;
			}), e;
		});
		function C(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function E(e, t) {
			return `${e}::${t}`;
		}
		function D(e) {
			return s.findIndex((t) => t.id === e);
		}
		function k(e) {
			return s.find((t) => t.id === e)?.element.value ?? null;
		}
		function A(e) {
			let t = k(e);
			return t ? t.getBoundingClientRect().width : 0;
		}
		function M(e) {
			let t = D(e);
			if (t < 0 || t >= s.length - 1) return null;
			let n = s[t], r = s[t + 1];
			return {
				key: E(n.id, r.id),
				left: n,
				right: r
			};
		}
		function P(e) {
			return y.value[e] ?? 0;
		}
		function F(e) {
			return { "--mat-pane-weight": P(e) };
		}
		function I(e) {
			return n.resizable && M(e) !== null;
		}
		function L(e) {
			return M(e) !== null;
		}
		function R(e) {
			return M(e)?.key === l.value;
		}
		function z(e) {
			let t = M(e);
			if (!t) return {};
			let n = P(t.left.id) + P(t.right.id), r = n === 0 ? 50 : Math.round(P(t.left.id) / n * 100);
			return {
				"aria-controls": t.left.id,
				"aria-label": t.left.resizeLabel.value,
				"aria-orientation": "vertical",
				"aria-valuemax": "100",
				"aria-valuemin": "0",
				"aria-valuenow": String(r)
			};
		}
		function V() {
			return { ...y.value };
		}
		function H(e) {
			_ !== void 0 && globalThis.clearTimeout(_), _ = globalThis.setTimeout(() => {
				_ = void 0, c.value === e && (c.value = null);
			}, 0);
		}
		function U(e) {
			let t = {};
			s.forEach((n) => {
				t[n.id] = Math.max(0, e[n.id] ?? 0);
			}), c.value = t, i("update:sizes", t), H(t);
		}
		function W(e, t, n, r, i) {
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : C(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function G(e) {
			let t = M(e);
			if (!t) return null;
			let n = A(t.left.id), r = A(t.right.id);
			return {
				leftWidth: n,
				rightWidth: r,
				totalWidth: n + r
			};
		}
		function K(e, t) {
			if (!n.resizable || f || t.button !== void 0 && t.button !== 0) return;
			let r = M(e), i = G(e);
			!r || !i || (t.preventDefault(), t.currentTarget?.setPointerCapture?.(t.pointerId), l.value = r.key, f = {
				boundary: r,
				changed: !1,
				metrics: i,
				pointerId: t.pointerId,
				startWeights: V(),
				startX: t.clientX
			});
		}
		function q(e, t) {
			if (!f || f.pointerId !== t.pointerId) return;
			let n = M(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = C(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			c.value = W(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		function ee(e, t, n) {
			if (!f || f.pointerId !== t.pointerId) return;
			let r = M(e), i = f.changed, a = c.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				U(a);
				return;
			}
			c.value = null;
		}
		function J(e, t) {
			let r = M(e);
			if (!r || !n.resizable) return;
			let i = {
				ArrowLeft: -1,
				ArrowRight: 1
			}[t.key], a = G(e), o = V(), s = o[r.left.id] + o[r.right.id] || 2, c = a?.totalWidth || 100, l = c * (o[r.left.id] / s), u;
			if (i !== void 0) u = C(l + i * (t.shiftKey ? 64 : 16), 0, c);
			else if (t.key === "Home") u = 0;
			else if (t.key === "End") u = c;
			else if (t.key === "Enter") {
				let e = r.key, t = o[r.left.id];
				t === 0 ? u = c * (d.get(e) ?? .5) : (d.set(e, t / s), u = 0);
			} else return;
			t.preventDefault(), U(W(r.left.id, r.right.id, u, c, o));
		}
		function Y(e) {
			return s.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), s.push(e), () => {
				let t = s.indexOf(e);
				t !== -1 && s.splice(t, 1);
			};
		}
		function X() {
			let e = /* @__PURE__ */ new Set();
			s.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function Z() {
			let e = {};
			return s.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function te(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function Q() {
			m = void 0;
			let e = Z();
			te(v, e) || (v = e, i("update:widths", e));
		}
		function ne(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(Q, e ? 0 : 100);
		}
		function re() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				ne();
			}), p.disconnect(), a.value && p.observe(a.value), s.forEach((e) => {
				e.element.value && p.observe(e.element.value);
			}));
		}
		function ie(e) {
			return e < 600 ? "compact" : e < 840 ? "medium" : e < 1200 ? "expanded" : e < 1600 ? "large" : "extra-large";
		}
		function ae(e = !1) {
			let t = ie(globalThis.window === void 0 ? 0 : globalThis.window.innerWidth);
			(e || u.value !== t) && (u.value = t, i("update:breakpoint", t));
		}
		function oe() {
			ae();
		}
		return T(Ja, {
			getHandleAttributes: z,
			getPaneStyle: F,
			hasBoundary: L,
			handleKeyDown: J,
			handlePointerDown: K,
			handlePointerMove: q,
			isBoundaryActive: R,
			isHandleVisible: I,
			registerPane: Y,
			finishPointerInteraction: ee
		}), B(() => s.map((e) => e.id), async () => {
			await g(), X(), re(), ne();
		}, {
			flush: "post",
			immediate: !0
		}), B(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), S(() => {
			ae(!0), re(), ne(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", oe);
		}), b(() => {
			globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", oe), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), _ !== void 0 && globalThis.clearTimeout(_);
		}), (e, t) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-3c44b789"]]), Za = ["id"], Qa = {
	key: 0,
	class: "mat-pane__separator"
}, $a = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], eo = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatPane",
	inheritAttrs: !1
}, {
	__name: "MatPane",
	props: {
		id: {
			type: String,
			required: !0,
			validator(e) {
				return e.length > 0;
			}
		},
		resizeLabel: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = e, i = p(Ja, null), c = O(null), l = r(() => n.resizeLabel), u, d = r(() => i?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = r(() => !!i?.hasBoundary(n.id)), m = r(() => !!i?.isHandleVisible(n.id)), g = r(() => i?.getHandleAttributes(n.id) ?? {}), v = r(() => !!i?.isBoundaryActive(n.id));
		function y() {
			u?.(), u = void 0, i && (u = i.registerPane({
				element: c,
				id: n.id,
				resizeLabel: l
			}));
		}
		return S(y), B(() => n.id, y), b(() => u?.()), (n, r) => (w(), o(t, null, [s("div", h({
			ref_key: "root",
			ref: c
		}, n.$attrs, {
			id: e.id,
			class: "mat-pane",
			style: d.value
		}), [j(n.$slots, "default", {}, void 0, !0)], 16, Za), f.value ? (w(), o("div", Qa, [m.value ? (w(), o("div", {
			key: 0,
			class: _(["mat-pane__handle", { "mat-pane__handle--active": v.value }]),
			role: "separator",
			"aria-controls": g.value["aria-controls"],
			"aria-label": g.value["aria-label"],
			"aria-orientation": g.value["aria-orientation"],
			"aria-valuemax": g.value["aria-valuemax"],
			"aria-valuemin": g.value["aria-valuemin"],
			"aria-valuenow": g.value["aria-valuenow"],
			tabindex: "0",
			onKeydown: r[0] ||= (t) => I(i).handleKeyDown(e.id, t),
			onLostpointercapture: r[1] ||= (t) => I(i).finishPointerInteraction(e.id, t, !1),
			onPointercancel: r[2] ||= (t) => I(i).finishPointerInteraction(e.id, t, !1),
			onPointerdown: r[3] ||= (t) => I(i).handlePointerDown(e.id, t),
			onPointermove: r[4] ||= (t) => I(i).handlePointerMove(e.id, t),
			onPointerup: r[5] ||= (t) => I(i).finishPointerInteraction(e.id, t, !0)
		}, null, 42, $a)) : a("", !0)])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-7d81b20c"]]), to = Symbol("mat-navigation-rail"), no = ["aria-label"], ro = {
	key: 0,
	class: "mat-navigation-rail__header"
}, io = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, ao = {
	key: 1,
	class: "mat-navigation-rail__content"
}, oo = {
	key: 2,
	class: "mat-navigation-rail__end"
}, so = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatNavigationRail",
	inheritAttrs: !1
}, {
	__name: "MatNavigationRail",
	props: {
		orientation: {
			type: String,
			default: "vertical",
			validator(e) {
				return ["vertical", "horizontal"].includes(e);
			}
		},
		modelValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: null
		},
		expanded: {
			type: Boolean,
			default: !1
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Le(e, { property: "inline-size" })
		},
		position: {
			type: String,
			default: "start",
			validator(e) {
				return ["start", "end"].includes(e);
			}
		},
		collapsible: {
			type: Boolean,
			default: !1
		},
		layout: {
			type: String,
			default: "standard",
			validator(e) {
				return ["standard", "modal"].includes(e);
			}
		},
		hideOnCollapse: {
			type: Boolean,
			default: !1
		},
		alignment: {
			type: String,
			default: "top",
			validator(e) {
				return ["top", "center"].includes(e);
			}
		},
		openIcon: {
			type: String,
			default: "menu"
		},
		closeIcon: {
			type: String,
			default: "menu_open"
		},
		openLabel: {
			type: String,
			default: "展开导航"
		},
		closeLabel: {
			type: String,
			default: "收起导航"
		},
		app: {
			type: Boolean,
			default: !1
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		placeholder: {
			type: Boolean,
			default: !1
		},
		bottomPlaceholder: {
			type: [Number, String],
			default: 0,
			validator: (e) => Le(e, {
				property: "block-size",
				allowUndefined: !1
			})
		}
	},
	emits: {
		"update:modelValue": (e) => [
			"string",
			"number",
			"boolean"
		].includes(typeof e),
		"update:expanded": (e) => typeof e == "boolean"
	},
	setup(e, { emit: c }) {
		function l(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let f = e, m = c, y = p(ie, re), x = d(), C = p(Ke, null), E = x?.vnode.props ?? {}, D = Object.prototype.hasOwnProperty.call(E, "attach"), k = r(() => f.orientation === "horizontal"), A = r(() => f.expanded), M = r(() => !k.value && f.layout === "modal"), N = r(() => !k.value && f.hideOnCollapse && !f.expanded), F = r(() => f.app && !!C && !D), L = r(() => {
			if (!f.app) return null;
			if (F.value) return C.edgeLayer.value;
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return l(f.attach);
		}), R = r(() => f.expanded ? f.closeIcon : f.openIcon), z = r(() => f.expanded ? f.closeLabel : f.openLabel), V = r(() => ({
			"mat-navigation-rail-host--vertical": !k.value,
			"mat-navigation-rail-host--horizontal": k.value,
			"mat-navigation-rail-host--expanded": A.value,
			"mat-navigation-rail-host--collapsed": !f.expanded,
			[`mat-navigation-rail-host--${f.position}`]: !0,
			"mat-navigation-rail-host--modal": M.value,
			"mat-navigation-rail-host--hidden": N.value,
			"mat-navigation-rail-host--app": f.app,
			"mat-navigation-rail-host--app-root": F.value
		})), U = r(() => ({
			"mat-navigation-rail--expanded": A.value,
			"mat-navigation-rail--collapsed": !f.expanded,
			"mat-navigation-rail--bar": k.value,
			"mat-navigation-rail--modal": M.value && f.expanded,
			"mat-navigation-rail--hidden": N.value,
			"mat-navigation-rail--app": f.app,
			"mat-navigation-rail--app-root": F.value
		})), W = r(() => {
			let e = Re(f.width, { property: "inline-size" });
			if (e !== void 0) return { "--mat-navigation-rail-expanded-width": e };
		}), G = r(() => {
			if (!f.app || F.value) return "0px";
			let e = Re(f.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), K = r(() => [W.value, {
			"--mat-navigation-rail-app-end-inset": `${X.value?.insets.end ?? 0}px`,
			"--mat-navigation-rail-app-start-inset": `${X.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-bottom-placeholder": G.value
		}]), q = O(null), ee = O(null), J = O({
			blockSize: 0,
			inlineSize: 0
		}), Y = r(() => ({
			blockSize: `${J.value.blockSize}px`,
			inlineSize: `${J.value.inlineSize}px`
		})), X = P(null), Z;
		function Q() {
			let e = q.value?.getBoundingClientRect();
			e && (J.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, X.value?.update());
		}
		async function ne() {
			Z?.disconnect(), Z = void 0, X.value?.unregister(), X.value = null, await g(), !(!f.app || !q.value) && (Z = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(Q), Z?.observe(q.value), F.value && (X.value = C.publicContext.registerEdge({
				edge: k.value ? "bottom" : f.position,
				element: q.value
			})), Q());
		}
		function ae() {
			f.app && !F.value && !L.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		function oe(e) {
			return e !== void 0 && Object.is(f.modelValue, e);
		}
		function se(e) {
			e === void 0 || Object.is(f.modelValue, e) || m("update:modelValue", e);
		}
		function ce() {
			m("update:expanded", !f.expanded);
		}
		function $() {
			m("update:expanded", !1);
		}
		function le(e) {
			e.key === "Escape" && M.value && f.expanded && $();
		}
		return T(to, {
			expanded: A,
			isSelected: oe,
			orientation: r(() => f.orientation),
			position: r(() => f.position),
			requestSelection: se,
			useCursor: y.useCursor
		}), S(() => {
			window.addEventListener("keydown", le), ae(), ne();
		}), b(() => {
			window.removeEventListener("keydown", le), Z?.disconnect(), X.value?.unregister();
		}), B([
			() => f.app,
			() => f.attach,
			() => f.bottomPlaceholder,
			() => f.expanded,
			() => f.hideOnCollapse,
			() => f.layout,
			() => f.orientation,
			() => f.width,
			F
		], () => {
			ae(), ne();
		}), (r, c) => (w(), o(t, null, [e.app && L.value && e.placeholder ? (w(), o("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(Y.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: L.value ?? "body",
			disabled: !e.app
		}, [!e.app || L.value ? (w(), o("div", {
			key: 0,
			ref_key: "hostElement",
			ref: q,
			class: _(["mat-navigation-rail-host", V.value]),
			style: v(K.value)
		}, [M.value && e.expanded ? (w(), o("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": e.closeLabel,
			onClick: $
		}, null, 8, no)) : a("", !0), s("nav", h({
			ref_key: "railElement",
			ref: ee
		}, r.$attrs, { class: ["mat-navigation-rail", U.value] }), [
			k.value ? a("", !0) : (w(), o("div", ro, [
				N.value ? a("", !0) : j(r.$slots, "header", {
					key: 0,
					expanded: e.expanded
				}, void 0, !0),
				e.collapsible ? (w(), i(te, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": e.expanded,
					"aria-label": z.value,
					"focus-ring": !1,
					"use-cursor": I(y).useCursor,
					onClick: ce
				}, {
					default: H(() => [u(Me, {
						icon: R.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : a("", !0),
				r.$slots.fab && !N.value ? (w(), o("div", io, [j(r.$slots, "fab", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
			])),
			N.value ? a("", !0) : (w(), o("div", ao, [s("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${e.alignment}`]) }, [j(r.$slots, "default", {
				expanded: A.value,
				orientation: e.orientation
			}, void 0, !0)], 2)])),
			r.$slots.end && !N.value && !k.value ? (w(), o("div", oo, [j(r.$slots, "end", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
		], 16)], 6)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-5fe85766"]]), co = { class: "mat-navigation-rail-item__indicator" }, lo = { class: "mat-navigation-rail-item__icon-wrap" }, uo = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, fo = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, po = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({
	name: "MatNavigationRailItem",
	inheritAttrs: !1
}, {
	__name: "MatNavigationRailItem",
	props: {
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		icon: {
			type: String,
			default: void 0
		},
		href: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: { click: (e) => e instanceof MouseEvent },
	setup(e, { emit: t }) {
		let n = e, c = t, l = z(), u = p(ie, re), d = p(to, null), f = r(() => d?.expanded.value ?? !1), m = r(() => d?.orientation.value === "horizontal"), g = r(() => d?.position.value ?? "start"), _ = r(() => f.value), v = r(() => d?.isSelected(n.value) ?? !1), y = r(() => !!(n.icon || l.icon)), b = r(() => ({
			"mat-navigation-rail-item--selected": v.value,
			"mat-navigation-rail-item--disabled": n.disabled,
			"mat-navigation-rail-item--expanded": f.value,
			"mat-navigation-rail-item--collapsed": !f.value,
			"mat-navigation-rail-item--horizontal": m.value,
			[`mat-navigation-rail-item--${g.value}`]: !0
		}));
		function x(e) {
			n.disabled || d?.requestSelection(n.value), c("click", e);
		}
		return (t, n) => (w(), i(te, h(t.$attrs, {
			class: ["mat-navigation-rail-item", b.value],
			"aria-current": v.value ? "page" : void 0,
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			"use-cursor": I(u).useCursor,
			onClick: x
		}), {
			default: H(() => [s("span", co, [s("span", lo, [I(l).icon ? j(t.$slots, "icon", {
				key: 0,
				selected: v.value
			}, void 0, !0) : y.value ? (w(), i(Me, {
				key: 1,
				fill: +!!v.value,
				icon: e.icon,
				class: "mat-navigation-rail-item__icon",
				"aria-hidden": "true"
			}, null, 8, ["fill", "icon"])) : a("", !0)]), _.value ? (w(), o("span", uo, [j(t.$slots, "default", {}, void 0, !0)])) : a("", !0)]), _.value ? a("", !0) : (w(), o("span", fo, [j(t.$slots, "default", {}, void 0, !0)]))]),
			_: 3
		}, 16, [
			"class",
			"aria-current",
			"disabled",
			"href",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-59b42c01"]]), mo = /* @__PURE__ */ new WeakMap();
function ho(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function go(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = ho(t.value), i = new IntersectionObserver((t, r) => {
		let i = mo.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), mo.delete(e));
	}, r);
	mo.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function _o(e) {
	let t = mo.get(e);
	t && (t.observer.unobserve(e), mo.delete(e));
}
var vo = {
	mounted: go,
	updated(e, t) {
		mo.has(e) && (_o(e), go(e, t));
	},
	unmounted: _o
}, yo = re, bo = null;
function xo(e, t) {
	yo = e, bo = t;
}
function So() {
	return yo;
}
function Co() {
	return bo;
}
//#endregion
//#region src/theme.js
var wo = "#20a6fc", To = "(prefers-color-scheme: dark)";
function Eo(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function Do(e) {
	if (!_e.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function Oo(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function ko(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function Ao(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function jo(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? wo, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	Eo(t), Ao(n), Do(r), Oo(i), ko(a);
	let o = O(t), s = O(Ce(n)), c = O(r), l = O(i), u = O("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(To)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = we({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(ve).forEach(([t, n]) => {
			a.style.setProperty(`--mat-sys-color-${n}`, X(e[t]));
		}), a.setAttribute?.("data-mat-theme", u.value), a.style.colorScheme = u.value;
	}
	function _(e) {
		o.value === "system" && (u.value = e.matches ? "dark" : "light", g());
	}
	function v() {
		!d || !f || (d.removeEventListener("change", _), f = !1);
	}
	function y() {
		if (v(), o.value !== "system" || p) return;
		let e = m();
		e && (e.addEventListener("change", _), f = !0);
	}
	function b(e) {
		Eo(e), o.value = e, y(), g();
	}
	function x(e) {
		Ao(e), s.value = Ce(e), g();
	}
	function S(e) {
		Do(e), c.value = e, g();
	}
	function C(e) {
		Oo(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(ve).forEach((e) => {
			a.style.removeProperty(`--mat-sys-color-${e}`);
		}), a.removeAttribute?.("data-mat-theme"), a.style.removeProperty("color-scheme");
	}
	return y(), g(), {
		mode: D(o),
		resolvedMode: D(u),
		seedColor: D(s),
		schemeVariant: D(c),
		contrastLevel: D(l),
		target: a,
		setMode: b,
		setSeedColor: x,
		setSchemeVariant: S,
		setContrastLevel: C,
		dispose: w
	};
}
//#endregion
//#region src/plugin.js
var Mo = [
	[
		"MatAppRoot",
		"mat-app-root",
		It
	],
	[
		"MatAppBar",
		"mat-app-bar",
		Yt
	],
	[
		"MatSearch",
		"mat-search",
		$t
	],
	[
		"MatBtn",
		"mat-btn",
		Mt
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		nn
	],
	[
		"MatFab",
		"mat-fab",
		un
	],
	[
		"MatIcon",
		"mat-icon",
		Me
	],
	[
		"MatImage",
		"mat-image",
		fn
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		mn
	],
	[
		"MatCard",
		"mat-card",
		Sn
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		wn
	],
	[
		"MatCardContent",
		"mat-card-content",
		En
	],
	[
		"MatCardActions",
		"mat-card-actions",
		On
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		_n
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		xn
	],
	[
		"MatCardMedia",
		"mat-card-media",
		yn
	],
	[
		"MatList",
		"mat-list",
		In
	],
	[
		"MatListGroup",
		"mat-list-group",
		Yn
	],
	[
		"MatListItem",
		"mat-list-item",
		Kn
	],
	[
		"MatDivider",
		"mat-divider",
		nr
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		cr
	],
	[
		"MatChip",
		"mat-chip",
		pr
	],
	[
		"MatChipSet",
		"mat-chip-set",
		vr
	],
	[
		"MatRadio",
		"mat-radio",
		br
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		Cr
	],
	[
		"MatSwitch",
		"mat-switch",
		wr
	],
	[
		"MatSlider",
		"mat-slider",
		$r
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		ri
	],
	[
		"MatTextField",
		"mat-text-field",
		xi
	],
	[
		"MatTextarea",
		"mat-textarea",
		Si
	],
	[
		"MatInputBase",
		"mat-input-base",
		Xt
	],
	[
		"MatMenu",
		"mat-menu",
		wi
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		Ei
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		ki
	],
	[
		"MatDialog",
		"mat-dialog",
		Hi
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		Yi
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		Xi
	],
	[
		"MatHover",
		"mat-hover",
		Ge
	],
	[
		"MatContainer",
		"mat-container",
		Qi
	],
	[
		"MatSpacer",
		"mat-spacer",
		$i
	],
	[
		"MatScrollArea",
		"mat-scroll-area",
		gr
	],
	[
		"MatLoader",
		"mat-loader",
		Aa
	],
	[
		"MatTooltip",
		"mat-tooltip",
		Dt
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		Ha
	],
	[
		"MatToolbar",
		"mat-toolbar",
		qa
	],
	[
		"MatPanes",
		"mat-panes",
		Xa
	],
	[
		"MatPane",
		"mat-pane",
		eo
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		so
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		po
	]
];
function No(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function Po(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? re.iconClass;
}
function Fo(e, t) {
	let n = e[t];
	if (n === void 0) return ne[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function Io(e) {
	let t = e.tooltip;
	if (t === void 0) return ne;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi tooltip 必须是对象");
	return Object.freeze({
		openDelay: Fo(t, "openDelay"),
		skipDelayDuration: Fo(t, "skipDelayDuration")
	});
}
function Lo(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: Po(e),
		tooltip: Io(e),
		useCursor: No(e, "useCursor")
	}), n = jo(e.theme);
	return {
		theme: n,
		install(e) {
			Mo.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r);
			}), e.directive("intersection", vo), e.provide(ie, t), e.provide(De, n), xo(t, n);
		}
	};
}
function Ro() {
	let e = p(De, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mde-vue 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var zo = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, Bo = /*#__PURE__*/ Z(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		let n = e;
		T(ie, So());
		let s = Co();
		s && T(De, s);
		let c = O(!0), d = P(n.cancelValue), f = O(n.options.promptConfig?.defaultValue ?? ""), p = r(() => !!n.options.promptConfig), m = r(() => n.options.promptConfig?.required ?? !1), g = r(() => m.value && f.value.trim().length === 0), _ = r(() => {
			let e = { ...n.options };
			return delete e.actions, delete e.ariaLabel, delete e.promptConfig, n.options.promptConfig && delete e.content, e;
		});
		function v(e, t) {
			e.disabled || p.value && t === n.options.actions.length - 1 && g.value || (d.value = p.value && t === n.options.actions.length - 1 ? f.value : e.value, c.value = !1);
		}
		function y() {
			n.onClosed(d.value);
		}
		return (n, r) => (w(), i(Hi, h({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: H(() => [u($i), (w(!0), o(t, null, A(e.options.actions, (t, n) => (w(), i(Mt, {
				key: n,
				color: t.color,
				disabled: t.disabled || p.value && n === e.options.actions.length - 1 && g.value,
				variant: t.variant,
				onClick: (e) => v(t, n)
			}, {
				default: H(() => [l(F(t.text), 1)]),
				_: 2
			}, 1032, [
				"color",
				"disabled",
				"variant",
				"onClick"
			]))), 128))]),
			default: H(() => [p.value ? (w(), o(t, { key: 0 }, [e.options.content ? (w(), o("p", zo, F(e.options.content), 1)) : a("", !0), u(xi, {
				modelValue: f.value,
				"onUpdate:modelValue": r[0] ||= (e) => f.value = e,
				autofocus: "",
				label: e.options.promptConfig.label,
				placeholder: e.options.promptConfig.placeholder,
				required: e.options.promptConfig.required
			}, null, 8, [
				"modelValue",
				"label",
				"placeholder",
				"required"
			])], 64)) : a("", !0)]),
			_: 1
		}, 16, ["modelValue", "aria-label"]));
	}
}), [["__scopeId", "data-v-217b4d5a"]]), Vo = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], Ho = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], Uo = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function Wo(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function Go() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function Ko(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function qo(e) {
	let t = e ?? "body", n = null;
	if (typeof t == "string") try {
		n = document.querySelector(t);
	} catch {
		throw TypeError("dialog attach 必须是有效的 CSS 选择器或 HTMLElement");
	}
	else if (t instanceof HTMLElement && t.ownerDocument === document) n = t;
	else throw TypeError("dialog attach 必须是有效的 CSS 选择器或 HTMLElement");
	if (!n) throw TypeError("dialog attach 未找到目标元素");
	return n;
}
function Jo(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !Vo.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function Yo(e) {
	if (Ko(e), Ho.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), Uo.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !Wo(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(Jo),
		attach: qo(e.attach)
	};
	return [
		...Ho,
		...Uo,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function Xo(e, t) {
	try {
		Go();
		let n = Yo(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				k(f(Bo, {
					cancelValue: t,
					options: n,
					onClosed(t) {
						k(null, i), i.remove(), e(t);
					}
				}), i);
			} catch (e) {
				k(null, i), i.remove(), r(e);
			}
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
function Zo(e = {}) {
	return Xo(e, void 0);
}
function Qo(e = {}) {
	try {
		if (Ko(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return Xo({
			...e,
			actions: [{
				text: e.confirmText ?? "确定",
				value: void 0
			}]
		}, void 0);
	} catch (e) {
		return Promise.reject(e);
	}
}
function $o(e = {}) {
	try {
		Ko(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return Xo({
			...e,
			actions: [{
				text: n,
				value: !1
			}, {
				text: t,
				value: !0
			}]
		}, !1);
	} catch (e) {
		return Promise.reject(e);
	}
}
function es(e = {}) {
	try {
		Ko(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消", r = e.defaultValue ?? "", i = e.required ?? !1;
		if ([
			[
				"confirmText",
				t,
				!0
			],
			[
				"cancelText",
				n,
				!0
			],
			[
				"defaultValue",
				r,
				!1
			],
			[
				"label",
				e.label,
				!1
			],
			[
				"placeholder",
				e.placeholder,
				!1
			]
		].forEach(([e, t, n]) => {
			if (t !== void 0 && (typeof t != "string" || n && t.trim().length === 0)) throw TypeError(`prompt ${e} 必须是${n ? "非空" : ""}字符串`);
		}), typeof i != "boolean") throw TypeError("prompt required 必须是 boolean");
		return Xo({
			...e,
			actions: [{
				text: n,
				value: null
			}, {
				text: t,
				value: void 0
			}],
			promptConfig: {
				defaultValue: r,
				label: e.label,
				placeholder: e.placeholder,
				required: i
			}
		}, null);
	} catch (e) {
		return Promise.reject(e);
	}
}
//#endregion
//#region src/components/mat-snackbar/ImperativeSnackbarHost.vue
var ts = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
	__name: "ImperativeSnackbarHost",
	props: {
		options: {
			type: Object,
			required: !0
		},
		onClosed: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		let t = e;
		T(ie, So()), T(ja, !0);
		let n = Co();
		n && T(De, n);
		let a = O(!0), o = r(() => {
			let e = { ...t.options };
			return delete e.onAction, e;
		});
		function s() {
			t.onClosed();
		}
		function c() {
			t.options.onAction?.();
		}
		return (e, t) => (w(), i(Ha, h({
			modelValue: a.value,
			"onUpdate:modelValue": t[0] ||= (e) => a.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), ns = [
	"left",
	"center",
	"right"
], rs = null;
function is() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function as(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function os(e) {
	if (as(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !ns.includes(e.position)) throw TypeError("snackbar position 无效");
	if (e.duration !== void 0 && (!Number.isFinite(e.duration) || e.duration < 0)) throw TypeError("snackbar duration 必须是大于等于 0 的有限数字");
	return {
		actionText: e.actionText,
		closable: e.closable ?? !1,
		closeLabel: e.closeLabel ?? "关闭",
		duration: e.duration ?? 4e3,
		onAction: e.onAction,
		position: e.position ?? "center",
		text: e.text
	};
}
function ss() {
	return rs?.isConnected ? rs : (rs = document.createElement("div"), rs.dataset.matSnackbarHost = "", document.body.append(rs), rs);
}
function cs() {
	!rs || rs.childNodes.length > 0 || (rs.remove(), rs = null);
}
function ls(e) {
	try {
		is();
		let t = os(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = rs;
				t && k(null, t), e(), La(i), cs();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = rs;
				t && k(null, t), n(e), La(i), cs();
			}
			i = { activate() {
				try {
					let e = ss();
					k(f(ts, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, Fa(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var us = ls;
//#endregion
export { vo as Intersection, Yt as MatAppBar, It as MatAppRoot, Yi as MatBottomSheet, Mt as MatBtn, nn as MatBtnGroup, Sn as MatCard, wn as MatCardActionArea, On as MatCardActions, En as MatCardContent, _n as MatCardHeadline, yn as MatCardMedia, xn as MatCardSubhead, cr as MatCheckbox, pr as MatChip, vr as MatChipSet, Qi as MatContainer, Hi as MatDialog, nr as MatDivider, un as MatFab, Ge as MatHover, Me as MatIcon, fn as MatImage, Xt as MatInputBase, In as MatList, Yn as MatListGroup, Kn as MatListItem, Aa as MatLoader, wi as MatMenu, Ei as MatMenuGroup, ki as MatMenuItem, so as MatNavigationRail, po as MatNavigationRailItem, eo as MatPane, Xa as MatPanes, br as MatRadio, Cr as MatRadioGroup, ri as MatRangeSlider, gr as MatScrollArea, $t as MatSearch, Xi as MatSideSheet, $r as MatSlider, Ha as MatSnackbar, $i as MatSpacer, mn as MatSplitBtn, wr as MatSwitch, xi as MatTextField, Si as MatTextarea, qa as MatToolbar, Dt as MatTooltip, Qo as alert, $o as confirm, Lo as createMatUi, Zo as dialog, es as prompt, ls as snackbar, us as toast, qe as useMatApp, Ro as useMatTheme };
