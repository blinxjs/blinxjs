
let moduleS = Object.assign([], {
	/**
	 * inserts the instance into the module store
	 * @param instance  of {@link Module}
	 */
    insertInstance: function (instance) {
		this.push(instance);
    },

	/**
	 * deletes the instance of the module. Removes the entry from the module store
	 * instance  of {@link Module}
	 * @param id
	 */
    deleteInstance: function (id) {

        for (var i= this.length-1; i>=0; i--) {
            if (this[i].meta.id === id) {
                this.splice(i, 1);
                break;
            }
        }
    },

	/**
	 * Finds all the instances of the module from the module store
	 * @param name of the module to be searched
	 * @returns {Array} of all the instances of the module
	 */
	findInstance: function (id, name) {
		if(id){
			return this.filter(function (module) {
				if(module.meta.id === id){
					return module;
				}
			});
		} else if(name){
			return this.filter(function (module) {
				if(module.name === name){
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
let isBrowser = typeof window !== "undefined";

/**
 * {@todo reserved for future use}
 * @type {boolean}
 */
let isServer = !isBrowser;

/**
 * To be used by {@link pubsub}
 * {Object} List of all the subscriptions of all the events. Present in the format {"eventName": {subscription object}}
 */
let subscriptions = {};

/**
 *
 * @type {{store: Array}}
 */
let eventQ = {store: []};

let middleWareFns = [];

/**
 * @module
 */
export {
    isBrowser,
    subscriptions,
    moduleS,
    isServer,
    eventQ,
	middleWareFns
};
