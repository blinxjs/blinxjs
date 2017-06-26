"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubSubHelper = undefined;

var _pubsub = require("./interfaces/pubsub");

var _pubsub2 = _interopRequireDefault(_pubsub);

var _blinx = require("./blinx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * exported the Pub Sub Helper
 * It sis not recommended to use pub sub helper directly.
 * More helpful to use in case of creating Providers.
 * @type {PubSub}
 */
var PubSubHelper = exports.PubSubHelper = new _pubsub2.default();

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
exports.default = {
  createInstance: _blinx.createInstance,
  destroyInstance: _blinx.destroyInstance,
  destroyModuleInstance: _blinx.destroyModuleInstance,
  use: _blinx.use
};