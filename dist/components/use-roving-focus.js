import { onBeforeUnmount as e } from "vue";
//#region src/components/use-roving-focus.js
function t(t) {
	let n = /* @__PURE__ */ new Map(), r = null, i, a = !1;
	function o() {
		return t.root.value ? [...t.root.value.querySelectorAll(t.selector)].filter((e) => e instanceof HTMLElement).filter((e) => {
			let r = n.has(e) ? n.get(e) : e.getAttribute("tabindex");
			return r !== null && Number(r) < 0 ? !1 : t.isAvailable?.(e) ?? !0;
		}) : [];
	}
	function s(e) {
		n.has(e) || n.set(e, e.getAttribute("tabindex"));
	}
	function c(e) {
		let t = n.get(e);
		t === null ? e.removeAttribute("tabindex") : t !== void 0 && e.setAttribute("tabindex", t), n.delete(e);
	}
	function l() {
		[...n.keys()].forEach(c), r = null, i?.disconnect(), i = void 0;
	}
	function u() {
		a = !1;
		let e = o(), i = new Set(e);
		[...n.keys()].forEach((e) => {
			i.has(e) || c(e);
		}), (!r || !i.has(r)) && (r = t.findInitial?.(e) ?? e[0] ?? null), e.forEach((e) => {
			s(e), e.setAttribute("tabindex", e === r ? "0" : "-1");
		});
	}
	function d() {
		a || (a = !0, queueMicrotask(u));
	}
	function f(e) {
		e && (r = e, u(), e.focus());
	}
	function p() {
		f(o()[0] ?? null);
	}
	function m() {
		f(o().at(-1) ?? null);
	}
	function h(e, t) {
		let n = o(), r = n.indexOf(e);
		r === -1 || n.length === 0 || f(n[(r + t + n.length) % n.length]);
	}
	function g(e) {
		let t = o();
		e.target instanceof HTMLElement && t.includes(e.target) && (r = e.target, u());
	}
	function _() {
		i?.disconnect(), i = void 0, t.root.value && (i = new MutationObserver(d), i.observe(t.root.value, {
			attributes: !0,
			attributeFilter: t.observedAttributes ?? ["aria-disabled", "disabled"],
			childList: !0,
			subtree: !0
		}), d());
	}
	function v() {
		r = null;
	}
	return e(l), {
		collect: o,
		focusFirst: p,
		focusLast: m,
		handleFocusIn: g,
		move: h,
		observe: _,
		queueRefresh: d,
		refresh: u,
		resetActive: v,
		restore: l
	};
}
//#endregion
export { t as default };
