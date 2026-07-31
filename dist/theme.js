import { MAT_COLOR_ROLES as e, MAT_SCHEME_VARIANTS as t, createMaterialScheme as n, normalizeSeedColor as r } from "./material-color.js";
import { readonly as i, ref as a } from "vue";
import { hexFromArgb as o } from "@material/material-color-utilities";
//#region src/theme.js
var s = "#20a6fc", c = "(prefers-color-scheme: dark)";
function l(e) {
	if (![
		"light",
		"dark",
		"system"
	].includes(e)) throw TypeError("theme.mode 必须是 light、dark 或 system");
}
function u(e) {
	if (!t.includes(e)) throw TypeError(`不支持主题配色变体：${String(e)}`);
}
function d(e) {
	if (typeof e != "number" || !Number.isFinite(e) || e < -1 || e > 1) throw RangeError("theme.contrastLevel 必须是 -1 到 1 之间的有限数字");
}
function f(e) {
	if (!e || typeof e != "object" || typeof e.style?.setProperty != "function") throw TypeError("theme.target 必须是可设置 CSS 自定义属性的 HTML 元素");
}
function p(e) {
	if (typeof e != "string" || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(e)) throw TypeError("theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色");
}
function m(t = {}) {
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("theme 选项必须是对象");
	let m = t.mode ?? "system", h = t.seedColor ?? s, g = t.schemeVariant ?? "tonal-spot", _ = t.contrastLevel ?? 0, v = t.target ?? document.documentElement;
	l(m), p(h), u(g), d(_), f(v);
	let y = a(m), b = a(r(h)), x = a(g), S = a(_), C = a("light"), w = null, T = !1, E = !1;
	function D() {
		return !w && typeof window.matchMedia == "function" && (w = window.matchMedia(c)), w;
	}
	function O() {
		return y.value === "system" ? D()?.matches ? "dark" : "light" : y.value;
	}
	function k() {
		C.value = O();
		let t = n({
			seedColor: b.value,
			isDark: C.value === "dark",
			schemeVariant: x.value,
			contrastLevel: S.value
		});
		Object.entries(e).forEach(([e, n]) => {
			v.style.setProperty(`--mat-sys-color-${n}`, o(t[e]));
		}), v.setAttribute?.("data-mat-theme", C.value), v.style.colorScheme = C.value;
	}
	function A(e) {
		y.value === "system" && (C.value = e.matches ? "dark" : "light", k());
	}
	function j() {
		!w || !T || (w.removeEventListener("change", A), T = !1);
	}
	function M() {
		if (j(), y.value !== "system" || E) return;
		let e = D();
		e && (e.addEventListener("change", A), T = !0);
	}
	function N(e) {
		l(e), y.value = e, M(), k();
	}
	function P(e) {
		p(e), b.value = r(e), k();
	}
	function F(e) {
		u(e), x.value = e, k();
	}
	function I(e) {
		d(e), S.value = e, k();
	}
	function L() {
		E = !0, j(), Object.values(e).forEach((e) => {
			v.style.removeProperty(`--mat-sys-color-${e}`);
		}), v.removeAttribute?.("data-mat-theme"), v.style.removeProperty("color-scheme");
	}
	return M(), k(), {
		mode: i(y),
		resolvedMode: i(C),
		seedColor: i(b),
		schemeVariant: i(x),
		contrastLevel: i(S),
		target: v,
		setMode: N,
		setSeedColor: P,
		setSchemeVariant: F,
		setContrastLevel: I,
		dispose: L
	};
}
//#endregion
export { m as default };
