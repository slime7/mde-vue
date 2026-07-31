import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatActionBase.js";
import n, { DEFAULT_MAT_UI_OPTIONS as r } from "../../mat-ui-context.js";
import { BUTTON_TYPES as i } from "../button-props.js";
import { MAT_LIST_GROUP_ACTIVATOR_KEY as a, MAT_LIST_KEY as o } from "../list-context.js";
import s from "./MatListItemContent.js";
/* empty css                                                            */
import { computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createSlots as f, createVNode as p, inject as m, mergeProps as h, nextTick as g, normalizeClass as _, onMounted as v, openBlock as y, renderSlot as b, unref as x, useSlots as S, watch as C, withCtx as w } from "vue";
//#region src/components/mat-list/MatListItem.vue
var T = [
	"id",
	"aria-disabled",
	"data-mat-list-disabled"
], E = ["aria-disabled", "data-mat-list-disabled"], D = ["aria-disabled", "data-mat-list-disabled"], O = ["inert"], k = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
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
				return i.includes(e);
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
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: i }) {
		let k = e, A = i, j = S(), M = m(o, null), N = m(a, null), P = m(n, r), F = c(() => M?.interaction.value ?? "none"), I = c(() => F.value === "single-action" || F.value === "multi-action"), L = c(() => F.value === "multi-action"), R = c(() => M?.isSelectable.value ?? !1), z = c(() => M?.isSelected(k.value) ?? !1), B = c(() => !!j.trailing), V = c(() => {
			if (k.lines !== void 0) return k.lines;
			let e = Number(!!j.overline) + Number(!!j.supporting);
			return Math.min(3, 1 + e);
		}), H = c(() => ({
			"mat-list-item--disabled": k.disabled,
			"mat-list-item--selected": z.value,
			[`mat-list-item--lines-${V.value}`]: !0
		}));
		function U(e) {
			if (R.value) {
				M?.requestSelection(k.value, e);
				return;
			}
			I.value && A("click", e);
		}
		function W() {
			k.disabled || N?.toggle();
		}
		function G(e) {
			k.disabled || e.repeat || ![" ", "Enter"].includes(e.key) || (e.preventDefault(), M?.requestSelection(k.value, e));
		}
		function K() {
			k.href !== void 0 && !N && !I.value && console.warn("MatListItem: href 仅在 single-action 或 multi-action 模式下生效");
		}
		return v(async () => {
			K(), await g(), M?.requestFocusRefresh();
		}), C(() => [
			k.disabled,
			k.href,
			F.value
		], async () => {
			K(), await g(), M?.requestFocusRefresh();
		}), (n, r) => x(N)?.static.value ? (y(), d("div", h({ key: 0 }, n.$attrs, {
			id: x(N).labelId,
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", H.value],
			"data-mat-list-group-label": "",
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}), [p(s, {
			"line-count": V.value,
			"presentation-slots": !1
		}, f({
			default: w(() => [b(n.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			n.$slots.leading ? {
				name: "leading",
				fn: w(() => [b(n.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			n.$slots.overline ? {
				name: "overline",
				fn: w(() => [b(n.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			n.$slots.supporting ? {
				name: "supporting",
				fn: w(() => [b(n.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			n.$slots.trailing ? {
				name: "trailing",
				fn: w(() => [b(n.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, T)) : x(N) ? (y(), l(t, h({ key: 1 }, n.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator", H.value],
			"data-mat-list-primary": "",
			"data-mat-list-group-activator": "",
			"aria-controls": x(N).contentId,
			"aria-expanded": x(N).expanded.value ? "true" : "false",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			disabled: e.disabled,
			"focus-ring": !0,
			type: "button",
			"use-cursor": x(P).useCursor,
			onClick: W
		}), {
			default: w(() => [p(s, {
				"line-count": V.value,
				"presentation-slots": !1
			}, f({
				default: w(() => [b(n.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				n.$slots.leading ? {
					name: "leading",
					fn: w(() => [b(n.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				n.$slots.overline ? {
					name: "overline",
					fn: w(() => [b(n.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				n.$slots.supporting ? {
					name: "supporting",
					fn: w(() => [b(n.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				n.$slots.trailing ? {
					name: "trailing",
					fn: w(() => [b(n.$slots, "trailing", {}, void 0, !0)]),
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
		])) : F.value === "none" ? (y(), d("li", h({ key: 2 }, n.$attrs, {
			class: ["mat-list-item mat-list-item__surface mat-list-item--static", H.value],
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}), [p(s, {
			"line-count": V.value,
			"presentation-slots": !1
		}, f({
			default: w(() => [b(n.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			n.$slots.leading ? {
				name: "leading",
				fn: w(() => [b(n.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			n.$slots.overline ? {
				name: "overline",
				fn: w(() => [b(n.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			n.$slots.supporting ? {
				name: "supporting",
				fn: w(() => [b(n.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			n.$slots.trailing ? {
				name: "trailing",
				fn: w(() => [b(n.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, ["line-count"])], 16, E)) : I.value ? (y(), d("li", {
			key: 3,
			class: _(["mat-list-item", [H.value, {
				"mat-list-item__surface": L.value,
				"mat-list-item--multi-action": L.value
			}]]),
			"aria-disabled": e.disabled ? "true" : void 0,
			"data-mat-list-disabled": e.disabled ? "true" : void 0
		}, [p(t, h(n.$attrs, {
			class: ["mat-list-item__primary", { "mat-list-item__surface": !L.value }],
			"data-mat-list-primary": "",
			disabled: e.disabled,
			"focus-ring": !0,
			href: e.href,
			type: e.type,
			"use-cursor": x(P).useCursor,
			onClick: U
		}), {
			default: w(() => [p(s, {
				"line-count": V.value,
				"presentation-slots": !1,
				"separate-trailing": L.value && B.value
			}, f({
				default: w(() => [b(n.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				n.$slots.leading ? {
					name: "leading",
					fn: w(() => [b(n.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				n.$slots.overline ? {
					name: "overline",
					fn: w(() => [b(n.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				n.$slots.supporting ? {
					name: "supporting",
					fn: w(() => [b(n.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				n.$slots.trailing ? {
					name: "trailing",
					fn: w(() => [b(n.$slots, "trailing", {}, void 0, !0)]),
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
		]), L.value && B.value ? (y(), d("span", {
			key: 0,
			class: "mat-list-item__separate-trailing",
			"data-mat-list-trailing": "",
			inert: e.disabled ? "" : void 0
		}, [b(n.$slots, "trailing", {}, void 0, !0)], 8, O)) : u("", !0)], 10, D)) : (y(), l(t, h({ key: 4 }, n.$attrs, {
			as: "div",
			class: ["mat-list-item mat-list-item__surface mat-list-item--selectable", H.value],
			"data-mat-list-primary": "",
			"data-mat-list-disabled": e.disabled ? "true" : void 0,
			"aria-selected": z.value ? "true" : "false",
			disabled: e.disabled,
			"focus-ring": !0,
			role: "option",
			"use-cursor": x(P).useCursor,
			onClick: U,
			onKeydown: G
		}), {
			default: w(() => [p(s, {
				"line-count": V.value,
				"presentation-slots": ""
			}, f({
				default: w(() => [b(n.$slots, "default", {}, void 0, !0)]),
				_: 2
			}, [
				n.$slots.leading ? {
					name: "leading",
					fn: w(() => [b(n.$slots, "leading", {}, void 0, !0)]),
					key: "0"
				} : void 0,
				n.$slots.overline ? {
					name: "overline",
					fn: w(() => [b(n.$slots, "overline", {}, void 0, !0)]),
					key: "1"
				} : void 0,
				n.$slots.supporting ? {
					name: "supporting",
					fn: w(() => [b(n.$slots, "supporting", {}, void 0, !0)]),
					key: "2"
				} : void 0,
				n.$slots.trailing ? {
					name: "trailing",
					fn: w(() => [b(n.$slots, "trailing", {}, void 0, !0)]),
					key: "3"
				} : void 0
			]), 1032, ["line-count"])]),
			_: 3
		}, 16, [
			"class",
			"data-mat-list-disabled",
			"aria-selected",
			"disabled",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-a787e932"]]);
//#endregion
export { k as default };
