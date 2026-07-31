import { DEFAULT_MAT_UI_OPTIONS as e } from "./mat-ui-context.js";
//#region src/imperative-context.js
var t = e, n = null;
function r(e, r) {
	t = e, n = r;
}
function i() {
	return t;
}
function a() {
	return n;
}
//#endregion
export { i as getImperativeComponentOptions, a as getImperativeTheme, r as setImperativeContext };
