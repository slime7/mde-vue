import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatButtonBase.js";
import n, { DEFAULT_MAT_UI_OPTIONS as r } from "../../mat-ui-context.js";
import i from "../mat-icon/MatIcon.js";
import a from "../mat-tooltip/MatTooltip.js";
import { FAB_SIZES as o, FAB_TYPES as s, isFabColor as c } from "../fab-props.js";
/* empty css                                                       */
import { Comment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createTextVNode as m, inject as h, mergeProps as g, openBlock as _, ref as v, renderSlot as y, toDisplayString as b, unref as x, useAttrs as S, useId as C, useSlots as w, watchEffect as T, withCtx as E } from "vue";
//#region src/components/mat-fab/MatFab.vue
var D = {
	key: 1,
	class: "mat-fab__label"
}, O = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatFab",
	inheritAttrs: !1
}, {
	__name: "MatFab",
	props: {
		size: {
			type: String,
			default: "medium",
			validator(e) {
				return o.includes(e);
			}
		},
		icon: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || e.trim().length > 0;
			}
		},
		label: {
			type: String,
			default: void 0
		},
		color: {
			type: String,
			default: "primary-container",
			validator: c
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return s.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: o }) {
		let s = e, c = o, O = S(), k = w(), A = h(n, r), j = v(null), M = C(), N = u(() => (k.default?.() ?? []).some((e) => e.type === l ? !1 : typeof e.children != "string" || e.children.trim().length > 0)), P = u(() => typeof s.icon == "string" && s.icon.trim().length > 0), F = u(() => !N.value), I = u(() => F.value ? O.title ?? s.label : void 0), L = u(() => F.value ? s.label : O["aria-label"]), R = u(() => ({
			small: 24,
			medium: 28,
			large: 36
		})[s.size]), z = u(() => ({
			"--mat-fab-container-color": `var(--mat-sys-color-${s.color})`,
			"--mat-fab-content-color": `var(--mat-sys-color-on-${s.color})`,
			"--mat-fab-state-color": `var(--mat-sys-color-on-${s.color})`
		}));
		return T(() => {
			F.value && (!P.value || !s.label || s.label.trim().length === 0) && console.warn("MatFab: 图标模式必须提供非空 label");
		}), (n, r) => (_(), d(t, g({
			ref_key: "buttonElement",
			ref: j
		}, n.$attrs, {
			class: ["mat-fab", [`mat-fab--size-${e.size}`, {
				"mat-fab--extended": N.value,
				"mat-fab--icon-only": F.value
			}]],
			style: z.value,
			"aria-label": L.value,
			disabled: e.disabled,
			title: F.value ? void 0 : x(O).title,
			type: e.type,
			"use-cursor": x(A).useCursor,
			onClick: r[0] ||= (e) => c("click", e)
		}), {
			default: E(() => [
				P.value ? (_(), d(i, {
					key: 0,
					as: "span",
					class: "mat-fab__icon",
					fill: 1,
					"optical-size": R.value,
					size: "var(--mat-fab-icon-size)",
					"aria-hidden": "true"
				}, {
					default: E(() => [m(b(e.icon), 1)]),
					_: 1
				}, 8, ["optical-size"])) : f("", !0),
				N.value ? (_(), p("span", D, [y(n.$slots, "default", {}, void 0, !0)])) : f("", !0),
				F.value && I.value ? (_(), d(a, {
					key: 2,
					content: I.value,
					id: `${x(M)}-tooltip`,
					target: j.value
				}, null, 8, [
					"content",
					"id",
					"target"
				])) : f("", !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-label",
			"disabled",
			"title",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-1b48ed94"]]);
//#endregion
export { O as default };
