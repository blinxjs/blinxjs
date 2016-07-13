import headerModuleInstance from "apps/head";
import contentModuleInstance from "apps/content";
import footerModuleInstance from "apps/footer";

export default {
	modules: [{
		"moduleName": "headerModule",
		"instanceConfig": {
			"container": "#header-container",
			"placeholders": {}
		},
		"module": headerModuleInstance
	}, {
		"moduleName": "contentModule",
		"instanceConfig": {
			"container": "#content-container",
			"placeholders": {},
			"initOn": {
				eventName: 'INIT_CONTENT_MODULE',
				eventPublisher: '#header-container'
			}
		},
		"module": contentModuleInstance
	}, {
		"moduleName": "footerModule",
		"instanceConfig": {
			"container": "#footer-container",
			"placeholders": {},
			"initOn": {
				eventName: 'INIT_FOOTER_MODULE',
				eventPublisher: '#content-container'
			}
		},
		"module": footerModuleInstance
	}]
};
