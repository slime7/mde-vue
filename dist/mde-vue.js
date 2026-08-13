import { Comment as e, Fragment as t, Teleport as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createSlots as c, createTextVNode as l, createVNode as u, getCurrentInstance as d, h as f, inject as p, isVNode as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onActivated as y, onBeforeUnmount as b, onDeactivated as x, onMounted as S, onUpdated as C, openBlock as w, provide as T, reactive as E, readonly as D, ref as O, render as k, renderList as A, renderSlot as j, resolveDynamicComponent as M, shallowReactive as N, shallowRef as P, toDisplayString as F, unref as I, useAttrs as L, useId as ee, useSlots as R, watch as z, watchEffect as B, withCtx as V, withDirectives as H, withKeys as U, withModifiers as W } from "vue";
import { Hct as G, SchemeExpressive as te, SchemeNeutral as K, SchemeTonalSpot as q, SchemeVibrant as J, argbFromHex as Y, hexFromArgb as X } from "@material/material-color-utilities";
//#region src/anchor-names.js
function ne(e) {
	return e.split(",").map((e) => e.trim()).filter(Boolean);
}
function re(e, t) {
	let n = ne(e.style.getPropertyValue("anchor-name"));
	n.includes(t) || e.style.setProperty("anchor-name", [...n, t].join(", "));
}
function ie(e, t) {
	let n = ne(e.style.getPropertyValue("anchor-name")).filter((e) => e !== t);
	n.length > 0 ? e.style.setProperty("anchor-name", n.join(", ")) : e.style.removeProperty("anchor-name");
}
//#endregion
//#region src/directives/state-layer/index.js
var ae = "currentcolor", Z = "data-mat-state-layer-host", oe = 150, se = /* @__PURE__ */ new Set([
	"AREA",
	"AUDIO",
	"BASE",
	"BR",
	"CANVAS",
	"COL",
	"EMBED",
	"HR",
	"IFRAME",
	"IMG",
	"INPUT",
	"LINK",
	"META",
	"METER",
	"OBJECT",
	"PARAM",
	"PROGRESS",
	"SELECT",
	"SOURCE",
	"TRACK",
	"VIDEO",
	"WBR"
]), ce = /* @__PURE__ */ new Set(["color"]), le = /* @__PURE__ */ new WeakMap(), ue = 0;
function de(e) {
	return e === void 0 || typeof e != "object" || !e || Array.isArray(e) ? {} : (Object.keys(e).forEach((e) => {
		ce.has(e) || `${e}`;
	}), e);
}
function fe(e) {
	return e.color === void 0 || typeof e.color != "string" || !(typeof CSS > "u" || CSS.supports("color", e.color)) ? ae : e.color;
}
function pe(e) {
	return e.matches(":disabled") || e.getAttribute("aria-disabled") === "true";
}
function me(e, t) {
	let n = e.getAttribute("role"), r = e.tagName === "BUTTON" || n === "button", i = e.tagName === "A" && e.hasAttribute("href") || n === "link";
	return r ? t === " " || t === "Enter" : i && t === "Enter";
}
function he(e) {
	let t = le.get(e);
	t?.releaseTimer !== void 0 && (globalThis.clearTimeout(t.releaseTimer), t.releaseTimer = void 0);
}
function ge(e) {
	let t = le.get(e);
	t && (he(e), t.activePointerId = void 0, t.activeKey = void 0, t.removeGlobalPointerListeners(), e.removeAttribute("data-mat-state-layer-pressed"));
}
function _e(e) {
	let t = le.get(e);
	!t || pe(e) || (he(e), t.pressStartedAt = Date.now(), e.setAttribute("data-mat-state-layer-pressed", ""));
}
function ve(e) {
	let t = le.get(e);
	!t || !e.hasAttribute("data-mat-state-layer-pressed") || (t.activePointerId = void 0, t.activeKey = void 0, t.removeGlobalPointerListeners(), he(e), t.releaseTimer = globalThis.setTimeout(() => {
		e.removeAttribute("data-mat-state-layer-pressed"), t.releaseTimer = void 0;
	}, Math.max(0, oe - (Date.now() - t.pressStartedAt))));
}
function ye(e, t) {
	let n = le.get(e);
	if (!n || t.button !== 0 || n.activePointerId !== void 0 || (_e(e), !e.hasAttribute("data-mat-state-layer-pressed"))) return;
	n.activePointerId = t.pointerId;
	let r = (t) => {
		t.pointerId === n.activePointerId && ve(e);
	};
	window.addEventListener("pointerup", r), window.addEventListener("pointercancel", r), n.removeGlobalPointerListeners = () => {
		window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", r), n.removeGlobalPointerListeners = () => {};
	};
}
function be(e, t) {
	let n = le.get(e);
	!n || t.repeat || n.activeKey !== void 0 || !me(e, t.key) || (_e(e), e.hasAttribute("data-mat-state-layer-pressed") && (n.activeKey = t.key));
}
function xe(e, t) {
	le.get(e)?.activeKey === t.key && ve(e);
}
function Se(e) {
	return !se.has(e.tagName) && getComputedStyle(e).display !== "contents";
}
function Ce(e, t) {
	if (!Se(e)) {
		`${e.tagName.toLowerCase()}`;
		return;
	}
	ue += 1;
	let n = `--mat-state-layer-${ue}`, r = document.createElement("span");
	r.className = "mat-state-layer", r.setAttribute("aria-hidden", "true"), r.style.setProperty("position-anchor", n), r.style.backgroundColor = fe(de(t.value)), re(e, n), e.setAttribute(Z, ""), e.prepend(r);
	let i = {
		activeKey: void 0,
		activePointerId: void 0,
		anchorName: n,
		layer: r,
		observer: void 0,
		pressStartedAt: 0,
		releaseTimer: void 0,
		removeGlobalPointerListeners: () => {}
	}, a = (t) => ye(e, t), o = (t) => be(e, t), s = (t) => xe(e, t), c = () => ve(e), l = new MutationObserver(() => {
		pe(e) && ge(e);
	});
	i.observer = l, le.set(e, i), e.addEventListener("pointerdown", a), e.addEventListener("keydown", o), e.addEventListener("keyup", s), e.addEventListener("blur", c), e.addEventListener("lostpointercapture", c), l.observe(e, {
		attributeFilter: [
			"aria-disabled",
			"disabled",
			"href",
			"role"
		],
		attributes: !0
	}), i.removeEventListeners = () => {
		e.removeEventListener("pointerdown", a), e.removeEventListener("keydown", o), e.removeEventListener("keyup", s), e.removeEventListener("blur", c), e.removeEventListener("lostpointercapture", c);
	};
}
function we(e) {
	let t = le.get(e);
	t && (ge(e), t.removeEventListeners(), t.observer.disconnect(), t.layer.remove(), e.removeAttribute(Z), ie(e, t.anchorName), le.delete(e));
}
var Te = {
	mounted: Ce,
	updated(e, t) {
		let n = le.get(e);
		n && (n.layer.style.backgroundColor = fe(de(t.value)));
	},
	unmounted: we
}, Q = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Ee = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { expose: t, emit: n }) {
		let a = e, o = n, s = r(() => a.href !== void 0), c = r(() => s.value ? "a" : a.as), l = r(() => c.value === "button"), u = O(null);
		function d(e) {
			if (a.disabled) {
				e.preventDefault(), e.stopImmediatePropagation();
				return;
			}
			o("click", e);
		}
		return t({ root: u }), (t, n) => H((w(), i(M(c.value), h({
			ref_key: "root",
			ref: u
		}, t.$attrs, {
			class: ["mat-action-base", {
				"mat-action-base--disabled": e.disabled,
				"mat-action-base--use-cursor": e.useCursor,
				"mat-action-base--focus-ring": e.focusRing
			}],
			"aria-disabled": !l.value && e.disabled ? "true" : t.$attrs["aria-disabled"],
			disabled: l.value ? e.disabled : void 0,
			href: s.value && !e.disabled ? e.href : void 0,
			role: s.value && e.disabled ? "link" : t.$attrs.role,
			tabindex: !l.value && e.disabled ? -1 : t.$attrs.tabindex,
			type: l.value ? e.type : void 0,
			onClick: d
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
		])), [[I(Te), { color: "var(--mat-action-state-color, currentcolor)" }]]);
	}
}), [["__scopeId", "data-v-dd27f583"]]), De = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		return (t, r) => (w(), i(Ee, h(t.$attrs, {
			class: ["mat-button-base", {
				"mat-button-base--block": e.block,
				"mat-button-base--use-cursor": e.useCursor
			}],
			"aria-pressed": e.ariaPressed,
			disabled: e.disabled,
			type: e.type,
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
}), [["__scopeId", "data-v-549e70b5"]]), Oe = Object.freeze({
	openDelay: 0,
	closeDelay: 600,
	skipDelayDuration: 0
}), ke = Object.freeze({
	iconClass: "material-symbols-outlined",
	useCursor: !1,
	defaults: Object.freeze({ tooltip: Oe })
}), Ae = Symbol("mde-vue-options");
function je(e) {
	return e.replace(/^Mat/, "").replace(/^./, (e) => e.toLowerCase());
}
//#endregion
//#region src/components/button-props.js
var Me = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], Ne = ["round", "square"], Pe = [
	"button",
	"submit",
	"reset"
], Fe = [
	"primary",
	"secondary",
	"tertiary",
	"error"
], Ie = [
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
], Le = {
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
}, Re = [
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
function ze(e) {
	return typeof e == "string" && Re.includes(e);
}
function Be(e) {
	return e === void 0 || Fe.includes(e) || Ie.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var Ve = Object.freeze({
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
}), He = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function Ue(e) {
	return typeof e == "string" && (Object.hasOwn(Ve, e) || He.test(e));
}
function We(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function Ge(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function Ke(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function qe(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function Je(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var Ye = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], Xe = {
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
}, Ze = {
	"tonal-spot": q,
	neutral: K,
	vibrant: J,
	expressive: te
}, Qe = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], $e = 64, et = /* @__PURE__ */ new Map();
function tt(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function nt({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = Ze[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(G.fromInt(Y(tt(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function rt(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, X(e[t])])));
}
function it(e, t = "tonal-spot", n = 0) {
	let r = tt(e), i = `${r}|${t}|${n}|2025|phone`, a = et.get(i);
	if (a) return et.delete(i), et.set(i, a), a;
	let o = Object.freeze({
		light: rt(nt({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), Qe),
		dark: rt(nt({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), Qe)
	});
	if (et.set(i, o), et.size > $e) {
		let e = et.keys().next().value;
		et.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var at = Symbol("mde-vue-theme"), ot = "tonal-spot", st = 0;
function ct(e) {
	let t = p(at, null), n = r(() => I(e) !== void 0);
	return {
		colorStyle: r(() => {
			let n = I(e);
			if (!n || !Be(n) && !ze(n)) return {};
			if (Fe.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			if (Ie.includes(n)) {
				let e = Le[n];
				return {
					"--mat-accent-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-color": `var(--mat-sys-color-${e})`,
					"--mat-accent-container-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-container-color": `var(--mat-sys-color-${e})`
				};
			}
			if (ze(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-${n})`
			};
			let r = it(n, t?.schemeVariant.value ?? ot, t?.contrastLevel.value ?? st);
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
var lt = Object.freeze({});
function $(e, t) {
	let n = d();
	if (!n) throw Error("useMatProps() 必须在组件 setup 中调用");
	let i = p(Ae, ke).defaults?.[e] ?? lt, a = [.../* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])], o = {};
	return a.forEach((e) => {
		o[e] = r(() => {
			let r = n.vnode.props ?? lt;
			return e in r && r[e] !== void 0 ? t[e] : i[e] ?? t[e];
		});
	}), E(o);
}
//#endregion
//#region src/components/mat-icon/MatIcon.vue
var ut = ["src"], dt = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ue
		},
		fill: {
			type: Number,
			default: 0,
			validator: Ge
		},
		weight: {
			type: Number,
			default: 400,
			validator: Ke
		},
		grade: {
			type: Number,
			default: 0,
			validator: qe
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: Je
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
		},
		fontColor: {
			type: String,
			default: void 0
		},
		as: {
			type: String,
			default: "i",
			validator: We
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = $("icon", e), a = p(Ae, ke), { colorStyle: s, hasExplicitColor: c } = ct(r(() => n.color)), u = r(() => n.iconClass ?? a.iconClass), d = r(() => n.icon !== void 0), f = r(() => Ve[n.size]?.fontSize ?? n.size), m = r(() => n.opticalSize ?? Ve[n.size]?.opticalSize ?? 24), g = r(() => ({
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
			}, null, 8, ut))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-bd2263c4"]]), ft = /^-?\d+(\.\d+)?$/;
function pt(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : NaN;
	if (typeof e == "string") {
		let t = e.trim();
		return t && ft.test(t) ? Number(t) : NaN;
	}
	return NaN;
}
function mt(e, { positive: t = !1, max: n } = {}) {
	let r = pt(e);
	return !Number.isFinite(r) || (t ? r <= 0 : r < 0) ? !1 : n === void 0 || r <= n;
}
function ht(e, t) {
	if (typeof e != "string") return !1;
	let n = e.trim();
	return !n || /[;{}]/.test(n) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports(t, n);
}
function gt(e, { property: t, positive: n = !1, max: r, allowUndefined: i = !0, allowNegative: a = !1 } = {}) {
	if (e === void 0) return i;
	if (typeof e == "number" || typeof e == "string" && ft.test(e.trim())) {
		if (a) {
			let t = pt(e);
			return Number.isFinite(t) && (r === void 0 || t <= r);
		}
		return mt(e, {
			positive: n,
			max: r
		});
	}
	return typeof e != "string" || !t ? !1 : ht(e, t);
}
function _t(e, { property: t, positive: n = !1, max: r, fallback: i, allowNegative: a = !1 } = {}) {
	if (gt(e, {
		property: t,
		positive: n,
		max: r,
		allowUndefined: !1,
		allowNegative: a
	})) {
		let t = pt(e);
		return Number.isFinite(t) ? t === 0 ? "0" : `${t}px` : e.trim();
	}
	return i;
}
function vt(e, { property: t, positive: n = !1, fallback: r } = {}) {
	if (gt(e, {
		property: t,
		positive: n,
		allowUndefined: !1
	})) {
		let t = pt(e);
		return Number.isFinite(t) ? String(t) : e.trim();
	}
	return r;
}
function yt(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : typeof e == "number" || typeof e == "string" && ft.test(e.trim()) ? mt(e) : !e || Array.isArray(e) ? !1 : ["start", "end"].every((t) => e[t] === void 0 || mt(e[t]));
}
function bt(e, t) {
	let n = pt(e);
	if (Number.isFinite(n)) return {
		start: n,
		end: n
	};
	function r(e) {
		let n = pt(e);
		return Number.isFinite(n) ? n : t;
	}
	return {
		start: r(e?.start ?? t),
		end: r(e?.end ?? t)
	};
}
function xt(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : mt(e);
}
function St(e, t = 0) {
	return mt(e) ? pt(e) : t;
}
function Ct(e, { positive: t = !1, fallback: n, allowNegative: r = !1 } = {}) {
	let i = pt(e);
	return !Number.isFinite(i) || (t ? i <= 0 : !r && i < 0) ? n : i;
}
//#endregion
//#region src/components/mat-hover/MatHover.vue
var wt = /*@__PURE__*/ Object.assign({
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
			validator: (e) => xt(e, { allowUndefined: !1 })
		},
		openDelay: {
			type: [Number, String],
			default: 0,
			validator: (e) => xt(e, { allowUndefined: !1 })
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
			let n = St(t, 0);
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
function Tt() {
	return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
}
function Et() {
	let e = 0, t;
	function n() {
		e += 1, t !== void 0 && (globalThis.clearTimeout(t), t = void 0);
	}
	function r(r, i, a) {
		n();
		let o = e;
		if (Tt()) {
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
var Dt = Symbol("mat-app-root"), Ot = /* @__PURE__ */ new WeakMap();
function kt(e, t) {
	Ot.set(e, t);
}
function At(e) {
	Ot.delete(e);
}
function jt(e) {
	return Ot.get(e) ?? null;
}
function Mt() {
	let e = p(Dt, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var Nt = [
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
], Pt = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function Ft(e) {
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
function It(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function Lt(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function Rt(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function zt(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function Bt(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: It(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: Lt(t, n, r)
	};
}
function Vt(e) {
	return [
		e,
		Pt[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== Pt[e])
	];
}
function Ht(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function Ut(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function Wt(e, t, n, r, i, a, o, s) {
	let c = Bt(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: Rt(c.left, a, l),
		top: Rt(c.top, a, u)
	}, f = Ht(d, r);
	return Ut(f, n) || s.some((e) => Ut(f, Ft(e))) ? null : d;
}
function Gt({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = Ft(i), c = Ft(a), [l, u = "center"] = (Nt.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = zt(l, s, o, r, t), m = Pt[l], h = zt(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = Vt(g), b = e.map((e) => Ft(e)), x = y.find((e) => zt(e, s, o, r, t) >= f && Wt(e, d, s, c, o, r, t, b)) ?? y.find((e) => Wt(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = Bt(x, d, s, c, t);
	return {
		left: Math.round(Rt(C.left, r, _)),
		location: S,
		top: Math.round(Rt(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var Kt = null, qt = /* @__PURE__ */ new WeakMap();
function Jt(e) {
	Kt && Kt !== e && Kt.close(), Kt = e;
}
function Yt(e) {
	Kt === e && (Kt = null);
}
function Xt(e, t) {
	e && qt.set(e, {
		owner: t,
		expiresAt: Infinity
	});
}
function Zt(e, t, n) {
	if (!e) return;
	let r = qt.get(e);
	if (!(!r || r.owner !== t)) {
		if (n <= 0) {
			qt.delete(e);
			return;
		}
		r.expiresAt = Date.now() + n;
	}
}
function Qt(e, t) {
	if (!e) return !1;
	let n = qt.get(e);
	return !n || n.owner === t ? !1 : n.expiresAt < Date.now() ? (qt.delete(e), !1) : !0;
}
//#endregion
//#region src/components/toolbar-overlay.js
var $t = /* @__PURE__ */ new Map(), en = /* @__PURE__ */ new Set(), tn = 0;
function nn(e) {
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
function rn() {
	en.forEach((e) => e());
}
function an() {
	$t.forEach((e, t) => {
		e.element.isConnected || $t.delete(t);
	});
}
function on(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = tn;
	tn += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return $t.set(n, r), rn(), {
		unregister() {
			i && (i = !1, $t.delete(n), rn());
		},
		update() {
			i && rn();
		}
	};
}
function sn() {
	return an(), [...$t.values()].flatMap((e) => {
		try {
			return [nn(e.getRect())];
		} catch {
			return [];
		}
	});
}
function cn(e = window.innerHeight) {
	an();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...$t.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - nn(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function ln(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return en.add(e), e(), () => {
		en.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var un = ["id", "data-location"], dn = {
	key: 0,
	class: "mat-tooltip__subhead mat-sys-typescale-title-small"
}, fn = { class: "mat-tooltip__content mat-sys-typescale-body-medium" }, pn = {
	key: 1,
	class: "mat-tooltip__actions"
}, mn = 600, hn = 150, gn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Nt.includes(e);
			}
		},
		openDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => xt(e)
		},
		closeDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => xt(e)
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: c }) {
		let u = e, f = c, m = $("tooltip", u), _ = L(), v = R(), T = d(), E = p(Dt, null), D = O(null), k = P(null), A = { value: k }, M = P(null), N = O(!1), B = O(null), V = O(!1), H = O(!1), U = O(!1), W = O("closed"), G = O("top"), te = O({}), K = O(!1), q = `${ee().replace(/[^\w-]/g, "-")}-tooltip`, J = r(() => typeof _.id == "string" ? _.id : q), Y = r(() => m.content === void 0 ? !!v.default : m.content.length > 0), X = r(() => m.subhead === void 0 ? !!v.subhead : m.subhead.length > 0), ne = r(() => m.rich || X.value || !!v.action), re = r(() => !!v.activator), ie = T?.vnode.props ?? {}, ae = Object.prototype.hasOwnProperty.call(ie, "modelValue") || Object.prototype.hasOwnProperty.call(ie, "model-value"), Z, oe, se = Et(), ce, le = !1, ue, de, fe = null, pe = null, me = null, he = null, ge = null, _e = !1, ve = !0, ye = !1, be = !1, xe = !1, Se = null, Ce = { close: Qe }, we = Symbol("mat-tooltip-delay-group-owner");
		function Te(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? Te(e.value) : "$el" in e ? Te(e.$el) : null : null;
		}
		function Q(e) {
			try {
				return Te(document.querySelector(e));
			} catch {
				return null;
			}
		}
		function Ee() {
			return typeof m.target == "string" ? Q(m.target) : Te(m.target);
		}
		function De() {
			let e = D.value ? [...D.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function Oe() {
			return re.value ? De() : Ee();
		}
		function ke() {
			return Ae() ? typeof m.attach == "string" ? Q(m.attach) : Te(m.attach) : Ne() || (E?.rootElement.value?.contains(k.value) && E.freeLayer.value ? E.freeLayer.value : document.body);
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
			return St(e, 0);
		}
		function Fe() {
			let e = m.closeDelay;
			return St(e, mn);
		}
		function Ie() {
			return k.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function Le() {
			oe !== void 0 && (window.clearTimeout(oe), oe = void 0);
		}
		function Re() {
			Z !== void 0 && (window.clearTimeout(Z), Z = void 0);
		}
		function ze() {
			se.cancel();
		}
		function Be() {
			ue !== void 0 && (window.cancelAnimationFrame(ue), ue = void 0);
		}
		function Ve() {
			Be(), H.value && (ue = window.requestAnimationFrame(() => {
				if (ue = void 0, H.value) {
					if (k.value && !k.value.isConnected) {
						Ze({ immediate: !0 });
						return;
					}
					Ve();
				}
			}));
		}
		function He(e, t) {
			se.wait(B.value, e, t);
		}
		function Ue() {
			ce !== void 0 && (le ? window.cancelAnimationFrame(ce) : window.clearTimeout(ce), ce = void 0, le = !1);
		}
		function We() {
			he && (ge === null ? he.removeAttribute("aria-describedby") : he.setAttribute("aria-describedby", ge), he = null, ge = null);
		}
		function Ge() {
			let e = k.value;
			if (!H.value || !e || he === e) return;
			We(), he = e, ge = e.getAttribute("aria-describedby");
			let t = (ge ?? "").split(/\s+/).filter(Boolean);
			t.includes(J.value) || t.push(J.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function Ke() {
			Ue(), de?.disconnect(), de = void 0, pe &&= (pe(), null), me &&= (me(), null);
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
			] : sn(), a = Gt({
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
			G.value = a.location, te.value = {
				left: `${a.left}px`,
				top: `${a.top}px`
			}, U.value = !0;
		}
		function Je() {
			if (!H.value || ce !== void 0) return;
			let e = () => {
				ce = void 0, le = !1, qe();
			};
			if (typeof window.requestAnimationFrame == "function") {
				le = !0, ce = window.requestAnimationFrame(e);
				return;
			}
			ce = window.setTimeout(e, 0);
		}
		function Ye() {
			pe || (window.addEventListener("resize", Je), document.addEventListener("scroll", Je, !0), pe = () => {
				window.removeEventListener("resize", Je), document.removeEventListener("scroll", Je, !0);
			}, me = ln(Je), typeof ResizeObserver < "u" && (de = new ResizeObserver(Je), de.observe(k.value), de.observe(B.value)));
		}
		function Xe() {
			V.value = !1, W.value = "closed", H.value = !1, U.value = !1, M.value = null, N.value = !1;
		}
		function Ze({ immediate: e = !1 } = {}) {
			if (Le(), Re(), Be(), Ke(), We(), Yt(Ce), !V.value) {
				Xe();
				return;
			}
			if (!(!e && W.value === "closing")) {
				if (e) {
					ze(), Xe();
					return;
				}
				H.value = !1, W.value = "closing", He(hn, Xe);
			}
		}
		function Qe() {
			ae && (K.value = !0, f("update:modelValue", !1)), Ze();
		}
		function $e() {
			xe || (xe = !0, console.warn(re.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function et({ warn: e = !0 } = {}) {
			let t = Oe();
			if (!t && H.value && Ze({ immediate: !0 }), t === k.value) {
				!t && Y.value && e && $e();
				return;
			}
			let n = k.value !== null;
			We(), dt(), k.value = t, xe = !1, !t && Y.value && e && $e(), ft(), n && H.value && Qe();
		}
		function tt() {
			if (Re(), ae || H.value || K.value || !Y.value) return;
			let e = Qt(Ie(), we) ? 0 : Pe();
			if (e === 0) {
				pt();
				return;
			}
			oe === void 0 && (oe = window.setTimeout(() => {
				oe = void 0, pt();
			}, e));
		}
		function nt() {
			Le(), !(ae || !H.value || ye || be) && Z === void 0 && (Z = window.setTimeout(() => {
				Z = void 0, Qe();
			}, Fe()));
		}
		function rt() {
			if (ye || be) {
				tt();
				return;
			}
			Zt(Se, we, m.skipDelayDuration), nt();
		}
		function it(e) {
			ye = e, rt();
		}
		function at() {
			be = !0, rt();
		}
		function ot(e) {
			k.value?.contains(e.relatedTarget) || ne.value && B.value?.contains(e.relatedTarget) || (be = !1, rt());
		}
		function st() {
			ne.value && (ye = !0, rt());
		}
		function ct() {
			ne.value && (ye = !1, rt());
		}
		function lt() {
			ne.value && (be = !0, rt());
		}
		function ut(e) {
			e.key === "Escape" && (e.preventDefault(), Qe());
		}
		function dt() {
			fe && (fe(), fe = null, ye = !1, be = !1);
		}
		function ft() {
			let e = k.value;
			e && (e.addEventListener("keydown", ut), !ae && Y.value && (e.addEventListener("focusin", at), e.addEventListener("focusout", ot)), fe = () => {
				e.removeEventListener("keydown", ut), e.removeEventListener("focusin", at), e.removeEventListener("focusout", ot);
			});
		}
		async function pt() {
			if (!_e || !ve || K.value || !Y.value) return;
			if (et({ warn: !0 }), !k.value) {
				Qe();
				return;
			}
			let e = ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Qe();
				return;
			}
			Le(), Re(), ze(), Jt(Ce), Se = Ie(), Xt(Se, we), M.value = e, N.value = e === E?.freeLayer.value, G.value = m.location, te.value = {
				left: "0px",
				top: "0px"
			}, U.value = !1, W.value = "opening", V.value = !0, H.value = !0, await g(), !(!_e || !ve || !H.value) && (Ge(), qe(), Ye(), Ve());
		}
		return S(async () => {
			_e = !0, et({ warn: !1 }), await g(), _e && (et({ warn: !1 }), ae && m.modelValue && pt());
		}), C(() => {
			et({ warn: !1 }), H.value && Je();
		}), y(() => {
			ve || (ve = !0, et({ warn: !1 }), ae && m.modelValue && pt());
		}), x(() => {
			ve = !1, ze(), Be(), dt(), Ze({ immediate: !0 });
		}), b(() => {
			_e = !1, ze(), Be(), dt(), H.value && Ze({ immediate: !0 });
		}), z(() => m.modelValue, (e) => {
			if (!(!_e || !ve || !ae)) {
				if (e) {
					K.value = !1, pt();
					return;
				}
				K.value = !1, Ze();
			}
		}), z([() => m.content, () => m.target], async () => {
			await g();
			let e = k.value;
			et({ warn: !1 }), k.value === e && (dt(), ft()), Y.value || Qe();
		}), z(() => m.attach, async () => {
			if (!H.value) return;
			let e = ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Qe();
				return;
			}
			M.value = e, N.value = e === E?.freeLayer.value, await g(), Je();
		}), z(() => m.location, () => {
			H.value && Je();
		}), z(J, () => {
			!H.value || !he || (We(), Ge());
		}), E && z(E.publicContext.layout, Je), (r, c) => (w(), o(t, null, [
			!I(ae) && Y.value ? (w(), i(wt, {
				key: 0,
				target: A,
				"onUpdate:modelValue": it
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
				id: J.value,
				ref_key: "tooltipElement",
				ref: B,
				class: ["mat-tooltip mat-sys-typescale-label-large", [`mat-tooltip--${W.value}`, {
					"mat-tooltip--app-root": N.value,
					"mat-tooltip--positioned": U.value,
					"mat-tooltip--rich": ne.value
				}]],
				"data-location": G.value,
				style: [te.value, r.$attrs.style],
				role: "tooltip",
				onFocusin: lt,
				onFocusout: ot,
				onMouseenter: st,
				onMouseleave: ct
			}), [ne.value ? (w(), o(t, { key: 0 }, [
				X.value ? (w(), o("span", dn, [I(m).subhead === void 0 ? j(r.$slots, "subhead", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(m).subhead), 1)], 64))])) : a("", !0),
				s("span", fn, [I(m).content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(m).content), 1)], 64))]),
				r.$slots.action ? (w(), o("span", pn, [j(r.$slots, "action", {}, void 0, !0)])) : a("", !0)
			], 64)) : I(m).content === void 0 ? j(r.$slots, "default", { key: 2 }, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(I(m).content), 1)], 64))], 16, un)], 8, ["to"])) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-f1dafce1"]]), _n = Symbol("mde-vue-button-group"), vn = Symbol("mde-vue-split-button");
//#endregion
//#region src/components/use-button.js
function yn(e, t) {
	let n = p(Ae, ke), i = p(_n, null), a = p(vn, null), o = r(() => a?.size.value ?? e.size ?? i?.size.value ?? "small"), s = r(() => a ? "round" : e.shape ?? i?.shape.value ?? "round"), c = r(() => a?.variant.value ?? e.variant), l = r(() => a?.color.value ?? e.color ?? i?.color.value), u = r(() => e.disabled || !!a?.disabled.value || !!i?.disabled.value), d = r(() => !!(i && i.selection.value !== "none")), f = r(() => a?.role === "trailing" ? a.expanded.value : d.value ? i.isSelected(e.value) : e.selected), m = r(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = ct(l);
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
var bn = Object.freeze([
	"display",
	"headline",
	"title",
	"body",
	"label"
]), xn = Object.freeze([
	"large",
	"medium",
	"small"
]), Sn = Object.freeze({
	L: "large",
	M: "medium",
	S: "small"
});
function Cn(e) {
	return bn.includes(e);
}
function wn(e) {
	return xn.includes(e) || Object.hasOwn(Sn, e);
}
function Tn(e) {
	return Sn[e] ?? e;
}
function En(e, t, n = !1) {
	return [
		"mat-sys-typescale",
		n ? "emphasized" : void 0,
		e,
		Tn(t)
	].filter(Boolean).join("-");
}
//#endregion
//#region src/components/mat-btn/MatBtn.vue
var Dn = {
	key: 2,
	class: "mat-btn__label"
}, On = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Me.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return Ne.includes(e);
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
				return Be(e) || ze(e);
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
				return Pe.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let s = $("btn", e), c = n, u = L(), d = R(), f = O(null), p = ee(), { colorStyle: g, effectiveColor: _, effectiveDisabled: v, effectiveSelected: y, effectiveShape: b, effectiveSize: x, effectiveToggle: C, effectiveVariant: T, handleClick: E, hasExplicitColor: D, split: k, useCursor: A } = yn(s, c), M = r(() => ze(_.value)), N = r(() => !M.value || T.value === "text"), P = r(() => N.value ? g.value : {}), z = r(() => N.value && D.value), H = r(() => C.value && T.value !== "text"), U = r(() => H.value && y.value), W = r(() => s.icon === !0 || typeof s.icon == "string" && s.icon.trim().length > 0), G = r(() => s.fill === void 0 ? +!!U.value : s.fill);
		function te(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : m(e) ? e.type === t && Array.isArray(e.children) ? te(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? te(e.children) : [] : []).join("").trim();
		}
		let K = r(() => s.icon === !0 ? te(d.default?.() ?? []) : ""), q = r(() => typeof s.icon == "string" ? s.icon.trim() : K.value), J = r(() => u["aria-label"] ?? s.label), Y = r(() => W.value ? u.title ?? s.label : void 0), X = r(() => !W.value && (s.prefix !== void 0 || !!d.prefix)), ne = r(() => !W.value && (s.suffix !== void 0 || !!d.suffix)), re = r(() => U.value && !!d.selected), ie = r(() => ({
			"extra-small": 20,
			small: W.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[x.value]), ae = r(() => {
			let [e, t] = {
				"extra-small": ["label", "large"],
				small: ["label", "large"],
				medium: ["title", "medium"],
				large: ["headline", "small"],
				"extra-large": ["headline", "large"]
			}[x.value];
			return En(e, t, !0);
		});
		return S(() => {
			s.icon === !0 && !K.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), B(() => {
			s.toggle && s.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), M.value && T.value !== "text" && console.warn("MatBtn: on-* 内容色只支持 text 形态，当前按默认配色处理"), W.value && (!J.value || J.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (e, n) => (w(), i(De, h({
			ref_key: "buttonElement",
			ref: f
		}, I(u), {
			class: ["mat-btn", [
				`mat-btn--${I(T)}`,
				`mat-btn--size-${I(x)}`,
				`mat-btn--shape-${I(b)}`,
				ae.value,
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
			"aria-label": W.value ? J.value : I(u)["aria-label"],
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
				W.value ? (w(), i(dt, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: G.value,
					"optical-size": ie.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [l(F(q.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : a("", !0),
				X.value ? (w(), i(dt, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: G.value,
					"optical-size": ie.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(s).prefix === void 0 ? j(e.$slots, "prefix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(s).prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				W.value ? a("", !0) : (w(), o("span", Dn, [re.value ? j(e.$slots, "selected", { key: 0 }, void 0, !0) : j(e.$slots, "default", { key: 1 }, void 0, !0)])),
				ne.value ? (w(), i(dt, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: G.value,
					"optical-size": ie.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: V(() => [I(s).suffix === void 0 ? j(e.$slots, "suffix", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(s).suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : a("", !0),
				W.value && Y.value ? (w(), i(gn, {
					key: 4,
					content: Y.value,
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
}), [["__scopeId", "data-v-1388d1f6"]]), kn = ["data-scrollable"], An = { class: "mat-app-root__overlay" }, jn = { class: "mat-app-root__bottom-stack" }, Mn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		if (p(Dt, null)) throw Error("MatAppRoot 不允许嵌套");
		let a = L(), c = O(null), l = O(null), u = O(null), d = O(null), f = O(null), m = O(null), _ = O(null), v = O(null), y = E({
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
		}]), M = [], N = !1, P, F, ee = !1;
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
			if (!N || ee) return;
			ee = !0;
			let e = () => {
				ee = !1, F = void 0, W();
			};
			if (typeof window.requestAnimationFrame == "function") {
				F = window.requestAnimationFrame(e);
				return;
			}
			F = window.setTimeout(e, 0);
		}
		function te({ edge: e, element: n } = {}) {
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
		let K = Object.freeze({
			layout: x,
			registerEdge: te
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
		let J = {
			publicContext: K,
			rootElement: D(c),
			contentElement: D(l),
			edgeLayer: D(u),
			freeLayer: D(d),
			modalLayer: D(f),
			snackbarLayer: D(m),
			floatingLayer: D(_),
			documentMode: r(() => i.fillViewport && !i.scrollable),
			getLayoutRect: q
		};
		T(Dt, J);
		function Y() {
			window.addEventListener("resize", G), document.addEventListener("scroll", G, !0), window.visualViewport?.addEventListener("resize", G), window.visualViewport?.addEventListener("scroll", G);
		}
		function X() {
			window.removeEventListener("resize", G), document.removeEventListener("scroll", G, !0), window.visualViewport?.removeEventListener("resize", G), window.visualViewport?.removeEventListener("scroll", G);
		}
		return S(async () => {
			N = !0, kt(c.value, J), P = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(G), P?.observe(c.value), M.forEach((e) => {
				e.active && P?.observe(e.element);
			}), Y(), await g(), G();
		}), b(() => {
			N = !1, At(c.value), P?.disconnect(), P = void 0, X(), F !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(F) : window.clearTimeout(F));
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
			s("div", An, [
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
				s("div", jn, [
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
		], 16, kn));
	}
}), [["__scopeId", "data-v-8118b3b6"]]), Nn = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap();
function Fn(e, t, n) {
	let r = [n.initialValue, ...n.names].filter((e) => e && e !== "none"), i = e.style;
	i[t] = r.join(", ");
}
function In(e, t, n, r) {
	let i = e.get(t);
	return i || (i = {
		initialValue: t.style[n],
		names: /* @__PURE__ */ new Set()
	}, e.set(t, i)), i.names.add(r), Fn(t, n, i), () => {
		if (i.names.delete(r), i.names.size > 0) {
			Fn(t, n, i);
			return;
		}
		let a = t.style;
		a[n] = i.initialValue, e.delete(t);
	};
}
function Ln({ name: e, scope: t, source: n }) {
	let r = Nn.get(n)?.initialAxis ?? n.style.scrollTimelineAxis, i = In(Nn, n, "scrollTimelineName", e), a = Nn.get(n);
	a.initialAxis = r;
	let o = n.style;
	o.scrollTimelineAxis = "block";
	let s = In(Pn, t, "timelineScope", e);
	return () => {
		s(), i(), Nn.has(n) || (o.scrollTimelineAxis = r);
	};
}
function Rn(e) {
	let t = e.parentElement;
	for (; t;) {
		let e = window.getComputedStyle(t).overflowY;
		if (/(auto|scroll|overlay)/.test(e)) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function zn(e, t) {
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
var Bn = {
	key: 0,
	class: "mat-app-bar__leading"
}, Vn = { class: "mat-app-bar__main" }, Hn = {
	key: 0,
	class: "mat-app-bar__subtitle mat-sys-typescale-body-medium"
}, Un = {
	key: 1,
	class: "mat-app-bar__trailing"
}, Wn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		], u = ["start", "center"], f = $("appBar", e), m = L(), y = d(), x = p(Dt, null), C = y?.vnode.props ?? {}, T = Object.prototype.hasOwnProperty.call(C, "attach"), E = O(null), D = O(null), k = P(null), A = `--mat-app-bar-${y?.uid ?? Math.random().toString(36).slice(2)}`, M = r(() => c.includes(f.variant) ? f.variant : "small"), N = r(() => M.value === "search" ? "search" : l.includes(f.content) ? f.content : "headline"), F = r(() => u.includes(f.align) ? f.align : "start"), ee = r(() => M.value === "medium-flexible" ? 112 : M.value === "large-flexible" ? 120 : 64), R = r(() => f.app && !!x && !T), B = r(() => {
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
			let e = ee.value - 64;
			return !f.app || R.value ? e : ee.value;
		}), H = r(() => [
			`mat-app-bar--${M.value}`,
			`mat-app-bar--content-${N.value}`,
			`mat-app-bar--align-${F.value}`
		]), U = r(() => [m.style, { "--mat-app-bar-timeline": A }]), W = r(() => M.value === "medium-flexible" ? En("headline", "small") : M.value === "large-flexible" ? En("headline", "medium") : En("title", "large")), G = r(() => ({
			"mat-app-bar__host--app": f.app,
			"mat-app-bar__host--app-root": R.value
		})), te = !1, K;
		function q() {
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
			K?.(), K = void 0, D.value?.removeAttribute("data-timeline-active"), k.value?.unregister(), k.value = null;
		}
		async function X() {
			if (await g(), !te || !E.value || !D.value || (Y(), R.value && (k.value = x.publicContext.registerEdge({
				edge: "top",
				element: E.value
			})), !q())) return;
			let e = J(f.scrollTarget), t = R.value && x.rootElement.value?.dataset.scrollable === "true" ? x.contentElement.value : null, n = e ?? t ?? Rn(E.value);
			if (!n) return;
			let r = R.value ? x.rootElement.value : zn(n, D.value);
			r && (K = Ln({
				name: A,
				scope: r,
				source: n
			}), D.value.dataset.timelineActive = "");
		}
		return S(() => {
			te = !0, X();
		}), b(() => {
			te = !1, Y();
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
			e.$slots.leading ? (w(), o("div", Bn, [j(e.$slots, "leading", {}, void 0, !0)])) : a("", !0),
			s("div", Vn, [s("div", { class: _(["mat-app-bar__primary", W.value]) }, [j(e.$slots, "default", {}, void 0, !0)], 2), e.$slots.subtitle ? (w(), o("div", Hn, [j(e.$slots, "subtitle", {}, void 0, !0)])) : a("", !0)]),
			r[0] ||= s("span", {
				class: "mat-app-bar__spacer",
				"aria-hidden": "true"
			}, null, -1),
			e.$slots.trailing ? (w(), o("div", Un, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16)], 2)], 8, ["disabled", "to"])) : a("", !0), V.value > 0 ? (w(), o("span", {
			key: 1,
			"aria-hidden": "true",
			class: "mat-app-bar__placeholder",
			style: v({ blockSize: `${V.value}px` })
		}, null, 4)) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-1110f7cc"]]), Gn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-78f1e5d6"]]), Kn = { class: "mat-search__leading" }, qn = {
	key: 0,
	class: "mat-search__trailing"
}, Jn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let i = $("search", e), c = n, l = L(), d = O(null), f = r(() => ({
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
			onSubmit: W(m, ["prevent"])
		}), [
			s("span", Kn, [j(e.$slots, "leading", {}, () => [u(On, {
				disabled: I(i).disabled,
				icon: "search",
				label: I(i).label,
				size: "small",
				type: "button",
				variant: "standard",
				onClick: m
			}, null, 8, ["disabled", "label"])], !0)]),
			u(Gn, h({
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
			e.$slots.trailing ? (w(), o("span", qn, [j(e.$slots, "trailing", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-2ad22621"]]), Yn = 150, Xn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Me.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return Ne.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
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
		let n = $("btnGroup", e), i = t, a = O(null), s = O(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set(), f, p, m, _ = Yn, v = !0, y = !1, { colorStyle: x } = ct(r(() => n.color));
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
		T(_n, {
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
			return A(getComputedStyle(a.value).getPropertyValue("--mat-btn-group-size-animation-duration")) ?? Yn;
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
		function L(e) {
			return new Map([...e].map(([e, t]) => [e, {
				inlineSize: Number.parseFloat(t.inlineSize) || 0,
				paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
				paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
			}]));
		}
		function ee(e, t, n, r) {
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
			}), d.clear(), s.value && delete s.value.dataset.matGroupPressed, m &&= (m.style.removeProperty("--mat-button-visual-scale"), void 0), s.value = null, _ = Yn, v = !0, y = !1;
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
			})), t = L(new Map([...d].map((e) => [e, l.get(e)])));
			delete s.value.dataset.matGroupPressed, s.value.style.setProperty("--mat-button-visual-scale", "1"), s.value = null, v = !0, y = !1, ee(e, t, _, R);
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
			v = !1, y = !1, _ = r, ee(L(t), L(n), r, () => {
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
		function te(e) {
			e.relatedTarget instanceof Node && a.value?.contains(e.relatedTarget) || V();
		}
		async function K(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = k(e.target);
			t && (await g(), U(t));
		}
		function q() {
			if (n.variant !== "connected" || !a.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...a.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return S(() => {
			q(), W();
		}), C(W), b(() => {
			p?.disconnect(), R();
		}), z(() => [n.variant, n.selection], async () => {
			R(), await g(), q();
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
			onFocusout: te,
			onKeydown: K,
			onKeyupCapture: V,
			onLostpointercaptureCapture: V,
			onPointercancelCapture: V,
			onPointerdown: G,
			onPointerupCapture: V
		}), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-36a1694a"]]), Zn = [
	"small",
	"medium",
	"large"
], Qn = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], $n = [
	"button",
	"submit",
	"reset"
];
function er(e) {
	return typeof e == "string" && Qn.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var tr = {
	key: 1,
	class: "mat-fab__label"
}, nr = {
	key: 1,
	class: "mat-fab__label"
}, rr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return Zn.includes(e);
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
			validator: er
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return $n.includes(e);
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
		let c = $("fab", t), d = s, f = L(), m = R(), g = p(Ae, ke), _ = p(Dt, null), v = O(null), y = ee(), b = r(() => (m.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = r(() => typeof c.icon == "string" && c.icon.trim().length > 0), S = r(() => !b.value), C = r(() => S.value ? f.title ?? c.label : void 0), T = r(() => S.value ? c.label : f["aria-label"]), E = r(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[c.size]), D = r(() => {
			let [e, t] = {
				small: ["title", "medium"],
				medium: ["title", "large"],
				large: ["headline", "small"]
			}[c.size];
			return En(e, t);
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
		}, [u(De, h({
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
				x.value ? (w(), i(dt, {
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
				b.value ? (w(), o("span", nr, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(gn, {
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
		])], 8, ["to"])) : a("", !0) : (w(), i(De, h({
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
				x.value ? (w(), i(dt, {
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
				b.value ? (w(), o("span", tr, [j(e.$slots, "default", {}, void 0, !0)])) : a("", !0),
				S.value && C.value ? (w(), i(gn, {
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
}), [["__scopeId", "data-v-ae067ea6"]]), ir = ["src"], ar = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => gt(e, { property: "border-radius" })
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
			validator: (e) => gt(e, {
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
		let t = $("image", e), n = L(), i = r(() => ({
			class: n.class,
			style: n.style
		})), a = r(() => Object.fromEntries(Object.entries(n).filter(([e]) => !["class", "style"].includes(e)))), c = r(() => ({
			aspectRatio: vt(t.aspectRatio, {
				property: "aspect-ratio",
				positive: !0
			}),
			borderRadius: t.radius === void 0 ? "var(--mat-sys-shape-corner-extra-large)" : _t(t.radius, {
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
		}), null, 16, ir)], 16));
	}
}), [["__scopeId", "data-v-393cc4ac"]]), or = ["src"], sr = {
	key: 2,
	class: "mat-avatar__content"
}, cr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Be
		},
		size: {
			type: [Number, String],
			default: 40,
			validator: (e) => gt(e, {
				property: "width",
				positive: !0
			})
		}
	},
	setup(e) {
		let t = $("avatar", e), { colorStyle: n } = ct(r(() => t.color)), a = r(() => _t(t.size, {
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
		}, null, 8, or)) : I(t).icon ? (w(), i(dt, {
			key: 1,
			as: "span",
			class: "mat-avatar__icon",
			icon: I(t).icon,
			size: "var(--mat-avatar-icon-size)",
			"aria-hidden": "true"
		}, null, 8, ["icon"])) : (w(), o("span", sr, [j(e.$slots, "default", {}, void 0, !0)]))], 16));
	}
}), [["__scopeId", "data-v-cec55f96"]]), lr = Object.freeze({
	circle: "shape(from 100% 50%, curve to 97.573% 65.326% with 100% 55.173% / 99.191% 60.345%, curve to 79.556% 90.124% with 94.336% 75.287% / 88.029% 83.967%, curve to 50.405% 99.595% with 71.083% 96.28% / 60.878% 99.595%, curve to 21.253% 90.124% with 39.931% 99.595% / 29.726% 96.28%, curve to 3.236% 65.326% with 12.78% 83.967% / 6.473% 75.287%, curve to 3.236% 34.674% with 0% 55.365% / 0% 44.635%, curve to 21.253% 9.876% with 6.473% 24.713% / 12.78% 16.033%, curve to 50.405% 0.405% with 29.726% 3.72% / 39.931% 0.405%, curve to 79.556% 9.876% with 60.878% 0.405% / 71.083% 3.72%, curve to 97.573% 34.674% with 88.029% 16.033% / 94.336% 24.713%, curve to 100% 50% with 99.191% 39.655% / 100% 44.827%, close)",
	square: "shape(from 91.213% 91.213%, curve to 70% 100% with 85.784% 96.642% / 78.284% 100%, curve to 30% 100% with 56.667% 100% / 43.333% 100%, curve to 0% 70% with 13.431% 100% / 0% 86.569%, curve to 0% 30% with 0% 56.667% / 0% 43.333%, curve to 30% 0% with 0% 13.431% / 13.431% 0%, curve to 70% 0% with 43.333% 0% / 56.667% 0%, curve to 100% 30% with 86.569% 0% / 100% 13.431%, curve to 100% 70% with 100% 43.333% / 100% 56.667%, curve to 91.213% 91.213% with 100% 78.284% / 96.642% 85.784%, close)",
	slanted: "shape(from 87.553% 91.402%, curve to 85.041% 93.306% with 86.773% 92.106% / 85.933% 92.742%, curve to 61.38% 96.138% with 80.464% 96.198% / 74.103% 96.178%, curve to 20.195% 96.007% with 47.652% 96.094% / 33.923% 96.051%, curve to 18.5% 95.994% with 19.245% 96.004% / 18.769% 96.003%, curve to 0.749% 76.289% with 8.063% 95.655% / 0% 86.705%, curve to 0.912% 74.602% with 0.768% 76.021% / 0.816% 75.548%, curve to 5.015% 34.136% with 2.28% 61.113% / 3.647% 47.625%, curve to 10.293% 10.898% with 6.298% 21.478% / 6.94% 15.149%, curve to 14.959% 6.694% with 11.598% 9.242% / 13.176% 7.821%, curve to 38.62% 3.862% with 19.536% 3.802% / 25.897% 3.822%, curve to 79.805% 3.993% with 52.348% 3.906% / 66.077% 3.949%, curve to 81.5% 4.006% with 80.755% 3.996% / 81.231% 3.997%, curve to 99.251% 23.711% with 91.937% 4.345% / 100% 13.295%, curve to 99.088% 25.398% with 99.232% 23.979% / 99.184% 24.452%, curve to 94.985% 65.864% with 97.72% 38.887% / 96.353% 52.375%, curve to 89.707% 89.102% with 93.702% 78.522% / 93.06% 84.851%, curve to 87.553% 91.402% with 89.054% 89.93% / 88.334% 90.699%, close)",
	arch: "shape(from 14.645% 14.645%, curve to 50% 0% with 23.693% 5.596% / 36.193% 0%, curve to 100% 50% with 77.614% 0% / 100% 22.386%, curve to 100% 85.858% with 100% 61.953% / 100% 73.905%, curve to 85.858% 100% with 100% 93.668% / 93.668% 100%, curve to 14.142% 100% with 61.953% 100% / 38.047% 100%, curve to 0% 85.858% with 6.332% 100% / 0% 93.668%, curve to 0% 50% with 0% 73.905% / 0% 61.953%, curve to 14.645% 14.645% with 0% 36.193% / 5.596% 23.693%, close)",
	semicircle: "shape(from 96.949% 78.199%, curve to 89.583% 81.25% with 95.064% 80.084% / 92.46% 81.25%, curve to 10.417% 81.25% with 63.194% 81.25% / 36.806% 81.25%, curve to 0% 70.833% with 4.664% 81.25% / 0% 76.586%, curve to 0% 68.75% with 0% 70.139% / 0% 69.444%, curve to 50% 18.75% with 0% 41.136% / 22.386% 18.75%, curve to 100% 68.75% with 77.614% 18.75% / 100% 41.136%, curve to 100% 70.833% with 100% 69.444% / 100% 70.139%, curve to 96.949% 78.199% with 100% 73.71% / 98.834% 76.314%, close)",
	oval: "shape(from 90.846% 9.154%, curve to 97.74% 22.267% with 94.246% 12.555% / 96.61% 16.992%, curve to 89.782% 58.52% with 100% 32.818% / 97.137% 45.859%, curve to 58.52% 89.782% with 82.427% 71.182% / 71.182% 82.427%, curve to 22.267% 97.74% with 45.859% 97.137% / 32.818% 100%, curve to 2.26% 77.733% with 11.716% 95.481% / 4.519% 88.284%, curve to 10.218% 41.48% with 0% 67.182% / 2.863% 54.141%, curve to 41.48% 10.218% with 17.573% 28.818% / 28.818% 17.573%, curve to 77.733% 2.26% with 54.141% 2.863% / 67.182% 0%, curve to 90.846% 9.154% with 83.008% 3.39% / 87.445% 5.754%, close)",
	pill: "shape(from 87.316% 12.684%, curve to 99.546% 38.397% with 94.04% 19.407% / 98.515% 28.377%, curve to 100% 42.814% with 99.697% 39.87% / 99.849% 41.342%, curve to 87.127% 73.652% with 99.936% 54.387% / 95.31% 65.468%, curve to 73.652% 87.127% with 82.635% 78.143% / 78.143% 82.635%, curve to 42.814% 100% with 65.468% 95.31% / 54.387% 99.936%, curve to 38.397% 99.546% with 41.342% 99.849% / 39.87% 99.697%, curve to 0.454% 61.603% with 18.357% 97.485% / 2.515% 81.643%, curve to 0% 57.186% with 0.303% 60.13% / 0.151% 58.658%, curve to 12.873% 26.348% with 0.064% 45.613% / 4.69% 34.532%, curve to 26.348% 12.873% with 17.365% 21.857% / 21.857% 17.365%, curve to 57.186% 0% with 34.532% 4.69% / 45.613% 0.064%, curve to 61.603% 0.454% with 58.658% 0.151% / 60.13% 0.303%, curve to 87.316% 12.684% with 71.623% 1.485% / 80.593% 5.96%, close)",
	triangle: "shape(from 50% 7.781%, curve to 61.25% 14.276% with 54.375% 7.781% / 58.75% 9.946%, curve to 95% 72.733% with 72.5% 33.762% / 83.75% 53.248%, curve to 83.75% 92.219% with 100% 81.393% / 93.75% 92.219%, curve to 16.25% 92.219% with 61.25% 92.219% / 38.75% 92.219%, curve to 5% 72.733% with 6.25% 92.219% / 0% 81.393%, curve to 38.75% 14.276% with 16.25% 53.248% / 27.5% 33.762%, curve to 50% 7.781% with 41.25% 9.946% / 45.625% 7.781%, close)",
	arrow: "shape(from 49.939% 83.686%, curve to 43.839% 84.335% with 47.894% 83.676% / 45.848% 83.892%, curve to 27.798% 87.875% with 38.492% 85.515% / 33.145% 86.695%, curve to 8.128% 60.735% with 12.196% 91.318% / 0% 74.49%, curve to 17.289% 45.232% with 11.182% 55.567% / 14.236% 50.399%, curve to 49.882% 8.353% with 31.811% 20.657% / 39.072% 8.369%, curve to 82.589% 45.131% with 60.693% 8.336% / 67.992% 20.601%, curve to 91.61% 60.29% with 85.596% 50.184% / 88.603% 55.237%, curve to 71.398% 87.96% with 100% 74.389% / 87.382% 91.664%, curve to 56.031% 84.399% with 66.276% 86.773% / 61.153% 85.586%, curve to 49.939% 83.686% with 54.027% 83.935% / 51.983% 83.697%, close)",
	fan: "shape(from 95.718% 95.532%, curve to 88.918% 99.506% with 93.885% 97.414% / 91.55% 98.808%, curve to 78.801% 100% with 87.056% 100% / 84.304% 100%, curve to 15.124% 100% with 57.575% 100% / 36.35% 100%, curve to 0.045% 84.921% with 6.797% 100% / 0.045% 93.249%, curve to 0.045% 14.97% with 0.045% 61.604% / 0.045% 38.287%, curve to 15.172% 0.195% with 0.045% 6.672% / 6.876% 0%, curve to 21.458% 0.343% with 17.267% 0.244% / 19.362% 0.294%, curve to 99.732% 78.382% with 64.174% 1.347% / 98.599% 35.67%, curve to 99.736% 78.502% with 99.733% 78.422% / 99.735% 78.462%, curve to 99.51% 88.629% with 99.882% 84.004% / 99.955% 86.754%, curve to 95.718% 95.532% with 98.882% 91.279% / 97.55% 93.649%, close)",
	diamond: "shape(from 50% 100%, curve to 42.13% 97.768% with 47.271% 100% / 44.543% 99.256%, curve to 31.913% 86.111% with 39.803% 96.333% / 37.173% 92.925%, curve to 11.774% 60.017% with 25.2% 77.413% / 18.487% 68.715%, curve to 11.774% 40.727% with 7.388% 54.335% / 7.388% 46.409%, curve to 31.913% 14.633% with 18.487% 32.029% / 25.2% 23.331%, curve to 42.13% 2.975% with 37.173% 7.818% / 39.803% 4.411%, curve to 57.87% 2.975% with 46.955% 0% / 53.045% 0%, curve to 68.087% 14.633% with 60.197% 4.411% / 62.827% 7.818%, curve to 88.226% 40.727% with 74.8% 23.331% / 81.513% 32.029%, curve to 88.226% 60.017% with 92.612% 46.409% / 92.612% 54.335%, curve to 68.087% 86.111% with 81.513% 68.715% / 74.8% 77.413%, curve to 57.87% 97.768% with 62.827% 92.925% / 60.197% 96.333%, curve to 50% 100% with 55.457% 99.256% / 52.729% 100%, close)",
	clamshell: "shape(from 18.729% 81.565%, curve to 12.96% 75.683% with 16.358% 80.175% / 14.351% 78.165%, curve to 2.355% 56.748% with 9.425% 69.371% / 5.89% 63.06%, curve to 2.34% 43.243% with 0.006% 52.554% / 0% 47.442%, curve to 12.868% 24.348% with 5.849% 36.945% / 9.359% 30.646%, curve to 26.604% 16.277% with 15.644% 19.365% / 20.9% 16.277%, curve to 73.321% 16.277% with 42.176% 16.277% / 57.749% 16.277%, curve to 87.04% 24.317% with 79.012% 16.277% / 84.259% 19.352%, curve to 97.645% 43.252% with 90.575% 30.629% / 94.11% 36.94%, curve to 97.66% 56.757% with 99.994% 47.446% / 100% 52.558%, curve to 87.132% 75.652% with 94.151% 63.055% / 90.641% 69.354%, curve to 73.396% 83.723% with 84.356% 80.635% / 79.1% 83.723%, curve to 26.679% 83.723% with 57.824% 83.723% / 42.251% 83.723%, curve to 18.729% 81.565% with 23.834% 83.723% / 21.099% 82.954%, close)",
	pentagon: "shape(from 50% 4.284%, curve to 59.641% 7.343% with 53.375% 4.284% / 56.751% 5.304%, curve to 91.841% 30.066% with 70.374% 14.917% / 81.108% 22.491%, curve to 97.772% 48.142% with 97.59% 34.122% / 100% 41.468%, curve to 85.636% 84.489% with 93.726% 60.258% / 89.681% 72.374%, curve to 70.052% 95.716% with 83.397% 91.195% / 77.121% 95.716%, curve to 29.948% 95.716% with 56.684% 95.716% / 43.316% 95.716%, curve to 14.364% 84.489% with 22.879% 95.716% / 16.603% 91.195%, curve to 2.228% 48.142% with 10.319% 72.374% / 6.274% 60.258%, curve to 8.159% 30.066% with 0% 41.468% / 2.41% 34.122%, curve to 40.359% 7.343% with 18.892% 22.491% / 29.626% 14.917%, curve to 50% 4.284% with 43.249% 5.304% / 46.625% 4.284%, close)",
	gem: "shape(from 49.949% 99.998%, curve to 47.519% 99.871% with 49.138% 99.997% / 48.327% 99.954%, curve to 32.164% 94.239% with 43.561% 99.463% / 39.762% 97.722%, curve to 13.679% 85.767% with 26.002% 91.415% / 19.841% 88.591%, curve to 1.753% 63.832% with 5.274% 81.914% / 0.417% 72.981%, curve to 5.903% 35.418% with 3.136% 54.361% / 4.52% 44.89%, curve to 15.191% 20.168% with 6.799% 29.284% / 10.152% 23.779%, curve to 37.809% 3.958% with 22.73% 14.764% / 30.27% 9.361%, curve to 50.14% 0.008% with 41.404% 1.381% / 45.717% 0%, curve to 62.455% 4.005% with 54.562% 0.017% / 58.87% 1.415%, curve to 85.011% 20.301% with 69.974% 9.437% / 77.492% 14.869%, curve to 94.241% 35.587% with 90.036% 23.931% / 93.368% 29.45%, curve to 98.282% 64.017% with 95.588% 45.064% / 96.935% 54.54%, curve to 86.272% 85.905% with 99.583% 73.17% / 94.692% 82.085%, curve to 67.755% 94.307% with 80.1% 88.706% / 73.927% 91.507%, curve to 52.378% 99.88% with 60.143% 97.761% / 56.338% 99.487%, curve to 49.949% 99.998% with 51.57% 99.961% / 50.759% 100%, close)",
	"very-sunny": "shape(from 50.001% 99.329%, curve to 42.902% 95.306% with 47.255% 99.329% / 44.509% 97.988%, curve to 39.327% 89.339% with 41.71% 93.317% / 40.519% 91.328%, curve to 30.216% 85.564% with 37.453% 86.212% / 33.753% 84.678%, curve to 23.458% 87.256% with 27.963% 86.128% / 25.711% 86.692%, curve to 13.419% 77.213% with 17.393% 88.774% / 11.899% 83.278%, curve to 15.11% 70.466% with 13.982% 74.964% / 14.546% 72.715%, curve to 11.337% 61.355% with 15.996% 66.93% / 14.464% 63.229%, curve to 5.362% 57.772% with 9.346% 60.16% / 7.354% 58.966%, curve to 5.365% 43.572% with 0% 54.557% / 0.001% 46.786%, curve to 11.331% 39.997% with 7.353% 42.381% / 9.342% 41.189%, curve to 15.107% 30.886% with 14.459% 38.123% / 15.992% 34.423%, curve to 13.415% 24.129% with 14.543% 28.634% / 13.979% 26.381%, curve to 23.457% 14.089% with 11.896% 18.063% / 17.392% 12.569%, curve to 30.204% 15.78% with 25.706% 14.653% / 27.955% 15.217%, curve to 39.316% 12.008% with 33.741% 16.667% / 37.441% 15.135%, curve to 42.898% 6.033% with 40.51% 10.016% / 41.704% 8.024%, curve to 57.098% 6.035% with 46.113% 0.67% / 53.885% 0.672%, curve to 60.673% 12.002% with 58.29% 8.024% / 59.481% 10.013%, curve to 69.784% 15.777% with 62.547% 15.129% / 66.247% 16.662%, curve to 76.542% 14.085% with 72.037% 15.213% / 74.289% 14.649%, curve to 86.581% 24.128% with 82.607% 12.567% / 88.101% 18.063%, curve to 84.89% 30.874% with 86.018% 26.377% / 85.454% 28.625%, curve to 88.663% 39.986% with 84.004% 34.411% / 85.536% 38.111%, curve to 94.638% 43.569% with 90.654% 41.18% / 92.646% 42.375%, curve to 94.635% 57.769% with 100% 46.784% / 99.999% 54.555%, curve to 88.669% 61.344% with 92.647% 58.96% / 90.658% 60.152%, curve to 84.893% 70.454% with 85.541% 63.218% / 84.008% 66.917%, curve to 86.585% 77.212% with 85.457% 72.707% / 86.021% 74.96%, curve to 76.543% 87.252% with 88.104% 83.277% / 82.608% 88.772%, curve to 69.796% 85.561% with 74.294% 86.688% / 72.045% 86.124%, curve to 60.684% 89.333% with 66.259% 84.674% / 62.559% 86.206%, curve to 57.102% 95.308% with 59.49% 91.325% / 58.296% 93.316%, curve to 50.001% 99.329% with 55.494% 97.989% / 52.748% 99.33%, close)",
	sunny: "shape(from 99.691% 50%, curve to 97.834% 55.042% with 99.691% 51.795% / 99.072% 53.589%, curve to 90.242% 63.95% with 95.303% 58.011% / 92.773% 60.98%, curve to 88.41% 68.373% with 89.181% 65.195% / 88.54% 66.742%, curve to 87.479% 80.04% with 88.1% 72.262% / 87.79% 76.151%, curve to 80.349% 87.17% with 87.176% 83.845% / 84.154% 86.866%, curve to 68.683% 88.101% with 76.46% 87.48% / 72.571% 87.79%, curve to 64.259% 89.933% with 67.052% 88.231% / 65.504% 88.872%, curve to 55.351% 97.524% with 61.29% 92.463% / 58.321% 94.994%, curve to 45.268% 97.524% with 52.446% 100% / 48.173% 100%, curve to 36.36% 89.933% with 42.298% 94.994% / 39.329% 92.463%, curve to 31.936% 88.101% with 35.115% 88.872% / 33.567% 88.231%, curve to 20.27% 87.17% with 28.048% 87.79% / 24.159% 87.48%, curve to 13.14% 80.04% with 16.465% 86.866% / 13.443% 83.845%, curve to 12.209% 68.373% with 12.829% 76.151% / 12.519% 72.262%, curve to 10.377% 63.95% with 12.079% 66.742% / 11.437% 65.195%, curve to 2.785% 55.042% with 7.846% 60.98% / 5.316% 58.011%, curve to 2.785% 44.958% with 0.309% 52.137% / 0.309% 47.863%, curve to 10.377% 36.05% with 5.316% 41.989% / 7.846% 39.02%, curve to 12.209% 31.627% with 11.437% 34.805% / 12.079% 33.258%, curve to 13.14% 19.96% with 12.519% 27.738% / 12.829% 23.849%, curve to 20.27% 12.83% with 13.443% 16.155% / 16.465% 13.134%, curve to 31.936% 11.899% with 24.159% 12.52% / 28.048% 12.21%, curve to 36.36% 10.067% with 33.567% 11.769% / 35.115% 11.128%, curve to 45.268% 2.476% with 39.329% 7.537% / 42.298% 5.006%, curve to 55.351% 2.476% with 48.173% 0% / 52.446% 0%, curve to 64.259% 10.067% with 58.321% 5.006% / 61.29% 7.537%, curve to 68.683% 11.899% with 65.504% 11.128% / 67.052% 11.769%, curve to 80.349% 12.83% with 72.571% 12.21% / 76.46% 12.52%, curve to 87.479% 19.96% with 84.154% 13.134% / 87.176% 16.155%, curve to 88.41% 31.627% with 87.79% 23.849% / 88.1% 27.738%, curve to 90.242% 36.05% with 88.54% 33.258% / 89.181% 34.805%, curve to 97.834% 44.958% with 92.773% 39.02% / 95.303% 41.989%, curve to 99.691% 50% with 99.072% 46.411% / 99.691% 48.205%, close)",
	"4-sided-cookie": "shape(from 87.137% 87.078%, curve to 62.198% 91.859% with 81.048% 93.176% / 71.594% 95.913%, curve to 58.118% 90.099% with 60.838% 91.272% / 59.478% 90.686%, curve to 41.921% 90.112% with 52.948% 87.868% / 47.087% 87.873%, curve to 37.885% 91.861% with 40.576% 90.695% / 39.23% 91.278%, curve to 8.157% 62.181% with 19.107% 100% / 0.049% 80.973%, curve to 9.918% 58.101% with 8.744% 60.821% / 9.331% 59.461%, curve to 9.904% 41.904% with 12.148% 52.932% / 12.143% 47.07%, curve to 8.155% 37.869% with 9.321% 40.559% / 8.738% 39.214%, curve to 37.835% 8.141% with 0.016% 19.091% / 19.043% 0.033%, curve to 41.915% 9.901% with 39.195% 8.728% / 40.555% 9.314%, curve to 58.112% 9.888% with 47.084% 12.132% / 52.946% 12.127%, curve to 62.147% 8.139% with 59.457% 9.305% / 60.802% 8.722%, curve to 91.875% 37.819% with 80.926% 0% / 99.984% 19.027%, curve to 90.115% 41.899% with 91.289% 39.179% / 90.702% 40.539%, curve to 90.128% 58.096% with 87.884% 47.068% / 87.889% 52.93%, curve to 91.877% 62.131% with 90.711% 59.441% / 91.294% 60.786%, curve to 87.137% 87.078% with 95.947% 71.52% / 93.225% 80.979%, close)",
	"6-sided-cookie": "shape(from 71.652% 87.29%, curve to 66.983% 90.803% with 69.965% 88.262% / 68.396% 89.441%, curve to 66.833% 90.947% with 66.933% 90.851% / 66.883% 90.899%, curve to 33.196% 90.917% with 57.443% 100% / 42.569% 99.987%, curve to 23.155% 85.109% with 30.375% 88.188% / 26.927% 86.194%, curve to 22.955% 85.051% with 23.089% 85.09% / 23.022% 85.071%, curve to 6.162% 55.906% with 10.42% 81.446% / 2.995% 68.558%, curve to 6.172% 44.306% with 7.115% 52.098% / 7.119% 48.115%, curve to 6.122% 44.104% with 6.156% 44.239% / 6.139% 44.172%, curve to 22.967% 14.988% with 2.977% 31.446% / 10.425% 18.571%, curve to 33.017% 9.197% with 26.74% 13.91% / 30.192% 11.922%, curve to 33.167% 9.053% with 33.067% 9.149% / 33.117% 9.101%, curve to 66.804% 9.083% with 42.557% 0% / 57.431% 0.013%, curve to 76.845% 14.891% with 69.625% 11.812% / 73.073% 13.806%, curve to 77.045% 14.949% with 76.911% 14.91% / 76.978% 14.929%, curve to 93.838% 44.094% with 89.58% 18.554% / 97.005% 31.442%, curve to 93.828% 55.694% with 92.885% 47.902% / 92.881% 51.885%, curve to 93.878% 55.896% with 93.844% 55.761% / 93.861% 55.828%, curve to 77.033% 85.012% with 97.023% 68.554% / 89.575% 81.429%, curve to 71.652% 87.29% with 75.146% 85.551% / 73.34% 86.318%, close)",
	"7-sided-cookie": "shape(from 50% 2.182%, curve to 63.487% 7.755% with 54.88% 2.182% / 59.759% 4.04%, curve to 74.802% 13.204% with 66.537% 10.794% / 70.524% 12.715%, curve to 91.621% 34.294% with 85.261% 14.401% / 92.781% 23.831%, curve to 94.415% 46.537% with 91.146% 38.573% / 92.131% 42.888%, curve to 88.413% 72.836% with 100% 55.46% / 97.316% 67.22%, curve to 80.583% 82.654% with 84.771% 75.133% / 82.012% 78.593%, curve to 56.279% 94.358% with 77.088% 92.584% / 66.221% 97.818%, curve to 43.721% 94.358% with 52.213% 92.943% / 47.787% 92.943%, curve to 19.417% 82.654% with 33.779% 97.818% / 22.912% 92.584%, curve to 11.587% 72.836% with 17.988% 78.593% / 15.229% 75.133%, curve to 5.585% 46.537% with 2.684% 67.22% / 0% 55.46%, curve to 8.379% 34.294% with 7.869% 42.888% / 8.854% 38.573%, curve to 25.198% 13.204% with 7.219% 23.831% / 14.739% 14.401%, curve to 36.513% 7.755% with 29.476% 12.715% / 33.463% 10.794%, curve to 50% 2.182% with 40.241% 4.04% / 45.12% 2.182%, close)",
	"9-sided-cookie": "shape(from 50% 1.415%, curve to 60.187% 5.348% with 53.649% 1.415% / 57.298% 2.726%, curve to 70.961% 9.269% with 63.127% 8.015% / 66.995% 9.423%, curve to 86.569% 22.366% with 78.759% 8.967% / 85.512% 14.634%, curve to 92.302% 32.295% with 87.107% 26.298% / 89.165% 29.863%, curve to 95.84% 52.36% with 98.469% 37.076% / 100% 45.758%, curve to 93.849% 63.651% with 93.724% 55.718% / 93.009% 59.772%, curve to 83.661% 81.296% with 95.5% 71.278% / 91.092% 78.913%, curve to 74.879% 88.666% with 79.882% 82.508% / 76.729% 85.154%, curve to 55.733% 95.634% with 71.241% 95.57% / 62.957% 98.585%, curve to 44.267% 95.634% with 52.058% 94.134% / 47.942% 94.134%, curve to 25.121% 88.666% with 37.043% 98.585% / 28.759% 95.57%, curve to 16.339% 81.296% with 23.271% 85.154% / 20.118% 82.508%, curve to 6.151% 63.651% with 8.908% 78.913% / 4.5% 71.278%, curve to 4.16% 52.36% with 6.991% 59.772% / 6.276% 55.718%, curve to 7.698% 32.295% with 0% 45.758% / 1.531% 37.076%, curve to 13.431% 22.366% with 10.835% 29.863% / 12.893% 26.298%, curve to 29.039% 9.269% with 14.488% 14.634% / 21.241% 8.967%, curve to 39.813% 5.348% with 33.005% 9.423% / 36.873% 8.015%, curve to 50% 1.415% with 42.702% 2.726% / 46.351% 1.415%, close)",
	"12-sided-cookie": "shape(from 50% 0.515%, curve to 57.001% 3.608% with 52.561% 0.515% / 55.123% 1.546%, curve to 66.875% 6.254% with 59.493% 6.343% / 63.35% 7.376%, curve to 79.001% 13.255% with 72.19% 4.561% / 77.81% 7.805%, curve to 86.23% 20.483% with 79.792% 16.869% / 82.615% 19.693%, curve to 93.231% 32.609% with 91.679% 21.675% / 94.923% 27.294%, curve to 95.877% 42.484% with 92.108% 36.135% / 93.142% 39.992%, curve to 95.877% 56.485% with 100% 46.24% / 100% 52.729%, curve to 93.231% 66.36% with 93.142% 58.978% / 92.108% 62.834%, curve to 86.23% 78.486% with 94.923% 71.675% / 91.679% 77.294%, curve to 79.001% 85.715% with 82.615% 79.277% / 79.792% 82.1%, curve to 66.875% 92.716% with 77.81% 91.164% / 72.19% 94.408%, curve to 57.001% 95.361% with 63.35% 91.593% / 59.493% 92.626%, curve to 42.999% 95.361% with 53.244% 99.485% / 46.756% 99.485%, curve to 33.125% 92.716% with 40.507% 92.626% / 36.65% 91.593%, curve to 20.999% 85.715% with 27.81% 94.408% / 22.19% 91.164%, curve to 13.77% 78.486% with 20.208% 82.1% / 17.385% 79.277%, curve to 6.769% 66.36% with 8.321% 77.294% / 5.077% 71.675%, curve to 4.123% 56.485% with 7.892% 62.834% / 6.858% 58.978%, curve to 4.123% 42.484% with 0% 52.729% / 0% 46.24%, curve to 6.769% 32.609% with 6.858% 39.992% / 7.892% 36.135%, curve to 13.77% 20.483% with 5.077% 27.294% / 8.321% 21.675%, curve to 20.999% 13.255% with 17.385% 19.693% / 20.208% 16.869%, curve to 33.125% 6.254% with 22.19% 7.805% / 27.81% 4.561%, curve to 42.999% 3.608% with 36.65% 7.376% / 40.507% 6.343%, curve to 50% 0.515% with 44.877% 1.546% / 47.439% 0.515%, close)",
	"soft-burst": "shape(from 18.664% 27.242%, curve to 19.633% 23.807% with 19.362% 26.276% / 19.729% 25.07%, curve to 18.945% 14.826% with 19.403% 20.813% / 19.174% 17.82%, curve to 26.069% 9.629% with 18.651% 10.985% / 22.501% 8.176%, curve to 34.459% 13.043% with 28.866% 10.767% / 31.662% 11.905%, curve to 40.828% 10.96% with 36.806% 13.999% / 39.5% 13.118%, curve to 45.55% 3.29% with 42.402% 8.403% / 43.976% 5.847%, curve to 54.369% 3.273% with 47.57% 0.01% / 52.336% 0%, curve to 59.149% 10.967% with 55.963% 5.837% / 57.556% 8.402%, curve to 65.527% 13.025% with 60.487% 13.119% / 63.184% 13.99%, curve to 73.855% 9.596% with 68.303% 11.882% / 71.079% 10.739%, curve to 81.001% 14.765% with 77.418% 8.129% / 81.279% 10.922%, curve to 80.345% 23.799% with 80.782% 17.776% / 80.564% 20.788%, curve to 84.295% 29.213% with 80.162% 26.327% / 81.833% 28.616%, curve to 93.049% 31.334% with 87.213% 29.92% / 90.131% 30.627%, curve to 95.791% 39.716% with 96.793% 32.241% / 98.275% 36.771%, curve to 89.95% 46.64% with 93.844% 42.024% / 91.897% 44.332%, curve to 89.964% 53.341% with 88.316% 48.577% / 88.322% 51.411%, curve to 95.799% 60.202% with 91.909% 55.628% / 93.854% 57.915%, curve to 93.09% 68.595% with 98.295% 63.137% / 96.831% 67.673%, curve to 84.296% 70.764% with 90.159% 69.318% / 87.227% 70.041%, curve to 80.367% 76.193% with 81.835% 71.37% / 80.174% 73.667%, curve to 81.055% 85.174% with 80.597% 79.187% / 80.826% 82.18%, curve to 73.931% 90.371% with 81.349% 89.015% / 77.499% 91.824%, curve to 65.541% 86.957% with 71.134% 89.233% / 68.338% 88.095%, curve to 59.172% 89.04% with 63.194% 86.001% / 60.5% 86.882%, curve to 54.45% 96.71% with 57.598% 91.597% / 56.024% 94.153%, curve to 45.631% 96.727% with 52.43% 99.99% / 47.664% 100%, curve to 40.851% 89.033% with 44.037% 94.163% / 42.444% 91.598%, curve to 34.473% 86.975% with 39.513% 86.881% / 36.816% 86.01%, curve to 26.145% 90.404% with 31.697% 88.118% / 28.921% 89.261%, curve to 18.999% 85.235% with 22.582% 91.871% / 18.721% 89.078%, curve to 19.655% 76.201% with 19.218% 82.224% / 19.436% 79.212%, curve to 15.705% 70.787% with 19.838% 73.673% / 18.167% 71.384%, curve to 6.951% 68.666% with 12.787% 70.08% / 9.869% 69.373%, curve to 4.209% 60.284% with 3.207% 67.759% / 1.725% 63.229%, curve to 10.05% 53.36% with 6.156% 57.976% / 8.103% 55.668%, curve to 10.036% 46.659% with 11.684% 51.423% / 11.678% 48.589%, curve to 4.201% 39.798% with 8.091% 44.372% / 6.146% 42.085%, curve to 6.91% 31.405% with 1.705% 36.863% / 3.169% 32.327%, curve to 15.704% 29.236% with 9.841% 30.682% / 12.773% 29.959%, curve to 18.664% 27.242% with 16.934% 28.933% / 17.965% 28.207%, close)",
	boom: "shape(from 45.414% 28.743%, curve to 45.961% 28.146% with 45.683% 28.685% / 45.92% 28.475%, curve to 49.314% 1.089% with 47.078% 19.127% / 48.196% 10.108%, curve to 50.699% 1.088% with 49.415% 0.274% / 50.596% 0.273%, curve to 54.106% 28.161% with 51.835% 10.113% / 52.971% 19.137%, curve to 55.397% 28.434% with 54.189% 28.819% / 55.055% 29.002%, curve to 69.465% 5.081% with 60.086% 20.65% / 64.775% 12.865%, curve to 70.731% 5.643% with 69.889% 4.377% / 70.969% 4.856%, curve to 62.832% 31.761% with 68.098% 14.349% / 65.465% 23.055%, curve to 63.9% 32.536% with 62.64% 32.395% / 63.357% 32.915%, curve to 86.25% 16.923% with 71.35% 27.331% / 78.8% 22.127%, curve to 87.178% 17.951% with 86.924% 16.452% / 87.716% 17.33%, curve to 69.339% 38.599% with 81.232% 24.834% / 75.286% 31.716%, curve to 70% 39.741% with 68.906% 39.1% / 69.349% 39.866%, curve to 96.768% 34.568% with 78.923% 38.017% / 87.845% 36.293%, curve to 97.198% 35.886% with 97.575% 34.413% / 97.941% 35.536%, curve to 72.502% 47.492% with 88.966% 39.754% / 80.734% 43.623%, curve to 72.642% 48.804% with 71.903% 47.774% / 71.996% 48.654%, curve to 99.2% 54.967% with 81.494% 50.858% / 90.347% 52.912%, curve to 99.056% 56.344% with 100% 55.152% / 99.878% 56.328%, curve to 71.775% 56.903% with 89.962% 56.531% / 80.869% 56.717%, curve to 71.369% 58.158% with 71.113% 56.917% / 70.84% 57.759%, curve to 93.124% 74.59% with 78.62% 63.635% / 85.872% 69.113%, curve to 92.433% 75.791% with 93.78% 75.085% / 93.19% 76.109%, curve to 67.283% 65.205% with 84.049% 72.262% / 75.666% 68.733%, curve to 66.401% 66.186% with 66.672% 64.948% / 66.081% 65.606%, curve to 79.592% 90.046% with 70.798% 74.139% / 75.195% 82.093%, curve to 78.472% 90.861% with 79.99% 90.765% / 79.034% 91.461%, curve to 59.802% 70.961% with 72.249% 84.228% / 66.026% 77.595%, curve to 58.598% 71.499% with 59.349% 70.478% / 58.541% 70.839%, curve to 60.944% 98.662% with 59.38% 80.553% / 60.162% 89.608%, curve to 59.589% 98.951% with 61.014% 99.48% / 59.859% 99.727%, curve to 50.627% 73.178% with 56.602% 90.36% / 53.614% 81.769%, curve to 49.308% 73.179% with 50.41% 72.552% / 49.524% 72.553%, curve to 40.403% 98.948% with 46.34% 81.769% / 43.371% 90.358%, curve to 39.048% 98.661% with 40.135% 99.724% / 38.979% 99.48%, curve to 41.344% 71.471% with 39.813% 89.597% / 40.578% 80.534%, curve to 40.138% 70.935% with 41.399% 70.811% / 40.59% 70.451%, curve to 21.522% 90.854% with 33.933% 77.575% / 27.727% 84.214%, curve to 20.401% 90.041% with 20.961% 91.454% / 20.004% 90.761%, curve to 33.557% 66.135% with 24.786% 82.072% / 29.172% 74.104%, curve to 32.674% 65.156% with 33.877% 65.555% / 33.284% 64.898%, curve to 7.565% 75.781% with 24.304% 68.698% / 15.935% 72.239%, curve to 6.872% 74.582% with 6.809% 76.101% / 6.217% 75.078%, curve to 28.614% 58.094% with 14.119% 69.086% / 21.367% 63.59%, curve to 28.205% 56.84% with 29.142% 57.694% / 28.867% 56.852%, curve to 0.946% 56.334% with 19.119% 56.671% / 10.033% 56.503%, curve to 0.8% 54.956% with 0.125% 56.318% / 0% 55.143%, curve to 27.369% 48.738% with 9.656% 52.883% / 18.513% 50.81%, curve to 27.505% 47.426% with 28.014% 48.587% / 28.105% 47.706%, curve to 2.809% 35.876% with 19.273% 43.576% / 11.041% 39.726%, curve to 3.236% 34.558% with 2.065% 35.528% / 2.429% 34.404%, curve to 30.037% 39.683% with 12.17% 36.266% / 21.103% 37.975%, curve to 30.695% 38.54% with 30.688% 39.808% / 31.129% 39.041%, curve to 12.832% 17.944% with 24.741% 31.675% / 18.786% 24.81%, curve to 13.758% 16.914% with 12.293% 17.324% / 13.083% 16.445%, curve to 36.157% 32.497% with 21.224% 22.108% / 28.691% 27.303%, curve to 37.223% 31.721% with 36.701% 32.876% / 37.416% 32.355%, curve to 29.281% 5.64% with 34.576% 23.027% / 31.929% 14.333%, curve to 30.546% 5.075% with 29.042% 4.854% / 30.121% 4.372%, curve to 44.671% 28.422% with 35.255% 12.857% / 39.963% 20.639%, curve to 45.414% 28.743% with 44.842% 28.705% / 45.144% 28.801%, close)",
	"soft-boom": "shape(from 73.394% 45.381%, curve to 79.318% 44.431% with 75.369% 45.065% / 77.343% 44.748%, curve to 88.788% 44.193% with 82.45% 43.929% / 85.635% 43.849%, curve to 92.306% 44.577% with 89.961% 44.321% / 91.133% 44.449%, curve to 97.484% 46.302% with 94.135% 44.776% / 95.901% 45.364%, curve to 98.039% 46.63% with 97.669% 46.411% / 97.854% 46.52%, curve to 99.998% 50.072% with 99.255% 47.349% / 100% 48.658%, curve to 98.029% 53.508% with 99.996% 51.485% / 99.247% 52.792%, curve to 97.474% 53.834% with 97.844% 53.617% / 97.659% 53.725%, curve to 92.29% 55.545% with 95.887% 54.767% / 94.12% 55.35%, curve to 88.771% 55.918% with 91.117% 55.669% / 89.944% 55.794%, curve to 79.302% 55.653% with 85.617% 56.253% / 82.432% 56.164%, curve to 73.381% 54.686% with 77.328% 55.33% / 75.355% 55.008%, curve to 79.217% 56.075% with 75.326% 55.149% / 77.272% 55.612%, curve to 88.058% 59.478% with 82.303% 56.809% / 85.276% 57.954%, curve to 91.161% 61.179% with 89.092% 60.045% / 90.126% 60.612%, curve to 95.285% 64.755% with 92.775% 62.064% / 94.181% 63.283%, curve to 95.672% 65.27% with 95.414% 64.926% / 95.543% 65.098%, curve to 96.165% 69.2% with 96.52% 66.4% / 96.707% 67.895%, curve to 93.031% 71.621% with 95.622% 70.504% / 94.43% 71.425%, curve to 92.393% 71.71% with 92.818% 71.65% / 92.605% 71.68%, curve to 86.949% 71.306% with 90.57% 71.965% / 88.714% 71.827%, curve to 83.555% 70.305% with 85.818% 70.972% / 84.686% 70.639%, curve to 74.908% 66.436% with 80.513% 69.407% / 77.605% 68.106%, curve to 69.808% 63.276% with 73.208% 65.383% / 71.508% 64.329%, curve to 74.669% 66.793% with 71.428% 64.449% / 73.048% 65.621%, curve to 81.534% 73.321% with 77.238% 68.653% / 79.547% 70.848%, curve to 83.749% 76.08% with 82.272% 74.241% / 83.011% 75.16%, curve to 86.192% 80.961% with 84.902% 77.514% / 85.735% 79.179%, curve to 86.352% 81.585% with 86.245% 81.169% / 86.298% 81.377%, curve to 85.303% 85.405% with 86.703% 82.954% / 86.304% 84.407%, curve to 81.481% 86.442% with 84.303% 86.402% / 82.849% 86.797%, curve to 80.858% 86.28% with 81.273% 86.388% / 81.066% 86.334%, curve to 75.983% 83.824% with 79.076% 85.818% / 77.414% 84.981%, curve to 73.231% 81.6% with 75.065% 83.083% / 74.148% 82.341%, curve to 66.723% 74.717% with 70.764% 79.607% / 68.575% 77.292%, curve to 63.22% 69.846% with 65.555% 73.093% / 64.387% 71.469%, curve to 66.364% 74.955% with 64.268% 71.549% / 65.316% 73.252%, curve to 70.209% 83.613% with 68.027% 77.657% / 69.32% 80.568%, curve to 71.2% 87.01% with 70.539% 84.745% / 70.87% 85.878%, curve to 71.588% 92.455% with 71.716% 88.776% / 71.848% 90.633%, curve to 71.497% 93.092% with 71.558% 92.667% / 71.528% 92.88%, curve to 69.067% 96.219% with 71.298% 94.491% / 70.374% 95.681%, curve to 65.139% 95.715% with 67.761% 96.758% / 66.267% 96.567%, curve to 64.625% 95.327% with 64.968% 95.586% / 64.796% 95.457%, curve to 61.061% 91.193% with 63.156% 94.219% / 61.941% 92.809%, curve to 59.369% 88.085% with 60.497% 90.157% / 59.933% 89.121%, curve to 55.991% 79.235% with 57.853% 85.299% / 56.717% 82.322%, curve to 54.619% 73.394% with 55.534% 77.288% / 55.076% 75.341%, curve to 55.569% 79.318% with 54.935% 75.369% / 55.252% 77.343%, curve to 55.807% 88.788% with 56.071% 82.45% / 56.151% 85.635%, curve to 55.423% 92.306% with 55.679% 89.961% / 55.551% 91.133%, curve to 53.698% 97.484% with 55.224% 94.135% / 54.636% 95.901%, curve to 53.37% 98.039% with 53.589% 97.669% / 53.48% 97.854%, curve to 49.928% 99.998% with 52.651% 99.255% / 51.342% 100%, curve to 46.492% 98.029% with 48.515% 99.996% / 47.208% 99.247%, curve to 46.166% 97.474% with 46.383% 97.844% / 46.275% 97.659%, curve to 44.455% 92.29% with 45.233% 95.887% / 44.65% 94.12%, curve to 44.082% 88.771% with 44.331% 91.117% / 44.206% 89.944%, curve to 44.347% 79.302% with 43.747% 85.617% / 43.836% 82.432%, curve to 45.314% 73.381% with 44.67% 77.328% / 44.992% 75.355%, curve to 43.925% 79.217% with 44.851% 75.326% / 44.388% 77.272%, curve to 40.522% 88.058% with 43.191% 82.303% / 42.046% 85.276%, curve to 38.821% 91.161% with 39.955% 89.092% / 39.388% 90.126%, curve to 35.245% 95.285% with 37.936% 92.775% / 36.717% 94.181%, curve to 34.73% 95.672% with 35.074% 95.414% / 34.902% 95.543%, curve to 30.8% 96.165% with 33.6% 96.52% / 32.105% 96.707%, curve to 28.379% 93.031% with 29.496% 95.622% / 28.575% 94.43%, curve to 28.29% 92.393% with 28.35% 92.818% / 28.32% 92.605%, curve to 28.694% 86.949% with 28.035% 90.57% / 28.173% 88.714%, curve to 29.695% 83.555% with 29.028% 85.818% / 29.361% 84.686%, curve to 33.564% 74.908% with 30.593% 80.513% / 31.894% 77.605%, curve to 36.724% 69.808% with 34.617% 73.208% / 35.671% 71.508%, curve to 33.207% 74.669% with 35.551% 71.428% / 34.379% 73.048%, curve to 26.679% 81.534% with 31.347% 77.238% / 29.152% 79.547%, curve to 23.92% 83.749% with 25.759% 82.272% / 24.84% 83.011%, curve to 19.039% 86.192% with 22.486% 84.902% / 20.821% 85.735%, curve to 18.415% 86.352% with 18.831% 86.245% / 18.623% 86.298%, curve to 14.595% 85.303% with 17.046% 86.703% / 15.593% 86.304%, curve to 13.558% 81.481% with 13.598% 84.303% / 13.203% 82.849%, curve to 13.72% 80.858% with 13.612% 81.273% / 13.666% 81.066%, curve to 16.176% 75.983% with 14.182% 79.076% / 15.019% 77.414%, curve to 18.4% 73.231% with 16.917% 75.065% / 17.659% 74.148%, curve to 25.283% 66.723% with 20.393% 70.764% / 22.708% 68.575%, curve to 30.154% 63.22% with 26.907% 65.555% / 28.531% 64.387%, curve to 25.045% 66.364% with 28.451% 64.268% / 26.748% 65.316%, curve to 16.387% 70.209% with 22.343% 68.027% / 19.432% 69.32%, curve to 12.99% 71.2% with 15.255% 70.539% / 14.122% 70.87%, curve to 7.545% 71.588% with 11.224% 71.716% / 9.367% 71.848%, curve to 6.908% 71.497% with 7.333% 71.558% / 7.12% 71.528%, curve to 3.781% 69.067% with 5.509% 71.298% / 4.319% 70.374%, curve to 4.285% 65.139% with 3.242% 67.761% / 3.433% 66.267%, curve to 4.673% 64.625% with 4.414% 64.968% / 4.543% 64.796%, curve to 8.807% 61.061% with 5.781% 63.156% / 7.191% 61.941%, curve to 11.915% 59.369% with 9.843% 60.497% / 10.879% 59.933%, curve to 20.765% 55.991% with 14.701% 57.853% / 17.678% 56.717%, curve to 26.606% 54.619% with 22.712% 55.534% / 24.659% 55.076%, curve to 20.682% 55.569% with 24.631% 54.935% / 22.657% 55.252%, curve to 11.212% 55.807% with 17.55% 56.071% / 14.365% 56.151%, curve to 7.694% 55.423% with 10.039% 55.679% / 8.867% 55.551%, curve to 2.516% 53.698% with 5.865% 55.224% / 4.099% 54.636%, curve to 1.961% 53.37% with 2.331% 53.589% / 2.146% 53.48%, curve to 0.002% 49.928% with 0.745% 52.651% / 0% 51.342%, curve to 1.971% 46.492% with 0.004% 48.515% / 0.753% 47.208%, curve to 2.526% 46.166% with 2.156% 46.383% / 2.341% 46.275%, curve to 7.71% 44.455% with 4.113% 45.233% / 5.88% 44.65%, curve to 11.229% 44.082% with 8.883% 44.331% / 10.056% 44.206%, curve to 20.698% 44.347% with 14.383% 43.747% / 17.568% 43.836%, curve to 26.619% 45.314% with 22.672% 44.67% / 24.645% 44.992%, curve to 20.783% 43.925% with 24.674% 44.851% / 22.728% 44.388%, curve to 11.942% 40.522% with 17.697% 43.191% / 14.724% 42.046%, curve to 8.839% 38.821% with 10.908% 39.955% / 9.874% 39.388%, curve to 4.715% 35.245% with 7.225% 37.936% / 5.819% 36.717%, curve to 4.328% 34.73% with 4.586% 35.074% / 4.457% 34.902%, curve to 3.835% 30.8% with 3.48% 33.6% / 3.293% 32.105%, curve to 6.969% 28.379% with 4.378% 29.496% / 5.57% 28.575%, curve to 7.607% 28.29% with 7.182% 28.35% / 7.395% 28.32%, curve to 13.051% 28.694% with 9.43% 28.035% / 11.286% 28.173%, curve to 16.445% 29.695% with 14.182% 29.028% / 15.314% 29.361%, curve to 25.092% 33.564% with 19.487% 30.593% / 22.395% 31.894%, curve to 30.192% 36.724% with 26.792% 34.617% / 28.492% 35.671%, curve to 25.331% 33.207% with 28.572% 35.551% / 26.952% 34.379%, curve to 18.466% 26.679% with 22.762% 31.347% / 20.453% 29.152%, curve to 16.251% 23.92% with 17.728% 25.759% / 16.989% 24.84%, curve to 13.808% 19.039% with 15.098% 22.486% / 14.265% 20.821%, curve to 13.648% 18.415% with 13.755% 18.831% / 13.702% 18.623%, curve to 14.697% 14.595% with 13.297% 17.046% / 13.696% 15.593%, curve to 18.519% 13.558% with 15.697% 13.598% / 17.151% 13.203%, curve to 19.142% 13.72% with 18.727% 13.612% / 18.934% 13.666%, curve to 24.017% 16.176% with 20.924% 14.182% / 22.586% 15.019%, curve to 26.769% 18.4% with 24.935% 16.917% / 25.852% 17.659%, curve to 33.277% 25.283% with 29.236% 20.393% / 31.425% 22.708%, curve to 36.78% 30.154% with 34.445% 26.907% / 35.613% 28.531%, curve to 33.636% 25.045% with 35.732% 28.451% / 34.684% 26.748%, curve to 29.791% 16.387% with 31.973% 22.343% / 30.68% 19.432%, curve to 28.8% 12.99% with 29.461% 15.255% / 29.13% 14.122%, curve to 28.412% 7.545% with 28.284% 11.224% / 28.152% 9.367%, curve to 28.503% 6.908% with 28.442% 7.333% / 28.472% 7.12%, curve to 30.933% 3.781% with 28.702% 5.509% / 29.626% 4.319%, curve to 34.861% 4.285% with 32.239% 3.242% / 33.733% 3.433%, curve to 35.375% 4.673% with 35.032% 4.414% / 35.204% 4.543%, curve to 38.939% 8.807% with 36.844% 5.781% / 38.059% 7.191%, curve to 40.631% 11.915% with 39.503% 9.843% / 40.067% 10.879%, curve to 44.009% 20.765% with 42.147% 14.701% / 43.283% 17.678%, curve to 45.381% 26.606% with 44.466% 22.712% / 44.924% 24.659%, curve to 44.431% 20.682% with 45.065% 24.631% / 44.748% 22.657%, curve to 44.193% 11.212% with 43.929% 17.55% / 43.849% 14.365%, curve to 44.577% 7.694% with 44.321% 10.039% / 44.449% 8.867%, curve to 46.302% 2.516% with 44.776% 5.865% / 45.364% 4.099%, curve to 46.63% 1.961% with 46.411% 2.331% / 46.52% 2.146%, curve to 50.072% 0.002% with 47.349% 0.745% / 48.658% 0%, curve to 53.508% 1.971% with 51.485% 0.004% / 52.792% 0.753%, curve to 53.834% 2.526% with 53.617% 2.156% / 53.725% 2.341%, curve to 55.545% 7.71% with 54.767% 4.113% / 55.35% 5.88%, curve to 55.918% 11.229% with 55.669% 8.883% / 55.794% 10.056%, curve to 55.653% 20.698% with 56.253% 14.383% / 56.164% 17.568%, curve to 54.686% 26.619% with 55.33% 22.672% / 55.008% 24.645%, curve to 56.075% 20.783% with 55.149% 24.674% / 55.612% 22.728%, curve to 59.478% 11.942% with 56.809% 17.697% / 57.954% 14.724%, curve to 61.179% 8.839% with 60.045% 10.908% / 60.612% 9.874%, curve to 64.755% 4.715% with 62.064% 7.225% / 63.283% 5.819%, curve to 65.27% 4.328% with 64.926% 4.586% / 65.098% 4.457%, curve to 69.2% 3.835% with 66.4% 3.48% / 67.895% 3.293%, curve to 71.621% 6.969% with 70.504% 4.378% / 71.425% 5.57%, curve to 71.71% 7.607% with 71.65% 7.182% / 71.68% 7.395%, curve to 71.306% 13.051% with 71.965% 9.43% / 71.827% 11.286%, curve to 70.305% 16.445% with 70.972% 14.182% / 70.639% 15.314%, curve to 66.436% 25.092% with 69.407% 19.487% / 68.106% 22.395%, curve to 63.276% 30.192% with 65.383% 26.792% / 64.329% 28.492%, curve to 66.793% 25.331% with 64.449% 28.572% / 65.621% 26.952%, curve to 73.321% 18.466% with 68.653% 22.762% / 70.848% 20.453%, curve to 76.08% 16.251% with 74.241% 17.728% / 75.16% 16.989%, curve to 80.961% 13.808% with 77.514% 15.098% / 79.179% 14.265%, curve to 81.585% 13.648% with 81.169% 13.755% / 81.377% 13.702%, curve to 85.405% 14.697% with 82.954% 13.297% / 84.407% 13.696%, curve to 86.442% 18.519% with 86.402% 15.697% / 86.797% 17.151%, curve to 86.28% 19.142% with 86.388% 18.727% / 86.334% 18.934%, curve to 83.824% 24.017% with 85.818% 20.924% / 84.981% 22.586%, curve to 81.6% 26.769% with 83.083% 24.935% / 82.341% 25.852%, curve to 74.717% 33.277% with 79.607% 29.236% / 77.292% 31.425%, curve to 69.846% 36.78% with 73.093% 34.445% / 71.469% 35.613%, curve to 74.955% 33.636% with 71.549% 35.732% / 73.252% 34.684%, curve to 83.613% 29.791% with 77.657% 31.973% / 80.568% 30.68%, curve to 87.01% 28.8% with 84.745% 29.461% / 85.878% 29.13%, curve to 92.455% 28.412% with 88.776% 28.284% / 90.633% 28.152%, curve to 93.092% 28.503% with 92.667% 28.442% / 92.88% 28.472%, curve to 96.219% 30.933% with 94.491% 28.702% / 95.681% 29.626%, curve to 95.715% 34.861% with 96.758% 32.239% / 96.567% 33.733%, curve to 95.327% 35.375% with 95.586% 35.032% / 95.457% 35.204%, curve to 91.193% 38.939% with 94.219% 36.844% / 92.809% 38.059%, curve to 88.085% 40.631% with 90.157% 39.503% / 89.121% 40.067%, curve to 79.235% 44.009% with 85.299% 42.147% / 82.322% 43.283%, curve to 73.394% 45.381% with 77.288% 44.466% / 75.341% 44.924%, close)",
	"4-leaf-clover": "shape(from 50% 9.813%, curve to 51.448% 8.7% with 50.483% 9.442% / 50.965% 9.071%, curve to 88.866% 11.134% with 62.763% 0% / 78.774% 1.042%, curve to 91.3% 48.552% with 98.958% 21.226% / 100% 37.237%, curve to 90.187% 50% with 90.929% 49.035% / 90.558% 49.517%, curve to 91.3% 51.448% with 90.558% 50.483% / 90.929% 50.965%, curve to 88.866% 88.866% with 100% 62.763% / 98.958% 78.774%, curve to 51.448% 91.3% with 78.774% 98.958% / 62.763% 100%, curve to 50% 90.187% with 50.965% 90.929% / 50.483% 90.558%, curve to 48.552% 91.3% with 49.517% 90.558% / 49.035% 90.929%, curve to 11.134% 88.866% with 37.237% 100% / 21.226% 98.958%, curve to 8.7% 51.448% with 1.042% 78.774% / 0% 62.763%, curve to 9.813% 50% with 9.071% 50.965% / 9.442% 50.483%, curve to 8.7% 48.552% with 9.442% 49.517% / 9.071% 49.035%, curve to 11.134% 11.134% with 0% 37.237% / 1.042% 21.226%, curve to 48.552% 8.7% with 21.226% 1.042% / 37.237% 0%, curve to 50% 9.813% with 49.035% 9.071% / 49.517% 9.442%, close)",
	"8-leaf-clover": "shape(from 50% 7.129%, curve to 52.179% 5.972% with 50.726% 6.743% / 51.453% 6.358%, curve to 79.939% 18.223% with 63.216% 0.111% / 76.83% 6.119%, curve to 80.314% 19.686% with 80.064% 18.711% / 80.189% 19.198%, curve to 82.673% 20.408% with 81.101% 19.927% / 81.887% 20.167%, curve to 93.64% 48.7% with 94.622% 24.069% / 100% 37.943%, curve to 92.871% 50% with 93.383% 49.133% / 93.127% 49.567%, curve to 94.028% 52.179% with 93.257% 50.726% / 93.642% 51.453%, curve to 81.777% 79.939% with 99.889% 63.216% / 93.881% 76.83%, curve to 80.314% 80.314% with 81.289% 80.064% / 80.802% 80.189%, curve to 79.592% 82.673% with 80.073% 81.101% / 79.833% 81.887%, curve to 51.3% 93.64% with 75.931% 94.622% / 62.057% 100%, curve to 50% 92.871% with 50.867% 93.383% / 50.433% 93.127%, curve to 47.821% 94.028% with 49.274% 93.257% / 48.547% 93.642%, curve to 20.061% 81.777% with 36.784% 99.889% / 23.17% 93.881%, curve to 19.686% 80.314% with 19.936% 81.289% / 19.811% 80.802%, curve to 17.327% 79.592% with 18.899% 80.073% / 18.113% 79.833%, curve to 6.36% 51.3% with 5.378% 75.931% / 0% 62.057%, curve to 7.129% 50% with 6.617% 50.867% / 6.873% 50.433%, curve to 5.972% 47.821% with 6.743% 49.274% / 6.358% 48.547%, curve to 18.223% 20.061% with 0.111% 36.784% / 6.119% 23.17%, curve to 19.686% 19.686% with 18.711% 19.936% / 19.198% 19.811%, curve to 20.408% 17.327% with 19.927% 18.899% / 20.167% 18.113%, curve to 48.7% 6.36% with 24.069% 5.378% / 37.943% 0%, curve to 50% 7.129% with 49.133% 6.617% / 49.567% 6.873%, close)",
	burst: "shape(from 50.001% 0.051%, curve to 50.524% 0.357% with 50.205% 0.051% / 50.41% 0.153%, curve to 58.885% 15.262% with 53.311% 5.326% / 56.098% 10.294%, curve to 59.715% 15.483% with 59.05% 15.556% / 59.426% 15.656%, curve to 74.343% 6.742% with 64.591% 12.569% / 69.467% 9.656%, curve to 75.25% 7.264% with 74.745% 6.501% / 75.255% 6.795%, curve to 75.038% 24.352% with 75.179% 12.96% / 75.109% 18.656%, curve to 75.646% 24.958% with 75.034% 24.689% / 75.309% 24.963%, curve to 92.685% 24.702% with 81.326% 24.873% / 87.006% 24.787%, curve to 93.209% 25.607% with 93.154% 24.695% / 93.449% 25.204%, curve to 84.482% 40.3% with 90.3% 30.505% / 87.391% 35.403%, curve to 84.706% 41.129% with 84.31% 40.59% / 84.411% 40.965%, curve to 99.59% 49.427% with 89.667% 43.895% / 94.629% 46.661%, curve to 99.591% 50.473% with 99.999% 49.655% / 100% 50.244%, curve to 84.687% 58.834% with 94.623% 53.26% / 89.655% 56.047%, curve to 84.466% 59.664% with 84.393% 58.999% / 84.293% 59.374%, curve to 93.207% 74.292% with 87.379% 64.54% / 90.293% 69.416%, curve to 92.685% 75.198% with 93.447% 74.694% / 93.154% 75.204%, curve to 75.597% 74.987% with 86.989% 75.128% / 81.293% 75.058%, curve to 74.991% 75.595% with 75.26% 74.983% / 74.986% 75.258%, curve to 75.247% 92.634% with 75.076% 81.275% / 75.161% 86.955%, curve to 74.342% 93.158% with 75.254% 93.103% / 74.745% 93.398%, curve to 59.649% 84.431% with 69.444% 90.249% / 64.546% 87.34%, curve to 58.819% 84.655% with 59.359% 84.259% / 58.984% 84.36%, curve to 50.522% 99.539% with 56.053% 89.616% / 53.288% 94.577%, curve to 49.476% 99.54% with 50.294% 99.948% / 49.705% 99.949%, curve to 41.115% 84.636% with 46.689% 94.572% / 43.902% 89.604%, curve to 40.285% 84.414% with 40.95% 84.341% / 40.574% 84.241%, curve to 25.657% 93.156% with 35.409% 87.328% / 30.533% 90.242%, curve to 24.75% 92.634% with 25.255% 93.396% / 24.745% 93.103%, curve to 24.962% 75.546% with 24.821% 86.938% / 24.891% 81.242%, curve to 24.354% 74.939% with 24.966% 75.209% / 24.691% 74.934%, curve to 7.315% 75.196% with 18.674% 75.025% / 12.994% 75.11%, curve to 6.791% 74.291% with 6.846% 75.203% / 6.551% 74.693%, curve to 15.518% 59.597% with 9.7% 69.393% / 12.609% 64.495%, curve to 15.294% 58.768% with 15.69% 59.307% / 15.589% 58.932%, curve to 0.41% 50.47% with 10.333% 56.002% / 5.371% 53.236%, curve to 0.409% 49.425% with 0.001% 50.242% / 0% 49.654%, curve to 15.313% 41.064% with 5.377% 46.638% / 10.345% 43.851%, curve to 15.534% 40.234% with 15.607% 40.899% / 15.707% 40.523%, curve to 6.793% 25.606% with 12.621% 35.358% / 9.707% 30.482%, curve to 7.315% 24.699% with 6.553% 25.203% / 6.846% 24.693%, curve to 24.403% 24.911% with 13.011% 24.77% / 18.707% 24.84%, curve to 25.009% 24.302% with 24.74% 24.915% / 25.014% 24.64%, curve to 24.753% 7.263% with 24.924% 18.623% / 24.839% 12.943%, curve to 25.658% 6.739% with 24.746% 6.795% / 25.255% 6.5%, curve to 40.351% 15.467% with 30.556% 9.648% / 35.454% 12.557%, curve to 41.181% 15.243% with 40.641% 15.639% / 41.016% 15.538%, curve to 49.478% 0.359% with 43.947% 10.282% / 46.712% 5.32%, curve to 50.001% 0.051% with 49.592% 0.154% / 49.797% 0.052%, close)",
	flower: "shape(from 36.975% 18.639%, curve to 39.612% 10.728% with 37.854% 16.002% / 38.733% 13.365%, curve to 46.544% 1.034% with 40.897% 6.874% / 43.312% 3.496%, curve to 49.596% 0.002% with 47.421% 0.365% / 48.493% 0.003%, curve to 50.308% 0.001% with 49.833% 0.002% / 50.071% 0.001%, curve to 53.363% 1.027% with 51.411% 0% / 52.484% 0.36%, curve to 60.313% 10.708% with 56.599% 3.483% / 59.021% 6.857%, curve to 62.965% 18.615% with 61.197% 13.344% / 62.081% 15.979%, curve to 70.424% 14.885% with 65.451% 17.371% / 67.938% 16.128%, curve to 82.18% 12.932% with 74.058% 13.068% / 78.154% 12.388%, curve to 85.068% 14.36% with 83.273% 13.079% / 84.288% 13.581%, curve to 85.573% 14.863% with 85.236% 14.528% / 85.405% 14.696%, curve to 87.007% 17.749% with 86.353% 15.643% / 86.857% 16.656%, curve to 85.076% 29.509% with 87.559% 21.774% / 86.886% 25.872%, curve to 81.361% 36.975% with 83.837% 31.998% / 82.599% 34.486%, curve to 89.272% 39.612% with 83.998% 37.854% / 86.635% 38.733%, curve to 98.966% 46.544% with 93.126% 40.897% / 96.504% 43.312%, curve to 99.998% 49.596% with 99.635% 47.421% / 99.997% 48.493%, curve to 99.999% 50.308% with 99.998% 49.833% / 99.999% 50.071%, curve to 98.973% 53.363% with 100% 51.411% / 99.64% 52.484%, curve to 89.292% 60.313% with 96.517% 56.599% / 93.143% 59.021%, curve to 81.385% 62.965% with 86.656% 61.197% / 84.021% 62.081%, curve to 85.115% 70.424% with 82.629% 65.451% / 83.872% 67.938%, curve to 87.068% 82.18% with 86.932% 74.058% / 87.612% 78.154%, curve to 85.64% 85.068% with 86.921% 83.273% / 86.419% 84.288%, curve to 85.137% 85.573% with 85.472% 85.236% / 85.304% 85.405%, curve to 82.251% 87.007% with 84.357% 86.353% / 83.344% 86.857%, curve to 70.491% 85.076% with 78.226% 87.559% / 74.128% 86.886%, curve to 63.025% 81.361% with 68.002% 83.837% / 65.514% 82.599%, curve to 60.388% 89.272% with 62.146% 83.998% / 61.267% 86.635%, curve to 53.456% 98.966% with 59.103% 93.126% / 56.688% 96.504%, curve to 50.404% 99.998% with 52.579% 99.635% / 51.507% 99.997%, curve to 49.692% 99.999% with 50.167% 99.998% / 49.929% 99.999%, curve to 46.637% 98.973% with 48.589% 100% / 47.516% 99.64%, curve to 39.687% 89.292% with 43.401% 96.517% / 40.979% 93.143%, curve to 37.035% 81.385% with 38.803% 86.656% / 37.919% 84.021%, curve to 29.576% 85.115% with 34.549% 82.629% / 32.062% 83.872%, curve to 17.82% 87.068% with 25.942% 86.932% / 21.846% 87.612%, curve to 14.932% 85.64% with 16.727% 86.921% / 15.712% 86.419%, curve to 14.427% 85.137% with 14.764% 85.472% / 14.595% 85.304%, curve to 12.993% 82.251% with 13.647% 84.357% / 13.143% 83.344%, curve to 14.924% 70.491% with 12.441% 78.226% / 13.114% 74.128%, curve to 18.639% 63.025% with 16.163% 68.002% / 17.401% 65.514%, curve to 10.728% 60.388% with 16.002% 62.146% / 13.365% 61.267%, curve to 1.034% 53.456% with 6.874% 59.103% / 3.496% 56.688%, curve to 0.002% 50.404% with 0.365% 52.579% / 0.003% 51.507%, curve to 0.001% 49.692% with 0.002% 50.167% / 0.001% 49.929%, curve to 1.027% 46.637% with 0% 48.589% / 0.36% 47.516%, curve to 10.708% 39.687% with 3.483% 43.401% / 6.857% 40.979%, curve to 18.615% 37.035% with 13.344% 38.803% / 15.979% 37.919%, curve to 14.885% 29.576% with 17.371% 34.549% / 16.128% 32.062%, curve to 12.932% 17.82% with 13.068% 25.942% / 12.388% 21.846%, curve to 14.36% 14.932% with 13.079% 16.727% / 13.581% 15.712%, curve to 14.863% 14.427% with 14.528% 14.764% / 14.696% 14.595%, curve to 17.749% 12.993% with 15.643% 13.647% / 16.656% 13.143%, curve to 29.509% 14.924% with 21.774% 12.441% / 25.872% 13.114%, curve to 36.975% 18.639% with 31.998% 16.163% / 34.486% 17.401%, close)",
	puffy: "shape(from 50% 17.03%, curve to 51.736% 14.368% with 50.579% 16.143% / 51.157% 15.255%, curve to 60.752% 10.357% with 53.398% 11.819% / 56.939% 10.244%, curve to 69.494% 14.678% with 64.526% 10.469% / 67.9% 12.137%, curve to 70.244% 15.874% with 69.744% 15.077% / 69.994% 15.476%, curve to 71.823% 20.314% with 71.121% 17.273% / 71.656% 18.777%, curve to 72.068% 22.562% with 71.905% 21.064% / 71.986% 21.813%, curve to 86.852% 20.687% with 74.65% 18.172% / 82.45% 17.182%, curve to 87.156% 20.929% with 86.954% 20.768% / 87.055% 20.848%, curve to 91.654% 28.445% with 89.746% 22.991% / 91.329% 25.637%, curve to 91.729% 29.1% with 91.679% 28.663% / 91.704% 28.882%, curve to 87.873% 38.641% with 92.125% 32.529% / 90.746% 35.941%, curve to 88.484% 38.626% with 88.077% 38.636% / 88.28% 38.631%, curve to 96.686% 41.723% with 91.754% 38.544% / 94.851% 39.713%, curve to 100% 49.738% with 98.846% 44.089% / 100% 46.881%, curve to 100% 50.262% with 100% 49.913% / 100% 50.087%, curve to 96.686% 58.277% with 100% 53.119% / 98.846% 55.911%, curve to 88.484% 61.374% with 94.851% 60.287% / 91.754% 61.456%, curve to 87.873% 61.359% with 88.28% 61.369% / 88.077% 61.364%, curve to 91.729% 70.9% with 90.746% 64.059% / 92.125% 67.471%, curve to 91.654% 71.555% with 91.704% 71.118% / 91.679% 71.337%, curve to 87.156% 79.071% with 91.329% 74.363% / 89.746% 77.009%, curve to 86.852% 79.313% with 87.055% 79.152% / 86.954% 79.232%, curve to 72.068% 77.438% with 82.45% 82.818% / 74.65% 81.828%, curve to 71.823% 79.686% with 71.986% 78.187% / 71.905% 78.936%, curve to 70.244% 84.126% with 71.656% 81.223% / 71.121% 82.727%, curve to 69.494% 85.322% with 69.994% 84.524% / 69.744% 84.923%, curve to 60.752% 89.643% with 67.9% 87.863% / 64.526% 89.531%, curve to 51.736% 85.632% with 56.939% 89.756% / 53.398% 88.181%, curve to 50% 82.97% with 51.157% 84.745% / 50.579% 83.857%, curve to 48.264% 85.632% with 49.421% 83.857% / 48.843% 84.745%, curve to 39.248% 89.643% with 46.602% 88.181% / 43.061% 89.756%, curve to 30.506% 85.322% with 35.474% 89.531% / 32.1% 87.863%, curve to 29.756% 84.126% with 30.256% 84.923% / 30.006% 84.524%, curve to 28.177% 79.686% with 28.879% 82.727% / 28.344% 81.223%, curve to 27.932% 77.438% with 28.095% 78.936% / 28.014% 78.187%, curve to 13.148% 79.313% with 25.35% 81.828% / 17.55% 82.818%, curve to 12.844% 79.071% with 13.046% 79.232% / 12.945% 79.152%, curve to 8.346% 71.555% with 10.254% 77.009% / 8.671% 74.363%, curve to 8.271% 70.9% with 8.321% 71.337% / 8.296% 71.118%, curve to 12.127% 61.359% with 7.875% 67.471% / 9.254% 64.059%, curve to 11.516% 61.374% with 11.923% 61.364% / 11.72% 61.369%, curve to 3.314% 58.277% with 8.246% 61.456% / 5.149% 60.287%, curve to 0% 50.262% with 1.154% 55.911% / 0% 53.119%, curve to 0% 49.738% with 0% 50.087% / 0% 49.913%, curve to 3.314% 41.723% with 0% 46.881% / 1.154% 44.089%, curve to 11.516% 38.626% with 5.149% 39.713% / 8.246% 38.544%, curve to 12.127% 38.641% with 11.72% 38.631% / 11.923% 38.636%, curve to 8.271% 29.1% with 9.254% 35.941% / 7.875% 32.529%, curve to 8.346% 28.445% with 8.296% 28.882% / 8.321% 28.663%, curve to 12.844% 20.929% with 8.671% 25.637% / 10.254% 22.991%, curve to 13.148% 20.687% with 12.945% 20.848% / 13.046% 20.768%, curve to 27.932% 22.562% with 17.55% 17.182% / 25.35% 18.172%, curve to 28.177% 20.314% with 28.014% 21.813% / 28.095% 21.064%, curve to 29.756% 15.874% with 28.344% 18.777% / 28.879% 17.273%, curve to 30.506% 14.678% with 30.006% 15.476% / 30.256% 15.077%, curve to 39.248% 10.357% with 32.1% 12.137% / 35.474% 10.469%, curve to 48.264% 14.368% with 43.061% 10.244% / 46.602% 11.819%, curve to 50% 17.03% with 48.843% 15.255% / 49.421% 16.143%, close)",
	"puffy-diamond": "shape(from 77.895% 22.105%, curve to 81.803% 35.689% with 81.256% 25.466% / 83.005% 30.44%, curve to 81.8% 35.7% with 81.802% 35.693% / 81.801% 35.696%, curve to 83.356% 35.486% with 82.319% 35.629% / 82.838% 35.557%, curve to 100% 50% with 92.157% 34.277% / 100% 41.116%, curve to 83.356% 64.514% with 100% 58.884% / 92.157% 65.723%, curve to 81.8% 64.3% with 82.838% 64.443% / 82.319% 64.371%, curve to 81.803% 64.311% with 81.801% 64.304% / 81.802% 64.307%, curve to 64.311% 81.803% with 84.207% 74.808% / 74.808% 84.207%, curve to 64.3% 81.8% with 64.307% 81.802% / 64.304% 81.801%, curve to 64.514% 83.356% with 64.371% 82.319% / 64.443% 82.838%, curve to 50% 100% with 65.723% 92.157% / 58.884% 100%, curve to 35.486% 83.356% with 41.116% 100% / 34.277% 92.157%, curve to 35.7% 81.8% with 35.557% 82.838% / 35.629% 82.319%, curve to 35.689% 81.803% with 35.696% 81.801% / 35.693% 81.802%, curve to 18.197% 64.311% with 25.192% 84.207% / 15.793% 74.808%, curve to 18.2% 64.3% with 18.198% 64.307% / 18.199% 64.304%, curve to 16.644% 64.514% with 17.681% 64.371% / 17.162% 64.443%, curve to 0% 50% with 7.843% 65.723% / 0% 58.884%, curve to 16.644% 35.486% with 0% 41.116% / 7.843% 34.277%, curve to 18.2% 35.7% with 17.162% 35.557% / 17.681% 35.629%, curve to 18.197% 35.689% with 18.199% 35.696% / 18.198% 35.693%, curve to 35.689% 18.197% with 15.793% 25.192% / 25.192% 15.793%, curve to 35.7% 18.2% with 35.693% 18.198% / 35.696% 18.199%, curve to 35.486% 16.644% with 35.629% 17.681% / 35.557% 17.162%, curve to 50% 0% with 34.277% 7.843% / 41.116% 0%, curve to 64.514% 16.644% with 58.884% 0% / 65.723% 7.843%, curve to 64.3% 18.2% with 64.443% 17.162% / 64.371% 17.681%, curve to 64.311% 18.197% with 64.304% 18.199% / 64.307% 18.198%, curve to 77.895% 22.105% with 69.56% 16.995% / 74.534% 18.744%, close)",
	"ghost-ish": "shape(from 50% 0%, curve to 97.663% 47.663% with 76.324% 0% / 97.663% 21.339%, curve to 97.663% 76.005% with 97.663% 57.11% / 97.663% 66.558%, curve to 69.047% 92.916% with 97.663% 90.692% / 81.913% 100%, curve to 62.475% 89.298% with 66.856% 91.71% / 64.665% 90.504%, curve to 51.07% 86.366% with 58.981% 87.374% / 55.058% 86.366%, curve to 48.93% 86.366% with 50.357% 86.366% / 49.643% 86.366%, curve to 37.525% 89.298% with 44.942% 86.366% / 41.019% 87.374%, curve to 30.953% 92.916% with 35.335% 90.504% / 33.144% 91.71%, curve to 2.337% 76.005% with 18.087% 100% / 2.337% 90.692%, curve to 2.337% 47.663% with 2.337% 66.558% / 2.337% 57.11%, curve to 50% 0% with 2.337% 21.339% / 23.676% 0%, close)",
	"pixel-circle": "shape(from 50% 0%, curve to 70.4% 0% with 56.8% 0% / 63.6% 0%, curve to 70.4% 6.5% with 70.4% 2.167% / 70.4% 4.333%, curve to 84.3% 6.5% with 75.033% 6.5% / 79.667% 6.5%, curve to 84.3% 14.8% with 84.3% 9.267% / 84.3% 12.033%, curve to 92.6% 14.8% with 87.067% 14.8% / 89.833% 14.8%, curve to 92.6% 29.6% with 92.6% 19.733% / 92.6% 24.667%, curve to 100% 29.6% with 95.067% 29.6% / 97.533% 29.6%, curve to 100% 70.4% with 100% 43.2% / 100% 56.8%, curve to 92.6% 70.4% with 97.533% 70.4% / 95.067% 70.4%, curve to 92.6% 85.2% with 92.6% 75.333% / 92.6% 80.267%, curve to 84.3% 85.2% with 89.833% 85.2% / 87.067% 85.2%, curve to 84.3% 93.5% with 84.3% 87.967% / 84.3% 90.733%, curve to 70.4% 93.5% with 79.667% 93.5% / 75.033% 93.5%, curve to 70.4% 100% with 70.4% 95.667% / 70.4% 97.833%, curve to 50% 100% with 63.6% 100% / 56.8% 100%, curve to 29.6% 100% with 43.2% 100% / 36.4% 100%, curve to 29.6% 93.5% with 29.6% 97.833% / 29.6% 95.667%, curve to 15.7% 93.5% with 24.967% 93.5% / 20.333% 93.5%, curve to 15.7% 85.2% with 15.7% 90.733% / 15.7% 87.967%, curve to 7.4% 85.2% with 12.933% 85.2% / 10.167% 85.2%, curve to 7.4% 70.4% with 7.4% 80.267% / 7.4% 75.333%, curve to 0% 70.4% with 4.933% 70.4% / 2.467% 70.4%, curve to 0% 29.6% with 0% 56.8% / 0% 43.2%, curve to 7.4% 29.6% with 2.467% 29.6% / 4.933% 29.6%, curve to 7.4% 14.8% with 7.4% 24.667% / 7.4% 19.733%, curve to 15.7% 14.8% with 10.167% 14.8% / 12.933% 14.8%, curve to 15.7% 6.5% with 15.7% 12.033% / 15.7% 9.267%, curve to 29.6% 6.5% with 20.333% 6.5% / 24.967% 6.5%, curve to 29.6% 0% with 29.6% 4.333% / 29.6% 2.167%, curve to 50% 0% with 36.4% 0% / 43.2% 0%, close)",
	"pixel-triangle": "shape(from 11.1% 50%, curve to 11.4% 0% with 11.2% 33.333% / 11.3% 16.667%, curve to 28.8% 0% with 17.2% 0% / 23% 0%, curve to 28.8% 8.7% with 28.8% 2.9% / 28.8% 5.8%, curve to 42.2% 8.7% with 33.267% 8.7% / 37.733% 8.7%, curve to 42.2% 17% with 42.2% 11.467% / 42.2% 14.233%, curve to 56.1% 17% with 46.833% 17% / 51.467% 17%, curve to 56.1% 26.5% with 56.1% 20.167% / 56.1% 23.333%, curve to 67.5% 26.5% with 59.9% 26.5% / 63.7% 26.5%, curve to 67.6% 34.4% with 67.533% 29.133% / 67.567% 31.767%, curve to 79% 34.4% with 71.4% 34.4% / 75.2% 34.4%, curve to 79% 43.9% with 79% 37.567% / 79% 40.733%, curve to 88.9% 43.9% with 82.3% 43.9% / 85.6% 43.9%, curve to 88.9% 56.1% with 88.9% 47.967% / 88.9% 52.033%, curve to 79% 56.1% with 85.6% 56.1% / 82.3% 56.1%, curve to 79% 65.6% with 79% 59.267% / 79% 62.433%, curve to 67.6% 65.6% with 75.2% 65.6% / 71.4% 65.6%, curve to 67.5% 73.5% with 67.567% 68.233% / 67.533% 70.867%, curve to 56.1% 73.5% with 63.7% 73.5% / 59.9% 73.5%, curve to 56.1% 83% with 56.1% 76.667% / 56.1% 79.833%, curve to 42.2% 83% with 51.467% 83% / 46.833% 83%, curve to 42.2% 91.3% with 42.2% 85.767% / 42.2% 88.533%, curve to 28.8% 91.3% with 37.733% 91.3% / 33.267% 91.3%, curve to 28.8% 100% with 28.8% 94.2% / 28.8% 97.1%, curve to 11.4% 100% with 23% 100% / 17.2% 100%, curve to 11.1% 50% with 11.3% 83.333% / 11.2% 66.667%, close)",
	bun: "shape(from 79.6% 50%, curve to 80.694% 50.345% with 79.965% 50.115% / 80.329% 50.23%, curve to 89.048% 54.847% with 83.737% 51.306% / 86.572% 52.834%, curve to 98.351% 76.156% with 95.417% 60.024% / 98.884% 67.965%, curve to 98.347% 76.208% with 98.35% 76.173% / 98.349% 76.191%, curve to 72.958% 100% with 97.477% 89.591% / 86.369% 100%, curve to 27.042% 100% with 57.653% 100% / 42.347% 100%, curve to 1.653% 76.208% with 13.631% 100% / 2.523% 89.591%, curve to 1.649% 76.156% with 1.651% 76.191% / 1.65% 76.173%, curve to 10.952% 54.847% with 1.116% 67.965% / 4.583% 60.024%, curve to 19.306% 50.345% with 13.428% 52.834% / 16.263% 51.306%, curve to 20.4% 50% with 19.671% 50.23% / 20.035% 50.115%, curve to 19.306% 49.655% with 20.035% 49.885% / 19.671% 49.77%, curve to 10.952% 45.153% with 16.263% 48.694% / 13.428% 47.166%, curve to 1.649% 23.844% with 4.583% 39.976% / 1.116% 32.035%, curve to 1.653% 23.792% with 1.65% 23.827% / 1.651% 23.809%, curve to 27.042% 0% with 2.523% 10.409% / 13.631% 0%, curve to 72.958% 0% with 42.347% 0% / 57.653% 0%, curve to 98.347% 23.792% with 86.369% 0% / 97.477% 10.409%, curve to 98.351% 23.844% with 98.349% 23.809% / 98.35% 23.827%, curve to 89.048% 45.153% with 98.884% 32.035% / 95.417% 39.976%, curve to 80.694% 49.655% with 86.572% 47.166% / 83.737% 48.694%, curve to 79.6% 50% with 80.329% 49.77% / 79.965% 49.885%, close)",
	heart: "shape(from 50% 28.592%, curve to 50.443% 28.391% with 50.163% 28.592% / 50.326% 28.525%, curve to 61.997% 15.175% with 54.294% 23.986% / 58.146% 19.581%, curve to 93.632% 15.911% with 70.461% 5.494% / 85.628% 5.847%, curve to 93.266% 43.133% with 100% 23.918% / 99.847% 35.301%, curve to 50.159% 94.432% with 78.897% 60.233% / 64.528% 77.332%, curve to 50% 94.506% with 50.12% 94.479% / 50.061% 94.506%, curve to 49.841% 94.432% with 49.939% 94.506% / 49.88% 94.479%, curve to 6.734% 43.133% with 35.472% 77.332% / 21.103% 60.233%, curve to 6.368% 15.911% with 0.153% 35.301% / 0% 23.918%, curve to 38.003% 15.175% with 14.372% 5.847% / 29.539% 5.494%, curve to 49.557% 28.391% with 41.854% 19.581% / 45.706% 23.986%, curve to 50% 28.592% with 49.674% 28.525% / 49.837% 28.592%, close)"
});
Object.freeze(Object.keys(lr));
function ur(e) {
	return typeof e == "string" && Object.hasOwn(lr, e);
}
var dr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatShape",
	inheritAttrs: !1
}, {
	__name: "MatShape",
	props: {
		name: {
			type: String,
			default: "circle",
			validator: ur
		},
		size: {
			type: [Number, String],
			default: 48,
			validator: (e) => gt(e, {
				property: "width",
				positive: !0
			})
		},
		color: {
			type: String,
			default: "primary",
			validator: Be
		},
		as: {
			type: String,
			default: "div",
			validator: We
		}
	},
	setup(e) {
		let t = $("shape", e), { colorStyle: n } = ct(r(() => t.color)), a = r(() => _t(t.size, {
			property: "width",
			positive: !0,
			fallback: "48px"
		})), o = r(() => ur(t.name) ? t.name : "circle"), s = r(() => ({
			...n.value,
			inlineSize: a.value,
			blockSize: a.value,
			clipPath: lr[o.value]
		}));
		return (e, n) => (w(), i(M(I(t).as), h(e.$attrs, {
			class: "mat-shape",
			style: s.value
		}), {
			default: V(() => [j(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["style"]));
	}
}), [["__scopeId", "data-v-3972d8b0"]]), fr = /*@__PURE__*/ Object.assign({ name: "MatText" }, {
	__name: "MatText",
	props: {
		type: {
			type: String,
			default: "body",
			validator: Cn
		},
		size: {
			type: String,
			default: "medium",
			validator: wn
		},
		emphasized: {
			type: Boolean,
			default: !1
		},
		as: {
			type: String,
			default: "span",
			validator: We
		}
	},
	setup(e) {
		let t = $("text", e), n = r(() => En(t.type, t.size, t.emphasized));
		return (e, r) => (w(), i(M(I(t).as), { class: _(n.value) }, {
			default: V(() => [j(e.$slots, "default")]),
			_: 3
		}, 8, ["class"]));
	}
}), pr = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = p(vn), a = R();
		T(vn, {
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
}), mr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Me.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
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
		let n = $("splitBtn", e), i = t, a = O(null), c = R(), { colorStyle: l, hasExplicitColor: d } = ct(r(() => n.color));
		T(vn, {
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
		}, [u(pr, { role: "leading" }, {
			default: V(() => [j(e.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), s("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [u(pr, { role: "trailing" }, {
			default: V(() => [j(e.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-a7f0a44b"]]), hr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-76b082b5"]]), gr = { class: "mat-card-headline mat-sys-typescale-title-large" }, _r = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (w(), o("div", gr, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-5a13e3d0"]]), vr = { class: "mat-card-media" }, yr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (w(), o("div", vr, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-7208424e"]]), br = { class: "mat-card-subhead mat-sys-typescale-body-medium" }, xr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (w(), o("div", br, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-13f41dc3"]]), Sr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Be
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
		let t = $("card", e), { colorStyle: n, hasExplicitColor: o } = ct(r(() => t.color));
		return (e, r) => (w(), i(hr, h(e.$attrs, {
			class: ["mat-card", [`mat-card--${I(t).variant}`, { "mat-card--explicit-color": I(o) }]],
			style: I(n),
			as: I(t).as
		}), {
			default: V(() => [
				e.$slots.media ? (w(), i(yr, { key: 0 }, {
					default: V(() => [j(e.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				e.$slots.headline ? (w(), i(_r, { key: 1 }, {
					default: V(() => [j(e.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : a("", !0),
				e.$slots.subhead ? (w(), i(xr, { key: 2 }, {
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
}), [["__scopeId", "data-v-744546f7"]]), Cr = { class: "mat-card-action-area__content" }, wr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Pe.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = e, r = t, a = $("cardActionArea", n), o = p(Ae, ke);
		return (e, t) => (w(), i(Ee, h(e.$attrs, {
			class: "mat-card-action-area",
			disabled: I(a).disabled,
			"focus-ring": !1,
			href: I(a).href,
			type: I(a).type,
			"use-cursor": I(o).useCursor,
			onClick: t[0] ||= (e) => r("click", e)
		}), {
			default: V(() => [s("span", Cr, [j(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-bc57888e"]]), Tr = { class: "mat-card-content" }, Er = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (w(), o("div", Tr, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-8a32cf5d"]]), Dr = { class: "mat-card-actions" }, Or = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (w(), o("div", Dr, [j(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-f3e5f8e6"]]), kr = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], Ar = Symbol("mat-list"), jr = Symbol("mat-list-group-activator");
function Mr(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function Nr(e) {
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
function Pr(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function Fr(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(Pr);
}
var Ir = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return kr.includes(e);
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
				return e.every(Pr);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
		}
	},
	emits: {
		select(e) {
			return e && Object.hasOwn(e, "value") && Object.hasOwn(e, "nextSelected") && e.originalEvent instanceof Event;
		},
		"update:expanded"(e) {
			return Array.isArray(e) && e.every(Pr);
		}
	},
	setup(e, { emit: t }) {
		let n = $("list", e), a = t, o = O(null), s = r(() => Mr(n.interaction)), c = r(() => s.value ? "div" : "ul"), { colorStyle: l } = ct(r(() => n.color)), u = [], d = [
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
		let C = Nr({
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
		return T(Ar, {
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
}), [["__scopeId", "data-v-652dfedc"]]), Lr = ["data-line-count"], Rr = ["inert"], zr = ["inert"], Br = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
			}, [e.leadingIcon ? (w(), i(dt, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: V(() => [j(t.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : j(t.$slots, "leading", { key: 1 }, void 0, !0)], 10, Rr)) : a("", !0),
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
			}, [j(t.$slots, "trailing", {}, void 0, !0)], 10, zr)) : a("", !0)
		], 10, Lr));
	}
}), [["__scopeId", "data-v-e06fa12c"]]), Vr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		return (t, n) => (w(), i(Br, {
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
}), [["__scopeId", "data-v-f09dfa3d"]]), Hr = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], Ur = ["aria-disabled", "data-mat-list-disabled"], Wr = ["aria-disabled", "data-mat-list-disabled"], Gr = ["inert"], Kr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Pe.includes(e);
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
		let n = $("listItem", e), s = t, l = R(), d = p(Ar, null), f = p(jr, null), m = p(Ae, ke), v = r(() => d?.interaction.value ?? "none"), y = r(() => v.value === "single-action" || v.value === "multi-action"), b = r(() => v.value === "multi-action"), x = r(() => d?.isSelectable.value ?? !1), C = r(() => d?.isSelected(n.value) ?? !1), T = r(() => !!l.trailing), E = r(() => {
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
		}), [u(Vr, {
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
		]), 1032, ["line-count"])], 16, Hr)) : I(f) ? (w(), i(Ee, h({ key: 1 }, e.$attrs, {
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
			default: V(() => [u(Vr, {
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
		}), [u(Vr, {
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
		]), 1032, ["line-count"])], 16, Ur)) : y.value ? (w(), o("li", {
			key: 3,
			class: _(["mat-list-item", [D.value, {
				"mat-list-item__surface": b.value,
				"mat-list-item--multi-action": b.value
			}]]),
			"aria-disabled": I(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": I(n).disabled ? "true" : void 0
		}, [u(Ee, h(e.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !b.value }],
			"data-mat-list-primary": "",
			disabled: I(n).disabled,
			"focus-ring": !0,
			href: I(n).href,
			type: I(n).type,
			"use-cursor": I(m).useCursor,
			onClick: O
		}), {
			default: V(() => [u(Vr, {
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
		}, [j(e.$slots, "trailing", {}, void 0, !0)], 8, Gr)) : a("", !0)], 10, Wr)) : (w(), i(Ee, h({ key: 4 }, e.$attrs, {
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
			default: V(() => [u(Vr, {
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
}), [["__scopeId", "data-v-9fdd8fd5"]]), qr = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return T(jr, e.context), (e, t) => j(e.$slots, "default");
	}
}), Jr = [
	"role",
	"aria-hidden",
	"inert"
], Yr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let a = $("listGroup", n), o = p(Ar, null), c = R(), l = O(null), d = O(!1), f = O(null), _ = Symbol("mat-list-group"), v = ee().replace(/[^\w-]/g, "-"), y = `mat-list-group-${v}-content`, x = `mat-list-group-${v}-label`, T = !1, E, D = r(() => a.value !== void 0), k = r(() => o?.isSelectable.value ?? !1), A = r(() => D.value ? o?.isGroupExpanded(a.value) ?? !1 : d.value);
		function N(n) {
			return n.flatMap((n) => m(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? N(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = r(() => {
			let e = N(c.activator?.({ expanded: A.value }) ?? []);
			if (e.length !== 1 || !m(e[0])) return !1;
			let t = e[0].type;
			return t === Kr || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), F = r(() => f.value ?? P.value), I = r(() => k.value || !F.value || A.value), L = r(() => o?.variant.value ?? "segmented");
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
		function te() {
			G(), W();
		}
		function K(e) {
			e !== void 0 && (o?.registerGroupValue(_, e), E = e);
		}
		function q() {
			E !== void 0 && (o?.unregisterGroupValue(_), E = void 0);
		}
		return S(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), k.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), K(a.value), te(), o?.requestFocusRefresh();
		}), C(te), b(() => {
			q(), o?.requestFocusRefresh();
		}), z(() => a.value, (e, t) => {
			Object.is(e, t) || (q(), K(e));
		}), z(A, async (e, t) => {
			t && !e && B(), await g(), o?.requestFocusRefresh();
		}), z(k, async (e, t) => {
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
			default: V(() => [u(qr, { context: U }, {
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
			}, 8, ["role"]))], 8, Jr)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-6177ebb7"]]), Xr = Symbol("mat-menu"), Zr = Symbol("mat-menu-item"), Qr = Symbol("mat-menu-group");
function $r(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function ei(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = $r(t, a, o), c = $r(e, a, o), l = $r(t, e, o), u = $r(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function ti(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var ni = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let t = $("divider", e), n = p(Ar, null), a = p(Xr, null), o = r(() => !!n), s = r(() => !!a), c = r(() => n?.isSelectable.value ?? !1), l = r(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = r(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
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
}), [["__scopeId", "data-v-1fa4b6f3"]]), ri = { class: "mat-selection-control__target" }, ii = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], ai = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, oi = {
	key: 0,
	class: "mat-selection-control__label"
}, si = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Be
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
		let i = e, c = n, l = L(), u = R(), d = O(null), f = p(Ae, ke), { colorStyle: m } = ct(r(() => i.color)), g = r(() => {
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
		}), [s("span", ri, [
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
			}), null, 16, ii),
			n[2] ||= s("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			s("span", ai, [j(t.$slots, "indicator", {}, void 0, !0)])
		]), I(u).default ? (w(), o("span", oi, [j(t.$slots, "default", {}, void 0, !0)])) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-e1bf8dba"]]), ci = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: Fr
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: Pr
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
			validator: Be
		}
	},
	emits: {
		"update:modelValue": Fr,
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
		return (e, t) => (w(), i(si, h(e.$attrs, {
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
}), [["__scopeId", "data-v-e123f087"]]), li = [
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
function ui(e) {
	return !e || typeof e != "object" || Array.isArray(e) || Object.keys(e).some((e) => !["inline", "block"].includes(e)) ? !1 : ["inline", "block"].every((t) => gt(e[t], {
		property: "margin",
		allowNegative: !0
	}));
}
//#endregion
//#region src/components/mat-badge/MatBadge.vue
var di = ["data-dot"], fi = ["data-dot"], pi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => li.includes(e)
		},
		offset: {
			type: Object,
			default: () => ({
				inline: 0,
				block: 0
			}),
			validator: ui
		},
		color: {
			type: String,
			default: "error",
			validator: Be
		}
	},
	setup(e) {
		let t = $("badge", e), n = L(), { colorStyle: i } = ct(r(() => t.color)), s = r(() => t.location === "inline"), c = r(() => t.content !== void 0 && String(t.content).length > 0), l = r(() => t.dot || c.value), u = r(() => t.dot ? void 0 : t.content);
		function d(e) {
			let t = _t(e ?? 0, {
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
		}), F(u.value), 17, di)) : s.value ? a("", !0) : (w(), o("span", h({ key: 1 }, I(n), { class: "mat-badge" }), [j(e.$slots, "default", {}, void 0, !0), l.value ? (w(), o("span", {
			key: 0,
			class: _(["mat-badge__indicator", [`mat-badge__indicator--${I(t).location}`, { "mat-badge__indicator--dot": I(t).dot }]]),
			style: v(f.value),
			"aria-hidden": "true",
			"data-dot": I(t).dot ? "" : void 0
		}, F(u.value), 15, fi)) : a("", !0)], 16));
	}
}), [["__scopeId", "data-v-8f699504"]]), mi = Symbol("mat-chip-set"), hi = {
	key: 0,
	class: "mat-chip__avatar",
	"aria-hidden": "true",
	inert: ""
}, gi = {
	key: 1,
	class: "mat-chip__icon mat-chip__icon--leading",
	"aria-hidden": "true",
	inert: ""
}, _i = { class: "mat-chip__label" }, vi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === void 0 || Pr(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return Pe.includes(e);
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
		let n = $("chip", e), c = t, l = R(), u = p(Ae, ke), d = p(mi, null), f = r(() => ["filter", "input"].includes(n.variant)), m = r(() => !!d && f.value && n.value !== void 0 && d.selection.value !== "none"), g = r(() => m.value ? d.isSelected(n.value) : f.value && n.selected), _ = r(() => !!l.avatar), v = r(() => !_.value && !!l.leading), y = r(() => n.variant === "filter" && g.value && !_.value && !v.value), b = r(() => _.value || v.value || y.value), x = r(() => n.variant === "input"), { colorStyle: S, hasExplicitColor: C } = ct(r(() => n.color));
		function T(e) {
			c("click", e), m.value && d.requestSelection(n.value, e);
		}
		function E(e) {
			n.variant === "input" && (e.stopPropagation(), n.disabled || c("remove", e));
		}
		return (e, t) => (w(), i(Ee, h(e.$attrs, {
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
				_.value ? (w(), o("span", hi, [j(e.$slots, "avatar", {}, void 0, !0)])) : v.value || y.value ? (w(), o("span", gi, [v.value ? j(e.$slots, "leading", { key: 0 }, void 0, !0) : (w(), i(dt, {
					key: 1,
					as: "span",
					icon: "check",
					"optical-size": 20,
					size: "18px"
				}))])) : a("", !0),
				s("span", _i, [j(e.$slots, "default", {}, void 0, !0)]),
				x.value ? (w(), o("span", {
					key: 2,
					class: "mat-chip__icon mat-chip__remove-icon",
					"aria-hidden": "true",
					onPointerdown: t[0] ||= W(() => {}, ["stop"]),
					onClick: E
				}, [e.$slots["remove-icon"] ? j(e.$slots, "remove-icon", { key: 0 }, void 0, !0) : (w(), i(dt, {
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
}), [["__scopeId", "data-v-8272cbde"]]), yi = {
	key: 0,
	class: "mat-scroll-area__fixed"
}, bi = {
	key: 1,
	class: "mat-scroll-area__fixed"
}, xi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => gt(e, { allowUndefined: !1 })
		},
		shadowLength: {
			type: [Number, Object],
			default: void 0,
			validator: (e) => yt(e)
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
			validator: (e) => yt(e, { allowUndefined: !1 })
		},
		shadowOffset: {
			type: [Number, Object],
			default: 0,
			validator: (e) => yt(e, { allowUndefined: !1 })
		}
	},
	emits: {
		"reach-start": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement,
		"reach-end": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement
	},
	setup(e, { expose: t, emit: n }) {
		let i = $("scrollArea", e), c = n, l = L(), u = O(null), d = O(!1), f = O(!1), p = O(!1), m = O(!1), y = O(!1), x, T, E, D = 0, k = 0, A = !1, M, N = r(() => [
			"horizontal",
			"x",
			"h"
		].includes(i.orientation) ? "horizontal" : "vertical"), P = r(() => i.dragScroll && N.value === "horizontal"), F = r(() => bt(i.reachThreshold, 0)), ee = r(() => bt(i.shadowOffset, 0)), R = r(() => bt(i.shadowLength, 16)), B = r(() => i.barWidth === "hidden" ? 0 : i.barWidth === "thin" ? 10 : 16), V = r(() => ({
			"--mat-scroll-area-shadow-length-start": `${R.value.start}px`,
			"--mat-scroll-area-shadow-length-end": `${R.value.end}px`,
			"--mat-scroll-area-shadow-offset-start": `${ee.value.start}px`,
			"--mat-scroll-area-shadow-offset-end": `${ee.value.end}px`,
			"--mat-scroll-area-scrollbar-space": `${B.value}px`
		})), H = r(() => ({
			class: l.class,
			style: l.style
		})), U = r(() => {
			let e = N.value === "horizontal", t = _t(i.snapPadding, { fallback: "0" });
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
		function te(e) {
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
		function K(e) {
			x !== void 0 && cancelAnimationFrame(x), x = requestAnimationFrame(() => {
				x = void 0, te(e);
			});
		}
		function q() {
			K(!0);
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
		function ne(e) {
			!P.value || E !== void 0 || e.button !== 0 || !["mouse", "pen"].includes(e.pointerType) || (E = e.pointerId, D = e.clientX, k = u.value?.scrollLeft ?? 0);
		}
		function re(e) {
			if (e.pointerId !== E || !u.value) return;
			let t = e.clientX - D;
			!p.value && Math.abs(t) <= 4 || (p.value || (p.value = !0, u.value.setPointerCapture?.(e.pointerId)), e.preventDefault(), u.value.scrollLeft = k - t);
		}
		function ie(e) {
			e.pointerId === E && (p.value && Y(), X(!0));
		}
		function ae(e) {
			e.pointerId === E && X(!0);
		}
		function Z(e) {
			e.target !== u.value || e.pointerId !== E || (p.value && Y(), X());
		}
		function oe(e) {
			A && (J(), e.preventDefault(), e.stopImmediatePropagation());
		}
		function se() {
			!T || !u.value || (T.disconnect(), T.observe(u.value), Array.from(u.value.children).forEach((e) => {
				T.observe(e);
			}), K(!1));
		}
		function ce() {
			return u.value;
		}
		function le(e) {
			u.value?.scrollTo(e);
		}
		return z([N, F], async () => {
			await g(), K(!1);
		}, { deep: !0 }), z(P, (e) => {
			e || (X(!0), J());
		}), S(() => {
			typeof ResizeObserver == "function" && (T = new ResizeObserver(() => K(!1))), se();
		}), C(se), b(() => {
			x !== void 0 && cancelAnimationFrame(x), T?.disconnect(), X(!0), J();
		}), t({
			getScroller: ce,
			scrollTo: le
		}), (e, t) => (w(), o("div", h(H.value, { class: ["mat-scroll-area", `mat-scroll-area--${N.value}`] }), [
			e.$slots["fixed-start"] ? (w(), o("div", yi, [j(e.$slots, "fixed-start", {}, void 0, !0)])) : a("", !0),
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
				onClickCapture: oe,
				onLostpointercapture: Z,
				onPointercancel: ae,
				onPointerdown: ne,
				onPointermove: re,
				onPointerup: ie,
				onScroll: q
			}), [j(e.$slots, "default", {}, void 0, !0)], 16)], 6),
			e.$slots["fixed-end"] ? (w(), o("div", bi, [j(e.$slots, "fixed-end", {}, void 0, !0)])) : a("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-87fcdd08"]]), Si = { class: "mat-chip-set__scroll-content" }, Ci = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatChipSet" }, {
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
				return e === null || Pr(e) || Array.isArray(e) && e.every(Pr);
			}
		}
	},
	emits: { "update:modelValue"(e) {
		return e === null || Pr(e) || Array.isArray(e) && e.every(Pr);
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
		return T(mi, {
			isSelected: l,
			requestSelection: u,
			selection: c
		}), (e, t) => (w(), o("div", {
			class: _(["mat-chip-set", `mat-chip-set--${I(n).layout}`]),
			role: "group"
		}, [I(n).layout === "scroll" ? (w(), i(xi, {
			key: 0,
			class: "mat-chip-set__scroll-area",
			orientation: "horizontal",
			"bar-width": "hidden",
			"drag-scroll": "",
			"shadow-length": 48
		}, {
			default: V(() => [s("div", Si, [j(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		})) : j(e.$slots, "default", { key: 1 }, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-6760f296"]]), wi = Symbol("mde-vue-radio-group"), Ti = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e == null || Pr(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: Pr
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Pr(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radio", e), a = t, o = d(), c = p(wi, null), l = O(null), u = r(() => n.value), f = r(() => n.disabled || !!c?.disabled.value), m = r(() => n.color ?? c?.color.value), g = r(() => c ? c.isSelected(n.value) : Object.is(n.modelValue, n.value));
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
		return (e, t) => (w(), i(si, h({
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
}), [["__scopeId", "data-v-39dbc695"]]), Ei = ["aria-disabled"], Di = { class: "mat-radio-group__label mat-sys-typescale-title-medium" }, Oi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === null || Pr(e);
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
			validator: Be
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Pr(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radioGroup", e), i = t, a = L(), c = P([]), { colorStyle: l } = ct(r(() => n.color)), u = r(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = r(() => [l.value, a.style]);
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
		return T(wi, {
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
		}), [s("legend", Di, F(I(n).label), 1), j(e.$slots, "default", {}, void 0, !0)], 16, Ei));
	}
}), [["__scopeId", "data-v-4ad7f784"]]), ki = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Be
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
		return (e, t) => (w(), i(si, h(e.$attrs, {
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
function Ai(e) {
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
var ji = Object.freeze(["horizontal", "vertical"]), Mi = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), Ni = Object.freeze(["standard", "centered"]), Pi = 12;
function Fi(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Ii(e) {
	return Fi(e) && e > 0;
}
function Li(e) {
	return ji.includes(e);
}
function Ri(e) {
	return Mi.includes(e);
}
function zi(e) {
	return Ni.includes(e);
}
function Bi(e) {
	return Array.isArray(e) && e.length === 2 && e.every(Fi);
}
function Vi(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function Hi(e, t) {
	return Number(e.toFixed(Math.min(Pi, t)));
}
function Ui(e, t) {
	let n = Fi(e) ? e : 0, r = Fi(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function Wi(e) {
	return Ii(e) ? e : 1;
}
function Gi(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function Ki(e, t, n) {
	let r = Gi(Fi(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(Vi(t.min), Vi(t.max), Vi(n));
	return Hi(Gi(t.min + i * n, t), a);
}
function qi(e, t, n) {
	return Ki(Fi(e) ? e : (t.min + t.max) / 2, t, n);
}
function Ji(e, t) {
	return Hi((Gi(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function Yi(e) {
	return Number(e.toFixed(3)).toString();
}
function Xi(e) {
	let t = Math.min(Math.max(e, 0), 100), n = Yi(t), r = Hi(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${Yi(Math.abs(r))}px)`;
}
function Zi(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(Vi(e.min), Vi(e.max), Vi(t)), i = Array.from({ length: n + 1 }, (n, i) => Hi(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function Qi(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return Ki(n.min + (n.max - n.min) * u, n, r);
}
function $i(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return Ki(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return Ki(e + i * r, n, r);
}
function ea(e, t, n, r) {
	let i = Ki(e, n, r), a = Ki(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var ta = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, na = { class: "mat-slider__inset-icon-layer" }, ra = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, ia = [
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
], aa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: Fi
		},
		min: {
			type: Number,
			default: 0,
			validator: Fi
		},
		max: {
			type: Number,
			default: 100,
			validator: Fi
		},
		step: {
			type: Number,
			default: 1,
			validator: Ii
		},
		variant: {
			type: String,
			default: "standard",
			validator: zi
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || Fi(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: Li
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Ri
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
			return Fi(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let c = $("slider", e), d = n, f = L(), m = R(), g = O(null), y = O(null), x = O(null), C = O(null), T = O(!1), E = O(void 0), D = O(void 0), k = O(!1), M = O(!1), N = O("active"), P = p(Ae, ke), { colorStyle: ee } = ct(r(() => c.color)), B = r(() => Ui(c.min, c.max)), H = r(() => Wi(c.step)), U = r(() => Ki(c.modelValue, B.value, H.value)), W = r(() => T.value ? D.value : U.value), G = r(() => qi(c.center, B.value, H.value)), te = r(() => c.variant === "centered" ? G.value : B.value.min), K = r(() => Ji(W.value, B.value)), q = r(() => Ji(te.value, B.value)), J = r(() => Xi(K.value)), Y = r(() => c.variant === "standard" ? "0%" : Xi(q.value)), X = r(() => Math.sign(K.value - q.value)), ne = r(() => X.value >= 0 ? Y.value : `calc(${J.value} + var(--mat-slider-handle-track-gap))`), re = r(() => X.value > 0 ? `max(0px, calc(${J.value} - ${Y.value} - var(--mat-slider-handle-track-gap)))` : X.value < 0 ? `max(0px, calc(${Y.value} - ${J.value} - var(--mat-slider-handle-track-gap)))` : "0px"), ie = r(() => X.value > 0 ? Y.value : `max(0px, calc(${J.value} - var(--mat-slider-handle-track-gap)))`), ae = r(() => X.value < 0 ? Y.value : `calc(${J.value} + var(--mat-slider-handle-track-gap))`), Z = r(() => X.value < 0 ? `calc(100% - ${Y.value})` : `max(0px, calc(100% - ${J.value} - var(--mat-slider-handle-track-gap)))`), oe = r(() => c.showStopIndicator ? Zi(B.value, H.value) : c.variant === "centered" ? [B.value.min, B.value.max] : [B.value.max]), se = r(() => c.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(c.size)), ce = r(() => c.size === "extra-large" ? 32 : 24), le = r(() => c.showValueIndicator && (T.value || M.value)), ue = r(() => ({
			...ee.value,
			"--mat-slider-active-visible-size": re.value,
			"--mat-slider-active-visible-start": ne.value,
			"--mat-slider-center-position": Y.value,
			"--mat-slider-inactive-after-size": Z.value,
			"--mat-slider-inactive-after-start": ae.value,
			"--mat-slider-inactive-before-size": ie.value,
			"--mat-slider-inset-icon-position": N.value === "inactive" ? `calc(${J.value} + (var(--mat-slider-handle-width) / 2) + var(--mat-slider-handle-track-gap))` : "var(--mat-slider-inset-icon-offset)",
			"--mat-slider-position": J.value
		}));
		function de() {
			if (!se.value || c.variant !== "standard" || !g.value) {
				N.value = "active";
				return;
			}
			let e = g.value.getBoundingClientRect(), t = c.orientation === "vertical" ? e.height : e.width, n = c.size === "extra-large" ? 32 : 24, r = Number.parseFloat(getComputedStyle(g.value).getPropertyValue("--mat-slider-handle-width")) || 4, i = 6 + (t - 12) * K.value / 100, a = 12 + n;
			N.value = i - r / 2 - 6 >= a ? "active" : "inactive";
		}
		let fe;
		S(() => {
			de(), typeof ResizeObserver < "u" && (fe = new ResizeObserver(de), fe.observe(g.value));
		}), z([
			se,
			() => c.orientation,
			() => c.variant,
			K
		], de, { flush: "post" });
		function pe(e, t) {
			let n = T.value ? D.value : U.value;
			return e === void 0 || e === n ? !1 : (T.value && (D.value = e), d("update:modelValue", e), d("input", t), !0);
		}
		function me(e) {
			return x.value ? pe(Qi(e, x.value, B.value, H.value, c.orientation), e) : !1;
		}
		let he = Ai((e) => {
			k.value = me(e) || k.value;
		});
		function ge(e) {
			c.disabled || (he.cancel(), E.value = e.pointerId, D.value = U.value, k.value = !1, T.value = !0, C.value?.focus(), x.value?.setPointerCapture?.(e.pointerId), k.value = me(e));
		}
		function _e(e) {
			!T.value || e.pointerId !== E.value || he.schedule(e);
		}
		function ve(e, t) {
			!T.value || e.pointerId !== E.value || (t ? (he.flush(), k.value = me(e) || k.value) : he.cancel(), t && k.value && d("change", e), T.value = !1, k.value = !1, E.value = void 0, D.value = void 0);
		}
		b(() => {
			fe?.disconnect(), he.cancel();
		});
		function ye(e) {
			if (c.disabled) return;
			let t = $i(U.value, e.key, B.value, H.value);
			t !== void 0 && (e.preventDefault(), pe(t, e) && d("change", e));
		}
		return (n, r) => (w(), o("div", h({
			ref_key: "root",
			ref: g
		}, I(f), {
			class: ["mat-slider", [
				`mat-slider--${I(c).orientation}`,
				`mat-slider--size-${I(c).size}`,
				`mat-slider--${I(c).variant}`,
				{
					"mat-slider--disabled": I(c).disabled,
					"mat-slider--dragging": T.value,
					"mat-slider--use-cursor": I(P).useCursor
				}
			]],
			style: ue.value
		}), [
			s("span", ta, [
				r[6] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				s("span", { class: _(["mat-slider__active-track", { "mat-slider__active-track--from-start": I(c).variant === "standard" }]) }, null, 2),
				r[7] ||= s("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(oe.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(te.value, W.value) && e <= Math.max(te.value, W.value) }]),
					style: v({ "--mat-slider-stop-position": I(Xi)(I(Ji)(e, B.value)) })
				}, null, 6))), 128)),
				se.value && I(c).variant === "standard" ? (w(), i(dt, {
					key: 0,
					class: "mat-slider__inset-icon",
					"font-color": N.value === "active" ? "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))" : "var(--mat-slider-inset-icon-inactive-color)",
					icon: I(c).insetIcon,
					"optical-size": ce.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, [
					"font-color",
					"icon",
					"optical-size"
				])) : se.value ? (w(), o(t, { key: 1 }, [s("span", na, [u(dt, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: I(c).insetIcon,
					"optical-size": ce.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), s("span", ra, [u(dt, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: I(c).insetIcon,
					"optical-size": ce.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])])], 64)) : a("", !0),
				s("span", {
					ref_key: "handle",
					ref: y,
					class: "mat-slider__handle"
				}, [...r[5] ||= [s("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
			]),
			u(gn, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": le.value,
				target: y.value
			}, {
				default: V(() => [I(m)["indicator-label"] ? j(n.$slots, "indicator-label", {
					key: 0,
					modelValue: W.value
				}, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(W.value), 1)], 64))]),
				_: 3
			}, 8, [
				"location",
				"model-value",
				"target"
			]),
			s("span", {
				ref_key: "interaction",
				ref: x,
				class: "mat-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: r[0] ||= (e) => ve(e, !1),
				onPointercancel: r[1] ||= (e) => ve(e, !1),
				onPointerdown: ge,
				onPointermove: _e,
				onPointerup: r[2] ||= (e) => ve(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "nativeInput",
				ref: C,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": I(f)["aria-label"],
				"aria-orientation": I(c).orientation,
				"aria-valuemax": B.value.max,
				"aria-valuemin": B.value.min,
				"aria-valuenow": W.value,
				disabled: I(c).disabled,
				max: B.value.max,
				min: B.value.min,
				step: H.value,
				value: W.value,
				onBlur: r[3] ||= (e) => M.value = !1,
				onFocus: r[4] ||= (e) => M.value = !0,
				onKeydown: ye
			}, null, 40, ia)
		], 16));
	}
}), [["__scopeId", "data-v-c654d410"]]), oa = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, sa = [
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
], ca = [
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
], la = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Bi
		},
		min: {
			type: Number,
			default: 0,
			validator: Fi
		},
		max: {
			type: Number,
			default: 100,
			validator: Fi
		},
		step: {
			type: Number,
			default: 1,
			validator: Ii
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: Li
		},
		size: {
			type: String,
			default: "extra-small",
			validator: Ri
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
			return Bi(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let i = $("rangeSlider", e), a = n, c = L(), d = R(), f = O([]), m = O(null), g = O(null), y = O(null), x = O(0), S = O(void 0), C = O(!1), T = O(void 0), E = O(void 0), D = O(!1), k = p(Ae, ke), { colorStyle: M } = ct(r(() => i.color)), N = r(() => Ui(i.min, i.max)), P = r(() => Wi(i.step)), ee = r(() => ea(i.modelValue?.[0], i.modelValue?.[1], N.value, P.value)), z = r(() => C.value ? E.value : ee.value), B = r(() => Ji(z.value[0], N.value)), H = r(() => Ji(z.value[1], N.value)), U = r(() => Xi(B.value)), W = r(() => Xi(H.value)), G = r(() => i.showStopIndicator ? Zi(N.value, P.value) : [N.value.min, N.value.max]), te = r(() => f.value[x.value] ?? null), K = r(() => z.value[x.value]), q = r(() => i.showValueIndicator && (C.value || S.value === x.value)), J = r(() => ({
			...M.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${W.value} - ${U.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${U.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": W.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${W.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${W.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${U.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": U.value
		}));
		function Y(e) {
			return e === 0 ? g.value : y.value;
		}
		function X(e) {
			let [t, n] = z.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function ne(e, t, n) {
			if (t === void 0) return !1;
			let [r, i] = C.value ? E.value : ee.value, o = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === i ? !1 : (C.value && (E.value = o), a("update:modelValue", o), a("input", n), !0);
		}
		function re(e) {
			if (!m.value) return !1;
			let t = Qi(e, m.value, N.value, P.value, i.orientation);
			return ne(x.value, t, e);
		}
		let ie = Ai((e) => {
			D.value = re(e) || D.value;
		});
		function ae(e) {
			if (i.disabled || !m.value) return;
			ie.cancel();
			let t = Qi(e, m.value, N.value, P.value, i.orientation);
			t !== void 0 && (x.value = X(t), T.value = e.pointerId, E.value = [...ee.value], D.value = !1, C.value = !0, Y(x.value)?.focus(), m.value.setPointerCapture?.(e.pointerId), D.value = ne(x.value, t, e));
		}
		function Z(e) {
			!C.value || e.pointerId !== T.value || ie.schedule(e);
		}
		function oe(e, t) {
			!C.value || e.pointerId !== T.value || (t ? (ie.flush(), D.value = re(e) || D.value) : ie.cancel(), t && D.value && a("change", e), C.value = !1, D.value = !1, T.value = void 0, E.value = void 0);
		}
		b(() => {
			ie.cancel();
		});
		function se(e, t) {
			if (i.disabled) return;
			let n = $i(ee.value[e], t.key, N.value, P.value);
			n !== void 0 && (t.preventDefault(), x.value = e, ne(e, n, t) && a("change", t));
		}
		function ce(e) {
			x.value = e, S.value = e;
		}
		function le(e) {
			S.value === e && (S.value = void 0);
		}
		function ue(e, t) {
			f.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (e, n) => (w(), o("div", h(I(c), {
			class: ["mat-range-slider", [
				`mat-range-slider--${I(i).orientation}`,
				`mat-range-slider--size-${I(i).size}`,
				{
					"mat-range-slider--disabled": I(i).disabled,
					"mat-range-slider--dragging": C.value,
					"mat-range-slider--use-cursor": I(k).useCursor
				}
			]],
			style: J.value
		}), [
			s("span", oa, [
				n[10] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				n[11] ||= s("span", { class: "mat-range-slider__active-track" }, null, -1),
				n[12] ||= s("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(w(!0), o(t, null, A(G.value, (e) => (w(), o("span", {
					key: e,
					class: _(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= z.value[0] && e <= z.value[1] }]),
					style: v({ "--mat-range-slider-stop-position": I(Xi)(I(Ji)(e, N.value)) })
				}, null, 6))), 128)),
				(w(!0), o(t, null, A(z.value, (e, t) => (w(), o("span", {
					key: t,
					ref_for: !0,
					ref: (e) => ue(t, e),
					class: _(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": x.value === t }]])
				}, [...n[9] ||= [s("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			u(gn, {
				class: "mat-range-slider__value-indicator",
				"data-slider-value-indicator": "",
				location: I(i).orientation === "vertical" ? "right" : "top",
				"model-value": q.value,
				target: te.value
			}, {
				default: V(() => [I(d)["indicator-label"] ? j(e.$slots, "indicator-label", {
					key: 0,
					index: x.value,
					modelValue: K.value
				}, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(K.value), 1)], 64))]),
				_: 3
			}, 8, [
				"location",
				"model-value",
				"target"
			]),
			s("span", {
				ref_key: "interaction",
				ref: m,
				class: "mat-range-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: n[0] ||= (e) => oe(e, !1),
				onPointercancel: n[1] ||= (e) => oe(e, !1),
				onPointerdown: ae,
				onPointermove: Z,
				onPointerup: n[2] ||= (e) => oe(e, !0)
			}, null, 544),
			s("input", {
				ref_key: "startInput",
				ref: g,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": I(i).ariaLabelStart,
				"aria-orientation": I(i).orientation,
				"aria-valuemax": z.value[1],
				"aria-valuemin": N.value.min,
				"aria-valuenow": z.value[0],
				disabled: I(i).disabled,
				max: z.value[1],
				min: N.value.min,
				step: P.value,
				value: z.value[0],
				onBlur: n[3] ||= (e) => le(0),
				onFocus: n[4] ||= (e) => ce(0),
				onKeydown: n[5] ||= (e) => se(0, e)
			}, null, 40, sa),
			s("input", {
				ref_key: "endInput",
				ref: y,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": I(i).ariaLabelEnd,
				"aria-orientation": I(i).orientation,
				"aria-valuemax": N.value.max,
				"aria-valuemin": z.value[0],
				"aria-valuenow": z.value[1],
				disabled: I(i).disabled,
				max: N.value.max,
				min: z.value[0],
				step: P.value,
				value: z.value[1],
				onBlur: n[6] ||= (e) => le(1),
				onFocus: n[7] ||= (e) => ce(1),
				onKeydown: n[8] ||= (e) => se(1, e)
			}, null, 40, ca)
		], 16));
	}
}), [["__scopeId", "data-v-52ff758e"]]), ua = ["inert", "aria-hidden"], da = { class: "mat-text-input__container" }, fa = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, pa = {
	key: 0,
	class: "mat-text-input__outline-label mat-sys-typescale-body-small"
}, ma = { key: 0 }, ha = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, ga = {
	key: 0,
	"aria-hidden": "true"
}, _a = { class: "mat-text-input__control-row" }, va = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, ya = {
	key: 3,
	class: "mat-text-input__affix mat-text-input__suffix"
}, ba = { class: "mat-text-input__supporting-text" }, xa = {
	key: 0,
	class: "mat-text-input__counter"
}, Sa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = e, c = t, u = L(), d = O(!1), f = O(n.modelValue), p = O(), m = ee(), y = `${m}-supporting`, x = r(() => u.id || m), { colorStyle: C } = ct(r(() => n.color)), T = r(() => !!u.placeholder), E = r(() => n.control === "custom" ? n.customFocused : d.value), D = r(() => E.value || f.value.length > 0 || T.value), k = r(() => n.error ? n.errorText : n.supportingText), A = r(() => !!k.value || n.maxLength !== void 0), N = r(() => {
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
		function te(e) {
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
			W(), !(n.control === "custom" || typeof globalThis.ResizeObserver != "function") && (B = new globalThis.ResizeObserver(te), B.observe(p.value.getInput()));
		}), b(() => {
			B?.disconnect();
		});
		function K() {
			n.control !== "custom" && p.value?.focusInput();
		}
		function q(e) {
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
		}, [s("div", da, [
			e.variant === "outlined" ? (w(), o("fieldset", fa, [D.value && e.label ? (w(), o("legend", pa, [l(F(e.label), 1), e.required ? (w(), o("span", ma, " *")) : a("", !0)])) : a("", !0)])) : a("", !0),
			e.variant === "filled" ? (w(), o("span", ha)) : a("", !0),
			t.$slots.leading ? (w(), i(dt, {
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
				onClick: K
			}, {
				default: V(() => [e.label ? (w(), o("span", {
					key: 0,
					class: _(["mat-text-input__label", D.value ? "mat-sys-typescale-body-small" : "mat-sys-typescale-body-large"])
				}, [l(F(e.label), 1), e.required ? (w(), o("span", ga, " *")) : a("", !0)], 2)) : a("", !0), s("span", _a, [
					e.prefixText ? (w(), o("span", va, F(e.prefixText), 1)) : a("", !0),
					e.control === "custom" ? j(t.$slots, "control", {
						key: 1,
						controlId: x.value,
						describedBy: N.value
					}, void 0, !0) : (w(), i(Gn, h({
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
						"onUpdate:modelValue": q
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
					e.suffixText ? (w(), o("span", ya, F(e.suffixText), 1)) : a("", !0)
				])]),
				_: 3
			}, 8, ["for"])),
			t.$slots.trailing ? (w(), i(dt, {
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
		}, [s("span", ba, F(k.value), 1), e.maxLength === void 0 ? a("", !0) : (w(), o("span", xa, F(e.modelValue.length) + " / " + F(e.maxLength), 1))])) : a("", !0)], 14, ua));
	}
}), [["__scopeId", "data-v-53234380"]]), Ca = ["filled", "outlined"], wa = {
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
			return Ca.includes(e);
		}
	},
	color: {
		type: String,
		default: void 0,
		validator: Be
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
}, Ta = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...wa,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = $("textField", e), r = t;
		return (e, t) => (w(), i(Sa, h({
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
}), Ea = 200, Da = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Be
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => gt(e, {
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
		let i = $("menu", e), s = n, c = L(), l = R(), d = p(Zr, null), f = p(Xr, null), m = p(Dt, null), _ = O(null), y = O(null), x = O(null), E = P(null), D = r(() => x.value?.root ?? x.value?.$el ?? null), k = ee().replace(/[^\w-]/g, "-"), A = r(() => c.id ?? `${k}-menu`), M = `--mat-menu-anchor-${k}`, N = O(!1), F = O("closed"), B = f?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, H = O(0), U = /* @__PURE__ */ new Map(), W = null, G = !1, te = !1, K = !1, q = Et(), J, Y, X = null, ne = !1, ae = !1, Z = r(() => !!d), oe = r(() => !!l.activator), se = r(() => !Z.value && !oe.value && Ce(i.anchor)), ce = r(() => H.value > 0), le = r(() => !Z.value && i.scrim), ue = r(() => !le.value || !!m), de = r(() => le.value ? "manual" : "auto"), fe = r(() => Z.value ? N.value : i.modelValue), pe = r(() => i.variant ?? f?.variant.value ?? "standard"), me = r(() => i.color ?? f?.color.value), he = r(() => i.closeOnClick), { colorStyle: ge } = ct(me), _e = r(() => {
			if (i.maxLength === void 0) return;
			let e = _t(i.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))`;
			return {
				"--mat-menu-resolved-max-length": t,
				maxBlockSize: t
			};
		}), ve = r(() => {
			let [e, t] = Ce(i.offset) ? i.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: se.value ? "auto" : M
			};
			return se.value && Ce(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), ye = r(() => {
			let e = E.value;
			if (e) return {
				"--mat-menu-viewport-width": `${e.width}px`,
				"--mat-menu-viewport-height": `${e.height}px`
			};
		}), be = r(() => {
			let e = E.value;
			if (e) return {
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			};
		}), xe = r(() => [
			ge.value,
			ve.value,
			ye.value,
			c.style,
			_e.value
		]), Se = Nr({
			root: D,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === D.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function Ce(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function we() {
			if (Z.value) return d.element.value;
			if (oe.value) {
				let e = _.value ? [..._.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function Te() {
			W &&= (ie(W, M), null);
		}
		function Q() {
			let e = we();
			return e ? W === e ? e : (Te(), W = e, re(e, M), e) : null;
		}
		function Ee() {
			q.cancel();
		}
		function De() {
			!le.value || !y.value || te || (te = !0, y.value.showPopover?.());
		}
		function Oe() {
			te && (te = !1, y.value?.hidePopover?.());
		}
		function ke() {
			D.value && G && (G = !1, K = !0, D.value.hidePopover?.()), Oe(), F.value = "closed";
		}
		function Ae() {
			Oe(), F.value = "closed";
		}
		function je() {
			F.value = "closing", q.wait(D.value, Ea, Ae);
		}
		function Me({ immediate: e = !1 } = {}) {
			if (!(!D.value || !G)) {
				if (K = !0, Re({ immediate: !0 }), e) {
					Ee(), ke();
					return;
				}
				F.value !== "closing" && (F.value = "closing", q.wait(D.value, Ea, ke));
			}
		}
		function Ne() {
			if (J = void 0, !D.value || !G) return;
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
		function Pe() {
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
		function Fe() {
			Pe(), J !== void 0 && cancelAnimationFrame(J), J = requestAnimationFrame(Ne);
		}
		async function Ie() {
			Ee(), K = !1, await g();
			let e = se.value ? null : Q(), t = se.value || !!e;
			if (!D.value || !t) {
				Z.value || (console.warn(oe.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), s("update:modelValue", !1));
				return;
			}
			G || (se.value && document.activeElement instanceof HTMLElement && (X = document.activeElement), De(), G = !0, D.value.showPopover?.()), F.value = "open", Z.value && (d.submenuOpen.value = !0), Se.refresh(), Se.focusFirst(), Fe();
		}
		function Le() {
			let e = we() ?? X;
			X = null, g(() => e?.focus());
		}
		function Re({ immediate: e = !1 } = {}) {
			U.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function ze({ focus: e = !0, immediate: t = !1 } = {}) {
			Re({ immediate: t }), Z.value ? (N.value = !1, d.submenuOpen.value = !1) : s("update:modelValue", !1), Me({ immediate: t }), e && Le();
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
			U.set(e.element, e), ti(Array.from(U.values()).filter((e) => !e.grouped)), Se.queueRefresh();
		}
		function We(e) {
			U.delete(e.element), ti(Array.from(U.values()).filter((e) => !e.grouped)), Se.queueRefresh();
		}
		function Ge() {
			H.value += 1, Se.queueRefresh();
		}
		function Ke() {
			H.value = Math.max(0, H.value - 1), Se.queueRefresh();
		}
		function qe(e, { pointer: t = !1 } = {}) {
			U.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function Je(e) {
			let t = getComputedStyle(D.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), Se.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), Se.focusFirst()) : e.key === "End" ? (e.preventDefault(), Se.focusLast()) : e.key === "Escape" || Z.value && e.key === t ? (e.preventDefault(), ze()) : e.key === "Tab" && Be();
		}
		function Ye(e) {
			if (G = e.newState === "open", G) {
				Fe();
				return;
			}
			let t = K;
			K = !1, Re(), Z.value && (N.value = !1, d.submenuOpen.value = !1), !(!fe.value || t) && (je(), Z.value || s("update:modelValue", !1), Le());
		}
		T(Xr, {
			closeOtherSubmenus: qe,
			closeTree: Be,
			closeOnClick: he,
			color: me,
			registerItem: Ue,
			registerGroup: Ge,
			unregisterItem: We,
			unregisterGroup: Ke,
			pointerHistory: B,
			variant: pe
		}), d && d.registerSubmenu({
			close: ze,
			element: D,
			id: A,
			open: Ie
		}), S(() => {
			Se.observe(), window.addEventListener("resize", Fe), window.addEventListener("scroll", Fe, {
				capture: !0,
				passive: !0
			}), fe.value && (Ze(), $e()), typeof ResizeObserver < "u" && (Y = new ResizeObserver(Fe), Y.observe(D.value)), fe.value && Ie();
		}), C(() => {
			Z.value || !fe.value || se.value || we() !== W && (Te(), Ie());
		}), b(() => {
			Ee(), J !== void 0 && cancelAnimationFrame(J), Y?.disconnect(), window.removeEventListener("resize", Fe), window.removeEventListener("scroll", Fe, { capture: !0 }), Qe(), et(), Me({ immediate: !0 }), Oe(), Te(), d?.unregisterSubmenu();
		});
		function Xe(e) {
			B.previous = B.current, B.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Ze() {
			f || ne || (document.addEventListener("pointermove", Xe, !0), ne = !0);
		}
		function Qe() {
			ne &&= (document.removeEventListener("pointermove", Xe, !0), !1);
		}
		function $e() {
			f || !ue.value || ae || (document.addEventListener("pointerdown", He, !0), ae = !0);
		}
		function et() {
			ae &&= (document.removeEventListener("pointerdown", He, !0), !1);
		}
		return z(fe, (e) => {
			e ? (Ze(), $e(), Ie()) : (Qe(), et(), Me());
		}), z(() => i.anchor, async () => {
			Te(), fe.value && await Ie();
		}, { deep: !0 }), z(() => i.offset, async () => {
			fe.value && (await g(), Fe());
		}, { deep: !0 }), z(() => i.maxLength, async () => {
			fe.value && (await g(), Fe());
		}), z(() => i.scrim, async () => {
			Z.value || (D.value && G && (G = !1, K = !0, D.value.hidePopover?.()), Oe(), et(), await g(), fe.value && ($e(), await Ie()));
		}), m && z(m.publicContext.layout, Fe), (e, n) => (w(), o(t, null, [
			!Z.value && oe.value ? (w(), o("span", {
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
				style: v(be.value),
				onPointerdown: Ve
			}, null, 36)) : a("", !0),
			u(hr, h({
				id: A.value,
				ref_key: "surface",
				ref: x
			}, e.$attrs, {
				class: ["mat-menu", [`mat-menu--${pe.value}`, {
					"mat-menu--coordinate": se.value,
					"mat-menu--grouped": ce.value,
					"mat-menu--nested": Z.value,
					"mat-menu--closing": F.value === "closing"
				}]],
				style: xe.value,
				popover: de.value,
				role: "menu",
				onPointerenter: n[0] ||= (e) => I(d)?.cancelSubmenuClose(),
				onFocusin: I(Se).handleFocusIn,
				onKeydown: Je,
				onToggle: Ye
			}), {
				default: V(() => [u(xi, {
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
}), [["__scopeId", "data-v-5e9edf61"]]), Oa = { class: "mat-menu-item-host" }, ka = 300, Aa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = $("menuItem", e), s = t, l = R(), d = p(Xr, null), f = p(Qr, null), m = p(Ae, ke), g = O(null), _ = r(() => g.value?.root ?? g.value?.$el ?? null), v = O(!1), y = O(void 0), x = O("only"), C, E, D = r(() => !!l.submenu);
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
				return ei(d.pointerHistory.current, d.pointerHistory.previous, t, n) ? ka : 0;
			}
		};
		function L(e) {
			if (D.value) {
				M();
				return;
			}
			s("click", e), d?.closeOnClick.value && d.closeTree();
		}
		function ee(e) {
			if (!D.value) return;
			let t = getComputedStyle(_.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), M());
		}
		return T(Zr, {
			cancelSubmenuClose: A,
			element: _,
			registerSubmenu: N,
			submenuOpen: v,
			unregisterSubmenu: P
		}), S(() => {
			f?.registerItem(F), d?.registerItem(F);
		}), b(() => {
			clearTimeout(E), f?.unregisterItem(F), d?.unregisterItem(F);
		}), (e, t) => (w(), o("span", Oa, [u(Ee, h({
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
			onClick: L,
			onKeydown: ee,
			onPointerenter: t[0] ||= (e) => M({ pointer: !0 })
		}), {
			default: V(() => [u(Br, {
				namespace: "mat-menu-item-content",
				"label-typography-class": "mat-sys-typescale-label-large",
				"line-count": e.$slots.supporting ? 2 : 1,
				"leading-icon": "",
				"supporting-typography-class": "mat-sys-typescale-body-small",
				"trailing-typography-class": "mat-sys-typescale-label-large"
			}, c({
				trailing: V(() => [e.$slots.trailing ? j(e.$slots, "trailing", { key: 0 }, void 0, !0) : D.value ? (w(), i(dt, {
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
}), [["__scopeId", "data-v-985e87a6"]]), ja = ["aria-labelledby"], Ma = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = $("menuGroup", e), n = L(), i = p(Xr, null), s = `${ee().replace(/[^\w-]/g, "-")}-label`, c = r(() => t.label ? s : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), ti(Array.from(l));
		}
		function d(e) {
			l.delete(e), ti(Array.from(l));
		}
		return T(Qr, {
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
		}, F(I(t).label), 1)) : a("", !0), j(e.$slots, "default", {}, void 0, !0)], 16, ja));
	}
}), [["__scopeId", "data-v-2026601d"]]), Na = [
	"id",
	"aria-describedby",
	"aria-label",
	"aria-disabled",
	"aria-expanded",
	"aria-invalid",
	"aria-readonly",
	"tabindex"
], Pa = {
	key: 0,
	class: "mat-select__chips"
}, Fa = {
	key: 1,
	class: "mat-select__value"
}, Ia = {
	key: 2,
	class: "mat-select__placeholder"
}, La = [
	"disabled",
	"multiple",
	"required"
], Ra = ["selected"], za = [
	"disabled",
	"selected",
	"value"
], Ba = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === null || Pr(e) || Array.isArray(e) && e.every(Pr);
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
			validator: (e) => Ca.includes(e)
		},
		color: {
			type: String,
			default: void 0,
			validator: Be
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
		"update:modelValue": (e) => e === null || Pr(e) || Array.isArray(e) && e.every(Pr),
		change: (e) => e === null || Pr(e) || Array.isArray(e) && e.every(Pr)
	},
	setup(e, { emit: n }) {
		let d = $("select", e), f = n, m = L(), y = p(Ae, ke), b = O(!1), x = O(!1), S = O(null), C = ee().replace(/[^\w-]/g, "-"), T = r(() => m.id ?? `${C}-select`), E = r(() => ({
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
			return typeof n != "string" || !Pr(r) ? null : {
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
		function U() {
			d.disabled || d.readonly || (b.value = !b.value);
		}
		function G(e) {
			[
				"Enter",
				" ",
				"ArrowDown",
				"ArrowUp"
			].includes(e.key) && (e.preventDefault(), b.value || U());
		}
		function te(e) {
			d.disabled || d.readonly || (d.multiple ? H(e) : (f("update:modelValue", null), f("change", null)), g(() => S.value?.focus()));
		}
		return (e, n) => (w(), o("div", {
			class: _(["mat-select", [{ "mat-select--use-cursor": I(y).useCursor }, e.$attrs.class]]),
			style: v(e.$attrs.style)
		}, [
			u(Sa, {
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
					onClick: U,
					onFocus: n[2] ||= (e) => x.value = !0,
					onKeydown: G
				}, [
					I(d).chips && P.value ? (w(), o("span", Pa, [(w(!0), o(t, null, A(M.value, (e) => (w(), i(vi, {
						key: `${typeof e.value}:${String(e.value)}`,
						variant: "input",
						selected: B(e.value),
						disabled: I(d).disabled || I(d).readonly,
						onClick: n[0] ||= W(() => {}, ["stop"]),
						onRemove: (t) => te(e.value)
					}, {
						default: V(() => [l(F(e.title), 1)]),
						_: 2
					}, 1032, [
						"selected",
						"disabled",
						"onRemove"
					]))), 128))])) : P.value ? (w(), o("span", Fa, F(N.value), 1)) : (w(), o("span", Ia, F(I(d).placeholder), 1)),
					n[4] ||= s("span", { class: "mat-select__spacer" }, null, -1),
					u(dt, {
						as: "span",
						icon: "arrow_drop_down",
						"optical-size": 24,
						size: "24px",
						"aria-hidden": "true"
					})
				], 40, Na)]),
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
			}, null, 8, Ra)), (w(!0), o(t, null, A(k.value.options, (e) => (w(), o("option", {
				key: `${typeof e.value}:${String(e.value)}`,
				disabled: e.disabled,
				selected: B(e.value),
				value: String(e.value)
			}, F(e.title), 9, za))), 128))], 16, La),
			u(Da, {
				id: R,
				modelValue: b.value,
				"onUpdate:modelValue": n[3] ||= (e) => b.value = e,
				anchor: T.value,
				"close-on-click": !I(d).multiple
			}, {
				default: V(() => [k.value.groups.length === 0 ? (w(!0), o(t, { key: 0 }, A(k.value.ungrouped, (e) => (w(), i(Aa, {
					key: `${typeof e.value}:${String(e.value)}`,
					disabled: e.disabled,
					onClick: (t) => H(e.value)
				}, c({
					default: V(() => [l(" " + F(e.title) + " ", 1)]),
					_: 2
				}, [I(d).multiple ? {
					name: "leading",
					fn: V(() => [u(ci, {
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
				} : void 0]), 1032, ["disabled", "onClick"]))), 128)) : k.value.ungrouped.length > 0 ? (w(), i(Ma, { key: 1 }, {
					default: V(() => [(w(!0), o(t, null, A(k.value.ungrouped, (e) => (w(), i(Aa, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						onClick: (t) => H(e.value)
					}, c({
						default: V(() => [l(" " + F(e.title) + " ", 1)]),
						_: 2
					}, [I(d).multiple ? {
						name: "leading",
						fn: V(() => [u(ci, {
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
				})) : a("", !0), (w(!0), o(t, null, A(k.value.groups, (e) => (w(), i(Ma, {
					key: e.label,
					label: e.label
				}, {
					default: V(() => [(w(!0), o(t, null, A(e.options, (e) => (w(), i(Aa, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						onClick: (t) => H(e.value)
					}, c({
						default: V(() => [l(" " + F(e.title) + " ", 1)]),
						_: 2
					}, [I(d).multiple ? {
						name: "leading",
						fn: V(() => [u(ci, {
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
}), [["__scopeId", "data-v-a884bbfb"]]), Va = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...wa,
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
		return (e, t) => (w(), i(Sa, h({
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
}), Ha = P([]), Ua = P(0), Wa = Symbol("mat-dialog-document-scope"), Ga = /* @__PURE__ */ new WeakMap(), Ka = /* @__PURE__ */ new Map();
function qa(e) {
	return Ka.has(e) || Ka.set(e, {
		count: 0,
		inert: !1,
		inertElement: null,
		lockedScrollbarGutter: null,
		overflow: "",
		scrollbarGutter: ""
	}), Ka.get(e);
}
function Ja(e, t) {
	let n = qa(e);
	!t || t === n.inertElement || (n.inertElement && !n.inert && n.inertElement.removeAttribute("inert"), Ka.set(e, {
		...n,
		inert: t.hasAttribute("inert"),
		inertElement: t
	}), t.setAttribute("inert", ""));
}
function Ya(e) {
	let t = Ka.get(e);
	t?.inertElement && (t.inert || t.inertElement.removeAttribute("inert"), Ka.set(e, {
		...t,
		inert: !1,
		inertElement: null
	}));
}
function Xa(e) {
	let t = qa(e), n = document.documentElement, r = n.clientWidth > 0 ? Math.max(0, window.innerWidth - n.clientWidth) : 0, i = getComputedStyle(n).scrollbarGutter, a = r > 0 && !i.includes("stable") ? "stable" : null;
	Ka.set(e, {
		...t,
		lockedScrollbarGutter: a,
		overflow: n.style.overflow,
		scrollbarGutter: n.style.scrollbarGutter
	}), a && (n.style.scrollbarGutter = a, Ua.value = r), n.style.overflow = "hidden";
}
function Za(e) {
	let t = Ka.get(e);
	if (!t) return;
	let n = document.documentElement;
	n.style.overflow === "hidden" && (n.style.overflow = t.overflow), t.lockedScrollbarGutter !== null && n.style.scrollbarGutter === t.lockedScrollbarGutter && (n.style.scrollbarGutter = t.scrollbarGutter), t.lockedScrollbarGutter !== null && (Ua.value = 0);
}
function Qa(e) {
	let t = e, n = qa(e), r = getComputedStyle(t), i = (Number.parseFloat(r.borderLeftWidth) || 0) + (Number.parseFloat(r.borderRightWidth) || 0), a = Math.max(0, t.offsetWidth - t.clientWidth - i) > 0 && !r.scrollbarGutter.includes("stable") ? "stable" : null;
	Ka.set(e, {
		...n,
		lockedScrollbarGutter: a,
		overflow: t.style.overflow,
		scrollbarGutter: t.style.scrollbarGutter
	}), a && (t.style.scrollbarGutter = a), t.style.overflow = "hidden";
}
function $a(e) {
	let t = e, n = Ka.get(e);
	n && (t.style.overflow === "hidden" && (t.style.overflow = n.overflow), n.lockedScrollbarGutter !== null && t.style.scrollbarGutter === n.lockedScrollbarGutter && (t.style.scrollbarGutter = n.scrollbarGutter));
}
function eo(e) {
	let t = Ka.get(e);
	!t || t.count > 0 || (e === Wa ? Za(e) : $a(e), Ya(e), Ka.delete(e));
}
function to() {
	[...Ka.keys()].forEach((e) => {
		e === Wa ? Za(e) : $a(e), Ya(e);
	}), Ka.clear();
}
function no({ inertElement: e = null, scrollElement: t } = {}) {
	let n = t instanceof HTMLElement ? t : Wa, r = qa(n);
	r.count === 0 ? (n === Wa ? Xa(n) : Qa(n), Ja(n, e)) : e && r.inertElement !== e && Ja(n, e);
	let i = qa(n);
	Ka.set(n, {
		...i,
		count: i.count + 1
	});
}
function ro(e) {
	let t = e?.scrollElement instanceof HTMLElement ? e.scrollElement : Wa, n = Ka.get(t);
	n && (Ka.set(t, {
		...n,
		count: Math.max(0, n.count - 1)
	}), eo(t));
}
function io(e, t) {
	let n = Ha.value.filter((e) => e.isConnected);
	if (n.length === 0 && to(), n.includes(e)) {
		Ha.value = n;
		return;
	}
	Ga.set(e, t), Ha.value = [...n, e], no(t);
}
function ao(e) {
	let t = Ga.get(e);
	Ga.delete(e), Ha.value = Ha.value.filter((t) => t !== e && t.isConnected), t && ro(t), Ha.value.length === 0 && to();
}
//#endregion
//#region src/components/use-focus-trap.js
var oo = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
function so(e, t) {
	let n = null, r = !1;
	function i() {
		let t = e.value;
		return t ? [...t.querySelectorAll(oo)].filter((e) => e instanceof HTMLElement) : [];
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
var co = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
}), [["__scopeId", "data-v-61d08a89"]]), lo = { class: "mat-dialog__header" }, uo = {
	key: 1,
	class: "mat-dialog__actions"
}, fo = {
	key: 0,
	class: "mat-dialog__content mat-sys-typescale-body-medium"
}, po = {
	key: 2,
	class: "mat-dialog__content mat-sys-typescale-body-medium"
}, mo = {
	key: 3,
	class: "mat-dialog__actions"
}, ho = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => gt(e, {
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
			validator: Be
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: c }) {
		let f = $("dialog", e), m = c, _ = L(), y = R(), x = d(), C = p(Dt, null), T = Object.prototype.hasOwnProperty.call(x?.vnode.props ?? {}, "attach"), E = O(null), D = O(null), k = O(!1), A = O("closed"), M = O(null), N = P(null), H = `${ee().replace(/[^\w-]/g, "-")}-title`, U = r(() => D.value?.root ?? D.value?.$el ?? null), W = r(() => !!N.value), G = r(() => f.title !== void 0 || !!y.title), te = r(() => f.content !== void 0 || !!y.default), K = r(() => !f.fullScreen && (f.icon !== void 0 || !!y.icon)), q = r(() => !!y.activator), J = r(() => Ha.value.at(-1) === U.value), { colorStyle: Y } = ct(r(() => f.color)), X = r(() => {
			if (f.fullScreen || f.width === void 0) return;
			let e = _t(f.width, {
				property: "inline-size",
				positive: !0
			});
			if (e !== void 0) return {
				inlineSize: `min(${e}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), ne = r(() => [_.style]), re = r(() => [Y.value, X.value]), ie = !1, ae = Et(), Z = null;
		so(U, r(() => k.value && J.value));
		function oe() {
			let e = E.value ? [...E.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function se() {
			ae.cancel();
		}
		function ce(e, t) {
			ae.wait(U.value, e, t);
		}
		function le() {
			if (typeof f.attach == "string") try {
				return document.querySelector(f.attach);
			} catch {
				return null;
			}
			return f.attach instanceof HTMLElement && f.attach.ownerDocument === document ? f.attach : null;
		}
		function ue(e) {
			if (C && !T) return {
				context: C,
				target: C.modalLayer.value
			};
			if (T) {
				let t = e ? jt(e) : null;
				if (t) return {
					context: t,
					target: t.modalLayer.value
				};
			}
			return null;
		}
		function de(e) {
			return {
				inertElement: e.contentElement.value,
				scrollElement: e.documentMode.value ? null : e.contentElement.value
			};
		}
		function fe() {
			m("update:modelValue", !1);
		}
		function pe() {
			G.value || _["aria-label"] || _["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function me() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function he() {
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
		async function ge() {
			if (se(), k.value && U.value?.open) {
				A.value = "opening", ce(400, () => {
					A.value = "open", m("opened");
				});
				return;
			}
			let e = q.value ? oe() : null;
			if (q.value && !e) {
				me(), fe();
				return;
			}
			let t = le(), n = ue(t), r = n ? n.target : t;
			if (!r) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), fe();
				return;
			}
			Z = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), N.value = n, M.value = r, k.value = !0, A.value = "opening", pe(), await g(), !(!f.modelValue || !U.value) && (U.value.open || U.value.show(), io(U.value, n ? de(n.context) : void 0), he(), ce(400, () => {
				A.value = "open", m("opened");
			}));
		}
		function _e() {
			let e = U.value;
			e?.open && e.close(), e && ao(e), N.value = null, k.value = !1, A.value = "closed", g(() => {
				Z?.isConnected && Z.focus({ preventScroll: !0 }), Z = null, m("closed");
			});
		}
		function ve() {
			k.value && (A.value = "closing", ce(200, _e));
		}
		function ye(e) {
			e.preventDefault(), fe();
		}
		function be(e) {
			e.key === "Escape" && (e.preventDefault(), fe());
		}
		function xe(e) {
			!f.closeOnBack || e.target !== U.value || fe();
		}
		return S(() => {
			ie = !0, f.modelValue && ge();
		}), b(() => {
			ie = !1, se(), U.value && (ao(U.value), U.value.open && U.value.close());
		}), z(() => f.modelValue, (e) => {
			ie && (e ? ge() : ve());
		}), z(() => f.attach, () => {
			f.modelValue && k.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), B(() => {
			f.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (e, r) => (w(), o(t, null, [q.value ? (w(), o("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: E,
			class: "mat-dialog__activator"
		}, [j(e.$slots, "activator", {}, void 0, !0)], 512)) : a("", !0), k.value ? (w(), i(n, {
			key: 1,
			to: M.value
		}, [u(hr, h({
			ref_key: "surface",
			ref: D
		}, e.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${A.value}`, {
				"mat-dialog--app-root": W.value,
				"mat-dialog--full-screen": I(f).fullScreen,
				"mat-dialog--with-icon": K.value,
				"mat-dialog--top": J.value,
				"mat-dialog--transparent-scrim": !I(f).scrim
			}]],
			style: ne.value,
			"aria-labelledby": e.$attrs["aria-labelledby"] ?? (G.value ? H : void 0),
			"aria-modal": "true",
			tabindex: "-1",
			onCancel: ye,
			onClick: xe,
			onKeydown: be
		}), {
			default: V(() => [s("div", {
				class: "mat-dialog__panel",
				style: v(re.value)
			}, [I(f).fullScreen ? (w(), o(t, { key: 0 }, [s("header", lo, [
				u(On, {
					class: "mat-dialog__close",
					icon: "close",
					label: I(f).closeLabel,
					size: "small",
					variant: "standard",
					onClick: fe
				}, null, 8, ["label"]),
				G.value ? (w(), o("h2", {
					key: 0,
					id: H,
					class: "mat-dialog__title mat-sys-typescale-title-large"
				}, [I(f).title === void 0 ? j(e.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).title), 1)], 64))])) : a("", !0),
				u(co),
				e.$slots.actions ? (w(), o("div", uo, [j(e.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			]), te.value ? (w(), o("div", fo, [I(f).content === void 0 ? j(e.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).content), 1)], 64))])) : a("", !0)], 64)) : (w(), o(t, { key: 1 }, [
				K.value ? (w(), i(dt, {
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
				te.value ? (w(), o("div", po, [I(f).content === void 0 ? j(e.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(I(f).content), 1)], 64))])) : a("", !0),
				e.$slots.actions ? (w(), o("div", mo, [j(e.$slots, "actions", {}, void 0, !0)])) : a("", !0)
			], 64))], 4)]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-a367da49"]]), go = ["aria-label"], _o = {
	key: 1,
	class: "mat-sheet__header"
}, vo = {
	key: 1,
	class: "mat-sheet__header-actions"
}, yo = {
	key: 2,
	class: "mat-sheet__content mat-sys-typescale-body-medium"
}, bo = {
	key: 3,
	class: "mat-sheet__footer"
}, xo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let f = e, m = c, y = L(), x = R(), C = d(), T = p(Dt, null), E = Object.prototype.hasOwnProperty.call(C?.vnode.props ?? {}, "attach"), D = O(null), k = O(null), A = O(null), M = O(!1), N = O("closed"), I = O(null), B = P(null), H = O(typeof window > "u" ? 0 : window.innerWidth), U = 0, G = O(!1), te = `${ee().replace(/[^\w-]/g, "-")}-title`, K = r(() => k.value?.root ?? k.value?.$el ?? null), q = r(() => !!B.value), J = r(() => X.value ? A.value : K.value), Y = r(() => f.variant === "auto" ? H.value < Ct(f.breakpoint, {
			positive: !0,
			fallback: 840
		}) ? "modal" : "standard" : f.variant), X = r(() => Y.value === "modal"), ne = r(() => X.value && Ha.value.at(-1) === K.value), re = r(() => !!x.activator), ie = r(() => f.title !== void 0 || !!x.title), ae = r(() => f.content !== void 0 || !!x.default), Z = r(() => f.closable), oe = r(() => [
			`mat-sheet__panel--${f.direction}`,
			`mat-sheet__panel--position-${f.position}`,
			{
				"mat-sheet__panel--expanded": f.direction === "bottom" && f.expanded,
				"mat-sheet__panel--dragging": G.value
			}
		]), se = r(() => f.expanded ? X.value ? f.expandedDragHandleLabel : f.collapseDragHandleLabel : f.dragHandleLabel), ce = r(() => ie.value || Z.value || !!x.header || !!x.actions), le = r(() => X.value ? "dialog" : "aside"), ue = r(() => {
			if (f.width !== void 0) return _t(f.width, {
				property: "inline-size",
				positive: !0
			});
		}), de = r(() => {
			if (ue.value) return { "--mat-sheet-preferred-width": ue.value };
		}), fe = r(() => f.direction === "side" && X.value && !q.value && f.position === "end" ? { "--mat-sheet-modal-end-offset": `${-Ua.value}px` } : {}), pe = r(() => [y.style]), me = r(() => [de.value, fe.value]), he = !1, ge = Et(), _e = null, ve = !1, ye = null, be = 0, xe = 0, Se = 0, Ce = 0, we = !1;
		so(K, r(() => X.value && M.value && ne.value));
		function Te() {
			ge.cancel();
		}
		function Q(e, t) {
			ge.wait(K.value, e, t);
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
				let t = e ? jt(e) : null;
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
			if (U = e, K.value?.style.setProperty("--mat-sheet-drag-offset", `${e}px`), t === null) {
				K.value?.style.removeProperty("--mat-sheet-drag-size");
				return;
			}
			K.value?.style.setProperty("--mat-sheet-drag-size", `${t}px`);
		}
		function Me() {
			je(0, null);
		}
		function Ne() {
			if (we) {
				we = !1;
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
		function Re() {
			let e = K.value;
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
		function ze() {
			let e = K.value;
			if (e instanceof HTMLDialogElement) {
				if (e.open || e.show(), q.value) {
					let t = B.value;
					if (!t) return;
					io(e, ke(t.context));
				} else io(e);
				Re();
			}
		}
		async function Be() {
			if (Te(), M.value) {
				N.value = "opening", Q(400, () => {
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
				B.value = n, I.value = r, _e = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			} else B.value = null;
			ve = X.value, M.value = !0, N.value = "opening", Ie(), await g(), !(!f.modelValue || !K.value) && (X.value && ze(), Q(400, () => {
				N.value = "open", m("opened");
			}));
		}
		function Ve() {
			ve && _e?.isConnected && _e.focus({ preventScroll: !0 }), _e = null, ve = !1;
		}
		function He() {
			let e = K.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), ao(e)), B.value = null, M.value = !1, N.value = "closed", Me(), g(() => {
				Ve(), m("closed");
			});
		}
		async function Ue() {
			M.value && (N.value = "closing", await g(), !(f.modelValue || N.value !== "closing" || !K.value) && Q(200, He));
		}
		function We(e) {
			e.preventDefault(), Ae();
		}
		function Ge(e) {
			e.key === "Escape" && (e.preventDefault(), Ae());
		}
		function Ke(e) {
			!X.value || !f.closeOnBack || e.target !== K.value || Ae();
		}
		function qe(e) {
			if (e.pointerId === ye) {
				if (f.direction === "bottom") {
					if (Ce = e.clientY - be, !f.expanded && Ce < 0 || f.expanded && Ce > 0) {
						je(0, Math.max(0, xe - Ce));
						return;
					}
					je(Math.max(0, Ce), xe);
					return;
				}
				je(f.position === "start" ? Math.max(0, be - e.clientX) : Math.max(0, e.clientX - be), null);
			}
		}
		let Je = Ai(qe);
		function Ye(e) {
			e.pointerId === ye && Je.schedule(e);
		}
		function Xe() {
			ye = null, G.value = !1, window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", Qe);
		}
		function Ze(e) {
			if (e.pointerId !== ye) return;
			Je.flush();
			let t = J.value, n = f.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - Se), i = f.direction === "bottom" ? Math.abs(Ce) : U, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (we = i >= 4, Xe(), f.direction === "bottom" && o) {
				if (!f.expanded && Ce < 0) {
					Me(), m("update:expanded", !0);
					return;
				}
				if (f.expanded && Ce > 0) {
					Me(), m("update:expanded", !1);
					return;
				}
				if (!f.expanded && Ce > 0) {
					je(U, null), Ae();
					return;
				}
			}
			if (f.direction === "side" && o) {
				Ae();
				return;
			}
			Me();
		}
		function Qe() {
			Je.cancel(), Xe(), Me();
		}
		function $e(e) {
			!f.draggable || e.button !== 0 || ye !== null || (Je.cancel(), ye = e.pointerId, be = f.direction === "bottom" ? e.clientY : e.clientX, xe = f.direction === "bottom" ? J.value?.getBoundingClientRect().height ?? 0 : J.value?.getBoundingClientRect().width ?? 0, Se = performance.now(), Ce = 0, je(0, f.direction === "bottom" ? xe : null), G.value = !0, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", Qe));
		}
		function et(e) {
			f.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || $e(e);
		}
		function tt(e) {
			X.value || et(e);
		}
		function nt(e) {
			X.value && et(e);
		}
		function rt() {
			H.value = window.innerWidth;
		}
		async function it(e, t) {
			if (!M.value || !f.modelValue || e === t) return;
			Te();
			let n = K.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), ao(n), Ve(), B.value = null), e === "modal") {
				let e = De(), t = Oe(e), n = t ? t.target : e;
				if (!n) {
					Le(), Ae();
					return;
				}
				B.value = t, I.value = n, _e = document.activeElement instanceof HTMLElement ? document.activeElement : null, ve = !0, Ie();
			}
			N.value = "open", await g(), e === "modal" && f.modelValue && ze();
		}
		return S(() => {
			he = !0, rt(), window.addEventListener("resize", rt), f.modelValue && Be();
		}), b(() => {
			Je.cancel(), he = !1, Te(), Xe(), window.removeEventListener("resize", rt);
			let e = K.value;
			e instanceof HTMLDialogElement && (ao(e), e.open && e.close());
		}), z(() => f.modelValue, (e) => {
			he && (e ? Be() : Ue());
		}), z(Y, it), z(() => f.attach, () => {
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
		}, [u(hr, h({
			ref_key: "surface",
			ref: k
		}, r.$attrs, {
			as: le.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${Y.value}`,
				`mat-sheet--${N.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--app-root": q.value,
					"mat-sheet--dragging": G.value,
					"mat-sheet--expanded": e.direction === "bottom" && e.expanded,
					"mat-sheet--top": ne.value,
					"mat-sheet--transparent-scrim": !e.scrim
				}
			]],
			style: pe.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (ie.value ? te : void 0),
			"aria-modal": X.value ? "true" : void 0,
			tabindex: X.value ? -1 : void 0,
			onCancel: We,
			onClick: Ke,
			onKeydown: Ge,
			onPointerdown: tt
		}), {
			default: V(() => [s("div", {
				ref_key: "panelElement",
				ref: A,
				class: _(["mat-sheet__panel", oe.value]),
				style: v(me.value),
				onPointerdown: nt
			}, [
				e.direction === "bottom" && e.dragHandle ? (w(), o("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": se.value,
					onClick: Ne,
					onKeydown: Pe,
					onPointerdown: W($e, ["stop"])
				}, [j(r.$slots, "drag-handle", {}, () => [c[0] ||= s("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, go)) : a("", !0),
				ce.value ? (w(), o("header", _o, [j(r.$slots, "header", {}, () => [
					ie.value ? (w(), o("h2", {
						key: 0,
						id: te,
						class: "mat-sheet__title mat-sys-typescale-title-large"
					}, [e.title === void 0 ? j(r.$slots, "title", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.title), 1)], 64))])) : a("", !0),
					r.$slots.actions ? (w(), o("div", vo, [j(r.$slots, "actions", {}, void 0, !0)])) : a("", !0),
					Z.value ? (w(), i(On, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: Ae
					}, null, 8, ["label"])) : a("", !0)
				], !0)])) : a("", !0),
				ae.value ? (w(), o("div", yo, [e.content === void 0 ? j(r.$slots, "default", { key: 1 }, void 0, !0) : (w(), o(t, { key: 0 }, [l(F(e.content), 1)], 64))])) : a("", !0),
				r.$slots.footer ? (w(), o("div", bo, [j(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
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
}), [["__scopeId", "data-v-4887881e"]]), So = /*@__PURE__*/ Object.assign({
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
			validator: (e) => gt(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => gt(e, {
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
		return (e, t) => (w(), i(xo, h({
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
}), Co = /*@__PURE__*/ Object.assign({
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
			validator: (e) => gt(e, {
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
			validator: (e) => gt(e, {
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
		return (e, t) => (w(), i(xo, h({
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
}), wo = { class: "mat-container__content" }, To = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		return (e, n) => (w(), o("div", h(e.$attrs, { class: ["mat-container", { "mat-container--fluid": I(t).fluid }] }), [s("div", wo, [j(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-79014db2"]]), Eo = ["aria-valuemax", "aria-valuenow"], Do = ["width", "height"], Oo = { key: 0 }, ko = ["width", "height"], Ao = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, jo = ["d"], Mo = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, No = ["d"], Po = ["d", "mask"], Fo = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, Io = ["d"], Lo = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, Ro = ["d"], zo = ["d"], Bo = {
	key: 1,
	class: "mat-loader__linear-stop"
}, Vo = ["viewBox"], Ho = { class: "mat-loader__circular-linear-rotate" }, Uo = { class: "mat-loader__circular-rotate-arc" }, Wo = [
	"cx",
	"cy",
	"r"
], Go = ["d"], Ko = 4, qo = 48, Jo = 24, Yo = 240, Xo = 4, Zo = 4.8, Qo = 3, $o = 40, es = 15, ts = 18, ns = 20.4, rs = 2, is = 4, as = .001, os = 100, ss = 300, cs = 900, ls = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		size: {
			type: [Number, String],
			default: 48,
			validator: (e) => gt(e, {
				allowUndefined: !1,
				allowNegative: !0
			})
		},
		thickness: {
			type: String,
			default: "default",
			validator(e) {
				return ["default", "heavy"].includes(e);
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
			validator: Be
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
				let t = (e - o) / $o * Math.PI * 2, n = a - Math.sin(t - i) * r;
				l.push(`L ${c(e)} ${c(n)}`);
			}
			let u = (s - o) / $o * Math.PI * 2, d = a - Math.sin(u - i) * r;
			return l.push(`L ${c(s)} ${c(d)}`), l.join(" ");
		}
		function d(e, t, n, r, i) {
			let a = Math.max(1, Math.round(Math.PI * 2 * t / i)), o = a * 12, s = [];
			for (let i = 0; i <= o; i += 1) {
				let l = i / o, u = l * Math.PI * 2, d = l * Math.PI * 2 * a, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = i === 0 ? "M" : "L";
				s.push(`${h} ${c(p)} ${c(m)}`);
			}
			return s.push("Z"), s.join(" ");
		}
		let f = $("loader", e), { colorStyle: p } = ct(r(() => f.color)), m = O(null), g = O(os), _ = O(+(f.shape === "wavy")), y = O(0), x = `mat-loader-linear-mask-${ee()}`, C, T, E, D = r(() => i(f.max) ? f.max : 1), k = r(() => f.variant === "circular"), A = r(() => f.shape === "wavy"), j = r(() => {
			let e = Ct(f.size, {
				allowNegative: !0,
				fallback: qo
			});
			return Math.min(Math.max(e, Jo), Yo);
		}), M = r(() => j.value / 12), N = r(() => M.value * 2), P = r(() => j.value / qo), F = r(() => 1.6 * P.value), L = r(() => es * P.value), R = r(() => rs * P.value), B = r(() => k.value ? f.thickness === "heavy" ? N.value : M.value : f.thickness === "heavy" ? Zo : Xo), V = r(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), D.value);
		}), H = r(() => Number((V.value / D.value * 100).toFixed(3))), U = r(() => B.value + Qo * 2 * _.value), W = r(() => Math.min(100, B.value / g.value * 100)), G = r(() => {
			let e = g.value - B.value;
			return e <= 0 ? 1 : g.value / e;
		}), te = r(() => H.value === 100 ? 100 : Math.min(100, Math.max(H.value, W.value + as))), K = r(() => u(g.value, U.value, B.value, 0, 0)), q = r(() => u(g.value, U.value, B.value, Qo * _.value, y.value)), J = r(() => j.value / 2), Y = r(() => (ts + (ns - ts) * _.value) * P.value), X = r(() => `0 0 ${j.value} ${j.value}`), ne = r(() => d(J.value, Y.value, F.value * _.value, y.value, L.value)), re = r(() => {
			let e = Math.PI * 2 * Y.value;
			return (Ko + B.value) / e * 100;
		}), ie = r(() => Math.min(12, re.value)), ae = r(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - H.value - re.value * 2).toFixed(3)), t = Number(Math.min(100, H.value + re.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${c(e)} ${c(100 - e)}`,
				strokeDashoffset: `-${c(t)}`
			};
		}), Z = r(() => f.indeterminate ? {} : { strokeDasharray: `${c(H.value === 0 ? as : H.value)} 200` }), oe = r(() => ({
			...p.value,
			"--mat-loader-circular-gap-progress": c(ie.value),
			"--mat-loader-circular-margin": `${R.value}px`,
			"--mat-loader-circular-radius": `${Y.value}px`,
			"--mat-loader-circular-size": `${j.value}px`,
			"--mat-loader-indicator-gap-size": `${Ko}px`,
			"--mat-loader-linear-cap-progress": c(W.value),
			"--mat-loader-linear-path-scale": c(G.value),
			"--mat-loader-linear-segment-end": c(te.value),
			"--mat-loader-linear-segment-end-position": `${c(te.value)}%`,
			"--mat-loader-linear-size": `${U.value}px`,
			"--mat-loader-progress": `${H.value}`,
			"--mat-loader-stop-indicator-size": `${is}px`,
			"--mat-loader-thickness": `${B.value}px`
		}));
		function se(e) {
			T = void 0;
			let t = E === void 0 ? 0 : Math.min(64, e - E), n = +!!A.value, r = n - _.value;
			if (E = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / ss);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (y.value += t / cs * Math.PI * 2, y.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? T = globalThis.requestAnimationFrame(se) : E = void 0;
		}
		function ce() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!A.value;
				return;
			}
			T === void 0 && (E = void 0, T = globalThis.requestAnimationFrame(se));
		}
		return z(A, ce), z(() => f.waveMotion, ce), S(() => {
			ce(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (C = new globalThis.ResizeObserver(([e]) => {
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
			style: oe.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": D.value,
			"aria-valuenow": I(f).indeterminate ? void 0 : V.value
		}), [k.value ? (w(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: X.value,
			"aria-hidden": "true"
		}, [s("g", Ho, [s("g", Uo, [s("circle", {
			class: "mat-loader__circular-track",
			cx: J.value,
			cy: J.value,
			r: Y.value,
			pathLength: "100",
			style: v(ae.value)
		}, null, 12, Wo), s("path", {
			class: "mat-loader__circular-active",
			d: ne.value,
			pathLength: "100",
			style: v(Z.value)
		}, null, 12, Go)])])], 8, Vo)) : (w(), o("span", {
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
				height: U.value
			}, [
				I(f).indeterminate ? (w(), o("defs", Oo, [s("mask", {
					id: x,
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: g.value,
					height: U.value
				}, [
					n[2] ||= s("rect", {
						width: "100%",
						height: "100%",
						fill: "white"
					}, null, -1),
					s("g", Ao, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: q.value,
						pathLength: "100"
					}, null, 8, jo)]),
					s("g", Mo, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: q.value,
						pathLength: "100"
					}, null, 8, No)])
				], 8, ko)])) : a("", !0),
				I(f).indeterminate ? (w(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: K.value,
					pathLength: "100",
					mask: `url(#${x})`
				}, null, 8, Po)) : a("", !0),
				I(f).indeterminate ? (w(), o(t, { key: 2 }, [s("g", Fo, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: q.value,
					pathLength: "100"
				}, null, 8, Io)]), s("g", Lo, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: q.value,
					pathLength: "100"
				}, null, 8, Ro)])], 64)) : (w(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: q.value,
					pathLength: "100"
				}, null, 8, zo))
			], 8, Do)),
			I(f).indeterminate ? a("", !0) : (w(), o("span", Bo))
		], 512))], 16, Eo));
	}
}), [["__scopeId", "data-v-2f7828dd"]]), us = Symbol("mat-snackbar-externally-managed"), ds = [], fs = null;
function ps() {
	fs || ds.length === 0 || (fs = ds.shift(), fs.activate());
}
function ms(e) {
	e === fs || ds.includes(e) || (ds.push(e), ps());
}
function hs(e) {
	let t = ds.indexOf(e);
	t !== -1 && ds.splice(t, 1);
}
function gs(e) {
	fs === e && (fs = null, ps());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var _s = { class: "mat-snackbar__text" }, vs = {
	key: 0,
	class: "mat-snackbar__controls"
}, ys = {
	key: 0,
	class: "mat-snackbar__action"
}, bs = {
	key: 1,
	class: "mat-snackbar__close"
}, xs = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let d = $("snackbar", e), f = c, m = R(), _ = p(Ae, ke), v = p(Dt, null), y = p(us, !1), x = O(!1), C = O("closed"), T = O(!1), E = r(() => !!m.default || typeof d.text == "string" && d.text.trim().length > 0), D = r(() => !!m.action || typeof d.actionText == "string" && d.actionText.trim().length > 0), k = r(() => !!m.close || d.closable), A = r(() => D.value || k.value), M = O(0), N = O(null), P = r(() => v ? v.snackbarLayer.value : document.body), L = r(() => typeof d.closeLabel == "string" && d.closeLabel.trim().length > 0 ? d.closeLabel : "关闭"), ee = !1, B, H = Et(), U = !1, W = null, G = r(() => ({ "--mat-snackbar-toolbar-clearance": `${M.value}px` }));
		function te() {
			M.value = cn();
		}
		let K = { activate: ce };
		function q() {
			B !== void 0 && (window.clearTimeout(B), B = void 0);
		}
		function J() {
			H.cancel();
		}
		function Y(e, t) {
			H.wait(N.value, e, t);
		}
		function X() {
			return Number.isFinite(d.duration) && d.duration >= 0 ? d.duration : 4e3;
		}
		function ne() {
			q();
			let e = X();
			e !== 0 && (B = window.setTimeout(() => {
				B = void 0, oe();
			}, e));
		}
		function re() {
			U || (U = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function ie() {
			x.value && (x.value = !1, C.value = "closed", f("closed"), y || gs(K));
		}
		function ae() {
			if (q(), !x.value) {
				y || hs(K);
				return;
			}
			C.value !== "closing" && (C.value = "closing", Y(200, ie));
		}
		function Z() {
			T.value || (T.value = !0, f("update:modelValue", !1));
		}
		function oe() {
			Z(), ae();
		}
		function se() {
			!x.value || C.value === "closing" || (oe(), f("action"));
		}
		async function ce() {
			if (!ee || !d.modelValue || T.value || !E.value) {
				E.value || (re(), Z()), y || gs(K);
				return;
			}
			q(), J(), x.value = !0, C.value = "opening", await g(), !(!ee || !x.value || C.value === "closing") && Y(400, () => {
				!x.value || C.value === "closing" || (C.value = "open", ne());
			});
		}
		function le() {
			if (T.value || !E.value) {
				E.value || (re(), oe());
				return;
			}
			if (y) {
				ce();
				return;
			}
			if (x.value && C.value === "closing") {
				ce();
				return;
			}
			ms(K);
		}
		return S(() => {
			ee = !0, v || (W = ln(te), te()), d.modelValue && le();
		}), b(() => {
			ee = !1, W?.(), W = null, q(), J(), y || (x.value ? gs(K) : hs(K));
		}), z(() => d.modelValue, (e) => {
			if (ee) {
				if (e) {
					T.value = !1, le();
					return;
				}
				T.value = !1, ae();
			}
		}), z(E, (e) => {
			if (ee) {
				if (!e) {
					oe();
					return;
				}
				U = !1, d.modelValue && !x.value && !T.value && le();
			}
		}), z(() => d.duration, () => {
			C.value === "open" && ne();
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
		}), [s("div", _s, [e.$slots.default ? j(e.$slots, "default", { key: 0 }, void 0, !0) : (w(), o(t, { key: 1 }, [l(F(I(d).text), 1)], 64))]), A.value ? (w(), o("div", vs, [D.value ? (w(), o("div", ys, [e.$slots.action ? j(e.$slots, "action", {
			key: 0,
			action: se
		}, void 0, !0) : (w(), i(Ee, {
			key: 1,
			class: "mat-snackbar__default-action mat-sys-typescale-label-large",
			"use-cursor": I(_).useCursor,
			onClick: se
		}, {
			default: V(() => [l(F(I(d).actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : a("", !0), k.value ? (w(), o("div", bs, [e.$slots.close ? j(e.$slots, "close", {
			key: 0,
			close: oe
		}, void 0, !0) : (w(), i(Ee, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": L.value,
			"use-cursor": I(_).useCursor,
			onClick: oe
		}, {
			default: V(() => [u(dt, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : a("", !0)])) : a("", !0)], 16)) : a("", !0)], 8, ["to"])) : a("", !0);
	}
}), [["__scopeId", "data-v-56f7af57"]]), Ss = ["aria-orientation"], Cs = { class: "mat-toolbar__surface" }, ws = { class: "mat-toolbar__content" }, Ts = 200, Es = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => gt(e, {
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
		let u = $("toolbar", e), f = L(), m = R(), _ = d(), y = p(Dt, null), x = _?.vnode.props ?? {}, C = Object.prototype.hasOwnProperty.call(x, "attach"), T = O(u.modelValue), E = O(u.modelValue ? "open" : "closed"), D = O(null), k = O(null), A = O({
			blockSize: 0,
			inlineSize: 0
		}), M = r(() => c.includes(u.variant) ? u.variant === "floating" ? "floating-bottom" : u.variant : "docked"), N = r(() => [
			"start",
			"center",
			"end"
		].includes(u.position) ? u.position : "center"), F = r(() => M.value.startsWith("floating")), ee = r(() => M.value === "floating-left" || M.value === "floating-right"), B = r(() => M.value === "docked" || M.value === "floating-bottom"), V = r(() => u.app && !!y && !C), H = r(() => {
			if (!u.app) return null;
			if (V.value) return F.value ? y.freeLayer.value : y.edgeLayer.value;
			if (typeof u.attach == "string") try {
				return document.querySelector(u.attach);
			} catch {
				return null;
			}
			return l(u.attach);
		}), U = r(() => {
			let e = _t(u.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), W = r(() => B.value ? U.value : "0px"), G = r(() => [f.style, {
			"--mat-toolbar-app-end-inset": `${q.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${q.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": W.value
		}]), te = r(() => ({
			blockSize: `${A.value.blockSize}px`,
			inlineSize: `${A.value.inlineSize}px`
		})), K = r(() => [
			`mat-toolbar--${M.value}`,
			`mat-toolbar--position-${N.value}`,
			{
				"mat-toolbar--app": u.app,
				"mat-toolbar--app-root": V.value,
				"mat-toolbar--vertical": ee.value,
				"mat-toolbar--vibrant": u.vibrant
			}
		]), q = P(null), J, Y, X = !1, ne = !1, re = Et(), ie = !1;
		function ae() {
			re.cancel();
		}
		function Z(e) {
			re.wait(D.value, Ts, e);
		}
		function oe() {
			ae(), T.value = !0, E.value = "opening", Z(() => {
				T.value && u.modelValue && (E.value = "open");
			});
		}
		function se() {
			if (ae(), !T.value) {
				E.value = "closed";
				return;
			}
			E.value = "closing", Z(() => {
				u.modelValue || (T.value = !1, E.value = "closed");
			});
		}
		function ce() {
			ie || !m.fab || F.value || (ie = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function le() {
			let e = D.value?.getBoundingClientRect();
			e && (A.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, J?.update(), q.value?.update());
		}
		function ue() {
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
			ne && (await g(), le());
		}
		function fe() {
			Y?.disconnect(), Y = void 0, X = !1, window.removeEventListener("resize", le), J?.unregister(), J = void 0, q.value?.unregister(), q.value = null;
		}
		async function pe() {
			if (await g(), ne) {
				if (!T.value || !D.value) {
					fe();
					return;
				}
				X || (X = !0, Y = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(le), Y?.observe(D.value), window.addEventListener("resize", le)), V.value ? (J?.unregister(), J = void 0, !F.value && !q.value && (q.value = y.publicContext.registerEdge({
					edge: "bottom",
					element: D.value
				})), F.value && q.value && (q.value.unregister(), q.value = null)) : (q.value?.unregister(), q.value = null, J ||= on(D.value, {
					getRect: ue,
					isBottom: () => B.value
				})), k.value && Y?.observe(k.value), le(), ce();
			}
		}
		S(() => {
			ne = !0, me(), ce(), pe();
		}), b(() => {
			ne = !1, ae(), fe();
		}), z(() => u.modelValue, (e) => {
			if (ne) {
				if (e) {
					oe();
					return;
				}
				se();
			}
		}), z(T, pe), z([
			M,
			N,
			U,
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
			style: v(te.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: H.value ?? "body",
			disabled: !e.app
		}, [T.value && (!e.app || H.value) ? (w(), o("div", h({
			key: 0,
			ref_key: "toolbarElement",
			ref: D
		}, r.$attrs, {
			class: ["mat-toolbar", [K.value, `mat-toolbar--${E.value}`]],
			style: G.value,
			role: "toolbar",
			"aria-orientation": ee.value ? "vertical" : void 0
		}), [s("div", Cs, [s("div", ws, [j(r.$slots, "default", {}, void 0, !0)])]), F.value && I(m).fab ? (w(), o("div", {
			key: 0,
			ref_key: "fabElement",
			ref: k,
			class: "mat-toolbar__fab"
		}, [j(r.$slots, "fab", {}, void 0, !0)], 512)) : a("", !0)], 16, Ss)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-526823c5"]]), Ds = Symbol("mat-panes"), Os = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], ks = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => Os.includes(e)
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
		function L(e) {
			return M(e) !== null;
		}
		function ee(e) {
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
		function te(e, t) {
			if (!f || f.pointerId !== t.pointerId) return;
			let n = M(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = C(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			c.value = U(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		let K = Ai(({ event: e, id: t }) => {
			te(t, e);
		});
		function q(e, t) {
			!f || f.pointerId !== t.pointerId || K.schedule({
				event: t,
				id: e
			});
		}
		function J(e, t, n) {
			if (!f || f.pointerId !== t.pointerId) return;
			n ? K.flush() : K.cancel();
			let r = M(e), i = f.changed, a = c.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				H(a);
				return;
			}
			c.value = null;
		}
		function Y(e, t) {
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
		function ae() {
			m = void 0;
			let e = re();
			ie(v, e) || (v = e, i("update:widths", e));
		}
		function Z(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(ae, e ? 0 : 100);
		}
		function oe() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				Z();
			}), p.disconnect(), a.value && p.observe(a.value), s.forEach((e) => {
				e.element.value && p.observe(e.element.value);
			}));
		}
		function se(e) {
			return e < 600 ? "compact" : e < 840 ? "medium" : e < 1200 ? "expanded" : e < 1600 ? "large" : "extra-large";
		}
		function ce(e = !1) {
			let t = se(globalThis.window === void 0 ? 0 : globalThis.window.innerWidth);
			(e || u.value !== t) && (u.value = t, i("update:breakpoint", t));
		}
		function le() {
			ce();
		}
		return T(Ds, {
			getHandleAttributes: R,
			getPaneStyle: F,
			hasBoundary: L,
			handleKeyDown: Y,
			handlePointerDown: G,
			handlePointerMove: q,
			isBoundaryActive: ee,
			isHandleVisible: I,
			registerPane: X,
			finishPointerInteraction: J
		}), z(() => s.map((e) => e.id), async () => {
			await g(), ne(), oe(), Z();
		}, {
			flush: "post",
			immediate: !0
		}), z(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), S(() => {
			ce(!0), oe(), Z(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", le);
		}), b(() => {
			K.cancel(), globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", le), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), _ !== void 0 && globalThis.clearTimeout(_);
		}), (e, t) => (w(), o("div", h({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [j(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-f74ccabf"]]), As = ["id"], js = {
	key: 0,
	class: "mat-pane__separator"
}, Ms = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], Ns = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = $("pane", e), i = p(Ds, null), c = O(null), l = r(() => n.resizeLabel), u, d = r(() => i?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = r(() => !!i?.hasBoundary(n.id)), m = r(() => !!i?.isHandleVisible(n.id)), g = r(() => i?.getHandleAttributes(n.id) ?? {}), v = r(() => !!i?.isBoundaryActive(n.id));
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
		}), [j(r.$slots, "default", {}, void 0, !0)], 16, As), f.value ? (w(), o("div", js, [m.value ? (w(), o("div", {
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
		}, null, 42, Ms)) : a("", !0)])) : a("", !0)], 64));
	}
}), [["__scopeId", "data-v-67055c0d"]]), Ps = Symbol("mat-navigation-rail"), Fs = ["aria-label"], Is = {
	key: 0,
	class: "mat-navigation-rail__header"
}, Ls = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, Rs = {
	key: 1,
	class: "mat-navigation-rail__content"
}, zs = {
	key: 2,
	class: "mat-navigation-rail__end"
}, Bs = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => gt(e, { property: "inline-size" })
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
			validator: (e) => gt(e, {
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
		let f = $("navigationRail", e), m = c, y = p(Ae, ke), x = d(), C = p(Dt, null), E = x?.vnode.props ?? {}, D = Object.prototype.hasOwnProperty.call(E, "attach"), k = r(() => f.orientation === "horizontal"), A = r(() => !k.value && f.layout === "modal"), M = r(() => !k.value && f.hideOnCollapse && !f.expanded), N = O(f.expanded), F = O(!M.value), L = r(() => N.value), ee = Et(), R = r(() => f.app && !!C && !D), B = r(() => {
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
			"mat-navigation-rail-host--expanded": L.value,
			"mat-navigation-rail-host--collapsed": !L.value,
			[`mat-navigation-rail-host--${f.position}`]: !0,
			"mat-navigation-rail-host--modal": A.value,
			"mat-navigation-rail-host--hidden": M.value,
			"mat-navigation-rail-host--app": f.app,
			"mat-navigation-rail-host--app-root": R.value
		})), G = r(() => ({
			"mat-navigation-rail--expanded": L.value,
			"mat-navigation-rail--collapsed": !L.value,
			"mat-navigation-rail--bar": k.value,
			"mat-navigation-rail--modal": A.value && L.value,
			"mat-navigation-rail--hidden": M.value,
			"mat-navigation-rail--collapsible-hidden": !F.value,
			"mat-navigation-rail--app": f.app,
			"mat-navigation-rail--app-root": R.value
		})), te = r(() => {
			let e = _t(f.width, { property: "inline-size" });
			if (e !== void 0) return { "--mat-navigation-rail-expanded-width": e };
		}), K = r(() => {
			if (!f.app || R.value) return "0px";
			let e = _t(f.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), q = r(() => [te.value, {
			"--mat-navigation-rail-app-end-inset": `${re.value?.insets.end ?? 0}px`,
			"--mat-navigation-rail-app-start-inset": `${re.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-bottom-placeholder": K.value
		}]), J = O(null), Y = O(null), X = O({
			blockSize: 0,
			inlineSize: 0
		}), ne = r(() => ({
			blockSize: `${X.value.blockSize}px`,
			inlineSize: `${X.value.inlineSize}px`
		})), re = P(null), ie;
		function ae() {
			let e = J.value?.getBoundingClientRect();
			e && (X.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, re.value?.update());
		}
		async function Z() {
			ie?.disconnect(), ie = void 0, re.value?.unregister(), re.value = null, await g(), !(!f.app || !J.value) && (ie = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ae), ie?.observe(J.value), R.value && (re.value = C.publicContext.registerEdge({
				edge: k.value ? "bottom" : f.position,
				element: J.value
			})), ae());
		}
		function oe() {
			f.app && !R.value && !B.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		async function se() {
			if (ee.cancel(), f.expanded || !M.value) {
				N.value = f.expanded, F.value = !0;
				return;
			}
			F.value = !0, await g(), M.value && ee.wait(J.value, 200, () => {
				M.value && (N.value = !1, F.value = !1);
			});
		}
		function ce(e) {
			return e !== void 0 && Object.is(f.modelValue, e);
		}
		function le(e) {
			e === void 0 || Object.is(f.modelValue, e) || m("update:modelValue", e);
		}
		function ue() {
			m("update:expanded", !f.expanded);
		}
		function de() {
			m("update:expanded", !1);
		}
		function fe(e) {
			e.key === "Escape" && A.value && f.expanded && de();
		}
		return T(Ps, {
			expanded: L,
			isSelected: ce,
			orientation: r(() => f.orientation),
			position: r(() => f.position),
			requestSelection: le,
			useCursor: y.useCursor
		}), S(() => {
			window.addEventListener("keydown", fe), oe(), Z();
		}), b(() => {
			ee.cancel(), window.removeEventListener("keydown", fe), ie?.disconnect(), re.value?.unregister();
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
			oe(), Z();
		}), z([
			() => f.expanded,
			() => f.hideOnCollapse,
			() => f.orientation
		], se), (e, r) => (w(), o(t, null, [I(f).app && B.value && I(f).placeholder ? (w(), o("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(ne.value),
			"aria-hidden": "true"
		}, null, 4)) : a("", !0), (w(), i(n, {
			to: B.value ?? "body",
			disabled: !I(f).app
		}, [!I(f).app || B.value ? (w(), o("div", {
			key: 0,
			ref_key: "hostElement",
			ref: J,
			class: _(["mat-navigation-rail-host", W.value]),
			style: v(q.value)
		}, [A.value && I(f).expanded ? (w(), o("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": I(f).closeLabel,
			onClick: de
		}, null, 8, Fs)) : a("", !0), s("nav", h({
			ref_key: "railElement",
			ref: Y
		}, e.$attrs, { class: ["mat-navigation-rail", G.value] }), [
			k.value ? a("", !0) : (w(), o("div", Is, [
				F.value ? j(e.$slots, "header", {
					key: 0,
					expanded: L.value
				}, void 0, !0) : a("", !0),
				I(f).collapsible ? (w(), i(Ee, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": I(f).expanded,
					"aria-label": U.value,
					"focus-ring": !1,
					"use-cursor": I(y).useCursor,
					onClick: ue
				}, {
					default: V(() => [u(dt, {
						icon: H.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : a("", !0),
				e.$slots.fab && F.value ? (w(), o("div", Ls, [j(e.$slots, "fab", { expanded: L.value }, void 0, !0)])) : a("", !0)
			])),
			F.value ? (w(), o("div", Rs, [s("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${I(f).alignment}`]) }, [j(e.$slots, "default", {
				expanded: L.value,
				orientation: I(f).orientation
			}, void 0, !0)], 2)])) : a("", !0),
			e.$slots.end && F.value && !k.value ? (w(), o("div", zs, [j(e.$slots, "end", { expanded: L.value }, void 0, !0)])) : a("", !0)
		], 16)], 6)) : a("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-869ca95c"]]), Vs = { class: "mat-navigation-rail-item__indicator" }, Hs = { class: "mat-navigation-rail-item__icon-wrap" }, Us = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = $("navigationRailItem", e), c = t, l = R(), u = p(Ae, ke), d = p(Ps, null), f = r(() => d?.expanded.value ?? !1), m = r(() => d?.orientation.value === "horizontal"), g = r(() => d?.position.value ?? "start"), v = r(() => f.value), y = r(() => d?.isSelected(n.value) ?? !1), b = r(() => !!(n.icon || l.icon)), x = r(() => En("label", f.value && !m.value ? "large" : "medium")), S = r(() => ({
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
		return (e, t) => (w(), i(Ee, h(e.$attrs, {
			class: ["mat-navigation-rail-item", S.value],
			"aria-current": y.value ? "page" : void 0,
			disabled: I(n).disabled,
			"focus-ring": !1,
			href: I(n).href,
			"use-cursor": I(u).useCursor,
			onClick: C
		}), {
			default: V(() => [s("span", Vs, [s("span", Hs, [I(l).icon ? j(e.$slots, "icon", {
				key: 0,
				selected: y.value
			}, void 0, !0) : b.value ? (w(), i(dt, {
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
}), [["__scopeId", "data-v-091eab71"]]), Ws = /* @__PURE__ */ new WeakMap();
function Gs(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function Ks(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = Gs(t.value), i = new IntersectionObserver((t, r) => {
		let i = Ws.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), Ws.delete(e));
	}, r);
	Ws.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function qs(e) {
	let t = Ws.get(e);
	t && (t.observer.unobserve(e), Ws.delete(e));
}
var Js = {
	mounted: Ks,
	updated(e, t) {
		Ws.has(e) && (qs(e), Ks(e, t));
	},
	unmounted: qs
}, Ys = ke, Xs = null;
function Zs(e, t) {
	Ys = e, Xs = t;
}
function Qs() {
	return Ys;
}
function $s() {
	return Xs;
}
//#endregion
//#region src/theme.js
var ec = "#20a6fc", tc = "(prefers-color-scheme: dark)";
function nc(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function rc(e) {
	if (!Ye.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function ic(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function ac(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function oc(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function sc(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? ec, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	nc(t), oc(n), rc(r), ic(i), ac(a);
	let o = O(t), s = O(tt(n)), c = O(r), l = O(i), u = O("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(tc)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = nt({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(Xe).forEach(([t, n]) => {
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
		nc(e), o.value = e, y(), g();
	}
	function x(e) {
		oc(e), s.value = tt(e), g();
	}
	function S(e) {
		rc(e), c.value = e, g();
	}
	function C(e) {
		ic(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(Xe).forEach((e) => {
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
var cc = [
	[
		"MatAppRoot",
		"mat-app-root",
		Mn
	],
	[
		"MatAppBar",
		"mat-app-bar",
		Wn
	],
	[
		"MatSearch",
		"mat-search",
		Jn
	],
	[
		"MatBtn",
		"mat-btn",
		On
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		Xn
	],
	[
		"MatFab",
		"mat-fab",
		rr
	],
	[
		"MatIcon",
		"mat-icon",
		dt
	],
	[
		"MatImage",
		"mat-image",
		ar
	],
	[
		"MatAvatar",
		"mat-avatar",
		cr
	],
	[
		"MatShape",
		"mat-shape",
		dr
	],
	[
		"MatText",
		"mat-text",
		fr
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		mr
	],
	[
		"MatCard",
		"mat-card",
		Sr
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		wr
	],
	[
		"MatCardContent",
		"mat-card-content",
		Er
	],
	[
		"MatCardActions",
		"mat-card-actions",
		Or
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		_r
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		xr
	],
	[
		"MatCardMedia",
		"mat-card-media",
		yr
	],
	[
		"MatList",
		"mat-list",
		Ir
	],
	[
		"MatListGroup",
		"mat-list-group",
		Yr
	],
	[
		"MatListItem",
		"mat-list-item",
		Kr
	],
	[
		"MatDivider",
		"mat-divider",
		ni
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		ci
	],
	[
		"MatBadge",
		"mat-badge",
		pi
	],
	[
		"MatChip",
		"mat-chip",
		vi
	],
	[
		"MatChipSet",
		"mat-chip-set",
		Ci
	],
	[
		"MatRadio",
		"mat-radio",
		Ti
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		Oi
	],
	[
		"MatSwitch",
		"mat-switch",
		ki
	],
	[
		"MatSlider",
		"mat-slider",
		aa
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		la
	],
	[
		"MatTextField",
		"mat-text-field",
		Ta
	],
	[
		"MatSelect",
		"mat-select",
		Ba
	],
	[
		"MatTextarea",
		"mat-textarea",
		Va
	],
	[
		"MatInputBase",
		"mat-input-base",
		Gn
	],
	[
		"MatMenu",
		"mat-menu",
		Da
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		Ma
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		Aa
	],
	[
		"MatDialog",
		"mat-dialog",
		ho
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		So
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		Co
	],
	[
		"MatHover",
		"mat-hover",
		wt
	],
	[
		"MatContainer",
		"mat-container",
		To
	],
	[
		"MatSpacer",
		"mat-spacer",
		co
	],
	[
		"MatScrollArea",
		"mat-scroll-area",
		xi
	],
	[
		"MatLoader",
		"mat-loader",
		ls
	],
	[
		"MatTooltip",
		"mat-tooltip",
		gn
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		xs
	],
	[
		"MatToolbar",
		"mat-toolbar",
		Es
	],
	[
		"MatPanes",
		"mat-panes",
		ks
	],
	[
		"MatPane",
		"mat-pane",
		Ns
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		Bs
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		Us
	]
], lc = new Map(cc.map(([e, , t]) => [je(e), t]));
function uc(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function dc(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? ke.iconClass;
}
function fc(e, t) {
	let n = e[t];
	if (n === void 0) return Oe[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function pc(e) {
	if (e === void 0) return Oe;
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi defaults.tooltip 必须是对象");
	return Object.freeze({
		openDelay: fc(e, "openDelay"),
		closeDelay: fc(e, "closeDelay"),
		skipDelayDuration: fc(e, "skipDelayDuration")
	});
}
function mc(e) {
	let t = Object.keys(e.props ?? {}), n = new Set(Object.keys(e.emits ?? {}).filter((e) => e.startsWith("update:")).map((e) => e.slice(7))), r = new Set(t.filter((e) => !n.has(e)));
	return e.name === "MatTooltip" && r.add("skipDelayDuration"), r;
}
function hc(e) {
	let t = e.defaults;
	if (t === void 0) return Object.freeze({ tooltip: Oe });
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi defaults 必须是对象");
	let n = { tooltip: pc(t.tooltip) };
	return Object.entries(t).forEach(([e, t]) => {
		if (e === "tooltip") return;
		let r = lc.get(e);
		if (!r) throw TypeError(`createMatUi defaults 未知组件键 ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError(`createMatUi defaults.${e} 必须是对象`);
		let i = mc(r), a = {};
		Object.entries(t).forEach(([t, n]) => {
			if (!i.has(t)) throw TypeError(`createMatUi defaults.${e}.${t} 不是可配置属性`);
			a[t] = n;
		}), n[e] = Object.freeze(a);
	}), Object.freeze(n);
}
function gc(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: dc(e),
		useCursor: uc(e, "useCursor"),
		defaults: hc(e)
	}), n = sc(e.theme);
	return {
		theme: n,
		install(e) {
			cc.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r);
			}), e.directive("intersection", Js), e.directive("state-layer", Te), e.provide(Ae, t), e.provide(at, n), Zs(t, n);
		}
	};
}
function _c() {
	let e = p(at, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mde-vue 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/components/mat-dialog/ImperativeDialogHost.vue
var vc = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, yc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		T(Ae, Qs());
		let s = $s();
		s && T(at, s);
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
		return (n, r) => (w(), i(ho, h({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: V(() => [u(co), (w(!0), o(t, null, A(e.options.actions, (t, n) => (w(), i(On, {
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
			default: V(() => [p.value ? (w(), o(t, { key: 0 }, [e.options.content ? (w(), o("p", vc, F(e.options.content), 1)) : a("", !0), u(Ta, {
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
}), [["__scopeId", "data-v-217b4d5a"]]), bc = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], xc = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], Sc = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function Cc(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function wc() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function Tc(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function Ec(e) {
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
function Dc(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !bc.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !Be(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function Oc(e) {
	if (Tc(e), xc.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), Sc.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !Be(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !Cc(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(Dc),
		attach: Ec(e.attach)
	};
	return [
		...xc,
		...Sc,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function kc(e, t) {
	try {
		wc();
		let n = Oc(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				k(f(yc, {
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
function Ac(e = {}) {
	return kc(e, void 0);
}
function jc(e = {}) {
	try {
		if (Tc(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return kc({
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
function Mc(e = {}) {
	try {
		Tc(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return kc({
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
function Nc(e = {}) {
	try {
		Tc(e);
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
		return kc({
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
var Pc = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		T(Ae, Qs()), T(us, !0);
		let n = $s();
		n && T(at, n);
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
		return (e, t) => (w(), i(xs, h({
			modelValue: a.value,
			"onUpdate:modelValue": t[0] ||= (e) => a.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), Fc = [
	"left",
	"center",
	"right"
], Ic = null;
function Lc() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function Rc(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function zc(e) {
	if (Rc(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !Fc.includes(e.position)) throw TypeError("snackbar position 无效");
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
function Bc() {
	return Ic?.isConnected ? Ic : (Ic = document.createElement("div"), Ic.dataset.matSnackbarHost = "", document.body.append(Ic), Ic);
}
function Vc() {
	!Ic || Ic.childNodes.length > 0 || (Ic.remove(), Ic = null);
}
function Hc(e) {
	try {
		Lc();
		let t = zc(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = Ic;
				t && k(null, t), e(), gs(i), Vc();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = Ic;
				t && k(null, t), n(e), gs(i), Vc();
			}
			i = { activate() {
				try {
					let e = Bc();
					k(f(Pc, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, ms(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var Uc = Hc;
//#endregion
export { Js as Intersection, Wn as MatAppBar, Mn as MatAppRoot, cr as MatAvatar, pi as MatBadge, So as MatBottomSheet, On as MatBtn, Xn as MatBtnGroup, Sr as MatCard, wr as MatCardActionArea, Or as MatCardActions, Er as MatCardContent, _r as MatCardHeadline, yr as MatCardMedia, xr as MatCardSubhead, ci as MatCheckbox, vi as MatChip, Ci as MatChipSet, To as MatContainer, ho as MatDialog, ni as MatDivider, rr as MatFab, wt as MatHover, dt as MatIcon, ar as MatImage, Gn as MatInputBase, Ir as MatList, Yr as MatListGroup, Kr as MatListItem, ls as MatLoader, Da as MatMenu, Ma as MatMenuGroup, Aa as MatMenuItem, Bs as MatNavigationRail, Us as MatNavigationRailItem, Ns as MatPane, ks as MatPanes, Ti as MatRadio, Oi as MatRadioGroup, la as MatRangeSlider, xi as MatScrollArea, Jn as MatSearch, Ba as MatSelect, dr as MatShape, Co as MatSideSheet, aa as MatSlider, xs as MatSnackbar, co as MatSpacer, mr as MatSplitBtn, ki as MatSwitch, fr as MatText, Ta as MatTextField, Va as MatTextarea, Es as MatToolbar, gn as MatTooltip, Te as StateLayer, jc as alert, Mc as confirm, gc as createMatUi, Ac as dialog, Nc as prompt, Hc as snackbar, Uc as toast, Mt as useMatApp, $ as useMatProps, _c as useMatTheme };
