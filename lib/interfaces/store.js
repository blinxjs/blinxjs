"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * The module store stores all the instances of the modules which are loaded. It deletes the instances in case they are unloaded from screen 
 * @module
 */
var moduleS = _extends([], {
	/**
  * inserts the instance into the module store
  * @method
  * @param instance  of {@link Module}
  */
	insertInstance: function insertInstance(instance) {
		this.push(instance);
	},

	/**
  * deletes the instance of the module. Removes the entry from the module store
  * @method
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
  * @method
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

exports.isBrowser = isBrowser;
exports.subscriptions = subscriptions;
exports.moduleS = moduleS;
exports.isServer = isServer;
exports.eventQ = eventQ;
exports.middleWareFns = middleWareFns;