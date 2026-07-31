import e from "../_virtual/_plugin-vue_export-helper.js";
/* empty css                                                             */
import { createBlock as t, mergeProps as n, openBlock as r, ref as i, resolveDynamicComponent as a } from "vue";
var o = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatInputBase",
	inheritAttrs: !1
}, {
	__name: "MatInputBase",
	props: {
		control: {
			type: String,
			required: !0,
			validator(e) {
				return ["input", "textarea"].includes(e);
			}
		},
		modelValue: {
			type: String,
			required: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		maxLength: {
			type: Number,
			default: void 0
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		required: {
			type: Boolean,
			default: !1
		},
		rows: {
			type: Number,
			default: void 0
		},
		type: {
			type: String,
			default: void 0
		}
	},
	emits: { "update:modelValue": (e) => typeof e == "string" },
	setup(e, { expose: o, emit: s }) {
		let c = e, l = s, u = i(null);
		function d(e) {
			l("update:modelValue", e.target.value);
		}
		function f() {
			u.value?.focus();
		}
		function p() {
			return u.value;
		}
		return o({
			focusInput: f,
			getInput: p
		}), (e, i) => (r(), t(a(c.control), n({
			ref_key: "input",
			ref: u
		}, e.$attrs, {
			class: "mat-input-base",
			disabled: c.disabled,
			maxlength: c.maxLength,
			readonly: c.readonly,
			required: c.required,
			rows: c.control === "textarea" ? c.rows : void 0,
			type: c.control === "input" ? c.type : void 0,
			value: c.modelValue,
			onInput: d
		}), null, 16, [
			"disabled",
			"maxlength",
			"readonly",
			"required",
			"rows",
			"type",
			"value"
		]));
	}
}), [["__scopeId", "data-v-55b4fdd2"]]);
//#endregion
export { o as default };
