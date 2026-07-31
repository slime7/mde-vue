import { COMPONENT_COLORS as e, isComponentColor as t } from "./button-props.js";
import { getComponentColorPalette as n } from "../material-color.js";
import r from "../theme-context.js";
import { computed as i, inject as a, unref as o } from "vue";
//#region src/components/use-component-color.js
var s = "tonal-spot", c = 0;
function l(l) {
	let u = a(r, null), d = i(() => o(l) !== void 0);
	return {
		colorStyle: i(() => {
			let r = o(l);
			if (!r || !t(r)) return {};
			if (e.includes(r)) return {
				"--mat-accent-color": `var(--mat-sys-color-${r})`,
				"--mat-on-accent-color": `var(--mat-sys-color-on-${r})`,
				"--mat-accent-container-color": `var(--mat-sys-color-${r}-container)`,
				"--mat-on-accent-container-color": `var(--mat-sys-color-on-${r}-container)`
			};
			let i = n(r, u?.schemeVariant.value ?? s, u?.contrastLevel.value ?? c);
			return {
				"--mat-accent-color": `light-dark(${i.light.primary}, ${i.dark.primary})`,
				"--mat-on-accent-color": `light-dark(${i.light.onPrimary}, ${i.dark.onPrimary})`,
				"--mat-accent-container-color": `light-dark(${i.light.primaryContainer}, ${i.dark.primaryContainer})`,
				"--mat-on-accent-container-color": `light-dark(${i.light.onPrimaryContainer}, ${i.dark.onPrimaryContainer})`
			};
		}),
		hasExplicitColor: d
	};
}
//#endregion
export { l as default };
