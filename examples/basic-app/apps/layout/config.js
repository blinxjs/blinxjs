import headerModuleInstance from "apps/head";
import contentModuleInstance from "apps/content";
import footerModuleInstance from "apps/footer";

export default {
	modules: [{
		"moduleName": "headerModule",
		"instanceConfig": {
			"container": "#header-container",
			"placeholders": {},
			"listensTo": [{
				eventName: 'HEADER_EVENT',
				callback: 'show'
			}]
		},
		"module": headerModuleInstance
	}, {
		"moduleName": "contentModule",
		"instanceConfig": {
			"container": "#content-container",
			"placeholders": {}
		},
		"module": contentModuleInstance
	}, {
		"moduleName": "footerModule",
		"instanceConfig": {
			"container": "#footer-container",
			"placeholders": {}
		},
		"module": footerModuleInstance
	}]
}
