import PubSub from './interfaces/pubsub';
import { createInstance, destroyModuleInstance, destroyInstance, use } from './blinx';

/**
 * exported the Pub Sub Helper
 * It sis not recommended to use pub sub helper directly.
 * More helpful to use in case of creating Providers.
 * @type {PubSub}
 */
export var PubSubHelper = new PubSub();

/**
 * Blinx is a JavaScript framework to develop modular, config driven and event based applications.
 * It helps you write applications that are high in performance with little learning curve.
 * On top of that, it provides a great ecosystem of extensions, providers and modules to help to you.
 * This is a Core blinx code which exports :
 * 1) createInstance
 * 2) destroyInstance
 * 3) destroyModuleInstance <deprecated/ same as destroyInstance>
 * 4) use
 */
export default {
  createInstance: createInstance,
  destroyInstance: destroyInstance,
  destroyModuleInstance: destroyModuleInstance,
  use: use
};