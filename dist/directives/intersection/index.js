//#region src/directives/intersection/index.js
var e = /* @__PURE__ */ new WeakMap();
function t(e) {
	return typeof e == "function" ? {
		handler: e,
		options: {}
	} : e && typeof e == "object" ? {
		handler: e.handler,
		options: e.options ?? {}
	} : { options: {} };
}
function n(n, r) {
	if (typeof IntersectionObserver > "u") return;
	let { handler: i, options: a } = t(r.value), o = new IntersectionObserver((t, r) => {
		let a = e.get(n);
		if (!a || a.observer !== r) return;
		let o = t.some((e) => e.isIntersecting), s = !a.initialized;
		a.initialized = !0, i && !(a.quiet && s) && i(o, t, r), a.once && o && (r.unobserve(n), e.delete(n));
	}, a);
	e.set(n, {
		handler: i,
		observer: o,
		once: !!r.modifiers?.once,
		quiet: !!r.modifiers?.quiet,
		initialized: !1
	}), o.observe(n);
}
function r(t) {
	let n = e.get(t);
	n && (n.observer.unobserve(t), e.delete(t));
}
var i = {
	mounted: n,
	updated(t, i) {
		e.has(t) && (r(t), n(t, i));
	},
	unmounted: r
};
//#endregion
export { i as Intersection, i as default };
