"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../helpers/utils");

var _utils2 = _interopRequireDefault(_utils);

var _store = require("./store.js");

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
 * Check if the module is rendered
 * @param moduleContext {Object} the moduleContext object
 */
var isModuleRendered = function isModuleRendered(moduleContext) {
	return moduleContext && moduleContext.lifeCycleFlags && moduleContext.lifeCycleFlags.rendered == true;
};

/**
 * Check if the module has initOn
 * @param moduleContext {Object} the moduleContext object
 * @param EventName {String}
 */
var checkIfModuleHasInitOn = function checkIfModuleHasInitOn(moduleContext, eventName) {
	//Should also remove from the eventQ maintained
	return moduleContext && moduleContext.instanceConfig && moduleContext.instanceConfig.initOn && moduleContext.instanceConfig.initOn.eventName == eventName;
};

/**
 * Check if the event is subscribed or published using global pubsub
 * @param instance {Object} the instance object using which the pub sub is handled
 */
var isGlobalPubsub = function isGlobalPubsub(instance) {
	return instance && instance.getInstanceName() == "PUBSUB";
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
			var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : subscription.eventName;

			if (!_store.subscriptions[eventName]) _store.subscriptions[eventName] = [];
			var subscriptionData = _utils2.default.pick(subscription, ['callback', 'context', 'eventSubscriber', 'eventPublisher', 'once', 'type']);
			subscriptionData["moduleContext"] = this;
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
				    moduleContext = subscription.moduleContext,
				    subscriptionMatched = false;

				if (!callback || typeof callback !== "function") {
					console.error("The callback for the event is invalid");
					return;
				}

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

					if (isModuleRendered(moduleContext) || checkIfModuleHasInitOn(moduleContext, eventName) || isGlobalPubsub(moduleContext) || subscription.type == "KEEP_ON") {
						callback.call(context ? context : null, publishData);
					}

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
	}, {
		key: "getInstanceName",
		value: function getInstanceName() {
			return "PUBSUB";
		}
	}]);

	return PubSub;
}();

exports.default = PubSub;