import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import n from "../use-component-color.js";
import r from "../MatSurfaceBase.js";
import i from "./MatCardHeadline.js";
import a from "./MatCardMedia.js";
import o from "./MatCardSubhead.js";
/* empty css                                                        */
import { computed as s, createBlock as c, createCommentVNode as l, mergeProps as u, openBlock as d, renderSlot as f, unref as p, withCtx as m } from "vue";
var h = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatCard",
	inheritAttrs: !1
}, {
	__name: "MatCard",
	props: {
		variant: {
			type: String,
			default: "filled",
			validator: (e) => [
				"elevated",
				"filled",
				"outlined"
			].includes(e)
		},
		color: {
			type: String,
			default: void 0,
			validator: t
		},
		as: {
			type: String,
			default: "div",
			validator: (e) => [
				"div",
				"article",
				"section",
				"li"
			].includes(e)
		}
	},
	setup(e) {
		let t = e, { colorStyle: h, hasExplicitColor: g } = n(s(() => t.color));
		return (t, n) => (d(), c(r, u(t.$attrs, {
			class: ["mat-card", [`mat-card--${e.variant}`, { "mat-card--explicit-color": p(g) }]],
			style: p(h),
			as: e.as
		}), {
			default: m(() => [
				t.$slots.media ? (d(), c(a, { key: 0 }, {
					default: m(() => [f(t.$slots, "media", {}, void 0, !0)]),
					_: 3
				})) : l("", !0),
				t.$slots.headline ? (d(), c(i, { key: 1 }, {
					default: m(() => [f(t.$slots, "headline", {}, void 0, !0)]),
					_: 3
				})) : l("", !0),
				t.$slots.subhead ? (d(), c(o, { key: 2 }, {
					default: m(() => [f(t.$slots, "subhead", {}, void 0, !0)]),
					_: 3
				})) : l("", !0),
				f(t.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 16, [
			"class",
			"style",
			"as"
		]));
	}
}), [["__scopeId", "data-v-f653741d"]]);
//#endregion
export { h as default };
