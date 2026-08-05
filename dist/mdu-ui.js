import { Comment as e, Fragment as t, Teleport as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, getCurrentInstance as d, h as f, inject as p, isVNode as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, onUpdated as x, openBlock as S, provide as C, reactive as w, readonly as T, ref as E, render as D, renderList as O, renderSlot as k, resolveDynamicComponent as A, shallowReactive as j, shallowRef as M, toDisplayString as N, unref as P, useAttrs as ee, useId as F, useSlots as I, watch as L, watchEffect as R, withCtx as z, withModifiers as B } from "vue";
import { Hct as V, SchemeExpressive as H, SchemeNeutral as U, SchemeTonalSpot as W, SchemeVibrant as G, argbFromHex as te, hexFromArgb as ne } from "@material/material-color-utilities";
//#region \0plugin-vue:export-helper
var K = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, q = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let a = e, o = n, s = r(() => a.href !== void 0), c = r(() => s.value ? "a" : a.as), l = r(() => c.value === "button"), u = E(!1), d = E(null), f = 0, p;
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
		}), y(m), t({ root: d }), (t, n) => (S(), i(A(c.value), h({
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
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-04ce13e2"]]), J = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		return (t, r) => (S(), i(q, h(t.$attrs, {
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
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-pressed",
			"disabled",
			"type"
		]));
	}
}), [["__scopeId", "data-v-04ffd7cb"]]), Y = Object.freeze({
	openDelay: 0,
	skipDelayDuration: 0
}), X = Object.freeze({
	iconClass: "material-symbols-outlined",
	tooltip: Y,
	useCursor: !1
}), Z = Symbol("mdu-ui-options"), re = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], Q = ["round", "square"], ie = [
	"button",
	"submit",
	"reset"
], ae = [
	"primary",
	"secondary",
	"tertiary",
	"error"
];
function $(e) {
	return e === void 0 || ae.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var oe = Object.freeze({
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
}), se = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function ce(e) {
	return typeof e == "string" && (Object.hasOwn(oe, e) || se.test(e));
}
function le(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function ue(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function de(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function fe(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function pe(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var me = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], he = {
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
}, ge = {
	"tonal-spot": W,
	neutral: U,
	vibrant: G,
	expressive: H
}, _e = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], ve = 64, ye = /* @__PURE__ */ new Map();
function be(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function xe({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = ge[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(V.fromInt(te(be(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function Se(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, ne(e[t])])));
}
function Ce(e, t = "tonal-spot", n = 0) {
	let r = be(e), i = `${r}|${t}|${n}|2025|phone`, a = ye.get(i);
	if (a) return ye.delete(i), ye.set(i, a), a;
	let o = Object.freeze({
		light: Se(xe({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), _e),
		dark: Se(xe({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), _e)
	});
	if (ye.set(i, o), ye.size > ve) {
		let e = ye.keys().next().value;
		ye.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var we = Symbol("mdu-ui-theme"), Te = "tonal-spot", Ee = 0;
function De(e) {
	let t = p(we, null), n = r(() => P(e) !== void 0);
	return {
		colorStyle: r(() => {
			let n = P(e);
			if (!n || !$(n)) return {};
			if (ae.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			let r = Ce(n, t?.schemeVariant.value ?? Te, t?.contrastLevel.value ?? Ee);
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
var Oe = ["src"], ke = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
			validator: ce
		},
		fill: {
			type: Number,
			default: 0,
			validator: ue
		},
		weight: {
			type: Number,
			default: 400,
			validator: de
		},
		grade: {
			type: Number,
			default: 0,
			validator: fe
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: pe
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
			validator: le
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = e, a = p(Z, X), { colorStyle: s, hasExplicitColor: c } = De(r(() => n.color)), u = r(() => n.iconClass ?? a.iconClass), d = r(() => n.icon !== void 0), f = r(() => oe[n.size]?.fontSize ?? n.size), m = r(() => n.opticalSize ?? oe[n.size]?.opticalSize ?? 24), g = r(() => ({
			...s.value,
			"--mat-icon-size": f.value,
			color: n.fontColor ?? (c.value ? "var(--mat-accent-color)" : "currentColor"),
			fontVariationSettings: `'FILL' ${n.fill}, 'wght' ${n.weight}, 'GRAD' ${n.grade}, 'opsz' ${m.value}`
		}));
		return (n, r) => (S(), i(A(e.as), h(n.$attrs, {
			class: ["mat-icon", u.value],
			style: g.value
		}), {
			default: z(() => [e.src === void 0 ? d.value ? (S(), o(t, { key: 1 }, [l(N(e.icon), 1)], 64)) : k(n.$slots, "default", { key: 2 }, void 0, !0) : (S(), o("img", {
				key: 0,
				class: "mat-icon__image",
				src: e.src,
				alt: ""
			}, null, 8, Oe))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-a72d28ee"]]), Ae = /*@__PURE__*/ Object.assign({
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
		let n = e, i = t, o = I(), s = d()?.vnode.props ?? {}, c = Object.prototype.hasOwnProperty.call(s, "modelValue") || Object.prototype.hasOwnProperty.call(s, "model-value"), l = E(!1), u = E(null), f = M(null), p = r(() => c ? n.modelValue : u.value), m, h = null;
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
		function T(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? T(e.value) : "$el" in e ? T(e.$el) : null : null;
		}
		function D() {
			if (typeof n.target != "string") return T(n.target);
			try {
				return T(document.querySelector(n.target));
			} catch {
				return null;
			}
		}
		function O() {
			h &&= (h(), null);
		}
		function A() {
			let e = D();
			e !== f.value && (O(), f.value = e, e && (e.addEventListener("mouseenter", C), e.addEventListener("mouseleave", w), h = () => {
				e.removeEventListener("mouseenter", C), e.removeEventListener("mouseleave", w);
			}));
		}
		let j = {
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
			g(), O();
		}), (e, t) => P(o).default ? k(e.$slots, "default", {
			key: 0,
			isHovering: p.value,
			props: j
		}) : a("", !0);
	}
}), je = Symbol("mat-app-root");
function Me() {
	let e = p(je, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var Ne = [
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
], Pe = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function Fe(e) {
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
function Ie(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function Le(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function Re(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function ze(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function Be(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: Ie(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: Le(t, n, r)
	};
}
function Ve(e) {
	return [
		e,
		Pe[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== Pe[e])
	];
}
function He(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function Ue(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function We(e, t, n, r, i, a, o, s) {
	let c = Be(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: Re(c.left, a, l),
		top: Re(c.top, a, u)
	}, f = He(d, r);
	return Ue(f, n) || s.some((e) => Ue(f, Fe(e))) ? null : d;
}
function Ge({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = Fe(i), c = Fe(a), [l, u = "center"] = (Ne.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = ze(l, s, o, r, t), m = Pe[l], h = ze(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = Ve(g), b = e.map((e) => Fe(e)), x = y.find((e) => ze(e, s, o, r, t) >= f && We(e, d, s, c, o, r, t, b)) ?? y.find((e) => We(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = Be(x, d, s, c, t);
	return {
		left: Math.round(Re(C.left, r, _)),
		location: S,
		top: Math.round(Re(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var Ke = null, qe = /* @__PURE__ */ new WeakMap();
function Je(e) {
	Ke && Ke !== e && Ke.close(), Ke = e;
}
function Ye(e) {
	Ke === e && (Ke = null);
}
function Xe(e, t) {
	e && qe.set(e, {
		owner: t,
		expiresAt: Infinity
	});
}
function Ze(e, t, n) {
	if (!e) return;
	let r = qe.get(e);
	if (!(!r || r.owner !== t)) {
		if (n <= 0) {
			qe.delete(e);
			return;
		}
		r.expiresAt = Date.now() + n;
	}
}
function Qe(e, t) {
	if (!e) return !1;
	let n = qe.get(e);
	return !n || n.owner === t ? !1 : n.expiresAt < Date.now() ? (qe.delete(e), !1) : !0;
}
//#endregion
//#region src/components/toolbar-overlay.js
var $e = /* @__PURE__ */ new Map(), et = /* @__PURE__ */ new Set(), tt = 0;
function nt(e) {
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
function rt() {
	et.forEach((e) => e());
}
function it() {
	$e.forEach((e, t) => {
		e.element.isConnected || $e.delete(t);
	});
}
function at(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = tt;
	tt += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return $e.set(n, r), rt(), {
		unregister() {
			i && (i = !1, $e.delete(n), rt());
		},
		update() {
			i && rt();
		}
	};
}
function ot() {
	return it(), [...$e.values()].flatMap((e) => {
		try {
			return [nt(e.getRect())];
		} catch {
			return [];
		}
	});
}
function st(e = window.innerHeight) {
	it();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...$e.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - nt(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function ct(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return et.add(e), e(), () => {
		et.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var lt = ["id", "data-location"], ut = 1500, dt = 150, ft = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return Ne.includes(e);
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
		let u = e, f = c, m = ee(), _ = I(), v = d(), C = p(Z, X), w = p(je, null), T = E(null), D = M(null), O = { value: D }, A = M(null), j = E(!1), R = E(null), z = E(!1), B = E(!1), V = E(!1), H = E("closed"), U = E("top"), W = E({}), G = E(!1), te = `${F().replace(/[^\w-]/g, "-")}-tooltip`, ne = r(() => typeof m.id == "string" ? m.id : te), K = r(() => u.content === void 0 ? !!_.default : u.content.length > 0), q = r(() => !!_.activator), J = v?.vnode.props ?? {}, Y = Object.prototype.hasOwnProperty.call(J, "modelValue") || Object.prototype.hasOwnProperty.call(J, "model-value"), re, Q, ie, ae, $ = !1, oe, se, ce = null, le = null, ue = null, de = null, fe = null, pe = !1, me = !1, he = !1, ge = !1, _e = null, ve = { close: nt }, ye = Symbol("mat-tooltip-delay-group-owner");
		function be(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? be(e.value) : "$el" in e ? be(e.$el) : null : null;
		}
		function xe(e) {
			try {
				return be(document.querySelector(e));
			} catch {
				return null;
			}
		}
		function Se() {
			return typeof u.target == "string" ? xe(u.target) : be(u.target);
		}
		function Ce() {
			let e = T.value ? [...T.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function we() {
			return q.value ? Ce() : Se();
		}
		function Te() {
			return Ee() ? typeof u.attach == "string" ? xe(u.attach) : be(u.attach) : ke() || (w?.rootElement.value?.contains(D.value) && w.freeLayer.value ? w.freeLayer.value : document.body);
		}
		function Ee() {
			let e = v?.vnode.props ?? {};
			return Object.prototype.hasOwnProperty.call(e, "attach");
		}
		function De(e) {
			if (!e.hasAttribute("popover")) return !1;
			try {
				return e.matches(":popover-open") || e.hasAttribute("data-popover-open");
			} catch {
				return e.hasAttribute("data-popover-open");
			}
		}
		function Oe(e) {
			return e.localName === "dialog" && e.hasAttribute("open") || De(e);
		}
		function ke() {
			let e = D.value;
			for (; e;) {
				if (Oe(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function Me() {
			let e = u.openDelay ?? C.tooltip.openDelay, t = typeof e == "string" ? Number(e) : e;
			return !Number.isFinite(t) || t < 0 ? 0 : t;
		}
		function Ne() {
			return D.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function Pe() {
			Q !== void 0 && (window.clearTimeout(Q), Q = void 0);
		}
		function Fe() {
			re !== void 0 && (window.clearTimeout(re), re = void 0);
		}
		function Ie() {
			ie !== void 0 && (window.clearTimeout(ie), ie = void 0);
		}
		function Le() {
			oe !== void 0 && (window.cancelAnimationFrame(oe), oe = void 0);
		}
		function Re() {
			Le(), B.value && (oe = window.requestAnimationFrame(() => {
				if (oe = void 0, B.value) {
					if (D.value && !D.value.isConnected) {
						tt({ immediate: !0 });
						return;
					}
					Re();
				}
			}));
		}
		function ze() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Be(e, t) {
			if (Ie(), ze()) {
				t();
				return;
			}
			ie = window.setTimeout(() => {
				ie = void 0, t();
			}, e);
		}
		function Ve() {
			ae !== void 0 && ($ ? window.cancelAnimationFrame(ae) : window.clearTimeout(ae), ae = void 0, $ = !1);
		}
		function He() {
			de && (fe === null ? de.removeAttribute("aria-describedby") : de.setAttribute("aria-describedby", fe), de = null, fe = null);
		}
		function Ue() {
			let e = D.value;
			if (!B.value || !e || de === e) return;
			He(), de = e, fe = e.getAttribute("aria-describedby");
			let t = (fe ?? "").split(/\s+/).filter(Boolean);
			t.includes(ne.value) || t.push(ne.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function We() {
			Ve(), se?.disconnect(), se = void 0, le &&= (le(), null), ue &&= (ue(), null);
		}
		function Ke() {
			if (!B.value || !D.value || !R.value) return;
			let e = j.value ? w.getLayoutRect() : null, t = D.value.getBoundingClientRect(), n = e ? {
				bottom: t.bottom - e.top,
				height: t.height,
				left: t.left - e.left,
				right: t.right - e.left,
				top: t.top - e.top,
				width: t.width
			} : t, r = w?.publicContext.layout, i = e ? [
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
			] : ot(), a = Ge({
				location: u.location,
				targetRect: n,
				tooltipRect: R.value.getBoundingClientRect(),
				avoidRects: i,
				viewport: e ? {
					height: r.size.height,
					width: r.size.width
				} : {
					height: window.innerHeight,
					width: window.innerWidth
				}
			});
			U.value = a.location, W.value = {
				left: `${a.left}px`,
				top: `${a.top}px`
			}, V.value = !0;
		}
		function qe() {
			if (!B.value || ae !== void 0) return;
			let e = () => {
				ae = void 0, $ = !1, Ke();
			};
			if (typeof window.requestAnimationFrame == "function") {
				$ = !0, ae = window.requestAnimationFrame(e);
				return;
			}
			ae = window.setTimeout(e, 0);
		}
		function $e() {
			le || (window.addEventListener("resize", qe), document.addEventListener("scroll", qe, !0), le = () => {
				window.removeEventListener("resize", qe), document.removeEventListener("scroll", qe, !0);
			}, ue = ct(qe), typeof ResizeObserver < "u" && (se = new ResizeObserver(qe), se.observe(D.value), se.observe(R.value)));
		}
		function et() {
			z.value = !1, H.value = "closed", B.value = !1, V.value = !1, A.value = null, j.value = !1;
		}
		function tt({ immediate: e = !1 } = {}) {
			if (Pe(), Fe(), Le(), We(), He(), Ye(ve), !z.value) {
				et();
				return;
			}
			if (!(!e && H.value === "closing")) {
				if (e) {
					Ie(), et();
					return;
				}
				B.value = !1, H.value = "closing", Be(dt, et);
			}
		}
		function nt() {
			Y && (G.value = !0, f("update:modelValue", !1)), tt();
		}
		function rt() {
			ge || (ge = !0, console.warn(q.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function it({ warn: e = !0 } = {}) {
			let t = we();
			if (!t && B.value && tt({ immediate: !0 }), t === D.value) {
				!t && K.value && e && rt();
				return;
			}
			let n = D.value !== null;
			He(), _t(), D.value = t, ge = !1, !t && K.value && e && rt(), vt(), n && B.value && nt();
		}
		function at() {
			if (Fe(), Y || B.value || G.value || !K.value) return;
			let e = Qe(Ne(), ye) ? 0 : Me();
			if (e === 0) {
				yt();
				return;
			}
			Q === void 0 && (Q = window.setTimeout(() => {
				Q = void 0, yt();
			}, e));
		}
		function st() {
			Pe(), !(Y || !B.value || me || he) && re === void 0 && (re = window.setTimeout(() => {
				re = void 0, nt();
			}, ut));
		}
		function ft() {
			if (me || he) {
				at();
				return;
			}
			Ze(_e, ye, C.tooltip.skipDelayDuration), st();
		}
		function pt(e) {
			me = e, ft();
		}
		function mt() {
			he = !0, ft();
		}
		function ht(e) {
			D.value?.contains(e.relatedTarget) || (he = !1, ft());
		}
		function gt(e) {
			e.key === "Escape" && (e.preventDefault(), nt());
		}
		function _t() {
			ce && (ce(), ce = null, me = !1, he = !1);
		}
		function vt() {
			let e = D.value;
			e && (e.addEventListener("keydown", gt), !Y && K.value && (e.addEventListener("focusin", mt), e.addEventListener("focusout", ht)), ce = () => {
				e.removeEventListener("keydown", gt), e.removeEventListener("focusin", mt), e.removeEventListener("focusout", ht);
			});
		}
		async function yt() {
			if (G.value || !K.value) return;
			if (it({ warn: !0 }), !D.value) {
				nt();
				return;
			}
			let e = Te();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), nt();
				return;
			}
			Pe(), Fe(), Ie(), Je(ve), _e = Ne(), Xe(_e, ye), A.value = e, j.value = e === w?.freeLayer.value, U.value = u.location, W.value = {
				left: "0px",
				top: "0px"
			}, V.value = !1, H.value = "opening", z.value = !0, B.value = !0, await g(), B.value && (Ue(), Ke(), $e(), Re());
		}
		return b(async () => {
			pe = !0, it({ warn: !1 }), await g(), pe && (it({ warn: !1 }), Y && u.modelValue && yt());
		}), x(() => {
			it({ warn: !1 }), B.value && qe();
		}), y(() => {
			pe = !1, Ie(), Le(), _t(), B.value && tt({ immediate: !0 });
		}), L(() => u.modelValue, (e) => {
			if (!(!pe || !Y)) {
				if (e) {
					G.value = !1, yt();
					return;
				}
				G.value = !1, tt();
			}
		}), L([() => u.content, () => u.target], async () => {
			await g();
			let e = D.value;
			it({ warn: !1 }), D.value === e && (_t(), vt()), K.value || nt();
		}), L(() => u.attach, async () => {
			if (!B.value) return;
			let e = Te();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), nt();
				return;
			}
			A.value = e, j.value = e === w?.freeLayer.value, await g(), qe();
		}), L(() => u.location, () => {
			B.value && qe();
		}), L(ne, () => {
			!B.value || !de || (He(), Ue());
		}), w && L(w.publicContext.layout, qe), (r, c) => (S(), o(t, null, [
			!P(Y) && K.value ? (S(), i(Ae, {
				key: 0,
				target: O,
				"onUpdate:modelValue": pt
			})) : a("", !0),
			q.value || !e.target ? (S(), o("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: T,
				class: "mat-tooltip__activator"
			}, [k(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			z.value && A.value ? (S(), i(n, {
				key: 2,
				to: A.value
			}, [s("span", h(r.$attrs, {
				id: ne.value,
				ref_key: "tooltipElement",
				ref: R,
				class: ["mat-tooltip", [`mat-tooltip--${H.value}`, {
					"mat-tooltip--app-root": j.value,
					"mat-tooltip--positioned": V.value
				}]],
				"data-location": U.value,
				style: [W.value, r.$attrs.style],
				role: "tooltip"
			}), [e.content === void 0 ? k(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.content), 1)], 64))], 16, lt)], 8, ["to"])) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-dd275340"]]), pt = Symbol("mdu-ui-button-group"), mt = Symbol("mdu-ui-split-button");
//#endregion
//#region src/components/use-button.js
function ht(e, t) {
	let n = p(Z, X), i = p(pt, null), a = p(mt, null), o = r(() => a?.size.value ?? e.size ?? i?.size.value ?? "small"), s = r(() => a ? "round" : e.shape ?? i?.shape.value ?? "round"), c = r(() => a?.variant.value ?? e.variant), l = r(() => a?.color.value ?? e.color ?? i?.color.value), u = r(() => e.disabled || !!a?.disabled.value || !!i?.disabled.value), d = r(() => !!(i && i.selection.value !== "none")), f = r(() => a?.role === "trailing" ? a.expanded.value : d.value ? i.isSelected(e.value) : e.selected), m = r(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = De(l);
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
var gt = {
	key: 2,
	class: "mat-btn__label"
}, _t = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return re.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return Q.includes(e);
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
				return ie.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let s = e, c = n, u = ee(), d = I(), f = E(null), p = F(), { colorStyle: g, effectiveDisabled: _, effectiveSelected: v, effectiveShape: y, effectiveSize: x, effectiveToggle: C, effectiveVariant: w, handleClick: T, hasExplicitColor: D, split: O, useCursor: A } = ht(s, c), j = r(() => C.value && w.value !== "text"), M = r(() => j.value && v.value), L = r(() => s.icon === !0 || typeof s.icon == "string" && s.icon.trim().length > 0), B = r(() => s.fill === void 0 ? +!!M.value : s.fill);
		function V(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : m(e) ? e.type === t && Array.isArray(e.children) ? V(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? V(e.children) : [] : []).join("").trim();
		}
		let H = r(() => s.icon === !0 ? V(d.default?.() ?? []) : ""), U = r(() => typeof s.icon == "string" ? s.icon.trim() : H.value), W = r(() => u["aria-label"] ?? s.label), G = r(() => L.value ? u.title ?? s.label : void 0), te = r(() => !L.value && (s.prefix !== void 0 || !!d.prefix)), ne = r(() => !L.value && (s.suffix !== void 0 || !!d.suffix)), K = r(() => M.value && !!d.selected), q = r(() => ({
			"extra-small": 20,
			small: L.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[x.value]);
		return b(() => {
			s.icon === !0 && !H.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), R(() => {
			s.toggle && s.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), L.value && (!W.value || W.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (n, r) => (S(), i(J, h({
			ref_key: "buttonElement",
			ref: f
		}, P(u), {
			class: ["mat-btn", [
				`mat-btn--${P(w)}`,
				`mat-btn--size-${P(x)}`,
				`mat-btn--shape-${P(y)}`,
				{
					"mat-button--explicit-color": P(D),
					"mat-btn--icon": L.value,
					[`mat-btn--width-${e.width}`]: L.value,
					"mat-btn--toggle": j.value,
					"mat-btn--selected": M.value,
					"mat-btn--split-leading": P(O)?.role === "leading"
				}
			]],
			style: P(g),
			"aria-label": L.value ? W.value : P(u)["aria-label"],
			"aria-controls": P(O)?.role === "trailing" ? P(O).controls.value : void 0,
			"aria-expanded": P(O)?.role === "trailing" ? P(O).expanded.value : void 0,
			"aria-haspopup": P(O)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": j.value ? M.value : void 0,
			block: e.block,
			disabled: P(_),
			title: L.value ? void 0 : P(u).title,
			type: e.type,
			"use-cursor": P(A),
			onClick: P(T)
		}), {
			default: z(() => [
				L.value ? (S(), i(ke, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: B.value,
					"optical-size": q.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [l(N(U.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : a("", !0),
				te.value ? (S(), i(ke, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: B.value,
					"optical-size": q.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [e.prefix === void 0 ? k(n.$slots, "prefix", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				L.value ? a("", !0) : (S(), o("span", gt, [K.value ? k(n.$slots, "selected", { key: 0 }, void 0, !0) : k(n.$slots, "default", { key: 1 }, void 0, !0)])),
				ne.value ? (S(), i(ke, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: B.value,
					"optical-size": q.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [e.suffix === void 0 ? k(n.$slots, "suffix", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				L.value && G.value ? (S(), i(ft, {
					key: 4,
					content: G.value,
					id: `${P(p)}-tooltip`,
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
}), [["__scopeId", "data-v-ef9b33c9"]]), vt = ["data-scrollable"], yt = { class: "mat-app-root__content" }, bt = { class: "mat-app-root__overlay" }, xt = { class: "mat-app-root__bottom-stack" }, St = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		if (p(je, null)) throw Error("MatAppRoot 不允许嵌套");
		let a = ee(), c = E(null), l = E(null), u = E(null), d = E(null), f = E(null), m = E(null), _ = w({
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
		}), v = T(_), x = w({
			top: 0,
			bottom: 0,
			start: 0,
			end: 0
		}), D = r(() => ({
			"mat-app-root--document": i.fillViewport && !i.scrollable,
			"mat-app-root--fill-viewport": i.fillViewport,
			"mat-app-root--scrollable": i.scrollable
		})), O = r(() => [a.style, {
			"--mat-app-root-padding-top": `${_.padding.top}px`,
			"--mat-app-root-padding-bottom": `${_.padding.bottom}px`,
			"--mat-app-root-padding-start": `${_.padding.start}px`,
			"--mat-app-root-padding-end": `${_.padding.end}px`,
			"--mat-app-root-safe-area-top": `${x.top}px`,
			"--mat-app-root-safe-area-bottom": `${x.bottom}px`,
			"--mat-app-root-safe-area-start": `${x.start}px`,
			"--mat-app-root-safe-area-end": `${x.end}px`
		}]), A = [], j = !1, M, N, P = !1;
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
		function B(e, t) {
			return e === "top" || e === "bottom" ? {
				start: t.start,
				end: t.end
			} : {
				start: t.top,
				end: t.bottom
			};
		}
		function V() {
			if (!j || !c.value) return;
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
			Object.assign(x, l), A.forEach((e) => {
				if (!e.active) return;
				let t = B(e.edge, u), n = e.insets;
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
		function H() {
			if (!j || P) return;
			P = !0;
			let e = () => {
				P = !1, N = void 0, V();
			};
			if (typeof window.requestAnimationFrame == "function") {
				N = window.requestAnimationFrame(e);
				return;
			}
			N = window.setTimeout(e, 0);
		}
		function U({ edge: e, element: n } = {}) {
			if (!t.includes(e)) throw TypeError("registerEdge() 的 edge 必须是 top、bottom、start 或 end");
			if (!(n instanceof HTMLElement) || n.ownerDocument !== document) throw TypeError("registerEdge() 的 element 必须是当前 document 中的 HTMLElement");
			let r = w({
				start: 0,
				end: 0
			}), i = {
				active: !0,
				edge: e,
				element: n,
				insets: r
			};
			return A.push(i), M?.observe(n), H(), Object.freeze({
				insets: T(r),
				unregister: () => {
					i.active && (i.active = !1, M?.unobserve?.(n), H());
				},
				update: () => {
					i.active && H();
				}
			});
		}
		let W = Object.freeze({
			layout: v,
			registerEdge: U
		});
		function G() {
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
		C(je, {
			publicContext: W,
			rootElement: T(c),
			edgeLayer: T(l),
			freeLayer: T(u),
			snackbarLayer: T(d),
			floatingLayer: T(f),
			getLayoutRect: G
		});
		function te() {
			window.addEventListener("resize", H), document.addEventListener("scroll", H, !0), window.visualViewport?.addEventListener("resize", H), window.visualViewport?.addEventListener("scroll", H);
		}
		function ne() {
			window.removeEventListener("resize", H), document.removeEventListener("scroll", H, !0), window.visualViewport?.removeEventListener("resize", H), window.visualViewport?.removeEventListener("scroll", H);
		}
		return b(async () => {
			j = !0, M = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(H), M?.observe(c.value), A.forEach((e) => {
				e.active && M?.observe(e.element);
			}), te(), await g(), H();
		}), y(() => {
			j = !1, M?.disconnect(), M = void 0, ne(), N !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(N) : window.clearTimeout(N));
		}), L([() => i.fillViewport, () => i.scrollable], H), (t, n) => (S(), o("div", h({
			ref_key: "rootElement",
			ref: c
		}, t.$attrs, {
			class: ["mat-app-root", D.value],
			"data-scrollable": String(e.scrollable),
			style: O.value
		}), [
			s("div", yt, [k(t.$slots, "default", {}, void 0, !0)]),
			s("div", bt, [
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
				s("div", xt, [
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
		], 16, vt));
	}
}), [["__scopeId", "data-v-cfae62cc"]]), Ct = 150, wt = .75, Tt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return re.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
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
		let n = e, i = t, a = E(null), s = E(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set(), d, f, p = Ct, m = !0, _ = !1, { colorStyle: v } = De(r(() => n.color));
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
		C(pt, {
			color: r(() => n.color),
			disabled: r(() => n.disabled),
			isSelected: x,
			requestSelection: w,
			selection: r(() => n.selection),
			shape: r(() => n.shape),
			size: r(() => n.size),
			variant: r(() => n.variant)
		});
		function T(e) {
			return e instanceof Element ? e.closest(".mat-button-base") : null;
		}
		function D(e) {
			let t = e.trim().match(/^(\d*\.?\d+)(ms|s)$/);
			if (!t) return null;
			let n = Number.parseFloat(t[1]);
			return t[2] === "s" ? n * 1e3 : n;
		}
		function O(e) {
			let [t] = getComputedStyle(e).transitionDuration.split(",");
			return D(t ?? "") ?? Ct;
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
		function N() {
			j(), M(), u.forEach((e) => {
				let t = e;
				t.style.inlineSize = c.get(t) ?? "", c.delete(t), l.delete(t);
			}), u.clear(), s.value && delete s.value.dataset.matGroupPressed, s.value = null, p = Ct, m = !0, _ = !1;
		}
		function ee() {
			if (j(), s.value) {
				if (A() || p === 0) {
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
					ee();
					return;
				}
				_ = !0;
			}
		}
		function I(e) {
			m = !1, _ = !1;
			let t = O(e);
			if (p = t, A() || t === 0) {
				m = !0;
				return;
			}
			d = globalThis.setTimeout(() => {
				d = void 0, s.value === e && (m = !0, _ && ee());
			}, t * wt);
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
			}), t.dataset.matGroupPressed = "", s.value = t, I(t);
		}
		async function z(e) {
			let t = T(e.target);
			t && (await g(), R(t));
		}
		function B(e) {
			e.relatedTarget instanceof Node && a.value?.contains(e.relatedTarget) || F();
		}
		async function V(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = T(e.target);
			t && (await g(), R(t));
		}
		function H() {
			if (n.variant !== "connected" || !a.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...a.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return b(H), y(N), L(() => [n.variant, n.selection], async () => {
			N(), await g(), H();
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
			style: P(v),
			role: "group",
			onFocusout: B,
			onKeydown: V,
			onKeyupCapture: F,
			onLostpointercaptureCapture: F,
			onPointercancelCapture: F,
			onPointerdown: z,
			onPointerupCapture: F
		}), [k(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-15b9823a"]]), Et = [
	"small",
	"medium",
	"large"
], Dt = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], Ot = [
	"button",
	"submit",
	"reset"
];
function kt(e) {
	return typeof e == "string" && Dt.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var At = {
	key: 1,
	class: "mat-fab__label"
}, jt = {
	key: 1,
	class: "mat-fab__label"
}, Mt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return Et.includes(e);
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
			validator: kt
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return Ot.includes(e);
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
		let c = t, d = s, f = ee(), m = I(), g = p(Z, X), _ = p(je, null), v = E(null), y = F(), b = r(() => (m.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = r(() => typeof c.icon == "string" && c.icon.trim().length > 0), C = r(() => !b.value), w = r(() => C.value ? f.title ?? c.label : void 0), T = r(() => C.value ? c.label : f["aria-label"]), D = r(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[c.size]), O = r(() => ({
			"--mat-fab-container-color": `var(--mat-sys-color-${c.color})`,
			"--mat-fab-content-color": `var(--mat-sys-color-on-${c.color})`,
			"--mat-fab-state-color": `var(--mat-sys-color-on-${c.color})`
		})), A = r(() => c.app && !!_), j = r(() => A.value ? _.floatingLayer.value : null);
		return R(() => {
			C.value && (!x.value || !c.label || c.label.trim().length === 0) && console.warn("MatFab: 图标模式必须提供非空 label");
		}), (e, r) => A.value ? j.value ? (S(), i(n, {
			key: 1,
			to: j.value
		}, [u(J, h({
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${t.size}`,
				`mat-fab--position-${t.position}`,
				{
					"mat-fab--app-root": !0,
					"mat-fab--extended": b.value,
					"mat-fab--icon-only": C.value
				}
			]],
			style: O.value,
			"aria-label": T.value,
			disabled: t.disabled,
			title: C.value ? void 0 : P(f).title,
			type: t.type,
			"use-cursor": P(g).useCursor,
			onClick: r[1] ||= (e) => d("click", e)
		}), {
			default: z(() => [
				x.value ? (S(), i(ke, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": D.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [l(N(t.icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : a("", !0),
				b.value ? (S(), o("span", jt, [k(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				C.value && w.value ? (S(), i(ft, {
					key: 2,
					content: w.value,
					id: `${P(y)}-tooltip`,
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
		])], 8, ["to"])) : a("", !0) : (S(), i(J, h({
			key: 0,
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [`mat-fab--size-${t.size}`, {
				"mat-fab--extended": b.value,
				"mat-fab--icon-only": C.value
			}]],
			style: O.value,
			"aria-label": T.value,
			disabled: t.disabled,
			title: C.value ? void 0 : P(f).title,
			type: t.type,
			"use-cursor": P(g).useCursor,
			onClick: r[0] ||= (e) => d("click", e)
		}), {
			default: z(() => [
				x.value ? (S(), i(ke, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": D.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: z(() => [l(N(t.icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : a("", !0),
				b.value ? (S(), o("span", At, [k(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				C.value && w.value ? (S(), i(ft, {
					key: 2,
					content: w.value,
					id: `${P(y)}-tooltip`,
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
}), [["__scopeId", "data-v-2fe45c13"]]), Nt = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = p(mt), a = I();
		C(mt, {
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
}), Pt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return re.includes(e);
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
		let n = e, i = t, a = E(null), c = I(), { colorStyle: l, hasExplicitColor: d } = De(r(() => n.color));
		C(mt, {
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
					"mat-split-btn--explicit-color": P(d)
				}
			]],
			style: P(l),
			role: "group"
		}), [s("span", {
			class: "mat-split-btn__segment mat-split-btn__leading",
			onClick: f
		}, [u(Nt, { role: "leading" }, {
			default: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), s("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [u(Nt, { role: "trailing" }, {
			default: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-647c3562"]]), Ft = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
	name: "MatSurfaceBase",
	inheritAttrs: !1
}, {
	__name: "MatSurfaceBase",
	props: { as: {
		type: String,
		default: "div"
	} },
	setup(e, { expose: t }) {
		let n = E(null);
		return t({ root: n }), (t, r) => (S(), i(A(e.as), h({
			ref_key: "root",
			ref: n
		}, t.$attrs, { class: "mat-surface-base" }), {
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-76b082b5"]]), It = { class: "mat-card-headline" }, Lt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (S(), o("div", It, [k(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-acf29196"]]), Rt = { class: "mat-card-media" }, zt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (S(), o("div", Rt, [k(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-7208424e"]]), Bt = { class: "mat-card-subhead" }, Vt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (S(), o("div", Bt, [k(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-2c6ca74d"]]), Ht = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let t = e, { colorStyle: n, hasExplicitColor: o } = De(r(() => t.color));
		return (t, r) => (S(), i(Ft, h(t.$attrs, {
			class: ["mat-card", [`mat-card--${e.variant}`, { "mat-card--explicit-color": P(o) }]],
			style: P(n),
			as: e.as
		}), {
			default: z(() => [
				t.$slots.media ? (S(), i(zt, { key: 0 }, {
					default: z(() => [k(t.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.headline ? (S(), i(Lt, { key: 1 }, {
					default: z(() => [k(t.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				t.$slots.subhead ? (S(), i(Vt, { key: 2 }, {
					default: z(() => [k(t.$slots, "subhead", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				k(t.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"as"
		]));
	}
}), [["__scopeId", "data-v-c8df8af3"]]), Ut = { class: "mat-card-action-area__content" }, Wt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
			validator: (e) => ie.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = t, r = p(Z, X);
		return (t, a) => (S(), i(q, h(t.$attrs, {
			class: "mat-card-action-area",
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			type: e.type,
			"use-cursor": P(r).useCursor,
			onClick: a[0] ||= (e) => n("click", e)
		}), {
			default: z(() => [s("span", Ut, [k(t.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-7e019121"]]), Gt = { class: "mat-card-content" }, Kt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (S(), o("div", Gt, [k(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-8a32cf5d"]]), qt = { class: "mat-card-actions" }, Jt = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (S(), o("div", qt, [k(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-f3e5f8e6"]]), Yt = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], Xt = Symbol("mat-list"), Zt = Symbol("mat-list-group-activator");
function Qt(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function $t(e) {
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
function en(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function tn(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(en);
}
var nn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return Yt.includes(e);
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
				return e.every(en);
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
			return Array.isArray(e) && e.every(en);
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = E(null), s = r(() => Qt(n.interaction)), c = r(() => s.value ? "div" : "ul"), { colorStyle: l } = De(r(() => n.color)), u = [], d = [
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
		let T = $t({
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
			t === void 0 || !(e.target instanceof HTMLElement) || (e.preventDefault(), T.move(e.target, t));
		}
		return C(Xt, {
			interaction: r(() => n.interaction),
			isSelectable: s,
			variant: r(() => n.variant),
			isGroupExpanded: m,
			isSelected: f,
			registerGroupValue: v,
			requestFocusRefresh: T.queueRefresh,
			requestGroupExpanded: _,
			requestSelection: p,
			unregisterGroupValue: y
		}), b(T.observe), L(o, async () => {
			T.restore(), await g(), T.observe();
		}), L(() => n.interaction, async () => {
			T.restore(), await g(), T.observe();
		}), L(() => n.selected, async () => {
			o.value?.contains(document.activeElement) || T.resetActive(), await g(), T.queueRefresh();
		}, { deep: !0 }), (t, n) => (S(), i(A(c.value), h({
			ref_key: "root",
			ref: o
		}, t.$attrs, {
			class: ["mat-list", `mat-list--${e.variant}`],
			style: P(l),
			"aria-multiselectable": e.interaction === "multi-select" ? "true" : t.$attrs["aria-multiselectable"],
			"aria-orientation": s.value ? "vertical" : t.$attrs["aria-orientation"],
			role: s.value ? "listbox" : t.$attrs.role,
			onFocusin: P(T).handleFocusIn,
			onKeydown: D
		}), {
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-8ff1fa12"]]), rn = ["data-line-count"], an = ["inert"], on = ["inert"], sn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
			}, [e.leadingIcon ? (S(), i(ke, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : k(t.$slots, "leading", { key: 1 }, void 0, !0)], 10, an)) : a("", !0),
			s("span", {
				"data-mat-item-content-text": "",
				class: _(`${e.namespace}__text`)
			}, [
				t.$slots.overline ? (S(), o("span", {
					key: 0,
					"data-mat-item-content-overline": "",
					class: _(`${e.namespace}__overline`)
				}, [k(t.$slots, "overline", {}, void 0, !0)], 2)) : a("", !0),
				s("span", {
					"data-mat-item-content-label": "",
					class: _(`${e.namespace}__label`)
				}, [k(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.supporting ? (S(), o("span", {
					key: 1,
					"data-mat-item-content-supporting": "",
					class: _(`${e.namespace}__supporting`)
				}, [k(t.$slots, "supporting", {}, void 0, !0)], 2)) : a("", !0)
			], 2),
			t.$slots.trailing && !e.separateTrailing ? (S(), o("span", {
				key: 1,
				"data-mat-item-content-trailing": "",
				class: _(`${e.namespace}__trailing`),
				inert: e.presentationSlots ? "" : void 0
			}, [k(t.$slots, "trailing", {}, void 0, !0)], 10, on)) : a("", !0)
		], 10, rn));
	}
}), [["__scopeId", "data-v-7cb38b5a"]]), cn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		return (t, n) => (S(), i(sn, {
			namespace: "mat-list-item-content",
			"line-count": e.lineCount,
			"presentation-slots": e.presentationSlots,
			"separate-trailing": e.separateTrailing
		}, c({
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: z(() => [k(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [k(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, [
			"line-count",
			"presentation-slots",
			"separate-trailing"
		]));
	}
}), [["__scopeId", "data-v-2d1ef745"]]), ln = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], un = ["aria-disabled", "data-mat-list-disabled"], dn = ["aria-disabled", "data-mat-list-disabled"], fn = ["inert"], pn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return ie.includes(e);
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
		let n = e, s = t, l = I(), d = p(Xt, null), f = p(Zt, null), m = p(Z, X), v = r(() => d?.interaction.value ?? "none"), y = r(() => v.value === "single-action" || v.value === "multi-action"), x = r(() => v.value === "multi-action"), C = r(() => d?.isSelectable.value ?? !1), w = r(() => d?.isSelected(n.value) ?? !1), T = r(() => !!l.trailing), E = r(() => {
			if (n.lines !== void 0) return n.lines;
			let e = Number(!!l.overline) + Number(!!l.supporting);
			return Math.min(3, 1 + e);
		}), D = r(() => ({
			"mat-list-item--disabled": n.disabled,
			"mat-list-item--selected": w.value,
			[`mat-list-item--lines-${E.value}`]: !0
		}));
		function O(e) {
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
		}), (t, n) => P(f)?.static.value ? (S(), o("div", h({ key: 0 }, t.$attrs, {
			id: P(f).labelId,
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", D.value],
			"data-mat-list-group-label": "",
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}), [u(cn, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: z(() => [k(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [k(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, ln)) : P(f) ? (S(), i(q, h({ key: 1 }, t.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-group-activator": "",
			"aria-controls": P(f).contentId,
			"aria-expanded": P(f).expanded.value ? "true" : "false",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			disabled: e.disabled,
			"focus-ring": !0,
			type: "button",
			"use-cursor": P(m).useCursor,
			onClick: A
		}), {
			default: z(() => [u(cn, {
				"line-count": E.value,
				"presentation-slots": !1
			}, c({
				default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: z(() => [k(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: z(() => [k(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
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
		}), [u(cn, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: z(() => [k(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [k(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, un)) : y.value ? (S(), o("li", {
			key: 3,
			class: _(["mat-list-item", [D.value, {
				"mat-list-item__surface": x.value,
				"mat-list-item--multi-action": x.value
			}]]),
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}, [u(q, h(t.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !x.value }],
			"data-mat-list-primary": "",
			disabled: e.disabled,
			"focus-ring": !0,
			href: e.href,
			type: e.type,
			"use-cursor": P(m).useCursor,
			onClick: O
		}), {
			default: z(() => [u(cn, {
				"line-count": E.value,
				"presentation-slots": !1,
				"separate-trailing": x.value && T.value
			}, c({
				default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: z(() => [k(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: z(() => [k(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
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
		}, [k(t.$slots, "trailing", {}, void 0, !0)], 8, fn)) : a("", !0)], 10, dn)) : (S(), i(q, h({ key: 4 }, t.$attrs, {
			as: "div",
			class: ["mat-list-item mat-list-item__surface mat-list-item--selectable", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			"aria-selected": w.value ? "true" : "false",
			disabled: e.disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": P(m).useCursor,
			onClick: O,
			onKeydown: j
		}), {
			default: z(() => [u(cn, {
				"line-count": E.value,
				"presentation-slots": ""
			}, c({
				default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				t.$slots.leading ? {
					name: "leading",
					fn: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				t.$slots.overline ? {
					name: "overline",
					fn: z(() => [k(t.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				t.$slots.supporting ? {
					name: "supporting",
					fn: z(() => [k(t.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				t.$slots.trailing ? {
					name: "trailing",
					fn: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-a787e932"]]), mn = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return C(Zt, e.context), (e, t) => k(e.$slots, "default");
	}
}), hn = [
	"role",
	"aria-hidden",
	"inert"
], gn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let a = n, o = p(Xt, null), c = I(), l = E(null), d = E(!1), f = E(null), _ = Symbol("mat-list-group"), v = F().replace(/[^\w-]/g, "-"), C = `mat-list-group-${v}-content`, w = `mat-list-group-${v}-label`, T = !1, D, O = r(() => a.value !== void 0), j = r(() => o?.isSelectable.value ?? !1), M = r(() => O.value ? o?.isGroupExpanded(a.value) ?? !1 : d.value);
		function N(n) {
			return n.flatMap((n) => m(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? N(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = r(() => {
			let e = N(c.activator?.({ expanded: M.value }) ?? []);
			if (e.length !== 1 || !m(e[0])) return !1;
			let t = e[0].type;
			return t === pn || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), ee = r(() => f.value ?? P.value), R = r(() => j.value || !ee.value || M.value), B = r(() => o?.variant.value ?? "segmented");
		function V() {
			(l.value?.querySelector(":scope > [data-mat-list-group-content]"))?.contains(document.activeElement) && l.value?.querySelector(":scope > [data-mat-list-group-activator]")?.focus();
		}
		function H() {
			if (!(j.value || !ee.value)) {
				if (M.value && V(), O.value) {
					o?.requestGroupExpanded(a.value, !M.value);
					return;
				}
				d.value = !d.value;
			}
		}
		let U = {
			contentId: C,
			expanded: R,
			labelId: w,
			static: j,
			toggle: H
		};
		function W() {
			!ee.value && !T ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), T = !0) : ee.value && (T = !1);
		}
		function G() {
			if (!l.value) return;
			let e = j.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(l.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			f.value !== t && (f.value = t);
		}
		function te() {
			G(), W();
		}
		function ne(e) {
			e !== void 0 && (o?.registerGroupValue(_, e), D = e);
		}
		function K() {
			D !== void 0 && (o?.unregisterGroupValue(_), D = void 0);
		}
		return b(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), j.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), ne(a.value), te(), o?.requestFocusRefresh();
		}), x(te), y(() => {
			K(), o?.requestFocusRefresh();
		}), L(() => a.value, (e, t) => {
			Object.is(e, t) || (K(), ne(e));
		}), L(M, async (e, t) => {
			t && !e && V(), await g(), o?.requestFocusRefresh();
		}), L(j, async (e, t) => {
			e && !t && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), await g(), o?.requestFocusRefresh();
		}), (e, t) => (S(), i(A(j.value ? "div" : "li"), h({
			ref_key: "root",
			ref: l
		}, e.$attrs, {
			class: ["mat-list-group", [`mat-list-group--${B.value}`, {
				"mat-list-group--expanded": R.value,
				"mat-list-group--selectable-fallback": j.value
			}]],
			role: j.value ? "group" : void 0,
			"aria-labelledby": j.value ? w : void 0
		}), {
			default: z(() => [u(mn, { context: U }, {
				default: z(() => [k(e.$slots, "activator", { expanded: R.value }, void 0, !0)]),
				_: 3
			}), s("div", {
				id: C,
				class: "mat-list-group__content",
				"data-mat-list-group-content": "",
				role: j.value ? "presentation" : void 0,
				"aria-hidden": R.value ? void 0 : "true",
				inert: R.value ? void 0 : ""
			}, [(S(), i(A(j.value ? "div" : "ul"), {
				class: "mat-list-group__items",
				role: j.value ? "presentation" : void 0
			}, {
				default: z(() => [k(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, ["role"]))], 8, hn)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-ae082a1e"]]), _n = Symbol("mat-menu"), vn = Symbol("mat-menu-item"), yn = Symbol("mat-menu-group");
function bn(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function xn(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = bn(t, a, o), c = bn(e, a, o), l = bn(t, e, o), u = bn(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function Sn(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var Cn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let t = e, n = p(Xt, null), a = p(_n, null), o = r(() => !!n), s = r(() => !!a), c = r(() => n?.isSelectable.value ?? !1), l = r(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = r(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
		return (e, t) => (S(), i(A(u.value), h(e.$attrs, {
			class: ["mat-divider", [`mat-divider--${l.value}`, { "mat-divider--menu": s.value }]],
			"aria-hidden": c.value ? "true" : e.$attrs["aria-hidden"],
			role: c.value ? "presentation" : o.value || s.value ? "separator" : e.$attrs.role
		}), null, 16, [
			"class",
			"aria-hidden",
			"role"
		]));
	}
}), [["__scopeId", "data-v-2eb6ec37"]]), wn = { class: "mat-selection-control__target" }, Tn = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], En = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, Dn = {
	key: 0,
	class: "mat-selection-control__label"
}, On = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let i = e, c = n, l = ee(), u = I(), d = E(null), f = p(Z, X), { colorStyle: m } = De(r(() => i.color)), g = r(() => {
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
				"mat-selection-control--use-cursor": P(f).useCursor
			}],
			style: v.value
		}), [s("span", wn, [
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
			}), null, 16, Tn),
			n[2] ||= s("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			s("span", En, [k(t.$slots, "indicator", {}, void 0, !0)])
		]), P(u).default ? (S(), o("span", Dn, [k(t.$slots, "default", {}, void 0, !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-4dcfac60"]]), kn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: tn
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: en
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
		"update:modelValue": tn,
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
		return (t, n) => (S(), i(On, h(t.$attrs, {
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
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-3d8ac819"]]), An = Symbol("mdu-ui-radio-group"), jn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return e == null || en(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: en
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
			return e === null || en(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, a = t, o = d(), c = p(An, null), l = E(null), u = r(() => n.value), f = r(() => n.disabled || !!c?.disabled.value), m = r(() => n.color ?? c?.color.value), g = r(() => c ? c.isSelected(n.value) : Object.is(n.modelValue, n.value));
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
		return (e, t) => (S(), i(On, h({
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
			default: z(() => [k(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-0d040228"]]), Mn = ["aria-disabled"], Nn = { class: "mat-radio-group__label" }, Pn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				return e === null || en(e);
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
			return e === null || en(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = ee(), c = M([]), { colorStyle: l } = De(r(() => n.color)), u = r(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = r(() => [l.value, a.style]);
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
		return C(An, {
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
		}), [s("legend", Nn, N(e.label), 1), k(t.$slots, "default", {}, void 0, !0)], 16, Mn));
	}
}), [["__scopeId", "data-v-b2f7e821"]]), Fn = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		return (t, n) => (S(), i(On, h(t.$attrs, {
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
			default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-71a3dff9"]]), In = Object.freeze(["horizontal", "vertical"]), Ln = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), Rn = Object.freeze(["standard", "centered"]), zn = 12;
function Bn(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Vn(e) {
	return Bn(e) && e > 0;
}
function Hn(e) {
	return In.includes(e);
}
function Un(e) {
	return Ln.includes(e);
}
function Wn(e) {
	return Rn.includes(e);
}
function Gn(e) {
	return Array.isArray(e) && e.length === 2 && e.every(Bn);
}
function Kn(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function qn(e, t) {
	return Number(e.toFixed(Math.min(zn, t)));
}
function Jn(e, t) {
	let n = Bn(e) ? e : 0, r = Bn(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function Yn(e) {
	return Vn(e) ? e : 1;
}
function Xn(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function Zn(e, t, n) {
	let r = Xn(Bn(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(Kn(t.min), Kn(t.max), Kn(n));
	return qn(Xn(t.min + i * n, t), a);
}
function Qn(e, t, n) {
	return Zn(Bn(e) ? e : (t.min + t.max) / 2, t, n);
}
function $n(e, t) {
	return qn((Xn(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function er(e) {
	return Number(e.toFixed(3)).toString();
}
function tr(e) {
	let t = Math.min(Math.max(e, 0), 100), n = er(t), r = qn(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${er(Math.abs(r))}px)`;
}
function nr(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(Kn(e.min), Kn(e.max), Kn(t)), i = Array.from({ length: n + 1 }, (n, i) => qn(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function rr(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return Zn(n.min + (n.max - n.min) * u, n, r);
}
function ir(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return Zn(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return Zn(e + i * r, n, r);
}
function ar(e, t, n, r) {
	let i = Zn(e, n, r), a = Zn(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var or = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, sr = { class: "mat-slider__inset-icon-layer" }, cr = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, lr = [
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
], ur = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: Bn
		},
		min: {
			type: Number,
			default: 0,
			validator: Bn
		},
		max: {
			type: Number,
			default: 100,
			validator: Bn
		},
		step: {
			type: Number,
			default: 1,
			validator: Vn
		},
		variant: {
			type: String,
			default: "standard",
			validator: Wn
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || Bn(e);
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
			validator: Hn
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Un
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
			return Bn(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, c = n, l = ee(), d = E(null), f = E(null), m = E(null), g = E(!1), y = E(void 0), b = E(void 0), x = E(!1), C = E(!1), w = p(Z, X), { colorStyle: T } = De(r(() => i.color)), D = r(() => Jn(i.min, i.max)), k = r(() => Yn(i.step)), A = r(() => Zn(i.modelValue, D.value, k.value)), j = r(() => g.value ? b.value : A.value), M = r(() => Qn(i.center, D.value, k.value)), N = r(() => i.variant === "centered" ? M.value : D.value.min), F = r(() => $n(j.value, D.value)), I = r(() => $n(N.value, D.value)), L = r(() => tr(F.value)), R = r(() => i.variant === "standard" ? "0%" : tr(I.value)), z = r(() => Math.sign(F.value - I.value)), B = r(() => z.value >= 0 ? R.value : `calc(${L.value} + var(--mat-slider-handle-track-gap))`), V = r(() => z.value > 0 ? `max(0px, calc(${L.value} - ${R.value} - var(--mat-slider-handle-track-gap)))` : z.value < 0 ? `max(0px, calc(${R.value} - ${L.value} - var(--mat-slider-handle-track-gap)))` : "0px"), H = r(() => z.value > 0 ? R.value : `max(0px, calc(${L.value} - var(--mat-slider-handle-track-gap)))`), U = r(() => z.value < 0 ? R.value : `calc(${L.value} + var(--mat-slider-handle-track-gap))`), W = r(() => z.value < 0 ? `calc(100% - ${R.value})` : `max(0px, calc(100% - ${L.value} - var(--mat-slider-handle-track-gap)))`), G = r(() => i.showStopIndicator ? nr(D.value, k.value) : i.variant === "centered" ? [D.value.min, D.value.max] : [D.value.max]), te = r(() => i.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(i.size)), ne = r(() => i.size === "extra-large" ? 32 : 24), K = r(() => i.showValueIndicator && (g.value || C.value)), q = r(() => ({
			...T.value,
			"--mat-slider-active-visible-size": V.value,
			"--mat-slider-active-visible-start": B.value,
			"--mat-slider-center-position": R.value,
			"--mat-slider-inactive-after-size": W.value,
			"--mat-slider-inactive-after-start": U.value,
			"--mat-slider-inactive-before-size": H.value,
			"--mat-slider-position": L.value
		}));
		function J(e, t) {
			let n = g.value ? b.value : A.value;
			return e === void 0 || e === n ? !1 : (g.value && (b.value = e), c("update:modelValue", e), c("input", t), !0);
		}
		function Y(e) {
			return f.value ? J(rr(e, f.value, D.value, k.value, i.orientation), e) : !1;
		}
		function re(e) {
			i.disabled || (y.value = e.pointerId, b.value = A.value, x.value = !1, g.value = !0, m.value?.focus(), f.value?.setPointerCapture?.(e.pointerId), x.value = Y(e));
		}
		function Q(e) {
			!g.value || e.pointerId !== y.value || (x.value = Y(e) || x.value);
		}
		function ie(e, t) {
			!g.value || e.pointerId !== y.value || (t && (x.value = Y(e) || x.value), t && x.value && c("change", e), g.value = !1, x.value = !1, y.value = void 0, b.value = void 0);
		}
		function ae(e) {
			if (i.disabled) return;
			let t = ir(A.value, e.key, D.value, k.value);
			t !== void 0 && (e.preventDefault(), J(t, e) && c("change", e));
		}
		return (n, r) => (S(), o("div", h(P(l), {
			class: ["mat-slider", [
				`mat-slider--${e.orientation}`,
				`mat-slider--size-${e.size}`,
				`mat-slider--${e.variant}`,
				{
					"mat-slider--disabled": e.disabled,
					"mat-slider--dragging": g.value,
					"mat-slider--use-cursor": P(w).useCursor
				}
			]],
			style: q.value
		}), [
			s("span", or, [
				r[6] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				s("span", { class: _(["mat-slider__active-track", { "mat-slider__active-track--from-start": e.variant === "standard" }]) }, null, 2),
				r[7] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(S(!0), o(t, null, O(G.value, (e) => (S(), o("span", {
					key: e,
					class: _(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(N.value, j.value) && e <= Math.max(N.value, j.value) }]),
					style: v({ "--mat-slider-stop-position": P(tr)(P($n)(e, D.value)) })
				}, null, 6))), 128)),
				te.value ? (S(), o(t, { key: 0 }, [s("span", sr, [u(ke, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: e.insetIcon,
					"optical-size": ne.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), s("span", cr, [u(ke, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: e.insetIcon,
					"optical-size": ne.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])])], 64)) : a("", !0),
				s("span", {
					ref_key: "handle",
					ref: d,
					class: "mat-slider__handle"
				}, [...r[5] ||= [s("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
			]),
			u(ft, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(j.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": K.value,
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
				onPointerdown: re,
				onPointermove: Q,
				onPointerup: r[2] ||= (e) => ie(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "nativeInput",
				ref: m,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": P(l)["aria-label"],
				"aria-orientation": e.orientation,
				"aria-valuemax": D.value.max,
				"aria-valuemin": D.value.min,
				"aria-valuenow": j.value,
				disabled: e.disabled,
				max: D.value.max,
				min: D.value.min,
				step: k.value,
				value: j.value,
				onBlur: r[3] ||= (e) => C.value = !1,
				onFocus: r[4] ||= (e) => C.value = !0,
				onKeydown: ae
			}, null, 40, lr)
		], 16));
	}
}), [["__scopeId", "data-v-a8683686"]]), dr = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, fr = [
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
], pr = [
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
], mr = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
			validator: Gn
		},
		min: {
			type: Number,
			default: 0,
			validator: Bn
		},
		max: {
			type: Number,
			default: 100,
			validator: Bn
		},
		step: {
			type: Number,
			default: 1,
			validator: Vn
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
			validator: Hn
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Un
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
			return Gn(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = e, a = n, c = ee(), l = E([]), d = E(null), f = E(null), m = E(null), g = E(0), y = E(void 0), b = E(!1), x = E(void 0), C = E(void 0), w = E(!1), T = p(Z, X), { colorStyle: D } = De(r(() => i.color)), k = r(() => Jn(i.min, i.max)), A = r(() => Yn(i.step)), j = r(() => ar(i.modelValue?.[0], i.modelValue?.[1], k.value, A.value)), M = r(() => b.value ? C.value : j.value), N = r(() => $n(M.value[0], k.value)), F = r(() => $n(M.value[1], k.value)), I = r(() => tr(N.value)), L = r(() => tr(F.value)), R = r(() => i.showStopIndicator ? nr(k.value, A.value) : [k.value.min, k.value.max]), z = r(() => l.value[g.value] ?? null), B = r(() => M.value[g.value]), V = r(() => i.showValueIndicator && (b.value || y.value === g.value)), H = r(() => ({
			...D.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${L.value} - ${I.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${I.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": L.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${L.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${L.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${I.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": I.value
		}));
		function U(e) {
			return e === 0 ? f.value : m.value;
		}
		function W(e) {
			let [t, n] = M.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function G(e, t, n) {
			if (t === void 0) return !1;
			let [r, i] = b.value ? C.value : j.value, o = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === i ? !1 : (b.value && (C.value = o), a("update:modelValue", o), a("input", n), !0);
		}
		function te(e) {
			if (!d.value) return !1;
			let t = rr(e, d.value, k.value, A.value, i.orientation);
			return G(g.value, t, e);
		}
		function ne(e) {
			if (i.disabled || !d.value) return;
			let t = rr(e, d.value, k.value, A.value, i.orientation);
			t !== void 0 && (g.value = W(t), x.value = e.pointerId, C.value = [...j.value], w.value = !1, b.value = !0, U(g.value)?.focus(), d.value.setPointerCapture?.(e.pointerId), w.value = G(g.value, t, e));
		}
		function K(e) {
			!b.value || e.pointerId !== x.value || (w.value = te(e) || w.value);
		}
		function q(e, t) {
			!b.value || e.pointerId !== x.value || (t && (w.value = te(e) || w.value), t && w.value && a("change", e), b.value = !1, w.value = !1, x.value = void 0, C.value = void 0);
		}
		function J(e, t) {
			if (i.disabled) return;
			let n = ir(j.value[e], t.key, k.value, A.value);
			n !== void 0 && (t.preventDefault(), g.value = e, G(e, n, t) && a("change", t));
		}
		function Y(e) {
			g.value = e, y.value = e;
		}
		function re(e) {
			y.value === e && (y.value = void 0);
		}
		function Q(e, t) {
			l.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (n, r) => (S(), o("div", h(P(c), {
			class: ["mat-range-slider", [
				`mat-range-slider--${e.orientation}`,
				`mat-range-slider--size-${e.size}`,
				{
					"mat-range-slider--disabled": e.disabled,
					"mat-range-slider--dragging": b.value,
					"mat-range-slider--use-cursor": P(T).useCursor
				}
			]],
			style: H.value
		}), [
			s("span", dr, [
				r[10] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				r[11] ||= s("span", { class: "mat-range-slider__active-track" }, null, -1),
				r[12] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(S(!0), o(t, null, O(R.value, (e) => (S(), o("span", {
					key: e,
					class: _(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= M.value[0] && e <= M.value[1] }]),
					style: v({ "--mat-range-slider-stop-position": P(tr)(P($n)(e, k.value)) })
				}, null, 6))), 128)),
				(S(!0), o(t, null, O(M.value, (e, t) => (S(), o("span", {
					key: t,
					ref_for: !0,
					ref: (e) => Q(t, e),
					class: _(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": g.value === t }]])
				}, [...r[9] ||= [s("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			u(ft, {
				class: "mat-range-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(B.value),
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": V.value,
				target: z.value
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
				onLostpointercapture: r[0] ||= (e) => q(e, !1),
				onPointercancel: r[1] ||= (e) => q(e, !1),
				onPointerdown: ne,
				onPointermove: K,
				onPointerup: r[2] ||= (e) => q(e, !0)
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
				onBlur: r[3] ||= (e) => re(0),
				onFocus: r[4] ||= (e) => Y(0),
				onKeydown: r[5] ||= (e) => J(0, e)
			}, null, 40, fr),
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
				onBlur: r[6] ||= (e) => re(1),
				onFocus: r[7] ||= (e) => Y(1),
				onKeydown: r[8] ||= (e) => J(1, e)
			}, null, 40, pr)
		], 16));
	}
}), [["__scopeId", "data-v-d7070366"]]), hr = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let r = e, a = n, o = E(null);
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
		}), (e, t) => (S(), i(A(r.control), h({
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
}), [["__scopeId", "data-v-55b4fdd2"]]), gr = ["inert", "aria-hidden"], _r = { class: "mat-text-input__container" }, vr = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, yr = {
	key: 0,
	class: "mat-text-input__outline-label"
}, br = { key: 0 }, xr = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, Sr = ["for"], Cr = {
	key: 0,
	class: "mat-text-input__label"
}, wr = {
	key: 0,
	"aria-hidden": "true"
}, Tr = { class: "mat-text-input__control-row" }, Er = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, Dr = {
	key: 1,
	class: "mat-text-input__affix mat-text-input__suffix"
}, Or = { class: "mat-text-input__supporting-text" }, kr = {
	key: 0,
	class: "mat-text-input__counter"
}, Ar = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, d = ee(), f = E(!1), p = E(n.modelValue), m = E(), x = F(), C = `${x}-supporting`, w = r(() => d.id || x), { colorStyle: T } = De(r(() => n.color)), D = r(() => !!d.placeholder), O = r(() => f.value || p.value.length > 0 || D.value), A = r(() => n.error ? n.errorText : n.supportingText), j = r(() => !!A.value || n.maxLength !== void 0), M = r(() => {
			let e = [d["aria-describedby"]];
			return j.value && e.push(C), e.filter(Boolean).join(" ") || void 0;
		}), P = r(() => [T.value, d.style]), I = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), R = r(() => Object.fromEntries(Object.entries(d).filter(([e]) => !I.has(e)))), B, V;
		function H(e) {
			return Number.parseFloat(e) || 0;
		}
		function U() {
			let e = m.value?.getInput();
			if (!(e instanceof HTMLTextAreaElement)) return;
			e.style.resize = n.noResize ? "none" : "";
			let t = getComputedStyle(e), r = H(t.lineHeight) || 24, i = H(t.paddingBlockStart || t.paddingTop) + H(t.paddingBlockEnd || t.paddingBottom);
			if (e.style.minBlockSize = `${n.resizeMinRows * r + i}px`, !n.autoGrow) {
				e.style.blockSize = "", e.style.height = "", e.style.overflowY = "";
				return;
			}
			let a = n.rows ?? 1, o = n.maxRows === void 0 ? Infinity : Math.max(a, n.maxRows), s = a * r + i, c = o * r + i;
			e.style.blockSize = "auto", e.style.height = "";
			let l = e.scrollHeight, u = Math.max(s, Math.min(l, c));
			e.style.blockSize = `${u}px`, e.style.overflowY = "auto";
		}
		function W() {
			g(U);
		}
		function G(e) {
			let t = e[0]?.contentRect.width;
			t !== V && (V = t, W());
		}
		L(() => n.modelValue, (e) => {
			p.value = e, W();
		}), L(() => [
			n.autoGrow,
			n.label,
			n.maxRows,
			n.noResize,
			n.resizeMinRows,
			n.rows
		], W), b(() => {
			U(), typeof globalThis.ResizeObserver == "function" && (B = new globalThis.ResizeObserver(G), B.observe(m.value.getInput()));
		}), y(() => {
			B?.disconnect();
		});
		function te() {
			m.value?.focusInput();
		}
		function ne(e) {
			p.value = e, c("update:modelValue", e), W();
		}
		return (t, n) => (S(), o("div", {
			class: _(["mat-text-input", [
				t.$attrs.class,
				`mat-text-input--${e.variant}`,
				`mat-text-input--${e.control}`,
				{
					"mat-text-input--floating": O.value,
					"mat-text-input--focused": f.value,
					"mat-text-input--error": e.error,
					"mat-text-input--disabled": e.disabled
				}
			]]),
			style: v(P.value),
			inert: t.$attrs.inert,
			"aria-hidden": t.$attrs["aria-hidden"]
		}, [s("div", _r, [
			e.variant === "outlined" ? (S(), o("fieldset", vr, [O.value && e.label ? (S(), o("legend", yr, [l(N(e.label), 1), e.required ? (S(), o("span", br, " *")) : a("", !0)])) : a("", !0)])) : a("", !0),
			e.variant === "filled" ? (S(), o("span", xr)) : a("", !0),
			t.$slots.leading ? (S(), i(ke, {
				key: 2,
				as: "span",
				class: "mat-text-input__icon mat-text-input__leading",
				"optical-size": 24,
				size: "24px"
			}, {
				default: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : a("", !0),
			s("label", {
				class: "mat-text-input__main",
				for: w.value,
				onClick: te
			}, [e.label ? (S(), o("span", Cr, [l(N(e.label), 1), e.required ? (S(), o("span", wr, " *")) : a("", !0)])) : a("", !0), s("span", Tr, [
				e.prefixText ? (S(), o("span", Er, N(e.prefixText), 1)) : a("", !0),
				u(hr, h({
					ref_key: "controlElement",
					ref: m
				}, R.value, {
					class: "mat-text-input__control",
					"aria-describedby": M.value,
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
					"onUpdate:modelValue": ne
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
				e.suffixText ? (S(), o("span", Dr, N(e.suffixText), 1)) : a("", !0)
			])], 8, Sr),
			t.$slots.trailing ? (S(), i(ke, {
				key: 3,
				as: "span",
				class: "mat-text-input__icon mat-text-input__trailing",
				"optical-size": 24,
				size: "24px"
			}, {
				default: z(() => [k(t.$slots, "trailing", {}, void 0, !0)]),
				_: 3
			})) : a("", !0)
		]), j.value ? (S(), o("span", {
			key: 0,
			id: C,
			class: "mat-text-input__supporting"
		}, [s("span", Or, N(A.value), 1), e.maxLength === void 0 ? a("", !0) : (S(), o("span", kr, N(e.modelValue.length) + " / " + N(e.maxLength), 1))])) : a("", !0)], 14, gr));
	}
}), [["__scopeId", "data-v-052f006d"]]), jr = ["filled", "outlined"], Mr = {
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
			return jr.includes(e);
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
}, Nr = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...Mr,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = e, r = t;
		return (e, t) => (S(), i(Ar, h({
			...e.$attrs,
			...n
		}, {
			control: "input",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: z(() => [k(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: z(() => [k(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040));
	}
}), Pr = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...Mr,
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
		return (e, t) => (S(), i(Ar, h({
			...e.$attrs,
			...n
		}, {
			control: "textarea",
			"resize-min-rows": a(),
			"onUpdate:modelValue": t[0] ||= (e) => o("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: z(() => [k(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: z(() => [k(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040, ["resize-min-rows"]));
	}
}), Fr = { class: "mat-menu__surface" }, Ir = 200, Lr = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let i = e, c = n, l = ee(), d = I(), f = p(vn, null), m = p(_n, null), _ = E(null), v = E(null), w = r(() => v.value?.root ?? v.value?.$el ?? null), T = F().replace(/[^\w-]/g, "-"), D = r(() => l.id ?? `${T}-menu`), O = `--mat-menu-anchor-${T}`, A = E(!1), j = E("closed"), M = m?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, N = E(0), R = /* @__PURE__ */ new Map(), B = null, V = "", H = !1, U = !1, W, G, te, ne = null, K = !1, q = r(() => !!f), J = r(() => !!d.activator), Y = r(() => !q.value && !J.value && ce(i.anchor)), X = r(() => N.value > 0), Z = r(() => q.value ? A.value : i.modelValue), re = r(() => i.variant ?? m?.variant.value ?? "standard"), Q = r(() => i.color ?? m?.color.value), ie = r(() => i.closeOnClick), { colorStyle: ae } = De(Q), $ = r(() => {
			let [e, t] = ce(i.offset) ? i.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: Y.value ? "auto" : O
			};
			return Y.value && ce(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), oe = r(() => [
			ae.value,
			$.value,
			l.style
		]), se = $t({
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
			if (q.value) return f.element.value;
			if (J.value) {
				let e = _.value ? [..._.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function ue() {
			B && (V ? B.style.setProperty("anchor-name", V) : B.style.removeProperty("anchor-name"), B = null, V = "");
		}
		function de() {
			let e = le();
			return e ? B === e ? e : (ue(), B = e, V = e.style.getPropertyValue("anchor-name"), e.style.setProperty("anchor-name", O), e) : null;
		}
		function fe() {
			W !== void 0 && (window.clearTimeout(W), W = void 0);
		}
		function pe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function me() {
			w.value && H && (H = !1, U = !0, w.value.hidePopover?.()), j.value = "closed";
		}
		function he() {
			W = void 0, j.value = "closed";
		}
		function ge() {
			if (fe(), pe()) {
				j.value = "closed";
				return;
			}
			j.value = "closing", W = window.setTimeout(he, Ir);
		}
		function _e({ immediate: e = !1 } = {}) {
			if (!(!w.value || !H)) {
				if (U = !0, Se({ immediate: !0 }), e || pe()) {
					fe(), me();
					return;
				}
				j.value !== "closing" && (j.value = "closing", fe(), W = window.setTimeout(() => {
					W = void 0, me();
				}, Ir));
			}
		}
		function ve() {
			if (G = void 0, !w.value || !H) return;
			let e = w.value.style, t = w.value.getBoundingClientRect(), n = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, r = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, i = Number.parseFloat(getComputedStyle(w.value).getPropertyValue("--mat-menu-viewport-space")), a = Number.isFinite(i) ? i : 8, o = {
				bottom: t.bottom - r,
				left: t.left - n,
				right: t.right - n,
				top: t.top - r
			}, s = 0, c = 0;
			o.left < a ? s = a - o.left : o.right > window.innerWidth - a && (s = window.innerWidth - a - o.right), o.top < a ? c = a - o.top : o.bottom > window.innerHeight - a && (c = window.innerHeight - a - o.bottom), e.setProperty("--mat-menu-viewport-shift-x", `${s}px`), e.setProperty("--mat-menu-viewport-shift-y", `${c}px`);
		}
		function ye() {
			G !== void 0 && cancelAnimationFrame(G), G = requestAnimationFrame(ve);
		}
		async function be() {
			fe(), U = !1, await g();
			let e = Y.value ? null : de(), t = Y.value || !!e;
			if (!w.value || !t) {
				q.value || (console.warn(J.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), c("update:modelValue", !1));
				return;
			}
			H || (Y.value && document.activeElement instanceof HTMLElement && (ne = document.activeElement), H = !0, w.value.showPopover?.()), j.value = "open", q.value && (f.submenuOpen.value = !0), se.refresh(), se.focusFirst(), ye();
		}
		function xe() {
			let e = le() ?? ne;
			ne = null, g(() => e?.focus());
		}
		function Se({ immediate: e = !1 } = {}) {
			R.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function Ce({ focus: e = !0, immediate: t = !1 } = {}) {
			Se({ immediate: t }), q.value ? (A.value = !1, f.submenuOpen.value = !1) : c("update:modelValue", !1), _e({ immediate: t }), e && xe();
		}
		function we() {
			if (m) {
				m.closeTree();
				return;
			}
			Ce();
		}
		function Te(e) {
			R.set(e.element, e), Sn(Array.from(R.values()).filter((e) => !e.grouped)), se.queueRefresh();
		}
		function Ee(e) {
			R.delete(e.element), Sn(Array.from(R.values()).filter((e) => !e.grouped)), se.queueRefresh();
		}
		function Oe() {
			N.value += 1, se.queueRefresh();
		}
		function ke() {
			N.value = Math.max(0, N.value - 1), se.queueRefresh();
		}
		function Ae(e, { pointer: t = !1 } = {}) {
			R.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function je(e) {
			let t = getComputedStyle(w.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), se.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), se.focusFirst()) : e.key === "End" ? (e.preventDefault(), se.focusLast()) : e.key === "Escape" || q.value && e.key === t ? (e.preventDefault(), Ce()) : e.key === "Tab" && we();
		}
		function Me(e) {
			if (H = e.newState === "open", H) {
				ye();
				return;
			}
			let t = U;
			U = !1, Se(), q.value && (A.value = !1, f.submenuOpen.value = !1), !(!Z.value || t) && (ge(), q.value || c("update:modelValue", !1), xe());
		}
		C(_n, {
			closeOtherSubmenus: Ae,
			closeTree: we,
			closeOnClick: ie,
			color: Q,
			registerItem: Te,
			registerGroup: Oe,
			unregisterItem: Ee,
			unregisterGroup: ke,
			pointerHistory: M,
			variant: re
		}), f && f.registerSubmenu({
			close: Ce,
			element: w,
			id: D,
			open: be
		}), b(() => {
			se.observe(), window.addEventListener("resize", ye), window.addEventListener("scroll", ye, {
				capture: !0,
				passive: !0
			}), Z.value && Pe(), typeof ResizeObserver < "u" && (te = new ResizeObserver(ye), te.observe(w.value)), Z.value && be();
		}), x(() => {
			q.value || !Z.value || Y.value || le() !== B && (ue(), be());
		}), y(() => {
			fe(), G !== void 0 && cancelAnimationFrame(G), te?.disconnect(), window.removeEventListener("resize", ye), window.removeEventListener("scroll", ye, { capture: !0 }), Fe(), _e({ immediate: !0 }), ue(), f?.unregisterSubmenu();
		});
		function Ne(e) {
			M.previous = M.current, M.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Pe() {
			m || K || (document.addEventListener("pointermove", Ne, !0), K = !0);
		}
		function Fe() {
			K &&= (document.removeEventListener("pointermove", Ne, !0), !1);
		}
		return L(Z, (e) => {
			e ? (Pe(), be()) : (Fe(), _e());
		}), L(() => i.anchor, async () => {
			ue(), Z.value && await be();
		}, { deep: !0 }), L(() => i.offset, async () => {
			Z.value && (await g(), ye());
		}, { deep: !0 }), (e, n) => (S(), o(t, null, [!q.value && J.value ? (S(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-menu__activator"
		}, [k(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), u(Ft, h({
			id: D.value,
			ref_key: "surface",
			ref: v
		}, e.$attrs, {
			class: ["mat-menu", [`mat-menu--${re.value}`, {
				"mat-menu--coordinate": Y.value,
				"mat-menu--grouped": X.value,
				"mat-menu--nested": q.value,
				"mat-menu--closing": j.value === "closing"
			}]],
			style: oe.value,
			popover: "auto",
			role: "menu",
			onPointerenter: n[0] ||= (e) => P(f)?.cancelSubmenuClose(),
			onFocusin: P(se).handleFocusIn,
			onKeydown: je,
			onToggle: Me
		}), {
			default: z(() => [s("div", Fr, [k(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"id",
			"class",
			"style",
			"onFocusin"
		])], 64));
	}
}), [["__scopeId", "data-v-8255369d"]]), Rr = ["aria-labelledby"], zr = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = e, n = ee(), i = p(_n, null), s = `${F().replace(/[^\w-]/g, "-")}-label`, c = r(() => t.label ? s : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), Sn(Array.from(l));
		}
		function d(e) {
			l.delete(e), Sn(Array.from(l));
		}
		return C(yn, {
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
		}, N(e.label), 1)) : a("", !0), k(t.$slots, "default", {}, void 0, !0)], 16, Rr));
	}
}), [["__scopeId", "data-v-8632d18c"]]), Br = { class: "mat-menu-item-host" }, Vr = 300, Hr = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let n = e, s = t, l = I(), d = p(_n, null), f = p(yn, null), m = p(Z, X), g = E(null), _ = r(() => g.value?.root ?? g.value?.$el ?? null), v = E(!1), x = E(void 0), w = E("only"), T, D, O = r(() => !!l.submenu);
		function A({ delay: e = 0, focus: t = !1, immediate: n = !1 } = {}) {
			if (j(), e > 0) {
				D = setTimeout(() => {
					v.value = !1, T?.close({
						focus: t,
						immediate: n
					});
				}, e);
				return;
			}
			v.value = !1, T?.close({
				focus: t,
				immediate: n
			});
		}
		function j() {
			clearTimeout(D), D = void 0;
		}
		async function M({ pointer: e = !1 } = {}) {
			!O.value || n.disabled || (d?.closeOtherSubmenus(F, { pointer: e }), v.value = !0, await T?.open());
		}
		function N(e) {
			T = e, x.value = e.id.value;
		}
		function ee() {
			T = void 0, x.value = void 0, v.value = !1;
		}
		let F = {
			closeSubmenu: A,
			element: _,
			grouped: !!f,
			setPosition(e) {
				w.value = e;
			},
			getSubmenuCloseDelay() {
				if (!T?.element?.value || !d?.pointerHistory || !_.value) return 0;
				let e = _.value.getBoundingClientRect(), t = T.element.value.getBoundingClientRect(), n = t.left < e.left ? "left" : "right";
				return xn(d.pointerHistory.current, d.pointerHistory.previous, t, n) ? Vr : 0;
			}
		};
		function L(e) {
			if (O.value) {
				M();
				return;
			}
			s("click", e), d?.closeOnClick.value && d.closeTree();
		}
		function R(e) {
			if (!O.value) return;
			let t = getComputedStyle(_.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), M());
		}
		return C(vn, {
			cancelSubmenuClose: j,
			element: _,
			registerSubmenu: N,
			submenuOpen: v,
			unregisterSubmenu: ee
		}), b(() => {
			f?.registerItem(F), d?.registerItem(F);
		}), y(() => {
			clearTimeout(D), f?.unregisterItem(F), d?.unregisterItem(F);
		}), (t, n) => (S(), o("span", Br, [u(q, h({
			ref_key: "action",
			ref: g
		}, t.$attrs, {
			class: ["mat-menu-item", [`mat-menu-item--${w.value}`, { "mat-menu-item--submenu-open": v.value }]],
			"data-mat-menu-item": "",
			"aria-controls": O.value ? x.value : void 0,
			"aria-expanded": O.value ? String(v.value) : void 0,
			"aria-haspopup": O.value ? "menu" : void 0,
			disabled: e.disabled,
			role: "menuitem",
			"use-cursor": P(m).useCursor,
			onClick: L,
			onKeydown: R,
			onPointerenter: n[0] ||= (e) => M({ pointer: !0 })
		}), {
			default: z(() => [u(sn, {
				namespace: "mat-menu-item-content",
				"line-count": t.$slots.supporting ? 2 : 1,
				"leading-icon": ""
			}, c({
				trailing: z(() => [t.$slots.trailing ? k(t.$slots, "trailing", { key: 0 }, void 0, !0) : O.value ? (S(), i(ke, {
					key: 1,
					as: "span",
					class: "mat-menu-item__submenu-icon",
					icon: "chevron_right",
					"optical-size": 20,
					size: "small",
					"aria-hidden": "true"
				})) : a("", !0)]),
				default: z(() => [k(t.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [t.$slots.leading ? {
				name: "leading",
				fn: z(() => [k(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, t.$slots.supporting ? {
				name: "supporting",
				fn: z(() => [k(t.$slots, "supporting", {}, void 0, !0)]),
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
		]), t.$slots.submenu ? k(t.$slots, "submenu", { key: 0 }, void 0, !0) : a("", !0)]));
	}
}), [["__scopeId", "data-v-b44804e6"]]), Ur = M([]), Wr = null;
function Gr() {
	if (!Wr) return;
	let { lockedScrollbarGutter: e, overflow: t, root: n, scrollbarGutter: r } = Wr;
	n.style.overflow === "hidden" && (n.style.overflow = t), e !== null && n.style.scrollbarGutter === e && (n.style.scrollbarGutter = r), Wr = null;
}
function Kr() {
	if (Wr) return;
	let e = document.documentElement, t = e.clientWidth > 0 ? Math.max(0, window.innerWidth - e.clientWidth) : 0, n = getComputedStyle(e).scrollbarGutter, r = t > 0 && !n.includes("stable");
	Wr = {
		lockedScrollbarGutter: r ? "stable" : null,
		overflow: e.style.overflow,
		root: e,
		scrollbarGutter: e.style.scrollbarGutter
	}, r && (e.style.scrollbarGutter = Wr.lockedScrollbarGutter), e.style.overflow = "hidden";
}
function qr(e) {
	let t = Ur.value.filter((e) => e.isConnected);
	if (t.length === 0 && Gr(), t.includes(e)) {
		Ur.value = t;
		return;
	}
	Ur.value = [...t, e], Kr();
}
function Jr(e) {
	Ur.value = Ur.value.filter((t) => t !== e && t.isConnected), Ur.value.length === 0 && Gr();
}
//#endregion
//#region src/components/mat-dialog/MatDialog.vue
var Yr = { class: "mat-dialog__header" }, Xr = {
	key: 1,
	class: "mat-dialog__actions"
}, Zr = {
	key: 0,
	class: "mat-dialog__content"
}, Qr = {
	key: 2,
	class: "mat-dialog__content"
}, $r = {
	key: 3,
	class: "mat-dialog__actions"
}, ei = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let f = e, p = c, m = ee(), _ = I(), v = E(null), x = E(null), C = E(!1), w = E("closed"), T = E(null), D = `${F().replace(/[^\w-]/g, "-")}-title`, O = r(() => x.value?.root ?? x.value?.$el ?? null), A = r(() => f.title !== void 0 || !!_.title), j = r(() => f.content !== void 0 || !!_.default), M = r(() => !f.fullScreen && (f.icon !== void 0 || !!_.icon)), P = r(() => !!_.activator), B = r(() => Ur.value.at(-1) === O.value), { colorStyle: V } = De(r(() => f.color)), H = r(() => {
			if (!(f.fullScreen || f.width === void 0)) return {
				inlineSize: `min(${d(f.width)}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), U = r(() => [
			V.value,
			m.style,
			H.value
		]), W = !1, G, te = null;
		function ne() {
			let e = v.value ? [...v.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function K() {
			G !== void 0 && (window.clearTimeout(G), G = void 0);
		}
		function q() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function J(e, t) {
			if (K(), q()) {
				t();
				return;
			}
			G = window.setTimeout(() => {
				G = void 0, t();
			}, e);
		}
		function Y() {
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return f.attach instanceof HTMLElement && f.attach.ownerDocument === document ? f.attach : null;
		}
		function X() {
			p("update:modelValue", !1);
		}
		function Z() {
			A.value || m["aria-label"] || m["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function re() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function Q() {
			let e = O.value;
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
			if (K(), C.value && O.value?.open) {
				w.value = "opening", J(400, () => {
					w.value = "open", p("opened");
				});
				return;
			}
			let e = P.value ? ne() : null;
			if (P.value && !e) {
				re(), X();
				return;
			}
			let t = Y();
			if (!t) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), X();
				return;
			}
			te = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), T.value = t, C.value = !0, w.value = "opening", Z(), await g(), !(!f.modelValue || !O.value) && (O.value.open || O.value.showModal(), qr(O.value), Q(), J(400, () => {
				w.value = "open", p("opened");
			}));
		}
		function ae() {
			let e = O.value;
			e?.open && e.close(), e && Jr(e), C.value = !1, w.value = "closed", g(() => {
				te?.isConnected && te.focus({ preventScroll: !0 }), te = null, p("closed");
			});
		}
		function $() {
			C.value && (w.value = "closing", J(200, ae));
		}
		function oe(e) {
			e.preventDefault(), X();
		}
		function se(e) {
			e.key === "Escape" && (e.preventDefault(), X());
		}
		function ce(e) {
			if (!f.closeOnBack || e.target !== O.value) return;
			let t = O.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && X();
		}
		return b(() => {
			W = !0, f.modelValue && ie();
		}), y(() => {
			W = !1, K(), O.value && (Jr(O.value), O.value.open && O.value.close());
		}), L(() => f.modelValue, (e) => {
			W && (e ? ie() : $());
		}), L(() => f.attach, () => {
			f.modelValue && C.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), R(() => {
			f.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (r, c) => (S(), o(t, null, [P.value ? (S(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: v,
			class: "mat-dialog__activator"
		}, [k(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), C.value ? (S(), i(n, {
			key: 1,
			to: T.value
		}, [u(Ft, h({
			ref_key: "surface",
			ref: x
		}, r.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${w.value}`, {
				"mat-dialog--full-screen": e.fullScreen,
				"mat-dialog--with-icon": M.value,
				"mat-dialog--top": B.value,
				"mat-dialog--transparent-scrim": !e.scrim
			}]],
			style: U.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (A.value ? D : void 0),
			tabindex: "-1",
			onCancel: oe,
			onClick: ce,
			onKeydown: se
		}), {
			default: z(() => [e.fullScreen ? (S(), o(t, { key: 0 }, [s("header", Yr, [
				u(_t, {
					class: "mat-dialog__close",
					icon: "close",
					label: e.closeLabel,
					size: "small",
					variant: "standard",
					onClick: X
				}, null, 8, ["label"]),
				A.value ? (S(), o("h2", {
					key: 0,
					id: D,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? k(r.$slots, "title", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.title), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (S(), o("div", Xr, [k(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			]), j.value ? (S(), o("div", Zr, [e.content === void 0 ? k(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.content), 1)], 64))])) : a("", !0)], 64)) : (S(), o(t, { key: 1 }, [
				M.value ? (S(), i(ke, {
					key: 0,
					as: "div",
					class: "mat-dialog__icon",
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: z(() => [e.icon === void 0 ? k(r.$slots, "icon", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.icon), 1)], 64))]),
					_: 3
				})) : a("", !0),
				A.value ? (S(), o("h2", {
					key: 1,
					id: D,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? k(r.$slots, "title", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.title), 1)], 64))])) : a("", !0),
				j.value ? (S(), o("div", Qr, [e.content === void 0 ? k(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.content), 1)], 64))])) : a("", !0),
				r.$slots.actions ? (S(), o("div", $r, [k(r.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			], 64))]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-e7e0d33b"]]), ti = ["aria-label"], ni = {
	key: 1,
	class: "mat-sheet__header"
}, ri = {
	key: 1,
	class: "mat-sheet__header-actions"
}, ii = {
	key: 2,
	class: "mat-sheet__content"
}, ai = {
	key: 3,
	class: "mat-sheet__footer"
}, oi = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let d = e, f = c, p = ee(), m = I(), _ = E(null), v = E(null), x = E(!1), C = E("closed"), w = E(null), T = E(typeof window > "u" ? 0 : window.innerWidth), D = E(0), O = E(null), A = E(!1), j = `${F().replace(/[^\w-]/g, "-")}-title`, M = r(() => v.value?.root ?? v.value?.$el ?? null), P = r(() => d.variant === "auto" ? T.value < d.breakpoint ? "modal" : "standard" : d.variant), R = r(() => P.value === "modal"), V = r(() => R.value && Ur.value.at(-1) === M.value), H = r(() => !!m.activator), U = r(() => d.title !== void 0 || !!m.title), W = r(() => d.content !== void 0 || !!m.default), G = r(() => d.closable || d.direction === "bottom" && R.value && d.expanded), te = r(() => d.expanded ? R.value ? d.expandedDragHandleLabel : d.collapseDragHandleLabel : d.dragHandleLabel), ne = r(() => U.value || G.value || !!m.header || !!m.actions), K = r(() => R.value ? "dialog" : "aside"), q = r(() => {
			if (d.width !== void 0) return typeof d.width == "number" ? `${d.width}px` : d.width.trim();
		}), J = r(() => {
			if (q.value) return { "--mat-sheet-preferred-width": q.value };
		}), Y = r(() => ({
			"--mat-sheet-drag-offset": `${D.value}px`,
			...O.value === null ? {} : { "--mat-sheet-drag-size": `${O.value}px` }
		})), X = r(() => [
			p.style,
			J.value,
			Y.value
		]), Z = !1, re, Q = null, ie = !1, ae = null, $ = 0, oe = 0, se = 0, ce = 0, le = !1;
		function ue() {
			re !== void 0 && (window.clearTimeout(re), re = void 0);
		}
		function de() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function fe(e, t) {
			if (ue(), de()) {
				t();
				return;
			}
			re = window.setTimeout(() => {
				re = void 0, t();
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
				if (R.value) {
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
			!R.value || U.value || p["aria-label"] || p["aria-labelledby"] || console.warn(`${d.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
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
			e instanceof HTMLDialogElement && (e.open || e.showModal(), qr(e), xe());
		}
		async function Ce() {
			if (ue(), x.value) {
				C.value = "opening", fe(400, () => {
					C.value = "open", f("opened");
				});
				return;
			}
			let e = H.value ? pe() : null;
			if (H.value && !e) {
				ve(), he();
				return;
			}
			if (R.value) {
				let t = me();
				if (!t) {
					be(), he();
					return;
				}
				w.value = t, Q = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			}
			ie = R.value, x.value = !0, C.value = "opening", ye(), await g(), !(!d.modelValue || !M.value) && (R.value && Se(), fe(400, () => {
				C.value = "open", f("opened");
			}));
		}
		function we() {
			ie && Q?.isConnected && Q.focus({ preventScroll: !0 }), Q = null, ie = !1;
		}
		function Te() {
			let e = M.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), Jr(e)), x.value = !1, C.value = "closed", D.value = 0, O.value = null, g(() => {
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
			if (!R.value || !d.closeOnBack || e.target !== M.value) return;
			let t = M.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && he();
		}
		function Ae(e) {
			if (e.pointerId === ae) {
				if (d.direction === "bottom") {
					if (ce = e.clientY - $, !d.expanded && ce < 0 || d.expanded && ce > 0) {
						D.value = 0, O.value = Math.max(0, oe - ce);
						return;
					}
					D.value = Math.max(0, ce), O.value = oe;
					return;
				}
				D.value = d.position === "start" ? Math.max(0, $ - e.clientX) : Math.max(0, e.clientX - $);
			}
		}
		function je() {
			ae = null, A.value = !1, window.removeEventListener("pointermove", Ae), window.removeEventListener("pointerup", Me), window.removeEventListener("pointercancel", Ne);
		}
		function Me(e) {
			if (e.pointerId !== ae) return;
			let t = M.value, n = d.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - se), i = d.direction === "bottom" ? Math.abs(ce) : D.value, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (le = i >= 4, je(), d.direction === "bottom" && o) {
				if (!d.expanded && ce < 0) {
					D.value = 0, O.value = null, f("update:expanded", !0);
					return;
				}
				if (d.expanded && ce > 0) {
					D.value = 0, O.value = null, f("update:expanded", !1);
					return;
				}
				if (!d.expanded && ce > 0) {
					O.value = null, he();
					return;
				}
			}
			if (d.direction === "side" && o) {
				he();
				return;
			}
			D.value = 0, O.value = null;
		}
		function Ne() {
			je(), D.value = 0, O.value = null;
		}
		function Pe(e) {
			!d.draggable || e.button !== 0 || ae !== null || (ae = e.pointerId, $ = d.direction === "bottom" ? e.clientY : e.clientX, oe = d.direction === "bottom" ? M.value?.getBoundingClientRect().height ?? 0 : M.value?.getBoundingClientRect().width ?? 0, se = performance.now(), ce = 0, O.value = d.direction === "bottom" ? oe : null, A.value = !0, window.addEventListener("pointermove", Ae), window.addEventListener("pointerup", Me), window.addEventListener("pointercancel", Ne));
		}
		function Fe(e) {
			d.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Pe(e);
		}
		function Ie() {
			T.value = window.innerWidth;
		}
		async function Le(e, t) {
			if (!x.value || !d.modelValue || e === t) return;
			ue();
			let n = M.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), Jr(n), we()), e === "modal") {
				let e = me();
				if (!e) {
					be(), he();
					return;
				}
				w.value = e, Q = document.activeElement instanceof HTMLElement ? document.activeElement : null, ie = !0, ye();
			}
			C.value = "open", await g(), e === "modal" && d.modelValue && Se();
		}
		return b(() => {
			Z = !0, Ie(), window.addEventListener("resize", Ie), d.modelValue && Ce();
		}), y(() => {
			Z = !1, ue(), je(), window.removeEventListener("resize", Ie);
			let e = M.value;
			e instanceof HTMLDialogElement && (Jr(e), e.open && e.close());
		}), L(() => d.modelValue, (e) => {
			Z && (e ? Ce() : Ee());
		}), L(P, Le), L(() => d.attach, () => {
			d.modelValue && x.value && R.value && console.warn(`${d.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), L(() => d.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${d.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, c) => (S(), o(t, null, [H.value ? (S(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-sheet__activator"
		}, [k(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), x.value ? (S(), i(n, {
			key: 1,
			to: w.value ?? "body",
			disabled: !R.value
		}, [u(Ft, h({
			ref_key: "surface",
			ref: v
		}, r.$attrs, {
			as: K.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${P.value}`,
				`mat-sheet--${C.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--dragging": A.value,
					"mat-sheet--expanded": e.direction === "bottom" && e.expanded,
					"mat-sheet--top": V.value,
					"mat-sheet--transparent-scrim": !e.scrim
				}
			]],
			style: X.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (U.value ? j : void 0),
			tabindex: R.value ? -1 : void 0,
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
					"aria-label": te.value,
					onClick: ge,
					onKeydown: _e,
					onPointerdown: B(Pe, ["stop"])
				}, [k(r.$slots, "drag-handle", {}, () => [c[0] ||= s("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, ti)) : a("", !0),
				ne.value ? (S(), o("header", ni, [k(r.$slots, "header", {}, () => [
					U.value ? (S(), o("h2", {
						key: 0,
						id: j,
						class: "mat-sheet__title"
					}, [e.title === void 0 ? k(r.$slots, "title", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.title), 1)], 64))])) : a("", !0),
					r.$slots.actions ? (S(), o("div", ri, [k(r.$slots, "actions", {}, void 0, !0)])) : a("", !0),
					G.value ? (S(), i(_t, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: he
					}, null, 8, ["label"])) : a("", !0)
				], !0)])) : a("", !0),
				W.value ? (S(), o("div", ii, [e.content === void 0 ? k(r.$slots, "default", { key: 1 }, void 0, !0) : (S(), o(t, { key: 0 }, [l(N(e.content), 1)], 64))])) : a("", !0),
				r.$slots.footer ? (S(), o("div", ai, [k(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
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
}), [["__scopeId", "data-v-17949de9"]]), si = /*@__PURE__*/ Object.assign({
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
		return (e, t) => (S(), i(oi, h(n, {
			"component-name": "MatBottomSheet",
			direction: "bottom",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e),
			"onUpdate:expanded": t[1] ||= (e) => r("update:expanded", e),
			onOpened: t[2] ||= (e) => r("opened"),
			onClosed: t[3] ||= (e) => r("closed")
		}), c({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: z(() => [k(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots["drag-handle"] ? {
				name: "drag-handle",
				fn: z(() => [k(e.$slots, "drag-handle")]),
				key: "1"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: z(() => [k(e.$slots, "header")]),
				key: "2"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: z(() => [k(e.$slots, "title")]),
				key: "3"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: z(() => [k(e.$slots, "default")]),
				key: "4"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: z(() => [k(e.$slots, "actions")]),
				key: "5"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: z(() => [k(e.$slots, "footer")]),
				key: "6"
			} : void 0
		]), 1040));
	}
}), ci = /*@__PURE__*/ Object.assign({
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
		return (e, t) => (S(), i(oi, h(n, {
			"component-name": "MatSideSheet",
			direction: "side",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e),
			onOpened: t[1] ||= (e) => r("opened"),
			onClosed: t[2] ||= (e) => r("closed")
		}), c({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: z(() => [k(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: z(() => [k(e.$slots, "header")]),
				key: "1"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: z(() => [k(e.$slots, "title")]),
				key: "2"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: z(() => [k(e.$slots, "default")]),
				key: "3"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: z(() => [k(e.$slots, "actions")]),
				key: "4"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: z(() => [k(e.$slots, "footer")]),
				key: "5"
			} : void 0
		]), 1040));
	}
}), li = { class: "mat-container__content" }, ui = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		return (e, n) => (S(), o("div", h(e.$attrs, { class: ["mat-container", { "mat-container--fluid": t.fluid }] }), [s("div", li, [k(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-f98574ca"]]), di = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-61d08a89"]]), fi = ["aria-valuemax", "aria-valuenow"], pi = ["width", "height"], mi = { key: 0 }, hi = ["width", "height"], gi = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, _i = ["d"], vi = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, yi = ["d"], bi = ["d", "mask"], xi = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, Si = ["d"], Ci = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, wi = ["d"], Ti = ["d"], Ei = {
	key: 1,
	class: "mat-loader__linear-stop"
}, Di = ["viewBox"], Oi = { class: "mat-loader__circular-linear-rotate" }, ki = { class: "mat-loader__circular-rotate-arc" }, Ai = [
	"cx",
	"cy",
	"r"
], ji = ["d"], Mi = 4, Ni = 3, Pi = 40, Fi = 1.6, Ii = 15, Li = 4, Ri = .001, zi = 100, Bi = 300, Vi = 900, Hi = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
				let t = (e - o) / Pi * Math.PI * 2, n = a - Math.sin(t - i) * r;
				l.push(`L ${c(e)} ${c(n)}`);
			}
			let u = (s - o) / Pi * Math.PI * 2, d = a - Math.sin(u - i) * r;
			return l.push(`L ${c(s)} ${c(d)}`), l.join(" ");
		}
		function d(e, t, n, r) {
			let i = Math.max(1, Math.round(Math.PI * 2 * t / Ii)), a = i * 12, o = [];
			for (let s = 0; s <= a; s += 1) {
				let l = s / a, u = l * Math.PI * 2, d = l * Math.PI * 2 * i, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = s === 0 ? "M" : "L";
				o.push(`${h} ${c(p)} ${c(m)}`);
			}
			return o.push("Z"), o.join(" ");
		}
		let f = e, { colorStyle: p } = De(r(() => f.color)), m = E(null), g = E(zi), _ = E(+(f.shape === "wavy")), x = E(0), C = `mat-loader-linear-mask-${F()}`, w, T, D, O = r(() => i(f.max) ? f.max : 1), k = r(() => i(f.thickness) ? f.thickness : 4), A = r(() => f.variant === "circular"), j = r(() => f.shape === "wavy"), M = r(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), O.value);
		}), N = r(() => Number((M.value / O.value * 100).toFixed(3))), P = r(() => k.value + Ni * 2 * _.value), ee = r(() => Math.min(100, k.value / g.value * 100)), I = r(() => {
			let e = g.value - k.value;
			return e <= 0 ? 1 : g.value / e;
		}), R = r(() => N.value === 100 ? 100 : Math.min(100, Math.max(N.value, ee.value + Ri))), z = r(() => u(g.value, P.value, k.value, 0, 0)), B = r(() => u(g.value, P.value, k.value, Ni * _.value, x.value)), V = r(() => k.value + 36 + 8 * _.value), H = r(() => V.value / 2), U = r(() => H.value - k.value / 2 - Fi * _.value), W = r(() => `0 0 ${V.value} ${V.value}`), G = r(() => d(H.value, U.value, Fi * _.value, x.value)), te = r(() => {
			let e = Math.PI * 2 * U.value;
			return (Mi + k.value) / e * 100;
		}), ne = r(() => Math.min(12, te.value)), K = r(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - N.value - te.value * 2).toFixed(3)), t = Number(Math.min(100, N.value + te.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${c(e)} ${c(100 - e)}`,
				strokeDashoffset: `-${c(t)}`
			};
		}), q = r(() => f.indeterminate ? {} : { strokeDasharray: `${c(N.value === 0 ? Ri : N.value)} 200` }), J = r(() => ({
			...p.value,
			"--mat-loader-circular-gap-progress": c(ne.value),
			"--mat-loader-circular-radius": `${U.value}px`,
			"--mat-loader-circular-size": `${V.value}px`,
			"--mat-loader-indicator-gap-size": `${Mi}px`,
			"--mat-loader-linear-cap-progress": c(ee.value),
			"--mat-loader-linear-path-scale": c(I.value),
			"--mat-loader-linear-segment-end": c(R.value),
			"--mat-loader-linear-segment-end-position": `${c(R.value)}%`,
			"--mat-loader-linear-size": `${P.value}px`,
			"--mat-loader-progress": `${N.value}`,
			"--mat-loader-stop-indicator-size": `${Li}px`,
			"--mat-loader-thickness": `${k.value}px`
		}));
		function Y(e) {
			T = void 0;
			let t = D === void 0 ? 0 : Math.min(64, e - D), n = +!!j.value, r = n - _.value;
			if (D = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / Bi);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (x.value += t / Vi * Math.PI * 2, x.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? T = globalThis.requestAnimationFrame(Y) : D = void 0;
		}
		function X() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!j.value;
				return;
			}
			T === void 0 && (D = void 0, T = globalThis.requestAnimationFrame(Y));
		}
		return L(j, X), L(() => f.waveMotion, X), b(() => {
			X(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (w = new globalThis.ResizeObserver(([e]) => {
				let t = e.contentRect.width;
				t > 0 && (g.value = t);
			}), w.observe(m.value));
		}), y(() => {
			w?.disconnect(), T !== void 0 && globalThis.cancelAnimationFrame?.(T);
		}), (n, r) => (S(), o("div", h(n.$attrs, {
			class: ["mat-loader", [
				`mat-loader--${e.variant}`,
				`mat-loader--${e.shape}`,
				{
					"mat-loader--indeterminate": e.indeterminate,
					"mat-loader--wave-motion": e.waveMotion
				}
			]],
			style: J.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": O.value,
			"aria-valuenow": e.indeterminate ? void 0 : M.value
		}), [A.value ? (S(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: W.value,
			"aria-hidden": "true"
		}, [s("g", Oi, [s("g", ki, [s("circle", {
			class: "mat-loader__circular-track",
			cx: H.value,
			cy: H.value,
			r: U.value,
			pathLength: "100",
			style: v(K.value)
		}, null, 12, Ai), s("path", {
			class: "mat-loader__circular-active",
			d: G.value,
			pathLength: "100",
			style: v(q.value)
		}, null, 12, ji)])])], 8, Di)) : (S(), o("span", {
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
				e.indeterminate ? (S(), o("defs", mi, [s("mask", {
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
					s("g", gi, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: B.value,
						pathLength: "100"
					}, null, 8, _i)]),
					s("g", vi, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: B.value,
						pathLength: "100"
					}, null, 8, yi)])
				], 8, hi)])) : a("", !0),
				e.indeterminate ? (S(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: z.value,
					pathLength: "100",
					mask: `url(#${C})`
				}, null, 8, bi)) : a("", !0),
				e.indeterminate ? (S(), o(t, { key: 2 }, [s("g", xi, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: B.value,
					pathLength: "100"
				}, null, 8, Si)]), s("g", Ci, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: B.value,
					pathLength: "100"
				}, null, 8, wi)])], 64)) : (S(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: B.value,
					pathLength: "100"
				}, null, 8, Ti))
			], 8, pi)),
			e.indeterminate ? a("", !0) : (S(), o("span", Ei))
		], 512))], 16, fi));
	}
}), [["__scopeId", "data-v-09e887cb"]]), Ui = Symbol("mat-snackbar-externally-managed"), Wi = [], Gi = null;
function Ki() {
	Gi || Wi.length === 0 || (Gi = Wi.shift(), Gi.activate());
}
function qi(e) {
	e === Gi || Wi.includes(e) || (Wi.push(e), Ki());
}
function Ji(e) {
	let t = Wi.indexOf(e);
	t !== -1 && Wi.splice(t, 1);
}
function Yi(e) {
	Gi === e && (Gi = null, Ki());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var Xi = { class: "mat-snackbar__text" }, Zi = {
	key: 0,
	class: "mat-snackbar__controls"
}, Qi = {
	key: 0,
	class: "mat-snackbar__action"
}, $i = {
	key: 1,
	class: "mat-snackbar__close"
}, ea = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let d = e, f = c, m = I(), _ = p(Z, X), v = p(je, null), x = p(Ui, !1), C = E(!1), w = E("closed"), T = E(!1), D = r(() => !!m.default || typeof d.text == "string" && d.text.trim().length > 0), O = r(() => !!m.action || typeof d.actionText == "string" && d.actionText.trim().length > 0), A = r(() => !!m.close || d.closable), j = r(() => O.value || A.value), M = E(0), ee = r(() => v ? v.snackbarLayer.value : document.body), F = r(() => typeof d.closeLabel == "string" && d.closeLabel.trim().length > 0 ? d.closeLabel : "关闭"), R = !1, B, V, H = !1, U = null, W = r(() => ({ "--mat-snackbar-toolbar-clearance": `${M.value}px` }));
		function G() {
			M.value = st();
		}
		let te = { activate: le };
		function ne() {
			B !== void 0 && (window.clearTimeout(B), B = void 0);
		}
		function K() {
			V !== void 0 && (window.clearTimeout(V), V = void 0);
		}
		function J() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Y(e, t) {
			if (K(), J()) {
				t();
				return;
			}
			V = window.setTimeout(() => {
				V = void 0, t();
			}, e);
		}
		function re() {
			return Number.isFinite(d.duration) && d.duration >= 0 ? d.duration : 4e3;
		}
		function Q() {
			ne();
			let e = re();
			e !== 0 && (B = window.setTimeout(() => {
				B = void 0, se();
			}, e));
		}
		function ie() {
			H || (H = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function ae() {
			C.value && (C.value = !1, w.value = "closed", f("closed"), x || Yi(te));
		}
		function $() {
			if (ne(), !C.value) {
				x || Ji(te);
				return;
			}
			w.value !== "closing" && (w.value = "closing", Y(200, ae));
		}
		function oe() {
			T.value || (T.value = !0, f("update:modelValue", !1));
		}
		function se() {
			oe(), $();
		}
		function ce() {
			!C.value || w.value === "closing" || (se(), f("action"));
		}
		async function le() {
			if (!R || !d.modelValue || T.value || !D.value) {
				D.value || (ie(), oe()), x || Yi(te);
				return;
			}
			ne(), K(), C.value = !0, w.value = "opening", await g(), !(!R || !C.value || w.value === "closing") && Y(400, () => {
				!C.value || w.value === "closing" || (w.value = "open", Q());
			});
		}
		function ue() {
			if (T.value || !D.value) {
				D.value || (ie(), se());
				return;
			}
			if (x) {
				le();
				return;
			}
			if (C.value && w.value === "closing") {
				le();
				return;
			}
			qi(te);
		}
		return b(() => {
			R = !0, v || (U = ct(G), G()), d.modelValue && ue();
		}), y(() => {
			R = !1, U?.(), U = null, ne(), K(), x || (C.value ? Yi(te) : Ji(te));
		}), L(() => d.modelValue, (e) => {
			if (R) {
				if (e) {
					T.value = !1, ue();
					return;
				}
				T.value = !1, $();
			}
		}), L(D, (e) => {
			if (R) {
				if (!e) {
					se();
					return;
				}
				H = !1, d.modelValue && !C.value && !T.value && ue();
			}
		}), L(() => d.duration, () => {
			w.value === "open" && Q();
		}), (r, c) => ee.value ? (S(), i(n, {
			key: 0,
			to: ee.value
		}, [C.value ? (S(), o("section", h({ key: 0 }, r.$attrs, {
			class: ["mat-snackbar", [
				`mat-snackbar--${w.value}`,
				`mat-snackbar--${e.position}`,
				{
					"mat-snackbar--app-root": P(v),
					"mat-snackbar--with-trailing": j.value
				}
			]],
			style: W.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [s("div", Xi, [r.$slots.default ? k(r.$slots, "default", { key: 0 }, void 0, !0) : (S(), o(t, { key: 1 }, [l(N(e.text), 1)], 64))]), j.value ? (S(), o("div", Zi, [O.value ? (S(), o("div", Qi, [r.$slots.action ? k(r.$slots, "action", {
			key: 0,
			action: ce
		}, void 0, !0) : (S(), i(q, {
			key: 1,
			class: "mat-snackbar__default-action",
			"use-cursor": P(_).useCursor,
			onClick: ce
		}, {
			default: z(() => [l(N(e.actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : a("", !0), A.value ? (S(), o("div", $i, [r.$slots.close ? k(r.$slots, "close", {
			key: 0,
			close: se
		}, void 0, !0) : (S(), i(q, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": F.value,
			"use-cursor": P(_).useCursor,
			onClick: se
		}, {
			default: z(() => [u(ke, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : a("", !0)])) : a("", !0)], 16)) : a("", !0)], 8, ["to"])) : a("", !0);
	}
}), [["__scopeId", "data-v-b1b76d2a"]]), ta = ["aria-orientation"], na = { class: "mat-toolbar__surface" }, ra = { class: "mat-toolbar__content" }, ia = 200, aa = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let m = e, _ = ee(), x = I(), C = d(), w = p(je, null), T = C?.vnode.props ?? {}, D = Object.prototype.hasOwnProperty.call(T, "attach"), O = E(m.modelValue), A = E(m.modelValue ? "open" : "closed"), j = E(null), N = E(null), F = E({
			blockSize: 0,
			inlineSize: 0
		}), R = r(() => c.includes(m.variant) ? m.variant === "floating" ? "floating-bottom" : m.variant : "docked"), z = r(() => [
			"start",
			"center",
			"end"
		].includes(m.position) ? m.position : "center"), B = r(() => R.value.startsWith("floating")), V = r(() => R.value === "floating-left" || R.value === "floating-right"), H = r(() => R.value === "docked" || R.value === "floating-bottom"), U = r(() => m.app && !!w && !D), W = r(() => {
			if (!m.app) return null;
			if (U.value) return B.value ? w.freeLayer.value : w.edgeLayer.value;
			if (typeof m.attach == "string") try {
				return document.querySelector(m.attach);
			} catch {
				return null;
			}
			return f(m.attach);
		}), G = r(() => u(m.bottomPlaceholder)), te = r(() => H.value ? G.value : "0px"), ne = r(() => [_.style, {
			"--mat-toolbar-app-end-inset": `${J.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${J.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": te.value
		}]), K = r(() => ({
			blockSize: `${F.value.blockSize}px`,
			inlineSize: `${F.value.inlineSize}px`
		})), q = r(() => [
			`mat-toolbar--${R.value}`,
			`mat-toolbar--position-${z.value}`,
			{
				"mat-toolbar--app": m.app,
				"mat-toolbar--app-root": U.value,
				"mat-toolbar--vertical": V.value,
				"mat-toolbar--vibrant": m.vibrant
			}
		]), J = M(null), Y, X, Z = !1, re = !1, Q, ie = !1;
		function ae() {
			Q !== void 0 && (window.clearTimeout(Q), Q = void 0);
		}
		function $() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function oe(e) {
			if (ae(), $()) {
				e();
				return;
			}
			Q = window.setTimeout(() => {
				Q = void 0, e();
			}, ia);
		}
		function se() {
			ae(), O.value = !0, A.value = "opening", oe(() => {
				O.value && m.modelValue && (A.value = "open");
			});
		}
		function ce() {
			if (ae(), !O.value) {
				A.value = "closed";
				return;
			}
			A.value = "closing", oe(() => {
				m.modelValue || (O.value = !1, A.value = "closed");
			});
		}
		function le() {
			ie || !x.fab || B.value || (ie = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function ue() {
			let e = j.value?.getBoundingClientRect();
			e && (F.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, Y?.update(), J.value?.update());
		}
		function de() {
			if (!j.value) return null;
			let e = j.value.getBoundingClientRect(), t = N.value?.getBoundingClientRect();
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
			re && (await g(), ue());
		}
		function pe() {
			X?.disconnect(), X = void 0, Z = !1, window.removeEventListener("resize", ue), Y?.unregister(), Y = void 0, J.value?.unregister(), J.value = null;
		}
		async function me() {
			if (await g(), re) {
				if (!O.value || !j.value) {
					pe();
					return;
				}
				Z || (Z = !0, X = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ue), X?.observe(j.value), window.addEventListener("resize", ue)), U.value ? (Y?.unregister(), Y = void 0, !B.value && !J.value && (J.value = w.publicContext.registerEdge({
					edge: "bottom",
					element: j.value
				})), B.value && J.value && (J.value.unregister(), J.value = null)) : (J.value?.unregister(), J.value = null, Y ||= at(j.value, {
					getRect: de,
					isBottom: () => H.value
				})), N.value && X?.observe(N.value), ue(), le();
			}
		}
		b(() => {
			re = !0, he(), le(), me();
		}), y(() => {
			re = !1, ae(), pe();
		}), L(() => m.modelValue, (e) => {
			if (re) {
				if (e) {
					se();
					return;
				}
				ce();
			}
		}), L(O, me), L([
			R,
			z,
			G,
			() => m.app,
			() => m.attach,
			U
		], () => {
			he(), fe(), me();
		});
		function he() {
			m.app && !U.value && !W.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, c) => (S(), o(t, null, [e.placeholder && O.value && (!e.app || W.value) ? (S(), o("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: v(K.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (S(), i(n, {
			to: W.value ?? "body",
			disabled: !e.app
		}, [O.value && (!e.app || W.value) ? (S(), o("div", h({
			key: 0,
			ref_key: "toolbarElement",
			ref: j
		}, r.$attrs, {
			class: ["mat-toolbar", [q.value, `mat-toolbar--${A.value}`]],
			style: ne.value,
			role: "toolbar",
			"aria-orientation": V.value ? "vertical" : void 0
		}), [s("div", na, [s("div", ra, [k(r.$slots, "default", {}, void 0, !0)])]), B.value && P(x).fab ? (S(), o("div", {
			key: 0,
			ref_key: "fabElement",
			ref: N,
			class: "mat-toolbar__fab"
		}, [k(r.$slots, "fab", {}, void 0, !0)], 512)) : a("", !0)], 16, ta)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-37090654"]]), oa = Symbol("mat-panes"), sa = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], ca = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => sa.includes(e)
	},
	setup(e, { emit: t }) {
		let n = e, i = t, a = E(null), s = j([]), c = E(null), l = E(null), u = E(null), d = /* @__PURE__ */ new Map(), f, p, m, _, v, x = r(() => c.value ?? w.value), w = r(() => {
			let e = {};
			return s.forEach((t) => {
				let r = n.sizes?.[t.id];
				e[t.id] = typeof r == "number" && Number.isFinite(r) && r >= 0 ? r : 1;
			}), Object.values(e).reduce((e, t) => e + t, 0) === 0 && s.length > 0 && s.forEach((t) => {
				e[t.id] = 1;
			}), e;
		});
		function T(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function D(e, t) {
			return `${e}::${t}`;
		}
		function O(e) {
			return s.findIndex((t) => t.id === e);
		}
		function A(e) {
			return s.find((t) => t.id === e)?.element.value ?? null;
		}
		function M(e) {
			let t = A(e);
			return t ? t.getBoundingClientRect().width : 0;
		}
		function N(e) {
			let t = O(e);
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
		function ee(e) {
			return { "--mat-pane-weight": P(e) };
		}
		function F(e) {
			return n.resizable && N(e) !== null;
		}
		function I(e) {
			return N(e) !== null;
		}
		function R(e) {
			return N(e)?.key === l.value;
		}
		function z(e) {
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
		function B() {
			return { ...x.value };
		}
		function V(e) {
			_ !== void 0 && globalThis.clearTimeout(_), _ = globalThis.setTimeout(() => {
				_ = void 0, c.value === e && (c.value = null);
			}, 0);
		}
		function H(e) {
			let t = {};
			s.forEach((n) => {
				t[n.id] = Math.max(0, e[n.id] ?? 0);
			}), c.value = t, i("update:sizes", t), V(t);
		}
		function U(e, t, n, r, i) {
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : T(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function W(e) {
			let t = N(e);
			if (!t) return null;
			let n = M(t.left.id), r = M(t.right.id);
			return {
				leftWidth: n,
				rightWidth: r,
				totalWidth: n + r
			};
		}
		function G(e, t) {
			if (!n.resizable || f || t.button !== void 0 && t.button !== 0) return;
			let r = N(e), i = W(e);
			!r || !i || (t.preventDefault(), t.currentTarget?.setPointerCapture?.(t.pointerId), l.value = r.key, f = {
				boundary: r,
				changed: !1,
				metrics: i,
				pointerId: t.pointerId,
				startWeights: B(),
				startX: t.clientX
			});
		}
		function te(e, t) {
			if (!f || f.pointerId !== t.pointerId) return;
			let n = N(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = T(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			c.value = U(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		function ne(e, t, n) {
			if (!f || f.pointerId !== t.pointerId) return;
			let r = N(e), i = f.changed, a = c.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				H(a);
				return;
			}
			c.value = null;
		}
		function K(e, t) {
			let r = N(e);
			if (!r || !n.resizable) return;
			let i = {
				ArrowLeft: -1,
				ArrowRight: 1
			}[t.key], a = W(e), o = B(), s = o[r.left.id] + o[r.right.id] || 2, c = a?.totalWidth || 100, l = c * (o[r.left.id] / s), u;
			if (i !== void 0) u = T(l + i * (t.shiftKey ? 64 : 16), 0, c);
			else if (t.key === "Home") u = 0;
			else if (t.key === "End") u = c;
			else if (t.key === "Enter") {
				let e = r.key, t = o[r.left.id];
				t === 0 ? u = c * (d.get(e) ?? .5) : (d.set(e, t / s), u = 0);
			} else return;
			t.preventDefault(), H(U(r.left.id, r.right.id, u, c, o));
		}
		function q(e) {
			return s.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), s.push(e), () => {
				let t = s.indexOf(e);
				t !== -1 && s.splice(t, 1);
			};
		}
		function J() {
			let e = /* @__PURE__ */ new Set();
			s.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function Y() {
			let e = {};
			return s.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function X(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function Z() {
			m = void 0;
			let e = Y();
			X(v, e) || (v = e, i("update:widths", e));
		}
		function re(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(Z, e ? 0 : 100);
		}
		function Q() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				re();
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
		function $() {
			ae();
		}
		return C(oa, {
			getHandleAttributes: z,
			getPaneStyle: ee,
			hasBoundary: I,
			handleKeyDown: K,
			handlePointerDown: G,
			handlePointerMove: te,
			isBoundaryActive: R,
			isHandleVisible: F,
			registerPane: q,
			finishPointerInteraction: ne
		}), L(() => s.map((e) => e.id), async () => {
			await g(), J(), Q(), re();
		}, {
			flush: "post",
			immediate: !0
		}), L(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), b(() => {
			ae(!0), Q(), re(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", $);
		}), y(() => {
			globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", $), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), _ !== void 0 && globalThis.clearTimeout(_);
		}), (e, t) => (S(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [k(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-3c44b789"]]), la = ["id"], ua = {
	key: 0,
	class: "mat-pane__separator"
}, da = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], fa = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let n = e, i = p(oa, null), c = E(null), l = r(() => n.resizeLabel), u, d = r(() => i?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = r(() => !!i?.hasBoundary(n.id)), m = r(() => !!i?.isHandleVisible(n.id)), g = r(() => i?.getHandleAttributes(n.id) ?? {}), v = r(() => !!i?.isBoundaryActive(n.id));
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
		}), [k(n.$slots, "default", {}, void 0, !0)], 16, la), f.value ? (S(), o("div", ua, [m.value ? (S(), o("div", {
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
			onKeydown: r[0] ||= (t) => P(i).handleKeyDown(e.id, t),
			onLostpointercapture: r[1] ||= (t) => P(i).finishPointerInteraction(e.id, t, !1),
			onPointercancel: r[2] ||= (t) => P(i).finishPointerInteraction(e.id, t, !1),
			onPointerdown: r[3] ||= (t) => P(i).handlePointerDown(e.id, t),
			onPointermove: r[4] ||= (t) => P(i).handlePointerMove(e.id, t),
			onPointerup: r[5] ||= (t) => P(i).finishPointerInteraction(e.id, t, !0)
		}, null, 42, da)) : a("", !0)])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-7d81b20c"]]), pa = Symbol("mat-navigation-rail"), ma = ["aria-label"], ha = {
	key: 0,
	class: "mat-navigation-rail__header"
}, ga = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, _a = {
	key: 1,
	class: "mat-navigation-rail__content"
}, va = {
	key: 2,
	class: "mat-navigation-rail__end"
}, ya = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let x = e, w = c, T = p(Z, X), D = d(), O = p(je, null), A = D?.vnode.props ?? {}, j = Object.prototype.hasOwnProperty.call(A, "attach"), N = r(() => x.orientation === "horizontal"), ee = r(() => x.expanded), F = r(() => !N.value && x.layout === "modal"), I = r(() => !N.value && x.hideOnCollapse && !x.expanded), R = r(() => x.app && !!O && !j), B = r(() => {
			if (!x.app) return null;
			if (R.value) return O.edgeLayer.value;
			if (typeof x.attach == "string") try {
				return document.querySelector(x.attach);
			} catch {
				return null;
			}
			return m(x.attach);
		}), V = r(() => x.expanded ? x.closeIcon : x.openIcon), H = r(() => x.expanded ? x.closeLabel : x.openLabel), U = r(() => ({
			"mat-navigation-rail-host--vertical": !N.value,
			"mat-navigation-rail-host--horizontal": N.value,
			"mat-navigation-rail-host--expanded": ee.value,
			"mat-navigation-rail-host--collapsed": !x.expanded,
			[`mat-navigation-rail-host--${x.position}`]: !0,
			"mat-navigation-rail-host--modal": F.value,
			"mat-navigation-rail-host--hidden": I.value,
			"mat-navigation-rail-host--app": x.app,
			"mat-navigation-rail-host--app-root": R.value
		})), W = r(() => ({
			"mat-navigation-rail--expanded": ee.value,
			"mat-navigation-rail--collapsed": !x.expanded,
			"mat-navigation-rail--bar": N.value,
			"mat-navigation-rail--modal": F.value && x.expanded,
			"mat-navigation-rail--hidden": I.value,
			"mat-navigation-rail--app": x.app,
			"mat-navigation-rail--app-root": R.value
		})), G = r(() => {
			if (x.width !== void 0) return { "--mat-navigation-rail-expanded-width": typeof x.width == "number" ? `${x.width}px` : x.width };
		}), te = r(() => x.app && !R.value ? f(x.bottomPlaceholder) : "0px"), ne = r(() => [G.value, {
			"--mat-navigation-rail-app-end-inset": `${Q.value?.insets.end ?? 0}px`,
			"--mat-navigation-rail-app-start-inset": `${Q.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-bottom-placeholder": te.value
		}]), K = E(null), J = E(null), Y = E({
			blockSize: 0,
			inlineSize: 0
		}), re = r(() => ({
			blockSize: `${Y.value.blockSize}px`,
			inlineSize: `${Y.value.inlineSize}px`
		})), Q = M(null), ie;
		function ae() {
			let e = K.value?.getBoundingClientRect();
			e && (Y.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, Q.value?.update());
		}
		async function $() {
			ie?.disconnect(), ie = void 0, Q.value?.unregister(), Q.value = null, await g(), !(!x.app || !K.value) && (ie = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ae), ie?.observe(K.value), R.value && (Q.value = O.publicContext.registerEdge({
				edge: N.value ? "bottom" : x.position,
				element: K.value
			})), ae());
		}
		function oe() {
			x.app && !R.value && !B.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		function se(e) {
			return e !== void 0 && Object.is(x.modelValue, e);
		}
		function ce(e) {
			e === void 0 || Object.is(x.modelValue, e) || w("update:modelValue", e);
		}
		function le() {
			w("update:expanded", !x.expanded);
		}
		function ue() {
			w("update:expanded", !1);
		}
		function de(e) {
			e.key === "Escape" && F.value && x.expanded && ue();
		}
		return C(pa, {
			expanded: ee,
			isSelected: se,
			orientation: r(() => x.orientation),
			position: r(() => x.position),
			requestSelection: ce,
			useCursor: T.useCursor
		}), b(() => {
			window.addEventListener("keydown", de), oe(), $();
		}), y(() => {
			window.removeEventListener("keydown", de), ie?.disconnect(), Q.value?.unregister();
		}), L([
			() => x.app,
			() => x.attach,
			() => x.bottomPlaceholder,
			() => x.expanded,
			() => x.hideOnCollapse,
			() => x.layout,
			() => x.orientation,
			() => x.width,
			R
		], () => {
			oe(), $();
		}), (r, c) => (S(), o(t, null, [e.app && B.value && e.placeholder ? (S(), o("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(re.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (S(), i(n, {
			to: B.value ?? "body",
			disabled: !e.app
		}, [!e.app || B.value ? (S(), o("div", {
			key: 0,
			ref_key: "hostElement",
			ref: K,
			class: _(["mat-navigation-rail-host", U.value]),
			style: v(ne.value)
		}, [F.value && e.expanded ? (S(), o("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": e.closeLabel,
			onClick: ue
		}, null, 8, ma)) : a("", !0), s("nav", h({
			ref_key: "railElement",
			ref: J
		}, r.$attrs, { class: ["mat-navigation-rail", W.value] }), [
			N.value ? a("", !0) : (S(), o("div", ha, [
				I.value ? a("", !0) : k(r.$slots, "header", {
					key: 0,
					expanded: e.expanded
				}, void 0, !0),
				e.collapsible ? (S(), i(q, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": e.expanded,
					"aria-label": H.value,
					"focus-ring": !1,
					"use-cursor": P(T).useCursor,
					onClick: le
				}, {
					default: z(() => [u(ke, {
						icon: V.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : a("", !0),
				r.$slots.fab && !I.value ? (S(), o("div", ga, [k(r.$slots, "fab", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
			])),
			I.value ? a("", !0) : (S(), o("div", _a, [s("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${e.alignment}`]) }, [k(r.$slots, "default", {
				expanded: ee.value,
				orientation: e.orientation
			}, void 0, !0)], 2)])),
			r.$slots.end && !I.value && !N.value ? (S(), o("div", va, [k(r.$slots, "end", { expanded: e.expanded }, void 0, !0)])) : a("", !0)
		], 16)], 6)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-5ca2ce69"]]), ba = { class: "mat-navigation-rail-item__indicator" }, xa = { class: "mat-navigation-rail-item__icon-wrap" }, Sa = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, Ca = {
	key: 0,
	class: "mat-navigation-rail-item__label"
}, wa = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, l = I(), u = p(Z, X), d = p(pa, null), f = r(() => d?.expanded.value ?? !1), m = r(() => d?.orientation.value === "horizontal"), g = r(() => d?.position.value ?? "start"), _ = r(() => f.value), v = r(() => d?.isSelected(n.value) ?? !1), y = r(() => !!(n.icon || l.icon)), b = r(() => ({
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
		return (t, n) => (S(), i(q, h(t.$attrs, {
			class: ["mat-navigation-rail-item", b.value],
			"aria-current": v.value ? "page" : void 0,
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			"use-cursor": P(u).useCursor,
			onClick: x
		}), {
			default: z(() => [s("span", ba, [s("span", xa, [P(l).icon ? k(t.$slots, "icon", {
				key: 0,
				selected: v.value
			}, void 0, !0) : y.value ? (S(), i(ke, {
				key: 1,
				fill: +!!v.value,
				icon: e.icon,
				class: "mat-navigation-rail-item__icon",
				"aria-hidden": "true"
			}, null, 8, ["fill", "icon"])) : a("", !0)]), _.value ? (S(), o("span", Sa, [k(t.$slots, "default", {}, void 0, !0)])) : a("", !0)]), _.value ? a("", !0) : (S(), o("span", Ca, [k(t.$slots, "default", {}, void 0, !0)]))]),
			_: 3
		}, 16, [
			"class",
			"aria-current",
			"disabled",
			"href",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-59b42c01"]]), Ta = /* @__PURE__ */ new WeakMap();
function Ea(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function Da(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = Ea(t.value), i = new IntersectionObserver((t, r) => {
		let i = Ta.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), Ta.delete(e));
	}, r);
	Ta.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function Oa(e) {
	let t = Ta.get(e);
	t && (t.observer.unobserve(e), Ta.delete(e));
}
var ka = {
	mounted: Da,
	updated(e, t) {
		Ta.has(e) && (Oa(e), Da(e, t));
	},
	unmounted: Oa
}, Aa = X, ja = null;
function Ma(e, t) {
	Aa = e, ja = t;
}
function Na() {
	return Aa;
}
function Pa() {
	return ja;
}
//#endregion
//#region src/theme.js
var Fa = "#20a6fc", Ia = "(prefers-color-scheme: dark)";
function La(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function Ra(e) {
	if (!me.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function za(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function Ba(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function Va(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function Ha(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? Fa, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	La(t), Va(n), Ra(r), za(i), Ba(a);
	let o = E(t), s = E(be(n)), c = E(r), l = E(i), u = E("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(Ia)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = xe({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(he).forEach(([t, n]) => {
			a.style.setProperty(`--mat-sys-color-${n}`, ne(e[t]));
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
		La(e), o.value = e, y(), g();
	}
	function x(e) {
		Va(e), s.value = be(e), g();
	}
	function S(e) {
		Ra(e), c.value = e, g();
	}
	function C(e) {
		za(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(he).forEach((e) => {
			a.style.removeProperty(`--mat-sys-color-${e}`);
		}), a.removeAttribute?.("data-mat-theme"), a.style.removeProperty("color-scheme");
	}
	return y(), g(), {
		mode: T(o),
		resolvedMode: T(u),
		seedColor: T(s),
		schemeVariant: T(c),
		contrastLevel: T(l),
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
var Ua = [
	[
		"MatAppRoot",
		"mat-app-root",
		St
	],
	[
		"MatBtn",
		"mat-btn",
		_t
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		Tt
	],
	[
		"MatFab",
		"mat-fab",
		Mt
	],
	[
		"MatIcon",
		"mat-icon",
		ke
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		Pt
	],
	[
		"MatCard",
		"mat-card",
		Ht
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		Wt
	],
	[
		"MatCardContent",
		"mat-card-content",
		Kt
	],
	[
		"MatCardActions",
		"mat-card-actions",
		Jt
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		Lt
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		Vt
	],
	[
		"MatCardMedia",
		"mat-card-media",
		zt
	],
	[
		"MatList",
		"mat-list",
		nn
	],
	[
		"MatListGroup",
		"mat-list-group",
		gn
	],
	[
		"MatListItem",
		"mat-list-item",
		pn
	],
	[
		"MatDivider",
		"mat-divider",
		Cn
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		kn
	],
	[
		"MatRadio",
		"mat-radio",
		jn
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		Pn
	],
	[
		"MatSwitch",
		"mat-switch",
		Fn
	],
	[
		"MatSlider",
		"mat-slider",
		ur
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		mr
	],
	[
		"MatTextField",
		"mat-text-field",
		Nr
	],
	[
		"MatTextarea",
		"mat-textarea",
		Pr
	],
	[
		"MatInputBase",
		"mat-input-base",
		hr
	],
	[
		"MatMenu",
		"mat-menu",
		Lr
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		zr
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		Hr
	],
	[
		"MatDialog",
		"mat-dialog",
		ei
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		si
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		ci
	],
	[
		"MatHover",
		"mat-hover",
		Ae
	],
	[
		"MatContainer",
		"mat-container",
		ui
	],
	[
		"MatSpacer",
		"mat-spacer",
		di
	],
	[
		"MatLoader",
		"mat-loader",
		Hi
	],
	[
		"MatTooltip",
		"mat-tooltip",
		ft
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		ea
	],
	[
		"MatToolbar",
		"mat-toolbar",
		aa
	],
	[
		"MatPanes",
		"mat-panes",
		ca
	],
	[
		"MatPane",
		"mat-pane",
		fa
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		ya
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		wa
	]
];
function Wa(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function Ga(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? X.iconClass;
}
function Ka(e, t) {
	let n = e[t];
	if (n === void 0) return Y[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function qa(e) {
	let t = e.tooltip;
	if (t === void 0) return Y;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi tooltip 必须是对象");
	return Object.freeze({
		openDelay: Ka(t, "openDelay"),
		skipDelayDuration: Ka(t, "skipDelayDuration")
	});
}
function Ja(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: Ga(e),
		tooltip: qa(e),
		useCursor: Wa(e, "useCursor")
	}), n = Ha(e.theme);
	return {
		theme: n,
		install(e) {
			Ua.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r);
			}), e.directive("intersection", ka), e.provide(Z, t), e.provide(we, n), Ma(t, n);
		}
	};
}
function Ya() {
	let e = p(we, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mdu-ui 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var Xa = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, Za = /*#__PURE__*/ K(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		C(Z, Na());
		let s = Pa();
		s && C(we, s);
		let c = E(!0), d = M(n.cancelValue), f = E(n.options.promptConfig?.defaultValue ?? ""), p = r(() => !!n.options.promptConfig), m = r(() => n.options.promptConfig?.required ?? !1), g = r(() => m.value && f.value.trim().length === 0), _ = r(() => {
			let e = { ...n.options };
			return delete e.actions, delete e.ariaLabel, delete e.promptConfig, n.options.promptConfig && delete e.content, e;
		});
		function v(e, t) {
			e.disabled || p.value && t === n.options.actions.length - 1 && g.value || (d.value = p.value && t === n.options.actions.length - 1 ? f.value : e.value, c.value = !1);
		}
		function y() {
			n.onClosed(d.value);
		}
		return (n, r) => (S(), i(ei, h({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: z(() => [u(di), (S(!0), o(t, null, O(e.options.actions, (t, n) => (S(), i(_t, {
				key: n,
				color: t.color,
				disabled: t.disabled || p.value && n === e.options.actions.length - 1 && g.value,
				variant: t.variant,
				onClick: (e) => v(t, n)
			}, {
				default: z(() => [l(N(t.text), 1)]),
				_: 2
			}, 1032, [
				"color",
				"disabled",
				"variant",
				"onClick"
			]))), 128))]),
			default: z(() => [p.value ? (S(), o(t, { key: 0 }, [e.options.content ? (S(), o("p", Xa, N(e.options.content), 1)) : a("", !0), u(Nr, {
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
}), [["__scopeId", "data-v-217b4d5a"]]), Qa = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], $a = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], eo = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function to(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function no() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function ro(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function io(e) {
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
function ao(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !Qa.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function oo(e) {
	if (ro(e), $a.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), eo.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !$(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !to(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(ao),
		attach: io(e.attach)
	};
	return [
		...$a,
		...eo,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function so(e, t) {
	try {
		no();
		let n = oo(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				D(f(Za, {
					cancelValue: t,
					options: n,
					onClosed(t) {
						D(null, i), i.remove(), e(t);
					}
				}), i);
			} catch (e) {
				D(null, i), i.remove(), r(e);
			}
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
function co(e = {}) {
	return so(e, void 0);
}
function lo(e = {}) {
	try {
		if (ro(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return so({
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
function uo(e = {}) {
	try {
		ro(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return so({
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
function fo(e = {}) {
	try {
		ro(e);
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
		return so({
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
var po = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		C(Z, Na()), C(Ui, !0);
		let n = Pa();
		n && C(we, n);
		let a = E(!0), o = r(() => {
			let e = { ...t.options };
			return delete e.onAction, e;
		});
		function s() {
			t.onClosed();
		}
		function c() {
			t.options.onAction?.();
		}
		return (e, t) => (S(), i(ea, h({
			modelValue: a.value,
			"onUpdate:modelValue": t[0] ||= (e) => a.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), mo = [
	"left",
	"center",
	"right"
], ho = null;
function go() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function _o(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function vo(e) {
	if (_o(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !mo.includes(e.position)) throw TypeError("snackbar position 无效");
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
function yo() {
	return ho?.isConnected ? ho : (ho = document.createElement("div"), ho.dataset.matSnackbarHost = "", document.body.append(ho), ho);
}
function bo() {
	!ho || ho.childNodes.length > 0 || (ho.remove(), ho = null);
}
function xo(e) {
	try {
		go();
		let t = vo(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = ho;
				t && D(null, t), e(), Yi(i), bo();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = ho;
				t && D(null, t), n(e), Yi(i), bo();
			}
			i = { activate() {
				try {
					let e = yo();
					D(f(po, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, qi(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var So = xo;
//#endregion
export { ka as Intersection, St as MatAppRoot, si as MatBottomSheet, _t as MatBtn, Tt as MatBtnGroup, Ht as MatCard, Wt as MatCardActionArea, Jt as MatCardActions, Kt as MatCardContent, Lt as MatCardHeadline, zt as MatCardMedia, Vt as MatCardSubhead, kn as MatCheckbox, ui as MatContainer, ei as MatDialog, Cn as MatDivider, Mt as MatFab, Ae as MatHover, ke as MatIcon, hr as MatInputBase, nn as MatList, gn as MatListGroup, pn as MatListItem, Hi as MatLoader, Lr as MatMenu, zr as MatMenuGroup, Hr as MatMenuItem, ya as MatNavigationRail, wa as MatNavigationRailItem, fa as MatPane, ca as MatPanes, jn as MatRadio, Pn as MatRadioGroup, mr as MatRangeSlider, ci as MatSideSheet, ur as MatSlider, ea as MatSnackbar, di as MatSpacer, Pt as MatSplitBtn, Fn as MatSwitch, Nr as MatTextField, Pr as MatTextarea, aa as MatToolbar, ft as MatTooltip, lo as alert, uo as confirm, Ja as createMatUi, co as dialog, fo as prompt, xo as snackbar, So as toast, Me as useMatApp, Ya as useMatTheme };
