//#region src/components/toolbar-overlay.js
var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), n = 0;
function r(e) {
	let t = Number(e?.left) || 0, n = Number(e?.top) || 0, r = Number.isFinite(Number(e?.width)) ? Number(e.width) : Math.max(0, (Number(e?.right) || t) - t), i = Number.isFinite(Number(e?.height)) ? Number(e.height) : Math.max(0, (Number(e?.bottom) || n) - n);
	return {
		bottom: Number.isFinite(Number(e?.bottom)) ? Number(e.bottom) : n + i,
		height: i,
		left: t,
		right: Number.isFinite(Number(e?.right)) ? Number(e.right) : t + r,
		top: n,
		width: r
	};
}
function i() {
	t.forEach((e) => e());
}
function a() {
	e.forEach((t, n) => {
		t.element.isConnected || e.delete(n);
	});
}
function o(t, r = {}) {
	if (!(t instanceof HTMLElement)) throw TypeError("registerToolbar element 必须是 HTMLElement");
	let a = n;
	n += 1;
	let o = {
		element: t,
		getRect: r.getRect ?? (() => t.getBoundingClientRect()),
		isBottom: r.isBottom ?? (() => !1)
	}, s = !0;
	return e.set(a, o), i(), {
		unregister() {
			s && (s = !1, e.delete(a), i());
		},
		update() {
			s && i();
		}
	};
}
function s() {
	return a(), [...e.values()].flatMap((e) => {
		try {
			return [r(e.getRect())];
		} catch {
			return [];
		}
	});
}
function c(t = window.innerHeight) {
	a();
	let n = Number.isFinite(Number(t)) ? Number(t) : 0;
	return Math.max(0, ...[...e.values()].filter((e) => e.isBottom()).flatMap((e) => {
		try {
			return [Math.max(0, n - r(e.getRect()).top)];
		} catch {
			return [];
		}
	}));
}
function l(e) {
	if (typeof e != "function") throw TypeError("subscribeToolbarOverlay callback 必须是函数");
	return t.add(e), e(), () => {
		t.delete(e);
	};
}
//#endregion
export { c as getBottomToolbarClearance, s as getToolbarRects, o as registerToolbar, l as subscribeToolbarOverlay };
