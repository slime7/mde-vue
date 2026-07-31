import e from "../_virtual/_plugin-vue_export-helper.js";
import t from "./mat-icon/MatIcon.js";
/* empty css                                                                   */
import { createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, normalizeClass as o, openBlock as s, renderSlot as c, withCtx as l } from "vue";
//#region src/components/MatItemContentBase.vue
var u = ["data-line-count"], d = ["inert"], f = ["inert"], p = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({ name: "MatItemContentBase" }, {
	__name: "MatItemContentBase",
	props: {
		namespace: {
			type: String,
			required: !0
		},
		lineCount: {
			type: Number,
			required: !0,
			validator(e) {
				return [
					1,
					2,
					3
				].includes(e);
			}
		},
		separateTrailing: {
			type: Boolean,
			default: !1
		},
		presentationSlots: {
			type: Boolean,
			default: !1
		},
		leadingIcon: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (p, m) => (s(), i("span", {
			"data-mat-item-content": "",
			"data-line-count": e.lineCount,
			class: o([
				e.namespace,
				`${e.namespace}--lines-${e.lineCount}`,
				{ [`${e.namespace}--separate-trailing`]: e.separateTrailing }
			])
		}, [
			p.$slots.leading ? (s(), i("span", {
				key: 0,
				"data-mat-item-content-leading": "",
				class: o(`${e.namespace}__leading`),
				inert: e.presentationSlots ? "" : void 0
			}, [e.leadingIcon ? (s(), n(t, {
				key: 0,
				as: "span",
				"optical-size": 20,
				size: "var(--mat-item-icon-size)"
			}, {
				default: l(() => [c(p.$slots, "leading", {}, void 0, !0)]),
				_: 3
			})) : c(p.$slots, "leading", { key: 1 }, void 0, !0)], 10, d)) : r("", !0),
			a("span", {
				"data-mat-item-content-text": "",
				class: o(`${e.namespace}__text`)
			}, [
				p.$slots.overline ? (s(), i("span", {
					key: 0,
					"data-mat-item-content-overline": "",
					class: o(`${e.namespace}__overline`)
				}, [c(p.$slots, "overline", {}, void 0, !0)], 2)) : r("", !0),
				a("span", {
					"data-mat-item-content-label": "",
					class: o(`${e.namespace}__label`)
				}, [c(p.$slots, "default", {}, void 0, !0)], 2),
				p.$slots.supporting ? (s(), i("span", {
					key: 1,
					"data-mat-item-content-supporting": "",
					class: o(`${e.namespace}__supporting`)
				}, [c(p.$slots, "supporting", {}, void 0, !0)], 2)) : r("", !0)
			], 2),
			p.$slots.trailing && !e.separateTrailing ? (s(), i("span", {
				key: 1,
				"data-mat-item-content-trailing": "",
				class: o(`${e.namespace}__trailing`),
				inert: e.presentationSlots ? "" : void 0
			}, [c(p.$slots, "trailing", {}, void 0, !0)], 10, f)) : r("", !0)
		], 10, u));
	}
}), [["__scopeId", "data-v-dcc4a34a"]]);
//#endregion
export { p as default };
