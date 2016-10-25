(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Truss"] = factory();
	else
		root["Truss"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PubSubHelper = undefined;

	var _pubsub = __webpack_require__(4);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _blinx = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PubSubHelper = exports.PubSubHelper = new _pubsub2.default();

	/**
	 * @
	 */
	exports.default = {
	  createInstance: _blinx.createInstance,
	  destroyInstance: _blinx.destroyInstance,
	  destroyModuleInstance: _blinx.destroyModuleInstance,
	  use: _blinx.use
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var uniqueIdsTill = -1;

	function charsLeftIndex(string, chars) {
	    var index = -1,
	        length = string.length;

	    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	}

	function charsRightIndex(string, chars) {
	    var index = string.length;

	    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	}

	exports.default = {

	    getNextUniqueId: function getNextUniqueId() {
	        return 'UIF-' + ++uniqueIdsTill;
	    },

	    pick: function pick(obj, arr) {
	        var o = {};
	        arr.forEach(function (key) {
	            o[key] = obj[key];
	        });

	        return o;
	    },

	    length: function length(obj) {
	        if (Array.isArray(obj)) {
	            return obj.length;
	        } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
	            return Object.keys(obj).length;
	        } else if (typeof obj === "string") {
	            return obj.length;
	        } else {
	            return 0;
	        }
	    },

	    trim: function trim(string, chars) {
	        return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
	    },

	    clearSlashes: function clearSlashes(string) {
	        return this.trim(string, "/");
	    },

	    partial: function partial(fn /*, args...*/) {
	        // A reference to the Array#slice method.
	        var slice = Array.prototype.slice;
	        // Convert arguments object to an array, removing the first argument.
	        var args = slice.call(arguments, 1);

	        return function () {
	            // Invoke the originally-specified function, passing in all originally-
	            // specified arguments, followed by any just-specified arguments.
	            return fn.apply(this, args.concat(slice.call(arguments, 0)));
	        };
	    },

	    getCSSSelector: function getCSSSelector(instanceConfig, moduleStore) {

	        try {
	            var cssSelector = "" + instanceConfig.instanceConfig.container;

	            var tempParent = instanceConfig.meta.parent && instanceConfig.meta.parent.pointer ? instanceConfig.meta.parent.pointer : undefined;

	            while (tempParent) {
	                cssSelector = tempParent.instanceConfig.container + " " + cssSelector;
	                tempParent = tempParent.parent && tempParent.parent.pointer ? tempParent.parent.pointer.meta.id : undefined;
	            }

	            return cssSelector;
	        } catch (err) {
	            return "";
	        }
	    },

	    configValidator: function configValidator(config) {
	        var isValid = true;

	        if (!config) {
	            console.error("Config is mandatory to create instance of any module.");
	            isValid = false;
	        }

	        if (!config.moduleName) {
	            console.error("moduleName property on config is require field to create instance of any module.");
	            isValid = false;
	        }

	        if (typeof config.moduleName !== "string") {
	            console.error("moduleName property on config should be string.");
	            isValid = false;
	        }

	        if (!config.module || _typeof(config.module) !== "object") {
	            console.error("module property on config is mandatory and should be object");
	            isValid = false;
	        }

	        if (!config.instanceConfig || config.instanceConfig && !config.instanceConfig.container) {
	            console.error("instanceConfig property and instanceConfig.container is mandatory");
	            isValid = false;
	        }

	        if (!isValid) {
	            console.dirxml(config);
	        }

	        return isValid;
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var moduleS = _extends([], {
		/**
	  * inserts the instance into the module store
	  * @param instance  of {@link Module}
	  */
		insertInstance: function insertInstance(instance) {
			this.push(instance);
		},

		/**
	  * deletes the instance of the module. Removes the entry from the module store
	  * instance  of {@link Module}
	  * @param id
	  */
		deleteInstance: function deleteInstance(id) {

			for (var i = this.length - 1; i >= 0; i--) {
				if (this[i].meta.id === id) {
					this.splice(i, 1);
					break;
				}
			}
		},

		/**
	  * Finds all the instances of the module from the module store
	  * @param name of the module to be searched
	  * @returns {Array} of all the instances of the module
	  */
		findInstance: function findInstance(id, name) {
			if (id) {
				return this.filter(function (module) {
					if (module.meta.id === id) {
						return module;
					}
				});
			} else if (name) {
				return this.filter(function (module) {
					if (module.name === name) {
						return module;
					}
				});
			} else {
				return [];
			}
		}
	});

	/**
	 * {@todo reserved for future use}
	 * @type {boolean}
	 */
	var isBrowser = typeof window !== "undefined";

	/**
	 * {@todo reserved for future use}
	 * @type {boolean}
	 */
	var isServer = !isBrowser;

	/**
	 * To be used by {@link pubsub}
	 * {Object} List of all the subscriptions of all the events. Present in the format {"eventName": {subscription object}}
	 */
	var subscriptions = {};

	/**
	 *
	 * @type {{store: Array}}
	 */
	var eventQ = { store: [] };

	var middleWareFns = [];

	/**
	 * @module
	 */
	exports.isBrowser = isBrowser;
	exports.subscriptions = subscriptions;
	exports.moduleS = moduleS;
	exports.isServer = isServer;
	exports.eventQ = eventQ;
	exports.middleWareFns = middleWareFns;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.destroyInstance = undefined;
	exports.destroyModuleInstance = destroyModuleInstance;
	exports.createInstance = createInstance;
	exports.use = use;

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _lodash = __webpack_require__(6);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _module = __webpack_require__(7);

	var _module2 = _interopRequireDefault(_module);

	var _store = __webpack_require__(2);

	var _constants = __webpack_require__(5);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param module [Object] Blinx module
	 * @param eventName [string]
	 * @private
	 */
	var _onBreath = function _onBreath(module, eventName) {

		if (module[_constants2.default.MODULE_EVENTS.onStatusChange]) {
			module[_constants2.default.MODULE_EVENTS.onStatusChange](eventName);
		}
	};

	/**
	 * Publishes the event when state of the module changes
	 * @param moduleDetail [object] module
	 * @param eventName [string]
	 * @private
	 */
	/**This is the major framework file.
	 * @exports {
	 * 	createInstance: creates a new instance of the module.
	 * 	destroyModuleInstance: destroys the module instance,
	 * 	use: use it if you want to extend Blinx
	 *
	 * }
	 */

	var _emitLifeCycleEvent = function _emitLifeCycleEvent(moduleDetail, eventName) {

		moduleDetail.publish("" + moduleDetail.getModuleName() + eventName, {
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
	var _listenForInitOn = function _listenForInitOn(module) {

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
	var _callResolveRenderOn = function _callResolveRenderOn(module, data) {

		_module2.default.createModuleArena(module);

		if (module[_constants2.default.MODULE_EVENTS.resolveRenderOn]) {

			var moduleResoved = module[_constants2.default.MODULE_EVENTS.resolveRenderOn](data);
			if (moduleResoved && moduleResoved.then && typeof moduleResoved.then === "function") {

				var onPromiseComplete = function onPromiseComplete(res) {
					module.lifeCycleFlags.preRenderResolved = true;
					_onBreath(module, _constants2.default.onStatusChange_EVENTS.resolveRenderOnCalled);
					return _lockEvents(module, res);
				};

				return moduleResoved.then(onPromiseComplete).catch(onPromiseComplete);
			} else {

				_onBreath(module, _constants2.default.onStatusChange_EVENTS.resolveRenderOnCalled);
				return _lockEvents(module, moduleResoved);
			}
		} else {

			_onBreath(module, _constants2.default.onStatusChange_EVENTS.resolveRenderOnCalled);
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
	var _lockEvents = function _lockEvents(module, placeholderResponse) {

		module.instanceConfig.listensTo && module.instanceConfig.listensTo.length && module.instanceConfig.listensTo.filter(function (evt) {

			if (evt.type === _constants2.default.EVENT_ENUM.playAfterRender || !evt.type) {

				return evt;
			}
		}).forEach(function (listener) {

			module.subscribe({
				eventName: listener.eventName,
				callback: module[listener.callback],
				context: module,
				eventPublisher: listener.eventPublisher,
				once: listener.once
			});
		});

		_onBreath(module, _constants2.default.onStatusChange_EVENTS.listensToPlayAfterRenderSubscribed);
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
	var _callRender = function _callRender(module, placeholderResponse) {

		// if initOn is present exec below steps on initOn
		// exec resolveRenderOn (if available)
		// exec render after resolveRenderOn completes
		// throw error is render and template are not provided
		return new Promise(function (res, rej) {
			// Null to be replaced with resolveRenderOn data

			var compiledHTML = module[_constants2.default.MODULE_EVENTS.render](placeholderResponse, compiledHTML);
			module.lifeCycleFlags.rendered = true;
			_emitLifeCycleEvent(module, "_READY");

			_onBreath(module, _constants2.default.onStatusChange_EVENTS.renderCalled);

			if (module[_constants2.default.MODULE_EVENTS.onRenderComplete]) {

				module[_constants2.default.MODULE_EVENTS.onRenderComplete]();
				_onBreath(module, _constants2.default.onStatusChange_EVENTS.onRenderCompleteCalled);
			}

			res();
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
	var _startExec = function _startExec(patchModules, promiseArr) {

		var rootModules = patchModules.filter(function (module) {

			return !module.meta.parent.id;
		});

		if (!rootModules.length) {

			rootModules = [patchModules[0]];
		}

		rootModules.forEach(function (rootModule) {

			// Render this module
			var moduleResolvePromise = new Promise(function (resolve, reject) {

				_listenForInitOn(rootModule).then(function () {

					if (rootModule.meta.children && rootModule.meta.children.length) {
						rootModule.meta.children && rootModule.meta.children.forEach(function (module) {
							if (!module.pointer.lifeCycleFlags.rendered) {
								_startExec([module.pointer], promiseArr);
							}
						});
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
	var _registerSubscription = function _registerSubscription(module) {

		module.instanceConfig.initOn && module.subscribe({
			eventName: module.instanceConfig.initOn.eventName,
			eventPublisher: module.instanceConfig.initOn.eventPublisher,
			context: module.instanceConfig,
			callback: _utils2.default.partial(_callResolveRenderOn, module)
		});
		_onBreath(module, _constants2.default.onStatusChange_EVENTS.initOnSubscribed);

		module.instanceConfig.listensTo && module.instanceConfig.listensTo.length && module.instanceConfig.listensTo.filter(function (evt) {

			if (evt.type === _constants2.default.EVENT_ENUM.keepOn || evt.type === _constants2.default.EVENT_ENUM.replay) {

				return evt;
			}
		}).forEach(function (listener) {

			module.subscribe({
				eventName: listener.eventName,
				callback: module[listener.callback],
				context: module,
				eventPublisher: listener.eventPublisher,
				once: listener.once,
				type: listener.type
			});
		});

		_onBreath(module, _constants2.default.onStatusChange_EVENTS.keepOnReplaySubscribed);
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
	var _registerModule = function _registerModule(moduleName, config) {
		var instance = arguments.length <= 2 || arguments[2] === undefined ? config.module : arguments[2];
		var instanceConfig = arguments.length <= 3 || arguments[3] === undefined ? config.instanceConfig : arguments[3];
		var patchModuleArray = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

		var _this = this;

		var parent = arguments[5];
		var parentMeta = arguments.length <= 6 || arguments[6] === undefined ? parent && parent.meta : arguments[6];


		var parentName = config.name ? config.name.split(".") : undefined,
		    foundModules = void 0;

		if (parent && parent.instanceConfig && parent.instanceConfig.modules && parent.instanceConfig.modules.length) {

			var configFromParent = parent.instanceConfig.modules.filter(function (parentSibling) {
				return parentSibling.moduleName === moduleName;
			});

			if (configFromParent && configFromParent.length) {
				var parentInstance = configFromParent[0].instanceConfig || {};
				instanceConfig.placeholders = parentInstance.placeholders || instanceConfig.placeholders;
				instanceConfig.listensTo = parentInstance.listensTo || instanceConfig.listensTo;
			}
		}

		if (instanceConfig.placeholders && instance && instance.config && instance.config.placeholders) {
			instanceConfig.placeholders = _lodash2.default.merge(instance.config.placeholders, instanceConfig.placeholders);
		}

		if (this instanceof _module2.default) {
			(function () {

				var parentId = _this.getUniqueId();
				foundModules = _store.moduleS.filter(function (module) {

					return module.meta.id === parentId;
				});
			})();
		} else if (!parent && parentName && parentName.length === 2) {

			foundModules = _store.moduleS.filter(function (module) {

				return module.name === parentName[0];
			});
		}

		if (foundModules && foundModules.length) {

			parent = foundModules[0];
			parentMeta = parent.meta;
		}

		var meta = {
			id: _utils2.default.getNextUniqueId(),
			parent: {
				id: parentMeta && parentMeta.id ? parentMeta.id : undefined,
				pointer: parent
			},
			children: [],
			siblings: parentMeta ? [].concat(parentMeta.children) : []
		};

		var moduleDetail = new _module2.default(config.name, moduleName, _constants2.default.lifeCycleFlags, instanceConfig, instance, meta);

		// Store module
		_store.moduleS.insertInstance(moduleDetail);
		patchModuleArray.push(moduleDetail);
		_registerSubscription(moduleDetail);

		_emitLifeCycleEvent(moduleDetail, "_CREATED");
		_onBreath(moduleDetail, _constants2.default.onStatusChange_EVENTS.onCreate);

		if (parentMeta) {

			meta.siblings = [].concat(parentMeta.children);
			parentMeta.children.push({
				id: meta.id,
				pointer: moduleDetail
			});
		}

		// Has child modules
		if (instance.config && instance.config.modules && instance.config.modules.length) {

			instance.config.modules.forEach(function (childModule) {

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
	function destroyModuleInstance(module) {
		var context = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];

		/// Remove module DOM and unsubscribe its events
		var moduleInstance = void 0;
		if (typeof module === "string") {
			moduleInstance = _store.moduleS.findInstance(module);
		} else if (module.meta) {
			moduleInstance = _store.moduleS.findInstance(module.meta.id);
		} else {
			moduleInstance = _store.moduleS.findInstance(null, module.name);
		}

		moduleInstance.forEach(function (module) {

			//Call detroy of module
			if (module[_constants2.default.MODULE_EVENTS.destroy]) {
				module[_constants2.default.MODULE_EVENTS.destroy]();
			}

			var container = context.document.querySelector("#" + module.getUniqueId());

			// Remove element from DOM
			if (container) {
				container.remove();
			}

			// Remove all subscriptions
			var moduleSubscriptions = module.getAllSubscriptions();
			moduleSubscriptions.forEach(function (subscription) {
				module.unsubscribe(subscription.eventName, subscription.callback);
			});

			if (module.meta.children && module.meta.children.length) {

				var childPointers = module.meta.children.map(function (child) {
					return child.pointer;
				});

				module.meta.children = [];

				childPointers.forEach(function (childNode) {
					destroyModuleInstance(childNode);
				});
			}

			_store.moduleS.deleteInstance(module.meta.id);
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
	function createInstance(config) {
		config = _lodash2.default.merge({}, config);

		if (!_utils2.default.configValidator(config)) return;

		var modulesToDestory = _store.moduleS.filter(function (moduleInstance) {
			return moduleInstance.instanceConfig.container === config.instanceConfig.container;
		});

		modulesToDestory.forEach(function (moduleInstance) {
			destroyModuleInstance(moduleInstance);
		});

		var moduleResolvePromiseArr = [],
		    promise = void 0,
		    patchModules = [];

		_registerModule.call(this, config.moduleName, config, config.module, config.instanceConfig, patchModules);
		_startExec.call(this, patchModules, moduleResolvePromiseArr);

		return new Promise(function (res, rej) {
			Promise.all(moduleResolvePromiseArr).then(res).catch(rej);
		});
	}

	function use(middleware) {
		_store.middleWareFns.push(middleware);
	}

	var destroyInstance = exports.destroyInstance = destroyModuleInstance;

	exports.default = {
		createInstance: createInstance,
		destroyInstance: destroyInstance,
		destroyModuleInstance: destroyModuleInstance, // Deprecated
		use: use
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _store = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var subscribeLogger = function subscribeLogger(eventName, subscription) {
	    console.group("Event Subscribed");
	    console.info(eventName);
	    console.dirxml(subscription);
	    console.groupEnd();
	};

	var publishLogger = function publishLogger(eventName, publishData) {
	    console.group("Event Published");
	    console.info(eventName);
	    console.dirxml(publishData);
	    console.groupEnd();
	};

	var unsubscribeLogger = function unsubscribeLogger(eventName, subscription) {
	    console.group("Event UnSubscribed");
	    console.info(eventName);
	    console.dirxml(subscription);
	    console.groupEnd();
	};

	/**
	 * @class
	 *
	 */

	var PubSub = function () {
	    function PubSub() {
	        _classCallCheck(this, PubSub);
	    }

	    _createClass(PubSub, [{
	        key: "subscribe",

	        /**
	         * Subscribes to the blinx event
	         * @param subscription {Object} the subscription object
	         * @param [eventName = subscription.eventName]
	         */
	        value: function subscribe(subscription) {
	            var eventName = arguments.length <= 1 || arguments[1] === undefined ? subscription.eventName : arguments[1];

	            if (!_store.subscriptions[eventName]) _store.subscriptions[eventName] = [];
	            var subscriptionData = _utils2.default.pick(subscription, ['callback', 'context', 'eventSubscriber', 'eventPublisher', 'once', 'type']);
	            _store.subscriptions[eventName].push(subscriptionData);
	            subscribeLogger(eventName, subscription);
	        }
	    }, {
	        key: "publish",

	        /**
	         * Publishes a blinx event
	         * @param eventName {string}
	         * @param message {string}
	         */
	        value: function publish(eventName, message) {
	            var publisher = "";
	            if (arguments.length === 3) {
	                publisher = arguments[0] || "";
	                eventName = arguments[1];
	                message = arguments[2];
	            } else {
	                publisher = _utils2.default.getCSSSelector(this);
	            }
	            var subscriptionsForEvent = _store.subscriptions[eventName],
	                remainingSubscriptions = [];

	            if (!subscriptionsForEvent) {
	                return;
	            }

	            publishLogger(eventName, {
	                eventName: eventName,
	                message: message,
	                publisher: publisher,
	                subscription: subscriptionsForEvent
	            });

	            // If any of the subscription is of type Replay
	            // Push the message to eventQ
	            var replaySubscriptions = subscriptionsForEvent.filter(function (subs) {
	                if (subs.type === "RE_PLAY") return subs;
	            });
	            if (replaySubscriptions.length) _store.eventQ.store.push({
	                eventName: eventName,
	                message: message,
	                publisher: publisher
	            });

	            subscriptionsForEvent && subscriptionsForEvent.length && subscriptionsForEvent.forEach(function (subscription) {

	                var callback = subscription.callback,
	                    context = subscription.context,
	                    subscribeOnce = subscription.once,
	                    subscriptionMatched = false;

	                if (subscription.eventPublisher) {
	                    var regex = new RegExp(subscription.eventPublisher + "$");
	                    if (regex.test(publisher)) {
	                        subscriptionMatched = true;
	                    } else {

	                        var actualPublisherHierarchy = publisher.split(' '),
	                            subscriptionPublisherHierarhcy = subscription.eventPublisher.split(' '),
	                            actualPublisherHierarchyLength = actualPublisherHierarchy.length,
	                            subscriptionPublisherHierarhcyLength = subscriptionPublisherHierarhcy.length;

	                        while (actualPublisherHierarchy.length && subscriptionPublisherHierarhcy.length) {

	                            actualPublisherHierarchyLength = actualPublisherHierarchy.length;
	                            subscriptionPublisherHierarhcyLength = subscriptionPublisherHierarhcy.length;

	                            if (actualPublisherHierarchy[actualPublisherHierarchyLength - 1] === subscriptionPublisherHierarhcy[subscriptionPublisherHierarhcyLength - 1]) {
	                                actualPublisherHierarchy.pop();
	                                subscriptionPublisherHierarhcy.pop();
	                            } else {
	                                actualPublisherHierarchy.pop();
	                            }
	                        }

	                        if (!subscriptionPublisherHierarhcy.length) {
	                            subscriptionMatched = true;
	                        }
	                    }
	                }

	                if (!subscription.eventPublisher || subscriptionMatched) {

	                    // If replay event: publish only after render is complete
	                    // If replay event: publish all the data matched from event queue
	                    var publishData = message;

	                    if (subscription.type === "RE_PLAY") {
	                        publishData = _store.eventQ.store.filter(function (evt) {
	                            if (evt.publisher === publisher && evt.eventName === eventName) {
	                                return evt;
	                            }
	                        }).map(function (evt) {
	                            return evt.message;
	                        });
	                    }

	                    callback.call(context ? context : null, publishData);
	                    if (subscribeOnce) {
	                        _store.subscriptions[eventName] = _store.subscriptions[eventName].filter(function (sub) {
	                            return sub.eventSubscriber !== subscription.eventSubscriber && sub.eventName !== subscription.eventName;
	                        });
	                    }
	                }
	            });
	        }
	    }, {
	        key: "unsubscribe",


	        /**
	         * unsubscribes a blinx event
	         * @param subscriber {Object} the reference of the module which had subscribed the event earlier
	         * @param eventName {string}
	         * @param callback {function} the callback method to be unsubscribed
	         */
	        value: function unsubscribe(subscriber, eventName, callback) {

	            var subscriptionsForEvent = _store.subscriptions[eventName];
	            if (!subscriptionsForEvent) {
	                return;
	            }

	            // Check if any RE_PLAY event is there and all the event context is of is same as
	            // destroy its data from eventQ
	            var replaySubscriptions = subscriptionsForEvent.filter(function (subscription) {
	                if (subscription.type === "RE_PLAY") return subscription;
	            });

	            _store.subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
	                return !(subscription.callback === callback && subscription.eventSubscriber === subscriber);
	            });

	            unsubscribeLogger(eventName, subscriptionsForEvent);

	            if (replaySubscriptions.length) {

	                if (!_store.subscriptions[eventName].length) {
	                    // Remove all the items from eventQ with eventName
	                    _store.eventQ.store = _store.eventQ.store.filter(function (evt) {
	                        if (evt.eventName !== eventName) return evt;
	                    });
	                }
	            }
	        }
	    }]);

	    return PubSub;
	}();

	exports.default = PubSub;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		EVENT_ENUM: {
			/**
	   * The event will be listened even when the module has not been rendered.
	   */
			keepOn: "KEEP_ON",
			/**
	   * Whenever this type of event is published, the module will receive all the past events along with the current event in the form of an array
	   */
			replay: "RE_PLAY",
			/**
	   * {@defaultvalue} If the event is of this type then the module starts listening
	   * to the event once the rendering completes.
	   */
			playAfterRender: "PLAY_AFTER_RENDER"
		},

		MODULE_EVENTS: {
			resolveRenderOn: "resolveRenderOn",
			render: "render",
			onRenderComplete: "onRenderComplete",
			onStatusChange: "__onStatusChange",
			destroy: "destroy"
		},

		onStatusChange_EVENTS: {
			onCreate: "LIFECYCLE:CREATED",
			keepOnReplaySubscribed: "LIFECYCLE:KEEP_ON_&_REPLAY_SUBSCRIBED",
			initOnSubscribed: "LIFECYCLE:INIT_ON_SUBSCRIBED",
			resolveRenderOnCalled: "LIFECYCLE:RESOLVE_RENDER_ON_CALLED",
			listensToPlayAfterRenderSubscribed: "LIFECYCLE:LISTENS_TO_PLAY_AFTER_RENDER_SUBSCRIBED",
			renderCalled: "LIFECYCLE:ON_RENDER_CALLED",
			onRenderCompleteCalled: "LIFECYCLE:ON_RENDER_CAOMPLETE_CALLED"
		},

		/**
	  * @readonly
	  * @private
	  * @constant {Object} lifeCycleFlags following fields
	  * <ul>
	  * <li>booted: true </li>
	  * <li>rendered: false</li>
	  * <li>preRenderResolved: false</li>
	  * </ul>
	  */
		lifeCycleFlags: {
			booted: true,
			preRenderResolved: false,
			rendered: false
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * @license
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash include="merge" exports="node"`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	;(function () {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** Used as the semantic version number. */
	  var VERSION = '4.15.0';

	  /** Used as the size to enable large array optimizations. */
	  var LARGE_ARRAY_SIZE = 200;

	  /** Used to stand-in for `undefined` hash values. */
	  var HASH_UNDEFINED = '__lodash_hash_undefined__';

	  /** Used as references for various `Number` constants. */
	  var MAX_SAFE_INTEGER = 9007199254740991;

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      genTag = '[object GeneratorFunction]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      promiseTag = '[object Promise]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      symbolTag = '[object Symbol]',
	      weakMapTag = '[object WeakMap]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      dataViewTag = '[object DataView]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /**
	   * Used to match `RegExp`
	   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	   */
	  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	  /** Used to match `RegExp` flags from their coerced string values. */
	  var reFlags = /\w*$/;

	  /** Used to detect host constructors (Safari). */
	  var reIsHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^(?:0|[1-9]\d*)$/;

	  /** Used to identify `toStringTag` values of typed arrays. */
	  var typedArrayTags = {};
	  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	  /** Used to identify `toStringTag` values supported by `_.clone`. */
	  var cloneableTags = {};
	  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

	  /** Detect free variable `self`. */
	  var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

	  /** Used as a reference to the global object. */
	  var root = freeGlobal || freeSelf || Function('return this')();

	  /** Detect free variable `exports`. */
	  var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = freeModule && freeModule.exports === freeExports;

	  /** Detect free variable `process` from Node.js. */
	  var freeProcess = moduleExports && freeGlobal.process;

	  /** Used to access faster Node.js helpers. */
	  var nodeUtil = function () {
	    try {
	      return freeProcess && freeProcess.binding('util');
	    } catch (e) {}
	  }();

	  /* Node.js helper references. */
	  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Adds the key-value `pair` to `map`.
	   *
	   * @private
	   * @param {Object} map The map to modify.
	   * @param {Array} pair The key-value pair to add.
	   * @returns {Object} Returns `map`.
	   */
	  function addMapEntry(map, pair) {
	    // Don't return `map.set` because it's not chainable in IE 11.
	    map.set(pair[0], pair[1]);
	    return map;
	  }

	  /**
	   * Adds `value` to `set`.
	   *
	   * @private
	   * @param {Object} set The set to modify.
	   * @param {*} value The value to add.
	   * @returns {Object} Returns `set`.
	   */
	  function addSetEntry(set, value) {
	    // Don't return `set.add` because it's not chainable in IE 11.
	    set.add(value);
	    return set;
	  }

	  /**
	   * A faster alternative to `Function#apply`, this function invokes `func`
	   * with the `this` binding of `thisArg` and the arguments of `args`.
	   *
	   * @private
	   * @param {Function} func The function to invoke.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {Array} args The arguments to invoke `func` with.
	   * @returns {*} Returns the result of `func`.
	   */
	  function apply(func, thisArg, args) {
	    switch (args.length) {
	      case 0:
	        return func.call(thisArg);
	      case 1:
	        return func.call(thisArg, args[0]);
	      case 2:
	        return func.call(thisArg, args[0], args[1]);
	      case 3:
	        return func.call(thisArg, args[0], args[1], args[2]);
	    }
	    return func.apply(thisArg, args);
	  }

	  /**
	   * A specialized version of `_.forEach` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEach(array, iteratee) {
	    var index = -1,
	        length = array ? array.length : 0;

	    while (++index < length) {
	      if (iteratee(array[index], index, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  /**
	   * Appends the elements of `values` to `array`.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {Array} values The values to append.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayPush(array, values) {
	    var index = -1,
	        length = values.length,
	        offset = array.length;

	    while (++index < length) {
	      array[offset + index] = values[index];
	    }
	    return array;
	  }

	  /**
	   * A specialized version of `_.reduce` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initAccum] Specify using the first element of `array` as
	   *  the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
	  function arrayReduce(array, iteratee, accumulator, initAccum) {
	    var index = -1,
	        length = array ? array.length : 0;

	    if (initAccum && length) {
	      accumulator = array[++index];
	    }
	    while (++index < length) {
	      accumulator = iteratee(accumulator, array[index], index, array);
	    }
	    return accumulator;
	  }

	  /**
	   * The base implementation of `_.times` without support for iteratee shorthands
	   * or max array length checks.
	   *
	   * @private
	   * @param {number} n The number of times to invoke `iteratee`.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the array of results.
	   */
	  function baseTimes(n, iteratee) {
	    var index = -1,
	        result = Array(n);

	    while (++index < n) {
	      result[index] = iteratee(index);
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `_.unary` without support for storing metadata.
	   *
	   * @private
	   * @param {Function} func The function to cap arguments for.
	   * @returns {Function} Returns the new capped function.
	   */
	  function baseUnary(func) {
	    return function (value) {
	      return func(value);
	    };
	  }

	  /**
	   * Gets the value at `key` of `object`.
	   *
	   * @private
	   * @param {Object} [object] The object to query.
	   * @param {string} key The key of the property to get.
	   * @returns {*} Returns the property value.
	   */
	  function getValue(object, key) {
	    return object == null ? undefined : object[key];
	  }

	  /**
	   * Checks if `value` is a host object in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	   */
	  function isHostObject(value) {
	    // Many host objects are `Object` objects that can coerce to strings
	    // despite having improperly defined `toString` methods.
	    var result = false;
	    if (value != null && typeof value.toString != 'function') {
	      try {
	        result = !!(value + '');
	      } catch (e) {}
	    }
	    return result;
	  }

	  /**
	   * Converts `map` to its key-value pairs.
	   *
	   * @private
	   * @param {Object} map The map to convert.
	   * @returns {Array} Returns the key-value pairs.
	   */
	  function mapToArray(map) {
	    var index = -1,
	        result = Array(map.size);

	    map.forEach(function (value, key) {
	      result[++index] = [key, value];
	    });
	    return result;
	  }

	  /**
	   * Creates a unary function that invokes `func` with its argument transformed.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {Function} transform The argument transform.
	   * @returns {Function} Returns the new function.
	   */
	  function overArg(func, transform) {
	    return function (arg) {
	      return func(transform(arg));
	    };
	  }

	  /**
	   * Converts `set` to an array of its values.
	   *
	   * @private
	   * @param {Object} set The set to convert.
	   * @returns {Array} Returns the values.
	   */
	  function setToArray(set) {
	    var index = -1,
	        result = Array(set.size);

	    set.forEach(function (value) {
	      result[++index] = value;
	    });
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  /** Used for built-in method references. */
	  var arrayProto = Array.prototype,
	      funcProto = Function.prototype,
	      objectProto = Object.prototype;

	  /** Used to detect overreaching core-js shims. */
	  var coreJsData = root['__core-js_shared__'];

	  /** Used to detect methods masquerading as native. */
	  var maskSrcKey = function () {
	    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	    return uid ? 'Symbol(src)_1.' + uid : '';
	  }();

	  /** Used to resolve the decompiled source of functions. */
	  var funcToString = funcProto.toString;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /** Used to infer the `Object` constructor. */
	  var objectCtorString = funcToString.call(Object);

	  /**
	   * Used to resolve the
	   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	   * of values.
	   */
	  var objectToString = objectProto.toString;

	  /** Used to detect if a method is native. */
	  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	  /** Built-in value references. */
	  var Buffer = moduleExports ? root.Buffer : undefined,
	      _Symbol = root.Symbol,
	      Uint8Array = root.Uint8Array,
	      getPrototype = overArg(Object.getPrototypeOf, Object),
	      objectCreate = Object.create,
	      propertyIsEnumerable = objectProto.propertyIsEnumerable,
	      splice = arrayProto.splice;

	  /* Built-in method references for those with the same name as other `lodash` methods. */
	  var nativeGetSymbols = Object.getOwnPropertySymbols,
	      nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	      nativeKeys = overArg(Object.keys, Object),
	      nativeMax = Math.max;

	  /* Built-in method references that are verified to be native. */
	  var DataView = getNative(root, 'DataView'),
	      Map = getNative(root, 'Map'),
	      Promise = getNative(root, 'Promise'),
	      Set = getNative(root, 'Set'),
	      WeakMap = getNative(root, 'WeakMap'),
	      nativeCreate = getNative(Object, 'create');

	  /** Used to lookup unminified function names. */
	  var realNames = {};

	  /** Used to detect maps, sets, and weakmaps. */
	  var dataViewCtorString = toSource(DataView),
	      mapCtorString = toSource(Map),
	      promiseCtorString = toSource(Promise),
	      setCtorString = toSource(Set),
	      weakMapCtorString = toSource(WeakMap);

	  /** Used to convert symbols to primitives and strings. */
	  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a `lodash` object which wraps `value` to enable implicit method
	   * chain sequences. Methods that operate on and return arrays, collections,
	   * and functions can be chained together. Methods that retrieve a single value
	   * or may return a primitive value will automatically end the chain sequence
	   * and return the unwrapped value. Otherwise, the value must be unwrapped
	   * with `_#value`.
	   *
	   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	   * enabled using `_.chain`.
	   *
	   * The execution of chained methods is lazy, that is, it's deferred until
	   * `_#value` is implicitly or explicitly called.
	   *
	   * Lazy evaluation allows several methods to support shortcut fusion.
	   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	   * the creation of intermediate arrays and can greatly reduce the number of
	   * iteratee executions. Sections of a chain sequence qualify for shortcut
	   * fusion if the section is applied to an array of at least `200` elements
	   * and any iteratees accept only one argument. The heuristic for whether a
	   * section qualifies for shortcut fusion is subject to change.
	   *
	   * Chaining is supported in custom builds as long as the `_#value` method is
	   * directly or indirectly included in the build.
	   *
	   * In addition to lodash methods, wrappers have `Array` and `String` methods.
	   *
	   * The wrapper `Array` methods are:
	   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	   *
	   * The wrapper `String` methods are:
	   * `replace` and `split`
	   *
	   * The wrapper methods that support shortcut fusion are:
	   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	   *
	   * The chainable wrapper methods are:
	   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	   * `zipObject`, `zipObjectDeep`, and `zipWith`
	   *
	   * The wrapper methods that are **not** chainable by default are:
	   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	   * `upperFirst`, `value`, and `words`
	   *
	   * @name _
	   * @constructor
	   * @category Seq
	   * @param {*} value The value to wrap in a `lodash` instance.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * function square(n) {
	   *   return n * n;
	   * }
	   *
	   * var wrapped = _([1, 2, 3]);
	   *
	   * // Returns an unwrapped value.
	   * wrapped.reduce(_.add);
	   * // => 6
	   *
	   * // Returns a wrapped value.
	   * var squares = wrapped.map(square);
	   *
	   * _.isArray(squares);
	   * // => false
	   *
	   * _.isArray(squares.value());
	   * // => true
	   */
	  function lodash() {}
	  // No operation performed.


	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a hash object.
	   *
	   * @private
	   * @constructor
	   * @param {Array} [entries] The key-value pairs to cache.
	   */
	  function Hash(entries) {
	    var index = -1,
	        length = entries ? entries.length : 0;

	    this.clear();
	    while (++index < length) {
	      var entry = entries[index];
	      this.set(entry[0], entry[1]);
	    }
	  }

	  /**
	   * Removes all key-value entries from the hash.
	   *
	   * @private
	   * @name clear
	   * @memberOf Hash
	   */
	  function hashClear() {
	    this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  }

	  /**
	   * Removes `key` and its value from the hash.
	   *
	   * @private
	   * @name delete
	   * @memberOf Hash
	   * @param {Object} hash The hash to modify.
	   * @param {string} key The key of the value to remove.
	   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	   */
	  function hashDelete(key) {
	    return this.has(key) && delete this.__data__[key];
	  }

	  /**
	   * Gets the hash value for `key`.
	   *
	   * @private
	   * @name get
	   * @memberOf Hash
	   * @param {string} key The key of the value to get.
	   * @returns {*} Returns the entry value.
	   */
	  function hashGet(key) {
	    var data = this.__data__;
	    if (nativeCreate) {
	      var result = data[key];
	      return result === HASH_UNDEFINED ? undefined : result;
	    }
	    return hasOwnProperty.call(data, key) ? data[key] : undefined;
	  }

	  /**
	   * Checks if a hash value for `key` exists.
	   *
	   * @private
	   * @name has
	   * @memberOf Hash
	   * @param {string} key The key of the entry to check.
	   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	   */
	  function hashHas(key) {
	    var data = this.__data__;
	    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	  }

	  /**
	   * Sets the hash `key` to `value`.
	   *
	   * @private
	   * @name set
	   * @memberOf Hash
	   * @param {string} key The key of the value to set.
	   * @param {*} value The value to set.
	   * @returns {Object} Returns the hash instance.
	   */
	  function hashSet(key, value) {
	    var data = this.__data__;
	    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	    return this;
	  }

	  // Add methods to `Hash`.
	  Hash.prototype.clear = hashClear;
	  Hash.prototype['delete'] = hashDelete;
	  Hash.prototype.get = hashGet;
	  Hash.prototype.has = hashHas;
	  Hash.prototype.set = hashSet;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates an list cache object.
	   *
	   * @private
	   * @constructor
	   * @param {Array} [entries] The key-value pairs to cache.
	   */
	  function ListCache(entries) {
	    var index = -1,
	        length = entries ? entries.length : 0;

	    this.clear();
	    while (++index < length) {
	      var entry = entries[index];
	      this.set(entry[0], entry[1]);
	    }
	  }

	  /**
	   * Removes all key-value entries from the list cache.
	   *
	   * @private
	   * @name clear
	   * @memberOf ListCache
	   */
	  function listCacheClear() {
	    this.__data__ = [];
	  }

	  /**
	   * Removes `key` and its value from the list cache.
	   *
	   * @private
	   * @name delete
	   * @memberOf ListCache
	   * @param {string} key The key of the value to remove.
	   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	   */
	  function listCacheDelete(key) {
	    var data = this.__data__,
	        index = assocIndexOf(data, key);

	    if (index < 0) {
	      return false;
	    }
	    var lastIndex = data.length - 1;
	    if (index == lastIndex) {
	      data.pop();
	    } else {
	      splice.call(data, index, 1);
	    }
	    return true;
	  }

	  /**
	   * Gets the list cache value for `key`.
	   *
	   * @private
	   * @name get
	   * @memberOf ListCache
	   * @param {string} key The key of the value to get.
	   * @returns {*} Returns the entry value.
	   */
	  function listCacheGet(key) {
	    var data = this.__data__,
	        index = assocIndexOf(data, key);

	    return index < 0 ? undefined : data[index][1];
	  }

	  /**
	   * Checks if a list cache value for `key` exists.
	   *
	   * @private
	   * @name has
	   * @memberOf ListCache
	   * @param {string} key The key of the entry to check.
	   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	   */
	  function listCacheHas(key) {
	    return assocIndexOf(this.__data__, key) > -1;
	  }

	  /**
	   * Sets the list cache `key` to `value`.
	   *
	   * @private
	   * @name set
	   * @memberOf ListCache
	   * @param {string} key The key of the value to set.
	   * @param {*} value The value to set.
	   * @returns {Object} Returns the list cache instance.
	   */
	  function listCacheSet(key, value) {
	    var data = this.__data__,
	        index = assocIndexOf(data, key);

	    if (index < 0) {
	      data.push([key, value]);
	    } else {
	      data[index][1] = value;
	    }
	    return this;
	  }

	  // Add methods to `ListCache`.
	  ListCache.prototype.clear = listCacheClear;
	  ListCache.prototype['delete'] = listCacheDelete;
	  ListCache.prototype.get = listCacheGet;
	  ListCache.prototype.has = listCacheHas;
	  ListCache.prototype.set = listCacheSet;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a map cache object to store key-value pairs.
	   *
	   * @private
	   * @constructor
	   * @param {Array} [entries] The key-value pairs to cache.
	   */
	  function MapCache(entries) {
	    var index = -1,
	        length = entries ? entries.length : 0;

	    this.clear();
	    while (++index < length) {
	      var entry = entries[index];
	      this.set(entry[0], entry[1]);
	    }
	  }

	  /**
	   * Removes all key-value entries from the map.
	   *
	   * @private
	   * @name clear
	   * @memberOf MapCache
	   */
	  function mapCacheClear() {
	    this.__data__ = {
	      'hash': new Hash(),
	      'map': new (Map || ListCache)(),
	      'string': new Hash()
	    };
	  }

	  /**
	   * Removes `key` and its value from the map.
	   *
	   * @private
	   * @name delete
	   * @memberOf MapCache
	   * @param {string} key The key of the value to remove.
	   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	   */
	  function mapCacheDelete(key) {
	    return getMapData(this, key)['delete'](key);
	  }

	  /**
	   * Gets the map value for `key`.
	   *
	   * @private
	   * @name get
	   * @memberOf MapCache
	   * @param {string} key The key of the value to get.
	   * @returns {*} Returns the entry value.
	   */
	  function mapCacheGet(key) {
	    return getMapData(this, key).get(key);
	  }

	  /**
	   * Checks if a map value for `key` exists.
	   *
	   * @private
	   * @name has
	   * @memberOf MapCache
	   * @param {string} key The key of the entry to check.
	   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	   */
	  function mapCacheHas(key) {
	    return getMapData(this, key).has(key);
	  }

	  /**
	   * Sets the map `key` to `value`.
	   *
	   * @private
	   * @name set
	   * @memberOf MapCache
	   * @param {string} key The key of the value to set.
	   * @param {*} value The value to set.
	   * @returns {Object} Returns the map cache instance.
	   */
	  function mapCacheSet(key, value) {
	    getMapData(this, key).set(key, value);
	    return this;
	  }

	  // Add methods to `MapCache`.
	  MapCache.prototype.clear = mapCacheClear;
	  MapCache.prototype['delete'] = mapCacheDelete;
	  MapCache.prototype.get = mapCacheGet;
	  MapCache.prototype.has = mapCacheHas;
	  MapCache.prototype.set = mapCacheSet;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a stack cache object to store key-value pairs.
	   *
	   * @private
	   * @constructor
	   * @param {Array} [entries] The key-value pairs to cache.
	   */
	  function Stack(entries) {
	    this.__data__ = new ListCache(entries);
	  }

	  /**
	   * Removes all key-value entries from the stack.
	   *
	   * @private
	   * @name clear
	   * @memberOf Stack
	   */
	  function stackClear() {
	    this.__data__ = new ListCache();
	  }

	  /**
	   * Removes `key` and its value from the stack.
	   *
	   * @private
	   * @name delete
	   * @memberOf Stack
	   * @param {string} key The key of the value to remove.
	   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	   */
	  function stackDelete(key) {
	    return this.__data__['delete'](key);
	  }

	  /**
	   * Gets the stack value for `key`.
	   *
	   * @private
	   * @name get
	   * @memberOf Stack
	   * @param {string} key The key of the value to get.
	   * @returns {*} Returns the entry value.
	   */
	  function stackGet(key) {
	    return this.__data__.get(key);
	  }

	  /**
	   * Checks if a stack value for `key` exists.
	   *
	   * @private
	   * @name has
	   * @memberOf Stack
	   * @param {string} key The key of the entry to check.
	   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	   */
	  function stackHas(key) {
	    return this.__data__.has(key);
	  }

	  /**
	   * Sets the stack `key` to `value`.
	   *
	   * @private
	   * @name set
	   * @memberOf Stack
	   * @param {string} key The key of the value to set.
	   * @param {*} value The value to set.
	   * @returns {Object} Returns the stack cache instance.
	   */
	  function stackSet(key, value) {
	    var cache = this.__data__;
	    if (cache instanceof ListCache) {
	      var pairs = cache.__data__;
	      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
	        pairs.push([key, value]);
	        return this;
	      }
	      cache = this.__data__ = new MapCache(pairs);
	    }
	    cache.set(key, value);
	    return this;
	  }

	  // Add methods to `Stack`.
	  Stack.prototype.clear = stackClear;
	  Stack.prototype['delete'] = stackDelete;
	  Stack.prototype.get = stackGet;
	  Stack.prototype.has = stackHas;
	  Stack.prototype.set = stackSet;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates an array of the enumerable property names of the array-like `value`.
	   *
	   * @private
	   * @param {*} value The value to query.
	   * @param {boolean} inherited Specify returning inherited property names.
	   * @returns {Array} Returns the array of property names.
	   */
	  function arrayLikeKeys(value, inherited) {
	    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	    // Safari 9 makes `arguments.length` enumerable in strict mode.
	    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

	    var length = result.length,
	        skipIndexes = !!length;

	    for (var key in value) {
	      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  /**
	   * This function is like `assignValue` except that it doesn't assign
	   * `undefined` values.
	   *
	   * @private
	   * @param {Object} object The object to modify.
	   * @param {string} key The key of the property to assign.
	   * @param {*} value The value to assign.
	   */
	  function assignMergeValue(object, key, value) {
	    if (value !== undefined && !eq(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
	      object[key] = value;
	    }
	  }

	  /**
	   * Assigns `value` to `key` of `object` if the existing value is not equivalent
	   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	   * for equality comparisons.
	   *
	   * @private
	   * @param {Object} object The object to modify.
	   * @param {string} key The key of the property to assign.
	   * @param {*} value The value to assign.
	   */
	  function assignValue(object, key, value) {
	    var objValue = object[key];
	    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
	      object[key] = value;
	    }
	  }

	  /**
	   * Gets the index at which the `key` is found in `array` of key-value pairs.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} key The key to search for.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function assocIndexOf(array, key) {
	    var length = array.length;
	    while (length--) {
	      if (eq(array[length][0], key)) {
	        return length;
	      }
	    }
	    return -1;
	  }

	  /**
	   * The base implementation of `_.assign` without support for multiple sources
	   * or `customizer` functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @returns {Object} Returns `object`.
	   */
	  function baseAssign(object, source) {
	    return object && copyObject(source, keys(source), object);
	  }

	  /**
	   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	   * traversed objects.
	   *
	   * @private
	   * @param {*} value The value to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @param {boolean} [isFull] Specify a clone including symbols.
	   * @param {Function} [customizer] The function to customize cloning.
	   * @param {string} [key] The key of `value`.
	   * @param {Object} [object] The parent object of `value`.
	   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	   * @returns {*} Returns the cloned value.
	   */
	  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	    var result;
	    if (customizer) {
	      result = object ? customizer(value, key, object, stack) : customizer(value);
	    }
	    if (result !== undefined) {
	      return result;
	    }
	    if (!isObject(value)) {
	      return value;
	    }
	    var isArr = isArray(value);
	    if (isArr) {
	      result = initCloneArray(value);
	      if (!isDeep) {
	        return copyArray(value, result);
	      }
	    } else {
	      var tag = getTag(value),
	          isFunc = tag == funcTag || tag == genTag;

	      if (isBuffer(value)) {
	        return cloneBuffer(value, isDeep);
	      }
	      if (tag == objectTag || tag == argsTag || isFunc && !object) {
	        if (isHostObject(value)) {
	          return object ? value : {};
	        }
	        result = initCloneObject(isFunc ? {} : value);
	        if (!isDeep) {
	          return copySymbols(value, baseAssign(result, value));
	        }
	      } else {
	        if (!cloneableTags[tag]) {
	          return object ? value : {};
	        }
	        result = initCloneByTag(value, tag, baseClone, isDeep);
	      }
	    }
	    // Check for circular references and return its corresponding clone.
	    stack || (stack = new Stack());
	    var stacked = stack.get(value);
	    if (stacked) {
	      return stacked;
	    }
	    stack.set(value, result);

	    if (!isArr) {
	      var props = isFull ? getAllKeys(value) : keys(value);
	    }
	    arrayEach(props || value, function (subValue, key) {
	      if (props) {
	        key = subValue;
	        subValue = value[key];
	      }
	      // Recursively populate clone (susceptible to call stack limits).
	      assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.create` without support for assigning
	   * properties to the created object.
	   *
	   * @private
	   * @param {Object} prototype The object to inherit from.
	   * @returns {Object} Returns the new object.
	   */
	  function baseCreate(proto) {
	    return isObject(proto) ? objectCreate(proto) : {};
	  }

	  /**
	   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	   * symbols of `object`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @param {Function} symbolsFunc The function to get the symbols of `object`.
	   * @returns {Array} Returns the array of property names and symbols.
	   */
	  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	    var result = keysFunc(object);
	    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	  }

	  /**
	   * The base implementation of `getTag`.
	   *
	   * @private
	   * @param {*} value The value to query.
	   * @returns {string} Returns the `toStringTag`.
	   */
	  function baseGetTag(value) {
	    return objectToString.call(value);
	  }

	  /**
	   * The base implementation of `_.isNative` without bad shim checks.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a native function,
	   *  else `false`.
	   */
	  function baseIsNative(value) {
	    if (!isObject(value) || isMasked(value)) {
	      return false;
	    }
	    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
	    return pattern.test(toSource(value));
	  }

	  /**
	   * The base implementation of `_.isTypedArray` without Node.js optimizations.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	   */
	  function baseIsTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	  }

	  /**
	   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function baseKeys(object) {
	    if (!isPrototype(object)) {
	      return nativeKeys(object);
	    }
	    var result = [];
	    for (var key in Object(object)) {
	      if (hasOwnProperty.call(object, key) && key != 'constructor') {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function baseKeysIn(object) {
	    if (!isObject(object)) {
	      return nativeKeysIn(object);
	    }
	    var isProto = isPrototype(object),
	        result = [];

	    for (var key in object) {
	      if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `_.merge` without support for multiple sources.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {number} srcIndex The index of `source`.
	   * @param {Function} [customizer] The function to customize merged values.
	   * @param {Object} [stack] Tracks traversed source values and their merged
	   *  counterparts.
	   */
	  function baseMerge(object, source, srcIndex, customizer, stack) {
	    if (object === source) {
	      return;
	    }
	    if (!(isArray(source) || isTypedArray(source))) {
	      var props = baseKeysIn(source);
	    }
	    arrayEach(props || source, function (srcValue, key) {
	      if (props) {
	        key = srcValue;
	        srcValue = source[key];
	      }
	      if (isObject(srcValue)) {
	        stack || (stack = new Stack());
	        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	      } else {
	        var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

	        if (newValue === undefined) {
	          newValue = srcValue;
	        }
	        assignMergeValue(object, key, newValue);
	      }
	    });
	  }

	  /**
	   * A specialized version of `baseMerge` for arrays and objects which performs
	   * deep merges and tracks traversed objects enabling objects with circular
	   * references to be merged.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {string} key The key of the value to merge.
	   * @param {number} srcIndex The index of `source`.
	   * @param {Function} mergeFunc The function to merge values.
	   * @param {Function} [customizer] The function to customize assigned values.
	   * @param {Object} [stack] Tracks traversed source values and their merged
	   *  counterparts.
	   */
	  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	    var objValue = object[key],
	        srcValue = source[key],
	        stacked = stack.get(srcValue);

	    if (stacked) {
	      assignMergeValue(object, key, stacked);
	      return;
	    }
	    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

	    var isCommon = newValue === undefined;

	    if (isCommon) {
	      newValue = srcValue;
	      if (isArray(srcValue) || isTypedArray(srcValue)) {
	        if (isArray(objValue)) {
	          newValue = objValue;
	        } else if (isArrayLikeObject(objValue)) {
	          newValue = copyArray(objValue);
	        } else {
	          isCommon = false;
	          newValue = baseClone(srcValue, true);
	        }
	      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	        if (isArguments(objValue)) {
	          newValue = toPlainObject(objValue);
	        } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
	          isCommon = false;
	          newValue = baseClone(srcValue, true);
	        } else {
	          newValue = objValue;
	        }
	      } else {
	        isCommon = false;
	      }
	    }
	    if (isCommon) {
	      // Recursively merge objects and arrays (susceptible to call stack limits).
	      stack.set(srcValue, newValue);
	      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	      stack['delete'](srcValue);
	    }
	    assignMergeValue(object, key, newValue);
	  }

	  /**
	   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	   *
	   * @private
	   * @param {Function} func The function to apply a rest parameter to.
	   * @param {number} [start=func.length-1] The start position of the rest parameter.
	   * @returns {Function} Returns the new function.
	   */
	  function baseRest(func, start) {
	    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
	    return function () {
	      var args = arguments,
	          index = -1,
	          length = nativeMax(args.length - start, 0),
	          array = Array(length);

	      while (++index < length) {
	        array[index] = args[start + index];
	      }
	      index = -1;
	      var otherArgs = Array(start + 1);
	      while (++index < start) {
	        otherArgs[index] = args[index];
	      }
	      otherArgs[start] = array;
	      return apply(func, this, otherArgs);
	    };
	  }

	  /**
	   * Creates a clone of  `buffer`.
	   *
	   * @private
	   * @param {Buffer} buffer The buffer to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Buffer} Returns the cloned buffer.
	   */
	  function cloneBuffer(buffer, isDeep) {
	    if (isDeep) {
	      return buffer.slice();
	    }
	    var result = new buffer.constructor(buffer.length);
	    buffer.copy(result);
	    return result;
	  }

	  /**
	   * Creates a clone of `arrayBuffer`.
	   *
	   * @private
	   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	   * @returns {ArrayBuffer} Returns the cloned array buffer.
	   */
	  function cloneArrayBuffer(arrayBuffer) {
	    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	    return result;
	  }

	  /**
	   * Creates a clone of `dataView`.
	   *
	   * @private
	   * @param {Object} dataView The data view to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Object} Returns the cloned data view.
	   */
	  function cloneDataView(dataView, isDeep) {
	    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	  }

	  /**
	   * Creates a clone of `map`.
	   *
	   * @private
	   * @param {Object} map The map to clone.
	   * @param {Function} cloneFunc The function to clone values.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Object} Returns the cloned map.
	   */
	  function cloneMap(map, isDeep, cloneFunc) {
	    var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	    return arrayReduce(array, addMapEntry, new map.constructor());
	  }

	  /**
	   * Creates a clone of `regexp`.
	   *
	   * @private
	   * @param {Object} regexp The regexp to clone.
	   * @returns {Object} Returns the cloned regexp.
	   */
	  function cloneRegExp(regexp) {
	    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	    result.lastIndex = regexp.lastIndex;
	    return result;
	  }

	  /**
	   * Creates a clone of `set`.
	   *
	   * @private
	   * @param {Object} set The set to clone.
	   * @param {Function} cloneFunc The function to clone values.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Object} Returns the cloned set.
	   */
	  function cloneSet(set, isDeep, cloneFunc) {
	    var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	    return arrayReduce(array, addSetEntry, new set.constructor());
	  }

	  /**
	   * Creates a clone of the `symbol` object.
	   *
	   * @private
	   * @param {Object} symbol The symbol object to clone.
	   * @returns {Object} Returns the cloned symbol object.
	   */
	  function cloneSymbol(symbol) {
	    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	  }

	  /**
	   * Creates a clone of `typedArray`.
	   *
	   * @private
	   * @param {Object} typedArray The typed array to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Object} Returns the cloned typed array.
	   */
	  function cloneTypedArray(typedArray, isDeep) {
	    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	  }

	  /**
	   * Copies the values of `source` to `array`.
	   *
	   * @private
	   * @param {Array} source The array to copy values from.
	   * @param {Array} [array=[]] The array to copy values to.
	   * @returns {Array} Returns `array`.
	   */
	  function copyArray(source, array) {
	    var index = -1,
	        length = source.length;

	    array || (array = Array(length));
	    while (++index < length) {
	      array[index] = source[index];
	    }
	    return array;
	  }

	  /**
	   * Copies properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Array} props The property identifiers to copy.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Function} [customizer] The function to customize copied values.
	   * @returns {Object} Returns `object`.
	   */
	  function copyObject(source, props, object, customizer) {
	    object || (object = {});

	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];

	      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

	      assignValue(object, key, newValue === undefined ? source[key] : newValue);
	    }
	    return object;
	  }

	  /**
	   * Copies own symbol properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy symbols from.
	   * @param {Object} [object={}] The object to copy symbols to.
	   * @returns {Object} Returns `object`.
	   */
	  function copySymbols(source, object) {
	    return copyObject(source, getSymbols(source), object);
	  }

	  /**
	   * Creates a function like `_.assign`.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return baseRest(function (object, sources) {
	      var index = -1,
	          length = sources.length,
	          customizer = length > 1 ? sources[length - 1] : undefined,
	          guard = length > 2 ? sources[2] : undefined;

	      customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

	      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	        customizer = length < 3 ? undefined : customizer;
	        length = 1;
	      }
	      object = Object(object);
	      while (++index < length) {
	        var source = sources[index];
	        if (source) {
	          assigner(object, source, index, customizer);
	        }
	      }
	      return object;
	    });
	  }

	  /**
	   * Creates an array of own enumerable property names and symbols of `object`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names and symbols.
	   */
	  function getAllKeys(object) {
	    return baseGetAllKeys(object, keys, getSymbols);
	  }

	  /**
	   * Gets the data for `map`.
	   *
	   * @private
	   * @param {Object} map The map to query.
	   * @param {string} key The reference key.
	   * @returns {*} Returns the map data.
	   */
	  function getMapData(map, key) {
	    var data = map.__data__;
	    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	  }

	  /**
	   * Gets the native function at `key` of `object`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {string} key The key of the method to get.
	   * @returns {*} Returns the function if it's native, else `undefined`.
	   */
	  function getNative(object, key) {
	    var value = getValue(object, key);
	    return baseIsNative(value) ? value : undefined;
	  }

	  /**
	   * Creates an array of the own enumerable symbol properties of `object`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of symbols.
	   */
	  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

	  /**
	   * Gets the `toStringTag` of `value`.
	   *
	   * @private
	   * @param {*} value The value to query.
	   * @returns {string} Returns the `toStringTag`.
	   */
	  var getTag = baseGetTag;

	  // Fallback for data views, maps, sets, and weak maps in IE 11,
	  // for data views in Edge < 14, and promises in Node.js.
	  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	    getTag = function getTag(value) {
	      var result = objectToString.call(value),
	          Ctor = result == objectTag ? value.constructor : undefined,
	          ctorString = Ctor ? toSource(Ctor) : undefined;

	      if (ctorString) {
	        switch (ctorString) {
	          case dataViewCtorString:
	            return dataViewTag;
	          case mapCtorString:
	            return mapTag;
	          case promiseCtorString:
	            return promiseTag;
	          case setCtorString:
	            return setTag;
	          case weakMapCtorString:
	            return weakMapTag;
	        }
	      }
	      return result;
	    };
	  }

	  /**
	   * Initializes an array clone.
	   *
	   * @private
	   * @param {Array} array The array to clone.
	   * @returns {Array} Returns the initialized clone.
	   */
	  function initCloneArray(array) {
	    var length = array.length,
	        result = array.constructor(length);

	    // Add properties assigned by `RegExp#exec`.
	    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	      result.index = array.index;
	      result.input = array.input;
	    }
	    return result;
	  }

	  /**
	   * Initializes an object clone.
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @returns {Object} Returns the initialized clone.
	   */
	  function initCloneObject(object) {
	    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
	  }

	  /**
	   * Initializes an object clone based on its `toStringTag`.
	   *
	   * **Note:** This function only supports cloning values with tags of
	   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @param {string} tag The `toStringTag` of the object to clone.
	   * @param {Function} cloneFunc The function to clone values.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Object} Returns the initialized clone.
	   */
	  function initCloneByTag(object, tag, cloneFunc, isDeep) {
	    var Ctor = object.constructor;
	    switch (tag) {
	      case arrayBufferTag:
	        return cloneArrayBuffer(object);

	      case boolTag:
	      case dateTag:
	        return new Ctor(+object);

	      case dataViewTag:
	        return cloneDataView(object, isDeep);

	      case float32Tag:case float64Tag:
	      case int8Tag:case int16Tag:case int32Tag:
	      case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	        return cloneTypedArray(object, isDeep);

	      case mapTag:
	        return cloneMap(object, isDeep, cloneFunc);

	      case numberTag:
	      case stringTag:
	        return new Ctor(object);

	      case regexpTag:
	        return cloneRegExp(object);

	      case setTag:
	        return cloneSet(object, isDeep, cloneFunc);

	      case symbolTag:
	        return cloneSymbol(object);
	    }
	  }

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	  }

	  /**
	   * Checks if the given arguments are from an iteratee call.
	   *
	   * @private
	   * @param {*} value The potential iteratee value argument.
	   * @param {*} index The potential iteratee index or key argument.
	   * @param {*} object The potential iteratee object argument.
	   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	   *  else `false`.
	   */
	  function isIterateeCall(value, index, object) {
	    if (!isObject(object)) {
	      return false;
	    }
	    var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
	    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	      return eq(object[index], value);
	    }
	    return false;
	  }

	  /**
	   * Checks if `value` is suitable for use as unique object key.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	   */
	  function isKeyable(value) {
	    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	  }

	  /**
	   * Checks if `func` has its source masked.
	   *
	   * @private
	   * @param {Function} func The function to check.
	   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	   */
	  function isMasked(func) {
	    return !!maskSrcKey && maskSrcKey in func;
	  }

	  /**
	   * Checks if `value` is likely a prototype object.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	   */
	  function isPrototype(value) {
	    var Ctor = value && value.constructor,
	        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	    return value === proto;
	  }

	  /**
	   * This function is like
	   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	   * except that it includes inherited enumerable properties.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function nativeKeysIn(object) {
	    var result = [];
	    if (object != null) {
	      for (var key in Object(object)) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  /**
	   * Converts `func` to its source code.
	   *
	   * @private
	   * @param {Function} func The function to process.
	   * @returns {string} Returns the source code.
	   */
	  function toSource(func) {
	    if (func != null) {
	      try {
	        return funcToString.call(func);
	      } catch (e) {}
	      try {
	        return func + '';
	      } catch (e) {}
	    }
	    return '';
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Performs a
	   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	   * comparison between two values to determine if they are equivalent.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   * @example
	   *
	   * var object = { 'a': 1 };
	   * var other = { 'a': 1 };
	   *
	   * _.eq(object, object);
	   * // => true
	   *
	   * _.eq(object, other);
	   * // => false
	   *
	   * _.eq('a', 'a');
	   * // => true
	   *
	   * _.eq('a', Object('a'));
	   * // => false
	   *
	   * _.eq(NaN, NaN);
	   * // => true
	   */
	  function eq(value, other) {
	    return value === other || value !== value && other !== other;
	  }

	  /**
	   * Checks if `value` is likely an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	   *  else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	  }

	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	   * @example
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   *
	   * _.isArray(document.body.children);
	   * // => false
	   *
	   * _.isArray('abc');
	   * // => false
	   *
	   * _.isArray(_.noop);
	   * // => false
	   */
	  var isArray = Array.isArray;

	  /**
	   * Checks if `value` is array-like. A value is considered array-like if it's
	   * not a function and has a `value.length` that's an integer greater than or
	   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	   * @example
	   *
	   * _.isArrayLike([1, 2, 3]);
	   * // => true
	   *
	   * _.isArrayLike(document.body.children);
	   * // => true
	   *
	   * _.isArrayLike('abc');
	   * // => true
	   *
	   * _.isArrayLike(_.noop);
	   * // => false
	   */
	  function isArrayLike(value) {
	    return value != null && isLength(value.length) && !isFunction(value);
	  }

	  /**
	   * This method is like `_.isArrayLike` except that it also checks if `value`
	   * is an object.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an array-like object,
	   *  else `false`.
	   * @example
	   *
	   * _.isArrayLikeObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isArrayLikeObject(document.body.children);
	   * // => true
	   *
	   * _.isArrayLikeObject('abc');
	   * // => false
	   *
	   * _.isArrayLikeObject(_.noop);
	   * // => false
	   */
	  function isArrayLikeObject(value) {
	    return isObjectLike(value) && isArrayLike(value);
	  }

	  /**
	   * Checks if `value` is a buffer.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.3.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	   * @example
	   *
	   * _.isBuffer(new Buffer(2));
	   * // => true
	   *
	   * _.isBuffer(new Uint8Array(2));
	   * // => false
	   */
	  var isBuffer = nativeIsBuffer || stubFalse;

	  /**
	   * Checks if `value` is classified as a `Function` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   *
	   * _.isFunction(/abc/);
	   * // => false
	   */
	  function isFunction(value) {
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in Safari 8-9 which returns 'object' for typed array and other constructors.
	    var tag = isObject(value) ? objectToString.call(value) : '';
	    return tag == funcTag || tag == genTag;
	  }

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This method is loosely based on
	   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	   * @example
	   *
	   * _.isLength(3);
	   * // => true
	   *
	   * _.isLength(Number.MIN_VALUE);
	   * // => false
	   *
	   * _.isLength(Infinity);
	   * // => false
	   *
	   * _.isLength('3');
	   * // => false
	   */
	  function isLength(value) {
	    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }

	  /**
	   * Checks if `value` is the
	   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(_.noop);
	   * // => true
	   *
	   * _.isObject(null);
	   * // => false
	   */
	  function isObject(value) {
	    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	    return !!value && (type == 'object' || type == 'function');
	  }

	  /**
	   * Checks if `value` is object-like. A value is object-like if it's not `null`
	   * and has a `typeof` result of "object".
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   * @example
	   *
	   * _.isObjectLike({});
	   * // => true
	   *
	   * _.isObjectLike([1, 2, 3]);
	   * // => true
	   *
	   * _.isObjectLike(_.noop);
	   * // => false
	   *
	   * _.isObjectLike(null);
	   * // => false
	   */
	  function isObjectLike(value) {
	    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	  }

	  /**
	   * Checks if `value` is a plain object, that is, an object created by the
	   * `Object` constructor or one with a `[[Prototype]]` of `null`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.8.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   * }
	   *
	   * _.isPlainObject(new Foo);
	   * // => false
	   *
	   * _.isPlainObject([1, 2, 3]);
	   * // => false
	   *
	   * _.isPlainObject({ 'x': 0, 'y': 0 });
	   * // => true
	   *
	   * _.isPlainObject(Object.create(null));
	   * // => true
	   */
	  function isPlainObject(value) {
	    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
	      return false;
	    }
	    var proto = getPrototype(value);
	    if (proto === null) {
	      return true;
	    }
	    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	  }

	  /**
	   * Checks if `value` is classified as a typed array.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	   * @example
	   *
	   * _.isTypedArray(new Uint8Array);
	   * // => true
	   *
	   * _.isTypedArray([]);
	   * // => false
	   */
	  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	  /**
	   * Converts `value` to a plain object flattening inherited enumerable string
	   * keyed properties of `value` to own properties of the plain object.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {Object} Returns the converted plain object.
	   * @example
	   *
	   * function Foo() {
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.assign({ 'a': 1 }, new Foo);
	   * // => { 'a': 1, 'b': 2 }
	   *
	   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	   * // => { 'a': 1, 'b': 2, 'c': 3 }
	   */
	  function toPlainObject(value) {
	    return copyObject(value, keysIn(value));
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  function keys(object) {
	    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	  }

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	  }

	  /**
	   * This method is like `_.assign` except that it recursively merges own and
	   * inherited enumerable string keyed properties of source objects into the
	   * destination object. Source properties that resolve to `undefined` are
	   * skipped if a destination value exists. Array and plain object properties
	   * are merged recursively. Other objects and value types are overridden by
	   * assignment. Source objects are applied from left to right. Subsequent
	   * sources overwrite property assignments of previous sources.
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.5.0
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * var object = {
	   *   'a': [{ 'b': 2 }, { 'd': 4 }]
	   * };
	   *
	   * var other = {
	   *   'a': [{ 'c': 3 }, { 'e': 5 }]
	   * };
	   *
	   * _.merge(object, other);
	   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	   */
	  var merge = createAssigner(function (object, source, srcIndex) {
	    baseMerge(object, source, srcIndex);
	  });

	  /*------------------------------------------------------------------------*/

	  /**
	   * This method returns a new empty array.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.13.0
	   * @category Util
	   * @returns {Array} Returns the new empty array.
	   * @example
	   *
	   * var arrays = _.times(2, _.stubArray);
	   *
	   * console.log(arrays);
	   * // => [[], []]
	   *
	   * console.log(arrays[0] === arrays[1]);
	   * // => false
	   */
	  function stubArray() {
	    return [];
	  }

	  /**
	   * This method returns `false`.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.13.0
	   * @category Util
	   * @returns {boolean} Returns `false`.
	   * @example
	   *
	   * _.times(2, _.stubFalse);
	   * // => [false, false]
	   */
	  function stubFalse() {
	    return false;
	  }

	  /*------------------------------------------------------------------------*/

	  // Add methods that return wrapped values in chain sequences.
	  lodash.keys = keys;
	  lodash.keysIn = keysIn;
	  lodash.merge = merge;
	  lodash.toPlainObject = toPlainObject;

	  /*------------------------------------------------------------------------*/

	  // Add methods that return unwrapped values in chain sequences.
	  lodash.eq = eq;
	  lodash.isArguments = isArguments;
	  lodash.isArray = isArray;
	  lodash.isArrayLike = isArrayLike;
	  lodash.isArrayLikeObject = isArrayLikeObject;
	  lodash.isBuffer = isBuffer;
	  lodash.isFunction = isFunction;
	  lodash.isLength = isLength;
	  lodash.isObject = isObject;
	  lodash.isObjectLike = isObjectLike;
	  lodash.isPlainObject = isPlainObject;
	  lodash.isTypedArray = isTypedArray;
	  lodash.stubArray = stubArray;
	  lodash.stubFalse = stubFalse;

	  /*------------------------------------------------------------------------*/

	  /**
	   * The semantic version number.
	   *
	   * @static
	   * @memberOf _
	   * @type {string}
	   */
	  lodash.VERSION = VERSION;

	  /*--------------------------------------------------------------------------*/

	  if (freeModule) {
	    // Export for Node.js.
	    (freeModule.exports = lodash)._ = lodash;
	    // Export for CommonJS support.
	    freeExports._ = lodash;
	  }
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)(module)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _store = __webpack_require__(2);

	var _pubsub = __webpack_require__(4);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _blinx = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * All the modules created by this framework will be extended by this Module.
	 * @module Module
	 */
	var Module = function () {
		var modulePrivateData = new WeakMap();

		/**
	  * @class
	  * @extends {@link PubSub}
	  */

		var Module = function (_PubSub) {
			_inherits(Module, _PubSub);

			/**
	   *
	   * @param moduleName {string} the name of the module
	   * @param uniqueId {string} the unique id of the module
	   * @param path {string} the path of the module
	   * @param lifeCycleFlags {lifeCycleFlags} the initial value of the lifecycle flags
	   * @param instanceConfig the configuration of the module passed
	   * @param instanceData It is the reference of module
	   */

			function Module(name, moduleName, lifeCycleFlags, instanceConfig, instanceData, meta) {
				_classCallCheck(this, Module);

				// Apply middleware, PRE:_Create

				var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Module).call(this));

				_store.middleWareFns.forEach(function (middlewareFn) {
					_extends(_this, middlewareFn(_this));
				});

				_this.moduleName = moduleName;
				_this.name = name;
				// this.path = path;
				_this.lifeCycleFlags = _extends({}, lifeCycleFlags);
				_this.instanceConfig = instanceConfig;
				_this.modulePlaceholders = _this.instanceConfig.placeholders;
				_this.createChildInstance = _blinx.createInstance.bind(_this);
				_this.meta = meta;

				for (var key in instanceData) {
					_this[key] = instanceData[key];
				}

				modulePrivateData.set(_this, {
					moduleSubscriptions: [],
					uniqueId: meta.id
				});
				return _this;
			}

			/**
	   * renders the template using placeholder
	   * @param placeholderData : The placeholder data for creation of template
	   */


			_createClass(Module, [{
				key: "render",
				value: function render(placeholderData) {

					var containerSelector = this.getUniqueId();
					var placeholders = placeholderData || this.instanceConfig.placeholders;

					if (!this.template) return;

					document.querySelector("#" + containerSelector).innerHTML = this.template(placeholders);
				}
			}, {
				key: "getAllSubscriptions",


				/**
	    * gets all the events of all types subscribed by the module
	    * @returns {array} array of subscriptions
	    */
				value: function getAllSubscriptions() {
					return modulePrivateData.get(this).moduleSubscriptions;
				}
			}, {
				key: "getUniqueId",


				/**
	    * gets the unique id of the module
	    * @returns {string}
	    */
				value: function getUniqueId() {
					return modulePrivateData.get(this).uniqueId;
				}
			}, {
				key: "getParentInstanceId",


				/**
	    * gets the unique id  of the parent element
	    * @returns {string}
	    */
				value: function getParentInstanceId() {
					if (this.meta.parent) {
						return this.meta.parent.id;
					}

					return "";
				}
			}, {
				key: "getModuleContainer",
				value: function getModuleContainer() {
					return "#" + this.getUniqueId();
				}
			}, {
				key: "getModuleName",
				value: function getModuleName() {
					return this.moduleName;
				}
			}, {
				key: "getInstanceConfig",
				value: function getInstanceConfig() {
					return this.instanceConfig.placeholders;
				}
			}, {
				key: "getCSSSelector",
				value: function getCSSSelector() {
					return _utils2.default.getCSSSelector(this, _store.moduleS);
				}
			}, {
				key: "destroy",
				value: function destroy() {}
			}, {
				key: "subscribe",
				value: function subscribe(subscription) {
					var eventName = arguments.length <= 1 || arguments[1] === undefined ? subscription.eventName : arguments[1];

					subscription.eventSubscriber = this.getModuleContainer();
					modulePrivateData.get(this).moduleSubscriptions.push(subscription);
					_get(Object.getPrototypeOf(Module.prototype), "subscribe", this).call(this, subscription, eventName);
				}
			}, {
				key: "publish",
				value: function publish(eventName, message) {
					_get(Object.getPrototypeOf(Module.prototype), "publish", this).call(this, eventName, message);
				}
			}, {
				key: "unsubscribe",
				value: function unsubscribe(eventName, callback) {
					if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object") {
						callback = eventName.callback;
						eventName = eventName.eventName;
					}
					_get(Object.getPrototypeOf(Module.prototype), "unsubscribe", this).call(this, this.getModuleContainer(), eventName, callback);
				}
			}], [{
				key: "createModuleArena",
				value: function createModuleArena(module, compiledHTML) {
					// If compiledHTML is not provided, start creating dom element progressively.
					var themeClass = "";

					if (module.instanceConfig.moduleClassName) {
						themeClass = module.instanceConfig.theme ? module.instanceConfig.moduleClassName + '-' + module.instanceConfig.theme : module.instanceConfig.moduleClassName + '-default';
					} else {
						themeClass = module.instanceConfig.theme ? module.moduleName + '-' + module.instanceConfig.theme : module.moduleName + '-default';
					}

					if (typeof compiledHTML !== "string") {
						document.querySelector(module.instanceConfig.container).innerHTML = "<div id=\"" + module.getUniqueId() + "\" class=\"" + themeClass + " play-arena\"></div>";
						return;
					}

					// If compiledHTML is provided, create page string.
					if (compiledHTML.trim() === "") {
						compiledHTML = "<div id=\"" + module.getUniqueId() + "\"></div>";
					} else {}

					return compiledHTML;
				}
			}]);

			return Module;
		}(_pubsub2.default);

		return Module;
	}();

	exports.default = Module;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
;