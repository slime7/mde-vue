import { MagicString as e, babelParse as t, compileTemplate as n, parse as r } from "vue/compiler-sfc";
//#region src/component-manifest.js
var i = [
	{
		name: "MatBtn",
		tag: "mat-btn",
		aliases: [],
		defaults: [
			"block",
			"variant",
			"size",
			"shape",
			"width",
			"icon",
			"fill",
			"prefix",
			"suffix",
			"label",
			"color",
			"toggle",
			"selected",
			"value",
			"disabled",
			"loading",
			"type",
			"morph"
		]
	},
	{
		name: "MatAppRoot",
		tag: "mat-app-root",
		aliases: [],
		defaults: [
			"as",
			"fillViewport",
			"scrollable"
		]
	},
	{
		name: "MatAppBar",
		tag: "mat-app-bar",
		aliases: [],
		defaults: [
			"variant",
			"content",
			"align",
			"app",
			"attach",
			"scrollTarget",
			"scrollTimeline",
			"placeholder",
			"safeArea",
			"safeAreaSize",
			"bordered",
			"mode",
			"zIndex",
			"transition"
		]
	},
	{
		name: "MatSearch",
		tag: "mat-search",
		aliases: [],
		defaults: [
			"label",
			"placeholder",
			"disabled",
			"readonly",
			"maxLength"
		]
	},
	{
		name: "MatBtnGroup",
		tag: "mat-btn-group",
		aliases: [],
		defaults: [
			"block",
			"variant",
			"size",
			"shape",
			"color",
			"disabled",
			"selection",
			"selected",
			"required",
			"fullWidth"
		]
	},
	{
		name: "MatFab",
		tag: "mat-fab",
		aliases: [],
		defaults: [
			"size",
			"icon",
			"label",
			"expanded",
			"color",
			"disabled",
			"type",
			"app",
			"position"
		]
	},
	{
		name: "MatFabMenu",
		tag: "mat-fab-menu",
		aliases: [],
		defaults: [
			"size",
			"icon",
			"label",
			"closeIcon",
			"closeLabel",
			"color",
			"disabled",
			"type",
			"closeOnClick",
			"closeOnEsc",
			"closeOnClickOutside"
		]
	},
	{
		name: "MatIcon",
		tag: "mat-icon",
		aliases: [],
		defaults: [
			"icon",
			"src",
			"size",
			"fill",
			"weight",
			"grade",
			"opticalSize",
			"color",
			"fontColor",
			"as",
			"iconClass"
		]
	},
	{
		name: "MatImage",
		tag: "mat-image",
		aliases: [],
		defaults: [
			"src",
			"radius",
			"fit",
			"outline",
			"aspectRatio",
			"imgClass",
			"imgStyle"
		]
	},
	{
		name: "MatCarousel",
		tag: "mat-carousel",
		aliases: [],
		defaults: ["variant", "switchOnClick"]
	},
	{
		name: "MatCarouselItem",
		tag: "mat-carousel-item",
		aliases: [],
		defaults: [
			"src",
			"alt",
			"aspectRatio",
			"width"
		]
	},
	{
		name: "MatTabs",
		tag: "mat-tabs",
		aliases: [],
		defaults: [
			"variant",
			"swipeable",
			"scrollable",
			"align",
			"color",
			"scrollButtons"
		]
	},
	{
		name: "MatTabItem",
		tag: "mat-tab-item",
		aliases: [],
		defaults: [
			"value",
			"label",
			"icon",
			"badge",
			"disabled"
		]
	},
	{
		name: "MatTabContent",
		tag: "mat-tab-content",
		aliases: [],
		defaults: ["value"]
	},
	{
		name: "MatDatePicker",
		tag: "mat-date-picker",
		aliases: [],
		defaults: ["color"]
	},
	{
		name: "MatTimePicker",
		tag: "mat-time-picker",
		aliases: [],
		defaults: [
			"color",
			"format",
			"is24Hour",
			"showModeToggle"
		]
	},
	{
		name: "MatSharedElement",
		tag: "mat-shared-element",
		aliases: ["MdeSharedElement", "mde-shared-element"],
		defaults: [
			"name",
			"as",
			"disabled"
		]
	},
	{
		name: "MatAvatar",
		tag: "mat-avatar",
		aliases: [],
		defaults: [
			"src",
			"icon",
			"color",
			"size"
		]
	},
	{
		name: "MatShape",
		tag: "mat-shape",
		aliases: [],
		defaults: [
			"name",
			"size",
			"color",
			"as",
			"morph"
		]
	},
	{
		name: "MatText",
		tag: "mat-text",
		aliases: [],
		defaults: [
			"type",
			"size",
			"emphasized",
			"as"
		]
	},
	{
		name: "MatDynamicText",
		tag: "mat-dynamic-text",
		aliases: ["MdeDynamicText", "mde-dynamic-text"],
		defaults: [
			"text",
			"as",
			"diff",
			"appear"
		]
	},
	{
		name: "MatChatMinimap",
		tag: "mat-chat-minimap",
		aliases: [],
		defaults: [
			"items",
			"itemWidth",
			"itemHeight",
			"itemGap",
			"direction",
			"current"
		]
	},
	{
		name: "MatSplitBtn",
		tag: "mat-split-btn",
		aliases: [],
		defaults: [
			"block",
			"variant",
			"size",
			"color",
			"disabled",
			"controls"
		]
	},
	{
		name: "MatCard",
		tag: "mat-card",
		aliases: [],
		defaults: [
			"variant",
			"color",
			"rounded",
			"flat",
			"as"
		]
	},
	{
		name: "MatCardActionArea",
		tag: "mat-card-action-area",
		aliases: [],
		defaults: [
			"href",
			"disabled",
			"type"
		]
	},
	{
		name: "MatCardContent",
		tag: "mat-card-content",
		aliases: [],
		defaults: []
	},
	{
		name: "MatCardActions",
		tag: "mat-card-actions",
		aliases: [],
		defaults: []
	},
	{
		name: "MatCardHeadline",
		tag: "mat-card-headline",
		aliases: [],
		defaults: []
	},
	{
		name: "MatCardSubhead",
		tag: "mat-card-subhead",
		aliases: [],
		defaults: []
	},
	{
		name: "MatCardMedia",
		tag: "mat-card-media",
		aliases: [],
		defaults: []
	},
	{
		name: "MatExpansion",
		tag: "mat-expansion",
		aliases: [],
		defaults: [
			"multiple",
			"color",
			"disabled",
			"as",
			"variant"
		]
	},
	{
		name: "MatSimpleExpansion",
		tag: "mat-simple-expansion",
		aliases: [],
		defaults: []
	},
	{
		name: "MatExpansionPanel",
		tag: "mat-expansion-panel",
		aliases: [],
		defaults: [
			"value",
			"title",
			"split",
			"color",
			"disabled",
			"as"
		]
	},
	{
		name: "MatList",
		tag: "mat-list",
		aliases: [],
		defaults: [
			"variant",
			"interaction",
			"selected",
			"color",
			"activeColor",
			"draggable",
			"virtual",
			"items",
			"itemHeight",
			"estimatedItemHeight",
			"buffer",
			"itemKey"
		]
	},
	{
		name: "MatListGroup",
		tag: "mat-list-group",
		aliases: [],
		defaults: ["value", "as"]
	},
	{
		name: "MatListItem",
		tag: "mat-list-item",
		aliases: [],
		defaults: [
			"value",
			"href",
			"type",
			"disabled",
			"lines",
			"separateTrailing",
			"swipeable",
			"swipeRemove",
			"swipePrimary"
		]
	},
	{
		name: "MatGridList",
		tag: "mat-grid-list",
		aliases: [],
		defaults: [
			"cols",
			"interaction",
			"selected",
			"color",
			"activeColor"
		]
	},
	{
		name: "MatDivider",
		tag: "mat-divider",
		aliases: [],
		defaults: ["inset", "vertical"]
	},
	{
		name: "MatCheckbox",
		tag: "mat-checkbox",
		aliases: [],
		defaults: [
			"value",
			"disabled",
			"color"
		]
	},
	{
		name: "MatBadge",
		tag: "mat-badge",
		aliases: [],
		defaults: [
			"content",
			"dot",
			"location",
			"offset",
			"color",
			"border"
		]
	},
	{
		name: "MatChip",
		tag: "mat-chip",
		aliases: [],
		defaults: [
			"variant",
			"elevated",
			"selected",
			"hideSelectedIcon",
			"removeIcon",
			"value",
			"disabled",
			"color",
			"type"
		]
	},
	{
		name: "MatChipSet",
		tag: "mat-chip-set",
		aliases: [],
		defaults: ["layout", "selection"]
	},
	{
		name: "MatRadio",
		tag: "mat-radio",
		aliases: [],
		defaults: [
			"value",
			"disabled",
			"color"
		]
	},
	{
		name: "MatRadioGroup",
		tag: "mat-radio-group",
		aliases: [],
		defaults: [
			"label",
			"disabled",
			"color"
		]
	},
	{
		name: "MatSwitch",
		tag: "mat-switch",
		aliases: [],
		defaults: [
			"icons",
			"disabled",
			"color"
		]
	},
	{
		name: "MatSlider",
		tag: "mat-slider",
		aliases: [],
		defaults: [
			"min",
			"max",
			"step",
			"variant",
			"center",
			"disabled",
			"color",
			"orientation",
			"size",
			"insetIcon",
			"showStopIndicator",
			"showValueIndicator"
		]
	},
	{
		name: "MatRangeSlider",
		tag: "mat-range-slider",
		aliases: [],
		defaults: [
			"min",
			"max",
			"step",
			"disabled",
			"color",
			"orientation",
			"size",
			"showStopIndicator",
			"showValueIndicator",
			"ariaLabelStart",
			"ariaLabelEnd"
		]
	},
	{
		name: "MatTextField",
		tag: "mat-text-field",
		aliases: [],
		defaults: [
			"block",
			"label",
			"variant",
			"color",
			"supportingText",
			"errorText",
			"prefixText",
			"suffixText",
			"maxLength",
			"disabled",
			"readonly",
			"required",
			"error",
			"density",
			"type"
		]
	},
	{
		name: "MatSelect",
		tag: "mat-select",
		aliases: [],
		defaults: [
			"density",
			"block",
			"items",
			"multiple",
			"chips",
			"itemTitle",
			"itemValue",
			"itemSubtitle",
			"label",
			"variant",
			"color",
			"supportingText",
			"errorText",
			"prefixText",
			"suffixText",
			"disabled",
			"readonly",
			"required",
			"error",
			"placeholder",
			"selectionIndicator"
		]
	},
	{
		name: "MatTextarea",
		tag: "mat-textarea",
		aliases: [],
		defaults: [
			"block",
			"label",
			"variant",
			"color",
			"supportingText",
			"errorText",
			"prefixText",
			"suffixText",
			"maxLength",
			"disabled",
			"readonly",
			"required",
			"error",
			"autoGrow",
			"maxRows",
			"noResize",
			"rows"
		]
	},
	{
		name: "MatInputBase",
		tag: "mat-input-base",
		aliases: [],
		defaults: [
			"control",
			"disabled",
			"maxLength",
			"readonly",
			"required",
			"rows",
			"type"
		]
	},
	{
		name: "MatMenu",
		tag: "mat-menu",
		aliases: [],
		defaults: [
			"anchor",
			"offset",
			"variant",
			"color",
			"closeOnClick",
			"maxLength",
			"scrim"
		]
	},
	{
		name: "MatMenuGroup",
		tag: "mat-menu-group",
		aliases: [],
		defaults: ["label"]
	},
	{
		name: "MatMenuItem",
		tag: "mat-menu-item",
		aliases: [],
		defaults: [
			"disabled",
			"selected",
			"tooltip"
		]
	},
	{
		name: "MatDockedContainer",
		tag: "mat-docked-container",
		aliases: [],
		defaults: [
			"anchor",
			"offset",
			"width",
			"size",
			"headline",
			"variant",
			"color",
			"maxLength",
			"scrim"
		]
	},
	{
		name: "MatDialog",
		tag: "mat-dialog",
		aliases: [],
		defaults: [
			"fullScreen",
			"width",
			"attach",
			"scrim",
			"closeOnBack",
			"title",
			"content",
			"icon",
			"closeLabel",
			"color"
		]
	},
	{
		name: "MatBottomSheet",
		tag: "mat-bottom-sheet",
		aliases: [],
		defaults: [
			"variant",
			"breakpoint",
			"width",
			"attach",
			"scrim",
			"closeOnBack",
			"dragHandle",
			"collapseDragHandleLabel",
			"dragHandleLabel",
			"expandedDragHandleLabel",
			"draggable",
			"content",
			"containerColor",
			"shadow",
			"rounded"
		]
	},
	{
		name: "MatSideSheet",
		tag: "mat-side-sheet",
		aliases: [],
		defaults: [
			"variant",
			"breakpoint",
			"position",
			"width",
			"attach",
			"scrim",
			"closeOnBack",
			"draggable",
			"closable",
			"closeLabel",
			"title",
			"content",
			"containerColor"
		]
	},
	{
		name: "MatHover",
		tag: "mat-hover",
		aliases: [],
		defaults: [
			"disabled",
			"closeDelay",
			"openDelay",
			"target"
		]
	},
	{
		name: "MatContainer",
		tag: "mat-container",
		aliases: [],
		defaults: ["fluid"]
	},
	{
		name: "MatLayout",
		tag: "mat-layout",
		aliases: [],
		defaults: ["as"]
	},
	{
		name: "MatAside",
		tag: "mat-aside",
		aliases: [],
		defaults: [
			"as",
			"location",
			"app",
			"mode",
			"blockSize",
			"safeArea",
			"safeAreaSize",
			"placeholder",
			"placeholderSize",
			"bordered",
			"zIndex",
			"unmountOnClose",
			"modal",
			"attach",
			"transition",
			"scrimClass",
			"closeOnBack"
		]
	},
	{
		name: "MatSpacer",
		tag: "mat-spacer",
		aliases: [],
		defaults: []
	},
	{
		name: "MatTableWrapper",
		tag: "mat-table-wrapper",
		aliases: [],
		defaults: []
	},
	{
		name: "MatScrollArea",
		tag: "mat-scroll-area",
		aliases: [],
		defaults: [
			"orientation",
			"snap",
			"snapPadding",
			"shadowLength",
			"barWidth",
			"autoHideScrollbar",
			"dragScroll",
			"reachThreshold",
			"shadowOffset",
			"rounded",
			"noScrollPadding",
			"color"
		]
	},
	{
		name: "MatVirtualScroll",
		tag: "mat-virtual-scroll",
		aliases: ["MdeVirtualScroll", "mde-virtual-scroll"],
		defaults: [
			"items",
			"itemHeight",
			"estimatedItemHeight",
			"buffer",
			"itemKey",
			"as"
		]
	},
	{
		name: "MatLoading",
		tag: "mat-loading",
		aliases: [],
		defaults: [
			"containment",
			"size",
			"color",
			"progress"
		]
	},
	{
		name: "MatPullToRefresh",
		tag: "mat-pull-to-refresh",
		aliases: [],
		defaults: [
			"placeholder",
			"disabled",
			"triggerDistance",
			"size",
			"color",
			"containment"
		]
	},
	{
		name: "MatProgress",
		tag: "mat-progress",
		aliases: [],
		defaults: [
			"variant",
			"value",
			"max",
			"indeterminate",
			"size",
			"thickness",
			"shape",
			"waveMotion",
			"color"
		]
	},
	{
		name: "MatTooltip",
		tag: "mat-tooltip",
		aliases: [],
		defaults: [
			"content",
			"rich",
			"subhead",
			"target",
			"attach",
			"location",
			"openDelay",
			"closeDelay"
		]
	},
	{
		name: "MatSnackbar",
		tag: "mat-snackbar",
		aliases: [],
		defaults: [
			"text",
			"actionText",
			"closable",
			"closeLabel",
			"position",
			"duration"
		]
	},
	{
		name: "MatNotification",
		tag: "mat-notification",
		aliases: [],
		defaults: [
			"title",
			"text",
			"icon",
			"time",
			"actions",
			"closable",
			"closeLabel",
			"app",
			"position",
			"color"
		]
	},
	{
		name: "MatToolbar",
		tag: "mat-toolbar",
		aliases: [],
		defaults: [
			"variant",
			"position",
			"vibrant",
			"app",
			"attach",
			"placeholder",
			"bottomPlaceholder"
		]
	},
	{
		name: "MatPanes",
		tag: "mat-panes",
		aliases: [],
		defaults: ["resizable"]
	},
	{
		name: "MatPane",
		tag: "mat-pane",
		aliases: [],
		defaults: ["id", "resizeLabel"]
	},
	{
		name: "MatNavigationRail",
		tag: "mat-navigation-rail",
		aliases: [],
		defaults: [
			"width",
			"fullWidth",
			"collapsible",
			"layout",
			"hideOnCollapse",
			"alignment",
			"openIcon",
			"closeIcon",
			"openLabel",
			"attach",
			"placeholder",
			"bordered",
			"containerColor",
			"safeArea",
			"safeAreaSize",
			"mode",
			"transition",
			"zIndex"
		]
	},
	{
		name: "MatNavigationRailItem",
		tag: "mat-navigation-rail-item",
		aliases: [],
		defaults: [
			"value",
			"icon",
			"badge",
			"href",
			"disabled"
		]
	},
	{
		name: "MatNavigationBar",
		tag: "mat-navigation-bar",
		aliases: [],
		defaults: [
			"alignment",
			"app",
			"attach",
			"placeholder",
			"height",
			"safeArea",
			"safeAreaSize",
			"bordered",
			"transition",
			"mode",
			"zIndex"
		]
	},
	{
		name: "MatNavigationBarItem",
		tag: "mat-navigation-bar-item",
		aliases: [],
		defaults: [
			"value",
			"icon",
			"badge",
			"href",
			"disabled"
		]
	},
	{
		name: "MatNavigationItem",
		tag: "mat-navigation-item",
		aliases: [],
		defaults: [
			"value",
			"icon",
			"badge",
			"href",
			"disabled",
			"componentName"
		]
	},
	{
		name: "MatNavigationDrawer",
		tag: "mat-navigation-drawer",
		aliases: [],
		defaults: [
			"width",
			"layout",
			"alignment",
			"attach",
			"placeholder",
			"bordered",
			"containerColor",
			"safeArea",
			"safeAreaSize",
			"mode"
		]
	},
	{
		name: "MatNavigationGroup",
		tag: "mat-navigation-group",
		aliases: [],
		defaults: ["title", "indent"]
	}
], a = /* @__PURE__ */ new Map();
function o(e) {
	return e.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join("");
}
i.forEach((e) => {
	let t = {
		exportName: e.name,
		localName: e.name
	};
	a.set(e.name, t), a.set(e.tag, t), e.aliases.forEach((t) => {
		a.set(t, {
			exportName: e.name,
			localName: o(t)
		});
	});
});
function s(e, t) {
	!e || typeof e != "object" || (e.type === 1 && typeof e.tag == "string" && t.add(e.tag), e.children?.forEach((e) => s(e, t)), e.branches?.forEach((e) => s(e, t)));
}
function c(e, t) {
	e && (e.type === "Identifier" ? t.add(e.name) : e.type === "ObjectPattern" ? e.properties.forEach((e) => {
		c(e.type === "RestElement" ? e.argument : e.value, t);
	}) : e.type === "ArrayPattern" ? e.elements.forEach((e) => c(e, t)) : e.type === "RestElement" ? c(e.argument, t) : e.type === "AssignmentPattern" && c(e.left, t));
}
function l(e, n) {
	if (!e) return /* @__PURE__ */ new Set();
	let r = [];
	(n === "ts" || n === "tsx") && r.push("typescript"), (n === "jsx" || n === "tsx") && r.push("jsx");
	try {
		let { program: n } = t(e, {
			sourceType: "module",
			plugins: r
		}), i = /* @__PURE__ */ new Set();
		return n.body.forEach((e) => {
			e.type === "ImportDeclaration" ? e.specifiers.forEach((e) => i.add(e.local.name)) : e.type === "VariableDeclaration" ? e.declarations.forEach((e) => c(e.id, i)) : (e.type === "FunctionDeclaration" || e.type === "ClassDeclaration") && e.id && i.add(e.id.name);
		}), i;
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function u(e, t) {
	let n = /* @__PURE__ */ new Map();
	return e.forEach(({ exportName: e, localName: r }) => {
		t.has(r) || n.has(r) || n.set(r, e === r ? e : `${e} as ${r}`);
	}), n.size === 0 ? null : `import { ${[...n.keys()].sort().map((e) => n.get(e)).join(", ")} } from 'mde-vue';`;
}
function d(e) {
	return e ? Array.isArray(e) ? e : [e] : null;
}
function f(e, t) {
	if (!e) return !1;
	let n = t.replaceAll("\\", "/");
	return e.some((e) => typeof e == "string" ? n.includes(e) : e.global ? new RegExp(e.source, e.flags).test(t) : e.test(t));
}
function p(t = {}) {
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("mdeVue 选项必须是对象");
	let i = d(t.include), o = d(t.exclude) ?? [/node_modules/];
	return {
		name: "mde-vue-auto-import",
		enforce: "pre",
		transform(t, c) {
			if (!c.endsWith(".vue") || f(o, c) || i && !f(i, c)) return null;
			let { descriptor: d, errors: p } = r(t, { filename: c });
			if (p.length || !d.template || d.template.src || d.template.lang || d.scriptSetup?.src || !d.scriptSetup && d.script?.src) return null;
			let m = n({
				source: d.template.content,
				filename: c,
				id: c
			});
			if (m.errors.length) return null;
			let h = /* @__PURE__ */ new Set();
			s(m.ast, h);
			let g = [...h].map((e) => a.get(e)).filter(Boolean);
			if (g.length === 0) return null;
			let _ = u(g, /* @__PURE__ */ new Set([...l(d.script?.content, d.script?.lang), ...l(d.scriptSetup?.content, d.scriptSetup?.lang)]));
			if (!_) return null;
			let v = new e(t);
			if (d.scriptSetup) v.appendLeft(d.scriptSetup.loc.start.offset, `${_}\n`);
			else {
				let e = d.script?.lang ? ` lang="${d.script.lang}"` : "";
				v.prepend(`<script setup${e}>\n${_}\n<\/script>\n\n`);
			}
			return {
				code: v.toString(),
				map: v.generateMap({ hires: !0 })
			};
		}
	};
}
//#endregion
export { p as default, p as mdeVue };
