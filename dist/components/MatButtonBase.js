import e from "../_virtual/_plugin-vue_export-helper.js";
import t from "./MatActionBase.js";
/* empty css                                                              */
import { createBlock as n, mergeProps as r, openBlock as i, renderSlot as a, withCtx as o } from "vue";
var s = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatButtonBase",
	inheritAttrs: !1
}, {
	__name: "MatButtonBase",
	props: {
		block: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button"
		},
		ariaPressed: {
			type: Boolean,
			default: void 0
		},
		useCursor: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["click"],
	setup(e, { emit: s }) {
		let c = s;
		return (s, l) => (i(), n(t, r(s.$attrs, {
			class: ["mat-button-base", {
				"mat-button-base--block": e.block,
				"mat-button-base--use-cursor": e.useCursor
			}],
			"aria-pressed": e.ariaPressed,
			disabled: e.disabled,
			type: e.type,
			"pressed-class": "mat-button-base--pressed",
			onClick: l[0] ||= (e) => c("click", e)
		}), {
			default: o(() => [a(s.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"aria-pressed",
			"disabled",
			"type"
		]));
	}
}), [["__scopeId", "data-v-04ffd7cb"]]);
//#endregion
export { s as default };
