import Utils from "../helpers/utils";
import {subscriptions, eventQ} from "./store";


class PubSub {
    subscribe (subscription, eventName = subscription.eventName) {
        if (!subscriptions[eventName]) subscriptions[eventName] = [];
        let subscriptionData = Utils.pick(subscription, ['callback', 'context', 'eventSubscriber', 'eventPublisher', 'once', 'type']);
        subscriptions[eventName].push(subscriptionData);
    };

    publish (eventName, message) {
        let publisher = Utils.getCSSSelector(this),
            subscriptionsForEvent = subscriptions[eventName],
            remainingSubscriptions = [];

        // If any of the subscription is of type Replay
        // Push the message to eventQ
        let replaySubscriptions = subscriptionsForEvent.filter((subs)=> {
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

                if (subscription.type === "RE_PLAY") {
                    publishData = eventQ.store.filter((evt)=> {
                        if (evt.publisher === publisher && evt.eventName === eventName) {
                            return evt;
                        }
                    }).map((evt)=> {
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

        subscriptions[eventName] = remainingSubscriptions;
    };

    unsubscribe(subscriber, eventName, callback) {

        var subscriptionsForEvent = subscriptions[eventName];

        // Check if any RE_PLAY event is there and all the event context is of is same as
        // destroy its data from eventQ
        let replaySubscriptions = subscriptionsForEvent.filter((subscription)=>{
            if(subscription.type === "RE_PLAY") return subscription;
        });


        subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
            return !(subscription.callback === callback && subscription.eventSubscriber === subscriber);
        });


        if(replaySubscriptions.length){

            if(!subscriptions[eventName].length) {
                // Remove all the items from eventQ with eventName
                eventQ.store = eventQ.store.filter((evt)=>{
                    if(evt.eventName !== eventName) return evt;
                })
            }
        }
    };
}

export default PubSub;
