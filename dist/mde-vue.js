import { Comment as e, Fragment as t, Teleport as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, getCurrentInstance as d, h as f, inject as p, isVNode as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onActivated as y, onBeforeUnmount as b, onDeactivated as x, onMounted as S, onUpdated as C, openBlock as w, provide as T, reactive as E, readonly as D, ref as O, render as k, renderList as A, renderSlot as j, resolveDynamicComponent as M, shallowReactive as N, shallowRef as P, toDisplayString as F, unref as I, useAttrs as ee, useId as L, useSlots as R, watch as z, watchEffect as B, withCtx as V, withKeys as H, withModifiers as U } from "vue";
import { Hct as W, SchemeExpressive as G, SchemeNeutral as K, SchemeTonalSpot as q, SchemeVibrant as J, argbFromHex as Y, hexFromArgb as te } from "@material/material-color-utilities";
//#region \0plugin-vue:export-helper
var X = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ne = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-65f61425"]]), re = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		return (t, r) => (w(), i(ne, h(t.$attrs, {
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
}), [["__scopeId", "data-v-8ed37891"]]), ie = Object.freeze({
	openDelay: 0,
	closeDelay: 600,
	skipDelayDuration: 0
}), Z = Object.freeze({
	iconClass: "material-symbols-outlined",
	useCursor: !1,
	defaults: Object.freeze({ tooltip: ie })
}), Q = Symbol("mde-vue-options");
function ae(e) {
	return e.replace(/^Mat/, "").replace(/^./, (e) => e.toLowerCase());
}
//#endregion
//#region src/components/button-props.js
var oe = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], se = ["round", "square"], ce = [
	"button",
	"submit",
	"reset"
], le = [
	"primary",
	"secondary",
	"tertiary",
	"error"
], ue = [
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error-container",
	"surface",
	"surface-dim",
	"surface-bright",
	"surface-variant",
	"surface-container-lowest",
	"surface-container-low",
	"surface-container",
	"surface-container-high",
	"surface-container-highest"
], de = {
	"primary-container": "on-primary-container",
	"secondary-container": "on-secondary-container",
	"tertiary-container": "on-tertiary-container",
	"error-container": "on-error-container",
	surface: "on-surface",
	"surface-dim": "on-surface",
	"surface-bright": "on-surface",
	"surface-variant": "on-surface-variant",
	"surface-container-lowest": "on-surface",
	"surface-container-low": "on-surface",
	"surface-container": "on-surface",
	"surface-container-high": "on-surface",
	"surface-container-highest": "on-surface"
}, fe = [
	"on-primary",
	"on-secondary",
	"on-tertiary",
	"on-error",
	"on-primary-container",
	"on-secondary-container",
	"on-tertiary-container",
	"on-error-container",
	"on-surface",
	"on-surface-variant"
];
function pe(e) {
	return typeof e == "string" && fe.includes(e);
}
function me(e) {
	return e === void 0 || le.includes(e) || ue.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var he = Object.freeze({
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
}), ge = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function _e(e) {
	return typeof e == "string" && (Object.hasOwn(he, e) || ge.test(e));
}
function ve(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function ye(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function be(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function xe(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function Se(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var Ce = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], we = {
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
}, Te = {
	"tonal-spot": q,
	neutral: K,
	vibrant: J,
	expressive: G
}, Ee = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], De = 64, Oe = /* @__PURE__ */ new Map();
function ke(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function Ae({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = Te[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(W.fromInt(Y(ke(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function je(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, te(e[t])])));
}
function Me(e, t = "tonal-spot", n = 0) {
	let r = ke(e), i = `${r}|${t}|${n}|2025|phone`, a = Oe.get(i);
	if (a) return Oe.delete(i), Oe.set(i, a), a;
	let o = Object.freeze({
		light: je(Ae({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), Ee),
		dark: je(Ae({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), Ee)
	});
	if (Oe.set(i, o), Oe.size > De) {
		let e = Oe.keys().next().value;
		Oe.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var Ne = Symbol("mde-vue-theme"), Pe = "tonal-spot", Fe = 0;
function Ie(e) {
	let t = p(Ne, null), n = r(() => I(e) !== void 0);
	return {
		colorStyle: r(() => {
			let n = I(e);
			if (!n || !me(n) && !pe(n)) return {};
			if (le.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			if (ue.includes(n)) {
				let e = de[n];
				return {
					"--mat-accent-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-color": `var(--mat-sys-color-${e})`,
					"--mat-accent-container-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-container-color": `var(--mat-sys-color-${e})`
				};
			}
			if (pe(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-${n})`
			};
			let r = Me(n, t?.schemeVariant.value ?? Pe, t?.contrastLevel.value ?? Fe);
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
var Le = Object.freeze({});
function $(e, t) {
	let n = d();
	if (!n) throw Error("useMatProps() 必须在组件 setup 中调用");
	let i = p(Q, Z).defaults?.[e] ?? Le, a = [.../* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])], o = {};
	return a.forEach((e) => {
		o[e] = r(() => {
			let r = n.vnode.props ?? Le;
			return e in r && r[e] !== void 0 ? t[e] : i[e] ?? t[e];
		});
	}), E(o);
}
//#endregion
//#region src/components/mat-icon/MatIcon.vue
var Re = ["src"], ze = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: _e
		},
		fill: {
			type: Number,
			default: 0,
			validator: ye
		},
		weight: {
			type: Number,
			default: 400,
			validator: be
		},
		grade: {
			type: Number,
			default: 0,
			validator: xe
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: Se
		},
		color: {
			type: String,
			default: void 0,
			validator: me
		},
		fontColor: {
			type: String,
			default: void 0
		},
		as: {
			type: String,
			default: "i",
			validator: ve
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = $("icon", e), a = p(Q, Z), { colorStyle: s, hasExplicitColor: c } = Ie(r(() => n.color)), u = r(() => n.iconClass ?? a.iconClass), d = r(() => n.icon !== void 0), f = r(() => he[n.size]?.fontSize ?? n.size), m = r(() => n.opticalSize ?? he[n.size]?.opticalSize ?? 24), g = r(() => ({
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
			}, null, 8, Re))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-bd2263c4"]]), Be = /^-?\d+(\.\d+)?$/;
function Ve(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : NaN;
	if (typeof e == "string") {
		let t = e.trim();
		return t && Be.test(t) ? Number(t) : NaN;
	}
	return NaN;
}
function He(e, { positive: t = !1, max: n } = {}) {
	let r = Ve(e);
	return !Number.isFinite(r) || (t ? r <= 0 : r < 0) ? !1 : n === void 0 || r <= n;
}
function Ue(e, t) {
	if (typeof e != "string") return !1;
	let n = e.trim();
	return !n || /[;{}]/.test(n) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports(t, n);
}
function We(e, { property: t, positive: n = !1, max: r, allowUndefined: i = !0, allowNegative: a = !1 } = {}) {
	if (e === void 0) return i;
	if (typeof e == "number" || typeof e == "string" && Be.test(e.trim())) {
		if (a) {
			let t = Ve(e);
			return Number.isFinite(t) && (r === void 0 || t <= r);
		}
		return He(e, {
			positive: n,
			max: r
		});
	}
	return typeof e != "string" || !t ? !1 : Ue(e, t);
}
function Ge(e, { property: t, positive: n = !1, max: r, fallback: i, allowNegative: a = !1 } = {}) {
	if (We(e, {
		property: t,
		positive: n,
		max: r,
		allowUndefined: !1,
		allowNegative: a
	})) {
		let t = Ve(e);
		return Number.isFinite(t) ? t === 0 ? "0" : `${t}px` : e.trim();
	}
	return i;
}
function Ke(e, { property: t, positive: n = !1, fallback: r } = {}) {
	if (We(e, {
		property: t,
		positive: n,
		allowUndefined: !1
	})) {
		let t = Ve(e);
		return Number.isFinite(t) ? String(t) : e.trim();
	}
	return r;
}
function qe(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : typeof e == "number" || typeof e == "string" && Be.test(e.trim()) ? He(e) : !e || Array.isArray(e) ? !1 : ["start", "end"].every((t) => e[t] === void 0 || He(e[t]));
}
function Je(e, t) {
	let n = Ve(e);
	if (Number.isFinite(n)) return {
		start: n,
		end: n
	};
	function r(e) {
		let n = Ve(e);
		return Number.isFinite(n) ? n : t;
	}
	return {
		start: r(e?.start ?? t),
		end: r(e?.end ?? t)
	};
}
function Ye(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : He(e);
}
function Xe(e, t = 0) {
	return He(e) ? Ve(e) : t;
}
function Ze(e, { positive: t = !1, fallback: n } = {}) {
	return He(e, { positive: t }) ? Ve(e) : n;
}
//#endregion
//#region src/components/mat-hover/MatHover.vue
var Qe = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Ye(e, { allowUndefined: !1 })
		},
		openDelay: {
			type: [Number, String],
			default: 0,
			validator: (e) => Ye(e, { allowUndefined: !1 })
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
			let n = Xe(t, 0);
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
});
//#endregion
//#region src/components/motion-controller.js
function $e() {
	return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
}
function et() {
	let e = 0, t;
	function n() {
		e += 1, t !== void 0 && (globalThis.clearTimeout(t), t = void 0);
	}
	function r(r, i, a) {
		n();
		let o = e;
		if ($e()) {
			a();
			return;
		}
		if (typeof r?.getAnimations == "function") {
			let t = r.getAnimations({ subtree: !0 }).filter((e) => e.playState !== "finished");
			if (t.length === 0) {
				a();
				return;
			}
			Promise.allSettled(t.map((e) => e.finished)).then(() => {
				e === o && a();
			});
			return;
		}
		t = globalThis.setTimeout(() => {
			t = void 0, e === o && a();
		}, i);
	}
	return Object.freeze({
		cancel: n,
		wait: r
	});
}
//#endregion
//#region src/components/mat-app-root/mat-app-root-context.js
var tt = Symbol("mat-app-root"), nt = /* @__PURE__ */ new WeakMap();
function rt(e, t) {
	nt.set(e, t);
}
function it(e) {
	nt.delete(e);
}
function at(e) {
	return nt.get(e) ?? null;
}
function ot() {
	let e = p(tt, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var st = [
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
], ct = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function lt(e) {
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
function ut(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function dt(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function ft(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function pt(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function mt(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: ut(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: dt(t, n, r)
	};
}
function ht(e) {
	return [
		e,
		ct[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== ct[e])
	];
}
function gt(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function _t(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function vt(e, t, n, r, i, a, o, s) {
	let c = mt(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: ft(c.left, a, l),
		top: ft(c.top, a, u)
	}, f = gt(d, r);
	return _t(f, n) || s.some((e) => _t(f, lt(e))) ? null : d;
}
function yt({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = lt(i), c = lt(a), [l, u = "center"] = (st.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = pt(l, s, o, r, t), m = ct[l], h = pt(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = ht(g), b = e.map((e) => lt(e)), x = y.find((e) => pt(e, s, o, r, t) >= f && vt(e, d, s, c, o, r, t, b)) ?? y.find((e) => vt(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = mt(x, d, s, c, t);
	return {
		left: Math.round(ft(C.left, r, _)),
		location: S,
		top: Math.round(ft(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var bt = null, xt = /* @__PURE__ */ new WeakMap();
function St(e) {
	bt && bt !== e && bt.close(), bt = e;
}
function Ct(e) {
	bt === e && (bt = null);
}
function wt(e, t) {
	e && xt.set(e, {
		owner: t,
		expiresAt: Infinity
	});
}
function Tt(e, t, n) {
	if (!e) return;
	let r = xt.get(e);
	if (!(!r || r.owner !== t)) {
		if (n <= 0) {
			xt.delete(e);
			return;
		}
		r.expiresAt = Date.now() + n;
	}
}
function Et(e, t) {
	if (!e) return !1;
	let n = xt.get(e);
	return !n || n.owner === t ? !1 : n.expiresAt < Date.now() ? (xt.delete(e), !1) : !0;
}
//#endregion
//#region src/components/toolbar-overlay.js
var Dt = /* @__PURE__ */ new Map(), Ot = /* @__PURE__ */ new Set(), kt = 0;
function At(e) {
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
function jt() {
	Ot.forEach((e) => e());
}
function Mt() {
	Dt.forEach((e, t) => {
		e.element.isConnected || Dt.delete(t);
	});
}
function Nt(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = kt;
	kt += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return Dt.set(n, r), jt(), {
		unregister() {
			i && (i = !1, Dt.delete(n), jt());
		},
		update() {
			i && jt();
		}
	};
}
function Pt() {
	return Mt(), [...Dt.values()].flatMap((e) => {
		try {
			return [At(e.getRect())];
		} catch {
			return [];
		}
	});
}
function Ft(e = window.innerHeight) {
	Mt();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...Dt.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - At(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function It(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return Ot.add(e), e(), () => {
		Ot.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var Lt = ["id", "data-location"], Rt = {
	key: 0,
	class: "mat-tooltip__subhead mat-sys-typescale-title-small"
}, zt = { class: "mat-tooltip__content mat-sys-typescale-body-medium" }, Bt = {
	key: 1,
	class: "mat-tooltip__actions"
}, Vt = 600, Ht = 150, Ut = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		rich: {
			type: Boolean,
			default: !1
		},
		subhead: {
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
				return st.includes(e);
			}
		},
		openDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Ye(e)
		},
		closeDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Ye(e)
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: c }) {
		let u = e, f = c, m = $("tooltip", u), _ = ee(), v = R(), T = d(), E = p(tt, null), D = O(null), k = P(null), A = { value: k }, M = P(null), N = O(!1), B = O(null), V = O(!1), H = O(!1), U = O(!1), W = O("closed"), G = O("top"), K = O({}), q = O(!1), J = `${L().replace(/[^\w-]/g, "-")}-tooltip`, Y = r(() => typeof _.id == "string" ? _.id : J), te = r(() => m.content === void 0 ? !!v.default : m.content.length > 0), X = r(() => m.subhead === void 0 ? !!v.subhead : m.subhead.length > 0), ne = r(() => m.rich || X.value || !!v.action), re = r(() => !!v.activator), ie = T?.vnode.props ?? {}, Z = Object.prototype.hasOwnProperty.call(ie, "modelValue") || Object.prototype.hasOwnProperty.call(ie, "model-value"), Q, ae, oe = et(), se, ce = !1, le, ue, de = null, fe = null, pe = null, me = null, he = null, ge = !1, _e = !0, ve = !1, ye = !1, be = !1, xe = null, Se = { close: nt }, Ce = Symbol("mat-tooltip-delay-group-owner");
		function we(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? we(e.value) : "$el" in e ? we(e.$el) : null : null;
		}
		function Te(e) {
			try {
				return we(document.querySelector(e));
			} catch {
				return null;
			}
		}
		function Ee() {
			return typeof m.target == "string" ? Te(m.target) : we(m.target);
		}
		function De() {
			let e = D.value ? [...D.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function Oe() {
			return re.value ? De() : Ee();
		}
		function ke() {
			return Ae() ? typeof m.attach == "string" ? Te(m.attach) : we(m.attach) : Ne() || (E?.rootElement.value?.contains(k.value) && E.freeLayer.value ? E.freeLayer.value : document.body);
		}
		function Ae() {
			let e = T?.vnode.props ?? {};
			return Object.prototype.hasOwnProperty.call(e, "attach");
		}
		function je(e) {
			if (!e.hasAttribute("popover")) return !1;
			try {
				return e.matches(":popover-open") || e.hasAttribute("data-popover-open");
			} catch {
				return e.hasAttribute("data-popover-open");
			}
		}
		function Me(e) {
			return e.localName === "dialog" && e.hasAttribute("open") || je(e);
		}
		function Ne() {
			let e = k.value;
			for (; e;) {
				if (Me(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function Pe() {
			let e = m.openDelay;
			return Xe(e, 0);
		}
		function Fe() {
			let e = m.closeDelay;
			return Xe(e, Vt);
		}
		function Ie() {
			return k.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function Le() {
			ae !== void 0 && (window.clearTimeout(ae), ae = void 0);
		}
		function Re() {
			Q !== void 0 && (window.clearTimeout(Q), Q = void 0);
		}
		function ze() {
			oe.cancel();
		}
		function Be() {
			le !== void 0 && (window.cancelAnimationFrame(le), le = void 0);
		}
		function Ve() {
			Be(), H.value && (le = window.requestAnimationFrame(() => {
				if (le = void 0, H.value) {
					if (k.value && !k.value.isConnected) {
						$e({ immediate: !0 });
						return;
					}
					Ve();
				}
			}));
		}
		function He(e, t) {
			oe.wait(B.value, e, t);
		}
		function Ue() {
			se !== void 0 && (ce ? window.cancelAnimationFrame(se) : window.clearTimeout(se), se = void 0, ce = !1);
		}
		function We() {
			me && (he === null ? me.removeAttribute("aria-describedby") : me.setAttribute("aria-describedby", he), me = null, he = null);
		}
		function Ge() {
			let e = k.value;
			if (!H.value || !e || me === e) return;
			We(), me = e, he = e.getAttribute("aria-describedby");
			let t = (he ?? "").split(/\s+/).filter(Boolean);
			t.includes(Y.value) || t.push(Y.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function Ke() {
			Ue(), ue?.disconnect(), ue = void 0, fe &&= (fe(), null), pe &&= (pe(), null);
		}
		function qe() {
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
			] : Pt(), a = yt({
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
			G.value = a.location, K.value = {
				left: `${a.left}px`,
				top: `${a.top}px`
			}, U.value = !0;
		}
		function Je() {
			if (!H.value || se !== void 0) return;
			let e = () => {
				se = void 0, ce = !1, qe();
			};
			if (typeof window.requestAnimationFrame == "function") {
				ce = !0, se = window.requestAnimationFrame(e);
				return;
			}
			se = window.setTimeout(e, 0);
		}
		function Ye() {
			fe || (window.addEventListener("resize", Je), document.addEventListener("scroll", Je, !0), fe = () => {
				window.removeEventListener("resize", Je), document.removeEventListener("scroll", Je, !0);
			}, pe = It(Je), typeof ResizeObserver < "u" && (ue = new ResizeObserver(Je), ue.observe(k.value), ue.observe(B.value)));
		}
		function Ze() {
			V.value = !1, W.value = "closed", H.value = !1, U.value = !1, M.value = null, N.value = !1;
		}
		function $e({ immediate: e = !1 } = {}) {
			if (Le(), Re(), Be(), Ke(), We(), Ct(Se), !V.value) {
				Ze();
				return;
			}
			if (!(!e && W.value === "closing")) {
				if (e) {
					ze(), Ze();
					return;
				}
				H.value = !1, W.value = "closing", He(Ht, Ze);
			}
		}
		function nt() {
			Z && (q.value = !0, f("update:modelValue", !1)), $e();
		}
		function rt() {
			be || (be = !0, console.warn(re.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function it({ warn: e = !0 } = {}) {
			let t = Oe();
			if (!t && H.value && $e({ immediate: !0 }), t === k.value) {
				!t && te.value && e && rt();
				return;
			}
			let n = k.value !== null;
			We(), ht(), k.value = t, be = !1, !t && te.value && e && rt(), gt(), n && H.value && nt();
		}
		function at() {
			if (Re(), Z || H.value || q.value || !te.value) return;
			let e = Et(Ie(), Ce) ? 0 : Pe();
			if (e === 0) {
				_t();
				return;
			}
			ae === void 0 && (ae = window.setTimeout(() => {
				ae = void 0, _t();
			}, e));
		}
		function ot() {
			Le(), !(Z || !H.value || ve || ye) && Q === void 0 && (Q = window.setTimeout(() => {
				Q = void 0, nt();
			}, Fe()));
		}
		function st() {
			if (ve || ye) {
				at();
				return;
			}
			Tt(xe, Ce, m.skipDelayDuration), ot();
		}
		function ct(e) {
			ve = e, st();
		}
		function lt() {
			ye = !0, st();
		}
		function ut(e) {
			k.value?.contains(e.relatedTarget) || ne.value && B.value?.contains(e.relatedTarget) || (ye = !1, st());
		}
		function dt() {
			ne.value && (ve = !0, st());
		}
		function ft() {
			ne.value && (ve = !1, st());
		}
		function pt() {
			ne.value && (ye = !0, st());
		}
		function mt(e) {
			e.key === "Escape" && (e.preventDefault(), nt());
		}
		function ht() {
			de && (de(), de = null, ve = !1, ye = !1);
		}
		function gt() {
			let e = k.value;
			e && (e.addEventListener("keydown", mt), !Z && te.value && (e.addEventListener("focusin", lt), e.addEventListener("focusout", ut)), de = () => {
				e.removeEventListener("keydown", mt), e.removeEventListener("focusin", lt), e.removeEventListener("focusout", ut);
			});
		}
		async function _t() {
			if (!ge || !_e || q.value || !te.value) return;
			if (it({ warn: !0 }), !k.value) {
				nt();
				return;
			}
			let e = ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), nt();
				return;
			}
			Le(), Re(), ze(), St(Se), xe = Ie(), wt(xe, Ce), M.value = e, N.value = e === E?.freeLayer.value, G.value = m.location, K.value = {
				left: "0px",
				top: "0px"
			}, U.value = !1, W.value = "opening", V.value = !0, H.value = !0, await g(), !(!ge || !_e || !H.value) && (Ge(), qe(), Ye(), Ve());
		}
		return S(async () => {
			ge = !0, it({ warn: !1 }), await g(), ge && (it({ warn: !1 }), Z && m.modelValue && _t());
		}), C(() => {
			it({ warn: !1 }), H.value && Je();
		}), y(() => {
			_e || (_e = !0, it({ warn: !1 }), Z && m.modelValue && _t());
		}), x(() => {
			_e = !1, ze(), Be(), ht(), $e({ immediate: !0 });
		}), b(() => {
			ge = !1, ze(), Be(), ht(), H.value && $e({ immediate: !0 });
		}), z(() => m.modelValue, (e) => {
			if (!(!ge || !_e || !Z)) {
				if (e) {
					q.value = !1, _t();
					return;
				}
				q.value = !1, $e();
			}
		}), z([() => m.content, () => m.target], async () => {
			await g();
			let e = k.value;
			it({ warn: !1 }), k.value === e && (ht(), gt()), te.value || nt();
		}), z(() => m.attach, async () => {
			if (!H.value) return;
			let e = ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), nt();
				return;
			}
			M.value = e, N.value = e === E?.freeLayer.value, await g(), Je();
		}), z(() => m.location, () => {
			H.value && Je();
		}), z(Y, () => {
			!H.value || !me || (We(), Ge());
		}), E && z(E.publicContext.layout, Je), (r, c) => (w(), o(t, null, [
			!I(Z) && te.value ? (w(), i(Qe, {
				key: 0,
				target: A,
				"onUpdate:modelValue": ct
			})) : a("", !0),
			re.value || !e.target ? (w(), o("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: D,
				class: "mat-tooltip__activator"
			}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			V.value && M.value ? (w(), i(n, {
				key: 2,
				to: M.value
			}, [s("span", h(r.$attrs, {
				id: Y.value,
				ref_key: "tooltipElement",
				ref: B,
				class: ["mat-tooltip mat-sys-typescale-label-large", [`mat-tooltip--${W.value}`, {
					"mat-tooltip--app-root": N.value,
					"mat-tooltip--positioned": U.value,
					"mat-tooltip--rich": ne.value
				}]],
				"data-location": G.value,
				style: [K.value, r.$attrs.style],
				role: "tooltip",
				onFocusin: pt,
				onFocusout: ut,
				onMouseenter: dt,
				onMouseleave: ft
			}), [ne.value ? (w(), o(t, { key: 0 }, [
				X.value ? (w(), o("span", Rt, [I(m).subhead === void 0 ? j(r.$slots, "subhead", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(m).subhead), 1)], 64))])) : a("", !0),
				s("span", zt, [I(m).content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(m).content), 1)], 64))]),
				r.$slots.action ? (w(), o("span", Bt, [j(r.$slots, "action", {}, void 0, !0)])) : a("", !0)
			], 64)) : I(m).content === void 0 ? j(r.$slots, "default", { key: 2 }, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(I(m).content), 1)], 64))], 16, Lt)], 8, ["to"])) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-95fe5cad"]]), Wt = Symbol("mde-vue-button-group"), Gt = Symbol("mde-vue-split-button");
//#endregion
//#region src/components/use-button.js
function Kt(e, t) {
	let n = p(Q, Z), i = p(Wt, null), a = p(Gt, null), o = r(() => a?.size.value ?? e.size ?? i?.size.value ?? "small"), s = r(() => a ? "round" : e.shape ?? i?.shape.value ?? "round"), c = r(() => a?.variant.value ?? e.variant), l = r(() => a?.color.value ?? e.color ?? i?.color.value), u = r(() => e.disabled || !!a?.disabled.value || !!i?.disabled.value), d = r(() => !!(i && i.selection.value !== "none")), f = r(() => a?.role === "trailing" ? a.expanded.value : d.value ? i.isSelected(e.value) : e.selected), m = r(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = Ie(l);
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
var qt = Object.freeze([
	"display",
	"headline",
	"title",
	"body",
	"label"
]), Jt = Object.freeze([
	"large",
	"medium",
	"small"
]), Yt = Object.freeze({
	L: "large",
	M: "medium",
	S: "small"
});
function Xt(e) {
	return qt.includes(e);
}
function Zt(e) {
	return Jt.includes(e) || Object.hasOwn(Yt, e);
}
function Qt(e) {
	return Yt[e] ?? e;
}
function $t(e, t, n = !1) {
	return [
		"mat-sys-typescale",
		n ? "emphasized" : void 0,
		e,
		Qt(t)
	].filter(Boolean).join("-");
}
//#endregion
//#region src/components/mat-btn/MatBtn.vue
var en = {
	key: 2,
	class: "mat-btn__label"
}, tn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
				return oe.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return se.includes(e);
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
			validator(e) {
				return me(e) || pe(e);
			}
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
				return ce.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let s = $("btn", e), c = n, u = ee(), d = R(), f = O(null), p = L(), { colorStyle: g, effectiveColor: _, effectiveDisabled: v, effectiveSelected: y, effectiveShape: b, effectiveSize: x, effectiveToggle: C, effectiveVariant: T, handleClick: E, hasExplicitColor: D, split: k, useCursor: A } = Kt(s, c), M = r(() => pe(_.value)), N = r(() => !M.value || T.value === "text"), P = r(() => N.value ? g.value : {}), z = r(() => N.value && D.value), H = r(() => C.value && T.value !== "text"), U = r(() => H.value && y.value), W = r(() => s.icon === !0 || typeof s.icon == "string" && s.icon.trim().length > 0), G = r(() => s.fill === void 0 ? +!!U.value : s.fill);
		function K(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : m(e) ? e.type === t && Array.isArray(e.children) ? K(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? K(e.children) : [] : []).join("").trim();
		}
		let q = r(() => s.icon === !0 ? K(d.default?.() ?? []) : ""), J = r(() => typeof s.icon == "string" ? s.icon.trim() : q.value), Y = r(() => u["aria-label"] ?? s.label), te = r(() => W.value ? u.title ?? s.label : void 0), X = r(() => !W.value && (s.prefix !== void 0 || !!d.prefix)), ne = r(() => !W.value && (s.suffix !== void 0 || !!d.suffix)), ie = r(() => U.value && !!d.selected), Z = r(() => ({
			"extra-small": 20,
			small: W.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[x.value]), Q = r(() => {
			let [e, t] = {
				"extra-small": ["label", "large"],
				small: ["label", "large"],
				medium: ["title", "medium"],
				large: ["headline", "small"],
				"extra-large": ["headline", "large"]
			}[x.value];
			return $t(e, t, !0);
		});
		return S(() => {
			s.icon === !0 && !q.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), B(() => {
			s.toggle && s.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), M.value && T.value !== "text" && console.warn("MatBtn: on-* 内容色只支持 text 形态，当前按默认配色处理"), W.value && (!Y.value || Y.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (e, n) => (w(), i(re, h({
			ref_key: "buttonElement",
			ref: f
		}, I(u), {
			class: ["mat-btn", [
				`mat-btn--${I(T)}`,
				`mat-btn--size-${I(x)}`,
				`mat-btn--shape-${I(b)}`,
				Q.value,
				{
					"mat-button--explicit-color": z.value,
					"mat-btn--icon": W.value,
					[`mat-btn--width-${I(s).width}`]: W.value,
					"mat-btn--toggle": H.value,
					"mat-btn--selected": U.value,
					"mat-btn--split-leading": I(k)?.role === "leading"
				}
			]],
			style: P.value,
			"aria-label": W.value ? Y.value : I(u)["aria-label"],
			"aria-controls": I(k)?.role === "trailing" ? I(k).controls.value : void 0,
			"aria-expanded": I(k)?.role === "trailing" ? I(k).expanded.value : void 0,
			"aria-haspopup": I(k)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": H.value ? U.value : void 0,
			block: I(s).block,
			disabled: I(v),
			title: W.value ? void 0 : I(u).title,
			type: I(s).type,
			"use-cursor": I(A),
			onClick: I(E)
		}), {
			default: V(() => [
				W.value ? (w(), i(ze, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: G.value,
					"optical-size": Z.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [l(F(J.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : a("", !0),
				X.value ? (w(), i(ze, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: G.value,
					"optical-size": Z.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(s).prefix === void 0 ? j(e.$slots, "prefix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(s).prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				W.value ? a("", !0) : (w(), o("span", en, [ie.value ? j(e.$slots, "selected", { key: 0 }, void 0, !0) : j(e.$slots, "default", { key: 1 }, void 0, !0)])),
				ne.value ? (w(), i(ze, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: G.value,
					"optical-size": Z.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(s).suffix === void 0 ? j(e.$slots, "suffix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(s).suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				W.value && te.value ? (w(), i(Ut, {
					key: 4,
					content: te.value,
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
}), [["__scopeId", "data-v-1388d1f6"]]), nn = ["data-scrollable"], rn = { class: "mat-app-root__overlay" }, an = { class: "mat-app-root__bottom-stack" }, on = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		if (p(tt, null)) throw Error("MatAppRoot 不允许嵌套");
		let a = ee(), c = O(null), l = O(null), u = O(null), d = O(null), f = O(null), m = O(null), _ = O(null), v = O(null), y = E({
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
		}), x = D(y), C = E({
			top: 0,
			bottom: 0,
			start: 0,
			end: 0
		}), k = r(() => ({
			"mat-app-root--document": i.fillViewport && !i.scrollable,
			"mat-app-root--fill-viewport": i.fillViewport,
			"mat-app-root--scrollable": i.scrollable
		})), A = r(() => [a.style, {
			"--mat-app-root-padding-top": `${y.padding.top}px`,
			"--mat-app-root-padding-bottom": `${y.padding.bottom}px`,
			"--mat-app-root-padding-start": `${y.padding.start}px`,
			"--mat-app-root-padding-end": `${y.padding.end}px`,
			"--mat-app-root-safe-area-top": `${C.top}px`,
			"--mat-app-root-safe-area-bottom": `${C.bottom}px`,
			"--mat-app-root-safe-area-start": `${C.start}px`,
			"--mat-app-root-safe-area-end": `${C.end}px`
		}]), M = [], N = !1, P, F, L = !1;
		function R(e) {
			let t = Number.parseFloat(e);
			return Number.isFinite(t) ? Math.max(0, t) : 0;
		}
		function B() {
			if (!v.value) return {
				top: 0,
				bottom: 0,
				start: 0,
				end: 0
			};
			let e = window.getComputedStyle(v.value), t = window.getComputedStyle(c.value).direction, n = R(e.paddingLeft), r = R(e.paddingRight);
			return {
				top: R(e.paddingTop),
				bottom: R(e.paddingBottom),
				start: t === "rtl" ? r : n,
				end: t === "rtl" ? n : r
			};
		}
		function V(e, t, n) {
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
		function H(e, t, n, r) {
			return e === "top" ? Math.max(0, t.bottom - n.top) : e === "bottom" ? Math.max(0, n.bottom - t.top) : e === "start" ? r === "rtl" ? Math.max(0, n.right - t.left) : Math.max(0, t.right - n.left) : r === "rtl" ? Math.max(0, t.right - n.left) : Math.max(0, n.right - t.left);
		}
		function U(e, t) {
			return e === "top" || e === "bottom" ? {
				start: t.start,
				end: t.end
			} : {
				start: t.top,
				end: t.bottom
			};
		}
		function W() {
			if (!N || !c.value) return;
			let e = c.value.getBoundingClientRect(), r = Math.max(0, Number(e.width) || 0), a = Math.max(0, Number(e.height) || 0), o = i.fillViewport && !i.scrollable ? Math.max(0, Number(window.innerHeight) || a) : a, s = n.find((e) => r <= e.max) ?? n.at(-1), l = B(), u = { ...l }, d = {
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
			}, f = V(e, r, o), p = window.getComputedStyle(c.value).direction;
			Object.assign(C, l), M.forEach((e) => {
				if (!e.active) return;
				let t = U(e.edge, u), n = e.insets;
				n.start = t.start, n.end = t.end, d[e.edge].startInset = Math.max(d[e.edge].startInset, t.start), d[e.edge].endInset = Math.max(d[e.edge].endInset, t.end);
				let r = e.element.getBoundingClientRect(), i = H(e.edge, r, f, p);
				u[e.edge] = Math.max(u[e.edge], i);
			}), Object.assign(y.size, {
				width: r,
				height: o
			}), Object.assign(y.padding, u), Object.assign(y.content, {
				width: Math.max(0, r - u.start - u.end),
				height: Math.max(0, o - u.top - u.bottom)
			}), y.breakpoint = s.name, Object.assign(y.breakpointRange, {
				min: s.min,
				max: s.max
			}), t.forEach((e) => {
				Object.assign(y.edges[e], {
					size: u[e],
					...d[e]
				});
			});
		}
		function G() {
			if (!N || L) return;
			L = !0;
			let e = () => {
				L = !1, F = void 0, W();
			};
			if (typeof window.requestAnimationFrame == "function") {
				F = window.requestAnimationFrame(e);
				return;
			}
			F = window.setTimeout(e, 0);
		}
		function K({ edge: e, element: n } = {}) {
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
			return M.push(i), P?.observe(n), G(), Object.freeze({
				insets: D(r),
				unregister: () => {
					i.active && (i.active = !1, P?.unobserve?.(n), G());
				},
				update: () => {
					i.active && G();
				}
			});
		}
		let q = Object.freeze({
			layout: x,
			registerEdge: K
		});
		function J() {
			let e = c.value?.getBoundingClientRect() ?? {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			};
			return i.fillViewport && !i.scrollable ? {
				top: 0,
				bottom: y.size.height,
				left: e.left,
				right: e.left + y.size.width,
				width: y.size.width,
				height: y.size.height
			} : {
				top: e.top,
				bottom: e.bottom,
				left: e.left,
				right: e.right,
				width: y.size.width,
				height: y.size.height
			};
		}
		let Y = {
			publicContext: q,
			rootElement: D(c),
			contentElement: D(l),
			edgeLayer: D(u),
			freeLayer: D(d),
			modalLayer: D(f),
			snackbarLayer: D(m),
			floatingLayer: D(_),
			documentMode: r(() => i.fillViewport && !i.scrollable),
			getLayoutRect: J
		};
		T(tt, Y);
		function te() {
			window.addEventListener("resize", G), document.addEventListener("scroll", G, !0), window.visualViewport?.addEventListener("resize", G), window.visualViewport?.addEventListener("scroll", G);
		}
		function X() {
			window.removeEventListener("resize", G), document.removeEventListener("scroll", G, !0), window.visualViewport?.removeEventListener("resize", G), window.visualViewport?.removeEventListener("scroll", G);
		}
		return S(async () => {
			N = !0, rt(c.value, Y), P = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(G), P?.observe(c.value), M.forEach((e) => {
				e.active && P?.observe(e.element);
			}), te(), await g(), G();
		}), b(() => {
			N = !1, it(c.value), P?.disconnect(), P = void 0, X(), F !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(F) : window.clearTimeout(F));
		}), z([() => i.fillViewport, () => i.scrollable], G), (e, t) => (w(), o("div", h({
			ref_key: "rootElement",
			ref: c
		}, e.$attrs, {
			class: ["mat-app-root", k.value],
			"data-scrollable": String(I(i).scrollable),
			style: A.value
		}), [
			s("div", {
				ref_key: "contentElement",
				ref: l,
				class: "mat-app-root__content"
			}, [j(e.$slots, "default", {}, void 0, !0)], 512),
			s("div", rn, [
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
				s("div", an, [
					t[0] ||= s("span", {
						class: "mat-app-root__stack-spacer",
						"aria-hidden": "true"
					}, null, -1),
					s("div", {
						ref_key: "snackbarLayer",
						ref: m,
						class: "mat-app-root__snackbar-layer"
					}, null, 512),
					s("div", {
						ref_key: "floatingLayer",
						ref: _,
						class: "mat-app-root__floating-layer"
					}, null, 512)
				]),
				s("div", {
					ref_key: "modalLayer",
					ref: f,
					class: "mat-app-root__modal-layer"
				}, null, 512)
			]),
			s("span", {
				ref_key: "safeAreaProbe",
				ref: v,
				class: "mat-app-root__safe-area-probe",
				"aria-hidden": "true"
			}, null, 512)
		], 16, nn));
	}
}), [["__scopeId", "data-v-8118b3b6"]]), sn = /* @__PURE__ */ new WeakMap(), cn = /* @__PURE__ */ new WeakMap();
function ln(e, t, n) {
	let r = [n.initialValue, ...n.names].filter((e) => e && e !== "none"), i = e.style;
	i[t] = r.join(", ");
}
function un(e, t, n, r) {
	let i = e.get(t);
	return i || (i = {
		initialValue: t.style[n],
		names: /* @__PURE__ */ new Set()
	}, e.set(t, i)), i.names.add(r), ln(t, n, i), () => {
		if (i.names.delete(r), i.names.size > 0) {
			ln(t, n, i);
			return;
		}
		let a = t.style;
		a[n] = i.initialValue, e.delete(t);
	};
}
function dn({ name: e, scope: t, source: n }) {
	let r = sn.get(n)?.initialAxis ?? n.style.scrollTimelineAxis, i = un(sn, n, "scrollTimelineName", e), a = sn.get(n);
	a.initialAxis = r;
	let o = n.style;
	o.scrollTimelineAxis = "block";
	let s = un(cn, t, "timelineScope", e);
	return () => {
		s(), i(), sn.has(n) || (o.scrollTimelineAxis = r);
	};
}
function fn(e) {
	let t = e.parentElement;
	for (; t;) {
		let e = window.getComputedStyle(t).overflowY;
		if (/(auto|scroll|overlay)/.test(e)) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function pn(e, t) {
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
var mn = {
	key: 0,
	class: "mat-app-bar__leading"
}, hn = { class: "mat-app-bar__main" }, gn = {
	key: 0,
	class: "mat-app-bar__subtitle mat-sys-typescale-body-medium"
}, _n = {
	key: 1,
	class: "mat-app-bar__trailing"
}, vn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		], u = ["start", "center"], f = $("appBar", e), m = ee(), y = d(), x = p(tt, null), C = y?.vnode.props ?? {}, T = Object.prototype.hasOwnProperty.call(C, "attach"), E = O(null), D = O(null), k = P(null), A = `--mat-app-bar-${y?.uid ?? Math.random().toString(36).slice(2)}`, M = r(() => c.includes(f.variant) ? f.variant : "small"), N = r(() => M.value === "search" ? "search" : l.includes(f.content) ? f.content : "headline"), F = r(() => u.includes(f.align) ? f.align : "start"), L = r(() => M.value === "medium-flexible" ? 112 : M.value === "large-flexible" ? 120 : 64), R = r(() => f.app && !!x && !T), B = r(() => {
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
		]), U = r(() => [m.style, { "--mat-app-bar-timeline": A }]), W = r(() => M.value === "medium-flexible" ? $t("headline", "small") : M.value === "large-flexible" ? $t("headline", "medium") : $t("title", "large")), G = r(() => ({
			"mat-app-bar__host--app": f.app,
			"mat-app-bar__host--app-root": R.value
		})), K = !1, q;
		function J() {
			return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "scroll()");
		}
		function Y(e) {
			if (e instanceof HTMLElement && e.ownerDocument === document) return e;
			if (typeof e == "string") try {
				return document.querySelector(e);
			} catch {
				return null;
			}
			return null;
		}
		function te() {
			q?.(), q = void 0, D.value?.removeAttribute("data-timeline-active"), k.value?.unregister(), k.value = null;
		}
		async function X() {
			if (await g(), !K || !E.value || !D.value || (te(), R.value && (k.value = x.publicContext.registerEdge({
				edge: "top",
				element: E.value
			})), !J())) return;
			let e = Y(f.scrollTarget), t = R.value && x.rootElement.value?.dataset.scrollable === "true" ? x.contentElement.value : null, n = e ?? t ?? fn(E.value);
			if (!n) return;
			let r = R.value ? x.rootElement.value : pn(n, D.value);
			r && (q = dn({
				name: A,
				scope: r,
				source: n
			}), D.value.dataset.timelineActive = "");
		}
		return S(() => {
			K = !0, X();
		}), b(() => {
			K = !1, te();
		}), z([
			() => f.app,
			() => f.attach,
			() => f.scrollTarget,
			M
		], X), (e, r) => (w(), o(t, null, [!I(f).app || B.value ? (w(), i(n, {
			key: 0,
			disabled: !I(f).app,
			to: B.value
		}, [s("div", {
			ref_key: "hostElement",
			ref: E,
			class: _(["mat-app-bar__host", G.value])
		}, [s("header", h({
			ref_key: "headerElement",
			ref: D
		}, I(m), {
			class: ["mat-app-bar", H.value],
			style: U.value
		}), [
			e.$slots.leading ? (w(), o("div", mn, [j(e.$slots, "leading", {}, void 0, !0)])) : a("", !0),
			s("div", hn, [s("div", { class: _(["mat-app-bar__primary", W.value]) }, [j(e.$slots, "default", {}, void 0, !0)], 2), e.$slots.subtitle ? (w(), o("div", gn, [j(e.$slots, "subtitle", {}, void 0, !0)])) : a("", !0)]),
			r[0] ||= s("span", {
				class: "mat-app-bar__spacer",
				"aria-hidden": "true"
			}, null, -1),
			e.$slots.trailing ? (w(), o("div", _n, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16)], 2)], 8, ["disabled", "to"])) : a("", !0), V.value > 0 ? (w(), o("span", {
			key: 1,
			"aria-hidden": "true",
			class: "mat-app-bar__placeholder",
			style: v({ blockSize: `${V.value}px` })
		}, null, 4)) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-1110f7cc"]]), yn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-78f1e5d6"]]), bn = { class: "mat-search__leading" }, xn = {
	key: 0,
	class: "mat-search__trailing"
}, Sn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			onSubmit: U(m, ["prevent"])
		}), [
			s("span", bn, [j(e.$slots, "leading", {}, () => [u(tn, {
				disabled: I(i).disabled,
				icon: "search",
				label: I(i).label,
				size: "small",
				type: "button",
				variant: "standard",
				onClick: m
			}, null, 8, ["disabled", "label"])], !0)]),
			u(yn, h({
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
				onKeydown: H(U(m, ["prevent"]), ["enter"]),
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
			e.$slots.trailing ? (w(), o("span", xn, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-2ad22621"]]), Cn = 150, wn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
				return oe.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return se.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: me
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
		let n = $("btnGroup", e), i = t, a = O(null), s = O(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set(), f, p, m, _ = Cn, v = !0, y = !1, { colorStyle: x } = Ie(r(() => n.color));
		function E(e) {
			return n.selection === "multiple" ? Array.isArray(n.selected) && n.selected.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.selected, e);
		}
		function D(e, t) {
			if (e === void 0) {
				console.warn("MatBtnGroup: selection 不为 none 时，子按钮必须提供 value");
				return;
			}
			let r = E(e);
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
		T(Wt, {
			color: r(() => n.color),
			disabled: r(() => n.disabled),
			isSelected: E,
			requestSelection: D,
			selection: r(() => n.selection),
			shape: r(() => n.shape),
			size: r(() => n.size),
			variant: r(() => n.variant)
		});
		function k(e) {
			return e instanceof Element ? e.closest(".mat-button-base") : null;
		}
		function A(e) {
			let t = e.trim().match(/^(\d*\.?\d+)(ms|s)$/);
			if (!t) return null;
			let n = Number.parseFloat(t[1]);
			return t[2] === "s" ? n * 1e3 : n;
		}
		function M() {
			return A(getComputedStyle(a.value).getPropertyValue("--mat-btn-group-size-animation-duration")) ?? Cn;
		}
		function N() {
			return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function P() {
			f !== void 0 && (globalThis.cancelAnimationFrame(f), f = void 0);
		}
		function F(e, t) {
			let n = e;
			n.style.inlineSize = t.inlineSize, n.style.paddingInlineStart = t.paddingInlineStart, n.style.paddingInlineEnd = t.paddingInlineEnd;
		}
		function ee(e) {
			return new Map([...e].map(([e, t]) => [e, {
				inlineSize: Number.parseFloat(t.inlineSize) || 0,
				paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
				paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
			}]));
		}
		function L(e, t, n, r) {
			P();
			let i = performance.now(), a = [...t.keys()], o = Math.round(a.reduce((e, n) => e + t.get(n).inlineSize, 0) * 64);
			if (N() || n === 0) {
				t.forEach((e, t) => {
					F(t, {
						inlineSize: `${e.inlineSize}px`,
						paddingInlineStart: `${e.paddingInlineStart}px`,
						paddingInlineEnd: `${e.paddingInlineEnd}px`
					});
				}), r();
				return;
			}
			let s = (c) => {
				let l = Math.min(1, Math.max(0, (c - i) / n)), u = 1 - (1 - l) ** 3, d = 0;
				if (a.forEach((n, r) => {
					let i = t.get(n), s = e.get(n), c = (e, t) => e + (t - e) * u, l = r === a.length - 1 ? o - d : Math.round(c(s.inlineSize, i.inlineSize) * 64);
					d += l, F(n, {
						inlineSize: `${l / 64}px`,
						paddingInlineStart: `${c(s.paddingInlineStart, i.paddingInlineStart)}px`,
						paddingInlineEnd: `${c(s.paddingInlineEnd, i.paddingInlineEnd)}px`
					});
				}), l < 1) {
					f = globalThis.requestAnimationFrame(s);
					return;
				}
				f = void 0, r();
			};
			f = globalThis.requestAnimationFrame(s);
		}
		function R() {
			P(), d.forEach((e) => {
				let t = e;
				F(t, c.get(t) ?? {
					inlineSize: "",
					paddingInlineStart: "",
					paddingInlineEnd: ""
				}), c.delete(t), l.delete(t);
			}), d.clear(), s.value && delete s.value.dataset.matGroupPressed, m &&= (m.style.removeProperty("--mat-button-visual-scale"), void 0), s.value = null, _ = Cn, v = !0, y = !1;
		}
		function B() {
			if (!s.value) return;
			let e = new Map([...d].map((e) => {
				let t = getComputedStyle(e);
				return [e, {
					inlineSize: Number.parseFloat(t.inlineSize) || 0,
					paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
					paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
				}];
			})), t = ee(new Map([...d].map((e) => [e, l.get(e)])));
			delete s.value.dataset.matGroupPressed, s.value.style.setProperty("--mat-button-visual-scale", "1"), s.value = null, v = !0, y = !1, L(e, t, _, R);
		}
		function V() {
			if (s.value) {
				if (v) {
					B();
					return;
				}
				y = !0;
			}
		}
		function H(e, t, n, r) {
			v = !1, y = !1, _ = r, L(ee(t), ee(n), r, () => {
				s.value === e && (v = !0, y && B());
			}), (N() || r === 0) && (v = !0);
		}
		function U(e) {
			if (n.variant !== "standard" || e.disabled || s.value === e) return;
			let t = e;
			R();
			let r = [...a.value.querySelectorAll(".mat-button-base")], i = r.indexOf(t);
			if (r.length < 2 || i === -1) return;
			let o = Number.parseFloat(getComputedStyle(a.value).getPropertyValue("--mat-btn-group-standard-pressed-width-factor")) || 1.15, f = M(), p = new Map(r.map((e) => {
				let t = getComputedStyle(e);
				return [e, {
					icon: e.classList.contains("mat-btn--icon"),
					inlineSize: u.get(e) ?? e.getBoundingClientRect().width,
					paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
					paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
				}];
			})), h = i === 0 ? [r[1]] : i === r.length - 1 ? [r[i - 1]] : [r[i - 1], r[i + 1]], g = p.get(t).inlineSize * (o - 1), _ = h.reduce((e, t) => {
				let n = p.get(t);
				return e + (n.icon ? n.inlineSize * (o - 1) : n.paddingInlineStart + n.paddingInlineEnd);
			}, 0), v = Math.min(g, _), y = /* @__PURE__ */ new Map(), b = p.get(t);
			y.set(t, {
				inlineSize: `${b.inlineSize + v}px`,
				paddingInlineStart: `${b.paddingInlineStart}px`,
				paddingInlineEnd: `${b.paddingInlineEnd}px`
			}), h.forEach((e) => {
				let t = p.get(e), n = t.paddingInlineStart + t.paddingInlineEnd, r = t.icon ? t.inlineSize * (o - 1) : n, i = _ > 0 ? v * r / _ : 0, a = n > 0 ? i * t.paddingInlineStart / n : 0, s = i - a;
				y.set(e, {
					inlineSize: `${t.inlineSize - i}px`,
					paddingInlineStart: `${t.paddingInlineStart - a}px`,
					paddingInlineEnd: `${t.paddingInlineEnd - s}px`
				});
			}), y.forEach((e, t) => {
				let n = t, r = p.get(n), i = {
					inlineSize: `${r.inlineSize}px`,
					paddingInlineStart: `${r.paddingInlineStart}px`,
					paddingInlineEnd: `${r.paddingInlineEnd}px`
				};
				c.set(n, {
					inlineSize: n.style.inlineSize,
					paddingInlineStart: n.style.paddingInlineStart,
					paddingInlineEnd: n.style.paddingInlineEnd
				}), l.set(n, i), F(n, i), d.add(n);
			}), t.dataset.matGroupPressed = "", t.style.setProperty("--mat-button-visual-scale", ".96"), m = t, s.value = t, H(t, new Map([...d].map((e) => [e, l.get(e)])), y, f);
		}
		function W() {
			p?.disconnect(), !(!a.value || typeof ResizeObserver != "function") && (p ??= new ResizeObserver((e) => {
				e.forEach((e) => {
					let t = (Array.isArray(e.borderBoxSize) ? e.borderBoxSize[0] : e.borderBoxSize)?.inlineSize ?? e.contentRect.width;
					!d.has(e.target) && t > 0 && u.set(e.target, t);
				});
			}), a.value.querySelectorAll(".mat-button-base").forEach((e) => {
				p.observe(e, { box: "border-box" });
			}));
		}
		async function G(e) {
			let t = k(e.target);
			t && (await g(), U(t));
		}
		function K(e) {
			e.relatedTarget instanceof Node && a.value?.contains(e.relatedTarget) || V();
		}
		async function q(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = k(e.target);
			t && (await g(), U(t));
		}
		function J() {
			if (n.variant !== "connected" || !a.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...a.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return S(() => {
			J(), W();
		}), C(W), b(() => {
			p?.disconnect(), R();
		}), z(() => [n.variant, n.selection], async () => {
			R(), await g(), J();
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
			style: I(x),
			role: "group",
			onFocusout: K,
			onKeydown: q,
			onKeyupCapture: V,
			onLostpointercaptureCapture: V,
			onPointercancelCapture: V,
			onPointerdown: G,
			onPointerupCapture: V
		}), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-36a1694a"]]), Tn = [
	"small",
	"medium",
	"large"
], En = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], Dn = [
	"button",
	"submit",
	"reset"
];
function On(e) {
	return typeof e == "string" && En.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var kn = {
	key: 1,
	class: "mat-fab__label"
}, An = {
	key: 1,
	class: "mat-fab__label"
}, jn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return Tn.includes(e);
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
			validator: On
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return Dn.includes(e);
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
		let c = $("fab", t), d = s, f = ee(), m = R(), g = p(Q, Z), _ = p(tt, null), v = O(null), y = L(), b = r(() => (m.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = r(() => typeof c.icon == "string" && c.icon.trim().length > 0), S = r(() => !b.value), C = r(() => S.value ? f.title ?? c.label : void 0), T = r(() => S.value ? c.label : f["aria-label"]), E = r(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[c.size]), D = r(() => {
			let [e, t] = {
				small: ["title", "medium"],
				medium: ["title", "large"],
				large: ["headline", "small"]
			}[c.size];
			return $t(e, t);
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
		}, [u(re, h({
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
				x.value ? (w(), i(ze, {
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
				b.value ? (w(), o("span", An, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(Ut, {
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
		])], 8, ["to"])) : a("", !0) : (w(), i(re, h({
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
				x.value ? (w(), i(ze, {
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
				b.value ? (w(), o("span", kn, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(Ut, {
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
}), [["__scopeId", "data-v-ae067ea6"]]), Mn = ["src"], Nn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: (e) => We(e, { property: "border-radius" })
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
			validator: (e) => We(e, {
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
			aspectRatio: Ke(t.aspectRatio, {
				property: "aspect-ratio",
				positive: !0
			}),
			borderRadius: t.radius === void 0 ? "var(--mat-sys-shape-corner-extra-large)" : Ge(t.radius, {
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
		}), null, 16, Mn)], 16));
	}
}), [["__scopeId", "data-v-393cc4ac"]]), Pn = ["src"], Fn = {
	key: 2,
	class: "mat-avatar__content"
}, In = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatAvatar",
	inheritAttrs: !1
}, {
	__name: "MatAvatar",
	props: {
		src: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || e.length > 0;
			}
		},
		icon: {
			type: String,
			default: void 0
		},
		color: {
			type: String,
			default: "primary",
			validator: me
		},
		size: {
			type: [Number, String],
			default: 40,
			validator: (e) => We(e, {
				property: "width",
				positive: !0
			})
		}
	},
	setup(e) {
		let t = $("avatar", e), { colorStyle: n } = Ie(r(() => t.color)), a = r(() => Ge(t.size, {
			property: "width",
			positive: !0,
			fallback: "40px"
		})), s = r(() => ({
			...n.value,
			"--mat-avatar-size": a.value,
			"inline-size": a.value,
			"block-size": a.value
		}));
		return (e, n) => (w(), o("span", h(e.$attrs, {
			class: "mat-avatar",
			style: s.value
		}), [I(t).src ? (w(), o("img", {
			key: 0,
			class: "mat-avatar__image",
			src: I(t).src,
			alt: ""
		}, null, 8, Pn)) : I(t).icon ? (w(), i(ze, {
			key: 1,
			as: "span",
			class: "mat-avatar__icon",
			icon: I(t).icon,
			size: "var(--mat-avatar-icon-size)",
			"aria-hidden": "true"
		}, null, 8, ["icon"])) : (w(), o("span", Fn, [j(e.$slots, "default", {}, void 0, !0)]))], 16));
	}
}), [["__scopeId", "data-v-cec55f96"]]), Ln = /*@__PURE__*/ Object.assign({ name: "MatText" }, {
	__name: "MatText",
	props: {
		type: {
			type: String,
			default: "body",
			validator: Xt
		},
		size: {
			type: String,
			default: "medium",
			validator: Zt
		},
		emphasized: {
			type: Boolean,
			default: !1
		},
		as: {
			type: String,
			default: "span",
			validator: ve
		}
	},
	setup(e) {
		let t = $("text", e), n = r(() => $t(t.type, t.size, t.emphasized));
		return (e, r) => (w(), i(M(I(t).as), { class: _(n.value) }, {
			default: V(() => [j(e.$slots, "default")]),
			_: 3
		}, 8, ["class"]));
	}
}), Rn = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = p(Gt), a = R();
		T(Gt, {
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
}), zn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
				return oe.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: me
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
		let n = $("splitBtn", e), i = t, a = O(null), c = R(), { colorStyle: l, hasExplicitColor: d } = Ie(r(() => n.color));
		T(Gt, {
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
		}, [u(Rn, { role: "leading" }, {
			default: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), s("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [u(Rn, { role: "trailing" }, {
			default: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-6f7200c8"]]), Bn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-76b082b5"]]), Vn = { class: "mat-card-headline mat-sys-typescale-title-large" }, Hn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (w(), o("div", Vn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-5a13e3d0"]]), Un = { class: "mat-card-media" }, Wn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (w(), o("div", Un, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-7208424e"]]), Gn = { class: "mat-card-subhead mat-sys-typescale-body-medium" }, Kn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (w(), o("div", Gn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-13f41dc3"]]), qn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: me
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
		let t = $("card", e), { colorStyle: n, hasExplicitColor: o } = Ie(r(() => t.color));
		return (e, r) => (w(), i(Bn, h(e.$attrs, {
			class: ["mat-card", [`mat-card--${I(t).variant}`, { "mat-card--explicit-color": I(o) }]],
			style: I(n),
			as: I(t).as
		}), {
			default: V(() => [
				e.$slots.media ? (w(), i(Wn, { key: 0 }, {
					default: V(() => [j(e.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				e.$slots.headline ? (w(), i(Hn, { key: 1 }, {
					default: V(() => [j(e.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				e.$slots.subhead ? (w(), i(Kn, { key: 2 }, {
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
}), [["__scopeId", "data-v-e7de088d"]]), Jn = { class: "mat-card-action-area__content" }, Yn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: (e) => ce.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = e, r = t, a = $("cardActionArea", n), o = p(Q, Z);
		return (e, t) => (w(), i(ne, h(e.$attrs, {
			class: "mat-card-action-area",
			disabled: I(a).disabled,
			"focus-ring": !1,
			href: I(a).href,
			type: I(a).type,
			"use-cursor": I(o).useCursor,
			onClick: t[0] ||= (e) => r("click", e)
		}), {
			default: V(() => [s("span", Jn, [j(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-bc57888e"]]), Xn = { class: "mat-card-content" }, Zn = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (w(), o("div", Xn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-8a32cf5d"]]), Qn = { class: "mat-card-actions" }, $n = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (w(), o("div", Qn, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-f3e5f8e6"]]), er = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], tr = Symbol("mat-list"), nr = Symbol("mat-list-group-activator");
function rr(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function ir(e) {
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
function ar(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function or(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(ar);
}
var sr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
				return er.includes(e);
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
				return e.every(ar);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: me
		}
	},
	emits: {
		select(e) {
			return e && Object.hasOwn(e, "value") && Object.hasOwn(e, "nextSelected") && e.originalEvent instanceof Event;
		},
		"update:expanded"(e) {
			return Array.isArray(e) && e.every(ar);
		}
	},
	setup(e, { emit: t }) {
		let n = $("list", e), a = t, o = O(null), s = r(() => rr(n.interaction)), c = r(() => s.value ? "div" : "ul"), { colorStyle: l } = Ie(r(() => n.color)), u = [], d = [
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
		let C = ir({
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
		return T(tr, {
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
}), [["__scopeId", "data-v-652dfedc"]]), cr = ["data-line-count"], lr = ["inert"], ur = ["inert"], dr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
			}, [e.leadingIcon ? (w(), i(ze, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: V(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : j(t.$slots, "leading", { key: 1 }, void 0, !0)], 10, lr)) : a("", !0),
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
			}, [j(t.$slots, "trailing", {}, void 0, !0)], 10, ur)) : a("", !0)
		], 10, cr));
	}
}), [["__scopeId", "data-v-8bcade82"]]), fr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		return (t, n) => (w(), i(dr, {
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
}), [["__scopeId", "data-v-f09dfa3d"]]), pr = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], mr = ["aria-disabled", "data-mat-list-disabled"], hr = ["aria-disabled", "data-mat-list-disabled"], gr = ["inert"], _r = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
				return ce.includes(e);
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
		let n = $("listItem", e), s = t, l = R(), d = p(tr, null), f = p(nr, null), m = p(Q, Z), v = r(() => d?.interaction.value ?? "none"), y = r(() => v.value === "single-action" || v.value === "multi-action"), b = r(() => v.value === "multi-action"), x = r(() => d?.isSelectable.value ?? !1), C = r(() => d?.isSelected(n.value) ?? !1), T = r(() => !!l.trailing), E = r(() => {
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
		}), [u(fr, {
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
		]), 1032, ["line-count"])], 16, pr)) : I(f) ? (w(), i(ne, h({ key: 1 }, e.$attrs, {
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
			default: V(() => [u(fr, {
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
		}), [u(fr, {
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
		]), 1032, ["line-count"])], 16, mr)) : y.value ? (w(), o("li", {
			key: 3,
			class: _(["mat-list-item", [D.value, {
				"mat-list-item__surface": b.value,
				"mat-list-item--multi-action": b.value
			}]]),
			"aria-disabled": I(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": I(n).disabled ? "true" : void 0
		}, [u(ne, h(e.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !b.value }],
			"data-mat-list-primary": "",
			disabled: I(n).disabled,
			"focus-ring": !0,
			href: I(n).href,
			type: I(n).type,
			"use-cursor": I(m).useCursor,
			onClick: O
		}), {
			default: V(() => [u(fr, {
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
		}, [j(e.$slots, "trailing", {}, void 0, !0)], 8, gr)) : a("", !0)], 10, hr)) : (w(), i(ne, h({ key: 4 }, e.$attrs, {
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
			default: V(() => [u(fr, {
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
}), [["__scopeId", "data-v-35329c9d"]]), vr = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return T(nr, e.context), (e, t) => j(e.$slots, "default");
	}
}), yr = [
	"role",
	"aria-hidden",
	"inert"
], br = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		let a = $("listGroup", n), o = p(tr, null), c = R(), l = O(null), d = O(!1), f = O(null), _ = Symbol("mat-list-group"), v = L().replace(/[^\w-]/g, "-"), y = `mat-list-group-${v}-content`, x = `mat-list-group-${v}-label`, T = !1, E, D = r(() => a.value !== void 0), k = r(() => o?.isSelectable.value ?? !1), A = r(() => D.value ? o?.isGroupExpanded(a.value) ?? !1 : d.value);
		function N(n) {
			return n.flatMap((n) => m(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? N(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = r(() => {
			let e = N(c.activator?.({ expanded: A.value }) ?? []);
			if (e.length !== 1 || !m(e[0])) return !1;
			let t = e[0].type;
			return t === _r || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
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
		let U = {
			contentId: y,
			expanded: I,
			labelId: x,
			static: k,
			toggle: H
		};
		function W() {
			!F.value && !T ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), T = !0) : F.value && (T = !1);
		}
		function G() {
			if (!l.value) return;
			let e = k.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(l.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			f.value !== t && (f.value = t);
		}
		function K() {
			G(), W();
		}
		function q(e) {
			e !== void 0 && (o?.registerGroupValue(_, e), E = e);
		}
		function J() {
			E !== void 0 && (o?.unregisterGroupValue(_), E = void 0);
		}
		return S(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), k.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), q(a.value), K(), o?.requestFocusRefresh();
		}), C(K), b(() => {
			J(), o?.requestFocusRefresh();
		}), z(() => a.value, (e, t) => {
			Object.is(e, t) || (J(), q(e));
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
			default: V(() => [u(vr, { context: U }, {
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
			}, 8, ["role"]))], 8, yr)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-eae89dc1"]]), xr = Symbol("mat-menu"), Sr = Symbol("mat-menu-item"), Cr = Symbol("mat-menu-group");
function wr(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function Tr(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = wr(t, a, o), c = wr(e, a, o), l = wr(t, e, o), u = wr(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function Er(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var Dr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		let t = $("divider", e), n = p(tr, null), a = p(xr, null), o = r(() => !!n), s = r(() => !!a), c = r(() => n?.isSelectable.value ?? !1), l = r(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = r(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
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
}), [["__scopeId", "data-v-1fa4b6f3"]]), Or = { class: "mat-selection-control__target" }, kr = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], Ar = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, jr = {
	key: 0,
	class: "mat-selection-control__label"
}, Mr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: me
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
		let i = e, c = n, l = ee(), u = R(), d = O(null), f = p(Q, Z), { colorStyle: m } = Ie(r(() => i.color)), g = r(() => {
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
		}), [s("span", Or, [
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
			}), null, 16, kr),
			n[2] ||= s("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			s("span", Ar, [j(t.$slots, "indicator", {}, void 0, !0)])
		]), I(u).default ? (w(), o("span", jr, [j(t.$slots, "default", {}, void 0, !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-e1bf8dba"]]), Nr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: or
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: ar
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
			validator: me
		}
	},
	emits: {
		"update:modelValue": or,
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
		return (e, t) => (w(), i(Mr, h(e.$attrs, {
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
}), [["__scopeId", "data-v-e123f087"]]), Pr = [
	"top-start",
	"top",
	"top-end",
	"end",
	"bottom-end",
	"bottom",
	"bottom-start",
	"start",
	"inline"
];
function Fr(e) {
	return !e || typeof e != "object" || Array.isArray(e) || Object.keys(e).some((e) => !["inline", "block"].includes(e)) ? !1 : ["inline", "block"].every((t) => We(e[t], {
		property: "margin",
		allowNegative: !0
	}));
}
//#endregion
//#region src/components/mat-badge/MatBadge.vue
var Ir = ["data-dot"], Lr = ["data-dot"], Rr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatBadge",
	inheritAttrs: !1
}, {
	__name: "MatBadge",
	props: {
		content: {
			type: [String, Number],
			default: void 0
		},
		dot: {
			type: Boolean,
			default: !1
		},
		location: {
			type: String,
			default: "top-end",
			validator: (e) => Pr.includes(e)
		},
		offset: {
			type: Object,
			default: () => ({
				inline: 0,
				block: 0
			}),
			validator: Fr
		},
		color: {
			type: String,
			default: "error",
			validator: me
		}
	},
	setup(e) {
		let t = $("badge", e), n = ee(), { colorStyle: i } = Ie(r(() => t.color)), s = r(() => t.location === "inline"), c = r(() => t.content !== void 0 && String(t.content).length > 0), l = r(() => t.dot || c.value), u = r(() => t.dot ? void 0 : t.content);
		function d(e) {
			let t = Ge(e ?? 0, {
				property: "margin",
				allowNegative: !0,
				fallback: "0px"
			});
			return t === "0" ? "0px" : t;
		}
		let f = r(() => ({
			...i.value,
			"--mat-badge-offset-inline": s.value ? void 0 : d(t.offset?.inline),
			"--mat-badge-offset-block": s.value ? void 0 : d(t.offset?.block)
		}));
		return (e, r) => s.value && l.value ? (w(), o("span", h({ key: 0 }, I(n), {
			class: ["mat-badge__indicator mat-badge__indicator--inline", { "mat-badge__indicator--dot": I(t).dot }],
			style: f.value,
			"aria-hidden": "true",
			"data-dot": I(t).dot ? "" : void 0
		}), F(u.value), 17, Ir)) : s.value ? a("", !0) : (w(), o("span", h({ key: 1 }, I(n), { class: "mat-badge" }), [j(e.$slots, "default", {}, void 0, !0), l.value ? (w(), o("span", {
			key: 0,
			class: _(["mat-badge__indicator", [`mat-badge__indicator--${I(t).location}`, { "mat-badge__indicator--dot": I(t).dot }]]),
			style: v(f.value),
			"aria-hidden": "true",
			"data-dot": I(t).dot ? "" : void 0
		}, F(u.value), 15, Lr)) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-8f699504"]]), zr = Symbol("mat-chip-set"), Br = {
	key: 0,
	class: "mat-chip__avatar",
	"aria-hidden": "true",
	inert: ""
}, Vr = {
	key: 1,
	class: "mat-chip__icon mat-chip__icon--leading",
	"aria-hidden": "true",
	inert: ""
}, Hr = { class: "mat-chip__label" }, Ur = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		removeIcon: {
			type: String,
			default: "close",
			validator(e) {
				return e.trim().length > 0;
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0,
			validator(e) {
				return e === void 0 || ar(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: me
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return ce.includes(e);
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
		let n = $("chip", e), c = t, l = R(), u = p(Q, Z), d = p(zr, null), f = r(() => ["filter", "input"].includes(n.variant)), m = r(() => !!d && f.value && n.value !== void 0 && d.selection.value !== "none"), g = r(() => m.value ? d.isSelected(n.value) : f.value && n.selected), _ = r(() => !!l.avatar), v = r(() => !_.value && !!l.leading), y = r(() => n.variant === "filter" && g.value && !_.value && !v.value), b = r(() => _.value || v.value || y.value), x = r(() => n.variant === "input"), { colorStyle: S, hasExplicitColor: C } = Ie(r(() => n.color));
		function T(e) {
			c("click", e), m.value && d.requestSelection(n.value, e);
		}
		function E(e) {
			n.variant === "input" && (e.stopPropagation(), n.disabled || c("remove", e));
		}
		return (e, t) => (w(), i(ne, h(e.$attrs, {
			class: ["mat-chip mat-sys-typescale-label-large", [`mat-chip--${I(n).variant}`, {
				"mat-chip--elevated": I(n).elevated,
				"mat-chip--selected": g.value,
				"mat-chip--explicit-color": I(C),
				"mat-chip--has-leading": b.value,
				"mat-chip--has-avatar": _.value,
				"mat-chip--has-remove-icon": x.value
			}]],
			style: I(S),
			"aria-pressed": f.value ? String(g.value) : void 0,
			disabled: I(n).disabled,
			type: I(n).type,
			"use-cursor": I(u).useCursor,
			onClick: T
		}), {
			default: V(() => [
				_.value ? (w(), o("span", Br, [j(e.$slots, "avatar", {}, void 0, !0)])) : v.value || y.value ? (w(), o("span", Vr, [v.value ? j(e.$slots, "leading", { key: 0 }, void 0, !0) : (w(), i(ze, {
					key: 1,
					as: "span",
					icon: "check",
					"optical-size": 20,
					size: "18px"
				}))])) : a("", !0),
				s("span", Hr, [j(e.$slots, "default", {}, void 0, !0)]),
				x.value ? (w(), o("span", {
					key: 2,
					class: "mat-chip__icon mat-chip__remove-icon",
					"aria-hidden": "true",
					onPointerdown: t[0] ||= U(() => {}, ["stop"]),
					onClick: E
				}, [e.$slots["remove-icon"] ? j(e.$slots, "remove-icon", { key: 0 }, void 0, !0) : (w(), i(ze, {
					key: 1,
					as: "span",
					icon: I(n).removeIcon,
					"optical-size": 20,
					size: "18px"
				}, null, 8, ["icon"]))], 32)) : a("", !0)
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
}), [["__scopeId", "data-v-8272cbde"]]), Wr = {
	key: 0,
	class: "mat-scroll-area__fixed"
}, Gr = {
	key: 1,
	class: "mat-scroll-area__fixed"
}, Kr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: (e) => We(e, { allowUndefined: !1 })
		},
		shadowLength: {
			type: [Number, Object],
			default: void 0,
			validator: (e) => qe(e)
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
			validator: (e) => qe(e, { allowUndefined: !1 })
		},
		shadowOffset: {
			type: [Number, Object],
			default: 0,
			validator: (e) => qe(e, { allowUndefined: !1 })
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
		].includes(i.orientation) ? "horizontal" : "vertical"), P = r(() => i.dragScroll && N.value === "horizontal"), F = r(() => Je(i.reachThreshold, 0)), L = r(() => Je(i.shadowOffset, 0)), R = r(() => Je(i.shadowLength, 16)), B = r(() => i.barWidth === "hidden" ? 0 : i.barWidth === "thin" ? 10 : 16), V = r(() => ({
			"--mat-scroll-area-shadow-length-start": `${R.value.start}px`,
			"--mat-scroll-area-shadow-length-end": `${R.value.end}px`,
			"--mat-scroll-area-shadow-offset-start": `${L.value.start}px`,
			"--mat-scroll-area-shadow-offset-end": `${L.value.end}px`,
			"--mat-scroll-area-scrollbar-space": `${B.value}px`
		})), H = r(() => ({
			class: l.class,
			style: l.style
		})), U = r(() => {
			let e = N.value === "horizontal", t = Ge(i.snapPadding, { fallback: "0" });
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
		function J() {
			q(!0);
		}
		function Y() {
			M !== void 0 && (globalThis.clearTimeout(M), M = void 0), A = !1;
		}
		function te() {
			Y(), A = !0, M = globalThis.setTimeout(() => {
				A = !1, M = void 0;
			}, 0);
		}
		function X(e = !1) {
			let t = u.value, n = E;
			e && n !== void 0 && t?.hasPointerCapture?.(n) && t.releasePointerCapture(n), E = void 0, p.value = !1;
		}
		function ne(e) {
			!P.value || E !== void 0 || e.button !== 0 || !["mouse", "pen"].includes(e.pointerType) || (E = e.pointerId, D = e.clientX, k = u.value?.scrollLeft ?? 0);
		}
		function re(e) {
			if (e.pointerId !== E || !u.value) return;
			let t = e.clientX - D;
			!p.value && Math.abs(t) <= 4 || (p.value || (p.value = !0, u.value.setPointerCapture?.(e.pointerId)), e.preventDefault(), u.value.scrollLeft = k - t);
		}
		function ie(e) {
			e.pointerId === E && (p.value && te(), X(!0));
		}
		function Z(e) {
			e.pointerId === E && X(!0);
		}
		function Q(e) {
			e.target !== u.value || e.pointerId !== E || (p.value && te(), X());
		}
		function ae(e) {
			A && (Y(), e.preventDefault(), e.stopImmediatePropagation());
		}
		function oe() {
			!T || !u.value || (T.disconnect(), T.observe(u.value), Array.from(u.value.children).forEach((e) => {
				T.observe(e);
			}), q(!1));
		}
		function se() {
			return u.value;
		}
		function ce(e) {
			u.value?.scrollTo(e);
		}
		return z([N, F], async () => {
			await g(), q(!1);
		}, { deep: !0 }), z(P, (e) => {
			e || (X(!0), Y());
		}), S(() => {
			typeof ResizeObserver == "function" && (T = new ResizeObserver(() => q(!1))), oe();
		}), C(oe), b(() => {
			x !== void 0 && cancelAnimationFrame(x), T?.disconnect(), X(!0), Y();
		}), t({
			getScroller: se,
			scrollTo: ce
		}), (e, t) => (w(), o("div", h(H.value, { class: ["mat-scroll-area", `mat-scroll-area--${N.value}`] }), [
			e.$slots["fixed-start"] ? (w(), o("div", Wr, [j(e.$slots, "fixed-start", {}, void 0, !0)])) : a("", !0),
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
				class: ["mat-scroll-area__scroller", [`mat-scroll-area__scroller--bar-${I(i).barWidth}`, {
					"mat-scroll-area__scroller--dragging": p.value,
					"mat-scroll-area__scroller--start-overflow": d.value,
					"mat-scroll-area__scroller--end-overflow": f.value
				}]],
				style: U.value,
				onClickCapture: ae,
				onLostpointercapture: Q,
				onPointercancel: Z,
				onPointerdown: ne,
				onPointermove: re,
				onPointerup: ie,
				onScroll: J
			}), [j(e.$slots, "default", {}, void 0, !0)], 16)], 6),
			e.$slots["fixed-end"] ? (w(), o("div", Gr, [j(e.$slots, "fixed-end", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-87fcdd08"]]), qr = { class: "mat-chip-set__scroll-content" }, Jr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatChipSet" }, {
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
				return e === null || ar(e) || Array.isArray(e) && e.every(ar);
			}
		}
	},
	emits: { "update:modelValue"(e) {
		return e === null || ar(e) || Array.isArray(e) && e.every(ar);
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
		return T(zr, {
			isSelected: l,
			requestSelection: u,
			selection: c
		}), (e, t) => (w(), o("div", {
			class: _(["mat-chip-set", `mat-chip-set--${I(n).layout}`]),
			role: "group"
		}, [I(n).layout === "scroll" ? (w(), i(Kr, {
			key: 0,
			class: "mat-chip-set__scroll-area",
			orientation: "horizontal",
			"bar-width": "hidden",
			"drag-scroll": "",
			"shadow-length": 48
		}, {
			default: V(() => [s("div", qr, [j(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		})) : j(e.$slots, "default", { key: 1 }, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-0f248b3b"]]), Yr = Symbol("mde-vue-radio-group"), Xr = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
				return e == null || ar(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: ar
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: me
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || ar(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radio", e), a = t, o = d(), c = p(Yr, null), l = O(null), u = r(() => n.value), f = r(() => n.disabled || !!c?.disabled.value), m = r(() => n.color ?? c?.color.value), g = r(() => c ? c.isSelected(n.value) : Object.is(n.modelValue, n.value));
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
		return (e, t) => (w(), i(Mr, h({
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
}), [["__scopeId", "data-v-39dbc695"]]), Zr = ["aria-disabled"], Qr = { class: "mat-radio-group__label mat-sys-typescale-title-medium" }, $r = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
				return e === null || ar(e);
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
			validator: me
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || ar(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radioGroup", e), i = t, a = ee(), c = P([]), { colorStyle: l } = Ie(r(() => n.color)), u = r(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = r(() => [l.value, a.style]);
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
		return T(Yr, {
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
		}), [s("legend", Qr, F(I(n).label), 1), j(e.$slots, "default", {}, void 0, !0)], 16, Zr));
	}
}), [["__scopeId", "data-v-4ad7f784"]]), ei = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: me
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
		return (e, t) => (w(), i(Mr, h(e.$attrs, {
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
}), [["__scopeId", "data-v-5f9d193a"]]);
//#endregion
//#region src/components/frame-scheduler.js
function ti(e) {
	let t, n = !1, r;
	function i() {
		t !== void 0 && (globalThis.cancelAnimationFrame(t), t = void 0);
	}
	function a() {
		if (i(), !n) return !1;
		let t = r;
		return n = !1, r = void 0, e(t), !0;
	}
	function o() {
		i(), n = !1, r = void 0;
	}
	function s(e) {
		r = e, n = !0, t === void 0 && (t = globalThis.requestAnimationFrame(() => {
			t = void 0, a();
		}));
	}
	return Object.freeze({
		cancel: o,
		flush: a,
		schedule: s
	});
}
//#endregion
//#region src/components/slider-utils.js
var ni = Object.freeze(["horizontal", "vertical"]), ri = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), ii = Object.freeze(["standard", "centered"]), ai = 12;
function oi(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function si(e) {
	return oi(e) && e > 0;
}
function ci(e) {
	return ni.includes(e);
}
function li(e) {
	return ri.includes(e);
}
function ui(e) {
	return ii.includes(e);
}
function di(e) {
	return Array.isArray(e) && e.length === 2 && e.every(oi);
}
function fi(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function pi(e, t) {
	return Number(e.toFixed(Math.min(ai, t)));
}
function mi(e, t) {
	let n = oi(e) ? e : 0, r = oi(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function hi(e) {
	return si(e) ? e : 1;
}
function gi(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function _i(e, t, n) {
	let r = gi(oi(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(fi(t.min), fi(t.max), fi(n));
	return pi(gi(t.min + i * n, t), a);
}
function vi(e, t, n) {
	return _i(oi(e) ? e : (t.min + t.max) / 2, t, n);
}
function yi(e, t) {
	return pi((gi(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function bi(e) {
	return Number(e.toFixed(3)).toString();
}
function xi(e) {
	let t = Math.min(Math.max(e, 0), 100), n = bi(t), r = pi(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${bi(Math.abs(r))}px)`;
}
function Si(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(fi(e.min), fi(e.max), fi(t)), i = Array.from({ length: n + 1 }, (n, i) => pi(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function Ci(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return _i(n.min + (n.max - n.min) * u, n, r);
}
function wi(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return _i(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return _i(e + i * r, n, r);
}
function Ti(e, t, n, r) {
	let i = _i(e, n, r), a = _i(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var Ei = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, Di = { class: "mat-slider__inset-icon-layer" }, Oi = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, ki = [
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
], Ai = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: oi
		},
		min: {
			type: Number,
			default: 0,
			validator: oi
		},
		max: {
			type: Number,
			default: 100,
			validator: oi
		},
		step: {
			type: Number,
			default: 1,
			validator: si
		},
		variant: {
			type: String,
			default: "standard",
			validator: ui
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || oi(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: me
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: ci
		},
		size: {
			type: String,
			default: "extra-small",
			validator: li
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
			return oi(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = $("slider", e), c = n, l = ee(), d = O(null), f = O(null), m = O(null), g = O(!1), y = O(void 0), x = O(void 0), S = O(!1), C = O(!1), T = p(Q, Z), { colorStyle: E } = Ie(r(() => i.color)), D = r(() => mi(i.min, i.max)), k = r(() => hi(i.step)), j = r(() => _i(i.modelValue, D.value, k.value)), M = r(() => g.value ? x.value : j.value), N = r(() => vi(i.center, D.value, k.value)), P = r(() => i.variant === "centered" ? N.value : D.value.min), F = r(() => yi(M.value, D.value)), L = r(() => yi(P.value, D.value)), R = r(() => xi(F.value)), z = r(() => i.variant === "standard" ? "0%" : xi(L.value)), B = r(() => Math.sign(F.value - L.value)), V = r(() => B.value >= 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), H = r(() => B.value > 0 ? `max(0px, calc(${R.value} - ${z.value} - var(--mat-slider-handle-track-gap)))` : B.value < 0 ? `max(0px, calc(${z.value} - ${R.value} - var(--mat-slider-handle-track-gap)))` : "0px"), U = r(() => B.value > 0 ? z.value : `max(0px, calc(${R.value} - var(--mat-slider-handle-track-gap)))`), W = r(() => B.value < 0 ? z.value : `calc(${R.value} + var(--mat-slider-handle-track-gap))`), G = r(() => B.value < 0 ? `calc(100% - ${z.value})` : `max(0px, calc(100% - ${R.value} - var(--mat-slider-handle-track-gap)))`), K = r(() => i.showStopIndicator ? Si(D.value, k.value) : i.variant === "centered" ? [D.value.min, D.value.max] : [D.value.max]), q = r(() => i.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(i.size)), J = r(() => i.size === "extra-large" ? 32 : 24), Y = r(() => i.showValueIndicator && (g.value || C.value)), te = r(() => ({
			...E.value,
			"--mat-slider-active-visible-size": H.value,
			"--mat-slider-active-visible-start": V.value,
			"--mat-slider-center-position": z.value,
			"--mat-slider-inactive-after-size": G.value,
			"--mat-slider-inactive-after-start": W.value,
			"--mat-slider-inactive-before-size": U.value,
			"--mat-slider-position": R.value
		}));
		function X(e, t) {
			let n = g.value ? x.value : j.value;
			return e === void 0 || e === n ? !1 : (g.value && (x.value = e), c("update:modelValue", e), c("input", t), !0);
		}
		function ne(e) {
			return f.value ? X(Ci(e, f.value, D.value, k.value, i.orientation), e) : !1;
		}
		let re = ti((e) => {
			S.value = ne(e) || S.value;
		});
		function ie(e) {
			i.disabled || (re.cancel(), y.value = e.pointerId, x.value = j.value, S.value = !1, g.value = !0, m.value?.focus(), f.value?.setPointerCapture?.(e.pointerId), S.value = ne(e));
		}
		function ae(e) {
			!g.value || e.pointerId !== y.value || re.schedule(e);
		}
		function oe(e, t) {
			!g.value || e.pointerId !== y.value || (t ? (re.flush(), S.value = ne(e) || S.value) : re.cancel(), t && S.value && c("change", e), g.value = !1, S.value = !1, y.value = void 0, x.value = void 0);
		}
		b(() => {
			re.cancel();
		});
		function se(e) {
			if (i.disabled) return;
			let t = wi(j.value, e.key, D.value, k.value);
			t !== void 0 && (e.preventDefault(), X(t, e) && c("change", e));
		}
		return (n, r) => (w(), o("div", h(I(l), {
			class: ["mat-slider", [
				`mat-slider--${I(i).orientation}`,
				`mat-slider--size-${I(i).size}`,
				`mat-slider--${I(i).variant}`,
				{
					"mat-slider--disabled": I(i).disabled,
					"mat-slider--dragging": g.value,
					"mat-slider--use-cursor": I(T).useCursor
				}
			]],
			style: te.value
		}), [
			s("span", Ei, [
				r[6] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				s("span", { class: _(["mat-slider__active-track", { "mat-slider__active-track--from-start": I(i).variant === "standard" }]) }, null, 2),
				r[7] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(K.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(P.value, M.value) && e <= Math.max(P.value, M.value) }]),
					style: v({ "--mat-slider-stop-position": I(xi)(I(yi)(e, D.value)) })
				}, null, 6))), 128)),
				q.value ? (w(), o(t, { key: 0 }, [s("span", Di, [u(ze, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: I(i).insetIcon,
					"optical-size": J.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), s("span", Oi, [u(ze, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: I(i).insetIcon,
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
			u(Ut, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(M.value),
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
				onLostpointercapture: r[0] ||= (e) => oe(e, !1),
				onPointercancel: r[1] ||= (e) => oe(e, !1),
				onPointerdown: ie,
				onPointermove: ae,
				onPointerup: r[2] ||= (e) => oe(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "nativeInput",
				ref: m,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": I(l)["aria-label"],
				"aria-orientation": I(i).orientation,
				"aria-valuemax": D.value.max,
				"aria-valuemin": D.value.min,
				"aria-valuenow": M.value,
				disabled: I(i).disabled,
				max: D.value.max,
				min: D.value.min,
				step: k.value,
				value: M.value,
				onBlur: r[3] ||= (e) => C.value = !1,
				onFocus: r[4] ||= (e) => C.value = !0,
				onKeydown: se
			}, null, 40, ki)
		], 16));
	}
}), [["__scopeId", "data-v-b04bde43"]]), ji = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, Mi = [
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
], Ni = [
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
], Pi = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: di
		},
		min: {
			type: Number,
			default: 0,
			validator: oi
		},
		max: {
			type: Number,
			default: 100,
			validator: oi
		},
		step: {
			type: Number,
			default: 1,
			validator: si
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: me
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: ci
		},
		size: {
			type: String,
			default: "extra-small",
			validator: li
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
			return di(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = $("rangeSlider", e), a = n, c = ee(), l = O([]), d = O(null), f = O(null), m = O(null), g = O(0), y = O(void 0), x = O(!1), S = O(void 0), C = O(void 0), T = O(!1), E = p(Q, Z), { colorStyle: D } = Ie(r(() => i.color)), k = r(() => mi(i.min, i.max)), j = r(() => hi(i.step)), M = r(() => Ti(i.modelValue?.[0], i.modelValue?.[1], k.value, j.value)), N = r(() => x.value ? C.value : M.value), P = r(() => yi(N.value[0], k.value)), F = r(() => yi(N.value[1], k.value)), L = r(() => xi(P.value)), R = r(() => xi(F.value)), z = r(() => i.showStopIndicator ? Si(k.value, j.value) : [k.value.min, k.value.max]), B = r(() => l.value[g.value] ?? null), V = r(() => N.value[g.value]), H = r(() => i.showValueIndicator && (x.value || y.value === g.value)), U = r(() => ({
			...D.value,
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
			let [t, n] = N.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function K(e, t, n) {
			if (t === void 0) return !1;
			let [r, i] = x.value ? C.value : M.value, o = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === i ? !1 : (x.value && (C.value = o), a("update:modelValue", o), a("input", n), !0);
		}
		function q(e) {
			if (!d.value) return !1;
			let t = Ci(e, d.value, k.value, j.value, i.orientation);
			return K(g.value, t, e);
		}
		let J = ti((e) => {
			T.value = q(e) || T.value;
		});
		function Y(e) {
			if (i.disabled || !d.value) return;
			J.cancel();
			let t = Ci(e, d.value, k.value, j.value, i.orientation);
			t !== void 0 && (g.value = G(t), S.value = e.pointerId, C.value = [...M.value], T.value = !1, x.value = !0, W(g.value)?.focus(), d.value.setPointerCapture?.(e.pointerId), T.value = K(g.value, t, e));
		}
		function te(e) {
			!x.value || e.pointerId !== S.value || J.schedule(e);
		}
		function X(e, t) {
			!x.value || e.pointerId !== S.value || (t ? (J.flush(), T.value = q(e) || T.value) : J.cancel(), t && T.value && a("change", e), x.value = !1, T.value = !1, S.value = void 0, C.value = void 0);
		}
		b(() => {
			J.cancel();
		});
		function ne(e, t) {
			if (i.disabled) return;
			let n = wi(M.value[e], t.key, k.value, j.value);
			n !== void 0 && (t.preventDefault(), g.value = e, K(e, n, t) && a("change", t));
		}
		function re(e) {
			g.value = e, y.value = e;
		}
		function ie(e) {
			y.value === e && (y.value = void 0);
		}
		function ae(e, t) {
			l.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (e, n) => (w(), o("div", h(I(c), {
			class: ["mat-range-slider", [
				`mat-range-slider--${I(i).orientation}`,
				`mat-range-slider--size-${I(i).size}`,
				{
					"mat-range-slider--disabled": I(i).disabled,
					"mat-range-slider--dragging": x.value,
					"mat-range-slider--use-cursor": I(E).useCursor
				}
			]],
			style: U.value
		}), [
			s("span", ji, [
				n[10] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				n[11] ||= s("span", { class: "mat-range-slider__active-track" }, null, -1),
				n[12] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(z.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= N.value[0] && e <= N.value[1] }]),
					style: v({ "--mat-range-slider-stop-position": I(xi)(I(yi)(e, k.value)) })
				}, null, 6))), 128)),
				(w(!0), o(t, null, A(N.value, (e, t) => (w(), o("span", {
					key: t,
					ref_for: !0,
					ref: (e) => ae(t, e),
					class: _(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": g.value === t }]])
				}, [...n[9] ||= [s("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			u(Ut, {
				class: "mat-range-slider__value-indicator",
				"data-slider-value-indicator": "",
				content: String(V.value),
				location: I(i).orientation === "vertical" ? "right" : "top",
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
				onLostpointercapture: n[0] ||= (e) => X(e, !1),
				onPointercancel: n[1] ||= (e) => X(e, !1),
				onPointerdown: Y,
				onPointermove: te,
				onPointerup: n[2] ||= (e) => X(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "startInput",
				ref: f,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": I(i).ariaLabelStart,
				"aria-orientation": I(i).orientation,
				"aria-valuemax": N.value[1],
				"aria-valuemin": k.value.min,
				"aria-valuenow": N.value[0],
				disabled: I(i).disabled,
				max: N.value[1],
				min: k.value.min,
				step: j.value,
				value: N.value[0],
				onBlur: n[3] ||= (e) => ie(0),
				onFocus: n[4] ||= (e) => re(0),
				onKeydown: n[5] ||= (e) => ne(0, e)
			}, null, 40, Mi),
			s("input", {
				ref_key: "endInput",
				ref: m,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": I(i).ariaLabelEnd,
				"aria-orientation": I(i).orientation,
				"aria-valuemax": k.value.max,
				"aria-valuemin": N.value[0],
				"aria-valuenow": N.value[1],
				disabled: I(i).disabled,
				max: k.value.max,
				min: N.value[0],
				step: j.value,
				value: N.value[1],
				onBlur: n[6] ||= (e) => ie(1),
				onFocus: n[7] ||= (e) => re(1),
				onKeydown: n[8] ||= (e) => ne(1, e)
			}, null, 40, Ni)
		], 16));
	}
}), [["__scopeId", "data-v-83737de8"]]), Fi = ["inert", "aria-hidden"], Ii = { class: "mat-text-input__container" }, Li = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, Ri = {
	key: 0,
	class: "mat-text-input__outline-label mat-sys-typescale-body-small"
}, zi = { key: 0 }, Bi = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, Vi = {
	key: 0,
	"aria-hidden": "true"
}, Hi = { class: "mat-text-input__control-row" }, Ui = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, Wi = {
	key: 3,
	class: "mat-text-input__affix mat-text-input__suffix"
}, Gi = { class: "mat-text-input__supporting-text" }, Ki = {
	key: 0,
	class: "mat-text-input__counter"
}, qi = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatTextInputBase",
	inheritAttrs: !1
}, {
	__name: "MatTextInputBase",
	props: {
		control: {
			type: String,
			required: !0,
			validator(e) {
				return [
					"custom",
					"input",
					"textarea"
				].includes(e);
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
		},
		customFocused: {
			type: Boolean,
			default: !1
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = e, c = t, u = ee(), d = O(!1), f = O(n.modelValue), p = O(), m = L(), y = `${m}-supporting`, x = r(() => u.id || m), { colorStyle: C } = Ie(r(() => n.color)), T = r(() => !!u.placeholder), E = r(() => n.control === "custom" ? n.customFocused : d.value), D = r(() => E.value || f.value.length > 0 || T.value), k = r(() => n.error ? n.errorText : n.supportingText), A = r(() => !!k.value || n.maxLength !== void 0), N = r(() => {
			let e = [u["aria-describedby"]];
			return A.value && e.push(y), e.filter(Boolean).join(" ") || void 0;
		}), P = r(() => [C.value, u.style]), I = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), R = r(() => Object.fromEntries(Object.entries(u).filter(([e]) => !I.has(e)))), B, H;
		function U(e) {
			return Number.parseFloat(e) || 0;
		}
		function W() {
			let e = p.value?.getInput();
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
		z(() => n.modelValue, (e) => {
			f.value = e, G();
		}), z(() => [
			n.autoGrow,
			n.label,
			n.maxRows,
			n.noResize,
			n.resizeMinRows,
			n.rows
		], G), S(() => {
			W(), !(n.control === "custom" || typeof globalThis.ResizeObserver != "function") && (B = new globalThis.ResizeObserver(K), B.observe(p.value.getInput()));
		}), b(() => {
			B?.disconnect();
		});
		function q() {
			n.control !== "custom" && p.value?.focusInput();
		}
		function J(e) {
			f.value = e, c("update:modelValue", e), G();
		}
		return (t, n) => (w(), o("div", {
			class: _(["mat-text-input mat-sys-typescale-body-large", [
				t.$attrs.class,
				`mat-text-input--${e.variant}`,
				`mat-text-input--${e.control}`,
				{
					"mat-text-input--floating": D.value,
					"mat-text-input--focused": E.value,
					"mat-text-input--error": e.error,
					"mat-text-input--disabled": e.disabled
				}
			]]),
			style: v(P.value),
			inert: t.$attrs.inert,
			"aria-hidden": t.$attrs["aria-hidden"]
		}, [s("div", Ii, [
			e.variant === "outlined" ? (w(), o("fieldset", Li, [D.value && e.label ? (w(), o("legend", Ri, [l(F(e.label), 1), e.required ? (w(), o("span", zi, " *")) : a("", !0)])) : a("", !0)])) : a("", !0),
			e.variant === "filled" ? (w(), o("span", Bi)) : a("", !0),
			t.$slots.leading ? (w(), i(ze, {
				key: 2,
				as: "span",
				class: "mat-text-input__icon mat-text-input__leading",
				"optical-size": 24,
				size: "24px"
			}, {
				default: V(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : a("", !0),
			(w(), i(M(e.control === "custom" ? "div" : "label"), {
				class: "mat-text-input__main",
				for: e.control === "custom" ? void 0 : x.value,
				onClick: q
			}, {
				default: V(() => [e.label ? (w(), o("span", {
					key: 0,
					class: _(["mat-text-input__label", D.value ? "mat-sys-typescale-body-small" : "mat-sys-typescale-body-large"])
				}, [l(F(e.label), 1), e.required ? (w(), o("span", Vi, " *")) : a("", !0)], 2)) : a("", !0), s("span", Hi, [
					e.prefixText ? (w(), o("span", Ui, F(e.prefixText), 1)) : a("", !0),
					e.control === "custom" ? j(t.$slots, "control", {
						key: 1,
						controlId: x.value,
						describedBy: N.value
					}, void 0, !0) : (w(), i(yn, h({
						key: 2,
						ref_key: "controlElement",
						ref: p
					}, R.value, {
						class: "mat-text-input__control",
						"aria-describedby": N.value,
						"aria-invalid": e.error ? "true" : void 0,
						disabled: e.disabled,
						id: x.value,
						"max-length": e.maxLength,
						readonly: e.readonly,
						required: e.required,
						rows: e.control === "textarea" ? e.rows : void 0,
						type: e.control === "input" ? e.type : void 0,
						control: e.control,
						"model-value": e.modelValue,
						onBlur: n[0] ||= (e) => d.value = !1,
						onFocus: n[1] ||= (e) => d.value = !0,
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
					])),
					e.suffixText ? (w(), o("span", Wi, F(e.suffixText), 1)) : a("", !0)
				])]),
				_: 3
			}, 8, ["for"])),
			t.$slots.trailing ? (w(), i(ze, {
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
			id: y,
			class: "mat-text-input__supporting mat-sys-typescale-body-small"
		}, [s("span", Gi, F(k.value), 1), e.maxLength === void 0 ? a("", !0) : (w(), o("span", Ki, F(e.modelValue.length) + " / " + F(e.maxLength), 1))])) : a("", !0)], 14, Fi));
	}
}), [["__scopeId", "data-v-53234380"]]), Ji = ["filled", "outlined"], Yi = {
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
			return Ji.includes(e);
		}
	},
	color: {
		type: String,
		default: void 0,
		validator: me
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
}, Xi = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...Yi,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = $("textField", e), r = t;
		return (e, t) => (w(), i(qi, h({
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
}), Zi = 200, Qi = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: me
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => We(e, {
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
		let i = $("menu", e), s = n, c = ee(), l = R(), d = p(Sr, null), f = p(xr, null), m = p(tt, null), _ = O(null), y = O(null), x = O(null), E = P(null), D = r(() => x.value?.root ?? x.value?.$el ?? null), k = L().replace(/[^\w-]/g, "-"), A = r(() => c.id ?? `${k}-menu`), M = `--mat-menu-anchor-${k}`, N = O(!1), F = O("closed"), B = f?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, H = O(0), U = /* @__PURE__ */ new Map(), W = null, G = "", K = !1, q = !1, J = !1, Y = et(), te, X, ne = null, re = !1, ie = !1, Z = r(() => !!d), Q = r(() => !!l.activator), ae = r(() => !Z.value && !Q.value && xe(i.anchor)), oe = r(() => H.value > 0), se = r(() => !Z.value && i.scrim), ce = r(() => !se.value || !!m), le = r(() => se.value ? "manual" : "auto"), ue = r(() => Z.value ? N.value : i.modelValue), de = r(() => i.variant ?? f?.variant.value ?? "standard"), fe = r(() => i.color ?? f?.color.value), pe = r(() => i.closeOnClick), { colorStyle: me } = Ie(fe), he = r(() => {
			if (i.maxLength === void 0) return;
			let e = Ge(i.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))`;
			return {
				"--mat-menu-resolved-max-length": t,
				maxBlockSize: t
			};
		}), ge = r(() => {
			let [e, t] = xe(i.offset) ? i.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: ae.value ? "auto" : M
			};
			return ae.value && xe(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), _e = r(() => {
			let e = E.value;
			if (e) return {
				"--mat-menu-viewport-width": `${e.width}px`,
				"--mat-menu-viewport-height": `${e.height}px`
			};
		}), ve = r(() => {
			let e = E.value;
			if (e) return {
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			};
		}), ye = r(() => [
			me.value,
			ge.value,
			_e.value,
			c.style,
			he.value
		]), be = ir({
			root: D,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === D.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function xe(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function Se() {
			if (Z.value) return d.element.value;
			if (Q.value) {
				let e = _.value ? [..._.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function Ce() {
			W && (G ? W.style.setProperty("anchor-name", G) : W.style.removeProperty("anchor-name"), W = null, G = "");
		}
		function we() {
			let e = Se();
			return e ? W === e ? e : (Ce(), W = e, G = e.style.getPropertyValue("anchor-name"), e.style.setProperty("anchor-name", M), e) : null;
		}
		function Te() {
			Y.cancel();
		}
		function Ee() {
			!se.value || !y.value || q || (q = !0, y.value.showPopover?.());
		}
		function De() {
			q && (q = !1, y.value?.hidePopover?.());
		}
		function Oe() {
			D.value && K && (K = !1, J = !0, D.value.hidePopover?.()), De(), F.value = "closed";
		}
		function ke() {
			De(), F.value = "closed";
		}
		function Ae() {
			F.value = "closing", Y.wait(D.value, Zi, ke);
		}
		function je({ immediate: e = !1 } = {}) {
			if (!(!D.value || !K)) {
				if (J = !0, Re({ immediate: !0 }), e) {
					Te(), Oe();
					return;
				}
				F.value !== "closing" && (F.value = "closing", Y.wait(D.value, Zi, Oe));
			}
		}
		function Me() {
			if (te = void 0, !D.value || !K) return;
			let e = E.value ?? {
				bottom: window.innerHeight,
				left: 0,
				right: window.innerWidth,
				top: 0,
				width: window.innerWidth,
				height: window.innerHeight
			}, t = D.value.style, n = D.value.getBoundingClientRect(), r = Number.parseFloat(t.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, i = Number.parseFloat(t.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, a = Number.parseFloat(getComputedStyle(D.value).getPropertyValue("--mat-menu-viewport-space")), o = Number.isFinite(a) ? a : 8, s = {
				bottom: n.bottom - i,
				left: n.left - r,
				right: n.right - r,
				top: n.top - i
			}, c = 0, l = 0;
			s.left < e.left + o ? c = e.left + o - s.left : s.right > e.right - o && (c = e.right - o - s.right), s.top < e.top + o ? l = e.top + o - s.top : s.bottom > e.bottom - o && (l = e.bottom - o - s.bottom), t.setProperty("--mat-menu-viewport-shift-x", `${c}px`), t.setProperty("--mat-menu-viewport-shift-y", `${l}px`);
		}
		function Ne() {
			if (!m) {
				E.value = null;
				return;
			}
			let e = m.getLayoutRect();
			E.value = e, y.value && Object.assign(y.value.style, {
				height: `${e.height}px`,
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`
			});
		}
		function Pe() {
			Ne(), te !== void 0 && cancelAnimationFrame(te), te = requestAnimationFrame(Me);
		}
		async function Fe() {
			Te(), J = !1, await g();
			let e = ae.value ? null : we(), t = ae.value || !!e;
			if (!D.value || !t) {
				Z.value || (console.warn(Q.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), s("update:modelValue", !1));
				return;
			}
			K || (ae.value && document.activeElement instanceof HTMLElement && (ne = document.activeElement), Ee(), K = !0, D.value.showPopover?.()), F.value = "open", Z.value && (d.submenuOpen.value = !0), be.refresh(), be.focusFirst(), Pe();
		}
		function Le() {
			let e = Se() ?? ne;
			ne = null, g(() => e?.focus());
		}
		function Re({ immediate: e = !1 } = {}) {
			U.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function ze({ focus: e = !0, immediate: t = !1 } = {}) {
			Re({ immediate: t }), Z.value ? (N.value = !1, d.submenuOpen.value = !1) : s("update:modelValue", !1), je({ immediate: t }), e && Le();
		}
		function Be() {
			if (f) {
				f.closeTree();
				return;
			}
			ze();
		}
		function Ve(e) {
			e.preventDefault(), ze();
		}
		function He(e) {
			let t = e.target;
			!(t instanceof Node) || D.value?.contains(t) || y.value?.contains(t) || W?.contains(t) || ze();
		}
		function Ue(e) {
			U.set(e.element, e), Er(Array.from(U.values()).filter((e) => !e.grouped)), be.queueRefresh();
		}
		function We(e) {
			U.delete(e.element), Er(Array.from(U.values()).filter((e) => !e.grouped)), be.queueRefresh();
		}
		function Ke() {
			H.value += 1, be.queueRefresh();
		}
		function qe() {
			H.value = Math.max(0, H.value - 1), be.queueRefresh();
		}
		function Je(e, { pointer: t = !1 } = {}) {
			U.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function Ye(e) {
			let t = getComputedStyle(D.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), be.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), be.focusFirst()) : e.key === "End" ? (e.preventDefault(), be.focusLast()) : e.key === "Escape" || Z.value && e.key === t ? (e.preventDefault(), ze()) : e.key === "Tab" && Be();
		}
		function Xe(e) {
			if (K = e.newState === "open", K) {
				Pe();
				return;
			}
			let t = J;
			J = !1, Re(), Z.value && (N.value = !1, d.submenuOpen.value = !1), !(!ue.value || t) && (Ae(), Z.value || s("update:modelValue", !1), Le());
		}
		T(xr, {
			closeOtherSubmenus: Je,
			closeTree: Be,
			closeOnClick: pe,
			color: fe,
			registerItem: Ue,
			registerGroup: Ke,
			unregisterItem: We,
			unregisterGroup: qe,
			pointerHistory: B,
			variant: de
		}), d && d.registerSubmenu({
			close: ze,
			element: D,
			id: A,
			open: Fe
		}), S(() => {
			be.observe(), window.addEventListener("resize", Pe), window.addEventListener("scroll", Pe, {
				capture: !0,
				passive: !0
			}), ue.value && (Qe(), nt()), typeof ResizeObserver < "u" && (X = new ResizeObserver(Pe), X.observe(D.value)), ue.value && Fe();
		}), C(() => {
			Z.value || !ue.value || ae.value || Se() !== W && (Ce(), Fe());
		}), b(() => {
			Te(), te !== void 0 && cancelAnimationFrame(te), X?.disconnect(), window.removeEventListener("resize", Pe), window.removeEventListener("scroll", Pe, { capture: !0 }), $e(), rt(), je({ immediate: !0 }), De(), Ce(), d?.unregisterSubmenu();
		});
		function Ze(e) {
			B.previous = B.current, B.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Qe() {
			f || re || (document.addEventListener("pointermove", Ze, !0), re = !0);
		}
		function $e() {
			re &&= (document.removeEventListener("pointermove", Ze, !0), !1);
		}
		function nt() {
			f || !ce.value || ie || (document.addEventListener("pointerdown", He, !0), ie = !0);
		}
		function rt() {
			ie &&= (document.removeEventListener("pointerdown", He, !0), !1);
		}
		return z(ue, (e) => {
			e ? (Qe(), nt(), Fe()) : ($e(), rt(), je());
		}), z(() => i.anchor, async () => {
			Ce(), ue.value && await Fe();
		}, { deep: !0 }), z(() => i.offset, async () => {
			ue.value && (await g(), Pe());
		}, { deep: !0 }), z(() => i.maxLength, async () => {
			ue.value && (await g(), Pe());
		}), z(() => i.scrim, async () => {
			Z.value || (D.value && K && (K = !1, J = !0, D.value.hidePopover?.()), De(), rt(), await g(), ue.value && (nt(), await Fe()));
		}), m && z(m.publicContext.layout, Pe), (e, n) => (w(), o(t, null, [
			!Z.value && Q.value ? (w(), o("span", {
				key: 0,
				ref_key: "activatorHost",
				ref: _,
				class: "mat-menu__activator"
			}, [j(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0),
			!Z.value && I(i).scrim ? (w(), o("div", {
				key: 1,
				ref_key: "scrimElement",
				ref: y,
				"aria-hidden": "true",
				class: "mat-menu__scrim",
				popover: "manual",
				style: v(ve.value),
				onPointerdown: Ve
			}, null, 36)) : a("", !0),
			u(Bn, h({
				id: A.value,
				ref_key: "surface",
				ref: x
			}, e.$attrs, {
				class: ["mat-menu", [`mat-menu--${de.value}`, {
					"mat-menu--coordinate": ae.value,
					"mat-menu--grouped": oe.value,
					"mat-menu--nested": Z.value,
					"mat-menu--closing": F.value === "closing"
				}]],
				style: ye.value,
				popover: le.value,
				role: "menu",
				onPointerenter: n[0] ||= (e) => I(d)?.cancelSubmenuClose(),
				onFocusin: I(be).handleFocusIn,
				onKeydown: Ye,
				onToggle: Xe
			}), {
				default: V(() => [u(Kr, {
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
}), [["__scopeId", "data-v-dc4a3369"]]), $i = { class: "mat-menu-item-host" }, ea = 300, ta = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		let n = $("menuItem", e), s = t, l = R(), d = p(xr, null), f = p(Cr, null), m = p(Q, Z), g = O(null), _ = r(() => g.value?.root ?? g.value?.$el ?? null), v = O(!1), y = O(void 0), x = O("only"), C, E, D = r(() => !!l.submenu);
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
				return Tr(d.pointerHistory.current, d.pointerHistory.previous, t, n) ? ea : 0;
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
		return T(Sr, {
			cancelSubmenuClose: A,
			element: _,
			registerSubmenu: N,
			submenuOpen: v,
			unregisterSubmenu: P
		}), S(() => {
			f?.registerItem(F), d?.registerItem(F);
		}), b(() => {
			clearTimeout(E), f?.unregisterItem(F), d?.unregisterItem(F);
		}), (e, t) => (w(), o("span", $i, [u(ne, h({
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
			default: V(() => [u(dr, {
				namespace: "mat-menu-item-content",
				"label-typography-class": "mat-sys-typescale-label-large",
				"line-count": e.$slots.supporting ? 2 : 1,
				"leading-icon": "",
				"supporting-typography-class": "mat-sys-typescale-body-small",
				"trailing-typography-class": "mat-sys-typescale-label-large"
			}, c({
				trailing: V(() => [e.$slots.trailing ? j(e.$slots, "trailing", { key: 0 }, void 0, !0) : D.value ? (w(), i(ze, {
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
}), [["__scopeId", "data-v-985e87a6"]]), na = ["aria-labelledby"], ra = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = $("menuGroup", e), n = ee(), i = p(xr, null), s = `${L().replace(/[^\w-]/g, "-")}-label`, c = r(() => t.label ? s : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), Er(Array.from(l));
		}
		function d(e) {
			l.delete(e), Er(Array.from(l));
		}
		return T(Cr, {
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
		}, F(I(t).label), 1)) : a("", !0), j(e.$slots, "default", {}, void 0, !0)], 16, na));
	}
}), [["__scopeId", "data-v-2026601d"]]), ia = [
	"id",
	"aria-describedby",
	"aria-label",
	"aria-disabled",
	"aria-expanded",
	"aria-invalid",
	"aria-readonly",
	"tabindex"
], aa = {
	key: 0,
	class: "mat-select__chips"
}, oa = {
	key: 1,
	class: "mat-select__value"
}, sa = {
	key: 2,
	class: "mat-select__placeholder"
}, ca = [
	"disabled",
	"multiple",
	"required"
], la = ["selected"], ua = [
	"disabled",
	"selected",
	"value"
], da = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
	name: "MatSelect",
	inheritAttrs: !1
}, {
	__name: "MatSelect",
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Boolean,
				Array
			],
			default: null,
			validator(e) {
				return e === null || ar(e) || Array.isArray(e) && e.every(ar);
			}
		},
		items: {
			type: Array,
			required: !0
		},
		multiple: {
			type: Boolean,
			default: !1
		},
		chips: {
			type: Boolean,
			default: !1
		},
		itemTitle: {
			type: String,
			default: "title"
		},
		itemValue: {
			type: String,
			default: "value"
		},
		itemSubtitle: {
			type: String,
			default: "subtitle"
		},
		label: {
			type: String,
			default: void 0
		},
		variant: {
			type: String,
			default: "outlined",
			validator: (e) => Ji.includes(e)
		},
		color: {
			type: String,
			default: void 0,
			validator: me
		},
		supportingText: {
			type: String,
			default: void 0
		},
		errorText: {
			type: String,
			default: void 0
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
		},
		placeholder: {
			type: String,
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (e) => e === null || ar(e) || Array.isArray(e) && e.every(ar),
		change: (e) => e === null || ar(e) || Array.isArray(e) && e.every(ar)
	},
	setup(e, { emit: n }) {
		let d = $("select", e), f = n, m = ee(), y = p(Q, Z), b = O(!1), x = O(!1), S = O(null), C = L().replace(/[^\w-]/g, "-"), T = r(() => m.id ?? `${C}-select`), E = r(() => ({
			form: m.form,
			name: m.name
		}));
		function D(e, t) {
			if (typeof e == "string") return {
				disabled: !1,
				group: t,
				subtitle: void 0,
				title: e,
				value: e
			};
			if (!e || typeof e != "object" || Array.isArray(e) || "items" in e) return null;
			let n = e[d.itemTitle], r = e[d.itemValue], i = e[d.itemSubtitle];
			return typeof n != "string" || !ar(r) ? null : {
				disabled: e.disabled === !0,
				group: t,
				subtitle: i === void 0 ? void 0 : String(i),
				title: n,
				value: r
			};
		}
		let k = r(() => {
			let e = [], t = [], n = [], r = /* @__PURE__ */ new Set();
			function i(t, i) {
				let a = D(t, i);
				if (a) {
					if (n.some((e) => Object.is(e, a.value)) || r.has(String(a.value))) {
						`${String(a.value)}`;
						return;
					}
					n.push(a.value), r.add(String(a.value)), e.push(a);
				}
			}
			return d.items.forEach((n) => {
				if (n && typeof n == "object" && !Array.isArray(n) && "items" in n) {
					if (typeof n.group != "string" || !Array.isArray(n.items)) return;
					let r = e.length;
					n.items.forEach((e) => i(e, n.group)), e.length > r && t.push({
						label: n.group,
						options: e.slice(r)
					});
					return;
				}
				i(n, void 0);
			}), {
				groups: t,
				options: e,
				ungrouped: e.filter((e) => e.group === void 0)
			};
		}), M = r(() => k.value.options.filter((e) => d.multiple ? Array.isArray(d.modelValue) && d.modelValue.some((t) => Object.is(t, e.value)) : Object.is(d.modelValue, e.value))), N = r(() => M.value.map((e) => e.title).join(",")), P = r(() => M.value.length > 0), R = `${C}-menu`;
		z(() => [d.modelValue, d.multiple], ([e, t]) => {}, { immediate: !0 });
		function B(e) {
			return M.value.some((t) => Object.is(t.value, e));
		}
		function H(e) {
			if (d.disabled || d.readonly) return;
			let t;
			if (d.multiple) {
				let n = Array.isArray(d.modelValue) ? d.modelValue : [];
				t = n.some((t) => Object.is(t, e)) ? n.filter((t) => !Object.is(t, e)) : [...n, e];
			} else t = e, b.value = !1;
			f("update:modelValue", t), f("change", t);
		}
		function W() {
			d.disabled || d.readonly || (b.value = !b.value);
		}
		function G(e) {
			[
				"Enter",
				" ",
				"ArrowDown",
				"ArrowUp"
			].includes(e.key) && (e.preventDefault(), b.value || W());
		}
		function K(e) {
			d.disabled || d.readonly || (d.multiple ? H(e) : (f("update:modelValue", null), f("change", null)), g(() => S.value?.focus()));
		}
		return (e, n) => (w(), o("div", {
			class: _(["mat-select", [{ "mat-select--use-cursor": I(y).useCursor }, e.$attrs.class]]),
			style: v(e.$attrs.style)
		}, [
			u(qi, {
				id: T.value,
				control: "custom",
				"model-value": N.value,
				label: I(d).label,
				variant: I(d).variant,
				color: I(d).color,
				"supporting-text": I(d).supportingText,
				"error-text": I(d).errorText,
				disabled: I(d).disabled,
				readonly: I(d).readonly,
				required: I(d).required,
				error: I(d).error,
				"custom-focused": x.value || b.value,
				placeholder: I(d).placeholder
			}, c({
				control: V(({ controlId: r, describedBy: a }) => [s("div", {
					id: r,
					ref_key: "trigger",
					ref: S,
					class: "mat-select__trigger mat-text-input__control",
					role: "combobox",
					"aria-controls": R,
					"aria-describedby": a,
					"aria-label": e.$attrs["aria-label"] ?? I(d).label,
					"aria-disabled": I(d).disabled ? "true" : void 0,
					"aria-expanded": String(b.value),
					"aria-invalid": I(d).error ? "true" : void 0,
					"aria-haspopup": "menu",
					"aria-readonly": I(d).readonly ? "true" : void 0,
					tabindex: I(d).disabled ? -1 : 0,
					onBlur: n[1] ||= (e) => x.value = !1,
					onClick: W,
					onFocus: n[2] ||= (e) => x.value = !0,
					onKeydown: G
				}, [
					I(d).chips && P.value ? (w(), o("span", aa, [(w(!0), o(t, null, A(M.value, (e) => (w(), i(Ur, {
						key: `${typeof e.value}:${String(e.value)}`,
						variant: "input",
						selected: B(e.value),
						disabled: I(d).disabled || I(d).readonly,
						onClick: n[0] ||= U(() => {}, ["stop"]),
						onRemove: (t) => K(e.value)
					}, {
						default: V(() => [l(F(e.title), 1)]),
						_: 2
					}, 1032, [
						"selected",
						"disabled",
						"onRemove"
					]))), 128))])) : P.value ? (w(), o("span", oa, F(N.value), 1)) : (w(), o("span", sa, F(I(d).placeholder), 1)),
					n[4] ||= s("span", { class: "mat-select__spacer" }, null, -1),
					u(ze, {
						as: "span",
						icon: "arrow_drop_down",
						"optical-size": 24,
						size: "24px",
						"aria-hidden": "true"
					})
				], 40, ia)]),
				_: 2
			}, [e.$slots.leading ? {
				name: "leading",
				fn: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, e.$slots.trailing ? {
				name: "trailing",
				fn: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
				key: "1"
			} : void 0]), 1032, [
				"id",
				"model-value",
				"label",
				"variant",
				"color",
				"supporting-text",
				"error-text",
				"disabled",
				"readonly",
				"required",
				"error",
				"custom-focused",
				"placeholder"
			]),
			s("select", h(E.value, {
				class: "mat-select__native",
				disabled: I(d).disabled,
				multiple: I(d).multiple,
				required: I(d).required,
				tabindex: "-1",
				"aria-hidden": "true"
			}), [I(d).multiple ? a("", !0) : (w(), o("option", {
				key: 0,
				value: "",
				selected: !P.value
			}, null, 8, la)), (w(!0), o(t, null, A(k.value.options, (e) => (w(), o("option", {
				key: `${typeof e.value}:${String(e.value)}`,
				disabled: e.disabled,
				selected: B(e.value),
				value: String(e.value)
			}, F(e.title), 9, ua))), 128))], 16, ca),
			u(Qi, {
				id: R,
				modelValue: b.value,
				"onUpdate:modelValue": n[3] ||= (e) => b.value = e,
				anchor: T.value,
				"close-on-click": !I(d).multiple
			}, {
				default: V(() => [k.value.groups.length === 0 ? (w(!0), o(t, { key: 0 }, A(k.value.ungrouped, (e) => (w(), i(ta, {
					key: `${typeof e.value}:${String(e.value)}`,
					disabled: e.disabled,
					onClick: (t) => H(e.value)
				}, c({
					default: V(() => [l(" " + F(e.title) + " ", 1)]),
					_: 2
				}, [I(d).multiple ? {
					name: "leading",
					fn: V(() => [u(Nr, {
						"aria-hidden": "true",
						inert: "",
						tabindex: "-1",
						"model-value": B(e.value)
					}, null, 8, ["model-value"])]),
					key: "0"
				} : void 0, e.subtitle ? {
					name: "supporting",
					fn: V(() => [l(F(e.subtitle), 1)]),
					key: "1"
				} : void 0]), 1032, ["disabled", "onClick"]))), 128)) : k.value.ungrouped.length > 0 ? (w(), i(ra, { key: 1 }, {
					default: V(() => [(w(!0), o(t, null, A(k.value.ungrouped, (e) => (w(), i(ta, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						onClick: (t) => H(e.value)
					}, c({
						default: V(() => [l(" " + F(e.title) + " ", 1)]),
						_: 2
					}, [I(d).multiple ? {
						name: "leading",
						fn: V(() => [u(Nr, {
							"aria-hidden": "true",
							inert: "",
							tabindex: "-1",
							"model-value": B(e.value)
						}, null, 8, ["model-value"])]),
						key: "0"
					} : void 0, e.subtitle ? {
						name: "supporting",
						fn: V(() => [l(F(e.subtitle), 1)]),
						key: "1"
					} : void 0]), 1032, ["disabled", "onClick"]))), 128))]),
					_: 1
				})) : a("", !0), (w(!0), o(t, null, A(k.value.groups, (e) => (w(), i(ra, {
					key: e.label,
					label: e.label
				}, {
					default: V(() => [(w(!0), o(t, null, A(e.options, (e) => (w(), i(ta, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						onClick: (t) => H(e.value)
					}, c({
						default: V(() => [l(" " + F(e.title) + " ", 1)]),
						_: 2
					}, [I(d).multiple ? {
						name: "leading",
						fn: V(() => [u(Nr, {
							"aria-hidden": "true",
							inert: "",
							tabindex: "-1",
							"model-value": B(e.value)
						}, null, 8, ["model-value"])]),
						key: "0"
					} : void 0, e.subtitle ? {
						name: "supporting",
						fn: V(() => [l(F(e.subtitle), 1)]),
						key: "1"
					} : void 0]), 1032, ["disabled", "onClick"]))), 128))]),
					_: 2
				}, 1032, ["label"]))), 128))]),
				_: 1
			}, 8, [
				"modelValue",
				"anchor",
				"close-on-click"
			])
		], 6));
	}
}), [["__scopeId", "data-v-a884bbfb"]]), fa = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...Yi,
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
		return (e, t) => (w(), i(qi, h({
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
}), pa = P([]), ma = P(0), ha = Symbol("mat-dialog-document-scope"), ga = /* @__PURE__ */ new WeakMap(), _a = /* @__PURE__ */ new Map();
function va(e) {
	return _a.has(e) || _a.set(e, {
		count: 0,
		inert: !1,
		inertElement: null,
		lockedScrollbarGutter: null,
		overflow: "",
		scrollbarGutter: ""
	}), _a.get(e);
}
function ya(e, t) {
	let n = va(e);
	!t || t === n.inertElement || (n.inertElement && !n.inert && n.inertElement.removeAttribute("inert"), _a.set(e, {
		...n,
		inert: t.hasAttribute("inert"),
		inertElement: t
	}), t.setAttribute("inert", ""));
}
function ba(e) {
	let t = _a.get(e);
	t?.inertElement && (t.inert || t.inertElement.removeAttribute("inert"), _a.set(e, {
		...t,
		inert: !1,
		inertElement: null
	}));
}
function xa(e) {
	let t = va(e), n = document.documentElement, r = n.clientWidth > 0 ? Math.max(0, window.innerWidth - n.clientWidth) : 0, i = getComputedStyle(n).scrollbarGutter, a = r > 0 && !i.includes("stable") ? "stable" : null;
	_a.set(e, {
		...t,
		lockedScrollbarGutter: a,
		overflow: n.style.overflow,
		scrollbarGutter: n.style.scrollbarGutter
	}), a && (n.style.scrollbarGutter = a, ma.value = r), n.style.overflow = "hidden";
}
function Sa(e) {
	let t = _a.get(e);
	if (!t) return;
	let n = document.documentElement;
	n.style.overflow === "hidden" && (n.style.overflow = t.overflow), t.lockedScrollbarGutter !== null && n.style.scrollbarGutter === t.lockedScrollbarGutter && (n.style.scrollbarGutter = t.scrollbarGutter), t.lockedScrollbarGutter !== null && (ma.value = 0);
}
function Ca(e) {
	let t = e, n = va(e), r = getComputedStyle(t), i = (Number.parseFloat(r.borderLeftWidth) || 0) + (Number.parseFloat(r.borderRightWidth) || 0), a = Math.max(0, t.offsetWidth - t.clientWidth - i) > 0 && !r.scrollbarGutter.includes("stable") ? "stable" : null;
	_a.set(e, {
		...n,
		lockedScrollbarGutter: a,
		overflow: t.style.overflow,
		scrollbarGutter: t.style.scrollbarGutter
	}), a && (t.style.scrollbarGutter = a), t.style.overflow = "hidden";
}
function wa(e) {
	let t = e, n = _a.get(e);
	n && (t.style.overflow === "hidden" && (t.style.overflow = n.overflow), n.lockedScrollbarGutter !== null && t.style.scrollbarGutter === n.lockedScrollbarGutter && (t.style.scrollbarGutter = n.scrollbarGutter));
}
function Ta(e) {
	let t = _a.get(e);
	!t || t.count > 0 || (e === ha ? Sa(e) : wa(e), ba(e), _a.delete(e));
}
function Ea() {
	[..._a.keys()].forEach((e) => {
		e === ha ? Sa(e) : wa(e), ba(e);
	}), _a.clear();
}
function Da({ inertElement: e = null, scrollElement: t } = {}) {
	let n = t instanceof HTMLElement ? t : ha, r = va(n);
	r.count === 0 ? (n === ha ? xa(n) : Ca(n), ya(n, e)) : e && r.inertElement !== e && ya(n, e);
	let i = va(n);
	_a.set(n, {
		...i,
		count: i.count + 1
	});
}
function Oa(e) {
	let t = e?.scrollElement instanceof HTMLElement ? e.scrollElement : ha, n = _a.get(t);
	n && (_a.set(t, {
		...n,
		count: Math.max(0, n.count - 1)
	}), Ta(t));
}
function ka(e, t) {
	let n = pa.value.filter((e) => e.isConnected);
	if (n.length === 0 && Ea(), n.includes(e)) {
		pa.value = n;
		return;
	}
	ga.set(e, t), pa.value = [...n, e], Da(t);
}
function Aa(e) {
	let t = ga.get(e);
	ga.delete(e), pa.value = pa.value.filter((t) => t !== e && t.isConnected), t && Oa(t), pa.value.length === 0 && Ea();
}
//#endregion
//#region src/components/use-focus-trap.js
var ja = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
function Ma(e, t) {
	let n = null, r = !1;
	function i() {
		let t = e.value;
		return t ? [...t.querySelectorAll(ja)].filter((e) => e instanceof HTMLElement) : [];
	}
	function a(t) {
		if (t.key !== "Tab") return;
		let n = i(), r = e.value;
		if (!r) return;
		if (n.length === 0) {
			t.preventDefault(), r.focus();
			return;
		}
		let a = n[0], o = n[n.length - 1], s = document.activeElement, c = s instanceof Node && r.contains(s);
		t.shiftKey && (!c || s === a) ? (t.preventDefault(), o.focus()) : !t.shiftKey && (!c || s === o) && (t.preventDefault(), a.focus());
	}
	function o(r) {
		let i = e.value, { target: a } = r;
		if (t.value) {
			if (!i || a instanceof Node && i.contains(a)) {
				a instanceof HTMLElement && (n = a);
				return;
			}
			(n instanceof HTMLElement && n.isConnected ? n : i).focus();
		}
	}
	function s() {
		r ||= (e.value?.addEventListener("keydown", a), document.addEventListener("focusin", o, !0), !0);
	}
	function c() {
		r && (e.value?.removeEventListener("keydown", a), document.removeEventListener("focusin", o, !0), r = !1, n = null);
	}
	z(t, (e) => {
		e ? s() : c();
	}, { immediate: !0 }), b(c);
}
var Na = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-61d08a89"]]), Pa = { class: "mat-dialog__header" }, Fa = {
	key: 1,
	class: "mat-dialog__actions"
}, Ia = {
	key: 0,
	class: "mat-dialog__content mat-sys-typescale-body-medium"
}, La = {
	key: 2,
	class: "mat-dialog__content mat-sys-typescale-body-medium"
}, Ra = {
	key: 3,
	class: "mat-dialog__actions"
}, za = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: (e) => We(e, {
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
			validator: me
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: c }) {
		let f = $("dialog", e), m = c, _ = ee(), y = R(), x = d(), C = p(tt, null), T = Object.prototype.hasOwnProperty.call(x?.vnode.props ?? {}, "attach"), E = O(null), D = O(null), k = O(!1), A = O("closed"), M = O(null), N = P(null), H = `${L().replace(/[^\w-]/g, "-")}-title`, U = r(() => D.value?.root ?? D.value?.$el ?? null), W = r(() => !!N.value), G = r(() => f.title !== void 0 || !!y.title), K = r(() => f.content !== void 0 || !!y.default), q = r(() => !f.fullScreen && (f.icon !== void 0 || !!y.icon)), J = r(() => !!y.activator), Y = r(() => pa.value.at(-1) === U.value), { colorStyle: te } = Ie(r(() => f.color)), X = r(() => {
			if (f.fullScreen || f.width === void 0) return;
			let e = Ge(f.width, {
				property: "inline-size",
				positive: !0
			});
			if (e !== void 0) return {
				inlineSize: `min(${e}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), ne = r(() => [_.style]), re = r(() => [te.value, X.value]), ie = !1, Z = et(), Q = null;
		Ma(U, r(() => k.value && Y.value));
		function ae() {
			let e = E.value ? [...E.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function oe() {
			Z.cancel();
		}
		function se(e, t) {
			Z.wait(U.value, e, t);
		}
		function ce() {
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return f.attach instanceof HTMLElement && f.attach.ownerDocument === document ? f.attach : null;
		}
		function le(e) {
			if (C && !T) return {
				context: C,
				target: C.modalLayer.value
			};
			if (T) {
				let t = e ? at(e) : null;
				if (t) return {
					context: t,
					target: t.modalLayer.value
				};
			}
			return null;
		}
		function ue(e) {
			return {
				inertElement: e.contentElement.value,
				scrollElement: e.documentMode.value ? null : e.contentElement.value
			};
		}
		function de() {
			m("update:modelValue", !1);
		}
		function fe() {
			G.value || _["aria-label"] || _["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function pe() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function me() {
			let e = U.value;
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
		async function he() {
			if (oe(), k.value && U.value?.open) {
				A.value = "opening", se(400, () => {
					A.value = "open", m("opened");
				});
				return;
			}
			let e = J.value ? ae() : null;
			if (J.value && !e) {
				pe(), de();
				return;
			}
			let t = ce(), n = le(t), r = n ? n.target : t;
			if (!r) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), de();
				return;
			}
			Q = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), N.value = n, M.value = r, k.value = !0, A.value = "opening", fe(), await g(), !(!f.modelValue || !U.value) && (U.value.open || U.value.show(), ka(U.value, n ? ue(n.context) : void 0), me(), se(400, () => {
				A.value = "open", m("opened");
			}));
		}
		function ge() {
			let e = U.value;
			e?.open && e.close(), e && Aa(e), N.value = null, k.value = !1, A.value = "closed", g(() => {
				Q?.isConnected && Q.focus({ preventScroll: !0 }), Q = null, m("closed");
			});
		}
		function _e() {
			k.value && (A.value = "closing", se(200, ge));
		}
		function ve(e) {
			e.preventDefault(), de();
		}
		function ye(e) {
			e.key === "Escape" && (e.preventDefault(), de());
		}
		function be(e) {
			!f.closeOnBack || e.target !== U.value || de();
		}
		return S(() => {
			ie = !0, f.modelValue && he();
		}), b(() => {
			ie = !1, oe(), U.value && (Aa(U.value), U.value.open && U.value.close());
		}), z(() => f.modelValue, (e) => {
			ie && (e ? he() : _e());
		}), z(() => f.attach, () => {
			f.modelValue && k.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), B(() => {
			f.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (e, r) => (w(), o(t, null, [J.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: E,
			class: "mat-dialog__activator"
		}, [j(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), k.value ? (w(), i(n, {
			key: 1,
			to: M.value
		}, [u(Bn, h({
			ref_key: "surface",
			ref: D
		}, e.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${A.value}`, {
				"mat-dialog--app-root": W.value,
				"mat-dialog--full-screen": I(f).fullScreen,
				"mat-dialog--with-icon": q.value,
				"mat-dialog--top": Y.value,
				"mat-dialog--transparent-scrim": !I(f).scrim
			}]],
			style: ne.value,
			"aria-labelledby": e.$attrs["aria-labelledby"] ?? (G.value ? H : void 0),
			"aria-modal": "true",
			tabindex: "-1",
			onCancel: ve,
			onClick: be,
			onKeydown: ye
		}), {
			default: V(() => [s("div", {
				class: "mat-dialog__panel",
				style: v(re.value)
			}, [I(f).fullScreen ? (w(), o(t, { key: 0 }, [s("header", Pa, [
				u(tn, {
					class: "mat-dialog__close",
					icon: "close",
					label: I(f).closeLabel,
					size: "small",
					variant: "standard",
					onClick: de
				}, null, 8, ["label"]),
				G.value ? (w(), o("h2", {
					key: 0,
					id: H,
					class: "mat-dialog__title mat-sys-typescale-title-large"
				}, [I(f).title === void 0 ? j(e.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).title), 1)], 64))])) : a("", !0),
				u(Na),
				e.$slots.actions ? (w(), o("div", Fa, [j(e.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			]), K.value ? (w(), o("div", Ia, [I(f).content === void 0 ? j(e.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).content), 1)], 64))])) : a("", !0)], 64)) : (w(), o(t, { key: 1 }, [
				q.value ? (w(), i(ze, {
					key: 0,
					as: "div",
					class: "mat-dialog__icon",
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(f).icon === void 0 ? j(e.$slots, "icon", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).icon), 1)], 64))]),
					_: 3
				})) : a("", !0),
				G.value ? (w(), o("h2", {
					key: 1,
					id: H,
					class: "mat-dialog__title mat-sys-typescale-headline-small"
				}, [I(f).title === void 0 ? j(e.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).title), 1)], 64))])) : a("", !0),
				K.value ? (w(), o("div", La, [I(f).content === void 0 ? j(e.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).content), 1)], 64))])) : a("", !0),
				e.$slots.actions ? (w(), o("div", Ra, [j(e.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			], 64))], 4)]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-a367da49"]]), Ba = ["aria-label"], Va = {
	key: 1,
	class: "mat-sheet__header"
}, Ha = {
	key: 1,
	class: "mat-sheet__header-actions"
}, Ua = {
	key: 2,
	class: "mat-sheet__content mat-sys-typescale-body-medium"
}, Wa = {
	key: 3,
	class: "mat-sheet__footer"
}, Ga = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		let f = e, m = c, y = ee(), x = R(), C = d(), T = p(tt, null), E = Object.prototype.hasOwnProperty.call(C?.vnode.props ?? {}, "attach"), D = O(null), k = O(null), A = O(null), M = O(!1), N = O("closed"), I = O(null), B = P(null), H = O(typeof window > "u" ? 0 : window.innerWidth), W = 0, G = O(!1), K = `${L().replace(/[^\w-]/g, "-")}-title`, q = r(() => k.value?.root ?? k.value?.$el ?? null), J = r(() => !!B.value), Y = r(() => X.value ? A.value : q.value), te = r(() => f.variant === "auto" ? H.value < Ze(f.breakpoint, {
			positive: !0,
			fallback: 840
		}) ? "modal" : "standard" : f.variant), X = r(() => te.value === "modal"), ne = r(() => X.value && pa.value.at(-1) === q.value), re = r(() => !!x.activator), ie = r(() => f.title !== void 0 || !!x.title), Z = r(() => f.content !== void 0 || !!x.default), Q = r(() => f.closable), ae = r(() => [
			`mat-sheet__panel--${f.direction}`,
			`mat-sheet__panel--position-${f.position}`,
			{
				"mat-sheet__panel--expanded": f.direction === "bottom" && f.expanded,
				"mat-sheet__panel--dragging": G.value
			}
		]), oe = r(() => f.expanded ? X.value ? f.expandedDragHandleLabel : f.collapseDragHandleLabel : f.dragHandleLabel), se = r(() => ie.value || Q.value || !!x.header || !!x.actions), ce = r(() => X.value ? "dialog" : "aside"), le = r(() => {
			if (f.width !== void 0) return Ge(f.width, {
				property: "inline-size",
				positive: !0
			});
		}), ue = r(() => {
			if (le.value) return { "--mat-sheet-preferred-width": le.value };
		}), de = r(() => f.direction === "side" && X.value && !J.value && f.position === "end" ? { "--mat-sheet-modal-end-offset": `${-ma.value}px` } : {}), fe = r(() => [y.style]), pe = r(() => [ue.value, de.value]), me = !1, he = et(), ge = null, _e = !1, ve = null, ye = 0, be = 0, xe = 0, Se = 0, Ce = !1;
		Ma(q, r(() => X.value && M.value && ne.value));
		function we() {
			he.cancel();
		}
		function Te(e, t) {
			he.wait(q.value, e, t);
		}
		function Ee() {
			let e = D.value ? [...D.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function De() {
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return f.attach instanceof HTMLElement && f.attach.ownerDocument === document ? f.attach : null;
		}
		function Oe(e) {
			if (T && !E) return {
				context: T,
				target: T.modalLayer.value
			};
			if (E) {
				let t = e ? at(e) : null;
				if (t) return {
					context: t,
					target: t.modalLayer.value
				};
			}
			return null;
		}
		function ke(e) {
			return {
				inertElement: e.contentElement.value,
				scrollElement: e.documentMode.value ? null : e.contentElement.value
			};
		}
		function Ae() {
			m("update:modelValue", !1);
		}
		function je(e, t) {
			if (W = e, q.value?.style.setProperty("--mat-sheet-drag-offset", `${e}px`), t === null) {
				q.value?.style.removeProperty("--mat-sheet-drag-size");
				return;
			}
			q.value?.style.setProperty("--mat-sheet-drag-size", `${t}px`);
		}
		function Me() {
			je(0, null);
		}
		function Ne() {
			if (Ce) {
				Ce = !1;
				return;
			}
			if (f.expanded) {
				if (X.value) {
					Ae();
					return;
				}
				m("update:expanded", !1);
				return;
			}
			m("update:expanded", !0);
		}
		function Pe(e) {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), Ne());
		}
		function Fe() {
			console.warn(`${f.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`);
		}
		function Ie() {
			!X.value || ie.value || y["aria-label"] || y["aria-labelledby"] || console.warn(`${f.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
		}
		function Le() {
			console.warn(`${f.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function $() {
			let e = q.value;
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
		function Re() {
			let e = q.value;
			if (e instanceof HTMLDialogElement) {
				if (e.open || e.show(), J.value) {
					let t = B.value;
					if (!t) return;
					ka(e, ke(t.context));
				} else ka(e);
				$();
			}
		}
		async function ze() {
			if (we(), M.value) {
				N.value = "opening", Te(400, () => {
					N.value = "open", m("opened");
				});
				return;
			}
			let e = re.value ? Ee() : null;
			if (re.value && !e) {
				Fe(), Ae();
				return;
			}
			if (X.value) {
				let t = De(), n = Oe(t), r = n ? n.target : t;
				if (!r) {
					Le(), Ae();
					return;
				}
				B.value = n, I.value = r, ge = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			} else B.value = null;
			_e = X.value, M.value = !0, N.value = "opening", Ie(), await g(), !(!f.modelValue || !q.value) && (X.value && Re(), Te(400, () => {
				N.value = "open", m("opened");
			}));
		}
		function Be() {
			_e && ge?.isConnected && ge.focus({ preventScroll: !0 }), ge = null, _e = !1;
		}
		function Ve() {
			let e = q.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), Aa(e)), B.value = null, M.value = !1, N.value = "closed", Me(), g(() => {
				Be(), m("closed");
			});
		}
		async function He() {
			M.value && (N.value = "closing", await g(), !(f.modelValue || N.value !== "closing" || !q.value) && Te(200, Ve));
		}
		function Ue(e) {
			e.preventDefault(), Ae();
		}
		function We(e) {
			e.key === "Escape" && (e.preventDefault(), Ae());
		}
		function Ke(e) {
			!X.value || !f.closeOnBack || e.target !== q.value || Ae();
		}
		function qe(e) {
			if (e.pointerId === ve) {
				if (f.direction === "bottom") {
					if (Se = e.clientY - ye, !f.expanded && Se < 0 || f.expanded && Se > 0) {
						je(0, Math.max(0, be - Se));
						return;
					}
					je(Math.max(0, Se), be);
					return;
				}
				je(f.position === "start" ? Math.max(0, ye - e.clientX) : Math.max(0, e.clientX - ye), null);
			}
		}
		let Je = ti(qe);
		function Ye(e) {
			e.pointerId === ve && Je.schedule(e);
		}
		function Xe() {
			ve = null, G.value = !1, window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", $e);
		}
		function Qe(e) {
			if (e.pointerId !== ve) return;
			Je.flush();
			let t = Y.value, n = f.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - xe), i = f.direction === "bottom" ? Math.abs(Se) : W, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (Ce = i >= 4, Xe(), f.direction === "bottom" && o) {
				if (!f.expanded && Se < 0) {
					Me(), m("update:expanded", !0);
					return;
				}
				if (f.expanded && Se > 0) {
					Me(), m("update:expanded", !1);
					return;
				}
				if (!f.expanded && Se > 0) {
					je(W, null), Ae();
					return;
				}
			}
			if (f.direction === "side" && o) {
				Ae();
				return;
			}
			Me();
		}
		function $e() {
			Je.cancel(), Xe(), Me();
		}
		function nt(e) {
			!f.draggable || e.button !== 0 || ve !== null || (Je.cancel(), ve = e.pointerId, ye = f.direction === "bottom" ? e.clientY : e.clientX, be = f.direction === "bottom" ? Y.value?.getBoundingClientRect().height ?? 0 : Y.value?.getBoundingClientRect().width ?? 0, xe = performance.now(), Se = 0, je(0, f.direction === "bottom" ? be : null), G.value = !0, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", $e));
		}
		function rt(e) {
			f.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || nt(e);
		}
		function it(e) {
			X.value || rt(e);
		}
		function ot(e) {
			X.value && rt(e);
		}
		function st() {
			H.value = window.innerWidth;
		}
		async function ct(e, t) {
			if (!M.value || !f.modelValue || e === t) return;
			we();
			let n = q.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), Aa(n), Be(), B.value = null), e === "modal") {
				let e = De(), t = Oe(e), n = t ? t.target : e;
				if (!n) {
					Le(), Ae();
					return;
				}
				B.value = t, I.value = n, ge = document.activeElement instanceof HTMLElement ? document.activeElement : null, _e = !0, Ie();
			}
			N.value = "open", await g(), e === "modal" && f.modelValue && Re();
		}
		return S(() => {
			me = !0, st(), window.addEventListener("resize", st), f.modelValue && ze();
		}), b(() => {
			Je.cancel(), me = !1, we(), Xe(), window.removeEventListener("resize", st);
			let e = q.value;
			e instanceof HTMLDialogElement && (Aa(e), e.open && e.close());
		}), z(() => f.modelValue, (e) => {
			me && (e ? ze() : He());
		}), z(te, ct), z(() => f.attach, () => {
			f.modelValue && M.value && X.value && console.warn(`${f.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), z(() => f.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${f.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, c) => (w(), o(t, null, [re.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: D,
			class: "mat-sheet__activator"
		}, [j(r.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), M.value ? (w(), i(n, {
			key: 1,
			to: I.value ?? "body",
			disabled: !X.value
		}, [u(Bn, h({
			ref_key: "surface",
			ref: k
		}, r.$attrs, {
			as: ce.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${te.value}`,
				`mat-sheet--${N.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--app-root": J.value,
					"mat-sheet--dragging": G.value,
					"mat-sheet--expanded": e.direction === "bottom" && e.expanded,
					"mat-sheet--top": ne.value,
					"mat-sheet--transparent-scrim": !e.scrim
				}
			]],
			style: fe.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (ie.value ? K : void 0),
			"aria-modal": X.value ? "true" : void 0,
			tabindex: X.value ? -1 : void 0,
			onCancel: Ue,
			onClick: Ke,
			onKeydown: We,
			onPointerdown: it
		}), {
			default: V(() => [s("div", {
				ref_key: "panelElement",
				ref: A,
				class: _(["mat-sheet__panel", ae.value]),
				style: v(pe.value),
				onPointerdown: ot
			}, [
				e.direction === "bottom" && e.dragHandle ? (w(), o("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": oe.value,
					onClick: Ne,
					onKeydown: Pe,
					onPointerdown: U(nt, ["stop"])
				}, [j(r.$slots, "drag-handle", {}, () => [c[0] ||= s("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, Ba)) : a("", !0),
				se.value ? (w(), o("header", Va, [j(r.$slots, "header", {}, () => [
					ie.value ? (w(), o("h2", {
						key: 0,
						id: K,
						class: "mat-sheet__title mat-sys-typescale-title-large"
					}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
					r.$slots.actions ? (w(), o("div", Ha, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0),
					Q.value ? (w(), i(tn, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: Ae
					}, null, 8, ["label"])) : a("", !0)
				], !0)])) : a("", !0),
				Z.value ? (w(), o("div", Ua, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0),
				r.$slots.footer ? (w(), o("div", Wa, [j(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 38)]),
			_: 3
		}, 16, [
			"as",
			"class",
			"style",
			"aria-labelledby",
			"aria-modal",
			"tabindex"
		])], 8, ["to", "disabled"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-4887881e"]]), Ka = /*@__PURE__*/ Object.assign({
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
			validator: (e) => We(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => We(e, {
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
		let n = $("bottomSheet", e), a = d(), o = Object.prototype.hasOwnProperty.call(a?.vnode.props ?? {}, "attach"), s = r(() => {
			if (o) return n;
			let e = { ...n };
			return delete e.attach, e;
		}), l = t;
		return (e, t) => (w(), i(Ga, h({
			...s.value,
			...e.$attrs
		}, {
			"component-name": "MatBottomSheet",
			direction: "bottom",
			"onUpdate:modelValue": t[0] ||= (e) => l("update:modelValue", e),
			"onUpdate:expanded": t[1] ||= (e) => l("update:expanded", e),
			onOpened: t[2] ||= (e) => l("opened"),
			onClosed: t[3] ||= (e) => l("closed")
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
}), qa = /*@__PURE__*/ Object.assign({
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
			validator: (e) => We(e, {
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
			validator: (e) => We(e, {
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
		let n = $("sideSheet", e), a = d(), o = Object.prototype.hasOwnProperty.call(a?.vnode.props ?? {}, "attach"), s = r(() => {
			if (o) return n;
			let e = { ...n };
			return delete e.attach, e;
		}), l = t;
		return (e, t) => (w(), i(Ga, h({
			...s.value,
			...e.$attrs
		}, {
			"component-name": "MatSideSheet",
			direction: "side",
			"onUpdate:modelValue": t[0] ||= (e) => l("update:modelValue", e),
			onOpened: t[1] ||= (e) => l("opened"),
			onClosed: t[2] ||= (e) => l("closed")
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
}), Ja = { class: "mat-container__content" }, Ya = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		return (e, n) => (w(), o("div", h(e.$attrs, { class: ["mat-container", { "mat-container--fluid": I(t).fluid }] }), [s("div", Ja, [j(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-79014db2"]]), Xa = ["aria-valuemax", "aria-valuenow"], Za = ["width", "height"], Qa = { key: 0 }, $a = ["width", "height"], eo = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, to = ["d"], no = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, ro = ["d"], io = ["d", "mask"], ao = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, oo = ["d"], so = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, co = ["d"], lo = ["d"], uo = {
	key: 1,
	class: "mat-loader__linear-stop"
}, fo = ["viewBox"], po = { class: "mat-loader__circular-linear-rotate" }, mo = { class: "mat-loader__circular-rotate-arc" }, ho = [
	"cx",
	"cy",
	"r"
], go = ["d"], _o = 4, vo = 3, yo = 40, bo = 1.6, xo = 15, So = 4, Co = .001, wo = 100, To = 300, Eo = 900, Do = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: (e) => We(e, {
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
			validator: me
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
				let t = (e - o) / yo * Math.PI * 2, n = a - Math.sin(t - i) * r;
				l.push(`L ${c(e)} ${c(n)}`);
			}
			let u = (s - o) / yo * Math.PI * 2, d = a - Math.sin(u - i) * r;
			return l.push(`L ${c(s)} ${c(d)}`), l.join(" ");
		}
		function d(e, t, n, r) {
			let i = Math.max(1, Math.round(Math.PI * 2 * t / xo)), a = i * 12, o = [];
			for (let s = 0; s <= a; s += 1) {
				let l = s / a, u = l * Math.PI * 2, d = l * Math.PI * 2 * i, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = s === 0 ? "M" : "L";
				o.push(`${h} ${c(p)} ${c(m)}`);
			}
			return o.push("Z"), o.join(" ");
		}
		let f = $("loader", e), { colorStyle: p } = Ie(r(() => f.color)), m = O(null), g = O(wo), _ = O(+(f.shape === "wavy")), y = O(0), x = `mat-loader-linear-mask-${L()}`, C, T, E, D = r(() => i(f.max) ? f.max : 1), k = r(() => Ze(f.thickness, {
			positive: !0,
			fallback: 4
		})), A = r(() => f.variant === "circular"), j = r(() => f.shape === "wavy"), M = r(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), D.value);
		}), N = r(() => Number((M.value / D.value * 100).toFixed(3))), P = r(() => k.value + vo * 2 * _.value), F = r(() => Math.min(100, k.value / g.value * 100)), ee = r(() => {
			let e = g.value - k.value;
			return e <= 0 ? 1 : g.value / e;
		}), R = r(() => N.value === 100 ? 100 : Math.min(100, Math.max(N.value, F.value + Co))), B = r(() => u(g.value, P.value, k.value, 0, 0)), V = r(() => u(g.value, P.value, k.value, vo * _.value, y.value)), H = r(() => k.value + 36 + 8 * _.value), U = r(() => H.value / 2), W = r(() => U.value - k.value / 2 - bo * _.value), G = r(() => `0 0 ${H.value} ${H.value}`), K = r(() => d(U.value, W.value, bo * _.value, y.value)), q = r(() => {
			let e = Math.PI * 2 * W.value;
			return (_o + k.value) / e * 100;
		}), J = r(() => Math.min(12, q.value)), Y = r(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - N.value - q.value * 2).toFixed(3)), t = Number(Math.min(100, N.value + q.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${c(e)} ${c(100 - e)}`,
				strokeDashoffset: `-${c(t)}`
			};
		}), te = r(() => f.indeterminate ? {} : { strokeDasharray: `${c(N.value === 0 ? Co : N.value)} 200` }), X = r(() => ({
			...p.value,
			"--mat-loader-circular-gap-progress": c(J.value),
			"--mat-loader-circular-radius": `${W.value}px`,
			"--mat-loader-circular-size": `${H.value}px`,
			"--mat-loader-indicator-gap-size": `${_o}px`,
			"--mat-loader-linear-cap-progress": c(F.value),
			"--mat-loader-linear-path-scale": c(ee.value),
			"--mat-loader-linear-segment-end": c(R.value),
			"--mat-loader-linear-segment-end-position": `${c(R.value)}%`,
			"--mat-loader-linear-size": `${P.value}px`,
			"--mat-loader-progress": `${N.value}`,
			"--mat-loader-stop-indicator-size": `${So}px`,
			"--mat-loader-thickness": `${k.value}px`
		}));
		function ne(e) {
			T = void 0;
			let t = E === void 0 ? 0 : Math.min(64, e - E), n = +!!j.value, r = n - _.value;
			if (E = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / To);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (y.value += t / Eo * Math.PI * 2, y.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? T = globalThis.requestAnimationFrame(ne) : E = void 0;
		}
		function re() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!j.value;
				return;
			}
			T === void 0 && (E = void 0, T = globalThis.requestAnimationFrame(ne));
		}
		return z(j, re), z(() => f.waveMotion, re), S(() => {
			re(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (C = new globalThis.ResizeObserver(([e]) => {
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
			style: X.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": D.value,
			"aria-valuenow": I(f).indeterminate ? void 0 : M.value
		}), [A.value ? (w(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: G.value,
			"aria-hidden": "true"
		}, [s("g", po, [s("g", mo, [s("circle", {
			class: "mat-loader__circular-track",
			cx: U.value,
			cy: U.value,
			r: W.value,
			pathLength: "100",
			style: v(Y.value)
		}, null, 12, ho), s("path", {
			class: "mat-loader__circular-active",
			d: K.value,
			pathLength: "100",
			style: v(te.value)
		}, null, 12, go)])])], 8, fo)) : (w(), o("span", {
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
				I(f).indeterminate ? (w(), o("defs", Qa, [s("mask", {
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
					s("g", eo, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: V.value,
						pathLength: "100"
					}, null, 8, to)]),
					s("g", no, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: V.value,
						pathLength: "100"
					}, null, 8, ro)])
				], 8, $a)])) : a("", !0),
				I(f).indeterminate ? (w(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: B.value,
					pathLength: "100",
					mask: `url(#${x})`
				}, null, 8, io)) : a("", !0),
				I(f).indeterminate ? (w(), o(t, { key: 2 }, [s("g", ao, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: V.value,
					pathLength: "100"
				}, null, 8, oo)]), s("g", so, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: V.value,
					pathLength: "100"
				}, null, 8, co)])], 64)) : (w(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: V.value,
					pathLength: "100"
				}, null, 8, lo))
			], 8, Za)),
			I(f).indeterminate ? a("", !0) : (w(), o("span", uo))
		], 512))], 16, Xa));
	}
}), [["__scopeId", "data-v-4d1544e4"]]), Oo = Symbol("mat-snackbar-externally-managed"), ko = [], Ao = null;
function jo() {
	Ao || ko.length === 0 || (Ao = ko.shift(), Ao.activate());
}
function Mo(e) {
	e === Ao || ko.includes(e) || (ko.push(e), jo());
}
function No(e) {
	let t = ko.indexOf(e);
	t !== -1 && ko.splice(t, 1);
}
function Po(e) {
	Ao === e && (Ao = null, jo());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var Fo = { class: "mat-snackbar__text" }, Io = {
	key: 0,
	class: "mat-snackbar__controls"
}, Lo = {
	key: 0,
	class: "mat-snackbar__action"
}, Ro = {
	key: 1,
	class: "mat-snackbar__close"
}, zo = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		let d = $("snackbar", e), f = c, m = R(), _ = p(Q, Z), v = p(tt, null), y = p(Oo, !1), x = O(!1), C = O("closed"), T = O(!1), E = r(() => !!m.default || typeof d.text == "string" && d.text.trim().length > 0), D = r(() => !!m.action || typeof d.actionText == "string" && d.actionText.trim().length > 0), k = r(() => !!m.close || d.closable), A = r(() => D.value || k.value), M = O(0), N = O(null), P = r(() => v ? v.snackbarLayer.value : document.body), ee = r(() => typeof d.closeLabel == "string" && d.closeLabel.trim().length > 0 ? d.closeLabel : "关闭"), L = !1, B, H = et(), U = !1, W = null, G = r(() => ({ "--mat-snackbar-toolbar-clearance": `${M.value}px` }));
		function K() {
			M.value = Ft();
		}
		let q = { activate: ue };
		function J() {
			B !== void 0 && (window.clearTimeout(B), B = void 0);
		}
		function Y() {
			H.cancel();
		}
		function te(e, t) {
			H.wait(N.value, e, t);
		}
		function X() {
			return Number.isFinite(d.duration) && d.duration >= 0 ? d.duration : 4e3;
		}
		function re() {
			J();
			let e = X();
			e !== 0 && (B = window.setTimeout(() => {
				B = void 0, ce();
			}, e));
		}
		function ie() {
			U || (U = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function ae() {
			x.value && (x.value = !1, C.value = "closed", f("closed"), y || Po(q));
		}
		function oe() {
			if (J(), !x.value) {
				y || No(q);
				return;
			}
			C.value !== "closing" && (C.value = "closing", te(200, ae));
		}
		function se() {
			T.value || (T.value = !0, f("update:modelValue", !1));
		}
		function ce() {
			se(), oe();
		}
		function le() {
			!x.value || C.value === "closing" || (ce(), f("action"));
		}
		async function ue() {
			if (!L || !d.modelValue || T.value || !E.value) {
				E.value || (ie(), se()), y || Po(q);
				return;
			}
			J(), Y(), x.value = !0, C.value = "opening", await g(), !(!L || !x.value || C.value === "closing") && te(400, () => {
				!x.value || C.value === "closing" || (C.value = "open", re());
			});
		}
		function de() {
			if (T.value || !E.value) {
				E.value || (ie(), ce());
				return;
			}
			if (y) {
				ue();
				return;
			}
			if (x.value && C.value === "closing") {
				ue();
				return;
			}
			Mo(q);
		}
		return S(() => {
			L = !0, v || (W = It(K), K()), d.modelValue && de();
		}), b(() => {
			L = !1, W?.(), W = null, J(), Y(), y || (x.value ? Po(q) : No(q));
		}), z(() => d.modelValue, (e) => {
			if (L) {
				if (e) {
					T.value = !1, de();
					return;
				}
				T.value = !1, oe();
			}
		}), z(E, (e) => {
			if (L) {
				if (!e) {
					ce();
					return;
				}
				U = !1, d.modelValue && !x.value && !T.value && de();
			}
		}), z(() => d.duration, () => {
			C.value === "open" && re();
		}), (e, r) => P.value ? (w(), i(n, {
			key: 0,
			to: P.value
		}, [x.value ? (w(), o("section", h({
			key: 0,
			ref_key: "snackbarElement",
			ref: N
		}, e.$attrs, {
			class: ["mat-snackbar mat-sys-typescale-body-medium", [
				`mat-snackbar--${C.value}`,
				`mat-snackbar--${I(d).position}`,
				{
					"mat-snackbar--app-root": I(v),
					"mat-snackbar--with-trailing": A.value
				}
			]],
			style: G.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [s("div", Fo, [e.$slots.default ? j(e.$slots, "default", { key: 0 }, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(I(d).text), 1)], 64))]), A.value ? (w(), o("div", Io, [D.value ? (w(), o("div", Lo, [e.$slots.action ? j(e.$slots, "action", {
			key: 0,
			action: le
		}, void 0, !0) : (w(), i(ne, {
			key: 1,
			class: "mat-snackbar__default-action mat-sys-typescale-label-large",
			"use-cursor": I(_).useCursor,
			onClick: le
		}, {
			default: V(() => [l(F(I(d).actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : a("", !0), k.value ? (w(), o("div", Ro, [e.$slots.close ? j(e.$slots, "close", {
			key: 0,
			close: ce
		}, void 0, !0) : (w(), i(ne, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": ee.value,
			"use-cursor": I(_).useCursor,
			onClick: ce
		}, {
			default: V(() => [u(ze, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : a("", !0)])) : a("", !0)], 16)) : a("", !0)], 8, ["to"])) : a("", !0);
	}
}), [["__scopeId", "data-v-56f7af57"]]), Bo = ["aria-orientation"], Vo = { class: "mat-toolbar__surface" }, Ho = { class: "mat-toolbar__content" }, Uo = 200, Wo = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: (e) => We(e, {
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
		let u = $("toolbar", e), f = ee(), m = R(), _ = d(), y = p(tt, null), x = _?.vnode.props ?? {}, C = Object.prototype.hasOwnProperty.call(x, "attach"), T = O(u.modelValue), E = O(u.modelValue ? "open" : "closed"), D = O(null), k = O(null), A = O({
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
		}), U = r(() => {
			let e = Ge(u.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), W = r(() => B.value ? U.value : "0px"), G = r(() => [f.style, {
			"--mat-toolbar-app-end-inset": `${J.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${J.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": W.value
		}]), K = r(() => ({
			blockSize: `${A.value.blockSize}px`,
			inlineSize: `${A.value.inlineSize}px`
		})), q = r(() => [
			`mat-toolbar--${M.value}`,
			`mat-toolbar--position-${N.value}`,
			{
				"mat-toolbar--app": u.app,
				"mat-toolbar--app-root": V.value,
				"mat-toolbar--vertical": L.value,
				"mat-toolbar--vibrant": u.vibrant
			}
		]), J = P(null), Y, te, X = !1, ne = !1, re = et(), ie = !1;
		function Z() {
			re.cancel();
		}
		function Q(e) {
			re.wait(D.value, Uo, e);
		}
		function ae() {
			Z(), T.value = !0, E.value = "opening", Q(() => {
				T.value && u.modelValue && (E.value = "open");
			});
		}
		function oe() {
			if (Z(), !T.value) {
				E.value = "closed";
				return;
			}
			E.value = "closing", Q(() => {
				u.modelValue || (T.value = !1, E.value = "closed");
			});
		}
		function se() {
			ie || !m.fab || F.value || (ie = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function ce() {
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
			ne && (await g(), ce());
		}
		function de() {
			te?.disconnect(), te = void 0, X = !1, window.removeEventListener("resize", ce), Y?.unregister(), Y = void 0, J.value?.unregister(), J.value = null;
		}
		async function fe() {
			if (await g(), ne) {
				if (!T.value || !D.value) {
					de();
					return;
				}
				X || (X = !0, te = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ce), te?.observe(D.value), window.addEventListener("resize", ce)), V.value ? (Y?.unregister(), Y = void 0, !F.value && !J.value && (J.value = y.publicContext.registerEdge({
					edge: "bottom",
					element: D.value
				})), F.value && J.value && (J.value.unregister(), J.value = null)) : (J.value?.unregister(), J.value = null, Y ||= Nt(D.value, {
					getRect: le,
					isBottom: () => B.value
				})), k.value && te?.observe(k.value), ce(), se();
			}
		}
		S(() => {
			ne = !0, pe(), se(), fe();
		}), b(() => {
			ne = !1, Z(), de();
		}), z(() => u.modelValue, (e) => {
			if (ne) {
				if (e) {
					ae();
					return;
				}
				oe();
			}
		}), z(T, fe), z([
			M,
			N,
			U,
			() => u.app,
			() => u.attach,
			V
		], () => {
			pe(), ue(), fe();
		});
		function pe() {
			u.app && !V.value && !H.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, c) => (w(), o(t, null, [e.placeholder && T.value && (!e.app || H.value) ? (w(), o("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: v(K.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: H.value ?? "body",
			disabled: !e.app
		}, [T.value && (!e.app || H.value) ? (w(), o("div", h({
			key: 0,
			ref_key: "toolbarElement",
			ref: D
		}, r.$attrs, {
			class: ["mat-toolbar", [q.value, `mat-toolbar--${E.value}`]],
			style: G.value,
			role: "toolbar",
			"aria-orientation": L.value ? "vertical" : void 0
		}), [s("div", Vo, [s("div", Ho, [j(r.$slots, "default", {}, void 0, !0)])]), F.value && I(m).fab ? (w(), o("div", {
			key: 0,
			ref_key: "fabElement",
			ref: k,
			class: "mat-toolbar__fab"
		}, [j(r.$slots, "fab", {}, void 0, !0)], 512)) : a("", !0)], 16, Bo)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-526823c5"]]), Go = Symbol("mat-panes"), Ko = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], qo = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => Ko.includes(e)
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
		function U(e, t, n, r, i) {
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : C(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function W(e) {
			let t = M(e);
			if (!t) return null;
			let n = A(t.left.id), r = A(t.right.id);
			return {
				leftWidth: n,
				rightWidth: r,
				totalWidth: n + r
			};
		}
		function G(e, t) {
			if (!n.resizable || f || t.button !== void 0 && t.button !== 0) return;
			let r = M(e), i = W(e);
			!r || !i || (t.preventDefault(), t.currentTarget?.setPointerCapture?.(t.pointerId), l.value = r.key, f = {
				boundary: r,
				changed: !1,
				metrics: i,
				pointerId: t.pointerId,
				startWeights: B(),
				startX: t.clientX
			});
		}
		function K(e, t) {
			if (!f || f.pointerId !== t.pointerId) return;
			let n = M(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = C(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			c.value = U(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		let q = ti(({ event: e, id: t }) => {
			K(t, e);
		});
		function J(e, t) {
			!f || f.pointerId !== t.pointerId || q.schedule({
				event: t,
				id: e
			});
		}
		function Y(e, t, n) {
			if (!f || f.pointerId !== t.pointerId) return;
			n ? q.flush() : q.cancel();
			let r = M(e), i = f.changed, a = c.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				H(a);
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
			}[t.key], a = W(e), o = B(), s = o[r.left.id] + o[r.right.id] || 2, c = a?.totalWidth || 100, l = c * (o[r.left.id] / s), u;
			if (i !== void 0) u = C(l + i * (t.shiftKey ? 64 : 16), 0, c);
			else if (t.key === "Home") u = 0;
			else if (t.key === "End") u = c;
			else if (t.key === "Enter") {
				let e = r.key, t = o[r.left.id];
				t === 0 ? u = c * (d.get(e) ?? .5) : (d.set(e, t / s), u = 0);
			} else return;
			t.preventDefault(), H(U(r.left.id, r.right.id, u, c, o));
		}
		function X(e) {
			return s.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), s.push(e), () => {
				let t = s.indexOf(e);
				t !== -1 && s.splice(t, 1);
			};
		}
		function ne() {
			let e = /* @__PURE__ */ new Set();
			s.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function re() {
			let e = {};
			return s.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function ie(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function Z() {
			m = void 0;
			let e = re();
			ie(v, e) || (v = e, i("update:widths", e));
		}
		function Q(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(Z, e ? 0 : 100);
		}
		function ae() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				Q();
			}), p.disconnect(), a.value && p.observe(a.value), s.forEach((e) => {
				e.element.value && p.observe(e.element.value);
			}));
		}
		function oe(e) {
			return e < 600 ? "compact" : e < 840 ? "medium" : e < 1200 ? "expanded" : e < 1600 ? "large" : "extra-large";
		}
		function se(e = !1) {
			let t = oe(globalThis.window === void 0 ? 0 : globalThis.window.innerWidth);
			(e || u.value !== t) && (u.value = t, i("update:breakpoint", t));
		}
		function ce() {
			se();
		}
		return T(Go, {
			getHandleAttributes: R,
			getPaneStyle: F,
			hasBoundary: ee,
			handleKeyDown: te,
			handlePointerDown: G,
			handlePointerMove: J,
			isBoundaryActive: L,
			isHandleVisible: I,
			registerPane: X,
			finishPointerInteraction: Y
		}), z(() => s.map((e) => e.id), async () => {
			await g(), ne(), ae(), Q();
		}, {
			flush: "post",
			immediate: !0
		}), z(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), S(() => {
			se(!0), ae(), Q(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", ce);
		}), b(() => {
			q.cancel(), globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", ce), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), _ !== void 0 && globalThis.clearTimeout(_);
		}), (e, t) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-f74ccabf"]]), Jo = ["id"], Yo = {
	key: 0,
	class: "mat-pane__separator"
}, Xo = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], Zo = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		let n = $("pane", e), i = p(Go, null), c = O(null), l = r(() => n.resizeLabel), u, d = r(() => i?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = r(() => !!i?.hasBoundary(n.id)), m = r(() => !!i?.isHandleVisible(n.id)), g = r(() => i?.getHandleAttributes(n.id) ?? {}), v = r(() => !!i?.isBoundaryActive(n.id));
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
		}), [j(r.$slots, "default", {}, void 0, !0)], 16, Jo), f.value ? (w(), o("div", Yo, [m.value ? (w(), o("div", {
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
		}, null, 42, Xo)) : a("", !0)])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-67055c0d"]]), Qo = Symbol("mat-navigation-rail"), $o = ["aria-label"], es = {
	key: 0,
	class: "mat-navigation-rail__header"
}, ts = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, ns = {
	key: 1,
	class: "mat-navigation-rail__content"
}, rs = {
	key: 2,
	class: "mat-navigation-rail__end"
}, is = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
			validator: (e) => We(e, { property: "inline-size" })
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
			validator: (e) => We(e, {
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
		let f = $("navigationRail", e), m = c, y = p(Q, Z), x = d(), C = p(tt, null), E = x?.vnode.props ?? {}, D = Object.prototype.hasOwnProperty.call(E, "attach"), k = r(() => f.orientation === "horizontal"), A = r(() => !k.value && f.layout === "modal"), M = r(() => !k.value && f.hideOnCollapse && !f.expanded), N = O(f.expanded), F = O(!M.value), ee = r(() => N.value), L = et(), R = r(() => f.app && !!C && !D), B = r(() => {
			if (!f.app) return null;
			if (R.value) return C.edgeLayer.value;
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return l(f.attach);
		}), H = r(() => f.expanded ? f.closeIcon : f.openIcon), U = r(() => f.expanded ? f.closeLabel : f.openLabel), W = r(() => ({
			"mat-navigation-rail-host--vertical": !k.value,
			"mat-navigation-rail-host--horizontal": k.value,
			"mat-navigation-rail-host--expanded": ee.value,
			"mat-navigation-rail-host--collapsed": !ee.value,
			[`mat-navigation-rail-host--${f.position}`]: !0,
			"mat-navigation-rail-host--modal": A.value,
			"mat-navigation-rail-host--hidden": M.value,
			"mat-navigation-rail-host--app": f.app,
			"mat-navigation-rail-host--app-root": R.value
		})), G = r(() => ({
			"mat-navigation-rail--expanded": ee.value,
			"mat-navigation-rail--collapsed": !ee.value,
			"mat-navigation-rail--bar": k.value,
			"mat-navigation-rail--modal": A.value && ee.value,
			"mat-navigation-rail--hidden": M.value,
			"mat-navigation-rail--collapsible-hidden": !F.value,
			"mat-navigation-rail--app": f.app,
			"mat-navigation-rail--app-root": R.value
		})), K = r(() => {
			let e = Ge(f.width, { property: "inline-size" });
			if (e !== void 0) return { "--mat-navigation-rail-expanded-width": e };
		}), q = r(() => {
			if (!f.app || R.value) return "0px";
			let e = Ge(f.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), J = r(() => [K.value, {
			"--mat-navigation-rail-app-end-inset": `${ie.value?.insets.end ?? 0}px`,
			"--mat-navigation-rail-app-start-inset": `${ie.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-bottom-placeholder": q.value
		}]), Y = O(null), te = O(null), X = O({
			blockSize: 0,
			inlineSize: 0
		}), re = r(() => ({
			blockSize: `${X.value.blockSize}px`,
			inlineSize: `${X.value.inlineSize}px`
		})), ie = P(null), ae;
		function oe() {
			let e = Y.value?.getBoundingClientRect();
			e && (X.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, ie.value?.update());
		}
		async function se() {
			ae?.disconnect(), ae = void 0, ie.value?.unregister(), ie.value = null, await g(), !(!f.app || !Y.value) && (ae = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(oe), ae?.observe(Y.value), R.value && (ie.value = C.publicContext.registerEdge({
				edge: k.value ? "bottom" : f.position,
				element: Y.value
			})), oe());
		}
		function ce() {
			f.app && !R.value && !B.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		async function le() {
			if (L.cancel(), f.expanded || !M.value) {
				N.value = f.expanded, F.value = !0;
				return;
			}
			F.value = !0, await g(), M.value && L.wait(Y.value, 200, () => {
				M.value && (N.value = !1, F.value = !1);
			});
		}
		function ue(e) {
			return e !== void 0 && Object.is(f.modelValue, e);
		}
		function de(e) {
			e === void 0 || Object.is(f.modelValue, e) || m("update:modelValue", e);
		}
		function fe() {
			m("update:expanded", !f.expanded);
		}
		function pe() {
			m("update:expanded", !1);
		}
		function me(e) {
			e.key === "Escape" && A.value && f.expanded && pe();
		}
		return T(Qo, {
			expanded: ee,
			isSelected: ue,
			orientation: r(() => f.orientation),
			position: r(() => f.position),
			requestSelection: de,
			useCursor: y.useCursor
		}), S(() => {
			window.addEventListener("keydown", me), ce(), se();
		}), b(() => {
			L.cancel(), window.removeEventListener("keydown", me), ae?.disconnect(), ie.value?.unregister();
		}), z([
			() => f.app,
			() => f.attach,
			() => f.bottomPlaceholder,
			() => f.expanded,
			() => f.hideOnCollapse,
			() => f.layout,
			() => f.orientation,
			() => f.width,
			R
		], () => {
			ce(), se();
		}), z([
			() => f.expanded,
			() => f.hideOnCollapse,
			() => f.orientation
		], le), (e, r) => (w(), o(t, null, [I(f).app && B.value && I(f).placeholder ? (w(), o("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(re.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: B.value ?? "body",
			disabled: !I(f).app
		}, [!I(f).app || B.value ? (w(), o("div", {
			key: 0,
			ref_key: "hostElement",
			ref: Y,
			class: _(["mat-navigation-rail-host", W.value]),
			style: v(J.value)
		}, [A.value && I(f).expanded ? (w(), o("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": I(f).closeLabel,
			onClick: pe
		}, null, 8, $o)) : a("", !0), s("nav", h({
			ref_key: "railElement",
			ref: te
		}, e.$attrs, { class: ["mat-navigation-rail", G.value] }), [
			k.value ? a("", !0) : (w(), o("div", es, [
				F.value ? j(e.$slots, "header", {
					key: 0,
					expanded: ee.value
				}, void 0, !0) : a("", !0),
				I(f).collapsible ? (w(), i(ne, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": I(f).expanded,
					"aria-label": U.value,
					"focus-ring": !1,
					"use-cursor": I(y).useCursor,
					onClick: fe
				}, {
					default: V(() => [u(ze, {
						icon: H.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : a("", !0),
				e.$slots.fab && F.value ? (w(), o("div", ts, [j(e.$slots, "fab", { expanded: ee.value }, void 0, !0)])) : a("", !0)
			])),
			F.value ? (w(), o("div", ns, [s("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${I(f).alignment}`]) }, [j(e.$slots, "default", {
				expanded: ee.value,
				orientation: I(f).orientation
			}, void 0, !0)], 2)])) : a("", !0),
			e.$slots.end && F.value && !k.value ? (w(), o("div", rs, [j(e.$slots, "end", { expanded: ee.value }, void 0, !0)])) : a("", !0)
		], 16)], 6)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-869ca95c"]]), as = { class: "mat-navigation-rail-item__indicator" }, os = { class: "mat-navigation-rail-item__icon-wrap" }, ss = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({
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
		let n = $("navigationRailItem", e), c = t, l = R(), u = p(Q, Z), d = p(Qo, null), f = r(() => d?.expanded.value ?? !1), m = r(() => d?.orientation.value === "horizontal"), g = r(() => d?.position.value ?? "start"), v = r(() => f.value), y = r(() => d?.isSelected(n.value) ?? !1), b = r(() => !!(n.icon || l.icon)), x = r(() => $t("label", f.value && !m.value ? "large" : "medium")), S = r(() => ({
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
		return (e, t) => (w(), i(ne, h(e.$attrs, {
			class: ["mat-navigation-rail-item", S.value],
			"aria-current": y.value ? "page" : void 0,
			disabled: I(n).disabled,
			"focus-ring": !1,
			href: I(n).href,
			"use-cursor": I(u).useCursor,
			onClick: C
		}), {
			default: V(() => [s("span", as, [s("span", os, [I(l).icon ? j(e.$slots, "icon", {
				key: 0,
				selected: y.value
			}, void 0, !0) : b.value ? (w(), i(ze, {
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
}), [["__scopeId", "data-v-091eab71"]]), cs = /* @__PURE__ */ new WeakMap();
function ls(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function us(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = ls(t.value), i = new IntersectionObserver((t, r) => {
		let i = cs.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), cs.delete(e));
	}, r);
	cs.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function ds(e) {
	let t = cs.get(e);
	t && (t.observer.unobserve(e), cs.delete(e));
}
var fs = {
	mounted: us,
	updated(e, t) {
		cs.has(e) && (ds(e), us(e, t));
	},
	unmounted: ds
}, ps = Z, ms = null;
function hs(e, t) {
	ps = e, ms = t;
}
function gs() {
	return ps;
}
function _s() {
	return ms;
}
//#endregion
//#region src/theme.js
var vs = "#20a6fc", ys = "(prefers-color-scheme: dark)";
function bs(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function xs(e) {
	if (!Ce.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function Ss(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function Cs(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function ws(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function Ts(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? vs, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	bs(t), ws(n), xs(r), Ss(i), Cs(a);
	let o = O(t), s = O(ke(n)), c = O(r), l = O(i), u = O("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(ys)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = Ae({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(we).forEach(([t, n]) => {
			a.style.setProperty(`--mat-sys-color-${n}`, te(e[t]));
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
		bs(e), o.value = e, y(), g();
	}
	function x(e) {
		ws(e), s.value = ke(e), g();
	}
	function S(e) {
		xs(e), c.value = e, g();
	}
	function C(e) {
		Ss(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(we).forEach((e) => {
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
var Es = [
	[
		"MatAppRoot",
		"mat-app-root",
		on
	],
	[
		"MatAppBar",
		"mat-app-bar",
		vn
	],
	[
		"MatSearch",
		"mat-search",
		Sn
	],
	[
		"MatBtn",
		"mat-btn",
		tn
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		wn
	],
	[
		"MatFab",
		"mat-fab",
		jn
	],
	[
		"MatIcon",
		"mat-icon",
		ze
	],
	[
		"MatImage",
		"mat-image",
		Nn
	],
	[
		"MatAvatar",
		"mat-avatar",
		In
	],
	[
		"MatText",
		"mat-text",
		Ln
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		zn
	],
	[
		"MatCard",
		"mat-card",
		qn
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		Yn
	],
	[
		"MatCardContent",
		"mat-card-content",
		Zn
	],
	[
		"MatCardActions",
		"mat-card-actions",
		$n
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		Hn
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		Kn
	],
	[
		"MatCardMedia",
		"mat-card-media",
		Wn
	],
	[
		"MatList",
		"mat-list",
		sr
	],
	[
		"MatListGroup",
		"mat-list-group",
		br
	],
	[
		"MatListItem",
		"mat-list-item",
		_r
	],
	[
		"MatDivider",
		"mat-divider",
		Dr
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		Nr
	],
	[
		"MatBadge",
		"mat-badge",
		Rr
	],
	[
		"MatChip",
		"mat-chip",
		Ur
	],
	[
		"MatChipSet",
		"mat-chip-set",
		Jr
	],
	[
		"MatRadio",
		"mat-radio",
		Xr
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		$r
	],
	[
		"MatSwitch",
		"mat-switch",
		ei
	],
	[
		"MatSlider",
		"mat-slider",
		Ai
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		Pi
	],
	[
		"MatTextField",
		"mat-text-field",
		Xi
	],
	[
		"MatSelect",
		"mat-select",
		da
	],
	[
		"MatTextarea",
		"mat-textarea",
		fa
	],
	[
		"MatInputBase",
		"mat-input-base",
		yn
	],
	[
		"MatMenu",
		"mat-menu",
		Qi
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		ra
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		ta
	],
	[
		"MatDialog",
		"mat-dialog",
		za
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		Ka
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		qa
	],
	[
		"MatHover",
		"mat-hover",
		Qe
	],
	[
		"MatContainer",
		"mat-container",
		Ya
	],
	[
		"MatSpacer",
		"mat-spacer",
		Na
	],
	[
		"MatScrollArea",
		"mat-scroll-area",
		Kr
	],
	[
		"MatLoader",
		"mat-loader",
		Do
	],
	[
		"MatTooltip",
		"mat-tooltip",
		Ut
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		zo
	],
	[
		"MatToolbar",
		"mat-toolbar",
		Wo
	],
	[
		"MatPanes",
		"mat-panes",
		qo
	],
	[
		"MatPane",
		"mat-pane",
		Zo
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		is
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		ss
	]
], Ds = new Map(Es.map(([e, , t]) => [ae(e), t]));
function Os(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function ks(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? Z.iconClass;
}
function As(e, t) {
	let n = e[t];
	if (n === void 0) return ie[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function js(e) {
	if (e === void 0) return ie;
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi defaults.tooltip 必须是对象");
	return Object.freeze({
		openDelay: As(e, "openDelay"),
		closeDelay: As(e, "closeDelay"),
		skipDelayDuration: As(e, "skipDelayDuration")
	});
}
function Ms(e) {
	let t = Object.keys(e.props ?? {}), n = new Set(Object.keys(e.emits ?? {}).filter((e) => e.startsWith("update:")).map((e) => e.slice(7))), r = new Set(t.filter((e) => !n.has(e)));
	return e.name === "MatTooltip" && r.add("skipDelayDuration"), r;
}
function Ns(e) {
	let t = e.defaults;
	if (t === void 0) return Object.freeze({ tooltip: ie });
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi defaults 必须是对象");
	let n = { tooltip: js(t.tooltip) };
	return Object.entries(t).forEach(([e, t]) => {
		if (e === "tooltip") return;
		let r = Ds.get(e);
		if (!r) throw TypeError(`createMatUi defaults 未知组件键 ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError(`createMatUi defaults.${e} 必须是对象`);
		let i = Ms(r), a = {};
		Object.entries(t).forEach(([t, n]) => {
			if (!i.has(t)) throw TypeError(`createMatUi defaults.${e}.${t} 不是可配置属性`);
			a[t] = n;
		}), n[e] = Object.freeze(a);
	}), Object.freeze(n);
}
function Ps(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: ks(e),
		useCursor: Os(e, "useCursor"),
		defaults: Ns(e)
	}), n = Ts(e.theme);
	return {
		theme: n,
		install(e) {
			Es.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r);
			}), e.directive("intersection", fs), e.provide(Q, t), e.provide(Ne, n), hs(t, n);
		}
	};
}
function Fs() {
	let e = p(Ne, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mde-vue 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var Is = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, Ls = /*#__PURE__*/ X(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		T(Q, gs());
		let s = _s();
		s && T(Ne, s);
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
		return (n, r) => (w(), i(za, h({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: V(() => [u(Na), (w(!0), o(t, null, A(e.options.actions, (t, n) => (w(), i(tn, {
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
			default: V(() => [p.value ? (w(), o(t, { key: 0 }, [e.options.content ? (w(), o("p", Is, F(e.options.content), 1)) : a("", !0), u(Xi, {
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
}), [["__scopeId", "data-v-217b4d5a"]]), Rs = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], zs = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], Bs = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function Vs(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function Hs() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function Us(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function Ws(e) {
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
function Gs(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !Rs.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !me(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function Ks(e) {
	if (Us(e), zs.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), Bs.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !me(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !Vs(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(Gs),
		attach: Ws(e.attach)
	};
	return [
		...zs,
		...Bs,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function qs(e, t) {
	try {
		Hs();
		let n = Ks(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				k(f(Ls, {
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
function Js(e = {}) {
	return qs(e, void 0);
}
function Ys(e = {}) {
	try {
		if (Us(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return qs({
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
function Xs(e = {}) {
	try {
		Us(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return qs({
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
function Zs(e = {}) {
	try {
		Us(e);
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
		return qs({
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
var Qs = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		T(Q, gs()), T(Oo, !0);
		let n = _s();
		n && T(Ne, n);
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
		return (e, t) => (w(), i(zo, h({
			modelValue: a.value,
			"onUpdate:modelValue": t[0] ||= (e) => a.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), $s = [
	"left",
	"center",
	"right"
], ec = null;
function tc() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function nc(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function rc(e) {
	if (nc(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !$s.includes(e.position)) throw TypeError("snackbar position 无效");
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
function ic() {
	return ec?.isConnected ? ec : (ec = document.createElement("div"), ec.dataset.matSnackbarHost = "", document.body.append(ec), ec);
}
function ac() {
	!ec || ec.childNodes.length > 0 || (ec.remove(), ec = null);
}
function oc(e) {
	try {
		tc();
		let t = rc(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = ec;
				t && k(null, t), e(), Po(i), ac();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = ec;
				t && k(null, t), n(e), Po(i), ac();
			}
			i = { activate() {
				try {
					let e = ic();
					k(f(Qs, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, Mo(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var sc = oc;
//#endregion
export { fs as Intersection, vn as MatAppBar, on as MatAppRoot, In as MatAvatar, Rr as MatBadge, Ka as MatBottomSheet, tn as MatBtn, wn as MatBtnGroup, qn as MatCard, Yn as MatCardActionArea, $n as MatCardActions, Zn as MatCardContent, Hn as MatCardHeadline, Wn as MatCardMedia, Kn as MatCardSubhead, Nr as MatCheckbox, Ur as MatChip, Jr as MatChipSet, Ya as MatContainer, za as MatDialog, Dr as MatDivider, jn as MatFab, Qe as MatHover, ze as MatIcon, Nn as MatImage, yn as MatInputBase, sr as MatList, br as MatListGroup, _r as MatListItem, Do as MatLoader, Qi as MatMenu, ra as MatMenuGroup, ta as MatMenuItem, is as MatNavigationRail, ss as MatNavigationRailItem, Zo as MatPane, qo as MatPanes, Xr as MatRadio, $r as MatRadioGroup, Pi as MatRangeSlider, Kr as MatScrollArea, Sn as MatSearch, da as MatSelect, qa as MatSideSheet, Ai as MatSlider, zo as MatSnackbar, Na as MatSpacer, zn as MatSplitBtn, ei as MatSwitch, Ln as MatText, Xi as MatTextField, fa as MatTextarea, Wo as MatToolbar, Ut as MatTooltip, Ys as alert, Xs as confirm, Ps as createMatUi, Js as dialog, Zs as prompt, oc as snackbar, sc as toast, ot as useMatApp, $ as useMatProps, Fs as useMatTheme };
