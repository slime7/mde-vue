//#region src/components/slider-utils.js
var e = Object.freeze(["horizontal", "vertical"]), t = Object.freeze([
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
]), n = Object.freeze(["standard", "centered"]), r = 12;
function i(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function a(e) {
	return i(e) && e > 0;
}
function o(t) {
	return e.includes(t);
}
function s(e) {
	return t.includes(e);
}
function c(e) {
	return n.includes(e);
}
function l(e) {
	return Array.isArray(e) && e.length === 2 && e.every(i);
}
function u(e) {
	let t = e.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
	if (!t) return 0;
	let n = t[1]?.length ?? 0, r = Number(t[2] ?? 0);
	return Math.max(0, n - r);
}
function d(e, t) {
	return Number(e.toFixed(Math.min(r, t)));
}
function f(e, t) {
	let n = i(e) ? e : 0, r = i(t) ? t : 100;
	return {
		min: n,
		max: r > n ? r : n + 1
	};
}
function p(e) {
	return a(e) ? e : 1;
}
function m(e, t) {
	return Math.min(Math.max(e, t.min), t.max);
}
function h(e, t, n) {
	let r = m(i(e) ? e : t.min, t), a = Math.round((r - t.min) / n), o = Math.max(u(t.min), u(t.max), u(n));
	return d(m(t.min + a * n, t), o);
}
function g(e, t, n) {
	return h(i(e) ? e : (t.min + t.max) / 2, t, n);
}
function _(e, t) {
	return d((m(e, t) - t.min) / (t.max - t.min) * 100, 3);
}
function v(e) {
	return Number(e.toFixed(3)).toString();
}
function y(e) {
	let t = Math.min(Math.max(e, 0), 100), n = v(t), r = d(6 * (1 - t * 2 / 100), 3);
	return t === 0 ? "6px" : t === 100 ? "calc(100% - 6px)" : r === 0 ? `${n}%` : `calc(${n}% ${r > 0 ? "+" : "-"} ${v(Math.abs(r))}px)`;
}
function b(e, t) {
	let n = Math.floor((e.max - e.min) / t), r = Math.max(u(e.min), u(e.max), u(t)), i = Array.from({ length: n + 1 }, (n, i) => d(e.min + i * t, r));
	return i.at(-1) !== e.max && i.push(e.max), i;
}
function x(e, t, n, r, i) {
	let a = t.getBoundingClientRect(), o = i === "vertical" ? e.clientY : e.clientX, s = i === "vertical" ? a.height : a.width;
	if (!Number.isFinite(o) || s <= 0) return;
	let c = i === "vertical" ? a.bottom - o : o - a.left, l = s - 12, u = Math.min(Math.max(l > 0 ? (c - 6) / l : c / s, 0), 1);
	return h(n.min + (n.max - n.min) * u, n, r);
}
function S(e, t, n, r) {
	if (t === "Home") return n.min;
	if (t === "End") return h(n.max, n, r);
	let i = {
		ArrowDown: -1,
		ArrowLeft: -1,
		ArrowRight: 1,
		ArrowUp: 1,
		PageDown: -10,
		PageUp: 10
	}[t];
	if (i !== void 0) return h(e + i * r, n, r);
}
function C(e, t, n, r) {
	let i = h(e, n, r), a = h(t, n, r);
	return i <= a ? [i, a] : [a, i];
}
//#endregion
export { e as SLIDER_ORIENTATIONS, t as SLIDER_SIZES, n as SLIDER_VARIANTS, m as clampSliderValue, v as formatSliderNumber, _ as getSliderPercentage, b as getSliderStopValues, S as getSliderValueFromKeyboard, x as getSliderValueFromPointer, y as getSliderVisualPosition, i as isFiniteNumber, a as isPositiveNumber, l as isRangeSliderModelValue, o as isSliderOrientation, s as isSliderSize, c as isSliderVariant, C as normalizeRangeSliderValue, h as normalizeSliderValue, f as resolveSliderBounds, g as resolveSliderCenter, p as resolveSliderStep };
