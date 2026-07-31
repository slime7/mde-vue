//#region src/components/menu-context.js
var e = Symbol("mat-menu"), t = Symbol("mat-menu-item"), n = Symbol("mat-menu-group");
function r(e, t, n) {
	return Math.abs((e.x * (t.y - n.y) + t.x * (n.y - e.y) + n.x * (e.y - t.y)) / 2);
}
function i(e, t, n, i = "right") {
	let a = i === "left" ? n.right : n.left, o = {
		x: a,
		y: n.top
	}, s = {
		x: a,
		y: n.bottom
	}, c = r(t, o, s), l = r(e, o, s), u = r(t, e, s), d = r(t, o, e);
	return Math.abs(c - (l + u + d)) < .5;
}
function a(e) {
	e.forEach((t, n) => {
		e.length === 1 ? t.setPosition("only") : n === 0 ? t.setPosition("first") : n === e.length - 1 ? t.setPosition("last") : t.setPosition("middle");
	});
}
//#endregion
export { n as MAT_MENU_GROUP_KEY, t as MAT_MENU_ITEM_KEY, e as MAT_MENU_KEY, i as isPointInMenuSafeTriangle, a as updateMenuItemPositions };
