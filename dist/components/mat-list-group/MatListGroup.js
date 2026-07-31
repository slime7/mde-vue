import e from "../../_virtual/_plugin-vue_export-helper.js";
import { MAT_LIST_KEY as t } from "../list-context.js";
import n from "../mat-list/MatListItem.js";
import r from "./MatListGroupActivatorProvider.js";
/* empty css                                                             */
import { Comment as i, Fragment as a, computed as o, createBlock as s, createElementVNode as c, createVNode as l, inject as u, isVNode as d, mergeProps as f, nextTick as p, onBeforeUnmount as m, onMounted as h, onUpdated as g, openBlock as _, ref as v, renderSlot as y, resolveDynamicComponent as b, useId as x, useSlots as S, watch as C, withCtx as w } from "vue";
//#region src/components/mat-list-group/MatListGroup.vue
var T = [
	"role",
	"aria-hidden",
	"inert"
], E = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatListGroup",
	inheritAttrs: !1
}, {
	__name: "MatListGroup",
	props: { value: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	} },
	setup(e) {
		let E = e, D = u(t, null), O = S(), k = v(null), A = v(!1), j = v(null), M = Symbol("mat-list-group"), N = x().replace(/[^\w-]/g, "-"), P = `mat-list-group-${N}-content`, F = `mat-list-group-${N}-label`, I = !1, L, R = o(() => E.value !== void 0), z = o(() => D?.isSelectable.value ?? !1), B = o(() => R.value ? D?.isGroupExpanded(E.value) ?? !1 : A.value);
		function V(e) {
			return e.flatMap((e) => d(e) ? e.type === i ? [] : e.type === a && Array.isArray(e.children) ? V(e.children) : [e] : typeof e == "string" && e.trim().length > 0 ? [e] : []);
		}
		let H = o(() => {
			let e = V(O.activator?.({ expanded: B.value }) ?? []);
			if (e.length !== 1 || !d(e[0])) return !1;
			let t = e[0].type;
			return t === n || typeof t == "object" && (t.name === "MatListItem" || t.__name === "MatListItem");
		}), U = o(() => j.value ?? H.value), W = o(() => z.value || !U.value || B.value), G = o(() => D?.variant.value ?? "segmented");
		function K() {
			(k.value?.querySelector(":scope > [data-mat-list-group-content]"))?.contains(document.activeElement) && k.value?.querySelector(":scope > [data-mat-list-group-activator]")?.focus();
		}
		function q() {
			if (!(z.value || !U.value)) {
				if (B.value && K(), R.value) {
					D?.requestGroupExpanded(E.value, !B.value);
					return;
				}
				A.value = !A.value;
			}
		}
		let J = {
			contentId: P,
			expanded: W,
			labelId: F,
			static: z,
			toggle: q
		};
		function Y() {
			!U.value && !I ? (console.warn("MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开"), I = !0) : U.value && (I = !1);
		}
		function X() {
			if (!k.value) return;
			let e = z.value ? "data-mat-list-group-label" : "data-mat-list-group-activator", t = Array.from(k.value.children).filter((t) => t.hasAttribute(e)).length === 1;
			j.value !== t && (j.value = t);
		}
		function Z() {
			X(), Y();
		}
		function Q(e) {
			e !== void 0 && (D?.registerGroupValue(M, e), L = e);
		}
		function $() {
			L !== void 0 && (D?.unregisterGroupValue(M), L = void 0);
		}
		return h(() => {
			D || console.warn("MatListGroup: 必须直接放置在 MatList 中"), z.value && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), Q(E.value), Z(), D?.requestFocusRefresh();
		}), g(Z), m(() => {
			$(), D?.requestFocusRefresh();
		}), C(() => E.value, (e, t) => {
			Object.is(e, t) || ($(), Q(e));
		}), C(B, async (e, t) => {
			t && !e && K(), await p(), D?.requestFocusRefresh();
		}), C(z, async (e, t) => {
			e && !t && console.warn("MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开"), await p(), D?.requestFocusRefresh();
		}), (e, t) => (_(), s(b(z.value ? "div" : "li"), f({
			ref_key: "root",
			ref: k
		}, e.$attrs, {
			class: ["mat-list-group", [`mat-list-group--${G.value}`, {
				"mat-list-group--expanded": W.value,
				"mat-list-group--selectable-fallback": z.value
			}]],
			role: z.value ? "group" : void 0,
			"aria-labelledby": z.value ? F : void 0
		}), {
			default: w(() => [l(r, { context: J }, {
				default: w(() => [y(e.$slots, "activator", { expanded: W.value }, void 0, !0)]),
				_: 3
			}), c("div", {
				id: P,
				class: "mat-list-group__content",
				"data-mat-list-group-content": "",
				role: z.value ? "presentation" : void 0,
				"aria-hidden": W.value ? void 0 : "true",
				inert: W.value ? void 0 : ""
			}, [(_(), s(b(z.value ? "div" : "ul"), {
				class: "mat-list-group__items",
				role: z.value ? "presentation" : void 0
			}, {
				default: w(() => [y(e.$slots, "default", {}, void 0, !0)]),
				_: 3
			}, 8, ["role"]))], 8, T)]),
			_: 3
		}, 16, [
			"class",
			"role",
			"aria-labelledby"
		]));
	}
}), [["__scopeId", "data-v-fdfe4231"]]);
//#endregion
export { E as default };
