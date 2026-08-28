import { Comment as e, Fragment as t, Teleport as n, cloneVNode as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createSlots as l, createTextVNode as u, createVNode as d, getCurrentInstance as f, h as p, inject as m, isVNode as h, mergeProps as g, nextTick as _, normalizeClass as v, normalizeStyle as y, onActivated as b, onBeforeUnmount as x, onDeactivated as S, onMounted as C, onUpdated as w, openBlock as T, provide as E, reactive as D, readonly as O, ref as k, render as A, renderList as j, renderSlot as M, resolveDynamicComponent as N, shallowReactive as P, shallowRef as F, toDisplayString as I, unref as L, useAttrs as R, useId as z, useSlots as B, watch as V, watchEffect as H, withCtx as U, withDirectives as W, withKeys as G, withModifiers as K } from "vue";
import { Hct as ee, SchemeExpressive as q, SchemeNeutral as J, SchemeTonalSpot as Y, SchemeVibrant as X, argbFromHex as Z, hexFromArgb as te } from "@material/material-color-utilities";
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
var ae = "currentcolor", oe = "data-mat-state-layer-host", se = 150, ce = /* @__PURE__ */ new Set([
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
]), le = /* @__PURE__ */ new Set(["color"]), ue = /* @__PURE__ */ new WeakMap(), de = 0;
function fe(e) {
	return e === void 0 || typeof e != "object" || !e || Array.isArray(e) ? {} : (Object.keys(e).forEach((e) => {
		le.has(e) || `${e}`;
	}), e);
}
function pe(e) {
	return e.color === void 0 || typeof e.color != "string" || !(typeof CSS > "u" || CSS.supports("color", e.color)) ? ae : e.color;
}
function me(e) {
	return e.matches(":disabled") || e.getAttribute("aria-disabled") === "true";
}
function he(e, t) {
	let n = e.getAttribute("role"), r = e.tagName === "BUTTON" || n === "button", i = e.tagName === "A" && e.hasAttribute("href") || n === "link";
	return r ? t === " " || t === "Enter" : i && t === "Enter";
}
function ge(e) {
	let t = ue.get(e);
	t?.releaseTimer !== void 0 && (globalThis.clearTimeout(t.releaseTimer), t.releaseTimer = void 0);
}
function _e(e) {
	let t = ue.get(e);
	t && (ge(e), t.activePointerId = void 0, t.activeKey = void 0, t.removeGlobalPointerListeners(), e.removeAttribute("data-mat-state-layer-pressed"));
}
function ve(e) {
	let t = ue.get(e);
	!t || me(e) || (ge(e), t.pressStartedAt = Date.now(), e.setAttribute("data-mat-state-layer-pressed", ""));
}
function ye(e) {
	let t = ue.get(e);
	!t || !e.hasAttribute("data-mat-state-layer-pressed") || (t.activePointerId = void 0, t.activeKey = void 0, t.removeGlobalPointerListeners(), ge(e), t.releaseTimer = globalThis.setTimeout(() => {
		e.removeAttribute("data-mat-state-layer-pressed"), t.releaseTimer = void 0;
	}, Math.max(0, se - (Date.now() - t.pressStartedAt))));
}
function be(e, t) {
	let n = ue.get(e);
	if (!n || t.button !== 0 || n.activePointerId !== void 0 || (ve(e), !e.hasAttribute("data-mat-state-layer-pressed"))) return;
	n.activePointerId = t.pointerId;
	let r = (t) => {
		t.pointerId === n.activePointerId && ye(e);
	};
	window.addEventListener("pointerup", r), window.addEventListener("pointercancel", r), n.removeGlobalPointerListeners = () => {
		window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", r), n.removeGlobalPointerListeners = () => {};
	};
}
function xe(e, t) {
	let n = ue.get(e);
	!n || t.repeat || n.activeKey !== void 0 || !he(e, t.key) || (ve(e), e.hasAttribute("data-mat-state-layer-pressed") && (n.activeKey = t.key));
}
function Se(e, t) {
	ue.get(e)?.activeKey === t.key && ye(e);
}
function Ce(e) {
	return !ce.has(e.tagName) && getComputedStyle(e).display !== "contents";
}
function we(e, t) {
	if (!Ce(e)) {
		`${e.tagName.toLowerCase()}`;
		return;
	}
	de += 1;
	let n = `--mat-state-layer-${de}`, r = document.createElement("span");
	r.className = "mat-state-layer", r.setAttribute("aria-hidden", "true"), r.style.setProperty("position-anchor", n), r.style.backgroundColor = pe(fe(t.value)), re(e, n), e.setAttribute(oe, ""), e.prepend(r);
	let i = {
		activeKey: void 0,
		activePointerId: void 0,
		anchorName: n,
		layer: r,
		observer: void 0,
		pressStartedAt: 0,
		releaseTimer: void 0,
		removeGlobalPointerListeners: () => {}
	}, a = (t) => be(e, t), o = (t) => xe(e, t), s = (t) => Se(e, t), c = () => ye(e), l = new MutationObserver(() => {
		me(e) && _e(e);
	});
	i.observer = l, ue.set(e, i), e.addEventListener("pointerdown", a), e.addEventListener("keydown", o), e.addEventListener("keyup", s), e.addEventListener("blur", c), e.addEventListener("lostpointercapture", c), l.observe(e, {
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
function Te(e) {
	let t = ue.get(e);
	t && (_e(e), t.removeEventListeners(), t.observer.disconnect(), t.layer.remove(), e.removeAttribute(oe), ie(e, t.anchorName), ue.delete(e));
}
var Ee = {
	mounted: we,
	updated(e, t) {
		let n = ue.get(e);
		n && (n.layer.style.backgroundColor = pe(fe(t.value)));
	},
	unmounted: Te
}, Q = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, De = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = e, o = n, s = i(() => r.href !== void 0), c = i(() => s.value ? "a" : r.as), l = i(() => c.value === "button"), u = k(null);
		function d(e) {
			if (r.disabled) {
				e.preventDefault(), e.stopImmediatePropagation();
				return;
			}
			o("click", e);
		}
		return t({ root: u }), (t, n) => W((T(), a(N(c.value), g({
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
			default: U(() => [M(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-disabled",
			"disabled",
			"href",
			"role",
			"tabindex",
			"type"
		])), [[L(Ee), { color: "var(--mat-action-state-color, currentcolor)" }]]);
	}
}), [["__scopeId", "data-v-8533911d"]]), Oe = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		return (t, r) => (T(), a(De, g(t.$attrs, {
			class: ["mat-button-base", {
				"mat-button-base--block": e.block,
				"mat-button-base--use-cursor": e.useCursor
			}],
			"aria-pressed": e.ariaPressed,
			disabled: e.disabled,
			type: e.type,
			onClick: r[0] ||= (e) => n("click", e)
		}), {
			default: U(() => [M(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-pressed",
			"disabled",
			"type"
		]));
	}
}), [["__scopeId", "data-v-12a32b0d"]]), ke = Object.freeze({
	openDelay: 0,
	closeDelay: 600
}), Ae = Object.freeze({
	iconClass: "material-symbols-outlined",
	useCursor: !1,
	defaults: Object.freeze({ tooltip: ke })
}), je = Symbol("mde-vue-options");
function Me(e) {
	return e.replace(/^Mat/, "").replace(/^./, (e) => e.toLowerCase());
}
//#endregion
//#region src/components/button-props.js
var Ne = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], Pe = ["round", "square"], Fe = [
	"button",
	"submit",
	"reset"
], Ie = [
	"primary",
	"secondary",
	"tertiary",
	"error"
], Le = [
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
], Re = {
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
}, ze = [
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
function Be(e) {
	return typeof e == "string" && ze.includes(e);
}
function Ve(e) {
	return e === void 0 || Ie.includes(e) || Le.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var He = Object.freeze({
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
}), Ue = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function We(e) {
	return typeof e == "string" && (Object.hasOwn(He, e) || Ue.test(e));
}
function Ge(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function Ke(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function qe(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function Je(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function Ye(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var Xe = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], Ze = {
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
}, Qe = {
	"tonal-spot": Y,
	neutral: J,
	vibrant: X,
	expressive: q
}, $e = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], et = 64, tt = /* @__PURE__ */ new Map();
function nt(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function rt({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = Qe[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(ee.fromInt(Z(nt(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function it(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, te(e[t])])));
}
function at(e, t = "tonal-spot", n = 0) {
	let r = nt(e), i = `${r}|${t}|${n}|2025|phone`, a = tt.get(i);
	if (a) return tt.delete(i), tt.set(i, a), a;
	let o = Object.freeze({
		light: it(rt({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), $e),
		dark: it(rt({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), $e)
	});
	if (tt.set(i, o), tt.size > et) {
		let e = tt.keys().next().value;
		tt.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var ot = Symbol("mde-vue-theme"), st = "tonal-spot", ct = 0;
function lt(e) {
	let t = m(ot, null), n = i(() => L(e) !== void 0);
	return {
		colorStyle: i(() => {
			let n = L(e);
			if (!n || !Ve(n) && !Be(n)) return {};
			if (Ie.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			if (Le.includes(n)) {
				let e = Re[n];
				return {
					"--mat-accent-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-color": `var(--mat-sys-color-${e})`,
					"--mat-accent-container-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-container-color": `var(--mat-sys-color-${e})`
				};
			}
			if (Be(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-${n})`
			};
			let r = at(n, t?.schemeVariant.value ?? st, t?.contrastLevel.value ?? ct);
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
var ut = Object.freeze({});
function dt(e) {
	return e.replace(/\B([A-Z])/g, "-$1").toLowerCase();
}
function $(e, t) {
	let n = f();
	if (!n) throw Error("useMatProps() 必须在组件 setup 中调用");
	let r = m(je, Ae).defaults?.[e] ?? ut, a = [.../* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(r)])], o = {};
	return a.forEach((e) => {
		o[e] = i(() => {
			let i = n.vnode.props ?? ut;
			return [e, dt(e)].some((e) => e in i && i[e] !== void 0) ? t[e] : r[e] ?? t[e];
		});
	}), D(o);
}
//#endregion
//#region src/components/mat-icon/MatIcon.vue
var ft = ["src"], pt = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: We
		},
		fill: {
			type: Number,
			default: 0,
			validator: Ke
		},
		weight: {
			type: Number,
			default: 400,
			validator: qe
		},
		grade: {
			type: Number,
			default: 0,
			validator: Je
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: Ye
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		fontColor: {
			type: String,
			default: void 0
		},
		as: {
			type: String,
			default: "i",
			validator: Ge
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = $("icon", e), r = m(je, Ae), { colorStyle: o, hasExplicitColor: c } = lt(i(() => n.color)), l = i(() => n.iconClass ?? r.iconClass), d = i(() => n.icon !== void 0), f = i(() => He[n.size]?.fontSize ?? n.size), p = i(() => n.opticalSize ?? He[n.size]?.opticalSize ?? 24), h = i(() => ({
			...o.value,
			"--mat-icon-size": f.value,
			display: "inline-flex",
			fontSize: f.value,
			color: n.fontColor ?? (c.value ? "var(--mat-accent-color)" : "currentColor"),
			fontVariationSettings: `'FILL' ${n.fill}, 'wght' ${n.weight}, 'GRAD' ${n.grade}, 'opsz' ${p.value}`
		}));
		return (e, r) => (T(), a(N(L(n).as), g(e.$attrs, {
			class: ["mat-icon", l.value],
			style: h.value
		}), {
			default: U(() => [L(n).src === void 0 ? d.value ? (T(), s(t, { key: 1 }, [u(I(L(n).icon), 1)], 64)) : M(e.$slots, "default", { key: 2 }, void 0, !0) : (T(), s("img", {
				key: 0,
				class: "mat-icon__image",
				src: L(n).src,
				alt: ""
			}, null, 8, ft))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-b3defc6b"]]), mt = /^-?\d+(\.\d+)?$/;
function ht(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : NaN;
	if (typeof e == "string") {
		let t = e.trim();
		return t && mt.test(t) ? Number(t) : NaN;
	}
	return NaN;
}
function gt(e, { positive: t = !1, max: n } = {}) {
	let r = ht(e);
	return !Number.isFinite(r) || (t ? r <= 0 : r < 0) ? !1 : n === void 0 || r <= n;
}
function _t(e, t) {
	if (typeof e != "string") return !1;
	let n = e.trim();
	return !n || /[;{}]/.test(n) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports(t, n);
}
function vt(e, { property: t, positive: n = !1, max: r, allowUndefined: i = !0, allowNegative: a = !1 } = {}) {
	if (e === void 0) return i;
	if (typeof e == "number" || typeof e == "string" && mt.test(e.trim())) {
		if (a) {
			let t = ht(e);
			return Number.isFinite(t) && (r === void 0 || t <= r);
		}
		return gt(e, {
			positive: n,
			max: r
		});
	}
	return typeof e != "string" || !t ? !1 : _t(e, t);
}
function yt(e, { property: t, positive: n = !1, max: r, fallback: i, allowNegative: a = !1 } = {}) {
	if (vt(e, {
		property: t,
		positive: n,
		max: r,
		allowUndefined: !1,
		allowNegative: a
	})) {
		let t = ht(e);
		return Number.isFinite(t) ? t === 0 ? "0" : `${t}px` : e.trim();
	}
	return i;
}
function bt(e, { property: t, positive: n = !1, fallback: r } = {}) {
	if (vt(e, {
		property: t,
		positive: n,
		allowUndefined: !1
	})) {
		let t = ht(e);
		return Number.isFinite(t) ? String(t) : e.trim();
	}
	return r;
}
function xt(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : typeof e == "number" || typeof e == "string" && mt.test(e.trim()) ? gt(e) : !e || Array.isArray(e) ? !1 : ["start", "end"].every((t) => e[t] === void 0 || gt(e[t]));
}
function St(e, t) {
	let n = ht(e);
	if (Number.isFinite(n)) return {
		start: n,
		end: n
	};
	function r(e) {
		let n = ht(e);
		return Number.isFinite(n) ? n : t;
	}
	return {
		start: r(e?.start ?? t),
		end: r(e?.end ?? t)
	};
}
function Ct(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : gt(e);
}
function wt(e, t = 0) {
	return gt(e) ? ht(e) : t;
}
function Tt(e, { positive: t = !1, fallback: n, allowNegative: r = !1 } = {}) {
	let i = ht(e);
	return !Number.isFinite(i) || (t ? i <= 0 : !r && i < 0) ? n : i;
}
//#endregion
//#region src/components/mat-hover/MatHover.vue
var Et = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Ct(e, { allowUndefined: !1 })
		},
		openDelay: {
			type: [Number, String],
			default: 0,
			validator: (e) => Ct(e, { allowUndefined: !1 })
		},
		target: {
			type: [String, Object],
			default: void 0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: t }) {
		let n = $("hover", e), r = t, a = B(), s = f()?.vnode.props ?? {}, c = Object.prototype.hasOwnProperty.call(s, "modelValue") || Object.prototype.hasOwnProperty.call(s, "model-value"), l = k(!1), u = k(null), d = F(null), p = i(() => c ? n.modelValue : u.value), m, h = null;
		function g() {
			m !== void 0 && (window.clearTimeout(m), m = void 0);
		}
		function _(e) {
			l.value = e, !n.disabled && (r("update:modelValue", e), !c && (u.value = e));
		}
		function v(e, t) {
			g();
			let n = wt(t, 0);
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
		function b() {
			v(!1, n.closeDelay);
		}
		function S(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? S(e.value) : "$el" in e ? S(e.$el) : null : null;
		}
		function T() {
			if (typeof n.target != "string") return S(n.target);
			try {
				return S(document.querySelector(n.target));
			} catch {
				return null;
			}
		}
		function E() {
			h &&= (h(), null);
		}
		function D() {
			let e = T();
			e !== d.value && (E(), d.value = e, e && (e.addEventListener("mouseenter", y), e.addEventListener("mouseleave", b), h = () => {
				e.removeEventListener("mouseenter", y), e.removeEventListener("mouseleave", b);
			}));
		}
		let O = {
			onMouseenter: y,
			onMouseleave: b
		};
		return V(() => n.disabled, (e, t) => {
			if (t && !e) {
				if (c) {
					r("update:modelValue", l.value);
					return;
				}
				u.value = l.value, r("update:modelValue", l.value);
			}
		}), V(T, D, { flush: "sync" }), C(D), w(D), x(() => {
			g(), E();
		}), (e, t) => L(a).default ? M(e.$slots, "default", {
			key: 0,
			isHovering: p.value,
			props: O
		}) : o("", !0);
	}
});
//#endregion
//#region src/components/motion-controller.js
function Dt() {
	return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
}
function Ot() {
	let e = 0, t;
	function n() {
		e += 1, t !== void 0 && (globalThis.clearTimeout(t), t = void 0);
	}
	function r(r, i, a) {
		n();
		let o = e;
		if (Dt()) {
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
var kt = Symbol("mat-app-root"), At = /* @__PURE__ */ new WeakMap();
function jt(e, t) {
	At.set(e, t);
}
function Mt(e) {
	At.delete(e);
}
function Nt(e) {
	return At.get(e) ?? null;
}
function Pt() {
	let e = m(kt, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var Ft = [
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
], It = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function Lt(e) {
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
function Rt(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function zt(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function Bt(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function Vt(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function Ht(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: Rt(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: zt(t, n, r)
	};
}
function Ut(e) {
	return [
		e,
		It[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== It[e])
	];
}
function Wt(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function Gt(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function Kt(e, t, n, r, i, a, o, s) {
	let c = Ht(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: Bt(c.left, a, l),
		top: Bt(c.top, a, u)
	}, f = Wt(d, r);
	return Gt(f, n) || s.some((e) => Gt(f, Lt(e))) ? null : d;
}
function qt({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = Lt(i), c = Lt(a), [l, u = "center"] = (Ft.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = Vt(l, s, o, r, t), m = It[l], h = Vt(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = Ut(g), b = e.map((e) => Lt(e)), x = y.find((e) => Vt(e, s, o, r, t) >= f && Kt(e, d, s, c, o, r, t, b)) ?? y.find((e) => Kt(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = Ht(x, d, s, c, t);
	return {
		left: Math.round(Bt(C.left, r, _)),
		location: S,
		top: Math.round(Bt(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var Jt = null, Yt = "pointer";
typeof window < "u" && (window.addEventListener("keydown", () => {
	Yt = "keyboard";
}, !0), window.addEventListener("pointerdown", () => {
	Yt = "pointer";
}, !0));
function Xt() {
	return Yt === "keyboard";
}
function Zt(e) {
	Jt && Jt !== e && Jt.close(), Jt = e;
}
function Qt(e) {
	Jt === e && (Jt = null);
}
function $t() {
	return Jt !== null;
}
//#endregion
//#region src/components/toolbar-overlay.js
var en = /* @__PURE__ */ new Map(), tn = /* @__PURE__ */ new Set(), nn = 0;
function rn(e) {
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
function an() {
	tn.forEach((e) => e());
}
function on() {
	en.forEach((e, t) => {
		e.element.isConnected || en.delete(t);
	});
}
function sn(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = nn;
	nn += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return en.set(n, r), an(), {
		unregister() {
			i && (i = !1, en.delete(n), an());
		},
		update() {
			i && an();
		}
	};
}
function cn() {
	return on(), [...en.values()].flatMap((e) => {
		try {
			return [rn(e.getRect())];
		} catch {
			return [];
		}
	});
}
function ln(e = window.innerHeight) {
	on();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...en.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - rn(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function un(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return tn.add(e), e(), () => {
		tn.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var dn = ["id", "data-location"], fn = {
	key: 0,
	class: "mat-tooltip__subhead mat-sys-typescale-title-small"
}, pn = { class: "mat-tooltip__content mat-sys-typescale-body-medium" }, mn = {
	key: 1,
	class: "mat-tooltip__actions"
}, hn = 600, gn = 150, _n = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Ft.includes(e);
			}
		},
		openDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Ct(e)
		},
		closeDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Ct(e)
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: r }) {
		let l = e, d = r, p = $("tooltip", l), h = R(), v = B(), y = f(), E = m(kt, null), D = k(null), O = F(null), A = { value: O }, j = F(null), N = k(!1), P = k(null), H = k(!1), U = k(!1), W = k(!1), G = k("closed"), K = k("top"), ee = k({}), q = k(!1), J = `${z().replace(/[^\w-]/g, "-")}-tooltip`, Y = i(() => typeof h.id == "string" ? h.id : J), X = i(() => p.content === void 0 ? !!v.default : p.content.length > 0), Z = i(() => p.subhead === void 0 ? !!v.subhead : p.subhead.length > 0), te = i(() => p.rich || Z.value || !!v.action), ne = i(() => !!v.activator), re = y?.vnode.props ?? {}, ie = Object.prototype.hasOwnProperty.call(re, "modelValue") || Object.prototype.hasOwnProperty.call(re, "model-value"), ae, oe, se = Ot(), ce, le = !1, ue, de, fe = null, pe = null, me = null, he = null, ge = null, _e = !1, ve = !0, ye = !1, be = !1, xe = !1, Se = { close: Ye };
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
			return typeof p.target == "string" ? we(p.target) : Ce(p.target);
		}
		function Ee() {
			let e = D.value ? [...D.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function Q() {
			return ne.value ? Ee() : Te();
		}
		function De() {
			return Oe() ? typeof p.attach == "string" ? we(p.attach) : Ce(p.attach) : je() || (E?.rootElement.value?.contains(O.value) && E.freeLayer.value ? E.freeLayer.value : document.body);
		}
		function Oe() {
			let e = y?.vnode.props ?? {};
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
			let e = O.value;
			for (; e;) {
				if (Ae(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function Me() {
			let e = p.openDelay;
			return wt(e, 0);
		}
		function Ne() {
			let e = p.closeDelay;
			return wt(e, hn);
		}
		function Pe() {
			oe !== void 0 && (window.clearTimeout(oe), oe = void 0);
		}
		function Fe() {
			ae !== void 0 && (window.clearTimeout(ae), ae = void 0);
		}
		function Ie() {
			se.cancel();
		}
		function Le() {
			ue !== void 0 && (window.cancelAnimationFrame(ue), ue = void 0);
		}
		function Re() {
			Le(), U.value && (ue = window.requestAnimationFrame(() => {
				if (ue = void 0, U.value) {
					if (O.value && !O.value.isConnected) {
						Je({ immediate: !0 });
						return;
					}
					Re();
				}
			}));
		}
		function ze(e, t) {
			se.wait(P.value, e, t);
		}
		function Be() {
			ce !== void 0 && (le ? window.cancelAnimationFrame(ce) : window.clearTimeout(ce), ce = void 0, le = !1);
		}
		function Ve() {
			he && (ge === null ? he.removeAttribute("aria-describedby") : he.setAttribute("aria-describedby", ge), he = null, ge = null);
		}
		function He() {
			let e = O.value;
			if (!U.value || !e || he === e) return;
			Ve(), he = e, ge = e.getAttribute("aria-describedby");
			let t = (ge ?? "").split(/\s+/).filter(Boolean);
			t.includes(Y.value) || t.push(Y.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function Ue() {
			Be(), de?.disconnect(), de = void 0, pe &&= (pe(), null), me &&= (me(), null);
		}
		function We() {
			if (!U.value || !O.value || !P.value) return;
			let e = N.value ? E.getLayoutRect() : null, t = O.value.getBoundingClientRect(), n = e ? {
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
			] : cn(), a = qt({
				location: p.location,
				targetRect: n,
				tooltipRect: P.value.getBoundingClientRect(),
				avoidRects: i,
				viewport: e ? {
					height: r.size.height,
					width: r.size.width
				} : {
					height: window.innerHeight,
					width: window.innerWidth
				}
			});
			K.value = a.location, ee.value = {
				left: `${a.left}px`,
				top: `${a.top}px`
			}, W.value = !0;
		}
		function Ge() {
			if (!U.value || ce !== void 0) return;
			let e = () => {
				ce = void 0, le = !1, We();
			};
			if (typeof window.requestAnimationFrame == "function") {
				le = !0, ce = window.requestAnimationFrame(e);
				return;
			}
			ce = window.setTimeout(e, 0);
		}
		function Ke() {
			pe || (window.addEventListener("resize", Ge), document.addEventListener("scroll", Ge, !0), pe = () => {
				window.removeEventListener("resize", Ge), document.removeEventListener("scroll", Ge, !0);
			}, me = un(Ge), typeof ResizeObserver < "u" && (de = new ResizeObserver(Ge), de.observe(O.value), de.observe(P.value)));
		}
		function qe() {
			H.value = !1, G.value = "closed", U.value = !1, W.value = !1, j.value = null, N.value = !1;
		}
		function Je({ immediate: e = !1 } = {}) {
			if (Pe(), Fe(), Le(), Ue(), Ve(), Qt(Se), !H.value) {
				qe();
				return;
			}
			if (!(!e && G.value === "closing")) {
				if (e) {
					Ie(), qe();
					return;
				}
				U.value = !1, G.value = "closing", ze(gn, qe);
			}
		}
		function Ye() {
			ie && (q.value = !0, d("update:modelValue", !1)), Je();
		}
		function Xe() {
			xe || (xe = !0, console.warn(ne.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function Ze({ warn: e = !0 } = {}) {
			let t = Q();
			if (!t && U.value && Je({ immediate: !0 }), t === O.value) {
				!t && X.value && e && Xe();
				return;
			}
			let n = O.value !== null;
			Ve(), ct(), O.value = t, xe = !1, !t && X.value && e && Xe(), lt(), n && U.value && Ye();
		}
		function Qe() {
			if (Fe(), ie || U.value || q.value || !X.value) return;
			let e = $t() ? 0 : Me();
			if (e === 0) {
				ut();
				return;
			}
			oe === void 0 && (oe = window.setTimeout(() => {
				oe = void 0, ut();
			}, e));
		}
		function $e() {
			Pe(), !(ie || !U.value || ye || be) && ae === void 0 && (ae = window.setTimeout(() => {
				ae = void 0, Ye();
			}, Ne()));
		}
		function et() {
			if (ye || be) {
				Qe();
				return;
			}
			$e();
		}
		function tt(e) {
			ye = e, et();
		}
		function nt() {
			Xt() && (be = !0, et());
		}
		function rt(e) {
			O.value?.contains(e.relatedTarget) || te.value && P.value?.contains(e.relatedTarget) || (be = !1, et());
		}
		function it() {
			te.value && (ye = !0, et());
		}
		function at() {
			te.value && (ye = !1, et());
		}
		function ot() {
			te.value && (be = !0, et());
		}
		function st(e) {
			e.key === "Escape" && (e.preventDefault(), Ye());
		}
		function ct() {
			fe && (fe(), fe = null, ye = !1, be = !1);
		}
		function lt() {
			let e = O.value;
			e && (e.addEventListener("keydown", st), !ie && X.value && (e.addEventListener("focusin", nt), e.addEventListener("focusout", rt)), fe = () => {
				e.removeEventListener("keydown", st), e.removeEventListener("focusin", nt), e.removeEventListener("focusout", rt);
			});
		}
		async function ut() {
			if (!_e || !ve || q.value || !X.value) return;
			if (Ze({ warn: !0 }), !O.value) {
				Ye();
				return;
			}
			let e = De();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Ye();
				return;
			}
			Pe(), Fe(), Ie(), Zt(Se), j.value = e, N.value = e === E?.freeLayer.value, K.value = p.location, ee.value = {
				left: "0px",
				top: "0px"
			}, W.value = !1, G.value = "opening", H.value = !0, U.value = !0, await _(), !(!_e || !ve || !U.value) && (He(), We(), Ke(), Re());
		}
		return C(async () => {
			_e = !0, Ze({ warn: !1 }), await _(), _e && (Ze({ warn: !1 }), ie && p.modelValue && ut());
		}), w(() => {
			Ze({ warn: !1 }), U.value && Ge();
		}), b(() => {
			ve || (ve = !0, Ze({ warn: !1 }), ie && p.modelValue && ut());
		}), S(() => {
			ve = !1, Ie(), Le(), ct(), Je({ immediate: !0 });
		}), x(() => {
			_e = !1, Ie(), Le(), ct(), U.value && Je({ immediate: !0 });
		}), V(() => p.modelValue, (e) => {
			if (!(!_e || !ve || !ie)) {
				if (e) {
					q.value = !1, ut();
					return;
				}
				q.value = !1, Je();
			}
		}), V([() => p.content, () => p.target], async () => {
			await _();
			let e = O.value;
			Ze({ warn: !1 }), O.value === e && (ct(), lt()), X.value || Ye();
		}), V(() => p.attach, async () => {
			if (!U.value) return;
			let e = De();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Ye();
				return;
			}
			j.value = e, N.value = e === E?.freeLayer.value, await _(), Ge();
		}), V(() => p.location, () => {
			U.value && Ge();
		}), V(Y, () => {
			!U.value || !he || (Ve(), He());
		}), E && V(E.publicContext.layout, Ge), (r, i) => (T(), s(t, null, [
			!L(ie) && X.value ? (T(), a(Et, {
				key: 0,
				target: A,
				"onUpdate:modelValue": tt
			})) : o("", !0),
			ne.value || !e.target ? (T(), s("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: D,
				class: "mat-tooltip__activator"
			}, [M(r.$slots, "activator", {}, void 0, !0)], 512)) : o("", !0),
			H.value && j.value ? (T(), a(n, {
				key: 2,
				to: j.value
			}, [c("span", g(r.$attrs, {
				id: Y.value,
				ref_key: "tooltipElement",
				ref: P,
				class: ["mat-tooltip mat-sys-typescale-label-large", [`mat-tooltip--${G.value}`, {
					"mat-tooltip--app-root": N.value,
					"mat-tooltip--positioned": W.value,
					"mat-tooltip--rich": te.value
				}]],
				"data-location": K.value,
				style: [ee.value, r.$attrs.style],
				role: "tooltip",
				onFocusin: ot,
				onFocusout: rt,
				onMouseenter: it,
				onMouseleave: at
			}), [te.value ? (T(), s(t, { key: 0 }, [
				Z.value ? (T(), s("span", fn, [L(p).subhead === void 0 ? M(r.$slots, "subhead", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(p).subhead), 1)], 64))])) : o("", !0),
				c("span", pn, [L(p).content === void 0 ? M(r.$slots, "default", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(p).content), 1)], 64))]),
				r.$slots.action ? (T(), s("span", mn, [M(r.$slots, "action", {}, void 0, !0)])) : o("", !0)
			], 64)) : L(p).content === void 0 ? M(r.$slots, "default", { key: 2 }, void 0, !0) : (T(), s(t, { key: 1 }, [u(I(L(p).content), 1)], 64))], 16, dn)], 8, ["to"])) : o("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-51edc383"]]), vn = Symbol("mde-vue-button-group"), yn = Symbol("mde-vue-split-button");
//#endregion
//#region src/components/use-button.js
function bn(e, t) {
	let n = m(je, Ae), r = m(vn, null), a = m(yn, null), o = i(() => a?.size.value ?? e.size ?? r?.size.value ?? "small"), s = i(() => a ? "round" : e.shape ?? r?.shape.value ?? "round"), c = i(() => a?.variant.value ?? e.variant), l = i(() => a?.color.value ?? e.color ?? r?.color.value), u = i(() => e.disabled || !!a?.disabled.value || !!r?.disabled.value), d = i(() => !!(r && r.selection.value !== "none")), f = i(() => a?.role === "trailing" ? a.expanded.value : d.value ? r.isSelected(e.value) : e.selected), p = i(() => a?.role === "trailing" || d.value || e.toggle), { colorStyle: h, hasExplicitColor: g } = lt(l);
	function _(n) {
		d.value && r.requestSelection(e.value, n), t("click", n);
	}
	return {
		colorStyle: h,
		effectiveColor: l,
		effectiveDisabled: u,
		effectiveSelected: f,
		effectiveShape: s,
		effectiveSize: o,
		effectiveToggle: p,
		effectiveVariant: c,
		group: r,
		handleClick: _,
		hasExplicitColor: g,
		split: a,
		useCursor: n.useCursor
	};
}
//#endregion
//#region src/components/typography.js
var xn = Object.freeze([
	"display",
	"headline",
	"title",
	"body",
	"label"
]), Sn = Object.freeze([
	"large",
	"medium",
	"small"
]), Cn = Object.freeze({
	L: "large",
	M: "medium",
	S: "small"
});
function wn(e) {
	return xn.includes(e);
}
function Tn(e) {
	return Sn.includes(e) || Object.hasOwn(Cn, e);
}
function En(e) {
	return Cn[e] ?? e;
}
function Dn(e, t, n = !1) {
	return [
		"mat-sys-typescale",
		n ? "emphasized" : void 0,
		e,
		En(t)
	].filter(Boolean).join("-");
}
//#endregion
//#region src/components/mat-btn/MatBtn.vue
var On = {
	key: 2,
	class: "mat-btn__label"
}, kn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Ne.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return Pe.includes(e);
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
				return Ve(e) || Be(e);
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
				return Fe.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let r = $("btn", e), c = n, l = R(), d = B(), f = k(null), p = z(), { colorStyle: m, effectiveColor: _, effectiveDisabled: v, effectiveSelected: y, effectiveShape: b, effectiveSize: x, effectiveToggle: S, effectiveVariant: w, handleClick: E, hasExplicitColor: D, split: O, useCursor: A } = bn(r, c), j = i(() => Be(_.value)), N = i(() => !j.value || w.value === "text"), P = i(() => N.value ? m.value : {}), F = i(() => N.value && D.value), V = i(() => S.value && w.value !== "text"), W = i(() => V.value && y.value), G = i(() => r.icon === !0 || typeof r.icon == "string" && r.icon.trim().length > 0), K = i(() => r.fill === void 0 ? +!!W.value : r.fill);
		function ee(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : h(e) ? e.type === t && Array.isArray(e.children) ? ee(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? ee(e.children) : [] : []).join("").trim();
		}
		let q = i(() => r.icon === !0 ? ee(d.default?.() ?? []) : ""), J = i(() => typeof r.icon == "string" ? r.icon.trim() : q.value), Y = i(() => l["aria-label"] ?? r.label), X = i(() => G.value ? l.title ?? r.label : void 0), Z = i(() => !G.value && (r.prefix !== void 0 || !!d.prefix)), te = i(() => !G.value && (r.suffix !== void 0 || !!d.suffix)), ne = i(() => W.value && !!d.selected), re = i(() => ({
			"extra-small": 20,
			small: G.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[x.value]), ie = i(() => {
			let [e, t] = {
				"extra-small": ["label", "large"],
				small: ["label", "large"],
				medium: ["title", "medium"],
				large: ["headline", "small"],
				"extra-large": ["headline", "large"]
			}[x.value];
			return Dn(e, t, !0);
		});
		return C(() => {
			r.icon === !0 && !q.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), H(() => {
			r.toggle && r.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), j.value && w.value !== "text" && console.warn("MatBtn: on-* 内容色只支持 text 形态，当前按默认配色处理"), G.value && (!Y.value || Y.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (e, n) => (T(), a(Oe, g({
			ref_key: "buttonElement",
			ref: f
		}, L(l), {
			class: ["mat-btn", [
				`mat-btn--${L(w)}`,
				`mat-btn--size-${L(x)}`,
				`mat-btn--shape-${L(b)}`,
				ie.value,
				{
					"mat-button--explicit-color": F.value,
					"mat-btn--icon": G.value,
					[`mat-btn--width-${L(r).width}`]: G.value,
					"mat-btn--toggle": V.value,
					"mat-btn--selected": W.value,
					"mat-btn--split-leading": L(O)?.role === "leading"
				}
			]],
			style: P.value,
			"aria-label": G.value ? Y.value : L(l)["aria-label"],
			"aria-controls": L(O)?.role === "trailing" ? L(O).controls.value : void 0,
			"aria-expanded": L(O)?.role === "trailing" ? L(O).expanded.value : void 0,
			"aria-haspopup": L(O)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": V.value ? W.value : void 0,
			block: L(r).block,
			disabled: L(v),
			title: G.value ? void 0 : L(l).title,
			type: L(r).type,
			"use-cursor": L(A),
			onClick: L(E)
		}), {
			default: U(() => [
				G.value ? (T(), a(pt, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: K.value,
					"optical-size": re.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [u(I(J.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : o("", !0),
				Z.value ? (T(), a(pt, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: K.value,
					"optical-size": re.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [L(r).prefix === void 0 ? M(e.$slots, "prefix", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(r).prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : o("", !0),
				G.value ? o("", !0) : (T(), s("span", On, [ne.value ? M(e.$slots, "selected", { key: 0 }, void 0, !0) : M(e.$slots, "default", { key: 1 }, void 0, !0)])),
				te.value ? (T(), a(pt, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: K.value,
					"optical-size": re.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [L(r).suffix === void 0 ? M(e.$slots, "suffix", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(r).suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : o("", !0),
				G.value && X.value ? (T(), a(_n, {
					key: 4,
					content: X.value,
					id: `${L(p)}-tooltip`,
					target: f.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : o("", !0)
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
}), [["__scopeId", "data-v-2514fbe1"]]), An = ["data-scrollable"], jn = { class: "mat-app-root__overlay" }, Mn = { class: "mat-app-root__bottom-stack" }, Nn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		], r = $("appRoot", e);
		if (m(kt, null)) throw Error("MatAppRoot 不允许嵌套");
		let a = R(), o = k(null), l = k(null), u = k(null), d = k(null), f = k(null), p = k(null), h = k(null), v = k(null), y = D({
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
		}), b = O(y), S = D({
			top: 0,
			bottom: 0,
			start: 0,
			end: 0
		}), w = i(() => ({
			"mat-app-root--document": r.fillViewport && !r.scrollable,
			"mat-app-root--fill-viewport": r.fillViewport,
			"mat-app-root--scrollable": r.scrollable
		})), A = i(() => [a.style, {
			"--mat-app-root-padding-top": `${y.padding.top}px`,
			"--mat-app-root-padding-bottom": `${y.padding.bottom}px`,
			"--mat-app-root-padding-start": `${y.padding.start}px`,
			"--mat-app-root-padding-end": `${y.padding.end}px`,
			"--mat-app-root-safe-area-top": `${S.top}px`,
			"--mat-app-root-safe-area-bottom": `${S.bottom}px`,
			"--mat-app-root-safe-area-start": `${S.start}px`,
			"--mat-app-root-safe-area-end": `${S.end}px`
		}]), j = [], N = !1, P, F, I = !1;
		function z(e) {
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
			let e = window.getComputedStyle(v.value), t = window.getComputedStyle(o.value).direction, n = z(e.paddingLeft), r = z(e.paddingRight);
			return {
				top: z(e.paddingTop),
				bottom: z(e.paddingBottom),
				start: t === "rtl" ? r : n,
				end: t === "rtl" ? n : r
			};
		}
		function H() {
			if (!N || !o.value) return;
			let e = o.value.getBoundingClientRect(), i = Math.max(0, Number(e.width) || 0), a = Math.max(0, Number(e.height) || 0), s = r.fillViewport && !r.scrollable ? Math.max(0, Number(window.innerHeight) || a) : a, c = n.find((e) => i <= e.max) ?? n.at(-1), l = B(), u = { ...l }, d = {
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
			};
			Object.assign(S, l);
			let f = j.filter((e) => e.active);
			f.sort((e, t) => {
				if (e.element === t.element) return 0;
				if (e.element.isConnected && t.element.isConnected) {
					let n = e.element.compareDocumentPosition(t.element);
					if (n & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
					if (n & Node.DOCUMENT_POSITION_PRECEDING) return 1;
				}
				return j.indexOf(e) - j.indexOf(t);
			}), f.forEach((e) => {
				let t = e.element.getBoundingClientRect(), n = e.edge, r = e.insets;
				if (n === "top") {
					let e = Math.max(0, Number(t.height) || t.bottom - t.top || 0);
					r.top = u.top, r.start = u.start, r.end = u.end, r.bottom = 0, r.offset = u.top, d.top.startInset = Math.max(d.top.startInset, u.start), d.top.endInset = Math.max(d.top.endInset, u.end), u.top += e;
				} else if (n === "bottom") {
					let e = Math.max(0, Number(t.height) || t.bottom - t.top || 0);
					r.bottom = u.bottom, r.start = u.start, r.end = u.end, r.top = 0, r.offset = u.bottom, d.bottom.startInset = Math.max(d.bottom.startInset, u.start), d.bottom.endInset = Math.max(d.bottom.endInset, u.end), u.bottom += e;
				} else if (n === "start") {
					let e = Math.max(0, Number(t.width) || t.right - t.left || 0);
					r.start = u.start, r.top = u.top, r.bottom = u.bottom, r.end = 0, r.offset = u.start, d.start.startInset = Math.max(d.start.startInset, u.top), d.start.endInset = Math.max(d.start.endInset, u.bottom), u.start += e;
				} else if (n === "end") {
					let e = Math.max(0, Number(t.width) || t.right - t.left || 0);
					r.end = u.end, r.top = u.top, r.bottom = u.bottom, r.start = 0, r.offset = u.end, d.end.startInset = Math.max(d.end.startInset, u.top), d.end.endInset = Math.max(d.end.endInset, u.bottom), u.end += e;
				}
			}), Object.assign(y.size, {
				width: i,
				height: s
			}), Object.assign(y.padding, u), Object.assign(y.content, {
				width: Math.max(0, i - u.start - u.end),
				height: Math.max(0, s - u.top - u.bottom)
			}), y.breakpoint = c.name, Object.assign(y.breakpointRange, {
				min: c.min,
				max: c.max
			}), t.forEach((e) => {
				Object.assign(y.edges[e], {
					size: u[e],
					...d[e]
				});
			});
		}
		function U() {
			if (!N || I) return;
			I = !0;
			let e = () => {
				I = !1, F = void 0, H();
			};
			if (typeof window.requestAnimationFrame == "function") {
				F = window.requestAnimationFrame(e);
				return;
			}
			F = window.setTimeout(e, 0);
		}
		function W({ edge: e, element: n } = {}) {
			if (!t.includes(e)) throw TypeError("registerEdge() 的 edge 必须是 top、bottom、start 或 end");
			if (!(n instanceof HTMLElement) || n.ownerDocument !== document) throw TypeError("registerEdge() 的 element 必须是当前 document 中的 HTMLElement");
			let r = D({
				bottom: 0,
				end: 0,
				offset: 0,
				start: 0,
				top: 0
			}), i = {
				active: !0,
				edge: e,
				element: n,
				insets: r
			};
			return j.push(i), P?.observe(n), U(), Object.freeze({
				insets: O(r),
				unregister: () => {
					i.active && (i.active = !1, P?.unobserve?.(n), U());
				},
				update: () => {
					i.active && U();
				}
			});
		}
		let G = Object.freeze({
			layout: b,
			registerEdge: W
		});
		function K() {
			let e = o.value?.getBoundingClientRect() ?? {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			};
			return r.fillViewport && !r.scrollable ? {
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
		let ee = {
			publicContext: G,
			rootElement: O(o),
			contentElement: O(l),
			edgeLayer: O(u),
			freeLayer: O(d),
			modalLayer: O(f),
			snackbarLayer: O(p),
			floatingLayer: O(h),
			documentMode: i(() => r.fillViewport && !r.scrollable),
			getLayoutRect: K
		};
		E(kt, ee);
		function q() {
			window.addEventListener("resize", U), document.addEventListener("scroll", U, !0), window.visualViewport?.addEventListener("resize", U), window.visualViewport?.addEventListener("scroll", U);
		}
		function J() {
			window.removeEventListener("resize", U), document.removeEventListener("scroll", U, !0), window.visualViewport?.removeEventListener("resize", U), window.visualViewport?.removeEventListener("scroll", U);
		}
		return C(async () => {
			N = !0, jt(o.value, ee), P = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(U), P?.observe(o.value), j.forEach((e) => {
				e.active && P?.observe(e.element);
			}), q(), await _(), U();
		}), x(() => {
			N = !1, Mt(o.value), P?.disconnect(), P = void 0, J(), F !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(F) : window.clearTimeout(F));
		}), V([() => r.fillViewport, () => r.scrollable], U), (e, t) => (T(), s("div", g({
			ref_key: "rootElement",
			ref: o
		}, e.$attrs, {
			class: ["mat-app-root", w.value],
			"data-scrollable": String(L(r).scrollable),
			style: A.value
		}), [
			c("div", {
				ref_key: "contentElement",
				ref: l,
				class: "mat-app-root__content"
			}, [M(e.$slots, "default", {}, void 0, !0)], 512),
			c("div", jn, [
				c("div", {
					ref_key: "freeLayer",
					ref: d,
					class: "mat-app-root__free-layer"
				}, null, 512),
				c("div", Mn, [
					t[0] ||= c("span", {
						class: "mat-app-root__stack-spacer",
						"aria-hidden": "true"
					}, null, -1),
					c("div", {
						ref_key: "snackbarLayer",
						ref: p,
						class: "mat-app-root__snackbar-layer"
					}, null, 512),
					c("div", {
						ref_key: "floatingLayer",
						ref: h,
						class: "mat-app-root__floating-layer"
					}, null, 512)
				]),
				c("div", {
					ref_key: "modalLayer",
					ref: f,
					class: "mat-app-root__modal-layer"
				}, null, 512)
			]),
			c("span", {
				ref_key: "safeAreaProbe",
				ref: v,
				class: "mat-app-root__safe-area-probe",
				"aria-hidden": "true"
			}, null, 512)
		], 16, An));
	}
}), [["__scopeId", "data-v-a265e6d7"]]), Pn = /* @__PURE__ */ new WeakMap(), Fn = /* @__PURE__ */ new WeakMap();
function In(e, t, n) {
	let r = [n.initialValue, ...n.names].filter((e) => e && e !== "none"), i = e.style;
	i[t] = r.join(", ");
}
function Ln(e, t, n, r) {
	let i = e.get(t);
	return i || (i = {
		initialValue: t.style[n],
		names: /* @__PURE__ */ new Set()
	}, e.set(t, i)), i.names.add(r), In(t, n, i), () => {
		if (i.names.delete(r), i.names.size > 0) {
			In(t, n, i);
			return;
		}
		let a = t.style;
		a[n] = i.initialValue, e.delete(t);
	};
}
function Rn({ name: e, scope: t, source: n }) {
	let r = Pn.get(n)?.initialAxis ?? n.style.scrollTimelineAxis, i = Ln(Pn, n, "scrollTimelineName", e), a = Pn.get(n);
	a.initialAxis = r;
	let o = n.style;
	o.scrollTimelineAxis = "block";
	let s = Ln(Fn, t, "timelineScope", e);
	return () => {
		s(), i(), Pn.has(n) || (o.scrollTimelineAxis = r);
	};
}
function zn(e) {
	let t = e.parentElement;
	for (; t;) {
		let e = window.getComputedStyle(t).overflowY;
		if (/(auto|scroll|overlay)/.test(e)) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function Bn(e, t) {
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
var Vn = {
	key: 0,
	class: "mat-app-bar__leading"
}, Hn = { class: "mat-app-bar__main" }, Un = {
	key: 0,
	class: "mat-app-bar__subtitle mat-sys-typescale-body-medium"
}, Wn = {
	key: 1,
	class: "mat-app-bar__trailing"
}, Gn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = [
			"search",
			"small",
			"medium-flexible",
			"large-flexible"
		], l = [
			"headline",
			"image",
			"search"
		], u = ["start", "center"], d = $("appBar", e), p = R(), h = f(), b = m(kt, null), S = h?.vnode.props ?? {}, w = Object.prototype.hasOwnProperty.call(S, "attach"), E = k(null), D = k(null), O = F(null), A = `--mat-app-bar-${h?.uid ?? Math.random().toString(36).slice(2)}`, j = i(() => r.includes(d.variant) ? d.variant : "small"), N = i(() => j.value === "search" ? "search" : l.includes(d.content) ? d.content : "headline"), P = i(() => u.includes(d.align) ? d.align : "start"), I = i(() => j.value === "medium-flexible" ? 112 : j.value === "large-flexible" ? 120 : 64), z = i(() => d.app && !!b && !w), B = i(() => {
			if (!d.app || z.value) return null;
			if (d.attach instanceof HTMLElement && d.attach.ownerDocument === document) return d.attach;
			if (typeof d.attach == "string") try {
				return document.querySelector(d.attach);
			} catch {
				return null;
			}
			return null;
		}), H = i(() => {
			let e = I.value - 64;
			return !d.app || z.value ? e : I.value;
		}), U = i(() => [
			`mat-app-bar--${j.value}`,
			`mat-app-bar--content-${N.value}`,
			`mat-app-bar--align-${P.value}`
		]), W = i(() => [p.style, { "--mat-app-bar-timeline": A }]), G = i(() => j.value === "medium-flexible" ? Dn("headline", "small") : j.value === "large-flexible" ? Dn("headline", "medium") : Dn("title", "large")), K = i(() => ({
			"mat-app-bar__host--app": d.app,
			"mat-app-bar__host--app-root": z.value
		})), ee = i(() => {
			if (z.value) return {
				"--mat-app-bar-app-end-inset": `${O.value?.insets.end ?? 0}px`,
				"--mat-app-bar-app-start-inset": `${O.value?.insets.start ?? 0}px`,
				"--mat-app-bar-app-top-offset": `${O.value?.insets.top ?? 0}px`
			};
		}), q = !1, J;
		function Y() {
			return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "scroll()");
		}
		function X(e) {
			if (e instanceof HTMLElement && e.ownerDocument === document) return e;
			if (typeof e == "string") try {
				return document.querySelector(e);
			} catch {
				return null;
			}
			return null;
		}
		function Z() {
			J?.(), J = void 0, D.value?.removeAttribute("data-timeline-active"), O.value?.unregister(), O.value = null;
		}
		async function te() {
			if (await _(), !q || !E.value || !D.value || (Z(), z.value && (O.value = b.publicContext.registerEdge({
				edge: "top",
				element: E.value
			})), !Y())) return;
			let e = X(d.scrollTarget), t = z.value && b.rootElement.value?.dataset.scrollable === "true" ? b.contentElement.value : null, n = e ?? t ?? zn(E.value);
			if (!n) return;
			let r = z.value ? b.rootElement.value : Bn(n, D.value);
			r && (J = Rn({
				name: A,
				scope: r,
				source: n
			}), D.value.dataset.timelineActive = "");
		}
		return C(() => {
			q = !0, te();
		}), x(() => {
			q = !1, Z();
		}), V([
			() => d.app,
			() => d.attach,
			() => d.scrollTarget,
			j
		], te), (e, r) => (T(), s(t, null, [!L(d).app || B.value || z.value ? (T(), a(n, {
			key: 0,
			disabled: !L(d).app || z.value,
			to: B.value ?? "body"
		}, [c("div", {
			ref_key: "hostElement",
			ref: E,
			class: v(["mat-app-bar__host", K.value]),
			style: y(ee.value)
		}, [c("header", g({
			ref_key: "headerElement",
			ref: D
		}, L(p), {
			class: ["mat-app-bar", U.value],
			style: W.value
		}), [
			e.$slots.leading ? (T(), s("div", Vn, [M(e.$slots, "leading", {}, void 0, !0)])) : o("", !0),
			c("div", Hn, [c("div", { class: v(["mat-app-bar__primary", G.value]) }, [M(e.$slots, "default", {}, void 0, !0)], 2), e.$slots.subtitle ? (T(), s("div", Un, [M(e.$slots, "subtitle", {}, void 0, !0)])) : o("", !0)]),
			r[0] ||= c("span", {
				class: "mat-app-bar__spacer",
				"aria-hidden": "true"
			}, null, -1),
			e.$slots.trailing ? (T(), s("div", Wn, [M(e.$slots, "trailing", {}, void 0, !0)])) : o("", !0)
		], 16)], 6)], 8, ["disabled", "to"])) : o("", !0), H.value > 0 ? (T(), s("span", {
			key: 1,
			"aria-hidden": "true",
			class: "mat-app-bar__placeholder",
			style: y({ blockSize: `${H.value}px` })
		}, null, 4)) : o("", !0)], 64));
	}
}), [["__scopeId", "data-v-fc6d49f0"]]), Kn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = $("inputBase", e), i = n, o = k(null);
		function s(e) {
			i("update:modelValue", e.target.value);
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
		}), (e, t) => (T(), a(N(L(r).control), g({
			ref_key: "input",
			ref: o
		}, e.$attrs, {
			class: "mat-input-base",
			disabled: L(r).disabled,
			maxlength: L(r).maxLength,
			readonly: L(r).readonly,
			required: L(r).required,
			rows: L(r).control === "textarea" ? L(r).rows : void 0,
			type: L(r).control === "input" ? L(r).type : void 0,
			value: L(r).modelValue,
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
}), [["__scopeId", "data-v-ace9bd51"]]), qn = { class: "mat-search__leading" }, Jn = {
	key: 0,
	class: "mat-search__trailing"
}, Yn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = $("search", e), a = n, l = R(), u = k(null), f = i(() => ({
			class: l.class,
			style: l.style
		})), p = i(() => {
			let e = { ...l };
			return delete e.class, delete e.style, e;
		});
		function m() {
			r.disabled || a("search", r.modelValue);
		}
		function h() {
			u.value?.focusInput();
		}
		function _() {
			return u.value?.getInput() ?? null;
		}
		return t({
			focusInput: h,
			getInput: _
		}), (e, t) => (T(), s("form", g(f.value, {
			class: "mat-search mat-sys-typescale-body-large",
			role: "search",
			onSubmit: K(m, ["prevent"])
		}), [
			c("span", qn, [M(e.$slots, "leading", {}, () => [d(kn, {
				disabled: L(r).disabled,
				icon: "search",
				label: L(r).label,
				size: "small",
				type: "button",
				variant: "standard",
				onClick: m
			}, null, 8, ["disabled", "label"])], !0)]),
			d(Kn, g({
				ref_key: "inputBase",
				ref: u
			}, p.value, {
				"aria-label": L(r).label,
				control: "input",
				disabled: L(r).disabled,
				"max-length": L(r).maxLength,
				"model-value": L(r).modelValue,
				placeholder: L(r).placeholder,
				readonly: L(r).readonly,
				type: "search",
				onKeydown: G(K(m, ["prevent"]), ["enter"]),
				"onUpdate:modelValue": t[0] ||= (e) => a("update:modelValue", e)
			}), null, 16, [
				"aria-label",
				"disabled",
				"max-length",
				"model-value",
				"placeholder",
				"readonly",
				"onKeydown"
			]),
			e.$slots.trailing ? (T(), s("span", Jn, [M(e.$slots, "trailing", {}, void 0, !0)])) : o("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-7c60e904"]]), Xn = 150, Zn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Ne.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return Pe.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
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
		let n = $("btnGroup", e), r = t, a = k(null), o = k(null), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set(), f, p, m, h = Xn, v = !0, y = !1, { colorStyle: b } = lt(i(() => n.color));
		function S(e) {
			return n.selection === "multiple" ? Array.isArray(n.selected) && n.selected.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.selected, e);
		}
		function D(e, t) {
			if (e === void 0) {
				console.warn("MatBtnGroup: selection 不为 none 时，子按钮必须提供 value");
				return;
			}
			let i = S(e);
			if (n.selection === "single") {
				if (i && n.required) return;
				r("select", {
					value: e,
					selected: !i,
					nextSelected: i ? null : e,
					originalEvent: t
				});
				return;
			}
			if (n.selection === "multiple") {
				let a = Array.isArray(n.selected) ? n.selected : [];
				if (i && n.required && a.length === 1) return;
				r("select", {
					value: e,
					selected: !i,
					nextSelected: i ? a.filter((t) => !Object.is(t, e)) : [...a, e],
					originalEvent: t
				});
			}
		}
		E(vn, {
			color: i(() => n.color),
			disabled: i(() => n.disabled),
			isSelected: S,
			requestSelection: D,
			selection: i(() => n.selection),
			shape: i(() => n.shape),
			size: i(() => n.size),
			variant: i(() => n.variant)
		});
		function O(e) {
			return e instanceof Element ? e.closest(".mat-button-base") : null;
		}
		function A(e) {
			let t = e.trim().match(/^(\d*\.?\d+)(ms|s)$/);
			if (!t) return null;
			let n = Number.parseFloat(t[1]);
			return t[2] === "s" ? n * 1e3 : n;
		}
		function j() {
			return A(getComputedStyle(a.value).getPropertyValue("--mat-btn-group-size-animation-duration")) ?? Xn;
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
		function I(e) {
			return new Map([...e].map(([e, t]) => [e, {
				inlineSize: Number.parseFloat(t.inlineSize) || 0,
				paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
				paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
			}]));
		}
		function R(e, t, n, r) {
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
		function z() {
			P(), d.forEach((e) => {
				let t = e;
				F(t, c.get(t) ?? {
					inlineSize: "",
					paddingInlineStart: "",
					paddingInlineEnd: ""
				}), c.delete(t), l.delete(t);
			}), d.clear(), o.value && delete o.value.dataset.matGroupPressed, m &&= (m.style.removeProperty("--mat-button-visual-scale"), void 0), o.value = null, h = Xn, v = !0, y = !1;
		}
		function B() {
			if (!o.value) return;
			let e = new Map([...d].map((e) => {
				let t = getComputedStyle(e);
				return [e, {
					inlineSize: Number.parseFloat(t.inlineSize) || 0,
					paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
					paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
				}];
			})), t = I(new Map([...d].map((e) => [e, l.get(e)])));
			delete o.value.dataset.matGroupPressed, o.value.style.setProperty("--mat-button-visual-scale", "1"), o.value = null, v = !0, y = !1, R(e, t, h, z);
		}
		function H() {
			if (o.value) {
				if (v) {
					B();
					return;
				}
				y = !0;
			}
		}
		function U(e, t, n, r) {
			v = !1, y = !1, h = r, R(I(t), I(n), r, () => {
				o.value === e && (v = !0, y && B());
			}), (N() || r === 0) && (v = !0);
		}
		function W(e) {
			if (n.variant !== "standard" || e.disabled || o.value === e) return;
			let t = e;
			z();
			let r = [...a.value.querySelectorAll(".mat-button-base")], i = r.indexOf(t);
			if (r.length < 2 || i === -1) return;
			let s = Number.parseFloat(getComputedStyle(a.value).getPropertyValue("--mat-btn-group-standard-pressed-width-factor")) || 1.15, f = j(), p = new Map(r.map((e) => {
				let t = getComputedStyle(e);
				return [e, {
					icon: e.classList.contains("mat-btn--icon"),
					inlineSize: u.get(e) ?? e.getBoundingClientRect().width,
					paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
					paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
				}];
			})), h = i === 0 ? [r[1]] : i === r.length - 1 ? [r[i - 1]] : [r[i - 1], r[i + 1]], g = p.get(t).inlineSize * (s - 1), _ = h.reduce((e, t) => {
				let n = p.get(t);
				return e + (n.icon ? n.inlineSize * (s - 1) : n.paddingInlineStart + n.paddingInlineEnd);
			}, 0), v = Math.min(g, _), y = /* @__PURE__ */ new Map(), b = p.get(t);
			y.set(t, {
				inlineSize: `${b.inlineSize + v}px`,
				paddingInlineStart: `${b.paddingInlineStart}px`,
				paddingInlineEnd: `${b.paddingInlineEnd}px`
			}), h.forEach((e) => {
				let t = p.get(e), n = t.paddingInlineStart + t.paddingInlineEnd, r = t.icon ? t.inlineSize * (s - 1) : n, i = _ > 0 ? v * r / _ : 0, a = n > 0 ? i * t.paddingInlineStart / n : 0, o = i - a;
				y.set(e, {
					inlineSize: `${t.inlineSize - i}px`,
					paddingInlineStart: `${t.paddingInlineStart - a}px`,
					paddingInlineEnd: `${t.paddingInlineEnd - o}px`
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
			}), t.dataset.matGroupPressed = "", t.style.setProperty("--mat-button-visual-scale", ".96"), m = t, o.value = t, U(t, new Map([...d].map((e) => [e, l.get(e)])), y, f);
		}
		function G() {
			p?.disconnect(), !(!a.value || typeof ResizeObserver != "function") && (p ??= new ResizeObserver((e) => {
				e.forEach((e) => {
					let t = (Array.isArray(e.borderBoxSize) ? e.borderBoxSize[0] : e.borderBoxSize)?.inlineSize ?? e.contentRect.width;
					!d.has(e.target) && t > 0 && u.set(e.target, t);
				});
			}), a.value.querySelectorAll(".mat-button-base").forEach((e) => {
				p.observe(e, { box: "border-box" });
			}));
		}
		async function K(e) {
			let t = O(e.target);
			t && (await _(), W(t));
		}
		function ee(e) {
			e.relatedTarget instanceof Node && a.value?.contains(e.relatedTarget) || H();
		}
		async function q(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = O(e.target);
			t && (await _(), W(t));
		}
		function J() {
			if (n.variant !== "connected" || !a.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...a.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return C(() => {
			J(), G();
		}), w(G), x(() => {
			p?.disconnect(), z();
		}), V(() => [n.variant, n.selection], async () => {
			z(), await _(), J();
		}), (e, t) => (T(), s("div", g({
			ref_key: "root",
			ref: a
		}, e.$attrs, {
			class: ["mat-btn-group", [
				`mat-btn-group--${L(n).variant}`,
				`mat-btn-group--size-${L(n).size}`,
				`mat-btn-group--shape-${L(n).shape}`,
				{
					"mat-btn-group--block": L(n).block,
					"mat-btn-group--full-width": L(n).variant === "connected" && L(n).fullWidth
				}
			]],
			style: L(b),
			role: "group",
			onFocusout: ee,
			onKeydown: q,
			onKeyupCapture: H,
			onLostpointercaptureCapture: H,
			onPointercancelCapture: H,
			onPointerdown: K,
			onPointerupCapture: H
		}), [M(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-05cf7ce9"]]), Qn = [
	"small",
	"medium",
	"large"
], $n = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], er = [
	"button",
	"submit",
	"reset"
];
function tr(e) {
	return typeof e == "string" && $n.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var nr = ["aria-hidden"], rr = ["aria-hidden"], ir = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return Qn.includes(e);
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
		expanded: {
			type: Boolean,
			default: !0
		},
		color: {
			type: String,
			default: "primary-container",
			validator: tr
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return er.includes(e);
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
	setup(t, { emit: r }) {
		let c = $("fab", t), l = r, f = R(), p = B(), h = m(je, Ae), _ = m(kt, null), v = k(null), y = z(), b = i(() => (p.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = i(() => c.expanded && b.value), S = i(() => typeof c.icon == "string" && c.icon.trim().length > 0), C = i(() => !x.value), w = i(() => C.value ? f.title ?? c.label : void 0), E = i(() => C.value ? c.label : f["aria-label"]), D = i(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[c.size]), O = i(() => {
			let [e, t] = {
				small: ["title", "medium"],
				medium: ["title", "large"],
				large: ["headline", "small"]
			}[c.size];
			return Dn(e, t);
		}), A = i(() => ({
			"--mat-fab-container-color": `var(--mat-sys-color-${c.color})`,
			"--mat-fab-content-color": `var(--mat-sys-color-on-${c.color})`,
			"--mat-fab-state-color": `var(--mat-sys-color-on-${c.color})`
		})), j = i(() => c.app && !!_), N = i(() => j.value ? _.floatingLayer.value : null);
		return H(() => {
			C.value && (!S.value || !c.label || c.label.trim().length === 0) && console.warn("MatFab: 图标模式必须提供非空 label");
		}), (e, t) => j.value ? N.value ? (T(), a(n, {
			key: 1,
			to: N.value
		}, [d(Oe, g({
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${L(c).size}`,
				`mat-fab--position-${L(c).position}`,
				O.value,
				{
					"mat-fab--app-root": !0,
					"mat-fab--extended": x.value,
					"mat-fab--icon-only": C.value
				}
			]],
			style: A.value,
			"aria-label": E.value,
			disabled: L(c).disabled,
			title: C.value ? void 0 : L(f).title,
			type: L(c).type,
			"use-cursor": L(h).useCursor,
			onClick: t[1] ||= (e) => l("click", e)
		}), {
			default: U(() => [
				S.value ? (T(), a(pt, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": D.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [u(I(L(c).icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : o("", !0),
				b.value ? (T(), s("span", {
					key: 1,
					class: "mat-fab__label",
					"aria-hidden": x.value ? void 0 : "true"
				}, [M(e.$slots, "default", {}, void 0, !0)], 8, rr)) : o("", !0),
				C.value && w.value ? (T(), a(_n, {
					key: 2,
					content: w.value,
					id: `${L(y)}-tooltip`,
					target: v.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : o("", !0)
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
		])], 8, ["to"])) : o("", !0) : (T(), a(Oe, g({
			key: 0,
			ref_key: "buttonElement",
			ref: v
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${L(c).size}`,
				O.value,
				{
					"mat-fab--extended": x.value,
					"mat-fab--icon-only": C.value
				}
			]],
			style: A.value,
			"aria-label": E.value,
			disabled: L(c).disabled,
			title: C.value ? void 0 : L(f).title,
			type: L(c).type,
			"use-cursor": L(h).useCursor,
			onClick: t[0] ||= (e) => l("click", e)
		}), {
			default: U(() => [
				S.value ? (T(), a(pt, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": D.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [u(I(L(c).icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : o("", !0),
				b.value ? (T(), s("span", {
					key: 1,
					class: "mat-fab__label",
					"aria-hidden": x.value ? void 0 : "true"
				}, [M(e.$slots, "default", {}, void 0, !0)], 8, nr)) : o("", !0),
				C.value && w.value ? (T(), a(_n, {
					key: 2,
					content: w.value,
					id: `${L(y)}-tooltip`,
					target: v.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : o("", !0)
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
}), [["__scopeId", "data-v-7cc5cf2e"]]), ar = ["src"], or = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => vt(e, { property: "border-radius" })
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
			validator: (e) => vt(e, {
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
		let t = $("image", e), n = R(), r = i(() => ({
			class: n.class,
			style: n.style
		})), a = i(() => Object.fromEntries(Object.entries(n).filter(([e]) => !["class", "style"].includes(e)))), o = i(() => ({
			aspectRatio: bt(t.aspectRatio, {
				property: "aspect-ratio",
				positive: !0
			}),
			borderRadius: t.radius === void 0 ? "var(--mat-sys-shape-corner-extra-large)" : yt(t.radius, {
				property: "border-radius",
				fallback: "var(--mat-sys-shape-corner-extra-large)"
			}),
			outline: t.outline ? "1px solid var(--mat-sys-color-outline)" : void 0
		})), l = i(() => {
			let e = { objectFit: t.fit };
			return typeof t.imgStyle == "string" ? [e, t.imgStyle] : Array.isArray(t.imgStyle) ? [e, ...t.imgStyle] : {
				...e,
				...t.imgStyle
			};
		});
		return (e, n) => (T(), s("div", g(r.value, {
			class: "mat-image",
			style: o.value
		}), [c("img", g(a.value, {
			class: ["mat-image__img", L(t).imgClass],
			style: l.value,
			src: L(t).src
		}), null, 16, ar)], 16));
	}
}), [["__scopeId", "data-v-d5f3cb83"]]), sr = F(/* @__PURE__ */ new Set()), cr = 0;
function lr(e) {
	return cr += 1, sr.value = new Set(e), cr;
}
function ur(e) {
	e === cr && (sr.value = /* @__PURE__ */ new Set());
}
//#endregion
//#region src/components/mat-shared-element/MatSharedElement.vue
var dr = /*@__PURE__*/ Object.assign({
	name: "MatSharedElement",
	inheritAttrs: !1
}, {
	__name: "MatSharedElement",
	props: {
		name: {
			type: String,
			required: !0,
			validator: (e) => e.trim().length > 0
		},
		as: {
			type: String,
			default: "div",
			validator: Ge
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = $("sharedElement", e), n = R(), r = i(() => !t.disabled && sr.value.has(t.name) ? t.name : void 0), o = i(() => [n.style, { viewTransitionName: r.value }]);
		return (e, r) => (T(), a(N(L(t).as), g(L(n), { style: o.value }), {
			default: U(() => [M(e.$slots, "default")]),
			_: 3
		}, 16, ["style"]));
	}
}), fr = ["src"], pr = {
	key: 2,
	class: "mat-avatar__content"
}, mr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ve
		},
		size: {
			type: [Number, String],
			default: 40,
			validator: (e) => vt(e, {
				property: "width",
				positive: !0
			})
		}
	},
	setup(e) {
		let t = $("avatar", e), { colorStyle: n } = lt(i(() => t.color)), r = i(() => yt(t.size, {
			property: "width",
			positive: !0,
			fallback: "40px"
		})), o = i(() => ({
			...n.value,
			"--mat-avatar-size": r.value,
			"inline-size": r.value,
			"block-size": r.value
		}));
		return (e, n) => (T(), s("span", g(e.$attrs, {
			class: "mat-avatar",
			style: o.value
		}), [L(t).src ? (T(), s("img", {
			key: 0,
			class: "mat-avatar__image",
			src: L(t).src,
			alt: ""
		}, null, 8, fr)) : L(t).icon ? (T(), a(pt, {
			key: 1,
			as: "span",
			class: "mat-avatar__icon",
			icon: L(t).icon,
			size: "var(--mat-avatar-icon-size)",
			"aria-hidden": "true"
		}, null, 8, ["icon"])) : (T(), s("span", pr, [M(e.$slots, "default", {}, void 0, !0)]))], 16));
	}
}), [["__scopeId", "data-v-a04143bf"]]), hr = Object.freeze({
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
Object.freeze(Object.keys(hr));
function gr(e) {
	return typeof e == "string" && Object.hasOwn(hr, e);
}
var _r = Object.freeze([
	"soft-burst",
	"9-sided-cookie",
	"pentagon",
	"pill",
	"sunny",
	"4-sided-cookie",
	"oval"
]), vr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatShape",
	inheritAttrs: !1
}, {
	__name: "MatShape",
	props: {
		name: {
			type: String,
			default: "circle",
			validator: gr
		},
		size: {
			type: [Number, String],
			default: 48,
			validator: (e) => vt(e, {
				property: "width",
				positive: !0
			})
		},
		color: {
			type: String,
			default: "primary",
			validator: Ve
		},
		as: {
			type: String,
			default: "div",
			validator: Ge
		}
	},
	setup(e) {
		let t = $("shape", e), { colorStyle: n } = lt(i(() => t.color)), r = i(() => yt(t.size, {
			property: "width",
			positive: !0,
			fallback: "48px"
		})), o = i(() => gr(t.name) ? t.name : "circle"), s = i(() => ({
			...n.value,
			inlineSize: r.value,
			blockSize: r.value,
			clipPath: hr[o.value]
		}));
		return (e, n) => (T(), a(N(L(t).as), g(e.$attrs, {
			class: "mat-shape",
			style: s.value
		}), {
			default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["style"]));
	}
}), [["__scopeId", "data-v-d3e79d42"]]), yr = /*@__PURE__*/ Object.assign({ name: "MatText" }, {
	__name: "MatText",
	props: {
		type: {
			type: String,
			default: "body",
			validator: wn
		},
		size: {
			type: String,
			default: "medium",
			validator: Tn
		},
		emphasized: {
			type: Boolean,
			default: !1
		},
		as: {
			type: String,
			default: "span",
			validator: Ge
		}
	},
	setup(e) {
		let t = $("text", e), n = i(() => Dn(t.type, t.size, t.emphasized));
		return (e, r) => (T(), a(N(L(t).as), { class: v(n.value) }, {
			default: U(() => [M(e.$slots, "default")]),
			_: 3
		}, 8, ["class"]));
	}
}), br = ["data-char", "onAnimationend"], xr = { class: "mat-dynamic-text__stage" }, Sr = {
	key: 1,
	class: "mat-dynamic-text__char mat-dynamic-text__char--exiting"
}, Cr = 25, wr = 300, Tr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatDynamicText" }, {
	__name: "MatDynamicText",
	props: {
		text: {
			type: [String, Number],
			default: ""
		},
		as: {
			type: String,
			default: "span",
			validator: Ge
		},
		diff: {
			type: Boolean,
			default: !0
		},
		appear: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let n = $("dynamicText", e), r = 0, l = k([]), u = /* @__PURE__ */ new Map(), d = i(() => {
			let e = n.text;
			return f(e);
		});
		function f(e) {
			return (e == null ? "" : String(e)).replace(/[\r\n]+/g, " ");
		}
		function p() {
			return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function m(e) {
			let t = f(e);
			if (!t) return [];
			if (typeof Intl < "u" && Intl.Segmenter) {
				let e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
				return Array.from(e.segment(t), (e) => e.segment);
			}
			return Array.from(t);
		}
		function h() {
			u.forEach((e) => clearTimeout(e)), u.clear(), l.value = l.value.filter((e) => e.char).map((e) => ({
				...e,
				oldChar: null,
				animating: !1
			}));
		}
		function g(e) {
			let t = u.get(e);
			t && (clearTimeout(t), u.delete(e));
			let n = l.value.find((t) => t.id === e);
			n && (n.char ? (n.oldChar = null, n.animating = !1) : l.value = l.value.filter((t) => t.id !== e));
		}
		function _(e, t) {
			let n = t * Cr + wr, r = setTimeout(() => g(e), n);
			u.set(e, r);
		}
		function b(e, t) {
			let n = m(e), i = t && !p();
			return n.map((e, t) => {
				let n = r += 1, a = {
					id: n,
					char: e,
					oldChar: null,
					animating: i,
					index: t,
					key: i ? `${t}-${e}-${n}` : `${t}-${e}`
				};
				return a.animating && _(n, t), a;
			});
		}
		function x(e, t) {
			h();
			let i = m(e), a = l.value.map((e) => e.char), o = t && !p(), s = Math.max(a.length, i.length), c = [];
			for (let e = 0; e < s; e += 1) {
				let t = a[e], s = i[e];
				if (s !== void 0) {
					let i = n.diff && t === s, a = o && !i, l = r += 1;
					c.push({
						id: l,
						char: s,
						oldChar: a && t !== void 0 ? t : null,
						animating: a,
						index: e,
						key: `${e}-${s}-${l}`
					}), a && _(l, e);
				} else if (t !== void 0 && o) {
					let n = r += 1;
					c.push({
						id: n,
						char: "",
						oldChar: t,
						animating: !0,
						index: e,
						key: `${e}-remove-${n}`
					}), _(n, e);
				}
			}
			l.value = c;
		}
		return l.value = b(n.text, n.appear), V(() => n.text, (e, t) => {
			e !== t && x(e, !0);
		}), (e, r) => (T(), a(N(L(n).as), {
			class: "mat-dynamic-text",
			"aria-label": d.value
		}, {
			default: U(() => [(T(!0), s(t, null, j(l.value, (e) => (T(), s("span", {
				key: e.key,
				class: "mat-dynamic-text__column",
				style: y({ "--mat-dynamic-text-index": e.index }),
				"data-char": e.char || e.oldChar || "",
				"aria-hidden": "true",
				onAnimationend: (t) => g(e.id)
			}, [c("span", xr, [e.char ? (T(), s("span", {
				key: 0,
				class: v(["mat-dynamic-text__char", e.animating ? "mat-dynamic-text__char--entering" : "mat-dynamic-text__char--idle"])
			}, I(e.char), 3)) : o("", !0), e.oldChar ? (T(), s("span", Sr, I(e.oldChar), 1)) : o("", !0)])], 44, br))), 128))]),
			_: 1
		}, 8, ["aria-label"]));
	}
}), [["__scopeId", "data-v-314708d8"]]), Er = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = m(yn), i = B();
		E(yn, {
			...r,
			role: n.role
		});
		function o(e) {
			return e.flatMap((e) => h(e) && e.type === t && Array.isArray(e.children) ? o(e.children) : [e]);
		}
		function s() {
			return o(i.default?.() ?? []).find((e) => h(e) && (e.type?.name ?? e.type?.__name) === "MatBtn") ?? null;
		}
		return (e, t) => (T(), a(s));
	}
}), Dr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Ne.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
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
		let n = $("splitBtn", e), r = t, a = k(null), o = B(), { colorStyle: l, hasExplicitColor: u } = lt(i(() => n.color));
		E(yn, {
			color: i(() => n.color),
			controls: i(() => n.controls),
			disabled: i(() => n.disabled),
			expanded: i(() => n.expanded),
			size: i(() => n.size),
			variant: i(() => n.variant)
		});
		function f(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || r("leading-click", e);
		}
		function p(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || (r("trailing-click", e), r("update:expanded", !n.expanded));
		}
		function m() {
			if (!a.value) return;
			(!o.leading || a.value.querySelectorAll(".mat-split-btn__leading .mat-button-base").length !== 1) && console.warn("MatSplitBtn: leading slot 必须提供一个 MatBtn");
			let e = a.value.querySelectorAll(".mat-split-btn__trailing .mat-btn--icon");
			(!o.trailing || e.length !== 1) && console.warn("MatSplitBtn: trailing slot 必须提供一个图标模式 MatBtn");
		}
		return C(m), V(() => [n.size, n.variant], async () => {
			await _(), m();
		}), (e, t) => (T(), s("div", g({
			ref_key: "root",
			ref: a
		}, e.$attrs, {
			class: ["mat-split-btn", [
				`mat-split-btn--${L(n).variant}`,
				`mat-split-btn--size-${L(n).size}`,
				{
					"mat-split-btn--block": L(n).block,
					"mat-split-btn--expanded": L(n).expanded,
					"mat-split-btn--explicit-color": L(u)
				}
			]],
			style: L(l),
			role: "group"
		}), [c("span", {
			class: "mat-split-btn__segment mat-split-btn__leading",
			onClick: f
		}, [d(Er, { role: "leading" }, {
			default: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), c("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [d(Er, { role: "trailing" }, {
			default: U(() => [M(e.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-30ec286f"]]), Or = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatSurfaceBase",
	inheritAttrs: !1
}, {
	__name: "MatSurfaceBase",
	props: { as: {
		type: String,
		default: "div"
	} },
	setup(e, { expose: t }) {
		let n = k(null);
		return t({ root: n }), (t, r) => (T(), a(N(e.as), g({
			ref_key: "root",
			ref: n
		}, t.$attrs, { class: "mat-surface-base" }), {
			default: U(() => [M(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-73d1306b"]]), kr = { class: "mat-card-headline mat-sys-typescale-title-large" }, Ar = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (T(), s("div", kr, [M(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-53a5927c"]]), jr = { class: "mat-card-media" }, Mr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (T(), s("div", jr, [M(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-c38ab1c6"]]), Nr = { class: "mat-card-subhead mat-sys-typescale-body-medium" }, Pr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (T(), s("div", Nr, [M(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-c437408b"]]), Fr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ve
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
		let t = $("card", e), { colorStyle: n, hasExplicitColor: r } = lt(i(() => t.color));
		return (e, i) => (T(), a(Or, g(e.$attrs, {
			class: ["mat-card", [`mat-card--${L(t).variant}`, { "mat-card--explicit-color": L(r) }]],
			style: L(n),
			as: L(t).as
		}), {
			default: U(() => [
				e.$slots.media ? (T(), a(Mr, { key: 0 }, {
					default: U(() => [M(e.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : o("", !0),
				e.$slots.headline ? (T(), a(Ar, { key: 1 }, {
					default: U(() => [M(e.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : o("", !0),
				e.$slots.subhead ? (T(), a(Pr, { key: 2 }, {
					default: U(() => [M(e.$slots, "subhead", {}, void 0, !0)]),
					_: 3
				})) : o("", !0),
				M(e.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"as"
		]));
	}
}), [["__scopeId", "data-v-cb7bd9d9"]]), Ir = { class: "mat-card-action-area__content" }, Lr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Fe.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = e, r = t, i = $("cardActionArea", n), o = m(je, Ae);
		return (e, t) => (T(), a(De, g(e.$attrs, {
			class: "mat-card-action-area",
			disabled: L(i).disabled,
			"focus-ring": !1,
			href: L(i).href,
			type: L(i).type,
			"use-cursor": L(o).useCursor,
			onClick: t[0] ||= (e) => r("click", e)
		}), {
			default: U(() => [c("span", Ir, [M(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-c7ecd12e"]]), Rr = { class: "mat-card-content" }, zr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (T(), s("div", Rr, [M(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-9ba80632"]]), Br = { class: "mat-card-actions" }, Vr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (T(), s("div", Br, [M(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-69850177"]]), Hr = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], Ur = Symbol("mat-list"), Wr = Symbol("mat-list-group-activator");
function Gr(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function Kr(e) {
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
	return x(c), {
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
function qr(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function Jr(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(qr);
}
//#endregion
//#region src/components/scroll-area-context.js
var Yr = Symbol("mat-scroll-area");
//#endregion
//#region src/components/mat-virtual-scroll/use-virtual-scroll.js
function Xr({ root: e, props: t, enabled: n = !0, pinEdges: r = !1, emit: a }) {
	let o = k(null), s = m(Yr, null), c = i(() => !!L(n)), l = i(() => !!L(r)), u = i(() => Tt(t.itemHeight, {
		positive: !0,
		fallback: void 0
	})), d = i(() => u.value !== void 0), f = i(() => Tt(t.estimatedItemHeight, {
		positive: !0,
		fallback: 48
	})), p = i(() => Tt(t.buffer, { fallback: 3 })), h = D(/* @__PURE__ */ new Map()), g = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), y = k({
		start: 0,
		end: 0
	}), b = k(0), S = k(0), T, E, O, A = !1;
	function j(e) {
		return d.value ? u.value : h.get(e) ?? f.value;
	}
	function M() {
		if (s?.getScroller?.()) {
			let e = s.getScroller();
			if (e) return e;
		}
		let t = e.value;
		if (!t) return null;
		let n = t.closest(".mat-scroll-area__viewport") || t.closest(".mat-scroll-area")?.querySelector(".mat-scroll-area__viewport");
		if (n) return n;
		let r = t.parentElement;
		for (; r && r !== document.body && r !== document.documentElement;) {
			let e = getComputedStyle(r), t = e.overflowY || e.overflow;
			if ([
				"auto",
				"scroll",
				"overlay"
			].includes(t)) return r;
			r = r.parentElement;
		}
		return window;
	}
	function N() {
		let t = o.value, n = e.value;
		if (!t || !n) return {
			scrollTop: 0,
			viewportHeight: 0,
			scrollHeight: 0,
			offsetInParent: 0
		};
		if (t === window) {
			let e = window.scrollY || document.documentElement.scrollTop || 0;
			return {
				scrollTop: e,
				viewportHeight: window.innerHeight || 0,
				scrollHeight: document.documentElement.scrollHeight || 0,
				offsetInParent: n.getBoundingClientRect().top + e
			};
		}
		let r = t.scrollTop || 0, i = t.clientHeight || 0, a = t.scrollHeight || 0, s = 0;
		try {
			let e = t.getBoundingClientRect(), i = n.getBoundingClientRect();
			s = e.height > 0 || i.height > 0 || e.top !== 0 || i.top !== 0 ? i.top - e.top + r : n.offsetTop || 0;
		} catch {
			s = n.offsetTop || 0;
		}
		return {
			scrollTop: r,
			viewportHeight: i,
			scrollHeight: a,
			offsetInParent: s
		};
	}
	function P() {
		if (!(A || !c.value)) {
			A = !0;
			try {
				let e = (t.items || []).length;
				if (e === 0) {
					y.value = {
						start: 0,
						end: 0
					}, b.value = 0, S.value = 0;
					return;
				}
				let { scrollTop: n, viewportHeight: r, scrollHeight: i, offsetInParent: o } = N(), s = Math.max(0, n - o), c = r || 300, f = p.value, m = 0, h = 0, g = 0, _ = 0;
				if (d.value) {
					let t = u.value;
					if (m = Math.max(0, Math.floor(s / t) - f), h = Math.min(e, Math.ceil((s + c) / t) + f), l.value && e >= 3) {
						let n = Math.max(1, Math.min(e - 2, m)), r = Math.max(n, Math.min(e - 1, h));
						g = Math.max(0, (n - 1) * t), _ = Math.max(0, (e - 1 - r) * t), m = n, h = r;
					} else l.value ? (m = 0, h = e, g = 0, _ = 0) : (g = m * t, _ = Math.max(0, (e - h) * t));
				} else {
					let t = Array(e + 1);
					t[0] = 0;
					for (let n = 0; n < e; n += 1) t[n + 1] = t[n] + j(n);
					let n = t[e], r = s, i = s + c, a = 0, o = e, u = 0, d = e - 1;
					for (; u <= d;) {
						let e = Math.floor((u + d) / 2);
						t[e + 1] > r ? (a = e, d = e - 1) : u = e + 1;
					}
					for (u = a, d = e - 1; u <= d;) {
						let e = Math.floor((u + d) / 2);
						t[e] < i ? (o = e + 1, u = e + 1) : d = e - 1;
					}
					if (m = Math.max(0, a - f), h = Math.min(e, o + f), l.value && e >= 3) {
						let n = Math.max(1, Math.min(e - 2, m)), r = Math.max(n, Math.min(e - 1, h));
						g = Math.max(0, t[n] - t[1]), _ = Math.max(0, t[e - 1] - t[r]), m = n, h = r;
					} else l.value ? (m = 0, h = e, g = 0, _ = 0) : (g = t[m], _ = Math.max(0, n - t[h]));
				}
				let v = y.value.start, x = y.value.end;
				y.value = {
					start: m,
					end: h
				}, b.value = g, S.value = _, (m !== v || h !== x) && a?.("visible-range-change", {
					startIndex: m,
					endIndex: h
				}), a?.("scroll", {
					scrollTop: n,
					scrollHeight: i,
					clientHeight: c,
					startIndex: m,
					endIndex: h
				});
			} finally {
				A = !1;
			}
		}
	}
	async function F() {
		await _(), P();
	}
	function I(e, n) {
		return typeof t.itemKey == "function" ? t.itemKey(e, n) : typeof t.itemKey == "string" && e && typeof e == "object" ? e[t.itemKey] ?? n : n;
	}
	function R(e, t) {
		if (d.value || !T) return;
		let n = v.get(e);
		n && n !== t && (T.unobserve(n), g.delete(n), v.delete(e)), t && t instanceof HTMLElement && (g.set(t, e), v.set(e, t), T.observe(t));
	}
	function z(e, n = {}) {
		let r = (t.items || []).length;
		if (e < 0 || e >= r) return;
		let i = o.value;
		if (!i) return;
		let { offsetInParent: a, viewportHeight: s, scrollTop: c } = N(), { align: l = "auto", behavior: f = "auto" } = n, p = 0, m = 0;
		if (d.value) m = u.value, p = e * m;
		else {
			let t = 0;
			for (let n = 0; n < e; n += 1) t += j(n);
			p = t, m = j(e);
		}
		let h = p + a, g = c;
		l === "start" ? g = h : l === "end" ? g = h + m - s : l === "center" ? g = h + m / 2 - s / 2 : h < c ? g = h : h + m > c + s && (g = h + m - s), i === window ? window.scrollTo({
			top: Math.max(0, g),
			behavior: f
		}) : i.scrollTo({
			top: Math.max(0, g),
			behavior: f
		});
	}
	function B(e) {
		let t = o.value;
		t && t.scrollTo(e);
	}
	function H() {
		return o.value;
	}
	let U = i(() => {
		let e = t.items || [], { start: n, end: r } = y.value, i = [];
		for (let t = n; t < r && t < e.length; t += 1) i.push({
			index: t,
			item: e[t]
		});
		return i;
	});
	function W() {
		O &&= (O.removeEventListener("scroll", P), null), o.value === window && window.removeEventListener("resize", P), E?.disconnect(), E = null, T?.disconnect(), T = null, g.clear(), v.clear();
	}
	function G() {
		if (W(), !c.value) return;
		let e = M();
		o.value = e, e && (O = e, O.addEventListener("scroll", P, { passive: !0 }), typeof ResizeObserver == "function" && (e === window ? window.addEventListener("resize", P, { passive: !0 }) : (E = new ResizeObserver(() => {
			P();
		}), E.observe(e)), d.value || (T = new ResizeObserver((e) => {
			let t = !1;
			e.forEach((e) => {
				let n = g.get(e.target);
				if (n !== void 0) {
					let r = e.borderBoxSize?.[0]?.blockSize ?? e.contentRect?.height ?? e.target.getBoundingClientRect().height;
					r > 0 && h.get(n) !== r && (h.set(n, r), t = !0);
				}
			}), t && P();
		}))), P());
	}
	return V(() => t.items, () => {
		P();
	}, { deep: !1 }), V([
		u,
		f,
		p,
		c
	], () => {
		G();
	}), C(() => {
		G();
	}), w(() => {
		c.value && !o.value && G();
	}), x(() => {
		W();
	}), {
		calculate: P,
		getItemHeight: j,
		getItemKey: I,
		getScroller: H,
		paddingBottom: S,
		paddingTop: b,
		range: y,
		refresh: F,
		scrollTo: B,
		scrollToIndex: z,
		setItemRef: R,
		visibleItems: U
	};
}
//#endregion
//#region src/components/frame-scheduler.js
function Zr(e) {
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
//#region src/components/mat-list/use-list-drag-sort.js
var Qr = 500, $r = 8, ei = 48, ti = 24, ni = "color-mix(\n  in srgb,\n  var(--mat-list-drag-content-color) calc(var(--mat-sys-state-dragged-state-layer-opacity) * 100%),\n  var(--mat-list-drag-container-color)\n)", ri = "data-mat-list-drag-selection-lock", ii = 0;
function ai(e) {
	e.cancelable && e.preventDefault();
}
function oi() {
	ii === 0 && (document.documentElement.setAttribute(ri, ""), document.addEventListener("selectstart", ai, !0)), ii += 1, globalThis.getSelection?.()?.removeAllRanges();
}
function si() {
	ii !== 0 && (--ii, ii === 0 && (document.documentElement.removeAttribute(ri), document.removeEventListener("selectstart", ai, !0)));
}
function ci(e) {
	return Object.is(e, -0) ? "number:-0" : `${typeof e}:${String(e)}`;
}
function li(e) {
	let t = e.parentElement;
	for (; t && t !== document.body;) {
		let e = getComputedStyle(t);
		if (/(auto|scroll)/u.test(e.overflowY) && t.scrollHeight > t.clientHeight) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function ui(e) {
	e.removeAttribute("id"), e.querySelectorAll("[id]").forEach((e) => {
		e.removeAttribute("id");
	}), e.querySelectorAll("[tabindex]").forEach((e) => {
		e.setAttribute("tabindex", "-1");
	});
}
function di(e, t) {
	let { style: n } = e;
	n.setProperty("--mat-list-drag-container-color", t.backgroundColor), n.setProperty("--mat-list-drag-content-color", t.color), n.background = ni;
}
function fi(e, t) {
	let n = e.cloneNode(!0), r = getComputedStyle(e), i = e.matches(".mat-list-item__surface") ? e : e.querySelector(".mat-list-item__surface") ?? e, a = n.matches(".mat-list-item__surface") ? n : n.querySelector(".mat-list-item__surface") ?? n;
	ui(n), n.setAttribute("aria-hidden", "true"), n.setAttribute("data-mat-list-drag-preview", ""), n.setAttribute("inert", "");
	for (let e = 0; e < r.length; e += 1) {
		let t = r.item(e);
		t.startsWith("--mat-") && n.style.setProperty(t, r.getPropertyValue(t));
	}
	return di(a, getComputedStyle(i)), Object.assign(n.style, {
		position: "fixed",
		zIndex: "1000",
		boxSizing: "border-box",
		inlineSize: `${t.width}px`,
		blockSize: `${t.height}px`,
		left: `${t.left}px`,
		top: `${t.top}px`,
		margin: "0",
		pointerEvents: "none",
		borderRadius: "var(--mat-list-item-selected-container-shape, 16px)",
		boxShadow: "var(--mat-sys-elevation-level3)",
		willChange: "transform"
	}), document.body.append(n), n;
}
function pi(e) {
	if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return { duration: 0 };
	let t = getComputedStyle(e).getPropertyValue("--mat-sys-motion-spring-fast-spatial").trim().match(/^([\d.]+)ms\s+(.+)$/u);
	return t ? {
		duration: Number(t[1]),
		easing: t[2]
	} : {
		duration: 200,
		easing: "ease-out"
	};
}
function mi(e) {
	let t = k(!1), n = /* @__PURE__ */ new Map(), r = !1, i = "", a, o, s, c, l, u = {};
	function d(e) {
		u[e.type]?.(e);
	}
	function f() {
		if (!e.root.value) return [];
		let t = /* @__PURE__ */ new Map();
		return n.forEach((n) => {
			n.element.value?.parentElement === e.root.value && t.set(n.element.value, n);
		}), Array.from(e.root.value.children).filter((e) => !e.hasAttribute("data-mat-list-drag-placeholder")).map((e) => ({
			element: e,
			record: t.get(e)
		}));
	}
	function p(e) {
		let t = e.map((e) => e.record).filter((e) => e !== void 0), n = /* @__PURE__ */ new Set();
		return t.forEach((e) => {
			let { value: r } = e.value, i = t.some((t) => t !== e && Object.is(t.value.value, r));
			!e.disabled.value && r !== void 0 && !i && n.add(e);
		}), n;
	}
	function m() {
		if (r = !1, !e.enabled.value) {
			i = "";
			return;
		}
		let t = f().map((e) => e.record).filter((e) => e !== void 0), n = t.filter((e) => {
			let { value: n } = e.value;
			return n === void 0 || t.some((t) => t !== e && Object.is(t.value.value, n));
		}).map((e) => ci(e.value.value)).sort().join("|");
		!n || n === i || (i = n, console.warn("MatList: draggable 模式下的直属 MatListItem 必须提供稳定且唯一的 value；无效项目将作为固定边界"));
	}
	function h() {
		r || (r = !0, _(m));
	}
	function g() {
		globalThis.clearTimeout(c), c = void 0, s = void 0;
	}
	function v(e) {
		g(), s = e, c = globalThis.setTimeout(g, 600);
	}
	function y() {
		window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", d), window.removeEventListener("pointercancel", d), window.removeEventListener("blur", d), document.removeEventListener("keydown", d);
	}
	function b() {
		a &&= (globalThis.clearTimeout(a.timer), void 0);
	}
	function S() {
		o && (o.source.style.display = o.sourceDisplay, o.placeholder.remove(), o.preview.remove(), si(), o = void 0, t.value = !1);
	}
	function C() {
		b(), l?.cancel(), S(), y();
	}
	function w(e) {
		return new Map(e.map((e) => [e, e.getBoundingClientRect()]));
	}
	function T(t, n) {
		if (!e.root.value || typeof Element.prototype.animate != "function") return;
		let r = pi(e.root.value);
		n.forEach((e) => {
			let n = t.get(e), i = e.getBoundingClientRect(), a = n ? n.top - i.top : 0;
			a !== 0 && e.animate([{ transform: `translateY(${a}px)` }, { transform: "translateY(0)" }], r);
		});
	}
	function E(e) {
		if (!o) return 0;
		let t = o.scrollContainer, n = t === document.documentElement || t === document.body || t === document.scrollingElement ? {
			top: 0,
			bottom: globalThis.innerHeight
		} : t.getBoundingClientRect(), r = 0;
		if (e < n.top + ei ? r = -Math.ceil(ti * ((n.top + ei - e) / ei)) : e > n.bottom - ei && (r = Math.ceil(ti * ((e - n.bottom + ei) / ei))), r === 0) return 0;
		let i = t.scrollTop;
		return t.scrollTop += r, t.scrollTop - i;
	}
	function D(t) {
		if (!o || t.pointerId !== o.pointerId) return;
		let n = t.clientX - o.startClientX, r = t.clientY - o.startClientY;
		o.preview.style.transform = `translate(${n}px, ${r}px)`;
		let i = o.segment.filter((e) => e !== o.record), a = i.length;
		for (let e = 0; e < i.length; e += 1) {
			let n = i[e].element.value?.getBoundingClientRect();
			if (n && t.clientY < n.top + n.height / 2) {
				a = e;
				break;
			}
		}
		if (a !== o.insertionIndex && e.root.value) {
			let t = i.map((e) => e.element.value).filter((e) => e !== null), n = w(t), r = i[a]?.element.value ?? o.boundaryAfter;
			e.root.value.insertBefore(o.placeholder, r), o.insertionIndex = a, o.toIndex = o.segmentStartIndex + a, T(n, t);
		}
		E(t.clientY) !== 0 && l.schedule(t);
	}
	l = Zr(D);
	function O() {
		window.addEventListener("pointermove", d, { passive: !1 }), window.addEventListener("pointerup", d), window.addEventListener("pointercancel", d), window.addEventListener("blur", d), document.addEventListener("keydown", d);
	}
	function A() {
		if (!a || !e.root.value) return;
		let n = a, r = f(), i = p(r), s = r.findIndex((e) => e.record === n.record);
		if (s === -1 || !i.has(n.record)) {
			C();
			return;
		}
		let c = s, l = s;
		for (; c > 0 && i.has(r[c - 1].record);) --c;
		for (; l + 1 < r.length && i.has(r[l + 1].record);) l += 1;
		let u = r.slice(c, l + 1).map((e) => e.record).filter((e) => e !== void 0), d = r.map((e) => e.record).filter((e) => e !== void 0), m = n.record.element.value;
		if (!m) {
			C();
			return;
		}
		let h = m.getBoundingClientRect(), g = document.createElement(m.tagName.toLowerCase()), _ = fi(m, h), v = m.matches(".mat-list-item__surface") ? m : m.querySelector(".mat-list-item__surface") ?? m, y = getComputedStyle(v), b = m.style.display, x = u.indexOf(n.record);
		g.setAttribute("aria-hidden", "true"), g.setAttribute("data-mat-list-drag-placeholder", ""), g.style.blockSize = `${h.height}px`, g.style.inlineSize = `${h.width}px`, di(g, y), e.root.value.insertBefore(g, m), m.style.display = "none", o = {
			record: n.record,
			source: m,
			sourceDisplay: b,
			placeholder: g,
			preview: _,
			pointerId: n.pointerId,
			startClientX: n.clientX,
			startClientY: n.clientY,
			fromIndex: d.indexOf(n.record),
			toIndex: d.indexOf(n.record),
			insertionIndex: x,
			segment: u,
			segmentStartIndex: d.indexOf(u[0]),
			boundaryAfter: r[l + 1]?.element ?? null,
			scrollContainer: li(m),
			value: n.record.value.value
		}, a = void 0, oi(), t.value = !0;
		try {
			m.setPointerCapture?.(o.pointerId);
		} catch {}
	}
	function j(e) {
		if (a && e.pointerId === a.pointerId) {
			Math.hypot(e.clientX - a.clientX, e.clientY - a.clientY) > $r && C();
			return;
		}
		!o || e.pointerId !== o.pointerId || (e.cancelable && e.preventDefault(), l.schedule(e));
	}
	function M(t) {
		if (a && t.pointerId === a.pointerId) {
			C();
			return;
		}
		if (!o || t.pointerId !== o.pointerId) return;
		l.schedule(t), l.flush();
		let n = o;
		if (y(), v(n.source), n.fromIndex !== n.toIndex) {
			e.emitReorder({
				value: n.value,
				fromIndex: n.fromIndex,
				toIndex: n.toIndex,
				originalEvent: t
			}), _(() => {
				o === n && S();
			});
			return;
		}
		S();
	}
	function N() {
		C();
	}
	function P() {
		C();
	}
	function F(e) {
		e.key === "Escape" && (a || o) && (e.preventDefault(), C());
	}
	function I(t) {
		if (!e.enabled.value || t.button !== 0 || t.isPrimary === !1 || !(t.target instanceof Element) || t.target.closest("[data-mat-list-trailing]")) return;
		let n = f(), r = p(n), i = n.find((e) => e.record && r.has(e.record) && e.element.contains(t.target));
		i?.record && (C(), a = {
			record: i.record,
			pointerId: t.pointerId,
			clientX: t.clientX,
			clientY: t.clientY,
			timer: globalThis.setTimeout(A, Qr)
		}, O());
	}
	function L(e) {
		!(e.target instanceof Node) || !s?.contains(e.target) || (e.preventDefault(), e.stopImmediatePropagation(), g());
	}
	function R(e) {
		n.set(e.token, e), h();
	}
	function z(e) {
		let t = n.get(e);
		t && (a?.record === t || o?.record === t) && C(), n.delete(e), h();
	}
	return Object.assign(u, {
		pointermove: j,
		pointerup: M,
		pointercancel: N,
		blur: P,
		keydown: F
	}), V(e.enabled, (e) => {
		e || C(), h();
	}), x(() => {
		C(), g();
	}), {
		dragging: t,
		handleClickCapture: L,
		handlePointerDown: I,
		queueValidation: h,
		registerItem: R,
		unregisterItem: z
	};
}
var hi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Hr.includes(e);
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
				return e.every(qr);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		draggable: {
			type: Boolean,
			default: !1
		},
		virtual: {
			type: Boolean,
			default: !1
		},
		items: {
			type: Array,
			default: () => []
		},
		itemHeight: {
			type: [Number, String],
			default: void 0,
			validator: (e) => vt(e, { positive: !0 })
		},
		estimatedItemHeight: {
			type: [Number, String],
			default: 48,
			validator: (e) => vt(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		buffer: {
			type: [Number, String],
			default: 3,
			validator: (e) => vt(e, { allowUndefined: !1 })
		},
		itemKey: {
			type: [Function, String],
			default: void 0
		}
	},
	emits: {
		select(e) {
			return e && Object.hasOwn(e, "value") && Object.hasOwn(e, "nextSelected") && e.originalEvent instanceof Event;
		},
		"update:expanded"(e) {
			return Array.isArray(e) && e.every(qr);
		},
		reorder(e) {
			return e && Object.hasOwn(e, "value") && Number.isInteger(e.fromIndex) && Number.isInteger(e.toIndex) && e.originalEvent instanceof PointerEvent;
		},
		scroll(e) {
			return typeof e?.scrollTop == "number" && typeof e?.startIndex == "number" && typeof e?.endIndex == "number";
		},
		"visible-range-change"(e) {
			return typeof e?.startIndex == "number" && typeof e?.endIndex == "number";
		}
	},
	setup(e, { expose: n, emit: r }) {
		let c = $("list", e), l = r, u = k(null), d = i(() => Gr(c.interaction)), f = i(() => d.value ? "div" : "ul"), { colorStyle: p } = lt(i(() => c.color)), m = [], h = [
			"[data-mat-list-primary]",
			"[data-mat-list-trailing] a[href]",
			"[data-mat-list-trailing] button",
			"[data-mat-list-trailing] input",
			"[data-mat-list-trailing] select",
			"[data-mat-list-trailing] textarea",
			"[data-mat-list-trailing] [contenteditable]:not([contenteditable=\"false\"])",
			"[data-mat-list-trailing] [tabindex]"
		].join(",");
		function v(e) {
			return c.interaction === "multi-select" ? Array.isArray(c.selected) && c.selected.some((t) => Object.is(t, e)) : c.interaction === "single-select" && Object.is(c.selected, e);
		}
		function b(e, t) {
			if (e === void 0) {
				console.warn("MatList: 选择模式下的 MatListItem 必须提供 value");
				return;
			}
			let n = v(e);
			if (c.interaction === "single-select") {
				if (n) return;
				l("select", {
					value: e,
					selected: !0,
					nextSelected: e,
					originalEvent: t
				});
				return;
			}
			if (c.interaction === "multi-select") {
				let r = Array.isArray(c.selected) ? c.selected : [];
				l("select", {
					value: e,
					selected: !n,
					nextSelected: n ? r.filter((t) => !Object.is(t, e)) : [...r, e],
					originalEvent: t
				});
			}
		}
		function x(e) {
			return c.expanded.some((t) => Object.is(t, e));
		}
		function S(e, t) {
			x(e) !== t && l("update:expanded", t ? [...c.expanded, e] : c.expanded.filter((t) => !Object.is(t, e)));
		}
		function w(e, t) {
			m.some((n) => n.token !== e && Object.is(n.value, t)) && console.warn(`MatListGroup: 同一 MatList 中的 value 必须唯一，重复值为 ${String(t)}`), m.push({
				token: e,
				value: t
			});
		}
		function D(e) {
			let t = m.findIndex((t) => t.token === e);
			t !== -1 && m.splice(t, 1);
		}
		function O(e) {
			return !(e instanceof HTMLElement) || e.closest("[data-mat-list-disabled=\"true\"]") || e.closest("[data-mat-list-group-content][inert]") || e.matches(":disabled") || e.getAttribute("aria-disabled") === "true" ? !1 : e.hasAttribute("data-mat-list-group-activator") ? !0 : !e.hasAttribute("data-mat-list-primary") && c.interaction !== "multi-action" && !d.value ? !1 : c.interaction !== "none";
		}
		function A(e) {
			if (d.value) {
				let t = e.find((e) => e.getAttribute("aria-selected") === "true");
				if (t) return t;
			}
			return e[0] ?? null;
		}
		let P = Kr({
			root: u,
			selector: h,
			isAvailable: O,
			findInitial: A,
			observedAttributes: [
				"aria-disabled",
				"aria-hidden",
				"disabled",
				"href",
				"inert"
			]
		}), { calculate: F, getItemKey: I, getScroller: R, paddingBottom: z, paddingTop: B, refresh: H, scrollTo: W, scrollToIndex: G, setItemRef: K, visibleItems: ee } = Xr({
			root: u,
			props: c,
			enabled: i(() => c.virtual),
			pinEdges: i(() => c.virtual),
			emit: l
		}), q = i(() => c.items ? c.items.length : 0), J = i(() => q.value > 0 ? {
			item: c.items[0],
			index: 0
		} : null), Y = i(() => {
			if (q.value > 1) {
				let e = q.value - 1;
				return {
					item: c.items[e],
					index: e
				};
			}
			return null;
		}), X = mi({
			root: u,
			enabled: i(() => c.draggable),
			emitReorder(e) {
				l("reorder", e);
			}
		});
		function Z(e) {
			let t = {
				ArrowDown: 1,
				ArrowRight: 1,
				ArrowUp: -1,
				ArrowLeft: -1
			}[e.key];
			t === void 0 || !(e.target instanceof HTMLElement) || (e.preventDefault(), P.move(e.target, t));
		}
		return E(Ur, {
			interaction: i(() => c.interaction),
			isSelectable: d,
			variant: i(() => c.variant),
			isGroupExpanded: x,
			isSelected: v,
			registerGroupValue: w,
			requestFocusRefresh: P.queueRefresh,
			requestGroupExpanded: S,
			requestSelection: b,
			registerDragItem: X.registerItem,
			requestDragValidation: X.queueValidation,
			unregisterGroupValue: D,
			unregisterDragItem: X.unregisterItem
		}), C(P.observe), V(u, async () => {
			P.restore(), await _(), P.observe();
		}), V(() => c.interaction, async () => {
			P.restore(), await _(), P.observe();
		}), V(() => c.selected, async () => {
			u.value?.contains(document.activeElement) || P.resetActive(), await _(), P.queueRefresh();
		}, { deep: !0 }), n({
			calculate: F,
			getScroller: R,
			refresh: H,
			scrollTo: W,
			scrollToIndex: G
		}), (e, n) => (T(), a(N(f.value), g({
			ref_key: "root",
			ref: u
		}, e.$attrs, {
			class: ["mat-list", [`mat-list--${L(c).variant}`, {
				"mat-list--virtual": L(c).virtual,
				"mat-list--draggable": L(c).draggable,
				"mat-list--dragging": L(X).dragging.value
			}]],
			style: L(p),
			"aria-multiselectable": L(c).interaction === "multi-select" ? "true" : e.$attrs["aria-multiselectable"],
			"aria-orientation": d.value ? "vertical" : e.$attrs["aria-orientation"],
			role: d.value ? "listbox" : e.$attrs.role,
			onClickCapture: L(X).handleClickCapture,
			onFocusin: L(P).handleFocusIn,
			onKeydown: Z,
			onPointerdown: L(X).handlePointerDown
		}), {
			default: U(() => [L(c).virtual ? q.value > 0 ? (T(), s(t, { key: 1 }, [
				J.value ? M(e.$slots, "default", {
					key: 0,
					item: J.value.item,
					index: J.value.index,
					itemRef: (e) => L(K)(J.value.index, e),
					isFirst: !0,
					isLast: q.value === 1
				}, void 0, !0) : o("", !0),
				q.value >= 3 && L(B) > 0 ? (T(), s("div", {
					key: 1,
					class: "mat-list__spacer",
					style: y({ height: `${L(B)}px` }),
					"aria-hidden": "true"
				}, null, 4)) : o("", !0),
				(T(!0), s(t, null, j(q.value >= 3 ? L(ee) : [], (t) => M(e.$slots, "default", {
					key: L(I)(t.item, t.index),
					item: t.item,
					index: t.index,
					itemRef: (e) => L(K)(t.index, e),
					isFirst: !1,
					isLast: !1
				}, void 0, !0)), 128)),
				q.value >= 3 && L(z) > 0 ? (T(), s("div", {
					key: 2,
					class: "mat-list__spacer",
					style: y({ height: `${L(z)}px` }),
					"aria-hidden": "true"
				}, null, 4)) : o("", !0),
				Y.value ? M(e.$slots, "default", {
					key: 3,
					item: Y.value.item,
					index: Y.value.index,
					itemRef: (e) => L(K)(Y.value.index, e),
					isFirst: !1,
					isLast: !0
				}, void 0, !0) : o("", !0)
			], 64)) : o("", !0) : M(e.$slots, "default", { key: 0 }, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-multiselectable",
			"aria-orientation",
			"role",
			"onClickCapture",
			"onFocusin",
			"onPointerdown"
		]));
	}
}), [["__scopeId", "data-v-9b520a56"]]), gi = Symbol("mat-expansion"), _i = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatExpansion",
	inheritAttrs: !1
}, {
	__name: "MatExpansion",
	props: {
		modelValue: {
			type: [
				Array,
				String,
				Number,
				Boolean
			],
			default: void 0,
			validator(e) {
				return e == null ? !0 : Array.isArray(e) ? e.every(qr) : qr(e);
			}
		},
		multiple: {
			type: Boolean,
			default: !0
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		as: {
			type: String,
			default: "div"
		},
		variant: {
			type: String,
			default: "segmented",
			validator(e) {
				return ["standard", "segmented"].includes(e);
			}
		}
	},
	emits: { "update:modelValue"(e) {
		return e == null ? !0 : Array.isArray(e) ? e.every(qr) : qr(e);
	} },
	setup(e, { emit: t }) {
		let n = $("expansion", e), r = t, o = k(n.multiple ? [] : null), { colorStyle: s, hasExplicitColor: c } = lt(i(() => n.color)), l = i(() => n.modelValue !== void 0), u = i(() => l.value ? n.modelValue : o.value), f = i(() => {
			let e = u.value;
			return n.multiple ? Array.isArray(e) ? e : [] : e == null ? [] : [e];
		});
		function p(e) {
			if (n.multiple) {
				l.value || (o.value = e), r("update:modelValue", e);
				return;
			}
			let t = f.value, i = e.filter((e) => !t.some((t) => Object.is(t, e))), a = i.length > 0 ? i[i.length - 1] : null;
			l.value || (o.value = a), r("update:modelValue", a);
		}
		function m(e) {
			return f.value.some((t) => Object.is(t, e));
		}
		return E(gi, {
			isExpanded: m,
			color: i(() => n.color),
			disabled: i(() => n.disabled),
			variant: i(() => n.variant),
			multiple: i(() => n.multiple)
		}), (e, t) => (T(), a(N(L(n).as), g(e.$attrs, {
			class: ["mat-expansion", { "mat-expansion--explicit-color": L(c) }],
			style: L(s)
		}), {
			default: U(() => [d(hi, {
				variant: L(n).variant,
				color: L(n).color,
				expanded: f.value,
				"onUpdate:expanded": p
			}, {
				default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, [
				"variant",
				"color",
				"expanded"
			])]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-f96e5c0a"]]), vi = ["data-line-count"], yi = ["inert"], bi = ["inert"], xi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
		return (t, n) => (T(), s("span", {
			"data-mat-item-content": "",
			"data-line-count": e.lineCount,
			class: v([
				e.namespace,
				`${e.namespace}--lines-${e.lineCount}`,
				{ [`${e.namespace}--separate-trailing`]: e.separateTrailing }
			])
		}, [
			t.$slots.leading ? (T(), s("span", {
				key: 0,
				"data-mat-item-content-leading": "",
				class: v(`${e.namespace}__leading`),
				inert: e.presentationSlots ? "" : void 0
			}, [M(t.$slots, "leading", {}, void 0, !0)], 10, yi)) : o("", !0),
			c("span", {
				"data-mat-item-content-text": "",
				class: v(`${e.namespace}__text`)
			}, [
				t.$slots.overline ? (T(), s("span", {
					key: 0,
					"data-mat-item-content-overline": "",
					class: v([`${e.namespace}__overline`, e.trailingTypographyClass])
				}, [M(t.$slots, "overline", {}, void 0, !0)], 2)) : o("", !0),
				c("span", {
					"data-mat-item-content-label": "",
					class: v([`${e.namespace}__label`, e.labelTypographyClass])
				}, [M(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.supporting ? (T(), s("span", {
					key: 1,
					"data-mat-item-content-supporting": "",
					class: v([`${e.namespace}__supporting`, e.supportingTypographyClass])
				}, [M(t.$slots, "supporting", {}, void 0, !0)], 2)) : o("", !0)
			], 2),
			t.$slots.trailing && !e.separateTrailing ? (T(), s("span", {
				key: 1,
				"data-mat-item-content-trailing": "",
				class: v([`${e.namespace}__trailing`, e.trailingTypographyClass]),
				inert: e.presentationSlots ? "" : void 0
			}, [M(t.$slots, "trailing", {}, void 0, !0)], 10, bi)) : o("", !0)
		], 10, vi));
	}
}), [["__scopeId", "data-v-3223d16a"]]), Si = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		let t = e, n = k(null), r = i(() => n.value instanceof HTMLElement ? n.value : n.value?.$el instanceof HTMLElement ? n.value.$el : null), o = k(!1), s = i(() => t.lineCount === 3 || o.value), c;
		function u() {
			if (!r.value) return;
			let e = Array.from(r.value.children).reduce((e, t) => Math.max(e, t.getBoundingClientRect().height, t.scrollHeight), 0);
			o.value = e > 56;
		}
		function d() {
			c?.disconnect(), c = void 0, u(), !(!r.value || typeof ResizeObserver > "u") && (c = new ResizeObserver(u), Array.from(r.value.children).forEach((e) => {
				c.observe(e);
			}));
		}
		return C(async () => {
			await _(), d();
		}), w(d), x(() => {
			c?.disconnect();
		}), (t, r) => (T(), a(xi, {
			ref_key: "contentRoot",
			ref: n,
			namespace: "mat-list-item-content",
			"label-typography-class": "mat-sys-typescale-body-large",
			"line-count": e.lineCount,
			class: v({ "mat-list-item-content--large-content": s.value }),
			"presentation-slots": e.presentationSlots,
			"separate-trailing": e.separateTrailing,
			"supporting-typography-class": "mat-sys-typescale-body-medium",
			"trailing-typography-class": "mat-sys-typescale-label-small"
		}, l({
			default: U(() => [M(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: U(() => [M(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: U(() => [M(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [M(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [M(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, [
			"line-count",
			"class",
			"presentation-slots",
			"separate-trailing"
		]));
	}
}), [["__scopeId", "data-v-c5a4a0b9"]]), Ci = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], wi = ["aria-disabled", "data-mat-list-disabled"], Ti = ["aria-disabled", "data-mat-list-disabled"], Ei = ["inert"], Di = ["aria-disabled", "data-mat-list-disabled"], Oi = ["inert"], ki = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Fe.includes(e);
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
		},
		separateTrailing: {
			type: Boolean,
			default: !1
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = $("listItem", e), r = t, u = B(), f = m(Ur, null), p = m(Wr, null), h = m(je, Ae), y = i(() => f?.interaction.value ?? "none"), b = i(() => y.value === "single-action" || y.value === "multi-action"), S = i(() => y.value === "multi-action"), w = i(() => f?.isSelectable.value ?? !1), E = i(() => f?.isSelected(n.value) ?? !1), D = i(() => !!u.trailing), O = i(() => D.value && (S.value || w.value && n.separateTrailing)), A = k(null), j = Symbol("mat-list-item-drag"), N = i(() => A.value instanceof HTMLElement ? A.value : A.value?.$el instanceof HTMLElement ? A.value.$el : null), P = i(() => n.value), F = i(() => n.disabled || !!p), I = i(() => {
			if (n.lines !== void 0) return n.lines;
			let e = Number(!!u.overline) + Number(!!u.supporting);
			return Math.min(3, 1 + e);
		}), R = i(() => ({
			"mat-list-item--disabled": n.disabled,
			"mat-list-item--selected": E.value,
			[`mat-list-item--lines-${I.value}`]: !0
		}));
		function z(e) {
			if (w.value) {
				f?.requestSelection(n.value, e);
				return;
			}
			b.value && r("click", e);
		}
		function H() {
			n.disabled || p?.toggle();
		}
		function W(e) {
			n.disabled || e.repeat || ![" ", "Enter"].includes(e.key) || (e.preventDefault(), f?.requestSelection(n.value, e));
		}
		function G() {
			n.href !== void 0 && !p && !b.value && console.warn("MatListItem: href 仅在 single-action 或 multi-action 模式下生效");
		}
		return C(async () => {
			G(), f?.registerDragItem?.({
				token: j,
				element: N,
				value: P,
				disabled: F
			}), await _(), f?.requestFocusRefresh();
		}), x(() => {
			f?.unregisterDragItem?.(j);
		}), V(() => [
			n.disabled,
			n.href,
			n.value,
			y.value,
			n.separateTrailing
		], async () => {
			G(), f?.requestDragValidation?.(), await _(), f?.requestFocusRefresh();
		}), (e, t) => L(p)?.static.value ? (T(), s("div", g({
			key: 0,
			ref_key: "itemRoot",
			ref: A
		}, e.$attrs, {
			id: L(p).labelId,
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", R.value],
			"data-mat-list-group-label": "",
			"aria-disabled": L(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": L(n).disabled ? "true" : void 0
		}), [d(Si, {
			"line-count": I.value,
			"presentation-slots": !1
		}, l({
			default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			e.$slots.leading ? {
				name: "leading",
				fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			e.$slots.overline ? {
				name: "overline",
				fn: U(() => [M(e.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			e.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [M(e.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			e.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [M(e.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, Ci)) : L(p) ? (T(), a(De, g({
			key: 1,
			ref_key: "itemRoot",
			ref: A
		}, e.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator", R.value],
			"data-mat-list-primary": "",
			"data-mat-list-group-activator": "",
			"aria-controls": L(p).contentId,
			"aria-expanded": L(p).expanded.value ? "true" : "false",
			"data-mat-list-disabled": L(n).disabled ? "true" : void 0,
			disabled: L(n).disabled,
			"focus-ring": !0,
			type: "button",
			"use-cursor": L(h).useCursor,
			onClick: H
		}), {
			default: U(() => [d(Si, {
				"line-count": I.value,
				"presentation-slots": !1
			}, l({
				default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: U(() => [M(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [M(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: U(() => [M(e.$slots, "trailing", {}, void 0, !0)]),
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
		])) : y.value === "none" ? (T(), s("li", g({
			key: 2,
			ref_key: "itemRoot",
			ref: A
		}, e.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", R.value],
			"aria-disabled": L(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": L(n).disabled ? "true" : void 0
		}), [d(Si, {
			"line-count": I.value,
			"presentation-slots": !1
		}, l({
			default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			e.$slots.leading ? {
				name: "leading",
				fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			e.$slots.overline ? {
				name: "overline",
				fn: U(() => [M(e.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			e.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [M(e.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			e.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [M(e.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, wi)) : b.value ? (T(), s("li", {
			key: 3,
			ref_key: "itemRoot",
			ref: A,
			class: v(["mat-list-item", [R.value, {
				"mat-list-item__surface": S.value,
				"mat-list-item--multi-action": S.value
			}]]),
			"aria-disabled": L(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": L(n).disabled ? "true" : void 0
		}, [d(De, g(e.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !S.value }],
			"data-mat-list-primary": "",
			disabled: L(n).disabled,
			"focus-ring": !0,
			href: L(n).href,
			type: L(n).type,
			"use-cursor": L(h).useCursor,
			onClick: z
		}), {
			default: U(() => [d(Si, {
				"line-count": I.value,
				"presentation-slots": !1,
				"separate-trailing": S.value && D.value
			}, l({
				default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: U(() => [M(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [M(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: U(() => [M(e.$slots, "trailing", {}, void 0, !0)]),
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
		]), S.value && D.value ? (T(), s("span", {
			key: 0,
			class: "mat-list-item__separate-trailing mat-sys-typescale-label-small",
			"data-mat-list-trailing": "",
			inert: L(n).disabled ? "" : void 0
		}, [M(e.$slots, "trailing", {}, void 0, !0)], 8, Ei)) : o("", !0)], 10, Ti)) : w.value && O.value ? (T(), s("div", {
			key: 4,
			ref_key: "itemRoot",
			ref: A,
			class: v(["mat-list-item mat-list-item__surface mat-list-item--multi-action mat-list-item--selectable", R.value]),
			"aria-disabled": L(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": L(n).disabled ? "true" : void 0
		}, [d(De, g(e.$attrs, {
			as: "div",
			class: "mat-list-item__primary",
			"data-mat-list-primary": "",
			"aria-selected": E.value ? "true" : "false",
			disabled: L(n).disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": L(h).useCursor,
			onClick: z,
			onKeydown: W
		}), {
			default: U(() => [d(Si, {
				"line-count": I.value,
				"presentation-slots": "",
				"separate-trailing": !0
			}, l({
				default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: U(() => [M(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [M(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0
			]), 1032, ["line-count"])]),
			_: 3
		}, 16, [
			"aria-selected",
			"disabled",
			"use-cursor"
		]), c("span", {
			class: "mat-list-item__separate-trailing mat-sys-typescale-label-small",
			"data-mat-list-trailing": "",
			inert: L(n).disabled ? "" : void 0
		}, [M(e.$slots, "trailing", {}, void 0, !0)], 8, Oi)], 10, Di)) : (T(), a(De, g({
			key: 5,
			ref_key: "itemRoot",
			ref: A
		}, e.$attrs, {
			as: "div",
			class: ["mat-list-item mat-list-item__surface mat-list-item--selectable", R.value],
			"data-mat-list-primary": "",
			"data-mat-list-disabled": L(n).disabled ? "true" : void 0,
			"aria-selected": E.value ? "true" : "false",
			disabled: L(n).disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": L(h).useCursor,
			onClick: z,
			onKeydown: W
		}), {
			default: U(() => [d(Si, {
				"line-count": I.value,
				"presentation-slots": ""
			}, l({
				default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: U(() => [M(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [M(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: U(() => [M(e.$slots, "trailing", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-7a53b2a6"]]), Ai = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return E(Wr, e.context), (e, t) => M(e.$slots, "default");
	}
}), ji = [
	"role",
	"aria-hidden",
	"inert"
], Mi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatListGroup",
	inheritAttrs: !1
}, {
	__name: "MatListGroup",
	props: {
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		as: {
			type: String,
			default: void 0
		}
	},
	setup(n) {
		let r = $("listGroup", n), o = m(Ur, null), s = B(), l = k(null), u = k(!1), f = k(null), p = Symbol("mat-list-group"), v = z().replace(/[^\w-]/g, "-"), y = `mat-list-group-${v}-content`, b = `mat-list-group-${v}-label`, S = !1, E, D = i(() => r.value !== void 0), O = i(() => o?.isSelectable.value ?? !1), A = i(() => D.value ? o?.isGroupExpanded(r.value) ?? !1 : u.value);
		function j(n) {
			return n.flatMap((n) => h(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? j(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let P = i(() => {
			let e = j(s.activator?.({ expanded: A.value }) ?? []);
			if (e.length !== 1 || !h(e[0])) return !1;
			let t = e[0].type;
			return t === ki || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), F = i(() => f.value ?? P.value), I = i(() => O.value || !F.value || A.value), R = i(() => o?.variant.value ?? "segmented");
		function H() {
			(l.value?.querySelector(":scope > [data-mat-list-group-content]"))?.contains(document.activeElement) && l.value?.querySelector(":scope > [data-mat-list-group-activator]")?.focus();
		}
		function W() {
			if (!(O.value || !F.value)) {
				if (A.value && H(), D.value) {
					o?.requestGroupExpanded(r.value, !A.value);
					return;
				}
				u.value = !u.value;
			}
		}
		let G = {
			contentId: y,
			expanded: I,
			labelId: b,
			static: O,
			toggle: W
		};
		function K() {
			!F.value && !S ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), S = !0) : F.value && (S = !1);
		}
		function ee() {
			if (!l.value) return;
			let e = O.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(l.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			f.value !== t && (f.value = t);
		}
		function q() {
			ee(), K();
		}
		function J(e) {
			e !== void 0 && (o?.registerGroupValue(p, e), E = e);
		}
		function Y() {
			E !== void 0 && (o?.unregisterGroupValue(p), E = void 0);
		}
		return C(() => {
			o || console.warn("MatListGroup: 必须直接放置在 MatList 中"), O.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), J(r.value), q(), o?.requestFocusRefresh();
		}), w(q), x(() => {
			Y(), o?.requestFocusRefresh();
		}), V(() => r.value, (e, t) => {
			Object.is(e, t) || (Y(), J(e));
		}), V(A, async (e, t) => {
			t && !e && H(), await _(), o?.requestFocusRefresh();
		}), V(O, async (e, t) => {
			e && !t && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), await _(), o?.requestFocusRefresh();
		}), (e, t) => (T(), a(N(L(r).as || (O.value ? "div" : "li")), g({
			ref_key: "root",
			ref: l
		}, e.$attrs, {
			class: ["mat-list-group", [`mat-list-group--${R.value}`, {
				"mat-list-group--expanded": I.value,
				"mat-list-group--selectable-fallback": O.value
			}]],
			role: O.value ? "group" : void 0,
			"aria-labelledby": O.value ? b : void 0
		}), {
			default: U(() => [d(Ai, { context: G }, {
				default: U(() => [M(e.$slots, "activator", { expanded: I.value }, void 0, !0)]),
				_: 3
			}), c("div", {
				id: y,
				class: "mat-list-group__content",
				"data-mat-list-group-content": "",
				role: O.value ? "presentation" : void 0,
				"aria-hidden": I.value ? void 0 : "true",
				inert: I.value ? void 0 : ""
			}, [(T(), a(N(O.value ? "div" : "ul"), {
				class: "mat-list-group__items",
				role: O.value ? "presentation" : void 0
			}, {
				default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, ["role"]))], 8, ji)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-0cfce62b"]]), Ni = {
	key: 0,
	class: "mat-expansion-panel__body"
}, Pi = {
	key: 0,
	class: "mat-expansion-panel__body"
}, Fi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatExpansionPanel",
	inheritAttrs: !1
}, {
	__name: "MatExpansionPanel",
	props: {
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		modelValue: {
			type: Boolean,
			default: void 0
		},
		title: {
			type: String,
			default: void 0
		},
		split: {
			type: Boolean,
			default: !0
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		as: {
			type: String,
			default: "div"
		}
	},
	emits: { "update:modelValue"(e) {
		return typeof e == "boolean";
	} },
	setup(e, { emit: t }) {
		let n = $("expansionPanel", e), r = t, o = f(), c = m(gi, null), l = "expansion-panel-" + z().replace(/[^\w-]/g, "-"), p = i(() => n.value === void 0 ? l : n.value), h = i(() => n.disabled || !!c?.disabled.value), _ = i(() => n.color || c?.color.value), y = i(() => c?.variant.value ?? "segmented"), { colorStyle: b, hasExplicitColor: x } = lt(i(() => n.color || c?.color.value)), S = i(() => {
			let e = o?.vnode?.props ?? {};
			return "modelValue" in e || "model-value" in e;
		}), C = k(!!n.modelValue);
		V(() => n.modelValue, (e) => {
			e !== void 0 && (C.value = !!e);
		});
		let w = i(() => c ? c.isExpanded(p.value) : S.value ? !!n.modelValue : C.value), E = i(() => w.value ? [p.value] : []);
		function D(e) {
			let t = e.includes(p.value);
			S.value || (C.value = t), r("update:modelValue", t);
		}
		return (e, t) => L(c) ? (T(), a(Mi, g({ key: 0 }, e.$attrs, {
			value: p.value,
			as: L(n).as,
			class: ["mat-expansion-panel", [L(n).split ? "mat-expansion-panel--split" : "mat-expansion-panel--unsplit", {
				"mat-expansion-panel--expanded": w.value,
				"mat-expansion-panel--explicit-color": L(x)
			}]],
			style: L(b)
		}), {
			activator: U(({ expanded: t }) => [M(e.$slots, "activator", { expanded: t }, () => [d(ki, { disabled: h.value }, {
				trailing: U(() => [d(pt, {
					icon: "expand_more",
					class: v(["mat-expansion-panel__indicator", { "mat-expansion-panel__indicator--expanded": t }])
				}, null, 8, ["class"])]),
				default: U(() => [u(I(L(n).title) + " ", 1)]),
				_: 2
			}, 1032, ["disabled"])], !0)]),
			default: U(() => [L(n).split ? M(e.$slots, "default", { key: 1 }, void 0, !0) : (T(), s("div", Ni, [M(e.$slots, "default", {}, void 0, !0)]))]),
			_: 3
		}, 16, [
			"value",
			"as",
			"class",
			"style"
		])) : (T(), a(hi, {
			key: 1,
			variant: y.value,
			color: _.value,
			expanded: E.value,
			"onUpdate:expanded": D
		}, {
			default: U(() => [d(Mi, g(e.$attrs, {
				value: p.value,
				class: ["mat-expansion-panel", [L(n).split ? "mat-expansion-panel--split" : "mat-expansion-panel--unsplit", {
					"mat-expansion-panel--expanded": w.value,
					"mat-expansion-panel--explicit-color": L(x)
				}]],
				style: L(b)
			}), {
				activator: U(({ expanded: t }) => [M(e.$slots, "activator", { expanded: t }, () => [d(ki, { disabled: h.value }, {
					trailing: U(() => [d(pt, {
						icon: "expand_more",
						class: v(["mat-expansion-panel__indicator", { "mat-expansion-panel__indicator--expanded": t }])
					}, null, 8, ["class"])]),
					default: U(() => [u(I(L(n).title) + " ", 1)]),
					_: 2
				}, 1032, ["disabled"])], !0)]),
				default: U(() => [L(n).split ? M(e.$slots, "default", { key: 1 }, void 0, !0) : (T(), s("div", Pi, [M(e.$slots, "default", {}, void 0, !0)]))]),
				_: 3
			}, 16, [
				"value",
				"class",
				"style"
			])]),
			_: 3
		}, 8, [
			"variant",
			"color",
			"expanded"
		]));
	}
}), [["__scopeId", "data-v-75c0236c"]]), Ii = Symbol("mat-menu"), Li = Symbol("mat-menu-item"), Ri = Symbol("mat-menu-group");
function zi(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function Bi(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = zi(t, a, o), c = zi(e, a, o), l = zi(t, e, o), u = zi(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function Vi(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
var Hi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatDivider",
	inheritAttrs: !1
}, {
	__name: "MatDivider",
	props: {
		inset: {
			type: [Boolean, String],
			default: !1,
			validator(e) {
				return typeof e == "boolean" || [
					"none",
					"start",
					"middle"
				].includes(e);
			}
		},
		vertical: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = $("divider", e), n = m(Ur, null), r = m(Ii, null), o = i(() => !!n), s = i(() => !!r), c = i(() => n?.isSelectable.value ?? !1), l = i(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = i(() => o.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
		return (e, n) => (T(), a(N(u.value), g(e.$attrs, {
			class: ["mat-divider", [`mat-divider--${l.value}`, {
				"mat-divider--menu": s.value,
				"mat-divider--vertical": L(t).vertical
			}]],
			"aria-hidden": c.value ? "true" : e.$attrs["aria-hidden"],
			"aria-orientation": c.value ? void 0 : L(t).vertical ? "vertical" : void 0,
			role: c.value ? "presentation" : o.value || s.value || L(t).vertical ? "separator" : e.$attrs.role
		}), null, 16, [
			"class",
			"aria-hidden",
			"aria-orientation",
			"role"
		]));
	}
}), [["__scopeId", "data-v-88c82c06"]]), Ui = { class: "mat-selection-control__target" }, Wi = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], Gi = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, Ki = {
	key: 0,
	class: "mat-selection-control__label"
}, qi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ve
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
		let r = e, a = n, l = R(), u = B(), d = k(null), f = m(je, Ae), { colorStyle: p } = lt(i(() => r.color)), h = i(() => {
			let e = {};
			return [
				"class",
				"inert",
				"aria-hidden"
			].forEach((t) => {
				l[t] !== void 0 && (e[t] = l[t]);
			}), e;
		}), _ = i(() => Object.fromEntries(Object.entries(l).filter(([e]) => ![
			"class",
			"style",
			"inert",
			"aria-hidden"
		].includes(e)))), v = i(() => [p.value, l.style]), y = i(() => l.inert !== void 0 || l["aria-hidden"] === !0 || l["aria-hidden"] === "true");
		C(() => {
			!u.default && !_.value["aria-label"] && !y.value && console.warn(`${r.labelName}: 缺少默认标签内容时必须提供 aria-label`);
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
		}), (t, n) => (T(), s("label", g(h.value, {
			class: ["mat-selection-control mat-sys-typescale-body-large", {
				"mat-selection-control--checked": e.checked,
				"mat-selection-control--disabled": e.disabled,
				"mat-selection-control--use-cursor": L(f).useCursor
			}],
			style: v.value
		}), [c("span", Ui, [
			c("input", g({
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
				onChange: n[0] ||= (e) => a("change", e),
				onKeydown: n[1] ||= (e) => a("keydown", e)
			}), null, 16, Wi),
			n[2] ||= c("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			n[3] ||= c("span", {
				class: "mat-selection-control__focus-ring",
				"aria-hidden": "true"
			}, null, -1),
			c("span", Gi, [M(t.$slots, "indicator", {}, void 0, !0)])
		]), L(u).default ? (T(), s("span", Ki, [M(t.$slots, "default", {}, void 0, !0)])) : o("", !0)], 16));
	}
}), [["__scopeId", "data-v-5041102c"]]), Ji = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: Jr
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: qr
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
			validator: Ve
		}
	},
	emits: {
		"update:modelValue": Jr,
		"update:indeterminate"(e) {
			return typeof e == "boolean";
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("checkbox", e), r = t, o = i(() => Array.isArray(n.modelValue) ? n.modelValue.some((e) => Object.is(e, n.value)) : n.modelValue);
		function s(e) {
			let t = e.target.checked;
			if (Array.isArray(n.modelValue)) {
				let e = t ? [...n.modelValue, n.value] : n.modelValue.filter((e) => !Object.is(e, n.value));
				r("update:modelValue", e);
			} else r("update:modelValue", t);
			r("update:indeterminate", !1), r("change", e);
		}
		return (e, t) => (T(), a(qi, g(e.$attrs, {
			class: ["mat-checkbox", {
				"mat-checkbox--checked": o.value,
				"mat-checkbox--indeterminate": L(n).indeterminate
			}],
			checked: o.value,
			color: L(n).color,
			disabled: L(n).disabled,
			indeterminate: L(n).indeterminate,
			"input-type": "checkbox",
			"input-value": L(n).value,
			"label-name": "MatCheckbox",
			onChange: s
		}), {
			indicator: U(() => [...t[0] ||= [c("span", { class: "mat-checkbox__box" }, [c("span", { class: "mat-checkbox__check" }), c("span", { class: "mat-checkbox__mixed" })], -1)]]),
			default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-ed555593"]]), Yi = [
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
function Xi(e) {
	return !e || typeof e != "object" || Array.isArray(e) || Object.keys(e).some((e) => !["inline", "block"].includes(e)) ? !1 : ["inline", "block"].every((t) => vt(e[t], {
		property: "margin",
		allowNegative: !0
	}));
}
//#endregion
//#region src/components/mat-badge/MatBadge.vue
var Zi = ["data-dot"], Qi = ["data-dot"], $i = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Yi.includes(e)
		},
		offset: {
			type: Object,
			default: () => ({
				inline: 0,
				block: 0
			}),
			validator: Xi
		},
		color: {
			type: String,
			default: "error",
			validator: Ve
		}
	},
	setup(e) {
		let t = $("badge", e), n = R(), { colorStyle: r } = lt(i(() => t.color)), a = i(() => t.location === "inline"), c = i(() => t.content !== void 0 && String(t.content).length > 0), l = i(() => t.dot || c.value), u = i(() => t.dot ? void 0 : t.content);
		function d(e) {
			let t = yt(e ?? 0, {
				property: "margin",
				allowNegative: !0,
				fallback: "0px"
			});
			return t === "0" ? "0px" : t;
		}
		let f = i(() => ({
			...r.value,
			"--mat-badge-offset-inline": a.value ? void 0 : d(t.offset?.inline),
			"--mat-badge-offset-block": a.value ? void 0 : d(t.offset?.block)
		}));
		return (e, r) => a.value && l.value ? (T(), s("span", g({ key: 0 }, L(n), {
			class: ["mat-badge__indicator mat-badge__indicator--inline", { "mat-badge__indicator--dot": L(t).dot }],
			style: f.value,
			"aria-hidden": "true",
			"data-dot": L(t).dot ? "" : void 0
		}), I(u.value), 17, Zi)) : a.value ? o("", !0) : (T(), s("span", g({ key: 1 }, L(n), { class: "mat-badge" }), [M(e.$slots, "default", {}, void 0, !0), l.value ? (T(), s("span", {
			key: 0,
			class: v(["mat-badge__indicator", [`mat-badge__indicator--${L(t).location}`, { "mat-badge__indicator--dot": L(t).dot }]]),
			style: y(f.value),
			"aria-hidden": "true",
			"data-dot": L(t).dot ? "" : void 0
		}, I(u.value), 15, Qi)) : o("", !0)], 16));
	}
}), [["__scopeId", "data-v-9406a351"]]), ea = Symbol("mat-chip-set"), ta = {
	key: 0,
	class: "mat-chip__avatar",
	"aria-hidden": "true",
	inert: ""
}, na = {
	key: 1,
	class: "mat-chip__icon mat-chip__icon--leading",
	"aria-hidden": "true",
	inert: ""
}, ra = { class: "mat-chip__label" }, ia = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === void 0 || qr(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return Fe.includes(e);
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
		let n = $("chip", e), r = t, l = B(), u = m(je, Ae), d = m(ea, null), f = i(() => ["filter", "input"].includes(n.variant)), p = i(() => !!d && f.value && n.value !== void 0 && d.selection.value !== "none"), h = i(() => p.value ? d.isSelected(n.value) : f.value && n.selected), _ = i(() => !!l.avatar), v = i(() => !_.value && !!l.leading), y = i(() => n.variant === "filter" && h.value && !_.value && !v.value), b = i(() => _.value || v.value || y.value), x = i(() => n.variant === "input"), { colorStyle: S, hasExplicitColor: C } = lt(i(() => n.color));
		function w(e) {
			r("click", e), p.value && d.requestSelection(n.value, e);
		}
		function E(e) {
			n.variant === "input" && (e.stopPropagation(), n.disabled || r("remove", e));
		}
		return (e, t) => (T(), a(De, g(e.$attrs, {
			class: ["mat-chip mat-sys-typescale-label-large", [`mat-chip--${L(n).variant}`, {
				"mat-chip--elevated": L(n).elevated,
				"mat-chip--selected": h.value,
				"mat-chip--explicit-color": L(C),
				"mat-chip--has-leading": b.value,
				"mat-chip--has-avatar": _.value,
				"mat-chip--has-remove-icon": x.value
			}]],
			style: L(S),
			"aria-pressed": f.value ? String(h.value) : void 0,
			disabled: L(n).disabled,
			type: L(n).type,
			"use-cursor": L(u).useCursor,
			onClick: w
		}), {
			default: U(() => [
				_.value ? (T(), s("span", ta, [M(e.$slots, "avatar", {}, void 0, !0)])) : v.value || y.value ? (T(), s("span", na, [v.value ? M(e.$slots, "leading", { key: 0 }, void 0, !0) : (T(), a(pt, {
					key: 1,
					as: "span",
					icon: "check",
					"optical-size": 20,
					size: "18px"
				}))])) : o("", !0),
				c("span", ra, [M(e.$slots, "default", {}, void 0, !0)]),
				x.value ? (T(), s("span", {
					key: 2,
					class: "mat-chip__icon mat-chip__remove-icon",
					"aria-hidden": "true",
					onPointerdown: t[0] ||= K(() => {}, ["stop"]),
					onClick: E
				}, [e.$slots["remove-icon"] ? M(e.$slots, "remove-icon", { key: 0 }, void 0, !0) : (T(), a(pt, {
					key: 1,
					as: "span",
					icon: L(n).removeIcon,
					"optical-size": 20,
					size: "18px"
				}, null, 8, ["icon"]))], 32)) : o("", !0)
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
}), [["__scopeId", "data-v-83959a26"]]), aa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => vt(e, { allowUndefined: !1 })
		},
		shadowLength: {
			type: [Number, Object],
			default: void 0,
			validator: (e) => xt(e)
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
			validator: (e) => xt(e, { allowUndefined: !1 })
		},
		shadowOffset: {
			type: [Number, Object],
			default: 0,
			validator: (e) => xt(e, { allowUndefined: !1 })
		},
		rounded: {
			type: Boolean,
			default: !1
		},
		noScrollPadding: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		}
	},
	emits: {
		"reach-start": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement,
		"reach-end": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement
	},
	setup(e, { expose: t, emit: n }) {
		let r = $("scrollArea", e), { colorStyle: a, hasExplicitColor: o } = lt(i(() => r.color)), l = n, u = R(), d = k(null), f = k(null), p = k(!1), m = k(!1), h = k(!1), v = k(!1), y = k(!1), b, S, D, O = 0, A = 0, j = !1, N, P = i(() => [
			"horizontal",
			"x",
			"h"
		].includes(r.orientation) ? "horizontal" : "vertical"), F = i(() => r.dragScroll && P.value === "horizontal"), I = i(() => St(r.reachThreshold, 0)), z = i(() => St(r.shadowOffset, 0)), B = i(() => St(r.shadowLength, 16)), H = i(() => r.barWidth === "hidden" ? 0 : r.barWidth === "thin" ? 8 : 16), U = k({
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		});
		function W() {
			let e = d.value;
			if (!e) return;
			let t = getComputedStyle(e), n = {
				left: Number.parseFloat(t.paddingLeft) || 0,
				right: Number.parseFloat(t.paddingRight) || 0,
				top: Number.parseFloat(t.paddingTop) || 0,
				bottom: Number.parseFloat(t.paddingBottom) || 0
			}, r = U.value;
			n.left === r.left && n.right === r.right && n.top === r.top && n.bottom === r.bottom || (U.value = n);
		}
		let G = i(() => {
			let e = P.value === "horizontal", t = yt(r.snapPadding, { fallback: "0" });
			return {
				scrollPaddingBottom: e ? void 0 : t,
				scrollPaddingLeft: e ? t : void 0,
				scrollPaddingRight: e ? t : void 0,
				scrollPaddingTop: e ? void 0 : t,
				scrollSnapType: r.snap === "none" ? "none" : `${e ? "x" : "y"} ${r.snap}`
			};
		}), K = i(() => ({
			class: u.class,
			style: u.style
		})), ee = i(() => [a.value, {
			"--mat-scroll-area-shadow-length-start": `${B.value.start}px`,
			"--mat-scroll-area-shadow-length-end": `${B.value.end}px`,
			"--mat-scroll-area-shadow-offset-start": `${z.value.start}px`,
			"--mat-scroll-area-shadow-offset-end": `${z.value.end}px`,
			"--mat-scroll-area-scrollbar-width": `${H.value}px`,
			"--mat-scroll-area-root-padding-left": `${U.value.left}px`,
			"--mat-scroll-area-root-padding-right": `${U.value.right}px`,
			"--mat-scroll-area-root-padding-top": `${U.value.top}px`,
			"--mat-scroll-area-root-padding-bottom": `${U.value.bottom}px`
		}]), q = i(() => Object.fromEntries(Object.entries(u).filter(([e]) => !["class", "style"].includes(e))));
		function J() {
			let e = f.value;
			if (!e) return {
				start: 0,
				end: 0
			};
			if (P.value === "horizontal") {
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
		function Y(e) {
			let t = f.value;
			if (!t) return;
			let n = J(), r = n.start <= I.value.start + 1, i = n.end <= I.value.end + 1;
			p.value = n.start > 1, m.value = n.end > 1, e && r && !v.value && l("reach-start", {
				distance: n.start,
				target: t
			}), e && i && !y.value && l("reach-end", {
				distance: n.end,
				target: t
			}), v.value = r, y.value = i;
		}
		function X(e) {
			b !== void 0 && cancelAnimationFrame(b), b = requestAnimationFrame(() => {
				b = void 0, Y(e);
			});
		}
		function Z() {
			X(!0);
		}
		function te() {
			N !== void 0 && (globalThis.clearTimeout(N), N = void 0), j = !1;
		}
		function ne() {
			te(), j = !0, N = globalThis.setTimeout(() => {
				j = !1, N = void 0;
			}, 0);
		}
		function re(e = !1) {
			let t = f.value, n = D;
			e && n !== void 0 && t?.hasPointerCapture?.(n) && t.releasePointerCapture(n), D = void 0, h.value = !1;
		}
		function ie(e) {
			!F.value || D !== void 0 || e.button !== 0 || !["mouse", "pen"].includes(e.pointerType) || (D = e.pointerId, O = e.clientX, A = f.value?.scrollLeft ?? 0);
		}
		function ae(e) {
			if (e.pointerId !== D || !f.value) return;
			let t = e.clientX - O;
			!h.value && Math.abs(t) <= 4 || (h.value || (h.value = !0, f.value.setPointerCapture?.(e.pointerId)), e.preventDefault(), f.value.scrollLeft = A - t);
		}
		function oe(e) {
			e.pointerId === D && (h.value && ne(), re(!0));
		}
		function se(e) {
			e.pointerId === D && re(!0);
		}
		function ce(e) {
			e.target !== f.value || e.pointerId !== D || (h.value && ne(), re());
		}
		function le(e) {
			j && (te(), e.preventDefault(), e.stopImmediatePropagation());
		}
		function ue() {
			!S || !f.value || (S.disconnect(), S.observe(f.value), Array.from(f.value.children).forEach((e) => {
				S.observe(e);
			}), X(!1));
		}
		function de() {
			return f.value;
		}
		function fe(e) {
			f.value?.scrollTo(e);
		}
		return E(Yr, {
			getScroller: de,
			scrollTo: fe
		}), V([P, I], async () => {
			await _(), X(!1);
		}, { deep: !0 }), V(F, (e) => {
			e || (re(!0), te());
		}), C(() => {
			W(), typeof ResizeObserver == "function" && (S = new ResizeObserver(() => {
				W(), X(!1);
			})), ue();
		}), w(() => {
			W(), ue();
		}), x(() => {
			b !== void 0 && cancelAnimationFrame(b), S?.disconnect(), re(!0), te();
		}), t({
			getScroller: de,
			scrollTo: fe
		}), (e, t) => (T(), s("div", g({
			ref_key: "root",
			ref: d
		}, K.value, {
			class: ["mat-scroll-area", [{
				"mat-scroll-area--rounded": L(r).rounded,
				"mat-scroll-area--explicit-color": L(o)
			}]],
			style: ee.value
		}), [c("div", g({
			ref_key: "scroller",
			ref: f
		}, q.value, {
			class: ["mat-scroll-area__viewport", [
				`mat-scroll-area__viewport--${P.value}`,
				`mat-scroll-area__viewport--bar-${L(r).barWidth}`,
				{
					"mat-scroll-area__viewport--dragging": h.value,
					"mat-scroll-area__viewport--no-scroll-padding": L(r).noScrollPadding,
					"mat-scroll-area__viewport--start-overflow": p.value,
					"mat-scroll-area__viewport--end-overflow": m.value
				}
			]],
			style: G.value,
			onClickCapture: le,
			onLostpointercapture: ce,
			onPointercancel: se,
			onPointerdown: ie,
			onPointermove: ae,
			onPointerup: oe,
			onScroll: Z
		}), [M(e.$slots, "default", {}, void 0, !0)], 16)], 16));
	}
}), [["__scopeId", "data-v-5177c0d6"]]), oa = { class: "mat-chip-set__scroll-content" }, sa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatChipSet" }, {
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
				return e === null || qr(e) || Array.isArray(e) && e.every(qr);
			}
		}
	},
	emits: { "update:modelValue"(e) {
		return e === null || qr(e) || Array.isArray(e) && e.every(qr);
	} },
	setup(e, { emit: t }) {
		let n = $("chipSet", e), r = t, o = i(() => n.selection);
		function l(e) {
			return n.selection === "multiple" ? Array.isArray(n.modelValue) && n.modelValue.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.modelValue, e);
		}
		function u(e) {
			let t = l(e);
			if (n.selection === "single") {
				r("update:modelValue", t ? null : e);
				return;
			}
			if (n.selection === "multiple") {
				let i = Array.isArray(n.modelValue) ? n.modelValue : [];
				r("update:modelValue", t ? i.filter((t) => !Object.is(t, e)) : [...i, e]);
			}
		}
		return E(ea, {
			isSelected: l,
			requestSelection: u,
			selection: o
		}), (e, t) => (T(), s("div", {
			class: v(["mat-chip-set", `mat-chip-set--${L(n).layout}`]),
			role: "group"
		}, [L(n).layout === "scroll" ? (T(), a(aa, {
			key: 0,
			class: "mat-chip-set__scroll-area",
			orientation: "horizontal",
			"bar-width": "hidden",
			"drag-scroll": "",
			"shadow-length": 48
		}, {
			default: U(() => [c("div", oa, [M(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		})) : M(e.$slots, "default", { key: 1 }, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-e907c0ea"]]), ca = Symbol("mde-vue-radio-group"), la = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e == null || qr(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: qr
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || qr(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radio", e), r = t, o = f(), s = m(ca, null), l = k(null), u = i(() => n.value), d = i(() => n.disabled || !!s?.disabled.value), p = i(() => n.color ?? s?.color.value), h = i(() => s ? s.isSelected(n.value) : Object.is(n.modelValue, n.value));
		function _(e) {
			d.value || h.value || (s ? s.requestSelection(n.value, e) : r("update:modelValue", n.value), r("change", e));
		}
		let v = {
			activate: _,
			disabled: d,
			focus() {
				l.value?.focusInput();
			},
			getInput() {
				return l.value?.getInput() ?? null;
			},
			value: u
		}, y = i(() => s ? s.getTabIndex(v) : void 0);
		C(() => {
			if (!s) return;
			let e = o?.vnode.props ?? {};
			(n.modelValue !== void 0 || Object.hasOwn(e, "onUpdate:modelValue")) && console.warn("MatRadio: 位于 MatRadioGroup 中时，子级 modelValue 和 v-model 会被忽略"), s.register(v);
		}), x(() => {
			s?.unregister(v);
		});
		function b(e) {
			!s || e.repeat || (["ArrowRight", "ArrowDown"].includes(e.key) ? s.move(v, 1, e) : ["ArrowLeft", "ArrowUp"].includes(e.key) && s.move(v, -1, e));
		}
		return (e, t) => (T(), a(qi, g({
			ref_key: "base",
			ref: l
		}, e.$attrs, {
			class: ["mat-radio", { "mat-radio--checked": h.value }],
			checked: h.value,
			color: p.value,
			disabled: d.value,
			"input-type": "radio",
			"input-value": u.value,
			"label-name": "MatRadio",
			tabindex: y.value,
			onChange: _,
			onKeydown: b
		}), {
			indicator: U(() => [...t[0] ||= [c("span", { class: "mat-radio__ring" }, [c("span", { class: "mat-radio__dot" })], -1)]]),
			default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-dae1f87b"]]), ua = ["aria-disabled"], da = { class: "mat-radio-group__label mat-sys-typescale-title-medium" }, fa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === null || qr(e);
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
			validator: Ve
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || qr(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radioGroup", e), r = t, a = R(), o = F([]), { colorStyle: l } = lt(i(() => n.color)), u = i(() => Object.fromEntries(Object.entries(a).filter(([e]) => e !== "style"))), d = i(() => [l.value, a.style]);
		function f(e) {
			return Object.is(n.modelValue, e);
		}
		function p() {
			return [...o.value].sort((e, t) => {
				let n = e.getInput(), r = t.getInput();
				if (!n || !r) return 0;
				let i = n.compareDocumentPosition(r);
				return i & 4 ? -1 : i & 2 ? 1 : 0;
			});
		}
		function m(e) {
			o.value.includes(e) || (o.value = [...o.value, e]);
		}
		function h(e) {
			o.value = o.value.filter((t) => t !== e);
		}
		function _(e) {
			if (e.disabled.value) return -1;
			let t = p().filter((e) => !e.disabled.value), n = t.find((e) => f(e.value.value));
			return n ? n === e ? 0 : -1 : t[0] === e ? 0 : -1;
		}
		function v(e, t) {
			n.disabled || Object.is(n.modelValue, e) || (r("update:modelValue", e), r("change", t));
		}
		function y(e, t, n) {
			let r = p().filter((e) => !e.disabled.value), i = r.indexOf(e);
			if (i === -1 || r.length === 0) return;
			n.preventDefault();
			let a = r[(i + t + r.length) % r.length];
			a.focus(), a.activate(n);
		}
		return E(ca, {
			color: i(() => n.color),
			disabled: i(() => n.disabled),
			getTabIndex: _,
			isSelected: f,
			move: y,
			register: m,
			requestSelection: v,
			unregister: h
		}), (e, t) => (T(), s("fieldset", g(u.value, {
			class: "mat-radio-group",
			"aria-disabled": L(n).disabled || void 0,
			style: d.value,
			role: "radiogroup"
		}), [c("legend", da, I(L(n).label), 1), M(e.$slots, "default", {}, void 0, !0)], 16, ua));
	}
}), [["__scopeId", "data-v-77c4f2f2"]]), pa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ve
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
		function i(e) {
			r("update:modelValue", e.target.checked), r("change", e);
		}
		return (e, t) => (T(), a(qi, g(e.$attrs, {
			class: ["mat-switch", [`mat-switch--icons-${L(n).icons}`, { "mat-switch--checked": L(n).modelValue }]],
			checked: L(n).modelValue,
			color: L(n).color,
			disabled: L(n).disabled,
			"input-role": "switch",
			"input-type": "checkbox",
			"label-name": "MatSwitch",
			onChange: i
		}), {
			indicator: U(() => [...t[0] ||= [c("span", { class: "mat-switch__track" }, [c("span", { class: "mat-switch__handle-positioner" }, [c("span", { class: "mat-switch__handle" }, [c("span", { class: "mat-switch__icon mat-switch__icon--selected" }), c("span", { class: "mat-switch__icon mat-switch__icon--unselected" })])])], -1)]]),
			default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-6efac2c1"]]), ma = Object.freeze(["horizontal", "vertical"]), ha = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), ga = Object.freeze(["standard", "centered"]), _a = 12;
function va(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ya(e) {
	return va(e) && e > 0;
}
function ba(e) {
	return ma.includes(e);
}
function xa(e) {
	return ha.includes(e);
}
function Sa(e) {
	return ga.includes(e);
}
function Ca(e) {
	return Array.isArray(e) && e.length === 2 && e.every(va);
}
function wa(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function Ta(e, t) {
	return Number(e.toFixed(Math.min(_a, t)));
}
function Ea(e, t) {
	let n = va(e) ? e : 0, r = va(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function Da(e) {
	return ya(e) ? e : 1;
}
function Oa(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function ka(e, t, n) {
	let r = Oa(va(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(wa(t.min), wa(t.max), wa(n));
	return Ta(Oa(t.min + i * n, t), a);
}
function Aa(e, t, n) {
	return ka(va(e) ? e : (t.min + t.max) / 2, t, n);
}
function ja(e, t) {
	return Ta((Oa(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function Ma(e) {
	return Number(e.toFixed(3)).toString();
}
function Na(e) {
	let t = Math.min(Math.max(e, 0), 100), n = Ma(t), r = Ta(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${Ma(Math.abs(r))}px)`;
}
function Pa(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(wa(e.min), wa(e.max), wa(t)), i = Array.from({ length: n + 1 }, (n, i) => Ta(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function Fa(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return ka(n.min + (n.max - n.min) * u, n, r);
}
function Ia(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return ka(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return ka(e + i * r, n, r);
}
function La(e, t, n, r) {
	let i = ka(e, n, r), a = ka(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var Ra = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, za = { class: "mat-slider__inset-icon-layer" }, Ba = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, Va = [
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
], Ha = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: va
		},
		min: {
			type: Number,
			default: 0,
			validator: va
		},
		max: {
			type: Number,
			default: 100,
			validator: va
		},
		step: {
			type: Number,
			default: 1,
			validator: ya
		},
		variant: {
			type: String,
			default: "standard",
			validator: Sa
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || va(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: ba
		},
		size: {
			type: String,
			default: "extra-small",
			validator: xa
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
			return va(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let r = $("slider", e), l = n, f = R(), p = B(), h = k(null), _ = k(null), b = k(null), S = k(null), w = k(!1), E = k(void 0), D = k(void 0), O = k(!1), A = k(!1), N = k("active"), P = m(je, Ae), { colorStyle: F } = lt(i(() => r.color)), z = i(() => Ea(r.min, r.max)), H = i(() => Da(r.step)), W = i(() => ka(r.modelValue, z.value, H.value)), G = i(() => w.value ? D.value : W.value), K = i(() => Aa(r.center, z.value, H.value)), ee = i(() => r.variant === "centered" ? K.value : z.value.min), q = i(() => ja(G.value, z.value)), J = i(() => ja(ee.value, z.value)), Y = i(() => Na(q.value)), X = i(() => r.variant === "standard" ? "0%" : Na(J.value)), Z = i(() => Math.sign(q.value - J.value)), te = i(() => Z.value >= 0 ? X.value : `calc(${Y.value} + var(--mat-slider-handle-track-gap))`), ne = i(() => Z.value > 0 ? `max(0px, calc(${Y.value} - ${X.value} - var(--mat-slider-handle-track-gap)))` : Z.value < 0 ? `max(0px, calc(${X.value} - ${Y.value} - var(--mat-slider-handle-track-gap)))` : "0px"), re = i(() => Z.value > 0 ? X.value : `max(0px, calc(${Y.value} - var(--mat-slider-handle-track-gap)))`), ie = i(() => Z.value < 0 ? X.value : `calc(${Y.value} + var(--mat-slider-handle-track-gap))`), ae = i(() => Z.value < 0 ? `calc(100% - ${X.value})` : `max(0px, calc(100% - ${Y.value} - var(--mat-slider-handle-track-gap)))`), oe = i(() => r.showStopIndicator ? Pa(z.value, H.value) : r.variant === "centered" ? [z.value.min, z.value.max] : [z.value.max]), se = i(() => r.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(r.size)), ce = i(() => r.size === "extra-large" ? 32 : 24), le = i(() => r.showValueIndicator && (w.value || A.value)), ue = i(() => ({
			...F.value,
			"--mat-slider-active-visible-size": ne.value,
			"--mat-slider-active-visible-start": te.value,
			"--mat-slider-center-position": X.value,
			"--mat-slider-inactive-after-size": ae.value,
			"--mat-slider-inactive-after-start": ie.value,
			"--mat-slider-inactive-before-size": re.value,
			"--mat-slider-inset-icon-position": N.value === "inactive" ? `calc(${Y.value} + (var(--mat-slider-handle-width) / 2) + var(--mat-slider-handle-track-gap))` : "var(--mat-slider-inset-icon-offset)",
			"--mat-slider-position": Y.value
		}));
		function de() {
			if (!se.value || r.variant !== "standard" || !h.value) {
				N.value = "active";
				return;
			}
			let e = h.value.getBoundingClientRect(), t = r.orientation === "vertical" ? e.height : e.width, n = r.size === "extra-large" ? 32 : 24, i = Number.parseFloat(getComputedStyle(h.value).getPropertyValue("--mat-slider-handle-width")) || 4, a = 6 + (t - 12) * q.value / 100, o = 12 + n;
			N.value = a - i / 2 - 6 >= o ? "active" : "inactive";
		}
		let fe;
		C(() => {
			de(), typeof ResizeObserver < "u" && (fe = new ResizeObserver(de), fe.observe(h.value));
		}), V([
			se,
			() => r.orientation,
			() => r.variant,
			q
		], de, { flush: "post" });
		function pe(e, t) {
			let n = w.value ? D.value : W.value;
			return e === void 0 || e === n ? !1 : (w.value && (D.value = e), l("update:modelValue", e), l("input", t), !0);
		}
		function me(e) {
			return b.value ? pe(Fa(e, b.value, z.value, H.value, r.orientation), e) : !1;
		}
		let he = Zr((e) => {
			O.value = me(e) || O.value;
		});
		function ge(e) {
			r.disabled || (he.cancel(), E.value = e.pointerId, D.value = W.value, O.value = !1, w.value = !0, S.value?.focus(), b.value?.setPointerCapture?.(e.pointerId), O.value = me(e));
		}
		function _e(e) {
			!w.value || e.pointerId !== E.value || he.schedule(e);
		}
		function ve(e, t) {
			!w.value || e.pointerId !== E.value || (t ? (he.flush(), O.value = me(e) || O.value) : he.cancel(), t && O.value && l("change", e), w.value = !1, O.value = !1, E.value = void 0, D.value = void 0);
		}
		x(() => {
			fe?.disconnect(), he.cancel();
		});
		function ye(e) {
			if (r.disabled) return;
			let t = Ia(W.value, e.key, z.value, H.value);
			t !== void 0 && (e.preventDefault(), pe(t, e) && l("change", e));
		}
		return (n, i) => (T(), s("div", g({
			ref_key: "root",
			ref: h
		}, L(f), {
			class: ["mat-slider", [
				`mat-slider--${L(r).orientation}`,
				`mat-slider--size-${L(r).size}`,
				`mat-slider--${L(r).variant}`,
				{
					"mat-slider--disabled": L(r).disabled,
					"mat-slider--dragging": w.value,
					"mat-slider--use-cursor": L(P).useCursor
				}
			]],
			style: ue.value
		}), [
			c("span", Ra, [
				i[6] ||= c("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
				c("span", { class: v(["mat-slider__active-track", { "mat-slider__active-track--from-start": L(r).variant === "standard" }]) }, null, 2),
				i[7] ||= c("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
				(T(!0), s(t, null, j(oe.value, (e) => (T(), s("span", {
					key: e,
					class: v(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(ee.value, G.value) && e <= Math.max(ee.value, G.value) }]),
					style: y({ "--mat-slider-stop-position": L(Na)(L(ja)(e, z.value)) })
				}, null, 6))), 128)),
				se.value && L(r).variant === "standard" ? (T(), a(pt, {
					key: 0,
					class: "mat-slider__inset-icon",
					"font-color": N.value === "active" ? "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))" : "var(--mat-slider-inset-icon-inactive-color)",
					icon: L(r).insetIcon,
					"optical-size": ce.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, [
					"font-color",
					"icon",
					"optical-size"
				])) : se.value ? (T(), s(t, { key: 1 }, [c("span", za, [d(pt, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
					"font-color": "var(--mat-slider-inset-icon-inactive-color)",
					icon: L(r).insetIcon,
					"optical-size": ce.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])]), c("span", Ba, [d(pt, {
					class: "mat-slider__inset-icon mat-slider__inset-icon--active",
					"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
					icon: L(r).insetIcon,
					"optical-size": ce.value,
					size: "var(--mat-slider-current-inset-icon-size)",
					"aria-hidden": "true"
				}, null, 8, ["icon", "optical-size"])])], 64)) : o("", !0),
				c("span", {
					ref_key: "handle",
					ref: _,
					class: "mat-slider__handle"
				}, [...i[5] ||= [c("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
			]),
			d(_n, {
				class: "mat-slider__value-indicator",
				"data-slider-value-indicator": "",
				location: e.orientation === "vertical" ? "right" : "top",
				"model-value": le.value,
				target: _.value
			}, {
				default: U(() => [L(p)["indicator-label"] ? M(n.$slots, "indicator-label", {
					key: 0,
					modelValue: G.value
				}, void 0, !0) : (T(), s(t, { key: 1 }, [u(I(G.value), 1)], 64))]),
				_: 3
			}, 8, [
				"location",
				"model-value",
				"target"
			]),
			c("span", {
				ref_key: "interaction",
				ref: b,
				class: "mat-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: i[0] ||= (e) => ve(e, !1),
				onPointercancel: i[1] ||= (e) => ve(e, !1),
				onPointerdown: ge,
				onPointermove: _e,
				onPointerup: i[2] ||= (e) => ve(e, !0)
			}, null, 544),
			c("input", {
				ref_key: "nativeInput",
				ref: S,
				class: "mat-slider__native-input",
				type: "range",
				"aria-label": L(f)["aria-label"],
				"aria-orientation": L(r).orientation,
				"aria-valuemax": z.value.max,
				"aria-valuemin": z.value.min,
				"aria-valuenow": G.value,
				disabled: L(r).disabled,
				max: z.value.max,
				min: z.value.min,
				step: H.value,
				value: G.value,
				onBlur: i[3] ||= (e) => A.value = !1,
				onFocus: i[4] ||= (e) => A.value = !0,
				onKeydown: ye
			}, null, 40, Va)
		], 16));
	}
}), [["__scopeId", "data-v-a629b223"]]), Ua = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, Wa = [
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
], Ga = [
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
], Ka = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ca
		},
		min: {
			type: Number,
			default: 0,
			validator: va
		},
		max: {
			type: Number,
			default: 100,
			validator: va
		},
		step: {
			type: Number,
			default: 1,
			validator: ya
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: ba
		},
		size: {
			type: String,
			default: "extra-small",
			validator: xa
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
			return Ca(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let r = $("rangeSlider", e), a = n, o = R(), l = B(), f = k([]), p = k(null), h = k(null), _ = k(null), b = k(0), S = k(void 0), C = k(!1), w = k(void 0), E = k(void 0), D = k(!1), O = m(je, Ae), { colorStyle: A } = lt(i(() => r.color)), N = i(() => Ea(r.min, r.max)), P = i(() => Da(r.step)), F = i(() => La(r.modelValue?.[0], r.modelValue?.[1], N.value, P.value)), z = i(() => C.value ? E.value : F.value), V = i(() => ja(z.value[0], N.value)), H = i(() => ja(z.value[1], N.value)), W = i(() => Na(V.value)), G = i(() => Na(H.value)), K = i(() => r.showStopIndicator ? Pa(N.value, P.value) : [N.value.min, N.value.max]), ee = i(() => f.value[b.value] ?? null), q = i(() => z.value[b.value]), J = i(() => r.showValueIndicator && (C.value || S.value === b.value)), Y = i(() => ({
			...A.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${G.value} - ${W.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${W.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": G.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${G.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${G.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${W.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": W.value
		}));
		function X(e) {
			return e === 0 ? h.value : _.value;
		}
		function Z(e) {
			let [t, n] = z.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function te(e, t, n) {
			if (t === void 0) return !1;
			let [r, i] = C.value ? E.value : F.value, o = e === 0 ? [Math.min(t, i), i] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === i ? !1 : (C.value && (E.value = o), a("update:modelValue", o), a("input", n), !0);
		}
		function ne(e) {
			if (!p.value) return !1;
			let t = Fa(e, p.value, N.value, P.value, r.orientation);
			return te(b.value, t, e);
		}
		let re = Zr((e) => {
			D.value = ne(e) || D.value;
		});
		function ie(e) {
			if (r.disabled || !p.value) return;
			re.cancel();
			let t = Fa(e, p.value, N.value, P.value, r.orientation);
			t !== void 0 && (b.value = Z(t), w.value = e.pointerId, E.value = [...F.value], D.value = !1, C.value = !0, X(b.value)?.focus(), p.value.setPointerCapture?.(e.pointerId), D.value = te(b.value, t, e));
		}
		function ae(e) {
			!C.value || e.pointerId !== w.value || re.schedule(e);
		}
		function oe(e, t) {
			!C.value || e.pointerId !== w.value || (t ? (re.flush(), D.value = ne(e) || D.value) : re.cancel(), t && D.value && a("change", e), C.value = !1, D.value = !1, w.value = void 0, E.value = void 0);
		}
		x(() => {
			re.cancel();
		});
		function se(e, t) {
			if (r.disabled) return;
			let n = Ia(F.value[e], t.key, N.value, P.value);
			n !== void 0 && (t.preventDefault(), b.value = e, te(e, n, t) && a("change", t));
		}
		function ce(e) {
			b.value = e, S.value = e;
		}
		function le(e) {
			S.value === e && (S.value = void 0);
		}
		function ue(e, t) {
			f.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (e, n) => (T(), s("div", g(L(o), {
			class: ["mat-range-slider", [
				`mat-range-slider--${L(r).orientation}`,
				`mat-range-slider--size-${L(r).size}`,
				{
					"mat-range-slider--disabled": L(r).disabled,
					"mat-range-slider--dragging": C.value,
					"mat-range-slider--use-cursor": L(O).useCursor
				}
			]],
			style: Y.value
		}), [
			c("span", Ua, [
				n[10] ||= c("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
				n[11] ||= c("span", { class: "mat-range-slider__active-track" }, null, -1),
				n[12] ||= c("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
				(T(!0), s(t, null, j(K.value, (e) => (T(), s("span", {
					key: e,
					class: v(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= z.value[0] && e <= z.value[1] }]),
					style: y({ "--mat-range-slider-stop-position": L(Na)(L(ja)(e, N.value)) })
				}, null, 6))), 128)),
				(T(!0), s(t, null, j(z.value, (e, t) => (T(), s("span", {
					key: t,
					ref_for: !0,
					ref: (e) => ue(t, e),
					class: v(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": b.value === t }]])
				}, [...n[9] ||= [c("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
			]),
			d(_n, {
				class: "mat-range-slider__value-indicator",
				"data-slider-value-indicator": "",
				location: L(r).orientation === "vertical" ? "right" : "top",
				"model-value": J.value,
				target: ee.value
			}, {
				default: U(() => [L(l)["indicator-label"] ? M(e.$slots, "indicator-label", {
					key: 0,
					index: b.value,
					modelValue: q.value
				}, void 0, !0) : (T(), s(t, { key: 1 }, [u(I(q.value), 1)], 64))]),
				_: 3
			}, 8, [
				"location",
				"model-value",
				"target"
			]),
			c("span", {
				ref_key: "interaction",
				ref: p,
				class: "mat-range-slider__interaction",
				"aria-hidden": "true",
				onLostpointercapture: n[0] ||= (e) => oe(e, !1),
				onPointercancel: n[1] ||= (e) => oe(e, !1),
				onPointerdown: ie,
				onPointermove: ae,
				onPointerup: n[2] ||= (e) => oe(e, !0)
			}, null, 544),
			c("input", {
				ref_key: "startInput",
				ref: h,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": L(r).ariaLabelStart,
				"aria-orientation": L(r).orientation,
				"aria-valuemax": z.value[1],
				"aria-valuemin": N.value.min,
				"aria-valuenow": z.value[0],
				disabled: L(r).disabled,
				max: z.value[1],
				min: N.value.min,
				step: P.value,
				value: z.value[0],
				onBlur: n[3] ||= (e) => le(0),
				onFocus: n[4] ||= (e) => ce(0),
				onKeydown: n[5] ||= (e) => se(0, e)
			}, null, 40, Wa),
			c("input", {
				ref_key: "endInput",
				ref: _,
				class: "mat-range-slider__native-input",
				type: "range",
				"aria-label": L(r).ariaLabelEnd,
				"aria-orientation": L(r).orientation,
				"aria-valuemax": N.value.max,
				"aria-valuemin": z.value[0],
				"aria-valuenow": z.value[1],
				disabled: L(r).disabled,
				max: N.value.max,
				min: z.value[0],
				step: P.value,
				value: z.value[1],
				onBlur: n[6] ||= (e) => le(1),
				onFocus: n[7] ||= (e) => ce(1),
				onKeydown: n[8] ||= (e) => se(1, e)
			}, null, 40, Ga)
		], 16));
	}
}), [["__scopeId", "data-v-6c96f4bf"]]), qa = ["inert", "aria-hidden"], Ja = { class: "mat-text-input__container" }, Ya = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, Xa = {
	key: 0,
	class: "mat-text-input__outline-label mat-sys-typescale-body-small"
}, Za = { key: 0 }, Qa = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, $a = {
	key: 2,
	class: "mat-text-input__icon mat-text-input__leading"
}, eo = {
	key: 0,
	"aria-hidden": "true"
}, to = { class: "mat-text-input__control-row" }, no = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, ro = {
	key: 3,
	class: "mat-text-input__affix mat-text-input__suffix"
}, io = {
	key: 3,
	class: "mat-text-input__icon mat-text-input__trailing"
}, ao = { class: "mat-text-input__supporting-text" }, oo = {
	key: 0,
	class: "mat-text-input__counter"
}, so = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = e, r = t, l = R(), d = k(!1), f = k(n.modelValue), p = k(), m = z(), h = `${m}-supporting`, b = i(() => l.id || m), { colorStyle: S } = lt(i(() => n.color)), w = i(() => !!l.placeholder), E = i(() => n.control === "custom" ? n.customFocused : d.value), D = i(() => E.value || f.value.length > 0 || w.value), O = i(() => n.error ? n.errorText : n.supportingText), A = i(() => !!O.value || n.maxLength !== void 0), j = i(() => {
			let e = [l["aria-describedby"]];
			return A.value && e.push(h), e.filter(Boolean).join(" ") || void 0;
		}), P = i(() => [S.value, l.style]), F = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), L = i(() => Object.fromEntries(Object.entries(l).filter(([e]) => !F.has(e)))), B, H;
		function W(e) {
			return Number.parseFloat(e) || 0;
		}
		function G() {
			let e = p.value?.getInput();
			if (!(e instanceof HTMLTextAreaElement)) return;
			e.style.resize = n.noResize ? "none" : "";
			let t = getComputedStyle(e), r = W(t.lineHeight) || 24, i = W(t.paddingBlockStart || t.paddingTop) + W(t.paddingBlockEnd || t.paddingBottom);
			if (e.style.minBlockSize = `${n.resizeMinRows * r + i}px`, !n.autoGrow) {
				e.style.blockSize = "", e.style.height = "", e.style.overflowY = "";
				return;
			}
			let a = n.rows ?? 1, o = n.maxRows === void 0 ? Infinity : Math.max(a, n.maxRows), s = a * r + i, c = o * r + i;
			e.style.blockSize = "auto", e.style.height = "";
			let l = e.scrollHeight, u = Math.max(s, Math.min(l, c));
			e.style.blockSize = `${u}px`, e.style.overflowY = "auto";
		}
		function K() {
			_(G);
		}
		function ee(e) {
			let t = e[0]?.contentRect.width;
			t !== H && (H = t, K());
		}
		V(() => n.modelValue, (e) => {
			f.value = e, K();
		}), V(() => [
			n.autoGrow,
			n.label,
			n.maxRows,
			n.noResize,
			n.resizeMinRows,
			n.rows
		], K), C(() => {
			G(), !(n.control === "custom" || typeof globalThis.ResizeObserver != "function") && (B = new globalThis.ResizeObserver(ee), B.observe(p.value.getInput()));
		}), x(() => {
			B?.disconnect();
		});
		function q() {
			n.control !== "custom" && p.value?.focusInput();
		}
		function J(e) {
			f.value = e, r("update:modelValue", e), K();
		}
		return (t, n) => (T(), s("div", {
			class: v(["mat-text-input mat-sys-typescale-body-large", [
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
			style: y(P.value),
			inert: t.$attrs.inert,
			"aria-hidden": t.$attrs["aria-hidden"]
		}, [c("div", Ja, [
			e.variant === "outlined" ? (T(), s("fieldset", Ya, [D.value && e.label ? (T(), s("legend", Xa, [u(I(e.label), 1), e.required ? (T(), s("span", Za, " *")) : o("", !0)])) : o("", !0)])) : o("", !0),
			e.variant === "filled" ? (T(), s("span", Qa)) : o("", !0),
			t.$slots.leading ? (T(), s("span", $a, [M(t.$slots, "leading", {}, void 0, !0)])) : o("", !0),
			(T(), a(N(e.control === "custom" ? "div" : "label"), {
				class: "mat-text-input__main",
				for: e.control === "custom" ? void 0 : b.value,
				onClick: q
			}, {
				default: U(() => [e.label ? (T(), s("span", {
					key: 0,
					class: v(["mat-text-input__label", D.value ? "mat-sys-typescale-body-small" : "mat-sys-typescale-body-large"])
				}, [u(I(e.label), 1), e.required ? (T(), s("span", eo, " *")) : o("", !0)], 2)) : o("", !0), c("span", to, [
					e.prefixText ? (T(), s("span", no, I(e.prefixText), 1)) : o("", !0),
					e.control === "custom" ? M(t.$slots, "control", {
						key: 1,
						controlId: b.value,
						describedBy: j.value
					}, void 0, !0) : (T(), a(Kn, g({
						key: 2,
						ref_key: "controlElement",
						ref: p
					}, L.value, {
						class: "mat-text-input__control",
						"aria-describedby": j.value,
						"aria-invalid": e.error ? "true" : void 0,
						disabled: e.disabled,
						id: b.value,
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
					e.suffixText ? (T(), s("span", ro, I(e.suffixText), 1)) : o("", !0)
				])]),
				_: 3
			}, 8, ["for"])),
			t.$slots.trailing ? (T(), s("span", io, [M(t.$slots, "trailing", {}, void 0, !0)])) : o("", !0)
		]), A.value ? (T(), s("span", {
			key: 0,
			id: h,
			class: "mat-text-input__supporting mat-sys-typescale-body-small"
		}, [c("span", ao, I(O.value), 1), e.maxLength === void 0 ? o("", !0) : (T(), s("span", oo, I(e.modelValue.length) + " / " + I(e.maxLength), 1))])) : o("", !0)], 14, qa));
	}
}), [["__scopeId", "data-v-cee9b077"]]), co = ["filled", "outlined"], lo = {
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
			return co.includes(e);
		}
	},
	color: {
		type: String,
		default: void 0,
		validator: Ve
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
}, uo = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...lo,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = $("textField", e), r = t;
		return (e, t) => (T(), a(so, g({
			...e.$attrs,
			...L(n)
		}, {
			control: "input",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e)
		}), l({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: U(() => [M(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: U(() => [M(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040));
	}
}), fo = 200, po = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ve
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => vt(e, {
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
		let r = $("menu", e), a = n, c = R(), l = B(), u = m(Li, null), f = m(Ii, null), p = m(kt, null), h = k(null), v = k(null), b = k(null), S = F(null), D = i(() => b.value?.root ?? b.value?.$el ?? null), O = z().replace(/[^\w-]/g, "-"), A = i(() => c.id ?? `${O}-menu`), j = `--mat-menu-anchor-${O}`, N = k(!1), P = k("closed"), I = f?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, H = k(0), W = /* @__PURE__ */ new Map(), G = null, K = !1, ee = !1, q = !1, J = Ot(), Y, X, Z = null, te = !1, ne = !1, ae = i(() => !!u), oe = i(() => !!l.activator), se = i(() => !ae.value && !oe.value && Ce(r.anchor)), ce = i(() => H.value > 0), le = i(() => !ae.value && r.scrim), ue = i(() => !le.value || !!p), de = i(() => le.value ? "manual" : "auto"), fe = i(() => ae.value ? N.value : r.modelValue), pe = i(() => r.variant ?? f?.variant.value ?? "standard"), me = i(() => r.color ?? f?.color.value), he = i(() => r.closeOnClick), { colorStyle: ge } = lt(me), _e = i(() => {
			if (r.maxLength === void 0) return;
			let e = yt(r.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))`;
			return {
				"--mat-menu-resolved-max-length": t,
				maxBlockSize: t
			};
		}), ve = i(() => {
			let [e, t] = Ce(r.offset) ? r.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: se.value ? "auto" : j
			};
			return se.value && Ce(r.anchor) && (n.left = `${r.anchor[0]}px`, n.top = `${r.anchor[1]}px`), n;
		}), ye = i(() => {
			let e = S.value;
			if (e) return {
				"--mat-menu-viewport-width": `${e.width}px`,
				"--mat-menu-viewport-height": `${e.height}px`
			};
		}), be = i(() => {
			let e = S.value;
			if (e) return {
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			};
		}), xe = i(() => [
			ge.value,
			ve.value,
			ye.value,
			c.style,
			_e.value
		]), Se = Kr({
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
			if (ae.value) return u.element.value;
			if (oe.value) {
				let e = h.value ? [...h.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !r.anchor || typeof r.anchor != "string" ? null : document.getElementById(r.anchor);
		}
		function Te() {
			G &&= (ie(G, j), null);
		}
		function Ee() {
			let e = we();
			return e ? G === e ? e : (Te(), G = e, re(e, j), e) : null;
		}
		function Q() {
			J.cancel();
		}
		function De() {
			!le.value || !v.value || ee || (ee = !0, v.value.showPopover?.());
		}
		function Oe() {
			ee && (ee = !1, v.value?.hidePopover?.());
		}
		function ke() {
			D.value && K && (K = !1, q = !0, D.value.hidePopover?.()), Oe(), P.value = "closed";
		}
		function Ae() {
			Oe(), P.value = "closed";
		}
		function je() {
			P.value = "closing", J.wait(D.value, fo, Ae);
		}
		function Me({ immediate: e = !1 } = {}) {
			if (!(!D.value || !K)) {
				if (q = !0, Re({ immediate: !0 }), e) {
					Q(), ke();
					return;
				}
				P.value !== "closing" && (P.value = "closing", J.wait(D.value, fo, ke));
			}
		}
		function Ne() {
			if (Y = void 0, !D.value || !K) return;
			let e = S.value ?? {
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
			if (!p) {
				S.value = null;
				return;
			}
			let e = p.getLayoutRect();
			S.value = e, v.value && Object.assign(v.value.style, {
				height: `${e.height}px`,
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`
			});
		}
		function Fe() {
			Pe(), Y !== void 0 && cancelAnimationFrame(Y), Y = requestAnimationFrame(Ne);
		}
		async function Ie() {
			Q(), q = !1, await _();
			let e = se.value ? null : Ee(), t = se.value || !!e;
			if (!D.value || !t) {
				ae.value || (console.warn(oe.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), a("update:modelValue", !1));
				return;
			}
			K || (se.value && document.activeElement instanceof HTMLElement && (Z = document.activeElement), De(), K = !0, D.value.showPopover?.()), P.value = "open", ae.value && (u.submenuOpen.value = !0), Se.refresh(), Se.focusFirst(), Fe();
		}
		function Le() {
			let e = we() ?? Z;
			Z = null, _(() => e?.focus());
		}
		function Re({ immediate: e = !1 } = {}) {
			W.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function ze({ focus: e = !0, immediate: t = !1 } = {}) {
			Re({ immediate: t }), ae.value ? (N.value = !1, u.submenuOpen.value = !1) : a("update:modelValue", !1), Me({ immediate: t }), e && Le();
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
			!(t instanceof Node) || D.value?.contains(t) || v.value?.contains(t) || G?.contains(t) || ze();
		}
		function Ue(e) {
			W.set(e.element, e), Vi(Array.from(W.values()).filter((e) => !e.grouped)), Se.queueRefresh();
		}
		function We(e) {
			W.delete(e.element), Vi(Array.from(W.values()).filter((e) => !e.grouped)), Se.queueRefresh();
		}
		function Ge() {
			H.value += 1, Se.queueRefresh();
		}
		function Ke() {
			H.value = Math.max(0, H.value - 1), Se.queueRefresh();
		}
		function qe(e) {
			W.forEach((t) => {
				t !== e && t.closeSubmenu({ focus: !1 });
			});
		}
		function Je() {
			let { current: e, previous: t } = I;
			for (let n of W.values()) {
				if (!n.submenuOpen?.value) continue;
				let r = n.element?.value, i = n.submenuElement?.value;
				if (!r || !i) continue;
				let a = r.getBoundingClientRect(), o = i.getBoundingClientRect();
				if (Bi(e, t, o, o.left < a.left ? "left" : "right")) return !0;
			}
			return !1;
		}
		function Ye(e) {
			let t = getComputedStyle(D.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), Se.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), Se.focusFirst()) : e.key === "End" ? (e.preventDefault(), Se.focusLast()) : e.key === "Escape" || ae.value && e.key === t ? (e.preventDefault(), ze()) : e.key === "Tab" && Be();
		}
		function Xe(e) {
			if (K = e.newState === "open", K) {
				Fe();
				return;
			}
			let t = q;
			q = !1, Re(), ae.value && (N.value = !1, u.submenuOpen.value = !1), !(!fe.value || t) && (je(), ae.value || a("update:modelValue", !1), Le());
		}
		E(Ii, {
			closeOtherSubmenus: qe,
			closeTree: Be,
			closeOnClick: he,
			color: me,
			isPointerInOpenSubmenuTriangle: Je,
			registerItem: Ue,
			registerGroup: Ge,
			unregisterItem: We,
			unregisterGroup: Ke,
			variant: pe
		}), u && u.registerSubmenu({
			close: ze,
			element: D,
			id: A,
			open: Ie
		}), C(() => {
			Se.observe(), window.addEventListener("resize", Fe), window.addEventListener("scroll", Fe, {
				capture: !0,
				passive: !0
			}), fe.value && (Qe(), et()), typeof ResizeObserver < "u" && (X = new ResizeObserver(Fe), X.observe(D.value)), fe.value && Ie();
		}), w(() => {
			ae.value || !fe.value || se.value || we() !== G && (Te(), Ie());
		}), x(() => {
			Q(), Y !== void 0 && cancelAnimationFrame(Y), X?.disconnect(), window.removeEventListener("resize", Fe), window.removeEventListener("scroll", Fe, { capture: !0 }), $e(), tt(), Me({ immediate: !0 }), Oe(), Te(), u?.unregisterSubmenu();
		});
		function Ze(e) {
			I.previous = I.current, I.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Qe() {
			f || te || (document.addEventListener("pointermove", Ze, !0), te = !0);
		}
		function $e() {
			te &&= (document.removeEventListener("pointermove", Ze, !0), !1);
		}
		function et() {
			f || !ue.value || ne || (document.addEventListener("pointerdown", He, !0), ne = !0);
		}
		function tt() {
			ne &&= (document.removeEventListener("pointerdown", He, !0), !1);
		}
		return V(fe, (e) => {
			e ? (Qe(), et(), Ie()) : ($e(), tt(), Me());
		}), V(() => r.anchor, async () => {
			Te(), fe.value && await Ie();
		}, { deep: !0 }), V(() => r.offset, async () => {
			fe.value && (await _(), Fe());
		}, { deep: !0 }), V(() => r.maxLength, async () => {
			fe.value && (await _(), Fe());
		}), V(() => r.scrim, async () => {
			ae.value || (D.value && K && (K = !1, q = !0, D.value.hidePopover?.()), Oe(), tt(), await _(), fe.value && (et(), await Ie()));
		}), p && V(p.publicContext.layout, Fe), (e, n) => (T(), s(t, null, [
			!ae.value && oe.value ? (T(), s("span", {
				key: 0,
				ref_key: "activatorHost",
				ref: h,
				class: "mat-menu__activator"
			}, [M(e.$slots, "activator", {}, void 0, !0)], 512)) : o("", !0),
			!ae.value && L(r).scrim ? (T(), s("div", {
				key: 1,
				ref_key: "scrimElement",
				ref: v,
				"aria-hidden": "true",
				class: "mat-menu__scrim",
				popover: "manual",
				style: y(be.value),
				onPointerdown: Ve
			}, null, 36)) : o("", !0),
			d(Or, g({
				id: A.value,
				ref_key: "surface",
				ref: b
			}, e.$attrs, {
				class: ["mat-menu", [`mat-menu--${pe.value}`, {
					"mat-menu--coordinate": se.value,
					"mat-menu--grouped": ce.value,
					"mat-menu--nested": ae.value,
					"mat-menu--closing": P.value === "closing"
				}]],
				style: xe.value,
				popover: de.value,
				role: "menu",
				onFocusin: L(Se).handleFocusIn,
				onKeydown: Ye,
				onToggle: Xe
			}), {
				default: U(() => [d(aa, {
					class: "mat-menu__surface",
					"bar-width": "hidden"
				}, {
					default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-eaf43e88"]]), mo = { class: "mat-menu-item-host" }, ho = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = $("menuItem", e), r = t, c = B(), u = m(Ii, null), f = m(Ri, null), p = m(je, Ae), h = k(null), _ = i(() => h.value?.root ?? h.value?.$el ?? null), v = k(!1), y = k(void 0), b = k("only"), S, w = i(() => !!c.submenu);
		function D({ focus: e = !1, immediate: t = !1 } = {}) {
			v.value = !1, S?.close({
				focus: e,
				immediate: t
			});
		}
		async function O({ pointer: e = !1 } = {}) {
			!w.value || n.disabled || e && u?.isPointerInOpenSubmenuTriangle?.() || (u?.closeOtherSubmenus(N), v.value = !0, await S?.open());
		}
		function A(e) {
			S = e, y.value = e.id.value;
		}
		function j() {
			S = void 0, y.value = void 0, v.value = !1;
		}
		let N = {
			closeSubmenu: D,
			element: _,
			grouped: !!f,
			setPosition(e) {
				b.value = e;
			},
			submenuElement: i(() => S?.element?.value ?? null),
			submenuOpen: v
		};
		function P(e) {
			if (w.value) {
				O();
				return;
			}
			r("click", e), u?.closeOnClick.value && u.closeTree();
		}
		function F(e) {
			if (!w.value) return;
			let t = getComputedStyle(_.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), O());
		}
		return E(Li, {
			element: _,
			registerSubmenu: A,
			submenuOpen: v,
			unregisterSubmenu: j
		}), C(() => {
			f?.registerItem(N), u?.registerItem(N);
		}), x(() => {
			f?.unregisterItem(N), u?.unregisterItem(N);
		}), (e, t) => (T(), s("span", mo, [d(De, g({
			ref_key: "action",
			ref: h
		}, e.$attrs, {
			class: ["mat-menu-item", [`mat-menu-item--${b.value}`, { "mat-menu-item--submenu-open": v.value }]],
			"data-mat-menu-item": "",
			"aria-controls": w.value ? y.value : void 0,
			"aria-expanded": w.value ? String(v.value) : void 0,
			"aria-haspopup": w.value ? "menu" : void 0,
			disabled: L(n).disabled,
			role: "menuitem",
			"use-cursor": L(p).useCursor,
			onClick: P,
			onKeydown: F,
			onPointerenter: t[0] ||= (e) => O({ pointer: !0 })
		}), {
			default: U(() => [d(xi, {
				namespace: "mat-menu-item-content",
				"label-typography-class": "mat-sys-typescale-label-large",
				"line-count": e.$slots.supporting ? 2 : 1,
				"supporting-typography-class": "mat-sys-typescale-body-small",
				"trailing-typography-class": "mat-sys-typescale-label-large"
			}, l({
				trailing: U(() => [e.$slots.trailing ? M(e.$slots, "trailing", { key: 0 }, void 0, !0) : w.value ? (T(), a(pt, {
					key: 1,
					as: "span",
					class: "mat-menu-item__submenu-icon",
					icon: "chevron_right",
					"optical-size": 20,
					size: "small",
					"aria-hidden": "true"
				})) : o("", !0)]),
				default: U(() => [M(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [e.$slots.leading ? {
				name: "leading",
				fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, e.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [M(e.$slots, "supporting", {}, void 0, !0)]),
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
		]), e.$slots.submenu ? M(e.$slots, "submenu", { key: 0 }, void 0, !0) : o("", !0)]));
	}
}), [["__scopeId", "data-v-cac5ebfb"]]), go = ["aria-labelledby"], _o = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = $("menuGroup", e), n = R(), r = m(Ii, null), a = `${z().replace(/[^\w-]/g, "-")}-label`, c = i(() => t.label ? a : n["aria-labelledby"]), l = /* @__PURE__ */ new Set();
		function u(e) {
			l.add(e), Vi(Array.from(l));
		}
		function d(e) {
			l.delete(e), Vi(Array.from(l));
		}
		return E(Ri, {
			registerItem: u,
			unregisterItem: d
		}), C(() => r?.registerGroup()), x(() => r?.unregisterGroup()), (e, n) => (T(), s("div", g(e.$attrs, {
			class: "mat-menu-group",
			"aria-labelledby": c.value,
			role: "group"
		}), [L(t).label ? (T(), s("div", {
			key: 0,
			id: a,
			class: "mat-menu-group__label mat-sys-typescale-label-large"
		}, I(L(t).label), 1)) : o("", !0), M(e.$slots, "default", {}, void 0, !0)], 16, go));
	}
}), [["__scopeId", "data-v-ef08bd1d"]]), vo = [
	"id",
	"aria-describedby",
	"aria-label",
	"aria-disabled",
	"aria-expanded",
	"aria-invalid",
	"aria-readonly",
	"tabindex"
], yo = {
	key: 0,
	class: "mat-select__chips"
}, bo = {
	key: 1,
	class: "mat-select__value"
}, xo = {
	key: 2,
	class: "mat-select__placeholder"
}, So = [
	"disabled",
	"multiple",
	"required"
], Co = ["selected"], wo = [
	"disabled",
	"selected",
	"value"
], To = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === null || qr(e) || Array.isArray(e) && e.every(qr);
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
			validator: (e) => co.includes(e)
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
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
		"update:modelValue": (e) => e === null || qr(e) || Array.isArray(e) && e.every(qr),
		change: (e) => e === null || qr(e) || Array.isArray(e) && e.every(qr)
	},
	setup(e, { emit: n }) {
		let r = $("select", e), f = n, p = R(), h = m(je, Ae), b = k(!1), x = k(!1), S = k(null), C = z().replace(/[^\w-]/g, "-"), w = i(() => p.id ?? `${C}-select`), E = i(() => ({
			form: p.form,
			name: p.name
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
			let n = e[r.itemTitle], i = e[r.itemValue], a = e[r.itemSubtitle];
			return typeof n != "string" || !qr(i) ? null : {
				disabled: e.disabled === !0,
				group: t,
				subtitle: a === void 0 ? void 0 : String(a),
				title: n,
				value: i
			};
		}
		let O = i(() => {
			let e = [], t = [], n = [], i = /* @__PURE__ */ new Set();
			function a(t, r) {
				let a = D(t, r);
				if (a) {
					if (n.some((e) => Object.is(e, a.value)) || i.has(String(a.value))) {
						`${String(a.value)}`;
						return;
					}
					n.push(a.value), i.add(String(a.value)), e.push(a);
				}
			}
			return r.items.forEach((n) => {
				if (n && typeof n == "object" && !Array.isArray(n) && "items" in n) {
					if (typeof n.group != "string" || !Array.isArray(n.items)) return;
					let r = e.length;
					n.items.forEach((e) => a(e, n.group)), e.length > r && t.push({
						label: n.group,
						options: e.slice(r)
					});
					return;
				}
				a(n, void 0);
			}), {
				groups: t,
				options: e,
				ungrouped: e.filter((e) => e.group === void 0)
			};
		}), A = i(() => O.value.options.filter((e) => r.multiple ? Array.isArray(r.modelValue) && r.modelValue.some((t) => Object.is(t, e.value)) : Object.is(r.modelValue, e.value))), N = i(() => A.value.map((e) => e.title).join(",")), P = i(() => A.value.length > 0), F = `${C}-menu`;
		V(() => [r.modelValue, r.multiple], ([e, t]) => {}, { immediate: !0 });
		function B(e) {
			return A.value.some((t) => Object.is(t.value, e));
		}
		function H(e) {
			if (r.disabled || r.readonly) return;
			let t;
			if (r.multiple) {
				let n = Array.isArray(r.modelValue) ? r.modelValue : [];
				t = n.some((t) => Object.is(t, e)) ? n.filter((t) => !Object.is(t, e)) : [...n, e];
			} else t = e, b.value = !1;
			f("update:modelValue", t), f("change", t);
		}
		function W() {
			r.disabled || r.readonly || (b.value = !b.value);
		}
		function G(e) {
			[
				"Enter",
				" ",
				"ArrowDown",
				"ArrowUp"
			].includes(e.key) && (e.preventDefault(), b.value || W());
		}
		function ee(e) {
			r.disabled || r.readonly || (r.multiple ? H(e) : (f("update:modelValue", null), f("change", null)), _(() => S.value?.focus()));
		}
		return (e, n) => (T(), s("div", {
			class: v(["mat-select", [{ "mat-select--use-cursor": L(h).useCursor }, e.$attrs.class]]),
			style: y(e.$attrs.style)
		}, [
			d(so, {
				id: w.value,
				control: "custom",
				"model-value": N.value,
				label: L(r).label,
				variant: L(r).variant,
				color: L(r).color,
				"supporting-text": L(r).supportingText,
				"error-text": L(r).errorText,
				disabled: L(r).disabled,
				readonly: L(r).readonly,
				required: L(r).required,
				error: L(r).error,
				"custom-focused": x.value || b.value,
				placeholder: L(r).placeholder
			}, l({
				control: U(({ controlId: i, describedBy: o }) => [c("div", {
					id: i,
					ref_key: "trigger",
					ref: S,
					class: "mat-select__trigger mat-text-input__control",
					role: "combobox",
					"aria-controls": F,
					"aria-describedby": o,
					"aria-label": e.$attrs["aria-label"] ?? L(r).label,
					"aria-disabled": L(r).disabled ? "true" : void 0,
					"aria-expanded": String(b.value),
					"aria-invalid": L(r).error ? "true" : void 0,
					"aria-haspopup": "menu",
					"aria-readonly": L(r).readonly ? "true" : void 0,
					tabindex: L(r).disabled ? -1 : 0,
					onBlur: n[1] ||= (e) => x.value = !1,
					onClick: W,
					onFocus: n[2] ||= (e) => x.value = !0,
					onKeydown: G
				}, [
					L(r).chips && P.value ? (T(), s("span", yo, [(T(!0), s(t, null, j(A.value, (e) => (T(), a(ia, {
						key: `${typeof e.value}:${String(e.value)}`,
						variant: "input",
						selected: B(e.value),
						disabled: L(r).disabled || L(r).readonly,
						onClick: n[0] ||= K(() => {}, ["stop"]),
						onRemove: (t) => ee(e.value)
					}, {
						default: U(() => [u(I(e.title), 1)]),
						_: 2
					}, 1032, [
						"selected",
						"disabled",
						"onRemove"
					]))), 128))])) : P.value ? (T(), s("span", bo, I(N.value), 1)) : (T(), s("span", xo, I(L(r).placeholder), 1)),
					n[4] ||= c("span", { class: "mat-select__spacer" }, null, -1),
					d(pt, {
						as: "span",
						icon: "arrow_drop_down",
						"optical-size": 24,
						size: "24px",
						"aria-hidden": "true"
					})
				], 40, vo)]),
				_: 2
			}, [e.$slots.leading ? {
				name: "leading",
				fn: U(() => [M(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, e.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [M(e.$slots, "trailing", {}, void 0, !0)]),
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
			c("select", g(E.value, {
				class: "mat-select__native",
				disabled: L(r).disabled,
				multiple: L(r).multiple,
				required: L(r).required,
				tabindex: "-1",
				"aria-hidden": "true"
			}), [L(r).multiple ? o("", !0) : (T(), s("option", {
				key: 0,
				value: "",
				selected: !P.value
			}, null, 8, Co)), (T(!0), s(t, null, j(O.value.options, (e) => (T(), s("option", {
				key: `${typeof e.value}:${String(e.value)}`,
				disabled: e.disabled,
				selected: B(e.value),
				value: String(e.value)
			}, I(e.title), 9, wo))), 128))], 16, So),
			d(po, {
				id: F,
				modelValue: b.value,
				"onUpdate:modelValue": n[3] ||= (e) => b.value = e,
				anchor: w.value,
				"close-on-click": !L(r).multiple
			}, {
				default: U(() => [O.value.groups.length === 0 ? (T(!0), s(t, { key: 0 }, j(O.value.ungrouped, (e) => (T(), a(ho, {
					key: `${typeof e.value}:${String(e.value)}`,
					disabled: e.disabled,
					onClick: (t) => H(e.value)
				}, l({
					default: U(() => [u(" " + I(e.title) + " ", 1)]),
					_: 2
				}, [L(r).multiple ? {
					name: "leading",
					fn: U(() => [d(Ji, {
						"aria-hidden": "true",
						inert: "",
						tabindex: "-1",
						"model-value": B(e.value)
					}, null, 8, ["model-value"])]),
					key: "0"
				} : void 0, e.subtitle ? {
					name: "supporting",
					fn: U(() => [u(I(e.subtitle), 1)]),
					key: "1"
				} : void 0]), 1032, ["disabled", "onClick"]))), 128)) : O.value.ungrouped.length > 0 ? (T(), a(_o, { key: 1 }, {
					default: U(() => [(T(!0), s(t, null, j(O.value.ungrouped, (e) => (T(), a(ho, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						onClick: (t) => H(e.value)
					}, l({
						default: U(() => [u(" " + I(e.title) + " ", 1)]),
						_: 2
					}, [L(r).multiple ? {
						name: "leading",
						fn: U(() => [d(Ji, {
							"aria-hidden": "true",
							inert: "",
							tabindex: "-1",
							"model-value": B(e.value)
						}, null, 8, ["model-value"])]),
						key: "0"
					} : void 0, e.subtitle ? {
						name: "supporting",
						fn: U(() => [u(I(e.subtitle), 1)]),
						key: "1"
					} : void 0]), 1032, ["disabled", "onClick"]))), 128))]),
					_: 1
				})) : o("", !0), (T(!0), s(t, null, j(O.value.groups, (e) => (T(), a(_o, {
					key: e.label,
					label: e.label
				}, {
					default: U(() => [(T(!0), s(t, null, j(e.options, (e) => (T(), a(ho, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						onClick: (t) => H(e.value)
					}, l({
						default: U(() => [u(" " + I(e.title) + " ", 1)]),
						_: 2
					}, [L(r).multiple ? {
						name: "leading",
						fn: U(() => [d(Ji, {
							"aria-hidden": "true",
							inert: "",
							tabindex: "-1",
							"model-value": B(e.value)
						}, null, 8, ["model-value"])]),
						key: "0"
					} : void 0, e.subtitle ? {
						name: "supporting",
						fn: U(() => [u(I(e.subtitle), 1)]),
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
}), [["__scopeId", "data-v-c9ae0170"]]), Eo = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...lo,
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
		let n = $("textarea", e), r = f();
		function i() {
			return Object.hasOwn(r.vnode.props ?? {}, "rows") ? n.rows : 1;
		}
		let o = t;
		return (e, t) => (T(), a(so, g({
			...e.$attrs,
			...L(n)
		}, {
			control: "textarea",
			"resize-min-rows": i(),
			"onUpdate:modelValue": t[0] ||= (e) => o("update:modelValue", e)
		}), l({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: U(() => [M(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: U(() => [M(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040, ["resize-min-rows"]));
	}
}), Do = { class: "mat-docked-container__panel" }, Oo = ["id"], ko = { class: "mat-docked-container__body" }, Ao = {
	key: 1,
	class: "mat-docked-container__actions"
}, jo = 200, Mo = 150, No = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatDockedContainer",
	inheritAttrs: !1
}, {
	__name: "MatDockedContainer",
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
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => vt(e, {
				property: "inline-size",
				positive: !0
			})
		},
		size: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || [
					"small",
					"medium",
					"large"
				].includes(e);
			}
		},
		headline: {
			type: String,
			default: void 0
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
			validator: Ve
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => vt(e, {
				property: "max-block-size",
				positive: !0
			})
		},
		scrim: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: n }) {
		let r = Object.freeze({
			small: "280px",
			medium: "328px",
			large: "560px"
		}), a = $("dockedContainer", e), l = n, f = R(), p = B(), h = m(kt, null), v = k(null), b = k(null), S = k(null), E = F(null), D = i(() => S.value?.root ?? S.value?.$el ?? null), O = z().replace(/[^\w-]/g, "-"), A = i(() => f.id ?? `${O}-docked-container`), j = i(() => `${O}-headline`), N = `--mat-docked-container-anchor-${O}`, P = k("closed"), H = null, W = !1, G = !1, K = !1, ee = Ot(), q, J, Y = null, X = !1, Z = i(() => !!p.activator), te = i(() => !Z.value && ve(a.anchor)), ne = i(() => a.scrim), ae = i(() => !ne.value || !!h), oe = i(() => ne.value ? "manual" : "auto"), se = i(() => a.modelValue), ce = i(() => a.variant ?? "standard"), le = i(() => a.color), ue = i(() => a.headline !== void 0 || !!p.headline), { colorStyle: de } = lt(le), fe = i(() => {
			if (a.width !== void 0) {
				let e = yt(a.width, {
					property: "inline-size",
					positive: !0
				});
				if (e !== void 0) return { inlineSize: `min(${e}, calc(var(--mat-docked-container-viewport-width) - (2 * var(--mat-docked-container-viewport-space))))` };
			}
			if (a.size && r[a.size]) return { inlineSize: `min(${r[a.size]}, calc(var(--mat-docked-container-viewport-width) - (2 * var(--mat-docked-container-viewport-space))))` };
		}), pe = i(() => {
			if (a.maxLength === void 0) return;
			let e = yt(a.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(var(--mat-docked-container-viewport-height) - (2 * var(--mat-docked-container-viewport-space))))`;
			return {
				"--mat-docked-container-resolved-max-length": t,
				maxBlockSize: t
			};
		}), me = i(() => {
			let [e, t] = ve(a.offset) ? a.offset : [0, 0], n = {
				"--mat-docked-container-offset-x": `${e}px`,
				"--mat-docked-container-offset-y": `${t}px`,
				positionAnchor: te.value ? "auto" : N
			};
			return te.value && ve(a.anchor) && (n.left = `${a.anchor[0]}px`, n.top = `${a.anchor[1]}px`), n;
		}), he = i(() => {
			let e = E.value;
			if (e) return {
				"--mat-docked-container-viewport-width": `${e.width}px`,
				"--mat-docked-container-viewport-height": `${e.height}px`
			};
		}), ge = i(() => {
			let e = E.value;
			if (e) return {
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			};
		}), _e = i(() => [
			de.value,
			me.value,
			he.value,
			fe.value,
			pe.value,
			f.style
		]);
		function ve(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function ye() {
			if (Z.value) {
				let e = v.value ? [...v.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !a.anchor || typeof a.anchor != "string" ? null : document.getElementById(a.anchor);
		}
		function be() {
			H &&= (ie(H, N), null);
		}
		function xe() {
			let e = ye();
			return e ? H === e ? e : (be(), H = e, re(e, N), e) : null;
		}
		function Se() {
			ee.cancel();
		}
		function Ce() {
			!ne.value || !b.value || G || (G = !0, b.value.showPopover?.());
		}
		function we() {
			G && (G = !1, b.value?.hidePopover?.());
		}
		function Te() {
			D.value && W && (W = !1, K = !0, D.value.hidePopover?.()), we(), P.value = "closed", l("closed");
		}
		function Ee() {
			we(), P.value = "closed", l("closed");
		}
		function Q() {
			P.value = "closing", ee.wait(D.value, jo, Ee);
		}
		function De({ immediate: e = !1 } = {}) {
			if (!(!D.value || !W)) {
				if (K = !0, e) {
					Se(), Te();
					return;
				}
				P.value !== "closing" && (P.value = "closing", ee.wait(D.value, jo, Te));
			}
		}
		function Oe() {
			if (q = void 0, !D.value || !W) return;
			let e = E.value ?? {
				bottom: window.innerHeight,
				left: 0,
				right: window.innerWidth,
				top: 0,
				width: window.innerWidth,
				height: window.innerHeight
			}, t = D.value.style, n = D.value.getBoundingClientRect(), r = Number.parseFloat(t.getPropertyValue("--mat-docked-container-viewport-shift-x")) || 0, i = Number.parseFloat(t.getPropertyValue("--mat-docked-container-viewport-shift-y")) || 0, a = Number.parseFloat(getComputedStyle(D.value).getPropertyValue("--mat-docked-container-viewport-space")), o = Number.isFinite(a) ? a : 8, s = {
				bottom: n.bottom - i,
				left: n.left - r,
				right: n.right - r,
				top: n.top - i
			}, c = 0, l = 0;
			s.left < e.left + o ? c = e.left + o - s.left : s.right > e.right - o && (c = e.right - o - s.right), s.top < e.top + o ? l = e.top + o - s.top : s.bottom > e.bottom - o && (l = e.bottom - o - s.bottom), t.setProperty("--mat-docked-container-viewport-shift-x", `${c}px`), t.setProperty("--mat-docked-container-viewport-shift-y", `${l}px`);
		}
		function ke() {
			if (!h) {
				E.value = null;
				return;
			}
			let e = h.getLayoutRect();
			E.value = e, b.value && Object.assign(b.value.style, {
				height: `${e.height}px`,
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`
			});
		}
		function Ae() {
			ke(), q !== void 0 && cancelAnimationFrame(q), q = requestAnimationFrame(Oe);
		}
		async function je() {
			Se(), K = !1, await _();
			let e = te.value ? null : xe(), t = te.value || !!e;
			if (!D.value || !t) {
				console.warn(Z.value ? "MatDockedContainer: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatDockedContainer: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), l("update:modelValue", !1);
				return;
			}
			W || (te.value && document.activeElement instanceof HTMLElement && (Y = document.activeElement), Ce(), W = !0, D.value.showPopover?.()), Ae(), P.value = "opening", ee.wait(D.value, Mo, () => {
				P.value = "open", l("opened");
			});
		}
		function Me() {
			let e = ye() ?? Y;
			Y = null, _(() => {
				e && typeof e.focus == "function" && e.focus();
			});
		}
		function Ne({ focus: e = !0, immediate: t = !1 } = {}) {
			l("update:modelValue", !1), De({ immediate: t }), e && Me();
		}
		function Pe(e) {
			e.preventDefault(), Ne();
		}
		function Fe(e) {
			let t = e.target;
			!(t instanceof Node) || D.value?.contains(t) || b.value?.contains(t) || H?.contains(t) || Ne();
		}
		function Ie(e) {
			e.key === "Escape" && (e.preventDefault(), Ne());
		}
		function Le(e) {
			if (W = e.newState === "open", W) {
				Ae();
				return;
			}
			let t = K;
			K = !1, !(!se.value || t) && (Q(), l("update:modelValue", !1), Me());
		}
		C(() => {
			window.addEventListener("resize", Ae), window.addEventListener("scroll", Ae, {
				capture: !0,
				passive: !0
			}), se.value && Re(), typeof ResizeObserver < "u" && D.value && (J = new ResizeObserver(Ae), J.observe(D.value)), se.value && je();
		}), w(() => {
			!se.value || te.value || ye() !== H && (be(), je());
		}), x(() => {
			Se(), q !== void 0 && cancelAnimationFrame(q), J?.disconnect(), window.removeEventListener("resize", Ae), window.removeEventListener("scroll", Ae, { capture: !0 }), ze(), De({ immediate: !0 }), we(), be();
		});
		function Re() {
			!ae.value || X || (document.addEventListener("pointerdown", Fe, !0), X = !0);
		}
		function ze() {
			X &&= (document.removeEventListener("pointerdown", Fe, !0), !1);
		}
		return V(se, (e) => {
			e ? (Re(), je()) : (ze(), De(), Me());
		}), V(() => a.anchor, async () => {
			be(), se.value && await je();
		}, { deep: !0 }), V(() => a.offset, async () => {
			se.value && (await _(), Ae());
		}, { deep: !0 }), V(() => a.maxLength, async () => {
			se.value && (await _(), Ae());
		}), V(() => a.scrim, async () => {
			D.value && W && (W = !1, K = !0, D.value.hidePopover?.()), we(), ze(), await _(), se.value && (Re(), await je());
		}), h && V(h.publicContext.layout, Ae), (e, n) => (T(), s(t, null, [
			Z.value ? (T(), s("span", {
				key: 0,
				ref_key: "activatorHost",
				ref: v,
				class: "mat-docked-container__activator"
			}, [M(e.$slots, "activator", {}, void 0, !0)], 512)) : o("", !0),
			L(a).scrim ? (T(), s("div", {
				key: 1,
				ref_key: "scrimElement",
				ref: b,
				"aria-hidden": "true",
				class: "mat-docked-container__scrim",
				popover: "manual",
				style: y(ge.value),
				onPointerdown: Pe
			}, null, 36)) : o("", !0),
			d(Or, g({
				id: A.value,
				ref_key: "surface",
				ref: S
			}, e.$attrs, {
				class: ["mat-docked-container", [`mat-docked-container--${ce.value}`, {
					"mat-docked-container--coordinate": te.value,
					"mat-docked-container--closing": P.value === "closing"
				}]],
				style: _e.value,
				popover: oe.value,
				"aria-labelledby": e.$attrs["aria-labelledby"] ?? (ue.value ? j.value : void 0),
				role: "region",
				tabindex: "-1",
				onKeydown: Ie,
				onToggle: Le
			}), {
				default: U(() => [c("div", Do, [
					ue.value ? (T(), s("header", {
						key: 0,
						id: j.value,
						class: "mat-docked-container__headline mat-sys-typescale-title-medium"
					}, [e.$slots.headline ? M(e.$slots, "headline", { key: 0 }, void 0, !0) : L(a).headline === void 0 ? o("", !0) : (T(), s(t, { key: 1 }, [u(I(L(a).headline), 1)], 64))], 8, Oo)) : o("", !0),
					c("div", ko, [M(e.$slots, "default", {}, void 0, !0)]),
					e.$slots.actions ? (T(), s("footer", Ao, [M(e.$slots, "actions", {}, void 0, !0)])) : o("", !0)
				])]),
				_: 3
			}, 16, [
				"id",
				"class",
				"style",
				"popover",
				"aria-labelledby"
			])
		], 64));
	}
}), [["__scopeId", "data-v-ad2e17fc"]]), Po = F([]), Fo = F(0), Io = Symbol("mat-dialog-document-scope"), Lo = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new Map();
function zo(e) {
	return Ro.has(e) || Ro.set(e, {
		count: 0,
		inert: !1,
		inertElement: null,
		lockedScrollbarGutter: null,
		overflow: "",
		scrollbarGutter: ""
	}), Ro.get(e);
}
function Bo(e, t) {
	let n = zo(e);
	!t || t === n.inertElement || (n.inertElement && !n.inert && n.inertElement.removeAttribute("inert"), Ro.set(e, {
		...n,
		inert: t.hasAttribute("inert"),
		inertElement: t
	}), t.setAttribute("inert", ""));
}
function Vo(e) {
	let t = Ro.get(e);
	t?.inertElement && (t.inert || t.inertElement.removeAttribute("inert"), Ro.set(e, {
		...t,
		inert: !1,
		inertElement: null
	}));
}
function Ho(e) {
	let t = zo(e), n = document.documentElement, r = n.clientWidth > 0 ? Math.max(0, window.innerWidth - n.clientWidth) : 0, i = getComputedStyle(n).scrollbarGutter, a = r > 0 && !i.includes("stable") ? "stable" : null;
	Ro.set(e, {
		...t,
		lockedScrollbarGutter: a,
		overflow: n.style.overflow,
		scrollbarGutter: n.style.scrollbarGutter
	}), a && (n.style.scrollbarGutter = a, Fo.value = r), n.style.overflow = "hidden";
}
function Uo(e) {
	let t = Ro.get(e);
	if (!t) return;
	let n = document.documentElement;
	n.style.overflow === "hidden" && (n.style.overflow = t.overflow), t.lockedScrollbarGutter !== null && n.style.scrollbarGutter === t.lockedScrollbarGutter && (n.style.scrollbarGutter = t.scrollbarGutter), t.lockedScrollbarGutter !== null && (Fo.value = 0);
}
function Wo(e) {
	let t = e, n = zo(e), r = getComputedStyle(t), i = (Number.parseFloat(r.borderLeftWidth) || 0) + (Number.parseFloat(r.borderRightWidth) || 0), a = Math.max(0, t.offsetWidth - t.clientWidth - i) > 0 && !r.scrollbarGutter.includes("stable") ? "stable" : null;
	Ro.set(e, {
		...n,
		lockedScrollbarGutter: a,
		overflow: t.style.overflow,
		scrollbarGutter: t.style.scrollbarGutter
	}), a && (t.style.scrollbarGutter = a), t.style.overflow = "hidden";
}
function Go(e) {
	let t = e, n = Ro.get(e);
	n && (t.style.overflow === "hidden" && (t.style.overflow = n.overflow), n.lockedScrollbarGutter !== null && t.style.scrollbarGutter === n.lockedScrollbarGutter && (t.style.scrollbarGutter = n.scrollbarGutter));
}
function Ko(e) {
	let t = Ro.get(e);
	!t || t.count > 0 || (e === Io ? Uo(e) : Go(e), Vo(e), Ro.delete(e));
}
function qo() {
	[...Ro.keys()].forEach((e) => {
		e === Io ? Uo(e) : Go(e), Vo(e);
	}), Ro.clear();
}
function Jo({ inertElement: e = null, scrollElement: t } = {}) {
	let n = t instanceof HTMLElement ? t : Io, r = zo(n);
	r.count === 0 ? (n === Io ? Ho(n) : Wo(n), Bo(n, e)) : e && r.inertElement !== e && Bo(n, e);
	let i = zo(n);
	Ro.set(n, {
		...i,
		count: i.count + 1
	});
}
function Yo(e) {
	let t = e?.scrollElement instanceof HTMLElement ? e.scrollElement : Io, n = Ro.get(t);
	n && (Ro.set(t, {
		...n,
		count: Math.max(0, n.count - 1)
	}), Ko(t));
}
function Xo(e, t) {
	let n = Po.value.filter((e) => e.isConnected);
	if (n.length === 0 && qo(), n.includes(e)) {
		Po.value = n;
		return;
	}
	Lo.set(e, t), Po.value = [...n, e], Jo(t);
}
function Zo(e) {
	let t = Lo.get(e);
	Lo.delete(e), Po.value = Po.value.filter((t) => t !== e && t.isConnected), t && Yo(t), Po.value.length === 0 && qo();
}
//#endregion
//#region src/components/use-focus-trap.js
var Qo = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
function $o(e, t) {
	let n = null, r = !1;
	function i() {
		let t = e.value;
		return t ? [...t.querySelectorAll(Qo)].filter((e) => e instanceof HTMLElement) : [];
	}
	function a(t) {
		if (t.key !== "Tab") return;
		let n = i(), r = e.value;
		if (!r) return;
		if (n.length === 0) {
			t.preventDefault(), r.focus({ preventScroll: !0 });
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
			(n instanceof HTMLElement && n.isConnected ? n : i).focus({ preventScroll: !0 });
		}
	}
	function s() {
		r ||= (e.value?.addEventListener("keydown", a), document.addEventListener("focusin", o, !0), !0);
	}
	function c() {
		r && (e.value?.removeEventListener("keydown", a), document.removeEventListener("focusin", o, !0), r = !1, n = null);
	}
	V(t, (e) => {
		e ? s() : c();
	}, { immediate: !0 }), x(c);
}
var es = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatSpacer",
	inheritAttrs: !1
}, {
	__name: "MatSpacer",
	setup(e) {
		return (e, t) => (T(), s("span", g(e.$attrs, {
			class: "mat-spacer",
			"aria-hidden": "true"
		}), null, 16));
	}
}), [["__scopeId", "data-v-cf9d6504"]]), ts = { class: "mat-dialog__header" }, ns = {
	key: 1,
	class: "mat-dialog__actions"
}, rs = { class: "mat-dialog__content-body" }, is = {
	key: 0,
	class: "mat-dialog__icon"
}, as = { class: "mat-dialog__content-body" }, os = {
	key: 3,
	class: "mat-dialog__actions"
}, ss = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => vt(e, {
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
			validator: Ve
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: r }) {
		let l = $("dialog", e), p = r, h = R(), v = B(), b = f(), S = m(kt, null), w = Object.prototype.hasOwnProperty.call(b?.vnode.props ?? {}, "attach"), E = k(null), D = k(null), O = k(!1), A = k("closed"), j = k(null), N = F(null), P = `${z().replace(/[^\w-]/g, "-")}-title`, W = i(() => D.value?.root ?? D.value?.$el ?? null), G = i(() => !!N.value), K = i(() => l.title !== void 0 || !!v.title), ee = i(() => l.content !== void 0 || !!v.default), q = i(() => !l.fullScreen && (l.icon !== void 0 || !!v.icon)), J = i(() => !!v.activator), Y = i(() => Po.value.at(-1) === W.value), { colorStyle: X } = lt(i(() => l.color)), Z = i(() => {
			if (l.fullScreen || l.width === void 0) return;
			let e = yt(l.width, {
				property: "inline-size",
				positive: !0
			});
			if (e !== void 0) return {
				inlineSize: `min(${e}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), te = i(() => [h.style]), ne = i(() => [X.value, Z.value]), re = !1, ie = Ot(), ae = null;
		$o(W, i(() => O.value && Y.value));
		function oe() {
			let e = E.value ? [...E.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function se() {
			ie.cancel();
		}
		function ce(e, t) {
			ie.wait(W.value, e, t);
		}
		function le() {
			if (typeof l.attach == "string") try {
				return document.querySelector(l.attach);
			} catch {
				return null;
			}
			return l.attach instanceof HTMLElement && l.attach.ownerDocument === document ? l.attach : null;
		}
		function ue(e) {
			if (S && !w) return {
				context: S,
				target: S.modalLayer.value
			};
			if (w) {
				let t = e ? Nt(e) : null;
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
			p("update:modelValue", !1);
		}
		function pe() {
			K.value || h["aria-label"] || h["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function me() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function he() {
			let e = W.value;
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
			if (se(), O.value && W.value?.open) {
				A.value = "opening", ce(400, () => {
					A.value = "open", p("opened");
				});
				return;
			}
			let e = J.value ? oe() : null;
			if (J.value && !e) {
				me(), fe();
				return;
			}
			let t = le(), n = ue(t), r = n ? n.target : t;
			if (!r) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), fe();
				return;
			}
			ae = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), N.value = n, j.value = r, O.value = !0, A.value = "opening", pe(), await _(), !(!l.modelValue || !W.value) && (W.value.open || W.value.show(), Xo(W.value, n ? de(n.context) : void 0), he(), ce(400, () => {
				A.value = "open", p("opened");
			}));
		}
		function _e() {
			let e = W.value;
			e?.open && e.close(), e && Zo(e), N.value = null, O.value = !1, A.value = "closed", _(() => {
				ae?.isConnected && ae.focus({ preventScroll: !0 }), ae = null, p("closed");
			});
		}
		function ve() {
			O.value && (A.value = "closing", ce(200, _e));
		}
		function ye(e) {
			e.preventDefault(), fe();
		}
		function be(e) {
			e.key === "Escape" && (e.preventDefault(), fe());
		}
		function xe(e) {
			!l.closeOnBack || e.target !== W.value || fe();
		}
		return C(() => {
			re = !0, l.modelValue && ge();
		}), x(() => {
			re = !1, se(), W.value && (Zo(W.value), W.value.open && W.value.close());
		}), V(() => l.modelValue, (e) => {
			re && (e ? ge() : ve());
		}), V(() => l.attach, () => {
			l.modelValue && O.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), H(() => {
			l.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (e, r) => (T(), s(t, null, [J.value ? (T(), s("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: E,
			class: "mat-dialog__activator"
		}, [M(e.$slots, "activator", {}, void 0, !0)], 512)) : o("", !0), O.value ? (T(), a(n, {
			key: 1,
			to: j.value
		}, [d(Or, g({
			ref_key: "surface",
			ref: D
		}, e.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${A.value}`, {
				"mat-dialog--app-root": G.value,
				"mat-dialog--full-screen": L(l).fullScreen,
				"mat-dialog--with-icon": q.value,
				"mat-dialog--top": Y.value,
				"mat-dialog--transparent-scrim": !L(l).scrim
			}]],
			style: te.value,
			"aria-labelledby": e.$attrs["aria-labelledby"] ?? (K.value ? P : void 0),
			"aria-modal": "true",
			tabindex: "-1",
			onCancel: ye,
			onClick: xe,
			onKeydown: be
		}), {
			default: U(() => [c("div", {
				class: "mat-dialog__panel",
				style: y(ne.value)
			}, [L(l).fullScreen ? (T(), s(t, { key: 0 }, [c("header", ts, [
				d(kn, {
					class: "mat-dialog__close",
					icon: "close",
					label: L(l).closeLabel,
					size: "small",
					variant: "standard",
					onClick: fe
				}, null, 8, ["label"]),
				K.value ? (T(), s("h2", {
					key: 0,
					id: P,
					class: "mat-dialog__title mat-sys-typescale-title-large"
				}, [L(l).title === void 0 ? M(e.$slots, "title", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(l).title), 1)], 64))])) : o("", !0),
				d(es),
				e.$slots.actions ? (T(), s("div", ns, [M(e.$slots, "actions", {}, void 0, !0)])) : o("", !0)
			]), ee.value ? (T(), a(aa, {
				key: 0,
				class: "mat-dialog__content mat-sys-typescale-body-medium",
				orientation: "vertical",
				"no-scroll-padding": "",
				"bar-width": "thin"
			}, {
				default: U(() => [c("div", rs, [L(l).content === void 0 ? M(e.$slots, "default", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(l).content), 1)], 64))])]),
				_: 3
			})) : o("", !0)], 64)) : (T(), s(t, { key: 1 }, [
				q.value ? (T(), s("div", is, [d(pt, {
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: U(() => [L(l).icon === void 0 ? M(e.$slots, "icon", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(l).icon), 1)], 64))]),
					_: 3
				})])) : o("", !0),
				K.value ? (T(), s("h2", {
					key: 1,
					id: P,
					class: "mat-dialog__title mat-sys-typescale-headline-small"
				}, [L(l).title === void 0 ? M(e.$slots, "title", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(l).title), 1)], 64))])) : o("", !0),
				ee.value ? (T(), a(aa, {
					key: 2,
					class: "mat-dialog__content mat-sys-typescale-body-medium",
					orientation: "vertical",
					"no-scroll-padding": "",
					"bar-width": "thin"
				}, {
					default: U(() => [c("div", as, [L(l).content === void 0 ? M(e.$slots, "default", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(L(l).content), 1)], 64))])]),
					_: 3
				})) : o("", !0),
				e.$slots.actions ? (T(), s("div", os, [M(e.$slots, "actions", {}, void 0, !0)])) : o("", !0)
			], 64))], 4)]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : o("", !0)], 64));
	}
}), [["__scopeId", "data-v-9fb33860"]]), cs = ["aria-label"], ls = {
	key: 1,
	class: "mat-sheet__header"
}, us = {
	key: 1,
	class: "mat-sheet__header-actions"
}, ds = { class: "mat-sheet__content-body" }, fs = {
	key: 3,
	class: "mat-sheet__footer"
}, ps = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
	setup(e, { emit: r }) {
		let l = e, p = r, h = R(), b = B(), S = f(), w = m(kt, null), E = Object.prototype.hasOwnProperty.call(S?.vnode.props ?? {}, "attach"), D = k(null), O = k(null), A = k(null), j = k(!1), N = k("closed"), P = k(null), L = F(null), H = k(typeof window > "u" ? 0 : window.innerWidth), W = 0, G = k(!1), ee = `${z().replace(/[^\w-]/g, "-")}-title`, q = i(() => O.value?.root ?? O.value?.$el ?? null), J = i(() => !!L.value), Y = i(() => Z.value ? A.value : q.value), X = i(() => l.variant === "auto" ? H.value < Tt(l.breakpoint, {
			positive: !0,
			fallback: 840
		}) ? "modal" : "standard" : l.variant), Z = i(() => X.value === "modal"), te = i(() => Z.value && Po.value.at(-1) === q.value), ne = i(() => !!b.activator), re = i(() => l.title !== void 0 || !!b.title), ie = i(() => l.content !== void 0 || !!b.default), ae = i(() => l.closable), oe = i(() => [
			`mat-sheet__panel--${l.direction}`,
			`mat-sheet__panel--position-${l.position}`,
			{
				"mat-sheet__panel--expanded": l.direction === "bottom" && l.expanded,
				"mat-sheet__panel--dragging": G.value
			}
		]), se = i(() => l.expanded ? Z.value ? l.expandedDragHandleLabel : l.collapseDragHandleLabel : l.dragHandleLabel), ce = i(() => re.value || ae.value || !!b.header || !!b.actions), le = i(() => Z.value ? "dialog" : "aside"), ue = i(() => {
			if (l.width !== void 0) return yt(l.width, {
				property: "inline-size",
				positive: !0
			});
		}), de = i(() => {
			if (ue.value) return { "--mat-sheet-preferred-width": ue.value };
		}), fe = i(() => [h.style]), pe = i(() => [de.value]), me = !1, he = Ot(), ge = null, _e = !1, ve = null, ye = 0, be = 0, xe = 0, Se = 0, Ce = !1;
		$o(q, i(() => Z.value && j.value && te.value));
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
		function Q() {
			if (typeof l.attach == "string") try {
				return document.querySelector(l.attach);
			} catch {
				return null;
			}
			return l.attach instanceof HTMLElement && l.attach.ownerDocument === document ? l.attach : null;
		}
		function De(e) {
			if (w && !E) return {
				context: w,
				target: w.modalLayer.value
			};
			if (E) {
				let t = e ? Nt(e) : null;
				if (t) return {
					context: t,
					target: t.modalLayer.value
				};
			}
			return null;
		}
		function Oe(e) {
			return {
				inertElement: e.contentElement.value,
				scrollElement: e.documentMode.value ? null : e.contentElement.value
			};
		}
		function ke() {
			p("update:modelValue", !1);
		}
		function Ae(e, t) {
			if (W = e, q.value?.style.setProperty("--mat-sheet-drag-offset", `${e}px`), t === null) {
				q.value?.style.removeProperty("--mat-sheet-drag-size");
				return;
			}
			q.value?.style.setProperty("--mat-sheet-drag-size", `${t}px`);
		}
		function je() {
			Ae(0, null);
		}
		function Me() {
			if (Ce) {
				Ce = !1;
				return;
			}
			if (l.expanded) {
				if (Z.value) {
					ke();
					return;
				}
				p("update:expanded", !1);
				return;
			}
			p("update:expanded", !0);
		}
		function Ne(e) {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), Me());
		}
		function Pe() {
			console.warn(`${l.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`);
		}
		function Fe() {
			!Z.value || re.value || h["aria-label"] || h["aria-labelledby"] || console.warn(`${l.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
		}
		function Ie() {
			console.warn(`${l.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function Le() {
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
					let t = L.value;
					if (!t) return;
					Xo(e, Oe(t.context));
				} else Xo(e);
				Le();
			}
		}
		async function ze() {
			if (we(), j.value) {
				N.value = "opening", Te(400, () => {
					N.value = "open", p("opened");
				});
				return;
			}
			let e = ne.value ? Ee() : null;
			if (ne.value && !e) {
				Pe(), ke();
				return;
			}
			if (Z.value) {
				let t = Q(), n = De(t), r = n ? n.target : t;
				if (!r) {
					Ie(), ke();
					return;
				}
				L.value = n, P.value = r, ge = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			} else L.value = null;
			_e = Z.value, j.value = !0, N.value = "opening", Fe(), await _(), !(!l.modelValue || !q.value) && (Z.value && Re(), Te(400, () => {
				N.value = "open", p("opened");
			}));
		}
		function Be() {
			_e && ge?.isConnected && ge.focus({ preventScroll: !0 }), ge = null, _e = !1;
		}
		function Ve() {
			let e = q.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), Zo(e)), L.value = null, j.value = !1, N.value = "closed", je(), _(() => {
				Be(), p("closed");
			});
		}
		async function He() {
			j.value && (N.value = "closing", await _(), !(l.modelValue || N.value !== "closing" || !q.value) && Te(200, Ve));
		}
		function Ue(e) {
			e.preventDefault(), ke();
		}
		function We(e) {
			e.key === "Escape" && (e.preventDefault(), ke());
		}
		function Ge(e) {
			!Z.value || !l.closeOnBack || e.target !== q.value || ke();
		}
		function Ke(e) {
			if (e.pointerId === ve) {
				if (l.direction === "bottom") {
					if (Se = e.clientY - ye, !l.expanded && Se < 0 || l.expanded && Se > 0) {
						Ae(0, Math.max(0, be - Se));
						return;
					}
					Ae(Math.max(0, Se), be);
					return;
				}
				Ae(l.position === "start" ? Math.max(0, ye - e.clientX) : Math.max(0, e.clientX - ye), null);
			}
		}
		let qe = Zr(Ke);
		function Je(e) {
			e.pointerId === ve && qe.schedule(e);
		}
		function Ye() {
			ve = null, G.value = !1, window.removeEventListener("pointermove", Je), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Ze);
		}
		function Xe(e) {
			if (e.pointerId !== ve) return;
			qe.flush();
			let t = Y.value, n = l.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - xe), i = l.direction === "bottom" ? Math.abs(Se) : W, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (Ce = i >= 4, Ye(), l.direction === "bottom" && o) {
				if (!l.expanded && Se < 0) {
					je(), p("update:expanded", !0);
					return;
				}
				if (l.expanded && Se > 0) {
					je(), p("update:expanded", !1);
					return;
				}
				if (!l.expanded && Se > 0) {
					Ae(W, null), ke();
					return;
				}
			}
			if (l.direction === "side" && o) {
				ke();
				return;
			}
			je();
		}
		function Ze() {
			qe.cancel(), Ye(), je();
		}
		function Qe(e) {
			!l.draggable || e.button !== 0 || ve !== null || (qe.cancel(), ve = e.pointerId, ye = l.direction === "bottom" ? e.clientY : e.clientX, be = l.direction === "bottom" ? Y.value?.getBoundingClientRect().height ?? 0 : Y.value?.getBoundingClientRect().width ?? 0, xe = performance.now(), Se = 0, Ae(0, l.direction === "bottom" ? be : null), G.value = !0, window.addEventListener("pointermove", Je), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Ze));
		}
		function $e(e) {
			l.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Qe(e);
		}
		function et(e) {
			Z.value || $e(e);
		}
		function tt(e) {
			Z.value && $e(e);
		}
		function nt() {
			H.value = window.innerWidth;
		}
		async function rt(e, t) {
			if (!j.value || !l.modelValue || e === t) return;
			we();
			let n = q.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), Zo(n), Be(), L.value = null), e === "modal") {
				let e = Q(), t = De(e), n = t ? t.target : e;
				if (!n) {
					Ie(), ke();
					return;
				}
				L.value = t, P.value = n, ge = document.activeElement instanceof HTMLElement ? document.activeElement : null, _e = !0, Fe();
			}
			N.value = "open", await _(), e === "modal" && l.modelValue && Re();
		}
		return C(() => {
			me = !0, nt(), window.addEventListener("resize", nt), l.modelValue && ze();
		}), x(() => {
			qe.cancel(), me = !1, we(), Ye(), window.removeEventListener("resize", nt);
			let e = q.value;
			e instanceof HTMLDialogElement && (Zo(e), e.open && e.close());
		}), V(() => l.modelValue, (e) => {
			me && (e ? ze() : He());
		}), V(X, rt), V(() => l.attach, () => {
			l.modelValue && j.value && Z.value && console.warn(`${l.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), V(() => l.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${l.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, i) => (T(), s(t, null, [ne.value ? (T(), s("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: D,
			class: "mat-sheet__activator"
		}, [M(r.$slots, "activator", {}, void 0, !0)], 512)) : o("", !0), j.value ? (T(), a(n, {
			key: 1,
			to: P.value ?? "body",
			disabled: !Z.value
		}, [d(Or, g({
			ref_key: "surface",
			ref: O
		}, r.$attrs, {
			as: le.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${X.value}`,
				`mat-sheet--${N.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--app-root": J.value,
					"mat-sheet--dragging": G.value,
					"mat-sheet--expanded": e.direction === "bottom" && e.expanded,
					"mat-sheet--top": te.value,
					"mat-sheet--transparent-scrim": !e.scrim
				}
			]],
			style: fe.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (re.value ? ee : void 0),
			"aria-modal": Z.value ? "true" : void 0,
			tabindex: Z.value ? -1 : void 0,
			onCancel: Ue,
			onClick: Ge,
			onKeydown: We,
			onPointerdown: et
		}), {
			default: U(() => [c("div", {
				ref_key: "panelElement",
				ref: A,
				class: v(["mat-sheet__panel", oe.value]),
				style: y(pe.value),
				onPointerdown: tt
			}, [
				e.direction === "bottom" && e.dragHandle ? (T(), s("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": se.value,
					onClick: Me,
					onKeydown: Ne,
					onPointerdown: K(Qe, ["stop"])
				}, [M(r.$slots, "drag-handle", {}, () => [i[0] ||= c("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, cs)) : o("", !0),
				ce.value ? (T(), s("header", ls, [M(r.$slots, "header", {}, () => [
					re.value ? (T(), s("h2", {
						key: 0,
						id: ee,
						class: "mat-sheet__title mat-sys-typescale-title-large"
					}, [e.title === void 0 ? M(r.$slots, "title", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(e.title), 1)], 64))])) : o("", !0),
					r.$slots.actions ? (T(), s("div", us, [M(r.$slots, "actions", {}, void 0, !0)])) : o("", !0),
					ae.value ? (T(), a(kn, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: ke
					}, null, 8, ["label"])) : o("", !0)
				], !0)])) : o("", !0),
				ie.value ? (T(), a(aa, {
					key: 2,
					class: "mat-sheet__content mat-sys-typescale-body-medium",
					orientation: "vertical",
					"no-scroll-padding": "",
					"bar-width": "thin"
				}, {
					default: U(() => [c("div", ds, [e.content === void 0 ? M(r.$slots, "default", { key: 1 }, void 0, !0) : (T(), s(t, { key: 0 }, [u(I(e.content), 1)], 64))])]),
					_: 3
				})) : o("", !0),
				r.$slots.footer ? (T(), s("div", fs, [M(r.$slots, "footer", {}, void 0, !0)])) : o("", !0)
			], 38)]),
			_: 3
		}, 16, [
			"as",
			"class",
			"style",
			"aria-labelledby",
			"aria-modal",
			"tabindex"
		])], 8, ["to", "disabled"])) : o("", !0)], 64));
	}
}), [["__scopeId", "data-v-9a53b49a"]]), ms = /*@__PURE__*/ Object.assign({
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
			validator: (e) => vt(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => vt(e, {
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
		let n = $("bottomSheet", e), r = f(), o = Object.prototype.hasOwnProperty.call(r?.vnode.props ?? {}, "attach"), s = i(() => {
			if (o) return n;
			let e = { ...n };
			return delete e.attach, e;
		}), c = t;
		return (e, t) => (T(), a(ps, g({
			...s.value,
			...e.$attrs
		}, {
			"component-name": "MatBottomSheet",
			direction: "bottom",
			"onUpdate:modelValue": t[0] ||= (e) => c("update:modelValue", e),
			"onUpdate:expanded": t[1] ||= (e) => c("update:expanded", e),
			onOpened: t[2] ||= (e) => c("opened"),
			onClosed: t[3] ||= (e) => c("closed")
		}), l({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: U(() => [M(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots["drag-handle"] ? {
				name: "drag-handle",
				fn: U(() => [M(e.$slots, "drag-handle")]),
				key: "1"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: U(() => [M(e.$slots, "header")]),
				key: "2"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: U(() => [M(e.$slots, "title")]),
				key: "3"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: U(() => [M(e.$slots, "default")]),
				key: "4"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: U(() => [M(e.$slots, "actions")]),
				key: "5"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: U(() => [M(e.$slots, "footer")]),
				key: "6"
			} : void 0
		]), 1040));
	}
}), hs = /*@__PURE__*/ Object.assign({
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
			validator: (e) => vt(e, {
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
			validator: (e) => vt(e, {
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
		let n = $("sideSheet", e), r = f(), o = Object.prototype.hasOwnProperty.call(r?.vnode.props ?? {}, "attach"), s = i(() => {
			if (o) return n;
			let e = { ...n };
			return delete e.attach, e;
		}), c = t;
		return (e, t) => (T(), a(ps, g({
			...s.value,
			...e.$attrs
		}, {
			"component-name": "MatSideSheet",
			direction: "side",
			"onUpdate:modelValue": t[0] ||= (e) => c("update:modelValue", e),
			onOpened: t[1] ||= (e) => c("opened"),
			onClosed: t[2] ||= (e) => c("closed")
		}), l({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: U(() => [M(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: U(() => [M(e.$slots, "header")]),
				key: "1"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: U(() => [M(e.$slots, "title")]),
				key: "2"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: U(() => [M(e.$slots, "default")]),
				key: "3"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: U(() => [M(e.$slots, "actions")]),
				key: "4"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: U(() => [M(e.$slots, "footer")]),
				key: "5"
			} : void 0
		]), 1040));
	}
}), gs = { class: "mat-container__content" }, _s = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		return (e, n) => (T(), s("div", g(e.$attrs, { class: ["mat-container", { "mat-container--fluid": L(t).fluid }] }), [c("div", gs, [M(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-f2274c15"]]), vs = /*@__PURE__*/ Object.assign({
	name: "MatTableWrapper",
	inheritAttrs: !1
}, {
	__name: "MatTableWrapper",
	setup(e) {
		return (e, t) => (T(), s("div", g(e.$attrs, { class: "table-wrapper" }), [M(e.$slots, "default")], 16));
	}
}), ys = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatVirtualScroll",
	inheritAttrs: !1
}, {
	__name: "MatVirtualScroll",
	props: {
		items: {
			type: Array,
			default: () => []
		},
		itemHeight: {
			type: [Number, String],
			default: void 0,
			validator: (e) => vt(e, { positive: !0 })
		},
		estimatedItemHeight: {
			type: [Number, String],
			default: 48,
			validator: (e) => vt(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		buffer: {
			type: [Number, String],
			default: 3,
			validator: (e) => vt(e, { allowUndefined: !1 })
		},
		itemKey: {
			type: [Function, String],
			default: void 0
		},
		as: {
			type: String,
			default: "div",
			validator: Ge
		}
	},
	emits: {
		scroll: (e) => typeof e?.scrollTop == "number" && typeof e?.startIndex == "number" && typeof e?.endIndex == "number",
		"visible-range-change": (e) => typeof e?.startIndex == "number" && typeof e?.endIndex == "number"
	},
	setup(e, { expose: n, emit: r }) {
		let i = $("virtualScroll", e), o = r, l = k(null), { calculate: u, getItemKey: d, getScroller: f, paddingBottom: p, paddingTop: m, refresh: h, scrollTo: g, scrollToIndex: _, setItemRef: v, visibleItems: b } = Xr({
			root: l,
			props: i,
			enabled: !0,
			pinEdges: !1,
			emit: o
		});
		return n({
			calculate: u,
			getScroller: f,
			refresh: h,
			scrollTo: g,
			scrollToIndex: _
		}), (e, n) => (T(), a(N(L(i).as), {
			ref_key: "root",
			ref: l,
			class: "mat-virtual-scroll"
		}, {
			default: U(() => [
				c("div", {
					class: "mat-virtual-scroll__spacer",
					style: y({ height: `${L(m)}px` }),
					"aria-hidden": "true"
				}, null, 4),
				(T(!0), s(t, null, j(L(b), (t) => M(e.$slots, "default", {
					key: L(d)(t.item, t.index),
					item: t.item,
					index: t.index,
					itemRef: (e) => L(v)(t.index, e)
				}, void 0, !0)), 128)),
				c("div", {
					class: "mat-virtual-scroll__spacer",
					style: y({ height: `${L(p)}px` }),
					"aria-hidden": "true"
				}, null, 4)
			]),
			_: 3
		}, 512));
	}
}), [["__scopeId", "data-v-98962098"]]), bs = ["aria-valuenow"], xs = 48, Ss = 24, Cs = 240, ws = 650, Ts = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatLoading",
	inheritAttrs: !1
}, {
	__name: "MatLoading",
	props: {
		containment: {
			type: Boolean,
			default: !1
		},
		size: {
			type: [Number, String],
			default: 48,
			validator: (e) => !(typeof e != "number" && (typeof e != "string" || !/^\s*\d+(\.\d+)?\s*$/.test(e)))
		},
		color: {
			type: String,
			default: void 0,
			validator: Ve
		},
		progress: {
			type: Number,
			default: void 0,
			validator: (e) => e === void 0 || Number.isFinite(e)
		}
	},
	setup(e) {
		let t = $("loading", e), { colorStyle: n } = lt(i(() => t.color)), r = k(0), a, o = 0, c, l, u = i(() => {
			let e = Tt(t.size, {
				positive: !0,
				fallback: xs
			});
			return Math.min(Math.max(e, Ss), Cs);
		}), f = i(() => ({ "--mat-loading-size": `${u.value}px` })), p = i(() => Number.isFinite(t.progress)), m = i(() => p.value ? Math.max(t.progress, 0) : 0), h = i(() => Math.min(m.value, 1)), _ = i(() => p.value ? { "--mat-loading-determinate-morph-progress": `${h.value}` } : {}), v = i(() => ({
			...n.value,
			...f.value,
			..._.value
		})), b = i(() => u.value * (38 / 48)), S = i(() => p.value ? h.value >= 1 ? "soft-burst" : "circle" : _r[r.value]), w = i(() => {
			if (p.value) return { rotate: String(-m.value * 180) + "deg" };
		});
		function E() {
			return l ? l.matches : typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function D() {
			a !== void 0 && (globalThis.cancelAnimationFrame?.(a), a = void 0);
		}
		function O() {
			r.value = 0, o = 0, c = void 0;
		}
		function A(e) {
			if (a = void 0, p.value) return;
			c !== void 0 && (o += e - c), c = e;
			let t = Math.floor(o / ws) % _r.length;
			t !== r.value && (r.value = t), E() || (a = globalThis.requestAnimationFrame(A));
		}
		function j() {
			D(), O(), !(p.value || typeof globalThis.requestAnimationFrame != "function" || E()) && (a = globalThis.requestAnimationFrame(A));
		}
		return V(() => t.progress, () => {
			if (p.value) {
				D(), O();
				return;
			}
			j();
		}), C(() => {
			typeof globalThis.matchMedia == "function" && (l = globalThis.matchMedia("(prefers-reduced-motion: reduce)"), l.addEventListener?.("change", j)), j();
		}), x(() => {
			D(), l?.removeEventListener?.("change", j);
		}), (e, n) => (T(), s("div", g(e.$attrs, {
			class: ["mat-loading", {
				"mat-loading--contained": L(t).containment,
				"mat-loading--determinate": p.value
			}],
			style: v.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": "1",
			"aria-valuenow": p.value ? h.value : void 0
		}), [d(vr, {
			class: "mat-loading__active-indicator",
			name: S.value,
			size: b.value,
			color: L(t).color || "primary",
			style: y(w.value),
			"aria-hidden": "true"
		}, null, 8, [
			"name",
			"size",
			"color",
			"style"
		])], 16, bs));
	}
}), [["__scopeId", "data-v-47a074d9"]]), Es = ["aria-valuemax", "aria-valuenow"], Ds = ["width", "height"], Os = { key: 0 }, ks = ["width", "height"], As = { class: "mat-progress__linear-bar mat-progress__linear-bar--primary" }, js = ["d"], Ms = { class: "mat-progress__linear-bar mat-progress__linear-bar--secondary" }, Ns = ["d"], Ps = ["d", "mask"], Fs = { class: "mat-progress__linear-bar mat-progress__linear-bar--primary" }, Is = ["d"], Ls = { class: "mat-progress__linear-bar mat-progress__linear-bar--secondary" }, Rs = ["d"], zs = ["d"], Bs = {
	key: 1,
	class: "mat-progress__linear-stop"
}, Vs = ["viewBox"], Hs = { class: "mat-progress__circular-linear-rotate" }, Us = { class: "mat-progress__circular-rotate-arc" }, Ws = [
	"cx",
	"cy",
	"r"
], Gs = ["d"], Ks = 4, qs = 48, Js = 24, Ys = 240, Xs = 4, Zs = 4.8, Qs = 3, $s = 40, ec = 15, tc = 18, nc = 20.4, rc = 2, ic = 4, ac = .001, oc = 100, sc = 300, cc = 900, lc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatProgress",
	inheritAttrs: !1
}, {
	__name: "MatProgress",
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
			validator: (e) => vt(e, {
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
			validator: Ve
		}
	},
	setup(e) {
		function n(e) {
			return typeof e == "number" && Number.isFinite(e);
		}
		function r(e) {
			return n(e) && e > 0;
		}
		function a(e) {
			return Number(e.toFixed(3)).toString();
		}
		function l() {
			return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function u(e, t, n, r, i) {
			let o = t / 2, s = Math.min(e / 2, n / 2), c = Math.max(s, e - n / 2), l = [`M ${a(s)} ${a(o)}`];
			for (let e = s + 2; e < c; e += 2) {
				let t = (e - s) / $s * Math.PI * 2, n = o - Math.sin(t - i) * r;
				l.push(`L ${a(e)} ${a(n)}`);
			}
			let u = (c - s) / $s * Math.PI * 2, d = o - Math.sin(u - i) * r;
			return l.push(`L ${a(c)} ${a(d)}`), l.join(" ");
		}
		function d(e, t, n, r, i) {
			let o = Math.max(1, Math.round(Math.PI * 2 * t / i)), s = o * 12, c = [];
			for (let i = 0; i <= s; i += 1) {
				let l = i / s, u = l * Math.PI * 2, d = l * Math.PI * 2 * o, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = i === 0 ? "M" : "L";
				c.push(`${h} ${a(p)} ${a(m)}`);
			}
			return c.push("Z"), c.join(" ");
		}
		let f = $("progress", e), { colorStyle: p } = lt(i(() => f.color)), m = k(null), h = k(oc), _ = k(+(f.shape === "wavy")), v = k(0), b = `mat-progress-linear-mask-${z()}`, S, w, E, D = i(() => r(f.max) ? f.max : 1), O = i(() => f.variant === "circular"), A = i(() => f.shape === "wavy"), j = i(() => {
			let e = Tt(f.size, {
				allowNegative: !0,
				fallback: qs
			});
			return Math.min(Math.max(e, Js), Ys);
		}), M = i(() => j.value / 12), N = i(() => M.value * 2), P = i(() => j.value / qs), F = i(() => 1.6 * P.value), I = i(() => ec * P.value), R = i(() => rc * P.value), B = i(() => O.value ? f.thickness === "heavy" ? N.value : M.value : f.thickness === "heavy" ? Zs : Xs), H = i(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), D.value);
		}), U = i(() => Number((H.value / D.value * 100).toFixed(3))), W = i(() => B.value + Qs * 2 * _.value), G = i(() => Math.min(100, B.value / h.value * 100)), K = i(() => {
			let e = h.value - B.value;
			return e <= 0 ? 1 : h.value / e;
		}), ee = i(() => U.value === 100 ? 100 : Math.min(100, Math.max(U.value, G.value + ac))), q = i(() => u(h.value, W.value, B.value, 0, 0)), J = i(() => u(h.value, W.value, B.value, Qs * _.value, v.value)), Y = i(() => j.value / 2), X = i(() => (tc + (nc - tc) * _.value) * P.value), Z = i(() => `0 0 ${j.value} ${j.value}`), te = i(() => d(Y.value, X.value, F.value * _.value, v.value, I.value)), ne = i(() => {
			let e = Math.PI * 2 * X.value;
			return (Ks + B.value) / e * 100;
		}), re = i(() => Math.min(12, ne.value)), ie = i(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - U.value - ne.value * 2).toFixed(3)), t = Number(Math.min(100, U.value + ne.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${a(e)} ${a(100 - e)}`,
				strokeDashoffset: `-${a(t)}`
			};
		}), ae = i(() => f.indeterminate ? {} : { strokeDasharray: `${a(U.value === 0 ? ac : U.value)} 200` }), oe = i(() => ({
			...p.value,
			"--mat-progress-circular-gap-progress": a(re.value),
			"--mat-progress-circular-margin": `${R.value}px`,
			"--mat-progress-circular-radius": `${X.value}px`,
			"--mat-progress-circular-size": `${j.value}px`,
			"--mat-progress-indicator-gap-size": `${Ks}px`,
			"--mat-progress-linear-cap-progress": a(G.value),
			"--mat-progress-linear-path-scale": a(K.value),
			"--mat-progress-linear-segment-end": a(ee.value),
			"--mat-progress-linear-segment-end-position": `${a(ee.value)}%`,
			"--mat-progress-linear-size": `${W.value}px`,
			"--mat-progress-progress": `${U.value}`,
			"--mat-progress-stop-indicator-size": `${ic}px`,
			"--mat-progress-thickness": `${B.value}px`
		}));
		function se(e) {
			w = void 0;
			let t = E === void 0 ? 0 : Math.min(64, e - E), n = +!!A.value, r = n - _.value;
			if (E = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / sc);
				_.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && _.value > 0 && (v.value += t / cc * Math.PI * 2, v.value %= Math.PI * 2);
			let i = _.value !== n, a = f.waveMotion && _.value > 0;
			i || a ? w = globalThis.requestAnimationFrame(se) : E = void 0;
		}
		function ce() {
			if (l() || typeof globalThis.requestAnimationFrame != "function") {
				_.value = +!!A.value;
				return;
			}
			w === void 0 && (E = void 0, w = globalThis.requestAnimationFrame(se));
		}
		return V(A, ce), V(() => f.waveMotion, ce), C(() => {
			ce(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (S = new globalThis.ResizeObserver(([e]) => {
				let t = e.contentRect.width;
				t > 0 && (h.value = t);
			}), S.observe(m.value));
		}), x(() => {
			S?.disconnect(), w !== void 0 && globalThis.cancelAnimationFrame?.(w);
		}), (e, n) => (T(), s("div", g(e.$attrs, {
			class: ["mat-progress", [
				`mat-progress--${L(f).variant}`,
				`mat-progress--${L(f).shape}`,
				{
					"mat-progress--indeterminate": L(f).indeterminate,
					"mat-progress--wave-motion": L(f).waveMotion
				}
			]],
			style: oe.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": D.value,
			"aria-valuenow": L(f).indeterminate ? void 0 : H.value
		}), [O.value ? (T(), s("svg", {
			key: 1,
			class: "mat-progress__circular",
			viewBox: Z.value,
			"aria-hidden": "true"
		}, [c("g", Hs, [c("g", Us, [c("circle", {
			class: "mat-progress__circular-track",
			cx: Y.value,
			cy: Y.value,
			r: X.value,
			pathLength: "100",
			style: y(ie.value)
		}, null, 12, Ws), c("path", {
			class: "mat-progress__circular-active",
			d: te.value,
			pathLength: "100",
			style: y(ae.value)
		}, null, 12, Gs)])])], 8, Vs)) : (T(), s("span", {
			key: 0,
			ref_key: "linearElement",
			ref: m,
			class: "mat-progress__linear",
			"aria-hidden": "true"
		}, [
			L(f).indeterminate ? o("", !0) : (T(), s(t, { key: 0 }, [n[0] ||= c("span", { class: "mat-progress__linear-track mat-progress__linear-track--before" }, null, -1), n[1] ||= c("span", { class: "mat-progress__linear-track mat-progress__linear-track--after" }, null, -1)], 64)),
			(T(), s("svg", {
				class: "mat-progress__linear-indicator",
				width: h.value,
				height: W.value
			}, [
				L(f).indeterminate ? (T(), s("defs", Os, [c("mask", {
					id: b,
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: h.value,
					height: W.value
				}, [
					n[2] ||= c("rect", {
						width: "100%",
						height: "100%",
						fill: "white"
					}, null, -1),
					c("g", As, [c("path", {
						class: "mat-progress__linear-segment mat-progress__linear-segment--primary mat-progress__linear-gap mat-progress__linear-gap--primary",
						d: J.value,
						pathLength: "100"
					}, null, 8, js)]),
					c("g", Ms, [c("path", {
						class: "mat-progress__linear-segment mat-progress__linear-segment--secondary mat-progress__linear-gap mat-progress__linear-gap--secondary",
						d: J.value,
						pathLength: "100"
					}, null, 8, Ns)])
				], 8, ks)])) : o("", !0),
				L(f).indeterminate ? (T(), s("path", {
					key: 1,
					class: "mat-progress__linear-indeterminate-track",
					d: q.value,
					pathLength: "100",
					mask: `url(#${b})`
				}, null, 8, Ps)) : o("", !0),
				L(f).indeterminate ? (T(), s(t, { key: 2 }, [c("g", Fs, [c("path", {
					class: "mat-progress__linear-active mat-progress__linear-active--primary mat-progress__linear-segment mat-progress__linear-segment--primary",
					d: J.value,
					pathLength: "100"
				}, null, 8, Is)]), c("g", Ls, [c("path", {
					class: "mat-progress__linear-active mat-progress__linear-active--secondary mat-progress__linear-segment mat-progress__linear-segment--secondary",
					d: J.value,
					pathLength: "100"
				}, null, 8, Rs)])], 64)) : (T(), s("path", {
					key: 3,
					class: "mat-progress__linear-active mat-progress__linear-active--determinate",
					d: J.value,
					pathLength: "100"
				}, null, 8, zs))
			], 8, Ds)),
			L(f).indeterminate ? o("", !0) : (T(), s("span", Bs))
		], 512))], 16, Es));
	}
}), [["__scopeId", "data-v-90a3c307"]]), uc = Symbol("mat-snackbar-externally-managed"), dc = [], fc = null;
function pc() {
	fc || dc.length === 0 || (fc = dc.shift(), fc.activate());
}
function mc(e) {
	e === fc || dc.includes(e) || (dc.push(e), pc());
}
function hc(e) {
	let t = dc.indexOf(e);
	t !== -1 && dc.splice(t, 1);
}
function gc(e) {
	fc === e && (fc = null, pc());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var _c = { class: "mat-snackbar__text" }, vc = {
	key: 0,
	class: "mat-snackbar__controls"
}, yc = {
	key: 0,
	class: "mat-snackbar__action"
}, bc = {
	key: 1,
	class: "mat-snackbar__close"
}, xc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
	setup(e, { emit: r }) {
		let l = $("snackbar", e), f = r, p = B(), h = m(je, Ae), v = m(kt, null), y = m(uc, !1), b = k(!1), S = k("closed"), w = k(!1), E = i(() => !!p.default || typeof l.text == "string" && l.text.trim().length > 0), D = i(() => !!p.action || typeof l.actionText == "string" && l.actionText.trim().length > 0), O = i(() => !!p.close || l.closable), A = i(() => D.value || O.value), j = k(0), N = k(null), P = i(() => v ? v.snackbarLayer.value : document.body), F = i(() => typeof l.closeLabel == "string" && l.closeLabel.trim().length > 0 ? l.closeLabel : "关闭"), R = !1, z, H = Ot(), W = !1, G = null, K = i(() => ({ "--mat-snackbar-toolbar-clearance": `${j.value}px` }));
		function ee() {
			j.value = ln();
		}
		let q = { activate: ce };
		function J() {
			z !== void 0 && (window.clearTimeout(z), z = void 0);
		}
		function Y() {
			H.cancel();
		}
		function X(e, t) {
			H.wait(N.value, e, t);
		}
		function Z() {
			return Number.isFinite(l.duration) && l.duration >= 0 ? l.duration : 4e3;
		}
		function te() {
			J();
			let e = Z();
			e !== 0 && (z = window.setTimeout(() => {
				z = void 0, oe();
			}, e));
		}
		function ne() {
			W || (W = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function re() {
			b.value && (b.value = !1, S.value = "closed", f("closed"), y || gc(q));
		}
		function ie() {
			if (J(), !b.value) {
				y || hc(q);
				return;
			}
			S.value !== "closing" && (S.value = "closing", X(200, re));
		}
		function ae() {
			w.value || (w.value = !0, f("update:modelValue", !1));
		}
		function oe() {
			ae(), ie();
		}
		function se() {
			!b.value || S.value === "closing" || (oe(), f("action"));
		}
		async function ce() {
			if (!R || !l.modelValue || w.value || !E.value) {
				E.value || (ne(), ae()), y || gc(q);
				return;
			}
			J(), Y(), b.value = !0, S.value = "opening", await _(), !(!R || !b.value || S.value === "closing") && X(400, () => {
				!b.value || S.value === "closing" || (S.value = "open", te());
			});
		}
		function le() {
			if (w.value || !E.value) {
				E.value || (ne(), oe());
				return;
			}
			if (y) {
				ce();
				return;
			}
			if (b.value && S.value === "closing") {
				ce();
				return;
			}
			mc(q);
		}
		return C(() => {
			R = !0, v || (G = un(ee), ee()), l.modelValue && le();
		}), x(() => {
			R = !1, G?.(), G = null, J(), Y(), y || (b.value ? gc(q) : hc(q));
		}), V(() => l.modelValue, (e) => {
			if (R) {
				if (e) {
					w.value = !1, le();
					return;
				}
				w.value = !1, ie();
			}
		}), V(E, (e) => {
			if (R) {
				if (!e) {
					oe();
					return;
				}
				W = !1, l.modelValue && !b.value && !w.value && le();
			}
		}), V(() => l.duration, () => {
			S.value === "open" && te();
		}), (e, r) => P.value ? (T(), a(n, {
			key: 0,
			to: P.value
		}, [b.value ? (T(), s("section", g({
			key: 0,
			ref_key: "snackbarElement",
			ref: N
		}, e.$attrs, {
			class: ["mat-snackbar mat-sys-typescale-body-medium", [
				`mat-snackbar--${S.value}`,
				`mat-snackbar--${L(l).position}`,
				{
					"mat-snackbar--app-root": L(v),
					"mat-snackbar--with-trailing": A.value
				}
			]],
			style: K.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [c("div", _c, [e.$slots.default ? M(e.$slots, "default", { key: 0 }, void 0, !0) : (T(), s(t, { key: 1 }, [u(I(L(l).text), 1)], 64))]), A.value ? (T(), s("div", vc, [D.value ? (T(), s("div", yc, [e.$slots.action ? M(e.$slots, "action", {
			key: 0,
			action: se
		}, void 0, !0) : (T(), a(De, {
			key: 1,
			class: "mat-snackbar__default-action mat-sys-typescale-label-large",
			"use-cursor": L(h).useCursor,
			onClick: se
		}, {
			default: U(() => [u(I(L(l).actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : o("", !0), O.value ? (T(), s("div", bc, [e.$slots.close ? M(e.$slots, "close", {
			key: 0,
			close: oe
		}, void 0, !0) : (T(), a(De, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": F.value,
			"use-cursor": L(h).useCursor,
			onClick: oe
		}, {
			default: U(() => [d(pt, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : o("", !0)])) : o("", !0)], 16)) : o("", !0)], 8, ["to"])) : o("", !0);
	}
}), [["__scopeId", "data-v-65e2ee3f"]]), Sc = ["aria-orientation"], Cc = { class: "mat-toolbar__surface" }, wc = { class: "mat-toolbar__content" }, Tc = 200, Ec = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => vt(e, {
				property: "block-size",
				allowUndefined: !1
			})
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e) {
		let r = [
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
		let u = $("toolbar", e), d = R(), p = B(), h = f(), v = m(kt, null), b = h?.vnode.props ?? {}, S = Object.prototype.hasOwnProperty.call(b, "attach"), w = k(u.modelValue), E = k(u.modelValue ? "open" : "closed"), D = k(null), O = k(null), A = k({
			blockSize: 0,
			inlineSize: 0
		}), j = i(() => r.includes(u.variant) ? u.variant === "floating" ? "floating-bottom" : u.variant : "docked"), N = i(() => [
			"start",
			"center",
			"end"
		].includes(u.position) ? u.position : "center"), P = i(() => j.value.startsWith("floating")), I = i(() => j.value === "floating-left" || j.value === "floating-right"), z = i(() => j.value === "docked" || j.value === "floating-bottom"), H = i(() => u.app && !!v && !S), U = i(() => {
			if (!u.app) return null;
			if (H.value) return P.value ? v.freeLayer.value : null;
			if (typeof u.attach == "string") try {
				return document.querySelector(u.attach);
			} catch {
				return null;
			}
			return l(u.attach);
		}), W = i(() => {
			let e = yt(u.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), G = i(() => z.value ? W.value : "0px"), K = i(() => [d.style, {
			"--mat-toolbar-app-bottom-offset": `${J.value?.insets.bottom ?? 0}px`,
			"--mat-toolbar-app-end-inset": `${J.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${J.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": G.value
		}]), ee = i(() => ({
			blockSize: `${A.value.blockSize}px`,
			inlineSize: `${A.value.inlineSize}px`
		})), q = i(() => [
			`mat-toolbar--${j.value}`,
			`mat-toolbar--position-${N.value}`,
			{
				"mat-toolbar--app": u.app,
				"mat-toolbar--app-root": H.value,
				"mat-toolbar--vertical": I.value,
				"mat-toolbar--vibrant": u.vibrant
			}
		]), J = F(null), Y, X, Z = !1, te = !1, ne = Ot(), re = !1;
		function ie() {
			ne.cancel();
		}
		function ae(e) {
			ne.wait(D.value, Tc, e);
		}
		function oe() {
			ie(), w.value = !0, E.value = "opening", ae(() => {
				w.value && u.modelValue && (E.value = "open");
			});
		}
		function se() {
			if (ie(), !w.value) {
				E.value = "closed";
				return;
			}
			E.value = "closing", ae(() => {
				u.modelValue || (w.value = !1, E.value = "closed");
			});
		}
		function ce() {
			re || !p.fab || P.value || (re = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function le() {
			let e = D.value?.getBoundingClientRect();
			e && (A.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, Y?.update(), J.value?.update());
		}
		function ue() {
			if (!D.value) return null;
			let e = D.value.getBoundingClientRect(), t = O.value?.getBoundingClientRect();
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
			te && (await _(), le());
		}
		function fe() {
			X?.disconnect(), X = void 0, Z = !1, window.removeEventListener("resize", le), Y?.unregister(), Y = void 0, J.value?.unregister(), J.value = null;
		}
		async function pe() {
			if (await _(), te) {
				if (!w.value || !D.value) {
					fe();
					return;
				}
				Z || (Z = !0, X = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(le), X?.observe(D.value), window.addEventListener("resize", le)), H.value ? (Y?.unregister(), Y = void 0, !P.value && !J.value && (J.value = v.publicContext.registerEdge({
					edge: "bottom",
					element: D.value
				})), P.value && J.value && (J.value.unregister(), J.value = null)) : (J.value?.unregister(), J.value = null, Y ||= sn(D.value, {
					getRect: ue,
					isBottom: () => z.value
				})), O.value && X?.observe(O.value), le(), ce();
			}
		}
		C(() => {
			te = !0, me(), ce(), pe();
		}), x(() => {
			te = !1, ie(), fe();
		}), V(() => u.modelValue, (e) => {
			if (te) {
				if (e) {
					oe();
					return;
				}
				se();
			}
		}), V(w, pe), V([
			j,
			N,
			W,
			() => u.app,
			() => u.attach,
			H
		], () => {
			me(), de(), pe();
		});
		function me() {
			u.app && !H.value && !U.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, i) => (T(), s(t, null, [e.placeholder && w.value && (!e.app || U.value || H.value) ? (T(), s("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: y(ee.value),
			"aria-hidden": "true"
		}, null, 4)) : o("", !0), (T(), a(n, {
			to: U.value ?? "body",
			disabled: !e.app || H.value && !P.value
		}, [w.value && (!e.app || U.value || H.value) ? (T(), s("div", g({
			key: 0,
			ref_key: "toolbarElement",
			ref: D
		}, r.$attrs, {
			class: ["mat-toolbar", [q.value, `mat-toolbar--${E.value}`]],
			style: K.value,
			role: "toolbar",
			"aria-orientation": I.value ? "vertical" : void 0
		}), [c("div", Cc, [c("div", wc, [M(r.$slots, "default", {}, void 0, !0)])]), P.value && L(p).fab ? (T(), s("div", {
			key: 0,
			ref_key: "fabElement",
			ref: O,
			class: "mat-toolbar__fab"
		}, [M(r.$slots, "fab", {}, void 0, !0)], 512)) : o("", !0)], 16, Sc)) : o("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-3aaaf898"]]), Dc = Symbol("mat-panes"), Oc = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], kc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => Oc.includes(e)
	},
	setup(e, { emit: t }) {
		let n = $("panes", e), r = t, a = k(null), o = P([]), c = k(null), l = k(null), u = k(null), d = /* @__PURE__ */ new Map(), f, p, m, h, v, y = i(() => c.value ?? b.value), b = i(() => {
			let e = {};
			return o.forEach((t) => {
				let r = n.sizes?.[t.id];
				e[t.id] = typeof r == "number" && Number.isFinite(r) && r >= 0 ? r : 1;
			}), Object.values(e).reduce((e, t) => e + t, 0) === 0 && o.length > 0 && o.forEach((t) => {
				e[t.id] = 1;
			}), e;
		});
		function S(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function w(e, t) {
			return `${e}::${t}`;
		}
		function D(e) {
			return o.findIndex((t) => t.id === e);
		}
		function O(e) {
			return o.find((t) => t.id === e)?.element.value ?? null;
		}
		function A(e) {
			let t = O(e);
			return t ? t.getBoundingClientRect().width : 0;
		}
		function j(e) {
			let t = D(e);
			if (t < 0 || t >= o.length - 1) return null;
			let n = o[t], r = o[t + 1];
			return {
				key: w(n.id, r.id),
				left: n,
				right: r
			};
		}
		function N(e) {
			return y.value[e] ?? 0;
		}
		function F(e) {
			return { "--mat-pane-weight": N(e) };
		}
		function I(e) {
			return n.resizable && j(e) !== null;
		}
		function L(e) {
			return j(e) !== null;
		}
		function R(e) {
			return j(e)?.key === l.value;
		}
		function z(e) {
			let t = j(e);
			if (!t) return {};
			let n = N(t.left.id) + N(t.right.id), r = n === 0 ? 50 : Math.round(N(t.left.id) / n * 100);
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
		function H(e) {
			h !== void 0 && globalThis.clearTimeout(h), h = globalThis.setTimeout(() => {
				h = void 0, c.value === e && (c.value = null);
			}, 0);
		}
		function U(e) {
			let t = {};
			o.forEach((n) => {
				t[n.id] = Math.max(0, e[n.id] ?? 0);
			}), c.value = t, r("update:sizes", t), H(t);
		}
		function W(e, t, n, r, i) {
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : S(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function G(e) {
			let t = j(e);
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
			let r = j(e), i = G(e);
			!r || !i || (t.preventDefault(), t.currentTarget?.setPointerCapture?.(t.pointerId), l.value = r.key, f = {
				boundary: r,
				changed: !1,
				metrics: i,
				pointerId: t.pointerId,
				startWeights: B(),
				startX: t.clientX
			});
		}
		function ee(e, t) {
			if (!f || f.pointerId !== t.pointerId) return;
			let n = j(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = S(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			c.value = W(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		let q = Zr(({ event: e, id: t }) => {
			ee(t, e);
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
			let r = j(e), i = f.changed, a = c.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				U(a);
				return;
			}
			c.value = null;
		}
		function X(e, t) {
			let r = j(e);
			if (!r || !n.resizable) return;
			let i = {
				ArrowLeft: -1,
				ArrowRight: 1
			}[t.key], a = G(e), o = B(), s = o[r.left.id] + o[r.right.id] || 2, c = a?.totalWidth || 100, l = c * (o[r.left.id] / s), u;
			if (i !== void 0) u = S(l + i * (t.shiftKey ? 64 : 16), 0, c);
			else if (t.key === "Home") u = 0;
			else if (t.key === "End") u = c;
			else if (t.key === "Enter") {
				let e = r.key, t = o[r.left.id];
				t === 0 ? u = c * (d.get(e) ?? .5) : (d.set(e, t / s), u = 0);
			} else return;
			t.preventDefault(), U(W(r.left.id, r.right.id, u, c, o));
		}
		function Z(e) {
			return o.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), o.push(e), () => {
				let t = o.indexOf(e);
				t !== -1 && o.splice(t, 1);
			};
		}
		function te() {
			let e = /* @__PURE__ */ new Set();
			o.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function ne() {
			let e = {};
			return o.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function re(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function ie() {
			m = void 0;
			let e = ne();
			re(v, e) || (v = e, r("update:widths", e));
		}
		function ae(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(ie, e ? 0 : 100);
		}
		function oe() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				ae();
			}), p.disconnect(), a.value && p.observe(a.value), o.forEach((e) => {
				e.element.value && p.observe(e.element.value);
			}));
		}
		function se(e) {
			return e < 600 ? "compact" : e < 840 ? "medium" : e < 1200 ? "expanded" : e < 1600 ? "large" : "extra-large";
		}
		function ce(e = !1) {
			let t = se(globalThis.window === void 0 ? 0 : globalThis.window.innerWidth);
			(e || u.value !== t) && (u.value = t, r("update:breakpoint", t));
		}
		function le() {
			ce();
		}
		return E(Dc, {
			getHandleAttributes: z,
			getPaneStyle: F,
			hasBoundary: L,
			handleKeyDown: X,
			handlePointerDown: K,
			handlePointerMove: J,
			isBoundaryActive: R,
			isHandleVisible: I,
			registerPane: Z,
			finishPointerInteraction: Y
		}), V(() => o.map((e) => e.id), async () => {
			await _(), te(), oe(), ae();
		}, {
			flush: "post",
			immediate: !0
		}), V(() => n.sizes, () => {
			c.value = null;
		}, { deep: !0 }), C(() => {
			ce(!0), oe(), ae(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", le);
		}), x(() => {
			q.cancel(), globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", le), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), h !== void 0 && globalThis.clearTimeout(h);
		}), (e, t) => (T(), s("div", g({
			ref_key: "root",
			ref: a
		}, e.$attrs, { class: "mat-panes" }), [M(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-e119bd21"]]), Ac = ["id"], jc = {
	key: 0,
	class: "mat-pane__separator"
}, Mc = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], Nc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = $("pane", e), r = m(Dc, null), a = k(null), l = i(() => n.resizeLabel), u, d = i(() => r?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = i(() => !!r?.hasBoundary(n.id)), p = i(() => !!r?.isHandleVisible(n.id)), h = i(() => r?.getHandleAttributes(n.id) ?? {}), _ = i(() => !!r?.isBoundaryActive(n.id));
		function y() {
			u?.(), u = void 0, r && (u = r.registerPane({
				element: a,
				id: n.id,
				resizeLabel: l
			}));
		}
		return C(y), V(() => n.id, y), x(() => u?.()), (i, l) => (T(), s(t, null, [c("div", g({
			ref_key: "root",
			ref: a
		}, i.$attrs, {
			id: L(n).id,
			class: "mat-pane",
			style: d.value
		}), [M(i.$slots, "default", {}, void 0, !0)], 16, Ac), f.value ? (T(), s("div", jc, [p.value ? (T(), s("div", {
			key: 0,
			class: v(["mat-pane__handle", { "mat-pane__handle--active": _.value }]),
			role: "separator",
			"aria-controls": h.value["aria-controls"],
			"aria-label": h.value["aria-label"],
			"aria-orientation": h.value["aria-orientation"],
			"aria-valuemax": h.value["aria-valuemax"],
			"aria-valuemin": h.value["aria-valuemin"],
			"aria-valuenow": h.value["aria-valuenow"],
			tabindex: "0",
			onKeydown: l[0] ||= (t) => L(r).handleKeyDown(e.id, t),
			onLostpointercapture: l[1] ||= (t) => L(r).finishPointerInteraction(e.id, t, !1),
			onPointercancel: l[2] ||= (t) => L(r).finishPointerInteraction(e.id, t, !1),
			onPointerdown: l[3] ||= (t) => L(r).handlePointerDown(e.id, t),
			onPointermove: l[4] ||= (t) => L(r).handlePointerMove(e.id, t),
			onPointerup: l[5] ||= (t) => L(r).finishPointerInteraction(e.id, t, !0)
		}, null, 42, Mc)) : o("", !0)])) : o("", !0)], 64));
	}
}), [["__scopeId", "data-v-1bf28501"]]), Pc = Symbol("mat-navigation-rail"), Fc = { class: "mat-navigation-rail-item__indicator" }, Ic = {
	key: 0,
	class: "mat-navigation-rail-item__icon-wrap"
}, Lc = { class: "mat-navigation-rail-item__label-wrap" }, Rc = {
	key: 0,
	class: "mat-navigation-rail-item__spacer",
	"aria-hidden": "true"
}, zc = {
	key: 1,
	class: "mat-navigation-rail-item__trailing"
}, Bc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		badge: {
			type: Object,
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
	setup(e, { emit: n }) {
		let r = [
			"top-start",
			"top",
			"top-end",
			"end",
			"bottom-end",
			"bottom",
			"bottom-start",
			"start"
		], l = $("navigationRailItem", e), u = n, d = B(), f = m(je, Ae), p = m(Pc, null), h = i(() => p?.expanded.value ?? !1), _ = i(() => p?.fullWidth.value ?? !1), y = i(() => p?.orientation.value === "horizontal"), b = i(() => p?.isSelected(l.value) ?? !1), x = i(() => !!(d.icon || l.icon && l.icon.trim())), S = i(() => x.value || !h.value), C = i(() => x.value ? l.icon : "circle"), w = i(() => {
			let e = l.badge;
			return e ? {
				content: h.value ? void 0 : e.content,
				dot: !h.value && e.dot,
				location: r.includes(e.location) ? e.location : "top-end",
				color: e.color
			} : null;
		}), E = i(() => Dn("label", h.value && !y.value ? "large" : "medium")), D = i(() => Dn("label", "medium")), O = i(() => ({
			"mat-navigation-rail-item--selected": b.value,
			"mat-navigation-rail-item--disabled": l.disabled,
			"mat-navigation-rail-item--expanded": h.value,
			"mat-navigation-rail-item--collapsed": !h.value,
			"mat-navigation-rail-item--horizontal": y.value,
			"mat-navigation-rail-item--full-width": _.value
		}));
		V(() => l.badge?.location, (e) => {}, { immediate: !0 });
		function k(e) {
			l.disabled || p?.requestSelection(l.value), u("click", e);
		}
		return (e, n) => (T(), a(De, g(e.$attrs, {
			class: ["mat-navigation-rail-item", O.value],
			"aria-current": b.value ? "page" : void 0,
			disabled: L(l).disabled,
			"focus-ring": !1,
			href: L(l).href,
			"use-cursor": L(f).useCursor,
			onClick: k
		}), {
			default: U(() => [
				c("span", Fc, [S.value ? (T(), s("span", Ic, [w.value ? (T(), a($i, {
					key: 0,
					color: w.value.color,
					content: w.value.content,
					dot: w.value.dot,
					location: w.value.location
				}, {
					default: U(() => [L(d).icon ? M(e.$slots, "icon", {
						key: 0,
						selected: b.value
					}, void 0, !0) : (T(), a(pt, {
						key: 1,
						fill: +!!b.value,
						icon: C.value,
						class: "mat-navigation-rail-item__icon",
						"aria-hidden": "true"
					}, null, 8, ["fill", "icon"]))]),
					_: 3
				}, 8, [
					"color",
					"content",
					"dot",
					"location"
				])) : (T(), s(t, { key: 1 }, [L(d).icon ? M(e.$slots, "icon", {
					key: 0,
					selected: b.value
				}, void 0, !0) : (T(), a(pt, {
					key: 1,
					fill: +!!b.value,
					icon: C.value,
					class: "mat-navigation-rail-item__icon",
					"aria-hidden": "true"
				}, null, 8, ["fill", "icon"]))], 64))])) : o("", !0), c("span", Lc, [c("span", { class: v(["mat-navigation-rail-item__label", E.value]) }, [M(e.$slots, "default", {}, void 0, !0)], 2)])]),
				c("span", { class: v(["mat-navigation-rail-item__label", D.value]) }, [M(e.$slots, "default", {}, void 0, !0)], 2),
				e.$slots.trailing ? (T(), s("span", Rc)) : o("", !0),
				e.$slots.trailing ? (T(), s("span", zc, [M(e.$slots, "trailing", {
					expanded: h.value,
					selected: b.value
				}, void 0, !0)])) : o("", !0)
			]),
			_: 3
		}, 16, [
			"class",
			"aria-current",
			"disabled",
			"href",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-b18013ea"]]), Vc = ["aria-label"], Hc = { class: "mat-navigation-rail__layout" }, Uc = {
	key: 0,
	class: "mat-navigation-rail__header"
}, Wc = {
	key: 1,
	class: "mat-navigation-rail__fab"
}, Gc = {
	key: 1,
	class: "mat-navigation-rail__content"
}, Kc = {
	key: 2,
	class: "mat-navigation-rail__end"
}, qc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => vt(e, { property: "inline-size" })
		},
		fullWidth: {
			type: Boolean,
			default: !1
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
			default: "start",
			validator(e) {
				return [
					"start",
					"center",
					"end"
				].includes(e);
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
			validator: (e) => vt(e, {
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
	setup(e, { emit: l }) {
		function u(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let b = $("navigationRail", e), S = l, w = m(je, Ae), D = f(), O = B(), A = m(kt, null), j = D?.vnode.props ?? {}, N = Object.prototype.hasOwnProperty.call(j, "attach"), P = i(() => b.orientation === "horizontal"), I = i(() => !P.value && b.layout === "modal"), R = i(() => !P.value && b.hideOnCollapse && !b.expanded), z = k(b.expanded), H = k(!R.value), W = i(() => z.value), G = i(() => b.collapsible || H.value && !!(O.header || O.fab)), K = i(() => !P.value && H.value && !!O.end), ee = i(() => !P.value && b.expanded);
		function q(e) {
			return e.type === Bc || e.type?.name === "MatNavigationRailItem";
		}
		function J(e) {
			return h(e) ? e.type === t && Array.isArray(e.children) ? p(t, { key: e.key }, e.children.map(J)) : q(e) || ee.value ? e : r(e, { hidden: !0 }) : e;
		}
		function Y() {
			return O.default?.({
				expanded: b.expanded,
				orientation: b.orientation
			}).map(J);
		}
		let X = Ot(), Z = i(() => b.app && !!A && !N), te = i(() => {
			if (!b.app || Z.value) return null;
			if (typeof b.attach == "string") try {
				return document.querySelector(b.attach);
			} catch {
				return null;
			}
			return u(b.attach);
		}), ne = i(() => b.expanded ? b.closeIcon : b.openIcon), re = i(() => b.expanded ? b.closeLabel : b.openLabel), ie = i(() => ({
			"mat-navigation-rail-host--vertical": !P.value,
			"mat-navigation-rail-host--horizontal": P.value,
			"mat-navigation-rail-host--expanded": W.value,
			"mat-navigation-rail-host--collapsed": !W.value,
			"mat-navigation-rail-host--modal": I.value,
			"mat-navigation-rail-host--hidden": R.value,
			"mat-navigation-rail-host--app": b.app,
			"mat-navigation-rail-host--app-root": Z.value
		})), ae = i(() => ({
			"mat-navigation-rail--expanded": W.value,
			"mat-navigation-rail--collapsed": !W.value,
			"mat-navigation-rail--bar": P.value,
			"mat-navigation-rail--modal": I.value && W.value,
			"mat-navigation-rail--hidden": R.value,
			"mat-navigation-rail--collapsible-hidden": !H.value,
			"mat-navigation-rail--with-header": G.value,
			"mat-navigation-rail--with-end": K.value,
			"mat-navigation-rail--app": b.app,
			"mat-navigation-rail--app-root": Z.value
		})), oe = i(() => {
			let e = yt(b.width, { property: "inline-size" });
			if (e !== void 0) return { "--mat-navigation-rail-expanded-width": e };
		}), se = i(() => {
			if (!b.app || Z.value) return "0px";
			let e = yt(b.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), ce = i(() => [oe.value, {
			"--mat-navigation-rail-app-bottom-inset": `${pe.value?.insets.bottom ?? 0}px`,
			"--mat-navigation-rail-app-bottom-offset": `${pe.value?.insets.bottom ?? 0}px`,
			"--mat-navigation-rail-app-end-inset": `${pe.value?.insets.end ?? 0}px`,
			"--mat-navigation-rail-app-start-inset": `${pe.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-app-start-offset": `${pe.value?.insets.start ?? 0}px`,
			"--mat-navigation-rail-app-top-inset": `${pe.value?.insets.top ?? 0}px`,
			"--mat-navigation-rail-bottom-placeholder": se.value
		}]), le = k(null), ue = k(null), de = k({
			blockSize: 0,
			inlineSize: 0
		}), fe = i(() => ({
			blockSize: `${de.value.blockSize}px`,
			inlineSize: `${de.value.inlineSize}px`
		})), pe = F(null), me;
		function he() {
			let e = le.value?.getBoundingClientRect();
			e && (de.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, pe.value?.update());
		}
		async function ge() {
			me?.disconnect(), me = void 0, pe.value?.unregister(), pe.value = null, await _(), !(!b.app || !le.value) && (me = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(he), me?.observe(le.value), Z.value && (pe.value = A.publicContext.registerEdge({
				edge: P.value ? "bottom" : "start",
				element: le.value
			})), he());
		}
		function _e() {
			b.app && !Z.value && !te.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		async function ve() {
			if (X.cancel(), b.expanded || !R.value) {
				z.value = b.expanded, H.value = !0;
				return;
			}
			H.value = !0, await _(), R.value && X.wait(le.value, 200, () => {
				R.value && (z.value = !1, H.value = !1);
			});
		}
		function ye(e) {
			return e !== void 0 && Object.is(b.modelValue, e);
		}
		function be(e) {
			e === void 0 || Object.is(b.modelValue, e) || S("update:modelValue", e);
		}
		function xe() {
			S("update:expanded", !b.expanded);
		}
		function Se() {
			S("update:expanded", !1);
		}
		function Ce(e) {
			e.key === "Escape" && I.value && b.expanded && Se();
		}
		return E(Pc, {
			expanded: W,
			fullWidth: i(() => b.fullWidth),
			isSelected: ye,
			orientation: i(() => b.orientation),
			requestSelection: be,
			useCursor: w.useCursor
		}), C(() => {
			window.addEventListener("keydown", Ce), _e(), ge();
		}), x(() => {
			X.cancel(), window.removeEventListener("keydown", Ce), me?.disconnect(), pe.value?.unregister();
		}), V([
			() => b.app,
			() => b.attach,
			() => b.bottomPlaceholder,
			() => b.expanded,
			() => b.hideOnCollapse,
			() => b.layout,
			() => b.orientation,
			() => b.width,
			Z
		], () => {
			_e(), ge();
		}), V([
			() => b.expanded,
			() => b.hideOnCollapse,
			() => b.orientation
		], ve), (e, r) => (T(), s(t, null, [L(b).app && (te.value || Z.value) && L(b).placeholder ? (T(), s("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: y(fe.value),
			"aria-hidden": "true"
		}, null, 4)) : o("", !0), (T(), a(n, {
			to: te.value ?? "body",
			disabled: !L(b).app || Z.value
		}, [!L(b).app || te.value || Z.value ? (T(), s("div", {
			key: 0,
			ref_key: "hostElement",
			ref: le,
			class: v(["mat-navigation-rail-host", ie.value]),
			style: y(ce.value)
		}, [I.value && L(b).expanded ? (T(), s("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": L(b).closeLabel,
			onClick: Se
		}, null, 8, Vc)) : o("", !0), c("nav", g({
			ref_key: "railElement",
			ref: ue
		}, e.$attrs, { class: ["mat-navigation-rail", ae.value] }), [!P.value && L(b).collapsible && !H.value ? (T(), a(De, {
			key: 0,
			class: "mat-navigation-rail__menu mat-navigation-rail__menu--detached",
			"aria-expanded": L(b).expanded,
			"aria-label": re.value,
			"focus-ring": !1,
			"use-cursor": L(w).useCursor,
			onClick: xe
		}, {
			default: U(() => [d(pt, {
				icon: ne.value,
				"aria-hidden": "true"
			}, null, 8, ["icon"])]),
			_: 1
		}, 8, [
			"aria-expanded",
			"aria-label",
			"use-cursor"
		])) : o("", !0), d(aa, {
			class: "mat-navigation-rail__scroll-area",
			orientation: P.value ? "horizontal" : "vertical",
			"bar-width": "thin",
			"shadow-length": 0,
			"no-scroll-padding": ""
		}, {
			default: U(() => [c("div", Hc, [
				!P.value && G.value && H.value ? (T(), s("div", Uc, [
					M(e.$slots, "header", { expanded: L(b).expanded }, void 0, !0),
					L(b).collapsible ? (T(), a(De, {
						key: 0,
						class: "mat-navigation-rail__menu",
						"aria-expanded": L(b).expanded,
						"aria-label": re.value,
						"focus-ring": !1,
						"use-cursor": L(w).useCursor,
						onClick: xe
					}, {
						default: U(() => [d(pt, {
							icon: ne.value,
							"aria-hidden": "true"
						}, null, 8, ["icon"])]),
						_: 1
					}, 8, [
						"aria-expanded",
						"aria-label",
						"use-cursor"
					])) : o("", !0),
					e.$slots.fab && H.value ? (T(), s("div", Wc, [M(e.$slots, "fab", { expanded: L(b).expanded }, void 0, !0)])) : o("", !0)
				])) : o("", !0),
				H.value ? (T(), s("div", Gc, [c("div", { class: v(["mat-navigation-rail__destinations", [`mat-navigation-rail__destinations--${L(b).alignment}`, { "mat-navigation-rail__destinations--show-custom-content": ee.value }]]) }, [d(Y)], 2)])) : o("", !0),
				e.$slots.end && H.value && !P.value ? (T(), s("div", Kc, [M(e.$slots, "end", { expanded: L(b).expanded }, void 0, !0)])) : o("", !0)
			])]),
			_: 3
		}, 8, ["orientation"])], 16)], 6)) : o("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-2a87778a"]]), Jc = /* @__PURE__ */ new WeakMap();
function Yc(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function Xc(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = Yc(t.value), i = new IntersectionObserver((t, r) => {
		let i = Jc.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), Jc.delete(e));
	}, r);
	Jc.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function Zc(e) {
	let t = Jc.get(e);
	t && (t.observer.unobserve(e), Jc.delete(e));
}
var Qc = {
	mounted: Xc,
	updated(e, t) {
		Jc.has(e) && (Zc(e), Xc(e, t));
	},
	unmounted: Zc
}, $c = Object.freeze({
	MatDynamicText: Object.freeze(["MdeDynamicText", "mde-dynamic-text"]),
	MatSharedElement: Object.freeze(["MdeSharedElement", "mde-shared-element"]),
	MatVirtualScroll: Object.freeze(["MdeVirtualScroll", "mde-virtual-scroll"])
}), el = Ae, tl = null;
function nl(e, t) {
	el = e, tl = t;
}
function rl() {
	return el;
}
function il() {
	return tl;
}
//#endregion
//#region src/theme.js
var al = "#20a6fc", ol = "(prefers-color-scheme: dark)";
function sl(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function cl(e) {
	if (!Xe.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function ll(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function ul(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function dl(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function fl(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? al, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	sl(t), dl(n), cl(r), ll(i), ul(a);
	let o = k(t), s = k(nt(n)), c = k(r), l = k(i), u = k("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(ol)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = rt({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(Ze).forEach(([t, n]) => {
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
		sl(e), o.value = e, y(), g();
	}
	function x(e) {
		dl(e), s.value = nt(e), g();
	}
	function S(e) {
		cl(e), c.value = e, g();
	}
	function C(e) {
		ll(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(Ze).forEach((e) => {
			a.style.removeProperty(`--mat-sys-color-${e}`);
		}), a.removeAttribute?.("data-mat-theme"), a.style.removeProperty("color-scheme");
	}
	return y(), g(), {
		mode: O(o),
		resolvedMode: O(u),
		seedColor: O(s),
		schemeVariant: O(c),
		contrastLevel: O(l),
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
var pl = [
	[
		"MatAppRoot",
		"mat-app-root",
		Nn
	],
	[
		"MatAppBar",
		"mat-app-bar",
		Gn
	],
	[
		"MatSearch",
		"mat-search",
		Yn
	],
	[
		"MatBtn",
		"mat-btn",
		kn
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		Zn
	],
	[
		"MatFab",
		"mat-fab",
		ir
	],
	[
		"MatIcon",
		"mat-icon",
		pt
	],
	[
		"MatImage",
		"mat-image",
		or
	],
	[
		"MatSharedElement",
		"mat-shared-element",
		dr
	],
	[
		"MatAvatar",
		"mat-avatar",
		mr
	],
	[
		"MatShape",
		"mat-shape",
		vr
	],
	[
		"MatText",
		"mat-text",
		yr
	],
	[
		"MatDynamicText",
		"mat-dynamic-text",
		Tr
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		Dr
	],
	[
		"MatCard",
		"mat-card",
		Fr
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		Lr
	],
	[
		"MatCardContent",
		"mat-card-content",
		zr
	],
	[
		"MatCardActions",
		"mat-card-actions",
		Vr
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		Ar
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		Pr
	],
	[
		"MatCardMedia",
		"mat-card-media",
		Mr
	],
	[
		"MatExpansion",
		"mat-expansion",
		_i
	],
	[
		"MatExpansionPanel",
		"mat-expansion-panel",
		Fi
	],
	[
		"MatList",
		"mat-list",
		hi
	],
	[
		"MatListGroup",
		"mat-list-group",
		Mi
	],
	[
		"MatListItem",
		"mat-list-item",
		ki
	],
	[
		"MatDivider",
		"mat-divider",
		Hi
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		Ji
	],
	[
		"MatBadge",
		"mat-badge",
		$i
	],
	[
		"MatChip",
		"mat-chip",
		ia
	],
	[
		"MatChipSet",
		"mat-chip-set",
		sa
	],
	[
		"MatRadio",
		"mat-radio",
		la
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		fa
	],
	[
		"MatSwitch",
		"mat-switch",
		pa
	],
	[
		"MatSlider",
		"mat-slider",
		Ha
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		Ka
	],
	[
		"MatTextField",
		"mat-text-field",
		uo
	],
	[
		"MatSelect",
		"mat-select",
		To
	],
	[
		"MatTextarea",
		"mat-textarea",
		Eo
	],
	[
		"MatInputBase",
		"mat-input-base",
		Kn
	],
	[
		"MatMenu",
		"mat-menu",
		po
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		_o
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		ho
	],
	[
		"MatDockedContainer",
		"mat-docked-container",
		No
	],
	[
		"MatDialog",
		"mat-dialog",
		ss
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		ms
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		hs
	],
	[
		"MatHover",
		"mat-hover",
		Et
	],
	[
		"MatContainer",
		"mat-container",
		_s
	],
	[
		"MatSpacer",
		"mat-spacer",
		es
	],
	[
		"MatTableWrapper",
		"mat-table-wrapper",
		vs
	],
	[
		"MatScrollArea",
		"mat-scroll-area",
		aa
	],
	[
		"MatVirtualScroll",
		"mat-virtual-scroll",
		ys
	],
	[
		"MatLoading",
		"mat-loading",
		Ts
	],
	[
		"MatProgress",
		"mat-progress",
		lc
	],
	[
		"MatTooltip",
		"mat-tooltip",
		_n
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		xc
	],
	[
		"MatToolbar",
		"mat-toolbar",
		Ec
	],
	[
		"MatPanes",
		"mat-panes",
		kc
	],
	[
		"MatPane",
		"mat-pane",
		Nc
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		qc
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		Bc
	]
], ml = new Map(pl.map(([e, , t]) => [Me(e), t]));
function hl(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function gl(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? Ae.iconClass;
}
function _l(e, t) {
	let n = e[t];
	if (n === void 0) return ke[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function vl(e) {
	if (e === void 0) return ke;
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi defaults.tooltip 必须是对象");
	return Object.freeze({
		openDelay: _l(e, "openDelay"),
		closeDelay: _l(e, "closeDelay")
	});
}
function yl(e) {
	let t = Object.keys(e.props ?? {}), n = new Set(Object.keys(e.emits ?? {}).filter((e) => e.startsWith("update:")).map((e) => e.slice(7)));
	return new Set(t.filter((e) => !n.has(e)));
}
function bl(e) {
	let t = e.defaults;
	if (t === void 0) return Object.freeze({ tooltip: ke });
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi defaults 必须是对象");
	let n = { tooltip: vl(t.tooltip) };
	return Object.entries(t).forEach(([e, t]) => {
		if (e === "tooltip") return;
		let r = ml.get(e);
		if (!r) throw TypeError(`createMatUi defaults 未知组件键 ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError(`createMatUi defaults.${e} 必须是对象`);
		let i = yl(r), a = {};
		Object.entries(t).forEach(([t, n]) => {
			if (!i.has(t)) throw TypeError(`createMatUi defaults.${e}.${t} 不是可配置属性`);
			a[t] = n;
		}), n[e] = Object.freeze(a);
	}), Object.freeze(n);
}
function xl(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: gl(e),
		useCursor: hl(e, "useCursor"),
		defaults: bl(e)
	}), n = fl(e.theme);
	return {
		theme: n,
		install(e) {
			pl.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r), ($c[t] ?? []).forEach((t) => {
					e.component(t, r);
				});
			}), e.directive("intersection", Qc), e.directive("state-layer", Ee), e.provide(je, t), e.provide(ot, n), nl(t, n);
		}
	};
}
function Sl() {
	let e = m(ot, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mde-vue 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/view-transition.js
function Cl() {
	return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wl() {
	return typeof document > "u" || typeof document.startViewTransition != "function" ? null : document.startViewTransition.bind(document);
}
function Tl(e) {
	if (e === void 0) return [];
	let t = Array.isArray(e) ? e : [e];
	if (t.some((e) => typeof e != "string" || e.trim().length === 0)) throw TypeError("useMatViewTransition.start names 必须是非空字符串或非空字符串数组");
	return [...new Set(t)];
}
function El() {
	let e = null, t = null;
	async function n(n, r = {}) {
		if (typeof n != "function") throw TypeError("useMatViewTransition.start update 必须是函数");
		let i = Tl(r.names);
		t && await t, e &&= (e.skipTransition?.(), await e.finished.catch(() => {}), null);
		let a = wl();
		if (r.skip || !a || Cl()) {
			await n();
			return;
		}
		let o, s = new Promise((e) => {
			o = e;
		});
		t = s;
		let c = lr(i), l;
		try {
			await _(), l = a(() => n()), e = l, o(), t === s && (t = null), await l.finished;
		} finally {
			o(), t === s && (t = null), e === l && (e = null), ur(c), await _();
		}
	}
	return Object.freeze({
		get supported() {
			return !!wl();
		},
		start: n
	});
}
var Dl = El, Ol = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, kl = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		E(je, rl());
		let r = il();
		r && E(ot, r);
		let c = k(!0), l = F(n.cancelValue), f = k(n.options.promptConfig?.defaultValue ?? ""), p = i(() => !!n.options.promptConfig), m = i(() => n.options.promptConfig?.required ?? !1), h = i(() => m.value && f.value.trim().length === 0), _ = i(() => {
			let e = { ...n.options };
			return delete e.actions, delete e.ariaLabel, delete e.promptConfig, n.options.promptConfig && delete e.content, e;
		});
		function v(e, t) {
			e.disabled || p.value && t === n.options.actions.length - 1 && h.value || (l.value = p.value && t === n.options.actions.length - 1 ? f.value : e.value, c.value = !1);
		}
		function y() {
			n.onClosed(l.value);
		}
		return (n, r) => (T(), a(ss, g({
			modelValue: c.value,
			"onUpdate:modelValue": r[1] ||= (e) => c.value = e
		}, _.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: U(() => [d(es), (T(!0), s(t, null, j(e.options.actions, (t, n) => (T(), a(kn, {
				key: n,
				color: t.color,
				disabled: t.disabled || p.value && n === e.options.actions.length - 1 && h.value,
				variant: t.variant,
				onClick: (e) => v(t, n)
			}, {
				default: U(() => [u(I(t.text), 1)]),
				_: 2
			}, 1032, [
				"color",
				"disabled",
				"variant",
				"onClick"
			]))), 128))]),
			default: U(() => [p.value ? (T(), s(t, { key: 0 }, [e.options.content ? (T(), s("p", Ol, I(e.options.content), 1)) : o("", !0), d(uo, {
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
			])], 64)) : o("", !0)]),
			_: 1
		}, 16, ["modelValue", "aria-label"]));
	}
}), [["__scopeId", "data-v-ba439738"]]), Al = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], jl = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], Ml = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function Nl(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function Pl() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function Fl(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function Il(e) {
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
function Ll(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !Al.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !Ve(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function Rl(e) {
	if (Fl(e), jl.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), Ml.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !Ve(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !Nl(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(Ll),
		attach: Il(e.attach)
	};
	return [
		...jl,
		...Ml,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function zl(e, t) {
	try {
		Pl();
		let n = Rl(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				A(p(kl, {
					cancelValue: t,
					options: n,
					onClosed(t) {
						A(null, i), i.remove(), e(t);
					}
				}), i);
			} catch (e) {
				A(null, i), i.remove(), r(e);
			}
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
function Bl(e = {}) {
	return zl(e, void 0);
}
function Vl(e = {}) {
	try {
		if (Fl(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return zl({
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
function Hl(e = {}) {
	try {
		Fl(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return zl({
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
function Ul(e = {}) {
	try {
		Fl(e);
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
		return zl({
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
var Wl = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		E(je, rl()), E(uc, !0);
		let n = il();
		n && E(ot, n);
		let r = k(!0), o = i(() => {
			let e = { ...t.options };
			return delete e.onAction, e;
		});
		function s() {
			t.onClosed();
		}
		function c() {
			t.options.onAction?.();
		}
		return (e, t) => (T(), a(xc, g({
			modelValue: r.value,
			"onUpdate:modelValue": t[0] ||= (e) => r.value = e
		}, o.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), Gl = [
	"left",
	"center",
	"right"
], Kl = null;
function ql() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function Jl(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function Yl(e) {
	if (Jl(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !Gl.includes(e.position)) throw TypeError("snackbar position 无效");
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
function Xl() {
	return Kl?.isConnected ? Kl : (Kl = document.createElement("div"), Kl.dataset.matSnackbarHost = "", document.body.append(Kl), Kl);
}
function Zl() {
	!Kl || Kl.childNodes.length > 0 || (Kl.remove(), Kl = null);
}
function Ql(e) {
	try {
		ql();
		let t = Yl(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = Kl;
				t && A(null, t), e(), gc(i), Zl();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = Kl;
				t && A(null, t), n(e), gc(i), Zl();
			}
			i = { activate() {
				try {
					let e = Xl();
					A(p(Wl, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, mc(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var $l = Ql;
//#endregion
export { Qc as Intersection, Gn as MatAppBar, Nn as MatAppRoot, mr as MatAvatar, $i as MatBadge, ms as MatBottomSheet, kn as MatBtn, Zn as MatBtnGroup, Fr as MatCard, Lr as MatCardActionArea, Vr as MatCardActions, zr as MatCardContent, Ar as MatCardHeadline, Mr as MatCardMedia, Pr as MatCardSubhead, Ji as MatCheckbox, ia as MatChip, sa as MatChipSet, _s as MatContainer, ss as MatDialog, Hi as MatDivider, No as MatDockedContainer, Tr as MatDynamicText, _i as MatExpansion, Fi as MatExpansionPanel, ir as MatFab, Et as MatHover, pt as MatIcon, or as MatImage, Kn as MatInputBase, hi as MatList, Mi as MatListGroup, ki as MatListItem, Ts as MatLoading, po as MatMenu, _o as MatMenuGroup, ho as MatMenuItem, qc as MatNavigationRail, Bc as MatNavigationRailItem, Nc as MatPane, kc as MatPanes, lc as MatProgress, la as MatRadio, fa as MatRadioGroup, Ka as MatRangeSlider, aa as MatScrollArea, Yn as MatSearch, To as MatSelect, vr as MatShape, dr as MatSharedElement, dr as MdeSharedElement, hs as MatSideSheet, Ha as MatSlider, xc as MatSnackbar, es as MatSpacer, Dr as MatSplitBtn, pa as MatSwitch, vs as MatTableWrapper, yr as MatText, uo as MatTextField, Eo as MatTextarea, Ec as MatToolbar, _n as MatTooltip, ys as MatVirtualScroll, ys as MdeVirtualScroll, Ee as StateLayer, Vl as alert, Hl as confirm, xl as createMatUi, Bl as dialog, Ul as prompt, Ql as snackbar, $l as toast, Pt as useMatApp, $ as useMatProps, Sl as useMatTheme, El as useMatViewTransition, Dl as useMdeViewTransition };
