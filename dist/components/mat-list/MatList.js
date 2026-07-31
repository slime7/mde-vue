import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import n from "../use-component-color.js";
import { LIST_INTERACTIONS as r, MAT_LIST_KEY as i, isSelectableInteraction as a } from "../list-context.js";
import o from "../use-roving-focus.js";
import { isSelectionValue as s } from "../selection-control.js";
/* empty css                                                        */
import { computed as c, createBlock as l, mergeProps as u, nextTick as d, onMounted as f, openBlock as p, provide as m, ref as h, renderSlot as g, resolveDynamicComponent as _, unref as v, watch as y, withCtx as b } from "vue";
var x = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatList",
	inheritAttrs: !1
}, {
	__name: "MatList",
	props: {
		variant: {
			type: String,
			default: "segmented",
			validator(e) {
				return ["standard", "segmented"].includes(e);
			}
		},
		interaction: {
			type: String,
			default: "none",
			validator(e) {
				return r.includes(e);
			}
		},
		selected: {
			type: [
				String,
				Number,
				Boolean,
				Array
			],
			default: null
		},
		expanded: {
			type: Array,
			default: () => [],
			validator(e) {
				return e.every(s);
			}
		},
		color: {
			type: String,
			default: void 0,
			validator: t
		}
	},
	emits: {
		select(e) {
			return e && Object.hasOwn(e, "value") && Object.hasOwn(e, "nextSelected") && e.originalEvent instanceof Event;
		},
		"update:expanded"(e) {
			return Array.isArray(e) && e.every(s);
		}
	},
	setup(e, { emit: t }) {
		let r = e, s = t, x = h(null), S = c(() => a(r.interaction)), C = c(() => S.value ? "div" : "ul"), { colorStyle: w } = n(c(() => r.color)), T = [], E = [
			"[data-mat-list-primary]",
			"[data-mat-list-trailing] a[href]",
			"[data-mat-list-trailing] button",
			"[data-mat-list-trailing] input",
			"[data-mat-list-trailing] select",
			"[data-mat-list-trailing] textarea",
			"[data-mat-list-trailing] [contenteditable]:not([contenteditable=\"false\"])",
			"[data-mat-list-trailing] [tabindex]"
		].join(",");
		function D(e) {
			return r.interaction === "multi-select" ? Array.isArray(r.selected) && r.selected.some((t) => Object.is(t, e)) : r.interaction === "single-select" && Object.is(r.selected, e);
		}
		function O(e, t) {
			if (e === void 0) {
				console.warn("MatList: 选择模式下的 MatListItem 必须提供 value");
				return;
			}
			let n = D(e);
			if (r.interaction === "single-select") {
				if (n) return;
				s("select", {
					value: e,
					selected: !0,
					nextSelected: e,
					originalEvent: t
				});
				return;
			}
			if (r.interaction === "multi-select") {
				let i = Array.isArray(r.selected) ? r.selected : [];
				s("select", {
					value: e,
					selected: !n,
					nextSelected: n ? i.filter((t) => !Object.is(t, e)) : [...i, e],
					originalEvent: t
				});
			}
		}
		function k(e) {
			return r.expanded.some((t) => Object.is(t, e));
		}
		function A(e, t) {
			k(e) !== t && s("update:expanded", t ? [...r.expanded, e] : r.expanded.filter((t) => !Object.is(t, e)));
		}
		function j(e, t) {
			T.some((n) => n.token !== e && Object.is(n.value, t)) && console.warn(`MatListGroup: 同一 MatList 中的 value 必须唯一，重复值为 ${String(t)}`), T.push({
				token: e,
				value: t
			});
		}
		function M(e) {
			let t = T.findIndex((t) => t.token === e);
			t !== -1 && T.splice(t, 1);
		}
		function N(e) {
			return !(e instanceof HTMLElement) || e.closest("[data-mat-list-disabled=\"true\"]") || e.closest("[data-mat-list-group-content][inert]") || e.matches(":disabled") || e.getAttribute("aria-disabled") === "true" ? !1 : e.hasAttribute("data-mat-list-group-activator") ? !0 : !e.hasAttribute("data-mat-list-primary") && r.interaction !== "multi-action" ? !1 : r.interaction !== "none";
		}
		function P(e) {
			if (S.value) {
				let t = e.find((e) => e.getAttribute("aria-selected") === "true");
				if (t) return t;
			}
			return e[0] ?? null;
		}
		let F = o({
			root: x,
			selector: E,
			isAvailable: N,
			findInitial: P,
			observedAttributes: [
				"aria-disabled",
				"aria-hidden",
				"disabled",
				"href",
				"inert"
			]
		});
		function I(e) {
			let t = {
				ArrowDown: 1,
				ArrowRight: 1,
				ArrowUp: -1,
				ArrowLeft: -1
			}[e.key];
			t === void 0 || !(e.target instanceof HTMLElement) || (e.preventDefault(), F.move(e.target, t));
		}
		return m(i, {
			interaction: c(() => r.interaction),
			isSelectable: S,
			variant: c(() => r.variant),
			isGroupExpanded: k,
			isSelected: D,
			registerGroupValue: j,
			requestFocusRefresh: F.queueRefresh,
			requestGroupExpanded: A,
			requestSelection: O,
			unregisterGroupValue: M
		}), f(F.observe), y(x, async () => {
			F.restore(), await d(), F.observe();
		}), y(() => r.interaction, async () => {
			F.restore(), await d(), F.observe();
		}), y(() => r.selected, async () => {
			x.value?.contains(document.activeElement) || F.resetActive(), await d(), F.queueRefresh();
		}, { deep: !0 }), (t, n) => (p(), l(_(C.value), u({
			ref_key: "root",
			ref: x
		}, t.$attrs, {
			class: ["mat-list", `mat-list--${e.variant}`],
			style: v(w),
			"aria-multiselectable": e.interaction === "multi-select" ? "true" : t.$attrs["aria-multiselectable"],
			"aria-orientation": S.value ? "vertical" : t.$attrs["aria-orientation"],
			role: S.value ? "listbox" : t.$attrs.role,
			onFocusin: v(F).handleFocusIn,
			onKeydown: I
		}), {
			default: b(() => [g(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-multiselectable",
			"aria-orientation",
			"role",
			"onFocusin"
		]));
	}
}), [["__scopeId", "data-v-d4055dce"]]);
//#endregion
export { x as default };
