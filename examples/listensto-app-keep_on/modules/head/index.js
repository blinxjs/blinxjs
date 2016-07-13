import template from "./template.html";

export default {
    template,
    render: function(){
        const containerSelector = this.getUniqueId();
        const placeholders = this.placeholders;
        document.querySelector(`#${containerSelector}`).innerHTML = template(placeholders);

        setTimeout(() => {
            this.publish('INIT_CONTENT_MODULE');
        }, 3000);

        document.querySelector("#emitter").addEventListener("click", () => {
            this.publish('ADD_TIMESTAMP', Date());
        })
    },
    config: {}
};