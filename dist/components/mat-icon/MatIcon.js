import e from "../../_virtual/_plugin-vue_export-helper.js";
import t, { DEFAULT_MAT_UI_OPTIONS as n } from "../../mat-ui-context.js";
import { isComponentColor as r } from "../button-props.js";
import { ICON_SIZES as i, isGrade as a, isHtmlTagName as o, isIconSize as s, isOpticalSize as c, isUnitInterval as l, isWeight as u } from "../icon-props.js";
import d from "../use-component-color.js";
/* empty css                                                        */
import { Fragment as f, computed as p, createBlock as m, createElementBlock as h, createTextVNode as g, inject as _, mergeProps as v, openBlock as y, renderSlot as b, resolveDynamicComponent as x, toDisplayString as S, withCtx as C } from "vue";
//#region src/components/mat-icon/MatIcon.vue
var w = ["src"], T = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatIcon",
	inheritAttrs: !1
}, {
	__name: "MatIcon",
	props: {
		icon: {
			type: String,
			default: void 0
		},
		src: {
			type: String,
			default: void 0,
			validator(e) {
				return e === void 0 || e.length > 0;
			}
		},
		size: {
			type: String,
			default: "medium",
			validator: s
		},
		fill: {
			type: Number,
			default: 0,
			validator: l
		},
		weight: {
			type: Number,
			default: 400,
			validator: u
		},
		grade: {
			type: Number,
			default: 0,
			validator: a
		},
		opticalSize: {
			type: Number,
			default: void 0,
			validator: c
		},
		color: {
			type: String,
			default: void 0,
			validator: r
		},
		fontColor: {
			type: String,
			default: void 0
		},
		as: {
			type: String,
			default: "i",
			validator: o
		},
		iconClass: {
			type: String,
			default: void 0
		}
	},
	setup(e) {
		let r = e, a = _(t, n), { colorStyle: o, hasExplicitColor: s } = d(p(() => r.color)), c = p(() => r.iconClass ?? a.iconClass), l = p(() => r.icon !== void 0), u = p(() => i[r.size]?.fontSize ?? r.size), T = p(() => r.opticalSize ?? i[r.size]?.opticalSize ?? 24), E = p(() => ({
			...o.value,
			"--mat-icon-size": u.value,
			color: r.fontColor ?? (s.value ? "var(--mat-accent-color)" : "currentColor"),
			fontVariationSettings: `'FILL' ${r.fill}, 'wght' ${r.weight}, 'GRAD' ${r.grade}, 'opsz' ${T.value}`
		}));
		return (t, n) => (y(), m(x(e.as), v(t.$attrs, {
			class: ["mat-icon", c.value],
			style: E.value
		}), {
			default: C(() => [e.src === void 0 ? l.value ? (y(), h(f, { key: 1 }, [g(S(e.icon), 1)], 64)) : b(t.$slots, "default", { key: 2 }, void 0, !0) : (y(), h("img", {
				key: 0,
				class: "mat-icon__image",
				src: e.src,
				alt: ""
			}, null, 8, w))]),
			_: 3
		}, 16, ["class", "style"]));
	}
}), [["__scopeId", "data-v-a72d28ee"]]);
//#endregion
export { T as default };
