import template from "./template.html";

export default {
    addTimestamp: function(dateArr){

        var list = document.querySelector(".timestamp-list");

        if(list) {
            let html = "";
			html = "<li>"+dateArr+"</li>";

			list.innerHTML = list.innerHTML+""+html;
        }
    },
    template,
    config: {}
};
