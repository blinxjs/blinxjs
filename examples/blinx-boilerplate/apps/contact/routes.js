import AboutModule from "./index";

export default [{
	name: 'layout.contact',
	path: '/contact',
	moduleConfig: {
		"moduleName": "contact",
		"instanceConfig": {
			"container": "#page-container",
			"placeholders": {}
		},
		"module": AboutModule
	}
}];
