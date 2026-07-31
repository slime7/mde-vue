import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatActionBase.js";
import n, { DEFAULT_MAT_UI_OPTIONS as r } from "../../mat-ui-context.js";
import i from "../mat-icon/MatIcon.js";
import a from "../MatItemContentBase.js";
import { MAT_MENU_GROUP_KEY as o, MAT_MENU_ITEM_KEY as s, MAT_MENU_KEY as c, isPointInMenuSafeTriangle as l } from "../menu-context.js";
/* empty css                                                            */
import { computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createSlots as m, createVNode as h, inject as g, mergeProps as _, onBeforeUnmount as v, onMounted as y, openBlock as b, provide as x, ref as S, renderSlot as C, unref as w, useSlots as T, withCtx as E } from "vue";
//#region src/components/mat-menu/MatMenuItem.vue
var D = { class: "mat-menu-item-host" }, O = 300, k = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatMenuItem",
	inheritAttrs: !1
}, {
	__name: "MatMenuItem",
	props: { disabled: {
		type: Boolean,
		default: !1
	} },
	emits: { click: (e) => e instanceof MouseEvent },
	setup(e, { emit: k }) {
		let A = e, j = k, M = T(), N = g(c, null), P = g(o, null), F = g(n, r), I = S(null), L = u(() => I.value?.root ?? I.value?.$el ?? null), R = S(!1), z = S(void 0), B = S("only"), V, H, U = u(() => !!M.submenu);
		function W({ delay: e = 0, focus: t = !1, immediate: n = !1 } = {}) {
			if (G(), e > 0) {
				H = setTimeout(() => {
					R.value = !1, V?.close({
						focus: t,
						immediate: n
					});
				}, e);
				return;
			}
			R.value = !1, V?.close({
				focus: t,
				immediate: n
			});
		}
		function G() {
			clearTimeout(H), H = void 0;
		}
		async function K({ pointer: e = !1 } = {}) {
			!U.value || A.disabled || (N?.closeOtherSubmenus(Y, { pointer: e }), R.value = !0, await V?.open());
		}
		function q(e) {
			V = e, z.value = e.id.value;
		}
		function J() {
			V = void 0, z.value = void 0, R.value = !1;
		}
		let Y = {
			closeSubmenu: W,
			element: L,
			grouped: !!P,
			setPosition(e) {
				B.value = e;
			},
			getSubmenuCloseDelay() {
				if (!V?.element?.value || !N?.pointerHistory || !L.value) return 0;
				let e = L.value.getBoundingClientRect(), t = V.element.value.getBoundingClientRect(), n = t.left < e.left ? "left" : "right";
				return l(N.pointerHistory.current, N.pointerHistory.previous, t, n) ? O : 0;
			}
		};
		function X(e) {
			if (U.value) {
				K();
				return;
			}
			j("click", e), N?.closeOnClick.value && N.closeTree();
		}
		function Z(e) {
			if (!U.value) return;
			let t = getComputedStyle(L.value).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
			(e.key === t || e.key === "Enter" || e.key === " ") && (e.preventDefault(), K());
		}
		return x(s, {
			cancelSubmenuClose: G,
			element: L,
			registerSubmenu: q,
			submenuOpen: R,
			unregisterSubmenu: J
		}), y(() => {
			P?.registerItem(Y), N?.registerItem(Y);
		}), v(() => {
			clearTimeout(H), P?.unregisterItem(Y), N?.unregisterItem(Y);
		}), (n, r) => (b(), p("span", D, [h(t, _({
			ref_key: "action",
			ref: I
		}, n.$attrs, {
			class: ["mat-menu-item", [`mat-menu-item--${B.value}`, { "mat-menu-item--submenu-open": R.value }]],
			"data-mat-menu-item": "",
			"aria-controls": U.value ? z.value : void 0,
			"aria-expanded": U.value ? String(R.value) : void 0,
			"aria-haspopup": U.value ? "menu" : void 0,
			disabled: e.disabled,
			role: "menuitem",
			"use-cursor": w(F).useCursor,
			onClick: X,
			onKeydown: Z,
			onPointerenter: r[0] ||= (e) => K({ pointer: !0 })
		}), {
			default: E(() => [h(a, {
				namespace: "mat-menu-item-content",
				"line-count": n.$slots.supporting ? 2 : 1,
				"leading-icon": ""
			}, m({
				trailing: E(() => [n.$slots.trailing ? C(n.$slots, "trailing", { key: 0 }, void 0, !0) : U.value ? (b(), d(i, {
					key: 1,
					as: "span",
					class: "mat-menu-item__submenu-icon",
					icon: "chevron_right",
					"optical-size": 20,
					size: "small",
					"aria-hidden": "true"
				})) : f("", !0)]),
				default: E(() => [C(n.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [n.$slots.leading ? {
				name: "leading",
				fn: E(() => [C(n.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0, n.$slots.supporting ? {
				name: "supporting",
				fn: E(() => [C(n.$slots, "supporting", {}, void 0, !0)]),
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
		]), n.$slots.submenu ? C(n.$slots, "submenu", { key: 0 }, void 0, !0) : f("", !0)]));
	}
}), [["__scopeId", "data-v-58f47898"]]);
//#endregion
export { k as default };
