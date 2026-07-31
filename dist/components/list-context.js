//#region src/components/list-context.js
var e = [
	"none",
	"single-action",
	"multi-action",
	"single-select",
	"multi-select"
], t = Symbol("mat-list"), n = Symbol("mat-list-group-activator");
function r(e) {
	return e === "single-select" || e === "multi-select";
}
//#endregion
export { e as LIST_INTERACTIONS, n as MAT_LIST_GROUP_ACTIVATOR_KEY, t as MAT_LIST_KEY, r as isSelectableInteraction };
