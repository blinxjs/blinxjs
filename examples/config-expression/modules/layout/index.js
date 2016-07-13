import template from "./templates/composite.html";
import "./styles/root.less";

import headerModuleInstance from "modules/head";
import contentModuleInstance from "modules/content";
import footerModuleInstance from "modules/footer";

export default {
	getRoute: function(){
		return window.location.pathname;
	},
    template,
	config: {
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
        },{
            "moduleName": "contentModule",
            "instanceConfig": {
                "container": "#content-container",
                "placeholders": {}
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
    }
};
