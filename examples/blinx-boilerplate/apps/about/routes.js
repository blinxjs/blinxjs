import AboutModule from "./index";

export default [{
	name: 'layout.about',
	path: '/about',
	moduleConfig: {
		"moduleName": "about",
		"instanceConfig": {
			"container": "#page-container",
			"placeholders": {}
		},
		"module": AboutModule
	}
}];
