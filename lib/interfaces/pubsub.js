var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Utils from '../helpers/utils';
import { moduleS, subscriptions, eventQ } from './store.js';

var subscribeLogger = function subscribeLogger(eventName, subscription) {
  console.group('Event Subscribed');
  console.info(eventName);
  console.dirxml(subscription);
  console.groupEnd();
};

var publishLogger = function publishLogger(eventName, publishData) {
  console.group('Event Published');
  console.info(eventName);
  console.dirxml(publishData);
  console.groupEnd();
};

var unsubscribeLogger = function unsubscribeLogger(eventName, subscription) {
  console.group('Event UnSubscribed');
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
  // Should also remove from the eventQ maintained
  return moduleContext && moduleContext.instanceConfig && moduleContext.instanceConfig.initOn && moduleContext.instanceConfig.initOn.eventName == eventName;
};

/**
 * Check if the event is subscribed or published using global pubsub
 * @param instance {Object} the instance object using which the pub sub is handled
 */
var isGlobalPubsub = function isGlobalPubsub(instance) {
  return instance && instance.getInstanceName() == 'PUBSUB';
};

/**
 * @class
 * PubSub
 * The publisher subscriber module for Blinx.
 * It is responsible for the communication between the modules through events
 */

var PubSub = function () {
  function PubSub() {
    _classCallCheck(this, PubSub);
  }

  _createClass(PubSub, [{
    key: 'subscribe',

    /**
    * Subscribes to the blinx event
    * @method
    * @public
    * @param subscription {Object} the subscription object
    * @param [eventName = subscription.eventName]
    */
    value: function subscribe(subscription) {
      var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : subscription.eventName;

      if (!subscriptions[eventName]) subscriptions[eventName] = [];
      var subscriptionData = Utils.pick(subscription, ['callback', 'context', 'eventSubscriber', 'eventPublisher', 'once', 'type']);
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

  }, {
    key: 'publish',
    value: function publish(eventName, message) {
      var publisher = '';
      if (arguments.length === 3) {
        publisher = arguments[0] || '';
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
      var replaySubscriptions = subscriptionsForEvent.filter(function (subs) {
        if (subs.type === 'RE_PLAY') return subs;
      });
      if (replaySubscriptions.length) {
        eventQ.store.push({
          eventName: eventName,
          message: message,
          publisher: publisher
        });
      }

      subscriptionsForEvent && subscriptionsForEvent.length && subscriptionsForEvent.forEach(function (subscription) {
        var callback = subscription.callback,
            context = subscription.context,
            subscribeOnce = subscription.once,
            moduleContext = subscription.moduleContext,
            subscriptionMatched = false;

        if (!callback || typeof callback !== 'function') {
          console.error('The callback for the event is invalid');
          return;
        }

        if (subscription.eventPublisher) {
          var regex = new RegExp(subscription.eventPublisher + '$');
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

          if (isModuleRendered(moduleContext) || checkIfModuleHasInitOn(moduleContext, eventName) || isGlobalPubsub(moduleContext) || subscription.type == 'KEEP_ON') {
            callback.call(context || null, publishData);
          }

          if (subscribeOnce) {
            subscriptions[eventName] = subscriptions[eventName].filter(function (sub) {
              return sub.eventSubscriber !== subscription.eventSubscriber && sub.eventName !== subscription.eventName;
            });
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

  }, {
    key: 'unsubscribe',
    value: function unsubscribe(subscriber, eventName, callback) {
      var subscriptionsForEvent = subscriptions[eventName];
      if (!subscriptionsForEvent) {
        return;
      }

      // Check if any RE_PLAY event is there and all the event context is of is same as
      // destroy its data from eventQ
      var replaySubscriptions = subscriptionsForEvent.filter(function (subscription) {
        if (subscription.type === 'RE_PLAY') return subscription;
      });

      subscriptions[eventName] = subscriptionsForEvent.filter(function (subscription) {
        return !(subscription.callback === callback && subscription.eventSubscriber === subscriber);
      });

      unsubscribeLogger(eventName, subscriptionsForEvent);

      if (replaySubscriptions.length) {
        if (!subscriptions[eventName].length) {
          // Remove all the items from eventQ with eventName
          eventQ.store = eventQ.store.filter(function (evt) {
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

  }, {
    key: 'getInstanceName',
    value: function getInstanceName() {
      return 'PUBSUB';
    }
  }]);

  return PubSub;
}();

export default PubSub;