import Utils from '../helpers/utils';
import {moduleS, subscriptions, eventQ} from './store.js';

const subscribeLogger = function (eventName, subscription) {
	console.group('Event Subscribed');
	console.info(eventName);
	console.dirxml(subscription);
	console.groupEnd();
};

const publishLogger = function (eventName, publishData) {
	console.group('Event Published');
	console.info(eventName);
	console.dirxml(publishData);
	console.groupEnd();
};

const unsubscribeLogger = function (eventName, subscription) {
	console.group('Event UnSubscribed');
	console.info(eventName);
	console.dirxml(subscription);
	console.groupEnd();
};

/**
 * Check if the module is rendered
 * @param moduleContext {Object} the moduleContext object
 */
const isModuleRendered = function (moduleContext) {
	return (moduleContext && moduleContext.lifeCycleFlags && moduleContext.lifeCycleFlags.rendered == true);
};

/**
 * Check if the module has initOn
 * @param moduleContext {Object} the moduleContext object
 * @param EventName {String}
 */
const checkIfModuleHasInitOn = function (moduleContext, eventName) {
	// Should also remove from the eventQ maintained
	return (moduleContext && moduleContext.instanceConfig && moduleContext.instanceConfig.initOn && moduleContext.instanceConfig.initOn.eventName == eventName);
};


/**
 * Check if the event is subscribed or published using global pubsub
 * @param instance {Object} the instance object using which the pub sub is handled
 */
const isGlobalPubsub = function (instance) {
	return (instance && instance.getInstanceName() == 'PUBSUB');
};

/**
 * @class
 * PubSub
 * The publisher subscriber module for Blinx.
 * It is responsible for the communication between the modules through events
 */
class PubSub {
	/**
	 * Subscribes to the blinx event
	 * @method
	 * @public
	 * @param subscription {Object} the subscription object
	 * @param [eventName = subscription.eventName]
	 */
	subscribe(subscription, eventName = subscription.eventName) {
		if (!subscriptions[eventName]) subscriptions[eventName] = [];
		const subscriptionData         = Utils.pick(subscription, ['callback', 'context', 'eventSubscriber', 'eventPublisher', 'once', 'type']);
		subscriptionData.moduleContext = this;
		subscriptions[eventName].push(subscriptionData);
		subscribeLogger(eventName, subscription);
	}


	/**
	 * Publishes a blinx event
	 * @method
	 * @public
	 * @param eventName {string}
	 * @param message {string}
	 */
	publish(eventName, message) {
		let publisher = '';
		if (arguments.length === 3) {
			publisher = arguments[0] || '';
			eventName = arguments[1];
			message   = arguments[2];
		} else {
			publisher = Utils.getCSSSelector(this);
		}
		let subscriptionsForEvent  = subscriptions[eventName],
			remainingSubscriptions = [];

		if (!subscriptionsForEvent) {
			return;
		}

		publishLogger(eventName, {
			eventName,
			message,
			publisher,
			subscription: subscriptionsForEvent,
		});

		// If any of the subscription is of type Replay
		// Push the message to eventQ
		const replaySubscriptions = subscriptionsForEvent.filter((subs) => {
			if (subs.type === 'RE_PLAY') return subs;
		});
		if (replaySubscriptions.length) {
			eventQ.store.push({
				eventName,
				message,
				publisher,
			});
		}

		subscriptionsForEvent && subscriptionsForEvent.length && subscriptionsForEvent.forEach((subscription) => {
			let callback            = subscription.callback,
				context             = subscription.context,
				subscribeOnce       = subscription.once,
				moduleContext       = subscription.moduleContext,
				subscriptionMatched = false;

			if (!callback || typeof callback !== 'function') {
				console.error('The callback for the event is invalid');
				return;
			}


			if (subscription.eventPublisher) {
				const regex = new RegExp(`${subscription.eventPublisher}$`);
				if (regex.test(publisher)) {
					subscriptionMatched = true;
				} else {
					let actualPublisherHierarchy             = publisher.split(' '),
						subscriptionPublisherHierarhcy       = subscription.eventPublisher.split(' '),
						actualPublisherHierarchyLength       = actualPublisherHierarchy.length,
						subscriptionPublisherHierarhcyLength = subscriptionPublisherHierarhcy.length;

					while (actualPublisherHierarchy.length && subscriptionPublisherHierarhcy.length) {
						actualPublisherHierarchyLength       = actualPublisherHierarchy.length;
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
				const publishData = message;

				if (isModuleRendered(moduleContext) || checkIfModuleHasInitOn(moduleContext, eventName) || isGlobalPubsub(moduleContext) || subscription.type == 'KEEP_ON') {
					callback.call((context || null), publishData);
				}

				if (subscribeOnce) {
					subscriptions[eventName] = subscriptions[eventName].filter(sub => (sub.eventSubscriber !== subscription.eventSubscriber && sub.eventName !== subscription.eventName));
				}
			}
		});
	}


	/**
	 * unsubscribes a blinx event
	 * @public
	 * @param subscriber {Object} the reference of the module which had subscribed the event earlier
	 * @param eventName {string}
	 * @param callback {function} the callback method to be unsubscribed
	 */
	unsubscribe(subscriber, eventName, callback) {
		const subscriptionsForEvent = subscriptions[eventName];
		if (!subscriptionsForEvent) {
			return;
		}

		// Check if any RE_PLAY event is there and all the event context is of is same as
		// destroy its data from eventQ
		const replaySubscriptions = subscriptionsForEvent.filter((subscription) => {
			if (subscription.type === 'RE_PLAY') return subscription;
		});


		subscriptions[eventName] = subscriptionsForEvent.filter(subscription => !(subscription.callback === callback && subscription.eventSubscriber === subscriber));

		unsubscribeLogger(eventName, subscriptionsForEvent);

		if (replaySubscriptions.length) {
			if (!subscriptions[eventName].length) {
				// Remove all the items from eventQ with eventName
				eventQ.store = eventQ.store.filter((evt) => {
					if (evt.eventName !== eventName) return evt;
				});
			}
		}
	}


	/**
	 * For internal use
	 * This method is currently used to check is the event occured via Pub sub or a module
	 * @returns {string}
	 */
	getInstanceName() {
		return 'PUBSUB';
	}
}

export default PubSub;
