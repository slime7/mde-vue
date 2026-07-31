import { shallowRef as e } from "vue";
//#region src/components/dialog-stack.js
var t = e([]), n = null;
function r() {
	if (!n) return;
	let { lockedScrollbarGutter: e, overflow: t, root: r, scrollbarGutter: i } = n;
	r.style.overflow === "hidden" && (r.style.overflow = t), e !== null && r.style.scrollbarGutter === e && (r.style.scrollbarGutter = i), n = null;
}
function i() {
	if (n) return;
	let e = document.documentElement, t = e.clientWidth > 0 ? Math.max(0, window.innerWidth - e.clientWidth) : 0, r = getComputedStyle(e).scrollbarGutter, i = t > 0 && !r.includes("stable");
	n = {
		lockedScrollbarGutter: i ? "stable" : null,
		overflow: e.style.overflow,
		root: e,
		scrollbarGutter: e.style.scrollbarGutter
	}, i && (e.style.scrollbarGutter = n.lockedScrollbarGutter), e.style.overflow = "hidden";
}
function a(e) {
	let n = t.value.filter((e) => e.isConnected);
	if (n.length === 0 && r(), n.includes(e)) {
		t.value = n;
		return;
	}
	t.value = [...n, e], i();
}
function o(e) {
	t.value = t.value.filter((t) => t !== e && t.isConnected), t.value.length === 0 && r();
}
//#endregion
export { t as dialogStack, a as registerDialog, o as unregisterDialog };
