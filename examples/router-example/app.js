// A simple 1very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import Blinx from "../../lib";
import BlinxRouter from "blinx-router";
import appConfig from "./routes";

BlinxRouter.init(Blinx);
BlinxRouter.configure(appConfig, {
	useHash: true,
	hashPrefix: '',
	trailingSlash: true,
	logger: true,
	history: true,
	defaultRoute: 'layout'
});
BlinxRouter.start();
