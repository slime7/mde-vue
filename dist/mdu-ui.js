import { Comment as e, Fragment as t, Teleport as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, getCurrentInstance as d, h as f, inject as p, isVNode as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, onUpdated as x, openBlock as S, provide as C, readonly as w, ref as T, render as E, renderList as D, renderSlot as O, resolveDynamicComponent as k, shallowReactive as A, shallowRef as j, toDisplayString as M, unref as N, useAttrs as P, useId as F, useSlots as I, watch as L, watchEffect as R, withCtx as z, withModifiers as B } from "vue";
import { Hct as V, SchemeExpressive as H, SchemeNeutral as U, SchemeTonalSpot as W, SchemeVibrant as G, argbFromHex as K, hexFromArgb as q } from "@material/material-color-utilities";
//#region \0plugin-vue:export-helper
var J = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Y = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let a = e, o = n, s = r(() => a.href !== void 0), c = r(() => s.value ? "a" : a.as), l = r(() => c.value === "button"), u = T(!1), d = T(null), f = 0, p;
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
		function b(e) {
			let t = s.value ? ["Enter"] : [" ", "Enter"];
			!e.repeat && t.includes(e.key) && _();
		}
		function x(e) {
			(s.value ? ["Enter"] : [" ", "Enter"]).includes(e.key) && g();
		}
		function C(e) {
			if (a.disabled) {
				e.preventDefault(), e.stopImmediatePropagation();
				return;
			}
			o("click", e);
		}
		return L(() => a.disabled, (e) => {
			e && (m(), u.value = !1);
		}), y(m), t({ root: d }), (t, n) => (S(), i(k(c.value), h({
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
			onClick: C,
			onKeydown: b,
			onKeyup: x,
			onLostpointercapture: g,
			onPointercancel: g,
			onPointerdown: v,
			onPointerup: g
		}), {
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-04ce13e2"]]), X = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		return (t, r) => (S(), i(Y, h(t.$attrs, {
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
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-pressed",
			"disabled",
			"type"
		]));
	}
}), [["__scopeId", "data-v-04ffd7cb"]]), ee = Object.freeze({
	openDelay: 0,
	skipDelayDuration: 0
}), te = Object.freeze({
	iconClass: "material-symbols-outlined",
	tooltip: ee,
	useCursor: !1
}), Z = Symbol("mdu-ui-options"), Q = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], ne = ["round", "square"], re = [
	"button",
	"submit",
	"reset"
], ie = [
	"primary",
	"secondary",
	"tertiary",
	"error"
];
function $(e) {
	return e === void 0 || ie.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var ae = Object.freeze({
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
}), oe = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function se(e) {
	return typeof e == "string" && (Object.hasOwn(ae, e) || oe.test(e));
}
function ce(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function le(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function ue(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function de(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function fe(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var pe = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], me = {
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
}, he = {
	"tonal-spot": W,
	neutral: U,
	vibrant: G,
	expressive: H
}, ge = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], _e = 64, ve = /* @__PURE__ */ new Map();
function ye(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function be({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = he[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(V.fromInt(K(ye(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function xe(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, q(e[t])])));
}
function Se(e, t = "tonal-spot", n = 0) {
	let r = ye(e), i = `${r}|${t}|${n}|2025|phone`, a = ve.get(i);
	if (a) return ve.delete(i), ve.set(i, a), a;
	let o = Object.freeze({
		light: xe(be({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), ge),
		dark: xe(be({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), ge)
	});
	if (ve.set(i, o), ve.size > _e) {
		let e = ve.keys().next().value;
		ve.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var Ce = Symbol("mdu-ui-theme"), we = "tonal-spot", Te = 0;
function Ee(e) {
	let t = p(Ce, null), n = r(() => N(e) !== void 0);
	return {
		colorStyle: r(() => {
			let n = N(e);
			if (!n || !$(n)) return {};
			if (ie.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			let r = Se(n, t?.schemeVariant.value ?? we, t?.contrastLevel.value ?? Te);
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
var De = ["src"], Oe = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: se
		},
		fill: {
			type: Number,
			default: 0,
			validator: le
		},
		weight: {
			type: Number,
			default: 400,
			validator: ue
		},
		grade: {
			type: Number,
			default: 0,
			validator: de
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: fe
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
			validator: ce
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = e, a = p(Z, te), { colorStyle: s, hasExplicitColor: c } = Ee(r(() => n.color)), u = r(() => n.iconClass ?? a.iconClass), d = r(() => n.icon !== void 0), f = r(() => ae[n.size]?.fontSize ?? n.size), m = r(() => n.opticalSize ?? ae[n.size]?.opticalSize ?? 24), g = r(() => ({
			...s.value,
			"--mat-icon-size": f.value,
			color: n.fontColor ?? (c.value ? "var(--mat-accent-color)" : "currentColor"),
			fontVariationSettings: `'FILL' ${n.fill}, 'wght' ${n.weight}, 'GRAD' ${n.grade}, 'opsz' ${m.value}`
		}));
		return (n, r) => (S(), i(k(e.as), h(n.$attrs, {
			class: ["mat-icon", u.value],
			style: g.value
		}), {
			default: z(() => [e.src === void 0 ? d.value ? (S(), o(t, { key: 1 }, [l(M(e.icon), 1)], 64)) : O(n.$slots, "default", { key: 2 }, void 0, !0) : (S(), o("img", {
				key: 0,
				class: "mat-icon__image",
				src: e.src,
				alt: ""
			}, null, 8, De))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-a72d28ee"]]), ke = /*@__PURE__*/ Object.assign({
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
			default: 0
		},
		openDelay: {
			type: [Number, String],
			default: 0
		},
		target: {
			type: [String, Object],
			default: void 0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: t }) {
		let n = e, i = t, o = I(), s = d()?.vnode.props ?? {}, c = Object.prototype.hasOwnProperty.call(s, "modelValue") || Object.prototype.hasOwnProperty.call(s, "model-value"), l = T(!1), u = T(null), f = j(null), p = r(() => c ? n.modelValue : u.value), m, h = null;
		function g() {
			m !== void 0 && (window.clearTimeout(m), m = void 0);
		}
		function _(e) {
			let t = Number(e ?? 0);
			return !Number.isFinite(t) || t < 0 ? 0 : t;
		}
		function v(e) {
			l.value = e, !n.disabled && (i("update:modelValue", e), !c && (u.value = e));
		}
		function S(e, t) {
			g();
			let n = _(t);
			if (n === 0) {
				v(e);
				return;
			}
			m = window.setTimeout(() => {
				m = void 0, v(e);
			}, n);
		}
		function C() {
			S(!0, n.openDelay);
		}
		function w() {
			S(!1, n.closeDelay);
		}
		function E(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? E(e.value) : "$el" in e ? E(e.$el) : null : null;
		}
		function D() {
			if (typeof n.target != "string") return E(n.target);
			try {
				return E(document.querySelector(n.target));
			} catch {
				return null;
			}
		}
		function k() {
			h &&= (h(), null);
		}
		function A() {
			let e = D();
			e !== f.value && (k(), f.value = e, e && (e.addEventListener("mouseenter", C), e.addEventListener("mouseleave", w), h = () => {
				e.removeEventListener("mouseenter", C), e.removeEventListener("mouseleave", w);
			}));
		}
		let M = {
			onMouseenter: C,
			onMouseleave: w
		};
		return L(() => n.disabled, (e, t) => {
			if (t && !e) {
				if (c) {
					i("update:modelValue", l.value);
					return;
				}
				u.value = l.value, i("update:modelValue", l.value);
			}
		}), L(D, A, { flush: "sync" }), b(A), x(A), y(() => {
			g(), k();
		}), (e, t) => N(o).default ? O(e.$slots, "default", {
			key: 0,
			isHovering: p.value,
			props: M
		}) : a("", !0);
	}
}), Ae = [
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
], je = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function Me(e) {
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
function Ne(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function Pe(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function Fe(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function Ie(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function Le(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: Ne(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: Pe(t, n, r)
	};
}
function Re(e) {
	return [
		e,
		je[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== je[e])
	];
}
function ze(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function Be(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function Ve(e, t, n, r, i, a, o, s) {
	let c = Le(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: Fe(c.left, a, l),
		top: Fe(c.top, a, u)
	}, f = ze(d, r);
	return Be(f, n) || s.some((e) => Be(f, Me(e))) ? null : d;
}
function He({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = Me(i), c = Me(a), [l, u = "center"] = (Ae.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = Ie(l, s, o, r, t), m = je[l], h = Ie(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = Re(g), b = e.map((e) => Me(e)), x = y.find((e) => Ie(e, s, o, r, t) >= f && Ve(e, d, s, c, o, r, t, b)) ?? y.find((e) => Ve(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = Le(x, d, s, c, t);
	return {
		left: Math.round(Fe(C.left, r, _)),
		location: S,
		top: Math.round(Fe(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var Ue = null, We = /* @__PURE__ */ new WeakMap();
function Ge(e) {
	Ue && Ue !== e && Ue.close(), Ue = e;
}
function Ke(e) {
	Ue === e && (Ue = null);
}
function qe(e, t) {
	e && We.set(e, {
		owner: t,
		expiresAt: Infinity
	});
}
function Je(e, t, n) {
	if (!e) return;
	let r = We.get(e);
	if (!(!r || r.owner !== t)) {
		if (n <= 0) {
			We.delete(e);
			return;
		}
		r.expiresAt = Date.now() + n;
	}
}
function Ye(e, t) {
	if (!e) return !1;
	let n = We.get(e);
	return !n || n.owner === t ? !1 : n.expiresAt < Date.now() ? (We.delete(e), !1) : !0;
}
//#endregion
//#region src/components/toolbar-overlay.js
var Xe = /* @__PURE__ */ new Map(), Ze = /* @__PURE__ */ new Set(), Qe = 0;
function $e(e) {
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
function et() {
	Ze.forEach((e) => e());
}
function tt() {
	Xe.forEach((e, t) => {
		e.element.isConnected || Xe.delete(t);
	});
}
function nt(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = Qe;
	Qe += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return Xe.set(n, r), et(), {
		unregister() {
			i && (i = !1, Xe.delete(n), et());
		},
		update() {
			i && et();
		}
	};
}
function rt() {
	return tt(), [...Xe.values()].flatMap((e) => {
		try {
			return [$e(e.getRect())];
		} catch {
			return [];
		}
	});
}
function it(e = window.innerHeight) {
	tt();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...Xe.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - $e(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function at(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return Ze.add(e), e(), () => {
		Ze.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var ot = ["id", "data-location"], st = 1500, ct = 150, lt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return Ae.includes(e);
			}
		},
		openDelay: {
			type: [Number, String],
			default: void 0,
			validator(e) {
				if (typeof e == "string" && e.trim() === "") return !1;
				let t = typeof e == "string" ? Number(e) : e;
				return Number.isFinite(t) && t >= 0;
			}
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: c }) {
		let u = e, f = c, m = P(), _ = I(), v = d(), C = p(Z, te), w = T(null), E = j(null), D = { value: E }, k = j(null), A = T(null), R = T(!1), z = T(!1), B = T(!1), V = T("closed"), H = T("top"), U = T({}), W = T(!1), G = `${F().replace(/[^\w-]/g, "-")}-tooltip`, K = r(() => typeof m.id == "string" ? m.id : G), q = r(() => u.content === void 0 ? !!_.default : u.content.length > 0), J = r(() => !!_.activator), Y = v?.vnode.props ?? {}, X = Object.prototype.hasOwnProperty.call(Y, "modelValue") || Object.prototype.hasOwnProperty.call(Y, "model-value"), ee, Q, ne, re, ie = !1, $, ae = null, oe = null, se = null, ce = null, le = null, ue = !1, de = !1, fe = !1, pe = !1, me = null, he = { close: Xe }, ge = Symbol("mat-tooltip-delay-group-owner");
		function _e(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? _e(e.value) : "$el" in e ? _e(e.$el) : null : null;
		}
		function ve(e) {
			try {
				return _e(document.querySelector(e));
			} catch {
				return null;
			}
		}
		function ye() {
			return typeof u.target == "string" ? ve(u.target) : _e(u.target);
		}
		function be() {
			let e = w.value ? [...w.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function xe() {
			return J.value ? be() : ye();
		}
		function Se() {
			return Ce() ? typeof u.attach == "string" ? ve(u.attach) : _e(u.attach) : Ee() ?? document.body;
		}
		function Ce() {
			let e = v?.vnode.props ?? {};
			return Object.prototype.hasOwnProperty.call(e, "attach");
		}
		function we(e) {
			if (!e.hasAttribute("popover")) return !1;
			try {
				return e.matches(":popover-open") || e.hasAttribute("data-popover-open");
			} catch {
				return e.hasAttribute("data-popover-open");
			}
		}
		function Te(e) {
			return e.localName === "dialog" && e.hasAttribute("open") || we(e);
		}
		function Ee() {
			let e = E.value;
			for (; e;) {
				if (Te(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function De() {
			let e = u.openDelay ?? C.tooltip.openDelay, t = typeof e == "string" ? Number(e) : e;
			return !Number.isFinite(t) || t < 0 ? 0 : t;
		}
		function Oe() {
			return E.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function Ae() {
			Q !== void 0 && (window.clearTimeout(Q), Q = void 0);
		}
		function je() {
			ee !== void 0 && (window.clearTimeout(ee), ee = void 0);
		}
		function Me() {
			ne !== void 0 && (window.clearTimeout(ne), ne = void 0);
		}
		function Ne() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Pe(e, t) {
			if (Me(), Ne()) {
				t();
				return;
			}
			ne = window.setTimeout(() => {
				ne = void 0, t();
			}, e);
		}
		function Fe() {
			re !== void 0 && (ie ? window.cancelAnimationFrame(re) : window.clearTimeout(re), re = void 0, ie = !1);
		}
		function Ie() {
			ce && (le === null ? ce.removeAttribute("aria-describedby") : ce.setAttribute("aria-describedby", le), ce = null, le = null);
		}
		function Le() {
			let e = E.value;
			if (!z.value || !e || ce === e) return;
			Ie(), ce = e, le = e.getAttribute("aria-describedby");
			let t = (le ?? "").split(/\s+/).filter(Boolean);
			t.includes(K.value) || t.push(K.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function Re() {
			Fe(), $?.disconnect(), $ = void 0, oe &&= (oe(), null), se &&= (se(), null);
		}
		function ze() {
			if (!z.value || !E.value || !A.value) return;
			let e = He({
				location: u.location,
				targetRect: E.value.getBoundingClientRect(),
				tooltipRect: A.value.getBoundingClientRect(),
				avoidRects: rt(),
				viewport: {
					height: window.innerHeight,
					width: window.innerWidth
				}
			});
			H.value = e.location, U.value = {
				left: `${e.left}px`,
				top: `${e.top}px`
			}, B.value = !0;
		}
		function Be() {
			if (!z.value || re !== void 0) return;
			let e = () => {
				re = void 0, ie = !1, ze();
			};
			if (typeof window.requestAnimationFrame == "function") {
				ie = !0, re = window.requestAnimationFrame(e);
				return;
			}
			re = window.setTimeout(e, 0);
		}
		function Ve() {
			oe || (window.addEventListener("resize", Be), document.addEventListener("scroll", Be, !0), oe = () => {
				window.removeEventListener("resize", Be), document.removeEventListener("scroll", Be, !0);
			}, se = at(Be), typeof ResizeObserver < "u" && ($ = new ResizeObserver(Be), $.observe(E.value), $.observe(A.value)));
		}
		function Ue() {
			R.value = !1, V.value = "closed", z.value = !1, B.value = !1, k.value = null;
		}
		function We({ immediate: e = !1 } = {}) {
			if (Ae(), je(), Re(), Ie(), Ke(he), !R.value) {
				Ue();
				return;
			}
			if (!(!e && V.value === "closing")) {
				if (e) {
					Me(), Ue();
					return;
				}
				z.value = !1, V.value = "closing", Pe(ct, Ue);
			}
		}
		function Xe() {
			X && (W.value = !0, f("update:modelValue", !1)), We();
		}
		function Ze() {
			pe || (pe = !0, console.warn(J.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function Qe({ warn: e = !0 } = {}) {
			let t = xe();
			if (t === E.value) {
				!t && q.value && e && Ze();
				return;
			}
			let n = E.value !== null;
			Ie(), dt(), E.value = t, pe = !1, !t && q.value && e && Ze(), ft(), n && z.value && Xe();
		}
		function $e() {
			if (je(), X || z.value || W.value || !q.value) return;
			let e = Ye(Oe(), ge) ? 0 : De();
			if (e === 0) {
				pt();
				return;
			}
			Q === void 0 && (Q = window.setTimeout(() => {
				Q = void 0, pt();
			}, e));
		}
		function et() {
			Ae(), !(X || !z.value || de || fe) && ee === void 0 && (ee = window.setTimeout(() => {
				ee = void 0, Xe();
			}, st));
		}
		function tt() {
			if (de || fe) {
				$e();
				return;
			}
			Je(me, ge, C.tooltip.skipDelayDuration), et();
		}
		function nt(e) {
			de = e, tt();
		}
		function it() {
			fe = !0, tt();
		}
		function lt(e) {
			E.value?.contains(e.relatedTarget) || (fe = !1, tt());
		}
		function ut(e) {
			e.key === "Escape" && (e.preventDefault(), Xe());
		}
		function dt() {
			ae && (ae(), ae = null, de = !1, fe = !1);
		}
		function ft() {
			let e = E.value;
			e && (e.addEventListener("keydown", ut), !X && q.value && (e.addEventListener("focusin", it), e.addEventListener("focusout", lt)), ae = () => {
				e.removeEventListener("keydown", ut), e.removeEventListener("focusin", it), e.removeEventListener("focusout", lt);
			});
		}
		async function pt() {
			if (W.value || !q.value) return;
			if (Qe({ warn: !0 }), !E.value) {
				Xe();
				return;
			}
			let e = Se();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Xe();
				return;
			}
			Ae(), je(), Me(), Ge(he), me = Oe(), qe(me, ge), k.value = e, H.value = u.location, U.value = {
				left: "0px",
				top: "0px"
			}, B.value = !1, V.value = "opening", R.value = !0, z.value = !0, await g(), z.value && (Le(), ze(), Ve());
		}
		return b(async () => {
			ue = !0, Qe({ warn: !1 }), await g(), ue && (Qe({ warn: !1 }), X && u.modelValue && pt());
		}), x(() => {
			Qe({ warn: !1 }), z.value && Be();
		}), y(() => {
			ue = !1, Me(), dt(), We({ immediate: !0 });
		}), L(() => u.modelValue, (e) => {
			if (!(!ue || !X)) {
				if (e) {
					W.value = !1, pt();
					return;
				}
				W.value = !1, We();
			}
		}), L([() => u.content, () => u.target], async () => {
			await g();
			let e = E.value;
			Qe({ warn: !1 }), E.value === e && (dt(), ft()), q.value || Xe();
		}), L(() => u.attach, async () => {
			if (!z.value) return;
			let e = Se();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Xe();
				return;
			}
			k.value = e, await g(), Be();
		}), L(() => u.location, () => {
			z.value && Be();
		}), L(K, () => {
			!z.value || !ce || (Ie(), Le());
		}), (r, c) => (S(), o(t, null, [
			!N(X) && q.value ? (S(), i(ke, {
				key: 0,
				target: D,
				"onUpdate:modelValue": nt
			})) : a("", !0),
			J.value || !e.target ? (S(), o("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: w,
				class: "mat-tooltip__activator"
			}, [O(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			R.value && k.value ? (S(), i(n, {
				key: 2,
				to: k.value
			}, [s("span", h(r.$attrs, {
				id: K.value,
				ref_key: "tooltipElement",
				ref: A,
				class: ["mat-tooltip", [`mat-tooltip--${V.value}`, { "mat-tooltip--positioned": B.value }]],
				"data-location": H.value,
				style: [U.value, r.$attrs.style],
				role: "tooltip"
			}), [e.content === void 0 ? O(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.content), 1)], 64))], 16, ot)], 8, ["to"])) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-10f9986d"]]), ut = Symbol("mdu-ui-button-group"), dt = Symbol("mdu-ui-split-button");
//#endregion
//#region src/components/use-button.js
function ft(e, t) {
	let n = p(Z, te), i = p(ut, null), a = p(dt, null), o = r(() => a?.size.value ?? e.size ?? i?.size.value ?? "small"), s = r(() => a ? "round" : e.shape ?? i?.shape.value ?? "round"), c = r(() => a?.variant.value ?? e.variant), l = r(() => a?.color.value ?? e.color ?? i?.color.value), u = r(() => e.disabled || !!a?.disabled.value || !!i?.disabled.value), d = r(() => !!(i && i.selection.value !== "none")), f = r(() => a?.role === "trailing" ? a.expanded.value : d.value ? i.isSelected(e.value) : e.selected), m = r(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = Ee(l);
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
var pt = {
	key: 2,
	class: "mat-btn__label"
}, mt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return Q.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return ne.includes(e);
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
				return re.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let s = e, c = n, u = P(), d = I(), f = T(null), p = F(), { colorStyle: g, effectiveDisabled: _, effectiveSelected: v, effectiveShape: y, effectiveSize: x, effectiveToggle: C, effectiveVariant: w, handleClick: E, hasExplicitColor: D, split: k, useCursor: A } = ft(s, c), j = r(() => C.value && w.value !== "text"), L = r(() => j.value && v.value), B = r(() => s.icon === !0 || typeof s.icon == "string" && s.icon.trim().length > 0);
		function V(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : m(e) ? e.type === t && Array.isArray(e.children) ? V(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? V(e.children) : [] : []).join("").trim();
		}
		let H = r(() => s.icon === !0 ? V(d.default?.() ?? []) : ""), U = r(() => typeof s.icon == "string" ? s.icon.trim() : H.value), W = r(() => u["aria-label"] ?? s.label), G = r(() => B.value ? u.title ?? s.label : void 0), K = r(() => !B.value && (s.prefix !== void 0 || !!d.prefix)), q = r(() => !B.value && (s.suffix !== void 0 || !!d.suffix)), J = r(() => L.value && !!d.selected), Y = r(() => ({
			"extra-small": 20,
			small: B.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[x.value]);
		return b(() => {
			s.icon === !0 && !H.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), R(() => {
			s.toggle && s.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), B.value && (!W.value || W.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (n, r) => (S(), i(X, h({
			ref_key: "buttonElement",
			ref: f
		}, N(u), {
			class: ["mat-btn", [
				`mat-btn--${N(w)}`,
				`mat-btn--size-${N(x)}`,
				`mat-btn--shape-${N(y)}`,
				{
					"mat-button--explicit-color": N(D),
					"mat-btn--icon": B.value,
					[`mat-btn--width-${e.width}`]: B.value,
					"mat-btn--toggle": j.value,
					"mat-btn--selected": L.value,
					"mat-btn--split-leading": N(k)?.role === "leading"
				}
			]],
			style: N(g),
			"aria-label": B.value ? W.value : N(u)["aria-label"],
			"aria-controls": N(k)?.role === "trailing" ? N(k).controls.value : void 0,
			"aria-expanded": N(k)?.role === "trailing" ? N(k).expanded.value : void 0,
			"aria-haspopup": N(k)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": j.value ? L.value : void 0,
			block: e.block,
			disabled: N(_),
			title: B.value ? void 0 : N(u).title,
			type: e.type,
			"use-cursor": N(A),
			onClick: N(E)
		}), {
			default: z(() => [
				B.value ? (S(), i(Oe, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: +!!L.value,
					"optical-size": Y.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [l(M(U.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : a("", !0),
				K.value ? (S(), i(Oe, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: +!!L.value,
					"optical-size": Y.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [e.prefix === void 0 ? O(n.$slots, "prefix", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				B.value ? a("", !0) : (S(), o("span", pt, [J.value ? O(n.$slots, "selected", { key: 0 }, void 0, !0) : O(n.$slots, "default", { key: 1 }, void 0, !0)])),
				q.value ? (S(), i(Oe, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: +!!L.value,
					"optical-size": Y.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [e.suffix === void 0 ? O(n.$slots, "suffix", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				B.value && G.value ? (S(), i(lt, {
					key: 4,
					content: G.value,
					id: `${N(p)}-tooltip`,
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
}), [["__scopeId", "data-v-4ae5f888"]]), ht = 150, gt = .75, _t = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return Q.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return ne.includes(e);
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
		let n = e, i = t, a = T(null), s = T(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set(), d, f, p = ht, m = !0, _ = !1, { colorStyle: v } = Ee(r(() => n.color));
		function x(e) {
			return n.selection === "multiple" ? Array.isArray(n.selected) && n.selected.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.selected, e);
		}
		function w(e, t) {
			if (e === void 0) {
				console.warn("MatBtnGroup: selection 不为 none 时，子按钮必须提供 value");
				return;
			}
			let r = x(e);
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
		C(ut, {
			color: r(() => n.color),
			disabled: r(() => n.disabled),
			isSelected: x,
			requestSelection: w,
			selection: r(() => n.selection),
			shape: r(() => n.shape),
			size: r(() => n.size),
			variant: r(() => n.variant)
		});
		function E(e) {
			return e instanceof Element ? e.closest(".mat-button-base") : null;
		}
		function D(e) {
			let t = e.trim().match(/^(\d*\.?\d+)(ms|s)$/);
			if (!t) return null;
			let n = Number.parseFloat(t[1]);
			return t[2] === "s" ? n * 1e3 : n;
		}
		function k(e) {
			let [t] = getComputedStyle(e).transitionDuration.split(",");
			return D(t ?? "") ?? ht;
		}
		function A() {
			return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function j() {
			d !== void 0 && (globalThis.clearTimeout(d), d = void 0);
		}
		function M() {
			f !== void 0 && (globalThis.clearTimeout(f), f = void 0);
		}
		function P() {
			j(), M(), u.forEach((e) => {
				let t = e;
				t.style.inlineSize = c.get(t) ?? "", c.delete(t), l.delete(t);
			}), u.clear(), s.value && delete s.value.dataset.matGroupPressed, s.value = null, p = ht, m = !0, _ = !1;
		}
		function F() {
			if (j(), s.value) {
				if (A() || p === 0) {
					P();
					return;
				}
				u.forEach((e) => {
					let t = e;
					t.style.inlineSize = `${l.get(t)}px`;
				}), delete s.value.dataset.matGroupPressed, s.value = null, m = !0, _ = !1, f = globalThis.setTimeout(() => {
					f = void 0, P();
				}, p);
			}
		}
		function I() {
			if (s.value) {
				if (m) {
					F();
					return;
				}
				_ = !0;
			}
		}
		function R(e) {
			m = !1, _ = !1;
			let t = k(e);
			if (p = t, A() || t === 0) {
				m = !0;
				return;
			}
			d = globalThis.setTimeout(() => {
				d = void 0, s.value === e && (m = !0, _ && F());
			}, t * gt);
		}
		function z(e) {
			if (n.variant !== "standard" || e.disabled || s.value === e) return;
			let t = e;
			P();
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
			}), t.dataset.matGroupPressed = "", s.value = t, R(t);
		}
		async function B(e) {
			let t = E(e.target);
			t && (await g(), z(t));
		}
		function V(e) {
			e.relatedTarget instanceof Node && a.value?.contains(e.relatedTarget) || I();
		}
		async function H(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = E(e.target);
			t && (await g(), z(t));
		}
		function U() {
			if (n.variant !== "connected" || !a.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...a.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return b(U), y(P), L(() => [n.variant, n.selection], async () => {
			P(), await g(), U();
		}), (t, n) => (S(), o("div", h({
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
			style: N(v),
			role: "group",
			onFocusout: V,
			onKeydown: H,
			onKeyupCapture: I,
			onLostpointercaptureCapture: I,
			onPointercancelCapture: I,
			onPointerdown: B,
			onPointerupCapture: I
		}), [O(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-15b9823a"]]), vt = [
	"small",
	"medium",
	"large"
], yt = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], bt = [
	"button",
	"submit",
	"reset"
];
function xt(e) {
	return typeof e == "string" && yt.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var St = {
	key: 1,
	class: "mat-fab__label"
}, Ct = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return vt.includes(e);
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
			validator: xt
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return bt.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(t, { emit: n }) {
		let s = t, c = n, u = P(), d = I(), f = p(Z, te), m = T(null), g = F(), _ = r(() => (d.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), v = r(() => typeof s.icon == "string" && s.icon.trim().length > 0), y = r(() => !_.value), b = r(() => y.value ? u.title ?? s.label : void 0), x = r(() => y.value ? s.label : u["aria-label"]), C = r(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[s.size]), w = r(() => ({
			"--mat-fab-container-color": `var(--mat-sys-color-${s.color})`,
			"--mat-fab-content-color": `var(--mat-sys-color-on-${s.color})`,
			"--mat-fab-state-color": `var(--mat-sys-color-on-${s.color})`
		}));
		return R(() => {
			y.value && (!v.value || !s.label || s.label.trim().length === 0) && console.warn("MatFab: 图标模式必须提供非空 label");
		}), (e, n) => (S(), i(X, h({
			ref_key: "buttonElement",
			ref: m
		}, e.$attrs, {
			class: ["mat-fab", [`mat-fab--size-${t.size}`, {
				"mat-fab--extended": _.value,
				"mat-fab--icon-only": y.value
			}]],
			style: w.value,
			"aria-label": x.value,
			disabled: t.disabled,
			title: y.value ? void 0 : N(u).title,
			type: t.type,
			"use-cursor": N(f).useCursor,
			onClick: n[0] ||= (e) => c("click", e)
		}), {
			default: z(() => [
				v.value ? (S(), i(Oe, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": C.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [l(M(t.icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : a("", !0),
				_.value ? (S(), o("span", St, [O(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				y.value && b.value ? (S(), i(lt, {
					key: 2,
					content: b.value,
					id: `${N(g)}-tooltip`,
					target: m.value
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
}), [["__scopeId", "data-v-7f1883c0"]]), wt = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = p(dt), a = I();
		C(dt, {
			...r,
			role: n.role
		});
		function o(e) {
			return e.flatMap((e) => m(e) && e.type === t && Array.isArray(e.children) ? o(e.children) : [e]);
		}
		function s() {
			return o(a.default?.() ?? []).find((e) => m(e) && (e.type?.name ?? e.type?.__name) === "MatBtn") ?? null;
		}
		return (e, t) => (S(), i(s));
	}
}), Tt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return Q.includes(e);
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
		let n = e, i = t, a = T(null), c = I(), { colorStyle: l, hasExplicitColor: d } = Ee(r(() => n.color));
		C(dt, {
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
		return b(m), L(() => [n.size, n.variant], async () => {
			await g(), m();
		}), (t, n) => (S(), o("div", h({
			ref_key: "root",
			ref: a
		}, t.$attrs, {
			class: ["mat-split-btn", [
				`mat-split-btn--${e.variant}`,
				`mat-split-btn--size-${e.size}`,
				{
					"mat-split-btn--block": e.block,
					"mat-split-btn--expanded": e.expanded,
					"mat-split-btn--explicit-color": N(d)
				}
			]],
			style: N(l),
			role: "group"
		}), [s("span", {
			class: "mat-split-btn__segment mat-split-btn__leading",
			onClick: f
		}, [u(wt, { role: "leading" }, {
			default: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), s("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [u(wt, { role: "trailing" }, {
			default: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-647c3562"]]), Et = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatSurfaceBase",
	inheritAttrs: !1
}, {
	__name: "MatSurfaceBase",
	props: { as: {
		type: String,
		default: "div"
	} },
	setup(e, { expose: t }) {
		let n = T(null);
		return t({ root: n }), (t, r) => (S(), i(k(e.as), h({
			ref_key: "root",
			ref: n
		}, t.$attrs, { class: "mat-surface-base" }), {
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-76b082b5"]]), Dt = { class: "mat-card-headline" }, Ot = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (S(), o("div", Dt, [O(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-acf29196"]]), kt = { class: "mat-card-media" }, At = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (S(), o("div", kt, [O(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-7208424e"]]), jt = { class: "mat-card-subhead" }, Mt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (S(), o("div", jt, [O(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-2c6ca74d"]]), Nt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let t = e, { colorStyle: n, hasExplicitColor: o } = Ee(r(() => t.color));
		return (t, r) => (S(), i(Et, h(t.$attrs, {
			class: ["mat-card", [`mat-card--${e.variant}`, { "mat-card--explicit-color": N(o) }]],
			style: N(n),
			as: e.as
		}), {
			default: z(() => [
				t.$slots.media ? (S(), i(At, { key: 0 }, {
					default: z(() => [O(t.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.headline ? (S(), i(Ot, { key: 1 }, {
					default: z(() => [O(t.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.subhead ? (S(), i(Mt, { key: 2 }, {
					default: z(() => [O(t.$slots, "subhead", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				O(t.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"as"
		]));
	}
}), [["__scopeId", "data-v-c8df8af3"]]), Pt = { class: "mat-card-action-area__content" }, Ft = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => re.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = t, r = p(Z, te);
		return (t, a) => (S(), i(Y, h(t.$attrs, {
			class: "mat-card-action-area",
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			type: e.type,
			"use-cursor": N(r).useCursor,
			onClick: a[0] ||= (e) => n("click", e)
		}), {
			default: z(() => [s("span", Pt, [O(t.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-7e019121"]]), It = { class: "mat-card-content" }, Lt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (S(), o("div", It, [O(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-8a32cf5d"]]), Rt = { class: "mat-card-actions" }, zt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (S(), o("div", Rt, [O(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-f3e5f8e6"]]), Bt = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], Vt = Symbol("mat-list"), Ht = Symbol("mat-list-group-activator");
function Ut(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function Wt(e) {
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
	return y(c), {
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
function Gt(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function Kt(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(Gt);
}
var qt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return Bt.includes(e);
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
				return e.every(Gt);
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
			return Array.isArray(e) && e.every(Gt);
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = T(null), s = r(() => Ut(n.interaction)), c = r(() => s.value ? "div" : "ul"), { colorStyle: l } = Ee(r(() => n.color)), u = [], d = [
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
		function x(e) {
			return !(e instanceof HTMLElement) || e.closest("[data-mat-list-disabled=\"true\"]") || e.closest("[data-mat-list-group-content][inert]") || e.matches(":disabled") || e.getAttribute("aria-disabled") === "true" ? !1 : e.hasAttribute("data-mat-list-group-activator") ? !0 : !e.hasAttribute("data-mat-list-primary") && n.interaction !== "multi-action" ? !1 : n.interaction !== "none";
		}
		function w(e) {
			if (s.value) {
				let t = e.find((e) => e.getAttribute("aria-selected") === "true");
				if (t) return t;
			}
			return e[0] ?? null;
		}
		let E = Wt({
			root: o,
			selector: d,
			isAvailable: x,
			findInitial: w,
			observedAttributes: [
				"aria-disabled",
				"aria-hidden",
				"disabled",
				"href",
				"inert"
			]
		});
		function D(e) {
			let t = {
				ArrowDown: 1,
				ArrowRight: 1,
				ArrowUp: -1,
				ArrowLeft: -1
			}[e.key];
			t === void 0 || !(e.target instanceof HTMLElement) || (e.preventDefault(), E.move(e.target, t));
		}
		return C(Vt, {
			interaction: r(() => n.interaction),
			isSelectable: s,
			variant: r(() => n.variant),
			isGroupExpanded: m,
			isSelected: f,
			registerGroupValue: v,
			requestFocusRefresh: E.queueRefresh,
			requestGroupExpanded: _,
			requestSelection: p,
			unregisterGroupValue: y
		}), b(E.observe), L(o, async () => {
			E.restore(), await g(), E.observe();
		}), L(() => n.interaction, async () => {
			E.restore(), await g(), E.observe();
		}), L(() => n.selected, async () => {
			o.value?.contains(document.activeElement) || E.resetActive(), await g(), E.queueRefresh();
		}, { deep: !0 }), (t, n) => (S(), i(k(c.value), h({
			ref_key: "root",
			ref: o
		}, t.$attrs, {
			class: ["mat-list", `mat-list--${e.variant}`],
			style: N(l),
			"aria-multiselectable": e.interaction === "multi-select" ? "true" : t.$attrs["aria-multiselectable"],
			"aria-orientation": s.value ? "vertical" : t.$attrs["aria-orientation"],
			role: s.value ? "listbox" : t.$attrs.role,
			onFocusin: N(E).handleFocusIn,
			onKeydown: D
		}), {
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-d4055dce"]]), Jt = ["data-line-count"], Yt = ["inert"], Xt = ["inert"], Zt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
		return (t, n) => (S(), o("span", {
			"data-mat-item-content": "",
			"data-line-count": e.lineCount,
			class: _([
				e.namespace,
				`${e.namespace}--lines-${e.lineCount}`,
				{ [`${e.namespace}--separate-trailing`]: e.separateTrailing }
			])
		}, [
			t.$slots.leading ? (S(), o("span", {
				key: 0,
				"data-mat-item-content-leading": "",
				class: _(`${e.namespace}__leading`),
				inert: e.presentationSlots ? "" : void 0
			}, [e.leadingIcon ? (S(), i(Oe, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : O(t.$slots, "leading", { key: 1 }, void 0, !0)], 10, Yt)) : a("", !0),
			s("span", {
				"data-mat-item-content-text": "",
				class: _(`${e.namespace}__text`)
			}, [
				t.$slots.overline ? (S(), o("span", {
					key: 0,
					"data-mat-item-content-overline": "",
					class: _(`${e.namespace}__overline`)
				}, [O(t.$slots, "overline", {}, void 0, !0)], 2)) : a("", !0),
				s("span", {
					"data-mat-item-content-label": "",
					class: _(`${e.namespace}__label`)
				}, [O(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.supporting ? (S(), o("span", {
					key: 1,
					"data-mat-item-content-supporting": "",
					class: _(`${e.namespace}__supporting`)
				}, [O(t.$slots, "supporting", {}, void 0, !0)], 2)) : a("", !0)
			], 2),
			t.$slots.trailing && !e.separateTrailing ? (S(), o("span", {
				key: 1,
				"data-mat-item-content-trailing": "",
				class: _(`${e.namespace}__trailing`),
				inert: e.presentationSlots ? "" : void 0
			}, [O(t.$slots, "trailing", {}, void 0, !0)], 10, Xt)) : a("", !0)
		], 10, Jt));
	}
}), [["__scopeId", "data-v-7cb38b5a"]]), Qt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		return (t, n) => (S(), i(Zt, {
			namespace: "mat-list-item-content",
			"line-count": e.lineCount,
			"presentation-slots": e.presentationSlots,
			"separate-trailing": e.separateTrailing
		}, c({
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: z(() => [O(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [O(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, [
			"line-count",
			"presentation-slots",
			"separate-trailing"
		]));
	}
}), [["__scopeId", "data-v-2d1ef745"]]), $t = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], en = ["aria-disabled", "data-mat-list-disabled"], tn = ["aria-disabled", "data-mat-list-disabled"], nn = ["inert"], rn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return re.includes(e);
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
		let n = e, s = t, l = I(), d = p(Vt, null), f = p(Ht, null), m = p(Z, te), v = r(() => d?.interaction.value ?? "none"), y = r(() => v.value === "single-action" || v.value === "multi-action"), x = r(() => v.value === "multi-action"), C = r(() => d?.isSelectable.value ?? !1), w = r(() => d?.isSelected(n.value) ?? !1), T = r(() => !!l.trailing), E = r(() => {
			if (n.lines !== void 0) return n.lines;
			let e = Number(!!l.overline) + Number(!!l.supporting);
			return Math.min(3, 1 + e);
		}), D = r(() => ({
			"mat-list-item--disabled": n.disabled,
			"mat-list-item--selected": w.value,
			[`mat-list-item--lines-${E.value}`]: !0
		}));
		function k(e) {
			if (C.value) {
				d?.requestSelection(n.value, e);
				return;
			}
			y.value && s("click", e);
		}
		function A() {
			n.disabled || f?.toggle();
		}
		function j(e) {
			n.disabled || e.repeat || ![" ", "Enter"].includes(e.key) || (e.preventDefault(), d?.requestSelection(n.value, e));
		}
		function M() {
			n.href !== void 0 && !f && !y.value && console.warn("MatListItem: href 仅在 single-action 或 multi-action 模式下生效");
		}
		return b(async () => {
			M(), await g(), d?.requestFocusRefresh();
		}), L(() => [
			n.disabled,
			n.href,
			v.value
		], async () => {
			M(), await g(), d?.requestFocusRefresh();
		}), (t, n) => N(f)?.static.value ? (S(), o("div", h({ key: 0 }, t.$attrs, {
			id: N(f).labelId,
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", D.value],
			"data-mat-list-group-label": "",
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}), [u(Qt, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: z(() => [O(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [O(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, $t)) : N(f) ? (S(), i(Y, h({ key: 1 }, t.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-group-activator": "",
			"aria-controls": N(f).contentId,
			"aria-expanded": N(f).expanded.value ? "true" : "false",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			disabled: e.disabled,
			"focus-ring": !0,
			type: "button",
			"use-cursor": N(m).useCursor,
			onClick: A
		}), {
			default: z(() => [u(Qt, {
				"line-count": E.value,
				"presentation-slots": !1
			}, c({
				default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: z(() => [O(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: z(() => [O(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
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
		])) : v.value === "none" ? (S(), o("li", h({ key: 2 }, t.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", D.value],
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}), [u(Qt, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: z(() => [O(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [O(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, en)) : y.value ? (S(), o("li", {
			key: 3,
			class: _(["mat-list-item", [D.value, {
				"mat-list-item__surface": x.value,
				"mat-list-item--multi-action": x.value
			}]]),
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}, [u(Y, h(t.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !x.value }],
			"data-mat-list-primary": "",
			disabled: e.disabled,
			"focus-ring": !0,
			href: e.href,
			type: e.type,
			"use-cursor": N(m).useCursor,
			onClick: k
		}), {
			default: z(() => [u(Qt, {
				"line-count": E.value,
				"presentation-slots": !1,
				"separate-trailing": x.value && T.value
			}, c({
				default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: z(() => [O(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: z(() => [O(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
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
		]), x.value && T.value ? (S(), o("span", {
			key: 0,
			class: "mat-list-item__separate-trailing",
			"data-mat-list-trailing": "",
			inert: e.disabled ? "" : void 0
		}, [O(t.$slots, "trailing", {}, void 0, !0)], 8, nn)) : a("", !0)], 10, tn)) : (S(), i(Y, h({ key: 4 }, t.$attrs, {
			as: "div",
			class: ["mat-list-item mat-list-item__surface mat-list-item--selectable", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			"aria-selected": w.value ? "true" : "false",
			disabled: e.disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": N(m).useCursor,
			onClick: k,
			onKeydown: j
		}), {
			default: z(() => [u(Qt, {
				"line-count": E.value,
				"presentation-slots": ""
			}, c({
				default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: z(() => [O(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: z(() => [O(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-a787e932"]]), an = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return C(Ht, e.context), (e, t) => O(e.$slots, "default");
	}
}), on = [
	"role",
	"aria-hidden",
	"inert"
], sn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let a = n, o = p(Vt, null), c = I(), l = T(null), d = T(!1), f = T(null), _ = Symbol("mat-list-group"), v = F().replace(/[^\w-]/g, "-"), C = `mat-list-group-${v}-content`, w = `mat-list-group-${v}-label`, E = !1, D, A = r(() => a.value !== void 0), j = r(() => o?.isSelectable.value ?? !1), M = r(() => A.value ? o?.isGroupExpanded(a.value) ?? !1 : d.value);
		function N(n) {
			return n.flatMap((n) => m(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? N(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = r(() => {
			let e = N(c.activator?.({ expanded: M.value }) ?? []);
			if (e.length !== 1 || !m(e[0])) return !1;
			let t = e[0].type;
			return t === rn || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), R = r(() => f.value ?? P.value), B = r(() => j.value || !R.value || M.value), V = r(() => o?.variant.value ?? "segmented");
		function H() {
			(l.value?.querySelector(":scope > [data-mat-list-group-content]"))?.contains(document.activeElement) && l.value?.querySelector(":scope > [data-mat-list-group-activator]")?.focus();
		}
		function U() {
			if (!(j.value || !R.value)) {
				if (M.value && H(), A.value) {
					o?.requestGroupExpanded(a.value, !M.value);
					return;
				}
				d.value = !d.value;
			}
		}
		let W = {
			contentId: C,
			expanded: B,
			labelId: w,
			static: j,
			toggle: U
		};
		function G() {
			!R.value && !E ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), E = !0) : R.value && (E = !1);
		}
		function K() {
			if (!l.value) return;
			let e = j.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(l.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			f.value !== t && (f.value = t);
		}
		function q() {
			K(), G();
		}
		function J(e) {
			e !== void 0 && (o?.registerGroupValue(_, e), D = e);
		}
		function Y() {
			D !== void 0 && (o?.unregisterGroupValue(_), D = void 0);
		}
		return b(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), j.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), J(a.value), q(), o?.requestFocusRefresh();
		}), x(q), y(() => {
			Y(), o?.requestFocusRefresh();
		}), L(() => a.value, (e, t) => {
			Object.is(e, t) || (Y(), J(e));
		}), L(M, async (e, t) => {
			t && !e && H(), await g(), o?.requestFocusRefresh();
		}), L(j, async (e, t) => {
			e && !t && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), await g(), o?.requestFocusRefresh();
		}), (e, t) => (S(), i(k(j.value ? "div" : "li"), h({
			ref_key: "root",
			ref: l
		}, e.$attrs, {
			class: ["mat-list-group", [`mat-list-group--${V.value}`, {
				"mat-list-group--expanded": B.value,
				"mat-list-group--selectable-fallback": j.value
			}]],
			role: j.value ? "group" : void 0,
			"aria-labelledby": j.value ? w : void 0
		}), {
			default: z(() => [u(an, { context: W }, {
				default: z(() => [O(e.$slots, "activator", { expanded: B.value }, void 0, !0)]),
				_: 3
			}), s("div", {
				id: C,
				class: "mat-list-group__content",
				"data-mat-list-group-content": "",
				role: j.value ? "presentation" : void 0,
				"aria-hidden": B.value ? void 0 : "true",
				inert: B.value ? void 0 : ""
			}, [(S(), i(k(j.value ? "div" : "ul"), {
				class: "mat-list-group__items",
				role: j.value ? "presentation" : void 0
			}, {
				default: z(() => [O(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, ["role"]))], 8, on)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-fdfe4231"]]), cn = Symbol("mat-menu"), ln = Symbol("mat-menu-item"), un = Symbol("mat-menu-group");
function dn(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function fn(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = dn(t, a, o), c = dn(e, a, o), l = dn(t, e, o), u = dn(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function pn(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var mn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let t = e, n = p(Vt, null), a = p(cn, null), o = r(() => !!n), s = r(() => !!a), c = r(() => n?.isSelectable.value ?? !1), l = r(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = r(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
		return (e, t) => (S(), i(k(u.value), h(e.$attrs, {
			class: ["mat-divider", [`mat-divider--${l.value}`, { "mat-divider--menu": s.value }]],
			"aria-hidden": c.value ? "true" : e.$attrs["aria-hidden"],
			role: c.value ? "presentation" : o.value || s.value ? "separator" : e.$attrs.role
		}), null, 16, [
			"class",
			"aria-hidden",
			"role"
		]));
	}
}), [["__scopeId", "data-v-2eb6ec37"]]), hn = { class: "mat-selection-control__target" }, gn = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], _n = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, vn = {
	key: 0,
	class: "mat-selection-control__label"
}, yn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let i = e, c = n, l = P(), u = I(), d = T(null), f = p(Z, te), { colorStyle: m } = Ee(r(() => i.color)), g = r(() => {
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
		b(() => {
			!u.default && !_.value["aria-label"] && !y.value && console.warn(`${i.labelName}: 缺少默认标签内容时必须提供 aria-label`);
		});
		function x() {
			d.value?.focus();
		}
		function C() {
			return d.value;
		}
		return t({
			focusInput: x,
			getInput: C
		}), (t, n) => (S(), o("label", h(g.value, {
			class: ["mat-selection-control", {
				"mat-selection-control--checked": e.checked,
				"mat-selection-control--disabled": e.disabled,
				"mat-selection-control--use-cursor": N(f).useCursor
			}],
			style: v.value
		}), [s("span", hn, [
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
			}), null, 16, gn),
			n[2] ||= s("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			s("span", _n, [O(t.$slots, "indicator", {}, void 0, !0)])
		]), N(u).default ? (S(), o("span", vn, [O(t.$slots, "default", {}, void 0, !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-4dcfac60"]]), bn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: Kt
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: Gt
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
		"update:modelValue": Kt,
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
		return (t, n) => (S(), i(yn, h(t.$attrs, {
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
			indicator: z(() => [...n[0] ||= [s("span", { class: "mat-checkbox__box" }, [s("span", { class: "mat-checkbox__check" }), s("span", { class: "mat-checkbox__mixed" })], -1)]]),
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-3d8ac819"]]), xn = Symbol("mdu-ui-radio-group"), Sn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return e == null || Gt(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: Gt
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
			return e === null || Gt(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = d(), c = p(xn, null), l = T(null), u = r(() => n.value), f = r(() => n.disabled || !!c?.disabled.value), m = r(() => n.color ?? c?.color.value), g = r(() => c ? c.isSelected(n.value) : Object.is(n.modelValue, n.value));
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
		}, x = r(() => c ? c.getTabIndex(v) : void 0);
		b(() => {
			if (!c) return;
			let e = o?.vnode.props ?? {};
			(n.modelValue !== void 0 || Object.hasOwn(e, "onUpdate:modelValue")) && console.warn("MatRadio: 位于 MatRadioGroup 中时，子级 modelValue 和 v-model 会被忽略"), c.register(v);
		}), y(() => {
			c?.unregister(v);
		});
		function C(e) {
			!c || e.repeat || (["ArrowRight", "ArrowDown"].includes(e.key) ? c.move(v, 1, e) : ["ArrowLeft", "ArrowUp"].includes(e.key) && c.move(v, -1, e));
		}
		return (e, t) => (S(), i(yn, h({
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
			tabindex: x.value,
			onChange: _,
			onKeydown: C
		}), {
			indicator: z(() => [...t[0] ||= [s("span", { class: "mat-radio__ring" }, [s("span", { class: "mat-radio__dot" })], -1)]]),
			default: z(() => [O(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-0d040228"]]), Cn = ["aria-disabled"], wn = { class: "mat-radio-group__label" }, Tn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return e === null || Gt(e);
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
			return e === null || Gt(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = P(), c = j([]), { colorStyle: l } = Ee(r(() => n.color)), u = r(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = r(() => [l.value, a.style]);
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
		return C(xn, {
			color: r(() => n.color),
			disabled: r(() => n.disabled),
			getTabIndex: _,
			isSelected: f,
			move: y,
			register: m,
			requestSelection: v,
			unregister: g
		}), (t, n) => (S(), o("fieldset", h(u.value, {
			class: "mat-radio-group",
			"aria-disabled": e.disabled || void 0,
			style: d.value,
			role: "radiogroup"
		}), [s("legend", wn, M(e.label), 1), O(t.$slots, "default", {}, void 0, !0)], 16, Cn));
	}
}), [["__scopeId", "data-v-b2f7e821"]]), En = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		return (t, n) => (S(), i(yn, h(t.$attrs, {
			class: ["mat-switch", [`mat-switch--icons-${e.icons}`, { "mat-switch--checked": e.modelValue }]],
			checked: e.modelValue,
			color: e.color,
			disabled: e.disabled,
			"input-role": "switch",
			"input-type": "checkbox",
			"label-name": "MatSwitch",
			onChange: r
		}), {
			indicator: z(() => [...n[0] ||= [s("span", { class: "mat-switch__track" }, [s("span", { class: "mat-switch__handle-positioner" }, [s("span", { class: "mat-switch__handle" }, [s("span", { class: "mat-switch__icon mat-switch__icon--selected" }), s("span", { class: "mat-switch__icon mat-switch__icon--unselected" })])])], -1)]]),
			default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-71a3dff9"]]), Dn = Object.freeze(["horizontal", "vertical"]), On = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), kn = Object.freeze(["standard", "centered"]), An = 12;
function jn(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Mn(e) {
	return jn(e) && e > 0;
}
function Nn(e) {
	return Dn.includes(e);
}
function Pn(e) {
	return On.includes(e);
}
function Fn(e) {
	return kn.includes(e);
}
function In(e) {
	return Array.isArray(e) && e.length === 2 && e.every(jn);
}
function Ln(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function Rn(e, t) {
	return Number(e.toFixed(Math.min(An, t)));
}
function zn(e, t) {
	let n = jn(e) ? e : 0, r = jn(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function Bn(e) {
	return Mn(e) ? e : 1;
}
function Vn(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function Hn(e, t, n) {
	let r = Vn(jn(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(Ln(t.min), Ln(t.max), Ln(n));
	return Rn(Vn(t.min + i * n, t), a);
}
function Un(e, t, n) {
	return Hn(jn(e) ? e : (t.min + t.max) / 2, t, n);
}
function Wn(e, t) {
	return Rn((Vn(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function Gn(e) {
	return Number(e.toFixed(3)).toString();
}
function Kn(e) {
	let t = Math.min(Math.max(e, 0), 100), n = Gn(t), r = Rn(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${Gn(Math.abs(r))}px)`;
}
function qn(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(Ln(e.min), Ln(e.max), Ln(t)), i = Array.from({ length: n + 1 }, (n, i) => Rn(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function Jn(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return Hn(n.min + (n.max - n.min) * u, n, r);
}
function Yn(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return Hn(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return Hn(e + i * r, n, r);
}
function Xn(e, t, n, r) {
	let i = Hn(e, n, r), a = Hn(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var Zn = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, Qn = { class: "mat-slider__inset-icon-layer" }, $n = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, er = [
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
], tr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: jn
		},
		min: {
			type: Number,
			default: 0,
			validator: jn
		},
		max: {
			type: Number,
			default: 100,
			validator: jn
		},
		step: {
			type: Number,
			default: 1,
			validator: Mn
		},
		variant: {
			type: String,
			default: "standard",
			validator: Fn
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || jn(e);
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
			validator: Nn
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Pn
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
			return jn(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, c = n, l = P(), d = T(null), f = T(null), m = T(null), g = T(!1), y = T(void 0), b = T(void 0), x = T(!1), C = T(!1), w = p(Z, te), { colorStyle: E } = Ee(r(() => i.color)), O = r(() => zn(i.min, i.max)), k = r(() => Bn(i.step)), A = r(() => Hn(i.modelValue, O.value, k.value)), j = r(() => g.value ? b.value : A.value), M = r(() => Un(i.center, O.value, k.value)), F = r(() => i.variant === "centered" ? M.value : O.value.min), I = r(() => Wn(j.value, O.value)), L = r(() => Wn(F.value, O.value)), R = r(() => Kn(I.value)), z = r(() => i.variant === "standard" ? "0%" : Kn(L.value)), B = r(() => Math.sign(I.value - L.value)), V = r(() => B.value >= 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), H = r(() => B.value > 0 ? `max(0px, calc(${R.value} - ${z.value} - var(--mat-slider-handle-track-gap)))` : B.value < 0 ? `max(0px, calc(${z.value} - ${R.value} - var(--mat-slider-handle-track-gap)))` : "0px"), U = r(() => B.value > 0 ? z.value : `max(0px, calc(${R.value} - var(--mat-slider-handle-track-gap)))`), W = r(() => B.value < 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), G = r(() => B.value < 0 ? `calc(100% - ${z.value})` : `max(0px, calc(100% - ${R.value} - var(--mat-slider-handle-track-gap)))`), K = r(() => i.showStopIndicator ? qn(O.value, k.value) : i.variant === "centered" ? [O.value.min, O.value.max] : [O.value.max]), q = r(() => i.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(i.size)), J = r(() => i.size === "extra-large" ? 32 : 24), Y = r(() => i.showValueIndicator && (g.value || C.value)), X = r(() => ({
			...E.value,
			"--mat-slider-active-visible-size": H.value,
			"--mat-slider-active-visible-start": V.value,
			"--mat-slider-center-position": z.value,
			"--mat-slider-inactive-after-size": G.value,
			"--mat-slider-inactive-after-start": W.value,
			"--mat-slider-inactive-before-size": U.value,
			"--mat-slider-position": R.value
		}));
		function ee(e, t) {
			let n = g.value ? b.value : A.value;
			return e === void 0 || e === n ? !1 : (g.value && (b.value = e), c("update:modelValue", e), c("input", t), !0);
		}
		function Q(e) {
			return f.value ? ee(Jn(e, f.value, O.value, k.value, i.orientation), e) : !1;
		}
		function ne(e) {
			i.disabled || (y.value = e.pointerId, b.value = A.value, x.value = !1, g.value = !0, m.value?.focus(), f.value?.setPointerCapture?.(e.pointerId), x.value = Q(e));
		}
		function re(e) {
			!g.value || e.pointerId !== y.value || (x.value = Q(e) || x.value);
		}
		function ie(e, t) {
			!g.value || e.pointerId !== y.value || (t && (x.value = Q(e) || x.value), t && x.value && c("change", e), g.value = !1, x.value = !1, y.value = void 0, b.value = void 0);
		}
		function $(e) {
			if (i.disabled) return;
			let t = Yn(A.value, e.key, O.value, k.value);
			t !== void 0 && (e.preventDefault(), ee(t, e) && c("change", e));
		}
		return (n, r) => (S(), o("div", h(N(l), {
			class: ["mat-slider", [
				`mat-slider--${e.orientation}`,
				`mat-slider--size-${e.size}`,
				`mat-slider--${e.variant}`,
				{
					"mat-slider--disabled": e.disabled,
					"mat-slider--dragging": g.value,
					"mat-slider--use-cursor": N(w).useCursor
				}
			]],
			style: X.value
		}), [
			s("span", Zn, [
				r[6] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				s("span", { class: _(["mat-slider__active-track", { "mat-slider__active-track--from-start": e.variant === "standard" }]) }, null, 2),
				r[7] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(S(!0), o(t, null, D(K.value, (e) => (S(), o("span", {
					key: e,
					class: _(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(F.value, j.value) && e <= Math.max(F.value, j.value) }]),
					style: v({ "--mat-slider-stop-position": N(Kn)(N(Wn)(e, O.value)) })
				}, null, 6))), 128)),
				q.value ? (S(), o(t, { key: 0 }, [s("span", Qn, [u(Oe, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: e.insetIcon,
					"optical-size": J.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), s("span", $n, [u(Oe, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: e.insetIcon,
					"optical-size": J.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])])], 64)) : a("", !0),
				s("span", {
					ref_key: "handle",
					ref: d,
					class: "mat-slider__handle"
				}, [...r[5] ||= [s("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
			]),
			u(lt, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(j.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": Y.value,
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
				onLostpointercapture: r[0] ||= (e) => ie(e, !1),
				onPointercancel: r[1] ||= (e) => ie(e, !1),
				onPointerdown: ne,
				onPointermove: re,
				onPointerup: r[2] ||= (e) => ie(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "nativeInput",
				ref: m,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": N(l)["aria-label"],
				"aria-orientation": e.orientation,
				"aria-valuemax": O.value.max,
				"aria-valuemin": O.value.min,
				"aria-valuenow": j.value,
				disabled: e.disabled,
				max: O.value.max,
				min: O.value.min,
				step: k.value,
				value: j.value,
				onBlur: r[3] ||= (e) => C.value = !1,
				onFocus: r[4] ||= (e) => C.value = !0,
				onKeydown: $
			}, null, 40, er)
		], 16));
	}
}), [["__scopeId", "data-v-a8683686"]]), nr = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, rr = [
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
], ir = [
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
], ar = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: In
		},
		min: {
			type: Number,
			default: 0,
			validator: jn
		},
		max: {
			type: Number,
			default: 100,
			validator: jn
		},
		step: {
			type: Number,
			default: 1,
			validator: Mn
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
			validator: Nn
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Pn
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
			return In(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, a = n, c = P(), l = T([]), d = T(null), f = T(null), m = T(null), g = T(0), y = T(void 0), b = T(!1), x = T(void 0), C = T(void 0), w = T(!1), E = p(Z, te), { colorStyle: O } = Ee(r(() => i.color)), k = r(() => zn(i.min, i.max)), A = r(() => Bn(i.step)), j = r(() => Xn(i.modelValue?.[0], i.modelValue?.[1], k.value, A.value)), M = r(() => b.value ? C.value : j.value), F = r(() => Wn(M.value[0], k.value)), I = r(() => Wn(M.value[1], k.value)), L = r(() => Kn(F.value)), R = r(() => Kn(I.value)), z = r(() => i.showStopIndicator ? qn(k.value, A.value) : [k.value.min, k.value.max]), B = r(() => l.value[g.value] ?? null), V = r(() => M.value[g.value]), H = r(() => i.showValueIndicator && (b.value || y.value === g.value)), U = r(() => ({
			...O.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${R.value} - ${L.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${L.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": R.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${R.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${R.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${L.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": L.value
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
			let [r, i] = b.value ? C.value : j.value, o = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === i ? !1 : (b.value && (C.value = o), a("update:modelValue", o), a("input", n), !0);
		}
		function q(e) {
			if (!d.value) return !1;
			let t = Jn(e, d.value, k.value, A.value, i.orientation);
			return K(g.value, t, e);
		}
		function J(e) {
			if (i.disabled || !d.value) return;
			let t = Jn(e, d.value, k.value, A.value, i.orientation);
			t !== void 0 && (g.value = G(t), x.value = e.pointerId, C.value = [...j.value], w.value = !1, b.value = !0, W(g.value)?.focus(), d.value.setPointerCapture?.(e.pointerId), w.value = K(g.value, t, e));
		}
		function Y(e) {
			!b.value || e.pointerId !== x.value || (w.value = q(e) || w.value);
		}
		function X(e, t) {
			!b.value || e.pointerId !== x.value || (t && (w.value = q(e) || w.value), t && w.value && a("change", e), b.value = !1, w.value = !1, x.value = void 0, C.value = void 0);
		}
		function ee(e, t) {
			if (i.disabled) return;
			let n = Yn(j.value[e], t.key, k.value, A.value);
			n !== void 0 && (t.preventDefault(), g.value = e, K(e, n, t) && a("change", t));
		}
		function Q(e) {
			g.value = e, y.value = e;
		}
		function ne(e) {
			y.value === e && (y.value = void 0);
		}
		function re(e, t) {
			l.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (n, r) => (S(), o("div", h(N(c), {
			class: ["mat-range-slider", [
				`mat-range-slider--${e.orientation}`,
				`mat-range-slider--size-${e.size}`,
				{
					"mat-range-slider--disabled": e.disabled,
					"mat-range-slider--dragging": b.value,
					"mat-range-slider--use-cursor": N(E).useCursor
				}
			]],
			style: U.value
		}), [
			s("span", nr, [
				r[10] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				r[11] ||= s("span", { class: "mat-range-slider__active-track" }, null, -1),
				r[12] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(S(!0), o(t, null, D(z.value, (e) => (S(), o("span", {
					key: e,
					class: _(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= M.value[0] && e <= M.value[1] }]),
					style: v({ "--mat-range-slider-stop-position": N(Kn)(N(Wn)(e, k.value)) })
				}, null, 6))), 128)),
				(S(!0), o(t, null, D(M.value, (e, t) => (S(), o("span", {
					key: t,
					ref_for: !0,
					ref: (e) => re(t, e),
					class: _(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": g.value === t }]])
				}, [...r[9] ||= [s("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			u(lt, {
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
				onLostpointercapture: r[0] ||= (e) => X(e, !1),
				onPointercancel: r[1] ||= (e) => X(e, !1),
				onPointerdown: J,
				onPointermove: Y,
				onPointerup: r[2] ||= (e) => X(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "startInput",
				ref: f,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": e.ariaLabelStart,
				"aria-orientation": e.orientation,
				"aria-valuemax": M.value[1],
				"aria-valuemin": k.value.min,
				"aria-valuenow": M.value[0],
				disabled: e.disabled,
				max: M.value[1],
				min: k.value.min,
				step: A.value,
				value: M.value[0],
				onBlur: r[3] ||= (e) => ne(0),
				onFocus: r[4] ||= (e) => Q(0),
				onKeydown: r[5] ||= (e) => ee(0, e)
			}, null, 40, rr),
			s("input", {
				ref_key: "endInput",
				ref: m,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": e.ariaLabelEnd,
				"aria-orientation": e.orientation,
				"aria-valuemax": k.value.max,
				"aria-valuemin": M.value[0],
				"aria-valuenow": M.value[1],
				disabled: e.disabled,
				max: k.value.max,
				min: M.value[0],
				step: A.value,
				value: M.value[1],
				onBlur: r[6] ||= (e) => ne(1),
				onFocus: r[7] ||= (e) => Q(1),
				onKeydown: r[8] ||= (e) => ee(1, e)
			}, null, 40, ir)
		], 16));
	}
}), [["__scopeId", "data-v-d7070366"]]), or = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let r = e, a = n, o = T(null);
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
		}), (e, t) => (S(), i(k(r.control), h({
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
}), [["__scopeId", "data-v-55b4fdd2"]]), sr = ["inert", "aria-hidden"], cr = { class: "mat-text-input__container" }, lr = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, ur = {
	key: 0,
	class: "mat-text-input__outline-label"
}, dr = { key: 0 }, fr = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, pr = ["for"], mr = {
	key: 0,
	class: "mat-text-input__label"
}, hr = {
	key: 0,
	"aria-hidden": "true"
}, gr = { class: "mat-text-input__control-row" }, _r = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, vr = {
	key: 1,
	class: "mat-text-input__affix mat-text-input__suffix"
}, yr = { class: "mat-text-input__supporting-text" }, br = {
	key: 0,
	class: "mat-text-input__counter"
}, xr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, d = P(), f = T(!1), p = T(n.modelValue), m = T(), x = F(), C = `${x}-supporting`, w = r(() => d.id || x), { colorStyle: E } = Ee(r(() => n.color)), D = r(() => !!d.placeholder), k = r(() => f.value || p.value.length > 0 || D.value), A = r(() => n.error ? n.errorText : n.supportingText), j = r(() => !!A.value || n.maxLength !== void 0), N = r(() => {
			let e = [d["aria-describedby"]];
			return j.value && e.push(C), e.filter(Boolean).join(" ") || void 0;
		}), I = r(() => [E.value, d.style]), R = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), B = r(() => Object.fromEntries(Object.entries(d).filter(([e]) => !R.has(e)))), V, H;
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
			t !== H && (H = t, G());
		}
		L(() => n.modelValue, (e) => {
			p.value = e, G();
		}), L(() => [
			n.autoGrow,
			n.label,
			n.maxRows,
			n.noResize,
			n.resizeMinRows,
			n.rows
		], G), b(() => {
			W(), typeof globalThis.ResizeObserver == "function" && (V = new globalThis.ResizeObserver(K), V.observe(m.value.getInput()));
		}), y(() => {
			V?.disconnect();
		});
		function q() {
			m.value?.focusInput();
		}
		function J(e) {
			p.value = e, c("update:modelValue", e), G();
		}
		return (t, n) => (S(), o("div", {
			class: _(["mat-text-input", [
				t.$attrs.class,
				`mat-text-input--${e.variant}`,
				`mat-text-input--${e.control}`,
				{
					"mat-text-input--floating": k.value,
					"mat-text-input--focused": f.value,
					"mat-text-input--error": e.error,
					"mat-text-input--disabled": e.disabled
				}
			]]),
			style: v(I.value),
			inert: t.$attrs.inert,
			"aria-hidden": t.$attrs["aria-hidden"]
		}, [s("div", cr, [
			e.variant === "outlined" ? (S(), o("fieldset", lr, [k.value && e.label ? (S(), o("legend", ur, [l(M(e.label), 1), e.required ? (S(), o("span", dr, " *")) : a("", !0)])) : a("", !0)])) : a("", !0),
			e.variant === "filled" ? (S(), o("span", fr)) : a("", !0),
			t.$slots.leading ? (S(), i(Oe, {
				key: 2,
				as: "span",
				class: "mat-text-input__icon mat-text-input__leading",
				"optical-size": 24,
				size: "24px"
			}, {
				default: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : a("", !0),
			s("label", {
				class: "mat-text-input__main",
				for: w.value,
				onClick: q
			}, [e.label ? (S(), o("span", mr, [l(M(e.label), 1), e.required ? (S(), o("span", hr, " *")) : a("", !0)])) : a("", !0), s("span", gr, [
				e.prefixText ? (S(), o("span", _r, M(e.prefixText), 1)) : a("", !0),
				u(or, h({
					ref_key: "controlElement",
					ref: m
				}, B.value, {
					class: "mat-text-input__control",
					"aria-describedby": N.value,
					"aria-invalid": e.error ? "true" : void 0,
					disabled: e.disabled,
					id: w.value,
					"max-length": e.maxLength,
					readonly: e.readonly,
					required: e.required,
					rows: e.control === "textarea" ? e.rows : void 0,
					type: e.control === "input" ? e.type : void 0,
					control: e.control,
					"model-value": e.modelValue,
					onBlur: n[0] ||= (e) => f.value = !1,
					onFocus: n[1] ||= (e) => f.value = !0,
					"onUpdate:modelValue": J
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
				e.suffixText ? (S(), o("span", vr, M(e.suffixText), 1)) : a("", !0)
			])], 8, pr),
			t.$slots.trailing ? (S(), i(Oe, {
				key: 3,
				as: "span",
				class: "mat-text-input__icon mat-text-input__trailing",
				"optical-size": 24,
				size: "24px"
			}, {
				default: z(() => [O(t.$slots, "trailing", {}, void 0, !0)]),
				_: 3
			})) : a("", !0)
		]), j.value ? (S(), o("span", {
			key: 0,
			id: C,
			class: "mat-text-input__supporting"
		}, [s("span", yr, M(A.value), 1), e.maxLength === void 0 ? a("", !0) : (S(), o("span", br, M(e.modelValue.length) + " / " + M(e.maxLength), 1))])) : a("", !0)], 14, sr));
	}
}), [["__scopeId", "data-v-6c6e535b"]]), Sr = ["filled", "outlined"], Cr = {
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
			return Sr.includes(e);
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
}, wr = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...Cr,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = e, r = t;
		return (e, t) => (S(), i(xr, h({
			...e.$attrs,
			...n
		}, {
			control: "input",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: z(() => [O(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: z(() => [O(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040));
	}
}), Tr = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...Cr,
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
		return (e, t) => (S(), i(xr, h({
			...e.$attrs,
			...n
		}, {
			control: "textarea",
			"resize-min-rows": a(),
			"onUpdate:modelValue": t[0] ||= (e) => o("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: z(() => [O(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: z(() => [O(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040, ["resize-min-rows"]));
	}
}), Er = { class: "mat-menu__surface" }, Dr = 200, Or = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: n }) {
		let i = e, c = n, l = P(), d = I(), f = p(ln, null), m = p(cn, null), _ = T(null), v = T(null), w = r(() => v.value?.root ?? v.value?.$el ?? null), E = F().replace(/[^\w-]/g, "-"), D = r(() => l.id ?? `${E}-menu`), k = `--mat-menu-anchor-${E}`, A = T(!1), j = T("closed"), M = m?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, R = T(0), B = /* @__PURE__ */ new Map(), V = null, H = "", U = !1, W = !1, G, K, q, J = null, Y = !1, X = r(() => !!f), ee = r(() => !!d.activator), te = r(() => !X.value && !ee.value && ce(i.anchor)), Z = r(() => R.value > 0), Q = r(() => X.value ? A.value : i.modelValue), ne = r(() => i.variant ?? m?.variant.value ?? "standard"), re = r(() => i.color ?? m?.color.value), ie = r(() => i.closeOnClick), { colorStyle: $ } = Ee(re), ae = r(() => {
			let [e, t] = ce(i.offset) ? i.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: te.value ? "auto" : k
			};
			return te.value && ce(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), oe = r(() => [
			$.value,
			ae.value,
			l.style
		]), se = Wt({
			root: w,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === w.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function ce(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function le() {
			if (X.value) return f.element.value;
			if (ee.value) {
				let e = _.value ? [..._.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function ue() {
			V && (H ? V.style.setProperty("anchor-name", H) : V.style.removeProperty("anchor-name"), V = null, H = "");
		}
		function de() {
			let e = le();
			return e ? V === e ? e : (ue(), V = e, H = e.style.getPropertyValue("anchor-name"), e.style.setProperty("anchor-name", k), e) : null;
		}
		function fe() {
			G !== void 0 && (window.clearTimeout(G), G = void 0);
		}
		function pe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function me() {
			w.value && U && (U = !1, W = !0, w.value.hidePopover?.()), j.value = "closed";
		}
		function he() {
			G = void 0, j.value = "closed";
		}
		function ge() {
			if (fe(), pe()) {
				j.value = "closed";
				return;
			}
			j.value = "closing", G = window.setTimeout(he, Dr);
		}
		function _e({ immediate: e = !1 } = {}) {
			if (!(!w.value || !U)) {
				if (W = !0, Se({ immediate: !0 }), e || pe()) {
					fe(), me();
					return;
				}
				j.value !== "closing" && (j.value = "closing", fe(), G = window.setTimeout(() => {
					G = void 0, me();
				}, Dr));
			}
		}
		function ve() {
			if (K = void 0, !w.value || !U) return;
			let e = w.value.style, t = w.value.getBoundingClientRect(), n = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, r = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, i = Number.parseFloat(getComputedStyle(w.value).getPropertyValue("--mat-menu-viewport-space")), a = Number.isFinite(i) ? i : 8, o = {
				bottom: t.bottom - r,
				left: t.left - n,
				right: t.right - n,
				top: t.top - r
			}, s = 0, c = 0;
			o.left < a ? s = a - o.left : o.right > window.innerWidth - a && (s = window.innerWidth - a - o.right), o.top < a ? c = a - o.top : o.bottom > window.innerHeight - a && (c = window.innerHeight - a - o.bottom), e.setProperty("--mat-menu-viewport-shift-x", `${s}px`), e.setProperty("--mat-menu-viewport-shift-y", `${c}px`);
		}
		function ye() {
			K !== void 0 && cancelAnimationFrame(K), K = requestAnimationFrame(ve);
		}
		async function be() {
			fe(), W = !1, await g();
			let e = te.value ? null : de(), t = te.value || !!e;
			if (!w.value || !t) {
				X.value || (console.warn(ee.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), c("update:modelValue", !1));
				return;
			}
			U || (te.value && document.activeElement instanceof HTMLElement && (J = document.activeElement), U = !0, w.value.showPopover?.()), j.value = "open", X.value && (f.submenuOpen.value = !0), se.refresh(), se.focusFirst(), ye();
		}
		function xe() {
			let e = le() ?? J;
			J = null, g(() => e?.focus());
		}
		function Se({ immediate: e = !1 } = {}) {
			B.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function Ce({ focus: e = !0, immediate: t = !1 } = {}) {
			Se({ immediate: t }), X.value ? (A.value = !1, f.submenuOpen.value = !1) : c("update:modelValue", !1), _e({ immediate: t }), e && xe();
		}
		function we() {
			if (m) {
				m.closeTree();
				return;
			}
			Ce();
		}
		function Te(e) {
			B.set(e.element, e), pn(Array.from(B.values()).filter((e) => !e.grouped)), se.queueRefresh();
		}
		function De(e) {
			B.delete(e.element), pn(Array.from(B.values()).filter((e) => !e.grouped)), se.queueRefresh();
		}
		function Oe() {
			R.value += 1, se.queueRefresh();
		}
		function ke() {
			R.value = Math.max(0, R.value - 1), se.queueRefresh();
		}
		function Ae(e, { pointer: t = !1 } = {}) {
			B.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function je(e) {
			let t = getComputedStyle(w.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), se.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), se.focusFirst()) : e.key === "End" ? (e.preventDefault(), se.focusLast()) : e.key === "Escape" || X.value && e.key === t ? (e.preventDefault(), Ce()) : e.key === "Tab" && we();
		}
		function Me(e) {
			if (U = e.newState === "open", U) {
				ye();
				return;
			}
			let t = W;
			W = !1, Se(), X.value && (A.value = !1, f.submenuOpen.value = !1), !(!Q.value || t) && (ge(), X.value || c("update:modelValue", !1), xe());
		}
		C(cn, {
			closeOtherSubmenus: Ae,
			closeTree: we,
			closeOnClick: ie,
			color: re,
			registerItem: Te,
			registerGroup: Oe,
			unregisterItem: De,
			unregisterGroup: ke,
			pointerHistory: M,
			variant: ne
		}), f && f.registerSubmenu({
			close: Ce,
			element: w,
			id: D,
			open: be
		}), b(() => {
			se.observe(), window.addEventListener("resize", ye), window.addEventListener("scroll", ye, {
				capture: !0,
				passive: !0
			}), Q.value && Pe(), typeof ResizeObserver < "u" && (q = new ResizeObserver(ye), q.observe(w.value)), Q.value && be();
		}), x(() => {
			X.value || !Q.value || te.value || le() !== V && (ue(), be());
		}), y(() => {
			fe(), K !== void 0 && cancelAnimationFrame(K), q?.disconnect(), window.removeEventListener("resize", ye), window.removeEventListener("scroll", ye, { capture: !0 }), Fe(), _e({ immediate: !0 }), ue(), f?.unregisterSubmenu();
		});
		function Ne(e) {
			M.previous = M.current, M.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Pe() {
			m || Y || (document.addEventListener("pointermove", Ne, !0), Y = !0);
		}
		function Fe() {
			Y &&= (document.removeEventListener("pointermove", Ne, !0), !1);
		}
		return L(Q, (e) => {
			e ? (Pe(), be()) : (Fe(), _e());
		}), L(() => i.anchor, async () => {
			ue(), Q.value && await be();
		}, { deep: !0 }), L(() => i.offset, async () => {
			Q.value && (await g(), ye());
		}, { deep: !0 }), (e, n) => (S(), o(t, null, [!X.value && ee.value ? (S(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-menu__activator"
		}, [O(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), u(Et, h({
			id: D.value,
			ref_key: "surface",
			ref: v
		}, e.$attrs, {
			class: ["mat-menu", [`mat-menu--${ne.value}`, {
				"mat-menu--coordinate": te.value,
				"mat-menu--grouped": Z.value,
				"mat-menu--nested": X.value,
				"mat-menu--closing": j.value === "closing"
			}]],
			style: oe.value,
			popover: "auto",
			role: "menu",
			onPointerenter: n[0] ||= (e) => N(f)?.cancelSubmenuClose(),
			onFocusin: N(se).handleFocusIn,
			onKeydown: je,
			onToggle: Me
		}), {
			default: z(() => [s("div", Er, [O(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"id",
			"class",
			"style",
			"onFocusin"
		])], 64));
	}
}), [["__scopeId", "data-v-8255369d"]]), kr = ["aria-labelledby"], Ar = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = e, n = P(), i = p(cn, null), s = `${F().replace(/[^\w-]/g, "-")}-label`, c = r(() => t.label ? s : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), pn(Array.from(l));
		}
		function d(e) {
			l.delete(e), pn(Array.from(l));
		}
		return C(un, {
			registerItem: u,
			unregisterItem: d
		}), b(() => i?.registerGroup()), y(() => i?.unregisterGroup()), (t, n) => (S(), o("div", h(t.$attrs, {
			class: "mat-menu-group",
			"aria-labelledby": c.value,
			role: "group"
		}), [e.label ? (S(), o("div", {
			key: 0,
			id: s,
			class: "mat-menu-group__label"
		}, M(e.label), 1)) : a("", !0), O(t.$slots, "default", {}, void 0, !0)], 16, kr));
	}
}), [["__scopeId", "data-v-8632d18c"]]), jr = { class: "mat-menu-item-host" }, Mr = 300, Nr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = e, s = t, l = I(), d = p(cn, null), f = p(un, null), m = p(Z, te), g = T(null), _ = r(() => g.value?.root ?? g.value?.$el ?? null), v = T(!1), x = T(void 0), w = T("only"), E, D, k = r(() => !!l.submenu);
		function A({ delay: e = 0, focus: t = !1, immediate: n = !1 } = {}) {
			if (j(), e > 0) {
				D = setTimeout(() => {
					v.value = !1, E?.close({
						focus: t,
						immediate: n
					});
				}, e);
				return;
			}
			v.value = !1, E?.close({
				focus: t,
				immediate: n
			});
		}
		function j() {
			clearTimeout(D), D = void 0;
		}
		async function M({ pointer: e = !1 } = {}) {
			!k.value || n.disabled || (d?.closeOtherSubmenus(L, { pointer: e }), v.value = !0, await E?.open());
		}
		function P(e) {
			E = e, x.value = e.id.value;
		}
		function F() {
			E = void 0, x.value = void 0, v.value = !1;
		}
		let L = {
			closeSubmenu: A,
			element: _,
			grouped: !!f,
			setPosition(e) {
				w.value = e;
			},
			getSubmenuCloseDelay() {
				if (!E?.element?.value || !d?.pointerHistory || !_.value) return 0;
				let e = _.value.getBoundingClientRect(), t = E.element.value.getBoundingClientRect(), n = t.left < e.left ? "left" : "right";
				return fn(d.pointerHistory.current, d.pointerHistory.previous, t, n) ? Mr : 0;
			}
		};
		function R(e) {
			if (k.value) {
				M();
				return;
			}
			s("click", e), d?.closeOnClick.value && d.closeTree();
		}
		function B(e) {
			if (!k.value) return;
			let t = getComputedStyle(_.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), M());
		}
		return C(ln, {
			cancelSubmenuClose: j,
			element: _,
			registerSubmenu: P,
			submenuOpen: v,
			unregisterSubmenu: F
		}), b(() => {
			f?.registerItem(L), d?.registerItem(L);
		}), y(() => {
			clearTimeout(D), f?.unregisterItem(L), d?.unregisterItem(L);
		}), (t, n) => (S(), o("span", jr, [u(Y, h({
			ref_key: "action",
			ref: g
		}, t.$attrs, {
			class: ["mat-menu-item", [`mat-menu-item--${w.value}`, { "mat-menu-item--submenu-open": v.value }]],
			"data-mat-menu-item": "",
			"aria-controls": k.value ? x.value : void 0,
			"aria-expanded": k.value ? String(v.value) : void 0,
			"aria-haspopup": k.value ? "menu" : void 0,
			disabled: e.disabled,
			role: "menuitem",
			"use-cursor": N(m).useCursor,
			onClick: R,
			onKeydown: B,
			onPointerenter: n[0] ||= (e) => M({ pointer: !0 })
		}), {
			default: z(() => [u(Zt, {
				namespace: "mat-menu-item-content",
				"line-count": t.$slots.supporting ? 2 : 1,
				"leading-icon": ""
			}, c({
				trailing: z(() => [t.$slots.trailing ? O(t.$slots, "trailing", { key: 0 }, void 0, !0) : k.value ? (S(), i(Oe, {
					key: 1,
					as: "span",
					class: "mat-menu-item__submenu-icon",
					icon: "chevron_right",
					"optical-size": 20,
					size: "small",
					"aria-hidden": "true"
				})) : a("", !0)]),
				default: z(() => [O(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [t.$slots.leading ? {
				name: "leading",
				fn: z(() => [O(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [O(t.$slots, "supporting", {}, void 0, !0)]),
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
		]), t.$slots.submenu ? O(t.$slots, "submenu", { key: 0 }, void 0, !0) : a("", !0)]));
	}
}), [["__scopeId", "data-v-b44804e6"]]), Pr = j([]), Fr = null;
function Ir() {
	if (!Fr) return;
	let { lockedScrollbarGutter: e, overflow: t, root: n, scrollbarGutter: r } = Fr;
	n.style.overflow === "hidden" && (n.style.overflow = t), e !== null && n.style.scrollbarGutter === e && (n.style.scrollbarGutter = r), Fr = null;
}
function Lr() {
	if (Fr) return;
	let e = document.documentElement, t = e.clientWidth > 0 ? Math.max(0, window.innerWidth - e.clientWidth) : 0, n = getComputedStyle(e).scrollbarGutter, r = t > 0 && !n.includes("stable");
	Fr = {
		lockedScrollbarGutter: r ? "stable" : null,
		overflow: e.style.overflow,
		root: e,
		scrollbarGutter: e.style.scrollbarGutter
	}, r && (e.style.scrollbarGutter = Fr.lockedScrollbarGutter), e.style.overflow = "hidden";
}
function Rr(e) {
	let t = Pr.value.filter((e) => e.isConnected);
	if (t.length === 0 && Ir(), t.includes(e)) {
		Pr.value = t;
		return;
	}
	Pr.value = [...t, e], Lr();
}
function zr(e) {
	Pr.value = Pr.value.filter((t) => t !== e && t.isConnected), Pr.value.length === 0 && Ir();
}
//#endregion
//#region src/components/mat-dialog/MatDialog.vue
var Br = { class: "mat-dialog__header" }, Vr = {
	key: 1,
	class: "mat-dialog__actions"
}, Hr = {
	key: 0,
	class: "mat-dialog__content"
}, Ur = {
	key: 2,
	class: "mat-dialog__content"
}, Wr = {
	key: 3,
	class: "mat-dialog__actions"
}, Gr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator(e) {
				return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
			}
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
		function d(e) {
			return typeof e == "number" ? `${e}px` : e.trim();
		}
		let f = e, p = c, m = P(), _ = I(), v = T(null), x = T(null), C = T(!1), w = T("closed"), E = T(null), D = `${F().replace(/[^\w-]/g, "-")}-title`, k = r(() => x.value?.root ?? x.value?.$el ?? null), A = r(() => f.title !== void 0 || !!_.title), j = r(() => f.content !== void 0 || !!_.default), N = r(() => !f.fullScreen && (f.icon !== void 0 || !!_.icon)), B = r(() => !!_.activator), V = r(() => Pr.value.at(-1) === k.value), { colorStyle: H } = Ee(r(() => f.color)), U = r(() => {
			if (!(f.fullScreen || f.width === void 0)) return {
				inlineSize: `min(${d(f.width)}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), W = r(() => [
			H.value,
			m.style,
			U.value
		]), G = !1, K, q = null;
		function J() {
			let e = v.value ? [...v.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function Y() {
			K !== void 0 && (window.clearTimeout(K), K = void 0);
		}
		function X() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function ee(e, t) {
			if (Y(), X()) {
				t();
				return;
			}
			K = window.setTimeout(() => {
				K = void 0, t();
			}, e);
		}
		function te() {
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return f.attach instanceof HTMLElement && f.attach.ownerDocument === document ? f.attach : null;
		}
		function Z() {
			p("update:modelValue", !1);
		}
		function Q() {
			A.value || m["aria-label"] || m["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function ne() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function re() {
			let e = k.value;
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
		async function ie() {
			if (Y(), C.value && k.value?.open) {
				w.value = "opening", ee(400, () => {
					w.value = "open", p("opened");
				});
				return;
			}
			let e = B.value ? J() : null;
			if (B.value && !e) {
				ne(), Z();
				return;
			}
			let t = te();
			if (!t) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), Z();
				return;
			}
			q = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), E.value = t, C.value = !0, w.value = "opening", Q(), await g(), !(!f.modelValue || !k.value) && (k.value.open || k.value.showModal(), Rr(k.value), re(), ee(400, () => {
				w.value = "open", p("opened");
			}));
		}
		function $() {
			let e = k.value;
			e?.open && e.close(), e && zr(e), C.value = !1, w.value = "closed", g(() => {
				q?.isConnected && q.focus({ preventScroll: !0 }), q = null, p("closed");
			});
		}
		function ae() {
			C.value && (w.value = "closing", ee(200, $));
		}
		function oe(e) {
			e.preventDefault(), Z();
		}
		function se(e) {
			e.key === "Escape" && (e.preventDefault(), Z());
		}
		function ce(e) {
			if (!f.closeOnBack || e.target !== k.value) return;
			let t = k.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && Z();
		}
		return b(() => {
			G = !0, f.modelValue && ie();
		}), y(() => {
			G = !1, Y(), k.value && (zr(k.value), k.value.open && k.value.close());
		}), L(() => f.modelValue, (e) => {
			G && (e ? ie() : ae());
		}), L(() => f.attach, () => {
			f.modelValue && C.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), R(() => {
			f.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (r, c) => (S(), o(t, null, [B.value ? (S(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: v,
			class: "mat-dialog__activator"
		}, [O(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), C.value ? (S(), i(n, {
			key: 1,
			to: E.value
		}, [u(Et, h({
			ref_key: "surface",
			ref: x
		}, r.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${w.value}`, {
				"mat-dialog--full-screen": e.fullScreen,
				"mat-dialog--with-icon": N.value,
				"mat-dialog--top": V.value,
				"mat-dialog--transparent-scrim": !e.scrim
			}]],
			style: W.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (A.value ? D : void 0),
			tabindex: "-1",
			onCancel: oe,
			onClick: ce,
			onKeydown: se
		}), {
			default: z(() => [e.fullScreen ? (S(), o(t, { key: 0 }, [s("header", Br, [
				u(mt, {
					class: "mat-dialog__close",
					icon: "close",
					label: e.closeLabel,
					size: "small",
					variant: "standard",
					onClick: Z
				}, null, 8, ["label"]),
				A.value ? (S(), o("h2", {
					key: 0,
					id: D,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? O(r.$slots, "title", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.title), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (S(), o("div", Vr, [O(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			]), j.value ? (S(), o("div", Hr, [e.content === void 0 ? O(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.content), 1)], 64))])) : a("", !0)], 64)) : (S(), o(t, { key: 1 }, [
				N.value ? (S(), i(Oe, {
					key: 0,
					as: "div",
					class: "mat-dialog__icon",
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: z(() => [e.icon === void 0 ? O(r.$slots, "icon", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.icon), 1)], 64))]),
					_: 3
				})) : a("", !0),
				A.value ? (S(), o("h2", {
					key: 1,
					id: D,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? O(r.$slots, "title", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.title), 1)], 64))])) : a("", !0),
				j.value ? (S(), o("div", Ur, [e.content === void 0 ? O(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.content), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (S(), o("div", Wr, [O(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			], 64))]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-e7e0d33b"]]), Kr = ["aria-label"], qr = {
	key: 1,
	class: "mat-sheet__header"
}, Jr = {
	key: 1,
	class: "mat-sheet__header-actions"
}, Yr = {
	key: 2,
	class: "mat-sheet__content"
}, Xr = {
	key: 3,
	class: "mat-sheet__footer"
}, Zr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let d = e, f = c, p = P(), m = I(), _ = T(null), v = T(null), x = T(!1), C = T("closed"), w = T(null), E = T(typeof window > "u" ? 0 : window.innerWidth), D = T(0), k = T(null), A = T(!1), j = `${F().replace(/[^\w-]/g, "-")}-title`, N = r(() => v.value?.root ?? v.value?.$el ?? null), R = r(() => d.variant === "auto" ? E.value < d.breakpoint ? "modal" : "standard" : d.variant), V = r(() => R.value === "modal"), H = r(() => V.value && Pr.value.at(-1) === N.value), U = r(() => !!m.activator), W = r(() => d.title !== void 0 || !!m.title), G = r(() => d.content !== void 0 || !!m.default), K = r(() => d.closable || d.direction === "bottom" && V.value && d.expanded), q = r(() => d.expanded ? V.value ? d.expandedDragHandleLabel : d.collapseDragHandleLabel : d.dragHandleLabel), J = r(() => W.value || K.value || !!m.header || !!m.actions), Y = r(() => V.value ? "dialog" : "aside"), X = r(() => {
			if (d.width !== void 0) return typeof d.width == "number" ? `${d.width}px` : d.width.trim();
		}), ee = r(() => {
			if (X.value) return { "--mat-sheet-preferred-width": X.value };
		}), te = r(() => ({
			"--mat-sheet-drag-offset": `${D.value}px`,
			...k.value === null ? {} : { "--mat-sheet-drag-size": `${k.value}px` }
		})), Z = r(() => [
			p.style,
			ee.value,
			te.value
		]), Q = !1, ne, re = null, ie = !1, $ = null, ae = 0, oe = 0, se = 0, ce = 0, le = !1;
		function ue() {
			ne !== void 0 && (window.clearTimeout(ne), ne = void 0);
		}
		function de() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function fe(e, t) {
			if (ue(), de()) {
				t();
				return;
			}
			ne = window.setTimeout(() => {
				ne = void 0, t();
			}, e);
		}
		function pe() {
			let e = _.value ? [..._.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function me() {
			if (typeof d.attach == "string") try {
				return document.querySelector(d.attach);
			} catch {
				return null;
			}
			return d.attach instanceof HTMLElement && d.attach.ownerDocument === document ? d.attach : null;
		}
		function he() {
			f("update:modelValue", !1);
		}
		function ge() {
			if (le) {
				le = !1;
				return;
			}
			if (d.expanded) {
				if (V.value) {
					he();
					return;
				}
				f("update:expanded", !1);
				return;
			}
			f("update:expanded", !0);
		}
		function _e(e) {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), ge());
		}
		function ve() {
			console.warn(`${d.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`);
		}
		function ye() {
			!V.value || W.value || p["aria-label"] || p["aria-labelledby"] || console.warn(`${d.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
		}
		function be() {
			console.warn(`${d.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function xe() {
			let e = N.value;
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
		function Se() {
			let e = N.value;
			e instanceof HTMLDialogElement && (e.open || e.showModal(), Rr(e), xe());
		}
		async function Ce() {
			if (ue(), x.value) {
				C.value = "opening", fe(400, () => {
					C.value = "open", f("opened");
				});
				return;
			}
			let e = U.value ? pe() : null;
			if (U.value && !e) {
				ve(), he();
				return;
			}
			if (V.value) {
				let t = me();
				if (!t) {
					be(), he();
					return;
				}
				w.value = t, re = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			}
			ie = V.value, x.value = !0, C.value = "opening", ye(), await g(), !(!d.modelValue || !N.value) && (V.value && Se(), fe(400, () => {
				C.value = "open", f("opened");
			}));
		}
		function we() {
			ie && re?.isConnected && re.focus({ preventScroll: !0 }), re = null, ie = !1;
		}
		function Te() {
			let e = N.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), zr(e)), x.value = !1, C.value = "closed", D.value = 0, k.value = null, g(() => {
				we(), f("closed");
			});
		}
		function Ee() {
			x.value && (C.value = "closing", fe(200, Te));
		}
		function De(e) {
			e.preventDefault(), he();
		}
		function Oe(e) {
			e.key === "Escape" && (e.preventDefault(), he());
		}
		function ke(e) {
			if (!V.value || !d.closeOnBack || e.target !== N.value) return;
			let t = N.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && he();
		}
		function Ae(e) {
			if (e.pointerId === $) {
				if (d.direction === "bottom") {
					if (ce = e.clientY - ae, !d.expanded && ce < 0 || d.expanded && ce > 0) {
						D.value = 0, k.value = Math.max(0, oe - ce);
						return;
					}
					D.value = Math.max(0, ce), k.value = oe;
					return;
				}
				D.value = d.position === "start" ? Math.max(0, ae - e.clientX) : Math.max(0, e.clientX - ae);
			}
		}
		function je() {
			$ = null, A.value = !1, window.removeEventListener("pointermove", Ae), window.removeEventListener("pointerup", Me), window.removeEventListener("pointercancel", Ne);
		}
		function Me(e) {
			if (e.pointerId !== $) return;
			let t = N.value, n = d.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - se), i = d.direction === "bottom" ? Math.abs(ce) : D.value, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (le = i >= 4, je(), d.direction === "bottom" && o) {
				if (!d.expanded && ce < 0) {
					D.value = 0, k.value = null, f("update:expanded", !0);
					return;
				}
				if (d.expanded && ce > 0) {
					D.value = 0, k.value = null, f("update:expanded", !1);
					return;
				}
				if (!d.expanded && ce > 0) {
					k.value = null, he();
					return;
				}
			}
			if (d.direction === "side" && o) {
				he();
				return;
			}
			D.value = 0, k.value = null;
		}
		function Ne() {
			je(), D.value = 0, k.value = null;
		}
		function Pe(e) {
			!d.draggable || e.button !== 0 || $ !== null || ($ = e.pointerId, ae = d.direction === "bottom" ? e.clientY : e.clientX, oe = d.direction === "bottom" ? N.value?.getBoundingClientRect().height ?? 0 : N.value?.getBoundingClientRect().width ?? 0, se = performance.now(), ce = 0, k.value = d.direction === "bottom" ? oe : null, A.value = !0, window.addEventListener("pointermove", Ae), window.addEventListener("pointerup", Me), window.addEventListener("pointercancel", Ne));
		}
		function Fe(e) {
			d.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Pe(e);
		}
		function Ie() {
			E.value = window.innerWidth;
		}
		async function Le(e, t) {
			if (!x.value || !d.modelValue || e === t) return;
			ue();
			let n = N.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), zr(n), we()), e === "modal") {
				let e = me();
				if (!e) {
					be(), he();
					return;
				}
				w.value = e, re = document.activeElement instanceof HTMLElement ? document.activeElement : null, ie = !0, ye();
			}
			C.value = "open", await g(), e === "modal" && d.modelValue && Se();
		}
		return b(() => {
			Q = !0, Ie(), window.addEventListener("resize", Ie), d.modelValue && Ce();
		}), y(() => {
			Q = !1, ue(), je(), window.removeEventListener("resize", Ie);
			let e = N.value;
			e instanceof HTMLDialogElement && (zr(e), e.open && e.close());
		}), L(() => d.modelValue, (e) => {
			Q && (e ? Ce() : Ee());
		}), L(R, Le), L(() => d.attach, () => {
			d.modelValue && x.value && V.value && console.warn(`${d.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), L(() => d.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${d.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, c) => (S(), o(t, null, [U.value ? (S(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-sheet__activator"
		}, [O(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), x.value ? (S(), i(n, {
			key: 1,
			to: w.value ?? "body",
			disabled: !V.value
		}, [u(Et, h({
			ref_key: "surface",
			ref: v
		}, r.$attrs, {
			as: Y.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${R.value}`,
				`mat-sheet--${C.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--dragging": A.value,
					"mat-sheet--expanded": e.direction === "bottom" && e.expanded,
					"mat-sheet--top": H.value,
					"mat-sheet--transparent-scrim": !e.scrim
				}
			]],
			style: Z.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (W.value ? j : void 0),
			tabindex: V.value ? -1 : void 0,
			onCancel: De,
			onClick: ke,
			onKeydown: Oe,
			onPointerdown: Fe
		}), {
			default: z(() => [
				e.direction === "bottom" && e.dragHandle ? (S(), o("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": q.value,
					onClick: ge,
					onKeydown: _e,
					onPointerdown: B(Pe, ["stop"])
				}, [O(r.$slots, "drag-handle", {}, () => [c[0] ||= s("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, Kr)) : a("", !0),
				J.value ? (S(), o("header", qr, [O(r.$slots, "header", {}, () => [
					W.value ? (S(), o("h2", {
						key: 0,
						id: j,
						class: "mat-sheet__title"
					}, [e.title === void 0 ? O(r.$slots, "title", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.title), 1)], 64))])) : a("", !0),
					r.$slots.actions ? (S(), o("div", Jr, [O(r.$slots, "actions", {}, void 0, !0)])) : a("", !0),
					K.value ? (S(), i(mt, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: he
					}, null, 8, ["label"])) : a("", !0)
				], !0)])) : a("", !0),
				G.value ? (S(), o("div", Yr, [e.content === void 0 ? O(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(M(e.content), 1)], 64))])) : a("", !0),
				r.$slots.footer ? (S(), o("div", Xr, [O(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
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
}), [["__scopeId", "data-v-17949de9"]]), Qr = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Number.isFinite(e) && e > 0
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator(e) {
				return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
			}
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
		return (e, t) => (S(), i(Zr, h(n, {
			"component-name": "MatBottomSheet",
			direction: "bottom",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e),
			"onUpdate:expanded": t[1] ||= (e) => r("update:expanded", e),
			onOpened: t[2] ||= (e) => r("opened"),
			onClosed: t[3] ||= (e) => r("closed")
		}), c({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: z(() => [O(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots["drag-handle"] ? {
				name: "drag-handle",
				fn: z(() => [O(e.$slots, "drag-handle")]),
				key: "1"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: z(() => [O(e.$slots, "header")]),
				key: "2"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: z(() => [O(e.$slots, "title")]),
				key: "3"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: z(() => [O(e.$slots, "default")]),
				key: "4"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: z(() => [O(e.$slots, "actions")]),
				key: "5"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: z(() => [O(e.$slots, "footer")]),
				key: "6"
			} : void 0
		]), 1040));
	}
}), $r = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Number.isFinite(e) && e > 0
		},
		position: {
			type: String,
			default: "end",
			validator: (e) => ["start", "end"].includes(e)
		},
		width: {
			type: [Number, String],
			default: 400,
			validator(e) {
				return typeof e == "number" ? Number.isFinite(e) && e > 0 && e <= 400 : typeof e == "string" && e.trim().length > 0;
			}
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
		return (e, t) => (S(), i(Zr, h(n, {
			"component-name": "MatSideSheet",
			direction: "side",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e),
			onOpened: t[1] ||= (e) => r("opened"),
			onClosed: t[2] ||= (e) => r("closed")
		}), c({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: z(() => [O(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: z(() => [O(e.$slots, "header")]),
				key: "1"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: z(() => [O(e.$slots, "title")]),
				key: "2"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: z(() => [O(e.$slots, "default")]),
				key: "3"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: z(() => [O(e.$slots, "actions")]),
				key: "4"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: z(() => [O(e.$slots, "footer")]),
				key: "5"
			} : void 0
		]), 1040));
	}
}), ei = { class: "mat-container__content" }, ti = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		return (e, n) => (S(), o("div", h(e.$attrs, { class: ["mat-container", { "mat-container--fluid": t.fluid }] }), [s("div", ei, [O(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-f98574ca"]]), ni = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatSpacer",
	inheritAttrs: !1
}, {
	__name: "MatSpacer",
	setup(e) {
		return (e, t) => (S(), o("span", h(e.$attrs, {
			class: "mat-spacer",
			"aria-hidden": "true"
		}), null, 16));
	}
}), [["__scopeId", "data-v-61d08a89"]]), ri = ["aria-valuemax", "aria-valuenow"], ii = ["width", "height"], ai = { key: 0 }, oi = ["width", "height"], si = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, ci = ["d"], li = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, ui = ["d"], di = ["d", "mask"], fi = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, pi = ["d"], mi = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, hi = ["d"], gi = ["d"], _i = {
	key: 1,
	class: "mat-loader__linear-stop"
}, vi = ["viewBox"], yi = { class: "mat-loader__circular-linear-rotate" }, bi = { class: "mat-loader__circular-rotate-arc" }, xi = [
	"cx",
	"cy",
	"r"
], Si = ["d"], Ci = 4, wi = 3, Ti = 40, Ei = 1.6, Di = 15, Oi = 4, ki = .001, Ai = 100, ji = 300, Mi = 900, Ni = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator(e) {
				return typeof e == "number" && Number.isFinite(e) && e > 0;
			}
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
				let t = (e - o) / Ti * Math.PI * 2, n = a - Math.sin(t - i) * r;
				l.push(`L ${c(e)} ${c(n)}`);
			}
			let u = (s - o) / Ti * Math.PI * 2, d = a - Math.sin(u - i) * r;
			return l.push(`L ${c(s)} ${c(d)}`), l.join(" ");
		}
		function d(e, t, n, r) {
			let i = Math.max(1, Math.round(Math.PI * 2 * t / Di)), a = i * 12, o = [];
			for (let s = 0; s <= a; s += 1) {
				let l = s / a, u = l * Math.PI * 2, d = l * Math.PI * 2 * i, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = s === 0 ? "M" : "L";
				o.push(`${h} ${c(p)} ${c(m)}`);
			}
			return o.push("Z"), o.join(" ");
		}
		let f = e, { colorStyle: p } = Ee(r(() => f.color)), m = T(null), g = T(Ai), _ = T(+(f.shape === "wavy")), x = T(0), C = `mat-loader-linear-mask-${F()}`, w, E, D, O = r(() => i(f.max) ? f.max : 1), k = r(() => i(f.thickness) ? f.thickness : 4), A = r(() => f.variant === "circular"), j = r(() => f.shape === "wavy"), M = r(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), O.value);
		}), N = r(() => Number((M.value / O.value * 100).toFixed(3))), P = r(() => k.value + wi * 2 * _.value), I = r(() => Math.min(100, k.value / g.value * 100)), R = r(() => {
			let e = g.value - k.value;
			return e <= 0 ? 1 : g.value / e;
		}), z = r(() => N.value === 100 ? 100 : Math.min(100, Math.max(N.value, I.value + ki))), B = r(() => u(g.value, P.value, k.value, 0, 0)), V = r(() => u(g.value, P.value, k.value, wi * _.value, x.value)), H = r(() => k.value + 36 + 8 * _.value), U = r(() => H.value / 2), W = r(() => U.value - k.value / 2 - Ei * _.value), G = r(() => `0 0 ${H.value} ${H.value}`), K = r(() => d(U.value, W.value, Ei * _.value, x.value)), q = r(() => {
			let e = Math.PI * 2 * W.value;
			return (Ci + k.value) / e * 100;
		}), J = r(() => Math.min(12, q.value)), Y = r(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - N.value - q.value * 2).toFixed(3)), t = Number(Math.min(100, N.value + q.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${c(e)} ${c(100 - e)}`,
				strokeDashoffset: `-${c(t)}`
			};
		}), X = r(() => f.indeterminate ? {} : { strokeDasharray: `${c(N.value === 0 ? ki : N.value)} 200` }), ee = r(() => ({
			...p.value,
			"--mat-loader-circular-gap-progress": c(J.value),
			"--mat-loader-circular-radius": `${W.value}px`,
			"--mat-loader-circular-size": `${H.value}px`,
			"--mat-loader-indicator-gap-size": `${Ci}px`,
			"--mat-loader-linear-cap-progress": c(I.value),
			"--mat-loader-linear-path-scale": c(R.value),
			"--mat-loader-linear-segment-end": c(z.value),
			"--mat-loader-linear-segment-end-position": `${c(z.value)}%`,
			"--mat-loader-linear-size": `${P.value}px`,
			"--mat-loader-progress": `${N.value}`,
			"--mat-loader-stop-indicator-size": `${Oi}px`,
			"--mat-loader-thickness": `${k.value}px`
		}));
		function te(e) {
			E = void 0;
			let t = D === void 0 ? 0 : Math.min(64, e - D), n = +!!j.value, r = n - _.value;
			if (D = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / ji);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (x.value += t / Mi * Math.PI * 2, x.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? E = globalThis.requestAnimationFrame(te) : D = void 0;
		}
		function Z() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!j.value;
				return;
			}
			E === void 0 && (D = void 0, E = globalThis.requestAnimationFrame(te));
		}
		return L(j, Z), L(() => f.waveMotion, Z), b(() => {
			Z(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (w = new globalThis.ResizeObserver(([e]) => {
				let t = e.contentRect.width;
				t > 0 && (g.value = t);
			}), w.observe(m.value));
		}), y(() => {
			w?.disconnect(), E !== void 0 && globalThis.cancelAnimationFrame?.(E);
		}), (n, r) => (S(), o("div", h(n.$attrs, {
			class: ["mat-loader", [
				`mat-loader--${e.variant}`,
				`mat-loader--${e.shape}`,
				{
					"mat-loader--indeterminate": e.indeterminate,
					"mat-loader--wave-motion": e.waveMotion
				}
			]],
			style: ee.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": O.value,
			"aria-valuenow": e.indeterminate ? void 0 : M.value
		}), [A.value ? (S(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: G.value,
			"aria-hidden": "true"
		}, [s("g", yi, [s("g", bi, [s("circle", {
			class: "mat-loader__circular-track",
			cx: U.value,
			cy: U.value,
			r: W.value,
			pathLength: "100",
			style: v(Y.value)
		}, null, 12, xi), s("path", {
			class: "mat-loader__circular-active",
			d: K.value,
			pathLength: "100",
			style: v(X.value)
		}, null, 12, Si)])])], 8, vi)) : (S(), o("span", {
			key: 0,
			ref_key: "linearElement",
			ref: m,
			class: "mat-loader__linear",
			"aria-hidden": "true"
		}, [
			e.indeterminate ? a("", !0) : (S(), o(t, { key: 0 }, [r[0] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--before" }, null, -1), r[1] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--after" }, null, -1)], 64)),
			(S(), o("svg", {
				class: "mat-loader__linear-indicator",
				width: g.value,
				height: P.value
			}, [
				e.indeterminate ? (S(), o("defs", ai, [s("mask", {
					id: C,
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
					s("g", si, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: V.value,
						pathLength: "100"
					}, null, 8, ci)]),
					s("g", li, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: V.value,
						pathLength: "100"
					}, null, 8, ui)])
				], 8, oi)])) : a("", !0),
				e.indeterminate ? (S(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: B.value,
					pathLength: "100",
					mask: `url(#${C})`
				}, null, 8, di)) : a("", !0),
				e.indeterminate ? (S(), o(t, { key: 2 }, [s("g", fi, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: V.value,
					pathLength: "100"
				}, null, 8, pi)]), s("g", mi, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: V.value,
					pathLength: "100"
				}, null, 8, hi)])], 64)) : (S(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: V.value,
					pathLength: "100"
				}, null, 8, gi))
			], 8, ii)),
			e.indeterminate ? a("", !0) : (S(), o("span", _i))
		], 512))], 16, ri));
	}
}), [["__scopeId", "data-v-09e887cb"]]), Pi = Symbol("mat-snackbar-externally-managed"), Fi = [], Ii = null;
function Li() {
	Ii || Fi.length === 0 || (Ii = Fi.shift(), Ii.activate());
}
function Ri(e) {
	e === Ii || Fi.includes(e) || (Fi.push(e), Li());
}
function zi(e) {
	let t = Fi.indexOf(e);
	t !== -1 && Fi.splice(t, 1);
}
function Bi(e) {
	Ii === e && (Ii = null, Li());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var Vi = { class: "mat-snackbar__text" }, Hi = {
	key: 0,
	class: "mat-snackbar__controls"
}, Ui = {
	key: 0,
	class: "mat-snackbar__action"
}, Wi = {
	key: 1,
	class: "mat-snackbar__close"
}, Gi = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let d = e, f = c, m = I(), _ = p(Z, te), v = p(Pi, !1), x = T(!1), C = T("closed"), w = T(!1), E = r(() => !!m.default || typeof d.text == "string" && d.text.trim().length > 0), D = r(() => !!m.action || typeof d.actionText == "string" && d.actionText.trim().length > 0), k = r(() => !!m.close || d.closable), A = r(() => D.value || k.value), j = T(0), P = r(() => typeof d.closeLabel == "string" && d.closeLabel.trim().length > 0 ? d.closeLabel : "关闭"), F = !1, R, B, V = !1, H = null, U = r(() => ({ "--mat-snackbar-toolbar-clearance": `${j.value}px` }));
		function W() {
			j.value = it();
		}
		let G = { activate: se };
		function K() {
			R !== void 0 && (window.clearTimeout(R), R = void 0);
		}
		function q() {
			B !== void 0 && (window.clearTimeout(B), B = void 0);
		}
		function J() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function X(e, t) {
			if (q(), J()) {
				t();
				return;
			}
			B = window.setTimeout(() => {
				B = void 0, t();
			}, e);
		}
		function ee() {
			return Number.isFinite(d.duration) && d.duration >= 0 ? d.duration : 4e3;
		}
		function Q() {
			K();
			let e = ee();
			e !== 0 && (R = window.setTimeout(() => {
				R = void 0, ae();
			}, e));
		}
		function ne() {
			V || (V = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function re() {
			x.value && (x.value = !1, C.value = "closed", f("closed"), v || Bi(G));
		}
		function ie() {
			if (K(), !x.value) {
				v || zi(G);
				return;
			}
			C.value !== "closing" && (C.value = "closing", X(200, re));
		}
		function $() {
			w.value || (w.value = !0, f("update:modelValue", !1));
		}
		function ae() {
			$(), ie();
		}
		function oe() {
			!x.value || C.value === "closing" || (ae(), f("action"));
		}
		async function se() {
			if (!F || !d.modelValue || w.value || !E.value) {
				E.value || (ne(), $()), v || Bi(G);
				return;
			}
			K(), q(), x.value = !0, C.value = "opening", await g(), !(!F || !x.value || C.value === "closing") && X(400, () => {
				!x.value || C.value === "closing" || (C.value = "open", Q());
			});
		}
		function ce() {
			if (w.value || !E.value) {
				E.value || (ne(), ae());
				return;
			}
			if (v) {
				se();
				return;
			}
			if (x.value && C.value === "closing") {
				se();
				return;
			}
			Ri(G);
		}
		return b(() => {
			F = !0, H = at(W), W(), d.modelValue && ce();
		}), y(() => {
			F = !1, H?.(), H = null, K(), q(), v || (x.value ? Bi(G) : zi(G));
		}), L(() => d.modelValue, (e) => {
			if (F) {
				if (e) {
					w.value = !1, ce();
					return;
				}
				w.value = !1, ie();
			}
		}), L(E, (e) => {
			if (F) {
				if (!e) {
					ae();
					return;
				}
				V = !1, d.modelValue && !x.value && !w.value && ce();
			}
		}), L(() => d.duration, () => {
			C.value === "open" && Q();
		}), (r, c) => (S(), i(n, { to: "body" }, [x.value ? (S(), o("section", h({ key: 0 }, r.$attrs, {
			class: ["mat-snackbar", [
				`mat-snackbar--${C.value}`,
				`mat-snackbar--${e.position}`,
				{ "mat-snackbar--with-trailing": A.value }
			]],
			style: U.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [s("div", Vi, [r.$slots.default ? O(r.$slots, "default", { key: 0 }, void 0, !0) : (S(), o(t, { key: 1 }, [l(M(e.text), 1)], 64))]), A.value ? (S(), o("div", Hi, [D.value ? (S(), o("div", Ui, [r.$slots.action ? O(r.$slots, "action", {
			key: 0,
			action: oe
		}, void 0, !0) : (S(), i(Y, {
			key: 1,
			class: "mat-snackbar__default-action",
			"use-cursor": N(_).useCursor,
			onClick: oe
		}, {
			default: z(() => [l(M(e.actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : a("", !0), k.value ? (S(), o("div", Wi, [r.$slots.close ? O(r.$slots, "close", {
			key: 0,
			close: ae
		}, void 0, !0) : (S(), i(Y, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": P.value,
			"use-cursor": N(_).useCursor,
			onClick: ae
		}, {
			default: z(() => [u(Oe, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : a("", !0)])) : a("", !0)], 16)) : a("", !0)]));
	}
}), [["__scopeId", "data-v-baf7aad1"]]), Ki = ["aria-orientation"], qi = { class: "mat-toolbar__surface" }, Ji = { class: "mat-toolbar__content" }, Yi = 200, Xi = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator(e) {
				if (typeof e == "number") return Number.isFinite(e) && e >= 0;
				if (typeof e != "string") return !1;
				let t = e.trim();
				return !t || /[;{}]/.test(t) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("block-size", t);
			}
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
			if (typeof e == "number") return Number.isFinite(e) && e >= 0;
			if (typeof e != "string") return !1;
			let t = e.trim();
			return !t || /[;{}]/.test(t) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("block-size", t);
		}
		function u(e) {
			return typeof e == "number" && Number.isFinite(e) && e >= 0 ? `${e}px` : typeof e == "string" && l(e) ? e.trim() : "0px";
		}
		function d(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let f = e, p = P(), m = I(), _ = T(f.modelValue), x = T(f.modelValue ? "open" : "closed"), C = T(null), w = T(null), E = T({
			blockSize: 0,
			inlineSize: 0
		}), D = r(() => c.includes(f.variant) ? f.variant === "floating" ? "floating-bottom" : f.variant : "docked"), k = r(() => [
			"start",
			"center",
			"end"
		].includes(f.position) ? f.position : "center"), A = r(() => D.value.startsWith("floating")), j = r(() => D.value === "floating-left" || D.value === "floating-right"), M = r(() => D.value === "docked" || D.value === "floating-bottom"), F = r(() => {
			if (!f.app) return null;
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return d(f.attach);
		}), R = r(() => u(f.bottomPlaceholder)), z = r(() => M.value ? R.value : "0px"), B = r(() => [p.style, { "--mat-toolbar-bottom-placeholder": z.value }]), V = r(() => ({
			blockSize: `${E.value.blockSize}px`,
			inlineSize: `${E.value.inlineSize}px`
		})), H = r(() => [
			`mat-toolbar--${D.value}`,
			`mat-toolbar--position-${k.value}`,
			{
				"mat-toolbar--app": f.app,
				"mat-toolbar--vertical": j.value,
				"mat-toolbar--vibrant": f.vibrant
			}
		]), U, W, G = !1, K, q = !1;
		function J() {
			K !== void 0 && (window.clearTimeout(K), K = void 0);
		}
		function Y() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function X(e) {
			if (J(), Y()) {
				e();
				return;
			}
			K = window.setTimeout(() => {
				K = void 0, e();
			}, Yi);
		}
		function ee() {
			J(), _.value = !0, x.value = "opening", X(() => {
				_.value && f.modelValue && (x.value = "open");
			});
		}
		function te() {
			if (J(), !_.value) {
				x.value = "closed";
				return;
			}
			x.value = "closing", X(() => {
				f.modelValue || (_.value = !1, x.value = "closed");
			});
		}
		function Z() {
			q || !m.fab || A.value || (q = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function Q() {
			let e = C.value?.getBoundingClientRect();
			e && (E.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, U?.update());
		}
		function ne() {
			if (!C.value) return null;
			let e = C.value.getBoundingClientRect(), t = w.value?.getBoundingClientRect();
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
		async function re() {
			G && (await g(), Q());
		}
		function ie() {
			W?.disconnect(), W = void 0, window.removeEventListener("resize", Q), U?.unregister(), U = void 0;
		}
		async function $() {
			if (await g(), G) {
				if (!_.value || !C.value) {
					ie();
					return;
				}
				U || (U = nt(C.value, {
					getRect: ne,
					isBottom: () => M.value
				}), W = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(Q), W?.observe(C.value), window.addEventListener("resize", Q)), w.value && W?.observe(w.value), Q(), Z();
			}
		}
		b(() => {
			G = !0, ae(), Z(), $();
		}), y(() => {
			G = !1, J(), ie();
		}), L(() => f.modelValue, (e) => {
			if (G) {
				if (e) {
					ee();
					return;
				}
				te();
			}
		}), L(_, $), L([
			D,
			k,
			R,
			() => f.app,
			() => f.attach
		], () => {
			ae(), re(), $();
		});
		function ae() {
			f.app && !F.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, c) => (S(), o(t, null, [e.placeholder && _.value && (!e.app || F.value) ? (S(), o("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: v(V.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (S(), i(n, {
			to: F.value ?? "body",
			disabled: !e.app
		}, [_.value && (!e.app || F.value) ? (S(), o("div", h({
			key: 0,
			ref_key: "toolbarElement",
			ref: C
		}, r.$attrs, {
			class: ["mat-toolbar", [H.value, `mat-toolbar--${x.value}`]],
			style: B.value,
			role: "toolbar",
			"aria-orientation": j.value ? "vertical" : void 0
		}), [s("div", qi, [s("div", Ji, [O(r.$slots, "default", {}, void 0, !0)])]), A.value && N(m).fab ? (S(), o("div", {
			key: 0,
			ref_key: "fabElement",
			ref: w,
			class: "mat-toolbar__fab"
		}, [O(r.$slots, "fab", {}, void 0, !0)], 512)) : a("", !0)], 16, Ki)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-2ef0fa1c"]]), Zi = Symbol("mat-panes"), Qi = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], $i = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => Qi.includes(e)
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = T(null), s = A([]), c = T(null), l = T(null), u = T(null), d = /* @__PURE__ */ new Map(), f, p, m, _, v, x = r(() => c.value ?? w.value), w = r(() => {
			let e = {};
			return s.forEach((t) => {
				let r = n.sizes?.[t.id];
				e[t.id] = typeof r == "number" && Number.isFinite(r) && r >= 0 ? r : 1;
			}), Object.values(e).reduce((e, t) => e + t, 0) === 0 && s.length > 0 && s.forEach((t) => {
				e[t.id] = 1;
			}), e;
		});
		function E(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function D(e, t) {
			return `${e}::${t}`;
		}
		function k(e) {
			return s.findIndex((t) => t.id === e);
		}
		function j(e) {
			return s.find((t) => t.id === e)?.element.value ?? null;
		}
		function M(e) {
			let t = j(e);
			return t ? t.getBoundingClientRect().width : 0;
		}
		function N(e) {
			let t = k(e);
			if (t < 0 || t >= s.length - 1) return null;
			let n = s[t], r = s[t + 1];
			return {
				key: D(n.id, r.id),
				left: n,
				right: r
			};
		}
		function P(e) {
			return x.value[e] ?? 0;
		}
		function F(e) {
			return { "--mat-pane-weight": P(e) };
		}
		function I(e) {
			return n.resizable && N(e) !== null;
		}
		function R(e) {
			return N(e) !== null;
		}
		function z(e) {
			return N(e)?.key === l.value;
		}
		function B(e) {
			let t = N(e);
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
			return { ...x.value };
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
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : E(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function G(e) {
			let t = N(e);
			if (!t) return null;
			let n = M(t.left.id), r = M(t.right.id);
			return {
				leftWidth: n,
				rightWidth: r,
				totalWidth: n + r
			};
		}
		function K(e, t) {
			if (!n.resizable || f || t.button !== void 0 && t.button !== 0) return;
			let r = N(e), i = G(e);
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
			let n = N(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = E(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			c.value = W(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		function J(e, t, n) {
			if (!f || f.pointerId !== t.pointerId) return;
			let r = N(e), i = f.changed, a = c.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				U(a);
				return;
			}
			c.value = null;
		}
		function Y(e, t) {
			let r = N(e);
			if (!r || !n.resizable) return;
			let i = {
				ArrowLeft: -1,
				ArrowRight: 1
			}[t.key], a = G(e), o = V(), s = o[r.left.id] + o[r.right.id] || 2, c = a?.totalWidth || 100, l = c * (o[r.left.id] / s), u;
			if (i !== void 0) u = E(l + i * (t.shiftKey ? 64 : 16), 0, c);
			else if (t.key === "Home") u = 0;
			else if (t.key === "End") u = c;
			else if (t.key === "Enter") {
				let e = r.key, t = o[r.left.id];
				t === 0 ? u = c * (d.get(e) ?? .5) : (d.set(e, t / s), u = 0);
			} else return;
			t.preventDefault(), U(W(r.left.id, r.right.id, u, c, o));
		}
		function X(e) {
			return s.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), s.push(e), () => {
				let t = s.indexOf(e);
				t !== -1 && s.splice(t, 1);
			};
		}
		function ee() {
			let e = /* @__PURE__ */ new Set();
			s.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function te() {
			let e = {};
			return s.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function Z(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function Q() {
			m = void 0;
			let e = te();
			Z(v, e) || (v = e, i("update:widths", e));
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
		function $(e = !1) {
			let t = ie(globalThis.window === void 0 ? 0 : globalThis.window.innerWidth);
			(e || u.value !== t) && (u.value = t, i("update:breakpoint", t));
		}
		function ae() {
			$();
		}
		return C(Zi, {
			getHandleAttributes: B,
			getPaneStyle: F,
			hasBoundary: R,
			handleKeyDown: Y,
			handlePointerDown: K,
			handlePointerMove: q,
			isBoundaryActive: z,
			isHandleVisible: I,
			registerPane: X,
			finishPointerInteraction: J
		}), L(() => s.map((e) => e.id), async () => {
			await g(), ee(), re(), ne();
		}, {
			flush: "post",
			immediate: !0
		}), L(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), b(() => {
			$(!0), re(), ne(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", ae);
		}), y(() => {
			globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", ae), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), _ !== void 0 && globalThis.clearTimeout(_);
		}), (e, t) => (S(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [O(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-3c44b789"]]), ea = ["id"], ta = {
	key: 0,
	class: "mat-pane__separator"
}, na = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], ra = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = e, i = p(Zi, null), c = T(null), l = r(() => n.resizeLabel), u, d = r(() => i?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = r(() => !!i?.hasBoundary(n.id)), m = r(() => !!i?.isHandleVisible(n.id)), g = r(() => i?.getHandleAttributes(n.id) ?? {}), v = r(() => !!i?.isBoundaryActive(n.id));
		function x() {
			u?.(), u = void 0, i && (u = i.registerPane({
				element: c,
				id: n.id,
				resizeLabel: l
			}));
		}
		return b(x), L(() => n.id, x), y(() => u?.()), (n, r) => (S(), o(t, null, [s("div", h({
			ref_key: "root",
			ref: c
		}, n.$attrs, {
			id: e.id,
			class: "mat-pane",
			style: d.value
		}), [O(n.$slots, "default", {}, void 0, !0)], 16, ea), f.value ? (S(), o("div", ta, [m.value ? (S(), o("div", {
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
			onKeydown: r[0] ||= (t) => N(i).handleKeyDown(e.id, t),
			onLostpointercapture: r[1] ||= (t) => N(i).finishPointerInteraction(e.id, t, !1),
			onPointercancel: r[2] ||= (t) => N(i).finishPointerInteraction(e.id, t, !1),
			onPointerdown: r[3] ||= (t) => N(i).handlePointerDown(e.id, t),
			onPointermove: r[4] ||= (t) => N(i).handlePointerMove(e.id, t),
			onPointerup: r[5] ||= (t) => N(i).finishPointerInteraction(e.id, t, !0)
		}, null, 42, na)) : a("", !0)])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-7d81b20c"]]), ia = Symbol("mat-navigation-rail"), aa = ["aria-label"], oa = {
	key: 0,
	class: "mat-navigation-rail__header"
}, sa = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, ca = {
	key: 1,
	class: "mat-navigation-rail__content"
}, la = {
	key: 2,
	class: "mat-navigation-rail__end"
}, ua = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator(e) {
				return typeof e == "number" && Number.isFinite(e) && e >= 0 || typeof e == "string" && e.trim().length > 0;
			}
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
			validator(e) {
				if (typeof e == "number") return Number.isFinite(e) && e >= 0;
				if (typeof e != "string") return !1;
				let t = e.trim();
				return !t || /[;{}]/.test(t) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("block-size", t);
			}
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
			if (typeof e == "number") return Number.isFinite(e) && e >= 0;
			if (typeof e != "string") return !1;
			let t = e.trim();
			return !t || /[;{}]/.test(t) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("block-size", t);
		}
		function d(e) {
			return typeof e == "number" && Number.isFinite(e) && e >= 0 ? `${e}px` : typeof e == "string" && l(e) ? e.trim() : "0px";
		}
		function f(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let m = e, x = c, w = p(Z, te), E = r(() => m.orientation === "horizontal"), D = r(() => m.expanded), k = r(() => !E.value && m.layout === "modal"), A = r(() => !E.value && m.hideOnCollapse && !m.expanded), j = r(() => {
			if (!m.app) return null;
			if (typeof m.attach == "string") try {
				return document.querySelector(m.attach);
			} catch {
				return null;
			}
			return f(m.attach);
		}), M = r(() => m.expanded ? m.closeIcon : m.openIcon), P = r(() => m.expanded ? m.closeLabel : m.openLabel), F = r(() => ({
			"mat-navigation-rail-host--vertical": !E.value,
			"mat-navigation-rail-host--horizontal": E.value,
			"mat-navigation-rail-host--expanded": D.value,
			"mat-navigation-rail-host--collapsed": !m.expanded,
			[`mat-navigation-rail-host--${m.position}`]: !0,
			"mat-navigation-rail-host--modal": k.value,
			"mat-navigation-rail-host--hidden": A.value,
			"mat-navigation-rail-host--app": m.app
		})), I = r(() => ({
			"mat-navigation-rail--expanded": D.value,
			"mat-navigation-rail--collapsed": !m.expanded,
			"mat-navigation-rail--bar": E.value,
			"mat-navigation-rail--modal": k.value && m.expanded,
			"mat-navigation-rail--hidden": A.value,
			"mat-navigation-rail--app": m.app
		})), R = r(() => {
			if (m.width !== void 0) return { "--mat-navigation-rail-expanded-width": typeof m.width == "number" ? `${m.width}px` : m.width };
		}), B = r(() => m.app ? d(m.bottomPlaceholder) : "0px"), V = r(() => [R.value, { "--mat-navigation-rail-bottom-placeholder": B.value }]), H = T(null), U = T({
			blockSize: 0,
			inlineSize: 0
		}), W = r(() => ({
			blockSize: `${U.value.blockSize}px`,
			inlineSize: `${U.value.inlineSize}px`
		})), G;
		function K() {
			let e = H.value?.getBoundingClientRect();
			e && (U.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			});
		}
		async function q() {
			G?.disconnect(), G = void 0, await g(), !(!m.app || !H.value) && (G = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(K), G?.observe(H.value), K());
		}
		function J() {
			m.app && !j.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		function X(e) {
			return e !== void 0 && Object.is(m.modelValue, e);
		}
		function ee(e) {
			e === void 0 || Object.is(m.modelValue, e) || x("update:modelValue", e);
		}
		function Q() {
			x("update:expanded", !m.expanded);
		}
		function ne() {
			x("update:expanded", !1);
		}
		function re(e) {
			e.key === "Escape" && k.value && m.expanded && ne();
		}
		return C(ia, {
			expanded: D,
			isSelected: X,
			orientation: r(() => m.orientation),
			position: r(() => m.position),
			requestSelection: ee,
			useCursor: w.useCursor
		}), b(() => {
			window.addEventListener("keydown", re), J(), q();
		}), y(() => {
			window.removeEventListener("keydown", re), G?.disconnect();
		}), L([
			() => m.app,
			() => m.attach,
			() => m.bottomPlaceholder,
			() => m.expanded,
			() => m.hideOnCollapse,
			() => m.layout,
			() => m.orientation,
			() => m.width
		], () => {
			J(), q();
		}), (r, c) => (S(), o(t, null, [e.app && j.value && e.placeholder ? (S(), o("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(W.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (S(), i(n, {
			to: j.value ?? "body",
			disabled: !e.app
		}, [!e.app || j.value ? (S(), o("div", {
			key: 0,
			class: _(["mat-navigation-rail-host", F.value]),
			style: v(R.value)
		}, [k.value && e.expanded ? (S(), o("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": e.closeLabel,
			onClick: ne
		}, null, 8, aa)) : a("", !0), s("nav", h({
			ref_key: "railElement",
			ref: H
		}, r.$attrs, {
			class: ["mat-navigation-rail", I.value],
			style: V.value
		}), [
			E.value ? a("", !0) : (S(), o("div", oa, [
				A.value ? a("", !0) : O(r.$slots, "header", {
					key: 0,
					expanded: e.expanded
				}, void 0, !0),
				e.collapsible ? (S(), i(Y, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": e.expanded,
					"aria-label": P.value,
					"focus-ring": !1,
					"use-cursor": N(w).useCursor,
					onClick: Q
				}, {
					default: z(() => [u(Oe, {
						icon: M.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : a("", !0),
				r.$slots.fab && !A.value ? (S(), o("div", sa, [O(r.$slots, "fab", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
			])),
			A.value ? a("", !0) : (S(), o("div", ca, [s("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${e.alignment}`]) }, [O(r.$slots, "default", {
				expanded: D.value,
				orientation: e.orientation
			}, void 0, !0)], 2)])),
			r.$slots.end && !A.value && !E.value ? (S(), o("div", la, [O(r.$slots, "end", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
		], 16)], 6)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-3d033b24"]]), da = { class: "mat-navigation-rail-item__indicator" }, fa = { class: "mat-navigation-rail-item__icon-wrap" }, pa = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, ma = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, ha = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, l = I(), u = p(Z, te), d = p(ia, null), f = r(() => d?.expanded.value ?? !1), m = r(() => d?.orientation.value === "horizontal"), g = r(() => d?.position.value ?? "start"), _ = r(() => f.value), v = r(() => d?.isSelected(n.value) ?? !1), y = r(() => !!(n.icon || l.icon)), b = r(() => ({
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
		return (t, n) => (S(), i(Y, h(t.$attrs, {
			class: ["mat-navigation-rail-item", b.value],
			"aria-current": v.value ? "page" : void 0,
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			"use-cursor": N(u).useCursor,
			onClick: x
		}), {
			default: z(() => [s("span", da, [s("span", fa, [N(l).icon ? O(t.$slots, "icon", {
				key: 0,
				selected: v.value
			}, void 0, !0) : y.value ? (S(), i(Oe, {
				key: 1,
				fill: +!!v.value,
				icon: e.icon,
				class: "mat-navigation-rail-item__icon",
				"aria-hidden": "true"
			}, null, 8, ["fill", "icon"])) : a("", !0)]), _.value ? (S(), o("span", pa, [O(t.$slots, "default", {}, void 0, !0)])) : a("", !0)]), _.value ? a("", !0) : (S(), o("span", ma, [O(t.$slots, "default", {}, void 0, !0)]))]),
			_: 3
		}, 16, [
			"class",
			"aria-current",
			"disabled",
			"href",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-59b42c01"]]), ga = /* @__PURE__ */ new WeakMap();
function _a(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function va(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = _a(t.value), i = new IntersectionObserver((t, r) => {
		let i = ga.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), ga.delete(e));
	}, r);
	ga.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function ya(e) {
	let t = ga.get(e);
	t && (t.observer.unobserve(e), ga.delete(e));
}
var ba = {
	mounted: va,
	updated(e, t) {
		ga.has(e) && (ya(e), va(e, t));
	},
	unmounted: ya
}, xa = te, Sa = null;
function Ca(e, t) {
	xa = e, Sa = t;
}
function wa() {
	return xa;
}
function Ta() {
	return Sa;
}
//#endregion
//#region src/theme.js
var Ea = "#20a6fc", Da = "(prefers-color-scheme: dark)";
function Oa(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function ka(e) {
	if (!pe.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function Aa(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function ja(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function Ma(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function Na(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? Ea, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	Oa(t), Ma(n), ka(r), Aa(i), ja(a);
	let o = T(t), s = T(ye(n)), c = T(r), l = T(i), u = T("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(Da)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = be({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(me).forEach(([t, n]) => {
			a.style.setProperty(`--mat-sys-color-${n}`, q(e[t]));
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
		Oa(e), o.value = e, y(), g();
	}
	function x(e) {
		Ma(e), s.value = ye(e), g();
	}
	function S(e) {
		ka(e), c.value = e, g();
	}
	function C(e) {
		Aa(e), l.value = e, g();
	}
	function E() {
		p = !0, v(), Object.values(me).forEach((e) => {
			a.style.removeProperty(`--mat-sys-color-${e}`);
		}), a.removeAttribute?.("data-mat-theme"), a.style.removeProperty("color-scheme");
	}
	return y(), g(), {
		mode: w(o),
		resolvedMode: w(u),
		seedColor: w(s),
		schemeVariant: w(c),
		contrastLevel: w(l),
		target: a,
		setMode: b,
		setSeedColor: x,
		setSchemeVariant: S,
		setContrastLevel: C,
		dispose: E
	};
}
//#endregion
//#region src/plugin.js
var Pa = [
	[
		"MatBtn",
		"mat-btn",
		mt
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		_t
	],
	[
		"MatFab",
		"mat-fab",
		Ct
	],
	[
		"MatIcon",
		"mat-icon",
		Oe
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		Tt
	],
	[
		"MatCard",
		"mat-card",
		Nt
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		Ft
	],
	[
		"MatCardContent",
		"mat-card-content",
		Lt
	],
	[
		"MatCardActions",
		"mat-card-actions",
		zt
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		Ot
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		Mt
	],
	[
		"MatCardMedia",
		"mat-card-media",
		At
	],
	[
		"MatList",
		"mat-list",
		qt
	],
	[
		"MatListGroup",
		"mat-list-group",
		sn
	],
	[
		"MatListItem",
		"mat-list-item",
		rn
	],
	[
		"MatDivider",
		"mat-divider",
		mn
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		bn
	],
	[
		"MatRadio",
		"mat-radio",
		Sn
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		Tn
	],
	[
		"MatSwitch",
		"mat-switch",
		En
	],
	[
		"MatSlider",
		"mat-slider",
		tr
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		ar
	],
	[
		"MatTextField",
		"mat-text-field",
		wr
	],
	[
		"MatTextarea",
		"mat-textarea",
		Tr
	],
	[
		"MatInputBase",
		"mat-input-base",
		or
	],
	[
		"MatMenu",
		"mat-menu",
		Or
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		Ar
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		Nr
	],
	[
		"MatDialog",
		"mat-dialog",
		Gr
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		Qr
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		$r
	],
	[
		"MatHover",
		"mat-hover",
		ke
	],
	[
		"MatContainer",
		"mat-container",
		ti
	],
	[
		"MatSpacer",
		"mat-spacer",
		ni
	],
	[
		"MatLoader",
		"mat-loader",
		Ni
	],
	[
		"MatTooltip",
		"mat-tooltip",
		lt
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		Gi
	],
	[
		"MatToolbar",
		"mat-toolbar",
		Xi
	],
	[
		"MatPanes",
		"mat-panes",
		$i
	],
	[
		"MatPane",
		"mat-pane",
		ra
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		ua
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		ha
	]
];
function Fa(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function Ia(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? te.iconClass;
}
function La(e, t) {
	let n = e[t];
	if (n === void 0) return ee[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function Ra(e) {
	let t = e.tooltip;
	if (t === void 0) return ee;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi tooltip 必须是对象");
	return Object.freeze({
		openDelay: La(t, "openDelay"),
		skipDelayDuration: La(t, "skipDelayDuration")
	});
}
function za(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: Ia(e),
		tooltip: Ra(e),
		useCursor: Fa(e, "useCursor")
	}), n = Na(e.theme);
	return {
		theme: n,
		install(e) {
			Pa.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r);
			}), e.directive("intersection", ba), e.provide(Z, t), e.provide(Ce, n), Ca(t, n);
		}
	};
}
function Ba() {
	let e = p(Ce, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mdu-ui 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var Va = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, Ha = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		C(Z, wa());
		let s = Ta();
		s && C(Ce, s);
		let c = T(!0), d = j(n.cancelValue), f = T(n.options.promptConfig?.defaultValue ?? ""), p = r(() => !!n.options.promptConfig), m = r(() => n.options.promptConfig?.required ?? !1), g = r(() => m.value && f.value.trim().length === 0), _ = r(() => {
			let e = { ...n.options };
			return delete e.actions, delete e.ariaLabel, delete e.promptConfig, n.options.promptConfig && delete e.content, e;
		});
		function v(e, t) {
			e.disabled || p.value && t === n.options.actions.length - 1 && g.value || (d.value = p.value && t === n.options.actions.length - 1 ? f.value : e.value, c.value = !1);
		}
		function y() {
			n.onClosed(d.value);
		}
		return (n, r) => (S(), i(Gr, h({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: z(() => [u(ni), (S(!0), o(t, null, D(e.options.actions, (t, n) => (S(), i(mt, {
				key: n,
				color: t.color,
				disabled: t.disabled || p.value && n === e.options.actions.length - 1 && g.value,
				variant: t.variant,
				onClick: (e) => v(t, n)
			}, {
				default: z(() => [l(M(t.text), 1)]),
				_: 2
			}, 1032, [
				"color",
				"disabled",
				"variant",
				"onClick"
			]))), 128))]),
			default: z(() => [p.value ? (S(), o(t, { key: 0 }, [e.options.content ? (S(), o("p", Va, M(e.options.content), 1)) : a("", !0), u(wr, {
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
}), [["__scopeId", "data-v-217b4d5a"]]), Ua = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], Wa = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], Ga = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function Ka(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function qa() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function Ja(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function Ya(e) {
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
function Xa(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !Ua.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function Za(e) {
	if (Ja(e), Wa.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), Ga.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !Ka(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(Xa),
		attach: Ya(e.attach)
	};
	return [
		...Wa,
		...Ga,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function Qa(e, t) {
	try {
		qa();
		let n = Za(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				E(f(Ha, {
					cancelValue: t,
					options: n,
					onClosed(t) {
						E(null, i), i.remove(), e(t);
					}
				}), i);
			} catch (e) {
				E(null, i), i.remove(), r(e);
			}
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
function $a(e = {}) {
	return Qa(e, void 0);
}
function eo(e = {}) {
	try {
		if (Ja(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return Qa({
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
function to(e = {}) {
	try {
		Ja(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return Qa({
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
function no(e = {}) {
	try {
		Ja(e);
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
		return Qa({
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
var ro = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		C(Z, wa()), C(Pi, !0);
		let n = Ta();
		n && C(Ce, n);
		let a = T(!0), o = r(() => {
			let e = { ...t.options };
			return delete e.onAction, e;
		});
		function s() {
			t.onClosed();
		}
		function c() {
			t.options.onAction?.();
		}
		return (e, t) => (S(), i(Gi, h({
			modelValue: a.value,
			"onUpdate:modelValue": t[0] ||= (e) => a.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), io = [
	"left",
	"center",
	"right"
], ao = null;
function oo() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function so(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function co(e) {
	if (so(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !io.includes(e.position)) throw TypeError("snackbar position 无效");
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
function lo() {
	return ao?.isConnected ? ao : (ao = document.createElement("div"), ao.dataset.matSnackbarHost = "", document.body.append(ao), ao);
}
function uo() {
	!ao || ao.childNodes.length > 0 || (ao.remove(), ao = null);
}
function fo(e) {
	try {
		oo();
		let t = co(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = ao;
				t && E(null, t), e(), Bi(i), uo();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = ao;
				t && E(null, t), n(e), Bi(i), uo();
			}
			i = { activate() {
				try {
					let e = lo();
					E(f(ro, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, Ri(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var po = fo;
//#endregion
export { ba as Intersection, Qr as MatBottomSheet, mt as MatBtn, _t as MatBtnGroup, Nt as MatCard, Ft as MatCardActionArea, zt as MatCardActions, Lt as MatCardContent, Ot as MatCardHeadline, At as MatCardMedia, Mt as MatCardSubhead, bn as MatCheckbox, ti as MatContainer, Gr as MatDialog, mn as MatDivider, Ct as MatFab, ke as MatHover, Oe as MatIcon, or as MatInputBase, qt as MatList, sn as MatListGroup, rn as MatListItem, Ni as MatLoader, Or as MatMenu, Ar as MatMenuGroup, Nr as MatMenuItem, ua as MatNavigationRail, ha as MatNavigationRailItem, ra as MatPane, $i as MatPanes, Sn as MatRadio, Tn as MatRadioGroup, ar as MatRangeSlider, $r as MatSideSheet, tr as MatSlider, Gi as MatSnackbar, ni as MatSpacer, Tt as MatSplitBtn, En as MatSwitch, wr as MatTextField, Tr as MatTextarea, Xi as MatToolbar, lt as MatTooltip, eo as alert, to as confirm, za as createMatUi, $a as dialog, no as prompt, fo as snackbar, po as toast, Ba as useMatTheme };
