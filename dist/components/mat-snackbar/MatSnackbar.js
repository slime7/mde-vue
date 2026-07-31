import e from "../../_virtual/_plugin-vue_export-helper.js";
import t from "../MatActionBase.js";
import n, { DEFAULT_MAT_UI_OPTIONS as ee } from "../../mat-ui-context.js";
import te from "../mat-icon/MatIcon.js";
import { getBottomToolbarClearance as ne, subscribeToolbarOverlay as re } from "../toolbar-overlay.js";
import ie from "../snackbar-context.js";
import { cancelSnackbar as r, completeSnackbar as i, enqueueSnackbar as ae } from "../snackbar-queue.js";
/* empty css                                                            */
import { Fragment as oe, Teleport as se, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as ce, createTextVNode as l, createVNode as le, inject as u, mergeProps as d, nextTick as ue, onBeforeUnmount as de, onMounted as fe, openBlock as f, ref as p, renderSlot as m, toDisplayString as h, unref as g, useSlots as pe, watch as _, withCtx as v } from "vue";
//#region src/components/mat-snackbar/MatSnackbar.vue
var y = { class: "mat-snackbar__text" }, me = {
	key: 0,
	class: "mat-snackbar__controls"
}, b = {
	key: 0,
	class: "mat-snackbar__action"
}, he = {
	key: 1,
	class: "mat-snackbar__close"
}, x = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatSnackbar",
	inheritAttrs: !1
}, {
	__name: "MatSnackbar",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		text: {
			type: String,
			default: void 0
		},
		actionText: {
			type: String,
			default: void 0,
			validator(e) {
				return typeof e == "string" && e.trim().length > 0;
			}
		},
		closable: {
			type: Boolean,
			default: !1
		},
		closeLabel: {
			type: String,
			default: "关闭",
			validator(e) {
				return typeof e == "string" && e.trim().length > 0;
			}
		},
		position: {
			type: String,
			default: "center",
			validator(e) {
				return [
					"left",
					"center",
					"right"
				].includes(e);
			}
		},
		duration: {
			type: Number,
			default: 4e3,
			validator(e) {
				return Number.isFinite(e) && e >= 0;
			}
		}
	},
	emits: {
		action: () => !0,
		"update:modelValue": (e) => typeof e == "boolean",
		closed: () => !0
	},
	setup(e, { emit: x }) {
		let S = e, C = x, w = pe(), T = u(n, ee), E = u(ie, !1), D = p(!1), O = p("closed"), k = p(!1), A = a(() => !!w.default || typeof S.text == "string" && S.text.trim().length > 0), j = a(() => !!w.action || typeof S.actionText == "string" && S.actionText.trim().length > 0), M = a(() => !!w.close || S.closable), N = a(() => j.value || M.value), P = p(0), F = a(() => typeof S.closeLabel == "string" && S.closeLabel.trim().length > 0 ? S.closeLabel : "关闭"), I = !1, L, R, z = !1, B = null, ge = a(() => ({ "--mat-snackbar-toolbar-clearance": `${P.value}px` }));
		function V() {
			P.value = ne();
		}
		let H = { activate: Q };
		function U() {
			L !== void 0 && (window.clearTimeout(L), L = void 0);
		}
		function W() {
			R !== void 0 && (window.clearTimeout(R), R = void 0);
		}
		function _e() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function G(e, t) {
			if (W(), _e()) {
				t();
				return;
			}
			R = window.setTimeout(() => {
				R = void 0, t();
			}, e);
		}
		function ve() {
			return Number.isFinite(S.duration) && S.duration >= 0 ? S.duration : 4e3;
		}
		function K() {
			U();
			let e = ve();
			e !== 0 && (L = window.setTimeout(() => {
				L = void 0, X();
			}, e));
		}
		function q() {
			z || (z = !0, console.warn("MatSnackbar: 必须通过 text 或默认 Slot 提供内容"));
		}
		function ye() {
			D.value && (D.value = !1, O.value = "closed", C("closed"), E || i(H));
		}
		function J() {
			if (U(), !D.value) {
				E || r(H);
				return;
			}
			O.value !== "closing" && (O.value = "closing", G(200, ye));
		}
		function Y() {
			k.value || (k.value = !0, C("update:modelValue", !1));
		}
		function X() {
			Y(), J();
		}
		function Z() {
			!D.value || O.value === "closing" || (X(), C("action"));
		}
		async function Q() {
			if (!I || !S.modelValue || k.value || !A.value) {
				A.value || (q(), Y()), E || i(H);
				return;
			}
			U(), W(), D.value = !0, O.value = "opening", await ue(), !(!I || !D.value || O.value === "closing") && G(400, () => {
				!D.value || O.value === "closing" || (O.value = "open", K());
			});
		}
		function $() {
			if (k.value || !A.value) {
				A.value || (q(), X());
				return;
			}
			if (E) {
				Q();
				return;
			}
			if (D.value && O.value === "closing") {
				Q();
				return;
			}
			ae(H);
		}
		return fe(() => {
			I = !0, B = re(V), V(), S.modelValue && $();
		}), de(() => {
			I = !1, B?.(), B = null, U(), W(), E || (D.value ? i(H) : r(H));
		}), _(() => S.modelValue, (e) => {
			if (I) {
				if (e) {
					k.value = !1, $();
					return;
				}
				k.value = !1, J();
			}
		}), _(A, (e) => {
			if (I) {
				if (!e) {
					X();
					return;
				}
				z = !1, S.modelValue && !D.value && !k.value && $();
			}
		}), _(() => S.duration, () => {
			O.value === "open" && K();
		}), (n, ee) => (f(), o(se, { to: "body" }, [D.value ? (f(), c("section", d({ key: 0 }, n.$attrs, {
			class: ["mat-snackbar", [
				`mat-snackbar--${O.value}`,
				`mat-snackbar--${e.position}`,
				{ "mat-snackbar--with-trailing": N.value }
			]],
			style: ge.value,
			"aria-atomic": "true",
			"aria-live": "polite",
			role: "status"
		}), [ce("div", y, [n.$slots.default ? m(n.$slots, "default", { key: 0 }, void 0, !0) : (f(), c(oe, { key: 1 }, [l(h(e.text), 1)], 64))]), N.value ? (f(), c("div", me, [j.value ? (f(), c("div", b, [n.$slots.action ? m(n.$slots, "action", {
			key: 0,
			action: Z
		}, void 0, !0) : (f(), o(t, {
			key: 1,
			class: "mat-snackbar__default-action",
			"use-cursor": g(T).useCursor,
			onClick: Z
		}, {
			default: v(() => [l(h(e.actionText), 1)]),
			_: 1
		}, 8, ["use-cursor"]))])) : s("", !0), M.value ? (f(), c("div", he, [n.$slots.close ? m(n.$slots, "close", {
			key: 0,
			close: X
		}, void 0, !0) : (f(), o(t, {
			key: 1,
			class: "mat-snackbar__default-close",
			"aria-label": F.value,
			"use-cursor": g(T).useCursor,
			onClick: X
		}, {
			default: v(() => [le(te, {
				class: "mat-snackbar__close-icon",
				icon: "close",
				size: "24px",
				"optical-size": 24,
				"aria-hidden": "true"
			})]),
			_: 1
		}, 8, ["aria-label", "use-cursor"]))])) : s("", !0)])) : s("", !0)], 16)) : s("", !0)]));
	}
}), [["__scopeId", "data-v-5052ce72"]]);
//#endregion
export { x as default };
