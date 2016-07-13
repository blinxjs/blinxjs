import PubSub from "./interfaces/pubsub";
import {createInstance, destroyModuleInstance, use} from "./blinx";

export const PubSubHelper = new PubSub();

/**
 * @
 */
export default {
    createInstance,
    destroyModuleInstance,
	use
};
