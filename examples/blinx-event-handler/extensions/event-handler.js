import DomHelper from "./dom";
import Utils from "./utils";
const $ = DomHelper.getDomNode;


export default function (module) {
	let _overrideFn = new Function;

	if (module.onStatusChange) {
		_overrideFn = module.onStatusChange.bind(module);
	}

	return {

		onStatusChange: function (eventName) {
			_overrideFn(eventName);

			let onRender = (eventName === "LIFECYCLE:ON_RENDER_CALLED");
			if (!onRender) return;

			let configPresent = Boolean(this.config);
			if (!configPresent) return;

			let domEventConfigPresent = Boolean(this.config.domEvents);
			if (!domEventConfigPresent) return;

			let self = this;
			Utils.each(this.config.domEvents, (evtDetail, key) => {
				Utils.each(evtDetail, (val) => {
					let selectors,
						publishFn;

					publishFn = function (e) {
						let target = $(e.currentTarget);
						var publishData = {};

						if(val.extract){
							Utils.each(val.extract, (eventType, key)=>{
								let fn = eventType.split("#");
								if(fn.length === 2){
									publishData[key] = target[fn[0]](fn[1]);
								} else if (fn.length === 1){
									publishData[key] = target[fn[0]]();
								}
							});
						}

						// If key press needs to be handled
						if (val.which) {
							if (val.which.indexOf(e.which) > -1) {
								self[val.callback](publishData);
							}
						} else {
							self[val.callback](publishData);
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
		}
	}
}
