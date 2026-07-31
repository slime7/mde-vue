//#region src/components/selection-control.js
function e(e) {
	return [
		"string",
		"number",
		"boolean"
	].includes(typeof e);
}
function t(t) {
	return typeof t == "boolean" || Array.isArray(t) && t.every(e);
}
//#endregion
export { t as isCheckboxModelValue, e as isSelectionValue };
