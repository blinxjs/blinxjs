/**This is the major framework file.
 * @exports {
 * 	createInstance: creates a new instance of the module.
 * 	destroyModuleInstance: destroys the module instance,
 * 	use: use it if you want to extend Blinx
 *
 * }
 */

import Utils from "./helpers/utils";
import _ from "./helpers/lodash.custom";
import Module from "./interfaces/module.js";
import {moduleS, middleWareFns} from "./interfaces/store";
import CONSTANTS from "./constants";

/**
 *
 * @param module [Object] Blinx module
 * @param eventName [string]
 * @private
 */
let _onBreath = function (module, eventName) {

	if (module[CONSTANTS.MODULE_EVENTS.onStatusChange]) {
		module[CONSTANTS.MODULE_EVENTS.onStatusChange](eventName);
	}
};

/**
 * Publishes the event when state of the module changes
 * @param moduleDetail [object] module
 * @param eventName [string]
 * @private
 */
let _emitLifeCycleEvent = function (moduleDetail, eventName) {

	moduleDetail.publish(`${moduleDetail.getModuleName()}${eventName}`, {
		moduleInstanceId: moduleDetail.getUniqueId()
	});
};

/**
 * This function resolves the Promise if initOn is true and module is already rendered. Refer {@link lifeCycleFlags} for
 * initial lifecycle values.
 * Calls {@link _callResolveRenderOn} if either case fails
 * @param {Module} module. The module to be rendered.
 * @returns {Promise}
 * @private
 */
let _listenForInitOn = function (module) {

	if (module.instanceConfig.initOn || module.lifeCycleFlags.rendered) {

		return Promise.resolve(module.path);
	} else {

		return _callResolveRenderOn(module);
	}
};

// STEP:2
/**
 *
 * @param {Module} module to be rendered.
 * @param {*} data the data to be passed to module while initialization
 * <p>Calls {@link Module.resolveRenderOn} method . This method is passed from the config for the module and after
 * resolveRenderOn is resolved, lifecycle status is changed to "preRenderResolved". The resolveRenderOn should return
 * {Promise}</p>
 * @private
 */
let _callResolveRenderOn = function (module, data) {

	Module.createModuleArena(module);

	if (module[CONSTANTS.MODULE_EVENTS.resolveRenderOn]) {

		let moduleResoved = module[CONSTANTS.MODULE_EVENTS.resolveRenderOn](data);
		if (moduleResoved && moduleResoved.then && typeof moduleResoved.then === "function") {

			let onPromiseComplete = (res)=> {
				module.lifeCycleFlags.preRenderResolved = true;
				_onBreath(module, CONSTANTS.onStatusChange_EVENTS.resolveRenderOnCalled);
				return _lockEvents(module, res);
			};

			return moduleResoved.then(onPromiseComplete).catch(onPromiseComplete);
		} else {

			_onBreath(module, CONSTANTS.onStatusChange_EVENTS.resolveRenderOnCalled);
			return _lockEvents(module, moduleResoved);
		}

	} else {

		_onBreath(module, CONSTANTS.onStatusChange_EVENTS.resolveRenderOnCalled);
		return _lockEvents(module, data);
	}
};

// STEP:3 [Hot events]
/**
 * Subscribes to all the events of type playAfterRender
 * @param {Module} module to be rendered.
 * @param placeholderResponse
 * @private
 */
