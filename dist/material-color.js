import { Hct as e, SchemeExpressive as t, SchemeNeutral as n, SchemeTonalSpot as r, SchemeVibrant as i, argbFromHex as a, hexFromArgb as o } from "@material/material-color-utilities";
//#region src/material-color.js
var s = [
	"tonal-spot",
	"neutral",
	"vibrant",
	"expressive"
], c = {
	primary: "primary",
	primaryDim: "primary-dim",
	onPrimary: "on-primary",
	primaryContainer: "primary-container",
	onPrimaryContainer: "on-primary-container",
	primaryFixed: "primary-fixed",
	primaryFixedDim: "primary-fixed-dim",
	onPrimaryFixed: "on-primary-fixed",
	onPrimaryFixedVariant: "on-primary-fixed-variant",
	secondary: "secondary",
	secondaryDim: "secondary-dim",
	onSecondary: "on-secondary",
	secondaryContainer: "secondary-container",
	onSecondaryContainer: "on-secondary-container",
	secondaryFixed: "secondary-fixed",
	secondaryFixedDim: "secondary-fixed-dim",
	onSecondaryFixed: "on-secondary-fixed",
	onSecondaryFixedVariant: "on-secondary-fixed-variant",
	tertiary: "tertiary",
	tertiaryDim: "tertiary-dim",
	onTertiary: "on-tertiary",
	tertiaryContainer: "tertiary-container",
	onTertiaryContainer: "on-tertiary-container",
	tertiaryFixed: "tertiary-fixed",
	tertiaryFixedDim: "tertiary-fixed-dim",
	onTertiaryFixed: "on-tertiary-fixed",
	onTertiaryFixedVariant: "on-tertiary-fixed-variant",
	error: "error",
	errorDim: "error-dim",
	onError: "on-error",
	errorContainer: "error-container",
	onErrorContainer: "on-error-container",
	background: "background",
	onBackground: "on-background",
	surface: "surface",
	surfaceDim: "surface-dim",
	surfaceBright: "surface-bright",
	surfaceContainerLowest: "surface-container-lowest",
	surfaceContainerLow: "surface-container-low",
	surfaceContainer: "surface-container",
	surfaceContainerHigh: "surface-container-high",
	surfaceContainerHighest: "surface-container-highest",
	onSurface: "on-surface",
	surfaceVariant: "surface-variant",
	onSurfaceVariant: "on-surface-variant",
	outline: "outline",
	outlineVariant: "outline-variant",
	inverseSurface: "inverse-surface",
	inverseOnSurface: "inverse-on-surface",
	inversePrimary: "inverse-primary",
	shadow: "shadow",
	scrim: "scrim",
	surfaceTint: "surface-tint"
}, l = {
	"tonal-spot": r,
	neutral: n,
	vibrant: i,
	expressive: t
}, u = [
	"primary",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer"
], d = 64, f = /* @__PURE__ */ new Map();
function p(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
	return e.length === 4 ? `#${[...e.slice(1)].map((e) => e.repeat(2)).join("")}`.toLowerCase() : e.toLowerCase();
}
function m({ seedColor: t, isDark: n, schemeVariant: r, contrastLevel: i }) {
	let o = l[r];
	if (!o) throw TypeError(`不支持主题配色变体：${String(r)}`);
	let s = new o(e.fromInt(a(p(t))), n, i, "2025", "phone");
	if (s.specVersion !== "2025" || s.platform !== "phone") throw Error("Material Color Utilities 未生成请求的 2025 phone 配色");
	return s;
}
function h(e, t) {
	return Object.freeze(Object.fromEntries(t.map((t) => [t, o(e[t])])));
}
function g(e, t = "tonal-spot", n = 0) {
	let r = p(e), i = `${r}|${t}|${n}|2025|phone`, a = f.get(i);
	if (a) return f.delete(i), f.set(i, a), a;
	let o = Object.freeze({
		light: h(m({
			seedColor: r,
			isDark: !1,
			schemeVariant: t,
			contrastLevel: n
		}), u),
		dark: h(m({
			seedColor: r,
			isDark: !0,
			schemeVariant: t,
			contrastLevel: n
		}), u)
	});
	if (f.set(i, o), f.size > d) {
		let e = f.keys().next().value;
		f.delete(e);
	}
	return o;
}
//#endregion
export { c as MAT_COLOR_ROLES, s as MAT_SCHEME_VARIANTS, m as createMaterialScheme, g as getComponentColorPalette, p as normalizeSeedColor, h as readMaterialColors };
