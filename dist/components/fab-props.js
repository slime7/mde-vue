//#region src/components/fab-props.js
var e = [
	"small",
	"medium",
	"large"
], t = [
	"primary",
	"secondary",
	"tertiary",
	"primary-container",
	"secondary-container",
	"tertiary-container",
	"error",
	"error-container"
], n = [
	"button",
	"submit",
	"reset"
];
function r(e) {
	return typeof e == "string" && t.includes(e);
}
//#endregion
export { t as FAB_COLORS, e as FAB_SIZES, n as FAB_TYPES, r as isFabColor };
