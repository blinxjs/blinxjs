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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**This is the major framework file.
	                                                                                                                                                                                                                                                                   * @exports {
	                                                                                                                                                                                                                                                                   * 	createInstance: creates a new instance of the module.
	                                                                                                                                                                                                                                                                   * 	destroyModuleInstance: destroys the module instance,
	                                                                                                                                                                                                                                                                   * 	use: use it if you want to extend Blinx
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * }
	                                                                                                                                                                                                                                                                   */

	exports.destroyModuleInstance = destroyModuleInstance;
	exports.createInstance = createInstance;
	exports.use = use;

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _module = __webpack_require__(6);

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

		if (module.instanceConfig.initOn && module.lifeCycleFlags.rendered) {

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
			if (moduleResoved instanceof Promise) {

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
			_onBreath(module, _constants2.default.onStatusChange_EVENTS.renderCalled);

			if (module[_constants2.default.MODULE_EVENTS.onRenderComplete]) {

				module[_constants2.default.MODULE_EVENTS.onRenderComplete]();
				_onBreath(module, _constants2.default.onStatusChange_EVENTS.onRenderCompleteCalled);
			}

			res();
			module.lifeCycleFlags.rendered = true;
			_emitLifeCycleEvent(module, "_READY");
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

							_startExec([module.pointer], promiseArr);
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
			instanceConfig.placeholders = _extends(instance.config.placeholders, instanceConfig.placeholders);
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

	exports.default = {
		createInstance: createInstance,
		destroyInstance: destroyModuleInstance,
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
	                    if (!subscribeOnce) {
	                        remainingSubscriptions.push(subscription);
	                    }
	                } else {
	                    remainingSubscriptions.push(subscription);
	                }
	            });

	            _store.subscriptions[eventName] = remainingSubscriptions;
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
				_this.lifeCycleFlags = lifeCycleFlags;
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

/***/ }
/******/ ])
});
;