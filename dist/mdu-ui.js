import { Comment as e, Fragment as t, Teleport as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, getCurrentInstance as d, h as f, inject as p, isVNode as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onActivated as y, onBeforeUnmount as b, onDeactivated as x, onMounted as S, onUpdated as C, openBlock as w, provide as T, reactive as E, readonly as D, ref as O, render as k, renderList as A, renderSlot as j, resolveDynamicComponent as M, shallowReactive as N, shallowRef as P, toDisplayString as F, unref as I, useAttrs as L, useId as R, useSlots as z, watch as B, watchEffect as V, withCtx as H, withModifiers as U } from "vue";
import { Hct as W, SchemeExpressive as G, SchemeNeutral as K, SchemeTonalSpot as q, SchemeVibrant as ee, argbFromHex as te, hexFromArgb as J } from "@material/material-color-utilities";
//#region \0plugin-vue:export-helper
var Y = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, X = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-04ce13e2"]]), ne = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		return (t, r) => (w(), i(X, h(t.$attrs, {
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
}), [["__scopeId", "data-v-04ffd7cb"]]), Z = Object.freeze({
	openDelay: 0,
	skipDelayDuration: 0
}), Q = Object.freeze({
	iconClass: "material-symbols-outlined",
	tooltip: Z,
	useCursor: !1
}), re = Symbol("mdu-ui-options"), ie = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], ae = ["round", "square"], oe = [
	"button",
	"submit",
	"reset"
], se = [
	"primary",
	"secondary",
	"tertiary",
	"error"
];
function $(e) {
	return e === void 0 || se.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var ce = Object.freeze({
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
}), le = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function ue(e) {
	return typeof e == "string" && (Object.hasOwn(ce, e) || le.test(e));
}
function de(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function fe(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function pe(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function me(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function he(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var ge = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], _e = {
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
}, ve = {
	"tonal-spot": q,
	neutral: K,
	vibrant: ee,
	expressive: G
}, ye = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], be = 64, xe = /* @__PURE__ */ new Map();
function Se(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function Ce({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = ve[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(W.fromInt(te(Se(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function we(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, J(e[t])])));
}
function Te(e, t = "tonal-spot", n = 0) {
	let r = Se(e), i = `${r}|${t}|${n}|2025|phone`, a = xe.get(i);
	if (a) return xe.delete(i), xe.set(i, a), a;
	let o = Object.freeze({
		light: we(Ce({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), ye),
		dark: we(Ce({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), ye)
	});
	if (xe.set(i, o), xe.size > be) {
		let e = xe.keys().next().value;
		xe.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var Ee = Symbol("mdu-ui-theme"), De = "tonal-spot", Oe = 0;
function ke(e) {
	let t = p(Ee, null), n = r(() => I(e) !== void 0);
	return {
		colorStyle: r(() => {
			let n = I(e);
			if (!n || !$(n)) return {};
			if (se.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			let r = Te(n, t?.schemeVariant.value ?? De, t?.contrastLevel.value ?? Oe);
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
var Ae = ["src"], je = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
			validator: ue
		},
		fill: {
			type: Number,
			default: 0,
			validator: fe
		},
		weight: {
			type: Number,
			default: 400,
			validator: pe
		},
		grade: {
			type: Number,
			default: 0,
			validator: me
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: he
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
			validator: de
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = e, a = p(re, Q), { colorStyle: s, hasExplicitColor: c } = ke(r(() => n.color)), u = r(() => n.iconClass ?? a.iconClass), d = r(() => n.icon !== void 0), f = r(() => ce[n.size]?.fontSize ?? n.size), m = r(() => n.opticalSize ?? ce[n.size]?.opticalSize ?? 24), g = r(() => ({
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
			}, null, 8, Ae))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-a72d28ee"]]), Me = /*@__PURE__*/ Object.assign({
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
		let n = e, i = t, o = z(), s = d()?.vnode.props ?? {}, c = Object.prototype.hasOwnProperty.call(s, "modelValue") || Object.prototype.hasOwnProperty.call(s, "model-value"), l = O(!1), u = O(null), f = P(null), p = r(() => c ? n.modelValue : u.value), m, h = null;
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
		function y(e, t) {
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
		function x() {
			y(!0, n.openDelay);
		}
		function w() {
			y(!1, n.closeDelay);
		}
		function T(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? T(e.value) : "$el" in e ? T(e.$el) : null : null;
		}
		function E() {
			if (typeof n.target != "string") return T(n.target);
			try {
				return T(document.querySelector(n.target));
			} catch {
				return null;
			}
		}
		function D() {
			h &&= (h(), null);
		}
		function k() {
			let e = E();
			e !== f.value && (D(), f.value = e, e && (e.addEventListener("mouseenter", x), e.addEventListener("mouseleave", w), h = () => {
				e.removeEventListener("mouseenter", x), e.removeEventListener("mouseleave", w);
			}));
		}
		let A = {
			onMouseenter: x,
			onMouseleave: w
		};
		return B(() => n.disabled, (e, t) => {
			if (t && !e) {
				if (c) {
					i("update:modelValue", l.value);
					return;
				}
				u.value = l.value, i("update:modelValue", l.value);
			}
		}), B(E, k, { flush: "sync" }), S(k), C(k), b(() => {
			g(), D();
		}), (e, t) => I(o).default ? j(e.$slots, "default", {
			key: 0,
			isHovering: p.value,
			props: A
		}) : a("", !0);
	}
}), Ne = Symbol("mat-app-root");
function Pe() {
	let e = p(Ne, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var Fe = [
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
], Ie = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function Le(e) {
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
function Re(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function ze(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function Be(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function Ve(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function He(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: Re(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: ze(t, n, r)
	};
}
function Ue(e) {
	return [
		e,
		Ie[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== Ie[e])
	];
}
function We(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function Ge(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function Ke(e, t, n, r, i, a, o, s) {
	let c = He(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: Be(c.left, a, l),
		top: Be(c.top, a, u)
	}, f = We(d, r);
	return Ge(f, n) || s.some((e) => Ge(f, Le(e))) ? null : d;
}
function qe({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = Le(i), c = Le(a), [l, u = "center"] = (Fe.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = Ve(l, s, o, r, t), m = Ie[l], h = Ve(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = Ue(g), b = e.map((e) => Le(e)), x = y.find((e) => Ve(e, s, o, r, t) >= f && Ke(e, d, s, c, o, r, t, b)) ?? y.find((e) => Ke(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = He(x, d, s, c, t);
	return {
		left: Math.round(Be(C.left, r, _)),
		location: S,
		top: Math.round(Be(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var Je = null, Ye = /* @__PURE__ */ new WeakMap();
function Xe(e) {
	Je && Je !== e && Je.close(), Je = e;
}
function Ze(e) {
	Je === e && (Je = null);
}
function Qe(e, t) {
	e && Ye.set(e, {
		owner: t,
		expiresAt: Infinity
	});
}
function $e(e, t, n) {
	if (!e) return;
	let r = Ye.get(e);
	if (!(!r || r.owner !== t)) {
		if (n <= 0) {
			Ye.delete(e);
			return;
		}
		r.expiresAt = Date.now() + n;
	}
}
function et(e, t) {
	if (!e) return !1;
	let n = Ye.get(e);
	return !n || n.owner === t ? !1 : n.expiresAt < Date.now() ? (Ye.delete(e), !1) : !0;
}
//#endregion
//#region src/components/toolbar-overlay.js
var tt = /* @__PURE__ */ new Map(), nt = /* @__PURE__ */ new Set(), rt = 0;
function it(e) {
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
function at() {
	nt.forEach((e) => e());
}
function ot() {
	tt.forEach((e, t) => {
		e.element.isConnected || tt.delete(t);
	});
}
function st(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = rt;
	rt += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return tt.set(n, r), at(), {
		unregister() {
			i && (i = !1, tt.delete(n), at());
		},
		update() {
			i && at();
		}
	};
}
function ct() {
	return ot(), [...tt.values()].flatMap((e) => {
		try {
			return [it(e.getRect())];
		} catch {
			return [];
		}
	});
}
function lt(e = window.innerHeight) {
	ot();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...tt.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - it(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function ut(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return nt.add(e), e(), () => {
		nt.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var dt = ["id", "data-location"], ft = 1500, pt = 150, mt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return Fe.includes(e);
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
		let u = e, f = c, m = L(), _ = z(), v = d(), T = p(re, Q), E = p(Ne, null), D = O(null), k = P(null), A = { value: k }, M = P(null), N = O(!1), V = O(null), H = O(!1), U = O(!1), W = O(!1), G = O("closed"), K = O("top"), q = O({}), ee = O(!1), te = `${R().replace(/[^\w-]/g, "-")}-tooltip`, J = r(() => typeof m.id == "string" ? m.id : te), Y = r(() => u.content === void 0 ? !!_.default : u.content.length > 0), X = r(() => !!_.activator), ne = v?.vnode.props ?? {}, Z = Object.prototype.hasOwnProperty.call(ne, "modelValue") || Object.prototype.hasOwnProperty.call(ne, "model-value"), ie, ae, oe, se, $ = !1, ce, le, ue = null, de = null, fe = null, pe = null, me = null, he = !1, ge = !0, _e = !1, ve = !1, ye = !1, be = null, xe = { close: at }, Se = Symbol("mat-tooltip-delay-group-owner");
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
			return X.value ? Ee() : Te();
		}
		function Oe() {
			return ke() ? typeof u.attach == "string" ? we(u.attach) : Ce(u.attach) : Pe() || (E?.rootElement.value?.contains(k.value) && E.freeLayer.value ? E.freeLayer.value : document.body);
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
		function Pe() {
			let e = k.value;
			for (; e;) {
				if (je(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function Fe() {
			let e = u.openDelay ?? T.tooltip.openDelay, t = typeof e == "string" ? Number(e) : e;
			return !Number.isFinite(t) || t < 0 ? 0 : t;
		}
		function Ie() {
			return k.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function Le() {
			ae !== void 0 && (window.clearTimeout(ae), ae = void 0);
		}
		function Re() {
			ie !== void 0 && (window.clearTimeout(ie), ie = void 0);
		}
		function ze() {
			oe !== void 0 && (window.clearTimeout(oe), oe = void 0);
		}
		function Be() {
			ce !== void 0 && (window.cancelAnimationFrame(ce), ce = void 0);
		}
		function Ve() {
			Be(), U.value && (ce = window.requestAnimationFrame(() => {
				if (ce = void 0, U.value) {
					if (k.value && !k.value.isConnected) {
						it({ immediate: !0 });
						return;
					}
					Ve();
				}
			}));
		}
		function He() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Ue(e, t) {
			if (ze(), He()) {
				t();
				return;
			}
			oe = window.setTimeout(() => {
				oe = void 0, t();
			}, e);
		}
		function We() {
			se !== void 0 && ($ ? window.cancelAnimationFrame(se) : window.clearTimeout(se), se = void 0, $ = !1);
		}
		function Ge() {
			pe && (me === null ? pe.removeAttribute("aria-describedby") : pe.setAttribute("aria-describedby", me), pe = null, me = null);
		}
		function Ke() {
			let e = k.value;
			if (!U.value || !e || pe === e) return;
			Ge(), pe = e, me = e.getAttribute("aria-describedby");
			let t = (me ?? "").split(/\s+/).filter(Boolean);
			t.includes(J.value) || t.push(J.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function Je() {
			We(), le?.disconnect(), le = void 0, de &&= (de(), null), fe &&= (fe(), null);
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
			] : ct(), a = qe({
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
		function tt() {
			if (!U.value || se !== void 0) return;
			let e = () => {
				se = void 0, $ = !1, Ye();
			};
			if (typeof window.requestAnimationFrame == "function") {
				$ = !0, se = window.requestAnimationFrame(e);
				return;
			}
			se = window.setTimeout(e, 0);
		}
		function nt() {
			de || (window.addEventListener("resize", tt), document.addEventListener("scroll", tt, !0), de = () => {
				window.removeEventListener("resize", tt), document.removeEventListener("scroll", tt, !0);
			}, fe = ut(tt), typeof ResizeObserver < "u" && (le = new ResizeObserver(tt), le.observe(k.value), le.observe(V.value)));
		}
		function rt() {
			H.value = !1, G.value = "closed", U.value = !1, W.value = !1, M.value = null, N.value = !1;
		}
		function it({ immediate: e = !1 } = {}) {
			if (Le(), Re(), Be(), Je(), Ge(), Ze(xe), !H.value) {
				rt();
				return;
			}
			if (!(!e && G.value === "closing")) {
				if (e) {
					ze(), rt();
					return;
				}
				U.value = !1, G.value = "closing", Ue(pt, rt);
			}
		}
		function at() {
			Z && (ee.value = !0, f("update:modelValue", !1)), it();
		}
		function ot() {
			ye || (ye = !0, console.warn(X.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function st({ warn: e = !0 } = {}) {
			let t = De();
			if (!t && U.value && it({ immediate: !0 }), t === k.value) {
				!t && Y.value && e && ot();
				return;
			}
			let n = k.value !== null;
			Ge(), bt(), k.value = t, ye = !1, !t && Y.value && e && ot(), xt(), n && U.value && at();
		}
		function lt() {
			if (Re(), Z || U.value || ee.value || !Y.value) return;
			let e = et(Ie(), Se) ? 0 : Fe();
			if (e === 0) {
				St();
				return;
			}
			ae === void 0 && (ae = window.setTimeout(() => {
				ae = void 0, St();
			}, e));
		}
		function mt() {
			Le(), !(Z || !U.value || _e || ve) && ie === void 0 && (ie = window.setTimeout(() => {
				ie = void 0, at();
			}, ft));
		}
		function ht() {
			if (_e || ve) {
				lt();
				return;
			}
			$e(be, Se, T.tooltip.skipDelayDuration), mt();
		}
		function gt(e) {
			_e = e, ht();
		}
		function _t() {
			ve = !0, ht();
		}
		function vt(e) {
			k.value?.contains(e.relatedTarget) || (ve = !1, ht());
		}
		function yt(e) {
			e.key === "Escape" && (e.preventDefault(), at());
		}
		function bt() {
			ue && (ue(), ue = null, _e = !1, ve = !1);
		}
		function xt() {
			let e = k.value;
			e && (e.addEventListener("keydown", yt), !Z && Y.value && (e.addEventListener("focusin", _t), e.addEventListener("focusout", vt)), ue = () => {
				e.removeEventListener("keydown", yt), e.removeEventListener("focusin", _t), e.removeEventListener("focusout", vt);
			});
		}
		async function St() {
			if (!he || !ge || ee.value || !Y.value) return;
			if (st({ warn: !0 }), !k.value) {
				at();
				return;
			}
			let e = Oe();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), at();
				return;
			}
			Le(), Re(), ze(), Xe(xe), be = Ie(), Qe(be, Se), M.value = e, N.value = e === E?.freeLayer.value, K.value = u.location, q.value = {
				left: "0px",
				top: "0px"
			}, W.value = !1, G.value = "opening", H.value = !0, U.value = !0, await g(), !(!he || !ge || !U.value) && (Ke(), Ye(), nt(), Ve());
		}
		return S(async () => {
			he = !0, st({ warn: !1 }), await g(), he && (st({ warn: !1 }), Z && u.modelValue && St());
		}), C(() => {
			st({ warn: !1 }), U.value && tt();
		}), y(() => {
			ge || (ge = !0, st({ warn: !1 }), Z && u.modelValue && St());
		}), x(() => {
			ge = !1, ze(), Be(), bt(), it({ immediate: !0 });
		}), b(() => {
			he = !1, ze(), Be(), bt(), U.value && it({ immediate: !0 });
		}), B(() => u.modelValue, (e) => {
			if (!(!he || !ge || !Z)) {
				if (e) {
					ee.value = !1, St();
					return;
				}
				ee.value = !1, it();
			}
		}), B([() => u.content, () => u.target], async () => {
			await g();
			let e = k.value;
			st({ warn: !1 }), k.value === e && (bt(), xt()), Y.value || at();
		}), B(() => u.attach, async () => {
			if (!U.value) return;
			let e = Oe();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), at();
				return;
			}
			M.value = e, N.value = e === E?.freeLayer.value, await g(), tt();
		}), B(() => u.location, () => {
			U.value && tt();
		}), B(J, () => {
			!U.value || !pe || (Ge(), Ke());
		}), E && B(E.publicContext.layout, tt), (r, c) => (w(), o(t, null, [
			!I(Z) && Y.value ? (w(), i(Me, {
				key: 0,
				target: A,
				"onUpdate:modelValue": gt
			})) : a("", !0),
			X.value || !e.target ? (w(), o("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: D,
				class: "mat-tooltip__activator"
			}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			H.value && M.value ? (w(), i(n, {
				key: 2,
				to: M.value
			}, [s("span", h(r.$attrs, {
				id: J.value,
				ref_key: "tooltipElement",
				ref: V,
				class: ["mat-tooltip", [`mat-tooltip--${G.value}`, {
					"mat-tooltip--app-root": N.value,
					"mat-tooltip--positioned": W.value
				}]],
				"data-location": K.value,
				style: [q.value, r.$attrs.style],
				role: "tooltip"
			}), [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))], 16, dt)], 8, ["to"])) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-b9f8f587"]]), ht = Symbol("mdu-ui-button-group"), gt = Symbol("mdu-ui-split-button");
//#endregion
//#region src/components/use-button.js
function _t(e, t) {
	let n = p(re, Q), i = p(ht, null), a = p(gt, null), o = r(() => a?.size.value ?? e.size ?? i?.size.value ?? "small"), s = r(() => a ? "round" : e.shape ?? i?.shape.value ?? "round"), c = r(() => a?.variant.value ?? e.variant), l = r(() => a?.color.value ?? e.color ?? i?.color.value), u = r(() => e.disabled || !!a?.disabled.value || !!i?.disabled.value), d = r(() => !!(i && i.selection.value !== "none")), f = r(() => a?.role === "trailing" ? a.expanded.value : d.value ? i.isSelected(e.value) : e.selected), m = r(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = ke(l);
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
var vt = {
	key: 2,
	class: "mat-btn__label"
}, yt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return ie.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return ae.includes(e);
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
				return oe.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let s = e, c = n, u = L(), d = z(), f = O(null), p = R(), { colorStyle: g, effectiveDisabled: _, effectiveSelected: v, effectiveShape: y, effectiveSize: b, effectiveToggle: x, effectiveVariant: C, handleClick: T, hasExplicitColor: E, split: D, useCursor: k } = _t(s, c), A = r(() => x.value && C.value !== "text"), M = r(() => A.value && v.value), N = r(() => s.icon === !0 || typeof s.icon == "string" && s.icon.trim().length > 0), P = r(() => s.fill === void 0 ? +!!M.value : s.fill);
		function B(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : m(e) ? e.type === t && Array.isArray(e.children) ? B(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? B(e.children) : [] : []).join("").trim();
		}
		let U = r(() => s.icon === !0 ? B(d.default?.() ?? []) : ""), W = r(() => typeof s.icon == "string" ? s.icon.trim() : U.value), G = r(() => u["aria-label"] ?? s.label), K = r(() => N.value ? u.title ?? s.label : void 0), q = r(() => !N.value && (s.prefix !== void 0 || !!d.prefix)), ee = r(() => !N.value && (s.suffix !== void 0 || !!d.suffix)), te = r(() => M.value && !!d.selected), J = r(() => ({
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
		}), (n, r) => (w(), i(ne, h({
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
				N.value ? (w(), i(je, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: P.value,
					"optical-size": J.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [l(F(W.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : a("", !0),
				q.value ? (w(), i(je, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: P.value,
					"optical-size": J.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [e.prefix === void 0 ? j(n.$slots, "prefix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				N.value ? a("", !0) : (w(), o("span", vt, [te.value ? j(n.$slots, "selected", { key: 0 }, void 0, !0) : j(n.$slots, "default", { key: 1 }, void 0, !0)])),
				ee.value ? (w(), i(je, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: P.value,
					"optical-size": J.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: H(() => [e.suffix === void 0 ? j(n.$slots, "suffix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				N.value && K.value ? (w(), i(mt, {
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
}), [["__scopeId", "data-v-ef9b33c9"]]), bt = ["data-scrollable"], xt = { class: "mat-app-root__content" }, St = { class: "mat-app-root__overlay" }, Ct = { class: "mat-app-root__bottom-stack" }, wt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		if (p(Ne, null)) throw Error("MatAppRoot 不允许嵌套");
		let a = L(), c = O(null), l = O(null), u = O(null), d = O(null), f = O(null), m = O(null), _ = E({
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
		}), v = D(_), y = E({
			top: 0,
			bottom: 0,
			start: 0,
			end: 0
		}), x = r(() => ({
			"mat-app-root--document": i.fillViewport && !i.scrollable,
			"mat-app-root--fill-viewport": i.fillViewport,
			"mat-app-root--scrollable": i.scrollable
		})), C = r(() => [a.style, {
			"--mat-app-root-padding-top": `${_.padding.top}px`,
			"--mat-app-root-padding-bottom": `${_.padding.bottom}px`,
			"--mat-app-root-padding-start": `${_.padding.start}px`,
			"--mat-app-root-padding-end": `${_.padding.end}px`,
			"--mat-app-root-safe-area-top": `${y.top}px`,
			"--mat-app-root-safe-area-bottom": `${y.bottom}px`,
			"--mat-app-root-safe-area-start": `${y.start}px`,
			"--mat-app-root-safe-area-end": `${y.end}px`
		}]), k = [], A = !1, M, N, P = !1;
		function F(e) {
			let t = Number.parseFloat(e);
			return Number.isFinite(t) ? Math.max(0, t) : 0;
		}
		function I() {
			if (!m.value) return {
				top: 0,
				bottom: 0,
				start: 0,
				end: 0
			};
			let e = window.getComputedStyle(m.value), t = window.getComputedStyle(c.value).direction, n = F(e.paddingLeft), r = F(e.paddingRight);
			return {
				top: F(e.paddingTop),
				bottom: F(e.paddingBottom),
				start: t === "rtl" ? r : n,
				end: t === "rtl" ? n : r
			};
		}
		function R(e, t, n) {
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
		function z(e, t, n, r) {
			return e === "top" ? Math.max(0, t.bottom - n.top) : e === "bottom" ? Math.max(0, n.bottom - t.top) : e === "start" ? r === "rtl" ? Math.max(0, n.right - t.left) : Math.max(0, t.right - n.left) : r === "rtl" ? Math.max(0, t.right - n.left) : Math.max(0, n.right - t.left);
		}
		function V(e, t) {
			return e === "top" || e === "bottom" ? {
				start: t.start,
				end: t.end
			} : {
				start: t.top,
				end: t.bottom
			};
		}
		function H() {
			if (!A || !c.value) return;
			let e = c.value.getBoundingClientRect(), r = Math.max(0, Number(e.width) || 0), a = Math.max(0, Number(e.height) || 0), o = i.fillViewport && !i.scrollable ? Math.max(0, Number(window.innerHeight) || a) : a, s = n.find((e) => r <= e.max) ?? n.at(-1), l = I(), u = { ...l }, d = {
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
			}, f = R(e, r, o), p = window.getComputedStyle(c.value).direction;
			Object.assign(y, l), k.forEach((e) => {
				if (!e.active) return;
				let t = V(e.edge, u), n = e.insets;
				n.start = t.start, n.end = t.end, d[e.edge].startInset = Math.max(d[e.edge].startInset, t.start), d[e.edge].endInset = Math.max(d[e.edge].endInset, t.end);
				let r = e.element.getBoundingClientRect(), i = z(e.edge, r, f, p);
				u[e.edge] = Math.max(u[e.edge], i);
			}), Object.assign(_.size, {
				width: r,
				height: o
			}), Object.assign(_.padding, u), Object.assign(_.content, {
				width: Math.max(0, r - u.start - u.end),
				height: Math.max(0, o - u.top - u.bottom)
			}), _.breakpoint = s.name, Object.assign(_.breakpointRange, {
				min: s.min,
				max: s.max
			}), t.forEach((e) => {
				Object.assign(_.edges[e], {
					size: u[e],
					...d[e]
				});
			});
		}
		function U() {
			if (!A || P) return;
			P = !0;
			let e = () => {
				P = !1, N = void 0, H();
			};
			if (typeof window.requestAnimationFrame == "function") {
				N = window.requestAnimationFrame(e);
				return;
			}
			N = window.setTimeout(e, 0);
		}
		function W({ edge: e, element: n } = {}) {
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
			return k.push(i), M?.observe(n), U(), Object.freeze({
				insets: D(r),
				unregister: () => {
					i.active && (i.active = !1, M?.unobserve?.(n), U());
				},
				update: () => {
					i.active && U();
				}
			});
		}
		let G = Object.freeze({
			layout: v,
			registerEdge: W
		});
		function K() {
			let e = c.value?.getBoundingClientRect() ?? {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			};
			return i.fillViewport && !i.scrollable ? {
				top: 0,
				bottom: _.size.height,
				left: e.left,
				right: e.left + _.size.width,
				width: _.size.width,
				height: _.size.height
			} : {
				top: e.top,
				bottom: e.bottom,
				left: e.left,
				right: e.right,
				width: _.size.width,
				height: _.size.height
			};
		}
		T(Ne, {
			publicContext: G,
			rootElement: D(c),
			edgeLayer: D(l),
			freeLayer: D(u),
			snackbarLayer: D(d),
			floatingLayer: D(f),
			getLayoutRect: K
		});
		function q() {
			window.addEventListener("resize", U), document.addEventListener("scroll", U, !0), window.visualViewport?.addEventListener("resize", U), window.visualViewport?.addEventListener("scroll", U);
		}
		function ee() {
			window.removeEventListener("resize", U), document.removeEventListener("scroll", U, !0), window.visualViewport?.removeEventListener("resize", U), window.visualViewport?.removeEventListener("scroll", U);
		}
		return S(async () => {
			A = !0, M = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(U), M?.observe(c.value), k.forEach((e) => {
				e.active && M?.observe(e.element);
			}), q(), await g(), U();
		}), b(() => {
			A = !1, M?.disconnect(), M = void 0, ee(), N !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(N) : window.clearTimeout(N));
		}), B([() => i.fillViewport, () => i.scrollable], U), (t, n) => (w(), o("div", h({
			ref_key: "rootElement",
			ref: c
		}, t.$attrs, {
			class: ["mat-app-root", x.value],
			"data-scrollable": String(e.scrollable),
			style: C.value
		}), [
			s("div", xt, [j(t.$slots, "default", {}, void 0, !0)]),
			s("div", St, [
				s("div", {
					ref_key: "edgeLayer",
					ref: l,
					class: "mat-app-root__edge-layer"
				}, null, 512),
				s("div", {
					ref_key: "freeLayer",
					ref: u,
					class: "mat-app-root__free-layer"
				}, null, 512),
				s("div", Ct, [
					n[0] ||= s("span", {
						class: "mat-app-root__stack-spacer",
						"aria-hidden": "true"
					}, null, -1),
					s("div", {
						ref_key: "snackbarLayer",
						ref: d,
						class: "mat-app-root__snackbar-layer"
					}, null, 512),
					s("div", {
						ref_key: "floatingLayer",
						ref: f,
						class: "mat-app-root__floating-layer"
					}, null, 512)
				])
			]),
			s("span", {
				ref_key: "safeAreaProbe",
				ref: m,
				class: "mat-app-root__safe-area-probe",
				"aria-hidden": "true"
			}, null, 512)
		], 16, bt));
	}
}), [["__scopeId", "data-v-8e23dfec"]]), Tt = 150, Et = .75, Dt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return ie.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
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
		let n = e, i = t, a = O(null), s = O(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set(), d, f, p = Tt, m = !0, _ = !1, { colorStyle: v } = ke(r(() => n.color));
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
		T(ht, {
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
			return E(t ?? "") ?? Tt;
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
			}), u.clear(), s.value && delete s.value.dataset.matGroupPressed, s.value = null, p = Tt, m = !0, _ = !1;
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
			}, t * Et);
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
}), [["__scopeId", "data-v-15b9823a"]]), Ot = [
	"small",
	"medium",
	"large"
], kt = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], At = [
	"button",
	"submit",
	"reset"
];
function jt(e) {
	return typeof e == "string" && kt.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var Mt = {
	key: 1,
	class: "mat-fab__label"
}, Nt = {
	key: 1,
	class: "mat-fab__label"
}, Pt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return Ot.includes(e);
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
			validator: jt
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return At.includes(e);
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
		let c = t, d = s, f = L(), m = z(), g = p(re, Q), _ = p(Ne, null), v = O(null), y = R(), b = r(() => (m.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = r(() => typeof c.icon == "string" && c.icon.trim().length > 0), S = r(() => !b.value), C = r(() => S.value ? f.title ?? c.label : void 0), T = r(() => S.value ? c.label : f["aria-label"]), E = r(() => ({
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
		}, [u(ne, h({
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
				x.value ? (w(), i(je, {
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
				b.value ? (w(), o("span", Nt, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(mt, {
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
		])], 8, ["to"])) : a("", !0) : (w(), i(ne, h({
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
				x.value ? (w(), i(je, {
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
				b.value ? (w(), o("span", Mt, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(mt, {
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
}), [["__scopeId", "data-v-2fe45c13"]]), Ft = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = p(gt), a = z();
		T(gt, {
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
}), It = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return ie.includes(e);
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
		let n = e, i = t, a = O(null), c = z(), { colorStyle: l, hasExplicitColor: d } = ke(r(() => n.color));
		T(gt, {
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
		}, [u(Ft, { role: "leading" }, {
			default: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), s("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [u(Ft, { role: "trailing" }, {
			default: H(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-647c3562"]]), Lt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-76b082b5"]]), Rt = { class: "mat-card-headline" }, zt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (w(), o("div", Rt, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-acf29196"]]), Bt = { class: "mat-card-media" }, Vt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (w(), o("div", Bt, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-7208424e"]]), Ht = { class: "mat-card-subhead" }, Ut = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (w(), o("div", Ht, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-2c6ca74d"]]), Wt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let t = e, { colorStyle: n, hasExplicitColor: o } = ke(r(() => t.color));
		return (t, r) => (w(), i(Lt, h(t.$attrs, {
			class: ["mat-card", [`mat-card--${e.variant}`, { "mat-card--explicit-color": I(o) }]],
			style: I(n),
			as: e.as
		}), {
			default: H(() => [
				t.$slots.media ? (w(), i(Vt, { key: 0 }, {
					default: H(() => [j(t.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.headline ? (w(), i(zt, { key: 1 }, {
					default: H(() => [j(t.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.subhead ? (w(), i(Ut, { key: 2 }, {
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
}), [["__scopeId", "data-v-c8df8af3"]]), Gt = { class: "mat-card-action-area__content" }, Kt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
			validator: (e) => oe.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = t, r = p(re, Q);
		return (t, a) => (w(), i(X, h(t.$attrs, {
			class: "mat-card-action-area",
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			type: e.type,
			"use-cursor": I(r).useCursor,
			onClick: a[0] ||= (e) => n("click", e)
		}), {
			default: H(() => [s("span", Gt, [j(t.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-7e019121"]]), qt = { class: "mat-card-content" }, Jt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (w(), o("div", qt, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-8a32cf5d"]]), Yt = { class: "mat-card-actions" }, Xt = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (w(), o("div", Yt, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-f3e5f8e6"]]), Zt = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], Qt = Symbol("mat-list"), $t = Symbol("mat-list-group-activator");
function en(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function tn(e) {
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
function nn(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function rn(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(nn);
}
var an = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return Zt.includes(e);
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
				return e.every(nn);
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
			return Array.isArray(e) && e.every(nn);
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = O(null), s = r(() => en(n.interaction)), c = r(() => s.value ? "div" : "ul"), { colorStyle: l } = ke(r(() => n.color)), u = [], d = [
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
		let C = tn({
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
		return T(Qt, {
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
}), [["__scopeId", "data-v-8ff1fa12"]]), on = ["data-line-count"], sn = ["inert"], cn = ["inert"], ln = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
			}, [e.leadingIcon ? (w(), i(je, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: H(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : j(t.$slots, "leading", { key: 1 }, void 0, !0)], 10, sn)) : a("", !0),
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
			}, [j(t.$slots, "trailing", {}, void 0, !0)], 10, cn)) : a("", !0)
		], 10, on));
	}
}), [["__scopeId", "data-v-7cb38b5a"]]), un = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		return (t, n) => (w(), i(ln, {
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
}), [["__scopeId", "data-v-2d1ef745"]]), dn = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], fn = ["aria-disabled", "data-mat-list-disabled"], pn = ["aria-disabled", "data-mat-list-disabled"], mn = ["inert"], hn = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return oe.includes(e);
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
		let n = e, s = t, l = z(), d = p(Qt, null), f = p($t, null), m = p(re, Q), v = r(() => d?.interaction.value ?? "none"), y = r(() => v.value === "single-action" || v.value === "multi-action"), b = r(() => v.value === "multi-action"), x = r(() => d?.isSelectable.value ?? !1), C = r(() => d?.isSelected(n.value) ?? !1), T = r(() => !!l.trailing), E = r(() => {
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
		}), [u(un, {
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
		]), 1032, ["line-count"])], 16, dn)) : I(f) ? (w(), i(X, h({ key: 1 }, t.$attrs, {
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
			default: H(() => [u(un, {
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
		}), [u(un, {
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
		]), 1032, ["line-count"])], 16, fn)) : y.value ? (w(), o("li", {
			key: 3,
			class: _(["mat-list-item", [D.value, {
				"mat-list-item__surface": b.value,
				"mat-list-item--multi-action": b.value
			}]]),
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}, [u(X, h(t.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !b.value }],
			"data-mat-list-primary": "",
			disabled: e.disabled,
			"focus-ring": !0,
			href: e.href,
			type: e.type,
			"use-cursor": I(m).useCursor,
			onClick: O
		}), {
			default: H(() => [u(un, {
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
		}, [j(t.$slots, "trailing", {}, void 0, !0)], 8, mn)) : a("", !0)], 10, pn)) : (w(), i(X, h({ key: 4 }, t.$attrs, {
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
			default: H(() => [u(un, {
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
}), [["__scopeId", "data-v-a787e932"]]), gn = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return T($t, e.context), (e, t) => j(e.$slots, "default");
	}
}), _n = [
	"role",
	"aria-hidden",
	"inert"
], vn = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let a = n, o = p(Qt, null), c = z(), l = O(null), d = O(!1), f = O(null), _ = Symbol("mat-list-group"), v = R().replace(/[^\w-]/g, "-"), y = `mat-list-group-${v}-content`, x = `mat-list-group-${v}-label`, T = !1, E, D = r(() => a.value !== void 0), k = r(() => o?.isSelectable.value ?? !1), A = r(() => D.value ? o?.isGroupExpanded(a.value) ?? !1 : d.value);
		function N(n) {
			return n.flatMap((n) => m(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? N(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = r(() => {
			let e = N(c.activator?.({ expanded: A.value }) ?? []);
			if (e.length !== 1 || !m(e[0])) return !1;
			let t = e[0].type;
			return t === hn || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
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
		function te() {
			E !== void 0 && (o?.unregisterGroupValue(_), E = void 0);
		}
		return S(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), k.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), ee(a.value), q(), o?.requestFocusRefresh();
		}), C(q), b(() => {
			te(), o?.requestFocusRefresh();
		}), B(() => a.value, (e, t) => {
			Object.is(e, t) || (te(), ee(e));
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
			default: H(() => [u(gn, { context: W }, {
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
			}, 8, ["role"]))], 8, _n)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-4fe2a3e4"]]), yn = Symbol("mat-menu"), bn = Symbol("mat-menu-item"), xn = Symbol("mat-menu-group");
function Sn(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function Cn(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = Sn(t, a, o), c = Sn(e, a, o), l = Sn(t, e, o), u = Sn(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function wn(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var Tn = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let t = e, n = p(Qt, null), a = p(yn, null), o = r(() => !!n), s = r(() => !!a), c = r(() => n?.isSelectable.value ?? !1), l = r(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = r(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
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
}), [["__scopeId", "data-v-2eb6ec37"]]), En = { class: "mat-selection-control__target" }, Dn = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], On = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, kn = {
	key: 0,
	class: "mat-selection-control__label"
}, An = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let i = e, c = n, l = L(), u = z(), d = O(null), f = p(re, Q), { colorStyle: m } = ke(r(() => i.color)), g = r(() => {
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
		}), [s("span", En, [
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
			}), null, 16, Dn),
			n[2] ||= s("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			s("span", On, [j(t.$slots, "indicator", {}, void 0, !0)])
		]), I(u).default ? (w(), o("span", kn, [j(t.$slots, "default", {}, void 0, !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-4dcfac60"]]), jn = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: rn
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: nn
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
		"update:modelValue": rn,
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
		return (t, n) => (w(), i(An, h(t.$attrs, {
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
}), [["__scopeId", "data-v-3d8ac819"]]), Mn = Symbol("mdu-ui-radio-group"), Nn = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return e == null || nn(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: nn
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
			return e === null || nn(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = d(), c = p(Mn, null), l = O(null), u = r(() => n.value), f = r(() => n.disabled || !!c?.disabled.value), m = r(() => n.color ?? c?.color.value), g = r(() => c ? c.isSelected(n.value) : Object.is(n.modelValue, n.value));
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
		return (e, t) => (w(), i(An, h({
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
}), [["__scopeId", "data-v-0d040228"]]), Pn = ["aria-disabled"], Fn = { class: "mat-radio-group__label" }, In = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				return e === null || nn(e);
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
			return e === null || nn(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = L(), c = P([]), { colorStyle: l } = ke(r(() => n.color)), u = r(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = r(() => [l.value, a.style]);
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
		return T(Mn, {
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
		}), [s("legend", Fn, F(e.label), 1), j(t.$slots, "default", {}, void 0, !0)], 16, Pn));
	}
}), [["__scopeId", "data-v-b2f7e821"]]), Ln = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		return (t, n) => (w(), i(An, h(t.$attrs, {
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
}), [["__scopeId", "data-v-71a3dff9"]]), Rn = Object.freeze(["horizontal", "vertical"]), zn = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), Bn = Object.freeze(["standard", "centered"]), Vn = 12;
function Hn(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Un(e) {
	return Hn(e) && e > 0;
}
function Wn(e) {
	return Rn.includes(e);
}
function Gn(e) {
	return zn.includes(e);
}
function Kn(e) {
	return Bn.includes(e);
}
function qn(e) {
	return Array.isArray(e) && e.length === 2 && e.every(Hn);
}
function Jn(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function Yn(e, t) {
	return Number(e.toFixed(Math.min(Vn, t)));
}
function Xn(e, t) {
	let n = Hn(e) ? e : 0, r = Hn(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function Zn(e) {
	return Un(e) ? e : 1;
}
function Qn(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function $n(e, t, n) {
	let r = Qn(Hn(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(Jn(t.min), Jn(t.max), Jn(n));
	return Yn(Qn(t.min + i * n, t), a);
}
function er(e, t, n) {
	return $n(Hn(e) ? e : (t.min + t.max) / 2, t, n);
}
function tr(e, t) {
	return Yn((Qn(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function nr(e) {
	return Number(e.toFixed(3)).toString();
}
function rr(e) {
	let t = Math.min(Math.max(e, 0), 100), n = nr(t), r = Yn(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${nr(Math.abs(r))}px)`;
}
function ir(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(Jn(e.min), Jn(e.max), Jn(t)), i = Array.from({ length: n + 1 }, (n, i) => Yn(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function ar(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return $n(n.min + (n.max - n.min) * u, n, r);
}
function or(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return $n(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return $n(e + i * r, n, r);
}
function sr(e, t, n, r) {
	let i = $n(e, n, r), a = $n(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var cr = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, lr = { class: "mat-slider__inset-icon-layer" }, ur = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, dr = [
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
], fr = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: Hn
		},
		min: {
			type: Number,
			default: 0,
			validator: Hn
		},
		max: {
			type: Number,
			default: 100,
			validator: Hn
		},
		step: {
			type: Number,
			default: 1,
			validator: Un
		},
		variant: {
			type: String,
			default: "standard",
			validator: Kn
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || Hn(e);
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
			validator: Wn
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Gn
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
			return Hn(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, c = n, l = L(), d = O(null), f = O(null), m = O(null), g = O(!1), y = O(void 0), b = O(void 0), x = O(!1), S = O(!1), C = p(re, Q), { colorStyle: T } = ke(r(() => i.color)), E = r(() => Xn(i.min, i.max)), D = r(() => Zn(i.step)), k = r(() => $n(i.modelValue, E.value, D.value)), j = r(() => g.value ? b.value : k.value), M = r(() => er(i.center, E.value, D.value)), N = r(() => i.variant === "centered" ? M.value : E.value.min), P = r(() => tr(j.value, E.value)), F = r(() => tr(N.value, E.value)), R = r(() => rr(P.value)), z = r(() => i.variant === "standard" ? "0%" : rr(F.value)), B = r(() => Math.sign(P.value - F.value)), V = r(() => B.value >= 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), H = r(() => B.value > 0 ? `max(0px, calc(${R.value} - ${z.value} - var(--mat-slider-handle-track-gap)))` : B.value < 0 ? `max(0px, calc(${z.value} - ${R.value} - var(--mat-slider-handle-track-gap)))` : "0px"), U = r(() => B.value > 0 ? z.value : `max(0px, calc(${R.value} - var(--mat-slider-handle-track-gap)))`), W = r(() => B.value < 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), G = r(() => B.value < 0 ? `calc(100% - ${z.value})` : `max(0px, calc(100% - ${R.value} - var(--mat-slider-handle-track-gap)))`), K = r(() => i.showStopIndicator ? ir(E.value, D.value) : i.variant === "centered" ? [E.value.min, E.value.max] : [E.value.max]), q = r(() => i.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(i.size)), ee = r(() => i.size === "extra-large" ? 32 : 24), te = r(() => i.showValueIndicator && (g.value || S.value)), J = r(() => ({
			...T.value,
			"--mat-slider-active-visible-size": H.value,
			"--mat-slider-active-visible-start": V.value,
			"--mat-slider-center-position": z.value,
			"--mat-slider-inactive-after-size": G.value,
			"--mat-slider-inactive-after-start": W.value,
			"--mat-slider-inactive-before-size": U.value,
			"--mat-slider-position": R.value
		}));
		function Y(e, t) {
			let n = g.value ? b.value : k.value;
			return e === void 0 || e === n ? !1 : (g.value && (b.value = e), c("update:modelValue", e), c("input", t), !0);
		}
		function X(e) {
			return f.value ? Y(ar(e, f.value, E.value, D.value, i.orientation), e) : !1;
		}
		function ne(e) {
			i.disabled || (y.value = e.pointerId, b.value = k.value, x.value = !1, g.value = !0, m.value?.focus(), f.value?.setPointerCapture?.(e.pointerId), x.value = X(e));
		}
		function Z(e) {
			!g.value || e.pointerId !== y.value || (x.value = X(e) || x.value);
		}
		function ie(e, t) {
			!g.value || e.pointerId !== y.value || (t && (x.value = X(e) || x.value), t && x.value && c("change", e), g.value = !1, x.value = !1, y.value = void 0, b.value = void 0);
		}
		function ae(e) {
			if (i.disabled) return;
			let t = or(k.value, e.key, E.value, D.value);
			t !== void 0 && (e.preventDefault(), Y(t, e) && c("change", e));
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
			style: J.value
		}), [
			s("span", cr, [
				r[6] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				s("span", { class: _(["mat-slider__active-track", { "mat-slider__active-track--from-start": e.variant === "standard" }]) }, null, 2),
				r[7] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(K.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(N.value, j.value) && e <= Math.max(N.value, j.value) }]),
					style: v({ "--mat-slider-stop-position": I(rr)(I(tr)(e, E.value)) })
				}, null, 6))), 128)),
				q.value ? (w(), o(t, { key: 0 }, [s("span", lr, [u(je, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: e.insetIcon,
					"optical-size": ee.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), s("span", ur, [u(je, {
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
			u(mt, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(j.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": te.value,
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
				onPointermove: Z,
				onPointerup: r[2] ||= (e) => ie(e, !0)
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
			}, null, 40, dr)
		], 16));
	}
}), [["__scopeId", "data-v-a8683686"]]), pr = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, mr = [
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
], hr = [
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
], gr = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
			validator: qn
		},
		min: {
			type: Number,
			default: 0,
			validator: Hn
		},
		max: {
			type: Number,
			default: 100,
			validator: Hn
		},
		step: {
			type: Number,
			default: 1,
			validator: Un
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
			validator: Wn
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Gn
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
			return qn(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, a = n, c = L(), l = O([]), d = O(null), f = O(null), m = O(null), g = O(0), y = O(void 0), b = O(!1), x = O(void 0), S = O(void 0), C = O(!1), T = p(re, Q), { colorStyle: E } = ke(r(() => i.color)), D = r(() => Xn(i.min, i.max)), k = r(() => Zn(i.step)), j = r(() => sr(i.modelValue?.[0], i.modelValue?.[1], D.value, k.value)), M = r(() => b.value ? S.value : j.value), N = r(() => tr(M.value[0], D.value)), P = r(() => tr(M.value[1], D.value)), F = r(() => rr(N.value)), R = r(() => rr(P.value)), z = r(() => i.showStopIndicator ? ir(D.value, k.value) : [D.value.min, D.value.max]), B = r(() => l.value[g.value] ?? null), V = r(() => M.value[g.value]), H = r(() => i.showValueIndicator && (b.value || y.value === g.value)), U = r(() => ({
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
			let t = ar(e, d.value, D.value, k.value, i.orientation);
			return K(g.value, t, e);
		}
		function ee(e) {
			if (i.disabled || !d.value) return;
			let t = ar(e, d.value, D.value, k.value, i.orientation);
			t !== void 0 && (g.value = G(t), x.value = e.pointerId, S.value = [...j.value], C.value = !1, b.value = !0, W(g.value)?.focus(), d.value.setPointerCapture?.(e.pointerId), C.value = K(g.value, t, e));
		}
		function te(e) {
			!b.value || e.pointerId !== x.value || (C.value = q(e) || C.value);
		}
		function J(e, t) {
			!b.value || e.pointerId !== x.value || (t && (C.value = q(e) || C.value), t && C.value && a("change", e), b.value = !1, C.value = !1, x.value = void 0, S.value = void 0);
		}
		function Y(e, t) {
			if (i.disabled) return;
			let n = or(j.value[e], t.key, D.value, k.value);
			n !== void 0 && (t.preventDefault(), g.value = e, K(e, n, t) && a("change", t));
		}
		function X(e) {
			g.value = e, y.value = e;
		}
		function ne(e) {
			y.value === e && (y.value = void 0);
		}
		function Z(e, t) {
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
			s("span", pr, [
				r[10] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				r[11] ||= s("span", { class: "mat-range-slider__active-track" }, null, -1),
				r[12] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(z.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= M.value[0] && e <= M.value[1] }]),
					style: v({ "--mat-range-slider-stop-position": I(rr)(I(tr)(e, D.value)) })
				}, null, 6))), 128)),
				(w(!0), o(t, null, A(M.value, (e, t) => (w(), o("span", {
					key: t,
					ref_for: !0,
					ref: (e) => Z(t, e),
					class: _(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": g.value === t }]])
				}, [...r[9] ||= [s("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			u(mt, {
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
				onLostpointercapture: r[0] ||= (e) => J(e, !1),
				onPointercancel: r[1] ||= (e) => J(e, !1),
				onPointerdown: ee,
				onPointermove: te,
				onPointerup: r[2] ||= (e) => J(e, !0)
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
				onBlur: r[3] ||= (e) => ne(0),
				onFocus: r[4] ||= (e) => X(0),
				onKeydown: r[5] ||= (e) => Y(0, e)
			}, null, 40, mr),
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
				onBlur: r[6] ||= (e) => ne(1),
				onFocus: r[7] ||= (e) => X(1),
				onKeydown: r[8] ||= (e) => Y(1, e)
			}, null, 40, hr)
		], 16));
	}
}), [["__scopeId", "data-v-d7070366"]]), _r = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-55b4fdd2"]]), vr = ["inert", "aria-hidden"], yr = { class: "mat-text-input__container" }, br = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, xr = {
	key: 0,
	class: "mat-text-input__outline-label"
}, Sr = { key: 0 }, Cr = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, wr = ["for"], Tr = {
	key: 0,
	class: "mat-text-input__label"
}, Er = {
	key: 0,
	"aria-hidden": "true"
}, Dr = { class: "mat-text-input__control-row" }, Or = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, kr = {
	key: 1,
	class: "mat-text-input__affix mat-text-input__suffix"
}, Ar = { class: "mat-text-input__supporting-text" }, jr = {
	key: 0,
	class: "mat-text-input__counter"
}, Mr = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, d = L(), f = O(!1), p = O(n.modelValue), m = O(), y = R(), x = `${y}-supporting`, C = r(() => d.id || y), { colorStyle: T } = ke(r(() => n.color)), E = r(() => !!d.placeholder), D = r(() => f.value || p.value.length > 0 || E.value), k = r(() => n.error ? n.errorText : n.supportingText), A = r(() => !!k.value || n.maxLength !== void 0), M = r(() => {
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
		}, [s("div", yr, [
			e.variant === "outlined" ? (w(), o("fieldset", br, [D.value && e.label ? (w(), o("legend", xr, [l(F(e.label), 1), e.required ? (w(), o("span", Sr, " *")) : a("", !0)])) : a("", !0)])) : a("", !0),
			e.variant === "filled" ? (w(), o("span", Cr)) : a("", !0),
			t.$slots.leading ? (w(), i(je, {
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
			}, [e.label ? (w(), o("span", Tr, [l(F(e.label), 1), e.required ? (w(), o("span", Er, " *")) : a("", !0)])) : a("", !0), s("span", Dr, [
				e.prefixText ? (w(), o("span", Or, F(e.prefixText), 1)) : a("", !0),
				u(_r, h({
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
				e.suffixText ? (w(), o("span", kr, F(e.suffixText), 1)) : a("", !0)
			])], 8, wr),
			t.$slots.trailing ? (w(), i(je, {
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
		}, [s("span", Ar, F(k.value), 1), e.maxLength === void 0 ? a("", !0) : (w(), o("span", jr, F(e.modelValue.length) + " / " + F(e.maxLength), 1))])) : a("", !0)], 14, vr));
	}
}), [["__scopeId", "data-v-052f006d"]]), Nr = ["filled", "outlined"], Pr = {
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
			return Nr.includes(e);
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
}, Fr = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...Pr,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = e, r = t;
		return (e, t) => (w(), i(Mr, h({
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
}), Ir = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...Pr,
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
		return (e, t) => (w(), i(Mr, h({
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
}), Lr = { class: "mat-menu__surface" }, Rr = 200, zr = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let i = e, c = n, l = L(), d = z(), f = p(bn, null), m = p(yn, null), _ = O(null), v = O(null), y = r(() => v.value?.root ?? v.value?.$el ?? null), x = R().replace(/[^\w-]/g, "-"), E = r(() => l.id ?? `${x}-menu`), D = `--mat-menu-anchor-${x}`, k = O(!1), A = O("closed"), M = m?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, N = O(0), P = /* @__PURE__ */ new Map(), F = null, V = "", U = !1, W = !1, G, K, q, ee = null, te = !1, J = r(() => !!f), Y = r(() => !!d.activator), X = r(() => !J.value && !Y.value && ce(i.anchor)), ne = r(() => N.value > 0), Z = r(() => J.value ? k.value : i.modelValue), Q = r(() => i.variant ?? m?.variant.value ?? "standard"), re = r(() => i.color ?? m?.color.value), ie = r(() => i.closeOnClick), { colorStyle: ae } = ke(re), oe = r(() => {
			let [e, t] = ce(i.offset) ? i.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: X.value ? "auto" : D
			};
			return X.value && ce(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), se = r(() => [
			ae.value,
			oe.value,
			l.style
		]), $ = tn({
			root: y,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === y.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function ce(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function le() {
			if (J.value) return f.element.value;
			if (Y.value) {
				let e = _.value ? [..._.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function ue() {
			F && (V ? F.style.setProperty("anchor-name", V) : F.style.removeProperty("anchor-name"), F = null, V = "");
		}
		function de() {
			let e = le();
			return e ? F === e ? e : (ue(), F = e, V = e.style.getPropertyValue("anchor-name"), e.style.setProperty("anchor-name", D), e) : null;
		}
		function fe() {
			G !== void 0 && (window.clearTimeout(G), G = void 0);
		}
		function pe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function me() {
			y.value && U && (U = !1, W = !0, y.value.hidePopover?.()), A.value = "closed";
		}
		function he() {
			G = void 0, A.value = "closed";
		}
		function ge() {
			if (fe(), pe()) {
				A.value = "closed";
				return;
			}
			A.value = "closing", G = window.setTimeout(he, Rr);
		}
		function _e({ immediate: e = !1 } = {}) {
			if (!(!y.value || !U)) {
				if (W = !0, Se({ immediate: !0 }), e || pe()) {
					fe(), me();
					return;
				}
				A.value !== "closing" && (A.value = "closing", fe(), G = window.setTimeout(() => {
					G = void 0, me();
				}, Rr));
			}
		}
		function ve() {
			if (K = void 0, !y.value || !U) return;
			let e = y.value.style, t = y.value.getBoundingClientRect(), n = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, r = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, i = Number.parseFloat(getComputedStyle(y.value).getPropertyValue("--mat-menu-viewport-space")), a = Number.isFinite(i) ? i : 8, o = {
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
			let e = X.value ? null : de(), t = X.value || !!e;
			if (!y.value || !t) {
				J.value || (console.warn(Y.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), c("update:modelValue", !1));
				return;
			}
			U || (X.value && document.activeElement instanceof HTMLElement && (ee = document.activeElement), U = !0, y.value.showPopover?.()), A.value = "open", J.value && (f.submenuOpen.value = !0), $.refresh(), $.focusFirst(), ye();
		}
		function xe() {
			let e = le() ?? ee;
			ee = null, g(() => e?.focus());
		}
		function Se({ immediate: e = !1 } = {}) {
			P.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function Ce({ focus: e = !0, immediate: t = !1 } = {}) {
			Se({ immediate: t }), J.value ? (k.value = !1, f.submenuOpen.value = !1) : c("update:modelValue", !1), _e({ immediate: t }), e && xe();
		}
		function we() {
			if (m) {
				m.closeTree();
				return;
			}
			Ce();
		}
		function Te(e) {
			P.set(e.element, e), wn(Array.from(P.values()).filter((e) => !e.grouped)), $.queueRefresh();
		}
		function Ee(e) {
			P.delete(e.element), wn(Array.from(P.values()).filter((e) => !e.grouped)), $.queueRefresh();
		}
		function De() {
			N.value += 1, $.queueRefresh();
		}
		function Oe() {
			N.value = Math.max(0, N.value - 1), $.queueRefresh();
		}
		function Ae(e, { pointer: t = !1 } = {}) {
			P.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function je(e) {
			let t = getComputedStyle(y.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), $.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), $.focusFirst()) : e.key === "End" ? (e.preventDefault(), $.focusLast()) : e.key === "Escape" || J.value && e.key === t ? (e.preventDefault(), Ce()) : e.key === "Tab" && we();
		}
		function Me(e) {
			if (U = e.newState === "open", U) {
				ye();
				return;
			}
			let t = W;
			W = !1, Se(), J.value && (k.value = !1, f.submenuOpen.value = !1), !(!Z.value || t) && (ge(), J.value || c("update:modelValue", !1), xe());
		}
		T(yn, {
			closeOtherSubmenus: Ae,
			closeTree: we,
			closeOnClick: ie,
			color: re,
			registerItem: Te,
			registerGroup: De,
			unregisterItem: Ee,
			unregisterGroup: Oe,
			pointerHistory: M,
			variant: Q
		}), f && f.registerSubmenu({
			close: Ce,
			element: y,
			id: E,
			open: be
		}), S(() => {
			$.observe(), window.addEventListener("resize", ye), window.addEventListener("scroll", ye, {
				capture: !0,
				passive: !0
			}), Z.value && Pe(), typeof ResizeObserver < "u" && (q = new ResizeObserver(ye), q.observe(y.value)), Z.value && be();
		}), C(() => {
			J.value || !Z.value || X.value || le() !== F && (ue(), be());
		}), b(() => {
			fe(), K !== void 0 && cancelAnimationFrame(K), q?.disconnect(), window.removeEventListener("resize", ye), window.removeEventListener("scroll", ye, { capture: !0 }), Fe(), _e({ immediate: !0 }), ue(), f?.unregisterSubmenu();
		});
		function Ne(e) {
			M.previous = M.current, M.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Pe() {
			m || te || (document.addEventListener("pointermove", Ne, !0), te = !0);
		}
		function Fe() {
			te &&= (document.removeEventListener("pointermove", Ne, !0), !1);
		}
		return B(Z, (e) => {
			e ? (Pe(), be()) : (Fe(), _e());
		}), B(() => i.anchor, async () => {
			ue(), Z.value && await be();
		}, { deep: !0 }), B(() => i.offset, async () => {
			Z.value && (await g(), ye());
		}, { deep: !0 }), (e, n) => (w(), o(t, null, [!J.value && Y.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-menu__activator"
		}, [j(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), u(Lt, h({
			id: E.value,
			ref_key: "surface",
			ref: v
		}, e.$attrs, {
			class: ["mat-menu", [`mat-menu--${Q.value}`, {
				"mat-menu--coordinate": X.value,
				"mat-menu--grouped": ne.value,
				"mat-menu--nested": J.value,
				"mat-menu--closing": A.value === "closing"
			}]],
			style: se.value,
			popover: "auto",
			role: "menu",
			onPointerenter: n[0] ||= (e) => I(f)?.cancelSubmenuClose(),
			onFocusin: I($).handleFocusIn,
			onKeydown: je,
			onToggle: Me
		}), {
			default: H(() => [s("div", Lr, [j(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"id",
			"class",
			"style",
			"onFocusin"
		])], 64));
	}
}), [["__scopeId", "data-v-8255369d"]]), Br = ["aria-labelledby"], Vr = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = e, n = L(), i = p(yn, null), s = `${R().replace(/[^\w-]/g, "-")}-label`, c = r(() => t.label ? s : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), wn(Array.from(l));
		}
		function d(e) {
			l.delete(e), wn(Array.from(l));
		}
		return T(xn, {
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
		}, F(e.label), 1)) : a("", !0), j(t.$slots, "default", {}, void 0, !0)], 16, Br));
	}
}), [["__scopeId", "data-v-8632d18c"]]), Hr = { class: "mat-menu-item-host" }, Ur = 300, Wr = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let n = e, s = t, l = z(), d = p(yn, null), f = p(xn, null), m = p(re, Q), g = O(null), _ = r(() => g.value?.root ?? g.value?.$el ?? null), v = O(!1), y = O(void 0), x = O("only"), C, E, D = r(() => !!l.submenu);
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
				return Cn(d.pointerHistory.current, d.pointerHistory.previous, t, n) ? Ur : 0;
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
		return T(bn, {
			cancelSubmenuClose: A,
			element: _,
			registerSubmenu: N,
			submenuOpen: v,
			unregisterSubmenu: P
		}), S(() => {
			f?.registerItem(F), d?.registerItem(F);
		}), b(() => {
			clearTimeout(E), f?.unregisterItem(F), d?.unregisterItem(F);
		}), (t, n) => (w(), o("span", Hr, [u(X, h({
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
			default: H(() => [u(ln, {
				namespace: "mat-menu-item-content",
				"line-count": t.$slots.supporting ? 2 : 1,
				"leading-icon": ""
			}, c({
				trailing: H(() => [t.$slots.trailing ? j(t.$slots, "trailing", { key: 0 }, void 0, !0) : D.value ? (w(), i(je, {
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
}), [["__scopeId", "data-v-b44804e6"]]), Gr = P([]), Kr = null;
function qr() {
	if (!Kr) return;
	let { lockedScrollbarGutter: e, overflow: t, root: n, scrollbarGutter: r } = Kr;
	n.style.overflow === "hidden" && (n.style.overflow = t), e !== null && n.style.scrollbarGutter === e && (n.style.scrollbarGutter = r), Kr = null;
}
function Jr() {
	if (Kr) return;
	let e = document.documentElement, t = e.clientWidth > 0 ? Math.max(0, window.innerWidth - e.clientWidth) : 0, n = getComputedStyle(e).scrollbarGutter, r = t > 0 && !n.includes("stable");
	Kr = {
		lockedScrollbarGutter: r ? "stable" : null,
		overflow: e.style.overflow,
		root: e,
		scrollbarGutter: e.style.scrollbarGutter
	}, r && (e.style.scrollbarGutter = Kr.lockedScrollbarGutter), e.style.overflow = "hidden";
}
function Yr(e) {
	let t = Gr.value.filter((e) => e.isConnected);
	if (t.length === 0 && qr(), t.includes(e)) {
		Gr.value = t;
		return;
	}
	Gr.value = [...t, e], Jr();
}
function Xr(e) {
	Gr.value = Gr.value.filter((t) => t !== e && t.isConnected), Gr.value.length === 0 && qr();
}
//#endregion
//#region src/components/mat-dialog/MatDialog.vue
var Zr = { class: "mat-dialog__header" }, Qr = {
	key: 1,
	class: "mat-dialog__actions"
}, $r = {
	key: 0,
	class: "mat-dialog__content"
}, ei = {
	key: 2,
	class: "mat-dialog__content"
}, ti = {
	key: 3,
	class: "mat-dialog__actions"
}, ni = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let f = e, p = c, m = L(), _ = z(), v = O(null), y = O(null), x = O(!1), C = O("closed"), T = O(null), E = `${R().replace(/[^\w-]/g, "-")}-title`, D = r(() => y.value?.root ?? y.value?.$el ?? null), k = r(() => f.title !== void 0 || !!_.title), A = r(() => f.content !== void 0 || !!_.default), M = r(() => !f.fullScreen && (f.icon !== void 0 || !!_.icon)), N = r(() => !!_.activator), P = r(() => Gr.value.at(-1) === D.value), { colorStyle: I } = ke(r(() => f.color)), U = r(() => {
			if (!(f.fullScreen || f.width === void 0)) return {
				inlineSize: `min(${d(f.width)}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), W = r(() => [
			I.value,
			m.style,
			U.value
		]), G = !1, K, q = null;
		function ee() {
			let e = v.value ? [...v.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function te() {
			K !== void 0 && (window.clearTimeout(K), K = void 0);
		}
		function J() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Y(e, t) {
			if (te(), J()) {
				t();
				return;
			}
			K = window.setTimeout(() => {
				K = void 0, t();
			}, e);
		}
		function X() {
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return f.attach instanceof HTMLElement && f.attach.ownerDocument === document ? f.attach : null;
		}
		function ne() {
			p("update:modelValue", !1);
		}
		function Z() {
			k.value || m["aria-label"] || m["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function Q() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function re() {
			let e = D.value;
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
			if (te(), x.value && D.value?.open) {
				C.value = "opening", Y(400, () => {
					C.value = "open", p("opened");
				});
				return;
			}
			let e = N.value ? ee() : null;
			if (N.value && !e) {
				Q(), ne();
				return;
			}
			let t = X();
			if (!t) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), ne();
				return;
			}
			q = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), T.value = t, x.value = !0, C.value = "opening", Z(), await g(), !(!f.modelValue || !D.value) && (D.value.open || D.value.showModal(), Yr(D.value), re(), Y(400, () => {
				C.value = "open", p("opened");
			}));
		}
		function ae() {
			let e = D.value;
			e?.open && e.close(), e && Xr(e), x.value = !1, C.value = "closed", g(() => {
				q?.isConnected && q.focus({ preventScroll: !0 }), q = null, p("closed");
			});
		}
		function oe() {
			x.value && (C.value = "closing", Y(200, ae));
		}
		function se(e) {
			e.preventDefault(), ne();
		}
		function $(e) {
			e.key === "Escape" && (e.preventDefault(), ne());
		}
		function ce(e) {
			if (!f.closeOnBack || e.target !== D.value) return;
			let t = D.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && ne();
		}
		return S(() => {
			G = !0, f.modelValue && ie();
		}), b(() => {
			G = !1, te(), D.value && (Xr(D.value), D.value.open && D.value.close());
		}), B(() => f.modelValue, (e) => {
			G && (e ? ie() : oe());
		}), B(() => f.attach, () => {
			f.modelValue && x.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), V(() => {
			f.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (r, c) => (w(), o(t, null, [N.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: v,
			class: "mat-dialog__activator"
		}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), x.value ? (w(), i(n, {
			key: 1,
			to: T.value
		}, [u(Lt, h({
			ref_key: "surface",
			ref: y
		}, r.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${C.value}`, {
				"mat-dialog--full-screen": e.fullScreen,
				"mat-dialog--with-icon": M.value,
				"mat-dialog--top": P.value,
				"mat-dialog--transparent-scrim": !e.scrim
			}]],
			style: W.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (k.value ? E : void 0),
			tabindex: "-1",
			onCancel: se,
			onClick: ce,
			onKeydown: $
		}), {
			default: H(() => [e.fullScreen ? (w(), o(t, { key: 0 }, [s("header", Zr, [
				u(yt, {
					class: "mat-dialog__close",
					icon: "close",
					label: e.closeLabel,
					size: "small",
					variant: "standard",
					onClick: ne
				}, null, 8, ["label"]),
				k.value ? (w(), o("h2", {
					key: 0,
					id: E,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (w(), o("div", Qr, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			]), A.value ? (w(), o("div", $r, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0)], 64)) : (w(), o(t, { key: 1 }, [
				M.value ? (w(), i(je, {
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
				k.value ? (w(), o("h2", {
					key: 1,
					id: E,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
				A.value ? (w(), o("div", ei, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (w(), o("div", ti, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			], 64))]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-e7e0d33b"]]), ri = ["aria-label"], ii = {
	key: 1,
	class: "mat-sheet__header"
}, ai = {
	key: 1,
	class: "mat-sheet__header-actions"
}, oi = {
	key: 2,
	class: "mat-sheet__content"
}, si = {
	key: 3,
	class: "mat-sheet__footer"
}, ci = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let d = e, f = c, p = L(), m = z(), _ = O(null), v = O(null), y = O(!1), x = O("closed"), C = O(null), T = O(typeof window > "u" ? 0 : window.innerWidth), E = O(0), D = O(null), k = O(!1), A = `${R().replace(/[^\w-]/g, "-")}-title`, M = r(() => v.value?.root ?? v.value?.$el ?? null), N = r(() => d.variant === "auto" ? T.value < d.breakpoint ? "modal" : "standard" : d.variant), P = r(() => N.value === "modal"), I = r(() => P.value && Gr.value.at(-1) === M.value), V = r(() => !!m.activator), W = r(() => d.title !== void 0 || !!m.title), G = r(() => d.content !== void 0 || !!m.default), K = r(() => d.closable), q = r(() => d.expanded ? P.value ? d.expandedDragHandleLabel : d.collapseDragHandleLabel : d.dragHandleLabel), ee = r(() => W.value || K.value || !!m.header || !!m.actions), te = r(() => P.value ? "dialog" : "aside"), J = r(() => {
			if (d.width !== void 0) return typeof d.width == "number" ? `${d.width}px` : d.width.trim();
		}), Y = r(() => {
			if (J.value) return { "--mat-sheet-preferred-width": J.value };
		}), X = r(() => ({
			"--mat-sheet-drag-offset": `${E.value}px`,
			...D.value === null ? {} : { "--mat-sheet-drag-size": `${D.value}px` }
		})), ne = r(() => [
			p.style,
			Y.value,
			X.value
		]), Z = !1, Q, re = null, ie = !1, ae = null, oe = 0, se = 0, $ = 0, ce = 0, le = !1;
		function ue() {
			Q !== void 0 && (window.clearTimeout(Q), Q = void 0);
		}
		function de() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function fe(e, t) {
			if (ue(), de()) {
				t();
				return;
			}
			Q = window.setTimeout(() => {
				Q = void 0, t();
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
				if (P.value) {
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
			!P.value || W.value || p["aria-label"] || p["aria-labelledby"] || console.warn(`${d.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
		}
		function be() {
			console.warn(`${d.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function xe() {
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
		function Se() {
			let e = M.value;
			e instanceof HTMLDialogElement && (e.open || e.showModal(), Yr(e), xe());
		}
		async function Ce() {
			if (ue(), y.value) {
				x.value = "opening", fe(400, () => {
					x.value = "open", f("opened");
				});
				return;
			}
			let e = V.value ? pe() : null;
			if (V.value && !e) {
				ve(), he();
				return;
			}
			if (P.value) {
				let t = me();
				if (!t) {
					be(), he();
					return;
				}
				C.value = t, re = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			}
			ie = P.value, y.value = !0, x.value = "opening", ye(), await g(), !(!d.modelValue || !M.value) && (P.value && Se(), fe(400, () => {
				x.value = "open", f("opened");
			}));
		}
		function we() {
			ie && re?.isConnected && re.focus({ preventScroll: !0 }), re = null, ie = !1;
		}
		function Te() {
			let e = M.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), Xr(e)), y.value = !1, x.value = "closed", E.value = 0, D.value = null, g(() => {
				we(), f("closed");
			});
		}
		function Ee() {
			y.value && (x.value = "closing", fe(200, Te));
		}
		function De(e) {
			e.preventDefault(), he();
		}
		function Oe(e) {
			e.key === "Escape" && (e.preventDefault(), he());
		}
		function ke(e) {
			if (!P.value || !d.closeOnBack || e.target !== M.value) return;
			let t = M.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && he();
		}
		function Ae(e) {
			if (e.pointerId === ae) {
				if (d.direction === "bottom") {
					if (ce = e.clientY - oe, !d.expanded && ce < 0 || d.expanded && ce > 0) {
						E.value = 0, D.value = Math.max(0, se - ce);
						return;
					}
					E.value = Math.max(0, ce), D.value = se;
					return;
				}
				E.value = d.position === "start" ? Math.max(0, oe - e.clientX) : Math.max(0, e.clientX - oe);
			}
		}
		function je() {
			ae = null, k.value = !1, window.removeEventListener("pointermove", Ae), window.removeEventListener("pointerup", Me), window.removeEventListener("pointercancel", Ne);
		}
		function Me(e) {
			if (e.pointerId !== ae) return;
			let t = M.value, n = d.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - $), i = d.direction === "bottom" ? Math.abs(ce) : E.value, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (le = i >= 4, je(), d.direction === "bottom" && o) {
				if (!d.expanded && ce < 0) {
					E.value = 0, D.value = null, f("update:expanded", !0);
					return;
				}
				if (d.expanded && ce > 0) {
					E.value = 0, D.value = null, f("update:expanded", !1);
					return;
				}
				if (!d.expanded && ce > 0) {
					D.value = null, he();
					return;
				}
			}
			if (d.direction === "side" && o) {
				he();
				return;
			}
			E.value = 0, D.value = null;
		}
		function Ne() {
			je(), E.value = 0, D.value = null;
		}
		function Pe(e) {
			!d.draggable || e.button !== 0 || ae !== null || (ae = e.pointerId, oe = d.direction === "bottom" ? e.clientY : e.clientX, se = d.direction === "bottom" ? M.value?.getBoundingClientRect().height ?? 0 : M.value?.getBoundingClientRect().width ?? 0, $ = performance.now(), ce = 0, D.value = d.direction === "bottom" ? se : null, k.value = !0, window.addEventListener("pointermove", Ae), window.addEventListener("pointerup", Me), window.addEventListener("pointercancel", Ne));
		}
		function Fe(e) {
			d.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Pe(e);
		}
		function Ie() {
			T.value = window.innerWidth;
		}
		async function Le(e, t) {
			if (!y.value || !d.modelValue || e === t) return;
			ue();
			let n = M.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), Xr(n), we()), e === "modal") {
				let e = me();
				if (!e) {
					be(), he();
					return;
				}
				C.value = e, re = document.activeElement instanceof HTMLElement ? document.activeElement : null, ie = !0, ye();
			}
			x.value = "open", await g(), e === "modal" && d.modelValue && Se();
		}
		return S(() => {
			Z = !0, Ie(), window.addEventListener("resize", Ie), d.modelValue && Ce();
		}), b(() => {
			Z = !1, ue(), je(), window.removeEventListener("resize", Ie);
			let e = M.value;
			e instanceof HTMLDialogElement && (Xr(e), e.open && e.close());
		}), B(() => d.modelValue, (e) => {
			Z && (e ? Ce() : Ee());
		}), B(N, Le), B(() => d.attach, () => {
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
		}, [u(Lt, h({
			ref_key: "surface",
			ref: v
		}, r.$attrs, {
			as: te.value,
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
			style: ne.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (W.value ? A : void 0),
			tabindex: P.value ? -1 : void 0,
			onCancel: De,
			onClick: ke,
			onKeydown: Oe,
			onPointerdown: Fe
		}), {
			default: H(() => [
				e.direction === "bottom" && e.dragHandle ? (w(), o("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": q.value,
					onClick: ge,
					onKeydown: _e,
					onPointerdown: U(Pe, ["stop"])
				}, [j(r.$slots, "drag-handle", {}, () => [c[0] ||= s("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, ri)) : a("", !0),
				ee.value ? (w(), o("header", ii, [j(r.$slots, "header", {}, () => [
					W.value ? (w(), o("h2", {
						key: 0,
						id: A,
						class: "mat-sheet__title"
					}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
					r.$slots.actions ? (w(), o("div", ai, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0),
					K.value ? (w(), i(yt, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: he
					}, null, 8, ["label"])) : a("", !0)
				], !0)])) : a("", !0),
				G.value ? (w(), o("div", oi, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0),
				r.$slots.footer ? (w(), o("div", si, [j(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
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
}), [["__scopeId", "data-v-9f3ac6ca"]]), li = /*@__PURE__*/ Object.assign({
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
		return (e, t) => (w(), i(ci, h({
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
}), ui = /*@__PURE__*/ Object.assign({
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
		return (e, t) => (w(), i(ci, h({
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
}), di = { class: "mat-container__content" }, fi = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		return (e, n) => (w(), o("div", h(e.$attrs, { class: ["mat-container", { "mat-container--fluid": t.fluid }] }), [s("div", di, [j(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-f98574ca"]]), pi = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-61d08a89"]]), mi = {
	key: 0,
	class: "mat-scroll-area__fixed"
}, hi = {
	key: 1,
	class: "mat-scroll-area__fixed"
}, gi = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		reachThreshold: {
			type: [Number, Object],
			default: 0,
			validator(e) {
				return typeof e == "number" ? Number.isFinite(e) && e >= 0 : !e || Array.isArray(e) ? !1 : ["start", "end"].every((t) => e[t] === void 0 || typeof e[t] == "number" && Number.isFinite(e[t]) && e[t] >= 0);
			}
		}
	},
	emits: {
		"reach-start": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement,
		"reach-end": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement
	},
	setup(e, { expose: t, emit: n }) {
		let i = e, c = n, l = L(), u = O(null), d = O(!1), f = O(!1), p = O(!1), m = O(!1), _, v, y = r(() => [
			"horizontal",
			"x",
			"h"
		].includes(i.orientation) ? "horizontal" : "vertical"), x = r(() => typeof i.reachThreshold == "number" ? {
			start: i.reachThreshold,
			end: i.reachThreshold
		} : {
			start: i.reachThreshold?.start ?? 0,
			end: i.reachThreshold?.end ?? 0
		}), T = r(() => ({
			class: l.class,
			style: l.style
		})), E = r(() => Object.fromEntries(Object.entries(l).filter(([e]) => !["class", "style"].includes(e))));
		function D() {
			let e = u.value;
			if (!e) return {
				start: 0,
				end: 0
			};
			if (y.value === "horizontal") {
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
		function k(e) {
			let t = u.value;
			if (!t) return;
			let n = D(), r = n.start <= x.value.start + 1, i = n.end <= x.value.end + 1;
			d.value = n.start > 1, f.value = n.end > 1, e && r && !p.value && c("reach-start", {
				distance: n.start,
				target: t
			}), e && i && !m.value && c("reach-end", {
				distance: n.end,
				target: t
			}), p.value = r, m.value = i;
		}
		function A(e) {
			_ !== void 0 && cancelAnimationFrame(_), _ = requestAnimationFrame(() => {
				_ = void 0, k(e);
			});
		}
		function M() {
			A(!0);
		}
		function N() {
			!v || !u.value || (v.disconnect(), v.observe(u.value), Array.from(u.value.children).forEach((e) => {
				v.observe(e);
			}), A(!1));
		}
		function P() {
			return u.value;
		}
		function F(e) {
			u.value?.scrollTo(e);
		}
		return B([y, x], async () => {
			await g(), A(!1);
		}, { deep: !0 }), S(() => {
			typeof ResizeObserver == "function" && (v = new ResizeObserver(() => A(!1))), N();
		}), C(N), b(() => {
			_ !== void 0 && cancelAnimationFrame(_), v?.disconnect();
		}), t({
			getScroller: P,
			scrollTo: F
		}), (e, t) => (w(), o("div", h(T.value, { class: ["mat-scroll-area", `mat-scroll-area--${y.value}`] }), [
			e.$slots["fixed-start"] ? (w(), o("div", mi, [j(e.$slots, "fixed-start", {}, void 0, !0)])) : a("", !0),
			s("div", h({
				ref_key: "scroller",
				ref: u
			}, E.value, {
				class: ["mat-scroll-area__scroller", {
					"mat-scroll-area__scroller--start-overflow": d.value,
					"mat-scroll-area__scroller--end-overflow": f.value
				}],
				onScroll: M
			}), [j(e.$slots, "default", {}, void 0, !0)], 16),
			e.$slots["fixed-end"] ? (w(), o("div", hi, [j(e.$slots, "fixed-end", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-b2c39f78"]]), _i = ["aria-valuemax", "aria-valuenow"], vi = ["width", "height"], yi = { key: 0 }, bi = ["width", "height"], xi = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, Si = ["d"], Ci = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, wi = ["d"], Ti = ["d", "mask"], Ei = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, Di = ["d"], Oi = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, ki = ["d"], Ai = ["d"], ji = {
	key: 1,
	class: "mat-loader__linear-stop"
}, Mi = ["viewBox"], Ni = { class: "mat-loader__circular-linear-rotate" }, Pi = { class: "mat-loader__circular-rotate-arc" }, Fi = [
	"cx",
	"cy",
	"r"
], Ii = ["d"], Li = 4, Ri = 3, zi = 40, Bi = 1.6, Vi = 15, Hi = 4, Ui = .001, Wi = 100, Gi = 300, Ki = 900, qi = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
				let t = (e - o) / zi * Math.PI * 2, n = a - Math.sin(t - i) * r;
				l.push(`L ${c(e)} ${c(n)}`);
			}
			let u = (s - o) / zi * Math.PI * 2, d = a - Math.sin(u - i) * r;
			return l.push(`L ${c(s)} ${c(d)}`), l.join(" ");
		}
		function d(e, t, n, r) {
			let i = Math.max(1, Math.round(Math.PI * 2 * t / Vi)), a = i * 12, o = [];
			for (let s = 0; s <= a; s += 1) {
				let l = s / a, u = l * Math.PI * 2, d = l * Math.PI * 2 * i, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = s === 0 ? "M" : "L";
				o.push(`${h} ${c(p)} ${c(m)}`);
			}
			return o.push("Z"), o.join(" ");
		}
		let f = e, { colorStyle: p } = ke(r(() => f.color)), m = O(null), g = O(Wi), _ = O(+(f.shape === "wavy")), y = O(0), x = `mat-loader-linear-mask-${R()}`, C, T, E, D = r(() => i(f.max) ? f.max : 1), k = r(() => i(f.thickness) ? f.thickness : 4), A = r(() => f.variant === "circular"), j = r(() => f.shape === "wavy"), M = r(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), D.value);
		}), N = r(() => Number((M.value / D.value * 100).toFixed(3))), P = r(() => k.value + Ri * 2 * _.value), F = r(() => Math.min(100, k.value / g.value * 100)), I = r(() => {
			let e = g.value - k.value;
			return e <= 0 ? 1 : g.value / e;
		}), L = r(() => N.value === 100 ? 100 : Math.min(100, Math.max(N.value, F.value + Ui))), z = r(() => u(g.value, P.value, k.value, 0, 0)), V = r(() => u(g.value, P.value, k.value, Ri * _.value, y.value)), H = r(() => k.value + 36 + 8 * _.value), U = r(() => H.value / 2), W = r(() => U.value - k.value / 2 - Bi * _.value), G = r(() => `0 0 ${H.value} ${H.value}`), K = r(() => d(U.value, W.value, Bi * _.value, y.value)), q = r(() => {
			let e = Math.PI * 2 * W.value;
			return (Li + k.value) / e * 100;
		}), ee = r(() => Math.min(12, q.value)), te = r(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - N.value - q.value * 2).toFixed(3)), t = Number(Math.min(100, N.value + q.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${c(e)} ${c(100 - e)}`,
				strokeDashoffset: `-${c(t)}`
			};
		}), J = r(() => f.indeterminate ? {} : { strokeDasharray: `${c(N.value === 0 ? Ui : N.value)} 200` }), Y = r(() => ({
			...p.value,
			"--mat-loader-circular-gap-progress": c(ee.value),
			"--mat-loader-circular-radius": `${W.value}px`,
			"--mat-loader-circular-size": `${H.value}px`,
			"--mat-loader-indicator-gap-size": `${Li}px`,
			"--mat-loader-linear-cap-progress": c(F.value),
			"--mat-loader-linear-path-scale": c(I.value),
			"--mat-loader-linear-segment-end": c(L.value),
			"--mat-loader-linear-segment-end-position": `${c(L.value)}%`,
			"--mat-loader-linear-size": `${P.value}px`,
			"--mat-loader-progress": `${N.value}`,
			"--mat-loader-stop-indicator-size": `${Hi}px`,
			"--mat-loader-thickness": `${k.value}px`
		}));
		function X(e) {
			T = void 0;
			let t = E === void 0 ? 0 : Math.min(64, e - E), n = +!!j.value, r = n - _.value;
			if (E = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / Gi);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (y.value += t / Ki * Math.PI * 2, y.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? T = globalThis.requestAnimationFrame(X) : E = void 0;
		}
		function ne() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!j.value;
				return;
			}
			T === void 0 && (E = void 0, T = globalThis.requestAnimationFrame(X));
		}
		return B(j, ne), B(() => f.waveMotion, ne), S(() => {
			ne(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (C = new globalThis.ResizeObserver(([e]) => {
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
			style: Y.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": D.value,
			"aria-valuenow": e.indeterminate ? void 0 : M.value
		}), [A.value ? (w(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: G.value,
			"aria-hidden": "true"
		}, [s("g", Ni, [s("g", Pi, [s("circle", {
			class: "mat-loader__circular-track",
			cx: U.value,
			cy: U.value,
			r: W.value,
			pathLength: "100",
			style: v(te.value)
		}, null, 12, Fi), s("path", {
			class: "mat-loader__circular-active",
			d: K.value,
			pathLength: "100",
			style: v(J.value)
		}, null, 12, Ii)])])], 8, Mi)) : (w(), o("span", {
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
				e.indeterminate ? (w(), o("defs", yi, [s("mask", {
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
					s("g", xi, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: V.value,
						pathLength: "100"
					}, null, 8, Si)]),
					s("g", Ci, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: V.value,
						pathLength: "100"
					}, null, 8, wi)])
				], 8, bi)])) : a("", !0),
				e.indeterminate ? (w(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: z.value,
					pathLength: "100",
					mask: `url(#${x})`
				}, null, 8, Ti)) : a("", !0),
				e.indeterminate ? (w(), o(t, { key: 2 }, [s("g", Ei, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: V.value,
					pathLength: "100"
				}, null, 8, Di)]), s("g", Oi, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: V.value,
					pathLength: "100"
				}, null, 8, ki)])], 64)) : (w(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: V.value,
					pathLength: "100"
				}, null, 8, Ai))
			], 8, vi)),
			e.indeterminate ? a("", !0) : (w(), o("span", ji))
		], 512))], 16, _i));
	}
}), [["__scopeId", "data-v-09e887cb"]]), Ji = Symbol("mat-snackbar-externally-managed"), Yi = [], Xi = null;
function Zi() {
	Xi || Yi.length === 0 || (Xi = Yi.shift(), Xi.activate());
}
function Qi(e) {
	e === Xi || Yi.includes(e) || (Yi.push(e), Zi());
}
function $i(e) {
	let t = Yi.indexOf(e);
	t !== -1 && Yi.splice(t, 1);
}
function ea(e) {
	Xi === e && (Xi = null, Zi());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var ta = { class: "mat-snackbar__text" }, na = {
	key: 0,
	class: "mat-snackbar__controls"
}, ra = {
	key: 0,
	class: "mat-snackbar__action"
}, ia = {
	key: 1,
	class: "mat-snackbar__close"
}, aa = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let d = e, f = c, m = z(), _ = p(re, Q), v = p(Ne, null), y = p(Ji, !1), x = O(!1), C = O("closed"), T = O(!1), E = r(() => !!m.default || typeof d.text == "string" && d.text.trim().length > 0), D = r(() => !!m.action || typeof d.actionText == "string" && d.actionText.trim().length > 0), k = r(() => !!m.close || d.closable), A = r(() => D.value || k.value), M = O(0), N = r(() => v ? v.snackbarLayer.value : document.body), P = r(() => typeof d.closeLabel == "string" && d.closeLabel.trim().length > 0 ? d.closeLabel : "关闭"), L = !1, R, V, U = !1, W = null, G = r(() => ({ "--mat-snackbar-toolbar-clearance": `${M.value}px` }));
		function K() {
			M.value = lt();
		}
		let q = { activate: le };
		function ee() {
			R !== void 0 && (window.clearTimeout(R), R = void 0);
		}
		function te() {
			V !== void 0 && (window.clearTimeout(V), V = void 0);
		}
		function J() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Y(e, t) {
			if (te(), J()) {
				t();
				return;
			}
			V = window.setTimeout(() => {
				V = void 0, t();
			}, e);
		}
		function ne() {
			return Number.isFinite(d.duration) && d.duration >= 0 ? d.duration : 4e3;
		}
		function Z() {
			ee();
			let e = ne();
			e !== 0 && (R = window.setTimeout(() => {
				R = void 0, $();
			}, e));
		}
		function ie() {
			U || (U = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function ae() {
			x.value && (x.value = !1, C.value = "closed", f("closed"), y || ea(q));
		}
		function oe() {
			if (ee(), !x.value) {
				y || $i(q);
				return;
			}
			C.value !== "closing" && (C.value = "closing", Y(200, ae));
		}
		function se() {
			T.value || (T.value = !0, f("update:modelValue", !1));
		}
		function $() {
			se(), oe();
		}
		function ce() {
			!x.value || C.value === "closing" || ($(), f("action"));
		}
		async function le() {
			if (!L || !d.modelValue || T.value || !E.value) {
				E.value || (ie(), se()), y || ea(q);
				return;
			}
			ee(), te(), x.value = !0, C.value = "opening", await g(), !(!L || !x.value || C.value === "closing") && Y(400, () => {
				!x.value || C.value === "closing" || (C.value = "open", Z());
			});
		}
		function ue() {
			if (T.value || !E.value) {
				E.value || (ie(), $());
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
			Qi(q);
		}
		return S(() => {
			L = !0, v || (W = ut(K), K()), d.modelValue && ue();
		}), b(() => {
			L = !1, W?.(), W = null, ee(), te(), y || (x.value ? ea(q) : $i(q));
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
					$();
					return;
				}
				U = !1, d.modelValue && !x.value && !T.value && ue();
			}
		}), B(() => d.duration, () => {
			C.value === "open" && Z();
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
		}), [s("div", ta, [r.$slots.default ? j(r.$slots, "default", { key: 0 }, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(e.text), 1)], 64))]), A.value ? (w(), o("div", na, [D.value ? (w(), o("div", ra, [r.$slots.action ? j(r.$slots, "action", {
			key: 0,
			action: ce
		}, void 0, !0) : (w(), i(X, {
			key: 1,
			class: "mat-snackbar__default-action",
			"use-cursor": I(_).useCursor,
			onClick: ce
		}, {
			default: H(() => [l(F(e.actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : a("", !0), k.value ? (w(), o("div", ia, [r.$slots.close ? j(r.$slots, "close", {
			key: 0,
			close: $
		}, void 0, !0) : (w(), i(X, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": P.value,
			"use-cursor": I(_).useCursor,
			onClick: $
		}, {
			default: H(() => [u(je, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : a("", !0)])) : a("", !0)], 16)) : a("", !0)], 8, ["to"])) : a("", !0);
	}
}), [["__scopeId", "data-v-b1b76d2a"]]), oa = ["aria-orientation"], sa = { class: "mat-toolbar__surface" }, ca = { class: "mat-toolbar__content" }, la = 200, ua = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		function f(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let m = e, _ = L(), y = z(), x = d(), C = p(Ne, null), T = x?.vnode.props ?? {}, E = Object.prototype.hasOwnProperty.call(T, "attach"), D = O(m.modelValue), k = O(m.modelValue ? "open" : "closed"), A = O(null), M = O(null), N = O({
			blockSize: 0,
			inlineSize: 0
		}), F = r(() => c.includes(m.variant) ? m.variant === "floating" ? "floating-bottom" : m.variant : "docked"), R = r(() => [
			"start",
			"center",
			"end"
		].includes(m.position) ? m.position : "center"), V = r(() => F.value.startsWith("floating")), H = r(() => F.value === "floating-left" || F.value === "floating-right"), U = r(() => F.value === "docked" || F.value === "floating-bottom"), W = r(() => m.app && !!C && !E), G = r(() => {
			if (!m.app) return null;
			if (W.value) return V.value ? C.freeLayer.value : C.edgeLayer.value;
			if (typeof m.attach == "string") try {
				return document.querySelector(m.attach);
			} catch {
				return null;
			}
			return f(m.attach);
		}), K = r(() => u(m.bottomPlaceholder)), q = r(() => U.value ? K.value : "0px"), ee = r(() => [_.style, {
			"--mat-toolbar-app-end-inset": `${Y.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${Y.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": q.value
		}]), te = r(() => ({
			blockSize: `${N.value.blockSize}px`,
			inlineSize: `${N.value.inlineSize}px`
		})), J = r(() => [
			`mat-toolbar--${F.value}`,
			`mat-toolbar--position-${R.value}`,
			{
				"mat-toolbar--app": m.app,
				"mat-toolbar--app-root": W.value,
				"mat-toolbar--vertical": H.value,
				"mat-toolbar--vibrant": m.vibrant
			}
		]), Y = P(null), X, ne, Z = !1, Q = !1, re, ie = !1;
		function ae() {
			re !== void 0 && (window.clearTimeout(re), re = void 0);
		}
		function oe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function se(e) {
			if (ae(), oe()) {
				e();
				return;
			}
			re = window.setTimeout(() => {
				re = void 0, e();
			}, la);
		}
		function $() {
			ae(), D.value = !0, k.value = "opening", se(() => {
				D.value && m.modelValue && (k.value = "open");
			});
		}
		function ce() {
			if (ae(), !D.value) {
				k.value = "closed";
				return;
			}
			k.value = "closing", se(() => {
				m.modelValue || (D.value = !1, k.value = "closed");
			});
		}
		function le() {
			ie || !y.fab || V.value || (ie = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function ue() {
			let e = A.value?.getBoundingClientRect();
			e && (N.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, X?.update(), Y.value?.update());
		}
		function de() {
			if (!A.value) return null;
			let e = A.value.getBoundingClientRect(), t = M.value?.getBoundingClientRect();
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
		async function fe() {
			Q && (await g(), ue());
		}
		function pe() {
			ne?.disconnect(), ne = void 0, Z = !1, window.removeEventListener("resize", ue), X?.unregister(), X = void 0, Y.value?.unregister(), Y.value = null;
		}
		async function me() {
			if (await g(), Q) {
				if (!D.value || !A.value) {
					pe();
					return;
				}
				Z || (Z = !0, ne = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ue), ne?.observe(A.value), window.addEventListener("resize", ue)), W.value ? (X?.unregister(), X = void 0, !V.value && !Y.value && (Y.value = C.publicContext.registerEdge({
					edge: "bottom",
					element: A.value
				})), V.value && Y.value && (Y.value.unregister(), Y.value = null)) : (Y.value?.unregister(), Y.value = null, X ||= st(A.value, {
					getRect: de,
					isBottom: () => U.value
				})), M.value && ne?.observe(M.value), ue(), le();
			}
		}
		S(() => {
			Q = !0, he(), le(), me();
		}), b(() => {
			Q = !1, ae(), pe();
		}), B(() => m.modelValue, (e) => {
			if (Q) {
				if (e) {
					$();
					return;
				}
				ce();
			}
		}), B(D, me), B([
			F,
			R,
			K,
			() => m.app,
			() => m.attach,
			W
		], () => {
			he(), fe(), me();
		});
		function he() {
			m.app && !W.value && !G.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, c) => (w(), o(t, null, [e.placeholder && D.value && (!e.app || G.value) ? (w(), o("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: v(te.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: G.value ?? "body",
			disabled: !e.app
		}, [D.value && (!e.app || G.value) ? (w(), o("div", h({
			key: 0,
			ref_key: "toolbarElement",
			ref: A
		}, r.$attrs, {
			class: ["mat-toolbar", [J.value, `mat-toolbar--${k.value}`]],
			style: ee.value,
			role: "toolbar",
			"aria-orientation": H.value ? "vertical" : void 0
		}), [s("div", sa, [s("div", ca, [j(r.$slots, "default", {}, void 0, !0)])]), V.value && I(y).fab ? (w(), o("div", {
			key: 0,
			ref_key: "fabElement",
			ref: M,
			class: "mat-toolbar__fab"
		}, [j(r.$slots, "fab", {}, void 0, !0)], 512)) : a("", !0)], 16, oa)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-37090654"]]), da = Symbol("mat-panes"), fa = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], pa = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => fa.includes(e)
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
		function te(e, t) {
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
		function J(e) {
			return s.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), s.push(e), () => {
				let t = s.indexOf(e);
				t !== -1 && s.splice(t, 1);
			};
		}
		function Y() {
			let e = /* @__PURE__ */ new Set();
			s.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function X() {
			let e = {};
			return s.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function ne(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function Z() {
			m = void 0;
			let e = X();
			ne(v, e) || (v = e, i("update:widths", e));
		}
		function Q(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(Z, e ? 0 : 100);
		}
		function re() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				Q();
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
		return T(da, {
			getHandleAttributes: z,
			getPaneStyle: F,
			hasBoundary: L,
			handleKeyDown: te,
			handlePointerDown: K,
			handlePointerMove: q,
			isBoundaryActive: R,
			isHandleVisible: I,
			registerPane: J,
			finishPointerInteraction: ee
		}), B(() => s.map((e) => e.id), async () => {
			await g(), Y(), re(), Q();
		}, {
			flush: "post",
			immediate: !0
		}), B(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), S(() => {
			ae(!0), re(), Q(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", oe);
		}), b(() => {
			globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", oe), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), _ !== void 0 && globalThis.clearTimeout(_);
		}), (e, t) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-3c44b789"]]), ma = ["id"], ha = {
	key: 0,
	class: "mat-pane__separator"
}, ga = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], _a = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let n = e, i = p(da, null), c = O(null), l = r(() => n.resizeLabel), u, d = r(() => i?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = r(() => !!i?.hasBoundary(n.id)), m = r(() => !!i?.isHandleVisible(n.id)), g = r(() => i?.getHandleAttributes(n.id) ?? {}), v = r(() => !!i?.isBoundaryActive(n.id));
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
		}), [j(n.$slots, "default", {}, void 0, !0)], 16, ma), f.value ? (w(), o("div", ha, [m.value ? (w(), o("div", {
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
		}, null, 42, ga)) : a("", !0)])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-7d81b20c"]]), va = Symbol("mat-navigation-rail"), ya = ["aria-label"], ba = {
	key: 0,
	class: "mat-navigation-rail__header"
}, xa = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, Sa = {
	key: 1,
	class: "mat-navigation-rail__content"
}, Ca = {
	key: 2,
	class: "mat-navigation-rail__end"
}, wa = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		function f(e) {
			return typeof e == "number" && Number.isFinite(e) && e >= 0 ? `${e}px` : typeof e == "string" && l(e) ? e.trim() : "0px";
		}
		function m(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let y = e, x = c, C = p(re, Q), E = d(), D = p(Ne, null), k = E?.vnode.props ?? {}, A = Object.prototype.hasOwnProperty.call(k, "attach"), M = r(() => y.orientation === "horizontal"), N = r(() => y.expanded), F = r(() => !M.value && y.layout === "modal"), L = r(() => !M.value && y.hideOnCollapse && !y.expanded), R = r(() => y.app && !!D && !A), z = r(() => {
			if (!y.app) return null;
			if (R.value) return D.edgeLayer.value;
			if (typeof y.attach == "string") try {
				return document.querySelector(y.attach);
			} catch {
				return null;
			}
			return m(y.attach);
		}), V = r(() => y.expanded ? y.closeIcon : y.openIcon), U = r(() => y.expanded ? y.closeLabel : y.openLabel), W = r(() => ({
			"mat-navigation-rail-host--vertical": !M.value,
			"mat-navigation-rail-host--horizontal": M.value,
			"mat-navigation-rail-host--expanded": N.value,
			"mat-navigation-rail-host--collapsed": !y.expanded,
			[`mat-navigation-rail-host--${y.position}`]: !0,
			"mat-navigation-rail-host--modal": F.value,
			"mat-navigation-rail-host--hidden": L.value,
			"mat-navigation-rail-host--app": y.app,
			"mat-navigation-rail-host--app-root": R.value
		})), G = r(() => ({
			"mat-navigation-rail--expanded": N.value,
			"mat-navigation-rail--collapsed": !y.expanded,
			"mat-navigation-rail--bar": M.value,
			"mat-navigation-rail--modal": F.value && y.expanded,
			"mat-navigation-rail--hidden": L.value,
			"mat-navigation-rail--app": y.app,
			"mat-navigation-rail--app-root": R.value
		})), K = r(() => {
			if (y.width !== void 0) return { "--mat-navigation-rail-expanded-width": typeof y.width == "number" ? `${y.width}px` : y.width };
		}), q = r(() => y.app && !R.value ? f(y.bottomPlaceholder) : "0px"), ee = r(() => [K.value, {
			"--mat-navigation-rail-app-end-inset": `${Z.value?.insets.end ?? 0}px`,
			"--mat-navigation-rail-app-start-inset": `${Z.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-bottom-placeholder": q.value
		}]), te = O(null), J = O(null), Y = O({
			blockSize: 0,
			inlineSize: 0
		}), ne = r(() => ({
			blockSize: `${Y.value.blockSize}px`,
			inlineSize: `${Y.value.inlineSize}px`
		})), Z = P(null), ie;
		function ae() {
			let e = te.value?.getBoundingClientRect();
			e && (Y.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, Z.value?.update());
		}
		async function oe() {
			ie?.disconnect(), ie = void 0, Z.value?.unregister(), Z.value = null, await g(), !(!y.app || !te.value) && (ie = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ae), ie?.observe(te.value), R.value && (Z.value = D.publicContext.registerEdge({
				edge: M.value ? "bottom" : y.position,
				element: te.value
			})), ae());
		}
		function se() {
			y.app && !R.value && !z.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		function $(e) {
			return e !== void 0 && Object.is(y.modelValue, e);
		}
		function ce(e) {
			e === void 0 || Object.is(y.modelValue, e) || x("update:modelValue", e);
		}
		function le() {
			x("update:expanded", !y.expanded);
		}
		function ue() {
			x("update:expanded", !1);
		}
		function de(e) {
			e.key === "Escape" && F.value && y.expanded && ue();
		}
		return T(va, {
			expanded: N,
			isSelected: $,
			orientation: r(() => y.orientation),
			position: r(() => y.position),
			requestSelection: ce,
			useCursor: C.useCursor
		}), S(() => {
			window.addEventListener("keydown", de), se(), oe();
		}), b(() => {
			window.removeEventListener("keydown", de), ie?.disconnect(), Z.value?.unregister();
		}), B([
			() => y.app,
			() => y.attach,
			() => y.bottomPlaceholder,
			() => y.expanded,
			() => y.hideOnCollapse,
			() => y.layout,
			() => y.orientation,
			() => y.width,
			R
		], () => {
			se(), oe();
		}), (r, c) => (w(), o(t, null, [e.app && z.value && e.placeholder ? (w(), o("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(ne.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: z.value ?? "body",
			disabled: !e.app
		}, [!e.app || z.value ? (w(), o("div", {
			key: 0,
			ref_key: "hostElement",
			ref: te,
			class: _(["mat-navigation-rail-host", W.value]),
			style: v(ee.value)
		}, [F.value && e.expanded ? (w(), o("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": e.closeLabel,
			onClick: ue
		}, null, 8, ya)) : a("", !0), s("nav", h({
			ref_key: "railElement",
			ref: J
		}, r.$attrs, { class: ["mat-navigation-rail", G.value] }), [
			M.value ? a("", !0) : (w(), o("div", ba, [
				L.value ? a("", !0) : j(r.$slots, "header", {
					key: 0,
					expanded: e.expanded
				}, void 0, !0),
				e.collapsible ? (w(), i(X, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": e.expanded,
					"aria-label": U.value,
					"focus-ring": !1,
					"use-cursor": I(C).useCursor,
					onClick: le
				}, {
					default: H(() => [u(je, {
						icon: V.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : a("", !0),
				r.$slots.fab && !L.value ? (w(), o("div", xa, [j(r.$slots, "fab", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
			])),
			L.value ? a("", !0) : (w(), o("div", Sa, [s("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${e.alignment}`]) }, [j(r.$slots, "default", {
				expanded: N.value,
				orientation: e.orientation
			}, void 0, !0)], 2)])),
			r.$slots.end && !L.value && !M.value ? (w(), o("div", Ca, [j(r.$slots, "end", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
		], 16)], 6)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-5ca2ce69"]]), Ta = { class: "mat-navigation-rail-item__indicator" }, Ea = { class: "mat-navigation-rail-item__icon-wrap" }, Da = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, Oa = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, ka = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, l = z(), u = p(re, Q), d = p(va, null), f = r(() => d?.expanded.value ?? !1), m = r(() => d?.orientation.value === "horizontal"), g = r(() => d?.position.value ?? "start"), _ = r(() => f.value), v = r(() => d?.isSelected(n.value) ?? !1), y = r(() => !!(n.icon || l.icon)), b = r(() => ({
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
		return (t, n) => (w(), i(X, h(t.$attrs, {
			class: ["mat-navigation-rail-item", b.value],
			"aria-current": v.value ? "page" : void 0,
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			"use-cursor": I(u).useCursor,
			onClick: x
		}), {
			default: H(() => [s("span", Ta, [s("span", Ea, [I(l).icon ? j(t.$slots, "icon", {
				key: 0,
				selected: v.value
			}, void 0, !0) : y.value ? (w(), i(je, {
				key: 1,
				fill: +!!v.value,
				icon: e.icon,
				class: "mat-navigation-rail-item__icon",
				"aria-hidden": "true"
			}, null, 8, ["fill", "icon"])) : a("", !0)]), _.value ? (w(), o("span", Da, [j(t.$slots, "default", {}, void 0, !0)])) : a("", !0)]), _.value ? a("", !0) : (w(), o("span", Oa, [j(t.$slots, "default", {}, void 0, !0)]))]),
			_: 3
		}, 16, [
			"class",
			"aria-current",
			"disabled",
			"href",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-59b42c01"]]), Aa = /* @__PURE__ */ new WeakMap();
function ja(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function Ma(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = ja(t.value), i = new IntersectionObserver((t, r) => {
		let i = Aa.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), Aa.delete(e));
	}, r);
	Aa.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function Na(e) {
	let t = Aa.get(e);
	t && (t.observer.unobserve(e), Aa.delete(e));
}
var Pa = {
	mounted: Ma,
	updated(e, t) {
		Aa.has(e) && (Na(e), Ma(e, t));
	},
	unmounted: Na
}, Fa = Q, Ia = null;
function La(e, t) {
	Fa = e, Ia = t;
}
function Ra() {
	return Fa;
}
function za() {
	return Ia;
}
//#endregion
//#region src/theme.js
var Ba = "#20a6fc", Va = "(prefers-color-scheme: dark)";
function Ha(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function Ua(e) {
	if (!ge.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function Wa(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function Ga(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function Ka(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function qa(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? Ba, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	Ha(t), Ka(n), Ua(r), Wa(i), Ga(a);
	let o = O(t), s = O(Se(n)), c = O(r), l = O(i), u = O("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(Va)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = Ce({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(_e).forEach(([t, n]) => {
			a.style.setProperty(`--mat-sys-color-${n}`, J(e[t]));
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
		Ha(e), o.value = e, y(), g();
	}
	function x(e) {
		Ka(e), s.value = Se(e), g();
	}
	function S(e) {
		Ua(e), c.value = e, g();
	}
	function C(e) {
		Wa(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(_e).forEach((e) => {
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
var Ja = [
	[
		"MatAppRoot",
		"mat-app-root",
		wt
	],
	[
		"MatBtn",
		"mat-btn",
		yt
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		Dt
	],
	[
		"MatFab",
		"mat-fab",
		Pt
	],
	[
		"MatIcon",
		"mat-icon",
		je
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		It
	],
	[
		"MatCard",
		"mat-card",
		Wt
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		Kt
	],
	[
		"MatCardContent",
		"mat-card-content",
		Jt
	],
	[
		"MatCardActions",
		"mat-card-actions",
		Xt
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		zt
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		Ut
	],
	[
		"MatCardMedia",
		"mat-card-media",
		Vt
	],
	[
		"MatList",
		"mat-list",
		an
	],
	[
		"MatListGroup",
		"mat-list-group",
		vn
	],
	[
		"MatListItem",
		"mat-list-item",
		hn
	],
	[
		"MatDivider",
		"mat-divider",
		Tn
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		jn
	],
	[
		"MatRadio",
		"mat-radio",
		Nn
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		In
	],
	[
		"MatSwitch",
		"mat-switch",
		Ln
	],
	[
		"MatSlider",
		"mat-slider",
		fr
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		gr
	],
	[
		"MatTextField",
		"mat-text-field",
		Fr
	],
	[
		"MatTextarea",
		"mat-textarea",
		Ir
	],
	[
		"MatInputBase",
		"mat-input-base",
		_r
	],
	[
		"MatMenu",
		"mat-menu",
		zr
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		Vr
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		Wr
	],
	[
		"MatDialog",
		"mat-dialog",
		ni
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		li
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		ui
	],
	[
		"MatHover",
		"mat-hover",
		Me
	],
	[
		"MatContainer",
		"mat-container",
		fi
	],
	[
		"MatSpacer",
		"mat-spacer",
		pi
	],
	[
		"MatScrollArea",
		"mat-scroll-area",
		gi
	],
	[
		"MatLoader",
		"mat-loader",
		qi
	],
	[
		"MatTooltip",
		"mat-tooltip",
		mt
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		aa
	],
	[
		"MatToolbar",
		"mat-toolbar",
		ua
	],
	[
		"MatPanes",
		"mat-panes",
		pa
	],
	[
		"MatPane",
		"mat-pane",
		_a
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		wa
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		ka
	]
];
function Ya(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function Xa(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? Q.iconClass;
}
function Za(e, t) {
	let n = e[t];
	if (n === void 0) return Z[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function Qa(e) {
	let t = e.tooltip;
	if (t === void 0) return Z;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi tooltip 必须是对象");
	return Object.freeze({
		openDelay: Za(t, "openDelay"),
		skipDelayDuration: Za(t, "skipDelayDuration")
	});
}
function $a(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: Xa(e),
		tooltip: Qa(e),
		useCursor: Ya(e, "useCursor")
	}), n = qa(e.theme);
	return {
		theme: n,
		install(e) {
			Ja.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r);
			}), e.directive("intersection", Pa), e.provide(re, t), e.provide(Ee, n), La(t, n);
		}
	};
}
function eo() {
	let e = p(Ee, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mdu-ui 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var to = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, no = /*#__PURE__*/ Y(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		T(re, Ra());
		let s = za();
		s && T(Ee, s);
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
		return (n, r) => (w(), i(ni, h({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: H(() => [u(pi), (w(!0), o(t, null, A(e.options.actions, (t, n) => (w(), i(yt, {
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
			default: H(() => [p.value ? (w(), o(t, { key: 0 }, [e.options.content ? (w(), o("p", to, F(e.options.content), 1)) : a("", !0), u(Fr, {
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
}), [["__scopeId", "data-v-217b4d5a"]]), ro = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], io = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], ao = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function oo(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function so() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function co(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function lo(e) {
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
function uo(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !ro.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function fo(e) {
	if (co(e), io.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), ao.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !oo(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(uo),
		attach: lo(e.attach)
	};
	return [
		...io,
		...ao,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function po(e, t) {
	try {
		so();
		let n = fo(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				k(f(no, {
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
function mo(e = {}) {
	return po(e, void 0);
}
function ho(e = {}) {
	try {
		if (co(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return po({
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
function go(e = {}) {
	try {
		co(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return po({
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
function _o(e = {}) {
	try {
		co(e);
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
		return po({
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
var vo = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		T(re, Ra()), T(Ji, !0);
		let n = za();
		n && T(Ee, n);
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
		return (e, t) => (w(), i(aa, h({
			modelValue: a.value,
			"onUpdate:modelValue": t[0] ||= (e) => a.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), yo = [
	"left",
	"center",
	"right"
], bo = null;
function xo() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function So(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function Co(e) {
	if (So(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !yo.includes(e.position)) throw TypeError("snackbar position 无效");
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
function wo() {
	return bo?.isConnected ? bo : (bo = document.createElement("div"), bo.dataset.matSnackbarHost = "", document.body.append(bo), bo);
}
function To() {
	!bo || bo.childNodes.length > 0 || (bo.remove(), bo = null);
}
function Eo(e) {
	try {
		xo();
		let t = Co(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = bo;
				t && k(null, t), e(), ea(i), To();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = bo;
				t && k(null, t), n(e), ea(i), To();
			}
			i = { activate() {
				try {
					let e = wo();
					k(f(vo, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, Qi(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var Do = Eo;
//#endregion
export { Pa as Intersection, wt as MatAppRoot, li as MatBottomSheet, yt as MatBtn, Dt as MatBtnGroup, Wt as MatCard, Kt as MatCardActionArea, Xt as MatCardActions, Jt as MatCardContent, zt as MatCardHeadline, Vt as MatCardMedia, Ut as MatCardSubhead, jn as MatCheckbox, fi as MatContainer, ni as MatDialog, Tn as MatDivider, Pt as MatFab, Me as MatHover, je as MatIcon, _r as MatInputBase, an as MatList, vn as MatListGroup, hn as MatListItem, qi as MatLoader, zr as MatMenu, Vr as MatMenuGroup, Wr as MatMenuItem, wa as MatNavigationRail, ka as MatNavigationRailItem, _a as MatPane, pa as MatPanes, Nn as MatRadio, In as MatRadioGroup, gr as MatRangeSlider, gi as MatScrollArea, ui as MatSideSheet, fr as MatSlider, aa as MatSnackbar, pi as MatSpacer, It as MatSplitBtn, Ln as MatSwitch, Fr as MatTextField, Ir as MatTextarea, ua as MatToolbar, mt as MatTooltip, ho as alert, go as confirm, $a as createMatUi, mo as dialog, _o as prompt, Eo as snackbar, Do as toast, Pe as useMatApp, eo as useMatTheme };
