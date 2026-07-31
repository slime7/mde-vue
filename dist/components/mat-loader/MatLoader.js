import e from "../../_virtual/_plugin-vue_export-helper.js";
import { isComponentColor as t } from "../button-props.js";
import n from "../use-component-color.js";
/* empty css                                                          */
import { Fragment as r, computed as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, mergeProps as c, normalizeStyle as l, onBeforeUnmount as u, onMounted as d, openBlock as f, ref as p, useId as m, watch as h } from "vue";
//#region src/components/mat-loader/MatLoader.vue
var g = ["aria-valuemax", "aria-valuenow"], _ = ["width", "height"], v = { key: 0 }, ee = ["width", "height"], te = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, ne = ["d"], re = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, ie = ["d"], ae = ["d", "mask"], oe = { class: "mat-loader__linear-bar mat-loader__linear-bar--primary" }, se = ["d"], ce = { class: "mat-loader__linear-bar mat-loader__linear-bar--secondary" }, le = ["d"], ue = ["d"], de = {
	key: 1,
	class: "mat-loader__linear-stop"
}, fe = ["viewBox"], pe = { class: "mat-loader__circular-linear-rotate" }, me = { class: "mat-loader__circular-rotate-arc" }, y = [
	"cx",
	"cy",
	"r"
], he = ["d"], b = 4, x = 3, S = 40, C = 1.6, ge = 15, _e = 4, w = .001, ve = 100, ye = 300, be = 900, T = /*#__PURE__*/ e(/* @__PURE__ */ Object.assign({
	name: "MatLoader",
	inheritAttrs: !1
}, {
	__name: "MatLoader",
	props: {
		variant: {
			type: String,
			default: "linear",
			validator(e) {
				return ["linear", "circular"].includes(e);
			}
		},
		value: {
			type: Number,
			default: 0,
			validator(e) {
				return typeof e == "number" && Number.isFinite(e);
			}
		},
		max: {
			type: Number,
			default: 1,
			validator(e) {
				return typeof e == "number" && Number.isFinite(e) && e > 0;
			}
		},
		indeterminate: {
			type: Boolean,
			default: !1
		},
		thickness: {
			type: Number,
			default: 4,
			validator(e) {
				return typeof e == "number" && Number.isFinite(e) && e > 0;
			}
		},
		shape: {
			type: String,
			default: "flat",
			validator(e) {
				return ["flat", "wavy"].includes(e);
			}
		},
		waveMotion: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: void 0,
			validator: t
		}
	},
	setup(e) {
		function t(e) {
			return typeof e == "number" && Number.isFinite(e);
		}
		function T(e) {
			return t(e) && e > 0;
		}
		function E(e) {
			return Number(e.toFixed(3)).toString();
		}
		function xe() {
			return typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function D(e, t, n, r, i) {
			let a = t / 2, o = Math.min(e / 2, n / 2), s = Math.max(o, e - n / 2), c = [`M ${E(o)} ${E(a)}`];
			for (let e = o + 2; e < s; e += 2) {
				let t = (e - o) / S * Math.PI * 2, n = a - Math.sin(t - i) * r;
				c.push(`L ${E(e)} ${E(n)}`);
			}
			let l = (s - o) / S * Math.PI * 2, u = a - Math.sin(l - i) * r;
			return c.push(`L ${E(s)} ${E(u)}`), c.join(" ");
		}
		function O(e, t, n, r) {
			let i = Math.max(1, Math.round(Math.PI * 2 * t / ge)), a = i * 12, o = [];
			for (let s = 0; s <= a; s += 1) {
				let c = s / a, l = c * Math.PI * 2, u = c * Math.PI * 2 * i, d = t + Math.sin(u - r) * n, f = e + Math.cos(l) * d, p = e + Math.sin(l) * d, m = s === 0 ? "M" : "L";
				o.push(`${m} ${E(f)} ${E(p)}`);
			}
			return o.push("Z"), o.join(" ");
		}
		let k = e, { colorStyle: A } = n(i(() => k.color)), j = p(null), M = p(ve), N = p(+(k.shape === "wavy")), P = p(0), F = `mat-loader-linear-mask-${m()}`, I, L, R, z = i(() => T(k.max) ? k.max : 1), B = i(() => T(k.thickness) ? k.thickness : 4), Se = i(() => k.variant === "circular"), V = i(() => k.shape === "wavy"), H = i(() => {
			let e = t(k.value) ? k.value : 0;
			return Math.min(Math.max(e, 0), z.value);
		}), U = i(() => Number((H.value / z.value * 100).toFixed(3))), W = i(() => B.value + x * 2 * N.value), G = i(() => Math.min(100, B.value / M.value * 100)), Ce = i(() => {
			let e = M.value - B.value;
			return e <= 0 ? 1 : M.value / e;
		}), K = i(() => U.value === 100 ? 100 : Math.min(100, Math.max(U.value, G.value + w))), we = i(() => D(M.value, W.value, B.value, 0, 0)), q = i(() => D(M.value, W.value, B.value, x * N.value, P.value)), J = i(() => B.value + 36 + 8 * N.value), Y = i(() => J.value / 2), X = i(() => Y.value - B.value / 2 - C * N.value), Te = i(() => `0 0 ${J.value} ${J.value}`), Ee = i(() => O(Y.value, X.value, C * N.value, P.value)), Z = i(() => {
			let e = Math.PI * 2 * X.value;
			return (b + B.value) / e * 100;
		}), De = i(() => Math.min(12, Z.value)), Oe = i(() => {
			if (k.indeterminate) return {};
			let e = Number(Math.max(0, 100 - U.value - Z.value * 2).toFixed(3)), t = Number(Math.min(100, U.value + Z.value).toFixed(3));
			return {
				opacity: +(e > 0),
				strokeDasharray: `${E(e)} ${E(100 - e)}`,
				strokeDashoffset: `-${E(t)}`
			};
		}), ke = i(() => k.indeterminate ? {} : { strokeDasharray: `${E(U.value === 0 ? w : U.value)} 200` }), Ae = i(() => ({
			...A.value,
			"--mat-loader-circular-gap-progress": E(De.value),
			"--mat-loader-circular-radius": `${X.value}px`,
			"--mat-loader-circular-size": `${J.value}px`,
			"--mat-loader-indicator-gap-size": `${b}px`,
			"--mat-loader-linear-cap-progress": E(G.value),
			"--mat-loader-linear-path-scale": E(Ce.value),
			"--mat-loader-linear-segment-end": E(K.value),
			"--mat-loader-linear-segment-end-position": `${E(K.value)}%`,
			"--mat-loader-linear-size": `${W.value}px`,
			"--mat-loader-progress": `${U.value}`,
			"--mat-loader-stop-indicator-size": `${_e}px`,
			"--mat-loader-thickness": `${B.value}px`
		}));
		function Q(e) {
			L = void 0;
			let t = R === void 0 ? 0 : Math.min(64, e - R), n = +!!V.value, r = n - N.value;
			if (R = e, t > 0 && r !== 0) {
				let e = Math.min(Math.abs(r), t / ye);
				N.value += Math.sign(r) * e;
			}
			t > 0 && k.waveMotion && N.value > 0 && (P.value += t / be * Math.PI * 2, P.value %= Math.PI * 2);
			let i = N.value !== n, a = k.waveMotion && N.value > 0;
			i || a ? L = globalThis.requestAnimationFrame(Q) : R = void 0;
		}
		function $() {
			if (xe() || typeof globalThis.requestAnimationFrame != "function") {
				N.value = +!!V.value;
				return;
			}
			L === void 0 && (R = void 0, L = globalThis.requestAnimationFrame(Q));
		}
		return h(V, $), h(() => k.waveMotion, $), d(() => {
			$(), !(!j.value || typeof globalThis.ResizeObserver != "function") && (I = new globalThis.ResizeObserver(([e]) => {
				let t = e.contentRect.width;
				t > 0 && (M.value = t);
			}), I.observe(j.value));
		}), u(() => {
			I?.disconnect(), L !== void 0 && globalThis.cancelAnimationFrame?.(L);
		}), (t, n) => (f(), o("div", c(t.$attrs, {
			class: ["mat-loader", [
				`mat-loader--${e.variant}`,
				`mat-loader--${e.shape}`,
				{
					"mat-loader--indeterminate": e.indeterminate,
					"mat-loader--wave-motion": e.waveMotion
				}
			]],
			style: Ae.value,
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": z.value,
			"aria-valuenow": e.indeterminate ? void 0 : H.value
		}), [Se.value ? (f(), o("svg", {
			key: 1,
			class: "mat-loader__circular",
			viewBox: Te.value,
			"aria-hidden": "true"
		}, [s("g", pe, [s("g", me, [s("circle", {
			class: "mat-loader__circular-track",
			cx: Y.value,
			cy: Y.value,
			r: X.value,
			pathLength: "100",
			style: l(Oe.value)
		}, null, 12, y), s("path", {
			class: "mat-loader__circular-active",
			d: Ee.value,
			pathLength: "100",
			style: l(ke.value)
		}, null, 12, he)])])], 8, fe)) : (f(), o("span", {
			key: 0,
			ref_key: "linearElement",
			ref: j,
			class: "mat-loader__linear",
			"aria-hidden": "true"
		}, [
			e.indeterminate ? a("", !0) : (f(), o(r, { key: 0 }, [n[0] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--before" }, null, -1), n[1] ||= s("span", { class: "mat-loader__linear-track mat-loader__linear-track--after" }, null, -1)], 64)),
			(f(), o("svg", {
				class: "mat-loader__linear-indicator",
				width: M.value,
				height: W.value
			}, [
				e.indeterminate ? (f(), o("defs", v, [s("mask", {
					id: F,
					maskUnits: "userSpaceOnUse",
					x: "0",
					y: "0",
					width: M.value,
					height: W.value
				}, [
					n[2] ||= s("rect", {
						width: "100%",
						height: "100%",
						fill: "white"
					}, null, -1),
					s("g", te, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary",
						d: q.value,
						pathLength: "100"
					}, null, 8, ne)]),
					s("g", re, [s("path", {
						class: "mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary",
						d: q.value,
						pathLength: "100"
					}, null, 8, ie)])
				], 8, ee)])) : a("", !0),
				e.indeterminate ? (f(), o("path", {
					key: 1,
					class: "mat-loader__linear-indeterminate-track",
					d: we.value,
					pathLength: "100",
					mask: `url(#${F})`
				}, null, 8, ae)) : a("", !0),
				e.indeterminate ? (f(), o(r, { key: 2 }, [s("g", oe, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary",
					d: q.value,
					pathLength: "100"
				}, null, 8, se)]), s("g", ce, [s("path", {
					class: "mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary",
					d: q.value,
					pathLength: "100"
				}, null, 8, le)])], 64)) : (f(), o("path", {
					key: 3,
					class: "mat-loader__linear-active mat-loader__linear-active--determinate",
					d: q.value,
					pathLength: "100"
				}, null, 8, ue))
			], 8, _)),
			e.indeterminate ? a("", !0) : (f(), o("span", de))
		], 512))], 16, g));
	}
}), [["__scopeId", "data-v-09e887cb"]]);
//#endregion
export { T as default };
