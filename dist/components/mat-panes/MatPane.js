import e from "../../_virtual/_plugin-vue_export-helper.js";
import { MAT_PANES_KEY as t } from "../panes-context.js";
/* empty css                                                        */
import { Fragment as n, computed as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, inject as s, mergeProps as c, normalizeClass as l, onBeforeUnmount as u, onMounted as d, openBlock as f, ref as p, renderSlot as m, unref as h, watch as g } from "vue";
//#region src/components/mat-panes/MatPane.vue
var _ = ["id"], v = {
	key: 0,
	class: "mat-pane__separator"
}, y = [
	"aria-controls",
	"aria-label",
	"aria-orientation",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow"
], b = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatPane",
	inheritAttrs: !1
}, {
	__name: "MatPane",
	props: {
		id: {
			type: String,
			required: !0,
			validator(e) {
				return e.length > 0;
			}
		},
		resizeLabel: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let b = e, x = s(t, null), S = p(null), C = r(() => b.resizeLabel), w, T = r(() => x?.getPaneStyle(b.id) ?? { "--mat-pane-weight": 1 }), E = r(() => !!x?.hasBoundary(b.id)), D = r(() => !!x?.isHandleVisible(b.id)), O = r(() => x?.getHandleAttributes(b.id) ?? {}), k = r(() => !!x?.isBoundaryActive(b.id));
		function A() {
			w?.(), w = void 0, x && (w = x.registerPane({
				element: S,
				id: b.id,
				resizeLabel: C
			}));
		}
		return d(A), g(() => b.id, A), u(() => w?.()), (t, r) => (f(), a(n, null, [o("div", c({
			ref_key: "root",
			ref: S
		}, t.$attrs, {
			id: e.id,
			class: "mat-pane",
			style: T.value
		}), [m(t.$slots, "default", {}, void 0, !0)], 16, _), E.value ? (f(), a("div", v, [D.value ? (f(), a("div", {
			key: 0,
			class: l(["mat-pane__handle", { "mat-pane__handle--active": k.value }]),
			role: "separator",
			"aria-controls": O.value["aria-controls"],
			"aria-label": O.value["aria-label"],
			"aria-orientation": O.value["aria-orientation"],
			"aria-valuemax": O.value["aria-valuemax"],
			"aria-valuemin": O.value["aria-valuemin"],
			"aria-valuenow": O.value["aria-valuenow"],
			tabindex: "0",
			onKeydown: r[0] ||= (t) => h(x).handleKeyDown(e.id, t),
			onLostpointercapture: r[1] ||= (t) => h(x).finishPointerInteraction(e.id, t, !1),
			onPointercancel: r[2] ||= (t) => h(x).finishPointerInteraction(e.id, t, !1),
			onPointerdown: r[3] ||= (t) => h(x).handlePointerDown(e.id, t),
			onPointermove: r[4] ||= (t) => h(x).handlePointerMove(e.id, t),
			onPointerup: r[5] ||= (t) => h(x).finishPointerInteraction(e.id, t, !0)
		}, null, 42, y)) : i("", !0)])) : i("", !0)], 64));
	}
}), [["__scopeId", "data-v-7d81b20c"]]);
//#endregion
export { b as default };