let _lockEvents = function (module, placeholderResponse) {

	module.instanceConfig.listensTo && module.instanceConfig.listensTo.length && module.instanceConfig.listensTo.filter((evt)=> {

		if (evt.type === CONSTANTS.EVENT_ENUM.playAfterRender || !evt.type) {

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

	_onBreath(module, CONSTANTS.onStatusChange_EVENTS.listensToPlayAfterRenderSubscribed);
	return _callRender(module, placeholderResponse);
};

// STEP:4
/**
 * <p>Renders the module by calling {@link Module.createModuleArena}
 * Changes the life cycle flag to rendered thereafter.</p>
 * @param {Module} module to be rendered.
 * @param placeholderResponse
 * @returns {Promise}
 * @private
 */
let _callRender = function (module, placeholderResponse) {

	// if initOn is present exec below steps on initOn
	// exec resolveRenderOn (if available)
	// exec render after resolveRenderOn completes
	// throw error is render and template are not provided
	return new Promise((res, rej) => {
		// Null to be replaced with resolveRenderOn data

		let compiledHTML = module[CONSTANTS.MODULE_EVENTS.render](placeholderResponse, compiledHTML);
		module.lifeCycleFlags.rendered = true;
		_emitLifeCycleEvent(module, "_READY");
		_onBreath(module, CONSTANTS.onStatusChange_EVENTS.renderCalled);

		if (module[CONSTANTS.MODULE_EVENTS.onRenderComplete]) {

			module[CONSTANTS.MODULE_EVENTS.onRenderComplete]();
			_onBreath(module, CONSTANTS.onStatusChange_EVENTS.onRenderCompleteCalled);
		}

		res();

		// If there are any queued events , dequeue the events based on modules subscriptions
		module.dequeueEvents();
	});
};

/**
 *<p>Called after the module is registered. Responsible for rendering the module.
 * The rendering will wait till the event occurs if initOn option is provided. </p>
 * <p>This method contains four steps
 * <ul>
 *     <li>call resolveRenderOn method and wait for the promise to be resolved ({@link _callResolveRenderOn})</li>
 *     <li>subscribe to the events of type "playAfterRender"</li>
 *     <li>Render the module</li>
 * </ul>
 * </p>
 *
 * @recursive
 * @param rootModules {Array} The array of modules to be rendered. Initially list is taken from {@link moduleS}
 * @param promiseArr {Array} the array of promise objects
 * @private
 */
let _startExec = function (patchModules, promiseArr) {

	let rootModules = patchModules.filter((module) => {

		return !module.meta.parent.id;
	});

	if (!rootModules.length) {

		rootModules = [patchModules[0]];
	}

	rootModules.forEach((rootModule) => {

		// Render this module
		let moduleResolvePromise = new Promise(function (resolve, reject) {

			_listenForInitOn(rootModule)
				.then(() => {

					if(rootModule.meta.children && rootModule.meta.children.length) {
						rootModule.meta.children && rootModule.meta.children.forEach((module) => {
							if(!module.pointer.lifeCycleFlags.rendered) {
								_startExec([module.pointer], promiseArr);
							}
						})
					}
					resolve(rootModule.meta.id);
				});
		});

		promiseArr.push(moduleResolvePromise);
	});
};

/**
 *
 * @param module {Module} The Module generated by {@link _registerModule}. If the module listens to any event or if the
 * module is instantiated based on an event then module is made to subscribe all the events.
 * <p>initOn will have following properties
 * <ul>
 *     <li>eventName {String} The name of the event</li>
 *     <li>eventPublisher {String} [Optional] CSS selector of the publisher of the event to which the module is subscribing.
 *     The module listens to event from all the publishers if this field is not provided</li>
 *     <li>context {Object} [Optional] The context in which event is subscribed</li>
 *     <li>callback</li> {function} the callback method for the event
 * </ul>
 * </p>
 * <p>
 * listensTo {array} this is an array of objects (the events) to which the module subscribes
 * <ul>
 *     <li>eventName {String} The name of the event</li>
 *     <li>eventPublisher {String} [Optional] CSS selector of the publisher of the event to which the module is subscribing.
 *     The module listens to event from all the publishers if this field is not provided</li>
 *     <li>context {Object} [Optional] The context in which event is subscribed</li>
 *     <li>callback {function} the callback method for the event</li>
 *     <li>{boolean} [once = false] The callback of the function that can only be called one time if true. Repeated event publish
 *     will have no effect.</li>
 *     <li>[type= "PLAY_AFTER_RENDER"] {EVENT_ENUM} the type of the event </li>
 * </ul>
 * </p>
 * @returns {*}
 * @private
 */
let _registerSubscription = function (module) {

	module.instanceConfig.initOn && module.subscribe({
		eventName: module.instanceConfig.initOn.eventName,
		eventPublisher: module.instanceConfig.initOn.eventPublisher,
		context: module.instanceConfig,
		callback: Utils.partial(_callResolveRenderOn, module)
	});
	_onBreath(module, CONSTANTS.onStatusChange_EVENTS.initOnSubscribed);

	module.instanceConfig.listensTo &&
	module.instanceConfig.listensTo.length &&
	module.instanceConfig.listensTo.filter((evt)=> {

		if (evt.type === CONSTANTS.EVENT_ENUM.keepOn || evt.type === CONSTANTS.EVENT_ENUM.replay) {

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

	_onBreath(module, CONSTANTS.onStatusChange_EVENTS.keepOnReplaySubscribed);
};

/**
 *
 * @param config {Object} The configuration of the module to be created. Creates instance of {@link Module} and keeps it
 * in {@link Store}.If the module has child modules then the child modules too will be registered.
 * <p>It must contain following properties
 * <ul style="list-style: none;">
 * <li>1. moduleName {String} The unique name in the workspace of the module
 * <li>2. module {Object}: It is the reference of module to be consumed
 * <li>3. instanceConfig {Object}: the configuration to be passed for that particular module. It must contain following
 * properties:
 *        <ul>
 *         <li>placeholders {Object}
 *         <li>container {String} Css selector of the container element. This should be unique.
 *         <li>listensTo {Array} [Optional] the list of events that the module will listen to.
 *         </ul>
 * </ul>
 * </p>
 * <p>If the module has already been registered on the same path then registration would be skipped and a warning will
 * be generated.</p>
 * <p></p>
 * @param  {String} [moduleName = config.moduleName] The unique name in the workspace of the module
 * @param {Object}[instance = config.module]
 * @param {Object}[instanceConfig = config.instanceConfig]
 * @param {String}[path=""]
 * @private
 */
let _registerModule = function (moduleName, config, instance = config.module, instanceConfig = config.instanceConfig, patchModuleArray = [], parent, parentMeta = parent && parent.meta) {

	if(typeof parent === "string"){
		parent = moduleS.find(function (module) {

			return module.name === parent;
		});
		parentMeta = parent && parent.meta;
	}

	let parentName = config.name ? config.name.split(".") : undefined,
		foundModules;

	if(parent && parent.instanceConfig && parent.instanceConfig.modules && parent.instanceConfig.modules.length) {

		let configFromParent = parent.instanceConfig.modules.filter(function(parentSibling) {
			return parentSibling.moduleName === moduleName;
		});

		if(configFromParent && configFromParent.length) {
			let parentInstance = configFromParent[0].instanceConfig || {};
			instanceConfig.placeholders = parentInstance.placeholders || instanceConfig.placeholders;
			instanceConfig.listensTo = parentInstance.listensTo || instanceConfig.listensTo;
		}
	}

	if(instanceConfig.placeholders && instance && instance.config && instance.config.placeholders){
		instanceConfig.placeholders = _.merge(instance.config.placeholders, instanceConfig.placeholders);
	}

	if (this instanceof Module) {

		let parentId = this.getUniqueId();
		foundModules = moduleS.filter((module) => {

			return module.meta.id === parentId;
		});
	} else if (!parent && parentName && parentName.length === 2) {

		foundModules = moduleS.filter((module) => {

			return module.name === parentName[0];
		});
	}

	if (foundModules && foundModules.length) {

		parent = foundModules[0];
		parentMeta = parent.meta;
	}

	let meta = {
		id: Utils.getNextUniqueId(),
		parent: {
			id: parentMeta && parentMeta.id ? parentMeta.id : undefined,
			pointer: parent
		},
		children: [],
		siblings: parentMeta ? [].concat(parentMeta.children) : []
	};

	let moduleDetail = new Module(config.name, moduleName, CONSTANTS.lifeCycleFlags, instanceConfig, instance, meta);

	// Store module
	moduleS.insertInstance(moduleDetail);
	patchModuleArray.push(moduleDetail);
	_registerSubscription(moduleDetail);

	_emitLifeCycleEvent(moduleDetail, "_CREATED");
	_onBreath(moduleDetail, CONSTANTS.onStatusChange_EVENTS.onCreate);

	if (parentMeta) {

		meta.siblings = [].concat(parentMeta.children);
		parentMeta.children.push({
			id: meta.id,
			pointer: moduleDetail
		});
	}

	// Has child modules
	if (instance.config && instance.config.modules && instance.config.modules.length) {

		instance.config.modules.forEach((childModule) => {

			_registerModule(childModule.moduleName, childModule, childModule.module, childModule.instanceConfig, patchModuleArray, moduleDetail);
		});
	} else {

		return patchModuleArray;
	}
};

/**
 *
 * Destroys the module . Does the following
 * <ul>
 *     <li>removed DOM element</li>
 *     <li> Unsubscribes events.It calls {@link Module.unsubscribe}</li>
 *     <li> Removes the entry of module from module store </li>
 *     <li> Removes the entry of child modules from module store </li>
 * </ul>
 * @param moduleName {string} The name of the module to be destroyed
 * @param [context = window] {object} @todo . Reserved for future enhancement
 * @returns {boolean} true when module gets deleted successfully
 */
export function destroyModuleInstance(module, context = window) {
	/// Remove module DOM and unsubscribe its events
	let moduleInstance;
	if(typeof module === "string"){
		moduleInstance = moduleS.findInstance(module);
	} else if(module.meta){
		moduleInstance = moduleS.findInstance(module.meta.id);
	} else {
		moduleInstance = moduleS.findInstance(null, module.name);
	}

	moduleInstance.forEach((module)=> {

		//Call detroy of module
		if(module[CONSTANTS.MODULE_EVENTS.destroy]){
			module[CONSTANTS.MODULE_EVENTS.destroy]();
		}

		let container = context.document.querySelector(`#${module.getUniqueId()}`);

		// Remove element from DOM
		if(container){
			container.remove();
		}

		// Remove all subscriptions
		let moduleSubscriptions = module.getAllSubscriptions();
		moduleSubscriptions.forEach(function (subscription) {
			module.unsubscribe(subscription.eventName, subscription.callback);
		});


		if(module.meta.children && module.meta.children.length){

			let childPointers = module.meta.children.map((child)=>{
				return child.pointer;
			});

			module.meta.children = [];

			childPointers.forEach((childNode)=>{
				destroyModuleInstance(childNode);
			});
		}

		moduleS.deleteInstance(module.meta.id);
	});

	return true;
}

/**
 *
 * @param config {Object} The configuration of the module to be created. It must contain following properties
 * <ul style="list-style: none;">
 * <li>1. moduleName {String} The unique name in the workspace of the module
 * <li>2. module {Object}: It is the reference of module to be consumed
 * <li>3. instanceConfig: the configuration to be passed for that particular module. It must contain following properties:
 *        <ul>
 *         <li>placeholders {Object}
 *         <li>container {String} Css selector of the container element. This should be unique.
 *         <li>listensTo {Array} [Optional] the list of events that the module will listen to.
 *         </ul>
 * </ul>
 * @returns {Promise|undefined} Resolves when all the modules are rendered.
 */
export function createInstance(config, parentName) {
	config = _.merge({}, config);

	if(!Utils.configValidator(config)) return;

	let modulesToDestory = moduleS.filter((moduleInstance)=>{
		return moduleInstance.instanceConfig.container === config.instanceConfig.container;
	});

	modulesToDestory.forEach((moduleInstance)=>{
		destroyModuleInstance(moduleInstance);
	});

	let moduleResolvePromiseArr = [],
		promise,
		patchModules = [];

	_registerModule.call(this, config.moduleName, config, config.module, config.instanceConfig, patchModules, parentName);
	_startExec.call(this, patchModules, moduleResolvePromiseArr);

	return new Promise((res, rej)=> {
		Promise.all(moduleResolvePromiseArr).then(res).catch(rej)
	});
}


export function use(middleware) {
	middleWareFns.push(middleware);
}

export let destroyInstance = destroyModuleInstance;

export default {
	createInstance,
	destroyInstance,
	destroyModuleInstance, // Deprecated
	use
};
