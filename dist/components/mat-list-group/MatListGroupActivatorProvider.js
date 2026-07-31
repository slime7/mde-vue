import { MAT_LIST_GROUP_ACTIVATOR_KEY as e } from "../list-context.js";
import { provide as t, renderSlot as n } from "vue";
//#region src/components/mat-list-group/MatListGroupActivatorProvider.vue
var r = /*@__PURE__*/ Object.assign({ name: "MatListGroupActivatorProvider" }, {
	__name: "MatListGroupActivatorProvider",
	props: { context: {
		type: Object,
		required: !0
	} },
	setup(r) {
		return t(e, r.context), (e, t) => n(e.$slots, "default");
	}
});
//#endregion
export { r as default };
