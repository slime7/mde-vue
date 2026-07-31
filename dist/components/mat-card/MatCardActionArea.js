import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatActionBase.js";
import n, { DEFAULT_MAT_UI_OPTIONS as r } from "../../mat-ui-context.js";
import { BUTTON_TYPES as i } from "../button-props.js";
/* empty css                                                                  */
import { createBlock as a, createElementVNode as o, inject as s, mergeProps as c, openBlock as l, renderSlot as u, unref as d, withCtx as f } from "vue";
//#region src/components/mat-card/MatCardActionArea.vue
var p = { class: "mat-card-action-area__content" }, m = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatCardActionArea",
	inheritAttrs: !1
}, {
	__name: "MatCardActionArea",
	props: {
		href: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator: (e) => i.includes(e)
		}
	},
	emits: { click(e) {
		return e instanceof MouseEvent;
	} },
	setup(e, { emit: i }) {
		let m = i, h = s(n, r);
		return (n, r) => (l(), a(t, c(n.$attrs, {
			class: "mat-card-action-area",
			disabled: e.disabled,
			"focus-ring": !1,
			href: e.href,
			type: e.type,
			"use-cursor": d(h).useCursor,
			onClick: r[0] ||= (e) => m("click", e)
		}), {
			default: f(() => [o("span", p, [u(n.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 16, [
			"disabled",
			"href",
			"type",
			"use-cursor"
		]));
	}
}), [["__scopeId", "data-v-9945853d"]]);
//#endregion
export { m as default };
