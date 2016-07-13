import headerModuleInstance from "modules/head";
import contentModuleInstance from "modules/content";
import footerModuleInstance from "modules/footer";

export default {
	"placeholders": {
		"header": "Vanilla Truss"
	},
	modules: [{
		"moduleName": "headerModule",
		"instanceConfig": {
			"container": "#header-container",
			"placeholders": {}
		},
		"module": headerModuleInstance
	}, {
		"moduleName": "contentModule",
		"name": "contentModule",
		"instanceConfig": {
			"container": "#content-container",
			"placeholders": {},
			"initOn": {
				eventName: 'INIT_CONTENT_MODULE',
				eventPublisher: '#header-container'
			},
			"listensTo": [{
				eventName: "ADD_TIMESTAMP",
				eventPublisher: '#header-container',
				callback: 'addTimestamp',
				type: "RE_PLAY"
			}]
		},
		"module": contentModuleInstance
	}, {
		"moduleName": "footerModule",
		"instanceConfig": {
			"container": "#footer-container",
			"placeholders": {},
			"listensTo": [{
				eventName: "ADD_TIMESTAMP",
				eventPublisher: '#header-container',
				callback: 'render',
				type: "RE_PLAY"
			}]
		},
		"module": footerModuleInstance
	}]
};
