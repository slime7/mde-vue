//#region src/components/tooltip-stack.js
var e = null, t = /* @__PURE__ */ new WeakMap();
function n(t) {
	e && e !== t && e.close(), e = t;
}
function r(t) {
	e === t && (e = null);
}
function i(e, n) {
	e && t.set(e, {
		owner: n,
		expiresAt: Infinity
	});
}
function a(e, n, r) {
	if (!e) return;
	let i = t.get(e);
	if (!(!i || i.owner !== n)) {
		if (r <= 0) {
			t.delete(e);
			return;
		}
		i.expiresAt = Date.now() + r;
	}
}
function o(e, n) {
	if (!e) return !1;
	let r = t.get(e);
	return !r || r.owner === n ? !1 : r.expiresAt < Date.now() ? (t.delete(e), !1) : !0;
}
//#endregion
export { n as activateTooltip, i as activateTooltipDelayGroup, r as deactivateTooltip, a as leaveTooltipDelayGroup, o as shouldSkipTooltipDelay };
