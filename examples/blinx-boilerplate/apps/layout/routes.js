import Layout from "./index";

export default [{
	name: 'layout',
	path: '/layout',
	moduleConfig: {
		"moduleName": "layout",
		"instanceConfig": {
			"container": "#app-container",
			"placeholders": {
				"header": "Router",
				"aboutUs": "About Us",
				"aboutUsURL": "#/layout/about",
				"contactUs": "Contact Us",
				"contactUsURL": "#/layout/contact",
				"career": "Career",
				"careerURL": "#/layout/career"
			}
		},
		"module": Layout
	}
}];
