import e from "../MatSheetBase.js";
import { createBlock as t, createSlots as n, mergeProps as r, openBlock as i, renderSlot as a, withCtx as o } from "vue";
//#region src/components/mat-bottom-sheet/MatBottomSheet.vue
var s = /*@__PURE__*/ Object.assign({
	name: "MatBottomSheet",
	inheritAttrs: !1
}, {
	__name: "MatBottomSheet",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		variant: {
			type: String,
			default: "auto",
			validator: (e) => [
				"auto",
				"standard",
				"modal"
			].includes(e)
		},
		breakpoint: {
			type: Number,
			default: 840,
			validator: (e) => Number.isFinite(e) && e > 0
		},
		width: {
			type: [Number, String],
			default: void 0,
			validator(e) {
				return typeof e == "number" ? Number.isFinite(e) && e > 0 : typeof e == "string" && e.trim().length > 0;
			}
		},
		attach: {
			type: [String, Object],
			default: "body"
		},
		scrim: {
			type: Boolean,
			default: !0
		},
		closeOnBack: {
			type: Boolean,
			default: !0
		},
		dragHandle: {
			type: Boolean,
			default: !0
		},
		collapseDragHandleLabel: {
			type: String,
			default: "折叠底部面板"
		},
		expanded: {
			type: Boolean,
			default: !1
		},
		dragHandleLabel: {
			type: String,
			default: "展开底部面板"
		},
		expandedDragHandleLabel: {
			type: String,
			default: "关闭底部面板"
		},
		draggable: {
			type: Boolean,
			default: !0
		},
		closable: {
			type: Boolean,
			default: !1
		},
		closeLabel: {
			type: String,
			default: "关闭"
		},
		title: {
			type: String,
			default: void 0
		},
		content: {
			type: String,
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		"update:expanded": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(s, { emit: c }) {
		let l = s, u = c;
		return (s, c) => (i(), t(e, r(l, {
			"component-name": "MatBottomSheet",
			direction: "bottom",
			"onUpdate:modelValue": c[0] ||= (e) => u("update:modelValue", e),
			"onUpdate:expanded": c[1] ||= (e) => u("update:expanded", e),
			onOpened: c[2] ||= (e) => u("opened"),
			onClosed: c[3] ||= (e) => u("closed")
		}), n({ _: 2 }, [
			s.$slots.activator ? {
				name: "activator",
				fn: o(() => [a(s.$slots, "activator")]),
				key: "0"
			} : void 0,
			s.$slots["drag-handle"] ? {
				name: "drag-handle",
				fn: o(() => [a(s.$slots, "drag-handle")]),
				key: "1"
			} : void 0,
			s.$slots.header ? {
				name: "header",
				fn: o(() => [a(s.$slots, "header")]),
				key: "2"
			} : void 0,
			s.$slots.title ? {
				name: "title",
				fn: o(() => [a(s.$slots, "title")]),
				key: "3"
			} : void 0,
			s.$slots.default ? {
				name: "default",
				fn: o(() => [a(s.$slots, "default")]),
				key: "4"
			} : void 0,
			s.$slots.actions ? {
				name: "actions",
				fn: o(() => [a(s.$slots, "actions")]),
				key: "5"
			} : void 0,
			s.$slots.footer ? {
				name: "footer",
				fn: o(() => [a(s.$slots, "footer")]),
				key: "6"
			} : void 0
		]), 1040));
	}
});
//#endregion
export { s as default };
