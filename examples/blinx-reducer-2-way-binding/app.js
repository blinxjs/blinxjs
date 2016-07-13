// A simple very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import Blinx from "../../lib";
import RootInstance from "apps/layout";

import EventHandler from "./extensions/event-handler";
import ReduxHandler from "./extensions/redux-vdom";

Blinx.use(EventHandler);
Blinx.use(ReduxHandler);

Blinx.createInstance({
     "moduleName": "layout",
     "instanceConfig": {
         "container": "#app-container",
         "placeholders": {
             "header": "Vanilla Truss"
         }
     },
     "module": RootInstance
 });
