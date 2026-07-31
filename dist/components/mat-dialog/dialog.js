import { isComponentColor as e } from "../button-props.js";
import t from "./ImperativeDialogHost.js";
import { h as n, render as r } from "vue";
//#region src/components/mat-dialog/dialog.js
var i = [
	"elevated",
	"filled",
	"filled-tonal",
	"outlined",
	"standard",
	"text"
], a = [
	"fullScreen",
	"scrim",
	"closeOnBack"
], o = [
	"title",
	"content",
	"icon",
	"closeLabel",
	"ariaLabel"
];
function s(e) {
	return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
}
function c() {
	if (typeof window > "u" || typeof document > "u") throw Error("Dialog 命令式函数只能在客户端环境中调用");
}
function l(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("dialog options 必须是对象");
}
function u(e) {
	let t = e ?? "body", n = null;
	if (typeof t == "string") try {
		n = document.querySelector(t);
	} catch {
		throw TypeError("dialog attach 必须是有效的 CSS 选择器或 HTMLElement");
	}
	else if (t instanceof HTMLElement && t.ownerDocument === document) n = t;
	else throw TypeError("dialog attach 必须是有效的 CSS 选择器或 HTMLElement");
	if (!n) throw TypeError("dialog attach 未找到目标元素");
	return n;
}
function d(t) {
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("dialog action 必须是对象");
	if (typeof t.text != "string" || t.text.trim().length === 0) throw TypeError("dialog action text 必须是非空字符串");
	if (t.variant !== void 0 && !i.includes(t.variant)) throw TypeError("dialog action variant 无效");
	if (t.color !== void 0 && !e(t.color)) throw TypeError("dialog action color 无效");
	if (t.disabled !== void 0 && typeof t.disabled != "boolean") throw TypeError("dialog action disabled 必须是 boolean");
	return {
		...t,
		disabled: t.disabled ?? !1,
		text: t.text,
		variant: t.variant ?? "text"
	};
}
function f(t) {
	if (l(t), a.forEach((e) => {
		if (t[e] !== void 0 && typeof t[e] != "boolean") throw TypeError(`dialog ${e} 必须是 boolean`);
	}), o.forEach((e) => {
		if (t[e] !== void 0 && typeof t[e] != "string") throw TypeError(`dialog ${e} 必须是 string`);
	}), t.closeLabel !== void 0 && t.closeLabel.trim().length === 0) throw TypeError("dialog closeLabel 必须是非空字符串");
	if (t.color !== void 0 && !e(t.color)) throw TypeError("dialog color 无效");
	if (t.width !== void 0 && !s(t.width)) throw TypeError("dialog width 无效");
	if (t.actions !== void 0 && !Array.isArray(t.actions)) throw TypeError("dialog actions 必须是数组");
	let n = {
		actions: (t.actions ?? [{
			text: "确定",
			value: void 0
		}]).map(d),
		attach: u(t.attach)
	};
	return [
		...a,
		...o,
		"color",
		"width"
	].forEach((e) => {
		t[e] !== void 0 && (n[e] = t[e]);
	}), t.promptConfig && (n.promptConfig = t.promptConfig), n;
}
function p(e, i) {
	try {
		c();
		let a = f(e);
		return new Promise((e, o) => {
			let s = document.createElement("div");
			s.dataset.matDialogHost = "", document.body.append(s);
			try {
				r(n(t, {
					cancelValue: i,
					options: a,
					onClosed(t) {
						r(null, s), s.remove(), e(t);
					}
				}), s);
			} catch (e) {
				r(null, s), s.remove(), o(e);
			}
		});
	} catch (e) {
		return Promise.reject(e);
	}
}
function m(e = {}) {
	return p(e, void 0);
}
function h(e = {}) {
	try {
		if (l(e), e.confirmText !== void 0 && (typeof e.confirmText != "string" || e.confirmText.trim().length === 0)) throw TypeError("alert confirmText 必须是非空字符串");
		return p({
			...e,
			actions: [{
				text: e.confirmText ?? "确定",
				value: void 0
			}]
		}, void 0);
	} catch (e) {
		return Promise.reject(e);
	}
}
function g(e = {}) {
	try {
		l(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消";
		if (typeof t != "string" || t.trim().length === 0) throw TypeError("confirm confirmText 必须是非空字符串");
		if (typeof n != "string" || n.trim().length === 0) throw TypeError("confirm cancelText 必须是非空字符串");
		return p({
			...e,
			actions: [{
				text: n,
				value: !1
			}, {
				text: t,
				value: !0
			}]
		}, !1);
	} catch (e) {
		return Promise.reject(e);
	}
}
function _(e = {}) {
	try {
		l(e);
		let t = e.confirmText ?? "确定", n = e.cancelText ?? "取消", r = e.defaultValue ?? "", i = e.required ?? !1;
		if ([
			[
				"confirmText",
				t,
				!0
			],
			[
				"cancelText",
				n,
				!0
			],
			[
				"defaultValue",
				r,
				!1
			],
			[
				"label",
				e.label,
				!1
			],
			[
				"placeholder",
				e.placeholder,
				!1
			]
		].forEach(([e, t, n]) => {
			if (t !== void 0 && (typeof t != "string" || n && t.trim().length === 0)) throw TypeError(`prompt ${e} 必须是${n ? "非空" : ""}字符串`);
		}), typeof i != "boolean") throw TypeError("prompt required 必须是 boolean");
		return p({
			...e,
			actions: [{
				text: n,
				value: null
			}, {
				text: t,
				value: void 0
			}],
			promptConfig: {
				defaultValue: r,
				label: e.label,
				placeholder: e.placeholder,
				required: i
			}
		}, null);
	} catch (e) {
		return Promise.reject(e);
	}
}
//#endregion
export { h as alert, g as confirm, m as dialog, _ as prompt };
