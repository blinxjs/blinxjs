import template from "./template.html";
import "./style.less";

export default {
    render: function(){
        const containerSelector = this.getUniqueId();
        const placeholders = this.placeholders;
        document.querySelector(`#${containerSelector}`).innerHTML = template(placeholders);

        setTimeout(() => {
            this.publish('INIT_CONTENT_MODULE');
        }, 3000);
    },
    config: {}
};