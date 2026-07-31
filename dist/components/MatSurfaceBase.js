import e from "../_virtual/_plugin-vue_export-helper.js";
/* empty css                                                               */
import { createBlock as t, mergeProps as n, openBlock as r, ref as i, renderSlot as a, resolveDynamicComponent as o, withCtx as s } from "vue";
var c = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatSurfaceBase",
	inheritAttrs: !1
}, {
	__name: "MatSurfaceBase",
	props: { as: {
		type: String,
		default: "div"
	} },
	setup(e, { expose: c }) {
		let l = i(null);
		return c({ root: l }), (i, c) => (r(), t(o(e.as), n({
			ref_key: "root",
			ref: l
		}, i.$attrs, { class: "mat-surface-base" }), {
			default: s(() => [a(i.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-76b082b5"]]);
//#endregion
export { c as default };
