import PubSub from "./interfaces/pubsub";
import {createInstance, destroyModuleInstance, destroyInstance, use} from "./blinx";

export const PubSubHelper = new PubSub();

/**
 * @
 */
export default {
    createInstance,
	destroyInstance,
    destroyModuleInstance,
	use
};
