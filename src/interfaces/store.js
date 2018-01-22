/**
 * The module store stores all the instances of the modules which are loaded. It deletes the instances in case they are unloaded from screen
 * @module
 */
const moduleS = Object.assign([], {
	/**
	 * inserts the instance into the module store
	 * @method
	 * @param instance  of {@link Module}
	 */
	insertInstance(instance) {
		this.push(instance);
	},

	/**
	 * deletes the instance of the module. Removes the entry from the module store
	 * @method
	 * instance  of {@link Module}
	 * @param id
	 */
	deleteInstance(id) {
		for (let i = this.length - 1; i >= 0; i--) {
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
	findInstance(id, name) {
		if (id) {
			return this.filter((module) => {
				if (module.meta.id === id) {
					return module;
				}
			});
		} else if (name) {
			return this.filter((module) => {
				if (module.name === name) {
					return module;
				}
			});
		}
		return [];
	},
});

/**
 * {@todo reserved for future use}
 * @type {boolean}
 */
const isBrowser = typeof window !== 'undefined';

/**
 * {@todo reserved for future use}
 * @type {boolean}
 */
const isServer = !isBrowser;

/**
 * To be used by {@link pubsub}
 * {Object} List of all the subscriptions of all the events. Present in the format {"eventName": {subscription object}}
 */
const subscriptions = {};

/**
 *
 * @type {{store: Array}}
 */
const eventQ = {store: []};

const middleWareFns = [];


export {
	isBrowser,
	subscriptions,
	moduleS,
	isServer,
	eventQ,
	middleWareFns,
};
