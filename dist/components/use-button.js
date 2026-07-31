import e, { DEFAULT_MAT_UI_OPTIONS as t } from "../mat-ui-context.js";
import n from "./use-component-color.js";
import { MAT_BTN_GROUP_KEY as r, MAT_SPLIT_BTN_KEY as i } from "./button-context.js";
import { computed as a, inject as o } from "vue";
//#region src/components/use-button.js
function s(s, c) {
	let l = o(e, t), u = o(r, null), d = o(i, null), f = a(() => d?.size.value ?? s.size ?? u?.size.value ?? "small"), p = a(() => d ? "round" : s.shape ?? u?.shape.value ?? "round"), m = a(() => d?.variant.value ?? s.variant), h = a(() => d?.color.value ?? s.color ?? u?.color.value), g = a(() => s.disabled || !!d?.disabled.value || !!u?.disabled.value), _ = a(() => !!(u && u.selection.value !== "none")), v = a(() => d?.role === "trailing" ? d.expanded.value : _.value ? u.isSelected(s.value) : s.selected), y = a(() => d?.role === "trailing" || _.value || s.toggle), { colorStyle: b, hasExplicitColor: x } = n(h);
	function S(e) {
		_.value && u.requestSelection(s.value, e), c("click", e);
	}
	return {
		colorStyle: b,
		effectiveColor: h,
		effectiveDisabled: g,
		effectiveSelected: v,
		effectiveShape: p,
		effectiveSize: f,
		effectiveToggle: y,
		effectiveVariant: m,
		group: u,
		handleClick: S,
		hasExplicitColor: x,
		split: d,
		useCursor: l.useCursor
	};
}
//#endregion
export { s as default };
