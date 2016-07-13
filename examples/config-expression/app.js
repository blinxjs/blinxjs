// A simple very application which demonstrate usage of
// APIS: createInstance
// Configs: container, placeholders

import {createInstance} from "./src";
import RootInstance from "./modules/layout";

createInstance({
	"moduleName": "layout",
	"instanceConfig": {
		"container": "#app-container",
		"evalInContext": true,
		"placeholders": {
			"header": "self.getRoute()"
		}
	},
	"module": RootInstance
});
