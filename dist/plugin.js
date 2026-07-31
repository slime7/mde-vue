import e, { DEFAULT_MAT_UI_OPTIONS as t, DEFAULT_TOOLTIP_OPTIONS as n } from "./mat-ui-context.js";
import r from "./theme-context.js";
import i from "./components/mat-icon/MatIcon.js";
import a from "./components/mat-hover/MatHover.js";
import o from "./components/mat-tooltip/MatTooltip.js";
import s from "./components/mat-btn/MatBtn.js";
import c from "./components/mat-btn-group/MatBtnGroup.js";
import l from "./components/mat-fab/MatFab.js";
import u from "./components/mat-split-btn/MatSplitBtn.js";
import d from "./components/mat-card/MatCardHeadline.js";
import f from "./components/mat-card/MatCardMedia.js";
import p from "./components/mat-card/MatCardSubhead.js";
import m from "./components/mat-card/MatCard.js";
import h from "./components/mat-card/MatCardActionArea.js";
import g from "./components/mat-card/MatCardContent.js";
import _ from "./components/mat-card/MatCardActions.js";
import v from "./components/mat-list/MatList.js";
import y from "./components/mat-list/MatListItem.js";
import b from "./components/mat-list-group/MatListGroup.js";
import x from "./components/mat-divider/MatDivider.js";
import S from "./components/mat-checkbox/MatCheckbox.js";
import C from "./components/mat-radio/MatRadio.js";
import w from "./components/mat-radio-group/MatRadioGroup.js";
import T from "./components/mat-switch/MatSwitch.js";
import E from "./components/mat-slider/MatSlider.js";
import D from "./components/mat-range-slider/MatRangeSlider.js";
import O from "./components/MatInputBase.js";
import k from "./components/mat-text-field/MatTextField.js";
import A from "./components/mat-textarea/MatTextarea.js";
import ee from "./components/mat-menu/MatMenu.js";
import j from "./components/mat-menu-group/MatMenuGroup.js";
import M from "./components/mat-menu/MatMenuItem.js";
import N from "./components/mat-dialog/MatDialog.js";
import P from "./components/mat-bottom-sheet/MatBottomSheet.js";
import F from "./components/mat-side-sheet/MatSideSheet.js";
import I from "./components/mat-container/MatContainer.js";
import L from "./components/mat-spacer/MatSpacer.js";
import R from "./components/mat-loader/MatLoader.js";
import z from "./components/mat-snackbar/MatSnackbar.js";
import B from "./components/mat-toolbar/MatToolbar.js";
import V from "./components/mat-panes/MatPanes.js";
import H from "./components/mat-panes/MatPane.js";
import U from "./components/mat-navigation-rail/MatNavigationRail.js";
import W from "./components/mat-navigation-rail/MatNavigationRailItem.js";
import { Intersection as G } from "./directives/intersection/index.js";
import { setImperativeContext as K } from "./imperative-context.js";
import q from "./theme.js";
import { inject as J } from "vue";
//#region src/plugin.js
var Y = [
	[
		"MatBtn",
		"mat-btn",
		s
	],
	[
		"MatBtnGroup",
		"mat-btn-group",
		c
	],
	[
		"MatFab",
		"mat-fab",
		l
	],
	[
		"MatIcon",
		"mat-icon",
		i
	],
	[
		"MatSplitBtn",
		"mat-split-btn",
		u
	],
	[
		"MatCard",
		"mat-card",
		m
	],
	[
		"MatCardActionArea",
		"mat-card-action-area",
		h
	],
	[
		"MatCardContent",
		"mat-card-content",
		g
	],
	[
		"MatCardActions",
		"mat-card-actions",
		_
	],
	[
		"MatCardHeadline",
		"mat-card-headline",
		d
	],
	[
		"MatCardSubhead",
		"mat-card-subhead",
		p
	],
	[
		"MatCardMedia",
		"mat-card-media",
		f
	],
	[
		"MatList",
		"mat-list",
		v
	],
	[
		"MatListGroup",
		"mat-list-group",
		b
	],
	[
		"MatListItem",
		"mat-list-item",
		y
	],
	[
		"MatDivider",
		"mat-divider",
		x
	],
	[
		"MatCheckbox",
		"mat-checkbox",
		S
	],
	[
		"MatRadio",
		"mat-radio",
		C
	],
	[
		"MatRadioGroup",
		"mat-radio-group",
		w
	],
	[
		"MatSwitch",
		"mat-switch",
		T
	],
	[
		"MatSlider",
		"mat-slider",
		E
	],
	[
		"MatRangeSlider",
		"mat-range-slider",
		D
	],
	[
		"MatTextField",
		"mat-text-field",
		k
	],
	[
		"MatTextarea",
		"mat-textarea",
		A
	],
	[
		"MatInputBase",
		"mat-input-base",
		O
	],
	[
		"MatMenu",
		"mat-menu",
		ee
	],
	[
		"MatMenuGroup",
		"mat-menu-group",
		j
	],
	[
		"MatMenuItem",
		"mat-menu-item",
		M
	],
	[
		"MatDialog",
		"mat-dialog",
		N
	],
	[
		"MatBottomSheet",
		"mat-bottom-sheet",
		P
	],
	[
		"MatSideSheet",
		"mat-side-sheet",
		F
	],
	[
		"MatHover",
		"mat-hover",
		a
	],
	[
		"MatContainer",
		"mat-container",
		I
	],
	[
		"MatSpacer",
		"mat-spacer",
		L
	],
	[
		"MatLoader",
		"mat-loader",
		R
	],
	[
		"MatTooltip",
		"mat-tooltip",
		o
	],
	[
		"MatSnackbar",
		"mat-snackbar",
		z
	],
	[
		"MatToolbar",
		"mat-toolbar",
		B
	],
	[
		"MatPanes",
		"mat-panes",
		V
	],
	[
		"MatPane",
		"mat-pane",
		H
	],
	[
		"MatNavigationRail",
		"mat-navigation-rail",
		U
	],
	[
		"MatNavigationRailItem",
		"mat-navigation-rail-item",
		W
	]
];
function X(e, t) {
	let n = e[t];
	if (n !== void 0 && typeof n != "boolean") throw TypeError(`createMatUi ${t} 必须是 boolean`);
	return n ?? !1;
}
function Z(e) {
	let n = e.iconClass;
	if (n !== void 0 && typeof n != "string") throw TypeError("createMatUi iconClass 必须是 string");
	return n ?? t.iconClass;
}
function Q(e, t) {
	let r = e[t];
	if (r === void 0) return n[t];
	if (typeof r != "number") throw TypeError(`createMatUi tooltip.${t} 必须是 number`);
	if (!Number.isFinite(r) || r < 0) throw RangeError(`createMatUi tooltip.${t} 必须是非负有限数字`);
	return r;
}
function $(e) {
	let t = e.tooltip;
	if (t === void 0) return n;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi tooltip 必须是对象");
	return Object.freeze({
		openDelay: Q(t, "openDelay"),
		skipDelayDuration: Q(t, "skipDelayDuration")
	});
}
function te(t = {}) {
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("createMatUi 选项必须是对象");
	let n = Object.freeze({
		iconClass: Z(t),
		tooltip: $(t),
		useCursor: X(t, "useCursor")
	}), i = q(t.theme);
	return {
		theme: i,
		install(t) {
			Y.forEach(([e, n, r]) => {
				t.component(e, r), t.component(n, r);
			}), t.directive("intersection", G), t.provide(e, n), t.provide(r, i), K(n, i);
		}
	};
}
function ne() {
	let e = J(r, null);
	if (!e) throw Error("useMatTheme() 必须在已安装 mdu-ui 插件的 Vue 应用中调用");
	return e;
}
//#endregion
export { te as createMatUi, ne as useMatTheme };
