import { createStore, combineReducers } from 'redux';
import {h, diff, patch} from "virtual-dom";
import parser from 'vdom-parser';

import DomHelper from "./dom";
import Utils from "./utils";
const $ = DomHelper.getDomNode;

let render = function () {

	var patcher = function () {
		this.containerNodeCache = this.containerNodeCache || document.querySelector(this.getModuleContainer() + " div");

		var containerCache = parser(this.containerNodeCache),
			nodeCache = parser(this.template(this.store.getState())),
			patches = diff(containerCache, nodeCache);

		this.containerNodeCache = patch(this.containerNodeCache, patches);
	};

	patcher = patcher.bind(this);
	window.requestAnimationFrame(function () {
		patcher();
	});
};


export default function (module) {
	let _overrideFn = new Function;

	if (module.onStatusChange) {
		_overrideFn = module.onStatusChange.bind(module);
	}

	return {

		onStatusChange: function (eventName) {


			_overrideFn(eventName);


			let onRender = (eventName === "LIFECYCLE:RESOLVE_RENDER_ON_CALLED");
			if (!onRender) return;


			let configPresent = Boolean(this.config);
			if (!configPresent) return;


			let reduxConfigPresent = Boolean(this.config.reduxConfig);
			if (!reduxConfigPresent) return;

			if(!this.reducers) return;
			this.render = new Function;

			this.store = createStore(combineReducers(this.reducers), this.config.reduxConfig.store, window.devToolsExtension ? window.devToolsExtension() : undefined);
			this.containerNodeCache = undefined;
			$(this.getModuleContainer()).setHtml("<div></div>");
			this.store.subscribe(render.bind(this));

			let self = this;
			Utils.each(this.config.reduxConfig.events, (evtDetail, key) => {
				Utils.each(evtDetail, (val) => {
					let selectors,
						publishFn;

					publishFn = function (e) {
						let target = $(e.currentTarget);
						var publishData = {
							type: val.type
						};

						if (val.extract) {
							Utils.each(val.extract, (eventType, key)=> {
								let fn = eventType.split("#");
								if (fn.length === 2) {
									publishData[key] = target[fn[0]](fn[1]);
								} else if (fn.length === 1) {
									publishData[key] = target[fn[0]]();
								}
							});
						}

						// If key press needs to be handled
						if (val.which) {
							if (val.which.indexOf(e.which) > -1) {
								self.store.dispatch(publishData);
							}
						} else {
							self.store.dispatch(publishData);
						}
					};

					// Id selector is not present, binf on conatiner
					if (val.selectors) {
						selectors = val.selectors.join(",");
					}

					if (!selectors) {
						$(this.getModuleContainer()).on(key, publishFn);
					} else {
						$(this.getModuleContainer()).on(key, selectors, publishFn);
					}
				});
			});

			render.call(this);
		}
	}
}
