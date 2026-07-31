import e from "../../_virtual/_plugin-vue_export-helper.js";
/* empty css                                                             */
import { createElementBlock as t, createElementVNode as n, mergeProps as r, openBlock as i, renderSlot as a } from "vue";
//#region src/components/mat-container/MatContainer.vue
var o = { class: "mat-container__content" }, s = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatContainer",
	inheritAttrs: !1
}, {
	__name: "MatContainer",
	props: { fluid: {
		type: Boolean,
		default: !1
	} },
	setup(e) {
		let s = e;
		return (e, c) => (i(), t("div", r(e.$attrs, { class: ["mat-container", { "mat-container--fluid": s.fluid }] }), [n("div", o, [a(e.$slots, "default", {}, void 0, !0)])], 16));
	}
}), [["__scopeId", "data-v-f98574ca"]]);
//#endregion
export { s as default };
