//#region src/components/snackbar-queue.js
var e = [], t = null;
function n() {
	t || e.length === 0 || (t = e.shift(), t.activate());
}
function r(r) {
	r === t || e.includes(r) || (e.push(r), n());
}
function i(t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function a(e) {
	t === e && (t = null, n());
}
//#endregion
export { i as cancelSnackbar, a as completeSnackbar, r as enqueueSnackbar };
