import isEqual from 'lodash/fp/isEqual';
import Utils from "../helpers/utils";
import {moduleS, middleWareFns, eventQ} from "./store";
import PubSub from "./pubsub";
import {createInstance} from "../blinx";

/**
 * @module Module
 */
let Module = (function () {
    let modulePrivateData = new WeakMap();

    /**
     * @class
	 * All the modules created by this framework will be extended by this Module.
     * @extends {@link PubSub}
     */
    class Module extends PubSub {

        static isObject(x) {
            return x != null && typeof x === 'object';
        }


        static getDependencies(fnStr) {

            // Return if ._ is used directly
            if (fnStr.match(/\._[^.]/g)) {
                return "*";
            }

            let matched = fnStr.match(/\._\.((\S)*[a-zA-Z0-9_$])/g),
                matchAll = "*";

            // If any dependency is not found, trigger all the time.
            if (!matched || matched.length === 0) {
                return matchAll;
            }

            matched = matched.map((match) => {
                let splitted = match.split("._.")
                return splitted[1] || splitted[0];
            });

            // If any evaluated dependency is present at root level
            let evaluatedDependencyAtRoot = matched.find((match) => {
                return match.startsWith("._[");
            });
            if (evaluatedDependencyAtRoot) {
                return matchAll;
            }

            matched = matched.map(match => match.split("[")[0]);

            return matched;
        };


        // ***
        // Observer
        $proxyHandler() {
            let ctx = this;
			let _callObservingMethods = function() {
				setTimeout(() => {
					ctx.$_observerFns.forEach((fnObj) => {
						if (Array.isArray(fnObj.deps)) {

							// Dont trigger if adjacent node/sibling node has changed
							let pathArray = path.split("=");
							let depsMatched = fnObj.deps.find((deps) => {
								let depsArr = deps.split(".");

								if (isEqual(depsArr, pathArray)) return true;

								if (pathArray.length < depsArr.length) {
									let pathLastIndex = pathArray.length - 1;

									if (isEqual(pathArray[pathLastIndex], depsArr[pathLastIndex])) return true;
								}

								if (pathArray.length <= depsArr.length) {
									return pathArray.find((keyItem, index) => {
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
                get: function (target, prop, receiver) {
                    try {
                        return (Module.isObject(target[prop]) && "__value" in target[prop]) ? target[prop].__value : target[prop];
                    } catch (err){
                        return undefined;
                    }

                },
                set: function (target, name, value) {

                    if(Array.isArray(target) && name === "length") {
                        target.length = value;
                        return target;
                    }

                    let path;

                    // Dont set meta data for meta fields
                    if (name === "__path" || name === "__value") {
                        target[name] = value;
                        return target;
                    }

                    path = target.__path ? target.__path + "=" + name : name;

                    // Set values
                    if (Module.isObject(value)) {
                        target[name] = new Proxy(value, ctx.$proxyHandler());
                    } else {
                        target[name] = {
                            __value: value
                        };
                    }
					Object.defineProperty(target[name], '__path',{
						enumerable: false,
						value: path
					});

                    // Call
					_callObservingMethods();

                    return target;
                },
				deleteProperty: function (target, property) {
					let x;
					if(Module.isObject(target) || Array.isArray(target)) {
						x = delete target[property];
					}
					_callObservingMethods();
					return x;
				},
				has: function(target, prop) {
					try {
						return ((Module.isObject(target) || Array.isArray(target)) && target[prop]);
					} catch (err){
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
        constructor(name, moduleName, lifeCycleFlags, instanceConfig, instanceData, meta) {
            super();

            this.moduleName = moduleName;
            this.name = name;
            this.lifeCycleFlags = Object.assign({}, lifeCycleFlags);
            this.instanceConfig = instanceConfig;
            this.modulePlaceholders = this.instanceConfig.placeholders;
            this.createChildInstance = createInstance.bind(this);
            this.meta = meta;

            for (let key in instanceData) {
                this[key] = instanceData[key];
            }

            modulePrivateData.set(this, {
                moduleSubscriptions: [],
                uniqueId: meta.id
            });

            // Apply middleware, PRE:_Create
            middleWareFns.forEach((middlewareFn)=> {
                Object.assign(this, middlewareFn(this));
            });

            // Observable proxy setup
            this.$_observerFns = [];
            this.observe_For && this.observe_For.forEach((fnName)=>{
                if(!this[fnName] || typeof this[fnName] !== "function"){
                    console.error(`{fnName} is not available over module. Can be observed.`)
                    return;
                }
                let fnObj = {
                    fn: this[fnName],
                    deps: Module.getDependencies(String(this[fnName]))
                };

                this.$_observerFns.push(fnObj);
            });

            this._ = new Proxy({}, this.$proxyHandler());
        }

        /**
		 * @method
         * renders the template using placeholder
         * @param placeholderData : The placeholder data for creation of template
         */
        render(placeholderData) {

            const containerSelector = this.getUniqueId();
            const placeholders = placeholderData || this.instanceConfig.placeholders;

            if (!this.template) return;

            document.querySelector(`#${containerSelector}`).innerHTML = this.template(placeholders);
        };

        /**
		 * @method
         * gets all the events of all types subscribed by the module
         * @returns {array} array of subscriptions
         */
        getAllSubscriptions() {
            return modulePrivateData.get(this).moduleSubscriptions;
        };

        /**
		 * @method
         * gets the unique id of the module
         * @returns {string}
         */
        getUniqueId() {
            return modulePrivateData.get(this).uniqueId;
        };

        /**
		 * @method
         * gets the unique id  of the parent element
         * @returns {string}
         */
        getParentInstanceId() {
            if (this.meta.parent) {
                return this.meta.parent.id
            }

            return "";
        };

		/**
		 * @method
		 *
		 * @returns {string}
         */
        getModuleContainer() {
            return `#${this.getUniqueId()}`;
        };

		/**
		 *
		 * @method
		 * @returns {string|*}
         */
        getModuleName() {
            return this.moduleName;
        };

		/**
		 *
		 * @method
		 * @returns {*}
         */
        getInstanceConfig() {
            return this.instanceConfig.placeholders;
        };

		/**
		 *
		 * @method
		 * @returns {*}
         */
        getCSSSelector() {
            return Utils.getCSSSelector(this, moduleS);
        };

		/**
		 *
		 * @method
		 */
        destroy() {

        };

		/**
		 *
		 * @method
		 * @param subscription
		 * @param eventName
         */
        subscribe(subscription, eventName = subscription.eventName) {
            subscription.eventSubscriber = this.getModuleContainer();
            modulePrivateData.get(this).moduleSubscriptions.push(subscription);
            super.subscribe(subscription, eventName);
        };

		/**
		 *
		 * @method
		 * @param eventName
		 * @param message
         */
        publish(eventName, message) {
            super.publish(eventName, message);
        };

		/**
		 *
		 * @method
		 */
        dequeueEvents() {
            let moduleSubscriptions = this.getAllSubscriptions();
            eventQ.store.forEach((evt)=> {
                let queuedEvent = moduleSubscriptions.filter((event)=> {
                    if (evt.eventName === event.eventName && event.type === "RE_PLAY") {
                        return event;
                    }
                });
                queuedEvent.forEach((event) => {
                    event.callback && event.callback.call((event.context ? event.context : null), evt.message);
                });
            });
        };

		/**
		 *
		 * @method
		 * @param eventName
		 * @param callback
         */
        unsubscribe(eventName, callback) {
            if (typeof eventName === "object") {
                callback = eventName.callback;
                eventName = eventName.eventName;
            }
            super.unsubscribe(this.getModuleContainer(), eventName, callback);
        };


		/**
		 * @method
		 * actual rendering happens here. Puts the wrapper for the module and adds it to the container.
		 * @param module {Object}
		 * @param compiledHTML
         * @returns {*}
         */
        static createModuleArena(module, compiledHTML) {
            // If compiledHTML is not provided, start creating dom element progressively.
            let themeClass = "";

            if (module.instanceConfig.moduleClassName) {
                themeClass = module.instanceConfig.theme ? module.instanceConfig.moduleClassName + '-' + module.instanceConfig.theme : module.instanceConfig.moduleClassName + '-default';
            } else {
                themeClass = module.instanceConfig.theme ? module.moduleName + '-' + module.instanceConfig.theme : module.moduleName + '-default';
            }

            if (typeof compiledHTML !== "string") {
                document.querySelector(module.instanceConfig.container).innerHTML = `<div id="${module.getUniqueId()}" class="${themeClass} play-arena"></div>`;
                return;
            }

            // If compiledHTML is provided, create page string.
            if (compiledHTML.trim() === "") {
                compiledHTML = `<div id="${module.getUniqueId()}"></div>`;
            } else {

            }

            return compiledHTML;
        }

		/**
		 * For internal use
		 * This method is currently used to check is the event occured via Pub sub or a module
		 * @returns {string}
		 */
		getInstanceName(){
			return "MODULE";
		}
    }

    return Module;
})();

export default Module
