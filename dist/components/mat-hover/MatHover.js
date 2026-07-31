import { computed as e, createCommentVNode as t, getCurrentInstance as n, onBeforeUnmount as r, onMounted as i, onUpdated as a, ref as o, renderSlot as s, shallowRef as c, unref as l, useSlots as u, watch as d } from "vue";
//#region src/components/mat-hover/MatHover.vue
var f = /*@__PURE__*/ Object.assign({
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
	setup(f, { emit: p }) {
		let m = f, h = p, g = u(), _ = n()?.vnode.props ?? {}, v = Object.prototype.hasOwnProperty.call(_, "modelValue") || Object.prototype.hasOwnProperty.call(_, "model-value"), y = o(!1), b = o(null), x = c(null), S = e(() => v ? m.modelValue : b.value), C, w = null;
		function T() {
			C !== void 0 && (window.clearTimeout(C), C = void 0);
		}
		function E(e) {
			let t = Number(e ?? 0);
			return !Number.isFinite(t) || t < 0 ? 0 : t;
		}
		function D(e) {
			y.value = e, !m.disabled && (h("update:modelValue", e), !v && (b.value = e));
		}
		function O(e, t) {
			T();
			let n = E(t);
			if (n === 0) {
				D(e);
				return;
			}
			C = window.setTimeout(() => {
				C = void 0, D(e);
			}, n);
		}
		function k() {
			O(!0, m.openDelay);
		}
		function A() {
			O(!1, m.closeDelay);
		}
		function j(e) {
			return !e || typeof HTMLElement > "u" ? null : e instanceof HTMLElement && e.ownerDocument === document ? e : typeof e == "object" ? "value" in e ? j(e.value) : "$el" in e ? j(e.$el) : null : null;
		}
		function M() {
			if (typeof m.target != "string") return j(m.target);
			try {
				return j(document.querySelector(m.target));
			} catch {
				return null;
			}
		}
		function N() {
			w &&= (w(), null);
		}
		function P() {
			let e = M();
			e !== x.value && (N(), x.value = e, e && (e.addEventListener("mouseenter", k), e.addEventListener("mouseleave", A), w = () => {
				e.removeEventListener("mouseenter", k), e.removeEventListener("mouseleave", A);
			}));
		}
		let F = {
			onMouseenter: k,
			onMouseleave: A
		};
		return d(() => m.disabled, (e, t) => {
			if (t && !e) {
				if (v) {
					h("update:modelValue", y.value);
					return;
				}
				b.value = y.value, h("update:modelValue", y.value);
			}
		}), d(M, P, { flush: "sync" }), i(P), a(P), r(() => {
			T(), N();
		}), (e, n) => l(g).default ? s(e.$slots, "default", {
			key: 0,
			isHovering: S.value,
			props: F
		}) : t("", !0);
	}
});
//#endregion
export { f as default };
