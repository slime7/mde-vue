import e from "../../_virtual/_plugin-vue_export-helper.js";
import { registerToolbar as t } from "../toolbar-overlay.js";
/* empty css                                                           */
import { Fragment as n, Teleport as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, mergeProps as ee, nextTick as l, normalizeStyle as u, onBeforeUnmount as d, onMounted as te, openBlock as f, ref as p, renderSlot as m, unref as h, useAttrs as g, useSlots as ne, watch as _ } from "vue";
//#region src/components/mat-toolbar/MatToolbar.vue
var re = ["aria-orientation"], ie = { class: "mat-toolbar__surface" }, v = { class: "mat-toolbar__content" }, y = 200, b = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
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
		let b = [
			"docked",
			"floating",
			"floating-top",
			"floating-bottom",
			"floating-left",
			"floating-right"
		];
		function x(e) {
			if (typeof e == "number") return Number.isFinite(e) && e >= 0;
			if (typeof e != "string") return !1;
			let t = e.trim();
			return !t || /[;{}]/.test(t) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("block-size", t);
		}
		function ae(e) {
			return typeof e == "number" && Number.isFinite(e) && e >= 0 ? `${e}px` : typeof e == "string" && x(e) ? e.trim() : "0px";
		}
		function S(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let C = e, w = g(), T = ne(), E = p(C.modelValue), D = p(C.modelValue ? "open" : "closed"), O = p(null), k = p(null), A = p({
			blockSize: 0,
			inlineSize: 0
		}), j = i(() => b.includes(C.variant) ? C.variant === "floating" ? "floating-bottom" : C.variant : "docked"), M = i(() => [
			"start",
			"center",
			"end"
		].includes(C.position) ? C.position : "center"), N = i(() => j.value.startsWith("floating")), P = i(() => j.value === "floating-left" || j.value === "floating-right"), F = i(() => j.value === "docked" || j.value === "floating-bottom"), I = i(() => {
			if (!C.app) return null;
			if (typeof C.attach == "string") try {
				return document.querySelector(C.attach);
			} catch {
				return null;
			}
			return S(C.attach);
		}), L = i(() => ae(C.bottomPlaceholder)), R = i(() => F.value ? L.value : "0px"), z = i(() => [w.style, { "--mat-toolbar-bottom-placeholder": R.value }]), B = i(() => ({
			blockSize: `${A.value.blockSize}px`,
			inlineSize: `${A.value.inlineSize}px`
		})), V = i(() => [
			`mat-toolbar--${j.value}`,
			`mat-toolbar--position-${M.value}`,
			{
				"mat-toolbar--app": C.app,
				"mat-toolbar--vertical": P.value,
				"mat-toolbar--vibrant": C.vibrant
			}
		]), H, U, W = !1, G, K = !1;
		function q() {
			G !== void 0 && (window.clearTimeout(G), G = void 0);
		}
		function oe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function J(e) {
			if (q(), oe()) {
				e();
				return;
			}
			G = window.setTimeout(() => {
				G = void 0, e();
			}, y);
		}
		function se() {
			q(), E.value = !0, D.value = "opening", J(() => {
				E.value && C.modelValue && (D.value = "open");
			});
		}
		function ce() {
			if (q(), !E.value) {
				D.value = "closed";
				return;
			}
			D.value = "closing", J(() => {
				C.modelValue || (E.value = !1, D.value = "closed");
			});
		}
		function Y() {
			K || !T.fab || N.value || (K = !0, console.warn("MatToolbar: fab Slot 仅支持 floating variant"));
		}
		function X() {
			let e = O.value?.getBoundingClientRect();
			e && (A.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			}, H?.update());
		}
		function le() {
			if (!O.value) return null;
			let e = O.value.getBoundingClientRect(), t = k.value?.getBoundingClientRect();
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
			W && (await l(), X());
		}
		function Z() {
			U?.disconnect(), U = void 0, window.removeEventListener("resize", X), H?.unregister(), H = void 0;
		}
		async function Q() {
			if (await l(), W) {
				if (!E.value || !O.value) {
					Z();
					return;
				}
				H || (H = t(O.value, {
					getRect: le,
					isBottom: () => F.value
				}), U = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(X), U?.observe(O.value), window.addEventListener("resize", X)), k.value && U?.observe(k.value), X(), Y();
			}
		}
		te(() => {
			W = !0, $(), Y(), Q();
		}), d(() => {
			W = !1, q(), Z();
		}), _(() => C.modelValue, (e) => {
			if (W) {
				if (e) {
					se();
					return;
				}
				ce();
			}
		}), _(E, Q), _([
			j,
			M,
			L,
			() => C.app,
			() => C.attach
		], () => {
			$(), ue(), Q();
		});
		function $() {
			C.app && !I.value && console.warn("MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		return (t, i) => (f(), s(n, null, [e.placeholder && E.value && (!e.app || I.value) ? (f(), s("span", {
			key: 0,
			class: "mat-toolbar__placeholder",
			style: u(B.value),
			"aria-hidden": "true"
		}, null, 4)) : o("", !0), (f(), a(r, {
			to: I.value ?? "body",
			disabled: !e.app
		}, [E.value && (!e.app || I.value) ? (f(), s("div", ee({
			key: 0,
			ref_key: "toolbarElement",
			ref: O
		}, t.$attrs, {
			class: ["mat-toolbar", [V.value, `mat-toolbar--${D.value}`]],
			style: z.value,
			role: "toolbar",
			"aria-orientation": P.value ? "vertical" : void 0
		}), [c("div", ie, [c("div", v, [m(t.$slots, "default", {}, void 0, !0)])]), N.value && h(T).fab ? (f(), s("div", {
			key: 0,
			ref_key: "fabElement",
			ref: k,
			class: "mat-toolbar__fab"
		}, [m(t.$slots, "fab", {}, void 0, !0)], 512)) : o("", !0)], 16, re)) : o("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-2ef0fa1c"]]);
//#endregion
export { b as default };
