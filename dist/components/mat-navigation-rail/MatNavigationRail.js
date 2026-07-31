import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatActionBase.js";
import n, { DEFAULT_MAT_UI_OPTIONS as r } from "../../mat-ui-context.js";
import i from "../mat-icon/MatIcon.js";
import { MAT_NAVIGATION_RAIL_KEY as a } from "./mat-navigation-context.js";
/* empty css                                                                  */
import { Fragment as o, Teleport as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createVNode as p, inject as m, mergeProps as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, openBlock as x, provide as S, ref as C, renderSlot as w, unref as T, watch as ee, withCtx as te } from "vue";
//#region src/components/mat-navigation-rail/MatNavigationRail.vue
var ne = ["aria-label"], re = {
	key: 0,
	class: "mat-navigation-rail__header"
}, ie = {
	key: 2,
	class: "mat-navigation-rail__fab"
}, ae = {
	key: 1,
	class: "mat-navigation-rail__content"
}, E = {
	key: 2,
	class: "mat-navigation-rail__end"
}, D = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
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
			validator(e) {
				return typeof e == "number" && Number.isFinite(e) && e >= 0 || typeof e == "string" && e.trim().length > 0;
			}
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
			validator(e) {
				if (typeof e == "number") return Number.isFinite(e) && e >= 0;
				if (typeof e != "string") return !1;
				let t = e.trim();
				return !t || /[;{}]/.test(t) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("block-size", t);
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
	setup(e, { emit: D }) {
		function O(e) {
			if (typeof e == "number") return Number.isFinite(e) && e >= 0;
			if (typeof e != "string") return !1;
			let t = e.trim();
			return !t || /[;{}]/.test(t) ? !1 : typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("block-size", t);
		}
		function k(e) {
			return typeof e == "number" && Number.isFinite(e) && e >= 0 ? `${e}px` : typeof e == "string" && O(e) ? e.trim() : "0px";
		}
		function A(e) {
			return e instanceof HTMLElement && e.ownerDocument === document ? e : null;
		}
		let j = e, M = D, N = m(n, r), P = c(() => j.orientation === "horizontal"), F = c(() => j.expanded), I = c(() => !P.value && j.layout === "modal"), L = c(() => !P.value && j.hideOnCollapse && !j.expanded), R = c(() => {
			if (!j.app) return null;
			if (typeof j.attach == "string") try {
				return document.querySelector(j.attach);
			} catch {
				return null;
			}
			return A(j.attach);
		}), z = c(() => j.expanded ? j.closeIcon : j.openIcon), B = c(() => j.expanded ? j.closeLabel : j.openLabel), V = c(() => ({
			"mat-navigation-rail-host--vertical": !P.value,
			"mat-navigation-rail-host--horizontal": P.value,
			"mat-navigation-rail-host--expanded": F.value,
			"mat-navigation-rail-host--collapsed": !j.expanded,
			[`mat-navigation-rail-host--${j.position}`]: !0,
			"mat-navigation-rail-host--modal": I.value,
			"mat-navigation-rail-host--hidden": L.value,
			"mat-navigation-rail-host--app": j.app
		})), H = c(() => ({
			"mat-navigation-rail--expanded": F.value,
			"mat-navigation-rail--collapsed": !j.expanded,
			"mat-navigation-rail--bar": P.value,
			"mat-navigation-rail--modal": I.value && j.expanded,
			"mat-navigation-rail--hidden": L.value,
			"mat-navigation-rail--app": j.app
		})), U = c(() => {
			if (j.width !== void 0) return { "--mat-navigation-rail-expanded-width": typeof j.width == "number" ? `${j.width}px` : j.width };
		}), W = c(() => j.app ? k(j.bottomPlaceholder) : "0px"), G = c(() => [U.value, { "--mat-navigation-rail-bottom-placeholder": W.value }]), K = C(null), q = C({
			blockSize: 0,
			inlineSize: 0
		}), oe = c(() => ({
			blockSize: `${q.value.blockSize}px`,
			inlineSize: `${q.value.inlineSize}px`
		})), J;
		function Y() {
			let e = K.value?.getBoundingClientRect();
			e && (q.value = {
				blockSize: Math.max(0, Math.ceil(Number(e.height) || 0)),
				inlineSize: Math.max(0, Math.ceil(Number(e.width) || 0))
			});
		}
		async function X() {
			J?.disconnect(), J = void 0, await g(), !(!j.app || !K.value) && (J = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(Y), J?.observe(K.value), Y());
		}
		function Z() {
			j.app && !R.value && console.warn("MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement");
		}
		function se(e) {
			return e !== void 0 && Object.is(j.modelValue, e);
		}
		function ce(e) {
			e === void 0 || Object.is(j.modelValue, e) || M("update:modelValue", e);
		}
		function le() {
			M("update:expanded", !j.expanded);
		}
		function Q() {
			M("update:expanded", !1);
		}
		function $(e) {
			e.key === "Escape" && I.value && j.expanded && Q();
		}
		return S(a, {
			expanded: F,
			isSelected: se,
			orientation: c(() => j.orientation),
			position: c(() => j.position),
			requestSelection: ce,
			useCursor: N.useCursor
		}), b(() => {
			window.addEventListener("keydown", $), Z(), X();
		}), y(() => {
			window.removeEventListener("keydown", $), J?.disconnect();
		}), ee([
			() => j.app,
			() => j.attach,
			() => j.bottomPlaceholder,
			() => j.expanded,
			() => j.hideOnCollapse,
			() => j.layout,
			() => j.orientation,
			() => j.width
		], () => {
			Z(), X();
		}), (n, r) => (x(), d(o, null, [e.app && R.value && e.placeholder ? (x(), d("span", {
			key: 0,
			class: "mat-navigation-rail__placeholder",
			style: v(oe.value),
			"aria-hidden": "true"
		}, null, 4)) : u("", !0), (x(), l(s, {
			to: R.value ?? "body",
			disabled: !e.app
		}, [!e.app || R.value ? (x(), d("div", {
			key: 0,
			class: _(["mat-navigation-rail-host", V.value]),
			style: v(U.value)
		}, [I.value && e.expanded ? (x(), d("button", {
			key: 0,
			class: "mat-navigation-rail__scrim",
			type: "button",
			"aria-label": e.closeLabel,
			onClick: Q
		}, null, 8, ne)) : u("", !0), f("nav", h({
			ref_key: "railElement",
			ref: K
		}, n.$attrs, {
			class: ["mat-navigation-rail", H.value],
			style: G.value
		}), [
			P.value ? u("", !0) : (x(), d("div", re, [
				L.value ? u("", !0) : w(n.$slots, "header", {
					key: 0,
					expanded: e.expanded
				}, void 0, !0),
				e.collapsible ? (x(), l(t, {
					key: 1,
					class: "mat-navigation-rail__menu",
					"aria-expanded": e.expanded,
					"aria-label": B.value,
					"focus-ring": !1,
					"use-cursor": T(N).useCursor,
					onClick: le
				}, {
					default: te(() => [p(i, {
						icon: z.value,
						"aria-hidden": "true"
					}, null, 8, ["icon"])]),
					_: 1
				}, 8, [
					"aria-expanded",
					"aria-label",
					"use-cursor"
				])) : u("", !0),
				n.$slots.fab && !L.value ? (x(), d("div", ie, [w(n.$slots, "fab", { expanded: e.expanded }, void 0, !0)])) : u("", !0)
			])),
			L.value ? u("", !0) : (x(), d("div", ae, [f("div", { class: _(["mat-navigation-rail__destinations", `mat-navigation-rail__destinations--${e.alignment}`]) }, [w(n.$slots, "default", {
				expanded: F.value,
				orientation: e.orientation
			}, void 0, !0)], 2)])),
			n.$slots.end && !L.value && !P.value ? (x(), d("div", E, [w(n.$slots, "end", { expanded: e.expanded }, void 0, !0)])) : u("", !0)
		], 16)], 6)) : u("", !0)], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-3d033b24"]]);
//#endregion
export { D as default };
