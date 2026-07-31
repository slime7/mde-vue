import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import n from "../use-component-color.js";
import ee from "../mat-icon/MatIcon.js";
import r from "../mat-btn/MatBtn.js";
import i from "../MatSurfaceBase.js";
import { dialogStack as a, registerDialog as o, unregisterDialog as s } from "../dialog-stack.js";
/* empty css                                                          */
import { Fragment as c, Teleport as te, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, mergeProps as ne, nextTick as g, onBeforeUnmount as re, onMounted as ie, openBlock as _, ref as v, renderSlot as y, toDisplayString as b, useAttrs as x, useId as S, useSlots as C, watch as w, watchEffect as T, withCtx as E } from "vue";
//#region src/components/mat-dialog/MatDialog.vue
var D = { class: "mat-dialog__header" }, ae = {
	key: 1,
	class: "mat-dialog__actions"
}, oe = {
	key: 0,
	class: "mat-dialog__content"
}, se = {
	key: 2,
	class: "mat-dialog__content"
}, ce = {
	key: 3,
	class: "mat-dialog__actions"
}, O = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatDialog",
	inheritAttrs: !1
}, {
	__name: "MatDialog",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		fullScreen: {
			type: Boolean,
			default: !1
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
			default: !1
		},
		title: {
			type: String,
			default: void 0
		},
		content: {
			type: String,
			default: void 0
		},
		icon: {
			type: String,
			default: void 0
		},
		closeLabel: {
			type: String,
			default: "关闭"
		},
		color: {
			type: String,
			default: void 0,
			validator: t
		}
	},
	emits: {
		"update:modelValue": (e) => typeof e == "boolean",
		opened: () => !0,
		closed: () => !0
	},
	setup(e, { emit: t }) {
		function O(e) {
			return typeof e == "number" ? `${e}px` : e.trim();
		}
		let k = e, A = t, j = x(), M = C(), N = v(null), P = v(null), F = v(!1), I = v("closed"), L = v(null), R = `${S().replace(/[^\w-]/g, "-")}-title`, z = l(() => P.value?.root ?? P.value?.$el ?? null), B = l(() => k.title !== void 0 || !!M.title), V = l(() => k.content !== void 0 || !!M.default), H = l(() => !k.fullScreen && (k.icon !== void 0 || !!M.icon)), U = l(() => !!M.activator), W = l(() => a.value.at(-1) === z.value), { colorStyle: G } = n(l(() => k.color)), le = l(() => {
			if (!(k.fullScreen || k.width === void 0)) return {
				inlineSize: `min(${O(k.width)}, calc(100dvi - 48px))`,
				maxInlineSize: "calc(100dvi - 48px)"
			};
		}), ue = l(() => [
			G.value,
			j.style,
			le.value
		]), K = !1, q, J = null;
		function de() {
			let e = N.value ? [...N.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function Y() {
			q !== void 0 && (window.clearTimeout(q), q = void 0);
		}
		function fe() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function X(e, t) {
			if (Y(), fe()) {
				t();
				return;
			}
			q = window.setTimeout(() => {
				q = void 0, t();
			}, e);
		}
		function pe() {
			if (typeof k.attach == "string") try {
				return document.querySelector(k.attach);
			} catch {
				return null;
			}
			return k.attach instanceof HTMLElement && k.attach.ownerDocument === document ? k.attach : null;
		}
		function Z() {
			A("update:modelValue", !1);
		}
		function me() {
			B.value || j["aria-label"] || j["aria-labelledby"] || console.warn("MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称");
		}
		function he() {
			console.warn("MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点");
		}
		function ge() {
			let e = z.value;
			e && (e.querySelector([
				"[autofocus]",
				"button:not([disabled])",
				"input:not([disabled])",
				"textarea:not([disabled])",
				"select:not([disabled])",
				"a[href]",
				"[tabindex]:not([tabindex=\"-1\"])"
			].join(",")) ?? e).focus({ preventScroll: !0 });
		}
		async function Q() {
			if (Y(), F.value && z.value?.open) {
				I.value = "opening", X(400, () => {
					I.value = "open", A("opened");
				});
				return;
			}
			let e = U.value ? de() : null;
			if (U.value && !e) {
				he(), Z();
				return;
			}
			let t = pe();
			if (!t) {
				console.warn("MatDialog: attach 必须指向当前 document 中存在的 HTMLElement"), Z();
				return;
			}
			J = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), L.value = t, F.value = !0, I.value = "opening", me(), await g(), !(!k.modelValue || !z.value) && (z.value.open || z.value.showModal(), o(z.value), ge(), X(400, () => {
				I.value = "open", A("opened");
			}));
		}
		function $() {
			let e = z.value;
			e?.open && e.close(), e && s(e), F.value = !1, I.value = "closed", g(() => {
				J?.isConnected && J.focus({ preventScroll: !0 }), J = null, A("closed");
			});
		}
		function _e() {
			F.value && (I.value = "closing", X(200, $));
		}
		function ve(e) {
			e.preventDefault(), Z();
		}
		function ye(e) {
			e.key === "Escape" && (e.preventDefault(), Z());
		}
		function be(e) {
			if (!k.closeOnBack || e.target !== z.value) return;
			let t = z.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && Z();
		}
		return ie(() => {
			K = !0, k.modelValue && Q();
		}), re(() => {
			K = !1, Y(), z.value && (s(z.value), z.value.open && z.value.close());
		}), w(() => k.modelValue, (e) => {
			K && (e ? Q() : _e());
		}), w(() => k.attach, () => {
			k.modelValue && F.value && console.warn("MatDialog: 打开期间修改 attach 将在下次打开时生效");
		}), T(() => {
			k.closeLabel.trim().length === 0 && console.warn("MatDialog: closeLabel 必须是非空字符串");
		}), (t, n) => (_(), f(c, null, [U.value ? (_(), f("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: N,
			class: "mat-dialog__activator"
		}, [y(t.$slots, "activator", {}, void 0, !0)], 512)) : d("", !0), F.value ? (_(), u(te, {
			key: 1,
			to: L.value
		}, [h(i, ne({
			ref_key: "surface",
			ref: P
		}, t.$attrs, {
			as: "dialog",
			class: ["mat-dialog", [`mat-dialog--${I.value}`, {
				"mat-dialog--full-screen": e.fullScreen,
				"mat-dialog--with-icon": H.value,
				"mat-dialog--top": W.value,
				"mat-dialog--transparent-scrim": !e.scrim
			}]],
			style: ue.value,
			"aria-labelledby": t.$attrs["aria-labelledby"] ?? (B.value ? R : void 0),
			tabindex: "-1",
			onCancel: ve,
			onClick: be,
			onKeydown: ye
		}), {
			default: E(() => [e.fullScreen ? (_(), f(c, { key: 0 }, [p("header", D, [
				h(r, {
					class: "mat-dialog__close",
					icon: "close",
					label: e.closeLabel,
					size: "small",
					variant: "standard",
					onClick: Z
				}, null, 8, ["label"]),
				B.value ? (_(), f("h2", {
					key: 0,
					id: R,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? y(t.$slots, "title", { key: 1 }, void 0, !0) : (_(), f(c, { key: 0 }, [m(b(e.title), 1)], 64))])) : d("", !0),
				t.$slots.actions ? (_(), f("div", ae, [y(t.$slots, "actions", {}, void 0, !0)])) : d("", !0)
			]), V.value ? (_(), f("div", oe, [e.content === void 0 ? y(t.$slots, "default", { key: 1 }, void 0, !0) : (_(), f(c, { key: 0 }, [m(b(e.content), 1)], 64))])) : d("", !0)], 64)) : (_(), f(c, { key: 1 }, [
				H.value ? (_(), u(ee, {
					key: 0,
					as: "div",
					class: "mat-dialog__icon",
					"optical-size": 24,
					size: "24px",
					"aria-hidden": "true"
				}, {
					default: E(() => [e.icon === void 0 ? y(t.$slots, "icon", { key: 1 }, void 0, !0) : (_(), f(c, { key: 0 }, [m(b(e.icon), 1)], 64))]),
					_: 3
				})) : d("", !0),
				B.value ? (_(), f("h2", {
					key: 1,
					id: R,
					class: "mat-dialog__title"
				}, [e.title === void 0 ? y(t.$slots, "title", { key: 1 }, void 0, !0) : (_(), f(c, { key: 0 }, [m(b(e.title), 1)], 64))])) : d("", !0),
				V.value ? (_(), f("div", se, [e.content === void 0 ? y(t.$slots, "default", { key: 1 }, void 0, !0) : (_(), f(c, { key: 0 }, [m(b(e.content), 1)], 64))])) : d("", !0),
				t.$slots.actions ? (_(), f("div", ce, [y(t.$slots, "actions", {}, void 0, !0)])) : d("", !0)
			], 64))]),
			_: 3
		}, 16, [
			"class",
			"style",
			"aria-labelledby"
		])], 8, ["to"])) : d("", !0)], 64));
	}
}), [["__scopeId", "data-v-0dd85d2c"]]);
//#endregion
export { O as default };
