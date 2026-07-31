import e from "../../_virtual/_plugin-vue_export-helper.js";
import t, { DEFAULT_MAT_UI_OPTIONS as ee } from "../../mat-ui-context.js";
import te from "../mat-hover/MatHover.js";
import { TOOLTIP_LOCATIONS as ne, getTooltipPosition as re } from "../tooltip-position.js";
import { activateTooltip as ie, activateTooltipDelayGroup as ae, deactivateTooltip as oe, leaveTooltipDelayGroup as se, shouldSkipTooltipDelay as ce } from "../tooltip-stack.js";
import { getToolbarRects as le, subscribeToolbarOverlay as ue } from "../toolbar-overlay.js";
/* empty css                                                           */
import { Fragment as de, Teleport as fe, computed as n, createBlock as pe, createCommentVNode as r, createElementBlock as i, createElementVNode as me, createTextVNode as he, getCurrentInstance as ge, inject as _e, mergeProps as ve, nextTick as a, onBeforeUnmount as ye, onMounted as be, onUpdated as xe, openBlock as o, ref as s, renderSlot as Se, shallowRef as Ce, toDisplayString as we, unref as Te, useAttrs as Ee, useId as De, useSlots as Oe, watch as c } from "vue";
//#region src/components/mat-tooltip/MatTooltip.vue
var ke = ["id", "data-location"], Ae = 1500, je = 150, l = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
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
				return ne.includes(e);
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
	setup(e, { emit: ne }) {
		let l = e, Me = ne, Ne = Ee(), Pe = Oe(), Fe = ge(), Ie = _e(t, ee), u = s(null), d = Ce(null), Le = { value: d }, f = Ce(null), p = s(null), m = s(!1), h = s(!1), g = s(!1), _ = s("closed"), v = s("top"), y = s({}), b = s(!1), Re = `${De().replace(/[^\w-]/g, "-")}-tooltip`, x = n(() => typeof Ne.id == "string" ? Ne.id : Re), S = n(() => l.content === void 0 ? !!Pe.default : l.content.length > 0), C = n(() => !!Pe.activator), ze = Fe?.vnode.props ?? {}, w = Object.prototype.hasOwnProperty.call(ze, "modelValue") || Object.prototype.hasOwnProperty.call(ze, "model-value"), T, E, D, O, k = !1, A, j = null, M = null, N = null, P = null, F = null, I = !1, L = !1, R = !1, Be = !1, z = null, Ve = { close: Y }, B = Symbol("mat-tooltip-delay-group-owner");
		function V(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? V(e.value) : "$el" in e ? V(e.$el) : null : null;
		}
		function He(e) {
			try {
				return V(document.querySelector(e));
			} catch {
				return null;
			}
		}
		function Ue() {
			return typeof l.target == "string" ? He(l.target) : V(l.target);
		}
		function We() {
			let e = u.value ? [...u.value.children] : [];
			return e.length === 1 ? e[0] : null;
		}
		function Ge() {
			return C.value ? We() : Ue();
		}
		function Ke() {
			return typeof l.attach == "string" ? He(l.attach) : V(l.attach);
		}
		function qe() {
			let e = l.openDelay ?? Ie.tooltip.openDelay, t = typeof e == "string" ? Number(e) : e;
			return !Number.isFinite(t) || t < 0 ? 0 : t;
		}
		function Je() {
			return d.value?.closest("[data-mat-tooltip-group]") ?? null;
		}
		function H() {
			E !== void 0 && (window.clearTimeout(E), E = void 0);
		}
		function U() {
			T !== void 0 && (window.clearTimeout(T), T = void 0);
		}
		function W() {
			D !== void 0 && (window.clearTimeout(D), D = void 0);
		}
		function Ye() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Xe(e, t) {
			if (W(), Ye()) {
				t();
				return;
			}
			D = window.setTimeout(() => {
				D = void 0, t();
			}, e);
		}
		function Ze() {
			O !== void 0 && (k ? window.cancelAnimationFrame(O) : window.clearTimeout(O), O = void 0, k = !1);
		}
		function G() {
			P && (F === null ? P.removeAttribute("aria-describedby") : P.setAttribute("aria-describedby", F), P = null, F = null);
		}
		function Qe() {
			let e = d.value;
			if (!h.value || !e || P === e) return;
			G(), P = e, F = e.getAttribute("aria-describedby");
			let t = (F ?? "").split(/\s+/).filter(Boolean);
			t.includes(x.value) || t.push(x.value), e.setAttribute("aria-describedby", t.join(" "));
		}
		function $e() {
			Ze(), A?.disconnect(), A = void 0, M &&= (M(), null), N &&= (N(), null);
		}
		function et() {
			if (!h.value || !d.value || !p.value) return;
			let e = re({
				location: l.location,
				targetRect: d.value.getBoundingClientRect(),
				tooltipRect: p.value.getBoundingClientRect(),
				avoidRects: le(),
				viewport: {
					height: window.innerHeight,
					width: window.innerWidth
				}
			});
			v.value = e.location, y.value = {
				left: `${e.left}px`,
				top: `${e.top}px`
			}, g.value = !0;
		}
		function K() {
			if (!h.value || O !== void 0) return;
			let e = () => {
				O = void 0, k = !1, et();
			};
			if (typeof window.requestAnimationFrame == "function") {
				k = !0, O = window.requestAnimationFrame(e);
				return;
			}
			O = window.setTimeout(e, 0);
		}
		function tt() {
			M || (window.addEventListener("resize", K), document.addEventListener("scroll", K, !0), M = () => {
				window.removeEventListener("resize", K), document.removeEventListener("scroll", K, !0);
			}, N = ue(K), typeof ResizeObserver < "u" && (A = new ResizeObserver(K), A.observe(d.value), A.observe(p.value)));
		}
		function q() {
			m.value = !1, _.value = "closed", h.value = !1, g.value = !1, f.value = null;
		}
		function J({ immediate: e = !1 } = {}) {
			if (H(), U(), $e(), G(), oe(Ve), !m.value) {
				q();
				return;
			}
			if (!(!e && _.value === "closing")) {
				if (e) {
					W(), q();
					return;
				}
				h.value = !1, _.value = "closing", Xe(je, q);
			}
		}
		function Y() {
			w && (b.value = !0, Me("update:modelValue", !1)), J();
		}
		function nt() {
			Be || (Be = !0, console.warn(C.value ? "MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatTooltip: target 必须指向当前 document 中存在的 HTMLElement"));
		}
		function X({ warn: e = !0 } = {}) {
			let t = Ge();
			if (t === d.value) {
				!t && S.value && e && nt();
				return;
			}
			let ee = d.value !== null;
			G(), Q(), d.value = t, Be = !1, !t && S.value && e && nt(), lt(), ee && h.value && Y();
		}
		function rt() {
			if (U(), w || h.value || b.value || !S.value) return;
			let e = ce(Je(), B) ? 0 : qe();
			if (e === 0) {
				$();
				return;
			}
			E === void 0 && (E = window.setTimeout(() => {
				E = void 0, $();
			}, e));
		}
		function it() {
			H(), !(w || !h.value || L || R) && T === void 0 && (T = window.setTimeout(() => {
				T = void 0, Y();
			}, Ae));
		}
		function Z() {
			if (L || R) {
				rt();
				return;
			}
			se(z, B, Ie.tooltip.skipDelayDuration), it();
		}
		function at(e) {
			L = e, Z();
		}
		function ot() {
			R = !0, Z();
		}
		function st(e) {
			d.value?.contains(e.relatedTarget) || (R = !1, Z());
		}
		function ct(e) {
			e.key === "Escape" && (e.preventDefault(), Y());
		}
		function Q() {
			j && (j(), j = null, L = !1, R = !1);
		}
		function lt() {
			let e = d.value;
			e && (e.addEventListener("keydown", ct), !w && S.value && (e.addEventListener("focusin", ot), e.addEventListener("focusout", st)), j = () => {
				e.removeEventListener("keydown", ct), e.removeEventListener("focusin", ot), e.removeEventListener("focusout", st);
			});
		}
		async function $() {
			if (b.value || !S.value) return;
			if (X({ warn: !0 }), !d.value) {
				Y();
				return;
			}
			let e = Ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Y();
				return;
			}
			H(), U(), W(), ie(Ve), z = Je(), ae(z, B), f.value = e, v.value = l.location, y.value = {
				left: "0px",
				top: "0px"
			}, g.value = !1, _.value = "opening", m.value = !0, h.value = !0, await a(), h.value && (Qe(), et(), tt());
		}
		return be(async () => {
			I = !0, X({ warn: !1 }), await a(), I && (X({ warn: !1 }), w && l.modelValue && $());
		}), xe(() => {
			X({ warn: !1 }), h.value && K();
		}), ye(() => {
			I = !1, W(), Q(), J({ immediate: !0 });
		}), c(() => l.modelValue, (e) => {
			if (!(!I || !w)) {
				if (e) {
					b.value = !1, $();
					return;
				}
				b.value = !1, J();
			}
		}), c([() => l.content, () => l.target], async () => {
			await a();
			let e = d.value;
			X({ warn: !1 }), d.value === e && (Q(), lt()), S.value || Y();
		}), c(() => l.attach, async () => {
			if (!h.value) return;
			let e = Ke();
			if (!e) {
				console.warn("MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement"), Y();
				return;
			}
			f.value = e, await a(), K();
		}), c(() => l.location, () => {
			h.value && K();
		}), c(x, () => {
			!h.value || !P || (G(), Qe());
		}), (t, ee) => (o(), i(de, null, [
			!Te(w) && S.value ? (o(), pe(te, {
				key: 0,
				target: Le,
				"onUpdate:modelValue": at
			})) : r("", !0),
			C.value || !e.target ? (o(), i("span", {
				key: 1,
				ref_key: "activatorHost",
				ref: u,
				class: "mat-tooltip__activator"
			}, [Se(t.$slots, "activator", {}, void 0, !0)], 512)) : r("", !0),
			m.value && f.value ? (o(), pe(fe, {
				key: 2,
				to: f.value
			}, [me("span", ve(t.$attrs, {
				id: x.value,
				ref_key: "tooltipElement",
				ref: p,
				class: ["mat-tooltip", [`mat-tooltip--${_.value}`, { "mat-tooltip--positioned": g.value }]],
				"data-location": v.value,
				style: [y.value, t.$attrs.style],
				role: "tooltip"
			}), [e.content === void 0 ? Se(t.$slots, "default", { key: 1 }, void 0, !0) : (o(), i(de, { key: 0 }, [he(we(e.content), 1)], 64))], 16, ke)], 8, ["to"])) : r("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-40b59ab7"]]);
//#endregion
export { l as default };
