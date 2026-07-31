import e from "../../mat-ui-context.js";
import t from "../../theme-context.js";
import n from "../snackbar-context.js";
import r from "./MatSnackbar.js";
import { getImperativeComponentOptions as i, getImperativeTheme as a } from "../../imperative-context.js";
import { computed as o, createBlock as s, mergeProps as c, openBlock as l, provide as u, ref as d } from "vue";
//#region src/components/mat-snackbar/ImperativeSnackbarHost.vue
var f = /*@__PURE__*/ Object.assign({ name: "MatImperativeSnackbarHost" }, {
	__name: "ImperativeSnackbarHost",
	props: {
		options: {
			type: Object,
			required: !0
		},
		onClosed: {
			type: Function,
			required: !0
		}
	},
	setup(f) {
		let p = f;
		u(e, i()), u(n, !0);
		let m = a();
		m && u(t, m);
		let h = d(!0), g = o(() => {
			let e = { ...p.options };
			return delete e.onAction, e;
		});
		function _() {
			p.onClosed();
		}
		function v() {
			p.options.onAction?.();
		}
		return (e, t) => (l(), s(r, c({
			modelValue: h.value,
			"onUpdate:modelValue": t[0] ||= (e) => h.value = e
		}, g.value, {
			onAction: v,
			onClosed: _
		}), null, 16, ["modelValue"]));
	}
});
//#endregion
export { f as default };
