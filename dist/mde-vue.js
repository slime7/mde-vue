import { Comment as e, Fragment as t, Teleport as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, getCurrentInstance as d, h as f, inject as p, isVNode as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onActivated as y, onBeforeUnmount as b, onDeactivated as x, onMounted as S, onUpdated as C, openBlock as w, provide as T, reactive as E, readonly as D, ref as O, render as k, renderList as A, renderSlot as j, resolveDynamicComponent as M, shallowReactive as N, shallowRef as P, toDisplayString as F, unref as I, useAttrs as ee, useId as L, useSlots as R, watch as z, watchEffect as B, withCtx as V, withKeys as H, withModifiers as te } from "vue";
import { Hct as U, SchemeExpressive as ne, SchemeNeutral as W, SchemeTonalSpot as G, SchemeVibrant as K, argbFromHex as re, hexFromArgb as q } from "@material/material-color-utilities";
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
		return z(() => a.disabled, (e) => {
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
			default: V(() => [j(t.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-e561649c"]]), X = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		return (t, r) => (w(), i(Y, h(t.$attrs, {
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
			default: V(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-pressed",
			"disabled",
			"type"
		]));
	}
}), [["__scopeId", "data-v-04ffd7cb"]]), ie = Object.freeze({
	openDelay: 0,
	skipDelayDuration: 0
}), Z = Object.freeze({
	iconClass: "material-symbols-outlined",
	useCursor: !1,
	defaults: Object.freeze({ tooltip: ie })
}), ae = Symbol("mde-vue-options");
function oe(e) {
	return e.replace(/^Mat/, "").replace(/^./, (e) => e.toLowerCase());
}
//#endregion
//#region src/components/button-props.js
var se = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], ce = ["round", "square"], le = [
	"button",
	"submit",
	"reset"
], ue = [
	"primary",
	"secondary",
	"tertiary",
	"error"
];
function Q(e) {
	return e === void 0 || ue.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var de = Object.freeze({
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
}), fe = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function pe(e) {
	return typeof e == "string" && (Object.hasOwn(de, e) || fe.test(e));
}
function me(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function he(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function ge(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function _e(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function ve(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var ye = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], be = {
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
}, xe = {
	"tonal-spot": G,
	neutral: W,
	vibrant: K,
	expressive: ne
}, Se = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], Ce = 64, we = /* @__PURE__ */ new Map();
function Te(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function Ee({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = xe[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(U.fromInt(re(Te(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function De(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, q(e[t])])));
}
function Oe(e, t = "tonal-spot", n = 0) {
	let r = Te(e), i = `${r}|${t}|${n}|2025|phone`, a = we.get(i);
	if (a) return we.delete(i), we.set(i, a), a;
	let o = Object.freeze({
		light: De(Ee({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), Se),
		dark: De(Ee({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), Se)
	});
	if (we.set(i, o), we.size > Ce) {
		let e = we.keys().next().value;
		we.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var ke = Symbol("mde-vue-theme"), Ae = "tonal-spot", je = 0;
function Me(e) {
	let t = p(ke, null), n = r(() => I(e) !== void 0);
	return {
		colorStyle: r(() => {
			let n = I(e);
			if (!n || !Q(n)) return {};
			if (ue.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			let r = Oe(n, t?.schemeVariant.value ?? Ae, t?.contrastLevel.value ?? je);
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
//#region src/components/use-mat-props.js
var Ne = Object.freeze({});
function $(e, t) {
	let n = d();
	if (!n) throw Error("useMatProps() 必须在组件 setup 中调用");
	let i = p(ae, Z).defaults?.[e] ?? Ne, a = [.../* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])], o = {};
	return a.forEach((e) => {
		o[e] = r(() => {
			let r = n.vnode.props ?? Ne;
			return e in r && r[e] !== void 0 ? t[e] : i[e] ?? t[e];
		});
	}), E(o);
}
//#endregion
//#region src/components/mat-icon/MatIcon.vue
var Pe = ["src"], Fe = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: pe
		},
		fill: {
			type: Number,
			default: 0,
			validator: he
		},
		weight: {
			type: Number,
			default: 400,
			validator: ge
		},
		grade: {
			type: Number,
			default: 0,
			validator: _e
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: ve
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
		},
		fontColor: {
			type: String,
			default: void 0
		},
		as: {
			type: String,
			default: "i",
			validator: me
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = $("icon", e), a = p(ae, Z), { colorStyle: s, hasExplicitColor: c } = Me(r(() => n.color)), u = r(() => n.iconClass ?? a.iconClass), d = r(() => n.icon !== void 0), f = r(() => de[n.size]?.fontSize ?? n.size), m = r(() => n.opticalSize ?? de[n.size]?.opticalSize ?? 24), g = r(() => ({
			...s.value,
			"--mat-icon-size": f.value,
			color: n.fontColor ?? (c.value ? "var(--mat-accent-color)" : "currentColor"),
			fontVariationSettings: `'FILL' ${n.fill}, 'wght' ${n.weight}, 'GRAD' ${n.grade}, 'opsz' ${m.value}`
		}));
		return (e, r) => (w(), i(M(I(n).as), h(e.$attrs, {
			class: ["mat-icon", u.value],
			style: g.value
		}), {
			default: V(() => [I(n).src === void 0 ? d.value ? (w(), o(t, { key: 1 }, [l(F(I(n).icon), 1)], 64)) : j(e.$slots, "default", { key: 2 }, void 0, !0) : (w(), o("img", {
				key: 0,
				class: "mat-icon__image",
				src: I(n).src,
				alt: ""
			}, null, 8, Pe))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-86018e31"]]), Ie = /^-?\d+(\.\d+)?$/;
function Le(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : NaN;
	if (typeof e == "string") {
		let t = e.trim();
		return t && Ie.test(t) ? Number(t) : NaN;
	}
	return NaN;
}
function Re(e, { positive: t = !1, max: n } = {}) {
	let r = Le(e);
	return !Number.isFinite(r) || (t ? r <= 0 : r < 0) ? !1 : n === void 0 || r <= n;
}
function ze(e, t) {
	if (typeof e != "string") return !1;
	let n = e.trim();
	return !n || /[;{}]/.test(n) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports(t, n);
}
function Be(e, { property: t, positive: n = !1, max: r, allowUndefined: i = !0 } = {}) {
	return e === void 0 ? i : typeof e == "number" || typeof e == "string" && Ie.test(e.trim()) ? Re(e, {
		positive: n,
		max: r
	}) : typeof e != "string" || !t ? !1 : ze(e, t);
}
function Ve(e, { property: t, positive: n = !1, max: r, fallback: i } = {}) {
	if (Be(e, {
		property: t,
		positive: n,
		max: r,
		allowUndefined: !1
	})) {
		let t = Le(e);
		return Number.isFinite(t) ? t === 0 ? "0" : `${t}px` : e.trim();
	}
	return i;
}
function He(e, { property: t, positive: n = !1, fallback: r } = {}) {
	if (Be(e, {
		property: t,
		positive: n,
		allowUndefined: !1
	})) {
		let t = Le(e);
		return Number.isFinite(t) ? String(t) : e.trim();
	}
	return r;
}
function Ue(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : typeof e == "number" || typeof e == "string" && Ie.test(e.trim()) ? Re(e) : !e || Array.isArray(e) ? !1 : ["start", "end"].every((t) => e[t] === void 0 || Re(e[t]));
}
function We(e, t) {
	let n = Le(e);
	if (Number.isFinite(n)) return {
		start: n,
		end: n
	};
	function r(e) {
		let n = Le(e);
		return Number.isFinite(n) ? n : t;
	}
	return {
		start: r(e?.start ?? t),
		end: r(e?.end ?? t)
	};
}
function Ge(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : Re(e);
}
function Ke(e, t = 0) {
	return Re(e) ? Le(e) : t;
}
function qe(e, { positive: t = !1, fallback: n } = {}) {
	return Re(e, { positive: t }) ? Le(e) : n;
}
//#endregion
//#region src/components/mat-hover/MatHover.vue
var Je = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Ge(e, { allowUndefined: !1 })
		},
		openDelay: {
			type: [Number, String],
			default: 0,
			validator: (e) => Ge(e, { allowUndefined: !1 })
		},
		target: {
			type: [String, Object],
			default: void 0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: t }) {
		let n = $("hover", e), i = t, o = R(), s = d()?.vnode.props ?? {}, c = Object.prototype.hasOwnProperty.call(s, "modelValue") || Object.prototype.hasOwnProperty.call(s, "model-value"), l = O(!1), u = O(null), f = P(null), p = r(() => c ? n.modelValue : u.value), m, h = null;
		function g() {
			m !== void 0 && (window.clearTimeout(m), m = void 0);
		}
		function _(e) {
			l.value = e, !n.disabled && (i("update:modelValue", e), !c && (u.value = e));
		}
		function v(e, t) {
			g();
			let n = Ke(t, 0);
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
		return z(() => n.disabled, (e, t) => {
			if (t && !e) {
				if (c) {
					i("update:modelValue", l.value);
					return;
				}
				u.value = l.value, i("update:modelValue", l.value);
			}
		}), z(T, D, { flush: "sync" }), S(D), C(D), b(() => {
			g(), E();
		}), (e, t) => I(o).default ? j(e.$slots, "default", {
			key: 0,
			isHovering: p.value,
			props: k
		}) : a("", !0);
	}
}), Ye = Symbol("mat-app-root");
function Xe() {
	let e = p(Ye, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var Ze = [
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
], Qe = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function $e(e) {
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
function et(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function tt(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function nt(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function rt(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function it(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: et(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: tt(t, n, r)
	};
}
function at(e) {
	return [
		e,
		Qe[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== Qe[e])
	];
}
function ot(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function st(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function ct(e, t, n, r, i, a, o, s) {
	let c = it(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: nt(c.left, a, l),
		top: nt(c.top, a, u)
	}, f = ot(d, r);
	return st(f, n) || s.some((e) => st(f, $e(e))) ? null : d;
}
function lt({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = $e(i), c = $e(a), [l, u = "center"] = (Ze.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = rt(l, s, o, r, t), m = Qe[l], h = rt(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = at(g), b = e.map((e) => $e(e)), x = y.find((e) => rt(e, s, o, r, t) >= f && ct(e, d, s, c, o, r, t, b)) ?? y.find((e) => ct(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = it(x, d, s, c, t);
	return {
		left: Math.round(nt(C.left, r, _)),
		location: S,
		top: Math.round(nt(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var ut = null, dt = /* @__PURE__ */ new WeakMap();
function ft(e) {
	ut && ut !== e && ut.close(), ut = e;
}
function pt(e) {
	ut === e && (ut = null);
}
function mt(e, t) {
	e && dt.set(e, {
		owner: t,
		expiresAt: Infinity
	});
}
function ht(e, t, n) {
	if (!e) return;
	let r = dt.get(e);
	if (!(!r || r.owner !== t)) {
		if (n <= 0) {
			dt.delete(e);
			return;
		}
		r.expiresAt = Date.now() + n;
	}
}
function gt(e, t) {
	if (!e) return !1;
	let n = dt.get(e);
	return !n || n.owner === t ? !1 : n.expiresAt < Date.now() ? (dt.delete(e), !1) : !0;
}
//#endregion
//#region src/components/toolbar-overlay.js
var _t = /* @__PURE__ */ new Map(), vt = /* @__PURE__ */ new Set(), yt = 0;
function bt(e) {
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
function xt() {
	vt.forEach((e) => e());
}
function St() {
	_t.forEach((e, t) => {
		e.element.isConnected || _t.delete(t);
	});
}
function Ct(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = yt;
	yt += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return _t.set(n, r), xt(), {
		unregister() {
			i && (i = !1, _t.delete(n), xt());
		},
		update() {
			i && xt();
		}
	};
}
function wt() {
	return St(), [..._t.values()].flatMap((e) => {
		try {
			return [bt(e.getRect())];
		} catch {
			return [];
		}
	});
}
function Tt(e = window.innerHeight) {
	St();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[..._t.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - bt(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function Et(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return vt.add(e), e(), () => {
		vt.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var Dt = ["id", "data-location"], Ot = 1500, kt = 150, At = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return Ze.includes(e);
			}
		},
		openDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Ge(e)
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: c }) {
		let u = e, f = c, m = $("tooltip", u), _ = ee(), v = R(), T = d(), E = p(Ye, null), D = O(null), k = P(null), A = { value: k }, M = P(null), N = O(!1), B = O(null), V = O(!1), H = O(!1), te = O(!1), U = O("closed"), ne = O("top"), W = O({}), G = O(!1), K = `${L().replace(/[^\w-]/g, "-")}-tooltip`, re = r(() => typeof _.id == "string" ? _.id : K), q = r(() => m.content === void 0 ? !!v.default : m.content.length > 0), J = r(() => !!v.activator), Y = T?.vnode.props ?? {}, X = Object.prototype.hasOwnProperty.call(Y, "modelValue") || Object.prototype.hasOwnProperty.call(Y, "model-value"), ie, Z, ae, oe, se = !1, ce, le, ue = null, Q = null, de = null, fe = null, pe = null, me = !1, he = !0, ge = !1, _e = !1, ve = !1, ye = null, be = { close: $e }, xe = Symbol("mat-tooltip-delay-group-owner");
		function Se(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? Se(e.value) : "$el" in e ? Se(e.$el) : null : null;
		}
		function Ce(e) {
			try {
				return Se(document.querySelector(e));
			} catch {
				return null;
			}
		}
		function we() {
			return typeof m.target == "string" ? Ce(m.target) : Se(m.target);
		}
		function Te() {
			let e = D.value ? [...D.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function Ee() {
			return J.value ? Te() : we();
		}
		function De() {
			return Oe() ? typeof m.attach == "string" ? Ce(m.attach) : Se(m.attach) : je() || (E?.rootElement.value?.contains(k.value) && E.freeLayer.value ? E.freeLayer.value : document.body);
		}
		function Oe() {
			let e = T?.vnode.props ?? {};
			return Object.prototype.hasOwnProperty.call(e, "attach");
		}
		function ke(e) {
			if (!e.hasAttribute("popover")) return !1;
			try {
				return e.matches(":popover-open") || e.hasAttribute("data-popover-open");
			} catch {
				return e.hasAttribute("data-popover-open");
			}
		}
		function Ae(e) {
			return e.localName === "dialog" && e.hasAttribute("open") || ke(e);
		}
		function je() {
			let e = k.value;
			for (; e;) {
				if (Ae(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function Me() {
			let e = m.openDelay;
			return Ke(e, 0);
		}
		function Ne() {
			return k.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function Pe() {
			Z !== void 0 && (window.clearTimeout(Z), Z = void 0);
		}
		function Fe() {
			ie !== void 0 && (window.clearTimeout(ie), ie = void 0);
		}
		function Ie() {
			ae !== void 0 && (window.clearTimeout(ae), ae = void 0);
		}
		function Le() {
			ce !== void 0 && (window.cancelAnimationFrame(ce), ce = void 0);
		}
		function Re() {
			Le(), H.value && (ce = window.requestAnimationFrame(() => {
				if (ce = void 0, H.value) {
					if (k.value && !k.value.isConnected) {
						Qe({ immediate: !0 });
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
			ae = window.setTimeout(() => {
				ae = void 0, t();
			}, e);
		}
		function Ve() {
			oe !== void 0 && (se ? window.cancelAnimationFrame(oe) : window.clearTimeout(oe), oe = void 0, se = !1);
		}
		function He() {
			fe && (pe === null ? fe.removeAttribute("aria-describedby") : fe.setAttribute("aria-describedby", pe), fe = null, pe = null);
		}
		function Ue() {
			let e = k.value;
			if (!H.value || !e || fe === e) return;
			He(), fe = e, pe = e.getAttribute("aria-describedby");
			let t = (pe ?? "").split(/\s+/).filter(Boolean);
			t.includes(re.value) || t.push(re.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function We() {
			Ve(), le?.disconnect(), le = void 0, Q &&= (Q(), null), de &&= (de(), null);
		}
		function Ge() {
			if (!H.value || !k.value || !B.value) return;
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
			] : wt(), a = lt({
				location: m.location,
				targetRect: n,
				tooltipRect: B.value.getBoundingClientRect(),
				avoidRects: i,
				viewport: e ? {
					height: r.size.height,
					width: r.size.width
				} : {
					height: window.innerHeight,
					width: window.innerWidth
				}
			});
			ne.value = a.location, W.value = {
				left: `${a.left}px`,
				top: `${a.top}px`
			}, te.value = !0;
		}
		function qe() {
			if (!H.value || oe !== void 0) return;
			let e = () => {
				oe = void 0, se = !1, Ge();
			};
			if (typeof window.requestAnimationFrame == "function") {
				se = !0, oe = window.requestAnimationFrame(e);
				return;
			}
			oe = window.setTimeout(e, 0);
		}
		function Xe() {
			Q || (window.addEventListener("resize", qe), document.addEventListener("scroll", qe, !0), Q = () => {
				window.removeEventListener("resize", qe), document.removeEventListener("scroll", qe, !0);
			}, de = Et(qe), typeof ResizeObserver < "u" && (le = new ResizeObserver(qe), le.observe(k.value), le.observe(B.value)));
		}
		function Ze() {
			V.value = !1, U.value = "closed", H.value = !1, te.value = !1, M.value = null, N.value = !1;
		}
		function Qe({ immediate: e = !1 } = {}) {
			if (Pe(), Fe(), Le(), We(), He(), pt(be), !V.value) {
				Ze();
				return;
			}
			if (!(!e && U.value === "closing")) {
				if (e) {
					Ie(), Ze();
					return;
				}
				H.value = !1, U.value = "closing", Be(kt, Ze);
			}
		}
		function $e() {
			X && (G.value = !0, f("update:modelValue", !1)), Qe();
		}
		function et() {
			ve || (ve = !0, console.warn(J.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function tt({ warn: e = !0 } = {}) {
			let t = Ee();
			if (!t && H.value && Qe({ immediate: !0 }), t === k.value) {
				!t && q.value && e && et();
				return;
			}
			let n = k.value !== null;
			He(), ut(), k.value = t, ve = !1, !t && q.value && e && et(), dt(), n && H.value && $e();
		}
		function nt() {
			if (Fe(), X || H.value || G.value || !q.value) return;
			let e = gt(Ne(), xe) ? 0 : Me();
			if (e === 0) {
				_t();
				return;
			}
			Z === void 0 && (Z = window.setTimeout(() => {
				Z = void 0, _t();
			}, e));
		}
		function rt() {
			Pe(), !(X || !H.value || ge || _e) && ie === void 0 && (ie = window.setTimeout(() => {
				ie = void 0, $e();
			}, Ot));
		}
		function it() {
			if (ge || _e) {
				nt();
				return;
			}
			ht(ye, xe, m.skipDelayDuration), rt();
		}
		function at(e) {
			ge = e, it();
		}
		function ot() {
			_e = !0, it();
		}
		function st(e) {
			k.value?.contains(e.relatedTarget) || (_e = !1, it());
		}
		function ct(e) {
			e.key === "Escape" && (e.preventDefault(), $e());
		}
		function ut() {
			ue && (ue(), ue = null, ge = !1, _e = !1);
		}
		function dt() {
			let e = k.value;
			e && (e.addEventListener("keydown", ct), !X && q.value && (e.addEventListener("focusin", ot), e.addEventListener("focusout", st)), ue = () => {
				e.removeEventListener("keydown", ct), e.removeEventListener("focusin", ot), e.removeEventListener("focusout", st);
			});
		}
		async function _t() {
			if (!me || !he || G.value || !q.value) return;
			if (tt({ warn: !0 }), !k.value) {
				$e();
				return;
			}
			let e = De();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), $e();
				return;
			}
			Pe(), Fe(), Ie(), ft(be), ye = Ne(), mt(ye, xe), M.value = e, N.value = e === E?.freeLayer.value, ne.value = m.location, W.value = {
				left: "0px",
				top: "0px"
			}, te.value = !1, U.value = "opening", V.value = !0, H.value = !0, await g(), !(!me || !he || !H.value) && (Ue(), Ge(), Xe(), Re());
		}
		return S(async () => {
			me = !0, tt({ warn: !1 }), await g(), me && (tt({ warn: !1 }), X && m.modelValue && _t());
		}), C(() => {
			tt({ warn: !1 }), H.value && qe();
		}), y(() => {
			he || (he = !0, tt({ warn: !1 }), X && m.modelValue && _t());
		}), x(() => {
			he = !1, Ie(), Le(), ut(), Qe({ immediate: !0 });
		}), b(() => {
			me = !1, Ie(), Le(), ut(), H.value && Qe({ immediate: !0 });
		}), z(() => m.modelValue, (e) => {
			if (!(!me || !he || !X)) {
				if (e) {
					G.value = !1, _t();
					return;
				}
				G.value = !1, Qe();
			}
		}), z([() => m.content, () => m.target], async () => {
			await g();
			let e = k.value;
			tt({ warn: !1 }), k.value === e && (ut(), dt()), q.value || $e();
		}), z(() => m.attach, async () => {
			if (!H.value) return;
			let e = De();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), $e();
				return;
			}
			M.value = e, N.value = e === E?.freeLayer.value, await g(), qe();
		}), z(() => m.location, () => {
			H.value && qe();
		}), z(re, () => {
			!H.value || !fe || (He(), Ue());
		}), E && z(E.publicContext.layout, qe), (r, c) => (w(), o(t, null, [
			!I(X) && q.value ? (w(), i(Je, {
				key: 0,
				target: A,
				"onUpdate:modelValue": at
			})) : a("", !0),
			J.value || !e.target ? (w(), o("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: D,
				class: "mat-tooltip__activator"
			}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			V.value && M.value ? (w(), i(n, {
				key: 2,
				to: M.value
			}, [s("span", h(r.$attrs, {
				id: re.value,
				ref_key: "tooltipElement",
				ref: B,
				class: ["mat-tooltip mat-sys-typescale-label-large", [`mat-tooltip--${U.value}`, {
					"mat-tooltip--app-root": N.value,
					"mat-tooltip--positioned": te.value
				}]],
				"data-location": ne.value,
				style: [W.value, r.$attrs.style],
				role: "tooltip"
			}), [I(m).content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(m).content), 1)], 64))], 16, Dt)], 8, ["to"])) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-9d992896"]]), jt = Symbol("mde-vue-button-group"), Mt = Symbol("mde-vue-split-button");
//#endregion
//#region src/components/use-button.js
function Nt(e, t) {
	let n = p(ae, Z), i = p(jt, null), a = p(Mt, null), o = r(() => a?.size.value ?? e.size ?? i?.size.value ?? "small"), s = r(() => a ? "round" : e.shape ?? i?.shape.value ?? "round"), c = r(() => a?.variant.value ?? e.variant), l = r(() => a?.color.value ?? e.color ?? i?.color.value), u = r(() => e.disabled || !!a?.disabled.value || !!i?.disabled.value), d = r(() => !!(i && i.selection.value !== "none")), f = r(() => a?.role === "trailing" ? a.expanded.value : d.value ? i.isSelected(e.value) : e.selected), m = r(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = Me(l);
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
//#region src/components/typography.js
var Pt = Object.freeze([
	"display",
	"headline",
	"title",
	"body",
	"label"
]), Ft = Object.freeze([
	"large",
	"medium",
	"small"
]), It = Object.freeze({
	L: "large",
	M: "medium",
	S: "small"
});
function Lt(e) {
	return Pt.includes(e);
}
function Rt(e) {
	return Ft.includes(e) || Object.hasOwn(It, e);
}
function zt(e) {
	return It[e] ?? e;
}
function Bt(e, t, n = !1) {
	return [
		"mat-sys-typescale",
		n ? "emphasized" : void 0,
		e,
		zt(t)
	].filter(Boolean).join("-");
}
//#endregion
//#region src/components/mat-btn/MatBtn.vue
var Vt = {
	key: 2,
	class: "mat-btn__label"
}, Ht = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return se.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return ce.includes(e);
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
			validator: Q
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
				return le.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let s = $("btn", e), c = n, u = ee(), d = R(), f = O(null), p = L(), { colorStyle: g, effectiveDisabled: _, effectiveSelected: v, effectiveShape: y, effectiveSize: b, effectiveToggle: x, effectiveVariant: C, handleClick: T, hasExplicitColor: E, split: D, useCursor: k } = Nt(s, c), A = r(() => x.value && C.value !== "text"), M = r(() => A.value && v.value), N = r(() => s.icon === !0 || typeof s.icon == "string" && s.icon.trim().length > 0), P = r(() => s.fill === void 0 ? +!!M.value : s.fill);
		function z(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : m(e) ? e.type === t && Array.isArray(e.children) ? z(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? z(e.children) : [] : []).join("").trim();
		}
		let H = r(() => s.icon === !0 ? z(d.default?.() ?? []) : ""), te = r(() => typeof s.icon == "string" ? s.icon.trim() : H.value), U = r(() => u["aria-label"] ?? s.label), ne = r(() => N.value ? u.title ?? s.label : void 0), W = r(() => !N.value && (s.prefix !== void 0 || !!d.prefix)), G = r(() => !N.value && (s.suffix !== void 0 || !!d.suffix)), K = r(() => M.value && !!d.selected), re = r(() => ({
			"extra-small": 20,
			small: N.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[b.value]), q = r(() => {
			let [e, t] = {
				"extra-small": ["label", "large"],
				small: ["label", "large"],
				medium: ["title", "medium"],
				large: ["headline", "small"],
				"extra-large": ["headline", "large"]
			}[b.value];
			return Bt(e, t, !0);
		});
		return S(() => {
			s.icon === !0 && !H.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), B(() => {
			s.toggle && s.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), N.value && (!U.value || U.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (e, n) => (w(), i(X, h({
			ref_key: "buttonElement",
			ref: f
		}, I(u), {
			class: ["mat-btn", [
				`mat-btn--${I(C)}`,
				`mat-btn--size-${I(b)}`,
				`mat-btn--shape-${I(y)}`,
				q.value,
				{
					"mat-button--explicit-color": I(E),
					"mat-btn--icon": N.value,
					[`mat-btn--width-${I(s).width}`]: N.value,
					"mat-btn--toggle": A.value,
					"mat-btn--selected": M.value,
					"mat-btn--split-leading": I(D)?.role === "leading"
				}
			]],
			style: I(g),
			"aria-label": N.value ? U.value : I(u)["aria-label"],
			"aria-controls": I(D)?.role === "trailing" ? I(D).controls.value : void 0,
			"aria-expanded": I(D)?.role === "trailing" ? I(D).expanded.value : void 0,
			"aria-haspopup": I(D)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": A.value ? M.value : void 0,
			block: I(s).block,
			disabled: I(_),
			title: N.value ? void 0 : I(u).title,
			type: I(s).type,
			"use-cursor": I(k),
			onClick: I(T)
		}), {
			default: V(() => [
				N.value ? (w(), i(Fe, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: P.value,
					"optical-size": re.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [l(F(te.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : a("", !0),
				W.value ? (w(), i(Fe, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: P.value,
					"optical-size": re.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(s).prefix === void 0 ? j(e.$slots, "prefix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(s).prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				N.value ? a("", !0) : (w(), o("span", Vt, [K.value ? j(e.$slots, "selected", { key: 0 }, void 0, !0) : j(e.$slots, "default", { key: 1 }, void 0, !0)])),
				G.value ? (w(), i(Fe, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: P.value,
					"optical-size": re.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(s).suffix === void 0 ? j(e.$slots, "suffix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(s).suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				N.value && ne.value ? (w(), i(At, {
					key: 4,
					content: ne.value,
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
}), [["__scopeId", "data-v-d00b93de"]]), Ut = ["data-scrollable"], Wt = { class: "mat-app-root__overlay" }, Gt = { class: "mat-app-root__bottom-stack" }, Kt = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		], i = $("appRoot", e);
		if (p(Ye, null)) throw Error("MatAppRoot 不允许嵌套");
		let a = ee(), c = O(null), l = O(null), u = O(null), d = O(null), f = O(null), m = O(null), _ = O(null), v = E({
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
		function L(e) {
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
			let e = window.getComputedStyle(_.value), t = window.getComputedStyle(c.value).direction, n = L(e.paddingLeft), r = L(e.paddingRight);
			return {
				top: L(e.paddingTop),
				bottom: L(e.paddingBottom),
				start: t === "rtl" ? r : n,
				end: t === "rtl" ? n : r
			};
		}
		function B(e, t, n) {
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
		function te() {
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
			}, f = B(e, r, o), p = window.getComputedStyle(c.value).direction;
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
		function U() {
			if (!M || F) return;
			F = !0;
			let e = () => {
				F = !1, P = void 0, te();
			};
			if (typeof window.requestAnimationFrame == "function") {
				P = window.requestAnimationFrame(e);
				return;
			}
			P = window.setTimeout(e, 0);
		}
		function ne({ edge: e, element: n } = {}) {
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
			return A.push(i), N?.observe(n), U(), Object.freeze({
				insets: D(r),
				unregister: () => {
					i.active && (i.active = !1, N?.unobserve?.(n), U());
				},
				update: () => {
					i.active && U();
				}
			});
		}
		let W = Object.freeze({
			layout: y,
			registerEdge: ne
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
		T(Ye, {
			publicContext: W,
			rootElement: D(c),
			contentElement: D(l),
			edgeLayer: D(u),
			freeLayer: D(d),
			snackbarLayer: D(f),
			floatingLayer: D(m),
			getLayoutRect: G
		});
		function K() {
			window.addEventListener("resize", U), document.addEventListener("scroll", U, !0), window.visualViewport?.addEventListener("resize", U), window.visualViewport?.addEventListener("scroll", U);
		}
		function re() {
			window.removeEventListener("resize", U), document.removeEventListener("scroll", U, !0), window.visualViewport?.removeEventListener("resize", U), window.visualViewport?.removeEventListener("scroll", U);
		}
		return S(async () => {
			M = !0, N = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(U), N?.observe(c.value), A.forEach((e) => {
				e.active && N?.observe(e.element);
			}), K(), await g(), U();
		}), b(() => {
			M = !1, N?.disconnect(), N = void 0, re(), P !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(P) : window.clearTimeout(P));
		}), z([() => i.fillViewport, () => i.scrollable], U), (e, t) => (w(), o("div", h({
			ref_key: "rootElement",
			ref: c
		}, e.$attrs, {
			class: ["mat-app-root", C.value],
			"data-scrollable": String(I(i).scrollable),
			style: k.value
		}), [
			s("div", {
				ref_key: "contentElement",
				ref: l,
				class: "mat-app-root__content"
			}, [j(e.$slots, "default", {}, void 0, !0)], 512),
			s("div", Wt, [
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
				s("div", Gt, [
					t[0] ||= s("span", {
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
		], 16, Ut));
	}
}), [["__scopeId", "data-v-0f17cac4"]]), qt = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap();
function Yt(e, t, n) {
	let r = [n.initialValue, ...n.names].filter((e) => e && e !== "none"), i = e.style;
	i[t] = r.join(", ");
}
function Xt(e, t, n, r) {
	let i = e.get(t);
	return i || (i = {
		initialValue: t.style[n],
		names: /* @__PURE__ */ new Set()
	}, e.set(t, i)), i.names.add(r), Yt(t, n, i), () => {
		if (i.names.delete(r), i.names.size > 0) {
			Yt(t, n, i);
			return;
		}
		let a = t.style;
		a[n] = i.initialValue, e.delete(t);
	};
}
function Zt({ name: e, scope: t, source: n }) {
	let r = qt.get(n)?.initialAxis ?? n.style.scrollTimelineAxis, i = Xt(qt, n, "scrollTimelineName", e), a = qt.get(n);
	a.initialAxis = r;
	let o = n.style;
	o.scrollTimelineAxis = "block";
	let s = Xt(Jt, t, "timelineScope", e);
	return () => {
		s(), i(), qt.has(n) || (o.scrollTimelineAxis = r);
	};
}
function Qt(e) {
	let t = e.parentElement;
	for (; t;) {
		let e = window.getComputedStyle(t).overflowY;
		if (/(auto|scroll|overlay)/.test(e)) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function $t(e, t) {
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
var en = {
	key: 0,
	class: "mat-app-bar__leading"
}, tn = { class: "mat-app-bar__main" }, nn = {
	key: 0,
	class: "mat-app-bar__subtitle mat-sys-typescale-body-medium"
}, rn = {
	key: 1,
	class: "mat-app-bar__trailing"
}, an = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		], u = ["start", "center"], f = $("appBar", e), m = ee(), y = d(), x = p(Ye, null), C = y?.vnode.props ?? {}, T = Object.prototype.hasOwnProperty.call(C, "attach"), E = O(null), D = O(null), k = P(null), A = `--mat-app-bar-${y?.uid ?? Math.random().toString(36).slice(2)}`, M = r(() => c.includes(f.variant) ? f.variant : "small"), N = r(() => M.value === "search" ? "search" : l.includes(f.content) ? f.content : "headline"), F = r(() => u.includes(f.align) ? f.align : "start"), L = r(() => M.value === "medium-flexible" ? 112 : M.value === "large-flexible" ? 120 : 64), R = r(() => f.app && !!x && !T), B = r(() => {
			if (!f.app) return document.body;
			if (R.value) return x.edgeLayer.value;
			if (f.attach instanceof HTMLElement && f.attach.ownerDocument === document) return f.attach;
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return null;
		}), V = r(() => {
			let e = L.value - 64;
			return !f.app || R.value ? e : L.value;
		}), H = r(() => [
			`mat-app-bar--${M.value}`,
			`mat-app-bar--content-${N.value}`,
			`mat-app-bar--align-${F.value}`
		]), te = r(() => [m.style, { "--mat-app-bar-timeline": A }]), U = r(() => M.value === "medium-flexible" ? Bt("headline", "small") : M.value === "large-flexible" ? Bt("headline", "medium") : Bt("title", "large")), ne = r(() => ({
			"mat-app-bar__host--app": f.app,
			"mat-app-bar__host--app-root": R.value
		})), W = !1, G;
		function K() {
			return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "scroll()");
		}
		function re(e) {
			if (e instanceof HTMLElement && e.ownerDocument === document) return e;
			if (typeof e == "string") try {
				return document.querySelector(e);
			} catch {
				return null;
			}
			return null;
		}
		function q() {
			G?.(), G = void 0, D.value?.removeAttribute("data-timeline-active"), k.value?.unregister(), k.value = null;
		}
		async function J() {
			if (await g(), !W || !E.value || !D.value || (q(), R.value && (k.value = x.publicContext.registerEdge({
				edge: "top",
				element: E.value
			})), !K())) return;
			let e = re(f.scrollTarget), t = R.value && x.rootElement.value?.dataset.scrollable === "true" ? x.contentElement.value : null, n = e ?? t ?? Qt(E.value);
			if (!n) return;
			let r = R.value ? x.rootElement.value : $t(n, D.value);
			r && (G = Zt({
				name: A,
				scope: r,
				source: n
			}), D.value.dataset.timelineActive = "");
		}
		return S(() => {
			W = !0, J();
		}), b(() => {
			W = !1, q();
		}), z([
			() => f.app,
			() => f.attach,
			() => f.scrollTarget,
			M
		], J), (e, r) => (w(), o(t, null, [!I(f).app || B.value ? (w(), i(n, {
			key: 0,
			disabled: !I(f).app,
			to: B.value
		}, [s("div", {
			ref_key: "hostElement",
			ref: E,
			class: _(["mat-app-bar__host", ne.value])
		}, [s("header", h({
			ref_key: "headerElement",
			ref: D
		}, I(m), {
			class: ["mat-app-bar", H.value],
			style: te.value
		}), [
			e.$slots.leading ? (w(), o("div", en, [j(e.$slots, "leading", {}, void 0, !0)])) : a("", !0),
			s("div", tn, [s("div", { class: _(["mat-app-bar__primary", U.value]) }, [j(e.$slots, "default", {}, void 0, !0)], 2), e.$slots.subtitle ? (w(), o("div", nn, [j(e.$slots, "subtitle", {}, void 0, !0)])) : a("", !0)]),
			r[0] ||= s("span", {
				class: "mat-app-bar__spacer",
				"aria-hidden": "true"
			}, null, -1),
			e.$slots.trailing ? (w(), o("div", rn, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16)], 2)], 8, ["disabled", "to"])) : a("", !0), V.value > 0 ? (w(), o("span", {
			key: 1,
			"aria-hidden": "true",
			class: "mat-app-bar__placeholder",
			style: v({ blockSize: `${V.value}px` })
		}, null, 4)) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-ec82873c"]]), on = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let r = $("inputBase", e), a = n, o = O(null);
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
		}), (e, t) => (w(), i(M(I(r).control), h({
			ref_key: "input",
			ref: o
		}, e.$attrs, {
			class: "mat-input-base",
			disabled: I(r).disabled,
			maxlength: I(r).maxLength,
			readonly: I(r).readonly,
			required: I(r).required,
			rows: I(r).control === "textarea" ? I(r).rows : void 0,
			type: I(r).control === "input" ? I(r).type : void 0,
			value: I(r).modelValue,
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
}), [["__scopeId", "data-v-78f1e5d6"]]), sn = { class: "mat-search__leading" }, cn = {
	key: 0,
	class: "mat-search__trailing"
}, ln = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let i = $("search", e), c = n, l = ee(), d = O(null), f = r(() => ({
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
			class: "mat-search mat-sys-typescale-body-large",
			role: "search",
			onSubmit: te(m, ["prevent"])
		}), [
			s("span", sn, [j(e.$slots, "leading", {}, () => [u(Ht, {
				disabled: I(i).disabled,
				icon: "search",
				label: I(i).label,
				size: "small",
				type: "button",
				variant: "standard",
				onClick: m
			}, null, 8, ["disabled", "label"])], !0)]),
			u(on, h({
				ref_key: "inputBase",
				ref: d
			}, p.value, {
				"aria-label": I(i).label,
				control: "input",
				disabled: I(i).disabled,
				"max-length": I(i).maxLength,
				"model-value": I(i).modelValue,
				placeholder: I(i).placeholder,
				readonly: I(i).readonly,
				type: "search",
				onKeydown: H(te(m, ["prevent"]), ["enter"]),
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
			e.$slots.trailing ? (w(), o("span", cn, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-2ad22621"]]), un = 150, dn = .75, fn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return se.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return ce.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
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
		let n = $("btnGroup", e), i = t, a = O(null), s = O(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set(), d, f, p = un, m = !0, _ = !1, { colorStyle: v } = Me(r(() => n.color));
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
		T(jt, {
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
			return E(t ?? "") ?? un;
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
			}), u.clear(), s.value && delete s.value.dataset.matGroupPressed, s.value = null, p = un, m = !0, _ = !1;
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
		function ee(e) {
			m = !1, _ = !1;
			let t = D(e);
			if (p = t, k() || t === 0) {
				m = !0;
				return;
			}
			d = globalThis.setTimeout(() => {
				d = void 0, s.value === e && (m = !0, _ && P());
			}, t * dn);
		}
		function L(e) {
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
			}), t.dataset.matGroupPressed = "", s.value = t, ee(t);
		}
		async function R(e) {
			let t = C(e.target);
			t && (await g(), L(t));
		}
		function B(e) {
			e.relatedTarget instanceof Node && a.value?.contains(e.relatedTarget) || F();
		}
		async function V(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = C(e.target);
			t && (await g(), L(t));
		}
		function H() {
			if (n.variant !== "connected" || !a.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...a.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return S(H), b(N), z(() => [n.variant, n.selection], async () => {
			N(), await g(), H();
		}), (e, t) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, {
			class: ["mat-btn-group", [
				`mat-btn-group--${I(n).variant}`,
				`mat-btn-group--size-${I(n).size}`,
				`mat-btn-group--shape-${I(n).shape}`,
				{
					"mat-btn-group--block": I(n).block,
					"mat-btn-group--full-width": I(n).variant === "connected" && I(n).fullWidth
				}
			]],
			style: I(v),
			role: "group",
			onFocusout: B,
			onKeydown: V,
			onKeyupCapture: F,
			onLostpointercaptureCapture: F,
			onPointercancelCapture: F,
			onPointerdown: R,
			onPointerupCapture: F
		}), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-66b07331"]]), pn = [
	"small",
	"medium",
	"large"
], mn = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], hn = [
	"button",
	"submit",
	"reset"
];
function gn(e) {
	return typeof e == "string" && mn.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var _n = {
	key: 1,
	class: "mat-fab__label"
}, vn = {
	key: 1,
	class: "mat-fab__label"
}, yn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return pn.includes(e);
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
			validator: gn
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return hn.includes(e);
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
		let c = $("fab", t), d = s, f = ee(), m = R(), g = p(ae, Z), _ = p(Ye, null), v = O(null), y = L(), b = r(() => (m.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = r(() => typeof c.icon == "string" && c.icon.trim().length > 0), S = r(() => !b.value), C = r(() => S.value ? f.title ?? c.label : void 0), T = r(() => S.value ? c.label : f["aria-label"]), E = r(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[c.size]), D = r(() => {
			let [e, t] = {
				small: ["title", "medium"],
				medium: ["title", "large"],
				large: ["headline", "small"]
			}[c.size];
			return Bt(e, t);
		}), k = r(() => ({
			"--mat-fab-container-color": `var(--mat-sys-color-${c.color})`,
			"--mat-fab-content-color": `var(--mat-sys-color-on-${c.color})`,
			"--mat-fab-state-color": `var(--mat-sys-color-on-${c.color})`
		})), A = r(() => c.app && !!_), M = r(() => A.value ? _.floatingLayer.value : null);
		return B(() => {
			S.value && (!x.value || !c.label || c.label.trim().length === 0) && console.warn("MatFab: 图标模式必须提供非空 label");
		}), (e, t) => A.value ? M.value ? (w(), i(n, {
			key: 1,
			to: M.value
		}, [u(X, h({
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${I(c).size}`,
				`mat-fab--position-${I(c).position}`,
				D.value,
				{
					"mat-fab--app-root": !0,
					"mat-fab--extended": b.value,
					"mat-fab--icon-only": S.value
				}
			]],
			style: k.value,
			"aria-label": T.value,
			disabled: I(c).disabled,
			title: S.value ? void 0 : I(f).title,
			type: I(c).type,
			"use-cursor": I(g).useCursor,
			onClick: t[1] ||= (e) => d("click", e)
		}), {
			default: V(() => [
				x.value ? (w(), i(Fe, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": E.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [l(F(I(c).icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : a("", !0),
				b.value ? (w(), o("span", vn, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(At, {
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
		])], 8, ["to"])) : a("", !0) : (w(), i(X, h({
			key: 0,
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${I(c).size}`,
				D.value,
				{
					"mat-fab--extended": b.value,
					"mat-fab--icon-only": S.value
				}
			]],
			style: k.value,
			"aria-label": T.value,
			disabled: I(c).disabled,
			title: S.value ? void 0 : I(f).title,
			type: I(c).type,
			"use-cursor": I(g).useCursor,
			onClick: t[0] ||= (e) => d("click", e)
		}), {
			default: V(() => [
				x.value ? (w(), i(Fe, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": E.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [l(F(I(c).icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : a("", !0),
				b.value ? (w(), o("span", _n, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(At, {
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
}), [["__scopeId", "data-v-ae067ea6"]]), bn = ["src"], xn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Be(e, { property: "border-radius" })
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
			validator: (e) => Be(e, {
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
		let t = $("image", e), n = ee(), i = r(() => ({
			class: n.class,
			style: n.style
		})), a = r(() => Object.fromEntries(Object.entries(n).filter(([e]) => !["class", "style"].includes(e)))), c = r(() => ({
			aspectRatio: He(t.aspectRatio, {
				property: "aspect-ratio",
				positive: !0
			}),
			borderRadius: t.radius === void 0 ? "var(--mat-sys-shape-corner-extra-large)" : Ve(t.radius, {
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
			class: ["mat-image__img", I(t).imgClass],
			style: l.value,
			src: I(t).src
		}), null, 16, bn)], 16));
	}
}), [["__scopeId", "data-v-c6b3e009"]]), Sn = /*@__PURE__*/ Object.assign({ name: "MatText" }, {
	__name: "MatText",
	props: {
		type: {
			type: String,
			default: "body",
			validator: Lt
		},
		size: {
			type: String,
			default: "medium",
			validator: Rt
		},
		emphasized: {
			type: Boolean,
			default: !1
		},
		as: {
			type: String,
			default: "span",
			validator: me
		}
	},
	setup(e) {
		let t = $("text", e), n = r(() => Bt(t.type, t.size, t.emphasized));
		return (e, r) => (w(), i(M(I(t).as), { class: _(n.value) }, {
			default: V(() => [j(e.$slots, "default")]),
			_: 3
		}, 8, ["class"]));
	}
}), Cn = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = p(Mt), a = R();
		T(Mt, {
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
}), wn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return se.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
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
		let n = $("splitBtn", e), i = t, a = O(null), c = R(), { colorStyle: l, hasExplicitColor: d } = Me(r(() => n.color));
		T(Mt, {
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
		return S(m), z(() => [n.size, n.variant], async () => {
			await g(), m();
		}), (e, t) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, {
			class: ["mat-split-btn", [
				`mat-split-btn--${I(n).variant}`,
				`mat-split-btn--size-${I(n).size}`,
				{
					"mat-split-btn--block": I(n).block,
					"mat-split-btn--expanded": I(n).expanded,
					"mat-split-btn--explicit-color": I(d)
				}
			]],
			style: I(l),
			role: "group"
		}), [s("span", {
			class: "mat-split-btn__segment mat-split-btn__leading",
			onClick: f
		}, [u(Cn, { role: "leading" }, {
			default: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), s("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [u(Cn, { role: "trailing" }, {
			default: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-6f7200c8"]]), Tn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			default: V(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-76b082b5"]]), En = { class: "mat-card-headline mat-sys-typescale-title-large" }, Dn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (w(), o("div", En, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-5a13e3d0"]]), On = { class: "mat-card-media" }, kn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (w(), o("div", On, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-7208424e"]]), An = { class: "mat-card-subhead mat-sys-typescale-body-medium" }, jn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (w(), o("div", An, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-13f41dc3"]]), Mn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: Q
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
		let t = $("card", e), { colorStyle: n, hasExplicitColor: o } = Me(r(() => t.color));
		return (e, r) => (w(), i(Tn, h(e.$attrs, {
			class: ["mat-card", [`mat-card--${I(t).variant}`, { "mat-card--explicit-color": I(o) }]],
			style: I(n),
			as: I(t).as
		}), {
			default: V(() => [
				e.$slots.media ? (w(), i(kn, { key: 0 }, {
					default: V(() => [j(e.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				e.$slots.headline ? (w(), i(Dn, { key: 1 }, {
					default: V(() => [j(e.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				e.$slots.subhead ? (w(), i(jn, { key: 2 }, {
					default: V(() => [j(e.$slots, "subhead", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				j(e.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"as"
		]));
	}
}), [["__scopeId", "data-v-4222ba97"]]), Nn = { class: "mat-card-action-area__content" }, Pn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => le.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = e, r = t, a = $("cardActionArea", n), o = p(ae, Z);
		return (e, t) => (w(), i(Y, h(e.$attrs, {
			class: "mat-card-action-area",
			disabled: I(a).disabled,
			"focus-ring": !1,
			href: I(a).href,
			type: I(a).type,
			"use-cursor": I(o).useCursor,
			onClick: t[0] ||= (e) => r("click", e)
		}), {
			default: V(() => [s("span", Nn, [j(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-bc57888e"]]), Fn = { class: "mat-card-content" }, In = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (w(), o("div", Fn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-8a32cf5d"]]), Ln = { class: "mat-card-actions" }, Rn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (w(), o("div", Ln, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-f3e5f8e6"]]), zn = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], Bn = Symbol("mat-list"), Vn = Symbol("mat-list-group-activator");
function Hn(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function Un(e) {
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
function Wn(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function Gn(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(Wn);
}
var Kn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return zn.includes(e);
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
				return e.every(Wn);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
		}
	},
	emits: {
		select(e) {
			return e && Object.hasOwn(e, "value") && Object.hasOwn(e, "nextSelected") && e.originalEvent instanceof Event;
		},
		"update:expanded"(e) {
			return Array.isArray(e) && e.every(Wn);
		}
	},
	setup(e, { emit: t }) {
		let n = $("list", e), a = t, o = O(null), s = r(() => Hn(n.interaction)), c = r(() => s.value ? "div" : "ul"), { colorStyle: l } = Me(r(() => n.color)), u = [], d = [
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
		let C = Un({
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
		return T(Bn, {
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
		}), S(C.observe), z(o, async () => {
			C.restore(), await g(), C.observe();
		}), z(() => n.interaction, async () => {
			C.restore(), await g(), C.observe();
		}), z(() => n.selected, async () => {
			o.value?.contains(document.activeElement) || C.resetActive(), await g(), C.queueRefresh();
		}, { deep: !0 }), (e, t) => (w(), i(M(c.value), h({
			ref_key: "root",
			ref: o
		}, e.$attrs, {
			class: ["mat-list", `mat-list--${I(n).variant}`],
			style: I(l),
			"aria-multiselectable": I(n).interaction === "multi-select" ? "true" : e.$attrs["aria-multiselectable"],
			"aria-orientation": s.value ? "vertical" : e.$attrs["aria-orientation"],
			role: s.value ? "listbox" : e.$attrs.role,
			onFocusin: I(C).handleFocusIn,
			onKeydown: E
		}), {
			default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-652dfedc"]]), qn = ["data-line-count"], Jn = ["inert"], Yn = ["inert"], Xn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
		},
		labelTypographyClass: {
			type: String,
			required: !0
		},
		supportingTypographyClass: {
			type: String,
			required: !0
		},
		trailingTypographyClass: {
			type: String,
			required: !0
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
			}, [e.leadingIcon ? (w(), i(Fe, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: V(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : j(t.$slots, "leading", { key: 1 }, void 0, !0)], 10, Jn)) : a("", !0),
			s("span", {
				"data-mat-item-content-text": "",
				class: _(`${e.namespace}__text`)
			}, [
				t.$slots.overline ? (w(), o("span", {
					key: 0,
					"data-mat-item-content-overline": "",
					class: _([`${e.namespace}__overline`, e.trailingTypographyClass])
				}, [j(t.$slots, "overline", {}, void 0, !0)], 2)) : a("", !0),
				s("span", {
					"data-mat-item-content-label": "",
					class: _([`${e.namespace}__label`, e.labelTypographyClass])
				}, [j(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.supporting ? (w(), o("span", {
					key: 1,
					"data-mat-item-content-supporting": "",
					class: _([`${e.namespace}__supporting`, e.supportingTypographyClass])
				}, [j(t.$slots, "supporting", {}, void 0, !0)], 2)) : a("", !0)
			], 2),
			t.$slots.trailing && !e.separateTrailing ? (w(), o("span", {
				key: 1,
				"data-mat-item-content-trailing": "",
				class: _([`${e.namespace}__trailing`, e.trailingTypographyClass]),
				inert: e.presentationSlots ? "" : void 0
			}, [j(t.$slots, "trailing", {}, void 0, !0)], 10, Yn)) : a("", !0)
		], 10, qn));
	}
}), [["__scopeId", "data-v-8bcade82"]]), Zn = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		return (t, n) => (w(), i(Xn, {
			namespace: "mat-list-item-content",
			"label-typography-class": "mat-sys-typescale-body-large",
			"line-count": e.lineCount,
			"presentation-slots": e.presentationSlots,
			"separate-trailing": e.separateTrailing,
			"supporting-typography-class": "mat-sys-typescale-body-medium",
			"trailing-typography-class": "mat-sys-typescale-label-small"
		}, c({
			default: V(() => [j(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: V(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: V(() => [j(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: V(() => [j(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: V(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, [
			"line-count",
			"presentation-slots",
			"separate-trailing"
		]));
	}
}), [["__scopeId", "data-v-f09dfa3d"]]), Qn = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], $n = ["aria-disabled", "data-mat-list-disabled"], er = ["aria-disabled", "data-mat-list-disabled"], tr = ["inert"], nr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return le.includes(e);
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
		let n = $("listItem", e), s = t, l = R(), d = p(Bn, null), f = p(Vn, null), m = p(ae, Z), v = r(() => d?.interaction.value ?? "none"), y = r(() => v.value === "single-action" || v.value === "multi-action"), b = r(() => v.value === "multi-action"), x = r(() => d?.isSelectable.value ?? !1), C = r(() => d?.isSelected(n.value) ?? !1), T = r(() => !!l.trailing), E = r(() => {
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
		}), z(() => [
			n.disabled,
			n.href,
			v.value
		], async () => {
			M(), await g(), d?.requestFocusRefresh();
		}), (e, t) => I(f)?.static.value ? (w(), o("div", h({ key: 0 }, e.$attrs, {
			id: I(f).labelId,
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", D.value],
			"data-mat-list-group-label": "",
			"aria-disabled": I(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": I(n).disabled ? "true" : void 0
		}), [u(Zn, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			e.$slots.leading ? {
				name: "leading",
				fn: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			e.$slots.overline ? {
				name: "overline",
				fn: V(() => [j(e.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			e.$slots.supporting ? {
				name: "supporting",
				fn: V(() => [j(e.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			e.$slots.trailing ? {
				name: "trailing",
				fn: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, Qn)) : I(f) ? (w(), i(Y, h({ key: 1 }, e.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-group-activator": "",
			"aria-controls": I(f).contentId,
			"aria-expanded": I(f).expanded.value ? "true" : "false",
			"data-mat-list-disabled": I(n).disabled ? "true" : void 0,
			disabled: I(n).disabled,
			"focus-ring": !0,
			type: "button",
			"use-cursor": I(m).useCursor,
			onClick: k
		}), {
			default: V(() => [u(Zn, {
				"line-count": E.value,
				"presentation-slots": !1
			}, c({
				default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: V(() => [j(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: V(() => [j(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
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
		])) : v.value === "none" ? (w(), o("li", h({ key: 2 }, e.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", D.value],
			"aria-disabled": I(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": I(n).disabled ? "true" : void 0
		}), [u(Zn, {
			"line-count": E.value,
			"presentation-slots": !1
		}, c({
			default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			e.$slots.leading ? {
				name: "leading",
				fn: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			e.$slots.overline ? {
				name: "overline",
				fn: V(() => [j(e.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			e.$slots.supporting ? {
				name: "supporting",
				fn: V(() => [j(e.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			e.$slots.trailing ? {
				name: "trailing",
				fn: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, $n)) : y.value ? (w(), o("li", {
			key: 3,
			class: _(["mat-list-item", [D.value, {
				"mat-list-item__surface": b.value,
				"mat-list-item--multi-action": b.value
			}]]),
			"aria-disabled": I(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": I(n).disabled ? "true" : void 0
		}, [u(Y, h(e.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !b.value }],
			"data-mat-list-primary": "",
			disabled: I(n).disabled,
			"focus-ring": !0,
			href: I(n).href,
			type: I(n).type,
			"use-cursor": I(m).useCursor,
			onClick: O
		}), {
			default: V(() => [u(Zn, {
				"line-count": E.value,
				"presentation-slots": !1,
				"separate-trailing": b.value && T.value
			}, c({
				default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: V(() => [j(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: V(() => [j(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
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
			class: "mat-list-item__separate-trailing mat-sys-typescale-label-small",
			"data-mat-list-trailing": "",
			inert: I(n).disabled ? "" : void 0
		}, [j(e.$slots, "trailing", {}, void 0, !0)], 8, tr)) : a("", !0)], 10, er)) : (w(), i(Y, h({ key: 4 }, e.$attrs, {
			as: "div",
			class: ["mat-list-item mat-list-item__surface mat-list-item--selectable", D.value],
			"data-mat-list-primary": "",
			"data-mat-list-disabled": I(n).disabled ? "true" : void 0,
			"aria-selected": C.value ? "true" : "false",
			disabled: I(n).disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": I(m).useCursor,
			onClick: O,
			onKeydown: A
		}), {
			default: V(() => [u(Zn, {
				"line-count": E.value,
				"presentation-slots": ""
			}, c({
				default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: V(() => [j(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: V(() => [j(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-a04e1437"]]), rr = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return T(Vn, e.context), (e, t) => j(e.$slots, "default");
	}
}), ir = [
	"role",
	"aria-hidden",
	"inert"
], ar = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let a = $("listGroup", n), o = p(Bn, null), c = R(), l = O(null), d = O(!1), f = O(null), _ = Symbol("mat-list-group"), v = L().replace(/[^\w-]/g, "-"), y = `mat-list-group-${v}-content`, x = `mat-list-group-${v}-label`, T = !1, E, D = r(() => a.value !== void 0), k = r(() => o?.isSelectable.value ?? !1), A = r(() => D.value ? o?.isGroupExpanded(a.value) ?? !1 : d.value);
		function N(n) {
			return n.flatMap((n) => m(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? N(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = r(() => {
			let e = N(c.activator?.({ expanded: A.value }) ?? []);
			if (e.length !== 1 || !m(e[0])) return !1;
			let t = e[0].type;
			return t === nr || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), F = r(() => f.value ?? P.value), I = r(() => k.value || !F.value || A.value), ee = r(() => o?.variant.value ?? "segmented");
		function B() {
			(l.value?.querySelector(":scope > [data-mat-list-group-content]"))?.contains(document.activeElement) && l.value?.querySelector(":scope > [data-mat-list-group-activator]")?.focus();
		}
		function H() {
			if (!(k.value || !F.value)) {
				if (A.value && B(), D.value) {
					o?.requestGroupExpanded(a.value, !A.value);
					return;
				}
				d.value = !d.value;
			}
		}
		let te = {
			contentId: y,
			expanded: I,
			labelId: x,
			static: k,
			toggle: H
		};
		function U() {
			!F.value && !T ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), T = !0) : F.value && (T = !1);
		}
		function ne() {
			if (!l.value) return;
			let e = k.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(l.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			f.value !== t && (f.value = t);
		}
		function W() {
			ne(), U();
		}
		function G(e) {
			e !== void 0 && (o?.registerGroupValue(_, e), E = e);
		}
		function K() {
			E !== void 0 && (o?.unregisterGroupValue(_), E = void 0);
		}
		return S(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), k.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), G(a.value), W(), o?.requestFocusRefresh();
		}), C(W), b(() => {
			K(), o?.requestFocusRefresh();
		}), z(() => a.value, (e, t) => {
			Object.is(e, t) || (K(), G(e));
		}), z(A, async (e, t) => {
			t && !e && B(), await g(), o?.requestFocusRefresh();
		}), z(k, async (e, t) => {
			e && !t && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), await g(), o?.requestFocusRefresh();
		}), (e, t) => (w(), i(M(k.value ? "div" : "li"), h({
			ref_key: "root",
			ref: l
		}, e.$attrs, {
			class: ["mat-list-group", [`mat-list-group--${ee.value}`, {
				"mat-list-group--expanded": I.value,
				"mat-list-group--selectable-fallback": k.value
			}]],
			role: k.value ? "group" : void 0,
			"aria-labelledby": k.value ? x : void 0
		}), {
			default: V(() => [u(rr, { context: te }, {
				default: V(() => [j(e.$slots, "activator", { expanded: I.value }, void 0, !0)]),
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
				default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, ["role"]))], 8, ir)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-eccc1668"]]), or = Symbol("mat-menu"), sr = Symbol("mat-menu-item"), cr = Symbol("mat-menu-group");
function lr(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function ur(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = lr(t, a, o), c = lr(e, a, o), l = lr(t, e, o), u = lr(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function dr(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var fr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let t = $("divider", e), n = p(Bn, null), a = p(or, null), o = r(() => !!n), s = r(() => !!a), c = r(() => n?.isSelectable.value ?? !1), l = r(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = r(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
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
}), [["__scopeId", "data-v-1fa4b6f3"]]), pr = { class: "mat-selection-control__target" }, mr = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], hr = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, gr = {
	key: 0,
	class: "mat-selection-control__label"
}, _r = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: Q
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
		let i = e, c = n, l = ee(), u = R(), d = O(null), f = p(ae, Z), { colorStyle: m } = Me(r(() => i.color)), g = r(() => {
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
			class: ["mat-selection-control mat-sys-typescale-body-large", {
				"mat-selection-control--checked": e.checked,
				"mat-selection-control--disabled": e.disabled,
				"mat-selection-control--use-cursor": I(f).useCursor
			}],
			style: v.value
		}), [s("span", pr, [
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
			}), null, 16, mr),
			n[2] ||= s("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			s("span", hr, [j(t.$slots, "indicator", {}, void 0, !0)])
		]), I(u).default ? (w(), o("span", gr, [j(t.$slots, "default", {}, void 0, !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-aa2fd81d"]]), vr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: Gn
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: Wn
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
			validator: Q
		}
	},
	emits: {
		"update:modelValue": Gn,
		"update:indeterminate"(e) {
			return typeof e == "boolean";
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("checkbox", e), a = t, o = r(() => Array.isArray(n.modelValue) ? n.modelValue.some((e) => Object.is(e, n.value)) : n.modelValue);
		function c(e) {
			let t = e.target.checked;
			if (Array.isArray(n.modelValue)) {
				let e = t ? [...n.modelValue, n.value] : n.modelValue.filter((e) => !Object.is(e, n.value));
				a("update:modelValue", e);
			} else a("update:modelValue", t);
			a("update:indeterminate", !1), a("change", e);
		}
		return (e, t) => (w(), i(_r, h(e.$attrs, {
			class: ["mat-checkbox", {
				"mat-checkbox--checked": o.value,
				"mat-checkbox--indeterminate": I(n).indeterminate
			}],
			checked: o.value,
			color: I(n).color,
			disabled: I(n).disabled,
			indeterminate: I(n).indeterminate,
			"input-type": "checkbox",
			"input-value": I(n).value,
			"label-name": "MatCheckbox",
			onChange: c
		}), {
			indicator: V(() => [...t[0] ||= [s("span", { class: "mat-checkbox__box" }, [s("span", { class: "mat-checkbox__check" }), s("span", { class: "mat-checkbox__mixed" })], -1)]]),
			default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-731b684e"]]), yr = Symbol("mat-chip-set"), br = {
	key: 0,
	class: "mat-chip__avatar",
	"aria-hidden": "true",
	inert: ""
}, xr = {
	key: 1,
	class: "mat-chip__icon mat-chip__icon--leading",
	"aria-hidden": "true",
	inert: ""
}, Sr = { class: "mat-chip__label" }, Cr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return e === void 0 || Wn(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return le.includes(e);
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
		let n = $("chip", e), c = t, l = R(), u = p(ae, Z), d = p(yr, null), f = r(() => ["filter", "input"].includes(n.variant)), m = r(() => !!d && f.value && n.value !== void 0 && d.selection.value !== "none"), g = r(() => m.value ? d.isSelected(n.value) : f.value && n.selected), _ = r(() => !!l.avatar), v = r(() => !_.value && !!l.leading), y = r(() => n.variant === "filter" && g.value && !_.value && !v.value), b = r(() => _.value || v.value || y.value), x = r(() => !!l.trailing || n.variant === "input"), { colorStyle: S, hasExplicitColor: C } = Me(r(() => n.color));
		function T(e) {
			c("click", e), m.value && d.requestSelection(n.value, e);
		}
		function E(e) {
			n.variant !== "input" || l.trailing || (e.stopPropagation(), n.disabled || c("remove", e));
		}
		return (e, t) => (w(), i(Y, h(e.$attrs, {
			class: ["mat-chip mat-sys-typescale-label-large", [`mat-chip--${I(n).variant}`, {
				"mat-chip--elevated": I(n).elevated,
				"mat-chip--selected": g.value,
				"mat-chip--explicit-color": I(C),
				"mat-chip--has-leading": b.value,
				"mat-chip--has-avatar": _.value,
				"mat-chip--has-trailing": x.value
			}]],
			style: I(S),
			"aria-pressed": f.value ? String(g.value) : void 0,
			disabled: I(n).disabled,
			type: I(n).type,
			"use-cursor": I(u).useCursor,
			onClick: T
		}), {
			default: V(() => [
				_.value ? (w(), o("span", br, [j(e.$slots, "avatar", {}, void 0, !0)])) : v.value || y.value ? (w(), o("span", xr, [v.value ? j(e.$slots, "leading", { key: 0 }, void 0, !0) : (w(), i(Fe, {
					key: 1,
					as: "span",
					icon: "check",
					"optical-size": 20,
					size: "18px"
				}))])) : a("", !0),
				s("span", Sr, [j(e.$slots, "default", {}, void 0, !0)]),
				x.value ? (w(), o("span", {
					key: 2,
					class: "mat-chip__icon mat-chip__icon--trailing",
					"aria-hidden": "true",
					onClick: E
				}, [e.$slots.trailing ? j(e.$slots, "trailing", { key: 0 }, void 0, !0) : (w(), i(Fe, {
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
}), [["__scopeId", "data-v-90d72871"]]), wr = {
	key: 0,
	class: "mat-scroll-area__fixed"
}, Tr = {
	key: 1,
	class: "mat-scroll-area__fixed"
}, Er = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Be(e, { allowUndefined: !1 })
		},
		shadowLength: {
			type: [Number, Object],
			default: void 0,
			validator: (e) => Ue(e)
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
			validator: (e) => Ue(e, { allowUndefined: !1 })
		},
		shadowOffset: {
			type: [Number, Object],
			default: 0,
			validator: (e) => Ue(e, { allowUndefined: !1 })
		}
	},
	emits: {
		"reach-start": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement,
		"reach-end": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement
	},
	setup(e, { expose: t, emit: n }) {
		let i = $("scrollArea", e), c = n, l = ee(), u = O(null), d = O(!1), f = O(!1), p = O(!1), m = O(!1), y = O(!1), x, T, E, D = 0, k = 0, A = !1, M, N = r(() => [
			"horizontal",
			"x",
			"h"
		].includes(i.orientation) ? "horizontal" : "vertical"), P = r(() => i.dragScroll && N.value === "horizontal"), F = r(() => We(i.reachThreshold, 0)), L = r(() => We(i.shadowOffset, 0)), R = r(() => We(i.shadowLength, 16)), B = r(() => i.barWidth === "hidden" ? 0 : i.barWidth === "thin" ? 10 : 16), V = r(() => ({
			"--mat-scroll-area-shadow-length-start": `${R.value.start}px`,
			"--mat-scroll-area-shadow-length-end": `${R.value.end}px`,
			"--mat-scroll-area-shadow-offset-start": `${L.value.start}px`,
			"--mat-scroll-area-shadow-offset-end": `${L.value.end}px`,
			"--mat-scroll-area-scrollbar-space": `${B.value}px`
		})), H = r(() => ({
			class: l.class,
			style: l.style
		})), te = r(() => {
			let e = N.value === "horizontal", t = Ve(i.snapPadding, { fallback: "0" });
			return {
				scrollPaddingBottom: e ? void 0 : t,
				scrollPaddingLeft: e ? t : void 0,
				scrollPaddingRight: e ? t : void 0,
				scrollPaddingTop: e ? void 0 : t,
				scrollSnapType: i.snap === "none" ? "none" : `${e ? "x" : "y"} ${i.snap}`
			};
		}), U = r(() => Object.fromEntries(Object.entries(l).filter(([e]) => !["class", "style"].includes(e))));
		function ne() {
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
		function W(e) {
			let t = u.value;
			if (!t) return;
			let n = ne(), r = n.start <= F.value.start + 1, i = n.end <= F.value.end + 1;
			d.value = n.start > 1, f.value = n.end > 1, e && r && !m.value && c("reach-start", {
				distance: n.start,
				target: t
			}), e && i && !y.value && c("reach-end", {
				distance: n.end,
				target: t
			}), m.value = r, y.value = i;
		}
		function G(e) {
			x !== void 0 && cancelAnimationFrame(x), x = requestAnimationFrame(() => {
				x = void 0, W(e);
			});
		}
		function K() {
			G(!0);
		}
		function re() {
			M !== void 0 && (globalThis.clearTimeout(M), M = void 0), A = !1;
		}
		function q() {
			re(), A = !0, M = globalThis.setTimeout(() => {
				A = !1, M = void 0;
			}, 0);
		}
		function J(e = !1) {
			let t = u.value, n = E;
			e && n !== void 0 && t?.hasPointerCapture?.(n) && t.releasePointerCapture(n), E = void 0, p.value = !1;
		}
		function Y(e) {
			!P.value || E !== void 0 || e.button !== 0 || !["mouse", "pen"].includes(e.pointerType) || (E = e.pointerId, D = e.clientX, k = u.value?.scrollLeft ?? 0);
		}
		function X(e) {
			if (e.pointerId !== E || !u.value) return;
			let t = e.clientX - D;
			!p.value && Math.abs(t) <= 4 || (p.value || (p.value = !0, u.value.setPointerCapture?.(e.pointerId)), e.preventDefault(), u.value.scrollLeft = k - t);
		}
		function ie(e) {
			e.pointerId === E && (p.value && q(), J(!0));
		}
		function Z(e) {
			e.pointerId === E && J(!0);
		}
		function ae(e) {
			e.target !== u.value || e.pointerId !== E || (p.value && q(), J());
		}
		function oe(e) {
			A && (re(), e.preventDefault(), e.stopImmediatePropagation());
		}
		function se() {
			!T || !u.value || (T.disconnect(), T.observe(u.value), Array.from(u.value.children).forEach((e) => {
				T.observe(e);
			}), G(!1));
		}
		function ce() {
			return u.value;
		}
		function le(e) {
			u.value?.scrollTo(e);
		}
		return z([N, F], async () => {
			await g(), G(!1);
		}, { deep: !0 }), z(P, (e) => {
			e || (J(!0), re());
		}), S(() => {
			typeof ResizeObserver == "function" && (T = new ResizeObserver(() => G(!1))), se();
		}), C(se), b(() => {
			x !== void 0 && cancelAnimationFrame(x), T?.disconnect(), J(!0), re();
		}), t({
			getScroller: ce,
			scrollTo: le
		}), (e, t) => (w(), o("div", h(H.value, { class: ["mat-scroll-area", `mat-scroll-area--${N.value}`] }), [
			e.$slots["fixed-start"] ? (w(), o("div", wr, [j(e.$slots, "fixed-start", {}, void 0, !0)])) : a("", !0),
			s("div", {
				class: _(["mat-scroll-area__viewport", {
					"mat-scroll-area__viewport--start-overflow": d.value,
					"mat-scroll-area__viewport--end-overflow": f.value
				}]),
				style: v(V.value)
			}, [s("div", h({
				ref_key: "scroller",
				ref: u
			}, U.value, {
				class: ["mat-scroll-area__scroller", [`mat-scroll-area__scroller--bar-${I(i).barWidth}`, {
					"mat-scroll-area__scroller--dragging": p.value,
					"mat-scroll-area__scroller--start-overflow": d.value,
					"mat-scroll-area__scroller--end-overflow": f.value
				}]],
				style: te.value,
				onClickCapture: oe,
				onLostpointercapture: ae,
				onPointercancel: Z,
				onPointerdown: Y,
				onPointermove: X,
				onPointerup: ie,
				onScroll: K
			}), [j(e.$slots, "default", {}, void 0, !0)], 16)], 6),
			e.$slots["fixed-end"] ? (w(), o("div", Tr, [j(e.$slots, "fixed-end", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-87fcdd08"]]), Dr = { class: "mat-chip-set__scroll-content" }, Or = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatChipSet" }, {
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
				return e === null || Wn(e) || Array.isArray(e) && e.every(Wn);
			}
		}
	},
	emits: { "update:modelValue"(e) {
		return e === null || Wn(e) || Array.isArray(e) && e.every(Wn);
	} },
	setup(e, { emit: t }) {
		let n = $("chipSet", e), a = t, c = r(() => n.selection);
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
		return T(yr, {
			isSelected: l,
			requestSelection: u,
			selection: c
		}), (e, t) => (w(), o("div", {
			class: _(["mat-chip-set", `mat-chip-set--${I(n).layout}`]),
			role: "group"
		}, [I(n).layout === "scroll" ? (w(), i(Er, {
			key: 0,
			class: "mat-chip-set__scroll-area",
			orientation: "horizontal",
			"bar-width": "hidden",
			"drag-scroll": "",
			"shadow-length": 48
		}, {
			default: V(() => [s("div", Dr, [j(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		})) : j(e.$slots, "default", { key: 1 }, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-0f248b3b"]]), kr = Symbol("mde-vue-radio-group"), Ar = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return e == null || Wn(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: Wn
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Wn(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radio", e), a = t, o = d(), c = p(kr, null), l = O(null), u = r(() => n.value), f = r(() => n.disabled || !!c?.disabled.value), m = r(() => n.color ?? c?.color.value), g = r(() => c ? c.isSelected(n.value) : Object.is(n.modelValue, n.value));
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
		return (e, t) => (w(), i(_r, h({
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
			indicator: V(() => [...t[0] ||= [s("span", { class: "mat-radio__ring" }, [s("span", { class: "mat-radio__dot" })], -1)]]),
			default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-9cc613bd"]]), jr = ["aria-disabled"], Mr = { class: "mat-radio-group__label mat-sys-typescale-title-medium" }, Nr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
				return e === null || Wn(e);
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
			validator: Q
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Wn(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radioGroup", e), i = t, a = ee(), c = P([]), { colorStyle: l } = Me(r(() => n.color)), u = r(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = r(() => [l.value, a.style]);
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
		return T(kr, {
			color: r(() => n.color),
			disabled: r(() => n.disabled),
			getTabIndex: _,
			isSelected: f,
			move: y,
			register: m,
			requestSelection: v,
			unregister: g
		}), (e, t) => (w(), o("fieldset", h(u.value, {
			class: "mat-radio-group",
			"aria-disabled": I(n).disabled || void 0,
			style: d.value,
			role: "radiogroup"
		}), [s("legend", Mr, F(I(n).label), 1), j(e.$slots, "default", {}, void 0, !0)], 16, jr));
	}
}), [["__scopeId", "data-v-4ad7f784"]]), Pr = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: Q
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
		let n = $("switch", e), r = t;
		function a(e) {
			r("update:modelValue", e.target.checked), r("change", e);
		}
		return (e, t) => (w(), i(_r, h(e.$attrs, {
			class: ["mat-switch", [`mat-switch--icons-${I(n).icons}`, { "mat-switch--checked": I(n).modelValue }]],
			checked: I(n).modelValue,
			color: I(n).color,
			disabled: I(n).disabled,
			"input-role": "switch",
			"input-type": "checkbox",
			"label-name": "MatSwitch",
			onChange: a
		}), {
			indicator: V(() => [...t[0] ||= [s("span", { class: "mat-switch__track" }, [s("span", { class: "mat-switch__handle-positioner" }, [s("span", { class: "mat-switch__handle" }, [s("span", { class: "mat-switch__icon mat-switch__icon--selected" }), s("span", { class: "mat-switch__icon mat-switch__icon--unselected" })])])], -1)]]),
			default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-62ed193c"]]), Fr = Object.freeze(["horizontal", "vertical"]), Ir = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), Lr = Object.freeze(["standard", "centered"]), Rr = 12;
function zr(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Br(e) {
	return zr(e) && e > 0;
}
function Vr(e) {
	return Fr.includes(e);
}
function Hr(e) {
	return Ir.includes(e);
}
function Ur(e) {
	return Lr.includes(e);
}
function Wr(e) {
	return Array.isArray(e) && e.length === 2 && e.every(zr);
}
function Gr(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function Kr(e, t) {
	return Number(e.toFixed(Math.min(Rr, t)));
}
function qr(e, t) {
	let n = zr(e) ? e : 0, r = zr(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function Jr(e) {
	return Br(e) ? e : 1;
}
function Yr(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function Xr(e, t, n) {
	let r = Yr(zr(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(Gr(t.min), Gr(t.max), Gr(n));
	return Kr(Yr(t.min + i * n, t), a);
}
function Zr(e, t, n) {
	return Xr(zr(e) ? e : (t.min + t.max) / 2, t, n);
}
function Qr(e, t) {
	return Kr((Yr(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function $r(e) {
	return Number(e.toFixed(3)).toString();
}
function ei(e) {
	let t = Math.min(Math.max(e, 0), 100), n = $r(t), r = Kr(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${$r(Math.abs(r))}px)`;
}
function ti(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(Gr(e.min), Gr(e.max), Gr(t)), i = Array.from({ length: n + 1 }, (n, i) => Kr(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function ni(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return Xr(n.min + (n.max - n.min) * u, n, r);
}
function ri(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return Xr(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return Xr(e + i * r, n, r);
}
function ii(e, t, n, r) {
	let i = Xr(e, n, r), a = Xr(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var ai = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, oi = { class: "mat-slider__inset-icon-layer" }, si = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, ci = [
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
], li = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: zr
		},
		min: {
			type: Number,
			default: 0,
			validator: zr
		},
		max: {
			type: Number,
			default: 100,
			validator: zr
		},
		step: {
			type: Number,
			default: 1,
			validator: Br
		},
		variant: {
			type: String,
			default: "standard",
			validator: Ur
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || zr(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: Vr
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Hr
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
			return zr(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = $("slider", e), c = n, l = ee(), d = O(null), f = O(null), m = O(null), g = O(!1), y = O(void 0), b = O(void 0), x = O(!1), S = O(!1), C = p(ae, Z), { colorStyle: T } = Me(r(() => i.color)), E = r(() => qr(i.min, i.max)), D = r(() => Jr(i.step)), k = r(() => Xr(i.modelValue, E.value, D.value)), j = r(() => g.value ? b.value : k.value), M = r(() => Zr(i.center, E.value, D.value)), N = r(() => i.variant === "centered" ? M.value : E.value.min), P = r(() => Qr(j.value, E.value)), F = r(() => Qr(N.value, E.value)), L = r(() => ei(P.value)), R = r(() => i.variant === "standard" ? "0%" : ei(F.value)), z = r(() => Math.sign(P.value - F.value)), B = r(() => z.value >= 0 ? R.value : `calc(${L.value} + var(--mat-slider-handle-track-gap))`), V = r(() => z.value > 0 ? `max(0px, calc(${L.value} - ${R.value} - var(--mat-slider-handle-track-gap)))` : z.value < 0 ? `max(0px, calc(${R.value} - ${L.value} - var(--mat-slider-handle-track-gap)))` : "0px"), H = r(() => z.value > 0 ? R.value : `max(0px, calc(${L.value} - var(--mat-slider-handle-track-gap)))`), te = r(() => z.value < 0 ? R.value : `calc(${L.value} + var(--mat-slider-handle-track-gap))`), U = r(() => z.value < 0 ? `calc(100% - ${R.value})` : `max(0px, calc(100% - ${L.value} - var(--mat-slider-handle-track-gap)))`), ne = r(() => i.showStopIndicator ? ti(E.value, D.value) : i.variant === "centered" ? [E.value.min, E.value.max] : [E.value.max]), W = r(() => i.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(i.size)), G = r(() => i.size === "extra-large" ? 32 : 24), K = r(() => i.showValueIndicator && (g.value || S.value)), re = r(() => ({
			...T.value,
			"--mat-slider-active-visible-size": V.value,
			"--mat-slider-active-visible-start": B.value,
			"--mat-slider-center-position": R.value,
			"--mat-slider-inactive-after-size": U.value,
			"--mat-slider-inactive-after-start": te.value,
			"--mat-slider-inactive-before-size": H.value,
			"--mat-slider-position": L.value
		}));
		function q(e, t) {
			let n = g.value ? b.value : k.value;
			return e === void 0 || e === n ? !1 : (g.value && (b.value = e), c("update:modelValue", e), c("input", t), !0);
		}
		function J(e) {
			return f.value ? q(ni(e, f.value, E.value, D.value, i.orientation), e) : !1;
		}
		function Y(e) {
			i.disabled || (y.value = e.pointerId, b.value = k.value, x.value = !1, g.value = !0, m.value?.focus(), f.value?.setPointerCapture?.(e.pointerId), x.value = J(e));
		}
		function X(e) {
			!g.value || e.pointerId !== y.value || (x.value = J(e) || x.value);
		}
		function ie(e, t) {
			!g.value || e.pointerId !== y.value || (t && (x.value = J(e) || x.value), t && x.value && c("change", e), g.value = !1, x.value = !1, y.value = void 0, b.value = void 0);
		}
		function oe(e) {
			if (i.disabled) return;
			let t = ri(k.value, e.key, E.value, D.value);
			t !== void 0 && (e.preventDefault(), q(t, e) && c("change", e));
		}
		return (n, r) => (w(), o("div", h(I(l), {
			class: ["mat-slider", [
				`mat-slider--${I(i).orientation}`,
				`mat-slider--size-${I(i).size}`,
				`mat-slider--${I(i).variant}`,
				{
					"mat-slider--disabled": I(i).disabled,
					"mat-slider--dragging": g.value,
					"mat-slider--use-cursor": I(C).useCursor
				}
			]],
			style: re.value
		}), [
			s("span", ai, [
				r[6] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				s("span", { class: _(["mat-slider__active-track", { "mat-slider__active-track--from-start": I(i).variant === "standard" }]) }, null, 2),
				r[7] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(ne.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(N.value, j.value) && e <= Math.max(N.value, j.value) }]),
					style: v({ "--mat-slider-stop-position": I(ei)(I(Qr)(e, E.value)) })
				}, null, 6))), 128)),
				W.value ? (w(), o(t, { key: 0 }, [s("span", oi, [u(Fe, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: I(i).insetIcon,
					"optical-size": G.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), s("span", si, [u(Fe, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: I(i).insetIcon,
					"optical-size": G.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])])], 64)) : a("", !0),
				s("span", {
					ref_key: "handle",
					ref: d,
					class: "mat-slider__handle"
				}, [...r[5] ||= [s("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
			]),
			u(At, {
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
				onPointerdown: Y,
				onPointermove: X,
				onPointerup: r[2] ||= (e) => ie(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "nativeInput",
				ref: m,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": I(l)["aria-label"],
				"aria-orientation": I(i).orientation,
				"aria-valuemax": E.value.max,
				"aria-valuemin": E.value.min,
				"aria-valuenow": j.value,
				disabled: I(i).disabled,
				max: E.value.max,
				min: E.value.min,
				step: D.value,
				value: j.value,
				onBlur: r[3] ||= (e) => S.value = !1,
				onFocus: r[4] ||= (e) => S.value = !0,
				onKeydown: oe
			}, null, 40, ci)
		], 16));
	}
}), [["__scopeId", "data-v-3563d6df"]]), ui = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, di = [
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
], fi = [
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
], pi = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: Wr
		},
		min: {
			type: Number,
			default: 0,
			validator: zr
		},
		max: {
			type: Number,
			default: 100,
			validator: zr
		},
		step: {
			type: Number,
			default: 1,
			validator: Br
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Q
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: Vr
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Hr
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
			return Wr(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = $("rangeSlider", e), a = n, c = ee(), l = O([]), d = O(null), f = O(null), m = O(null), g = O(0), y = O(void 0), b = O(!1), x = O(void 0), S = O(void 0), C = O(!1), T = p(ae, Z), { colorStyle: E } = Me(r(() => i.color)), D = r(() => qr(i.min, i.max)), k = r(() => Jr(i.step)), j = r(() => ii(i.modelValue?.[0], i.modelValue?.[1], D.value, k.value)), M = r(() => b.value ? S.value : j.value), N = r(() => Qr(M.value[0], D.value)), P = r(() => Qr(M.value[1], D.value)), F = r(() => ei(N.value)), L = r(() => ei(P.value)), R = r(() => i.showStopIndicator ? ti(D.value, k.value) : [D.value.min, D.value.max]), z = r(() => l.value[g.value] ?? null), B = r(() => M.value[g.value]), V = r(() => i.showValueIndicator && (b.value || y.value === g.value)), H = r(() => ({
			...E.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${L.value} - ${F.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${F.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": L.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${L.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${L.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${F.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": F.value
		}));
		function te(e) {
			return e === 0 ? f.value : m.value;
		}
		function U(e) {
			let [t, n] = M.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function ne(e, t, n) {
			if (t === void 0) return !1;
			let [r, i] = b.value ? S.value : j.value, o = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === i ? !1 : (b.value && (S.value = o), a("update:modelValue", o), a("input", n), !0);
		}
		function W(e) {
			if (!d.value) return !1;
			let t = ni(e, d.value, D.value, k.value, i.orientation);
			return ne(g.value, t, e);
		}
		function G(e) {
			if (i.disabled || !d.value) return;
			let t = ni(e, d.value, D.value, k.value, i.orientation);
			t !== void 0 && (g.value = U(t), x.value = e.pointerId, S.value = [...j.value], C.value = !1, b.value = !0, te(g.value)?.focus(), d.value.setPointerCapture?.(e.pointerId), C.value = ne(g.value, t, e));
		}
		function K(e) {
			!b.value || e.pointerId !== x.value || (C.value = W(e) || C.value);
		}
		function re(e, t) {
			!b.value || e.pointerId !== x.value || (t && (C.value = W(e) || C.value), t && C.value && a("change", e), b.value = !1, C.value = !1, x.value = void 0, S.value = void 0);
		}
		function q(e, t) {
			if (i.disabled) return;
			let n = ri(j.value[e], t.key, D.value, k.value);
			n !== void 0 && (t.preventDefault(), g.value = e, ne(e, n, t) && a("change", t));
		}
		function J(e) {
			g.value = e, y.value = e;
		}
		function Y(e) {
			y.value === e && (y.value = void 0);
		}
		function X(e, t) {
			l.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (e, n) => (w(), o("div", h(I(c), {
			class: ["mat-range-slider", [
				`mat-range-slider--${I(i).orientation}`,
				`mat-range-slider--size-${I(i).size}`,
				{
					"mat-range-slider--disabled": I(i).disabled,
					"mat-range-slider--dragging": b.value,
					"mat-range-slider--use-cursor": I(T).useCursor
				}
			]],
			style: H.value
		}), [
			s("span", ui, [
				n[10] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				n[11] ||= s("span", { class: "mat-range-slider__active-track" }, null, -1),
				n[12] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(R.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= M.value[0] && e <= M.value[1] }]),
					style: v({ "--mat-range-slider-stop-position": I(ei)(I(Qr)(e, D.value)) })
				}, null, 6))), 128)),
				(w(!0), o(t, null, A(M.value, (e, t) => (w(), o("span", {
					key: t,
					ref_for: !0,
					ref: (e) => X(t, e),
					class: _(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": g.value === t }]])
				}, [...n[9] ||= [s("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			u(At, {
				class: "mat-range-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(B.value),
				location: I(i).orientation === "vertical" ? "right" : "top",
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
				onLostpointercapture: n[0] ||= (e) => re(e, !1),
				onPointercancel: n[1] ||= (e) => re(e, !1),
				onPointerdown: G,
				onPointermove: K,
				onPointerup: n[2] ||= (e) => re(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "startInput",
				ref: f,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": I(i).ariaLabelStart,
				"aria-orientation": I(i).orientation,
				"aria-valuemax": M.value[1],
				"aria-valuemin": D.value.min,
				"aria-valuenow": M.value[0],
				disabled: I(i).disabled,
				max: M.value[1],
				min: D.value.min,
				step: k.value,
				value: M.value[0],
				onBlur: n[3] ||= (e) => Y(0),
				onFocus: n[4] ||= (e) => J(0),
				onKeydown: n[5] ||= (e) => q(0, e)
			}, null, 40, di),
			s("input", {
				ref_key: "endInput",
				ref: m,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": I(i).ariaLabelEnd,
				"aria-orientation": I(i).orientation,
				"aria-valuemax": D.value.max,
				"aria-valuemin": M.value[0],
				"aria-valuenow": M.value[1],
				disabled: I(i).disabled,
				max: D.value.max,
				min: M.value[0],
				step: k.value,
				value: M.value[1],
				onBlur: n[6] ||= (e) => Y(1),
				onFocus: n[7] ||= (e) => J(1),
				onKeydown: n[8] ||= (e) => q(1, e)
			}, null, 40, fi)
		], 16));
	}
}), [["__scopeId", "data-v-9719721a"]]), mi = ["inert", "aria-hidden"], hi = { class: "mat-text-input__container" }, gi = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, _i = {
	key: 0,
	class: "mat-text-input__outline-label mat-sys-typescale-body-small"
}, vi = { key: 0 }, yi = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, bi = ["for"], xi = {
	key: 0,
	"aria-hidden": "true"
}, Si = { class: "mat-text-input__control-row" }, Ci = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, wi = {
	key: 1,
	class: "mat-text-input__affix mat-text-input__suffix"
}, Ti = { class: "mat-text-input__supporting-text" }, Ei = {
	key: 0,
	class: "mat-text-input__counter"
}, Di = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, d = ee(), f = O(!1), p = O(n.modelValue), m = O(), y = L(), x = `${y}-supporting`, C = r(() => d.id || y), { colorStyle: T } = Me(r(() => n.color)), E = r(() => !!d.placeholder), D = r(() => f.value || p.value.length > 0 || E.value), k = r(() => n.error ? n.errorText : n.supportingText), A = r(() => !!k.value || n.maxLength !== void 0), M = r(() => {
			let e = [d["aria-describedby"]];
			return A.value && e.push(x), e.filter(Boolean).join(" ") || void 0;
		}), N = r(() => [T.value, d.style]), P = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), I = r(() => Object.fromEntries(Object.entries(d).filter(([e]) => !P.has(e)))), R, B;
		function H(e) {
			return Number.parseFloat(e) || 0;
		}
		function te() {
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
		function U() {
			g(te);
		}
		function ne(e) {
			let t = e[0]?.contentRect.width;
			t !== B && (B = t, U());
		}
		z(() => n.modelValue, (e) => {
			p.value = e, U();
		}), z(() => [
			n.autoGrow,
			n.label,
			n.maxRows,
			n.noResize,
			n.resizeMinRows,
			n.rows
		], U), S(() => {
			te(), typeof globalThis.ResizeObserver == "function" && (R = new globalThis.ResizeObserver(ne), R.observe(m.value.getInput()));
		}), b(() => {
			R?.disconnect();
		});
		function W() {
			m.value?.focusInput();
		}
		function G(e) {
			p.value = e, c("update:modelValue", e), U();
		}
		return (t, n) => (w(), o("div", {
			class: _(["mat-text-input mat-sys-typescale-body-large", [
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
		}, [s("div", hi, [
			e.variant === "outlined" ? (w(), o("fieldset", gi, [D.value && e.label ? (w(), o("legend", _i, [l(F(e.label), 1), e.required ? (w(), o("span", vi, " *")) : a("", !0)])) : a("", !0)])) : a("", !0),
			e.variant === "filled" ? (w(), o("span", yi)) : a("", !0),
			t.$slots.leading ? (w(), i(Fe, {
				key: 2,
				as: "span",
				class: "mat-text-input__icon mat-text-input__leading",
				"optical-size": 24,
				size: "24px"
			}, {
				default: V(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : a("", !0),
			s("label", {
				class: "mat-text-input__main",
				for: C.value,
				onClick: W
			}, [e.label ? (w(), o("span", {
				key: 0,
				class: _(["mat-text-input__label", D.value ? "mat-sys-typescale-body-small" : "mat-sys-typescale-body-large"])
			}, [l(F(e.label), 1), e.required ? (w(), o("span", xi, " *")) : a("", !0)], 2)) : a("", !0), s("span", Si, [
				e.prefixText ? (w(), o("span", Ci, F(e.prefixText), 1)) : a("", !0),
				u(on, h({
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
					"onUpdate:modelValue": G
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
				e.suffixText ? (w(), o("span", wi, F(e.suffixText), 1)) : a("", !0)
			])], 8, bi),
			t.$slots.trailing ? (w(), i(Fe, {
				key: 3,
				as: "span",
				class: "mat-text-input__icon mat-text-input__trailing",
				"optical-size": 24,
				size: "24px"
			}, {
				default: V(() => [j(t.$slots, "trailing", {}, void 0, !0)]),
				_: 3
			})) : a("", !0)
		]), A.value ? (w(), o("span", {
			key: 0,
			id: x,
			class: "mat-text-input__supporting mat-sys-typescale-body-small"
		}, [s("span", Ti, F(k.value), 1), e.maxLength === void 0 ? a("", !0) : (w(), o("span", Ei, F(e.modelValue.length) + " / " + F(e.maxLength), 1))])) : a("", !0)], 14, mi));
	}
}), [["__scopeId", "data-v-b7c5cfea"]]), Oi = ["filled", "outlined"], ki = {
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
			return Oi.includes(e);
		}
	},
	color: {
		type: String,
		default: void 0,
		validator: Q
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
}, Ai = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...ki,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = $("textField", e), r = t;
		return (e, t) => (w(), i(Di, h({
			...e.$attrs,
			...I(n)
		}, {
			control: "input",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: V(() => [j(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: V(() => [j(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040));
	}
}), ji = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...ki,
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
		let n = $("textarea", e), r = d();
		function a() {
			return Object.hasOwn(r.vnode.props ?? {}, "rows") ? n.rows : 1;
		}
		let o = t;
		return (e, t) => (w(), i(Di, h({
			...e.$attrs,
			...I(n)
		}, {
			control: "textarea",
			"resize-min-rows": a(),
			"onUpdate:modelValue": t[0] ||= (e) => o("update:modelValue", e)
		}), c({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: V(() => [j(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: V(() => [j(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040, ["resize-min-rows"]));
	}
}), Mi = 200, Ni = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: Q
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Be(e, {
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
		let i = $("menu", e), s = n, c = ee(), l = R(), d = p(sr, null), f = p(or, null), m = O(null), _ = O(null), v = O(null), y = r(() => v.value?.root ?? v.value?.$el ?? null), x = L().replace(/[^\w-]/g, "-"), E = r(() => c.id ?? `${x}-menu`), D = `--mat-menu-anchor-${x}`, k = O(!1), A = O("closed"), M = f?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, N = O(0), P = /* @__PURE__ */ new Map(), F = null, B = "", H = !1, te = !1, U = !1, ne, W, G, K = null, re = !1, q = !1, J = r(() => !!d), Y = r(() => !!l.activator), X = r(() => !J.value && !Y.value && me(i.anchor)), ie = r(() => N.value > 0), Z = r(() => !J.value && i.scrim), ae = r(() => Z.value ? "manual" : "auto"), oe = r(() => J.value ? k.value : i.modelValue), se = r(() => i.variant ?? f?.variant.value ?? "standard"), ce = r(() => i.color ?? f?.color.value), le = r(() => i.closeOnClick), { colorStyle: ue } = Me(ce), Q = r(() => {
			if (i.maxLength === void 0) return;
			let e = Ve(i.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(100dvb - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))`;
			return {
				"--mat-menu-resolved-max-length": t,
				maxBlockSize: t
			};
		}), de = r(() => {
			let [e, t] = me(i.offset) ? i.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: X.value ? "auto" : D
			};
			return X.value && me(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), fe = r(() => [
			ue.value,
			de.value,
			c.style,
			Q.value
		]), pe = Un({
			root: y,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === y.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function me(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function he() {
			if (J.value) return d.element.value;
			if (Y.value) {
				let e = m.value ? [...m.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function ge() {
			F && (B ? F.style.setProperty("anchor-name", B) : F.style.removeProperty("anchor-name"), F = null, B = "");
		}
		function _e() {
			let e = he();
			return e ? F === e ? e : (ge(), F = e, B = e.style.getPropertyValue("anchor-name"), e.style.setProperty("anchor-name", D), e) : null;
		}
		function ve() {
			ne !== void 0 && (window.clearTimeout(ne), ne = void 0);
		}
		function ye() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function be() {
			!Z.value || !_.value || te || (te = !0, _.value.showPopover?.());
		}
		function xe() {
			te && (te = !1, _.value?.hidePopover?.());
		}
		function Se() {
			y.value && H && (H = !1, U = !0, y.value.hidePopover?.()), xe(), A.value = "closed";
		}
		function Ce() {
			ne = void 0, xe(), A.value = "closed";
		}
		function we() {
			if (ve(), ye()) {
				A.value = "closed";
				return;
			}
			A.value = "closing", ne = window.setTimeout(Ce, Mi);
		}
		function Te({ immediate: e = !1 } = {}) {
			if (!(!y.value || !H)) {
				if (U = !0, Ae({ immediate: !0 }), e || ye()) {
					ve(), Se();
					return;
				}
				A.value !== "closing" && (A.value = "closing", ve(), ne = window.setTimeout(() => {
					ne = void 0, Se();
				}, Mi));
			}
		}
		function Ee() {
			if (W = void 0, !y.value || !H) return;
			let e = y.value.style, t = y.value.getBoundingClientRect(), n = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, r = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, i = Number.parseFloat(getComputedStyle(y.value).getPropertyValue("--mat-menu-viewport-space")), a = Number.isFinite(i) ? i : 8, o = {
				bottom: t.bottom - r,
				left: t.left - n,
				right: t.right - n,
				top: t.top - r
			}, s = 0, c = 0;
			o.left < a ? s = a - o.left : o.right > window.innerWidth - a && (s = window.innerWidth - a - o.right), o.top < a ? c = a - o.top : o.bottom > window.innerHeight - a && (c = window.innerHeight - a - o.bottom), e.setProperty("--mat-menu-viewport-shift-x", `${s}px`), e.setProperty("--mat-menu-viewport-shift-y", `${c}px`);
		}
		function De() {
			W !== void 0 && cancelAnimationFrame(W), W = requestAnimationFrame(Ee);
		}
		async function Oe() {
			ve(), U = !1, await g();
			let e = X.value ? null : _e(), t = X.value || !!e;
			if (!y.value || !t) {
				J.value || (console.warn(Y.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), s("update:modelValue", !1));
				return;
			}
			H || (X.value && document.activeElement instanceof HTMLElement && (K = document.activeElement), be(), H = !0, y.value.showPopover?.()), A.value = "open", J.value && (d.submenuOpen.value = !0), pe.refresh(), pe.focusFirst(), De();
		}
		function ke() {
			let e = he() ?? K;
			K = null, g(() => e?.focus());
		}
		function Ae({ immediate: e = !1 } = {}) {
			P.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function je({ focus: e = !0, immediate: t = !1 } = {}) {
			Ae({ immediate: t }), J.value ? (k.value = !1, d.submenuOpen.value = !1) : s("update:modelValue", !1), Te({ immediate: t }), e && ke();
		}
		function Ne() {
			if (f) {
				f.closeTree();
				return;
			}
			je();
		}
		function Pe(e) {
			e.preventDefault(), je();
		}
		function Fe(e) {
			let t = e.target;
			!(t instanceof Node) || y.value?.contains(t) || F?.contains(t) || je();
		}
		function Ie(e) {
			P.set(e.element, e), dr(Array.from(P.values()).filter((e) => !e.grouped)), pe.queueRefresh();
		}
		function Le(e) {
			P.delete(e.element), dr(Array.from(P.values()).filter((e) => !e.grouped)), pe.queueRefresh();
		}
		function Re() {
			N.value += 1, pe.queueRefresh();
		}
		function ze() {
			N.value = Math.max(0, N.value - 1), pe.queueRefresh();
		}
		function Be(e, { pointer: t = !1 } = {}) {
			P.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function He(e) {
			let t = getComputedStyle(y.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), pe.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), pe.focusFirst()) : e.key === "End" ? (e.preventDefault(), pe.focusLast()) : e.key === "Escape" || J.value && e.key === t ? (e.preventDefault(), je()) : e.key === "Tab" && Ne();
		}
		function Ue(e) {
			if (H = e.newState === "open", H) {
				De();
				return;
			}
			let t = U;
			U = !1, Ae(), J.value && (k.value = !1, d.submenuOpen.value = !1), !(!oe.value || t) && (we(), J.value || s("update:modelValue", !1), ke());
		}
		T(or, {
			closeOtherSubmenus: Be,
			closeTree: Ne,
			closeOnClick: le,
			color: ce,
			registerItem: Ie,
			registerGroup: Re,
			unregisterItem: Le,
			unregisterGroup: ze,
			pointerHistory: M,
			variant: se
		}), d && d.registerSubmenu({
			close: je,
			element: y,
			id: E,
			open: Oe
		}), S(() => {
			pe.observe(), window.addEventListener("resize", De), window.addEventListener("scroll", De, {
				capture: !0,
				passive: !0
			}), oe.value && (Ge(), qe()), typeof ResizeObserver < "u" && (G = new ResizeObserver(De), G.observe(y.value)), oe.value && Oe();
		}), C(() => {
			J.value || !oe.value || X.value || he() !== F && (ge(), Oe());
		}), b(() => {
			ve(), W !== void 0 && cancelAnimationFrame(W), G?.disconnect(), window.removeEventListener("resize", De), window.removeEventListener("scroll", De, { capture: !0 }), Ke(), Je(), Te({ immediate: !0 }), xe(), ge(), d?.unregisterSubmenu();
		});
		function We(e) {
			M.previous = M.current, M.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Ge() {
			f || re || (document.addEventListener("pointermove", We, !0), re = !0);
		}
		function Ke() {
			re &&= (document.removeEventListener("pointermove", We, !0), !1);
		}
		function qe() {
			f || Z.value || q || (document.addEventListener("pointerdown", Fe, !0), q = !0);
		}
		function Je() {
			q &&= (document.removeEventListener("pointerdown", Fe, !0), !1);
		}
		return z(oe, (e) => {
			e ? (Ge(), qe(), Oe()) : (Ke(), Je(), Te());
		}), z(() => i.anchor, async () => {
			ge(), oe.value && await Oe();
		}, { deep: !0 }), z(() => i.offset, async () => {
			oe.value && (await g(), De());
		}, { deep: !0 }), z(() => i.maxLength, async () => {
			oe.value && (await g(), De());
		}), z(() => i.scrim, async () => {
			J.value || (y.value && H && (H = !1, U = !0, y.value.hidePopover?.()), xe(), Je(), await g(), oe.value && (qe(), await Oe()));
		}), (e, n) => (w(), o(t, null, [
			!J.value && Y.value ? (w(), o("span", {
				key: 0,
				ref_key: "activatorHost",
				ref: m,
				class: "mat-menu__activator"
			}, [j(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			!J.value && I(i).scrim ? (w(), o("div", {
				key: 1,
				ref_key: "scrimElement",
				ref: _,
				"aria-hidden": "true",
				class: "mat-menu__scrim",
				popover: "manual",
				onPointerdown: Pe
			}, null, 544)) : a("", !0),
			u(Tn, h({
				id: E.value,
				ref_key: "surface",
				ref: v
			}, e.$attrs, {
				class: ["mat-menu", [`mat-menu--${se.value}`, {
					"mat-menu--coordinate": X.value,
					"mat-menu--grouped": ie.value,
					"mat-menu--nested": J.value,
					"mat-menu--closing": A.value === "closing"
				}]],
				style: fe.value,
				popover: ae.value,
				role: "menu",
				onPointerenter: n[0] ||= (e) => I(d)?.cancelSubmenuClose(),
				onFocusin: I(pe).handleFocusIn,
				onKeydown: He,
				onToggle: Ue
			}), {
				default: V(() => [u(Er, {
					class: "mat-menu__surface",
					"bar-width": "hidden"
				}, {
					default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-1ab1c6cd"]]), Pi = ["aria-labelledby"], Fi = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = $("menuGroup", e), n = ee(), i = p(or, null), s = `${L().replace(/[^\w-]/g, "-")}-label`, c = r(() => t.label ? s : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), dr(Array.from(l));
		}
		function d(e) {
			l.delete(e), dr(Array.from(l));
		}
		return T(cr, {
			registerItem: u,
			unregisterItem: d
		}), S(() => i?.registerGroup()), b(() => i?.unregisterGroup()), (e, n) => (w(), o("div", h(e.$attrs, {
			class: "mat-menu-group",
			"aria-labelledby": c.value,
			role: "group"
		}), [I(t).label ? (w(), o("div", {
			key: 0,
			id: s,
			class: "mat-menu-group__label mat-sys-typescale-label-large"
		}, F(I(t).label), 1)) : a("", !0), j(e.$slots, "default", {}, void 0, !0)], 16, Pi));
	}
}), [["__scopeId", "data-v-2026601d"]]), Ii = { class: "mat-menu-item-host" }, Li = 300, Ri = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = $("menuItem", e), s = t, l = R(), d = p(or, null), f = p(cr, null), m = p(ae, Z), g = O(null), _ = r(() => g.value?.root ?? g.value?.$el ?? null), v = O(!1), y = O(void 0), x = O("only"), C, E, D = r(() => !!l.submenu);
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
				return ur(d.pointerHistory.current, d.pointerHistory.previous, t, n) ? Li : 0;
			}
		};
		function ee(e) {
			if (D.value) {
				M();
				return;
			}
			s("click", e), d?.closeOnClick.value && d.closeTree();
		}
		function L(e) {
			if (!D.value) return;
			let t = getComputedStyle(_.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), M());
		}
		return T(sr, {
			cancelSubmenuClose: A,
			element: _,
			registerSubmenu: N,
			submenuOpen: v,
			unregisterSubmenu: P
		}), S(() => {
			f?.registerItem(F), d?.registerItem(F);
		}), b(() => {
			clearTimeout(E), f?.unregisterItem(F), d?.unregisterItem(F);
		}), (e, t) => (w(), o("span", Ii, [u(Y, h({
			ref_key: "action",
			ref: g
		}, e.$attrs, {
			class: ["mat-menu-item", [`mat-menu-item--${x.value}`, { "mat-menu-item--submenu-open": v.value }]],
			"data-mat-menu-item": "",
			"aria-controls": D.value ? y.value : void 0,
			"aria-expanded": D.value ? String(v.value) : void 0,
			"aria-haspopup": D.value ? "menu" : void 0,
			disabled: I(n).disabled,
			role: "menuitem",
			"use-cursor": I(m).useCursor,
			onClick: ee,
			onKeydown: L,
			onPointerenter: t[0] ||= (e) => M({ pointer: !0 })
		}), {
			default: V(() => [u(Xn, {
				namespace: "mat-menu-item-content",
				"label-typography-class": "mat-sys-typescale-label-large",
				"line-count": e.$slots.supporting ? 2 : 1,
				"leading-icon": "",
				"supporting-typography-class": "mat-sys-typescale-body-small",
				"trailing-typography-class": "mat-sys-typescale-label-large"
			}, c({
				trailing: V(() => [e.$slots.trailing ? j(e.$slots, "trailing", { key: 0 }, void 0, !0) : D.value ? (w(), i(Fe, {
					key: 1,
					as: "span",
					class: "mat-menu-item__submenu-icon",
					icon: "chevron_right",
					"optical-size": 20,
					size: "small",
					"aria-hidden": "true"
				})) : a("", !0)]),
				default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [e.$slots.leading ? {
				name: "leading",
				fn: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, e.$slots.supporting ? {
				name: "supporting",
				fn: V(() => [j(e.$slots, "supporting", {}, void 0, !0)]),
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
		]), e.$slots.submenu ? j(e.$slots, "submenu", { key: 0 }, void 0, !0) : a("", !0)]));
	}
}), [["__scopeId", "data-v-0a6c8e7d"]]), zi = P([]), Bi = P(0), Vi = null;
function Hi() {
	if (!Vi) return;
	let { lockedScrollbarGutter: e, overflow: t, root: n, scrollbarGutter: r } = Vi;
	n.style.overflow === "hidden" && (n.style.overflow = t), e !== null && n.style.scrollbarGutter === e && (n.style.scrollbarGutter = r), Bi.value = 0, Vi = null;
}
function Ui() {
	if (Vi) return;
	let e = document.documentElement, t = e.clientWidth > 0 ? Math.max(0, window.innerWidth - e.clientWidth) : 0, n = getComputedStyle(e).scrollbarGutter, r = t > 0 && !n.includes("stable");
	Bi.value = t, Vi = {
		lockedScrollbarGutter: r ? "stable" : null,
		overflow: e.style.overflow,
		root: e,
		scrollbarGutter: e.style.scrollbarGutter
	}, r && (e.style.scrollbarGutter = Vi.lockedScrollbarGutter), e.style.overflow = "hidden";
}
function Wi(e) {
	let t = zi.value.filter((e) => e.isConnected);
	if (t.length === 0 && Hi(), t.includes(e)) {
		zi.value = t;
		return;
	}
	zi.value = [...t, e], Ui();
}
function Gi(e) {
	zi.value = zi.value.filter((t) => t !== e && t.isConnected), zi.value.length === 0 && Hi();
}
//#endregion
//#region src/components/mat-dialog/MatDialog.vue
var Ki = { class: "mat-dialog__header" }, qi = {
	key: 1,
	class: "mat-dialog__actions"
}, Ji = {
	key: 0,
	class: "mat-dialog__content mat-sys-typescale-body-medium"
}, Yi = {
	key: 2,
	class: "mat-dialog__content mat-sys-typescale-body-medium"
}, Xi = {
	key: 3,
	class: "mat-dialog__actions"
}, Zi = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Be(e, {
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
			validator: Q
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: c }) {
		let d = $("dialog", e), f = c, p = ee(), m = R(), _ = O(null), v = O(null), y = O(!1), x = O("closed"), C = O(null), T = `${L().replace(/[^\w-]/g, "-")}-title`, E = r(() => v.value?.root ?? v.value?.$el ?? null), D = r(() => d.title !== void 0 || !!m.title), k = r(() => d.content !== void 0 || !!m.default), A = r(() => !d.fullScreen && (d.icon !== void 0 || !!m.icon)), M = r(() => !!m.activator), N = r(() => zi.value.at(-1) === E.value), { colorStyle: P } = Me(r(() => d.color)), H = r(() => {
			if (d.fullScreen || d.width === void 0) return;
			let e = Ve(d.width, {
				property: "inline-size",
				positive: !0
			});
			if (e !== void 0) return {
				inlineSize: `min(${e}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), te = r(() => [
			P.value,
			p.style,
			H.value
		]), U = !1, ne, W = null;
		function G() {
			let e = _.value ? [..._.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function K() {
			ne !== void 0 && (window.clearTimeout(ne), ne = void 0);
		}
		function re() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function q(e, t) {
			if (K(), re()) {
				t();
				return;
			}
			ne = window.setTimeout(() => {
				ne = void 0, t();
			}, e);
		}
		function J() {
			if (typeof d.attach == "string") try {
				return document.querySelector(d.attach);
			} catch {
				return null;
			}
			return d.attach instanceof HTMLElement && d.attach.ownerDocument === document ? d.attach : null;
		}
		function Y() {
			f("update:modelValue", !1);
		}
		function X() {
			D.value || p["aria-label"] || p["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function ie() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function Z() {
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
		async function ae() {
			if (K(), y.value && E.value?.open) {
				x.value = "opening", q(400, () => {
					x.value = "open", f("opened");
				});
				return;
			}
			let e = M.value ? G() : null;
			if (M.value && !e) {
				ie(), Y();
				return;
			}
			let t = J();
			if (!t) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), Y();
				return;
			}
			W = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), C.value = t, y.value = !0, x.value = "opening", X(), await g(), !(!d.modelValue || !E.value) && (E.value.open || E.value.showModal(), Wi(E.value), Z(), q(400, () => {
				x.value = "open", f("opened");
			}));
		}
		function oe() {
			let e = E.value;
			e?.open && e.close(), e && Gi(e), y.value = !1, x.value = "closed", g(() => {
				W?.isConnected && W.focus({ preventScroll: !0 }), W = null, f("closed");
			});
		}
		function se() {
			y.value && (x.value = "closing", q(200, oe));
		}
		function ce(e) {
			e.preventDefault(), Y();
		}
		function le(e) {
			e.key === "Escape" && (e.preventDefault(), Y());
		}
		function ue(e) {
			if (!d.closeOnBack || e.target !== E.value) return;
			let t = E.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && Y();
		}
		return S(() => {
			U = !0, d.modelValue && ae();
		}), b(() => {
			U = !1, K(), E.value && (Gi(E.value), E.value.open && E.value.close());
		}), z(() => d.modelValue, (e) => {
			U && (e ? ae() : se());
		}), z(() => d.attach, () => {
			d.modelValue && y.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), B(() => {
			d.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (e, r) => (w(), o(t, null, [M.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-dialog__activator"
		}, [j(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), y.value ? (w(), i(n, {
			key: 1,
			to: C.value
		}, [u(Tn, h({
			ref_key: "surface",
			ref: v
		}, e.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${x.value}`, {
				"mat-dialog--full-screen": I(d).fullScreen,
				"mat-dialog--with-icon": A.value,
				"mat-dialog--top": N.value,
				"mat-dialog--transparent-scrim": !I(d).scrim
			}]],
			style: te.value,
			"aria-labelledby": e.$attrs["aria-labelledby"] ?? (D.value ? T : void 0),
			tabindex: "-1",
			onCancel: ce,
			onClick: ue,
			onKeydown: le
		}), {
			default: V(() => [I(d).fullScreen ? (w(), o(t, { key: 0 }, [s("header", Ki, [
				u(Ht, {
					class: "mat-dialog__close",
					icon: "close",
					label: I(d).closeLabel,
					size: "small",
					variant: "standard",
					onClick: Y
				}, null, 8, ["label"]),
				D.value ? (w(), o("h2", {
					key: 0,
					id: T,
					class: "mat-dialog__title mat-sys-typescale-title-large"
				}, [I(d).title === void 0 ? j(e.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(d).title), 1)], 64))])) : a("", !0),
				e.$slots.actions ? (w(), o("div", qi, [j(e.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			]), k.value ? (w(), o("div", Ji, [I(d).content === void 0 ? j(e.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(d).content), 1)], 64))])) : a("", !0)], 64)) : (w(), o(t, { key: 1 }, [
				A.value ? (w(), i(Fe, {
					key: 0,
					as: "div",
					class: "mat-dialog__icon",
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(d).icon === void 0 ? j(e.$slots, "icon", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(d).icon), 1)], 64))]),
					_: 3
				})) : a("", !0),
				D.value ? (w(), o("h2", {
					key: 1,
					id: T,
					class: "mat-dialog__title mat-sys-typescale-headline-small"
				}, [I(d).title === void 0 ? j(e.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(d).title), 1)], 64))])) : a("", !0),
				k.value ? (w(), o("div", Yi, [I(d).content === void 0 ? j(e.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(d).content), 1)], 64))])) : a("", !0),
				e.$slots.actions ? (w(), o("div", Xi, [j(e.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			], 64))]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-933d18ee"]]), Qi = ["aria-label"], $i = {
	key: 1,
	class: "mat-sheet__header"
}, ea = {
	key: 1,
	class: "mat-sheet__header-actions"
}, ta = {
	key: 2,
	class: "mat-sheet__content mat-sys-typescale-body-medium"
}, na = {
	key: 3,
	class: "mat-sheet__footer"
}, ra = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let d = e, f = c, p = ee(), m = R(), _ = O(null), v = O(null), y = O(!1), x = O("closed"), C = O(null), T = O(typeof window > "u" ? 0 : window.innerWidth), E = O(0), D = O(null), k = O(!1), A = `${L().replace(/[^\w-]/g, "-")}-title`, M = r(() => v.value?.root ?? v.value?.$el ?? null), N = r(() => d.variant === "auto" ? T.value < qe(d.breakpoint, {
			positive: !0,
			fallback: 840
		}) ? "modal" : "standard" : d.variant), P = r(() => N.value === "modal"), I = r(() => P.value && zi.value.at(-1) === M.value), B = r(() => !!m.activator), H = r(() => d.title !== void 0 || !!m.title), U = r(() => d.content !== void 0 || !!m.default), ne = r(() => d.closable), W = r(() => d.expanded ? P.value ? d.expandedDragHandleLabel : d.collapseDragHandleLabel : d.dragHandleLabel), G = r(() => H.value || ne.value || !!m.header || !!m.actions), K = r(() => P.value ? "dialog" : "aside"), re = r(() => {
			if (d.width !== void 0) return Ve(d.width, {
				property: "inline-size",
				positive: !0
			});
		}), q = r(() => {
			if (re.value) return { "--mat-sheet-preferred-width": re.value };
		}), J = r(() => ({
			"--mat-sheet-drag-offset": `${E.value}px`,
			...D.value === null ? {} : { "--mat-sheet-drag-size": `${D.value}px` }
		})), Y = r(() => d.direction === "side" && P.value && d.position === "end" ? { "--mat-sheet-modal-end-offset": `${-Bi.value}px` } : {}), X = r(() => [
			p.style,
			q.value,
			J.value,
			Y.value
		]), ie = !1, Z, ae = null, oe = !1, se = null, ce = 0, le = 0, ue = 0, Q = 0, de = !1;
		function fe() {
			Z !== void 0 && (window.clearTimeout(Z), Z = void 0);
		}
		function pe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function me(e, t) {
			if (fe(), pe()) {
				t();
				return;
			}
			Z = window.setTimeout(() => {
				Z = void 0, t();
			}, e);
		}
		function he() {
			let e = _.value ? [..._.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function ge() {
			if (typeof d.attach == "string") try {
				return document.querySelector(d.attach);
			} catch {
				return null;
			}
			return d.attach instanceof HTMLElement && d.attach.ownerDocument === document ? d.attach : null;
		}
		function _e() {
			f("update:modelValue", !1);
		}
		function ve() {
			if (de) {
				de = !1;
				return;
			}
			if (d.expanded) {
				if (P.value) {
					_e();
					return;
				}
				f("update:expanded", !1);
				return;
			}
			f("update:expanded", !0);
		}
		function ye(e) {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), ve());
		}
		function be() {
			console.warn(`${d.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`);
		}
		function xe() {
			!P.value || H.value || p["aria-label"] || p["aria-labelledby"] || console.warn(`${d.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
		}
		function Se() {
			console.warn(`${d.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function Ce() {
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
		function we() {
			let e = M.value;
			e instanceof HTMLDialogElement && (e.open || e.showModal(), Wi(e), Ce());
		}
		async function Te() {
			if (fe(), y.value) {
				x.value = "opening", me(400, () => {
					x.value = "open", f("opened");
				});
				return;
			}
			let e = B.value ? he() : null;
			if (B.value && !e) {
				be(), _e();
				return;
			}
			if (P.value) {
				let t = ge();
				if (!t) {
					Se(), _e();
					return;
				}
				C.value = t, ae = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			}
			oe = P.value, y.value = !0, x.value = "opening", xe(), await g(), !(!d.modelValue || !M.value) && (P.value && we(), me(400, () => {
				x.value = "open", f("opened");
			}));
		}
		function Ee() {
			oe && ae?.isConnected && ae.focus({ preventScroll: !0 }), ae = null, oe = !1;
		}
		function De() {
			let e = M.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), Gi(e)), y.value = !1, x.value = "closed", E.value = 0, D.value = null, g(() => {
				Ee(), f("closed");
			});
		}
		function Oe() {
			y.value && (x.value = "closing", me(200, De));
		}
		function ke(e) {
			e.preventDefault(), _e();
		}
		function Ae(e) {
			e.key === "Escape" && (e.preventDefault(), _e());
		}
		function je(e) {
			if (!P.value || !d.closeOnBack || e.target !== M.value) return;
			let t = M.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && _e();
		}
		function Me(e) {
			if (e.pointerId === se) {
				if (d.direction === "bottom") {
					if (Q = e.clientY - ce, !d.expanded && Q < 0 || d.expanded && Q > 0) {
						E.value = 0, D.value = Math.max(0, le - Q);
						return;
					}
					E.value = Math.max(0, Q), D.value = le;
					return;
				}
				E.value = d.position === "start" ? Math.max(0, ce - e.clientX) : Math.max(0, e.clientX - ce);
			}
		}
		function Ne() {
			se = null, k.value = !1, window.removeEventListener("pointermove", Me), window.removeEventListener("pointerup", $), window.removeEventListener("pointercancel", Pe);
		}
		function $(e) {
			if (e.pointerId !== se) return;
			let t = M.value, n = d.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - ue), i = d.direction === "bottom" ? Math.abs(Q) : E.value, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (de = i >= 4, Ne(), d.direction === "bottom" && o) {
				if (!d.expanded && Q < 0) {
					E.value = 0, D.value = null, f("update:expanded", !0);
					return;
				}
				if (d.expanded && Q > 0) {
					E.value = 0, D.value = null, f("update:expanded", !1);
					return;
				}
				if (!d.expanded && Q > 0) {
					D.value = null, _e();
					return;
				}
			}
			if (d.direction === "side" && o) {
				_e();
				return;
			}
			E.value = 0, D.value = null;
		}
		function Pe() {
			Ne(), E.value = 0, D.value = null;
		}
		function Fe(e) {
			!d.draggable || e.button !== 0 || se !== null || (se = e.pointerId, ce = d.direction === "bottom" ? e.clientY : e.clientX, le = d.direction === "bottom" ? M.value?.getBoundingClientRect().height ?? 0 : M.value?.getBoundingClientRect().width ?? 0, ue = performance.now(), Q = 0, D.value = d.direction === "bottom" ? le : null, k.value = !0, window.addEventListener("pointermove", Me), window.addEventListener("pointerup", $), window.addEventListener("pointercancel", Pe));
		}
		function Ie(e) {
			d.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Fe(e);
		}
		function Le() {
			T.value = window.innerWidth;
		}
		async function Re(e, t) {
			if (!y.value || !d.modelValue || e === t) return;
			fe();
			let n = M.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), Gi(n), Ee()), e === "modal") {
				let e = ge();
				if (!e) {
					Se(), _e();
					return;
				}
				C.value = e, ae = document.activeElement instanceof HTMLElement ? document.activeElement : null, oe = !0, xe();
			}
			x.value = "open", await g(), e === "modal" && d.modelValue && we();
		}
		return S(() => {
			ie = !0, Le(), window.addEventListener("resize", Le), d.modelValue && Te();
		}), b(() => {
			ie = !1, fe(), Ne(), window.removeEventListener("resize", Le);
			let e = M.value;
			e instanceof HTMLDialogElement && (Gi(e), e.open && e.close());
		}), z(() => d.modelValue, (e) => {
			ie && (e ? Te() : Oe());
		}), z(N, Re), z(() => d.attach, () => {
			d.modelValue && y.value && P.value && console.warn(`${d.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), z(() => d.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${d.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, c) => (w(), o(t, null, [B.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: _,
			class: "mat-sheet__activator"
		}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), y.value ? (w(), i(n, {
			key: 1,
			to: C.value ?? "body",
			disabled: !P.value
		}, [u(Tn, h({
			ref_key: "surface",
			ref: v
		}, r.$attrs, {
			as: K.value,
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
			style: X.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (H.value ? A : void 0),
			tabindex: P.value ? -1 : void 0,
			onCancel: ke,
			onClick: je,
			onKeydown: Ae,
			onPointerdown: Ie
		}), {
			default: V(() => [
				e.direction === "bottom" && e.dragHandle ? (w(), o("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": W.value,
					onClick: ve,
					onKeydown: ye,
					onPointerdown: te(Fe, ["stop"])
				}, [j(r.$slots, "drag-handle", {}, () => [c[0] ||= s("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, Qi)) : a("", !0),
				G.value ? (w(), o("header", $i, [j(r.$slots, "header", {}, () => [
					H.value ? (w(), o("h2", {
						key: 0,
						id: A,
						class: "mat-sheet__title mat-sys-typescale-title-large"
					}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
					r.$slots.actions ? (w(), o("div", ea, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0),
					ne.value ? (w(), i(Ht, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: _e
					}, null, 8, ["label"])) : a("", !0)
				], !0)])) : a("", !0),
				U.value ? (w(), o("div", ta, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0),
				r.$slots.footer ? (w(), o("div", na, [j(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
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
}), [["__scopeId", "data-v-45fed9a1"]]), ia = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Be(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Be(e, {
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
		let n = $("bottomSheet", e), r = t;
		return (e, t) => (w(), i(ra, h({
			...I(n),
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
				fn: V(() => [j(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots["drag-handle"] ? {
				name: "drag-handle",
				fn: V(() => [j(e.$slots, "drag-handle")]),
				key: "1"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: V(() => [j(e.$slots, "header")]),
				key: "2"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: V(() => [j(e.$slots, "title")]),
				key: "3"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: V(() => [j(e.$slots, "default")]),
				key: "4"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: V(() => [j(e.$slots, "actions")]),
				key: "5"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: V(() => [j(e.$slots, "footer")]),
				key: "6"
			} : void 0
		]), 1040));
	}
}), aa = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Be(e, {
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
			validator: (e) => Be(e, {
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
		let n = $("sideSheet", e), r = t;
		return (e, t) => (w(), i(ra, h({
			...I(n),
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
				fn: V(() => [j(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: V(() => [j(e.$slots, "header")]),
				key: "1"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: V(() => [j(e.$slots, "title")]),
				key: "2"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: V(() => [j(e.$slots, "default")]),
				key: "3"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: V(() => [j(e.$slots, "actions")]),
				key: "4"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: V(() => [j(e.$slots, "footer")]),
				key: "5"
			} : void 0
		]), 1040));
	}
}), oa = { class: "mat-container__content" }, sa = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
	name: "MatContainer",
	inheritAttrs: !1
}, {
	__name: "MatContainer",
	props: { fluid: {
		type: Boolean,
		default: !1
	} },
	setup(e) {
		let t = $("container", e);
		return (e, n) => (w(), o("div", h(e.$attrs, { class: ["mat-container", { "mat-container--fluid": I(t).fluid }] }), [s("div", oa, [j(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-79014db2"]]), ca = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-61d08a89"]]), la = ["aria-valuemax", "aria-valuenow"], ua = ["width", "height"], da = { key: 0 }, fa = ["width", "height"], pa = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, ma = ["d"], ha = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, ga = ["d"], _a = ["d", "mask"], va = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, ya = ["d"], ba = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, xa = ["d"], Sa = ["d"], Ca = {
	key: 1,
	class: "mat-loader__linear-stop"
}, wa = ["viewBox"], Ta = { class: "mat-loader__circular-linear-rotate" }, Ea = { class: "mat-loader__circular-rotate-arc" }, Da = [
	"cx",
	"cy",
	"r"
], Oa = ["d"], ka = 4, Aa = 3, ja = 40, Ma = 1.6, Na = 15, Pa = 4, Fa = .001, Ia = 100, La = 300, Ra = 900, za = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Be(e, {
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
			validator: Q
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
				let t = (e - o) / ja * Math.PI * 2, n = a - Math.sin(t - i) * r;
				l.push(`L ${c(e)} ${c(n)}`);
			}
			let u = (s - o) / ja * Math.PI * 2, d = a - Math.sin(u - i) * r;
			return l.push(`L ${c(s)} ${c(d)}`), l.join(" ");
		}
		function d(e, t, n, r) {
			let i = Math.max(1, Math.round(Math.PI * 2 * t / Na)), a = i * 12, o = [];
			for (let s = 0; s <= a; s += 1) {
				let l = s / a, u = l * Math.PI * 2, d = l * Math.PI * 2 * i, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = s === 0 ? "M" : "L";
				o.push(`${h} ${c(p)} ${c(m)}`);
			}
			return o.push("Z"), o.join(" ");
		}
		let f = $("loader", e), { colorStyle: p } = Me(r(() => f.color)), m = O(null), g = O(Ia), _ = O(+(f.shape === "wavy")), y = O(0), x = `mat-loader-linear-mask-${L()}`, C, T, E, D = r(() => i(f.max) ? f.max : 1), k = r(() => qe(f.thickness, {
			positive: !0,
			fallback: 4
		})), A = r(() => f.variant === "circular"), j = r(() => f.shape === "wavy"), M = r(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), D.value);
		}), N = r(() => Number((M.value / D.value * 100).toFixed(3))), P = r(() => k.value + Aa * 2 * _.value), F = r(() => Math.min(100, k.value / g.value * 100)), ee = r(() => {
			let e = g.value - k.value;
			return e <= 0 ? 1 : g.value / e;
		}), R = r(() => N.value === 100 ? 100 : Math.min(100, Math.max(N.value, F.value + Fa))), B = r(() => u(g.value, P.value, k.value, 0, 0)), V = r(() => u(g.value, P.value, k.value, Aa * _.value, y.value)), H = r(() => k.value + 36 + 8 * _.value), te = r(() => H.value / 2), U = r(() => te.value - k.value / 2 - Ma * _.value), ne = r(() => `0 0 ${H.value} ${H.value}`), W = r(() => d(te.value, U.value, Ma * _.value, y.value)), G = r(() => {
			let e = Math.PI * 2 * U.value;
			return (ka + k.value) / e * 100;
		}), K = r(() => Math.min(12, G.value)), re = r(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - N.value - G.value * 2).toFixed(3)), t = Number(Math.min(100, N.value + G.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${c(e)} ${c(100 - e)}`,
				strokeDashoffset: `-${c(t)}`
			};
		}), q = r(() => f.indeterminate ? {} : { strokeDasharray: `${c(N.value === 0 ? Fa : N.value)} 200` }), J = r(() => ({
			...p.value,
			"--mat-loader-circular-gap-progress": c(K.value),
			"--mat-loader-circular-radius": `${U.value}px`,
			"--mat-loader-circular-size": `${H.value}px`,
			"--mat-loader-indicator-gap-size": `${ka}px`,
			"--mat-loader-linear-cap-progress": c(F.value),
			"--mat-loader-linear-path-scale": c(ee.value),
			"--mat-loader-linear-segment-end": c(R.value),
			"--mat-loader-linear-segment-end-position": `${c(R.value)}%`,
			"--mat-loader-linear-size": `${P.value}px`,
			"--mat-loader-progress": `${N.value}`,
			"--mat-loader-stop-indicator-size": `${Pa}px`,
			"--mat-loader-thickness": `${k.value}px`
		}));
		function Y(e) {
			T = void 0;
			let t = E === void 0 ? 0 : Math.min(64, e - E), n = +!!j.value, r = n - _.value;
			if (E = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / La);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (y.value += t / Ra * Math.PI * 2, y.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? T = globalThis.requestAnimationFrame(Y) : E = void 0;
		}
		function X() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!j.value;
				return;
			}
			T === void 0 && (E = void 0, T = globalThis.requestAnimationFrame(Y));
		}
		return z(j, X), z(() => f.waveMotion, X), S(() => {
			X(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (C = new globalThis.ResizeObserver(([e]) => {
				let t = e.contentRect.width;
				t > 0 && (g.value = t);
			}), C.observe(m.value));
		}), b(() => {
			C?.disconnect(), T !== void 0 && globalThis.cancelAnimationFrame?.(T);
		}), (e, n) => (w(), o("div", h(e.$attrs, {
			class: ["mat-loader", [
				`mat-loader--${I(f).variant}`,
				`mat-loader--${I(f).shape}`,
				{
					"mat-loader--indeterminate": I(f).indeterminate,
					"mat-loader--wave-motion": I(f).waveMotion
				}
			]],
			style: J.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": D.value,
			"aria-valuenow": I(f).indeterminate ? void 0 : M.value
		}), [A.value ? (w(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: ne.value,
			"aria-hidden": "true"
		}, [s("g", Ta, [s("g", Ea, [s("circle", {
			class: "mat-loader__circular-track",
			cx: te.value,
			cy: te.value,
			r: U.value,
			pathLength: "100",
			style: v(re.value)
		}, null, 12, Da), s("path", {
			class: "mat-loader__circular-active",
			d: W.value,
			pathLength: "100",
			style: v(q.value)
		}, null, 12, Oa)])])], 8, wa)) : (w(), o("span", {
			key: 0,
			ref_key: "linearElement",
			ref: m,
			class: "mat-loader__linear",
			"aria-hidden": "true"
		}, [
			I(f).indeterminate ? a("", !0) : (w(), o(t, { key: 0 }, [n[0] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--before" }, null, -1), n[1] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--after" }, null, -1)], 64)),
			(w(), o("svg", {
				class: "mat-loader__linear-indicator",
				width: g.value,
				height: P.value
			}, [
				I(f).indeterminate ? (w(), o("defs", da, [s("mask", {
					id: x,
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: g.value,
					height: P.value
				}, [
					n[2] ||= s("rect", {
						width: "100%",
						height: "100%",
						fill: "white"
					}, null, -1),
					s("g", pa, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: V.value,
						pathLength: "100"
					}, null, 8, ma)]),
					s("g", ha, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: V.value,
						pathLength: "100"
					}, null, 8, ga)])
				], 8, fa)])) : a("", !0),
				I(f).indeterminate ? (w(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: B.value,
					pathLength: "100",
					mask: `url(#${x})`
				}, null, 8, _a)) : a("", !0),
				I(f).indeterminate ? (w(), o(t, { key: 2 }, [s("g", va, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: V.value,
					pathLength: "100"
				}, null, 8, ya)]), s("g", ba, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: V.value,
					pathLength: "100"
				}, null, 8, xa)])], 64)) : (w(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: V.value,
					pathLength: "100"
				}, null, 8, Sa))
			], 8, ua)),
			I(f).indeterminate ? a("", !0) : (w(), o("span", Ca))
		], 512))], 16, la));
	}
}), [["__scopeId", "data-v-eb70996c"]]), Ba = Symbol("mat-snackbar-externally-managed"), Va = [], Ha = null;
function Ua() {
	Ha || Va.length === 0 || (Ha = Va.shift(), Ha.activate());
}
function Wa(e) {
	e === Ha || Va.includes(e) || (Va.push(e), Ua());
}
function Ga(e) {
	let t = Va.indexOf(e);
	t !== -1 && Va.splice(t, 1);
}
function Ka(e) {
	Ha === e && (Ha = null, Ua());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var qa = { class: "mat-snackbar__text" }, Ja = {
	key: 0,
	class: "mat-snackbar__controls"
}, Ya = {
	key: 0,
	class: "mat-snackbar__action"
}, Xa = {
	key: 1,
	class: "mat-snackbar__close"
}, Za = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let d = $("snackbar", e), f = c, m = R(), _ = p(ae, Z), v = p(Ye, null), y = p(Ba, !1), x = O(!1), C = O("closed"), T = O(!1), E = r(() => !!m.default || typeof d.text == "string" && d.text.trim().length > 0), D = r(() => !!m.action || typeof d.actionText == "string" && d.actionText.trim().length > 0), k = r(() => !!m.close || d.closable), A = r(() => D.value || k.value), M = O(0), N = r(() => v ? v.snackbarLayer.value : document.body), P = r(() => typeof d.closeLabel == "string" && d.closeLabel.trim().length > 0 ? d.closeLabel : "关闭"), ee = !1, L, B, H = !1, te = null, U = r(() => ({ "--mat-snackbar-toolbar-clearance": `${M.value}px` }));
		function ne() {
			M.value = Tt();
		}
		let W = { activate: Q };
		function G() {
			L !== void 0 && (window.clearTimeout(L), L = void 0);
		}
		function K() {
			B !== void 0 && (window.clearTimeout(B), B = void 0);
		}
		function re() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function q(e, t) {
			if (K(), re()) {
				t();
				return;
			}
			B = window.setTimeout(() => {
				B = void 0, t();
			}, e);
		}
		function J() {
			return Number.isFinite(d.duration) && d.duration >= 0 ? d.duration : 4e3;
		}
		function X() {
			G();
			let e = J();
			e !== 0 && (L = window.setTimeout(() => {
				L = void 0, le();
			}, e));
		}
		function ie() {
			H || (H = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function oe() {
			x.value && (x.value = !1, C.value = "closed", f("closed"), y || Ka(W));
		}
		function se() {
			if (G(), !x.value) {
				y || Ga(W);
				return;
			}
			C.value !== "closing" && (C.value = "closing", q(200, oe));
		}
		function ce() {
			T.value || (T.value = !0, f("update:modelValue", !1));
		}
		function le() {
			ce(), se();
		}
		function ue() {
			!x.value || C.value === "closing" || (le(), f("action"));
		}
		async function Q() {
			if (!ee || !d.modelValue || T.value || !E.value) {
				E.value || (ie(), ce()), y || Ka(W);
				return;
			}
			G(), K(), x.value = !0, C.value = "opening", await g(), !(!ee || !x.value || C.value === "closing") && q(400, () => {
				!x.value || C.value === "closing" || (C.value = "open", X());
			});
		}
		function de() {
			if (T.value || !E.value) {
				E.value || (ie(), le());
				return;
			}
			if (y) {
				Q();
				return;
			}
			if (x.value && C.value === "closing") {
				Q();
				return;
			}
			Wa(W);
		}
		return S(() => {
			ee = !0, v || (te = Et(ne), ne()), d.modelValue && de();
		}), b(() => {
			ee = !1, te?.(), te = null, G(), K(), y || (x.value ? Ka(W) : Ga(W));
		}), z(() => d.modelValue, (e) => {
			if (ee) {
				if (e) {
					T.value = !1, de();
					return;
				}
				T.value = !1, se();
			}
		}), z(E, (e) => {
			if (ee) {
				if (!e) {
					le();
					return;
				}
				H = !1, d.modelValue && !x.value && !T.value && de();
			}
		}), z(() => d.duration, () => {
			C.value === "open" && X();
		}), (e, r) => N.value ? (w(), i(n, {
			key: 0,
			to: N.value
		}, [x.value ? (w(), o("section", h({ key: 0 }, e.$attrs, {
			class: ["mat-snackbar mat-sys-typescale-body-medium", [
				`mat-snackbar--${C.value}`,
				`mat-snackbar--${I(d).position}`,
				{
					"mat-snackbar--app-root": I(v),
					"mat-snackbar--with-trailing": A.value
				}
			]],
			style: U.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [s("div", qa, [e.$slots.default ? j(e.$slots, "default", { key: 0 }, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(I(d).text), 1)], 64))]), A.value ? (w(), o("div", Ja, [D.value ? (w(), o("div", Ya, [e.$slots.action ? j(e.$slots, "action", {
			key: 0,
			action: ue
		}, void 0, !0) : (w(), i(Y, {
			key: 1,
			class: "mat-snackbar__default-action mat-sys-typescale-label-large",
			"use-cursor": I(_).useCursor,
			onClick: ue
		}, {
			default: V(() => [l(F(I(d).actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : a("", !0), k.value ? (w(), o("div", Xa, [e.$slots.close ? j(e.$slots, "close", {
			key: 0,
			close: le
		}, void 0, !0) : (w(), i(Y, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": P.value,
			"use-cursor": I(_).useCursor,
			onClick: le
		}, {
			default: V(() => [u(Fe, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : a("", !0)])) : a("", !0)], 16)) : a("", !0)], 8, ["to"])) : a("", !0);
	}
}), [["__scopeId", "data-v-ace0ff4c"]]), Qa = ["aria-orientation"], $a = { class: "mat-toolbar__surface" }, eo = { class: "mat-toolbar__content" }, to = 200, no = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Be(e, {
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
		let u = $("toolbar", e), f = ee(), m = R(), _ = d(), y = p(Ye, null), x = _?.vnode.props ?? {}, C = Object.prototype.hasOwnProperty.call(x, "attach"), T = O(u.modelValue), E = O(u.modelValue ? "open" : "closed"), D = O(null), k = O(null), A = O({
			blockSize: 0,
			inlineSize: 0
		}), M = r(() => c.includes(u.variant) ? u.variant === "floating" ? "floating-bottom" : u.variant : "docked"), N = r(() => [
			"start",
			"center",
			"end"
		].includes(u.position) ? u.position : "center"), F = r(() => M.value.startsWith("floating")), L = r(() => M.value === "floating-left" || M.value === "floating-right"), B = r(() => M.value === "docked" || M.value === "floating-bottom"), V = r(() => u.app && !!y && !C), H = r(() => {
			if (!u.app) return null;
			if (V.value) return F.value ? y.freeLayer.value : y.edgeLayer.value;
			if (typeof u.attach == "string") try {
				return document.querySelector(u.attach);
			} catch {
				return null;
			}
			return l(u.attach);
		}), te = r(() => {
			let e = Ve(u.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), U = r(() => B.value ? te.value : "0px"), ne = r(() => [f.style, {
			"--mat-toolbar-app-end-inset": `${K.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${K.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": U.value
		}]), W = r(() => ({
			blockSize: `${A.value.blockSize}px`,
			inlineSize: `${A.value.inlineSize}px`
		})), G = r(() => [
			`mat-toolbar--${M.value}`,
			`mat-toolbar--position-${N.value}`,
			{
				"mat-toolbar--app": u.app,
				"mat-toolbar--app-root": V.value,
				"mat-toolbar--vertical": L.value,
				"mat-toolbar--vibrant": u.vibrant
			}
		]), K = P(null), re, q, J = !1, Y = !1, X, ie = !1;
		function Z() {
			X !== void 0 && (window.clearTimeout(X), X = void 0);
		}
		function ae() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function oe(e) {
			if (Z(), ae()) {
				e();
				return;
			}
			X = window.setTimeout(() => {
				X = void 0, e();
			}, to);
		}
		function se() {
			Z(), T.value = !0, E.value = "opening", oe(() => {
				T.value && u.modelValue && (E.value = "open");
			});
		}
		function ce() {
			if (Z(), !T.value) {
				E.value = "closed";
				return;
			}
			E.value = "closing", oe(() => {
				u.modelValue || (T.value = !1, E.value = "closed");
			});
		}
		function le() {
			ie || !m.fab || F.value || (ie = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function ue() {
			let e = D.value?.getBoundingClientRect();
			e && (A.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, re?.update(), K.value?.update());
		}
		function Q() {
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
		async function de() {
			Y && (await g(), ue());
		}
		function fe() {
			q?.disconnect(), q = void 0, J = !1, window.removeEventListener("resize", ue), re?.unregister(), re = void 0, K.value?.unregister(), K.value = null;
		}
		async function pe() {
			if (await g(), Y) {
				if (!T.value || !D.value) {
					fe();
					return;
				}
				J || (J = !0, q = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ue), q?.observe(D.value), window.addEventListener("resize", ue)), V.value ? (re?.unregister(), re = void 0, !F.value && !K.value && (K.value = y.publicContext.registerEdge({
					edge: "bottom",
					element: D.value
				})), F.value && K.value && (K.value.unregister(), K.value = null)) : (K.value?.unregister(), K.value = null, re ||= Ct(D.value, {
					getRect: Q,
					isBottom: () => B.value
				})), k.value && q?.observe(k.value), ue(), le();
			}
		}
		S(() => {
			Y = !0, me(), le(), pe();
		}), b(() => {
			Y = !1, Z(), fe();
		}), z(() => u.modelValue, (e) => {
			if (Y) {
				if (e) {
					se();
					return;
				}
				ce();
			}
		}), z(T, pe), z([
			M,
			N,
			te,
			() => u.app,
			() => u.attach,
			V
		], () => {
			me(), de(), pe();
		});
		function me() {
			u.app && !V.value && !H.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, c) => (w(), o(t, null, [e.placeholder && T.value && (!e.app || H.value) ? (w(), o("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: v(W.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: H.value ?? "body",
			disabled: !e.app
		}, [T.value && (!e.app || H.value) ? (w(), o("div", h({
			key: 0,
			ref_key: "toolbarElement",
			ref: D
		}, r.$attrs, {
			class: ["mat-toolbar", [G.value, `mat-toolbar--${E.value}`]],
			style: ne.value,
			role: "toolbar",
			"aria-orientation": L.value ? "vertical" : void 0
		}), [s("div", $a, [s("div", eo, [j(r.$slots, "default", {}, void 0, !0)])]), F.value && I(m).fab ? (w(), o("div", {
			key: 0,
			ref_key: "fabElement",
			ref: k,
			class: "mat-toolbar__fab"
		}, [j(r.$slots, "fab", {}, void 0, !0)], 512)) : a("", !0)], 16, Qa)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-2273e9aa"]]), ro = Symbol("mat-panes"), io = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], ao = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => io.includes(e)
	},
	setup(e, { emit: t }) {
		let n = $("panes", e), i = t, a = O(null), s = N([]), c = O(null), l = O(null), u = O(null), d = /* @__PURE__ */ new Map(), f, p, m, _, v, y = r(() => c.value ?? x.value), x = r(() => {
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
		function ee(e) {
			return M(e) !== null;
		}
		function L(e) {
			return M(e)?.key === l.value;
		}
		function R(e) {
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
		function B() {
			return { ...y.value };
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
		function te(e, t, n, r, i) {
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : C(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function U(e) {
			let t = M(e);
			if (!t) return null;
			let n = A(t.left.id), r = A(t.right.id);
			return {
				leftWidth: n,
				rightWidth: r,
				totalWidth: n + r
			};
		}
		function ne(e, t) {
			if (!n.resizable || f || t.button !== void 0 && t.button !== 0) return;
			let r = M(e), i = U(e);
			!r || !i || (t.preventDefault(), t.currentTarget?.setPointerCapture?.(t.pointerId), l.value = r.key, f = {
				boundary: r,
				changed: !1,
				metrics: i,
				pointerId: t.pointerId,
				startWeights: B(),
				startX: t.clientX
			});
		}
		function W(e, t) {
			if (!f || f.pointerId !== t.pointerId) return;
			let n = M(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = C(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			c.value = te(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		function G(e, t, n) {
			if (!f || f.pointerId !== t.pointerId) return;
			let r = M(e), i = f.changed, a = c.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				H(a);
				return;
			}
			c.value = null;
		}
		function K(e, t) {
			let r = M(e);
			if (!r || !n.resizable) return;
			let i = {
				ArrowLeft: -1,
				ArrowRight: 1
			}[t.key], a = U(e), o = B(), s = o[r.left.id] + o[r.right.id] || 2, c = a?.totalWidth || 100, l = c * (o[r.left.id] / s), u;
			if (i !== void 0) u = C(l + i * (t.shiftKey ? 64 : 16), 0, c);
			else if (t.key === "Home") u = 0;
			else if (t.key === "End") u = c;
			else if (t.key === "Enter") {
				let e = r.key, t = o[r.left.id];
				t === 0 ? u = c * (d.get(e) ?? .5) : (d.set(e, t / s), u = 0);
			} else return;
			t.preventDefault(), H(te(r.left.id, r.right.id, u, c, o));
		}
		function re(e) {
			return s.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), s.push(e), () => {
				let t = s.indexOf(e);
				t !== -1 && s.splice(t, 1);
			};
		}
		function q() {
			let e = /* @__PURE__ */ new Set();
			s.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function J() {
			let e = {};
			return s.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function Y(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function X() {
			m = void 0;
			let e = J();
			Y(v, e) || (v = e, i("update:widths", e));
		}
		function ie(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(X, e ? 0 : 100);
		}
		function Z() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				ie();
			}), p.disconnect(), a.value && p.observe(a.value), s.forEach((e) => {
				e.element.value && p.observe(e.element.value);
			}));
		}
		function ae(e) {
			return e < 600 ? "compact" : e < 840 ? "medium" : e < 1200 ? "expanded" : e < 1600 ? "large" : "extra-large";
		}
		function oe(e = !1) {
			let t = ae(globalThis.window === void 0 ? 0 : globalThis.window.innerWidth);
			(e || u.value !== t) && (u.value = t, i("update:breakpoint", t));
		}
		function se() {
			oe();
		}
		return T(ro, {
			getHandleAttributes: R,
			getPaneStyle: F,
			hasBoundary: ee,
			handleKeyDown: K,
			handlePointerDown: ne,
			handlePointerMove: W,
			isBoundaryActive: L,
			isHandleVisible: I,
			registerPane: re,
			finishPointerInteraction: G
		}), z(() => s.map((e) => e.id), async () => {
			await g(), q(), Z(), ie();
		}, {
			flush: "post",
			immediate: !0
		}), z(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), S(() => {
			oe(!0), Z(), ie(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", se);
		}), b(() => {
			globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", se), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), _ !== void 0 && globalThis.clearTimeout(_);
		}), (e, t) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-806ebdbf"]]), oo = ["id"], so = {
	key: 0,
	class: "mat-pane__separator"
}, co = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], lo = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = $("pane", e), i = p(ro, null), c = O(null), l = r(() => n.resizeLabel), u, d = r(() => i?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = r(() => !!i?.hasBoundary(n.id)), m = r(() => !!i?.isHandleVisible(n.id)), g = r(() => i?.getHandleAttributes(n.id) ?? {}), v = r(() => !!i?.isBoundaryActive(n.id));
		function y() {
			u?.(), u = void 0, i && (u = i.registerPane({
				element: c,
				id: n.id,
				resizeLabel: l
			}));
		}
		return S(y), z(() => n.id, y), b(() => u?.()), (r, l) => (w(), o(t, null, [s("div", h({
			ref_key: "root",
			ref: c
		}, r.$attrs, {
			id: I(n).id,
			class: "mat-pane",
			style: d.value
		}), [j(r.$slots, "default", {}, void 0, !0)], 16, oo), f.value ? (w(), o("div", so, [m.value ? (w(), o("div", {
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
			onKeydown: l[0] ||= (t) => I(i).handleKeyDown(e.id, t),
			onLostpointercapture: l[1] ||= (t) => I(i).finishPointerInteraction(e.id, t, !1),
			onPointercancel: l[2] ||= (t) => I(i).finishPointerInteraction(e.id, t, !1),
			onPointerdown: l[3] ||= (t) => I(i).handlePointerDown(e.id, t),
			onPointermove: l[4] ||= (t) => I(i).handlePointerMove(e.id, t),
			onPointerup: l[5] ||= (t) => I(i).finishPointerInteraction(e.id, t, !0)
		}, null, 42, co)) : a("", !0)])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-0c564aa6"]]), uo = Symbol("mat-navigation-rail"), fo = ["aria-label"], po = {
	key: 0,
	class: "mat-navigation-rail__header"
}, mo = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, ho = {
	key: 1,
	class: "mat-navigation-rail__content"
}, go = {
	key: 2,
	class: "mat-navigation-rail__end"
}, _o = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Be(e, { property: "inline-size" })
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
			validator: (e) => Be(e, {
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
		let f = $("navigationRail", e), m = c, y = p(ae, Z), x = d(), C = p(Ye, null), E = x?.vnode.props ?? {}, D = Object.prototype.hasOwnProperty.call(E, "attach"), k = r(() => f.orientation === "horizontal"), A = r(() => f.expanded), M = r(() => !k.value && f.layout === "modal"), N = r(() => !k.value && f.hideOnCollapse && !f.expanded), F = r(() => f.app && !!C && !D), ee = r(() => {
			if (!f.app) return null;
			if (F.value) return C.edgeLayer.value;
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return l(f.attach);
		}), L = r(() => f.expanded ? f.closeIcon : f.openIcon), R = r(() => f.expanded ? f.closeLabel : f.openLabel), B = r(() => ({
			"mat-navigation-rail-host--vertical": !k.value,
			"mat-navigation-rail-host--horizontal": k.value,
			"mat-navigation-rail-host--expanded": A.value,
			"mat-navigation-rail-host--collapsed": !f.expanded,
			[`mat-navigation-rail-host--${f.position}`]: !0,
			"mat-navigation-rail-host--modal": M.value,
			"mat-navigation-rail-host--hidden": N.value,
			"mat-navigation-rail-host--app": f.app,
			"mat-navigation-rail-host--app-root": F.value
		})), H = r(() => ({
			"mat-navigation-rail--expanded": A.value,
			"mat-navigation-rail--collapsed": !f.expanded,
			"mat-navigation-rail--bar": k.value,
			"mat-navigation-rail--modal": M.value && f.expanded,
			"mat-navigation-rail--hidden": N.value,
			"mat-navigation-rail--app": f.app,
			"mat-navigation-rail--app-root": F.value
		})), te = r(() => {
			let e = Ve(f.width, { property: "inline-size" });
			if (e !== void 0) return { "--mat-navigation-rail-expanded-width": e };
		}), U = r(() => {
			if (!f.app || F.value) return "0px";
			let e = Ve(f.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), ne = r(() => [te.value, {
			"--mat-navigation-rail-app-end-inset": `${q.value?.insets.end ?? 0}px`,
			"--mat-navigation-rail-app-start-inset": `${q.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-bottom-placeholder": U.value
		}]), W = O(null), G = O(null), K = O({
			blockSize: 0,
			inlineSize: 0
		}), re = r(() => ({
			blockSize: `${K.value.blockSize}px`,
			inlineSize: `${K.value.inlineSize}px`
		})), q = P(null), J;
		function X() {
			let e = W.value?.getBoundingClientRect();
			e && (K.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, q.value?.update());
		}
		async function ie() {
			J?.disconnect(), J = void 0, q.value?.unregister(), q.value = null, await g(), !(!f.app || !W.value) && (J = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(X), J?.observe(W.value), F.value && (q.value = C.publicContext.registerEdge({
				edge: k.value ? "bottom" : f.position,
				element: W.value
			})), X());
		}
		function oe() {
			f.app && !F.value && !ee.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		function se(e) {
			return e !== void 0 && Object.is(f.modelValue, e);
		}
		function ce(e) {
			e === void 0 || Object.is(f.modelValue, e) || m("update:modelValue", e);
		}
		function le() {
			m("update:expanded", !f.expanded);
		}
		function ue() {
			m("update:expanded", !1);
		}
		function Q(e) {
			e.key === "Escape" && M.value && f.expanded && ue();
		}
		return T(uo, {
			expanded: A,
			isSelected: se,
			orientation: r(() => f.orientation),
			position: r(() => f.position),
			requestSelection: ce,
			useCursor: y.useCursor
		}), S(() => {
			window.addEventListener("keydown", Q), oe(), ie();
		}), b(() => {
			window.removeEventListener("keydown", Q), J?.disconnect(), q.value?.unregister();
		}), z([
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
			oe(), ie();
		}), (e, r) => (w(), o(t, null, [I(f).app && ee.value && I(f).placeholder ? (w(), o("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(re.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: ee.value ?? "body",
			disabled: !I(f).app
		}, [!I(f).app || ee.value ? (w(), o("div", {
			key: 0,
			ref_key: "hostElement",
			ref: W,
			class: _(["mat-navigation-rail-host", B.value]),
			style: v(ne.value)
		}, [M.value && I(f).expanded ? (w(), o("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": I(f).closeLabel,
			onClick: ue
		}, null, 8, fo)) : a("", !0), s("nav", h({
			ref_key: "railElement",
			ref: G
		}, e.$attrs, { class: ["mat-navigation-rail", H.value] }), [
			k.value ? a("", !0) : (w(), o("div", po, [
				N.value ? a("", !0) : j(e.$slots, "header", {
					key: 0,
					expanded: I(f).expanded
				}, void 0, !0),
				I(f).collapsible ? (w(), i(Y, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": I(f).expanded,
					"aria-label": R.value,
					"focus-ring": !1,
					"use-cursor": I(y).useCursor,
					onClick: le
				}, {
					default: V(() => [u(Fe, {
						icon: L.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : a("", !0),
				e.$slots.fab && !N.value ? (w(), o("div", mo, [j(e.$slots, "fab", { expanded: I(f).expanded }, void 0, !0)])) : a("", !0)
			])),
			N.value ? a("", !0) : (w(), o("div", ho, [s("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${I(f).alignment}`]) }, [j(e.$slots, "default", {
				expanded: A.value,
				orientation: I(f).orientation
			}, void 0, !0)], 2)])),
			e.$slots.end && !N.value && !k.value ? (w(), o("div", go, [j(e.$slots, "end", { expanded: I(f).expanded }, void 0, !0)])) : a("", !0)
		], 16)], 6)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-358f24c6"]]), vo = { class: "mat-navigation-rail-item__indicator" }, yo = { class: "mat-navigation-rail-item__icon-wrap" }, bo = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({
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
		let n = $("navigationRailItem", e), c = t, l = R(), u = p(ae, Z), d = p(uo, null), f = r(() => d?.expanded.value ?? !1), m = r(() => d?.orientation.value === "horizontal"), g = r(() => d?.position.value ?? "start"), v = r(() => f.value), y = r(() => d?.isSelected(n.value) ?? !1), b = r(() => !!(n.icon || l.icon)), x = r(() => Bt("label", f.value && !m.value ? "large" : "medium")), S = r(() => ({
			"mat-navigation-rail-item--selected": y.value,
			"mat-navigation-rail-item--disabled": n.disabled,
			"mat-navigation-rail-item--expanded": f.value,
			"mat-navigation-rail-item--collapsed": !f.value,
			"mat-navigation-rail-item--horizontal": m.value,
			[`mat-navigation-rail-item--${g.value}`]: !0
		}));
		function C(e) {
			n.disabled || d?.requestSelection(n.value), c("click", e);
		}
		return (e, t) => (w(), i(Y, h(e.$attrs, {
			class: ["mat-navigation-rail-item", S.value],
			"aria-current": y.value ? "page" : void 0,
			disabled: I(n).disabled,
			"focus-ring": !1,
			href: I(n).href,
			"use-cursor": I(u).useCursor,
			onClick: C
		}), {
			default: V(() => [s("span", vo, [s("span", yo, [I(l).icon ? j(e.$slots, "icon", {
				key: 0,
				selected: y.value
			}, void 0, !0) : b.value ? (w(), i(Fe, {
				key: 1,
				fill: +!!y.value,
				icon: I(n).icon,
				class: "mat-navigation-rail-item__icon",
				"aria-hidden": "true"
			}, null, 8, ["fill", "icon"])) : a("", !0)]), v.value ? (w(), o("span", {
				key: 0,
				class: _(["mat-navigation-rail-item__label", x.value])
			}, [j(e.$slots, "default", {}, void 0, !0)], 2)) : a("", !0)]), v.value ? a("", !0) : (w(), o("span", {
				key: 0,
				class: _(["mat-navigation-rail-item__label", x.value])
			}, [j(e.$slots, "default", {}, void 0, !0)], 2))]),
			_: 3
		}, 16, [
			"class",
			"aria-current",
			"disabled",
			"href",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-d7be8ffe"]]), xo = /* @__PURE__ */ new WeakMap();
function So(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function Co(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = So(t.value), i = new IntersectionObserver((t, r) => {
		let i = xo.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), xo.delete(e));
	}, r);
	xo.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function wo(e) {
	let t = xo.get(e);
	t && (t.observer.unobserve(e), xo.delete(e));
}
var To = {
	mounted: Co,
	updated(e, t) {
		xo.has(e) && (wo(e), Co(e, t));
	},
	unmounted: wo
}, Eo = Z, Do = null;
function Oo(e, t) {
	Eo = e, Do = t;
}
function ko() {
	return Eo;
}
function Ao() {
	return Do;
}
//#endregion
//#region src/theme.js
var jo = "#20a6fc", Mo = "(prefers-color-scheme: dark)";
function No(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function Po(e) {
	if (!ye.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function Fo(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function Io(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function Lo(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function Ro(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? jo, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	No(t), Lo(n), Po(r), Fo(i), Io(a);
	let o = O(t), s = O(Te(n)), c = O(r), l = O(i), u = O("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(Mo)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = Ee({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(be).forEach(([t, n]) => {
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
		No(e), o.value = e, y(), g();
	}
	function x(e) {
		Lo(e), s.value = Te(e), g();
	}
	function S(e) {
		Po(e), c.value = e, g();
	}
	function C(e) {
		Fo(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(be).forEach((e) => {
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
var zo = [
	[
		"MatAppRoot",
		"mat-app-root",
		Kt
	],
	[
		"MatAppBar",
		"mat-app-bar",
		an
	],
	[
		"MatSearch",
		"mat-search",
		ln
	],
	[
		"MatBtn",
		"mat-btn",
		Ht
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		fn
	],
	[
		"MatFab",
		"mat-fab",
		yn
	],
	[
		"MatIcon",
		"mat-icon",
		Fe
	],
	[
		"MatImage",
		"mat-image",
		xn
	],
	[
		"MatText",
		"mat-text",
		Sn
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		wn
	],
	[
		"MatCard",
		"mat-card",
		Mn
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		Pn
	],
	[
		"MatCardContent",
		"mat-card-content",
		In
	],
	[
		"MatCardActions",
		"mat-card-actions",
		Rn
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		Dn
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		jn
	],
	[
		"MatCardMedia",
		"mat-card-media",
		kn
	],
	[
		"MatList",
		"mat-list",
		Kn
	],
	[
		"MatListGroup",
		"mat-list-group",
		ar
	],
	[
		"MatListItem",
		"mat-list-item",
		nr
	],
	[
		"MatDivider",
		"mat-divider",
		fr
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		vr
	],
	[
		"MatChip",
		"mat-chip",
		Cr
	],
	[
		"MatChipSet",
		"mat-chip-set",
		Or
	],
	[
		"MatRadio",
		"mat-radio",
		Ar
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		Nr
	],
	[
		"MatSwitch",
		"mat-switch",
		Pr
	],
	[
		"MatSlider",
		"mat-slider",
		li
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		pi
	],
	[
		"MatTextField",
		"mat-text-field",
		Ai
	],
	[
		"MatTextarea",
		"mat-textarea",
		ji
	],
	[
		"MatInputBase",
		"mat-input-base",
		on
	],
	[
		"MatMenu",
		"mat-menu",
		Ni
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		Fi
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		Ri
	],
	[
		"MatDialog",
		"mat-dialog",
		Zi
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		ia
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		aa
	],
	[
		"MatHover",
		"mat-hover",
		Je
	],
	[
		"MatContainer",
		"mat-container",
		sa
	],
	[
		"MatSpacer",
		"mat-spacer",
		ca
	],
	[
		"MatScrollArea",
		"mat-scroll-area",
		Er
	],
	[
		"MatLoader",
		"mat-loader",
		za
	],
	[
		"MatTooltip",
		"mat-tooltip",
		At
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		Za
	],
	[
		"MatToolbar",
		"mat-toolbar",
		no
	],
	[
		"MatPanes",
		"mat-panes",
		ao
	],
	[
		"MatPane",
		"mat-pane",
		lo
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		_o
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		bo
	]
], Bo = new Map(zo.map(([e, , t]) => [oe(e), t]));
function Vo(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function Ho(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? Z.iconClass;
}
function Uo(e, t) {
	let n = e[t];
	if (n === void 0) return ie[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function Wo(e) {
	if (e === void 0) return ie;
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi defaults.tooltip 必须是对象");
	return Object.freeze({
		openDelay: Uo(e, "openDelay"),
		skipDelayDuration: Uo(e, "skipDelayDuration")
	});
}
function Go(e) {
	let t = Object.keys(e.props ?? {}), n = new Set(Object.keys(e.emits ?? {}).filter((e) => e.startsWith("update:")).map((e) => e.slice(7))), r = new Set(t.filter((e) => !n.has(e)));
	return e.name === "MatTooltip" && r.add("skipDelayDuration"), r;
}
function Ko(e) {
	let t = e.defaults;
	if (t === void 0) return Object.freeze({ tooltip: ie });
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi defaults 必须是对象");
	let n = { tooltip: Wo(t.tooltip) };
	return Object.entries(t).forEach(([e, t]) => {
		if (e === "tooltip") return;
		let r = Bo.get(e);
		if (!r) throw TypeError(`createMatUi defaults 未知组件键 ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError(`createMatUi defaults.${e} 必须是对象`);
		let i = Go(r), a = {};
		Object.entries(t).forEach(([t, n]) => {
			if (!i.has(t)) throw TypeError(`createMatUi defaults.${e}.${t} 不是可配置属性`);
			a[t] = n;
		}), n[e] = Object.freeze(a);
	}), Object.freeze(n);
}
function qo(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: Ho(e),
		useCursor: Vo(e, "useCursor"),
		defaults: Ko(e)
	}), n = Ro(e.theme);
	return {
		theme: n,
		install(e) {
			zo.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r);
			}), e.directive("intersection", To), e.provide(ae, t), e.provide(ke, n), Oo(t, n);
		}
	};
}
function Jo() {
	let e = p(ke, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mde-vue 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var Yo = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, Xo = /*#__PURE__*/ J(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		T(ae, ko());
		let s = Ao();
		s && T(ke, s);
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
		return (n, r) => (w(), i(Zi, h({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: V(() => [u(ca), (w(!0), o(t, null, A(e.options.actions, (t, n) => (w(), i(Ht, {
				key: n,
				color: t.color,
				disabled: t.disabled || p.value && n === e.options.actions.length - 1 && g.value,
				variant: t.variant,
				onClick: (e) => v(t, n)
			}, {
				default: V(() => [l(F(t.text), 1)]),
				_: 2
			}, 1032, [
				"color",
				"disabled",
				"variant",
				"onClick"
			]))), 128))]),
			default: V(() => [p.value ? (w(), o(t, { key: 0 }, [e.options.content ? (w(), o("p", Yo, F(e.options.content), 1)) : a("", !0), u(Ai, {
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
}), [["__scopeId", "data-v-217b4d5a"]]), Zo = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], Qo = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], $o = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function es(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function ts() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function ns(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function rs(e) {
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
function is(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !Zo.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !Q(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function as(e) {
	if (ns(e), Qo.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), $o.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !Q(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !es(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(is),
		attach: rs(e.attach)
	};
	return [
		...Qo,
		...$o,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function os(e, t) {
	try {
		ts();
		let n = as(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				k(f(Xo, {
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
function ss(e = {}) {
	return os(e, void 0);
}
function cs(e = {}) {
	try {
		if (ns(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return os({
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
function ls(e = {}) {
	try {
		ns(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return os({
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
function us(e = {}) {
	try {
		ns(e);
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
		return os({
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
var ds = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		T(ae, ko()), T(Ba, !0);
		let n = Ao();
		n && T(ke, n);
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
		return (e, t) => (w(), i(Za, h({
			modelValue: a.value,
			"onUpdate:modelValue": t[0] ||= (e) => a.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), fs = [
	"left",
	"center",
	"right"
], ps = null;
function ms() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function hs(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function gs(e) {
	if (hs(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !fs.includes(e.position)) throw TypeError("snackbar position 无效");
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
function _s() {
	return ps?.isConnected ? ps : (ps = document.createElement("div"), ps.dataset.matSnackbarHost = "", document.body.append(ps), ps);
}
function vs() {
	!ps || ps.childNodes.length > 0 || (ps.remove(), ps = null);
}
function ys(e) {
	try {
		ms();
		let t = gs(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = ps;
				t && k(null, t), e(), Ka(i), vs();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = ps;
				t && k(null, t), n(e), Ka(i), vs();
			}
			i = { activate() {
				try {
					let e = _s();
					k(f(ds, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, Wa(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var bs = ys;
//#endregion
export { To as Intersection, an as MatAppBar, Kt as MatAppRoot, ia as MatBottomSheet, Ht as MatBtn, fn as MatBtnGroup, Mn as MatCard, Pn as MatCardActionArea, Rn as MatCardActions, In as MatCardContent, Dn as MatCardHeadline, kn as MatCardMedia, jn as MatCardSubhead, vr as MatCheckbox, Cr as MatChip, Or as MatChipSet, sa as MatContainer, Zi as MatDialog, fr as MatDivider, yn as MatFab, Je as MatHover, Fe as MatIcon, xn as MatImage, on as MatInputBase, Kn as MatList, ar as MatListGroup, nr as MatListItem, za as MatLoader, Ni as MatMenu, Fi as MatMenuGroup, Ri as MatMenuItem, _o as MatNavigationRail, bo as MatNavigationRailItem, lo as MatPane, ao as MatPanes, Ar as MatRadio, Nr as MatRadioGroup, pi as MatRangeSlider, Er as MatScrollArea, ln as MatSearch, aa as MatSideSheet, li as MatSlider, Za as MatSnackbar, ca as MatSpacer, wn as MatSplitBtn, Pr as MatSwitch, Sn as MatText, Ai as MatTextField, ji as MatTextarea, no as MatToolbar, At as MatTooltip, cs as alert, ls as confirm, qo as createMatUi, ss as dialog, us as prompt, ys as snackbar, bs as toast, Xe as useMatApp, $ as useMatProps, Jo as useMatTheme };
