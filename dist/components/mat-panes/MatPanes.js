import e from "../../_virtual/_plugin-vue_export-helper.js";
import { MAT_PANES_BREAKPOINTS as t, MAT_PANES_KEY as n } from "../panes-context.js";
/* empty css                                                         */
import { computed as r, createElementBlock as i, mergeProps as a, nextTick as o, onBeforeUnmount as s, onMounted as c, openBlock as l, provide as u, ref as d, renderSlot as ee, shallowReactive as f, watch as p } from "vue";
var m = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
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
		"update:breakpoint": (e) => t.includes(e)
	},
	setup(e, { emit: t }) {
		let m = e, h = t, g = d(null), _ = f([]), v = d(null), y = d(null), b = d(null), x = /* @__PURE__ */ new Map(), S, C, w, T, E, D = r(() => v.value ?? O.value), O = r(() => {
			let e = {};
			return _.forEach((t) => {
				let n = m.sizes?.[t.id];
				e[t.id] = typeof n == "number" && Number.isFinite(n) && n >= 0 ? n : 1;
			}), Object.values(e).reduce((e, t) => e + t, 0) === 0 && _.length > 0 && _.forEach((t) => {
				e[t.id] = 1;
			}), e;
		});
		function k(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function te(e, t) {
			return `${e}::${t}`;
		}
		function A(e) {
			return _.findIndex((t) => t.id === e);
		}
		function j(e) {
			return _.find((t) => t.id === e)?.element.value ?? null;
		}
		function M(e) {
			let t = j(e);
			return t ? t.getBoundingClientRect().width : 0;
		}
		function N(e) {
			let t = A(e);
			if (t < 0 || t >= _.length - 1) return null;
			let n = _[t], r = _[t + 1];
			return {
				key: te(n.id, r.id),
				left: n,
				right: r
			};
		}
		function P(e) {
			return D.value[e] ?? 0;
		}
		function ne(e) {
			return { "--mat-pane-weight": P(e) };
		}
		function re(e) {
			return m.resizable && N(e) !== null;
		}
		function F(e) {
			return N(e) !== null;
		}
		function I(e) {
			return N(e)?.key === y.value;
		}
		function L(e) {
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
		function R() {
			return { ...D.value };
		}
		function z(e) {
			T !== void 0 && globalThis.clearTimeout(T), T = globalThis.setTimeout(() => {
				T = void 0, v.value === e && (v.value = null);
			}, 0);
		}
		function B(e) {
			let t = {};
			_.forEach((n) => {
				t[n.id] = Math.max(0, e[n.id] ?? 0);
			}), v.value = t, h("update:sizes", t), z(t);
		}
		function V(e, t, n, r, i) {
			let a = (i[e] ?? 0) + (i[t] ?? 0) || 2, o = r === 0 ? .5 : k(n / r, 0, 1), s = { ...i };
			return s[e] = a * o, s[t] = a - s[e], s;
		}
		function H(e) {
			let t = N(e);
			if (!t) return null;
			let n = M(t.left.id), r = M(t.right.id);
			return {
				leftWidth: n,
				rightWidth: r,
				totalWidth: n + r
			};
		}
		function U(e, t) {
			if (!m.resizable || S || t.button !== void 0 && t.button !== 0) return;
			let n = N(e), r = H(e);
			!n || !r || (t.preventDefault(), t.currentTarget?.setPointerCapture?.(t.pointerId), y.value = n.key, S = {
				boundary: n,
				changed: !1,
				metrics: r,
				pointerId: t.pointerId,
				startWeights: R(),
				startX: t.clientX
			});
		}
		function W(e, t) {
			if (!S || S.pointerId !== t.pointerId) return;
			let n = N(e);
			if (!n || n.key !== S.boundary.key) return;
			let r = k(S.metrics.leftWidth + t.clientX - S.startX, 0, S.metrics.totalWidth);
			v.value = V(n.left.id, n.right.id, r, S.metrics.totalWidth, S.startWeights), S.changed = !0;
		}
		function G(e, t, n) {
			if (!S || S.pointerId !== t.pointerId) return;
			let r = N(e), i = S.changed, a = v.value;
			if (S = void 0, y.value = null, n && i && a && r) {
				B(a);
				return;
			}
			v.value = null;
		}
		function K(e, t) {
			let n = N(e);
			if (!n || !m.resizable) return;
			let r = {
				ArrowLeft: -1,
				ArrowRight: 1
			}[t.key], i = H(e), a = R(), o = a[n.left.id] + a[n.right.id] || 2, s = i?.totalWidth || 100, c = s * (a[n.left.id] / o), l;
			if (r !== void 0) l = k(c + r * (t.shiftKey ? 64 : 16), 0, s);
			else if (t.key === "Home") l = 0;
			else if (t.key === "End") l = s;
			else if (t.key === "Enter") {
				let e = n.key, t = a[n.left.id];
				t === 0 ? l = s * (x.get(e) ?? .5) : (x.set(e, t / o), l = 0);
			} else return;
			t.preventDefault(), B(V(n.left.id, n.right.id, l, s, a));
		}
		function q(e) {
			return _.some((t) => t.id === e.id) && console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${e.id}`), _.push(e), () => {
				let t = _.indexOf(e);
				t !== -1 && _.splice(t, 1);
			};
		}
		function J() {
			let e = /* @__PURE__ */ new Set();
			_.forEach((t) => {
				e.has(t.id) || (e.add(t.id), t.id in m.sizes || console.warn(`MatPanes: sizes 缺少 Pane ${t.id} 的权重`));
			});
		}
		function Y() {
			let e = {};
			return _.forEach((t) => {
				let n = t.element.value;
				n && (e[t.id] = Math.max(0, Math.round(n.getBoundingClientRect().width)));
			}), e;
		}
		function ie(e, t) {
			let n = Object.keys(e ?? {}), r = Object.keys(t);
			return n.length === r.length && r.every((n) => e[n] === t[n]);
		}
		function ae() {
			w = void 0;
			let e = Y();
			ie(E, e) || (E = e, h("update:widths", e));
		}
		function X(e = !1) {
			w !== void 0 && globalThis.clearTimeout(w), w = globalThis.setTimeout(ae, e ? 0 : 100);
		}
		function Z() {
			typeof globalThis.ResizeObserver == "function" && (C ||= new globalThis.ResizeObserver(() => {
				X();
			}), C.disconnect(), g.value && C.observe(g.value), _.forEach((e) => {
				e.element.value && C.observe(e.element.value);
			}));
		}
		function oe(e) {
			return e < 600 ? "compact" : e < 840 ? "medium" : e < 1200 ? "expanded" : e < 1600 ? "large" : "extra-large";
		}
		function Q(e = !1) {
			let t = oe(globalThis.window === void 0 ? 0 : globalThis.window.innerWidth);
			(e || b.value !== t) && (b.value = t, h("update:breakpoint", t));
		}
		function $() {
			Q();
		}
		return u(n, {
			getHandleAttributes: L,
			getPaneStyle: ne,
			hasBoundary: F,
			handleKeyDown: K,
			handlePointerDown: U,
			handlePointerMove: W,
			isBoundaryActive: I,
			isHandleVisible: re,
			registerPane: q,
			finishPointerInteraction: G
		}), p(() => _.map((e) => e.id), async () => {
			await o(), J(), Z(), X();
		}, {
			flush: "post",
			immediate: !0
		}), p(() => m.sizes, () => {
			v.value = null;
		}, { deep: !0 }), c(() => {
			Q(!0), Z(), X(!0), globalThis.window !== void 0 && globalThis.window.addEventListener("resize", $);
		}), s(() => {
			globalThis.window !== void 0 && globalThis.window.removeEventListener("resize", $), C?.disconnect(), w !== void 0 && globalThis.clearTimeout(w), T !== void 0 && globalThis.clearTimeout(T);
		}), (e, t) => (l(), i("div", a({
			ref_key: "root",
			ref: g
		}, e.$attrs, { class: "mat-panes" }), [ee(e.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-3c44b789"]]);
//#endregion
export { m as default };
