// A simple very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import Blinx from "../../lib";
import RootInstance from "apps/layout";

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
