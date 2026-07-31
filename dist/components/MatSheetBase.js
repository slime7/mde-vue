import e from "../_virtual/_plugin-vue_export-helper.js";
import t from "./mat-btn/MatBtn.js";
import n from "./MatSurfaceBase.js";
import { dialogStack as r, registerDialog as i, unregisterDialog as a } from "./dialog-stack.js";
/* empty css                                                             */
import { Fragment as o, Teleport as ee, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as te, createTextVNode as d, createVNode as ne, mergeProps as re, nextTick as f, onBeforeUnmount as ie, onMounted as ae, openBlock as p, ref as m, renderSlot as h, toDisplayString as oe, useAttrs as se, useId as ce, useSlots as le, watch as g, withCtx as ue, withModifiers as de } from "vue";
//#region src/components/MatSheetBase.vue
var fe = ["aria-label"], pe = {
	key: 1,
	class: "mat-sheet__header"
}, me = {
	key: 1,
	class: "mat-sheet__header-actions"
}, he = {
	key: 2,
	class: "mat-sheet__content"
}, ge = {
	key: 3,
	class: "mat-sheet__footer"
}, _ = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatSheetBase",
	inheritAttrs: !1
}, {
	__name: "MatSheetBase",
	props: {
		attach: {
			type: [String, Object],
			default: "body"
		},
		breakpoint: {
			type: Number,
			default: 840
		},
		closeLabel: {
			type: String,
			default: "关闭"
		},
		closeOnBack: {
			type: Boolean,
			default: !0
		},
		collapseDragHandleLabel: {
			type: String,
			default: "折叠底部面板"
		},
		closable: {
			type: Boolean,
			default: !1
		},
		componentName: {
			type: String,
			required: !0
		},
		content: {
			type: String,
			default: void 0
		},
		direction: {
			type: String,
			required: !0
		},
		dragHandle: {
			type: Boolean,
			default: !1
		},
		dragHandleLabel: {
			type: String,
			default: "展开底部面板"
		},
		draggable: {
			type: Boolean,
			default: !0
		},
		expanded: {
			type: Boolean,
			default: !1
		},
		expandedDragHandleLabel: {
			type: String,
			default: "关闭底部面板"
		},
		modelValue: {
			type: Boolean,
			default: !1
		},
		position: {
			type: String,
			default: "end"
		},
		scrim: {
			type: Boolean,
			default: !0
		},
		title: {
			type: String,
			default: void 0
		},
		variant: {
			type: String,
			default: "auto"
		},
		width: {
			type: [Number, String],
			default: void 0
		}
	},
	emits: {
		closed: () => !0,
		opened: () => !0,
		"update:expanded": (e) => typeof e == "boolean",
		"update:modelValue": (e) => typeof e == "boolean"
	},
	setup(e, { emit: _ }) {
		let v = e, y = _, b = se(), x = le(), S = m(null), C = m(null), w = m(!1), T = m("closed"), E = m(null), _e = m(typeof window > "u" ? 0 : window.innerWidth), D = m(0), O = m(null), k = m(!1), A = `${ce().replace(/[^\w-]/g, "-")}-title`, j = s(() => C.value?.root ?? C.value?.$el ?? null), M = s(() => v.variant === "auto" ? _e.value < v.breakpoint ? "modal" : "standard" : v.variant), N = s(() => M.value === "modal"), ve = s(() => N.value && r.value.at(-1) === j.value), P = s(() => !!x.activator), F = s(() => v.title !== void 0 || !!x.title), ye = s(() => v.content !== void 0 || !!x.default), I = s(() => v.closable || v.direction === "bottom" && N.value && v.expanded), be = s(() => v.expanded ? N.value ? v.expandedDragHandleLabel : v.collapseDragHandleLabel : v.dragHandleLabel), xe = s(() => F.value || I.value || !!x.header || !!x.actions), Se = s(() => N.value ? "dialog" : "aside"), L = s(() => {
			if (v.width !== void 0) return typeof v.width == "number" ? `${v.width}px` : v.width.trim();
		}), Ce = s(() => {
			if (L.value) return { "--mat-sheet-preferred-width": L.value };
		}), we = s(() => ({
			"--mat-sheet-drag-offset": `${D.value}px`,
			...O.value === null ? {} : { "--mat-sheet-drag-size": `${O.value}px` }
		})), Te = s(() => [
			b.style,
			Ce.value,
			we.value
		]), R = !1, z, B = null, V = !1, H = null, U = 0, W = 0, G = 0, K = 0, q = !1;
		function J() {
			z !== void 0 && (window.clearTimeout(z), z = void 0);
		}
		function Ee() {
			return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
		}
		function Y(e, t) {
			if (J(), Ee()) {
				t();
				return;
			}
			z = window.setTimeout(() => {
				z = void 0, t();
			}, e);
		}
		function De() {
			let e = S.value ? [...S.value.children] : [];
			return e.length === 1 && e[0] instanceof HTMLElement && e[0].ownerDocument === document ? e[0] : null;
		}
		function Oe() {
			if (typeof v.attach == "string") try {
				return document.querySelector(v.attach);
			} catch {
				return null;
			}
			return v.attach instanceof HTMLElement && v.attach.ownerDocument === document ? v.attach : null;
		}
		function X() {
			y("update:modelValue", !1);
		}
		function ke() {
			if (q) {
				q = !1;
				return;
			}
			if (v.expanded) {
				if (N.value) {
					X();
					return;
				}
				y("update:expanded", !1);
				return;
			}
			y("update:expanded", !0);
		}
		function Ae(e) {
			e.key !== "Enter" && e.key !== " " || (e.preventDefault(), ke());
		}
		function je() {
			console.warn(`${v.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`);
		}
		function Me() {
			!N.value || F.value || b["aria-label"] || b["aria-labelledby"] || console.warn(`${v.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`);
		}
		function Z() {
			console.warn(`${v.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
		}
		function Ne() {
			let e = j.value;
			e && (e.querySelector([
				"[autofocus]",
				"button:not([disabled]):not([data-sheet-drag-handle])",
				"input:not([disabled])",
				"textarea:not([disabled])",
				"select:not([disabled])",
				"a[href]",
				"[tabindex]:not([tabindex=\"-1\"])"
			].join(",")) ?? e).focus({ preventScroll: !0 });
		}
		function Pe() {
			let e = j.value;
			e instanceof HTMLDialogElement && (e.open || e.showModal(), i(e), Ne());
		}
		async function Fe() {
			if (J(), w.value) {
				T.value = "opening", Y(400, () => {
					T.value = "open", y("opened");
				});
				return;
			}
			let e = P.value ? De() : null;
			if (P.value && !e) {
				je(), X();
				return;
			}
			if (N.value) {
				let t = Oe();
				if (!t) {
					Z(), X();
					return;
				}
				E.value = t, B = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
			}
			V = N.value, w.value = !0, T.value = "opening", Me(), await f(), !(!v.modelValue || !j.value) && (N.value && Pe(), Y(400, () => {
				T.value = "open", y("opened");
			}));
		}
		function Ie() {
			V && B?.isConnected && B.focus({ preventScroll: !0 }), B = null, V = !1;
		}
		function Le() {
			let e = j.value;
			e instanceof HTMLDialogElement && (e.open && e.close(), a(e)), w.value = !1, T.value = "closed", D.value = 0, O.value = null, f(() => {
				Ie(), y("closed");
			});
		}
		function Re() {
			w.value && (T.value = "closing", Y(200, Le));
		}
		function ze(e) {
			e.preventDefault(), X();
		}
		function Be(e) {
			e.key === "Escape" && (e.preventDefault(), X());
		}
		function Ve(e) {
			if (!N.value || !v.closeOnBack || e.target !== j.value) return;
			let t = j.value.getBoundingClientRect();
			(e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && X();
		}
		function He(e) {
			if (e.pointerId === H) {
				if (v.direction === "bottom") {
					if (K = e.clientY - U, !v.expanded && K < 0 || v.expanded && K > 0) {
						D.value = 0, O.value = Math.max(0, W - K);
						return;
					}
					D.value = Math.max(0, K), O.value = W;
					return;
				}
				D.value = v.position === "start" ? Math.max(0, U - e.clientX) : Math.max(0, e.clientX - U);
			}
		}
		function Q() {
			H = null, k.value = !1, window.removeEventListener("pointermove", He), window.removeEventListener("pointerup", Ue), window.removeEventListener("pointercancel", We);
		}
		function Ue(e) {
			if (e.pointerId !== H) return;
			let t = j.value, n = v.direction === "bottom" ? t?.getBoundingClientRect().height ?? 0 : t?.getBoundingClientRect().width ?? 0, r = Math.max(1, performance.now() - G), i = v.direction === "bottom" ? Math.abs(K) : D.value, a = i / r, o = i >= Math.min(160, Math.max(80, n * .3)) || i >= 24 && a >= .5;
			if (q = i >= 4, Q(), v.direction === "bottom" && o) {
				if (!v.expanded && K < 0) {
					D.value = 0, O.value = null, y("update:expanded", !0);
					return;
				}
				if (v.expanded && K > 0) {
					D.value = 0, O.value = null, y("update:expanded", !1);
					return;
				}
				if (!v.expanded && K > 0) {
					O.value = null, X();
					return;
				}
			}
			if (v.direction === "side" && o) {
				X();
				return;
			}
			D.value = 0, O.value = null;
		}
		function We() {
			Q(), D.value = 0, O.value = null;
		}
		function Ge(e) {
			!v.draggable || e.button !== 0 || H !== null || (H = e.pointerId, U = v.direction === "bottom" ? e.clientY : e.clientX, W = v.direction === "bottom" ? j.value?.getBoundingClientRect().height ?? 0 : j.value?.getBoundingClientRect().width ?? 0, G = performance.now(), K = 0, O.value = v.direction === "bottom" ? W : null, k.value = !0, window.addEventListener("pointermove", He), window.addEventListener("pointerup", Ue), window.addEventListener("pointercancel", We));
		}
		function Ke(e) {
			v.direction !== "side" || e.pointerType !== "touch" || e.target instanceof Element && e.target.closest("button, a, input, textarea, select, [contenteditable=\"true\"]") || Ge(e);
		}
		function $() {
			_e.value = window.innerWidth;
		}
		async function qe(e, t) {
			if (!w.value || !v.modelValue || e === t) return;
			J();
			let n = j.value;
			if (t === "modal" && n instanceof HTMLDialogElement && (n.open && n.close(), a(n), Ie()), e === "modal") {
				let e = Oe();
				if (!e) {
					Z(), X();
					return;
				}
				E.value = e, B = document.activeElement instanceof HTMLElement ? document.activeElement : null, V = !0, Me();
			}
			T.value = "open", await f(), e === "modal" && v.modelValue && Pe();
		}
		return ae(() => {
			R = !0, $(), window.addEventListener("resize", $), v.modelValue && Fe();
		}), ie(() => {
			R = !1, J(), Q(), window.removeEventListener("resize", $);
			let e = j.value;
			e instanceof HTMLDialogElement && (a(e), e.open && e.close());
		}), g(() => v.modelValue, (e) => {
			R && (e ? Fe() : Re());
		}), g(M, qe), g(() => v.attach, () => {
			v.modelValue && w.value && N.value && console.warn(`${v.componentName}: 打开期间修改 attach 将在下次打开时生效`);
		}), g(() => v.closeLabel, (e) => {
			e.trim().length === 0 && console.warn(`${v.componentName}: closeLabel 必须是非空字符串`);
		}, { immediate: !0 }), (r, i) => (p(), u(o, null, [P.value ? (p(), u("span", {
			key: 0,
			ref_key: "activatorHost",
			ref: S,
			class: "mat-sheet__activator"
		}, [h(r.$slots, "activator", {}, void 0, !0)], 512)) : l("", !0), w.value ? (p(), c(ee, {
			key: 1,
			to: E.value ?? "body",
			disabled: !N.value
		}, [ne(n, re({
			ref_key: "surface",
			ref: C
		}, r.$attrs, {
			as: Se.value,
			class: ["mat-sheet", [
				`mat-sheet--${e.direction}`,
				`mat-sheet--${M.value}`,
				`mat-sheet--${T.value}`,
				`mat-sheet--position-${e.position}`,
				{
					"mat-sheet--dragging": k.value,
					"mat-sheet--expanded": e.direction === "bottom" && e.expanded,
					"mat-sheet--top": ve.value,
					"mat-sheet--transparent-scrim": !e.scrim
				}
			]],
			style: Te.value,
			"aria-labelledby": r.$attrs["aria-labelledby"] ?? (F.value ? A : void 0),
			tabindex: N.value ? -1 : void 0,
			onCancel: ze,
			onClick: Ve,
			onKeydown: Be,
			onPointerdown: Ke
		}), {
			default: ue(() => [
				e.direction === "bottom" && e.dragHandle ? (p(), u("button", {
					key: 0,
					class: "mat-sheet__drag-handle-target",
					type: "button",
					"data-sheet-drag-handle": "",
					"aria-label": be.value,
					onClick: ke,
					onKeydown: Ae,
					onPointerdown: de(Ge, ["stop"])
				}, [h(r.$slots, "drag-handle", {}, () => [i[0] ||= te("span", { class: "mat-sheet__drag-handle" }, null, -1)], !0)], 40, fe)) : l("", !0),
				xe.value ? (p(), u("header", pe, [h(r.$slots, "header", {}, () => [
					F.value ? (p(), u("h2", {
						key: 0,
						id: A,
						class: "mat-sheet__title"
					}, [e.title === void 0 ? h(r.$slots, "title", { key: 1 }, void 0, !0) : (p(), u(o, { key: 0 }, [d(oe(e.title), 1)], 64))])) : l("", !0),
					r.$slots.actions ? (p(), u("div", me, [h(r.$slots, "actions", {}, void 0, !0)])) : l("", !0),
					I.value ? (p(), c(t, {
						key: 2,
						class: "mat-sheet__close",
						icon: "close",
						label: e.closeLabel,
						size: "small",
						variant: "standard",
						onClick: X
					}, null, 8, ["label"])) : l("", !0)
				], !0)])) : l("", !0),
				ye.value ? (p(), u("div", he, [e.content === void 0 ? h(r.$slots, "default", { key: 1 }, void 0, !0) : (p(), u(o, { key: 0 }, [d(oe(e.content), 1)], 64))])) : l("", !0),
				r.$slots.footer ? (p(), u("div", ge, [h(r.$slots, "footer", {}, void 0, !0)])) : l("", !0)
			]),
			_: 3
		}, 16, [
			"as",
			"class",
			"style",
			"aria-labelledby",
			"tabindex"
		])], 8, ["to", "disabled"])) : l("", !0)], 64));
	}
}), [["__scopeId", "data-v-c5078906"]]);
//#endregion
export { _ as default };
