import template from "./templates/composite.html";
import "./styles/root.less";

import headerModuleInstance from "modules/head";
import contentModuleInstance from "modules/content";
import footerModuleInstance from "modules/footer";

export default {
    template,
    onRenderCompelete: function () {
        document.querySelector(".destroy-instance").addEventListener("click", ()=> {
            this.destroy();
        });
    },
    config: {
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
};
