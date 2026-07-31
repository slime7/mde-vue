import { completeSnackbar as e, enqueueSnackbar as t } from "../snackbar-queue.js";
import n from "./ImperativeSnackbarHost.js";
import { h as r, render as i } from "vue";
//#region src/components/mat-snackbar/snackbar.js
var a = [
	"left",
	"center",
	"right"
], o = null;
function s() {
	if (typeof document > "u" || !document.body) throw Error("Snackbar 命令式函数只能在客户端环境中调用");
}
function c(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("snackbar options 必须是对象");
}
function l(e) {
	if (c(e), typeof e.text != "string" || e.text.trim().length === 0) throw TypeError("snackbar text 必须是非空字符串");
	if (e.actionText !== void 0 && (typeof e.actionText != "string" || e.actionText.trim().length === 0)) throw TypeError("snackbar actionText 必须是非空字符串");
	if (e.onAction !== void 0 && typeof e.onAction != "function") throw TypeError("snackbar onAction 必须是函数");
	if (e.closable !== void 0 && typeof e.closable != "boolean") throw TypeError("snackbar closable 必须是 boolean");
	if (e.closeLabel !== void 0 && (typeof e.closeLabel != "string" || e.closeLabel.trim().length === 0)) throw TypeError("snackbar closeLabel 必须是非空字符串");
	if (e.position !== void 0 && !a.includes(e.position)) throw TypeError("snackbar position 无效");
	if (e.duration !== void 0 && (!Number.isFinite(e.duration) || e.duration < 0)) throw TypeError("snackbar duration 必须是大于等于 0 的有限数字");
	return {
		actionText: e.actionText,
		closable: e.closable ?? !1,
		closeLabel: e.closeLabel ?? "关闭",
		duration: e.duration ?? 4e3,
		onAction: e.onAction,
		position: e.position ?? "center",
		text: e.text
	};
}
function u() {
	return o?.isConnected ? o : (o = document.createElement("div"), o.dataset.matSnackbarHost = "", document.body.append(o), o);
}
function d() {
	!o || o.childNodes.length > 0 || (o.remove(), o = null);
}
function f(a) {
	try {
		s();
		let c = l(a);
		return new Promise((a, s) => {
			let l = !1, f;
			function p() {
				if (l) return;
				l = !0;
				let t = o;
				t && i(null, t), a(), e(f), d();
			}
			function m(t) {
				if (l) return;
				l = !0;
				let n = o;
				n && i(null, n), s(t), e(f), d();
			}
			f = { activate() {
				try {
					let e = u();
					i(r(n, {
						onClosed: p,
						options: c
					}), e);
				} catch (e) {
					m(e);
				}
			} }, t(f);
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
var p = f;
//#endregion
export { f as snackbar, p as toast };
