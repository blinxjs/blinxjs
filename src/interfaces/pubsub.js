import Utils from "../helpers/utils";
import { moduleS, subscriptions, eventQ } from "./store.js";

let subscribeLogger = function (eventName, subscription) {
    console.group("Event Subscribed");
    console.info(eventName);
    console.dirxml(subscription);
    console.groupEnd();
};

let publishLogger = function (eventName, publishData) {
    console.group("Event Published");
    console.info(eventName);
    console.dirxml(publishData);
    console.groupEnd();
};

let unsubscribeLogger = function (eventName, subscription) {
    console.group("Event UnSubscribed");
    console.info(eventName);
    console.dirxml(subscription);
    console.groupEnd();
};

/**
 * @class
 *
 */
class PubSub {
	/**
	 * Subscribes to the blinx event
	 * @param subscription {Object} the subscription object
	 * @param [eventName = subscription.eventName]
	 */
    subscribe(subscription, eventName = subscription.eventName) {
        if (!subscriptions[eventName]) subscriptions[eventName] = [];
        let subscriptionData = Utils.pick(subscription, ['callback', 'context', 'eventSubscriber', 'eventPublisher', 'once', 'type']);
        subscriptions[eventName].push(subscriptionData);
        subscribeLogger(eventName, subscription);
    };
    /**
     * Publishes a blinx event
     * @param eventName {string}
     * @param message {string}
     */
    publish(eventName, message) {
        let publisher = "";
        if (arguments.length === 3) {
            publisher = arguments[0] || "";
            eventName = arguments[1];
            message = arguments[2];
        } else {
            publisher = Utils.getCSSSelector(this);
        }
        var subscriptionsForEvent = subscriptions[eventName],
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
        let replaySubscriptions = subscriptionsForEvent.filter((subs) => {
            if (subs.type === "RE_PLAY") return subs;
        });
        if (replaySubscriptions.length) eventQ.store.push({
            eventName,
            message,
            publisher
        });

        subscriptionsForEvent && subscriptionsForEvent.length && subscriptionsForEvent.forEach(function (subscription) {

            let callback = subscription.callback,
                context = subscription.context,
                subscribeOnce = subscription.once,
                subscriptionMatched = false;


            if (subscription.eventPublisher) {
                let regex = new RegExp(subscription.eventPublisher + "$");
                if (regex.test(publisher)) {
                    subscriptionMatched = true;
                } else {

                    let actualPublisherHierarchy = publisher.split(' '),
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
                let publishData = message;

                if ((context && context.lifeCycleFlags && context.lifeCycleFlags.rendered == true) || (context && context.initOn && context.initOn.eventName == eventName) || subscription.type == "KEEP_ON") {
                    callback.call((context ? context : null), publishData);
                } else if (!context) {
                    callback.call(null, publishData);
                }

                if (subscribeOnce) {
                    subscriptions[eventName] = subscriptions[eventName].filter(function (sub) {
                        return (sub.eventSubscriber !== subscription.eventSubscriber && sub.eventName !== subscription.eventName)
                    });
                }
            }
        });
    };

	/**
	 * unsubscribes a blinx event
	 * @param subscriber {Object} the reference of the module which had subscribed the event earlier
	 * @param eventName {string}
	 * @param callback {function} the callback method to be unsubscribed
	 */
    unsubscribe(subscriber, eventName, callback) {

        var subscriptionsForEvent = subscriptions[eventName];
        if (!subscriptionsForEvent) {
            return;
        }

        // Check if any RE_PLAY event is there and all the event context is of is same as
        // destroy its data from eventQ
        let replaySubscriptions = subscriptionsForEvent.filter((subscription) => {
            if (subscription.type === "RE_PLAY") return subscription;
        });


        subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
            return !(subscription.callback === callback && subscription.eventSubscriber === subscriber);
        });

        unsubscribeLogger(eventName, subscriptionsForEvent);

        if (replaySubscriptions.length) {

            if (!subscriptions[eventName].length) {
                // Remove all the items from eventQ with eventName
                eventQ.store = eventQ.store.filter((evt) => {
                    if (evt.eventName !== eventName) return evt;
                })
            }
        }
    };
}

export default PubSub;
