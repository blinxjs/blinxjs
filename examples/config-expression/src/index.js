import {Promise} from "es6-promise";
import Utils from "./helpers/utils";
import Module from "./interfaces/module.js";
import {moduleS, isBrowser} from "./interfaces/store";

const
	evtKeepOn = "KEEP_ON",
	evtReplay = "RE_PLAY",
	evtPlayAfterRender = "PLAY_AFTER_RENDER",
	lifeCycleFlags = {
		booted: true,
		preRenderResolved: false,
		rendered: false
	};

// STEP:1
let _listenForInitOn = function (module) {

	if (module.instanceConfig.initOn && module.lifeCycleFlags.rendered) {
		return Promise.resolve(module.path);
	} else {
		return _callResolveRenderOn(module);
	}
};

// STEP:2
let _callResolveRenderOn = function (module) {
	if (module.resolveRenderOn) {

		// if()

		return module.resolveRenderOn().then((res)=> {
			module.lifeCycleFlags.preRenderResolved = true;
			return _lockEvents(module, res);
		});

	} else {
		return _lockEvents(module);
	}

};

// STEP:3 [Hot events]
let _lockEvents = function (module, placeholderResponse) {

	module.instanceConfig.listensTo && module.instanceConfig.listensTo.length && module.instanceConfig.listensTo.filter((evt)=> {
		if (evt.type === evtPlayAfterRender || !evt.type) {
			return evt;
		}
	}).forEach((listener) => {
		module.subscribe({
			eventName: listener.eventName,
			callback: module[listener.callback],
			context: module,
			eventPublisher: listener.eventPublisher,
			once: listener.once
		});
	});

	return _callRender(module, placeholderResponse);
};

// STEP:4
let _callRender = function (module, placeholderResponse) {
	// if initOn is present exec below steps on initOn
	// exec resolveRenderOn (if available)
	// exec render after resolveRenderOn completes
	// throw error is render and template are not provided
	console.log("_callRender called for: " + module.moduleName);
	Module.createModuleArena(module);
	return new Promise((res, rej) => {
		// Null to be replaced with resolveRenderOn data

		let compiledHTML = module.render(placeholderResponse, compiledHTML);

		if (module.instanceConfig.onRenderCompelete) {
			module.onRenderCompelete();
		}

		res(module.path, compiledHTML);
		module.lifeCycleFlags.rendered = true;
	});
};

let _startExec = function (rootModules) {
	let compiledHTML;
	if (!rootModules) {
		rootModules = moduleS.filter((module) => {
			return module.path.split(".").length === 1;
		});

		if (isBrowser) {
			compiledHTML = undefined;
		}
	}

	rootModules.forEach((rootModule) => {
		// Render this module
		_listenForInitOn(rootModule)
			.then((resolvedPath) => {
				// Get module level
				let level = Utils.getLevelsFromPath(rootModule.path);

				// Find next level children
				let childModules = moduleS.filter((module) => {
					return (module.path.indexOf(`${resolvedPath}.`) > -1) && (Utils.getLevelsFromPath(module.path) === (level + 1));
				});

				// _startExec all next level children
				_startExec(childModules);
			});
	});
};

// Only for initON
let _registerSubscription = function (module) {

	module.instanceConfig.initOn && module.subscribe({
		eventName: module.instanceConfig.initOn.eventName,
		eventPublisher: module.instanceConfig.initOn.eventPublisher,
		context: module.instanceConfig,
		callback: Utils.partial(_callResolveRenderOn, module)
	});

	module.instanceConfig.listensTo &&
	module.instanceConfig.listensTo.length &&
	module.instanceConfig.listensTo.filter((evt)=> {
		if (evt.type === evtKeepOn || evt.type === evtReplay) {
			return evt;
		}
	})
		.forEach((listener) => {
			module.subscribe({
				eventName: listener.eventName,
				callback: module[listener.callback],
				context: module,
				eventPublisher: listener.eventPublisher,
				once: listener.once,
				type: listener.type
			});
		});

	return Promise.resolve(module.path);
};


let _registerModule = function (config, moduleName = config.moduleName, instance = config.instance, instanceConfig = config.instanceConfig, path = "") {
	//If root module
	if (!path) {
		path = moduleName;
		// Check if its already present in registered module.
		// If it is, give warning.
		// TODO: Add support to override config
		if (moduleS.findInstance(null, "moduleName", moduleName).length > 0) {
			console.warning(`Module (${moduleName}) is already registered at same path. Skipping...`);
			return;
		}
	}

	//If child modules
	if (path) {
		// Check if its already present in registered module.
		// If it is, give warning.
		if (moduleS.findInstance(path).length > 0) {
			console.warning(`Module (${moduleName}) is already registered at same path. Skipping...`);
			return;
		}
	}

	let moduleDetail = new Module(moduleName, Utils.getNextUniqueId(), path, lifeCycleFlags, instanceConfig, instance);

	// Store module
	moduleS.insertInstance(moduleDetail);
	_registerSubscription(moduleDetail);

	// Has child modules
	if (instance.config && instance.config.modules && instance.config.modules.length) {
		instance.config.modules.forEach((childModule) => {
			_registerModule(childModule, undefined, undefined, undefined, `${path}.${childModule.moduleName}`);
		});
	}
};

export function destroyModuleInstance(moduleName, context = window) {

	// Remove module DOM and unsubscribe ots events
	let moduleInstance = moduleS.findInstance(moduleName);
	moduleInstance.forEach((module)=> {

		let moduleSubscriptions = module.getAllSubscriptions();
		moduleSubscriptions.forEach(function (subscription) {
			module.unsubscribe(subscription.eventName, subscription.callback);
		});

		context.document.querySelector(`#${module.getUniqueId()}`).parentNode.remove();
	});

	// Remove module from store
	moduleS.deleteInstance(moduleName);

	// Remove child modules from store
	let children = moduleS.filter((module) => {
		if (module.path.indexOf(`${moduleName}.`) > -1) {
			return module;
		}
	});

	children.forEach((module)=> {
		moduleS.deleteInstance(module.moduleName);
	});
};

export function createInstance(config) {
	_registerModule(config, config.moduleName, config.instance, config.instanceConfig);
	return _startExec();
};

export default {
	createInstance,
	destroyModuleInstance
};
