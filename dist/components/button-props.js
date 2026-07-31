//#region src/components/button-props.js
var e = [
	"extra-small",
	"small",
	"medium",
	"large",
	"extra-large"
], t = ["round", "square"], n = [
	"button",
	"submit",
	"reset"
], r = [
	"primary",
	"secondary",
	"tertiary",
	"error"
];
function i(e) {
	return e === void 0 || r.includes(e) || typeof e == "string" && /^#[\da-f]{6}$/i.test(e);
}
//#endregion
export { t as BUTTON_SHAPES, e as BUTTON_SIZES, n as BUTTON_TYPES, r as COMPONENT_COLORS, i as isComponentColor };
