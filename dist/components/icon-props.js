//#region src/components/icon-props.js
var e = Object.freeze({
	small: {
		fontSize: "20px",
		opticalSize: 20
	},
	medium: {
		fontSize: "24px",
		opticalSize: 24
	},
	large: {
		fontSize: "40px",
		opticalSize: 40
	},
	"extra-large": {
		fontSize: "48px",
		opticalSize: 48
	}
}), t = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;
function n(n) {
	return typeof n == "string" && (Object.hasOwn(e, n) || t.test(n));
}
function r(e) {
	return typeof e == "string" && /^[a-z][\w-]*$/i.test(e);
}
function i(e) {
	return typeof e == "number" && e >= 0 && e <= 1;
}
function a(e) {
	return typeof e == "number" && e >= 100 && e <= 700;
}
function o(e) {
	return typeof e == "number" && e >= -50 && e <= 200;
}
function s(e) {
	return e === void 0 || typeof e == "number" && e >= 20 && e <= 48;
}
//#endregion
export { e as ICON_SIZES, o as isGrade, r as isHtmlTagName, n as isIconSize, s as isOpticalSize, i as isUnitInterval, a as isWeight };
