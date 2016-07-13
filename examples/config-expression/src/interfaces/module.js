import Utils from "../helpers/utils";
import {moduleS} from "./store";
import PubSub from "./pubsub";

let Module = (function () {
	let modulePrivateData = new WeakMap();

	class Module extends PubSub {
		constructor(moduleName, uniqueId, path, lifeCycleFlags, instanceConfig, instanceData) {
			super();

			this.moduleName = moduleName;
			this.path = path;
			this.lifeCycleFlags = lifeCycleFlags;
			this.instanceConfig = instanceConfig;

			for (let key in instanceData) {
				this[key] = instanceData[key];
			}


			modulePrivateData.set(this, {
				moduleSubscriptions: [],
				uniqueId: uniqueId
			});
		}

		render(placeholderData) {
			const containerSelector = this.getUniqueId();
			let placeholders = placeholderData || this.instanceConfig.placeholders;

			let clonedPlaceholders = Object.assign({}, placeholders);

			clonedPlaceholders = Module.evalInContext(clonedPlaceholders, this);
			document.querySelector(`#${containerSelector}`).innerHTML = this.template(clonedPlaceholders);
		};

		getAllSubscriptions() {
			return modulePrivateData.get(this).moduleSubscriptions;
		};

		getUniqueId() {
			return modulePrivateData.get(this).uniqueId;
		};

		getParentInstanceId() {
			let path = this.path.split(".");

			path.pop();

			let parentPath = path.join("."),
				parent = moduleS.filter((module)=> {
					if (module.path === parentPath) {
						return module.getUniqueId()
					}
				});

			if (parent.length) {
				return parent[0].getUniqueId();
			} else {
				return "";
			}
		};

		getModuleContainer() {
			return `#${this.getUniqueId()}`;
		};

		getModuleName() {
			return this.moduleName;
		};

		getInstanceConfig() {
			return this.instanceConfig.placeholders;
		};

		getCSSSelector() {
			return Utils.getCSSSelector();
		};

		destroy() {

		};

		subscribe(subscription, eventName = subscription.eventName) {
			subscription.eventSubscriber = this.getModuleContainer();
			modulePrivateData.get(this).moduleSubscriptions.push(subscription);
			super.subscribe(subscription, eventName);
		};

		publish(eventName, message) {
			super.publish(eventName, message);
		};

		unsubscribe(eventName, callback) {
			super.unsubscribe(this.getModuleContainer(), eventName, callback);
		};

		static recursiveGetProperty(obj, callback) {
			for (let property in obj) {
				if (typeof obj[property] === "string") {
					obj[property] = callback(obj[property]);
				} else if (obj[property] instanceof Object) {
					recursiveGetProperty(obj[property], lookup, callback);
				}
			}
		}

		static evalInContext(placeholders, context) {
			let self = context;
			Module.recursiveGetProperty(placeholders, function(value){
				if(value.startsWith("self.")){
					let self = self;
					return eval(value);
				} else {
					return value;
				}
			});

			return placeholders;
		}

		static createModuleArena(module, compiledHTML) {
			// If compiledHTML is not provided, start creating dom element progressively.
			if (typeof compiledHTML !== "string") {
				document.querySelector(module.instanceConfig.container).innerHTML = `<div id="${module.getUniqueId()}"></div>`;
				return;
			}

			// If compiledHTML is provided, create page string.
			if (compiledHTML.trim() === "") {
				compiledHTML = `<div id="${module.getUniqueId()}"></div>`;
			} else {

			}

			return compiledHTML;
		}
	}

	return Module;
})();

export default Module
