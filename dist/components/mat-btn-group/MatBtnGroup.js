import e from "../../_virtual/_plugin-vue_export-helper.js";
import { BUTTON_SHAPES as t, BUTTON_SIZES as n, isComponentColor as r } from "../button-props.js";
import i from "../use-component-color.js";
import { MAT_BTN_GROUP_KEY as a } from "../button-context.js";
/* empty css                                                            */
import { computed as o, createElementBlock as s, mergeProps as c, nextTick as l, onBeforeUnmount as u, onMounted as d, openBlock as f, provide as p, ref as m, renderSlot as h, unref as g, watch as _ } from "vue";
//#region src/components/mat-btn-group/MatBtnGroup.vue
var v = 150, y = .75, b = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
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
				return n.includes(e);
			}
		},
		shape: {
			type: String,
			default: "round",
			validator(e) {
				return t.includes(e);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: r
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
		let n = e, r = t, b = m(null), x = m(null), S = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), w = /* @__PURE__ */ new Set(), T, E, D = v, O = !0, k = !1, { colorStyle: A } = i(o(() => n.color));
		function j(e) {
			return n.selection === "multiple" ? Array.isArray(n.selected) && n.selected.some((t) => Object.is(t, e)) : n.selection === "single" && Object.is(n.selected, e);
		}
		function M(e, t) {
			if (e === void 0) {
				console.warn("MatBtnGroup: selection 不为 none 时，子按钮必须提供 value");
				return;
			}
			let i = j(e);
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
		p(a, {
			color: o(() => n.color),
			disabled: o(() => n.disabled),
			isSelected: j,
			requestSelection: M,
			selection: o(() => n.selection),
			shape: o(() => n.shape),
			size: o(() => n.size),
			variant: o(() => n.variant)
		});
		function N(e) {
			return e instanceof Element ? e.closest(".mat-button-base") : null;
		}
		function P(e) {
			let t = e.trim().match(/^(\d*\.?\d+)(ms|s)$/);
			if (!t) return null;
			let n = Number.parseFloat(t[1]);
			return t[2] === "s" ? n * 1e3 : n;
		}
		function F(e) {
			let [t] = getComputedStyle(e).transitionDuration.split(",");
			return P(t ?? "") ?? v;
		}
		function I() {
			return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function L() {
			T !== void 0 && (globalThis.clearTimeout(T), T = void 0);
		}
		function R() {
			E !== void 0 && (globalThis.clearTimeout(E), E = void 0);
		}
		function z() {
			L(), R(), w.forEach((e) => {
				let t = e;
				t.style.inlineSize = S.get(t) ?? "", S.delete(t), C.delete(t);
			}), w.clear(), x.value && delete x.value.dataset.matGroupPressed, x.value = null, D = v, O = !0, k = !1;
		}
		function B() {
			if (L(), x.value) {
				if (I() || D === 0) {
					z();
					return;
				}
				w.forEach((e) => {
					let t = e;
					t.style.inlineSize = `${C.get(t)}px`;
				}), delete x.value.dataset.matGroupPressed, x.value = null, O = !0, k = !1, E = globalThis.setTimeout(() => {
					E = void 0, z();
				}, D);
			}
		}
		function V() {
			if (x.value) {
				if (O) {
					B();
					return;
				}
				k = !0;
			}
		}
		function H(e) {
			O = !1, k = !1;
			let t = F(e);
			if (D = t, I() || t === 0) {
				O = !0;
				return;
			}
			T = globalThis.setTimeout(() => {
				T = void 0, x.value === e && (O = !0, k && B());
			}, t * y);
		}
		function U(e) {
			if (n.variant !== "standard" || e.disabled || x.value === e) return;
			let t = e;
			z();
			let r = [...b.value.querySelectorAll(".mat-button-base")], i = r.indexOf(t);
			if (r.length < 2 || i === -1) return;
			let a = Number.parseFloat(getComputedStyle(b.value).getPropertyValue("--mat-btn-group-standard-pressed-width-factor")) || 1.15, o = new Map(r.map((e) => [e, e.getBoundingClientRect().width])), s = o.get(t) * (a - 1), c = /* @__PURE__ */ new Map([[t, o.get(t) + s]]);
			if (i === 0) {
				let e = r[1];
				c.set(e, o.get(e) - s);
			} else if (i === r.length - 1) {
				let e = r[i - 1];
				c.set(e, o.get(e) - s);
			} else {
				let e = r[i - 1], t = r[i + 1], n = s / 2;
				c.set(e, o.get(e) - n), c.set(t, o.get(t) - n);
			}
			c.forEach((e, t) => {
				let n = t;
				S.set(n, n.style.inlineSize), C.set(n, o.get(n)), n.style.inlineSize = `${o.get(n)}px`, w.add(n);
			}), w.forEach((e) => {
				e.getBoundingClientRect();
			}), c.forEach((e, t) => {
				let n = t;
				n.style.inlineSize = `${e}px`;
			}), t.dataset.matGroupPressed = "", x.value = t, H(t);
		}
		async function W(e) {
			let t = N(e.target);
			t && (await l(), U(t));
		}
		function G(e) {
			e.relatedTarget instanceof Node && b.value?.contains(e.relatedTarget) || V();
		}
		async function K(e) {
			if (e.repeat || ![" ", "Enter"].includes(e.key)) return;
			let t = N(e.target);
			t && (await l(), U(t));
		}
		function q() {
			if (n.variant !== "connected" || !b.value) return;
			n.selection === "none" && console.warn("MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用");
			let e = [...b.value.querySelectorAll(".mat-button-base")], t = e.some((e) => e.classList.contains("mat-btn--text") || e.classList.contains("mat-btn--standard")), r = new Set(e.flatMap((e) => [...e.classList].filter((e) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(e)).map((e) => e.slice(e.lastIndexOf("--") + 2))));
			t && console.warn("MatBtnGroup: connected 形态不支持 text 或 standard 按钮"), r.size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级"), new Set(e.map((e) => e.style.getPropertyValue("--mat-accent-color"))).size > 1 && console.warn("MatBtnGroup: connected 形态中的子按钮应使用相同颜色");
		}
		return d(q), u(z), _(() => [n.variant, n.selection], async () => {
			z(), await l(), q();
		}), (t, n) => (f(), s("div", c({
			ref_key: "root",
			ref: b
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
			style: g(A),
			role: "group",
			onFocusout: G,
			onKeydown: K,
			onKeyupCapture: V,
			onLostpointercaptureCapture: V,
			onPointercancelCapture: V,
			onPointerdown: W,
			onPointerupCapture: V
		}), [h(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-15b9823a"]]);
//#endregion
export { b as default };
