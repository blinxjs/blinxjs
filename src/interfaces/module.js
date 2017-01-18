import isEqual from 'lodash/fp/isEqual';
import Utils from "../helpers/utils";
import {moduleS, middleWareFns, eventQ} from "./store";
import PubSub from "./pubsub";
import {createInstance} from "../blinx";

/**
 * All the modules created by this framework will be extended by this Module.
 * @module Module
 */
let Module = (function () {
    let modulePrivateData = new WeakMap();

    /**
     * @class
     * @extends {@link PubSub}
     */
    class Module extends PubSub {
        /**
         *
         * @param moduleName {string} the name of the module
         * @param uniqueId {string} the unique id of the module
         * @param path {string} the path of the module
         * @param lifeCycleFlags {lifeCycleFlags} the initial value of the lifecycle flags
         * @param instanceConfig the configuration of the module passed
         * @param instanceData It is the reference of module
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
        }

        /**
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
         * gets all the events of all types subscribed by the module
         * @returns {array} array of subscriptions
         */
        getAllSubscriptions() {
            return modulePrivateData.get(this).moduleSubscriptions;
        };

        /**
         * gets the unique id of the module
         * @returns {string}
         */
        getUniqueId() {
            return modulePrivateData.get(this).uniqueId;
        };

        /**
         * gets the unique id  of the parent element
         * @returns {string}
         */
        getParentInstanceId() {
            if (this.meta.parent) {
                return this.meta.parent.id
            }

            return "";
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
            return Utils.getCSSSelector(this, moduleS);
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

        unsubscribe(eventName, callback) {
            if (typeof eventName === "object") {
                callback = eventName.callback;
                eventName = eventName.eventName;
            }
            super.unsubscribe(this.getModuleContainer(), eventName, callback);
        };


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

		getInstanceName(){
			return "MODULE";
		}
    }

    return Module;
})();

export default Module
