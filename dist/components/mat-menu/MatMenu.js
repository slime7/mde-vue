import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import n from "../use-component-color.js";
import r from "../MatSurfaceBase.js";
import i from "../use-roving-focus.js";
import { MAT_MENU_ITEM_KEY as a, MAT_MENU_KEY as o, updateMenuItemPositions as s } from "../menu-context.js";
/* empty css                                                        */
import { Fragment as c, computed as l, createCommentVNode as ee, createElementBlock as te, createElementVNode as ne, createVNode as re, inject as ie, mergeProps as ae, nextTick as u, onBeforeUnmount as oe, onMounted as se, onUpdated as ce, openBlock as d, provide as le, ref as f, renderSlot as ue, unref as p, useAttrs as de, useId as fe, useSlots as pe, watch as m, withCtx as me } from "vue";
//#region src/components/mat-menu/MatMenu.vue
var he = { class: "mat-menu__surface" }, h = 200, g = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
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
			validator: t
		},
		closeOnClick: {
			type: Boolean,
			default: !0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "boolean" },
	setup(e, { emit: t }) {
		let g = e, _ = t, ge = de(), _e = pe(), v = ie(a, null), y = ie(o, null), b = f(null), x = f(null), S = l(() => x.value?.root ?? x.value?.$el ?? null), ve = fe().replace(/[^\w-]/g, "-"), ye = l(() => ge.id ?? `${ve}-menu`), C = `--mat-menu-anchor-${ve}`, w = f(!1), T = f("closed"), E = y?.pointerHistory ?? {
			current: {
				x: 0,
				y: 0
			},
			previous: {
				x: 0,
				y: 0
			}
		}, D = f(0), O = /* @__PURE__ */ new Map(), k = null, A = "", j = !1, M = !1, N, P, F, I = null, L = !1, R = l(() => !!v), z = l(() => !!_e.activator), B = l(() => !R.value && !z.value && W(g.anchor)), be = l(() => D.value > 0), V = l(() => R.value ? w.value : g.modelValue), xe = l(() => g.variant ?? y?.variant.value ?? "standard"), H = l(() => g.color ?? y?.color.value), Se = l(() => g.closeOnClick), { colorStyle: Ce } = n(H), we = l(() => {
			let [e, t] = W(g.offset) ? g.offset : [0, 0], n = {
				"--mat-menu-offset-x": `${e}px`,
				"--mat-menu-offset-y": `${t}px`,
				positionAnchor: B.value ? "auto" : C
			};
			return B.value && W(g.anchor) && (n.left = `${g.anchor[0]}px`, n.top = `${g.anchor[1]}px`), n;
		}), Te = l(() => [
			Ce.value,
			we.value,
			ge.style
		]), U = i({
			root: S,
			selector: "[data-mat-menu-item]",
			isAvailable(e) {
				return e.closest("[role=\"menu\"]") === S.value && !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true";
			}
		});
		function W(e) {
			return Array.isArray(e) && e.length === 2 && e.every((e) => Number.isFinite(e));
		}
		function G() {
			if (R.value) return v.element.value;
			if (z.value) {
				let e = b.value ? [...b.value.children] : [];
				return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
			}
			return !g.anchor || typeof g.anchor != "string" ? null : document.getElementById(g.anchor);
		}
		function K() {
			k && (A ? k.style.setProperty("anchor-name", A) : k.style.removeProperty("anchor-name"), k = null, A = "");
		}
		function Ee() {
			let e = G();
			return e ? k === e ? e : (K(), k = e, A = e.style.getPropertyValue("anchor-name"), e.style.setProperty("anchor-name", C), e) : null;
		}
		function q() {
			N !== void 0 && (window.clearTimeout(N), N = void 0);
		}
		function De() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function J() {
			S.value && j && (j = !1, M = !0, S.value.hidePopover?.()), T.value = "closed";
		}
		function Oe() {
			N = void 0, T.value = "closed";
		}
		function ke() {
			if (q(), De()) {
				T.value = "closed";
				return;
			}
			T.value = "closing", N = window.setTimeout(Oe, h);
		}
		function Y({ immediate: e = !1 } = {}) {
			if (!(!S.value || !j)) {
				if (M = !0, Q({ immediate: !0 }), e || De()) {
					q(), J();
					return;
				}
				T.value !== "closing" && (T.value = "closing", q(), N = window.setTimeout(() => {
					N = void 0, J();
				}, h));
			}
		}
		function Ae() {
			if (P = void 0, !S.value || !j) return;
			let e = S.value.style, t = S.value.getBoundingClientRect(), n = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-x")) || 0, r = Number.parseFloat(e.getPropertyValue("--mat-menu-viewport-shift-y")) || 0, i = Number.parseFloat(getComputedStyle(S.value).getPropertyValue("--mat-menu-viewport-space")), a = Number.isFinite(i) ? i : 8, o = {
				bottom: t.bottom - r,
				left: t.left - n,
				right: t.right - n,
				top: t.top - r
			}, s = 0, c = 0;
			o.left < a ? s = a - o.left : o.right > window.innerWidth - a && (s = window.innerWidth - a - o.right), o.top < a ? c = a - o.top : o.bottom > window.innerHeight - a && (c = window.innerHeight - a - o.bottom), e.setProperty("--mat-menu-viewport-shift-x", `${s}px`), e.setProperty("--mat-menu-viewport-shift-y", `${c}px`);
		}
		function X() {
			P !== void 0 && cancelAnimationFrame(P), P = requestAnimationFrame(Ae);
		}
		async function Z() {
			q(), M = !1, await u();
			let e = B.value ? null : Ee(), t = B.value || !!e;
			if (!S.value || !t) {
				R.value || (console.warn(z.value ? "MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点" : "MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标"), _("update:modelValue", !1));
				return;
			}
			j || (B.value && document.activeElement instanceof HTMLElement && (I = document.activeElement), j = !0, S.value.showPopover?.()), T.value = "open", R.value && (v.submenuOpen.value = !0), U.refresh(), U.focusFirst(), X();
		}
		function je() {
			let e = G() ?? I;
			I = null, u(() => e?.focus());
		}
		function Q({ immediate: e = !1 } = {}) {
			O.forEach((t) => t.closeSubmenu({ immediate: e }));
		}
		function $({ focus: e = !0, immediate: t = !1 } = {}) {
			Q({ immediate: t }), R.value ? (w.value = !1, v.submenuOpen.value = !1) : _("update:modelValue", !1), Y({ immediate: t }), e && je();
		}
		function Me() {
			if (y) {
				y.closeTree();
				return;
			}
			$();
		}
		function Ne(e) {
			O.set(e.element, e), s(Array.from(O.values()).filter((e) => !e.grouped)), U.queueRefresh();
		}
		function Pe(e) {
			O.delete(e.element), s(Array.from(O.values()).filter((e) => !e.grouped)), U.queueRefresh();
		}
		function Fe() {
			D.value += 1, U.queueRefresh();
		}
		function Ie() {
			D.value = Math.max(0, D.value - 1), U.queueRefresh();
		}
		function Le(e, { pointer: t = !1 } = {}) {
			O.forEach((n) => {
				n !== e && n.closeSubmenu({
					delay: t ? n.getSubmenuCloseDelay?.() : 0,
					focus: !1
				});
			});
		}
		function Re(e) {
			let t = getComputedStyle(S.value).direction === "rtl" ? "ArrowRight" : "ArrowLeft";
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), U.move(e.target, e.key === "ArrowDown" ? 1 : -1)) : e.key === "Home" ? (e.preventDefault(), U.focusFirst()) : e.key === "End" ? (e.preventDefault(), U.focusLast()) : e.key === "Escape" || R.value && e.key === t ? (e.preventDefault(), $()) : e.key === "Tab" && Me();
		}
		function ze(e) {
			if (j = e.newState === "open", j) {
				X();
				return;
			}
			let t = M;
			M = !1, Q(), R.value && (w.value = !1, v.submenuOpen.value = !1), !(!V.value || t) && (ke(), R.value || _("update:modelValue", !1), je());
		}
		le(o, {
			closeOtherSubmenus: Le,
			closeTree: Me,
			closeOnClick: Se,
			color: H,
			registerItem: Ne,
			registerGroup: Fe,
			unregisterItem: Pe,
			unregisterGroup: Ie,
			pointerHistory: E,
			variant: xe
		}), v && v.registerSubmenu({
			close: $,
			element: S,
			id: ye,
			open: Z
		}), se(() => {
			U.observe(), window.addEventListener("resize", X), window.addEventListener("scroll", X, {
				capture: !0,
				passive: !0
			}), V.value && Ve(), typeof ResizeObserver < "u" && (F = new ResizeObserver(X), F.observe(S.value)), V.value && Z();
		}), ce(() => {
			R.value || !V.value || B.value || G() !== k && (K(), Z());
		}), oe(() => {
			q(), P !== void 0 && cancelAnimationFrame(P), F?.disconnect(), window.removeEventListener("resize", X), window.removeEventListener("scroll", X, { capture: !0 }), He(), Y({ immediate: !0 }), K(), v?.unregisterSubmenu();
		});
		function Be(e) {
			E.previous = E.current, E.current = {
				x: e.clientX,
				y: e.clientY
			};
		}
		function Ve() {
			y || L || (document.addEventListener("pointermove", Be, !0), L = !0);
		}
		function He() {
			L &&= (document.removeEventListener("pointermove", Be, !0), !1);
		}
		return m(V, (e) => {
			e ? (Ve(), Z()) : (He(), Y());
		}), m(() => g.anchor, async () => {
			K(), V.value && await Z();
		}, { deep: !0 }), m(() => g.offset, async () => {
			V.value && (await u(), X());
		}, { deep: !0 }), (e, t) => (d(), te(c, null, [!R.value && z.value ? (d(), te("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: b,
			class: "mat-menu__activator"
		}, [ue(e.$slots, "activator", {}, void 0, !0)], 512)) : ee("", !0), re(r, ae({
			id: ye.value,
			ref_key: "surface",
			ref: x
		}, e.$attrs, {
			class: ["mat-menu", [`mat-menu--${xe.value}`, {
				"mat-menu--coordinate": B.value,
				"mat-menu--grouped": be.value,
				"mat-menu--nested": R.value,
				"mat-menu--closing": T.value === "closing"
			}]],
			style: Te.value,
			popover: "auto",
			role: "menu",
			onPointerenter: t[0] ||= (e) => p(v)?.cancelSubmenuClose(),
			onFocusin: p(U).handleFocusIn,
			onKeydown: Re,
			onToggle: ze
		}), {
			default: me(() => [ne("div", he, [ue(e.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"id",
			"class",
			"style",
			"onFocusin"
		])], 64));
	}
}), [["__scopeId", "data-v-8255369d"]]);
//#endregion
export { g as default };
