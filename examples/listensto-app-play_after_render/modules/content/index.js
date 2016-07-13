import template from "./template.html";

export default {
    addTimestamp: function(date){
        var list = document.querySelector(".timestamp-list");

        list.innerHTML += `<li>${date}</li>`;
    },
    template
};
