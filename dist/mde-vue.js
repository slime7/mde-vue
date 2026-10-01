import { Comment as e, Fragment as t, Teleport as n, Transition as r, cloneVNode as i, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createSlots as u, createTextVNode as d, createVNode as f, getCurrentInstance as p, guardReactiveProps as m, h, inject as g, isVNode as _, mergeProps as v, nextTick as y, normalizeClass as b, normalizeProps as x, normalizeStyle as S, onActivated as C, onBeforeUnmount as w, onDeactivated as T, onMounted as E, onUpdated as D, openBlock as O, provide as k, reactive as A, readonly as j, ref as M, render as N, renderList as P, renderSlot as F, resolveDynamicComponent as I, shallowReactive as L, shallowRef as R, toDisplayString as z, unref as B, useAttrs as ee, useId as te, useSlots as ne, watch as V, watchEffect as H, withCtx as U, withDirectives as W, withKeys as G, withModifiers as K } from "vue";
import { Hct as re, SchemeExpressive as q, SchemeNeutral as ie, SchemeTonalSpot as J, SchemeVibrant as Y, argbFromHex as X, hexFromArgb as Z } from "@material/material-color-utilities";
//#region src/anchor-names.js
function ae(e) {
	return e.split(",").map((e) => e.trim()).filter(Boolean);
}
function oe(e, t) {
	let n = ae(e.style.getPropertyValue("anchor-name"));
	n.includes(t) || e.style.setProperty("anchor-name", [...n, t].join(", "));
}
function se(e, t) {
	let n = ae(e.style.getPropertyValue("anchor-name")).filter((e) => e !== t);
	n.length > 0 ? e.style.setProperty("anchor-name", n.join(", ")) : e.style.removeProperty("anchor-name");
}
//#endregion
//#region src/directives/common.js
var ce = "currentcolor", le = /* @__PURE__ */ new Set([
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
]);
function ue(e) {
	return (e) => {};
}
function de(e, t, n) {
	return e === void 0 ? {} : typeof e != "object" || !e || Array.isArray(e) ? (n("绑定值必须是对象；已使用默认配置。"), {}) : (Object.keys(e).forEach((e) => {
		t.has(e) || n(`未知选项“${e}”已忽略。`);
	}), e);
}
function fe(e, t) {
	return e === void 0 ? ce : typeof e != "string" || typeof CSS < "u" && !CSS.supports("color", e) ? (t("color 必须是有效的 CSS 颜色；已回退为 currentcolor。"), ce) : e;
}
function pe(e) {
	return e.matches(":disabled") || e.getAttribute("aria-disabled") === "true";
}
function me(e) {
	return !le.has(e.tagName) && getComputedStyle(e).display !== "contents";
}
//#endregion
//#region src/directives/ripple/index.js
var he = 75, ge = 225, _e = 150, ve = "cubic-bezier(0.4, 0, 0.2, 1)", ye = 10, be = .3, xe = "--mat-sys-state-pressed-state-layer-opacity", Se = .12, Ce = "circle", we = "dots", Te = "glow", Ee = "rings", De = "burst", Oe = /* @__PURE__ */ new Set([
	Ce,
	we,
	Te,
	Ee,
	De
]), ke = 12, Ae = "radial-gradient(circle, currentcolor 3px, transparent 3px)", je = `${ke}px ${ke}px`, Me = "radial-gradient(circle, currentcolor 0%, currentcolor 32%, transparent 72%)", Ne = 4, Pe = 2, Fe = 2, Ie = "0.06", Le = .15, Re = 520, ze = 160, Be = 8, Ve = 2, He = .12, Ue = .55, We = 22.5, Ge = 20, Ke = .25, qe = 460, Je = "cubic-bezier(0.2, 0, 0, 1)", Ye = /* @__PURE__ */ new Set([
	"color",
	"variant",
	"disabled"
]), Xe = ue("v-ripple"), Ze = /* @__PURE__ */ new WeakMap(), Qe = 0;
function $e() {
	return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
}
function et(e) {
	e.forEach((e) => {
		try {
			e.cancel();
		} catch {}
	});
}
function tt(e) {
	let t = e.disabled;
	return t === void 0 ? !1 : typeof t == "boolean" ? t : (Xe("disabled 必须是 boolean；已忽略。"), !1);
}
function nt(e) {
	return e === void 0 ? Ce : Oe.has(e) ? e : (Xe(`variant 必须是 '${Ce}'、'${we}'、'${Te}'、'${Ee}' 或 '${De}'；已回退为 '${Ce}'。`), Ce);
}
function rt() {
	return {
		activePointers: null,
		anchorName: void 0,
		container: null,
		observer: null,
		removeEventListeners: () => {},
		variant: Ce,
		waves: null
	};
}
function it(e) {
	return e <= 0 ? ke : e / Math.max(1, Math.round(e / ke));
}
var at = class {
	constructor(e, t) {
		if (this.record = e, this.startedAt = Date.now(), this.alpha = t, this.variant = e.variant, this.dots = this.variant === we, this.glow = this.variant === Te, this.transient = this.variant === Ee || this.variant === De, this.animated = !1, this.opacity = this.glow || this.transient ? Math.min(1, t * Ne) : t, this.enterAnimations = [], this.children = [], this.exitTimer = void 0, this.exiting = !1, this.removed = !1, this.element = document.createElement("span"), this.element.className = "mat-ripple-wave", this.dots && (this.element.style.backgroundColor = "transparent", this.element.style.backgroundImage = Ae, this.element.style.backgroundSize = je, this.element.style.backgroundRepeat = "round", this.element.style.borderRadius = "0"), this.glow && (this.element.style.backgroundColor = "transparent", this.element.style.backgroundImage = Me), this.variant === Ee) {
			this.element.style.backgroundColor = "transparent";
			for (let e = 0; e < Pe; e += 1) {
				let e = document.createElement("span");
				e.style.position = "absolute", e.style.border = `${Fe}px solid currentcolor`, e.style.borderRadius = "50%", e.style.opacity = "0", this.children.push(e), this.element.append(e);
			}
		}
		if (this.variant === De) {
			this.element.style.backgroundColor = "transparent";
			for (let e = 0; e < Be; e += 1) {
				let e = document.createElement("span");
				e.style.position = "absolute", e.style.width = `${Ve}px`, e.style.borderRadius = `${Ve}px`, e.style.background = "currentcolor", e.style.transformOrigin = "50% 100%", e.style.opacity = "0", this.children.push(e), this.element.append(e);
			}
		}
		this.transient && (this.element.style.opacity = "1");
	}
	place(e, t, n) {
		let r = e.getBoundingClientRect(), i = Math.max(r.width, r.height) * be, a = Math.hypot(r.width, r.height) / 2 + ye;
		if (this.animated = !$e() && typeof this.element.animate == "function", this.dots ? (this.element.style.width = "100%", this.element.style.height = "100%", this.element.style.left = "0px", this.element.style.top = "0px", this.element.style.backgroundPosition = `${Math.round(t - it(r.width) / 2)}px ${Math.round(n - it(r.height) / 2)}px`) : this.glow ? (this.element.style.width = `${a * 2}px`, this.element.style.height = `${a * 2}px`, this.element.style.left = `${t - a}px`, this.element.style.top = `${n - a}px`) : this.transient ? (this.element.style.width = "100%", this.element.style.height = "100%", this.element.style.left = "0px", this.element.style.top = "0px", this.placeTransient(t, n, r, a)) : (this.element.style.width = `${a * 2}px`, this.element.style.height = `${a * 2}px`, this.element.style.left = `${t - a}px`, this.element.style.top = `${n - a}px`), !this.animated) {
			if (this.transient) for (let e = 0; e < this.children.length; e += 1) this.children[e].style.opacity = String(this.opacity);
			else this.element.style.opacity = String(this.opacity);
			return;
		}
		if (this.transient) {
			this.playTransient();
			return;
		}
		if (this.enterAnimations.push(this.element.animate([{ opacity: "0" }, { opacity: String(this.opacity) }], {
			duration: he,
			easing: "linear",
			fill: "forwards"
		})), this.dots) {
			this.enterAnimations.push(this.element.animate([{ clipPath: `circle(${i}px at ${t}px ${n}px)` }, { clipPath: `circle(${a}px at ${r.width / 2}px ${r.height / 2}px)` }], {
				duration: ge,
				easing: ve,
				fill: "forwards"
			}));
			return;
		}
		this.enterAnimations.push(this.element.animate([{ scale: `${i / a}` }, { scale: "1" }], {
			duration: ge,
			easing: ve,
			fill: "forwards"
		})), this.glow || this.enterAnimations.push(this.element.animate([{ translate: "0px 0px" }, { translate: `${r.width / 2 - t}px ${r.height / 2 - n}px` }], {
			duration: ge,
			easing: "linear",
			fill: "forwards"
		}));
	}
	placeTransient(e, t, n, r) {
		if (this.variant === Ee) {
			for (let n = 0; n < this.children.length; n += 1) {
				let i = this.children[n];
				i.style.width = `${r * 2}px`, i.style.height = `${r * 2}px`, i.style.left = `${e - r}px`, i.style.top = `${t - r}px`;
			}
			return;
		}
		let i = Math.hypot(n.width, n.height) / 2;
		for (let n = 0; n < this.children.length; n += 1) {
			let r = this.children[n];
			r.style.height = `${i}px`, r.style.left = `${e - Ve / 2}px`, r.style.top = `${t - i}px`, r.style.rotate = `${360 / Be * n + We}deg`;
		}
	}
	playTransient() {
		this.variant === Ee ? this.children.forEach((e, t) => {
			this.enterAnimations.push(e.animate([
				{
					opacity: "0",
					scale: Ie
				},
				{
					opacity: String(this.opacity),
					offset: Le
				},
				{
					opacity: "0",
					scale: "1"
				}
			], {
				duration: Re,
				delay: t * ze,
				easing: Je,
				fill: "both"
			}));
		}) : this.children.forEach((e, t) => {
			this.enterAnimations.push(e.animate([
				{
					opacity: "0",
					scale: `1 ${He}`
				},
				{
					opacity: String(this.opacity),
					offset: Ke,
					scale: `1 ${Ue}`
				},
				{
					opacity: "0",
					scale: "1 1"
				}
			], {
				duration: qe,
				delay: t * Ge,
				easing: Je,
				fill: "both"
			}));
		}), this.exitTimer = globalThis.setTimeout(() => {
			this.exitTimer = void 0, this.remove();
		}, this.transientDuration()), this.enterAnimations[this.enterAnimations.length - 1].finished.then(() => this.remove(), () => this.remove());
	}
	transientDuration() {
		return this.variant === Ee ? 680 : 600;
	}
	finish() {
		if (this.exiting || this.transient && this.animated) return;
		this.exiting = !0;
		let [e] = this.enterAnimations;
		if (e && e.playState !== "finished") try {
			e.finish();
		} catch {}
		let t = Math.max(0, ge - (Date.now() - this.startedAt));
		this.exitTimer = globalThis.setTimeout(() => {
			this.exitTimer = void 0, this.startExit();
		}, t);
	}
	abort() {
		if (this.transient) {
			this.remove();
			return;
		}
		this.finish();
	}
	startExit() {
		typeof this.element.animate == "function" && this.element.animate([{ opacity: String(this.transient ? 1 : this.opacity) }, { opacity: "0" }], {
			duration: _e,
			easing: "linear",
			fill: "forwards"
		}).finished.then(() => this.remove(), () => this.remove()), this.exitTimer = globalThis.setTimeout(() => this.remove(), _e);
	}
	remove() {
		this.removed || (this.removed = !0, this.exitTimer !== void 0 && (globalThis.clearTimeout(this.exitTimer), this.exitTimer = void 0), et(this.enterAnimations), this.element.remove(), this.record.waves.delete(this));
	}
};
function ot(e) {
	let t = Number.parseFloat(getComputedStyle(e).getPropertyValue(xe));
	return !Number.isFinite(t) || t < 0 || t > 1 ? Se : t;
}
function st(e, t) {
	let n = Ze.get(e);
	if (!n || t.button !== 0 || pe(e)) return;
	n.waves.forEach((e) => e.abort());
	let r = e.getBoundingClientRect(), i = Number.isFinite(t.clientX) ? t.clientX - r.left : r.width / 2, a = Number.isFinite(t.clientY) ? t.clientY - r.top : r.height / 2, o = new at(n, ot(e));
	o.place(e, i, a), n.container.append(o.element), n.waves.add(o), n.activePointers.set(t.pointerId, o);
}
function ct(e, t) {
	if (tt(t)) {
		Ze.set(e, rt());
		return;
	}
	if (!me(e)) {
		Xe(`<${e.tagName.toLowerCase()}> 无法容纳涟漪；指令已跳过。`);
		return;
	}
	Qe += 1;
	let n = `--mat-ripple-${Qe}`, r = document.createElement("span");
	r.className = "mat-ripple", r.setAttribute("aria-hidden", "true"), r.style.setProperty("position-anchor", n), r.style.color = fe(t.color, Xe), oe(e, n), e.append(r);
	let i = {
		activePointers: /* @__PURE__ */ new Map(),
		anchorName: n,
		container: r,
		observer: void 0,
		removeEventListeners: () => {},
		variant: nt(t.variant),
		waves: /* @__PURE__ */ new Set()
	}, a = (t) => st(e, t), o = (e) => {
		let t = i.activePointers.get(e.pointerId);
		t && (i.activePointers.delete(e.pointerId), t.finish());
	}, s = () => {
		i.activePointers.forEach((e) => e.abort()), i.activePointers.clear();
	}, c = new MutationObserver(() => {
		pe(e) && s();
	});
	i.observer = c, Ze.set(e, i), e.addEventListener("pointerdown", a), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", o), e.addEventListener("blur", s), e.addEventListener("lostpointercapture", s), c.observe(e, {
		attributeFilter: ["aria-disabled", "disabled"],
		attributes: !0
	}), i.removeEventListeners = () => {
		e.removeEventListener("pointerdown", a), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", o), e.removeEventListener("blur", s), e.removeEventListener("lostpointercapture", s);
	};
}
function lt(e) {
	let t = Ze.get(e);
	t && (t.container && (t.activePointers.clear(), t.waves.forEach((e) => e.remove()), t.removeEventListeners(), t.observer.disconnect(), t.container.remove(), se(e, t.anchorName)), Ze.delete(e));
}
var ut = {
	mounted(e, t) {
		ct(e, de(t.value, Ye, Xe));
	},
	updated(e, t) {
		let n = Ze.get(e);
		if (!n) return;
		let r = de(t.value, Ye, Xe);
		if (n.container) {
			tt(r) ? (lt(e), Ze.set(e, rt())) : (n.container.style.color = fe(r.color, Xe), n.variant = nt(r.variant));
			return;
		}
		tt(r) || ct(e, r);
	},
	unmounted: lt
}, dt = "data-mat-state-layer-host", ft = 150, pt = /* @__PURE__ */ new Set(["color"]), mt = ue("v-state-layer"), ht = /* @__PURE__ */ new WeakMap(), gt = 0;
function _t(e, t) {
	let n = e.getAttribute("role"), r = e.tagName === "BUTTON" || n === "button", i = e.tagName === "A" && e.hasAttribute("href") || n === "link";
	return r ? t === " " || t === "Enter" : i && t === "Enter";
}
function vt(e) {
	let t = ht.get(e);
	t?.releaseTimer !== void 0 && (globalThis.clearTimeout(t.releaseTimer), t.releaseTimer = void 0);
}
function yt(e) {
	let t = ht.get(e);
	t && (vt(e), t.activePointerId = void 0, t.activeKey = void 0, t.removeGlobalPointerListeners(), e.removeAttribute("data-mat-state-layer-pressed"));
}
function bt(e) {
	let t = ht.get(e);
	!t || pe(e) || (vt(e), t.pressStartedAt = Date.now(), e.setAttribute("data-mat-state-layer-pressed", ""));
}
function xt(e) {
	let t = ht.get(e);
	!t || !e.hasAttribute("data-mat-state-layer-pressed") || (t.activePointerId = void 0, t.activeKey = void 0, t.removeGlobalPointerListeners(), vt(e), t.releaseTimer = globalThis.setTimeout(() => {
		e.removeAttribute("data-mat-state-layer-pressed"), t.releaseTimer = void 0;
	}, Math.max(0, ft - (Date.now() - t.pressStartedAt))));
}
function St(e, t) {
	let n = ht.get(e);
	if (!n || t.button !== 0 || n.activePointerId !== void 0 || (bt(e), !e.hasAttribute("data-mat-state-layer-pressed"))) return;
	n.activePointerId = t.pointerId;
	let r = (t) => {
		t.pointerId === n.activePointerId && xt(e);
	};
	window.addEventListener("pointerup", r), window.addEventListener("pointercancel", r), n.removeGlobalPointerListeners = () => {
		window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", r), n.removeGlobalPointerListeners = () => {};
	};
}
function Ct(e, t) {
	let n = ht.get(e);
	!n || t.repeat || n.activeKey !== void 0 || !_t(e, t.key) || (bt(e), e.hasAttribute("data-mat-state-layer-pressed") && (n.activeKey = t.key));
}
function wt(e, t) {
	ht.get(e)?.activeKey === t.key && xt(e);
}
function Tt(e, t) {
	if (!me(e)) {
		mt(`<${e.tagName.toLowerCase()}> 无法容纳状态层；指令已跳过。`);
		return;
	}
	gt += 1;
	let n = `--mat-state-layer-${gt}`, r = document.createElement("span");
	r.className = "mat-state-layer", r.setAttribute("aria-hidden", "true"), r.style.setProperty("position-anchor", n), r.style.backgroundColor = fe(de(t.value, pt, mt).color, mt), oe(e, n), e.setAttribute(dt, ""), e.prepend(r);
	let i = {
		activeKey: void 0,
		activePointerId: void 0,
		anchorName: n,
		layer: r,
		observer: void 0,
		pressStartedAt: 0,
		releaseTimer: void 0,
		removeGlobalPointerListeners: () => {}
	}, a = (t) => St(e, t), o = (t) => Ct(e, t), s = (t) => wt(e, t), c = () => xt(e), l = new MutationObserver(() => {
		pe(e) && yt(e);
	});
	i.observer = l, ht.set(e, i), e.addEventListener("pointerdown", a), e.addEventListener("keydown", o), e.addEventListener("keyup", s), e.addEventListener("blur", c), e.addEventListener("lostpointercapture", c), l.observe(e, {
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
function Et(e) {
	let t = ht.get(e);
	t && (yt(e), t.removeEventListeners(), t.observer.disconnect(), t.layer.remove(), e.removeAttribute(dt), se(e, t.anchorName), ht.delete(e));
}
var Dt = {
	mounted: Tt,
	updated(e, t) {
		let n = ht.get(e);
		n && (n.layer.style.backgroundColor = fe(de(t.value, pt, mt).color, mt));
	},
	unmounted: Et
}, Ot = Object.freeze({
	openDelay: 0,
	closeDelay: 600
}), kt = Object.freeze({
	iconClass: "material-symbols-outlined",
	useCursor: !1,
	useRipple: !1,
	defaults: Object.freeze({ tooltip: Ot })
}), At = Symbol("mde-vue-options");
function jt(e) {
	return e.replace(/^Mat/, "").replace(/^./, (e) => e.toLowerCase());
}
//#endregion
//#region \0plugin-vue:export-helper
var Q = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Mt = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = e, i = n, s = g(At, kt), c = a(() => s.useRipple ? void 0 : { disabled: !0 }), l = a(() => r.href !== void 0), u = a(() => l.value ? "a" : r.as), d = a(() => u.value === "button"), f = M(null);
		function p(e) {
			if (r.disabled) {
				e.preventDefault(), e.stopImmediatePropagation();
				return;
			}
			i("click", e);
		}
		return t({ root: f }), (t, n) => W((O(), o(I(u.value), v({
			ref_key: "root",
			ref: f
		}, t.$attrs, {
			class: ["mat-action-base", {
				"mat-action-base--disabled": e.disabled,
				"mat-action-base--use-cursor": e.useCursor,
				"mat-action-base--focus-ring": e.focusRing
			}],
			"aria-disabled": !d.value && e.disabled ? "true" : t.$attrs["aria-disabled"],
			disabled: d.value ? e.disabled : void 0,
			href: l.value && !e.disabled ? e.href : void 0,
			role: l.value && e.disabled ? "link" : t.$attrs.role,
			tabindex: !d.value && e.disabled ? -1 : t.$attrs.tabindex,
			type: d.value ? e.type : void 0,
			onClick: p
		}), {
			default: U(() => [F(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-disabled",
			"disabled",
			"href",
			"role",
			"tabindex",
			"type"
		])), [[B(Dt), { color: "var(--mat-action-state-color, currentcolor)" }], [B(ut), c.value]]);
	}
}), [["__scopeId", "data-v-afbe7280"]]), Nt = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		loading: {
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
		return (t, r) => (O(), o(Mt, v(t.$attrs, {
			class: ["mat-button-base", {
				"mat-button-base--block": e.block,
				"mat-button-base--use-cursor": e.useCursor,
				"mat-button-base--loading": e.loading
			}],
			"aria-pressed": e.ariaPressed,
			disabled: e.disabled,
			type: e.type,
			onClick: r[0] ||= (e) => n("click", e)
		}), {
			default: U(() => [F(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-pressed",
			"disabled",
			"type"
		]));
	}
}), [["__scopeId", "data-v-884e296c"]]), Pt = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], Ft = ["round", "square"], It = [
	"button",
	"submit",
	"reset"
], Lt = [
	"primary",
	"secondary",
	"tertiary",
	"error"
], Rt = [
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
], zt = {
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
}, Bt = [
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
function Vt(e) {
	return typeof e == "string" && Bt.includes(e);
}
function Ht(e) {
	return e === void 0 || Lt.includes(e) || Rt.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
//#region src/components/icon-props.js
var Ut = Object.freeze({
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
}), Wt = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function Gt(e) {
	return typeof e == "string" && (Object.hasOwn(Ut, e) || Wt.test(e));
}
function Kt(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function qt(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function Jt(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function Yt(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function Xt(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
//#region src/material-color.js
var Zt = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], Qt = {
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
}, $t = {
	"tonal-spot": J,
	neutral: ie,
	vibrant: Y,
	expressive: q
}, en = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], tn = 64, nn = /* @__PURE__ */ new Map();
function rn(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function an({ seedColor: e, isDark: t, schemeVariant: n, contrastLevel: r }) {
	let i = $t[n];
	if (!i) throw TypeError(`不支持主题配色变体：${String(n)}`);
	let a = new i(re.fromInt(X(rn(e))), t, r, "2025", "phone");
	if (a.specVersion !== "2025" || a.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return a;
}
function on(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, Z(e[t])])));
}
function sn(e, t = "tonal-spot", n = 0) {
	let r = rn(e), i = `${r}|${t}|${n}|2025|phone`, a = nn.get(i);
	if (a) return nn.delete(i), nn.set(i, a), a;
	let o = Object.freeze({
		light: on(an({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), en),
		dark: on(an({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), en)
	});
	if (nn.set(i, o), nn.size > tn) {
		let e = nn.keys().next().value;
		nn.delete(e);
	}
	return o;
}
//#endregion
//#region src/theme-context.js
var cn = Symbol("mde-vue-theme"), ln = "tonal-spot", un = 0;
function dn(e) {
	let t = g(cn, null), n = a(() => B(e) !== void 0);
	return {
		colorStyle: a(() => {
			let n = B(e);
			if (!n || !Ht(n) && !Vt(n)) return {};
			if (Lt.includes(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${n})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${n}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${n}-container)`
			};
			if (Rt.includes(n)) {
				let e = zt[n];
				return {
					"--mat-accent-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-color": `var(--mat-sys-color-${e})`,
					"--mat-accent-container-color": `var(--mat-sys-color-${n})`,
					"--mat-on-accent-container-color": `var(--mat-sys-color-${e})`
				};
			}
			if (Vt(n)) return {
				"--mat-accent-color": `var(--mat-sys-color-${n})`,
				"--mat-on-accent-color": `var(--mat-sys-color-${n})`
			};
			let r = sn(n, t?.schemeVariant.value ?? ln, t?.contrastLevel.value ?? un);
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
var fn = Object.freeze({});
function pn(e) {
	return e.replace(/\B([A-Z])/g, "-$1").toLowerCase();
}
function $(e, t) {
	let n = p();
	if (!n) throw Error("useMatProps() 必须在组件 setup 中调用");
	let r = g(At, kt).defaults?.[e] ?? fn, i = [.../* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(r)])], o = {};
	return i.forEach((e) => {
		o[e] = a(() => {
			let i = n.vnode.props ?? fn;
			return [e, pn(e)].some((e) => e in i && i[e] !== void 0) ? t[e] : r[e] ?? t[e];
		});
	}), A(o);
}
//#endregion
//#region src/components/mat-icon/MatIcon.vue
var mn = ["src"], hn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Gt
		},
		fill: {
			type: Number,
			default: 0,
			validator: qt
		},
		weight: {
			type: Number,
			default: 400,
			validator: Jt
		},
		grade: {
			type: Number,
			default: 0,
			validator: Yt
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: Xt
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
		},
		fontColor: {
			type: String,
			default: void 0
		},
		as: {
			type: String,
			default: "i",
			validator: Kt
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let n = $("icon", e), r = g(At, kt), { colorStyle: i, hasExplicitColor: s } = dn(a(() => n.color)), l = a(() => n.iconClass ?? r.iconClass), u = a(() => n.icon !== void 0), f = a(() => Ut[n.size]?.fontSize ?? n.size), p = a(() => n.opticalSize ?? Ut[n.size]?.opticalSize ?? 24), m = a(() => ({
			...i.value,
			"--mat-icon-size": f.value,
			display: "inline-flex",
			fontSize: f.value,
			color: n.fontColor ?? (s.value ? "var(--mat-accent-color)" : "currentColor"),
			fontVariationSettings: `'FILL' ${n.fill}, 'wght' ${n.weight}, 'GRAD' ${n.grade}, 'opsz' ${p.value}`
		}));
		return (e, r) => (O(), o(I(B(n).as), v(e.$attrs, {
			class: ["mat-icon", l.value],
			style: m.value
		}), {
			default: U(() => [B(n).src === void 0 ? u.value ? (O(), c(t, { key: 1 }, [d(z(B(n).icon), 1)], 64)) : F(e.$slots, "default", { key: 2 }, void 0, !0) : (O(), c("img", {
				key: 0,
				class: "mat-icon__image",
				src: B(n).src,
				alt: ""
			}, null, 8, mn))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-b3defc6b"]]), gn = /^-?\d+(\.\d+)?$/, _n = /* @__PURE__ */ new Set([
	"auto",
	"contain",
	"fit-content",
	"inherit",
	"initial",
	"max-content",
	"min-content",
	"revert",
	"revert-layer",
	"stretch",
	"unset"
]), vn = /^[-+]?(?:\d+\.?(?:\d*)?|\.\d+)(?:%|cap|ch|cm|cqb|cqh|cqi|cqw|cqmax|cqmin|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw)$/i, yn = /^(?:anchor-size|calc|calc-size|clamp|env|fit-content|max|min|var)\(.+\)$/i;
function bn(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : NaN;
	if (typeof e == "string") {
		let t = e.trim();
		return t && gn.test(t) ? Number(t) : NaN;
	}
	return NaN;
}
function xn(e, { positive: t = !1, max: n } = {}) {
	let r = bn(e);
	return !Number.isFinite(r) || (t ? r <= 0 : r < 0) ? !1 : n === void 0 || r <= n;
}
function Sn(e, t) {
	if (typeof e != "string") return !1;
	let n = e.trim();
	return !n || /[;{}]/.test(n) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports(t, n);
}
function Cn(e, { property: t, positive: n = !1, max: r, allowUndefined: i = !0, allowNegative: a = !1 } = {}) {
	if (e === void 0) return i;
	if (typeof e == "number" || typeof e == "string" && gn.test(e.trim())) {
		if (a) {
			let t = bn(e);
			return Number.isFinite(t) && (r === void 0 || t <= r);
		}
		return xn(e, {
			positive: n,
			max: r
		});
	}
	return typeof e != "string" || !t ? !1 : Sn(e, t);
}
function wn(e, { allowNegative: t = !1 } = {}) {
	let n = Cn(e, {
		allowNegative: t,
		allowUndefined: !1,
		property: "block-size"
	});
	if (!n || typeof e != "string") return n;
	if (typeof CSS < "u" && typeof CSS.supports == "function") return !0;
	let r = e.trim().toLowerCase();
	return gn.test(r) ? !0 : _n.has(r) || vn.test(r) || yn.test(r);
}
function Tn(e, { property: t, positive: n = !1, max: r, fallback: i, allowNegative: a = !1 } = {}) {
	if (Cn(e, {
		property: t,
		positive: n,
		max: r,
		allowUndefined: !1,
		allowNegative: a
	})) {
		let t = bn(e);
		return Number.isFinite(t) ? t === 0 ? "0" : `${t}px` : e.trim();
	}
	return i;
}
function En(e, { property: t, positive: n = !1, fallback: r } = {}) {
	if (Cn(e, {
		property: t,
		positive: n,
		allowUndefined: !1
	})) {
		let t = bn(e);
		return Number.isFinite(t) ? String(t) : e.trim();
	}
	return r;
}
function Dn(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : typeof e == "number" || typeof e == "string" && gn.test(e.trim()) ? xn(e) : !e || Array.isArray(e) ? !1 : ["start", "end"].every((t) => e[t] === void 0 || xn(e[t]));
}
function On(e, t) {
	let n = bn(e);
	if (Number.isFinite(n)) return {
		start: n,
		end: n
	};
	function r(e) {
		let n = bn(e);
		return Number.isFinite(n) ? n : t;
	}
	return {
		start: r(e?.start ?? t),
		end: r(e?.end ?? t)
	};
}
function kn(e, { allowUndefined: t = !0 } = {}) {
	return e === void 0 ? t : xn(e);
}
function An(e, t = 0) {
	return xn(e) ? bn(e) : t;
}
function jn(e, { positive: t = !1, fallback: n, allowNegative: r = !1 } = {}) {
	let i = bn(e);
	return !Number.isFinite(i) || (t ? i <= 0 : !r && i < 0) ? n : i;
}
//#endregion
//#region src/components/mat-shape/shape-paths.js
var Mn = Object.freeze({
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
Object.freeze(Object.keys(Mn));
function Nn(e) {
	return typeof e == "string" && Object.hasOwn(Mn, e);
}
var Pn = Object.freeze([
	"soft-burst",
	"9-sided-cookie",
	"pentagon",
	"pill",
	"sunny",
	"4-sided-cookie",
	"oval"
]), Fn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatShape",
	inheritAttrs: !1
}, {
	__name: "MatShape",
	props: {
		name: {
			type: String,
			default: "circle",
			validator: Nn
		},
		size: {
			type: [Number, String],
			default: 48,
			validator: (e) => Cn(e, {
				property: "width",
				positive: !0
			})
		},
		color: {
			type: String,
			default: "primary",
			validator: Ht
		},
		as: {
			type: String,
			default: "div",
			validator: Kt
		}
	},
	setup(e) {
		let t = $("shape", e), { colorStyle: n } = dn(a(() => t.color)), r = a(() => Tn(t.size, {
			property: "width",
			positive: !0,
			fallback: "48px"
		})), i = a(() => Nn(t.name) ? t.name : "circle"), s = a(() => ({
			...n.value,
			inlineSize: r.value,
			blockSize: r.value,
			clipPath: Mn[i.value]
		}));
		return (e, n) => (O(), o(I(B(t).as), v(e.$attrs, {
			class: "mat-shape",
			style: s.value
		}), {
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["style"]));
	}
}), [["__scopeId", "data-v-d3e79d42"]]), In = Symbol("mat-loading-compact");
function Ln(e) {
	k(In, e);
}
function Rn() {
	return g(In, null);
}
//#endregion
//#region src/components/mat-loading/MatLoading.vue
var zn = ["aria-valuenow"], Bn = 48, Vn = 24, Hn = 240, Un = 650, Wn = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ht
		},
		progress: {
			type: Number,
			default: void 0,
			validator: (e) => e === void 0 || Number.isFinite(e)
		}
	},
	setup(e) {
		let t = $("loading", e), { colorStyle: n } = dn(a(() => t.color)), r = Rn(), i = M(0), o, s = 0, l, u, d = a(() => {
			let e = r?.value;
			if (typeof e == "number" && Number.isFinite(e) && e > 0) return Math.min(e, Hn);
			let n = jn(t.size, {
				positive: !0,
				fallback: Bn
			});
			return Math.min(Math.max(n, Vn), Hn);
		}), p = a(() => ({ "--mat-loading-size": `${d.value}px` })), m = a(() => Number.isFinite(t.progress)), h = a(() => m.value ? Math.max(t.progress, 0) : 0), g = a(() => Math.min(h.value, 1)), _ = a(() => m.value ? { "--mat-loading-determinate-morph-progress": `${g.value}` } : {}), y = a(() => ({
			...n.value,
			...p.value,
			..._.value
		})), b = a(() => d.value * (38 / 48)), x = a(() => m.value ? g.value >= 1 ? "soft-burst" : "circle" : Pn[i.value]), C = a(() => {
			if (m.value) return { rotate: String(-h.value * 180) + "deg" };
		});
		function T() {
			return u ? u.matches : typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function D() {
			o !== void 0 && (globalThis.cancelAnimationFrame?.(o), o = void 0);
		}
		function k() {
			i.value = 0, s = 0, l = void 0;
		}
		function A(e) {
			if (o = void 0, m.value) return;
			l !== void 0 && (s += e - l), l = e;
			let t = Math.floor(s / Un) % Pn.length;
			t !== i.value && (i.value = t), T() || (o = globalThis.requestAnimationFrame(A));
		}
		function j() {
			D(), k(), !(m.value || typeof globalThis.requestAnimationFrame != "function" || T()) && (o = globalThis.requestAnimationFrame(A));
		}
		return V(() => t.progress, () => {
			if (m.value) {
				D(), k();
				return;
			}
			j();
		}), E(() => {
			typeof globalThis.matchMedia == "function" && (u = globalThis.matchMedia("(prefers-reduced-motion: reduce)"), u.addEventListener?.("change", j)), j();
		}), w(() => {
			D(), u?.removeEventListener?.("change", j);
		}), (e, n) => (O(), c("div", v(e.$attrs, {
			class: ["mat-loading", {
				"mat-loading--contained": B(t).containment,
				"mat-loading--determinate": m.value
			}],
			style: y.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": "1",
			"aria-valuenow": m.value ? g.value : void 0
		}), [f(Fn, {
			class: "mat-loading__active-indicator",
			name: x.value,
			size: b.value,
			color: B(t).color || "primary",
			style: S(C.value),
			"aria-hidden": "true"
		}, null, 8, [
			"name",
			"size",
			"color",
			"style"
		])], 16, zn));
	}
}), [["__scopeId", "data-v-b810f3e1"]]), Gn = /*@__PURE__*/ Object.assign({
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
			validator: (e) => kn(e, { allowUndefined: !1 })
		},
		openDelay: {
			type: [Number, String],
			default: 0,
			validator: (e) => kn(e, { allowUndefined: !1 })
		},
		target: {
			type: [String, Object],
			default: void 0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: t }) {
		let n = $("hover", e), r = t, i = ne(), o = p()?.vnode.props ?? {}, c = Object.prototype.hasOwnProperty.call(o, "modelValue") || Object.prototype.hasOwnProperty.call(o, "model-value"), l = M(!1), u = M(null), d = R(null), f = a(() => c ? n.modelValue : u.value), m, h = null;
		function g() {
			m !== void 0 && (window.clearTimeout(m), m = void 0);
		}
		function _(e) {
			l.value = e, !n.disabled && (r("update:modelValue", e), !c && (u.value = e));
		}
		function v(e, t) {
			g();
			let n = An(t, 0);
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
		function x(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? x(e.value) : "$el" in e ? x(e.$el) : null : null;
		}
		function S() {
			if (typeof n.target != "string") return x(n.target);
			try {
				return x(document.querySelector(n.target));
			} catch {
				return null;
			}
		}
		function C() {
			h &&= (h(), null);
		}
		function T() {
			let e = S();
			e !== d.value && (C(), d.value = e, e && (e.addEventListener("mouseenter", y), e.addEventListener("mouseleave", b), h = () => {
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
		}), V(S, T, { flush: "sync" }), E(T), D(T), w(() => {
			g(), C();
		}), (e, t) => B(i).default ? F(e.$slots, "default", {
			key: 0,
			isHovering: f.value,
			props: O
		}) : s("", !0);
	}
});
//#endregion
//#region src/components/motion-controller.js
function Kn() {
	return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
}
function qn() {
	let e = 0, t;
	function n() {
		e += 1, t !== void 0 && (globalThis.clearTimeout(t), t = void 0);
	}
	function r(n, r, i) {
		t = globalThis.setTimeout(() => {
			t = void 0, e === n && i();
		}, r);
	}
	function i(t, i, a, { fallbackWhenIdle: o = !1 } = {}) {
		n();
		let s = e;
		if (Kn()) {
			a();
			return;
		}
		if (typeof t?.getAnimations == "function") {
			let n = t.getAnimations({ subtree: !0 }).filter((e) => e.playState !== "finished");
			if (n.length === 0) {
				o ? r(s, i, a) : a();
				return;
			}
			Promise.allSettled(n.map((e) => e.finished)).then(() => {
				e === s && a();
			});
			return;
		}
		r(s, i, a);
	}
	return Object.freeze({
		cancel: n,
		wait: i
	});
}
//#endregion
//#region src/components/close-motion.js
function Jn({ motion: e = qn() } = {}) {
	async function t({ canStart: t = !0, duration: n, getElement: r, isActive: i, onFinish: a, onStart: o }) {
		(typeof t == "function" ? t() : t) && (e.cancel(), o(), await y(), i() && e.wait(r(), n, () => {
			i() && a();
		}, { fallbackWhenIdle: !0 }));
	}
	return Object.freeze({
		cancel: e.cancel,
		start: t
	});
}
//#endregion
//#region src/components/mat-app-root/mat-app-root-context.js
var Yn = Symbol("mat-app-root"), Xn = /* @__PURE__ */ new WeakMap();
function Zn(e, t) {
	Xn.set(e, t);
}
function Qn(e) {
	Xn.delete(e);
}
function $n(e) {
	return Xn.get(e) ?? null;
}
function er() {
	let e = g(Yn, null);
	if (!e) throw Error("useMatApp() 必须在 MatAppRoot 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/tooltip-position.js
var tr = [
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
], nr = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function rr(e) {
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
function ir(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function ar(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function or(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function sr(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function cr(e, t, n, r, i) {
	return e === "top" || e === "bottom" ? {
		left: ir(t, n, r),
		top: e === "top" ? n.top - r.height - i : n.bottom + i
	} : {
		left: e === "left" ? n.left - r.width - i : n.right + i,
		top: ar(t, n, r)
	};
}
function lr(e) {
	return [
		e,
		nr[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((t) => t !== e && t !== nr[e])
	];
}
function ur(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function dr(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function fr(e, t, n, r, i, a, o, s) {
	let c = cr(e, t, n, r, o), l = Math.max(a, i.width - r.width - a), u = Math.max(a, i.height - r.height - a), d = {
		left: or(c.left, a, l),
		top: or(c.top, a, u)
	}, f = ur(d, r);
	return dr(f, n) || s.some((e) => dr(f, rr(e))) ? null : d;
}
function pr({ avoidRects: e = [], gap: t = 4, location: n = "top", margin: r = 8, targetRect: i, tooltipRect: a, viewport: o = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let s = rr(i), c = rr(a), [l, u = "center"] = (tr.includes(n) ? n : "top").split("-"), d = u === "start" || u === "end" ? u : "center", f = l === "top" || l === "bottom" ? c.height : c.width, p = sr(l, s, o, r, t), m = nr[l], h = sr(m, s, o, r, t), g = f > p && h > p ? m : l, _ = Math.max(r, o.width - c.width - r), v = Math.max(r, o.height - c.height - r), y = lr(g), b = e.map((e) => rr(e)), x = y.find((e) => sr(e, s, o, r, t) >= f && fr(e, d, s, c, o, r, t, b)) ?? y.find((e) => fr(e, d, s, c, o, r, t, b)) ?? g, S = d === "center" ? x : `${x}-${d}`, C = cr(x, d, s, c, t);
	return {
		left: Math.round(or(C.left, r, _)),
		location: S,
		top: Math.round(or(C.top, r, v))
	};
}
//#endregion
//#region src/components/tooltip-stack.js
var mr = null, hr = "pointer";
typeof window < "u" && (window.addEventListener("keydown", () => {
	hr = "keyboard";
}, !0), window.addEventListener("pointerdown", () => {
	hr = "pointer";
}, !0));
function gr() {
	return hr === "keyboard";
}
function _r(e) {
	mr && mr !== e && mr.close(), mr = e;
}
function vr(e) {
	mr === e && (mr = null);
}
function yr() {
	return mr !== null;
}
//#endregion
//#region src/components/toolbar-overlay.js
var br = /* @__PURE__ */ new Map(), xr = /* @__PURE__ */ new Set(), Sr = 0;
function Cr(e) {
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
function wr() {
	xr.forEach((e) => e());
}
function Tr() {
	br.forEach((e, t) => {
		e.element.isConnected || br.delete(t);
	});
}
function Er(e, t = {}) {
	if (!(e instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let n = Sr;
	Sr += 1;
	let r = {
		element: e,
		getRect: t.getRect ?? (() => e.getBoundingClientRect()),
		isBottom: t.isBottom ?? (() => !1)
	}, i = !0;
	return br.set(n, r), wr(), {
		unregister() {
			i && (i = !1, br.delete(n), wr());
		},
		update() {
			i && wr();
		}
	};
}
function Dr() {
	return Tr(), [...br.values()].flatMap((e) => {
		try {
			return [Cr(e.getRect())];
		} catch {
			return [];
		}
	});
}
function Or(e = window.innerHeight) {
	Tr();
	let t = Number.isFinite(Number(e)) ? Number(e) : 0;
	return Math.max(0, ...[...br.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, t - Cr(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function kr(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return xr.add(e), e(), () => {
		xr.delete(e);
	};
}
//#endregion
//#region src/components/mat-tooltip/MatTooltip.vue
var Ar = ["id", "data-location"], jr = {
	key: 0,
	class: "mat-tooltip__subhead mat-sys-typescale-title-small"
}, Mr = { class: "mat-tooltip__content mat-sys-typescale-body-medium" }, Nr = {
	key: 1,
	class: "mat-tooltip__actions"
}, Pr = 600, Fr = 150, Ir = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return tr.includes(e);
			}
		},
		openDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => kn(e)
		},
		closeDelay: {
			type: [Number, String],
			default: void 0,
			validator: (e) => kn(e)
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: r }) {
		let i = e, u = r, f = $("tooltip", i), m = ee(), h = ne(), _ = p(), b = g(Yn, null), x = M(null), S = R(null), k = { value: S }, A = R(null), j = M(!1), N = M(null), P = M(!1), I = M(!1), L = M(!1), H = M("closed"), U = M("top"), W = M({}), G = M(!1), K = `${te().replace(/[^\w-]/g, "-")}-tooltip`, re = a(() => typeof m.id == "string" ? m.id : K), q = a(() => f.content === void 0 ? !!h.default : f.content.length > 0), ie = a(() => f.subhead === void 0 ? !!h.subhead : f.subhead.length > 0), J = a(() => f.rich || ie.value || !!h.action), Y = a(() => !!h.activator), X = _?.vnode.props ?? {}, Z = Object.prototype.hasOwnProperty.call(X, "modelValue") || Object.prototype.hasOwnProperty.call(X, "model-value"), ae, oe, se = qn(), ce = Jn({ motion: se }), le, ue = !1, de, fe, pe = null, me = null, he = null, ge = null, _e = null, ve = !1, ye = !0, be = !1, xe = !1, Se = !1, Ce = { close: Xe };
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
			return typeof f.target == "string" ? Te(f.target) : we(f.target);
		}
		function De() {
			let e = x.value ? [...x.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function Oe() {
			return Y.value ? De() : Ee();
		}
		function ke() {
			return Ae() ? typeof f.attach == "string" ? Te(f.attach) : we(f.attach) : Ne() || (b?.rootElement.value?.contains(S.value) && b.freeLayer.value ? b.freeLayer.value : document.body);
		}
		function Ae() {
			let e = _?.vnode.props ?? {};
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
			let e = S.value;
			for (; e;) {
				if (Me(e)) return e;
				e = e.parentElement;
			}
			return null;
		}
		function Pe() {
			let e = f.openDelay;
			return An(e, 0);
		}
		function Fe() {
			let e = f.closeDelay;
			return An(e, Pr);
		}
		function Ie() {
			oe !== void 0 && (window.clearTimeout(oe), oe = void 0);
		}
		function Le() {
			ae !== void 0 && (window.clearTimeout(ae), ae = void 0);
		}
		function Re() {
			se.cancel();
		}
		function ze() {
			de !== void 0 && (window.cancelAnimationFrame(de), de = void 0);
		}
		function Be() {
			ze(), I.value && (de = window.requestAnimationFrame(() => {
				if (de = void 0, I.value) {
					if (S.value && !S.value.isConnected) {
						Ye({ immediate: !0 });
						return;
					}
					Be();
				}
			}));
		}
		function Ve() {
			le !== void 0 && (ue ? window.cancelAnimationFrame(le) : window.clearTimeout(le), le = void 0, ue = !1);
		}
		function He() {
			ge && (_e === null ? ge.removeAttribute("aria-describedby") : ge.setAttribute("aria-describedby", _e), ge = null, _e = null);
		}
		function Ue() {
			let e = S.value;
			if (!I.value || !e || ge === e) return;
			He(), ge = e, _e = e.getAttribute("aria-describedby");
			let t = (_e ?? "").split(/\s+/).filter(Boolean);
			t.includes(re.value) || t.push(re.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function We() {
			Ve(), fe?.disconnect(), fe = void 0, me &&= (me(), null), he &&= (he(), null);
		}
		function Ge() {
			if (!I.value || !S.value || !N.value) return;
			let e = j.value ? b.getLayoutRect() : null, t = S.value.getBoundingClientRect(), n = e ? {
				bottom: t.bottom - e.top,
				height: t.height,
				left: t.left - e.left,
				right: t.right - e.left,
				top: t.top - e.top,
				width: t.width
			} : t, r = b?.publicContext.layout, i = e ? [
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
			] : Dr(), a = pr({
				location: f.location,
				targetRect: n,
				tooltipRect: N.value.getBoundingClientRect(),
				avoidRects: i,
				viewport: e ? {
					height: r.size.height,
					width: r.size.width
				} : {
					height: window.innerHeight,
					width: window.innerWidth
				}
			});
			U.value = a.location;
			let o = 0, s = 0;
			if (!j.value && A.value && A.value !== document.body) {
				let e = A.value.getBoundingClientRect();
				o = e.left, s = e.top;
			}
			W.value = {
				left: `${a.left - o}px`,
				top: `${a.top - s}px`
			}, L.value = !0;
		}
		function Ke() {
			if (!I.value || le !== void 0) return;
			let e = () => {
				le = void 0, ue = !1, Ge();
			};
			if (typeof window.requestAnimationFrame == "function") {
				ue = !0, le = window.requestAnimationFrame(e);
				return;
			}
			le = window.setTimeout(e, 0);
		}
		function qe() {
			me || (window.addEventListener("resize", Ke), document.addEventListener("scroll", Ke, !0), me = () => {
				window.removeEventListener("resize", Ke), document.removeEventListener("scroll", Ke, !0);
			}, he = kr(Ke), typeof ResizeObserver < "u" && (fe = new ResizeObserver(Ke), fe.observe(S.value), fe.observe(N.value)));
		}
		function Je() {
			P.value = !1, H.value = "closed", I.value = !1, L.value = !1, A.value = null, j.value = !1;
		}
		function Ye({ immediate: e = !1 } = {}) {
			if (Ie(), Le(), ze(), We(), He(), vr(Ce), !P.value) {
				Je();
				return;
			}
			if (!(!e && H.value === "closing")) {
				if (e) {
					Re(), Je();
					return;
				}
				ce.start({
					canStart: () => P.value && H.value !== "closing",
					duration: Fr,
					getElement: () => N.value,
					isActive: () => ve && P.value && H.value === "closing" && !!N.value,
					onFinish: Je,
					onStart: () => {
						I.value = !1, H.value = "closing";
					}
				});
			}
		}
		function Xe() {
			Z && (G.value = !0, u("update:modelValue", !1)), Ye();
		}
		function Ze() {
			Se || (Se = !0, console.warn(Y.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function Qe({ warn: e = !0 } = {}) {
			let t = Oe();
			if (!t && I.value && Ye({ immediate: !0 }), t === S.value) {
				!t && q.value && e && Ze();
				return;
			}
			let n = S.value !== null;
			He(), lt(), S.value = t, Se = !1, !t && q.value && e && Ze(), ut(), n && I.value && Xe();
		}
		function $e() {
			if (Le(), Z || I.value || G.value || !q.value) return;
			let e = yr() ? 0 : Pe();
			if (e === 0) {
				dt();
				return;
			}
			oe === void 0 && (oe = window.setTimeout(() => {
				oe = void 0, dt();
			}, e));
		}
		function et() {
			Ie(), !(Z || !I.value || be || xe) && ae === void 0 && (ae = window.setTimeout(() => {
				ae = void 0, Xe();
			}, Fe()));
		}
		function tt() {
			if (be || xe) {
				$e();
				return;
			}
			et();
		}
		function nt(e) {
			be = e, tt();
		}
		function rt() {
			gr() && (xe = !0, tt());
		}
		function it(e) {
			S.value?.contains(e.relatedTarget) || J.value && N.value?.contains(e.relatedTarget) || (xe = !1, tt());
		}
		function at() {
			J.value && (be = !0, tt());
		}
		function ot() {
			J.value && (be = !1, tt());
		}
		function st() {
			J.value && (xe = !0, tt());
		}
		function ct(e) {
			e.key === "Escape" && (e.preventDefault(), Xe());
		}
		function lt() {
			pe && (pe(), pe = null, be = !1, xe = !1);
		}
		function ut() {
			let e = S.value;
			e && (e.addEventListener("keydown", ct), !Z && q.value && (e.addEventListener("focusin", rt), e.addEventListener("focusout", it)), pe = () => {
				e.removeEventListener("keydown", ct), e.removeEventListener("focusin", rt), e.removeEventListener("focusout", it);
			});
		}
		async function dt() {
			if (!ve || !ye || G.value || !q.value) return;
			if (Qe({ warn: !0 }), !S.value) {
				Xe();
				return;
			}
			let e = ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Xe();
				return;
			}
			Ie(), Le(), Re(), _r(Ce), A.value = e, j.value = e === b?.freeLayer.value, U.value = f.location, W.value = {
				left: "0px",
				top: "0px"
			}, L.value = !1, H.value = "opening", P.value = !0, I.value = !0, await y(), !(!ve || !ye || !I.value) && (Ue(), Ge(), qe(), Be());
		}
		return E(async () => {
			ve = !0, Qe({ warn: !1 }), await y(), ve && (Qe({ warn: !1 }), Z && f.modelValue && dt());
		}), D(() => {
			Qe({ warn: !1 }), I.value && Ke();
		}), C(() => {
			ye || (ye = !0, Qe({ warn: !1 }), Z && f.modelValue && dt());
		}), T(() => {
			ye = !1, Re(), ze(), lt(), Ye({ immediate: !0 });
		}), w(() => {
			ve = !1, Re(), ze(), lt(), I.value && Ye({ immediate: !0 });
		}), V(() => f.modelValue, (e) => {
			if (!(!ve || !ye || !Z)) {
				if (e) {
					G.value = !1, dt();
					return;
				}
				G.value = !1, Ye();
			}
		}), V([() => f.content, () => f.target], async () => {
			await y();
			let e = S.value;
			Qe({ warn: !1 }), S.value === e && (lt(), ut()), q.value || Xe();
		}), V(() => f.attach, async () => {
			if (!I.value) return;
			let e = ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Xe();
				return;
			}
			A.value = e, j.value = e === b?.freeLayer.value, await y(), Ke();
		}), V(() => f.location, () => {
			I.value && Ke();
		}), V(re, () => {
			!I.value || !ge || (He(), Ue());
		}), b && V(b.publicContext.layout, Ke), (r, i) => (O(), c(t, null, [
			!B(Z) && q.value ? (O(), o(Gn, {
				key: 0,
				target: k,
				"onUpdate:modelValue": nt
			})) : s("", !0),
			Y.value || !e.target ? (O(), c("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: x,
				class: "mat-tooltip__activator"
			}, [F(r.$slots, "activator", {}, void 0, !0)], 512)) : s("", !0),
			P.value && A.value ? (O(), o(n, {
				key: 2,
				to: A.value
			}, [l("span", v(r.$attrs, {
				id: re.value,
				ref_key: "tooltipElement",
				ref: N,
				class: ["mat-tooltip mat-sys-typescale-label-large", [`mat-tooltip--${H.value}`, {
					"mat-tooltip--app-root": j.value,
					"mat-tooltip--positioned": L.value,
					"mat-tooltip--rich": J.value
				}]],
				"data-location": U.value,
				style: [W.value, r.$attrs.style],
				role: "tooltip",
				onFocusin: st,
				onFocusout: it,
				onMouseenter: at,
				onMouseleave: ot
			}), [J.value ? (O(), c(t, { key: 0 }, [
				ie.value ? (O(), c("span", jr, [B(f).subhead === void 0 ? F(r.$slots, "subhead", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(f).subhead), 1)], 64))])) : s("", !0),
				l("span", Mr, [B(f).content === void 0 ? F(r.$slots, "default", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(f).content), 1)], 64))]),
				r.$slots.action ? (O(), c("span", Nr, [F(r.$slots, "action", {}, void 0, !0)])) : s("", !0)
			], 64)) : B(f).content === void 0 ? F(r.$slots, "default", { key: 2 }, void 0, !0) : (O(), c(t, { key: 1 }, [d(z(B(f).content), 1)], 64))], 16, Ar)], 8, ["to"])) : s("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-cc34425b"]]), Lr = Symbol("mde-vue-button-group"), Rr = Symbol("mde-vue-split-button");
//#endregion
//#region src/components/use-button.js
function zr(e, t) {
	let n = g(At, kt), r = g(Lr, null), i = g(Rr, null), o = a(() => i?.size.value ?? e.size ?? r?.size.value ?? "small"), s = a(() => i ? "round" : e.shape ?? r?.shape.value ?? "round"), c = a(() => i?.variant.value ?? e.variant), l = a(() => i?.color.value ?? e.color ?? r?.color.value), u = a(() => e.disabled || !!i?.disabled.value || !!r?.disabled.value), d = a(() => !!(r && r.selection.value !== "none")), f = a(() => i?.role === "trailing" ? i.expanded.value : d.value ? r.isSelected(e.value) : e.selected), p = a(() => i?.role === "trailing" || d.value || e.toggle), { colorStyle: m, hasExplicitColor: h } = dn(l);
	function _(n) {
		d.value && r.requestSelection(e.value, n), t("click", n);
	}
	return {
		colorStyle: m,
		effectiveColor: l,
		effectiveDisabled: u,
		effectiveSelected: f,
		effectiveShape: s,
		effectiveSize: o,
		effectiveToggle: p,
		effectiveVariant: c,
		group: r,
		handleClick: _,
		hasExplicitColor: h,
		split: i,
		useCursor: n.useCursor
	};
}
//#endregion
//#region src/components/typography.js
var Br = Object.freeze([
	"display",
	"headline",
	"title",
	"body",
	"label"
]), Vr = Object.freeze([
	"large",
	"medium",
	"small"
]), Hr = Object.freeze({
	L: "large",
	M: "medium",
	S: "small"
});
function Ur(e) {
	return Br.includes(e);
}
function Wr(e) {
	return Vr.includes(e) || Object.hasOwn(Hr, e);
}
function Gr(e) {
	return Hr[e] ?? e;
}
function Kr(e, t, n = !1) {
	return [
		"mat-sys-typescale",
		n ? "emphasized" : void 0,
		e,
		Gr(t)
	].filter(Boolean).join("-");
}
//#endregion
//#region src/components/mat-btn/MatBtn.vue
var qr = {
	key: 2,
	class: "mat-btn__label"
}, Jr = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Pt.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return Ft.includes(e);
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
				return Ht(e) || Vt(e);
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
		loading: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return It.includes(e);
			}
		},
		morph: {
			type: Boolean,
			default: !0
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let r = $("btn", e), i = n, l = ee(), u = ne(), p = M(null), m = te(), { colorStyle: h, effectiveColor: g, effectiveDisabled: y, effectiveSelected: b, effectiveShape: x, effectiveSize: S, effectiveToggle: C, effectiveVariant: w, handleClick: T, hasExplicitColor: D, split: k, useCursor: A } = zr(r, i), j = a(() => Vt(g.value)), N = a(() => !j.value || w.value === "text"), P = a(() => N.value ? h.value : {}), I = a(() => N.value && D.value), L = a(() => C.value && w.value !== "text"), R = a(() => L.value && b.value), W = a(() => r.icon === !0 || typeof r.icon == "string" && r.icon.trim().length > 0), G = a(() => r.fill === void 0 ? +!!R.value : r.fill), K = a(() => r.loading), re = a(() => y.value || K.value), q = M(null);
		V(K, (e) => {
			if (!e) {
				q.value = null;
				return;
			}
			let t = p.value?.$el ?? p.value, n = t instanceof HTMLElement ? t.offsetWidth : 0;
			q.value = n > 0 ? `${n}px` : null;
		});
		function ie(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : _(e) ? e.type === t && Array.isArray(e.children) ? ie(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? ie(e.children) : [] : []).join("").trim();
		}
		let J = a(() => r.icon === !0 ? ie(u.default?.() ?? []) : ""), Y = a(() => typeof r.icon == "string" ? r.icon.trim() : J.value), X = a(() => l["aria-label"] ?? r.label), Z = a(() => W.value ? l.title ?? r.label : void 0), ae = a(() => !W.value && (r.prefix !== void 0 || !!u.prefix)), oe = a(() => !W.value && (r.suffix !== void 0 || !!u.suffix)), se = a(() => R.value && !!u.selected), ce = a(() => ({
			"extra-small": 20,
			small: W.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[S.value]);
		Ln(a(() => K.value ? ce.value : null));
		let le = a(() => {
			let [e, t] = {
				"extra-small": ["label", "large"],
				small: ["label", "large"],
				medium: ["title", "medium"],
				large: ["headline", "small"],
				"extra-large": ["headline", "large"]
			}[S.value];
			return Kr(e, t, !0);
		});
		return E(() => {
			r.icon === !0 && !J.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), H(() => {
			r.toggle && r.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), j.value && w.value !== "text" && console.warn("MatBtn: on-* 内容色只支持 text 形态，当前按默认配色处理"), W.value && (!X.value || X.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (e, n) => (O(), o(Nt, v({
			ref_key: "buttonElement",
			ref: p
		}, B(l), {
			class: ["mat-btn", [
				`mat-btn--${B(w)}`,
				`mat-btn--size-${B(S)}`,
				`mat-btn--shape-${B(x)}`,
				le.value,
				{
					"mat-button--explicit-color": I.value,
					"mat-btn--icon": W.value,
					[`mat-btn--width-${B(r).width}`]: W.value,
					"mat-btn--toggle": L.value,
					"mat-btn--selected": R.value,
					"mat-btn--split-leading": B(k)?.role === "leading",
					"mat-btn--no-morph": !B(r).morph,
					"mat-btn--loading": K.value
				}
			]],
			style: [P.value, q.value ? { "min-inline-size": q.value } : null],
			"aria-label": W.value ? X.value : B(l)["aria-label"],
			"aria-busy": K.value ? "true" : void 0,
			"aria-controls": B(k)?.role === "trailing" ? B(k).controls.value : void 0,
			"aria-expanded": B(k)?.role === "trailing" ? B(k).expanded.value : void 0,
			"aria-haspopup": B(k)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": L.value ? R.value : void 0,
			block: B(r).block,
			disabled: re.value,
			loading: K.value,
			title: W.value ? void 0 : B(l).title,
			type: B(r).type,
			"use-cursor": B(A),
			onClick: B(T)
		}), {
			default: U(() => [
				W.value ? (O(), c(t, { key: 0 }, [K.value ? F(e.$slots, "loading", { key: 0 }, () => [f(Wn, {
					class: "mat-btn__loading",
					"aria-hidden": "true"
				})], !0) : (O(), o(hn, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: G.value,
					"optical-size": ce.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [d(z(Y.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"]))], 64)) : s("", !0),
				W.value ? s("", !0) : (O(), c(t, { key: 1 }, [K.value ? F(e.$slots, "loading", { key: 0 }, () => [f(Wn, {
					class: "mat-btn__loading",
					"aria-hidden": "true"
				})], !0) : ae.value ? (O(), o(hn, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: G.value,
					"optical-size": ce.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [B(r).prefix === void 0 ? F(e.$slots, "prefix", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(r).prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : s("", !0)], 64)),
				W.value ? s("", !0) : (O(), c("span", qr, [se.value ? F(e.$slots, "selected", { key: 0 }, void 0, !0) : F(e.$slots, "default", { key: 1 }, void 0, !0)])),
				oe.value ? (O(), o(hn, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: G.value,
					"optical-size": ce.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [B(r).suffix === void 0 ? F(e.$slots, "suffix", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(r).suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : s("", !0),
				W.value && Z.value ? (O(), o(Ir, {
					key: 4,
					content: Z.value,
					id: `${B(m)}-tooltip`,
					target: p.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : s("", !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-label",
			"aria-busy",
			"aria-controls",
			"aria-expanded",
			"aria-haspopup",
			"aria-pressed",
			"block",
			"disabled",
			"loading",
			"title",
			"type",
			"use-cursor",
			"onClick"
		]));
	}
}), [["__scopeId", "data-v-3251a7ec"]]), Yr = Object.freeze([
	"top",
	"bottom",
	"left",
	"right",
	"start",
	"end"
]);
function Xr(e, t) {
	let n = Number(e[t]);
	if (n) return Math.max(0, n);
	let r = t === "height" ? e.top : e.left, i = t === "height" ? e.bottom : e.right;
	return Math.max(0, (Number(i) || 0) - (Number(r) || 0));
}
function Zr(e = {}) {
	return {
		top: Math.max(0, Number(e.top) || 0),
		bottom: Math.max(0, Number(e.bottom) || 0),
		left: Math.max(0, Number(e.left) || 0),
		right: Math.max(0, Number(e.right) || 0),
		start: Math.max(0, Number(e.start) || 0),
		end: Math.max(0, Number(e.end) || 0)
	};
}
function Qr(e, t) {
	return Math.floor(e / t) % 2 == 1;
}
function $r(e, t, n) {
	if (t.element === n.element) return 0;
	if (t.element.isConnected && n.element.isConnected) {
		let e = t.element.compareDocumentPosition(n.element);
		if (Qr(e, Node.DOCUMENT_POSITION_FOLLOWING)) return -1;
		if (Qr(e, Node.DOCUMENT_POSITION_PRECEDING)) return 1;
	}
	return e.indexOf(t) - e.indexOf(n);
}
function ei({ scheduleMeasure: e } = {}) {
	let t = [], n;
	function r(e) {
		n = e, t.forEach((e) => {
			e.active && n?.observe?.(e.element);
		});
	}
	function i({ baseInsets: e, width: n = 0, height: r = 0 } = {}) {
		let i = Zr(e), a = Object.fromEntries(Yr.map((e) => [e, {
			startInset: 0,
			endInset: 0
		}]));
		t.filter((e) => e.active).sort((e, n) => $r(t, e, n)).forEach((e) => {
			let t = e.element.getBoundingClientRect(), { edge: n } = e, r = e.insets;
			if (n === "top") {
				let e = Xr(t, "height");
				r.top = i.top, r.bottom = 0, r.left = i.left, r.right = i.right, r.start = i.start, r.end = i.end, r.offset = i.top, a.top.startInset = Math.max(a.top.startInset, i.start), a.top.endInset = Math.max(a.top.endInset, i.end), i.top += e;
			} else if (n === "bottom") {
				let e = Xr(t, "height");
				r.top = 0, r.bottom = i.bottom, r.left = i.left, r.right = i.right, r.start = i.start, r.end = i.end, r.offset = i.bottom, a.bottom.startInset = Math.max(a.bottom.startInset, i.start), a.bottom.endInset = Math.max(a.bottom.endInset, i.end), i.bottom += e;
			} else if (n === "left" || n === "start") {
				let e = Xr(t, "width");
				r.top = i.top, r.bottom = i.bottom, r.left = i.left, r.right = 0, r.start = i.start, r.end = 0, r.offset = i.left, a[n].startInset = Math.max(a[n].startInset, i.top), a[n].endInset = Math.max(a[n].endInset, i.bottom), i.left += e, i.start += e;
			} else if (n === "right" || n === "end") {
				let e = Xr(t, "width");
				r.top = i.top, r.bottom = i.bottom, r.left = 0, r.right = i.right, r.start = 0, r.end = i.end, r.offset = i.right, a[n].startInset = Math.max(a[n].startInset, i.top), a[n].endInset = Math.max(a[n].endInset, i.bottom), i.right += e, i.end += e;
			}
		});
		let o = Object.fromEntries(Yr.map((e) => [e, {
			size: i[e],
			...a[e]
		}]));
		return {
			size: {
				width: Math.max(0, Number(n) || 0),
				height: Math.max(0, Number(r) || 0)
			},
			padding: i,
			edges: o
		};
	}
	function a({ edge: r, element: i } = {}) {
		if (!Yr.includes(r)) throw TypeError("registerEdge() 的 edge 必须是 top、bottom、left、right、start 或 end");
		if (!(i instanceof HTMLElement) || i.ownerDocument !== document) throw TypeError("registerEdge() 的 element 必须是当前 document 中的 HTMLElement");
		let a = A({
			bottom: 0,
			end: 0,
			left: 0,
			offset: 0,
			right: 0,
			start: 0,
			top: 0
		}), o = {
			active: !0,
			edge: r,
			element: i,
			insets: a
		};
		return t.push(o), n?.observe?.(i), e?.(), Object.freeze({
			insets: j(a),
			unregister: () => {
				o.active && (o.active = !1, n?.unobserve?.(i), e?.());
			},
			update: () => {
				o.active && e?.();
			}
		});
	}
	return {
		measure: i,
		registerEdge: a,
		setResizeObserver: r
	};
}
//#endregion
//#region src/components/layout/edge-layout-context.js
var ti = Symbol("mat-edge-layout"), ni = { class: "mat-app-root__overlay" }, ri = { class: "mat-app-root__bottom-stack" }, ii = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatAppRoot",
	inheritAttrs: !1
}, {
	__name: "MatAppRoot",
	props: {
		as: {
			type: String,
			default: "div"
		},
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
		], n = $("appRoot", e);
		if (g(Yn, null)) throw Error("MatAppRoot 不允许嵌套");
		let r = ee(), i = M(null), s = M(null), c = M(null), u = M(null), d = M(null), f = M(null), p = M(null), m = M(null), h = A({
			size: {
				width: 0,
				height: 0
			},
			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
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
				left: {
					size: 0,
					startInset: 0,
					endInset: 0
				},
				right: {
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
		}), _ = j(h), b = A({
			top: 0,
			bottom: 0,
			start: 0,
			end: 0
		}), x = a(() => ({
			"mat-app-root--document": n.fillViewport && !n.scrollable,
			"mat-app-root--fill-viewport": n.fillViewport,
			"mat-app-root--scrollable": n.scrollable
		})), S = a(() => [r.style, {
			"--mat-app-root-padding-top": `${h.padding.top}px`,
			"--mat-app-root-padding-bottom": `${h.padding.bottom}px`,
			"--mat-app-root-padding-left": `${h.padding.left}px`,
			"--mat-app-root-padding-right": `${h.padding.right}px`,
			"--mat-app-root-padding-start": `${h.padding.start}px`,
			"--mat-app-root-padding-end": `${h.padding.end}px`,
			"--mat-app-root-safe-area-top": `${b.top}px`,
			"--mat-app-root-safe-area-bottom": `${b.bottom}px`,
			"--mat-app-root-safe-area-start": `${b.start}px`,
			"--mat-app-root-safe-area-end": `${b.end}px`
		}]), C = !1, T, D, N = !1;
		function P(e) {
			let t = Number.parseFloat(e);
			return Number.isFinite(t) ? Math.max(0, t) : 0;
		}
		function L() {
			if (!m.value) return {
				top: 0,
				bottom: 0,
				start: 0,
				end: 0
			};
			let e = window.getComputedStyle(m.value), t = window.getComputedStyle(i.value).direction, n = P(e.paddingLeft), r = P(e.paddingRight);
			return {
				top: P(e.paddingTop),
				bottom: P(e.paddingBottom),
				start: t === "rtl" ? r : n,
				end: t === "rtl" ? n : r
			};
		}
		function R() {
			if (!C || !i.value) return;
			let e = i.value.getBoundingClientRect(), r = Math.max(0, Number(e.width) || 0), a = Math.max(0, Number(e.height) || 0), o = n.fillViewport && !n.scrollable ? Math.max(0, Number(window.innerHeight) || a) : a, s = t.find((e) => r <= e.max) ?? t.at(-1), c = L(), l = te.measure({
				width: r,
				height: o,
				baseInsets: {
					top: c.top,
					bottom: c.bottom,
					left: c.start,
					right: c.end,
					start: c.start,
					end: c.end
				}
			});
			Object.assign(b, c), Object.assign(h.size, l.size), Object.assign(h.padding, l.padding), Object.assign(h.content, {
				width: Math.max(0, r - l.padding.start - l.padding.end),
				height: Math.max(0, o - l.padding.top - l.padding.bottom)
			}), h.breakpoint = s.name, Object.assign(h.breakpointRange, {
				min: s.min,
				max: s.max
			}), Yr.forEach((e) => {
				Object.assign(h.edges[e], l.edges[e]);
			});
		}
		function z() {
			if (!C || N) return;
			N = !0;
			let e = () => {
				N = !1, D = void 0, R();
			};
			if (typeof window.requestAnimationFrame == "function") {
				D = window.requestAnimationFrame(e);
				return;
			}
			D = window.setTimeout(e, 0);
		}
		let te = ei({ scheduleMeasure: z }), ne = te.registerEdge, H = Object.freeze({
			layout: _,
			registerEdge: ne
		});
		function W() {
			let e = i.value?.getBoundingClientRect() ?? {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			};
			return n.fillViewport && !n.scrollable ? {
				top: 0,
				bottom: h.size.height,
				left: e.left,
				right: e.left + h.size.width,
				width: h.size.width,
				height: h.size.height
			} : {
				top: e.top,
				bottom: e.bottom,
				left: e.left,
				right: e.right,
				width: h.size.width,
				height: h.size.height
			};
		}
		let G = {
			publicContext: H,
			rootElement: j(i),
			contentElement: j(s),
			edgeLayer: j(c),
			freeLayer: j(u),
			modalLayer: j(d),
			snackbarLayer: j(f),
			floatingLayer: j(p),
			documentMode: a(() => n.fillViewport && !n.scrollable),
			getLayoutRect: W
		};
		k(Yn, G), k(ti, {
			kind: "app-root",
			publicContext: H,
			rootElement: G.rootElement,
			contentElement: G.contentElement
		});
		function K() {
			window.addEventListener("resize", z), document.addEventListener("scroll", z, !0), window.visualViewport?.addEventListener("resize", z), window.visualViewport?.addEventListener("scroll", z);
		}
		function re() {
			window.removeEventListener("resize", z), document.removeEventListener("scroll", z, !0), window.visualViewport?.removeEventListener("resize", z), window.visualViewport?.removeEventListener("scroll", z);
		}
		return E(async () => {
			C = !0, Zn(i.value, G), T = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(z), T?.observe(i.value), te.setResizeObserver(T), K(), await y(), z();
		}), w(() => {
			C = !1, te.setResizeObserver(void 0), Qn(i.value), T?.disconnect(), T = void 0, re(), D !== void 0 && (typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(D) : window.clearTimeout(D));
		}), V([() => n.fillViewport, () => n.scrollable], z), (e, t) => (O(), o(I(B(n).as), v({
			ref_key: "rootElement",
			ref: i
		}, e.$attrs, {
			class: ["mat-app-root", x.value],
			"data-scrollable": String(B(n).scrollable),
			style: S.value
		}), {
			default: U(() => [
				l("div", {
					ref_key: "contentElement",
					ref: s,
					class: "mat-app-root__content mat-edge-layout__content"
				}, [F(e.$slots, "default", {}, void 0, !0)], 512),
				l("div", ni, [
					l("div", {
						ref_key: "freeLayer",
						ref: u,
						class: "mat-app-root__free-layer"
					}, null, 512),
					l("div", ri, [
						t[0] ||= l("span", {
							class: "mat-app-root__stack-spacer",
							"aria-hidden": "true"
						}, null, -1),
						l("div", {
							ref_key: "snackbarLayer",
							ref: f,
							class: "mat-app-root__snackbar-layer"
						}, null, 512),
						l("div", {
							ref_key: "floatingLayer",
							ref: p,
							class: "mat-app-root__floating-layer"
						}, null, 512)
					]),
					l("div", {
						ref_key: "modalLayer",
						ref: d,
						class: "mat-app-root__modal-layer"
					}, null, 512)
				]),
				l("span", {
					ref_key: "safeAreaProbe",
					ref: m,
					class: "mat-app-root__safe-area-probe",
					"aria-hidden": "true"
				}, null, 512)
			]),
			_: 3
		}, 16, [
			"class",
			"data-scrollable",
			"style"
		]));
	}
}), [["__scopeId", "data-v-05570144"]]), ai = Symbol("mat-layout");
function oi() {
	let e = g(ai, null);
	if (!e) throw Error("useLayout() 必须在 MatLayout 内调用");
	return e.publicContext;
}
//#endregion
//#region src/components/dialog-stack.js
var si = R([]), ci = R(0), li = Symbol("mat-dialog-document-scope"), ui = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new Map();
function fi(e) {
	return di.has(e) || di.set(e, {
		count: 0,
		inert: !1,
		inertElement: null,
		lockedScrollbarGutter: null,
		overflow: "",
		scrollbarGutter: ""
	}), di.get(e);
}
function pi(e, t) {
	let n = fi(e);
	!t || t === n.inertElement || (n.inertElement && !n.inert && n.inertElement.removeAttribute("inert"), di.set(e, {
		...n,
		inert: t.hasAttribute("inert"),
		inertElement: t
	}), t.setAttribute("inert", ""));
}
function mi(e) {
	let t = di.get(e);
	t?.inertElement && (t.inert || t.inertElement.removeAttribute("inert"), di.set(e, {
		...t,
		inert: !1,
		inertElement: null
	}));
}
function hi(e) {
	let t = fi(e), n = document.documentElement, r = n.clientWidth > 0 ? Math.max(0, window.innerWidth - n.clientWidth) : 0, i = getComputedStyle(n).scrollbarGutter, a = r > 0 && !i.includes("stable") ? "stable" : null;
	di.set(e, {
		...t,
		lockedScrollbarGutter: a,
		overflow: n.style.overflow,
		scrollbarGutter: n.style.scrollbarGutter
	}), a && (n.style.scrollbarGutter = a, ci.value = r), n.style.overflow = "hidden";
}
function gi(e) {
	let t = di.get(e);
	if (!t) return;
	let n = document.documentElement;
	n.style.overflow === "hidden" && (n.style.overflow = t.overflow), t.lockedScrollbarGutter !== null && n.style.scrollbarGutter === t.lockedScrollbarGutter && (n.style.scrollbarGutter = t.scrollbarGutter), t.lockedScrollbarGutter !== null && (ci.value = 0);
}
function _i(e) {
	let t = e, n = fi(e), r = getComputedStyle(t), i = (Number.parseFloat(r.borderLeftWidth) || 0) + (Number.parseFloat(r.borderRightWidth) || 0), a = Math.max(0, t.offsetWidth - t.clientWidth - i) > 0 && !r.scrollbarGutter.includes("stable") ? "stable" : null;
	di.set(e, {
		...n,
		lockedScrollbarGutter: a,
		overflow: t.style.overflow,
		scrollbarGutter: t.style.scrollbarGutter
	}), a && (t.style.scrollbarGutter = a), t.style.overflow = "hidden";
}
function vi(e) {
	let t = e, n = di.get(e);
	n && (t.style.overflow === "hidden" && (t.style.overflow = n.overflow), n.lockedScrollbarGutter !== null && t.style.scrollbarGutter === n.lockedScrollbarGutter && (t.style.scrollbarGutter = n.scrollbarGutter));
}
function yi(e) {
	let t = di.get(e);
	!t || t.count > 0 || (e === li ? gi(e) : vi(e), mi(e), di.delete(e));
}
function bi() {
	[...di.keys()].forEach((e) => {
		e === li ? gi(e) : vi(e), mi(e);
	}), di.clear();
}
function xi({ inertElement: e = null, scrollElement: t } = {}) {
	let n = t instanceof HTMLElement ? t : li, r = fi(n);
	r.count === 0 ? (n === li ? hi(n) : _i(n), pi(n, e)) : e && r.inertElement !== e && pi(n, e);
	let i = fi(n);
	di.set(n, {
		...i,
		count: i.count + 1
	});
}
function Si(e) {
	let t = e?.scrollElement instanceof HTMLElement ? e.scrollElement : li, n = di.get(t);
	n && (di.set(t, {
		...n,
		count: Math.max(0, n.count - 1)
	}), yi(t));
}
function Ci(e, t) {
	let n = si.value.filter((e) => e.isConnected);
	if (n.length === 0 && bi(), n.includes(e)) {
		si.value = n;
		return;
	}
	ui.set(e, t), si.value = [...n, e], xi(t);
}
function wi(e) {
	let t = ui.get(e);
	ui.delete(e), si.value = si.value.filter((t) => t !== e && t.isConnected), t && Si(t), si.value.length === 0 && bi();
}
//#endregion
//#region src/components/use-focus-trap.js
var Ti = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
function Ei(e, t) {
	let n = null, r = !1;
	function i() {
		let t = e.value;
		return t ? [...t.querySelectorAll(Ti)].filter((e) => e instanceof HTMLElement) : [];
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
	}, { immediate: !0 }), w(c);
}
//#endregion
//#region src/components/mat-aside/MatAside.vue
var Di = 200, Oi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatAside",
	inheritAttrs: !1
}, {
	__name: "MatAside",
	props: {
		as: {
			type: String,
			default: "aside"
		},
		location: {
			type: String,
			default: "start",
			validator(e) {
				return [
					"top",
					"bottom",
					"start",
					"end",
					"left",
					"right"
				].includes(e);
			}
		},
		app: {
			type: Boolean,
			default: !1
		},
		mode: {
			type: String,
			default: "docked",
			validator(e) {
				return [
					"docked",
					"flow",
					"sticky",
					"fixed"
				].includes(e);
			}
		},
		blockSize: {
			type: [Number, String],
			default: void 0,
			validator: (e) => e === void 0 || e === "auto" || Cn(e, { property: "block-size" })
		},
		safeArea: {
			type: [
				Boolean,
				Number,
				String
			],
			default: !0,
			validator: (e) => typeof e == "boolean" || Cn(e, {
				property: "block-size",
				allowUndefined: !1
			})
		},
		safeAreaSize: {
			type: [Number, String],
			default: void 0,
			validator: (e) => e === void 0 || Cn(e, {
				property: "block-size",
				allowUndefined: !1
			})
		},
		placeholder: {
			type: Boolean,
			default: !1
		},
		placeholderSize: {
			type: [Number, String],
			default: void 0
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		zIndex: {
			type: [Number, String],
			default: void 0
		},
		open: {
			type: Boolean,
			default: void 0
		},
		modelValue: {
			type: Boolean,
			default: void 0
		},
		unmountOnClose: {
			type: Boolean,
			default: !1
		},
		modal: {
			type: Boolean,
			default: !1
		},
		attach: {
			type: [String, Object],
			default: void 0
		},
		transition: {
			type: Boolean,
			default: !0
		},
		scrimClass: {
			type: String,
			default: void 0
		},
		closeOnBack: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"update:open": (e) => typeof e == "boolean",
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { expose: r, emit: i }) {
		function u(e) {
			if (typeof e == "number") return Number.isFinite(e) ? e : null;
			if (typeof e == "string") {
				let t = e.trim();
				if (/^-?\d+(?:\.\d+)?(?:px)?$/.test(t)) {
					let e = Number.parseFloat(t);
					return Number.isFinite(e) ? e : null;
				}
			}
			return null;
		}
		let d = $("aside", e), f = i, m = ee(), h = p(), _ = M(null), x = R(null);
		function C() {
			let e = /* @__PURE__ */ new Set(), t = h;
			for (; t;) {
				let n = t.vnode;
				t.type?.__scopeId && e.add(t.type.__scopeId), n?.scopeId && e.add(n.scopeId), n?.slotScopeIds?.forEach((t) => e.add(t)), t = t.parent;
			}
			return Object.fromEntries([...e].map((e) => [e, ""]));
		}
		let T = C(), D = a(() => ({
			...m,
			...T
		})), k = a(() => d.open === void 0 ? d.modelValue === void 0 || !!d.modelValue : !!d.open), A = M(!d.unmountOnClose || k.value), j = M(k.value ? "open" : "closed"), N = qn(), P = Jn({ motion: N }), L = !1, z, te = null;
		function ne() {
			te?.isConnected && te.focus({ preventScroll: !0 }), te = null;
		}
		let H = g(ai, null), W = g(Yn, null), G = g(ti, null), K = h?.vnode.props ?? {}, re = a(() => Object.prototype.hasOwnProperty.call(K, "attach") && K.attach !== void 0);
		function q() {
			let e = h?.vnode.props ?? {};
			return Object.prototype.hasOwnProperty.call(e, "mode") && e.mode !== void 0;
		}
		let ie = a(() => d.app && !!W && !re.value), J = a(() => q() ? d.mode : d.app ? ie.value ? "docked" : "fixed" : d.mode), Y = a(() => {
			let e = d.location;
			return e === "left" ? "start" : e === "right" ? "end" : [
				"top",
				"bottom",
				"start",
				"end"
			].includes(e) ? e : "start";
		}), X = a(() => d.blockSize === void 0 || d.blockSize === "auto"), Z = M({
			blockSize: 0,
			inlineSize: 0
		}), ae = a(() => !!d.modal), oe = a(() => ae.value && d.placeholder), se = a(() => ae.value && si.value.at(-1) === _.value);
		Ei(_, a(() => ae.value && A.value && se.value));
		let ce = a(() => {
			if (X.value) return "auto";
			let e = Tn(d.blockSize, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), le = a(() => {
			if (d.safeArea === !1) return "0px";
			if (d.safeAreaSize !== void 0) {
				let e = Tn(d.safeAreaSize, {
					property: "block-size",
					fallback: "0px"
				});
				return e === "0" ? "0px" : e;
			}
			if (typeof d.safeArea == "number" || typeof d.safeArea == "string" && d.safeArea !== "auto") {
				let e = Tn(d.safeArea, {
					property: "block-size",
					fallback: "0px"
				});
				return e === "0" ? "0px" : e;
			}
			let e = Y.value;
			return e === "top" ? "var(--mat-app-root-safe-area-top, env(safe-area-inset-top, 0px))" : e === "bottom" ? "var(--mat-app-root-safe-area-bottom, env(safe-area-inset-bottom, 0px))" : e === "start" ? "var(--mat-app-root-safe-area-start, env(safe-area-inset-left, 0px))" : "var(--mat-app-root-safe-area-end, env(safe-area-inset-right, 0px))";
		}), ue = a(() => {
			if (X.value) return "auto";
			let e = u(d.blockSize), t = u(d.safeAreaSize === void 0 ? d.safeArea : d.safeAreaSize);
			return e !== null && t !== null ? `${e + t}px` : `calc(${ce.value} + ${le.value})`;
		}), de = a(() => Y.value === "top" || Y.value === "bottom" ? "8" : "7"), fe = M({
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			offset: 0
		});
		V(() => x.value?.insets, (e) => {
			e && (fe.value = {
				top: e.top ?? 0,
				bottom: e.bottom ?? 0,
				left: e.left ?? e.start ?? 0,
				right: e.right ?? e.end ?? 0,
				offset: e.offset ?? 0
			});
		}, {
			deep: !0,
			immediate: !0
		});
		let pe = a(() => [
			"mat-aside",
			`mat-aside--${Y.value}`,
			Y.value === "start" ? "mat-aside--left" : null,
			Y.value === "end" ? "mat-aside--right" : null,
			`mat-aside--mode-${J.value}`,
			`mat-aside--${j.value}`,
			{
				"mat-aside--bordered": d.bordered,
				"mat-aside--auto-size": X.value,
				"mat-aside--modal": ae.value,
				"mat-aside--modal-scoped": ae.value && he.value,
				"mat-aside--top-scrim": se.value,
				"mat-aside--no-transition": !d.transition,
				"mat-aside--app": d.app
			}
		]), me = a(() => [m.style, {
			"--mat-aside-block-size": X.value ? "auto" : ce.value,
			"--mat-aside-safe-area-size": le.value,
			"--mat-aside-total-block-size": X.value ? "auto" : ue.value,
			"--mat-aside-insets-top": `${fe.value.top}px`,
			"--mat-aside-insets-bottom": `${fe.value.bottom}px`,
			"--mat-aside-insets-left": `${fe.value.left}px`,
			"--mat-aside-insets-right": `${fe.value.right}px`,
			"--mat-aside-insets-offset": `${fe.value.offset}px`,
			zIndex: d.zIndex === void 0 ? ae.value ? "calc(var(--mat-sys-z-index-dialog) + 1)" : de.value : String(d.zIndex)
		}]), he = a(() => J.value !== "fixed" && !!(G?.rootElement?.value && (G.kind !== "app-root" || !re.value))), ge = a(() => J.value === "fixed" && re.value), _e = a(() => {
			if (re.value && d.attach) {
				if (d.attach instanceof HTMLElement && d.attach.ownerDocument === document) return d.attach;
				if (typeof d.attach == "string") try {
					return document.querySelector(d.attach);
				} catch {
					return null;
				}
			}
			return J.value !== "fixed" && G?.rootElement?.value ? G.rootElement.value : J.value === "fixed" ? null : "body";
		}), ve = a(() => ae.value && he.value ? G?.contentElement?.value ?? _e.value : _e.value), ye = a(() => {
			let e = Y.value === "start" || Y.value === "end", t = k.value && j.value !== "closed", n;
			return n = t ? d.placeholderSize === void 0 ? X.value ? e ? `${Z.value.inlineSize}px` : `${Z.value.blockSize}px` : ue.value : Tn(d.placeholderSize, {
				property: e ? "inline-size" : "block-size",
				fallback: "0px"
			}) : "0px", e ? {
				inlineSize: n,
				minBlockSize: "100%",
				flexShrink: 0
			} : {
				blockSize: n,
				inlineSize: "100%",
				flexShrink: 0
			};
		});
		function be() {
			let e = re.value ? H : G ?? H ?? W;
			if (!e) return {
				inertElement: null,
				scrollElement: null
			};
			if (e.kind === "app-root" || e === W) {
				let t = e.contentElement?.value ?? null;
				return {
					inertElement: _.value && t?.contains(_.value) ? null : t,
					scrollElement: e.documentMode?.value ? null : t
				};
			}
			let t = e.contentElement?.value ?? null;
			return {
				inertElement: _.value && t?.contains(_.value) ? null : t,
				scrollElement: e.rootElement?.value ?? null
			};
		}
		function xe() {
			if (!L || !_.value || !A.value || !ae.value || !k.value || j.value === "closed") {
				_.value && wi(_.value);
				return;
			}
			Ci(_.value, be());
		}
		function Se() {
			_.value && wi(_.value);
		}
		function Ce() {
			f("update:open", !1), f("update:modelValue", !1);
		}
		function we() {
			!ae.value || !d.closeOnBack || Ce();
		}
		function Te(e) {
			ae.value && se.value && e.key === "Escape" && (e.preventDefault(), Ce());
		}
		function Ee() {
			if (!L || !_.value) return;
			let e = _.value.getBoundingClientRect(), t = Math.max(0, Math.ceil(Number(e.height) || 0)), n = Math.max(0, Math.ceil(Number(e.width) || 0));
			Z.value.blockSize === t && Z.value.inlineSize === n || (Z.value = {
				blockSize: t,
				inlineSize: n
			}, x.value?.update());
		}
		function De() {
			L && y().then(() => {
				L && Ee();
			});
		}
		function Oe() {
			if (!L || !_.value || !A.value || !k.value || j.value === "closed") {
				x.value?.unregister(), x.value = null;
				return;
			}
			x.value?.unregister(), x.value = null, !(J.value === "flow" || J.value === "sticky" || d.modal) && G && (x.value = G.publicContext.registerEdge({
				edge: Y.value,
				element: _.value
			}));
		}
		function ke() {
			if (N.cancel(), A.value = !0, ae.value && typeof document < "u" && document.activeElement instanceof HTMLElement && (te = document.activeElement), !d.transition) {
				j.value = "open", y().then(() => {
					Oe(), xe(), f("opened");
				});
				return;
			}
			j.value = "opening", y().then(() => {
				Oe(), xe(), !(!L || !A.value || !k.value) && N.wait(_.value, Di, () => {
					A.value && k.value && (j.value = "open", f("opened"));
				});
			});
		}
		function Ae() {
			if (!A.value || j.value === "closed") {
				j.value = "closed";
				return;
			}
			if (!d.transition) {
				j.value = "closed", d.unmountOnClose && (A.value = !1), x.value?.unregister(), x.value = null, Se(), ne(), f("closed");
				return;
			}
			P.start({
				canStart: () => A.value && j.value !== "closing",
				duration: Di,
				getElement: () => _.value,
				isActive: () => L && !k.value && A.value,
				onStart: () => {
					j.value = "closing", x.value?.unregister(), x.value = null;
				},
				onFinish: () => {
					d.unmountOnClose && (A.value = !1), j.value = "closed", Se(), ne(), f("closed");
				}
			});
		}
		return V(k, (e) => {
			e ? ke() : Ae(), De();
		}), V(Y, () => {
			Oe(), Ee();
		}), V([
			J,
			() => d.app,
			() => d.modal
		], () => {
			Oe(), xe();
		}), V([ce, le], De, { flush: "post" }), E(async () => {
			L = !0, typeof window < "u" && window.addEventListener("keydown", Te), A.value && (await y(), Oe(), xe(), z = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(Ee), _.value && (z?.observe(_.value), Ee()));
		}), w(() => {
			L = !1, typeof window < "u" && window.removeEventListener("keydown", Te), z?.disconnect(), z = void 0, x.value?.unregister(), x.value = null, Se();
		}), r({
			hostElement: _,
			activeInsets: fe,
			phase: j
		}), (e, r) => oe.value && (A.value || !B(d).unmountOnClose) ? (O(), c(t, { key: 0 }, [F(e.$slots, "placeholder", { style: S(ye.value) }, () => [l("span", {
			class: "mat-aside__placeholder",
			"aria-hidden": "true",
			style: S(ye.value)
		}, null, 4)], !0), ge.value ? (O(), o(n, {
			key: 0,
			to: _e.value,
			disabled: !_e.value
		}, [ae.value && A.value && j.value !== "closed" ? (O(), c("div", {
			key: 0,
			class: b(["mat-aside__scrim", [B(d).scrimClass, {
				"mat-aside__scrim--top": se.value,
				"mat-aside__scrim--closing": j.value === "closing",
				"mat-aside__scrim--docked": he.value
			}]]),
			"aria-hidden": "true",
			onClick: we
		}, null, 2)) : s("", !0), A.value ? (O(), o(I(B(d).as), v({
			key: 1,
			ref_key: "hostElement",
			ref: _
		}, D.value, {
			hidden: j.value === "closed" && !B(d).unmountOnClose || void 0,
			class: pe.value,
			style: me.value
		}), {
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"hidden",
			"class",
			"style"
		])) : s("", !0)], 8, ["to", "disabled"])) : A.value ? (O(), o(I(B(d).as), v({
			key: 1,
			ref_key: "hostElement",
			ref: _
		}, D.value, {
			hidden: j.value === "closed" && !B(d).unmountOnClose || void 0,
			class: pe.value,
			style: me.value
		}), {
			default: U(() => [ae.value && A.value && j.value !== "closed" ? (O(), o(n, {
				key: 0,
				to: ve.value,
				disabled: !ve.value
			}, [l("div", {
				class: b(["mat-aside__scrim", [B(d).scrimClass, {
					"mat-aside__scrim--top": se.value,
					"mat-aside__scrim--closing": j.value === "closing",
					"mat-aside__scrim--docked": he.value
				}]]),
				"aria-hidden": "true",
				onClick: we
			}, null, 2)], 8, ["to", "disabled"])) : s("", !0), F(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"hidden",
			"class",
			"style"
		])) : s("", !0)], 64)) : ge.value ? (O(), o(n, {
			key: 1,
			to: _e.value,
			disabled: !_e.value
		}, [ae.value && A.value && j.value !== "closed" ? (O(), c("div", {
			key: 0,
			class: b(["mat-aside__scrim", [B(d).scrimClass, {
				"mat-aside__scrim--top": se.value,
				"mat-aside__scrim--closing": j.value === "closing",
				"mat-aside__scrim--docked": he.value
			}]]),
			"aria-hidden": "true",
			onClick: we
		}, null, 2)) : s("", !0), A.value ? (O(), o(I(B(d).as), v({
			key: 1,
			ref_key: "hostElement",
			ref: _
		}, D.value, {
			hidden: j.value === "closed" && !B(d).unmountOnClose || void 0,
			class: pe.value,
			style: me.value
		}), {
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"hidden",
			"class",
			"style"
		])) : s("", !0)], 8, ["to", "disabled"])) : A.value ? (O(), o(I(B(d).as), v({
			key: 2,
			ref_key: "hostElement",
			ref: _
		}, D.value, {
			hidden: j.value === "closed" && !B(d).unmountOnClose || void 0,
			class: pe.value,
			style: me.value
		}), {
			default: U(() => [ae.value && A.value && j.value !== "closed" ? (O(), o(n, {
				key: 0,
				to: ve.value,
				disabled: !ve.value
			}, [l("div", {
				class: b(["mat-aside__scrim", [B(d).scrimClass, {
					"mat-aside__scrim--top": se.value,
					"mat-aside__scrim--closing": j.value === "closing",
					"mat-aside__scrim--docked": he.value
				}]]),
				"aria-hidden": "true",
				onClick: we
			}, null, 2)], 8, ["to", "disabled"])) : s("", !0), F(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"hidden",
			"class",
			"style"
		])) : s("", !0);
	}
}), [["__scopeId", "data-v-dc44c35a"]]), ki = /* @__PURE__ */ new WeakMap(), Ai = /* @__PURE__ */ new WeakMap();
function ji(e, t, n) {
	let r = [n.initialValue, ...n.names].filter((e) => e && e !== "none"), i = e.style;
	i[t] = r.join(", ");
}
function Mi(e, t, n, r) {
	let i = e.get(t);
	return i || (i = {
		initialValue: t.style[n],
		names: /* @__PURE__ */ new Set()
	}, e.set(t, i)), i.names.add(r), ji(t, n, i), () => {
		if (i.names.delete(r), i.names.size > 0) {
			ji(t, n, i);
			return;
		}
		let a = t.style;
		a[n] = i.initialValue, e.delete(t);
	};
}
function Ni({ name: e, scope: t, source: n }) {
	let r = ki.get(n)?.initialAxis ?? n.style.scrollTimelineAxis, i = Mi(ki, n, "scrollTimelineName", e), a = ki.get(n);
	a.initialAxis = r;
	let o = n.style;
	o.scrollTimelineAxis = "block";
	let s = Mi(Ai, t, "timelineScope", e);
	return () => {
		s(), i(), ki.has(n) || (o.scrollTimelineAxis = r);
	};
}
function Pi(e) {
	let t = e.parentElement;
	for (; t;) {
		let e = window.getComputedStyle(t).overflowY;
		if (/(auto|scroll|overlay)/.test(e)) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function Fi(e, t) {
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
var Ii = {
	key: 0,
	class: "mat-app-bar__leading"
}, Li = { class: "mat-app-bar__main" }, Ri = {
	key: 0,
	class: "mat-app-bar__subtitle mat-sys-typescale-body-medium"
}, zi = {
	key: 1,
	class: "mat-app-bar__trailing"
}, Bi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		},
		placeholder: {
			type: Boolean,
			default: !1
		},
		safeArea: {
			type: [
				Boolean,
				Number,
				String
			],
			default: !0
		},
		safeAreaSize: {
			type: [Number, String],
			default: void 0
		},
		open: {
			type: Boolean,
			default: void 0
		},
		modelValue: {
			type: Boolean,
			default: void 0
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		mode: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || [
					"docked",
					"flow",
					"sticky",
					"fixed"
				].includes(e);
			}
		},
		zIndex: {
			type: [Number, String],
			default: void 0
		},
		transition: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"update:open": (e) => typeof e == "boolean",
		"update:modelValue": (e) => typeof e == "boolean"
	},
	setup(e, { expose: n, emit: r }) {
		let i = [
			"search",
			"small",
			"medium-flexible",
			"large-flexible"
		], o = [
			"headline",
			"image",
			"search"
		], u = ["start", "center"], d = $("appBar", e), m = r, h = ee(), _ = p(), x = g(Yn, null), C = _?.vnode.props ?? {}, T = a(() => Object.prototype.hasOwnProperty.call(C, "attach") && C.attach !== void 0), D = a(() => T.value ? d.attach : void 0), k = M(null), A = a(() => {
			if (d.mode !== void 0) return d.mode;
			if (!d.app) return "sticky";
		}), j = `--mat-app-bar-${_?.uid ?? Math.random().toString(36).slice(2)}`, N = a(() => i.includes(d.variant) ? d.variant : "small"), P = a(() => N.value === "search" ? "search" : o.includes(d.content) ? d.content : "headline"), I = a(() => u.includes(d.align) ? d.align : "start"), L = a(() => N.value === "medium-flexible" ? 112 : N.value === "large-flexible" ? 120 : 64), R = a(() => d.app && !!x && !T.value), z = a(() => {
			let e = Math.max(0, L.value - 64);
			return e > 0 ? e : d.placeholder ? 64 : 0;
		}), te = a(() => [
			`mat-app-bar--${N.value}`,
			`mat-app-bar--content-${P.value}`,
			`mat-app-bar--align-${I.value}`
		]), ne = a(() => [h.style, { "--mat-app-bar-timeline": j }]), H = a(() => N.value === "medium-flexible" ? Kr("headline", "small") : N.value === "large-flexible" ? Kr("headline", "medium") : Kr("title", "large")), W = !1, G, K;
		function re() {
			return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "scroll()");
		}
		function q(e) {
			if (e instanceof HTMLElement && e.ownerDocument === document) return e;
			if (e?.$el instanceof HTMLElement && e.$el.ownerDocument === document) return e.$el;
			if (typeof e == "string") try {
				return document.querySelector(e);
			} catch {
				return null;
			}
			return null;
		}
		function ie() {
			G?.(), G = void 0, K?.(), K = void 0;
			let e = k.value?.hostElement;
			e?.removeAttribute("data-timeline-active"), e?.removeAttribute("data-scrolled");
		}
		async function J() {
			await y();
			let e = k.value?.hostElement;
			if (!W || !e) return;
			ie();
			let t = q(d.scrollTarget), n = R.value && x.rootElement.value?.dataset.scrollable === "true" ? x.contentElement.value : null, r = t ?? n ?? Pi(e);
			if (!r) return;
			let i = Fi(r, e);
			re() && i && (G = Ni({
				name: j,
				scope: i,
				source: r
			}), e.dataset.timelineActive = "");
			let a = r === document.documentElement || r === document.body || document.scrollingElement !== void 0 && r === document.scrollingElement, o = a ? window : r;
			function s() {
				return a ? window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0 : r.scrollTop || 0;
			}
			function c() {
				s() > 0 ? e?.setAttribute("data-scrolled", "") : e?.removeAttribute("data-scrolled");
			}
			o.addEventListener("scroll", c, { passive: !0 }), c(), K = () => {
				o.removeEventListener("scroll", c);
			};
		}
		return E(() => {
			W = !0, J();
		}), w(() => {
			W = !1, ie();
		}), V([
			() => d.app,
			() => d.attach,
			() => d.scrollTarget,
			N
		], J), n({
			asideRef: k,
			hostElement: a(() => k.value?.hostElement)
		}), (e, n) => (O(), c(t, null, [f(Oi, v({
			ref_key: "asideRef",
			ref: k,
			as: "header",
			location: "top",
			app: B(d).app,
			attach: D.value,
			"block-size": 64,
			"safe-area": B(d).safeArea,
			"safe-area-size": B(d).safeAreaSize,
			open: B(d).open,
			"model-value": B(d).modelValue,
			bordered: B(d).bordered,
			mode: A.value,
			"z-index": B(d).zIndex,
			transition: B(d).transition,
			class: ["mat-app-bar", te.value],
			style: ne.value
		}, e.$attrs, {
			"onUpdate:open": n[0] ||= (e) => m("update:open", e),
			"onUpdate:modelValue": n[1] ||= (e) => m("update:modelValue", e)
		}), {
			default: U(() => [
				e.$slots.leading ? (O(), c("div", Ii, [F(e.$slots, "leading", {}, void 0, !0)])) : s("", !0),
				l("div", Li, [l("div", { class: b(["mat-app-bar__primary", H.value]) }, [F(e.$slots, "default", {}, void 0, !0)], 2), e.$slots.subtitle ? (O(), c("div", Ri, [F(e.$slots, "subtitle", {}, void 0, !0)])) : s("", !0)]),
				n[2] ||= l("span", {
					class: "mat-app-bar__spacer",
					"aria-hidden": "true"
				}, null, -1),
				e.$slots.trailing ? (O(), c("div", zi, [F(e.$slots, "trailing", {}, void 0, !0)])) : s("", !0)
			]),
			_: 3
		}, 16, [
			"app",
			"attach",
			"safe-area",
			"safe-area-size",
			"open",
			"model-value",
			"bordered",
			"mode",
			"z-index",
			"transition",
			"class",
			"style"
		]), z.value > 0 ? (O(), c("span", {
			key: 0,
			"aria-hidden": "true",
			class: "mat-app-bar__placeholder",
			style: S({ blockSize: `${z.value}px` })
		}, null, 4)) : s("", !0)], 64));
	}
}), [["__scopeId", "data-v-abe3039f"]]), Vi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = $("inputBase", e), i = n, a = M(null);
		function s(e) {
			i("update:modelValue", e.target.value);
		}
		function c() {
			a.value?.focus();
		}
		function l() {
			return a.value;
		}
		return t({
			focusInput: c,
			getInput: l
		}), (e, t) => (O(), o(I(B(r).control), v({
			ref_key: "input",
			ref: a
		}, e.$attrs, {
			class: "mat-input-base",
			disabled: B(r).disabled,
			maxlength: B(r).maxLength,
			readonly: B(r).readonly,
			required: B(r).required,
			rows: B(r).control === "textarea" ? B(r).rows : void 0,
			type: B(r).control === "input" ? B(r).type : void 0,
			value: B(r).modelValue,
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
}), [["__scopeId", "data-v-ace9bd51"]]), Hi = { class: "mat-search__leading" }, Ui = {
	key: 0,
	class: "mat-search__trailing"
}, Wi = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = $("search", e), i = n, o = ee(), u = M(null), d = a(() => ({
			class: o.class,
			style: o.style
		})), p = a(() => {
			let e = { ...o };
			return delete e.class, delete e.style, e;
		});
		function m() {
			r.disabled || i("search", r.modelValue);
		}
		function h() {
			u.value?.focusInput();
		}
		function g() {
			return u.value?.getInput() ?? null;
		}
		return t({
			focusInput: h,
			getInput: g
		}), (e, t) => (O(), c("form", v(d.value, {
			class: "mat-search mat-sys-typescale-body-large",
			role: "search",
			onSubmit: K(m, ["prevent"])
		}), [
			l("span", Hi, [F(e.$slots, "leading", {}, () => [f(Jr, {
				disabled: B(r).disabled,
				icon: "search",
				label: B(r).label,
				size: "small",
				type: "button",
				variant: "standard",
				onClick: m
			}, null, 8, ["disabled", "label"])], !0)]),
			f(Vi, v({
				ref_key: "inputBase",
				ref: u
			}, p.value, {
				"aria-label": B(r).label,
				control: "input",
				disabled: B(r).disabled,
				"max-length": B(r).maxLength,
				"model-value": B(r).modelValue,
				placeholder: B(r).placeholder,
				readonly: B(r).readonly,
				type: "search",
				onKeydown: G(K(m, ["prevent"]), ["enter"]),
				"onUpdate:modelValue": t[0] ||= (e) => i("update:modelValue", e)
			}), null, 16, [
				"aria-label",
				"disabled",
				"max-length",
				"model-value",
				"placeholder",
				"readonly",
				"onKeydown"
			]),
			e.$slots.trailing ? (O(), c("span", Ui, [F(e.$slots, "trailing", {}, void 0, !0)])) : s("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-7c60e904"]]), Gi = 150, Ki = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Pt.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return Ft.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
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
		let n = $("btnGroup", e), r = t, i = M(null), o = M(null), s = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set(), f, p, m, h = Gi, g = !0, _ = !1, { colorStyle: b } = dn(a(() => n.color));
		function x(e) {
			return n.selection === "multiple" ? Array.isArray(n.selected) && n.selected.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.selected, e);
		}
		function S(e, t) {
			if (e === void 0) {
				console.warn("MatBtnGroup: selection 不为 none 时，子按钮必须提供 value");
				return;
			}
			let i = x(e);
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
		k(Lr, {
			color: a(() => n.color),
			disabled: a(() => n.disabled),
			isSelected: x,
			requestSelection: S,
			selection: a(() => n.selection),
			shape: a(() => n.shape),
			size: a(() => n.size),
			variant: a(() => n.variant)
		});
		function C(e) {
			return e instanceof Element ? e.closest(".mat-button-base") : null;
		}
		function T(e) {
			let t = e.trim().match(/^(\d*\.?\d+)(ms|s)$/);
			if (!t) return null;
			let n = Number.parseFloat(t[1]);
			return t[2] === "s" ? n * 1e3 : n;
		}
		function A() {
			return T(getComputedStyle(i.value).getPropertyValue("--mat-btn-group-size-animation-duration")) ?? Gi;
		}
		function j() {
			return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function N() {
			f !== void 0 && (globalThis.cancelAnimationFrame(f), f = void 0);
		}
		function P(e, t) {
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
		function L(e, t, n, r) {
			N();
			let i = performance.now(), a = [...t.keys()], o = Math.round(a.reduce((e, n) => e + t.get(n).inlineSize, 0) * 64);
			if (j() || n === 0) {
				t.forEach((e, t) => {
					P(t, {
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
					d += l, P(n, {
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
			N(), d.forEach((e) => {
				let t = e;
				P(t, s.get(t) ?? {
					inlineSize: "",
					paddingInlineStart: "",
					paddingInlineEnd: ""
				}), s.delete(t), l.delete(t);
			}), d.clear(), o.value && delete o.value.dataset.matGroupPressed, m &&= (m.style.removeProperty("--mat-button-visual-scale"), void 0), o.value = null, h = Gi, g = !0, _ = !1;
		}
		function z() {
			if (!o.value) return;
			let e = new Map([...d].map((e) => {
				let t = getComputedStyle(e);
				return [e, {
					inlineSize: Number.parseFloat(t.inlineSize) || 0,
					paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
					paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
				}];
			})), t = I(new Map([...d].map((e) => [e, l.get(e)])));
			delete o.value.dataset.matGroupPressed, o.value.style.setProperty("--mat-button-visual-scale", "1"), o.value = null, g = !0, _ = !1, L(e, t, h, R);
		}
		function ee() {
			if (o.value) {
				if (g) {
					z();
					return;
				}
				_ = !0;
			}
		}
		function te(e, t, n, r) {
			g = !1, _ = !1, h = r, L(I(t), I(n), r, () => {
				o.value === e && (g = !0, _ && z());
			}), (j() || r === 0) && (g = !0);
		}
		function ne(e) {
			if (n.variant !== "standard" || e.disabled || o.value === e) return;
			let t = e;
			R();
			let r = [...i.value.querySelectorAll(".mat-button-base")], a = r.indexOf(t);
			if (r.length < 2 || a === -1) return;
			let c = Number.parseFloat(getComputedStyle(i.value).getPropertyValue("--mat-btn-group-standard-pressed-width-factor")) || 1.15, f = A(), p = new Map(r.map((e) => {
				let t = getComputedStyle(e);
				return [e, {
					icon: e.classList.contains("mat-btn--icon"),
					inlineSize: u.get(e) ?? e.getBoundingClientRect().width,
					paddingInlineStart: Number.parseFloat(t.paddingInlineStart) || 0,
					paddingInlineEnd: Number.parseFloat(t.paddingInlineEnd) || 0
				}];
			})), h = a === 0 ? [r[1]] : a === r.length - 1 ? [r[a - 1]] : [r[a - 1], r[a + 1]], g = p.get(t).inlineSize * (c - 1), _ = h.reduce((e, t) => {
				let n = p.get(t);
				return e + (n.icon ? n.inlineSize * (c - 1) : n.paddingInlineStart + n.paddingInlineEnd);
			}, 0), v = Math.min(g, _), y = /* @__PURE__ */ new Map(), b = p.get(t);
			y.set(t, {
				inlineSize: `${b.inlineSize + v}px`,
				paddingInlineStart: `${b.paddingInlineStart}px`,
				paddingInlineEnd: `${b.paddingInlineEnd}px`
			}), h.forEach((e) => {
				let t = p.get(e), n = t.paddingInlineStart + t.paddingInlineEnd, r = t.icon ? t.inlineSize * (c - 1) : n, i = _ > 0 ? v * r / _ : 0, a = n > 0 ? i * t.paddingInlineStart / n : 0, o = i - a;
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
				s.set(n, {
					inlineSize: n.style.inlineSize,
					paddingInlineStart: n.style.paddingInlineStart,
					paddingInlineEnd: n.style.paddingInlineEnd
				}), l.set(n, i), P(n, i), d.add(n);
			}), t.dataset.matGroupPressed = "", t.style.setProperty("--mat-button-visual-scale", ".96"), m = t, o.value = t, te(t, new Map([...d].map((e) => [e, l.get(e)])), y, f);
		}
		function H() {
			p?.disconnect(), !(!i.value || typeof ResizeObserver != "function") && (p ??= new ResizeObserver((e) => {
				e.forEach((e) => {
					let t = (Array.isArray(e.borderBoxSize) ? e.borderBoxSize[0] : e.borderBoxSize)?.inlineSize ?? e.contentRect.width;
					!d.has(e.target) && t > 0 && u.set(e.target, t);
				});
			}), i.value.querySelectorAll(".mat-button-base").forEach((e) => {
				p.observe(e, { box: "border-box" });
			}));
		}
		async function U(e) {
			let t = C(e.target);
			t && (await y(), ne(t));
		}
		function W(e) {
			e.relatedTarget instanceof Node && i.value?.contains(e.relatedTarget) || ee();
		}
		async function G(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = C(e.target);
			t && (await y(), ne(t));
		}
		function K() {
			if (n.variant !== "connected" || !i.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...i.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return E(() => {
			K(), H();
		}), D(H), w(() => {
			p?.disconnect(), R();
		}), V(() => [n.variant, n.selection], async () => {
			R(), await y(), K();
		}), (e, t) => (O(), c("div", v({
			ref_key: "root",
			ref: i
		}, e.$attrs, {
			class: ["mat-btn-group", [
				`mat-btn-group--${B(n).variant}`,
				`mat-btn-group--size-${B(n).size}`,
				`mat-btn-group--shape-${B(n).shape}`,
				{
					"mat-btn-group--block": B(n).block,
					"mat-btn-group--full-width": B(n).variant === "connected" && B(n).fullWidth
				}
			]],
			style: B(b),
			role: "group",
			onFocusout: W,
			onKeydown: G,
			onKeyupCapture: ee,
			onLostpointercaptureCapture: ee,
			onPointercancelCapture: ee,
			onPointerdown: U,
			onPointerupCapture: ee
		}), [F(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-05cf7ce9"]]), qi = [
	"small",
	"medium",
	"large"
], Ji = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], Yi = [
	"button",
	"submit",
	"reset"
];
function Xi(e) {
	return typeof e == "string" && Ji.includes(e);
}
//#endregion
//#region src/components/mat-fab/MatFab.vue
var Zi = ["aria-hidden"], Qi = ["aria-hidden"], $i = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return qi.includes(e);
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
			validator: Xi
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return Yi.includes(e);
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
		let i = $("fab", t), l = r, u = ee(), p = ne(), m = g(At, kt), h = g(Yn, null), _ = M(null), y = te(), b = a(() => (p.default?.() ?? []).some((t) => t.type === e ? !1 : typeof t.children != "string" || t.children.trim().length > 0)), x = a(() => i.expanded && b.value), S = a(() => typeof i.icon == "string" && i.icon.trim().length > 0), C = a(() => !x.value), w = a(() => C.value ? u.title ?? i.label : void 0), T = a(() => C.value ? i.label : u["aria-label"]), E = a(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[i.size]), D = a(() => {
			let [e, t] = {
				small: ["title", "medium"],
				medium: ["title", "large"],
				large: ["headline", "small"]
			}[i.size];
			return Kr(e, t);
		}), k = a(() => ({
			"--mat-fab-container-color": `var(--mat-sys-color-${i.color})`,
			"--mat-fab-content-color": `var(--mat-sys-color-on-${i.color})`,
			"--mat-fab-state-color": `var(--mat-sys-color-on-${i.color})`
		})), A = a(() => i.app && !!h), j = a(() => A.value ? h.floatingLayer.value : null);
		return H(() => {
			C.value && (!S.value || !i.label || i.label.trim().length === 0) && console.warn("MatFab: 图标模式必须提供非空 label");
		}), (e, t) => A.value ? j.value ? (O(), o(n, {
			key: 1,
			to: j.value
		}, [f(Nt, v({
			ref_key: "buttonElement",
			ref: _
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${B(i).size}`,
				`mat-fab--position-${B(i).position}`,
				D.value,
				{
					"mat-fab--app-root": !0,
					"mat-fab--extended": x.value,
					"mat-fab--icon-only": C.value
				}
			]],
			style: k.value,
			"aria-label": T.value,
			disabled: B(i).disabled,
			title: C.value ? void 0 : B(u).title,
			type: B(i).type,
			"use-cursor": B(m).useCursor,
			onClick: t[1] ||= (e) => l("click", e)
		}), {
			default: U(() => [
				S.value ? (O(), o(hn, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": E.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [d(z(B(i).icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : s("", !0),
				b.value ? (O(), c("span", {
					key: 1,
					class: "mat-fab__label",
					"aria-hidden": x.value ? void 0 : "true"
				}, [F(e.$slots, "default", {}, void 0, !0)], 8, Qi)) : s("", !0),
				C.value && w.value ? (O(), o(Ir, {
					key: 2,
					content: w.value,
					id: `${B(y)}-tooltip`,
					target: _.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : s("", !0)
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
		])], 8, ["to"])) : s("", !0) : (O(), o(Nt, v({
			key: 0,
			ref_key: "buttonElement",
			ref: _
		}, e.$attrs, {
			class: ["mat-fab", [
				`mat-fab--size-${B(i).size}`,
				D.value,
				{
					"mat-fab--extended": x.value,
					"mat-fab--icon-only": C.value
				}
			]],
			style: k.value,
			"aria-label": T.value,
			disabled: B(i).disabled,
			title: C.value ? void 0 : B(u).title,
			type: B(i).type,
			"use-cursor": B(m).useCursor,
			onClick: t[0] ||= (e) => l("click", e)
		}), {
			default: U(() => [
				S.value ? (O(), o(hn, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": E.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: U(() => [d(z(B(i).icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : s("", !0),
				b.value ? (O(), c("span", {
					key: 1,
					class: "mat-fab__label",
					"aria-hidden": x.value ? void 0 : "true"
				}, [F(e.$slots, "default", {}, void 0, !0)], 8, Zi)) : s("", !0),
				C.value && w.value ? (O(), o(Ir, {
					key: 2,
					content: w.value,
					id: `${B(y)}-tooltip`,
					target: _.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : s("", !0)
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
}), [["__scopeId", "data-v-01889ab8"]]), ea = ["aria-hidden"], ta = { class: "mat-fab-menu__trigger-box" }, na = ["aria-hidden"], ra = { class: "mat-fab-menu__trigger-box" }, ia = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatFabMenu",
	inheritAttrs: !1
}, {
	__name: "MatFabMenu",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return qi.includes(e);
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
		closeIcon: {
			type: String,
			default: "close"
		},
		closeLabel: {
			type: String,
			default: void 0
		},
		color: {
			type: String,
			default: "primary-container",
			validator: Xi
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return Yi.includes(e);
			}
		},
		modelValue: {
			type: Boolean,
			default: void 0
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		},
		closeOnEsc: {
			type: Boolean,
			default: !0
		},
		closeOnClickOutside: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"update:modelValue"(e) {
			return typeof e == "boolean";
		},
		open() {
			return !0;
		},
		close() {
			return !0;
		}
	},
	setup(e, { emit: t }) {
		let r = $("fabMenu", e), i = t, u = g(At, kt), p = g(Yn, null), m = M(null), h = M(null), _ = M(!1), y = te(), b = a(() => r.modelValue !== void 0), x = a(() => b.value ? !!r.modelValue : _.value), S = a(() => r.closeLabel || "关闭"), C = a(() => r.color.replace(/-container$/, "")), T = a(() => `${C.value}-container`), D = a(() => ({
			"--mat-fab-menu-close-container-color": `var(--mat-sys-color-${C.value})`,
			"--mat-fab-menu-close-content-color": `var(--mat-sys-color-on-${C.value})`,
			"--mat-fab-menu-state-color": `var(--mat-sys-color-on-${C.value})`
		})), k = a(() => !!p), A = a(() => k.value ? p.floatingLayer.value : null);
		function j(e) {
			r.disabled || e !== x.value && (b.value || (_.value = e), i("update:modelValue", e), i(e ? "open" : "close"));
		}
		function N() {
			j(!x.value);
		}
		function P(e) {
			if (!r.closeOnClick) return;
			let t = e.target;
			t instanceof Element && t.closest("button, [role=\"button\"], a") && j(!1);
		}
		function I(e) {
			r.closeOnEsc && x.value && e.key === "Escape" && j(!1);
		}
		function L(e) {
			r.closeOnClickOutside && x.value && m.value && (m.value.contains(e.target) || j(!1));
		}
		return E(() => {
			window.addEventListener("keydown", I), window.addEventListener("pointerdown", L);
		}), w(() => {
			window.removeEventListener("keydown", I), window.removeEventListener("pointerdown", L);
		}), (e, t) => A.value ? (O(), o(n, {
			key: 0,
			to: A.value
		}, [l("div", v({
			ref_key: "rootElement",
			ref: m
		}, e.$attrs, {
			class: ["mat-fab-menu", [`mat-fab-menu--size-${B(r).size}`, {
				"mat-fab-menu--app-root": !0,
				"mat-fab-menu--open": x.value,
				"mat-fab-menu--disabled": B(r).disabled
			}]],
			style: D.value
		}), [l("div", {
			class: "mat-fab-menu__items",
			"aria-hidden": x.value ? void 0 : "true",
			onClick: P
		}, [F(e.$slots, "default", {}, void 0, !0)], 8, ea), l("div", ta, [F(e.$slots, "trigger", {
			open: x.value,
			toggle: N,
			size: B(r).size,
			color: B(r).color
		}, () => [f($i, {
			class: "mat-fab-menu__trigger-fab",
			color: T.value,
			disabled: B(r).disabled,
			icon: B(r).icon,
			label: B(r).label,
			size: B(r).size,
			type: B(r).type,
			"aria-haspopup": "true",
			"aria-expanded": String(x.value),
			onClick: t[0] ||= (e) => j(!0)
		}, null, 8, [
			"color",
			"disabled",
			"icon",
			"label",
			"size",
			"type",
			"aria-expanded"
		]), f(Nt, {
			ref_key: "closeButtonElement",
			ref: h,
			class: "mat-fab-menu__close-btn",
			"aria-label": S.value,
			disabled: B(r).disabled,
			type: B(r).type,
			"use-cursor": B(u).useCursor,
			onClick: t[1] ||= (e) => j(!1)
		}, {
			default: U(() => [f(hn, {
				as: "span",
				class: "mat-fab-menu__close-icon",
				fill: 1,
				"optical-size": 24,
				size: "24px",
				"aria-hidden": "true"
			}, {
				default: U(() => [d(z(B(r).closeIcon || "close"), 1)]),
				_: 1
			}), S.value ? (O(), o(Ir, {
				key: 0,
				content: S.value,
				id: `${B(y)}-close-tooltip`,
				target: h.value
			}, null, 8, [
				"content",
				"id",
				"target"
			])) : s("", !0)]),
			_: 1
		}, 8, [
			"aria-label",
			"disabled",
			"type",
			"use-cursor"
		])], !0)])], 16)], 8, ["to"])) : (O(), c("div", v({
			key: 1,
			ref_key: "rootElement",
			ref: m
		}, e.$attrs, {
			class: ["mat-fab-menu", [`mat-fab-menu--size-${B(r).size}`, {
				"mat-fab-menu--open": x.value,
				"mat-fab-menu--disabled": B(r).disabled
			}]],
			style: D.value
		}), [l("div", {
			class: "mat-fab-menu__items",
			"aria-hidden": x.value ? void 0 : "true",
			onClick: P
		}, [F(e.$slots, "default", {}, void 0, !0)], 8, na), l("div", ra, [F(e.$slots, "trigger", {
			open: x.value,
			toggle: N,
			size: B(r).size,
			color: B(r).color
		}, () => [f($i, {
			class: "mat-fab-menu__trigger-fab",
			color: T.value,
			disabled: B(r).disabled,
			icon: B(r).icon,
			label: B(r).label,
			size: B(r).size,
			type: B(r).type,
			"aria-haspopup": "true",
			"aria-expanded": String(x.value),
			onClick: t[2] ||= (e) => j(!0)
		}, null, 8, [
			"color",
			"disabled",
			"icon",
			"label",
			"size",
			"type",
			"aria-expanded"
		]), f(Nt, {
			ref_key: "closeButtonElement",
			ref: h,
			class: "mat-fab-menu__close-btn",
			"aria-label": S.value,
			disabled: B(r).disabled,
			type: B(r).type,
			"use-cursor": B(u).useCursor,
			onClick: t[3] ||= (e) => j(!1)
		}, {
			default: U(() => [f(hn, {
				as: "span",
				class: "mat-fab-menu__close-icon",
				fill: 1,
				"optical-size": 24,
				size: "24px",
				"aria-hidden": "true"
			}, {
				default: U(() => [d(z(B(r).closeIcon || "close"), 1)]),
				_: 1
			}), S.value ? (O(), o(Ir, {
				key: 0,
				content: S.value,
				id: `${B(y)}-close-tooltip`,
				target: h.value
			}, null, 8, [
				"content",
				"id",
				"target"
			])) : s("", !0)]),
			_: 1
		}, 8, [
			"aria-label",
			"disabled",
			"type",
			"use-cursor"
		])], !0)])], 16));
	}
}), [["__scopeId", "data-v-76aa1a6c"]]), aa = ["src"], oa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Cn(e, { property: "border-radius" })
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
			validator: (e) => Cn(e, {
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
		let t = $("image", e), n = ee(), r = a(() => ({
			class: n.class,
			style: n.style
		})), i = a(() => Object.fromEntries(Object.entries(n).filter(([e]) => !["class", "style"].includes(e)))), o = a(() => ({
			aspectRatio: En(t.aspectRatio, {
				property: "aspect-ratio",
				positive: !0
			}),
			borderRadius: t.radius === void 0 ? "var(--mat-sys-shape-corner-extra-large)" : Tn(t.radius, {
				property: "border-radius",
				fallback: "var(--mat-sys-shape-corner-extra-large)"
			}),
			outline: t.outline ? "1px solid var(--mat-sys-color-outline)" : void 0
		})), s = a(() => {
			let e = { objectFit: t.fit };
			return typeof t.imgStyle == "string" ? [e, t.imgStyle] : Array.isArray(t.imgStyle) ? [e, ...t.imgStyle] : {
				...e,
				...t.imgStyle
			};
		});
		return (e, n) => (O(), c("div", v(r.value, {
			class: "mat-image",
			style: o.value
		}), [l("img", v(i.value, {
			class: ["mat-image__img", B(t).imgClass],
			style: s.value,
			src: B(t).src
		}), null, 16, aa)], 16));
	}
}), [["__scopeId", "data-v-d5f3cb83"]]), sa = R(/* @__PURE__ */ new Set()), ca = 0;
function la(e) {
	return ca += 1, sa.value = new Set(e), ca;
}
function ua(e) {
	e === ca && (sa.value = /* @__PURE__ */ new Set());
}
//#endregion
//#region src/components/mat-shared-element/MatSharedElement.vue
var da = /*@__PURE__*/ Object.assign({
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
			validator: Kt
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = $("sharedElement", e), n = ee(), r = a(() => !t.disabled && sa.value.has(t.name) ? t.name : void 0), i = a(() => [n.style, { viewTransitionName: r.value }]);
		return (e, r) => (O(), o(I(B(t).as), v(B(n), { style: i.value }), {
			default: U(() => [F(e.$slots, "default")]),
			_: 3
		}, 16, ["style"]));
	}
}), fa = ["src"], pa = {
	key: 2,
	class: "mat-avatar__content"
}, ma = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ht
		},
		size: {
			type: [Number, String],
			default: 40,
			validator: (e) => Cn(e, {
				property: "width",
				positive: !0
			})
		}
	},
	setup(e) {
		let t = $("avatar", e), { colorStyle: n } = dn(a(() => t.color)), r = a(() => Tn(t.size, {
			property: "width",
			positive: !0,
			fallback: "40px"
		})), i = a(() => ({
			...n.value,
			"--mat-avatar-size": r.value,
			"inline-size": r.value,
			"block-size": r.value
		}));
		return (e, n) => (O(), c("span", v(e.$attrs, {
			class: "mat-avatar",
			style: i.value
		}), [B(t).src ? (O(), c("img", {
			key: 0,
			class: "mat-avatar__image",
			src: B(t).src,
			alt: ""
		}, null, 8, fa)) : B(t).icon ? (O(), o(hn, {
			key: 1,
			as: "span",
			class: "mat-avatar__icon",
			icon: B(t).icon,
			size: "var(--mat-avatar-icon-size)",
			"aria-hidden": "true"
		}, null, 8, ["icon"])) : (O(), c("span", pa, [F(e.$slots, "default", {}, void 0, !0)]))], 16));
	}
}), [["__scopeId", "data-v-a04143bf"]]), ha = /*@__PURE__*/ Object.assign({ name: "MatText" }, {
	__name: "MatText",
	props: {
		type: {
			type: String,
			default: "body",
			validator: Ur
		},
		size: {
			type: String,
			default: "medium",
			validator: Wr
		},
		emphasized: {
			type: Boolean,
			default: !1
		},
		as: {
			type: String,
			default: "span",
			validator: Kt
		}
	},
	setup(e) {
		let t = $("text", e), n = a(() => Kr(t.type, t.size, t.emphasized));
		return (e, r) => (O(), o(I(B(t).as), { class: b(n.value) }, {
			default: U(() => [F(e.$slots, "default")]),
			_: 3
		}, 8, ["class"]));
	}
}), ga = ["data-char", "onAnimationend"], _a = { class: "mat-dynamic-text__stage" }, va = {
	key: 1,
	class: "mat-dynamic-text__char mat-dynamic-text__char--exiting"
}, ya = 25, ba = 300, xa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatDynamicText" }, {
	__name: "MatDynamicText",
	props: {
		text: {
			type: [String, Number],
			default: ""
		},
		as: {
			type: String,
			default: "span",
			validator: Kt
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
		let n = $("dynamicText", e), r = 0, i = M([]), u = /* @__PURE__ */ new Map(), d = a(() => {
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
			u.forEach((e) => clearTimeout(e)), u.clear(), i.value = i.value.filter((e) => e.char).map((e) => ({
				...e,
				oldChar: null,
				animating: !1
			}));
		}
		function g(e) {
			let t = u.get(e);
			t && (clearTimeout(t), u.delete(e));
			let n = i.value.find((t) => t.id === e);
			n && (n.char ? (n.oldChar = null, n.animating = !1) : i.value = i.value.filter((t) => t.id !== e));
		}
		function _(e, t) {
			let n = t * ya + ba, r = setTimeout(() => g(e), n);
			u.set(e, r);
		}
		function v(e, t) {
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
		function y(e, t) {
			h();
			let a = m(e), o = i.value.map((e) => e.char), s = t && !p(), c = Math.max(o.length, a.length), l = [];
			for (let e = 0; e < c; e += 1) {
				let t = o[e], i = a[e];
				if (i !== void 0) {
					let a = n.diff && t === i, o = s && !a, c = r += 1;
					l.push({
						id: c,
						char: i,
						oldChar: o && t !== void 0 ? t : null,
						animating: o,
						index: e,
						key: `${e}-${i}-${c}`
					}), o && _(c, e);
				} else if (t !== void 0 && s) {
					let n = r += 1;
					l.push({
						id: n,
						char: "",
						oldChar: t,
						animating: !0,
						index: e,
						key: `${e}-remove-${n}`
					}), _(n, e);
				}
			}
			i.value = l;
		}
		return i.value = v(n.text, n.appear), V(() => n.text, (e, t) => {
			e !== t && y(e, !0);
		}), (e, r) => (O(), o(I(B(n).as), {
			class: "mat-dynamic-text",
			"aria-label": d.value
		}, {
			default: U(() => [(O(!0), c(t, null, P(i.value, (e) => (O(), c("span", {
				key: e.key,
				class: "mat-dynamic-text__column",
				style: S({ "--mat-dynamic-text-index": e.index }),
				"data-char": e.char || e.oldChar || "",
				"aria-hidden": "true",
				onAnimationend: (t) => g(e.id)
			}, [l("span", _a, [e.char ? (O(), c("span", {
				key: 0,
				class: b(["mat-dynamic-text__char", e.animating ? "mat-dynamic-text__char--entering" : "mat-dynamic-text__char--idle"])
			}, z(e.char), 3)) : s("", !0), e.oldChar ? (O(), c("span", va, z(e.oldChar), 1)) : s("", !0)])], 44, ga))), 128))]),
			_: 1
		}, 8, ["aria-label"]));
	}
}), [["__scopeId", "data-v-314708d8"]]), Sa = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(e) {
		let n = e, r = g(Rr), i = ne();
		k(Rr, {
			...r,
			role: n.role
		});
		function a(e) {
			return e.flatMap((e) => _(e) && e.type === t && Array.isArray(e.children) ? a(e.children) : [e]);
		}
		function s() {
			return a(i.default?.() ?? []).find((e) => _(e) && (e.type?.name ?? e.type?.__name) === "MatBtn") ?? null;
		}
		return (e, t) => (O(), o(s));
	}
}), Ca = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return Pt.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
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
		let n = $("splitBtn", e), r = t, i = M(null), o = ne(), { colorStyle: s, hasExplicitColor: u } = dn(a(() => n.color));
		k(Rr, {
			color: a(() => n.color),
			controls: a(() => n.controls),
			disabled: a(() => n.disabled),
			expanded: a(() => n.expanded),
			size: a(() => n.size),
			variant: a(() => n.variant)
		});
		function d(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || r("leading-click", e);
		}
		function p(e) {
			!(e.target instanceof Element) || !e.target.closest(".mat-button-base") || (r("trailing-click", e), r("update:expanded", !n.expanded));
		}
		function m() {
			if (!i.value) return;
			(!o.leading || i.value.querySelectorAll(".mat-split-btn__leading .mat-button-base").length !== 1) && console.warn("MatSplitBtn: leading slot 必须提供一个 MatBtn");
			let e = i.value.querySelectorAll(".mat-split-btn__trailing .mat-btn--icon");
			(!o.trailing || e.length !== 1) && console.warn("MatSplitBtn: trailing slot 必须提供一个图标模式 MatBtn");
		}
		return E(m), V(() => [n.size, n.variant], async () => {
			await y(), m();
		}), (e, t) => (O(), c("div", v({
			ref_key: "root",
			ref: i
		}, e.$attrs, {
			class: ["mat-split-btn", [
				`mat-split-btn--${B(n).variant}`,
				`mat-split-btn--size-${B(n).size}`,
				{
					"mat-split-btn--block": B(n).block,
					"mat-split-btn--expanded": B(n).expanded,
					"mat-split-btn--explicit-color": B(u)
				}
			]],
			style: B(s),
			role: "group"
		}), [l("span", {
			class: "mat-split-btn__segment mat-split-btn__leading",
			onClick: d
		}, [f(Sa, { role: "leading" }, {
			default: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
			_: 3
		})]), l("span", {
			class: "mat-split-btn__segment mat-split-btn__trailing",
			onClick: p
		}, [f(Sa, { role: "trailing" }, {
			default: U(() => [F(e.$slots, "trailing", {}, void 0, !0)]),
			_: 3
		})])], 16));
	}
}), [["__scopeId", "data-v-30ec286f"]]), wa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatSurfaceBase",
	inheritAttrs: !1
}, {
	__name: "MatSurfaceBase",
	props: { as: {
		type: String,
		default: "div"
	} },
	setup(e, { expose: t }) {
		let n = M(null);
		return t({ root: n }), (t, r) => (O(), o(I(e.as), v({
			ref_key: "root",
			ref: n
		}, t.$attrs, { class: "mat-surface-base" }), {
			default: U(() => [F(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-73d1306b"]]), Ta = { class: "mat-card-headline mat-sys-typescale-title-large" }, Ea = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardHeadline" }, {
	__name: "MatCardHeadline",
	setup(e) {
		return (e, t) => (O(), c("div", Ta, [F(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-53a5927c"]]), Da = { class: "mat-card-media" }, Oa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardMedia" }, {
	__name: "MatCardMedia",
	setup(e) {
		return (e, t) => (O(), c("div", Da, [F(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-c38ab1c6"]]), ka = { class: "mat-card-subhead mat-sys-typescale-body-medium" }, Aa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardSubhead" }, {
	__name: "MatCardSubhead",
	setup(e) {
		return (e, t) => (O(), c("div", ka, [F(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-c437408b"]]), ja = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ht
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
		let t = $("card", e), { colorStyle: n, hasExplicitColor: r } = dn(a(() => t.color));
		return (e, i) => (O(), o(wa, v(e.$attrs, {
			class: ["mat-card", [`mat-card--${B(t).variant}`, { "mat-card--explicit-color": B(r) }]],
			style: B(n),
			as: B(t).as
		}), {
			default: U(() => [
				e.$slots.media ? (O(), o(Oa, { key: 0 }, {
					default: U(() => [F(e.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : s("", !0),
				e.$slots.headline ? (O(), o(Ea, { key: 1 }, {
					default: U(() => [F(e.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : s("", !0),
				e.$slots.subhead ? (O(), o(Aa, { key: 2 }, {
					default: U(() => [F(e.$slots, "subhead", {}, void 0, !0)]),
					_: 3
				})) : s("", !0),
				F(e.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"as"
		]));
	}
}), [["__scopeId", "data-v-cb7bd9d9"]]), Ma = { class: "mat-card-action-area__content" }, Na = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => It.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: t }) {
		let n = e, r = t, i = $("cardActionArea", n), a = g(At, kt);
		return (e, t) => (O(), o(Mt, v(e.$attrs, {
			class: "mat-card-action-area",
			disabled: B(i).disabled,
			"focus-ring": !1,
			href: B(i).href,
			type: B(i).type,
			"use-cursor": B(a).useCursor,
			onClick: t[0] ||= (e) => r("click", e)
		}), {
			default: U(() => [l("span", Ma, [F(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-c7ecd12e"]]), Pa = { class: "mat-card-content" }, Fa = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardContent" }, {
	__name: "MatCardContent",
	setup(e) {
		return (e, t) => (O(), c("div", Pa, [F(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-9ba80632"]]), Ia = { class: "mat-card-actions" }, La = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatCardActions" }, {
	__name: "MatCardActions",
	setup(e) {
		return (e, t) => (O(), c("div", Ia, [F(e.$slots, "default", {}, void 0, !0)]));
	}
}), [["__scopeId", "data-v-69850177"]]), Ra = /*@__PURE__*/ Object.assign({
	name: "MatExpandTransition",
	inheritAttrs: !1
}, {
	__name: "MatExpandTransition",
	setup(e) {
		return (e, t) => (O(), o(r, { name: "mat-expand-transition" }, {
			default: U(() => [F(e.$slots, "default")]),
			_: 3
		}));
	}
}), za = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], Ba = Symbol("mat-list"), Va = Symbol("mat-list-group-activator");
function Ha(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
//#region src/components/use-roving-focus.js
function Ua(e) {
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
	return w(c), {
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
function Wa(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function Ga(e) {
	return typeof e == "boolean" || Array.isArray(e) && e.every(Wa);
}
//#endregion
//#region src/components/scroll-area-context.js
var Ka = Symbol("mat-scroll-area");
//#endregion
//#region src/components/mat-virtual-scroll/use-virtual-scroll.js
function qa({ root: e, props: t, enabled: n = !0, pinEdges: r = !1, emit: i }) {
	let o = M(null), s = g(Ka, null), c = a(() => !!B(n)), l = a(() => !!B(r)), u = a(() => jn(t.itemHeight, {
		positive: !0,
		fallback: void 0
	})), d = a(() => u.value !== void 0), f = a(() => jn(t.estimatedItemHeight, {
		positive: !0,
		fallback: 48
	})), p = a(() => jn(t.buffer, { fallback: 3 })), m = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), b = M({
		start: 0,
		end: 0
	}), x = M(0), S = M(0), C = null, T = !0, O, k, A, j = !1;
	function N(e) {
		return d.value ? u.value : m.get(e) ?? f.value;
	}
	function P(e) {
		if (T || !C || C.length !== e + 1) {
			C = Array(e + 1), C[0] = 0;
			for (let t = 0; t < e; t += 1) C[t + 1] = C[t] + N(t);
			T = !1;
		}
		return C;
	}
	function F() {
		let t = e.value;
		if (!t) return null;
		let n = s?.getScroller?.(), r = t.parentElement;
		for (; r && r !== document.body && r !== document.documentElement;) {
			if (n && r === n || r.classList?.contains("mat-scroll-area__viewport")) return r;
			let e = getComputedStyle(r), t = e.overflowY || e.overflow;
			if ([
				"auto",
				"scroll",
				"overlay"
			].includes(t)) return r;
			r = r.parentElement;
		}
		return n && t.closest?.(".mat-scroll-area")?.contains(t) ? n : window;
	}
	function I() {
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
	function L() {
		if (!(j || !c.value)) {
			j = !0;
			try {
				let e = (t.items || []).length;
				if (e === 0) {
					b.value = {
						start: 0,
						end: 0
					}, x.value = 0, S.value = 0;
					return;
				}
				let { scrollTop: n, viewportHeight: r, scrollHeight: a, offsetInParent: o } = I(), s = Math.max(0, n - o), c = r || 300, f = p.value, m = 0, h = 0, g = 0, _ = 0;
				if (d.value) {
					let t = u.value;
					if (m = Math.max(0, Math.floor(s / t) - f), h = Math.min(e, Math.ceil((s + c) / t) + f), l.value && e >= 3) {
						let n = Math.max(1, Math.min(e - 2, m)), r = Math.max(n, Math.min(e - 1, h));
						g = Math.max(0, (n - 1) * t), _ = Math.max(0, (e - 1 - r) * t), m = n, h = r;
					} else l.value ? (m = 0, h = e, g = 0, _ = 0) : (g = m * t, _ = Math.max(0, (e - h) * t));
				} else {
					let t = P(e), n = t[e], r = s, i = s + c, a = 0, o = e, u = 0, d = e - 1;
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
				let v = b.value.start, y = b.value.end;
				b.value = {
					start: m,
					end: h
				}, x.value = g, S.value = _, (m !== v || h !== y) && i?.("visible-range-change", {
					startIndex: m,
					endIndex: h
				}), i?.("scroll", {
					scrollTop: n,
					scrollHeight: a,
					clientHeight: c,
					startIndex: m,
					endIndex: h
				});
			} finally {
				j = !1;
			}
		}
	}
	async function R() {
		await y(), L();
	}
	function z(e, n) {
		return typeof t.itemKey == "function" ? t.itemKey(e, n) : typeof t.itemKey == "string" && e && typeof e == "object" ? e[t.itemKey] ?? n : n;
	}
	function ee(e, t) {
		if (d.value || !O) return;
		let n = _.get(e);
		n && n !== t && (O.unobserve(n), h.delete(n), _.delete(e)), t && t instanceof HTMLElement && (h.set(t, e), _.set(e, t), O.observe(t));
	}
	function te(e) {
		let t = v.get(e);
		return t || (t = (t) => ee(e, t), v.set(e, t)), t;
	}
	function ne(e, n = {}) {
		let r = (t.items || []).length;
		if (e < 0 || e >= r) return;
		let i = o.value;
		if (!i) return;
		let { offsetInParent: a, viewportHeight: s, scrollTop: c } = I(), { align: l = "auto", behavior: f = "auto" } = n, p = 0, m = 0;
		d.value ? (m = u.value, p = e * m) : (p = P(r)[e], m = N(e));
		let h = p + a, g = c;
		l === "start" ? g = h : l === "end" ? g = h + m - s : l === "center" ? g = h + m / 2 - s / 2 : h < c ? g = h : h + m > c + s && (g = h + m - s), i === window ? window.scrollTo({
			top: Math.max(0, g),
			behavior: f
		}) : i.scrollTo({
			top: Math.max(0, g),
			behavior: f
		});
	}
	function H(e) {
		let t = o.value;
		t && t.scrollTo(e);
	}
	function U() {
		return o.value;
	}
	let W = a(() => {
		let e = t.items || [], { start: n, end: r } = b.value, i = [];
		for (let t = n; t < r && t < e.length; t += 1) i.push({
			index: t,
			item: e[t]
		});
		return i;
	});
	function G() {
		A &&= (A.removeEventListener("scroll", L), null), o.value === window && window.removeEventListener("resize", L), k?.disconnect(), k = null, O?.disconnect(), O = null, h.clear(), _.clear(), v.clear(), T = !0;
	}
	function K() {
		if (G(), !c.value) return;
		let e = F();
		o.value = e, e && (A = e, A.addEventListener("scroll", L, { passive: !0 }), typeof ResizeObserver == "function" && (e === window ? window.addEventListener("resize", L, { passive: !0 }) : (k = new ResizeObserver(() => {
			L();
		}), k.observe(e)), d.value || (O = new ResizeObserver((e) => {
			let t = !1;
			e.forEach((e) => {
				let n = h.get(e.target);
				if (n !== void 0) {
					let r = e.borderBoxSize?.[0]?.blockSize ?? e.contentRect?.height ?? e.target.getBoundingClientRect().height, i = m.get(n);
					r > 0 && (i === void 0 || Math.abs(i - r) > .5) && (m.set(n, r), T = !0, t = !0);
				}
			}), t && L();
		}))), L());
	}
	return V(() => t.items, () => {
		T = !0, v.clear(), L();
	}, { deep: !1 }), V([
		u,
		f,
		p,
		c
	], () => {
		T = !0, K();
	}), E(() => {
		K();
	}), D(() => {
		c.value && !o.value && K();
	}), w(() => {
		G();
	}), {
		calculate: L,
		getItemHeight: N,
		getItemKey: z,
		getItemRef: te,
		getScroller: U,
		paddingBottom: S,
		paddingTop: x,
		range: b,
		refresh: R,
		scrollTo: H,
		scrollToIndex: ne,
		setItemRef: ee,
		visibleItems: W
	};
}
//#endregion
//#region src/components/frame-scheduler.js
function Ja(e) {
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
var Ya = 500, Xa = 8, Za = 48, Qa = 24, $a = "color-mix(\n  in srgb,\n  var(--mat-list-drag-content-color) calc(var(--mat-sys-state-dragged-state-layer-opacity) * 100%),\n  var(--mat-list-drag-container-color)\n)", eo = "data-mat-list-drag-selection-lock", to = 0;
function no(e) {
	e.cancelable && e.preventDefault();
}
function ro() {
	to === 0 && (document.documentElement.setAttribute(eo, ""), document.addEventListener("selectstart", no, !0)), to += 1, globalThis.getSelection?.()?.removeAllRanges();
}
function io() {
	to !== 0 && (--to, to === 0 && (document.documentElement.removeAttribute(eo), document.removeEventListener("selectstart", no, !0)));
}
function ao(e) {
	return Object.is(e, -0) ? "number:-0" : `${typeof e}:${String(e)}`;
}
function oo(e) {
	let t = e.parentElement;
	for (; t && t !== document.body;) {
		let e = getComputedStyle(t);
		if (/(auto|scroll)/u.test(e.overflowY) && t.scrollHeight > t.clientHeight) return t;
		t = t.parentElement;
	}
	return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}
function so(e) {
	e.removeAttribute("id"), e.querySelectorAll("[id]").forEach((e) => {
		e.removeAttribute("id");
	}), e.querySelectorAll("[tabindex]").forEach((e) => {
		e.setAttribute("tabindex", "-1");
	});
}
function co(e, t) {
	let { style: n } = e;
	n.setProperty("--mat-list-drag-container-color", t.backgroundColor), n.setProperty("--mat-list-drag-content-color", t.color), n.background = $a;
}
function lo(e, t) {
	let n = e.cloneNode(!0), r = getComputedStyle(e), i = e.matches(".mat-list-item__surface") ? e : e.querySelector(".mat-list-item__surface") ?? e, a = n.matches(".mat-list-item__surface") ? n : n.querySelector(".mat-list-item__surface") ?? n;
	so(n), n.setAttribute("aria-hidden", "true"), n.setAttribute("data-mat-list-drag-preview", ""), n.setAttribute("inert", "");
	for (let e = 0; e < r.length; e += 1) {
		let t = r.item(e);
		t.startsWith("--mat-") && n.style.setProperty(t, r.getPropertyValue(t));
	}
	return co(a, getComputedStyle(i)), Object.assign(n.style, {
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
function uo(e) {
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
function fo(e) {
	let t = M(!1), n = /* @__PURE__ */ new Map(), r = !1, i = "", a, o, s, c, l, u = {};
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
		}).map((e) => ao(e.value.value)).sort().join("|");
		!n || n === i || (i = n, console.warn("MatList: draggable 模式下的直属 MatListItem 必须提供稳定且唯一的 value；无效项目将作为固定边界"));
	}
	function h() {
		r || (r = !0, y(m));
	}
	function g() {
		globalThis.clearTimeout(c), c = void 0, s = void 0;
	}
	function _(e) {
		g(), s = e, c = globalThis.setTimeout(g, 600);
	}
	function v() {
		window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", d), window.removeEventListener("pointercancel", d), window.removeEventListener("blur", d), document.removeEventListener("keydown", d);
	}
	function b() {
		a &&= (globalThis.clearTimeout(a.timer), void 0);
	}
	function x() {
		o && (o.source.style.display = o.sourceDisplay, o.placeholder.remove(), o.preview.remove(), io(), o = void 0, t.value = !1);
	}
	function S() {
		b(), l?.cancel(), x(), v();
	}
	function C(e) {
		return new Map(e.map((e) => [e, e.getBoundingClientRect()]));
	}
	function T(t, n) {
		if (!e.root.value || typeof Element.prototype.animate != "function") return;
		let r = uo(e.root.value);
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
		if (e < n.top + Za ? r = -Math.ceil(Qa * ((n.top + Za - e) / Za)) : e > n.bottom - Za && (r = Math.ceil(Qa * ((e - n.bottom + Za) / Za))), r === 0) return 0;
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
			let t = i.map((e) => e.element.value).filter((e) => e !== null), n = C(t), r = i[a]?.element.value ?? o.boundaryAfter;
			e.root.value.insertBefore(o.placeholder, r), o.insertionIndex = a, o.toIndex = o.segmentStartIndex + a, T(n, t);
		}
		E(t.clientY) !== 0 && l.schedule(t);
	}
	l = Ja(D);
	function O() {
		window.addEventListener("pointermove", d, { passive: !1 }), window.addEventListener("pointerup", d), window.addEventListener("pointercancel", d), window.addEventListener("blur", d), document.addEventListener("keydown", d);
	}
	function k() {
		if (!a || !e.root.value) return;
		let n = a, r = f(), i = p(r), s = r.findIndex((e) => e.record === n.record);
		if (s === -1 || !i.has(n.record)) {
			S();
			return;
		}
		let c = s, l = s;
		for (; c > 0 && i.has(r[c - 1].record);) --c;
		for (; l + 1 < r.length && i.has(r[l + 1].record);) l += 1;
		let u = r.slice(c, l + 1).map((e) => e.record).filter((e) => e !== void 0), d = r.map((e) => e.record).filter((e) => e !== void 0), m = n.record.element.value;
		if (!m) {
			S();
			return;
		}
		let h = m.getBoundingClientRect(), g = document.createElement(m.tagName.toLowerCase()), _ = lo(m, h), v = m.matches(".mat-list-item__surface") ? m : m.querySelector(".mat-list-item__surface") ?? m, y = getComputedStyle(v), b = m.style.display, x = u.indexOf(n.record);
		g.setAttribute("aria-hidden", "true"), g.setAttribute("data-mat-list-drag-placeholder", ""), g.style.blockSize = `${h.height}px`, g.style.inlineSize = `${h.width}px`, co(g, y), e.root.value.insertBefore(g, m), m.style.display = "none", o = {
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
			scrollContainer: oo(m),
			value: n.record.value.value
		}, a = void 0, ro(), t.value = !0;
		try {
			m.setPointerCapture?.(o.pointerId);
		} catch {}
	}
	function A(e) {
		if (a && e.pointerId === a.pointerId) {
			Math.hypot(e.clientX - a.clientX, e.clientY - a.clientY) > Xa && S();
			return;
		}
		!o || e.pointerId !== o.pointerId || (e.cancelable && e.preventDefault(), l.schedule(e));
	}
	function j(t) {
		if (a && t.pointerId === a.pointerId) {
			S();
			return;
		}
		if (!o || t.pointerId !== o.pointerId) return;
		l.schedule(t), l.flush();
		let n = o;
		if (v(), _(n.source), n.fromIndex !== n.toIndex) {
			e.emitReorder({
				value: n.value,
				fromIndex: n.fromIndex,
				toIndex: n.toIndex,
				originalEvent: t
			}), y(() => {
				o === n && x();
			});
			return;
		}
		x();
	}
	function N() {
		S();
	}
	function P() {
		S();
	}
	function F(e) {
		e.key === "Escape" && (a || o) && (e.preventDefault(), S());
	}
	function I(t) {
		if (!e.enabled.value || t.button !== 0 || t.isPrimary === !1 || !(t.target instanceof Element) || t.target.closest("[data-mat-list-trailing]")) return;
		let n = f(), r = p(n), i = n.find((e) => e.record && r.has(e.record) && e.element.contains(t.target));
		i?.record && (S(), a = {
			record: i.record,
			pointerId: t.pointerId,
			clientX: t.clientX,
			clientY: t.clientY,
			timer: globalThis.setTimeout(k, Ya)
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
		t && (a?.record === t || o?.record === t) && S(), n.delete(e), h();
	}
	return Object.assign(u, {
		pointermove: A,
		pointerup: j,
		pointercancel: N,
		blur: P,
		keydown: F
	}), V(e.enabled, (e) => {
		e || S(), h();
	}), w(() => {
		S(), g();
	}), {
		dragging: t,
		handleClickCapture: L,
		handlePointerDown: I,
		queueValidation: h,
		registerItem: R,
		unregisterItem: z
	};
}
var po = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return za.includes(e);
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
				return e.every(Wa);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
		},
		activeColor: {
			type: String,
			default: void 0,
			validator: Ht
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
			validator: (e) => Cn(e, { positive: !0 })
		},
		estimatedItemHeight: {
			type: [Number, String],
			default: 48,
			validator: (e) => Cn(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		buffer: {
			type: [Number, String],
			default: 3,
			validator: (e) => Cn(e, { allowUndefined: !1 })
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
			return Array.isArray(e) && e.every(Wa);
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
		let i = $("list", e), l = r, u = M(null), d = a(() => Ha(i.interaction)), f = a(() => d.value ? "div" : "ul"), { colorStyle: p } = dn(a(() => i.color)), { colorStyle: m } = dn(a(() => i.activeColor)), h = a(() => Object.fromEntries(Object.entries(m.value).map(([e, t]) => [e.replace("accent", "active"), t]))), g = a(() => ({
			...p.value,
			...h.value
		})), _ = [], b = [
			"[data-mat-list-primary]",
			"[data-mat-list-trailing] a[href]",
			"[data-mat-list-trailing] button",
			"[data-mat-list-trailing] input",
			"[data-mat-list-trailing] select",
			"[data-mat-list-trailing] textarea",
			"[data-mat-list-trailing] [contenteditable]:not([contenteditable=\"false\"])",
			"[data-mat-list-trailing] [tabindex]"
		].join(",");
		function x(e) {
			return i.interaction === "multi-select" ? Array.isArray(i.selected) && i.selected.some((t) => Object.is(t, e)) : i.interaction === "single-select" && Object.is(i.selected, e);
		}
		function C(e, t) {
			if (e === void 0) {
				console.warn("MatList: 选择模式下的 MatListItem 必须提供 value");
				return;
			}
			let n = x(e);
			if (i.interaction === "single-select") {
				if (n) return;
				l("select", {
					value: e,
					selected: !0,
					nextSelected: e,
					originalEvent: t
				});
				return;
			}
			if (i.interaction === "multi-select") {
				let r = Array.isArray(i.selected) ? i.selected : [];
				l("select", {
					value: e,
					selected: !n,
					nextSelected: n ? r.filter((t) => !Object.is(t, e)) : [...r, e],
					originalEvent: t
				});
			}
		}
		function w(e) {
			return i.expanded.some((t) => Object.is(t, e));
		}
		function T(e, t) {
			w(e) !== t && l("update:expanded", t ? [...i.expanded, e] : i.expanded.filter((t) => !Object.is(t, e)));
		}
		function D(e, t) {
			_.some((n) => n.token !== e && Object.is(n.value, t)) && console.warn(`MatListGroup: 同一 MatList 中的 value 必须唯一，重复值为 ${String(t)}`), _.push({
				token: e,
				value: t
			});
		}
		function A(e) {
			let t = _.findIndex((t) => t.token === e);
			t !== -1 && _.splice(t, 1);
		}
		function j(e) {
			return !(e instanceof HTMLElement) || e.closest("[data-mat-list-disabled=\"true\"]") || e.closest("[data-mat-list-group-content][inert]") || e.matches(":disabled") || e.getAttribute("aria-disabled") === "true" ? !1 : e.hasAttribute("data-mat-list-group-activator") ? !0 : !e.hasAttribute("data-mat-list-primary") && i.interaction !== "multi-action" && !d.value ? !1 : i.interaction !== "none";
		}
		function N(e) {
			if (d.value) {
				let t = e.find((e) => e.getAttribute("aria-selected") === "true");
				if (t) return t;
			}
			return e[0] ?? null;
		}
		let L = Ua({
			root: u,
			selector: b,
			isAvailable: j,
			findInitial: N,
			observedAttributes: [
				"aria-disabled",
				"aria-hidden",
				"disabled",
				"href",
				"inert"
			]
		}), { calculate: R, getItemKey: z, getScroller: ee, paddingBottom: te, paddingTop: ne, refresh: H, scrollTo: W, scrollToIndex: G, setItemRef: K, visibleItems: re } = qa({
			root: u,
			props: i,
			enabled: a(() => i.virtual),
			pinEdges: a(() => i.virtual),
			emit: l
		}), q = a(() => i.items ? i.items.length : 0), ie = a(() => q.value > 0 ? {
			item: i.items[0],
			index: 0
		} : null), J = a(() => {
			if (q.value > 1) {
				let e = q.value - 1;
				return {
					item: i.items[e],
					index: e
				};
			}
			return null;
		}), Y = fo({
			root: u,
			enabled: a(() => i.draggable),
			emitReorder(e) {
				l("reorder", e);
			}
		});
		function X(e) {
			let t = {
				ArrowDown: 1,
				ArrowRight: 1,
				ArrowUp: -1,
				ArrowLeft: -1
			}[e.key];
			t === void 0 || !(e.target instanceof HTMLElement) || (e.preventDefault(), L.move(e.target, t));
		}
		return k(Ba, {
			interaction: a(() => i.interaction),
			isSelectable: d,
			variant: a(() => i.variant),
			isGroupExpanded: w,
			isSelected: x,
			registerGroupValue: D,
			requestFocusRefresh: L.queueRefresh,
			requestGroupExpanded: T,
			requestSelection: C,
			registerDragItem: Y.registerItem,
			requestDragValidation: Y.queueValidation,
			unregisterGroupValue: A,
			unregisterDragItem: Y.unregisterItem
		}), E(L.observe), V(u, async () => {
			L.restore(), await y(), L.observe();
		}), V(() => i.interaction, async () => {
			L.restore(), await y(), L.observe();
		}), V(() => i.selected, async () => {
			u.value?.contains(document.activeElement) || L.resetActive(), await y(), L.queueRefresh();
		}, { deep: !0 }), n({
			calculate: R,
			getScroller: ee,
			refresh: H,
			scrollTo: W,
			scrollToIndex: G
		}), (e, n) => (O(), o(I(f.value), v({
			ref_key: "root",
			ref: u
		}, e.$attrs, {
			class: ["mat-list", [`mat-list--${B(i).variant}`, {
				"mat-list--virtual": B(i).virtual,
				"mat-list--draggable": B(i).draggable,
				"mat-list--dragging": B(Y).dragging.value
			}]],
			style: g.value,
			"aria-multiselectable": B(i).interaction === "multi-select" ? "true" : e.$attrs["aria-multiselectable"],
			"aria-orientation": d.value ? "vertical" : e.$attrs["aria-orientation"],
			role: d.value ? "listbox" : e.$attrs.role,
			onClickCapture: B(Y).handleClickCapture,
			onFocusin: B(L).handleFocusIn,
			onKeydown: X,
			onPointerdown: B(Y).handlePointerDown
		}), {
			default: U(() => [B(i).virtual ? q.value > 0 ? (O(), c(t, { key: 1 }, [
				ie.value ? F(e.$slots, "default", {
					key: 0,
					item: ie.value.item,
					index: ie.value.index,
					itemRef: (e) => B(K)(ie.value.index, e),
					isFirst: !0,
					isLast: q.value === 1
				}, void 0, !0) : s("", !0),
				q.value >= 3 && B(ne) > 0 ? (O(), c("div", {
					key: 1,
					class: "mat-list__spacer",
					style: S({ height: `${B(ne)}px` }),
					"aria-hidden": "true"
				}, null, 4)) : s("", !0),
				(O(!0), c(t, null, P(q.value >= 3 ? B(re) : [], (t) => F(e.$slots, "default", {
					key: B(z)(t.item, t.index),
					item: t.item,
					index: t.index,
					itemRef: (e) => B(K)(t.index, e),
					isFirst: !1,
					isLast: !1
				}, void 0, !0)), 128)),
				q.value >= 3 && B(te) > 0 ? (O(), c("div", {
					key: 2,
					class: "mat-list__spacer",
					style: S({ height: `${B(te)}px` }),
					"aria-hidden": "true"
				}, null, 4)) : s("", !0),
				J.value ? F(e.$slots, "default", {
					key: 3,
					item: J.value.item,
					index: J.value.index,
					itemRef: (e) => B(K)(J.value.index, e),
					isFirst: !1,
					isLast: !0
				}, void 0, !0) : s("", !0)
			], 64)) : s("", !0) : F(e.$slots, "default", { key: 0 }, void 0, !0)]),
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
}), [["__scopeId", "data-v-31945145"]]), mo = Symbol("mat-expansion"), ho = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e == null ? !0 : Array.isArray(e) ? e.every(Wa) : Wa(e);
			}
		},
		multiple: {
			type: Boolean,
			default: !0
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
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
		return e == null ? !0 : Array.isArray(e) ? e.every(Wa) : Wa(e);
	} },
	setup(e, { emit: t }) {
		let n = $("expansion", e), r = t, i = M(n.multiple ? [] : null), { colorStyle: s, hasExplicitColor: c } = dn(a(() => n.color)), l = a(() => n.modelValue !== void 0), u = a(() => l.value ? n.modelValue : i.value), d = a(() => {
			let e = u.value;
			return n.multiple ? Array.isArray(e) ? e : [] : e == null ? [] : [e];
		});
		function p(e) {
			if (n.multiple) {
				l.value || (i.value = e), r("update:modelValue", e);
				return;
			}
			let t = d.value, a = e.filter((e) => !t.some((t) => Object.is(t, e))), o = a.length > 0 ? a[a.length - 1] : null;
			l.value || (i.value = o), r("update:modelValue", o);
		}
		function m(e) {
			return d.value.some((t) => Object.is(t, e));
		}
		return k(mo, {
			isExpanded: m,
			color: a(() => n.color),
			disabled: a(() => n.disabled),
			variant: a(() => n.variant),
			multiple: a(() => n.multiple)
		}), (e, t) => (O(), o(I(B(n).as), v(e.$attrs, {
			class: ["mat-expansion", { "mat-expansion--explicit-color": B(c) }],
			style: B(s)
		}), {
			default: U(() => [f(po, {
				variant: B(n).variant,
				color: B(n).color,
				expanded: d.value,
				"onUpdate:expanded": p
			}, {
				default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, [
				"variant",
				"color",
				"expanded"
			])]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-f96e5c0a"]]), go = ["data-line-count"], _o = ["inert"], vo = ["inert"], yo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
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
		return (t, n) => (O(), c("span", {
			"data-mat-item-content": "",
			"data-line-count": e.lineCount,
			class: b([
				e.namespace,
				`${e.namespace}--lines-${e.lineCount}`,
				{ [`${e.namespace}--separate-trailing`]: e.separateTrailing }
			])
		}, [
			t.$slots.leading ? (O(), c("span", {
				key: 0,
				"data-mat-item-content-leading": "",
				class: b(`${e.namespace}__leading`),
				inert: e.presentationSlots ? "" : void 0
			}, [F(t.$slots, "leading", {}, void 0, !0)], 10, _o)) : s("", !0),
			l("span", {
				"data-mat-item-content-text": "",
				class: b(`${e.namespace}__text`)
			}, [
				t.$slots.overline ? (O(), c("span", {
					key: 0,
					"data-mat-item-content-overline": "",
					class: b([`${e.namespace}__overline`, e.trailingTypographyClass])
				}, [F(t.$slots, "overline", {}, void 0, !0)], 2)) : s("", !0),
				l("span", {
					"data-mat-item-content-label": "",
					class: b([`${e.namespace}__label`, e.labelTypographyClass])
				}, [F(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.supporting ? (O(), c("span", {
					key: 1,
					"data-mat-item-content-supporting": "",
					class: b([`${e.namespace}__supporting`, e.supportingTypographyClass])
				}, [F(t.$slots, "supporting", {}, void 0, !0)], 2)) : s("", !0)
			], 2),
			t.$slots.trailing && !e.separateTrailing ? (O(), c("span", {
				key: 1,
				"data-mat-item-content-trailing": "",
				class: b([`${e.namespace}__trailing`, e.trailingTypographyClass]),
				inert: e.presentationSlots ? "" : void 0
			}, [F(t.$slots, "trailing", {}, void 0, !0)], 10, vo)) : s("", !0)
		], 10, go));
	}
}), [["__scopeId", "data-v-3223d16a"]]), bo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
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
		let t = e, n = M(null), r = a(() => n.value instanceof HTMLElement ? n.value : n.value?.$el instanceof HTMLElement ? n.value.$el : null), i = M(!1), s = a(() => t.lineCount === 3 || i.value), c;
		function l() {
			if (!r.value) return;
			let e = Array.from(r.value.children).reduce((e, t) => Math.max(e, t.getBoundingClientRect().height, t.scrollHeight), 0);
			i.value = e > 56;
		}
		function d() {
			c?.disconnect(), c = void 0, l(), !(!r.value || typeof ResizeObserver > "u") && (c = new ResizeObserver(l), Array.from(r.value.children).forEach((e) => {
				c.observe(e);
			}));
		}
		return E(async () => {
			await y(), d();
		}), D(d), w(() => {
			c?.disconnect();
		}), (t, r) => (O(), o(yo, {
			ref_key: "contentRoot",
			ref: n,
			namespace: "mat-list-item-content",
			"label-typography-class": "mat-sys-typescale-body-large",
			"line-count": e.lineCount,
			class: b({ "mat-list-item-content--large-content": s.value }),
			"presentation-slots": e.presentationSlots,
			"separate-trailing": e.separateTrailing,
			"supporting-typography-class": "mat-sys-typescale-body-medium",
			"trailing-typography-class": "mat-sys-typescale-label-small"
		}, u({
			default: U(() => [F(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			t.$slots.leading ? {
				name: "leading",
				fn: U(() => [F(t.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			t.$slots.overline ? {
				name: "overline",
				fn: U(() => [F(t.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			t.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [F(t.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			t.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [F(t.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, [
			"line-count",
			"class",
			"presentation-slots",
			"separate-trailing"
		]));
	}
}), [["__scopeId", "data-v-c5a4a0b9"]]), xo = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], So = ["aria-disabled", "data-mat-list-disabled"], Co = ["aria-disabled", "data-mat-list-disabled"], wo = ["inert"], To = ["inert"], Eo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return It.includes(e);
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
		let n = $("listItem", e), r = t, i = ne(), l = g(Ba, null), d = g(Va, null), p = g(At, kt), m = a(() => l?.interaction.value ?? "none"), h = a(() => m.value === "single-action" || m.value === "multi-action"), _ = a(() => m.value === "multi-action"), x = a(() => l?.isSelectable.value ?? !1), S = a(() => l?.isSelected(n.value) ?? !1), C = a(() => !!i.trailing), T = a(() => C.value && (_.value || x.value && n.separateTrailing)), D = M(null), k = Symbol("mat-list-item-drag"), A = a(() => D.value instanceof HTMLElement ? D.value : D.value?.$el instanceof HTMLElement ? D.value.$el : null), j = a(() => n.value), N = a(() => n.disabled || !!d), P = a(() => {
			if (n.lines !== void 0) return n.lines;
			let e = Number(!!i.overline) + Number(!!i.supporting);
			return Math.min(3, 1 + e);
		}), I = a(() => ({
			"mat-list-item--disabled": n.disabled,
			"mat-list-item--selected": S.value,
			[`mat-list-item--lines-${P.value}`]: !0
		})), L = a(() => _.value ? { color: "var(--mat-action-state-color, currentcolor)" } : { color: "transparent" });
		function R(e, t) {
			if (!(e instanceof HTMLElement) || !(t instanceof HTMLElement) || e === t) return !1;
			let n = e.closest("a[href], button, input, select, textarea, [contenteditable]:not([contenteditable=\"false\"]), [role=\"button\"], [role=\"checkbox\"], [role=\"radio\"], [role=\"switch\"], [tabindex]:not([tabindex=\"-1\"])");
			return !!(n && t.contains(n));
		}
		function z(e) {
			if (C.value && e.target instanceof HTMLElement) {
				let t = e.target.closest("[data-mat-list-trailing]");
				if (t && R(e.target, t)) return;
			}
			if (x.value) {
				l?.requestSelection(n.value, e);
				return;
			}
			h.value && r("click", e);
		}
		function ee() {
			n.disabled || d?.toggle();
		}
		function te(e) {
			if (!(n.disabled || e.repeat || ![" ", "Enter"].includes(e.key))) {
				if (C.value && e.target instanceof HTMLElement) {
					let t = e.target.closest("[data-mat-list-trailing]");
					if (t && R(e.target, t)) return;
				}
				e.preventDefault(), l?.requestSelection(n.value, e);
			}
		}
		function H(e) {
			e.target instanceof HTMLElement && e.currentTarget instanceof HTMLElement && R(e.target, e.currentTarget) && e.stopPropagation();
		}
		function G() {
			n.href !== void 0 && !d && !h.value && console.warn("MatListItem: href 仅在 single-action 或 multi-action 模式下生效");
		}
		return E(async () => {
			G(), l?.registerDragItem?.({
				token: k,
				element: A,
				value: j,
				disabled: N
			}), await y(), l?.requestFocusRefresh();
		}), w(() => {
			l?.unregisterDragItem?.(k);
		}), V(() => [
			n.disabled,
			n.href,
			n.value,
			m.value,
			n.separateTrailing
		], async () => {
			G(), l?.requestDragValidation?.(), await y(), l?.requestFocusRefresh();
		}), (e, t) => B(d)?.static.value ? (O(), c("div", v({
			key: 0,
			ref_key: "itemRoot",
			ref: D
		}, e.$attrs, {
			id: B(d).labelId,
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", I.value],
			"data-mat-list-group-label": "",
			"aria-disabled": B(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": B(n).disabled ? "true" : void 0
		}), [f(bo, {
			"line-count": P.value,
			"presentation-slots": !1
		}, u({
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			e.$slots.leading ? {
				name: "leading",
				fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			e.$slots.overline ? {
				name: "overline",
				fn: U(() => [F(e.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			e.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [F(e.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			e.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [F(e.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, xo)) : B(d) ? (O(), o(Mt, v({
			key: 1,
			ref_key: "itemRoot",
			ref: D
		}, e.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator", I.value],
			"data-mat-list-primary": "",
			"data-mat-list-group-activator": "",
			"aria-controls": B(d).contentId,
			"aria-expanded": B(d).expanded.value ? "true" : "false",
			"data-mat-list-disabled": B(n).disabled ? "true" : void 0,
			disabled: B(n).disabled,
			"focus-ring": !0,
			type: "button",
			"use-cursor": B(p).useCursor,
			onClick: ee
		}), {
			default: U(() => [f(bo, {
				"line-count": P.value,
				"presentation-slots": !1
			}, u({
				default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: U(() => [F(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [F(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: U(() => [F(e.$slots, "trailing", {}, void 0, !0)]),
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
		])) : m.value === "none" ? W((O(), c("li", v({
			key: 2,
			ref_key: "itemRoot",
			ref: D
		}, e.$attrs, {
			class: ["mat-list-item mat-list-item__surface", I.value],
			"aria-disabled": B(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": B(n).disabled ? "true" : void 0
		}), [f(bo, {
			"line-count": P.value,
			"presentation-slots": !1
		}, u({
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			e.$slots.leading ? {
				name: "leading",
				fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			e.$slots.overline ? {
				name: "overline",
				fn: U(() => [F(e.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			e.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [F(e.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			e.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [F(e.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, So)), [[B(Dt), { color: "var(--mat-action-state-color, currentcolor)" }]]) : h.value ? W((O(), c("li", {
			key: 3,
			ref_key: "itemRoot",
			ref: D,
			class: b(["mat-list-item", [I.value, {
				"mat-list-item__surface": _.value,
				"mat-list-item--multi-action": _.value
			}]]),
			"aria-disabled": B(n).disabled ? "true" : void 0,
			"data-mat-list-disabled": B(n).disabled ? "true" : void 0
		}, [f(Mt, v(e.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !_.value }],
			"data-mat-list-primary": "",
			disabled: B(n).disabled,
			"focus-ring": !0,
			href: B(n).href,
			type: B(n).type,
			"use-cursor": B(p).useCursor,
			onClick: z
		}), {
			default: U(() => [f(bo, {
				"line-count": P.value,
				"presentation-slots": !1,
				"separate-trailing": _.value && C.value
			}, u({
				default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: U(() => [F(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [F(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing ? {
					name: "trailing",
					fn: U(() => [F(e.$slots, "trailing", {}, void 0, !0)]),
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
		]), _.value && C.value ? (O(), c("span", {
			key: 0,
			class: "mat-list-item__separate-trailing mat-sys-typescale-label-small",
			"data-mat-list-trailing": "",
			inert: B(n).disabled ? "" : void 0,
			onPointerdown: H
		}, [F(e.$slots, "trailing", {}, void 0, !0)], 40, wo)) : s("", !0)], 10, Co)), [[B(Dt), L.value]]) : (O(), o(Mt, v({
			key: 4,
			ref_key: "itemRoot",
			ref: D
		}, e.$attrs, {
			as: "div",
			class: ["mat-list-item mat-list-item__surface mat-list-item--selectable", [I.value, { "mat-list-item--separate-trailing": T.value }]],
			"data-mat-list-primary": "",
			"data-mat-list-disabled": B(n).disabled ? "true" : void 0,
			"aria-selected": S.value ? "true" : "false",
			disabled: B(n).disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": B(p).useCursor,
			onClick: z,
			onKeydown: te
		}), {
			default: U(() => [f(bo, {
				"line-count": P.value,
				"presentation-slots": "",
				"separate-trailing": T.value
			}, u({
				default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				e.$slots.leading ? {
					name: "leading",
					fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				e.$slots.overline ? {
					name: "overline",
					fn: U(() => [F(e.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [F(e.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				e.$slots.trailing && !T.value ? {
					name: "trailing",
					fn: U(() => [F(e.$slots, "trailing", {}, void 0, !0)]),
					key: "3"
				} : void 0
			]), 1032, ["line-count", "separate-trailing"]), T.value ? (O(), c("span", {
				key: 0,
				class: "mat-list-item__separate-trailing mat-sys-typescale-label-small",
				"data-mat-list-trailing": "",
				inert: B(n).disabled ? "" : void 0,
				onPointerdown: H
			}, [F(e.$slots, "trailing", {}, void 0, !0)], 40, To)) : s("", !0)]),
			_: 3
		}, 16, [
			"class",
			"data-mat-list-disabled",
			"aria-selected",
			"disabled",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-1247285a"]]), Do = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(e) {
		return k(Va, e.context), (e, t) => F(e.$slots, "default");
	}
}), Oo = [
	"role",
	"aria-hidden",
	"inert"
], ko = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let r = $("listGroup", n), i = g(Ba, null), s = ne(), c = M(null), u = M(!1), d = M(null), p = Symbol("mat-list-group"), m = te().replace(/[^\w-]/g, "-"), h = `mat-list-group-${m}-content`, b = `mat-list-group-${m}-label`, x = !1, S, C = a(() => r.value !== void 0), T = a(() => i?.isSelectable.value ?? !1), k = a(() => C.value ? i?.isGroupExpanded(r.value) ?? !1 : u.value);
		function A(n) {
			return n.flatMap((n) => _(n) ? n.type === e ? [] : n.type === t && Array.isArray(n.children) ? A(n.children) : [n] : typeof n == "string" && n.trim().length > 0 ? [n] : []);
		}
		let j = a(() => {
			let e = A(s.activator?.({ expanded: k.value }) ?? []);
			if (e.length !== 1 || !_(e[0])) return !1;
			let t = e[0].type;
			return t === Eo || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), N = a(() => d.value ?? j.value), P = a(() => T.value || !N.value || k.value), L = a(() => i?.variant.value ?? "segmented");
		function R() {
			(c.value?.querySelector(":scope > [data-mat-list-group-content]"))?.contains(document.activeElement) && c.value?.querySelector(":scope > [data-mat-list-group-activator]")?.focus();
		}
		function z() {
			if (!(T.value || !N.value)) {
				if (k.value && R(), C.value) {
					i?.requestGroupExpanded(r.value, !k.value);
					return;
				}
				u.value = !u.value;
			}
		}
		let ee = {
			contentId: h,
			expanded: P,
			labelId: b,
			static: T,
			toggle: z
		};
		function H() {
			!N.value && !x ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), x = !0) : N.value && (x = !1);
		}
		function W() {
			if (!c.value) return;
			let e = T.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(c.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			d.value !== t && (d.value = t);
		}
		function G() {
			W(), H();
		}
		function K(e) {
			e !== void 0 && (i?.registerGroupValue(p, e), S = e);
		}
		function re() {
			S !== void 0 && (i?.unregisterGroupValue(p), S = void 0);
		}
		return E(() => {
			i || console.warn("MatListGroup: 必须直接放置在 MatList 中"), T.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), K(r.value), G(), i?.requestFocusRefresh();
		}), D(G), w(() => {
			re(), i?.requestFocusRefresh();
		}), V(() => r.value, (e, t) => {
			Object.is(e, t) || (re(), K(e));
		}), V(k, async (e, t) => {
			t && !e && R(), await y(), i?.requestFocusRefresh();
		}), V(T, async (e, t) => {
			e && !t && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), await y(), i?.requestFocusRefresh();
		}), (e, t) => (O(), o(I(B(r).as || (T.value ? "div" : "li")), v({
			ref_key: "root",
			ref: c
		}, e.$attrs, {
			class: ["mat-list-group", [`mat-list-group--${L.value}`, {
				"mat-list-group--expanded": P.value,
				"mat-list-group--selectable-fallback": T.value
			}]],
			role: T.value ? "group" : void 0,
			"aria-labelledby": T.value ? b : void 0
		}), {
			default: U(() => [f(Do, { context: ee }, {
				default: U(() => [F(e.$slots, "activator", { expanded: P.value }, void 0, !0)]),
				_: 3
			}), l("div", {
				id: h,
				class: "mat-list-group__content",
				"data-mat-list-group-content": "",
				role: T.value ? "presentation" : void 0,
				"aria-hidden": P.value ? void 0 : "true",
				inert: P.value ? void 0 : ""
			}, [(O(), o(I(T.value ? "div" : "ul"), {
				class: "mat-list-group__items",
				role: T.value ? "presentation" : void 0
			}, {
				default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, ["role"]))], 8, Oo)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-0cfce62b"]]), Ao = {
	key: 0,
	class: "mat-expansion-panel__body"
}, jo = {
	key: 0,
	class: "mat-expansion-panel__body"
}, Mo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ht
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
		let n = $("expansionPanel", e), r = t, i = p(), s = g(mo, null), l = "expansion-panel-" + te().replace(/[^\w-]/g, "-"), u = a(() => n.value === void 0 ? l : n.value), m = a(() => n.disabled || !!s?.disabled.value), h = a(() => n.color || s?.color.value), _ = a(() => s?.variant.value ?? "segmented"), { colorStyle: y, hasExplicitColor: x } = dn(a(() => n.color || s?.color.value)), S = a(() => {
			let e = i?.vnode?.props ?? {};
			return "modelValue" in e || "model-value" in e;
		}), C = M(!!n.modelValue);
		V(() => n.modelValue, (e) => {
			e !== void 0 && (C.value = !!e);
		});
		let w = a(() => s ? s.isExpanded(u.value) : S.value ? !!n.modelValue : C.value), T = a(() => w.value ? [u.value] : []);
		function E(e) {
			let t = e.includes(u.value);
			S.value || (C.value = t), r("update:modelValue", t);
		}
		return (e, t) => B(s) ? (O(), o(ko, v({ key: 0 }, e.$attrs, {
			value: u.value,
			as: B(n).as,
			class: ["mat-expansion-panel", [B(n).split ? "mat-expansion-panel--split" : "mat-expansion-panel--unsplit", {
				"mat-expansion-panel--expanded": w.value,
				"mat-expansion-panel--explicit-color": B(x)
			}]],
			style: B(y)
		}), {
			activator: U(({ expanded: t }) => [F(e.$slots, "activator", { expanded: t }, () => [f(Eo, { disabled: m.value }, {
				trailing: U(() => [f(hn, {
					icon: "expand_more",
					class: b(["mat-expansion-panel__indicator", { "mat-expansion-panel__indicator--expanded": t }])
				}, null, 8, ["class"])]),
				default: U(() => [d(z(B(n).title) + " ", 1)]),
				_: 2
			}, 1032, ["disabled"])], !0)]),
			default: U(() => [B(n).split ? F(e.$slots, "default", { key: 1 }, void 0, !0) : (O(), c("div", Ao, [F(e.$slots, "default", {}, void 0, !0)]))]),
			_: 3
		}, 16, [
			"value",
			"as",
			"class",
			"style"
		])) : (O(), o(po, {
			key: 1,
			variant: _.value,
			color: h.value,
			expanded: T.value,
			"onUpdate:expanded": E
		}, {
			default: U(() => [f(ko, v(e.$attrs, {
				value: u.value,
				class: ["mat-expansion-panel", [B(n).split ? "mat-expansion-panel--split" : "mat-expansion-panel--unsplit", {
					"mat-expansion-panel--expanded": w.value,
					"mat-expansion-panel--explicit-color": B(x)
				}]],
				style: B(y)
			}), {
				activator: U(({ expanded: t }) => [F(e.$slots, "activator", { expanded: t }, () => [f(Eo, { disabled: m.value }, {
					trailing: U(() => [f(hn, {
						icon: "expand_more",
						class: b(["mat-expansion-panel__indicator", { "mat-expansion-panel__indicator--expanded": t }])
					}, null, 8, ["class"])]),
					default: U(() => [d(z(B(n).title) + " ", 1)]),
					_: 2
				}, 1032, ["disabled"])], !0)]),
				default: U(() => [B(n).split ? F(e.$slots, "default", { key: 1 }, void 0, !0) : (O(), c("div", jo, [F(e.$slots, "default", {}, void 0, !0)]))]),
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
}), [["__scopeId", "data-v-75c0236c"]]), No = Symbol("mat-menu"), Po = Symbol("mat-menu-item"), Fo = Symbol("mat-menu-group");
function Io(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function Lo(e, t, n, r = "right") {
	let i = r === "left" ? n.right : n.left, a = {
		x: i,
		y: n.top
	}, o = {
		x: i,
		y: n.bottom
	}, s = Io(t, a, o), c = Io(e, a, o), l = Io(t, e, o), u = Io(t, a, e);
	return Math.abs(s - (c + l + u)) < .5;
}
function Ro(e, t = []) {
	let n = typeof Node < "u" ? Node.DOCUMENT_POSITION_FOLLOWING : 4, r = e.slice().sort((e, r) => {
		let i = e.element?.value, a = r.element?.value;
		if (!i || !a || i === a) return 0;
		if (t.length > 0) {
			let e = t.indexOf(i), n = t.indexOf(a);
			if (e !== -1 && n !== -1) return e - n;
		}
		return typeof i.compareDocumentPosition == "function" ? i.compareDocumentPosition(a) & n ? -1 : 1 : 0;
	});
	r.forEach((e, t) => {
		r.length === 1 ? e.setPosition("only") : t === 0 ? e.setPosition("first") : t === r.length - 1 ? e.setPosition("last") : e.setPosition("middle");
	});
}
var zo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let t = $("divider", e), n = g(Ba, null), r = g(No, null), i = a(() => !!n), s = a(() => !!r), c = a(() => n?.isSelectable.value ?? !1), l = a(() => t.inset === !0 ? "middle" : t.inset === !1 ? "none" : t.inset), u = a(() => i.value ? c.value ? "div" : "li" : s.value ? "div" : "hr");
		return (e, n) => (O(), o(I(u.value), v(e.$attrs, {
			class: ["mat-divider", [`mat-divider--${l.value}`, {
				"mat-divider--menu": s.value,
				"mat-divider--vertical": B(t).vertical
			}]],
			"aria-hidden": c.value ? "true" : e.$attrs["aria-hidden"],
			"aria-orientation": c.value ? void 0 : B(t).vertical ? "vertical" : void 0,
			role: c.value ? "presentation" : i.value || s.value || B(t).vertical ? "separator" : e.$attrs.role
		}), null, 16, [
			"class",
			"aria-hidden",
			"aria-orientation",
			"role"
		]));
	}
}), [["__scopeId", "data-v-88c82c06"]]), Bo = { class: "mat-selection-control__target" }, Vo = [
	"aria-checked",
	"checked",
	"disabled",
	"indeterminate",
	"role",
	"tabindex",
	"type",
	"value"
], Ho = {
	class: "mat-selection-control__indicator",
	"aria-hidden": "true"
}, Uo = {
	key: 0,
	class: "mat-selection-control__label"
}, Wo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ht
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
		let r = e, i = n, o = ee(), u = ne(), d = M(null), f = g(At, kt), { colorStyle: p } = dn(a(() => r.color)), m = a(() => {
			let e = {};
			return [
				"class",
				"inert",
				"aria-hidden"
			].forEach((t) => {
				o[t] !== void 0 && (e[t] = o[t]);
			}), e;
		}), h = a(() => Object.fromEntries(Object.entries(o).filter(([e]) => ![
			"class",
			"style",
			"inert",
			"aria-hidden"
		].includes(e)))), _ = a(() => [p.value, o.style]), y = a(() => o.inert !== void 0 || o["aria-hidden"] === !0 || o["aria-hidden"] === "true");
		E(() => {
			!u.default && !h.value["aria-label"] && !y.value && console.warn(`${r.labelName}: 缺少默认标签内容时必须提供 aria-label`);
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
		}), (t, n) => (O(), c("label", v(m.value, {
			class: ["mat-selection-control mat-sys-typescale-body-large", {
				"mat-selection-control--checked": e.checked,
				"mat-selection-control--disabled": e.disabled,
				"mat-selection-control--use-cursor": B(f).useCursor
			}],
			style: _.value
		}), [l("span", Bo, [
			l("input", v({
				ref_key: "input",
				ref: d
			}, h.value, {
				class: "mat-selection-control__input",
				"aria-checked": e.indeterminate ? "mixed" : e.checked,
				checked: e.checked,
				disabled: e.disabled,
				indeterminate: e.indeterminate,
				role: e.inputRole,
				tabindex: e.tabindex,
				type: e.inputType,
				value: e.inputValue,
				onChange: n[0] ||= (e) => i("change", e),
				onKeydown: n[1] ||= (e) => i("keydown", e)
			}), null, 16, Vo),
			n[2] ||= l("span", {
				class: "mat-selection-control__state-layer",
				"aria-hidden": "true"
			}, null, -1),
			n[3] ||= l("span", {
				class: "mat-selection-control__focus-ring",
				"aria-hidden": "true"
			}, null, -1),
			l("span", Ho, [F(t.$slots, "indicator", {}, void 0, !0)])
		]), B(u).default ? (O(), c("span", Uo, [F(t.$slots, "default", {}, void 0, !0)])) : s("", !0)], 16));
	}
}), [["__scopeId", "data-v-5041102c"]]), Go = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatCheckbox",
	inheritAttrs: !1
}, {
	__name: "MatCheckbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1,
			validator: Ga
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: !0,
			validator: Wa
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
			validator: Ht
		}
	},
	emits: {
		"update:modelValue": Ga,
		"update:indeterminate"(e) {
			return typeof e == "boolean";
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("checkbox", e), r = t, i = a(() => Array.isArray(n.modelValue) ? n.modelValue.some((e) => Object.is(e, n.value)) : n.modelValue);
		function s(e) {
			let t = e.target.checked;
			if (Array.isArray(n.modelValue)) {
				let e = t ? [...n.modelValue, n.value] : n.modelValue.filter((e) => !Object.is(e, n.value));
				r("update:modelValue", e);
			} else r("update:modelValue", t);
			r("update:indeterminate", !1), r("change", e);
		}
		return (e, t) => (O(), o(Wo, v(e.$attrs, {
			class: ["mat-checkbox", {
				"mat-checkbox--checked": i.value,
				"mat-checkbox--indeterminate": B(n).indeterminate
			}],
			checked: i.value,
			color: B(n).color,
			disabled: B(n).disabled,
			indeterminate: B(n).indeterminate,
			"input-type": "checkbox",
			"input-value": B(n).value,
			"label-name": "MatCheckbox",
			onChange: s
		}), {
			indicator: U(() => [...t[0] ||= [l("span", { class: "mat-checkbox__box" }, [l("span", { class: "mat-checkbox__check" }), l("span", { class: "mat-checkbox__mixed" })], -1)]]),
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-ed555593"]]), Ko = [
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
function qo(e) {
	return !e || typeof e != "object" || Array.isArray(e) || Object.keys(e).some((e) => !["inline", "block"].includes(e)) ? !1 : ["inline", "block"].every((t) => Cn(e[t], {
		property: "margin",
		allowNegative: !0
	}));
}
//#endregion
//#region src/components/mat-badge/MatBadge.vue
var Jo = ["data-dot", "data-border"], Yo = ["data-dot", "data-border"], Xo = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Ko.includes(e)
		},
		offset: {
			type: Object,
			default: () => ({
				inline: 0,
				block: 0
			}),
			validator: qo
		},
		color: {
			type: String,
			default: "error",
			validator: Ht
		},
		border: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = $("badge", e), n = ee(), { colorStyle: r } = dn(a(() => t.color)), i = a(() => t.location === "inline"), o = a(() => t.content !== void 0 && String(t.content).length > 0), l = a(() => t.dot || o.value), u = a(() => t.dot ? void 0 : t.content);
		function d(e) {
			let t = Tn(e ?? 0, {
				property: "margin",
				allowNegative: !0,
				fallback: "0px"
			});
			return t === "0" ? "0px" : t;
		}
		let f = a(() => ({
			...r.value,
			"--mat-badge-offset-inline": i.value ? void 0 : d(t.offset?.inline),
			"--mat-badge-offset-block": i.value ? void 0 : d(t.offset?.block)
		}));
		return (e, r) => i.value && l.value ? (O(), c("span", v({ key: 0 }, B(n), {
			class: ["mat-badge__indicator mat-badge__indicator--inline", {
				"mat-badge__indicator--dot": B(t).dot,
				"mat-badge__indicator--border": B(t).border
			}],
			style: f.value,
			"aria-hidden": "true",
			"data-dot": B(t).dot ? "" : void 0,
			"data-border": B(t).border ? "" : void 0
		}), z(u.value), 17, Jo)) : i.value ? s("", !0) : (O(), c("span", v({ key: 1 }, B(n), { class: "mat-badge" }), [F(e.$slots, "default", {}, void 0, !0), l.value ? (O(), c("span", {
			key: 0,
			class: b(["mat-badge__indicator", [`mat-badge__indicator--${B(t).location}`, {
				"mat-badge__indicator--dot": B(t).dot,
				"mat-badge__indicator--border": B(t).border
			}]]),
			style: S(f.value),
			"aria-hidden": "true",
			"data-dot": B(t).dot ? "" : void 0,
			"data-border": B(t).border ? "" : void 0
		}, z(u.value), 15, Yo)) : s("", !0)], 16));
	}
}), [["__scopeId", "data-v-a4190aa1"]]), Zo = Symbol("mat-chip-set"), Qo = {
	key: 0,
	class: "mat-chip__avatar",
	"aria-hidden": "true",
	inert: ""
}, $o = {
	key: 1,
	class: "mat-chip__icon mat-chip__icon--leading",
	"aria-hidden": "true",
	inert: ""
}, es = { class: "mat-chip__label" }, ts = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		hideSelectedIcon: {
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
				return e === void 0 || Wa(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return It.includes(e);
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
		let n = $("chip", e), r = t, i = ne(), u = g(At, kt), d = g(Zo, null), f = a(() => ["filter", "input"].includes(n.variant)), p = a(() => !!d && f.value && n.value !== void 0 && d.selection.value !== "none"), m = a(() => p.value ? d.isSelected(n.value) : f.value && n.selected), h = a(() => !!i.avatar), _ = a(() => !h.value && !!i.leading), y = a(() => n.variant === "filter" && m.value && !h.value && !_.value && !n.hideSelectedIcon), b = a(() => h.value || _.value || y.value), x = a(() => n.variant === "input"), { colorStyle: S, hasExplicitColor: C } = dn(a(() => n.color));
		function w(e) {
			r("click", e), p.value && d.requestSelection(n.value, e);
		}
		function T(e) {
			n.variant === "input" && (e.stopPropagation(), n.disabled || r("remove", e));
		}
		return (e, t) => (O(), o(Mt, v(e.$attrs, {
			class: ["mat-chip mat-sys-typescale-label-large", [`mat-chip--${B(n).variant}`, {
				"mat-chip--elevated": B(n).elevated,
				"mat-chip--selected": m.value,
				"mat-chip--explicit-color": B(C),
				"mat-chip--has-leading": b.value,
				"mat-chip--has-avatar": h.value,
				"mat-chip--has-remove-icon": x.value
			}]],
			style: B(S),
			"aria-pressed": f.value ? String(m.value) : void 0,
			disabled: B(n).disabled,
			type: B(n).type,
			"use-cursor": B(u).useCursor,
			onClick: w
		}), {
			default: U(() => [
				h.value ? (O(), c("span", Qo, [F(e.$slots, "avatar", {}, void 0, !0)])) : _.value || y.value ? (O(), c("span", $o, [_.value ? F(e.$slots, "leading", { key: 0 }, void 0, !0) : (O(), o(hn, {
					key: 1,
					as: "span",
					icon: "check",
					"optical-size": 20,
					size: "18px"
				}))])) : s("", !0),
				l("span", es, [F(e.$slots, "default", {}, void 0, !0)]),
				x.value ? (O(), c("span", {
					key: 2,
					class: "mat-chip__icon mat-chip__remove-icon",
					"aria-hidden": "true",
					onPointerdown: t[0] ||= K(() => {}, ["stop"]),
					onClick: T
				}, [e.$slots["remove-icon"] ? F(e.$slots, "remove-icon", { key: 0 }, void 0, !0) : (O(), o(hn, {
					key: 1,
					as: "span",
					icon: B(n).removeIcon,
					"optical-size": 20,
					size: "18px"
				}, null, 8, ["icon"]))], 32)) : s("", !0)
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
}), [["__scopeId", "data-v-f6054847"]]), ns = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Cn(e, { allowUndefined: !1 })
		},
		shadowLength: {
			type: [Number, Object],
			default: void 0,
			validator: (e) => Dn(e)
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
			validator: (e) => Dn(e, { allowUndefined: !1 })
		},
		shadowOffset: {
			type: [Number, Object],
			default: 0,
			validator: (e) => Dn(e, { allowUndefined: !1 })
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
			validator: Ht
		}
	},
	emits: {
		"reach-start": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement,
		"reach-end": (e) => typeof e?.distance == "number" && e.target instanceof HTMLElement
	},
	setup(e, { expose: t, emit: n }) {
		let r = $("scrollArea", e), { colorStyle: i, hasExplicitColor: o } = dn(a(() => r.color)), s = n, u = ee(), d = M(null), f = M(null), p = M(!1), m = M(!1), h = M(!1), g = M(!1), _ = M(!1), b, x, S, C = 0, T = 0, A = !1, j, N = a(() => [
			"horizontal",
			"x",
			"h"
		].includes(r.orientation) ? "horizontal" : "vertical"), P = a(() => r.dragScroll && N.value === "horizontal"), I = a(() => On(r.reachThreshold, 0)), L = a(() => On(r.shadowOffset, 0)), R = a(() => On(r.shadowLength, 16)), z = a(() => r.barWidth === "hidden" ? 0 : r.barWidth === "thin" ? 8 : 16), te = M({
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		});
		function ne() {
			let e = d.value;
			if (!e) return;
			let t = getComputedStyle(e), n = {
				left: Number.parseFloat(t.paddingLeft) || 0,
				right: Number.parseFloat(t.paddingRight) || 0,
				top: Number.parseFloat(t.paddingTop) || 0,
				bottom: Number.parseFloat(t.paddingBottom) || 0
			}, r = te.value;
			n.left === r.left && n.right === r.right && n.top === r.top && n.bottom === r.bottom || (te.value = n);
		}
		let H = a(() => {
			let e = N.value === "horizontal", t = Tn(r.snapPadding, { fallback: "0" });
			return {
				scrollPaddingBottom: e ? void 0 : t,
				scrollPaddingLeft: e ? t : void 0,
				scrollPaddingRight: e ? t : void 0,
				scrollPaddingTop: e ? void 0 : t,
				scrollSnapType: r.snap === "none" ? "none" : `${e ? "x" : "y"} ${r.snap}`
			};
		}), U = a(() => ({
			class: u.class,
			style: u.style
		})), W = a(() => [i.value, {
			"--mat-scroll-area-shadow-length-start": `${R.value.start}px`,
			"--mat-scroll-area-shadow-length-end": `${R.value.end}px`,
			"--mat-scroll-area-shadow-offset-start": `${L.value.start}px`,
			"--mat-scroll-area-shadow-offset-end": `${L.value.end}px`,
			"--mat-scroll-area-scrollbar-width": `${z.value}px`,
			"--mat-scroll-area-root-padding-left": `${te.value.left}px`,
			"--mat-scroll-area-root-padding-right": `${te.value.right}px`,
			"--mat-scroll-area-root-padding-top": `${te.value.top}px`,
			"--mat-scroll-area-root-padding-bottom": `${te.value.bottom}px`
		}]), G = a(() => Object.fromEntries(Object.entries(u).filter(([e]) => !["class", "style"].includes(e))));
		function K() {
			let e = f.value;
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
		function re(e) {
			let t = f.value;
			if (!t) return;
			let n = K(), r = n.start <= I.value.start + 1, i = n.end <= I.value.end + 1;
			p.value = n.start > 1, m.value = n.end > 1, e && r && !g.value && s("reach-start", {
				distance: n.start,
				target: t
			}), e && i && !_.value && s("reach-end", {
				distance: n.end,
				target: t
			}), g.value = r, _.value = i;
		}
		function q(e) {
			b !== void 0 && cancelAnimationFrame(b), b = requestAnimationFrame(() => {
				b = void 0, re(e);
			});
		}
		function ie() {
			q(!0);
		}
		function J() {
			j !== void 0 && (globalThis.clearTimeout(j), j = void 0), A = !1;
		}
		function Y() {
			J(), A = !0, j = globalThis.setTimeout(() => {
				A = !1, j = void 0;
			}, 0);
		}
		function X(e = !1) {
			let t = f.value, n = S;
			e && n !== void 0 && t?.hasPointerCapture?.(n) && t.releasePointerCapture(n), S = void 0, h.value = !1;
		}
		function Z(e) {
			!P.value || S !== void 0 || e.button !== 0 || !["mouse", "pen"].includes(e.pointerType) || (S = e.pointerId, C = e.clientX, T = f.value?.scrollLeft ?? 0);
		}
		function ae(e) {
			if (e.pointerId !== S || !f.value) return;
			let t = e.clientX - C;
			!h.value && Math.abs(t) <= 4 || (h.value || (h.value = !0, f.value.setPointerCapture?.(e.pointerId)), e.preventDefault(), f.value.scrollLeft = T - t);
		}
		function oe(e) {
			e.pointerId === S && (h.value && Y(), X(!0));
		}
		function se(e) {
			e.pointerId === S && X(!0);
		}
		function ce(e) {
			e.target !== f.value || e.pointerId !== S || (h.value && Y(), X());
		}
		function le(e) {
			A && (J(), e.preventDefault(), e.stopImmediatePropagation());
		}
		function ue() {
			!x || !f.value || (x.disconnect(), x.observe(f.value), Array.from(f.value.children).forEach((e) => {
				x.observe(e);
			}), q(!1));
		}
		function de() {
			return f.value;
		}
		function fe(e) {
			f.value?.scrollTo(e);
		}
		return k(Ka, {
			getScroller: de,
			scrollTo: fe,
			scroller: f,
			orientation: N
		}), V([N, I], async () => {
			await y(), q(!1);
		}, { deep: !0 }), V(P, (e) => {
			e || (X(!0), J());
		}), E(() => {
			ne(), typeof ResizeObserver == "function" && (x = new ResizeObserver(() => {
				ne(), q(!1);
			})), ue();
		}), D(() => {
			ne(), ue();
		}), w(() => {
			b !== void 0 && cancelAnimationFrame(b), x?.disconnect(), X(!0), J();
		}), t({
			getScroller: de,
			scrollTo: fe
		}), (e, t) => (O(), c("div", v({
			ref_key: "root",
			ref: d
		}, U.value, {
			class: ["mat-scroll-area", [{
				"mat-scroll-area--rounded": B(r).rounded,
				"mat-scroll-area--explicit-color": B(o)
			}]],
			style: W.value
		}), [l("div", v({
			ref_key: "scroller",
			ref: f
		}, G.value, {
			class: ["mat-scroll-area__viewport mat-scrollbar", [
				`mat-scroll-area__viewport--${N.value}`,
				`mat-scrollbar--${B(r).barWidth}`,
				{
					"mat-scroll-area__viewport--dragging": h.value,
					"mat-scroll-area__viewport--no-scroll-padding": B(r).noScrollPadding,
					"mat-scroll-area__viewport--start-overflow": p.value,
					"mat-scroll-area__viewport--end-overflow": m.value
				}
			]],
			style: H.value,
			onClickCapture: le,
			onLostpointercapture: ce,
			onPointercancel: se,
			onPointerdown: Z,
			onPointermove: ae,
			onPointerup: oe,
			onScroll: ie
		}), [F(e.$slots, "default", {}, void 0, !0)], 16)], 16));
	}
}), [["__scopeId", "data-v-f222c54b"]]), rs = { class: "mat-chip-set__scroll-content" }, is = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatChipSet" }, {
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
				return e === null || Wa(e) || Array.isArray(e) && e.every(Wa);
			}
		}
	},
	emits: { "update:modelValue"(e) {
		return e === null || Wa(e) || Array.isArray(e) && e.every(Wa);
	} },
	setup(e, { emit: t }) {
		let n = $("chipSet", e), r = t, i = a(() => n.selection);
		function s(e) {
			return n.selection === "multiple" ? Array.isArray(n.modelValue) && n.modelValue.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.modelValue, e);
		}
		function u(e) {
			let t = s(e);
			if (n.selection === "single") {
				r("update:modelValue", t ? null : e);
				return;
			}
			if (n.selection === "multiple") {
				let i = Array.isArray(n.modelValue) ? n.modelValue : [];
				r("update:modelValue", t ? i.filter((t) => !Object.is(t, e)) : [...i, e]);
			}
		}
		return k(Zo, {
			isSelected: s,
			requestSelection: u,
			selection: i
		}), (e, t) => (O(), c("div", {
			class: b(["mat-chip-set", `mat-chip-set--${B(n).layout}`]),
			role: "group"
		}, [B(n).layout === "scroll" ? (O(), o(ns, {
			key: 0,
			class: "mat-chip-set__scroll-area",
			orientation: "horizontal",
			"bar-width": "hidden",
			"drag-scroll": "",
			"shadow-length": 48
		}, {
			default: U(() => [l("div", rs, [F(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		})) : F(e.$slots, "default", { key: 1 }, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-e907c0ea"]]), as = Symbol("mde-vue-radio-group"), os = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e == null || Wa(e);
			}
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			required: !0,
			validator: Wa
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Wa(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radio", e), r = t, i = p(), s = g(as, null), c = M(null), u = a(() => n.value), d = a(() => n.disabled || !!s?.disabled.value), f = a(() => n.color ?? s?.color.value), m = a(() => s ? s.isSelected(n.value) : Object.is(n.modelValue, n.value));
		function h(e) {
			d.value || m.value || (s ? s.requestSelection(n.value, e) : r("update:modelValue", n.value), r("change", e));
		}
		let _ = {
			activate: h,
			disabled: d,
			focus() {
				c.value?.focusInput();
			},
			getInput() {
				return c.value?.getInput() ?? null;
			},
			value: u
		}, y = a(() => s ? s.getTabIndex(_) : void 0);
		E(() => {
			if (!s) return;
			let e = i?.vnode.props ?? {};
			(n.modelValue !== void 0 || Object.hasOwn(e, "onUpdate:modelValue")) && console.warn("MatRadio: 位于 MatRadioGroup 中时，子级 modelValue 和 v-model 会被忽略"), s.register(_);
		}), w(() => {
			s?.unregister(_);
		});
		function b(e) {
			!s || e.repeat || (["ArrowRight", "ArrowDown"].includes(e.key) ? s.move(_, 1, e) : ["ArrowLeft", "ArrowUp"].includes(e.key) && s.move(_, -1, e));
		}
		return (e, t) => (O(), o(Wo, v({
			ref_key: "base",
			ref: c
		}, e.$attrs, {
			class: ["mat-radio", { "mat-radio--checked": m.value }],
			checked: m.value,
			color: f.value,
			disabled: d.value,
			"input-type": "radio",
			"input-value": u.value,
			"label-name": "MatRadio",
			tabindex: y.value,
			onChange: h,
			onKeydown: b
		}), {
			indicator: U(() => [...t[0] ||= [l("span", { class: "mat-radio__ring" }, [l("span", { class: "mat-radio__dot" })], -1)]]),
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-dae1f87b"]]), ss = ["aria-disabled"], cs = { class: "mat-radio-group__label mat-sys-typescale-title-medium" }, ls = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === null || Wa(e);
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
			validator: Ht
		}
	},
	emits: {
		"update:modelValue"(e) {
			return e === null || Wa(e);
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: t }) {
		let n = $("radioGroup", e), r = t, i = ee(), o = R([]), { colorStyle: s } = dn(a(() => n.color)), u = a(() => Object.fromEntries(Object.entries(i).filter(([e]) => e !== "style"))), d = a(() => [s.value, i.style]);
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
		function g(e) {
			if (e.disabled.value) return -1;
			let t = p().filter((e) => !e.disabled.value), n = t.find((e) => f(e.value.value));
			return n ? n === e ? 0 : -1 : t[0] === e ? 0 : -1;
		}
		function _(e, t) {
			n.disabled || Object.is(n.modelValue, e) || (r("update:modelValue", e), r("change", t));
		}
		function y(e, t, n) {
			let r = p().filter((e) => !e.disabled.value), i = r.indexOf(e);
			if (i === -1 || r.length === 0) return;
			n.preventDefault();
			let a = r[(i + t + r.length) % r.length];
			a.focus(), a.activate(n);
		}
		return k(as, {
			color: a(() => n.color),
			disabled: a(() => n.disabled),
			getTabIndex: g,
			isSelected: f,
			move: y,
			register: m,
			requestSelection: _,
			unregister: h
		}), (e, t) => (O(), c("fieldset", v(u.value, {
			class: "mat-radio-group",
			"aria-disabled": B(n).disabled || void 0,
			style: d.value,
			role: "radiogroup"
		}), [l("legend", cs, z(B(n).label), 1), F(e.$slots, "default", {}, void 0, !0)], 16, ss));
	}
}), [["__scopeId", "data-v-77c4f2f2"]]), us = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ht
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
		return (e, t) => (O(), o(Wo, v(e.$attrs, {
			class: ["mat-switch", [`mat-switch--icons-${B(n).icons}`, { "mat-switch--checked": B(n).modelValue }]],
			checked: B(n).modelValue,
			color: B(n).color,
			disabled: B(n).disabled,
			"input-role": "switch",
			"input-type": "checkbox",
			"label-name": "MatSwitch",
			onChange: i
		}), {
			indicator: U(() => [...t[0] ||= [l("span", { class: "mat-switch__track" }, [l("span", { class: "mat-switch__handle-positioner" }, [l("span", { class: "mat-switch__handle" }, [l("span", { class: "mat-switch__icon mat-switch__icon--selected" }), l("span", { class: "mat-switch__icon mat-switch__icon--unselected" })])])], -1)]]),
			default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"checked",
			"color",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-6efac2c1"]]), ds = Object.freeze(["horizontal", "vertical"]), fs = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), ps = Object.freeze(["standard", "centered"]), ms = 12;
function hs(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function gs(e) {
	return hs(e) && e > 0;
}
function _s(e) {
	return ds.includes(e);
}
function vs(e) {
	return fs.includes(e);
}
function ys(e) {
	return ps.includes(e);
}
function bs(e) {
	return Array.isArray(e) && e.length === 2 && e.every(hs);
}
function xs(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function Ss(e, t) {
	return Number(e.toFixed(Math.min(ms, t)));
}
function Cs(e, t) {
	let n = hs(e) ? e : 0, r = hs(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function ws(e) {
	return gs(e) ? e : 1;
}
function Ts(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function Es(e, t, n) {
	let r = Ts(hs(e) ? e : t.min, t), i = Math.round((r - t.min) / n), a = Math.max(xs(t.min), xs(t.max), xs(n));
	return Ss(Ts(t.min + i * n, t), a);
}
function Ds(e, t, n) {
	return Es(hs(e) ? e : (t.min + t.max) / 2, t, n);
}
function Os(e, t) {
	return Ss((Ts(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function ks(e) {
	return Number(e.toFixed(3)).toString();
}
function As(e) {
	let t = Math.min(Math.max(e, 0), 100), n = ks(t), r = Ss(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${ks(Math.abs(r))}px)`;
}
function js(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(xs(e.min), xs(e.max), xs(t)), i = Array.from({ length: n + 1 }, (n, i) => Ss(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function Ms(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return Es(n.min + (n.max - n.min) * u, n, r);
}
function Ns(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return Es(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return Es(e + i * r, n, r);
}
function Ps(e, t, n, r) {
	let i = Es(e, n, r), a = Es(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
//#region src/components/mat-slider/MatSlider.vue
var Fs = {
	key: 0,
	class: "mat-slider__affix mat-slider__affix--prepend"
}, Is = {
	class: "mat-slider__track",
	"aria-hidden": "true"
}, Ls = { class: "mat-slider__inset-icon-layer" }, Rs = { class: "mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active" }, zs = [
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
], Bs = {
	key: 1,
	class: "mat-slider__affix mat-slider__affix--append"
}, Vs = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatSlider",
	inheritAttrs: !1
}, {
	__name: "MatSlider",
	props: {
		modelValue: {
			type: Number,
			default: 0,
			validator: hs
		},
		min: {
			type: Number,
			default: 0,
			validator: hs
		},
		max: {
			type: Number,
			default: 100,
			validator: hs
		},
		step: {
			type: Number,
			default: 1,
			validator: gs
		},
		variant: {
			type: String,
			default: "standard",
			validator: ys
		},
		center: {
			type: Number,
			default: void 0,
			validator(e) {
				return e === void 0 || hs(e);
			}
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: _s
		},
		size: {
			type: String,
			default: "extra-small",
			validator: vs
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
			return hs(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let r = $("slider", e), i = n, u = ee(), p = ne(), m = M(null), h = M(null), _ = M(null), y = M(null), x = M(null), C = M(!1), T = M(void 0), D = M(void 0), k = M(!1), A = M(!1), j = M("active"), N = g(At, kt), { colorStyle: I } = dn(a(() => r.color)), L = a(() => Cs(r.min, r.max)), R = a(() => ws(r.step)), te = a(() => Es(r.modelValue, L.value, R.value)), H = a(() => C.value ? D.value : te.value), W = a(() => Ds(r.center, L.value, R.value)), G = a(() => r.variant === "centered" ? W.value : L.value.min), K = a(() => Os(H.value, L.value)), re = a(() => Os(G.value, L.value)), q = a(() => As(K.value)), ie = a(() => r.variant === "standard" ? "0%" : As(re.value)), J = a(() => Math.sign(K.value - re.value)), Y = a(() => J.value >= 0 ? ie.value : `calc(${q.value} + var(--mat-slider-handle-track-gap))`), X = a(() => J.value > 0 ? `max(0px, calc(${q.value} - ${ie.value} - var(--mat-slider-handle-track-gap)))` : J.value < 0 ? `max(0px, calc(${ie.value} - ${q.value} - var(--mat-slider-handle-track-gap)))` : "0px"), Z = a(() => J.value > 0 ? ie.value : `max(0px, calc(${q.value} - var(--mat-slider-handle-track-gap)))`), ae = a(() => J.value < 0 ? ie.value : `calc(${q.value} + var(--mat-slider-handle-track-gap))`), oe = a(() => J.value < 0 ? `calc(100% - ${ie.value})` : `max(0px, calc(100% - ${q.value} - var(--mat-slider-handle-track-gap)))`), se = a(() => r.showStopIndicator ? js(L.value, R.value) : r.variant === "centered" ? [L.value.min, L.value.max] : [L.value.max]), ce = a(() => r.insetIcon !== void 0 && [
			"medium",
			"large",
			"extra-large"
		].includes(r.size)), le = a(() => r.size === "extra-large" ? 32 : 24), ue = a(() => r.showValueIndicator && (C.value || A.value)), de = a(() => ({
			...I.value,
			"--mat-slider-active-visible-size": X.value,
			"--mat-slider-active-visible-start": Y.value,
			"--mat-slider-center-position": ie.value,
			"--mat-slider-inactive-after-size": oe.value,
			"--mat-slider-inactive-after-start": ae.value,
			"--mat-slider-inactive-before-size": Z.value,
			"--mat-slider-inset-icon-position": j.value === "inactive" ? `calc(${q.value} + (var(--mat-slider-handle-width) / 2) + var(--mat-slider-handle-track-gap))` : "var(--mat-slider-inset-icon-offset)",
			"--mat-slider-position": q.value
		}));
		function fe() {
			if (!ce.value || r.variant !== "standard" || !h.value) {
				j.value = "active";
				return;
			}
			let e = h.value.getBoundingClientRect(), t = r.orientation === "vertical" ? e.height : e.width, n = r.size === "extra-large" ? 32 : 24, i = Number.parseFloat(getComputedStyle(h.value).getPropertyValue("--mat-slider-handle-width")) || 4, a = 6 + (t - 12) * K.value / 100, o = 12 + n;
			j.value = a - i / 2 - 6 >= o ? "active" : "inactive";
		}
		let pe;
		E(() => {
			fe(), typeof ResizeObserver < "u" && h.value && (pe = new ResizeObserver(fe), pe.observe(h.value));
		}), V([
			ce,
			() => r.orientation,
			() => r.variant,
			K
		], fe, { flush: "post" });
		function me(e, t) {
			let n = C.value ? D.value : te.value;
			return e === void 0 || e === n ? !1 : (C.value && (D.value = e), i("update:modelValue", e), i("input", t), !0);
		}
		function he(e) {
			return y.value ? me(Ms(e, y.value, L.value, R.value, r.orientation), e) : !1;
		}
		let ge = Ja((e) => {
			k.value = he(e) || k.value;
		});
		function _e(e) {
			r.disabled || (ge.cancel(), T.value = e.pointerId, D.value = te.value, k.value = !1, C.value = !0, x.value?.focus(), y.value?.setPointerCapture?.(e.pointerId), k.value = he(e));
		}
		function ve(e) {
			!C.value || e.pointerId !== T.value || ge.schedule(e);
		}
		function ye(e, t) {
			!C.value || e.pointerId !== T.value || (t ? (ge.flush(), k.value = he(e) || k.value) : ge.cancel(), t && k.value && i("change", e), C.value = !1, k.value = !1, T.value = void 0, D.value = void 0);
		}
		w(() => {
			pe?.disconnect(), ge.cancel();
		});
		function be(e) {
			if (r.disabled) return;
			let t = Ns(te.value, e.key, L.value, R.value);
			t !== void 0 && (e.preventDefault(), me(t, e) && i("change", e));
		}
		return (n, i) => (O(), c("div", v({
			ref_key: "root",
			ref: m
		}, B(u), {
			class: ["mat-slider", [
				`mat-slider--${B(r).orientation}`,
				`mat-slider--size-${B(r).size}`,
				`mat-slider--${B(r).variant}`,
				{
					"mat-slider--disabled": B(r).disabled,
					"mat-slider--dragging": C.value,
					"mat-slider--use-cursor": B(N).useCursor
				}
			]],
			style: de.value
		}), [
			B(p).prepend ? (O(), c("span", Fs, [F(n.$slots, "prepend", {}, void 0, !0)])) : s("", !0),
			l("span", {
				ref_key: "body",
				ref: h,
				class: "mat-slider__body"
			}, [
				l("span", Is, [
					i[6] ||= l("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--before" }, null, -1),
					l("span", { class: b(["mat-slider__active-track", { "mat-slider__active-track--from-start": B(r).variant === "standard" }]) }, null, 2),
					i[7] ||= l("span", { class: "mat-slider__inactive-track mat-slider__inactive-track--after" }, null, -1),
					(O(!0), c(t, null, P(se.value, (e) => (O(), c("span", {
						key: e,
						class: b(["mat-slider__stop", { "mat-slider__stop--active": e >= Math.min(G.value, H.value) && e <= Math.max(G.value, H.value) }]),
						style: S({ "--mat-slider-stop-position": B(As)(B(Os)(e, L.value)) })
					}, null, 6))), 128)),
					ce.value && B(r).variant === "standard" ? (O(), o(hn, {
						key: 0,
						class: "mat-slider__inset-icon",
						"font-color": j.value === "active" ? "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))" : "var(--mat-slider-inset-icon-inactive-color)",
						icon: B(r).insetIcon,
						"optical-size": le.value,
						size: "var(--mat-slider-current-inset-icon-size)",
						"aria-hidden": "true"
					}, null, 8, [
						"font-color",
						"icon",
						"optical-size"
					])) : ce.value ? (O(), c(t, { key: 1 }, [l("span", Ls, [f(hn, {
						class: "mat-slider__inset-icon mat-slider__inset-icon--inactive",
						"font-color": "var(--mat-slider-inset-icon-inactive-color)",
						icon: B(r).insetIcon,
						"optical-size": le.value,
						size: "var(--mat-slider-current-inset-icon-size)",
						"aria-hidden": "true"
					}, null, 8, ["icon", "optical-size"])]), l("span", Rs, [f(hn, {
						class: "mat-slider__inset-icon mat-slider__inset-icon--active",
						"font-color": "var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))",
						icon: B(r).insetIcon,
						"optical-size": le.value,
						size: "var(--mat-slider-current-inset-icon-size)",
						"aria-hidden": "true"
					}, null, 8, ["icon", "optical-size"])])], 64)) : s("", !0),
					l("span", {
						ref_key: "handle",
						ref: _,
						class: "mat-slider__handle"
					}, [...i[5] ||= [l("span", { class: "mat-slider__handle-shape" }, null, -1)]], 512)
				]),
				f(Ir, {
					class: "mat-slider__value-indicator",
					"data-slider-value-indicator": "",
					location: e.orientation === "vertical" ? "right" : "top",
					"model-value": ue.value,
					target: _.value
				}, {
					default: U(() => [B(p)["indicator-label"] ? F(n.$slots, "indicator-label", {
						key: 0,
						modelValue: H.value
					}, void 0, !0) : (O(), c(t, { key: 1 }, [d(z(H.value), 1)], 64))]),
					_: 3
				}, 8, [
					"location",
					"model-value",
					"target"
				]),
				l("span", {
					ref_key: "interaction",
					ref: y,
					class: "mat-slider__interaction",
					"aria-hidden": "true",
					onLostpointercapture: i[0] ||= (e) => ye(e, !1),
					onPointercancel: i[1] ||= (e) => ye(e, !1),
					onPointerdown: _e,
					onPointermove: ve,
					onPointerup: i[2] ||= (e) => ye(e, !0)
				}, null, 544),
				l("input", {
					ref_key: "nativeInput",
					ref: x,
					class: "mat-slider__native-input",
					type: "range",
					"aria-label": B(u)["aria-label"],
					"aria-orientation": B(r).orientation,
					"aria-valuemax": L.value.max,
					"aria-valuemin": L.value.min,
					"aria-valuenow": H.value,
					disabled: B(r).disabled,
					max: L.value.max,
					min: L.value.min,
					step: R.value,
					value: H.value,
					onBlur: i[3] ||= (e) => A.value = !1,
					onFocus: i[4] ||= (e) => A.value = !0,
					onKeydown: be
				}, null, 40, zs)
			], 512),
			B(p).append ? (O(), c("span", Bs, [F(n.$slots, "append", {}, void 0, !0)])) : s("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-a6d84321"]]), Hs = {
	key: 0,
	class: "mat-range-slider__affix mat-range-slider__affix--prepend"
}, Us = { class: "mat-range-slider__body" }, Ws = {
	class: "mat-range-slider__track",
	"aria-hidden": "true"
}, Gs = [
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
], Ks = [
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
], qs = {
	key: 1,
	class: "mat-range-slider__affix mat-range-slider__affix--append"
}, Js = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: bs
		},
		min: {
			type: Number,
			default: 0,
			validator: hs
		},
		max: {
			type: Number,
			default: 100,
			validator: hs
		},
		step: {
			type: Number,
			default: 1,
			validator: gs
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator: _s
		},
		size: {
			type: String,
			default: "extra-small",
			validator: vs
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
			return bs(e);
		},
		input(e) {
			return e instanceof Event;
		},
		change(e) {
			return e instanceof Event;
		}
	},
	setup(e, { emit: n }) {
		let r = $("rangeSlider", e), i = n, o = ee(), u = ne(), p = M([]), m = M(null), h = M(null), _ = M(null), y = M(0), x = M(void 0), C = M(!1), T = M(void 0), E = M(void 0), D = M(!1), k = g(At, kt), { colorStyle: A } = dn(a(() => r.color)), j = a(() => Cs(r.min, r.max)), N = a(() => ws(r.step)), I = a(() => Ps(r.modelValue?.[0], r.modelValue?.[1], j.value, N.value)), L = a(() => C.value ? E.value : I.value), R = a(() => Os(L.value[0], j.value)), te = a(() => Os(L.value[1], j.value)), V = a(() => As(R.value)), H = a(() => As(te.value)), W = a(() => r.showStopIndicator ? js(j.value, N.value) : [j.value.min, j.value.max]), G = a(() => p.value[y.value] ?? null), K = a(() => L.value[y.value]), re = a(() => r.showValueIndicator && (C.value || x.value === y.value)), q = a(() => ({
			...A.value,
			"--mat-range-slider-active-visible-size": `max(0px, calc(${H.value} - ${V.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
			"--mat-range-slider-active-visible-start": `calc(${V.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-end-position": H.value,
			"--mat-range-slider-inactive-after-size": `max(0px, calc(100% - ${H.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-inactive-after-start": `calc(${H.value} + var(--mat-slider-handle-track-gap))`,
			"--mat-range-slider-inactive-before-size": `max(0px, calc(${V.value} - var(--mat-slider-handle-track-gap)))`,
			"--mat-range-slider-start-position": V.value
		}));
		function ie(e) {
			return e === 0 ? h.value : _.value;
		}
		function J(e) {
			let [t, n] = L.value;
			return Math.abs(e - t) <= Math.abs(e - n) ? 0 : 1;
		}
		function Y(e, t, n) {
			if (t === void 0) return !1;
			let [r, a] = C.value ? E.value : I.value, o = e === 0 ? [Math.min(t, a), a] : [r, Math.max(t, r)];
			return o[0] === r && o[1] === a ? !1 : (C.value && (E.value = o), i("update:modelValue", o), i("input", n), !0);
		}
		function X(e) {
			if (!m.value) return !1;
			let t = Ms(e, m.value, j.value, N.value, r.orientation);
			return Y(y.value, t, e);
		}
		let Z = Ja((e) => {
			D.value = X(e) || D.value;
		});
		function ae(e) {
			if (r.disabled || !m.value) return;
			Z.cancel();
			let t = Ms(e, m.value, j.value, N.value, r.orientation);
			t !== void 0 && (y.value = J(t), T.value = e.pointerId, E.value = [...I.value], D.value = !1, C.value = !0, ie(y.value)?.focus(), m.value.setPointerCapture?.(e.pointerId), D.value = Y(y.value, t, e));
		}
		function oe(e) {
			!C.value || e.pointerId !== T.value || Z.schedule(e);
		}
		function se(e, t) {
			!C.value || e.pointerId !== T.value || (t ? (Z.flush(), D.value = X(e) || D.value) : Z.cancel(), t && D.value && i("change", e), C.value = !1, D.value = !1, T.value = void 0, E.value = void 0);
		}
		w(() => {
			Z.cancel();
		});
		function ce(e, t) {
			if (r.disabled) return;
			let n = Ns(I.value[e], t.key, j.value, N.value);
			n !== void 0 && (t.preventDefault(), y.value = e, Y(e, n, t) && i("change", t));
		}
		function le(e) {
			y.value = e, x.value = e;
		}
		function ue(e) {
			x.value === e && (x.value = void 0);
		}
		function de(e, t) {
			p.value[e] = t instanceof HTMLElement ? t : null;
		}
		return (e, n) => (O(), c("div", v(B(o), {
			class: ["mat-range-slider", [
				`mat-range-slider--${B(r).orientation}`,
				`mat-range-slider--size-${B(r).size}`,
				{
					"mat-range-slider--disabled": B(r).disabled,
					"mat-range-slider--dragging": C.value,
					"mat-range-slider--use-cursor": B(k).useCursor
				}
			]],
			style: q.value
		}), [
			B(u).prepend ? (O(), c("span", Hs, [F(e.$slots, "prepend", {}, void 0, !0)])) : s("", !0),
			l("span", Us, [
				l("span", Ws, [
					n[10] ||= l("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--before" }, null, -1),
					n[11] ||= l("span", { class: "mat-range-slider__active-track" }, null, -1),
					n[12] ||= l("span", { class: "mat-range-slider__inactive-track mat-range-slider__inactive-track--after" }, null, -1),
					(O(!0), c(t, null, P(W.value, (e) => (O(), c("span", {
						key: e,
						class: b(["mat-range-slider__stop", { "mat-range-slider__stop--active": e >= L.value[0] && e <= L.value[1] }]),
						style: S({ "--mat-range-slider-stop-position": B(As)(B(Os)(e, j.value)) })
					}, null, 6))), 128)),
					(O(!0), c(t, null, P(L.value, (e, t) => (O(), c("span", {
						key: t,
						ref_for: !0,
						ref: (e) => de(t, e),
						class: b(["mat-range-slider__handle", [`mat-range-slider__handle--${t === 0 ? "start" : "end"}`, { "mat-range-slider__handle--active": y.value === t }]])
					}, [...n[9] ||= [l("span", { class: "mat-range-slider__handle-shape" }, null, -1)]], 2))), 128))
				]),
				f(Ir, {
					class: "mat-range-slider__value-indicator",
					"data-slider-value-indicator": "",
					location: B(r).orientation === "vertical" ? "right" : "top",
					"model-value": re.value,
					target: G.value
				}, {
					default: U(() => [B(u)["indicator-label"] ? F(e.$slots, "indicator-label", {
						key: 0,
						index: y.value,
						modelValue: K.value
					}, void 0, !0) : (O(), c(t, { key: 1 }, [d(z(K.value), 1)], 64))]),
					_: 3
				}, 8, [
					"location",
					"model-value",
					"target"
				]),
				l("span", {
					ref_key: "interaction",
					ref: m,
					class: "mat-range-slider__interaction",
					"aria-hidden": "true",
					onLostpointercapture: n[0] ||= (e) => se(e, !1),
					onPointercancel: n[1] ||= (e) => se(e, !1),
					onPointerdown: ae,
					onPointermove: oe,
					onPointerup: n[2] ||= (e) => se(e, !0)
				}, null, 544),
				l("input", {
					ref_key: "startInput",
					ref: h,
					class: "mat-range-slider__native-input",
					type: "range",
					"aria-label": B(r).ariaLabelStart,
					"aria-orientation": B(r).orientation,
					"aria-valuemax": L.value[1],
					"aria-valuemin": j.value.min,
					"aria-valuenow": L.value[0],
					disabled: B(r).disabled,
					max: L.value[1],
					min: j.value.min,
					step: N.value,
					value: L.value[0],
					onBlur: n[3] ||= (e) => ue(0),
					onFocus: n[4] ||= (e) => le(0),
					onKeydown: n[5] ||= (e) => ce(0, e)
				}, null, 40, Gs),
				l("input", {
					ref_key: "endInput",
					ref: _,
					class: "mat-range-slider__native-input",
					type: "range",
					"aria-label": B(r).ariaLabelEnd,
					"aria-orientation": B(r).orientation,
					"aria-valuemax": j.value.max,
					"aria-valuemin": L.value[0],
					"aria-valuenow": L.value[1],
					disabled: B(r).disabled,
					max: j.value.max,
					min: L.value[0],
					step: N.value,
					value: L.value[1],
					onBlur: n[6] ||= (e) => ue(1),
					onFocus: n[7] ||= (e) => le(1),
					onKeydown: n[8] ||= (e) => ce(1, e)
				}, null, 40, Ks)
			]),
			B(u).append ? (O(), c("span", qs, [F(e.$slots, "append", {}, void 0, !0)])) : s("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-27f4d357"]]), Ys = ["inert", "aria-hidden"], Xs = { class: "mat-text-input__container" }, Zs = {
	key: 0,
	class: "mat-text-input__outline",
	"aria-hidden": "true"
}, Qs = {
	key: 0,
	class: "mat-text-input__outline-label mat-sys-typescale-body-small"
}, $s = { key: 0 }, ec = {
	key: 1,
	class: "mat-text-input__indicator",
	"aria-hidden": "true"
}, tc = {
	key: 2,
	class: "mat-text-input__icon mat-text-input__leading"
}, nc = {
	key: 0,
	"aria-hidden": "true"
}, rc = { class: "mat-text-input__control-row" }, ic = {
	key: 0,
	class: "mat-text-input__affix mat-text-input__prefix"
}, ac = {
	key: 3,
	class: "mat-text-input__affix mat-text-input__suffix"
}, oc = {
	key: 3,
	class: "mat-text-input__icon mat-text-input__trailing"
}, sc = { class: "mat-text-input__supporting-text" }, cc = {
	key: 0,
	class: "mat-text-input__counter"
}, lc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = e, r = t, i = ee(), u = M(!1), f = M(n.modelValue), p = M(), m = te(), h = `${m}-supporting`, g = a(() => i.id || m), { colorStyle: _ } = dn(a(() => n.color)), x = a(() => !!i.placeholder), C = a(() => n.control === "custom" ? n.customFocused : u.value), T = a(() => C.value || f.value.length > 0 || x.value), D = a(() => n.error ? n.errorText : n.supportingText), k = a(() => !!D.value || n.maxLength !== void 0), A = a(() => {
			let e = [i["aria-describedby"]];
			return k.value && e.push(h), e.filter(Boolean).join(" ") || void 0;
		}), j = a(() => [_.value, i.style]), N = /* @__PURE__ */ new Set([
			"aria-describedby",
			"aria-hidden",
			"block",
			"class",
			"inert",
			"style"
		]), P = a(() => Object.fromEntries(Object.entries(i).filter(([e]) => !N.has(e)))), L, R;
		function B(e) {
			return Number.parseFloat(e) || 0;
		}
		function ne() {
			let e = p.value?.getInput();
			if (!(e instanceof HTMLTextAreaElement)) return;
			e.style.resize = n.noResize ? "none" : "";
			let t = getComputedStyle(e), r = B(t.lineHeight) || 24, i = B(t.paddingBlockStart || t.paddingTop) + B(t.paddingBlockEnd || t.paddingBottom);
			if (e.style.minBlockSize = `${n.resizeMinRows * r + i}px`, !n.autoGrow) {
				e.style.blockSize = "", e.style.height = "", e.style.overflowY = "";
				return;
			}
			let a = n.rows ?? 1, o = n.maxRows === void 0 ? Infinity : Math.max(a, n.maxRows), s = a * r + i, c = o * r + i;
			e.style.blockSize = "auto", e.style.height = "";
			let l = e.scrollHeight, u = Math.max(s, Math.min(l, c));
			e.style.blockSize = `${u}px`, e.style.overflowY = "auto";
		}
		function H() {
			y(ne);
		}
		function W(e) {
			let t = e[0]?.contentRect.width;
			t !== R && (R = t, H());
		}
		V(() => n.modelValue, (e) => {
			f.value = e, H();
		}), V(() => [
			n.autoGrow,
			n.label,
			n.maxRows,
			n.noResize,
			n.resizeMinRows,
			n.rows
		], H), E(() => {
			ne(), !(n.control === "custom" || typeof globalThis.ResizeObserver != "function") && (L = new globalThis.ResizeObserver(W), L.observe(p.value.getInput()));
		}), w(() => {
			L?.disconnect();
		});
		function G() {
			n.control !== "custom" && p.value?.focusInput();
		}
		function K(e) {
			f.value = e, r("update:modelValue", e), H();
		}
		return (t, n) => (O(), c("div", {
			class: b(["mat-text-input mat-sys-typescale-body-large", [
				t.$attrs.class,
				`mat-text-input--${e.variant}`,
				`mat-text-input--${e.control}`,
				{
					"mat-text-input--floating": T.value,
					"mat-text-input--focused": C.value,
					"mat-text-input--error": e.error,
					"mat-text-input--disabled": e.disabled
				}
			]]),
			style: S(j.value),
			inert: t.$attrs.inert,
			"aria-hidden": t.$attrs["aria-hidden"]
		}, [l("div", Xs, [
			e.variant === "outlined" ? (O(), c("fieldset", Zs, [T.value && e.label ? (O(), c("legend", Qs, [d(z(e.label), 1), e.required ? (O(), c("span", $s, " *")) : s("", !0)])) : s("", !0)])) : s("", !0),
			e.variant === "filled" ? (O(), c("span", ec)) : s("", !0),
			t.$slots.leading ? (O(), c("span", tc, [F(t.$slots, "leading", {}, void 0, !0)])) : s("", !0),
			(O(), o(I(e.control === "custom" ? "div" : "label"), {
				class: "mat-text-input__main",
				for: e.control === "custom" ? void 0 : g.value,
				onClick: G
			}, {
				default: U(() => [e.label ? (O(), c("span", {
					key: 0,
					class: b(["mat-text-input__label", T.value ? "mat-sys-typescale-body-small" : "mat-sys-typescale-body-large"])
				}, [d(z(e.label), 1), e.required ? (O(), c("span", nc, " *")) : s("", !0)], 2)) : s("", !0), l("span", rc, [
					e.prefixText ? (O(), c("span", ic, z(e.prefixText), 1)) : s("", !0),
					e.control === "custom" ? F(t.$slots, "control", {
						key: 1,
						controlId: g.value,
						describedBy: A.value
					}, void 0, !0) : (O(), o(Vi, v({
						key: 2,
						ref_key: "controlElement",
						ref: p
					}, P.value, {
						class: "mat-text-input__control",
						"aria-describedby": A.value,
						"aria-invalid": e.error ? "true" : void 0,
						disabled: e.disabled,
						id: g.value,
						"max-length": e.maxLength,
						readonly: e.readonly,
						required: e.required,
						rows: e.control === "textarea" ? e.rows : void 0,
						type: e.control === "input" ? e.type : void 0,
						control: e.control,
						"model-value": e.modelValue,
						onBlur: n[0] ||= (e) => u.value = !1,
						onFocus: n[1] ||= (e) => u.value = !0,
						"onUpdate:modelValue": K
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
					e.suffixText ? (O(), c("span", ac, z(e.suffixText), 1)) : s("", !0)
				])]),
				_: 3
			}, 8, ["for"])),
			t.$slots.trailing ? (O(), c("span", oc, [F(t.$slots, "trailing", {}, void 0, !0)])) : s("", !0)
		]), k.value ? (O(), c("span", {
			key: 0,
			id: h,
			class: "mat-text-input__supporting mat-sys-typescale-body-small"
		}, [l("span", sc, z(D.value), 1), e.maxLength === void 0 ? s("", !0) : (O(), c("span", cc, z(e.modelValue.length) + " / " + z(e.maxLength), 1))])) : s("", !0)], 14, Ys));
	}
}), [["__scopeId", "data-v-ca1b6083"]]), uc = ["filled", "outlined"], dc = {
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
			return uc.includes(e);
		}
	},
	color: {
		type: String,
		default: void 0,
		validator: Ht
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
}, fc = /*@__PURE__*/ Object.assign({
	name: "MatTextField",
	inheritAttrs: !1
}, {
	__name: "MatTextField",
	props: {
		...dc,
		type: {
			type: String,
			default: "text"
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { emit: t }) {
		let n = $("textField", e), r = t;
		return (e, t) => (O(), o(lc, v({
			...e.$attrs,
			...B(n)
		}, {
			control: "input",
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e)
		}), u({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: U(() => [F(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: U(() => [F(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040));
	}
}), pc = 200, mc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: Ht
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Cn(e, {
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
		let r = $("menu", e), i = n, o = ee(), l = ne(), u = g(Po, null), d = g(No, null), p = g(Yn, null), m = M(null), h = M(null), _ = M(null), b = R(null), x = a(() => _.value?.root ?? _.value?.$el ?? null), C = te().replace(/[^\w-]/g, "-"), T = a(() => o.id ?? `${C}-menu`), A = `--mat-menu-anchor-${C}`, j = M(!1), N = M("closed"), P = d?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, I = M(0), L = /* @__PURE__ */ new Map(), z = null, H = !1, W = !1, G = !1, K = qn(), re = Jn({ motion: K }), q, ie, J = null, Y = !1, X = !1, Z = a(() => !!u), ae = a(() => !!l.activator), ce = a(() => !Z.value && !ae.value && we(r.anchor)), le = a(() => I.value > 0), ue = a(() => !Z.value && r.scrim), de = a(() => !ue.value || !!p), fe = a(() => ue.value ? "manual" : "auto"), pe = a(() => Z.value ? j.value : r.modelValue), me = a(() => r.variant ?? d?.variant.value ?? "standard"), he = a(() => r.color ?? d?.color.value), ge = a(() => r.closeOnClick), { colorStyle: _e } = dn(he), ve = a(() => {
			if (r.maxLength === void 0) return;
			let e = Tn(r.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))`;
			return {
				"--mat-menu-resolved-max-length": t,
				maxBlockSize: t
			};
		}), ye = a(() => {
			let [e, t] = we(r.offset) ? r.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: ce.value ? "auto" : A
			};
			return ce.value && we(r.anchor) && (n.left = `${r.anchor[0]}px`, n.top = `${r.anchor[1]}px`), n;
		}), be = a(() => {
			let e = b.value;
			if (e) return {
				"--mat-menu-viewport-width": `${e.width}px`,
				"--mat-menu-viewport-height": `${e.height}px`
			};
		}), xe = a(() => {
			let e = b.value;
			if (e) return {
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			};
		}), Se = a(() => [
			_e.value,
			ye.value,
			be.value,
			o.style,
			ve.value
		]), Ce = Ua({
			root: x,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === x.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function we(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function Te() {
			if (Z.value) return u.element.value;
			if (ae.value) {
				let e = m.value ? [...m.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !r.anchor || typeof r.anchor != "string" ? null : document.getElementById(r.anchor);
		}
		function Ee() {
			z &&= (se(z, A), null);
		}
		function De() {
			let e = Te();
			return e ? z === e ? e : (Ee(), z = e, oe(e, A), e) : null;
		}
		function Oe() {
			K.cancel();
		}
		function ke() {
			!ue.value || !h.value || W || (W = !0, h.value.showPopover?.());
		}
		function Ae() {
			W && (W = !1, h.value?.hidePopover?.());
		}
		function je() {
			x.value && H && (H = !1, G = !0, x.value.hidePopover?.()), Ae(), N.value = "closed";
		}
		function Me() {
			Ae(), N.value = "closed";
		}
		function Ne() {
			re.start({
				canStart: () => !!x.value && N.value !== "closing",
				duration: pc,
				getElement: () => x.value,
				isActive: () => N.value === "closing" && !!x.value,
				onFinish: Me,
				onStart: () => {
					N.value = "closing";
				}
			});
		}
		function Pe({ immediate: e = !1 } = {}) {
			if (!(!x.value || !H)) {
				if (G = !0, Be({ immediate: !0 }), e) {
					Oe(), je();
					return;
				}
				N.value !== "closing" && re.start({
					canStart: () => !!(x.value && H) && N.value !== "closing",
					duration: pc,
					getElement: () => x.value,
					isActive: () => N.value === "closing" && !!x.value,
					onFinish: je,
					onStart: () => {
						N.value = "closing";
					}
				});
			}
		}
		function Fe() {
			if (q = void 0, !x.value || !H) return;
			let e = b.value ?? {
				bottom: window.innerHeight,
				left: 0,
				right: window.innerWidth,
				top: 0,
				width: window.innerWidth,
				height: window.innerHeight
			}, t = x.value.style, n = x.value.getBoundingClientRect(), r = Number.parseFloat(t.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, i = Number.parseFloat(t.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, a = Number.parseFloat(getComputedStyle(x.value).getPropertyValue("--mat-menu-viewport-space")), o = Number.isFinite(a) ? a : 8, s = {
				bottom: n.bottom - i,
				left: n.left - r,
				right: n.right - r,
				top: n.top - i
			}, c = 0, l = 0;
			s.left < e.left + o ? c = e.left + o - s.left : s.right > e.right - o && (c = e.right - o - s.right), s.top < e.top + o ? l = e.top + o - s.top : s.bottom > e.bottom - o && (l = e.bottom - o - s.bottom), t.setProperty("--mat-menu-viewport-shift-x", `${c}px`), t.setProperty("--mat-menu-viewport-shift-y", `${l}px`);
		}
		function Ie() {
			if (!p) {
				b.value = null;
				return;
			}
			let e = p.getLayoutRect();
			b.value = e, h.value && Object.assign(h.value.style, {
				height: `${e.height}px`,
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`
			});
		}
		function Le() {
			Ie(), q !== void 0 && cancelAnimationFrame(q), q = requestAnimationFrame(Fe);
		}
		async function Re() {
			Oe(), G = !1, await y();
			let e = ce.value ? null : De(), t = ce.value || !!e;
			if (!x.value || !t) {
				Z.value || (console.warn(ae.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), i("update:modelValue", !1));
				return;
			}
			H || (ce.value && document.activeElement instanceof HTMLElement && (J = document.activeElement), ke(), H = !0, x.value.showPopover?.()), N.value = "open", Z.value && (u.submenuOpen.value = !0), Ce.refresh(), Ce.focusFirst(), Le();
		}
		function ze() {
			let e = Te() ?? J;
			J = null, y(() => e?.focus());
		}
		function Be({ immediate: e = !1 } = {}) {
			L.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function Ve({ focus: e = !0, immediate: t = !1 } = {}) {
			Be({ immediate: t }), Z.value ? (j.value = !1, u.submenuOpen.value = !1) : i("update:modelValue", !1), Pe({ immediate: t }), e && ze();
		}
		function He() {
			if (d) {
				d.closeTree();
				return;
			}
			Ve();
		}
		function Ue(e) {
			e.preventDefault(), Ve();
		}
		function We(e) {
			let t = e.target;
			!(t instanceof Node) || x.value?.contains(t) || h.value?.contains(t) || z?.contains(t) || Ve();
		}
		function Ge() {
			let e = x.value, t = e ? Array.from(e.querySelectorAll("[data-mat-menu-item]")) : [];
			Ro(Array.from(L.values()).filter((e) => !e.grouped), t);
		}
		function Ke(e) {
			L.set(e.element, e), Ge(), y(Ge), Ce.queueRefresh();
		}
		function qe(e) {
			L.delete(e.element), Ge(), y(Ge), Ce.queueRefresh();
		}
		function Je() {
			I.value += 1, Ce.queueRefresh();
		}
		function Ye() {
			I.value = Math.max(0, I.value - 1), Ce.queueRefresh();
		}
		function Xe(e) {
			L.forEach((t) => {
				t !== e && t.closeSubmenu({ focus: !1 });
			});
		}
		function Ze() {
			let { current: e, previous: t } = P;
			for (let n of L.values()) {
				if (!n.submenuOpen?.value) continue;
				let r = n.element?.value, i = n.submenuElement?.value;
				if (!r || !i) continue;
				let a = r.getBoundingClientRect(), o = i.getBoundingClientRect();
				if (Lo(e, t, o, o.left < a.left ? "left" : "right")) return !0;
			}
			return !1;
		}
		function Qe(e) {
			let t = getComputedStyle(x.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), Ce.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), Ce.focusFirst()) : e.key === "End" ? (e.preventDefault(), Ce.focusLast()) : e.key === "Escape" || Z.value && e.key === t ? (e.preventDefault(), Ve()) : e.key === "Tab" && He();
		}
		function $e(e) {
			if (H = e.newState === "open", H) {
				Le();
				return;
			}
			let t = G;
			G = !1, Be(), Z.value && (j.value = !1, u.submenuOpen.value = !1), !(!pe.value || t) && (Ne(), Z.value || i("update:modelValue", !1), ze());
		}
		k(No, {
			closeOtherSubmenus: Xe,
			closeTree: He,
			closeOnClick: ge,
			color: he,
			isPointerInOpenSubmenuTriangle: Ze,
			registerItem: Ke,
			registerGroup: Je,
			unregisterItem: qe,
			unregisterGroup: Ye,
			variant: me
		}), u && u.registerSubmenu({
			close: Ve,
			element: x,
			id: T,
			open: Re
		}), E(() => {
			Ce.observe(), window.addEventListener("resize", Le), window.addEventListener("scroll", Le, {
				capture: !0,
				passive: !0
			}), pe.value && (tt(), rt()), typeof ResizeObserver < "u" && (ie = new ResizeObserver(Le), ie.observe(x.value)), pe.value && Re();
		}), D(() => {
			Ge(), !(Z.value || !pe.value || ce.value) && Te() !== z && (Ee(), Re());
		}), w(() => {
			Oe(), q !== void 0 && cancelAnimationFrame(q), ie?.disconnect(), window.removeEventListener("resize", Le), window.removeEventListener("scroll", Le, { capture: !0 }), nt(), it(), Pe({ immediate: !0 }), Ae(), Ee(), u?.unregisterSubmenu();
		});
		function et(e) {
			P.previous = P.current, P.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function tt() {
			d || Y || (document.addEventListener("pointermove", et, !0), Y = !0);
		}
		function nt() {
			Y &&= (document.removeEventListener("pointermove", et, !0), !1);
		}
		function rt() {
			d || !de.value || X || (document.addEventListener("pointerdown", We, !0), X = !0);
		}
		function it() {
			X &&= (document.removeEventListener("pointerdown", We, !0), !1);
		}
		return V(pe, (e) => {
			e ? (tt(), rt(), Re()) : (nt(), it(), Pe());
		}), V(() => r.anchor, async () => {
			Ee(), pe.value && await Re();
		}, { deep: !0 }), V(() => r.offset, async () => {
			pe.value && (await y(), Le());
		}, { deep: !0 }), V(() => r.maxLength, async () => {
			pe.value && (await y(), Le());
		}), V(() => r.scrim, async () => {
			Z.value || (x.value && H && (H = !1, G = !0, x.value.hidePopover?.()), Ae(), it(), await y(), pe.value && (rt(), await Re()));
		}), p && V(p.publicContext.layout, Le), (e, n) => (O(), c(t, null, [
			!Z.value && ae.value ? (O(), c("span", {
				key: 0,
				ref_key: "activatorHost",
				ref: m,
				class: "mat-menu__activator"
			}, [F(e.$slots, "activator", {}, void 0, !0)], 512)) : s("", !0),
			!Z.value && B(r).scrim ? (O(), c("div", {
				key: 1,
				ref_key: "scrimElement",
				ref: h,
				"aria-hidden": "true",
				class: "mat-menu__scrim",
				popover: "manual",
				style: S(xe.value),
				onPointerdown: Ue
			}, null, 36)) : s("", !0),
			f(wa, v({
				id: T.value,
				ref_key: "surface",
				ref: _
			}, e.$attrs, {
				class: ["mat-menu", [`mat-menu--${me.value}`, {
					"mat-menu--coordinate": ce.value,
					"mat-menu--grouped": le.value,
					"mat-menu--nested": Z.value,
					"mat-menu--closing": N.value === "closing"
				}]],
				style: Se.value,
				popover: fe.value,
				role: "menu",
				onFocusin: B(Ce).handleFocusIn,
				onKeydown: Qe,
				onToggle: $e
			}), {
				default: U(() => [f(ns, {
					class: "mat-menu__surface",
					"bar-width": "hidden"
				}, {
					default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
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
}), [["__scopeId", "data-v-3766e101"]]), hc = { class: "mat-menu-item-host" }, gc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatMenuItem",
	inheritAttrs: !1
}, {
	__name: "MatMenuItem",
	props: {
		disabled: {
			type: Boolean,
			default: !1
		},
		selected: {
			type: Boolean,
			default: !1
		},
		tooltip: {
			type: String,
			default: void 0
		}
	},
	emits: { click: (e) => e instanceof MouseEvent },
	setup(e, { emit: t }) {
		let n = $("menuItem", e), r = t, i = ne(), l = g(No, null), d = g(Fo, null), p = g(At, kt), m = M(null), h = a(() => m.value?.root ?? m.value?.$el ?? null), _ = M(!1), y = M(void 0), b = M("only"), x = a(() => !!d), S, C = a(() => !!i.submenu);
		function T({ focus: e = !1, immediate: t = !1 } = {}) {
			_.value = !1, S?.close({
				focus: e,
				immediate: t
			});
		}
		async function D({ pointer: e = !1 } = {}) {
			!C.value || n.disabled || e && l?.isPointerInOpenSubmenuTriangle?.() || (l?.closeOtherSubmenus(N), _.value = !0, await S?.open());
		}
		function A(e) {
			S = e, y.value = e.id.value;
		}
		function j() {
			S = void 0, y.value = void 0, _.value = !1;
		}
		let N = {
			closeSubmenu: T,
			element: h,
			grouped: !!d,
			setPosition(e) {
				b.value = e;
			},
			submenuElement: a(() => S?.element?.value ?? null),
			submenuOpen: _
		};
		function P(e) {
			if (C.value) {
				D();
				return;
			}
			r("click", e), l?.closeOnClick.value && l.closeTree();
		}
		function I(e) {
			if (!C.value) return;
			let t = getComputedStyle(h.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), D());
		}
		return k(Po, {
			element: h,
			registerSubmenu: A,
			submenuOpen: _,
			unregisterSubmenu: j
		}), E(() => {
			d?.registerItem(N), l?.registerItem(N);
		}), w(() => {
			d?.unregisterItem(N), l?.unregisterItem(N);
		}), (e, t) => (O(), c("span", hc, [B(n).tooltip ? (O(), o(Ir, {
			key: 0,
			content: B(n).tooltip
		}, {
			activator: U(() => [f(Mt, v({
				ref_key: "action",
				ref: m
			}, e.$attrs, {
				class: ["mat-menu-item", [`mat-menu-item--${b.value}`, {
					"mat-menu-item--grouped": x.value,
					"mat-menu-item--selected": B(n).selected,
					"mat-menu-item--submenu-open": _.value
				}]],
				"data-mat-menu-item": "",
				"aria-controls": C.value ? y.value : void 0,
				"aria-expanded": C.value ? String(_.value) : void 0,
				"aria-haspopup": C.value ? "menu" : void 0,
				"aria-selected": B(n).selected ? "true" : void 0,
				disabled: B(n).disabled,
				role: "menuitem",
				"use-cursor": B(p).useCursor,
				onClick: P,
				onKeydown: I,
				onPointerenter: t[0] ||= (e) => D({ pointer: !0 })
			}), {
				default: U(() => [f(yo, {
					namespace: "mat-menu-item-content",
					"label-typography-class": "mat-sys-typescale-label-large",
					"line-count": e.$slots.supporting ? 2 : 1,
					"supporting-typography-class": "mat-sys-typescale-body-small",
					"trailing-typography-class": "mat-sys-typescale-label-large"
				}, u({
					trailing: U(() => [e.$slots.trailing ? F(e.$slots, "trailing", { key: 0 }, void 0, !0) : C.value ? (O(), o(hn, {
						key: 1,
						as: "span",
						class: "mat-menu-item__submenu-icon",
						icon: "chevron_right",
						"optical-size": 20,
						size: "small",
						"aria-hidden": "true"
					})) : s("", !0)]),
					default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
					_: 2
				}, [e.$slots.leading ? {
					name: "leading",
					fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0, e.$slots.supporting ? {
					name: "supporting",
					fn: U(() => [F(e.$slots, "supporting", {}, void 0, !0)]),
					key: "1"
				} : void 0]), 1032, ["line-count"])]),
				_: 3
			}, 16, [
				"class",
				"aria-controls",
				"aria-expanded",
				"aria-haspopup",
				"aria-selected",
				"disabled",
				"use-cursor"
			])]),
			_: 3
		}, 8, ["content"])) : (O(), o(Mt, v({
			key: 1,
			ref_key: "action",
			ref: m
		}, e.$attrs, {
			class: ["mat-menu-item", [`mat-menu-item--${b.value}`, {
				"mat-menu-item--grouped": x.value,
				"mat-menu-item--selected": B(n).selected,
				"mat-menu-item--submenu-open": _.value
			}]],
			"data-mat-menu-item": "",
			"aria-controls": C.value ? y.value : void 0,
			"aria-expanded": C.value ? String(_.value) : void 0,
			"aria-haspopup": C.value ? "menu" : void 0,
			"aria-selected": B(n).selected ? "true" : void 0,
			disabled: B(n).disabled,
			role: "menuitem",
			"use-cursor": B(p).useCursor,
			onClick: P,
			onKeydown: I,
			onPointerenter: t[1] ||= (e) => D({ pointer: !0 })
		}), {
			default: U(() => [f(yo, {
				namespace: "mat-menu-item-content",
				"label-typography-class": "mat-sys-typescale-label-large",
				"line-count": e.$slots.supporting ? 2 : 1,
				"supporting-typography-class": "mat-sys-typescale-body-small",
				"trailing-typography-class": "mat-sys-typescale-label-large"
			}, u({
				trailing: U(() => [e.$slots.trailing ? F(e.$slots, "trailing", { key: 0 }, void 0, !0) : C.value ? (O(), o(hn, {
					key: 1,
					as: "span",
					class: "mat-menu-item__submenu-icon",
					icon: "chevron_right",
					"optical-size": 20,
					size: "small",
					"aria-hidden": "true"
				})) : s("", !0)]),
				default: U(() => [F(e.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [e.$slots.leading ? {
				name: "leading",
				fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, e.$slots.supporting ? {
				name: "supporting",
				fn: U(() => [F(e.$slots, "supporting", {}, void 0, !0)]),
				key: "1"
			} : void 0]), 1032, ["line-count"])]),
			_: 3
		}, 16, [
			"class",
			"aria-controls",
			"aria-expanded",
			"aria-haspopup",
			"aria-selected",
			"disabled",
			"use-cursor"
		])), e.$slots.submenu ? F(e.$slots, "submenu", { key: 2 }, void 0, !0) : s("", !0)]));
	}
}), [["__scopeId", "data-v-76262001"]]), _c = ["aria-labelledby"], vc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatMenuGroup",
	inheritAttrs: !1
}, {
	__name: "MatMenuGroup",
	props: { label: {
		type: String,
		default: void 0
	} },
	setup(e) {
		let t = $("menuGroup", e), n = ee(), r = g(No, null), i = `${te().replace(/[^\w-]/g, "-")}-label`, o = a(() => t.label ? i : n["aria-labelledby"]), l = M(null), u = /* @__PURE__ */ new Set();
		function d() {
			let e = l.value, t = e ? Array.from(e.querySelectorAll("[data-mat-menu-item]")) : [];
			Ro(Array.from(u), t);
		}
		function f(e) {
			u.add(e), d(), y(d);
		}
		function p(e) {
			u.delete(e), d(), y(d);
		}
		return k(Fo, {
			registerItem: f,
			unregisterItem: p
		}), E(() => r?.registerGroup()), D(d), w(() => r?.unregisterGroup()), (e, n) => (O(), c("div", v({
			ref_key: "groupRoot",
			ref: l
		}, e.$attrs, {
			class: ["mat-menu-group", { "mat-menu-group--labeled": !!B(t).label }],
			"aria-labelledby": o.value,
			role: "group"
		}), [B(t).label ? (O(), c("div", {
			key: 0,
			id: i,
			class: "mat-menu-group__label mat-sys-typescale-label-large"
		}, z(B(t).label), 1)) : s("", !0), F(e.$slots, "default", {}, void 0, !0)], 16, _c));
	}
}), [["__scopeId", "data-v-b34883b5"]]), yc = [
	"id",
	"aria-describedby",
	"aria-label",
	"aria-disabled",
	"aria-expanded",
	"aria-invalid",
	"aria-readonly",
	"tabindex"
], bc = {
	key: 0,
	class: "mat-select__chips"
}, xc = {
	key: 1,
	class: "mat-select__value"
}, Sc = {
	key: 2,
	class: "mat-select__placeholder"
}, Cc = [
	"disabled",
	"multiple",
	"required"
], wc = ["selected"], Tc = [
	"disabled",
	"selected",
	"value"
], Ec = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
				return e === null || Wa(e) || Array.isArray(e) && e.every(Wa);
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
			validator: (e) => uc.includes(e)
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
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
		},
		selectionIndicator: {
			type: String,
			default: "check",
			validator: (e) => [
				"check",
				"checkbox",
				"none"
			].includes(e)
		}
	},
	emits: {
		"update:modelValue": (e) => e === null || Wa(e) || Array.isArray(e) && e.every(Wa),
		change: (e) => e === null || Wa(e) || Array.isArray(e) && e.every(Wa)
	},
	setup(e, { emit: n }) {
		let r = $("select", e), i = n, p = ee(), m = g(At, kt), h = M(!1), _ = M(!1), x = M(null), C = te().replace(/[^\w-]/g, "-"), w = a(() => p.id ?? `${C}-select`), T = a(() => ({
			form: p.form,
			name: p.name
		}));
		function E(e, t) {
			if (typeof e == "string") return {
				disabled: !1,
				group: t,
				subtitle: void 0,
				title: e,
				tooltip: void 0,
				value: e
			};
			if (!e || typeof e != "object" || Array.isArray(e) || "items" in e) return null;
			let n = e[r.itemTitle], i = e[r.itemValue], a = e[r.itemSubtitle], o = typeof e.tooltip == "string" ? e.tooltip : void 0;
			return typeof n != "string" || !Wa(i) ? null : {
				disabled: e.disabled === !0,
				group: t,
				subtitle: a === void 0 ? void 0 : String(a),
				title: n,
				tooltip: o,
				value: i
			};
		}
		let D = a(() => {
			let e = [], t = [], n = [], i = /* @__PURE__ */ new Set();
			function a(t, r) {
				let a = E(t, r);
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
		}), k = a(() => D.value.options.filter((e) => r.multiple ? Array.isArray(r.modelValue) && r.modelValue.some((t) => Object.is(t, e.value)) : Object.is(r.modelValue, e.value))), A = a(() => k.value.map((e) => e.title).join(",")), j = a(() => k.value.length > 0), N = `${C}-menu`;
		V(() => [r.modelValue, r.multiple], ([e, t]) => {}, { immediate: !0 });
		function I(e) {
			return k.value.some((t) => Object.is(t.value, e));
		}
		function L(e) {
			if (r.disabled || r.readonly) return;
			let t;
			if (r.multiple) {
				let n = Array.isArray(r.modelValue) ? r.modelValue : [];
				t = n.some((t) => Object.is(t, e)) ? n.filter((t) => !Object.is(t, e)) : [...n, e];
			} else t = e, h.value = !1;
			i("update:modelValue", t), i("change", t);
		}
		function R() {
			r.disabled || r.readonly || (h.value = !h.value);
		}
		function ne(e) {
			[
				"Enter",
				" ",
				"ArrowDown",
				"ArrowUp"
			].includes(e.key) && (e.preventDefault(), h.value || R());
		}
		function H(e) {
			r.disabled || r.readonly || (r.multiple ? L(e) : (i("update:modelValue", null), i("change", null)), y(() => x.value?.focus()));
		}
		return (e, n) => (O(), c("div", {
			class: b(["mat-select", [{ "mat-select--use-cursor": B(m).useCursor }, e.$attrs.class]]),
			style: S(e.$attrs.style)
		}, [
			f(lc, {
				id: w.value,
				control: "custom",
				"model-value": A.value,
				label: B(r).label,
				variant: B(r).variant,
				color: B(r).color,
				"supporting-text": B(r).supportingText,
				"error-text": B(r).errorText,
				"prefix-text": B(r).prefixText,
				"suffix-text": B(r).suffixText,
				disabled: B(r).disabled,
				readonly: B(r).readonly,
				required: B(r).required,
				error: B(r).error,
				"custom-focused": _.value || h.value,
				placeholder: B(r).placeholder
			}, u({
				control: U(({ controlId: i, describedBy: a }) => [l("div", {
					id: i,
					ref_key: "trigger",
					ref: x,
					class: "mat-select__trigger mat-text-input__control",
					role: "combobox",
					"aria-controls": N,
					"aria-describedby": a,
					"aria-label": e.$attrs["aria-label"] ?? B(r).label,
					"aria-disabled": B(r).disabled ? "true" : void 0,
					"aria-expanded": String(h.value),
					"aria-invalid": B(r).error ? "true" : void 0,
					"aria-haspopup": "menu",
					"aria-readonly": B(r).readonly ? "true" : void 0,
					tabindex: B(r).disabled ? -1 : 0,
					onBlur: n[1] ||= (e) => _.value = !1,
					onClick: R,
					onFocus: n[2] ||= (e) => _.value = !0,
					onKeydown: ne
				}, [
					B(r).chips && j.value ? (O(), c("span", bc, [(O(!0), c(t, null, P(k.value, (e) => (O(), o(ts, {
						key: `${typeof e.value}:${String(e.value)}`,
						variant: "input",
						selected: I(e.value),
						disabled: B(r).disabled || B(r).readonly,
						onClick: n[0] ||= K(() => {}, ["stop"]),
						onRemove: (t) => H(e.value)
					}, {
						default: U(() => [d(z(e.title), 1)]),
						_: 2
					}, 1032, [
						"selected",
						"disabled",
						"onRemove"
					]))), 128))])) : j.value ? (O(), c("span", xc, z(A.value), 1)) : (O(), c("span", Sc, z(B(r).placeholder), 1)),
					n[4] ||= l("span", { class: "mat-select__spacer" }, null, -1),
					f(hn, {
						as: "span",
						icon: "arrow_drop_down",
						"optical-size": 24,
						size: "24px",
						"aria-hidden": "true"
					})
				], 40, yc)]),
				_: 2
			}, [e.$slots.leading ? {
				name: "leading",
				fn: U(() => [F(e.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, e.$slots.trailing ? {
				name: "trailing",
				fn: U(() => [F(e.$slots, "trailing", {}, void 0, !0)]),
				key: "1"
			} : void 0]), 1032, [
				"id",
				"model-value",
				"label",
				"variant",
				"color",
				"supporting-text",
				"error-text",
				"prefix-text",
				"suffix-text",
				"disabled",
				"readonly",
				"required",
				"error",
				"custom-focused",
				"placeholder"
			]),
			l("select", v(T.value, {
				class: "mat-select__native",
				disabled: B(r).disabled,
				multiple: B(r).multiple,
				required: B(r).required,
				tabindex: "-1",
				"aria-hidden": "true"
			}), [B(r).multiple ? s("", !0) : (O(), c("option", {
				key: 0,
				value: "",
				selected: !j.value
			}, null, 8, wc)), (O(!0), c(t, null, P(D.value.options, (e) => (O(), c("option", {
				key: `${typeof e.value}:${String(e.value)}`,
				disabled: e.disabled,
				selected: I(e.value),
				value: String(e.value)
			}, z(e.title), 9, Tc))), 128))], 16, Cc),
			f(mc, {
				id: N,
				modelValue: h.value,
				"onUpdate:modelValue": n[3] ||= (e) => h.value = e,
				anchor: w.value,
				"close-on-click": !B(r).multiple
			}, {
				default: U(() => [D.value.groups.length === 0 ? (O(!0), c(t, { key: 0 }, P(D.value.ungrouped, (e) => (O(), o(gc, {
					key: `${typeof e.value}:${String(e.value)}`,
					disabled: e.disabled,
					selected: B(r).selectionIndicator === "check" && I(e.value),
					tooltip: e.tooltip,
					onClick: (t) => L(e.value)
				}, u({
					default: U(() => [d(" " + z(e.title) + " ", 1)]),
					_: 2
				}, [(B(r).selectionIndicator === "check" ? I(e.value) : B(r).selectionIndicator === "checkbox") ? {
					name: "leading",
					fn: U(() => [B(r).selectionIndicator === "check" ? (O(), o(hn, {
						key: 0,
						"aria-hidden": "true",
						as: "span",
						icon: "check",
						"optical-size": 20,
						size: "20px"
					})) : B(r).selectionIndicator === "checkbox" ? (O(), o(Go, {
						key: 1,
						"aria-hidden": "true",
						inert: "",
						tabindex: "-1",
						"model-value": I(e.value)
					}, null, 8, ["model-value"])) : s("", !0)]),
					key: "0"
				} : void 0, e.subtitle ? {
					name: "supporting",
					fn: U(() => [d(z(e.subtitle), 1)]),
					key: "1"
				} : void 0]), 1032, [
					"disabled",
					"selected",
					"tooltip",
					"onClick"
				]))), 128)) : D.value.ungrouped.length > 0 ? (O(), o(vc, { key: 1 }, {
					default: U(() => [(O(!0), c(t, null, P(D.value.ungrouped, (e) => (O(), o(gc, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						selected: B(r).selectionIndicator === "check" && I(e.value),
						tooltip: e.tooltip,
						onClick: (t) => L(e.value)
					}, u({
						default: U(() => [d(" " + z(e.title) + " ", 1)]),
						_: 2
					}, [(B(r).selectionIndicator === "check" ? I(e.value) : B(r).selectionIndicator === "checkbox") ? {
						name: "leading",
						fn: U(() => [B(r).selectionIndicator === "check" ? (O(), o(hn, {
							key: 0,
							"aria-hidden": "true",
							as: "span",
							icon: "check",
							"optical-size": 20,
							size: "20px"
						})) : B(r).selectionIndicator === "checkbox" ? (O(), o(Go, {
							key: 1,
							"aria-hidden": "true",
							inert: "",
							tabindex: "-1",
							"model-value": I(e.value)
						}, null, 8, ["model-value"])) : s("", !0)]),
						key: "0"
					} : void 0, e.subtitle ? {
						name: "supporting",
						fn: U(() => [d(z(e.subtitle), 1)]),
						key: "1"
					} : void 0]), 1032, [
						"disabled",
						"selected",
						"tooltip",
						"onClick"
					]))), 128))]),
					_: 1
				})) : s("", !0), (O(!0), c(t, null, P(D.value.groups, (e) => (O(), o(vc, {
					key: e.label,
					label: e.label
				}, {
					default: U(() => [(O(!0), c(t, null, P(e.options, (e) => (O(), o(gc, {
						key: `${typeof e.value}:${String(e.value)}`,
						disabled: e.disabled,
						selected: B(r).selectionIndicator === "check" && I(e.value),
						tooltip: e.tooltip,
						onClick: (t) => L(e.value)
					}, u({
						default: U(() => [d(" " + z(e.title) + " ", 1)]),
						_: 2
					}, [(B(r).selectionIndicator === "check" ? I(e.value) : B(r).selectionIndicator === "checkbox") ? {
						name: "leading",
						fn: U(() => [B(r).selectionIndicator === "check" ? (O(), o(hn, {
							key: 0,
							"aria-hidden": "true",
							as: "span",
							icon: "check",
							"optical-size": 20,
							size: "20px"
						})) : B(r).selectionIndicator === "checkbox" ? (O(), o(Go, {
							key: 1,
							"aria-hidden": "true",
							inert: "",
							tabindex: "-1",
							"model-value": I(e.value)
						}, null, 8, ["model-value"])) : s("", !0)]),
						key: "0"
					} : void 0, e.subtitle ? {
						name: "supporting",
						fn: U(() => [d(z(e.subtitle), 1)]),
						key: "1"
					} : void 0]), 1032, [
						"disabled",
						"selected",
						"tooltip",
						"onClick"
					]))), 128))]),
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
}), [["__scopeId", "data-v-aca83b85"]]), Dc = /*@__PURE__*/ Object.assign({
	name: "MatTextarea",
	inheritAttrs: !1
}, {
	__name: "MatTextarea",
	props: {
		...dc,
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
		let n = $("textarea", e), r = p();
		function i() {
			return Object.hasOwn(r.vnode.props ?? {}, "rows") ? n.rows : 1;
		}
		let a = t;
		return (e, t) => (O(), o(lc, v({
			...e.$attrs,
			...B(n)
		}, {
			control: "textarea",
			"resize-min-rows": i(),
			"onUpdate:modelValue": t[0] ||= (e) => a("update:modelValue", e)
		}), u({ _: 2 }, [e.$slots.leading ? {
			name: "leading",
			fn: U(() => [F(e.$slots, "leading")]),
			key: "0"
		} : void 0, e.$slots.trailing ? {
			name: "trailing",
			fn: U(() => [F(e.$slots, "trailing")]),
			key: "1"
		} : void 0]), 1040, ["resize-min-rows"]));
	}
}), Oc = { class: "mat-docked-container__panel" }, kc = ["id"], Ac = { class: "mat-docked-container__body" }, jc = {
	key: 1,
	class: "mat-docked-container__actions"
}, Mc = 200, Nc = 150, Pc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Cn(e, {
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
			validator: Ht
		},
		maxLength: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Cn(e, {
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
		}), i = $("dockedContainer", e), o = n, u = ee(), p = ne(), m = g(Yn, null), h = M(null), _ = M(null), b = M(null), x = R(null), C = a(() => b.value?.root ?? b.value?.$el ?? null), T = te().replace(/[^\w-]/g, "-"), k = a(() => u.id ?? `${T}-docked-container`), A = a(() => `${T}-headline`), j = `--mat-docked-container-anchor-${T}`, N = M("closed"), P = null, I = !1, L = !1, H = !1, W = qn(), G = Jn({ motion: W }), K, re, q = null, ie = !1, J = a(() => !!p.activator), Y = a(() => !J.value && ye(i.anchor)), X = a(() => i.scrim), Z = a(() => !X.value || !!m), ae = a(() => X.value ? "manual" : "auto"), ce = a(() => i.modelValue), le = a(() => i.variant ?? "standard"), ue = a(() => i.color), de = a(() => i.headline !== void 0 || !!p.headline), { colorStyle: fe } = dn(ue), pe = a(() => {
			if (i.width !== void 0) {
				let e = Tn(i.width, {
					property: "inline-size",
					positive: !0
				});
				if (e !== void 0) return { inlineSize: `min(${e}, calc(var(--mat-docked-container-viewport-width) - (2 * var(--mat-docked-container-viewport-space))))` };
			}
			if (i.size && r[i.size]) return { inlineSize: `min(${r[i.size]}, calc(var(--mat-docked-container-viewport-width) - (2 * var(--mat-docked-container-viewport-space))))` };
		}), me = a(() => {
			if (i.maxLength === void 0) return;
			let e = Tn(i.maxLength, {
				property: "max-block-size",
				positive: !0
			});
			if (e === void 0) return;
			let t = `min(${e}, calc(var(--mat-docked-container-viewport-height) - (2 * var(--mat-docked-container-viewport-space))))`;
			return {
				"--mat-docked-container-resolved-max-length": t,
				maxBlockSize: t
			};
		}), he = a(() => {
			let [e, t] = ye(i.offset) ? i.offset : [0, 0], n = {
				"--mat-docked-container-offset-x": `${e}px`,
				"--mat-docked-container-offset-y": `${t}px`,
				positionAnchor: Y.value ? "auto" : j
			};
			return Y.value && ye(i.anchor) && (n.left = `${i.anchor[0]}px`, n.top = `${i.anchor[1]}px`), n;
		}), ge = a(() => {
			let e = x.value;
			if (e) return {
				"--mat-docked-container-viewport-width": `${e.width}px`,
				"--mat-docked-container-viewport-height": `${e.height}px`
			};
		}), _e = a(() => {
			let e = x.value;
			if (e) return {
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			};
		}), ve = a(() => [
			fe.value,
			he.value,
			ge.value,
			pe.value,
			me.value,
			u.style
		]);
		function ye(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function be() {
			if (J.value) {
				let e = h.value ? [...h.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !i.anchor || typeof i.anchor != "string" ? null : document.getElementById(i.anchor);
		}
		function xe() {
			P &&= (se(P, j), null);
		}
		function Se() {
			let e = be();
			return e ? P === e ? e : (xe(), P = e, oe(e, j), e) : null;
		}
		function Ce() {
			W.cancel();
		}
		function we() {
			!X.value || !_.value || L || (L = !0, _.value.showPopover?.());
		}
		function Te() {
			L && (L = !1, _.value?.hidePopover?.());
		}
		function Ee() {
			C.value && I && (I = !1, H = !0, C.value.hidePopover?.()), Te(), N.value = "closed", o("closed");
		}
		function De() {
			Te(), N.value = "closed", o("closed");
		}
		function Oe() {
			G.start({
				canStart: () => !!C.value && N.value !== "closing",
				duration: Mc,
				getElement: () => C.value,
				isActive: () => N.value === "closing" && !!C.value,
				onFinish: De,
				onStart: () => {
					N.value = "closing";
				}
			});
		}
		function ke({ immediate: e = !1 } = {}) {
			if (!(!C.value || !I)) {
				if (H = !0, e) {
					Ce(), Ee();
					return;
				}
				N.value !== "closing" && G.start({
					canStart: () => !!(C.value && I) && N.value !== "closing",
					duration: Mc,
					getElement: () => C.value,
					isActive: () => N.value === "closing" && !!C.value,
					onFinish: Ee,
					onStart: () => {
						N.value = "closing";
					}
				});
			}
		}
		function Ae() {
			if (K = void 0, !C.value || !I) return;
			let e = x.value ?? {
				bottom: window.innerHeight,
				left: 0,
				right: window.innerWidth,
				top: 0,
				width: window.innerWidth,
				height: window.innerHeight
			}, t = C.value.style, n = C.value.getBoundingClientRect(), r = Number.parseFloat(t.getPropertyValue("--mat-docked-container-viewport-shift-x")) || 0, i = Number.parseFloat(t.getPropertyValue("--mat-docked-container-viewport-shift-y")) || 0, a = Number.parseFloat(getComputedStyle(C.value).getPropertyValue("--mat-docked-container-viewport-space")), o = Number.isFinite(a) ? a : 8, s = {
				bottom: n.bottom - i,
				left: n.left - r,
				right: n.right - r,
				top: n.top - i
			}, c = 0, l = 0;
			s.left < e.left + o ? c = e.left + o - s.left : s.right > e.right - o && (c = e.right - o - s.right), s.top < e.top + o ? l = e.top + o - s.top : s.bottom > e.bottom - o && (l = e.bottom - o - s.bottom), t.setProperty("--mat-docked-container-viewport-shift-x", `${c}px`), t.setProperty("--mat-docked-container-viewport-shift-y", `${l}px`);
		}
		function je() {
			if (!m) {
				x.value = null;
				return;
			}
			let e = m.getLayoutRect();
			x.value = e, _.value && Object.assign(_.value.style, {
				height: `${e.height}px`,
				left: `${e.left}px`,
				top: `${e.top}px`,
				width: `${e.width}px`
			});
		}
		function Me() {
			je(), K !== void 0 && cancelAnimationFrame(K), K = requestAnimationFrame(Ae);
		}
		async function Ne() {
			Ce(), H = !1, await y();
			let e = Y.value ? null : Se(), t = Y.value || !!e;
			if (!C.value || !t) {
				console.warn(J.value ? "MatDockedContainer: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatDockedContainer: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), o("update:modelValue", !1);
				return;
			}
			I || (Y.value && document.activeElement instanceof HTMLElement && (q = document.activeElement), we(), I = !0, C.value.showPopover?.()), Me(), N.value = "opening", W.wait(C.value, Nc, () => {
				N.value = "open", o("opened");
			});
		}
		function Pe() {
			let e = be() ?? q;
			q = null, y(() => {
				e && typeof e.focus == "function" && e.focus();
			});
		}
		function Fe({ focus: e = !0, immediate: t = !1 } = {}) {
			o("update:modelValue", !1), ke({ immediate: t }), e && Pe();
		}
		function Ie(e) {
			e.preventDefault(), Fe();
		}
		function Le(e) {
			let t = e.target;
			!(t instanceof Node) || C.value?.contains(t) || _.value?.contains(t) || P?.contains(t) || Fe();
		}
		function Re(e) {
			e.key === "Escape" && (e.preventDefault(), Fe());
		}
		function ze(e) {
			if (I = e.newState === "open", I) {
				Me();
				return;
			}
			let t = H;
			H = !1, !(!ce.value || t) && (Oe(), o("update:modelValue", !1), Pe());
		}
		E(() => {
			window.addEventListener("resize", Me), window.addEventListener("scroll", Me, {
				capture: !0,
				passive: !0
			}), ce.value && Be(), typeof ResizeObserver < "u" && C.value && (re = new ResizeObserver(Me), re.observe(C.value)), ce.value && Ne();
		}), D(() => {
			!ce.value || Y.value || be() !== P && (xe(), Ne());
		}), w(() => {
			Ce(), K !== void 0 && cancelAnimationFrame(K), re?.disconnect(), window.removeEventListener("resize", Me), window.removeEventListener("scroll", Me, { capture: !0 }), Ve(), ke({ immediate: !0 }), Te(), xe();
		});
		function Be() {
			!Z.value || ie || (document.addEventListener("pointerdown", Le, !0), ie = !0);
		}
		function Ve() {
			ie &&= (document.removeEventListener("pointerdown", Le, !0), !1);
		}
		return V(ce, (e) => {
			e ? (Be(), Ne()) : (Ve(), ke(), Pe());
		}), V(() => i.anchor, async () => {
			xe(), ce.value && await Ne();
		}, { deep: !0 }), V(() => i.offset, async () => {
			ce.value && (await y(), Me());
		}, { deep: !0 }), V(() => i.maxLength, async () => {
			ce.value && (await y(), Me());
		}), V(() => i.scrim, async () => {
			C.value && I && (I = !1, H = !0, C.value.hidePopover?.()), Te(), Ve(), await y(), ce.value && (Be(), await Ne());
		}), m && V(m.publicContext.layout, Me), (e, n) => (O(), c(t, null, [
			J.value ? (O(), c("span", {
				key: 0,
				ref_key: "activatorHost",
				ref: h,
				class: "mat-docked-container__activator"
			}, [F(e.$slots, "activator", {}, void 0, !0)], 512)) : s("", !0),
			B(i).scrim ? (O(), c("div", {
				key: 1,
				ref_key: "scrimElement",
				ref: _,
				"aria-hidden": "true",
				class: "mat-docked-container__scrim",
				popover: "manual",
				style: S(_e.value),
				onPointerdown: Ie
			}, null, 36)) : s("", !0),
			f(wa, v({
				id: k.value,
				ref_key: "surface",
				ref: b
			}, e.$attrs, {
				class: ["mat-docked-container", [`mat-docked-container--${le.value}`, {
					"mat-docked-container--coordinate": Y.value,
					"mat-docked-container--closing": N.value === "closing"
				}]],
				style: ve.value,
				popover: ae.value,
				"aria-labelledby": e.$attrs["aria-labelledby"] ?? (de.value ? A.value : void 0),
				role: "region",
				tabindex: "-1",
				onKeydown: Re,
				onToggle: ze
			}), {
				default: U(() => [l("div", Oc, [
					de.value ? (O(), c("header", {
						key: 0,
						id: A.value,
						class: "mat-docked-container__headline mat-sys-typescale-title-medium"
					}, [e.$slots.headline ? F(e.$slots, "headline", { key: 0 }, void 0, !0) : B(i).headline === void 0 ? s("", !0) : (O(), c(t, { key: 1 }, [d(z(B(i).headline), 1)], 64))], 8, kc)) : s("", !0),
					l("div", Ac, [F(e.$slots, "default", {}, void 0, !0)]),
					e.$slots.actions ? (O(), c("footer", jc, [F(e.$slots, "actions", {}, void 0, !0)])) : s("", !0)
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
}), [["__scopeId", "data-v-33472a63"]]), Fc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatSpacer",
	inheritAttrs: !1
}, {
	__name: "MatSpacer",
	setup(e) {
		return (e, t) => (O(), c("span", v(e.$attrs, {
			class: "mat-spacer",
			"aria-hidden": "true"
		}), null, 16));
	}
}), [["__scopeId", "data-v-cf9d6504"]]), Ic = { class: "mat-dialog__header" }, Lc = {
	key: 1,
	class: "mat-dialog__actions"
}, Rc = { class: "mat-dialog__content-body" }, zc = {
	key: 0,
	class: "mat-dialog__icon"
}, Bc = { class: "mat-dialog__content-body" }, Vc = {
	key: 3,
	class: "mat-dialog__actions"
}, Hc = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Cn(e, {
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
			validator: Ht
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: r }) {
		let i = $("dialog", e), u = r, m = ee(), h = ne(), _ = p(), b = g(Yn, null), x = Object.prototype.hasOwnProperty.call(_?.vnode.props ?? {}, "attach"), C = M(null), T = M(null), D = M(!1), k = M("closed"), A = M(null), j = R(null), N = `${te().replace(/[^\w-]/g, "-")}-title`, P = a(() => T.value?.root ?? T.value?.$el ?? null), I = a(() => !!j.value), L = a(() => i.title !== void 0 || !!h.title), W = a(() => i.content !== void 0 || !!h.default), G = a(() => !i.fullScreen && (i.icon !== void 0 || !!h.icon)), K = a(() => !!h.activator), re = a(() => si.value.at(-1) === P.value), { colorStyle: q } = dn(a(() => i.color)), ie = a(() => {
			if (i.fullScreen || i.width === void 0) return;
			let e = Tn(i.width, {
				property: "inline-size",
				positive: !0
			});
			if (e !== void 0) return {
				inlineSize: `min(${e}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), J = a(() => [m.style]), Y = a(() => [q.value, ie.value]), X = !1, Z = qn(), ae = Jn({ motion: Z }), oe = null;
		Ei(P, a(() => D.value && re.value));
		function se() {
			let e = C.value ? [...C.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function ce() {
			Z.cancel();
		}
		function le(e, t) {
			Z.wait(P.value, e, t);
		}
		function ue() {
			if (typeof i.attach == "string") try {
				return document.querySelector(i.attach);
			} catch {
				return null;
			}
			return i.attach instanceof HTMLElement && i.attach.ownerDocument === document ? i.attach : null;
		}
		function de(e) {
			if (b && !x) return {
				context: b,
				target: b.modalLayer.value
			};
			if (x) {
				let t = e ? $n(e) : null;
				if (t) return {
					context: t,
					target: t.modalLayer.value
				};
			}
			return null;
		}
		function fe(e) {
			return {
				inertElement: e.contentElement.value,
				scrollElement: e.documentMode.value ? null : e.contentElement.value
			};
		}
		function pe() {
			u("update:modelValue", !1);
		}
		function me() {
			L.value || m["aria-label"] || m["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function he() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function ge() {
			let e = P.value;
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
		async function _e() {
			if (ce(), D.value && P.value?.open) {
				k.value = "opening", le(400, () => {
					k.value = "open", u("opened");
				});
				return;
			}
			let e = K.value ? se() : null;
			if (K.value && !e) {
				he(), pe();
				return;
			}
			let t = ue(), n = de(t), r = n ? n.target : t;
			if (!r) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), pe();
				return;
			}
			oe = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), j.value = n, A.value = r, D.value = !0, k.value = "opening", me(), await y(), !(!i.modelValue || !P.value) && (P.value.open || P.value.show(), Ci(P.value, n ? fe(n.context) : void 0), ge(), le(400, () => {
				k.value = "open", u("opened");
			}));
		}
		function ve() {
			let e = P.value;
			e?.open && e.close(), e && wi(e), j.value = null, D.value = !1, k.value = "closed", y(() => {
				oe?.isConnected && oe.focus({ preventScroll: !0 }), oe = null, u("closed");
			});
		}
		function ye() {
			!D.value || k.value === "closing" || ae.start({
				canStart: () => D.value && k.value !== "closing",
				duration: 200,
				getElement: () => P.value,
				isActive: () => X && !i.modelValue && k.value === "closing" && D.value && !!P.value,
				onFinish: ve,
				onStart: () => {
					k.value = "closing";
				}
			});
		}
		function be(e) {
			e.preventDefault(), pe();
		}
		function xe(e) {
			e.key === "Escape" && (e.preventDefault(), pe());
		}
		function Se(e) {
			!i.closeOnBack || e.target !== P.value || pe();
		}
		return E(() => {
			X = !0, i.modelValue && _e();
		}), w(() => {
			X = !1, ce(), P.value && (wi(P.value), P.value.open && P.value.close());
		}), V(() => i.modelValue, (e) => {
			X && (e ? _e() : ye());
		}), V(() => i.attach, () => {
			i.modelValue && D.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), H(() => {
			i.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (e, r) => (O(), c(t, null, [K.value ? (O(), c("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: C,
			class: "mat-dialog__activator"
		}, [F(e.$slots, "activator", {}, void 0, !0)], 512)) : s("", !0), D.value ? (O(), o(n, {
			key: 1,
			to: A.value
		}, [f(wa, v({
			ref_key: "surface",
			ref: T
		}, e.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${k.value}`, {
				"mat-dialog--app-root": I.value,
				"mat-dialog--full-screen": B(i).fullScreen,
				"mat-dialog--with-icon": G.value,
				"mat-dialog--top": re.value,
				"mat-dialog--transparent-scrim": !B(i).scrim
			}]],
			style: J.value,
			"aria-labelledby": e.$attrs["aria-labelledby"] ?? (L.value ? N : void 0),
			"aria-modal": "true",
			tabindex: "-1",
			onCancel: be,
			onClick: Se,
			onKeydown: xe
		}), {
			default: U(() => [l("div", {
				class: "mat-dialog__panel",
				style: S(Y.value)
			}, [B(i).fullScreen ? (O(), c(t, { key: 0 }, [l("header", Ic, [
				f(Jr, {
					class: "mat-dialog__close",
					icon: "close",
					label: B(i).closeLabel,
					size: "small",
					variant: "standard",
					onClick: pe
				}, null, 8, ["label"]),
				L.value ? (O(), c("h2", {
					key: 0,
					id: N,
					class: "mat-dialog__title mat-sys-typescale-title-large"
				}, [B(i).title === void 0 ? F(e.$slots, "title", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(i).title), 1)], 64))])) : s("", !0),
				f(Fc),
				e.$slots.actions ? (O(), c("div", Lc, [F(e.$slots, "actions", {}, void 0, !0)])) : s("", !0)
			]), W.value ? (O(), o(ns, {
				key: 0,
				class: "mat-dialog__content mat-sys-typescale-body-medium",
				orientation: "vertical",
				"no-scroll-padding": "",
				"bar-width": "thin"
			}, {
				default: U(() => [l("div", Rc, [B(i).content === void 0 ? F(e.$slots, "default", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(i).content), 1)], 64))])]),
				_: 3
			})) : s("", !0)], 64)) : (O(), c(t, { key: 1 }, [
				G.value ? (O(), c("div", zc, [f(hn, {
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: U(() => [B(i).icon === void 0 ? F(e.$slots, "icon", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(i).icon), 1)], 64))]),
					_: 3
				})])) : s("", !0),
				L.value ? (O(), c("h2", {
					key: 1,
					id: N,
					class: "mat-dialog__title mat-sys-typescale-headline-small"
				}, [B(i).title === void 0 ? F(e.$slots, "title", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(i).title), 1)], 64))])) : s("", !0),
				W.value ? (O(), o(ns, {
					key: 2,
					class: "mat-dialog__content mat-sys-typescale-body-medium",
					orientation: "vertical",
					"no-scroll-padding": "",
					"bar-width": "thin"
				}, {
					default: U(() => [l("div", Bc, [B(i).content === void 0 ? F(e.$slots, "default", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(B(i).content), 1)], 64))])]),
					_: 3
				})) : s("", !0),
				e.$slots.actions ? (O(), c("div", Vc, [F(e.$slots, "actions", {}, void 0, !0)])) : s("", !0)
			], 64))], 4)]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : s("", !0)], 64));
	}
}), [["__scopeId", "data-v-7df0b89c"]]), Uc = .25, Wc = [
	"min",
	"normal",
	"max"
];
function Gc({ availableExtent: e, contentExtent: t }) {
	let n = Math.max(0, e), r = Math.max(0, t), i = Math.max(64, Math.min(r, n / 2));
	return {
		max: Math.max(i, Math.min(r, n)),
		min: 64,
		normal: i
	};
}
function Kc(e, t) {
	let n = Gc(e), r = [
		{
			size: 0,
			value: null
		},
		{
			size: n.min,
			value: "min"
		},
		{
			size: n.normal,
			value: "normal"
		},
		{
			size: n.max,
			value: "max"
		}
	];
	Wc.includes(e.currentValue) || r.push({
		size: Math.max(0, e.currentExtent),
		value: e.currentValue
	}), r.sort((e, t) => e.size - t.size);
	let i = r.findIndex((e, n) => n > 0 && t < (r[n - 1].size + e.size) / 2), a = i === -1 ? r.at(-1) : r[i - 1];
	return {
		close: a.value === null,
		size: a.size,
		value: a.value
	};
}
function qc({ availableExtent: e, extent: t, overshootLimit: n = 0 }) {
	let r = Math.max(0, e), i = Math.max(0, t);
	return i > r ? {
		offset: 0,
		size: r + Math.min((i - r) * Uc, Math.max(0, n))
	} : {
		offset: Math.max(0, 64 - i),
		size: Math.min(r, Math.max(64, i))
	};
}
function Jc({ availableExtent: e, value: t }) {
	return t === "min" ? 64 : Math.max(0, e) / 2;
}
function Yc({ overshootLimit: e = 0, panelExtent: t, visibleExtent: n }) {
	let r = Math.max(0, t);
	if (n > r) {
		let t = Math.min((n - r) * Uc, Math.max(0, e));
		return t > 0 ? -t : 0;
	}
	return Math.min(r, Math.max(0, r - n));
}
function Xc({ distance: e, draggingDown: t, pointerType: n, velocity: r }) {
	return n !== "mouse" && t && e >= 48 && r >= .5;
}
//#endregion
//#region src/components/MatSheetBase.vue
var Zc = ["aria-label"], Qc = {
	key: 1,
	class: "mat-sheet__header"
}, $c = {
	key: 1,
	class: "mat-sheet__header-actions"
}, el = { class: "mat-sheet__content-body" }, tl = {
	key: 3,
	class: "mat-sheet__footer"
}, nl = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		containerColor: {
			type: Boolean,
			default: !1
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
			type: [
				Boolean,
				String,
				Number
			],
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
		rounded: {
			type: Boolean,
			default: !0
		},
		position: {
			type: String,
			default: "end"
		},
		scrim: {
			type: Boolean,
			default: !0
		},
		shadow: {
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
		virtualExpand: {
			type: Boolean,
			default: !1
		},
		width: {
			type: [Number, String],
			default: void 0
		}
	},
	emits: {
		closed: () => !0,
		opened: () => !0,
		"update:expanded": (e) => e === "min" || e === "normal" || e === "max",
		"update:modelValue": (e) => typeof e == "boolean"
	},
	setup(e, { emit: r }) {
		let i = e, u = r, m = ee(), h = ne(), _ = p(), x = g(Yn, null), C = Object.prototype.hasOwnProperty.call(_?.vnode.props ?? {}, "attach"), T = M(null), k = M(null), A = M(null), j = M(!1), N = M("closed"), P = M(null), I = R(null), L = M(typeof window > "u" ? 0 : window.innerWidth), B = 0, H = M(!1), W = M(0), G = M(0), re = `${te().replace(/[^\w-]/g, "-")}-title`, q = a(() => k.value?.root ?? k.value?.$el ?? null), ie = a(() => !!I.value), J = a(() => X.value ? A.value : q.value), Y = a(() => i.variant === "auto" ? L.value < jn(i.breakpoint, {
			positive: !0,
			fallback: 840
		}) ? "modal" : "standard" : i.variant), X = a(() => Y.value === "modal"), Z = a(() => X.value && si.value.at(-1) === q.value), ae = a(() => !!h.activator), oe = a(() => i.title !== void 0 || !!h.title), se = a(() => i.content !== void 0 || !!h.default), ce = a(() => i.closable);
		function le(e) {
			return e === "full" || e === !0 ? "full" : e === "min" || e === "max" ? e : e === "normal" || e === !1 || e === void 0 ? "normal" : wn(e, { allowNegative: !0 }) ? e : "normal";
		}
		let ue = a(() => i.direction === "bottom" ? le(i.expanded) : i.expanded), de = a(() => i.direction !== "bottom" || ue.value === "min" || ue.value === "normal"), fe = a(() => i.direction === "bottom" && !de.value), pe = a(() => i.direction === "bottom" && i.virtualExpand && (ue.value === "min" || ue.value === "normal")), me = a(() => i.direction !== "bottom" || pe.value ? !1 : ue.value === "normal" || ue.value === "max" ? G.value > 0 : !0), he = a(() => {
			if (!me.value || ue.value === "full") return;
			if (ue.value === "min") return "var(--mat-sheet-min-block-size)";
			if (ue.value === "normal" || ue.value === "max") {
				let e = ue.value === "normal" ? "calc(var(--mat-sheet-full-block-size) / 2)" : "var(--mat-sheet-full-block-size)";
				return `max(64px, min(${G.value}px, ${e}))`;
			}
			let e = Tn(ue.value, {
				allowNegative: !0,
				property: "block-size"
			});
			if (e) return /^(auto|contain|fit-content(?:\(.+\))?|inherit|initial|max-content|min-content|revert(?:-layer)?|stretch|unset)$/i.test(e) ? e : `max(64px, ${e})`;
		}), ge = a(() => i.direction === "bottom" && !i.virtualExpand && ue.value === "normal" ? "calc(var(--mat-sheet-full-block-size) / 2)" : void 0), _e = a(() => [
			`mat-sheet__panel--${i.direction}`,
			`mat-sheet__panel--position-${i.position}`,
			{
				"mat-sheet__panel--sized": me.value,
				"mat-sheet__panel--virtual-expand": i.direction === "bottom" && i.virtualExpand,
				"mat-sheet__panel--dragging": H.value
			}
		]), ve = a(() => de.value ? i.dragHandleLabel : X.value ? i.expandedDragHandleLabel : i.collapseDragHandleLabel), ye = a(() => oe.value || ce.value || !!h.header || !!h.actions), be = a(() => X.value ? "dialog" : "aside"), xe = a(() => {
			if (i.width !== void 0) return Tn(i.width, {
				property: "inline-size",
				positive: !0
			});
		}), Se = a(() => {
			if (xe.value) return { "--mat-sheet-preferred-width": xe.value };
		}), Ce = a(() => {
			let e = {};
			return he.value && (e["--mat-sheet-expanded-block-size"] = he.value), ge.value && (e["--mat-sheet-max-block-size"] = ge.value), W.value > 0 && (e["--mat-sheet-virtual-offset"] = `${W.value}px`), Object.keys(e).length > 0 ? e : void 0;
		}), we = a(() => [
			m.style,
			Se.value,
			Ce.value
		]), Te = a(() => [Se.value, Ce.value]), Ee = !1, De = qn(), Oe = Jn({ motion: De }), ke = null, Ae = !1, je = null, Me = 0, Ne = 0, Pe = 0, Fe = 0, Ie = 0, Le = 0, Re = null, ze = 0, Be = null, Ve = 0, He = 0, Ue = null, We = [];
		Ei(q, a(() => X.value && j.value && Z.value));
		function Ge() {
			De.cancel();
		}
		function Ke(e, t) {
			De.wait(q.value, e, t);
		}
		function qe() {
			let e = T.value ? [...T.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function Je() {
			if (typeof i.attach == "string") try {
				return document.querySelector(i.attach);
			} catch {
				return null;
			}
			return i.attach instanceof HTMLElement && i.attach.ownerDocument === document ? i.attach : null;
		}
		function Ye(e) {
			if (x && !C) return {
				context: x,
				target: x.modalLayer.value
			};
			if (C) {
				let t = e ? $n(e) : null;
				if (t) return {
					context: t,
					target: t.modalLayer.value
				};
			}
			return null;
		}
		function Xe(e) {
			return {
				inertElement: e.contentElement.value,
				scrollElement: e.documentMode.value ? null : e.contentElement.value
			};
		}
		let Ze = null;
		function Qe() {
			return window.innerWidth >= 641 ? 56 : 72;
		}
		function $e() {
			let e = X.value ? q.value?.getBoundingClientRect().height ?? 0 : window.innerHeight;
			return Math.max(0, e - Qe());
		}
		function et() {
			let e = J.value;
			return e ? [
				".mat-sheet__drag-handle-target",
				".mat-sheet__content-body",
				".mat-sheet__footer"
			].reduce((t, n) => t + (e.querySelector(n)?.getBoundingClientRect().height ?? 0), 0) : 0;
		}
		function tt() {
			let e = et();
			return e > 0 ? e : J.value?.getBoundingClientRect().height ?? 0;
		}
		function nt() {
			if (!pe.value) {
				W.value = 0;
				return;
			}
			let e = $e(), { max: t } = Gc({
				availableExtent: e,
				contentExtent: tt()
			});
			W.value = Yc({
				panelExtent: t,
				visibleExtent: Jc({
					availableExtent: e,
					value: ue.value
				})
			});
		}
		function rt() {
			if (i.direction !== "bottom") return;
			let e = et();
			e !== G.value && (G.value = e);
		}
		function it() {
			let e = i.direction === "bottom" && typeof ResizeObserver == "function" ? J.value : null, t = e ? [
				".mat-sheet__drag-handle-target",
				".mat-sheet__content-body",
				".mat-sheet__footer"
			].map((t) => e.querySelector(t)).filter(Boolean) : [];
			t.length === We.length && t.every((e, t) => e === We[t]) || (We = t, Ue?.disconnect(), Ue = null, t.length !== 0 && (Ue = new ResizeObserver(rt), t.forEach((e) => Ue.observe(e))));
		}
		function at() {
			i.direction === "bottom" && (rt(), it(), nt());
		}
		function ot() {
			Ue?.disconnect(), Ue = null, We = [];
		}
		function st(e) {
			i.direction !== "bottom" || !i.virtualExpand || fe.value || e.deltaY > 0 && (e.preventDefault(), u("update:expanded", "max"));
		}
		function ct(e) {
			i.direction !== "bottom" || !i.virtualExpand || fe.value || e.pointerType === "touch" && (Ze = e.clientY);
		}
		function lt(e) {
			i.direction !== "bottom" || !i.virtualExpand || fe.value || e.pointerType === "touch" && Ze !== null && Ze - e.clientY >= 8 && (Ze = null, u("update:expanded", "max"));
		}
		function ut(e) {
			e.pointerType === "touch" && (Ze = null);
		}
		function dt() {
			u("update:modelValue", !1);
		}
		function ft(e, t) {
			if (B = e, q.value?.style.setProperty("--mat-sheet-drag-offset", `${e}px`), t === null) {
				q.value?.style.removeProperty("--mat-sheet-drag-size");
				return;
			}
			q.value?.style.setProperty("--mat-sheet-drag-size", `${t}px`);
		}
		function pt() {
			ft(0, null);
		}
		function mt(e) {
			if (!(e.key !== "Enter" && e.key !== " ")) {
				if (e.preventDefault(), de.value) {
					u("update:expanded", "max");
					return;
				}
				if (X.value) {
					dt();
					return;
				}
				u("update:expanded", "normal");
			}
		}
		function ht() {
			console.warn(`${i.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`);
		}
		function gt() {
			if (!X.value || m["aria-label"] || m["aria-labelledby"] || i.direction === "side" && oe.value) return;
			let e = i.direction === "bottom" ? "必须通过 aria-label 或 aria-labelledby 提供可访问名称" : "必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称";
			console.warn(`${i.componentName}: ${e}`);
		}
		function _t() {
			console.warn(`${i.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function vt() {
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
		function yt() {
			let e = q.value;
			if (e instanceof HTMLDialogElement) {
				if (e.open || e.show(), ie.value) {
					let t = I.value;
					if (!t) return;
					Ci(e, Xe(t.context));
				} else Ci(e);
				vt();
			}
		}
		async function bt() {
			if (Ge(), At(), pt(), j.value) {
				N.value = "opening", await y(), at(), Ke(400, () => {
					N.value = "open", u("opened");
				});
				return;
			}
			let e = ae.value ? qe() : null;
			if (ae.value && !e) {
				ht(), dt();
				return;
			}
			if (X.value) {
				let t = Je(), n = Ye(t), r = n ? n.target : t;
				if (!r) {
					_t(), dt();
					return;
				}
				I.value = n, P.value = r, ke = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			} else I.value = null;
			Ae = X.value, j.value = !0, N.value = "opening", gt(), await y(), !(!i.modelValue || !q.value) && (X.value && yt(), at(), Ke(400, () => {
				N.value = "open", u("opened");
			}));
		}
		function xt() {
			Ae && ke?.isConnected && ke.focus({ preventScroll: !0 }), ke = null, Ae = !1;
		}
		function St() {
			let e = q.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), wi(e)), I.value = null, j.value = !1, N.value = "closed", At(), ot(), W.value = 0, pt(), y(() => {
				xt(), u("closed");
			});
		}
		function Ct() {
			j.value && N.value !== "closing" && Oe.start({
				canStart: () => j.value && N.value !== "closing",
				duration: 200,
				getElement: () => q.value,
				isActive: () => Ee && !i.modelValue && N.value === "closing" && j.value && !!q.value,
				onFinish: St,
				onStart: () => {
					N.value = "closing";
				}
			});
		}
		function wt(e) {
			e.preventDefault(), dt();
		}
		function Tt(e) {
			e.key === "Escape" && (e.preventDefault(), dt());
		}
		function Et(e) {
			if (!(!X.value || !i.closeOnBack || e.target !== q.value)) {
				if (Be !== q.value) {
					Be = null;
					return;
				}
				Be = null, dt();
			}
		}
		function Dt(e) {
			if (e.pointerId === je) {
				if (i.direction === "bottom") {
					He = e.clientY - Me;
					let t = Pe - He;
					if (i.virtualExpand) {
						ft(Yc({
							overshootLimit: Le,
							panelExtent: Ne,
							visibleExtent: t
						}) - ze, null);
						return;
					}
					let n = qc({
						availableExtent: Ie,
						extent: t,
						overshootLimit: Le
					});
					ft(n.offset, n.size);
					return;
				}
				ft(i.position === "start" ? Math.max(0, Me - e.clientX) : Math.max(0, e.clientX - Me), null);
			}
		}
		let Ot = Ja(Dt);
		function kt(e) {
			e.pointerId === je && Ot.schedule(e);
		}
		function At({ keepDragging: e = !1 } = {}) {
			je = null, H.value = e, window.removeEventListener("pointermove", kt), window.removeEventListener("pointerup", Nt), window.removeEventListener("pointercancel", Pt);
		}
		function jt() {
			dt(), y(() => {
				i.modelValue && (At(), pt());
			});
		}
		function Q({ distance: e, velocity: t }) {
			let n = Kc({
				availableExtent: Ie,
				contentExtent: Fe,
				currentExtent: Pe,
				currentValue: ue.value
			}, Pe - He), r = Xc({
				distance: e,
				draggingDown: He > 0,
				pointerType: Re,
				velocity: t
			});
			if (n.close || r) {
				At({ keepDragging: !0 }), jt();
				return;
			}
			let i = n.value === ue.value || n.size === Pe;
			At(), pt(), i || u("update:expanded", n.value);
		}
		function Mt({ distance: e, threshold: t, velocity: n }) {
			let r = e >= t || e >= 20 && n >= .35;
			if (At(), r) {
				dt();
				return;
			}
			pt();
		}
		function Nt(e) {
			if (e.pointerId !== je) return;
			Ot.flush();
			let t = Math.max(1, performance.now() - Ve), n = i.direction === "bottom" ? Math.abs(He) : B, r = n / t;
			if (i.direction === "bottom") {
				Q({
					distance: n,
					velocity: r
				});
				return;
			}
			Mt({
				distance: n,
				threshold: Math.min(120, Math.max(48, Ne * .15)),
				velocity: r
			});
		}
		function Pt() {
			Ot.cancel(), At(), pt();
		}
		function Ft(e) {
			!i.draggable || e.button !== 0 || je !== null || (Ot.cancel(), je = e.pointerId, Me = i.direction === "bottom" ? e.clientY : e.clientX, Ne = i.direction === "bottom" ? J.value?.getBoundingClientRect().height ?? 0 : J.value?.getBoundingClientRect().width ?? 0, Re = e.pointerType ?? null, Ve = performance.now(), He = 0, i.direction === "bottom" ? (ze = W.value, Pe = Math.max(0, Ne - ze), Fe = tt(), Ie = $e(), Le = Qe(), ft(0, i.virtualExpand ? null : Ne)) : ft(0, null), H.value = !0, window.addEventListener("pointermove", kt), window.addEventListener("pointerup", Nt), window.addEventListener("pointercancel", Pt));
		}
		function It(e) {
			i.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Ft(e);
		}
		function Lt(e) {
			Be = e.target instanceof Node ? e.target : null, X.value || It(e);
		}
		function Rt(e) {
			X.value && It(e);
		}
		function zt(e) {
			Rt(e), ct(e);
		}
		function Bt() {
			L.value = window.innerWidth, at();
		}
		async function Vt(e, t) {
			if (!j.value || !i.modelValue || e === t) return;
			Ge();
			let n = q.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), wi(n), xt(), I.value = null), e === "modal") {
				let e = Je(), t = Ye(e), n = t ? t.target : e;
				if (!n) {
					_t(), dt();
					return;
				}
				I.value = t, P.value = n, ke = document.activeElement instanceof HTMLElement ? document.activeElement : null, Ae = !0, gt();
			}
			N.value = "open", await y(), e === "modal" && i.modelValue && yt(), at();
		}
		return E(() => {
			Ee = !0, Bt(), window.addEventListener("resize", Bt), i.modelValue && bt();
		}), D(at), w(() => {
			Ot.cancel(), Ee = !1, Ge(), At(), ot(), window.removeEventListener("resize", Bt);
			let e = q.value;
			e instanceof HTMLDialogElement && (wi(e), e.open && e.close());
		}), V(() => i.modelValue, (e) => {
			Ee && (e ? bt() : Ct());
		}), V(Y, Vt), V(() => i.attach, () => {
			i.modelValue && j.value && X.value && console.warn(`${i.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), V(() => i.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${i.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, a) => (O(), c(t, null, [ae.value ? (O(), c("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: T,
			class: "mat-sheet__activator"
		}, [F(r.$slots, "activator", {}, void 0, !0)], 512)) : s("", !0), j.value ? (O(), o(n, {
			key: 1,
			to: P.value ?? "body",
			disabled: !X.value
		}, [f(wa, v({
			ref_key: "surface",
			ref: k
		}, r.$attrs, {
			as: be.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${Y.value}`,
				`mat-sheet--${N.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--app-root": ie.value,
					"mat-sheet--dragging": H.value,
					"mat-sheet--sized": me.value,
					"mat-sheet--virtual-expand": e.direction === "bottom" && e.virtualExpand,
					"mat-sheet--no-shadow": !e.shadow,
					"mat-sheet--no-rounded": !e.rounded,
					"mat-sheet--top": Z.value,
					"mat-sheet--transparent-scrim": !e.scrim,
					"mat-sheet--explicit-container-color": i.containerColor && !X.value
				}
			]],
			style: we.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (e.direction === "side" && oe.value ? re : void 0),
			"aria-modal": X.value ? "true" : void 0,
			tabindex: X.value ? -1 : void 0,
			onCancel: wt,
			onClick: Et,
			onKeydown: Tt,
			onPointerdown: Lt,
			onPointermove: lt,
			onPointerup: ut,
			onPointercancel: ut,
			onWheel: st
		}), {
			default: U(() => [l("div", {
				ref_key: "panelElement",
				ref: A,
				class: b(["mat-sheet__panel", _e.value]),
				style: S(Te.value),
				onPointerdown: zt,
				onPointermove: lt,
				onPointerup: ut,
				onPointercancel: ut,
				onWheel: st
			}, [
				e.direction === "bottom" && e.dragHandle ? (O(), c("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": ve.value,
					onKeydown: mt,
					onPointerdown: K(Ft, ["stop"])
				}, [F(r.$slots, "drag-handle", {}, () => [a[0] ||= l("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, Zc)) : s("", !0),
				e.direction === "side" && ye.value ? (O(), c("header", Qc, [F(r.$slots, "header", {}, () => [
					oe.value ? (O(), c("h2", {
						key: 0,
						id: re,
						class: "mat-sheet__title mat-sys-typescale-title-large"
					}, [e.title === void 0 ? F(r.$slots, "title", { key: 1 }, void 0, !0) : (O(), c(t, { key: 0 }, [d(z(e.title), 1)], 64))])) : s("", !0),
					r.$slots.actions ? (O(), c("div", $c, [F(r.$slots, "actions", {}, void 0, !0)])) : s("", !0),
					ce.value ? (O(), o(Jr, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: dt
					}, null, 8, ["label"])) : s("", !0)
				], !0)])) : s("", !0),
				se.value ? (O(), o(ns, {
					key: 2,
					class: "mat-sheet__content mat-sys-typescale-body-medium",
					orientation: "vertical",
					"no-scroll-padding": "",
					"bar-width": "thin",
					onWheel: st,
					onPointerdown: ct,
					onPointermove: lt,
					onPointerup: ut,
					onPointercancel: ut
				}, {
					default: U(() => [l("div", el, [e.direction !== "bottom" && e.content !== void 0 ? (O(), c(t, { key: 0 }, [d(z(e.content), 1)], 64)) : r.$slots.default ? F(r.$slots, "default", { key: 1 }, void 0, !0) : e.content === void 0 ? s("", !0) : (O(), c(t, { key: 2 }, [d(z(e.content), 1)], 64))])]),
					_: 3
				})) : s("", !0),
				r.$slots.footer ? (O(), c("div", tl, [F(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 38)]),
			_: 3
		}, 16, [
			"as",
			"class",
			"style",
			"aria-labelledby",
			"aria-modal",
			"tabindex"
		])], 8, ["to", "disabled"])) : s("", !0)], 64));
	}
}), [["__scopeId", "data-v-23fb50db"]]), rl = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Cn(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator: (e) => Cn(e, {
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
			type: [String, Number],
			default: "normal",
			validator: (e) => [
				"min",
				"normal",
				"max"
			].includes(e) || e === "full" || wn(e, { allowNegative: !0 })
		},
		virtualExpand: {
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
		content: {
			type: String,
			default: void 0
		},
		containerColor: {
			type: Boolean,
			default: !1
		},
		shadow: {
			type: Boolean,
			default: !0
		},
		rounded: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		"update:expanded": (e) => e === "min" || e === "normal" || e === "max",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: t }) {
		let n = $("bottomSheet", e), r = ee(), i = p(), s = Object.prototype.hasOwnProperty.call(i?.vnode.props ?? {}, "attach"), c = a(() => {
			if (s) return n;
			let e = { ...n };
			return delete e.attach, e;
		}), l = a(() => {
			let e = { ...r };
			return delete e.closable, delete e.closeLabel, delete e.title, e;
		}), d = t;
		return (e, t) => (O(), o(nl, v({
			...c.value,
			...l.value
		}, {
			"component-name": "MatBottomSheet",
			direction: "bottom",
			"onUpdate:modelValue": t[0] ||= (e) => d("update:modelValue", e),
			"onUpdate:expanded": t[1] ||= (e) => d("update:expanded", e),
			onOpened: t[2] ||= (e) => d("opened"),
			onClosed: t[3] ||= (e) => d("closed")
		}), u({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: U(() => [F(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots["drag-handle"] ? {
				name: "drag-handle",
				fn: U(() => [F(e.$slots, "drag-handle")]),
				key: "1"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: U(() => [F(e.$slots, "default")]),
				key: "2"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: U(() => [F(e.$slots, "footer")]),
				key: "3"
			} : void 0
		]), 1040));
	}
}), il = /*@__PURE__*/ Object.assign({
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
			validator: (e) => Cn(e, {
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
			validator: (e) => Cn(e, {
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
		},
		containerColor: {
			type: Boolean,
			default: !1
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: t }) {
		let n = $("sideSheet", e), r = p(), i = Object.prototype.hasOwnProperty.call(r?.vnode.props ?? {}, "attach"), s = a(() => {
			if (i) return n;
			let e = { ...n };
			return delete e.attach, e;
		}), c = t;
		return (e, t) => (O(), o(nl, v({
			...s.value,
			...e.$attrs
		}, {
			"component-name": "MatSideSheet",
			direction: "side",
			"onUpdate:modelValue": t[0] ||= (e) => c("update:modelValue", e),
			onOpened: t[1] ||= (e) => c("opened"),
			onClosed: t[2] ||= (e) => c("closed")
		}), u({ _: 2 }, [
			e.$slots.activator ? {
				name: "activator",
				fn: U(() => [F(e.$slots, "activator")]),
				key: "0"
			} : void 0,
			e.$slots.header ? {
				name: "header",
				fn: U(() => [F(e.$slots, "header")]),
				key: "1"
			} : void 0,
			e.$slots.title ? {
				name: "title",
				fn: U(() => [F(e.$slots, "title")]),
				key: "2"
			} : void 0,
			e.$slots.default ? {
				name: "default",
				fn: U(() => [F(e.$slots, "default")]),
				key: "3"
			} : void 0,
			e.$slots.actions ? {
				name: "actions",
				fn: U(() => [F(e.$slots, "actions")]),
				key: "4"
			} : void 0,
			e.$slots.footer ? {
				name: "footer",
				fn: U(() => [F(e.$slots, "footer")]),
				key: "5"
			} : void 0
		]), 1040));
	}
}), al = { class: "mat-container__content" }, ol = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		return (e, n) => (O(), c("div", v(e.$attrs, { class: ["mat-container", { "mat-container--fluid": B(t).fluid }] }), [l("div", al, [F(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-f2274c15"]]), sl = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatLayout",
	inheritAttrs: !1
}, {
	__name: "MatLayout",
	props: { as: {
		type: String,
		default: "div"
	} },
	setup(e) {
		let t = $("layout", e), n = ee(), r = M(null), i = M(null), s = A({
			size: {
				width: 0,
				height: 0
			},
			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				start: 0,
				end: 0
			}
		}), c = j(s), u = a(() => [n.style, {
			"--mat-layout-padding-top": `${s.padding.top}px`,
			"--mat-layout-padding-bottom": `${s.padding.bottom}px`,
			"--mat-layout-padding-left": `${s.padding.left}px`,
			"--mat-layout-padding-right": `${s.padding.right}px`,
			"--mat-layout-padding-start": `${s.padding.start}px`,
			"--mat-layout-padding-end": `${s.padding.end}px`
		}]), d = !1, f, p, m = !1;
		function h() {
			if (!d || !r.value) return;
			let e = r.value.getBoundingClientRect(), t = Math.max(0, Number(e.width) || 0), n = Math.max(0, Number(e.height) || 0), i = _.measure({
				width: t,
				height: n
			});
			Object.assign(s.size, i.size), Object.assign(s.padding, i.padding);
		}
		function g() {
			if (!d || m) return;
			m = !0;
			let e = () => {
				m = !1, p = void 0, h();
			};
			if (typeof window < "u" && typeof window.requestAnimationFrame == "function") {
				p = window.requestAnimationFrame(e);
				return;
			}
			p = setTimeout(e, 0);
		}
		let _ = ei({ scheduleMeasure: g }), b = _.registerEdge, x = {
			publicContext: Object.freeze({
				layout: c,
				padding: s.padding,
				size: s.size,
				registerEdge: b
			}),
			rootElement: j(r),
			contentElement: j(i)
		};
		return k(ai, x), k(ti, {
			kind: "layout",
			...x
		}), E(async () => {
			d = !0, f = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(g), f?.observe(r.value), _.setResizeObserver(f), window.addEventListener("resize", g), await y(), g();
		}), w(() => {
			d = !1, _.setResizeObserver(void 0), f?.disconnect(), f = void 0, window.removeEventListener("resize", g), p !== void 0 && (typeof window < "u" && typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(p) : clearTimeout(p));
		}), (e, n) => (O(), o(I(B(t).as), v({
			ref_key: "rootElement",
			ref: r
		}, e.$attrs, {
			class: "mat-layout",
			style: u.value
		}), {
			default: U(() => [l("div", {
				ref_key: "contentElement",
				ref: i,
				class: "mat-layout__content mat-edge-layout__content"
			}, [F(e.$slots, "default", {}, void 0, !0)], 512)]),
			_: 3
		}, 16, ["style"]));
	}
}), [["__scopeId", "data-v-2fd5a61b"]]), cl = /*@__PURE__*/ Object.assign({
	name: "MatTableWrapper",
	inheritAttrs: !1
}, {
	__name: "MatTableWrapper",
	setup(e) {
		return (e, t) => (O(), c("div", v(e.$attrs, { class: "table-wrapper" }), [F(e.$slots, "default")], 16));
	}
}), ll = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Cn(e, { positive: !0 })
		},
		estimatedItemHeight: {
			type: [Number, String],
			default: 48,
			validator: (e) => Cn(e, {
				positive: !0,
				allowUndefined: !1
			})
		},
		buffer: {
			type: [Number, String],
			default: 3,
			validator: (e) => Cn(e, { allowUndefined: !1 })
		},
		itemKey: {
			type: [Function, String],
			default: void 0
		},
		as: {
			type: String,
			default: "div",
			validator: Kt
		}
	},
	emits: {
		scroll: (e) => typeof e?.scrollTop == "number" && typeof e?.startIndex == "number" && typeof e?.endIndex == "number",
		"visible-range-change": (e) => typeof e?.startIndex == "number" && typeof e?.endIndex == "number"
	},
	setup(e, { expose: n, emit: r }) {
		let i = $("virtualScroll", e), a = r, s = M(null), u = qa({
			root: s,
			props: i,
			enabled: !0,
			pinEdges: !1,
			emit: a
		}), { getItemKey: d, getItemRef: f, paddingBottom: p, paddingTop: m, visibleItems: h } = u;
		function g(e, t) {
			u.scrollToIndex(e, t);
		}
		function _(e) {
			u.scrollTo(e);
		}
		function v() {
			return u.getScroller();
		}
		function y() {
			return u.refresh();
		}
		function b() {
			u.calculate();
		}
		return n({
			calculate: b,
			getScroller: v,
			refresh: y,
			scrollTo: _,
			scrollToIndex: g
		}), (e, n) => (O(), o(I(B(i).as), {
			ref_key: "root",
			ref: s,
			class: "mat-virtual-scroll"
		}, {
			default: U(() => [
				l("div", {
					class: "mat-virtual-scroll__spacer",
					style: S({ height: `${B(m)}px` }),
					"aria-hidden": "true"
				}, null, 4),
				(O(!0), c(t, null, P(B(h), (t) => F(e.$slots, "default", {
					key: B(d)(t.item, t.index),
					item: t.item,
					index: t.index,
					itemRef: B(f)(t.index)
				}, void 0, !0)), 128)),
				l("div", {
					class: "mat-virtual-scroll__spacer",
					style: S({ height: `${B(p)}px` }),
					"aria-hidden": "true"
				}, null, 4)
			]),
			_: 3
		}, 512));
	}
}), [["__scopeId", "data-v-9159f242"]]), ul = { class: "mat-pull-to-refresh__indicator" }, dl = 80, fl = .5, pl = 4, ml = 600, hl = 1600, gl = 80, _l = 700, vl = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatPullToRefresh" }, {
	__name: "MatPullToRefresh",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		placeholder: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		triggerDistance: {
			type: [Number, String],
			default: 80,
			validator: (e) => typeof e == "number" || typeof e == "string" && /^\s*\d+(\.\d+)?\s*$/.test(e)
		},
		size: {
			type: [Number, String],
			default: void 0,
			validator: (e) => e === void 0 || typeof e == "number" || typeof e == "string" && /^\s*\d+(\.\d+)?\s*$/.test(e)
		},
		color: {
			type: String,
			default: void 0,
			validator: Ht
		},
		containment: {
			type: Boolean,
			default: !1
		}
	},
	emits: {
		refresh: () => !0,
		"update:modelValue": (e) => typeof e == "boolean"
	},
	setup(e, { emit: t }) {
		let n = 2 * Math.sqrt(_l) * .9, r = e, i = $("pullToRefresh", r), o = t, s = g(Ka, null), u = s?.scroller ?? M(null), d = s?.orientation ?? M("vertical"), p = a(() => d.value === "horizontal"), m = a(() => jn(i.triggerDistance, {
			positive: !0,
			fallback: dl
		})), h = M("idle"), _ = M(r.modelValue), v = M(0), y = M(0), x = M(0), C = M(0), T = null, E, D = 0, k = 0, A = !1, j = !1, N = !1, P = !1, F = 0, I = !1, L, R = !1, z, ee = a(() => ({
			"--mat-pull-to-refresh-placeholder-size": `${v.value}px`,
			"--mat-pull-to-refresh-appear": `${x.value}`,
			"--mat-pull-to-refresh-scroll-padding": `${C.value}px`
		})), te = a(() => _.value ? void 0 : y.value);
		function ne() {
			return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function H() {
			L !== void 0 && (globalThis.clearTimeout(L), L = void 0), I = !1;
		}
		function U() {
			H(), I = !0, L = globalThis.setTimeout(() => {
				I = !1, L = void 0;
			}, 0);
		}
		function W() {
			z !== void 0 && (globalThis.clearTimeout(z), z = void 0), R = !1;
		}
		function G() {
			R = !0, z !== void 0 && globalThis.clearTimeout(z), z = globalThis.setTimeout(() => {
				z = void 0, R = !1;
			}, ml);
		}
		function K(e, t, n = hl, r = gl) {
			let i, a = 0, o = 0, s = 0, c;
			function l() {
				i !== void 0 && (globalThis.cancelAnimationFrame?.(i), i = void 0), c = void 0;
			}
			function u(l) {
				i = void 0;
				let d = c === void 0 ? 0 : Math.min((l - c) / 1e3, 1 / 30);
				if (c = l, d > 0) {
					let e = -n * (a - s) - r * o;
					o += e * d, a += o * d;
				}
				if (Math.abs(a - s) < .1 && Math.abs(o) < .1) {
					a = s, o = 0, c = void 0, e(a), t?.();
					return;
				}
				e(a), i = globalThis.requestAnimationFrame(u);
			}
			return {
				start(n, r) {
					if (l(), a = n, s = r, o = 0, ne() || typeof globalThis.requestAnimationFrame != "function") {
						a = r, e(a), t?.();
						return;
					}
					i = globalThis.requestAnimationFrame(u);
				},
				stop: l
			};
		}
		let re = K((e) => {
			x.value = e;
		}, () => {
			h.value === "collapse" && (h.value = "idle");
		}), q = K((e) => {
			v.value = Math.max(0, e);
		}, void 0, _l, n);
		function ie() {
			re.start(x.value, 1);
		}
		function J(e) {
			_.value = !0, h.value = "refresh", P = !1, F = 0, y.value = 0, q.start(v.value, 0), x.value < 1 && ie(), e && (o("update:modelValue", !0), o("refresh"));
		}
		function Y() {
			h.value !== "collapse" && (h.value = "collapse", y.value = 0, q.start(v.value, 0), re.start(x.value, 0));
		}
		function X() {
			_.value = !1, Y();
		}
		V(() => r.modelValue, (e) => {
			e && !_.value ? J(!1) : !e && _.value && X();
		}), V(() => i.disabled, (e) => {
			e && (P && (P = !1, F = 0, Y()), E !== void 0 && le(E, !1));
		});
		function Z() {
			return T ? p.value ? Math.abs(T.scrollLeft) < 1 : T.scrollTop < 1 : !1;
		}
		function ae() {
			let e = T;
			if (!e || typeof globalThis.getComputedStyle != "function") {
				C.value = 0;
				return;
			}
			let t = globalThis.getComputedStyle(e), n = parseFloat(p.value ? t.paddingLeft : t.paddingTop);
			C.value = Number.isFinite(n) ? n : 0;
		}
		function oe() {
			let e = F * fl;
			v.value = Math.min(e, m.value), y.value = m.value > 0 ? e / m.value : 0;
		}
		function se(e) {
			!T || i.disabled || _.value || h.value !== "idle" || e.button !== 0 || (E = e.pointerId, D = e.clientX, k = e.clientY, A = Z(), j = !1, N = !1);
		}
		function ce(e) {
			if (e.pointerId !== E || !T || _.value) return;
			let t = p.value ? e.clientX - D : e.clientY - k;
			if (!j) {
				if (!A || t <= pl) {
					t < -4 && (E = void 0);
					return;
				}
				j = !0, N = !0, ie(), T.setPointerCapture?.(e.pointerId);
			}
			if (F = Math.max(0, t - pl), F <= 0) {
				le(e.pointerId);
				return;
			}
			oe(), e.preventDefault();
		}
		function le(e, t = !0) {
			if (e !== void 0 && e !== E) return;
			let n = j, r = N, i = T;
			if (E = void 0, j = !1, N = !1, r && i?.hasPointerCapture?.(e) && i.releasePointerCapture(e), !n) return;
			U();
			let a = t && F * fl >= m.value;
			if (F = 0, a) {
				J(!0);
				return;
			}
			Y();
		}
		function ue(e) {
			le(e.pointerId, !0);
		}
		function de(e) {
			le(e.pointerId, !1);
		}
		function fe(e) {
			le(e.pointerId, !1);
		}
		function pe(e) {
			j && e.preventDefault();
		}
		function me(e) {
			if (!T || i.disabled || _.value || h.value === "drag" && !P) return;
			let t = p.value ? -e.deltaX : -e.deltaY;
			if (!P) {
				if (t <= 0) return;
				if (R || !Z()) {
					G();
					return;
				}
				P = !0, F = 0, h.value = "drag", ie();
			}
			if (F = Math.max(0, F + t), F <= 0) {
				P = !1, Y();
				return;
			}
			e.preventDefault(), oe(), F * fl >= m.value && J(!0);
		}
		function he() {
			P && (P = !1, F = 0, Y());
		}
		function ge() {
			W();
			let e = T;
			e && (e.removeEventListener("pointerdown", se), e.removeEventListener("pointermove", ce), e.removeEventListener("pointerup", ue), e.removeEventListener("pointercancel", de), e.removeEventListener("lostpointercapture", fe), e.removeEventListener("touchmove", pe), e.removeEventListener("scroll", he), e.removeEventListener("wheel", me), e.removeEventListener("click", _e, !0), T = null);
		}
		function _e(e) {
			I && (H(), e.preventDefault(), e.stopImmediatePropagation());
		}
		return V(() => u.value ?? null, (e) => {
			ge(), C.value = 0, e && (T = e, ae(), e.addEventListener("pointerdown", se), e.addEventListener("pointermove", ce), e.addEventListener("pointerup", ue), e.addEventListener("pointercancel", de), e.addEventListener("lostpointercapture", fe), e.addEventListener("touchmove", pe), e.addEventListener("scroll", he), e.addEventListener("wheel", me, { passive: !1 }), e.addEventListener("click", _e, !0));
		}, {
			immediate: !0,
			flush: "post"
		}), V(p, () => {
			ae();
		}), _.value && (h.value = "refresh", x.value = 1), w(() => {
			ge(), re.stop(), q.stop(), H();
		}), (e, t) => (O(), c("div", {
			class: b(["mat-pull-to-refresh", {
				"mat-pull-to-refresh--horizontal": p.value,
				"mat-pull-to-refresh--placeholder": B(i).placeholder,
				"mat-pull-to-refresh--refreshing": _.value,
				"mat-pull-to-refresh--active": x.value > 0 || _.value
			}]),
			style: S(ee.value)
		}, [l("div", ul, [f(Wn, {
			size: B(i).size,
			color: B(i).color,
			containment: B(i).containment,
			progress: te.value
		}, null, 8, [
			"size",
			"color",
			"containment",
			"progress"
		])])], 6));
	}
}), [["__scopeId", "data-v-c84588cf"]]), yl = ["aria-valuemax", "aria-valuenow"], bl = ["width", "height"], xl = { key: 0 }, Sl = ["width", "height"], Cl = { class: "mat-progress__linear-bar mat-progress__linear-bar--primary" }, wl = ["d"], Tl = { class: "mat-progress__linear-bar mat-progress__linear-bar--secondary" }, El = ["d"], Dl = ["d", "mask"], Ol = { class: "mat-progress__linear-bar mat-progress__linear-bar--primary" }, kl = ["d"], Al = { class: "mat-progress__linear-bar mat-progress__linear-bar--secondary" }, jl = ["d"], Ml = ["d"], Nl = {
	key: 1,
	class: "mat-progress__linear-stop"
}, Pl = ["viewBox"], Fl = { class: "mat-progress__circular-linear-rotate" }, Il = { class: "mat-progress__circular-rotate-arc" }, Ll = [
	"cx",
	"cy",
	"r"
], Rl = ["d"], zl = 4, Bl = 48, Vl = 24, Hl = 240, Ul = 4, Wl = 4.8, Gl = 3, Kl = 40, ql = 15, Jl = 18, Yl = 20.4, Xl = 2, Zl = 4, Ql = .001, $l = 100, eu = 300, tu = 900, nu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Cn(e, {
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
			validator: Ht
		}
	},
	setup(e) {
		function n(e) {
			return typeof e == "number" && Number.isFinite(e);
		}
		function r(e) {
			return n(e) && e > 0;
		}
		function i(e) {
			return Number(e.toFixed(3)).toString();
		}
		function o() {
			return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function u(e, t, n, r, a) {
			let o = t / 2, s = Math.min(e / 2, n / 2), c = Math.max(s, e - n / 2), l = [`M ${i(s)} ${i(o)}`];
			for (let e = s + 2; e < c; e += 2) {
				let t = (e - s) / Kl * Math.PI * 2, n = o - Math.sin(t - a) * r;
				l.push(`L ${i(e)} ${i(n)}`);
			}
			let u = (c - s) / Kl * Math.PI * 2, d = o - Math.sin(u - a) * r;
			return l.push(`L ${i(c)} ${i(d)}`), l.join(" ");
		}
		function d(e, t, n, r, a) {
			let o = Math.max(1, Math.round(Math.PI * 2 * t / a)), s = o * 12, c = [];
			for (let a = 0; a <= s; a += 1) {
				let l = a / s, u = l * Math.PI * 2, d = l * Math.PI * 2 * o, f = t + Math.sin(d - r) * n, p = e + Math.cos(u) * f, m = e + Math.sin(u) * f, h = a === 0 ? "M" : "L";
				c.push(`${h} ${i(p)} ${i(m)}`);
			}
			return c.push("Z"), c.join(" ");
		}
		let f = $("progress", e), { colorStyle: p } = dn(a(() => f.color)), m = M(null), h = M($l), g = M(+(f.shape === "wavy")), _ = M(0), y = `mat-progress-linear-mask-${te()}`, b, x, C, T = a(() => r(f.max) ? f.max : 1), D = a(() => f.variant === "circular"), k = a(() => f.shape === "wavy"), A = a(() => {
			let e = jn(f.size, {
				allowNegative: !0,
				fallback: Bl
			});
			return Math.min(Math.max(e, Vl), Hl);
		}), j = a(() => A.value / 12), N = a(() => j.value * 2), P = a(() => A.value / Bl), F = a(() => 1.6 * P.value), I = a(() => ql * P.value), L = a(() => Xl * P.value), R = a(() => D.value ? f.thickness === "heavy" ? N.value : j.value : f.thickness === "heavy" ? Wl : Ul), z = a(() => {
			let e = n(f.value) ? f.value : 0;
			return Math.min(Math.max(e, 0), T.value);
		}), ee = a(() => Number((z.value / T.value * 100).toFixed(3))), ne = a(() => R.value + Gl * 2 * g.value), H = a(() => Math.min(100, R.value / h.value * 100)), U = a(() => {
			let e = h.value - R.value;
			return e <= 0 ? 1 : h.value / e;
		}), W = a(() => ee.value === 100 ? 100 : Math.min(100, Math.max(ee.value, H.value + Ql))), G = a(() => u(h.value, ne.value, R.value, 0, 0)), K = a(() => u(h.value, ne.value, R.value, Gl * g.value, _.value)), re = a(() => A.value / 2), q = a(() => (Jl + (Yl - Jl) * g.value) * P.value), ie = a(() => `0 0 ${A.value} ${A.value}`), J = a(() => d(re.value, q.value, F.value * g.value, _.value, I.value)), Y = a(() => {
			let e = Math.PI * 2 * q.value;
			return (zl + R.value) / e * 100;
		}), X = a(() => Math.min(12, Y.value)), Z = a(() => {
			if (f.indeterminate) return {};
			let e = Number(Math.max(0, 100 - ee.value - Y.value * 2).toFixed(3)), t = Number(Math.min(100, ee.value + Y.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${i(e)} ${i(100 - e)}`,
				strokeDashoffset: `-${i(t)}`
			};
		}), ae = a(() => f.indeterminate ? {} : { strokeDasharray: `${i(ee.value === 0 ? Ql : ee.value)} 200` }), oe = a(() => ({
			...p.value,
			"--mat-progress-circular-gap-progress": i(X.value),
			"--mat-progress-circular-margin": `${L.value}px`,
			"--mat-progress-circular-radius": `${q.value}px`,
			"--mat-progress-circular-size": `${A.value}px`,
			"--mat-progress-indicator-gap-size": `${zl}px`,
			"--mat-progress-linear-cap-progress": i(H.value),
			"--mat-progress-linear-path-scale": i(U.value),
			"--mat-progress-linear-segment-end": i(W.value),
			"--mat-progress-linear-segment-end-position": `${i(W.value)}%`,
			"--mat-progress-linear-size": `${ne.value}px`,
			"--mat-progress-progress": `${ee.value}`,
			"--mat-progress-stop-indicator-size": `${Zl}px`,
			"--mat-progress-thickness": `${R.value}px`
		}));
		function se(e) {
			x = void 0;
			let t = C === void 0 ? 0 : Math.min(64, e - C), n = +!!k.value, r = n - g.value;
			if (C = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / eu);
				g.value += Math.sign(r) * e;
			}
			t > 0 && f.waveMotion && g.value > 0 && (_.value += t / tu * Math.PI * 2, _.value %= Math.PI * 2);
			let i = g.value !== n, a = f.waveMotion && g.value > 0;
			i || a ? x = globalThis.requestAnimationFrame(se) : C = void 0;
		}
		function ce() {
			if (o() || typeof globalThis.requestAnimationFrame != "function") {
				g.value = +!!k.value;
				return;
			}
			x === void 0 && (C = void 0, x = globalThis.requestAnimationFrame(se));
		}
		return V(k, ce), V(() => f.waveMotion, ce), E(() => {
			ce(), !(!m.value || typeof globalThis.ResizeObserver != "function") && (b = new globalThis.ResizeObserver(([e]) => {
				let t = e.contentRect.width;
				t > 0 && (h.value = t);
			}), b.observe(m.value));
		}), w(() => {
			b?.disconnect(), x !== void 0 && globalThis.cancelAnimationFrame?.(x);
		}), (e, n) => (O(), c("div", v(e.$attrs, {
			class: ["mat-progress", [
				`mat-progress--${B(f).variant}`,
				`mat-progress--${B(f).shape}`,
				{
					"mat-progress--indeterminate": B(f).indeterminate,
					"mat-progress--wave-motion": B(f).waveMotion
				}
			]],
			style: oe.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": T.value,
			"aria-valuenow": B(f).indeterminate ? void 0 : z.value
		}), [D.value ? (O(), c("svg", {
			key: 1,
			class: "mat-progress__circular",
			viewBox: ie.value,
			"aria-hidden": "true"
		}, [l("g", Fl, [l("g", Il, [l("circle", {
			class: "mat-progress__circular-track",
			cx: re.value,
			cy: re.value,
			r: q.value,
			pathLength: "100",
			style: S(Z.value)
		}, null, 12, Ll), l("path", {
			class: "mat-progress__circular-active",
			d: J.value,
			pathLength: "100",
			style: S(ae.value)
		}, null, 12, Rl)])])], 8, Pl)) : (O(), c("span", {
			key: 0,
			ref_key: "linearElement",
			ref: m,
			class: "mat-progress__linear",
			"aria-hidden": "true"
		}, [
			B(f).indeterminate ? s("", !0) : (O(), c(t, { key: 0 }, [n[0] ||= l("span", { class: "mat-progress__linear-track mat-progress__linear-track--before" }, null, -1), n[1] ||= l("span", { class: "mat-progress__linear-track mat-progress__linear-track--after" }, null, -1)], 64)),
			(O(), c("svg", {
				class: "mat-progress__linear-indicator",
				width: h.value,
				height: ne.value
			}, [
				B(f).indeterminate ? (O(), c("defs", xl, [l("mask", {
					id: y,
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: h.value,
					height: ne.value
				}, [
					n[2] ||= l("rect", {
						width: "100%",
						height: "100%",
						fill: "white"
					}, null, -1),
					l("g", Cl, [l("path", {
						class: "mat-progress__linear-segment mat-progress__linear-segment--primary mat-progress__linear-gap mat-progress__linear-gap--primary",
						d: K.value,
						pathLength: "100"
					}, null, 8, wl)]),
					l("g", Tl, [l("path", {
						class: "mat-progress__linear-segment mat-progress__linear-segment--secondary mat-progress__linear-gap mat-progress__linear-gap--secondary",
						d: K.value,
						pathLength: "100"
					}, null, 8, El)])
				], 8, Sl)])) : s("", !0),
				B(f).indeterminate ? (O(), c("path", {
					key: 1,
					class: "mat-progress__linear-indeterminate-track",
					d: G.value,
					pathLength: "100",
					mask: `url(#${y})`
				}, null, 8, Dl)) : s("", !0),
				B(f).indeterminate ? (O(), c(t, { key: 2 }, [l("g", Ol, [l("path", {
					class: "mat-progress__linear-active mat-progress__linear-active--primary mat-progress__linear-segment mat-progress__linear-segment--primary",
					d: K.value,
					pathLength: "100"
				}, null, 8, kl)]), l("g", Al, [l("path", {
					class: "mat-progress__linear-active mat-progress__linear-active--secondary mat-progress__linear-segment mat-progress__linear-segment--secondary",
					d: K.value,
					pathLength: "100"
				}, null, 8, jl)])], 64)) : (O(), c("path", {
					key: 3,
					class: "mat-progress__linear-active mat-progress__linear-active--determinate",
					d: K.value,
					pathLength: "100"
				}, null, 8, Ml))
			], 8, bl)),
			B(f).indeterminate ? s("", !0) : (O(), c("span", Nl))
		], 512))], 16, yl));
	}
}), [["__scopeId", "data-v-90a3c307"]]), ru = Symbol("mat-snackbar-externally-managed"), iu = [], au = null;
function ou() {
	au || iu.length === 0 || (au = iu.shift(), au.activate());
}
function su(e) {
	e === au || iu.includes(e) || (iu.push(e), ou());
}
function cu(e) {
	let t = iu.indexOf(e);
	t !== -1 && iu.splice(t, 1);
}
function lu(e) {
	au === e && (au = null, ou());
}
//#endregion
//#region src/components/mat-snackbar/MatSnackbar.vue
var uu = { class: "mat-snackbar__text" }, du = {
	key: 0,
	class: "mat-snackbar__controls"
}, fu = {
	key: 0,
	class: "mat-snackbar__action"
}, pu = {
	key: 1,
	class: "mat-snackbar__close"
}, mu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let i = $("snackbar", e), u = r, p = ne(), m = g(At, kt), h = g(Yn, null), _ = g(ru, !1), b = M(!1), x = M("closed"), S = M(!1), C = a(() => !!p.default || typeof i.text == "string" && i.text.trim().length > 0), T = a(() => !!p.action || typeof i.actionText == "string" && i.actionText.trim().length > 0), D = a(() => !!p.close || i.closable), k = a(() => T.value || D.value), A = M(0), j = M(null), N = a(() => h ? h.snackbarLayer.value : document.body), P = a(() => typeof i.closeLabel == "string" && i.closeLabel.trim().length > 0 ? i.closeLabel : "关闭"), I = !1, L, R = qn(), ee = Jn({ motion: R }), te = !1, H = null, W = a(() => ({ "--mat-snackbar-toolbar-clearance": `${A.value}px` }));
		function G() {
			A.value = Or();
		}
		let K = { activate: le };
		function re() {
			L !== void 0 && (window.clearTimeout(L), L = void 0);
		}
		function q() {
			R.cancel();
		}
		function ie(e, t) {
			R.wait(j.value, e, t);
		}
		function J() {
			return Number.isFinite(i.duration) && i.duration >= 0 ? i.duration : 4e3;
		}
		function Y() {
			re();
			let e = J();
			e !== 0 && (L = window.setTimeout(() => {
				L = void 0, se();
			}, e));
		}
		function X() {
			te || (te = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function Z() {
			b.value && (b.value = !1, x.value = "closed", u("closed"), _ || lu(K));
		}
		function ae() {
			if (re(), !b.value) {
				_ || cu(K);
				return;
			}
			x.value !== "closing" && ee.start({
				canStart: () => b.value && x.value !== "closing",
				duration: 200,
				getElement: () => j.value,
				isActive: () => I && b.value && x.value === "closing" && !!j.value,
				onFinish: Z,
				onStart: () => {
					x.value = "closing";
				}
			});
		}
		function oe() {
			S.value || (S.value = !0, u("update:modelValue", !1));
		}
		function se() {
			oe(), ae();
		}
		function ce() {
			!b.value || x.value === "closing" || (se(), u("action"));
		}
		async function le() {
			if (!I || !i.modelValue || S.value || !C.value) {
				C.value || (X(), oe()), _ || lu(K);
				return;
			}
			re(), q(), b.value = !0, x.value = "opening", await y(), !(!I || !b.value || x.value === "closing") && ie(400, () => {
				!b.value || x.value === "closing" || (x.value = "open", Y());
			});
		}
		function ue() {
			if (S.value || !C.value) {
				C.value || (X(), se());
				return;
			}
			if (_) {
				le();
				return;
			}
			if (b.value && x.value === "closing") {
				le();
				return;
			}
			su(K);
		}
		return E(() => {
			I = !0, h || (H = kr(G), G()), i.modelValue && ue();
		}), w(() => {
			I = !1, H?.(), H = null, re(), q(), _ || (b.value ? lu(K) : cu(K));
		}), V(() => i.modelValue, (e) => {
			if (I) {
				if (e) {
					S.value = !1, ue();
					return;
				}
				S.value = !1, ae();
			}
		}), V(C, (e) => {
			if (I) {
				if (!e) {
					se();
					return;
				}
				te = !1, i.modelValue && !b.value && !S.value && ue();
			}
		}), V(() => i.duration, () => {
			x.value === "open" && Y();
		}), (e, r) => N.value ? (O(), o(n, {
			key: 0,
			to: N.value
		}, [b.value ? (O(), c("section", v({
			key: 0,
			ref_key: "snackbarElement",
			ref: j
		}, e.$attrs, {
			class: ["mat-snackbar mat-sys-typescale-body-medium", [
				`mat-snackbar--${x.value}`,
				`mat-snackbar--${B(i).position}`,
				{
					"mat-snackbar--app-root": B(h),
					"mat-snackbar--with-trailing": k.value
				}
			]],
			style: W.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [l("div", uu, [e.$slots.default ? F(e.$slots, "default", { key: 0 }, void 0, !0) : (O(), c(t, { key: 1 }, [d(z(B(i).text), 1)], 64))]), k.value ? (O(), c("div", du, [T.value ? (O(), c("div", fu, [e.$slots.action ? F(e.$slots, "action", {
			key: 0,
			action: ce
		}, void 0, !0) : (O(), o(Mt, {
			key: 1,
			class: "mat-snackbar__default-action mat-sys-typescale-label-large",
			"use-cursor": B(m).useCursor,
			onClick: ce
		}, {
			default: U(() => [d(z(B(i).actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : s("", !0), D.value ? (O(), c("div", pu, [e.$slots.close ? F(e.$slots, "close", {
			key: 0,
			close: se
		}, void 0, !0) : (O(), o(Mt, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": P.value,
			"use-cursor": B(m).useCursor,
			onClick: se
		}, {
			default: U(() => [f(hn, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : s("", !0)])) : s("", !0)], 16)) : s("", !0)], 8, ["to"])) : s("", !0);
	}
}), [["__scopeId", "data-v-6a4f08b6"]]), hu = ["aria-orientation"], gu = { class: "mat-toolbar__surface" }, _u = { class: "mat-toolbar__content" }, vu = 200, yu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
			validator: (e) => Cn(e, {
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
		function i(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let u = $("toolbar", e), d = ee(), f = ne(), m = p(), h = g(Yn, null), _ = m?.vnode.props ?? {}, b = Object.prototype.hasOwnProperty.call(_, "attach"), x = M(u.modelValue), C = M(u.modelValue ? "open" : "closed"), T = M(null), D = M(null), k = M({
			blockSize: 0,
			inlineSize: 0
		}), A = a(() => r.includes(u.variant) ? u.variant === "floating" ? "floating-bottom" : u.variant : "docked"), j = a(() => [
			"start",
			"center",
			"end"
		].includes(u.position) ? u.position : "center"), N = a(() => A.value.startsWith("floating")), P = a(() => A.value === "floating-left" || A.value === "floating-right"), I = a(() => A.value === "docked" || A.value === "floating-bottom"), L = a(() => u.app && !!h && !b), z = a(() => {
			if (!u.app) return null;
			if (L.value) return N.value ? h.freeLayer.value : null;
			if (typeof u.attach == "string") try {
				return document.querySelector(u.attach);
			} catch {
				return null;
			}
			return i(u.attach);
		}), te = a(() => {
			let e = Tn(u.bottomPlaceholder, {
				property: "block-size",
				fallback: "0px"
			});
			return e === "0" ? "0px" : e;
		}), H = a(() => I.value ? te.value : "0px"), U = a(() => [d.style, {
			"--mat-toolbar-app-bottom-offset": `${K.value?.insets.bottom ?? 0}px`,
			"--mat-toolbar-app-end-inset": `${K.value?.insets.end ?? 0}px`,
			"--mat-toolbar-app-start-inset": `${K.value?.insets.start ?? 0}px`,
			"--mat-toolbar-bottom-placeholder": H.value
		}]), W = a(() => ({
			blockSize: `${k.value.blockSize}px`,
			inlineSize: `${k.value.inlineSize}px`
		})), G = a(() => [
			`mat-toolbar--${A.value}`,
			`mat-toolbar--position-${j.value}`,
			{
				"mat-toolbar--app": u.app,
				"mat-toolbar--app-root": L.value,
				"mat-toolbar--vertical": P.value,
				"mat-toolbar--vibrant": u.vibrant
			}
		]), K = R(null), re, q, ie = !1, J = !1, Y = qn(), X = Jn({ motion: Y }), Z = !1;
		function ae() {
			Y.cancel();
		}
		function oe(e) {
			Y.wait(T.value, vu, e);
		}
		async function se() {
			ae(), x.value = !0, C.value = "opening", await y(), !(!J || !x.value || !u.modelValue || C.value !== "opening") && oe(() => {
				x.value && u.modelValue && (C.value = "open");
			});
		}
		function ce() {
			if (!x.value) {
				C.value = "closed";
				return;
			}
			C.value !== "closing" && X.start({
				canStart: () => x.value && C.value !== "closing",
				duration: vu,
				getElement: () => T.value,
				isActive: () => J && !u.modelValue && x.value && C.value === "closing",
				onFinish: () => {
					x.value = !1, C.value = "closed";
				},
				onStart: () => {
					C.value = "closing";
				}
			});
		}
		function le() {
			Z || !f.fab || N.value || (Z = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function ue() {
			let e = T.value?.getBoundingClientRect();
			e && (k.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, re?.update(), K.value?.update());
		}
		function de() {
			if (!T.value) return null;
			let e = T.value.getBoundingClientRect(), t = D.value?.getBoundingClientRect();
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
			J && (await y(), ue());
		}
		function pe() {
			q?.disconnect(), q = void 0, ie = !1, window.removeEventListener("resize", ue), re?.unregister(), re = void 0, K.value?.unregister(), K.value = null;
		}
		async function me() {
			if (await y(), J) {
				if (!x.value || !T.value) {
					pe();
					return;
				}
				ie || (ie = !0, q = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(ue), q?.observe(T.value), window.addEventListener("resize", ue)), L.value ? (re?.unregister(), re = void 0, !N.value && !K.value && (K.value = h.publicContext.registerEdge({
					edge: "bottom",
					element: T.value
				})), N.value && K.value && (K.value.unregister(), K.value = null)) : (K.value?.unregister(), K.value = null, re ||= Er(T.value, {
					getRect: de,
					isBottom: () => I.value
				})), D.value && q?.observe(D.value), ue(), le();
			}
		}
		E(() => {
			J = !0, he(), le(), me();
		}), w(() => {
			J = !1, ae(), pe();
		}), V(() => u.modelValue, (e) => {
			if (J) {
				if (e) {
					se();
					return;
				}
				ce();
			}
		}), V(x, me), V([
			A,
			j,
			te,
			() => u.app,
			() => u.attach,
			L
		], () => {
			he(), fe(), me();
		});
		function he() {
			u.app && !L.value && !z.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (r, i) => (O(), c(t, null, [e.placeholder && x.value && (!e.app || z.value || L.value) ? (O(), c("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: S(W.value),
			"aria-hidden": "true"
		}, null, 4)) : s("", !0), (O(), o(n, {
			to: z.value ?? "body",
			disabled: !e.app || L.value && !N.value
		}, [x.value && (!e.app || z.value || L.value) ? (O(), c("div", v({
			key: 0,
			ref_key: "toolbarElement",
			ref: T
		}, r.$attrs, {
			class: ["mat-toolbar", [G.value, `mat-toolbar--${C.value}`]],
			style: U.value,
			role: "toolbar",
			"aria-orientation": P.value ? "vertical" : void 0
		}), [l("div", gu, [l("div", _u, [F(r.$slots, "default", {}, void 0, !0)])]), N.value && B(f).fab ? (O(), c("div", {
			key: 0,
			ref_key: "fabElement",
			ref: D,
			class: "mat-toolbar__fab"
		}, [F(r.$slots, "fab", {}, void 0, !0)], 512)) : s("", !0)], 16, hu)) : s("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-49a9f065"]]), bu = Symbol("mat-panes"), xu = [
	"compact",
	"medium",
	"expanded",
	"large",
	"extra-large"
], Su = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => xu.includes(e)
	},
	setup(e, { emit: t }) {
		let n = $("panes", e), r = t, i = M(null), o = L([]), s = M(null), l = M(null), u = M(null), d = /* @__PURE__ */ new Map(), f, p, m, h, g, _ = a(() => s.value ?? b.value), b = a(() => {
			let e = {};
			return o.forEach((t) => {
				let r = n.sizes?.[t.id];
				e[t.id] = typeof r == "number" && Number.isFinite(r) && r >= 0 ? r : 1;
			}), Object.values(e).reduce((e, t) => e + t, 0) === 0 && o.length > 0 && o.forEach((t) => {
				e[t.id] = 1;
			}), e;
		});
		function x(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function S(e, t) {
			return `${e}::${t}`;
		}
		function C(e) {
			return o.findIndex((t) => t.id === e);
		}
		function T(e) {
			return o.find((t) => t.id === e)?.element.value ?? null;
		}
		function D(e) {
			let t = T(e);
			return t ? t.getBoundingClientRect().width : 0;
		}
		function A(e) {
			let t = C(e);
			if (t < 0 || t >= o.length - 1) return null;
			let n = o[t], r = o[t + 1];
			return {
				key: S(n.id, r.id),
				left: n,
				right: r
			};
		}
		function j(e) {
			return _.value[e] ?? 0;
		}
		function N(e) {
			return { "--mat-pane-weight": j(e) };
		}
		function P(e) {
			return n.resizable && A(e) !== null;
		}
		function I(e) {
			return A(e) !== null;
		}
		function R(e) {
			return A(e)?.key === l.value;
		}
		function z(e) {
			let t = A(e);
			if (!t) return {};
			let n = j(t.left.id) + j(t.right.id), r = n === 0 ? 50 : Math.round(j(t.left.id) / n * 100);
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
			return { ..._.value };
		}
		function ee(e) {
			h !== void 0 && globalThis.clearTimeout(h), h = globalThis.setTimeout(() => {
				h = void 0, s.value === e && (s.value = null);
			}, 0);
		}
		function te(e) {
			let t = {};
			o.forEach((n) => {
				t[n.id] = Math.max(0, e[n.id] ?? 0);
			}), s.value = t, r("update:sizes", t), ee(t);
		}
		function ne(e, t, n, r, i) {
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : x(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function H(e) {
			let t = A(e);
			if (!t) return null;
			let n = D(t.left.id), r = D(t.right.id);
			return {
				leftWidth: n,
				rightWidth: r,
				totalWidth: n + r
			};
		}
		function U(e, t) {
			if (!n.resizable || f || t.button !== void 0 && t.button !== 0) return;
			let r = A(e), i = H(e);
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
			let n = A(e);
			if (!n || n.key !== f.boundary.key) return;
			let r = x(f.metrics.leftWidth + t.clientX - f.startX, 0, f.metrics.totalWidth);
			s.value = ne(n.left.id, n.right.id, r, f.metrics.totalWidth, f.startWeights), f.changed = !0;
		}
		let G = Ja(({ event: e, id: t }) => {
			W(t, e);
		});
		function K(e, t) {
			!f || f.pointerId !== t.pointerId || G.schedule({
				event: t,
				id: e
			});
		}
		function re(e, t, n) {
			if (!f || f.pointerId !== t.pointerId) return;
			n ? G.flush() : G.cancel();
			let r = A(e), i = f.changed, a = s.value;
			if (f = void 0, l.value = null, n && i && a && r) {
				te(a);
				return;
			}
			s.value = null;
		}
		function q(e, t) {
			let r = A(e);
			if (!r || !n.resizable) return;
			let i = {
				ArrowLeft: -1,
				ArrowRight: 1
			}[t.key], a = H(e), o = B(), s = o[r.left.id] + o[r.right.id] || 2, c = a?.totalWidth || 100, l = c * (o[r.left.id] / s), u;
			if (i !== void 0) u = x(l + i * (t.shiftKey ? 64 : 16), 0, c);
			else if (t.key === "Home") u = 0;
			else if (t.key === "End") u = c;
			else if (t.key === "Enter") {
				let e = r.key, t = o[r.left.id];
				t === 0 ? u = c * (d.get(e) ?? .5) : (d.set(e, t / s), u = 0);
			} else return;
			t.preventDefault(), te(ne(r.left.id, r.right.id, u, c, o));
		}
		function ie(e) {
			return o.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), o.push(e), () => {
				let t = o.indexOf(e);
				t !== -1 && o.splice(t, 1);
			};
		}
		function J() {
			let e = /* @__PURE__ */ new Set();
			o.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in n.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function Y() {
			let e = {};
			return o.forEach((t) => {
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
			X(g, e) || (g = e, r("update:widths", e));
		}
		function ae(e = !1) {
			m !== void 0 && globalThis.clearTimeout(m), m = globalThis.setTimeout(Z, e ? 0 : 100);
		}
		function oe() {
			typeof globalThis.ResizeObserver == "function" && (p ||= new globalThis.ResizeObserver(() => {
				ae();
			}), p.disconnect(), i.value && p.observe(i.value), o.forEach((e) => {
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
		return k(bu, {
			getHandleAttributes: z,
			getPaneStyle: N,
			hasBoundary: I,
			handleKeyDown: q,
			handlePointerDown: U,
			handlePointerMove: K,
			isBoundaryActive: R,
			isHandleVisible: P,
			registerPane: ie,
			finishPointerInteraction: re
		}), V(() => o.map((e) => e.id), async () => {
			await y(), J(), oe(), ae();
		}, {
			flush: "post",
			immediate: !0
		}), V(() => n.sizes, () => {
			s.value = null;
		}, { deep: !0 }), E(() => {
			ce(!0), oe(), ae(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", le);
		}), w(() => {
			G.cancel(), globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", le), p?.disconnect(), m !== void 0 && globalThis.clearTimeout(m), h !== void 0 && globalThis.clearTimeout(h);
		}), (e, t) => (O(), c("div", v({
			ref_key: "root",
			ref: i
		}, e.$attrs, { class: "mat-panes" }), [F(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-e119bd21"]]), Cu = ["id"], wu = {
	key: 0,
	class: "mat-pane__separator"
}, Tu = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], Eu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
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
		let n = $("pane", e), r = g(bu, null), i = M(null), o = a(() => n.resizeLabel), u, d = a(() => r?.getPaneStyle(n.id) ?? { "--mat-pane-weight": 1 }), f = a(() => !!r?.hasBoundary(n.id)), p = a(() => !!r?.isHandleVisible(n.id)), m = a(() => r?.getHandleAttributes(n.id) ?? {}), h = a(() => !!r?.isBoundaryActive(n.id));
		function _() {
			u?.(), u = void 0, r && (u = r.registerPane({
				element: i,
				id: n.id,
				resizeLabel: o
			}));
		}
		return E(_), V(() => n.id, _), w(() => u?.()), (a, o) => (O(), c(t, null, [l("div", v({
			ref_key: "root",
			ref: i
		}, a.$attrs, {
			id: B(n).id,
			class: "mat-pane",
			style: d.value
		}), [F(a.$slots, "default", {}, void 0, !0)], 16, Cu), f.value ? (O(), c("div", wu, [p.value ? (O(), c("div", {
			key: 0,
			class: b(["mat-pane__handle", { "mat-pane__handle--active": h.value }]),
			role: "separator",
			"aria-controls": m.value["aria-controls"],
			"aria-label": m.value["aria-label"],
			"aria-orientation": m.value["aria-orientation"],
			"aria-valuemax": m.value["aria-valuemax"],
			"aria-valuemin": m.value["aria-valuemin"],
			"aria-valuenow": m.value["aria-valuenow"],
			tabindex: "0",
			onKeydown: o[0] ||= (t) => B(r).handleKeyDown(e.id, t),
			onLostpointercapture: o[1] ||= (t) => B(r).finishPointerInteraction(e.id, t, !1),
			onPointercancel: o[2] ||= (t) => B(r).finishPointerInteraction(e.id, t, !1),
			onPointerdown: o[3] ||= (t) => B(r).handlePointerDown(e.id, t),
			onPointermove: o[4] ||= (t) => B(r).handlePointerMove(e.id, t),
			onPointerup: o[5] ||= (t) => B(r).finishPointerInteraction(e.id, t, !0)
		}, null, 42, Tu)) : s("", !0)])) : s("", !0)], 64));
	}
}), [["__scopeId", "data-v-1bf28501"]]), Du = Symbol("mat-navigation-rail"), Ou = { class: "mat-navigation-item__indicator mat-navigation-rail-item__indicator mat-navigation-bar-item__indicator" }, ku = {
	key: 0,
	class: "mat-navigation-item__icon-wrap mat-navigation-rail-item__icon-wrap mat-navigation-bar-item__icon-wrap"
}, Au = { class: "mat-navigation-item__label-wrap mat-navigation-rail-item__label-wrap mat-navigation-bar-item__label-wrap" }, ju = {
	key: 0,
	class: "mat-navigation-item__spacer mat-navigation-rail-item__spacer",
	"aria-hidden": "true"
}, Mu = {
	key: 1,
	class: "mat-navigation-item__trailing mat-navigation-rail-item__trailing"
}, Nu = {
	key: 0,
	class: "mat-navigation-item__spacer mat-navigation-rail-item__spacer",
	"aria-hidden": "true"
}, Pu = {
	key: 1,
	class: "mat-navigation-item__trailing mat-navigation-rail-item__trailing"
}, Fu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatNavigationItem",
	inheritAttrs: !1
}, {
	__name: "MatNavigationItem",
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
		},
		componentName: {
			type: String,
			default: "MatNavigationItem"
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
		], i = $("navigationItem", e), u = n, d = ne(), f = g(At, kt), p = g(Du, null), m = a(() => p?.expanded.value ?? !1), h = a(() => p?.fullWidth.value ?? !1), _ = a(() => p?.orientation.value === "horizontal"), y = a(() => p?.isSelected(i.value) ?? !1), x = a(() => !!(d.icon || i.icon && i.icon.trim())), S = a(() => x.value || !m.value), C = a(() => x.value ? i.icon : "circle"), w = a(() => {
			let e = i.badge;
			return e ? {
				content: m.value ? void 0 : e.content,
				dot: !m.value && e.dot,
				location: r.includes(e.location) ? e.location : "top-end",
				color: e.color
			} : null;
		}), T = a(() => Kr("label", m.value && !_.value ? "large" : "medium")), E = a(() => Kr("label", "medium")), D = a(() => ({
			"mat-navigation-item": !0,
			"mat-navigation-rail-item": !_.value,
			"mat-navigation-bar-item": _.value,
			"mat-navigation-item--selected": y.value,
			"mat-navigation-rail-item--selected": y.value,
			"mat-navigation-bar-item--selected": y.value,
			"mat-navigation-item--disabled": i.disabled,
			"mat-navigation-rail-item--disabled": i.disabled,
			"mat-navigation-bar-item--disabled": i.disabled,
			"mat-navigation-item--expanded": m.value,
			"mat-navigation-rail-item--expanded": m.value,
			"mat-navigation-item--collapsed": !m.value,
			"mat-navigation-rail-item--collapsed": !m.value,
			"mat-navigation-item--horizontal": _.value,
			"mat-navigation-rail-item--horizontal": _.value,
			"mat-navigation-bar-item--horizontal": _.value,
			"mat-navigation-item--full-width": h.value,
			"mat-navigation-rail-item--full-width": h.value
		}));
		V(() => i.badge?.location, (e) => {}, { immediate: !0 });
		function k(e) {
			i.disabled || p?.requestSelection(i.value), u("click", e);
		}
		return (e, n) => (O(), o(Mt, v(e.$attrs, {
			class: ["mat-navigation-item", D.value],
			"aria-current": y.value ? "page" : void 0,
			disabled: B(i).disabled,
			"focus-ring": !1,
			href: B(i).href,
			"use-cursor": B(f).useCursor,
			onClick: k
		}), {
			default: U(() => [
				l("span", Ou, [
					S.value ? (O(), c("span", ku, [w.value ? (O(), o(Xo, {
						key: 0,
						color: w.value.color,
						content: w.value.content,
						dot: w.value.dot,
						location: w.value.location
					}, {
						default: U(() => [B(d).icon ? F(e.$slots, "icon", {
							key: 0,
							selected: y.value
						}, void 0, !0) : (O(), o(hn, {
							key: 1,
							fill: +!!y.value,
							icon: C.value,
							class: "mat-navigation-item__icon mat-navigation-rail-item__icon mat-navigation-bar-item__icon",
							"aria-hidden": "true"
						}, null, 8, ["fill", "icon"]))]),
						_: 3
					}, 8, [
						"color",
						"content",
						"dot",
						"location"
					])) : (O(), c(t, { key: 1 }, [B(d).icon ? F(e.$slots, "icon", {
						key: 0,
						selected: y.value
					}, void 0, !0) : (O(), o(hn, {
						key: 1,
						fill: +!!y.value,
						icon: C.value,
						class: "mat-navigation-item__icon mat-navigation-rail-item__icon mat-navigation-bar-item__icon",
						"aria-hidden": "true"
					}, null, 8, ["fill", "icon"]))], 64))])) : s("", !0),
					l("span", Au, [l("span", { class: b([
						"mat-navigation-item__label",
						"mat-navigation-rail-item__label",
						"mat-navigation-bar-item__label",
						T.value
					]) }, [F(e.$slots, "default", {}, void 0, !0)], 2)]),
					h.value ? (O(), c(t, { key: 1 }, [e.$slots.trailing ? (O(), c("span", ju)) : s("", !0), e.$slots.trailing ? (O(), c("span", Mu, [F(e.$slots, "trailing", {
						expanded: m.value,
						selected: y.value
					}, void 0, !0)])) : s("", !0)], 64)) : s("", !0)
				]),
				l("span", { class: b([
					"mat-navigation-item__label",
					"mat-navigation-rail-item__label",
					"mat-navigation-bar-item__label",
					E.value
				]) }, [F(e.$slots, "default", {}, void 0, !0)], 2),
				h.value ? s("", !0) : (O(), c(t, { key: 0 }, [e.$slots.trailing ? (O(), c("span", Nu)) : s("", !0), e.$slots.trailing ? (O(), c("span", Pu, [F(e.$slots, "trailing", {
					expanded: m.value,
					selected: y.value
				}, void 0, !0)])) : s("", !0)], 64))
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
}), [["__scopeId", "data-v-93081cfe"]]), Iu = /*@__PURE__*/ Object.assign({
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
	setup(e, { emit: t }) {
		let n = $("navigationRailItem", e), r = t;
		return (e, t) => (O(), o(Fu, v({
			...e.$attrs,
			...B(n)
		}, {
			"component-name": "MatNavigationRailItem",
			onClick: t[0] ||= (e) => r("click", e)
		}), u({ _: 2 }, [P(e.$slots, (t, n) => ({
			name: n,
			fn: U((t) => [F(e.$slots, n, x(m(t)))])
		}))]), 1040));
	}
}), Lu = { class: "mat-navigation-rail__layout" }, Ru = {
	key: 0,
	class: "mat-navigation-rail__header"
}, zu = {
	key: 1,
	class: "mat-navigation-rail__content"
}, Bu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatNavigationRail",
	inheritAttrs: !1
}, {
	__name: "MatNavigationRail",
	props: {
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
			validator: (e) => Cn(e, { property: "inline-size" })
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
		attach: {
			type: [String, Object],
			default: void 0
		},
		placeholder: {
			type: Boolean,
			default: !1
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		containerColor: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: void 0
		},
		safeArea: {
			type: [
				Boolean,
				Number,
				String
			],
			default: !0
		},
		safeAreaSize: {
			type: [Number, String],
			default: void 0
		},
		mode: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || [
					"docked",
					"flow",
					"sticky",
					"fixed"
				].includes(e);
			}
		},
		transition: {
			type: Boolean,
			default: !0
		},
		zIndex: {
			type: [Number, String],
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (e) => [
			"string",
			"number",
			"boolean"
		].includes(typeof e),
		"update:expanded": (e) => typeof e == "boolean",
		"update:open": (e) => typeof e == "boolean"
	},
	setup(e, { expose: n, emit: r }) {
		let u = $("navigationRail", e), d = r, p = g(At, kt), m = ne(), y = ee(), x = g(ti, null), C = a(() => {
			let e = { ...y };
			return delete e.app, e;
		}), T = M(null), E = a(() => u.mode === void 0 ? x ? "docked" : "flow" : u.mode), D = a(() => u.layout === "modal"), A = a(() => u.hideOnCollapse && !u.expanded), j = M(u.expanded), N = M(!A.value), P = a(() => N.value && !!m.header), I = a(() => u.expanded), L = a(() => u.open === void 0 ? u.hideOnCollapse || D.value ? u.expanded : !0 : u.open), R = qn(), z = Jn({ motion: R });
		function te() {
			if (R.cancel(), u.expanded || !A.value) {
				j.value = u.expanded, N.value = !0;
				return;
			}
			z.start({
				canStart: () => A.value,
				duration: 200,
				getElement: () => T.value?.hostElement,
				isActive: () => A.value && N.value && !!T.value?.hostElement,
				onFinish: () => {
					j.value = !1, N.value = !1;
				},
				onStart: () => {
					N.value = !0;
				}
			});
		}
		V(() => u.expanded, te);
		function H(e) {
			return e.type === Iu || e.type?.name === "MatNavigationRailItem" || e.type === Fu || e.type?.name === "MatNavigationItem";
		}
		function W(e) {
			if (H(e)) return !0;
			let t = e.type?.name || e.type?.__name;
			return !!(t === "MatFab" || t === "MatBtn" || t === "MatActionBase" || t === "MatSpacer" || e.props && (e.props["data-rail-action"] !== void 0 || e.props.collapsibleVisible !== void 0));
		}
		function G(e) {
			return _(e) ? e.type === t && Array.isArray(e.children) ? h(t, { key: e.key }, e.children.map(G)) : H(e) || I.value || W(e) ? e : i(e, { hidden: !0 }) : e;
		}
		function K() {
			return m.default?.({
				expanded: u.expanded,
				orientation: "vertical"
			}).map(G);
		}
		let re = a(() => {
			if (u.width !== void 0) {
				let e = Tn(u.width, { property: "inline-size" });
				if (e !== void 0) return e === "0" ? "0" : e;
			}
			return u.expanded || D.value ? "var(--mat-navigation-rail-expanded-width, 240px)" : "var(--mat-navigation-rail-collapsed-width, 80px)";
		}), q = a(() => ({
			"mat-navigation-rail": !0,
			"mat-navigation-rail-host": !0,
			"mat-navigation-rail-host--vertical": !0,
			"mat-navigation-rail-host--expanded": u.expanded,
			"mat-navigation-rail-host--collapsed": !u.expanded,
			"mat-navigation-rail-host--modal": D.value,
			"mat-navigation-rail-host--hidden": A.value,
			"mat-navigation-rail--expanded": u.expanded,
			"mat-navigation-rail--collapsed": !u.expanded,
			"mat-navigation-rail--modal": D.value && u.expanded,
			"mat-navigation-rail--with-header": P.value,
			"mat-navigation-rail--explicit-container-color": u.containerColor && !D.value
		})), ie = a(() => {
			let e = {};
			if (u.width !== void 0) {
				let t = Tn(u.width, { property: "inline-size" });
				t !== void 0 && (e["--mat-navigation-rail-expanded-width"] = t);
			}
			return D.value && (e.maxInlineSize = x?.rootElement?.value ? "calc(100% - var(--mat-navigation-rail-modal-edge-space, 8px))" : "calc(100dvi - var(--mat-navigation-rail-modal-edge-space, 8px))"), e;
		});
		function J(e) {
			d("update:open", e), !e && (D.value || u.hideOnCollapse) && d("update:expanded", !1);
		}
		return k(Du, {
			expanded: a(() => u.expanded),
			fullWidth: a(() => u.fullWidth),
			orientation: a(() => "vertical"),
			isSelected: (e) => e !== void 0 && Object.is(u.modelValue, e),
			requestSelection: (e) => {
				e !== void 0 && !Object.is(u.modelValue, e) && d("update:modelValue", e);
			},
			useCursor: p.useCursor
		}), w(() => {
			R.cancel();
		}), n({
			asideRef: T,
			hostElement: a(() => T.value?.hostElement)
		}), (e, t) => (O(), o(Oi, v({
			ref_key: "asideRef",
			ref: T,
			as: "nav",
			location: "start",
			attach: B(u).attach,
			placeholder: B(u).placeholder,
			bordered: B(u).bordered,
			modal: D.value,
			open: L.value,
			"block-size": re.value,
			"safe-area": B(u).safeArea,
			"safe-area-size": B(u).safeAreaSize,
			mode: E.value,
			transition: B(u).transition,
			"z-index": B(u).zIndex,
			"scrim-class": "mat-navigation-rail__scrim",
			"close-on-back": !0,
			class: q.value,
			style: ie.value
		}, C.value, { "onUpdate:open": J }), {
			placeholder: U(({ style: e }) => [l("span", {
				class: "mat-navigation-rail__placeholder mat-aside__placeholder",
				style: S(e),
				"aria-hidden": "true"
			}, null, 4)]),
			default: U(() => [f(ns, {
				class: "mat-navigation-rail__scroll-area",
				orientation: "vertical",
				"bar-width": "thin",
				"shadow-length": 0,
				"no-scroll-padding": ""
			}, {
				default: U(() => [l("div", Lu, [P.value && N.value ? (O(), c("div", Ru, [F(e.$slots, "header", { expanded: B(u).expanded }, void 0, !0)])) : s("", !0), N.value ? (O(), c("div", zu, [l("div", { class: b(["mat-navigation-rail__destinations", [`mat-navigation-rail__destinations--${B(u).alignment}`, { "mat-navigation-rail__destinations--show-custom-content": I.value }]]) }, [f(K)], 2)])) : s("", !0)])]),
				_: 3
			})]),
			_: 3
		}, 16, [
			"attach",
			"placeholder",
			"bordered",
			"modal",
			"open",
			"block-size",
			"safe-area",
			"safe-area-size",
			"mode",
			"transition",
			"z-index",
			"class",
			"style"
		]));
	}
}), [["__scopeId", "data-v-bef8c7df"]]), Vu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatNavigationBar",
	inheritAttrs: !1
}, {
	__name: "MatNavigationBar",
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: null
		},
		alignment: {
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
		height: {
			type: [Number, String],
			default: void 0,
			validator: (e) => e === void 0 || Cn(e, {
				property: "block-size",
				positive: !0
			})
		},
		safeArea: {
			type: [
				Boolean,
				Number,
				String
			],
			default: !0
		},
		safeAreaSize: {
			type: [Number, String],
			default: void 0
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: void 0
		},
		transition: {
			type: Boolean,
			default: !0
		},
		mode: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || [
					"docked",
					"flow",
					"sticky",
					"fixed"
				].includes(e);
			}
		},
		zIndex: {
			type: [Number, String],
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (e) => [
			"string",
			"number",
			"boolean"
		].includes(typeof e),
		"update:open": (e) => typeof e == "boolean"
	},
	setup(e, { expose: t, emit: n }) {
		let r = $("navigationBar", e), i = n, s = g(At, kt), c = g(ai, null), u = M(null), d = p()?.vnode.props ?? {}, f = a(() => Object.prototype.hasOwnProperty.call(d, "attach") && d.attach !== void 0), m = a(() => f.value ? r.attach : void 0), h = a(() => {
			if (r.mode !== void 0) return r.mode;
			if (!r.app) return c ? "docked" : "flow";
		}), _ = a(() => r.height === void 0 ? 64 : r.height);
		return k(Du, {
			expanded: a(() => !1),
			fullWidth: a(() => !1),
			orientation: a(() => "horizontal"),
			isSelected: (e) => e !== void 0 && Object.is(r.modelValue, e),
			requestSelection: (e) => {
				e !== void 0 && !Object.is(r.modelValue, e) && i("update:modelValue", e);
			},
			useCursor: s.useCursor
		}), t({
			asideRef: u,
			hostElement: a(() => u.value?.hostElement)
		}), (e, t) => (O(), o(Oi, v({
			ref_key: "asideRef",
			ref: u,
			as: "nav",
			location: "bottom",
			app: B(r).app,
			attach: m.value,
			placeholder: B(r).placeholder,
			"block-size": _.value,
			"safe-area": B(r).safeArea,
			"safe-area-size": B(r).safeAreaSize,
			bordered: B(r).bordered,
			open: B(r).open,
			transition: B(r).transition,
			mode: h.value,
			"z-index": B(r).zIndex,
			class: "mat-navigation-bar"
		}, e.$attrs, { "onUpdate:open": t[0] ||= (e) => i("update:open", e) }), {
			default: U(() => [l("div", { class: b(["mat-navigation-bar__content", `mat-navigation-bar__content--${B(r).alignment}`]) }, [F(e.$slots, "default", {}, void 0, !0)], 2)]),
			_: 3
		}, 16, [
			"app",
			"attach",
			"placeholder",
			"block-size",
			"safe-area",
			"safe-area-size",
			"bordered",
			"open",
			"transition",
			"mode",
			"z-index"
		]));
	}
}), [["__scopeId", "data-v-a6a8d1ff"]]), Hu = /*@__PURE__*/ Object.assign({
	name: "MatNavigationBarItem",
	inheritAttrs: !1
}, {
	__name: "MatNavigationBarItem",
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
	setup(e, { emit: t }) {
		let n = $("navigationBarItem", e), r = t;
		return (e, t) => (O(), o(Fu, v({
			...e.$attrs,
			...B(n)
		}, {
			"component-name": "MatNavigationBarItem",
			onClick: t[0] ||= (e) => r("click", e)
		}), u({ _: 2 }, [P(e.$slots, (t, n) => ({
			name: n,
			fn: U((t) => [F(e.$slots, n, x(m(t)))])
		}))]), 1040));
	}
}), Uu = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatNavigationDrawer",
	inheritAttrs: !1
}, {
	__name: "MatNavigationDrawer",
	props: {
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
			validator: (e) => Cn(e, { property: "inline-size" })
		},
		layout: {
			type: String,
			default: "standard",
			validator(e) {
				return ["standard", "modal"].includes(e);
			}
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
		attach: {
			type: [String, Object],
			default: void 0
		},
		placeholder: {
			type: Boolean,
			default: !1
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		containerColor: {
			type: Boolean,
			default: !1
		},
		safeArea: {
			type: [
				Boolean,
				Number,
				String
			],
			default: !0
		},
		safeAreaSize: {
			type: [Number, String],
			default: void 0
		},
		mode: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || [
					"docked",
					"flow",
					"sticky",
					"fixed"
				].includes(e);
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
	setup(e, { emit: t }) {
		let n = $("navigationDrawer", e), r = t;
		return (e, t) => (O(), o(Bu, v(e.$attrs, {
			class: "mat-navigation-drawer",
			"model-value": B(n).modelValue,
			expanded: B(n).expanded,
			width: B(n).width,
			layout: B(n).layout,
			alignment: B(n).alignment,
			bordered: B(n).bordered,
			"container-color": B(n).containerColor,
			attach: B(n).attach,
			placeholder: B(n).placeholder,
			"safe-area": B(n).safeArea,
			"safe-area-size": B(n).safeAreaSize,
			mode: B(n).mode,
			"full-width": !0,
			collapsible: !0,
			"hide-on-collapse": !0,
			"onUpdate:modelValue": t[0] ||= (e) => r("update:modelValue", e),
			"onUpdate:expanded": t[1] ||= (e) => r("update:expanded", e)
		}), u({ _: 2 }, [P(e.$slots, (t, n) => ({
			name: n,
			fn: U((t) => [F(e.$slots, n, x(m(t)), void 0, !0)])
		}))]), 1040, [
			"model-value",
			"expanded",
			"width",
			"layout",
			"alignment",
			"bordered",
			"container-color",
			"attach",
			"placeholder",
			"safe-area",
			"safe-area-size",
			"mode"
		]));
	}
}), [["__scopeId", "data-v-beef4203"]]), Wu = ["aria-hidden"], Gu = { class: "mat-navigation-group__items" }, Ku = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({
	name: "MatNavigationGroup",
	inheritAttrs: !1
}, {
	__name: "MatNavigationGroup",
	props: {
		expanded: {
			type: Boolean,
			default: !1
		},
		modelValue: {
			type: Boolean,
			default: void 0
		},
		title: {
			type: String,
			default: void 0
		},
		indent: {
			type: [Number, String],
			default: 16
		}
	},
	emits: {
		"update:expanded": (e) => typeof e == "boolean",
		"update:modelValue": (e) => typeof e == "boolean"
	},
	setup(e, { emit: t }) {
		let n = $("navigationGroup", e), r = t, i = M(n.modelValue ?? n.expanded);
		V(() => n.modelValue, (e) => {
			e !== void 0 && (i.value = e);
		}), V(() => n.expanded, (e) => {
			n.modelValue === void 0 && (i.value = e);
		});
		let o = a(() => i.value);
		function s() {
			let e = !o.value;
			i.value = e, r("update:expanded", e), r("update:modelValue", e);
		}
		let u = a(() => ({ "--mat-navigation-group-indent": Tn(n.indent, {
			property: "inline-size",
			fallback: "16px"
		}) }));
		return (e, t) => (O(), c("div", v(e.$attrs, {
			class: ["mat-navigation-group", { "mat-navigation-group--expanded": o.value }],
			style: u.value
		}), [F(e.$slots, "activator", {
			expanded: o.value,
			toggle: s
		}, void 0, !0), l("div", {
			class: "mat-navigation-group__content",
			"aria-hidden": o.value ? void 0 : "true"
		}, [l("div", Gu, [F(e.$slots, "default", {}, void 0, !0)])], 8, Wu)], 16));
	}
}), [["__scopeId", "data-v-260c72e4"]]), qu = /* @__PURE__ */ new WeakMap();
function Ju(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function Yu(e, t) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: n, options: r } = Ju(t.value), i = new IntersectionObserver((t, r) => {
		let i = qu.get(e);
		if (!i || i.observer !== r) return;
		let a = t.some((e) => e.isIntersecting), o = !i.initialized;
		i.initialized = !0, n && !(i.quiet && o) && n(a, t, r), i.once && a && (r.unobserve(e), qu.delete(e));
	}, r);
	qu.set(e, {
		handler: n,
		observer: i,
		once: !!t.modifiers?.once,
		quiet: !!t.modifiers?.quiet,
		initialized: !1
	}), i.observe(e);
}
function Xu(e) {
	let t = qu.get(e);
	t && (t.observer.unobserve(e), qu.delete(e));
}
var Zu = {
	mounted: Yu,
	updated(e, t) {
		qu.has(e) && (Xu(e), Yu(e, t));
	},
	unmounted: Xu
}, Qu = Object.freeze({
	MatDynamicText: Object.freeze(["MdeDynamicText", "mde-dynamic-text"]),
	MatSharedElement: Object.freeze(["MdeSharedElement", "mde-shared-element"]),
	MatVirtualScroll: Object.freeze(["MdeVirtualScroll", "mde-virtual-scroll"])
}), $u = kt, ed = null;
function td(e, t) {
	$u = e, ed = t;
}
function nd() {
	return $u;
}
function rd() {
	return ed;
}
//#endregion
//#region src/theme.js
var id = "#20a6fc", ad = "(prefers-color-scheme: dark)";
function od(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function sd(e) {
	if (!Zt.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function cd(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function ld(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function ud(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function dd(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("theme 选项必须是对象");
	let t = e.mode ?? "system", n = e.seedColor ?? id, r = e.schemeVariant ?? "tonal-spot", i = e.contrastLevel ?? 0, a = e.target ?? document.documentElement;
	od(t), ud(n), sd(r), cd(i), ld(a);
	let o = M(t), s = M(rn(n)), c = M(r), l = M(i), u = M("light"), d = null, f = !1, p = !1;
	function m() {
		return !d && typeof window.matchMedia == "function" && (d = window.matchMedia(ad)), d;
	}
	function h() {
		return o.value === "system" ? m()?.matches ? "dark" : "light" : o.value;
	}
	function g() {
		u.value = h();
		let e = an({
			seedColor: s.value,
			isDark: u.value === "dark",
			schemeVariant: c.value,
			contrastLevel: l.value
		});
		Object.entries(Qt).forEach(([t, n]) => {
			a.style.setProperty(`--mat-sys-color-${n}`, Z(e[t]));
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
		od(e), o.value = e, y(), g();
	}
	function x(e) {
		ud(e), s.value = rn(e), g();
	}
	function S(e) {
		sd(e), c.value = e, g();
	}
	function C(e) {
		cd(e), l.value = e, g();
	}
	function w() {
		p = !0, v(), Object.values(Qt).forEach((e) => {
			a.style.removeProperty(`--mat-sys-color-${e}`);
		}), a.removeAttribute?.("data-mat-theme"), a.style.removeProperty("color-scheme");
	}
	return y(), g(), {
		mode: j(o),
		resolvedMode: j(u),
		seedColor: j(s),
		schemeVariant: j(c),
		contrastLevel: j(l),
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
var fd = [
	[
		"MatAppRoot",
		"mat-app-root",
		ii
	],
	[
		"MatAppBar",
		"mat-app-bar",
		Bi
	],
	[
		"MatSearch",
		"mat-search",
		Wi
	],
	[
		"MatBtn",
		"mat-btn",
		Jr
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		Ki
	],
	[
		"MatFab",
		"mat-fab",
		$i
	],
	[
		"MatFabMenu",
		"mat-fab-menu",
		ia
	],
	[
		"MatIcon",
		"mat-icon",
		hn
	],
	[
		"MatImage",
		"mat-image",
		oa
	],
	[
		"MatSharedElement",
		"mat-shared-element",
		da
	],
	[
		"MatAvatar",
		"mat-avatar",
		ma
	],
	[
		"MatShape",
		"mat-shape",
		Fn
	],
	[
		"MatText",
		"mat-text",
		ha
	],
	[
		"MatDynamicText",
		"mat-dynamic-text",
		xa
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		Ca
	],
	[
		"MatCard",
		"mat-card",
		ja
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		Na
	],
	[
		"MatCardContent",
		"mat-card-content",
		Fa
	],
	[
		"MatCardActions",
		"mat-card-actions",
		La
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		Ea
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		Aa
	],
	[
		"MatCardMedia",
		"mat-card-media",
		Oa
	],
	[
		"MatExpandTransition",
		"mat-expand-transition",
		Ra
	],
	[
		"MatExpansion",
		"mat-expansion",
		ho
	],
	[
		"MatExpansionPanel",
		"mat-expansion-panel",
		Mo
	],
	[
		"MatList",
		"mat-list",
		po
	],
	[
		"MatListGroup",
		"mat-list-group",
		ko
	],
	[
		"MatListItem",
		"mat-list-item",
		Eo
	],
	[
		"MatDivider",
		"mat-divider",
		zo
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		Go
	],
	[
		"MatBadge",
		"mat-badge",
		Xo
	],
	[
		"MatChip",
		"mat-chip",
		ts
	],
	[
		"MatChipSet",
		"mat-chip-set",
		is
	],
	[
		"MatRadio",
		"mat-radio",
		os
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		ls
	],
	[
		"MatSwitch",
		"mat-switch",
		us
	],
	[
		"MatSlider",
		"mat-slider",
		Vs
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		Js
	],
	[
		"MatTextField",
		"mat-text-field",
		fc
	],
	[
		"MatSelect",
		"mat-select",
		Ec
	],
	[
		"MatTextarea",
		"mat-textarea",
		Dc
	],
	[
		"MatInputBase",
		"mat-input-base",
		Vi
	],
	[
		"MatMenu",
		"mat-menu",
		mc
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		vc
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		gc
	],
	[
		"MatDockedContainer",
		"mat-docked-container",
		Pc
	],
	[
		"MatDialog",
		"mat-dialog",
		Hc
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		rl
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		il
	],
	[
		"MatHover",
		"mat-hover",
		Gn
	],
	[
		"MatContainer",
		"mat-container",
		ol
	],
	[
		"MatLayout",
		"mat-layout",
		sl
	],
	[
		"MatAside",
		"mat-aside",
		Oi
	],
	[
		"MatSpacer",
		"mat-spacer",
		Fc
	],
	[
		"MatTableWrapper",
		"mat-table-wrapper",
		cl
	],
	[
		"MatScrollArea",
		"mat-scroll-area",
		ns
	],
	[
		"MatVirtualScroll",
		"mat-virtual-scroll",
		ll
	],
	[
		"MatLoading",
		"mat-loading",
		Wn
	],
	[
		"MatPullToRefresh",
		"mat-pull-to-refresh",
		vl
	],
	[
		"MatProgress",
		"mat-progress",
		nu
	],
	[
		"MatTooltip",
		"mat-tooltip",
		Ir
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		mu
	],
	[
		"MatToolbar",
		"mat-toolbar",
		yu
	],
	[
		"MatPanes",
		"mat-panes",
		Su
	],
	[
		"MatPane",
		"mat-pane",
		Eu
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		Bu
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		Iu
	],
	[
		"MatNavigationBar",
		"mat-navigation-bar",
		Vu
	],
	[
		"MatNavigationBarItem",
		"mat-navigation-bar-item",
		Hu
	],
	[
		"MatNavigationItem",
		"mat-navigation-item",
		Fu
	],
	[
		"MatNavigationDrawer",
		"mat-navigation-drawer",
		Uu
	],
	[
		"MatNavigationGroup",
		"mat-navigation-group",
		Ku
	]
], pd = new Map(fd.map(([e, , t]) => [jt(e), t]));
function md(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function hd(e) {
	let t = e.iconClass;
	if (t !== void 0 && typeof t != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return t ?? kt.iconClass;
}
function gd(e, t) {
	let n = e[t];
	if (n === void 0) return Ot[t];
	if (typeof n != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(n) || n < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return n;
}
function _d(e) {
	if (e === void 0) return Ot;
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi defaults.tooltip 必须是对象");
	return Object.freeze({
		openDelay: gd(e, "openDelay"),
		closeDelay: gd(e, "closeDelay")
	});
}
function vd(e) {
	let t = Object.keys(e.props ?? {}), n = new Set(Object.keys(e.emits ?? {}).filter((e) => e.startsWith("update:")).map((e) => e.slice(7)));
	return new Set(t.filter((e) => !n.has(e)));
}
function yd(e) {
	let t = e.defaults;
	if (t === void 0) return Object.freeze({ tooltip: Ot });
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi defaults 必须是对象");
	let n = { tooltip: _d(t.tooltip) };
	return Object.entries(t).forEach(([e, t]) => {
		if (e === "tooltip") return;
		let r = pd.get(e);
		if (!r) throw TypeError(`createMatUi defaults 未知组件键 ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError(`createMatUi defaults.${e} 必须是对象`);
		let i = vd(r), a = {};
		Object.entries(t).forEach(([t, n]) => {
			if (!i.has(t)) throw TypeError(`createMatUi defaults.${e}.${t} 不是可配置属性`);
			a[t] = n;
		}), n[e] = Object.freeze(a);
	}), Object.freeze(n);
}
function bd(e = {}) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("createMatUi 选项必须是对象");
	let t = Object.freeze({
		iconClass: hd(e),
		useCursor: md(e, "useCursor"),
		useRipple: md(e, "useRipple"),
		defaults: yd(e)
	}), n = dd(e.theme);
	return {
		theme: n,
		install(e) {
			fd.forEach(([t, n, r]) => {
				e.component(t, r), e.component(n, r), (Qu[t] ?? []).forEach((t) => {
					e.component(t, r);
				});
			}), e.directive("intersection", Zu), e.directive("state-layer", Dt), e.directive("ripple", ut), e.provide(At, t), e.provide(cn, n), td(t, n);
		}
	};
}
function xd() {
	let e = g(cn, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mde-vue 插件的 Vue 应用中调用");
	return e;
}
//#endregion
//#region src/view-transition.js
function Sd() {
	return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Cd() {
	return typeof document > "u" || typeof document.startViewTransition != "function" ? null : document.startViewTransition.bind(document);
}
function wd(e) {
	if (e === void 0) return [];
	let t = Array.isArray(e) ? e : [e];
	if (t.some((e) => typeof e != "string" || e.trim().length === 0)) throw TypeError("useMatViewTransition.start names 必须是非空字符串或非空字符串数组");
	return [...new Set(t)];
}
function Td() {
	let e = null, t = null;
	async function n(n, r = {}) {
		if (typeof n != "function") throw TypeError("useMatViewTransition.start update 必须是函数");
		let i = wd(r.names);
		t && await t, e &&= (e.skipTransition?.(), await e.finished.catch(() => {}), null);
		let a = Cd();
		if (r.skip || !a || Sd()) {
			await n();
			return;
		}
		let o, s = new Promise((e) => {
			o = e;
		});
		t = s;
		let c = la(i), l;
		try {
			await y(), l = a(() => n()), e = l, o(), t === s && (t = null), await l.finished;
		} finally {
			o(), t === s && (t = null), e === l && (e = null), ua(c), await y();
		}
	}
	return Object.freeze({
		get supported() {
			return !!Cd();
		},
		start: n
	});
}
var Ed = Td, Dd = {
	key: 0,
	class: "mat-dialog-prompt__content"
}, Od = /*#__PURE__*/ Q(/* @__PURE__ */ Object.assign({ name: "MatImperativeDialogHost" }, {
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
		k(At, nd());
		let r = rd();
		r && k(cn, r);
		let i = M(!0), l = R(n.cancelValue), u = M(n.options.promptConfig?.defaultValue ?? ""), p = a(() => !!n.options.promptConfig), m = a(() => n.options.promptConfig?.required ?? !1), h = a(() => m.value && u.value.trim().length === 0), g = a(() => {
			let e = { ...n.options };
			return delete e.actions, delete e.ariaLabel, delete e.promptConfig, n.options.promptConfig && delete e.content, e;
		});
		function _(e, t) {
			e.disabled || p.value && t === n.options.actions.length - 1 && h.value || (l.value = p.value && t === n.options.actions.length - 1 ? u.value : e.value, i.value = !1);
		}
		function y() {
			n.onClosed(l.value);
		}
		return (n, r) => (O(), o(Hc, v({
			modelValue: i.value,
			"onUpdate:modelValue": r[1] ||= (e) => i.value = e
		}, g.value, {
			"aria-label": e.options.ariaLabel,
			onClosed: y
		}), {
			actions: U(() => [f(Fc), (O(!0), c(t, null, P(e.options.actions, (t, n) => (O(), o(Jr, {
				key: n,
				color: t.color,
				disabled: t.disabled || p.value && n === e.options.actions.length - 1 && h.value,
				variant: t.variant,
				onClick: (e) => _(t, n)
			}, {
				default: U(() => [d(z(t.text), 1)]),
				_: 2
			}, 1032, [
				"color",
				"disabled",
				"variant",
				"onClick"
			]))), 128))]),
			default: U(() => [p.value ? (O(), c(t, { key: 0 }, [e.options.content ? (O(), c("p", Dd, z(e.options.content), 1)) : s("", !0), f(fc, {
				modelValue: u.value,
				"onUpdate:modelValue": r[0] ||= (e) => u.value = e,
				autofocus: "",
				label: e.options.promptConfig.label,
				placeholder: e.options.promptConfig.placeholder,
				required: e.options.promptConfig.required
			}, null, 8, [
				"modelValue",
				"label",
				"placeholder",
				"required"
			])], 64)) : s("", !0)]),
			_: 1
		}, 16, ["modelValue", "aria-label"]));
	}
}), [["__scopeId", "data-v-ba439738"]]), kd = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], Ad = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], jd = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function Md(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function Nd() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function Pd(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function Fd(e) {
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
function Id(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog action 必须是对象");
	if (typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (e.variant !== void 0 && !kd.includes(e.variant)) throw TypeError("dialog action variant 无效");
	if (e.color !== void 0 && !Ht(e.color)) throw TypeError("dialog action color 无效");
	if (e.disabled !== void 0 && typeof e.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...e,
		disabled: e.disabled ?? !1,
		text: e.text,
		variant: e.variant ?? "text"
	};
}
function Ld(e) {
	if (Pd(e), Ad.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "boolean") throw TypeError(`dialog ${t} 必须是 boolean`);
	}), jd.forEach((t) => {
		if (e[t] !== void 0 && typeof e[t] != "string") throw TypeError(`dialog ${t} 必须是 string`);
	}), e.closeLabel !== void 0 && e.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (e.color !== void 0 && !Ht(e.color)) throw TypeError("dialog color 无效");
	if (e.width !== void 0 && !Md(e.width)) throw TypeError("dialog width 无效");
	if (e.actions !== void 0 && !Array.isArray(e.actions)) throw TypeError("dialog actions 必须是数组");
	let t = {
		actions: (e.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(Id),
		attach: Fd(e.attach)
	};
	return [
		...Ad,
		...jd,
		"color",
		"width"
	].forEach((n) => {
		e[n] !== void 0 && (t[n] = e[n]);
	}), e.promptConfig && (t.promptConfig = e.promptConfig), t;
}
function Rd(e, t) {
	try {
		Nd();
		let n = Ld(e);
		return new Promise((e, r) => {
			let i = document.createElement("div");
			i.dataset.matDialogHost = "", document.body.append(i);
			try {
				N(h(Od, {
					cancelValue: t,
					options: n,
					onClosed(t) {
						N(null, i), i.remove(), e(t);
					}
				}), i);
			} catch (e) {
				N(null, i), i.remove(), r(e);
			}
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
function zd(e = {}) {
	return Rd(e, void 0);
}
function Bd(e = {}) {
	try {
		if (Pd(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return Rd({
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
function Vd(e = {}) {
	try {
		Pd(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return Rd({
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
function Hd(e = {}) {
	try {
		Pd(e);
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
		return Rd({
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
var Ud = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
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
		k(At, nd()), k(ru, !0);
		let n = rd();
		n && k(cn, n);
		let r = M(!0), i = a(() => {
			let e = { ...t.options };
			return delete e.onAction, e;
		});
		function s() {
			t.onClosed();
		}
		function c() {
			t.options.onAction?.();
		}
		return (e, t) => (O(), o(mu, v({
			modelValue: r.value,
			"onUpdate:modelValue": t[0] ||= (e) => r.value = e
		}, i.value, {
			onAction: c,
			onClosed: s
		}), null, 16, ["modelValue"]));
	}
}), Wd = [
	"left",
	"center",
	"right"
], Gd = null;
function Kd() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function qd(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function Jd(e) {
	if (qd(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !Wd.includes(e.position)) throw TypeError("snackbar position 无效");
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
function Yd() {
	return Gd?.isConnected ? Gd : (Gd = document.createElement("div"), Gd.dataset.matSnackbarHost = "", document.body.append(Gd), Gd);
}
function Xd() {
	!Gd || Gd.childNodes.length > 0 || (Gd.remove(), Gd = null);
}
function Zd(e) {
	try {
		Kd();
		let t = Jd(e);
		return new Promise((e, n) => {
			let r = !1, i;
			function a() {
				if (r) return;
				r = !0;
				let t = Gd;
				t && N(null, t), e(), lu(i), Xd();
			}
			function o(e) {
				if (r) return;
				r = !0;
				let t = Gd;
				t && N(null, t), n(e), lu(i), Xd();
			}
			i = { activate() {
				try {
					let e = Yd();
					N(h(Ud, {
						onClosed: a,
						options: t
					}), e);
				} catch (e) {
					o(e);
				}
			} }, su(i);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var Qd = Zd;
//#endregion
export { Zu as Intersection, Bi as MatAppBar, ii as MatAppRoot, Oi as MatAside, ma as MatAvatar, Xo as MatBadge, rl as MatBottomSheet, Jr as MatBtn, Ki as MatBtnGroup, ja as MatCard, Na as MatCardActionArea, La as MatCardActions, Fa as MatCardContent, Ea as MatCardHeadline, Oa as MatCardMedia, Aa as MatCardSubhead, Go as MatCheckbox, ts as MatChip, is as MatChipSet, ol as MatContainer, Hc as MatDialog, zo as MatDivider, Pc as MatDockedContainer, xa as MatDynamicText, Ra as MatExpandTransition, ho as MatExpansion, Mo as MatExpansionPanel, $i as MatFab, ia as MatFabMenu, Gn as MatHover, hn as MatIcon, oa as MatImage, Vi as MatInputBase, sl as MatLayout, po as MatList, ko as MatListGroup, Eo as MatListItem, Wn as MatLoading, mc as MatMenu, vc as MatMenuGroup, gc as MatMenuItem, Vu as MatNavigationBar, Hu as MatNavigationBarItem, Uu as MatNavigationDrawer, Ku as MatNavigationGroup, Fu as MatNavigationItem, Bu as MatNavigationRail, Iu as MatNavigationRailItem, Eu as MatPane, Su as MatPanes, nu as MatProgress, vl as MatPullToRefresh, os as MatRadio, ls as MatRadioGroup, Js as MatRangeSlider, ns as MatScrollArea, Wi as MatSearch, Ec as MatSelect, Fn as MatShape, da as MatSharedElement, da as MdeSharedElement, il as MatSideSheet, Vs as MatSlider, mu as MatSnackbar, Fc as MatSpacer, Ca as MatSplitBtn, us as MatSwitch, cl as MatTableWrapper, ha as MatText, fc as MatTextField, Dc as MatTextarea, yu as MatToolbar, Ir as MatTooltip, ll as MatVirtualScroll, ll as MdeVirtualScroll, ut as Ripple, Dt as StateLayer, Bd as alert, Vd as confirm, bd as createMatUi, zd as dialog, Hd as prompt, Zd as snackbar, Qd as toast, oi as useLayout, er as useMatApp, $ as useMatProps, xd as useMatTheme, Td as useMatViewTransition, Ed as useMdeViewTransition };
