import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatItemContentBase.js";
/* empty css                                                                   */
import { createBlock as n, createSlots as r, openBlock as i, renderSlot as a, withCtx as o } from "vue";
var s = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({ name: "MatListItemContent" }, {
	__name: "MatListItemContent",
	props: {
		lineCount: {
			type: Number,
			required: !0
		},
		separateTrailing: {
			type: Boolean,
			default: !1
		},
		presentationSlots: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (s, c) => (i(), n(t, {
			namespace: "mat-list-item-content",
			"line-count": e.lineCount,
			"presentation-slots": e.presentationSlots,
			"separate-trailing": e.separateTrailing
		}, r({
			default: o(() => [a(s.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [
			s.$slots.leading ? {
				name: "leading",
				fn: o(() => [a(s.$slots, "leading", {}, void 0, !0)]),
				key: "0"
			} : void 0,
			s.$slots.overline ? {
				name: "overline",
				fn: o(() => [a(s.$slots, "overline", {}, void 0, !0)]),
				key: "1"
			} : void 0,
			s.$slots.supporting ? {
				name: "supporting",
				fn: o(() => [a(s.$slots, "supporting", {}, void 0, !0)]),
				key: "2"
			} : void 0,
			s.$slots.trailing ? {
				name: "trailing",
				fn: o(() => [a(s.$slots, "trailing", {}, void 0, !0)]),
				key: "3"
			} : void 0
		]), 1032, [
			"line-count",
			"presentation-slots",
			"separate-trailing"
		]));
	}
}), [["__scopeId", "data-v-2d1ef745"]]);
//#endregion
export { s as default };
