var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { isEqual } from 'lodash/fp';
import Utils from '../helpers/utils';
import { moduleS, middleWareFns, eventQ } from './store';
import PubSub from './pubsub';
import { createInstance } from '../blinx';

/**
 * @module Module
 */
var Module = function () {
  var modulePrivateData = new WeakMap();

  /**
     * @class
  * All the modules created by this framework will be extended by this Module.
     * @extends {@link PubSub}
     */

  var Module = function (_PubSub) {
    _inherits(Module, _PubSub);

    _createClass(Module, [{
      key: '$proxyHandler',


      // ***
      // Observer
      value: function $proxyHandler() {
        var ctx = this;
        var _callObservingMethods = function _callObservingMethods() {
          setTimeout(function () {
            ctx.$_observerFns.forEach(function (fnObj) {
              if (Array.isArray(fnObj.deps)) {
                // Dont trigger if adjacent node/sibling node has changed
                var pathArray = path.split('=');
                var depsMatched = fnObj.deps.find(function (deps) {
                  var depsArr = deps.split('.');

                  if (isEqual(depsArr, pathArray)) return true;

                  if (pathArray.length < depsArr.length) {
                    var pathLastIndex = pathArray.length - 1;

                    if (isEqual(pathArray[pathLastIndex], depsArr[pathLastIndex])) return true;
                  }

                  if (pathArray.length <= depsArr.length) {
                    return pathArray.find(function (keyItem, index) {
                      return depsArr[index] !== keyItem;
                    });
                  }
                });

                depsMatched ? fnObj.fn.call(ctx) : undefined;
              } else {
                fnObj.fn.call(ctx);
              }
            });
          });
        };
        return {
          get: function get(target, prop, receiver) {
            try {
              return Module.isObject(target[prop]) && '__value' in target[prop] ? target[prop].__value : target[prop];
            } catch (err) {
              return undefined;
            }
          },
          set: function set(target, name, value) {
            if (Array.isArray(target) && name === 'length') {
              target.length = value;
              return target;
            }

            var path = void 0;

            // Dont set meta data for meta fields
            if (name === '__path' || name === '__value') {
              target[name] = value;
              return target;
            }

            path = target.__path ? target.__path + '=' + name : name;

            // Set values
            if (Module.isObject(value)) {
              target[name] = new Proxy(value, ctx.$proxyHandler());
            } else {
              target[name] = {
                __value: value
              };
            }
            Object.defineProperty(target[name], '__path', {
              enumerable: false,
              value: path
            });

            // Call
            _callObservingMethods();

            return target;
          },
          deleteProperty: function deleteProperty(target, property) {
            var x = void 0;
            if (Module.isObject(target) || Array.isArray(target)) {
              x = delete target[property];
            }
            _callObservingMethods();
            return x;
          },
          has: function has(target, prop) {
            try {
              return (Module.isObject(target) || Array.isArray(target)) && target[prop];
            } catch (err) {
              return false;
            }
          }
        };
      }

      /**
      * @constructor
      * @param name
      * @param moduleName {string} the name of the module
      * @param lifeCycleFlags {lifeCycleFlags} the initial value of the lifecycle flags
      * @param instanceConfig the configuration of the module passed
           * @param instanceData It is the reference of module
           * @param meta
           */

    }], [{
      key: 'isObject',
      value: function isObject(x) {
        return x != null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
      }
    }, {
      key: 'getDependencies',
      value: function getDependencies(fnStr) {
        // Return if ._ is used directly
        if (fnStr.match(/\._[^.]/g)) {
          return '*';
        }

        var matched = fnStr.match(/\._\.((\S)*[a-zA-Z0-9_$])/g),
            matchAll = '*';

        // If any dependency is not found, trigger all the time.
        if (!matched || matched.length === 0) {
          return matchAll;
        }

        matched = matched.map(function (match) {
          var splitted = match.split('._.');
          return splitted[1] || splitted[0];
        });

        // If any evaluated dependency is present at root level
        var evaluatedDependencyAtRoot = matched.find(function (match) {
          return match.startsWith('._[');
        });
        if (evaluatedDependencyAtRoot) {
          return matchAll;
        }

        matched = matched.map(function (match) {
          return match.split('[')[0];
        });

        return matched;
      }
    }]);

    function Module(name, moduleName, lifeCycleFlags, instanceConfig, instanceData, meta) {
      _classCallCheck(this, Module);

      var _this = _possibleConstructorReturn(this, (Module.__proto__ || Object.getPrototypeOf(Module)).call(this));

      _this.moduleName = moduleName;
      _this.name = name;
      _this.lifeCycleFlags = _extends({}, lifeCycleFlags);
      _this.instanceConfig = instanceConfig;
      _this.modulePlaceholders = _this.instanceConfig.placeholders;
      _this.createChildInstance = createInstance.bind(_this);
      _this.meta = meta;

      for (var key in instanceData) {
        _this[key] = instanceData[key];
      }

      modulePrivateData.set(_this, {
        moduleSubscriptions: [],
        uniqueId: meta.id
      });

      // Apply middleware, PRE:_Create
      middleWareFns.forEach(function (middlewareFn) {
        _extends(_this, middlewareFn(_this));
      });

      // Observable proxy setup
      _this.$_observerFns = [];
      _this.observe_For && _this.observe_For.forEach(function (fnName) {
        if (!_this[fnName] || typeof _this[fnName] !== 'function') {
          console.error('{fnName} is not available over module. Can be observed.');
          return;
        }
        var fnObj = {
          fn: _this[fnName],
          deps: Module.getDependencies(String(_this[fnName]))
        };

        _this.$_observerFns.push(fnObj);
      });

      _this._ = new Proxy({}, _this.$proxyHandler());
      return _this;
    }

    /**
    * @method
         * renders the template using placeholder
         * @param placeholderData : The placeholder data for creation of template
         */


    _createClass(Module, [{
      key: 'render',
      value: function render(placeholderData) {
        var containerSelector = this.getUniqueId();
        var placeholders = placeholderData || this.instanceConfig.placeholders;

        if (!this.template) return;

        document.querySelector('#' + containerSelector).innerHTML = this.template(placeholders);
      }

      /**
      * @method
           * gets all the events of all types subscribed by the module
           * @returns {array} array of subscriptions
           */

    }, {
      key: 'getAllSubscriptions',
      value: function getAllSubscriptions() {
        return modulePrivateData.get(this).moduleSubscriptions;
      }

      /**
      * @method
           * gets the unique id of the module
           * @returns {string}
           */

    }, {
      key: 'getUniqueId',
      value: function getUniqueId() {
        return modulePrivateData.get(this).uniqueId;
      }

      /**
      * @method
           * gets the unique id  of the parent element
           * @returns {string}
           */

    }, {
      key: 'getParentInstanceId',
      value: function getParentInstanceId() {
        if (this.meta.parent) {
          return this.meta.parent.id;
        }

        return '';
      }

      /**
      * @method
      *
      * @returns {string}
           */

    }, {
      key: 'getModuleContainer',
      value: function getModuleContainer() {
        return '#' + this.getUniqueId();
      }

      /**
      *
      * @method
      * @returns {string|*}
           */

    }, {
      key: 'getModuleName',
      value: function getModuleName() {
        return this.moduleName;
      }

      /**
      *
      * @method
      * @returns {*}
           */

    }, {
      key: 'getInstanceConfig',
      value: function getInstanceConfig() {
        return this.instanceConfig.placeholders;
      }

      /**
      *
      * @method
      * @returns {*}
           */

    }, {
      key: 'getCSSSelector',
      value: function getCSSSelector() {
        return Utils.getCSSSelector(this, moduleS);
      }

      /**
      *
      * @method
      */

    }, {
      key: 'destroy',
      value: function destroy() {}

      /**
      *
      * @method
      * @param subscription
      * @param eventName
           */

    }, {
      key: 'subscribe',
      value: function subscribe(subscription) {
        var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : subscription.eventName;

        subscription.eventSubscriber = this.getModuleContainer();
        modulePrivateData.get(this).moduleSubscriptions.push(subscription);
        _get(Module.prototype.__proto__ || Object.getPrototypeOf(Module.prototype), 'subscribe', this).call(this, subscription, eventName);
      }

      /**
      *
      * @method
      * @param eventName
      * @param message
           */

    }, {
      key: 'publish',
      value: function publish(eventName, message) {
        _get(Module.prototype.__proto__ || Object.getPrototypeOf(Module.prototype), 'publish', this).call(this, eventName, message);
      }

      /**
      *
      * @method
      */

    }, {
      key: 'dequeueEvents',
      value: function dequeueEvents() {
        var moduleSubscriptions = this.getAllSubscriptions();
        eventQ.store.forEach(function (evt) {
          var queuedEvent = moduleSubscriptions.filter(function (event) {
            if (evt.eventName === event.eventName && event.type === 'RE_PLAY') {
              return event;
            }
          });
          queuedEvent.forEach(function (event) {
            event.callback && event.callback.call(event.context ? event.context : null, evt.message);
          });
        });
      }

      /**
      *
      * @method
      * @param eventName
      * @param callback
           */

    }, {
      key: 'unsubscribe',
      value: function unsubscribe(eventName, callback) {
        if ((typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) === 'object') {
          callback = eventName.callback;
          eventName = eventName.eventName;
        }
        _get(Module.prototype.__proto__ || Object.getPrototypeOf(Module.prototype), 'unsubscribe', this).call(this, this.getModuleContainer(), eventName, callback);
      }

      /**
      * @method
      * actual rendering happens here. Puts the wrapper for the module and adds it to the container.
      * @param module {Object}
      * @param compiledHTML
           * @returns {*}
           */

    }, {
      key: 'getInstanceName',


      /**
      * For internal use
      * This method is currently used to check is the event occured via Pub sub or a module
      * @returns {string}
      */
      value: function getInstanceName() {
        return 'MODULE';
      }
    }], [{
      key: 'createModuleArena',
      value: function createModuleArena(module, compiledHTML) {
        // If compiledHTML is not provided, start creating dom element progressively.
        var themeClass = '';

        if (module.instanceConfig.moduleClassName) {
          themeClass = module.instanceConfig.theme ? module.instanceConfig.moduleClassName + '-' + module.instanceConfig.theme : module.instanceConfig.moduleClassName + '-default';
        } else {
          themeClass = module.instanceConfig.theme ? module.moduleName + '-' + module.instanceConfig.theme : module.moduleName + '-default';
        }

        if (typeof compiledHTML !== 'string') {
          document.querySelector(module.instanceConfig.container).innerHTML = '<div id="' + module.getUniqueId() + '" class="' + themeClass + ' play-arena"></div>';
          return;
        }

        // If compiledHTML is provided, create page string.
        if (compiledHTML.trim() === '') {
          compiledHTML = '<div id="' + module.getUniqueId() + '"></div>';
        } else {}

        return compiledHTML;
      }
    }]);

    return Module;
  }(PubSub);

  return Module;
}();

export default Module;