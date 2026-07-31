//#region src/components/tooltip-position.js
var e = [
	"top",
	"top-start",
	"top-end",
	"right",
	"right-start",
	"right-end",
	"bottom",
	"bottom-start",
	"bottom-end",
	"left",
	"left-start",
	"left-end"
], t = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function n(e) {
	let t = Number(e.left) || 0, n = Number(e.top) || 0, r = Number.isFinite(Number(e.width)) ? Number(e.width) : Math.max(0, (Number(e.right) || t) - t), i = Number.isFinite(Number(e.height)) ? Number(e.height) : Math.max(0, (Number(e.bottom) || n) - n);
	return {
		bottom: Number.isFinite(Number(e.bottom)) ? Number(e.bottom) : n + i,
		height: i,
		left: t,
		right: Number.isFinite(Number(e.right)) ? Number(e.right) : t + r,
		top: n,
		width: r
	};
}
function r(e, t, n) {
	return e === "start" ? t.left : e === "end" ? t.right - n.width : t.left + (t.width - n.width) / 2;
}
function i(e, t, n) {
	return e === "start" ? t.top : e === "end" ? t.bottom - n.height : t.top + (t.height - n.height) / 2;
}
function a(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function o(e, t, n, r, i) {
	return e === "top" ? t.top - r - i : e === "bottom" ? n.height - t.bottom - r - i : e === "left" ? t.left - r - i : n.width - t.right - r - i;
}
function s(e, t, n, a, o) {
	return e === "top" || e === "bottom" ? {
		left: r(t, n, a),
		top: e === "top" ? n.top - a.height - o : n.bottom + o
	} : {
		left: e === "left" ? n.left - a.width - o : n.right + o,
		top: i(t, n, a)
	};
}
function c(e) {
	return [
		e,
		t[e],
		...[
			"top",
			"right",
			"bottom",
			"left"
		].filter((n) => n !== e && n !== t[e])
	];
}
function l(e, t) {
	return {
		bottom: e.top + t.height,
		left: e.left,
		right: e.left + t.width,
		top: e.top
	};
}
function u(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function d(e, t, r, i, o, c, d, f) {
	let p = s(e, t, r, i, d), m = Math.max(c, o.width - i.width - c), h = Math.max(c, o.height - i.height - c), g = {
		left: a(p.left, c, m),
		top: a(p.top, c, h)
	}, _ = l(g, i);
	return u(_, r) || f.some((e) => u(_, n(e))) ? null : g;
}
function f({ avoidRects: r = [], gap: i = 4, location: l = "top", margin: u = 8, targetRect: f, tooltipRect: p, viewport: m = {
	height: window.innerHeight,
	width: window.innerWidth
} }) {
	let h = n(f), g = n(p), [_, v = "center"] = (e.includes(l) ? l : "top").split("-"), y = v === "start" || v === "end" ? v : "center", b = _ === "top" || _ === "bottom" ? g.height : g.width, x = o(_, h, m, u, i), S = t[_], C = o(S, h, m, u, i), w = b > x && C > x ? S : _, T = Math.max(u, m.width - g.width - u), E = Math.max(u, m.height - g.height - u), D = c(w), O = r.map((e) => n(e)), k = D.find((e) => o(e, h, m, u, i) >= b && d(e, y, h, g, m, u, i, O)) ?? D.find((e) => d(e, y, h, g, m, u, i, O)) ?? w, A = y === "center" ? k : `${k}-${y}`, j = s(k, y, h, g, i);
	return {
		left: Math.round(a(j.left, u, T)),
		location: A,
		top: Math.round(a(j.top, u, E))
	};
}
//#endregion
export { e as TOOLTIP_LOCATIONS, f as getTooltipPosition };
