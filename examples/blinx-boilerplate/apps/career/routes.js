import CareerModule from "./index";

export default [{
	name: 'layout.career',
	path: '/career',
	moduleConfig: {
		"moduleName": "career",
		"instanceConfig": {
			"container": "#page-container",
			"placeholders": {}
		},
		"module": CareerModule
	}
}];
