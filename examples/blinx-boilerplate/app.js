import Blinx from "../../lib";
import BlinxRouter from "blinx-router";

import LayoutRoutes from "apps/layout/routes";
import AboutRoutes from "apps/about/routes";
import CareerRoutes from "apps/career/routes";
import ContactRoutes from "apps/contact/routes";

import EventHandler from "common/extensions/event-handler";
import ReduxHandler from "common/extensions/redux-vdom";


let routes = [].concat(LayoutRoutes, AboutRoutes, CareerRoutes, ContactRoutes);


BlinxRouter.init(Blinx);
Blinx.use(EventHandler);
Blinx.use(ReduxHandler);


BlinxRouter.configure(routes, {
	useHash: true,
	hashPrefix: '',
	trailingSlash: true,
	logger: true,
	history: true,
	defaultRoute: 'layout'
});
BlinxRouter.start();
