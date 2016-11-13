"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _utils = require("../helpers/utils");

var _utils2 = _interopRequireDefault(_utils);

var _store = require("./store");

var _pubsub = require("./pubsub");

var _pubsub2 = _interopRequireDefault(_pubsub);

var _blinx = require("../blinx");

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
			var _this = _possibleConstructorReturn(this, (Module.__proto__ || Object.getPrototypeOf(Module)).call(this));

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
				var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : subscription.eventName;

				subscription.eventSubscriber = this.getModuleContainer();
				modulePrivateData.get(this).moduleSubscriptions.push(subscription);
				_get(Module.prototype.__proto__ || Object.getPrototypeOf(Module.prototype), "subscribe", this).call(this, subscription, eventName);
			}
		}, {
			key: "publish",
			value: function publish(eventName, message) {
				_get(Module.prototype.__proto__ || Object.getPrototypeOf(Module.prototype), "publish", this).call(this, eventName, message);
			}
		}, {
			key: "dequeueEvents",
			value: function dequeueEvents() {
				var moduleSubscriptions = this.getAllSubscriptions();
				_store.eventQ.store.forEach(function (evt) {
					var queuedEvent = moduleSubscriptions.filter(function (event) {
						if (evt.eventName === event.eventName && event.type === "RE_PLAY") {
							return event;
						}
					});
					queuedEvent.forEach(function (event) {
						event.callback && event.callback.call(event.context ? event.context : null, evt.message);
					});
				});
			}
		}, {
			key: "unsubscribe",
			value: function unsubscribe(eventName, callback) {
				if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object") {
					callback = eventName.callback;
					eventName = eventName.eventName;
				}
				_get(Module.prototype.__proto__ || Object.getPrototypeOf(Module.prototype), "unsubscribe", this).call(this, this.getModuleContainer(), eventName, callback);
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