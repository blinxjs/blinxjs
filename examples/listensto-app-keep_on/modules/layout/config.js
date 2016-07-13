import headerModuleInstance from "modules/head";
import contentModuleInstance from "modules/content";
import footerModuleInstance from "modules/footer";

export default {
		modules: [{
			"moduleName": "headerModule",
			"instanceConfig": {
				"container": "#header-container",
				"placeholders": {}
			},
			"module": headerModuleInstance
		},{
			"moduleName": "contentModule",
			"instanceConfig": {
				"container": "#content-container",
				"placeholders": {},
				"initOn": {
					eventName: 'INIT_CONTENT_MODULE',
					eventPublisher: '#header-container'
				},
				"listensTo" : [{
					eventName: "ADD_TIMESTAMP",
					eventPublisher: '#header-container',
					callback: 'addTimestamp',
					type: "KEEP_ON"
				}]
			},
			"module": contentModuleInstance
		},{
			"moduleName": "footerModule",
			"instanceConfig": {
				"container": "#footer-container",
				"placeholders": {}
			},
			"module": footerModuleInstance
		}]
};
