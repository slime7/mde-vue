import { MAT_SPLIT_BTN_KEY as e } from "../button-context.js";
import { Fragment as t, createBlock as n, inject as r, isVNode as i, openBlock as a, provide as o, useSlots as s } from "vue";
//#region src/components/mat-split-btn/MatSplitSegment.vue
var c = /*@__PURE__*/ Object.assign({ name: "MatSplitSegment" }, {
	__name: "MatSplitSegment",
	props: { role: {
		type: String,
		required: !0,
		validator(e) {
			return ["leading", "trailing"].includes(e);
		}
	} },
	setup(c) {
		let l = c, u = r(e), d = s();
		o(e, {
			...u,
			role: l.role
		});
		function f(e) {
			return e.flatMap((e) => i(e) && e.type === t && Array.isArray(e.children) ? f(e.children) : [e]);
		}
		function p() {
			return f(d.default?.() ?? []).find((e) => i(e) && (e.type?.name ?? e.type?.__name) === "MatBtn") ?? null;
		}
		return (e, t) => (a(), n(p));
	}
});
//#endregion
export { c as default };
