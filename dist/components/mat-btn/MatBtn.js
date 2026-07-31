import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatButtonBase.js";
import { BUTTON_SHAPES as n, BUTTON_SIZES as r, BUTTON_TYPES as i, isComponentColor as a } from "../button-props.js";
import o from "../mat-icon/MatIcon.js";
import s from "../mat-tooltip/MatTooltip.js";
import c from "../use-button.js";
/* empty css                                                       */
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createTextVNode as m, isVNode as h, mergeProps as g, onMounted as _, openBlock as v, ref as y, renderSlot as b, toDisplayString as x, unref as S, useAttrs as C, useId as w, useSlots as T, watchEffect as E, withCtx as D } from "vue";
//#region src/components/mat-btn/MatBtn.vue
var O = {
	key: 2,
	class: "mat-btn__label"
}, k = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatBtn",
	inheritAttrs: !1
}, {
	__name: "MatBtn",
	props: {
		block: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "filled",
			validator(e) {
				return [
					"elevated",
					"filled",
					"filled-tonal",
					"outlined",
					"text",
					"standard"
				].includes(e);
			}
		},
		size: {
			type: String,
			default: void 0,
			validator(e) {
				return r.includes(e);
			}
		},
		shape: {
			type: String,
			default: void 0,
			validator(e) {
				return n.includes(e);
			}
		},
		width: {
			type: String,
			default: "uniform",
			validator(e) {
				return [
					"narrow",
					"uniform",
					"wide"
				].includes(e);
			}
		},
		icon: {
			type: [Boolean, String],
			default: void 0,
			validator(e) {
				return e === void 0 || typeof e == "boolean" || e.trim().length > 0;
			}
		},
		prefix: {
			type: String,
			default: void 0
		},
		suffix: {
			type: String,
			default: void 0
		},
		label: {
			type: String,
			default: void 0
		},
		color: {
			type: String,
			default: void 0,
			validator: a
		},
		toggle: {
			type: Boolean,
			default: !1
		},
		selected: {
			type: Boolean,
			default: !1
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator(e) {
				return i.includes(e);
			}
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: n }) {
		let r = e, i = n, a = C(), k = T(), A = y(null), ee = w(), { colorStyle: j, effectiveDisabled: M, effectiveSelected: N, effectiveShape: P, effectiveSize: F, effectiveToggle: I, effectiveVariant: L, handleClick: R, hasExplicitColor: z, split: B, useCursor: V } = c(r, i), H = u(() => I.value && L.value !== "text"), U = u(() => H.value && N.value), W = u(() => r.icon === !0 || typeof r.icon == "string" && r.icon.trim().length > 0);
		function G(e) {
			return e.flatMap((e) => typeof e == "string" || typeof e == "number" ? [String(e)] : h(e) ? e.type === l && Array.isArray(e.children) ? G(e.children) : typeof e.children == "string" || typeof e.children == "number" ? [String(e.children)] : Array.isArray(e.children) ? G(e.children) : [] : []).join("").trim();
		}
		let K = u(() => r.icon === !0 ? G(k.default?.() ?? []) : ""), q = u(() => typeof r.icon == "string" ? r.icon.trim() : K.value), J = u(() => a["aria-label"] ?? r.label), Y = u(() => W.value ? a.title ?? r.label : void 0), X = u(() => !W.value && (r.prefix !== void 0 || !!k.prefix)), Z = u(() => !W.value && (r.suffix !== void 0 || !!k.suffix)), Q = u(() => U.value && !!k.selected), $ = u(() => ({
			"extra-small": 20,
			small: W.value ? 24 : 20,
			medium: 24,
			large: 32,
			"extra-large": 40
		})[F.value]);
		return _(() => {
			r.icon === !0 && !K.value && console.warn("MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本");
		}), E(() => {
			r.toggle && r.variant === "text" && console.warn("MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理"), W.value && (!J.value || J.value.trim().length === 0) && console.warn("MatBtn: 图标模式必须提供非空 label 或 aria-label");
		}), (n, r) => (v(), d(t, g({
			ref_key: "buttonElement",
			ref: A
		}, S(a), {
			class: ["mat-btn", [
				`mat-btn--${S(L)}`,
				`mat-btn--size-${S(F)}`,
				`mat-btn--shape-${S(P)}`,
				{
					"mat-button--explicit-color": S(z),
					"mat-btn--icon": W.value,
					[`mat-btn--width-${e.width}`]: W.value,
					"mat-btn--toggle": H.value,
					"mat-btn--selected": U.value,
					"mat-btn--split-leading": S(B)?.role === "leading"
				}
			]],
			style: S(j),
			"aria-label": W.value ? J.value : S(a)["aria-label"],
			"aria-controls": S(B)?.role === "trailing" ? S(B).controls.value : void 0,
			"aria-expanded": S(B)?.role === "trailing" ? S(B).expanded.value : void 0,
			"aria-haspopup": S(B)?.role === "trailing" ? "menu" : void 0,
			"aria-pressed": H.value ? U.value : void 0,
			block: e.block,
			disabled: S(M),
			title: W.value ? void 0 : S(a).title,
			type: e.type,
			"use-cursor": S(V),
			onClick: S(R)
		}), {
			default: D(() => [
				W.value ? (v(), d(o, {
					key: 0,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--only",
					fill: +!!U.value,
					"optical-size": $.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: D(() => [m(x(q.value), 1)]),
					_: 1
				}, 8, ["fill", "optical-size"])) : f("", !0),
				X.value ? (v(), d(o, {
					key: 1,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--prefix",
					fill: +!!U.value,
					"optical-size": $.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: D(() => [e.prefix === void 0 ? b(n.$slots, "prefix", { key: 1 }, void 0, !0) : (v(), p(l, { key: 0 }, [m(x(e.prefix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : f("", !0),
				W.value ? f("", !0) : (v(), p("span", O, [Q.value ? b(n.$slots, "selected", { key: 0 }, void 0, !0) : b(n.$slots, "default", { key: 1 }, void 0, !0)])),
				Z.value ? (v(), d(o, {
					key: 3,
					as: "span",
					class: "mat-btn__icon mat-btn__icon--suffix",
					fill: +!!U.value,
					"optical-size": $.value,
					size: "var(--mat-btn-icon-size)",
					"aria-hidden": "true"
				}, {
					default: D(() => [e.suffix === void 0 ? b(n.$slots, "suffix", { key: 1 }, void 0, !0) : (v(), p(l, { key: 0 }, [m(x(e.suffix), 1)], 64))]),
					_: 3
				}, 8, ["fill", "optical-size"])) : f("", !0),
				W.value && Y.value ? (v(), d(s, {
					key: 4,
					content: Y.value,
					id: `${S(ee)}-tooltip`,
					target: A.value
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
			"aria-controls",
			"aria-expanded",
			"aria-haspopup",
			"aria-pressed",
			"block",
			"disabled",
			"title",
			"type",
			"use-cursor",
			"onClick"
		]));
	}
}), [["__scopeId", "data-v-21585aef"]]);
//#endregion
export { k as default };
